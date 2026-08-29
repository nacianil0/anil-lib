# BOUN CmpE Serisi — Resmî Kaynak ve Kanıt Defteri

> Karar taşıyan kaynakların kalıcı kaydı. Kural: resmî gerçek, tasarım çıkarımı ve informal
> sinyal birbirinden ayrılır; hiçbir kaynak "kesin interview syllabus" gibi sunulmaz.
> Kaynak önceliği: (1) güncel resmî Boğaziçi CmpE graduate/interview bilgisi, (2) güncel resmî
> curriculum/course catalog/prerequisite/ders materyali, (3) standart textbook ve güvenilir
> akademik kaynak, (4) açıkça etiketlenmiş informal/legacy sinyal.

Erişim tarihi: **2026-08-29** (bütün URL'ler bu tarihte yeniden doğrulandı; üretim run'ları
kapsam kararını etkileyen sayfaları yeniden doğrular ve bu defteri günceller).
Önceki doğrulama: 2026-08-28 (kurulum görevi).

## 1. Resmî gerçekler (doğrudan sayfadan)

### M.Sc. programı ve scientific interview
URL: <https://cmpe.bogazici.edu.tr/graduate/ms-program/>

- Başvurular elektronik yapılır; program tamamen İngilizcedir.
- Seçilen adaylarla **scientific interview** yapılır: "At least two faculty members conduct the
  scientific interview"; her görüşme **10 veya 15 dakika** sürer, görüşmecinin ofisinde yapılır;
  teleconference kabul edilirse uzaktan katılım mümkündür.
- Görüşmenin içeriği (birebir): "a discussion of the candidate's past academic record,
  research direction, skillset, and technical knowledge."
- Nihai değerlendirme: mülakat performansı + öğretim üyesi değerlendirmeleri + transkript +
  referans mektupları.
- **Scientific Preparation dersleri** (gerekli görülürse): **CmpE220** Discrete Computational
  Structures, **CmpE250** Data Structures, **CmpE322** Operating Systems — iki ardışık dönemde,
  en az 2.50 ortalamayla tamamlanmalıdır.

### Güncel lisans müfredatı (2025 revizyonu)
URL: <https://cmpe.bogazici.edu.tr/undergraduate/curriculum/>

Çekirdek zorunlu dersler (dönem sırasıyla): CMPE101, CMPE142/160, **CMPE220/230/250**,
CMPE222/244, **CMPE300/322/343/346**, CMPE320/350/354/362, CMPE492 + seçmeliler.
Matematik: MATH101/102 (Calculus), MATH201 (Matrix Theory), MATH202 (Differential Equations);
olasılık/istatistik **CMPE343** ile verilir.

### Ders katalog tanımları (courses sayfaları)
URL kökü: <https://cmpe.bogazici.edu.tr/courses/>

- **CMPE220** (<https://cmpe.bogazici.edu.tr/courses/cmpe220/>): "Propositional logic and proofs.
  Set theory. Functions and relations. Algebraic structures. Groups and semi-groups. Graphs,
  lattices and Boolean algebra." Önkoşulsuz.
- **CMPE250** (<https://cmpe.bogazici.edu.tr/courses/cmpe250/>): "Graphs. Advanced Sorting.
  Hashing. Heap Structures. Search Structures. Complexity. Parallel algorithms. File
  organization." Önkoşul: CMPE160. **Ad farkı (2026-08-29):** ders katalog sayfası dersin adını
  *Data Structures and Algorithms* olarak veriyor; M.Sc. programı sayfası Scientific Preparation
  listesinde *CmpE250: Data Structures* diyor. Aynı derstir; makalelerde hangi sayfadan
  aktarıldığı belirtilir.
- **CMPE300** (<https://cmpe.bogazici.edu.tr/courses/cmpe300/>): algoritma analizi; karşılaştırmalı,
  özyinelemeli, böl-yönet, dinamik, açgözlü, sayısal ve graf algoritmaları; **lower bound theory**;
  paralel ve olasılıksal algoritmalar; Master Teoremi. Önkoşul: CMPE250.
- **CMPE322** (<https://cmpe.bogazici.edu.tr/courses/cmpe322/>): işletim sistemlerinin evrimi,
  multiprogramming/time-sharing, eşzamanlı süreçler, CPU zamanlama, senkronizasyon, kritik kesim;
  kilitlenme (önleme/kaçınma/tespit/kurtarma), bellek yönetimi (takas, sayfalama, bölütleme,
  sanal bellek), dosya sistemleri, G/Ç, erişim matrisi/yetenekler, Linux vakaları. Önkoşul: CMPE250.

## 2. Tasarım çıkarımları (resmî gerçeklerden türetilen, garanti olmayan yorum)

- Scientific Preparation üçlüsü (220/250/322), bölümün "eksik sayılabilecek temel" tanımının en
  güçlü resmî sinyalidir → serinin çekirdeği bu üç alan + doğal devamı CMPE300'dür.
- Mülakat tanımındaki dört bileşenden ikisi ("skillset, technical knowledge") kavram anlatma ve
  problem çözme pratiği gerektirir; "past academic record, research direction" ise adayın kendi
  geçmişini ve hedefini teknik dille savunmasını gerektirir → seride sözlü anlatım/prova ekseni.
- 10–15 dakikalık format uzun türetme değil, **net tanım + küçük problem + takip sorusu**
  formatını akla getirir → makale pedagojisi kısa, savunulabilir cevap birimlerine odaklanır.
- Bu çıkarımların hiçbiri "bu sorular çıkacak" iddiası değildir; üniversite mülakat syllabus'u
  ilan etmemektedir.

## 3. Informal/legacy sinyaller (düşük ağırlık)

- Öğrenci deneyimi anlatıları ve eski sayfalar bu kurulumda kapsam kararı taşımadı; ileride
  kullanılırsa açıkça "informal sinyal" etiketiyle ve yalnızca vurgu (hangi konuya daha çok
  prova ayrılacağı) için kullanılır, kapsam eklemek/çıkarmak için kullanılmaz.

## 4. Standart akademik dayanaklar (içerik üretiminde birincil ders kaynakları)

Üretim run'ları konu başına güncel doğrulama yapar; başlangıç kanonu:

- Ayrık matematik: Rosen, *Discrete Mathematics and Its Applications*.
- Veri yapıları/algoritmalar: Cormen, Leiserson, Rivest, Stein (CLRS), *Introduction to Algorithms*;
  Sedgewick & Wayne, *Algorithms*.
- İşletim sistemleri: Silberschatz, Galvin, Gagne, *Operating System Concepts*;
  Arpaci-Dusseau, *Operating Systems: Three Easy Pieces* (ücretsiz, güncel).
- Olasılık: Ross, *A First Course in Probability* (CMPE343 düzeyi için).
- Bilgisayar organizasyonu: Patterson & Hennessy, *Computer Organization and Design*.

## 5. Batch 0 üretim run'ında yeniden doğrulanan kaynaklar (2026-08-29)

Aşağıdaki resmî sayfalar bu run'da tek tek yeniden okundu; §1'deki bütün alıntılar sayfalarla
birebir eşleşiyor ve kapsam kararını değiştiren bir fark bulunmadı (tek fark yukarıdaki CMPE250
ad farkıdır).

- M.Sc. programı ve scientific interview: <https://cmpe.bogazici.edu.tr/graduate/ms-program/>
- CMPE220: <https://cmpe.bogazici.edu.tr/courses/cmpe220/>
- CMPE250: <https://cmpe.bogazici.edu.tr/courses/cmpe250/>
- CMPE322: <https://cmpe.bogazici.edu.tr/courses/cmpe322/>
- Lisans müfredatı: <https://cmpe.bogazici.edu.tr/undergraduate/curriculum/> — CMPE220 ve
  CMPE250 üçüncü dönemde; CMPE300, CMPE322 ve CMPE343 beşinci dönemde.

### Makale 1–3'te kullanılan akademik kaynaklar

- Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J. & Willingham, D. T. (2013).
  *Improving Students' Learning With Effective Learning Techniques*. Psychological Science in the
  Public Interest, 14(1). <https://journals.sagepub.com/doi/10.1177/1529100612453266> — pratik
  test etme ve aralıklı çalışma yüksek fayda; yeniden okuma ve vurgulama düşük fayda.
- Fiorella, L. & Mayer, R. E. (2013). *The relative benefits of learning by teaching and teaching
  expectancy*. Contemporary Educational Psychology, 38(4).
  <https://www.sciencedirect.com/science/article/abs/pii/S0361476X13000209> — sözlü checkpoint
  pedagojisinin dayanağı.
- Rosen, K. H. *Discrete Mathematics and Its Applications*. McGraw Hill.
  <https://www.mheducation.com/highered/product/Discrete-Mathematics-and-Its-Applications-Rosen.html>
  — ürün sayfası canlı bir baskı sürümü gösterdiği için makalelerde baskı yılı iddia edilmedi.
- Lehman, E., Leighton, T. & Meyer, A. *Mathematics for Computer Science* (ders notları).
  MIT OpenCourseWare 6.042J.
  <https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/>
  — yazar atfı OCW'nin 6.042J Güz 2010 readings sayfasındaki "courtesy of Eric Lehman, Tom
  Leighton, and Albert Meyer" ifadesiyle doğrulandı.

## 6. Batch 1 üretim run'ında doğrulanan kaynaklar (2026-08-29)

Kapsam kararını taşıyan resmî sayfa bu run'da tekrar okundu ve §1'deki alıntıyla birebir eşleşti:

- CMPE220: <https://cmpe.bogazici.edu.tr/courses/cmpe220/> — ders adı *Discrete Computational
  Structures*, katalog tanımı ve "önkoşulsuz" bilgisi değişmemiştir. Diğer resmî sayfalar
  (M.Sc. programı, CMPE250/300/322, müfredat) kapsamı bu batch'te etkilemediği için yeniden
  çekilmedi; §5'teki 2026-08-29 doğrulaması geçerlidir.

### Makale 4–6'da kullanılan akademik kaynaklar

Bu run'da MIT 6.042J ders kitabının Bahar 2015 PDF'i (yukarıdaki OCW bağlantısı) indirilip içindekiler
tablosu ve ilgili bölümleri doğrudan okundu; makalelerde verilen bölüm numaraları bu baskıya aittir.

- **Bölüm numaraları (Bahar 2015 baskısı, doğrudan içindekilerden):** 1 What is a Proof?,
  2 The Well Ordering Principle (2.3 Factoring into Primes), 3 Logical Formulas,
  4 Mathematical Data Types (4.1 Sets, 4.3 Functions, 4.4 Binary Relations, 4.5 Finite Cardinality),
  5 Induction (5.1 Ordinary Induction, 5.2 Strong Induction), 6 Recursive Data Types
  (6.1 Recursive Definitions and Structural Induction), 7 Infinite Sets,
  9 Directed graphs & Partial Orders (9.6 Partial Orders, 9.10 Equivalence Relations),
  14 Cardinality Rules (14.5 Counting Subsets, 14.8 The Pigeonhole Principle,
  14.9 Inclusion-Exclusion), 16 Events and Probability Spaces (16.4 The Birthday Principle).
- **Hatalı tümevarım örneği (makale 4):** 6.042J §5.1.6 "A Faulty Induction Proof" — "her n atlık
  kümede bütün atlar aynı renktedir" (False Theorem 5.1.3); metin, kopan halkanın P(1) → P(2)
  olduğunu açıkça söyler.
- **Asal çarpanlara ayırma (makale 4):** 6.042J Teorem 2.3.1, iyi sıralama ilkesiyle ispatlanır;
  makalede aynı teorem güçlü tümevarımla kurulup iki yaklaşımın denkliği vurgulandı.
- **Denklik sınıfları ve parçalanış (makale 5):** 6.042J Teorem 9.10.4 — "The equivalence classes
  of an equivalence relation on a set A are the blocks of a partition of A"; mod 5 örneği metinde
  beş sınıfla verilir.
- **Doğum günü ilkesi (makale 6):** 6.042J §16.4 — d günlük yılda karekök(2d) kişi varken çakışma
  olasılığı yaklaşık 1 − 1/e ≈ 0,632; d = 365 için ≈ 27 kişi ve gerçek değer ≈ 0,626. Makalede
  yalnızca **olasılık** tarafına etiketli ileri gönderme olarak kullanıldı (kesinlik iddiası
  güvercin yuvasından gelir).
- **Rosen bölüm numaraları:** makale 4 için 5.1–5.3, makale 5 için 2.1–2.3, 2.5 ve 9.1, 9.5, 9.6,
  makale 6 için 6.1–6.4. Ürün sayfası canlı bir baskı sürümü gösterdiği için baskı yılı yine
  iddia edilmedi (bkz. §5).
- **Sayısal iddialar bağımsız hesaplandı:** 36⁸ = 2.821.109.907.456; C(52,5) = 2.598.960;
  P(8,3) = 336; C(10,3)·3 = 10·C(9,2) = 360; 1–100 arasında 2 veya 3'e bölünen 67 sayı;
  C(1000,2) = 499.500; 10! = 3.628.800; 2³⁰ ≈ 1,07 milyar; üst tam sayı(100/12) = 9;
  uzunluğu n'den kısa ikili dizi sayısı 2ⁿ − 1.

## 7. Batch 2 üretim run'ında doğrulanan kaynaklar (2026-08-29)

Kapsam kararını taşıyan iki resmî sayfa bu run'da tekrar okundu ve §1'deki alıntılarla birebir
eşleşti; kapsamı değiştiren bir fark yoktur.

- CMPE220: <https://cmpe.bogazici.edu.tr/courses/cmpe220/> — ders adı *Discrete Computational
  Structures*, katalog tanımı "Propositional logic and proofs. Set theory. Functions and relations.
  Algebraic structures. Groups and semi-groups. Graphs, lattices and Boolean algebra.", 3 kredi
  (5 ECTS), önkoşulsuz. Makale 7 ve 8'in kapsamı doğrudan bu tanımın son iki cümlesidir.
- CMPE250: <https://cmpe.bogazici.edu.tr/courses/cmpe250/> — ders adı *Data Structures and
  Algorithms*, katalog tanımı "Graphs. Advanced Sorting. Hashing. Heap Structures. Search
  Structures. Complexity. Parallel algorithms. File organization.", 4 kredi (6 ECTS), önkoşul
  CMPE160. §1'deki ad farkı (M.Sc. sayfası *CmpE250: Data Structures* der) sürüyor; makale 9'un
  kaynakçasında bu fark açıkça belirtildi. Faz B'nin resmî dayanağı bu tanımdaki "Complexity"dir.

Diğer resmî sayfalar (M.Sc. programı, CMPE300, CMPE322, müfredat) bu batch'in kapsamını
etkilemediği için yeniden çekilmedi; §5'teki 2026-08-29 doğrulaması geçerlidir.

### Makale 7–9'da kullanılan akademik kaynaklar

MIT 6.042J ders kitabının Bahar 2015 PDF'i bu run'da yeniden indirilip (OCW doğrudan bağlantısı:
`https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/mit6_042js15_textbook.pdf`)
içindekiler tablosu ve kullanılan bölümler sayfadan doğrudan okundu.

- **Bölüm numaraları (Bahar 2015 baskısı, içindekilerden):** 11 Simple Graphs (11.1 Vertex
  Adjacency and Degrees s. 393, 11.8 Simple Walks s. 417, 11.9 Connectivity s. 419, 11.10 Forests
  & Trees s. 424), 12 Planar Graphs, 13 Sums and Asymptotics (13.7 Asymptotic Notation s. 528).
- **El sıkışma lemması (makale 7):** 6.042J **Lemma 11.2.1** (s. 397) — "The sum of the degrees of
  the vertices in a graph equals twice the number of edges"; metin ispatı "her kenar dereceler
  toplamına iki katkı verir" diye tek satırda yapar ve lemmayı *Handshaking Lemma* diye adlandırır.
  Makaledeki tek dereceli düğüm sonucu bu lemmadan türetilen standart bir sonuçtur.
- **Ağaç tanımları ve özellikleri (makale 7):** 6.042J Definition 11.10.1 (döngüsüz graf orman,
  bağlı döngüsüz graf ağaç), Definition 11.10.2 (ormanda derece 1 düğüm yapraktır),
  **Theorem 11.10.3** (altı ağaç özelliği; 2. madde yol tekliği, 5. madde en az iki yaprak,
  6. madde düğüm sayısı kenar sayısının bir fazlası — metin bu maddeyi yaprak silen tümevarımla
  ispatlar), Lemma 11.10.4, **Theorem 11.10.6** (bağlı her grafın kapsayan ağacı vardır).
  Makaledeki "en az iki yaprak" ispatı 6.042J'nin en uzun yol argümanını izler; sayma tabanlı
  ikinci ispat, el sıkışma lemmasından türetilen standart alternatiftir.
- **Yürüyüş/yol/döngü/bağlılık (makale 7):** 6.042J Definition 11.8.1 (yürüyüş; bütün düğümleri
  farklıysa yol), Definition 11.8.3 (Cₙ), Definition 11.9.1 (bağlı düğüm ve bağlı graf),
  Definition 11.9.2 (bağlı bileşen); Kₙ'nin n(n−1)/2 kenarı §11.3'te verilir.
- **Asimptotik gösterim (makale 9):** 6.042J §13.7 — Tanım 13.7.5 ve ona denk **Tanım 13.7.9**
  (f = O(g) ⟺ öyle bir c ≥ 0 ve x₀ vardır ki her x ≥ x₀ için |f(x)| ≤ c·g(x)), **Tanım 13.7.13**
  (Θ). Makale 9 bu tanımları *kullanmaz*, yalnızca sezgisini kurar ve formal hâlini asimptotik
  analiz makalesine bırakır.
- **CLRS (makale 9):** *Introduction to Algorithms*, dördüncü baskı (MIT Press, 2022,
  ISBN 9780262046305); 2. bölüm Getting Started (2.1 Insertion sort, 2.2 Analyzing algorithms —
  RAM modeli burada tanımlanır, 2.3 Designing algorithms) ve 3. bölüm Characterizing Running Times
  (3.1 O/Ω/Θ, 3.2 formal tanımlar, 3.3 standart gösterimler). Bölüm ve alt bölüm başlıkları
  yayıncı künyesinden doğrulandı.
- **Rosen bölüm numaraları:** ürün sayfasındaki içindekiler (2025 Release) zincirin bölüm
  düzeyini doğruluyor — 3 Algorithms, 9 Relations, 10 Graphs, 11 Trees, 12 Boolean Algebra.
  Alt bölümler makale 7 için 10.1, 10.2, 10.4 ve 11.1, 11.4, 11.5; makale 8 için 9.6 ve 12.1–12.4.
  Ürün sayfası canlı bir baskı sürümü gösterdiği için baskı yılı yine iddia edilmedi (bkz. §5).
- **Cebirsel yapılar ve Boolean cebiri (makale 8):** Doerr, A. & Levasseur, K. *Applied Discrete
  Structures* (CC BY-NC-SA, AIM Open Textbook Initiative onaylı; kanonik site
  <https://discretemath.org/>). Bölüm 11 Algebraic Structures (11.1 Operations, 11.2 Algebraic
  Systems — monoid ve grup tanımları buradan alındı, 11.3 Some General Properties of Groups,
  11.5 Subsystems, 11.7 Isomorphisms); bölüm 13 Boolean Algebra (13.1 Posets Revisited,
  13.2 Lattices — join "least upper bound", meet "greatest lower bound"; dağılmalı kafes tanımı,
  13.3 Boolean Algebras — **Tanım 13.3.5**: "A Boolean algebra is a lattice that contains a least
  element and a greatest element and that is both complemented and distributive" ve metnin
  Boolean cebiri / küme cebiri / mantık üçlüsünün izomorfik olduğunu açıkça söylemesi,
  13.7 anahtarlama kuramı). Bölüm ve alt bölüm başlıkları LibreTexts'teki tam metinden okundu.
- **Yarıgrup tanımı (makale 8):** Encyclopedia of Mathematics (Springer + Avrupa Matematik
  Derneği), *Semi-group*: "A set with one binary operation satisfying the law of associativity."
  <https://encyclopediaofmath.org/wiki/Semi-group> — *Applied Discrete Structures* monoid ve grubu
  tanımlar ama yarıgrubu tanımlamaz, bu yüzden ayrı kaynak kullanıldı.
- **Sayısal iddialar bağımsız hesaplandı:** 2¹⁰ = 1.024; 10! = 3.628.800; 2²⁰ = 1.048.576 > 10⁶
  (ikili aramada 20 adım); 1000·log₂1000 ≈ 9.966; 100·log₂100 ≈ 664; 2¹⁰⁰ ≈ 1,26 × 10³⁰;
  100! ≈ 9,33 × 10¹⁵⁷; 2¹⁰⁰⁰ ≈ 1,07 × 10³⁰¹; 1000! ≈ 4,02 × 10²⁵⁶⁷; saniyede 10⁹ işlemde 2¹⁰⁰
  işlem ≈ 4,0 × 10¹³ yıl (evrenin ≈ 1,38 × 10¹⁰ yıllık yaşının ≈ 2.900 katı); 10⁶ elemanda
  n² = 10¹² işlem ≈ 1.000 saniye ≈ 17 dakika, n log₂n ≈ 1,99 × 10⁷ işlem ≈ 0,02 saniye;
  C(1000, 2) = 499.500; K₅'in kenar sayısı 10; yedi düğümün her birinin derecesi 3 olsa derece
  toplamı 21 (tek, imkânsız), on düğümde 30 (kenar sayısı 15, mümkün).
- **Boolean sadeleştirme örneği (makale 8) elle doğrulandı:** F = x·y + x·y′ + x′·y için dört
  satırlık doğruluk tablosu x + y ile birebir aynıdır; kapı sayısı 7'den 1'e iner.
- **Bölen kafesi sınır örneği (makale 8) elle doğrulandı:** 12'nin bölen kafesinde 2'nin tümleyeni
  yoktur (tek aday 3'tür, ekok(2, 3) = 6 ≠ 12); 30'un bölen kafesi sekiz elemanlıdır ve her
  elemanın tümleyeni vardır (örnek: ebob(2, 15) = 1, ekok(2, 15) = 30), yani Boolean cebiridir.

## 8. Batch 3 üretim run'ında doğrulanan kaynaklar (2026-08-29)

Kapsam kararını taşıyan resmî sayfa bu run'da tekrar okundu: CMPE250 katalog tanımı §1 ve §7'deki
alıntıyla birebir aynıdır ("Graphs. Advanced Sorting. Hashing. Heap Structures. Search Structures.
Complexity. Parallel algorithms. File organization.", 4 kredi / 6 ECTS, önkoşul CMPE160). Makale
10–12'nin resmî dayanağı bu tanımdaki "Search Structures" ve "File organization" başlıklarıdır.
Diğer resmî sayfalar bu batch'in kapsamını etkilemediği için yeniden çekilmedi; §5'teki
2026-08-29 doğrulaması geçerlidir.

### CLRS 4. baskının bölüm numaraları (Batch 2'nin bıraktığı borç)

MIT Press'in kendi içerik sunucusundaki resmî *Selected Solutions* belgesi indirildi ve
içindekiler tablosu doğrudan okundu (<https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/11599/selected-solutions.pdf>;
künye: "Instructor's Manual to Accompany Introduction to Algorithms, Fourth Edition … Published by
the MIT Press. Copyright 2022"). Doğrulanan bölüm numaraları ve başlıkları:

- 6 Heapsort · 10 Elementary Data Structures · 11 Hash Tables · 12 Binary Search Trees ·
  13 Red-Black Trees · 14 Dynamic Programming · 15 Greedy Algorithms · 16 Amortized Analysis ·
  17 Augmenting Data Structures · 19 Data Structures for Disjoint Sets · 20 Elementary Graph
  Algorithms · 21 Minimum Spanning Trees · 22 Single-Source Shortest Paths · 23 All-Pairs
  Shortest Paths · 24 Maximum Flow.
- Alt bölümlerin **varlığı** aynı belgedeki çözüm başlıklarındaki alıştırma numaralarından
  doğrulandı: 6.1–6.5, 11.2, 12.1–12.3, 13.1, 13.3, 16.1, 16.2.
- **Doğrulanamayan:** 18. bölümün adı ve bütün alt bölüm **başlıkları**. Belge yalnızca seçilmiş
  çözümleri taşıdığı için 1. ve 18. bölümler içindekilerde yoktur; MIT Press ürün sayfası
  WebFetch'e 403 döner, tarayıcıyla açıldığında da içindekiler tablosu yoktur; MIT Press
  Bookstore, Penguin Random House, Google Books, Open Library ve DNB kayıtlarında da yayımlanmış
  bir içindekiler bulunamadı. Bu yüzden makale 10–12'nin kaynakçası CLRS'e **yalnızca bölüm
  düzeyinde** atıf yapar (alt bölüm numarası yalnızca yukarıda varlığı doğrulanmış olanlar için
  kullanıldı) ve B-ağacı için CLRS hiç kullanılmadı.

### Makale 10–12'de kullanılan akademik kaynaklar

- **MIT 6.006 Introduction to Algorithms, Bahar 2020 (OCW; Demaine, Ku, Solomon)** — üç ders notu
  PDF'i indirilip tam metin okundu (ders listesi:
  <https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/>).
  - **Lecture 2: Data Structures** — arayüz (specification, "what operations are supported") ile
    veri yapısı (representation, "how operations are supported") ayrımı; dizi, bağlı liste ve
    dinamik dizi için işlem başına **en kötü durum** tablosu (dizi: get_at 1, insert_first n,
    insert_last n; bağlı liste: get_at n, insert_first 1, insert_last n; dinamik dizi: get_at 1,
    insert_last amortize 1); yığın = insert_last + delete_last, kuyruk = insert_last +
    delete_first; amortize maliyet tanımı ("Operation has amortized cost T(n) if k operations cost
    at most k·T(n)"); dinamik dizide sona eklemenin amortize sabit oluşu ve küçültme eşiğinin
    büyütme eşiğinden ayrılması gerektiği (aksi hâlde dönüşümlü ekleme/silme garantiyi bozar).
  - **Lecture 6: Binary Trees I** — düğüm temsili (item, parent, left, right); depth ve height
    tanımları; dolaşma sırası (traversal order) ve özyinelemeli listelemenin O(n) olması;
    işlemlerin O(h) tasarlanıp h'nin O(log n) tutulması hedefi.
  - **Lecture 7: Binary Trees II: AVL** — dönüşün O(1) işaretçi yeniden bağladığı ve dolaşma
    sırasını koruduğu; AVL özelliği (skew −1, 0 veya 1); F(0) = 1, F(1) = 2,
    F(h) = 1 + F(h−1) + F(h−2) ≥ 2F(h−2) ⇒ F(h) ≥ 2^(h/2) ⇒ h = O(log n); dengesizliğin yalnızca
    değişen yaprağın atalarında oluşması ve en alttaki dengesiz atanın **bir veya iki dönüşle**
    onarılabilmesi; AVL'nin ilk dengeleme şeması olduğu ve künyesi (Adelson-Velsky and Landis,
    1962).
- **Sedgewick, R. & Wayne, K. *Algorithms*, 4. baskı** — resmî site algs4.cs.princeton.edu'dan
  okundu. İçindekiler doğrulandı: 1.3 Stacks and Queues, 1.4 Analysis of Algorithms, 3.2 Binary
  Search Trees, 3.3 Balanced Search Trees, 3.4 Hash Tables, 6.2 B-trees. 3.3 sayfasından doğrudan
  alınan iddialar: 2-düğümü ve 3-düğümü tanımları; "Search and insert operations in a 2-3 tree
  with N keys are guaranteed to visit at most lg N nodes"; 3-düğümünün "two 2-nodes connected by a
  single red link that leans left" olarak temsili; "The height of a red-black BST with N nodes is
  no more than 2 lg N". **Not:** 6.2 B-trees sayfası "under major construction" durumundadır ve
  gövde metni yoktur; B-ağacı iddiaları oradan alınmadı.
- **Morin, P. *Open Data Structures*** (opendatastructures.org, Pat Morin, sürüm 0.1G),
  14. bölüm External Memory Searching, 14.2 B-Trees — B-ağacı tanımı doğrudan alındı: "For any
  integer B ≥ 2, a B-tree is a tree in which all of the leaves have the same depth and every
  non-root internal node, u, has at least B children and at most 2B children."; yükseklik sınırı
  h ≤ log_B ℓ + 1 ve Teorem 14.1 (add, remove, find için O(log_B n)). 14.1 Block Store sayfası
  blok soyutlamasını tanımlar fakat disk ile RAM arasındaki gecikme oranı için **sayı vermez**;
  bu yüzden makale 12 sayısal bir gecikme oranı iddia etmez, yalnızca "mertebelerce pahalı" der.

### Bu batch'te bağımsız hesaplanan ve elle denetlenen iddialar

- log₂(10⁶) ≈ 19,93 (dengeli ikili ağaçta ≈ 20 yükseklik, en fazla 21 karşılaştırma);
  log₂(10⁹) ≈ 29,90 (≈ 30 seviye); log₁₀₀(10⁹) = 4,5 (5 seviye).
- Dinamik dizi ikiye katlama: 1000 eklemede yeniden tahsisler kapasite 1, 2, 4, …, 512 iken olur;
  kopyalanan toplam eleman sayısı 1 + 2 + ⋯ + 512 = 1023 ve bu 2 × 1000'in altındadır. Makale
  10'un Şekil 2'sindeki 16 eklemeli örnek: kopyalama toplamı 1 + 2 + 4 + 8 = 15, toplam maliyet
  16 + 15 = 31, işlem başına 31 / 16 ≈ 1,94 adım.
- İki yığınla kuyruk problemi: her eleman en fazla dört işlem görür (girişe koy, girişten al,
  çıkışa koy, çıkıştan al), dolayısıyla n elemanlı bir işlem dizisinin toplam maliyeti 4n ile
  sınırlıdır; aktarmanın yalnızca çıkış yığını boşken yapılması argümanın ön koşuludur.
- İkili ağaç yükseklik alt sınırı: yüksekliği h olan bir ikili ağaç en fazla 2^(h+1) − 1 düğüm
  taşır, dolayısıyla n ≤ 2^(h+1) − 1 ve h ≥ log₂(n + 1) − 1.
- Makale 11'in karşı örneği elle denetlendi: kök 10, sol çocuk 5, sağ çocuk 15, 15'in sol çocuğu
  8 → her düğüm kendi çocuklarına göre kuralı sağlar, ama sıralı dolaşma 5, 10, 8, 15 verir ve
  artan değildir.
- AVL en seyrek ağaç dizisi F(h) = 1 + F(h−1) + F(h−2) (F(0) = 1, F(1) = 2) hesaplandı ve
  **F(h) = Fib(h+3) − 1** özdeşliği h = 0…7 için birebir doğrulandı (1, 2, 4, 7, 12, 20, 33, 54).
  Buradan gelen sıkı sabit log_φ 2 = 1,44042 olarak hesaplandı. n = 10⁶ için gerçek en büyük AVL
  yüksekliği 27, sıkı sınır 1,4404 · log₂(10⁶) ≈ 28,71, kaba sınır 2 · log₂(10⁶) ≈ 39,86 — üçü
  tutarlıdır. n = 10⁹ için gerçek en büyük yükseklik 41, sıkı sınır ≈ 43,06.
  **Not:** 1,44 sabiti kaynaktan alınmadı; yukarıdaki özdeşlikten türetilip sayısal olarak
  doğrulandı. 6.006 ders notu yalnızca kaba 2 log₂ n sınırını verir.
