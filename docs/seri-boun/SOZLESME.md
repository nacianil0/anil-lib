# "Mülakat Aynası: Boğaziçi CmpE" — Seri Sözleşmesi

> **Bu dosya BOUN serisinin kalıcı normatif sözleşmesidir.** Yeni bir oturum seriye devam etmeden
> önce bu dosyayı, `docs/seri-boun/HANDOFF.md`'yi ve yol haritasının ilgili bölümlerini okumak
> **zorundadır**. Sözleşme ancak kullanıcının açık talebiyle değiştirilebilir; değişiklik yapılırsa
> sonuna tarihli bir değişiklik notu eklenir.

Sürüm: 1.0 · Oluşturma: 2026-08-28 · Kapsam: serinin bütün yaşam döngüsü

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
- Zorunlu bölümler: giriş köprüsü, gövde, "### Sırada ne var", "## Kaynakça".
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
- **Şu an platformda BOUN içerik sözleşmesi yoktur** (0 makale; sahte katalog kaydı yasak).
  İlk üretim run'ı, AI serisinde doğrulanmış deseni izleyerek entegrasyonu kurar:
  ayrı içerik sözleşmesi `content/series-boun/{catalog.json, articles/**, assets/**}` + ayrı
  rota (`/boun`, `/boun/[slug]`) + ReaderShell'in mevcut `basePath/listTitle/listSubtitle/homeHref`
  prop'ları. BOUN kendi kategori sözlüğünü tanımlar (öneri: `discrete-math`, `data-structures`,
  `algorithms`, `operating-systems`, `supporting-fundamentals`); ana kütüphanenin ve AI serisinin
  şema/kategori sözlüğü **değiştirilmez**, gerekirse şema additive biçimde seri-başına kategori
  sözlüğüne genişletilir.
- Entegrasyon değişmezleri: mevcut `/read` (18 makale) ve `/seri` (AI) rotaları ile kullanıcı
  progress/bookmark/highlight state'i korunur; `sync-service.validArticleIds` birleşime BOUN
  kataloğu eklenir; bilinmeyen id reddi sürer; global article-id benzersizliği ana ∪ AI ∪ BOUN
  üzerinde doğrulanır; sıfır/az makaleli durumda UI null/empty/partial-data hatası üretmez.
- Diyagramlar AI serisinin SVG sözleşmesini aynen izler (CSS değişkenli renk, viewBox, sanitize
  kuralları — `docs/seri/SOZLESME.md` §6). İçerik denetleyicisi ilk entegrasyon run'ında
  `tools/series/` desenine uygun biçimde BOUN için eklenir (sözlü checkpoint ve bölüm kuralları
  §2–§3'e göre).
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
