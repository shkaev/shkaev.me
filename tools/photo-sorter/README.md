# Photo Sorter

Local macOS utilities for sorting and resizing camera import folders after Image Capture.

## Repository Layout

```text
tools/photo-sorter/
├─ sort-camera-import.mjs
├─ convert-to-small.mjs
├─ sort-camera-import-quick-action.zsh
├─ convert-to-small-quick-action.zsh
├─ install.zsh
├─ Sort Camera Import.workflow/
└─ Convert to small.workflow/
```

The repository is the source of truth. Finder should not run scripts directly from the project folder because the project lives under `~/Desktop`, and macOS privacy rules can block Automator from opening files there.

The installer copies runtime files to:

```text
~/Library/Scripts/photo-tools/
```

and installs Finder Services to:

```text
~/Library/Services/
```

## Install

From the repository root:

```bash
tools/photo-sorter/install.zsh
```

Dry run:

```bash
tools/photo-sorter/install.zsh --dry-run
```

Installed Services:

```text
1 Photo: Sort
2 Photo: Compress
```

If Finder does not refresh immediately, check:

```text
System Settings -> Keyboard -> Keyboard Shortcuts -> Services -> Files and Folders
```

or log out and back in.

## Sort Camera Import

- RAW files move to `RAW/`.
- JPEG files move to `JPEG/dd.mm.yy/`.
- JPEG dates are read from EXIF `DateTimeOriginal` when possible.
- If EXIF is unavailable, the script falls back to macOS metadata and then file modification date.
- Existing files are never overwritten. Collisions get `-2`, `-3`, etc.
- Unknown files are left in place.

## Supported RAW Extensions

Canon: `.cr2`, `.cr3`, `.crw`  
Sony: `.arw`, `.sr2`, `.srf`  
Nikon: `.nef`, `.nrw`  
Fujifilm: `.raf`  
Panasonic: `.rw2`, `.raw`  
OM System / Olympus: `.orf`  
Leica: `.dng`, `.rwl`, `.mos`  
Hasselblad: `.3fr`, `.fff`, `.dng`  
Ricoh: `.dng`  
Pentax: `.pef`, `.dng`

## Usage

Dry run:

```bash
node tools/photo-sorter/sort-camera-import.mjs "/Users/shkaev/Pictures/Fujifilm X-E4/new" --dry-run
```

Move files after an interactive confirmation:

```bash
node tools/photo-sorter/sort-camera-import.mjs "/Users/shkaev/Pictures/Fujifilm X-E4/new"
```

Move files without confirmation:

```bash
node tools/photo-sorter/sort-camera-import.mjs "/Users/shkaev/Pictures/Fujifilm X-E4/new" --yes
```

## Finder Quick Action

The installed Service is named `1 Photo: Sort`.

In Finder, right-click a folder and choose:

```text
Services -> 1 Photo: Sort
```

The action runs the sorter with `--yes` for each selected folder and shows a macOS notification when done.

Automator command:

```zsh
"/Users/shkaev/Library/Scripts/photo-tools/sort-camera-import-quick-action.zsh" "$@"
```

## Convert to Small

Creates compressed JPEG copies for sharing/export while leaving originals untouched.

Behavior:

- Reads only top-level `.jpg` / `.jpeg` files from the selected folder.
- Creates a `small/` subfolder.
- Writes JPEG copies with long edge limited to `2560px`.
- Uses JPEG quality `60%`.
- Leaves originals in place.
- Existing files are never overwritten. Collisions get `-2`, `-3`, etc.

Dry run:

```bash
node tools/photo-sorter/convert-to-small.mjs "/path/to/jpeg-folder" --dry-run
```

Convert after an interactive confirmation:

```bash
node tools/photo-sorter/convert-to-small.mjs "/path/to/jpeg-folder"
```

Convert without confirmation:

```bash
node tools/photo-sorter/convert-to-small.mjs "/path/to/jpeg-folder" --yes
```

The installed Service is named `2 Photo: Compress`.

In Finder, right-click a folder and choose:

```text
Services -> 2 Photo: Compress
```

The action runs the converter with `--yes` for each selected folder and writes a log to `/tmp/convert-to-small.log`.

Automator command:

```zsh
"/Users/shkaev/Library/Scripts/photo-tools/convert-to-small-quick-action.zsh" "$@"
```
