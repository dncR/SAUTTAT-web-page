# SAUTTAT CSS Yapisi

Bu klasorde stil yonetimi katmanli yapi ile surdurulur.

## Giris Noktasi

- `global_styles.css`: tum sayfalarda yuklenen ortak CSS dosyasi (tek request icin katmanlardan uretilmis cikti)

## Katmanlar

- `layers/tokens.css`: renk ve tema degiskenleri
- `layers/base.css`: temel html/body/link stilleri
- `layers/components.css`: ortak component ve layout stilleri
- `layers/utilities.css`: yardimci utility siniflari

## Sayfa Ozel Dosyalar

Sayfa bazli stiller `pages/` altinda tutulur ve sadece ilgili HTML dosyalarinda cagrilir.

## Legacy Dosya

- `custom_style.css`: gecis donemi referansi icin korunur; yeni degisiklikler bu dosyaya eklenmez.

## Global CSS Uretimi

Katman dosyalarinda degisiklik yaptiktan sonra `global_styles.css` dosyasini yeniden uret:

```bash
./scripts/build-css.sh
```

Katmanlarda degisiklik varsa rebuild'i otomatik tetiklemek icin:

```bash
./scripts/css-build-if-layers-changed.sh
```
