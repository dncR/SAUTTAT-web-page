# SAUTTAT Web Sayfası

Yerel bilgisayarda HTTP sunucusunu ve geliştirme ortamını başlatmak için proje kök dizininde aşağıdaki komutu terminalden çalıştırınız.

``python3 -m http.server 9000``

* Yerel cihazınızda kurulu Python yazılımı işletim sistemine ve yazılımın sürümüne bağlı olarak `python` ya da `python3` gibi farklı komutlar ile çalışıyor olabilir.
* Yukarıdaki komut satırında HTTP sunucusunun portu varsayılan oalrak 9000 portundan başlatılmaktadır. Farklı portlar üzerinden de sunucu başlatılabilir.
* Yerel HTTP sunucusu başlatıldıktan sonra herhangi bir internet tarayıcısı üzerinden `localhost:9000` adresi ile web sayfası görüntülenebilir.

## PATH ve BASE URL Yönetimi

Projede `<base href="...">` etiketi kullanılır. Bu etiket, tüm `href` ve `src` yollarının çözümlemesinde temel alınır. Böylece siteyi alt dizin altında (ör. `/gelecegintibbikongresi2026/`) yayınlamak güvenli şekilde mümkündür.

### Konfigürasyon

`site.config.json` dosyasında ortam ve davranis ayarlari yonetilir:

```
{
  "rootPath": "/gelecegintibbikongresi2026/",
  "splitSponsorsCarousel": false
}
```

* Uzak sunucu için `rootPath` örneği: `/gelecegintibbikongresi2026/`
* Local geliştirme için `rootPath` değeri: `/`
* Ana sayfa sponsor layout secimi:
  * `splitSponsorsCarousel: true` -> `components/sponsors.html` icindeki split section (`[data-sponsors-by-tier]`)
  * `splitSponsorsCarousel: false` -> `components/sponsors.html` icindeki combined section (`.sponsors-section`)

### Base Güncelleme Scripti

`scripts/update-base.py` scripti:

* Tüm HTML dosyalarına `<base href="...">` ekler veya günceller.
* `../` ile başlayan relative yolları temizleyerek `assets/...`, `pages/...` formuna dönüştürür.

Çalıştırma:

```
python3 scripts/update-base.py
```

### Önerilen Akış

* `site.config.json` içindeki `rootPath` değerini hedef ortama göre değiştirin.
* Sonrasında `python3 scripts/update-base.py` çalıştırın.
* Üretilen HTML dosyalarını sunucuya yükleyin.

## SEO Yayın Akışı (Remote Host)

Kongre sitesi alt klasörden yayınlandığı için (`/gelecegintibbikongresi2026/`) canonical URL ve sitemap bu yapıya göre üretilmelidir.

Yayın öncesi önerilen sıra:

1. `site.config.json` içinde `rootPath` değerini `/gelecegintibbikongresi2026/` yapın.
2. `python3 scripts/update-base.py` çalıştırın.
3. `./scripts/build-sitemap.sh` çalıştırın.
4. Proje dosyalarını `/my-home-www/gelecegintibbikongresi2026/` altına yükleyin.
5. `robots.txt` dosyasını ayrıca `/my-home-www/robots.txt` konumuna koyun.

Not: `robots.txt` sadece domain kökünde (`https://sauttat.sakarya.edu.tr/robots.txt`) etkili olur. Alt klasördeki `robots.txt` Google tarafından ana robots dosyası olarak kullanılmaz.

## Sponsor Ekleme ve Render Akışı

Sponsor logolari ana sayfada (`index.html`) dinamik olarak `assets/js/pages/home.js` tarafinda render edilir. Veri kaynagi tek dosyadir: `assets/data/sponsors.json`.
Render layout'u `site.config.json` icindeki `splitSponsorsCarousel` bayragina gore secilir.

### `assets/data/sponsors.json` dosyasinin islevi

Bu dosya sponsor carousel'lerinde gosterilecek tum kayitlarin metadata kaynagidir. `home.js` icindeki `loadSponsors()` fonksiyonu bu JSON'u okur.

* Combined layout (`splitSponsorsCarousel: false`):
  * Kayitlar case-insensitive olarak `sponsorshipType` sirasina gore dizilir (`platin > gold > silver > bronze`).
  * `sponsorshipType: null` olan kayitlar tier'lar sonrasinda, JSON'daki kaynak sira korunarak eklenir.
* Split layout (`splitSponsorsCarousel: true`):
  * Kayitlar sponsorluk tipine gore gruplandirilarak ayri carousel bloklarinda render edilir.
  * Her tier bagimsiz carousel akisi ile calisir.
  * Slider yalnizca kategori sponsor sayisi gorunen kart sayisindan buyukse calisir (`count > visibleSlots`); esitlikte slider calismaz.
  * Tek kart gorunumu gereken durumlarda kart genisligi iki-kart referansi ile hesaplanir; kart carousel alanini doldurmaz.

Her sponsor kaydinda asagidaki alanlar kullanilir:

- `id`: benzersiz kayit anahtari (kisa, slug formatinda)
- `sponsorName`: logo `alt` metninde kullanilan gorunen ad
- `logoFilePath`: logo dosyasinin yolu (or. `assets/img/sponsors/ornek.png`)
- `sponsorshipType`: siralama seviyesi (`platin`, `gold`, `silver`, `bronze`) veya `null`
- `url`: opsiyonel dis baglanti (`null` veya `https://...`)
- `hide`: opsiyonel gorunurluk bayragi (`true` ise sponsor karti render edilmez, varsayilan `false`)

### Sponsor ekleme adimlari

1. Logo dosyasini `assets/img/sponsors/` klasorune ekleyin.
2. `assets/data/sponsors.json` dosyasina yeni sponsor nesnesini ekleyin.
3. `id` degerinin benzersiz oldugunu ve `logoFilePath` yolunun dogru dosyayi gosterdigini kontrol edin.
4. Dis yonlendirme isteniyorsa `url` alanina tam adres yazin, yoksa `null` birakin.
5. Sponsor kartinin gecici olarak gizlenmesi isteniyorsa ilgili kayitta `hide: true` kullanin.
6. Yerelde `python3 -m http.server 9000` ile acip ana sayfada carousel'i kontrol edin.

### Hizli dogrulama checklist'i

- `index.html` icinde `components/sponsors.html` include'u duruyor.
- `site.config.json` icinde `splitSponsorsCarousel` degeri hedeflenen layout ile uyumlu.
- `index.html` icinde `assets/js/pages/home.js`, `assets/js/global_scripts.js` sonrasinda yukleniyor.
- Tarayici konsolunda sponsor fetch/render hatasi yok.
