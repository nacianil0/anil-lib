# "Mülakat Aynası: Boğaziçi CmpE" — Yol Haritası

> Serinin yaşayan omurgası (şu an 41 başlık, 5 faz), prerequisite grafı ve tasarım gerekçeleri.
> Kurallar: `docs/seri-boun/SOZLESME.md`. Durum: `docs/seri-boun/HANDOFF.md`. Kanıt defteri:
> `docs/seri-boun/ARASTIRMA.md`. Yayımlanmamış başlıklar **taslaktır**; batch hazırlığında
> pedagojik gerekçeyle güncellenebilir (yayımlananlar asla).

Son güncelleme: 2026-08-30 · Yayında: 21 (1–3 Batch 0, 4–6 Batch 1, 7–9 Batch 2, 10–12 Batch 3, 13–15 Batch 4, 16–18 Batch 5, 19–21 Batch 6) · Sıradaki: 22

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
16. **Graf Temsilleri, BFS ve DFS** — *yayında* · graf arayüzünün "u'nun komşularını ver" işlemine indirgenmesi, komşuluk listesi ile matrisin beş satırlık maliyet tablosu ve yoğunluğa göre karar (10⁶ düğüm / 10⁷ kenar hesabı), el sıkışma lemmasından çıkan Θ(|V| + |E|) yer ve graf algoritmalarında "doğrusal zaman"ın tanımı, BFS'in katman kümeleriyle tanımı ve katman üzerinde tümevarımla doğruluğu, en kısa yollar ağacının ebeveyn işaretçileriyle O(|V|) yerde tutulması, DFS'in özyinelemeli tanımı ve ürettiği ağacın en kısa yol vermemesi (aynı grafta iki farklı ağaç), tam dolaşmayla bağlı bileşenlerin denklik bağıntısı teoremine bağlanması, DAG ve topolojik sıralama tanımı, ters bitiş sırasının iki durumlu ispatı ve döngü tespiti.

### Faz C — Algoritma Analizi ve Tasarımı (17–25) · CMPE300 ekseni

17. **Asimptotik Analiz: Tanımlar ve İspatlı Karşılaştırma** — *yayında* · Big-O'nun (c, n₀) tanımı ve niceleyici sırasının tanımı totolojiye çevirmesi, tanımdan yürüyen bir olumlu (3n² + 100n + 10 = O(n²), c = 14 / n₀ = 10) ve bir olumsuz (n² ≠ O(n)) ispat, Ω ile Θ'nın tanımları ve eşiğin solunda hiçbir iddia bulunmaması, limit testleri ile küçük o / küçük omega ve limitin var olmayabileceği uyarısı, karar ağacı yükseklik lemmasının ispatı ve log₂(n!) = Θ(n log n) sonucu, 1000n–n² ile log₂ n–n^0,1 kesişimleri, beş klasik hata ("en az O(n²)", üstel yanılgı, O(1) toplama, eşitlik yanılgısı, O ile en kötü durumun karıştırılması).
18. **Yinelemeler ve Master Teoremi** — *yayında* · tahmin-et-ve-tümevarımla-doğrula (Hanoi 2ⁿ − 1) ve üst sınır tuzağı ile hipotez güçlendirme, açarak çözme (birleştirmeli sıralamanın n log₂ n − n + 1 kapalı ifadesi), özyineleme ağacında seviye toplamı / derinlik / yaprak sayısı ve a/bᵈ oranından çıkan üç rejim, Master Teoreminin üç durumu ve düzenlilik koşulu, beş yinelemelik uygulama tablosu, teoremin uygulanamadığı üç durum (toplamsal küçülme, eşit olmayan alt problemler, polinomsal boşluk → Akra-Bazzi), taban koşullarının ve yuvarlamaların önemsizliği, alt problem boyutunun ek işten daha belirleyici olması.
19. **Doğruluk: Döngü Değişmezleriyle İspat** — *yayında* · doğruluğun kısmi doğruluk ile sonlanmaya bölünmesi (Floyd), durum makinesi ve korunan değişmez tanımları, Değişmez İlkesinin tümevarımın yeniden ifadesi olması, çapraz robot örneğiyle imkânsızlık sonucu, döngü değişmezinin üç adımı ve boş doğruluğun başlatmayı bedava kılması, üçlünün yalnızca kısmi doğruluk verdiği uyarısı (sonuçlanma ≠ sonlanma), eklemeli sıralamanın satır satır ispatı ve permütasyon şartı olmadan değişmezin yetersiz kalması, iç döngünün kendi değişmezi, ikili aramanın değişmezi ve sıralılığın yalnızca koruma adımında kullanılması, azalan ölçüyle sonlanma ispatı ve zayıf azalmanın yetmemesi, değişmez korunduğu hâlde sonsuza dönen ikili arama hatası, hızlı üs almanın kolay okunmayan y·xᶻ = aᵇ değişmezi.
20. **Böl ve Yönet: Kazanç Nereden Gelir?** — *yayında* · desenin üç adımı ve T(n) = aT(n/b) + [bölme ve birleştirme işi], naif bölmenin hiçbir şey kazandırmaması (dört yarım çarpım Θ(n²) verir), iki kaldıraç: alt problem sayısını düşürmek (Karatsuba üç çarpım, Θ(n^log₂3); Strassen sekizden yediye, Θ(n^2,81)) ve birleştirmeyi ucuzlatmak (konveks kabukta teğet arayışının Θ(n²) ile Θ(n) hâlleri), takasın "pahalı işlemi ucuz işlemle değiştirmek" olarak adlandırılması, böl-yönet doğruluğunun güçlü tümevarımla savunulması ve ispat yükünün birleştirme döngüsünün değişmezine düşmesi, eşit olmayan alt problemlerle doğrusal medyan bulma ve grup boyutunun neden beş olduğu (üçerli grupta payların toplamı tam 1 eder), tabana devretme eşiği (n ≤ 15; Strassen için n ≥ 32), desenin çöktüğü yer: örtüşen alt problemler (naif Fibonacci, F(30) ağacında F(15) 987 kez).
21. **Açgözlü Algoritmalar: Ne Zaman ve Neden Çalışır?** — *yayında* · açgözlünün miyop tanımı ve üç adımlı iskeleti, aralık çizelgelemede dört seçim kuralı ve üçünün karşı örnekle çökmesi (en az çakışan için on bir aralıklı karşı örnek), en erken biten kuralının değişim argümanıyla tümevarımlı ispatı ve aynı ispatın döngü değişmezi diliyle okunması, açgözlü seçim özelliği ile optimal altyapının ayrı iddialar olması, kuralın çöktüğü üç yer (ağırlıklı çizelgeleme, para üstü {1, 3, 4}, 0/1 sırt çantası), önek-serbest kodlar ve Huffman'ın açgözlü kuralı (çalışılmış örnek: 300 bit → 240 bit, %20 kazanç), her optimal önek-serbest kodun Huffman kodu olmaması, üç ispat kalıbı (değişim argümanı, açgözlü önde kalır, kes-yapıştır) ve dördüncü araç olarak karşı örnek.
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

**Batch 5 (yayımlanmış, artık bağlayıcı):**
- 16 ← 7 (graf ve ağaç tanımları, el sıkışma lemması, bağlılığın denklik bağıntısı olması), 10 (kuyruk ile yığının arayüz olarak tanımı ve arayüz ↔ temsil ayrımı), 5 (kısmi sıra ve denklik bağıntısının parçalanış teoremi), 9 (temsil seçiminin maliyet tablosu; "n nedir?" disiplini), 4 (katman üzerinde tümevarım)
- 17 ← 9 (Big-O sezgisi ve açıkça bırakılan formal tanım borcu), 2 (niceleyici sırası: "bir c vardır ki her n için" kalıbı ve değilleme), 3 (çelişkiyle ispat: n² ≠ O(n)), 6 (n! ve büyüme sınıflarının somut sayıları), 14–15 (karar ağacı argümanlarının yükseklik adımı burada ispatlanır), 11 (ikili ağacın yaprak–yükseklik ilişkisi)
- 18 ← 17 (O/Ω/Θ tanımları teoremin üç durumunu ayıran ölçüt olarak), 4 (tümevarım, güçlü tümevarım ve Hanoi bağıntısı), 15 (birleştirmeli sıralamanın T(n) = 2T(n/2) + Θ(n) bağıntısı ve özyineleme ağacı), 9 (özyineleme derinliği ve büyüme sınıfları), 11 (ikili aramanın T(n) = T(n/2) + Θ(1) bağıntısı)

**Batch 6 (yayımlanmış, artık bağlayıcı):**
- 19 ← 4 (tümevarımın döngü hâli; iyi sıralama ilkesi sonlanma ispatını verir), 2 (boş doğruluk: hem başlatma hem de ikili aramanın sonuçlanma adımı), 3 (birkaç örnekte çalışmak ispat değildir), 15 (eklemeli sıralamanın doğruluğu), 11 (ikili aramanın değişmezi), 17 (niceleyicili tanım kalıbı: değişmez "her i için, i'inci yinelemenin başında …" biçiminde yazılır), 18 (hipotezi güçlendirme refleksi: permütasyon şartı)
- 20 ← 18 (böl-yönet yinelemelerinin çözümü ve özyineleme ağacı), 15 (birleştirmeli sıralamanın kanonik örnek olması), 19 (birleştirme adımının döngü değişmeziyle doğrulanması), 4 (özyinelemeli tasarımın güçlü tümevarımla savunulması), 17 (kesişim noktası → tabana devretme eşiği), 9 (özyineleme derinliği = bellek maliyeti)
- 21 ← 3 (karşı örnek disiplini: açgözlünün ne zaman çalışmadığı), 7 (ekstremal argüman → değişim argümanı), 19 ("seçilen küme bir optimal çözümün alt kümesidir" değişmezi ve koruma adımı), 13 (Huffman için öncelik kuyruğu), 20 (tasarım deseni karşılaştırması: parçala ile seç), 6 (önek-serbest kodun bit muhasebesi)

**Batch 7 taslak satırları (Faz C'nin kapanışı; batch büyüklüğü run'da çözülür):**
- 22 ← 21 (açgözlünün çöktüğü üç yerin ortak nedeni), 20 (özyineleme ağacındaki tekrar eden düğüm = örtüşen alt problem; naif Fibonacci), 18 (yineleme çözme ve maliyet muhasebesi), 16 (DAG üzerinde işlem sırası), 19 (tablolamanın döngü değişmezi)
- 23 ← 16 (graf temsilleri, BFS ve doğrusal zaman Θ(|V| + |E|)), 13 (öncelik kuyruğu ve ödenmemiş `azalt_anahtar` borcu), 21 (Kruskal ile Prim açgözlüdür; kesit teoremi bir değişim argümanıdır), 7 (kapsayan ağaç ve n − 1 kenar), 18 (Master Teoremiyle maliyet savunması)
- 24 ← 17 (karar ağacı yükseklik lemması ve log₂(n!) = Θ(n log n)), 14–15 (karar ağacı argümanının arama ve sıralama hâlleri), 15 (rastgeleleştirilmiş hızlı sıralama), 20 (medyan bulmadaki eşit olmayan alt problemler), 8 (birleşme → paralel indirgeme)

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
| komşuluk listesi | adjacency list | 16 |
| komşuluk matrisi | adjacency matrix | 16 |
| seyrek graf / yoğun graf | sparse graph / dense graph | 16 |
| genişlik öncelikli arama | breadth-first search (BFS) | 16 |
| derinlik öncelikli arama | depth-first search (DFS) | 16 |
| uzaklık | distance | 16 |
| katman | level set | 16 |
| en kısa yollar ağacı | shortest paths tree | 16 |
| erişilebilirlik | reachability | 16 |
| yönlü döngüsüz graf | directed acyclic graph (DAG) | 16 |
| topolojik sıralama | topological order (sort) | 16 |
| bitiş sırası | finishing order | 16 |
| döngü tespiti | cycle detection | 16 |
| güçlü bağlı bileşen | strongly connected component | 16 |
| asimptotik gösterim | asymptotic notation | 17 |
| eşik | threshold | 17 |
| sıkı sınır | tight bound | 17 |
| küçük o | little-o | 17 |
| küçük omega | little-omega | 17 |
| limit testi | limit test | 17 |
| büyüme mertebesi | order of growth | 17 |
| yineleme bağıntısı | recurrence (relation) | 18 |
| kapalı biçim | closed form | 18 |
| tahmin et ve doğrula | substitution method | 18 |
| özyineleme ağacı | recursion tree | 18 |
| Master Teoremi | Master Theorem | 18 |
| düzenlilik koşulu | regularity condition | 18 |
| böl ve yönet | divide and conquer | 15 (18'de İngilizcesiyle) |
| alt problem | subproblem | 18 |
| birleştirme adımı | merge step | 18 |
| Akra-Bazzi formülü | Akra-Bazzi formula | 18 |
| kısmi doğruluk | partial correctness | 19 |
| sonlanma | termination | 19 |
| durum makinesi | state machine | 19 |
| korunan değişmez | preserved invariant | 19 |
| Değişmez İlkesi | Invariant Principle | 19 |
| döngü değişmezi | loop invariant | 19 |
| başlatma / koruma / sonuçlanma | initialization / maintenance / conclusion | 19 |
| türetilmiş değişken | derived variable | 19 |
| azalan ölçü | decreasing measure | 19 |
| bir eksik/fazla hatası | off-by-one error | 19 |
| hızlı üs alma | fast exponentiation | 19 |
| dallanma çarpanı | branching factor | 20 |
| konveks kabuk | convex hull | 20 |
| üst teğet / alt teğet | upper tangent / lower tangent | 20 |
| seçim problemi | selection problem | 20 |
| sıra istatistiği | order statistic | 20 |
| medyanların medyanı | median of medians | 20 |
| tabana devretme eşiği | base case cutoff | 20 |
| örtüşen alt problemler | overlapping subproblems | 20 |
| açgözlü algoritma | greedy algorithm | 21 |
| bağdaşan | compatible | 21 |
| aralık çizelgeleme | interval scheduling | 21 |
| açgözlü seçim özelliği | greedy-choice property | 21 |
| optimal altyapı | optimal substructure | 21 |
| değişim argümanı | exchange argument | 21 |
| açgözlü önde kalır | greedy stays ahead | 21 |
| kes ve yapıştır | cut and paste | 21 |
| önek-serbest kod | prefix-free code | 21 |
| Huffman kodu | Huffman code | 21 |
| kesirli sırt çantası | fractional knapsack | 21 |

## Kavram-tekrar defteri

Yayımlanmış makalelerin ileride bilinçli olarak geri çağrılacağı noktalar:

- **Boş doğruluk (2)** → **19'da iki kez ödendi**: döngü değişmezinin başlatma adımını çoğu zaman
  bedava kılması ve ikili aramanın **sonuçlanma** adımında boşalan aralığın "değer dizide yok"
  sonucunu vermesi.
- **Niceleyici sırası (2)** → **17'de ödendi**: Big-O tanımının "öyle bir c ve öyle bir n₀ vardır
  ki her n ≥ n₀ için" kalıbı ve sıra ters çevrilirse tanımın totolojiye dönüşmesi. **19'da döngü
  değişmezinin formal yazımında tekrar kullanıldı** ("her i için, i'inci yinelemenin başında …");
  25'te P/NP tanımlarında yeniden kullanılır.
- **Karşı örnek disiplini (3)** → **21'de ödendi**: dört seçim kuralından üçünün küçük girdilerle
  kırılması ve "bir açgözlü kural önerince önce onu kırmayı dene" refleksinin kurulması; ayrıca
  19'un giriş paragrafı ("birkaç girdide çalışmak ispat değildir") aynı pini kullanır.
- **Yapıcı olmayan ispat (3)** → 21'de **kullanılmadı** (açgözlü ispatların hepsi yapıcıdır);
  25'te varlık argümanlarının algoritma vermemesi tartışmasında açılacak.
- **Hash tablosu takip zinciri (1)** → **14'te üç halkasıyla birlikte ödendi** (ortalama vs en kötü
  durum → düşman girdi → sıralı işlemler için neden dengeli ağaç gerekir).
- **Güçlü tümevarım ve parçalama adımı (4)** → **18'de ödendi**: yineleme çözümlerinin tümevarımla
  doğrulanması ve üst sınır tuzağı (hipotezi güçlendirmeden tümevarımın tıkanması). **19'da
  eklemeli sıralamanın değişmezine permütasyon şartının eklenmesi ve 20'de medyan bulmanın
  T(n) ≤ c·n tahmini** aynı refleksin iki uygulamasıdır; 20 ayrıca böl-yönet doğruluğunu güçlü
  tümevarımla savunur. Mergesort doğruluğu 4'te örnek olarak adıyla anılmıştı, **20'de birleştirme
  döngüsünün değişmezi olarak ödendi**.
- **Yapısal tümevarım (4)** → 7'de ağaç karakterizasyonlarında, 11–13'te ağaç/heap değişmezlerinde.
- **Hanoi yinelemesi T(n) = 2T(n−1) + 1 (4)** → **18'de ödendi**: tahmin-et-ve-doğrula örneği
  (Tₙ = 2ⁿ − 1, T₆₄ ≈ 1,8 × 10¹⁹), üst sınır tuzağı ve "toplamsal küçülme üstel çözüm verir"
  kuralının kanonik örneği.
- **Kısmi sıra ve topolojik sıralama (5)** → **16'da ödendi**: DAG tanımı, topolojik sıralamanın
  ancak ve ancak DAG'da var olması, ters bitiş sırası algoritması ve sıralamanın tek olmaması
  (kısmi sıranın tam sıraya genişletilmesi). 22'de DAG üzerinde dinamik programlamanın işlem
  sırası, 28'de bağımlılıklı çizelgeleme olarak geri döner.
- **Sayılabilirlik ve hesaplanamayan fonksiyonlar (5)** → 25'te durma problemi ve karar
  verilemezlik tartışmasının sayma zemini.
- **Birebir olmayan hash fonksiyonu (5, 6)** → **14'te ödendi**: çakışma çözümü ve yük faktörü
  tartışmasının gerekçesi; 6'da güvercin yuvasıyla ispatlanmıştı.
- **C(n, 2), 2ⁿ ve n! büyüklükleri (6)** → 9'da karmaşıklık sınıflarının somut zemini;
  **15'te n! yaprak sayısıyla alt sınır sezgisi kuruldu**; **17'de log₂(n!) = Θ(n log n) ispatlandı**
  (C(|V|, 2) ayrıca 16'da kenar sayısının üst sınırı olarak kullanıldı); 24'te aynı argüman genel
  alt sınır kuramı olarak formalleşir.
- **Doğum günü ilkesi (6)** → 36'da olasılık aracıyla; 6'da yalnızca etiketli ileri gönderme olarak
  geçti (kesinlik ile olasılık ayrımı).
- **El sıkışma lemması (7)** → **16'da ödendi**: komşuluk listelerinin toplam uzunluğunun 2·|E|
  olması, buradan Θ(|V| + |E|) yer ve BFS/DFS maliyet analizinin toplam adım sayısı; 12–13'te
  ağaç/heap derece muhasebesinde de kullanılmıştı.
- **Ağacın n − 1 kenarı (7)** → 11–13'te ağaç boyutu ve yükseklik tartışmalarında; 23'te MST'nin
  neden tam n − 1 kenar taşıdığının gerekçesi.
- **Kapsayan ağaç (7)** → 23'te Kruskal ve Prim'in ürettiği nesne; 7'de yalnızca varlığı ispatlandı.
- **Bağlılığın denklik bağıntısı olması (7)** → **16'da ödendi**: tam dolaşmanın her çalıştırması
  bir bağlı bileşen verir ve doğruluk savunması, 5'in parçalanış teoreminin doğrudan uygulanmasıdır
  — yeni teorem ispatlanmadı, eski teorem tanındı.
- **Ekstremal argüman (7)** → **21'de ödendi**: "en erken biten" ve "en seyrek iki simge" gibi uç
  bir eleman seçilip ispatın onun üzerine kurulması, yani **değişim argümanı**; 24'te alt sınır
  ispatlarında sürer. Sayma ve tümevarımın yanına konan üçüncü ispat refleksidir.
- **Birleşme → paralel indirgeme (8)** → 24'te paralel algoritmalar; monoid, bölünebilir
  indirgemenin teknik adıdır.
- **Mod aritmetiğinin grup yapısı (8)** → 14'te hash fonksiyonunun mod tabanlı kurulumunda.
- **Boolean sadeleştirme (8)** → 37'de devre düzeyinde, 39'da sorgu yüklemi sadeleştirmesinde.
- **Hasse diyagramı ve kısmi sıra (8)** → **16'da ödendi**: topolojik sıralama bölümü, 5'in kısmi
  sırasını ve 8'in Hasse diyagramını DAG diliyle yeniden kurar.
- **RAM modeli ve varsayımları (9)** → 12'de model **bilinçli olarak terk edildi** (dış bellek
  modeli ve blok sayımı); 34'te dosya sistemlerinde aynı model tekrar kullanılır ve 37'de bellek
  hiyerarşisi modelin dışarıda bıraktığı şeyi geri getirir.
- **Büyüme sınıfları tablosu (9)** → **15'te sıralama algoritmalarının beş sütunlu
  karşılaştırmasında, 17'de ise büyüme merdiveni ve üç limit lemmasıyla ödendi** (nᵃ = o(nᵇ),
  log n = o(nᵋ), nᵇ = o(aⁿ)).
- **En kötü / ortalama durum ayrımı (9)** → **14'te hash tablosunun en kötü durum savunmasında ve
  15'te hızlı sıralamanın ortalama/en kötü ayrımında ödendi**; 24'te randomized quicksort
  beklentisinde ve 36'da dağılım varsayımının adlandırılmasında formalleşir.
- **Amortize maliyet pini (9)** → **10'da dinamik dizi büyütmesiyle açıldı** ve ortalama durumdan
  açıkça ayrıldı (iki yığınla kuyruk problemi ikinci örnektir); **13'te heap'e sona ekleme ve 14'te
  hash tablosunun yeniden boyutlandırılması** ikinci ve üçüncü örnektir. **Uyarı (13'te kuruldu):**
  doğrusal build-heap amortize bir sonuç DEĞİLDİR — aynı işin daha sıkı sayılmasıdır; bu ayrım
  16 ve sonrasında korunmalıdır.
- **Arayüz ↔ temsil ayrımı (10)** → **13'te öncelik kuyruğu arayüzü heap temsilinden ayrıldı**;
  **16'da ödendi**: graf arayüzü "u'nun komşularını ver" işlemine indirgendi ve komşuluk listesi ile
  matris aynı sözü farklı fiyata tutan iki temsil olarak karşılaştırıldı.
- **Dizinin indis aritmetiği (10)** → **13'te tam ikili ağacın dizi temsilinde ödendi** (sol 2i + 1,
  sağ 2i + 2, ebeveyn ⌊(i − 1)/2⌋); **14'te açık adreslemede** ikinci kez kullanıldı.
- **Yığın ve kuyruk (10)** → **16'da ödendi**: BFS kuyrukla katman katman, DFS yığınla (ya da
  özyinelemeyle) derine yürür ve iki arayüz iki algoritmaya dönüşür; 27–28'de çağrı yığını ve
  zamanlayıcı kuyruğu aynı yapıların işletim sistemi karşılıklarıdır.
- **BST değişmezi ve sıralı dolaşma (11)** → 12'de dengeleme bu değişmezin üstüne kurulur;
  **19'da "değişmezi koruyan yerel işlem" kalıbı korunan değişmez tanımıyla formalleşti**
  (P(q) ve q → r ise P(r)); 39'da veritabanı indeksinin neden sıralı bir yapı olduğu tartışmasında.
- **Yükseklik ile maliyet ilişkisi (11)** → **13'te heap yüksekliği ⌊log₂ n⌋ ve build-heap
  analizinde, 18'de özyineleme ağacının derinliği ile yaprak sayısı ayrımında ödendi**
  (derinlik log_b n, yaprak sayısı n^(log_b a) — ikisini karıştırmak sık yapılan hatadır).
- **En seyrek ağacı sayarak alt sınır kurma (12)** → **14'te karar ağacı argümanının arama hâli,
  15'te n! yapraklı sıralama hâli sezgisel olarak kuruldu; 17'de "yüksekliği h olan bir ikili ağacın
  en fazla 2ʰ yaprağı vardır" lemması yapısal tümevarımla ispatlandı**; 24'te genel kuram
  formalleşir.
- **Dış bellek modeli ve blok sayımı (12)** → 34'te dosya sistemleri ve ayırma yöntemlerinde;
  37'de bellek hiyerarşisinde; 39'da indeks = B-ağacı geri çağrımında.
- **Özyineleme derinliği = bellek maliyeti (9)** → 11, **15 (hızlı sıralamanın yığın maliyeti)** ve
  **20'de tabana devretme gerekçesinin ikinci ayağı** olarak kullanıldı; 27'de çağrı yığını olarak
  işletim sistemi karşılığını bulur.
- **Öncelik kuyruğu (13)** → **16'da köprü kuruldu**: BFS'in en kısa yol vermesi kenarların
  ağırlıksız olmasına bağlıdır, ağırlıklı hâl öncelik kuyruğu ister. **21'de Huffman'ın "en seyrek
  iki simgeyi çek" adımının doğal veri yapısı olarak kullanıldı.** **23'te Dijkstra ve Prim'in
  çekirdek yapısı** olarak, 28'de öncelikli CPU zamanlamasında, 34'te kesikli olay benzetiminde
  açılır. 13, `azalt_anahtar` işlemini bilinçli olarak dışarıda bıraktı; graf algoritmaları
  makalesinde açılması gerekir.
- **Dallanma çarpanı takası (12, 13, 14)** → 12'de B-ağacı, 13'te d-yollu heap, 14'te doğrudan
  erişim dizisi; üçü aynı fikrin farklı yüzüdür ve 24'te alt sınır ispatının "sabit dallanma"
  varsayımı olarak geri döner.
- **Karar ağacı argümanı (14, 15)** → 14'te arama için (≥ n + 1 yaprak), 15'te sıralama için
  (≥ n! yaprak) sezgisel olarak kuruldu; **17'de argümanın asimptotik adımı ödendi** (yükseklik
  lemması ve log₂(n!) = Θ(n log n)); **kuramın kendisi 24'te formalleşmelidir.** Üç makale de
  "bu bir model sonucudur" uyarısını taşıyor.
- **Rastgeleleştirmeyle beklentiyi girdiden bağımsızlaştırma (14, 15)** → 14'te evrensel hash
  ailesi, 15'te hızlı sıralamanın rastgele karıştırması; **24'te randomized quicksort beklentisi
  ve 36'da olasılık aracı** ile formalleşir.
- **Kararlılık (15)** → 15'te radix sıralaması için zorunlu koşul olarak kullanıldı; 39'da
  veritabanı sıralamalarında ve çok anahtarlı sorgu sonuçlarında geri çağrılabilir.
- **Sayma sıralamasının zincirleri = hash zincirleri (14, 15)** → aynı yapı iki farklı amaçla
  kullanıldı; 17–21'de kullanılmadı, **24'te** model seçiminin maliyet üzerindeki etkisi
  tartışılırken örnek olarak durur.

Batch 5 ile açılan yeni pinler:

- **Graf için doğrusal zaman Θ(|V| + |E|) (16)** → 23'te MST ve en kısa yol algoritmalarının maliyet
  dili; 25'te indirgemelerin maliyet muhasebesinde.
- **BFS'in ağırlıksız grafta en kısa yol vermesi (16)** → 23'te Dijkstra bunun ağırlıklı
  genellemesi olarak sunulur; kuyruğun yerini öncelik kuyruğu alır.
- **DFS'in bitiş sırası ve ters bitiş sırası (16)** → 22'de DAG üzerinde dinamik programlamanın
  işlem sırası; 25'te güçlü bağlı bileşenler ve indirgeme grafları.
- **Niceleyicili tanım kalıbı (17)** → **19'da ödendi**: döngü değişmezi "her i için, i'inci
  yinelemenin başında …" biçiminde yazıldı ve "dizinin başı sıralı" gibi gevşek ifadelerin
  değişmez sayılmadığı gösterildi; 25'te P ve NP tanımlarında aynı kalıp kullanılır.
- **Eşik ve kesişim noktası: asimptotik ile pratik ayrımı (17)** → **20'de ödendi**: n²/4 ile
  n log₂ n karşılaştırmasından çıkan n ≤ 15 eşiği ve Strassen'in n ≥ 32 eşiği; 37'de bellek
  hiyerarşisinin sabitleri büyütmesi.
- **log₂(n!) = Θ(n log n) (17)** → 24'te karşılaştırmalı sıralama alt sınırının çekirdek adımı;
  orada karar ağacı kuramıyla birleşir.
- **Özyineleme ağacı (18)** → **20'de iki işlevle ödendi**: dallanma çarpanı karşılaştırmasının
  (4 vs 3 alt problem) aracı ve desenin çöktüğü yerin teşhis aracı; 22'de aynı ağacın tekrar eden
  düğümleri örtüşen alt problem kavramını doğurur.
- **Master Teoremi ve üç durumu (18)** → **20'de dört kez doğrudan kullanıldı** (4T(n/2) + Θ(n),
  3T(n/2) + Θ(n), 8T(n/2) + Θ(n²), 7T(n/2) + Θ(n²)); 23'te graf algoritmalarının maliyet
  savunmasında sürer; 24'te teoremin uygulanmadığı eşit olmayan alt problemli bağıntılar geri döner.
- **Tahmin et ve doğrula, hipotezi güçlendirme (18)** → **19'da (permütasyon şartı) ve 20'de
  (medyan bulmanın T(n) ≤ c·n tahmini) ödendi**; 21 ve 22'de optimal altyapı iddialarının
  ispatında sürer.

Batch 6 ile açılan yeni pinler:

- **Kısmi doğruluk ile sonlanma ayrımı (19)** → 20'de böl-yönet doğruluk savunmasının iki ayağı;
  22'de tablolama döngüsünün doğruluğu; **29–31'de eşzamanlılık değişmezleri ve kilitlenmenin
  ilerleme argümanı**; 25'te durma problemi bu ayrımın uç hâlidir.
- **Değişmez İlkesi ve durum makinesi modeli (19)** → 26–27'de süreç durum makinesi olarak
  modellenir; 29'da kritik kesim koşulları korunan değişmezlerdir; 31'de Banker algoritmasının
  güvenli durum değişmezi aynı kalıptır.
- **Azalan ölçüyle sonlanma, zayıf azalmanın yetmemesi (19)** → 31'de açlık ve canlılık
  tartışmasında; 22'de tablolama sırasının bir topolojik sıra olması gerektiği argümanında.
- **Değişmezi keşfetmek ispatın zor kısmıdır (19)** → 22'de alt problem tanımını bulmak aynı
  zorluktur; hızlı üs almanın y·xᶻ = aᵇ değişmezi kanonik örnektir.
- **İki kaldıraç: alt problem sayısı a ve birleştirme maliyeti g(n) (20)** → 23'te Dijkstra'nın
  öncelik kuyruğuyla hızlanması aynı muhasebedir (aynı algoritma, ucuzlatılmış adım); 24'te
  paralel algoritmalarda iş ile derinlik ayrımına dönüşür.
- **Örtüşen alt problemler (20)** → **22'nin açılış gerekçesi**: naif Fibonacci ağacında F(15)'in
  987 kez hesaplanması ve 2·F(n+1) − 1 çağrı sayısı.
- **Eşit olmayan alt problemler ve tahmin-doğrula (20)** → 24'te rastgeleleştirilmiş seçim
  algoritmasının beklenti analizi bu bağıntının olasılıksal karşılığıdır.
- **Açgözlü seçim özelliği ile optimal altyapının ayrı iddialar olması (21)** → 22'de dinamik
  programlamanın yalnızca ikincisini istemesi bu ayrımın tam kullanıldığı yerdir; 23'te MST kesit
  teoremi birincisinin graf hâlidir.
- **Değişim argümanı (21)** → 23'te Kruskal ve Prim'in doğruluğu, 24'te alt sınır ispatlarında.
- **Ağırlıklı aralık çizelgeleme (21)** → **22'nin açılış problemi**: açgözlünün çöktüğü yerde
  alt problem tanımı Rₓ = {j | s(j) ≥ x} ile kurulur.
- **Önek-serbest kod ve bit muhasebesi (21)** → 6'daki güvercin yuvasıyla kurulan "her dosyayı
  sıkıştırmak imkânsızdır" sınırıyla birleşir; 34'te dosya sistemlerinde ve 39'da veritabanı
  sıkıştırmasında geri çağrılabilir.
