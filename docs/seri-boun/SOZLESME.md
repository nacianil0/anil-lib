# "Mülakat Aynası: Boğaziçi CmpE" — Seri Sözleşmesi

> **Bu dosya BOUN serisinin kalıcı normatif sözleşmesidir.** Yeni bir oturum seriye devam etmeden
> önce bu dosyayı, `docs/seri-boun/HANDOFF.md`'yi ve yol haritasının ilgili bölümlerini okumak
> **zorundadır**. Sözleşme ancak kullanıcının açık talebiyle değiştirilebilir; değişiklik yapılırsa
> sonuna tarihli bir değişiklik notu eklenir.

Sürüm: 1.1 · Oluşturma: 2026-08-28 · Son revizyon: 2026-09-03 · Kapsam: serinin bütün yaşam döngüsü

---

## 1. Seri kimliği ve amaç

- Seri adı (çalışma adı): **"Mülakat Aynası: Boğaziçi CmpE"** — Boğaziçi Üniversitesi Computer
  Engineering M.Sc. **scientific interview** bağlamında unutulmuş CS/CmpE temellerini yeniden
  kuran hazırlık serisi.
- Hedef: adayın (a) kavramı açık ve teknik biçimde **anlatabilmesi**, (b) küçük problem
  **çözebilmesi**, (c) gerektiğinde formal tanım veya kısa ispat **kurabilmesi**, (d) correctness,
  complexity, memory, concurrency ve sistem trade-off'larını **savunabilmesi**, (e) takip
  sorularına **dayanabilmesi**.
- Bu seri "kesin çıkacak sorular" ezberi veya bütün lisans müfredatının tekrarı **değildir**.
  Resmî mülakat tanımı ve Scientific Preparation dersleri güçlü sinyaldir fakat üniversitenin
  ilan ettiği bir soru formatı yoktur; seri bunu hiçbir yerde ima etmez (kanıt defteri:
  `docs/seri-boun/ARASTIRMA.md`).
- **AI serisiyle sınır:** BOUN, graph/probability/algorithms/systems konularını temel CS amacıyla
  ve kendi içinde yeterli biçimde öğretir; model/training/interpretability/agents/AI-systems
  derinliği "Sıfırdan Yüze: Yapay Zekâ" serisinin sahasıdır. BOUN, AI serisini **prerequisite
  yapmaz**; iki tarafta da bağımsız öğrenme tamamlandıktan sonra yararlı çapraz referans
  eklenebilir. Roadmap, katalog, state ve handoff zincirleri tamamen ayrıdır.

## 2. Editoryal kurallar

- Dil: Türkçe; teknik terimler ilk geçtiği yerde Türkçe karşılığı + orijinal İngilizcesiyle
  verilir, sonra seri boyunca aynı biçim kullanılır (terim defteri: YOL-HARITASI §Terimler).
  Mülakat İngilizce yürüyeceği için kritik terimlerin **İngilizce telaffuz edilebilir hâli**
  her makalede görünür kalır.
- Ton: ciddi ama destekleyici; okuyucuya "sen" diye hitap edilir; sınav kaygısı sömürüsü ve
  "garanti" vaadi yasak.
- Yapı: H1 yok (başlık frontmatter'da; gövde H2 ile başlar). Uzunluk hedefi 1.800–3.200 kelime;
  problem/ispat ağırlıklı makalede kelime sayısından çok çözüm adımlarının eksiksizliği esastır.
- İçerik türleri (içerik uygunsa, mekanik şablon olmadan): worked example, kısa ispat, küçük
  algoritmik problem, pseudocode/kod parçası, karşılaştırma tablosu, diyagram ve **sözlü
  checkpoint**. Pseudocode dil bağımsız tutulur; kod gerekirse C veya dil-nötr sözde kod.
- Zorunlu bölümler: giriş köprüsü, gövde, "## Mülakatta nasıl görünür" (takip zinciri, sık
  hatalar ve İngilizce karşılıklar listesi), "### Sırada ne var", "## Kaynakça".
- **Gönderme biçimi:** Önceki makalelere **konu adıyla** gönderme yapılır ("hash makalesinde",
  "tümevarım makalesinde"), numarayla değil; seri numaraları yalnızca yol haritasında ve 1.
  makalenin faz haritasında geçer. Böylece yayımlanmış metin, ileride araya makale girse bile
  bozulmaz ve numaralı ileri vaat açılmaz.
- **İngilizce karşılıklar bloğu:** "Mülakatta nasıl görünür" bölümü, makalenin çekirdek
  terimlerinin İngilizcelerini tek satırlık bir listeyle kapatır; liste yalnızca o makalede
  kurulan terimleri içerir.
- **Terim çakışması yasağı:** Aynı makalede iki farklı kavram aynı Türkçe sözcüğü ya da aynı
  kökten türemiş sıfatı paylaşamaz ("koşullu önerme" varken "contingency" için "koşullu
  doğruluktaki önerme" değil "olumsal önerme"; *stack* için "yığın" varken *heap* İngilizce
  kalır). Çakışma kaçınılmazsa ayrım metinde açıkça adlandırılır.
- **Kalıp yasağı:** AI sözleşmesi §2'deki kalıp yasağı burada da geçerlidir; "Sesli anlat"
  kutusu ve "Mülakatta nasıl görünür" bölümü bilinçli araçlardır, onların dışında tekrar eden
  etiket ya da geçiş cümlesi kurulmaz.
- Yasaklar: doldurma, kaynaksız iddia, TODO/placeholder, emoji, uydurulmuş "çıkmış soru".

## 3. Pedagojik kurallar (sözlü mülakat odaklı)

AI serisinin kanıta dayalı ilkeleri (prerequisite zinciri, spaced recall, retrieval practice,
worked examples, cognitive load, scaffolding/fading, analoji disiplini — bkz.
`docs/seri/SOZLESME.md` §3 ve dayanak literatürü §10) burada da geçerlidir. BOUN'a özgü ekler:

- **Sözlü checkpoint ("Sesli anlat" kutusu):** blockquote içinde `**Sesli anlat:**` ile başlar;
  okuyucudan kavramı 60–90 saniyede, tahtaya çizer gibi **yüksek sesle** anlatmasını ister ve
  hemen ardından "iyi bir cevabın omurgası" verilir. Makale başına 1–3 adet.
- **Takip sorusu zinciri:** kritik kavramlarda "mülakatçı burada şunu sorar" deseniyle 2–3
  halkalık takip zinciri gösterilir (tanım → sınır durumu → trade-off). Amaç ezber değil,
  savunma refleksi kurmaktır.
- **Tanım disiplini:** her çekirdek kavramın (a) bir cümlelik sezgisel tanımı, (b) formal tanımı,
  (c) bir sınır örneği verilir. Formal tanım İngilizce teknik adıyla birlikte durur.
- **Küçük problem standardı:** problemler 10–15 dakikalık mülakat formatına uygun boyuttadır;
  çözüm önce strateji, sonra adımlar, sonra karmaşıklık/doğruluk savunması sırasıyla yazılır.
- **Unutmuş okuyucu varsayımı:** lisans bilgisi paslanmış kabul edilir; hiçbir makale "zaten
  biliyorsun" demez, kritik önkoşulu 1–3 cümleyle yeniden kurar.
- **Omurga koşullarıyla söylenir:** "İyi bir cevabın omurgası" 60–90 saniyede söylenebilir
  olmalı ve iddiayı **koşuluyla** kurmalıdır: hangi durum (ortalama / en kötü / beklenen /
  amortize), hangi model (karşılaştırma modeli, RAM, dış bellek), hangi varsayım (düzgün dağılım,
  negatif olmayan ağırlık, sıralı girdi) ve **nerede bozulduğu**. Koşulsuz iddia ("hash tablosu
  O(1)") omurga değildir; mülakatçının ikinci sorusunu davet eder.
- **İkinci soruyu önceden karşıla:** Takip zinciri (tanım → sınır durumu → takas) makalenin
  içinde okura gösterilir ve iyi cevap, sınır durumunu **sorulmadan** söyler. Bir bölümün
  "mülakatçı burada şunu sorar" cümlesi yoksa o bölümün sınır durumu eksiktir.
- **Maliyet cevabının sabit sırası:** Girdi boyutunu tanımla ("n nedir?") → maliyeti nereden
  saydığını söyle (hangi döngü, kaç kez) → sınıfı ve durumu ver (Θ mu O mu, en kötü mü ortalama
  mı) → bellek maliyetini ekle (özyineleme derinliği dahil). Doğruluk cevabının sabit sırası:
  değişmezi tek cümlede ve tam söyle → başlatma/koruma/sonuçlanma → sonlanmayı ayrıca ölçüyle
  ispatla.
- **Model bilinci:** Her alt sınır ve her "daha hızlısı yok" iddiası modeliyle birlikte söylenir;
  "sıralama n log n'in altına inemez" eksiktir, "karşılaştırma modelinde" tamdır. Model
  değiştiğinde (dış bellek, doğrudan erişim, rastgelelik, paralellik) cevabın neden değiştiği
  bir cümleyle gösterilir.
- **Sık hatalar listesi içerikten gelir:** "Mülakatta nasıl görünür" bölümündeki 3–6 hata,
  gerçekten görülen kavram yanılgılarıdır (DFS ağacını en kısa yol sanmak, amortize ile ortalama
  durumu karıştırmak); kelime doldurmak için genel uyarı yazılmaz.
- **Kendi doğrulamanı işaretle:** Kaynağın vermediği bir sayı ya da örnek çıktı (izleme tablosu,
  karşı örnek, kaba kuvvet karşılaştırması) yazar tarafından hesaplandıysa bu açıkça söylenir
  ("bunu kendi kodumla doğruladım", "bu yüzdeler kendi hesabımdır") ve kaynaktan alınan sayıyla
  karıştırılmaz. Bu not bir üslup süsü değil, kaynak–iddia bağının parçasıdır.
- **Ne öğretti sorusu:** Her makale beş yeteneğin (anlat / çöz / ispatla / savun / dayan) en az
  birinde okuru ilerletir ve hangisinde ilerlettiği metinden okunur. Bunu sağlamayan bölüm,
  kelime bandını tutturmak için kalmaz.

## 4. Kaynak ve doğruluk kuralları

- Kaynak önceliği: (1) güncel resmî Boğaziçi CmpE sayfaları (graduate/curriculum/courses),
  (2) standart textbook ve güvenilir üniversite ders materyali, (3) hakemli/akademik kaynak,
  (4) açıkça etiketlenmiş informal/legacy sinyal. Kanıt defteri `ARASTIRMA.md` erişim tarihiyle
  güncel tutulur; kapsam kararını etkileyen resmî sayfalar üretim run'ında yeniden doğrulanır.
- Resmî süreç bilgisi (mülakat formatı, Scientific Preparation) yalnızca resmî sayfadan aktarılır
  ve değişebilir olduğu belirtilir. "Kesin çıkar/çıkmaz" iddiası kurulamaz.
- Sayısal/algoritmik iddialar (karmaşıklık sınıfları, ispatlar) standart kaynakla doğrulanır;
  oran ve sınırlar tam değerden hesaplanır. Uydurma/teyitsiz URL yasak.

## 5. Teknik sözleşme ve platform entegrasyonu

- Kalıcı living state: `docs/seri-boun/SOZLESME.md` (bu dosya), `docs/seri-boun/YOL-HARITASI.md`,
  `docs/seri-boun/HANDOFF.md`, `docs/seri-boun/ARASTIRMA.md`, `docs/seri-boun/TRIGGER.md`.
- **Platform entegrasyonu kuruludur** (Batch 0'dan beri; yayımlanmış gerçek §7'ye göre en yüksek
  otoritedir): içerik sözleşmesi `content/series-boun/{catalog.json, roadmap.json,
  articles/<kategori>/<slug>.md, assets/<slug>/*.svg}`; rotalar `/boun` (giriş + yol haritası) ve
  `/boun/[slug]` (okuyucu); kod `src/lib/content/series-boun.ts` (seri örneği),
  `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`.
  Kategori sözlüğü: `interview-method`, `discrete-math`, `data-structures`, `algorithms`,
  `operating-systems`, `supporting-fundamentals`; klasör adı `category` alanıyla birebir aynıdır.
  Ana kütüphanenin ve AI serisinin şema/kategori sözlüğü **değiştirilmez**; sahte katalog kaydı
  yasaktır; yeni bir makale kod değişikliği gerektirmez.
- Entegrasyon değişmezleri: mevcut `/read` (18 makale) ve `/seri` (AI) rotaları ile kullanıcı
  progress/bookmark/highlight state'i korunur; `sync-service.validArticleIds` birleşime BOUN
  kataloğu eklenir; bilinmeyen id reddi sürer; global article-id benzersizliği ana ∪ AI ∪ BOUN
  üzerinde doğrulanır; sıfır/az makaleli durumda UI null/empty/partial-data hatası üretmez.
- Diyagramlar AI serisinin SVG sözleşmesini aynen izler (CSS değişkenli renk, viewBox, sanitize
  kuralları ve şekil ilkeleri — `docs/seri/SOZLESME.md` §6). İçerik denetleyicileri kuruludur:
  `node tools/series/check-series-content.cjs --series=boun` (H2 başlangıcı, "### Sırada ne var"
  → "## Kaynakça" sırası, 1.800–3.200 kelime, ≥2 şekil ve şekil göndermesi, 1–3 "Sesli anlat"
  kutusu, ham HTML yok), `check-series-svg.cjs content/series-boun/assets`,
  `sync-series-hashes.cjs --series=boun [--write]` (gövde değişince zorunlu),
  `entegre-batch.cjs --series=boun [--write]`.
- Frontmatter/katalog şeması ana kütüphaneyle aynı alan yapısını kullanır (article_id, slug,
  reading_order, content_hash, classification_batch …); `classification_batch` = ardışık üretim
  kohortu (ilk run Batch 0).

## 6. Üretim ritmi — kanonik batch sözleşmesi

- **Varsayılan ritim `BATCH=5+1`'dir:** bir üretim run'ında sıradaki 5 yayımlanmamış makale
  üretilir, ardından tek bir hazırlık/state-geçiş fazı yapılır.
- **Override yalnızca exact assignment ile olur:** geçerli tek biçim `BATCH=N+1` satırıdır
  (regex: `^BATCH=([1-9][0-9]*)\+1$`). Çözüm önceliği: (1) kullanıcının mevcut mesajındaki en
  güncel geçerli assignment, (2) çalıştırılan trigger'daki tek assignment, (3) güvenli fallback
  `5+1`. Düz yazıdaki sayılar, roadmap sıra numaraları veya tarihsel batch adları override
  değildir; güncel kullanıcı assignment'ı yalnızca o run'ı etkiler.
- **`N`** = bu run'da araştırılıp yazılacak, entegre edilip doğrulanacak makale sayısı; kalan
  makale `N`'den azsa doldurma konusu icat edilmez, kalanlar tamamlanır ve seri tamamlanmış
  state'ine geçirilir. **`+1`** = makale değil, tek hazırlık/state-geçiş fazı (HANDOFF cursor'ı,
  roadmap durumları, açık borçlar, sıradaki run hazırlığı; sonraki makalenin gövdesi yazılmaz).
- Batch büyüklüğü değişse de kalite, prerequisite zinciri, kaynak doğrulaması ve doğrulama
  kapıları düşürülemez. HANDOFF ve trigger bu semantiği yeniden anlatmaz; buraya referans verir.

## 7. Yaşayan state sahipliği

1. **Yayımlanmış gerçek** (makale dosyaları + katalog; entegrasyon kurulduktan sonra) — en yüksek
   otorite.
2. **Bu sözleşme** — kurallar, ritim, entegrasyon değişmezleri.
3. **`YOL-HARITASI.md`** — plan, fazlar, prerequisite grafı, tekrar/terim defterleri; yayımlanmamış
   başlıklar taslaktır, batch hazırlığında pedagojik gerekçeyle değişebilir.
4. **`HANDOFF.md`** — yalnızca güncel operasyonel state (cursor, borçlar, sıradaki run hazırlığı);
   kural kopyalamaz, override edemez.
5. **`TRIGGER.md`** — state değildir; HANDOFF'u işaret eder ve run'ın `BATCH` assignment'ını taşır.

Tarihsel kayıtlar açıkça non-normative history olarak işaretlenir. Kritik kararlar, sentez ve son
kabul her zaman run'ı çalıştıran ana oturumdadır; bu sözleşme belirli bir model, paralel reviewer
düzeni veya harness zorunlu kılmaz ve repo dışı geçici alanlara bağımlılık kuramaz.

## 8. Editoryal muhakeme ilkeleri (amaç önce, kural sonra)

AI sözleşmesinin §11'i (ölçüt sırası, makalenin tek cümlelik işi, sezgi → mekanizma → biçim
sırası, ölçüm dürüstlüğü, kaynak–iddia bağı, kalıp yasağı, inceleyen için "ne öğretti" sorusu)
burada da geçerlidir. BOUN'un amacı farklı olduğu için ölçüt de farklı okunur:

- **Başarı ölçütü sözlü savunmadır.** Bir bölüm, okurun tahtada altmış saniyede söyleyebileceği
  ve itiraz gelince genişletebileceği bir cevap üretmiyorsa amacına ulaşmamıştır; kelime bandı,
  şekil ve kutu sayısı tabandır.
- **Her iddia koşulu ve modeliyle birlikte doğar** (§3): durum, model, varsayım, bozulma noktası.
  Serinin en güçlü bölümleri bu dördünü aynı paragrafta verir ("ortalama durumda, düzgün dağılım
  varsayımıyla; en kötü durumda bütün anahtarlar aynı hücreye düşer").
- **Ders kitabı seçimi ölçüm gerektirir:** Standart kaynaklar (CLRS, Sedgewick–Wayne, MIT 6.006 /
  6.042 / 6.046, OSTEP, xv6, Silberschatz) arasında bir sayı ya da tanım farklı veriliyorsa
  makale hangisini neden seçtiğini söyler; bölüm adı doğrulanamayan kaynağa alt bölüm düzeyinde
  atıf yapılmaz (HANDOFF açık borçları).
- **Kendi hesap ve kendi kod açıkça işaretlenir** (§3); somut izleme tabloları, karşı örnekler ve
  kaba kuvvet karşılaştırmaları serinin kanıt aracıdır ve şekillerdeki sayılarla birebir aynıdır.
- **AI serisinden ayrım korunur:** "Sesli anlat" kutusu, takip sorusu zinciri, "Mülakatta nasıl
  görünür" bölümü ve konu adıyla gönderme BOUN'un araçlarıdır; AI serisinin "Kendini yokla"
  kutusu ve numaralı gönderme biçimi buraya taşınmaz.

---

## Değişiklik notları

- **2026-09-03 (v1.1, kullanıcının açık talebiyle — iki serinin bağımsız editoryal/akademik
  denetimi, Fable 5.1 tek oturum):** (a) §5'teki "0 makale" metni yayımlanmış gerçekle (27 makale,
  kurulu rota/kod/denetleyiciler, nihai kategori sözlüğü) değiştirildi; HANDOFF'taki açık borç
  kapandı. (b) §2'ye "Mülakatta nasıl görünür" zorunlu bölümü, konu adıyla gönderme, İngilizce
  karşılıklar bloğu, terim çakışması yasağı ve kalıp yasağı eklendi (2. makalede "koşullu
  doğruluktaki önerme" → "olumsal önerme (contingency)" düzeltildi, terim defterine işlendi).
  (c) §3'e koşullu omurga, ikinci soruyu önceden karşılama, maliyet/doğruluk cevap sırası,
  model bilinci, sık hatalar, kendi doğrulamanı işaretle ve "ne öğretti" ilkeleri eklendi.
  (d) Yeni §8 "Editoryal muhakeme ilkeleri" eklendi. Yayımlanmış makalelerin id/slug/sıra/URL'si
  değişmedi; gövdesi değişen 2 için `content_hash` yeniden senkronlandı.
