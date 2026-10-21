# "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state.** Kurallar `SOZLESME.md`'de, plan ve
> defterler `YOL-HARITASI.md`'de, kaynak kanıtı `ARASTIRMA.md`'de. Yeni oturum sırasıyla okur:
> SOZLESME → bu dosya → YOL-HARITASI'nın sıradaki yazıları. Trigger: `docs/seri-guvenlik/TRIGGER.md`.

Son güncelleme: 2026-10-21 · Durum: **Run 2 tamamlandı (yazı 3–4 yayında, kohort 1).** Sıradaki run
yazı 5–6'yı üretir ve Git/GitHub hattını açar.

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan | 4 / 25 planlı (tavan 25; `SOZLESME.md` §1) |
| Yayımlanan son yazı | 4 — `guvenli-varsayilanlar-yapilandirma` |
| Son kohort | `classification_batch: 1` (run 2) |
| Sıradaki güvenli başlangıç | Yazı 5 ve 6 (`BATCH=2+1`), `reading_order` 5–6, faz-03, kategori `version-control` |
| Sıradaki kohort | `classification_batch: 2` |
| Kalan | 21 yazı; `BATCH=2+1` ile 11 run, sonuncusu yalnızca yazı 25 |
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

1–2 `owasp-and-verification`, kohort 0; 3–4 `design-and-configuration`, kohort 1; hepsi `advanced`.
Run 2, yazı 1–2'nin dosyalarına, kimliğine, slug'ına, sırasına ve hash'ine dokunmadı.

## Son üretim run'ı: run 2 (2026-10-21)

- **Yazı 3 (3.037 düzyazı kelimesi):** 2'nin belge ürününde önizleme hattı; "işçi iç ağda, girdisi
  güvenilir" varsayımı CWE-501 olarak; veri akış diyagramı, sınır geçişlerinde STRIDE, tehdit →
  karar → ASVS 5.0.0 gereksinimi → negatif test tablosu; düzeltilmiş işçi, yalıtılmış dönüştürücü,
  en az yetkili depolama politikası; kendi hesabımız (zip bombası, PNG başlığı); model değişiklikle
  yaşar. İki "Teşhis et" (imzalı mesaj; işçide dönüştürme geri dönüşü).
- **Yazı 4 (2.589 düzyazı kelimesi):** aynı özelliğin sürüm öncesi yapılandırma incelemesinde dört
  bulgu; etkin değerin katmanları; finalhandler 2.1.1 sondası (kendi deneyimiz); libxml2 `NOENT`;
  açılış denetimi (fail-closed); yapılandırma kayması; saldırı yüzeyi envanteri. İki "Teşhis et"
  (`nonet`; ortam farkları). "Sırada ne var" Git hattını açtı (karar #25).
- **Yalnızca içerik:** platform, okuma verisi, veritabanı ve araç kodu değişmedi.
- **Run içinde yakalanıp düzeltilenler:** "depo" iki anlamda kullanılıyordu (nesne deposu ve kod
  deposu); yazı 3 yayımlanmadan önce düzeltildi (karar #24). Şekil ön denetimi iki çakışma buldu
  (yazı 3 Şekil 2'de sınır etiketi oklarla kesişiyordu; yazı 4 Şekil 2'de "inceleme" etiketi sınır
  çizgisiyle); ikisi de düzeltildi.

## Değişen dosyalar (commit edilmedi; run 2)

- **İçerik:** `content/series-guvenlik/articles/design-and-configuration/{tehdit-modelleme-guven-sinirini-cizmek,guvenli-varsayilanlar-yapilandirma}.md`,
  `content/series-guvenlik/assets/tehdit-modelleme-guven-sinirini-cizmek/{onizleme-veri-akisi,once-sonra-isci-siniri}.svg`,
  `content/series-guvenlik/assets/guvenli-varsayilanlar-yapilandirma/{etkin-degerin-katmanlari,yapilandirmanin-iki-yolu}.svg`,
  `content/series-guvenlik/{catalog.json,roadmap.json}`.
- **Belgeler:** `docs/seri-guvenlik/{HANDOFF,YOL-HARITASI,ARASTIRMA}.md`.
- **OpenWolf:** `.wolf/{anatomy,memory,cerebrum}.md`, `.wolf/buglog.json`.
- Run 1 ve müfredat revizyonunun bütün değişiklikleri `9e720b9` ("owasp") commit'inde (kullanıcı).

## Kanıt (run 2)

Ham çıktılar `artifacts/guvenlik-run2/` altında (gitignore; yalnızca bu makinede, kalıcı değil).

| Kapı | Sonuç | Çıktı |
|---|---|---|
| Kaynak doğrulama | Birincil sayfalar indirildi ve iddialar metinle eşleştirildi (`ARASTIRMA.md` §12–§13); W3C PNG belirtimi betiğe 403 verdi, yerleşik tarayıcıdan okundu | `src/`, `urls-*.txt` |
| Kendi hesabımız ve deneyimiz | zip ve PNG ölçümleri (Python 3.14.5); finalhandler sondası (Node.js 24.14.0) | `ARASTIRMA.md` §14 |
| `check-series-content --series=guvenlik` | 4 makale, sorun yok | konsol |
| `check-series-svg` + XML ayrıştırma | 8 diyagram, sorun yok; 4 yeni SVG XML olarak ayrıştı | konsol |
| Şekil ön denetimi (`figs.mjs`: `getBBox` ile metin-metin, kutudan taşma, çizgi-metin; üç tema × iki genişlik) | 2 çakışma bulundu, düzeltildi; son durumda yalnızca okların üstündeki numara halkaları (bilerek) | `figs/`, `figs/figs-report.json` |
| `entegre-batch` (kuru → yazma) | "Katalogda 2 mevcut, 2 yeni makale", roadmap 2 satır | konsol |
| `sync-series-hashes` | 4 makale, sorun yok | konsol |
| `pnpm typecheck` | 0 hata | `typecheck.txt` |
| `vitest run` | 42 dosya / 826 test geçti | `test.txt` |
| `eslint src tools tests scripts` | 14 hata; run öncesi tabanla bulgu bulgu aynı | `lint-src.txt` |
| `next build` (yalıtılmış kopya `D:\dev\.anil-lib-iso-guvenlik-run2`) | exit 0, 188 sayfa; `/guvenlik` ƒ, `/guvenlik/[slug]` ● dört slug | `build.txt` |
| Gerçek render (üretim sunucusu, 3217, depodaki e2e test kimliğiyle giriş) | 375 / 768 / 1280 × açık / koyu / sepya × 6 sayfa = 54 ölçüm: hepsi 200, belge taşması 0, tema doğru, SVG metni viewBox içinde, çözülmemiş dolgu yok, takılı yükleme yok; landing'de 4 yayımlanmış bağlantı ve 21 "yakında"; tek konsol hatası yerel `/api/reader-sync` 503. Yeni şekiller üç temada, masaüstü ve mobilde gözle incelendi | `render/out/`, `render/run.txt` |
| E2E sığma kuralının dört durumu | Masaüstü akış, sayfalı sütunlar ve tablette tablo taşması 0; telefonda yazı 3'ün beş sütunlu tablosu kendi kabında 74 px kaydırır (kural 5+ sütuna izin verir); şekil etiketleri en az 6,61 px | `render/paged.txt` |

## Run öncesinden gelen, değişmeyen durumlar

- Lint'in 14 hatası (araç betiklerinde `require`, `src/lib/content/schema.ts`'de yalnızca tip olarak
  kullanılan üç şema sabiti). Kapsam dışı; dokunulmadı.
- `tests/e2e/reader-data.spec.ts`'in iki senkron testi yerelde veritabanı olmadığı için kalıyor.
- Yerelde `/api/reader-sync` 503 döner (`DATABASE_URL` yok; beklenen davranış).
- Depo kökünde 2026-09-01 tarihli, git'in izlediği 0 baytlık dosyalar var (`her`, `Karar`, `ritmi`,
  `sinyal`, `yapılırsa`, `Yaşayan`). Bu serinin işi değil; dokunulmadı.

## İzin bekleyen işlemler (yapılmadı; yalnız öneri)

- **Commit / push:** run 2'nin değişiklikleri commit edilmedi.
- **Deploy:** `vercel-build` = `node scripts/migrate.mjs && next build`; run 1'in `drizzle/0005`'i
  `9e720b9`'da. Canlı veritabanına uygulanıp uygulanmadığı bu run'da doğrulanmadı (canlı sisteme
  bakılmadı). Run 2 yeni migration getirmedi.
- **OWASP'a tutarsızlık bildirimi:** `ARASTIRMA.md` §6.
- **GitHub organizasyonu:** okunmadı, değiştirilmedi.

## Açık borçlar

- Güvenlik ekseni: `ARASTIRMA.md` §6 (Top 10:2025 metin tutarsızlıkları, A01 puanı, WSTG ve SSDF sürüm
  takibi, Kubernetes sürümlü adresi; run 2'nin sürüme bağlı iddiaları, Proactive Controls'un sonraki
  edisyonu, e2e `ILLUSTRATED` kapsamı).
- Git/GitHub hattı: `ARASTIRMA.md` §11.
- Açık ileri işaretler (`YOL-HARITASI.md`): 1 → 15 (403 mü 404 mü, kiracı katmanı); 2 → 23 (güvenlik
  kaydı ve uyarı); 4 → 5 ("Sırada ne var", sıradaki run karşılar).

## Sonraki run için hazırlık (yazı 5–6)

- **Yazı 5 — Git'in zihinsel modeli:** 4'ün "Sırada ne var" sözü karşılanır: XXE düzeltmesi tam olarak
  nerede, üretime giden yapı onu içeriyor mu, ana daldan önceden açılmış bir dal ana dala sonradan
  giren bu düzeltmeyi kendiliğinden alır mı? Yol haritasındaki güvenlik yaması bu düzeltme
  (`DOCTYPE` reddi) olarak somutlanabilir; senaryo kurgusal `ornek-sirket`'te kalır (karar #25).
- **Terimler:** "dal (branch)" ve "kod deposu (repository)" 4'te kuruldu; 5 parantezli gloss'u tekrar
  etmez. "Depo" yalnızca kod deposu anlamındadır (karar #24). commit, HEAD, çalışma ağacı, hazırlık
  alanı, varsayılan dal 5'te ilk kez; uzak depo, uzak izleme dalı, yukarı akış dalı, ileri sarma,
  ıraksama 6'da (`YOL-HARITASI.md` §Planlanan terim kararları).
- **Git/GitHub kuralları bağlayıcı:** `SOZLESME.md` §3 "Git ve GitHub yazıları için ek kurallar" (komut
  bloğunun altı öğesi, deney deposu, gerçek çıktı ve Git sürümü, plan koşulu) ve §6 commit grafiği
  kuralı. Deney deposunun başlangıç noktası `artifacts/git-revizyon/git-sandbox.sh` (yalıtılmış
  yapılandırma; yerel Git 2.53.0.windows.2 revizyonda ölçüldü, yeniden bakılır).
- **Kaynaklar (yeniden doğrulanır):** Git başvuru kılavuzu (`git-init`, `git-merge-base`, `git-fetch`,
  `git-pull`, `git-push`, `git-branch`, `git-status`, `gitglossary`; "last updated in" sürümleri),
  BreakingChanges (Git 3.0 ve `main`), Pro Git 1.1–1.3, 2.5, 3.1, 3.5, 10.2–10.3, GitHub Docs "About
  branches" ve borçtaki "Changing the default branch" (`ARASTIRMA.md` §11).
- **Doğrulama düzeni:** şekiller önce `artifacts/guvenlik-run2/figs.mjs` ile (üç tema, iki genişlik,
  `getBBox` çakışma denetimi), sonra okuyucuda; tablolar `render/paged.mjs`'in dört durumuyla.
- **Çalışma alanı:** bu depoda eş zamanlı başka bir Claude oturumu açık olabilir; build, sunucu ve
  render yalıtılmış kopyada (robocopy + `node_modules` junction), sunucu `.claude/launch.json`'a geçici
  girdiyle açılır ve iş sonunda yalnız o girdi çıkarılır. Render girişi depodaki e2e test kimliğiyle
  yapılır (değer `artifacts/git-revizyon/render/revizyon.render.ts`'ten okunur). `artifacts/` altına
  derlenebilir `.ts` bırakılmaz.
