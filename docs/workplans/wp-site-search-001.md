# Workplan: Site Geneli Arama

Workplan ID: WP-SEARCH-001
Status: active
Scope: search, site, frontend, javascript, ux, content
Owner: team
Last updated: 2026-03-14

## Amac

Site genelinde kullaniciya hizli ve tutarli bir "site ici arama" deneyimi sunmak.
Mevcut `components/topbar.html` icindeki pasif arama formunu calisir hale getirmek ve sonuclari ayri bir sayfada listelemek.

## Kapsam

- Tum yayinlanan HTML sayfalari icin arama yapilabilir icerik indeksi.
- Topbar arama formunun submit davranisinin etkinlestirilmesi.
- Arama sonuclari icin yeni bir sayfa (`pages/search.html`) ve sayfa-ozel script.
- Sonuc karti, snippet, bos sonuc ve hata durumlari.
- Base path / rootPath uyumlulugu (`site.config.json` + mevcut global yol cozumu).

## Kapsam Disi

- Backend veya veritabani tabanli arama servisi.
- PDF/DOCX dosyalari icinde tam metin arama (ilk surumde).
- Otomatik typo duzeltme, semantic search veya AI tabanli siralama.

## Teknik Yakitim (Onerilen)

1. Icerik indeksi:
   `assets/data/search-index.json` dosyasinda belge bazli kayitlar tutulur.
   Alanlar: `id`, `url`, `title`, `section`, `summary`, `keywords`, `content`.
2. Indeks uretimi:
   Elle guncelleme riskini azaltmak icin `scripts/build-search-index.*` scripti ile HTML sayfalarindan indeks turetilir.
3. Runtime:
   - Global davranis: topbar formundan `q` parametresi ile `pages/search.html?q=...` yonlendirmesi.
   - Sayfa-ozel davranis: `assets/js/pages/search.js` ile indeks fetch + filtreleme + siralama + render.
4. Script sirasina uyum:
   - Tum sayfalarda global script mevcut kalir.
   - Search sayfasinda `global_scripts.js` sonrasina `assets/js/pages/search.js` eklenir.
   - `search.js`, `window.SAUTTAT.waitForSharedUI` guard'i ile baslar.

## Uygulama Adimlari

1. Analiz ve veri modeli
   - Aramaya dahil edilecek sayfa listesini netlestir.
   - Indeks JSON semasini kesinlestir.
2. UI baglanti noktasi
   - `components/topbar.html` formuna secici ekle (ornek: `data-site-search-form`, `data-site-search-input`).
   - Gerekirse mobilde arama erisimi icin minimal tetikleyici ekle.
3. Global arama yonlendirmesi
   - `assets/js/global_scripts.js` icinde form submit yakala.
   - Bos sorgu, cok kisa sorgu, trim ve URL encode kurallarini uygula.
4. Sonuc sayfasi
   - `pages/search.html` olustur.
   - `assets/css/pages/search.css` ve `assets/js/pages/search.js` ekle.
   - Sonuc yok / yuklenemedi durumlarini gosteren fallback durumlari ekle.
5. Indeks build araci
   - `scripts/build-search-index.*` ile sayfa baslik, alt baslik ve govde metnini normalize ederek JSON uret.
   - Turkiye Turkcesi karakterler icin normalize/tokenize adimi ekle (buyuk-kucuk harf uyumu + diacritics toleransi).
6. Kalite ve dogrulama
   - Include yukleme, base path, script sirasi, mobil/masaustu gorunum, konsol hata kontrolu.
   - Ornek sorgularla relevans smoke test (en az 10 sorgu).

## Teslimatlar

- `pages/search.html`
- `assets/js/pages/search.js`
- `assets/css/pages/search.css`
- `assets/data/search-index.json`
- `scripts/build-search-index.*`
- Gerekli ise `components/topbar.html` ve `assets/js/global_scripts.js` guncellemeleri
- Kisa kullanim notu (`README.md` veya `docs/` altinda)

## Basari Kriterleri (Acceptance)

- Topbar aramasi tum sayfalarda calisir.
- `q` parametresi ile paylasilabilir sonuc URL'si olusur.
- Sonuc listesi 0 sonuc / hata durumlarinda anlamli mesaj gosterir.
- Base path degistiginde (`site.config.json`) arama linkleri bozulmaz.
- Ilk sonuc gorunumu hedefi: lokal ortamda ortalama < 300ms (indeks fetch haric render suresi).
- Konsolda yeni JS hatasi olusmaz.

## Riskler ve Onlemler

- Risk: Indeksin elle guncel kalmamasi.
  Onlem: Script tabanli indeks uretimi ve checklist'e "indeks rebuild" adimi ekleme.
- Risk: Buyuk indeksle istemci performans dususu.
  Onlem: Alan agirliklandirma + kisaltilmis `content` + lazy render.
- Risk: Turkiye Turkcesi karakter uyumsuzlugu.
  Onlem: Normalize fonksiyonu ile hem sorguda hem belgede ayni donusum.

## Operasyonel Not

Bu plan `Status: active` tutulmustur. Sonraki oturumlarda arama gorevleri icin `Scope` eslesmesiyle otomatik aday plan olarak okunmalidir.
