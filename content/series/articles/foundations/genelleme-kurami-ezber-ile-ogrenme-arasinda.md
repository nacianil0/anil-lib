---
article_id: article_8b41d7e0-32c6-4f95-a1d3-5e7c9082ab64
title: "Genelleme Kuramı: Ezber ile Öğrenme Arasında"
slug: genelleme-kurami-ezber-ile-ogrenme-arasinda
category: foundations
level: advanced
reading_order: 96
summary: "95. makalede kaybı azaltmayı öğrendik; ama azalttığımız sayı umursadığımız sayı değil. Bu makale aradaki farkın klasik ayrışımını kuruyor ve o ayrışımın büyük ölçekte neden yetmediğini gösteriyor. Yanlılığı sıfır olan tahminci en iyi tahminci değildir: tek gözlemli bir örnekte yansız seçim 1,5000, bilerek yanlı olan 1,0909 hata veriyor — düzenlileştirmenin bütün gerekçesi bu. Zhang ve arkadaşlarının deneyi klasik çerçeveyi kırdı: aynı ağ, aynı sıfır eğitim hatası, bir yanda yüzde 85,75 test doğruluğu, öbür yanda 9,78. Nakkiran ve arkadaşları çift inişi üç eksende birden ölçtü ve dördün katı veri eklemenin başarıyı düşürdüğü bir bölge gösterdi. Ve genellemeyi öngörmek için türetilmiş kuramsal sınırlardan biri, on bin model üzerinde ölçüldüğünde modelleri ters sıralıyor."
tags:
  - genelleme
  - yanlilik-oynaklik
  - cift-inis
  - ezber
  - duzenlilestirme
content_hash: sha256:7bdfa51982ce8ab2d0134950c75b7f2d8855254e2783d010ebed35bc086be28c
classification_version: 1
classification_batch: 23
revised_at: "2026-09-25"
revision_note: "Yanlılık–oynaklık tablosu, toplamın U biçimini ve dibin nereden geldiğini gösteren hesaplanmış eğrilere dönüştü; en iyi katsayının kökeni açıklandı."
---
## Azalttığımız sayı, umursadığımız sayı değil

95\. makalede kaybı azaltan mekanizmayı kurduk: yön bir teoremden geliyor, adımın tavanı eğrilikten, hızı koşul sayısından. Eniyileme artık bir sır değil.

Ama 94\. makalede sessizce bir şey söylemiştik. Eğitim kaybı, gerçek dağılıma göre değil, elimizdeki örneklerin **ampirik dağılımına** göre hesaplanır. Bu iki dağılım aynı değil. Yani eniyileyici ne kadar iyi çalışırsa çalışsın, yanlış hedefi mükemmel biçimde vurabilir.

Bu makalenin işi tek cümle: **eğitimde ölçtüğümüz sayı ile görülmemiş veride alacağımız sayı arasındaki farkı ayrıştırmak** ve klasik ayrışımın nerede kırıldığını göstermek. Sonuç, fazın tonunu bir kez daha kuracak: burada da cevap, hangi cetveli seçtiğine bağlı.

## Hatanın üç parçası

2\. makalede aşırı öğrenmeyi ölçmüş, Stuart Geman, Elie Bienenstock ve René Doursat'ın 1992 tarihli incelemesinin ayrışımını adıyla anmıştık: karesel kayıpta test hatası üçe bölünür. Şimdi üçünü tanımlayalım.

Bir tahmincinin belirli bir girdideki hatasını, bütün olası eğitim kümeleri üzerinden ortalayarak düşün. **Yanlılık** (bias), tahmincinin ortalamada gerçek değeri ne kadar kaçırdığıdır — modelin fazla katı olmasından gelir. **Oynaklık** (variance), farklı eğitim kümelerinde tahminin ne kadar oynadığıdır — modelin fazla esnek olup gürültüyü kovalamasından gelir. **İndirgenemez hata** ise verinin kendi gürültüsüdür ve 2\. makalede gördüğümüz gibi hiçbir model onu azaltamaz. Karesel kayıpta beklenen hata bu üçünün toplamına **tam olarak** eşittir.

Buradaki asıl ders toplamın kendisi değil, toplamın hangi yönde en küçüldüğü. Elle görelim. Gerçek değeri 2,0 olan bir büyüklüğü, gürültü varyansı 1,5 olan tek bir ölçümle kestirmeye çalışalım. Tahmincimiz ölçümü bir c katsayısıyla çarpsın. İki kalemi sözle kurmak kolay. Ölçüm ortalamada 2,0 olduğuna göre tahmin ortalamada c × 2,0'dır; yanlılık, bunun gerçek değerden farkı: (c − 1) × 2,0. c 1'den küçükse tahmin ortalamada gerçeğin altında kalır. Oynaklık ise ölçümün gürültüsünün c ile ölçeklenmiş hâlidir: c² × 1,5. Ölçümü küçülttükçe gürültüsü de küçülür. Örneğin c = 0,5'te yanlılığın karesi 1,0, oynaklık 0,375, toplam 1,375.

![Üç eğrili bir grafik. Kurulum: gerçek değer 2,0, gürültü varyansı 1,5, tahminci ölçümü c katsayısıyla çarpar. Yatay eksen katsayı c, 0'dan 1,1'e; düşey eksen beklenen hata, 0'dan 4'e. Yanlılığın karesi c eşittir 0'da 4'ten başlayıp c eşittir 1'de sıfıra iner. Oynaklık sıfırdan başlayıp c eşittir 1'de 1,5'e çıkar; iki eğri c yaklaşık 0,62'de kesişir. Toplam eğrisi U biçimindedir: c eşittir 0'da 4,0, dibi c eşittir 0,7273'te 1,0909 ile vurgulanmıştır, c eşittir 1'deki yansız seçim 1,5000'dir. Altta kayıt: eğriler yanlılık kare eşittir 4 çarpı 1 eksi c'nin karesi ve oynaklık eşittir 1,5 çarpı c kare formüllerinden hesaplanmıştır; tahminde gürültünün kendisi, 1,5, her noktaya eklenir ve eğrilerin biçimini değiştirmez.](assets/yanlilik-oynaklik-takasi.svg "Şekil 1 — Yansız tahminci en iyi tahminci değildir")

Şekil 1 iki kalemi ve toplamlarını aynı eksende çiziyor; bu makalenin ilk sürprizi toplam eğrisinin dibinde. c = 1 seçmek, yani ölçümü olduğu gibi kullanmak, **yansız** bir tahminci verir: ortalamada tam 2,0. Ama hatası 1,5000. Dip ise c = 8/11 ≈ 0,7273'te: tahminciyi bilerek yanlı yapmak hatayı 1,0909'a indiriyor — yüzde 27,3 daha az. Yanlılığın maliyeti 0,2975; oynaklıktan kazandırdığı 0,7066. Dibin yeri de bir oran: gerçek değerin karesi 4, gürültü 1,5; en iyi c = 4 ÷ (4 + 1,5) = 8/11. Gürültü büyüdükçe en iyi c küçülür, yani tahminci ölçüme daha az güvenir.

Bir sınırı da söyleyelim: dibi bulmak için gerçek değeri bilmemiz gerekti. Pratikte bilmediğimiz için ceza katsayısını doğrulama verisinde deneyerek ayarlarız; takasın yönü ise değişmez — biraz yanlılığı kabul etmek, oynaklığı ondan daha fazla düşürür.

Düzenlileştirmenin gerekçesi bu dipte. 2\. makalede polinom katsayılarına eklenen minik ceza tam olarak bunu yapıyordu: modeli bilerek yanlı hâle getirip oynaklığını düşürmek. 93\. makalede en büyük olabilirliğin kusuru olarak andığımız şey de aynı yerden bakılıyor — sonlu veriyi en iyi açıklayan parametre, en iyi tahmin eden parametre olmak zorunda değil.

Ayrışımın bir sınırı hemen söylenmeli: bu temiz üçe bölünme **karesel kayba** özgüdür. Dil modelinin kullandığı çapraz entropi kaybında ya da doğruluk gibi 0-1 ölçülerinde böyle bir toplamsal ayrışım kendiliğinden gelmez; benzer çerçeveler kurulabilir ama terimlerin toplanır olması artık bir seçimdir, bir teorem değil.

> **Kendini yokla:** Bir modelin oynaklığı sıfırsa, o modelin iyi olduğunu söyleyebilir miyiz?

Hayır. Her girdiye sabit bir sayı söyleyen modelin oynaklığı tam sıfırdır ve Şekil 1'de c = 0 noktasında hatası en büyüktür: 4,0. Oynaklık tek başına bir kalite ölçüsü değil, toplamın bir kalemi.

## Klasik cevabın tutmadığı yer

Geman ve arkadaşlarının çerçevesi bir tahminde bulunuyordu: kapasite büyüdükçe oynaklık kontrolden çıkar, dolayısıyla çok parametreli modeller zor problemler için gerçekçi olmayan miktarda veri ister. 2\. makalede bu tahminin yanlış çıktığını söylemiştik. Şimdi nasıl çürütüldüğünü kuralım.

Chiyuan Zhang ve arkadaşlarının ICLR 2017'de sunduğu deneyi 72\. makalede ezber tartışmasının bir kanıtı olarak kullanmıştık. Burada asıl işini yapıyor: neyi çürüttüğünü göstermek. Yazarlar standart görüntü ağlarını iki kez eğitiyorlar — bir kez gerçek etiketlerle, bir kez etiketleri rastgele karıştırılmış aynı veriyle. Mimari aynı, eniyileyici aynı, hiperparametreler aynı.

![Altı satırlık bir tablo ve altında bir kutu. Üstte Zhang ve arkadaşlarının ICLR 2017 çalışmasının CIFAR-10 ölçümleri olduğu, mimarinin ve eniyileyicinin bütün satırlarda aynı olduğu yazılıdır. Sütunlar model, parametre sayısı, etiketler, eğitim doğruluğu ve test doğruluğu. Birinci satır Inception, 1.649.402 parametre, gerçek etiketler ve düzenlileştirme var, eğitim 100,0, test 89,05. İkinci satır aynı model, gerçek etiketler ve düzenlileştirme yok, eğitim 100,0, test 85,75. Üçüncü satır aynı model, rastgele etiketler, eğitim 100,0, test 9,78; bu satır vurguludur. Dördüncü satır MLP 1x512, 1.209.866 parametre, gerçek etiketler, eğitim 100,0, test 50,51. Beşinci satır aynı MLP, rastgele etiketler, eğitim 99,34, test 10,61. Altıncı satır ImageNet üzerinde rastgele bir milyon etiket için eğitim doğruluğu 95,20, test değeri verilmemiştir. Alttaki kutuda üç cümle durur: on sınıflı bir problemde rastgele tahminin doğruluğu yüzde 10'dur; aynı mimari aynı sıfır eğitim hatasına iki farklı dünyada ulaşıyor; ve yalnızca kapasiteye bakan bir sınır bu iki durumu ayırt edemez. En altta bir kayıt: bütün sayılar kaynağın birinci tablosundan alınmıştır.](assets/ayni-ag-iki-dunya.svg "Şekil 2 — Aynı sıfır eğitim hatası, iki farklı gerçek")

Şekil 2 sonucu veriyor. Aynı Inception ağı, rastgele etiketli veriyi de yüzde 100 eğitim doğruluğuyla öğreniyor; test doğruluğu ise 9,78, yani on sınıflı bir problemde rastgele tahminin düzeyi. ImageNet'te bir milyon rastgele etikette bile eğitim doğruluğu yüzde 95,20'ye çıkıyor.

Çürütülen şeyin adını koyalım. Vladimir Vapnik ile Alexey Chervonenkis'in 1971 tarihli çalışması, bir model ailesinin ne kadar farklı etiketlemeyi üretebildiğini sayan bir kapasite ölçüsü kurar ve eğitim hatasıyla gerçek hata arasındaki farkın, örnek sayısı büyüdükçe bu ölçüyle sınırlanan bir miktarın altında kaldığını gösterir. Yöntemin adı **düzgün yakınsama** (uniform convergence): sınır, ailedeki **bütün** modeller için aynı anda geçerli olmak zorundadır ve bu yüzden ailenin en kötü üyesine göre kurulur.

Rastgele etiket deneyinin kırdığı yer tam burası. Aynı aile, aynı yordamla, hem gerçek hem rastgele etiketi ezberleyebiliyorsa kapasite ölçüsü iki durumda da aynıdır — oysa test doğruluğundaki gerçek fark yaklaşık yetmiş altı puandır (85,75'e karşı 9,78). Yalnızca modele bakan bir sınır bu farkı ilkece açıklayamaz.

Vaishnavh Nagarajan ile Zico Kolter'ın NeurIPS 2019'da sunduğu çalışma bunu bir adım öteye taşıyor. İki bulgu veriyorlar. Birincisi ölçüm: literatürdeki sınırların birçoğu, eğitim kümesi **büyüdükçe** büyüyor — oysa daha çok veri daha iyi genelleme demek. İkincisi kurgu: gradyan inişiyle eğitilen aşırı parametreli doğrusal sınıflandırıcılarda, aileyi yalnızca gradyan inişinin gerçekten ürettiği ve test hatası küçük olan modellere daraltsan bile, düzgün yakınsama boş bir güvence veriyor. Yani sorun "yanlış aile seçildi" değil; yöntemin kendisi bu ortamda bilgi taşımıyor.

Öğretici tarafı, ilk deneyin ne **kadar** basit olması. Yeni bir kuram değil; bir veri kümesinin etiketlerini karıştırıp aynı eğitimi tekrarlamak. Bir alanın yıllardır kullandığı çerçeve, kimsenin yapmadığı beş satırlık bir kontrol deneyiyle sınırına götürüldü.

## U eğrisinin sağ yarısı

Klasik resim, kapasite arttıkça test hatasının U çizmesiydi. 2\. makalede bunu polinom tablosunda görmüş, 9\. makalede çift iniş randevusunu kapatmıştık: Mikhail Belkin ve arkadaşlarının PNAS'ta yayımlanan 2019 tarihli çalışması, kapasiteyi eğitim verisinin tam ezberlendiği noktanın ötesine taşıyınca test hatasının yeniden düşebildiğini gösterdi.

Preetum Nakkiran ve arkadaşlarının ICLR 2020'de sunduğu çalışma deseni derin ağlarda üç ayrı eksende ölçtü ve tek bir değişkende birleştirdi.

![Üç bloklu bir liste ve altında bir kutu. Üstte deney kurulumu yazılıdır: ResNet18, CIFAR-10, etiketlerin yüzde 15'i bozulmuş, Adam ile 4.000 dönem. Birinci blok modelin genişliği: test hatası önce düşer, eşiğin civarında yükselir, sonra yeniden düşer; yani daha büyük model bir aralıkta daha kötüdür. İkinci blok eğitim süresi: aynı desen dönem sayısında da vardır, tepe model sıfır eğitim hatasına ulaştığı sırada oluşur, yani uzun eğitmek aşırı öğrenmeyi düzeltebiliyor. Üçüncü blok örnek sayısı ve vurguludur: kritik bölgede dördün katı veri iyileştirmiyor, bir çeviri düzeneğinde daha çok veri hatayı yükseltiyor. Alttaki kutuda birleştirici değişken tanıtılır: etkin model karmaşıklığı, yani yordamın sıfır eğitim hatasıyla uydurabildiği en büyük örnek sayısı; üç eksen de bu sayının eşiği geçmesiyle açıklanıyor ve desen en güçlü biçimde etiket gürültüsü varken görülüyor. En altta bir kayıt: sayılar ve koşullar kaynağın düzeneğinden alınmıştır ve ölçülmemiş bir eğri çizilmemiştir.](assets/cift-inisin-uc-ekseni.svg "Şekil 3 — Aynı desen, üç farklı eksen")

Şekil 3'ün üçüncü satırına göre belirli bir bölgede eğitim verisini dörde katlamak test hatasını iyileştirmiyor, bir çeviri düzeneğinde ise doğrudan kötüleştiriyor. "Daha çok veri her zaman iyidir" cümlesi, koşulsuz doğru değil.

Üçünü birleştiren değişkenin adı **etkin model karmaşıklığı**: bir eğitim yordamının sıfır eğitim hatasıyla uydurabildiği en büyük örnek sayısı. Dikkat: bu sayı yalnızca mimarinin değil, yordamın tamamının bir özelliği — eniyileyici, süre ve düzenlileştirme dâhil. Tepe, bu sayı eldeki veri miktarına eşitlendiği kritik bölgede oluşuyor.

Sezgisi de bu tanımdan çıkıyor. Yordam veriyi ancak kıl payı uydurabiliyorsa, uyduran tek bir çözüm vardır ve o çözümü seçmekten başka seçenek yoktur — gürültü de dâhil her şeyi taşımak zorundadır. Kapasite arttıkça uyduran çözüm sayısı çoğalır ve bir sonraki bölümde kuracağımız örtük tercih devreye girer: aralarından daha basit olanı seçilebilir hâle gelir. Tepe, seçeneğin en az olduğu yerde oluşuyor.

Bir koşula dikkat: desen en güçlü biçimde **etiket gürültüsü varken** görülüyor. Kaynağın düzeneğinde etiketlerin yüzde 15'i bilerek bozulmuş; gürültü azaldıkça tepe küçülüyor. Bu, 9\. makaledeki dil modeli koşullarının neden U eğrisini kırmadığını da açıklıyor: orada veri boldur ve model aynı token'ı ezberleyecek kadar çok görmez.

Tartışmanın kapalı olmadığını 2\. ve 9\. makalelerde de söylemiştik: Alicia Curth ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma, klasik yöntemlerde gözlenen çift inişin büyük ölçüde yatay eksende neyin sayıldığına bağlı bir görüntü olduğunu savunuyor. Bu makalenin çerçevesinde bu itiraz bir tesadüf değil, bir örüntü: genelleme tartışmalarında sorunun çoğu, sayının değil **eksenin** seçiminde.

## Hangi çözüme indiğini eniyileyici seçiyor

Bir soru hâlâ ortada. Model eğitim kaybını sıfırlayan milyonlarca farklı parametre kümesi bulabiliyorsa, hangisine iniyor?

Cevap 95\. makaleye bağlanıyor: seçimi kayıp değil, eniyileyici yapıyor. Daniel Soudry ve arkadaşlarının JMLR'de 2018'de yayımladığı çalışma bunu en temiz durumda kanıtladı. Doğrusal olarak ayrılabilen veride, üstel biçimli bir kayıpla çalışan gradyan inişi, kaybı sıfıra götüren sonsuz çoklukta ayırıcı arasından belirli birine yaklaşır: iki sınıfa olan en küçük uzaklığı en büyükleyen ayırıcıya. Kayıp fonksiyonunda böyle bir istek yazılı değildir; tercih gradyan inişinin izlediği yoldan gelir.

Alandaki adı **örtük düzenlileştirme** (implicit regularization). Pratikteki karşılığı şu: bir modelin genellemesini, kaybına bakarak tam olarak açıklayamazsın, çünkü aynı kaybı veren çözümlerden hangisine indiğin eğitim yordamının ayrıntısına bağlıdır.

İki yankısı var. Birincisi, 95\. makaledeki eniyileyici seçimi masum bir hız kararı değil: yığın büyüklüğü, öğrenme oranı çizelgesi ve uyarlamalı payda, kaybı sıfırlayan çözümler kümesi içinde farklı yerlere iner. İkincisi, Şekil 3'teki etkin model karmaşıklığının neden yalnızca mimarinin değil yordamın tamamının özelliği olduğu buradan anlaşılıyor: eğitim süresi de düzenlileştirme de o kümeyi daraltır.

Bunun 94\. makaleyle bağı da doğrudan. Orada kaybı en küçültmenin, aritmetik kodlamayla sıkıştırma oranını en küçültmekle aynı şey olduğunu görmüştük. Verinin en kısa tarifini arayan bir ölçüt, kendiliğinden basit çözümleri tercih eder — çünkü karmaşık çözümü yazmak daha uzun sürer. Örtük düzenlileştirme bu tercihi kayba yazmadan, yalnızca yordamın gittiği yolla kuruyor.

## Gürültüyü ezberlemek ne zaman zarar vermiyor

Klasik resimde gürültüyü tam olarak uydurmak felakettir; 2\. makaledeki dokuzuncu derece polinom bunun ders kitabı örneğiydi. Ama derin ağlar tam da bunu yapıyor ve iyi tahmin ediyor. Bu ikisi nasıl bir arada durabilir?

Peter Bartlett ve arkadaşlarının PNAS'ta 2020'de yayımladığı çalışma soruyu, cevabın kapalı biçimde verilebildiği en sade ortamda soruyor: doğrusal regresyon. Sorulan şey şu — veriyi tam olarak uyduran çözümler arasından en küçük normlusu seçildiğinde, tahmin doğruluğu ne zaman eniyiye yakın kalır? Cevap, verinin kovaryans matrisinin **özdeğer dağılımına** bağlanıyor.

92\. makalenin dili burada doğrudan işe yarıyor. Kovaryans matrisinin büyük özdeğerlere karşılık gelen birkaç yönü sinyali taşır; geri kalan çok sayıdaki küçük özdeğerli yön ise tahmin için önemsizdir. Yazarların bulduğu koşul, bu önemsiz yönlerin sayısının örnek sayısını **belirgin biçimde** aşması. O zaman gürültü, tahmini bozmayan yönlere dağılıyor: model gürültüyü gerçekten ezberliyor, ama ezberi tahminin geçtiği yönlere bulaşmıyor.

Bu, aşırı parametreleşmenin neden bir kusur olmadığını gösteren en temiz kurulum: fazla boyut, gürültünün saklanabileceği zararsız yer demek. Sınırını da not edelim — sonuç doğrusal regresyon için ve belirli kovaryans profilleri altında kanıtlanmıştır; sinir ağları için aynı karakterizasyon elde yok.

## Ezber bir kusur değil, bir bütçe kalemi

72\. makalede Vitaly Feldman'ın STOC 2020'de sunduğu kuramsal sonucu anmıştık: doğal veri dağılımları uzun kuyrukludur ve nadir örnekleri ezberlemeyen bir algoritma, o alt topluluktan gelecek yeni örneği kaçırır. Kuram öyle diyordu; ölçüm ne diyor?

Feldman'ın Chiyuan Zhang'la birlikte NeurIPS 2020'de sunduğu çalışma bunu doğrudan ölçtü. Her eğitim örneği için bir ezber değeri kestiriyorlar — o örnek eğitimden çıkarılınca modelin o örneği bilme olasılığı ne kadar düşüyor — ve sonra yüksek ezber değerli örnekleri toplu hâlde çıkarıp test doğruluğuna ne olduğuna bakıyorlar. ImageNet'te örneklerin yaklaşık yüzde 32'sinin ezber değeri 0,3'ün üstünde; bunları çıkarmak test doğruluğunu yaklaşık **yüzde 3,4** düşürüyor. Aynı büyüklükte rastgele bir alt küme çıkarıldığında düşüş yüzde 2,6. Yani ezberlenen örnekler, ortalama bir örnekten **daha yararlı**.

Bu sonuç 94\. makaledeki sıkıştırma bağını da yerine oturtuyor. Orada "iyi sıkıştıran model iyi modeldir" ilişkisini ölçmüş, ama modelin kendi boyutu sayılmadıkça cümlenin eksik olduğunu söylemiştik. Buradaki karşılığı şu: bir veri kümesini en kısa yazan tarif, hem düzenliliği hem de kuralla açıklanamayan istisnaları içerir. İstisnalar için ayrılan yer israf değil, tarifin parçası.

## Genellemeyi ölçen sayılar ne kadar iyi ölçüyor

Alan boş durmadı: kapasiteye bakan sınırların yerine, eğitilmiş modelin kendisine bakan onlarca karmaşıklık ölçüsü önerildi — ağırlık normları, marjlar, keskinlik ölçüleri, PAC-Bayes sınırları. Peki bunlar işe yarıyor mu?

Yiding Jiang ve arkadaşlarının ICLR 2020'de sunduğu çalışma soruyu ölçüye çevirdi: hiperparametreleri sistematik olarak değiştirerek **10.000'den fazla** ağ eğittiler ve her biri için literatürdeki **40'tan fazla** karmaşıklık ölçüsünü hesaplayıp genelleme açığıyla sıralama ilişkisine baktılar.

Üç sonuç çıktı. Keskinlik tabanlı ölçüler ve PAC-Bayes sınırları genel olarak en iyi performansı gösterdi. Eniyileme yordamına bakan ölçüler — gradyan gürültüsü, yakınsama hızı — öngörü gücü taşıdı. Ve norm tabanlı ölçülerin çoğu yalnızca zayıf kalmadı, **ters yönde** ilişki verdi: katmanların spektral normlarının çarpımına dayanan sınır, genellemeyle güçlü biçimde negatif ilişkili çıktı, üstelik derinlik değiştikçe en sert biçimde.

Cümleyi tam okuyalım. Bu ölçü keyfî bir sezgi değil; test hatasına kuramsal bir **üst sınır** olarak türetilmiş bir büyüklük. Ölçüldüğünde modelleri ters sıralıyor. Sınırın kendisi yanlış değil — matematiği doğru — ama o kadar gevşek ki, sıraladığı şey genelleme değil.

Çalışmanın ikinci dersi yöntemsel. Bir ölçünün genellemeyle yüksek ilişki göstermesi, aralarında nedensel bir bağ olduğunu göstermez: iki büyüklük de üçüncü bir şeyden — örneğin öğrenme oranından — etkileniyorsa ilişki kendiliğinden çıkar. Yazarlar bu yüzden ilişkiyi bir hiperparametre ekseni sabitlenip geri kalanlar üzerinden ortalanarak hesaplıyorlar. Ölçüm tasarımının sonucu değiştirdiği bir örnek daha.

> **Kendini yokla:** Doğru türetilmiş bir üst sınır nasıl olur da modelleri ters sıralar?

Çünkü bir sınırın geçerli olması, sıkı olmasını gerektirmez. "Test hatası 1'den küçüktür" cümlesi de doğru bir üst sınırdır ve hiçbir şey sıralamaz. Sınırın modelden modele nasıl değiştiği, gerçek hatanın nasıl değiştiğiyle aynı yöne gitmek zorunda değildir; 92\. makaledeki dersin başka bir kılığı: teoremin en iyisi, modelin en iyisi değil.

## Bütün bölümün altındaki varsayım

Son bir hatırlatma, çünkü bu makalenin tamamı tek bir varsayım üzerine kurulu: eğitim ve test verisinin aynı dağılımdan geldiği. Yanlılık da oynaklık da bu varsayım altında tanımlıdır; "görülmemiş veri" derken kastedilen, aynı kaynaktan çekilmiş yeni bir örnek.

79\. makalede o varsayımın gerçek sistemlerde ne sıklıkla bozulduğunu görmüştük. Bozulduğunda buradaki muhasebe geçersiz olmaz, ama eksik kalır: modelin uyduğu dağılım ile karşılaştığı dağılım farklıysa, arada duran şey artık yanlılık ya da oynaklık değil, adı ayrıca konması gereken üçüncü bir açıktır. Bu makalenin sayıları "aynı dünya" varsayımı altında okunmalı.

### Sırada ne var

İki makaledir tek bir model ailesinden konuşuyoruz: gradyanla eğitilen, çok parametreli sinir ağları. Oysa bu makalede kurduğumuz hiçbir şey onlara özgü değil — yanlılık, oynaklık, ezber ve varsayım her tahmin yordamının kalemleri. Alanın elinde sinir ağlarından çok daha eski, varsayımları çok daha açık ve bugün hâlâ birçok problemde önde olan bir yöntem ailesi var. Bir sonraki makale o aileyi geziyor: dört yöntem, dört varsayım ve tablo verisinde neden hâlâ ağaçların kazandığının ölçülmüş açıklaması.

## Kaynakça

- Geman, S., Bienenstock, E. & Doursat, R. (1992). *Neural Networks and the Bias/Variance Dilemma*. Neural Computation 4(1), 1–58. [Bağlantı](https://doi.org/10.1162/neco.1992.4.1.1)
- Zhang, C., Bengio, S., Hardt, M., Recht, B. & Vinyals, O. (2017). *Understanding deep learning requires rethinking generalization*. ICLR 2017. [Bağlantı](https://openreview.net/forum?id=Sy8gdB9xx)
- Zhang, C., Bengio, S., Hardt, M., Recht, B. & Vinyals, O. (2021). *Understanding deep learning (still) requires rethinking generalization*. Communications of the ACM 64(3), 107–115. [Bağlantı](https://doi.org/10.1145/3446776)
- Belkin, M., Hsu, D., Ma, S. & Mandal, S. (2019). *Reconciling modern machine-learning practice and the classical bias–variance trade-off*. Proceedings of the National Academy of Sciences 116(32), 15849–15854. [Bağlantı](https://doi.org/10.1073/pnas.1903070116)
- Nakkiran, P., Kaplun, G., Bansal, Y., Yang, T., Barak, B. & Sutskever, I. (2020). *Deep Double Descent: Where Bigger Models and More Data Hurt*. ICLR 2020. [Bağlantı](https://openreview.net/forum?id=B1g5sA4twr)
- Curth, A., Jeffares, A. & van der Schaar, M. (2023). *A U-turn on Double Descent: Rethinking Parameter Counting in Statistical Learning*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/aec5e2847c5ae90f939ab786774856cc-Abstract-Conference.html)
- Soudry, D., Hoffer, E., Nacson, M. S., Gunasekar, S. & Srebro, N. (2018). *The Implicit Bias of Gradient Descent on Separable Data*. Journal of Machine Learning Research 19(70), 1–57. [Bağlantı](https://www.jmlr.org/papers/v19/18-188.html)
- Feldman, V. & Zhang, C. (2020). *What Neural Networks Memorize and Why: Discovering the Long Tail via Influence Estimation*. NeurIPS 2020. [Bağlantı](https://papers.nips.cc/paper_files/paper/2020/hash/1e14bfe2714193e7af5abc64ecbd6b46-Abstract.html)
- Jiang, Y., Neyshabur, B., Mobahi, H., Krishnan, D. & Bengio, S. (2020). *Fantastic Generalization Measures and Where to Find Them*. ICLR 2020. [Bağlantı](https://openreview.net/forum?id=SJgIPJBFvH)
- Bartlett, P. L., Long, P. M., Lugosi, G. & Tsigler, A. (2020). *Benign overfitting in linear regression*. Proceedings of the National Academy of Sciences 117(48), 30063–30070. [Bağlantı](https://doi.org/10.1073/pnas.1907378117)
- Nagarajan, V. & Kolter, J. Z. (2019). *Uniform convergence may be unable to explain generalization in deep learning*. NeurIPS 2019. [Bağlantı](https://papers.nips.cc/paper_files/paper/2019/hash/05e97c207235d63ceb1db43c60db7bbb-Abstract.html)
- Vapnik, V. N. & Chervonenkis, A. Y. (1971). *On the Uniform Convergence of Relative Frequencies of Events to Their Probabilities*. Theory of Probability and Its Applications 16(2), 264–280. [Bağlantı](https://doi.org/10.1137/1116025)
