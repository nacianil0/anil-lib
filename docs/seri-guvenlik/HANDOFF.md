# "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state.** Kurallar `SOZLESME.md`'de, plan ve
> defterler `YOL-HARITASI.md`'de, kaynak kanıtı `ARASTIRMA.md`'de. Yeni oturum sırasıyla okur:
> SOZLESME → bu dosya → YOL-HARITASI'nın sıradaki yazıları. Trigger: `docs/seri-guvenlik/TRIGGER.md`.

Son güncelleme: 2026-10-26 · Durum: **Run 5 tamamlandı (yazı 9–10 yayında, kohort 4; "GitHub'da Ekip Akışı ve Teslim"
fazı kapandı).** Sıradaki run yazı 11–12'yi üretir ve "Organizasyonu Yönetmek" fazını açar.

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan | 10 / 25 planlı (tavan 25; `SOZLESME.md` §1) |
| Yayımlanan son yazı | 10 — `surum-ve-dagitim-etiket-github-release` |
| Son kohort | `classification_batch: 4` (run 5) |
| Sıradaki güvenli başlangıç | Yazı 11 ve 12 (`BATCH=2+1`), `reading_order` 11–12, faz-05, kategori `organization-governance` (bu kategoride ilk yazılar; klasör `content/series-guvenlik/articles/organization-governance/` henüz yok) |
| Sıradaki kohort | `classification_batch: 5` |
| Kalan | 15 yazı; `BATCH=2+1` ile 8 run, sonuncusu yalnızca yazı 25 |
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
| 9 | GitHub'da Ekip Akışı: Push, PR, Merge ve Dağıtım Ayrı Kararlardır | `github-ekip-akisi-push-pr-merge-dagitim` | `article_062b627c-e52d-4b82-aa77-8ceca20616ae` | `73d357afbf76` | `iki-taraf-bes-karar.svg`, `yesil-kontrol-baska-birlesim.svg` |
| 10 | Sürüm ve Dağıtım: Etiket, GitHub Release ve Geri Dönüş Yolu | `surum-ve-dagitim-etiket-github-release` | `article_2bb514ae-50bc-4555-b83e-0855a87cf1ed` | `1d48fdd1b8a1` | `tasinan-etiket-iki-surum.svg`, `surum-dali-hotfix.svg` |

1–2 `owasp-and-verification`, kohort 0; 3–4 `design-and-configuration`, kohort 1; 5–6 `version-control`, kohort 2; 7–8
`version-control`, kohort 3; 9–10 `collaboration-and-delivery`, kohort 4; hepsi `advanced`. Run 5, yazı 1–8'in dosyalarına,
kimliğine, slug'ına, sırasına ve hash'ine dokunmadı.

## Son üretim run'ı: run 5 (2026-10-26)

- **Yazı 9 (3.579 düzyazı kelimesi, 7 komut bloğu, iki şekil):** 8'in kazalarından sonra "main yalnız PR'la"; iki PR ayrı ayrı
  yeşil, birlikte `main` kırmızı. Kısa taban (`5313039`, ağacı 8'in sonundaki `f59542e`); akış commit'i `fd3505d` (iş akışı
  `pull_request` + `merge_group` + `push: main`, action'lar tam SHA'yla, CODEOWNERS, çalışan `node --test`). PR'ın GitHub nesnesi
  olduğu, base/head ve birleştirme tabanı; deneme birleştirmesi (`refs/pull/N/merge`); `merge-tree` 0 iken test 1; sıkı/gevşek
  gerekli kontrol; güncel dal ve birleştirme kuyruğu canlandırması; ağaç eşitliğiyle doğrulanabilir özellik; zorunlu inceleme
  ve kod sahipliği; iki Teşhis (CODEOWNERS sırası, `if:` ile atlanan işin "Success" sayılması); dal stratejisi; dağıtım koruma
  kuralları; "Kendi organizasyonunda" kutusu.
- **Yazı 10 (3.348 düzyazı kelimesi, 7 komut bloğu ve bir Teşhis satırı, iki şekil):** sürüm günü ve Pazartesi. Kendi kısa
  tabanı (`85a4e4e` v1.3.0, `703b5a1` 21 Ekim adayı rc.2, `5c44797`, `06994f8`); açıklamalı/hafif etiket; geri dönüş ≠ geri
  döndürme (yönetici vakası: başarısız dağıtım); taşınan etiket, sessiz `fetch` ve `--tags` reddi, "On Re-tagging", kirayla geri
  koyma; GitHub Release ve değişmez sürüm; SemVer; Teşhis: "en son etiket" betiği; yönetici vakası: acil hotfix, `release/1.4`,
  `cherry-pick -x`, `git cherry`; "Kendi organizasyonunda" kutusu.
- **Kaynak doğrulaması** yedi paralel okuyucuyla; ham metinler kaydedildi, yazılara giren her iddia ana oturumda grep'le
  yeniden eşleştirildi (`ARASTIRMA.md` §21–§24).
- **İnceleme:** yayından önce beş mercek (kaynak, sözleşme, teknik ve şekil, pedagoji, süreklilik) ve her birinin ardından
  bulguları çürütmeye çalışan bir şüpheci; 63 bulgunun çoğu doğrulandı, birkaçı çürütüldü (action SHA'larının kaynağı, CICD-SEC-1
  "hattın sonu", ikinci "sürüm dalı" gloss'u gibi). Ardından ikinci, dar bir yeniden denetim düzeltmelerin getirdiği kusurları
  buldu. En önemli düzeltmeler: 10'un tabanı dünyayla çelişiyordu (rc.2 23 Ekim commit'indeydi, 1.3.0'da `fatura/` vardı) ve
  yeniden kuruldu; revision kaydı etiketten değil dağıtım kaydından; taşınan etiket kirayla geri kondu; 9'un iş akışına
  `push: main` eklendi; doğrulanabilir özellik ilk ebeveynden ağaç eşitliğine çevrildi; `b`/`gelistirici-b` 6–7'deki gibi güvenlik
  geliştiricisi; "sürüm numarası / sürüm / dağıtım" ayrımı açıkça kuruldu (karar #53).
- **Yalnızca içerik:** platform, okuma verisi, veritabanı ve araç kodu değişmedi.

## Değişen dosyalar (run 5; commit edilmedi)

- **İçerik:** `content/series-guvenlik/articles/collaboration-and-delivery/{github-ekip-akisi-push-pr-merge-dagitim,surum-ve-dagitim-etiket-github-release}.md`,
  `content/series-guvenlik/assets/github-ekip-akisi-push-pr-merge-dagitim/{iki-taraf-bes-karar,yesil-kontrol-baska-birlesim}.svg`,
  `content/series-guvenlik/assets/surum-ve-dagitim-etiket-github-release/{tasinan-etiket-iki-surum,surum-dali-hotfix}.svg`,
  `content/series-guvenlik/{catalog.json,roadmap.json}`.
- **Belgeler:** `docs/seri-guvenlik/{HANDOFF,YOL-HARITASI,ARASTIRMA}.md`.
- **OpenWolf:** `.wolf/{anatomy,memory,cerebrum}.md`, `.wolf/buglog.json`.
- `.claude/launch.json` render için geçici bir girdi aldı; girdi çıkarıldı, dosya run öncesiyle bayt bayt aynı.
- **Bu run'ın dışında kalan değişiklikler (dokunulmadı):** run sırasında aynı çalışma kopyasında başka bir oturum çalıştı:
  `content/series-boun/**` (makaleler, şekiller, katalog; 09.01–09.04), `docs/seri-boun/{ARASTIRMA,HANDOFF,YOL-HARITASI}.md`,
  `src/components/{reader/article-marks.tsx,series/series-landing.tsx,series/series-progress-reset.tsx}` (09.08) ve izlenmeyen
  `src/app/accent-contrast.test.ts` (09.08). Run başında `git status` yalnızca `.wolf/memory.md`'yi gösteriyordu. Bu dosyalar
  bu run'ın değildir; commit edilirken ayrılmalı. `.wolf/` dosyaları iki oturumca da yazılmış olabilir.

## Kanıt (run 5)

Ham çıktılar `artifacts/guvenlik-run5/` altında (gitignore; yalnızca bu makinede, kalıcı değil). Run 4'ün `artifacts/` klasörü
bu run başında yoktu; doğrulayıcılar yeniden yazıldı (`blok-dogrula.mjs`, `figs.mjs`, `hash-new.cjs`, `alt-esitle.py`,
`kelime.cjs`, `render/shoot.mjs`, `render/paged.mjs`).

| Kapı | Sonuç | Çıktı |
|---|---|---|
| Kaynak doğrulama | GitHub Docs (yaklaşık 60 sayfa, bölüm dizinlerinden ve sayfa listesinden), Git kılavuzu (2.0.5–2.56.0 sürümlü sayfalar), Git 2.20 sürüm notu, Pro Git 2.6, SemVer 2.0.0, DORA, Driessen 2010/2020, OWASP CI/CD Top 10 (CICD-SEC-1), NIST SSDF v1.1 PS, Top 10:2025 A03, OCI image-spec v1.1.1, Node.js TypeScript ve test belgeleri, action sürümleri (GitHub API) | `src/`, `research-*.txt` |
| Deneyler | Git 2.55.0.windows.5, Node.js 24.22.1, yalıtılmış ayar; Teşhis iddiası ayrı betikle (`teshis10.sh`) | `deney9.sh`, `deney10.sh`, `*-cikti.txt` |
| Komut bloğu doğrulaması | 9: 7/7, 10: 7/7 blok çıktısı metinle aynı (temiz klasör, sırayla; stderr stdout'la birlikte) | `blok-cikti/` |
| Yayımlanmış 5–8'in blokları (bakım) | Git 2.55 ile 11/11, 10/10, 9/9, 11/11 aynı | `blok-cikti/` |
| İnceleme | 5 mercek + 5 şüpheci (63 bulgu), sonra 2 ajanlı yeniden denetim (17 küçük kusur, 1 olgu hatası); hepsi uygulandı ya da gerekçesiyle bırakıldı | workflow günlükleri |
| `check-series-content --series=guvenlik` | 10 makale, sorun yok (entegrasyon öncesi ve sonrası; `--warnings` ile de) | konsol |
| `check-series-svg` + XML ayrıştırma | 19 diyagram, sorun yok; 4 yeni SVG XML olarak ayrıştı | konsol |
| Şekil ön denetimi (`figs.mjs`, üç tema × 720/343, `getBBox`) | 4 yeni şekil 0 sorun; PNG'ler gözle incelendi. Yazı 3'ün numara halkaları bilerek "çizgi-metin" çıkar | `figs/` |
| `entegre-batch` (kuru → yazma → kuru) | "Katalogda 8 mevcut, 2 yeni makale", roadmap 2 satır; son kuru çalışma 0 satır | konsol |
| `sync-series-hashes` | 10 makale, sorun yok | konsol |
| `pnpm typecheck` | 0 hata | `typecheck.txt` |
| `pnpm test` (vitest) | 42 dosya / 837 test geçti (entegrasyondan sonra); öteki oturumun değişiklikleriyle birlikte yeniden: 43 / 841 geçti | `test.txt`, `test2.txt` |
| `eslint src tools tests scripts` | 14 hata; run 4 tabanıyla aynı dosyalar | `lint.txt` |
| `next build` (yalıtılmış kopya `C:\dev\.anil-lib-iso-guvenlik-run5`, aynı sürücü, karar #51) | exit 0, 194 sayfa. Kopya 09.07'de alındı: öteki oturumun BOUN içerik değişikliklerini içeriyordu, `src/` değişikliklerini içermiyordu | `build.txt` |
| Gerçek render (üretim sunucusu, 3217, depodaki e2e test kimliği) | 375 / 768 / 1280 × açık / koyu / sepya × 11 sayfa = 99 ölçüm: hepsi 200, belge taşması 0, tema doğru; yeni yazılarda SVG metin taşması, çözülmemiş dolgu, şekil kutu taşması ve ham `undefined` 0; telefonda en küçük şekil etiketi 6,34 px. 18 işaret yalnız yazı 2 ve 4'ün metnindeki gerçek `undefined` sözcüğü. Landing'de 10 yayımlanmış bağlantı ve 15 "yakında". Konsol hataları yerel `/api/reader-sync` 503'ü | `render/out/`, `render/run.txt` |
| E2E sığma kuralının dört durumu | Masaüstü akış, sayfalı sütunlar, tablet ve telefonda iki yazının şekilleri kabına sığıyor (en küçük etiket 6,61 px), tablo yok, kod blokları kendi kabında kayıyor, belge taşması 0 | `render/paged.txt` |
| Temizlik | Kopyanın `node_modules` junction'ı ayrı söküldü, kopya silindi, asıl `node_modules` yerinde; `launch.json` run öncesiyle aynı; 3217 boş | konsol |

## Run öncesinden gelen, değişmeyen durumlar

- Lint'in 14 hatası (araç betiklerinde `require`, `src/lib/content/schema.ts`'de yalnızca tip olarak kullanılan üç şema
  sabiti). Kapsam dışı; dokunulmadı.
- `tests/e2e/reader-data.spec.ts`'in iki senkron testi yerelde veritabanı olmadığı için kalıyor.
- Yerelde `/api/reader-sync` 503 döner (`DATABASE_URL` yok; beklenen davranış).
- Depo kökünde 2026-09-01 tarihli, git'in izlediği 0 baytlık dosyalar (`her`, `Karar`, `ritmi`, `sinyal`, `yapılırsa`,
  `Yaşayan`). Bu serinin işi değil; dokunulmadı.
- Render betiğinin "ham `undefined`" denetimi yazı 2 ve 4'te her ölçümde işaret verir (içerik doğru, denetim kaba).

## İzin bekleyen işlemler (yapılmadı; yalnız öneri)

- **Commit / push:** yapılmadı. Run 5'in dosyaları yukarıdaki listede; öteki oturumun BOUN ve `src/` değişiklikleri aynı
  çalışma kopyasında duruyor ve ayrı tutulmalı.
- **Deploy:** `vercel-build` = `node scripts/migrate.mjs && next build`; run 5 migration getirmedi. `drizzle/0005`'in canlıya
  uygulanıp uygulanmadığı bu run'da da doğrulanmadı (canlı sisteme bakılmadı).
- **OWASP'a tutarsızlık bildirimi:** `ARASTIRMA.md` §6.
- **GitHub organizasyonu:** okunmadı, değiştirilmedi. 9 ve 10'daki "Kendi organizasyonunda" kutularının salt okunur komutları
  (`gh api … codeowners/errors`, `rules/branches/main`, `branches/main`; `gh release list/view/verify`) gerçek bir organizasyona
  karşı çalıştırılmadı. Action sürümleri için yalnızca herkese açık `api.github.com` uçlarından okuma yapıldı.

## Açık borçlar

- Güvenlik ekseni: `ARASTIRMA.md` §6.
- Git/GitHub hattı: `ARASTIRMA.md` §11 (run 5'in tarihli iddiaları eklendi) ve §21'in kaynak içi tutarsızlıkları (sıkı gerekli
  kontrolün "varsayılan"lığı, kuyruğun grup commit'inin hedefe nasıl girdiği, organizasyon düzeyi ruleset planı).
- Açık ileri işaretler (`YOL-HARITASI.md`): 1 → 15; 2 → 23; 5 → 12 (imza kuralı), 5 → 22 (yapıyı kim üretti); 7 → 12 (yöntemi
  dala bağlayan kural); 8 → 12 (korunan dalda zorla push ve silme engeli), 8 → 13 (sızan sırrın yönetici vakası); 9 → 12 (kuralın
  kurulması, katmanlanması, muafiyet; kutudaki ruleset), 9 → 13 (`permissions`, action sabitleme, iş akışı güvenliği); 10 → 11
  ("Sırada ne var"), 10 → 12 (etiket kuralı; sürüm dallarının korunması).

## Sonraki run için hazırlık (yazı 11–12)

- **Yazı 11 — Organizasyonda erişim:** 10'un "Sırada ne var" sorusu karşılanır: kim hangi depoyu neden görüp yazabiliyor; roller,
  takımlar, temel yetki. Somut açılış malzemesi: 10'da etiketi taşıyan da geri koyan da yazma yetkisini kullandı; değişmez sürümü
  açmak depoda Admin ister; 9'da dal korumasını ve ruleset'i Admin yönetir, kuyruğu Admin yapılandırır, yazma yetkisi ekler,
  onaylar yalnızca yazma yetkisi olanlardan sayılır, kod sahibi yazma yetkisi taşımalı. Yönetici vakaları: yeni ekip üyesi,
  taşeron offboarding (13 ile), yanlış yetki. Plan koşulları (özel roller Enterprise Cloud; 2FA zorunluluğunun davranışı) ve
  "Kendi organizasyonunda" kutusu zorunlu; gerçek organizasyona dokunulmaz. Yerel deney deposu bu yazıda zayıf kalır; kurgusal
  `ornek-sirket` ve salt okunur `gh api` biçimleri (çıktısız, kutu içinde) ağırlıklı olabilir.
- **Yazı 12 — Kuralı platforma yazmak:** 5, 7, 8, 9, 10'un beş ileri işaretini karşılar: imzalı commit kuralı, yöntemi dala
  bağlayan kural, korunan dalda zorla push ve silme engeli, kuralın kurulması/katmanlanması/muafiyet ve ruleset, etiket kuralı ve
  sürüm dallarının korunması. "Dal koruması (branch protection)" 9'da gloss'landı, ruleset 9'da geçerken açıklandı; 12 gloss'u
  tekrar etmez, "bypass"ı ilk kez Türkçe açıklar ("kural dışı geçiş izni"). 9'da yönetici için "muaf/muafiyet" kullanıldı; 12
  bypass'ı bu sözcükle karıştırmamalı. Kuyruğun ruleset'te yalnızca depo düzeyinde istenebildiği (GHEC belgesi) ve
  organizasyon düzeyi ruleset planının belgeler arasında tutarsız olduğu (`ARASTIRMA.md` §10, §21) yeniden bakılacak.
- **Kategori:** 11–13 `organization-governance` (faz-05). Klasör ilk kez açılacak; `entegre-batch` klasörü kendisi oluşturmaz.
- **Terimler:** planlanan `temel yetki`, `dış katkıcı`, `sahiplik sürekliliği` (11); `ruleset`, `bypass`, `denetim kaydı` (12).
  "Kayıt" log, "günlük" reflog, "etiket" Git tag'i, "depo" kod deposu (#24, #30, #38, #49).
- **Doğrulama düzeni:** `artifacts/` run'lar arasında silinebiliyor; run 5'in betikleri `artifacts/guvenlik-run5/` altında,
  yoksa yeniden yazılır (`cerebrum.md`'de tarifleri var). Komut bloğu doğrulayıcısı stderr'i stdout'la birlikte toplar. Bu
  makinede `curl` `--ssl-no-revoke` ister; GitHub Docs gövdesi `/api/article/body?pathname=…`, plan kutusu yalnızca HTML'de.
- **Çalışma alanı:** build, sunucu ve render aynı sürücüdeki yalıtılmış kopyada (robocopy `/XD node_modules .next artifacts .git
  .wolf` + `node_modules` junction + kopyaya özel `.env.production.local`, değerler `playwright.config.ts`'teki test
  sabitlerinden); sunucu geçici `launch.json` girdisiyle `next start <kopya> -p 3217`. Kopyayı silmeden önce junction `rmdir`
  ile ayrı sökülür. Run başında ve build öncesinde `git status` yeniden okunur: bu run'da başka bir oturum aynı kopyada BOUN ve
  `src/` dosyalarını değiştirdi.
