#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/../.." && pwd)"

echo "Prettier (auto-format)"
yarn --cwd "$ROOT_DIR" format

if git -C "$ROOT_DIR" diff --quiet; then
  echo "Aucun changement de formatage."
  exit 0
fi

echo "Des fichiers ont été reformatés."

if ! git -C "$ROOT_DIR" rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
  echo "Aucune branche distante de suivi. Amend du dernier commit local."
  git -C "$ROOT_DIR" add .
  git -C "$ROOT_DIR" commit --amend --no-edit
  git -C "$ROOT_DIR" push origin main
  exit 0
fi

UPSTREAM="@{u}"
LOCAL=$(git -C "$ROOT_DIR" rev-parse @)
REMOTE=$(git -C "$ROOT_DIR" rev-parse "$UPSTREAM")
BASE=$(git -C "$ROOT_DIR" merge-base @ "$UPSTREAM")

if [ "$LOCAL" != "$REMOTE" ] && [ "$REMOTE" = "$BASE" ]; then
  echo "La branche locale est en avance. Amend du dernier commit."
  git -C "$ROOT_DIR" add .
  git -C "$ROOT_DIR" commit --amend --no-edit
  git -C "$ROOT_DIR" push origin main
  exit 0
fi

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "Le dernier commit est déjà poussé. Création d'un commit de formatage."
  git -C "$ROOT_DIR" add .
  git -C "$ROOT_DIR" commit -m "chore: apply formatting"
  git -C "$ROOT_DIR" push origin main
  exit 0
fi

echo "La branche distante est en avance ou l'historique diverge. Synchronise puis relance ce script."
exit 1
