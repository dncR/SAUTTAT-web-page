#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CSS_DIR="$ROOT_DIR/assets/css"
LAYERS_DIR="$CSS_DIR/layers"
OUTPUT_FILE="$CSS_DIR/global_styles.css"

{
  echo "/* SAUTTAT global stylesheet (generated from layers) */"
  echo "/* Source: assets/css/layers/tokens.css, base.css, components.css, utilities.css */"
  echo
  cat "$LAYERS_DIR/tokens.css"
  echo
  cat "$LAYERS_DIR/base.css"
  echo
  cat "$LAYERS_DIR/components.css"
  echo
  cat "$LAYERS_DIR/utilities.css"
} > "$OUTPUT_FILE"

echo "Built: $OUTPUT_FILE"
