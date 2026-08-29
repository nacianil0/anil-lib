---
article_id: article_8b402a30-5d8c-43c1-8b85-c61950e09a28
title: "Ağaçlar ve İkili Arama Ağaçları"
slug: agaclar-ve-ikili-arama-agaclari
category: data-structures
level: intermediate
reading_order: 11
summary: "Köklü ikili ağacın dili (derinlik, yükseklik, sıralı dolaşma), ikili arama ağacının değişmezinin formal tanımı ve yerel denetimin neden yetmediği, arama ile eklemenin ve üç durumlu silmenin yükseklikle ilişkisi, yüksekliğin alt ve üst sınırlarının ispatı ve dengesizliğin somut bedeli."
tags:
  - ikili-agac
  - ikili-arama-agaci
  - degismez
  - yukseklik
  - siral-dolasma
content_hash: sha256:d127461f5a4eeddc209976baf840bd79e4c40f0f7f509f5ff3adb465132dc2a5
classification_version: 1
classification_batch: 3
---
## Bir hücre doğrusal kalmıştı

Önceki makale dört yapının fiyat listesini çıkardı ve bir hücre inatla doğrusal kaldı: sırasız arama. Sıralı bir dizide ikili aramayla logaritmaya inebiliyoruz, ama o dizide bir eleman eklemek arkadaki her şeyi kaydırmayı gerektirdiği için doğrusal. Bağlı listede ekleme ucuz, ama ortasına ikili arama yapamıyoruz çünkü ortayı bulmak için baştan yürümek gerekiyor.

İkili arama ağacının fikri şudur: sıralı dizinin **her adımda arama alanını yarıya bölme** yeteneğini, bağlı listenin **işaretçi değiştirerek yapı değiştirme** esnekliğiyle aynı yapıda birleştirmek. Bunu bir **değişmez (invariant)** kurarak yapar. Bu makale o değişmezi tanımlıyor, işlemleri onun üstünde yürütüyor ve sonunda değişmezin tek başına yetmediğini gösteriyor.

## İkili ağacın dili

Graflar ve ağaçlar makalesinde ağacı bağlı ve döngüsüz bir graf diye tanımlamış, n düğümlü bir ağacın tam olarak n − 1 kenarı olduğunu tümevarımla ispatlamıştık. Veri yapısı olarak kullanabilmek için o tanıma tek bir şey eklenir: düğümlerden biri **kök (root)** seçilir. Kök seçmek kenarlara yön verir; her düğümün kök tarafındaki komşusu **ebeveyni (parent)**, diğer komşuları **çocuklarıdır (children)**. Çocuğu olmayan düğüm yapraktır.

**İkili ağaçta (binary tree)** her düğümün en fazla iki çocuğu olur ve bu iki çocuk birbirinden ayırt edilir: **sol çocuk** ve **sağ çocuk**. Ayrım önemlidir; tek çocuğu olan bir düğümde o çocuğun solda mı sağda mı durduğu yapının anlamını değiştirir. Bir düğüm dört alan taşır: öğe, ebeveyn, sol ve sağ.

İki ölçü tanımlıyoruz. Bir düğümün **derinliği (depth)**, o düğümden köke giden yolun uzunluğudur; kökün derinliği sıfırdır. Bir düğümün **yüksekliği (height)**, o düğümü kök kabul eden alt ağaçtaki en büyük derinliktir; yaprakların yüksekliği sıfırdır. Ağacın yüksekliği, kökün yüksekliğidir ve h ile gösterilir.

Bu iki ölçü hedefimizi tek cümlede yazmamızı sağlar: **işlemleri h ile orantılı zamanda yapmak ve h'yi log n mertebesinde tutmak.** Bu makale birinci yarıyı kuruyor; ikinci yarı bir sonraki makalenin konusu.

Son bir kavram: ikili ağacın kendiliğinden bir **sıralı dolaşması (in-order traversal)** vardır. Bir düğümde önce sol alt ağacı dolaş, sonra düğümün kendisini yaz, sonra sağ alt ağacı dolaş. Her düğüm için sabit iş yapıldığından dolaşma n düğümde toplam doğrusal zaman alır. Şimdilik bu sıra ile saklanan anahtarlar arasında bir ilişki yok; değişmez tam olarak o ilişkiyi kuracak.

## Değişmez ve neden yerel denetim yetmez

**İkili arama ağacı (binary search tree)**, üzerine tek bir koşul eklenmiş bir ikili ağaçtır. Sezgisel hâli: her düğümün solunda ondan küçük, sağında ondan büyük anahtarlar durur.

Formal hâli daha dikkatlidir ve fark tam olarak burada saklıdır. Her x düğümü için: x'in **sol alt ağacındaki her** düğümün anahtarı x'in anahtarından küçüktür ve x'in **sağ alt ağacındaki her** düğümün anahtarı x'in anahtarından büyüktür. Koşul, çocuklar hakkında değil, bütün alt ağaç hakkındadır. Bu makalede anahtarların farklı olduğunu varsayıyoruz; eşit anahtarlara izin veren gerçekleştirmeler koşulu tek tarafta "küçük veya eşit" yaparak kurar.

Değişmezin karşılığı şu teoremdir: bir ikili ağaç ikili arama ağacıysa, sıralı dolaşması anahtarları artan sırada verir. İspat, tümevarım makalesinde kurduğumuz **yapısal tümevarımın** doğrudan bir uygulamasıdır. Taban durum boş ağaçtır; boş çıktı sıralıdır. Tümevarım adımında, kökü x olan bir ağaçta sol ve sağ alt ağaçların çıktısının sıralı olduğunu varsayarız. Dolaşma bu ikisini x'in etrafında birleştirir; değişmez soldaki her anahtarın x'ten küçük, sağdaki her anahtarın x'ten büyük olduğunu söylediği için birleştirilmiş dizi de sıralıdır.

Şimdi sınır örneği. Aşağıdaki ağaç yerel denetimi geçer ama ikili arama ağacı değildir: kök 10, sol çocuğu 5, sağ çocuğu 15 ve 15'in sol çocuğu 8. Her düğüm kendi çocuklarına bakıldığında kuralı sağlıyor gibidir; 5 küçüktür, 15 büyüktür, 8 de 15'ten küçüktür. Oysa 8, kökün **sağ** alt ağacındadır ve 8 sayısı 10'dan küçüktür, yani değişmez ihlal edilmiştir. Sıralı dolaşma bunu hemen ele verir: çıktı 5, 10, 8, 15 olur ve sıralı değildir.

Buradan doğru denetim yöntemi de çıkar. Kökten aşağı inerken her düğüme bir **aralık** taşırsın: kök için aralık sınırsızdır, sola inerken üst sınır düğümün anahtarı olur, sağa inerken alt sınır düğümün anahtarı olur. Her düğümün anahtarı kendi aralığının içinde kalmalıdır. Bu denetim n düğümde doğrusal zaman alır. İkinci ve eşit derecede geçerli yöntem, sıralı dolaşmayı yapıp çıktının kesin artan olduğunu kontrol etmektir.

Şekil 1 iki ağacı yan yana koyuyor: solda değişmezi sağlayan bir ağaç ve dallara inerken daralan aralıklar, sağda yerel karşılaştırmayı geçen ama aralığı ihlal eden ağaç.

![Solda geçerli bir ikili arama ağacı: kök 10, alt ağaçlara inen dallarda geçerli aralıklar eksi sonsuz ile 10 ve 10 ile artı sonsuz olarak etiketlenmiş, her düğümün anahtarı kendi aralığının içinde. Sağda yerel denetimi geçen ama geçersiz olan ağaç: kök 10, sağ çocuk 15 ve 15'in sol çocuğu 8 vurgulanmış, sekizin bulunması gereken aralık 10 ile 15 olarak gösterilmiş ve altında sıralı dolaşma çıktısı beş, on, sekiz, on beş yazıyor](assets/bst-degismezi.svg "Şekil 1 — İkili arama ağacı değişmezi ve yerel denetimin yakalayamadığı ihlal")

> **Sesli anlat:** "İkili arama ağacının değişmezini formal olarak söyle ve elindeki bir ikili ağacın gerçekten ikili arama ağacı olup olmadığını nasıl kontrol edeceğini altmış saniyede anlat."
>
> İyi bir cevabın omurgası: "Her düğüm için, sol alt ağacındaki bütün anahtarlar o düğümün anahtarından küçük, sağ alt ağacındaki bütün anahtarlar büyük olmalı. Koşul çocuklar hakkında değil bütün alt ağaç hakkında; yalnızca çocukları karşılaştırmak yanlış cevap verir. Örneğin kökü on, sağ çocuğu on beş, on beşin sol çocuğu sekiz olan ağaçta her düğüm çocuklarına göre doğrudur ama sekiz kökün sağındadır ve ondan küçüktür. Kontrolü iki şekilde yaparım: ya kökten aşağı inerken her düğüme geçerli bir alt ve üst sınır taşırım ve her anahtarın kendi aralığında olduğunu doğrularım, ya da sıralı dolaşmayı yapıp çıktının kesin artan olduğunu kontrol ederim. İkisi de doğrusal zamanlıdır."

## Arama, ekleme ve silme

**Arama** değişmezin doğrudan sonucudur. Kökten başla; aranan anahtar düğümünkine eşitse buldun, küçükse sola, büyükse sağa in. Her adımda bir düğüm iniyorsun, dolayısıyla en fazla h + 1 karşılaştırma yaparsın: maliyet h ile orantılıdır. Aynı yürüyüşle **en küçük** anahtar sürekli sola inerek, **en büyük** anahtar sürekli sağa inerek bulunur.

**Ekleme** başarısız bir aramadır. Aranan anahtarı ararsın; yürüyüş boş bir yere düştüğünde yeni düğümü tam oraya yaprak olarak asarsın. Yürüyüş boyunca geçtiğin her düğümde doğru tarafa indiğin için değişmez kendiliğinden korunur. Maliyet yine h ile orantılıdır.

**Silme** üç duruma ayrılır ve mülakatta en çok bu ayrım sorulur. Silinecek düğüm yapraksa doğrudan koparılır. Tek çocuğu varsa, o çocuk düğümün yerine geçer; alt ağaç bütünüyle yukarı kayar ve sıra bozulmaz. İki çocuğu varsa düğüm doğrudan koparılamaz, çünkü yerine iki alt ağacı birden koyacak tek bir yer yoktur. Çözüm, düğümün **sıralı ardılını (in-order successor)** bulmaktır: sağ alt ağacın en küçük düğümü. Bu düğümün anahtarı, silinecek anahtarla sağ alt ağacın geri kalanı arasında duran tek anahtardır; onu silinecek düğümün yerine yazarsan değişmez bozulmaz. Ardından ardılın kendisi silinir ve burada iş kolaydır: sağ alt ağacın en küçük düğümünün tanım gereği sol çocuğu yoktur, dolayısıyla ikinci silme mutlaka birinci ya da ikinci duruma düşer. Toplam maliyet yine h ile orantılıdır.

Bu üç işlemin yanına iki tanesini daha koyunca yapının asıl değeri görünür: sıralı dolaşma doğrusal zamanda **sıralı çıktı** verir ve bir anahtarın ardılı ile öncülü h ile orantılı zamanda bulunur. Sıralı diziyle karşılaştır: dizide arama ve ardıl ucuzdur ama ekleme doğrusaldır. Bağlı listeyle karşılaştır: listede ekleme ucuzdur ama arama doğrusaldır. İkili arama ağacı beşinin hepsini aynı ölçüye, h'ye bağlar. Bütün mesele artık tek bir soruya indi: **h ne kadar?**

## Yükseklik: h ile n arasındaki gerçek ilişki

Alt sınır kolay ve yapısal tümevarımla ispatlanır: yüksekliği h olan bir ikili ağaç en fazla 2^(h+1) − 1 düğüm taşır. Taban durumda h sıfırdır ve tek düğüm vardır; 2^1 − 1 = 1. Adımda, yüksekliği h olan bir ağacın kökünün iki alt ağacının yüksekliği en fazla h − 1'dir, dolayısıyla düğüm sayısı en fazla 1 + 2(2^h − 1) = 2^(h+1) − 1 olur. Buradan n ≤ 2^(h+1) − 1, yani h ≥ log₂(n + 1) − 1 çıkar: n düğümü bir ikili ağaca sığdırmanın logaritmadan daha ucuz bir yolu yoktur.

Üst sınır ise yoktur — daha doğrusu, üst sınır felakettir. Anahtarları artan sırada eklersen her yeni anahtar her zaman sağa gider ve ağaç tek dallı bir zincire dönüşür; h = n − 1 olur. O zincir, işaretçi başına fazladan yer ödeyen bir bağlı listeden başka bir şey değildir ve arama yine doğrusaldır.

Bu kötü durum kurgusal değildir, en olası durumlardan biridir. Kayıtları tarih sırasına göre, kimlik numarasına göre veya alfabetik olarak eklemek gündelik iştir ve üçü de sıralı girdidir. Şekil 2 aynı yedi anahtarın iki farklı ekleme sırasıyla ürettiği iki ağacı yan yana koyuyor.

![Solda yedi anahtarın dengeli ekleme sırasıyla oluşan üç katlı ağacı: yükseklik iki, en kötü arama yolu üç düğüm. Sağda aynı yedi anahtarın artan sırada eklenmesiyle oluşan tek dallı zincir: yükseklik altı, en kötü arama yolu yedi düğüm ve zincirin yanında bir milyon eleman için yirmi adıma karşı bir milyon adım karşılaştırması](assets/bst-yukseklik.svg "Şekil 2 — Aynı anahtarlar, iki ekleme sırası: dengeli ağaç ve zincir")

Sayıya dökelim. Bir milyon anahtar için dengeli bir ikili ağacın yüksekliği log₂(10⁶) ≈ 19,93, yani yaklaşık 20'dir: en kötü arama yirmi bir karşılaştırma yapar. Aynı bir milyon anahtar sıralı gelirse yükseklik 999.999 olur ve en kötü arama bir milyon karşılaştırma yapar. Aynı veri yapısı, aynı kod, aynı değişmez — aradaki fark elli bin katın üzerindedir.

Bir ara sonuç daha önemlidir. Anahtarlar **rastgele bir sırayla** eklenirse beklenen yükseklik logaritmik mertebede kalır; bu bilinen bir sonuçtur. Ama karmaşıklık makalesinde konuşulan ayrım burada tam olarak devreye girer: bu bir **ortalama durum** iddiasıdır ve bir dağılım varsayımına dayanır. Girdinin sırasını sen seçmiyorsan o varsayımı savunamazsın; üstelik ekleme sırası dışarıdan belirlenen bir sistemde kötü durum kaza değil, girdinin doğal hâli olabilir. Mülakatta "ortalamada logaritmik" cevabı yeterli değildir, çünkü bir sonraki soru mutlaka "peki garantin ne?" olur.

**Problem.** Artan sırada verilmiş n farklı anahtardan, yüksekliği mümkün olan en küçük ikili arama ağacını kur ve maliyetini savun.

**Strateji.** Değişmez, kökün solunda küçükleri sağında büyükleri ister. Sıralı bir dizide ortadaki eleman bu ayrımı tam olarak eşit iki parçaya böler; kalanı böl ve yönet.

**Adımlar.** Dizinin ortadaki elemanını kök yap. Sol yarıdan aynı yöntemle sol alt ağacı, sağ yarıdan sağ alt ağacı özyinelemeli olarak kur. Her adımda parça uzunluğu yarıya indiği için ağacın yüksekliği kabaca log₂n olur; her eleman tam bir kez düğüme dönüştüğü için toplam kurulum maliyeti doğrusaldır.

**Savunma.** Yükseklik alt sınırını bu bölümde ispatladık: n düğümlü bir ikili ağaçta h en az log₂(n + 1) − 1'dir. Ortadan bölen kurulum tam bu sınıra oturduğu için daha iyisi mümkün değildir. Dikkat edilecek nokta şudur: bu yöntem ağacı **bir kez** dengeler. Sonraki eklemeler dengeyi yeniden bozar, çünkü ekleme yeni düğümü her zaman yaprak olarak asar ve hiçbir yerde yüksekliğe bakmaz. Yüksekliğin işlemler boyunca korunması ayrı bir mekanizma ister.

Son olarak bellek: bu işlemlerin doğal yazımı özyinelemelidir ve karmaşıklık makalesinden biliyoruz ki özyineleme derinliği doğrudan yer maliyetidir. İkili arama ağacında derinlik h'dir, dolayısıyla özyinelemeli arama ve dolaşma h ile orantılı ek bellek ister. Dengeli bir ağaçta bu ihmal edilebilir; zincirleşmiş bir ağaçta doğrusal ek bellektir ve büyük girdilerde çağrı yığınını taşırabilir.

> **Sesli anlat:** "İkili arama ağacında arama, ekleme ve silmenin maliyetini söyle ve en kötü durumda neden doğrusala düştüğünü doksan saniyede açıkla."
>
> İyi bir cevabın omurgası: "Üç işlemin de maliyeti ağacın yüksekliği h ile orantılıdır, çünkü hepsi kökten aşağı tek bir yol izler. Silmede iki çocuklu durum ayrıdır: düğümün yerine sıralı ardılını, yani sağ alt ağacın en küçüğünü koyar, sonra o düğümü silerim; onun sol çocuğu olmadığı için ikinci silme kolay duruma düşer. h ile n arasındaki ilişki garanti değildir: alttan h en az log iki n civarındadır çünkü yüksekliği h olan ikili ağaç en fazla iki üzeri h artı bir eksi bir düğüm taşır, ama üstten bir sınır yoktur. Anahtarlar sıralı gelirse ağaç tek dallı zincire dönüşür ve h, n eksi bir olur; arama doğrusala düşer. Rastgele ekleme sırasında beklenen yükseklik logaritmiktir, fakat bu bir dağılım varsayımıdır, garanti değildir. Garanti istiyorsam yüksekliği zorla sınırlayan dengeli bir yapı kullanırım."

## Mülakatta nasıl görünür

Bu konunun takip zinciri neredeyse standarttır: "İkili arama ağacında arama kaç adım sürer?" → "O(log n) dedin, emin misin?" → "Nasıl garanti edersin?" İlk soruya doğrudan "logaritmik" demek, ikinci soruda geri alınacak bir cevaptır. Doğru cevap "yükseklikle orantılı" diye başlar, sonra yüksekliğin ne zaman logaritmik olduğunu söyler.

İkinci klasik soru denetimdir: "Verilen bir ikili ağacın ikili arama ağacı olup olmadığını nasıl anlarsın?" Burada beklenen şey yerel karşılaştırmanın yetmediğini fark etmen ve aralık taşıyan ya da sıralı dolaşmaya dayanan doğrusal bir yöntem vermendir.

Üçüncüsü tasarım sorusudur: "Sıralı dizi yerine neden ağaç?" Cevap tek cümlede verilebilir: sıralı dizi aramayı ucuzlatır ama eklemeyi doğrusal bırakır; ikili arama ağacı ikisini de aynı ölçüye bağlar ve o ölçüyü sınırlamak ayrı bir tasarım işidir.

İngilizce karşılıklar hazır olmalıdır: *binary tree*, *binary search tree*, *root*, *leaf*, *parent*, *child*, *subtree*, *depth*, *height*, *invariant*, *in-order traversal*, *in-order successor*, *predecessor*.

### Sırada ne var

Bu makale bir sözü yarım bıraktı: işlemleri h'ye bağladık ama h'yi bağlayamadık. Sıradaki makale eksik yarıyı tamamlıyor. Bir ağacın yüksekliğini logaritmik tutmanın yolu, değişmeze ikinci bir koşul eklemek ve her eklemeden sonra o koşulu ucuza onarmaktır. Bunu önce dönüşlerle ve yükseklik dengesiyle kuracağız, sonra aynı fikrin düğüm başına daha çok anahtar tutan biçimine geçeceğiz. Orada karmaşıklık makalesinin RAM modeli de ilk kez bilinçli olarak değişecek: erişim maliyetinin her hücrede aynı olmadığı bir dünyada doğru ağaç, ikili ağaç değildir.

## Kaynakça

- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 12. bölüm (Binary Search Trees — 12.1 ikili arama ağacının tanımı ve sıralı dolaşma, 12.2 sorgular, 12.3 ekleme ve silme). MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 6: Binary Trees I — düğüm temsili (öğe, ebeveyn, sol, sağ), derinlik ve yükseklik tanımları, dolaşma sırası ve işlemlerin yükseklikle orantılı maliyeti. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 3.2 (Binary Search Trees — arama, ekleme, silme ve ekleme sırasının ağaç şekline etkisi). Addison-Wesley. [Bağlantı](https://algs4.cs.princeton.edu/home/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE250 — Data Structures and Algorithms* (katalog tanımı "Search Structures" başlığını içerir). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe250/)
