#!/usr/bin/env bash
set -euo pipefail

# Auto-commit and push any change detected in the repo.
# Usage: ./scripts/auto-commit-push.sh [branch]

ROOT_DIR="$(git rev-parse --show-toplevel)"
BRANCH="${1:-$(git rev-parse --abbrev-ref HEAD)}"
INTERVAL_SECONDS="${INTERVAL_SECONDS:-3}"

cd "$ROOT_DIR"

echo "[auto-commit-push] Monitoring: $ROOT_DIR"
echo "[auto-commit-push] Branch: $BRANCH"
echo "[auto-commit-push] Poll interval: ${INTERVAL_SECONDS}s"

auto_commit_push() {
  if git diff --quiet && git diff --cached --quiet; then
    return 0
  fi

  git add .

  if git diff --cached --quiet; then
    return 0
  fi

  timestamp="$(date -u +"%Y-%m-%d %H:%M:%S UTC")"
  git commit -m "chore: auto commit ${timestamp}"
  git push origin "$BRANCH"
  echo "[auto-commit-push] Committed and pushed at $timestamp"
}

trap 'echo; echo "[auto-commit-push] Stopping monitor."; exit 0' INT TERM

while true; do
  auto_commit_push
  sleep "$INTERVAL_SECONDS"
done
