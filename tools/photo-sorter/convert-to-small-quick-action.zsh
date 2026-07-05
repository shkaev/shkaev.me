#!/bin/zsh
set -u

SCRIPT_DIR="${0:A:h}"
SCRIPT="$SCRIPT_DIR/convert-to-small.mjs"
LOG_FILE="/tmp/convert-to-small.log"

notify() {
  /usr/bin/osascript -e "display notification \"$1\" with title \"Convert to small\"" >/dev/null 2>&1
}

find_node() {
  local candidates=(
    "/Users/shkaev/.nvm/versions/node/v24.14.0/bin/node"
    "/opt/homebrew/bin/node"
    "/usr/local/bin/node"
    "/usr/bin/node"
  )

  for candidate in "${candidates[@]}"; do
    if [ -x "$candidate" ]; then
      echo "$candidate"
      return 0
    fi
  done

  command -v node 2>/dev/null
}

NODE_BIN="$(find_node)"

{
  echo "--- $(date '+%Y-%m-%d %H:%M:%S') ---"

  if [ ! -f "$SCRIPT" ]; then
    echo "Converter script was not found: $SCRIPT"
    notify "Converter script was not found."
    exit 1
  fi

  if [ -z "$NODE_BIN" ] || [ ! -x "$NODE_BIN" ]; then
    echo "Node.js was not found."
    notify "Node.js was not found."
    exit 1
  fi

  if [ "$#" -eq 0 ]; then
    echo "No folders were selected."
    notify "No folders were selected."
    exit 1
  fi

  converted_count=0

  for folder in "$@"; do
    if [ -d "$folder" ]; then
      echo "Converting: $folder"
      "$NODE_BIN" "$SCRIPT" "$folder" --yes
      exit_code=$?
      if [ "$exit_code" -ne 0 ]; then
        echo "Failed with status $exit_code: $folder"
        notify "Conversion failed. Check /tmp/convert-to-small.log."
        exit "$exit_code"
      fi
      converted_count=$((converted_count + 1))
    else
      echo "Skipped non-folder input: $folder"
    fi
  done

  notify "Done converting $converted_count folder(s)."
} >> "$LOG_FILE" 2>&1
