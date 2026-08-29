# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-08-29 · Durum: **1–18 yayında (kohort Batch 0 + Batch 1 + Batch 2 + Batch 3) · Sıradaki: 19**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 18 — `bilgi-parametrelerde-nasil-durur-model-hafizasi` |
| Sıradaki güvenli başlangıç | Makale 19 ("Fine-Tuning ve LoRA: Modeli Kendi İşine Uyarlamak"); run kapsamı SOZLESME §7'ye göre çözülür |
| Sıradaki kohort | `classification_batch: 4` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (YOL-HARITASI bağlayıcı karar #19) |

## Açık borçlar

- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 3'te 15, 16, 17 vaatleri ve 18'in ayağı **ödendi**. Sıradaki run'ın
  doğrudan ödeyeceği vaat **yok**: 19 ve 20 için yayımlanmış numaralı vaat bulunmuyor
  (11 → 19 işareti numarasızdır). Batch 3'te **üç yeni koordinat** doğdu: 15 → 32 (ara adımlarla
  doğruluğun geri kazanılması), 16 → 101 (ölçümün istatistiksel disiplini), 17 → 41 (dış kaynağa
  bağlanma). Ayrıca 72, 74–77 ve 86 koordinatlarına yeni kaynak makaleler eklendi.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR (terim hijyeni,
  alt metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için hâlâ uygulanmadı.
  Tam listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan tek künye:** Gerstgrasser ve ark. (2024) için COLM 2024 venue'sü iki bağımsız
  ikincil kaynakla doğrulandı, birincil venue sayfası teyidi alınamadı. Ayrıntı: YOL-HARITASI
  bağlayıcı karar #21. Batch 3'te yeni doğrulanamayan künye çıkmadı.
- **Kategori kararı bekliyor (Faz 3 için):** 19–20 `models-and-training` altında kalabilir; 21'den
  itibaren (bağlam, istem, çıkarım ekonomisi) kontrollü sözlükteki hangi kategorinin kullanılacağı
  **henüz kararlaştırılmadı**. En yakın adaylar `reasoning-and-memory` (bağlam/bellek ekseni) ve
  mevcut `models-and-training`. Karar 21'i içeren run'da verilmeli ve YOL-HARITASI'na yazılmalıdır.

## Next batch preparation — 19'dan devam

**Pedagojik hedefler.** Batch 3 sonunda okuyucu, bir modelin "iyi" olduğu iddiasının nasıl ölçüldüğünü,
ölçümün nerede kırıldığını, modelin neden uydurduğunu ve bildiği şeyin ağırlıklarda nerede durduğunu
biliyor. Bu yayın boyunca model hep **sabit** varsayıldı: eğitildi, biz inceledik. Sıradaki yay bu
varsayımı kaldırıyor — hazır bir modeli kendi işine uyarlamak (19) ve bu modellerin hangi koşullarda
elde edilebildiği (20) Faz 2'yi kapatır; 21'den itibaren odak eğitimden **kullanıma** kayar.

**Sıradaki makaleler ve prerequisite'ler.** YOL-HARITASI "Batch 4 taslağı (19'dan devam)" satırları
geçerlidir (19 ← 11, 18, 2, 7, 12 · 20 ← 8, 9, 14, 19 · 21 ← 4, 7, 15, 10 · 22 ← 21, 16, 12, 10).
Kaç makale üretileceği bu run'ın `BATCH` assignment'ıyla belirlenir.

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- İnce ayar (11) ve denetimli ince ayar mekaniği (12) → 19'da verimli biçimiyle.
- Parametre/ağırlık (2) ve blok içindeki matris boyutları (7) → 19'da düşük ranklı güncellemenin zemini.
- Anahtar-değer belleği ve kapasite (18) → 19'da "LoRA ne ekleyebilir, ne ekleyemez" sorusunda.
- İnce ayarın kötü bir bilgi kanalı olması (17, 18) → 19'da dürüst sınır olarak.
- Hizalama vergisi (11) → 19'da uyarlamanın bedeli.
- Veri rızası ve lisans (14) → 20'de yönetişim tarafı.
- Hesap bütçesi ve PF-gün (8, 9) → 20'de "kim eğitebilir" sorusunda.
- Token ızgarası ve dil başına maliyet (4, 15) → 21'de bağlam sınırının gerçek bedeli.
- Karesel dikkat maliyeti (7) → 21'de pencere büyütmenin fiyatı.
- İstem biçimi duyarlılığı (16) → 22'de kanıta dayalı bakışın zemini.

**Araştırılacak güncel akademik alanlar (19 için öncelikli):** düşük ranklı uyarlamanın kurucu
çalışması ve ardılları (LoRA ve QLoRA çizgisi); ince ayarın içsel boyutu tartışması; LoRA'nın tam
ince ayara kıyasla ne kazandırıp ne kaybettiğini ölçen karşılaştırmalar (öğrenme ↔ unutma dengesi);
adapter ve prefix-tuning ailesinin tarihsel yeri; **19'un dürüst sorusu:** düşük ranklı bir güncelleme
modele yeni olgusal bilgi ekleyebilir mi — 17 ve 18'in bulgularıyla çelişmeyen bir cevap gerekir.
20 için: açık ağırlık ↔ açık kaynak ayrımı, lisans tipolojisi ve OSI tanımıyla uyuşmazlık,
şeffaflık ölçümleri; düzenleyici çerçeveler yalnızca **işaret düzeyinde** — tam kurulum 69'a aittir.
Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları
SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 19: tam ağırlık matrisi ile düşük ranklı iki matrisin parametre sayısı karşılaştırması
  (7\. makalenin blok sayımıyla görsel süreklilik); aynı taban modele takılıp çıkarılan adaptörler.
- 20: açıklığın tek eksen olmadığı — ağırlık, veri, kod, lisans ve rapor ayrı ayrı.
- 21: bağlam penceresinin neleri kapsadığı; aynı metnin dile göre pencereden ne kadar yer kapladığı.
- 22: aynı görevin farklı istem biçimlerinde dağılan doğruluğu (16\. makale Şekil 1 ile süreklilik).

**Teknik plan.** 19–20 için `content/series/articles/models-and-training/` uygundur; 21 ve sonrası
için kategori kararı yukarıdaki açık borçta. Yeni makaleler catalog.json'a `classificationBatch: 4`
ve `readingOrder` 19'dan kesintisiz devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda`
yapılır + slug eklenir; YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve
gerekiyorsa bağlayıcı olgu kararları güncellenir; doğrulama kapıları çalıştırılır; `+1` fazında bu
dosya yeni cursor ve sonraki run hazırlığıyla güncellenir.

**Entegrasyon sırası (repo içi araçlarla):**
```
node tools/series/entegre-batch.cjs            # kuru çalışma: frontmatter → katalog/roadmap denetimi
node tools/series/entegre-batch.cjs --write    # catalog.json + roadmap.json
node tools/series/sync-series-hashes.cjs --write
node tools/series/check-series-content.cjs && node tools/series/check-series-svg.cjs
corepack pnpm typecheck && corepack pnpm test && corepack pnpm build
```
Notlar: frontmatter **gray-matter ile** okunur; `catalog.json` 2 boşluklu `JSON.stringify` ile
byte-identical round-trip yapar; `roadmap.json`'un kompakt satır biçimi satır bazlı replace ile
korunur. `next dev` açıkken `pnpm build` çalıştırılmaz. Araçların üçü de varsayılan olarak
**yalnızca AI serisini** işler (`--series=boun` ayrı seri içindir) — repoda ikinci bir seri
bulunduğu için bu ayrım önemlidir.

**Dev server davranışı (Batch 3'te yeniden doğrulandı).** Doğru sıra: dev server'ı durdur →
`pnpm build` (zorunlu kapı) → dev server'ı başlat → gerçek render doğrulaması. Yeni slug'lar
sunucu içi modül önbelleği yüzünden bazen 404 döner; Batch 3'te bu, `location.reload()` ve
viewport değişimi sonrasında görüldü ve **dev server yeniden başlatılınca** düzeldi. Tarayıcı
panosunun görüntülenemediği ortamlarda piksel ekran görüntüsü alınamaz; gerçek render bu durumda
DOM ölçümüyle doğrulanır (üç temada `body` arka plan/metin rengi, `figure svg` metinlerinin
viewBox içinde kalması, mobil/tablet/masaüstünde yatay taşma yokluğu, şekil altyazıları, rota
sweep'iyle HTTP 200) ve bu sınırlama raporda açıkça belirtilir.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; konsolda görülen tek hata sınıfı budur.
- Repoda ikinci bir seri (`content/series-boun/**`) bulunuyor ve ayrı bir üretim hattıyla
  ilerliyor. Batch 3 sırasında bu seride harici bir değişiklik gözlendi (7–9. makaleler entegre
  edilmiş, worktree'de commit'lenmemiş); AI serisinin araçları bu dizine dokunmaz.

## Non-normative history (tarihsel kayıt; aktif komut değildir)

- **Batch 0 (2026-08-25):** Makale 1–5, `foundations`; seri altyapısı (+rotalar, katalog, araçlar)
  aynı görevde kuruldu.
- **Batch 1 (2026-08-26/27):** Makale 6–10, `models-and-training`. Üretim çok aşamalı
  araştırma → yazım → inceleme → düzeltme → doğrulama turlarıyla yürüdü; inceleme turu
  20 BLOCKER + ~40 MAJOR buldu (en ağırı: makale 9'un Kaplan tahsisinin baştan yanlış kurulması).
  Alınan bağlayıcı olgu kararları YOL-HARITASI §"Bağlayıcı olgu kararları"na taşındı.
- **Batch 2 (2026-08-29):** Makale 11–14, `models-and-training`, serinin ilk `intermediate`
  kohortu. `BATCH=4+1` ile, tek oturumda, yardımcı agent kullanmadan yürüdü. İnceleme turunda
  yakalanan başlıca sorunlar terim defteri ihlali, DPO'nun gövdede açılmaması ve şekil–alt metin
  uyumsuzluğuydu. Bütün kapılar geçti: 191 test, `pnpm build`, 40 rota 200.
- **Batch 3 (2026-08-29):** Makale 15–18, `models-and-training`. `BATCH=4+1` ile, tek oturumda,
  yardımcı agent kullanmadan yürüdü: birincil kaynaklardan sayı çıkarma (CUTE ve Singh–Strouse
  için PDF üzerinden), tokenizer ölçümlerinin `tiktoken` ile yerelde yeniden üretilmesi, yazım,
  kendi kendine eleştirel inceleme turu, düzeltme, entegrasyon ve doğrulama. İnceleme turunda
  yakalanan başlıca sorunlar: 4\. ve 10\. makalede kurulmuş terimlerin yeniden gloss'lanması
  (BPE, halüsinasyon), yeni terimlerin gloss'suz bırakılması (benchmark, liderlik tablosu,
  kalibrasyon, anahtar-değer belleği, nedensel izleme, içsel/dışsal uydurma, atomik olgu), bir
  şekil alt metninin şekille uyuşmaması ve dört makalenin de ilk taslakta 2.000 kelime eşiğinin
  altında kalması (eksik olan her seferinde gerçek içerikle kapatıldı, doldurma yapılmadı).
  Doğrulama kapılarının tamamı geçti: 208 test, `pnpm typecheck`, `pnpm build` (52 sayfa),
  48 rotanın tamamı 200, üç temada DOM ölçümüyle render doğrulaması, 11 diyagramın tamamı
  viewBox içinde, mobil/tablet/masaüstünde yatay taşma yok.
- Batch 0/1'in ham üretim kayıtları (araştırma paketleri, 18 inceleme raporu, workflow
  script'leri, `entegre.cjs`'in orijinali) `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv**
  olarak durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
