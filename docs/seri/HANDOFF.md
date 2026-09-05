# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-05 · Durum: **1–62 yayında (kohort Batch 0 → Batch 14) · Faz 6 kapandı (51–60) · Faz 7'nin 61–62'si yayında · Sıradaki: 63**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 62 — `guvenlik-egitimi-reddetme-sinirlar-ve-dengeler` |
| Sıradaki güvenli başlangıç | Makale 63 ("Jailbreak ve Kırmızı Takım"), Faz 7'nin üçüncü makalesi; run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 63, 64, 65 ve 66 üretilir (tamamı Faz 7). **64 bağlayıcı bir koordinattır** (aşağıda) |
| Sıradaki kohort | `classification_batch: 15` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–70 `safety-and-evaluation` (bağlayıcı kararlar #50, #65, #85, #98, #107, #122, #128, #135 ve #142). Kohort 14 iki kategoriye yayıldı (59–60 ↔ 61–62) ve `reading-list-groups.test.ts` değişmedi. Faz 7'nin kalanı (63–70) için varsayılan devamlılık `safety-and-evaluation`; yeni makaleler dizin olarak `content/series/articles/safety-and-evaluation/` altına girer |

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları İngilizce
  alan terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning
  ve Test-Time Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim
  defterine göre Türkçeleştiriliyor (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135).
  Katmanın tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler.** 63 "Jailbreak ve Kırmızı Takım": "jailbreak"
  alanda Türkçeleştirilmiyor; 58'de "sohbet için yazılmış basit bir kalıp" diye betimlendi, 62 sözcüğü hiç
  kullanmadı ve 63'e "bir sonraki makale" diye konu adıyla gönderdi — terim **63'ün run'ında** karar #108
  ölçütüyle (kısaltma/özel ad ise korunur, alan terimiyse defterdeki karşılık) karara bağlanır ve başlık
  değişecekse `roadmap.json` entegrasyondan **önce** güncellenir. 64 "Constitutional AI ve Ölçeklenebilir
  Denetim" ("Constitutional AI" özel ad; 62 konuyu "ilkelerin yazılması ve ölçeklenebilir denetim" diye
  betimledi, 61 "ilkelere dayalı etiketler" dedi). 70 "Sorumlu Ölçekleme: Frontier Güvenlik Çerçeveleri"
  ("frontier" → 70'in run'ında). 59–62'nin başlıkları Türkçeydi, değişmedi.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 14 **hiç koordinat açmadı ve kapatmadı**; 61, 13'ün açtığı **64** koordinatını
  yeniden andı ("13'te 64'e bıraktığımız ilkelere dayalı etiketler ve ölçeklenebilir denetim"). Sıradaki
  run **64'ü doğrudan öder**: 13'ün "ilkelere dayalı tercih etiketleri" vaadi ve 61'in tekrarı 64'ün
  gövdesinde adıyla kapatılır (ödendi satırı deftere işlenir). 20'nin "açık ağırlık yayımlamanın güvenlik
  tarafı" vaadi 62'de kısmen ödendi (ince ayar saldırısı); 63 (ağırlığa erişen saldırgan), 68 ve 70
  taksitleri açık. Ondan sonra 61–70 bandı ve 72. Numarasız işaretler: 62 → 63 (jailbreak ve kırmızı takım;
  ret öneki ve sığ hizalamanın saldırgan tarafı; ince ayar saldırısı), 58 → 63 (gradyanla eniyilenmiş
  saldırı; enjeksiyon ↔ jailbreak ayrımı), 57 → 63/67 (kısayol ve hile), 61 → 64 (ödül niyetin kanıtıdır;
  altı hizalama hedefi; işbirlikçi ters pekiştirmeli öğrenme; izleyici vekilin parçası olur), 62 → 64
  (ilkelerin yazılması; maliyet modeli ve kural tabanlı ödül), 53 → 64 (tartışma denetim için), 59 → 65
  (kalibrasyonun tam kurulumu; kalibrasyon açığı / ayırt etme açığı; tamamlayıcılık; aşırı güvenme), 16/50 →
  65 (kalibrasyon; güvenilirlik etiketi), 52/56 → 65 (öz-yansıma ↔ hakem; sorgu yeniden yazma), 46 → 65
  (etkin getirme), 39/62 → 65 (çekimserlik; belirlenemez istekte belirsizliği söylemek), 59/62 → 66 (ajan
  istenmedikçe sormaz; eksik istekte sormak; bağlamsal uyumsuzluk; insanlaştıran istek), 61 → 66/67 (uzunluk
  vekili; aldatma ve durum farkındalığının ölçümü — numarasız), 62 → "modelin içine bakmanın araçları"
  (ilerideki faz, numarasız), 55/57 → 72 (sızıntı, kirlilik), 57 → 101 (koşu sayısı, hata payı), 56 → 112
  (bellek ürünleri), 51 → 111 (Wooldridge–Jennings'in dört özelliği), 49/53 → 115 (MCP üçlüsü; lojistik eğri).
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR hâlâ uygulanmadı; tam
  listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(9) önceki batch'lerden (kararlar #21, #97,
  #104, #106, #114, #120, #127, #134, #141). (10) **Batch 14:** Vaccaro ve ark. Nature Human Behaviour
  8(12) PDF'i bot'a 403 döndü, arXiv kopyası okundu, künye ve bağlantı Nature DOI; Parasuraman, Sheridan &
  Wickens 2000 (IEEE TSMC-A 30(3)) IEEE aynaları 404/403, Semantic Scholar `openAccessPdf` ile cs.uml.edu
  kopyası (`curl -k`) okundu, künye IEEE; Sheridan & Verplank 1978 DTIC 403 — **kullanılmadı**, on basamak
  Parasuraman 2000 üzerinden verildi; Wiener 1960 (Science) duvar arkası — CIRL girişindeki alıntı üzerinden;
  Singhal ve ark. COLM 2024 kabul listesiyle doğrulandı, bağlantı arXiv; yayın başlığı arXiv'den farklı olan
  RouteLLM ("…from Preference Data", ICLR 2025), Skalse ("Defining and Characterizing Reward Gaming",
  NeurIPS 2022), IRD (NeurIPS 2017) ve CIRL (NeurIPS 2016) DBLP aramasında yanlış hit verdi, ICLR
  proceedings hash'i ve `papers.nips.cc` yıl dizinleriyle doğrulandı (karar #147).
- **Hakemsiz kaynak listesi Batch 14'te on dokuz kalem büyüdü — işaretlenerek** (karar #147; karar #6'nın
  listesi bu run'da güncellendi): Feng ve ark. 2025, Barres ve ark. 2025, Becker ve ark. 2025, Mozannar ve
  ark. 2025 (Magentic-UI), Anthropic/OpenAI istem önbelleği belgeleri, OPPO AI Agent Team 2025, Luo ve ark.
  2025, Backlund & Petersson 2025, Amodei ve ark. 2016, Clark & Amodei 2016, Krakovna ve ark. 2020, Manheim &
  Garrabrant 2018, Shah ve ark. 2022, Hubinger ve ark. 2019, Denison ve ark. 2024, Baker ve ark. 2025,
  Askell ve ark. 2021, Leike ve ark. 2018, Touvron ve ark. 2023 (Llama 2). Faz 7'de hakemsiz ama birincil
  kaynak (Anthropic/OpenAI/DeepMind raporları, model belgeleri) kaçınılmaz olarak artacaktır; kural
  değişmedi: işaretlenerek kullanılır, hakemli karşılığı varsa o öne çıkar.

## Next batch preparation — 63'ten devam (Faz 7'nin gövdesi: 63–66)

**Pedagojik hedefler.** Batch 14'ün sonunda okuyucu şunu biliyor: özerklik bir tasarım kararıdır (Sheridan'ın
on basamağı, Parasuraman'ın dört aşaması, Feng'in beş rolü); devir bir kayıp hesabıdır (Q(s, devret);
sınıflandırıcı + reddedici); insan–model takımı bütün parçalarını ortalamada geçmez (g = −0,23); açıklama
ikna eder, ayırt ettirmez; ajan istenmedikçe sormaz; kalibrasyon tek başına devir ölçüsü değildir (59). Fatura
tur × pencere ile kare büyür; istem önbelleği yazma 1,25× okuma 0,1×; geçiş başına bedel = deneme maliyeti ÷
başarı olasılığı; en ucuz koşu en ucuz çözüm değildir; basamak ve yönlendirici; gecikme program düzeyinde
yönetilir; ufuk ln s / ln p; uzun koşuda model kendi hatasına koşullanır (60). Söylediğimiz şey istediğimiz
şey değildir: belirtim, vekil ödül, belirtim oyunu, ödül hırsızlığı; Goodhart'ın dört türü; yetenek vekilin
açığını bulma yeteneğidir; hedef yanlış genellemesi; dış / iç hizalama; ödül niyetin kanıtıdır; işbirlikçi ters
pekiştirmeli öğrenme (61). Reddetme öğrenilmiş bir davranıştır ve birkaç yüz örnek yeter; aşırı güvenlik iki
kümeli cetvelle ölçülür; bağlamsal uyumsuzluğun beş kategorisi; maliyet modeli ve Lagrange çarpanı; sığ
hizalama — ret ilk birkaç token'da yaşar; on örnekle ince ayar reddi siler; yarışan hedefler ve uyumsuz
genelleme (62). 62'nin kapanışı 63'e devretti: ret ilk token'lardaysa saldırgan o token'ları nasıl ele
geçirir; kırmızı takım neyi ölçer, saldırı başarısını kim puanlar; savunma aşırı rete kaymadan nasıl kurulur.

**Sıradaki makaleler ve prerequisite'ler.** 63 ← 62 (sığ hizalama; ret öneki; ince ayar saldırısı; yarışan
hedefler / uyumsuz genelleme — Wei ve ark.'nın iki hipotezi jailbreak'in kuramsal çerçevesidir; XSTest ve
OR-Bench: savunma aşırı rete kayar), 58 (istem enjeksiyonu ↔ jailbreak ayrımı: enjeksiyon üçüncü tarafın,
jailbreak kullanıcının saldırısı; gradyanla eniyilenmiş saldırı işareti; AgentHarm kalıp saldırısı 85,2 → 16,7;
StruQ/SecAlign eğitim katı), 61 (belirtim oyunu — saldırgan da vekili oynar; cetvel hedefe dönüşünce), 57
(kısayol ve hile oranı; imkânsız test), 24 (sistem istemi; talimat hiyerarşisi eğitimi 83,1 → 60,4), 30
(kısıtlı üretim: ilk token'ları elinde tutan), 45 (hakem model: saldırı başarısını puanlama; hakem de
kandırılabilir), 20 (açık ağırlık: ağırlığa erişen saldırgan — vaat taksidi), 19 (ince ayar; LoRA). 64 ← 13
(ödül modeli; tercih çiftleri; "kimin tercihi"; **64 koordinatı: ilkelere dayalı tercih etiketleri**), 61
(altı hizalama hedefi; ödül niyetin kanıtı; işbirlikçi ters pekiştirmeli öğrenme; izleyici vekilin parçası
olur; dış / iç hizalama), 62 (maliyet modeli; kural tabanlı ödül; Lagrange çarpanı; yardımsever / dürüst /
zararsız; model üretimi etiket işareti), 53 (Khan ve ark.: bilgisi olmayan hakem, tartışmayla denetim), 45
(hakem model), 38 (süreç denetimi: adım etiketi), 35 (öz-düzeltme dış geri bildirim ister), 52 (öz-yansıma),
12 (denetimli ince ayar; öz-eleştiri verisi). 65 ← 16 (kalibrasyon; güvenilirlik diyagramı; cetvel bir
tasarım ürünüdür), 50 (güvenilirlik etiketi; token olasılığıyla güven), 59 (kalibrasyon açığı / ayırt etme
açığı; Steyvers; tamamlayıcılık; aşırı güvenme; uygun güven), 39 (çekimserlik), 33 (öz-tutarlılık: örnekleme
belirsizliğin ölçüsü olarak), 35 (doğrulayıcı; yanlış pozitif), 45 (hakem), 52/56 (öz-yansıma ↔ hakem), 44
(sorgu yeniden yazma), 46 (etkin getirme), 62 (belirlenemez istekte belirsizliği söylemek), 13 (tercih
eğitiminin kalibrasyonu bozması — birincil kaynak hakemsiz olabilir, işaretlenir). 66 ← 11 (yardımseverlik ↔
dürüstlük; hizalama vergisi), 13 (tercih etiketi hoşa gideni ödüllendirir; ödül modeli), 61 (uzunluk vekili;
Goodhart; ödül niyetin kanıtı), 62 (bağlamsal uyumsuzluk: insanlaştıran istek; kimlik kaydırma verisi; reddetme
sınırı), 59 (aşırı güvenme; açıklama ikna eder; netleştirme sorusu), 24 (sistem istemi ve kişilik), 45 (hakem
model: hakem de dalkavukluğa açık), 32 (düşünce zinciri sadakati — gerekçe ile gerçek neden ayrımı).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Sığ hizalama ve ret öneki (62), kum havuzu ve enjeksiyon ayrımı (58), kısayol (57) → 63.
- Talimat hiyerarşisi (24), kısıtlı üretim ve ilk token (30), hakem model (45) → 63, 64.
- Ödül modeli ve tercih çiftleri (13), altı hizalama hedefi ve ödül niyetin kanıtı (61), maliyet modeli (62),
  tartışma ile denetim (53), süreç denetimi (38) → 64.
- Kalibrasyon (16, 50), kalibrasyon açığı ve tamamlayıcılık (59), çekimserlik (39), öz-tutarlılık (33) → 65.
- Yardımseverlik ↔ dürüstlük (11), uzunluk vekili ve Goodhart (61), bağlamsal uyumsuzluk (62), aşırı
  güvenme (59) → 66.
- Belirtim oyunu ve hedef yanlış genellemesi (61), yarışan hedefler (62) → 63, 67.
- Açık ağırlık (20) → 63, 68, 70.

**Araştırılacak güncel akademik alanlar (63 için öncelikli):** gradyan tabanlı evrensel saldırı (Zou ve ark.
2023 GCG — arXiv, hakemsiz ama birincil; Carlini ve ark. NeurIPS 2023), jailbreak kıyaslamaları ve
puanlayıcıları (Mazeika ve ark. HarmBench ICML 2024; Souly ve ark. StrongREJECT ve Chao ve ark.
JailbreakBench — NeurIPS 2024 Datasets & Benchmarks, doğrulanmalı), kara kutu saldırılar (Chao ve ark. PAIR;
Mehrotra ve ark. TAP NeurIPS 2024; Liu ve ark. AutoDAN ICLR 2024; Andriushchenko ve ark. ICLR 2025; Anil ve
ark. many-shot NeurIPS 2024 — venue'ler doğrulanmalı), ortamda bulunan istemler (Shen ve ark. "Do Anything
Now" CCS 2024; Zeng ve ark. ikna ACL 2024; Deng ve ark. çok dilli ICLR 2024 — doğrulanmalı), kırmızı takım
metodolojisi (Perez ve ark. EMNLP 2022; Ganguli ve ark. 2022 — arXiv, hakemsiz), savunma (Robey ve ark.
SmoothLLM; Jain ve ark. temel savunmalar — arXiv; Zou ve ark. devre kesici NeurIPS 2024; Inan ve ark. Llama
Guard — hakemsiz; Sharma ve ark. Constitutional Classifiers 2025 — hakemsiz), mekanizma (Arditi ve ark. "ret
tek bir yön" NeurIPS 2024 — doğrulanmalı; 62'nin sığ hizalamasıyla köprü). **64 için:** Bai ve ark. 2022
(Constitutional AI — arXiv, hakemsiz, birincil), Kundu ve ark. 2023 (arXiv), Lee ve ark. RLAIF ICML 2024 ve
Sun ve ark. Dromedary NeurIPS 2023 (doğrulanmalı), Mu ve ark. kural tabanlı ödül NeurIPS 2024 (62'de anıldı;
doğrulanmalı), Burns ve ark. zayıftan güçlüye genelleme ICML 2024 (doğrulanmalı), Irving ve ark. 2018 tartışma
(arXiv), Michael ve ark. 2023 ve Kenton ve ark. NeurIPS 2024 (doğrulanmalı), Bowman ve ark. 2022 ve Saunders
ve ark. 2022 (arXiv), Christiano ve ark. 2018 (arXiv), McAleese ve ark. CriticGPT 2024 (hakemsiz), Guan ve
ark. 2024 (hakemsiz), Wu ve ark. ince taneli RLHF NeurIPS 2023. **65 için:** Kadavath ve ark. 2022 (arXiv),
Lin ve ark. TMLR 2022, Kuhn ve ark. ICLR 2023 ve Farquhar ve ark. Nature 2024 (anlamsal entropi), Mielke ve
ark. TACL 2022 ve Band ve ark. ICML 2024 (dilsel kalibrasyon; doğrulanmalı), Jiang ve ark. TACL 2021, Desai &
Durrett EMNLP 2020, Manakul ve ark. EMNLP 2023, Kalai & Vempala STOC 2024 (doğrulanmalı) ve Kalai ve ark.
2025 (arXiv), Geng ve ark. NAACL 2024 derlemesi (doğrulanmalı), Tian/Xiong (59'dan). **66 için:** Sharma ve
ark. ICLR 2024 (dalkavukluk; doğrulanmalı), Perez ve ark. ACL 2023 Findings (model yazımı değerlendirmeler),
Wei ve ark. 2023 (arXiv), Turpin ve ark. NeurIPS 2023, Santurkar ve ark. ICML 2023, Kirk ve ark. PRISM
NeurIPS 2024 (doğrulanmalı), Shanahan ve ark. Nature 2023, Fanous ve ark. 2025 ve Cheng ve ark. 2025 (arXiv),
Anthropic "Claude'un karakteri" 2024 ve OpenAI Model Spec 2024/2025 ve GPT-4o dalkavukluk raporu 2025
(hakemsiz, birincil). Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir;
süreç kuralları SOZLESME §9'dadır.

**Venue doğrulaması.** Batch 10–13'ün on üç kanalı sürüyor (Crossref API ve `query.title`, ACL Anthology,
DBLP `ee` 12 sn, PMLR GitHub aynası ve dizin ayrıştırması, COLM kabul listesi `curl -k`, ICLR proceedings
2025/2026, arXiv API başlık araması). Batch 14 iki kanal ekledi: (14) **Semantic Scholar `openAccessPdf`**
eski dergi makalesinin açık kopyasını verir (Parasuraman 2000, cs.uml.edu; `curl -k`); (15) **`papers.nips.cc`
yıl dizinleri** yayın başlığı arXiv'den farklı olan NeurIPS bildirilerini bulur — DBLP başlık araması bu
durumda yanlış hit verir (RouteLLM, Skalse, IRD, CIRL). Kural sürüyor: OpenReview ve PMLR kimlikleri **tahmin
edilmez**; DBLP `ee` ya da birincil dizin sayfası. `dblp-b14.py` 72 başlıkta 12 sn aralıkla yavaş ama
takılmadan bitti; yeniden çalıştırılınca yalnızca eksikleri sorar. Batch 14'ün 71 kaynak metni
`artifacts/b14-research/pdf/*.txt` altında duruyor; PDF'ler ve büyük HTML dizin dökümleri build şişmesin diye
silindi, `html/*.txt` (önbellek/fiyat belgeleri, belirtim oyunu listeleri, Claude Code izinleri) yerinde.
Batch 11–13'ün `.txt` metinleri de yerinde. Faz 7'de arXiv-only birincil kaynak oranı yükselecek; her biri
gövdede "hakemsiz" işaretlenir ve karar #6 listesine yazılır.

**Görselleştirme ihtiyaçları (öngörü):**
- 63: saldırı ailesi × savunma katmanı matrisi (58-Şekil 2'nin "beş savunma, üç ölçü" düzeninin geri
  çağrımı); HarmBench'in model × saldırı başarı tablosu; StrongREJECT'in "jailbreak yeteneği düşürür" eğrisi;
  GCG'nin aktarım tablosu.
- 64: 13-Şekil'in tercih hattına ikinci etiketleyicinin (ilkelerle model) eklenmiş hâli; zayıftan güçlüye
  genelleme eğrisi (Burns'ün geri kazanılan performans oranı); tartışma ↔ danışma doğruluk tablosu (Khan; 53'ün
  geri çağrımı).
- 65: güvenilirlik diyagramı (16-Şekil'in geri çağrımı; tercih eğitimi öncesi/sonrası — birincil kaynak
  hakemsizse işaretle); sözel güven ↔ doğruluk tablosu (59'daki Tian/Xiong'un tam kurulumu); anlamsal entropi
  şeması (aynı anlam farklı sözcük).
- 66: geri bildirim dalkavukluğu ölçüm düzeni (61-Şekil 3'ün uzunluk vekilinin yanına "onay" vekili); Sharma'nın
  tabloları; karakter belirtimi katmanları (sistem istemi 24 ↔ eğitim 62 ↔ ilkeler 64).

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 15` ve `readingOrder` 63'ten
kesintisiz devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir;
YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve gerekiyorsa bağlayıcı olgu
kararları güncellenir (64'ün "ödendi" satırı dâhil); doğrulama kapıları çalıştırılır; `+1` fazında bu dosya
yeni cursor ve sonraki run hazırlığıyla güncellenir. Dördü de `safety-and-evaluation` olduğu için okuma
listesi öbeği yalnızca büyür; Batch 14'te 61–62 aynı öbeği açarken `reading-list-groups.test.ts`
değişmedi, bu run'da da değişiklik beklenmez (test yine de çalıştırılır).

**Entegrasyon sırası (repo içi araçlarla):**
```
node tools/series/entegre-batch.cjs            # kuru çalışma: frontmatter → katalog/roadmap denetimi
node tools/series/entegre-batch.cjs --write    # catalog.json + roadmap.json
node tools/series/sync-series-hashes.cjs --write
node tools/series/check-series-content.cjs && node tools/series/check-series-svg.cjs
corepack pnpm typecheck && corepack pnpm test && corepack pnpm build
```
Notlar: frontmatter **gray-matter ile** okunur; `catalog.json` 2 boşluklu `JSON.stringify` ile
byte-identical round-trip yapar; `roadmap.json`'un kompakt satır biçimi satır bazlı replace ile
korunur. **Sıra önemlidir:** `sync-series-hashes.cjs` katalog varsa yalnızca katalog kayıtlarını
gezer, dolayısıyla yeni makalelerin hash'i ancak `entegre-batch --write`'tan **sonra** düzelir;
frontmatter'a önce yer tutucu hash yazmak sorun değildir (Batch 13 ve 14'te böyle girdi).
Roadmap başlığı frontmatter başlığıyla birebir eşleşmek zorundadır — başlık değiştiriliyorsa
roadmap.json entegrasyondan **önce** güncellenmelidir (58'de böyle yapıldı). **Entegrasyondan sonra
makale gövdesine her dokunuşta `sync-series-hashes.cjs --write` yeniden çalıştırılmalıdır** (SVG
değişikliği hash'i etkilemez; Batch 14'te 61-Şekil 3 entegrasyondan sonra düzeltildi, hash aynı kaldı).
Araçların üçü de varsayılan olarak **yalnızca AI serisini** işler (`--series=boun` ayrı seri içindir).
`check-series-svg.cjs` XML ayrıştırmaz ve `var(` parantezinin kapanmadığı dolguyu görmez: her yeni SVG
ayrıca `python -c "import xml.etree.ElementTree as ET; ET.parse(f)"` ile ayrıştırılır **ve**
`grep -c 'var(--[a-z-]*"' content/series/assets/*/*.svg` ile taranır. Denetleyicinin taşma tahmini
(karakter × 7,15) `text-anchor="middle"` metinde x ± genişlik/2 alır: 210 birimlik kutuya ortalanmış
alt satır ≤ 28 karakter, gösterge etiketi x ≤ 500'den başlar; 13 birimde x=20'den alt not ~97 karakter
alır; döndürülmüş (`rotate`) etiketler taşma diye işaretlenir — kısa sözcükleri üst üste dizmek daha
güvenli (59-Şekil 1). **Denetleyici elemanlar arası binmeyi görmez:** gösterge ile sütun başlığı aynı y
bandını paylaşmaz (61-Şekil 3'te bindi, yalnızca ekran görüntüsünde çıktı) — gösterge ya sağ üstte (x ≥
500) ya alt not bloğunda. Denetleyici "Şekil N metinde referanslanmamış" ve "şekil numarası N, beklenen M"
uyarılarını verir. **Yayın öncesi zorunlu taramalar (Batch 14'te hepsi çalıştı):** parantezli gloss listesi ↔
terim defteri; yasaklı biçimler (`gömme`, `korpus`, `geliştirme kümesi`, `niceleme`, `az/sıfır atışlı`);
kendi numarası (62'de "62'nin dersi" böyle yakalandı); ve **numaralı ileri gönderme** (Python: gövdede ≥ N+1
olan "K'de / K'te / K. makale" kalıpları — 62'den büyük sayılar yüzde/puan/dolar/token olarak elle ayıklandı).
Kendi hesabımızla verilen sayılar gövdede "kendi hesabımız" diye işaretlenir (karar #145).

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch
14'te run başında ve build/dev öncesinde 3000–3999 arası dinleyen port yoktu; yine de izole kopya
kullanıldı ve ana worktree'nin `.next` dizinine hiç dokunulmadı: `tar -c --exclude=./node_modules
--exclude=./.next --exclude=./.git --exclude=./artifacts --exclude=./.env.local --exclude=./test-results
--exclude=./playwright-report . | tar -x -C /d/dev/anil-lib-b14-render`, junction PowerShell ile
`New-Item -ItemType Junction -Path 'D:\dev\anil-lib-b14-render\node_modules' -Target
'D:\dev\anil-lib\node_modules'`, kopyada `corepack pnpm build` (111 sayfa, exit 0), sonra kopyanın
`.next`'i silinip `.claude/launch.json`'a geçici yapılandırma (`anil-lib-seri-b14`: Git Bash **tam yolu**
`C:\Users\<user>\AppData\Local\Programs\Git\bin\bash.exe`, `-lc`, `export PATH="/usr/bin:$PATH"; cd
/d/dev/anil-lib-b14-render && exec corepack pnpm dev -p 3210`; Write aracıyla yazıldı), kopyada
`.env.local` olmadığı için kapı kendiliğinden kapalı. `typecheck` ve `test` ana worktree'de çalıştırıldı.
Entegrasyondan sonra düzeltilen bir SVG kopyaya `cp` ile taşınmalı (dev sunucusu kopyayı okur).
Temizlik: **önce** `preview_stop`, sonra junction'ı kaldır (`cmd /c rmdir` junction yoluna — içeriği
takip etmez; ardından ana `node_modules`'ın yerinde olduğu doğrulanır), sonra kopyayı sil; launch.json
özgün hâline döndürüldü (`artifacts/b14-research/launch.json.orig` yedeği). Kural değişmedi: **ana
worktree'de `.next` silme, `pnpm build` ya da `next dev` başlatmadan önce `netstat` ve `tasklist` ile o
an paralel süreç var mı bak; varsa karşı oturuma haber ver ve izole kopyayı kullan.** Bash aracında `cd`
bir komuttan sonrakine taşınır — her komut `cd /d/dev/anil-lib;` ile başlar; Python Windows'ta
`/d/dev/...` yolunu tanımaz (`D:/...` verilir) ve JSON basarken `PYTHONIOENCODING=utf-8` ister.

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un bulgusu sürüyor.** Batch 14 sonunda
`artifacts/b14-research/pdf/*.pdf` (140 MB) ve `html/*.html` dizin dökümleri (10 MB) silindi; `.txt`
metinleri, `dblp-b14.*`, `crossref-b14.*`, `fetch-b14-report.json`, `html/*.txt`, `sweep-b14.py`,
`measure-b14.js` ve loglar kaldı (7,3 MB).

**Render doğrulama seti (Batch 14'te kullanılan).** Rota sweep'i Python `urllib` ile (63 rota, 28,7 sn;
`artifacts/b14-research/sweep-b14.py`), tarayıcı gezintisinden **önce**. Tarayıcı panosundan **elle**:
`resize_window` ile 1440/768/375, tema `documentElement.classList` üzerinde `dark`/`sepia`
değiştirilerek, ölçüm fonksiyonu `localStorage`'a yazılıp `eval(localStorage.getItem('b14m'))()` ile
çağrıldı (kaynağı `artifacts/b14-research/measure-b14.js`); geçerli dolgu kümesi (`badFills`), `getBBox`
ile viewBox içi kalma (`outOfBox`), `scrollWidth > clientWidth`, figure/svg/figcaption sayıları,
`main.innerText` içinde `undefined`/`NaN`, h2/tablo/kutu sayıları. Dört makale × üç genişlik × üç tema:
taşma 0, badFills ve outOfBox boş, sızıntı yok, `figScroll` false. Şekil ekran görüntüleri: `resize_window`
**1500×600**, tek temalı sabit kaplayıcı `b14g(i, tema, ölçek)` (`localStorage`'da; şekli 1080 px
genişlikte klonlar, koyu tema token'larını inline `style.setProperty` ile verir); JS + `wait 2` bir
`browser_batch`'te, ardından `screenshot` **iki kez ayrı çağrı** — ilki neredeyse her seferinde 5 sn
zaman aşımına düşüyor, ikincisi geliyor; `zoom` bölge kırpmıyor; yerel SVG dosyasına açılmış sekme
`navigate` ile başka adrese gitmiyor (yeni sekme açılır), sekme sınırı dolunca dosya sekmeleri kapatılır.
12 şeklin tamamı light/dark görüldü; bir kusur (61-Şekil 3 gösterge binmesi) bulunup düzeltildi ve yeniden
görüldü.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki render
  betikleri de lint kapsamındadır; bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor. Batch 12–14
  ölçümünde `figScroll` 375'te false — regresyon değil.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` durumunu yakalar; alt kenara çok yakın
  bir metin tabanı denetimden geçer. Batch 7–14'ün yeni şekillerinde alt pay ≥ 14 birim; yayımlanmış
  eski şekillerin bir kısmında bu pay hâlâ küçüktür. Kutu içine binen etiketleri, elemanlar arası
  binmeyi ve kapanmamış `var(` parantezini de görmez (yukarıdaki ek taramalar ve ekran görüntüsü bunun için).
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde
  görünür (27–28, 29, 30–40, 41–60); `safety-and-evaluation` 61–62 tek öbek. Kasıtlıdır (kararlar #65,
  #107, #142); `reading-list-groups.test.ts` tam olarak bu durumu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) bulunuyor ve ayrı bir üretim hattıyla
  ilerliyor; AI serisinin araçları bu dizine dokunmaz. Build iki seriyi birden derler; sayfa sayısı
  ikisinin toplamıdır (Batch 14 sonunda 111).
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor. Dördü git'te **izleniyor**
  (`Karar`, `her`, `Yaşayan`, `yapılırsa`); biri izlenmiyor (`**zorundadır**.` — `*` görünümlü
  karakter U+F02A). Build'i etkilemiyor. Temizlik AI serisinin kapsamı dışıdır; sahibinin kararı.
- Batch 12, 13 ve 14'ün üretimi (51–62, catalog/roadmap/YOL-HARITASI/HANDOFF değişiklikleri) çalışma
  ağacında **commit edilmemiş** duruyor; commit/push kullanıcı kararıdır (SOZLESME kapsamı dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)

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
- Batch 0/1'in ham üretim kayıtları `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv** olarak
  durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
