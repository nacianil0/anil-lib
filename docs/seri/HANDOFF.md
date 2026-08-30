# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-08-30 · Durum: **1–34 yayında (kohort Batch 0 → Batch 7) · Sıradaki: 35**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 34 — `akil-yuruten-modeller-dogrulanabilir-odulle-egitim` |
| Sıradaki güvenli başlangıç | Makale 35 ("Doğrulama: Modelin Cevabını Kontrol Etmek"); run kapsamı SOZLESME §7'ye göre çözülür |
| Sıradaki kohort | `classification_batch: 8` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30 ve 31–34 `reasoning-and-memory`; 29 `agents-and-retrieval` (bağlayıcı kararlar #50, #65 ve #85). 35–40 için `reasoning-and-memory` öngörülüyor; kesin karar o run'da verilir |

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları İngilizce
  alan terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning
  ve Test-Time Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları ise terim
  defterine göre Türkçeleştiriliyor (kararlar #51, #52, #66, #86). Batch 7 bu katmana yine bilinçli
  olarak dokunmadı ve artık bir tuhaflık görünür hâle geldi: Faz 4'ün adı "Reasoning ve Test-Time
  Compute" derken altındaki dört başlığın hiçbirinde o sözcükler yok. Katmanın tümden
  Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler — sıradaki run'ın ilk işi.** 35–40 arasında
  "Self-Consistency" (36), "MDP" (37) ve 41–50'de "RAG" (41, 44, 45, 46), "Retrieval" (42),
  "Function Calling" (47), "MCP" (49) duruyor. Kararlar #51/#52/#66/#86'nın gerekçesi bunlar için
  de geçerli; karşılıklar o başlıkları içeren run'da kararlaştırılıp **roadmap.json entegrasyondan
  önce** güncellenmelidir. Not: "MCP" ve "MDP" gibi kısaltmalar ile "RAG" için Türkçeleştirme
  zorunlu değildir; terim defterinde karşılığı olmayan kalemler olduğu gibi bırakılabilir
  (15\. makalenin "Tokenizer" emsali).
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 7'de 32 ve 33 koordinatları ödendi. Batch 7 **üç yeni** numaralı koordinat
  açtı: **35** (doğrulayıcıların eğitimi ve modelin kendi cevabını kontrol etmesi — 33 ve 34'ten),
  **36** (birden çok yol deneyip aralarında oy verme — 33'ten) ve **38** (adımların tek tek
  ödüllendirilmesi — 34'ten). Ayrıca 31, defterde zaten kayıtlı olan **72** koordinatına dördüncü
  kaynak makale olarak eklendi. Sıradaki run'ın doğrudan ödeyeceği vaat: **35**.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR (terim hijyeni,
  alt metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için hâlâ uygulanmadı.
  Tam listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan künyeler:** (1) Gerstgrasser ve ark. (2024) için COLM 2024 venue'sü iki bağımsız
  ikincil kaynakla doğrulandı, birincil venue sayfası teyidi alınamadı (bağlayıcı karar #21).
  (2) Batch 7'de, Brown ve ark.'nın "Large Language Monkeys" çalışmasının ICLR 2025'te yayımlandığı
  yönündeki ikincil kaynak iddiası doğrulanamadı — DBLP yalnızca CoRR sürümünü indeksliyor ve
  OpenReview doğrulama duvarı çıkarıyor. Çalışma **kullanılmadı**; aynı olgu, hakemli olan
  Schaeffer ve ark. (ICML 2025) üzerinden verildi (bağlayıcı karar #97). Batch 7'nin kullandığı
  on dört çalışmanın tamamı hakemlidir.

## Next batch preparation — 35'ten devam

**Pedagojik hedefler.** Batch 7 sonunda okuyucu, Faz 4'ün ilk yarısını tamamladı: akıl yürütme
kavramının nasıl ölçüldüğünü ve nerede kırıldığını (31), ara adımların neden işe yaradığını iki
bağımsız mekanizmayla (32), düşünme süresini çıkarım anında satın almanın ekonomisini (33) ve
dağılımın kendisini doğrulanabilir ödülle değiştirmeyi (34) biliyor.

Yayın hattında art arda üç yerde aynı bileşen belirdi ve hep ertelendi: 33'te adayları puanlayan
şey, 34'te ödülü veren kural, 34'ün kapanışında "üretmek ile doğrulamak arasındaki asimetri".
Faz 4'ün ikinci yarısı bu bileşenle açılıyor. 35'in sorusu şu: bir cevabın doğru olup olmadığını,
cevabın kendisini üretmekten daha ucuza söyleyebilir miyiz — ve modelin kendi cevabını kontrol
etmesi bu işi ne kadar görüyor?

**Sıradaki makaleler ve prerequisite'ler.** YOL-HARITASI "Batch 8 taslağı (35'ten devam)" satırları
geçerlidir (35 ← 33, 34, 30, 28, 17, 13 · 36 ← 33, 10, 32, 30, 35 · 37 ← 13, 34, 6, 2 ·
38 ← 34, 35, 32, 13). Kaç makale üretileceği bu run'ın `BATCH` assignment'ıyla belirlenir.

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Kapsama ve seçim sorunu (33) → 35'in açılış gerilimi: doğru cevap adaylar arasında ama hangisi?
- Kural tabanlı ödül ↔ öğrenilmiş ödül modeli (34, 13) → 35'te doğrulayıcı türleri.
- Sonuç ödülü gerekçeyi denetlemez (34) ve sadakat (31) → 38'in çekirdek gerekçesi.
- Sözdizimsel geçerlilik ≠ anlamsal geçerlilik (30) → 35'te "ayrıştırılabilir ama yanlış".
- Spekülatif üretim ve doğrulama asimetrisi (28) → 35'te üret-doğrula düzeninin maliyeti.
- Üretim bir çekiliştir; sıcaklık (10) → 36'da self-consistency'nin kaynağı.
- Yerel maske ↔ küresel olasılık ayrışması (30) → 36'da arama ağaçlarının gerekçesi.
- Aşırı optimizasyon ve Goodhart (13) → 35'te doğrulayıcının kandırılması.
- Politika, referans model, KL (13) ve GRPO'nun avantaj tanımı (34) → 37'nin biçimsel zemini.
- Dikkat üçlüsündeki "değer" (6) → 37'de RL "değer"inden açıkça ayrılmalı (terim defteri uyarısı).

**Araştırılacak güncel akademik alanlar (35 için öncelikli):** sonuç tabanlı doğrulayıcıların
eğitimi ve en iyi-N ile ölçülen kazancı; doğrulayıcı üzerinde aşırı optimizasyon (ödül modeli
ölçek yasalarının doğrulayıcıdaki karşılığı); modelin kendi cevabını dış geri bildirim olmadan
düzeltmesinin ölçülen etkisi — bu alanda hakemli **olumsuz** sonuçlar var ve makale onlarsız
kurulamaz; üretmek ↔ doğrulamak asimetrisinin gerçekten geçerli olduğu ve olmadığı görev
sınıfları. 36 için: self-consistency'nin kurucu ölçümü ve örnek sayısıyla doygunluğu, ağaç
aramalı düzenlerin maliyet-doğruluk dengesi. 37 için: MDP, politika, değer ve ödülün standart
ders kitabı kurulumu; PPO ile GRPO'nun ilişkisi. 38 için: süreç ödülü ile sonuç ödülünün
karşılaştırıldığı hakemli ölçümler ve adım etiketlerinin maliyeti. Sayısal iddialar ve URL
doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 35: üretmek ile doğrulamak arasındaki maliyet asimetrisi; doğrulayıcının yanıldığı iki hata türü.
- 36: aynı sorudan çıkan farklı zincirlerin aynı cevapta buluşması (33'ün paralel ekseniyle görsel süreklilik).
- 37: durum–eylem–ödül döngüsü; 13\. makaledeki ödül modeli şemasıyla karşılaştırmalı.
- 38: sonuç ödülü ile süreç ödülünün aynı zincir üzerinde yan yana gösterimi.

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 8` ve `readingOrder` 35'ten
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
güncellenmelidir (Batch 7'de dört başlığın dördü için de bu yapıldı). **Entegrasyondan sonra makale
gövdesine her dokunuşta `sync-series-hashes.cjs --write` yeniden çalıştırılmalıdır**; aksi hâlde
sayfa 500 verir. Araçların üçü de varsayılan olarak **yalnızca AI serisini** işler (`--series=boun`
ayrı seri içindir) — repoda ikinci bir seri bulunduğu için bu ayrım önemlidir. SVG'ler makale
gövdesinin hash'ine girmez; şekil düzeltmesi sonrası hash senkronu gerekmez, ama makale **alt metni**
değiştiyse gerekir.

**Dev server ve build yalıtımı (Batch 7'de kritikleşti).** Depoda paralel bir oturum çalışıyor
olabilir; Batch 7 sırasında 3100 portunda başka bir oturumun dev sunucusu vardı. İki Next süreci
aynı `.next` dizinini paylaşır ve build, çalışan dev sunucusunu bozar. Bu durumda çalışan yol:
depoyu **aynı sürücüde** bir kopyaya çıkar (`tar` ile `node_modules`, `.next`, `.git`, `artifacts`
hariç), kopyanın `node_modules` dizini için depodakine `cmd /c mklink /J` ile junction kur,
build ve dev sunucusunu orada çalıştır. Temizlerken **önce** junction'ı `cmd /c rmdir` ile kaldır;
`rm -rf` junction'ı takip edip gerçek `node_modules`'ü silebilir. Paralel oturum yoksa klasik sıra
geçerlidir: dev server'ı durdur → `rm -rf .next` → `pnpm build` → `rm -rf .next` → dev server'ı
başlat. İkinci tuzak da duruyor: makale gövdesi ya da katalog değiştikten sonra dev server'ın
önbelleğe aldığı `catalog.json` bayatlıyor ve sayfa "Katalog ile frontmatter uyuşmuyor" hatasıyla
500 veriyor; çaresi dev server'ı yeniden başlatmaktır. Yerelde `SITE_PASSWORD_SHA256` tanımlı
olmadığı için parola kapısı dev modda devre dışıdır.

**Render doğrulama seti (Batch 7'de otomatikleşti).** `artifacts/b7-render/shot-batch7.mjs` tek
komutta şunları ölçüyor: üç genişlik (375/768/1440) × üç tema (`light`/`dark`/`sepia`) için
`body` arka plan/metin renkleri, `figure svg` içindeki bütün `text` düğümlerinin hesaplanmış
`fill` değerlerinin `rgb(...)` olarak çözülmesi, `getBBox` ile metinlerin viewBox içinde kalması,
`documentElement.scrollWidth > clientWidth` ile yatay taşma, figure/svg sayısı, figcaption
metinleri, gövde metni uzunluğu, `undefined`/`NaN` sızıntısı ve sayfa içinden `fetch` ile rota
sweep'i. `artifacts/b7-render/figs-b7.mjs` ise her şekli tek tek light/dark olarak kırpıyor —
piksel doğrulaması için en pratik yol bu, çünkü tam sayfa ekran görüntüsü yalnızca sayfa
başındayken güvenilir. Sonraki batch için yalnızca iki dosyanın başındaki slug listesi ve
`RENDER_BASE` değişir. Playwright betikleri depo `node_modules`'ünü gören bir dizinden çalışmalı.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur
  (Batch 7'de yeniden doğrulandı).
- Mobil genişlikte diyagramlar kendi kaplarında yatay kayar (SVG 720 birim, kap ~335 birim);
  sayfa gövdesi taşmaz. Bu, yayımlanmış makalelerde de aynı olan yerleşik davranıştır, regresyon
  değildir.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` durumunu yakalar; alt kenara çok yakın
  bir metin tabanı (pay < ~8 birim) denetimden geçer ama harflerin alt uçları kırpılır. Batch 7'de
  yeni şekillerin tamamında alt pay ≥ 18 birime çıkarıldı; yayımlanmış eski şekillerin bir kısmında
  bu pay hâlâ küçüktür (ertelenen MINOR bulgular arasında). Denetleyici ayrıca **metinlerin
  birbirine binmesini** hiç görmez: Batch 7'de bir eksen adı ilk tik etiketinin üstüne bindi ve
  bunu yalnızca piksel ekran görüntüsü yakaladı.
- Batch 6'nın okuma listesinde `reasoning-and-memory` kategorisi iki ayrı öbek hâlinde görünür
  (27–28, sonra `agents-and-retrieval` 29, sonra yine `reasoning-and-memory` 30). Bu kasıtlıdır
  (bağlayıcı karar #65) ve UI bunu destekler; `reading-list-groups.test.ts` tam olarak bu durumu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) bulunuyor ve ayrı bir üretim hattıyla
  ilerliyor; AI serisinin araçları bu dizine dokunmaz. Batch 7 sırasında o hattın da commit
  edilmemiş değişiklikleri vardı ve bunlara dokunulmadı.

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
- **Batch 7 (2026-08-30):** Makale 31–34, dördü de `reasoning-and-memory` (bağlayıcı karar #85);
  Faz 4'ün ilk yarısı. `BATCH=4+1` ile, tek oturumda, yardımcı agent kullanmadan yürüdü. On dört
  birincil kaynak PDF'i `pypdf` ile metne çevrilerek okundu; kullanılan on dört çalışmanın tamamı
  hakemlidir (ICLR, NeurIPS, ACL, ICML, PNAS Nexus, Nature) ve Batch 7 hakemsiz kaynak listesine
  ekleme yapmadı (karar #97). Yayımlanmamış dört başlığın dördü de terim defterine uyarlandı
  (bağlayıcı karar #86). Venue doğrulaması DBLP API'siyle yapıldı ve bir çalışmanın hakemli
  olduğu iddiası doğrulanamadığı için o çalışma kullanılmadı. Build ve render doğrulaması, depoda
  paralel bir oturumun dev sunucusu çalıştığı için izole bir kopyada yürütüldü. Doğrulama
  kapılarının tamamı geçti: 277 test, `pnpm typecheck`, `pnpm build` (80 sayfa), 34 seri rotasının
  ve `/seri` girişinin tamamı 200, üç genişlik × üç temada DOM ölçümüyle render doğrulaması,
  12 yeni diyagramın tamamı viewBox içinde ve bütün `fill` değerleri üç temada da çözülüyor,
  sayfa gövdesinde yatay taşma yok, on iki şeklin tamamı light/dark piksel görüntüsüyle gözle
  doğrulandı ve iki şekil bu doğrulama sayesinde düzeltildi.
- Batch 0/1'in ham üretim kayıtları (araştırma paketleri, 18 inceleme raporu, workflow
  script'leri, `entegre.cjs`'in orijinali) `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv**
  olarak durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
