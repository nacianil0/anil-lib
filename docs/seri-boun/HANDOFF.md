# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-08-30 · Durum: **1–18 yayında (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9, Batch 3: 10–12, Batch 4: 13–15, Batch 5: 16–18) · Sıradaki: 19**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 18 — `yinelemeler-ve-master-teoremi` |
| Sıradaki güvenli başlangıç | Makale 19 ("Doğruluk: Döngü Değişmezleriyle İspat") — Faz C'nin formalleştirme üçlüsünün sonuncusu; run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 6` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kullanılan kategoriler | 1 → `interview-method`, 2–8 → `discrete-math`, 9–16 → `data-structures`, 17–18 → `algorithms` (klasör adı `category` alanıyla birebir aynı) |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN (katalogdan türetilir, yeni makale kod değişikliği istemez) |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 5'te ne yapıldı

1. **Makale 16–18 yayımlandı** (`classification_batch: 5`), her biri 2 diyagramla ve 2 sözlü
   checkpoint kutusuyla. **Faz B kapandı** (16 graf temsilleri, BFS ve DFS) ve **Faz C açıldı**
   (17 asimptotik tanımlar, 18 yinelemeler ve Master Teoremi).
2. **Yeni kategori klasörü açıldı:** `content/series-boun/articles/algorithms/`. `algorithms`
   kategorisi şemada ve etiket sözlüğünde zaten tanımlıydı, bu yüzden **kod değişikliği
   gerekmedi**. Klasör adı `category` alanıyla birebirdir.
3. **Resmî dayanak:** makale 16, CMPE250 katalog tanımındaki "Graphs" başlığını karşılar — Faz B
   böylece sekiz katalog başlığından altısını doğrudan kapsamış oldu. Makale 17 ve 18'in dayanağı
   **CMPE300'ün ders çıktılarıdır** ("the theory of complexity analysis", "lower bound theory",
   "master theorem"). **Önemli kesinlik düzeltmesi:** bu ifadeler CMPE300'ün *katalog tanımında*
   değil, *Course Learning Outcomes* bölümünde geçiyor; ARASTIRMA §1'deki özet ikisini
   birleştiriyordu, §10 ayrımı birebir metinlerle kaydetti.
4. **Yayımlanmış sözler ödendi.** Makale 15'in en somut vaadi (graf temsilleri, BFS kuyrukla,
   DFS yığınla, bağlı bileşenler, topolojik sıralama) 16'da bütünüyle karşılandı; makale 9'un
   "formal tanımlar asimptotik analiz makalesinde" borcu 17'de kapandı; makale 4'ün Hanoi bağıntısı
   ve makale 15'in mergesort bağıntısı 18'de çözüldü. **Ekstra:** makale 14 ve 15'in karar ağacı
   argümanındaki "en az log₂ L yükseklik" adımı 17'de ispatlandı ve log₂(n!) = Θ(n log n) sonucu
   kuruldu. Ayrıntı: YOL-HARITASI'nın kavram-tekrar defteri.
5. **Yeni birincil kaynaklar okundu:** MIT 6.006 Bahar 2020 Lecture 1 (Introduction), 9
   (Breadth-First Search) ve 10 (Depth-First Search); **6.042J ders kitabının 13.7 (Asymptotic
   Notation) ve 21. bölümünün (Recurrences) tamamı**; **MIT 6.046J Bahar 2015 Lecture 2 (Divide and
   Conquer)**; Sedgewick & Wayne 1.4, 4.1 ve 4.2 sayfaları. Ayrıntı ARASTIRMA §10'da.
6. **Bütün sayısal iddialar bağımsız hesaplandı** (ARASTIRMA §10 sonundaki liste): BFS/DFS ve
   topolojik sıralama izleri betikle üretildi, Big-O tanıkları (c = 14 / n₀ = 10 ve c = 113 / n₀ = 1)
   ve n₀'ın en küçük değeri denklemden çözüldü, log₂(n!) sınırları ve kesişim noktaları hesaplandı,
   mergesort kapalı ifadesi altı değerde doğrulandı, üç Master Teoremi rejimi n = 2²⁰'ye kadar
   sayısal olarak denetlendi.
7. **Regresyon korundu**: `/read` 18 makalelik ana kütüphane ve AI serisinin `/seri` rotaları,
   id/slug/order/hash bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi.
   `/boun` 15 → 18 sayfa. `src/`, `tests/` ve `tools/` altında tek satır değişmedi; bu batch
   yalnızca içerik ve dokümandır.

## Açık borçlar

- **SOZLESME §5 güncellenmeli (kullanıcı onayı gerekir).** §5 hâlâ "Şu an platformda BOUN içerik
  sözleşmesi yoktur (0 makale)" diyor; bu artık yayımlanmış gerçekle çelişiyor (18 makale).
  Sözleşme yalnızca kullanıcının açık talebiyle değiştirilebildiği için bu run'da da dokunulmadı.
  Nihai kategori sözlüğü yukarıdaki tabloda ve YOL-HARITASI'ndadır.
- **CLRS 4. baskının 18. bölümünün adı doğrulanamadı** ve alt bölüm **başlıkları** hiçbir bölüm
  için doğrulanamadı (yalnızca alt bölüm numaralarının varlığı doğrulandı). Denenen ve sonuç
  vermeyen yollar ARASTIRMA §8'de listelidir. Pratik sonucu: CLRS'e **bölüm düzeyinde** atıf
  yapılır. Makale 19 için CLRS 2. bölüm (Getting Started), 20 için 4. bölüm (Divide-and-Conquer),
  21 için 15. bölüm (Greedy Algorithms) adları doğrulanmış durumdadır.
- **Master Teoreminin ε'sı görsel olarak doğrulanamadı.** 6.042 PDF'inin metin katmanı matematik
  simgelerini düşürüyor; Durum 1'in üssünün log_b a − ε, Durum 3'ünkünün log_b a + ε olduğu,
  belgenin kendi karakter kodlamasından ("+" → "C", "−" → boşluk) çıkarıldı ve mantıksal olarak
  zorunlu olduğu gösterildi (ARASTIRMA §10'daki metodolojik not). Ortamda PDF'i görüntüye çeviren
  araç (`pdftoppm`) **yok**; yalnızca `/mingw64/bin/pdftotext` var. Bir sonraki run bir görüntü
  aracına erişirse sayfa görsel olarak denetlenebilir.
- **Makale 13'ün `azalt_anahtar` (decrease-key) borcu duruyor.** Graf algoritmaları makalesi (23)
  Dijkstra ve Prim için bu işlemi açmak zorundadır. Makale 16 köprüyü genişletti: BFS'in en kısa
  yol vermesi kenarların ağırlıksız olmasına bağlıdır ve ağırlıklı hâl öncelik kuyruğu ister.
- **Yönlü graflarda güçlü bağlı bileşenler makale 16'da bilinçli olarak dışarıda bırakıldı**
  (tanımı verildi, algoritması verilmedi). 25'te indirgeme grafları tartışılırken açılabilir.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yoksa `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer;
  bu yüzden canlı sync uçtan uca denenemedi. `validArticleIds` birleşimi kod düzeyinde doğrulandı.
  E2E'de `tests/e2e/reader-data.spec.ts` içindeki üç test bu nedenle başarısızdır.
- **`tests/e2e/reader.spec.ts:231` ("expands the real reading area…") kırık ve BOUN'la ilgisiz.**
  Okuma alanı grubuna `Ekstra Geniş` seçeneği eklendikten sonra
  `getByRole("button", { name: "Geniş" })` iki öğeye eşleşiyor ve Playwright strict-mode ihlali
  veriyor. Kapsam dışı olduğu için bu run'da da dokunulmadı; düzeltme tek satır:
  seçiciye `exact: true` eklemek.
- **AI serisi paralel bir oturumda ilerliyor.** Bu run sırasında AI kataloğu 26 → 30 makaleye
  çıktı ve `content/series/articles/` altında git'te takipsiz dosyalar birikti. BOUN kapsamı
  dışıdır; `pnpm test` sayısı ve `check-series-*` dosya sayıları o oturumun ilerlemesiyle değişir,
  dolayısıyla bu HANDOFF'taki sayılarla birebir eşleşmeyebilir. **Aynı depoda iki Next süreci
  `.next` dizinini paylaşır ve birbirini bozar** — doğrulama sırasına bak.
- `pnpm test:e2e` ve `playwright test` **kendi sunucusunu başlatamaz**: config'in `webServer`
  komutu `pnpm exec next dev` kullanıyor ve PATH'teki global pnpm depodaki placeholder
  `pnpm-workspace.yaml`'ı reddediyor ("packages field missing or empty"). Çözüm aşağıdaki
  "doğrulama sırası" bölümünde.
- **`TaskStop` Next dev sürecini öldürmez.** Arka planda başlatılan dev sunucusu, görev
  durdurulduktan sonra da 3100'ü dinlemeye devam eder; portu gerçekten boşaltmak için
  `netstat -ano` ile PID bulunup `Stop-Process -Id <pid> -Force` çalıştırılmalıdır. Bu run'da iki
  kez yapıldı ve ikisinde de portun kapandığı ayrıca doğrulandı.
- **Bash tool'unun heredoc'u (`<<'EOF'`) Türkçe kesme işareti içeren uzun metinlerde patlıyor**
  ("unexpected EOF while looking for matching `''`"). Bu run'da da bir kez patladı. Uzun
  Markdown/SVG/Python blokları `Write` aracıyla dosyaya yazılmalı, sonra `cat >>` ya da
  `python <dosya>` ile çalıştırılmalıdır.
- **SVG'de `<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılmalıdır** (XML). Denetleyici bunu
  yakalamaz; bu run'da bir SVG'de düz `<` bırakıldığı için metin bozuk çıktı ve düzeltildi.
  Bütün SVG'ler `xml.etree.ElementTree` ile ayrıca ayrıştırılarak denetlendi.

## Bu run'da doğrulananlar

- İçerik/SVG/hash/entegrasyon denetleyicileri: BOUN 18 makale + 36 diyagram temiz;
  `entegre-batch` kuru çalışması yeni 3 makaleyi buldu, `--write` sonrası fark kalmadı. Katalog ↔
  frontmatter ↔ gövde hash üçlüsü **ve** başlık/sıra/kategori/klasör eşleşmesi bağımsız bir
  betikle de doğrulandı: 18/18. `reading_order` 1–18 kesintisiz; kohort dağılımı 3/3/3/3/3/3;
  makalelerin gövdesinde referans verilen 36 SVG yolunun hepsi diskte mevcut.
- `pnpm typecheck` temiz · `pnpm test` **256/256** · `pnpm build` başarılı (69 statik sayfa;
  `/boun/[slug]` 18 yol, `/read/[slug]` 18, `/seri/[slug]` 26). Kapılar geçildikten sonra makale
  16'nın maliyet tablosunda tek hücrelik bir kesinlik düzeltmesi yapıldı (kenar ekleme/silme satırı),
  hash'ler yeniden senkronlandı ve `pnpm build` ile `pnpm test` **tekrar** çalıştırıldı. İkinci
  koşuda paralel AI oturumu kataloguna dört makale daha eklemiş olduğu için sayılar 73 statik sayfa
  ve **259/259** test oldu; BOUN tarafı iki koşuda da aynıdır (18 `/boun` yolu) ve her ikisinde de
  bütün testler geçti. Unit test sayısı sabit bir referans **değildir** (`series-assets.test.ts`
  asset klasörünü gezer ve AI serisi paralel büyüyor); sabit referans testlerin **tamamının**
  geçmesidir.
- Global article-id ve slug benzersizliği: 62/62 (18 ana + 26 AI + 18 BOUN) — ölçüm anındaki AI
  sayısıyla; AI kataloğu run bitmeden 30'a çıktı.
- **Gerçek render (ekran görüntülü):** üç yeni makale, üç genişlik (375 / 768 / 1440) × üç tema
  (light / dark / sepia) = 27 kombinasyonda tarayıcıda açıldı, ayrıca `/boun` girişi üç genişlikte
  kontrol edildi. Her sayfada 2 inline SVG, doğru figcaption, yatay taşma yok
  (`documentElement.scrollWidth == innerWidth`), raw anahtar / undefined sızıntısı yok, tek console
  hatası bilinen 503 sync çağrısı. 375px'te diyagramlar beklendiği gibi kendi kabında yatayda
  kayıyor (clientWidth 298 / scrollWidth 544), sayfa kaymıyor. Altı diyagramın hepsi light ve dark
  temada tek tek görsel olarak incelendi ve sorun bulunmadı.
- **Markdown kaçış denetimi:** `log_b n` ve `n^(log_b a)` gibi alt çizgili ifadelerin italik'e
  dönüşmediği render edilmiş DOM üzerinde doğrulandı (CommonMark kelime içi `_` vurgu açmaz);
  üç makalede `<em>` öğeleri yalnızca kasıtlı İngilizce terimler ve kitap adlarıdır.
- **Playwright: 21 geçti, 1 atlandı, 4 başarısız** — dördü de "önceden-var" listesindedir ve BOUN
  içeriğiyle ilgisizdir: üçü `reader-data.spec.ts` (DATABASE_URL yok), biri `reader.spec.ts:231`
  (`Ekstra Geniş` strict-mode ihlali). Bu, Batch 1–4'ün referans sonucuyla birebir aynıdır.
- Bu run'da build, dev ve E2E **doğrudan depoda** çalıştırıldı; paralel AI oturumu bu sırada
  `pnpm dev` çalıştırmadığı için yalıtılmış kopyaya gerek kalmadı (kopya tarifi aşağıda duruyor).

## Sıradaki batch hazırlığı — Batch 6 (Makale 19'dan itibaren)

**Pedagojik hedef:** Makale 19, Faz C'nin formalleştirme üçlüsünü kapatır. 17 **ölçüyü**, 18
**özyinelemeli maliyeti** tanımladı; 19 **doğruluğu** tanımlar ve bunu döngüler için yapar —
çünkü seride şimdiye kadarki bütün doğruluk savunmaları tümevarımlıydı ve özyinelemeye
yaslanıyordu, oysa gerçek kodun çoğu döngüdür. 20'den itibaren fazın karakteri yeniden değişir:
17–19 **analiz**, 20–22 **tasarım desenleri** (böl-yönet, açgözlü, dinamik programlama), 23–25
**uygulama ve sınırlar**.

**Prerequisite satırları (19–21 için taslak; YOL-HARITASI'nda da var):**
- 19 ← 4 (tümevarımın döngü hâli), 2 (boş doğruluk: başlatma adımı), 15 (eklemeli sıralamanın doğruluğu), 11 (ikili aramanın değişmezi), 18 (özyinelemeli doğruluk ile döngü doğruluğunun karşılaştırılması)
- 20 ← 18 (böl-yönet yinelemelerinin çözümü), 15 (birleştirmeli ve hızlı sıralama iki kanonik örnektir), 19 (birleştirme adımının doğruluğu), 4 (özyinelemeli tasarımın tümevarımla savunulması)
- 21 ← 5 (kısmi sıra ve seçim sırası), 7 (ekstremal argüman ve kapsayan ağaç), 3 (karşı örnek disiplini), 19 (değişmez koruyan seçim), 13 (Huffman için öncelik kuyruğu)

**Araştırma ihtiyacı:** Resmî sayfa borcu **yok** — CMPE250 ve CMPE300 bu run'da (2026-08-30)
yeniden doğrulandı ve Faz C boyunca geçerlidir. Akademik kaynaklar için hazır ipuçları:
- **19 için birincil kaynak hazır ve doğrulanmış:** 6.042J ders kitabının **5.4 State Machines**
  bölümü ve içindeki **5.4.3 The Invariant Principle** (Floyd'un değişmez ilkesi, künyesiyle
  birlikte) — kitabın PDF'i ARASTIRMA §10'daki yöntemle indirilir. İkinci kaynak: CLRS **2. bölüm**
  (Getting Started; eklemeli sıralamanın döngü değişmezi kanonik örnektir; bölüm adı doğrulanmış).
  6.006 Bahar 2020 döngü değişmezi kullanmaz, özyineleme üzerinden tümevarım yapar — bu makalede
  ondan yararlanılmayabilir.
- **20 için kaynak zaten okunmuş durumda:** 6.046J Bahar 2015 **Lecture 2 (Divide and Conquer)**
  bu run'da indirilip okundu (konveks kabuk ve medyan bulma; ARASTIRMA §10). CLRS **4. bölüm**
  adı doğrulanmıştır.
- **21 için hazır aday:** 6.046J Bahar 2015 **Lecture 1 (Overview, Interval Scheduling)** —
  aralık çizelgeleme açgözlü algoritmanın kanonik örneğidir; PDF yolu
  `/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/ff2a7015ff913fc01f0381d8f5126a9a_MIT6_046JS15_lec01.pdf`.
  Huffman için Sedgewick & Wayne **5.5 (Data Compression)** sayfası kullanılabilir. CLRS
  **15. bölüm (Greedy Algorithms)** adı doğrulanmıştır.

**PDF çözümleme yöntemi (Batch 3–5'te çalıştı):** OCW ders listesi sayfasındaki kaynak adresi bir
HTML sayfasıdır; içindeki `..._MIT6_006S20_lecN.pdf` (ya da `..._MIT6_046JS15_lecNN.pdf`) bağlantısı
`grep -oE '/courses/[^"\\]*\.pdf'` ile çıkarılıp `https://ocw.mit.edu` ön ekiyle indirilir, sonra
`/mingw64/bin/pdftotext -layout` ile metne çevrilir. **Uyarılar:** (a) tablolar sütun kaymasıyla
çıkar, satır–sütun eşleşmesi elle denetlenmelidir; (b) 6.042 kitabının matematik simgeleri metin
katmanında kaybolur ve "+" karakteri "C", "−" karakteri boşluk olarak çıkar — formül okurken bu
kodlama akılda tutulmalıdır.

**Yayımlanmış makalelerin verdiği sözler.** Makale 16–18 de **numaralı ileri vaat vermedi**;
bütün ileri göndermeler konu adıyla yapıldı. Teslim edilmesi zorunlu konular:

- **19'da karşılanmalı (makale 18'in "Sırada ne var" sözü, en somut vaat):** döngü değişmezinin
  üç adımı — **başlatma, koruma, sonuçlanma**; makale 2'nin **boş doğruluk** kavramının başlatma
  adımını çoğu zaman bedava kılması; **eklemeli sıralamanın** ve **ikili aramanın** doğruluğunun
  satır satır ispatı. Ayrıca makale 11'in "değişmezi koruyan yerel işlem" kalıbı ve makale 18'in
  "özyinelemeli doğruluk tümevarımdır" tespiti burada döngü diline çevrilmelidir.
- **20'de karşılanmalı:** böl-yönetin bir **tasarım deseni** olarak sunulması; makale 18'in
  Master Teoremi ve özyineleme ağacı araçlarının tasarım kararlarına uygulanması; küçük girdilerde
  tabana devretmenin gerekçesi (makale 17'nin kesişim noktası argümanı).
- **24'te karşılanmalı (üç makalenin ortak borcu):** karar ağacı kuramının formal hâli. **17,
  yükseklik lemmasını ve log₂(n!) = Θ(n log n) adımını ödedi**; geriye kuramın kendisi ve
  randomize algoritmaların beklenti analizi kaldı.
- **Konu bazlı, numarasız pinler (16–18'ten):** graf için doğrusal zaman Θ(|V| + |E|) (16 → 23);
  BFS'in ağırlıklı genellemesi olarak Dijkstra (16 → 23); ters bitiş sırası (16 → 22, 25);
  niceleyicili tanım kalıbı (17 → 19, 25); eşik ve kesişim noktası (17 → 20, 37); özyineleme
  ağacının tekrar eden düğümleri = örtüşen altproblem (18 → 22); Master Teoremi (18 → 20, 23);
  hipotezi güçlendirme refleksi (18 → 19, 21, 22).
- Batch 0–4'ten devreden numarasız pinler: minimum kapsayan ağaç (7), ortalama durumun dağılım
  varsayımı → olasılık makalesi (9), girdi boyutunun sayı mı basamak mı olduğu → hesaplamanın
  sınırları (9), sayılabilirlik → durma problemi (5), alt sınır ispatı (6), doğum günü ilkesinin
  olasılık hâli (6), zamanlayıcı kuyruğu ve çağrı yığını → işletim sistemleri fazı (10), disk
  tabanlı arama yapıları ve ayırma yöntemleri → dosya sistemleri (12), indeks = B-ağacı →
  veritabanları (12), bellek hiyerarşisi (9, 12), d-yollu heap (13 → 24), rastgeleleştirme
  (14, 15 → 24, 36), kararlılığın veritabanı karşılığı (15 → 39), dış sıralama (15 → 34),
  `azalt_anahtar` (13 → 23).

**Görselleştirme öngörüsü:** 19: bir döngünün üç adımının (başlatma / koruma / sonuçlanma) dizi
üzerinde adım adım gösterilmesi — eklemeli sıralamanın i'inci adımında "sol önek sıralı" bandının
büyümesi; ve ikili aramanın arama aralığının her adımda yarılanması, değişmezin "aranan değer
varsa bu aralıktadır" biçiminde çizilmesi. 20: aynı problemin böl-yönetli ve düz çözümünün
maliyet karşılaştırması, birleştirme adımının maliyetinin sonucu belirlemesi. 21: açgözlü seçimin
doğru çalıştığı ve çalışmadığı iki örneğin yan yana konması (aralık çizelgeleme ↔ para üstü karşı
örneği).
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval `viewBox="0 0 720 H"`, metin ≥13 birim,
renk yalnızca `var(--...)`, marker id'leri makale genelinde benzersiz — `boun-a<N>-...` kalıbı,
`<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılır. Kullanılabilir değişkenler: `--text`,
`--text-muted`, `--text-faint`, `--border`, `--surface`, `--surface-muted`, `--accent`,
`--accent-soft`, `--cool`, `--cool-soft`.)

**Sözlü checkpoint tohumları:** "Döngü değişmezi nedir, üç adımı nedir ve bir döngünün doğruluğunu
onunla nasıl ispatlarsın?"; "Eklemeli sıralamanın değişmezini söyle ve sonuçlanma adımının neden
sonucu verdiğini açıkla"; "Bir algoritmanın durduğunu nasıl ispatlarsın — değişmez bunun için
yeter mi?"

**Araç sırası (Batch 1–5'te doğrulandı):** katalog var olduğu için `sync-series-hashes.cjs`
yalnızca **katalogdaki** makaleleri gezer. Doğru sıra:
1) makaleleri yaz (frontmatter `content_hash` alanına 64 sıfırdan oluşan yer tutucu koy),
2) `entegre-batch.cjs --series=boun` (kuru çalışma; başlık/sıra/kohort denetimi),
3) `entegre-batch.cjs --series=boun --write` (katalog + roadmap),
4) `sync-series-hashes.cjs --series=boun --write` (frontmatter **ve** katalog hash'lerini düzeltir),
5) denetleyicileri tekrar çalıştır. Gövdeyi sonradan düzenlersen 4. adımı yeniden çalıştır.
Yeni kategori klasörü açılırken klasör adı `category` alanıyla birebir aynı olmak zorundadır ve
kategori `src/lib/content/schema.ts` ile `labels.ts` içinde zaten tanımlı olmalıdır (`algorithms`,
`operating-systems` ve `supporting-fundamentals` tanımlıdır; yeni makaleler kod değişikliği
istemez).
**Not:** SVG'yi düzenlemek `content_hash`'i etkilemez (hash yalnızca .md gövdesi üzerinden alınır),
ama diyagramı yeniden çekip görsel olarak denetlemek gerekir.

**Doğrulama sırası — iki farklı sunucu gerekiyor.** Browser paneli bu ortamda piksel ekran
görüntüsü veremiyor; hem render hem E2E headless Playwright ile yapılır ama **aynı sunucuyla
yapılamaz**:

1. Önce dev sunucusu varsa durdur, `pnpm build` çalıştır (zorunlu kapı, `.next`'i dev ile
   paylaşamaz).
2. **Render doğrulaması için:** `corepack pnpm exec next dev -p 3100 -H 127.0.0.1` — gate env'i
   **vermeden**; dev'de kapı devre dışı kalır ve makale sayfaları girişsiz açılır. Betikler
   gitignore'daki `artifacts/boun-render/` altındadır; bu batch'in sürümleri `shot-batch5.mjs`
   (27 kombinasyon + `/boun`) ve `figs-b5.mjs` (diyagram başına ekran görüntüsü, light + dark).
   İkisi de taban adresi `RENDER_BASE` ortam değişkeninden alır ve slug listesi başta durur —
   sonraki batch için tek yapılacak şey o üç satırı `sed` ile değiştirmektir. Tema,
   `localStorage["anil-lib:reader-preferences:v1"]` içine tam `preferencesSchema` nesnesi
   yazılarak seçilir (`anil-lib:theme` anahtarı sepia'yı uygulamaz).
3. **E2E için:** aynı sunucu **kullanılamaz**. `playwright.config.ts` gate env'ini yalnızca kendi
   `webServer` sürecine verir, o komut da bu makinede çalışmıyor; `reuseExistingServer: true`
   olduğu için gate'siz sunucu sessizce yeniden kullanılır ve `auth.spec.ts` ile ona bağlı bütün
   testler yanlışlıkla başarısız olur. Doğru yol: gate'siz sunucuyu durdur, sonra sunucuyu
   **config'deki test değerleriyle** başlat —
   `SITE_PASSWORD_SHA256=2e10d6962af01967e05f84ac752471d0db86b9123ff0e32536d31102f2cef855`
   ve `AUTH_COOKIE_SECRET=e2e-test-signing-secret-must-be-at-least-32-chars-long` — ardından
   `corepack pnpm exec playwright test` çalıştır. Doğru kurulduğunun hızlı işareti: gate'li
   sunucuda `/boun` 307 döner, `/login` 200 döner.
4. **Sunucuyu durdurmak:** `TaskStop` yetmez, süreç yaşamaya devam eder. `netstat -ano` ile
   3100'ü dinleyen PID bulunup `Stop-Process -Id <pid> -Force` çalıştırılmalı; ardından portun
   gerçekten kapandığı doğrulanmalıdır.
5. **Paralel bir oturum aynı depoda `pnpm dev` çalıştırıyorsa 1–4 çalışmaz**: iki Next süreci
   `.next` dizinini paylaşır ve sayfalar "missing required error components, refreshing..." döner.
   Çalışan yalıtım: depoyu **aynı sürücüde** bir kopyaya çıkar (`tar` ile `node_modules`,
   `.next` ve `.git` hariç), kopyanın içindeki `node_modules` için depodakine bir dizin
   junction'ı kur (`cmd /c mklink /J`), sonra build, dev ve e2e'yi orada çalıştır
   (`PLAYWRIGHT_PORT=3101`). Junction farklı sürücüdeyse webpack mutlak yolları çözemez ve build
   patlar. Temizlikte **önce** junction'ı `cmd /c rmdir` ile kaldır; `rm -rf` junction'ı takip
   edip gerçek `node_modules`'ü silebilir. Bu run'da çakışma olmadığı için gerekmedi.

## Non-normative history

- **2026-08-30 (Batch 5, `BATCH=3+1`):** Makale 16–18 yayımlandı; **Faz B kapandı, Faz C açıldı**
  ve `algorithms` kategori klasörü kod değişikliği olmadan devreye girdi. CMPE300 sayfası yeniden
  doğrulandı ve katalog tanımı ile ders çıktıları ayrımı kayda geçti. Doğrulama: BOUN içerik + SVG
  + hash + entegrasyon denetleyicileri temiz, `pnpm typecheck` temiz, `pnpm test` 256/256,
  `pnpm build` başarılı (69 statik sayfa, 18'i `/boun`), global id/slug benzersizliği 62/62,
  Playwright 21 geçti / 1 atlandı / 4 önceden-var başarısız, 27 render kombinasyonu ve 6 diyagram
  ekran görüntüsüyle doğrulandı.
- **2026-08-30 (Batch 4, `BATCH=3+1`):** Makale 13–15 yayımlandı; Faz B'nin ikinci yarısı kuruldu
  ve CLRS 4. baskının yedi bölüm adı daha doğrulandı. Doğrulama: BOUN içerik + SVG + hash +
  entegrasyon denetleyicileri temiz, `pnpm typecheck` temiz, `pnpm test` 241/241, `pnpm build`
  başarılı (62 statik sayfa, 15'i `/boun`), global id/slug benzersizliği 55/55, Playwright
  21 geçti / 1 atlandı / 4 önceden-var başarısız, 27 render kombinasyonu ve 6 diyagram ekran
  görüntüsüyle doğrulandı.
- **2026-08-29 (Batch 3, `BATCH=3+1`):** Makale 10–12 yayımlandı; Faz B'nin gövdesi kuruldu ve
  CLRS 4. baskı bölüm numarası borcu kapandı. Doğrulama: BOUN içerik + SVG + hash + entegrasyon
  denetleyicileri temiz, `pnpm typecheck` temiz, `pnpm test` 218/218, `pnpm build` başarılı
  (55 statik sayfa, 12'si `/boun`), global id/slug benzersizliği 48/48, Playwright 21 geçti /
  1 atlandı / 4 önceden-var başarısız, 27 render kombinasyonu ve 6 diyagram ekran görüntüsüyle
  doğrulandı.
- **2026-08-29 (Batch 2, `BATCH=3+1`):** Makale 7–9 yayımlandı; Faz A kapandı, Faz B açıldı.
  Doğrulama: BOUN içerik + SVG + hash + entegrasyon denetleyicileri temiz, `pnpm typecheck` temiz,
  `pnpm test` 208/208, `pnpm build` başarılı (49 statik HTML, 9'u `/boun`), Playwright 21 geçti /
  1 atlandı / 4 önceden-var başarısız, 27 render kombinasyonu ve 6 diyagram ekran görüntüsüyle
  doğrulandı.
- **2026-08-29 (Batch 1, `BATCH=3+1`):** Makale 4–6 yayımlandı. Doğrulama: BOUN/AI içerik + SVG +
  hash + entegrasyon denetleyicileri temiz, `pnpm typecheck` temiz, `pnpm test` 182/182,
  `pnpm build` 41 statik sayfa, global article-id benzersizliği 34/34, 27 render kombinasyonu ve
  6 diyagram ekran görüntüsüyle doğrulandı.
- **2026-08-29 (Batch 0, `BATCH=3+1`):** Platform entegrasyonu kuruldu ve makale 1–3 yayımlandı.
  Doğrulama: BOUN/AI içerik + SVG + hash + entegrasyon denetleyicileri temiz, `pnpm typecheck`
  temiz, `pnpm test` 173/173, `pnpm build` 38 statik sayfa (18 `/read` + 10 `/seri` + 3 `/boun`),
  global article-id benzersizliği 31/31, üç temada ve üç genişlikte gerçek render doğrulandı.
- **2026-08-28:** Seri, Fable 5 master kurulum görevinde tasarlandı: resmî kaynak doğrulaması
  (ARASTIRMA.md), 5 faz / 41 başlıklık omurga, sözlü mülakat pedagojisi ve bu state zinciri
  oluşturuldu. Makale gövdesi yazılmadı (kurulum görevi üretim run'ı değildir).
