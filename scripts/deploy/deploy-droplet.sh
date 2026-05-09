#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd)"

if [[ -f "$ROOT_DIR/.deploy" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "$ROOT_DIR/.deploy"
  set +a
fi

POSITIONAL_TARGET="${1:-}"
TARGET_HOST="${POSITIONAL_TARGET:-${DEPLOY_SSH_TARGET:-}}"
TARGET_PATH="${DEPLOY_REMOTE_PATH:-/var/www/azersoft}"

if [[ -z "$TARGET_HOST" ]]; then
  echo "Erreur : cible SSH manquante (.deploy ou argument user@host)."
  exit 1
fi

if [[ ! -d "$ROOT_DIR/dist" ]]; then
  echo "Erreur : dossier dist/ absent. Lancez yarn build avant deploy-droplet."
  exit 1
fi

echo "rsync -> ${TARGET_HOST}:${TARGET_PATH}/"
rsync -avz --delete "$ROOT_DIR/dist/" "${TARGET_HOST}:${TARGET_PATH}/"
echo "Déploiement terminé -> ${TARGET_HOST}:${TARGET_PATH}"
