#!/bin/zsh
set -eu

# Resolve the directory of this script
SCRIPT_DIR="${0:A:h}"
REPO="${SCRIPT_DIR}/.."
LOG_DIR="${REPO}/output/reports"
LOG_FILE="${LOG_DIR}/launchd_local_google_drive_sync.log"

mkdir -p "${LOG_DIR}"
cd "${REPO}"

{
  echo "== $(date -u '+%Y-%m-%dT%H:%M:%SZ') local Google Drive sync =="
  /usr/bin/python3 scripts/local_google_drive_sync.py --commit
  echo
} >> "${LOG_FILE}" 2>&1
