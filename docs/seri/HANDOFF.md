# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-05 · Durum: **1–58 yayında (kohort Batch 0 → Batch 13) · Faz 6'nın 51–58'i yayında · Sıradaki: 59**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 58 — `ajan-guvenligi-istem-enjeksiyonu-ve-kum-havuzu` |
| Sıradaki güvenli başlangıç | Makale 59 ("İnsan-Ajan İşbirliği: Denetim ve Devir"), Faz 6'nın dokuzuncu makalesi; run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 59, 60 ve Faz 7'nin 61, 62'si üretilir |
| Sıradaki kohort | `classification_batch: 14` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–58 `agents-and-retrieval` (bağlayıcı kararlar #50, #65, #85, #98, #107, #122, #128 ve #135). Faz 6'nın kalanı (59–60) için varsayılan devamlılık `agents-and-retrieval`; Faz 7 (61–70) için kontrollü sözlükte `safety-and-evaluation` var, kategori kararı 61'in run'ında verilir ve karar defterine yazılır |

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları İngilizce
  alan terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning
  ve Test-Time Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim
  defterine göre Türkçeleştiriliyor (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135).
  Katmanın tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler.** Faz 6'nın kalan iki başlığı Türkçe (59 "İnsan-Ajan
  İşbirliği: Denetim ve Devir", 60 "Ajan Ekonomisi: Maliyet, Gecikme, Güvenilirlik"). Faz 7'de 63
  "Jailbreak ve Kırmızı Takım" ("jailbreak" alanda Türkçeleştirilmiyor; 58'de "sohbet için yazılmış basit
  bir kalıp" diye betimlendi, terim kurulmadı — 63'ün run'ında karar #108 ölçütüyle karara bağlanır),
  64 "Constitutional AI ve Ölçeklenebilir Denetim" ("Constitutional AI" özel ad), 70 "Sorumlu Ölçekleme:
  Frontier Güvenlik Çerçeveleri" ("frontier" → 70'in run'ında). Başlık değişecekse `roadmap.json`
  entegrasyondan **önce** güncellenir.
- **58'in başlık borcu kapandı** (karar #135: "İstem Enjeksiyonu ve Kum Havuzu"; "kum havuzu" 58'de
  tanımlandı ve terim defterine girdi).
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 13 **hiç koordinat açmadı ve kapatmadı**; taslak 58'de "63'te göreceğimiz"
  biçiminde kaçan bir numaralı gönderme yayından önce "güvenlik fazında" yapıldı. Sıradaki run'ın
  doğrudan ödeyeceği bir vaat **yoktur**; defterde açık kalan en yakın tekil koordinat **64**'tür (13'ten
  gelen "ilkelere dayalı tercih etiketleri"), ondan sonra 61–70 bandı ve 72. Numarasız işaretler:
  58 → 59 (onay ne zaman istenir, insana devir, iz denetimi, kalibrasyon devir ölçüsü olabilir mi — 16 ve
  50'nin kalibrasyon işareti 59'a taşındı), 55 → 59 (insan hızlanması ölçüme bağlı; METR RCT), 51 → 60
  (maliyet ölçüsü), 55 → 60 (dolar/görev), 57 → 60 (Pareto sınırı; adım ve dolar), 53 → 60 (fatura tur ×
  pencere; lojistik eğri), 47 → 60 (araç tanımının token bedeli — 56 ve 58'de tahsil edilmedi), 49 → 60
  (MCP üçlüsü), 58 → güvenlik fazı (modelin kendi reddi → 62/63; gradyanla eniyilenmiş saldırı → 63,
  numarasız), 57 → 63/67 (kısayol ve hile), 55/57 → 72 (sızıntı, kirlilik), 57 → 101 (koşu sayısı, hata
  payı), 56 → 112 (bellek ürünleri), 53 → 64 (tartışma denetim için), 52/56 → 65 (öz-yansıma ↔ hakem;
  sorgu yeniden yazma), 46 → 65 (etkin getirme).
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR hâlâ uygulanmadı; tam
  listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(8) önceki batch'lerden (kararlar #21, #97,
  #104, #106, #114, #120, #127, #134). (9) **Batch 13:** ACM `doi.org` bağlantıları (Greshake AISec 2023,
  SecAlign CCS 2025, AutoCodeRover ISSTA 2024, Qi ISSTA 2015, Agentless FSE 2025, SWE-Bench+ AIware
  2026, Ziegler CACM 2024) bot'a 403 döner, künyeler Crossref/DBLP ile doğrulandı, okuyucuda açılır;
  IEEE `doi.org` (Saltzer–Schroeder 1975, GenProg TSE 2012, RepairAgent ICSE 2025) 202/200; R2E-Gym
  COLM 2025 kabul listesiyle doğrulandı, bağlantı arXiv (COLM'un OpenReview kimliği alınamadı); OpenAI'ın
  SWE-bench Verified blog sayfası 403 döndüğü için **kaynak olarak kullanılmadı**, Verified kümesi Yang ve
  ark. (NeurIPS 2025) tanımıyla anlatıldı; PMLR 267 kimlikleri dizin sayfasından ayrıştırıldı (karar #141).
- **Hakemsiz kaynak listesi Batch 13'te yedi kalem büyüdü — işaretlenerek** (karar #141; karar #6'nın
  listesi bu run'da güncellendi): Peng ve ark. 2023, Becker ve ark. 2025 (METR), Packer ve ark. 2023
  (MemGPT), Barres ve ark. 2025 (τ²-bench), Debenedetti ve ark. 2025 (CaMeL), Beurer-Kellner ve ark. 2025,
  Anthropic Claude Code belgelendirmesi (2026).

## Next batch preparation — 59'dan devam (Faz 6'nın kapanışı, Faz 7'nin açılışı)

**Pedagojik hedefler.** Batch 13'ün sonunda okuyucu şunu biliyor: kod ajanının dünyası bir depo, gözlemi
test çıktısı, eylemi düzenlemedir; bulmak yarı iştir; döngü ile sabit hattın sırası modele bağlıdır ve puan
maliyetin yanına yazılır; makul yama doğru yama değildir, test davranışın örneklemidir, testleri geçen
yamaların üçte biri sızmış çözümden gelir; döngü test etiketli izlerle ağırlıklara yazılır; insan hızlanması
ölçüme bağlıdır (55). Bellek bir depo değil kararların toplamıdır: pencere bir bütçe, atma bir karar
(kesme / özet / modelin yönettiği sayfalama / iç durum); olaysal, anlamsal ve yordamsal bellek üç ayrı iş
ister; getirme dört yetenekten yalnızca doğru getirmeyi verir; seçici unutmada herkes zayıftır; ticari bellek
ürünleri belleksiz tam bağlamın gerisindedir (56). Bölümün sonu durum, çıktı ya da hakemle puanlanır ve
hiçbiri öbürünün yerine geçmez; iz bitiş sınıfı, ilerleme ve pass^k ile ölçülür; tek koşu iki cetveli de
vermez; insanla kıyas zaman bütçesine, maliyetle kıyas Pareto sınırına bağlıdır; kısayol modelin değil
cetvelin özelliğidir ve imkânsız testle ölçülür (57). Okunan her şey talimat olabilir; saldırı ve yarar
birlikte ölçülür; istem katı yarıya indirir, eğitim katı sıfıra yaklaştırır, hiçbiri kaldırmaz; tanımak eğilim,
sınırlamak mimaridir; kum havuzu üç katmanla eylemi sınırlar, veriyi sınırlamaz (58). 58'in kapanışı 59'a
devretti: onay ne zaman istenmeli, ajan ne zaman durup insana devretmeli, insan izi nasıl denetler,
kalibrasyon devir kararının ölçüsü olabilir mi?

**Sıradaki makaleler ve prerequisite'ler.** 59 ← 58 (geri alınamaz eylemde onay; kum havuzu dışı istem;
alan adı izni; her eylemde onay = özerkliği geri almak), 51 (özerklik: döngüyü kim kapatır; durmak bir
eylemdir; "yapılamaz" ilanı 54,9), 57 (koşu sayısı; iz denetimi; TheAgentCompany "erken bırakmak ucuz";
hakem ajan ↔ insan uzlaşısı), 55 (METR RCT: uzman kendi deposunda yavaşlıyor, öneri kabulü < %44, zamanın
%9'u gözden geçirme; Peng: acemide hızlanma), 54 (insan–ajan uçurumu; durma izni iki hata sınıfı açar),
53 (Khan ve ark.: bilgisi olmayan hakem, tartışmayla denetim → 64'e de bakar), 35 (öz-düzeltme dış geri
bildirim ister; insan geri bildirimi), 16 ve 50 (kalibrasyon; güvenilirlik etiketi), 40 (görev ufku ↔
insanın süresi), 24 (sistem istemine kısıt yazmak). 60 ← 51 (Kapoor: puan çağrı sayısıyla), 55 (dolar/görev
tablosu; 0,13 ↔ 3,34 $), 57 (Pareto sınırı; adım ve dolar; HAL: akıl yürütme çabası kazanç garantisi
değil), 56 (A-Mem: soru başına 16.910 ↔ 2.520 token; MEM1 tepe token), 53 (fatura tur × pencere;
lojistik eğri), 47 (girdi token'ı %95,9; araç tanımı bedeli; paralel çağrı 3,37–6,73 kat), 28 (gecikme
muhasebesi: ilk token, token başına süre; sürekli yığınlama), 26 (anahtar-değer önbelleği: önek
paylaşımı), 49 (belirlenimci araç sırası = önbellek), 33 (çıkarım hesabı doygunluğu), 40 (güvenilirlik
bedeli: %50 ↔ %80 ufku). Faz 7'ye geçilirse: 61 ← 11 (hizalanmamış; hizalama vergisi), 12–13 (post-training
haritası; ödül modeli; aşırı optimizasyon), 6 (çeviri "hizalaması" ile ayrım — terim defteri uyarısı), 51
(özerklik), 57 (hile oranı, ölçüt hedefe dönüşünce), 58 (ajan kendisine karşı da kum havuzu; AgentHarm
uyumu); 62 ← 11 (yardımseverlik ↔ zararsızlık gerilimi, 13 → 62 işareti), 13 (tercih optimizasyonu), 58
(AgentHarm: ret oranı ↔ zarar puanı; kalıp saldırısı 85,2 → 16,7 ret), 24 (hiyerarşi eğitiminin bedeli:
zararsız isteğe uyma 83,1 → 60,4), 45 (hakem model). Kaç makale üretileceği bu run'ın `BATCH`
assignment'ıyla belirlenir; Faz 7'nin kategorisi (`safety-and-evaluation`) 61'in run'ında karar
defterine yazılır.

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Özerklik ve durma kararı (51), onay ilkesi (49, 58), erken bırakma (57) → 59.
- Kalibrasyon (16, 50), güvenilirlik etiketi (50), hakem uyumu (54, 57) → 59, 65.
- Kapoor ilkesi (51), dolar/görev (55), Pareto ve HAL (57), token bedeli (47, 53, 56) → 60.
- Gecikme muhasebesi ve önek paylaşımı (26, 28), belirlenimci araç sırası (49) → 60.
- Hizalama sözcüğünün iki anlamı (6 ↔ 11), hizalama vergisi (11), aşırı optimizasyon (13) → 61.
- Yardımseverlik ↔ zararsızlık (11, 13), hiyerarşi eğitiminin bedeli (24), AgentHarm (58) → 62.
- Kısayol ve hile oranı (57), kum havuzu (58) → 63, 67, 70.
- Tartışma ile denetim (53), ilkelere dayalı etiket vaadi (13 → 64) → 64.

**Araştırılacak güncel akademik alanlar (59 için öncelikli):** insan–yapay zekâ tamamlayıcılığı ve devir
(learning to defer / rejection learning: Mozannar & Sontag ICML 2020; Madras ve ark. NeurIPS 2018),
insan–yapay zekâ takımlarının bütünün parçalarını geçip geçmediği (Bansal ve ark. CHI 2021; Lai ve ark.
FAccT 2023 derlemesi — doğrulanmalı), açıklamaların insan kararına etkisi, ajanların soru sorması ve
belirsizlikte durması (netleştirme sorusu çalışmaları — ACL/EMNLP 2024–2025, doğrulanmalı; "Ask-the-user"
kalıbı 58'deki hakemsiz derlemeden), onay istemlerinin ölçülmesi (AgentDojo'nun onaysız düzeni; Claude
Code izin kipleri — hakemsiz), denetim için iz okuma (HAL'in iz denetimi, 57), otomasyon yanlılığı ve
güven kalibrasyonu literatürü (Parasuraman & Riley 1997 — klasik; Zhang ve ark. FAT* 2020), METR
zaman-ufku ve RCT (40, 55'ten devir; hakemsiz olanlar işaretlenir). **60 için:** ajan servis sistemleri
(Parrot OSDI 2024; Autellix 2025 — venue doğrulanmalı), istem önbellekleme belgelendirmesi (hakemsiz),
ajan maliyet-doğruluk çalışmaları (Kapoor TMLR 2025; HAL ICLR 2026; TheAgentCompany maliyet sütunu),
güvenilirlik mühendisliği (pass^k, yeniden deneme bütçesi, zaman aşımı), gecikme kaynakları (28'in
ölçüleri ajan turlarında). Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz
denetlenir; süreç kuralları SOZLESME §9'dadır.

**Venue doğrulaması.** Batch 10–12'nin dokuz kanalı sürüyor (Crossref API, ACL Anthology, DBLP `ee` 12 sn,
PMLR GitHub aynası, COLM kabul listesi `curl -k`, ICLR proceedings, arXiv API başlık araması). Batch 13
dört kanal ekledi/güncelledi: (10) **Crossref `query.title`** yayın sürümünün başlığını ve mecrasını verir
(Agentless: "Demystifying LLM-Based Software Engineering Agents", PACMSE 2(FSE) 801–824; SWE-Bench+:
AIware 2026); (11) **`proceedings.iclr.cc/paper_files/paper/2026`** DBLP'de henüz olmayan ICLR 2026
bildirilerinin birincil sayfası (MemoryAgentBench, MEM1, HAL, ImpossibleBench; 2025 sayfası
Learn-by-interact); (12) **COLM** kökü `colm.cc`'ye taşındı, `colmweb.org/2025/AcceptedPapers.html`
hâlâ yayında (R2E-Gym başlığı oradan); (13) **PMLR dizin sayfası** `<p class="title">` bloğu regex ile
ayrıştırılıp başlıktan sonraki ilk `abs` bağlantısı alınır — "başlığa en yakın önceki href" sezgisi
yanlış kimlik verdi (pan25f), tahmin de yanlıştı (pan25c), doğrusu pan25g. Kural sürüyor: OpenReview ve
PMLR kimlikleri **tahmin edilmez**; DBLP `ee` ya da birincil dizin sayfası. DBLP 500/503 döndüğünde
`dblp-b13.py` yeniden çalıştırılınca yalnızca eksikleri sorar (json'a kaydeder). Batch 13'ün 72 kaynak
metni `artifacts/b13-research/pdf/*.txt` altında duruyor; PDF'ler build şişmesin diye silindi. Batch
11–12'nin `.txt` metinleri de yerinde (AWM, ExpeL, CoALA, SWE-agent, τ-bench oradan okundu).

**Görselleştirme ihtiyaçları (öngörü):**
- 59: özerklik ekseni — hiç onay ↔ her eylemde onay; her noktada saldırı yüzeyi (58) ve iş yükü; devir
  kararının kalibrasyon eğrisi (16-Şekil'in geri çağrımı; ölçülmüş veri bulunursa).
- 59: insan–ajan iş bölümü tablosu — kim başlatır, kim doğrular, kim durdurur; TheAgentCompany ve METR
  sayılarıyla.
- 60: aynı görevde tur × pencere faturası (53'ün çarpımı; 47'nin %95,9 girdi payı; 56'nın 16.910 ↔ 2.520
  token'ı) — tek bütçenin dağılımı (`hesap-takasi.svg` ölçüsünde).
- 60: Pareto sınırı — 55-Şekil 2 ve 57-Şekil 2'nin birleşik geri çağrımı, HAL'in çok ölçütlü düzeniyle.

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 14` ve `readingOrder` 59'dan
kesintisiz devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir;
YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve gerekiyorsa bağlayıcı olgu
kararları güncellenir; doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki
run hazırlığıyla güncellenir. Faz 7'ye geçiliyorsa 61'in kategorisi (`safety-and-evaluation`) ve
`reading-list-groups.test.ts`'in öbek beklentisi birlikte gözden geçirilir (yeni kategori öbeği
test değişikliği gerektirebilir).

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
frontmatter'a önce yer tutucu hash yazmak sorun değildir (Batch 13'te dört makale de böyle girdi).
Roadmap başlığı frontmatter başlığıyla birebir eşleşmek zorundadır — başlık değiştiriliyorsa
roadmap.json entegrasyondan **önce** güncellenmelidir (58'de böyle yapıldı). **Entegrasyondan sonra
makale gövdesine her dokunuşta `sync-series-hashes.cjs --write` yeniden çalıştırılmalıdır.** Araçların
üçü de varsayılan olarak **yalnızca AI serisini** işler (`--series=boun` ayrı seri içindir).
`check-series-svg.cjs` XML ayrıştırmaz ve `var(` parantezinin kapanmadığı dolguyu görmez: her yeni SVG
ayrıca `python -c "import xml.etree.ElementTree as ET; ET.parse(f)"` ile ayrıştırılır **ve**
`grep -c 'var(--[a-z-]*"' content/series/assets/*/*.svg` ile taranır. Denetleyicinin taşma tahmini
(karakter × 7,15) `text-anchor="middle"` metinde x ± genişlik/2 alır: 210 birimlik kutuya ortalanmış
alt satır ≤ 28 karakter, gösterge etiketi x ≤ 500'den başlar; 13 birimde x=20'den alt not ~97 karakter
alır (Batch 13'te üç taşma böyle yakalandı ve kısaltıldı; alt metinler SVG'ye göre yeniden eşlendi).
Denetleyici "Şekil N metinde referanslanmamış" ve "şekil numarası N, beklenen M" uyarılarını verir.
**Yayın öncesi zorunlu taramalar (Batch 13'te hepsi çalıştı):** parantezli gloss listesi ↔ terim defteri;
yasaklı biçimler (`gömme`, `korpus`, `geliştirme kümesi`, `niceleme`, `az/sıfır atışlı`); kendi numarası;
ve **numaralı ileri gönderme** (Python: gövdede ≥ N+1 olan "K'de / K'te / K. makale" kalıpları — 58'de
"63'te göreceğimiz" böyle yakalandı ve konu adına çevrildi).

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch
13'te run başında ve build/dev öncesinde 3000–3999 arası dinleyen port yoktu; yine de izole kopya
kullanıldı ve ana worktree'nin `.next` dizinine hiç dokunulmadı: `tar -c --exclude=./node_modules
--exclude=./.next --exclude=./.git --exclude=./artifacts --exclude=./.env.local --exclude=./test-results
--exclude=./playwright-report . | tar -x -C /d/dev/anil-lib-b13-render` (8,0 MB), junction PowerShell ile
`New-Item -ItemType Junction -Path 'D:\dev\anil-lib-b13-render\node_modules' -Target
'D:\dev\anil-lib\node_modules'`, kopyada `corepack pnpm build` (107 sayfa, exit 0), sonra kopyanın
`.next`'i silinip `.claude/launch.json`'a geçici yapılandırma (`anil-lib-seri-b13`: Git Bash **tam yolu**
`C:\Users\<user>\AppData\Local\Programs\Git\bin\bash.exe`, `-lc`, `export PATH="/usr/bin:$PATH"; cd
/d/dev/anil-lib-b13-render && exec corepack pnpm dev -p 3210`; Write aracıyla yazıldı), kopyada
`.env.local` olmadığı için kapı kendiliğinden kapalı. `typecheck` ve `test` ana worktree'de çalıştırıldı.
Temizlik: **önce** `preview_stop`, sonra junction'ı kaldır (`cmd //c rmdir` ya da PowerShell
`Remove-Item` junction yoluna — içeriği takip etmez), sonra kopyayı sil; launch.json özgün hâline
döndürüldü (`artifacts/b13-research/launch.json.orig` yedeği). Kural değişmedi: **ana worktree'de
`.next` silme, `pnpm build` ya da `next dev` başlatmadan önce `netstat` ve `tasklist` ile o an paralel
süreç var mı bak; varsa karşı oturuma haber ver ve izole kopyayı kullan.** Bash aracında `cd` bir
komuttan sonrakine taşınır — her komut `cd /d/dev/anil-lib;` ile başlar; Python Windows'ta `/d/dev/...`
yolunu tanımaz (`D:\...` verilir).

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un bulgusu sürüyor.** Batch 13 sonunda
`artifacts/b13-research/pdf/*.pdf` silindi; `.txt` metinleri, `dblp-b13.*`, `fetch-b13-report.json`,
`html/*.txt` (Claude Code belgelendirmesi), `sweep-b13.py`, `measure-b13.js` ve loglar kaldı; büyük
HTML dökümleri (`html/*.html`) silindi.

**Render doğrulama seti (Batch 13'te kullanılan).** Rota sweep'i Python `urllib` ile (59 rota, 48,5 sn;
`artifacts/b13-research/sweep-b13.py`), tarayıcı gezintisinden **önce** (dev sunucusunda bu sırada bir
`[Error: aborted]` günlüğe düştü — bilinen yarış, sayfa hatası değil). Tarayıcı panosundan **elle**:
`resize_window` ile 1440/768/375, tema `documentElement.classList` üzerinde `dark`/`sepia`
değiştirilerek, ölçüm fonksiyonu `localStorage`'a yazılıp `eval(localStorage.getItem('b13m'))()` ile
çağrıldı (kaynağı `artifacts/b13-research/measure-b13.js`); geçerli dolgu kümesi token'ları bir prob
`span`'a `color: var(--x)` verip çözerek kuruldu (`badFills`), `getBBox` ile viewBox içi kalma
(`outOfBox`), `scrollWidth > clientWidth`, figure/svg/figcaption sayıları, `main.innerText` içinde
`undefined`/`NaN`, h2/tablo/kutu sayıları. Bir batch içinde `resize_window` + üç tema JS çağrısı
sorunsuz (25 eylem sınırı var; makale başına bir batch). Dört makale × üç genişlik × üç tema: taşma 0,
badFills ve outOfBox boş, sızıntı yok, `figScroll` false. Şekil ekran görüntüleri: `resize_window`
**800×640**, şekli `position:fixed` bir kaplayıcıya iki kez klonlayıp ikinci kopyaya koyu tema
token'larını inline `style.setProperty` ile vermek (`b13fig(i, mode)` yardımcısı `localStorage`'da; koyu
ve açık değerler `documentElement` sınıfı geçici değiştirilip okunur ve sonra geri konur — ilk sürüm
sayfa koyuyken iki kopyayı da koyu çizdi); görüntü **`browser_batch` dışında** tek çağrıyla alınır;
`screenshot` zaman aşımına düşerse `zoom` (bölge kırpmıyor) tam ekran görüntüsünü döndürür — bu run'da
batch içindeki `zoom` da zaman aşımına düştü. 500 ve 470 birim yüksekliğindeki iki şekil (56-3, 58-2)
tek temayla ayrı ayrı görüldü. 12 şeklin tamamı light/dark görüldü; gözle bulunan kusur yok.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki render
  betikleri de lint kapsamındadır; bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor. Batch 12 ve
  13 ölçümünde `figScroll` 375'te false — regresyon değil.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` durumunu yakalar; alt kenara çok yakın
  bir metin tabanı denetimden geçer. Batch 7–13'ün yeni şekillerinde alt pay ≥ 14 birim; yayımlanmış
  eski şekillerin bir kısmında bu pay hâlâ küçüktür. Kutu içine binen etiketleri ve kapanmamış `var(`
  parantezini de görmez (yukarıdaki iki ek tarama bunun için).
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde
  görünür (27–28, 29, 30–40, 41–58). Kasıtlıdır (kararlar #65, #107); `reading-list-groups.test.ts`
  tam olarak bu durumu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) bulunuyor ve ayrı bir üretim hattıyla
  ilerliyor; AI serisinin araçları bu dizine dokunmaz. Build iki seriyi birden derler; sayfa sayısı
  ikisinin toplamıdır (Batch 13 sonunda 107).
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor. Dördü git'te **izleniyor**
  (`Karar`, `her`, `Yaşayan`, `yapılırsa`); biri izlenmiyor (`**zorundadır**.` — `*` görünümlü
  karakter U+F02A). Build'i etkilemiyor. Temizlik AI serisinin kapsamı dışıdır; sahibinin kararı.
- Batch 12 ve 13'ün üretimi (51–58, catalog/roadmap/YOL-HARITASI/HANDOFF değişiklikleri) çalışma
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
- Batch 0/1'in ham üretim kayıtları `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv** olarak
  durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
