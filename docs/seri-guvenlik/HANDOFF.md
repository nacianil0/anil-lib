# "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state.** Kurallar `SOZLESME.md`'de, plan ve
> defterler `YOL-HARITASI.md`'de, kaynak kanıtı `ARASTIRMA.md`'de. Yeni oturum sırasıyla okur:
> SOZLESME → bu dosya → YOL-HARITASI'nın sıradaki yazıları. Trigger: `docs/seri-guvenlik/TRIGGER.md`.

Son güncelleme: 2026-10-21 · Durum: **Run 3 tamamlandı (yazı 5–6 yayında, kohort 2).** Sıradaki run
yazı 7–8'i üretir ve Git çekirdeğini ("Değişikliğin Zihinsel Modeli: Git" fazı) kapatır.

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan | 6 / 25 planlı (tavan 25; `SOZLESME.md` §1) |
| Yayımlanan son yazı | 6 — `uzak-depoyla-esitlenmek-fetch-pull-push` |
| Son kohort | `classification_batch: 2` (run 3) |
| Sıradaki güvenli başlangıç | Yazı 7 ve 8 (`BATCH=2+1`), `reading_order` 7–8, faz-03, kategori `version-control` |
| Sıradaki kohort | `classification_batch: 3` |
| Kalan | 19 yazı; `BATCH=2+1` ile 10 run, sonuncusu yalnızca yazı 25 |
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

1–2 `owasp-and-verification`, kohort 0; 3–4 `design-and-configuration`, kohort 1; 5–6 `version-control`,
kohort 2; hepsi `advanced`. Run 3, yazı 1–4'ün dosyalarına, kimliğine, slug'ına, sırasına ve hash'ine
dokunmadı.

## Son üretim run'ı: run 3 (2026-10-21)

- **Yazı 5 (3.061 düzyazı kelimesi):** 4'ün XXE düzeltmesi `main`'de; sürüm toplantısının üç cümlesi
  ("yama `main`'de", "aday `main`'den yapıldı", "dalım `main`'den açıldı") deney deposunda sınandı, yalnız
  ilki doğru. Commit = anlık görüntü + ebeveyn + üst veri, kimlik içerik özeti (`hash-object` ile yeniden
  hesap, yazar adı değişince başka kimlik; yazar alanı kimlik kanıtı değil). Dal ve HEAD işaretçi
  (`.git/HEAD`, 41 baytlık dal dosyası; `files`/`reftable`), `main`/`master` bir ayar, "Kendi
  organizasyonunda" kutusu. Üç alan ve `git status --short`'un iki harfi. Ulaşılabilirlik ve
  `--is-ancestor` (0/1/128); imajın `org.opencontainers.image.revision` kaydı, sürüm kapısı (1 "yama yok",
  2 "karar alınamadı"), sığ klonda yanılgı, kanıt merdiveni tablosu. İki "Teşhis et".
- **Yazı 6 (2.270 düzyazı kelimesi):** aynı senaryo iki klon ve yerel bare `origin.git` ile; üç `main`,
  `ls-remote`, refspec ve yukarı akış; `fetch` yalnız `origin/main`'i taşır; gelen değişikliği okuma; dal
  bir okuma sınırı değildir (git-push Security); `pull` = getir + yalnız geçerli dalın bütünleştirilmesi,
  `--ff-only` varsayılanı (kaynaklar arası fark yazıldı), ileri sarma; ıraksama ve iki ret (`push` "fetch
  first", `pull` 128); komut × ref tablosu; "güncelim" ancak başarılı `fetch`, iki yönlü sayım ve commit
  kimliğiyle karar. İki "Teşhis et"; düzeltilmiş `aday_kimligi`.
- **Deterministik deney deposu (karar #28):** iki yazı aynı beş commit kimliğini paylaşıyor; okurun
  makinesinde de aynı çıkması bekleniyor (bu makinede iki ayrı kurulum aynı kimlikleri verdi).
- **Komut blokları (karar #29):** her bash bloğu temiz bir klasörde sırayla koşturulup çıktısı metinle
  karşılaştırıldı: 5'te 11/11, 6'da 10/10 aynı.
- **Yalnızca içerik:** platform, okuma verisi, veritabanı ve araç kodu değişmedi.
- **Run içinde yakalanıp düzeltilenler:** 6'nın açılışı 5'in zaman çizelgesiyle çelişiyordu (toplantı 21
  Ekim sabahı; karar #33), düzeltildi. "Birleştirme (merge)" 5'te gloss'suz geçiyordu, ilk geçişte
  gloss'landı; 6'nın kapanışında rebase ve squash Türkçe açıklandı. Şekil 2'de (6) SVG çift boşluğu
  yuttuğu için "1  1" "11" görünüyordu, "sol 1 · sağ 1" yapıldı. 6'da iki "önceki yazı" ifadesi konu
  adına çevrildi. Bu metin düzeltmelerinden sonra hash'ler `sync-series-hashes --write` ile güncellendi,
  yalıtılmış kopya yeniden build edildi ve render yeniden ölçüldü.

## Değişen dosyalar (commit edilmedi; run 3)

- **İçerik:** `content/series-guvenlik/articles/version-control/{git-zihinsel-modeli-dal-bir-isaretcidir,uzak-depoyla-esitlenmek-fetch-pull-push}.md`,
  `content/series-guvenlik/assets/git-zihinsel-modeli-dal-bir-isaretcidir/{dal-yalnizca-isaretci,degisikligin-duraklari}.svg`,
  `content/series-guvenlik/assets/uzak-depoyla-esitlenmek-fetch-pull-push/{uc-an-uc-ref,iraksama-iki-ret}.svg`,
  `content/series-guvenlik/{catalog.json,roadmap.json}`.
- **Belgeler:** `docs/seri-guvenlik/{HANDOFF,YOL-HARITASI,ARASTIRMA}.md`.
- **OpenWolf:** `.wolf/{anatomy,memory,cerebrum}.md`, `.wolf/buglog.json`.
- `.claude/launch.json` render için geçici bir girdi aldı; girdi çıkarıldı, dosya run öncesiyle aynı.
- Run 2'nin bütün değişiklikleri `e853cd2` commit'inde ve yerel `origin/main` kaydına göre itilmiş
  (önceki HANDOFF'un "commit edilmedi" notu commit'ten önce yazılmıştı). Run 1 ve müfredat revizyonu
  `9e720b9`'da.

## Kanıt (run 3)

Ham çıktılar `artifacts/guvenlik-run3/` altında (gitignore; yalnızca bu makinede, kalıcı değil).

| Kapı | Sonuç | Çıktı |
|---|---|---|
| Kaynak doğrulama | Git kılavuzu (2.43.0–2.56.0 sürümlü sayfalar), BreakingChanges, Pro Git 1.1–1.3, 2.5, 3.1, 3.5, 10.2–10.3, GitHub Docs (4 sayfa), gh kılavuzu, OCI image-spec v1.1.1, actions/checkout v7.0.1, A03:2025, SSDF v1.1 PS.1.1/PS.3.2; iddialar metinle eşleştirildi (`ARASTIRMA.md` §15–§16) | `src/`, `urls-*.txt` |
| Deneyler | Git 2.53.0.windows.2, yalıtılmış ayar; kimlikler iki kurulumda aynı; sığ klon, Teşhis iddiaları ayrı betiklerle kanıtlandı (`ARASTIRMA.md` §17) | `deney5-*`, `deney6-*` |
| Komut bloğu doğrulaması | 5: 11/11, 6: 10/10 blok çıktısı metinle aynı (temiz klasör, sırayla) | `blok-dogrula-5.txt`, `blok-dogrula-6.txt` |
| `check-series-content --series=guvenlik` | 6 makale, sorun yok (entegrasyon öncesi ve sonrası) | konsol |
| `check-series-svg` + XML ayrıştırma | 12 diyagram, sorun yok; 4 yeni SVG XML olarak ayrıştı | konsol |
| Şekil ön denetimi (`figs.mjs`; üç tema × iki genişlik, `getBBox`) | 4 yeni şekil, 0 sorun; PNG'ler gözle incelendi, bir görsel kusur (yutulan çift boşluk) düzeltildi | `figs/`, `figs/figs-report.json` |
| `entegre-batch` (kuru → yazma) | "Katalogda 4 mevcut, 2 yeni makale", roadmap 2 satır | konsol |
| `sync-series-hashes` | 6 makale, sorun yok (metin düzeltmesinden sonra `--write` ile yeniden) | konsol |
| `pnpm typecheck` | 0 hata | `typecheck.txt` |
| `vitest run` | 42 dosya / 830 test geçti | `test.txt` |
| `eslint src tools tests scripts` | 14 hata; run 2 tabanıyla bulgu bulgu aynı | `lint-src.txt` |
| `next build` (yalıtılmış kopya `D:\dev\.anil-lib-iso-guvenlik-run3`, iki kez) | exit 0, 190 sayfa; `/guvenlik` ƒ, `/guvenlik/[slug]` ● altı slug | `build.txt`, `build2.txt` |
| Gerçek render (üretim sunucusu, 3217, depodaki e2e test kimliğiyle giriş) | 375 / 768 / 1280 × açık / koyu / sepya × 8 sayfa = 72 ölçüm: hepsi 200, belge taşması 0, tema doğru, SVG metni viewBox içinde, çözülmemiş dolgu yok, takılı yükleme yok; landing'de 6 yayımlanmış bağlantı ve 19 "yakında". Ölçümün "ham `undefined`" işareti yalnız yazı 2 ve 4'te ve onların metnindeki gerçek `undefined` sözcüğünden (run 2'de de aynı 18 satır); yeni yazılarda 0. Tek konsol hatası yerel `/api/reader-sync` 503. Yeni şekiller okuyucuda üç temada, masaüstü ve mobilde gözle incelendi; düzeltilmiş cümleler çalışan sunucudan okundu | `render/out/`, `render/run.txt` |
| E2E sığma kuralının dört durumu | Masaüstü akış, sayfalı sütunlar, tablet ve telefonda 3 sütunlu tablolar taşmıyor; şekiller kabına sığıyor, en küçük etiket 6,61 px; kod blokları kendi kabında kayıyor | `render/paged.txt` |

## Run öncesinden gelen, değişmeyen durumlar

- Lint'in 14 hatası (araç betiklerinde `require`, `src/lib/content/schema.ts`'de yalnızca tip olarak
  kullanılan üç şema sabiti). Kapsam dışı; dokunulmadı.
- `tests/e2e/reader-data.spec.ts`'in iki senkron testi yerelde veritabanı olmadığı için kalıyor.
- Yerelde `/api/reader-sync` 503 döner (`DATABASE_URL` yok; beklenen davranış).
- Depo kökünde 2026-09-01 tarihli, git'in izlediği 0 baytlık dosyalar var (`her`, `Karar`, `ritmi`,
  `sinyal`, `yapılırsa`, `Yaşayan`). Bu serinin işi değil; dokunulmadı.
- Render ölçüm betiğinin "ham `undefined`" denetimi, metninde `undefined` geçen yazılarda (2 ve 4) her
  ölçümde işaret verir; içerik doğru, denetim kaba. İstenirse betik kod blokları dışını sayacak biçimde
  daraltılabilir (yalnız `artifacts/` betiği).

## İzin bekleyen işlemler (yapılmadı; yalnız öneri)

- **Commit / push:** run 3'ün değişiklikleri commit edilmedi.
- **Deploy:** `vercel-build` = `node scripts/migrate.mjs && next build`; run 1'in `drizzle/0005`'i
  `9e720b9`'da. Canlı veritabanına uygulanıp uygulanmadığı bu run'da da doğrulanmadı (canlı sisteme
  bakılmadı). Run 3 yeni migration getirmedi.
- **OWASP'a tutarsızlık bildirimi:** `ARASTIRMA.md` §6.
- **GitHub organizasyonu:** okunmadı, değiştirilmedi. 5'teki "Kendi organizasyonunda" kutusu okura
  salt okunur `gh repo list` komutu ve ayar sayfası verir; bu run'da gerçek bir organizasyona karşı
  çalıştırılmadı.

## Açık borçlar

- Güvenlik ekseni: `ARASTIRMA.md` §6.
- Git/GitHub hattı: `ARASTIRMA.md` §11 (run 3'ün tarihli iddiaları ve git-pull/git-push kaynak içi farkı
  eklendi).
- Açık ileri işaretler (`YOL-HARITASI.md`): 1 → 15; 2 → 23; 5 → 7 (yeniden yazmanın yeni kimliği;
  dalı `main`'le bütünleştirmek), 5 → 10 (etiket), 5 → 12 (imza kuralı), 5 → 22 (yapıyı kim üretti);
  6 → 7 (ıraksamanın çözümü, "Sırada ne var"), 6 → 8 (`--force`).

## Sonraki run için hazırlık (yazı 7–8)

- **Yazı 7 — Ayrışan geçmişi birleştirmek:** 6'nın "Sırada ne var" sözü karşılanır: `a` klonundaki
  ıraksamış `main` (`eacea0f` yerel "belge: fatura notu", `120d7b5` uzak "sürüm: 1.4.0 adayı 2") ve
  yamayı (`85fdda1`) almamış `feature/fatura-pdf` (`f8db4cb`). Deney deposu 6'nın kurulum betiğinden aynı
  kimliklerle yeniden kurulur ve oradan sürer (karar #28). 5'in iki sözü de burada: geçmişi yeniden yazan
  işlemlerin yeni kimlik üretmesi (ebeveyn değişir → içerik özeti değişir; 5'in `hash-object` deneyi
  geri çağrılır) ve dalı `main`'le bilerek bütünleştirmenin yolları. GitHub "Update branch" ve
  `gh pr update-branch [--rebase]` (PR terimi 9'da kurulacak; 7'de PR'dan söz edilecekse ilk geçişte
  gloss gerekir, terim defterine bak).
- **Yazı 8 — Kod kaybetmeden geri almak:** 6'nın `--force` işareti burada karşılanır (`--force-with-lease`
  ve `--force-if-includes`; `ARASTIRMA.md` §9'daki yerel deney). "Ayrık HEAD (detached HEAD)" ilk kez
  8'de.
- **Terimler:** "birleştirme (merge)" 5'te, "rebase/squash" 6'da gloss'landı/açıklandı; 7 tekrar etmez,
  "birleştirme tabanı (merge base)" ve "birleştirme çatışması / anlamsal çatışma"yı kurar. "Uzak depo",
  "uzak izleme dalı", "yukarı akış", "ileri sarma", "ıraksama" 6'da kuruldu. "Etiket" 5'te geçerken
  gloss'landı (10 tanımlar). OCI annotation = "ek açıklama" (karar #30).
- **Kurallar:** `SOZLESME.md` §3 (komut bloğunun altı öğesi; biçim karar #29), §6 commit grafiği (uzak
  izleme dalı kesikli çerçeve; ok yönü adlandırılır). Komut blokları yayından önce
  `artifacts/guvenlik-run3/blok-dogrula.mjs` ile koşturulur (Git Bash'te `/guvenlik/...` gibi argümanlar
  için `MSYS_NO_PATHCONV=1`).
- **Kaynaklar (yeniden doğrulanır):** Pro Git 3.2, 3.6; kılavuz `git-merge` (2.54.0), `git-rebase`,
  `git-merge-base`, `git-revert`, `git-reset`, `git-restore`, `git-reflog`, `git-gc`, `git-stash`,
  `git-cherry-pick`, `git-push` (`--force-with-lease`, `--force-if-includes`); GitHub Docs "Pull request
  merges", "Keeping your pull request in sync with the base branch", "Deleting and restoring branches in a
  pull request"; GitHub CLI `gh pr update-branch` (`ARASTIRMA.md` §7–§9, §11).
- **Doğrulama düzeni:** şekiller önce `artifacts/guvenlik-run3/figs.mjs`, sonra okuyucuda
  (`render/shoot.mjs`, `render/paged.mjs`; yayımlanmış yazı listesine 7–8 eklenir). SVG metninde çift
  boşluk yutulur.
- **Çalışma alanı:** bu depoda eş zamanlı başka Claude oturumları açık olabilir (run 3'te boşta idiler);
  build, sunucu ve render yalıtılmış kopyada (robocopy + `node_modules` junction + kopyaya özel
  `.env.production.local` ile depodaki e2e test değerleri), sunucu `.claude/launch.json`'a geçici girdiyle
  açılır ve iş sonunda yalnız o girdi çıkarılır. `artifacts/` altına derlenebilir `.ts` (deney deposunun
  dosyaları dahil) bırakılmaz.
