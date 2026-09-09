# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-09 · Durum: **1–78 yayında (kohort Batch 0 → Batch 18) · Faz 8'in ikinci yarısı tamam · Sıradaki: 79 (Faz 8'in kapanışı 79–80 + Faz 9'un açılışı)**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 78 — `beliren-yetenekler-tartismasi-aniden-mi-geliyor` |
| Sıradaki güvenli başlangıç | Makale 79 ("Robustluk: Dağılım Kayması ve Adversarial Girdiler"); run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 79, 80, 81 ve 82 üretilir; bu dörtlü **Faz 8'i kapatır (79–80) ve Faz 9'u açar (81–82)**. Bağlayıcı bir koordinat **yoktur**; en yakın açık tekil koordinat 85'tir. 79 ve 80 numarasız işaretlerle çağrılmış durumda: 78 → 79 ("bir sonraki makale": dağılım kayması ve sağlamlık), 71 → 80 (şeffaflık ve belgeleme), 73 → 80 (hakemin kurumsal denetimi), 72 → 79 (dinamik ölçüt), 54 → 81 (görüntüyü token'a çeviren modeller, "çoklu modalite fazının konusu") |
| Sıradaki kohort | `classification_batch: 19` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs`; ek ölçerler: `artifacts/b18-research/scan-b18.py`, `svgcheck-b18.py`, `sweep-b18.py`, `shots-b18.cjs`, **`idx-b18.py`** (konferans dizinlerinde başlık arama), `venue-b18.py`, `hdr-b18.py` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–80 `safety-and-evaluation` (kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142, #148, #160, **#168**). Kohort 18 (75–78) tamamen `safety-and-evaluation`; okuma listesinde 61–78 tek öbek ve `reading-list-groups.test.ts` değişmedi. **Faz 9'un kategorisi karara bağlanmamıştır (aşağıya bak).** |

## Faz 9 kategori kararı — açık, sıradaki run'da verilecek

79 ve 80 karar #160 gereği `safety-and-evaluation` olarak kalır; soru 81'den itibarendir. Kontrollü sözlükte
(`content/series/schema.ts`) hazır bekleyen ad **`multimodal-and-future`**'dır ve Faz 9'un başlığı ("Çoklu Modalite ve
Verimlilik") ile birebir örtüşür; varsayılan öneri budur. Bedeli: aynı kohortun (Batch 19) iki kategoriye yayılması —
Batch 14'te aynısı yapıldı (karar #142) ve `groupByBatchAndCategory` bunu zaten kohort × kategori olarak kırdığı için
okuma listesi tutarlı görünür, test değişmez. Karar 79'un run'ında verilir ve YOL-HARITASI'na numaralı karar olarak
yazılır.

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları hâlâ İngilizce alan
  terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning ve Test-Time
  Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim defterine göre Türkçeleştiriliyor
  (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135, #148, #154, #155, #162, #163, #169, #170, #171). Katmanın
  tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır. Faz 8'in ve Faz 9'un başlıkları zaten Türkçe.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler.** Batch 18 üç başlığı Türkçeleştirdi (#169 "Yönlendirme ve
  Sondalar", #170 "Atıf", #171 "Beliren Yetenekler Tartışması"). Sıradaki dörtlüde iki aday var: **79 "Robustluk:
  Dağılım Kayması ve Adversarial Girdiler"** — "adversarial" için defterde **"düşmanca"** kayıtlı (karar #149, Batch
  15; "çekişmeli" yasaklı biçim), "robustluk" için **"sağlamlık"** doğal karşılık ve 63'te zaten kullanıldı; olası
  başlık "Sağlamlık: Dağılım Kayması ve Düşmanca Girdiler". **81 "Görüntüyü Anlamak: Vision-Language Modelleri"** —
  olası başlık "Görüntüyü Anlamak: Görü-Dil Modelleri" ya da terimi İngilizce bırakmak; karar 81'in run'ında,
  gövdelerde grep ile verilir. 80 ve 82'nin başlıkları zaten Türkçe. Başlık değişikliği entegrasyondan **önce**
  `roadmap.json`'a yazılır.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış vaatler"dedir.
  Batch 18 **74–77 bandını kapattı, 78 koordinatını ödedi ve yeni koordinat açmadı**. **Açık kalan koordinatlar:**
  85 (uzmanlar karışımı — 20), 86 (karesel maliyeti ödemeyen mimariler — 7, 15), 101 (ölçümün disiplini — 16, 22).
  Numarasız işaretler: 78 → 79 (dağılım kayması ve sağlamlık), 72 → 79 (dinamik ölçüt; işlevsel ölçüt),
  71 → 80 (şeffaflık ve belgeleme), 73 → 80 (hakemin kurumsal denetimi), 54 → 81 (görüntüyü token'a çeviren modeller),
  51 → 111, 49/53 → 115. Devrolan planlı tekrarlar: 65'in Azaria'sı 76'da tahsil edildi; 30'un kısıtlı üretimi ve
  33/40'ın pass@k ile görev ufku **tahsil edilmedi ve devrolur** (33/40 → 101 daha uygun görünüyor).
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR hâlâ uygulanmadı; tam listeler
  repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(13) önceki batch'lerden (kararlar #21, #97, #104, #106,
  #114, #120, #127, #134, #141, #147, #152, #159, #167). (14) **Batch 18:** Snell ve ark. "Predicting Emergent
  Capabilities by Finetuning" — bildiri PDF'i COLM şablonuyla dağıtılıyor ama başlık satırı "COLM 2024" derken
  arXiv sürümü Kasım 2024 tarihli; COLM kabul listesine erişilemedi (`proceedings.colm.cc` çözülmüyor,
  `colmweb.org/AcceptedPapers.html` 1,5 KB'lık yönlendirme sayfası), künye hakemsiz sayıldı. Arora & Goyal'ın
  belirme kuramı hiçbir dizinde bulunamadı ve kullanılmadı. Olshausen & Field'ın 1996/1997 seyrek kodlama yazıları
  üç ayrı adresten alınamadı; Bills'in nöron açıklamaları sayfasından yalnızca 6 KB metin çıktı (yerine Huang'ın
  BlackboxNLP 2023 değerlendirmesi); Zhou'nun Nature 2024 güvenilirlik yazısı yayıncı duvarında kaldı.
- **Hakemsiz kaynak oranı Batch 18'de en düşük seviyesinde (karar #175):** 84 kalemin **72'si hakemli**, 12'si
  işaretlenmiş hakemsiz kalem (Batch 17: 126/159, Batch 16: 36/99). Kural değişmedi: hakemli karşılığı varsa o öne
  çıkar.
- **DBLP kapalı (Batch 18'in bulgusu).** `dblp.org` ve iki aynası bot doğrulama sayfası döndürüyor; JS iş kanıtı
  istediği için betikle aşılamıyor. Venue doğrulaması artık `idx-b18.py` düzeniyle yapılır (aşağıda).

## Next batch preparation — 79'dan devam (Faz 8'in kapanışı + Faz 9'un açılışı: 79–82)

**Pedagojik hedefler.** Batch 18'in sonunda okuyucu şunu biliyor: devrenin düğümü nöron değil özelliktir; model
boyut sayısından fazla özelliği tam dik olmayan yönlere sıkıştırır (süperpozisyon), bedeli girişimdir ve bu ancak
seyreklikte kârlıdır; sıkıştırma seyrek bir otokodlayıcı sözlüğüyle çözülmeye çalışılır (512 nöron → 4.096 parça;
üretimde 34 milyon parça, %65'i ölü; GPT-4'te 16 milyon), bir parçanın "özellik" olduğu özgüllük ve müdahale
sınavlarıyla iddia edilir, sözlük istenmeyen sinyali silmekte nöronları açık farkla geçer (24,4 → 89,0) ama
kanonik liste değildir (tohumda %30 örtüşme, emilim, eksiklik, rastgele ağda da yüksek puan) (75). Bir davranışı
taşıyan yön dört yoldan bulunur ve ölçülen fark seçimin etiketle yapılıp yapılmadığından gelir; müdahale ekleme,
yön silme, kelepçeleme ve koşullu olmak üzere dörde ayrılır; katman, konum ve katsayı sonucun içindedir; ret yönü
13 modelde tek boyutludur ve doğruluk yönüyle 32,5 → 65,1 elde edilir, ama kırk kümede yönlendirilebilirlik örnekten
örneğe değişir ve açık uçlu üretimde düz istem bütün temsil yöntemlerini geçer; aynı davranışın üç kapısı vardır
(76). "Neden" üç ayrı sorudur — girdi, bileşen, eğitim verisi —; ısı haritaları rastgeleleştirilmiş modelde
değişmeyebilir, sil-ve-yeniden-eğit ölçütünde çoğu yöntem rastgeleyi geçemez, tam ve doğrusal her yöntemin
başarısızlığı kanıtlanmıştır, açıklama bir saldırı yüzeyidir, eğitim verisine atıf bugün zayıftır ve modelin kendi
gerekçesi bir kanıt değil bir çıktıdır (77). Beliren yetenek bir gözlemin adıdır; cetvel açıklamanın büyük kısmını
taşır ama kayıp ekseninde eşikler ölçüden bağımsız durur; sıçramanın altında beceri parçaları, gizli ilerleme, geç
genelleme ve faz geçişi vardır; öngörü bilinen görev içindir ve ölçek yön garantisi değildir (78).

**Sıradaki makaleler ve prerequisite'ler.** **79 ← 78** ("bir sonraki makale" devri: aynı model koşullar değişince
başka şey yapabilir), 63 (jailbreak; gradyanla eniyilenmiş saldırı; evrensel saldırı ifadesi; kırmızı takım),
58 (istem enjeksiyonu; kum havuzu), 72 (dağılım dışına çıkınca puanın düşmesi; yeniden yazılan sınav), 71 (geçerlilik
zinciri; kısayol), 2 (genelleme; aşırı öğrenme), 17 (halüsinasyonun dağılım kaymasıyla ilişkisi), 45 (kaynak
sadakati), 27 (kuantizasyonun bozduğu şey — dolaylı), 76 (yönlendirmenin dağılım dışına genelleşmemesi).
**80 ← 69** (yönetişim; denetimin erişimi; şeffaflık yükümlülüğü), 70 (sorumlu ölçekleme çerçeveleri; eşik ölçümü),
71 (şeffaflık ve belgeleme işareti), 73 (hakemin kurumsal denetimi işareti), 20 (açık ağırlık; model kartının yeri),
16 (ölçüt raporlamanın disiplini), 68 (marjinal risk raporlaması), 8 ve 14 (veri kartı; veri kaynağının belgelenmesi).
**81 ← 54** (bilgisayar kullanan ajan; ekran görüntüsünü token'a çevirme — **numarasız işaretin tahsili**), 4 (token
ve embedding), 6–7 (dikkat; mimari), 3 (temsil; görüntü ağlarındaki kenar–şekil–nesne merdiveni), 23 (örnekle
öğrenme), 75 (özellik kavramının görüntü tarafındaki kökeni). **82 ← 81** (modalitenin token'a çevrilmesi), 10
(üretim ve örnekleme), 26 (anahtar-değer önbelleği; gecikme), 60 (gecikme ve maliyet).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Jailbreak, evrensel saldırı ifadesi, kırmızı takım (63), istem enjeksiyonu (58), genelleme (2) → 79.
- Denetimin erişimi (69), sorumlu ölçekleme (70), açık ağırlık (20), veri kartı (8, 14) → 80.
- Bilgisayar kullanan ajan ve ekran görüntüsü (54), temsil merdiveni (3), tokenizasyon (4) → 81.
- Anahtar-değer önbelleği ve gecikme (26, 60), örnekleme (10) → 82.
- Devrolan planlı tekrarlar: pass@k (33) ve görev ufku (40) → 101 önerilir; kısıtlı üretim (30) → 82 ya da 84.

**Araştırılacak güncel akademik alanlar (79 için öncelikli):** dağılım kayması ve sağlamlık ölçütleri (Hendrycks &
Dietterich ICLR 2019 ImageNet-C; Hendrycks ve ark. ICCV 2021 ImageNet-R/A; Taori ve ark. NeurIPS 2020; Koh ve ark.
ICML 2021 WILDS; Miller ve ark. ICML 2021 "accuracy on the line" — hepsi doğrulanmalı), dil modelinde sağlamlık
(Wang ve ark. AdvGLUE NeurIPS 2021; Ribeiro ve ark. ACL 2020 CheckList; Goel ve ark. NAACL 2021 Robustness Gym;
Wang ve ark. DecodingTrust NeurIPS 2023; Zhu ve ark. PromptBench; Shi ve ark. ICML 2023 "distracted by irrelevant
context"), düşmanca girdiler (Zou ve ark. 2023 GCG — 63'te; Carlini ve ark. NeurIPS 2023 "are aligned neural networks
adversarially aligned"; Anil ve ark. 2024 "many-shot jailbreaking"; Andriushchenko ve ark. "jailbreaking leading
safety-aligned LLMs with simple adaptive attacks"), sertifikalı savunma ve sınırları (Cohen ve ark. ICML 2019
randomized smoothing; Madry ve ark. ICLR 2018 düşmanca eğitim; Tsipras ve ark. ICLR 2019 doğruluk–sağlamlık takası),
dinamik ve canlı ölçütler (72'den devir: DyVal, LiveBench). **80 için:** Mitchell ve ark. FAT* 2019 model kartları;
Gebru ve ark. CACM 2021 veri kümesi künyeleri; Bender & Friedman TACL 2018 veri açıklamaları; Raji & Buolamwini AIES
2019; Anthropic/OpenAI/Google sistem kartları (hakemsiz, işaretlenerek); Bommasani ve ark. Foundation Model
Transparency Index (doğrulanmalı); EU AI Act belgeleme yükümlülükleri (69'da kullanıldı). **81 için:** Radford ve ark.
ICML 2021 CLIP; Alayrac ve ark. NeurIPS 2022 Flamingo; Li ve ark. ICML 2023 BLIP-2; Liu ve ark. NeurIPS 2023 LLaVA;
Dosovitskiy ve ark. ICLR 2021 ViT; Bavishi ve ark. Fuyu (hakemsiz); Beyer ve ark. PaliGemma; görsel ölçütler
(MMMU CVPR 2024; MathVista ICLR 2024) — hepsi doğrulanmalı. **82 için:** Radford ve ark. ICML 2023 Whisper; Baevski
ve ark. NeurIPS 2020 wav2vec 2.0; Borsos ve ark. AudioLM; Défossez ve ark. Moshi (hakemsiz); gerçek zamanlı ses
sistemleri ve gecikme bütçesi. Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir;
süreç kuralları SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 79: kayma türleri tablosu (kovaryat / etiket / kavram kayması × örnek × ölçülme biçimi); doğruluk–sağlamlık takası
  şeması; saldırı ile gündelik kayma arasındaki ortak yapı (63'ün devamı: en kötü durum ↔ ortalama durum).
- 80: model kartı ile sistem kartının bölüm bölüm karşılaştırması; ne yazılıyor ↔ ne yazılmıyor tablosu (69'un
  denetim erişimi kademeleriyle hizalı); belgeleme yükümlülüğünün zaman çizgisi.
- 81: görüntünün token'a çevrilmesinin üç yolu (yamalar, birleştirici, çapraz dikkat); aynı sorunun metin ve görüntü
  hattındaki akışı; görsel ölçütlerde neyin ölçüldüğü tablosu.
- 82: ses hattının gecikme bütçesi (yakalama → token → üretim → oynatma); ardışık hat ile uçtan uca modelin
  karşılaştırması.

**Venue doğrulaması — DBLP kapalı, yeni düzen.** `artifacts/b18-research/idx-b18.py`:
`python idx-b18.py fetch` konferans dizinlerini `idx/` altına indirir (bir kez), `python idx-b18.py "başlık" ...`
hepsinde birden arar. Çalışan kaynaklar: `proceedings.iclr.cc/paper_files/paper/2024|2025|2026` (2023 ve öncesi 404),
`papers.nips.cc/paper_files/paper/2017…2024` (2025 henüz eksik), `proceedings.mlr.press/v70|v80|v97|v119|v139|v162|
v202|v235|v267` (ICML 2017–2025; v306 = ICML 2026 henüz 404), `jmlr.org/tmlr/papers` (TMLR'ın tamamı).
İkinci kanal `venue-b18.py`: arXiv API'nin `comment` ve `journal_ref` alanları + Crossref `query.bibliographic`
(ACL/EMNLP/NAACL/Findings/TACL/ACM/PNAS/Science/Nature için güvenilir) + OpenAlex (ML konferansları için gürültülü,
düşük öncelik). Üçüncü kanal `hdr-b18.py`: indirilen PDF metinlerinin ilk sayfasındaki yayın satırını tarar
(190 dosyanın 57'sinde bulundu; NeurIPS/ICML/ICLR/TMLR camera-ready satırları en güvenilir kanıt). **Kapalı olanlar:**
DBLP (bot doğrulama), OpenReview arama ucu (birkaç sorgudan sonra sessizce boş liste; 50 sn aralık yetmedi),
Semantic Scholar (429), COLM kabul listesi. **Tuzaklar:** NeurIPS dizininde başlıklar hatalı yazılmış olabiliyor
(tam başlık yerine kısa parça ara); aynı başlığın farklı konferanslarda başka bildirileri olabiliyor; arXiv v1
başlığı yayımlanmış başlıktan farklı olabiliyor. Batch 18'in kaynak metinleri `artifacts/b18-research/pdf/*.txt`
altında; PDF'ler build şişmesin diye silinir, `.txt`'ler yerinde kalır.

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 19` ve `readingOrder` 79'dan kesintisiz devam
ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir (başlık değişecekse entegrasyondan
**önce**); YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve bağlayıcı kararlar güncellenir
(Faz 9'un kategori kararı ve 74–77 bandının kapanmış hâli dâhil); doğrulama kapıları çalıştırılır; `+1` fazında bu
dosya yeni cursor ve sonraki run hazırlığıyla güncellenir. **Faz 9 kategori kararı bu run'da verilir**;
`reading-list-groups.test.ts` her hâlükârda çalıştırılır.

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
sorun değildir. Roadmap başlığı frontmatter başlığıyla birebir eşleşmek zorundadır.
**Entegrasyondan sonra makale gövdesine her dokunuşta `sync-series-hashes.cjs --write` yeniden çalıştırılır**
(Batch 18'de 77 ve 78 kelime bandı için genişletildi, 75'in şekil alt metni değişti; her seferinde yeniden
senkronlandı). SVG'nin **kendisi** hash'i etkilemez, şekil **alt metni** etkiler. Araçların üçü de varsayılan olarak
yalnızca AI serisini işler.

**Yayın öncesi zorunlu taramalar.** `artifacts/b18-research/scan-b18.py <makale.md> <N>` tek komutta veriyor:
kelime sayısı, parantezli gloss listesi, yasaklı biçimler (`gömme`, `korpus`, `geliştirme kümesi`, `niceleme`,
`az/sıfır atışlı`, `çekişmeli`), **kendi numarası** ve **numaralı ileri gönderme** (≥ N+1) taramaları, bölüm
başlıkları, "Kendini yokla" ve şekil sayısı. **Uyarı:** `scan-b18.py`'nin kelime sayısı şekil alt metinlerini de
sayar, repo kapısı saymaz; bant kararı için `check-series-content.cjs`'in sayısına bakılır (Batch 18'de iki makale
bu yüzden ilk turda tabanın altında kaldı). İleri gönderme taramasının bulguları elle ayıklanır (yüzde, puan, eğri
altı alanı yanlış pozitif verir). SVG için **iki** kapı: `check-series-svg.cjs` (viewBox, sabit renk, yasak öge,
font boyutu; genişlik tahmini **0,55 × font-size**) ve `artifacts/b18-research/svgcheck-b18.py <klasör>` (aynı
satırdaki her metin çifti, kutu içi metnin `x + width`'i, sağ/sol kenar, alt pay ≥ 12 **ve repo kapısının 0,55
tahmininin taklidi**); ayrıca her SVG `python -c "import xml.etree.ElementTree as ET; ET.parse(f)"` ile ayrıştırılır
ve `grep -c 'var(--[a-z-]*"'` ile kapanmamış `var(` parantezi aranır. **PNG turu Batch 18'de de iki kusur buldu**
(kutu kenarına dayanan metin; eğrinin üstünden geçen etiket) — ölçer bunları görmedi, gözle bulundu.

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch 18'de de 3000–3999
arası dinleyen port yoktu; yine de izole kopya kullanıldı ve ana worktree'nin `.next` dizinine hiç dokunulmadı:
`tar --exclude=./node_modules --exclude=./.next --exclude=./.git --exclude=./artifacts --exclude=./.env.local -cf - .
| (cd /d/dev/anil-lib-b18-render && tar xf -)`, junction PowerShell ile `New-Item -ItemType Junction -Path
'D:\dev\anil-lib-b18-render\node_modules' -Target 'D:\dev\anil-lib\node_modules'`, kopyada `corepack pnpm build`
(exit 0; `/seri/[slug]` 78 yol), sonra kopyanın `.next`'i silinip `.claude/launch.json`'a geçici yapılandırma
(`anil-lib-seri-b18`: Git Bash **tam yolu**, `-lc`, `export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-b18-render &&
exec corepack pnpm dev -p 3210`). **launch.json'ı Bash heredoc ile yazma:** `\\` çiftleri tek `\`'a iner; Write
aracıyla yaz (Git Bash'in yolu bu makinede `%LOCALAPPDATA%\Programs\Git\usr\bin\bash.exe`). Kopyada `.env.local`
olmadığı için kapı kendiliğinden kapalı. `typecheck` ve `test` ana worktree'de çalıştırıldı. **Yeni ders:** kopya
oluşturulduktan sonra ana worktree'de içerik değişirse dosyaları kopyaya senkronlamak yetmiyor — dev sunucusu
`catalog.json`'u bellekte tuttuğu için "Katalog ile frontmatter uyuşmuyor" hatası veriyor; `preview_stop` +
`preview_start` gerekiyor. Temizlik: **önce** `preview_stop`, sonra junction `cmd /c rmdir` ile kaldırılır, ardından
ana `node_modules` doğrulanır (`node_modules/next/package.json` yerinde ve `pnpm test` yeşil), sonra kopya silinir;
launch.json `artifacts/b18-research/launch.json.orig`'ten geri alınır. Kural değişmedi: **ana worktree'de `.next`
silme, `pnpm build` ya da `next dev` başlatmadan önce `netstat` ve `tasklist` ile paralel süreç var mı bak.** Bash
aracında `cd` bir komuttan sonrakine taşınır — her komut `cd /d/dev/anil-lib;` ile başlar; Python Windows'ta
`/d/dev/...` yolunu tanımaz (`D:/...` verilir) ve konsola Türkçe basarken `sys.stdout.reconfigure(encoding='utf-8')`
ister.

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un bulgusu sürüyor.** Batch 18'de PDF'ler build'den **önce**
silinir (`artifacts/b18-research/pdf/*.pdf`); build zaten izole kopyada ve kopya `artifacts`'ı içermiyor.
Kalanlar: `pdf/*.txt`, `idx/*.html`, `dblp-b18.json` (b13–b17'den tohumlanmış, bu run'da kullanılamadı),
`venue-b18.json`, `orv-b18.json`, `hdr-b18.txt`, `fetch-b18*-report.json`, betikler, `shots/*.png`,
`launch.json.orig`, loglar.

**Render doğrulama seti (Batch 18'de kullanılan).** Rota sweep'i Python `urllib` ile (79 rota, 39,6 sn;
`artifacts/b18-research/sweep-b18.py`), tarayıcı gezintisinden **önce**. Tarayıcı panosundan: `preview_start`
(`anil-lib-seri-b18`) → `resize_window` ile **açık genişlik/yükseklik** (1440×900, 768×1024, 375×812; `preset:
"desktop"` emülasyonu **temizler**, ölçüm için kullanılmaz — pano gizliyken `innerWidth` 0 gelir) →
`javascript_tool` ile tema döngüsü (`documentElement.classList` üzerinde `dark`/`sepia`) ve ölçüm
(`scrollWidth > innerWidth`, figure/svg/figcaption/h2/blockquote sayıları, `main.innerText` içinde `undefined`/`NaN`
ve ham i18n anahtarı deseni). **`browser_batch` içindeki JSON'da regex kaçışlarına dikkat** — `\\.` gibi diziler
"Unexpected end of input" veriyor; regex'i `new RegExp('[a-z]+[.][a-z]+[.][a-z]+','g')` gibi köşeli parantezle kur.
375'te SVG'ler kendi kaplarına ölçekleniyor (351 px) ve yatay kaydırma bile gerekmiyor. **Şekil görüntüleri
Playwright'tan** (`shots-b18.cjs`; `#b18o` kaplayıcıda 1200 px klon, light/dark PNG): 12 şekil, 24 PNG, Read aracıyla
incelendi.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki betikler de lint
  kapsamındadır; bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer —
  beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur (Batch 18'de de yalnızca bu 503 görüldü).
- Ham HTML'de sayfa başına 39 "undefined" görünür; Next.js iskelesindendir ve yayımlanmış eski makalelerde de
  aynıdır. `main.innerText` ölçümünde 0'dır — regresyon değil.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` ve genişliğe karşı yatay taşmayı yakalar; **sütuna
  binmeyi, kutudan taşmayı ve kapanmamış `var(` parantezini görmez** — bunun için `svgcheck-b18.py` ve grep kapısı
  var. İki ölçerin karakter genişliği tahmini farklıdır (6,8 ↔ 7,15); repo kapısı daha muhafazakârdır.
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde görünür (27–28, 29,
  30–40, 41–60); `safety-and-evaluation` 61–78 tek öbek. Kasıtlıdır; `reading-list-groups.test.ts` bunu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) ayrı bir üretim hattıyla ilerliyor; AI serisinin araçları o
  dizine dokunmaz. Build iki seriyi birden derler.
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor (`Karar`, `her`, `Yaşayan`, `yapılırsa` izleniyor;
  `**zorundadır**.` izlenmiyor). Build'i etkilemiyor; temizlik AI serisinin kapsamı dışıdır.
- Batch 12–17'nin üretimi (51–74) kullanıcı tarafından commit edildi (17: `comm`/`b175a3f`). **Batch 18 (75–78)
  çalışma ağacında commit edilmemiş** duruyor: dört makale ve dört varlık klasörü izlenmiyor; `catalog.json`,
  `roadmap.json`, `HANDOFF.md`, `YOL-HARITASI.md` ve `.wolf/*` değişmiş durumda. Commit/push kullanıcı kararıdır
  (SOZLESME kapsamı dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)
- **Batch 18 (2026-09-09):** Makale 75–78, Faz 8'in ikinci yarısı: özellikler ve süperpozisyon → aktivasyonlara
  müdahale → atıf → beliren yetenekler tartışması. `BATCH=4+1`. Araştırma (198 kalemlik liste iki fetch kopyasıyla,
  191 metin; 15 kalemlik retry turu), yazım, entegrasyon ve doğrulama ana oturumda, workflow/subagent kullanılmadan
  yapıldı. **DBLP bot doğrulama sayfası döndürdüğü için venue doğrulaması konferans dizin sayfalarına, arXiv
  `comment` alanına, PDF yayın satırına ve Crossref'e taşındı** (#175); düzen altı künyeyi düzeltti. Üç başlık
  Türkçeleştirildi (#169, #170, #171). **74–77 bandı kapandı ve 78 koordinatı ödendi**; yeni koordinat açılmadı
  (kararlar #168–#175). 84 kaynak kaleminin 72'si hakemli — serinin en yüksek oranı. Kapılar: `pnpm typecheck` (0),
  551 test, `pnpm build` (exit 0, `/seri/[slug]` 78 yol, izole kopyada), 79 rotanın tamamı 200 (39,6 sn), dört
  makale × üç genişlik × üç temada DOM ölçümü (taşma 0, sızıntı yok), 12 yeni diyagram Playwright ile light/dark PNG
  olarak alınıp gözle doğrulandı; PNG turu ölçerin kaçırdığı iki kusuru buldu. Paralel oturum görünmedi; build ve dev
  sunucusu izole kopyada (`D:\dev\anil-lib-b18-render`, 3210), launch.json geri alındı, kopya ve junction silindi.
- **Batch 17 (2026-09-06):** Makale 71–74, Faz 8'in açılışı: değerlendirme bilimi → kirlilik ve ezber → insan
  değerlendirmesi ve hakem modeller → mekanistik yorumlanabilirlik. `BATCH=4+1`. Faz 8'in kategorisi
  `safety-and-evaluation` olarak karara bağlandı (#160); iki başlık Türkçeleştirildi (#162, #163). **72 koordinatı
  kapandı, 74–77 bandının ilk taksidi ödendi.** 159 kaynak kaleminin 126'sı hakemli. Kapılar: 519 test, `pnpm build`
  (exit 0, 74 yol), 75 rota 200, 12 diyagram PNG ile doğrulandı.
- **Batch 16 (2026-09-06):** Makale 67–70, Faz 7'nin kapanışı: aldatma ve durum farkındalığı → kötüye kullanım →
  yönetişim → sorumlu ölçekleme. İki başlık Türkçeleştirildi (#154, #155); 20'nin iki koordinatı kapandı. 507 test,
  71 rota 200.
- **Batch 15 (2026-09-05):** Makale 63–66, Faz 7'nin gövdesi: jailbreak ve kırmızı takım → Constitutional AI →
  belirsizlik ve kalibrasyon → dalkavukluk ve model karakteri. 64 koordinatı ödendi (#153). 495 test, 67 rota 200.
- **Batch 14 (2026-09-05):** Makale 59–62: Faz 6'nın kapanışı + Faz 7'nin açılışı. Faz 7 kategorisi
  `safety-and-evaluation` (#142); kohort iki kategoriye yayıldı. 482 test, 63 rota 200.
- **Batch 13 (2026-09-05):** Makale 55–58, Faz 6'nın ikinci yarısı. 58'in başlığı Türkçeleştirildi (#135). 470 test.
- **Batch 12 (2026-09-04/05):** Makale 51–54, Faz 6'nın açılışı. Faz 6 kategorisi `agents-and-retrieval` (#128).
  458 test.
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
