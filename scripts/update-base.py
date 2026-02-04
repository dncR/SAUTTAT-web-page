#!/usr/bin/env python3
import json
import os
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = PROJECT_ROOT / "site.config.json"


def read_config():
    if not CONFIG_PATH.exists():
        raise FileNotFoundError(f"Missing config: {CONFIG_PATH}")
    return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))


def normalize_root_path(value: str) -> str:
    if not value or not isinstance(value, str):
        return "/"
    if value in {".", "./"}:
        return "/"
    if not value.startswith("/"):
        value = f"/{value}"
    if not value.endswith("/"):
        value = f"{value}/"
    return value


def list_html_files(directory: Path):
    return [p for p in directory.rglob("*.html") if p.is_file()]


def ensure_base_tag(html: str, base_href: str) -> str:
    if re.search(r"<base\s+href=", html, flags=re.IGNORECASE):
        return re.sub(
            r"[ \t]*<base\s+href=[\"'][^\"']*[\"']\s*/?>",
            f'  <base href="{base_href}">',
            html,
            flags=re.IGNORECASE,
        )
    return re.sub(r"<head>", f'<head>\n  <base href="{base_href}">', html, flags=re.IGNORECASE)


def normalize_relative_paths(html: str) -> str:
    return re.sub(r"=(['\"])../", r"=\1", html)


def main():
    config = read_config()
    base_href = normalize_root_path(config.get("rootPath", "/"))

    files = [PROJECT_ROOT / "index.html"]
    files.extend(list_html_files(PROJECT_ROOT / "pages"))

    for file_path in files:
        raw = file_path.read_text(encoding="utf-8")
        updated = ensure_base_tag(raw, base_href)
        updated = normalize_relative_paths(updated)
        if updated != raw:
            file_path.write_text(updated, encoding="utf-8")


if __name__ == "__main__":
    main()
