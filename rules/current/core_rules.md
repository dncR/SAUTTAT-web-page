# Cekirdek Kurallar (Strict)

Last updated: 2026-03-14
Status: active

Bu kurallar daha stabil yapidadir ve acik onay olmadan degistirilmemelidir.

| Rule ID | Rule | Status | Change Policy | Owner | Last Review |
| --- | --- | --- | --- | --- | --- |
| CR-001 | Site path/base yonetiminde tek dogruluk kaynagi `site.config.json` icindeki `rootPath` degeridir; yayin oncesi `scripts/update-base.py` calistirilir. | active | strict | team | 2026-03-14 |
| CR-002 | Tum sayfalarda ortak yapi `data-include` ile (`components/topbar.html`, `components/header.html`, `components/footer.html`) korunur. | active | strict | team | 2026-03-14 |
| CR-003 | Tum sayfalarda ortak JS davranislari `assets/js/global_scripts.js` dosyasinda merkezi tutulur ve her sayfada bu dosya yuklenir. | active | strict | team | 2026-03-14 |
| CR-004 | Placeholder modundaki sayfalarda `components/content-placeholder.html` + asil icerigin `d-none` ile saklanmasi yaklasimi korunur (ornek: `pages/conference-topics.html`). | on_hold | strict | team | 2026-03-14 |
| CR-005 | Navigasyon tutarliligi icin `components/header.html` icindeki `data-nav-match` degerleri ilgili sayfa ile uyumlu tutulur. | active | strict | team | 2026-03-14 |
| CR-006 | SAUTTAT sitesi static-first yapida korunur; backend/veritabani gerektiren degisimler workplan ve acik onay ile ilerler. | active | strict | team | 2026-03-14 |
| CR-007 | Kural dosyasi degisiklikleri `rules/current/rules_changelog.md` dosyasina islenir. | active | strict | team | 2026-03-14 |
| CR-008 | Bir kullanici talebi strict kuralla celisirse agent uygulamadan once riski bildirir ve explicit onay ister. | active | strict | team | 2026-03-14 |
| CR-009 | Performans icin page-specific davranislar `assets/js/pages/*.js` altinda tutulur ve yalniz ilgili HTML sayfasinda ikinci script etiketi olarak cagrilir; tum sayfalara gereksiz JS bind edilmez. | active | strict | team | 2026-03-14 |
| CR-010 | CSS mimarisi katmanli yapida korunur: tum sayfalarda `assets/css/global_styles.css` giris dosyasi, sayfa-ozel stillerde `assets/css/pages/*.css` kullanilir. | active | strict | team | 2026-03-14 |

## Notlar

- `strict` kurali kaldirmak yerine gerekirse `deprecated` durumuna cek.
