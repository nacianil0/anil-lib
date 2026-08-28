# BOUN CmpE Serisi — Resmî Kaynak ve Kanıt Defteri

> Karar taşıyan kaynakların kalıcı kaydı. Kural: resmî gerçek, tasarım çıkarımı ve informal
> sinyal birbirinden ayrılır; hiçbir kaynak "kesin interview syllabus" gibi sunulmaz.
> Kaynak önceliği: (1) güncel resmî Boğaziçi CmpE graduate/interview bilgisi, (2) güncel resmî
> curriculum/course catalog/prerequisite/ders materyali, (3) standart textbook ve güvenilir
> akademik kaynak, (4) açıkça etiketlenmiş informal/legacy sinyal.

Erişim tarihi: **2026-08-28** (bütün URL'ler bu tarihte doğrulandı; üretim run'ları kapsam
kararını etkileyen sayfaları yeniden doğrular ve bu defteri günceller).

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
  organization." Önkoşul: CMPE160.
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
