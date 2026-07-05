#!/usr/bin/env node
import { constants } from "node:fs";
import {
  access,
  mkdir,
  readdir,
  readFile,
  rename,
  stat,
} from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const RAW_EXTENSIONS = new Set([
  ".3fr", // Hasselblad
  ".arw", // Sony
  ".cr2", // Canon
  ".cr3", // Canon
  ".crw", // Canon
  ".dng", // Leica, Ricoh, Pentax, Hasselblad, generic
  ".fff", // Hasselblad
  ".mos", // Leica / Leaf
  ".nef", // Nikon
  ".nrw", // Nikon
  ".orf", // Olympus / OM System
  ".pef", // Pentax
  ".raf", // Fujifilm
  ".raw", // Panasonic / generic
  ".rwl", // Leica
  ".rw2", // Panasonic
  ".sr2", // Sony
  ".srf", // Sony
]);

const JPEG_EXTENSIONS = new Set([".jpg", ".jpeg"]);
const IGNORED_NAMES = new Set([".DS_Store"]);

function usage(exitCode = 0) {
  const message = `
Usage:
  node tools/photo-sorter/sort-camera-import.mjs <folder> [options]

Options:
  --dry-run       Print the planned moves without touching files.
  --yes           Execute without an interactive confirmation prompt.
  --help          Show this help.

Behavior:
  RAW files move to:   <folder>/RAW/
  JPEG files move to:  <folder>/JPEG/dd.mm.yy/

JPEG dates come from EXIF DateTimeOriginal when available, then macOS
metadata, then the file modification date.
`;

  console.log(message.trim());
  process.exit(exitCode);
}

function parseArgs(argv) {
  const options = {
    folder: null,
    dryRun: false,
    yes: false,
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") usage(0);
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--yes" || arg === "-y") {
      options.yes = true;
      continue;
    }
    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }
    if (options.folder) {
      throw new Error(`Unexpected extra argument: ${arg}`);
    }
    options.folder = arg;
  }

  if (!options.folder) usage(1);
  return options;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function formatDateFolder(year, month, day) {
  return `${pad2(day)}.${pad2(month)}.${String(year).slice(-2)}`;
}

function formatDate(date) {
  return formatDateFolder(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function dateFromExifValue(value) {
  if (!value) return null;
  const match = String(value).match(/^(\d{4}):(\d{2}):(\d{2})[ T]/);
  if (!match) return null;
  return formatDateFolder(Number(match[1]), Number(match[2]), Number(match[3]));
}

function readUInt16(buffer, offset, littleEndian) {
  return littleEndian ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset);
}

function readUInt32(buffer, offset, littleEndian) {
  return littleEndian ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset);
}

function asciiAt(buffer, offset, count) {
  return buffer
    .subarray(offset, offset + count)
    .toString("ascii")
    .replace(/\0.*$/, "")
    .trim();
}

function tiffAsciiValue(buffer, tiffStart, entryOffset, littleEndian, count) {
  const valueByteCount = count;
  if (valueByteCount <= 4) {
    return asciiAt(buffer, entryOffset + 8, valueByteCount);
  }

  const valueOffset = readUInt32(buffer, entryOffset + 8, littleEndian);
  const absoluteOffset = tiffStart + valueOffset;
  if (absoluteOffset < 0 || absoluteOffset + valueByteCount > buffer.length) {
    return null;
  }

  return asciiAt(buffer, absoluteOffset, valueByteCount);
}

function readIfdEntries(buffer, tiffStart, ifdOffset, littleEndian) {
  const absoluteIfdOffset = tiffStart + ifdOffset;
  if (absoluteIfdOffset < 0 || absoluteIfdOffset + 2 > buffer.length) return [];

  const entryCount = readUInt16(buffer, absoluteIfdOffset, littleEndian);
  const entries = [];

  for (let index = 0; index < entryCount; index += 1) {
    const entryOffset = absoluteIfdOffset + 2 + index * 12;
    if (entryOffset + 12 > buffer.length) break;

    entries.push({
      tag: readUInt16(buffer, entryOffset, littleEndian),
      type: readUInt16(buffer, entryOffset + 2, littleEndian),
      count: readUInt32(buffer, entryOffset + 4, littleEndian),
      entryOffset,
      valueOffset: readUInt32(buffer, entryOffset + 8, littleEndian),
    });
  }

  return entries;
}

function parseExifDateFromJpegBuffer(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;

  let offset = 2;

  while (offset + 4 < buffer.length) {
    if (buffer[offset] !== 0xff) return null;

    const marker = buffer[offset + 1];
    const segmentLength = buffer.readUInt16BE(offset + 2);
    const segmentStart = offset + 4;
    const segmentEnd = offset + 2 + segmentLength;

    if (segmentEnd > buffer.length || segmentLength < 2) return null;

    if (marker === 0xe1 && buffer.subarray(segmentStart, segmentStart + 6).toString("ascii") === "Exif\0\0") {
      const tiffStart = segmentStart + 6;
      const byteOrder = buffer.subarray(tiffStart, tiffStart + 2).toString("ascii");
      const littleEndian = byteOrder === "II";
      if (!littleEndian && byteOrder !== "MM") return null;

      if (readUInt16(buffer, tiffStart + 2, littleEndian) !== 42) return null;

      const firstIfdOffset = readUInt32(buffer, tiffStart + 4, littleEndian);
      const ifd0Entries = readIfdEntries(buffer, tiffStart, firstIfdOffset, littleEndian);
      let fallbackDate = null;
      let exifIfdOffset = null;

      for (const entry of ifd0Entries) {
        if (entry.tag === 0x0132 && entry.type === 2) {
          fallbackDate = dateFromExifValue(
            tiffAsciiValue(buffer, tiffStart, entry.entryOffset, littleEndian, entry.count),
          );
        }
        if (entry.tag === 0x8769) {
          exifIfdOffset = entry.valueOffset;
        }
      }

      if (exifIfdOffset) {
        const exifEntries = readIfdEntries(buffer, tiffStart, exifIfdOffset, littleEndian);
        for (const entry of exifEntries) {
          if ((entry.tag === 0x9003 || entry.tag === 0x9004) && entry.type === 2) {
            const date = dateFromExifValue(
              tiffAsciiValue(buffer, tiffStart, entry.entryOffset, littleEndian, entry.count),
            );
            if (date) return date;
          }
        }
      }

      return fallbackDate;
    }

    offset = segmentEnd;
  }

  return null;
}

async function getJpegExifDate(filePath) {
  const buffer = await readFile(filePath);
  return parseExifDateFromJpegBuffer(buffer);
}

function getMacMetadataDate(filePath) {
  const result = spawnSync(
    "mdls",
    ["-raw", "-name", "kMDItemContentCreationDate", filePath],
    { encoding: "utf8" },
  );

  if (result.status !== 0) return null;

  const value = result.stdout.trim();
  if (!value || value === "(null)") return null;

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;

  return formatDateFolder(Number(match[1]), Number(match[2]), Number(match[3]));
}

async function getJpegDate(filePath, fileStats) {
  try {
    const exifDate = await getJpegExifDate(filePath);
    if (exifDate) return { date: exifDate, source: "EXIF" };
  } catch {
    // Fall through to macOS metadata / mtime.
  }

  const metadataDate = getMacMetadataDate(filePath);
  if (metadataDate) return { date: metadataDate, source: "macOS metadata" };

  return { date: formatDate(fileStats.mtime), source: "file modified date" };
}

async function exists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function uniqueDestination(destinationPath) {
  if (!(await exists(destinationPath))) return destinationPath;

  const parsed = path.parse(destinationPath);
  let counter = 2;

  while (true) {
    const candidate = path.join(parsed.dir, `${parsed.name}-${counter}${parsed.ext}`);
    if (!(await exists(candidate))) return candidate;
    counter += 1;
  }
}

async function buildPlan(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const moves = [];
  const skipped = [];
  const unknown = [];

  for (const entry of entries) {
    if (!entry.isFile() || IGNORED_NAMES.has(entry.name)) {
      skipped.push(entry.name);
      continue;
    }

    const sourcePath = path.join(root, entry.name);
    const extension = path.extname(entry.name).toLowerCase();
    const fileStats = await stat(sourcePath);

    if (RAW_EXTENSIONS.has(extension)) {
      const destinationDirectory = path.join(root, "RAW");
      moves.push({
        kind: "RAW",
        date: null,
        dateSource: null,
        sourcePath,
        destinationDirectory,
        destinationPath: await uniqueDestination(path.join(destinationDirectory, entry.name)),
      });
      continue;
    }

    if (JPEG_EXTENSIONS.has(extension)) {
      const { date, source } = await getJpegDate(sourcePath, fileStats);
      const destinationDirectory = path.join(root, "JPEG", date);
      moves.push({
        kind: "JPEG",
        date,
        dateSource: source,
        sourcePath,
        destinationDirectory,
        destinationPath: await uniqueDestination(path.join(destinationDirectory, entry.name)),
      });
      continue;
    }

    unknown.push(entry.name);
  }

  return { root, moves, skipped, unknown };
}

function summarizePlan(plan) {
  const rawMoves = plan.moves.filter((move) => move.kind === "RAW");
  const jpegMoves = plan.moves.filter((move) => move.kind === "JPEG");
  const jpegDates = new Map();
  const dateSources = new Map();

  for (const move of jpegMoves) {
    jpegDates.set(move.date, (jpegDates.get(move.date) ?? 0) + 1);
    dateSources.set(move.dateSource, (dateSources.get(move.dateSource) ?? 0) + 1);
  }

  console.log(`Folder: ${plan.root}`);
  console.log(`Planned moves: ${plan.moves.length}`);
  console.log(`RAW: ${rawMoves.length} -> RAW/`);
  console.log(`JPEG: ${jpegMoves.length} -> JPEG/dd.mm.yy/`);

  if (jpegDates.size > 0) {
    console.log("");
    console.log("JPEG date folders:");
    for (const [date, count] of [...jpegDates.entries()].sort()) {
      console.log(`  ${date}: ${count}`);
    }
  }

  if (dateSources.size > 0) {
    console.log("");
    console.log("JPEG date sources:");
    for (const [source, count] of [...dateSources.entries()].sort()) {
      console.log(`  ${source}: ${count}`);
    }
  }

  if (plan.unknown.length > 0) {
    console.log("");
    console.log(`Unknown files left in place: ${plan.unknown.length}`);
    for (const name of plan.unknown.slice(0, 20)) {
      console.log(`  ${name}`);
    }
    if (plan.unknown.length > 20) {
      console.log(`  ...and ${plan.unknown.length - 20} more`);
    }
  }
}

function printMoves(plan) {
  console.log("");
  console.log("Move plan:");
  for (const move of plan.moves) {
    const from = path.relative(plan.root, move.sourcePath);
    const to = path.relative(plan.root, move.destinationPath);
    console.log(`  ${from} -> ${to}`);
  }
}

async function confirmMove() {
  if (!input.isTTY) {
    throw new Error("Refusing to move files without --yes in a non-interactive shell.");
  }

  const rl = readline.createInterface({ input, output });
  const answer = await rl.question('\nType "move" to move files: ');
  rl.close();

  return answer.trim() === "move";
}

async function executePlan(plan) {
  for (const move of plan.moves) {
    await mkdir(move.destinationDirectory, { recursive: true });
    await rename(move.sourcePath, move.destinationPath);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const root = path.resolve(options.folder);
  const rootStats = await stat(root);

  if (!rootStats.isDirectory()) {
    throw new Error(`Not a directory: ${root}`);
  }

  const plan = await buildPlan(root);
  summarizePlan(plan);

  if (options.dryRun) {
    printMoves(plan);
    console.log("");
    console.log("Dry run only. No files were moved.");
    return;
  }

  if (plan.moves.length === 0) {
    console.log("");
    console.log("Nothing to move.");
    return;
  }

  if (!options.yes && !(await confirmMove())) {
    console.log("Cancelled. No files were moved.");
    return;
  }

  await executePlan(plan);
  console.log("");
  console.log(`Done. Moved ${plan.moves.length} files.`);
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
