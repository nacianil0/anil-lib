---
article_id: article_bf7d6b36-de5b-4525-8028-4b3a1253cee7
title: "Karmaşıklık: Big-O ile Düşünmeye Başlamak"
slug: karmasiklik-big-o-ile-dusunmeye-baslamak
category: data-structures
level: intermediate
reading_order: 9
summary: "Faz B'yi açan maliyet dili: RAM modeli ve neden makineden bağımsız ölçüye ihtiyaç duyulduğu, adım sayma pratiği, büyüme sınıflarının somut sayılarla karşılaştırılması, Big-O gösteriminin sezgisel anlamı ve sınırları, en kötü ile ortalama durum ayrımı ve sık yapılan karmaşıklık hataları."
tags:
  - karmasiklik
  - big-o
  - ram-modeli
  - buyume-siniflari
  - en-kotu-durum
content_hash: sha256:0fa1ec5f4e726c4dd604069eab89e6f65fb12a78956b601f675ec5775b383cfe
classification_version: 1
classification_batch: 2
---
## "Kaç saniye sürüyor" neden yanlış soru

Faz A boyunca sorduğumuz soru hep aynıydı: bu iddia doğru mu, ispatı ne? Bu makaleyle soru değişiyor: bu **ne kadara mal oluyor?**

Bir algoritmanın maliyetini ölçmenin en akla yatkın yolu çalıştırıp süre tutmaktır, ama ölçtüğün şey algoritma olmaz. Süre; işlemcine, derleyicine, o an açık olan diğer programlara, önbelleğin durumuna ve dilin çalışma zamanına bağlıdır. Aynı algoritma başka bir makinede on kat hızlı, başka bir dilde üç kat yavaş çıkar. Bir mülakatta "bu çözüm daha hızlı" demenin karşılığı olmalıdır ve o karşılık kronometre olamaz.

Doğru soru şudur: **girdi büyüdükçe iş miktarı nasıl büyüyor?** Bu soru donanımdan bağımsızdır, çünkü sabit çarpanları bilerek dışarıda bırakır. İki algoritmadan biri girdi iki katına çıktığında iki kat, diğeri dört kat yavaşlıyorsa, hangi makinede çalıştırdığın yeterince büyük girdide önemini yitirir.

Bu makale o dili kuruyor. Burada kurulan sezgi, ileride asimptotik analiz makalesinde formal tanımlara ve ispatlara dönüşecek; şimdilik amacımız doğru soruyu sormak ve cevabı savunabilmektir.

## RAM modeli: neyi sayıyoruz

Adım saymak için önce neyin bir adım olduğunu belirlemek gerekir. Standart varsayım kümesine **RAM modeli (Random Access Machine)** denir. Şekil 1 modelin ne saydığını ve neyi bilerek dışarıda bıraktığını gösteriyor.

![Solda tek çekirdekli bir işlemci kutusu ve sabit maliyetli temel işlemlerin listesi; sağda eşit maliyetle erişilen bellek hücreleri dizisi ve ikisini birleştiren oku-yaz oku. Altta iki kutu: modelin saydığı şeyler ile modelin bilerek görmezden geldiği şeyler](assets/ram-modeli.svg "Şekil 1 — RAM modeli: neyi sayar, neyi görmezden gelir")

Modelin varsayımları üçtür. Komutlar birer birer, paralellik olmadan çalışır. Toplama, karşılaştırma, atama, aritmetik ve bir dizi elemanına erişim gibi temel işlemler sabit maliyetlidir. Bellekteki her hücreye erişim aynı maliyettedir; ilk hücre ile milyonuncu hücre arasında fark yoktur.

Bu varsayımların hiçbiri gerçek donanımda tam olarak doğru değildir ve bunu bilerek kullanıyoruz. Gerçek makinede önbellekte olan bir veri, ana bellekte olandan onlarca kat hızlı gelir; diskten gelen veri ise binlerce kat yavaştır. Model bunları görmezden gelir, çünkü amacı gerçekliği taklit etmek değil, **algoritmalar arasında adil ve taşınabilir bir karşılaştırma** kurmaktır. Bellek hiyerarşisinin gerçekten önem kazandığı yerleri — dosya sistemleri ve disk tabanlı arama yapıları — ilerideki makalelerde ayrıca konuşacağız; orada model bilinçli olarak değiştirilecek.

Mülakatta bu farkındalığı göstermek değerlidir. "Big-O'su aynı ama biri pratikte daha hızlı" cümlesi, tam olarak modelin dışarıda bıraktığı şeylere işaret eder ve bunu adıyla söyleyebilmek cevabı bir seviye yukarı taşır.

## Adım saymak

Şimdi model üzerinde sayalım. Girdi boyutuna n diyoruz; ne olduğunu her zaman açıkça söylemek gerekir, çünkü aynı problemde farklı seçimler farklı cevaplar verir.

**Tek döngü.** n elemanlı bir dizide en büyük elemanı bulmak için diziyi bir kez gezersin. Döngü n − 1 karşılaştırma yapar, her adımda sabit sayıda işlem vardır. Toplam maliyet n ile doğru orantılıdır: **doğrusal (linear)**.

**İç içe iki döngü.** Bir dizideki bütün eleman ikililerini karşılaştırmak istersen, sayma makalesinden hazır bir sonuç geliyor: n elemanlı bir kümenin ikili alt küme sayısı C(n, 2) = n(n − 1) / 2'dir. Bin elemanlı bir dizide bu 499.500 karşılaştırma eder. Kabaca n²/2 olduğu için maliyet **karesel (quadratic)** büyür; girdi iki katına çıkınca iş dört katına çıkar.

**Yarıya bölen döngü.** Sıralı bir dizide ikili arama her adımda arama alanını yarıya indirir. n elemanlı alanı 1'e indirmek için gereken bölme sayısı log₂n mertebesindedir. Bir milyon elemanlı sıralı dizide en fazla 20 karşılaştırma yeter, çünkü 2²⁰ = 1.048.576 zaten bir milyonu aşar. Maliyet **logaritmik** büyür.

Logaritmanın tabanının Big-O ifadelerinde neden yazılmadığı da buradan görülür: taban değiştirmek yalnızca sabit bir çarpan ekler, çünkü log₂n ile log₁₀n arasındaki oran sabittir. Sabit çarpanlar düştüğü için "logaritmik" demek tabandan bağımsız bir ifadedir. Yine de sözlü anlatımda ikili aramanın tabanının 2 olduğunu söylemek cevaba somutluk katar.

Buradaki temel alışkanlık, kodun satır sayısına değil **döngülerin yapısına** bakmaktır: kaç kez dönüyor, her dönüşte kaç iş var, döngü değişkeni nasıl ilerliyor. Birer birer artan bir döngü doğrusal, her adımda ikiye bölen bir döngü logaritmik, iç içe iki doğrusal döngü kareseldir.

**Problem.** Dış döngü i'yi 1'den n'e kadar gezerken iç döngü j'yi i + 1'den n'e kadar geziyor. İçerideki tek satır kaç kez çalışır?

**Strateji.** İç döngünün her dış adımda kaç kez döndüğünü yaz, topla ve toplamı sayma makalesindeki bir sonuca bağla.

**Adımlar.** i = 1 iken iç döngü n − 1 kez, i = 2 iken n − 2 kez döner ve bu böyle azalarak sürer; i = n − 1 iken 1 kez, i = n iken hiç dönmez. Toplam (n − 1) + (n − 2) + ⋯ + 1 = n(n − 1) / 2'dir.

**Savunma.** Aynı sayıyı ikinci bir yoldan üretelim: iç satır tam olarak i < j koşulunu sağlayan (i, j) ikilileri için çalışır, yani n elemanlı bir kümenin ikili alt kümeleri kadar çalışır ve bu C(n, 2) = n(n − 1) / 2'dir. İki sayının eşit çıkması, sayma makalesindeki "aynı şeyi iki yoldan say" doğrulamasının aynısıdır. Sonuç kareseldir, ama dikkat: bu döngü n² değil, kabaca n²/2 kez döner. Big-O sabiti attığı için ikisi aynı sınıfa düşer; gerçek zamanlamada ise iki kat fark eder ve bu farkı görmezden gelmek modelin bilinçli seçimidir, bir gözden kaçırma değildir.

## Büyüme sınıfları

Farklı büyüme sınıflarının arasındaki mesafeyi görmenin en hızlı yolu sayılara bakmaktır.

| Büyüme | n = 10 | n = 100 | n = 1000 | Tipik örnek |
|---|---|---|---|---|
| log₂n | ~3,3 | ~6,6 | ~10 | ikili arama |
| n | 10 | 100 | 1.000 | dizide tek geçiş |
| n log₂n | ~33 | ~664 | ~9.966 | verimli sıralama |
| n² | 100 | 10.000 | 1.000.000 | bütün ikililer |
| 2ⁿ | 1.024 | ~1,26 × 10³⁰ | ~1,07 × 10³⁰¹ | bütün alt kümeler |
| n! | 3.628.800 | ~9,33 × 10¹⁵⁷ | ~4,02 × 10²⁵⁶⁷ | bütün sıralamalar |

Şekil 2 aynı sınıfları eğri olarak yan yana koyuyor; üstel ve karesel eğrilerin tuvali ne kadar erken terk ettiğine dikkat et.

![Beş büyüme eğrisinin aynı eksende karşılaştırması: logaritmik eğri neredeyse yatay kalır, doğrusal eğri düzgün yükselir, n log n daha dik yükselip tuvali terk eder, karesel ve üstel eğriler çok daha erken tepeye ulaşır. Her eğri kendi ucunda etiketlenmiş](assets/buyume-siniflari.svg "Şekil 2 — Büyüme sınıflarının aynı eksende karşılaştırması")

Son üç satırın ne demek olduğunu somutlaştıralım. Saniyede bir milyar temel işlem yapan bir makine düşün. 2¹⁰⁰ işlemi bitirmesi yaklaşık 4 × 10¹³ yıl sürer; evrenin yaşı yaklaşık 1,4 × 10¹⁰ yıl olduğuna göre bu, evrenin yaşının kabaca üç bin katıdır. Donanımı bin kat hızlandırmak bu tabloyu kurtarmaz; üstel büyümede sabit çarpanlar anlamsızdır. "Daha hızlı bilgisayar alalım" cevabının neden çalışmadığının teknik gerekçesi budur.

Aynı makinede karesel ile n log n arasındaki fark da somuttur. Bir milyon elemanlı bir girdide karesel bir algoritma 10¹² işlem yapar, yani yaklaşık on yedi dakika; n log n bir algoritma ise yaklaşık 2 × 10⁷ işlem yapar, yani saniyenin yüzde ikisi. İkisi de "çalışır", ama biri kullanılabilir üründür, diğeri değildir.

> **Sesli anlat:** "Karmaşıklığı neden saniye yerine büyüme sınıfıyla ölçtüğümüzü ve n² ile n log n arasındaki farkın pratikte ne demek olduğunu doksan saniyede anlat."
>
> İyi bir cevabın omurgası: "Saniye; işlemciye, dile, derleyiciye ve o anki yüke bağlıdır, dolayısıyla algoritmayı değil ortamı ölçer. Bunun yerine girdi boyutu büyüdükçe adım sayısının nasıl büyüdüğünü ölçerim; bu ölçü makineden bağımsızdır çünkü sabit çarpanları bilerek dışarıda bırakır. Fark somuttur: bir milyon elemanlı girdide karesel bir algoritma saniyede bir milyar işlem yapan bir makinede yaklaşık on yedi dakika sürer, n log n olan ise saniyenin yüzde ikisi kadar sürer. Üstelde ise donanım hiç kurtarmaz: iki üzeri yüz işlem, evrenin yaşından binlerce kat uzun sürer."

## Big-O gösteriminin sezgisi

Bu büyüme sınıflarını yazmanın standart yolu **Big-O gösterimidir**. Sezgisel okuması şudur: f(n) = O(g(n)), "yeterince büyük n'den sonra f, g'nin sabit bir katını aşmaz" demektir. Yani Big-O bir **üst sınırdır** ve iki şeyi bilerek atar: sabit çarpanları ve küçük girdilerdeki istisnaları.

Pratik sonuçları üç maddeye iner. Sabit çarpanlar düşer: 100n² de n²/2 de O(n²)'dir. Düşük dereceli terimler düşer: n² + 100n + 10 yine O(n²)'dir, çünkü n büyüdükçe n² diğer terimleri ezer. Ve Big-O yalnızca üst sınır verir: n = O(n²) doğrudur, ama bu n'in karesel olduğu anlamına gelmez, yalnızca kareselden daha kötü olmadığını söyler.

Bu son nokta mülakatta en sık yakalanan yerdir. "Bu algoritma O(n²)" cümlesi teknik olarak doğru ama bilgi bakımından zayıf olabilir; söylenmek istenen genellikle "tam olarak karesel mertebede", yani hem üst hem alt sınır olarak karesel olduğudur. Bunun ayrı bir gösterimi vardır ve üst sınır, alt sınır ile sıkı sınır ayrımının formal tanımları asimptotik analiz makalesinde kurulacak. Şimdilik bilmen gereken, cümlenin hangi sınırı iddia ettiğine dikkat etmektir.

Bir uyarı daha: Big-O bir çalışma süresi değildir, bir **büyüme sınıfıdır**. "O(n) saniye sürer" cümlesi anlamsızdır. Doğru cümle "adım sayısı n ile doğru orantılı büyür" biçimindedir.

## En kötü, en iyi, ortalama durum

Aynı algoritma aynı boyuttaki farklı girdilerde farklı sayıda adım atabilir. Bu yüzden karmaşıklık her zaman bir **durum** belirtilerek söylenir.

Sırasız bir dizide doğrusal arama yapalım. **En iyi durumda** aranan eleman ilk sıradadır ve tek karşılaştırma yeter: sabit maliyet. **En kötü durumda** eleman sondadır ya da hiç yoktur ve n karşılaştırma gerekir. **Ortalama durumda**, elemanın dizide bulunduğunu ve her konumun eşit olasılıkla mümkün olduğunu varsayarsak beklenen karşılaştırma sayısı (n + 1) / 2 olur; bu da n ile doğru orantılıdır.

Varsayılan olarak **en kötü durum** kullanılır ve gerekçesi mühendisliktir: en kötü durum bir **garantidir**. Bir sistemin gecikme bütçesi varsa, ortalamanın iyi olması yetmez; kötü günde ne olacağını bilmen gerekir. Ayrıca en kötü durum çoğu zaman hesaplanması en kolay olandır, çünkü girdi dağılımı hakkında varsayım gerektirmez.

Ortalama durumun gizli maliyeti tam da budur: bir **olasılık dağılımı varsaymak** zorundasın. "Ortalamada hızlıdır" diyen bir cevabın ilk takip sorusu "hangi dağılıma göre?" olur. Bu aracı destekleyici temeller fazındaki olasılık makalesinde kuracağız; o zamana kadar ortalama durum iddialarını hangi varsayıma dayandığını söyleyerek kurman yeterlidir.

Üçüncü bir kavram daha vardır ve ortalamayla karıştırılır: bazı yapılarda tek bir işlem ara sıra pahalı olur ama uzun bir işlem dizisinin toplam maliyeti işlem başına ucuz kalır. Bunun analizi olasılık değil, muhasebe işidir ve dinamik dizilerin büyütülmesini konuştuğumuz makalede açılacak.

## Sık yapılan hatalar

**Girdi boyutunu tanımlamamak.** "n nedir?" sorusunun cevabı her zaman söylenmelidir. Bir grafta n düğüm sayısı mı, kenar sayısı mı? Bir sayı üzerinde çalışan algoritmada n sayının kendisi mi, yoksa basamak sayısı mı? İkisi çok farklı sonuç verir ve bu ayrım, hesaplamanın sınırlarını konuştuğumuz makalede kritik hâle gelecek.

**Sabit çarpanları tamamen unutmak.** Big-O sabitleri atar ama gerçek dünya atmaz. Küçük n'de daha kötü büyüme sınıfına sahip bir algoritma daha hızlı olabilir; gerçek sıralama kütüphanelerinin küçük parçalarda basit yöntemlere geçmesi bu yüzdendir. "Asimptotik olarak daha iyi" ile "bu girdide daha hızlı" farklı cümlelerdir.

**Döngü sayısını sınıf sanmak.** İç içe iki döngü her zaman karesel değildir: iç döngü dış değişkene bağlı olarak yarıya bölünüyorsa sonuç n log n olabilir. Sayarken döngünün kaç kez döndüğüne bakılır, kaç tane döngü olduğuna değil.

**Bellek maliyetini atlamak.** Karmaşıklık yalnızca zaman değildir. Bir çözümün zaman karmaşıklığını söyleyip **yer karmaşıklığını (space complexity)** söylememek, mülakatta en sık gelen takip sorusunu davet eder: "Peki ne kadar ek bellek kullanıyor?" Yer karmaşıklığında en çok unutulan kalem, özyinelemeli çağrıların yığında tuttuğu yerdir: her açık çağrı bir çerçeve tutar, dolayısıyla özyineleme derinliği doğrudan bellek maliyetidir. Aynı işi yapan döngülü bir çözüm sabit ek bellekle çalışırken özyinelemeli hâli derinlikle orantılı bellek isteyebilir. Zaman ile bellek arasındaki bu değiş tokuş, fazın tamamında tekrar eden temadır.

> **Sesli anlat:** "Doğrusal aramanın en iyi, en kötü ve ortalama durumunu söyle ve neden varsayılan olarak en kötü durumu kullandığımızı altmış saniyede açıkla."
>
> İyi bir cevabın omurgası: "En iyi durumda aranan eleman ilk sıradadır, tek karşılaştırma yeter. En kötü durumda eleman sonda ya da yoktur, n karşılaştırma gerekir. Eleman var ve her konum eşit olasılıklıysa ortalama beklenen karşılaştırma sayısı n artı birin yarısıdır, yani yine doğrusaldır. Varsayılan olarak en kötü durumu kullanırım çünkü o bir garantidir ve girdi dağılımı hakkında varsayım gerektirmez; ortalama durum ise ancak dağılımı adlandırabildiğimde savunulabilir bir iddiadır."

## Mülakatta nasıl görünür

Karmaşıklık sorusu neredeyse hiç tek başına sorulmaz; bir çözüm anlattıktan sonra gelir ve cevabın kalitesini ölçer. Standart takip zinciri şudur: "Bu çözümün karmaşıklığı nedir?" → "Neden, nereden geliyor?" → "Daha iyisi mümkün mü, neden?"

İyi bir cevabın yapısı sabittir. Önce girdi boyutunu tanımla. Sonra maliyeti nereden saydığını söyle — hangi döngü, kaç kez. Sonra sınıfı ver ve hangi durumu (en kötü mü, ortalama mı) kastettiğini belirt. En sonda bellek maliyetini ekle. Dört adımı bu sırayla söylemek, aynı cevabı ezberden söylemekten çok daha güçlü durur.

Yukarıdaki iç içe döngü problemi için bu kalıbın nasıl konuştuğunu görelim: "n dizinin eleman sayısı. Dış döngü n kez dönüyor, iç döngü ortalama olarak yaklaşık n/2 kez; toplam iç işlem sayısı n(n − 1)/2, yani karesel mertebede. Bu en kötü durum değil, her durum: döngü girdiye bakmadan aynı sayıda dönüyor. Ek bellek sabit, çünkü yalnızca birkaç sayaç tutuyorum." Dört cümle, dört adım. Mülakatçının ardından soracağı şey büyük ihtimalle "daha iyisi mümkün mü?" olacaktır ve o soruya cevap verebilmek için önce bu dört cümlenin akıcı gelmesi gerekir.

İngilizce karşılıklar hazır olmalıdır: *time complexity*, *space complexity*, *worst case*, *average case*, *best case*, *input size*, *asymptotic growth*, *upper bound*, *constant factor*.

### Sırada ne var

Artık maliyeti konuşacak dilimiz var; sıradaki makaleler o dili gerçek yapıların üzerinde kullanacak. Önce en temel dört yapıyla başlıyoruz: diziler, bağlı listeler, yığın ve kuyruk. Her biri için aynı tabloyu kuracağız — erişim, arama, ekleme, silme maliyetleri — ve asıl soruyu soracağız: bu yapı neyi ucuzlatmak için neyi pahalılaştırıyor? Bu makalede kurduğun adım sayma alışkanlığı, o tablonun her hücresinin gerekçesi olacak.

## Kaynakça

- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 2. bölüm (Getting Started; 2.2 algoritma analizi ve RAM modeli) ve 3. bölüm (Characterizing Running Times; 3.1 O, Ω ve Θ gösterimleri, 3.2 asimptotik gösterimin formal tanımları). MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (ders notları), 13.7 (Asymptotic Notation): Tanım 13.7.9 Big-O, Tanım 13.7.13 Theta. MIT OpenCourseWare 6.042J. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Rosen, K. H. *Discrete Mathematics and Its Applications*, 3. bölüm (Algorithms; algoritma kavramı, fonksiyonların büyümesi ve algoritmaların karmaşıklığı). McGraw Hill. [Bağlantı](https://www.mheducation.com/highered/product/Discrete-Mathematics-and-Its-Applications-Rosen.html)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE250 — Data Structures and Algorithms* (katalog tanımı "Complexity" başlığını içerir; M.Sc. programı sayfasında Scientific Preparation dersi olarak *CmpE250: Data Structures* adıyla geçer). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe250/)
