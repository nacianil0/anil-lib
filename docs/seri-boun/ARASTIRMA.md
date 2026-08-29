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
