# "Mülakat Aynası: Boğaziçi CmpE" — Yol Haritası

> Serinin yaşayan omurgası (şu an 41 başlık, 5 faz), prerequisite grafı ve tasarım gerekçeleri.
> Kurallar: `docs/seri-boun/SOZLESME.md`. Durum: `docs/seri-boun/HANDOFF.md`. Kanıt defteri:
> `docs/seri-boun/ARASTIRMA.md`. Yayımlanmamış başlıklar **taslaktır**; batch hazırlığında
> pedagojik gerekçeyle güncellenebilir (yayımlananlar asla).

Son güncelleme: 2026-09-01 · Yayında: 24 (1–3 Batch 0, 4–6 Batch 1, 7–9 Batch 2, 10–12 Batch 3, 13–15 Batch 4, 16–18 Batch 5, 19–21 Batch 6, 22–24 Batch 7) · Sıradaki: 25

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
22. **Dinamik Programlama: Alt Problemi Bulmak** — *yayında* · 20 ve 21'in bıraktığı iki çöküşün aynı çözüme bakması, alt problem bağımlılık grafının şekli (böl-yönet ağaç, DP DAG) ve Bellman'ın ad koyuşu, naif Fibonacci'nin 2·F(n+1) − 1 çağrısıyla örtüşme teşhisi ve Θ(n) bit uzunluğundan gelen O(n + n²/w) dürüstlük notu, bellekleme ile tablolamanın üç noktada ayrışması (erişilebilirlik, yığın derinliği, sabitler) ve tablolama döngüsünün topolojik sıraya dayanan değişmezi, altı adımlı alt problem reçetesi ve "bir soru sor, cevaplarını yerel olarak kaba kuvvetle dene" ilkesi, ağırlıklı aralık çizelgelemenin dört açgözlü kuralı da yenen sayısal DP çözümü (optimal 22, en iyi açgözlü 17), LCS ve 0/1 sırt çantası, DP'nin yalnızca optimal altyapı istemesi, sözde polinom tuzağı.
23. **Graf Algoritmaları: MST ve En Kısa Yollar** — *yayında* · aynı graf üzerinde MST ile en kısa yollar ağacının farklı çıkması (toplam 11'e karşı kenar toplamı 15), kesit ve kesen kenar tanımları, kesit teoreminin değişim argümanıyla ispatı ve MST'nin optimal altyapısı, Prim ile Kruskal'ın aynı teoremin iki yüzü olması, 13'ten kalan `azalt_anahtar` borcunun çapraz bağlı indeksli öncelik kuyruğuyla ödenmesi, Θ(|V|)·extract-min + Θ(|E|)·decrease-key formülü ve üç temsilin maliyet tablosu, gevşetmenin güvenliği ve üçgen eşitsizliği, Dijkstra'nın doğruluk ispatında negatif olmama varsayımının tam yeri ve üç düğümlük karşı örnekle çöküşü, Bellman-Ford'un k-kenarlı uzaklık alt problemiyle bir DP olarak okunması ve negatif çevrim tanığı, dört algoritmanın kısıt–maliyet tablosu.
24. **Alt Sınırlar, Olasılıksal ve Paralel Algoritmalar** — *yayında* · karar ağacı kuramının formal hâli ve iki adımlı alt sınır makinesi (çıktıyı say, logaritmasını al), lg(n!) = Θ(n log n) ile sıralamanın Ω(n log n) sınırı ve n = 10 için en az 22 karşılaştırma, sınırın modele ait olduğu uyarısı, Monte Carlo ile Las Vegas ayrımı, Freivalds'ın Θ(n²) çarpım denetleyicisi ve 1/2 hata sınırı, paranoyak hızlı sıralamanın beklenti analizi (iyi eksen olasılığı > 1/2, E ≤ 2 deneme, log_{4/3} n yükseklik) ve beklenen zamanın ortalama durumdan ayrılması, iş ile açıklık tanımları, iş ve açıklık yasaları, paralellik = T₁/T∞, açgözlü çizelgeleyici teoremi ve optimalin en fazla iki katı olması, Amdahl yasasından neden daha keskin olduğu.
25. **NP-Tamlık: Hesaplamanın Sınırları** — *yayında* · sınırın modelden probleme taşınması ve üç kademeli cevap (hiç algoritma yok / hızlısı bilinmiyor / eşik çok ince), karar problemi tanımı ve optimizasyonun karar sürümüne çevrilmesi, sayılabilirlik argümanıyla "problemlerin neredeyse hepsi çözülemez" sonucu ve durma probleminin Q(Q) çelişkisiyle iki satırlık ispatı, R ⊋ EXP ⊋ P katmanları, P ile NP'nin doğrulayıcı ve sertifika diliyle niceleyicili tanımı ve EVET/HAYIR asimetrisi, P ⊆ NP ⊆ EXP gerekçeleri ve n = 100 için 2¹⁰⁰ ≈ 1,27 × 10³⁰ ile n³ = 10⁶ karşılaştırması, indirgemenin tanımı ile iki okuması ve O(n^{kj}) maliyet bileşimi, NP-zor ile NP-tam ayrımı ve NP-zorun NP dışına taşması, Cook 1971 ve 3SAT'ın devre argümanıyla sezgisi, NP-tamlık ispatının iki adımı ve yanlış yön hatası, iki çalışılmış indirgeme (bağımsız küme ≤p düğüm örtüsü tümleyen eşitliğiyle; 3SAT ≤p bağımsız küme 12 düğüm / 24 kenar ile iki yönden doğrulanmış), sözde polinomun zayıf ve güçlü NP-tamlıkla ilişkisi, 2-SAT ile 3-SAT ve 2-boyama ile 3-boyama eşiği, Kosaraju-Sharir ile güçlü bağlı bileşenler (bitiş sırası, ters graf, yoğunlaştırma DAG'ı, Θ(|V| + |E|)) ve 2-SAT'ın imalar grafıyla polinom zamanda çözülmesi.

### Faz D — İşletim Sistemleri: Kaynakları Yönetmek (26–35) · CMPE322 ekseni

26. **İşletim Sistemi Nedir? Çekirdek, Sistem Çağrısı, Evrim** — *yayında* · Faz D'nin açılışı ve sorunun "ne kadar hızlı"dan "bu makine kime ait"e dönmesi, sanallaştırma tanımı ve sanallaştırma/eşzamanlılık/kalıcılık üçlüsü, kaynak yöneticisi rolü, ilke ile düzenek ayrımının arayüz–temsil ayrımıyla aynı fikir olması, kütüphane tasarımının açığı ve güçlü yalıtım gerekçesi, kullanıcı kipi ile çekirdek kipinin donanım desteği ve çekirdeğin bir ayrıcalık düzeyi olarak tanımı, sistem çağrısının on adımlık yaşam döngüsü (tuzak, tuzak tablosu, sistem çağrısı numarası, argüman denetimi, tuzaktan dönüş) ve neden fonksiyon çağrısı olmadığı, işbirliğine dayalı yaklaşımın sonsuz döngüde çökmesi ve zamanlayıcı kesmesinin garantisi (10 ms'de bir kesme ≈ %0,01 ek yük), toplu iş → koruma/Atlas → çoklu programlama → zaman paylaşımı evrimi ve Corbató'nun "zaman paylaşımı çoklu programlamanın belirli bir biçimidir" saptaması, monolitik çekirdek ile mikroçekirdek takası.
27. **Süreçler ve İş Parçacıkları** — *yayında* · sürecin makine durumu envanteri (adres uzayı, yazmaçlar, program sayacı ve yığın işaretçisi, açık dosyalar) ve programdan sürece geçiş adımları, çalışan/hazır/engellenmiş durum makinesi ile korunan değişmezi ve iki süreç izinin çoklu programlamayı sayısallaştırması, başlangıç ve zombi uç durumları, süreç listesi ile süreç denetim bloğunun alanları, bağlam anahtarındaki iki ayrı kaydetme (donanımın örtük kullanıcı yazmaçları, çekirdeğin açık kaydı) ve ölçülmüş maliyet (1996'da 6 µs = 1.200 çevrim, bugün mikrosaniye altı ama 1.500 çevrim), iş parçacığının aynı adres uzayını paylaşıp ayrı yığın tutması ve sayfa tablosunun değişmemesi, iki kullanım gerekçesi (paralellik ve giriş/çıkış örtüşmesi) ile süreç tercihinin ne zaman daha sağlam olduğu, paylaşılan sayaç örneğiyle yarış koşulu (beklenen 20.000.000, gözlenen 19.345.221 ve 19.221.041), kritik kesim, karşılıklı dışlama ve atomiklik tanımları — çözümler bilinçli olarak 29–30'a bırakıldı.
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

**Batch 7 (yayımlanmış, artık bağlayıcı):**
- 22 ← 21 (açgözlünün çöktüğü üç yerin ortak nedeni; açgözlü seçim özelliği ile optimal altyapının ayrılması), 20 (özyineleme ağacındaki tekrar eden düğüm = örtüşen alt problem; naif Fibonacci), 16 (DAG ve topolojik sıra: tablolama sırasının doğruluk şartı), 19 (tablolama döngüsünün başlatma/koruma/sonuçlanma üçlüsü; değişmezi keşfetmenin zorluğu), 9 (RAM modelinin "aritmetik sabittir" varsayımının Fibonacci'de kırılması; girdi boyutu sayı mı basamak mı)
- 23 ← 16 (graf temsilleri, BFS'in ağırlıksız en kısa yolu, el sıkışma lemmasından Θ(|V| + |E|)), 13 (öncelik kuyruğu arayüzü ve ödenmemiş `azalt_anahtar` borcu; burada ödendi), 21 (kesit teoremi bir değişim argümanıdır; Prim ile Kruskal açgözlüdür), 7 (kapsayan ağaç, ağacın n − 1 kenarı, tek basit yol), 22 (Bellman-Ford ile DAG gevşetmesi birer dinamik programdır), 14 (doğrudan erişim dizisi: kimlik → indis eşlemesi `azalt_anahtar`ı O(log n) yapar)
- 24 ← 17 (karar ağacı yükseklik lemması ve log₂(n!) = Θ(n log n)), 14–15 (karar ağacı argümanının arama ve sıralama hâlleri; modeli terk eden sayma/radix sıralamaları), 15 (hızlı sıralamanın ortalama/en kötü ayrımı ve rastgele karıştırma), 9 (en iyi/en kötü/ortalama durum ayrımına dördüncü kavram olarak beklenen zamanın eklenmesi), 8 (birleşme → paralel indirgeme; monoid bölünebilir indirgemenin adıdır), 18 (özyineleme ağacında seviye toplamı: paranoyak hızlı sıralamanın log_{4/3} n yüksekliği)

**Batch 8 (yayımlanmış, artık bağlayıcı):**
- 25 ← 24 (alt sınırın modele ait olması; şimdi sınır problemin kendisine taşınır), 22 (sözde polinom: altküme toplamının O(nT) çözümü girdi boyutunda polinom değildir), 5 (sayılabilirlik ve hesaplanamayan fonksiyonlar → durma problemi), 2 (P ve NP tanımlarının niceleyici kalıbı), 23 (indirgemelerin maliyet muhasebesi Θ(|V| + |E|) dilinde), 16 (güçlü bağlı bileşenler ve indirgeme grafları — 16'nın bilinçli olarak dışarıda bıraktığı konu)
- 26 ← (Faz D'nin giriş noktası; C'den bağımsız okunabilir), 19 (durum makinesi modeli: süreç bir durum makinesidir), 2 (kullanıcı/çekirdek modu ayrımının mantıksal ifadesi)
- 27 ← 26 (çekirdek, sistem çağrısı, kesme; tuzağın kaydettiği yazmaçlar), 10 (çağrı yığını ve kuyruk arayüzleri; yığın burada adres uzayında gerçek bir bölge olur), 19 (süreç durum makinesi ve korunan değişmez), 9 (bağlam anahtarının maliyeti ve özyineleme derinliğinin bellek maliyeti), 24 (iş ile açıklık ayrımı iş parçacığı gerekçesinde)

**Batch 9 taslak satırları (Faz D'nin gövdesi; batch büyüklüğü run'da çözülür):**
- 28 ← 27 (süreç durum makinesi, hazır kümesi, bağlam anahtarının maliyeti), 13 (öncelik kuyruğu: öncelikli ve çok seviyeli zamanlamanın veri yapısı), 21 (açgözlü seçim kuralı ve karşı örnekle kırma refleksi), 24 (açgözlü çizelgeleyici teoremi ve "optimalin en fazla iki katı" kalıbı), 9 (ortalama durum ile en kötü durum ayrımı; ölçüt seçimi)
- 29 ← 27 (yarış koşulu, kritik kesim, karşılıklı dışlama, atomiklik — problem orada kuruldu), 19 (korunan değişmez dili: bir kilidin ne söz verdiği değişmezle yazılır), 26 (kesmelerin kapatılması ayrıcalıklı bir işlemdir), 2 (kritik kesim koşullarının niceleyicili ifadesi)
- 30 ← 29 (kilit, semafor ve monitör), 10 (tampon bir kuyruktur; üretici-tüketici), 19 (değişmez ve sonlanma ayrımı: canlılık ile güvenlik)

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
| dinamik programlama | dynamic programming | 22 |
| bellekleme | memoization | 22 |
| tablolama | tabulation | 22 |
| ebeveyn işaretçisi | parent pointer | 22 |
| en uzun ortak alt dizi | longest common subsequence (LCS) | 22 |
| altküme toplamı | subset sum | 22 |
| sözde polinom | pseudopolynomial | 22 |
| ağırlıklı graf | weighted graph | 23 |
| kesit | cut | 23 |
| kesen kenar | crossing edge | 23 |
| kesit teoremi | cut property | 23 |
| tek kaynaklı en kısa yollar | single-source shortest paths (SSSP) | 23 |
| gevşetme | relaxation | 23 |
| üçgen eşitsizliği | triangle inequality | 23 |
| negatif ağırlıklı çevrim | negative-weight cycle | 23 |
| azalt_anahtar | decrease-key | 23 |
| indeksli öncelik kuyruğu | indexed (changeable) priority queue | 23 |
| ayrık küme | union-find (disjoint set) | 23 |
| Prim algoritması | Prim's algorithm | 23 |
| Kruskal algoritması | Kruskal's algorithm | 23 |
| Dijkstra algoritması | Dijkstra's algorithm | 23 |
| Bellman-Ford algoritması | Bellman-Ford algorithm | 23 |
| Fibonacci heap | Fibonacci heap | 23 |
| tanık | witness | 23 |
| rastgeleleştirilmiş algoritma | randomized algorithm | 24 |
| Monte Carlo | Monte Carlo | 24 |
| Las Vegas | Las Vegas | 24 |
| iş | work | 24 |
| açıklık (derinlik) | span (depth) | 24 |
| paralellik | parallelism | 24 |
| iş yasası | work law | 24 |
| açıklık yasası | span law | 24 |
| açgözlü çizelgeleyici | greedy scheduler | 24 |
| hızlanma | speedup | 24 |
| doğrusal hızlanma | linear speedup | 24 |
| Amdahl yasası | Amdahl's law | 24 |
| paralel gevşeklik | parallel slackness | 24 |
| karar problemi | decision problem | 25 |
| karar verilebilir | decidable | 25 |
| karar verilemez | undecidable | 25 |
| durma problemi | halting problem | 25 |
| sayılabilir / sayılamaz | countable / uncountable | 25 |
| köşegen argümanı | diagonalization argument | 25 |
| Turing makinesi | Turing machine | 25 |
| Church-Turing tezi | Church-Turing thesis | 25 |
| sertifika | certificate | 25 |
| doğrulayıcı | verifier | 25 |
| indirgeme | reduction | 25 |
| NP-zor | NP-hard | 25 |
| NP-tam | NP-complete | 25 |
| sağlanabilirlik | satisfiability (SAT) | 25 |
| sözde polinom | pseudo-polynomial | 25 |
| zayıf / güçlü NP-tam | weakly / strongly NP-complete | 25 |
| bağımsız küme | independent set | 25 |
| düğüm örtüsü | vertex cover | 25 |
| güçlü bağlı bileşen | strongly connected component | 25 |
| yoğunlaştırma | condensation (kernel DAG) | 25 |
| imalar grafı | implication graph | 25 |
| sanallaştırma | virtualization | 26 |
| kalıcılık | persistence | 26 |
| kaynak yöneticisi | resource manager | 26 |
| ilke ve düzenek | policy and mechanism | 26 |
| güçlü yalıtım | strong isolation | 26 |
| kullanıcı kipi | user mode | 26 |
| çekirdek kipi | kernel mode (supervisor mode) | 26 |
| çekirdek | kernel | 26 |
| ayrıcalıklı komut | privileged instruction | 26 |
| tuzak | trap | 26 |
| tuzak tablosu | trap table | 26 |
| tuzaktan dönüş | return-from-trap | 26 |
| sistem çağrısı numarası | system call number | 26 |
| zamanlayıcı kesmesi | timer interrupt | 26 |
| toplu iş | batch processing | 26 |
| çoklu programlama | multiprogramming | 26 |
| zaman paylaşımı | time-sharing | 26 |
| monolitik çekirdek | monolithic kernel | 26 |
| mikroçekirdek | microkernel | 26 |
| süreç | process | 27 |
| makine durumu | machine state | 27 |
| adres uzayı | address space | 27 |
| program sayacı | program counter | 27 |
| yığın işaretçisi | stack pointer | 27 |
| çalışan / hazır / engellenmiş | running / ready / blocked | 27 |
| çizelgelenmek / çizelgeden çıkarılmak | scheduled / descheduled | 27 |
| zombi | zombie | 27 |
| süreç listesi | process list (task list) | 27 |
| süreç denetim bloğu | Process Control Block (PCB) | 27 |
| bağlam anahtarı | context switch | 27 |
| iş parçacığı | thread | 27 |
| iş parçacığı denetim bloğu | Thread Control Block (TCB) | 27 |
| iş parçacığına özel depolama | thread-local storage | 27 |
| yarış koşulu | race condition | 27 |
| veri yarışı | data race | 27 |
| belirsiz | indeterminate | 27 |
| kritik kesim | critical section | 27 |
| karşılıklı dışlama | mutual exclusion | 27 |
| atomik | atomic | 27 |

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
  **25'te ödendi**: sayma argümanı çözülemez problemlerin varlığını gösterir ama tek bir tanesini
  bile eline vermez, durma problemi ise elle tutulur örnektir. İki argümanın farkı sözlü
  checkpoint'in omurgasıdır.
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
  (kısmi sıranın tam sıraya genişletilmesi). **22'de ikinci kez ödendi**: alt problem bağımlılık
  grafı bir DAG'dır ve tablolama döngüsünün sırasının topolojik olması bir **doğruluk şartıdır**;
  sıra yanlışsa bağıntı henüz doldurulmamış hücreyi okur. 28'de bağımlılıklı çizelgeleme olarak
  geri döner.
- **Sayılabilirlik ve hesaplanamayan fonksiyonlar (5)** → **25'te ödendi**: program sonlu bir
  dizgedir ve sonlu dizgeler sayılabilir, karar problemi sonsuz bir bit dizgesidir ve sayılamaz;
  buradan "problemlerin neredeyse hepsi çözülemez" sonucu çıkar ve durma problemi somut örnek
  olarak Q(Q) çelişkisiyle verilir.
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
- **Ağacın n − 1 kenarı (7)** → 11–13'te ağaç boyutu ve yükseklik tartışmalarında; **23'te ödendi**:
  MST'nin tam n − 1 kenar taşıması ve Kruskal'ın durma koşulu.
- **Kapsayan ağaç (7)** → **23'te ödendi**: Kruskal ile Prim'in ürettiği nesne minimum kapsayan
  ağaçtır; 7'de yalnızca varlığı ispatlanmıştı, 23'te en hafifi arandı. Ayrıca ağaçtaki **tek basit
  yol** özelliği kesit teoreminin ispatının çekirdek adımı oldu.
- **Bağlılığın denklik bağıntısı olması (7)** → **16'da ödendi**: tam dolaşmanın her çalıştırması
  bir bağlı bileşen verir ve doğruluk savunması, 5'in parçalanış teoreminin doğrudan uygulanmasıdır
  — yeni teorem ispatlanmadı, eski teorem tanındı.
- **Ekstremal argüman (7)** → **21'de ödendi**: "en erken biten" ve "en seyrek iki simge" gibi uç
  bir eleman seçilip ispatın onun üzerine kurulması, yani **değişim argümanı**; 24'te alt sınır
  ispatlarında sürer. Sayma ve tümevarımın yanına konan üçüncü ispat refleksidir.
- **Birleşme → paralel indirgeme (8)** → **24'te ödendi**: n sayının ikili indirgeme ağacında iş
  n − 1, açıklık ⌈lg n⌉ ve paralellik n = 10⁶ için 50.000'dir; monoid olmak, ağacı istediğin gibi
  parantezleyebilmek demektir.
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
  15'te hızlı sıralamanın ortalama/en kötü ayrımında ödendi**; **24'te dördüncü kavram eklendi**:
  beklenen zaman, ortalama durumdan farklı olarak girdi dağılımına değil algoritmanın kendi
  rastgeleliğine dayanır ve her girdi için geçerlidir. 36'da dağılım varsayımının adlandırılmasında
  formalleşir.
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
  özyinelemeyle) derine yürür ve iki arayüz iki algoritmaya dönüşür; **27'de yığın tarafı ödendi**:
  çağrı yığını soyut bir arayüz değil, adres uzayında gerçek bir bölge ve bir yazmaçtır, ve çok iş
  parçacıklı bir süreçte her iş parçacığının kendi yığını olur. Zamanlayıcı kuyruğu 28'e kaldı.
- **BST değişmezi ve sıralı dolaşma (11)** → 12'de dengeleme bu değişmezin üstüne kurulur;
  **19'da "değişmezi koruyan yerel işlem" kalıbı korunan değişmez tanımıyla formalleşti**
  (P(q) ve q → r ise P(r)); 39'da veritabanı indeksinin neden sıralı bir yapı olduğu tartışmasında.
- **Yükseklik ile maliyet ilişkisi (11)** → **13'te heap yüksekliği ⌊log₂ n⌋ ve build-heap
  analizinde, 18'de özyineleme ağacının derinliği ile yaprak sayısı ayrımında ödendi**
  (derinlik log_b n, yaprak sayısı n^(log_b a) — ikisini karıştırmak sık yapılan hatadır).
- **En seyrek ağacı sayarak alt sınır kurma (12)** → **14'te karar ağacı argümanının arama hâli,
  15'te n! yapraklı sıralama hâli sezgisel olarak kuruldu; 17'de "yüksekliği h olan bir ikili ağacın
  en fazla 2ʰ yaprağı vardır" lemması yapısal tümevarımla ispatlandı**; **24'te kuram formalleşti**:
  iki adımlı alt sınır makinesi (yaprak sayısı ≥ çıktı sayısı, h ≥ lg L) ve modele bağımlılık uyarısı.
- **Dış bellek modeli ve blok sayımı (12)** → 34'te dosya sistemleri ve ayırma yöntemlerinde;
  37'de bellek hiyerarşisinde; 39'da indeks = B-ağacı geri çağrımında.
- **Özyineleme derinliği = bellek maliyeti (9)** → 11, **15 (hızlı sıralamanın yığın maliyeti)** ve
  **20'de tabana devretme gerekçesinin ikinci ayağı** olarak kullanıldı; **27'de ödendi**: yığın
  adres uzayında gerçek bir bölgedir ve çok iş parçacıklı bir süreçte bu maliyet **iş parçacığı
  başına** ödenir — ağır özyineleme kullanan programlar bu yüzden istisnadır.
- **Öncelik kuyruğu (13)** → **16'da köprü kuruldu**: BFS'in en kısa yol vermesi kenarların
  ağırlıksız olmasına bağlıdır, ağırlıklı hâl öncelik kuyruğu ister. **21'de Huffman'ın "en seyrek
  iki simgeyi çek" adımının doğal veri yapısı olarak kullanıldı.** **23'te tamamen ödendi**: hem
  Prim'in hem Dijkstra'nın çekirdek yapısıdır ve maliyet muhasebesi ikisinde de aynı formüldür
  (Θ(|V|)·en_küçüğü_çıkar + Θ(|E|)·azalt_anahtar). 28'de öncelikli CPU zamanlamasında, 34'te kesikli
  olay benzetiminde açılır.
- **`azalt_anahtar` borcu (13)** → **23'te ödendi**: heap öğenin yerini bilmediği için öncelik
  kuyruğu bir sözlükle çapraz bağlanır (indeksli öncelik kuyruğu); düğüm kimlikleri 0..|V| − 1 tam
  sayı olduğu için sözlük bir doğrudan erişim dizisi olabilir ve anahtar yalnızca azaldığı için
  yukarı sızdırma yeter — O(log n).
- **Dallanma çarpanı takası (12, 13, 14)** → 12'de B-ağacı, 13'te d-yollu heap, 14'te doğrudan
  erişim dizisi; üçü aynı fikrin farklı yüzüdür ve **24'te ödendi**: karar ağacının dallanma çarpanı
  sabit olduğu sürece yükseklik logaritmiktir, doğrudan erişim dizisi dallanmayı doğrusal yapar ve
  alt sınırın altına iner. **d-yollu heap 24'te kullanılmadı**; kalan tek örnek odur.
- **Karar ağacı argümanı (14, 15)** → 14'te arama için (≥ n + 1 yaprak), 15'te sıralama için
  (≥ n! yaprak) sezgisel olarak kuruldu; **17'de argümanın asimptotik adımı ödendi** (yükseklik
  lemması ve log₂(n!) = Θ(n log n)); **24'te kuramın kendisi formalleşti** — model tanımı, iki adımlı
  alt sınır makinesi, üç elemanlı somut karar ağacı ve n = 10 için "en az 22 karşılaştırma" sayısı.
  Dört makale de "bu bir model sonucudur" uyarısını taşıyor.
- **Rastgeleleştirmeyle beklentiyi girdiden bağımsızlaştırma (14, 15)** → 14'te evrensel hash
  ailesi, 15'te hızlı sıralamanın rastgele karıştırması; **24'te ödendi**: paranoyak hızlı
  sıralamanın beklenti analizi ve "beklenti girdiden değil madenî paradan gelir" cümlesi; ayrıca
  Monte Carlo ile Las Vegas ayrımı. 36'da olasılık aracıyla formalleşir.
- **Kararlılık (15)** → 15'te radix sıralaması için zorunlu koşul olarak kullanıldı; 39'da
  veritabanı sıralamalarında ve çok anahtarlı sorgu sonuçlarında geri çağrılabilir.
- **Sayma sıralamasının zincirleri = hash zincirleri (14, 15)** → aynı yapı iki farklı amaçla
  kullanıldı; **24'te yalnızca model tartışmasında anıldı** (sayma ve radix sıralamaları
  karşılaştırma modelinde olmadıkları için alt sınırın altına iner), zincir yapısının kendisi
  yeniden açılmadı. 34'te dosya organizasyonunda geri çağrılabilir.

Batch 5 ile açılan yeni pinler:

- **Graf için doğrusal zaman Θ(|V| + |E|) (16)** → **23'te ödendi**: DAG gevşetmesinin maliyeti,
  el sıkışma lemmasından çıkan Θ(|E|) `azalt_anahtar` sayısı ve dört algoritmanın maliyet tablosu;
  **25'te iki kez daha kullanıldı**: Kosaraju-Sharir'in iki geçişi ve ters grafın kurulması, ayrıca
  2-SAT kararının Θ(n + m) olması.
- **BFS'in ağırlıksız grafta en kısa yol vermesi (16)** → **23'te ödendi**: Dijkstra tam olarak
  bunun ağırlıklı genellemesi olarak sunuldu ve kuyruğun yerini öncelik kuyruğu aldı.
- **DFS'in bitiş sırası ve ters bitiş sırası (16)** → **22 topolojik sıra pinini ödedi** ama
  algoritmayı kullanmadı (tablolama sırası soyut bir topolojik sıradır); **25'te tamamen ödendi**:
  Kosaraju-Sharir'in iki geçişi (G üzerinde bitiş sırası, G^R üzerinde ters bitiş sırası), sekiz
  düğümlü somut graf, Θ(|V| + |E|) maliyeti, yoğunlaştırma grafının her zaman DAG olması ve
  2-SAT'ın imalar grafıyla polinom zamanda çözülmesi. **Uyarı:** birincil kaynak Sedgewick 4.2'dir;
  MIT 6.006 Bahar 2020'de SCC dersi yoktur.
- **Niceleyicili tanım kalıbı (17)** → **19'da ödendi**: döngü değişmezi "her i için, i'inci
  yinelemenin başında …" biçiminde yazıldı ve "dizinin başı sıralı" gibi gevşek ifadelerin
  değişmez sayılmadığı gösterildi; **25'te ikinci kez ödendi**: NP tanımı "öyle bir V vardır ki …
  öyle bir c vardır ki … her c için" kalıbıyla yazıldı ve EVET/HAYIR asimetrisinin kaynağının
  niceleyici türü olduğu gösterildi.
- **Eşik ve kesişim noktası: asimptotik ile pratik ayrımı (17)** → **20'de ödendi**: n²/4 ile
  n log₂ n karşılaştırmasından çıkan n ≤ 15 eşiği ve Strassen'in n ≥ 32 eşiği; 37'de bellek
  hiyerarşisinin sabitleri büyütmesi.
- **log₂(n!) = Θ(n log n) (17)** → **24'te ödendi**: karar ağacı kuramıyla birleşti ve
  h ≥ lg(n!) = Ω(n log n) sonucunu verdi; ayrıca Stirling'e gerek bırakmayan
  n! ≥ (n/2)^(n/2) kaba hesabı gösterildi.
- **Özyineleme ağacı (18)** → **20'de iki işlevle ödendi**: dallanma çarpanı karşılaştırmasının
  (4 vs 3 alt problem) aracı ve desenin çöktüğü yerin teşhis aracı; **22'de üçüncü kez ödendi**
  (ağacın tekrar eden düğümleri DAG'a çökertildi) ve **24'te dördüncü kez** (paranoyak hızlı
  sıralamanın seviye başına 2cn işi ve log_{4/3} n yüksekliği).
- **Master Teoremi ve üç durumu (18)** → **20'de dört kez doğrudan kullanıldı** (4T(n/2) + Θ(n),
  3T(n/2) + Θ(n), 8T(n/2) + Θ(n²), 7T(n/2) + Θ(n²)). **23'te kullanılmadı** ve kullanılamazdı: graf
  algoritmalarının maliyeti yineleme çözmekten değil, işlem sayımından (Θ(|V|) çıkarma + Θ(|E|)
  azaltma) gelir; bu, taslak satırındaki beklentinin düzeltilmesidir. **24'te eşit olmayan alt
  problemli bağıntı geri döndü** (T(n) ≤ T(n/4) + T(3n/4) + 2cn) ve Master Teoremi'nin
  uygulanamadığı yer olarak özyineleme ağacıyla çözüldü.
- **Tahmin et ve doğrula, hipotezi güçlendirme (18)** → **19'da (permütasyon şartı) ve 20'de
  (medyan bulmanın T(n) ≤ c·n tahmini) ödendi**. 21–23'te optimal altyapı iddiaları **tahmin-doğrula
  ile değil, kes-yapıştır ile** ispatlandı; taslak satırındaki beklenti bu yönde düzeltilmiştir.
  Hipotezi güçlendirme refleksinin DP karşılığı, alt problem tanımına parametre eklemektir
  (6.006'nın "alt problem kısıtlama/genişletme" tekniği; 22'de anıldı, örneği verilmedi — 36 ya da
  41'de açılabilir).

Batch 6 ile açılan yeni pinler:

- **Kısmi doğruluk ile sonlanma ayrımı (19)** → 20'de böl-yönet doğruluk savunmasının iki ayağı;
  **22'de ödendi**: tablolama döngüsünün değişmezi (başlatma taban durumlar, koruma bağıntının
  yalnızca dolmuş hücrelere bakması, sonuçlanma özgün problemin okunması); **25'te uç hâli ödendi**:
  sonlanmayı genel olarak ispatlayacak bir algoritma yoktur, çünkü durma problemi karar
  verilemezdir — sonlanma ispatı elle yapılır çünkü otomatikleştirilemez. **29–31'de eşzamanlılık
  değişmezleri ve kilitlenmenin ilerleme argümanı** olarak sürecek.
- **Değişmez İlkesi ve durum makinesi modeli (19)** → **26 ve 27'de ödendi**: 26'da kullanıcı/çekirdek
  kipi geçişleri bir durum makinesidir ve korunan değişmez "çekirdek kipine yalnızca çekirdeğin
  belirlediği noktadan girilir"dir; 27'de süreç durum makinesinin değişmezi "her an en fazla bir
  süreç çalışan durumdadır ve engellenmiş süreç olayı gelmeden hazır olmaz"dır. 29'da kritik kesim
  koşulları, 31'de Banker'ın güvenli durumu aynı kalıptır.
- **Azalan ölçüyle sonlanma, zayıf azalmanın yetmemesi (19)** → **22'de topolojik sıra biçiminde
  ödendi** (bağıntı yalnızca sırada önce gelen alt problemlere bakar, bu yüzden döngü sonlanır ve
  koruma geçerlidir); 31'de açlık ve canlılık tartışmasında sürer.
- **Değişmezi keşfetmek ispatın zor kısmıdır (19)** → **22'de ödendi ve makalenin başlığı oldu**:
  "alt problemi bulmak" ispatta değişmezi bulmakla aynı zorluktur.
- **İki kaldıraç: alt problem sayısı a ve birleştirme maliyeti g(n) (20)** → **23'te ödendi**:
  Dijkstra ve Prim'in maliyeti Θ(|V|)·en_küçüğü_çıkar + Θ(|E|)·azalt_anahtar formülüyle yazılır ve
  kuyruk temsilini değiştirmek aynı algoritmayı ucuzlatır (dizi |V|², ikili heap |E| log |V|,
  Fibonacci heap |E| + |V| log |V|). **24'te iş ile açıklık ayrımına dönüştü**: aynı işi yapan iki
  algoritmanın açıklıkları çok farklı olabilir.
- **Örtüşen alt problemler (20)** → **22'de ödendi**: naif Fibonacci ağacında F(15)'in 987 kez
  hesaplanması, 2·F(n+1) − 1 çağrı sayısı (n = 30 için 2.692.537) ve teşhis refleksi olarak "kaç
  farklı alt problem var, kaç çağrı yapılıyor?" sorusu.
- **Eşit olmayan alt problemler (20)** → **24'te ödendi** ama beklenenden farklı bir örnekle:
  rastgeleleştirilmiş **seçim** algoritmasının değil, paranoyak hızlı **sıralamanın**
  T(n) ≤ T(n/4) + T(3n/4) + 2cn bağıntısı kullanıldı. Rastgeleleştirilmiş seçimin beklenti analizi
  hâlâ ödenmemiştir; 36'da olasılık aracıyla açılabilir.
- **Açgözlü seçim özelliği ile optimal altyapının ayrı iddialar olması (21)** → **22 ve 23'te iki kez
  ödendi**: 22'de dinamik programlamanın yalnızca optimal altyapıyı istemesi, 23'te MST'nin her
  ikisine birden sahip olması ve bu yüzden açgözlünün DP'den ucuza çalışması.
- **Değişim argümanı (21)** → **23'te ödendi**: kesit teoreminin ispatı (kesitin en hafif kesen
  kenarı, ağaçtaki tek basit yol üzerindeki bir kesen kenarla takas edilir). **24'te
  kullanılmadı** — alt sınır ispatları sayma argümanıdır, değişim değil; taslak satırındaki
  beklenti bu yönde düzeltilmiştir.
- **Ağırlıklı aralık çizelgeleme (21)** → **22'nin çalışılmış örneği**: alt problem, ders notundaki
  Rₓ = {j | s(j) ≥ x} kesim biçimi yerine **önek biçiminde** kuruldu (OPT(j) ve p(j)); ikisi
  denktir, önek biçimi tablo çizmeye ve ebeveyn işaretçisi yürütmeye daha uygundur.
- **Önek-serbest kod ve bit muhasebesi (21)** → 6'daki güvercin yuvasıyla kurulan "her dosyayı
  sıkıştırmak imkânsızdır" sınırıyla birleşir; 34'te dosya sistemlerinde ve 39'da veritabanı
  sıkıştırmasında geri çağrılabilir.

Batch 7 ile açılan yeni pinler:

- **Alt problem bağımlılık grafının şekli (22)** → desenleri ayıran ölçüt (ağaç = böl-yönet,
  DAG = dinamik programlama); **25'te yoğunlaştırma grafı olarak geri döndü** (güçlü bileşenleri
  büzünce kalan yapı her zaman bir DAG'dır), ama "indirgeme grafı" terimi kullanılmadı.
- **Sözde polinom (22)** → **25'te ödendi**: altküme toplamının O(nT) çözümü girdi boyutunda
  polinom değildir (n = 100 tane 64 bitlik sayı 808 bayt girdi, tablo ≈ 1,8 × 10²¹ hücre); teknik
  adı **zayıf NP-tamlıktır** ve güçlü NP-tam problemlerin sözde polinom algoritması bile yoktur.
  9'un "girdi boyutu sayı mı basamak mı" pini burada kapandı.
- **Bellekleme ile tablolama takası (22)** → 33'te sayfa değiştirme ve önbellekleme kararlarının
  "sakla ya da yeniden hesapla" muhasebesi; 37'de bellek hiyerarşisi aynı takasın donanım hâlidir.
- **Ebeveyn işaretçisiyle çözümü geri yürütmek (22)** → 23'te en kısa yollar ağacının kurulması
  aynı tekniktir; 28'de zamanlama izlerinin geri okunmasında kullanılabilir.
- **İndeksli öncelik kuyruğu ve `azalt_anahtar` (23)** → 28'de öncelikli CPU zamanlaması, 34'te
  kesikli olay benzetimi; ikisi de anahtarı değişen bir kuyruk ister.
- **Gevşetme ve üçgen eşitsizliği (23)** → tahminin hep gerçek değerin üstünde tutulup kademeli
  düşürülmesi kalıbı; 31'de güvenli durum tahmini ve 33'te çalışma kümesi kestiriminde aynı
  refleks kullanılır.
- **Negatif çevrimde "en kısa yol" sorusunun iyi tanımlı olmaması (23)** → **25'te ödendi**:
  "iyi tanımlı olmamak" ile "zor olmak" ayrı şeylerdir ve bu ayrım mülakat hataları listesine
  girdi; doğru cevap bir sayı değil, çevrimin kendisini raporlamaktır.
- **Aynı maliyet formülünün iki farklı algoritmayı yönetmesi (23)** → Prim ile Dijkstra'nın tek
  farkı anahtarın w(u, v) mi d(u) + w(u, v) mi olduğudur; 28'de zamanlama kurallarının aynı
  iskelet üzerinde ayrışması aynı derstir.
- **Alt sınırın modele ait olması (24)** → **25'te ödendi ve makalenin tezi oldu**: sınır modelden
  alınıp problemin kendisine taşındı ve üç kademeye ayrıldı (hiçbir modelde algoritma yok / hızlı
  algoritma bilinmiyor / eşik 2 ile 3 arasında).
- **Monte Carlo ile Las Vegas ayrımı (24)** → 36'da olasılık aracıyla formalleşir; 35'te
  olasılıksal güvenlik testlerinde geri çağrılabilir.
- **İş ile açıklık ayrımı (24)** → **27'de kısmen ödendi**: iş parçacığının birinci kullanım
  gerekçesi olan paralellikte analiz aracı olarak anıldı ve işletim sistemi tarafından gelen ek
  kısıt eklendi (çizelgelenebilir iş parçacığı sayısı ve geçiş maliyeti tavanı aşağı çeker); 28'de
  çok işlemcili zamanlamada, 37'de donanım paralelliğinde sürer.
- **Açgözlü çizelgeleyici teoremi ve 2 kat sınırı (24)** → 28'de CPU zamanlama ölçütlerinin
  optimalle karşılaştırılmasında; bir çizelgeleyicinin "yeterince iyi" olduğunu ispatlamanın
  kanonik kalıbıdır.
- **Amdahl yasasının fazla iyimser olması (24)** → 37'de bellek hiyerarşisi ve gerçek hızlanma
  ölçümlerinde; tek bir orana bakmanın bağımlılık yapısını göremediği dersi.

Batch 8 ile açılan yeni pinler:

- **İndirgemenin yönü (25)** → bir zorluk iddiasının nasıl kurulacağının kanonik kalıbı: bilinen
  zor problemden yeniye. 39'da sorgu karmaşıklığı ya da 41'in provasında tekrar sorulabilir.
- **Güçlü bağlı bileşenler ve yoğunlaştırma DAG'ı (25)** → 2-SAT dışında kullanılmadı; 34'te
  bağımlılık çözümlemesinde ya da 39'da sorgu grafında geri çağrılabilir.
- **2 ile 3 arasındaki eşik (25)** → 2-SAT/3-SAT ve 2-boyama/3-boyama; "parametreyi bir artırınca
  sınıf değişiyor mu?" refleksi, 36'da olasılıksal yaklaşıklamada sürebilir.
- **Cook-Levin yalnızca sezgi düzeyinde verildi (25)** → devre argümanının kendisi ispatlanmadı;
  bilinçli bir kapsam kararıdır ve 41'de "ne kadarını savunabilirim" sorusuyla geri gelebilir.
- **Sanallaştırma, eşzamanlılık, kalıcılık üçlüsü (26)** → Faz D'nin iskeleti; 28–31
  eşzamanlılığın, 32–33 sanallaştırmanın, 34 kalıcılığın alanıdır.
- **İlke ile düzenek ayrımı (26)** → 28'de zamanlama ilkeleri ile bağlam anahtarı düzeneğinin
  ayrılması, 33'te sayfa değiştirme ilkelerinde, 35'te koruma ilkelerinde.
- **Tuzak ile kesme ayrımı (26)** → tuzağı çalışan program gönüllü doğurur, kesme dışarıdan gelir;
  32–33'te sayfa hatası bir tuzaktır ve aynı tabloya bakar.
- **Kesme sırasında kesme (26)** → yalnızca anıldı ("kesmeleri kapatmak" bir seçenek olarak);
  29'da çekirdek içi eşzamanlılık olarak açılmalıdır.
- **Monolitik çekirdek ile mikroçekirdek takası (26)** → 35'te Linux somutlamasında; yalıtımın
  bedelinin iletişim maliyeti olması kalıbı 27'de süreç/iş parçacığı seçiminde tekrarlandı.
- **Süreç API'si yalnızca soyut düzeyde verildi (27)** → Create/Destroy/Wait/Status; `fork()`,
  `exec()` ve `wait()` somutlaması 38'e (C ve bellek) ya da 28'in girişine kalmıştır.
- **Bağlam anahtarının çevrim cinsinden ucuzlamaması (27)** → 37'de bellek hiyerarşisi bu
  gözlemin donanım gerekçesini verir (Ousterhout).
- **Zaman dilimi ile ek yük takası (27)** → 28'in ana konusu: dilim küçüldükçe tepki süresi
  iyileşir, ek yük büyür.
- **Yarış koşulu, kritik kesim, karşılıklı dışlama, atomiklik (27)** → problem kuruldu, çözüm
  bilinçli olarak 29'a (kilit, semafor, monitör) ve 30'a (klasik problemler) bırakıldı.
- **Süreç ile iş parçacığı bellek düzeni (27)** → 32'de adres uzayı çevirisi ve 38'de C'nin
  yığın/heap ayrımı aynı şekli farklı amaçla kullanır.
