# "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state.** Kurallar `SOZLESME.md`'de, plan ve
> defterler `YOL-HARITASI.md`'de, kaynak kanıtı `ARASTIRMA.md`'de. Yeni oturum sırasıyla okur:
> SOZLESME → bu dosya → YOL-HARITASI'nın sıradaki yazıları. Trigger: `docs/seri-guvenlik/TRIGGER.md`.

Son güncelleme: 2026-10-21 · Durum: **Run 4 tamamlandı (yazı 7–8 yayında, kohort 3; "Değişikliğin Zihinsel
Modeli: Git" fazı kapandı).** Sıradaki run yazı 9–10'u üretir ve "GitHub'da Ekip Akışı ve Teslim" fazını açar.

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan | 8 / 25 planlı (tavan 25; `SOZLESME.md` §1) |
| Yayımlanan son yazı | 8 — `kod-kaybetmeden-geri-almak` |
| Son kohort | `classification_batch: 3` (run 4) |
| Sıradaki güvenli başlangıç | Yazı 9 ve 10 (`BATCH=2+1`), `reading_order` 9–10, faz-04, kategori `collaboration-and-delivery` (bu kategoride ilk yazılar; klasör `content/series-guvenlik/articles/collaboration-and-delivery/` henüz yok) |
| Sıradaki kohort | `classification_batch: 4` |
| Kalan | 17 yazı; `BATCH=2+1` ile 9 run, sonuncusu yalnızca yazı 25 |
| TRIGGER kipi | Üretim (bakım kipi değil) |
| Rotalar | `/guvenlik` (dinamik, oturum ister), `/guvenlik/[slug]` (`dynamicParams = false`) |
| İçerik | `content/series-guvenlik/{catalog.json, roadmap.json, articles/<kategori>/<slug>.md, assets/<slug>/*.svg}` |
| Araçlar | `check-series-content.cjs --series=guvenlik`, `check-series-svg.cjs content/series-guvenlik/assets`, `sync-series-hashes.cjs --series=guvenlik [--write]`, `entegre-batch.cjs --series=guvenlik [--write]` |

## Yayımlanmış yazılar

| # | Başlık | Slug | Kimlik | Hash (ilk 12) | Şekiller |
|---|---|---|---|---|---|
| 1 | OWASP Top 10:2025'i Okumak: Liste Neyi Ölçer, Neyi Ölçmez? | `owasp-top-10-2025-i-okumak` | `article_af54bdf5-9a87-4253-89ca-d74188933c89` | `0b2e5de71351` | `bir-siranin-girdileri.svg`, `sifir-bulgu-nereye-kadar.svg` |
| 2 | Hata Yolunda Güvenlik: A10:2025'ten Doğrulanabilir Gereksinime | `hata-yolunda-guvenlik-a10-2025` | `article_c3e84f7f-8430-44d0-aed2-0310c75d4a95` | `bd88bc2427fc` | `uc-cevap-iki-politika.svg`, `yarim-kalan-paylasim.svg` |
| 3 | Tehdit Modelleme: Güven Sınırını Çizmek, Varsayımı Yazmak | `tehdit-modelleme-guven-sinirini-cizmek` | `article_b4fca595-5e96-4fc9-b14f-9180cc4834d1` | `a8f9049d77d5` | `onizleme-veri-akisi.svg`, `once-sonra-isci-siniri.svg` |
| 4 | Güvenli Varsayılanlar: Yapılandırma Bir Güvenlik Kararıdır | `guvenli-varsayilanlar-yapilandirma` | `article_92b34d29-8459-4373-b248-5b8bbe14bca5` | `a64eef0a0120` | `etkin-degerin-katmanlari.svg`, `yapilandirmanin-iki-yolu.svg` |
| 5 | Git'in Zihinsel Modeli: Dal Bir Kopya Değil, Bir İşaretçidir | `git-zihinsel-modeli-dal-bir-isaretcidir` | `article_32c1b2f0-25e1-4e72-8ffe-306eb32edddf` | `3e69002d9f08` | `dal-yalnizca-isaretci.svg`, `degisikligin-duraklari.svg` |
| 6 | Uzak Depoyla Eşitlenmek: fetch, pull, push ve origin/main Ne Zaman Değişir? | `uzak-depoyla-esitlenmek-fetch-pull-push` | `article_8d22c85c-1e96-488e-844e-e5a38c854583` | `acc82161e816` | `uc-an-uc-ref.svg`, `iraksama-iki-ret.svg` |
| 7 | Ayrışan Geçmişi Birleştirmek: Merge, Rebase ve Squash Neyi Değiştirir? | `ayrisan-gecmisi-birlestirmek-merge-rebase-squash` | `article_d744e106-9960-42fc-9d48-922c4a35e94c` | `698d11681c62` | `uc-son-tek-agac.svg`, `squash-sonrasi-taban.svg` |
| 8 | Kod Kaybetmeden Geri Almak: Hangi Komut Neyi Değiştirir? | `kod-kaybetmeden-geri-almak` | `article_af8ce546-7282-45b8-bba1-6fcc3aa02614` | `69261fdebc22` | `zorla-push-kira.svg` |

1–2 `owasp-and-verification`, kohort 0; 3–4 `design-and-configuration`, kohort 1; 5–6 `version-control`,
kohort 2; 7–8 `version-control`, kohort 3; hepsi `advanced`. Run 4, yazı 1–6'nın dosyalarına, kimliğine,
slug'ına, sırasına ve hash'ine dokunmadı.

## Son üretim run'ı: run 4 (2026-10-21)

- **Yazı 7 (2.873 düzyazı kelimesi, 9 komut bloğu, iki şekil):** 6'nın ıraksamış `main`'i ve yamasız fatura
  dalı, 21 Ekim 10.30'dan. Birleştirme tabanı ve üç yollu birleştirme; gönderilmemiş `eacea0f` rebase'le
  `66098e2` (tree/parent/committer değişti, patch-id aynı). GitHub'ın üç yöntemi üç deneme dalında: aynı ağaç
  `90c95de`, ata 0/1/1; PR ilk kez gloss'landı. Paylaşılmış dalın rebase'li gönderimi reddedildi, dal
  birleştirme commit'i `3bfd1a1` ile güncellendi ve `--is-ancestor 85fdda1` 0 döndü (5'ten beri açık soru
  kapandı). Teşhis: kendi tarafını seçen çatışma çözümü yamayı düşürür. Yönetici vakası: squash'tan sonra
  yaşayan dal (`merge-tree` 1, `rebase --onto` ile yeni dal `b2dff87`). "Kendi organizasyonunda" kutusu.
- **Yazı 8 (2.692 düzyazı kelimesi, 11 komut bloğu, bir şekil, bir tablo):** 22 Ekim sabahının kazaları.
  Üç fiil ve tablo; reset biçimleri ve geri gelmeyen taslak satır; reflog, ayrık HEAD'de kalan kanarya testi,
  süreler; yönetici vakası (silinen dal); Teşhis (`fetch && reset --hard origin/main` tarifi); zorla push'ta
  kira tuzağı ve `--force-if-includes`, `cherry-pick` ile kurtarma; yönetici vakası (`main`'e yanlışlıkla
  birleştirme: `revert -m 1`, "Already up to date", "Reapply"); Teşhis (geri döndürülen sızan anahtar).
- **Deney deposu sürdü (karar #28, #36, #42):** 5–6'nın yedi kimliği aynen çıktı; 7 ve 8 yeni kimlikleri
  `olarak` yardımcısıyla sabitledi. Yazıların her bash bloğu temiz bir klasörde sırayla koşturuldu: 7'de 9/9,
  8'de 11/11 çıktı metinle aynı.
- **Run içinde yakalanıp düzeltilenler:** 7'de `--force-rebase` gereksizdi ve "GitHub davranışını canlandırıyor"
  cümlesi yanıltıcıydı (çıkarıldı, karar #35). Planlanan "zorla push" terimi 7'de gloss'suz "zorla göndermek"
  diye geçiyordu (gloss'landı, karar #37). "Günlük" hem reflog hem sıfat olarak geçiyordu (7'de "gündelik",
  karar #38). 8'in Teşhis cevabı hazırlıktaki içeriği de "kurtarılamaz" sayıyordu; deney `fsck --lost-found`
  ile bulunduğunu gösterdi, metin düzeltildi. 8'in önkoşulu 2.38 yazıyordu; "Reapply" mesajı Git 2.43'te geldiği
  ve kimliğe girdiği için 2.43 yapıldı. GitHub "Restore branch" için belgede yazmayan bir rol iddiası çıkarıldı;
  korunan dal anışına plan koşulu eklendi. Şekil 1'de (7) bir işaretçi hapı 1,6 birim dardı. Bu düzeltmelerden
  sonra hash'ler `sync-series-hashes --write` ile güncellendi.
- **Yalnızca içerik:** platform, okuma verisi, veritabanı ve araç kodu değişmedi.

## Değişen dosyalar (run 4; tek commit, `origin/main`'e itildi)

- **İçerik:** `content/series-guvenlik/articles/version-control/{ayrisan-gecmisi-birlestirmek-merge-rebase-squash,kod-kaybetmeden-geri-almak}.md`,
  `content/series-guvenlik/assets/ayrisan-gecmisi-birlestirmek-merge-rebase-squash/{uc-son-tek-agac,squash-sonrasi-taban}.svg`,
  `content/series-guvenlik/assets/kod-kaybetmeden-geri-almak/zorla-push-kira.svg`,
  `content/series-guvenlik/{catalog.json,roadmap.json}`.
- **Belgeler:** `docs/seri-guvenlik/{HANDOFF,YOL-HARITASI,ARASTIRMA}.md`.
- **OpenWolf:** `.wolf/{anatomy,memory,cerebrum}.md`, `.wolf/buglog.json`.
- `.claude/launch.json` render için geçici bir girdi aldı; girdi çıkarıldı, dosya run öncesiyle aynı.
- Run 3'ün bütün değişiklikleri kullanıcının `3800417` ("git") commit'inde ve `origin/main` ile eşit (önceki
  HANDOFF'un "commit edilmedi" notu commit'ten önce yazılmıştı).

## Kanıt (run 4)

Ham çıktılar `artifacts/guvenlik-run4/` altında (gitignore; yalnızca bu makinede, kalıcı değil).

| Kapı | Sonuç | Çıktı |
|---|---|---|
| Kaynak doğrulama | Git kılavuzu (2.43.0–2.56.0 sürümlü sayfalar), Git sürüm notları 2.30/2.35/2.38/2.43, "How to revert a faulty merge" (v2.56.0), Pro Git 3.2, 3.6, 7.7, 10.7, GitHub Docs (13 sayfa; adresler bölüm dizinlerinden), GitHub CLI kılavuzu; iddialar metinle eşleştirildi (`ARASTIRMA.md` §18–§19) | `src/`, `src-idx/`, `urls-*.txt` |
| Deneyler | Git 2.53.0.windows.2, yalıtılmış ayar; Teşhis iddiaları ayrı betiklerle (`ARASTIRMA.md` §20) | `deney7-*`, `deney8-*` |
| Komut bloğu doğrulaması | 7: 9/9, 8: 11/11 blok çıktısı metinle aynı (temiz klasör, sırayla) | `blok-dogrula-7.txt`, `blok-dogrula-8.txt` |
| `check-series-content --series=guvenlik` | 8 makale, sorun yok (entegrasyon öncesi ve sonrası) | konsol |
| `check-series-svg` + XML ayrıştırma | 15 diyagram, sorun yok; 3 yeni SVG XML olarak ayrıştı | konsol |
| Şekil ön denetimi (`figs.mjs`; üç tema × iki genişlik, `getBBox`) | 3 yeni şekil, son hâlinde 0 sorun; PNG'ler gözle incelendi | `figs/` |
| `entegre-batch` (kuru → yazma) | "Katalogda 6 mevcut, 2 yeni makale", roadmap 2 satır | konsol |
| `sync-series-hashes` | 8 makale, sorun yok (son metin düzeltmesinden sonra `--write` ile yeniden) | konsol |
| `pnpm typecheck` | 0 hata | `typecheck.txt` |
| `pnpm test` (vitest) | 42 dosya / 833 test geçti | `test.txt` |
| `eslint src tools tests scripts` | 14 hata; run 3 tabanıyla bulgu bulgu aynı | `lint-src.txt` |
| `next build` (yalıtılmış kopya `D:\dev\.anil-lib-iso-guvenlik-run4`) | exit 0, 192 sayfa | `build.txt` |
| Gerçek render (üretim sunucusu, 3217, depodaki e2e test kimliğiyle giriş) | 375 / 768 / 1280 × açık / koyu / sepya × 10 sayfa = 90 ölçüm: hepsi 200, belge taşması 0, tema doğru; yeni yazılarda SVG metin taşması, çözülmemiş dolgu, şekil kutu taşması, ham `undefined` ve takılı yükleme 0. Betiğin 18 "sorunlu" satırı yalnız yazı 2 ve 4'ün metnindeki gerçek `undefined` sözcüğünden (run 2–3 ile aynı). Yeni yazılarda "i18n adayı" diye işaretlenen tek şey kod adları (`org.opencontainers.image.revision`, `kdv.test.ts`). Landing'de 8 yayımlanmış bağlantı ve 17 "yakında". Tek konsol hatası yerel `/api/reader-sync` 503 | `render/out/`, `render/run.txt` |
| E2E sığma kuralının dört durumu | Masaüstü akış, sayfalı sütunlar, tablet ve telefonda 3 sütunlu tablo taşmıyor; şekiller kabına sığıyor, en küçük etiket 6,61 px; kod blokları kendi kabında kayıyor | `render/paged.txt` |
| Son metin düzeltmelerinden sonra (8'in 2.43 önkoşulu ve "Reapply" cümlesi, iki künye satırı) yeniden build ve render | Bloklar yeniden 9/9 ve 11/11; ikinci yalıtılmış build exit 0, 192 sayfa; 90 ölçümde yeni yazılarda 0 sorun (18 işaret yine yalnız 2 ve 4); sığma kuralının dört durumu uygun; son cümleler girişli okuyucudan okundu. Kopya junction'ı ayrı sökülerek silindi, `launch.json` run öncesiyle aynı | `build2.txt`, `render/run2.txt`, `render/paged2.txt` |

## Run öncesinden gelen, değişmeyen durumlar

- Lint'in 14 hatası (araç betiklerinde `require`, `src/lib/content/schema.ts`'de yalnızca tip olarak
  kullanılan üç şema sabiti). Kapsam dışı; dokunulmadı.
- `tests/e2e/reader-data.spec.ts`'in iki senkron testi yerelde veritabanı olmadığı için kalıyor.
- Yerelde `/api/reader-sync` 503 döner (`DATABASE_URL` yok; beklenen davranış).
- Depo kökünde 2026-09-01 tarihli, git'in izlediği 0 baytlık dosyalar var (`her`, `Karar`, `ritmi`,
  `sinyal`, `yapılırsa`, `Yaşayan`). Bu serinin işi değil; dokunulmadı.
- Render ölçüm betiğinin "ham `undefined`" denetimi yazı 2 ve 4'te her ölçümde işaret verir; "i18n adayı"
  denetimi noktalı kod adlarını da yakalar. İçerik doğru, denetim kaba; istenirse betik kod blokları ve
  satır içi kod dışını sayacak biçimde daraltılabilir (yalnız `artifacts/` betiği).

## İzin bekleyen işlemler (yapılmadı; yalnız öneri)

- **Commit / push:** yapıldı. Run 4'ün bütün değişiklikleri (`.wolf` dahil) kullanıcının isteğiyle 2026-10-21'de
  `main`'e tek commit olarak işlendi ve `origin/main`'e itildi; kimliği `git log -1 -- docs/seri-guvenlik/HANDOFF.md`
  verir. Commit'ten sonra OpenWolf kancalarının `.wolf/` dosyalarına eklediği satırlar commit dışında kalabilir.
- **Deploy:** `vercel-build` = `node scripts/migrate.mjs && next build`; run 1'in `drizzle/0005`'i
  `9e720b9`'da. Canlı veritabanına uygulanıp uygulanmadığı bu run'da da doğrulanmadı (canlı sisteme
  bakılmadı). Run 4 yeni migration getirmedi.
- **OWASP'a tutarsızlık bildirimi:** `ARASTIRMA.md` §6.
- **GitHub organizasyonu:** okunmadı, değiştirilmedi. 7'deki "Kendi organizasyonunda" kutusu okura salt okunur
  `gh repo list --json …` komutunu ve ayar sayfasını verir; bu run'da gerçek bir organizasyona karşı
  çalıştırılmadı.

## Açık borçlar

- Güvenlik ekseni: `ARASTIRMA.md` §6.
- Git/GitHub hattı: `ARASTIRMA.md` §11 (run 4'ün tarihli iddiaları eklendi).
- Açık ileri işaretler (`YOL-HARITASI.md`): 1 → 15; 2 → 23; 5 → 10 (etiket), 5 → 12 (imza kuralı), 5 → 22
  (yapıyı kim üretti); 7 → 9 (PR'ın ayrıntısı; birleşmiş sonucu test eden kontrolün zorunlu kılınması), 7 → 12
  (yöntemi dala bağlayan kural); 8 → 9 ("Sırada ne var"), 8 → 12 (korunan dalda zorla push ve silme engeli),
  8 → 13 (sızan sırrın yönetici vakası).

## Sonraki run için hazırlık (yazı 9–10)

- **Yazı 9 — GitHub'da ekip akışı:** 8'in "Sırada ne var" sorusu karşılanır: push, PR, inceleme, birleştirme ve
  dağıtım ayrı kararlar; zorunlu inceleme, kod sahipliği (CODEOWNERS yalnız inceleme ister, onayı zorunlu kılan
  dal koruması ya da ruleset'tir), gerekli kontroller ve birleştirme kuyruğu (`merge_group`). 7'nin iki işi:
  PR'ın ayrıntısı (head/base; PR 7'de gloss'landı, tekrar gloss'lanmaz) ve anlamsal çatışmayı yakalayan,
  birleşmiş sonucu test eden kontrol. Kalan riskte 8'de tanımlanan "dolaylı birleştirme" geri çağrılır.
  Yerelde kanıtlanabilen kısım için öneri: iki ayrı dal kendi başına "yeşil" bir testi geçer, birleşince kırılır
  (birleştirme kuyruğunun gerekçesi) — deney deposunun `b921466` tabanından ya da küçük bir yan depodan
  (karar #42). GitHub'a özgü davranışlar (zorunlu inceleme, kuyruk) yalnızca GitHub Docs'tan, plan/görünürlük/rol
  koşuluyla ve "Ekim 2026 itibarıyla" yazılır; gerçek bir organizasyonda denenmez.
- **Yazı 10 — Sürüm ve dağıtım:** etiket 5'te geçerken gloss'landı, 10 tanımlar (hafif / açıklamalı etiket),
  GitHub Release ve değişmez sürüm, SemVer 2.0.0 (belirtim olarak), geri dönüş yolu; yönetici vakaları
  "başarısız dağıtım" ve "acil hotfix" (akış). 5'in "etiketlerin ayrıntısı sürüm ve dağıtım konusuna kalıyor"
  işareti burada karşılanır; 4'ün "aynı yapı, iki ortam" ve 5'in sürüm kapısı (`revision` kaydı) geri çağrılır.
- **Kategori:** 9–10 `collaboration-and-delivery` (faz-04). Bu kategorinin klasörü ilk kez açılacak;
  `entegre-batch` klasörü kendisi oluşturmaz, yazı dosyası doğru klasöre konur.
- **Terimler:** planlanan `kod sahibi (CODEOWNERS)`, `gerekli kontrol (required status check)`, `birleştirme
  kuyruğu (merge queue)` 9'da; `GitHub Release / değişmez sürüm`, `sürüm / dağıtım` 10'da. "Günlük" yalnız reflog
  anlamında (karar #38); uygulama logu için "kayıt".
- **Kaynaklar (yeniden doğrulanır):** GitHub Docs "About code owners", "About protected branches" (zorunlu
  inceleme, eski onayları düşürme, son push'u onaylama), "Managing a merge queue", "About status checks" /
  "Troubleshooting required status checks", "GitHub flow", "Pull request merges" (dolaylı birleştirme), "About
  releases", "Immutable releases"; Git kılavuzu `git-tag`; GitHub CLI `gh pr merge` (`--auto`, kuyruk), `gh release`;
  GitHub blog "We launched" (2008-04-10); DORA "Trunk-based development"; Driessen 2010 ve 2020 notu; SemVer 2.0.0;
  OWASP CI/CD Top 10 (CICD-SEC-1). Adresler GitHub Docs bölüm dizinlerinden kopyalanır (`/en/pull-requests/…`
  yapısı Ekim 2026'da değişti; `ARASTIRMA.md` §18).
- **Doğrulama düzeni:** komut blokları `artifacts/guvenlik-run4/blok-dogrula.mjs` ile (Git Bash'te `/guvenlik/...`
  gibi argümanlar için `MSYS_NO_PATHCONV=1`); şekiller önce `figs.mjs`, sonra okuyucuda (`render/shoot.mjs`,
  `render/paged.mjs`; yayımlanmış yazı listesine 9–10 eklenir). SVG metninde çift boşluk yutulur; işaretçi hapı
  genişliği karakter × 7,2 + 24.
- **Çalışma alanı:** build, sunucu ve render yalıtılmış kopyada (robocopy `/XD node_modules .next artifacts .git
  .wolf` + `node_modules` junction + kopyaya özel `.env.production.local`, değerler `playwright.config.ts`'teki
  `TEST_PASSWORD_HASH`/`TEST_COOKIE_SECRET` sabitlerinden); sunucu `next start <kopya> -p 3217` ile geçici
  `launch.json` girdisinden açılır. Kopyayı silmeden önce junction `rmdir` ile ayrı sökülür (yoksa silme asıl
  `node_modules`'a uzanır). `artifacts/` altına derlenebilir `.ts` bırakılmaz; deneyler `mktemp -d` klasörlerinde.
