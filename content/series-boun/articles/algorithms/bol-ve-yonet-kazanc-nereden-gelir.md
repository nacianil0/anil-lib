---
article_id: article_cfd02c46-3bbc-4e8b-a354-8015844789a5
title: "Böl ve Yönet: Kazanç Nereden Gelir?"
slug: bol-ve-yonet-kazanc-nereden-gelir
category: algorithms
level: advanced
reading_order: 20
summary: "Böl ve yönet bir tasarım deseni olarak kuruluyor ve şaşırtıcı bir gözlemle başlıyor: bir problemi ikiye bölmek tek başına hiçbir şey kazandırmaz. Kazanç yalnızca iki yerdedir — alt problem sayısını düşürmek (Karatsuba çarpımı, Strassen) ve birleştirme adımını ucuzlatmak (konveks kabuk). Eşit olmayan alt problemlerle doğrusal medyan bulma, grup boyutunun neden beş olduğu, küçük girdilerde tabana devretme ve desenin çöktüğü yer: örtüşen alt problemler."
tags:
  - bol-ve-yonet
  - tasarim-deseni
  - karatsuba
  - medyan-bulma
  - ozyineleme-agaci
content_hash: sha256:12216fb3d24a0c11db8fd532942e7825072bcb221b59c88177de916f55dc1d7f
classification_version: 1
classification_batch: 6
---
## Analizden tasarıma

Son üç makale **analiz** araçları kurdu: asimptotik tanımlar ölçüyü, yineleme bağıntıları özyinelemeli maliyeti, döngü değişmezleri doğruluğu verdi. Üçü de önüne konmuş bir algoritmayı değerlendirir. Şimdi yön değişiyor: elinde bir problem var ve algoritmayı **bulman** gerekiyor. Faz C'nin geri kalanı tasarım desenleridir ve ilki en tanıdık olanıdır.

**Böl ve yönet (divide and conquer)** üç adımdır. Boyutu n olan problemi boyutu n/b olan a alt probleme **böl**; her alt problemi özyinelemeli olarak **çöz**; alt çözümleri **birleştir**. Maliyeti, önceki makaleden tanıdığın biçimde yazılır:

T(n) = a · T(n/b) + [bölme ve birleştirme işi]

Bu seride deseni farkında olmadan zaten kullandık: birleştirmeli sıralama, ikili arama, hatta hızlı üs alma aynı fikrin türevleridir. Ama deseni bir **tasarım aracına** çevirmek için önce rahatsız edici bir gerçekle yüzleşmek gerekiyor.

## Bölmek tek başına hiçbir şey kazandırmaz

n basamaklı iki sayıyı çarpmak istiyoruz. Okulda öğrenilen yöntem her basamağı her basamakla çarpar ve Θ(n²) adım harcar. Böl ve yönet uygulayalım: her iki sayıyı ortadan ikiye ayıralım. Taban r olmak üzere x = x₁·r^(n/2) + x₀ ve y = y₁·r^(n/2) + y₀ yazarsak

x · y = x₁y₁ · rⁿ + (x₀y₁ + x₁y₀) · r^(n/2) + x₀y₀

elde ederiz. Dört tane yarım boyutlu çarpım var: x₁y₁, x₀y₁, x₁y₀ ve x₀y₀. Kaydırmalar ve toplamalar doğrusal zamanda yapılır. Yineleme:

T(n) = 4·T(n/2) + Θ(n)

Master Teoremini uygula: n^(log₂4) = n² ve g(n) = Θ(n), yaprak sayısından polinomsal olarak küçük, yani Durum 1. Sonuç **Θ(n²)**. Yani böldük, özyinelemeye girdik, birleştirdik — ve okuldaki yöntemle tam olarak aynı sınıfta kaldık. Bölmenin kendisi bedava bir kazanç **değildir**.

Sebebi bağıntının içinde görünüyor. Elinde yalnızca üç kaldıraç var: alt problem sayısı a, küçülme çarpanı b ve ek iş g(n). b çoğu zaman problemin doğası tarafından belirlenir — bir diziyi, bir sayıyı ya da bir nokta kümesini ikiye bölersin. Geriye iki kaldıraç kalır: **a'yı düşürmek** ve **g(n)'i ucuzlatmak.** Böl ve yönetin bütün başarı hikâyeleri bu iki kaldıraçtan birine dayanır.

## Birinci kaldıraç: alt problem sayısını düşürmek

Dört çarpımdan üçe inebilir miyiz? Karatsuba'nın 1960'ta bulduğu numara şudur: üç çarpım tanımla,

z₀ = x₀ · y₀,  z₂ = x₁ · y₁,  z₁ = (x₀ + x₁) · (y₀ + y₁) − z₀ − z₂

ve z₁'in açılımına bak: (x₀y₀ + x₀y₁ + x₁y₀ + x₁y₁) − x₀y₀ − x₁y₁ = x₀y₁ + x₁y₀. Yani ortadaki katsayı, kendisini oluşturan iki çarpım ayrı ayrı hesaplanmadan elde edildi. Sonuç z = z₂·rⁿ + z₁·r^(n/2) + z₀ biçiminde toplanır.

Sayıyla görelim. x = 1234 ve y = 5678 olsun; x₁ = 12, x₀ = 34, y₁ = 56, y₀ = 78. z₂ = 12 · 56 = 672, z₀ = 34 · 78 = 2652 ve z₁ = 46 · 134 − 2652 − 672 = 6164 − 3324 = 2840. Gerçekten de x₀y₁ + x₁y₀ = 1904 + 936 = 2840. Toplarsak 672 · 10⁴ + 2840 · 10² + 2652 = 7.006.652 ve bu, 1234 · 5678'in tam değeridir.

Yeni yineleme yalnızca tek bir yerde farklı:

T(n) = 3·T(n/2) + Θ(n)

Master Teoremi yine Durum 1 verir ama üs değişmiştir: **Θ(n^(log₂3)) = Θ(n^1,585).** Önceki makalenin uygulama tablosundaki son satır, adı konmamış hâliyle tam olarak buydu; şimdi bir algoritması var.

Farkın ne kadar büyük olduğunu özyineleme ağacından okumak en kolayı. Ağacın yaprak sayısı a^(log₂ n)'dir: dört alt problemle 4^(log₂ n) = n², üç alt problemle 3^(log₂ n) = n^(log₂3). n = 1024 basamaklı sayılarda bu 1.048.576'ya karşı 59.049 demektir — yaklaşık 18 kat. n = 2²⁰ basamakta oran 315'e çıkar. Şekil 1 iki ağacı yan yana koyuyor.

![Kesikli bir dikey çizgiyle ikiye ayrılmış, yan yana iki özyineleme ağacı. Sol tarafta naif bölme başlığı ve T(n) eşittir dört T(n bölü iki) artı theta n yinelemesi var; kök n etiketli tek bir kutu, altında n bölü iki etiketli dört kutu, onların altında da on altı küçük kutudan oluşan bir sıra duruyor ve sıranın altında on altı düğüm, her biri n bölü dört yazıyor. Daha altta üç satır: derinlik ikilik tabanda log n, yaprak sayısı dört üzeri log n eşittir n kare, sonuç theta n kare ve bunun okul yöntemiyle aynı sınıf olduğu. Sağ tarafta Karatsuba başlığı ve T(n) eşittir üç T(n bölü iki) artı theta n yinelemesi var; kök n etiketli tek kutu, altında n bölü iki etiketli üç kutu, onların altında dokuz kutudan oluşan bir sıra ve altında dokuz düğüm, her biri n bölü dört yazıyor. Daha altta üç satır: derinlik yine ikilik tabanda log n, yaprak sayısı üç üzeri log n eşittir n üzeri ikilik tabanda log üç, sonuç theta n üzeri bir virgül beş sekiz beş. En altta iki not: değişen tek şey alt problem sayısıdır, bölme çarpanı ve birleştirme maliyeti aynı kalmıştır; bin yirmi dört basamakta yaprak sayısı bir milyon kırk sekiz bin beş yüz yetmiş altıya karşı elli dokuz bin kırk dokuzdur, yaklaşık on sekiz kat](assets/karatsuba-dallanma-carpani.svg "Şekil 1 — Alt problem sayısını dörtten üçe indirmek: aynı ağaç, farklı sınıf")

Aynı fikir başka bir alanda daha ünlüdür. İki n × n matrisi çarpmanın doğrudan böl-yönet hâli, her matrisi dört bloğa ayırıp sekiz blok çarpımı yapar: T(n) = 8·T(n/2) + Θ(n²) ve n^(log₂8) = n³ olduğu için sonuç Θ(n³) — yine kazanç yok. Strassen'in yaptığı iş, sekiz çarpımı yedi çarpımla değiştirmektir: T(n) = 7·T(n/2) + Θ(n²) ve sonuç **Θ(n^(log₂7)) ≈ Θ(n^2,81)**.

İki örnekte de takas aynıdır: **çarpma sayısını azaltmak için toplama sayısını artırmak.** Fazladan toplamalar g(n) içinde yaşar ve g(n) doğrusal ya da karesel kaldığı sürece asimptotik sınıfı belirlemez; belirleyen a'dır. Mülakatta bu cümleyi kurabilmek, "Karatsuba n^1,585'tir" demekten çok daha değerlidir.

> **Sesli anlat:** "Bir problemi ikiye bölmek neden tek başına hızlanma getirmez, kazanç tam olarak nereden gelir? Doksan saniye."
>
> İyi bir cevabın omurgası: "Çünkü maliyet T(n) = a·T(n/b) + g(n) biçimindedir ve bölmek yalnızca b'yi ayarlar. n basamaklı çarpmayı ortadan ikiye bölersem dört yarım çarpım çıkar, T(n) = 4T(n/2) + Θ(n) olur ve Master Teoreminin birinci durumu Θ(n²) verir — okul yöntemiyle aynı sınıf. Kazanç iki yerdedir. Birincisi alt problem sayısını düşürmek: Karatsuba, ortadaki katsayıyı (x₀ + x₁)(y₀ + y₁) − z₀ − z₂ ile hesaplayarak dört çarpımı üçe indirir, T(n) = 3T(n/2) + Θ(n) olur ve sonuç Θ(n^log₂3), yaklaşık n^1,585. Aynı fikrin matris hâli Strassen'dir: sekiz blok çarpımı yediye iner ve Θ(n³) yerine Θ(n^2,81) çıkar. İkincisi birleştirme adımını ucuzlatmak: aynı a ve b ile, birleştirmeyi Θ(n²)'den Θ(n)'e indirmek sonucu Θ(n²)'den Θ(n log n)'e taşır. İkisinde de takas aynıdır — pahalı işlemi ucuz işlemle değiştirmek."

## İkinci kaldıraç: birleştirmeyi ucuzlatmak

İkinci kaldıraç için düzlemde bir problem alalım. n nokta verildiğinde **konveks kabuk (convex hull)**, bütün noktaları içeren en küçük dışbükey çokgendir; çıktısı sınırdaki noktaların saat yönündeki sırasıdır. Kaba kuvvet çözüm her nokta çiftinin oluşturduğu doğru parçasını dener ve geri kalan bütün noktaların aynı tarafta kalıp kalmadığına bakar: Θ(n²) parça, her biri için Θ(n) denetim, toplam Θ(n³).

Böl ve yönet açık görünüyor. Noktaları bir kez x koordinatına göre sırala — bu Θ(n log n) ve yalnızca bir kez ödenir. Sonra sol yarı A ile sağ yarı B'yi ayır, ikisinin kabuklarını özyinelemeyle bul ve birleştir. Birleştirme, iki kabuğu birbirine bağlayan **üst teğet** ile **alt teğet** doğru parçalarını bulmak, sonra kalan kenarları kesip yapıştırmaktır.

Kritik soru teğetlerin nasıl bulunduğudur ve cevap sonucu belirler. Bariz yöntem bütün (aᵢ, bⱼ) çiftlerini denemektir: Θ(n²) iş. Bağıntı T(n) = 2·T(n/2) + Θ(n²) olur, Master Teoreminin üçüncü durumu devreye girer ve sonuç **Θ(n²)** çıkar. Kaba kuvvetten iyidir ama beklediğimiz kazanç değildir.

Doğru yöntem iki parmakla yürümektir. A'nın en sağdaki noktasından ve B'nin en soldaki noktasından başla; A ve B'yi ayıran dikey doğru üzerinde, (aᵢ, bⱼ) parçasının kestiği noktanın yüksekliği y(i, j) olsun. Üst teğet, y(i, j)'yi **en büyük** yapan çifttir; çünkü en büyük değilse doğrunun iki yanında da nokta kalır ve o bir teğet olamaz. Bir parmağı saat yönünde, diğerini tersine kaydırarak bu maksimuma yürünür ve her adımda bir nokta tüketildiği için toplam Θ(n) olur. Alt teğet simetriktir. Şekil 2 birleştirmeyi gösteriyor.

![Bir düzlem şeması. Solda A etiketli beş noktadan oluşan bir dışbükey çokgen, sağda B etiketli dört noktadan oluşan başka bir dışbükey çokgen var; ikisinin arasında L etiketli dikey kesikli bir ayırıcı doğru duruyor. A'nın üst noktasıyla B'nin üst noktasını birleştiren kalın bir doğru parçası üst teğet olarak, A'nın alt noktasıyla B'nin alt noktasını birleştiren ikinci kalın doğru parçası alt teğet olarak etiketlenmiş. İki teğetin arasında kalan ve birleşmede atılan iç kenarlar ince kesikli çizilmiş. Sağ tarafta iki maliyet satırı var: bütün nokta çiftlerini denemek T(n) eşittir iki T(n bölü iki) artı theta n kare, sonuç theta n kare; iki parmakla yürümek T(n) eşittir iki T(n bölü iki) artı theta n, sonuç theta n log n. En altta not: alt problem sayısı ve bölme çarpanı iki örnekte de aynıdır, değişen yalnızca birleştirme adımının maliyetidir](assets/konveks-kabuk-birlestirme.svg "Şekil 2 — Aynı bölme, farklı birleştirme: teğet arayışının maliyeti sonucu belirliyor")

Yeni bağıntı T(n) = 2·T(n/2) + Θ(n) ve sonuç **Θ(n log n)**. n = 10⁶ nokta için üç yöntemin adım sayıları kabaca 10¹⁸, 10¹² ve 2 × 10⁷'dir. Vurgu şudur: a ve b iki durumda da aynıydı. Değişen yalnızca g(n) oldu ve sınıf değişti. Böl-yönet algoritmalarında iyileştirme neredeyse her zaman birleştirme adımındadır.

## Doğruluk: özyinelemeye güvenmek

Böl-yönet bir algoritmanın doğruluğu **güçlü tümevarımla** savunulur ve savunmanın biçimi hep aynıdır. Taban durumu: küçük girdilerde doğrudan doğrula. Tümevarım adımı: özyinelemeli çağrıların **doğru cevabı verdiğini varsay** ve birleştirme adımının bu doğru alt cevaplardan doğru bir bütün cevap ürettiğini göster.

Bu, ispat yükünün tamamını birleştirme adımına yıktığı için önemlidir — ve birleştirme adımı genellikle bir **döngüdür**, yani önceki makalenin aracı tam buraya oturur. Birleştirmeli sıralamanın birleştirme döngüsünü ele al: iki sıralı yarıdan tek bir sıralı dizi üretiyor. Değişmezi şudur: **çıktının ilk k hücresi, iki girdinin birleşimindeki en küçük k elemanı sıralı olarak tutar ve iki girdi işaretçisi henüz yazılmamış elemanların başında durur.** Başlatma k = 0 iken boş doğrulukla gelir; koruma, her adımda iki adaydan küçüğünün yazılmasıyla sağlanır; sonuçlanma, k iki yarının toplam uzunluğuna eşit olduğunda bütün dizinin sıralı olduğunu verir. Özyinelemeli tasarımın doğruluk savunması ile döngü değişmezi, aynı ispatın iki katıdır.

## Eşit olmayan alt problemler: doğrusal medyan bulma

Şimdiye kadarki bütün örneklerde alt problemler eşit boyuttaydı. Deseni asıl ilginç kılan, olmadıkları durumdur.

Bir kümenin **i'inci en küçük elemanını** bulmak istiyoruz — i = ⌊(n + 1)/2⌋ seçilirse buna medyan denir. Sıralayıp bakmak Θ(n log n) verir. Daha iyisi mümkün mü? Hızlı sıralamanın ayırma fikrini ödünç alalım: bir x elemanı seç, kümeyi x'ten küçükler (B) ve büyükler (C) diye ayır, x'in sırasını hesapla ve yalnızca **bir** tarafa özyinelemeli olarak in. Sıralamadan farkı budur: iki alt probleme değil, tek alt probleme iniyoruz.

Bütün mesele x'i seçmektir. Rastgele seçmek ortalamada iyidir ama en kötü durumda her seferinde uç bir eleman gelebilir ve Θ(n²)'ye düşeriz. Garanti isteniyorsa x'in "yeterince ortada" olduğu ispatlanabilmelidir. Yöntem şudur: elemanları **beşerli gruplara** ayır, her grubu sırala ve grup medyanlarını al; sonra bu medyanların medyanını **aynı algoritmayla özyinelemeli olarak** bul ve onu x seç.

Kazanç sayılabilir. Grupların yaklaşık yarısının medyanı x'ten büyüktür ve her böyle grup, kendi medyanıyla birlikte en az üç eleman katkı verir; x'in kendi grubu ile eksik kalan son grup düşüldüğünde x'ten büyük eleman sayısı en az 3(⌈n/10⌉ − 2) olur. Simetrik olarak küçükler için de aynı sayı geçerlidir. n = 1000 için bu en az 294 eleman demektir; yani özyinelemeye giden taraf en fazla 706 elemandır, girdinin yaklaşık %70,6'sı.

Ortaya çıkan bağıntı, önceki makalede "Master Teoreminin susduğu yerler" arasında saydığımız biçimdedir:

T(n) ≤ T(⌈n/5⌉) + T(7n/10 + 6) + Θ(n)

İki alt problem var ve boyutları farklı; tek bir a ve b çifti yazılamaz. Çözüm için tahmin-et-ve-tümevarımla-doğrula yöntemine dönülür. Sezgi, alt problem paylarının toplamının 1/5 + 7/10 = 9/10 olması, yani girdinin tamamından küçük kalmasıdır; bu, işin seviyeler boyunca geometrik olarak azalacağını düşündürür. T(n) ≤ c·n tahmin edilir ve yeterince büyük bir c için tümevarım yürür: c·n/5 + 7c·n/10 + a·n = 9c·n/10 + a·n ≤ c·n eşitsizliği c ≥ 10a seçildiğinde sağlanır. Sonuç **Θ(n)** — sıralamadan bile ucuz, doğrusal zamanda medyan.

> **Sesli anlat:** "Bir kümenin medyanını sıralamadan daha hızlı bulabilir misin? Nasıl ve neden çalışır? Doksan saniye."
>
> İyi bir cevabın omurgası: "Evet, doğrusal zamanda bulunur. Fikir hızlı sıralamanın ayırma adımıdır ama iki tarafa değil **tek** tarafa iniyorum: bir x elemanı seçip kümeyi x'ten küçükler ve büyükler diye ayırıyorum, x'in sırasını hesaplıyorum ve aradığım sıra hangi taraftaysa yalnızca oraya özyinelemeli olarak giriyorum. Bütün mesele x'in yeterince ortada olduğunu **garanti etmek**; rastgele seçim ortalamada iyidir ama en kötü durumda Θ(n²) verir. Garanti için elemanları beşerli gruplara ayırıyorum, her grubun medyanını alıyorum ve bu medyanların medyanını aynı algoritmayla özyinelemeli buluyorum. Bu seçim, x'ten büyük ve küçük tarafların her birinde en az 3(⌈n/10⌉ − 2) eleman bulunmasını garanti eder; yani özyinelemeye giden taraf girdinin kabaca %70'ini geçemez. Bağıntı T(n) ≤ T(n/5) + T(7n/10) + Θ(n) olur. Master Teoremi burada uygulanmaz çünkü alt problemler eşit boyutta değil; ama payların toplamı 9/10, yani birden küçük — bu, işin geometrik azalacağını söyler. T(n) ≤ c·n tahmin edip tümevarımla doğruluyorum ve yeterince büyük c için yürüyor. Sonuç Θ(n)."

Grup boyutunun neden beş olduğu, bu makalenin en güzel tasarım dersidir. Üçerli gruplarla yapsaydın garanti edilen eleme oranı 1/3'e düşer ve bağıntı T(n) = T(n/3) + T(2n/3) + Θ(n) olurdu; payların toplamı **tam olarak 1** eder ve geometrik azalma kaybolur. O bağıntının çözümü Θ(n log n)'dir, yani baştaki sıralama fikrine geri dönmüş olursun. Sayıyla da görülür: üçerli grupla T(n)/n oranı 1000, 10⁴, 10⁵, 10⁶ ve 10⁷ için 4,5 → 8,1 → 11,6 → 15,2 → 18,8 diye her onlukta sabit bir miktar artar — logaritmik büyüme budur. Beşerli grupla aynı oranlar 3,6 → 5,7 → 7,0 → 7,9 → 8,6 diye artar ve 1/(1 − 0,9) = 10 sınırına yaklaşarak durur. Beş, bu eşitsizliği sağlayan en küçük tek sayıdır.

## Küçük girdilerde tabana devretmek

Asimptotik sınıf algoritma seçiminin birinci kriteridir ama tek kriteri değildir; asimptotik makalesinde kurduğumuz kesişim noktası argümanı burada pratik bir karara dönüşür. Özyinelemenin her katmanı çağrı yığınında yer ve sabit maliyet ister; girdi yeterince küçüldüğünde bu maliyet, sözde daha "yavaş" olan basit algoritmanın maliyetinden büyük olur.

Somut bir hesap: eklemeli sıralama ortalama olarak yaklaşık n²/4 karşılaştırma, birleştirmeli sıralama yaklaşık n log₂ n karşılaştırma yapar. n²/4 ile n log₂ n eşitsizliğini çözersen n ≤ 15 için eklemeli sıralamanın daha az karşılaştırma yaptığını görürsün. Gerçek kütüphaneler tam olarak bunu yapar: özyinelemeyi belirli bir eşiğin altında keser ve küçük parçaları eklemeli sıralamaya devreder. Sıralama makalesinde adını anmıştık; gerekçesi buydu. Aynı eşik olgusu Strassen için de kaydedilmiştir: üsteki 3 ile 2,81 farkı asimptotik olarak büyüktür ama sabitler nedeniyle Strassen, sıradan çarpımı ancak kabaca n ≥ 32'den itibaren geçer.

Özyineleme derinliğinin **bellek maliyeti** olduğu da unutulmamalı. Karmaşıklık makalesinde açtığımız bu pin, böl-yönet tasarımında doğrudan bir kısıt hâline gelir: derinlik log n mertebesindeyse sorun yok, ama dengesiz bölünen bir özyineleme yığını doğrusal derinliğe çıkarabilir.

## Desenin çöktüğü yer

Böl ve yönet iki koşula dayanır: alt problemler **bağımsız** olmalı ve birleştirme, problemi baştan çözmekten ucuz olmalı. İkisinden biri bozulduğunda desen çalışmaz.

En öğretici çöküş, alt problemlerin bağımsız olmadığı durumdur. Fibonacci sayılarını F(n) = F(n − 1) + F(n − 2) tanımından doğrudan hesaplayan özyinelemeli program mükemmel bir böl-yönet gibi görünür. Ama özyineleme ağacındaki düğümler tekrar eder: F(30)'u hesaplarken F(15) tam **987 kez** hesaplanır. Toplam çağrı sayısı 2·F(n + 1) − 1'dir; F(40) için bu 331.160.281 çağrı eder, oysa aynı sonucu bir döngüyle 40 adımda bulursun — kabaca sekiz milyon kat fark. Alt problemler bağımsız değil, **örtüşüyor**.

Önceki makalede özyineleme ağacını bir maliyet aracı olarak kullanmıştık. Şimdi aynı ağaç bir teşhis aracı: ağaçta aynı alt problem birden çok kez beliriyorsa böl-yönet yanlış desendir ve her alt problemi bir kez çözüp saklamak gerekir. O desenin adı dinamik programlamadır.

İkinci çöküş biçimi birleştirmenin pahalı olmasıdır. Konveks kabuk örneğinde teğetleri Θ(n²) ile aramak sonucu Θ(n²)'de bırakmıştı; birleştirme, problemin kendisi kadar pahalıysa bölmek boşa emektir.

## Mülakatta nasıl görünür

Böl-yönet bir çözüm önerdiğinde beklenen sıra sabittir. Önce üç adımı adıyla söyle: neyi böldün, alt problem sayısı ve boyutu ne, birleştirme ne yapıyor. Sonra bağıntıyı yaz ve a, b ile g(n)'i işaret et. Sonra Master Teoreminin hangi durumunda olduğunu ve **neden** o durumda olduğunu belirt. Doğruluğu güçlü tümevarımla, birleştirme adımını değişmezle savun.

Ardından gelen soru neredeyse her zaman "daha iyisi olur mu?" olur ve bu makale cevabın iskeletini verir: a'yı düşürebilir miyim, birleştirmeyi ucuzlatabilir miyim? Karatsuba ve Strassen birinci soruya, konveks kabuk ikinci soruya verilmiş cevaplardır.

Üç tipik hata var. Bölmenin kendisini kazanç sanmak — dört alt problemli çarpma bunun kanonik örneğidir. Alt problemlerin bağımsız olduğunu denetlemeden desene girmek. Ve tabana devretme eşiğini "gereksiz ayrıntı" sayıp atlamak; gerçek sistemlerde bu eşik ölçülebilir bir fark yaratır.

İngilizce karşılıklar hazır olmalıdır: *divide and conquer*, *subproblem*, *merge step*, *combine*, *branching factor*, *convex hull*, *upper tangent*, *median of medians*, *selection problem*, *base case cutoff*, *overlapping subproblems*.

### Sırada ne var

Böl ve yönet bir problemi **parçalayarak** çözüyor. Sıradaki desen bunun neredeyse zıddıdır: hiç parçalamaz, geriye de bakmaz; girdiyi tek tek işler ve her adımda o an en iyi görünen seçimi yapar. Buna **açgözlü (greedy)** yaklaşım denir ve iki yüzü vardır. Bazı problemlerde şaşırtıcı biçimde optimal sonucu verir; bazılarında da tamamen yanılır — üstelik yanıldığı örnekler ilk bakışta ayırt edilemez.

Sıradaki makale ayırt etme ölçütünü kuruyor: bir açgözlü kuralın doğru olduğu nasıl ispatlanır ve yanlış olduğu nasıl gösterilir? İspat tarafında karşılaştırma makalesinde tanıştığımız ekstremal argümanın algoritmik hâlini, yanlışlama tarafında ise ispat teknikleri makalesindeki karşı örnek disiplinini kullanacağız.

## Kaynakça

- Demaine, E., Devadas, S. & Lynch, N. *6.046J Design and Analysis of Algorithms*, Lecture 2: Divide and Conquer — desenin T(n) = aT(n/b) + [birleştirme işi] biçiminde tanımı (a ≥ 1 ve b, 1'den büyük); konveks kabuğun tanımı ve çıktısının sınır noktalarının saat yönündeki dizisi olması, kaba kuvvet çözümün O(n²) parça × O(n) denetim = O(n³) olması, x koordinatına göre bir kez sıralama, üst ve alt teğetlerle kesip yapıştırma, y(i, j) tanımı ve "(aᵢ, bⱼ) üst teğettir ancak ve ancak y(i, j)'yi en büyük yapıyorsa" savı, bütün çiftleri deneyen O(n²) birleştirmenin T(n) = 2T(n/2) + Θ(n²) = Θ(n²) ve iki parmaklı doğrusal birleştirmenin T(n) = 2T(n/2) + Θ(n) = Θ(n log n) vermesi; medyan bulmada rank tanımı, Select(S, i) yordamı, beşerli sütunların medyanının medyanı olarak x seçimi, "grupların yarısı en az üç eleman katkı verir, x'in grubu ile eksik grup düşülür" muhasebesiyle en az 3(⌈n/10⌉ − 2) eleman sınırı, T(n) = T(⌈n/5⌉) + T(7n/10 + 6) + Θ(n) bağıntısı, "Master theorem does not apply" tespiti, n/5 + 7n/10 toplamının n'den küçük kalması sezgisi ve T(n) ≤ c·n tahmininin c ≥ 20a ile tümevarımla ispatı. MIT OpenCourseWare, Bahar 2015. [Bağlantı](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/pages/lecture-notes/)
- Demaine, E. & Devadas, S. *6.006 Introduction to Algorithms*, Lecture 11: Numerics I — n basamaklı iki sayının yarıya bölünmesi (x = x₁·r^(n/2) + x₀), çarpımın dört yarım çarpım cinsinden açılımı ve bunun karesel algoritma vermesi; Karatsuba'nın z₀ = x₀y₀, z₂ = x₁y₁, z₁ = (x₀ + x₁)(y₀ + y₁) − z₀ − z₂ ile üç çarpıma inmesi; dallanma çarpanı şekli (4^(log₂ n) = n² ile 3^(log₂ n) = n^(log₂3) karşılaştırması) ve T(n) = 3T(n/2) + Θ(n) = Θ(n^(log₂3)) = Θ(n^1,5849625…) sonucu; Python'ın büyük tam sayı çarpımında bu yöntemi kullanması. MIT OpenCourseWare, Güz 2011. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/lecture-notes/)
- Demaine, E. & Leiserson, C. E. *6.046J Introduction to Algorithms (SMA 5503)*, Lecture 3: Divide and Conquer — desenin üç adımının adlandırılması ("1. Divide the problem into subproblems. 2. Conquer the subproblems by solving them recursively. 3. Combine subproblem solutions.") ve birleştirmeli sıralamanın bu üç adıma oturtulması; ikili aramanın T(n) = T(n/2) + Θ(1) = Θ(lg n) çözümü; matris çarpımının blok böl-yönet hâlinde sekiz alt matris çarpımı yapılması, T(n) = 8T(n/2) + Θ(n²) ve n^(log₂8) = n³ ile Durum 1'den Θ(n³) çıkması ve bunun "no better than the ordinary algorithm" diye kaydedilmesi; Strassen'in 2 × 2 matrisleri yalnızca yedi özyinelemeli çarpımla çarpması, T(n) = 7T(n/2) + Θ(n²) bağıntısının Durum 1 ile Θ(n^(lg 7)) ≈ Θ(n^2,81) vermesi ve "üsteki farkın küçük görünmesine rağmen etkisinin büyük olduğu, Strassen'in bugünün makinelerinde kabaca n ≥ 32'den itibaren sıradan algoritmayı geçtiği" notu. MIT OpenCourseWare, Güz 2005. [Bağlantı](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/pages/lecture-notes/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 4. bölüm (Divide-and-Conquer) — böl-yönet desenin genel çerçevesi, matris çarpımı ve Strassen algoritması, yineleme çözme yöntemleri; ayrıca 9. bölüm (Medians and Order Statistics — beşerli gruplarla doğrusal zamanlı seçim). MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE300 — Analysis of Algorithms* (ders çıktıları "basic classes of algorithms (comparison-based, recursive, divide-and-conquer, dynamic, greedy, numerical, graph)" ifadesini içerir; bu makalenin resmî dayanağı odur). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe300/)
