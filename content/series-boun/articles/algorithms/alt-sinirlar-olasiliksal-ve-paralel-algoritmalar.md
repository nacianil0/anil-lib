---
article_id: article_247248d5-746a-42d4-9fd7-e01241810ac1
title: "Alt Sınırlar, Olasılıksal ve Paralel Algoritmalar"
slug: alt-sinirlar-olasiliksal-ve-paralel-algoritmalar
category: algorithms
level: advanced
reading_order: 24
summary: "Üç yeni soru: daha hızlısı imkânsız mı, rastgelelik hız kazandırır mı, birden çok işlemci varken maliyet nedir? Karar ağacı kuramının formal hâli ve karşılaştırmalı sıralamanın n log n alt sınırı; Monte Carlo ile Las Vegas ayrımı, Freivalds'ın çarpım denetleyicisi ve rastgeleleştirilmiş hızlı sıralamanın beklenti analizi; iş ile derinlik ayrımı, iş ve açıklık yasaları, açgözlü çizelgeleyici teoremi ve Amdahl yasasından neden daha keskin olduğu."
tags:
  - alt-sinir
  - karar-agaci
  - rastgelelestirme
  - paralel-algoritmalar
  - is-ve-derinlik
content_hash: sha256:557816efadcae35535e676d52fa6aa81d7b39739025e5bd891b189edb04a689b
classification_version: 1
classification_batch: 7
---
## Üç yeni soru

Faz C boyunca hep aynı soruyu sorduk: bu problemi **ne kadar hızlı** çözebilirim? Asimptotik analiz maliyeti ölçmeyi, yinelemeler onu hesaplamayı, döngü değişmezleri doğruluğunu savunmayı, üç tasarım deseni de daha hızlı algoritmalar kurmayı öğretti.

Bu makale soruyu üç kez değiştiriyor. **Birincisi tersinden:** daha hızlısı gerçekten imkânsız mı? Bir üst sınır bir algoritma göstererek ispatlanır; bir **alt sınır** ise bütün olası algoritmalar hakkında bir iddiadır ve onu ispatlamak bambaşka bir iştir. **İkincisi:** algoritmanın madenî para atmasına izin verirsem ne kazanırım? **Üçüncüsü:** elimde tek değil P tane işlemci varsa maliyeti nasıl ölçerim?

Üçü de CMPE300 kataloğunun ileri başlıklarıdır ve mülakatta üçü de "bunu daha hızlı yapamaz mıydın?" sorusuna verilecek cevabın parçasıdır.

## Karar ağacı kuramı

Sıralama ve hashing makalelerinde karar ağacı argümanını sezgisel olarak kullanmış, formal hâlini buraya ertelemiştik. Asimptotik analiz makalesinde de argümanın çekirdek adımını — yükseklik lemmasını — yapısal tümevarımla ispatlamıştık. Şimdi parçaları birleştiriyoruz.

Önce **model**. Bir algoritmanın girdiye yalnızca **ikili karşılaştırmalarla** eriştiğini varsayalım: iki öğeyi karşılaştırır, cevaba göre dallanır, başka hiçbir şey yapamaz. Bu, **karşılaştırma modelidir**. Sabit bir girdi boyutu n için böyle bir algoritma bir **ikili ağaca** dönüşür: her iç düğüm bir karşılaştırma, her dal bir cevap, her yaprak bir çıktı. Bir çalıştırma kökten bir yaprağa giden bir yoldur ve maliyeti o yolun uzunluğudur. Dolayısıyla **en kötü durum maliyeti = ağacın yüksekliği**.

Alt sınır iki adımda çıkar.

**Adım 1: yaprak sayısı çıktı sayısından az olamaz.** Algoritma iki farklı girdi için farklı çıktı vermek zorundaysa, o iki girdi ağaçta farklı yapraklara düşmelidir; aksi hâlde aynı yaprağa düşen iki girdiye aynı cevabı verirdi ve en az birinde yanılırdı.

**Adım 2: yükseklik, yaprak sayısının logaritmasından küçük olamaz.** Asimptotik analiz makalesinde ispatladığımız lemma: yüksekliği h olan bir ikili ağacın en fazla 2^h yaprağı vardır. L yaprak gerekiyorsa L ≤ 2^h, yani **h ≥ lg L**.

Bu iki adım birleşince kurallı bir alt sınır makinesi elde ederiz: **çıktı sayısını say, logaritmasını al.**

**Sıralama.** n öğeyi sıralamanın olası çıktısı, girdinin hangi permütasyonda olduğudur; n! farklı cevap vardır. Demek ki h ≥ lg(n!) ve asimptotik analiz makalesinde ispatladığımız lg(n!) = Θ(n log n) sonucuyla **h = Ω(n log n)** çıkar. Birleştirmeli sıralama bu sınıra ulaştığı için karşılaştırma modelinde **optimaldir**.

Sınır soyut değil, sayılabilir. n = 3 için 3! = 6 yaprak gerekir ve lg 6 ≈ 2,58 olduğundan en az **3** karşılaştırma; bu ağaç elle çizilebilir. n = 10 için 10! = 3.628.800 ve lg(10!) ≈ 21,79, yani **en az 22** karşılaştırma. n = 20 için lg(20!) ≈ 61,08, yani **en az 62**. Bu değerleri tek tek hesaplattım.

Kaba bir hesapla da aynı sonuca varılır ve Stirling formülüne gerek yoktur: n! çarpımının en büyük n/2 çarpanının her biri en az n/2 olduğundan n! ≥ (n/2)^(n/2), dolayısıyla lg(n!) ≥ (n/2)·lg(n/2) = Ω(n log n).

**Arama.** n öğelik sıralı bir dizide bir değeri aramanın olası cevabı, değerin hangi konumda olduğu ya da hangi iki öğe arasına düştüğüdür: en az n + 1 farklı çıktı. Demek ki h ≥ lg(n + 1) − 1 ve ikili arama bu sınıra ulaşır. Hashing makalesinde bu argümanı sezgisel olarak kullanmıştık; formal hâli budur. Şekil 1 solda üç öğelik somut karar ağacını, sağda makinenin iki adımını ve sayısal sonuçları gösteriyor.

![Dikey bir çizgiyle ayrılmış iki panelli bir şema. Sol panelin başlığı karar ağacı: iç düğüm bir karşılaştırma, yaprak bir çıktı. Üç öğeyi sıralayan ikili bir karar ağacı çizilmiş. Kökte a iki nokta b karşılaştırması var; sol dal küçük, sağ dal büyük eşit ile etiketli. Kökün sol çocuğu b iki nokta c karşılaştırması; onun sol dalı a b c yaprağına, sağ dalı bir a iki nokta c karşılaştırmasına gidiyor ve o karşılaştırmanın sol dalı a c b, sağ dalı c a b yaprağına iniyor. Kökün sağ çocuğu a iki nokta c karşılaştırması; onun sol dalı b a c yaprağına, sağ dalı bir b iki nokta c karşılaştırmasına gidiyor ve o karşılaştırmanın sol dalı b c a, sağ dalı c b a yaprağına iniyor. Altı yaprağın hepsi vurgulanmış. Panelin altında a iki nokta b gösteriminin a ile b nin karşılaştırılması demek olduğu, ağacın altı yaprağı ve üç yüksekliği bulunduğu, üç faktöriyelin altı ve log altının yaklaşık iki virgül elli sekiz olması nedeniyle en az üç karşılaştırma gerektiği yazıyor. Sağ panelin başlığı alt sınır: çıktıyı say, logaritmasını al. Panelde vurgulanmış bir kutu var; içinde yaprak sayısı L nin olası çıktı sayısından küçük olamayacağı, yüksekliği h olan ikili bir ağaçta L nin en fazla iki üzeri h olabileceği ve buradan h nin en az log L olduğu yazılı. Kutunun altında dört sütunlu bir tablo var: n, n faktöriyel yani çıktı sayısı, log n faktöriyel ve en az sütunları. Satırlar: n üç için altı, iki virgül elli sekiz, en az üç; n on için üç milyon altı yüz yirmi sekiz bin sekiz yüz, yirmi bir virgül yetmiş dokuz, en az yirmi iki; n yirmi için yaklaşık iki virgül dört çarpı on üzeri on sekiz, altmış bir virgül sıfır sekiz, en az altmış iki. Tablonun altında sıralamada çıktı sayısının n faktöriyel olması nedeniyle h nin omega n log n, aramada çıktı sayısının n artı bir olması nedeniyle h nin en az log n artı bir eksi bir olduğu yazıyor. En altta not: alt sınır modele aittir, sayma ve radix sıralamaları karşılaştırma yapmadıkları için altına iner](assets/karar-agaci-alt-sinir.svg "Şekil 1 — Alt sınır makinesi: çıktı sayısını say, logaritmasını al")

Son ve en önemli uyarı: **bu bir model sonucudur.** Sayma sıralaması ve radix sıralaması n log n'in altına iner, çünkü karşılaştırma modelinde değildirler; anahtarı bir indis olarak kullanırlar. Hashing makalesinde bu takasa "dallanma çarpanını kırmak" demiştik: karar ağacının dallanma çarpanı sabit olduğu sürece yükseklik logaritmiktir, doğrudan erişim dizisi ise dallanmayı doğrusal yapar. B-ağacının blok başına dallanmayı büyütmesi de, d-yollu heap de aynı takasın başka yüzleridir. Bir alt sınır söylediğinde **hangi modelde** olduğunu söylemek zorunludur; söylemezsen iddian yanlıştır.

> **Sesli anlat:** "Karşılaştırmalı sıralamanın n log n alt sınırını tahtaya ispatla. Doksan saniye."
>
> İyi bir cevabın omurgası: "Önce modeli sabitlerim: algoritma girdiye yalnızca ikili karşılaştırmalarla erişiyor. O zaman sabit bir n için algoritma bir ikili karar ağacıdır; iç düğümler karşılaştırma, yapraklar çıktı, bir çalıştırma kökten yaprağa bir yol, en kötü durum maliyeti ağacın yüksekliğidir. Sonra iki adım: birincisi, iki farklı cevabın iki farklı yaprağa düşmesi gerektiği için yaprak sayısı olası çıktı sayısından az olamaz; sıralamada bu n faktöriyeldir. İkincisi, yüksekliği h olan bir ikili ağacın en fazla iki üzeri h yaprağı vardır, bu yapısal tümevarımla ispatlanır; buradan h en az log n faktöriyeldir. Son adımda log n faktöriyelin teta n log n olduğunu gösteririm — kabaca, çarpımın en büyük yarısındaki her çarpan en az n bölü ikidir, yani n faktöriyel en az n bölü ikinin n bölü ikinci kuvvetidir. Sonuç omega n log n. Birleştirmeli sıralama bu sınıra ulaşır, yani bu modelde optimaldir. Uyarı: sınır modele aittir; sayma ve radix sıralamaları karşılaştırma yapmadıkları için altına iner."

## Rastgeleleştirilmiş algoritmalar

Rastgeleleştirilmiş bir algoritma, çalışırken rastgele bir sayı üretir ve kararlarını ona göre verir. Sonucu şudur: **aynı girdide iki farklı çalıştırma farklı sayıda adım atabilir, hatta farklı çıktı verebilir.** İki ana tür vardır ve mülakatta ikisinin adı da beklenir.

| | Monte Carlo | Las Vegas |
|---|---|---|
| Süre | her zaman polinom | beklenen polinom |
| Çıktı | yüksek olasılıkla doğru | her zaman doğru |

**Monte Carlo örneği: çarpım denetleyicisi.** Elimizde n × n boyutlu A, B, C matrisleri var ve A × B = C olup olmadığını denetlemek istiyoruz. Çarpımı yeniden yapmak Θ(n^2,81) sürer (Strassen). Freivalds'ın algoritması bunu Θ(n²)'ye indirir: rastgele bir ikili r vektörü seç ve A(Br) = Cr olup olmadığına bak. Üç matris-vektör çarpımı, her biri Θ(n²).

Analiz iki satırdır. A × B = C ise eşitlik her r için sağlanır; algoritma **kesinlikle** "evet" der. A × B ≠ C ise D = AB − C sıfır olmayan bir matristir ve d_ij ≠ 0 olan bir hücre vardır; o hücreyi kullanarak, algoritmanın seçebileceği her r vektörünü Dr ≠ 0 veren bir r′ vektörüyle birebir eşleyebiliriz. Eşleme birebir olduğu için hata veren r'lerin sayısı, yakalayan r'lerin sayısını aşamaz: **yanlış "evet" olasılığı en fazla 1/2**. Bağımsız k kez tekrarlarsan olasılık 2^(−k)'ye düşer; k = 20 ile milyonda birin altına iner. Bu sınırı 0/1 matrislerde mod 2 aritmetiğiyle deneysel olarak da ölçtüm: kasıtlı olarak tek bir hücresi bozulmuş 20.000 çarpımda yanlış "evet" oranı 0,4985 çıktı — sınıra tam oturuyor.

**Las Vegas örneği: rastgeleleştirilmiş hızlı sıralama.** Sıralama makalesinde hızlı sıralamanın en kötü durumunun Θ(n²) olduğunu ve rastgele karıştırmanın bunu "kurtardığını" söylemiştik; borç, beklenti analizinin kendisiydi.

Analizi kolay okunan bir sürüm üzerinden yapalım. Eksen **iyi** olsun demek, ikiye ayırdığı parçaların ikisinin de en fazla 3n/4 büyüklüğünde olması demektir. Rastgele seçilen bir eksenin iyi olma olasılığı 1/2'den büyüktür: sıra istatistiği n/4 ile 3n/4 arasına düşen her eksen iyidir ve bu aralık öğelerin yarısından fazlasını içerir. Sayısal olarak: n = 100 için 100 sıradan 52'si iyidir, n = 10.000 için 5.002'si — oran hep 1/2'nin üstünde.

Şimdi "paranoyak" bir sürüm düşün: **iyi bir eksen bulana kadar rastgele eksen seçip ayırmayı tekrarla, sonra özyinele.** Bir denemenin başarı olasılığı p > 1/2 olduğuna göre beklenen deneme sayısı 1/p < 2'dir. Her deneme Θ(n) sürer, dolayısıyla bir düğümdeki beklenen iş 2cn'dir. Ayrıca eksen iyi olduğu için özyineleme bağıntısı

**T(n) ≤ T(n/4) + T(3n/4) + 2cn**

olur. Bu, yinelemeler makalesindeki özyineleme ağacı diliyle okunur: her seviyede toplam iş 2cn'dir ve en uzun kol her adımda 3/4 ile çarpıldığı için ağacın yüksekliği en fazla log_{4/3} n'dir. n = 10⁶ için log_{4/3} n ≈ 48, lg n ≈ 20 — yani sabit çarpan yaklaşık 2,4 kat kötüdür ama **sınıf değişmez**: beklenen süre Θ(n log n).

İki incelik mülakatta ayırt edicidir. Birincisi: **en kötü durum hâlâ Θ(n²)'dir.** Rastgeleleştirme bunu ortadan kaldırmaz, yalnızca ihtimalini yok denecek kadar küçültür. İkincisi ve daha önemlisi: beklenti artık **girdiden değil, madenî paradan** gelir. Ortalama durum analizi girdinin bir dağılımdan geldiğini varsayar ve o varsayım tutmazsa çöker; rastgeleleştirilmiş analiz **her girdi için** geçerlidir, çünkü rastgelelik algoritmanın içindedir. Hashing makalesindeki evrensel hash ailesi tam olarak aynı fikirdi: bir düşman girdi seçebilir ama algoritmanın atacağı yazı turayı seçemez.

Bu, karmaşıklık makalesinde açtığımız "en iyi / en kötü / ortalama durum" ayrımına dördüncü bir kavram ekler: **beklenen zaman (expected time)**. Mülakatta "ortalama durumda n log n" demek ile "beklenen zamanı n log n" demek aynı şey değildir; ilki girdi dağılımına, ikincisi algoritmanın kendi rastgeleliğine dayanır.

## Paralel algoritmalar

Şimdiye kadar bütün analizler tek bir işlemci varsaydı — RAM modelinin varsayımlarından biriydi. P tane işlemci varsa maliyeti ölçmek için **iki** sayıya ihtiyaç vardır.

Paralel bir hesabı bir DAG olarak düşün: her düğüm ardışık bir komut dizisi, her kenar bir bağımlılık. İki ölçü tanımlanır:

- **İş (work) T₁:** bütün düğümlerin toplam süresi, yani hesabın tek işlemcide alacağı zaman.
- **Açıklık ya da derinlik (span, depth) T∞:** DAG'ın en uzun yolunun süresi, yani sonsuz işlemcide bile geçmesi gereken zaman. Kritik yol uzunluğu da denir.

İki temel yasa doğrudan tanımdan çıkar. **İş yasası:** T_P ≥ T₁/P — P işlemci adım başına en fazla P birim iş bitirir. **Açıklık yasası:** T_P ≥ T∞ — bağımlılık zincirini kısaltamazsın.

Bileşim kuralları da basittir: iki hesabı **ardışık** yaparsan hem iş hem açıklık toplanır; **paralel** yaparsan iş toplanır ama açıklık ikisinin **maksimumu** olur.

Bu iki sayının oranı **paralellik**tir: T₁/T∞. Açıklık yasası nedeniyle bu, elde edilebilecek hızlanmanın üst sınırıdır — kaç işlemci koyarsan koy. Somut bir örnek: n sayıyı toplayan bir ikili indirgeme ağacında iş n − 1 toplamadır, açıklık ağacın derinliği olan ⌈lg n⌉ seviyedir. n = 10⁶ için iş 999.999, açıklık 20, paralellik **50.000**. Cebirsel yapılar makalesinde "birleşme özelliği paralel indirgemeye izin verir" diye bıraktığımız pin tam olarak buydu: bölünebilir indirgemenin teknik adı monoiddir ve monoid olmak, ağacı istediğin gibi parantezleyebilmek demektir. Şekil 2 solda bu indirgeme ağacını, sağda iki yasayı ve açgözlü çizelgeleyici teoremini topluyor.

![Dikey bir çizgiyle ayrılmış iki panelli bir şema. Sol panelin başlığı iş ve açıklık: sekiz sayının paralel toplanması. Panelde dört seviyeli bir ikili toplama ağacı var: en altta sekiz kutu, üstünde dört toplama düğümü, onun üstünde iki toplama düğümü, en üstte tek bir toplama düğümü, yani toplam yedi toplama. En soldaki kutudan köke giden yol kalın çizilmiş ve o yol üzerindeki üç toplama düğümü vurgulanmış. Panelin altında koyu yolun açıklık, yani en uzun bağımlılık zinciri olduğu; işin yedi, açıklığın üç, paralelliğin yaklaşık iki virgül üç olduğu; n eşittir bir milyon için işin yaklaşık bir milyon, açıklığın yirmi, paralelliğin elli bin olduğu yazıyor. Sağ panelin başlığı iki yasa ve açgözlü çizelgeleyici. Panelde üst üste üç kutu var. Birincide iş yasası, T P nin en az T bir bölü P olduğu; ikincide açıklık yasası, T P nin en az T sonsuz olduğu yazıyor. Üçüncü kutu vurgulanmış; içinde açgözlü çizelgeleyicinin T bir bölü P artı T sonsuzu aşmadığı ve bunun optimalin en fazla iki katı olduğu yazılı. Kutuların altında paralelliğin T bir bölü T sonsuz, yani hızlanmanın tavanı olduğu; işi on sekiz, açıklığı dokuz ve seri kesri üç bölü on sekiz olan bir hesapta Amdahl yasasının altı kat derken gerçek paralelliğin yalnızca iki olduğu; paralel birleştirmeli sıralamanın işinin teta n log n, açıklığının teta log küp n olduğu yazıyor. En altta not: yalnızca işe bakmak hatadır, hızlanmanın tavanını açıklık belirler](assets/is-ve-aciklik.svg "Şekil 2 — İki sayı, iki yasa: iş hızlanmanın tabanını, açıklık tavanını belirler")

Peki gerçek bir çizelgeleyici bu sınırlara ne kadar yaklaşır? Cevap şaşırtıcı derecede iyidir. Bir **açgözlü çizelgeleyici** her adımda yapabildiği kadar çok iş yapar: hazır olan düğüm sayısı P'den fazlaysa P tanesini çalıştırır (tam adım), azsa hepsini çalıştırır (eksik adım).

> **Açgözlü çizelgeleyici teoremi.** Her açgözlü çizelgeleyici T_P ≤ T₁/P + T∞ süresini sağlar.

İspat iki satırdır. Tam adımların sayısı en fazla T₁/P'dir, çünkü her tam adım tam P birim iş bitirir ve toplam iş T₁'dir. Eksik adımların sayısı en fazla T∞'dir, çünkü her eksik adım kalan DAG'ın açıklığını en az 1 azaltır.

Sonucu bir uygulama teoremi verir: optimal çizelgeleyicinin süresi iki yasadan dolayı en az max{T₁/P, T∞} olduğuna göre, T₁/P + T∞ ≤ 2·max{T₁/P, T∞} eşitsizliğiyle **açgözlü çizelgeleyici optimalin en fazla iki katıdır**. Sayısal olarak: T₁ = 18, T∞ = 9 olan bir hesapta P = 2 için sınır 18 ve optimal alt sınır 9, oran tam 2; P = 8 için sınır 11,25 ve alt sınır 9, oran 1,25. Oran hep 2'nin altında kalıyor. Ayrıca T₁/T∞ ≫ P olduğunda T∞ terimi ihmal edilebilir ve hızlanma neredeyse doğrusal olur; T₁/(P·T∞) niceliğine **paralel gevşeklik (parallel slackness)** denir.

Buradan **Amdahl yasasıyla** ilginç bir karşılaştırma çıkar. Amdahl der ki: bir uygulamanın α kesri seri çalışmak zorundaysa hızlanma en fazla 1/α olabilir. Doğrudur ama çoğu zaman **fazla iyimserdir**. İşi 18, açıklığı 9 olan yukarıdaki hesapta seri kısım 3 birimse Amdahl 6 kat hızlanma vaat eder; oysa gerçek paralellik T₁/T∞ = 2'dir. İş–açıklık analizi bağımlılık yapısının tamamını görür, Amdahl yalnızca tek bir orana bakar.

Son olarak birkaç tanıdık algoritmanın iş, açıklık ve paralellik değerleri. Paralel birleştirmeli sıralamanın işi Θ(n lg n), açıklığı Θ(lg³ n), paralelliği Θ(n / lg² n)'dir — çok yüksek. Paralel hızlı sıralamanın işi Θ(n lg n), açıklığı ise **Θ(n)**'dir, çünkü ayırma adımı seridir; paralelliği yalnızca Θ(lg n) olur ve n = 10⁶ için bu **20** demektir. İki algoritma da aynı işi yapıyor, ama biri binlerce çekirdeği doyurabilirken diğeri yirmiden fazlasından yararlanamıyor. Yalnızca işe bakan bir analiz bu farkı **hiç göremez**.

> **Sesli anlat:** "Bir paralel algoritmanın maliyetini nasıl ölçersin? Neden tek bir sayı yetmez? Altmış saniye."
>
> İyi bir cevabın omurgası: "İki sayı kullanırım. İş, hesabın tek işlemcide alacağı toplam zamandır. Açıklık ya da derinlik, bağımlılık DAG'ındaki en uzun yolun süresi, yani sonsuz işlemciyle bile geçmesi gereken zamandır. İki yasa var: iş yasası, P işlemcili süre en az iş bölü P'dir; açıklık yasası, en az açıklıktır. Oranları olan iş bölü açıklık, elde edilebilecek en büyük hızlanmadır. Açgözlü bir çizelgeleyicinin süresi en fazla iş bölü P artı açıklıktır ve bu, optimalin en fazla iki katıdır; ispatı iki satırdır, tam adımlar iş bölü P'yi, eksik adımlar açıklığı geçemez. Tek sayı yetmez çünkü aynı işi yapan iki algoritmanın açıklıkları çok farklı olabilir: paralel birleştirmeli sıralamanın açıklığı logaritmiktir, paralel hızlı sıralamanınki doğrusaldır, dolayısıyla ikincisi bir milyon öğede yirmiden fazla işlemciden yararlanamaz."

## Mülakatta nasıl görünür

Bu üç konu, "daha hızlısını yapabilir misin?" sorusunun üç farklı cevabıdır: *hayır ve nedenini ispatlayabilirim*, *evet ama olasılıkla*, *evet ama işlemci ekleyerek ve şu tavana kadar*.

Beş tipik hata var. **Alt sınırı model belirtmeden söylemek** — "sıralama n log n'in altına inemez" cümlesi eksiktir; sayma sıralaması iner. **Yaprak sayısını yanlış saymak** — alt sınır makinesinin ilk adımı olası çıktı sayısıdır ve orada yapılan hata bütün ispatı bozar. **"Beklenen" ile "ortalama durum"u karıştırmak** — biri algoritmanın rastgeleliğinden, diğeri girdi dağılımı varsayımından gelir. **Monte Carlo ile Las Vegas'ı ayırt edememek** — biri süreyi, diğeri doğruluğu garantiler. **Paralellikte yalnızca işe bakmak** — açıklık hızlanmanın tavanıdır ve iki algoritmayı ayıran genellikle odur.

Bir de imkânsız iddia var: **süper-doğrusal hızlanma.** P işlemciyle P katından fazla hızlanma, bu modelde iş yasasıyla çelişir; gerçek makinelerde ölçülürse nedeni paralellik değil, önbellek etkileridir.

İngilizce karşılıklar hazır olmalıdır: *lower bound*, *decision tree*, *comparison model*, *randomized algorithm*, *Monte Carlo*, *Las Vegas*, *expected time*, *work*, *span* (ya da *depth*), *parallelism*, *greedy scheduler*, *linear speedup*, *Amdahl's law*.

### Sırada ne var

Bu makaledeki alt sınır **bir modelin içinde** kuruldu: karşılaştırma modelinde n log n'in altına inilemez, ama modeli değiştirirsen inilir. Sıradaki makale sınırı modelden alıp **problemin kendisine** taşıyor.

Bazı problemler için hiçbir modelde hızlı bir algoritma bilinmiyor ve bu, tek tek problemlerin değil, koca bir sınıfın ortak kaderi gibi görünüyor. Dinamik programlama makalesinde açtığımız sözde polinom tartışması — altküme toplamının O(nT) çözümünün girdi boyutunda polinom olmaması — doğrudan oraya çıkıyor. **P ve NP** tanımlarını niceleyici diliyle kuracağız, indirgeme fikrini graf algoritmaları makalesinin maliyet muhasebesiyle savunacağız ve kümeler makalesinde bıraktığımız sayılabilirlik pini durma problemi olarak geri dönecek: yalnızca yavaş değil, **hiç çözülemeyen** problemler de var.

## Kaynakça

- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 5: Linear Sorting — **karşılaştırmalı sıralamanın alt sınırının üç satırlık ispatı**: karşılaştırma modeli karar ağacının ikili (sabit dallanma çarpanlı) olmasını gerektirir; yaprak sayısı olası çıktı sayısından az olamaz; ağaç yüksekliği Ω(log L) ile alttan sınırlıdır, dolayısıyla en kötü durum süresi de öyledir; sıralamada çıktı sayısı n! olduğundan yükseklik log(n!) ≥ log((n/2)^(n/2)) = Ω(n log n) ve "merge sort is optimal in comparison model"; **karşılaştırmalı aramanın alt sınırı** (n düğümlü her karar ağacının yüksekliği ≥ ⌈lg(n+1)⌉ − 1); doğrudan erişim dizisinin "doğrusal dallanma çarpanlı bir işlem" olarak modeli kırması; sayma ve radix sıralamalarının Θ(n + u) ve O(n + n·log_n u) maliyetleri. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Demaine, E., Devadas, S. & Lynch, N. *6.046J Design and Analysis of Algorithms*, Lecture 6: Randomization — rastgeleleştirilmiş algoritma tanımı ("r ∈ {1, …, R} rastgele sayısı üretip kararlarını ona göre veren algoritma"; aynı girdide farklı çalıştırmalar farklı adım sayısı ve farklı çıktı verebilir); **Monte Carlo ile Las Vegas karşılaştırma tablosu** (polinom zaman / beklenen polinom zaman; yüksek olasılıkla doğru / her zaman doğru); **Freivalds'ın matris çarpımı denetleyicisi**: rastgele ikili r için A(Br) = Cr denetimi, üç matris-vektör çarpımıyla O(n²) süre, AB = C ise "evet" olasılığı 1, AB ≠ C ise "evet" olasılığı ≤ 1/2 ve ispatın r ↦ r + v birebir eşlemesi; hızlı sıralamanın üç sürümü (temel, medyan tabanlı, rastgele) ve sıralı girdide temel sürümün T(n) = T(0) + T(n−1) + Θ(n) = Θ(n²) olması; **"paranoyak" hızlı sıralama**: iyi eksen tanımı (|L| ve |G| ≤ 3n/4), iyi eksen olasılığının 1/2'den büyük olması, beklenen deneme sayısının ≤ 2 olması, T(n) ≤ T(n/4) + T(3n/4) + 2cn bağıntısı, ağaç yüksekliğinin log_{4/3}(2cn) ile sınırlı ve seviye başına işin 2cn olması, sonuç Θ(n log n) beklenen süre. MIT OpenCourseWare, Bahar 2015. [Bağlantı](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/pages/lecture-notes/)
- Shun, J. & Leiserson, C. E. *6.172 Performance Engineering of Software Systems*, Lecture 7: Races and Parallelism — paralel komut akışının bir DAG olarak modellenmesi ve düğümlerin "spawn, sync ya da return içermeyen komut dizisi" olarak tanımlanması; **T_P = P işlemcideki süre**, **T₁ = iş**, **T∞ = açıklık** (kritik yol uzunluğu ya da hesaplama derinliği) tanımları; **İŞ YASASI T_P ≥ T₁/P** ve **AÇIKLIK YASASI T_P ≥ T∞**; ardışık bileşimde işin ve açıklığın toplanması, paralel bileşimde işin toplanıp açıklığın maksimum alınması; **paralellik = T₁/T∞** ve bunun elde edilebilecek en büyük hızlanma olması; **Amdahl yasası** ve aynı örnekte Amdahl'ın 6 kat sınırı verirken gerçek paralelliğin 2 olması; alt-doğrusal, doğrusal ve süper-doğrusal hızlanma tanımları ve süper-doğrusalın iş yasası nedeniyle bu modelde imkânsız olması; **açgözlü çizelgeleyici teoremi T_P ≤ T₁/P + T∞** ile tam/eksik adım ispatı, optimalin en fazla iki katı olduğu sonucu ve T₁/T∞ ≫ P olduğunda neredeyse mükemmel doğrusal hızlanma; **paralel gevşeklik T₁/(P·T∞)** tanımı; iş/açıklık/paralellik tablosu (birleştirmeli sıralama Θ(n lg n) / Θ(lg³n) / Θ(n/lg²n); matris çarpımı; Strassen; FFT; BFS) ve paralel hızlı sıralamanın beklenen işi Θ(n lg n), açıklığı Θ(n), paralelliği Θ(lg n). MIT OpenCourseWare, Güz 2018. [Bağlantı](https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/pages/lecture-slides/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 5. bölüm (Probabilistic Analysis and Randomized Algorithms), 7. bölüm (Quicksort) ve 8. bölüm (Sorting in Linear Time) — olasılıksal analiz ile rastgeleleştirilmiş algoritmaların ayrımı, rastgeleleştirilmiş hızlı sıralamanın beklenen çalışma süresi, karar ağacı modeli ve karşılaştırmalı sıralamanın alt sınırı, sayma ve radix sıralamaları. Bölüm adları ve numaraları, MIT Press'in yayımladığı resmî *Selected Solutions* belgesinin içindekiler tablosundan doğrulandı. MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE300 — Analysis of Algorithms* — bu makalenin resmî dayanağı iki ayrı bölümdedir. *Catalog Description* (birebir): "Analysis of computer science algorithms: Sorting, searching, paging and parallelism. Analysis of mathematical algorithms: games and puzzles, network algorithms, and probabilistic algorithms." *Course Learning Outcomes* (birebir, ilgili kısımlar): dersin amacı "the theory of parallel algorithms" ile "known sequential and parallel algorithmic solutions to frequently encountered problems" olarak tanımlanır; ayrıca "lower bound theory will be covered", "Parallel architectures and parallel algorithms will be studied in detail" ve "The last part of the course will be the study of the topic of probabilistic algorithms". Sayfa bu run'da (2026-09-01) yeniden çekildi ve iki bölümün metni de değişmemişti. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe300/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE250 — Data Structures and Algorithms*, katalog tanımı (birebir): "Graphs. Advanced Sorting. Hashing. Heap Structures. Search Structures. Complexity. Parallel algorithms. File organization." — paralel algoritmalar başlığı Scientific Preparation üçlüsünün bu dersinde de geçer. Sayfa bu run'da (2026-09-01) yeniden doğrulandı. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe250/)
