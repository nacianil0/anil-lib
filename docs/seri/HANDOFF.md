# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-09 · Durum: **1–82 yayında (kohort Batch 0 → Batch 19) · Faz 8 kapandı, Faz 9 açıldı · Sıradaki: 83 (Faz 9'un gövdesi 83–86)**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 82 — `ses-konusma-ve-gercek-zamanli-modeller` |
| Sıradaki güvenli başlangıç | Makale 83 ("Görüntü ve Video Üretimi: Diffusion'a Giriş"); run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 83, 84, 85 ve 86 üretilir; bu dörtlü **Faz 9'un gövdesidir**. **Bu dörtlüde iki bağlayıcı koordinat vardır ve ikisi de ödenmelidir: 85** (uzmanlar karışımı mimarisinin kurulumu — 20'nin vaadi) **ve 86** (karesel maliyeti ödemeyen alternatif mimariler — 7 ve 15'in vaadi). 82 → 83 numarasız işaretle çağrılmış durumda ("bir sonraki makale": gürültüden başlayıp geri temizleyen üretim modelleri). Devrolan planlı tekrar: 30'un kısıtlı üretimi **84'te** tahsil edilmeli |
| Sıradaki kohort | `classification_batch: 20` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs`; ek ölçerler `artifacts/b19-research/` altında: `scan-b19.py`, `svgcheck-b19.py`, `sweep-b19.py`, `shots-b19.cjs`, `idx-b19.py` (konferans dizinlerinde başlık arama), **`url-b19.py`** (dizinden mutlak URL çözme), **`links-b19.py`** (yayın öncesi bağlantı taraması), **`doi-b19.py`** (Crossref künye doğrulama), `venue-b19.py`, `hdr-b19.py`, `q.py` (kaynak metinlerde hızlı sorgu) |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–80 `safety-and-evaluation`; **81–90 `multimodal-and-future`** (kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142, #148, #160, #168, **#176**). Kohort 19 iki kategoriye yayıldı (79–80 safety, 81–82 multimodal); okuma listesinde 61–80 tek öbek, 81–82 yeni öbek; `reading-list-groups.test.ts` değişmedi. **Faz 9'un kategorisi karara bağlandı; sıradaki run'da kategori sorusu yoktur** (83–86'nın dördü de `multimodal-and-future`) |

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları hâlâ İngilizce alan
  terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning ve Test-Time
  Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim defterine göre Türkçeleştiriliyor
  (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135, #148, #154, #155, #162, #163, #169, #170, #171,
  **#177, #178**). Katmanın tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır. Faz 8 ve Faz 9'un
  başlıkları zaten Türkçe.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler.** Batch 19 iki başlığı Türkçeleştirdi (#177 "Sağlamlık… Düşmanca
  Girdiler", #178 "Görüntü-Dil Modelleri"). Sıradaki dörtlüde iki aday var: **83 "Görüntü ve Video Üretimi:
  Diffusion'a Giriş"** — "diffusion" için Türkçede yerleşik bir karşılık yok, alanda "difüzyon" da kullanılıyor;
  #108 ölçütüne göre (kısaltma gibi işlev gören, Türkçeleştirilmeyen kalem) İngilizce bırakmak da savunulabilir,
  karar 83'ün run'ında gövdede grep ile verilir. **86 "Attention'ın Ötesi: SSM ve Alternatif Mimariler"** — "dikkat"
  6'dan beri defterde kayıtlı, olası başlık "Dikkatin Ötesi: SSM ve Alternatif Mimariler"; "SSM" kısaltma sınıfında
  kalabilir. 84 ve 85'in başlıkları zaten Türkçe ("uzmanlar karışımı" defterde 20'den kayıtlı; "MoE" kısaltması).
  Başlık değişikliği entegrasyondan **önce** `roadmap.json`'a yazılır.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış vaatler"dedir.
  Batch 19 **dört numarasız işareti ödedi** (78 → 79, 72 → 79, 71 ve 73 → 80, **54 → 81**) ve yeni koordinat açmadı.
  **Açık kalan koordinatlar:** 85 (uzmanlar karışımı — 20), 86 (karesel maliyeti ödemeyen mimariler — 7, 15),
  101 (ölçümün disiplini — 16, 22). **85 ve 86 sıradaki dörtlünün içindedir ve o run'da kapanmalıdır.**
  Numarasız işaretler: 82 → 83 (gürültüden geri temizleyen üretim), 51 → 111, 49/53 → 115.
  Devrolan planlı tekrarlar: 30'un kısıtlı üretimi **84'e** (birleşik modellerde biçim garantisi doğal yer);
  33/40'ın pass@k ile görev ufku **tahsil edilmedi ve devrolur** (101 daha uygun görünüyor).
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR hâlâ uygulanmadı; tam listeler
  repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(14) önceki batch'lerden (kararlar #21, #97, #104, #106,
  #114, #120, #127, #134, #141, #147, #152, #159, #167, #175). (15) **Batch 19:** Szegedy ve ark. "Intriguing
  properties of neural networks" — ICLR 2014'ün bildirileri ayrı bir kitapta toplanmadığı için hiçbir dizinde
  künye bulunamadı; kaynakçada bu durum yazılı. Zhu ve ark.'nın PromptRobust'u yazarlarının arXiv notunda
  "teknik rapor" diyor, hakemsiz sayıldı. Liesenfeld & Dingemanse'nin FAccT 2024 çalışmasının PDF'i üç adresten
  alınamadı (20'de zaten kullanılmıştı, bu run'da yalnızca dolaylı anıldı); Skantze'nin sıra alma derlemesi
  DiVA sunucusundan zaman aşımıyla dönmedi (yerine Ekstedt & Skantze ve Stivers kullanıldı).
- **Hakemsiz kaynak oranı Batch 19'da serinin en iyisi (karar #183):** 75 kalemin **68'i hakemli**, 7'si
  işaretlenmiş hakemsiz kalem (Batch 18: 72/84, Batch 17: 126/159). Kural değişmedi: hakemli karşılığı varsa o öne
  çıkar. **Yeni ders:** arXiv `comment` alanı boş olsa da dergi kaydı olabiliyor — Crossref `query.bibliographic`
  taraması bu run'da iki kaynağı hakemsizden hakemliye taşıdı.
- **DBLP kapalı (Batch 18'den beri).** `dblp.org` ve iki aynası bot doğrulama sayfası döndürüyor. Venue doğrulaması
  `idx-b19.py` düzeniyle yapılır (aşağıda).

## Next batch preparation — 83'ten devam (Faz 9'un gövdesi: 83–86)

**Pedagojik hedefler.** Batch 19'un sonunda okuyucu şunu biliyor: bir puan ölçüldüğü dağılımın puanıdır ve kayma dört
türlüdür — kovaryat, etiket, kavram, alt topluluk —; sentetik bozulmaya dayanmak gerçek kaymaya dayanmayı getirmez
(204 model × 213 koşul) ve bir sağlamlık iddiası ancak eşit dağılım içi puandaki modellere karşı, **etkin sağlamlık**
olarak kurulur; ortalama başarı ile tutarlı başarı ayrı şeylerdir (72,4 ↔ 6,0); gündelik kayma ile kasıtlı saldırı
tek eksenin iki ucudur ve fark girdiyi kimin seçtiğidir; düşmanca eğitimin bedeli ölçülmüştür ve sertifikanın kapsamı
yazılır (79). Koşullar bir belgede taşınır: model kartının çekirdeği ayrıştırılmış değerlendirmedir ve kamuya açık
ayrıştırılmış ölçümün etkisi ölçülmüştür; veri belgesi model belgesinden daha çok ihmal ediliyor; sistem kartı
dağıtımı belgeler, eğitim verisinin kökenini belgelemez; pratikte en gerekli üç bölüm en az doldurulur; ve belge bir
beyandır, onu sınayan düzenek belgeden geridedir (80). Bir modalite token'a şöyle çevrilir: görüntü sabit boyutlu
yamalara bölünür, token sayısı çözünürlükle karesel büyür, metinle görüntü karşıtsal bir hedefle aynı uzaya konur,
ve dil modeline bağlama üç yoldan yapılır — izdüşüm, yeniden örnekleyici, kapılı çapraz dikkat —; hangisinin daha
iyi olduğu neyin eğitildiğine bağlıdır; yüksek düzey sınavdaki puan temel görmeyi garanti etmez ve doğrusal sonda
kusurun kodlayıcıda değil bağlantıda olduğunu gösterir (81). Aynı hamle seste iki token ailesine ayrılır — anlamsal
ve akustik —; etiketli veri artık darboğaz değildir; ara temsili yazı yapan her hat duyguyu ve vurguyu siler; sıra
kavramı bir modelleme kararıdır; ve gecikme bir mimari kısıttır, çünkü insan sohbetinde sıra geçiş boşluğunun ortak
ortalaması 208 milisaniyedir (82).

**Sıradaki makaleler ve prerequisite'ler.** **83 ← 82** ("bir sonraki makale" devri: üretim tarafı ve gürültüden geri
temizleme), 81 (görüntü yaması, görüntü kodlayıcı, görsel token), 10 (otoregresif üretim, örnekleme, sıcaklık —
**karşıtlık kurulacak yer**), 2 (kayıp, gradyan inişi), 3 (temsil), 17 (uydurma; görsel üretimde karşılığı),
26 (adım adım üretimin maliyeti; difüzyon adım sayısı), 79 (üretilen içeriğin değerlendirilmesindeki dağılım sorunu).
**84 ← 81, 82** (iki modalitenin token'a çevrilmesi), 4 (tokenizasyon ve sözlük — birleşik sözlüğün zemini), 83
(difüzyon ↔ otoregresif ayrımı), **30 (kısıtlı üretim — devrolan planlı tekrarın tahsil yeri)**, 8 (ön eğitim),
26 (anahtar-değer önbelleği). **85 ← 20 (bağlayıcı koordinat: uzmanlar karışımı vaadi)**, 7 (ileri beslemeli katman
ve blok yapısı), 9 (ölçek yasaları; parametre ↔ hesap ayrımı), 8 (eğitim döngüsü), 26 ve 28 (çıkarım maliyeti,
yığınlama), 60 (maliyet ve gecikme hesabı), 27 (bellek duvarı). **86 ← 7 ve 15 (bağlayıcı koordinat: karesel maliyeti
ödemeyen mimariler)**, 6 (dikkatin kendisi), 25 (uzun bağlam ve pencere dikkati), 26 (anahtar-değer önbelleğinin
büyümesi), 21 (etkin bağlam uzunluğu), 74 (indüksiyon başı — alternatif mimarilerde kopyalama tartışması).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Otoregresif üretim, örnekleme ve sıcaklık (10), uydurma (17) → 83.
- Kısıtlı üretim (30), tokenizasyon ve sözlük (4) → 84 (**30 devrolan tekrardır, burada tahsil edilmeli**).
- Ölçek yasaları ve hesap-optimal eğitim (9), ileri beslemeli katman (7), çıkarım maliyeti (26, 28, 60) → 85.
- Dikkatin karesel maliyeti (6, 7), pencere dikkati ve dikkat çukuru (25), etkin bağlam uzunluğu (21) → 86.
- Devrolan planlı tekrarlar: pass@k (33) ve görev ufku (40) → 101 önerilir.

**Araştırılacak güncel akademik alanlar (83 için öncelikli):** difüzyonun kurulumu (Sohl-Dickstein ve ark. ICML 2015;
Ho ve ark. NeurIPS 2020 DDPM; Song & Ermon NeurIPS 2019 skor eşleştirme; Song ve ark. ICLR 2021 skor tabanlı SDE;
Song ve ark. ICLR 2021 DDIM), kılavuzluk (Dhariwal & Nichol NeurIPS 2021; Ho & Salimans sınıflandırıcısız kılavuzluk),
gizil uzayda difüzyon (Rombach ve ark. CVPR 2022; Podell SDXL), Transformer omurgası (Peebles & Xie ICCV 2023 DiT;
Esser ve ark. ICML 2024 doğrultulmuş akış), akış eşleştirme (Lipman ve ark. ICLR 2023), video (Ho ve ark. video
difüzyonu; Blattmann ve ark. CVPR 2023; Bar-Tal Lumiere), değerlendirme (Heusel ve ark. NeurIPS 2017 FID ve
eleştirisi; Hessel ve ark. EMNLP 2021 CLIPScore; Lee ve ark. NeurIPS 2023 HEIM) — hepsi doğrulanmalı.
**84 için:** van den Oord ve ark. NeurIPS 2017 VQ-VAE; Esser ve ark. CVPR 2021 VQGAN; Ramesh ve ark. ICML 2021;
Yu ve ark. ICLR 2024 MAGVIT-v2; Chameleon ve Transfusion (hakemsiz olabilir, işaretlenerek); birleşik ölçütler.
**85 için:** Shazeer ve ark. ICLR 2017 seyrek kapılı katman; Lepikhin ve ark. ICLR 2021 GShard; Fedus ve ark.
JMLR 2022 Switch Transformer; Zoph ve ark. ST-MoE; Clark ve ark. ICML 2022 yönlendirmeli modellerde ölçek yasaları;
Zhou ve ark. NeurIPS 2022 uzman seçimi; Jiang ve ark. Mixtral ve DeepSeekMoE (hakemsiz olabilir); Muennighoff OLMoE.
**86 için:** Gu ve ark. ICLR 2022 S4; Gu & Dao Mamba (COLM 2024 — doğrulanmalı); Dao & Gu ICML 2024 Mamba-2;
Katharopoulos ve ark. ICML 2020 doğrusal dikkat; Choromanski ve ark. ICLR 2021 Performer; Zaheer ve ark. NeurIPS 2020
BigBird; Beltagy ve ark. Longformer; Peng ve ark. EMNLP Findings 2023 RWKV; Poli ve ark. ICML 2023 Hyena;
Jelassi ve ark. ICML 2024 (durum uzayı modellerinin kopyalama sınırı — **karşı ölçüm olarak önemli**); Waleffe ve
ark. melez mimariler. Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir;
süreç kuralları SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 83: ileri gürültüleme ile geri temizlemenin adım adım karşılaştırması; piksel uzayı ↔ gizil uzay maliyet tablosu;
  kılavuzluk katsayısının kalite–çeşitlilik takası (ölçülmüş sayılarla; eğri çizilecekse "şematiktir" kaydı).
- 84: aynı içeriğin iki üretim düzeni (token token otoregresif ↔ adım adım difüzyon) yan yana; modaliteleri tek
  sözlüğe indiren düzenin bölümleri ve her bölümün bedeli.
- 85: yoğun katman ↔ uzmanlar karışımı: toplam parametre, etkin parametre, çıkarım hesabı, bellek; uzman kullanım
  dengesizliği ve yük dengeleme kaybı.
- 86: dikkatin karesel maliyeti ile alternatiflerin maliyet yapısının karşılaştırması (eğitim ↔ çıkarım ayrı);
  "ne kazanılıyor / ne kaybediliyor" tablosu (kopyalama, geri çağırma, bağlam içi öğrenme).

**Venue doğrulaması — DBLP kapalı, düzen Batch 19'da genişletildi.** `artifacts/b19-research/idx-b19.py`:
`python idx-b19.py fetch` konferans dizinlerini `idx/` altına indirir (bir kez), `python idx-b19.py "başlık" ...`
hepsinde birden arar. **Çalışan kaynaklar:** `proceedings.iclr.cc/paper_files/paper/2024|2025|2026` (2023 ve öncesi
404), `papers.nips.cc/paper_files/paper/2017…2024` (2025 sayfası boş), `proceedings.mlr.press/v70…v267`
(ICML 2017–2025; v306 = ICML 2026 hâlâ 404), `jmlr.org/tmlr/papers`, **`openaccess.thecvf.com/CVPR2019…CVPR2025`,
`ICCV2019|2021|2023|2025`, `ACCV2024`** (2019 ve 2020 sayfaları `?day=all` desteklemez; gün bağlantıları tek tek
indirilip birleştirilir), **`ecva.net/papers.php`** (ECCV 2018–2024 tek sayfada),
**`isca-archive.org/interspeech_2019…2025`**, **`datasets-benchmarks-proceedings.neurips.cc/paper_files/paper/2021`**
(NeurIPS 2021 veri kümeleri ve ölçütler programı ayrı alan adındadır; 2022 için 404).
**`url-b19.py` başlıktan mutlak URL çözer** ve bu run'da elle yazılmış üç hash URL'sinin yanlış olduğunu buldu —
**hash içeren hiçbir bağlantı dizinden çözülmeden yazılmamalı.** İkinci kanal `venue-b19.py`: arXiv API'nin `comment`
ve `journal_ref` alanları + Crossref `query.bibliographic` + OpenAlex. Üçüncü kanal `hdr-b19.py`: PDF ilk sayfa
yayın satırı (169 dosyanın 43'ünde bulundu). `doi-b19.py` tek tek DOI doğrular (ACM/IEEE/Springer bot duvarı 403/202
döndürse de Crossref API künyeyi verir). **Kapalı olanlar:** DBLP, OpenReview arama ucu, Semantic Scholar (429),
`dl.acm.org` PDF. **Tuzaklar:** NeurIPS dizininde başlıklar hatalı yazılabiliyor (kısa parça ara); PMLR sayfalarında
başlık `<p class="title">` içindedir, `<a>` metni değil; ACCV/CVF'de yayımlanmış başlık arXiv başlığından kısa olabilir
(alt başlık düşüyor). Batch 19'un kaynak metinleri `artifacts/b19-research/pdf/*.txt` altında; PDF'ler build
şişmesin diye silinir, `.txt`'ler yerinde kalır (`q.py` ile sorgulanır).

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 20` ve `readingOrder` 83'ten kesintisiz devam
ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir (başlık değişecekse entegrasyondan
**önce**); YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve bağlayıcı kararlar güncellenir
(**85 ve 86 koordinatlarının kapanmış hâli dâhil**); doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni
cursor ve sonraki run hazırlığıyla güncellenir. **Kategori sorusu yoktur** (83–86 `multimodal-and-future`);
`reading-list-groups.test.ts` her hâlükârda çalıştırılır. Makale dosyaları `content/series/articles/multimodal-and-future/`
altına yazılır (dizin Batch 19'da açıldı).

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

**Yayın öncesi zorunlu taramalar.** `artifacts/b19-research/scan-b19.py <makale.md> <N>` tek komutta veriyor:
kelime sayısı, parantezli gloss listesi, yasaklı biçimler (`gömme`, `korpus`, `geliştirme kümesi`, `niceleme`,
`az/sıfır atışlı`, `çekişmeli`), **kendi numarası** ve **numaralı ileri gönderme** (≥ N+1) taramaları, bölüm
başlıkları, "Kendini yokla" ve şekil sayısı. **Uyarı:** `scan-b19.py`'nin kelime sayısı şekil alt metinlerini de
sayar, repo kapısı saymaz; bant kararı için `check-series-content.cjs`'in sayısına bakılır — pratik kestirim,
düzyazının şekil alt metinleri hariç `wc -w`'sinin yaklaşık kendisidir (Batch 19'da 2.028–2.735). İleri gönderme
taramasının bulguları elle ayıklanır (yüzde, piksel, kilobit, milisaniye yanlış pozitif verir). SVG için **iki** kapı:
`check-series-svg.cjs` (viewBox, sabit renk, yasak öge, font boyutu; genişlik tahmini **0,55 × font-size**) ve
`artifacts/b19-research/svgcheck-b19.py <klasör>` (aynı satırdaki her metin çifti, kutu içi metnin `x + width`'i,
sağ/sol kenar, alt pay ≥ 12 **ve repo kapısının 0,55 tahmininin taklidi**); ayrıca her SVG
`python -c "import xml.etree.ElementTree as ET; ET.parse(f)"` ile ayrıştırılır ve `grep -c 'var(--[a-z-]*"'` ile
kapanmamış `var(` parantezi aranır. **Bağlantı kapısı Batch 19'da eklendi:** `links-b19.py <makale.md> ...`
her `[Bağlantı](...)` adresini çeker ve `<title>`'ı yazar; ACM/IEEE/Springer 403/202 döndürüyorsa künye
`doi-b19.py` ile Crossref üzerinden doğrulanır. **PNG turu Batch 19'da kusur bulmadı** (17 ve 18'de bulmuştu);
şekillerin tablo ağırlıklı olması bunun sebebi görünüyor — serbest yerleşimli eğri kullanılırsa tur yine şart.

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch 19'da da 3000–3999
arası dinleyen port yoktu; yine de izole kopya kullanıldı ve ana worktree'nin `.next` dizinine hiç dokunulmadı:
`tar --exclude=./node_modules --exclude=./.next --exclude=./.git --exclude=./artifacts --exclude=./.env.local -cf - .
| (cd /d/dev/anil-lib-b19-render && tar xf -)`, junction PowerShell ile `New-Item -ItemType Junction -Path
'D:\dev\anil-lib-b19-render\node_modules' -Target 'D:\dev\anil-lib\node_modules'`, kopyada `corepack pnpm build`
(exit 0; `/seri/[slug]` 82 yol), sonra kopyanın `.next`'i silinip `.claude/launch.json`'a geçici yapılandırma
(`anil-lib-seri-b19`: Git Bash **tam yolu**, `-lc`, `export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-b19-render &&
exec corepack pnpm dev -p 3210`). **launch.json'ı Bash heredoc ile yazma:** `\\` çiftleri tek `\`'a iner; Write
aracıyla yaz (Git Bash'in yolu bu makinede `%LOCALAPPDATA%\Programs\Git\usr\bin\bash.exe`). Kopyada `.env.local`
olmadığı için kapı kendiliğinden kapalı. `typecheck` ve `test` ana worktree'de çalıştırıldı. Kopya oluşturulduktan
sonra ana worktree'de içerik değişirse dosyaları senkronlamak yetmiyor — dev sunucusu `catalog.json`'u bellekte
tuttuğu için "Katalog ile frontmatter uyuşmuyor" hatası veriyor; `preview_stop` + `preview_start` gerekiyor.
Temizlik: **önce** `preview_stop`, sonra junction `cmd //c rmdir` ile kaldırılır, ardından ana `node_modules`
doğrulanır (`node_modules/next/package.json` yerinde ve `pnpm test` yeşil), sonra kopya silinir; launch.json
`artifacts/b19-research/launch.json.orig`'ten geri alınır. Kural değişmedi: **ana worktree'de `.next` silme,
`pnpm build` ya da `next dev` başlatmadan önce `netstat` ve `tasklist` ile paralel süreç var mı bak.** Bash
aracında `cd` bir komuttan sonrakine taşınır — her komut `cd /d/dev/anil-lib;` ile başlar; Python Windows'ta
`/d/dev/...` yolunu tanımaz (`D:/...` verilir) ve konsola Türkçe basarken `sys.stdout.reconfigure(encoding='utf-8')`
ister.

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un bulgusu sürüyor.** Batch 19'da PDF'ler build'den **önce**
silindi (`artifacts/b19-research/pdf/*.pdf`; 809 MB → 118 MB); build zaten izole kopyada ve kopya `artifacts`'ı
içermiyor. Kalanlar: `pdf/*.txt` (169), `idx/*.html` (CVF ve ISCA dâhil), `venue-b19.json`, `hdr-b19.txt`,
`fetch-b19*-report.json`, betikler, `shots/*.png` (24), `launch.json.orig`, loglar.

**Render doğrulama seti (Batch 19'da kullanılan).** Rota sweep'i Python `urllib` ile (83 rota, 56,2 sn;
`artifacts/b19-research/sweep-b19.py`), tarayıcı gezintisinden **önce**. Tarayıcı panosundan: `preview_start`
(`anil-lib-seri-b19`) → `resize_window` ile **açık genişlik/yükseklik** (1440×900, 768×1024, 375×812; `preset:
"desktop"` emülasyonu **temizler**, ölçüm için kullanılmaz — pano gizliyken `innerWidth` 0 gelir) →
`javascript_tool` ile tema döngüsü (`documentElement.classList` üzerinde `dark`/`sepia`) ve ölçüm
(`scrollWidth > innerWidth`, figure/svg/figcaption/h2/blockquote sayıları, `main.innerText` içinde `undefined`/`NaN`
ve ham i18n anahtarı deseni). **`browser_batch` içindeki JSON'da regex kaçışlarına dikkat** — `\\.` gibi diziler
"Unexpected end of input" veriyor; regex'i `new RegExp('[a-z]+[.][a-z]+[.][a-z]+','g')` gibi köşeli parantezle kur;
Türkçe karakterleri JS dizesine `\u...` kaçışıyla koy. Ölçülen genişlikler: 1440'ta SVG 771 px, 768'de 676 px,
375'te 351 px — üçünde de yatay kaydırma yok. **Şekil görüntüleri Playwright'tan** (`shots-b19.cjs`; `#b19o`
kaplayıcıda 1200 px klon, light/dark PNG): 12 şekil, 24 PNG, Read aracıyla incelendi.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki betikler de lint
  kapsamındadır; bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer —
  beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur (Batch 19'da da yalnızca bu 503 görüldü).
- Ham HTML'de sayfa başına 39 "undefined" görünür; Next.js iskelesindendir ve yayımlanmış eski makalelerde de
  aynıdır. `main.innerText` ölçümünde 0'dır — regresyon değil.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` ve genişliğe karşı yatay taşmayı yakalar; **sütuna
  binmeyi, kutudan taşmayı ve kapanmamış `var(` parantezini görmez** — bunun için `svgcheck-b19.py` ve grep kapısı
  var. İki ölçerin karakter genişliği tahmini farklıdır (6,8 ↔ 7,15); repo kapısı daha muhafazakârdır.
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde görünür (27–28, 29,
  30–40, 41–60); `safety-and-evaluation` 61–80 tek öbek, `multimodal-and-future` 81–82 yeni öbek. Kasıtlıdır;
  `reading-list-groups.test.ts` bunu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) ayrı bir üretim hattıyla ilerliyor; AI serisinin araçları o
  dizine dokunmaz. Build iki seriyi birden derler.
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor (`Karar`, `her`, `Yaşayan`, `yapılırsa` izleniyor;
  `**zorundadır**.` izlenmiyor). Build'i etkilemiyor; temizlik AI serisinin kapsamı dışıdır.
- Batch 12–18'in üretimi (51–78) kullanıcı tarafından commit edildi (18: `commi`/`e72a24b`). **Batch 19 (79–82)
  çalışma ağacında commit edilmemiş** duruyor: dört makale, dört varlık klasörü ve yeni
  `content/series/articles/multimodal-and-future/` dizini izlenmiyor; `catalog.json`, `roadmap.json`, `HANDOFF.md`,
  `YOL-HARITASI.md` ve `.wolf/*` değişmiş durumda. Commit/push kullanıcı kararıdır (SOZLESME kapsamı dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)
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
