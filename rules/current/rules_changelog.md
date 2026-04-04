# Kural Degisiklik Gunlugu

Bu dosyada anlamli kural degisiklikleri izlenir.

## Current Canonical Paths

- `AGENTS.md`
- `rules/project_rules_entrypoint.md`
- `rules/current/core_rules.md`
- `rules/current/operational_rules.md`
- `rules/current/rule_registry.md`
- `rules/current/rules_changelog.md`
- `rules/session_handoff.md`
- `docs/workplans/*` (`Status: active` + `Scope` eslesmesi oldugunda)

## 2026-04-04

- Degisti: `assets/js/pages/home.js` sponsor render akisi refactor edildi; combined ve split carousel icin ortak render motoru kullanilacak sekilde sadelelestirildi.
- Eklendi: `home.js` icine `site.config.json` okuma adimi ve `splitSponsorsCarousel` bayragina gore aktif sponsor layout secimi.
- Degisti: sponsor layout secimi ve inaktif layout'un `home.js` tarafinda gizlenmesi standardize edildi.
- Degisti: `rules/current/operational_rules.md` icinde `OP-016` revize edildi ve yeni `OP-017` eklendi.
- Degisti: `rules/current/operational_rules.md` "Last updated" alani 2026-04-04 olarak guncellendi.
- Degisti: `rules/current/rule_registry.md` kaydina `OP-017` eklendi, `OP-016` notu guncellendi ve "Last updated" alani 2026-04-04 olarak guncellendi.
- Degisti: `README.md` icinde `site.config.json` ve sponsor render davranisi (`splitSponsorsCarousel`) dokumante edildi.
- Degisti: sponsor include yapisi sadelelestirildi; `components/sponsors-by-tier.html` kaldirildi, split/combined section'lar `components/sponsors.html` icinde birlestirildi ve `index.html` tek sponsor include'u kullanacak sekilde guncellendi.
- Degisti: sponsor metadata semasina `hide` gorunurluk bayragi eklendi; varsayilan davranis tum sponsorlarin gorunur kalmasi olacak sekilde netlestirildi.
- Eklendi: operasyonel kural `OP-018` (sponsor carousel responsive slot/loop kosulu ve tek kartta iki-slot referans genisligi davranisi).
- Degisti: `rule_registry.md` kaydinda `OP-016` notu `hide` alani ile guncellendi ve yeni `OP-018` kaydi eklendi.
- Degisti: `README.md` sponsor kilavuzu split carousel yerlesim/loop kurallari ile guncellendi.

## 2026-04-03

- Eklendi: `README.md` icine "Sponsor Ekleme ve Render Akisi" bolumu eklenerek sponsor ekleme adimlari ve `assets/data/sponsors.json` dosyasinin rolu dokumante edildi.
- Eklendi: operasyonel kural `OP-016` (sponsor metadata alani, logo konumu, `index.html` include yapisi, `home.js` render akisi ve script sirasi standardi).
- Degisti: `rules/current/operational_rules.md` "Last updated" alani 2026-04-03 olarak guncellendi.
- Degisti: `rules/current/rule_registry.md` kaydina `OP-016` eklendi ve "Last updated" alani 2026-04-03 olarak guncellendi.

## 2026-03-25

- Degisti: tum sayfalarda ortak arka plan gradyani standardi token tabanli modele cekildi (`--page-bg-standard`).
- Degisti: `assets/css/layers/base.css` icinde `body` arka plani `--page-bg-standard` kullanacak sekilde guncellendi.
- Degisti: sayfa-ozel ust wrapper arka planlari ortak token ile hizalandi (`program-short`, `program-social`, `gala-dinner`, `conference-about`, `conference-topics`, `committee`, `awards`).
- Eklendi: operasyonel kural `OP-015` (tum HTML sayfalarinda standart arka plan gradyani tek kaynaktan kullanilir).
- Degisti: `OP-015` icin istisna tanimlandi; `404`, `500` ve `content-placeholder` yuzeylerinde `--page-bg-soft` kullanimi eklendi.
- Degisti: `404` ve `500` sayfalari beyaz arka plana geri alindi; `OP-015` istisnasi yalniz `content-placeholder` icin birakildi.
- Degisti: `OP-015` istisnasi guncellendi; `404`, `500` ve `content-placeholder` include kullanan tum sayfalarda `body.page-bg-plain` ile beyaz arka plan standardi tanimlandi.
- Degisti: `content-placeholder` yuzeyi acik gri yerine beyaz arka plan kullanacak sekilde guncellendi.

## 2026-03-14

- Degisti: SAUTTAT kural sistemi `rules/01-06` duz yapisindan katmanli yapıya gecirildi.
- Eklendi: `rules/current/` altinda `core_rules.md` ve `operational_rules.md`.
- Eklendi: `rules/current/rule_registry.md`, `rules/current/rules_changelog.md`, `rules/current/rule_template.md`.
- Eklendi: `rules/project_rules_entrypoint.md`, `rules/README.md`, `rules/session_handoff.md`.
- Eklendi: onceki duz yapiyi saklamak icin `rules/archive/project_rules_legacy_2026-03-14.md`.
- Degisti: `AGENTS.md` session-baslangic protokolu + kural onceligi modeli ile guncellendi.
- Kaldirildi: `rules/01-project-map.md`, `rules/02-page-shell-and-components.md`, `rules/03-content-lifecycle.md`, `rules/04-path-and-base-management.md`, `rules/05-data-driven-pages.md`, `rules/06-quality-gates.md` (icerik archive snapshot'a tasindi).
- Degisti: `assets/js/custom_script.js` dosyasi loader yapisina cekildi; global davranislar `assets/js/core/shared-ui.js` dosyasina tasindi.
- Eklendi: index sayfasi ozel davranislari icin `assets/js/pages/home.js`.
- Eklendi: performans odakli JS kapsami kurallari (`CR-009`, `OP-011`) ve registry kayitlari.
- Degisti: loader yaklasimi kaldirildi; tum ortak davranislar `assets/js/global_scripts.js` altinda tekillestirildi.
- Degisti: dosya adlandirma standardi icin `custom_script.js` kaldirildi, yerine `global_scripts.js` kullanima alindi.
- Degisti: sayfa-ozel script cagrisi loader haritasi yerine HTML seviyesinde acik tanim modeline cekildi (ornek: `index.html` -> `assets/js/pages/home.js`, `atolyeler.html` -> `assets/js/pages/atolyeler.js`).
- Degisti: atolye script yolu `assets/js/atolyeler.js` konumundan `assets/js/pages/atolyeler.js` konumuna tasindi.
- Degisti: `assets/js/global_scripts.js` IIFE + namespace izolasyonu ile sertlestirildi; global kapsamda yalniz `window.SAUTTAT` API'si birakildi.
- Degisti: `assets/js/pages/home.js` ve `assets/js/pages/atolyeler.js` dosyalarina `waitForSharedUI` script-order guard eklendi.
- Eklendi: operasyonel seviyede script-order ve guard standardi (`OP-012`).
- Degisti: kalite kapisi maddesi script yukleme sirasi kontrolunu acikca icerecek sekilde guncellendi (`OP-007`).
- Eklendi: katmanli CSS yapisi kuruldu (`assets/css/layers/*`, `assets/css/pages/*`, `assets/css/global_styles.css`).
- Degisti: tum HTML sayfalari `assets/css/custom_style.css` yerine `assets/css/global_styles.css` kullanacak sekilde guncellendi.
- Eklendi: sayfa-ozel CSS baglantilari (`home`, `conference-about`, `atolyeler`, `registration`, `sponsorship`, `committee`, `awards`).
- Eklendi: CSS mimarisi icin yeni kural kayitlari (`CR-010`, `OP-013`).
- Degisti: `global_styles.css` performans icin `@import` modeli yerine katmanlardan uretilen tek cikti dosyasi olarak duzenlendi.
- Eklendi: `scripts/build-css.sh` ile global CSS cikti uretimi standardize edildi.
- Eklendi: `scripts/css-build-if-layers-changed.sh` ile layer degisikligi algilaninca global css rebuild otomasyonu.
- Eklendi: otomatik CSS rebuild kurali (`OP-014`).
