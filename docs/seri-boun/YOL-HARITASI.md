# "Mülakat Aynası: Boğaziçi CmpE" — Yol Haritası

> Serinin yaşayan omurgası (şu an 41 başlık, 5 faz), prerequisite grafı ve tasarım gerekçeleri.
> Kurallar: `docs/seri-boun/SOZLESME.md`. Durum: `docs/seri-boun/HANDOFF.md`. Kanıt defteri:
> `docs/seri-boun/ARASTIRMA.md`. Yayımlanmamış başlıklar **taslaktır**; batch hazırlığında
> pedagojik gerekçeyle güncellenebilir (yayımlananlar asla).

Son güncelleme: 2026-08-30 · Yayında: 15 (1–3 Batch 0, 4–6 Batch 1, 7–9 Batch 2, 10–12 Batch 3, 13–15 Batch 4) · Sıradaki: 16

## Serinin tezi

Boğaziçi CmpE M.Sc. scientific interview'una hazırlanan aday, lisans temellerini yıllar önce
görmüş ve büyük ölçüde unutmuş kabul edilir. Seri bu temelleri **mülakat-hazır** biçimde yeniden
kurar: her kavram anlatılabilir (sözlü), çözülebilir (küçük problem), gerekirse ispatlanabilir
(formal tanım/kısa ispat) ve savunulabilir (correctness/complexity/memory/concurrency/sistem
trade-off'ları + takip soruları) düzeye taşınır.

**Interview-readiness tanımı** (SOZLESME §1'deki beş yetenek) her makalenin tasarım filtresidir:
bir konu bu beş yeteneğe katkı vermiyorsa seride yer almaz.

## Resmî dayanak (özet; ayrıntı ve erişim tarihleri ARASTIRMA.md'de)

- Resmî mülakat tanımı: en az iki öğretim üyesi, 10–15 dakika; "past academic record, research
  direction, skillset, and technical knowledge" konuşulur.
- Scientific Preparation üçlüsü **CmpE220 (ayrık yapılar), CmpE250 (veri yapıları/algoritmalar),
  CmpE322 (işletim sistemleri)** çekirdek kapsamın en güçlü resmî sinyalidir; CMPE300 (algoritma
  analizi) bu çekirdeğin müfredattaki doğal devamıdır.
- Bunlar **kesin interview syllabus değildir**; seri kapsamı bir tasarım çıkarımıdır ve informal
  "çıkmış soru" iddiası taşımaz.

## Fazlar ve başlıklar

### Faz A — Mülakatın Dili: Matematiksel Temel ve İspat (1–8) · CMPE220 ekseni

1. **Bilimsel Mülakat: Ne Bekleniyor, Bu Seri Nasıl Çalışıyor?** — *yayında* · resmî süreç (kaynağıyla), beş yetenek hedefi, sözlü çalışma yöntemi; dürüst sınırlar.
2. **Önermeler ve Niceleyiciler: Mantığın Dili** — *yayında* · doğruluk tabloları, koşullunun dört akrabası, çıkarım kuralları, ∀/∃ ve niceleyici sırası; "her/bazı" tuzakları.
3. **İspat Teknikleri: Doğrudan, Çelişkiyle, Karşı Örnekle** — *yayında* · ispatın anatomisi, karşıt ters, durum ayrımı, √2 klasiği; karşı örnek disiplini.
4. **Tümevarım ve Özyineleme: Aynı Fikrin İki Yüzü** — *yayında* · zayıf/güçlü tümevarım, iyi sıralama ilkesi; özyinelemeli tanım ve yapısal tümevarım; hatalı tümevarım örneği; özyinelemeli algoritmanın doğruluk savunması.
5. **Kümeler, Fonksiyonlar ve Bağıntılar** — *yayında* · çift kapsama ile küme eşitliği, birebir/örten ispat kalıpları ve bileşke, dört bağıntı özelliği, denklik bağıntısı ↔ parçalanış, kısmi sıra; sayılabilirlik ve hesaplanamayan fonksiyonlar.
6. **Sayma: Kombinatoriğin Temel Araçları** — *yayında* · çarpma/toplama kuralları, eşleyerek sayma, içerme-dışarma, permütasyon/kombinasyon, Pascal özdeşliği ve kombinatoryal ispat, güvercin yuvası (hash çakışması, sıkıştırma sınırı).
7. **Graflar ve Ağaçlar: Tanımlar ve İlk İspatlar** — *yayında* · basit graf/derece tanımları, el sıkışma lemması ve tek dereceli düğüm sonucu, yürüyüş/yol/döngü/bağlılık, ağaç ve orman, en uzun yol argümanıyla yaprak lemması, kenar sayısının yapısal tümevarımla ispatı, kapsayan ağaç, üç denk ağaç karakterizasyonu.
8. **Cebirsel Yapılar ve Boolean Cebiri** — *yayında* · ikili işlem ve dört aksiyom, yarıgrup/monoid/grup merdiveni, birleşmenin paralel indirgemeyle bağı, kısmi sıradan kafese, Hasse diyagramı, Boolean cebiri tanımı ve mantık ↔ küme ↔ devre karşılığı, devre sadeleştirme.

### Faz B — Veri Yapıları: Maliyetiyle Düşünmek (9–16) · CMPE250 ekseni

9. **Karmaşıklık: Big-O ile Düşünmeye Başlamak** — *yayında* · RAM modeli ve varsayımları, adım sayma, büyüme sınıflarının sayısal karşılaştırması, Big-O sezgisi ve sınırları, en iyi/en kötü/ortalama durum, sık yapılan hatalar (formal ispatlar 17'de).
10. **Diziler, Bağlı Listeler, Yığın ve Kuyruk** — *yayında* · arayüz ile temsil ayrımı, dizinin bitişik belleği ve indis aritmetiği, bağlı listenin işaretçi maliyeti, dinamik dizi büyütmesiyle amortize maliyet (ortalama durumdan ayrılarak), iki yığınla kuyruk problemi, yığın ile kuyruğun arayüz olarak tanımı, dört yapının maliyet tablosu.
11. **Ağaçlar ve İkili Arama Ağaçları** — *yayında* · köklü ikili ağacın dili (derinlik, yükseklik, sıralı dolaşma), BST değişmezinin formal tanımı ve yerel denetimin yetmediği karşı örnek, arama/ekleme/üç durumlu silme, yükseklik alt sınırının tümevarımla ispatı, zincir durumu, sıralı diziden en kısa ağacın kurulması.
12. **Dengeli Arama: AVL'den B-Ağacına** — *yayında* · dönüşün sıralı dolaşmayı koruması, AVL yükseklik dengesi ve en seyrek ağaç argümanıyla logaritmik yükseklik ispatı (Fibonacci sıkılaştırmasıyla), kırmızı-siyah ile 2-3 ağaçlarının aynı fikri kurması, RAM modelinin bilinçli terki: dış bellek modeli, blok ve B-ağacı.
13. **Heap ve Öncelik Kuyruğu** — *yayında* · öncelik kuyruğu arayüzü ve ilkel gerçekleştirimlerin sınırı (sırasız dizi → seçmeli, sıralı dizi → eklemeli sıralama), heap özelliğinin arama ağacı değişmezini bilinçli zayıflatması, kökün en küçük olduğunun derinlik farkı üzerinden tümevarımla ispatı, tam ikili ağacın dizi temsili ve indis aritmetiği, yukarı/aşağı sızdırma, derinlikler toplamı ile yükseklikler toplamı karşılaştırmasından çıkan doğrusal build-heap, yerinde ve kararsız heapsort.
14. **Hashing: Sabit Zamanın Bedeli** — *yayında* · karşılaştırma modeli ve karar ağacıyla logaritmik arama alt sınırı, dallanma çarpanını kırmak için doğrudan erişim dizisi ve alan bedeli, güvercin yuvasıyla çakışmanın kaçınılmazlığı, zincirleme ile doğrusal deneme ve öbeklenme, yük faktörünün iki yöntemde farklı okunuşu ve sayısal maliyet tablosu, düzgün dağılım varsayımı, evrensel hash ailesiyle beklentinin girdiden bağımsızlaştırılması, yeniden boyutlandırmanın amortize maliyeti.
15. **Sıralama Algoritmaları: Karşılaştırmalı ve Ötesi** — *yayında* · yerinde çalışma ile kararlılığın tanımı, iki karesel tabanın öncelik kuyruğu sıralamasıyla bağı, birleştirmeli sıralamanın özyineleme ağacı ve ek bellek bedeli, hızlı sıralamanın ortalama/en kötü ayrımı ve rastgeleleştirme, heapsort'un garanti + yerinde konumu, beş sütunlu karşılaştırma tablosu, karar ağacı argümanıyla n log n alt sınırının sezgisi (formal hâli 24'te), sayma ve radix sıralamalarının modeli terk etmesi.
16. **Graf Temsilleri, BFS ve DFS** — komşuluk listesi/matrisi; dolaşmaların maliyeti; topolojik sıralama, bağlı bileşenler.

### Faz C — Algoritma Analizi ve Tasarımı (17–25) · CMPE300 ekseni

17. **Asimptotik Analiz: Tanımlar ve İspatlı Karşılaştırma** — O/Ω/Θ formal tanımları, limit testleri; 9'un formal yeniden kurulumu.
18. **Yinelemeler ve Master Teoremi** — yerine koyma, özyineleme ağacı, Master Teoremi; mergesort/ikili arama analizleri.
19. **Doğruluk: Döngü Değişmezleriyle İspat** — başlatma/koruma/sonuçlanma; insertion sort ve ikili aramanın doğruluğu.
20. **Böl ve Yönet** — tasarım deseni olarak; max-subarray/karpma örnekleri; ne zaman işe yarar.
21. **Açgözlü Algoritmalar: Ne Zaman ve Neden Çalışır?** — greedy-choice + optimal altyapı; değişim argümanı; etkinlik seçimi, Huffman.
22. **Dinamik Programlama** — örtüşen altproblemler, memoization/tabulation; LCS/knapsack; greedy ile karşılaştırma (klasik takip sorusu).
23. **Graf Algoritmaları: MST ve En Kısa Yollar** — Kruskal/Prim, Dijkstra/Bellman-Ford; doğruluk sezgisi + karmaşıklık savunması.
24. **Alt Sınırlar, Olasılıksal ve Paralel Algoritmalar** — karar ağacı ve Ω(n log n); randomized quicksort beklentisi; paralellik kavramları (CMPE300 kataloğundaki üç ileri başlık).
25. **NP-Tamlık: Hesaplamanın Sınırları** — P/NP, indirgeme sezgisi, NP-tam örnekler; Turing makinesi ve karar verilemezlik kısa köprüsü.

### Faz D — İşletim Sistemleri: Kaynakları Yönetmek (26–35) · CMPE322 ekseni

26. **İşletim Sistemi Nedir? Çekirdek, Sistem Çağrısı, Evrim** — kullanıcı/çekirdek modu, kesmeler, multiprogramming/time-sharing tarihi.
27. **Süreçler ve İş Parçacıkları** — PCB, durum makinesi, bağlam anahtarı; process vs thread trade-off'u.
28. **CPU Zamanlama** — FCFS/SJF/RR/öncelik/çok seviyeli; ölçütler ve karşılaştırma; küçük hesap örnekleri.
29. **Senkronizasyon: Kritik Kesim, Kilit, Semafor** — yarış koşulu, kritik kesim gereksinimleri, mutex/semafor/monitör.
30. **Klasik Eşzamanlılık Problemleri** — üretici-tüketici, okuyucu-yazar, yemek yiyen filozoflar; çözüm savunmaları.
31. **Kilitlenme: Koşullar ve Stratejiler** — dört koşul; önleme/kaçınma (Banker), tespit ve kurtarma.
32. **Bellek Yönetimi: Adres Çevirisi ve Sayfalama** — mantıksal/fiziksel adres, sayfalama/bölütleme, sayfa tablosu, TLB.
33. **Sanal Bellek: Talep Sayfalama ve Değiştirme** — sayfa hatası, LRU/clock, thrashing, çalışma kümesi.
34. **Dosya Sistemleri ve Giriş/Çıkış** — dosya/dizin yapıları, ayırma yöntemleri, tamponlama; B-ağacı geri çağrımı (12).
35. **Koruma, Güvenlik ve Linux Somutlaması** — erişim matrisi, yetenekler; kavramların Linux'taki karşılıkları; faz sentezi.

### Faz E — Destekleyici Temeller ve Mülakat Provası (36–41)

36. **Olasılık ve İstatistik: Mülakat İçin Çekirdek** — koşullu olasılık, beklenen değer, temel dağılımlar; 24'ün beklenti analizinin zemini (CMPE343 sinyali).
37. **Bilgisayar Organizasyonu: OS'nin Altındaki Makine** — bellek hiyerarşisi, önbellek, komut yürütme; OS kavramlarının donanım gerekçesi (CMPE240/244 sinyali).
38. **C ve Bellek: Sistem Programlama Penceresi** — pointer, yığın/heap, süreç bellek düzeni; OS kavramlarının koda inmesi (CMPE230 sinyali).
39. **Veritabanları: İlişkisel Model, İndeks ve İşlem** — savunma düzeyinde: ilişkisel model, anahtarlar, indeks=B-ağacı (12'nin geri çağrımı), ACID.
40. **Sözlü Anlatım Provası: Tahta, Takip Sorusu, Araştırma Yönü** — 60–90 saniyelik anlatım kalıpları; takip zinciri provası; "past academic record + research direction" konuşmasına hazırlık.
41. **Kapanış: Zayıf Nokta Haritası ve Son Hafta Planı** — öz-değerlendirme matrisi (beş yetenek × beş faz), spaced tekrar planı, mülakat günü protokolü.

## Prerequisite grafı (faz düzeyi; makale düzeyi satırlar batch hazırlıklarında yazılır)

- Faz A ← (giriş; önkoşulsuz — CMPE220'nin kendisi de önkoşulsuzdur).
- Faz B ← A4 (özyineleme), A7 (graf tanımları), A6 (sayma — analiz için).
- Faz C ← B9 (Big-O sezgisi; 17 formal kurar), B15/B16 (analiz edilecek algoritmalar), A3/A4 (ispat teknikleri).
- Faz D ← B (yapılar: kuyruk→zamanlama, ağaç→dosya sistemi), A2 (mantık); C'den bağımsız okunabilir, karmaşıklık savunması için C17 önerilir.
- Faz E ← 36: A6; 37–38: D; 39: B12; 40–41: bütün fazların sentezi.

**Batch 0 (yayımlanmış, artık bağlayıcı):**
- 1 ← (yok; giriş noktası — resmî kaynak aktarımı + yöntem)
- 2 ← 1 (yöntem: tanım disiplini burada başlar)
- 3 ← 2 (mantıksal denklikler ispat tekniklerine dönüşür; karşıt ters, niceleyici değillemesi)

**Batch 1 (yayımlanmış, artık bağlayıcı):**
- 4 ← 3 (tümevarım bir ispat tekniğidir; koşullu önerme ispatı), 2 (niceleyiciler, koşullunun anlamı)
- 5 ← 2 (dağılma kuralı küme özdeşliklerinde), 3 (çift kapsama = "ancak ve ancak"; yapıcı ispat)
- 6 ← 5 (birebir örten eşleme ile sayma; güç kümesi), 4 (özyinelemeli/kombinatoryal argüman refleksi)

**Batch 2 (yayımlanmış, artık bağlayıcı):**
- 7 ← 5 (bağıntı dili: yönlü graf = ikili bağıntı; bağlılığın denklik bağıntısı olması), 6 (el sıkışma lemmasının iki-yoldan-sayma ispatı; Kₙ'nin C(n,2) kenarı), 4 (ağacın kenar sayısının yaprak silen tümevarımla ispatı)
- 8 ← 5 (kısmi sıra; kafes bir kısmi sıradır, güç kümesi kafesi), 2 (mantıksal denklikler ve De Morgan; üçlü karşılığın bir ayağı), 7 (Hasse diyagramı bir graftır)
- 9 ← 6 (adım sayma: C(n,2), 2ⁿ, n! büyüklükleri), 4 (özyinelemeli maliyet ve yığın derinliği sezgisi)

**Batch 3 (yayımlanmış, artık bağlayıcı):**
- 10 ← 9 (maliyet dili: adım sayma; amortizenin ortalama durumdan ayrılması), 5 (dizi bir fonksiyondur: indis → değer)
- 11 ← 10 (dizi ile bağlı listenin çözemediği "sırasız arama" hücresi; düğüm ve işaretçi dili), 7 (ağaç = bağlı ve döngüsüz graf, n − 1 kenar, yaprak/kök dili), 4 (sıralı dolaşmanın yapısal tümevarımla ispatı)
- 12 ← 11 (BST değişmezi ve h ile n ilişkisinin garantisiz oluşu), 9 (RAM modelinin varsayımları — burada bilinçli olarak terk edilir), 6 (en seyrek ağacı sayarak alt sınır kurma refleksi)

**Batch 4 (yayımlanmış, artık bağlayıcı):**
- 13 ← 11 (ağaç dili: yükseklik, alt ağaç; BST değişmezinin küreselliği), 10 (arayüz ↔ temsil ayrımı; dizinin indis aritmetiği; dinamik dizide amortize sona ekleme; yığın = stack ayrımı), 4 (yerel heap kuralının küresel sonucunun tümevarımla ispatı), 12 (değişmezi değiştirmenin ne kazandırdığı ve dallanma çarpanı takası)
- 14 ← 6 (güvercin yuvası: çakışma kaçınılmazdır), 11 (ikili ağacın yükseklik alt sınırı — karar ağacı argümanının aynısı), 9 (RAM modelinde indisle erişimin sabit sayılması; en kötü ile ortalama durum ayrımı), 8 (mod aritmetiği bir grup yapısıdır), 10 (zincirleme bir bağlı listedir, açık adresleme bir dizidir; yeniden boyutlandırmanın amortize muhasebesi)
- 15 ← 13 (heapsort için heap ve öncelik kuyruğu sıralaması kalıbı), 14 (karar ağacı argümanı; burada n! yaprakla tekrarlanır), 9 (büyüme sınıfları ve ortalama durumun dağılım varsayımı), 4 (birleştirmenin tümevarımlı doğruluğu ve özyineleme ağacı), 10 (yerinde çalışma ve ek bellek maliyeti)

**Batch 5 taslak satırları (Faz B'nin kapanışı; batch büyüklüğü run'da çözülür):**
- 16 ← 7 (graf ve ağaç tanımları, el sıkışma lemması, bağlılığın denklik bağıntısı olması), 10 (kuyruk ile yığının arayüz olarak tanımı), 5 (kısmi sıra: topolojik sıralamanın zemini), 9 (temsil seçiminin maliyet tablosu)

## Kapsam kararları ve elenenler (gerekçeli)

- **Çekirdek = 220 + 250 + 322 + 300:** Scientific Preparation üçlüsü resmî sinyal; CMPE300,
  250'nin müfredattaki devamı ve "complexity/lower bound" savunmasının kaynağı (35 makale).
- **Destek (6 makale):** olasılık (343; randomized analiz zorunlu kılar), organizasyon (240/244;
  OS savunması donanım gerekçesi ister), C/bellek (230; OS kavramlarının somutlaşması),
  veritabanı (transkript savunması + B-ağacı tahsili), sözlü prova ve sentez (mülakatın
  "anlatabilme" doğası).
- **Elenenler:** biçimsel diller/otomata ayrı makalesi (25 içinde kısa köprü; SP üçlüsünde yok,
  hazırlık getirisi düşük) · sinyal işleme, gömülü sistemler, yazılım mühendisliği süreçleri
  (mülakat çekirdeğine uzak) · programlama dilleri kuramı ayrı makalesi (38–39 içinde değinilir)
  · "çıkmış soru" derlemesi (resmî dayanağı yok; SOZLESME §1 yasaklar).
- **AI serisiyle çakışma yönetimi:** olasılık (36) ve graf/algoritma konuları burada temel CS
  amacıyla, kendi içinde yeterli biçimde işlenir; AI serisinin 91–97 matematik omurgası ML
  bağlamına odaklıdır. İki seri birbirine prerequisite vermez.

## Kategori sözlüğü (platform)

BOUN kataloğu kendi kontrollü kategori sözlüğünü kullanır; ana kütüphanenin ve AI serisinin
sözlüğü değişmez (SOZLESME §5). Klasör adı `category` alanıyla birebir aynıdır.

| Kategori | Etiket | Kapsanan makaleler |
|---|---|---|
| `interview-method` | Mülakat ve Yöntem | 1, 40, 41 |
| `discrete-math` | Ayrık Matematik | 2–8 |
| `data-structures` | Veri Yapıları | 9–16 |
| `algorithms` | Algoritmalar | 17–25 |
| `operating-systems` | İşletim Sistemleri | 26–35 |
| `supporting-fundamentals` | Destekleyici Temeller | 36–39 |

SOZLESME §5'teki öneri listesine `interview-method` eklendi: 1, 40 ve 41 diğer beş kategorinin
hiçbirine düşmüyor ve sahte bir kategori ataması yapmak yerine sözlük genişletildi.

## Terim defteri

Batch 0 ile başlatıldı (kural: SOZLESME §2 — Türkçe kullanım + ilk geçişte İngilizce; mülakat
için İngilizce teknik ad görünür kalır). Bir terim bir kez bu biçimde yerleştikten sonra seri
boyunca aynı kalır.

| Türkçe | İngilizce | İlk geçtiği makale |
|---|---|---|
| bilimsel mülakat | scientific interview | 1 |
| doğruluk | correctness | 1 |
| karmaşıklık | complexity | 1 |
| bellek | memory | 1 |
| eşzamanlılık | concurrency | 1 |
| önerme | proposition | 2 |
| bağlaç | connective | 2 |
| değilleme | negation | 2 |
| ve / veya | conjunction / disjunction | 2 |
| koşullu önerme | conditional (implication) | 2 |
| çift koşullu | biconditional | 2 |
| doğruluk tablosu | truth table | 2 |
| boş doğruluk | vacuous truth | 2 |
| karşıt | converse | 2 |
| ters | inverse | 2 |
| karşıt ters | contrapositive | 2 |
| totoloji | tautology | 2 |
| çelişki | contradiction | 2 |
| mantıksal denklik | logical equivalence | 2 |
| çıkarım kuralı | rule of inference | 2 |
| sonucu doğrulama | affirming the consequent | 2 |
| yüklem | predicate | 2 |
| niceleyici (evrensel / varlıksal) | quantifier (universal / existential) | 2 |
| söylem evreni | domain of discourse | 2 |
| ispat | proof | 3 |
| durum ayrımı | proof by cases | 3 |
| yapıcı / yapıcı olmayan ispat | constructive / nonconstructive proof | 3 |
| varsayım | conjecture | 3 |
| tümevarım | mathematical induction | 4 |
| taban durumu | base case | 4 |
| tümevarım adımı | inductive step | 4 |
| tümevarım hipotezi | induction hypothesis | 4 |
| güçlü tümevarım | strong induction | 4 |
| iyi sıralama ilkesi | well ordering principle | 4 |
| özyineleme | recursion | 4 |
| özyinelemeli tanım | recursive definition | 4 |
| yapısal tümevarım | structural induction | 4 |
| küme | set | 5 |
| güç kümesi | power set | 5 |
| kartezyen çarpım | Cartesian product | 5 |
| fonksiyon | function | 5 |
| tanım kümesi / değer kümesi / görüntü kümesi | domain / codomain / range | 5 |
| birebir | injective | 5 |
| örten | surjective | 5 |
| birebir örten | bijective | 5 |
| bileşke | composition | 5 |
| bağıntı | relation | 5 |
| yansımalı / simetrik / ters simetrik / geçişli | reflexive / symmetric / antisymmetric / transitive | 5 |
| denklik bağıntısı | equivalence relation | 5 |
| parçalanış | partition | 5 |
| kısmi sıra / tam sıra | partial order / total order | 5 |
| sayılabilir / sayılamaz | countable / uncountable | 5 |
| çarpma kuralı / toplama kuralı | product rule / sum rule | 6 |
| bölme kuralı | division rule | 6 |
| içerme-dışarma | inclusion-exclusion | 6 |
| permütasyon | permutation | 6 |
| kombinasyon | combination | 6 |
| binom katsayısı | binomial coefficient | 6 |
| Pascal özdeşliği | Pascal's identity | 6 |
| kombinatoryal ispat | combinatorial proof | 6 |
| güvercin yuvası ilkesi | pigeonhole principle | 6 |
| graf | graph | 7 |
| basit graf | simple graph | 7 |
| düğüm | vertex (eş anlamlısı node) | 7 |
| kenar | edge | 7 |
| komşu | adjacent | 7 |
| derece | degree | 7 |
| ilmek | self-loop | 7 |
| çoklu graf | multigraph | 7 |
| yönlü graf | directed graph (digraph) | 7 |
| tam graf | complete graph | 7 |
| döngü grafı | cycle graph | 7 |
| el sıkışma lemması | handshaking lemma | 7 |
| yürüyüş | walk | 7 |
| yol | path | 7 |
| döngü | cycle | 7 |
| bağlı | connected | 7 |
| bağlı bileşen | connected component | 7 |
| orman | forest | 7 |
| ağaç | tree | 7 |
| yaprak | leaf | 7 |
| kapsayan ağaç | spanning tree | 7 |
| minimum kapsayan ağaç | minimum spanning tree | 7 |
| ekstremal argüman | extremal argument | 7 |
| ikili işlem | binary operation | 8 |
| kapalılık | closure | 8 |
| birleşme | associativity | 8 |
| birim eleman | identity element | 8 |
| ters eleman | inverse element | 8 |
| değişme | commutativity | 8 |
| yarıgrup | semigroup | 8 |
| monoid | monoid | 8 |
| grup | group | 8 |
| Hasse diyagramı | Hasse diagram | 8 |
| en küçük üst sınır | least upper bound (join) | 8 |
| en büyük alt sınır | greatest lower bound (meet) | 8 |
| kafes | lattice | 8 |
| dağılmalı | distributive | 8 |
| tümleyenli | complemented | 8 |
| Boolean cebiri | Boolean algebra | 8 |
| girdi boyutu | input size | 9 |
| RAM modeli | Random Access Machine model | 9 |
| doğrusal | linear | 9 |
| logaritmik | logarithmic | 9 |
| karesel | quadratic | 9 |
| üstel | exponential | 9 |
| Big-O gösterimi | big-O notation | 9 |
| üst sınır | upper bound | 9 |
| en iyi durum | best case | 9 |
| en kötü durum | worst case | 1 (9'da tanımlandı) |
| ortalama durum | average case | 9 |
| yer karmaşıklığı | space complexity | 9 |
| arayüz | interface | 10 |
| temsil | representation | 10 |
| dizi | array | 10 |
| bitişik bellek | contiguous memory | 10 |
| bağlı liste | linked list | 10 |
| işaretçi | pointer | 10 |
| baş | head | 10 |
| çift yönlü bağlı liste | doubly linked list | 10 |
| dinamik dizi | dynamic array | 10 |
| amortize maliyet | amortized cost | 10 |
| yığın | stack | 10 |
| kuyruk | queue | 10 |
| dairesel tampon | circular buffer | 10 |
| ikili ağaç | binary tree | 11 |
| kök | root | 11 |
| ebeveyn / çocuk | parent / child | 11 |
| derinlik | depth | 11 |
| yükseklik | height | 11 |
| sıralı dolaşma | in-order traversal | 11 |
| ikili arama ağacı | binary search tree | 11 |
| değişmez | invariant | 11 |
| sıralı ardıl | in-order successor | 11 |
| dengeli arama ağacı | balanced search tree | 12 |
| dönüş | rotation | 12 |
| AVL ağacı | AVL tree | 12 |
| yükseklik dengesi | height balance | 12 |
| kırmızı-siyah ağaç | red-black tree | 12 |
| 2-3 ağacı | 2-3 tree | 12 |
| B-ağacı | B-tree | 12 |
| blok | block | 12 |
| dış bellek modeli | external memory model | 12 |
| öncelik kuyruğu | priority queue | 13 |
| heap | heap | 13 |
| min-heap / max-heap | min-heap / max-heap | 13 |
| heap özelliği | heap property | 13 |
| tam ikili ağaç | complete binary tree | 13 |
| örtük ağaç | implicit tree | 13 |
| yukarı sızdırma | sift-up (swim) | 13 |
| aşağı sızdırma | sift-down (sink) | 13 |
| yığın kurma | build-heap | 13 |
| heapsort | heapsort | 13 |
| karşılaştırma modeli | comparison model | 14 |
| karar ağacı | decision tree | 14 |
| doğrudan erişim dizisi | direct access array | 14 |
| hash fonksiyonu | hash function | 14 |
| hash tablosu | hash table | 14 |
| çakışma | collision | 14 |
| zincirleme | chaining | 14 |
| açık adresleme | open addressing | 14 |
| doğrusal deneme | linear probing | 14 |
| öbeklenme | clustering | 14 |
| yük faktörü | load factor | 14 |
| evrensel hash ailesi | universal hash family | 14 |
| beklenen zaman | expected time | 14 |
| yerinde | in-place | 15 |
| kararlı sıralama | stable sort | 15 |
| seçmeli sıralama | selection sort | 15 |
| eklemeli sıralama | insertion sort | 15 |
| birleştirmeli sıralama | merge sort | 15 |
| hızlı sıralama | quicksort | 15 |
| ayırma | partition | 15 |
| eksen | pivot | 15 |
| alt sınır | lower bound | 15 |
| sayma sıralaması | counting sort | 15 |
| radix sıralaması | radix sort | 15 |
| dış sıralama | external sort | 15 |

## Kavram-tekrar defteri

Yayımlanmış makalelerin ileride bilinçli olarak geri çağrılacağı noktalar:

- **Boş doğruluk (2)** → 19'da döngü değişmezlerinin başlatma adımında yeniden kullanılır.
- **Niceleyici sırası (2)** → 17'de asimptotik tanımların "her ε için bir N vardır" kalıbında
  formal olarak yeniden kurulur.
- **Karşı örnek disiplini (3)** → 21'de açgözlü algoritmaların ne zaman çalışmadığını göstermede.
- **Yapıcı olmayan ispat (3)** → 21 ve 25'te varlık argümanlarının algoritma vermemesi tartışmasında.
- **Hash tablosu takip zinciri (1)** → **14'te üç halkasıyla birlikte ödendi** (ortalama vs en kötü
  durum → düşman girdi → sıralı işlemler için neden dengeli ağaç gerekir).
- **Güçlü tümevarım ve parçalama adımı (4)** → 18'de böl-yönet yinelemelerinde ve 19'da döngü
  değişmezlerinde; mergesort doğruluğu 4'te örnek olarak adıyla anıldı.
- **Yapısal tümevarım (4)** → 7'de ağaç karakterizasyonlarında, 11–13'te ağaç/heap değişmezlerinde.
- **Hanoi yinelemesi T(n) = 2T(n−1) + 1 (4)** → 18'de Master Teoremi öncesi ısınma örneği.
- **Kısmi sıra ve topolojik sıralama (5)** → 16'da algoritmasıyla açılır; 5'teki bağımlılık grafı
  örneği oraya köprüdür.
- **Sayılabilirlik ve hesaplanamayan fonksiyonlar (5)** → 25'te durma problemi ve karar
  verilemezlik tartışmasının sayma zemini.
- **Birebir olmayan hash fonksiyonu (5, 6)** → **14'te ödendi**: çakışma çözümü ve yük faktörü
  tartışmasının gerekçesi; 6'da güvercin yuvasıyla ispatlanmıştı.
- **C(n, 2), 2ⁿ ve n! büyüklükleri (6)** → 9 ve 17'de karmaşıklık sınıflarının somut zemini;
  **15'te n! yaprak sayısıyla alt sınır sezgisi kuruldu**, 24'te aynı argüman formalleşir.
- **Doğum günü ilkesi (6)** → 36'da olasılık aracıyla; 6'da yalnızca etiketli ileri gönderme olarak
  geçti (kesinlik ile olasılık ayrımı).
- **El sıkışma lemması (7)** → 16'da komşuluk listesinin toplam uzunluğunun 2·|E| olmasının
  gerekçesi; 12–13'te ağaç/heap derece muhasebesinde.
- **Ağacın n − 1 kenarı (7)** → 11–13'te ağaç boyutu ve yükseklik tartışmalarında; 23'te MST'nin
  neden tam n − 1 kenar taşıdığının gerekçesi.
- **Kapsayan ağaç (7)** → 23'te Kruskal ve Prim'in ürettiği nesne; 7'de yalnızca varlığı ispatlandı.
- **Bağlılığın denklik bağıntısı olması (7)** → 16'da bağlı bileşenlerin BFS/DFS ile bulunması;
  parçalanış teoremi (5) burada ikinci kez kullanıldı.
- **Ekstremal argüman (7)** → 21'de açgözlü algoritmaların değişim argümanında, 24'te alt sınır
  ispatlarında; sayma ve tümevarımın yanına konan üçüncü ispat refleksi.
- **Birleşme → paralel indirgeme (8)** → 24'te paralel algoritmalar; monoid, bölünebilir
  indirgemenin teknik adıdır.
- **Mod aritmetiğinin grup yapısı (8)** → 14'te hash fonksiyonunun mod tabanlı kurulumunda.
- **Boolean sadeleştirme (8)** → 37'de devre düzeyinde, 39'da sorgu yüklemi sadeleştirmesinde.
- **Hasse diyagramı ve kısmi sıra (8)** → 16'da topolojik sıralamanın çizimi; DAG bir kısmi sıradır.
- **RAM modeli ve varsayımları (9)** → 12'de model **bilinçli olarak terk edildi** (dış bellek
  modeli ve blok sayımı); 34'te dosya sistemlerinde aynı model tekrar kullanılır ve 37'de bellek
  hiyerarşisi modelin dışarıda bıraktığı şeyi geri getirir.
- **Büyüme sınıfları tablosu (9)** → **15'te sıralama algoritmalarının beş sütunlu
  karşılaştırmasında ödendi**; 17'de aynı sınıflar formal tanımlarla yeniden kurulur.
- **En kötü / ortalama durum ayrımı (9)** → **14'te hash tablosunun en kötü durum savunmasında ve
  15'te hızlı sıralamanın ortalama/en kötü ayrımında ödendi**; 24'te randomized quicksort
  beklentisinde ve 36'da dağılım varsayımının adlandırılmasında formalleşir.
- **Amortize maliyet pini (9)** → **10'da dinamik dizi büyütmesiyle açıldı** ve ortalama durumdan
  açıkça ayrıldı (iki yığınla kuyruk problemi ikinci örnektir); **13'te heap'e sona ekleme ve 14'te
  hash tablosunun yeniden boyutlandırılması** ikinci ve üçüncü örnektir. **Uyarı (13'te kuruldu):**
  doğrusal build-heap amortize bir sonuç DEĞİLDİR — aynı işin daha sıkı sayılmasıdır; bu ayrım
  16 ve sonrasında korunmalıdır.
- **Arayüz ↔ temsil ayrımı (10)** → **13'te öncelik kuyruğu arayüzü heap temsilinden ayrıldı**;
  16'da komşuluk listesi ile matrisin aynı graf arayüzünü farklı fiyata tutmasında tekrar kullanılır.
- **Dizinin indis aritmetiği (10)** → **13'te tam ikili ağacın dizi temsilinde ödendi** (sol 2i + 1,
  sağ 2i + 2, ebeveyn ⌊(i − 1)/2⌋); **14'te açık adreslemede** ikinci kez kullanıldı.
- **Yığın ve kuyruk (10)** → 16'da BFS kuyrukla, DFS yığınla yazılır; 27–28'de çağrı yığını ve
  zamanlayıcı kuyruğu aynı yapıların işletim sistemi karşılıklarıdır.
- **BST değişmezi ve sıralı dolaşma (11)** → 12'de dengeleme bu değişmezin üstüne kurulur; 19'da
  "değişmezi koruyan yerel işlem" kalıbı döngü değişmezleriyle formalleşir; 39'da veritabanı
  indeksinin neden sıralı bir yapı olduğu tartışmasında.
- **Yükseklik ile maliyet ilişkisi (11)** → **13'te heap yüksekliği ⌊log₂ n⌋ ve build-heap
  analizinde ödendi**; 18'de özyineleme ağacının derinliğinde tekrar kullanılır.
- **En seyrek ağacı sayarak alt sınır kurma (12)** → **14'te karar ağacı argümanının arama hâli,
  15'te n! yapraklı sıralama hâli sezgisel olarak kuruldu**; 24'te ikisi de formalleşir.
- **Dış bellek modeli ve blok sayımı (12)** → 34'te dosya sistemleri ve ayırma yöntemlerinde;
  37'de bellek hiyerarşisinde; 39'da indeks = B-ağacı geri çağrımında.
- **Özyineleme derinliği = bellek maliyeti (9)** → 11, **15 (hızlı sıralamanın yığın maliyeti)** ve
  20'de özyinelemeli çözümlerin yer karmaşıklığı savunmasında.
- **Öncelik kuyruğu (13)** → 16'da BFS'in ağırlıksız hâliyle karşılaştırılmasında, **23'te Dijkstra
  ve Prim'in çekirdek yapısı** olarak, 28'de öncelikli CPU zamanlamasında, 34'te kesikli olay
  benzetiminde. 13, `azalt_anahtar` işlemini bilinçli olarak dışarıda bıraktı; graf algoritmaları
  makalesinde açılması gerekir.
- **Dallanma çarpanı takası (12, 13, 14)** → 12'de B-ağacı, 13'te d-yollu heap, 14'te doğrudan
  erişim dizisi; üçü aynı fikrin farklı yüzüdür ve 24'te alt sınır ispatının "sabit dallanma"
  varsayımı olarak geri döner.
- **Karar ağacı argümanı (14, 15)** → 14'te arama için (≥ n + 1 yaprak), 15'te sıralama için
  (≥ n! yaprak) sezgisel olarak kuruldu; **24'te formal alt sınır kuramı olarak ödenmelidir.**
  Her iki makale de "bu bir model sonucudur" uyarısını taşıyor.
- **Rastgeleleştirmeyle beklentiyi girdiden bağımsızlaştırma (14, 15)** → 14'te evrensel hash
  ailesi, 15'te hızlı sıralamanın rastgele karıştırması; **24'te randomized quicksort beklentisi
  ve 36'da olasılık aracı** ile formalleşir.
- **Kararlılık (15)** → 15'te radix sıralaması için zorunlu koşul olarak kullanıldı; 39'da
  veritabanı sıralamalarında ve çok anahtarlı sorgu sonuçlarında geri çağrılabilir.
- **Sayma sıralamasının zincirleri = hash zincirleri (14, 15)** → aynı yapı iki farklı amaçla
  kullanıldı; 17–18'de model seçiminin maliyet üzerindeki etkisi tartışılırken örnek olarak durur.
