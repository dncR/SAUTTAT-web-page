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
