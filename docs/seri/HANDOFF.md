# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-08-30 · Durum: **1–26 yayında (kohort Batch 0 + Batch 1 + Batch 2 + Batch 3 + Batch 4 + Batch 5) · Sıradaki: 27**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 26 — `kv-cache-ve-cikarim-ekonomisi` |
| Sıradaki güvenli başlangıç | Makale 27 ("Kuantizasyon: Modeli Küçültme Sanatı"); run kapsamı SOZLESME §7'ye göre çözülür |
| Sıradaki kohort | `classification_batch: 6` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–26 `reasoning-and-memory` (bağlayıcı karar #50); **27'den itibaren kategori karara bağlanmamıştır** |

## Açık borçlar

- **Kategori kararı — sıradaki run'ın ilk işi.** 27 (kuantizasyon) ve 28 (servis) mühendislik
  başlıklarıdır; `reasoning-and-memory` bunları kapsamıyor olabilir. Kontrollü sözlükte
  `models-and-training` dışında uygun bir kalem yok (SOZLESME §1). Karar o başlıkları içeren run'da
  verilmeli, gerekçesiyle YOL-HARITASI'na bağlayıcı karar olarak yazılmalıdır. 26\. makale bu iki
  başlığın zeminini kurdu: darboğaz bellek, çare sayıları küçültmek ve servis katmanı.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 5'te 23, 24, 25 ve 26 koordinatlarının **dördü de ödendi**. Batch 5 yeni bir
  numaralı koordinat **açmadı**; 25 → 41 mevcut bir koordinata kaynak makale ekledi, 26 → 27 ise
  19 ve 20'nin açtığı koordinata üçüncü kaynak oldu. Sıradaki run'ın doğrudan ödeyeceği tek vaat:
  **27** (kuantizasyonun mekanizması ve neyi bozduğu; kaynaklar 19, 20, 26). 28, 29 ve 30 için
  yayımlanmış numaralı vaat **yoktur** — bu başlıklar serbesttir ve batch hazırlığında
  pedagojik gerekçeyle değiştirilebilir.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR (terim hijyeni,
  alt metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için hâlâ uygulanmadı.
  Tam listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan tek künye:** Gerstgrasser ve ark. (2024) için COLM 2024 venue'sü iki bağımsız
  ikincil kaynakla doğrulandı, birincil venue sayfası teyidi alınamadı. Ayrıntı: YOL-HARITASI
  bağlayıcı karar #21. Batch 5'te yeni doğrulanamayan künye çıkmadı; Laban ve ark.'nın ICLR 2026
  künyesi ve ödülü ICLR'ın kendi duyuru sayfasından doğrulandı.
- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları İngilizce
  alan terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning
  ve Test-Time Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları ise terim
  defterine göre Türkçeleştiriliyor (kararlar #51 ve #52). Batch 5 bu katmana bilinçli olarak
  dokunmadı: tek bir faz başlığını çevirmek katmanın kendi tutarlılığını bozardı. Katmanın tümden
  Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.

## Next batch preparation — 27'den devam

**Pedagojik hedefler.** Batch 5 sonunda okuyucu, pencerenin içine konan örneklerin ağırlıklara
dokunmadan nasıl çalıştığını (23), sohbetin perde arkasındaki tek dizinin ve rollerin nasıl
kurulduğunu (24), pencereyi büyütmenin eğitim tarafındaki bedelini (25) ve çalışma anındaki
maliyet yapısını (26) biliyor. Faz 3'ün ilk yarısı kapandı: eksen "pencereye ne yazılır"dan
"pencere ne kadar pahalıdır"a taşındı. 26\. makale darboğazı adlandırdı — hesap değil bellek — ve
27'nin sorusunu doğrudan kurdu: sayıları küçültmek neyi bozar? 28 aynı ekonomiyi sistem katmanına
taşır; 29 ve 30 ise pencereyi doldurmanın iki ayrı yolunu (anlamsal arama ve biçim kısıtı) getirir.

**Sıradaki makaleler ve prerequisite'ler.** YOL-HARITASI "Batch 6 taslağı (27'den devam)" satırları
geçerlidir (27 ← 26, 19, 20, 2, 3, 16 · 28 ← 26, 27, 10, 21 · 29 ← 4, 6, 23, 41 · 30 ← 22, 24, 10).
Kaç makale üretileceği bu run'ın `BATCH` assignment'ıyla belirlenir.

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Bellek bant genişliği ve ağırlık taşıma (26) → 27'de kuantizasyonun asıl kazancı.
- Parametre = sayı (2) ve aktivasyon (3) → 27'de neyin yuvarlandığı.
- QLoRA'nın çift kuantizasyonu ve yüzde 99,3 uyarısı (19) → 27'de ölçüm disiplini.
- Ön dolum ↔ adım adım üretim (26) → 28'de yığınlama ve spekülatif üretim.
- Otoregresif döngü (10) → 28'de spekülatif üretimin neden mümkün olduğu.
- Embedding ve dağılımsal hipotez (4), bağlamsal temsil (6) → 29'da anlamsal arama.
- Gösterim seçimi bir arama işidir (23) → 29'da örnek getirme.
- Belirsizliği azaltmak (22) ve sistem isteminde biçim kuralı (24) → 30'da kısıtlı üretim.
- Üretim kuralları ve kesme (10) → 30'da kod çözme katmanında kısıt uygulamak.

**Araştırılacak güncel akademik alanlar (27 için öncelikli):** eğitim sonrası kuantizasyon ile
kuantizasyona duyarlı eğitim ayrımı; aykırı değer kanallarının 8 bit altındaki davranışı ve bunu
ele alan yöntemler; 4 bit ağırlık kuantizasyonunun ölçülen kalite maliyeti; ağırlık ↔ aktivasyon ↔
anahtar-değer önbelleği kuantizasyonunun ayrı ayrı ele alınması; hassasiyet ile parametre sayısı
arasındaki değiş tokuşu ölçen çalışmalar. **27'nin dürüst sorusu:** "kuantize model neredeyse aynı"
iddiası hangi ölçümde ve hangi görevde doğru — 16\. makalenin disipliniyle okunduğunda geriye ne
kalıyor? 28 için: sürekli yığınlama, ön dolum ile üretimin ayrıştırılması, spekülatif üretimin
kanıtlanmış hızlanması ve kayıpsızlık koşulu. 29 için: getirme için embedding modellerinin
değerlendirilmesi ve ikili kodlayıcının sınırları. 30 için: dilbilgisi kısıtlı üretim ve kısıtın
kaliteye etkisi üzerine ölçümler. Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle
çapraz denetlenir; süreç kuralları SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 27: aynı ağırlık dağılımının kaba ve ince ızgarada gösterimi; bit genişliğine göre bellek ve ölçülen kalite.
- 28: bir yığındaki isteklerin zaman içinde gelip gitmesi (sürekli yığınlama); taslak model ile doğrulayıcının adım şeması.
- 29: sorgunun ve belgelerin aynı uzayda konumlanması (4\. makale Şekil'leriyle görsel süreklilik).
- 30: aynı üretim adımında izin verilen token kümesinin kısıtla daraltılması.

**Teknik plan.** Kategori kararı verilmeden dosya yolu seçilemez (yukarıdaki açık borç). Yeni
makaleler catalog.json'a `classificationBatch: 6` ve `readingOrder` 27'den kesintisiz devam ile
eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir; YOL-HARITASI prerequisite
grafı, kavram-tekrar defteri, terim defteri ve gerekiyorsa bağlayıcı olgu kararları güncellenir;
doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki run hazırlığıyla
güncellenir.

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
korunur. **Sıra önemlidir:** `sync-series-hashes.cjs` katalog varsa yalnızca katalog kayıtlarını
gezer, dolayısıyla yeni makalelerin hash'i ancak `entegre-batch --write`'tan **sonra** düzelir;
frontmatter'a önce yer tutucu hash yazmak sorun değildir. Roadmap başlığı frontmatter başlığıyla
birebir eşleşmek zorundadır — başlık değiştiriliyorsa roadmap.json entegrasyondan **önce**
güncellenmelidir (Batch 5'te 24 ve 26 için tam olarak bu yapıldı). `next dev` açıkken
`pnpm build` çalıştırılmaz. Araçların üçü de varsayılan olarak **yalnızca AI serisini** işler
(`--series=boun` ayrı seri içindir) — repoda ikinci bir seri bulunduğu için bu ayrım önemlidir.
SVG'ler makale gövdesinin hash'ine girmez; şekil düzeltmesi sonrası hash senkronu gerekmez.

**Dev server davranışı (Batch 5'te yeniden doğrulandı).** Doğru sıra: dev server'ı durdur →
`pnpm build` (zorunlu kapı) → dev server'ı başlat → gerçek render doğrulaması. Yerelde
`SITE_PASSWORD_SHA256` tanımlı olmadığı için parola kapısı dev modda devre dışıdır; doğrulama
için ek ortam değişkeni gerekmez. Batch 5'te yeni slug'larda 404 gözlenmedi. Tarayıcı panosunun
görüntülenemediği ortamlarda piksel ekran görüntüsü alınamaz (Batch 5'te de alınamadı); gerçek
render bu durumda DOM ölçümüyle doğrulanır ve bu sınırlama raporda açıkça belirtilir. Ölçüm seti:
üç temada `body` arka plan/metin rengi ve `figure svg` içindeki `text` düğümlerinin hesaplanmış
`fill` değerlerinin `rgb(...)` olarak çözülmesi, `getBoundingClientRect` ile metinlerin SVG kutusu
içinde kalması, `documentElement.scrollWidth > clientWidth` ile mobil/tablet/masaüstü yatay taşma,
`figcaption` metinleri, sayfa içinden `fetch` ile rota sweep'i. **Uyarı:** pano görüntülenmiyorken
`innerWidth` 0 dönebilir ve taşma ölçümü anlamsız çıkar; ölçümden önce `resize_window` ile açık bir
viewport boyutu ver.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; konsolda görülen tek hata sınıfı budur (Batch 5'te yeniden
  doğrulandı).
- Mobil genişlikte diyagramlar kendi kaplarında yatay kayar (SVG 544 birim, kap ~298 birim);
  sayfa gövdesi taşmaz. Bu, yayımlanmış makalelerde de aynı olan yerleşik davranıştır, regresyon
  değildir.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` durumunu yakalar; alt kenara çok yakın
  bir metin tabanı (pay < ~8 birim) denetimden geçer ama harflerin alt uçları kırpılır. Batch 5'te
  yeni şekillerin tamamında alt pay ≥ 12 birime çıkarıldı; yayımlanmış eski şekillerin bir kısmında
  bu pay hâlâ küçüktür (ertelenen MINOR bulgular arasında).
- Repoda ikinci bir seri (`content/series-boun/**`) bulunuyor ve ayrı bir üretim hattıyla
  ilerliyor; AI serisinin araçları bu dizine dokunmaz.

## Non-normative history (tarihsel kayıt; aktif komut değildir)

- **Batch 0 (2026-08-25):** Makale 1–5, `foundations`; seri altyapısı (+rotalar, katalog, araçlar)
  aynı görevde kuruldu.
- **Batch 1 (2026-08-26/27):** Makale 6–10, `models-and-training`. Üretim çok aşamalı
  araştırma → yazım → inceleme → düzeltme → doğrulama turlarıyla yürüdü; inceleme turu
  20 BLOCKER + ~40 MAJOR buldu (en ağırı: makale 9'un Kaplan tahsisinin baştan yanlış kurulması).
  Alınan bağlayıcı olgu kararları YOL-HARITASI §"Bağlayıcı olgu kararları"na taşındı.
- **Batch 2 (2026-08-29):** Makale 11–14, `models-and-training`, serinin ilk `intermediate`
  kohortu. `BATCH=4+1` ile, tek oturumda, yardımcı agent kullanmadan yürüdü. Bütün kapılar geçti:
  191 test, `pnpm build`, 40 rota 200.
- **Batch 3 (2026-08-29):** Makale 15–18, `models-and-training`. `BATCH=4+1` ile, tek oturumda,
  yardımcı agent kullanmadan yürüdü: birincil kaynaklardan sayı çıkarma, tokenizer ölçümlerinin
  `tiktoken` ile yerelde yeniden üretilmesi, yazım, kendi kendine eleştirel inceleme turu, düzeltme,
  entegrasyon ve doğrulama. Doğrulama kapılarının tamamı geçti: 208 test, `pnpm typecheck`,
  `pnpm build` (52 sayfa), 48 rotanın tamamı 200, üç temada DOM ölçümüyle render doğrulaması.
- **Batch 4 (2026-08-29):** Makale 19–22. İlk iki makale `models-and-training` altında Faz 2'yi
  kapattı; son iki makale `reasoning-and-memory` altında Faz 3'ü açtı (bağlayıcı karar #50).
  `BATCH=4+1` ile, tek oturumda, yardımcı agent kullanmadan yürüdü. Üç birincil kaynak PDF'i
  `pypdf` ile metne çevrilerek okundu; 21\. makaledeki token sayıları `tiktoken` ile yerelde
  üretildi. Yayımlanmamış 21, 22 ve 24 başlıklarındaki "Prompt" sözcüğü terim defterine uyarlandı
  (bağlayıcı karar #51). Doğrulama kapılarının tamamı geçti: 223 test, `pnpm typecheck`,
  `pnpm build` (59 sayfa), 55 rotanın tamamı 200, üç temada DOM ölçümüyle render doğrulaması.
- **Batch 5 (2026-08-30):** Makale 23–26, `reasoning-and-memory`; Faz 3'ün pencere/istem/bellek
  yayı tamamlandı. `BATCH=4+1` ile, tek oturumda, yardımcı agent kullanmadan yürüdü. Yedi birincil
  kaynak PDF'i `pypdf` ile metne çevrilerek okundu ve tablolardaki sayılar özetlerden değil
  tablolardan alındı; 26\. makaledeki 229 işlem/bayt eşiği yayımlanmış iki çip özelliğinden
  türetildi (bağlayıcı karar #62). Yayımlanmamış 24 ve 26 başlıkları terim defterine uyarlandı
  (bağlayıcı karar #52); faz başlığı katmanına bilinçli olarak dokunulmadı. Doğrulama kapılarının
  tamamı geçti: 241 test, `pnpm typecheck`, `pnpm build` (66 sayfa), 26 seri rotasının ve `/seri`
  girişinin tamamı 200, üç temada (light/dark/sepia) DOM ölçümüyle render doğrulaması, 12 yeni
  diyagramın tamamı viewBox içinde ve bütün `fill` değerleri üç temada da çözülüyor,
  mobil/tablet/masaüstünde sayfa gövdesinde yatay taşma yok.
- Batch 0/1'in ham üretim kayıtları (araştırma paketleri, 18 inceleme raporu, workflow
  script'leri, `entegre.cjs`'in orijinali) `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv**
  olarak durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
