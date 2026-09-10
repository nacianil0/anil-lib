# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-10 · Durum: **1–94 yayında (kohort Batch 0 → Batch 22) · Faz 10 açıldı · Sıradaki: 95 (Faz 10'un kapanışı 95–97 + Faz 11'in açılışı 98)**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 94 — `bilgi-kurami-entropi-capraz-entropi-ve-kl` |
| Sıradaki güvenli başlangıç | Makale 95 ("Optimizasyonun Kuramı: Gradyanın Matematiği"); run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 95, 96, 97 ve 98 üretilir; bu dörtlü **Faz 10'u kapatır (95–97) ve Faz 11'i açar (98)**. **Bu dörtlüde bağlayıcı numaralı koordinat YOKTUR** — defterde açık kalan tek koordinat 101'dir ve bu banda düşmüyor. Devralınan numarasız işaret: 94 → 95 ("bir sonraki makale": kaybı gerçekten azaltan mekanizma; 2'nin gradyan inişi ve 8'in çizelgeleri kuruldu ama neden işe yaradığı kurulmadı) ve 93 → "bir sonraki faz" (yanlılık ↔ oynaklık ayrımı; defterdeki 101'e gidiyor). Devrolan planlı tekrar: 33/40'ın pass@k ile görev ufku **hâlâ tahsil edilmedi**; pass@k'nın olasılıksal kimliği 93'te bilinçli formalizasyon olarak kuruldu, fakat 40'la eşleştirilmiş planlı tekrar 101'e devrediyor |
| Sıradaki kohort | `classification_batch: 23` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs`. **Batch 22'nin ek ölçerleri kayboldu** (bkz. Açık borçlar); Batch 21'in `artifacts/b21-research/` dizini de silindi. Yeniden yazılması gerekenler ve ne yaptıkları: `scan` (kelime sayısı + yasaklı biçim + ileri gönderme taraması), `svgcheck` (aynı satırdaki metin çiftleri, kutu içi taşma, alt pay ≥ 12), `links` (her `[Bağlantı]` adresini çekip `<title>` yazar), `doi` (Crossref künye doğrulama), `idx` (konferans dizinlerini indirir ve başlık arar), `url` (dizinden mutlak/hash URL çözme), `refcheck` (`N\. makale` kaçışları), `sweep` (rota taraması — **dilimli** olmalı), `shots` (Playwright ile şekil PNG'leri), `wc` (repo kapısının kelime sayısının birebir kopyası) |
| Level bandı | 1–10 `beginner`; 11–90 `intermediate`; **91'den itibaren `advanced`** (bağlayıcı kararlar #19 ve **#201**) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–80 `safety-and-evaluation`; 81–90 `multimodal-and-future`; **91–94 yine `foundations`** (kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142, #148, #160, #168, #176, #192, **#200**). Okuma listesinde `foundations` artık **iki öbek** (1–5 ve 91–94); `reading-list-groups.test.ts` bunu zaten sınıyordu ve değiştirilmedi. **Sıradaki run'da kategori sorusu VARDIR:** 95–97 Faz 10'un devamı olarak `foundations` kalır, fakat **98 Faz 11'i (Araştırma Pratiği: Kanıtla Düşünmek) açıyor** ve onun kategorisi 98'in run'ında karara bağlanacak. Kontrollü sözlükte kullanılmamış tek kalem hâlâ `case-studies`; Faz 11 araştırma pratiği olduğu için `foundations`'ın üçüncü öbeği ya da `safety-and-evaluation` (ölçüm bilimi tarafı) en yakın adaylar |

## Açık borçlar

- **Araştırma çalışma dizinleri silindi — kaynak metinleri yok.** Batch 22'nin doğrulama turu sırasında
  paralel bir oturum `artifacts/` altını temizledi (karar #208g); geriye yalnızca o oturumun kendi
  `b9-research` dizini kaldı. Kaybolanlar: **b10–b21'in bütün araştırma dizinleri** (yüzlerce kaynak `.txt`,
  konferans dizini HTML'leri, bütün ölçüm betikleri) ve b22'nin 86 kaynak metni. Yayımlanmış makaleler,
  katalog, roadmap ve YOL-HARITASI etkilenmedi; kaybolan şey **çalışma malzemesi**. Sonraki run kendi
  betiklerini sıfırdan yazmak ve gerekli kaynakları yeniden indirmek zorunda. Betiklerin ne yaptığı yukarıdaki
  "Araçlar" satırında ve Batch 21–22 öğrenme notlarında kayıtlı.
- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları hâlâ İngilizce alan
  terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning ve Test-Time
  Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim defterine göre Türkçeleştiriliyor
  (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135, #148, #154, #155, #162, #163, #169, #170, #171,
  #177, #178, #184, #185, **#202**). Katmanın tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
  Faz 8, 9 ve 10'un başlıkları zaten Türkçe.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler — sıradaki dörtlüde aday YOK.** 95 ("Optimizasyonun Kuramı:
  Gradyanın Matematiği"), 96 ("Genelleme Kuramı: Ezber ile Öğrenme Arasında"), 97 ("Klasik Makine Öğrenmesi
  Turu: LLM'den Önce ve Yanında" — "LLM" #108'in kısaltma sınıfında) ve 98 ("Paper Nasıl Okunur: İddia, Kanıt
  ve Hakemlik") başlıkları sorunsuz görünüyor. **Uyarı:** 98'deki "Paper" sözcüğü Türkçede yerleşik bir
  karşılığa sahip ("makale") ve #99'un ölçütüne göre **Türkçeleştirilmeli görünüyor**; ama serinin kendisi
  "makale" sözcüğünü kendi birimleri için kullanıyor, dolayısıyla başlıkta çakışma riski var — karar 98'in
  kendi run'ında verilmeli. **Bandın dışında bekleyen aday hâlâ 108** ("Performans Mühendisliği: Attention'ı
  Hızlandırmak"). Başlık değişikliği entegrasyondan **önce** `roadmap.json`'a yazılır.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış vaatler"dedir.
  Batch 22 **bir numarasız işaret ödedi** (13 → 94: KL ıraksamasının biçimsel kurulumu) ve 90'ın "serinin bir
  sonraki fazı" devrini karşıladı; yeni koordinat açmadı. **Defterde açık kalan TEK koordinat: 101**
  (ölçümün disiplini — 16 ve 22). Numarasız işaretler: 51 → 111, 49/53 → 115, 93 → "bir sonraki faz" (101).
  Devrolan planlı tekrar: 33/40'ın pass@k ile görev ufku **tahsil edilmedi ve devrolur**.
- **Prerequisite grafında 79–82 boşluğu.** YOL-HARITASI'ndaki graf satırları 78'de kesilip 83'ten devam
  ediyor; Batch 19 kendi dörtlüsünün satırlarını eklememişti. Batch 20, 21 ve 22 kendi satırlarını ekledi.
  Devrolan eksik; ileride toplu kapatılabilir, hiçbir kapı buna bağlı değil.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR hâlâ uygulanmadı; tam listeler
  repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(15) önceki batch'lerden (kararlar #21, #97, #104, #106,
  #114, #120, #127, #134, #141, #147, #152, #159, #167, #175, #183). **Batch 20, 21 ve 22'de doğrulanamayan
  künye yok** (kararlar #191, #198, #207). Batch 22'nin kısıtları okunabilirlik tarafında: Kullback–Leibler 1951
  ve Jaynes 1957'nin kamuya açık kopyaları taranmış görüntü olduğu için sayı alınmadı (Jaynes hiç
  kullanılmadı); Harris 1954, Deerwester 1990 ve Fisher 1922 yalnızca künye düzeyinde anıldı (karar #208).
- **Hakemsiz kaynak oranı Batch 22'de 50 kalemin 1'i (karar #207).** Yani 44 hakemli + 5 ders kitabı.
  Batch 21: 40/48, Batch 20: 58/68. Kural değişmedi. **Faz 10'un kaynak profili beklendiği gibi değişti:**
  klasik künyeler (1936–1992) ve ders kitapları payı yükseldi; ders kitabı kuralı (sayfa/bölüm numarası +
  doğrulanabilir bağlantı) Axler, Bishop ve Jurafsky–Martin için uygulandı.
- **DBLP kapalı (Batch 18'den beri), Semantic Scholar 429.** Venue doğrulaması konferans dizin sayfaları +
  OpenReview API + Crossref ile yapılır (aşağıda).

## Next batch preparation — 95'ten devam (Faz 10'un kapanışı 95–97 + Faz 11'in açılışı 98)

**Pedagojik hedefler.** Batch 22'nin sonunda okuyucu şunu biliyor: bir embedding bir vektör uzayının öğesidir
ve "kral eksi erkek artı kadın" sorusu ancak toplama ile sayıyla çarpma tanımlıysa sorulabilir; matris bir
doğrusal dönüşümün bir tabanda yazılmış hâlidir ve sütunları taban vektörlerinin gittiği yerdir; benzerliğin üç
cetveli aynı üçlüde zıt sıralama verebilir (30 ↔ 14, 0,600 ↔ 0,990, 8,06 ↔ 2,24) ve uzayın gerçek biçimi
resimlerdeki gibi değildir (XLNet'te tek boyut beklenen benzerliğin yüzde 99'undan fazlası) — 91. Bir matrisin
rankı boyutundan başkadır; özdeğer ile tekil değer ayrı sorular sorar; en iyi düşük ranklı yaklaşıklığın bedeli
tam olarak kesilen tekil değerdir (16 + 4 = 20, yüzde 80) ve **teoremin "en iyi"si modelin "en iyi"si değildir**
(5,47 → 18.192 ↔ 7,73; 13,1 → 29,2) — 92. Modelin çıktısı toplamı 1 olan bir dağılımdır; beklenti seride
onlarca kez kullanılan sözcüğün tek tanımıdır; kayıp bir tercih değil en büyük olabilirliğin sonucudur
(0,7 → 0,002224); softmax üstel çünkü en az varsayımlı ailenin biçimi; ve yerine koyma hesabı ile yansız
tahminci aynı örneklemde 0,6513 ↔ 0,6602 verir — 93. Kaybın birimi bir şey sayar: çapraz entropi, verinin
entropisi artı KL'dir (1,500 + 0,921 = 2,421); perplexity kaybın üstelidir (0,114 nat/token ↔ yüzde 12); kayıp
aynı zamanda sıkıştırma oranıdır (yüzde 43,4 ↔ PNG 58,5); ve KL simetrik olmadığı için bir bütçedir
(n = 1.000 → 5,909 nat) — 94.

**Sıradaki makaleler ve prerequisite'ler.** 95–97 Faz 10'un kapanışı, 98 Faz 11'in açılışı.
**95 ← 94** (kaybın ne olduğunu bildik, şimdi onu azaltan mekanizma), 2 (gradyan inişi ve öğrenme oranı),
3 (geriye yayılım — zincir kuralının biçimsel kurulumu burada yapılabilir), 8 (gerçek koşuların çizelgeleri:
ısınma, kosinüs sönümü, gradyan kırpma), 91 (gradyan bir **yön**dür — 91'in vektör uzayı dili doğrudan
kullanılır), 92 (Hessian ve eğrilik: özdeğerlerin eniyilemedeki anlamı), 9 (kayıp eğrisinin okunması).
**96 ← 2** (aşırı öğrenme ve çift iniş — 2'de ileri okuma notuydu, 9'da randevusu kapandı), 18 (ezber ↔
genelleme gerilimi), 72 (kirliliğin ölçüme etkisi), 93 (en büyük olabilirliğin kusuru: sonlu veriyi en iyi
açıklayan parametre), 94 (sıkıştırma ↔ genelleme bağı), 79 (dağılım kayması). **97 ← 96**, 1 ve 2 (modelin
tanımı ve kayıp), 42/43 (kNN ve uzaklık ölçüleri — 91'in üç cetveli burada geri döner), 92 (temel bileşen
çözümlemesi ve kümeleme), 16 (taban çizgisi kültürü). **98 ← 94 ve 96** (bir çalışmanın iddiasını okumak için
kayıp/ölçüt dilinin kurulmuş olması), 16 (benchmark okuma), 71–73 (değerlendirme bilimi ve hakem modeller),
45 (kaynak sadakati), 4 ve 91 (aynı bulgunun iki farklı okunuşu: Levy–Goldberg'in "sihir sinir ağında değil"
sonucu bir hakemlik dersi olarak kullanılabilir).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Gradyan inişi (2), geriye yayılım (3), çizelgeler ve kırpma (8) → 95.
- Vektör uzayı ve yön (91), özdeğer ve eğrilik (92) → 95.
- Çift iniş (2/9), ezber ↔ genelleme (18), kirlilik (72) → 96.
- Sıkıştırma ↔ kayıp özdeşliği (94) → 96.
- Uzaklık ölçüleri (42/43, 91), temel bileşen çözümlemesi (92) → 97.
- Değerlendirme bilimi (16, 71–73) → 98.
- Devrolan planlı tekrarlar: pass@k (33) ve görev ufku (40) → 101; yanlılık ↔ oynaklık (93) → 101.

**Araştırılacak güncel akademik alanlar (95 için öncelikli):** bu faz da klasik matematik üzerine kurulu.
95 için: gradyanın tanımı ve yönlü türev (Axler'ın kitabı yetmez; Boyd–Vandenberghe'nin açık erişimli
*Convex Optimization*'ı ve Nocedal–Wright uygun), SGD'nin yakınsama koşulları (Robbins–Monro 1951),
momentum (Polyak 1964; Nesterov), Adam (Kingma & Ba ICLR 2015) ve Adam'ın yakınsama tartışması (Reddi ve ark.
ICLR 2018), AdamW (Loshchilov & Hutter ICLR 2019), öğrenme oranı çizelgeleri (Smith 2017; Loshchilov & Hutter
ICLR 2017), kayıp yüzeyinin biçimi (Li ve ark. NeurIPS 2018 — görselleştirme; Keskar ve ark. ICLR 2017 — geniş
minimum tartışması, **hakemsiz değil, ICLR bildirisi**), gradyan gürültüsü ölçeği (McCandlish ve ark. 2018,
hakemsiz), Muon/Shampoo gibi güncel ikinci mertebe yaklaşımlar (2024–2025 bildirileri; hakemli karşılığı
aranmalı). **96 için:** bias-variance ayrışımı (Geman ve ark. 1992), çift iniş (Belkin ve ark. PNAS 2019;
Nakkiran ve ark. ICLR 2020), rastgele etiket deneyi (Zhang ve ark. ICLR 2017 / CACM 2021), örtük
düzenlileştirme, ölçek yasalarının genelleme okuması, ezberin ölçümü (Carlini ve ark.; 41 ve 72'de kullanıldı).
**97 için:** karar ağaçları ve rastgele orman (Breiman 2001), gradyan artırma (Friedman 2001; Chen & Guestrin
KDD 2016), destek vektör makineleri (Cortes & Vapnik 1995), kNN (Cover & Hart 1967 — Cover 94'te de geçti),
k-ortalamalar (Lloyd 1982; Arthur & Vassilvitskii SODA 2007), tablo verisinde ağaçların üstünlüğü (Grinsztajn
ve ark. NeurIPS 2022). **98 için:** hakemlik süreci ölçümleri (NeurIPS 2014 ve 2021 tutarlılık deneyleri),
Ioannidis 2005, tekrarlanabilirlik anketleri, ön kayıt tartışması. Sayısal iddialar ve URL doğrulaması yazımdan
bağımsız bir gözle çapraz denetlenir; süreç kuralları SOZLESME §9'dadır. **Uyarı:** ders kitabı kaynakları için
sayfa/bölüm numarası verilmeli ve doğrulanabilir bir bağlantı bulunmalı (Batch 22'de Axler, Bishop ve
Jurafsky–Martin için uygulandı).

**Görselleştirme ihtiyaçları (öngörü):**
- 95: aynı kaybın iki eniyileyiciyle izlediği yol (ölçülmüş sayılarla; ölçülmemiş eğri çizilmez) ve öğrenme
  oranının tek bir adımda ne yaptığı (gerçekten hesaplanabilir küçük bir örnekle).
- 96: aynı verinin iki okunuşu — model büyüdükçe eğitim hatası ve test hatası (çift inişin ölçülmüş hâli);
  ve "ezber" ile "genelleme"nin aynı ölçüte iki farklı katkısı.
- 97: aynı problemin dört yöntemle çözümü ve her birinin varsayımı (tablo); ağaçların tablo verisindeki
  üstünlüğünün ölçülmüş hâli.
- 98: bir bildirinin iddiası ile kanıtı arasındaki eşleşme haritası (hangi bölüm hangi iddiayı taşıyor).

**Venue doğrulaması — Batch 22'nin kanalları.** Konferans dizin sayfaları (`proceedings.iclr.cc/paper_files/
paper/2024|2025|2026`, `papers.nips.cc/paper_files/paper/2013…2025`, `proceedings.mlr.press/v37…v267`,
`aclanthology.org/events/{acl,emnlp,naacl}-<yıl>`, `iclr.cc/virtual/<yıl>/papers.html` (2018–2023),
`openaccess.thecvf.com`, `proceedings.mlsys.org`, `jmlr.org/tmlr/papers`) indirilip metin içinde aranır.
**Batch 22'nin dersi:** `openreview.net/forum?id=…` sayfası bot doğrulaması gösterip **200** döndürüyor,
dolayısıyla yanlış bir kimlik de 200 verir; kimlikler `https://api.openreview.net/notes/search?term=…&source=
forum&limit=8` (2018–2020 gibi eski mecralar) ve aynı yolun `api2` sürümü (yeni mecralar) ile tek tek
doğrulanmalı, sorgular arasında 6–8 sn beklenmeli (429 veriyor). Doğrulanamayan kimlik `proceedings.iclr.cc`
hash biçimine çevrilir ve hash **elle yazılmaz**, dizinden çözülür. Crossref (`api.crossref.org/works/<doi>`)
klasik künyeler için birincil kanal; ACM, SIAM, AIP, Royal Society, Wiley ve MIT Press DOI'leri tarayıcıya
403 döner ve bu beklenen bot duvarıdır. **Wiley DOI'lerindeki parantez markdown bağlantısını kırar**;
yüzde kodlamasıyla yazılır. **Ön baskı ↔ yayımlanmış başlık farkı bu run'da iki kez daha çıktı** (Chinchilla
ve Stiennon); dizinde bulunan başlık esastır.

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 23` ve `readingOrder` 95'ten kesintisiz
devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir (başlık değişecekse
entegrasyondan **önce**); YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve bağlayıcı
kararlar güncellenir; doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki run
hazırlığıyla güncellenir. **Kategori sorusu VARDIR** (98 → Faz 11) ve karar gerekçesiyle YOL-HARITASI'na
yazılır; yeni bir kategori dizini açılacaksa `content/series/articles/<kategori>/` oluşturulur ve
`reading-list-groups.test.ts` **mutlaka** çalıştırılır. **Level `advanced` kalır** (karar #201).

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

**Yayın öncesi zorunlu taramalar.** Ölçer betikleri kaybolduğu için yeniden yazılmalı (yukarıdaki "Araçlar").
Kapsam değişmedi: kelime sayısı, parantezli gloss listesi, yasaklı biçimler (`gömme`, `korpus`,
`geliştirme kümesi`, `niceleme`, `az/sıfır atışlı`, `çekişmeli`), **kendi numarası** ve **numaralı ileri
gönderme** (≥ N+1) taramaları, `N\. makale` kaçış denetimi, bölüm başlıkları, "Kendini yokla" ve şekil sayısı.
**Kelime sayısı için kapının kendi işlevi kopyalanmalı:** `check-series-content.cjs`'in `countProseWords`'ü
kaynakçayı, şekil sözdizimini, bağlantı hedeflerini ve liste/alıntı işaretlerini atar; kabuk içinde yazılan
tek satırlık taklit Batch 22'de 100–150 kelime fazla saydı ve üç makale banttayım sanılırken kapıda kaldı.
SVG için **iki** kapı: `check-series-svg.cjs` (viewBox, sabit renk, yasak öge, font boyutu; genişlik tahmini
**0,55 × font-size**) ve yeniden yazılacak `svgcheck` (aynı satırdaki her metin çifti, kutu içi metnin
`x + width`'i, sağ/sol kenar, alt pay ≥ 12); ayrıca her SVG `python -c "import xml.etree.ElementTree as ET;
ET.parse(f)"` ile ayrıştırılır ve `grep -c 'var(--[a-z-]*"'` ile kapanmamış `var(` parantezi aranır.
**Bağlantı kapısı:** her `[Bağlantı](...)` adresi çekilir ve `<title>`'ı yazılır. **PNG turu Batch 22'de de
kusur buldu** (94-Şekil 1'in hizası); geometri kapıları geçse de göz turu şart. **Ayrıca:** yeni bir ölçü
çifti ya da yeni bir terim kurulacaksa YOL-HARITASI terim defterinin ilgili satırları **yazımdan önce**
aranmalı; ve uzun aralıklı geri çağırmada **kaynak makalenin gövdesi okunmalı** — Batch 22'de 91'in ilk
taslağı 4. makalenin zaten yaptığı analoji tartışmasını tekrarlıyordu ve makale bu yüzden yeniden çerçevelendi.

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch 22'de
`netstat` boş döndü ama **aynı worktree'de ikinci bir üretim oturumu vardı** (BOUN serisi) ve `artifacts/`
altını sildi. Kontrol yalnızca porta bakmak değil: `git status` ile başka bir serinin dosyalarının değişip
değişmediğine ve `.wolf/memory.md`'nin son satırlarına da bakılmalı. İzole kopya düzeni değişmedi:
`tar --exclude=./node_modules --exclude=./.next --exclude=./.git --exclude=./artifacts --exclude=./.env.local
-cf - . | (cd /d/dev/anil-lib-bNN-render && tar xf -)`, junction PowerShell ile
`New-Item -ItemType Junction -Path 'D:\dev\anil-lib-bNN-render\node_modules' -Target 'D:\dev\anil-lib\node_modules'`,
kopyada `corepack pnpm build`, sonra kopyanın `.next`'i silinip `.claude/launch.json`'a geçici yapılandırma
(Git Bash **tam yolu**, `-lc`, `export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-bNN-render && exec corepack
pnpm dev -p 3210`). **launch.json'ı Bash ya da Python heredoc ile yazma:** `\\` çiftleri tek `\`'a iner;
Write aracıyla yaz (Git Bash'in yolu bu makinede `%LOCALAPPDATA%\Programs\Git\usr\bin\bash.exe`).
**Paralel oturum da launch.json'a yazıyor olabilir:** temizlikte `git checkout` yerine dosyayı okuyup yalnızca
kendi girdini çıkar. Kopyada `.env.local` olmadığı için okuyucu kapısı kendiliğinden kapalı — **ama yalnızca
`next dev`'de**; `next start` middleware'i devreye sokar ve bütün rotalar `/login`e yönlenir, dolayısıyla
üretim sunucusuyla rota sweep'i yapılamaz. `typecheck` ve `test` ana worktree'de çalıştırıldı. **Kopya
oluşturulduktan sonra ana worktree'de içerik değişirse dosyayı kopyaya senkronlamak yetmiyor:** dev sunucusu
derlenmiş sayfayı önbelleğe aldığı için `preview_stop` + `preview_start` gerekiyor. Temizlik: **önce**
`preview_stop`, sonra junction `cmd //c rmdir` ile kaldırılır, ardından ana `node_modules` doğrulanır
(`node_modules/next/package.json` yerinde), sonra kopya silinir; launch.json kendi girdisinden arındırılır.
Bash aracında `cd` bir komuttan sonrakine taşınır — her komut `cd /d/dev/anil-lib;` ile başlar; Python
Windows'ta `/d/dev/...` yolunu tanımaz (`D:/...` verilir) ve konsola Türkçe basarken
`sys.stdout.reconfigure(encoding="utf-8")` ister. **Bash aracında uzun Python heredoc'ları ayrıştırma hatası
veriyor** ("unexpected EOF while looking for matching"); uzun betikler Write aracıyla **oturum
scratchpad'ine** yazılıp `python <dosya>` ile çalıştırılmalı — `artifacts/` altına değil (bkz. Açık borçlar).

**Render doğrulama seti (Batch 22'de kullanılan).** Rota sweep'i Python `urllib` ile, **dilimli**: dev
sunucusu 94 rotayı tek oturumda derlerken JavaScript yığınını tüketiyor (`Committing semi space failed`,
85. rota civarı) ve `NODE_OPTIONS=--max-old-space-size` yardımcı olmuyor. 32 + 32 + 16 + 15 dilim, sunucu
ayakta, toplam ~75 sn. Sweep betiği durum kodunun yanında `resp.geturl()`i de karşılaştırmalı; aksi hâlde
`/login` yönlendirmesi sahte bir "hepsi 200" raporu üretir. Tarayıcı panosundan: `preview_start` →
`resize_window` ile **açık genişlik/yükseklik** (1440×900, 768×1024, 375×812; `preset: "desktop"` emülasyonu
**temizler**, ölçüm için kullanılmaz) → `javascript_tool` ile tema döngüsü (`documentElement.classList`
üzerinde `dark`/`sepia`) ve ölçüm (`scrollWidth > innerWidth`, figure/svg/figcaption/blockquote sayıları,
`main.innerText` içinde `undefined`/`NaN` ve ham i18n anahtarı deseni). **Ölçümden önce
`await new Promise(r=>setTimeout(r,2000))` koy.** `browser_batch` içindeki JSON'da regex kaçışlarına dikkat —
regex'i `new RegExp('[a-z]+[.][a-z]+[.][a-z]+','g')` gibi köşeli parantezle kur. Ölçülen genişlikler: 1440'ta
SVG 771 px, 768'de 676 px, 375'te 351 px — üçünde de yatay kaydırma yok. **Şekil görüntüleri Playwright'tan**
(kaplayıcıda 1200 px klon, light/dark PNG): 12 şekil, 24 PNG, Read aracıyla incelendi. Playwright ana
worktree'de `node_modules/@playwright/test` altındadır (`require("D:/dev/anil-lib/node_modules/@playwright/test")`);
`waitUntil: "networkidle"` **kullanılmaz** — okuyucu `/api/reader-sync`'i sürekli yokladığı için ağ hiç
boşalmıyor ve zaman aşımı veriyor; `domcontentloaded` + sabit bekleme kullan.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki betikler de lint
  kapsamındadır; bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer —
  beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur (Batch 22'de de yalnızca bu 503).
- Ham HTML'de sayfa başına "undefined" görünür; Next.js iskelesindendir ve yayımlanmış eski makalelerde de
  aynıdır. `main.innerText` ölçümünde 0'dır — regresyon değil.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` ve genişliğe karşı yatay taşmayı yakalar; **sütuna
  binmeyi, kutudan taşmayı ve kapanmamış `var(` parantezini görmez** — bunun için ayrı bir ölçer ve grep
  kapısı gerekir (Batch 22'de kayboldu, yeniden yazılmalı). İki ölçerin karakter genişliği tahmini farklıdır
  (6,8 ↔ 7,15); repo kapısı daha muhafazakârdır. **Hiçbiri hizası bozuk bir satırı ya da yarım kalmış bir
  cümleyi görmez** — PNG turu bu yüzden zorunlu.
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde görünür (27–28, 29,
  30–40, 41–60); `safety-and-evaluation` 61–80 tek öbek, `multimodal-and-future` 81–90 tek öbek ve
  **`foundations` iki öbek** (1–5, 91–94). Kasıtlıdır; `reading-list-groups.test.ts` bunu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) ayrı bir üretim hattıyla ilerliyor; AI serisinin araçları o
  dizine dokunmaz. Build iki seriyi birden derler. **Batch 22 sırasında o hat aynı worktree'de eşzamanlı
  çalışıyordu**; `artifacts/`, `.claude/launch.json` ve `.wolf/*` paylaşılan durumdur ve çakışabilir.
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor (`Karar`, `her`, `Yaşayan`, `yapılırsa`,
  `**Bu`, `**zorundadır**.`). Build'i etkilemiyor; temizlik AI serisinin kapsamı dışıdır.
- Batch 12–21'in üretimi (51–90) kullanıcı tarafından commit edildi. **Batch 22 (91–94) çalışma ağacında
  commit edilmemiş** duruyor: dört makale ve dört varlık klasörü izlenmiyor; `catalog.json`, `roadmap.json`,
  `HANDOFF.md`, `YOL-HARITASI.md` ve `.wolf/*` değişmiş durumda. Commit/push kullanıcı kararıdır
  (SOZLESME kapsamı dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)
- **Batch 22 (2026-09-10):** Makale 91–94, **Faz 10'un açılışı**: vektörler ve matrisler → rank, özdeğer ve SVD
  → olasılık, beklenti ve en büyük olabilirlik → entropi, çapraz entropi ve KL. `BATCH=4+1`. Araştırma
  (95 kalemlik liste iki fetch kopyasıyla, 86 metin), yazım, entegrasyon ve doğrulama ana oturumda,
  workflow/subagent kullanılmadan yapıldı. **Faz 10'un kategorisi `foundations` (#200) ve level bandı
  `advanced`'e geçti (#201)** — serinin ilk `advanced` kohortu. **13'ün numarasız işareti 94'te ödendi**
  (KL ıraksamasının biçimsel kurulumu) ve 90'ın "serinin bir sonraki fazı" devri karşılandı; yeni koordinat
  açılmadı. 93'ün başlığı Türkçeleştirildi (#202). Kararlar #200–#208. 50 kaynak kaleminin 44'ü hakemli,
  5'i ders kitabı, 1'i hakemsiz. **İki künye düzeltildi:** Chinchilla'nın ve Stiennon'un NeurIPS'teki
  yayımlanmış başlıkları ön baskılarından farklı; ayrıca elle tahmin edilmiş bir NeurIPS 2014 hash URL'si
  dizinden düzeltildi ve iki OpenReview kimliği doğrulanamadığı için proceedings biçimine çevrildi.
  Kapılar: `pnpm typecheck` (0), **605 test**, `pnpm build` (exit 0, `/seri/[slug]` 94 yol, 146 statik sayfa,
  izole kopyada), 95 rotanın tamamı 200 (dört dilim, ~75 sn), dört makale × üç genişlik × üç temada DOM
  ölçümü, 12 yeni diyagram Playwright ile light/dark PNG olarak alınıp gözle doğrulandı (PNG turu bir kusur
  buldu ve düzeltildi). **Aynı worktree'de paralel bir BOUN oturumu çalışıyordu ve `artifacts/` altını
  sildi** (karar #208g); kalan kapılar scratchpad'e yeniden yazılan betiklerle tamamlandı.
- **Batch 21 (2026-09-10):** Makale 87–90, **Faz 9'un kapanışı**: damıtma ve küçük modeller → uçta yapay zekâ →
  donanım ekosistemi → enerji, maliyet ve çevresel ayak izi. `BATCH=4+1`. **34'ün numarasız işareti 87'de
  ödendi**; yeni koordinat açılmadı. Kararlar #192–#199. 48 kaynak kaleminin 40'ı hakemli. İki künye
  düzeltildi. 587 test, `pnpm build` (exit 0, 90 yol).
- **Batch 20 (2026-09-09):** Makale 83–86, **Faz 9'un gövdesi**. **İki bağlayıcı koordinat birden kapandı**
  (20 → 85; 7 ve 15 → 86). Kararlar #184–#191. 68 kaynak kaleminin 58'i hakemli. 575 test.
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
