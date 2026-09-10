# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-10 · Durum: **1–98 yayında (kohort Batch 0 → Batch 23) · Faz 10 kapandı, Faz 11 açıldı · Sıradaki: 99 (Faz 11'in kapanışı 99–102)**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 98 — `bir-calismayi-okumak-iddia-kanit-ve-hakemlik` |
| Sıradaki güvenli başlangıç | Makale 99 ("Araştırma Sorusu ve Deney Tasarımı: Hipotez, Baseline, Ablation"); run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 99, 100, 101 ve 102 üretilir; bu dörtlü **Faz 11'i kapatır** ve yeni faz açmaz — dolayısıyla **kategori sorusu YOKTUR** (99–102 `foundations` kalır, karar #209). **Bu dörtlüde bağlayıcı numaralı koordinat VARDIR: 101** — defterde açık kalan **tek** koordinattır (16 ve 22'nin "ölçümün disiplini: anlamlı fark, örneklem büyüklüğü, güven aralığı" vaadi) ve bu bandın içine düşer; **ödenmek zorundadır**. Ayrıca 93'ün "bir sonraki faz" işareti (yanlılık ↔ oynaklık ayrımı) ve 33/40'ın pass@k + görev ufku planlı tekrarı da 101'e yönlendirilmiş durumda — üçü birlikte 101'in gövdesinde karşılanmalı. Devralınan numarasız işaret: 98 → 99 ("bir sonraki makale": deneyin tasarlandığı taraf) |
| Sıradaki kohort | `classification_batch: 24` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs`. **Batch 23'ün ek ölçerleri oturum scratchpad'indeydi ve kalıcı değil** (bilerek; bkz. Açık borçlar). Yeniden yazılması gerekenler ve ne yaptıkları: `wc` (repo kapısının `countProseWords`'ünün birebir kopyası — **`node -e` ile taklit edilmez, dosya olmalı**), `svgcheck` (aynı satırdaki metin çiftleri, kutu içi taşma, sağ/sol kenar, alt pay ≥ 12, kapanmamış `var(`, sabit hex, XML ayrıştırma), `scan` (yasaklı biçim + kendi numarası + ileri gönderme + kaçış + bölüm/kutu/şekil sayımı), `links` (her `[Bağlantı]` adresini çekip `<title>` yazar), `sweep` (rota taraması — **dilimli**, `resp.geturl()` karşılaştırmalı), `shots` (Playwright ile şekil PNG'leri), `fetch`/`pdftxt`/`q` (kaynak indirme, PDF → metin, korpus içi arama), `orsearch` (OpenReview API ile kimlik doğrulama, sorgular arası 7 sn) |
| Level bandı | 1–10 `beginner`; 11–90 `intermediate`; **91'den itibaren `advanced`** (bağlayıcı kararlar #19 ve **#201**) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–80 `safety-and-evaluation`; 81–90 `multimodal-and-future`; **91–98 yine `foundations`** (kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142, #148, #160, #168, #176, #192, #200, **#209**). Okuma listesinde `foundations` **iki öbek** (1–5 ve 91–98) ve kohort ayrımı sayesinde Batch 22 ile Batch 23 ayrı gruplar hâlinde görünüyor; `reading-list-groups.test.ts` bunu zaten sınıyordu ve değiştirilmedi. **Sıradaki run'da kategori sorusu YOKTUR:** 99–102 Faz 11'in devamı olarak `foundations` kalır. Kontrollü sözlükte kullanılmamış tek kalem hâlâ `case-studies` ve doğal yeri 114–115 |

## Açık borçlar

- **Araştırma çalışma dizinleri kalıcı değil — bu bilinçli.** Batch 22'de paralel bir oturum `artifacts/`
  altını sildiği için (karar #208g), Batch 23 `artifacts/` altına **hiçbir şey yazmadı**; bütün kaynak
  metinleri, PDF'ler ve ölçer betikleri oturum scratchpad'inde kaldı ve oturumla birlikte gidiyor. Sonraki
  run kendi betiklerini yeniden yazmak ve gerekli kaynakları yeniden indirmek zorunda. Betiklerin ne yaptığı
  yukarıdaki "Araçlar" satırında, indirme kanalları aşağıdaki "Venue doğrulaması" bölümündedir. Kaybolan
  b10–b22 dizinleri de geri gelmedi; **yayımlanmış makaleler, katalog, roadmap ve YOL-HARITASI etkilenmedi.**
- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları hâlâ İngilizce alan
  terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning ve Test-Time
  Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim defterine göre Türkçeleştiriliyor
  (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135, #148, #154, #155, #162, #163, #169, #170, #171,
  #177, #178, #184, #185, #202, **#210**). Katmanın tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı
  kararıdır. Faz 8, 9, 10 ve 11'in başlıkları zaten Türkçe.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler — sıradaki dörtlüde bir aday VAR.** 99'un başlığı
  ("Araştırma Sorusu ve Deney Tasarımı: **Hipotez, Baseline, Ablation**") iki İngilizce sözcük taşıyor ve
  ikisinin de Türkçe karşılığı **artık kurulmuş durumda**: "ablasyon" 98'de terim defterine girdi, "taban
  çizgisi" 16'dan beri seri boyunca kullanılıyor. #99'un ölçütüne göre başlık Türkçeleştirilmeli görünüyor;
  öneri: **"Araştırma Sorusu ve Deney Tasarımı: Hipotez, Taban Çizgisi, Ablasyon"**. Karar 99'un kendi
  run'ında verilir. 102'nin başlığındaki "Reproducibility" de aynı sınıfta ve karşılığı ("tekrarlanabilirlik")
  başlığın kendisinde zaten var — yani sözcük **gereksiz** görünüyor; o da 102'nin run'ında ele alınmalı.
  100 ("Yüzüncü Adım: Sezgiden Bilime — Haritanın Sentezi") ve 101 ("Ölçümün Disiplini: İstatistiksel Test ve
  Benchmark Bilimi") sorunsuz ("benchmark" #108'in Türkçeleştirilmeyen sınıfında). **Bandın dışında bekleyen
  aday hâlâ 108** ("Performans Mühendisliği: Attention'ı Hızlandırmak"). Başlık değişikliği entegrasyondan
  **önce** `roadmap.json`'a yazılır.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış vaatler"dedir.
  Batch 23 **yeni koordinat açmadı ve kapatmadı**. **Defterde açık kalan TEK koordinat: 101** ve sıradaki
  banda düşüyor. Numarasız işaretler: 51 → 111, 49/53 → 115, 93 → "bir sonraki faz" (101).
  Devrolan planlı tekrar: 33/40'ın pass@k ile görev ufku **tahsil edilmedi ve 101'e devrediyor**.
- **Prerequisite grafında 79–82 boşluğu.** YOL-HARITASI'ndaki graf satırları 78'de kesilip 83'ten devam
  ediyor; Batch 19 kendi dörtlüsünün satırlarını eklememişti. Batch 20–23 kendi satırlarını ekledi.
  Devrolan eksik; ileride toplu kapatılabilir, hiçbir kapı buna bağlı değil.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR hâlâ uygulanmadı; tam listeler
  repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(15) önceki batch'lerden (kararlar #21, #97, #104, #106,
  #114, #120, #127, #134, #141, #147, #152, #159, #167, #175, #183). **Batch 20, 21, 22 ve 23'te doğrulanamayan
  künye yok** (kararlar #191, #198, #207, **#216**).
- **Hakemsiz kaynak oranı Batch 23'te 54 kalemin 3'ü (karar #215).** Yani 48 hakemli + 1 ders kitabı +
  1 çalıştay bildirisi + 1 editoryal dergi + 3 hakemsiz. Batch 22: 44/50, Batch 21: 40/48, Batch 20: 58/68.
  Kural değişmedi. **Faz 11'in kaynak profili farklı olacak:** 99–102 bilim metodolojisi konuları olduğu için
  alan dışı (istatistik, psikoloji, tıp metodolojisi) hakemli kaynak payı yükselecek; 98'de Ioannidis,
  Simmons ve Tomkins bu kanalın ilk örnekleriydi.
- **DBLP kapalı (Batch 18'den beri), Semantic Scholar 429.** Venue doğrulaması konferans dizin sayfaları +
  OpenReview API + Crossref ile yapılır (aşağıda).

## Next batch preparation — 99'dan devam (Faz 11'in kapanışı 99–102)

**Pedagojik hedefler.** Batch 23'ün sonunda okuyucu şunu biliyor: gradyan bir yöndür ve tersinin en dik iniş
olması 91'in nokta çarpımından kanıtlanır ((2; 20) gradyanında en büyük değişim 20,0998, köşegen yönde
15,5563); adımın tavanı eğrilikten gelir ve 2\. makalenin deneyle bulduğu 3/14 eşiği tam olarak 2/λ'dır;
ilerleme hızını koşul sayısı belirler (κ = 20'de 47 adım ↔ momentumla 11) ve modern eniyileyiciler bu
faturaların ayrı kalemlerini öder (Adam'ın ilk adımı her parametreyi tam öğrenme oranı kadar oynatır;
AdamW kayba yazılan cezanın uyarlamalı paydadan geçince yüz kat çarpıldığını düzeltir) — 95. Azalttığımız
sayı umursadığımız sayı değil: yansız tahminci en iyi tahminci değildir (1,5000 ↔ 1,0909); klasik kapasite
sınırları rastgele etiket deneyinde çöküyor (aynı ağ, 100,0/85,75 ↔ 100,0/9,78); çift iniş üç eksende var;
ezber bir bütçe kalemidir (ImageNet'te yüzde 32'lik kümenin marjinal faydası yüzde 3,4); ve **genellemeyi
öngörmek için türetilmiş bir üst sınır on bin model üzerinde modelleri ters sıralıyor** — 96. Bir yöntemin
kimliği varsayımıdır: hiç eğitilmeyen kural en iyi hatanın iki katını aşmaz (yüzde 5 → yüzde 9,50); tablo
verisinde ağaçlar kazanıyor ve rastgele döndürme sıralamayı tersine çeviriyor; ama 176 kümede fark çoğu
zaman önemsiz ve 121 kümelik klasik tarama da aynı dersi veriyor — 97. Bir çalışmanın iddiası özetinde,
kanıtı tablolarındadır; hakemlikte kabul edilenlerin yaklaşık yarısı öbür komitede reddedilirdi ve süreç
seçicileştikçe rastgeleye yaklaşıyor (yüzde 88,8); ayar bütçesi eşitlendiğinde birçok üstünlük eriyor — 98.

**Sıradaki makaleler ve prerequisite'ler.** 99–102 Faz 11'i kapatır; **101 bağlayıcı koordinattır.**
**99 ← 98** (okuyucu tarafından tasarımcı tarafına geçiş; ablasyon terimi 98'de kuruldu), 97 (taban çizgisi
seçimi bir tasarım kararıdır; Wolpert ve Delgado'nun dersleri), 96 (kontrollü bozma deneyi bir tasarım
biçimidir — Grinsztajn'ın üç bulgusu ve Zhang'ın rastgele etiketi), 16 (değerlendirme kümesi seçimi),
72 (kirliliğin deney tasarımına etkisi), 95 (hiperparametre araması bir deney bütçesidir).
**100 ← 1–99'un tamamı** — serinin planlı büyük geri çağrımı; özellikle 1 (tahmin çerçevesi), 8/9 (ölçek),
13 (tercih optimizasyonu), 41 (getirme), 51 (ajan), 61 (hizalama), 71 (değerlendirme), 81 (çoklu modalite),
91–98 (matematiksel ve yöntemsel omurga). Bu makale yeni kavram tanıtmamalı; işi **haritayı çizmek**.
**101 ← 16 ve 22 (BAĞLAYICI KOORDİNAT: ölçümün disiplini)**, 93 (yanlılık ↔ oynaklık ayrımının numarasız
işareti buraya geliyor), 96 (yanlılık-oynaklık ayrışımının istatistiksel karşılığı), 33 ve 40 (pass@k ve
görev ufku planlı tekrarı — **üç batch'tir devrediyor, burada tahsil edilmeli**), 71–73 (değerlendirme
bilimi ve hakem modeller), 79 (dağılım kayması), 98 (ayar bütçesi asimetrisinin istatistiksel hâli).
**102 ← 101** (anlamlı fark ölçülemiyorsa tekrar edilemiyor demektir), 98 (ön baskı ↔ yayımlanmış sürüm;
kanıt yayımlanmamışsa bağ kurulamaz), 20 (açıklık eksenleri ve model kartı/veri künyesi), 80 (şeffaflık ve
belgeleme), 9 (yeniden üretme teriminin ilk kurulumu), 72 (kirlilik ve gizli test kümesi).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Ablasyon (98), taban çizgisi kültürü (16, 97), kontrollü bozma (96, 97) → 99.
- Serinin bütün omurgası → 100 (yeni kavram yok; yalnızca geri çağırma).
- **Ölçümün disiplini (16, 22 — bağlayıcı koordinat), pass@k + görev ufku (33/40 — devrolan planlı tekrar),
  yanlılık ↔ oynaklık (93, 96 — numarasız işaret) → 101.** Üçü de aynı gövdede karşılanmalı.
- Yeniden üretme (9), açıklık eksenleri (20), şeffaflık ve belgeleme (80) → 102.

**Araştırılacak güncel akademik alanlar (99 için öncelikli):** deneyin anatomisi ve ablasyonun kanıt yükü;
hiperparametre arama bütçesinin raporlanması (Dodge ve ark. EMNLP 2019 "Show Your Work" — bu run'da
indirildi ama **kullanılmadı**, 99 ya da 101 için hazır), rastgele arama ↔ ızgara arama (Bergstra & Bengio
JMLR 2012), ön kayıt tartışmasının makine öğrenmesindeki karşılığı, NeurIPS bildiri kontrol listesi.
**101 için:** Bouthillier ve ark. MLSys 2021 "Accounting for Variance in Machine Learning Benchmarks"
(bu run'da indirildi, **kullanılmadı**, doğrudan 101'in malzemesi — 51 kat hesap tasarrufu bulgusu),
Dror ve ark. ACL 2018 "The Hitchhiker's Guide to Testing Statistical Significance in NLP" (indirildi,
kullanılmadı), Card ve ark. EMNLP 2020 (güç analizi), çoklu karşılaştırma düzeltmesi, güven aralığı ve
bootstrap, Simmons ve ark. 2011'in araştırmacı serbestlik dereceleri (98'de künye düzeyinde anıldı,
101'de gövdeye girebilir). **102 için:** Pineau ve ark. JMLR 2021 (NeurIPS tekrarlanabilirlik programı —
indirildi, kullanılmadı), Gundersen & Kjensmo AAAI 2018, Open Science Collaboration Science 2015,
Baker Nature 2016, Nosek ve ark. PNAS 2018, ML Reproducibility Challenge. **100 için yeni kaynak
gerekmiyor;** yalnızca yayımlanmış 1–99'un kendi sayıları kullanılmalı ve hiçbiri yeniden ölçülmemeli.
Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları
SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 99: aynı iddianın ablasyonlu ve ablasyonsuz hâli (hangi bileşen kaç puan taşıyor); ve bir deney
  tasarımının kontrol listesi değil **karar ağacı** hâli.
- 100: serinin haritası — fazların birbirine ne verdiğini gösteren tek şekil. **Bu şekil bu makalenin
  omurgası olmalı** ve yayımlanmış makale numaralarıyla etiketlenmeli.
- 101: aynı iki modelin puan farkı ile tohum değişkenliğinin yan yana konması (ölçülmüş sayılarla);
  ve örneklem büyüklüğü ↔ ayırt edilebilir fark tablosu.
- 102: bir sonucun yeniden üretilmesi için gereken şeyler ve hangisinin ne sıklıkla yayımlandığı.
- **Uyarı (karar #214):** bu fazda da ölçülmemiş eğri çizilmemeli; 101'in dağılım grafikleri ancak
  kaynağın verdiği sayılarla kurulabiliyorsa çizilmeli, aksi hâlde tablo kullanılmalı.

**Venue doğrulaması — Batch 23'ün kanalları.** Klasik künyeler için **birincil kanal Crossref**
(`api.crossref.org/works/<doi>`): başlık, dergi, cilt, sayı, sayfa, yıl ve yazar soyadları tek çağrıda
gelir ve bu run'daki on beş klasik künyenin tamamı böyle doğrulandı. ACM, Springer, PNAS, MIT Press, IEEE
ve Elsevier DOI'leri tarayıcıya 403/202/"Client Challenge" döner; **bu beklenen bot duvarıdır ve künyeyi
geçersiz kılmaz**. OpenReview kimlikleri `https://api.openreview.net/notes/search?term=…&source=forum&limit=8`
(eski mecralar) ve aynı yolun `api2` sürümü (yeni mecralar) ile tek tek doğrulanır; **`openreview.net/forum`
sayfası bot doğrulaması gösterip 200 döndürdüğü için tek başına kanıt değildir.** Arama ucu 429 veriyor:
sorgular arasında 7 sn. NeurIPS/PMLR/ACL hash URL'leri **elle yazılmaz**, dizinden çözülür
(`papers.nips.cc/paper_files/paper/<yıl>`, `proceedings.mlr.press/v<cilt>`, `aclanthology.org`,
`proceedings.iclr.cc/paper_files/paper/2024|2025|2026`, `iclr.cc/virtual/<yıl>/papers.html` 2018–2023,
`jmlr.org/papers/v<cilt>`). **ICLR 2015 ve öncesi OpenReview'da forum kimliğiyle durmuyor**; o yıllar için
arXiv bağlantısı + "ICLR YYYY" biçimi kullanılır (seride 4, 63, 87 ve 95'te aynı biçim). **DOI'deki
parantez markdown bağlantısını kırar** (Wiley'de ve Elsevier'de çıktı); yüzde kodlamasıyla yazılır.
PDF'ler `pypdf` ile metne çevrilir; `arxiv.org/pdf/<id>` sürüm numarasız istenmeli (sürümlü adres 404
verebiliyor).

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 24` ve `readingOrder` 99'dan kesintisiz
devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir (başlık değişecekse
entegrasyondan **önce**); YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve bağlayıcı
kararlar güncellenir; doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki run
hazırlığıyla güncellenir. **Kategori sorusu YOKTUR** (99–102 `foundations`), dolayısıyla yeni kategori dizini
açılmayacak; `reading-list-groups.test.ts` yine de çalıştırılır. **Level `advanced` kalır** (karar #201).
**101 kapanınca defterde açık koordinat kalmayacak** — bu, `+1` fazında açıkça kaydedilmeli.

**Entegrasyon sırası (repo içi araçlarla):**
```
node tools/series/entegre-batch.cjs            # kuru çalışma: frontmatter → katalog/roadmap denetimi
node tools/series/entegre-batch.cjs --write    # catalog.json + roadmap.json
node tools/series/sync-series-hashes.cjs --write
node tools/series/check-series-content.cjs && node tools/series/check-series-svg.cjs
corepack pnpm typecheck && corepack pnpm test && corepack pnpm build
```
Notlar: frontmatter **gray-matter ile** okunur; `catalog.json` 2 boşluklu `JSON.stringify` ile byte-identical
round-trip yapar; `roadmap.json`'un kompakt satır biçimi satır bazlı replace ile korunur. **Sıra önemlidir:**
`sync-series-hashes.cjs` katalog varsa yalnızca katalog kayıtlarını gezer, dolayısıyla yeni makalelerin hash'i
ancak `entegre-batch --write`'tan **sonra** düzelir; frontmatter'a önce 64 sıfırlık yer tutucu hash yazmak
sorun değildir. `reading_order` frontmatter'da zorunludur. Roadmap başlığı frontmatter başlığıyla birebir
eşleşmek zorundadır. **Entegrasyondan sonra makale gövdesine her dokunuşta `sync-series-hashes.cjs --write`
yeniden çalıştırılır.** SVG'nin **kendisi** hash'i etkilemez, şekil **alt metni** etkiler. Araçların üçü de
varsayılan olarak yalnızca AI serisini işler.

**Yayın öncesi zorunlu taramalar.** Ölçer betikleri kalıcı olmadığı için yeniden yazılmalı (yukarıdaki
"Araçlar"). Kapsam değişmedi: kelime sayısı, parantezli gloss listesi, yasaklı biçimler (`gömme`, `korpus`,
`geliştirme kümesi`, `niceleme`, `az/sıfır atışlı`, `çekişmeli`), **kendi numarası** ve **numaralı ileri
gönderme** (≥ N+1) taramaları, `N\. makale` kaçış denetimi, bölüm başlıkları, "Kendini yokla" ve şekil sayısı.
**Kelime sayısı için kapının kendi işlevi kopyalanmalı:** `check-series-content.cjs`'in `countProseWords`'ü
kaynakçayı, şekil sözdizimini, bağlantı hedeflerini ve liste/alıntı işaretlerini atar; kabuk içinde yazılan
tek satırlık taklit Batch 22'de 100–150 kelime fazla saydı. **Batch 23'ün ek dersi:** şekil alt metinleri
kelime sayısına **girmiyor** ve uzun alt metinler taslağı olduğundan dolu gösteriyor — bu run'da dört
makalenin üçü ilk turda bandın altında kaldı. SVG için **iki** kapı: `check-series-svg.cjs` (viewBox, sabit
renk, yasak öge, font boyutu; genişlik tahmini **0,55 × font-size**) ve yeniden yazılacak `svgcheck` (aynı
satırdaki her metin çifti, kutu içi metnin `x + width`'i, sağ/sol kenar, alt pay ≥ 12, kapanmamış `var(`);
Batch 23'te ikincisi 0,58 çarpanı ve 6 px payla iki taşma + bir çakışma yakaladı. **Şekil alt metni ile
SVG'nin `aria-label`'ı betikle senkronlanmalı** — elle yazıldığında ayrışıyor; Batch 23'te üç alt metin bu
yolla düzeldi. **Bağlantı kapısı:** her `[Bağlantı](...)` adresi çekilir ve `<title>`'ı yazılır; bot
duvarları (403/202/"Client Challenge") beklenen sonuçtur ve Crossref ile telafi edilir. **PNG turu Batch
23'te kusur bulmadı** ama `svgcheck` buldu — iki kapı birbirinin yerine geçmiyor, ikisi de gerekli.
**Ayrıca:** yeni bir ölçü çifti ya da yeni bir terim kurulacaksa YOL-HARITASI terim defterinin ilgili
satırları **yazımdan önce** aranmalı; ve uzun aralıklı geri çağırmada **kaynak makalenin gövdesi okunmalı**.

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch 23'te de
aynı worktree'de ikinci bir üretim oturumu (BOUN serisi) eşzamanlı çalışıyordu ve aynı dakikalarda dosya
yazıyordu; çakışma yaşanmadı çünkü (a) `artifacts/` hiç kullanılmadı, (b) build ve dev sunucusu izole
kopyada çalıştırıldı, (c) `.claude/launch.json` **okunup kendi girdisi eklenerek** yazıldı ve temizlikte
yalnızca o girdi çıkarıldı. Kontrol yalnızca porta bakmak değil: `git status` ile başka bir serinin
dosyalarının değişip değişmediğine ve `.wolf/memory.md`'nin son satırlarına da bakılmalı. İzole kopya düzeni:
`tar --exclude=./node_modules --exclude=./.next --exclude=./.git --exclude=./artifacts --exclude=./.env.local
-cf - . | (cd /d/dev/anil-lib-bNN-render && tar xf -)`, junction PowerShell ile
`New-Item -ItemType Junction -Path 'D:\dev\anil-lib-bNN-render\node_modules' -Target 'D:\dev\anil-lib\node_modules'`,
kopyada `corepack pnpm build`, sonra kopyanın `.next`'i silinip `.claude/launch.json`'a geçici yapılandırma
(Git Bash **tam yolu**, `-lc`, `export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-bNN-render && exec corepack
pnpm dev -p 3210`). **launch.json'ı Bash ya da Python heredoc ile yazma:** `\\` çiftleri tek `\`'a iner;
Write aracıyla yaz (Git Bash'in yolu bu makinede `%LOCALAPPDATA%\Programs\Git\usr\bin\bash.exe`).
Kopyada `.env.local` olmadığı için okuyucu kapısı kendiliğinden kapalı — **ama yalnızca `next dev`'de**;
`next start` middleware'i devreye sokar ve bütün rotalar `/login`e yönlenir, dolayısıyla üretim sunucusuyla
rota sweep'i yapılamaz. `typecheck` ve `test` ana worktree'de çalıştırıldı. **Kopya oluşturulduktan sonra
ana worktree'de içerik değişirse dosyayı kopyaya senkronlamak yetmiyor:** dev sunucusu derlenmiş sayfayı
önbelleğe aldığı için `preview_stop` + `preview_start` gerekiyor. Temizlik: **önce** `preview_stop`, sonra
junction `cmd //c rmdir` ile kaldırılır, ardından ana `node_modules` doğrulanır
(`node_modules/next/package.json` yerinde), sonra kopya silinir; launch.json kendi girdisinden arındırılır.
Bash aracında `cd` bir komuttan sonrakine taşınır — her komut `cd /d/dev/anil-lib;` ile başlar; Python
Windows'ta `/d/dev/...` yolunu tanımaz (`D:/...` verilir) ve konsola Türkçe basarken
`sys.stdout.reconfigure(encoding="utf-8")` ister. **Bash aracında uzun Python heredoc'ları ayrıştırma hatası
veriyor**; uzun betikler Write aracıyla **oturum scratchpad'ine** yazılıp `python <dosya>` ile çalıştırılmalı.

**Render doğrulama seti (Batch 23'te kullanılan).** Rota sweep'i Python `urllib` ile, **dilimli**: Batch 22'de
dev sunucusu 94 rotayı tek oturumda derlerken JavaScript yığınını tüketmişti; Batch 23'te 99 rota
32 + 32 + 18 + 17 dilim hâlinde, sunucu ayakta, toplam ~76 sn'de sorunsuz derlendi — **dilimleme kuralı
korunmalı.** Sweep betiği durum kodunun yanında `resp.geturl()`i de karşılaştırmalı; aksi hâlde `/login`
yönlendirmesi sahte bir "hepsi 200" raporu üretir. Tarayıcı panosundan: `preview_start` → `resize_window` ile
**açık genişlik/yükseklik** (1440×900, 768×1024, 375×812; `preset: "desktop"` emülasyonu **temizler**, ölçüm
için kullanılmaz) → `javascript_tool` ile tema döngüsü (`documentElement.classList` üzerinde `dark`/`sepia`)
ve ölçüm (`scrollWidth > innerWidth`, figure/svg/figcaption/blockquote sayıları, `main.innerText` içinde
`undefined`/`NaN` ve ham i18n anahtarı deseni). **Ölçümden önce `await new Promise(r=>setTimeout(r,2200))`
koy.** `browser_batch` içindeki JSON'da regex kaçışlarına dikkat — regex'i
`new RegExp('[a-z]+[.][a-z]+[.][a-z]+','g')` gibi köşeli parantezle kur. **`NaN` sayacı sıfır olmayabilir:**
95'in gövdesi "kayıp NaN oldu" cümlesini içeriyor; sayaç sıfır değilse bağlamı okuyup gövde cümlesi mi
render kusuru mu ayırt et. Ölçülen genişlikler: 1440'ta SVG 771 px, 768'de 676 px, 375'te 351 px — üçünde de
yatay kaydırma yok. **Şekil görüntüleri Playwright'tan** (kaplayıcıda 1200 px klon, light/dark PNG): 13 şekil,
26 PNG, Read aracıyla incelendi. Playwright ana worktree'de `node_modules/@playwright/test` altındadır ve
ESM betiğinden **`import "D:/..."` ile çağrılamaz** (`ERR_UNSUPPORTED_ESM_URL_SCHEME`);
`createRequire("file:///D:/dev/anil-lib/")` + `require("@playwright/test")` kullanılmalı.
`waitUntil: "networkidle"` **kullanılmaz** — okuyucu `/api/reader-sync`'i sürekli yokladığı için ağ hiç
boşalmıyor; `domcontentloaded` + sabit bekleme kullan.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. Bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer —
  beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur (Batch 23'te de yalnızca bu 503).
- Ham HTML'de sayfa başına "undefined" görünür; Next.js iskelesindendir ve yayımlanmış eski makalelerde de
  aynıdır. `main.innerText` ölçümünde 0'dır — regresyon değil.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` ve genişliğe karşı yatay taşmayı yakalar; **sütuna
  binmeyi, kutudan taşmayı ve kapanmamış `var(` parantezini görmez** — bunun için ayrı bir ölçer gerekir
  (Batch 23'te yeniden yazıldı ve iki taşma + bir çakışma yakaladı, ama scratchpad'de kaldı). İki ölçerin
  karakter genişliği tahmini farklıdır (0,55 ↔ 0,58). **Hiçbiri hizası bozuk bir satırı ya da yarım kalmış bir
  cümleyi görmez** — PNG turu bu yüzden zorunlu.
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde görünür (27–28, 29,
  30–40, 41–60); `safety-and-evaluation` 61–80 tek öbek, `multimodal-and-future` 81–90 tek öbek ve
  **`foundations` iki öbek** (1–5, 91–98). Kasıtlıdır; `reading-list-groups.test.ts` bunu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) ayrı bir üretim hattıyla ilerliyor; AI serisinin araçları o
  dizine dokunmaz. Build iki seriyi birden derler. **Batch 22 ve 23 sırasında o hat aynı worktree'de eşzamanlı
  çalışıyordu**; `artifacts/`, `.claude/launch.json` ve `.wolf/*` paylaşılan durumdur ve çakışabilir.
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor (`Karar`, `her`, `Yaşayan`, `yapılırsa`,
  `**Bu`, `**zorundadır**.`). Build'i etkilemiyor; temizlik AI serisinin kapsamı dışıdır.
- Batch 12–21'in üretimi (51–90) kullanıcı tarafından commit edildi. **Batch 22 (91–94) commit edilmiş
  durumda; Batch 23 (95–98) çalışma ağacında commit edilmemiş** duruyor: dört makale ve dört varlık klasörü
  izlenmiyor; `catalog.json`, `roadmap.json`, `HANDOFF.md`, `YOL-HARITASI.md` ve `.wolf/*` değişmiş durumda.
  Commit/push kullanıcı kararıdır (SOZLESME kapsamı dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)
- **Batch 23 (2026-09-10):** Makale 95–98, **Faz 10'un kapanışı + Faz 11'in açılışı**: optimizasyonun kuramı →
  genelleme kuramı → klasik makine öğrenmesi turu → bir çalışmayı okumak. `BATCH=4+1`. Araştırma (dört dalga,
  100'den fazla adres, `pypdf` ile PDF → metin), yazım, entegrasyon ve doğrulama ana oturumda,
  workflow/subagent kullanılmadan yapıldı. **Faz 11'in kategorisi `foundations` (#209)** ve level `advanced`
  kaldı. **Yeni koordinat açılmadı ve kapatılmadı**; defterdeki tek koordinat 101 sıradaki banda düştü.
  98'in başlığı Türkçeleştirildi (#210: "Paper Nasıl Okunur" → "Bir Çalışmayı Okumak") ve Faz 11'in
  roadmap açıklaması da güncellendi. Kararlar #209–#216. 54 kaynak kaleminin 48'i hakemli, 3'ü hakemsiz
  (metinde işaretlendi). **Doğrulanamayan künye yok.** Kapılar: `pnpm typecheck` (0), **624 test**,
  `pnpm build` (exit 0, `/seri/[slug]` 98 yol, 153 statik sayfa, izole kopyada), 99 rotanın tamamı 200
  (dört dilim, ~76 sn), dört makale × üç genişlik × üç temada DOM ölçümü, 13 yeni diyagram Playwright ile
  light/dark PNG olarak alınıp gözle doğrulandı (PNG turu kusur bulmadı; `svgcheck` üç kusur bulup düzeltti).
  Paralel BOUN oturumu yine aynı worktree'deydi; `artifacts/` hiç kullanılmadığı için çakışma olmadı.
- **Batch 22 (2026-09-10):** Makale 91–94, **Faz 10'un açılışı**: vektörler ve matrisler → rank, özdeğer ve SVD
  → olasılık, beklenti ve en büyük olabilirlik → entropi, çapraz entropi ve KL. `BATCH=4+1`. **Faz 10'un
  kategorisi `foundations` (#200) ve level bandı `advanced`'e geçti (#201)** — serinin ilk `advanced` kohortu.
  **13'ün numarasız işareti 94'te ödendi.** Kararlar #200–#208. 50 kaynak kaleminin 44'ü hakemli. 605 test.
  **Paralel bir BOUN oturumu `artifacts/` altını sildi** (karar #208g).
- **Batch 21 (2026-09-10):** Makale 87–90, **Faz 9'un kapanışı**. **34'ün numarasız işareti 87'de ödendi.**
  Kararlar #192–#199. 587 test.
- **Batch 20 (2026-09-09):** Makale 83–86, **Faz 9'un gövdesi**. **İki bağlayıcı koordinat birden kapandı**
  (20 → 85; 7 ve 15 → 86). Kararlar #184–#191. 575 test.
- **Batch 19 (2026-09-09):** Makale 79–82; **Faz 8 kapandı, Faz 9 açıldı**. Faz 9'un kategorisi
  `multimodal-and-future` (#176); dört numarasız işaret ödendi. 563 test.
- **Batch 18 (2026-09-09):** Makale 75–78, Faz 8'in ikinci yarısı. DBLP kapandı (#175). **74–77 bandı kapandı
  ve 78 koordinatı ödendi.** 551 test.
- **Batch 17 (2026-09-06):** Makale 71–74, Faz 8'in açılışı. Kategori `safety-and-evaluation` (#160).
  **72 koordinatı kapandı, 74–77 bandının ilk taksidi ödendi.** 519 test.
- **Batch 16 (2026-09-06):** Makale 67–70, Faz 7'nin kapanışı. 20'nin iki koordinatı kapandı. 507 test.
- **Batch 15 (2026-09-05):** Makale 63–66, Faz 7'nin gövdesi. 64 koordinatı ödendi (#153). 495 test.
- **Batch 14 (2026-09-05):** Makale 59–62: Faz 6'nın kapanışı + Faz 7'nin açılışı (#142). 482 test.
- **Batch 13 (2026-09-05):** Makale 55–58, Faz 6'nın ikinci yarısı. 470 test.
- **Batch 12 (2026-09-04/05):** Makale 51–54, Faz 6'nın açılışı (#128). 458 test.
- **Batch 11 (2026-09-03/04):** Makale 47–50, Faz 5'in kapanışı. 446 test.
- **Batch 10 (2026-09-02/03):** Makale 43–46, Faz 5'in gövdesi. 431 test.
- **Batch 9 (2026-09-02):** Makale 39–42; Faz 4 kapandı, Faz 5 açıldı (#107). 419 test; build `artifacts/`
  şişmesiyle kırılıp dizin küçültülerek düzeldi.
- **Batch 8 (2026-09-01):** Makale 35–38. 294 test.
- **Batch 7 (2026-08-30):** Makale 31–34; Faz 4'ün ilk yarısı. 277 test. İzole render kopyası ilk kez kullanıldı.
- **Batch 6 (2026-08-30):** Makale 27–30; Faz 3 kapandı. 29 `agents-and-retrieval` (#65). 259 test.
- **Batch 5 (2026-08-30):** Makale 23–26. 241 test.
- **Batch 4 (2026-08-29):** Makale 19–22; Faz 2 kapandı, Faz 3 açıldı (#50). 223 test.
- **Batch 3 (2026-08-29):** Makale 15–18. 208 test.
- **Batch 2 (2026-08-29):** Makale 11–14, serinin ilk `intermediate` kohortu. 191 test.
- **Batch 1 (2026-08-26/27):** Makale 6–10. İnceleme turu 20 BLOCKER + ~40 MAJOR buldu.
- **Batch 0 (2026-08-25):** Makale 1–5, `foundations`; seri altyapısı aynı görevde kuruldu.
- Batch 0/1'in ham üretim kayıtları `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv** olarak durur.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
