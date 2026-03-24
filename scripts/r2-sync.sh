#!/usr/bin/env bash

set -euo pipefail

export PATH="$HOME/Library/Python/3.9/bin:$PATH"

if ! command -v aws >/dev/null 2>&1; then
  echo "aws CLI is required. Install it first, then rerun this script." >&2
  exit 1
fi

: "${AWS_ACCESS_KEY_ID:?AWS_ACCESS_KEY_ID is required}"
: "${AWS_SECRET_ACCESS_KEY:?AWS_SECRET_ACCESS_KEY is required}"
: "${R2_ACCOUNT_ID:?R2_ACCOUNT_ID is required}"
: "${R2_BUCKET_NAME:?R2_BUCKET_NAME is required}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="${1:-$ROOT_DIR/public/photo-imports}"
DESTINATION_PREFIX="${2:-photo-imports}"
ENDPOINT_URL="https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Source directory does not exist: $SOURCE_DIR" >&2
  exit 1
fi

echo "Syncing ${SOURCE_DIR} -> s3://${R2_BUCKET_NAME}/${DESTINATION_PREFIX}"
aws s3 sync "$SOURCE_DIR" "s3://${R2_BUCKET_NAME}/${DESTINATION_PREFIX}" \
  --endpoint-url "$ENDPOINT_URL" \
  --delete \
  --exclude ".DS_Store" \
  --exclude "*/.DS_Store" \
  --exclude "*/images/*" \
  --exclude "images/*"
