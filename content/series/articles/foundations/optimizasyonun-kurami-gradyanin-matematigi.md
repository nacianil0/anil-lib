---
article_id: article_1f6a3c94-7d2e-4b18-9c05-6a4e2d8b31f7
title: "Optimizasyonun Kuramı: Gradyanın Matematiği"
slug: optimizasyonun-kurami-gradyanin-matematigi
category: foundations
level: advanced
reading_order: 95
summary: "2. makalede gradyan inişinin tarifini verdik, 8. makalede gerçek koşuların çizelgelerini okuduk; bu makale neden işe yaradığını kuruyor. Gradyan bir sayı değil bir yöndür ve tersinin en dik iniş olması 91. makalenin nokta çarpımından çıkar: (2; 20) gradyanında en hızlı azalma 20,0998, köşegen yönde 15,5563. Adımın tavanı eğrilikten gelir — 2. makalede çanağın dikliğinden kurulup deneyle doğrulanan 3/14 eşiği, ikinci türevin 28/3 olmasının doğrudan sonucudur. Aynı eğrilik ikinci faturayı da keser: koşul sayısı 20 iken uzaklığı yüzde bire indirmek 47 adım sürer, momentumla formüle göre 11, gerçek koşuda 15. Adam'ın ilk adımı her parametreyi tam öğrenme oranı kadar oynatır — gradyanı 0,001 olanı da 10 olanı da; AdamW ise kayba yazılan cezanın uyarlamalı paydadan geçince 100 kat çarpıldığını düzeltir."
tags:
  - optimizasyon
  - gradyan
  - adam
  - momentum
  - ogrenme-orani
content_hash: sha256:665ece40db551e0f4664f74296a17bd539fbaab1b93d6b9946654853c6c17106
classification_version: 1
classification_batch: 23
revised_at: "2026-09-25"
revision_note: "Koşul sayısı tablosu yerine, dar bir vadide gradyan inişi ile momentumun gerçek yollarını çizen yeni bir şekil geldi; sayılar metne taşındı."
---
## Yönü kim seçiyor

94\. makalede kaybın ne saydığını kurduk ve o sayının tam olarak ikiye ayrıldığını gördük: verinin kendi belirsizliği artı modelin fazladan ödediği ceza. Yalnızca ikinci parça düşürülebilir. Peki hangi mekanizma düşürüyor?

2\. makaleden beri cevabı biliyor gibiyiz: eğimi ölç, ters yönüne küçük bir adım at, tekrarla. 8\. makalede gerçek koşuların çizelgelerini de okuduk — ısınma, kosinüs sönümü, AdamW. Ama üç soruyu hiç sormadık. Ters yön neden **en iyi** yön? Adımın uzunluğunu ne sınırlıyor? Ve modern eniyileyiciler tam olarak neyi düzeltiyor?

Bu makalenin işi tek cümle: **gradyan inişini bir tarif olmaktan çıkarıp bir teorem hâline getirmek** ve o teoremin nerede yetmediğini göstermek. Bir terim notu: 8\. ve 19\. makalelerde "optimizatör" dediğimiz nesneye burada **eniyileyici** (optimizer) diyeceğiz; aynı şeyin iki adı.

## Gradyan bir sayı değil, bir yön

2\. makalede tek bir parametremiz vardı, dolayısıyla eğim tek bir sayıydı. Milyarlarca parametrede öyle değil: her parametre için bir kısmi türev vardır ve hepsi birlikte bir liste oluşturur. 91\. makalenin dilinde bu liste bir vektördür ve adı **gradyan** (gradient).

Vektör olması boş bir biçim değil, çünkü yön sorusunu sorulabilir kılıyor. Bir yönde ne kadar hızlı değiştiğini soran büyüklüğün adı **yönlü türev** (directional derivative) ve tanımı doğrudan 91\. makaledeki işlemdir: gradyan ile o yönün birim vektörünün **nokta çarpımı**.

Küçük bir örnek üzerinde görelim. Kaybımız f(w) = ½(w₁² + 20w₂²) olsun ve (2; 1) noktasında duralım. Gradyan (2; 20), uzunluğu ise karekök 404 = **20,0998**. Şimdi farklı yönlere bakalım.

![Üç bölmeli bir şekil. Üst bölmede kurulum verilir: kayıp f(w) eşittir yarım çarpı w1 karesi artı yirmi w2 karesi; nokta (2; 1); gradyan (2; 20); gradyanın uzunluğu 20,0998. Orta bölmede beş satırlık bir tablo vardır; sütunlar birim yön, nokta çarpım ve okuma. Birinci satır (1; 0) yönü, değer artı 2,0000, okuması yalnızca birinci eksende ilerlemek. İkinci satır (0; 1) yönü, değer artı 20,0000, okuması yalnızca ikinci eksende ilerlemek. Üçüncü satır (0,7071; 0,7071) yönü, değer artı 15,5563, okuması iki eksende birden ilerlemek. Dördüncü satır gradyanın kendi yönü (0,0995; 0,9950), değer artı 20,0998, okuması ulaşılabilecek en büyük değer ve gradyanın uzunluğuna eşit; bu satır vurguludur. Beşinci satır ters yön (eksi 0,0995; eksi 0,9950), değer eksi 20,0998, okuması ulaşılabilecek en küçük değer, yani en dik iniş; bu satır da vurguludur. Alt bölmede bir kutu içinde sonuç durur: hiçbir birim yön gradyanın uzunluğundan büyük bir değişim veremez, çünkü nokta çarpım iki uzunluğun çarpımını aşamaz; eşitlik yalnızca yönler çakıştığında olur. En altta bir kayıt: beş değerin tamamı verilen gradyandan elle hesaplanmıştır.](assets/gradyan-bir-yondur.svg "Şekil 1 — En dik iniş neden gradyanın tersi")

Şekil 1'in tablosu bir sezgiyi bozuyor. Köşegen yön — "iki eksende birden aşağı gidiyorum" diyen yön — 15,5563 veriyor; oysa yalnızca ikinci eksende ilerlemek 20,0000. İki koordinatta birden ilerlemek, en hızlı ilerlemek demek değil.

En büyük değeri veren yön ise gradyanın kendi yönü ve verdiği değer tam olarak gradyanın uzunluğu. Bunun sebebi 91\. makalede kurduğumuz eşitsizliktir: iki vektörün nokta çarpımı, uzunluklarının çarpımını aşamaz ve eşitlik yalnızca yönler çakışınca gerçekleşir. Birim yönün uzunluğu 1 olduğuna göre, yönlü türev en fazla gradyanın uzunluğu kadar olur.

Yani "gradyanın tersine git" bir sezgi ya da bir gelenek değil; **kanıtlanmış bir seçim**. Bütün birim yönler arasında kaybı en hızlı azaltan yön odur. 2\. makaledeki sisli vadi benzetmesinin altındaki matematik budur.

Bir sınır hemen eklenmeli: bu teorem **o noktada**, **sonsuz küçük** bir adım için geçerlidir. Sonlu bir adım attığın anda garanti biter ve mesele adımın uzunluğuna geçer.

## Adımın tavanı eğrilikten geliyor

O hâlde adım ne kadar uzun olabilir? Cevabı görmek için kaybı bulunduğun noktanın çevresinde ikinci mertebeye kadar açalım: kayıp, biraz oynadığında, gradyanın verdiği doğrusal terimle azalır ve ikinci türevin verdiği karesel terimle geri artar. Adım küçükken birinci terim baskındır ve kayıp düşer; adım büyüdükçe ikinci terim yetişir ve fazlalık kaybı geri yükseltir.

Kısmi ikinci türevlerin oluşturduğu matrisin adı **Hessian**'dır ve simetriktir. 92\. makalede simetrik matrislerin özdeğerlerinin gerçek, özvektörlerinin de birbirine dik olduğunu görmüştük; Hessian'ın özdeğerleri o yönlerdeki **eğriliği** verir. Bir yönde eğrilik büyükse çanak o yönde dardır ve küçük bir adım bile karşı yamaca tırmanır.

Tek yönlü bir çanakta hesap kapalı biçimde çıkar: eğrilik λ ise, güncelleme her adımda en iyi noktaya olan uzaklığı (1 − αλ) çarpanıyla çarpar. Nedeni kısa: böyle bir çanakta eğim, en iyi noktaya olan uzaklığın λ katıdır; α ile çarpılmış bir adım uzaklıktan αλ kadar payı çıkarır ve geriye (1 − αλ) kat uzaklık kalır. Uzaklığın küçülmesi için bu çarpanın mutlak değeri 1'den küçük olmalı, yani **α < 2/λ**.

Şimdi 2\. makaleye dönelim. Orada üç evlik oyuncak problemde eşiği "çanağın dikliği" dediğimiz 9,333 sayısından kurmuş, beş öğrenme oranıyla deneyip α < 3/14 ≈ 0,214 yazmıştık. Kaybımız L(w) = ⅓ × [(w−2)² + (2w−4)² + (3w−7)²] idi; ikinci türevi (2/3) × (1 + 4 + 9) = **28/3 ≈ 9,333** — o dikliğin biçimsel adı ikinci türevdir. Genel kuralı uygula: 2 ÷ (28/3) = 6/28 = **3/14**. Aynı sayı, bu kez tek bir oyuncak problemin hesabı değil, her çanakta geçerli bir kuralın sonucu.

![İki panelli bir şekil. Sol panel 2. makalenin ölçümü başlığını taşır ve beş satırlık bir tablo içerir; sütunlar öğrenme oranı alfa, uzaklık çarpanı ve sonuç. Satırlar sırasıyla: 0,0500 için çarpan artı 0,5333, düzgün yakınsar; 0,1000 için çarpan artı 0,0667, çok hızlı yakınsar; 0,2000 için çarpan eksi 0,8667, salınarak yakınsar; 0,2143 için çarpan eksi 1,0000, kıl payı ıraksar; 0,2500 için çarpan eksi 1,3333, patlar. Panelin altında bu tablonun deneyerek bulunduğu yazılıdır. Sağ panel genel kural başlığını taşır ve üç satırlık bir türetme içerir: kaybın ikinci türevi lambda eşittir üçte iki çarpı ondört eşittir 28 bölü 3 eşittir 9,333; uzaklık çarpanı bir eksi alfa çarpı lambda; yakınsama koşulu alfa küçüktür iki bölü lambda eşittir 6 bölü 28 eşittir 3 bölü 14 eşittir 0,2143. Sağ panelin altında bu sayının hiçbir deney yapılmadan çıktığı yazılıdır. İki panelin arasında bir bağ oku ve üstünde aynı sayı, iki yoldan yazısı vardır. En altta bir kayıt: buradaki lambda Hessian'ın tek özdeğeridir, çünkü modelin tek bir parametresi vardır.](assets/esik-nereden-cikiyor.svg "Şekil 2 — Aynı eşik, ölçümden ve teoremden")

Şekil 2 iki yolu yan yana koyuyor. Soldaki tablo 2\. makalenin deney kaydı; sağdaki üç satır aynı sayıyı ikinci türevden türetiyor. Bilinçli formalizasyonun ne demek olduğu tam olarak bu: elimizde zaten doğru bir sayı vardı, şimdi nereden geldiğini biliyoruz.

Pratikteki karşılığı da doğrudan. Bir eğitim koşusunda "kayıp NaN oldu" satırını gördüğünde, öğrenme oranı o noktadaki en büyük eğriliğin izin verdiği tavanı aşmıştır. Tavan verinin ölçeğine ve modelin bulunduğu yere bağlı olduğu için sabit de değildir.

> **Kendini yokla:** Bir modelde bütün eğrilikler yarıya inseydi, kullanılabilecek en büyük öğrenme oranına ne olurdu?

İki katına çıkardı. Tavan 2/λ olduğuna göre λ yarıya inince eşik iki katına çıkar. Bunun pratik bir yankısı var: girdileri ölçeklemek ya da katman çıktılarını normalleştirmek kaybın kendisini değiştirmiyormuş gibi görünür, ama eğrilikleri değiştirdiği için kullanılabilir öğrenme oranını değiştirir.

## Aynı eğrilik ikinci faturayı da kesiyor

Tavanı en **büyük** eğrilik belirliyor. Ama ilerleme hızını en **küçük** eğrilik belirliyor — ve arada uçurum olabilir.

En büyük özdeğerin en küçüğe oranına **koşul sayısı** (condition number) denir. Sezgisi geometrik: koşul sayısı 1 ise çanak küresel, büyükse çanak uzun ve dar bir vadidir. Vadide dik yamaç seni oraya buraya savurur, uzun eksen boyunca ise ancak sürünürsün.

Sayıyla görelim. f(w) = ½(w₁² + 20w₂²) alalım; eğrilikler 1 ve 20, koşul sayısı 20. Sabit adımlı gradyan inişinde en iyi seçim α = 2/(1 + 20) = 0,09524'tür ve bu adımda iki eksenin çarpanları +0,90476 ile −0,90476 olur: biri düzgün ilerler, öbürü salınır, ikisi de aynı hızda küçülür. (20; 1) noktasından başlayan gerçek koşu, uzaklığı 20,025'ten 46 adımda 0,2005'e (başlangıcın yüzde 1,001'ine) indiriyor; 47. adımda yüzde birin altına iniyor.

Léon Bottou, Frank Curtis ve Jorge Nocedal'in SIAM Review'da 2018'de yayımladığı derleme bu hızı başka bir yöntemle karşılaştırıyor. Koşul sayısı κ olan bir çanakta sabit adımlı gradyan inişi uzaklığı her adımda (κ−1)/(κ+1) çarpanıyla küçültür. Her adımda bir önceki adımın yönünü de hesaba katan **momentum**'lu sürüm — Boris Polyak'ın 1964 tarihli çalışmasında kurduğu ağır top yöntemi — aynı çanakta (√κ−1)/(√κ+1) verir. Fark kökün altında duruyor ve kök büyük sayılarda çok şey demek.

Sayı koyalım (adım sayıları bu çarpanlardan bizim hesabımız). κ 20 iken gradyan inişinin çarpanı 0,9048 ve uzaklığı yüzde bire indirmek 47 adım sürüyor; momentumun çarpanı 0,6345 ve 11 adım — yaklaşık 4,3 kat. κ 100'e çıkınca çarpanlar 0,9802 ile 0,8182, adım sayıları 231 ile 23 — 10 kat. Kazanç koşul sayısıyla birlikte büyüyor, çünkü gereken adım sayısı gradyan inişinde κ ile, momentumda yalnızca √κ ile orantılı artıyor.

![Uzun ve dar bir vadinin eşyükselti çizgileri üzerinde iki eniyileme yolu. Çanak yarım çarpı w1 kare artı 20 w2 kare; iki eksen aynı ölçekte, koşul sayısı 20. Sağda (20; 1) başlangıç, solda (0; 0) en iyi nokta. Gradyan inişinin yolu dar eksende her adımda işaret değiştirerek savrulur ve uzun eksende küçük adımlarla sürünür; başlangıç uzaklığının yüzde birine 47 adımda iner. Momentumun yolu ilk adımlarda daha geniş salınır ama uzun eksende çok daha büyük adımlar atar; yüzde bire 15 adımda iner. Adımlar noktayla işaretli; onuncu adımda momentum en iyi noktaya neredeyse varmışken gradyan inişi uzun eksenin ortasındadır. Altta kayıt: yollar gradyan inişi için alfa 0,0952, momentum için alfa 0,1336 ve beta 0,4026 ile hesaplanmıştır.](assets/kosul-sayisi-vergisi.svg "Şekil 3 — Aynı vadide iki yol")

Şekil 3 aynı çanakta iki gerçek koşuyu çiziyor; onuncu adımlarına bakmak farkı tek bakışta veriyor. Gradyan inişi dar eksende her adımda karşı yamaca savruluyor ve uzun eksen boyunca sürünüyor; tavanı en büyük eğrilik, hızı en küçük eğrilik belirlediği için ikisinin arasında sıkışmış durumda. Momentum ilk adımlarda daha geniş salınıyor, ama vadinin uzun ekseni boyunca üst üste binen katkıları biriktirirken dik yamaçtaki ileri geri savrulmaları birbirine götürüyor. Bir ayrıntı dikkat istiyor: şekildeki momentum koşusu yüzde bire 11 değil 15 adımda iniyor. Çarpan formülü uzun vadeli hızı verir; koşunun başındaki geçiş evresi birkaç adım ekler. Yine de gradyan inişinin 47 adımının üçte birinden az.

Bu bölümdeki sayılar bir çanak için. Sinir ağının kayıp yüzeyi çanak değil ve Hessian'ı yüz milyarlarca satırlı olduğu için özdeğerleri hiç hesaplanmaz. Ama sezgi taşınıyor: **eniyileyicilerin tarihi, koşul sayısını görmeden onun faturasını azaltma denemelerinin tarihidir.**

## Her yöne kendi adımı

Tek bir öğrenme oranı bütün parametreler için kullanılıyor — oysa parametrelerin gradyan ölçekleri birbirinden kat kat farklı. John Duchi, Elad Hazan ve Yoram Singer'ın JMLR'de 2011'de yayımladığı AdaGrad bu soruna ilk sistematik cevabı verdi: her parametrenin adımını, o parametrenin geçmiş gradyanlarının karelerinin toplamının kareköküne böl. Çok oynayan yön yavaşlar, az oynayan yön hızlanır.

AdaGrad'ın kusuru, toplamın hiç azalmaması ve adımların zamanla sıfıra sürünmesiydi. Çözüm toplam yerine üstel ortalama almak oldu. Diederik Kingma ve Jimmy Ba'nın ICLR 2015'te sunduğu **Adam** bunu momentumla birleştirir: gradyanın kendisinin üstel ortalaması yönü verir, karesinin üstel ortalaması ölçeği; ikisi de sıfırdan başladığı için ilk adımlarda düşük çıkar ve bir düzeltme çarpanıyla düzeltilir. Çalışmanın önerdiği varsayılan değerler bugün de yerinde duruyor: adım 0,001, ortalama katsayıları 0,9 ve 0,999.

Adam'ın ne yaptığını en açık gösteren şey ilk adımıdır ve elle hesaplanabilir. Düzeltme çarpanları uygulandığında ilk adımda gradyanın ortalaması gradyanın kendisine, karesinin ortalaması gradyanın karesine eşit çıkar; bölüm de gradyanın işaretine iner. Yani **ilk adımda her parametre tam olarak öğrenme oranı kadar oynar** — gradyanı 0,001 olan da, 10 olan da.

![İki panelli bir şekil. Sol panel Adam'ın ilk adımı başlığını taşır. Kurulum satırında öğrenme oranı 0,001 ve katsayılar 0,9 ile 0,999 yazılıdır. İki satırlık bir tablo vardır; sütunlar gradyan, gradyan inişinin adımı ve Adam'ın ilk adımı. Birinci satır gradyan 0,001 için gradyan inişi 0,00000100, Adam 0,00099999. İkinci satır gradyan 10 için gradyan inişi 0,01000000, Adam 0,00100000. Panelin altında gradyan inişinde iki adım arasında on bin kat fark olduğu, Adam'da fark olmadığı yazılıdır. Sağ panel aynı sanılan iki şey başlığını taşır. İki ağırlık karşılaştırılır; ikisinin de değeri 1,0 ve sönüm katsayısı 0,01. Sütunlar uyarlamalı payda, kayba ceza yolundaki etkin sönüm ve ayrık sönüm. Birinci satırda payda 10 için kayba ceza 1,0 çarpı on üzeri eksi altı, ayrık sönüm 1,0 çarpı on üzeri eksi beş. İkinci satırda payda 0,1 için kayba ceza 1,0 çarpı on üzeri eksi dört, ayrık sönüm yine 1,0 çarpı on üzeri eksi beş. Panelin altında ceza yolunda yüz kat fark olduğu, ayrık yolda fark olmadığı yazılıdır. Altta bir kutuda iki cümle durur: Adam'ın ilk adımı gradyanın büyüklüğünü değil yalnızca işaretini kullanır; ve kayba yazılan ceza da uyarlamalı paydadan geçer, ayrık sönüm onu paydanın dışına çıkarır. En altta bir kayıt: bütün değerler kaynakların verdiği güncelleme kurallarından elle hesaplanmıştır.](assets/adamin-iki-duzeltmesi.svg "Şekil 4 — Adam ne yapıyor, AdamW neyi ayırıyor")

Şekil 4'ün sol paneli bunu iki gradyanla gösteriyor. Gradyan inişinde iki adım arasında on bin kat fark varken Adam'da fark yok. Frederik Kunstner ve arkadaşlarının ICLR 2023'te sunduğu çalışma bu gözlemin peşine düşüyor. Alanda yaygın açıklama, Adam'ın transformer eğitiminde SGD'yi geçmesinin gradyan gürültüsünün ağır kuyruklu olmasından kaynaklandığıydı. Yazarlar yığın büyüklüğünü bütün veri kümesine kadar büyüterek gürültüyü tamamen ortadan kaldırıyorlar ve fark **kapanmıyor**, hatta açılıyor. Kalan aday ise Adam'ın işaret benzeri davranışı: momentumlu işaret inişi, büyük yığında Adam'ı yakından izliyor.

Adam'ın hikâyesinin bir de kanıtla ilgili bir dersi var. Sashank Reddi, Satyen Kale ve Sanjiv Kumar'ın ICLR 2018'de sunduğu çalışma, özgün makalenin yakınsama kanıtındaki hatayı buldu ve bunu tek boyutlu, dışbükey, akla gelebilecek en basit örnekle gösterdi: üç adımda bir büyük gradyan, diğer iki adımda küçük ve ters yönlü gradyan gelen bir problemde Adam, aralıktaki **en kötü** noktaya yakınsıyor. Aynı problemde sıradan gradyan inişi ile AdaGrad doğru noktaya gidiyor. Yazarların önerdiği düzeltmenin adı AMSGrad; ama asıl kalıcı olan, alanın en yaygın kullanılan eniyileyicisinin arkasındaki kanıttaki hatanın üç yıl boyunca fark edilmemiş olması.

## Kayba yazılan ceza ile sönüm aynı şey değil

8\. makalede ön eğitimde kullanılan kuralın adının genellikle AdamW olduğunu söylemiş, gerekçesini de bir cümleyle geçmiştik. Şimdi hesabı yapabiliriz.

Ağırlıkları küçük tutmanın iki yolu var. Birincisi kayba ağırlıkların büyüklüğüyle orantılı bir ceza eklemek; ikincisi her adımda ağırlığı doğrudan küçük bir çarpanla küçültmek. Sıradan gradyan inişinde ikisi aynı kapıya çıkar. Uyarlamalı bir eniyileyicide çıkmaz, çünkü **cezanın gradyanı da uyarlamalı paydadan geçer**.

Şekil 4'ün sağ paneli bunu iki ağırlıkla gösteriyor. İkisinin de değeri 1,0, sönüm katsayısı 0,01. Ama biri gradyanları büyük bir yönde duruyor, öbürü küçük. Kayba ceza yazan yolda birincinin etkin sönümü 10⁻⁶, ikincininki 10⁻⁴ — arada yüz kat. Ayrık sönüm yolunda ikisi de 10⁻⁵. Ilya Loshchilov ve Frank Hutter'ın ICLR 2019'da sunduğu çalışma bu ayrımı yaptı ve iki sonuç bildirdi: en iyi sönüm katsayısı artık öğrenme oranından bağımsız seçilebiliyor ve Adam'ın genelleme başarısı, o güne dek momentumlu SGD'nin gerisinde kaldığı görüntü görevlerinde onunla yarışır hâle geliyor.

Karıştırılması kolay iki kavramın öğretici bir örneği bu: iki şey yıllarca aynı sanıldı, çünkü tek bir özel durumda — sıradan gradyan inişinde — gerçekten aynıydılar.

## Çizelgelerin gerekçesi

8\. makalede öğrenme oranı çizelgesini bir olgu olarak okuduk: kısa bir doğrusal ısınma, uzun bir kosinüs sönümü. İki kolun da gerekçesi artık elimizde.

Sönümün gerekçesi 2\. makalede Herbert Robbins ve Sutton Monro'nun 1951 tarihli sonucuydu; şimdi mekanizmasını söyleyebiliriz. Sabit adımlı stokastik gradyan inişi bir noktaya yakınsamaz; en iyi noktanın etrafında, yarıçapı adım boyuyla ve gradyan gürültüsüyle orantılı bir bulutta dolaşır. Adımı küçültmek bulutu daraltır. Çizelge, bu bulutu koşu boyunca planlı biçimde küçültmenin adıdır.

Isınmanın gerekçesi ikili. Uyarlamalı yöntemlerde payda ilk adımlarda birkaç örnekten kestirildiği için güvenilmezdir; adımı küçük tutmak o kestirim oturana kadar korunmayı sağlar. Öte yandan yığın büyüdükçe gradyan tahmini iyileşir ve daha büyük adım kaldırır: Priya Goyal ve arkadaşlarının 2017'de yayımladığı ve hakemli olmayan çalışma, öğrenme oranını yığınla doğru orantılı büyüten kuralı ve onu ayakta tutan ısınmayı birlikte kullanarak, 8.192 örneklik yığınla ImageNet'te doğruluk kaybetmeden eğitim yapıyor.

Gradyan kırpmanın gerekçesi ise doğrudan bu makalenin tavan hesabına bağlanıyor. Jingzhao Zhang ve arkadaşlarının ICLR 2020'de sunduğu çalışmanın ölçtüğü şey şu: sinir ağı eğitiminde eğrilik sabit değil ve **gradyanın büyüklüğüyle birlikte artıyor**. Yani gradyan büyüdüğü anda 2/λ tavanı da alçalıyor; sabit bir öğrenme oranı tam o anda güvenli olmaktan çıkıyor. Kırpma bu durumda ad hoc bir emniyet valfi değil, tavana uyum sağlamanın en ucuz biçimi — ve yazarlar bu koşul altında kırpmanın sabit adımlı gradyan inişinden ispatlanabilir biçimde hızlı olduğunu gösteriyor.

## Yüzeyin biçimini hangi cetvel ölçüyor

Faz boyunca aynı soruyu soruyoruz: bir sayı hangi cetvelden geliyor? Eniyilemede bu sorunun en öğretici örneği "düz minimum" tartışmasıdır.

Nitish Shirish Keskar ve arkadaşlarının ICLR 2017'de sunduğu çalışma büyük yığınlarla eğitilen modellerin küçük yığınlarla eğitilenlere göre yüzde 5'e varan bir genelleme farkı gösterdiğini ölçtü ve bunu bulunan minimumun **keskinliğine** bağladı: büyük yığın keskin, küçük yığın düz minimuma iniyor. Sezgi çekici — düz bir dip, parametreler biraz oynasa da kaybın az değiştiği yerdir.

Laurent Dinh ve arkadaşlarının ICML 2017'de sunduğu çalışma bu sezgiyi kırdı. Doğrultucu aktivasyon kullanan ağlarda parametreleri, ağın hesapladığı fonksiyonu **hiç değiştirmeden** yeniden ölçeklemek mümkündür: bir katmanı çarptığın sayıyla bir sonrakini bölersen çıktı aynı kalır. Ama Hessian değişir. Yani aynı fonksiyona karşılık gelen, istediğin kadar keskin bir minimum kurulabilir. Keskinlik ölçüsü, ölçtüğü şeyin bir özelliği değil, koordinat seçiminin bir özelliği.

Hao Li ve arkadaşlarının NeurIPS 2018'de sunduğu çalışma bunun görselleştirmedeki karşılığını gösterdi. Kayıp yüzeyinin o tanıdık üç boyutlu resimleri rastgele iki yön seçilip kaybın o düzlemde çizilmesiyle üretilir; ama yönler ağırlıkların kendi ölçeğine göre normalleştirilmezse resim büyük ölçüde ölçek farkını çizer. Yazarların ifadesi açık: normalleştirme yapılmadığında çizimler düzlük ile genelleme arasında tutarlı bir ilişki göstermiyor. Süzgeç normalleştirmesiyle yeniden çizildiğinde büyük ve küçük yığının farkı hâlâ görünüyor, ama **çok daha ince**.

> **Kendini yokla:** "Bu model daha düz bir minimuma indi" cümlesi tek başına neden bir şey söylemez?

Çünkü düzlük parametrelerin nasıl yazıldığına bağlıdır ve aynı fonksiyon farklı yazımlarda farklı düzlük değeri verir. Cümlenin bilgi taşıması için ölçünün hangi normalleştirmeyle alındığı söylenmeli. 94\. makaledeki KL uyarısıyla aynı kalıp: yönü ya da ölçeği belirtilmemiş bir sayı, sayı değildir.

Bu belirsizlik pratikte seçim yapmayı da zorlaştırıyor. Robin Schmidt, Frank Schneider ve Philipp Hennig'in ICML 2021'de sundukları karşılaştırma, on beş yaygın eniyileyiciyi standart bir düzenekte 50.000'den fazla koşuyla sınıyor ve iki sonuç veriyor: hiçbir yöntem bütün görevlerde açık ara önde değil, ve **birkaç eniyileyiciyi varsayılan ayarlarıyla denemek, tek bir eniyileyicinin hiperparametrelerini ayarlamakla aşağı yukarı aynı sonucu veriyor.** Adam hâlâ güçlü bir aday; sonraki yöntemler onu tutarlı biçimde geçemiyor.

### Sırada ne var

Artık kaybı azaltan mekanizmayı biliyoruz: yön bir teoremden geliyor, adımın tavanı eğrilikten, hızı koşul sayısından; modern eniyileyiciler de bu faturaların farklı kalemlerini ödüyor. Ama bir soru bütün bölüm boyunca sessizce duruyordu. Azalttığımız şey **eğitim kümesindeki** kayıptı ve 94\. makalede o kaybın gerçek dağılıma göre değil, elimizdeki örneklerin ampirik dağılımına göre ölçüldüğünü söylemiştik. Eniyileme ne kadar iyi çalışırsa çalışsın, yanlış hedefi mükemmel biçimde vurabilir. Bir sonraki makale şu soruya bakıyor: eğitimde ölçtüğümüz sayı ile görülmemiş veride alacağımız sayı arasındaki farkın adı nedir, ne kadarı kaçınılmazdır ve klasik cevabın büyük ölçekte neden tutmadığı ortaya çıktı?

## Kaynakça

- Boyd, S. & Vandenberghe, L. (2004). *Convex Optimization*, §9.3 Gradient descent method, s. 466–475. Cambridge University Press. [Bağlantı](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)
- Bottou, L., Curtis, F. E. & Nocedal, J. (2018). *Optimization Methods for Large-Scale Machine Learning*. SIAM Review 60(2), 223–311. [Bağlantı](https://arxiv.org/abs/1606.04838)
- Polyak, B. T. (1964). *Some methods of speeding up the convergence of iteration methods*. USSR Computational Mathematics and Mathematical Physics 4(5), 1–17. [Bağlantı](https://doi.org/10.1016/0041-5553%2864%2990137-5)
- Robbins, H. & Monro, S. (1951). *A Stochastic Approximation Method*. Annals of Mathematical Statistics 22(3), 400–407. [Bağlantı](https://doi.org/10.1214/aoms/1177729586)
- Duchi, J., Hazan, E. & Singer, Y. (2011). *Adaptive Subgradient Methods for Online Learning and Stochastic Optimization*. Journal of Machine Learning Research 12, 2121–2159. [Bağlantı](https://www.jmlr.org/papers/v12/duchi11a.html)
- Kingma, D. P. & Ba, J. (2015). *Adam: A Method for Stochastic Optimization*. ICLR 2015. [Bağlantı](https://arxiv.org/abs/1412.6980)
- Reddi, S. J., Kale, S. & Kumar, S. (2018). *On the Convergence of Adam and Beyond*. ICLR 2018. [Bağlantı](https://openreview.net/forum?id=ryQu7f-RZ)
- Loshchilov, I. & Hutter, F. (2019). *Decoupled Weight Decay Regularization*. ICLR 2019. [Bağlantı](https://openreview.net/forum?id=Bkg6RiCqY7)
- Kunstner, F., Chen, J., Lavington, J. W. & Schmidt, M. (2023). *Noise Is Not the Main Factor Behind the Gap Between SGD and Adam on Transformers, but Sign Descent Might Be*. ICLR 2023. [Bağlantı](https://openreview.net/forum?id=a65YK0cqH8g)
- Zhang, J., He, T., Sra, S. & Jadbabaie, A. (2020). *Why Gradient Clipping Accelerates Training: A Theoretical Justification for Adaptivity*. ICLR 2020. [Bağlantı](https://openreview.net/forum?id=BJgnXpVYwS)
- Goyal, P., Dollár, P., Girshick, R., Noordhuis, P., Wesolowski, L., Kyrola, A., Tulloch, A., Jia, Y. & He, K. (2017). *Accurate, Large Minibatch SGD: Training ImageNet in 1 Hour*. Hakemli olmayan ön çalışma (arXiv:1706.02677). [Bağlantı](https://arxiv.org/abs/1706.02677)
- Keskar, N. S., Mudigere, D., Nocedal, J., Smelyanskiy, M. & Tang, P. T. P. (2017). *On Large-Batch Training for Deep Learning: Generalization Gap and Sharp Minima*. ICLR 2017. [Bağlantı](https://openreview.net/forum?id=H1oyRlYgg)
- Dinh, L., Pascanu, R., Bengio, S. & Bengio, Y. (2017). *Sharp Minima Can Generalize For Deep Nets*. ICML 2017, PMLR 70, 1019–1028. [Bağlantı](https://proceedings.mlr.press/v70/dinh17b.html)
- Li, H., Xu, Z., Taylor, G., Studer, C. & Goldstein, T. (2018). *Visualizing the Loss Landscape of Neural Nets*. NeurIPS 2018. [Bağlantı](https://papers.nips.cc/paper_files/paper/2018/hash/a41b3bb3e6b050b6c9067c67f663b915-Abstract.html)
- Schmidt, R. M., Schneider, F. & Hennig, P. (2021). *Descending through a Crowded Valley — Benchmarking Deep Learning Optimizers*. ICML 2021, PMLR 139, 9367–9376. [Bağlantı](https://proceedings.mlr.press/v139/schmidt21a.html)
