# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-08-30 · Durum: **1–30 yayında (kohort Batch 0 → Batch 6) · Sıradaki: 31**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 30 — `yapilandirilmis-cikti-json-kod-ve-kisitli-uretim` |
| Sıradaki güvenli başlangıç | Makale 31 ("Akıl Yürütme Nedir? LLM'lerde Reasoning Tartışması"); run kapsamı SOZLESME §7'ye göre çözülür |
| Sıradaki kohort | `classification_batch: 7` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28 ve 30 `reasoning-and-memory`; 29 `agents-and-retrieval` (bağlayıcı kararlar #50 ve #65). 31–40 için `reasoning-and-memory` öngörülüyor (#50); kesin karar o run'da verilir |

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları İngilizce
  alan terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning
  ve Test-Time Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları ise terim
  defterine göre Türkçeleştiriliyor (kararlar #51, #52, #66). Batch 6 bu katmana yine bilinçli olarak
  dokunmadı. Katmanın tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
- **31–33'ün başlıklarındaki İngilizce sözcükler — sıradaki run'ın ilk işi.** Yayımlanmamış
  başlıklarda "Reasoning" (31), "Chain-of-Thought" (32) ve "Test-Time Compute" (33) duruyor.
  Kararlar #51/#52/#66'nın gerekçesi bunlar için de geçerli; karşılıklar o başlıkları içeren run'da
  kararlaştırılıp **roadmap.json entegrasyondan önce** güncellenmelidir. Dikkat: "akıl yürütme"
  karşılığı zaten yol haritasının faz adında kullanılıyor, dolayısıyla 31'in başlığında ikileme
  düşmeden bir çözüm gerekiyor.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 6'da 27 koordinatı ödendi. Batch 6 yeni bir numaralı koordinat **açmadı**;
  29 yalnızca 41'in kaynak listesine eklendi. Sıradaki run'ın doğrudan ödeyeceği iki vaat:
  **32** (ara adımların gücü; kaynaklar 15 ve 22) ve **33** (çıkarım anında hesap harcama ekseni;
  kaynak 9). 31 ve 34 için yayımlanmış numaralı vaat **yoktur** — bu başlıklar serbesttir ve batch
  hazırlığında pedagojik gerekçeyle değiştirilebilir.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR (terim hijyeni,
  alt metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için hâlâ uygulanmadı.
  Tam listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan tek künye:** Gerstgrasser ve ark. (2024) için COLM 2024 venue'sü iki bağımsız
  ikincil kaynakla doğrulandı, birincil venue sayfası teyidi alınamadı. Ayrıntı: YOL-HARITASI
  bağlayıcı karar #21. Batch 6'da yeni doğrulanamayan künye çıkmadı; on dokuz kaynağın tamamının
  yayın yeri konferans sayfasından ya da ACL Anthology'den doğrulandı (bağlayıcı karar #84).

## Next batch preparation — 31'den devam

**Pedagojik hedefler.** Batch 6 sonunda okuyucu, çıkarımın maliyet yapısının tamamını biliyor:
önbellekte ne durduğunu (26), sayıları küçültmenin neyi bozduğunu (27), boştaki hesabın nasıl
doldurulduğunu (28), pencereye konacak metnin nasıl bulunduğunu (29) ve çıktının bir biçime nasıl
zorlandığını (30). Faz 3 kapandı: eksen "pencereye ne yazılır"dan "pencere ne kadar pahalıdır"a,
oradan "içine ne konur ve dışına ne çıkar"a taşındı.

Faz 4 bambaşka bir soruyla açılıyor ve köprüsü 30\. makalenin kapanışında kuruldu: şemanın alan
sırası ara adımları siliyordu, 22\. makale ara adımların ölçülen kazancını vermişti, 15\. makale
bir toplama işleminin ara adımlarla düzeldiğini göstermişti. Üçü aynı yere işaret ediyor —
model cevaba varmadan önce metin üretmek ölçülebilir biçimde işe yarıyor. Faz 4'ün ilk işi bu
gözlemin adını doğru koymak: "akıl yürütme" ne demek, nasıl ölçülür, ve iddia nerede fazla
uzatılıyor?

**Sıradaki makaleler ve prerequisite'ler.** YOL-HARITASI "Batch 7 taslağı (31'den devam)" satırları
geçerlidir (31 ← 30, 22, 10, 16, 5 · 32 ← 31, 22, 15, 10, 23 · 33 ← 32, 9, 26, 28, 10 ·
34 ← 32, 13, 11, 16). Kaç makale üretileceği bu run'ın `BATCH` assignment'ıyla belirlenir.

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Şemanın alan sırası ara adımları siliyor (30) → 31 ve 32'nin açılış gerilimi.
- Ara adımların dar uygulama alanı (22, bağlayıcı karar #47: sembolik 14,2 / matematik 12,3 /
  mantık 6,9 / diğer 0,7) → 32'nin çekirdek tablosu.
- Sayı bölünmesi ve ara adım (15) → 32'de aritmetik örneği.
- Otoregresif döngü (10) → 32'de "aynı döngü, daha uzun dizi".
- Üretim bir çekiliştir; sıcaklık ve kesme (10) → 36'da self-consistency, 31'de belirsizlik.
- Ölçüm disiplini ve benchmark kırılganlığı (16, kararlar #25, #26) → 31'de "akıl yürütme ölçülüyor mu".
- Hesap bütçesi ve ölçek yasası (8, 9) → 33'te çıkarım anındaki hesap ekseni.
- Ön dolum ↔ adım adım üretim ve token maliyeti (26, 28) → 33'te "düşünme süresi satın almanın" faturası.
- Spekülatif üretim ve doğrulama asimetrisi (28) → 33 ve 35'te üret-doğrula düzeni.
- Ödül modeli ve tercih optimizasyonu (13) → 34'te doğrulanabilir ödül.
- Post-training haritası (11) → 34'te dördüncü durak.

**Araştırılacak güncel akademik alanlar (31 için öncelikli):** "akıl yürütme" teriminin alandaki
tanım tartışması; ara adımların gerçekten hesaplama mı yoksa istem devamı mı olduğu; ara adımların
verilen cevaba sadakati (faithfulness) üzerine ölçümler; aynı soruyu yüzeysel biçimde değiştirince
başarının nasıl değiştiğini ölçen çalışmalar; ezber ↔ akıl yürütme ayrımını kirlilik açısından
sınayan işler. 32 için: ara adımların hangi görev sınıflarında kazanç verdiği ve kazancın kaynağı.
33 için: çıkarım anında hesap ölçekleme, örnekleme sayısı ile başarı arasındaki ilişki, ve bu
hesabın 26/28'deki maliyet yapısına oturması. 34 için: doğrulanabilir ödülle eğitim, hakemli
kaynaklarla; matematik ve kodun neden test alanı olduğu. Sayısal iddialar ve URL doğrulaması
yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 31: aynı sorunun yüzeysel varyantlarında başarının dağılımı; "cevap doğru ama gerekçe farklı" ayrımı.
- 32: ara adımsız ve ara adımlı üretimin aynı dizide yan yana gösterimi (10\. makalenin token
  kutularıyla görsel süreklilik).
- 33: aynı soruya ayrılan token bütçesi ile başarı arasındaki eğri; eğitim hesabı ↔ çıkarım hesabı ekseni.
- 34: doğrulanabilir ödülün döngüsü (13\. makaledeki ödül modeli şemasıyla karşılaştırmalı).

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 7` ve `readingOrder` 31'den
kesintisiz devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir;
YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve gerekiyorsa bağlayıcı olgu
kararları güncellenir; doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki
run hazırlığıyla güncellenir.

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
güncellenmelidir (Batch 6'da 28 için tam olarak bu yapıldı). **Entegrasyondan sonra makale gövdesine
her dokunuşta `sync-series-hashes.cjs --write` yeniden çalıştırılmalıdır**; aksi hâlde sayfa 500
verir. `next dev` açıkken `pnpm build` çalıştırılmaz. Araçların üçü de varsayılan olarak **yalnızca
AI serisini** işler (`--series=boun` ayrı seri içindir) — repoda ikinci bir seri bulunduğu için bu
ayrım önemlidir. SVG'ler makale gövdesinin hash'ine girmez; şekil düzeltmesi sonrası hash senkronu
gerekmez, ama makale **alt metni** değiştiyse gerekir.

**Dev server davranışı (Batch 6'da iki tuzak netleşti).** Doğru sıra: dev server'ı durdur →
`rm -rf .next` → `pnpm build` (zorunlu kapı) → `rm -rf .next` → dev server'ı başlat → gerçek render
doğrulaması. `.next` dizinini build ve dev arasında paylaştırmak manifest bozulmasına yol açıyor
(500: `prerender-manifest.json` bulunamıyor ya da JSON yarım kalıyor). İkinci tuzak: makale gövdesi
ya da katalog değiştikten sonra dev server'ın önbelleğe aldığı `catalog.json` bayatlıyor ve sayfa
"Katalog ile frontmatter uyuşmuyor" hatasıyla 500 veriyor; dosyalar diskte tutarlı olsa bile.
Çaresi dev server'ı yeniden başlatmak. Yerelde `SITE_PASSWORD_SHA256` tanımlı olmadığı için parola
kapısı dev modda devre dışıdır. Batch 6'da yeni slug'larda 404 gözlenmedi.

**Render doğrulama seti (Batch 6'da genişledi).** Üç temada (`html.dark`, `html.sepia`, ikisi de yoksa
light) `body` arka plan/metin renkleri; `figure svg` içindeki bütün `text` düğümlerinin hesaplanmış
`fill` değerlerinin `rgb(...)` olarak çözülmesi; `getBBox` ile metinlerin viewBox içinde kalması;
`documentElement.scrollWidth > clientWidth` ile mobil/tablet/masaüstü yatay taşma; `figcaption`
metinleri; sayfa içinden `fetch` ile rota sweep'i. **Uyarı:** pano görüntülenmiyorken `innerWidth`
0 döner; ölçümden önce `resize_window` ile açık bir viewport boyutu verilmelidir. Piksel ekran
görüntüsü Batch 6'da **alınabildi** (Batch 3–5'te alınamıyordu), fakat yalnızca sayfa başındayken
çalışıyor; kaydırdıktan sonra boş kare dönüyor. Şekilleri görmek için `figure` düğümlerini geçici
bir `position:fixed` kaplayıcıya klonlamak işe yarıyor.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur
  (Batch 6'da yeniden doğrulandı).
- Mobil genişlikte diyagramlar kendi kaplarında yatay kayar (SVG 544 birim, kap ~335 birim);
  sayfa gövdesi taşmaz. Bu, yayımlanmış makalelerde de aynı olan yerleşik davranıştır, regresyon
  değildir.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` durumunu yakalar; alt kenara çok yakın
  bir metin tabanı (pay < ~8 birim) denetimden geçer ama harflerin alt uçları kırpılır. Batch 6'da
  yeni şekillerin tamamında alt pay ≥ 18 birime çıkarıldı; yayımlanmış eski şekillerin bir kısmında
  bu pay hâlâ küçüktür (ertelenen MINOR bulgular arasında).
- Batch 6'nın okuma listesinde `reasoning-and-memory` kategorisi iki ayrı öbek hâlinde görünür
  (27–28, sonra `agents-and-retrieval` 29, sonra yine `reasoning-and-memory` 30). Bu kasıtlıdır
  (bağlayıcı karar #65) ve UI bunu destekler; `reading-list-groups.test.ts` tam olarak bu durumu sınar.
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
  (bağlayıcı karar #52). Doğrulama kapılarının tamamı geçti: 241 test, `pnpm typecheck`,
  `pnpm build` (66 sayfa), 26 seri rotasının ve `/seri` girişinin tamamı 200, üç temada DOM
  ölçümüyle render doğrulaması.
- **Batch 6 (2026-08-30):** Makale 27–30; Faz 3 kapandı. 27, 28 ve 30 `reasoning-and-memory`,
  29 `agents-and-retrieval` (bağlayıcı karar #65 — Faz 3'ün açık kategori borcu kapatıldı ve
  getirme ekseni açıldı). `BATCH=4+1` ile, tek oturumda, yardımcı agent kullanmadan yürüdü.
  On dokuz birincil kaynak PDF'i `pypdf` ile metne çevrilerek okundu; kullanılan kaynakların
  tamamı hakemlidir ve Batch 6 hakemsiz kaynak listesine ekleme yapmadı (karar #84). Yayımlanmamış
  28 başlığı terim defterine uyarlandı (bağlayıcı karar #66). Doğrulama kapılarının tamamı geçti:
  259 test, `pnpm typecheck`, `pnpm build` (73 sayfa), 30 seri rotasının ve `/seri` girişinin
  tamamı 200, üç temada (light/dark/sepia) DOM ölçümüyle render doğrulaması, 12 yeni diyagramın
  tamamı viewBox içinde ve bütün `fill` değerleri üç temada da çözülüyor, mobil/tablet/masaüstünde
  sayfa gövdesinde yatay taşma yok. Bu batch'te piksel ekran görüntüsü de alınabildi ve on iki
  şeklin tamamı üç temada gözle doğrulandı.
- Batch 0/1'in ham üretim kayıtları (araştırma paketleri, 18 inceleme raporu, workflow
  script'leri, `entegre.cjs`'in orijinali) `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv**
  olarak durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
