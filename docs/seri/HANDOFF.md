# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-01 · Durum: **1–38 yayında (kohort Batch 0 → Batch 8) · Sıradaki: 39**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 38 — `surec-denetimi-adim-adim-odullendirme` |
| Sıradaki güvenli başlangıç | Makale 39 ("Bellek: Sohbet İçinde ve Sohbetler Arasında"); run kapsamı SOZLESME §7'ye göre çözülür |
| Sıradaki kohort | `classification_batch: 9` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30 ve 31–38 `reasoning-and-memory`; 29 `agents-and-retrieval` (bağlayıcı kararlar #50, #65, #85 ve #98). Faz 4 tek kategoriyle kapandı; 39–40 için `reasoning-and-memory` öngörülüyor, kesin karar o run'da verilir |

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları İngilizce
  alan terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning
  ve Test-Time Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları ise terim
  defterine göre Türkçeleştiriliyor (kararlar #51, #52, #66, #86, #99). Batch 8 bu katmana yine
  bilinçli olarak dokunmadı ve tuhaflık büyüdü: Faz 4'ün adı "Reasoning ve Test-Time Compute"
  derken altındaki **sekiz** yayımlanmış başlığın hiçbirinde o sözcükler yok. Katmanın tümden
  Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler.** 39 ve 40'ın başlıkları zaten Türkçedir,
  yani sıradaki run'ın başlık işi yok. Borç 41'den itibaren duruyor: "RAG" (41, 44, 45, 46),
  "Retrieval" (42), "Function Calling" (47), "MCP" (49). Kararların gerekçesi bunlar için de
  geçerli; karşılıklar o başlıkları içeren run'da kararlaştırılıp **roadmap.json entegrasyondan
  önce** güncellenmelidir. Not: "MCP" gibi kısaltmalar ile "RAG" için Türkçeleştirme zorunlu
  değildir (15\. makalenin "Tokenizer" emsali); buna karşılık Batch 8, karşılığı yerleşik olan
  bir kısaltmanın açılabileceğini gösterdi (MDP → Markov karar süreci, karar #99).
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 8'de 35, 36 ve 38 koordinatları ödendi ve **yeni açık koordinat açılmadı**;
  35'in verdiği tek numaralı vaat (38) aynı run içinde kapandı. Sıradaki run'ın doğrudan ödeyeceği
  vaat: **39** (21\. makaleden gelen "sohbetler arası kalıcı bellek"). Ondan sonraki en yakın açık
  koordinat 41'dir.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR (terim hijyeni,
  alt metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için hâlâ uygulanmadı.
  Tam listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan künyeler:** (1) Gerstgrasser ve ark. (2024) için COLM 2024 venue'sü iki bağımsız
  ikincil kaynakla doğrulandı, birincil venue sayfası teyidi alınamadı (karar #21). (2) Batch 7'de
  Brown ve ark.'nın "Large Language Monkeys" çalışmasının ICLR 2025'te yayımlandığı iddiası
  doğrulanamadı; çalışma kullanılmadı (karar #97). (3) Batch 8'de iki aday kaynak aynı sebeple
  **kullanılmadı**: Chen ve ark.'nın bileşik çıkarım sistemleri çalışması ile Swamy ve ark.'nın
  üretme-doğrulama açığı çalışması DBLP'de yalnızca CoRR sürümüyle indeksleniyor. (4) Bellman'ın
  1957 tarihli çalışmasının sayı numarası kaynaklar arasında farklı veriliyor; seri cilt ve sayfa
  verip sayı numarası yazmıyor (karar #104).
- **Hakemsiz kaynak listesi Batch 8'de genişledi.** Cobbe ve ark. 2021, Uesato ve ark. 2022 ve
  PPO (2017) karar #6'daki listeye eklendi; üçü de metinde açıkça işaretlendi (karar #106).
  Batch 6 ve 7'nin "hiç hakemsiz kaynak eklemedi" serisi burada bilinçli olarak kırıldı; gerekçe
  karar #106'da.

## Next batch preparation — 39'dan devam

**Pedagojik hedefler.** Batch 8'in sonunda okuyucu, tek bir cevabı iyileştirmenin bütün yollarını
gördü: doğrulayıcıyla seçmek (35), adayların birbirine bakması ve ağaç kurmak (36), bütün bu
sözlüğün biçimsel zemini (37) ve ödülün adımlara dağıtılması (38). Dördünün ortak varsayımı şu:
soru soruldu, cevap üretildi, iş bitti.

Faz 4'ün son iki makalesi bu varsayımı kaldırıyor. 21\. makaledeki **durumsuzluk** — çağrı bitince
geriye hiçbir şey kalmaması — 39'un açılış gerilimidir ve defterde 21'den beri açık duran bir
koordinattır. 40 ise aynı sorunu zaman eksenine yayıyor: çok adımlı, uzun süren bir görevde
tutarlılık nasıl korunur?

**Sıradaki makaleler ve prerequisite'ler.** YOL-HARITASI "Batch 9 taslağı (39'dan devam)" satırları
geçerlidir (39 ← 21, 25, 24, 26, 18, 29 · 40 ← 39, 36, 33, 31, 28). Kaç makale üretileceği bu
run'ın `BATCH` assignment'ıyla belirlenir. Faz 4 iki makale sonra kapanıyor; `N` ikiden büyükse
run Faz 5'e (41'den itibaren getirme hattı) taşar ve o durumda **başlık Türkçeleştirme borcu
entegrasyondan önce** ele alınmalıdır.

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Durumsuzluk (21) → 39'un açılış gerilimi; Batch 8'de 38'in kapanışında zaten işaret edildi.
- Etkin bağlam uzunluğu ve dikkat çukuru (21, 25) → 39'da "pencereye sığdırmak" sınırının kaynağı.
- Anahtar-değer önbelleği tek çalışma boyunca yaşar (21, 26) → 39'da önbellek ile bellek ayrımı.
- Sistem isteminin sabit öneki ve önek paylaşımı (24, 26, 28) → 39'da özet taşımanın maliyeti.
- Ağırlıktaki bilgi ↔ bağlamdaki bilgi (18, 23) → 39'da kalıcı belleğin nereye yazıldığı.
- Getirme ve ikili kodlayıcı (29) → 39'da bellek bir getirme problemi olarak.
- Çok turlu kararsızlık (24, karar #59) → 40'ın çekirdek kanıtı.
- Kredi atama ve iskonto (37) → 40'ta uzun ufkun biçimsel adı.
- Öz-düzeltmenin sınırı (35) ve arama (36) → 40'ta uzun görevlerde hata birikmesi.
- Kapsama (33) → 40'ta adım sayısı arttıkça başarı olasılığının çarpımsal düşüşü.

**Araştırılacak güncel akademik alanlar (39 için öncelikli):** sohbet içi özetleme ve bellek
mimarilerinin ölçülen etkisi; kalıcı bellek sistemlerinin hakemli değerlendirmeleri; bellek ile
getirme arasındaki sınırın nerede çizildiği; uzun sohbetlerde bağlamın bayatlaması ve çelişen
bilginin çözülmesi. 40 için: uzun ufuklu görevlerde adım başına hata oranının bileşik etkisi,
ajan değerlendirme kümelerinin uzun görev sonuçları, ve tutarlılığın zaman içinde ölçülmesi.
Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları
SOZLESME §9'dadır. Venue doğrulaması için DBLP API'si (`https://dblp.org/search/publ/api`)
çalışıyor ama hız sınırı sert: sorgular arasında en az 8–10 saniye bırak, yoksa 429 döner.

**Görselleştirme ihtiyaçları (öngörü):**
- 39: bir sohbetin turları boyunca pencereye giren/çıkan içerik; özet ile ham geçmişin yan yana maliyeti.
- 39: belleğin nereye yazıldığı — pencere, önbellek, dış depo — üç katmanlı karşılaştırma.
- 40: adım sayısı arttıkça başarı olasılığının çarpımsal düşüşü (33'ün kapsama eğrisiyle görsel süreklilik).
- 40: uzun görevde hata birikmesi ve düzeltme noktaları.

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 9` ve `readingOrder` 39'dan
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
güncellenmelidir (Batch 8'de 36 ve 37 için bu yapıldı). **Entegrasyondan sonra makale gövdesine
her dokunuşta `sync-series-hashes.cjs --write` yeniden çalıştırılmalıdır**; aksi hâlde sayfa 500
verir (Batch 8'de 36'ya terim tanımı eklenince bu yeniden yapıldı). Araçların üçü de varsayılan
olarak **yalnızca AI serisini** işler (`--series=boun` ayrı seri içindir) — repoda ikinci bir seri
bulunduğu için bu ayrım önemlidir. SVG'ler makale gövdesinin hash'ine girmez; şekil düzeltmesi
sonrası hash senkronu gerekmez, ama makale **alt metni** değiştiyse gerekir.

**Dev server ve build yalıtımı.** Depoda paralel bir oturum çalışıyor olabilir. İki Next süreci
aynı `.next` dizinini paylaşır ve build, çalışan dev sunucusunu bozar. Batch 8'de dev sunucusu
çalışmıyordu ve klasik sıra sorunsuz işledi: dev server'ı durdur → `rm -rf .next` → `pnpm build`
→ `rm -rf .next` → dev server'ı başlat → doğrula → durdur. Paralel bir dev sunucusu **varsa**
Batch 7'nin yolu geçerlidir: depoyu aynı sürücüde bir kopyaya çıkar (`tar` ile `node_modules`,
`.next`, `.git`, `artifacts` hariç), kopyanın `node_modules` dizini için depodakine
`cmd /c mklink /J` ile junction kur, build ve dev sunucusunu orada çalıştır; temizlerken **önce**
junction'ı `cmd /c rmdir` ile kaldır (`rm -rf` junction'ı takip edip gerçek `node_modules`'ü
silebilir). İkinci tuzak duruyor: makale gövdesi ya da katalog değiştikten sonra dev server'ın
önbelleğe aldığı `catalog.json` bayatlıyor ve sayfa "Katalog ile frontmatter uyuşmuyor" hatasıyla
500 veriyor; çaresi dev server'ı yeniden başlatmaktır. Dev sunucusunu durdururken `pkill -f
"next dev"` Windows'ta işe yaramıyor; `netstat -ano` ile PID bulup `taskkill //PID <pid> //T //F`
kullan. Yerelde `SITE_PASSWORD_SHA256` tanımlı olmadığı için parola kapısı dev modda devre dışıdır.

**Render doğrulama seti.** `artifacts/b8-render/shot-batch8.mjs` tek komutta şunları ölçüyor: üç
genişlik (375/768/1440) × üç tema (`light`/`dark`/`sepia`) için `body` arka plan/metin renkleri,
`figure svg` içindeki bütün `text` düğümlerinin hesaplanmış `fill` değerlerinin `rgb(...)` olarak
çözülmesi, `getBBox` ile metinlerin viewBox içinde kalması, `documentElement.scrollWidth >
clientWidth` ile yatay taşma, figure/svg sayısı, figcaption metinleri, gövde metni uzunluğu,
`undefined`/`NaN` sızıntısı ve sayfa içinden `fetch` ile rota sweep'i. Batch 8'de bir değişiklik
yapıldı: beklenen şekil sayısı artık makale başına veriliyor (`SLUGS` üçlüsünün son elemanı),
çünkü bir batch içinde iki ve üç şekilli makaleler bir arada olabiliyor.
`artifacts/b8-render/figs-b8.mjs` ise her şekli tek tek light/dark olarak kırpıyor — piksel
doğrulaması için en pratik yol bu. Sonraki batch için yalnızca iki dosyanın başındaki slug listesi
ve `RENDER_BASE` değişir. Playwright betikleri depo `node_modules`'ünü gören bir dizinden çalışmalı.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (Batch 8'de yeniden doğrulandı: lint
  8.455 hata, format 95 dosya). `artifacts/**` altındaki render betikleri de lint kapsamındadır ve
  her batch'in betikleri aynı iki hatayı üretir; bu, b7-render'dan beri süregelen bilinen durumdur.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur
  (Batch 8'de yeniden doğrulandı).
- Mobil genişlikte diyagramlar kendi kaplarında yatay kayar (SVG 720 birim, kap ~335 birim);
  sayfa gövdesi taşmaz. Bu, yayımlanmış makalelerde de aynı olan yerleşik davranıştır, regresyon
  değildir.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` durumunu yakalar; alt kenara çok yakın
  bir metin tabanı (pay < ~8 birim) denetimden geçer ama harflerin alt uçları kırpılır. Batch 7 ve
  8'in yeni şekillerinde alt pay ≥ 18 birime çıkarıldı; yayımlanmış eski şekillerin bir kısmında
  bu pay hâlâ küçüktür (ertelenen MINOR bulgular arasında). Denetleyici ayrıca **metinlerin
  birbirine binmesini** hiç görmez; bunu yalnızca piksel ekran görüntüsü yakalar.
- Batch 6'nın okuma listesinde `reasoning-and-memory` kategorisi iki ayrı öbek hâlinde görünür
  (27–28, sonra `agents-and-retrieval` 29, sonra yine `reasoning-and-memory` 30). Bu kasıtlıdır
  (karar #65) ve UI bunu destekler; `reading-list-groups.test.ts` tam olarak bu durumu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) bulunuyor ve ayrı bir üretim hattıyla
  ilerliyor; AI serisinin araçları bu dizine dokunmaz. Batch 8 sırasında o hattın commit edilmemiş
  değişiklikleri vardı (`content/series-boun/**`, `docs/seri-boun/**`, `.wolf/**`) ve bunlara
  dokunulmadı; build bu dosyaları da derlediği için sayfa sayısı iki serinin toplamıdır.

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
  kapattı; son iki makale `reasoning-and-memory` altında Faz 3'ü açtı (karar #50). `BATCH=4+1`
  ile, tek oturumda, yardımcı agent kullanmadan yürüdü. Üç birincil kaynak PDF'i `pypdf` ile metne
  çevrilerek okundu; 21\. makaledeki token sayıları `tiktoken` ile yerelde üretildi. Doğrulama
  kapılarının tamamı geçti: 223 test, `pnpm build` (59 sayfa), 55 rotanın tamamı 200.
- **Batch 5 (2026-08-30):** Makale 23–26, `reasoning-and-memory`; Faz 3'ün pencere/istem/bellek
  yayı tamamlandı. `BATCH=4+1` ile, tek oturumda, yardımcı agent kullanmadan yürüdü. Yedi birincil
  kaynak PDF'i okundu ve tablolardaki sayılar özetlerden değil tablolardan alındı. Doğrulama
  kapılarının tamamı geçti: 241 test, `pnpm build` (66 sayfa), 26 seri rotası ve `/seri` 200.
- **Batch 6 (2026-08-30):** Makale 27–30; Faz 3 kapandı. 27, 28 ve 30 `reasoning-and-memory`,
  29 `agents-and-retrieval` (karar #65). `BATCH=4+1` ile, tek oturumda, yardımcı agent kullanmadan
  yürüdü. On dokuz birincil kaynak PDF'i okundu; kullanılan kaynakların tamamı hakemlidir
  (karar #84). Doğrulama kapılarının tamamı geçti: 259 test, `pnpm build` (73 sayfa), 30 seri
  rotası ve `/seri` 200, üç temada DOM ölçümü, on iki şeklin tamamı piksel görüntüsüyle doğrulandı.
- **Batch 7 (2026-08-30):** Makale 31–34, dördü de `reasoning-and-memory` (karar #85); Faz 4'ün
  ilk yarısı. `BATCH=4+1` ile, tek oturumda, yardımcı agent kullanmadan yürüdü. On dört birincil
  kaynak PDF'i okundu; kullanılan on dört çalışmanın tamamı hakemlidir (karar #97). Venue
  doğrulaması DBLP API'siyle yapıldı ve bir çalışmanın hakemli olduğu iddiası doğrulanamadığı için
  o çalışma kullanılmadı. Build ve render doğrulaması, depoda paralel bir oturumun dev sunucusu
  çalıştığı için izole bir kopyada yürütüldü. Doğrulama kapılarının tamamı geçti: 277 test,
  `pnpm build` (80 sayfa), 34 seri rotası ve `/seri` 200, üç genişlik × üç temada DOM ölçümü,
  on iki şeklin tamamı piksel görüntüsüyle doğrulandı ve iki şekil bu sayede düzeltildi.
- **Batch 8 (2026-09-01):** Makale 35–38, dördü de `reasoning-and-memory` (karar #98); Faz 4'ün
  ikinci yarısının açılışı ve akıl yürütme yayının doğrulama–arama–biçimselleştirme–süreç denetimi
  dörtlüsü. `BATCH=4+1` ile, tek oturumda, yardımcı agent kullanmadan yürüdü. Yirmi bir birincil
  kaynak PDF'i `pypdf` ile metne çevrilerek okundu; venue doğrulaması DBLP API'siyle yapıldı ve
  yalnızca CoRR'de indekslenen iki aday kaynak kullanılmadı. Üç hakemsiz kaynak bilinçli olarak
  kullanıldı ve işaretlendi (karar #106); geri kalan on dört kaynak hakemlidir. Yayımlanmamış iki
  başlık terim defterine uyarlandı (karar #99) ve Batch 7'den kalan `[yayında]` işaretleri
  tamamlandı. Doğrulama kapılarının tamamı geçti: 294 test, `pnpm typecheck`, `pnpm build`
  (87 sayfa), 39 rotanın tamamı 200, üç genişlik × üç temada DOM ölçümüyle render doğrulaması,
  11 yeni diyagramın tamamı viewBox içinde ve bütün `fill` değerleri üç temada da çözülüyor,
  sayfa gövdesinde yatay taşma yok, on bir şeklin tamamı light/dark piksel görüntüsüyle gözle
  doğrulandı.
  Not (2026-09-01, geçici durum): Batch 8'in kapıları geçtikten sonra, paralel oturumun kimlik
  doğrulama katmanındaki yarım kalmış refactor'ı (`verifyPasswordHash` → `verifyLegacyPasswordHash`,
  `READER_DATA_STORAGE_KEY`'in kaldırılması) depo genelinde `pnpm build` ve `pnpm test`'i geçici
  olarak kırdı. Bu kırılma AI serisinin dosyalarıyla ilgisizdir: seriye ait 211 test (katalog,
  şema, seri, roadmap, varlıklar, okuma listesi) ve bütün seri denetleyicileri son içerikle
  temizdir ve `/seri` rotaları dev sunucusunda üç temada doğrulanmıştır. Sonraki oturum aynı
  hatayı görürse önce `src/lib/auth/**` ve `src/lib/reader/version.ts` durumuna baksın.
- Batch 0/1'in ham üretim kayıtları (araştırma paketleri, 18 inceleme raporu, workflow
  script'leri, `entegre.cjs`'in orijinali) `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv**
  olarak durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
