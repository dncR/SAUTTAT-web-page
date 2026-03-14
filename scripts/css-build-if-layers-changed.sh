#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LAYER_GLOB="assets/css/layers/*.css"

cd "$ROOT_DIR"

has_changes=false

if git diff --name-only -- $LAYER_GLOB | grep -q .; then
  has_changes=true
fi

if git diff --cached --name-only -- $LAYER_GLOB | grep -q .; then
  has_changes=true
fi

if git ls-files --others --exclude-standard -- $LAYER_GLOB | grep -q .; then
  has_changes=true
fi

if [ "$has_changes" = true ]; then
  echo "Detected CSS layer changes. Rebuilding global_styles.css..."
  "$ROOT_DIR/scripts/build-css.sh"
else
  echo "No CSS layer changes detected. Skipping build."
fi
