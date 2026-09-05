# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-06 · Durum: **1–70 yayında (kohort Batch 0 → Batch 16) · Faz 7 kapandı · Sıradaki: 71 (Faz 8'in açılışı, 71–74)**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 70 — `sorumlu-olcekleme-sinir-model-guvenlik-cerceveleri` |
| Sıradaki güvenli başlangıç | Makale 71 ("Değerlendirme Bilimi: Benchmark'ların Ötesi"), Faz 8'in ilk makalesi; run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 71, 72, 73 ve 74 üretilir. **72 bağlayıcı bir koordinattır** (8, 16, 18 ve 31'in "kirliliğin değerlendirmeye etkisi ve ezberin benchmark'lara yansıması" vaadi); 74 ise 6 ve 18'in açtığı **74–77 koordinat bandının** ilk makalesidir ("modelin içine bakmanın araçları ve açıklamanın sınırı") |
| Sıradaki kohort | `classification_batch: 17` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs`; ek ölçer: `artifacts/b16-research/svgcheck-b16.py` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–70 `safety-and-evaluation` (kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142, #148). Kohort 16 (67–70) tamamen `safety-and-evaluation`; okuma listesinde 61–70 tek öbek ve `reading-list-groups.test.ts` değişmedi (507 test). **Faz 8'in (71–80) kategorisi 71'in run'ında kararlaştırılır; hazırlık aşağıda.** Yeni makaleler dizin olarak kategorinin klasörüne girer |

## Faz 8 kategori kararı — hazırlık (karar 71'in run'ında verilir)

Kontrollü sözlük: `foundations`, `models-and-training`, `reasoning-and-memory`, `agents-and-retrieval`,
`safety-and-evaluation`, `multimodal-and-future`, `case-studies` (`src/lib/content/schema.ts`; yeni kategori
eklemek `CATEGORY_LABELS` üzerinden derleme zamanı hata verir, yani etiket de eklenmelidir).

- **Varsayılan öneri: `safety-and-evaluation` devam eder (71–80).** Gerekçe: sözlükte "değerlendirme" sözcüğünü
  taşıyan tek kategori bu; 71–73 (değerlendirme bilimi, kirlilik, hakem modeller) doğrudan ölçüm, 74–77
  (yorumlanabilirlik) 62/65/67'de sonuç düzeyinde kullanılan araçların kurulumu, 78–80 (beliren yetenekler,
  robustluk, şeffaflık) yine ölçüm ve belgeleme. Bedeli: okuma listesinde 61–80 **yirmi makalelik tek öbek**
  olur. Bu bir hata değil; `groupByBatchAndCategory` öbeği kohort × kategori kırılımıyla kuruyor, yani liste
  Batch 14/15/16/17 başlıkları altında ayrı ayrı görünmeye devam eder ve test değişmez.
- **Alternatif: yeni bir kategori açmak** (ör. `evaluation-and-interpretability`). Bedeli: `schema.ts`'de
  `CATEGORIES` + `CATEGORY_LABELS`, iki serinin şema testleri ve okuma listesi başlıkları; ayrıca 61–70 ile
  71–80 arasında yapay bir sınır. Kazanç: liste başlığı içeriği daha iyi adlandırır.
- Karar 71'in run'ında verilir ve YOL-HARITASI'na bağlayıcı karar olarak yazılır; hangi seçenek olursa olsun
  `reading-list-groups.test.ts` çalıştırılır.

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları hâlâ İngilizce alan
  terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning ve Test-Time
  Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim defterine göre Türkçeleştiriliyor
  (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135, #148, #154, #155). Katmanın tümden Türkçeleştirilip
  Türkçeleştirilmeyeceği kullanıcı kararıdır. Faz 8'in başlığı ("Değerlendirme ve Yorumlanabilirlik") zaten
  Türkçe; Faz 9 "Çoklu Modalite ve Verimlilik" de öyle.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler.** Batch 16 iki başlığı Türkçeleştirdi: 68'in "Bio"su
  "Biyolojik" (karar #154), 70'in "Frontier"ı "Sınır Model" (karar #155). Sıradaki dörtlüde tek aday 71'in
  "Benchmark'ların Ötesi" başlığı: "benchmark" terim defterinde **Türkçeleştirilmez** diye kayıtlı (ilk geçiş 16)
  ve gövdede "değerlendirme kümesi" ile eşanlamlı kullanılıyor; başlıkta bırakılması #108 ölçütüne uygun, karar
  71'in run'ında teyit edilir. 73'ün "LLM-as-Judge"u ise defterde "hakem model" karşılığıyla kayıtlı (ilk geçiş
  45) — başlık büyük olasılıkla "İnsan Değerlendirmesi ve Hakem Modeller" olur; karar o run'da.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış vaatler"dedir.
  Batch 16 **iki koordinatı kapattı ve yeni koordinat açmadı**: 20'nin "açık kaynak tanımının düzenleyici
  çerçevedeki yeri" vaadi 69'un gövdesinde adıyla ödendi (muafiyetin metni ↔ tanımın listesi, 69-Şekil 2);
  20'nin "açık ağırlık yayımlamanın güvenlik tarafı" vaadi 68 (marjinal risk, unutturmanın geri kazanımı,
  yayımlama gradyanı) ve 70 (ağırlık güvenliği kademesi) ile tamamlandı. **Açık kalan koordinatlar:** 72
  (kirlilik ve ezber — 8, 16, 18, 31), 74–77 (modelin içine bakmanın araçları — 6, 18), 78 (beliren yetenekler —
  5, 9), 85 (uzmanlar karışımı — 20), 86 (karesel maliyeti ödemeyen mimariler — 7, 15), 101 (ölçümün disiplini —
  16, 22). Numarasız işaretler: 65 → 71/73 (kalibrasyon değerlendirme bilimi, hakem güveni), 66 → 71/72/73
  (dalkavukluğun ölçüsü, kimin görüşü), 67 → 71/73/74 (yetenek çıkarımı, sonda ve temsil müdahalesi), 68 → 71/72
  (taban ve marjinal risk; unutturmanın ölçülmesi), 69 → 71/80 (denetimin erişimi, şeffaflık endeksi), 70 →
  71/74 (değerlendirme bilimi ve modelin içine bakmak), 55/57 → 72, 52/56 → 73, 44 → 73, 38 → 73, 30 → 74,
  51 → 111, 49/53 → 115.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR hâlâ uygulanmadı; tam listeler
  repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(11) önceki batch'lerden (kararlar #21, #97, #104, #106,
  #114, #120, #127, #134, #141, #147, #152). (12) **Batch 16:** Urbina ve ark. Nature Machine Intelligence
  4(3) tam metni alınamadı (yayıncı duvarı; PMC kopyası yalnızca özet döndü) — çalışma **Sandbrink'in
  aktarımı üzerinden** anıldı, künye Crossref'le doğrulandı, sayı kullanılmadı; Weidinger ve ark. FAccT 2022
  taksonomisinin ACM PDF'i 403 döndü, 2021 arXiv sürümü okundu ve künye o sürümle verilmedi (metinde
  kullanılmadı); Hackenburg & Margetts (PNAS 2024) ve Salvi ve ark. (Nature Human Behaviour 2025) ve Costello
  ve ark. (Science 2024) için yayıncı metinleri kapalıydı, **sayılar yazarların ön baskı/kabul sürümlerinden**
  alındı ve künyede bu açıkça yazıldı; ISO/IEC 42001 standardının metni satın alma arkasında, yalnızca resmî
  tanıtım sayfası okundu ve makale standardın kapsamıyla sınırlı konuşuyor.
- **Hakemsiz kaynak oranı Batch 16'da beklendiği gibi yükseldi (karar #159):** 99 kalemin 36'sı hakemli, 9'u
  resmî belge, 54'ü işaretlenmiş hakemsiz kalem; 70'in hiçbir kaynağı hakemli değil ve bu gövdede söylendi.
  Kural değişmedi: hakemli karşılığı varsa o öne çıkar, resmî belgeler "resmî belge" diye işaretlenir,
  sağlayıcı belgelerinin **sürüm tarihi** künyeye yazılır.

## Next batch preparation — 71'den devam (Faz 8'in açılışı: 71–74)

**Pedagojik hedefler.** Batch 16'nın sonunda okuyucu şunu biliyor: aldatma inanç atfetmeden tanımlanır
(sistematik yanlış inanç + doğruluk dışı hedef) ve uydurmadan, dalkavukluktan ayrılır; güvenlik eğitimi bilerek
konmuş bir arka kapıyı silmez, düşmanca eğitim onu gizlemeyi öğretir; eğitildiğini bilen bir model talimatsız
hizalama taklidi yapabilir (%14 ↔ ≈0; taklit gerekçesi %12 → %78) ve bu yalnızca en büyük sürümlerde görüldü;
modeller değerlendirmeyi dağıtımdan 0,83 eğri altı alanla ayırt ediyor, insan 0,92, ve farkındalık gizli eylemi
nedensel olarak düşürüyor; üç okuma yolunun (dışarıdan sorma, sonda, zincir) üçünün de bilinen bir kaçağı var
(67). Kötüye kullanım tabanla sorulur; siberde model bulunmuş açığı ucuza uygular (%87 ↔ %7) ve insanın on bir
dakikada çözdüğü sınırda durur; biyolojik tarafta sonuç düzeneğe bağlı (%25 → %63, güvenlik önlemleri
kaldırılmış modelle) ve literatürün yöntemsel olgunluğu bağımsız incelemede zayıf bulundu; bilgi
operasyonlarında üretim ucuzladı, dağıtım ucuzlamadı ve aynı ikna gücü komplo inancını %20 azalttı; unutturma
erişimi zorlaştırır, bilgiyi silmez (68). Yasa modeli eşikle tutar (10²⁵ işlem karinesi), dört yükümlülük
yükler, açık kaynak muafiyetini dar tutar ve sistemik riskte hiç tanımaz; tanımın listesi ile muafiyetin listesi
çakışmaz; denetim erişimle tanımlanır (69). Çerçeveler eşik–önlem çifti kurar, belirsizlikte eşiği aşağı
yuvarlar, güvenlik savunmasını dört argümanla yazar ve üç halkası açıktır: eşiği geliştirici koyar, ölçüm sınavı
tanıyan modele karşı yapılır, doğrulama kurum içidir (70). 70'in kapanışı 71'e devretti: bir değerlendirme neyi
ölçer ve neyi ölçemez.

**Sıradaki makaleler ve prerequisite'ler.** **71 ← 16** (benchmark'ın ne ölçtüğü; liderlik tablosu; kalibrasyon
tanımı), 57 (ajan değerlendirmesinin dört sayısı; hile oranı; HAL'in maliyet-kayıtlı koşusu), 45 (hakem model ve
üç yanlılığı; tahmin destekli çıkarım), 65 (kalibrasyon, ECE, Brier — **numarasız işaretin tahsili**), 67
(yetenek çıkarımı, değerlendirme farkındalığı, yetenek saklama), 68 (marjinal risk ve taban), 69 (denetimin
erişimi; sosyoteknik değerlendirmenin üç katmanı), 70 (eşik ölçümü), 33 (kapsama ve pass@k), 40 (görev ufku ve
insan süresi birimi), 22 (istem duyarlılığı). **72 ← 8, 16, 18, 31** (**72 koordinatı**: kirlilik ve ezber), 14
(tekilleştirme ve kirlilik tanımı), 55 (çözüm sızıntısı), 57 (tutulan küme), 68 (unutturmanın ölçülmesi ve geri
kazanım), 41 (parametrik ↔ parametrik olmayan bellek). **73 ← 45** (hakem model; kendini kayırma), 16, 57 (hakem
ajan), 64 (tartışma ve danışmanlık; bilgisi olmayan hakem), 65 (hakem güveni — **numarasız işaretin tahsili**),
66 (hakem de dalkavukluğa açık), 52/56 (öz-yansıma ↔ hakem), 44 (sorgu yeniden yazma), 38 (süreç denetimi).
**74 ← 6, 18** (**74–77 bandının açılışı**: modelin içine bakmanın araçları), 3 (temsil), 7 (dikkat başı,
ileri beslemeli katman), 18 (anahtar-değer belleği; nedensel izleme), 62 (ret yönü), 65 (Azaria'nın iç
sınıflandırıcısı), 67 (sonda; temsil mühendisliği; doğruluğun doğrusal temsili), 30 (kısıtlı üretim — devir).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Cetvel bir tasarım ürünüdür (16, 57) → 71, 72, 73. Kalibrasyon ve ECE (65) → 71, 73.
- Kirlilik (14), ezber (8, 18), çözüm sızıntısı (55), tutulan küme (57) → 72.
- Hakem model ve üç yanlılık (45), tartışma (64), dalkavukluk (66) → 73.
- Temsil (3), anahtar-değer belleği ve nedensel izleme (18), ret yönü (62), sonda (67) → 74.
- Yetenek çıkarımı, değerlendirme farkındalığı, yetenek saklama (67) → 71, 73.
- Marjinal risk ve taban (68), denetimin erişimi (69), eşik ölçümü (70) → 71, 78, 80.

**Araştırılacak güncel akademik alanlar (71 için öncelikli):** değerlendirmenin istatistiği (Miller 2024 "Adding
Error Bars to Evals" — arXiv; Bowyer ve ark. 2025 belirsizlik — doğrulanmalı), ölçüt geçerliliği (Liao ve ark.
FAccT 2021 ya da 2024 — doğrulanmalı; Raji ve ark. NeurIPS 2021 D&B "AI and the Everything in the Whole Wide
World Benchmark"), HELM (Liang ve ark. TMLR 2023), BIG-bench (Srivastava ve ark. TMLR 2023), Chatbot Arena
(Chiang ve ark. ICML 2024), LiveBench ve dinamik ölçütler (doğrulanmalı), istem duyarlılığı (Sclar ve ark. ICLR
2024; Mizrahi ve ark. TACL 2024), çok seçmeli ölçütlerin kırılganlığı (Alzahrani ve ark. ACL 2024; Pezeshkpour &
Hruschka NAACL 2024), yetenek çıkarımı (Schaeffer 2024 — doğrulanmalı), değerlendirme bilimi çağrıları
(Weidinger ve ark. 2025 "Toward an Evaluation Science", arXiv; Reuel ve ark. TMLR 2025 zaten elde). **72 için:**
kirlilik tespiti (Sainz ve ark. EMNLP 2023 ve 2024; Golchin & Surdeanu ICLR 2024; Oren ve ark. ICLR 2024 "Proving
Test Set Contamination"; Deng ve ark. NAACL 2024), ezber ölçümü (Carlini ve ark. ICLR 2023 quantifying
memorization; Nasr ve ark. 2023 çıkarma saldırısı), GSM1k ve yeniden üretim (Zhang ve ark. 2024 — doğrulanmalı),
Dominguez-Olmedo ve ark. (doğrulanmalı). **73 için:** LLM-as-a-judge (Zheng ve ark. NeurIPS 2023 D&B — 45'te
kullanıldı; Thakur ve ark. 2024; Bavaresco ve ark. NAACL 2025 — doğrulanmalı), insan değerlendirmesi protokolü
(Clark ve ark. ACL 2021 "All That's Human Is Not Gold"), hakem yanlılıkları (Panickssery ve ark. NeurIPS 2024
kendini tanıma; Wataoka ve ark. 2024 self-preference), uzlaşma ölçüsü (Krippendorff/Cohen — klasik).
**74 için:** devre analizi (Olah ve ark. Distill 2020 zoom-in; Elhage ve ark. 2021 matematiksel çerçeve; Wang ve
ark. ICLR 2023 IOI devresi; Nanda ve ark. ICLR 2023 grokking), nedensel müdahale (Meng ve ark. NeurIPS 2022
ROME — 18'de kullanıldı; Geiger ve ark. 2023 hizalanmış arama; Conmy ve ark. NeurIPS 2023 otomatik devre
keşfi), süperpozisyon ve seyrek otokodlayıcılar (Elhage ve ark. 2022 toy models; Bricken ve ark. 2023; Templeton
ve ark. 2024 — 75'e devredilecek), yorumlanabilirliğin eleştirisi (Räuker ve ark. SaTML 2023; Casper ve ark.
2023). Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları
SOZLESME §9'dadır.

**Venue doğrulaması.** Batch 10–16'nın kanalları sürüyor: Crossref API ve `query.title`, ACL Anthology, DBLP
`ee` (12 sn aralık), PMLR dizini ve GitHub aynası, COLM kabul listesi, ICLR/NeurIPS proceedings sayfaları,
arXiv API başlık araması, Semantic Scholar `openAccessPdf` (**toplu sorguda 429 verir; tek tek ve aralıklı
sorulmalı**), `papers.nips.cc` yıl dizinleri, Europe PMC `fullTextXML`, **`pmc.ncbi.nlm.nih.gov` makale sayfası**
(Europe PMC 404 verirse), **OSF `osf.io/<id>/download`** (ön baskılar için). Kural sürüyor: OpenReview ve PMLR
kimlikleri **tahmin edilmez**. Yayıncı engelleri: OpenAI, ISO, PNAS, ACM DL ve OUP `urllib`'in varsayılan
başlığına 403 döner — tarayıcı `User-Agent`'lı `curl` kullanılır; RAND PDF'leri şifreli, `cryptography`
paketi kurulu olmalı. Batch 16'nın kaynak metinleri `artifacts/b16-research/pdf/*.txt` ve `html/*.txt` altında;
PDF'ler (133 dosya) build şişmesin diye silindi, `.txt`'ler yerinde. `dblp-b16.json` b15/b14/b13'ten
tohumlandı; yeniden çalıştırılınca yalnızca eksikleri sorar.

**Görselleştirme ihtiyaçları (öngörü):**
- 71: geçerlilik zinciri (yapı → görev → ölçüt → puan; her halkada ne kırılır); aynı modelin farklı istem
  biçimlerinde puan dağılımı (istem duyarlılığı); hata payı olmayan liderlik tablosu ↔ güven aralıklı tablo.
- 72: kirliliğin dört yolu (doğrudan sızıntı, çeviri/parafraz, dolaylı, çözüm sızıntısı) × tespit yöntemi;
  GSM1k tarzı yeniden üretimde puan düşüşü; ezber ↔ genelleme ekseninin 18'den devamı.
- 73: hakem–insan uzlaşması matrisi (hangi görevde ne kadar); üç yanlılığın (konum, uzunluk, kendini kayırma)
  ölçülmüş etkisi; insan protokolünün maliyeti ↔ hakem maliyeti.
- 74: bir devrenin anatomisi (girdi → başlar → kalıntı akış → çıktı; IOI gibi somut bir örnekle); nedensel
  müdahale şeması (ne değiştirildi, ne ölçüldü); sondanın ne söylediği ↔ ne söylemediği (67'nin sonda satırının
  devamı).

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 17` ve `readingOrder` 71'den kesintisiz
devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir (başlık değişecekse
entegrasyondan **önce**); YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve bağlayıcı
kararlar güncellenir (72 koordinatının "ödendi" satırı ve 74–77 bandının açılışı dâhil); doğrulama kapıları
çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki run hazırlığıyla güncellenir. Faz 8'in kategori
kararı yukarıdaki hazırlığa göre verilir ve okuma listesi öbeği ona göre büyür; `reading-list-groups.test.ts`
her hâlükârda çalıştırılır.

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

**Yayın öncesi zorunlu taramalar.** `artifacts/b16-research/scan-b16.py <makale.md> <N>` tek komutta veriyor:
kelime sayısı, parantezli gloss listesi (terim defteriyle karşılaştırmak için), yasaklı biçimler (`gömme`,
`korpus`, `geliştirme kümesi`, `niceleme`, `az/sıfır atışlı`, `çekişmeli`), **kendi numarası** ve **numaralı
ileri gönderme** (≥ N+1) taramaları, bölüm başlıkları, "Kendini yokla" ve şekil sayısı. İleri gönderme
taramasının bulguları elle ayıklanır (yüzde, puan, katılımcı sayısı ve eğri altı alan değerleri yanlış pozitif
verir). SVG için **iki** kapı: `check-series-svg.cjs` (viewBox, sabit renk, yasak öge, font boyutu, 720'ye
karşı taşma) ve `artifacts/b16-research/svgcheck-b16.py <klasör>` (sütuna binme, sağ/sol kenar, alt pay ≥ 12);
ayrıca her SVG `python -c "import xml.etree.ElementTree as ET; ET.parse(f)"` ile ayrıştırılır ve
`grep -c 'var(--[a-z-]*"'` ile kapanmamış `var(` parantezi aranır. Batch 16'da ikinci ölçer on bir sütun binmesi
ve dokuz alt pay eksikliği yakaladı; PNG turunda yeni kusur çıkmadı.

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch 16'da build ve
dev öncesinde 3000–3999 arası dinleyen port ve `node` süreci yoktu; yine de izole kopya kullanıldı ve ana
worktree'nin `.next` dizinine hiç dokunulmadı: `tar --exclude=./node_modules --exclude=./.next --exclude=./.git
--exclude=./artifacts --exclude=./.env.local -cf - . | (cd /d/dev/anil-lib-b16-render && tar xf -)`, junction
PowerShell ile `New-Item -ItemType Junction -Path 'D:\dev\anil-lib-b16-render\node_modules' -Target
'D:\dev\anil-lib\node_modules'`, kopyada `corepack pnpm build` (exit 0; `/seri/[slug]` 70 yol), sonra kopyanın
`.next`'i silinip `.claude/launch.json`'a geçici yapılandırma (`anil-lib-seri-b16`: Git Bash **tam yolu**,
`-lc`, `export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-b16-render && exec corepack pnpm dev -p 3210`).
**launch.json'ı Bash heredoc ile yazma:** `\\` çiftleri tek `\`'a iner ve dosya geçersiz JSON olur; Python
`json.dumps` ile ya da Write aracıyla yaz (Batch 16'da Python kullanıldı, sorun çıkmadı). Kopyada `.env.local`
olmadığı için kapı kendiliğinden kapalı. `typecheck` ve `test` ana worktree'de çalıştırıldı. Temizlik: **önce**
`preview_stop`, sonra junction `cmd /c rmdir` ile kaldırılır (içeriği takip etmez; ardından ana `node_modules`
doğrulanır: 45 giriş, `node_modules/next/package.json`), sonra kopya silinir; launch.json
`artifacts/b16-research/launch.json.orig`'ten geri alınır. Kural değişmedi: **ana worktree'de `.next` silme,
`pnpm build` ya da `next dev` başlatmadan önce `netstat` ve `tasklist` ile paralel süreç var mı bak.** Bash
aracında `cd` bir komuttan sonrakine taşınır — her komut `cd /d/dev/anil-lib;` ile başlar; Python Windows'ta
`/d/dev/...` yolunu tanımaz (`D:/...` verilir) ve konsola Türkçe basarken `sys.stdout.reconfigure(encoding='utf-8')`
ister.

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un bulgusu sürüyor.** Batch 16'da build'den önce değil
sonra temizlendi (build izole kopyada ve kopya `artifacts`'ı içermiyor); yine de run sonunda
`artifacts/b16-research/pdf/*.pdf` (133 dosya, ~338 MB) silindi. Kalanlar: `.txt` metinleri, `html/*.txt`,
`dblp-b16.*`, `fetch-b16-report.json`, `s2-b16.json`, `grab.py`, `scan-b16.py`, `svgcheck-b16.py`,
`sweep-b16.py`, `shots-b16.cjs`, `shots/*.png` (24 görüntü, ~2,5 MB), `launch.json.orig`, loglar (24 MB).

**Render doğrulama seti (Batch 16'da kullanılan).** Rota sweep'i Python `urllib` ile (71 rota, 35,4 sn;
`artifacts/b16-research/sweep-b16.py`), tarayıcı gezintisinden **önce**. Tarayıcı panosundan elle: `resize_window`
ile 1440/768/375; tema `documentElement.classList` üzerinde `dark`/`sepia` değiştirilerek; ölçüm fonksiyonu
`localStorage`'a yazılıp `eval(localStorage.getItem('b16m'))()` ile çağrıldı (kaynağı Batch 15'in
`measure-b15.js`'i); geçerli dolgu kümesi (`badFills`), `getBBox` ile viewBox içi kalma (`outOfBox`),
`scrollWidth > clientWidth`, figure/svg/figcaption sayıları, `main.innerText` içinde `undefined`/`NaN`. Dört
makale × üç genişlik × üç tema: taşma 0, badFills ve outOfBox boş, sızıntı yok, `figScroll` false. **Sekme
sınırı:** pano sekme sayısını sınırlıyor; yerel dosya sekmeleri (`file://` ile açılan SVG önizlemeleri)
`navigate` kabul etmiyor — `tabs_close` ile temizlenip `tabs_create` ile yeni sekme açılmalı. **Şekil
görüntüleri Playwright'tan** (`shots-b16.cjs`; `@playwright/test`'in Chromium'u, `waitUntil: 'load'` +
`main figure svg` bekleme, `#b16o` kaplayıcıda 1200 px klon, light/dark PNG): 12 şekil, 24 PNG, Read aracıyla
incelendi.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki betikler de lint
  kapsamındadır; bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer —
  beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur (Batch 16'da da yalnızca bu üç
  503 görüldü).
- Ham HTML'de sayfa başına 39 "undefined" görünür; Next.js iskelesindendir ve yayımlanmış eski makalelerde de
  aynıdır. `main.innerText` ölçümünde 0'dır — regresyon değil.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor (`figScroll` 375'te false).
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` ve 720'ye karşı yatay taşmayı yakalar; **sütuna
  binmeyi, alt pay azlığını ve kapanmamış `var(` parantezini görmez** — bunun için `svgcheck-b16.py` ve grep
  kapısı var. Yayımlanmış eski şekillerin bir kısmında alt pay hâlâ küçüktür.
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde görünür (27–28, 29,
  30–40, 41–60); `safety-and-evaluation` 61–70 tek öbek. Kasıtlıdır; `reading-list-groups.test.ts` bunu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) ayrı bir üretim hattıyla ilerliyor; AI serisinin araçları o
  dizine dokunmaz. Build iki seriyi birden derler.
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor (`Karar`, `her`, `Yaşayan`, `yapılırsa` izleniyor;
  `**zorundadır**.` izlenmiyor). Build'i etkilemiyor; temizlik AI serisinin kapsamı dışıdır.
- Batch 12–14'ün üretimi (51–62) kullanıcı tarafından commit edildi. **Batch 15 (63–66) ve Batch 16 (67–70)
  çalışma ağacında commit edilmemiş** duruyor; commit/push kullanıcı kararıdır (SOZLESME kapsamı dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)

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
