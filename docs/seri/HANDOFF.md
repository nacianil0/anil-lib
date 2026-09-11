# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-11 · Durum: **1–102 yayında (kohort Batch 0 → Batch 24) · Faz 11 kapandı · Sıradaki: 103 (Faz 12'nin tamamı 103–105 + Faz 13'ün açılışı 106)**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 102 — `tekrarlanabilirlik-negatif-sonuc-ve-acik-bilim` |
| Sıradaki güvenli başlangıç | Makale 103 ("Mikro-GPT: Bir Transformer'ı Elle Kurmak"); run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 103, 104, 105 ve 106 üretilir; bu dörtlü **Faz 12'yi tamamen kapatır ve Faz 13'ü açar**. **Bu run'da İKİ kategori sorusu VARDIR** — Faz 12 (103–105) ve Faz 13 (106–109) için ayrı ayrı karar verilecek; hazırlık ve öneriler aşağıda. **Bağlayıcı numaralı koordinat YOKTUR:** defter Batch 24'te tamamen temizlendi (101 ödendi). Devralınan numarasız işaretler: 102 → "serinin bir sonraki fazı" (6 ve 7'nin mimarisini elle kurmak) ve 100 → aynı boşluk ("haritanın ilerisinde duran kasıtlı bir boşluk"); ikisi de 103'te karşılanmalı. Devrolan planlı tekrar **yok** |
| Sıradaki kohort | `classification_batch: 25` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs`. **Batch 24'ün ek ölçerleri oturum scratchpad'indeydi ve kalıcı değil** (bilerek; bkz. Açık borçlar). Yeniden yazılması gerekenler: `wc` (repo kapısının `countProseWords`'ünün birebir kopyası — **`node -e` ile taklit edilmez, dosya olmalı**), `svgcheck` (aynı satırdaki metin çiftleri, kutu içi taşma, sağ/sol kenar, alt pay ≥ 12, kapanmamış `var(`, sabit hex, XML ayrıştırma), `scan` (yasaklı biçim + kendi numarası + ileri gönderme + kaçış + bölüm/kutu/şekil sayımı + alt metin sözcük sayısı), `syncalt` (markdown `alt` → SVG `aria-label`), `links` (her `[Bağlantı]` adresini çekip `<title>` yazar), `sweep` (rota taraması — **dilimli**, `resp.geturl()` karşılaştırmalı), `shots` (Playwright ile şekil PNG'leri), `fetch`/`pdftxt`/`q` (kaynak indirme, PDF → metin, korpus içi arama), `calc` (kendi hesaplarımız) |
| Level bandı | 1–10 `beginner`; 11–90 `intermediate`; **91'den itibaren `advanced`** (bağlayıcı kararlar #19 ve **#201**) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–80 `safety-and-evaluation`; 81–90 `multimodal-and-future`; **91–102 yine `foundations`** (kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142, #148, #160, #168, #176, #192, #200, #209, **#219**). Okuma listesinde `foundations` **iki öbek** (1–5 ve 91–102) ve kohort ayrımı sayesinde Batch 23 ile Batch 24 ayrı gruplar hâlinde görünüyor; `reading-list-groups.test.ts` bunu zaten sınıyordu ve değiştirilmedi. Kontrollü sözlükte kullanılmamış tek kalem hâlâ `case-studies` ve doğal yeri 114–115 |

## Sıradaki run'ın iki kategori kararı (hazırlık)

**Faz 12 — Temelden Kurmak: Modeli Elle İnşa Etmek (103–105).** Konu: 6/7'nin mimarisini, 8/14/15'in eğitim
hattını ve 11–13'ün asistanlaştırmasını küçük ölçekte **elle** kurmak. Seçenekler:
(a) **`models-and-training`** — 6–20 bandının adı zaten "modeli kurmak ve eğitmek"; 103–105 aynı katmanın
uygulama tarafı. Okuma listesinde `models-and-training` **iki öbek** olur (6–20 ve 103–105) ve bu, `foundations`
için zaten kabul edilmiş bir desendir (kararlar #200, #209). Kohort ayrımı sayesinde Batch 2'nin grubuyla
karışmaz. Varsayılan öneri budur.
(b) `foundations` — 91–102 çizgisinin devamı; ama o band **kuram ve yöntem** katmanını adlandırıyordu,
103–105 ise uygulama. Kategori konuyu değil katmanı adlandırır (karar #200) ve burada katman değişiyor.
(c) `case-studies` — 114–115 için ayrılmış durumda ve "vaka incelemesi" değil "inşa alıştırması" olduğu için
oturmuyor. **Karar 103'ün run'ında verilir ve YOL-HARITASI'na numaralı karar olarak yazılır.**

**Faz 13 — Eğitim Sistemleri Mühendisliği (106–109).** Konu: GPU zihinsel modeli, dağıtık eğitim, performans
mühendisliği, koşunun güvenilirliği. Seçenekler: (a) `models-and-training` (eğitimin mühendislik tarafı —
Faz 12 ile aynı kategoriye girerse 103–109 tek öbek olur); (b) `multimodal-and-future` — 88–90 zaten donanım,
uç ve enerji konularını bu kategoride taşıyor, dolayısıyla emsal var; (c) `foundations`. **İki kararın birlikte
düşünülmesi gerekiyor:** ikisi de `models-and-training` olursa okuma listesinde 103–109 tek öbek çıkar ve
Batch 25 ile Batch 26 kohort ayrımıyla ayrılır. **`reading-list-groups.test.ts` her iki durumda da
çalıştırılmalı;** yeni bir kategori dizini açılması gerekirse `schema.ts` içindeki `CATEGORIES` ve
`CATEGORY_LABELS` ile iki serinin şema testleri değişir (bugüne kadar hiç gerekmedi).

## Açık borçlar

- **Araştırma çalışma dizinleri kalıcı değil — bu bilinçli.** Batch 22'de paralel bir oturum `artifacts/`
  altını sildiği için (karar #208g), Batch 23 ve 24 `artifacts/` altına **hiçbir şey yazmadı**; bütün kaynak
  metinleri, PDF'ler ve ölçer betikleri oturum scratchpad'inde kaldı ve oturumla birlikte gidiyor. Sonraki
  run kendi betiklerini yeniden yazmak ve gerekli kaynakları yeniden indirmek zorunda. Betiklerin ne yaptığı
  yukarıdaki "Araçlar" satırında, indirme kanalları aşağıdaki "Venue doğrulaması" bölümündedir.
  **Batch 24 sırasında paralel BOUN oturumu `artifacts/b11-research/` altını kullanıyordu** — dizin paylaşımlı,
  güvenilmez.
- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları hâlâ İngilizce alan
  terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning ve Test-Time
  Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim defterine göre Türkçeleştiriliyor
  (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135, #148, #154, #155, #162, #163, #169, #170, #171,
  #177, #178, #184, #185, #202, #210, **#217**, **#218**). Katmanın tümden Türkçeleştirilip Türkçeleştirilmeyeceği
  kullanıcı kararıdır. Faz 8–14'ün başlıkları zaten Türkçe.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler — sıradaki dörtlüde güçlü bir aday YOK, bandın dışında VAR.**
  103 ("Mikro-GPT") uydurulmuş bir ad; 104'teki "Tokenizer" 15\. makalenin yayımlanmış başlığında zaten var ve
  değiştirilemez biçimde yerleşik; 106'daki "GPU" #108'in kısaltma sınıfında. **105'teki "SFT ve DPO" kısaltma
  sınıfında görünüyor** ama gövdede ikisi de Türkçe adlarıyla kurulmuştu (12: talimatla eğitim; 13: doğrudan
  tercih optimizasyonu) — bu yüzden 105'in run'ında bir kez bakılmalı. **Bandın dışında bekleyen asıl aday 108**
  ("Performans Mühendisliği: **Attention**'ı Hızlandırmak"): "dikkat" 6\. makaleden beri seri boyunca kullanılan
  yerleşik karşılıktır ve #217'nin ölçütüne göre başlık Türkçeleştirilmeli görünüyor. Başlık değişikliği
  entegrasyondan **önce** `roadmap.json`'a yazılır.
- **Yayımlanmış numaralı vaatler: DEFTER TEMİZ.** Bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir ve **Batch 24'ten sonra açık numaralı koordinat kalmamıştır** — 16/22'nin ölçüm disiplini vaadi
  101'de ödendi ve o defterdeki son açık kalemdi. Numarasız işaretler: 51 → 111, 49/53 → 115, ve 102/100 → Faz 12.
  **Devrolan planlı tekrar yok** (33/40'ın pass@k + görev ufku dört batch'tir devrediyordu, 101'de tahsil edildi).
  Yeni makalelerde numaralı vaat yalnızca gerçekten gerekliyse ve yol haritasının sağlam bölgesine verilir.
- **Prerequisite grafında 79–82 boşluğu.** YOL-HARITASI'ndaki graf satırları 78'de kesilip 83'ten devam
  ediyor; Batch 19 kendi dörtlüsünün satırlarını eklememişti. Batch 20–24 kendi satırlarını ekledi.
  Devrolan eksik; ileride toplu kapatılabilir, hiçbir kapı buna bağlı değil.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR hâlâ uygulanmadı; tam listeler
  repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(15) önceki batch'lerden (kararlar #21, #97, #104, #106,
  #114, #120, #127, #134, #141, #147, #152, #159, #167, #175, #183). **Batch 20–24'te doğrulanamayan künye yok**
  (kararlar #191, #198, #207, #216, **#224**). Tek kısmi kalem: Gundersen–Kjensmo'nun bitiş sayfası
  doğrulanamadı, künyeye yalnızca başlangıç sayfası yazıldı.
- **Hakemsiz kaynak oranı Batch 24'te 29 kalemin 3'ü (karar #224).** Yani 25 hakemli + 1 konferans kuralları
  belgesi + 3 hakemsiz. Batch 23: 54 kalemde 3, Batch 22: 44/50 hakemli, Batch 21: 40/48, Batch 20: 58/68.
  Kural değişmedi. **Faz 12 ve 13'ün kaynak profili yine farklı olacak:** 103–105 büyük ölçüde **kendi
  hesabımız** olacak (elle kurulan sayılar) ve bunların her biri SOZLESME §4'e göre işaretlenmeli; 106–109'da
  donanım ve sistem literatürünün hakemsiz teknik rapor payı yükselecek (88–90'ın deneyimi).
- **DBLP kapalı (Batch 18'den beri), Semantic Scholar 429 ve artık OpenReview API de 403.** Venue doğrulaması
  konferans dizin sayfaları + Crossref ile yapılır (aşağıda).

## Next batch preparation — 103'ten devam (Faz 12'nin tamamı + Faz 13'ün açılışı)

**Pedagojik hedefler.** Batch 24'ün sonunda okuyucu şunu biliyor: bir hipotez ancak bir şeyi yasaklıyorsa
sınanabilir ve ön kayıt bunu görünür kılar (klinik denemelerde anlamlı yarar bildirme oranı yüzde 57'den 8'e
indi); taban çizgisi seçmek kazancı tanımlamaktır (budama literatüründe bildirilerin dörtte birinden fazlası
hiçbir yönteme karşı karşılaştırılmamış); arama bütçesi deneyin parçasıdır ve kazananı değiştirir; bir ablasyon
farkı koşular arası sapmadan büyük değilse hiçbir şey söylemez (0,003 ↔ 0,005) — 99. Fazlar bir konu listesi
değil bir zincir: her faz bir öncekinin cevapsız bıraktığı ölçüm sorusunu devralıyor, ve seri boyunca tek bir
refleks altı ayrı yerde tekrarlanıyor — 100. p değeri iddianın olasılığı değildir; eşleştirme ayırt edilebilir
farkı 2,05 kat daraltır; en büyük gürültü kaynağı tohum değil veridir ve bütün kaynakları rastgeleleştirmek 51
kat ucuzdur; standart bölmede anlamlı çıkan bir fark yirmi rastgele bölmenin yalnızca birinde anlamlı kalabilir;
ve aynı formül tahminle yazıldığında yanlı bir tahminci olur (0,67232 ↔ 0,59359) — 101. Bir sonucu yeniden elde
etmek üç ayrı iştir; 400 bildirinin hiçbiri gerekli değişkenlerin tamamını belgelemiyor; 255 bildirinin yüzde
63,5'i kodsuz yeniden üretildi ve bunu öngören şey mecra değil okunabilirlik; ve 17 alanda 329 bildiriyi
etkileyen sızıntı, bir alanda karmaşık modellerin üstünlüğünü tümden sildi — 102.

**Sıradaki makaleler ve prerequisite'ler.** 103–105 Faz 12'yi tamamlar, 106 Faz 13'ü açar.
**103 ← 6 ve 7** (sorgu/anahtar/değer ve katman yığını; **elle kurulacak olan tam olarak bu**), 4 (token ve
embedding tablosu), 10 (çıktının dağılıma çevrilmesi), 91 (matris çarpımının boyut muhasebesi), 93 (softmax'ın
dağılım olarak okunması), 102 ("serinin bir sonraki fazı" devri: yeniden kurmak anlamanın en sert sınavı),
100 (kasıtlı boşluğun adlandırıldığı yer).
**104 ← 103** (kurulan modelin eğitilmesi), 8 (eğitim döngüsü ve kontrol noktası), 14 (veri temizliği ve karışım),
15 (tokenizer kararlarının yeteneklere yansıması), 2 ve 95 (öğrenme oranı ve eniyileyici seçimi), 9 (küçük
ölçekte ölçek yasası okumak), 99 (bütçenin yazılması bir tasarım kararıdır).
**105 ← 104** (eğitilen modelin asistanlaştırılması), 11–13 (post-training aşamaları, SFT ve tercih optimizasyonu),
94 (KL'nin nat cinsinden bütçe olması), 16 ve 101 (küçük ölçekte değerlendirmenin ölçüm disiplini — **101 burada
zorunlu geri çağırma**), 12 (az ama iyi seçilmiş örnek).
**106 ← 26 ve 28** (çıkarım tarafındaki bellek ve servis hesabı), **89 (DİKKAT: çatı çizgisi modeli ve işlem
yoğunluğu ORADA kuruldu — 106 bunu tekrarlayamaz, eğitim tarafına taşımalı)**, 8 (eğitim koşusunun kaynak
profili), 104 (kendi koşunda yaşanan darboğaz), 90 (enerji karşılığı).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Dikkat üçlüsü ve katman yığını (6, 7), embedding tablosu (4), örnekleme (10) → 103.
- Eğitim döngüsü (8), veri karışımı (14), tokenizer (15), eniyileyici (95) → 104.
- Post-training aşamaları (11–13), KL bütçesi (94), **ölçüm disiplini (101)** → 105.
- Çatı çizgisi ve işlem yoğunluğu (89, **tekrar değil devam olmalı**), KV önbelleği (26), servis (28) → 106.

**Araştırılacak güncel akademik alanlar (103–105 için öncelikli).** Bu üç makale büyük ölçüde **kendi
hesabımızdır**; kaynak ihtiyacı azdır ama iki şey gerekir: (a) mimarinin tam tanımı için Vaswani ve ark. 2017
ile ön-katman normalizasyonu tartışması (Xiong ve ark. ICML 2020); (b) küçük ölçekli eğitim ve asistanlaştırma
için BPE (Sennrich ve ark. ACL 2016), doğrudan tercih optimizasyonu (Rafailov ve ark. NeurIPS 2023) ve LIMA
(Zhou ve ark. NeurIPS 2023). Karpathy'nin nanoGPT/minGPT gibi kod tabanları **hakemsizdir** ve yalnızca
işaretlenerek, iddia taşımayan yerlerde kullanılmalıdır. **106 için:** Williams, Waterman & Patterson CACM 2009
(çatı çizgisi — 89'da kullanıldı, burada eğitim tarafına taşınacak), bellek hiyerarşisi ve toplu iletişim
(Rajbhandari ve ark. ZeRO, Shoeybi ve ark. Megatron-LM), ve dağıtık eğitimin ölçülmüş verimlilik sayıları.
**Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir;** süreç kuralları
SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 103: tek bir token'ın embedding'den logit'e kadar geçtiği bütün boyutlar, **gerçek küçük sayılarla** tek
  şekilde; ve dikkat matrisinin maskelenmiş hâlinin sayısal karşılığı.
- 104: eğitim döngüsünün bir adımının kaynak muhasebesi; ve tokenizer kararının sözlük boyutu ↔ dizi uzunluğu
  takası.
- 105: aynı küçük modelin ham, talimatla eğitilmiş ve tercihle hizalanmış hâllerinin aynı istemdeki çıktısı.
- 106: eğitim adımının çatı çizgisi üzerindeki yeri — **89'un şeklinin kopyası olmamalı**, eksen aynı olsa da
  nesne (eğitim adımı ↔ çıkarım aşaması) farklı olmalı.
- **Uyarı (kararlar #214 ve #223):** bu fazda da ölçülmemiş eğri çizilmemeli. 103–105'in sayıları elle
  hesaplanabilir olduğu için **kendi hesabımız** olarak işaretlenmeli ve girdileri şeklin içinde durmalı.

**Venue doğrulaması — Batch 24'ün kanalları.** Klasik ve dergi künyeleri için **birincil kanal Crossref**
(`api.crossref.org/works/<doi>`): başlık, dergi, cilt, sayı, sayfa, yıl ve yazar soyadları tek çağrıda gelir.
PNAS, Science, Sage, Taylor & Francis, Cell/Elsevier ve Wiley DOI'leri tarayıcıya 403 döner; **bu beklenen bot
duvarıdır ve künyeyi geçersiz kılmaz.** **OpenReview API'si bu run'da 403 verdi** (`api.openreview.net` ve
`api2.openreview.net`); `openreview.net/forum` sayfası zaten bot doğrulaması gösterip 200 döndüğü için tek
başına kanıt değil. **Sonuç: yeni OpenReview kimliği yazma;** ICLR için `proceedings.iclr.cc/paper_files/paper/2024|2025|2026`
ve `iclr.cc/virtual/<yıl>/papers.html` (2018–2023) dizinlerini kullan. Öteki dizinler çalışıyor:
`papers.nips.cc/paper_files/paper/<yıl>`, `proceedings.mlsys.org/paper_files/paper/<yıl>`,
`proceedings.mlr.press/v<cilt>`, `aclanthology.org` (DOI'den yönlendiriyor), `jmlr.org/papers/v<cilt>`,
`ojs.aaai.org`. **ICLR 2015 ve öncesi OpenReview'da forum kimliğiyle durmuyor**; o yıllar için arXiv bağlantısı
+ "ICLR YYYY" biçimi kullanılır (seride 4, 63, 87 ve 95'te aynı biçim). **DOI'deki parantez markdown bağlantısını
kırar**; yüzde kodlamasıyla yazılır. PDF'ler `pypdf` ile metne çevrilir; `arxiv.org/pdf/<id>` sürüm numarasız
istenmeli. PLOS makalelerinin tam metni
`journals.plos.org/plosone/article/file?id=<doi>&type=printable` ile iniyor; PMC ve OSF de açık kanal.

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 25` ve `readingOrder` 103'ten kesintisiz
devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir (başlık değişecekse
entegrasyondan **önce**); YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve bağlayıcı
kararlar güncellenir; doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki run
hazırlığıyla güncellenir. **İki kategori kararı verilecek** (yukarıya bakın) ve ikisi de numaralı karar olarak
yazılacak; `reading-list-groups.test.ts` çalıştırılır. **Level `advanced` kalır** (karar #201).
**Sonraki bağlayıcı karar numarası #225'tir.**

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
`geliştirme kümesi`, `niceleme`, `az/sıfır atışlı`, `çekişmeli`, `optimizatör`), **kendi numarası** ve
**numaralı ileri gönderme** (≥ N+1) taramaları, `N\. makale` kaçış denetimi, bölüm başlıkları, "Kendini yokla"
ve şekil sayısı. **Kelime sayısı için kapının kendi işlevi kopyalanmalı:** `check-series-content.cjs`'in
`countProseWords`'ü kaynakçayı, şekil sözdizimini, bağlantı hedeflerini ve liste/alıntı işaretlerini atar;
kabuk içinde yazılan tek satırlık taklit Batch 22'de 100–150 kelime fazla saydı. **Şekil alt metinleri kelime
sayısına girmiyor** ve uzun alt metinler taslağı olduğundan dolu gösteriyor — Batch 23'te dört makalenin üçü,
Batch 24'te dördü de ilk turda bandın altında kaldı. SVG için **iki** kapı: `check-series-svg.cjs` (viewBox,
sabit renk, yasak öge, font boyutu; genişlik tahmini **0,55 × font-size**) ve yeniden yazılacak `svgcheck`
(aynı satırdaki her metin çifti, kutu içi metnin `x + width`'i, sağ/sol kenar, alt pay ≥ 12, kapanmamış `var(`;
çarpan **0,58**, pay 6 px). **Şekil alt metni ile SVG'nin `aria-label`'ı betikle senkronlanmalı** — elle
yazıldığında ayrışıyor. **Bağlantı kapısı:** her `[Bağlantı](...)` adresi çekilir ve `<title>`'ı yazılır; bot
duvarları (403) beklenen sonuçtur ve Crossref ile telafi edilir. **PNG turu Batch 24'te bir kusur buldu**
(alt kaydın kutuya çok yakın durması) ve `svgcheck` aynı şekilde alt payı yakaladı — iki kapı birbirinin yerine
geçmiyor, ikisi de gerekli. **Ayrıca:** yeni bir ölçü çifti ya da yeni bir terim kurulacaksa YOL-HARITASI terim
defterinin ilgili satırları **yazımdan önce** aranmalı (Batch 24'te bu yolla iki çakışma yakalandı:
"rastgele arama" 63 ↔ 99 ve "önyükleme" 89 ↔ bootstrap); ve uzun aralıklı geri çağırmada **kaynak makalenin
gövdesi okunmalı**. **Batch 24'ün ek dersi: bir koordinat ödenirken o konuya en yakın yayımlanmış makalenin
tamamı okunmalı** — 71 zaten standart hatayı, gücü ve tohum gürültüsünü kurmuştu, 101 onları tekrarlamak yerine
üzerine karar katmanını koydu. Aynı risk 106 ↔ 89'da (çatı çizgisi) ve 103 ↔ 6/7'de var.

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch 24'te de
aynı worktree'de ikinci bir üretim oturumu (BOUN serisi) eşzamanlı çalışıyordu ve `artifacts/b11-research/`
altına yazıyordu; çakışma yaşanmadı çünkü (a) `artifacts/` hiç kullanılmadı, (b) build ve dev sunucusu izole
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
Bu makinede scratchpad'in Git Bash yolu `/tmp/claude/D--dev-anil-lib/<oturum>/scratchpad`, Windows yolu
`C:\Users\anil.akman\AppData\Local\Temp\claude\...` biçimindedir.

**Render doğrulama seti (Batch 24'te kullanılan).** Rota sweep'i Python `urllib` ile, **dilimli**: Batch 22'de
dev sunucusu 94 rotayı tek oturumda derlerken JavaScript yığınını tüketmişti; Batch 24'te 103 rota
32 + 32 + 20 + 19 dilim hâlinde, sunucu ayakta, toplam ~88 sn'de sorunsuz derlendi — **dilimleme kuralı
korunmalı.** Sweep betiği durum kodunun yanında `resp.geturl()`i de karşılaştırmalı; aksi hâlde `/login`
yönlendirmesi sahte bir "hepsi 200" raporu üretir. Tarayıcı panosundan: `preview_start` → `resize_window` ile
**açık genişlik/yükseklik** (1440×900, 768×1024, 375×812; `preset: "desktop"` emülasyonu **temizler**, ölçüm
için kullanılmaz) → `javascript_tool` ile tema döngüsü (`documentElement.classList` üzerinde `dark`/`sepia`)
ve ölçüm (`scrollWidth > innerWidth`, figure/svg/figcaption/blockquote sayıları, her SVG'nin kendi `figure`
kabından taşıp taşmadığı, `main.innerText` içinde `undefined`/`NaN` ve ham i18n anahtarı deseni).
**Ölçümden önce `await new Promise(r=>setTimeout(r,2200))` koy.** `browser_batch` içindeki JSON'da regex
kaçışlarına dikkat — regex'i `new RegExp('[a-z]+[.][a-z]+[.][a-z]+','g')` gibi köşeli parantezle kur ve
Türkçe karakterleri `\u` kaçışıyla yaz. **`NaN` sayacı sıfır olmayabilir:** 95'in gövdesi "kayıp NaN oldu"
cümlesini içeriyor; sayaç sıfır değilse bağlamı okuyup gövde cümlesi mi render kusuru mu ayırt et. Ölçülen
genişlikler: 1440'ta SVG 771 px, 768'de 676 px, 375'te 351 px — üçünde de yatay kaydırma yok. **Şekil
görüntüleri Playwright'tan** (sayfada kaplayıcı div'e 1200 px klon + sayfanın kendi arka plan rengi,
light/dark PNG): 12 şekil, 24 PNG, Read aracıyla incelendi. Playwright ana worktree'de
`node_modules/@playwright/test` altındadır ve ESM betiğinden **`import "D:/..."` ile çağrılamaz**
(`ERR_UNSUPPORTED_ESM_URL_SCHEME`); `createRequire("file:///D:/dev/anil-lib/")` + `require("@playwright/test")`
kullanılmalı. `waitUntil: "networkidle"` **kullanılmaz** — okuyucu `/api/reader-sync`'i sürekli yokladığı için
ağ hiç boşalmıyor; `domcontentloaded` + sabit bekleme kullan.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. Bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer —
  beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur (Batch 24'te de yalnızca bu 503).
- Ham HTML'de sayfa başına "undefined" görünür; Next.js iskelesindendir ve yayımlanmış eski makalelerde de
  aynıdır. `main.innerText` ölçümünde 0'dır — regresyon değil.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` ve genişliğe karşı yatay taşmayı yakalar; **sütuna
  binmeyi, kutudan taşmayı, yetersiz alt payı ve kapanmamış `var(` parantezini görmez** — bunun için ayrı bir
  ölçer gerekir (Batch 23 ve 24'te yeniden yazıldı, ikisinde de kusur buldu, ama scratchpad'de kaldı). İki
  ölçerin karakter genişliği tahmini farklıdır (0,55 ↔ 0,58). **Hiçbiri hizası bozuk bir satırı ya da yarım
  kalmış bir cümleyi görmez** — PNG turu bu yüzden zorunlu.
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde görünür (27–28, 29,
  30–40, 41–60); `safety-and-evaluation` 61–80 tek öbek, `multimodal-and-future` 81–90 tek öbek ve
  **`foundations` iki öbek** (1–5, 91–102). Kasıtlıdır; `reading-list-groups.test.ts` bunu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) ayrı bir üretim hattıyla ilerliyor; AI serisinin araçları o
  dizine dokunmaz. Build iki seriyi birden derler. **Batch 22, 23 ve 24 sırasında o hat aynı worktree'de
  eşzamanlı çalışıyordu**; `artifacts/`, `.claude/launch.json` ve `.wolf/*` paylaşılan durumdur ve çakışabilir.
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor (`Karar`, `her`, `Yaşayan`, `yapılırsa`,
  `**Bu`, `**zorundadır**.`). Build'i etkilemiyor; temizlik AI serisinin kapsamı dışıdır.
- Batch 12–23'ün üretimi (51–98) kullanıcı tarafından commit edildi. **Batch 24 (99–102) çalışma ağacında
  commit edilmemiş** duruyor: dört makale ve dört varlık klasörü izlenmiyor; `catalog.json`, `roadmap.json`,
  `HANDOFF.md`, `YOL-HARITASI.md` ve `.wolf/*` değişmiş durumda. Commit/push kullanıcı kararıdır
  (SOZLESME kapsamı dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)
- **Batch 24 (2026-09-11):** Makale 99–102, **Faz 11'in kapanışı**: deney tasarımı → haritanın sentezi →
  ölçümün disiplini → tekrarlanabilirlik. `BATCH=4+1`. Araştırma (dört dalga, 80'den fazla adres, `pypdf` ile
  PDF → metin), yazım, entegrasyon ve doğrulama ana oturumda, workflow/subagent kullanılmadan yapıldı.
  **Kategori sorusu yoktu** (99–102 `foundations`, karar #219) ve level `advanced` kaldı. **101 koordinatı
  ödendi ve defterde açık numaralı koordinat kalmadı**; 33/40'ın dört batch'tir devreden planlı tekrarı ile
  93'ün numarasız işareti de 101'de tahsil edildi. 99'un başlığı Türkçeleştirildi (#217), 102'nin başlığındaki
  gereksiz İngilizce kaldırıldı (#218). Kararlar #217–#224. 29 kaynak kaleminin 25'i hakemli, 3'ü hakemsiz.
  **Doğrulanamayan künye yok; OpenReview API'si kapandı.** Kapılar: `pnpm typecheck` (0), **642 test**,
  `pnpm build` (exit 0, `/seri/[slug]` 102 yol, 160 statik sayfa, izole kopyada), 103 rotanın tamamı 200
  (dört dilim, ~88 sn), dört makale × üç genişlik × üç temada DOM ölçümü, 12 yeni diyagram Playwright ile
  light/dark PNG olarak alınıp gözle doğrulandı. Paralel BOUN oturumu yine aynı worktree'deydi.
- **Batch 23 (2026-09-10):** Makale 95–98, **Faz 10'un kapanışı + Faz 11'in açılışı**: optimizasyonun kuramı →
  genelleme kuramı → klasik makine öğrenmesi turu → bir çalışmayı okumak. `BATCH=4+1`. **Faz 11'in kategorisi
  `foundations` (#209)** ve level `advanced` kaldı. **Yeni koordinat açılmadı ve kapatılmadı**; defterdeki tek
  koordinat 101 sıradaki banda düştü. 98'in başlığı Türkçeleştirildi (#210). Kararlar #209–#216. 54 kaynak
  kaleminin 48'i hakemli. 624 test.
- **Batch 22 (2026-09-10):** Makale 91–94, **Faz 10'un açılışı**: vektörler ve matrisler → rank, özdeğer ve SVD
  → olasılık, beklenti ve en büyük olabilirlik → entropi, çapraz entropi ve KL. **Faz 10'un kategorisi
  `foundations` (#200) ve level bandı `advanced`'e geçti (#201)**. **13'ün numarasız işareti 94'te ödendi.**
  Kararlar #200–#208. 605 test. **Paralel bir BOUN oturumu `artifacts/` altını sildi** (karar #208g).
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
