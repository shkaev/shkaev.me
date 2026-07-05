#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="${0:A:h}"
TOOLS_DIR="$HOME/Library/Scripts/photo-tools"
SERVICES_DIR="$HOME/Library/Services"

DRY_RUN=0

for arg in "$@"; do
  case "$arg" in
    --dry-run)
      DRY_RUN=1
      ;;
    --help|-h)
      cat <<'EOF'
Usage:
  tools/photo-sorter/install.zsh [--dry-run]

Installs the photo utilities for Finder Services:
  Scripts:  ~/Library/Scripts/photo-tools/
  Services: ~/Library/Services/
EOF
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      exit 1
      ;;
  esac
done

run() {
  if [ "$DRY_RUN" -eq 1 ]; then
    printf '+'
    printf ' %q' "$@"
    printf '\n'
    return 0
  fi

  "$@"
}

require_file() {
  if [ ! -f "$1" ]; then
    echo "Missing required file: $1" >&2
    exit 1
  fi
}

require_dir() {
  if [ ! -d "$1" ]; then
    echo "Missing required directory: $1" >&2
    exit 1
  fi
}

require_file "$SCRIPT_DIR/sort-camera-import.mjs"
require_file "$SCRIPT_DIR/convert-to-small.mjs"
require_file "$SCRIPT_DIR/sort-camera-import-quick-action.zsh"
require_file "$SCRIPT_DIR/convert-to-small-quick-action.zsh"
require_dir "$SCRIPT_DIR/Sort Camera Import.workflow"
require_dir "$SCRIPT_DIR/Convert to small.workflow"

run mkdir -p "$TOOLS_DIR"
run mkdir -p "$SERVICES_DIR"

run cp "$SCRIPT_DIR/sort-camera-import.mjs" "$TOOLS_DIR/sort-camera-import.mjs"
run cp "$SCRIPT_DIR/convert-to-small.mjs" "$TOOLS_DIR/convert-to-small.mjs"
run cp "$SCRIPT_DIR/sort-camera-import-quick-action.zsh" "$TOOLS_DIR/sort-camera-import-quick-action.zsh"
run cp "$SCRIPT_DIR/convert-to-small-quick-action.zsh" "$TOOLS_DIR/convert-to-small-quick-action.zsh"
run chmod +x "$TOOLS_DIR/sort-camera-import.mjs" "$TOOLS_DIR/convert-to-small.mjs"
run chmod +x "$TOOLS_DIR/sort-camera-import-quick-action.zsh" "$TOOLS_DIR/convert-to-small-quick-action.zsh"

run rm -rf "$SERVICES_DIR/1 Photo Sort.workflow"
run rm -rf "$SERVICES_DIR/2 Photo Compress.workflow"
run rm -rf "$SERVICES_DIR/Sort Camera Import.workflow"
run rm -rf "$SERVICES_DIR/Convert to small.workflow"
run rm -rf "$SERVICES_DIR/_Photo Sort.workflow"
run rm -rf "$SERVICES_DIR/_Photo Compress.workflow"

run ditto "$SCRIPT_DIR/Sort Camera Import.workflow" "$SERVICES_DIR/1 Photo Sort.workflow"
run ditto "$SCRIPT_DIR/Convert to small.workflow" "$SERVICES_DIR/2 Photo Compress.workflow"

if [ "$DRY_RUN" -eq 0 ]; then
  plutil -lint \
    "$SERVICES_DIR/1 Photo Sort.workflow/Contents/Info.plist" \
    "$SERVICES_DIR/1 Photo Sort.workflow/Contents/Resources/document.wflow" \
    "$SERVICES_DIR/2 Photo Compress.workflow/Contents/Info.plist" \
    "$SERVICES_DIR/2 Photo Compress.workflow/Contents/Resources/document.wflow"

  /System/Library/CoreServices/pbs -flush >/dev/null 2>&1 || true
  echo "Installed photo services."
  echo "Scripts:  $TOOLS_DIR"
  echo "Services: $SERVICES_DIR"
fi
