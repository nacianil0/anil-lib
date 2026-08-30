# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-08-30 · Durum: **1–21 yayında (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9, Batch 3: 10–12, Batch 4: 13–15, Batch 5: 16–18, Batch 6: 19–21) · Sıradaki: 22**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 21 — `acgozlu-algoritmalar-ne-zaman-ve-neden-calisir` |
| Sıradaki güvenli başlangıç | Makale 22 ("Dinamik Programlama") — Faz C'nin tasarım deseni üçlüsünün sonuncusu; run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 7` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kullanılan kategoriler | 1 → `interview-method`, 2–8 → `discrete-math`, 9–16 → `data-structures`, 17–21 → `algorithms` (klasör adı `category` alanıyla birebir aynı) |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN (katalogdan türetilir, yeni makale kod değişikliği istemez) |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 6'da ne yapıldı

1. **Makale 19–21 yayımlandı** (`classification_batch: 6`), her biri 2 diyagramla ve 2–3 sözlü
   checkpoint kutusuyla. Faz C'nin **formalleştirme üçlüsü kapandı** (17 ölçü, 18 özyinelemeli
   maliyet, 19 doğruluk) ve **tasarım deseni bölümü açıldı** (20 böl-yönet, 21 açgözlü).
2. **Makale 20'nin başlığı değiştirildi.** Yol haritasındaki taslak başlık "Böl ve Yönet" idi;
   makalenin tezi "bölmek tek başına hiçbir şey kazandırmaz, kazanç a'yı düşürmek ya da g(n)'i
   ucuzlatmaktır" olduğu için başlık **"Böl ve Yönet: Kazanç Nereden Gelir?"** oldu. `roadmap.json`
   satırı `entegre-batch` çalıştırılmadan **önce** elle güncellendi; araç başlık uyuşmazlığında
   yazmayı reddediyor (aşağıdaki araç sırası notuna bakınız).
3. **Seride ilk kez fenced kod bloğu (```) kullanıldı** — makale 19'da üç sözde kod bloğu var
   (eklemeli sıralama, ikili arama, hızlı üs alma). Platform bunu zaten destekliyordu
   (`globals.css` içindeki `.prose-reader pre` ve `pre code` kuralları, `overflow-x: auto`,
   JetBrains Mono); **kod değişikliği gerekmedi** ve render ayrıca doğrulandı. Dikkat: içerik
   denetleyicisinin kelime sayacı kod satırlarını **düzyazı sayar**, dolayısıyla uzun bloklar
   1.800–3.200 bandını zorlar.
4. **Yayımlanmış sözler ödendi.** Makale 18'in en somut vaadi (döngü değişmezinin üç adımı, boş
   doğruluğun başlatmayı bedava kılması, eklemeli sıralamanın ve ikili aramanın satır satır
   ispatı) 19'da bütünüyle karşılandı. Makale 17'nin kesişim noktası pini 20'de tabana devretme
   eşiği olarak, 18'in özyineleme ağacı ve Master Teoremi pinleri 20'de tasarım aracı olarak,
   3'ün karşı örnek disiplini 21'de dört seçim kuralının üçünün kırılmasında, 7'nin ekstremal
   argümanı 21'de değişim argümanı olarak ödendi. Ayrıntı: YOL-HARITASI'nın kavram-tekrar defteri.
5. **Yeni birincil kaynaklar okundu:** 6.042J ders kitabının **5.4 State Machines** bölümünün
   tamamı (Floyd'un Değişmez İlkesi, kısmi doğruluk/sonlanma ayrımı, hızlı üs alma, türetilmiş
   değişkenler); **MIT 6.046J Bahar 2015 Lecture 1** (aralık çizelgeleme, dört kural, değişim
   argümanı); **MIT 6.046J Güz 2005 Lecture 3** (böl-yönetin üç adımı, matris çarpımı, Strassen)
   ve **Lecture 16** (greedy hallmark, kes-yapıştır); **MIT 6.006 Güz 2011 Lecture 11** (Karatsuba);
   Sedgewick & Wayne 2.1, 3.1 ve 5.5 sayfaları. Ayrıntı ARASTIRMA §11'de.
6. **Batch 5'ten kalan ε borcu kapandı.** Ortamda `pypdf` bulunduğu görüldü; 6.042 PDF'inin
   Master Teoremi sayfası onunla yeniden çıkarıldı ve **ε her iki durumda da doğrudan okundu**,
   Durum 3'ün üssündeki "+" işareti de "C" kodlamasıyla göründü. Eksi işaretinin belgenin **her
   yerinde** düştüğü, bilinen bir formülle ((z − 1)/2) ayrıca denetlendi. Ayrıntı ARASTIRMA §11'in
   sonundaki yöntem notunda.
7. **Bütün sayısal iddialar bağımsız hesaplandı** (ARASTIRMA §11 sonundaki liste): eklemeli
   sıralamanın iki değişmezi her adımda `assert` ile denetlendi, ikili aramanın izi ve 0–99 için
   bütün aramaları doğrulandı, sonsuza dönen hatalı sürüm gösterildi, hızlı üs alma 200 çiftte
   denendi, Karatsuba kodlanıp 200 rastgele çarpımda doğrulandı, medyan bulmada grup boyutunun
   neden 5 olduğu bağıntı sayısal olarak çözülerek gösterildi, aralık çizelgelemenin üç karşı
   örneği kaba kuvvet optimal ile karşılaştırıldı, en erken biten kuralı 200.000 örnekte sınandı,
   Huffman'ın optimalliği bütün ikili ağaç şekilleri üzerinde kaba kuvvetle doğrulandı.
8. **Regresyon korundu**: `/read` 18 makalelik ana kütüphane ve AI serisinin `/seri` rotaları,
   id/slug/order/hash bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi.
   `/boun` 18 → 21 sayfa. `src/`, `tests/` ve `tools/` altında tek satır değişmedi; bu batch
   yalnızca içerik ve dokümandır (`artifacts/` altındaki render betikleri gitignore'dadır).

## Açık borçlar

- **SOZLESME §5 güncellenmeli (kullanıcı onayı gerekir).** §5 hâlâ "Şu an platformda BOUN içerik
  sözleşmesi yoktur (0 makale)" diyor; bu artık yayımlanmış gerçekle çelişiyor (21 makale).
  Sözleşme yalnızca kullanıcının açık talebiyle değiştirilebildiği için bu run'da da dokunulmadı.
  Nihai kategori sözlüğü yukarıdaki tabloda ve YOL-HARITASI'ndadır.
- **CLRS 4. baskının 18. bölümünün adı doğrulanamadı** ve alt bölüm **başlıkları** hiçbir bölüm
  için doğrulanamadı (yalnızca alt bölüm numaralarının varlığı doğrulandı). Denenen ve sonuç
  vermeyen yollar ARASTIRMA §8'de listelidir. Pratik sonucu: CLRS'e **bölüm düzeyinde** atıf
  yapılır. Batch 7 için **doğrulanması gereken bölüm adları:** 14 (dinamik programlama olduğu
  varsayılıyor, doğrulanmadı), 21 ve 22 (MST ile en kısa yollar, doğrulanmadı). Doğrulanmış
  olanlar: 2 (Getting Started), 4 (Divide-and-Conquer), 9 (Medians and Order Statistics),
  15 (Greedy Algorithms).
- **Makale 19'un üç adım adı (başlatma/koruma/sonuçlanma) birincil kaynakla doğrulanamadı.**
  Adlandırma CLRS 2. bölümündendir ve bölüm adı doğrulanmıştır, ama üç adımın metni erişilebilir
  bir kaynakta görülemedi; kavramın kendisi 6.042'nin Değişmez İlkesiyle bağımsız olarak kuruldu.
  Erişilebilir bir CLRS örneği bulunursa atıf sıkılaştırılabilir.
- **Makale 13'ün `azalt_anahtar` (decrease-key) borcu duruyor.** Graf algoritmaları makalesi (23)
  Dijkstra ve Prim için bu işlemi açmak zorundadır. Makale 21 köprüyü genişletti: Huffman'ın
  "en seyrek iki simgeyi çek" adımı öncelik kuyruğunun ikinci kanonik kullanımıdır.
- **Yönlü graflarda güçlü bağlı bileşenler makale 16'da bilinçli olarak dışarıda bırakıldı**
  (tanımı verildi, algoritması verilmedi). 25'te indirgeme grafları tartışılırken açılabilir.
- **Karar ağacı kuramının formal hâli 24'e ertelendi** (14, 15 ve 17'nin ortak borcu). 17,
  yükseklik lemmasını ve log₂(n!) = Θ(n log n) adımını ödedi; geriye kuramın kendisi ve randomize
  algoritmaların beklenti analizi kaldı.

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
- **Depoda satır sonları karışık ve `sync-series-hashes.cjs` buna duyarlıdır.** `core.autocrlf`
  repo düzeyinde `true`; BOUN makalelerinin 18'i çalışma ağacında LF, 3'ü (7, 8, 9) CRLF. Hash
  gövdenin **bayt** hâli üzerinden alındığı için taze bir checkout'ta LF dosyaların hash'i
  değişebilir. **Uygulama bundan etkilenmez**: `src/lib/content/articles.ts` katalogdaki
  `contentHash` ile frontmatter'daki `content_hash` **dizgelerini** karşılaştırır, gövdeden
  yeniden hesaplamaz. Yalnızca `sync-series-hashes.cjs` çalışma ağacına duyarlıdır. Bağımsız bir
  denetim betiği yazarken dosyayı **binary/`newline=""`** okumak gerekir; aksi hâlde Python'ın
  evrensel satır sonu çevirisi sahte uyuşmazlık üretir (bu run'da bir kez üretti).
- **AI serisi paralel bir oturumda ilerliyor.** Bu run sırasında AI kataloğu 30 makaleye çıkmıştı
  ve `content/series/articles/` altında git'te takipsiz dosyalar birikti. BOUN kapsamı dışıdır;
  `pnpm test` sayısı ve `check-series-*` dosya sayıları o oturumun ilerlemesiyle değişir,
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
  yakalamaz; bütün SVG'ler `xml.etree.ElementTree` ile ayrıca ayrıştırılarak denetlendi (42/42).
- **SVG metin taşma denetimi karakter sayısına dayanır**: genişlik ≈ `karakter × font-size × 0,55`.
  Font 13 için x = 20'den başlayan satır **en fazla ~97 karakter**, x = 375'ten başlayan satır
  **en fazla ~48 karakter** olabilir. Bu run'da iki satır bu sınırı aştı ve kısaltıldı.
- **Python'ın varsayılan konsol kodlaması Türkçe karakterleri patlatıyor**; betikleri
  `PYTHONIOENCODING=utf-8` ile çalıştır.
- **Ortamda PDF'i görüntüye çeviren araç yok** (`pdftoppm`, `pymupdf`, `pdf2image` yok);
  `/mingw64/bin/pdftotext` ve Python `pypdf` var. **`pypdf`, `pdftotext`'in düşürdüğü matematik
  yazı tipini doğru çözer** — 6.042 gibi formül ağırlıklı PDF'lerde önce onu dene.

## Bu run'da doğrulananlar

- İçerik/SVG/hash/entegrasyon denetleyicileri: BOUN 21 makale + 42 diyagram temiz;
  `entegre-batch` kuru çalışması yeni 3 makaleyi buldu, `--write` sonrası fark kalmadı. Katalog ↔
  frontmatter ↔ gövde hash üçlüsü **ve** başlık/sıra/kategori/klasör eşleşmesi bağımsız bir
  Python betiğiyle de doğrulandı: 21/21. `reading_order` 1–21 kesintisiz; kohort dağılımı
  3/3/3/3/3/3/3; makalelerin gövdesinde referans verilen 42 SVG yolunun hepsi diskte mevcut;
  roadmap'in "yayinda" kümesi katalogla birebir aynı.
- `pnpm typecheck` temiz · `pnpm test` **277/277** · `pnpm build` başarılı. Kapılar iki kez
  çalıştırıldı: entegrasyondan hemen sonra **76 statik sayfa** (`/boun/[slug]` 21, `/read/[slug]`
  18, `/seri/[slug]` 30), iki diyagram düzeltmesinden sonra ise **80 statik sayfa** — aradaki fark
  BOUN'dan değil, paralel AI oturumunun kataloğu 30 → 34'e çıkarmasından gelir. **BOUN tarafı iki
  koşuda da aynıdır** (21 `/boun` yolu) ve her ikisinde de bütün testler geçti. Unit test sayısı
  sabit bir referans **değildir** (`series-assets.test.ts` asset klasörünü gezer ve AI serisi
  paralel büyüyor); sabit referans testlerin **tamamının** geçmesidir.
- Global article-id ve slug benzersizliği: birinci ölçümde **69/69** (18 ana + 30 AI + 21 BOUN),
  run sonundaki ikinci ölçümde **73/73** (AI 34'e çıktığı için).
- **Gerçek render (ekran görüntülü):** üç yeni makale, üç genişlik (375 / 768 / 1440) × üç tema
  (light / dark / sepia) = 27 kombinasyonda tarayıcıda açıldı, ayrıca `/boun` girişi üç genişlikte
  kontrol edildi. Her sayfada 2 inline SVG, doğru figcaption, yatay taşma yok
  (`documentElement.scrollWidth == innerWidth`), raw anahtar / undefined sızıntısı yok, tek console
  hatası bilinen 503 sync çağrısı. 375px'te diyagramlar beklendiği gibi kendi kabında yatayda
  kayıyor (clientWidth 298 / scrollWidth 544), sayfa kaymıyor. **Altı diyagramın hepsi light ve
  dark temada tek tek görsel olarak incelendi**; iki çakışma bulundu ve düzeltildi (makale 19'un
  1. şeklinde ok, dizi hücrelerinin üstünden geçiyordu; makale 20'nin 2. şeklinde bir etiket
  "alt teğet" yazısıyla üst üste biniyordu), düzeltmeden sonra yeniden çekilip denetlendi.
- **Kod bloğu render'ı ayrı doğrulandı:** makale 19'daki üç `pre` öğesi desktop ve mobile ×
  light ve dark kombinasyonlarında açıldı; JetBrains Mono, 13,44px, `overflow-x: auto`, sayfada
  yatay taşma yok, 375px'te blok kendi içinde kayıyor. Ekran görüntüleriyle gözle de denetlendi.
- **Markdown kaçış denetimi:** `log_b a` ve `n^(log_b a)` gibi alt çizgili ifadelerin italik'e
  dönüşmediği önceki batch'lerde doğrulanmıştı; bu batch'te kod blokları içindeki `<` ve `>`
  karakterlerinin ham HTML denetimini tetiklemediği ve render'da bozulmadığı denetlendi
  (denetleyici tek tırnaklı kod aralıklarını silerken üçlü tırnaklı blokları da temizliyor).
- **Playwright: 21 geçti, 1 atlandı, 4 başarısız** — dördü de "önceden-var" listesindedir ve BOUN
  içeriğiyle ilgisizdir: üçü `reader-data.spec.ts` (DATABASE_URL yok), biri `reader.spec.ts:231`
  (`Ekstra Geniş` strict-mode ihlali). Bu, Batch 1–5'in referans sonucuyla birebir aynıdır.
- Bu run'da build, dev ve E2E **doğrudan depoda** çalıştırıldı; paralel AI oturumu bu sırada
  `pnpm dev` çalıştırmadığı için yalıtılmış kopyaya gerek kalmadı (kopya tarifi aşağıda duruyor).

## Sıradaki batch hazırlığı — Batch 7 (Makale 22'den itibaren)

**Pedagojik hedef:** Makale 22, Faz C'nin tasarım deseni üçlüsünü kapatır. 20 **parçalayarak**,
21 **seçerek** çözüyordu; 22 **hatırlayarak** çözer. İki makale de tam olarak 22'ye çıkan birer
çöküş bıraktı: 20'de naif Fibonacci'nin örtüşen alt problemleri, 21'de ağırlıklı aralık
çizelgelemenin açgözlüyü kırması. 23'ten itibaren fazın karakteri yeniden değişir: 17–19 **analiz**,
20–22 **tasarım desenleri**, 23–25 **uygulama ve sınırlar**.

**Prerequisite satırları (22–24 için taslak; YOL-HARITASI'nda da var):**
- 22 ← 21 (açgözlünün çöktüğü üç yerin ortak nedeni), 20 (özyineleme ağacındaki tekrar eden düğüm = örtüşen alt problem; naif Fibonacci), 18 (yineleme çözme ve maliyet muhasebesi), 16 (DAG üzerinde işlem sırası), 19 (tablolamanın döngü değişmezi)
- 23 ← 16 (graf temsilleri, BFS ve doğrusal zaman Θ(|V| + |E|)), 13 (öncelik kuyruğu ve ödenmemiş `azalt_anahtar` borcu), 21 (Kruskal ile Prim açgözlüdür; kesit teoremi bir değişim argümanıdır), 7 (kapsayan ağaç ve n − 1 kenar), 18 (Master Teoremiyle maliyet savunması)
- 24 ← 17 (karar ağacı yükseklik lemması ve log₂(n!) = Θ(n log n)), 14–15 (karar ağacı argümanının arama ve sıralama hâlleri), 15 (rastgeleleştirilmiş hızlı sıralama), 20 (medyan bulmadaki eşit olmayan alt problemler), 8 (birleşme → paralel indirgeme)

**Araştırma ihtiyacı:** Resmî sayfa borcu **yok** — CMPE250 ve CMPE300 son olarak 2026-08-30'da
doğrulandı ve Faz C boyunca geçerlidir. Akademik kaynaklar için hazır ipuçları:
- **22 için kaynak kısmen okunmuş durumda:** 6.046J Bahar 2015 **Lecture 1**, ağırlıklı aralık
  çizelgelemenin DP çözümünü zaten veriyor (Rₓ = {j ∈ R | s(j) ≥ x}, opt(R) = max(w(i) +
  opt(R_{f(i)})), n alt problem, O(n²) ve O(n log n)'e indirilebileceği). İkinci kaynak olarak
  6.006 Bahar 2020'nin dinamik programlama ders notları (**Lecture 15–19 aralığı; hangi numaraların
  DP olduğu doğrulanmalı**) ve CLRS **14. bölüm** (adı doğrulanmalı) kullanılabilir. Klasik
  örnekler: LCS, 0/1 sırt çantası, ağırlıklı aralık çizelgeleme.
- **23 için iki kaynak elde:** 6.046J Güz 2005 **Lecture 16** bu run'da indirilip okundu (MST,
  optimal altyapı, kesit teoremi, Prim); Sedgewick & Wayne **4.3 (Minimum Spanning Trees)** ve
  **4.4 (Shortest Paths)** sayfaları algs4.cs.princeton.edu'dan okunabilir; 6.006 Bahar 2020'nin
  ağırlıklı en kısa yol / Bellman-Ford / Dijkstra ders notları da vardır. CLRS 21 ve 22. bölüm
  adları **doğrulanmalı**.
- **24 için hazır adaylar:** 6.006 Bahar 2020 **Lecture 5 (Linear Sorting)** alt sınır tartışmasını
  içerir (Batch 4'te okunmuştu); 6.046J Bahar 2015'in randomize algoritmalar ve paralel algoritmalar
  dersleri (lecture-notes sayfasındaki başlıklardan seçilmeli); CMPE300 ders çıktısı "Parallel
  architectures and parallel algorithms will be studied in detail" ve CMPE250 katalog tanımındaki
  "Parallel algorithms" başlığı bu makalenin resmî dayanağıdır.

**PDF çözümleme yöntemi (Batch 3–6'da çalıştı):** OCW ders listesi sayfasındaki kaynak adresi bir
HTML sayfasıdır; içindeki `..._MIT6_006S20_lecN.pdf` (ya da `..._MIT6_046JS15_lecNN.pdf`,
`..._MIT6_006F11_lec11.pdf`, `..._lec3.pdf`) bağlantısı `grep -oE '/courses/[^"\\]*\.pdf'` ile
çıkarılıp `https://ocw.mit.edu` ön ekiyle indirilir. Güz 2005 dersinde bağlantılar doğrudan ders
listesi sayfasındadır; Bahar 2015 ve Güz 2011 derslerinde önce `resources/lecture-N-notes/`
sayfası çekilmelidir. Metne çevirmek için **önce `python -c "import pypdf"` ile `pypdf`'i dene**
(matematik simgelerini doğru çözer), formül yoksa `/mingw64/bin/pdftotext -layout` daha okunaklı
sütun düzeni verir. **Uyarı:** tablolar `pdftotext`'te sütun kaymasıyla çıkar, satır–sütun
eşleşmesi elle denetlenmelidir.

**Yayımlanmış makalelerin verdiği sözler.** Makale 19–21 de **numaralı ileri vaat vermedi**;
bütün ileri göndermeler konu adıyla yapıldı. Teslim edilmesi zorunlu konular:

- **22'de karşılanmalı (makale 20 ve 21'in ortak, en somut vaadi):** örtüşen alt problemlerin
  teşhisi ve çözümü; **yukarıdan aşağı bellekleme ile aşağıdan yukarı tablolama** ayrımı;
  ağırlıklı aralık çizelgelemenin DP çözümü; "bunu açgözlüyle çözemez miydin?" karşılaştırması
  (21'in kapanış cümlesi bunu adıyla vaat etti); DP'nin **yalnızca optimal altyapı** istediği,
  açgözlü seçim özelliğini istemediği; DAG üzerinde işlem sırası (16'nın topolojik sıralama pini);
  tablolama döngüsünün değişmezi (19'un aracı).
- **23'te karşılanmalı:** MST ve en kısa yollar; `azalt_anahtar` (13'ün borcu); BFS'in ağırlıklı
  genellemesi olarak Dijkstra (16); graf için doğrusal zaman dili Θ(|V| + |E|) (16); kesit
  teoreminin bir değişim argümanı olduğu (21).
- **24'te karşılanmalı (üç makalenin ortak borcu):** karar ağacı kuramının formal hâli ve
  randomize algoritmaların beklenti analizi; ayrıca paralel algoritmalar (CMPE250 ve CMPE300'ün
  karşılanmamış tek başlığı).
- **Konu bazlı, numarasız pinler (19–21'den):** kısmi doğruluk ↔ sonlanma ayrımı (19 → 22, 29–31);
  durum makinesi ve korunan değişmez (19 → 26–27, 29, 31); azalan ölçü (19 → 22, 31); değişmezi
  keşfetmenin zorluğu (19 → 22); iki kaldıraç a ve g(n) (20 → 23, 24); örtüşen alt problemler
  (20 → 22); eşit olmayan alt problemler (20 → 24); açgözlü seçim özelliği ile optimal altyapının
  ayrılması (21 → 22, 23); değişim argümanı (21 → 23, 24); ağırlıklı aralık çizelgeleme
  (21 → 22); önek-serbest kod ve bit muhasebesi (21 → 34, 39).
- Batch 0–5'ten devreden numarasız pinler: minimum kapsayan ağaç (7 → 23), ortalama durumun dağılım
  varsayımı → olasılık makalesi (9 → 36), girdi boyutunun sayı mı basamak mı olduğu → hesaplamanın
  sınırları (9 → 25), sayılabilirlik → durma problemi (5 → 25), alt sınır ispatı (6 → 24), doğum
  günü ilkesinin olasılık hâli (6 → 36), zamanlayıcı kuyruğu ve çağrı yığını → işletim sistemleri
  fazı (10 → 27–28), disk tabanlı arama yapıları ve ayırma yöntemleri → dosya sistemleri (12 → 34),
  indeks = B-ağacı → veritabanları (12 → 39), bellek hiyerarşisi (9, 12 → 37), d-yollu heap
  (13 → 24), rastgeleleştirme (14, 15 → 24, 36), kararlılığın veritabanı karşılığı (15 → 39),
  dış sıralama (15 → 34), `azalt_anahtar` (13 → 23), ters bitiş sırası (16 → 22, 25),
  log₂(n!) = Θ(n log n) (17 → 24), sayma sıralamasının zincirleri (14, 15 → 24).

**Görselleştirme öngörüsü:** 22: aynı özyineleme ağacının bellekleme öncesi ve sonrası hâli —
tekrar eden düğümlerin tek bir düğüme indirgenmesi ve çağrı sayısının üstelden doğrusala düşmesi;
ve bir DP tablosunun hücre hücre doldurulması, hücreler arası bağımlılık oklarıyla. 23: aynı graf
üzerinde MST ile en kısa yollar ağacının **farklı** çıkması (klasik ve çok öğretici bir karşı
sezgi); ve Dijkstra'nın öncelik kuyruğu adımlarının tablo hâlinde izlenmesi. 24: karar ağacının
yaprak sayısı ile yükseklik ilişkisinin formal şeması; ve iş/derinlik (work/span) ayrımının paralel
bir indirgeme ağacında gösterilmesi.
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval `viewBox="0 0 720 H"`, metin ≥13 birim,
renk yalnızca `var(--...)`, marker id'leri makale genelinde benzersiz — `boun-a<N>-...` kalıbı,
`<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılır. Kullanılabilir değişkenler: `--text`,
`--text-muted`, `--text-faint`, `--border`, `--surface`, `--surface-muted`, `--accent`,
`--accent-soft`, `--cool`, `--cool-soft`. Satır uzunluğu sınırı için "bilinen sorunlar"a bak.)

**Sözlü checkpoint tohumları:** "Bir problemin dinamik programlamaya uygun olduğunu nereden
anlarsın — hangi iki özelliği ararsın?"; "Bellekleme ile tablolama arasındaki farkı ve hangisini
ne zaman seçeceğini anlat"; "Ağırlıklı aralık çizelgelemeyi açgözlüyle çözemiyoruz; DP çözümünü
tahtaya kur ve maliyetini savun".

**Araç sırası (Batch 1–6'da doğrulandı):** katalog var olduğu için `sync-series-hashes.cjs`
yalnızca **katalogdaki** makaleleri gezer. Doğru sıra:
1) **başlık değişecekse `roadmap.json`'daki ilgili satırı önce elle güncelle** — `entegre-batch`
   roadmap başlığı frontmatter başlığıyla birebir eşleşmezse bunu "sorun" sayar ve **yazmaz**,
2) makaleleri yaz (frontmatter `content_hash` alanına 64 sıfırdan oluşan yer tutucu koy),
3) `entegre-batch.cjs --series=boun` (kuru çalışma; başlık/sıra/kohort denetimi),
4) `entegre-batch.cjs --series=boun --write` (katalog + roadmap),
5) `sync-series-hashes.cjs --series=boun --write` (frontmatter **ve** katalog hash'lerini düzeltir),
6) denetleyicileri tekrar çalıştır. Gövdeyi sonradan düzenlersen 5. adımı yeniden çalıştır.
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
   gitignore'daki `artifacts/boun-render/` altındadır; bu batch'in sürümleri `shot-batch6.mjs`
   (27 kombinasyon + `/boun`), `figs-b6.mjs` (diyagram başına ekran görüntüsü, light + dark) ve
   yeni eklenen `pre-b6.mjs` (kod bloğu denetimi). Üçü de taban adresi `RENDER_BASE` ortam
   değişkeninden alır ve slug listesi başta durur — sonraki batch için tek yapılacak şey o üç
   satırı `sed` ile değiştirmektir. Tema, `localStorage["anil-lib:reader-preferences:v1"]` içine
   tam `preferencesSchema` nesnesi yazılarak seçilir (`anil-lib:theme` anahtarı sepia'yı uygulamaz).
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

- **2026-08-30 (Batch 6, `BATCH=3+1`):** Makale 19–21 yayımlandı; Faz C'nin **formalleştirme
  üçlüsü kapandı ve tasarım deseni bölümü açıldı**. Makale 20'nin taslak başlığı pedagojik
  gerekçeyle genişletildi, seride ilk kez fenced kod bloğu kullanıldı (kod değişikliği gerekmedi)
  ve Batch 5'ten kalan Master Teoremi ε borcu `pypdf` ile kapatıldı. Doğrulama: BOUN içerik + SVG
  + hash + entegrasyon denetleyicileri temiz (21 makale, 42 diyagram), `pnpm typecheck` temiz,
  `pnpm test` 277/277, `pnpm build` başarılı (21'i `/boun` olmak üzere 76, ikinci koşuda 80 statik
  sayfa), global id/slug benzersizliği 69/69 ve run sonunda 73/73, Playwright 21 geçti / 1 atlandı
  / 4 önceden-var başarısız, 27 render kombinasyonu, 6 diyagram (light + dark) ve 3 kod bloğu
  (desktop + mobile × light + dark) ekran görüntüsüyle doğrulandı.
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
