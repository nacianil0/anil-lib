# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-09 · Durum: **1–86 yayında (kohort Batch 0 → Batch 20) · Faz 9'un gövdesi tamamlandı, 20/7/15'in koordinatları ödendi · Sıradaki: 87 (Faz 9'un kapanışı 87–90)**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 86 — `dikkatin-otesi-ssm-ve-alternatif-mimariler` |
| Sıradaki güvenli başlangıç | Makale 87 ("Küçük ama Güçlü: Damıtma ve Küçük Modeller"); run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 87, 88, 89 ve 90 üretilir; bu dörtlü **Faz 9'un kapanışıdır**. **Bu dörtlüde bağlayıcı numaralı koordinat YOKTUR** — defterde açık kalan tek koordinat 101'dir ve bu banda düşmüyor. Devralınan iki numarasız işaret: 86 → 87 ("bir sonraki makale": büyük modelin bildiklerini küçüğe aktarmak) ve **34 → 87** (Batch 7'de verilen "damıtmanın temel modelin sınırını aşması" işareti). Devrolan planlı tekrar: 33/40'ın pass@k ile görev ufku **hâlâ tahsil edilmedi**; 101 uygun görünüyor, bu dörtlüde yeri yok |
| Sıradaki kohort | `classification_batch: 21` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs`; ek ölçerler `artifacts/b20-research/` altında: `scan-b20.py`, `svgcheck-b20.py`, `sweep-b20.py`, `shots-b20.cjs`, `idx-b20.py` (konferans dizinlerini indirir ve başlık arar), **`url-b20.py`** (dizinden mutlak URL çözme — hash URL'leri için zorunlu), **`links-b20.py`** (yayın öncesi bağlantı taraması), **`doi-b20.py`** (Crossref künye doğrulama), `venue-b20.py`, `hdr-b20.py`, `q.py` (kaynak metinlerde hızlı sorgu), `fetch-b20.py` (`REVERSE=1` ile ters kopya) |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–80 `safety-and-evaluation`; **81–90 `multimodal-and-future`** (kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142, #148, #160, #168, **#176**). Kohort 19 iki kategoriye yayıldı (79–80 safety, 81–82 multimodal), kohort 20 tek kategoride kaldı; okuma listesinde 61–80 tek öbek, 81–86 tek öbek; `reading-list-groups.test.ts` değişmedi. **Sıradaki run'da da kategori sorusu yoktur** (87–90'ın dördü de `multimodal-and-future`, #176'nın 81–90 bandı). **Faz 10 (91–97) için kategori kararı 91'in run'ında verilecek** |

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları hâlâ İngilizce alan
  terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning ve Test-Time
  Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim defterine göre Türkçeleştiriliyor
  (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135, #148, #154, #155, #162, #163, #169, #170, #171,
  #177, #178, **#184, #185**). Katmanın tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
  Faz 8 ve Faz 9'un başlıkları zaten Türkçe.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler — sıradaki dörtlüde aday YOK.** 87 ("Küçük ama Güçlü: Damıtma
  ve Küçük Modeller") ve 90 ("Enerji, Maliyet ve Çevresel Ayak İzi") zaten Türkçe; 88'deki "LLM" ve 89'daki "GPU"
  #108'in kısaltma sınıfında kalır. **Bandın dışında bekleyen tek aday: 108** ("Performans Mühendisliği:
  Attention'ı Hızlandırmak") — 86'nın başlığı "Dikkatin Ötesi" yapıldığı için (#185) aynı sözcük 108'de de
  Türkçeleştirilmeli görünüyor; karar 108'in kendi run'ında verilir. Başlık değişikliği entegrasyondan **önce**
  `roadmap.json`'a yazılır.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış vaatler"dedir.
  Batch 20 **iki bağlayıcı koordinatı birden kapattı** (20 → 85; 7 ve 15 → 86) ve 82'nin numarasız işaretini 83'te
  ödedi; yeni koordinat açmadı. **Defterde açık kalan TEK koordinat: 101** (ölçümün disiplini — 16 ve 22).
  Numarasız işaretler: **34 → 87** (damıtmanın temel modelin sınırını aşması, Batch 7'de verildi), 86 → 87
  ("bir sonraki makale"), 51 → 111, 49/53 → 115. Devrolan planlı tekrar: 33/40'ın pass@k ile görev ufku
  **tahsil edilmedi ve devrolur** (101 daha uygun görünüyor).
- **Prerequisite grafında 79–82 boşluğu.** YOL-HARITASI'ndaki graf satırları 78'de kesiliyor; Batch 19 kendi
  dörtlüsünün satırlarını eklemedi. Batch 20 kendi satırlarını (83–86) ekledi ve boşluğa grafın içinde bir not
  düştü. Devrolan eksik; ileride toplu kapatılabilir, hiçbir kapı buna bağlı değil.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR hâlâ uygulanmadı; tam listeler
  repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(15) önceki batch'lerden (kararlar #21, #97, #104, #106,
  #114, #120, #127, #134, #141, #147, #152, #159, #167, #175, #183). **Batch 20'de doğrulanamayan künye yok** —
  bütün venue iddiaları en az bir kanalda doğrulandı (karar #191). Tek kısıt: Jacobs ve ark. 1991'in kamuya açık
  PDF'i **taranmış görüntü** olduğu için metni okunamadı; künyesi Crossref'ten doğrulandı ve içeriğine dair tek
  cümle Shazeer ve ark.'nın kendi ilişkili çalışmalar bölümüne dayandırıldı.
- **Hakemsiz kaynak oranı Batch 20'de 68 kalemin 58'i (karar #191).** Batch 19: 68/75, Batch 18: 72/84. Kural
  değişmedi: hakemli karşılığı varsa o öne çıkar. **Bu run'ın dersi:** bir çalışmanın ön baskı başlığı ile
  yayımlanmış başlığı farklı olabiliyor ve arama bu yüzden ıskalıyor — Jamba'nın hakemli sürümü "Language
  **Models**" (çoğul) başlığıyla ICLR 2025'te; ön baskı "Language Model" (tekil) ve hakemsiz.
- **DBLP kapalı (Batch 18'den beri), Semantic Scholar 429.** Venue doğrulaması `idx-b20.py` dizin düzeni +
  OpenReview arama ucu + `iclr.cc` kabul listeleri ile yapılır (aşağıda).

## Next batch preparation — 87'den devam (Faz 9'un kapanışı: 87–90)

**Pedagojik hedefler.** Batch 20'nin sonunda okuyucu şunu biliyor: üretimin ikinci bir ailesi var ve mantığı
otoregresif üretimden farklıdır — bozma yönü tasarlanır, geri getirme yönü öğrenilir, hedef eklenen gürültüyü
tahmin etmektir, adım sayısı modelin değil örnekleyicinin özelliğidir (aynı modelde elli adımda 32,72 ↔ 4,67),
maliyet gizil uzaya taşınır, ve kılavuzluk 10'daki sıcaklığın buradaki hâlidir; sadakat yükselirken kapsama düşer
(0,67 → 0,83 ↔ 0,67 → 0,57) ve FID ikisini birden içerdiği için ortada bir en küçüğü vardır. Cetvelin kendisi de
denetlenir: FID örnek sayısına bağlı biçimde yanlıdır (83). "Her şey token" bir zorunluluk değil bir seçimdir:
kuantizasyon geri döndürülemez, sözlüğün kalitesi tavanı belirler (2,65 → 1,15 ve sıralamanın tersine dönmesi),
görüntüde sıra icat edilmiştir ve icat edilen sıranın bedeli vardır, tek softmax altında modaliteler norm yarışına
girip eğitimi ıraksatabilir, ve kuantizasyonu bırakan düzen metin tarafında bile yüzde 50–60 işlemde eşitlenir (84).
Parametre sayısı ile token başına hesap ayrılabilir; ayrıldığında bedel bellekte ve iletişimde ödenir, seyreklik
token başınadır yığın başına değil, "kaç parametre" sorusunun üç ayrı cevabı vardır, ve ölçek iddiası neyin sabit
tutulduğuna bağlıdır — 9'daki Kaplan–Chinchilla ayrımının aynı biçimi (85). "Karesel" iki ayrı maliyetin adıdır;
sabit durum bir seçimdir ve geri çağırmayla ödenir (410 milyon ↔ 2,8 milyar), yineleme durum takibi kazandırmaz,
ve pratik cevap melezdir (86).

**Sıradaki makaleler ve prerequisite'ler.** **87 ← 86** ("bir sonraki makale" devri: aynı kaliteyi daha az kaynakla
vermenin üçüncü yolu), **34 (numarasız işaretin tahsil yeri: damıtmanın temel modelin sınırını aşması)**, 18
(parametre başına bilgi kapasitesi), 9 (ölçek yasaları; küçük modelin fazla eğitilmesi), 27 (kuantizasyon — küçültmenin
öbür yolu), 19 (uyarlama), 12–13 (öğretmenin ürettiği veriyle eğitim), 85 (seyreklik de bir küçültme değil, maliyet
kaydırma yoluydu), 16 ve 72 (küçük modelin ölçütte iyi görünmesi ↔ kirlilik). **88 ← 87**, 27 (kuantizasyon ve
hassasiyet), 26 ve 28 (anahtar-değer önbelleği ve servis; cihazda yığın yok), 85 (bellek duvarı cihazda çok daha
dar), 60 (maliyet ve gecikme hesabı), 21 (pencere), 82 (gerçek zamanlı ses cihazda çalışan ilk uygulamalardan).
**89 ← 27 ve 28** (aritmetik ↔ bellek bant genişliği), 86 (FlashAttention'ın dersi: darboğaz bellek erişimi),
85 (cihazlar arası iletişim), 9 (hesap bütçesi), 8 (dağıtık eğitim adı konmuştu). **90 ← 9** (6ND ve hesap bütçesi),
8 (ön eğitim ölçeği), 85 (GLaM'ın enerji üçlüsü: eğitimde üçte bir, çıkarımda yarı işlem), 20 (bildirilen eğitim
maliyeti), 89 (donanımın kendisi), 28 ve 60 (çıkarımın toplam payı).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Parametre başına bilgi kapasitesi (18), ölçek yasaları (9), öğretmen-öğrenci verisi (12–13) → 87.
- Kuantizasyon (27), çıkarım ekonomisi (26, 28), maliyet-gecikme hesabı (60) → 88.
- Bellek duvarı (27), işlem/bayt oranı (26, 28), bellek erişimi darboğazı (86) → 89.
- 6ND ve hesap bütçesi (9), bildirilen eğitim maliyeti (20), enerji üçlüsü (85) → 90.
- Devrolan planlı tekrarlar: pass@k (33) ve görev ufku (40) → 101 önerilir.

**Araştırılacak güncel akademik alanlar (87 için öncelikli):** damıtmanın kurulumu (Hinton ve ark. 2015 — hakemsiz
olabilir, işaretlenerek; Buciluă ve ark. KDD 2006 model sıkıştırma; Sanh DistilBERT; Jiao TinyBERT; Beyer ve ark.
CVPR 2022 "tutarlı öğretmen"), ardışık damıtma ve öğretmen-asistan (Mirzadeh AAAI 2020), veri damıtma
(Wang ve ark. Alpaca/self-instruct ACL 2023; Gunasekar "Textbooks Are All You Need" — hakemsiz olabilir),
küçük model ailelerinin ölçek okuması (Phi, Gemma, Llama 3.2, SmolLM — çoğu hakemsiz, işaretlenerek), aşırı eğitim
ve çıkarım-optimal ölçekleme (Sardana ve ark. ICML 2024 "Beyond Chinchilla-Optimal"), budama (Frankle & Carbin
ICLR 2019 piyango bileti; Sun ve ark. ICLR 2024 Wanda; Ma ve ark. NeurIPS 2023 LLM-Pruner), damıtmanın sınırı
(Xu ve ark. derlemesi; "damıtma öğretmeni geçemez" iddiasının ölçümü) — hepsi doğrulanmalı.
**88 için:** cihaz üstü çıkarım (llama.cpp/GGUF hakemsiz; MLC-LLM; Alizadeh ve ark. ACL 2024 "LLM in a flash"),
cihaz için mimari (MobileLLM ICML 2024; MobileBERT ACL 2020), donanım-farkında kuantizasyon (Lin ve ark. MLSys 2024
AWQ; Frantar ve ark. ICLR 2023 GPTQ), gizlilik ve gecikme argümanı, federated/on-device kişiselleştirme.
**89 için:** GPU mimarisi ve roofline (Williams ve ark. CACM 2009), TPU (Jouppi ve ark. ISCA 2017 ve devamı),
bellek duvarı (Gholami ve ark. IEEE Micro 2024), FlashAttention ve çekirdek füzyonu (86'da kullanıldı), ölçekli
eğitim altyapısı (Megatron-LM SC 2021; ZeRO SC 2020), tedarik ve ekosistem (hakemsiz kaynaklar işaretlenerek).
**90 için:** eğitim enerjisi ve karbon (Strubell ACL 2019; Patterson ve ark. IEEE Computer 2022; Luccioni ve ark.
JMLR 2023 BLOOM; Luccioni ve ark. FAccT 2024 çıkarım enerjisi), veri merkezi su ve enerji (Li ve ark.), IEA ve
benzeri kurumsal raporlar (hakemsiz, işaretlenerek), çıkarımın toplam payı tartışması. Sayısal iddialar ve URL
doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 87: öğretmen-öğrenci hattının üç biçimi (yumuşak etiket, ara temsil, üretilen veri) ve her birinin neyi aktardığı;
  aynı hesap bütçesinin iki yolu (küçük modeli fazla eğitmek ↔ büyük modeli damıtmak) ölçülmüş sayılarla.
- 88: cihaz bütçesi tablosu — bellek, bant genişliği, güç, ısı; ve hangi tekniğin hangi kısıtı gevşettiği.
- 89: aritmetik ↔ bellek bant genişliği düzlemi (roofline sezgisi) ve bir dil modelinin iki aşamasının o düzlemde
  nereye düştüğü (ön dolum ↔ adım adım üretim; 26 ve 28'in geri çağrımı).
- 90: eğitim ↔ çıkarım enerjisinin ömür boyu payı; ve bir sayının hangi sınırla verildiği (hangi donanım, hangi
  bölge karbon yoğunluğu, hangi kapsam) — ölçüm koşulu şeklin içinde yazılı olmalı.

**Venue doğrulaması — DBLP kapalı, düzen Batch 20'de iki kanal daha kazandı.** `artifacts/b20-research/idx-b20.py`:
`python idx-b20.py fetch` konferans dizinlerini `idx/` altına indirir (bir kez), `python idx-b20.py "başlık" ...`
hepsinde birden arar. **Çalışan kaynaklar:** `proceedings.iclr.cc/paper_files/paper/2024|2025|2026` (2023 ve öncesi
404), `papers.nips.cc/paper_files/paper/2014…2025`, `proceedings.mlr.press/v37…v267` (ICML 2015–2025; v306 = ICML
2026 hâlâ 404), `jmlr.org/tmlr/papers`, `openaccess.thecvf.com/CVPR2019…CVPR2025` ve `ICCV2019|2021|2023|2025`
(2019 ve 2020 `?day=all` desteklemez; gün bağlantıları tek tek indirilip birleştirilir), `ecva.net/papers.php`
(ECCV 2018–2024), **`proceedings.mlsys.org/paper_files/paper/2020…2025`**,
`datasets-benchmarks-proceedings.neurips.cc/paper_files/paper/2021` (2023 için 404 — NeurIPS 2023 D&B künyeleri
`papers.nips.cc`'nin 2023 sayfasında `-Abstract-Datasets_and_Benchmarks.html` ekiyle bulunur).
**Batch 20'de eklenen iki kanal:** (a) **OpenReview arama ucu** —
`https://api2.openreview.net/notes/search?term=Kelime+Kelime&source=forum&limit=6`; `content.venue` alanı "COLM",
"ICLR 2025 Poster", "ICLR (Poster) 2017", "CoRR 2024" gibi değerler döndürüyor ve **hakemsiz ↔ hakemli ayrımını
tek başına verebiliyor**. Sorgu terimlerini `+` ile ayır, `%20` ile değil; ardışık sorgular arasında 3–4 sn bekle;
`content.venueid` filtresi 403 döndürüyor, yalnızca arama ucu açık. (b) **ICLR kabul listeleri** —
`https://iclr.cc/virtual/<yıl>/papers.html` ve `https://iclr.cc/Conferences/<yıl>/AcceptedPapersInitial`;
proceedings.iclr.cc'nin vermediği 2023 ve öncesi için tek doğrulama kanalı (Long Range Arena bu yolla ICLR 2021
olarak doğrulandı). **`url-b20.py` başlıktan mutlak URL çözer** ve bu run'da elle yazılmış üç hash URL'sinin
yanlış olduğunu buldu — **hash içeren hiçbir bağlantı dizinden çözülmeden yazılmamalı.** İkinci kanal
`venue-b20.py`: arXiv API'nin `comment` ve `journal_ref` alanları + Crossref `query.bibliographic` + OpenAlex.
Üçüncü kanal `hdr-b20.py`: PDF ilk sayfa yayın satırı. `doi-b20.py` tek tek DOI doğrular (MIT Press/ACM/IEEE/Springer
bot duvarı 403 döndürse de Crossref API künyeyi verir). **Tuzaklar:** PMLR sayfalarında başlık `<p class="title">`
içindedir ve **slug ilk yazarın yayımlanmış sürümdeki adından türer** (ön baskıdaki eş-birinci yazar sırası
değişmiş olabilir — `krajewski24a` yok, `ludziejewski24a` var); ön baskı başlığı ile yayımlanmış başlık farklı
olabilir (Jamba'nın tekil ↔ çoğul "Model/Models" farkı); NeurIPS dizininde başlıklar hatalı yazılabiliyor (kısa
parça ara). Batch 20'nin kaynak metinleri `artifacts/b20-research/pdf/*.txt` altında; PDF'ler build şişmesin diye
silinir, `.txt`'ler yerinde kalır (`q.py` ile sorgulanır).

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 21` ve `readingOrder` 87'den kesintisiz devam
ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir (başlık değişecekse entegrasyondan
**önce**); YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve bağlayıcı kararlar güncellenir;
doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki run hazırlığıyla güncellenir.
**Kategori sorusu yoktur** (87–90 `multimodal-and-future`); `reading-list-groups.test.ts` her hâlükârda çalıştırılır.
Makale dosyaları `content/series/articles/multimodal-and-future/` altına yazılır.

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
**Entegrasyondan sonra makale gövdesine her dokunuşta `sync-series-hashes.cjs --write` yeniden çalıştırılır.**
SVG'nin **kendisi** hash'i etkilemez, şekil **alt metni** etkiler. Araçların üçü de varsayılan olarak
yalnızca AI serisini işler.

**Yayın öncesi zorunlu taramalar.** `artifacts/b20-research/scan-b20.py <makale.md> <N>` tek komutta veriyor:
kelime sayısı, parantezli gloss listesi, yasaklı biçimler (`gömme`, `korpus`, `geliştirme kümesi`, `niceleme`,
`az/sıfır atışlı`, `çekişmeli`), **kendi numarası** ve **numaralı ileri gönderme** (≥ N+1) taramaları, bölüm
başlıkları, "Kendini yokla" ve şekil sayısı. **Uyarı:** `scan-b20.py`'nin kelime sayısı şekil alt metinlerini de
sayar, repo kapısı saymaz; bant kararı için `check-series-content.cjs`'in sayısına bakılır — pratik kestirim,
düzyazının şekil sözdizimi ve bağlantı hedefleri çıkarılmış `wc -w`'sidir (Batch 20'de 2.072–2.331). İleri gönderme
taramasının bulguları elle ayıklanır (yüzde, çözünürlük, doğruluk ve FID değerleri yanlış pozitif verir). SVG için
**iki** kapı: `check-series-svg.cjs` (viewBox, sabit renk, yasak öge, font boyutu; genişlik tahmini **0,55 ×
font-size**) ve `artifacts/b20-research/svgcheck-b20.py <klasör>` (aynı satırdaki her metin çifti, kutu içi metnin
`x + width`'i, sağ/sol kenar, alt pay ≥ 12 **ve repo kapısının 0,55 tahmininin taklidi**); ayrıca her SVG
`python -c "import xml.etree.ElementTree as ET; ET.parse(f)"` ile ayrıştırılır ve `grep -c 'var(--[a-z-]*"'` ile
kapanmamış `var(` parantezi aranır. **Bağlantı kapısı:** `links-b20.py <makale.md> ...` her `[Bağlantı](...)`
adresini çeker ve `<title>`'ı yazar; 404 alan bir bağlantı yalnızca URL değil **künye** hatasına da işaret
edebilir (bu run'da öyle oldu). **PNG turu Batch 20'de kusur buldu** (dört sütunlu bir tabloda dar sütun payı);
geometri kapıları geçse de göz turu şart. **Ayrıca:** yeni bir ölçü çifti ya da yeni bir terim kurulacaksa
YOL-HARITASI terim defterinin ilgili satırları **yazımdan önce** aranmalı — bu run'da "recall" için "geri çağırma"
yazıldı, sonra 29 ve 45'in satırları görülüp "kapsama" ile değiştirildi (karar #187) ve gövde + şekil + alt metin +
hash turu tekrarlandı.

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch 20'de de 3000–3999
arası dinleyen port yoktu; yine de izole kopya kullanıldı ve ana worktree'nin `.next` dizinine hiç dokunulmadı:
`tar --exclude=./node_modules --exclude=./.next --exclude=./.git --exclude=./artifacts --exclude=./.env.local -cf - .
| (cd /d/dev/anil-lib-b20-render && tar xf -)`, junction PowerShell ile `New-Item -ItemType Junction -Path
'D:\dev\anil-lib-b20-render\node_modules' -Target 'D:\dev\anil-lib\node_modules'`, kopyada `corepack pnpm build`
(exit 0; `/seri/[slug]` 86 yol), sonra kopyanın `.next`'i silinip `.claude/launch.json`'a geçici yapılandırma
(`anil-lib-seri-b20`: Git Bash **tam yolu**, `-lc`, `export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-b20-render &&
exec corepack pnpm dev -p 3210`). **launch.json'ı Bash heredoc ya da Python heredoc ile yazma:** `\\` çiftleri tek
`\`'a iner ve Python'da `unicodeescape` hatası verir; Write aracıyla yaz (Git Bash'in yolu bu makinede
`%LOCALAPPDATA%\Programs\Git\usr\bin\bash.exe`). Kopyada `.env.local` olmadığı için kapı kendiliğinden kapalı.
`typecheck` ve `test` ana worktree'de çalıştırıldı. **Kopya oluşturulduktan sonra ana worktree'de içerik değişirse
dosyayı kopyaya senkronlamak yetmiyor:** dev sunucusu derlenmiş sayfayı önbelleğe aldığı için `preview_stop` +
`preview_start` gerekiyor (Batch 20'de bir SVG düzeltmesi bu yüzden ilk turda render'a yansımadı). Temizlik:
**önce** `preview_stop`, sonra junction `cmd //c rmdir` ile kaldırılır, ardından ana `node_modules` doğrulanır
(`node_modules/next/package.json` yerinde ve `pnpm test` yeşil), sonra kopya silinir; launch.json
`artifacts/b20-research/launch.json.orig`'ten geri alınır. Kural değişmedi: **ana worktree'de `.next` silme,
`pnpm build` ya da `next dev` başlatmadan önce `netstat` ve `tasklist` ile paralel süreç var mı bak.** Bash
aracında `cd` bir komuttan sonrakine taşınır — her komut `cd /d/dev/anil-lib;` ile başlar; Python Windows'ta
`/d/dev/...` yolunu tanımaz (`D:/...` verilir) ve konsola Türkçe basarken `sys.stdout.reconfigure(encoding="utf-8")`
ister.

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un bulgusu sürüyor.** Batch 20'de PDF'ler build'den **önce**
silindi (`artifacts/b20-research/pdf/*.pdf`; 1,3 GB → 106 MB); build zaten izole kopyada ve kopya `artifacts`'ı
içermiyor. Kalanlar: `pdf/*.txt` (139), `idx/*.html` (NeurIPS 2014 ve MLSys dâhil), `fetch-b20-report.json`,
betikler, `shots/*.png` (26), `launch.json.orig`, loglar.

**Render doğrulama seti (Batch 20'de kullanılan).** Rota sweep'i Python `urllib` ile (87 rota, 52,8 sn;
`artifacts/b20-research/sweep-b20.py`), tarayıcı gezintisinden **önce**. Tarayıcı panosundan: `preview_start`
(`anil-lib-seri-b20`) → `resize_window` ile **açık genişlik/yükseklik** (1440×900, 768×1024, 375×812; `preset:
"desktop"` emülasyonu **temizler**, ölçüm için kullanılmaz — pano gizliyken `innerWidth` 0 gelir) →
`javascript_tool` ile tema döngüsü (`documentElement.classList` üzerinde `dark`/`sepia`) ve ölçüm
(`scrollWidth > innerWidth`, figure/svg/figcaption/h2/blockquote sayıları, `main.innerText` içinde `undefined`/`NaN`
ve ham i18n anahtarı deseni). **`browser_batch` içindeki JSON'da regex kaçışlarına dikkat** — `\\.` gibi diziler
"Unexpected end of input" veriyor; regex'i `new RegExp('[a-z]+[.][a-z]+[.][a-z]+','g')` gibi köşeli parantezle kur;
Türkçe karakterleri JS dizesine `\u...` kaçışıyla koy. Ölçülen genişlikler: 1440'ta SVG 771 px, 768'de 676 px,
375'te 351 px — üçünde de yatay kaydırma yok. **Şekil görüntüleri Playwright'tan** (`shots-b20.cjs`; `#b20o`
kaplayıcıda 1200 px klon, light/dark PNG): 12 şekil, 24 PNG, Read aracıyla incelendi.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki betikler de lint
  kapsamındadır; bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer —
  beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur (Batch 20'de de yalnızca bu 503 görüldü).
- Ham HTML'de sayfa başına 39 "undefined" görünür; Next.js iskelesindendir ve yayımlanmış eski makalelerde de
  aynıdır. `main.innerText` ölçümünde 0'dır — regresyon değil.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` ve genişliğe karşı yatay taşmayı yakalar; **sütuna
  binmeyi, kutudan taşmayı ve kapanmamış `var(` parantezini görmez** — bunun için `svgcheck-b20.py` ve grep kapısı
  var. İki ölçerin karakter genişliği tahmini farklıdır (6,8 ↔ 7,15); repo kapısı daha muhafazakârdır.
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde görünür (27–28, 29,
  30–40, 41–60); `safety-and-evaluation` 61–80 tek öbek, `multimodal-and-future` 81–86 tek öbek. Kasıtlıdır;
  `reading-list-groups.test.ts` bunu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) ayrı bir üretim hattıyla ilerliyor; AI serisinin araçları o
  dizine dokunmaz. Build iki seriyi birden derler.
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor (`Karar`, `her`, `Yaşayan`, `yapılırsa` izleniyor;
  `**zorundadır**.` izlenmiyor). Build'i etkilemiyor; temizlik AI serisinin kapsamı dışıdır.
- Batch 12–19'un üretimi (51–82) kullanıcı tarafından commit edildi (19: `commi`/`fb43518`). **Batch 20 (83–86)
  çalışma ağacında commit edilmemiş** duruyor: dört makale ve dört varlık klasörü izlenmiyor; `catalog.json`,
  `roadmap.json`, `HANDOFF.md`, `YOL-HARITASI.md` ve `.wolf/*` değişmiş durumda; `artifacts/b20-research/`
  de izlenmiyor. Commit/push kullanıcı kararıdır (SOZLESME kapsamı dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)
- **Batch 20 (2026-09-09):** Makale 83–86, **Faz 9'un gövdesi**: difüzyonla görüntü ve video üretimi → birleşik
  modeller ve "her şey token" iddiası → uzmanlar karışımı → dikkatin ötesindeki mimariler. `BATCH=4+1`. Araştırma
  (144 kalemlik liste iki fetch kopyasıyla, 139 metin), yazım, entegrasyon ve doğrulama ana oturumda,
  workflow/subagent kullanılmadan yapıldı. **İki bağlayıcı koordinat birden kapandı** (20 → 85; 7 ve 15 → 86) ve
  82'nin numarasız işareti 83'te ödendi; 30'un kısıtlı üretimi 84'te tahsil edildi; yeni koordinat açılmadı.
  İki başlık Türkçeleştirildi (#184 "Difüzyona Giriş", #185 "Dikkatin Ötesi"). Kararlar #184–#191. 68 kaynak
  kaleminin 58'i hakemli. **Beş künye düzeltildi:** üç yanlış hash URL'si, bir PMLR slug'ı + yazar sırası
  (`ludziejewski24a`), ve Jamba'nın venue'sü (COLM 2024 değil, ICLR 2025 ve başlığı farklı). İki yeni doğrulama
  kanalı kuruldu: OpenReview arama ucu ve `iclr.cc` kabul listeleri. Bir terim çakışması yayından önce düzeltildi
  ("recall" → "kapsama", #187). Kapılar: `pnpm typecheck` (0), **575 test**, `pnpm build` (exit 0,
  `/seri/[slug]` 86 yol, izole kopyada), 87 rotanın tamamı 200 (52,8 sn), dört makale × üç genişlik × üç temada
  DOM ölçümü (taşma 0, sızıntı yok), 12 yeni diyagram Playwright ile light/dark PNG olarak alınıp gözle
  doğrulandı (PNG turu bir dar sütun payı buldu ve düzeltildi). Paralel oturum görünmedi; build ve dev sunucusu
  izole kopyada (`D:\dev\anil-lib-b20-render`, 3210), launch.json geri alındı, kopya ve junction silindi.
- **Batch 19 (2026-09-09):** Makale 79–82; **Faz 8 kapandı, Faz 9 açıldı**: sağlamlık ve dağılım kayması →
  şeffaflık ve model/sistem kartları → görüntü-dil modelleri → ses ve gerçek zamanlı modeller. `BATCH=4+1`.
  Araştırma (172 kalemlik liste iki fetch kopyasıyla, 169 metin; beş kalemlik retry turu), yazım, entegrasyon ve
  doğrulama ana oturumda, workflow/subagent kullanılmadan yapıldı. **Faz 9'un kategorisi `multimodal-and-future`
  olarak karara bağlandı (#176)** ve `content/series/articles/multimodal-and-future/` dizini açıldı; iki başlık
  Türkçeleştirildi (#177, #178). **Dört numarasız işaret ödendi** (78 → 79, 72 → 79, 71/73 → 80, **54 → 81**);
  yeni koordinat açılmadı (kararlar #176–#183). 75 kaynak kaleminin 68'i hakemli — serinin en yüksek oranı; Crossref
  taraması iki kaynağı hakemsizden hakemliye taşıdı. **URL doğrulama kapısı eklendi** (`url-b19.py` + `links-b19.py`)
  ve elle yazılmış üç hash URL'sinin yanlış olduğu bulundu. Kapılar: `pnpm typecheck` (0), 563 test, `pnpm build`
  (exit 0, `/seri/[slug]` 82 yol, izole kopyada), 83 rotanın tamamı 200 (56,2 sn), dört makale × üç genişlik × üç
  temada DOM ölçümü (taşma 0, sızıntı yok), 12 yeni diyagram Playwright ile light/dark PNG olarak alınıp gözle
  doğrulandı (PNG turu kusur bulmadı). Paralel oturum görünmedi; build ve dev sunucusu izole kopyada
  (`D:\dev\anil-lib-b19-render`, 3210), launch.json geri alındı, kopya ve junction silindi.
- **Batch 18 (2026-09-09):** Makale 75–78, Faz 8'in ikinci yarısı: özellikler ve süperpozisyon → aktivasyonlara
  müdahale → atıf → beliren yetenekler tartışması. `BATCH=4+1`. **DBLP bot doğrulama sayfası döndürdüğü için venue
  doğrulaması konferans dizin sayfalarına taşındı** (#175). Üç başlık Türkçeleştirildi (#169, #170, #171).
  **74–77 bandı kapandı ve 78 koordinatı ödendi** (kararlar #168–#175). 84 kaynağın 72'si hakemli. 551 test,
  `pnpm build` (exit 0, 78 yol), 79 rota 200, 12 diyagram PNG ile doğrulandı.
- **Batch 17 (2026-09-06):** Makale 71–74, Faz 8'in açılışı. Faz 8'in kategorisi `safety-and-evaluation` (#160);
  iki başlık Türkçeleştirildi (#162, #163). **72 koordinatı kapandı, 74–77 bandının ilk taksidi ödendi.** 519 test.
- **Batch 16 (2026-09-06):** Makale 67–70, Faz 7'nin kapanışı. İki başlık Türkçeleştirildi (#154, #155); 20'nin iki
  koordinatı kapandı. 507 test, 71 rota 200.
- **Batch 15 (2026-09-05):** Makale 63–66, Faz 7'nin gövdesi. 64 koordinatı ödendi (#153). 495 test, 67 rota 200.
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
