# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-06 · Durum: **1–74 yayında (kohort Batch 0 → Batch 17) · Faz 8'in ilk yarısı tamam · Sıradaki: 75 (Faz 8'in ikinci yarısı, 75–78)**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 74 — `mekanistik-yorumlanabilirlik-devreleri-okumak` |
| Sıradaki güvenli başlangıç | Makale 75 ("Özellikler ve Süperpozisyon: Modelin İç Dili"); run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 75, 76, 77 ve 78 üretilir. **78 bağlayıcı bir koordinattır** (5 ve 9'un "beliren yetenekler tartışmasının açıklığı" vaadi; 71 ve 74 de "78'e bıraktığımız" diyerek bu koordinata yazdı); 75–77 ise 6 ve 18'in açtığı **74–77 bandının kalan üç taksididir** (74 açılışta "özellikler, müdahale ve atıf sonraki üç makalede" dedi) |
| Sıradaki kohort | `classification_batch: 18` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs`; ek ölçerler: `artifacts/b17-research/scan-b17.py`, `svgcheck-b17.py`, `sweep-b17.py`, `shots-b17.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–80 `safety-and-evaluation` (kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142, #148, **#160**). Kohort 17 (71–74) tamamen `safety-and-evaluation`; okuma listesinde 61–74 tek öbek ve `reading-list-groups.test.ts` değişmedi (519 test). **Faz 8'in kategorisi karara bağlandı (#160): 75–80 de `safety-and-evaluation`.** Yeni makaleler dizin olarak kategorinin klasörüne girer |

## Faz 8 kategori kararı — verildi (karar #160)

`safety-and-evaluation` 71–80 boyunca devam eder; yeni kategori açılmadı. Gerekçe ve bedel YOL-HARITASI #160'ta.
Sonraki run'larda kategori sorusu yoktur; 75–78 aynı klasöre girer. Okuma listesinde 61–80 tek öbek olur; liste
kohort × kategori kırılımıyla Batch 14–18 başlıkları altında ayrı görünmeye devam eder, test değişmez.

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları hâlâ İngilizce alan
  terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning ve Test-Time
  Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim defterine göre Türkçeleştiriliyor
  (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135, #148, #154, #155, #162, #163). Katmanın tümden
  Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır. Faz 8'in başlığı ("Değerlendirme ve
  Yorumlanabilirlik") zaten Türkçe; Faz 9 "Çoklu Modalite ve Verimlilik" de öyle.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler.** Batch 17 iki başlığı Türkçeleştirdi: 73 "LLM-as-Judge" →
  "Hakem Modeller" (#162), 74 "Mechanistic Interpretability" → "Mekanistik Yorumlanabilirlik" (#163); 71'in
  "benchmark"ı defter gereği kaldı (#161). Sıradaki dörtlüde üç aday: **76 "Aktivasyonlara Müdahale: Steering ve
  Problar"** — 67 ve 74 "sonda" diyor ("prob" gövdede hiç kullanılmadı), "steering" için 66'nın "karakter
  vektörü" ve 62'nin "ret yönü" emsali var; olası başlık "Aktivasyonlara Müdahale: Yönlendirme ve Sondalar",
  karar 76'nın run'ında gövdelerde grep ile ("yönlendirme" sözcüğünün 29/44'te başka anlamda geçip geçmediğine
  bakılır). **77 "Attribution: Model Neden Böyle Dedi?"** — 74 "atıf yaması" (attribution patching) dedi;
  olası başlık "Atıf: Model Neden Böyle Dedi?". **78 "Emergence Tartışması: Yetenekler Aniden mi Gelir?"** —
  defterde "beliren yetenek" 9'dan beri kayıtlı; olası başlık "Beliren Yetenekler Tartışması: Yetenekler Aniden
  mi Gelir?". 75'in başlığı ("Özellikler ve Süperpozisyon: Modelin İç Dili") zaten Türkçe. Başlık değişikliği
  entegrasyondan **önce** `roadmap.json`'a yazılır.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış vaatler"dedir.
  Batch 17 **72 koordinatını kapattı, 74–77 bandının ilk taksidini ödedi ve yeni koordinat açmadı**. **Açık
  kalan koordinatlar:** 75–77 (modelin içine bakmanın araçları — 6, 18; kalan taksitler), **78 (beliren
  yetenekler — 5, 9; sıradaki run'ın bağlayıcı koordinatı)**, 85 (uzmanlar karışımı — 20), 86 (karesel
  maliyeti ödemeyen mimariler — 7, 15), 101 (ölçümün disiplini — 16, 22). Numarasız işaretler: 74 → 75
  (süperpozisyon ve seyrek sözlük; 3'ün çok anlamlı nöronu), 73/74 → 76 (temsile müdahale; kendini tanımanın
  içerideki karşılığı), 74 → 77 (gerekçenin atfı), 71/74 → 78 (cetvel ↔ sıçrama; geç genellemenin ilerleme
  ölçüsü), 72 → 79 (dinamik ölçüt; işlevsel ölçüt), 71/73 → 80 (şeffaflık; hakemin kurumsal denetimi), 67 →
  74–77 (sonda ve temsil müdahalesi; 74 tahsil etti, 75–76 devam), 51 → 111, 49/53 → 115. Devrolan planlı
  tekrarlar: pass@k (33) ve görev ufku (40) → 78; Azaria'nın iç sınıflandırıcısı (65) ve kısıtlı üretim (30) →
  76; sorgu yeniden yazma (44 → 73) düştü.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR hâlâ uygulanmadı; tam listeler
  repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(12) önceki batch'lerden (kararlar #21, #97, #104, #106,
  #114, #120, #127, #134, #141, #147, #152, #159). (13) **Batch 17:** Rein ve ark. GPQA — COLM 2024 kabul listesi
  sayfası challenge döndürdü, DBLP yalnızca CoRR; künye "COLM 2024 bildirisi olarak duyuruldu; kabul listesi
  erişilemedi, okunan sürüm arXiv" diye yazıldı (71). Krumdick ve ark. "No Free Labels" PDF başlığında "COLM
  2026" yazıyor; künye "COLM 2026'ya kabul edilmiş bildiri" diye işaretlendi, hakemli sayılmadı (73). Saphra &
  Wiegreffe "Mechanistic?" yalnızca arXiv (74; hakemsiz). Burnell ve ark. Science 2023 yazısı yayıncı duvarı
  yüzünden `eprints.whiterose.ac.uk` ön baskısından okundu (71). Rodriguez ve ark. ACL 2021 PDF'inden metin
  çıkarılamadı, kullanılmadı. van der Lee ve Krippendorff metinleri alınamadı; uzlaşma katsayıları adıyla anıldı
  (73). Nostalgebraist logit merceği 429 (74; anılmadı).
- **Hakemsiz kaynak oranı Batch 17'de düştü (karar #167):** 159 kalemin 126'sı hakemli, 33'ü işaretlenmiş
  hakemsiz kalem (Batch 16: 36/99). DBLP yazım bittikten sonra beş künyeyi hakemliye çevirdi (Makelov ICLR 2024,
  Sharkey TMLR 2025, Vu EMNLP 2024, Ye ICLR 2025, Dorner ICLR 2025) ve bir künyeyi hakemsize (Gudibande).
  Kural değişmedi: hakemli karşılığı varsa o öne çıkar; **künyeler DBLP taraması bitmeden kesinleşmez.**

## Next batch preparation — 75'ten devam (Faz 8'in ikinci yarısı: 75–78)

**Pedagojik hedefler.** Batch 17'nin sonunda okuyucu şunu biliyor: bir puan bir ölçümdür ve dört halkalı bir
geçerlilik zincirinin ürünüdür (yapı → görevleştirme → ölçüt → puan); zincir en zayıf halkası kadar güçlüdür;
kısayol puanı alır görevi çözmez; puan bir örneklemdir ve hata payı sorunun sayısıyla küçülür (500 soruda ±4);
protokol puanın içindedir (doğru cevabın şık konumu 53,1 → 68,2); ölçütün ömrü vardır (71). Kirlilik dört yoldan
sızar, kara kutuda yönlendirmeli tamamlama ve kanonik sıra tercihiyle bulunur; ezber kapasite, tekrar ve bağlamla
büyür ve üç türdür; yeniden yazılan sınavda puan 0,6–8 puan düşer ve düşüş üretme olasılığıyla ilişkilidir;
korunma canlı ve işlevsel ölçütlerdir (72). İnsan değerlendirmesi de bir ölçümdür (kim, ölçek, kaç, uzlaşma,
maliyet); hakemin insanla uzlaşması görevin özelliğidir (0,82 → −0,24); hakemin on iki yanlılığı ölçülmüş ve
kısmen düzeltilebilir; hakem ancak insan çapasıyla kullanılır ve insan verisinin iki katından fazlasının yerine
geçemez (73). Artık akış bir iletişim kanalı, baş ondan okuyup ona yazan bağımsız bir işlem, devre bir davranışı
taşıyan alt çizgedir; devre yamayla bulunur (gürültü giderme "yeter mi", gürültüleme "gerekli mi") ve sadakat,
tamlık, enazlıkla savunulur (26/144 baş, %87); indüksiyon başları eğitimin dar bir penceresinde belirir; modüler
toplama Fourier devresiyle çözüldü ve geç genelleme mekanizmada süreklidir; sonda okur ama kullanımı kanıtlamaz,
dikkat ağırlığı neden değildir, nöron ve alt uzay yanılsamaları vardır, sadakat puanı yöntem seçimine duyarlıdır
(74). 74'ün kapanışı 75'e devretti: model nöron sayısından çok özelliği aynı nöronlara sıkıştırıyorsa devrenin
düğümleri nöron olamaz — sıkıştırmanın adı ve düğümleri yeniden bulan sözlük.

**Sıradaki makaleler ve prerequisite'ler.** **75 ← 74** (devre; artık akış; nöron yanılsaması; Geiger'in
döndürülmüş alt uzayı; "bir sonraki makale" devri), 3 (temsil; kedi yüzü–araba önü nöronu; Olah'ın devre
incelemesi), 67 (sonda; temsil mühendisliği; doğruluğun doğrusal temsili), 27 (aykırı değer boyutları — planlı
tekrar 74–77), 62 (ret yönü), 65 (doğruluk yönü), 7 (ileri beslemeli katmanın genişliği), 19 (düşük ranklılık —
dolaylı), 2 (seyreklik cezası; L1 — 2'de kayıp ailesi). **76 ← 74, 75** (özellik; sonda; yama), 62 (**ret
yönü**: tek yön silinince ret kalkıyor), 66 (**karakter vektörü**; dalkavukluk yönü), 67 (temsil mühendisliği;
yalan dedektörü; sonda ile müdahale), 65 (Azaria'nın iç sınıflandırıcısı — **devrolan planlı tekrar**), 18
(ROME: ağırlık düzenleme ↔ aktivasyon müdahalesi), 30 (kısıtlı üretim — **devrolan**), 24 (sistem istemi ↔
aktivasyon müdahalesi: aynı davranışın iki kapısı), 13 (tercih eğitimi ↔ yönlendirme), 23 (işlev vektörü, 74).
**77 ← 31** (sadakat: gerekçe ↔ gerçek sebep), 32 (ara adımlar), 67 (zincir sadakati %25 ve %39; sonradan
gerekçe), 74 (atıf yaması; nedensel aracılık; yorumlanabilirlik yanılsamaları; dikkat açıklama değil), 57 (iz
puanın denetim kaydı), 45 (kaynak sadakati ↔ gerekçe sadakati ayrımı), 17 (halüsinasyonun atfı), 8 ve 14 (eğitim
verisine atıf), 64 (açıklamayı okuyan hakem), 69 (denetimin erişimi: açıklama yükümlülüğü). **78 ← 5, 9**
(**78 koordinatı**: beliren yetenekler tartışması; ölçek yasaları; Kaplan/Hoffmann eğrileri), 71 (cetvel; ikili
puanlama; ölçüt piyangosu; hata payı; "78'e bıraktığımız"), 74 (geç genelleme; ilerleme ölçüsü; "davranışta
ani, mekanizmada sürekli"), 72 (ezber ölçekle büyür; kirlilik sıçramayı şişirir), 16 (cetvel bir tasarım
ürünüdür), 33 (**pass@k — devrolan**), 40 (**görev ufku — devrolan**), 23 (örnekle öğrenme ölçekle belirir),
2 (kayıp ↔ yetenek), 61 ve 67 (faz geçişi; yetenek çıkarımı), 70 (eşik ölçümü: belirme öngörülebilir mi).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Temsil, çok anlamlı nöron (3), sonda (67, 74), aykırı değer boyutu (27) → 75.
- Ret yönü (62), karakter vektörü (66), temsil mühendisliği (67), ROME (18), sistem istemi (24) → 76.
- Sadakat (31, 74), ara adımlar (32), zincir sadakati (67), iz (57), kaynak sadakati (45) → 77.
- Beliren yetenek ve ölçek yasaları (5, 9), cetvel (16, 71), geç genelleme (74), ezber (72), pass@k (33), görev
  ufku (40) → 78.
- Devre ölçütleri (sadakat, tamlık, enazlık) ve yama (74) → 75, 76, 77; grokking (74) → 78.

**Araştırılacak güncel akademik alanlar (75 için öncelikli):** süperpozisyon (Elhage ve ark. 2022 "Toy Models
of Superposition" — Transformer Circuits, hakemsiz; Scherlis ve ark. 2022 polysemanticity — doğrulanmalı),
seyrek otokodlayıcılar (Cunningham ve ark. ICLR 2024; Bricken ve ark. 2023 "Towards Monosemanticity" ve
Templeton ve ark. 2024 "Scaling Monosemanticity" — Transformer Circuits, hakemsiz; Gao ve ark. "Scaling and
evaluating sparse autoencoders" ICLR 2025 — doğrulanmalı; Rajamanoharan ve ark. gated / JumpReLU SAE — arXiv,
doğrulanmalı; Lieberum ve ark. Gemma Scope BlackboxNLP 2024 — doğrulanmalı), özellik değerlendirmesi (Karvonen
ve ark. SAEBench 2025 — doğrulanmalı; Chanin ve ark. özellik emilimi — doğrulanmalı; Paulo & Belrose SAE
kararsızlığı — doğrulanmalı; Makelov, Lange & Nanda 2024 "principled evaluation" — doğrulanmalı), doğrusal
temsil hipotezi (Park, Choe & Veitch ICML 2024; Engels ve ark. "Not All Language Model Features Are Linear"
ICLR 2025 — doğrulanmalı; Mikolov 2013 analoji — 3'te kullanıldı), seyrek özellik devreleri (Marks ve ark.
ICLR 2025 — doğrulanmalı), çapraz kodlayıcılar ve atıf grafları (Lindsey ve ark. 2024, Ameisen ve ark. 2025 —
Transformer Circuits, hakemsiz; 77'ye devredilebilir), Sharkey ve ark. TMLR 2025 (74'te kullanıldı; §"özellik"
sorunları). **76 için:** yönlendirme vektörleri (Turner ve ark. 2023 activation addition — arXiv; Rimsky ve ark.
ACL 2024 kontrast aktivasyon ekleme; Zou ve ark. 2023 temsil mühendisliği — 67'de kullanıldı; Li ve ark.
NeurIPS 2023 çıkarım anı müdahalesi; Arditi ve ark. NeurIPS 2024 ret yönü — 62'de kullanıldı; Marks & Tegmark
COLM 2024 doğruluk geometrisi — 67'de; Burns ve ark. ICLR 2023 CCS — 67'de; Belrose ve ark. NeurIPS 2023
LEACE; Ravfogel ve ark. ACL 2020 INLP; Wu ve ark. NeurIPS 2024 ReFT; Tan ve ark. "Analysing the generalisation
and reliability of steering vectors" NeurIPS 2024 — doğrulanmalı; Panickssery/Rimsky; Templeton "Golden Gate"
örneği — hakemsiz), sonda ile müdahale (74'ün Li Othello ve Nanda satırları). **77 için:** öznitelik atfı
(Sundararajan ve ark. ICML 2017 integrated gradients; Lundberg & Lee NeurIPS 2017 SHAP; Ribeiro ve ark. KDD 2016
LIME; Adebayo ve ark. NeurIPS 2018 sanity checks; Hooker ve ark. NeurIPS 2019 ROAR), sadakat ölçümü (Jacovi &
Goldberg ACL 2020; DeYoung ve ark. ACL 2020 ERASER; Turpin ve ark. NeurIPS 2023 — 31'de; Lanham ve ark. 2023 —
67'de; Chen ve ark. 2025 "Reasoning models don't always say what they think" — hakemsiz, doğrulanmalı), eğitim
verisine atıf (Koh & Liang ICML 2017 etki fonksiyonları; Grosse ve ark. 2023 — arXiv; Park ve ark. ICML 2023
TRAK; Ilyas ve ark. ICML 2022 datamodels), otomatik açıklama (Bills ve ark. 2023 — OpenAI, hakemsiz; Huang ve
ark. 2023 "Rigorously assessing" — doğrulanmalı), açıklanabilirlik kavramı (Doshi-Velez & Kim 2017 — arXiv;
Lipton ACM Queue 2018; Rudin Nature MI 2019; Jacovi & Goldberg). **78 için:** beliren yetenekler (Wei ve ark.
TMLR 2022; Schaeffer, Miranda & Koyejo NeurIPS 2023 "mirage" — 9'da kullanıldı; Ganguli ve ark. FAccT 2022;
Srivastava ve ark. TMLR 2023 — 71'de; Lu ve ark. ACL 2024 "emergent abilities … in-context learning";
Hu ve ark. ICLR 2024 "PassUntil / infinite resolution" — doğrulanmalı; Du ve ark. NeurIPS 2024 "loss
perspective" — doğrulanmalı; Snell ve ark. "Predicting emergent capabilities by finetuning" COLM 2025 —
doğrulanmalı; Ruan, Maddison & Hashimoto ICLR 2025 gözlemsel ölçek yasaları — doğrulanmalı; Arora & Goyal ICLR
2024 skill-mix — doğrulanmalı), gizli ilerleme (Barak ve ark. NeurIPS 2022; Michaud ve ark. NeurIPS 2023
kuantizasyon modeli; Chen ve ark. ICLR 2024 "sudden drops in the loss" — doğrulanmalı; Nanda ve ark. ICLR 2023 —
74'te), ters ölçekleme (McKenzie ve ark. TMLR 2023; Wei ve ark. 2023 U-biçimli — doğrulanmalı), Owen 2024 (71'de,
hakemsiz), Anderson Science 1972 "More is Different" (kavram tarihi; Crossref DOI). Sayısal iddialar ve URL
doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları SOZLESME §9'dadır.

**Venue doğrulaması.** Batch 10–17'nin kanalları sürüyor: Crossref API ve `query.title`, ACL Anthology, DBLP
`ee` (12 sn aralık; **arka planda başlatılır ve yazım bitse de sonuçları künyelere işlenir**), PMLR dizini
(cilt sayfası `curl` ile başlık teyidi), ICLR/NeurIPS proceedings ve `papers.nips.cc` hash sayfaları, arXiv API
başlık araması, PDF başlık satırları ("Published as a conference paper at …"), Europe PMC, PMC makale sayfası,
OSF. Kural sürüyor: OpenReview ve PMLR kimlikleri **tahmin edilmez**; OpenReview PDF'leri `urllib`'e 403 döner,
arXiv sürümü okunur ve kimlik DBLP `ee`'den alınır. COLM kabul listesi sayfası challenge döndürüyor (kabul için
PDF başlığı ya da DBLP gerekir). Semantic Scholar toplu sorguda 429 verir; lesswrong 429; OpenAI, ISO, PNAS, ACM
DL ve OUP `urllib`'in varsayılan başlığına 403 döner — tarayıcı `User-Agent`'lı `curl`. Batch 17'nin kaynak
metinleri `artifacts/b17-research/pdf/*.txt` ve `html/*.txt` altında; PDF'ler (254 dosya, ~740 MB) build şişmesin
diye silindi, `.txt`'ler yerinde. `dblp-b17.json` b13–b16'dan tohumlandı (600+ anahtar); yeniden çalıştırılınca
yalnızca eksikleri sorar. İki fetch kopyası (`fetch-b17.py` ileri, `fetch-b17b.py` ters sıra) aynı `DONE`
listesini paylaşarak çakışmadan çalıştı; 75–78 için aynı düzen kullanılabilir (b18 kopyaları).

**Görselleştirme ihtiyaçları (öngörü):**
- 75: süperpozisyon şeması (n özellik > d boyut; oyuncak modelde özelliklerin açıya yerleşmesi; girişim); seyrek
  otokodlayıcı mimarisi (kodlayıcı → seyrek kod → çözücü; kayıp = yeniden kurma + seyreklik cezası); bir
  özelliğin "kimliği" tablosu (en çok etkinleştiği metinler ↔ müdahale sonucu ↔ ölü/emilmiş özellik).
- 76: yönlendirme vektörü şeması (aktivasyon + α·v; hangi katman, hangi konum); müdahale türleri tablosu (ekleme
  / çıkarma / yama / ağırlık düzenleme × ne değişir, ne bozulur, nasıl ölçülür); ret yönü ↔ doğruluk yönü ↔
  karakter vektörü karşılaştırması (62/65/66'nın devamı).
- 77: atıf yöntemleri tablosu (gradyan, oyun kuramı, pertürbasyon, etki fonksiyonu × sadakat sınavı × maliyet);
  sanity check şeması (rastgele ağırlıkla aynı ısı haritası); gerekçe sadakati ölçüm şeması (31/67'nin devamı:
  ipucu eklenince cevabın değişmesi ↔ gerekçenin ipucunu anmaması).
- 78: aynı eğrinin iki cetveli (doğrusal ↔ ikili puanlama; 9 ve 71'in devamı); ölçek–yetenek eğrisi
  (sıçrama ↔ sürekli ilerleme ölçüsü; 74'ün devamı); belirmenin öngörülebilirliği tablosu (yöntem × ne kadar
  önceden × hangi görevde).

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 18` ve `readingOrder` 75'ten kesintisiz
devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir (başlık değişecekse
entegrasyondan **önce**; 76, 77, 78 adayları yukarıda); YOL-HARITASI prerequisite grafı, kavram-tekrar defteri,
terim defteri ve bağlayıcı kararlar güncellenir (78 koordinatının "ödendi" satırı ve 74–77 bandının kapanışı
dâhil); doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki run hazırlığıyla
güncellenir. Kategori sorusu yok (#160); `reading-list-groups.test.ts` her hâlükârda çalıştırılır.

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
sorun değildir (Batch 13–16'da böyle girdi). Roadmap başlığı frontmatter başlığıyla birebir eşleşmek zorundadır.
**Entegrasyondan sonra makale gövdesine her dokunuşta `sync-series-hashes.cjs --write` yeniden çalıştırılır**
(Batch 16'da 70'in kaynak cümlesi entegrasyondan sonra düzeltildi ve hash yeniden yazıldı; SVG değişikliği
hash'i etkilemez, şekil **alt metni** etkiler). Araçların üçü de varsayılan olarak yalnızca AI serisini işler.

**Yayın öncesi zorunlu taramalar.** `artifacts/b17-research/scan-b17.py <makale.md> <N>` tek komutta veriyor:
kelime sayısı, parantezli gloss listesi (terim defteriyle karşılaştırmak için), yasaklı biçimler (`gömme`,
`korpus`, `geliştirme kümesi`, `niceleme`, `az/sıfır atışlı`, `çekişmeli`), **kendi numarası** ve **numaralı
ileri gönderme** (≥ N+1) taramaları, bölüm başlıkları, "Kendini yokla" ve şekil sayısı. İleri gönderme
taramasının bulguları elle ayıklanır (yüzde, puan, katılımcı sayısı ve eğri altı alan değerleri yanlış pozitif
verir). SVG için **iki** kapı: `check-series-svg.cjs` (viewBox, sabit renk, yasak öge, font boyutu, 720'ye
karşı taşma) ve `artifacts/b17-research/svgcheck-b17.py <klasör>` (sütuna binme, sağ/sol kenar, alt pay ≥ 12);
ayrıca her SVG `python -c "import xml.etree.ElementTree as ET; ET.parse(f)"` ile ayrıştırılır ve
`grep -c 'var(--[a-z-]*"'` ile kapanmamış `var(` parantezi aranır. Batch 17'de ikinci ölçer üç sütun binmesi, dört sağ kenar ve bir alt not taşması yakaladı; **PNG turu iki kusur daha buldu** (aynı satırda kayıtlı sütun olmayan komşu etiket; kendi `rect`'inden taşan metin) — ölçer kutu içi metni kutunun `x + width`'ine karşı ölçmüyor, bu iki durum elle ve PNG'de kontrol edilir.

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch 17'de de build ve
dev öncesinde 3000–3999 arası dinleyen port ve `node` süreci yoktu; yine de izole kopya kullanıldı ve ana
worktree'nin `.next` dizinine hiç dokunulmadı: `tar --exclude=./node_modules --exclude=./.next --exclude=./.git
--exclude=./artifacts --exclude=./.env.local -cf - . | (cd /d/dev/anil-lib-b17-render && tar xf -)`, junction
PowerShell ile `New-Item -ItemType Junction -Path 'D:\dev\anil-lib-b17-render\node_modules' -Target
'D:\dev\anil-lib\node_modules'`, kopyada `corepack pnpm build` (exit 0; `/seri/[slug]` 74 yol), sonra kopyanın
`.next`'i silinip `.claude/launch.json`'a geçici yapılandırma (`anil-lib-seri-b17`: Git Bash **tam yolu**,
`-lc`, `export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-b17-render && exec corepack pnpm dev -p 3210`).
**launch.json'ı Bash heredoc ile yazma:** `\\` çiftleri tek `\`'a iner ve dosya geçersiz JSON olur; Python
`json.dumps` ile ya da Write aracıyla yaz (Batch 17'de heredoc içindeki Python'da da `\\` tek `\`'a indi ve `\b` backspace oldu — **Write aracıyla** yazıldı; Git Bash'in yolu bu makinede `%LOCALAPPDATA%\Programs\Git\usr\bin\bash.exe`, `C:\Program Files\Git` yok). Kopyada `.env.local`
olmadığı için kapı kendiliğinden kapalı. `typecheck` ve `test` ana worktree'de çalıştırıldı. Temizlik: **önce**
`preview_stop`, sonra junction `cmd /c rmdir` ile kaldırılır (içeriği takip etmez; ardından ana `node_modules`
doğrulanır: `node_modules/next/package.json` yerinde), sonra kopya silinir; launch.json
`artifacts/b17-research/launch.json.orig`'ten geri alınır. Kural değişmedi: **ana worktree'de `.next` silme,
`pnpm build` ya da `next dev` başlatmadan önce `netstat` ve `tasklist` ile paralel süreç var mı bak.** Bash
aracında `cd` bir komuttan sonrakine taşınır — her komut `cd /d/dev/anil-lib;` ile başlar; Python Windows'ta
`/d/dev/...` yolunu tanımaz (`D:/...` verilir) ve konsola Türkçe basarken `sys.stdout.reconfigure(encoding='utf-8')`
ister.

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un bulgusu sürüyor.** Batch 17'de PDF'ler build'den
**önce** silindi (`artifacts/b17-research/pdf/*.pdf`, 254 dosya, ~740 MB); build zaten izole kopyada ve kopya
`artifacts`'ı içermiyor. Kalanlar (~27 MB): `pdf/*.txt`, `html/*.txt`, `dblp-b17.*`, `fetch-b17-report.json`,
`fetch-b17b-report.json`, `crossref-b17.json`, `cached-keys.txt`, `keys-b.txt`, `grab.py`, `scan-b17.py`,
`svgcheck-b17.py`, `sweep-b17.py`, `shots-b17.cjs`, `shots/*.png` (24 görüntü), `launch.json.orig`, loglar.

**Render doğrulama seti (Batch 17'de kullanılan).** Rota sweep'i Python `urllib` ile (75 rota, 36,3 sn;
`artifacts/b17-research/sweep-b17.py`), tarayıcı gezintisinden **önce**. Tarayıcı panosundan elle: `tabs_close`
ile eski `file://` sekmeleri kapatılıp `tabs_create` + `navigate` (`localhost:3210/seri/<slug>`); `browser_batch`
içinde `resize_window` (1440 / 768 / 375) ve `javascript_tool` ölçüm fonksiyonu (tema `documentElement.classList`
üzerinde `dark`/`sepia`; `scrollWidth > innerWidth`, figure/svg/figcaption/h2/blockquote sayıları,
`main.innerText` içinde `undefined`/`NaN` ve ham i18n anahtarı deseni); `read_console_messages` yalnızca 503.
375'te SVG'nin bounding rect'i viewport'u aşar — bu `.series-figure-scroll` tasarımıdır (`min-width: 34rem`,
kendi kabında yatay kaydırma), sayfa gövdesi taşmaz; kusur ölçüsü `scrollWidth`tir. **Şekil görüntüleri
Playwright'tan** (`shots-b17.cjs`; `#b17o` kaplayıcıda 1200 px klon, light/dark PNG): 12 şekil, 24 PNG + iki
yeniden çekim, Read aracıyla incelendi; iki kusur yalnızca PNG'de çıktı ve düzeltildi.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki betikler de lint
  kapsamındadır; bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer —
  beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur (Batch 17'de de yalnızca bu 503 görüldü).
- Ham HTML'de sayfa başına 39 "undefined" görünür; Next.js iskelesindendir ve yayımlanmış eski makalelerde de
  aynıdır. `main.innerText` ölçümünde 0'dır — regresyon değil.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor (`figScroll` 375'te false).
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` ve 720'ye karşı yatay taşmayı yakalar; **sütuna
  binmeyi, alt pay azlığını ve kapanmamış `var(` parantezini görmez** — bunun için `svgcheck-b17.py` ve grep
  kapısı var. Yayımlanmış eski şekillerin bir kısmında alt pay hâlâ küçüktür.
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde görünür (27–28, 29,
  30–40, 41–60); `safety-and-evaluation` 61–74 tek öbek. Kasıtlıdır; `reading-list-groups.test.ts` bunu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) ayrı bir üretim hattıyla ilerliyor; AI serisinin araçları o
  dizine dokunmaz. Build iki seriyi birden derler.
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor (`Karar`, `her`, `Yaşayan`, `yapılırsa` izleniyor;
  `**zorundadır**.` izlenmiyor). Build'i etkilemiyor; temizlik AI serisinin kapsamı dışıdır.
- Batch 12–16'nın üretimi (51–70) kullanıcı tarafından commit edildi (15–16: `C0MM`, 2026-09-06). **Batch 17 (71–74)
  çalışma ağacında commit edilmemiş** duruyor; commit/push kullanıcı kararıdır (SOZLESME kapsamı dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)
- **Batch 17 (2026-09-06):** Makale 71–74, Faz 8'in açılışı: değerlendirme bilimi → kirlilik ve ezber → insan
  değerlendirmesi ve hakem modeller → mekanistik yorumlanabilirlik. `BATCH=4+1`. Araştırma (274 kalemlik liste iki
  fetch kopyasıyla, 272 metin; 600+ DBLP `ee` sorgusu arka planda; Crossref `query.title`; PMLR ve ACL Anthology
  sayfaları), yazım, entegrasyon ve doğrulama ana oturumda, workflow/subagent kullanılmadan yapıldı. Faz 8'in
  kategorisi `safety-and-evaluation` olarak karara bağlandı (#160); iki başlık Türkçeleştirildi (73 "Hakem
  Modeller" #162, 74 "Mekanistik Yorumlanabilirlik" #163), 71'in "benchmark"ı kaldı (#161). **72 koordinatı
  kapandı, 74–77 bandının ilk taksidi ödendi**, yeni koordinat açılmadı (kararlar #160–#167). 159 kaynak kaleminin
  126'sı hakemli; DBLP yazım sonrası beş künyeyi hakemliye çevirdi. Kapılar: `pnpm typecheck` (0), 519 test,
  `pnpm build` (exit 0, `/seri/[slug]` 74 yol, izole kopyada), 75 rotanın tamamı 200 (36,3 sn), dört makale × üç
  genişlik × üç temada DOM ölçümü (taşma 0, sızıntı yok), 12 yeni diyagram Playwright ile light/dark PNG olarak
  alınıp gözle doğrulandı; PNG turu ölçerin kaçırdığı iki kusuru buldu (düzeltildi, yeniden çekildi). Paralel
  oturum görünmedi; build ve dev sunucusu izole kopyada (`D:\dev\anil-lib-b17-render`, 3210), launch.json
  geçici yapılandırması run sonunda geri alındı, kopya ve junction silindi; PDF'ler build'den önce silindi.

- **Batch 16 (2026-09-06):** Makale 67–70, Faz 7'nin kapanışı: aldatma ve durum farkındalığı → kötüye kullanım
  (siber, biyolojik, bilgi operasyonları) → yönetişim → sorumlu ölçekleme. `BATCH=4+1`. Araştırma (~140 aday PDF
  tek betikle; 110 DBLP `ee` sorgusu; 70 politika ve sağlayıcı sayfası; Crossref DOI; OSF ön baskısı; PMC tam
  metni), yazım, entegrasyon ve doğrulama ana oturumda, ultracode açık olmasına rağmen workflow/subagent
  kullanılmadan yapıldı. İki başlık Türkçeleştirildi: "Bio" → "Biyolojik" (karar #154), "Frontier" → "Sınır
  Model" (karar #155). **İki koordinat kapandı** (20'nin açık kaynak tanımı → 69; 20'nin açık ağırlık güvenliği
  → 68 + 70), yeni koordinat açılmadı (karar #159 dâhil kararlar #154–#159). 99 kaynak kaleminin 36'sı hakemli,
  9'u resmî belge, 54'ü işaretlenmiş hakemsiz kalem; 70'in tamamı hakemsiz ve bu gövdede söylendi. Kapılar:
  `pnpm typecheck` (0), 507 test, `pnpm build` (exit 0, `/seri/[slug]` 70 yol, izole kopyada), 71 rotanın tamamı
  200 (35,4 sn), dört makale × üç genişlik × üç temada DOM ölçümü (badFills ve outOfBox boş, taşma 0, sızıntı
  yok), 12 yeni diyagramın tamamı Playwright ile light/dark PNG olarak alınıp gözle doğrulandı. Yeni ölçer
  `svgcheck-b16.py` sütun binmelerini **yazım aşamasında** yakaladı; PNG turunda yeni kusur çıkmadı. Paralel
  oturum görünmedi; build ve dev sunucusu izole kopyada (`D:\dev\anil-lib-b16-render`, 3210), launch.json
  geçici yapılandırması run sonunda geri alındı, kopya ve junction silindi.
- **Batch 0 (2026-08-25):** Makale 1–5, `foundations`; seri altyapısı aynı görevde kuruldu.
- **Batch 1 (2026-08-26/27):** Makale 6–10, `models-and-training`. İnceleme turu 20 BLOCKER +
  ~40 MAJOR buldu (en ağırı: makale 9'un Kaplan tahsisinin baştan yanlış kurulması).
- **Batch 2 (2026-08-29):** Makale 11–14, serinin ilk `intermediate` kohortu. 191 test, 40 rota 200.
- **Batch 3 (2026-08-29):** Makale 15–18. 208 test, `pnpm build` (52 sayfa), 48 rota 200.
- **Batch 4 (2026-08-29):** Makale 19–22; Faz 2 kapandı, Faz 3 açıldı (karar #50). 223 test,
  59 sayfa, 55 rota 200.
- **Batch 5 (2026-08-30):** Makale 23–26; Faz 3'ün pencere/istem/bellek yayı. 241 test, 66 sayfa.
- **Batch 6 (2026-08-30):** Makale 27–30; Faz 3 kapandı. 29 `agents-and-retrieval` (karar #65).
  259 test, 73 sayfa, on iki şekil piksel görüntüsüyle doğrulandı.
- **Batch 7 (2026-08-30):** Makale 31–34; Faz 4'ün ilk yarısı. 277 test, 80 sayfa. Build ve render
  doğrulaması, paralel oturumun dev sunucusu yüzünden izole bir kopyada yürütüldü.
- **Batch 8 (2026-09-01):** Makale 35–38; akıl yürütmenin doğrulama–arama–biçimselleştirme–süreç
  denetimi dörtlüsü. 294 test, 87 sayfa, 39 rota 200. Üç hakemsiz kaynak bilinçli kullanıldı
  (karar #106).
- **Batch 9 (2026-09-02):** Makale 39–42. 39 ve 40 `reasoning-and-memory` ile Faz 4'ü kapattı;
  41 ve 42 `agents-and-retrieval` ile Faz 5'i açtı (karar #107). 419 test, 91 sayfa, 43 rota 200;
  on yedi kaynağın tamamı hakemli (karar #114); üç şekil metin binmesi yüzünden yeniden çizildi;
  build `artifacts/` şişmesiyle kırılıp dizin küçültülerek düzeldi.
- **Batch 10 (2026-09-02/03):** Makale 43–46, Faz 5'in gövdesi: vektör dizini → getirme hattı →
  RAG değerlendirmesi → getirerek akıl yürütme. `BATCH=4+1`. Araştırma, yazım, entegrasyon ve
  doğrulama ana oturumda, workflow/subagent kullanılmadan yapıldı. Üç başlık Türkçeleştirildi
  (karar #115). 51 kaynağın tamamı hakemli (karar #120). Kapılar: 431 test, `pnpm build` (95 sayfa),
  47 rotanın tamamı 200, üç genişlik × üç temada DOM ölçümü, 12 yeni diyagram light/dark ekran
  görüntüsüyle doğrulandı; render izole kopyada (3210).
- **Batch 11 (2026-09-03/04):** Makale 47–50, Faz 5'in kapanışı: işlev çağrısı → web/kod/dosya
  arayüzleri → MCP ve ekosistem → tazelik, çatışma ve atıf. `BATCH=4+1`. Araştırma (50 PDF tek
  betikle, DBLP 50 başlık), yazım, entegrasyon ve doğrulama ana oturumda, workflow/subagent
  kullanılmadan yapıldı. 47'nin başlığı Türkçeleştirildi (karar #121). 50 kaynak kaleminin 44'ü
  hakemli; altı resmî belgelendirme/ön çalışma işaretlenerek kullanıldı (karar #127). Kapılar:
  `pnpm typecheck`, 446 test, `pnpm build` (99 sayfa, izole kopyada), 51 rotanın tamamı 200, dört
  makale × üç genişlik × üç temada DOM ölçümü, 11 yeni diyagram light/dark ekran görüntüsüyle
  doğrulandı (üç şekil düzeltildi).
- **Batch 12 (2026-09-04/05):** Makale 51–54, Faz 6'nın açılışı: ajan tanımı ve kontrol döngüsü →
  tek ajan mimarileri ve hata döngüleri → çoklu ajan sistemleri → bilgisayar kullanan ajanlar.
  `BATCH=4+1`. Araştırma (63 aday PDF tek betikle, başlık eşleştirmeli; DBLP `ee` ile iki koşu),
  yazım, entegrasyon ve doğrulama ana oturumda, ultracode açık olmasına rağmen workflow/subagent
  kullanılmadan yapıldı (kullanıcının Batch 10 talimatı). Başlıklar değişmedi; Faz 6 kategorisi
  `agents-and-retrieval` (karar #128). 47 kaynak kaleminin 46'sı hakemli ya da klasik temel eser;
  bir resmî belgelendirme işaretlenerek kullanıldı (karar #134). Kapılar: `pnpm typecheck`, 458 test,
  `pnpm build` (103 sayfa, exit 0, izole kopyada), 55 rotanın tamamı 200 (22 sn), dört makale × üç
  genişlik × üç temada tarayıcı panosundan DOM ölçümü, 12 yeni diyagramın tamamı light+dark olarak
  gözle doğrulandı; denetleyicinin görmediği iki kusur yakalanıp düzeltildi.
- **Batch 13 (2026-09-05):** Makale 55–58, Faz 6'nın ikinci yarısı: kod yazan ajanlar → ajan belleği
  ve durum yönetimi → ajan değerlendirmesi → ajan güvenliği (istem enjeksiyonu ve kum havuzu).
  `BATCH=4+1`. Araştırma (72 aday PDF tek betikle, başlık eşleştirmeli; DBLP `ee` arka planda 72
  başlık; Crossref, ICLR proceedings, COLM listesi, PMLR dizini ayrıştırması), yazım, entegrasyon ve
  doğrulama ana oturumda, ultracode açık olmasına rağmen workflow/subagent kullanılmadan yapıldı. 58'in
  başlığı Türkçeleştirildi (karar #135). 58 kaynak kaleminin 51'i hakemli ya da klasik temel eser; yedi
  hakemsiz kalem işaretlenerek kullanıldı (karar #141). Kapılar: `pnpm typecheck` (0), 470 test,
  `pnpm build` (107 sayfa, exit 0, izole kopyada), 59 rotanın tamamı 200 (48,5 sn), dört makale × üç
  genişlik × üç temada tarayıcı panosundan DOM ölçümü (badFills ve outOfBox boş, taşma 0, sızıntı
  yok), 12 yeni diyagramın tamamı light/dark ekran görüntüsüyle gözle doğrulandı; denetleyici üç SVG
  taşmasını, Python taraması bir numaralı ileri göndermeyi yayından önce yakaladı. Paralel oturum
  görünmedi; build ve dev sunucusu izole kopyada (`D:\dev\anil-lib-b13-render`, 3210), launch.json
  geçici yapılandırması run sonunda geri alındı, kopya ve junction silindi.
- **Batch 14 (2026-09-05):** Makale 59–62: Faz 6'nın kapanışı (insan–ajan işbirliği: denetim ve devir →
  ajan ekonomisi: maliyet, gecikme, güvenilirlik) ve Faz 7'nin açılışı (hizalama sorunu → güvenlik
  eğitimi: reddetme, sınırlar ve dengeler). `BATCH=4+1`. Araştırma (72 aday PDF tek betikle; DBLP `ee` 72
  başlık; Crossref `query.title` dergiler için; Semantic Scholar açık kopya; `papers.nips.cc` yıl dizinleri;
  sağlayıcı belgeleri), yazım, entegrasyon ve doğrulama ana oturumda, ultracode açık olmasına rağmen
  workflow/subagent kullanılmadan yapıldı. Başlıklar değişmedi; Faz 7 kategorisi `safety-and-evaluation`
  (karar #142), kohort iki kategoriye yayıldı. 71 kaynak kaleminin 52'si hakemli ya da klasik temel eser;
  on dokuz hakemsiz kalem işaretlenerek kullanıldı (karar #147). Kapılar: `pnpm typecheck` (0), 482 test,
  `pnpm build` (111 sayfa, exit 0, izole kopyada), 63 rotanın tamamı 200 (28,7 sn), dört makale × üç
  genişlik × üç temada tarayıcı panosundan DOM ölçümü (badFills ve outOfBox boş, taşma 0, sızıntı yok),
  12 yeni diyagramın tamamı light/dark ekran görüntüsüyle gözle doğrulandı; denetleyici döndürülmüş
  etiket ve uzun alt not taşmalarını, ekran görüntüsü bir gösterge binmesini (61-Şekil 3) yayından önce
  yakaladı; kendi-numarası taraması 62'de bir kaçak buldu. Paralel oturum görünmedi; build ve dev
  sunucusu izole kopyada (`D:\dev\anil-lib-b14-render`, 3210), launch.json geçici yapılandırması run
  sonunda geri alındı, kopya ve junction silindi.
- **Batch 15 (2026-09-05):** Makale 63–66, Faz 7'nin gövdesi: jailbreak ve kırmızı takım → Constitutional AI
  ve ölçeklenebilir denetim → belirsizlik ve kalibrasyon → dalkavukluk ve model karakteri. `BATCH=4+1`. Araştırma
  (~140 aday PDF tek betikle; DBLP `ee`; Crossref DOI; PMLR ve NeurIPS sayfa başlıkları; Europe PMC `fullTextXML`;
  PMLR 267 dizini; sağlayıcı belgeleri), yazım, entegrasyon ve doğrulama ana oturumda, ultracode açık olmasına
  rağmen workflow/subagent kullanılmadan yapıldı. "jailbreak" başlıkta korundu (karar #148); 64 koordinatı
  ödendi, yeni koordinat açılmadı (karar #153). 84 kaynak kaleminin 54'ü hakemli, biri klasik temel eser; otuz
  hakemsiz kalem işaretlenerek kullanıldı (karar #152). Kapılar: `pnpm typecheck` (0), 495 test, `pnpm build`
  (exit 0, `/seri/[slug]` 66 yol, izole kopyada), 67 rotanın tamamı 200 (40,5 sn), dört makale × üç genişlik ×
  üç temada tarayıcı panosundan DOM ölçümü (badFills ve outOfBox boş, taşma 0, sızıntı yok), 13 yeni diyagramın
  tamamı Playwright ile light/dark PNG olarak alınıp gözle doğrulandı; denetleyici altı taşmayı, görüntü
  denetleyicinin görmediği beş binmeyi yayından önce yakaladı; kendi-numarası ve ileri gönderme taramaları
  kaçak bulmadı. Paralel oturum görünmedi; build ve dev sunucusu izole kopyada (`D:\dev\anil-lib-b15-render`,
  3210), launch.json geçici yapılandırması run sonunda geri alındı, kopya ve junction silindi.
- Batch 0/1'in ham üretim kayıtları `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv** olarak
  durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
