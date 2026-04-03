# SAUTTAT Web Sayfası

Yerel bilgisayarda HTTP sunucusunu ve geliştirme ortamını başlatmak için proje kök dizininde aşağıdaki komutu terminalden çalıştırınız.

``python3 -m http.server 9000``

* Yerel cihazınızda kurulu Python yazılımı işletim sistemine ve yazılımın sürümüne bağlı olarak `python` ya da `python3` gibi farklı komutlar ile çalışıyor olabilir.
* Yukarıdaki komut satırında HTTP sunucusunun portu varsayılan oalrak 9000 portundan başlatılmaktadır. Farklı portlar üzerinden de sunucu başlatılabilir.
* Yerel HTTP sunucusu başlatıldıktan sonra herhangi bir internet tarayıcısı üzerinden `localhost:9000` adresi ile web sayfası görüntülenebilir.

## PATH ve BASE URL Yönetimi

Projede `<base href="...">` etiketi kullanılır. Bu etiket, tüm `href` ve `src` yollarının çözümlemesinde temel alınır. Böylece siteyi alt dizin altında (ör. `/gelecegintibbikongresi2026/`) yayınlamak güvenli şekilde mümkündür.

### Konfigürasyon

`site.config.json` dosyasında tek bir alan yönetilir:

```
{
  "rootPath": "/gelecegintibbikongresi2026/"
}
```

* Uzak sunucu için `rootPath` örneği: `/gelecegintibbikongresi2026/`
* Local geliştirme için `rootPath` değeri: `/`

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

## Sponsor Ekleme ve Render Akışı

Sponsor logolari ana sayfada (`index.html`) dinamik olarak `assets/js/pages/home.js` tarafinda render edilir. Veri kaynagi tek dosyadir: `assets/data/sponsors.json`.

### `assets/data/sponsors.json` dosyasinin islevi

Bu dosya sponsor carousel'inde gosterilecek tum kayitlarin metadata kaynagidir. `home.js` icindeki `loadSponsors()` fonksiyonu bu JSON'u okur, kayitlari `sponsorshipType` sirasina gore dizer ve logolari `components/sponsors.html` icindeki alana basar.

Her sponsor kaydinda asagidaki alanlar kullanilir:

- `id`: benzersiz kayit anahtari (kisa, slug formatinda)
- `sponsorName`: logo `alt` metninde kullanilan gorunen ad
- `logoFilePath`: logo dosyasinin yolu (or. `assets/img/sponsors/ornek.png`)
- `sponsorshipType`: siralama seviyesi (`Platin`, `Gold`, `Silver`, `Bronze`)
- `url`: opsiyonel dis baglanti (`null` veya `https://...`)

### Sponsor ekleme adimlari

1. Logo dosyasini `assets/img/sponsors/` klasorune ekleyin.
2. `assets/data/sponsors.json` dosyasina yeni sponsor nesnesini ekleyin.
3. `id` degerinin benzersiz oldugunu ve `logoFilePath` yolunun dogru dosyayi gosterdigini kontrol edin.
4. Dis yonlendirme isteniyorsa `url` alanina tam adres yazin, yoksa `null` birakin.
5. Yerelde `python3 -m http.server 9000` ile acip ana sayfada carousel'i kontrol edin.

### Hizli dogrulama checklist'i

- `index.html` icinde `components/sponsors.html` include'u duruyor.
- `index.html` icinde `assets/js/pages/home.js`, `assets/js/global_scripts.js` sonrasinda yukleniyor.
- Tarayici konsolunda sponsor fetch/render hatasi yok.
