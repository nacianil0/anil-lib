# "Mülakat Aynası: Boğaziçi CmpE" — Yol Haritası

> Serinin yaşayan omurgası (şu an 41 başlık, 5 faz), prerequisite grafı ve tasarım gerekçeleri.
> Kurallar: `docs/seri-boun/SOZLESME.md`. Durum: `docs/seri-boun/HANDOFF.md`. Kanıt defteri:
> `docs/seri-boun/ARASTIRMA.md`. Yayımlanmamış başlıklar **taslaktır**; batch hazırlığında
> pedagojik gerekçeyle güncellenebilir (yayımlananlar asla).

Son güncelleme: 2026-08-29 · Yayında: 6 (1–3 Batch 0, 4–6 Batch 1) · Sıradaki: 7

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
7. **Graflar ve Ağaçlar: Tanımlar ve İlk İspatlar** — derece, yol/döngü, bağlılık, ağaç karakterizasyonları; el sıkışma lemması.
8. **Cebirsel Yapılar ve Boolean Cebiri** — grup/yarıgrup, kafes, Boolean cebiri; devre ve mantık sadeleştirme bağı.

### Faz B — Veri Yapıları: Maliyetiyle Düşünmek (9–16) · CMPE250 ekseni

9. **Karmaşıklık: Big-O ile Düşünmeye Başlamak** — RAM modeli, büyüme sınıfları, en kötü/ortalama durum; sezgisel kurulum (formal ispatlar 17'de).
10. **Diziler, Bağlı Listeler, Yığın ve Kuyruk** — temel işlemler ve maliyet tablosu; hangi yapı ne zaman.
11. **Ağaçlar ve İkili Arama Ağaçları** — BST değişmezi, arama/ekleme/silme, dengesizliğin bedeli.
12. **Dengeli Arama: AVL'den B-Ağacına** — dönüşler (kavramsal), yükseklik garantisi; B-ağacı ve disk/dosya organizasyonu bağı.
13. **Heap ve Öncelik Kuyruğu** — heap değişmezi, build-heap, heapsort; öncelik kuyruğu kullanımları.
14. **Hashing: Sabit Zamanın Bedeli** — hash fonksiyonu, çakışma çözümü (zincir/açık adresleme), yük faktörü; en kötü durum savunması.
15. **Sıralama Algoritmaları: Karşılaştırmalı ve Ötesi** — insertion/merge/quick/heap karşılaştırması, kararlılık; sayma/radix teaser'ı (alt sınır 24'te).
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

**Batch 2 taslak satırları:**
- 7 ← 5 (bağıntı ve küme dili), 6 (derece toplamı için sayma), 4 (ağaç ispatlarında tümevarım)
- 8 ← 2 (Boolean bağlaçlar), 5 (bağıntı/kısmi sıra; kafes bir kısmi sıradır)
- 9 ← 6 (adım sayma), 4 (özyinelemeli maliyet sezgisi)

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

## Kavram-tekrar defteri

Yayımlanmış makalelerin ileride bilinçli olarak geri çağrılacağı noktalar:

- **Boş doğruluk (2)** → 19'da döngü değişmezlerinin başlatma adımında yeniden kullanılır.
- **Niceleyici sırası (2)** → 17'de asimptotik tanımların "her ε için bir N vardır" kalıbında
  formal olarak yeniden kurulur.
- **Karşı örnek disiplini (3)** → 21'de açgözlü algoritmaların ne zaman çalışmadığını göstermede.
- **Yapıcı olmayan ispat (3)** → 21 ve 25'te varlık argümanlarının algoritma vermemesi tartışmasında.
- **Hash tablosu takip zinciri (1)** → 14'te gerçek konu olarak açılır; 1'deki örnek oraya köprüdür.
- **Güçlü tümevarım ve parçalama adımı (4)** → 18'de böl-yönet yinelemelerinde ve 19'da döngü
  değişmezlerinde; mergesort doğruluğu 4'te örnek olarak adıyla anıldı.
- **Yapısal tümevarım (4)** → 7'de ağaç karakterizasyonlarında, 11–13'te ağaç/heap değişmezlerinde.
- **Hanoi yinelemesi T(n) = 2T(n−1) + 1 (4)** → 18'de Master Teoremi öncesi ısınma örneği.
- **Kısmi sıra ve topolojik sıralama (5)** → 16'da algoritmasıyla açılır; 5'teki bağımlılık grafı
  örneği oraya köprüdür.
- **Sayılabilirlik ve hesaplanamayan fonksiyonlar (5)** → 25'te durma problemi ve karar
  verilemezlik tartışmasının sayma zemini.
- **Birebir olmayan hash fonksiyonu (5, 6)** → 14'te çakışma çözümü ve yük faktörü tartışmasının
  gerekçesi; 6'da güvercin yuvasıyla ispatlandı.
- **C(n, 2), 2ⁿ ve n! büyüklükleri (6)** → 9 ve 17'de karmaşıklık sınıflarının somut zemini;
  24'te karşılaştırmalı sıralamanın n! alt sınırı.
- **Doğum günü ilkesi (6)** → 36'da olasılık aracıyla; 6'da yalnızca etiketli ileri gönderme olarak
  geçti (kesinlik ile olasılık ayrımı).
