# Kural Sistemi Genel Bakis

Last updated: 2026-03-14
Status: active

Bu klasor SAUTTAT web sayfasi icin kural yonetiminin ana kaynagidir.

## Dizin Yapisi

- `project_rules_entrypoint.md`: oturum baslangicinda okuma akisini baslatan giris dosyasi
- `current/core_rules.md`: daha stabil ve `strict` kurallar
- `current/operational_rules.md`: surece gore guncellenebilen `flexible` kurallar
- `current/rule_registry.md`: tum kural kimliklerinin envanteri
- `current/rules_changelog.md`: kural degisiklik gecmisi
- `current/rule_template.md`: yeni kural ekleme sablonu
- `session_handoff.md`: oturumlar arasi baglam devri
- `archive/`: eski snapshot ve legacy kurallar

## Agent Okuma Sirasi

1. `/AGENTS.md`
2. `rules/project_rules_entrypoint.md`
3. `rules/current/core_rules.md`
4. `rules/current/operational_rules.md`
5. `rules/session_handoff.md`
6. Varsa goreve uygun `docs/workplans/*` (`Status: active` + `Scope` eslesmesi)

## Not

- `Kural Onceligi` ile `Okuma Sirasi` farklidir.
- Oncelik celiski cozumu icindir.
- Okuma sirasi session basinda hangi dosyanin hangi sirayla islenecegini belirler.


## Komut Örnekleri (Rule Flow)

### 1) Session Başlangıcı

İlk kurulum / kapsamlı doğrulama komutu:

```text
Lütfen önce AGENTS.md dosyasını oku ve Zorunlu Oturum Başlangıç Protokolü'nü uygula. Bu kapsamda rules/project_rules_entrypoint.md ve entry-point içinde tanımlı dosyaları sırayla okuyup bu oturum için Rule Summary oluştur; sonraki adımlarda bu özete göre ilerle.
```

Kısa komut (session koordinasyonu):

```text
AGENTS.md dosyasını oku ve Zorunlu Oturum Başlangıç Protokolü'nü uygula. Bu oturum için Rule Summary oluştur; sonraki adımlarda bu özete göre ilerle.
```

### 2) Session İçindeyken AI'dan Kural Ekleme

İlk kurulum / kapsamlı doğrulama komutu:

```text
Operasyonel bir kural ekle: "Agent, kural dosyalarında yaptığı her değişiklikten sonra Rule Summary bilgisini otomatik yeniler." İlgili dosyaları (rules/current/operational_rules.md, rules/current/rule_registry.md, rules/current/rules_changelog.md) güncelle; gerekiyorsa rules/project_rules_entrypoint.md özetini de revize et ve devam et.
```

Kısa komut (session koordinasyonu):

```text
Operasyonel bir kural ekle: "Agent, kural dosyalarında yaptığı her değişiklikten sonra Rule Summary bilgisini otomatik yeniler." İlgili kural dosyalarını güncelle ve devam et.
```

Not: Bu bölüm yeni kural ekletme örneğidir. Mevcut düzende `Rule Summary` akışı OP-002 (oturum başı özet) ve OP-003 (manuel değişiklik sonrası delta) ile tanımlıdır.

### 3) Session İçindeyken Kullanıcı Manuel Kural Ekledikten Sonra

İlk kurulum / kapsamlı doğrulama komutu:

```text
Kural dosyalarında manuel değişiklik yaptım. AGENTS.md dosyasından başlayarak Zorunlu Oturum Başlangıç Protokolü'nü yeniden çalıştır, Rule Summary bilgisini güncelle ve sadece değişen maddeleri kısa bir delta özet olarak yaz.
```

Kısa komut (session koordinasyonu):

```text
Kural dosyalarında manuel değişiklik yaptım. Zorunlu Oturum Başlangıç Protokolü'nü yeniden çalıştır, Rule Summary (delta) paylaş ve ardından devam et.
```

Not: OP-003 bu akışı standartlaştırır.

## Workplan Oluşturma Notları

Workplan isterken aşağıdaki noktaları komuta eklemek tutarlılığı artırır:

- `Kural Protokolüne uygun` üretim beklentisini açıkça yaz.
- Dosya konumunu `docs/workplans/` olarak belirt.
- Metadata alanlarını zorunlu tut: `Workplan ID`, `Status`, `Scope`, `Owner`, `Last updated`.
- Başlangıç durumunu net ver (`active` veya `proposed`).
- Kapsamı (`Scope`) görevle eşleşecek şekilde ve küçük harf, virgülle ayrılmış etiket listesi formatında yaz.
- Revizyonlarda mevcut planı güncelleme mi, yeni plan açma mı istediğini belirt.

Örnek prompt (kısa):

```text
Kural Protokolüne uygun şekilde docs/workplans altında yeni bir workplan oluştur. Metadata alanlarını (Workplan ID, Status, Scope, Owner, Last updated) eksiksiz doldur ve bu görev için başlangıç durumunu proposed olarak ayarla.
```

Örnek prompt (detaylı):

```text
Kural Protokolüne uygun şekilde docs/workplans/{dosya_adi}.md workplan dosyasını oluştur. Zorunlu metadata alanlarını başlıkta ekle: Workplan ID, Status, Scope, Owner, Last updated. Status=active ise oturum başlangıcında okunabilir olacak şekilde Scope değerini görevle uyumlu tanımla. Sonunda kısa bir "neden bu kapsam" notu ve uygulanabilir adım listesi ekle.
```

## Parametre Sözlüğü ve Değer Kümeleri

Bu bölüm, kural setinde kullanılan metadata ve workflow parametrelerini tek yerde toplar.

### Kural Metadata Parametreleri

- `Rule ID`: benzersiz kimlik. Örnek format: `CR-001`, `OP-009`.
- `Category`: `core` | `operational`
- `Status`: `proposed` | `active` | `frozen` | `deprecated`
- `Change Policy`: `strict` | `flexible`
- `Owner`: `team` | `maintainer` | kişi adı/kısa kimliği
- `Last Review`: `YYYY-MM-DD`
- `Source File`: ilgili kuralın bulunduğu dosya yolu (örnek: `rules/current/core_rules.md`)

### Workplan Metadata Parametreleri

- `Workplan ID`: benzersiz plan kimliği. Örnek format: `WP-DB-001`, `WP-OPS-SSL-001`.
- `Status`: `active` | `proposed` | `on_hold` | `completed` | `archived`
- `Scope`: küçük harf, virgülle ayrılmış etki alanları. Örnek: `database, backend, api, content`
- `Owner`: `team` | `maintainer` | kişi adı/kısa kimliği
- `Last updated`: `YYYY-MM-DD`

### Workflow Parametreleri ve İşleme Kuralları

- `Rule Summary`: oturum başında oluşturulan kısa, güncel kural özeti.
- `Rule Summary (delta)`: manuel kural değişikliğinden sonra sadece farkları içeren özet.
- `Status: active` (workplan filtresi): oturum başlangıcında okunacak workplan seçimi için zorunlu koşul.
- `Scope` eşleşmesi: görev etiketleri ve workplan `Scope` etiketleri küçük harfe normalize edilir, virgüle göre ayrıştırılır; en az bir ortak etiket varsa eşleşme kabul edilir.
- `Kural Protokolüne uygun`: workplan veya kural üretiminde metadata alanlarının eksiksiz ve mevcut kural zinciriyle uyumlu olmasını zorunlu kılan talimat ifadesi.

## Bakım Notları

- Kural ID'lerini benzersiz tut.
- Kaldırılan kuralları silmek yerine `deprecated` durumuna çek.
- Kural değişikliklerinde `current/rule_registry.md` ve `current/rules_changelog.md` dosyalarını birlikte güncelle.
