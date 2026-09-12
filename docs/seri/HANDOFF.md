# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-12 · Durum: **1–106 yayında (kohort Batch 0 → Batch 25) · Faz 12 kapandı, Faz 13 açıldı · Sıradaki: 107 (Faz 13'ün kalanı 107–109 + Faz 14'ün açılışı 110)**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 106 — `gpu-zihinsel-modeli-hesap-bellek-bant-genisligi` |
| Sıradaki güvenli başlangıç | Makale 107 ("Dağıtık Eğitim: Paralellik Stratejileri"); run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 107, 108, 109 ve 110 üretilir; bu dörtlü **Faz 13'ü kapatır ve Faz 14'ü açar**. **Bu run'da TEK kategori sorusu vardır** — Faz 14 (110–118); hazırlık ve öneri aşağıda. **Bağlayıcı numaralı koordinat YOKTUR:** defter Batch 24'te temizlendi ve Batch 25 yeni koordinat açmadı. Devrolan numarasız işaretler: 51 → 111 ve 49/53 → 115. Devrolan planlı tekrar **yok** |
| Sıradaki kohort | `classification_batch: 26` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu). **BOUN serisi `/boun` altındadır, `/seri-boun` değil** — rota sweep'i yazarken bu karıştırıldı |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs`. **Batch 25'in ek ölçerleri oturum scratchpad'indeydi ve kalıcı değil** (bilerek; bkz. Açık borçlar). Yeniden yazılması gerekenler aşağıdaki "Ölçer betikleri" bölümünde |
| Level bandı | 1–10 `beginner`; 11–90 `intermediate`; **91'den itibaren `advanced`** (kararlar #19, #201) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–80 `safety-and-evaluation`; 81–90 `multimodal-and-future`; 91–102 `foundations`; **103–106 yine `models-and-training`** (kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142, #148, #160, #168, #176, #192, #200, #209, #219, **#225**). Okuma listesinde artık hem `foundations` hem `models-and-training` **iki öbek** hâlinde görünüyor; kohort ayrımı Batch 2'nin grubuyla Batch 25'inkini ayırıyor. `reading-list-groups.test.ts` çalıştırıldı ve geçti. Kontrollü sözlükte kullanılmamış tek kalem hâlâ `case-studies` ve doğal yeri 114–115 |

## Sıradaki run'ın kategori kararı (hazırlık)

**Faz 14 — Sınır ve Sentez (110–118).** Dokuz makalelik en uzun faz ve içinde iki ayrı iş var: sınır
konuları (110 dünya modelleri, 111 robotik, 112 sürekli öğrenme, 113 bilimde yapay zekâ, 116 açık sorular,
117 AGI tartışması, 118 sentez) ve **iki vaka incelemesi** (114 bir sınır modelin uçtan uca yapımı,
115 bir LLM ürününün kurulması). Seçenekler:

(a) **Bölünmüş atama — önerilen.** 110–113 ve 116–118 `multimodal-and-future`; **114–115 `case-studies`**.
Gerekçe iki katlı: karar #200'ün ölçütüne göre kategori katmanı adlandırır ve 114–115'in katmanı ötekilerden
farklıdır (yeni konu değil, kurulmuş bilginin tek bir vaka üzerinde sentezi); ayrıca `case-studies`
kontrollü sözlükteki son kullanılmamış kalemdir ve Batch 4'ten beri bu iki makale için ayrılmış durumdadır.
Sonraki run'ın bandında yalnızca 110 var, dolayısıyla **verilecek karar 110 içindir**; ama fazın tamamının
planı aynı kararda yazılmalı ki 114–115'in run'ı tartışmayı yeniden açmasın.
(b) Tümü `multimodal-and-future` — basit ama `case-studies` hiç kullanılmadan kalır ve 114–115'in farklı
katmanı gizlenir.
(c) Yeni bir kategori açmak — **gerekmiyor** ve pahalı: `schema.ts` içindeki `CATEGORIES` ve
`CATEGORY_LABELS` ile iki serinin şema testleri değişir (bugüne kadar hiç gerekmedi).

**Uyarı:** (a) seçilirse okuma listesinde `case-studies` ilk kez görünecek ve 114–115 kendi öbeğini
oluşturacak; `reading-list-groups.test.ts` o run'da mutlaka çalıştırılmalı. **Karar 110'un run'ında verilir
ve YOL-HARITASI'na numaralı karar olarak yazılır. Sonraki bağlayıcı karar numarası #233'tür.**

## Açık borçlar

- **Araştırma ve ölçüm çalışma dizinleri kalıcı değil — bu bilinçli.** Batch 22'de paralel bir oturum
  `artifacts/` altını sildiği için (karar #208g), Batch 23, 24 ve 25 `artifacts/` altına **hiçbir şey
  yazmadı**; bütün kaynak metinleri, PDF'ler, ölçer betikleri ve **mikro modelin uygulaması** oturum
  scratchpad'inde kaldı. Sonraki run kendi betiklerini yeniden yazmak zorunda. **Batch 25 sırasında paralel
  BOUN oturumu aynı worktree'de çalışıyordu ve `content/series-boun/**` altına yazıyordu.**
- **Mikro-GPT'nin kodu kalıcı değil ama şartnamesi bağlayıcı (karar #226).** 103–105'in bütün sayıları saf
  Python'da yazılmış, skaler ters-mod otomatik türevli ~120 satırlık bir uygulamadan çıktı; gradyanlar
  merkezi farkla doğrulandı. Kod repoda değil. İleride 114 gibi bir makale mikro modele atıfta bulunacaksa
  **şartnameyi yeniden uygulamak zorunda**: sözlük 7, bağlam 4, vektör boyu 4, 2 baş × 2, ileri besleme 8,
  2 blok, ön-katman normalleştirme, GELU, bağlanmış çıktı → 364 parametre. Geniş sürüm: vektör boyu 8,
  ileri besleme 16 → 1.240 parametre.
- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları hâlâ İngilizce alan
  terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning ve Test-Time
  Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim defterine göre
  Türkçeleştiriliyor (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135, #148, #154, #155, #162,
  #163, #169, #170, #171, #177, #178, #184, #185, #202, #210, #217, #218, **#227**). Katmanın tümden
  Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır. Faz 8–14'ün başlıkları zaten Türkçe.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler — sıradaki dörtlüde bir aday VAR.** 108'in başlığı bu
  run'da Türkçeleştirildi (#227). **109'un başlığında "Checkpoint" ve "Spike" duruyor**: "kontrol noktası"
  8\. makaleden beri yerleşik karşılıktır ve #227'nin ölçütüne göre Türkçeleştirilmeli görünüyor; "spike"
  için seride yerleşik bir karşılık **yok** ve 109'un run'ında bir terim kararı gerekebilir. 107'deki
  "Paralellik" ve 110–118'deki başlıklar zaten Türkçe. Başlık değişikliği entegrasyondan **önce**
  `roadmap.json`'a yazılır.
- **Yayımlanmış numaralı vaatler: DEFTER TEMİZ.** Bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir ve **Batch 25'ten sonra da açık numaralı koordinat yoktur** — 103–106'nın hiçbiri numaralı
  ileri gönderme yapmadı (mekanik olarak tarandı). Numarasız işaretler: 51 → 111 ve 49/53 → 115.
  **Devrolan planlı tekrar yok.** 100 ve 102'nin numarasız "kasıtlı boşluk" işaretleri 103'te ödendi.
- **Prerequisite grafında 79–82 boşluğu.** YOL-HARITASI'ndaki graf satırları 78'de kesilip 83'ten devam
  ediyor; Batch 19 kendi dörtlüsünün satırlarını eklememişti. Batch 20–25 kendi satırlarını ekledi.
  Devrolan eksik; ileride toplu kapatılabilir, hiçbir kapı buna bağlı değil.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR hâlâ uygulanmadı; tam
  listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(15) önceki batch'lerden (kararlar #21, #97, #104,
  #106, #114, #120, #127, #134, #141, #147, #152, #159, #167, #175, #183). **Batch 20–25'te doğrulanamayan
  künye yok** (kararlar #191, #198, #207, #216, #224, **#232**). Tek kısmi kalem: Gundersen–Kjensmo'nun
  bitiş sayfası doğrulanamadı.
- **Hakemsiz kaynak oranı Batch 25'te 23 kalemin 2'si (karar #232)** — serinin en düşük oranı. Faz 12'nin
  gövdesi büyük ölçüde kendi hesabımız olduğu için kaynak ihtiyacı azdı. **Faz 13'ün kalanında oran
  yükselecek:** 107–109 sistem literatürüne dayanıyor ve o alanda şirket teknik raporlarının payı yüksek
  (89 ve 8'in deneyimi). SC, MLSys, ISCA ve ASPLOS bildirileri hakemlidir ve ilk tercih olmalı.
- **DBLP kapalı (Batch 18'den beri), Semantic Scholar 429, OpenReview API 403.** Venue doğrulaması
  konferans dizin sayfaları + Crossref ile yapılır (aşağıda).

## Next batch preparation — 107'den devam (Faz 13'ün kalanı + Faz 14'ün açılışı)

**Pedagojik hedefler.** Batch 25'in sonunda okuyucu şunu biliyor: bir Transformer 364 parametreye sığar ve
her parçası bir çarpım tablosudur; parametrelerin çoğu dikkatte değil ileri beslemededir (%54,3 ↔ %57);
maskenin boş hücreleri değer değil yokluk taşır; rastgele ağırlık tarafsız değildir ve düz tahminciden kötü
bir kayıp verir — 103. Tokenizer derleminin aynasıdır ve sıklık Türkçede ekleri buluyor; sözlük büyütmenin
marjinal getirisi 366 kat daralıyor; kayıp dilin entropisinde duruyor (0,46286 ↔ 0,46210) ve beş tohumun
ikisi kuralı hiç öğrenemiyor, ortalama hiçbir koşunun vermediği bir sayı çıkıyor; hiçbir ablasyon sapmayı
aşmıyor — 104. Kayıp maskesi neyi koruyacağını belirler; hizalama vergisi ölçülebilir (0,46286 → 1,23545);
tasmanın uzunluğu δ = 1,5 ÷ β; ve tercih karşılanırken yeğlenen cevabın olasılığı binde bire inebiliyor
çünkü δ oranı ölçüyor, düzeyi değil — 105. Bir eğitim adımı parametre başına 16 bayt ister; aktivasyonlar
katman başına s·b·h·(34 + 5as/h) bayt tutar ve GPT-3'te mikro yığın bir iken 275 GB eder; yeniden
hesaplamanın ölçülmüş bedeli %39; aynı çip üretimde sırt noktasının solunda, eğitimde 157 kat sağındadır
ve iki rejim arasındaki oran 1.024; tepe hız asla ulaşılmaz, en iyi koşularda kullanım oranı %46 — 106.

**Sıradaki makaleler ve prerequisite'ler.** 107–109 Faz 13'ü kapatır, 110 Faz 14'ü açar.
**107 ← 106** (defterin kapanmaması: 8 milyar parametre 80 GB'lık karta sığmıyor ve 106'nın kapanışı dört
ekseni adıyla sordu), **8** (veri ve model paralelliğinin adı orada kondu, kurulumu buraya ertelendi),
**85 (DİKKAT: hepsi-hepsiye iletişim ve kesim bandı ORADA kuruldu — 107 bunu tekrarlayamaz, genel
paralellik çerçevesine yerleştirmeli)**, 89 (kartlar arası bandın en yavaş büyüyen eksen olması),
26–28 (çıkarım tarafındaki bölme kararlarıyla karşıtlık).
**108 ← 106** (bellek merdiveni ve bant genişliği), **86 ve 25 (DİKKAT: FlashAttention'ın ne yaptığı
ORADA anlatıldı; 108 mekanizmayı tekrar etmeyip çekirdek mühendisliğinin genel biçimine taşımalı)**,
27 (karma hassasiyet ve sayı biçimleri), 7 (karesel maliyetin kaynağı), 106 (işlem yoğunluğunun hesabı).
**109 ← 8 (kontrol noktası, 466 iş kesintisi ve OPT günlüğü ORADA verildi — 109 onları tekrarlayamaz,
üzerine gözlem ve karar katmanını koymalı)**, 106 (kullanım oranının izlenmesi), 101 (koşu ölçümlerinin
gürültüsü), 104 (kendi koşumuzda görülen tohum oynaklığı), 102 (koşunun belgelenmesi).
**110 ← 81–90** (çoklu modalite fazının devri), 5 ve 8 (sonraki token hedefinin ne öğretip ne öğretmediği),
96 (genelleme kuramı), 100 (haritanın sentezi).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Veri/model paralelliği (8), hepsi-hepsiye iletişim (85, **tekrar değil yerleştirme olmalı**), kartlar
  arası bant (89), eğitim durumunun bölünmesi (106) → 107.
- Bellek merdiveni (106), FlashAttention (25/86, **tekrar değil genelleme olmalı**), sayı biçimleri (27) → 108.
- Kontrol noktası ve arıza istatistikleri (8, **tekrar değil devam olmalı**), kullanım oranı (106),
  ölçüm gürültüsü (101) → 109.
- Faz 9'un modalite tartışması (81–90), sonraki token hedefinin sınırı (5/8) → 110.

**Araştırılacak güncel akademik alanlar.** **107:** Rajbhandari ve ark. (ZeRO, SC 2020) ve Narayanan ve ark.
(Megatron-LM, SC 2021) bu batch'te 106'da kullanıldı ve orada yalnızca bellek/verim tarafı alındı —
paralellik biçimlerinin kurulumu 107'ye ait. Ek olarak Huang ve ark. (GPipe, NeurIPS 2019), Korthikanti ve
ark.'nın dizi paralelliği (MLSys 2023, 106'da kullanıldı), ve FSDP'nin hakemli sürümü (Zhao ve ark., VLDB
2023) aranmalı. **108:** Dao ve ark. (FlashAttention, NeurIPS 2022) 106'da künye olarak kullanıldı;
108 için FlashAttention-2/3'ün hakemli sürümleri, Micikevicius ve ark. (ICLR 2018) ve düşük duyarlıklı
biçimlerin hakemli ölçümleri gerekir. **109:** Meta'nın Llama 3 raporu ve OPT günlüğü 8'de kullanıldı ve
hakemsizdir; 109 için hakemli kaynak aramak zor olacak — büyük ölçekli sistemlerde hata toleransı
literatürü (SC/ASPLOS) ilk kanal olmalı. **110:** LeCun'un dünya modeli konumu hakemsizdir; Ha & Schmidhuber
(NeurIPS 2018) ve Hafner ve ark.'nın Dreamer serisi hakemli kanallardır.
**Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir;** süreç kuralları
SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 107: dört bölme ekseninin aynı modelde ne böldüğü ve her birinin doğurduğu iletişim; **85'in
  hepsi-hepsiye şeklinin kopyası olmamalı.**
- 108: bir çekirdeğin taşıdığı bayt ile yaptığı işlem arasındaki oranın eniyilemeyle nasıl değiştiği.
- 109: bir koşunun zaman çizgisinde kesinti, geri dönüş ve kaybedilen iş; 8'in arıza tablosunun **kopyası
  değil**, karar tarafı.
- 110: modalitenin ötesinde ne kaldığı; faz açılışı olduğu için harita niteliğinde.
- **Uyarı (kararlar #214, #223, #231):** bu fazda da ölçülmemiş eğri çizilmemeli. Tablo ya da blok liste
  tercih edilmeli; kendi hesabımız olan her sayı işaretlenmeli ve girdileri şeklin içinde durmalı.

**Venue doğrulaması — Batch 25'in kanalları.** Klasik ve dergi künyeleri için **birincil kanal Crossref**
(`api.crossref.org/works/<doi>`): başlık, dergi, cilt, sayı, sayfa, yıl ve yazar soyadları tek çağrıda
gelir. **ACM DOI'leri (`doi.org/10.1145/...`) tarayıcıya 403 döner ve Biometrika bot doğrulaması gösterir;
ikisi de beklenen duvardır ve künyeyi geçersiz kılmaz** — Crossref ile telafi edilir. Çalışan dizinler:
`proceedings.mlsys.org/paper_files/paper/<yıl>`, `papers.nips.cc/paper_files/paper/<yıl>`,
`proceedings.neurips.cc/paper_files/paper/<yıl>`, `proceedings.mlr.press/v<cilt>`, `aclanthology.org`,
`jmlr.org/papers/v<cilt>` (`.bib` uzantısı künyenin tamamını verir), `ojs.aaai.org`. ICLR için
`proceedings.iclr.cc/paper_files/paper/2024|2025|2026` ve `iclr.cc/virtual/<yıl>/papers.html`.
**Yeni OpenReview kimliği yazma.** DOI'deki parantez markdown bağlantısını kırar; yüzde kodlamasıyla yazılır.
PDF'ler `pypdf` ile metne çevrilir; `arxiv.org/pdf/<id>` sürüm numarasız istenmeli.

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 26` ve `readingOrder` 107'den
kesintisiz devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir (başlık
değişecekse entegrasyondan **önce**); YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri
ve bağlayıcı kararlar güncellenir; doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve
sonraki run hazırlığıyla güncellenir. **Bir kategori kararı verilecek** (yukarıya bakın) ve numaralı karar
olarak yazılacak; `reading-list-groups.test.ts` çalıştırılır. **Level `advanced` kalır** (karar #201).
**Sonraki bağlayıcı karar numarası #233'tür.**

**Entegrasyon sırası (repo içi araçlarla):**
```
node tools/series/entegre-batch.cjs            # kuru çalışma: frontmatter → katalog/roadmap denetimi
node tools/series/entegre-batch.cjs --write    # catalog.json + roadmap.json
node tools/series/sync-series-hashes.cjs --write
node tools/series/check-series-content.cjs && node tools/series/check-series-svg.cjs
corepack pnpm typecheck && corepack pnpm test && corepack pnpm build
```
Notlar: frontmatter **gray-matter ile** okunur; `catalog.json` 2 boşluklu `JSON.stringify` ile
byte-identical round-trip yapar; `roadmap.json`'un kompakt satır biçimi satır bazlı replace ile korunur.
**Sıra önemlidir:** `sync-series-hashes.cjs` katalog varsa yalnızca katalog kayıtlarını gezer, dolayısıyla
yeni makalelerin hash'i ancak `entegre-batch --write`'tan **sonra** düzelir; frontmatter'a önce 64 sıfırlık
yer tutucu hash yazmak sorun değildir. `reading_order` frontmatter'da zorunludur. Roadmap başlığı frontmatter
başlığıyla birebir eşleşmek zorundadır. **Entegrasyondan sonra makale gövdesine her dokunuşta
`sync-series-hashes.cjs --write` yeniden çalıştırılır.** SVG'nin **kendisi** hash'i etkilemez, şekil **alt
metni** etkiler. Araçların üçü de varsayılan olarak yalnızca AI serisini işler.

## Ölçer betikleri (yeniden yazılması gerekenler)

Kalıcı değiller; her run kendi scratchpad'inde yeniden yazar. Batch 25'te kullanılanlar:

- **`wc.cjs`** — `check-series-content.cjs`'in `countProseWords`'ünün **birebir kopyası**. Kaynakçayı, şekil
  sözdizimini, bağlantı hedeflerini ve liste/alıntı işaretlerini atar. **`node -e` ile taklit edilmez, dosya
  olmalı;** kabuk içi tek satırlık taklit Batch 22'de 100–150 kelime fazla saydı.
- **`svgcheck.cjs`** — repo kapısının görmediği kusurlar: aynı satırdaki metin çiftlerinin çakışması
  (çarpan 0,58, pay 6 px), kutu içi metnin `x + width`'i aşması, sağ/sol kenar taşması, **alt pay ≥ 12**,
  kapanmamış `var(`, etiket dengesi. Batch 25'te üç kusur buldu (iki alt pay, bir sağ kenar).
- **`scan.cjs`** — yasaklı biçimler (`gömme`, `korpus`, `geliştirme kümesi`, `niceleme`, `az/sıfır atışlı`,
  `çekişmeli`, `optimizatör`), `N\.` kaçış denetimi, **kendi numarasına gönderme**, **numaralı ileri
  gönderme**, bölüm başlıkları, kutu sayısı, şekil sayısı, alt metin kelime sayısı, parantezli gloss listesi,
  şekil başlığında parantez.
- **`syncalt.cjs`** — markdown `alt` metnini SVG'nin `aria-label`'ına yazar. **Elle yazıldığında ayrışıyor.**
- **`net.py`** — `get` (indir + `<title>`), `pdf` (indir + `pypdf` ile metne çevir), `links` (her
  `[Bağlantı]` adresini çek), `crossref` (DOI künyesi), `q` (metin içi arama).
- **`sweep.py`** — rota taraması, **dilimli** (40'arlı dört dilim, toplam ~124 sn), `resp.geturl()`
  karşılaştırmalı ve gövde uzunluğu denetimli.
- **`shots.mjs`** — Playwright ile şekil PNG'leri; her `figure` 1.200 px'lik bir kaplayıcıya klonlanır ve
  sayfanın kendi arka plan rengiyle light/dark çekilir.

**Ek denetim (Batch 25'te eklendi ve kusur buldu): kaynakça–gövde eşleşmesi.** Kaynakçadaki her yazar adının
gövdede geçtiği mekanik olarak taranmalı. Bu tarama beş künye yakaladı; dördü kaynakçadan çıkarıldı, kalanlar
gövdede adıyla anıldı. SOZLESME §4 yalnızca gerçekten kullanılan kaynakların listelenmesini istiyor ve bu
kural gözle kolayca kaçırılıyor.

**Yayın öncesi zorunlu taramalar.** Kapsam değişmedi: kelime sayısı, parantezli gloss listesi, yasaklı
biçimler, kendi numarası ve numaralı ileri gönderme taramaları, `N\.` kaçış denetimi, bölüm başlıkları,
"Kendini yokla" ve şekil sayısı, **kaynakça–gövde eşleşmesi**. **Şekil alt metinleri kelime sayısına
girmiyor** ve uzun alt metinler taslağı olduğundan dolu gösteriyor — Batch 23'te dört makalenin üçü,
Batch 24'te dördü, **Batch 25'te de üçü** ilk turda bandın altında kaldı. SVG için **iki** kapı:
`check-series-svg.cjs` (viewBox, sabit renk, yasak öge, font boyutu; genişlik tahmini **0,55 × font-size**)
ve yeniden yazılacak `svgcheck` (çarpan **0,58**, pay 6 px). **Hiçbiri hizası bozuk bir satırı ya da yarım
kalmış bir cümleyi görmez** — PNG turu bu yüzden zorunlu. **Ayrıca:** yeni bir ölçü çifti ya da yeni bir
terim kurulacaksa YOL-HARITASI terim defterinin ilgili satırları **yazımdan önce** aranmalı; Batch 25'te bu
yolla "çekirdek" çakışması yakalandı (97'de kernel, 10'da çekirdek örnekleme) ve 106 GPU çekirdeklerinden
hiç söz etmeyip konuyu 108'e bıraktı. **Ve bir koordinat ya da işaret ödenirken o konuya en yakın
yayımlanmış makalenin tamamı okunmalı** — 103 ↔ 6/7 ve 106 ↔ 89 bu yolla ayrıştırıldı; aynı risk sonraki
bandda 107 ↔ 85, 108 ↔ 86/25 ve 109 ↔ 8'de var.

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch 25'te de
aynı worktree'de ikinci bir üretim oturumu (BOUN serisi) eşzamanlı çalışıyordu ve **3105 portunu
kullanıyordu**; bu run 3211'i seçti. Çakışma yaşanmadı çünkü (a) `artifacts/` hiç kullanılmadı, (b) build ve
dev sunucusu izole kopyada çalıştırıldı, (c) `.claude/launch.json` **okunup kendi girdisi eklenerek** yazıldı
ve temizlikte yalnızca o girdi çıkarıldı. Kontrol yalnızca porta bakmak değil: `git status` ile başka bir
serinin dosyalarının değişip değişmediğine, `netstat` ile dinlenen portlara ve `.wolf/memory.md`'nin son
satırlarına da bakılmalı. İzole kopya düzeni:
`tar --exclude=./node_modules --exclude=./.next --exclude=./.git --exclude=./artifacts --exclude=./.env.local
-cf - . | (cd /d/dev/anil-lib-bNN-render && tar xf -)`, junction PowerShell ile
`New-Item -ItemType Junction -Path 'D:\dev\anil-lib-bNN-render\node_modules' -Target 'D:\dev\anil-lib\node_modules'`,
kopyada `corepack pnpm build`, sonra `.claude/launch.json`'a geçici yapılandırma (Git Bash **tam yolu**,
`-lc`, `export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-bNN-render && exec corepack pnpm dev -p 3211`).
**launch.json'ı Bash ya da Python heredoc ile yazma:** `\\` çiftleri tek `\`'a iner; Write aracıyla yaz
(Git Bash'in yolu bu makinede `%LOCALAPPDATA%\Programs\Git\usr\bin\bash.exe`).
Kopyada `.env.local` olmadığı için okuyucu kapısı kendiliğinden kapalı — **ama yalnızca `next dev`'de**;
`next start` middleware'i devreye sokar ve bütün rotalar `/login`e yönlenir. **İçerik değiştikten sonra
kopyayı `tar -cf - content docs | (cd ... && tar xf -)` ile senkronlayıp yeniden build etmek gerekiyor;**
dev sunucusu zaten derlenmiş sayfayı önbelleğe aldığı için `preview_stop` + `preview_start` da gerekebilir.
Temizlik: **önce** `preview_stop`, sonra junction `cmd //c rmdir` ile kaldırılır, ardından ana `node_modules`
doğrulanır (`node_modules/next/package.json` yerinde), sonra kopya silinir; launch.json kendi girdisinden
arındırılır. Bash aracında `cd` bir komuttan sonrakine taşınmaz — her komut `cd /d/dev/anil-lib;` ile başlar;
Python Windows'ta `/d/dev/...` yolunu tanımaz (`D:/...` verilir) ve konsola Türkçe basarken
`sys.stdout.reconfigure(encoding="utf-8")` ister. **Bash aracında uzun Python heredoc'ları hem ayrıştırma
hatası veriyor hem de bazen dosyaya hiç yazmıyor** (Batch 25'te bir dosya üç ayrı denemede değişmedi);
uzun betikler Write aracıyla **oturum scratchpad'ine** yazılıp `python <dosya>` ile çalıştırılmalı.

**Render doğrulama seti (Batch 25'te kullanılan).** Rota sweep'i Python `urllib` ile, **dilimli**: 148 rota
40 + 40 + 40 + 28 dilim hâlinde, sunucu ayakta, toplam ~124 sn'de sorunsuz derlendi — **dilimleme kuralı
korunmalı.** Sweep betiği durum kodunun yanında `resp.geturl()`i ve gövde uzunluğunu da karşılaştırmalı.
Tarayıcı panosundan: `preview_start` → `resize_window` ile **açık genişlik/yükseklik** (1440×900, 768×1024,
375×812; `preset: "desktop"` emülasyonu **temizler**, ölçüm için kullanılmaz) → `javascript_tool` ile tema
döngüsü (`documentElement.classList` üzerinde `dark`/`sepia`) ve ölçüm. **Ölçüm betiği sayfa değiştirmemeli**
— `location.href` ataması `javascript_tool` çağrısını öldürüyor; navigasyon `navigate` aracıyla yapılır ve
her sayfa için ayrı ölçüm çağrısı verilir (`browser_batch` ile zincirlenebilir). **Ölçümden önce
`await new Promise(r=>setTimeout(r,2200))` koy.** `browser_batch` içindeki JSON'da regex kaçışlarına dikkat —
regex'i `new RegExp('[a-z]+[.][a-z]+[.][a-z]+','g')` gibi köşeli parantezle kur. Ölçülen genişlikler:
1440'ta SVG 771 px, 768'de 676 px, 375'te 351 px — üçünde de yatay kaydırma yok, hiçbir SVG kendi
`figure` kabından taşmıyor ve 375'te hiçbir tablo kapsayıcısını aşmıyor. **Şekil görüntüleri
Playwright'tan** (sayfada kaplayıcı div'e 1200 px klon + sayfanın kendi arka plan rengi, light/dark PNG):
13 şekil, 26 PNG, Read aracıyla incelendi. Playwright ana worktree'de `node_modules/@playwright/test`
altındadır ve ESM betiğinden **`import "D:/..."` ile çağrılamaz** (`ERR_UNSUPPORTED_ESM_URL_SCHEME`);
`createRequire("file:///D:/dev/anil-lib/")` + `require("@playwright/test")` kullanılmalı.
`waitUntil: "networkidle"` **kullanılmaz** — okuyucu `/api/reader-sync`'i sürekli yokladığı için ağ hiç
boşalmıyor; `domcontentloaded` + sabit bekleme kullan.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. Bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer —
  beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur (Batch 25'te de yalnızca bu 503;
  `read_network_requests` ile kaynağı doğrulandı).
- Ham HTML'de sayfa başına "undefined" görünür; Next.js iskelesindendir. `main.innerText` ölçümünde 0'dır.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` ve genişliğe karşı yatay taşmayı yakalar; **sütuna
  binmeyi, kutudan taşmayı, yetersiz alt payı ve kapanmamış `var(` parantezini görmez.** İki ölçerin karakter
  genişliği tahmini farklıdır (0,55 ↔ 0,58).
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde görünür;
  `foundations` iki öbek (1–5, 91–102) ve **`models-and-training` de artık iki öbek** (6–20, 103–106).
  Kasıtlıdır; `reading-list-groups.test.ts` bunu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) ayrı bir üretim hattıyla ilerliyor ve rotası `/boun`.
  AI serisinin araçları o dizine dokunmaz. Build iki seriyi birden derler. **Batch 22–25 sırasında o hat
  aynı worktree'de eşzamanlı çalışıyordu**; `artifacts/`, `.claude/launch.json` ve `.wolf/*` paylaşılan
  durumdur ve çakışabilir.
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor (`Karar`, `her`, `Yaşayan`, `yapılırsa`,
  `**Bu`, `**zorundadır**.`). Build'i etkilemiyor; temizlik AI serisinin kapsamı dışıdır.
- Batch 12–23'ün üretimi (51–98) kullanıcı tarafından commit edildi. **Batch 24 (99–102) ve Batch 25
  (103–106) çalışma ağacında commit edilmemiş** duruyor. Commit/push kullanıcı kararıdır (SOZLESME kapsamı
  dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)
- **Batch 25 (2026-09-11/12):** Makale 103–106, **Faz 12'nin tamamı + Faz 13'ün açılışı**: mikro-GPT'yi elle
  kurmak → kendi eğitim koşusu → kendi asistanı → GPU zihinsel modeli. `BATCH=4+1`. **İki kategori kararı
  birden verildi ve ikisi de `models-and-training` çıktı (karar #225).** Faz 12'nin üç makalesi büyük ölçüde
  **kendi ölçümümüz**: saf Python'da skaler ters-mod otomatik türevli 364 parametreli bir Transformer,
  gradyanları merkezi farkla doğrulanmış; tokenizer bu serinin kendi 102 makalesi üzerinde sıfırdan eğitildi.
  **Metodolojik ders iki kez tekrarlandı:** hem 104'ün ablasyon tablosu hem 105'in DPO tablosu tek tohumla
  yanlış sonuç veriyordu ve çok tohumlu tur ikisini de değiştirdi. 108'in başlığı Türkçeleştirildi (#227).
  Kararlar #225–#232; sonraki numara **#233**. 23 kaynak kaleminin 21'i hakemli — serinin en düşük hakemsiz
  oranı. **Yeni numaralı koordinat açılmadı; 100 ve 102'nin numarasız işaretleri 103'te ödendi.**
  Kapılar: `pnpm typecheck` (0), **661 test**, `pnpm build` (exit 0, `/seri/[slug]` 106 yol, 167 statik
  sayfa, izole kopyada), 148 rotanın tamamı 200 (dört dilim, ~124 sn), dört makale × üç genişlik × üç temada
  DOM ölçümü, 13 yeni diyagram Playwright ile light/dark PNG olarak alınıp gözle doğrulandı. Paralel BOUN
  oturumu yine aynı worktree'deydi (port 3105).
- **Batch 24 (2026-09-11):** Makale 99–102, **Faz 11'in kapanışı**. `BATCH=4+1`. Kategori sorusu yoktu
  (#219). **101 koordinatı ödendi ve defterde açık numaralı koordinat kalmadı.** Kararlar #217–#224.
  29 kaynağın 25'i hakemli. 642 test. OpenReview API'si kapandı.
- **Batch 23 (2026-09-10):** Makale 95–98, **Faz 10'un kapanışı + Faz 11'in açılışı**. Faz 11 `foundations`
  (#209). Kararlar #209–#216. 624 test.
- **Batch 22 (2026-09-10):** Makale 91–94, **Faz 10'un açılışı**. Kategori `foundations` (#200), level
  `advanced`e geçti (#201). **13'ün numarasız işareti 94'te ödendi.** 605 test. Paralel bir BOUN oturumu
  `artifacts/` altını sildi (#208g).
- **Batch 21 (2026-09-10):** Makale 87–90, **Faz 9'un kapanışı**. 34'ün işareti 87'de ödendi. 587 test.
- **Batch 20 (2026-09-09):** Makale 83–86, **Faz 9'un gövdesi**. İki bağlayıcı koordinat birden kapandı
  (20 → 85; 7 ve 15 → 86). 575 test.
- **Batch 19 (2026-09-09):** Makale 79–82; Faz 8 kapandı, Faz 9 açıldı (#176). 563 test.
- **Batch 18 (2026-09-09):** Makale 75–78. DBLP kapandı (#175). 74–77 bandı kapandı, 78 ödendi. 551 test.
- **Batch 17 (2026-09-06):** Makale 71–74, Faz 8'in açılışı (#160). 72 kapandı. 519 test.
- **Batch 16 (2026-09-06):** Makale 67–70, Faz 7'nin kapanışı. 20'nin iki koordinatı kapandı. 507 test.
- **Batch 15 (2026-09-05):** Makale 63–66. 64 koordinatı ödendi (#153). 495 test.
- **Batch 14 (2026-09-05):** Makale 59–62: Faz 6'nın kapanışı + Faz 7'nin açılışı (#142). 482 test.
- **Batch 13 (2026-09-05):** Makale 55–58. 470 test.
- **Batch 12 (2026-09-04/05):** Makale 51–54, Faz 6'nın açılışı (#128). 458 test.
- **Batch 11 (2026-09-03/04):** Makale 47–50, Faz 5'in kapanışı. 446 test.
- **Batch 10 (2026-09-02/03):** Makale 43–46. 431 test.
- **Batch 9 (2026-09-02):** Makale 39–42; Faz 4 kapandı, Faz 5 açıldı (#107). 419 test.
- **Batch 8 (2026-09-01):** Makale 35–38. 294 test.
- **Batch 7 (2026-08-30):** Makale 31–34. 277 test. İzole render kopyası ilk kez kullanıldı.
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
