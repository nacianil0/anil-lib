# BOUN CmpE Serisi — Resmî Kaynak ve Kanıt Defteri

> Karar taşıyan kaynakların kalıcı kaydı. Kural: resmî gerçek, tasarım çıkarımı ve informal
> sinyal birbirinden ayrılır; hiçbir kaynak "kesin interview syllabus" gibi sunulmaz.
> Kaynak önceliği: (1) güncel resmî Boğaziçi CmpE graduate/interview bilgisi, (2) güncel resmî
> curriculum/course catalog/prerequisite/ders materyali, (3) standart textbook ve güvenilir
> akademik kaynak, (4) açıkça etiketlenmiş informal/legacy sinyal.

Erişim tarihi: **2026-09-01** (Batch 7 run'ında kapsam kararını taşıyan **CMPE250 ve CMPE300**
sayfaları yeniden çekildi ve ikisinin de metninin değişmediği doğrulandı — §12). Kapsamı etkilemeyen
resmî sayfaların son tam doğrulaması **2026-08-29**'dur (§5); üretim run'ları kapsam kararını
etkileyen sayfaları yeniden doğrular ve bu defteri günceller. İlk doğrulama: 2026-08-28 (kurulum
görevi).

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

## 11. Batch 6 üretim run'ında doğrulanan kaynaklar (2026-08-30)

Bu batch'in üç makalesi de **Faz C** içindedir ve resmî dayanağı CMPE300'dür. CMPE300 sayfası
aynı gün (Batch 5) doğrulandığı ve Faz C boyunca geçerli sayıldığı için **yeniden çekilmedi**;
§10'daki birebir alıntılar geçerlidir. Makale 20 ve 21'in kaynakçası, ders çıktılarındaki
"basic classes of algorithms (comparison-based, recursive, divide-and-conquer, dynamic, greedy,
numerical, graph)" ifadesine dayanır; makale 19 ise aynı bölümün "the theory of complexity
analysis, basic techniques that are commonly used in analyzing the performance" kısmına.

### Makale 19–21'de kullanılan akademik kaynaklar

- **MIT 6.042J *Mathematics for Computer Science* ders kitabı (Lehman, Leighton, Meyer)** —
  §10'daki yöntemle yeniden indirildi; bu batch'te **5.4 State Machines** bölümünün tamamı okundu.
  - **5.4.1 States and Transitions** — durum makinesinin "bir küme üzerinde ikili bağıntı"
    olarak tanımı, geçiş bağıntısı, durum grafı ve belirlenmiş başlangıç durumu; 99-sınırlı
    sayaç örneği.
  - **5.4.2 Invariant for a Diagonally-Moving Robot** — çapraz hareket eden robotun geçişleri
    {(m, n) → (m ± 1, n ± 1)}; Even-sum özelliği, Lemma 5.4.1 (geçiş çiftliği korur), Teorem 5.4.2
    (erişilebilen her durumda koordinat toplamı çifttir, geçiş sayısı üzerinden tümevarımla) ve
    Sonuç 5.4.3 (robot (1, 0) noktasına ulaşamaz).
  - **5.4.3 The Invariant Principle** — yürütme (Tanım 5.4.4) ve erişilebilir durum tanımları;
    **korunan değişmezin tanımı (Tanım 5.4.5)**: "P(q) doğru ve q → r ise P(r) doğrudur";
    **Değişmez İlkesi**: "korunan bir değişmez başlangıç durumunda doğruysa erişilebilen bütün
    durumlarda doğrudur"; ilkenin tümevarım ilkesinin yeniden ifadesi olduğu ve başlangıç durumunun
    taban duruma, korunmanın tümevarım adımına karşılık geldiği. Kutu: ilke **Robert W. Floyd**
    tarafından **1967'de Carnegie Tech'te** formüle edildi; Floyd, dilbilgisi ve program doğrulama
    temelleri üzerine çalışmalarıyla **1970'lerin sonunda Turing Ödülü** aldı; kutuda ayrıca
    ilkenin "aşikâr" görünmesine karşın asıl değerinin bu kadar basit bir yöntemin bu kadar geniş
    biçimde uygulanabilmesi olduğu anlatılıyor.
  - **5.4.5 Fast Exponentiation** — Floyd'un iki doğrulama özelliği ayrımı: **kısmi doğruluk
    (partial correctness)** "bir sonuç varsa doğrudur; süreç bir döngüde takılıp hiç sonuç
    üretmeyebilir" ve **sonlanma (termination)** "süreç her zaman bir sonuç üretir"; kısmi
    doğruluğun Değişmez İlkesiyle, sonlanmanın İyi Sıralama İlkesiyle ispatlandığı. Hızlı üs alma
    programı (x, y, z ilk değerleri a, 1, b; z = 0 olunca y döndürülür; r = z mod 2; z = ⌊z/2⌋;
    r = 1 ise y = xy; x = x²); durum kümesi ℝ × ℝ × ℕ; **korunan değişmez z ∈ ℕ ve y·xᶻ = aᵇ** ve
    korunmanın z çift (x², y, z/2) ile z tek (x², xy, (z−1)/2) durumları için ayrı ayrı cebirsel
    ispatı; kısmi doğruluğun z = 0 durumundan okunması; çarpma sayısının **en fazla
    2(⌈log b⌉ + 1)** olması, çünkü z her geçişte en az yarılanır ve b sıfırdan büyükken en fazla
    ⌈log b⌉ + 1 kez yarılanabilir.
  - **5.4.6 Derived Variables** — sonlanma ispatının durumlara bir "büyüklük" atamaya dayandığı;
    türetilmiş değişken kavramı ve fizikteki potansiyel fonksiyonlarıyla benzerliği; **Tanım 5.4.6**
    kesin azalan (q → q′ ise f(q′) < f(q)) ve zayıf azalan tanımları; **Teorem 5.4.7**: kesin azalan
    N-değerli bir türetilmiş değişken varsa q durumundan başlayan yürütmenin uzunluğu **en fazla
    f(q)**; **Teorem 5.4.8**: değer kümesi iyi sıralı olan kesin azalan bir değişken varsa her
    yürütme sonlanır; ve **zayıf azalmanın sonlanmayı garanti etmediği** (sonsuz bir yürütme,
    değişkenin sabit kaldığı durumlardan geçebilir). Güneydoğuya sıçrayan robot örneği, adım sayısı
    önceden sınırlanamayan bir sonlanma örneğidir.
  - **Problem 5.32** — üçlü tabana dayanan bir çarpma algoritmasının durum makinesi olarak
    modellenmesi ve "Değişmez Yöntemiyle kısmi doğruluğun ispatı" istenmesi; ayrıca 5.4 alıştırma
    notu: **"Uygun bir değişmezi keşfetmek zor olabilir."**
- **MIT 6.046J *Design and Analysis of Algorithms*, Bahar 2015, Lecture 1: Introduction
  (Demaine, Devadas, Lynch)** — PDF §10'daki yöntemle indirilip tam metin okundu.
  - Aralık çizelgeleme: n istek, tek kaynak, s(i) ve f(i) ile s(i) her zaman f(i)'den küçük;
    **bağdaşma tanımı** "f(i) ≤ s(j) veya f(j) ≤ s(i)"; amaç en büyük bağdaşan altkümeyi seçmek.
  - **Açgözlü algoritmanın tanımı**: "a myopic algorithm that processes the input one piece at a
    time with no apparent look ahead" ve üç adımlı iskelet (basit bir kuralla i seç; i ile
    bağdaşmayan bütün istekleri reddet; bütün istekler işlenene kadar tekrarla).
  - **Dört seçim kuralı** ve üçünün "Bad" olarak işaretlenmesi: en erken başlayan (minimum s(i)),
    en kısa süren (minimum f(i) − s(i)), en az çakışanı seçen; dördüncüsü **en erken biten**
    (minimum f(i)).
  - **Sav 1**: çıktının s(i₁) < f(i₁) ≤ s(i₂) < f(i₂) ≤ … biçiminde bir zincir olduğu, çelişkiyle
    ispat (aksi hâlde algoritmanın ikinci adımıyla çelişki).
  - **Sav 2**: en erken biten kuralının optimal olduğu, optimal çözümün büyüklüğü k üzerinden
    tümevarımla; adımda **f(i₁) ≤ f(j₁)** kullanılarak optimal çözümdeki ilk aralığın açgözlünün
    seçtiğiyle değiştirilmesi ve kalan alt problemin (s(i) ≥ f(i₁) olan istekler) tümevarım
    hipotezine bağlanması.
  - **Ağırlıklı aralık çizelgeleme**: "A key observation here is that the greedy algorithm no
    longer works" ve dinamik programlamaya geçiş (alt problem tanımı Rₓ = {j ∈ R | s(j) ≥ x},
    opt(R) = max(w(i) + opt(R_{f(i)})), n alt problem ve O(n²) toplam süre).
- **MIT 6.046J/18.401J *Introduction to Algorithms (SMA 5503)*, Güz 2005, Lecture 3: Divide and
  Conquer (Demaine, Leiserson)** — PDF indirilip okundu.
  - **Desenin üç adımı birebir**: "1. Divide the problem (instance) into subproblems. 2. Conquer
    the subproblems by solving them recursively. 3. Combine subproblem solutions." ve birleştirmeli
    sıralamanın bu üç adıma oturtulması (Divide: trivial · Conquer: iki alt diziyi özyinelemeli
    sırala · Combine: doğrusal zamanlı birleştirme), buradan T(n) = 2T(n/2) + Θ(n).
  - İkili arama T(n) = T(n/2) + Θ(1) çözümüyle Θ(lg n).
  - **Matris çarpımı**: n × n matrisin 2 × 2'lik (n/2) × (n/2) blok matrisi olarak yazılması,
    r = ae + bg, s = af + bh, t = ce + dh, u = cf + dg ile **sekiz** özyinelemeli çarpım;
    T(n) = 8T(n/2) + Θ(n²), n^(log₂8) = n³, Durum 1 ile Θ(n³) ve kayıt: **"No better than the
    ordinary algorithm."**
  - **Strassen**: "Multiply 2 × 2 matrices with only 7 recursive mults"; T(n) = 7T(n/2) + Θ(n²),
    n^(log₂7) ≈ n^2,81, Durum 1 ile Θ(n^(lg 7)); ve pratik not: "üsteki fark küçük görünse de
    etkisi büyüktür; Strassen bugünün makinelerinde kabaca **n ≥ 32**'den itibaren sıradan
    algoritmayı geçer." Ayrıca kayıtlı en iyi kuramsal sonuç Θ(n^2,376) olarak anılıyor.
- **MIT 6.006 *Introduction to Algorithms*, Güz 2011, Lecture 11: Numerics I (Demaine, Devadas)** —
  PDF indirilip okundu.
  - n basamaklı iki sayının yarıya bölünmesi: x = x₁·r^(n/2) + x₀, y = y₁·r^(n/2) + y₀ ile
    z = x·y = x₁y₁·rⁿ + (x₀y₁ + x₁y₀)·r^(n/2) + x₀y₀; "4 multiplications of half-sized ⇒
    quadratic algorithm Θ(n²)".
  - **Karatsuba's Method**: z₀ = x₀y₀, z₂ = x₁y₁, z₁ = (x₀ + x₁)(y₀ + y₁) − z₀ − z₂ = x₀y₁ + x₁y₀;
    "There are three multiplies"; T(n) = 3T(n/2) + Θ(n) = Θ(n^(log₂3)) = Θ(n^1,5849625…).
  - **Dallanma çarpanı şekli** (Figure 3): 4T(n/2) için 4^(log₂ n) = n², 3T(n/2) için
    3^(log₂ n) = n^(log₂3). Ayrıca Python'ın büyük tam sayı çarpımında bu yöntemi kullandığı notu.
- **MIT 6.046J, Bahar 2015, Lecture 2: Divide and Conquer** — §10'da okunmuştu; bu batch'te
  makale 20 için yeniden kullanıldı (konveks kabuk teğetleri ve medyan bulma). Yeni çıkarılan
  ayrıntılar: kaba kuvvet konveks kabuğun O(n²) kenar × O(n) denetim, toplam **O(n³)** olması;
  noktaların x koordinatına göre **bir kez** sıralanması (O(n log n)); y(i, j) tanımı (ayırıcı L
  doğrusu ile (aᵢ, bⱼ) parçasının kesişme yüksekliği) ve "(aᵢ, bⱼ) üst teğettir ancak ve ancak
  y(i, j) maksimumdur" savı ile gerekçesi; iki parmaklı yürüyüşün sözde kodu; medyan bulmada rank
  tanımı, Select(S, i) yordamı, beşerli sütunlar, medyanların medyanı, **"At least 3(⌈n/10⌉ − 2)
  elements are > x"** sınırı, T(n) = T(⌈n/5⌉) + T(7n/10 + 6) + Θ(n) bağıntısı, **"Master theorem
  does not apply"** tespiti, n/5 + 7n/10 sezgisi ve T(n) ≤ c·n tahmininin **c ≥ 20a** ile
  tümevarımla ispatı.
- **MIT 6.046J, Güz 2005, Lecture 16: Greedy Algorithms (and Graphs) (Leiserson)** — PDF indirilip
  okundu. Bu batch'te yalnızca **çerçeve** için kullanıldı; MST içeriği bilinçli olarak makale 23'e
  bırakıldı.
  - **"Hallmark for greedy algorithms — Greedy-choice property: A locally optimal choice is
    globally optimal."**
  - **Optimal altyapının kes-yapıştır ispatı**: MST'den (u, v) kenarı çıkarılınca T₁ ve T₂ alt
    ağaçları oluşur ve w(T) = w(u, v) + w(T₁) + w(T₂); T₁ daha hafif bir kapsayan ağaçla
    değiştirilebilseydi bütün de hafifler, çelişki.
  - Örtüşen alt problemlerin de var olduğu, dolayısıyla dinamik programlamanın **da**
    uygulanabileceği, ancak açgözlü seçim özelliğinin daha verimli bir algoritma verdiği.
  - Değişim (swap) argümanının kanonik kullanımı: kesit teoremi ispatında (u, v) kenarı, T içindeki
    u–v yolunun A ile V∖A arasını geçen ilk kenarıyla takas edilir.
- **Sedgewick, R. & Wayne, K. *Algorithms*, 4. baskı** — resmî site algs4.cs.princeton.edu'dan üç
  bölüm sayfası okundu.
  - **2.1 Elementary Sorts** — eklemeli sıralamanın "briç elini sıralar gibi kartları teker teker
    alıp önceden bakılanların arasında doğru yere yerleştirmek" tarifi ve gerçekleştirimde büyük
    öğeleri bir sağa kaydırıp boşalan yere yerleştirme; **Önerme:** rastgele sıralı N elemanlı
    dizide ortalama ~N²/4 karşılaştırma ve ~N²/4 takas, en kötü durumda ~N²/2 ve ~N²/2, **en iyi
    durumda N − 1 karşılaştırma ve 0 takas**; ters çift (inversion) tanımı ve **Önerme:** takas
    sayısı ters çift sayısına eşittir, karşılaştırma sayısı en az ters çift sayısı ve en fazla
    ters çift sayısı artı dizi uzunluğudur.
  - **3.1 Elementary Symbol Tables** — ikili aramanın fikri: "**aranan anahtarı içerebilecek alt
    diziyi sınırlayan indisleri koruruz**"; orta elemanla karşılaştırıp sol ya da sağ yarıya inmek;
    **Önerme B:** N anahtarlı sıralı bir dizide arama (başarılı ya da başarısız) en kötü durumda
    **lg N + 1**'den fazla karşılaştırma yapmaz; **Önerme C:** sıralı diziye ekleme en kötü durumda
    ~2N dizi erişimi ister.
  - **5.5 Data Compression** — sabit uzunluklu kodun R simge için ⌈lg R⌉ bit istemesi; değişken
    uzunluklu kodlarda tek anlamlı çözülebilirlik ihtiyacı; **önek-serbest kod tanımı** ve örnek:
    {01, 10, 0010, 1111} önek-serbesttir, {01, 10, 0010, 1010} değildir (10, 1010'un önekidir);
    Huffman kodlarının optimal önek-serbest kodları kurması, **David Huffman tarafından 1950'de
    MIT'de öğrenciyken bulunması** ve **Property A: "No prefix free code uses fewer bits."**
    Alıştırmalardan iki incelik: (a) "Any optimal prefix-free code can be obtained via Huffman's
    algorithm" ifadesi **yanlıştır** — A 26, B 24, C 14, D 13, E 12, F 11 frekanslarında C3 kodu
    optimaldir ama A ile B aynı bitle başlar, oysa Huffman kodunda bu imkânsızdır; (b)
    Shannon-Fano'nun yukarıdan aşağı bölme yöntemi optimal değildir. **Not:** bu sayfa "under
    major construction" uyarısı taşır ve kitabın tam metnini değil özetini verir; Huffman
    algoritmasının adım adım tarifi ve optimallik ispatı bu sayfada **yoktur**, dolayısıyla
    makale 21'deki açgözlü seçim özelliği ve optimal altyapı argümanları 6.046J'nin genel açgözlü
    çerçevesine dayandırıldı ve ayrıca sayısal olarak bağımsız doğrulandı (aşağıya bakınız).
- **CLRS 4. baskı** — bölüm düzeyinde atıf sürüyor (§8'deki borç geçerli). Bu batch'te kullanılan
  bölüm adları daha önce doğrulanmıştı: **2. bölüm (Getting Started)**, **4. bölüm
  (Divide-and-Conquer)**, **9. bölüm (Medians and Order Statistics)** ve **15. bölüm (Greedy
  Algorithms)**. Makale 19'un üç adım adı (initialization / maintenance / termination) CLRS'in
  2. bölümünden gelir ve bu, **erişilebilir bir birincil kaynakla doğrulanamadı**; bölüm adı
  doğrulanmış olduğu için atıf bölüm düzeyinde yapıldı ve kavramın kendisi 6.042'nin Değişmez
  İlkesiyle bağımsız olarak kuruldu.

### Bu batch'te bağımsız hesaplanan ve elle denetlenen iddialar

Aşağıdaki iddiaların hepsi Python betikleriyle sıfırdan hesaplandı; hiçbiri kaynaktan
kopyalanmadı.

- **Eklemeli sıralamanın izi ve iki değişmezi.** A = [5, 2, 4, 6, 1, 3] üzerinde algoritma
  çalıştırıldı; **her yinelemede** dış değişmez (A[1..i] sıralı **ve** başlangıçtaki A[1..i]
  elemanlarının permütasyonu) ve **her iç adımda** iç değişmez (A[j+2..i] hücreleri yinelemenin
  başındaki A[j+1..i−1] elemanlarını taşır, hepsi key'den büyüktür, sıralıdır; A[1..j]
  dokunulmamıştır) `assert` ile denetlendi ve ihlal bulunmadı. Ara diziler: i = 2 sonrası
  [2, 5, 4, 6, 1, 3]; i = 3 sonrası [2, 4, 5, 6, 1, 3]; i = 4 sonrası değişmedi; i = 5 sonrası
  [1, 2, 4, 5, 6, 3]; i = 6 sonrası [1, 2, 3, 4, 5, 6].
- **İkili aramanın izi.** A = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] dizisinde 40 arandı: aralıklar
  [1, 10], [6, 10], [6, 7], [7, 7]; orta elemanlar sırasıyla A[5] = 16, A[8] = 56, A[6] = 23,
  A[7] = 38; dördüncü karşılaştırmadan sonra lo = 8 ve hi = 7. Aralık uzunlukları 10, 5, 2, 1, 0.
  x = 0…99 için **bütün** aramalar doğru sonucu verdi ve gözlenen en kötü adım sayısı **4** oldu;
  Sedgewick'in sınırı lg 10 + 1 ≈ 4,32. Değişmez ("x dizideyse indisi lo..hi arasındadır") her
  yinelemede `assert` ile denetlendi.
- **Değişmez korunur ama döngü durmaz.** Yarı açık aralıklı ikili aramada `lo = mid + 1` yerine
  `lo = mid` yazılan sürüm aynı dizide 91 arandığında 50 yinelemelik sınırı aştı ve (lo, hi) çifti
  (8, 9) değerinde sabitlendi. Değişmez ihlal edilmedi; ölçü hi − lo kesin azalmadığı için sonlanma
  bozuldu.
- **Hızlı üs alma.** a = 3, b = 13 için (x, y, z) izi (3, 1, 13), (9, 3, 6), (81, 3, 3),
  (6561, 243, 1), (43046721, 1594323, 0); her adımda y·xᶻ = 1.594.323 = 3¹³ olduğu `assert` ile
  denetlendi. **4 yineleme, 7 çarpma**; naif yöntem 12 çarpma; kaynağın üst sınırı
  2(⌈log₂13⌉ + 1) = 10. Ayrıca a = 2…11 ve b = 0…19 için 200 çift denendi, hepsinde y = aᵇ çıktı.
- **Karatsuba.** 1234 × 5678 elle yürütüldü: x₁ = 12, x₀ = 34, y₁ = 56, y₀ = 78; z₂ = 672,
  z₀ = 2652, z₁ = 46 · 134 − 3324 = 2840 = x₀y₁ + x₁y₀ = 1904 + 936; z = 672·10⁴ + 2840·10² + 2652
  = **7.006.652** = 1234 · 5678. Ayrıca Karatsuba özyinelemeli olarak kodlandı ve 200 rastgele
  sekiz basamaklı çift üzerinde doğrulandı.
- **Dallanma çarpanı sayıları.** log₂3 = 1,5849625007 ve log₂7 = 2,8073549221. n = 2¹⁰ = 1024 için
  4¹⁰ = 1.048.576 = n² ve 3¹⁰ = **59.049** = n^(log₂3); oran **17,8**. n = 2²⁰ için oran 315,3.
  Strassen tarafında n = 2¹⁰ için 8¹⁰ = 1.073.741.824 ve 7¹⁰ = 282.475.249; oran 3,80 ve
  1024^(log₂7) = 7¹⁰ eşitliği sayısal olarak doğrulandı.
- **Medyan bulmada grup boyutu.** g tek olmak üzere garanti edilen eleme oranı ((g+1)/2)/(2g)
  değeridir: g = 3 için 1/3, g = 5 için 3/10, g = 7 için 2/7. Alt problem paylarının toplamı
  1/g + (1 − oran) olur: **g = 3 için tam 1,0000** (geometrik azalma yok), **g = 5 için 0,9000**,
  g = 7 için 0,8571. Bağıntı T(n) = T(n/g) + T((1 − oran)·n + 6) + n biçiminde sayısal olarak
  çözüldü (taban n ≤ 200): g = 3 için T(n)/n oranı n = 10³…10⁷ aralığında 4,48 → 8,07 → 11,64 →
  15,22 → 18,83 diye onluk başına yaklaşık 3,6 sabit artışla büyüyor (logaritmik); **g = 5 için**
  aynı oran 3,57 → 5,68 → 7,02 → 7,94 → 8,57 diye 1/(1 − 0,9) = 10 sınırına yaklaşarak duruyor
  (doğrusal). Ayrıca beşerli grup için 3(⌈n/10⌉ − 2) sınırı hesaplandı: n = 1000'de en az **294**
  eleman her iki tarafta, alt problem en fazla 706 = 0,706 n; n = 10⁴ için 0,7006 n. T(n) ≤ 20·n
  tahmini n = 141…20.000 aralığında **sıfır ihlal** verdi. Medyan-medyanı seçim algoritması ayrıca
  kodlandı ve 400 rastgele örnekte doğru sonucu verdiği doğrulandı.
- **Tabana devretme eşiği.** ~n²/4 (eklemeli, ortalama) ile ~n log₂ n (birleştirmeli)
  karşılaştırıldı: eşitsizlik n < 4 log₂ n biçimine indirgenir ve **n ≤ 15** için eklemeli sıralama
  daha az karşılaştırma yapar (n = 16'da eşitlik: 64 = 64).
- **Naif Fibonacci.** Özyineleme ağacındaki çağrı sayısı **2·F(n+1) − 1** olarak sayıldı ve formül
  n = 0…29 için birebir doğrulandı: F(20) için 21.891; F(30) için 2.692.537; F(40) için
  **331.160.281** (döngüyle 40 adım; oran yaklaşık 8,3 × 10⁶); F(50) için 40.730.022.147. F(30)
  ağacında **F(15) tam 987 kez** hesaplanıyor (987 = F(16)).
- **Aralık çizelgeleme karşı örnekleri kaba kuvvetle doğrulandı.** Optimal çözüm bütün altkümeler
  taranarak bulundu; açgözlü kurallar indis tabanlı (nesne özdeşliği değil) çakışma sayımıyla
  çalıştırıldı — ilk denemede özdeşlik karşılaştırması yüzünden yanlış bir karşı örnek üretilmişti,
  düzeltildi.
  - En erken başlayan: [0, 10], [1, 2], [3, 4], [5, 6] ile açgözlü **1**, optimal **3**.
  - En kısa süren: [0, 5], [4, 6], [5, 10] ile açgözlü **1**, optimal **2**.
  - En az çakışan: [0, 4], [6, 10], [12, 16], [18, 22], [2, 7], [3, 8], [1, 9], [14, 19], [15, 20],
    [13, 21], [9, 13] listesinde çakışma sayıları sırasıyla 3, 4, 4, 3, 4, 4, 4, 4, 4, 4 ve
    **[9, 13] için 2**; açgözlü [9, 13], [0, 4], [18, 22] seçip **3**'te kalıyor, optimal ilk
    dördüyle **4**. (Bu karşı örnek elle kuruldu; ayrıca 400.000 rastgele örnek taranarak bağımsız
    bir karşı örnek daha bulundu — dokuz aralıklı bir örnek, açgözlü 3 / optimal 4.)
  - En erken biten kuralı **200.000 rastgele örnekte** (uç noktalar 0…6, 1–6 aralık) ve ayrıca
    20.000 farklı örnekte optimal çözümle karşılaştırıldı: **sıfır başarısızlık**. Aynı testte
    en erken başlayan 2.653, en kısa süren 368 örnekte optimalin altında kaldı.
- **Para üstü.** {1, 3, 4} sisteminde 6 birim için açgözlü 4 + 1 + 1 = **3 para**, dinamik
  programlamayla optimal **2 para** (3 + 3). Aynı sistemde 1…30 aralığında **7 tutarda** açgözlü
  optimal değil. {1, 5, 10, 25, 50} sisteminde 1…300 aralığında **sıfır** sapma; {1, 5, 10, 20, 50}
  de sapmasız; {1, 7, 10} sisteminde 1…60 aralığında 15 sapma (ilki 14: açgözlü 5, optimal 2).
- **Sırt çantası.** Eşyalar (10, 60), (20, 100), (30, 120) ve kapasite 50: oranlar 6, 5, 4; kesirli
  açgözlü **240**; 0/1 açgözlü ilk iki eşyayı alıp **160**; kaba kuvvetle 0/1 optimal ikinci ve
  üçüncü eşyayla **220**.
- **Huffman.** A: 34, E: 25, N: 15, R: 12, I: 9, S: 5 (toplam 100) için algoritma öncelik kuyruğuyla
  çalıştırıldı. Birleştirme sırası S+I = 14, R+14 = 26, N+E = 40, 26+A = 60, 40+60 = 100. Kodlar
  N = 00, E = 01, A = 11, R = 100, S = 1010, I = 1011; toplam **240 bit**; sabit uzunluklu kod
  ⌈lg 6⌉ = 3 bit ile **300 bit**; kazanç **%20**; ortalama kod uzunluğu **2,40 bit** (entropi alt
  sınırı 2,3355 bit). Önek-serbestlik denetlendi. **Optimallik kaba kuvvetle doğrulandı:** altı
  yapraklı bütün ikili ağaç şekilleri üretildi ve en iyi maliyetin 240 olduğu görüldü; ayrıca
  1.000 rastgele frekans kümesinde (2–6 simge) Huffman'ın maliyeti kaba kuvvet en iyisiyle
  **sıfır sapmayla** eşleşti.
- **"Her optimal önek-serbest kod bir Huffman kodu değildir" doğrulandı.** A: 26, B: 24, C: 14,
  D: 13, E: 12, F: 11 için Huffman **250 bit** veriyor; C3 kodu (A = 00, B = 01, C = 100, D = 101,
  E = 110, F = 111) da **250 bit**; kaba kuvvet en iyisi de 250. C3 kodunda A ile B ilk bitte
  aynı, oysa Huffman ağacında en seyrek iki simge (E ve F) kardeş olmak zorundadır ve bu da
  betikle denetlendi.

### Batch 5'ten kalan ε borcu kapandı (yöntem notu)

§10, Master Teoreminin ε işaretlerinin `pdftotext` çıktısında görünmediğini ve Durum 1'in üssünün
log_b(a) − ε, Durum 3'ünkünün log_b(a) + ε olduğunun belgenin kendi karakter kodlamasından
çıkarıldığını kaydetmişti. Bu run'da ortamda **`pypdf`** bulunduğu görüldü ve aynı sayfa onunla
yeniden çıkarıldı. `pypdf`, `pdftotext`'in düşürdüğü matematik yazı tipini **doğru çözüyor**:

- **Durum 1** birebir: `If g.n/D logO ( n b .a/ ✏ ) for some constant ✏>0`
- **Durum 2** birebir: `g.n/D ‚( logn b .a/ logk .n/ )` ve sonuç `‚( logn b .a/ logkC1.n/ )`
- **Durum 3** birebir: `If g.n/D  ( logn b .a/C✏ ) for some constant ✏>0 and ag.n=b/ < cg.n/
  for some constant c<1 and sufficiently large n`

Yani **ε her iki durumda da doğrudan görülüyor** (✏ karakteri olarak) ve **Durum 3'ün üssündeki
"+" işareti "C" kodlamasıyla doğrudan okunuyor** — §10'daki "+" → "C" çıkarımı böylece bağımsız
olarak doğrulandı.

**Eksi işareti hâlâ kurtarılamıyor** ve bunun tool değil **belge** kaynaklı olduğu ayrıca
denetlendi: aynı yöntemle §5.4.5'teki bilinen bir formül çıkarıldı ve `(z − 1)/2` ifadesi
`.z   1/=2` biçiminde, yani eksi yerine boşlukla çıktı. Eksi glifi belgenin gömülü yazı tipinin
ToUnicode eşlemesinde yok; belgenin her yerinde düşüyor. Dolayısıyla Durum 1'deki
`log_b(a) ␣ ε` boşluğunun bir eksi olduğu artık **çıkarım değil, aynı belgede doğrulanmış bir
kodlama davranışının sonucudur**. Pratik sonuç: makale 18'in Master Teoremi ifadesi doğrudur ve
bu borç kapanmıştır. Ortamda hâlâ PDF'i görüntüye çeviren bir araç (`pdftoppm`, `pymupdf`,
`pdf2image`) **yoktur**; `pypdf` yalnızca metin çıkarır, sayfayı rasterleştirmez.

## 12. Batch 7 üretim run'ında doğrulanan kaynaklar (2026-09-01)

Bu batch'in üç makalesi de **Faz C** içindedir ve Faz C'yi kapatır. Resmî dayanağı CMPE300'dür;
makale 24 ayrıca CMPE250'nin katalog tanımına dayanır.

### Resmî sayfalar yeniden doğrulandı (2026-09-01)

HANDOFF "resmî sayfa borcu yok" diyordu (son doğrulama 2026-08-30) fakat SOZLESME §4 kapsam
kararını taşıyan sayfaların **üretim run'ında** yeniden doğrulanmasını istediği için iki sayfa da
yeniden çekildi. **İkisinin de metni değişmemiştir.**

- **CMPE250** (<https://cmpe.bogazici.edu.tr/courses/cmpe250/>) — *Catalog Description* birebir:
  "Graphs. Advanced Sorting. Hashing. Heap Structures. Search Structures. Complexity. Parallel
  algorithms. File organization." Önkoşul CMPE160. Makale 24'ün "paralel algoritmalar" başlığının
  ikinci resmî dayanağı budur.
- **CMPE300** (<https://cmpe.bogazici.edu.tr/courses/cmpe300/>) — *Course Information* (Analysis of
  Algorithms, güz, Lecture 3 / PS 0 / Labs 2, 3 kredi / 5 ECTS, önkoşul CMPE250, öğretim üyesi
  Tunga Güngör), *Catalog Description* ve *Course Learning Outcomes* §10'daki birebir metinle
  aynıdır. **Bu run'da §10'un kaydetmediği bir paragraf daha okundu** — ders çıktıları bölümünün
  ilk paragrafı, dersin amacını şöyle tanımlıyor: "This course is intended to introduce the student
  to the main paradigms of algorithm analysis, methods and mathematical tools used for analyzing
  the performance of algorithms, **the theory of parallel algorithms**, as well as known sequential
  and parallel algorithmic solutions to frequently encountered problems." Makale 24'ün paralel
  algoritmalar bölümü doğrudan bu cümleye dayanır.
- **Ayrım korunuyor:** "the theory of complexity analysis", "lower bound theory" ve "master
  theorem" ifadeleri **katalog tanımında değil, ders çıktılarındadır**; katalog tanımı ise
  "parallelism" ve "probabilistic algorithms" sözcüklerini taşır. Makale 24'ün kaynakçası bu iki
  bölümü ayrı ayrı ve birebir alıntılayarak gösterir.

### CLRS 4. baskı bölüm adı borcu KAPANDI

HANDOFF'un "Açık borçlar" bölümü, **14, 21 ve 22. bölümlerin adlarının doğrulanması gerektiğini**
söylüyordu. Bu kayıt **eskimişti**: §8, MIT Press'in resmî *Selected Solutions* belgesinden bu üç
bölümü zaten doğrulamış durumdaydı. Yine de belge bu run'da **yeniden indirilip** içindekiler
tablosu baştan okundu (<https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/11599/selected-solutions.pdf>,
83 sayfa; künye "Instructor's Manual to Accompany Introduction to Algorithms, Fourth Edition …
Copyright © 2022 by The Massachusetts Institute of Technology", sürüm notu "14 March 2022. Initial
release."). İçindekiler tablosundan **birebir** okunan bölüm adları:

- 2 Getting Started · 3 Characterizing Running Times · 4 Divide-and-Conquer ·
  **5 Probabilistic Analysis and Randomized Algorithms** · 6 Heapsort · **7 Quicksort** ·
  **8 Sorting in Linear Time** · 9 Medians and Order Statistics · 10 Elementary Data Structures ·
  11 Hash Tables · 12 Binary Search Trees · 13 Red-Black Trees · **14 Dynamic Programming** ·
  15 Greedy Algorithms · 16 Amortized Analysis · 17 Augmenting Data Structures ·
  19 Data Structures for Disjoint Sets · 20 Elementary Graph Algorithms ·
  **21 Minimum Spanning Trees** · **22 Single-Source Shortest Paths** ·
  **23 All-Pairs Shortest Paths** · 24 Maximum Flow.
- Alt bölümlerin **varlığı** (adları değil) çözüm başlıklarındaki alıştırma numaralarından
  türetildi; bu run'da tam liste çıkarıldı: 2.2–2.3 · 3.2–3.3 · 4.2, 4.4 · 5.2–5.3 · 6.1–6.2,
  6.4–6.5 · 7.2 · 8.1–8.3 · 9.3 · 11.2 · 12.1–12.3 · 13.1, 13.3 · **14.2–14.4** · 15.1–15.2 ·
  16.1–16.2 · 17.1–17.3 · 19.2 · 20.1–20.4 · **21.1** · **22.1, 22.3–22.5** · 23.1–23.3 · 24.2–24.3.
- **Hâlâ doğrulanamayan:** 1. ve 18. bölümlerin adları (belge yalnızca seçilmiş çözümleri taşıdığı
  için içindekilerde yoklar) ve **bütün alt bölüm başlıkları**. Bu yüzden makale 22–24'ün kaynakçası
  CLRS'e yine **bölüm düzeyinde** atıf yapar.

### 6.006 Bahar 2020'de hangi derslerin dinamik programlama olduğu doğrulandı

HANDOFF, "6.006 Bahar 2020'nin dinamik programlama ders notları (Lecture 15–19 aralığı; hangi
numaraların DP olduğu doğrulanmalı)" diyordu. Ders listesi sayfasından başlıklar birebir okundu ve
borç kapandı: **DP dersleri 15, 16, 17 ve 18'dir**; 19 "Complexity", 20 "Course Review"dır.

- 5 Linear Sorting · 9 Breadth-First Search · 10 Depth-First Search · **11 Weighted Shortest
  Paths** · **12 Bellman-Ford** · **13 Dijkstra's Algorithm** · 14 ASP & Johnson's Algorithm ·
  **15 Dynamic Programming, Part 1: SRBOT, Fib, DAGs, Bowling** · **16 Dynamic Programming, Part 2:
  LCS, LIS, Coins** · **17 Dynamic Programming, Part 3** · **18 Dynamic Programming, Part 4: Rods,
  Subsetsums, Pseudopolynomial** · 19 Complexity · 20 Course Review.
- **Not:** ders listesi sayfasındaki başlık ile PDF'in kendi başlığı her zaman aynı değildir —
  Lecture 15'in PDF başlığı "Recursive Algorithms", Lecture 16'nınki "Dyn. Prog. Subproblems",
  Lecture 18'inki "Pseudopolynomial"dır. Kaynakçada PDF başlığı değil, ders listesi başlığı
  kullanıldı ve içerik özeti PDF'ten alındı.
- İndirme yolu §10'daki yöntemin aynısıdır; tek istisna Lecture 18'in kaynak sayfasının
  `mit6_006s20_lec18_pdf` (sondaki `_pdf` ekiyle) adını taşımasıdır.

### Makale 22–24'te kullanılan akademik kaynaklar

- **MIT 6.006 Bahar 2020, Lecture 15 (Recursive Algorithms)** — özyinelemeli çağrıların bağımlılık
  grafı ve sonlanan algoritmada bu grafın döngüsüz olması; desenlerin graf şekline göre
  sınıflandırılması (kaba kuvvet → yıldız, azalt-yönet → zincir, böl-yönet → ağaç, **dinamik
  programlama → DAG**, açgözlü/artımlı → altgraf); DP'nin tanımı "if subproblem dependencies
  overlap (DAG, in-degree > 1)"; iki slogan "Recurse but re-use" (yukarıdan aşağı) ve "Careful
  brute force" (aşağıdan yukarı); adın Richard Bellman tarafından konması ("Wanted government
  funding, needed cool name to disguise doing mathematics!" ve "Updating (dynamic) a plan or
  schedule (program)"); naif Fibonacci'nin T(n) = T(n−1) + T(n−2) + O(1) > 2T(n−2) ⇒ Ω(2^(n/2))
  maliyeti ve "Subproblem F(k) computed more than once!" kaydı; belleklemeli ve tablolamalı iki
  Fibonacci kodu; **Fibonacci sayılarının Θ(n) bit uzunluğundan gelen O(n + n²/w) düzeltmesi**;
  **SRT BOT** altı adımı (Subproblem, Relate, Topological order, Base cases, Original problem,
  Time) ve her adımın açılımı; optimal altyapının dipnotta "It is a property of recursion, not just
  dynamic programming" diye kaydedilmesi; DAG en kısa yollarının SRT BOT ile yazılması ve DAG
  gevşetmesinin "aynı min değerleri adım adım ve u'nun çıkan komşuları perspektifinden hesapladığı"
  notu; bowling örneğinde böl-yönet çözümünün T(n) = 4T(n/2) + O(1) = O(n²) vermesi ve son ek
  alt problemleriyle Θ(n)'e inmesi; bağıntı kurma yöntemi "bir soru sor, cevaplarını yerel olarak
  kaba kuvvetle dene" ve verimlilik için cevap sayısının polinom olması gerektiği.
- **MIT 6.006 Bahar 2020, Lecture 16 (Dyn. Prog. Subproblems)** — LCS'in SRT BOT ile tam çözümü
  (alt problem son ekler üzerinde x(i, j); eşleşme durumunda x(i+1, j+1) + 1, aksi hâlde
  max{x(i+1, j), x(i, j+1)}; taban durum bir dizgi bitince 0; topolojik sıra azalan i + j; maliyet
  O(|A|·|B|)) ve `hieroglyphology` / `michaelangelo` örneğinde uzunluk 5 ile dört çözüm (`hello`,
  `heglo`, `iello`, `ieglo`); LIS'te doğal alt problemin yetmemesi ve **alt problem
  kısıtlama/genişletme** tekniği; dönüşümlü madenî para oyununda alt problem genişletmesi; alt
  problem sayısı ile bağıntının dallanması arasındaki takas.
- **MIT 6.006 Bahar 2020, Lecture 18 (Pseudopolynomial)** — çubuk kesmede birim uzunluk başına en
  değerli parçayı seçen açgözlünün optimal olmaması (L = 7, v = [0, 1, 10, 13, 18, 20, 31, 32];
  arg max v[ℓ]/ℓ = 6 ve [6, 1] bölümü 32 verirken optimal 2 + 2 + 3 ile 33'tür); altküme toplamının
  alt problemi x(i, t) ve O(nT) maliyeti; **yukarıdan aşağının yalnızca erişilebilir alt problemleri
  çözmesi**; **sözde polinom** tanımı ("running time is bounded above by a constant-degree
  polynomial in input size and input integers") ve güçlü polinom ile zayıf polinom ayrımı; sayma
  sıralaması, radix sıralaması, doğrudan erişim dizisi kurulumu ve Fibonacci'nin de sözde polinom
  olması; sırt çantasının çubuk kesme ile altküme toplamını genellemesi ve yalnızca sözde polinom
  kalması; altküme toplamının polinom zamanda çözülüp çözülemeyeceğinin P ≠ NP'ye bağlanması.
- **MIT 6.006 Bahar 2020, Lecture 11 (Weighted Shortest Paths)** — ağırlık fonksiyonu w : E → ℤ;
  δ(s, t) = inf{w(π)} ve **neden minimum değil infimum** (negatif ağırlıklı çevrim varsa sonlu
  uzunlukta minimum ağırlıklı yol olmayabilir); negatif çevrim üzerinden erişilen düğümler için
  δ = −∞; alt yolların da en kısa yol olması; SSSP kısıt/algoritma/maliyet tablosu (BFS ağırlıksız
  |V| + |E|; DAG gevşetmesi |V| + |E|; Dijkstra negatif olmayan |V| log |V| + |E|; Bellman-Ford
  serbest |V|·|E|); **üçgen eşitsizliği** ve gevşetmenin tanımı; **gevşetmenin güvenliği**
  ("Relaxing some edge (u, v) sets d(s, v) to d(s, u) + w(u, v), which is the weight of a path from
  s to v through u"); DAG gevşetmesinin topolojik sıra üzerinde tümevarımla doğruluğu; en kısa
  yollar ağacının uzaklıklar bilindikten sonra doğrusal zamanda kurulabilmesi.
- **MIT 6.006 Bahar 2020, Lecture 12 (Bellman-Ford)** — yönsüz grafta negatif çevrim sorusunun
  bayağılığı ve tartışmanın yönlü graflara kısıtlanması; **Sav 1** (negatif çevrim yoksa sonlu her
  en kısa yolun basit olduğu, çelişkiyle ispat) ve buradan en fazla |V| − 1 kenar; **k-kenarlı
  uzaklık δ_k** tanımı; **tanık (witness)** tanımı δ_{|V|}(s, v) < δ_{|V|−1}(s, v) ve **Sav 2**
  (δ(s, v) = −∞ olan her düğümün bir tanıktan erişilebilir olduğu); graf çoğaltmasıyla |V| + 1
  seviyeli bir DAG kurulması ve DAG gevşetmesinin oradan çalıştırılması; **Sav 3** (δ(s₀, v_k) =
  δ_k(s, v), k üzerinden tümevarım) ve **Sav 4**; O(|V|·|E|) maliyet; geleneksel sürümün "her turda
  bütün kenarları gevşeten" hâlinin tahminlerinin k-kenarlı uzaklıklara karşılık gelmediği ve
  analizinin daha çetrefil olduğu uyarısı.
- **MIT 6.006 Bahar 2020, Lecture 13 (Dijkstra's Algorithm)** — BFS'in "kaynağın etrafında küre
  büyütme" fikrinin ağırlıklı genellemesi; **Gözlem 1** (negatif olmayan ağırlıklarda en kısa yol
  boyunca uzaklığın azalmaması) ve **Gözlem 2** (uzaklık sırası bilinseydi problemin DAG
  gevşetmesine indirgeneceği); **değiştirilebilir öncelik kuyruğu** arayüzü (`build`, `delete_min`,
  `decrease_key`) ve bunun bir öncelik kuyruğu ile bir sözlüğün **çapraz bağlanmasıyla**
  gerçekleştirilmesi, düğüm kimlikleri 0..|V|−1 tam sayı olduğu için sözlüğün doğrudan erişim dizisi
  olabilmesi; doğruluk ispatının zinciri d(s, y) ≤ δ(s, x) + w(x, y) = δ(s, y) ≤ δ(s, v′) ≤ d(s, v′)
  ≤ d(s, y) ve **negatif olmayan ağırlıkların tam olarak δ(s, y) ≤ δ(s, v′) adımında kullanılması**;
  maliyetin O(B_{|V|} + |V|·M_{|V|} + |E|·D_{|V|}) biçiminde yazılması ve dizi O(|V|²), ikili heap
  O(|E| log |V|), Fibonacci heap O(|E| + |V| log |V|) tablosu; seyrek/yoğun graf ayrımı ve
  "Fibonacci heap kuramda iyidir ama pratikte pek kullanılmaz" notu.
- **MIT 6.006 Bahar 2020, Lecture 5 (Linear Sorting)** — Batch 4'te okunmuştu, bu batch'te makale
  24'ün alt sınır bölümü için yeniden okundu. Birebir çekirdek: "Comparison model implies that
  algorithm decision tree is binary (constant branching factor)"; "Requires # leaves L ≥ # possible
  outputs"; "Tree height lower bounded by Ω(log L), so worst-case running time is Ω(log L)";
  sıralamada çıktı sayısının n! olması ve **log(n!) ≥ log((n/2)^(n/2)) = Ω(n log n)** adımı; "So
  merge sort is optimal in comparison model"; arama alt sınırı "any decision tree with n nodes has
  height ≥ ⌈lg(n+1)⌉ − 1"; doğrudan erişim dizisinin "an operation with linear branching factor!"
  olarak modeli kırması.
- **MIT 6.046J Güz 2005, Lecture 16 (Greedy Algorithms and Graphs)** — Batch 6'da okunmuştu, bu
  batch'te MST bölümü için yeniden kullanıldı. MST tanımı ve ağırlıkların farklı olduğu basitleştirme;
  **optimal altyapı teoremi** (T'den (u, v) çıkınca T₁ ve T₂ indüklenmiş alt grafların MST'leridir)
  ve kes-yapıştır ispatı; "Do we also have overlapping subproblems? Yes." ve "dynamic programming
  may work … but MST exhibits another powerful property which leads to an even more efficient
  algorithm"; **kesit teoremi** ("Let T be the MST of G = (V, E), and let A ⊆ V. Suppose that
  (u, v) ∈ E is the least-weight edge connecting A to V − A. Then, (u, v) ∈ T") ve u'dan v'ye giden
  tek basit yol üzerindeki ilk kesen kenarla takas ispatı; Prim'in sözde kodu ve **Zaman = Θ(V)·
  T_EXTRACT-MIN + Θ(E)·T_DECREASE-KEY** formülü; el sıkışma lemmasından Θ(E) örtük DECREASE-KEY;
  dizi O(V²) / ikili heap O(E lg V) / Fibonacci heap O(E + V lg V) tablosu; Kruskal'ın ayrık küme
  yapısıyla O(E lg V) maliyeti ve "Best to date: Karger, Klein, and Tarjan [1993], randomized,
  O(V + E) expected time" notu.
- **MIT 6.046J Güz 2005, Lecture 17 (Shortest Paths I)** — bu run'da indirilip okundu. Yol ağırlığı
  ve δ(u, v) tanımları; **optimal altyapı** ("A subpath of a shortest path is a shortest path",
  kes-yapıştır); **üçgen eşitsizliği** δ(u, v) ≤ δ(u, x) + δ(x, v); negatif çevrim varlığında bazı
  en kısa yolların var olmaması; Dijkstra'nın üç adımlı açgözlü fikri ve sözde kodu; gevşetmenin
  **örtük DECREASE-KEY** olması; Doğruluk I (d[v] ≥ δ(s, v) değişmezi, ilk ihlal üzerinden üçgen
  eşitsizliğiyle çelişki), Doğruluk II (u, v'nin en kısa yoldaki öncülüyse ve d[u] = δ(s, u) ise
  (u, v) gevşetildikten sonra d[v] = δ(s, v)) ve Doğruluk III (S'ye eklenen her düğüm için
  d[v] = δ(s, v); ispatta y'nin S dışındaki ilk düğüm seçilmesi ve d[y] = δ(s, y) ≤ δ(s, u) < d[u]
  çelişkisi); **"Note: Same formula as in the analysis of Prim's minimum spanning tree algorithm."**
  ve aynı üç satırlık kuyruk tablosu; ağırlıklar 1 iken öncelik kuyruğunun yerini FIFO kuyruğun
  alması, yani BFS ve O(V + E); BFS'in doğruluk anahtarı olarak "The FIFO Q in breadth-first search
  mimics the priority queue Q in Dijkstra".
- **MIT 6.046J Bahar 2015, Lecture 6 (Randomization: Matrix Multiply, Quicksort)** — bu run'da
  indirilip okundu. Rastgeleleştirilmiş algoritma tanımı ("Algorithm that generates a random number
  r ∈ {1, ..., R} and makes decisions based on r's value"; aynı girdide farklı çalıştırmalar farklı
  adım sayısı ve farklı çıktı verebilir); **Monte Carlo / Las Vegas tablosu** ("runs in polynomial
  time" / "always runs in expected polynomial time"; "output is correct with high probability" /
  "output always correct"); **Freivalds'ın çarpım denetleyicisi**: rastgele ikili r için A(Br) = Cr
  denetimi, üç matris-vektör çarpımıyla O(n²), AB = C ise Pr[YES] = 1, AB ≠ C ise Pr[YES] ≤ 1/2 ve
  ispatın r ↦ r + v birebir eşlemesi; hızlı sıralamanın üç sürümü ve sıralı girdide temel sürümün
  T(n) = T(0) + T(n−1) + Θ(n) = Θ(n²) olması; **"paranoyak" hızlı sıralama**: iyi eksen tanımı
  (|L| ve |G| ≤ 3n/4), iyi eksen olasılığının 1/2'den büyük olması, E(#iterations) ≤ 2,
  T(n) ≤ T(n/4) + T(3n/4) + 2cn, ağaç yüksekliğinin log_{4/3}(2cn) ile sınırlı olması, seviye başına
  2cn iş ve sonuç Θ(n log n) beklenen süre.
- **MIT 6.172 Güz 2018, Lecture 7 (Races and Parallelism; Julian Shun, Charles Leiserson)** —
  **bu run'da keşfedilen yeni kaynak.** Paralel komut akışının DAG olarak modellenmesi ve
  düğümlerin "a sequence of instructions not containing a spawn, sync, or return from a spawn"
  tanımı; **T_P**, **T₁ = iş**, **T∞ = açıklık** (kritik yol uzunluğu / hesaplama derinliği)
  tanımları; **İŞ YASASI T_P ≥ T₁/P** ve **AÇIKLIK YASASI T_P ≥ T∞**; ardışık bileşimde iş ve
  açıklığın toplanması, paralel bileşimde işin toplanıp açıklığın maksimum alınması;
  **paralellik = T₁/T∞** ve bunun "the average amount of work per step along the span" olarak
  okunması; **Amdahl yasası** ve aynı örnekte Amdahl'ın 6 kat sınırı verirken gerçek paralelliğin
  18/9 = 2 olması; alt-doğrusal / doğrusal / süper-doğrusal hızlanma tanımları ve süper-doğrusalın
  iş yasası yüzünden bu modelde imkânsız olması; **açgözlü çizelgeleyici teoremi [G68, B75, EZL89]
  T_P ≤ T₁/P + T∞** ve iki satırlık ispatı (tam adımlar ≤ T₁/P çünkü her tam adım P birim iş
  bitirir; eksik adımlar ≤ T∞ çünkü her eksik adım kalan DAG'ın açıklığını 1 azaltır); sonuç
  "any greedy scheduler achieves within a factor of 2 of optimal" ve T₁/T∞ ≫ P olduğunda neredeyse
  mükemmel doğrusal hızlanma; **paralel gevşeklik T₁/(P·T∞)**; iş / açıklık / paralellik tablosu
  (birleştirmeli sıralama Θ(n lg n) / Θ(lg³n) / Θ(n/lg²n); matris çarpımı Θ(n³) / Θ(lg n);
  Strassen; LU; FFT Θ(n lg n) / Θ(lg²n); BFS Θ(E) / Θ(d lg V)); **paralel hızlı sıralamanın**
  beklenen işi Θ(n lg n), açıklığı Θ(n) ve paralelliği Θ(lg n); Cilk'in iş-çalan çizelgeleyicisinin
  T_P = T₁/P + O(T∞) beklenen süresi [BL94].
  - **Neden bu kaynak:** HANDOFF, paralel algoritmalar için "6.046J Bahar 2015'in … paralel
    algoritmalar dersleri" demişti. Ders listesi bu run'da okundu ve **6.046J Bahar 2015'te paralel
    algoritmalar dersi olmadığı** görüldü; 19 ve 20. dersler *senkron/asenkron dağıtık
    algoritmalardır*, paralel değil. İş/açıklık çerçevesinin kanonik OCW kaynağı 6.172'dir.
- **Sedgewick, R. & Wayne, K. *Algorithms*, 4. baskı, 4.3 (Minimum Spanning Trees) ve 4.4 (Shortest
  Paths)** — algs4.cs.princeton.edu'dan okundu. 4.3'ten: kesit ve kesen kenar tanımları, ağırlıklar
  farklıysa MST'nin tek olması, **Kesit özelliği** önermesi ("the crossing edge of minimum weight is
  in the MST of the graph") ve açgözlü MST algoritmasının bunun genel hâli olarak ifadesi; Prim'in
  tembel ve istekli gerçekleştirimleri ve **isteklinin her ağaç dışı düğüm için kuyrukta yalnızca
  tek bir kenar tutması**, bunun için `IndexMinPQ`'nun `decrease-key` işlemini gerektirmesi; tembel
  E log E, istekli E log V; Kruskal E log E ve union-find. 4.4'ten: en kısa yollar ağacı (SPT)
  tanımı, `distTo[]` ve `edgeTo[]` dizileri, kenar ve düğüm gevşetme kodları, **en kısa yol
  optimallik koşulları** önermesi, Dijkstra'nın E log V maliyeti, yönsüz grafın her kenarı iki yönlü
  kenara çevirerek çözülmesi, ağırlıklı DAG'larda topolojik sırayla **doğrusal zamanlı** ve negatif
  ağırlıkları da kaldıran çözüm, aynı yapının en uzun yol ve kritik yol yöntemine genişletilmesi.

### Bu batch'te bağımsız hesaplanan ve elle denetlenen iddialar

Bütün sayısal iddialar makaleye girmeden önce ayrı Python betikleriyle hesaplandı; hiçbiri kaynaktan
kopyalanmadı.

- **Naif Fibonacci çağrı sayısı** üç değerde sayaçla ölçüldü ve 2·F(n+1) − 1 formülüyle karşılaştırıldı:
  n = 6 → 25, n = 10 → 177, n = 30 → 2.692.537 (üçü de formüle birebir uyuyor). n = 30'da F(15)'in
  **987 kez** hesaplandığı doğrudan sayaçtan okundu. Makale 22'nin 1. şeklindeki F(5) ağacı 15 düğümlüdür
  ve düğüm dağılımı (F3 iki, F2 üç, F1 beş, F0 üç kez) sayaçla doğrulandı.
- **Ağırlıklı aralık çizelgeleme örneği** (A 09–11 / 4, B 11–13 / 8, C 12–15 / 11, D 13–15 / 5,
  E 13–17 / 10) rastgele arama ile bulundu ve şu özellikleri kaba kuvvetle doğrulandı: optimal **22**
  ve **tek** (A + B + E); en erken biteni seçen kural 17, en değerliyi seçen kural 15, birim zaman
  başına en değerliyi seçen kural 17, en kısa süreni seçen kural 17 verir — **dördü de optimalin
  altında**. p(j) değerleri ve OPT tablosunun beş satırı (4, 12, 15, 17, 22) elle yürütülüp kodla
  karşılaştırıldı.
- **LCS**: `hieroglyphology` ile `michaelangelo` için tablo dolduruldu, uzunluk **5** çıktı; `hello`,
  `heglo`, `iello`, `ieglo` dizgilerinin dördünün de her iki dizginin alt dizisi olduğu ayrı bir
  denetimle doğrulandı; alt problem sayısı 16 × 14 = 224, makalede kullanılan çarpım |A|·|B| = 195'tir.
- **0/1 sırt çantası** (kapasite 50; (10, 60), (20, 100), (30, 120)): DP tablosu **220** verdi, kaba
  kuvvet de 220 verdi, oran sırasıyla dolduran açgözlü **160**'ta kaldı, kesirli sürüm **240** yaptı.
  Alt problem sayısı (n + 1)(C + 1) = 204.
- **Çubuk kesme** (L = 7, v = [0, 1, 10, 13, 18, 20, 31, 32]): DP **33** ve parçalar [2, 2, 3];
  arg max v[ℓ]/ℓ = 6 ve [6, 1] bölümü **32** — ders notundaki iddia doğrulandı.
- **Para üstü** {1, 3, 4} sisteminde 6 için DP 2 para (3 + 3), açgözlü 3 para (4 + 1 + 1).
- **Altküme toplamı** A = (3, 4, 3, 1), T = 6: aşağıdan yukarı (n + 1)(T + 1) = **35** hücre,
  yukarıdan aşağı **15** erişilebilir durum (kendi sayma kuralımla; ders notu 14 diyor, sayım
  kuralı farkı — makalede kendi ölçtüğüm 15 kullanıldı).
- **MST ile en kısa yollar ağacının farklılığı**: A–B 4, A–C 3, A–E 7, B–C 2, B–D 5, C–E 6, D–E 1
  grafında Kruskal ve Prim **aynı** MST'yi verdi (A–C, B–C, B–D, D–E; toplam **11**), Dijkstra'nın
  ürettiği en kısa yollar ağacı ise **farklı** çıktı (A–B, A–C, A–E, E–D; kenar toplamı **15**;
  uzaklıklar A 0, C 3, B 4, E 7, D 8). Prim'in anahtar tablosu ve Dijkstra'nın tahmin tablosu adım
  adım yazdırıldı; makale 23'ün iki şekli bu iki çıktıdır.
- **Dijkstra'nın negatif kenarda çöktüğü** kapalı küme kullanan bir gerçekleştirimle gösterildi:
  s → a (1), s → b (2), b → a (−2) grafında Dijkstra δ(a) = 1 der, gerçek uzaklık **0**'dır
  (Bellman-Ford ile doğrulandı).
- **Bellman-Ford k-kenarlı uzaklık tabloları** iki kez üretildi: negatif kenarlı ama negatif
  çevrimsiz grafta tablo k = 2'de sabitlendi ve δ₄ = δ₅ çıktı; tek bir kenar eklenerek ağırlığı −2
  olan bir çevrim yaratıldığında tablo durulmadı ve k = 5'te bir **tanık** belirdi.
- **Yoğunluk eşiği**: |V| = 10⁵, |E| = 10⁶ için |E| lg |V| ≈ 1,66 × 10⁷ ile |V|² = 10¹⁰ (heap kazanır);
  |V| = 10⁴ tam grafta |E| ≈ 5 × 10⁷ için |E| lg |V| ≈ 6,6 × 10⁸ ile |V|² = 10⁸ (dizi kazanır).
- **Karşılaştırmalı sıralama alt sınırı** somut değerleri: lg(3!) = 2,58 → en az 3; lg(10!) = 21,79
  → en az 22; lg(20!) = 61,08 → en az 62. Makale 24'ün 1. şeklindeki üç elemanlı karar ağacının altı
  yaprağının doğru permütasyonlara karşılık geldiği elle denetlendi.
- **Paranoyak hızlı sıralamada iyi eksen olasılığı** sayıldı: n = 100 → 52/100, n = 1.000 → 502/1.000,
  n = 10.000 → 5.002/10.000; hepsinde p > 1/2 ve 1/p < 2. Ağaç yüksekliği log_{4/3} n: n = 10⁶ için
  ≈ 48, lg n ≈ 20. Ayrıca algoritma kodlanıp n = 1.000 ve n = 10.000'de 20'şer kez çalıştırıldı,
  çıktının sıralı olduğu `assert` ile denetlendi.
- **Freivalds'ın hata oranı** ampirik olarak ölçüldü: 6 × 6 rastgele 0/1 matrislerde mod 2
  aritmetiğiyle, çarpımın tek bir hücresi kasten bozulduğunda 20.000 denemede yanlış "evet" oranı
  **0,4985** çıktı (kuramsal sınır 0,5).
- **İş/açıklık aritmetiği**: n sayının ikili indirgemesinde iş n − 1, açıklık ⌈lg n⌉; n = 8 için
  7 / 3 / ≈ 2,3 ve n = 10⁶ için 999.999 / 20 / **50.000**. Açgözlü çizelgeleyici sınırı T₁ = 18,
  T∞ = 9 için P = 2, 4, 8, 16'da hesaplandı ve optimal alt sınıra oranının sırasıyla 2,00 / 1,50 /
  1,25 / 1,12 olduğu, yani **hep 2'yi aşmadığı** doğrulandı. Amdahl sınırı 1/α = 6 ile gerçek
  paralellik T₁/T∞ = 2 karşılaştırıldı.

### Yöntem notu: bu run'da karşılaşılan tuzaklar

- **Bağımsız denetim betiği yazarken `sync-series-hashes.cjs`'in hash tanımını birebir taklit etmek
  gerekiyor.** Hash, frontmatter'dan sonraki gövdenin **`.trim()` edilmiş** hâlinin UTF-8
  SHA-256'sıdır. Betiği trim'siz yazınca 24 makalenin **hepsi** sahte uyuşmazlık verdi; trim
  eklenince 24/24 temiz çıktı. HANDOFF'un satır sonu uyarısına ek olarak bu not da kayda geçiyor.
- **Dev sunucusu katalog dosyasını süreç ömrü boyunca önbelleğe alıyor.** Makale gövdesi düzenlenip
  `sync-series-hashes.cjs --write` çalıştırıldıktan sonra çalışan dev sunucusu **eski** katalog
  hash'ini tutmaya devam etti ve `/boun/<slug>` 500 verdi ("Katalog ile frontmatter uyuşmuyor").
  Diskteki iki değer birebir aynıydı; sorun yalnızca sunucu önbelleğidir. Çözüm: gövde
  düzenlendikten sonra dev sunucusunu **yeniden başlatmak**.
## 13. Batch 8 üretim run'ında doğrulanan kaynaklar (2026-09-02)

Makale 25 (NP-Tamlık), 26 (İşletim Sistemi Nedir?) ve 27 (Süreçler ve İş Parçacıkları) bu
kaynaklara dayanır. Bütün URL'ler bu run'da HTTP 200 ile çekildi; PDF'ler indirilip metne
çevrildi.

### Resmî sayfa

- **CMPE322** (<https://cmpe.bogazici.edu.tr/courses/cmpe322/>), yeniden doğrulama **2026-09-02**:
  sayfa yeniden çekildi, §1'deki özetle **birebir uyuşuyor**, kapsam kararını değiştiren bir fark
  yok. *Catalog Description* birebir: "Evolution of operating systems. Multiprogramming and time
  sharing concepts. User and program interfaces. Concurrent processes, CPU scheduling, process
  synchronization, critical section problem. Deadlock prevention, avoidance, detection and
  recovery. Memory management, swapping, multiple partitions. Paging, segmentation, virtual
  memory, page replacement algorithms. File system structures, allocation methods, directory
  implementation. I/O interfaces, secondary storage structure. Protection and Security: Access
  matrix and rights, capabilities, security issues. LINUX case studies." Sayfada ayrıca şu alanlar
  var: dönem Güz, önkoşul CMPE250, eşkoşul yok, 4 kredi / 6 ECTS, ders saati "Lecture: 3, PS:0,
  Labs: 2", öğretim dili İngilizce.
  **Kesinlik notu:** CMPE300'ün aksine bu sayfada **Course Learning Outcomes bölümü yoktur**;
  dersle ilgili bütün resmî içerik iddiaları yalnızca *Catalog Description*'a dayanabilir.
  Bu doğrulama, HANDOFF'un "Faz D açılmadan önce CMPE322 yeniden doğrulanmalı" borcunu kapatır.
- CMPE250 ve CMPE300 en son 2026-09-01'de (§12) doğrulandı; Faz C'nin son makalesi olan 25 için
  yeterlidir, bu run'da yeniden çekilmedi.

### Makale 25 için akademik kaynaklar

- **MIT 6.006 Introduction to Algorithms, Bahar 2020, Lecture 19: Complexity.**
  Kaynak sayfası: <https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec19/>
  · PDF: `.../fda666a4db1dc65b3d71be08115502bd_MIT6_006S20_lec19.pdf` (5 sayfa).
  Doğrulanan birebir içerik: karar probleminin tanımı ("assignment of inputs to YES (1) or NO
  (0)") ve yedi satırlık örnek tablosu; program/problem sayma argümanı ("Program is finite
  (constant) string of bits, i.e., a nonnegative integer ∈ N. Problem is function p : N → {0, 1},
  i.e., infinite string of bits" ve "(# of programs |N|, countably infinite) ≪ (# of problems
  |R|, uncountably infinite)"), Cantor köşegen argümanına atıf ve sonuç ("Proves that most
  decision problems not solvable by any program (undecidable)"); **R / EXP / P** tanımları ve
  **P ⊊ EXP ⊊ R** kesin kapsamaları (zaman hiyerarşi teoremlerine dayandırılır); satrancın
  EXP ∖ P'de olması; **NP'nin doğrulayıcı tanımı** üç koşuluyla; P ⊆ NP ve NP ⊆ EXP gerekçeleri;
  indirgeme ("Because B can be used to solve A, B is at least as hard as A"); NP-hard tanımı ve
  **NP-complete = NP ∩ NP-hard**; ilk NP-tam problem olarak Circuit SAT; NP-tam problem listesi;
  **Subset Sum'ın "weakly NP-complete"** olması ("which is what allows a pseudopolynomial-time
  algorithm, but no polynomial algorithm unless P = NP") ve 3-Partition'ın "strongly NP-complete"
  olması; 3-boyamanın NP-tam, 2-boyamanın P'de olması.
  **Çıkarım uyarısı:** PDF'in ToUnicode eşlemesi bozuk olduğu için bazı semboller ham metinde
  yanlış çıkıyor; doğrulanmış eşlemeler `$` = ⊊, `6=` = ≠, `∈/` = ∉, `\` = ∖.
- **MIT 6.046J / 18.410J Design and Analysis of Algorithms, Bahar 2015, Lecture 16.**
  Ders listesindeki başlık "Complexity: P, NP, NP-completeness, Reductions"; PDF içindeki başlık
  **"Lecture 16: NP-Completeness"** (9 sayfa).
  Kaynak sayfası: <https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/resources/lecture-16-notes/>
  Doğrulanan birebir içerik: indirgeme tanımı ("a polynomial-time algorithm that converts inputs
  to problem A into equivalent inputs to problem B"); NP-hard tanımı ve "If P ≠ NP, then X ∉ P";
  NP-tamlık ispatının iki adımı ve indirgemenin üç ispat yükümlülüğü; 3SAT'ın **Cook tarafından
  1971'de** NP-tam bulunması ve NP-zorluğunun devre argümanıyla sezgisi; Subset Sum'ın 3DM'den
  indirgenmesi ve **"only weakly NP-hard"** gerekçesi ("the values of the numbers used in the
  reduction are exponential in input"); güçlü NP-zorluğun tanımı; Partition indirgemesindeki
  **"we can reduce Partition to Subset Sum, though this is not the direction we want for the
  reduction"** uyarısı — makaledeki "indirgemenin yönü" vurgusunun birincil dayanağı.
  **Kapsam notu:** bu notta EXP ve R **tanımlanmaz**, P ≠ NP diyagramı **yoktur**, karar/optimizasyon
  ayrımı tartışılmaz ve Vertex Cover / Knapsack / Hamiltonian Path **geçmez**. Ders notundaki
  NP-tam liste yalnızca şudur: 3SAT, Super Mario Brothers, 3DM, Subset Sum (weak), Partition
  (weak), Rectangle Packing (weak), 4-Partition (strong), Rectangle Packing (strong), Jigsaw
  Puzzles.
  **Kaynaktaki hata notu:** PDF'te "If B ∈ P, then A ∈ NP" yazıyor; doğrusu A ∈ P'dir. Makale bu
  satırı aktarmaz, doğru ifadeyi kullanır.
  **Erişim notu:** OCW CDN'i ilk istekte yanlış sayfayı önbellekten döndürdü; doğru içerik
  `Cache-Control: no-cache` + tarayıcı User-Agent + cache-buster sorgusu ile alındı.
- **MIT 6.045J / 18.400J Automata, Computability, and Complexity, Bahar 2011, Lecture 6: Turing
  machines** (yazıcı: Aseem Kishore; ders veren: Scott Aaronson; kaynak 6.080 GITCS, 14 Şubat 2008).
  PDF: <https://ocw.mit.edu/courses/6-045j-automata-computability-and-complexity-spring-2011/d6c18e634cdf3363ecac909bd2958b8b_MIT6_045JS11_lec06.pdf>
  Doğrulanan birebir içerik: Turing makinesinin sonlu otomattan farkı (banda yazma + istediği anda
  durma) ve her adımdaki üç karar; evrensel Turing makinesi ve Turing'in **1936 tarihli *On
  Computable Numbers*** makalesi; Church-Turing tezi ("anything we would naturally regard as
  'computable' is actually computable by a Turing machine"); **durma probleminin karar
  verilemezliği**, birebir ispatıyla: "Let P be a Turing machine that solves the halting problem…
  we can easily modify P to produce a new Turing machine Q, such that Q(M) runs forever if M(M)
  halts, or halts if M(M) runs forever. Then the question becomes: what happens with Q(Q)?";
  Cantor'un köşegen argümanı; Turing makinelerinin sayılabilir, problemlerin sayılamaz olması.
  **Not:** 6.006 Lecture 19 durma problemi için ayrı bir ispat vermez, 6.045'e yönlendirir; bu
  yüzden ispatın kaynağı 6.045'tir.
- **Sedgewick & Wayne, *Algorithms* 4. baskı, 4.2 Directed Graphs**
  (<https://algs4.cs.princeton.edu/42digraph/>). Doğrulanan birebir içerik: güçlü bağlılığın
  denklik bağıntısı olması (yansıma/simetri/geçişlilik açıkça listelenir) ve güçlü bileşenlere
  parçalaması; derinlik öncelikli sıralar (preorder, postorder, **reverse postorder**) ve
  "Remarkably, a reverse postorder in a DAG provides a topological order"; **Kosaraju-Sharir**
  algoritmasının üç adımı; maliyet önermesi ("uses preprocessing time and space proportional to
  V + E"); **iki geçişin sırasının değiştirilebilir olduğunu doğrulayan Q+A maddesi** ("True, the
  strong components of a digraph are the same as the strong components of its reverse") — makale
  bu değişkeni kullanır, çünkü 16'nın "ters bitiş sırası" dili böyle korunur; **2-SAT**: imalar
  grafının kurulumu ("For each clause x + y, include edges from y' to x and from x' to y") ve
  karar ölçütü ("The formula is satisfiable if and only if no variable x is in the same strong
  component as its negation x'"), yoğunlaştırma grafı ("kernel DAG (contract each strong component
  to a single vertex)").
  **Kapsam notu:** MIT 6.006 Bahar 2020'de **güçlü bağlı bileşen dersi yoktur** (20 ders başlığı
  tek tek okundu; tanım yalnızca Recitation 9'da geçer, algoritma verilmez). 16'nın SCC borcunun
  birincil kaynağı bu yüzden Sedgewick'tir, MIT değil.
- **Sedgewick & Wayne, *Algorithms* 4. baskı, 6.6 Intractability**
  (<https://algs4.cs.princeton.edu/66intractability/>) — P/NP'nin arama problemi çerçevesi,
  "nondeterministic polynomial time" adlandırması, Cook-Levin ve SAT'ın NP-tamlığı. Üçüncü kaynak
  olarak kaynakçada anılır.
- **CLRS uyarısı korundu:** NP-tamlık bölümü *Selected Solutions* belgesinin kapsadığı 24. bölümün
  ötesindedir ve bölüm numarası/adı o belgeden doğrulanamaz. **Makale 25 CLRS'e hiç atıf
  yapmamıştır**; risk böylece bertaraf edildi.

### Makale 26 ve 27 için akademik kaynaklar

- **OSTEP — *Operating Systems: Three Easy Pieces*, Remzi H. Arpaci-Dusseau & Andrea C.
  Arpaci-Dusseau, Arpaci-Dusseau Books, Sürüm 1.10.** Kanonik adres
  <https://pages.cs.wisc.edu/~remzi/OSTEP/> (200 döner; `https://www.ostep.org/` 301 döndüğü için
  atıfta kullanılmadı). İndirilen bölümler: `intro.pdf` (Ch. 2), `cpu-intro.pdf` (Ch. 4),
  `cpu-mechanisms.pdf` (Ch. 6), `threads-intro.pdf` (Ch. 26).
  Doğrulanan birebir içerik — **Ch. 2:** sanallaştırma tanımı ("the OS takes a physical resource
  … and transforms it into a more general, powerful, and easy-to-use virtual form of itself"),
  sanal makine / standart kütüphane / **kaynak yöneticisi** üçlü okuması, "A typical OS, in fact,
  exports a few hundred system calls", ve **2.6 Some History** bölümünün tamamı: kütüphane dönemi,
  **toplu iş** ("as a number of jobs were set up and then run in a 'batch' by the operator") ve
  etkileşimsizliğin ekonomik gerekçesi (saatte yüz binlerce dolar), **sistem çağrısının Atlas
  sisteminde icadı**, kullanıcı/çekirdek kipi ve tuzak/tuzaktan dönüş çifti, **çoklu programlama**
  ("the OS would load a number of jobs into memory and switch rapidly between them, thus improving
  CPU utilization") ile doğurduğu bellek koruması ve eşzamanlılık problemleri, Unix ve Linux.
  **Ch. 4:** sürecin tanımı ve **makine durumu** üçlüsü (adres uzayı, yazmaçlar — program sayacı
  ve yığın/çerçeve işaretçisi —, açık dosyalar), **ilke/düzenek ayrımı** kutusu, programdan sürece
  geçiş adımları (hevesli/tembel yükleme, yığının argc/argv ile doldurulması, heap, üç varsayılan
  dosya tanıtıcısı), **üç durum** (running/ready/blocked) ve **scheduled/descheduled** geçiş
  adları, iki süreç izi tablosu, **süreç listesi** ve **Process Control Block** tanımı, xv6 `proc`
  yapısının alan listesi, başlangıç durumu ve **zombi**.
  **Ch. 6:** kullanıcı/çekirdek kipi, tuzak komutunun tek adımda atlaması + ayrıcalık yükseltmesi,
  donanımın yazmaçları **süreç başına çekirdek yığınına** kaydetmesi, **tuzak tablosunun** açılışta
  kurulması, **sistem çağrısı numarasının** koruma katmanı olması ("user code cannot specify an
  exact address to jump to, but rather must request a particular service via number"), argüman
  denetiminin zorunluluğu, sistem çağrısı sayıları ("a few hundred" / erken Unix'te "around twenty
  calls"), işbirliğine dayalı yaklaşım ve sonsuz döngüde yeniden başlatma zorunluluğu, **zamanlayıcı
  kesmesi**, **bağlam anahtarındaki iki ayrı kaydetme** ("the user registers … are implicitly saved
  by the hardware, using the kernel stack of that process" / "the kernel registers are explicitly
  saved by the software … into memory in the process structure"), yığın değiştirmenin rolü,
  **lmbench ölçümleri**: 1996'da 200 MHz P6 üzerinde Linux 1.3.37 ile sistem çağrısı ≈ 4 µs,
  bağlam anahtarı ≈ 6 µs; modern 2–3 GHz sistemlerde mikrosaniyenin altı; Ousterhout'un gözlemi
  ("many OS operations are memory intensive, and memory bandwidth has not improved as dramatically
  as processor speed over time").
  **Ch. 26:** iş parçacığı tanımı, "they share the same address space and thus can access the same
  data", **TCB**, "the address space remains the same (i.e., there is no need to switch which page
  table we are using)", her iş parçacığına bir yığın ve **thread-local storage**, adres uzayı
  yerleşiminin bozulması ve özyineleme istisnası, **iki kullanım gerekçesi** (paralellik ve
  giriş/çıkış örtüşmesi: "Threading enables overlap of I/O with other activities within a single
  program, much like multiprogramming did for processes across programs"), süreç tercihinin ne
  zaman daha sağlam olduğu, paylaşılan sayaç örneği ve **gözlenen çıktılar 19345221 ile 19221041**
  (beklenen 20000000), artırmanın üç komutluk x86 dizisi ve adım adım yürütme izi, **yarış koşulu /
  veri yarışı / belirsiz / kritik kesim / karşılıklı dışlama / atomiklik** tanımları ve terimlerin
  Dijkstra'ya dayanması.
  **Eksik:** OSTEP **Chapter 5 (Process API, `cpu-api.pdf`)** bu run'da indirilmedi; `fork()`,
  `exec()` ve `wait()` anlatımı oradadır. Makale 27 süreç API'sini yalnızca soyut düzeyde
  (Create/Destroy/Wait/Status) verir. İleride süreç yaratma somutlaştırılacaksa o bölüm gerekir.
- **xv6: a simple, Unix-like teaching operating system** (RISC-V sürümü, rev4), Russ Cox, Frans
  Kaashoek, Robert Morris, 31 Ağustos 2024; MIT 6.1810 / 6.828.
  PDF: <https://pdos.csail.mit.edu/6.828/2024/xv6/book-riscv-rev4.pdf>
  Doğrulanan birebir içerik: işletim sisteminin üç gereksinimi (multiplexing, isolation,
  interaction); kütüphane yaklaşımının açığı ("It's more typical for applications to not trust each
  other, and to have bugs, so one often wants stronger isolation than a cooperative scheme
  provides"); "Strong isolation requires a hard boundary between applications and the operating
  system"; RISC-V'nin üç kipi (machine / supervisor / user) ve ayrıcalıklı komut örnekleri;
  **çekirdeğin tanımı** ("The software running in kernel space (or in supervisor mode) is called
  the kernel"); giriş noktasının çekirdek tarafından belirlenmesinin zorunluluğu ("if the
  application could decide the kernel entry point, a malicious application could, for example,
  enter the kernel at a point where the validation of arguments is skipped"); **monolitik çekirdek
  ile mikroçekirdek** karşılaştırması, sunucu kavramı, Linux'un monolitik olması, Minix/L4/QNX'in
  mikroçekirdek olması, seL4'ün biçimsel doğrulanabilecek kadar küçük olması ve "there is no
  conclusive evidence one way or the other" saptaması; sürecin xv6'da **yalıtım birimi** olması;
  Unix'in işlemcileri saydam biçimde değiştirmesi.
  **Not:** kitapta 'kernel' için tek bir formal tanım bloğu yoktur; tanım iki yerde verilir
  (Ch. 1 girişi ve §2.2), ikisi de yukarıda alıntılandı.
- **Corbató, F. J. & Vyssotsky, V. A., *Introduction and Overview of the Multics System*, 1965
  Fall Joint Computer Conference** (<https://multicians.org/fjcc1.html>) — **zaman paylaşımının
  birincil kaynaktan tanımı**, birebir: "This solution, usually called time-sharing, is basically
  the rapid time-division multiplexing of a central processor unit among the jobs of several
  users, each of which is on-line at a typewriter-like console. The rapid switching of the
  processor unit among user programs is, of course, nothing but a particular form of
  multiprogramming." Ayrıca toplu iş kurulumlarının kullanıcıyı yalıttığı saptaması, isteğin
  kaynağının programcıların hata ayıklama sırasındaki engellenmişliği olması ve ilk hedefin
  "giving to each of them the illusion of having the whole machine at his disposal" olarak ifade
  edilmesi. Sayfa multicians.org üzerindeki bir HTML transkripsiyondur; alıntılar sayfada
  göründüğü hâliyle aktarılmıştır.
  **Erişilemeyen:** Corbató/Daggett/Daley 1962 CTSS makalesinin tam metni
  (<https://dl.acm.org/doi/10.1145/1461518.1461551>) **HTTP 403** (bot engeli) döndü; künyesi
  yalnızca yukarıdaki bildirinin kaynakçasından doğrulandı ve makalelerde kullanılmadı.
- **Silberschatz, A., Galvin, P. B. & Gagne, G., *Operating System Concepts*, onuncu baskı, John
  Wiley & Sons** — resmî yazar sitesinden doğrulandı (<https://www.os-book.com/OS10/index.html>):
  başlık, "Tenth Edition", üç yazar, yayıncı ve "This new edition (April 15, 2018)" ifadesi.
  Resmî içindekiler PDF'inden (<https://www.os-book.com/OS10/toc-dir/toc.pdf>) doğrulanan bölüm ve
  alt bölüm adları: **Chapter 1 Introduction** (1.1 What Operating Systems Do, 1.4
  Operating-System Structure, 1.5 Resource Management, 1.6 Protection and Security, 1.7
  Virtualization), **Chapter 2 Operating-System Structures** (2.1 Operating-System Services, 2.3
  System Calls, 2.8 Operating-System Structure), **Chapter 3 Processes** (3.1 Process Concept, 3.2
  Process Scheduling, 3.3 Operations on Processes, 3.4 Interprocess Communication), **Chapter 4
  Threads & Concurrency** (4.1 Overview, 4.2 Multicore Programming, 4.3 Multithreading Models, 4.6
  Threading Issues), **Chapter 5 CPU Scheduling**. Bu kaynak makalelerde yalnızca "ders kitabı
  karşılığı" olarak anılır; içerik iddiaları OSTEP ve xv6'ya dayanır.

### Bu run'da bağımsız hesaplanan sayısal iddialar

Aşağıdakilerin hepsi kaynaktan aktarılmadı, **hesaplandı ya da programla doğrulandı**; betikler
run'ın çalışma alanındadır.

1. **Sözde polinom aritmetiği:** n = 100 tane 64 bitlik sayı → girdi ≈ 6.464 bit (808 bayt), T ≤
   2⁶⁴ ≈ 1,845 × 10¹⁹, tablo n·T ≈ 1,845 × 10²¹ hücre. n = 50, T = 10³ / 10⁶ / 10⁹ için tablo
   5 × 10⁴ / 5 × 10⁷ / 5 × 10¹⁰ hücre; aynı n'de kaba kuvvet 2⁵⁰ = 1.125.899.906.842.624.
2. **Polinom/üstel karşılaştırma:** n = 100 için n³ = 10⁶ ve 2¹⁰⁰ ≈ 1,268 × 10³⁰; saniyede 10⁹
   işlemle sırasıyla 1 ms ve ≈ 4,0 × 10¹³ yıl.
3. **İndirgeme bileşimi:** indirgeme O(n^k) ve B için O(m^j) ise A için O(n^{kj}); dört (k, j)
   çiftinde tek tek denetlendi.
4. **3-SAT örneği:** 4 clause'lu, 3 değişkenli formülün 8 atamasından **4'ü** sağlıyor (kaba
   kuvvet).
5. **Bağımsız küme ≤p düğüm örtüsü:** C₅ üzerinde en büyük bağımsız küme 2, en küçük düğüm örtüsü
   3, toplam 5 = |V|; beş maksimum bağımsız kümenin **hepsinin** tümleyeninin örtü olduğu tek tek
   denetlendi.
6. **3-SAT ≤p bağımsız küme:** 4 clause / 3 değişken → **12 düğüm, 24 kenar**; boyutu 4 olan bir
   bağımsız küme bulundu ve ondan okunan atamanın formülü sağladığı doğrulandı. Bütün atamaları
   kesen 8 clause'luk **sağlanamaz** formülde karşılık gelen grafta boyutu 8 olan bağımsız kümenin
   **olmadığı** da doğrulandı (iki yön birden).
7. **Güçlü bağlı bileşenler:** 8 düğüm / 11 kenarlı somut graf üzerinde Kosaraju-Sharir
   çalıştırıldı. Birinci geçişin bitiş sırası `h, g, f, c, e, d, b, a`; ters bitiş sırası
   `a, b, d, e, c, f, g, h`; bulunan bileşenler `{a,b,c}`, `{d,e}`, `{f,g,h}`. Aynı sonuç, her
   düğüm çiftinin karşılıklı erişilebilirliği kaba kuvvetle hesaplanarak **bağımsız olarak
   doğrulandı** (birebir aynı). Yoğunlaştırma grafının kenarları C₀→C₁, C₀→C₂, C₁→C₂ ve
   **çevrimsiz** olduğu ayrıca denetlendi.
8. **2-SAT:** dört formülde (2 sağlanabilir, 2 sağlanamaz) imalar grafı kurulup SCC kararı kaba
   kuvvet aramayla karşılaştırıldı; **dördünde de eşleşti**. Sağlanamayan örnekte her iki
   değişkenin de kendi değiliyle aynı bileşende olduğu görüldü.
9. **2-boyama / 3-boyama eşiği:** C₅ 2-boyanamaz ama 3-boyanabilir, C₆ 2-boyanabilir; BFS
   sonuçları kaba kuvvetle doğrulandı.
10. **Bağlam anahtarı çevrim aritmetiği (makale 27):** 200 MHz'de 6 µs = **1.200 çevrim**;
    3 GHz'de 0,5 µs = **1.500 çevrim**, 1 µs = 3.000 çevrim. Yani süre yaklaşık on kat düşerken
    çevrim sayısı düşmemiştir — bu çıkarım kaynağın Ousterhout gözlemiyle uyumludur ama sayılar
    bana aittir.
11. **Zamanlayıcı kesmesi ek yükü (makale 26):** işleyici 1 µs varsayımıyla, 10 ms'de bir kesme →
    saniyede 100 kesme → **%0,01**; 1 ms'de bir kesme → saniyede 1000 kesme → **%0,1**.
    Ayrıca 6 µs'lik bağlam anahtarıyla saniyede 100 anahtar → **%0,06** CPU.
12. **Yarış koşulu kayıp oranları (makale 27):** OSTEP'in gözlediği 19.345.221 ve 19.221.041
    değerleri için kayıp sırasıyla 654.779 (**%3,27**) ve 778.959 (**%3,89**); iki çalıştırma
    arasındaki fark 124.180. İki iş parçacığı × 10⁷ artırma × 3 komut = **60 milyon komut**.
