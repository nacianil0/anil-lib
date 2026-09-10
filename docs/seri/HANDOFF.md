# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-10 · Durum: **1–90 yayında (kohort Batch 0 → Batch 21) · Faz 9 kapandı · Sıradaki: 91 (Faz 10'un açılışı 91–94)**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 90 — `enerji-maliyet-ve-cevresel-ayak-izi` |
| Sıradaki güvenli başlangıç | Makale 91 ("Vektörler ve Matrisler: Embedding'in Matematiği"); run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 91, 92, 93 ve 94 üretilir; bu dörtlü **Faz 10'un açılışıdır** ve Faz 10 yedi makaledir (91–97), yani dörtlü fazı kapatmaz. **Bu dörtlüde bağlayıcı numaralı koordinat YOKTUR** — defterde açık kalan tek koordinat 101'dir ve bu banda düşmüyor. Devralınan numarasız işaret: 90 → Faz 10 ("serinin bir sonraki fazı": sezgiyle kurulan kavramların biçimsel yeniden kurulumu) ve 90 → 91 ("bir sonraki makale": bir kelimenin sayı dizisine çevrilmesi hangi matematiksel nesneyi kuruyordu). Devrolan planlı tekrar: 33/40'ın pass@k ile görev ufku **hâlâ tahsil edilmedi**; 101 uygun görünüyor, bu dörtlüde yeri yok |
| Sıradaki kohort | `classification_batch: 22` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs`; ek ölçerler `artifacts/b21-research/` altında: `scan-b21.py`, `svgcheck-b21.py`, `sweep-b21.py`, `shots-b21.cjs`, `refcheck-b21.py` (gövdedeki `N\. makale` kaçışlarını denetler), `idx-b21.py` (konferans dizinlerini indirir ve başlık arar), **`url-b21.py`** (dizinden mutlak URL çözme — hash URL'leri için zorunlu), **`acl-b21.py`** (ACL Anthology'de başlıktan URL; href'ler tırnaksız), **`links-b21.py`** (yayın öncesi bağlantı taraması), **`doi-b21.py`** (Crossref künye doğrulama), `venue-b21.py`, `hdr-b21.py`, `q.py` (kaynak metinlerde hızlı sorgu), `fetch-b21.py` (`REVERSE=1` ile ters kopya; kaynak listesi `items_b21.py`'de) |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–80 `safety-and-evaluation`; **81–90 `multimodal-and-future`** (kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142, #148, #160, #168, #176, **#192**). Okuma listesinde 61–80 tek öbek, 81–90 tek öbek; `reading-list-groups.test.ts` değişmedi. **Sıradaki run'da kategori sorusu VARDIR: Faz 10 (91–97) için kategori kararı 91'in run'ında verilecek.** Kontrollü sözlükte kullanılmamış tek kategori `case-studies`; Faz 10 matematiksel omurga olduğu için ona uymuyor, dolayısıyla mevcut kategorilerden biri seçilecek (`foundations` ile `models-and-training` en yakın adaylar; karar gerekçesiyle birlikte YOL-HARITASI'na yazılır) |

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları hâlâ İngilizce alan
  terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning ve Test-Time
  Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim defterine göre Türkçeleştiriliyor
  (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135, #148, #154, #155, #162, #163, #169, #170, #171,
  #177, #178, #184, #185). Katmanın tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
  Faz 8 ve Faz 9'un başlıkları zaten Türkçe.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler — sıradaki dörtlüde bir aday VAR.** 91'in taslak başlığı
  "Vektörler ve Matrisler: **Embedding'in** Matematiği"; "embedding" terim defterinde Türkçeleştirilmeyen
  kalemdir (4. makale, "gömme kullanılmaz"), dolayısıyla başlıkta kalması #108'in kısaltma/ödünç sözcük
  sınıfına uyar — yine de karar 91'in run'ında açıkça verilmeli. 92 ("Rank, Özdeğer ve SVD"), 93 ve 94'ün
  başlıkları sorunsuz. **Bandın dışında bekleyen aday hâlâ 108** ("Performans Mühendisliği: Attention'ı
  Hızlandırmak") — 86'nın başlığı "Dikkatin Ötesi" yapıldığı için (#185) aynı sözcük 108'de de
  Türkçeleştirilmeli görünüyor; karar 108'in kendi run'ında verilir. Başlık değişikliği entegrasyondan
  **önce** `roadmap.json`'a yazılır.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış vaatler"dedir.
  Batch 21 **bir numarasız işaret ödedi** (34 → 87: damıtmanın temel modelin sınırını aşması) ve 86'nın
  "bir sonraki makale" devrini karşıladı; yeni koordinat açmadı. **Defterde açık kalan TEK koordinat: 101**
  (ölçümün disiplini — 16 ve 22). Numarasız işaretler: 51 → 111, 49/53 → 115, 90 → Faz 10. Devrolan planlı
  tekrar: 33/40'ın pass@k ile görev ufku **tahsil edilmedi ve devrolur** (101 daha uygun görünüyor).
- **Prerequisite grafında 79–82 boşluğu.** YOL-HARITASI'ndaki graf satırları 78'de kesiliyor; Batch 19 kendi
  dörtlüsünün satırlarını eklemedi. Batch 20 (83–86) ve Batch 21 (87–90) kendi satırlarını ekledi. Devrolan
  eksik; ileride toplu kapatılabilir, hiçbir kapı buna bağlı değil.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR hâlâ uygulanmadı; tam listeler
  repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(15) önceki batch'lerden (kararlar #21, #97, #104, #106,
  #114, #120, #127, #134, #141, #147, #152, #159, #167, #175, #183). **Batch 20 ve Batch 21'de doğrulanamayan
  künye yok** (kararlar #191, #198). Batch 21'in tek kısıtı okunabilirlik tarafında: çatı çizgisi makalesinin
  kamuya açık PDF'i bozuk yazı tipi kodlamasıyla çıkıyor ve sayıları bir yer değiştirme tablosuyla çözüldü;
  yalnızca birbirini doğrulayan değerler kullanıldı (karar #199).
- **Hakemsiz kaynak oranı Batch 21'de 48 kalemin 8'i (karar #198).** Yani 40 hakemli. Batch 20: 58/68,
  Batch 19: 68/75. Kural değişmedi: hakemli karşılığı varsa o öne çıkar. **Bu run'ın dersi Batch 20'nin
  dersinin tekrarı:** ön baskı başlığı ile yayımlanmış başlık farklı olabiliyor ve dizin araması bu yüzden
  boş dönüyor — ICLR 2024'teki başlık "…Proprietary **Language Models**", ön baskı "…Proprietary LLMs".
  İkinci ders yeni: **venue tahminini dosya adına yazma**; MELT çalışmasının anahtarı `mobisys` diye açılmıştı,
  mecra MobiCom 2024 çıktı.
- **DBLP kapalı (Batch 18'den beri), Semantic Scholar 429.** Venue doğrulaması `idx-b21.py` dizin düzeni +
  OpenReview arama ucu + `iclr.cc` kabul listeleri + Crossref ile yapılır (aşağıda).

## Next batch preparation — 91'den devam (Faz 10'un açılışı: 91–94)

**Pedagojik hedefler.** Batch 21'in sonunda okuyucu şunu biliyor: aynı kaliteyi daha az kaynakla vermenin
üçüncü yolu eğitimden geçiyor ve aktarılan şey etiket değil fonksiyondur — sıcaklık o fonksiyonu okunur kılar
(67/146/74; hiç görülmemiş sınıfta yüzde 98,6), aynı boyuttaki öğrenci öğretmenini geçebiliyor
(6,69 → 6,64 … ama 3,77 → 3,86), aynı bütçenin iki yolu ölçülmüş (60,3 ↔ 67,7) ve damıtmanın bir tavanı ile
bir kapasite boşluğu var; geniş kapsamlı taklit biçimi aktarıyor içeriği değil (17 → 10 ↔ 22) ve sınırı aşmak
öğretmenin nerede olduğuna bağlı (72,6 ↔ 47,0) — 87. Cihazda yığın birdir, dolayısıyla bulutun bütün servis
mühendisliğinin paydası kayboluyor; dört kısıt aynı anda bağlıyor ve sınırı çoğu zaman ısı koyuyor (47,9 °C);
bir üretim modelinin anatomisi kalem kalem okunabiliyor (2 bit, 4 bit, 8 bit, yüzde 37,5) ve daha az bit her
zaman daha hızlı değil (yüzde 24,77) — 88. "Bayt başına 229 işlem" aslında sırt noktasıdır; hesap, bellek bandı
ve iletişim bandı yirmi yılda 60.000 / 100 / 30 kat büyüdü; hızlandırıcıyı hızlı yapan şey çıkarılanlardır ve
tepe hız ile ulaşılan hız ayrı sayılardır (yüzde 52); donanım hangi fikrin kazanacağını da etkiliyor — 89.
Bir enerji sayısı dört halkalı bir zincirin çıktısıdır ve her halkada bir varsayım vardır; enerji ile karbon
ayrı ölçülerdir (433 MWh / 25 ton ↔ 324 MWh / 70 ton); aynı istem iki sınırla 0,10 ve 0,24 vat-saat; birim
düşerken toplam yükselebilir ve para ile enerji ayrı eğrilerdir — 90.

**Sıradaki makaleler ve prerequisite'ler.** Faz 10 bir **bilinçli formalizasyon** fazıdır (SOZLESME §3): erken
makalelerde sezgiyle kurulan kavramlar burada biçimsel düzeyde yeniden kurulur ve bu tekrar sayılmaz.
**91 ← 4** (embedding ve dağılımsal hipotez; vektör uzayının kendisi), 3 (katman = doğrusal dönüşüm + aktivasyon),
6 (dikkatin nokta çarpımı: benzerliğin geometrisi), 7 (matris çarpımının mimarideki yeri), 42 (kosinüs benzerliği
ve yoğun getirme), 89 (matris çarpımının donanımdaki ayrıcalığı — neden bu işlem). **92 ← 91**, 19 (LoRA'nın
düşük ranklılığı: burada matematiği kuruluyor), 74–77 (yorumlanabilirliğin alt uzay dili), 87 (budama ve seyrek
alt ağın rank okuması), 43 (ürün kuantizasyonu ve alt uzaylar). **93 ← 5** (dil modelleme hedefi; olasılık
dağılımı), 2 (kayıp fonksiyonunun olasılıksal kimliği), 10 (örnekleme, sıcaklık ve çekirdek örnekleme),
33 (kapsama = en az bir denemede başarı olasılığı), 65 (kalibrasyon). **94 ← 93**, 2 ve 5 (çapraz entropi ve
perplexity'nin biçimsel kimliği), 9 (kayıp eğrilerinin birimi: nat/token), 13 (KL ıraksamasının tercih
optimizasyonundaki yeri — 13'ün numarasız işareti burada tahsil edilebilir), 87 (damıtma kaybının KL biçimi).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Embedding ve dağılımsal hipotez (4), nokta çarpım (6), kosinüs benzerliği (42) → 91.
- Düşük ranklı uyarlama (19), alt uzay ve yön (74–77) → 92.
- Örnekleme ve sıcaklık (10), kalibrasyon (65), kapsama (33) → 93.
- Perplexity (5), çapraz entropi kaybı (2), KL cezası (13) → 94. **13'ün "KL ıraksamasının biçimsel kurulumu"
  numarasız işareti 94'te tahsil edilmelidir** (YOL-HARITASI, Batch 2 numarasız işaretleri).
- Devrolan planlı tekrarlar: pass@k (33) ve görev ufku (40) → 101 önerilir.

**Araştırılacak güncel akademik alanlar (91 için öncelikli):** bu faz klasik matematik üzerine kurulu olduğu
için kaynak profili değişiyor — birincil kaynakların çoğu ders kitabı ve klasik makale olacak. 91 için: vektör
uzayı ve doğrusal dönüşüm (Strang'ın ders kitabı; Axler), dağılımsal anlambilimin matematiği (Mikolov ve ark.
word2vec; Pennington ve ark. GloVe EMNLP 2014; Levy & Goldberg NeurIPS 2014 — matris ayrıştırması bağlantısı),
benzerlik ölçüleri ve norm seçimi, yüksek boyutta uzaklığın davranışı (Aggarwal ve ark. ICDT 2001),
izotropi tartışması (Ethayarajh EMNLP 2019; Mu & Viswanath ICLR 2018). **92 için:** SVD ve düşük ranklı
yaklaşım (Eckart–Young teoremi; Golub & Van Loan), LoRA'nın rank varsayımı (Hu ve ark. ICLR 2022 — 19'da
kullanıldı), içsel boyut (Aghajanyan ve ark. ACL 2021), rastgele izdüşüm (Johnson–Lindenstrauss),
seyrek otokodlayıcının doğrusal cebri (75'te kullanıldı). **93 için:** olasılık uzayı ve beklenti, en büyük
olabilirlik (Fisher), üstel aile, örnekleme yöntemleri, kalibrasyonun olasılıksal tanımı (Guo ve ark. ICML 2017
— 65'te kullanıldı). **94 için:** Shannon 1948, çapraz entropi ve KL'nin tanımı (Kullback & Leibler 1951),
bilgi kuramının dil modellemedeki kullanımı (Brown ve ark. 1992 — "An Estimate of an Upper Bound for the
Entropy of English"), perplexity'nin tanımı, ve KL'nin tercih optimizasyonundaki rolü (13'te kullanılan
kaynaklar). Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları
SOZLESME §9'dadır. **Uyarı:** ders kitabı kaynakları için sayfa/bölüm numarası verilmeli ve doğrulanabilir bir
bağlantı bulunmalı; bulunamıyorsa iddia kitaba değil, hakemli bir makaleye dayandırılmalı.

**Görselleştirme ihtiyaçları (öngörü):**
- 91: aynı vektörün iki okunuşu — koordinat listesi ↔ uzaydaki yön; ve bir doğrusal dönüşümün ne yaptığı
  (küçük, gerçekten hesaplanabilir bir matrisle).
- 92: bir matrisin tekil değerlerinin düşüşü ve düşük ranklı yaklaşımın hangi bilgiyi attığı; LoRA'nın
  parametre sayısının rankla nasıl değiştiği (ölçülmüş sayılarla).
- 93: aynı dağılımın üç okunuşu (yoğunluk, beklenti, örnekleme) ve sıcaklığın dağılımı nasıl değiştirdiği.
- 94: çapraz entropi ile KL'nin farkı tek şekilde — hangi terim modelden, hangi terim veriden geliyor;
  ve perplexity'nin nat/token ile ilişkisi.

**Venue doğrulaması — düzen Batch 21'de iki kanal daha kazandı.** `artifacts/b21-research/idx-b21.py`:
`python idx-b21.py fetch` konferans dizinlerini `idx/` altına indirir (bir kez), `python idx-b21.py "başlık" ...`
hepsinde birden arar. **Çalışan kaynaklar:** `proceedings.iclr.cc/paper_files/paper/2024|2025|2026` (2023 ve
öncesi 404), `papers.nips.cc/paper_files/paper/2014…2025`, `proceedings.mlr.press/v37…v267` (ICML 2015–2025;
**v48 = ICML 2016 ve v54 = AISTATS 2017 bu run'da eklendi**; v306 = ICML 2026 hâlâ 404), `jmlr.org/tmlr/papers`,
`openaccess.thecvf.com/CVPR2019…CVPR2025` ve `ICCV2019|2021|2023|2025`, `ecva.net/papers.php` (ECCV 2018–2024),
`proceedings.mlsys.org/paper_files/paper/2020…2025`,
`datasets-benchmarks-proceedings.neurips.cc/paper_files/paper/2021`,
**`aclanthology.org/events/acl-<yıl>` ve `events/emnlp-<yıl>`** (bu run'da eklendi; sayfalar 3–12 MB),
**`iclr.cc/virtual/<yıl>/papers.html`** (2018, 2019, 2021, 2022, 2023 indi; 2015–2017 404).
**Batch 21'de eklenen araç:** `acl-b21.py` — ACL Anthology sayfalarında `href` **tırnaksız** yazıldığı için
(`href=/D16-1139/`) Batch 20'nin URL çözücüsü hiçbir şey bulamıyordu; ayrı bir regex gerekti.
İkinci kanal `venue-b21.py`: arXiv API'nin `comment` ve `journal_ref` alanları + Crossref `query.bibliographic`
+ OpenAlex (**not:** kaynak listesini artık `items_b21.py`'den okur). Üçüncü kanal `hdr-b21.py`: PDF ilk sayfa
yayın satırı. `doi-b21.py` tek tek DOI doğrular. **OpenReview arama ucu** —
`https://api2.openreview.net/notes/search?term=Kelime+Kelime&source=forum&limit=6` — bu run'da yine belirleyici
oldu ve yayımlanmış başlığın ön baskıdan farklı olduğunu gösterdi; terimleri `+` ile ayır, ardışık sorgular
arasında 3–4 sn bekle. **Tuzaklar:** PMLR slug'ı yayımlanmış sürümdeki ilk yazardan türer; ön baskı başlığı
farklı olabilir; NeurIPS hash URL'si elle yazılmaz (`url-b21.py`); **venue tahmini dosya adına yazılmaz**
(MELT `mobisys` diye açılmıştı, MobiCom çıktı). Batch 21'in kaynak metinleri `artifacts/b21-research/pdf/*.txt`
altında (109 metin; sekizi Batch 20'den taşındı); PDF'ler build şişmesin diye silinir, `.txt`'ler yerinde
kalır (`q.py` ile sorgulanır).

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 22` ve `readingOrder` 91'den kesintisiz
devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir (başlık değişecekse
entegrasyondan **önce**); YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve bağlayıcı
kararlar güncellenir; doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki run
hazırlığıyla güncellenir. **Kategori sorusu VARDIR** (Faz 10) ve karar gerekçesiyle YOL-HARITASI'na yazılır;
yeni bir kategori dizini açılacaksa `content/series/articles/<kategori>/` oluşturulur ve
`reading-list-groups.test.ts` **mutlaka** çalıştırılır — Faz 9'un kapanmasıyla 81–90 tek öbek olarak
tamamlandı, yeni bir kategori yeni bir öbek demektir.

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
sorun değildir. **`reading_order` frontmatter'da zorunludur ve unutulursa `entegre-batch` dört makale için
on altı hata birden verir** (bu run'da oldu). Roadmap başlığı frontmatter başlığıyla birebir eşleşmek
zorundadır. **Entegrasyondan sonra makale gövdesine her dokunuşta `sync-series-hashes.cjs --write` yeniden
çalıştırılır.** SVG'nin **kendisi** hash'i etkilemez, şekil **alt metni** etkiler. Araçların üçü de varsayılan
olarak yalnızca AI serisini işler.

**Yayın öncesi zorunlu taramalar.** `artifacts/b21-research/scan-b21.py <makale.md> <N>` tek komutta veriyor:
kelime sayısı, parantezli gloss listesi, yasaklı biçimler (`gömme`, `korpus`, `geliştirme kümesi`, `niceleme`,
`az/sıfır atışlı`, `çekişmeli`), **kendi numarası** ve **numaralı ileri gönderme** (≥ N+1) taramaları, bölüm
başlıkları, "Kendini yokla" ve şekil sayısı. **Uyarı:** `scan-b21.py`'nin kelime sayısı şekil alt metinlerini de
sayar, repo kapısı saymaz; bant kararı için `check-series-content.cjs`'in sayısına bakılır — pratik kestirim,
düzyazının şekil sözdizimi ve bağlantı hedefleri çıkarılmış `wc -w`'sidir (Batch 21'de 2.004–2.389). İleri
gönderme taramasının bulguları elle ayıklanır (yüzde, MATH-500 gibi ölçüt adları ve hata sayıları yanlış pozitif
verir). **Ayrıca `refcheck-b21.py <makale.md> ...`** gövdedeki `N\. makale` göndermelerinin markdown kaçışını
denetler (kaçışsız olan Markdown'da numaralı liste olur). SVG için **iki** kapı: `check-series-svg.cjs`
(viewBox, sabit renk, yasak öge, font boyutu; genişlik tahmini **0,55 × font-size**) ve
`artifacts/b21-research/svgcheck-b21.py <klasör>` (aynı satırdaki her metin çifti, kutu içi metnin `x + width`'i,
sağ/sol kenar, alt pay ≥ 12 ve repo kapısının 0,55 tahmininin taklidi); ayrıca her SVG
`python -c "import xml.etree.ElementTree as ET; ET.parse(f)"` ile ayrıştırılır ve `grep -c 'var(--[a-z-]*"'` ile
kapanmamış `var(` parantezi aranır. **Bağlantı kapısı:** `links-b21.py <makale.md> ...` her `[Bağlantı](...)`
adresini çeker ve `<title>`'ı yazar; ACM/IEEE/Science DOI'leri ve Nature 403 döndürür — bu beklenen bot
duvarıdır ve künye Crossref'ten doğrulanır. **PNG turu Batch 21'de de kusur buldu** (yarım kalan bir hücre
cümlesi ve etikete değen bir kılavuz çizgisi); geometri kapıları geçse de göz turu şart. **Ayrıca:** yeni bir
ölçü çifti ya da yeni bir terim kurulacaksa YOL-HARITASI terim defterinin ilgili satırları **yazımdan önce**
aranmalı; bu run'da uygulandı ve geri dönüş gerekmedi.

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch 21'de de
3000–3999 arası dinleyen port yoktu; yine de izole kopya kullanıldı ve ana worktree'nin `.next` dizinine hiç
dokunulmadı: `tar --exclude=./node_modules --exclude=./.next --exclude=./.git --exclude=./artifacts
--exclude=./.env.local -cf - . | (cd /d/dev/anil-lib-b21-render && tar xf -)`, junction PowerShell ile
`New-Item -ItemType Junction -Path 'D:\dev\anil-lib-b21-render\node_modules' -Target 'D:\dev\anil-lib\node_modules'`,
kopyada `corepack pnpm build` (exit 0; `/seri/[slug]` 90 yol, 139 statik sayfa), sonra kopyanın `.next`'i
silinip `.claude/launch.json`'a geçici yapılandırma (`anil-lib-seri-b21`: Git Bash **tam yolu**, `-lc`,
`export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-b21-render && exec corepack pnpm dev -p 3210`).
**launch.json'ı Bash heredoc ya da Python heredoc ile yazma:** `\\` çiftleri tek `\`'a iner; Write aracıyla yaz
(Git Bash'in yolu bu makinede `%LOCALAPPDATA%\Programs\Git\usr\bin\bash.exe`). Kopyada `.env.local` olmadığı için
kapı kendiliğinden kapalı. `typecheck` ve `test` ana worktree'de çalıştırıldı. **Kopya oluşturulduktan sonra ana
worktree'de içerik değişirse dosyayı kopyaya senkronlamak yetmiyor:** dev sunucusu derlenmiş sayfayı önbelleğe
aldığı için `preview_stop` + `preview_start` gerekiyor. Temizlik: **önce** `preview_stop`, sonra junction
`cmd //c rmdir` ile kaldırılır, ardından ana `node_modules` doğrulanır (`node_modules/next/package.json`
yerinde ve `pnpm test` yeşil), sonra kopya silinir; launch.json `git checkout -- .claude/launch.json` ile geri
alınır. Kural değişmedi: **ana worktree'de `.next` silme, `pnpm build` ya da `next dev` başlatmadan önce
`netstat` ve `tasklist` ile paralel süreç var mı bak.** Bash aracında `cd` bir komuttan sonrakine taşınır —
her komut `cd /d/dev/anil-lib;` ile başlar; Python Windows'ta `/d/dev/...` yolunu tanımaz (`D:/...` verilir) ve
konsola Türkçe basarken `sys.stdout.reconfigure(encoding="utf-8")` ister. **Bash aracında uzun Python
heredoc'ları bazen ayrıştırma hatası veriyor** ("unexpected EOF while looking for matching"); uzun betikler
Write aracıyla `artifacts/b21-research/` altına yazılıp `python <dosya>` ile çalıştırılmalı.

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un bulgusu sürüyor.** Batch 21'de PDF'ler build'den
**önce** silindi (`artifacts/b21-research/pdf/*.pdf`); build zaten izole kopyada ve kopya `artifacts`'ı
içermiyor. Kalanlar: `pdf/*.txt` (109), `idx/*.html` (ACL/EMNLP dâhil 65), `fetch-b21-report.json`, betikler,
`shots/*.png` (24), `launch.json.orig`, loglar.

**Render doğrulama seti (Batch 21'de kullanılan).** Rota sweep'i Python `urllib` ile (91 rota, 65,6 sn;
`artifacts/b21-research/sweep-b21.py`), tarayıcı gezintisinden **önce**. Tarayıcı panosundan: `preview_start`
(`anil-lib-seri-b21`) → `resize_window` ile **açık genişlik/yükseklik** (1440×900, 768×1024, 375×812; `preset:
"desktop"` emülasyonu **temizler**, ölçüm için kullanılmaz) → `javascript_tool` ile tema döngüsü
(`documentElement.classList` üzerinde `dark`/`sepia`) ve ölçüm (`scrollWidth > innerWidth`,
figure/svg/figcaption/h2/blockquote sayıları, `main.innerText` içinde `undefined`/`NaN` ve ham i18n anahtarı
deseni). **Ölçümden önce `await new Promise(r=>setTimeout(r,1800))` koy:** sayfa yerleşimi oturmadan okunan SVG
genişliği yanlış çıkıyor (bu run'da 609 px okundu, oturunca 771 oldu). **`browser_batch` içindeki JSON'da regex
kaçışlarına dikkat** — `\\.` gibi diziler "Unexpected end of input" veriyor; regex'i
`new RegExp('[a-z]+[.][a-z]+[.][a-z]+','g')` gibi köşeli parantezle kur; Türkçe karakterleri JS dizesine
`\u...` kaçışıyla koy. Ölçülen genişlikler: 1440'ta SVG 771 px, 768'de 676 px, 375'te 351 px — üçünde de yatay
kaydırma yok. **Şekil görüntüleri Playwright'tan** (`shots-b21.cjs`; `#b21o` kaplayıcıda 1200 px klon,
light/dark PNG): 12 şekil, 24 PNG, Read aracıyla incelendi.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki betikler de lint
  kapsamındadır; bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer —
  beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur (Batch 21'de de yalnızca bu 503).
- Ham HTML'de sayfa başına 39 "undefined" görünür; Next.js iskelesindendir ve yayımlanmış eski makalelerde de
  aynıdır. `main.innerText` ölçümünde 0'dır — regresyon değil.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` ve genişliğe karşı yatay taşmayı yakalar; **sütuna
  binmeyi, kutudan taşmayı ve kapanmamış `var(` parantezini görmez** — bunun için `svgcheck-b21.py` ve grep
  kapısı var. İki ölçerin karakter genişliği tahmini farklıdır (6,8 ↔ 7,15); repo kapısı daha muhafazakârdır.
  **Hiçbiri yarım kalmış cümleyi ya da etikete değen çizgiyi görmez** — PNG turu bu yüzden zorunlu.
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde görünür (27–28, 29,
  30–40, 41–60); `safety-and-evaluation` 61–80 tek öbek, `multimodal-and-future` 81–90 tek öbek. Kasıtlıdır;
  `reading-list-groups.test.ts` bunu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) ayrı bir üretim hattıyla ilerliyor; AI serisinin araçları o
  dizine dokunmaz. Build iki seriyi birden derler.
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor (`Karar`, `her`, `Yaşayan`, `yapılırsa` izleniyor;
  `**zorundadır**.` izlenmiyor). Build'i etkilemiyor; temizlik AI serisinin kapsamı dışıdır.
- Batch 12–20'nin üretimi (51–86) kullanıcı tarafından commit edildi (20: `comma`/`3fd98b8`). **Batch 21
  (87–90) çalışma ağacında commit edilmemiş** duruyor: dört makale ve dört varlık klasörü izlenmiyor;
  `catalog.json`, `roadmap.json`, `HANDOFF.md`, `YOL-HARITASI.md` ve `.wolf/*` değişmiş durumda;
  `artifacts/b21-research/` de izlenmiyor. Commit/push kullanıcı kararıdır (SOZLESME kapsamı dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)
- **Batch 21 (2026-09-10):** Makale 87–90, **Faz 9'un kapanışı**: damıtma ve küçük modeller → uçta yapay zekâ →
  donanım ekosistemi → enerji, maliyet ve çevresel ayak izi. `BATCH=4+1`. Araştırma (100 kalemlik liste iki
  fetch kopyasıyla, 94 yeni metin + Batch 20'den taşınan 8), yazım, entegrasyon ve doğrulama ana oturumda,
  workflow/subagent kullanılmadan yapıldı. **34'ün numarasız işareti 87'de ödendi** (damıtmanın temel modelin
  sınırını aşması) ve 86'nın "bir sonraki makale" devri karşılandı; yeni koordinat açılmadı, başlık
  değiştirilmedi. Kararlar #192–#199. 48 kaynak kaleminin 40'ı hakemli. **İki künye düzeltildi:** ICLR 2024'teki
  yayımlanmış başlık ön baskıdan farklı ("…Proprietary Language Models") ve MELT'in mecrası MobiCom 2024 (dosya
  adındaki `mobisys` tahmini yanlıştı); ayrıca elle yazılmış bir NeurIPS 2014 hash URL'si `url-b21.py` ile
  düzeltildi. Yeni araç: `acl-b21.py` (ACL Anthology'de tırnaksız `href`). Bir kaynak içi tutarsızlık
  büyütülmeden atlandı (karar #196) ve bir şekil, ortalama ile ortancayı karıştırdığı için yeniden çizildi.
  Kapılar: `pnpm typecheck` (0), **587 test**, `pnpm build` (exit 0, `/seri/[slug]` 90 yol, izole kopyada),
  91 rotanın tamamı 200 (65,6 sn), dört makale × üç genişlik × üç temada DOM ölçümü (taşma 0, sızıntı yok),
  12 yeni diyagram Playwright ile light/dark PNG olarak alınıp gözle doğrulandı (PNG turu iki kusur buldu ve
  ikisi de düzeltildi). Paralel oturum görünmedi; build ve dev sunucusu izole kopyada
  (`D:\dev\anil-lib-b21-render`, 3210), launch.json geri alındı, kopya ve junction silindi.
- **Batch 20 (2026-09-09):** Makale 83–86, **Faz 9'un gövdesi**: difüzyonla görüntü ve video üretimi → birleşik
  modeller ve "her şey token" iddiası → uzmanlar karışımı → dikkatin ötesindeki mimariler. `BATCH=4+1`.
  **İki bağlayıcı koordinat birden kapandı** (20 → 85; 7 ve 15 → 86). İki başlık Türkçeleştirildi (#184, #185).
  Kararlar #184–#191. 68 kaynak kaleminin 58'i hakemli. Beş künye düzeltildi; iki yeni doğrulama kanalı
  kuruldu (OpenReview arama ucu ve `iclr.cc` kabul listeleri). 575 test, `pnpm build` (exit 0, 86 yol).
- **Batch 19 (2026-09-09):** Makale 79–82; **Faz 8 kapandı, Faz 9 açıldı**. Faz 9'un kategorisi
  `multimodal-and-future` (#176); dört numarasız işaret ödendi (78 → 79, 72 → 79, 71/73 → 80, 54 → 81).
  URL doğrulama kapısı eklendi. 563 test.
- **Batch 18 (2026-09-09):** Makale 75–78, Faz 8'in ikinci yarısı. DBLP kapandığı için venue doğrulaması
  konferans dizinlerine taşındı (#175). **74–77 bandı kapandı ve 78 koordinatı ödendi.** 551 test.
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
