# Operasyonel Kurallar (Flexible)

Last updated: 2026-03-25
Status: active

Bu kurallar proje ihtiyacina gore guncellenebilir.

| Rule ID | Rule | Status | Change Policy | Owner | Last Review |
| --- | --- | --- | --- | --- | --- |
| OP-001 | Her yeni session `AGENTS.md` -> `rules/project_rules_entrypoint.md` -> `rules/current/*` -> `rules/session_handoff.md` sirasiyla baslar. | active | flexible | team | 2026-03-14 |
| OP-002 | Kod degisikliginden once o session icin kisa bir `Kural Ozeti` paylasilir. | active | flexible | team | 2026-03-14 |
| OP-003 | Kullanici manuel kural degisikligi yaptigini belirtirse okuma protokolu yeniden calistirilir ve kisa `Kural Ozeti (delta)` verilir. | active | flexible | team | 2026-03-14 |
| OP-004 | Yeni sayfa olustururken standart iskelet korunur: `<base href>`, SEO meta alanlari, ortak CSS/JS sirasi, `data-include` bloklari. | active | flexible | team | 2026-03-14 |
| OP-005 | Atolye akisinda veri semasi degisikliginde `assets/data/atolyeler.json` ve `assets/js/pages/atolyeler.js` birlikte guncellenir. | active | flexible | team | 2026-03-14 |
| OP-006 | Path, klasor veya sorumluluk dagilimi degistiginde `rules/` dokumanlari ayni calismada guncellenir. | active | flexible | team | 2026-03-14 |
| OP-007 | Kalite kapisi minimum kontrolleri korunur: include yukleme, aktif menu durumu, base/path cozumleme, placeholder gorunurlugu, mobil/masaustu layout, konsol JS hatalari ve script sirasi (global once, page script sonra). | active | flexible | team | 2026-03-14 |
| OP-008 | Workplan klasoru olusursa planlar `docs/workplans/` altinda metadata standardi ile tutulur ve sadece `Status: active` + `Scope` eslesen planlar okunur. | active | flexible | team | 2026-03-14 |
| OP-009 | Kural dokumanlari Turkce anlatimla yazilir; teknik alanlar (`Rule ID`, metadata anahtarlari, dosya/adlandirma) ASCII formatini korur. | active | flexible | team | 2026-03-14 |
| OP-010 | Kural degisikliklerinde `rules/current/rule_registry.md` ve `rules/current/rules_changelog.md` birlikte guncellenir. | active | flexible | team | 2026-03-14 |
| OP-011 | Yeni JS ozelligi eklenirken once kapsami belirlenir: global ise `assets/js/global_scripts.js` icine eklenir, sayfa-ozel ise `assets/js/pages/` altinda dosyalanir ve ilgili HTML dosyasinda `global_scripts.js` sonrasinda ayri `<script>` etiketi ile cagrilir. | active | flexible | team | 2026-03-14 |
| OP-012 | Sayfa-ozel scriptler, calismaya baslamadan once `window.SAUTTAT.waitForSharedUI` guard'i ile global init tamamlanmasini bekler; guard yoksa fail-safe log ile cikis yapar. | active | flexible | team | 2026-03-14 |
| OP-013 | CSS degisikligi yapilirken once ilgili katman belirlenir (`layers/*` veya `pages/*`); `global_styles.css` tek cikti dosyasi `./scripts/build-css.sh` ile yeniden uretilir ve sayfa-ozel css baglantilari korunur. | active | flexible | team | 2026-03-14 |
| OP-014 | `assets/css/layers/*.css` altinda degisiklik varsa agent `./scripts/css-build-if-layers-changed.sh` calistirarak `global_styles.css` dosyasini otomatik rebuild eder. | active | flexible | team | 2026-03-14 |
| OP-015 | Tum HTML sayfalarda standart arka plan gradyani tek kaynaktan kullanilir: `assets/css/layers/tokens.css` icindeki `--page-bg-standard`. Sayfa-ozel ust seviye wrapper arka planlari bu token ile ayni tutulur; farkli gradyan tanimlari kullanilmaz. Istisna: `pages/404.html`, `pages/500.html` ve `data-include=\"components/content-placeholder.html\"` kullanan sayfalar `body.page-bg-plain` ile beyaz arka plan kullanir; placeholder yuzeyi de beyaz tutulur. | active | flexible | team | 2026-03-25 |

## Degisim Is Akisi

1. Hedef kural dosyasini guncelle.
2. `rule_registry.md` kaydini guncelle.
3. `rules_changelog.md` kaydi ekle.
