# Agent Calisma Sozlesmesi

Last updated: 2026-03-14
Status: active

Bu dosya SAUTTAT projesinde AI agent calisma protokolunun en ust otoritesidir.

## Kural Onceligi

Dokumanlar arasinda celiski olursa asagidaki oncelik sirasi uygulanir:

1. `AGENTS.md`
2. `rules/current/core_rules.md`
3. `rules/current/operational_rules.md`
4. `rules/project_rules_entrypoint.md`
5. `docs/workplans/` altindaki `Status: active` ve gorevle eslesen `Scope` degerine sahip workplan dosyalari
6. `rules/archive/` altindaki legacy dokumanlar

Not: Bu liste celiski cozumu icindir. Oturum baslangicindaki zorunlu okuma sirasi asagida tanimlanmistir.

## Zorunlu Oturum Baslangic Protokolu

Her yeni session basinda agent su adimlari tamamlar:

1. `AGENTS.md` dosyasini oku.
2. `rules/project_rules_entrypoint.md` dosyasini oku.
3. Entry-point icinde listelenen dosyalari sirasiyla oku (`rules/current/core_rules.md`, `rules/current/operational_rules.md`, `rules/session_handoff.md`).
4. `docs/workplans/` klasoru varsa, `Status: active` ve gorevle eslesen `Scope` etiketine sahip planlari kod degisikliginden once oku.

Kod degisikligine baslamadan once agent kisa bir `Kural Ozeti` paylasir.

## Workplan Metadata Protokolu

`docs/workplans/` altinda olusturulacak her plan su alanlari baslikta icermelidir:

- `Workplan ID`
- `Status` (`active`, `proposed`, `on_hold`, `completed`, `archived`)
- `Scope` (virgulle ayrilmis etiket listesi)
- `Owner`
- `Last updated`

Workplan secim kurali:

1. Yalnizca `Status: active` olan dosyalar aday kabul edilir.
2. `Scope` eslesmesi, gorev etiketleri ile plan etiketlerinin kucuk harfe normalize edilip virgulle ayrildi sonra kesisim kontrolu ile yapilir.
3. Birden fazla eslesen aktif plan varsa tamami okunur.
4. Eslesen aktif plan yoksa agent calismaya devam eder ve bunu kisa not olarak belirtir.

## Kural Yasam Dongusu

Her kural kaydinda su metadata alanlari bulunur:

- `Rule ID`
- `Status` (`proposed`, `active`, `frozen`, `deprecated`)
- `Owner`
- `Last Review`
- `Change Policy` (`strict` veya `flexible`)

## Duzenleme Politikasi

- `strict` kurallar acik kullanici onayi olmadan degistirilmez.
- `flexible` kurallar proje yapisina gore guncellenebilir.
- Kural degisikligi yapildiginda asagidaki dosyalar birlikte guncellenir:
  - `rules/current/rule_registry.md`
  - `rules/current/rules_changelog.md`

## Guvenlik ve Hijyen

- Acikca istenmedikce yikici git/dosya komutlari calistirilmaz.
- Gorev disi mevcut degisiklikler geri alinmaz.
- Kirik dokuman referanslari mumkunse ayni degisiklikte duzeltilir.
