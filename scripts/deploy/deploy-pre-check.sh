#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd)"

if [[ -n "$(git -C "$ROOT_DIR" status --porcelain)" ]]; then
  echo "Erreur : des fichiers ne sont pas commités. Commit ou stash avant le déploiement."
  exit 1
fi
