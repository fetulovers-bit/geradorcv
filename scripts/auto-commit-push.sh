#!/usr/bin/env bash
set -euo pipefail

# Auto-commit and push any change detected in the repo.
# Usage: ./scripts/auto-commit-push.sh [branch]

ROOT_DIR="$(git rev-parse --show-toplevel)"
BRANCH="${1:-main}"
INTERVAL_SECONDS="${INTERVAL_SECONDS:-3}"

cd "$ROOT_DIR"

echo "[auto-commit-push] Monitoring: $ROOT_DIR"
echo "[auto-commit-push] Remote branch target: $BRANCH"
echo "[auto-commit-push] Poll interval: ${INTERVAL_SECONDS}s"

auto_commit_push() {
  if [[ -z "$(git status --porcelain)" ]]; then
    return 0
  fi

  git add -A .

  if git diff --cached --quiet; then
    return 0
  fi

  timestamp="$(date -u +"%Y-%m-%d %H:%M:%S UTC")"
  git commit -m "chore: auto commit ${timestamp}"
  git push -u origin "HEAD:${BRANCH}"
  echo "[auto-commit-push] Committed and pushed to origin/${BRANCH} at $timestamp"
}

trap 'echo; echo "[auto-commit-push] Stopping monitor."; exit 0' INT TERM

while true; do
  auto_commit_push
  sleep "$INTERVAL_SECONDS"
done
