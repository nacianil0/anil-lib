# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-05 · Durum: **1–66 yayında (kohort Batch 0 → Batch 15) · Faz 7'nin 61–66'sı yayında · Sıradaki: 67 (Faz 7'nin kapanış dörtlüsü 67–70)**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 66 — `dalkavukluk-ve-model-karakteri` |
| Sıradaki güvenli başlangıç | Makale 67 ("Aldatma ve Durum Farkındalığı Tartışmaları"), Faz 7'nin yedinci makalesi; run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 67, 68, 69 ve 70 üretilir ve **Faz 7 kapanır**. **69 bağlayıcı bir koordinattır** (20'nin "açık kaynak tanımının düzenleyici çerçevedeki yeri" vaadi); 68 ve 70, 20'nin "açık ağırlık" vaadinin açık taksitleridir (aşağıda) |
| Sıradaki kohort | `classification_batch: 16` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–70 `safety-and-evaluation` (bağlayıcı kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142 ve #148). Kohort 15 (63–66) tamamen `safety-and-evaluation`; okuma listesinde 61–66 tek öbek ve `reading-list-groups.test.ts` değişmedi (495 test). Faz 7'nin kalanı (67–70) için varsayılan devamlılık `safety-and-evaluation`; Faz 8'in (71–80, "Değerlendirme ve Yorumlanabilirlik") kategorisi 71'in run'ında kararlaştırılır. Yeni makaleler dizin olarak `content/series/articles/safety-and-evaluation/` altına girer |

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları İngilizce
  alan terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning
  ve Test-Time Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim
  defterine göre Türkçeleştiriliyor (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135).
  Katmanın tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler.** 63'ün "jailbreak"i Batch 15'te karar #108 ölçütüyle
  korundu (karar #148: alanda Türkçeleştirilmeyen, kısaltma gibi işlev gören terim; gövdede ilk paragrafta
  tanımlandı); 64'ün "Constitutional AI"ı özel ad olarak kaldı. Sıradaki dörtlüde: 67 "Aldatma ve Durum
  Farkındalığı Tartışmaları" Türkçe; 68 "Kötüye Kullanım: Siber, Bio ve Bilgi Operasyonları" — "bio" alan
  kısaltması ("biyolojik" açık yazılırsa başlık uzar; karar 68'in run'ında, `roadmap.json` entegrasyondan
  **önce** güncellenir); 69 "Yönetişim: Politika, Standartlar ve Regülasyon" Türkçe; 70 "Sorumlu Ölçekleme:
  Frontier Güvenlik Çerçeveleri" — "frontier" için defterde karşılık yok ("sınır modeli"? 110–118'in faz
  başlığı "Sınır ve Sentez"); karar 70'in run'ında. Faz başlıkları katmanı yine kullanıcı kararıdır.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 15 **64'ü ödedi ve yeni koordinat açmadı**: 13'ün "ilkelere dayalı tercih etiketleri ve
  ölçeklenebilir denetim" vaadi ve 61'in tekrarı 64'ün gövdesinde adıyla kapatıldı. 20'nin "açık ağırlık
  yayımlamanın güvenlik tarafı" vaadi 62 (ince ayar saldırısı) ve 63'te (ağırlığa erişen saldırganın üç kapısı)
  kısmen ödendi; **68 ve 70 taksitleri açık** — 68 kötüye kullanım tarafını (açık ağırlığın siber/bio uplift'i,
  unlearning'in kırılganlığı), 70 çerçeve tarafını (açık yayımlama eşiği, "if-then" taahhütleri) öder. **69
  bağlayıcı koordinattır:** 20'nin "açık kaynak tanımının düzenleyici çerçevedeki yeri" vaadi 69'un gövdesinde
  adıyla ödenir (OSI'nin açık kaynak yapay zekâ tanımı, AB Yapay Zekâ Yasası'nın açık kaynak muafiyeti;
  ödendi satırı deftere işlenir). Ondan sonra 72. Numarasız işaretler: 66 → 67 (aldatmanın ölçüye
  çevrilmesi; "test edildiğini fark etmek"; kanıt mı hipotez mi; Shanahan'ın rol oyunu dili; Turpin'in sadakati),
  61 → 67 (aldatma ve durum farkındalığının ölçümü; hilenin izleyiciden gizlenmesi), 57 → 67 (kısayol ve hile),
  63 → 68/69/70 ("kötüye kullanımın ve yönetişimin taksitleri bu fazın ileriki makaleleri"), 62 → 68
  (dual-use ret sınırı), 66 → 69 (kimin görüşü: PRISM; model belirtimi), 64 → 69/70 (kimin ilkeleri; anayasa
  kamuya açık belge), 59 → 70 (özerklik düzeyleri; devir), 63 → 70 (kırmızı takım bir çerçeve gereğidir;
  Constitutional Classifiers), 65 → 71/73 (kalibrasyon değerlendirme bilimi; hakem güveni), 62/65 → "modelin
  içine bakmanın araçları" (ilerideki faz, numarasız; 74–77 koordinatı 6/18'den açık), 55/57 → 72 (sızıntı,
  kirlilik), 57 → 101, 56 → 112, 51 → 111, 49/53 → 115.
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
  proceedings hash'i ve `papers.nips.cc` yıl dizinleriyle doğrulandı (karar #147). (11) **Batch 15:** Farquhar ve
  ark. Nature 630 PDF'i 403 döndü, tam metin Europe PMC `fullTextXML` (PMC11186750) ile okundu, künye Nature DOI;
  Betley ve ark. için DBLP 503 döndü, künye PMLR 267 dizininden (betley25a); Anil ve ark. many-shot için DBLP
  yanlış hit verdi, `papers.nips.cc` sayfasıyla doğrulandı; Durmus ve ark. 2023 COLM 2024 kabul sayfası bu run'da
  challenge sayfası döndüğü için arXiv (hakemsiz) olarak kaldı; Anthropic self-reminder (Nature MI 2023) özeti
  yayıncı tarafından kısaltılmış, metin alınamadı — **kullanılmadı**; Brier 1950 DOI'si Crossref'le doğrulandı
  (Monthly Weather Review 78(1), 1–3) (karar #152).
- **Hakemsiz kaynak listesi Batch 15'te otuz kalem büyüdü — işaretlenerek** (karar #152; Batch 14'ün on dokuz
  kalemi karar #147'de): 63 — Anthropic many-shot yazısı, Zou ve ark. 2023, Jain ve ark. 2023, Ganguli ve ark.
  2022, Robey ve ark. 2023, Alon & Kamfonas 2023, Inan ve ark. 2023, Sharma ve ark. 2025; 64 — Amodei ve ark.
  2016, Bai ve ark. 2022, Anthropic anayasa açıklaması 2023, Kundu ve ark. 2023, Guan ve ark. 2024, Bowman ve
  ark. 2022, Saunders ve ark. 2022, McAleese ve ark. 2024, Irving ve ark. 2018, Parrish ve ark. 2022, Michael ve
  ark. 2023; 65 — Kadavath ve ark. 2022, OpenAI GPT-4 raporu 2023, Kalai ve ark. 2025; 66 — Laban ve ark. 2023,
  Cheng ve ark. 2025, Wei ve ark. 2023, Durmus ve ark. 2023, Anthropic karakter yazısı 2024, OpenAI Model Spec
  2025, Chen ve ark. 2025, OpenAI dalkavukluk açıklamaları 2025. Oran 30 / 84; Faz 7'nin kalan dörtlüsünde
  (aldatma, kötüye kullanım, yönetişim, sorumlu ölçekleme) sağlayıcı çerçeveleri, sistem kartları, politika
  belgeleri ve arXiv ön çalışmaları kaçınılmaz olarak çoğunluk olabilir; kural değişmedi: işaretlenerek
  kullanılır, hakemli karşılığı varsa o öne çıkar, düzenleyici metinler (AB Yapay Zekâ Yasası, NIST, ISO)
  "resmî belge" diye işaretlenir.

## Next batch preparation — 67'den devam (Faz 7'nin kapanışı: 67–70)

**Pedagojik hedefler.** Batch 15'in sonunda okuyucu şunu biliyor: jailbreak ret eğitimini ağırlığa dokunmadan
aşan saldırıdır; altı saldırı ailesi üç erişim düzeyine dizilir (elle yazılmış kalıp → ikna ve dil → many-shot →
modelle bulunan istem → gradyanla eniyilenen sonek → üretim kuralı ve ağırlık); saldırı başarısını kim puanlar
sorusu cetvelin kendisidir (sözcük eşleşmesi insanla ters ilişkili; jailbreak yeteneği düşürür); her savunma
katmanı bir saldırıyı kapatıp öbürünü kaçırır ve yarardan bir pay keser; açık ağırlık saldırgana üç kapı açar
(63). Anayasa yazılı bir belirtimdir; eleştiri → düzeltme → yapay geri bildirim hattı tercih etiketini ilkeyle
üreten bir model verir (RLAIF ↔ RLHF eşit, zararsızlıkta üstün); denetçi zayıfken sandviçleme, zayıftan güçlüye
genelleme (geri kazanılan pay ≈ 50 / 80 / 10) ve tartışma (bilgisi olmayan hakem daha ikna edici tartışmacıyla
daha doğru) denetimi ölçekler; hakemin güveni denetimin düğmesidir (64). "Eminim" bir ölçüdür: güvenilirlik
diyagramı, ECE, Brier; ön eğitilmiş model kalibreli, tercih eğitimi bozar, sıcaklık düzeltir; güven dört yerden
okunur (token olasılığı, sözel güven, örnekleme tutarlılığı, anlamsal entropi) ve içeriden beşinci; seçici
tahminde çekimserlik bir güven eşiğidir; güven ifadesi kullanıcının güvenini kalibre eder; sınav ödülü
uydurmayı ödüllendirir (65). Dalkavukluk dört biçimde ölçülür (geri bildirim, "emin misin?", cevap, taklit) ve iki
kaynağı vardır (ön eğitim + tercih zinciri); model kimin görüşünü yansıtır (Santurkar, Durmus, PRISM); karakter
dört katmanda yazılır (sistem istemi, eğitim, belirtim, ağırlıkların içi — karakter vektörü, beliren
hizalanmama); dalkavukluk değerlendirmesi dağıtımı engelleyen bir ölçüt oldu (66). 66'nın kapanışı 67'ye
devretti: bir model ne zaman aldatıyor sayılır, "test edildiğini" fark etmesi ne demektir ve ölçülebilir mi,
alanın söyleyebildiği kanıt mı hipotez mi.

**Sıradaki makaleler ve prerequisite'ler.** 67 ← 66 (Shanahan'ın rol oyunu dili: görünürdeki aldatma ve
kendinin farkında olma cümlelerini insanlaştırmadan tarif etmek; Turpin: gerekçe belirleyici öneriyi anmaz;
beliren hizalanmama; karakter vektörü), 61 (belirtim oyunu; hile gizleme; ödül kurcalama; izleyici vekilin
parçası olur; Denison ve Baker 61'de anıldı — düşünce zinciri izleme; içsel eniyileyici ve aldatıcı hizalanma
hipotezi), 32 (düşünce zinciri sadakati), 57 (hile oranı; imkânsız test; iz denetimi), 59 (açıklama ikna eder,
ayırt ettirmez), 63 (kırmızı takım; hakem kandırılabilir), 64 (denetim: hakem tartışmacıyı yakalayabilir mi;
eleştirmen model), 65 (içeriden okuma: Azaria; kalibrasyon; anlamsal entropi), 62 (sığ hizalama; ince ayar
reddi siler — uyuyan ajan hipotezinin zemini), 23 (örnekle öğrenme: bağlam içi entrika), 24 (sistem istemi:
"test ediliyorsun" bilgisi). **68 ← 63** (savunma katmanları; Constitutional Classifiers; açık ağırlığın üç
kapısı — **20'nin taksidi**; kırmızı takım metodolojisi), 62 (dual-use ret sınırı; aşırı güvenlik), 58
(ajan saldırıları; AgentHarm), 55 (kod yazan ajanlar — siber tarafı), 48 (web arayüzleri — bilgi operasyonları
için üretim), 17 (uydurma — dezenformasyon), 14 (veri: eğitim verisinden tehlikeli bilgi; unlearning), 20 (açık
ağırlık). **69 ← 20** (**69 koordinatı: açık kaynak tanımının düzenleyici çerçevedeki yeri**; lisanslar, OSI),
66 (kimin görüşü; model belirtimi; PRISM'in katılımcı yaklaşımı), 64 (anayasa kamuya açık bir belgedir; kimin
ilkeleri), 61 (belirtim: yasa da bir belirtimdir; Goodhart düzenlemede), 57 (değerlendirme standardı; HAL),
16 (benchmark'ların ne ölçtüğü — düzenleyici değerlendirme), 68 (risk sınıfları yönetişimin girdisi). **70 ←
69** (çerçevelerin yasal zemini), 68 (tehlikeli yetenek değerlendirmesi; eşikler), 63 (kırmızı takım çerçeve
gereğidir), 64 (ölçeklenebilir denetim çerçevenin yükümlülüğü), 59 (özerklik düzeyleri; devir; insan denetimi),
61 (hizalama sorununun çerçevedeki yeri), 40 (görev ufku: özerk yetenek ölçüsü), 9 (ölçek yasaları: "ölçekleme"
sözcüğünün iki anlamı — 70'in başlığındaki ölçekleme hesap değil dağıtım kararıdır; ayrım gövdede yazılır).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Rol oyunu ve simulakr (66), belirtim oyunu ve hile gizleme (61), düşünce zinciri sadakati (32), hile oranı
  (57) → 67.
- Savunma katmanları ve açık ağırlığın üç kapısı (63), dual-use ret sınırı (62), ajan saldırıları (58) → 68.
- Açık ağırlık ve lisans (20), kimin görüşü ve model belirtimi (66), anayasa (64), yasa bir belirtimdir (61) → 69.
- Kırmızı takım (63), ölçeklenebilir denetim (64), özerklik düzeyleri ve devir (59), görev ufku (40), ölçek
  yasaları (9) → 70.
- Kalibrasyon ve hakem güveni (65) → 67, 71, 73. Dalkavukluk değerlendirmesinin dağıtım kapısı olması (66) → 70.
- Hedef yanlış genellemesi ve içsel eniyileyici (61), sığ hizalama (62) → 67.

**Araştırılacak güncel akademik alanlar (67 için öncelikli):** aldatmanın tanımı ve taksonomisi (Park ve ark.
2024, Patterns — doğrulanmalı; Ward ve ark. NeurIPS 2023 "Honesty is the best policy" — doğrulanmalı), uyuyan
ajanlar ve aldatıcı hizalanma (Hubinger ve ark. 2024 Sleeper Agents — arXiv, hakemsiz birincil; Greenblatt ve ark.
2024 alignment faking — arXiv), bağlam içi entrika ve değerlendirme farkındalığı (Meinke ve ark. 2024 Apollo —
arXiv; Laine ve ark. 2024 Situational Awareness Dataset — NeurIPS 2024 D&B, doğrulanmalı; Berglund ve ark. 2023
out-of-context reasoning — arXiv; Scheurer ve ark. 2023 insider trading — arXiv), gizli bilgi ve yalan tespiti
(Burns ve ark. ICLR 2023 discovering latent knowledge; Marks & Tegmark COLM 2024 geometry of truth —
doğrulanmalı; Pacchiardi ve ark. ICLR 2024 lie detection — doğrulanmalı; Azaria & Mitchell 65'ten), düşünce
zinciri sadakati ve izleme (Turpin 66'dan; Chen ve ark. 2025 "reasoning models don't always say what they think"
— Anthropic, arXiv; Baker ve ark. 2025 61'den; Lanham ve ark. 2023 measuring faithfulness — arXiv), model yazımı
değerlendirmelerde durum farkındalığı ölçeği (Perez ve ark. 2023 66'dan), temsil mühendisliği (Zou ve ark. 2023
RepE — arXiv). **68 için:** Weidinger ve ark. FAccT 2022 (risk taksonomisi), Li ve ark. ICML 2024 WMDP ve RMU
unlearning (doğrulanmalı), Fang ve ark. 2024 (ajanlar bir günlük açıkları sömürür — arXiv), Zhang ve ark. Cybench
ICLR 2025 (doğrulanmalı), Mouton ve ark. RAND 2024 bio uplift raporu (hakemsiz), OpenAI 2024 bio çalışması
(hakemsiz), Anthropic/OpenAI/DeepMind sistem kartları (hakemsiz, birincil), Goldstein ve ark. 2023 etki
operasyonları (arXiv), Hazell 2023 oltalama (arXiv), Kapoor ve ark. ICML 2024 açık temel modellerin toplumsal
etkisi (position, doğrulanmalı), Sandbrink 2023 (arXiv), Bommasani ve ark. 2023 (arXiv). **69 için:** AB Yapay Zekâ
Yasası (2024/1689, Resmî Gazete), NIST AI RMF 1.0 (2023) ve üretken yapay zekâ profili (2024), ISO/IEC 42001:2023,
OECD ilkeleri (2019/2024), Bletchley (2023) ve Seul (2024) bildirgeleri, ABD 14110 sayılı kararname (2023;
2025'te geri alındı — tarihçe olarak), OSI'nin Açık Kaynak Yapay Zekâ Tanımı 1.0 (2024) — **69 koordinatı**;
akademik: Anderljung ve ark. 2023 frontier AI regulation (arXiv), Shevlane ve ark. 2023 model evaluation for
extreme risks (arXiv), Weidinger ve ark. 2023 sociotechnical evaluation (arXiv), Raji ve ark. AIES 2022 outsider
oversight, Casper ve ark. FAccT 2024 black-box audits (doğrulanmalı), Mökander ve ark. 2023 auditing LLMs (AI and
Ethics), Bommasani ve ark. 2023 Foundation Model Transparency Index (arXiv), Solaiman 2023 gradient of release
(FAccT 2023 — doğrulanmalı). **70 için:** Anthropic Responsible Scaling Policy (v1 2023, v2.x 2024–2025), OpenAI
Preparedness Framework (v1 2023, v2 2025), Google DeepMind Frontier Safety Framework (v1 2024, v2 2025) — üçü
hakemsiz birincil; METR 2024 "common elements of frontier AI safety policies", Karnofsky 2024 "if-then
commitments" (Carnegie), Frontier Model Forum belgeleri, Uluslararası Yapay Zekâ Güvenliği Raporu (Bengio ve ark.
2025), Phuong ve ark. 2024 dangerous capability evaluations (arXiv), Kinniment ve ark. 2023 METR (arXiv), Clymer ve
ark. 2024 ve Buhl ve ark. 2024 safety cases (arXiv), Kinniment/METR görev ufku (40'tan), Anderljung ve ark. 2023.
Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları SOZLESME
§9'dadır. Politika belgeleri için **kanal:** EUR-Lex (CELEX 32024R1689), NIST `doi.org/10.6028/NIST.AI.100-1`,
OSI `opensource.org/ai/open-source-ai-definition`; sağlayıcı çerçevelerinin **sürüm tarihi** künyeye yazılır
(belgeler değişiyor; erişim tarihi gerekir).

**Venue doğrulaması.** Batch 10–15'in on yedi kanalı sürüyor (Crossref API ve `query.title`, ACL Anthology,
DBLP `ee` 12 sn, PMLR GitHub aynası ve dizin ayrıştırması, COLM kabul listesi `curl -k` — Batch 15'te challenge
sayfası döndü, ICLR proceedings 2025/2026, arXiv API başlık araması, Semantic Scholar `openAccessPdf`,
`papers.nips.cc` yıl dizinleri, **Europe PMC `fullTextXML`** — Nature OA makalelerinin tam metni; **PMLR cilt
dizini** — DBLP 503 verince). Kural sürüyor: OpenReview ve PMLR kimlikleri **tahmin edilmez**; DBLP `ee` ya da
birincil dizin sayfası. `dblp-b15.py` `dblp-b14.json`'dan tohumlandı; yeniden çalıştırılınca yalnızca eksikleri
sorar. Batch 15'in kaynak metinleri `artifacts/b15-research/pdf/*.txt` ve `html/*.txt` altında; PDF'ler (254 MB)
ve PMLR/COLM dizin dökümleri build şişmesin diye silindi. Batch 11–14'ün `.txt` metinleri de yerinde. 67–70'te
politika belgeleri PDF/HTML olarak gelir; `fetch-html` betiğiyle `html/*.txt`'ye indirilir, EUR-Lex HTML
büyüktür (madde bazlı kırpılır).

**Görselleştirme ihtiyaçları (öngörü):**
- 67: aldatma taksonomisi (stratejik aldatma ↔ dalkavukluk ↔ uydurma; 66-Şekil 1 ve 65'in anlamsal
  entropisiyle köprü); uyuyan ajan kalıcılığı (güvenlik eğitimi öncesi/sonrası tetiklenen davranış oranı —
  hakemsiz kaynak, işaretle); değerlendirme farkındalığı ölçüm tablosu; düşünce zinciri sadakati ölçümü
  (Turpin'in −36,3'ü ile Chen ve ark.'nın ipucu anma oranı).
- 68: dual-use risk matrisi (alan × uplift × kanıt düzeyi); unlearning'in kırılganlığı (WMDP: RMU sonrası
  ince ayarla geri kazanım); açık ↔ kapalı yayımlama kapıları (63-Şekil 1'in "üretim kuralı ve ağırlık"
  satırının devamı).
- 69: düzenleyici çerçeve karşılaştırması (AB Yasası risk sınıfları ↔ NIST RMF ↔ ISO 42001 ↔ RSP tarzı
  gönüllü çerçeve); açık kaynak tanımının dört özgürlüğü ↔ model bileşenleri (ağırlık, kod, veri, belge —
  **69 koordinatı**).
- 70: üç sağlayıcı çerçevesinin eşik/kademe tablosu (ASL ↔ Preparedness ↔ FSF kritik yetenek düzeyleri);
  "if-then" taahhüt akışı (değerlendirme → eşik → önlem); Faz 7'nin kapanış haritası (61–70'in birbirine
  devirleri; 60-Şekil'in faz kapanış düzeninin geri çağrımı).

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 16` ve `readingOrder` 67'den
kesintisiz devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir (68 ve 70'in
başlıkları değişecekse entegrasyondan **önce**); YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim
defteri ve gerekiyorsa bağlayıcı olgu kararları güncellenir (69'un "ödendi" satırı ve 20'nin 68/70 taksitleri
dâhil); doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki run hazırlığıyla
güncellenir — 70 Faz 7'yi kapattığı için `+1` fazı Faz 8'in (71–80) kategori kararını ve 71'in prerequisite'lerini
de hazırlar. Dördü de `safety-and-evaluation` olacaksa okuma listesi öbeği yalnızca büyür; Batch 15'te 63–66 aynı
öbeğe girerken `reading-list-groups.test.ts` değişmedi (495 test), bu run'da da değişiklik beklenmez (test yine
de çalıştırılır).

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
frontmatter'a önce yer tutucu hash yazmak sorun değildir (Batch 13–15'te böyle girdi).
Roadmap başlığı frontmatter başlığıyla birebir eşleşmek zorundadır — başlık değiştiriliyorsa
roadmap.json entegrasyondan **önce** güncellenmelidir (58'de böyle yapıldı). **Entegrasyondan sonra
makale gövdesine her dokunuşta `sync-series-hashes.cjs --write` yeniden çalıştırılmalıdır** (SVG
değişikliği hash'i etkilemez; Batch 14'te 61-Şekil 3, Batch 15'te beş şekil entegrasyondan sonra düzeltildi, hash aynı kaldı; gövdeye dokunulursa yeniden çalıştırılır).
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
uyarılarını verir. **Yayın öncesi zorunlu taramalar (Batch 15'te hepsi çalıştı; mantığı `scan-b15.py`'de, scratchpad'de kaldı — yeniden yazılması beş dakikadır):** parantezli gloss listesi ↔
terim defteri; yasaklı biçimler (`gömme`, `korpus`, `geliştirme kümesi`, `niceleme`, `az/sıfır atışlı`);
kendi numarası (62'de "62'nin dersi" böyle yakalandı); ve **numaralı ileri gönderme** (Python: gövdede ≥ N+1
olan "K'de / K'te / K. makale" kalıpları — 66'dan büyük sayılar yüzde/puan/örnek sayısı/model boyutu olarak elle ayıklandı; "14,66'sı" gibi ondalıklar kendi-numarası taramasında yanlış pozitif verir).
Kendi hesabımızla verilen sayılar gövdede "kendi hesabımız" diye işaretlenir (karar #145).

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch
15'te build ve dev öncesinde 3000–3999 arası dinleyen port ve `node` süreci yoktu; yine de izole kopya
kullanıldı ve ana worktree'nin `.next` dizinine hiç dokunulmadı: `tar --exclude=./node_modules
--exclude=./.next --exclude=./.git --exclude=./artifacts --exclude=./.env.local -cf - . | (cd
/d/dev/anil-lib-b15-render && tar xf -)`, junction PowerShell ile `New-Item -ItemType Junction -Path
'D:\dev\anil-lib-b15-render\node_modules' -Target 'D:\dev\anil-lib\node_modules'`, kopyada `corepack pnpm
build` (exit 0; `/seri/[slug]` 66 yol), sonra kopyanın `.next`'i silinip `.claude/launch.json`'a geçici
yapılandırma (`anil-lib-seri-b15`: Git Bash **tam yolu** `C:\Users\<user>\AppData\Local\Programs\Git\bin\bash.exe`,
`-lc`, `export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-b15-render && exec corepack pnpm dev -p 3210`).
**launch.json'ı Bash heredoc ile yazma:** `\\` çiftleri tek `\`'a indi ve dosya geçersiz JSON oldu (Batch
15'te tekrar); Python `json.dumps` ile ya da Write aracıyla yaz. Kopyada `.env.local` olmadığı için kapı
kendiliğinden kapalı. `typecheck` ve `test` ana worktree'de çalıştırıldı. Entegrasyondan sonra düzeltilen bir
SVG kopyaya `cp` ile taşınmalı ve **`diff -rq content/series/assets <kopya>/content/series/assets` ile
doğrulanmalı** (Batch 15'te `&&` zinciri bir assert'te kırılınca üç düzeltme kopyaya gitmedi ve ilk yeniden
çekim eski şekilleri gösterdi). Temizlik: **önce** `preview_stop`, sonra junction'ı kaldır (`cmd /c rmdir`
junction yoluna — içeriği takip etmez; ardından ana `node_modules`'ın yerinde olduğu doğrulanır: 40 giriş,
`node_modules/next/package.json`), sonra kopyayı sil; launch.json özgün hâline döndürüldü
(`artifacts/b15-research/launch.json.orig` yedeği). Kural değişmedi: **ana worktree'de `.next` silme, `pnpm
build` ya da `next dev` başlatmadan önce `netstat` ve `tasklist` ile o an paralel süreç var mı bak; varsa karşı
oturuma haber ver ve izole kopyayı kullan.** Bash aracında `cd` bir komuttan sonrakine taşınır — her komut `cd
/d/dev/anil-lib;` ile başlar; Python Windows'ta `/d/dev/...` yolunu tanımaz (`D:/...` verilir) ve konsola Türkçe
basarken `sys.stdout.reconfigure(encoding='utf-8')` ya da `PYTHONIOENCODING=utf-8` ister.

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un bulgusu sürüyor.** Batch 15'te build'den önce
`artifacts/b15-research/pdf/*.pdf` (115 dosya, 254 MB) ve `html/pmlr267_index.html` (3,6 MB) ile
`html/colm2024_accepted.html` silindi; `.txt` metinleri, `dblp-b15.*`, `fetch-b15-report.json`, `html/*.txt`,
`sweep-b15.py`, `measure-b15.js`, `shots-b15.cjs`, `shots/*.png` (26 şekil görüntüsü, ~3 MB),
`launch.json.orig` ve loglar kaldı (18 MB).

**Render doğrulama seti (Batch 15'te kullanılan).** Rota sweep'i Python `urllib` ile (67 rota, 40,5 sn;
`artifacts/b15-research/sweep-b15.py`), tarayıcı gezintisinden **önce**. Tarayıcı panosundan **elle**:
`resize_window` ile 1440/768/375, tema `documentElement.classList` üzerinde `dark`/`sepia` değiştirilerek, ölçüm
fonksiyonu `localStorage`'a yazılıp `eval(localStorage.getItem('b15m'))()` ile çağrıldı (kaynağı
`artifacts/b15-research/measure-b15.js`; bir `browser_batch` en çok 25 eylem alır — üç tema tek `javascript_tool`
çağrısında birleştirilebilir); geçerli dolgu kümesi (`badFills`), `getBBox` ile viewBox içi kalma (`outOfBox`),
`scrollWidth > clientWidth`, figure/svg/figcaption sayıları, `main.innerText` içinde `undefined`/`NaN`. Dört
makale × üç genişlik × üç tema: taşma 0, badFills ve outOfBox boş, sızıntı yok, `figScroll` false. **Şekil
görüntüleri panodan değil Playwright'tan alındı:** panonun `screenshot`'ı toplu batch'te "Image omitted", tek
çağrıda 5 sn zaman aşımı ya da 1500×600 emülasyonun 800×323'lük kırpık bir köşesini döndürdü (Batch 14'ün "iki
kez çağır" tarifi bu run'da yetmedi). `artifacts/b15-research/shots-b15.cjs` (`@playwright/test`'in Chromium'u —
`playwright` paketi tek başına yüklü değil; `page.goto` **`waitUntil: 'load'`** + `main figure svg` bekleme —
`networkidle` reader-sync 503 döngüsü yüzünden hiç yerleşmez; `#b15o` sabit kaplayıcıda şeklin 1200 px klonu,
`documentElement.classList` ile light/dark, `element.screenshot`) 13 şekli 26 PNG olarak `shots/` altına yazdı;
PNG'ler Read aracıyla incelendi. Bu yol panodan hızlı, büyük (1240 px) ve deterministik; **sonraki run'larda
varsayılan**. Beş kusur yalnızca görüntüde çıktı (65-Şekil 3 panel taşması, 66-Şekil 2 sütun taşması,
64-Şekil 1 kutu sığmazlığı, 64-Şekil 2 yapışık başlıklar, 65-Şekil 1 köşegen etiketi), düzeltilip yeniden
çekildi; kurallar YOL-HARITASI Batch 15 öğrenme notlarında.

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
  görünür (27–28, 29, 30–40, 41–60); `safety-and-evaluation` 61–66 tek öbek. Kasıtlıdır (kararlar #65,
  #107, #142, #148); `reading-list-groups.test.ts` tam olarak bu durumu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) bulunuyor ve ayrı bir üretim hattıyla
  ilerliyor; AI serisinin araçları bu dizine dokunmaz. Build iki seriyi birden derler; sayfa sayısı
  ikisinin toplamıdır (Batch 15 sonunda 115).
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor. Dördü git'te **izleniyor**
  (`Karar`, `her`, `Yaşayan`, `yapılırsa`); biri izlenmiyor (`**zorundadır**.` — `*` görünümlü
  karakter U+F02A). Build'i etkilemiyor. Temizlik AI serisinin kapsamı dışıdır; sahibinin kararı.
- Batch 12–14'ün üretimi (51–62) kullanıcı tarafından commit edildi (5 Eylül 2026). Batch 15'in üretimi
  (63–66, catalog/roadmap/YOL-HARITASI/HANDOFF/.wolf değişiklikleri, `artifacts/b15-research/`) çalışma
  ağacında **commit edilmemiş** duruyor; commit/push kullanıcı kararıdır (SOZLESME kapsamı dışı).
- Tarayıcı panosunun `screenshot`'ı bu ortamda güvenilmez (yukarıda); DOM ölçümü panoda, şekil görüntüsü
  Playwright'ta yapılır.

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
