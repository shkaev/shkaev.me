#!/usr/bin/env node
import { constants } from "node:fs";
import { access, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const JPEG_EXTENSIONS = new Set([".jpg", ".jpeg"]);
const OUTPUT_DIRECTORY_NAME = "small";
const MAX_LONG_EDGE = "2560";
const JPEG_QUALITY = "60";

function usage(exitCode = 0) {
  const message = `
Usage:
  node tools/photo-sorter/convert-to-small.mjs <folder> [options]

Options:
  --dry-run       Print the planned conversions without touching files.
  --yes           Execute without an interactive confirmation prompt.
  --help          Show this help.

Behavior:
  Reads top-level JPG/JPEG files from <folder>.
  Writes compressed copies to <folder>/small/.
  Limits the long edge to 2560px and writes JPEG quality 60%.
  Leaves originals untouched.
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
  const outputDirectory = path.join(root, OUTPUT_DIRECTORY_NAME);
  const conversions = [];
  const skipped = [];

  for (const entry of entries) {
    if (!entry.isFile()) {
      skipped.push(entry.name);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!JPEG_EXTENSIONS.has(extension)) {
      skipped.push(entry.name);
      continue;
    }

    const sourcePath = path.join(root, entry.name);
    conversions.push({
      sourcePath,
      outputDirectory,
      destinationPath: await uniqueDestination(path.join(outputDirectory, entry.name)),
    });
  }

  return { root, outputDirectory, conversions, skipped };
}

function summarizePlan(plan) {
  console.log(`Folder: ${plan.root}`);
  console.log(`Output: ${path.relative(plan.root, plan.outputDirectory)}/`);
  console.log(`Planned conversions: ${plan.conversions.length}`);
  console.log(`Resize: long edge <= ${MAX_LONG_EDGE}px`);
  console.log(`JPEG quality: ${JPEG_QUALITY}%`);

  if (plan.conversions.length > 0) {
    console.log("");
    console.log("Conversion plan:");
    for (const conversion of plan.conversions) {
      const from = path.relative(plan.root, conversion.sourcePath);
      const to = path.relative(plan.root, conversion.destinationPath);
      console.log(`  ${from} -> ${to}`);
    }
  }
}

async function confirmConvert() {
  if (!input.isTTY) {
    throw new Error("Refusing to convert files without --yes in a non-interactive shell.");
  }

  const rl = readline.createInterface({ input, output });
  const answer = await rl.question('\nType "small" to create compressed copies: ');
  rl.close();

  return answer.trim() === "small";
}

function runSips(sourcePath, destinationPath) {
  return new Promise((resolve, reject) => {
    const child = spawn("sips", [
      "--setProperty",
      "format",
      "jpeg",
      "--setProperty",
      "formatOptions",
      JPEG_QUALITY,
      "--resampleHeightWidthMax",
      MAX_LONG_EDGE,
      sourcePath,
      "--out",
      destinationPath,
    ]);

    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`sips failed for ${sourcePath}: ${stderr.trim()}`));
    });
  });
}

async function executePlan(plan) {
  await mkdir(plan.outputDirectory, { recursive: true });

  let completed = 0;
  for (const conversion of plan.conversions) {
    await runSips(conversion.sourcePath, conversion.destinationPath);
    completed += 1;
    console.log(`Converted ${completed} / ${plan.conversions.length}: ${path.basename(conversion.sourcePath)}`);
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
    console.log("");
    console.log("Dry run only. No files were converted.");
    return;
  }

  if (plan.conversions.length === 0) {
    console.log("");
    console.log("Nothing to convert.");
    return;
  }

  if (!options.yes && !(await confirmConvert())) {
    console.log("Cancelled. No files were converted.");
    return;
  }

  await executePlan(plan);
  console.log("");
  console.log(`Done. Created ${plan.conversions.length} compressed file(s).`);
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
