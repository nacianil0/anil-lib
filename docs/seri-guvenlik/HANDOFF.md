# "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state.** Kurallar `SOZLESME.md`'de, plan ve
> defterler `YOL-HARITASI.md`'de, kaynak kanıtı `ARASTIRMA.md`'de. Yeni oturum sırasıyla okur:
> SOZLESME → bu dosya → YOL-HARITASI'nın sıradaki yazıları. Trigger: `docs/seri-guvenlik/TRIGGER.md`.

Son güncelleme: 2026-10-21 · Durum: **Run 1 tamamlandı (yazı 1–2 yayında); aynı gün müfredat
revizyonu yapıldı (Git/GitHub hattı, plan 25).** Revizyon yazı üretmedi ve trigger'ı çalıştırmadı.
Sıradaki run yazı 3–4'ü üretir.

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan | 2 / 25 planlı (tavan 25; `SOZLESME.md` §1) |
| Yayımlanan son yazı | 2 — `hata-yolunda-guvenlik-a10-2025` |
| Son kohort | `classification_batch: 0` (run 1) |
| Sıradaki güvenli başlangıç | Yazı 3 ve 4 (`BATCH=2+1`), `reading_order` 3–4, faz-02, kategori `design-and-configuration` |
| Sıradaki kohort | `classification_batch: 1` |
| Kalan | 23 yazı; `BATCH=2+1` ile 12 run, sonuncusu yalnızca yazı 25 |
| TRIGGER kipi | Üretim (bakım kipi değil) |
| Rotalar | `/guvenlik` (dinamik, oturum ister), `/guvenlik/[slug]` (`dynamicParams = false`) |
| İçerik | `content/series-guvenlik/{catalog.json, roadmap.json, articles/<kategori>/<slug>.md, assets/<slug>/*.svg}` |
| Araçlar | `check-series-content.cjs --series=guvenlik`, `check-series-svg.cjs content/series-guvenlik/assets`, `sync-series-hashes.cjs --series=guvenlik [--write]`, `entegre-batch.cjs --series=guvenlik [--write]` |

## Yayımlanmış yazılar

| # | Başlık | Slug | Kimlik | Hash (ilk 12) | Şekiller |
|---|---|---|---|---|---|
| 1 | OWASP Top 10:2025'i Okumak: Liste Neyi Ölçer, Neyi Ölçmez? | `owasp-top-10-2025-i-okumak` | `article_af54bdf5-9a87-4253-89ca-d74188933c89` | `0b2e5de71351` | `bir-siranin-girdileri.svg`, `sifir-bulgu-nereye-kadar.svg` |
| 2 | Hata Yolunda Güvenlik: A10:2025'ten Doğrulanabilir Gereksinime | `hata-yolunda-guvenlik-a10-2025` | `article_c3e84f7f-8430-44d0-aed2-0310c75d4a95` | `bd88bc2427fc` | `uc-cevap-iki-politika.svg`, `yarim-kalan-paylasim.svg` |

İkisi de `owasp-and-verification`, `advanced`, kohort 0. Revizyon bu iki yazının dosyalarına,
kimliğine, slug'ına, sırasına ve hash'ine dokunmadı; `catalog.json` bayt bayt aynı.

## Son iş: müfredat revizyonu (2026-10-21)

- **Ne değişti:** seri adı (rota ve okuma verisi kimliği aynı); tez iki eksene genişledi (güvenlik +
  kaynak kod yönetimi); plan 16 → 25 yazı, 7 → 10 faz; Git/GitHub hattı 5–13; eski 5–16 başlıkları
  değişmeden 14–25 oldu; üç yeni kategori; SOZLESME v1.1 (tavan 25 ve istisnası, Git/GitHub ek
  kuralları, kaynak rolleri, commit grafiği, sonlanma); YOL-HARITASI karar #14–#22; ARASTIRMA §7–§11
  (Git/GitHub kaynak kaydı, yerel Git deneyi, plan koşulları, borçlar).
- **Ne değişmedi:** yayımlanmış yazılar ve katalog; okuma verisi şeması, sıfırlama/senkron, veritabanı
  ve migration; öteki iki seri; `BATCH=2+1`; sıradaki run'ın yazıları (3–4).
- **Sonraki run'ı etkileyen tek fark:** yazı 4'ün "Sırada ne var" bölümü artık Git hattını açar
  (yazı 5: Git'in zihinsel modeli); eski plandaki "kimlik doğrulama" köprüsü kullanılmaz
  (YOL-HARITASI kayıt 4, karar #16).

## Son üretim run'ı: run 1 (2026-10-21)

Kurulum + yazı 1–2 + platform entegrasyonu (üç seri için sıfırlama/senkron, `drizzle/0005`
hazırlandı, uygulanmadı) + `+1`. Kanıtı `artifacts/owasp-run1/` altında (typecheck, vitest, lint
taban karşılaştırması, build, e2e, 72 render ölçümü).

## Değişen dosyalar (commit edilmedi; run 1 + revizyon)

- **Belgeler:** `docs/seri-guvenlik/{SOZLESME,YOL-HARITASI,ARASTIRMA,TRIGGER,HANDOFF}.md`.
- **İçerik:** `content/series-guvenlik/` (katalog, roadmap, 2 yazı, 4 SVG).
- **Seri kodu:** `src/lib/content/series-guvenlik.ts`, `src/app/guvenlik/page.tsx`,
  `src/app/guvenlik/[slug]/page.tsx`, `src/lib/content/{schema,labels}.ts`.
- **Testler:** `src/lib/content/series-guvenlik-roadmap.test.ts` (revizyon), `src/lib/db/series-check.test.ts`,
  `src/lib/reader-data/series-reset.test.ts`, `src/lib/content/series-assets.test.ts`,
  `src/lib/stats/server/user-stats.test.ts`, `src/lib/reader-data/server/{sync,reset}-service.test.ts`,
  `tests/e2e/{auth,series-reader,series-reset}.spec.ts`.
- **Platform (run 1):** `src/app/page.tsx`, `src/lib/stats/server/user-stats.ts`,
  `src/lib/reader-data/{series-reset,schema,sync-contract}.ts`,
  `src/lib/reader-data/server/{series-catalogs,sync-service,reset-service}.ts`, `src/lib/db/schema.ts`,
  `src/components/series/series-progress-reset.tsx`, `drizzle/0005_guvenlik_series_reset.sql`.
- **Araçlar (run 1):** `tools/series/{check-series-content,entegre-batch,sync-series-hashes}.cjs`,
  `tools/README.md`.
- **OpenWolf:** `.wolf/{anatomy,memory,cerebrum}.md`, `.wolf/buglog.json`.

## Kanıt (revizyon)

Ham çıktılar `artifacts/git-revizyon/` altında (gitignore; yalnızca bu makinede, kalıcı değil).

| Kapı | Sonuç | Çıktı |
|---|---|---|
| Çapraz tutarlılık (roadmap ↔ YOL-HARITASI başlık listesi ve kayıtları, faz tablosu, SOZLESME ↔ `schema.ts` kategorileri, başlık sabitleri, katalog) | Tutarlı; sonraki run 3–4, kalan 12 run, son run tek yazı | `consistency-output.txt` |
| `entegre-batch --series=guvenlik` (kuru) | "Katalogda 2 mevcut, 0 yeni makale", roadmap 0 satır | konsol |
| Hash ve içerik kapıları | `sync-series-hashes` ve `check-series-content` (guvenlik): "Sorun yok" | konsol |
| Yayımlanmış dosyalar | iki yazının SHA-256'sı ve `catalog.json` revizyon öncesiyle aynı | `baseline/` |
| `pnpm typecheck` | 0 hata | `typecheck.txt` |
| `vitest run` | 42 dosya / 822 test geçti (yeni roadmap bütünlük testi dahil) | `test.txt` |
| `eslint src tools tests scripts` | 14 hata; dosya + kural + mesaj olarak run öncesindeki 14 bulgunun aynısı | `lint-src.txt` |
| `next build` | exit 0, 186 sayfa; `/guvenlik` ƒ, `/guvenlik/[slug]` ● iki slug | `build.txt` |
| Gerçek render | 375 / 768 / 1280 × açık / koyu / sepya × 5 sayfa (`/`, `/guvenlik`, yazı 1, `/seri`, `/boun`) = 45 ölçüm, 0 sorun: hepsi 200, belge taşması 0, tema doğru, eski ad hiçbir yerde yok; landing'de yeni h1, "25 makalelik seri", 10 faz, 23 "yakında", 2 yayımlanmış bağlantı, "25 planlandı"; yazı sayfası başlığında yeni seri adı; tek konsol hatası yerel `/api/reader-sync` 503. Ekran görüntüleri gözle incelendi (mobil/tablet/masaüstü, üç tema) | `render/report.json`, `render/shots/` |
| E2E (`series-reset`, `series-reader`, `auth`) | 31 / 31 geçti: üç serinin kapsamlı sıfırlaması (Güven Sınırı masaüstü ve mobil), başarısız sıfırlamanın okumayı koruması, resimli yazıların sığması, kapının `/guvenlik` landing'ini ve yazısını koruması | `e2e.txt` |
| Yerel Git deneyi (Git 2.53, yalıtılmış yapılandırma) | `fetch`, `pull`, squash ve `--force-with-lease` davranışları belgelerle tutarlı (ARASTIRMA §9) | `git-sandbox-output.txt` |

## Run öncesinden gelen, değişmeyen durumlar

- Lint'in 14 hatası (araç betiklerinde `require`, `src/lib/content/schema.ts`'de yalnızca tip olarak
  kullanılan üç şema sabiti). Kapsam dışı; dokunulmadı.
- `tests/e2e/reader-data.spec.ts`'in iki senkron testi yerelde veritabanı olmadığı için kalıyor.
- Yerelde `/api/reader-sync` 503 döner (`DATABASE_URL` yok; beklenen davranış).

## İzin bekleyen işlemler (yapılmadı; yalnız öneri)

- **Commit / push:** run 1 ve revizyonun hiçbir değişikliği commit edilmedi.
- **Deploy migration'ı da uygular:** `vercel-build` = `node scripts/migrate.mjs && next build`;
  deploy `0005`'i canlı veritabanına uygular (tek `ALTER TABLE`; mevcut `ai`/`boun` satırları yeni
  kısıta uyar). Migration başarısız olursa build kırmızı biter. Başka bir build komutuyla deploy
  edilirse `0005` ayrıca uygulanmalı.
- **OWASP'a tutarsızlık bildirimi:** ARASTIRMA §6.
- **GitHub organizasyonu:** revizyon gerçek bir organizasyonu okumadı, değiştirmedi; ileride okurun
  kendi organizasyonu için öneriler yazılarda "salt okunur denetim" ve "öneri" ayrımıyla verilir
  (`SOZLESME.md` §3).

## Açık borçlar

- Güvenlik ekseni: `ARASTIRMA.md` §6 (Top 10:2025 metin tutarsızlıkları, A01 puanı, WSTG ve SSDF
  sürüm takibi, Kubernetes sürümlü adresi).
- Git/GitHub hattı: `ARASTIRMA.md` §11 (credential types, bot hesapları ve 2FA, ruleset'e dönüştürme,
  `pull_request_target`, varsayılan dal değiştirme sayfaları; tarihli plan koşulları; OWASP CI/CD Top
  10'un sürümü; PR iş akışı tarihi için birincil kaynak; SLSA source track). Organizasyon düzeyi
  ruleset'in plan koşulu GitHub Docs'ta tutarsız (§10).
- Açık ileri işaretler (`YOL-HARITASI.md`): 1 → 15 (403 mü 404 mü, kiracı katmanı); 2 → 23 (güvenlik
  kaydı ve uyarı); 2 → 3 ("Sırada ne var", sıradaki run karşılar).

## Sonraki run için hazırlık

- **Yazı 3 — Tehdit Modelleme:** 2'nin "Sırada ne var" sözü (dosya yükleme hattının veri akışı ve
  sınır geçişleri) karşılanır; 2'nin hata yolları DFD'de hata kenarı olur; 1'de adı konan "güven
  sınırı" biçimsel olarak kurulur. Kurulmuş terimler yeniden açıklanmaz.
- **Yazı 4 — Güvenli Varsayılanlar:** 2'nin ayrıntısız hata yanıtı ve 3'ün sınırı geri çağrılır;
  "Sırada ne var" Git hattını açar: yapılandırma da kod gibi bir depoda değişiyorsa bir değişikliğin
  "nerede" olduğu nasıl bilinir?
- **Kaynaklar:** ASVS 5.0.0 V5, V13, V15 henüz okunmadı; Threat Modeling Cheat Sheet ve Manifesto,
  A02 ve A06:2025, Proactive Controls 2024 C5, WSTG v4.2 yapılandırma testleri, API8:2023 üretimde
  açılır.
- **Ondan sonraki run (5–6):** Git hattı başlar; `SOZLESME.md` §3 "Git ve GitHub yazıları için ek
  kurallar" ve §6 commit grafiği kuralı bağlayıcıdır. `artifacts/git-revizyon/git-sandbox.sh`
  yalıtılmış deney deposunun başlangıç noktasıdır (çalışma alanında, kalıcı değil; gerekirse
  ARASTIRMA §9'daki adımlarla yeniden yazılır).
- **Çalışma alanı:** 3000 portu başka bir projenin sunucusu. Playwright e2e 3100'de kendi sunucusunu
  açar; revizyonun render denetimi 3123'te depodaki e2e test parolasıyla giriş yaptı (kapı
  kapatılmadı). `artifacts/` altına derlenebilir `.ts` yedeği bırakılmaz (typecheck'i kırar).
