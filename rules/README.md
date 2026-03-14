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
