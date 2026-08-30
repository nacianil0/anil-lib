# BOUN CmpE Serisi — Resmî Kaynak ve Kanıt Defteri

> Karar taşıyan kaynakların kalıcı kaydı. Kural: resmî gerçek, tasarım çıkarımı ve informal
> sinyal birbirinden ayrılır; hiçbir kaynak "kesin interview syllabus" gibi sunulmaz.
> Kaynak önceliği: (1) güncel resmî Boğaziçi CmpE graduate/interview bilgisi, (2) güncel resmî
> curriculum/course catalog/prerequisite/ders materyali, (3) standart textbook ve güvenilir
> akademik kaynak, (4) açıkça etiketlenmiş informal/legacy sinyal.

Erişim tarihi: **2026-08-30** (Batch 5 run'ında kapsam kararını taşıyan **CMPE250 ve CMPE300**
sayfaları ile bu batch'in akademik kaynakları yeniden doğrulandı — §10). Kapsamı etkilemeyen resmî
sayfaların son tam doğrulaması **2026-08-29**'dur (§5); üretim run'ları kapsam kararını etkileyen
sayfaları yeniden doğrular ve bu defteri günceller. İlk doğrulama: 2026-08-28 (kurulum görevi).

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
  **Kesinlik notu (2026-08-30):** bu özet, sayfanın *Catalog Description* ve *Course Learning
  Outcomes* bölümlerini birleştirir. İkisinin birebir metni ve hangi ifadenin hangi bölümde geçtiği
  §10'dadır; "complexity analysis", "lower bound theory" ve "master theorem" ifadeleri **ders
  çıktılarında** geçer, katalog tanımında değil.
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

## 9. Batch 4 üretim run'ında doğrulanan kaynaklar (2026-08-30)

Kapsam kararını taşıyan resmî sayfa bu run'da tekrar okundu: CMPE250 katalog tanımı §1, §7 ve
§8'deki alıntılarla birebir aynıdır ("Graphs. Advanced Sorting. Hashing. Heap Structures. Search
Structures. Complexity. Parallel algorithms. File organization."; ders adı *Data Structures and
Algorithms*, 4 kredi / 6 ECTS, önkoşul CMPE160, güz dönemi, 3 saat ders + 2 saat PS). Makale
13–15'in resmî dayanağı bu tanımdaki **"Heap Structures"**, **"Hashing"** ve **"Advanced Sorting"**
başlıklarıdır — yani bu batch, katalog tanımındaki sekiz başlıktan üçünü doğrudan karşılar. Diğer
resmî sayfalar bu batch'in kapsamını etkilemediği için yeniden çekilmedi; §5'teki 2026-08-29
doğrulaması geçerlidir.

### CLRS 4. baskının bölüm numaraları (Batch 3'ten kalan borcun bir kısmı kapandı)

MIT Press içerik sunucusundaki resmî *Selected Solutions* belgesi yeniden indirildi ve içindekiler
tablosu doğrudan okundu (<https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/11599/selected-solutions.pdf>).
Batch 3'te kaydedilmemiş olan şu bölüm numaraları da doğrulandı:

- 2 Getting Started · 3 Characterizing Running Times · 4 Divide-and-Conquer · 5 Probabilistic
  Analysis and Randomized Algorithms · **7 Quicksort** · **8 Sorting in Linear Time** ·
  9 Medians and Order Statistics. (Batch 3'te doğrulananlar: 6, 10, 11, 12, 13, 14, 15, 16, 17,
  19, 20, 21, 22, 23, 24.)
- Alt bölümlerin **varlığı** çözüm başlıklarındaki alıştırma numaralarından doğrulandı:
  6.1, 6.2, 6.4, 6.5; 7.2; 8.1, 8.2, 8.3; 11.2.
- **Hâlâ doğrulanamayan:** 18. bölümün adı (belge 1. ve 18. bölümleri içermiyor) ve alt bölüm
  **başlıkları**. Batch 3'teki karar sürüyor: CLRS'e bölüm düzeyinde atıf yapılır.

### Makale 13–15'te kullanılan akademik kaynaklar

- **MIT 6.006 Introduction to Algorithms, Bahar 2020 (OCW; Demaine, Ku, Solomon)** — dört ders
  notu PDF'i indirilip tam metin okundu (ders listesi:
  <https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/>).
  - **Lecture 3: Sorting** — permütasyon ve sıralılık tanımları; yıkıcı (destructive) ile yerinde
    (in-place = O(1) ek yer; yerinde ⇒ yıkıcı) ayrımı; seçmeli ve eklemeli sıralamanın tümevarımlı
    doğruluk ispatları ve T(n) = T(n−1) + Θ(n) ⇒ Θ(n²) analizi; birleştirmeli sıralamanın iki
    parmaklı birleştirmesi, tümevarımlı doğruluğu ve T(n) = 2T(n/2) + Θ(n) ⇒ Θ(n log n) çözümünün
    hem yerine koyma hem özyineleme ağacıyla verilmesi ("complete binary tree with depth log2 n and
    n leaves, level i has 2^i nodes with O(n/2^i) work each").
  - **Lecture 4: Hashing** — karşılaştırma modeli tanımı ve karar ağacı kurulumu; aramanın en az
    n + 1 yaprak gerektirmesi ve yüksekliğin ⌈lg(n+1)⌉ − 1 = Ω(log n) ile alttan sınırlanması;
    "to get faster, need an operation that allows super-constant branching factor"; doğrudan erişim
    dizisi, O(u) alan ve on harfli isimler için 26¹⁰ ≈ 17,6 TB örneği; m < u iken güvercin yuvası
    ilkesiyle hiçbir hash fonksiyonunun birebir olamaması; zincirleme ile açık adresleme; bölme
    yönteminin sezgisel oluşu ve m'nin ikinin ve onun kuvvetlerinden uzak asal seçilmesi; "if u ≫ n,
    every hash function will have some input set that will create O(n) size chain"; evrensel aile
    h(a,b)(k) = ((ak + b) mod p) mod m (p > u asal, a ≠ 0), çakışma olasılığının 1/m ile sınırlı
    olması ve beklenen zincir uzunluğunun 1 + (n − 1)/m çıkması; yük faktörü α = n/m sabitken
    beklenen ve (yeniden boyutlandırma varsa) amortize O(1).
  - **Lecture 5: Linear Sorting** — karşılaştırmalı sıralama alt sınırı (yaprak sayısı ≥ n!,
    yükseklik ≥ log(n!) ≥ log((n/2)^(n/2)) = Ω(n log n)) ve "so merge sort is optimal in comparison
    model"; doğrudan erişim dizisi sıralaması Θ(u); demet (tuple) sıralamasının en anlamsız
    basamaktan başlaması; kararlılık tanımı ("repeated keys appear in output in same order as
    input"); sayma sıralamasının zincir tabanlı kurulumu ve Θ(n + u) maliyeti; radix sıralamasının
    Θ(n + n·log_n u) maliyeti ve u = O(n^c) iken doğrusal olması; kapanış tablosu (Insertion n²
    yerinde/kararlı, Selection n² yerinde/kararsız + O(n) takas, Merge n log n yerinde değil/kararlı
    ve karşılaştırma modelinde optimal, Counting n + u, Radix n + n log_n u).
  - **Lecture 8: Binary Heaps** — öncelik kuyruğu arayüzü (build, insert, delete max, find max) ve
    kullanım örnekleri (bant genişliği sınırlı yönlendirici, çekirdek süreç zamanlaması, kesikli
    olay benzetimi, graf algoritmaları); öncelik kuyruğu sıralaması kalıbı ve tablosu: sırasız
    dinamik dizi → seçmeli sıralama, sıralı dinamik dizi → eklemeli sıralama, Set AVL → AVL sort,
    ikili yığın → heap sort (n log n, yerinde); tam ikili ağaç tanımı ve dizilerle birebir eşleme;
    indis aritmetiği left(i) = 2i + 1, right(i) = 2i + 2, parent(i) = ⌊(i − 1)/2⌋; max-heap özelliği
    ve "every node i satisfies Q[i] ≥ Q[j] for all nodes j in subtree(i)" iddiasının
    d = depth(j) − depth(i) üzerinden tümevarımla ispatı; max heapify up / max heapify down
    yordamlarının doğruluğu ve Θ(log n) maliyeti; yerinde öncelik kuyruğu sıralaması (heap, daha
    büyük bir dizinin öneki); doğrusal kurma — tek tek ekleme ∑ depth(i) = Θ(n lg n), yapraktan köke
    aşağı sızdırma ∑ height(i) = O(n) — ve bunun heap sort'un O(n lg n) sınırını değiştirmediği.
- **Sedgewick, R. & Wayne, K. *Algorithms*, 4. baskı** — resmî site algs4.cs.princeton.edu'dan dört
  bölüm sayfası okundu.
  - **2.2 Mergesort** — "Mergesort guarantees to sort an array of N items in time proportional to
    N log N, no matter what the input. Its prime disadvantage is that it uses extra space
    proportional to N."; yukarıdan aşağı birleştirmeli sıralamanın ½N lg N ile N lg N arasında
    karşılaştırma ve en fazla 6N lg N dizi erişimi yapması; "No compare-based sorting algorithm can
    guarantee to sort N items with fewer than lg(N!) ~ N lg N compares."; birleştirmeli sıralamanın
    asimptotik olarak optimal olması; küçük alt dizilerde eklemeli sıralamaya devretme iyileştirmesi.
  - **2.3 Quicksort** — yerinde çalışması ("uses only a small auxiliary stack") ve ortalamada
    N log N; ayırma sürecinin üç koşulu; **Önerme:** farklı anahtarlı N elemanlı dizide ortalama
    ~2N ln N karşılaştırma ve bunun altıda biri kadar takas; **Önerme:** en kötü durumda ~N²/2
    karşılaştırma, rastgele karıştırmanın buna karşı koruma sağlaması; 1960'ta C. A. R. Hoare
    tarafından bulunması; küçük dizilerde eklemeli sıralamaya devretme (eşik 5–15).
  - **2.4 Priority Queues** — öncelik kuyruğunun iki temel işlemi; bütün ilkel gerçekleştirimlerde
    ekleme ya da en uçtakini almadan birinin en kötü durumda doğrusal olması; **Tanım:** "A binary
    tree is heap-ordered if the key in each node is larger than (or equal to) the keys in that
    node's two children (if any)."; **Önerme:** "The largest key in a heap-ordered binary tree is
    found at the root."; **Tanım:** ikili yığın = tam yığın-sıralı ikili ağacın seviye sırasıyla
    dizide tutulması; swim ve sink yordamları; **Önerme:** n öğeli öncelik kuyruğunda ekleme en
    fazla 1 + lg n, en uçtakini alma en fazla 2 lg n karşılaştırma; **Önerme:** aşağı sızdırma
    tabanlı kurma doğrusal zamanlıdır; **Önerme:** heapsort n öğeyi 2n lg n'den az karşılaştırma ve
    takasla sıralar; heapsort'un ek yer istemeden çalışması; çok yollu yığınların dallanma çarpanı
    takası; yeniden boyutlandırma varsa logaritmik sınırların amortize olması.
    **Not:** 6.006 max-heap ve 0 tabanlı indisleme, Sedgewick 1 tabanlı indisleme (ebeveyn k/2,
    çocuklar 2k ve 2k+1) kullanır. Makale 13 min-heap ve 0 tabanlı indisleme üzerinden yazıldı
    (makale 10'un "2i + 1, 2i + 2" pinine ve makale 12'nin "en küçüğü ver" sözüne uyması için);
    indis aritmetiği Sedgewick'ten değil 6.006'dan alındı, min/max yönü ise her iki kaynakta da
    simetrik olduğu için yön çevrilerek kullanıldı.
  - **3.4 Hash Tables** — hash aramanın iki parçası; modüler hashing ve M'nin asal seçilmesi; iyi
    bir hash fonksiyonunun üç gereği (belirlenimci, ucuz, düzgün dağıtan); **Varsayım J** (uniform
    hashing assumption); **Önerme K** ve **Özellik L** (ayrık zincirlemede zincir uzunluğunun ve
    karşılaştırma sayısının N/M ile orantılı olması); doğrusal denemenin tanımı ve üç olası sonucu;
    α = N/M yük faktörünün iki yöntemde farklı okunması (zincirlemede liste başına ortalama öğe
    sayısı, genelde 1'den büyük; açık adreslemede doluluk oranı, 1'den küçük olmak zorunda);
    **Önerme M:** N = αM iken ortalama deneme sayısı isabetli aramada ~½(1 + 1/(1 − α)), isabetsiz
    arama ve eklemede ~½(1 + 1/(1 − α)²); Java'nın String için 31 kullanması; hashCode'un sabit
    döndürmesinin "legal ama bütün anahtarları aynı noktaya düşürür" olması ve *Hash attack*
    alıştırmasında aynı hashCode değerini veren 2^N dizginin üretilmesi (makale 14'ün "sabit ve
    bilinen bir hash fonksiyonu saldırılabilir" cümlesinin dayanağı).

### Bu batch'te bağımsız hesaplanan ve elle denetlenen iddialar

- **Tam ikili ağacın yüksekliği ⌊log₂ n⌋'dir**, ⌈log₂ n⌉ değil. n = 1…16, 100, 1000 ve 10⁶ için
  gerçek yükseklik (okuma sırası temsilinde en büyük ⌊log₂(i+1)⌋) hesaplandı ve ⌊log₂ n⌋ ile birebir
  eşleşti; n = 3, 5, 6, 7 gibi değerlerde ⌈log₂ n⌉ bir fazla veriyor. 6.006 notu ⌈lg n⌉ der (gevşek
  üst sınır); **makale 13 sıkı olan ⌊log₂ n⌋ değerini kullanır ve bunu kaynağa atfetmez.** n = 10⁶
  için 19, n = 10⁹ için 29.
- **Yığın kurmanın iki yolunun karşılaştırması** (tam ikili ağaç üzerinde gerçek toplamlar):
  n = 1000 → derinlikler toplamı 7.987, yükseklikler toplamı 994; n = 10⁶ → derinlikler toplamı
  17.951.445, yükseklikler toplamı 999.993 (≈ 18 kat fark). Yükseklik dağılımı n = 1000 için
  %50 yaprak (yükseklik 0), %25 yükseklik 1, %12,5 yükseklik 2 biçiminde gidiyor. Teorik sınır
  ∑ h/2^h = 2 serisinden n çıkar; hesaplanan toplamlar ayrıca "yükseklikler toplamı = n − (n'in
  ikili gösterimindeki 1 sayısı)" özdeşliğini de doğruluyor (1000 − 6 = 994, 10⁶ − 7 = 999.993).
- **Heap ekleme ve alma karşılaştırma sınırları** n = 10⁶ için: 1 + lg n ≈ 20,93; 2 lg n ≈ 39,86.
- **Doğrudan erişim dizisi alan örneği:** 26¹⁰ = 141.167.095.653.376; isim başına 1 bit ile
  17.645.886.956.672 bayt ≈ **17,6 TB** (1 TB = 10¹² bayt). 6.006'nın verdiği değerle uyumlu.
- **Doğrusal deneme ortalama deneme sayıları** (Önerme M'den hesaplandı; makale 14'teki tablo):
  α = 0,25 → 1,17 / 1,39; 0,50 → 1,50 / 2,50; 0,75 → 2,50 / 8,50; 0,90 → 5,50 / 50,50;
  0,95 → 10,50 / 200,50; 0,99 → 50,50 / 5.000,50 (isabetli / isabetsiz).
- **Zincirlemede beklenen zincir uzunluğu** 1 + (n − 1)/m: n = m = 1000 → 1,999; n = m = 10⁶ → 2,000.
- **Karşılaştırma modeli arama alt sınırı** ⌈lg(n+1)⌉ − 1: n = 10³ → 9, n = 10⁶ → 19, n = 10⁹ → 29.
- **lg(n!) ile n lg n oranı:** n = 10 → 21,8 / 33,2 (0,656); n = 10³ → 8.529 / 9.966 (0,856);
  n = 10⁶ → 18.488.885 / 19.931.569 (0,928). Stirling tarzı alt sınır (n/2)·lg(n/2) gerçekten altta
  kalıyor: n = 10⁶ için 9.465.784 < 18.488.885.
- **Quicksort sabiti:** 2N ln N / (N lg N) = 2 ln 2 = 1,3863, yani ortalama karşılaştırma sayısı
  ≈ **1,39 · N log₂ N**. Makale 15'teki "yaklaşık 1,39" değeri buradan gelir. n = 10⁶ için ortalama
  ≈ 2,76 × 10⁷ karşılaştırma, en kötü durum ~N²/2 = 5,0 × 10¹¹.
- **Radix sıralamasının basamak sayısı** c = log_n u: n = 10⁶, u = 10¹² → c = 2; n = 10³, u = 10⁶ →
  c = 2; n = 10⁶, u = 2³² → c ≈ 1,61.
- **Makale 13'ün heap izleri elle denetlendi.** [1, 3, 2, 7, 4, 9, 5] geçerli bir min-heap'tir
  (0'ın çocukları 3 ve 2; 1'inkiler 7 ve 4; 2'ninkiler 9 ve 5). 0 eklenince yukarı sızdırma üç takas
  yapar ve [0, 1, 2, 3, 4, 9, 5, 7] çıkar (yükseklik ⌊log₂ 8⌋ = 3 ile tutarlı). En küçüğü alma: kök
  1 ile son eleman 5 takas edilir, 1 çıkarılır, [5, 3, 2, 7, 4, 9] kalır; aşağı sızdırma 5'i küçük
  çocuk olan 2 ile takas eder ve [2, 3, 5, 7, 4, 9] verir; yeni konumda tek çocuk 9 > 5 olduğu için
  durur. Her iki sonuç da heap özelliğini sağlıyor.
- **Makale 14'ün hash tablosu izi elle denetlendi.** h(k) = k mod 7 için 10 → 3, 22 → 1, 31 → 3,
  4 → 4, 15 → 1, 28 → 0. Zincirleme yerleşimi: 0:{28}, 1:{22, 15}, 3:{10, 31}, 4:{4}; 2, 5 ve 6
  boş. Doğrusal denemede ekleme sırası (10, 22, 31, 4, 15, 28) ile tablo 0:28, 1:22, 2:15, 3:10,
  4:31, 5:4, 6:boş olur — 4 anahtarı hiç çakışmadığı hâlde 31'in kayması yüzünden kendi hücresini
  bulamaz ve 0–5 arası kesintisiz dolu bir öbek oluşur.
- **Makale 15'in radix izi elle denetlendi.** [17, 3, 24, 22, 12] dizisi n = 5 tabanında (3,2),
  (0,3), (4,4), (4,2), (2,2) olur. Düşük basamağa göre kararlı sıralama 17, 22, 12, 3, 24 verir;
  yüksek basamağa göre kararlı sıralama 3, 12, 17, 22, 24 verir ve bu, dizinin gerçek sıralı hâlidir.
  Son geçişte 22 ile 24'ün yüksek basamağı eşittir ve doğru sırayı birinci geçiş kurmuştur —
  kararlılığın neden zorunlu olduğunun somut kanıtı. (6.006 ders notundaki aynı örneğin PDF'ten
  çıkarılan ara adımı tutarsız görünüyor; bu yüzden iz kaynaktan alınmadı, burada baştan
  hesaplandı.)

## 10. Batch 5 üretim run'ında doğrulanan kaynaklar (2026-08-30)

Bu batch iki fazı birden ilgilendirdiği için **iki resmî sayfa** yeniden okundu.

**CMPE250** (<https://cmpe.bogazici.edu.tr/courses/cmpe250/>) katalog tanımı §1, §7, §8 ve §9'daki
alıntılarla birebir aynıdır ("Graphs. Advanced Sorting. Hashing. Heap Structures. Search
Structures. Complexity. Parallel algorithms. File organization."; ders adı *Data Structures and
Algorithms*, 4 kredi / 6 ECTS, önkoşul CMPE160, güz dönemi, 3 saat ders + 2 saat PS). Makale 16'nın
resmî dayanağı bu tanımdaki **"Graphs"** başlığıdır. Böylece Faz B, katalog tanımındaki sekiz
başlığın altısını doğrudan karşılamış oldu (kalan ikisi "Parallel algorithms" — Faz C'nin 24.
makalesi — ve zaten karşılanmış olan "Complexity").

**CMPE300** (<https://cmpe.bogazici.edu.tr/courses/cmpe300/>) HANDOFF'un istediği gibi Faz C
açılmadan önce yeniden doğrulandı (son doğrulama 2026-08-29 idi). Sayfa iki ayrı bölüm taşıyor ve
bu batch'te **ikisinin ayrımı netleştirildi** — §1'deki özet ikisini birleştirerek aktarıyordu:

- *Course Information*: ders adı **Analysis of Algorithms**, güz dönemi, Lecture 3 / PS 0 / Labs 2,
  **3 kredi / 5 ECTS**, önkoşul CMPE250, güncel öğretim üyesi Tunga Güngör.
- *Catalog Description* (birebir): "Analysis of computer science algorithms: Sorting, searching,
  paging and parallelism. Analysis of mathematical algorithms: games and puzzles, network
  algorithms, and probabilistic algorithms."
- *Course Learning Outcomes* (birebir, ilgili kısım): "The theory of complexity analysis, basic
  techniques that are commonly used in analyzing the performance, basic classes of algorithms
  (comparison-based, recursive, divide-and-conquer, dynamic, greedy, numerical, graph), and lower
  bound theory will be covered. Parallel architectures and parallel algorithms will be studied in
  detail. Meanwhile, mathematical tools like interpolation, master theorem, etc. will be
  introduced. The last part of the course will be the study of the topic of probabilistic
  algorithms, which is a rapidly growing area of research."

**Pratik sonucu:** Faz C'nin resmî dayanağı olan "complexity analysis", "lower bound theory" ve
"master theorem" ifadeleri **katalog tanımında değil, ders çıktılarında** geçiyor. Makale 17 ve
18'in kaynakçası bu yüzden "ders çıktıları" diyerek atıf yapar; "katalog tanımı" demek yanlış
olurdu. §1'deki CMPE300 özeti bu ayrımı yapmıyordu; buradaki kayıt daha kesindir.

### Makale 16–18'de kullanılan akademik kaynaklar

- **MIT 6.006 Introduction to Algorithms, Bahar 2020 (OCW; Demaine, Ku, Solomon)** — üç ders notu
  PDF'i indirilip tam metin okundu, biri (Lecture 3) tek bir alıntı için yeniden doğrulandı.
  - **Lecture 9: Breadth-First Search** — G = (V, E) tanımı ve basit graf varsayımı; yönlü/yönsüz
    kenar ayrımı ve |E| = O(|V|²) sonucu; komşuluk kümeleri Adj⁺/Adj⁻ ve dereceler; grafın "Adj
    kümesi + düğüm başına komşuluk listesi" ikilisiyle saklanması, Adj için doğrudan erişim dizisi
    ya da hash tablosu, her Adj(u) için dizi ya da bağlı liste kullanılması; **"Since Σ deg(u) =
    2|E| by handshaking lemma, graph storable in Θ(|V| + |E|) space"** ve buradan "graf
    algoritmalarında doğrusal zaman Θ(|V| + |E|) demektir" sonucu; yol, basit yol, yol uzunluğu ve
    δ(u, v) uzaklık tanımları; erişilebilirlik / tek çift en kısa yol / tek kaynak en kısa yollar
    problemlerinin zorluk sıralaması; en kısa yollar ağacının ebeveyn işaretçileriyle O(|V|) yerde
    tutulması ve bütün yolları tek tek saklamanın Θ(|V|²) olabileceği; BFS'in katman kümesi tanımı,
    "her v ∈ Lᵢ bir u ∈ L_{i−1}'e komşudur" savı, katman üzerinde tümevarımla doğruluğu; maliyet
    analizinde her düğümün bir katmana girmesi, komşu gezmenin toplamının el sıkışma lemmasıyla
    O(|E|) olması ve erişilemeyen düğümler için Θ(|V|) eklenmesi ⇒ O(|V| + |E|).
  - **Lecture 10: Depth-First Search** — DFS'in özyinelemeli `visit(u)` tanımı ve ebeveyn ağacı;
    "Solves Single Source Reachability, **not** SSSP" ve döndürdüğü ağacın en kısa olmak zorunda
    olmaması; uzaklık üzerinden tümevarımla doğruluk ispatı; maliyetin O(|E|) olması ve BFS'ten
    farkının uzaklık döndürmemesi; Full-BFS / Full-DFS sarmalayıcısı ve her ikisinin O(|V| + |E|)
    olması; bağlılık tanımı, Connected Components probleminin tanımı ve "tek kaynak
    erişilebilirliği çözen her algoritma A, Full-A ile bağlı bileşenleri çözer" savı; yönlü
    graflarda bağlılığın daha karmaşık olduğu; DAG ve topolojik sıralama tanımları
    ("every edge (u, v) ∈ E satisfies f(u) < f(v)"); **bitiş sırası tanımı ve "If G is a DAG, the
    reverse of a finishing order is a topological order" savının iki durumlu ispatı**; döngü
    tespitinin ters bitiş sırası üzerinde O(|E|) denetimle yapılması.
  - **Lecture 1: Introduction** — problem/algoritma/doğruluk/verimlilik çerçevesi; asimptotik
    gösterimin "sabit çarpanları ve düşük dereceli terimleri yok say" olarak tanıtılması ve
    O/Ω/Θ'nın üst, alt ve sıkı sınır olarak adlandırılması; büyüme sınıfları tablosu (sabit,
    logaritmik, doğrusal, log-doğrusal, karesel, polinom, üstel) ve 1 GHz makinede n = 1000 için
    süre tahminleri; Word-RAM modeli; arayüz (Sequence / Set) ile veri yapısı ayrımı.
    **Not:** bu ders notu O/Ω/Θ'nın **formal tanımını vermez**; makale 17'nin formal tanımları
    6.042'den alınmıştır.
  - **Lecture 3: Sorting** — yalnızca tek bir cümle için yeniden okundu:
    "Recurrence Tree: complete binary tree with depth log₂ n and n leaves, level i has 2ⁱ nodes
    with O(n/2ⁱ) work each, total: Σ 2ⁱ · (n/2ⁱ) = Σ n = Θ(n log n)".
- **Lehman, Leighton & Meyer, *Mathematics for Computer Science* (MIT 6.042J, Bahar 2015 OCW
  ders kitabı)** — 13.7 ve 21. bölümün tamamı PDF'ten metne çevrilip okundu.
  - **13.7 Asymptotic Notation** — Tanım 13.7.1 küçük o (limit tanımı); Lemma 13.7.2 (a < b iken
    xᵃ = o(xᵇ)); Lemma 13.7.3 (log x = o(xᵋ), her ε > 0); Sonuç 13.7.4 (a > 1 iken xᵇ = o(aˣ));
    Tanım 13.7.5 Big-O'nun lim sup ile tanımı ve limitin var olmadığı hâllerin (oranın 3 ile 5
    arasında salındığı örnek) neden kapsanması gerektiği; **Tanım 13.7.9** Big-O'nun standart
    (c, x₀) tanımı; Önerme 13.7.10–13.7.12 (100x² = O(x²), x² + 100x + 10 = O(x²), polinom genel
    hâli); **Tanım 13.7.13** Theta; **Tanım 13.7.15** Omega (f = Ω(g) ⇔ g = O(f)); Tanım 13.7.16
    küçük omega; **13.7.4 Pitfalls** — üstel yanılgı (4ˣ = O(2ˣ) sanmak, 4ˣ aslında 2ˣ'in
    karesidir), sabit karışıklığı ve *False Theorem 13.7.14* (Σᵢ₌₁ⁿ i = O(n) sahte ispatı; i sabit
    değildir), eşitlik yanılgısı ("O(f) = g asla yazılmaz"), işlem uygulama yanılgısı ve
    **13.7.5 Omega**: "The running time is at least O(n²)" ifadesinin hatalı olduğu, doğrusunun Ω
    olduğu.
  - **21. bölüm Recurrences** — 21.1 Hanoi bağıntısının tahmin-ve-doğrula ile çözümü (Sav 21.1.1,
    Tₙ = 2ⁿ − 1) ve T₆₄ için "more than 18 billion billion steps"; **21.1.1 The Upper Bound Trap**
    (Tₙ ≤ 2ⁿ hipotezinin tümevarımda "flaming train wreck" ile tıkanması ve daha güçlü hipotez
    gereği); 21.1.2 plug-and-chug yönteminin üç adımı ve Hanoi üzerinde uygulanışı; **21.2 Merge
    Sort** — birleştirmede en fazla n − 1 karşılaştırma yapılmasının gerekçesi, T₁ = 0,
    Tₙ = 2T_{n/2} + n − 1 bağıntısı, ilk terimlerin desen vermemesi (0, 1, 5, 17, 49), açılımdaki
    Tₙ = 2ᵏT_{n/2ᵏ} + kn − 2ᵏ + 1 deseni; 21.4 böl-yönet yinelemelerinin genel biçimi
    T(n) = Σ aᵢT(bᵢn) + g(n); **21.4.1 Akra-Bazzi formülü** ve p'nin Σ aᵢbᵢᵖ = 1 denkleminden
    çözülmesi; **21.4.2 Two Technical Issues** — asimptotik çözümün taban koşullarından ve
    tabana/tavana yuvarlamalardan bağımsız olması; 21.4.3 Akra-Bazzi teoreminin tam ifadesi;
    **21.4.4 Teorem 21.4.2 Master Teoremi** (üç durum ve üçüncü durumdaki düzenlilik koşulu);
    **21.5 A Feel for Recurrences** — Hanoi ile Merge Sort'un karşılaştırılması, "generating smaller
    subproblems is far more important to algorithmic speed than reducing the additional steps per
    recursive call", toplamsal küçülmenin üstel / çarpımsal küçülmenin polinomsal çözüm vermesi ve
    Tₙ = aT_{n/2} + n − 1 bağıntısının a < 2, a = 2, a > 2 için Θ(n), Θ(n log n), Θ(n^(log a)) üç
    farklı biçime girmesi.
  - **Master Teoreminin ε'sı üzerine metodolojik not.** Bu PDF'in metin katmanı matematik
    yazıtipindeki simgeleri düşürüyor: Teorem 21.4.2'nin metni "Case 1: If g(n) = O(n^(log_b(a) ))
    for some constant  > 0" biçiminde çıkıyor ve ε ile eksi işareti görünmüyor. Belgenin **kendi
    kodlaması** karar verdirdi: bütün belge boyunca "+" karakteri "C" olarak, "−" karakteri ise
    boşluk olarak çıkıyor (ör. "Tn D 2Tn 1 C 1" = "Tₙ = 2Tₙ₋₁ + 1"). Durum 3'ün üssünde "C" var
    ("nlogb.a/C"), Durum 1'inkinde yok. Buradan Durum 1'in üssü **log_b a − ε**, Durum 3'ünkü
    **log_b a + ε** olarak okundu. Aynı PDF iki farklı sunucudan indirilip
    (<https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/>
    ve <https://people.csail.mit.edu/meyer/mcs.pdf>) aynı sonuç alındı. Ortamda PDF'i görüntüye
    çeviren bir araç (pdftoppm vb.) bulunmadığı için sayfa görsel olarak denetlenemedi; okuma bu
    kodlama argümanına dayanıyor ve mantıksal olarak da zorunludur (Durum 1 üst sınır, Durum 3 alt
    sınırdır; işaretler ters olsaydı iki durum çelişirdi).
- **MIT 6.046J Design and Analysis of Algorithms, Bahar 2015 (OCW; Demaine, Devadas, Lynch),
  Lecture 2: Divide and Conquer** — ders notu PDF'i indirilip okundu. Böl-yönet deseninin
  T(n) = aT(n/b) + [birleştirme işi] biçiminde yazılması (a ≥ 1, b > 1); konveks kabuk
  algoritmasında bütün (aᵢ, bⱼ) çiftlerine bakan naif teğet bulmanın
  **T(n) = 2T(n/2) + Θ(n²) = Θ(n²)**, iki parmaklı doğrusal birleştirmenin ise
  **T(n) = 2T(n/2) + Θ(n) = Θ(n log n)** vermesi; medyan bulmada beşli grupların medyanının
  seçilmesiyle çıkan T(n) = T(⌈n/5⌉) + T(7n/10 + 6) + Θ(n) bağıntısı, **"Master theorem does not
  apply"** tespiti, "Intuition: n/5 + 7n/10 < n" sezgisi ve T(n) ≤ c·n tahmininin tümevarımla
  ispatı (c ≥ 20a ve n ≥ 140 ile).
- **Sedgewick, R. & Wayne, K. *Algorithms*, 4. baskı** — resmî site algs4.cs.princeton.edu'dan üç
  bölüm sayfası okundu.
  - **1.4 Analysis of Algorithms** — çalışma süresinin "ifade başına maliyet × çalışma sıklığı"
    ile modellenmesi; tilde yaklaşımının tanımı (g(N) ~ f(N) ⇔ oran 1'e yakınsar); büyüme mertebesi
    sınıflandırmasının g(N) ~ a·f(N), f(N) = N^b log^c N biçiminde toplanması; maliyet modelinin
    açıkça tanımlanması gereği; girdiye bağımlılıkla başa çıkmanın üç yolu (girdi modeli, en kötü
    durum garantisi, rastgeleleştirme) ve amortize analizin işlem dizisi üzerinde en kötü durum
    garantisi vermesi.
  - **4.1 Undirected Graphs** — graf sözlüğü (ilmek, paralel kenar, komşuluk, derece, yol, basit
    yol, döngü, bağlılık, bağlı bileşen, ağaç, orman, kapsayan ağaç); **komşuluk listesi temsilinin
    varsayılan olması** ve aynı API'nin komşuluk matrisiyle de gerçekleştirilebilmesi
    (`Graph.java` / `AdjMatrixGraph.java`); DFS'in işaretleyerek özyinelemeli dolaşması ve
    `edgeTo[]` ile ebeveyn bağlantılı ağaç kurması; BFS'in kuyrukla en kısa yolları bulması;
    **Önerme:** DFS bir kaynağa bağlı bütün düğümleri derecelerin toplamıyla orantılı sürede
    işaretler; **Önerme:** BFS, s'ten erişilebilir her v için en kısa yolu hesaplar ve en kötü
    durumda V + E ile orantılı sürer; **Önerme:** DFS, V + E ile orantılı ön işleme ve yerle sabit
    zamanlı bağlılık sorgusu sağlar; "is connected to" bağıntısının bir denklik bağıntısı olup
    düğümleri denklik sınıflarına (bağlı bileşenlere) ayırması; DFS'in ayrıca döngü tespiti ve iki
    renklilik için V + E sürede kullanılabilmesi.
  - **4.2 Directed Graphs** — yönlü graf sözlüğü (iç/dış derece, yönlü yol, yönlü döngü,
    erişilebilirlik, güçlü bağlılık, DAG); komşuluk listesi temsilinin yine varsayılan olması;
    öncelik kısıtlı çizelgeleme probleminin topolojik sıralama olarak formüle edilmesi; DFS'in üç
    sırası (preorder, postorder, reverse postorder); **Önerme:** bir yönlü grafın topolojik
    sıralaması ancak ve ancak DAG ise vardır; **Önerme:** DAG'da ters postorder bir topolojik
    sıralamadır; **Önerme:** DFS ile bir DAG, V + E ile orantılı sürede topolojik sıralanabilir;
    güçlü bağlılığın bir denklik bağıntısı olması ve Kosaraju-Sharir algoritmasının V + E ön
    işlemesi.

### Bu batch'te bağımsız hesaplanan ve elle denetlenen iddialar

- **Makale 16'nın örnek grafı bir betikle doğrulandı.** Komşuluk listeleri a → b, c; b → a, c, d;
  c → a, b, e; d → b, e, f; e → c, d, f; f → d, e. Simetri denetlendi, kenar sayısı 8, dereceler
  toplamı 16 = 2 × 8 (el sıkışma lemması). **BFS (a'dan):** katmanlar L₀ = {a}, L₁ = {b, c},
  L₂ = {d, e}, L₃ = {f}; uzaklıklar a 0, b 1, c 1, d 2, e 2, f 3; ebeveynler b ← a, c ← a, d ← b,
  e ← c, f ← d; ağacın derinliği 3. **DFS (a'dan, aynı liste sırasıyla):** ziyaret sırası
  a, b, c, e, d, f; ebeveynler b ← a, c ← b, e ← c, d ← e, f ← d; ağaç tek bir zincir ve derinlikler
  a 0, b 1, c 2, e 3, d 4, f 5. Yani δ(a, f) = 3 iken DFS ağacında f 5. seviyededir ve δ(a, d) = 2
  iken DFS derinliği 4'tür — makalenin "DFS en kısa yol vermez" iddiasının somut kanıtı.
  Bitiş sırası f, d, e, c, b, a.
- **Makale 16'nın topolojik sıralama izi bir betikle doğrulandı.** DAG: a → c, a → d, b → d, c → e,
  d → e, d → f, e → g, f → g. Düğümler alfabetik sırayla denenerek tam DFS çalıştırıldığında bitiş
  sırası g, e, c, f, d, a, b; tersi **b, a, d, f, c, e, g**. Sekiz kenarın hepsinde kaynak,
  hedeften önce geliyor (0 < 2, 1 < 4, 1 < 2, 4 < 5, 2 < 5, 2 < 3, 5 < 6, 3 < 6). Grafa g → a
  kenarı eklendiğinde ters bitiş sırası değişmiyor ama **tam olarak o kenar** kuralı ihlal ediyor —
  döngü tespitinin çalıştığının kanıtı.
- **Graf temsili yer hesabı.** |V| = 10⁶, |E| = 10⁷ için: matris 10¹² hücre, hücre başına 1 bit ile
  1,25 × 10¹¹ bayt = 125 GB; komşuluk listeleri |V| + 2|E| = 2,1 × 10⁷ girdi. Basit yönsüz grafta
  üst sınır C(10⁶, 2) ≈ 5 × 10¹¹ kenar, yoğunluk 10⁷ / 5 × 10¹¹ = 2 × 10⁻⁵. Dolaşma maliyeti
  matriste 10¹², listede 1,1 × 10⁷ adım.
- **Makale 17'nin olumlu ispatı elle ve sayısal olarak denetlendi.** 3n² + 100n + 10 ≤ 14n²
  eşitsizliği 11n² − 100n − 10 ≥ 0'a denk; kökü (100 + √10.440)/22 = 9,1898, dolayısıyla c = 14 için
  **en küçük eşik n₀ = 10**'dur. n = 10: 1.310 ≤ 1.400 ✓; n = 9: 1.153 > 1.134 ✗. İkinci tanık
  c = 113, n₀ = 1: n = 1'de iki taraf da 113'tür ve 110n² − 100n − 10 ≥ 0 her n ≥ 1 için doğrudur.
- **4ⁿ / 2ⁿ = 2ⁿ** oranı: n = 10'da 1.024, n = 20'de 1.048.576.
- **1000n ile n² kesişimi** tam n = 1000'dedir (10⁶ = 10⁶). n = 100'de 100.000'e karşı 10.000;
  n = 10⁶'da 10⁹'a karşı 10¹².
- **log₂ n ile n^0,1 kesişimi** ikili aramayla n ≈ 10^17,69 bulundu. n = 10¹⁵: 49,8 > 31,6;
  n = 10¹⁷: 56,5 > 50,1; n = 10¹⁸: 59,8 < 63,1; n = 10²⁰: 66,4 < 100.
- **log₂(n!) sınırları.** Alt sınır zinciri: n! ≥ (n/2)^(n/2) ⇒ log₂(n!) ≥ (n/2)(log₂ n − 1);
  n ≥ 4 iken log₂ n − 1 ≥ (log₂ n)/2 olduğu (n = 4'te eşitlik, n = 3'te sağlanmıyor) sayısal olarak
  denetlendi, dolayısıyla **c = 1/4, n₀ = 4** tanıklarıyla log₂(n!) = Ω(n log n). Üst sınır
  n! ≤ nⁿ'den. Değerler: n = 10 → 22 / 33 (oran 0,656); n = 10³ → 8.529 / 9.966 (0,856);
  n = 10⁶ → 18.488.885 / 19.931.569 (0,928); kaba alt sınır (n/2)log₂(n/2) n = 10⁶ için 9.465.784.
- **Makale 18'in kapalı ifadesi doğrulandı.** T(1) = 0, T(n) = 2T(n/2) + n − 1 bağıntısı özyinelemeli
  olarak hesaplandı ve n log₂ n − n + 1 formülüyle karşılaştırıldı: n = 2 → 1, n = 4 → 5, n = 8 → 17,
  n = 16 → 49, n = 64 → 321, n = 1024 → 9.217; hepsi birebir eşleşti.
- **Hanoi.** T(n) = 2T(n − 1) + 1, T(1) = 1 döngüyle hesaplandı; T(64) = 2⁶⁴ − 1 =
  18.446.744.073.709.551.615 ≈ 1,845 × 10¹⁹.
- **Master Teoremi uygulamaları elle denetlendi.** log₂ 3 = 1,584963 ve log₂ 7 = 2,807355.
  T(n) = T(n/2) + Θ(1): log₂ 1 = 0, g = Θ(n⁰ log⁰ n) ⇒ Durum 2, k = 0 ⇒ Θ(log n).
  T(n) = 2T(n/2) + Θ(n) ⇒ Durum 2, k = 0 ⇒ Θ(n log n).
  T(n) = 2T(n/2) + Θ(n²): n² = Ω(n^(1+1)) ve düzenlilik 2·(n/2)² = n²/2 = ½·g(n), c = ½ < 1 ⇒
  Durum 3 ⇒ Θ(n²). T(n) = 4T(n/2) + Θ(n) ve T(n) = 3T(n/2) + Θ(n): g = O(n^(log_b a − ε)) ⇒
  Durum 1 ⇒ Θ(n²) ve Θ(n^1,585).
- **Üç rejim sayısal olarak doğrulandı.** T(n) = a·T(n/2) + n − 1 bağıntısı a = 1, 2, 3 için
  n = 2…2²⁰ aralığında hesaplandı; girdi ikiye katlandığında maliyet oranı sırasıyla 2,000, 2,111
  ve 3,001 çıktı — yani Θ(n), Θ(n log n) ve Θ(n^log₂3). a = 3, n = 2²⁰ için T = 5,23 × 10⁹ ve
  n^(log₂ 3) = 3,49 × 10⁹ (sabit ≈ 1,5).
- **Master Teoreminin boşluğu.** T(n) = 2T(n/2) + n/log n: n^(log₂ 2) = n, g = n/log n. Hiçbir
  ε > 0 için n/log n = O(n^(1−ε)) olmaz (Lemma 13.7.3'ten), Durum 2 k ≥ 0 istediği için uygulanmaz
  (gereken k = −1), Durum 3 de geçerli değil. Akra-Bazzi ile p = 1 ve ∫ du/(u log u) = log log u
  integralinden **Θ(n log log n)** çıkar; bu elle hesaplandı.
