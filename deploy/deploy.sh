#!/usr/bin/env bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: ./deploy/deploy.sh user@droplet"
  exit 1
fi

TARGET_HOST="$1"
TARGET_PATH="/var/www/azersoft"

yarn build
rsync -avz --delete dist/ "${TARGET_HOST}:${TARGET_PATH}/"
echo "Deploy complete -> ${TARGET_HOST}:${TARGET_PATH}"
