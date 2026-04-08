#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOMAIN="${1:-https://sauttat.sakarya.edu.tr}"
ROOT_PATH="${2:-/gelecegintibbikongresi2026/}"

if [[ "${ROOT_PATH}" != /* ]]; then
  ROOT_PATH="/${ROOT_PATH}"
fi
if [[ "${ROOT_PATH}" != */ ]]; then
  ROOT_PATH="${ROOT_PATH}/"
fi

BASE_URL="${DOMAIN%/}${ROOT_PATH}"
TODAY="$(date +%F)"
SITEMAP_PATH="${PROJECT_ROOT}/sitemap.xml"

{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  echo '  <url>'
  echo "    <loc>${BASE_URL}</loc>"
  echo "    <lastmod>${TODAY}</lastmod>"
  echo '    <changefreq>weekly</changefreq>'
  echo '    <priority>1.0</priority>'
  echo '  </url>'

  for page_file in "${PROJECT_ROOT}"/pages/*.html; do
    page_name="$(basename "${page_file}")"
    if [[ "${page_name}" == "404.html" || "${page_name}" == "500.html" ]]; then
      continue
    fi

    echo '  <url>'
    echo "    <loc>${BASE_URL}pages/${page_name}</loc>"
    echo "    <lastmod>${TODAY}</lastmod>"
    echo '    <changefreq>weekly</changefreq>'
    echo '    <priority>0.8</priority>'
    echo '  </url>'
  done

  echo '</urlset>'
} > "${SITEMAP_PATH}"

echo "Sitemap generated: ${SITEMAP_PATH}"
