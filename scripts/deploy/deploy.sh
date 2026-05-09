#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd)"

MINOR=0
SKIP_RELEASE=0
POSITIONAL_TARGET=""

for arg in "$@"; do
  case "$arg" in
    --minor) MINOR=1 ;;
    --skip-release) SKIP_RELEASE=1 ;;
    *)
      if [[ "$arg" == *@* ]]; then
        POSITIONAL_TARGET="$arg"
      fi
      ;;
  esac
done

if [[ -f "$ROOT_DIR/.deploy" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "$ROOT_DIR/.deploy"
  set +a
fi

TARGET_HOST="${POSITIONAL_TARGET:-${DEPLOY_SSH_TARGET:-}}"

if [[ -z "$TARGET_HOST" ]]; then
  echo "Erreur : cible SSH manquante."
  echo "  Créez .deploy (voir .deploy.example) ou passez user@host :"
  echo "  Usage: ./deploy/deploy.sh [--minor] [--skip-release] [user@host]"
  exit 1
fi

echo "==> 1/6 Pré-check (git)"
bash "$SCRIPT_DIR/deploy-pre-check.sh"

echo "==> 2/6 Prettier"
bash "$SCRIPT_DIR/deploy-prettier.sh"

echo "==> 3/6 Lint, typecheck, tests"
bash "$SCRIPT_DIR/deploy-check.sh"

if [[ "$SKIP_RELEASE" -eq 0 ]]; then
  echo "==> 4/6 Release (package.json, tag, push)"
  RELEASE_ARGS=()
  [[ "$MINOR" -eq 1 ]] && RELEASE_ARGS+=(--minor)
  bash "$SCRIPT_DIR/deploy-release.sh" "${RELEASE_ARGS[@]}"
else
  echo "==> 4/6 Release (ignoré, --skip-release)"
fi

echo "==> 5/6 Build"
yarn --cwd "$ROOT_DIR" build

echo "==> 6/6 Déploiement droplet"
bash "$SCRIPT_DIR/deploy-droplet.sh" "$POSITIONAL_TARGET"
