---
article_id: article_fc782600-a7e3-4584-ab7f-db480d1a46ab
title: "Getirme: Aramanın Modern Hali"
slug: getirme-aramanin-modern-hali
category: agents-and-retrieval
level: intermediate
reading_order: 42
summary: "29. makalede kara kutu bırakılan sözcük eşleşmesini açar: ters dizinin ve BM25'in üç bileşeninin nasıl çalıştığını sayısal örnekle kurar, alan içi sıralamanın alan dışında neden tersine döndüğünü gösterir, seyrek getirmeyi geçmenin üç yolunu — terimleri genişletmek, etkileşimi geciktirmek, ikinci aşama ödemek — ölçümlerle karşılaştırır ve farklı sistemlerin puanlarının neden sıra üzerinden birleştirildiğini anlatır."
tags:
  - getirme
  - bm25
  - ogrenilmis-seyrek
  - gec-etkilesim
  - siralamayla-birlestirme
content_hash: sha256:ee5c3af4a3da93c306c33c8a4ab59123c5efb4c08fb8dca918338603a06b89eb
classification_version: 1
classification_batch: 9
---
## Kara kutunun öbür yarısı

41\. makale getiriciyi bir kara kutu olarak kullandı: "en ilgili parçaları bul" dedik ve hattın kalitesini o kutunun içine bakmadan tartıştık. Sonra o makalenin son bulgusu kutuyu açmayı zorunlu kıldı — en yüksek puanlı ama cevabı taşımayan belgeler, ilgisiz belgelerden daha çok zarar veriyordu. Getiricinin **neyi** üste çıkardığı, hattın çıktısını doğrudan belirliyor.

29\. makale bu kutunun bir yarısını açmıştı: sorgu ve belge aynı uzaya yerleştirilir, yakınlık nokta çarpımla ölçülür, belge vektörleri önceden hesaplanır. Öbür yarısı hep kapalı kaldı. O makalede "sözcük eşleşmesi" diye geçtiğimiz şeyin ve yanında adı anılan BM25'in nasıl çalıştığını hiç söylemedik; yalnızca sonuçlarını kullandık.

Bu makale o yarıyı açıyor ve üç soruya cevap veriyor: sözcük eşleşmesi tam olarak neyi hesaplıyor, altmış yıllık bu yöntem neden hâlâ yenilmesi zor bir taban çizgisi, ve iki farklı sistemin puanlarını birleştirmek istediğimizde ne yapıyoruz?

## Ters dizin: aramanın ucuz olmasının sebebi

Sözcük eşleşmesinin bütün hızı tek bir veri yapısından geliyor. **Ters dizin** (inverted index), her terim için o terimin geçtiği belgelerin listesini tutar. "kuokka" satırında kuokkanın geçtiği belgelerin numaraları vardır; "elma" satırında elmanınkiler.

Sorgu geldiğinde tek tek belgelere hiç bakılmaz. Yalnızca sorgudaki terimlerin satırları okunur ve o listelerdeki belgeler puanlanır. Milyonlarca belgelik bir derlemde iki kelimelik bir sorgu, belki birkaç bin belgeye dokunur. 29\. makaledeki maliyet tablosunun sebebi buydu: ters dizini kurmak yaklaşık yarım saat sürüyordu, oysa yirmi bir milyon vektörü hesaplamak sekiz kart üzerinde neredeyse dokuz saat.

Geriye tek soru kalıyor: listedeki belgeler nasıl puanlanacak?

## BM25'in üç bileşeni

Stephen Robertson ve Hugo Zaragoza'nın 2009 tarihli derlemesi, alanın onlarca yıllık gelişimini tek bir puanlama işlevinde topluyor. İşlev üç fikirden oluşuyor ve üçünü de sırayla kuralım.

**Birincisi: nadir terim daha çok bilgi taşır.** "ve" kelimesi her belgede geçer, dolayısıyla bir belgeyi ayırt etmez. "kuokka" az belgede geçer, dolayısıyla geçtiği belge hakkında çok şey söyler. Her terime, derlemde ne kadar nadir olduğuna göre bir ağırlık verilir; bu bileşen ters belge sıklığı olarak bilinir.

**İkincisi: terim sıklığı doyuma ulaşır.** Bir belgede "kuokka" bir kez geçiyorsa o belge kuokka hakkındadır. Yirmi kez geçiyorsa yirmi kat daha fazla kuokka hakkında değildir. Bu yüzden terim sıklığı doğrusal değil, artan ama bir tavana yaklaşan bir işlevden geçirilir:

ağırlık = tf ⁄ (k₁ + tf)

Sözle: sıklık büyüdükçe ağırlık artar, ama artış giderek yavaşlar ve bire yaklaşır. `k₁` doyumun ne kadar hızlı geldiğini ayarlar.

![Yatay ekseni bir terimin belgede kaç kez geçtiği, dikey ekseni o terimin ağırlığı olan bir eğri şeması. Grafiğin üstünde tavanı gösteren kesikli yatay bir çizgi vardır. İki eğri çizilidir. Kesikli eğri doğrusal davranışı temsil eder: düz bir doğru olarak yükselir ve altıncı geçiş dolayında tavana çarpıp orada devam eder. Sürekli eğri doyum davranışını temsil eder: başta hızla yükselir, sonra giderek yavaşlar ve tavana asla değmeden ona yaklaşır. Sürekli eğrinin üzerinde iki nokta işaretlidir. Grafiğin sağındaki sütunda önce iki satırlık bir gösterge vardır — çizgi örnekleriyle doğrusal ve doyumlu eğriler — sonra iki noktanın açıklaması: bir geçişte ağırlığın yaklaşık yarısının, dört geçişte dörtte üçünün alındığı yazılıdır. Şeklin altında ilk geçişin en çok bilgiyi taşıdığı, sonraki geçişlerin giderek daha az şey eklediği belirtilir.](assets/terim-sikligi-doyumu.svg "Şekil 1 — Terim sıklığı doyuma ulaşır")

Şekil 1'deki eğri, alanın en eski ampirik gözlemlerinden birini kodluyor: bir terimin ilk geçişi en çok bilgiyi taşır.

**Üçüncüsü: uzun belgeler haksız avantaj kazanmamalı.** Uzun bir belgede her terim doğal olarak daha çok geçer. İki sebep olabilir: yazar aynı şeyi daha çok kelimeyle anlatmıştır (o zaman uzunluğa bölmek doğrudur), ya da belge gerçekten daha çok konu kapsamaktadır (o zaman bölmek yanlıştır). Gerçek derlemlerde ikisi karışık olduğu için yumuşak bir normalleştirme uygulanır:

B = (1 − b) + b × (belge uzunluğu ⁄ ortalama uzunluk)

`b = 0` normalleştirmeyi tamamen kapatır, `b = 1` tam uygular. Terim sıklığı doyum işlevine girmeden önce bu değere bölünür.

Şimdi üçünü birleştirip sayı koyalım. Aşağıdaki `k₁ = 1,2` ve `b = 0,75` değerleri açıklama amaçlı seçilmiştir; kaynak çalışmanın kendi notu şudur: model bu parametrelerin nasıl seçileceği konusunda hiçbir yol göstermez, değerler ölçümle ayarlanır.

Ortalama belge uzunluğu 200 kelime olsun. İki belge karşılaştıralım:

| belge | "kuokka" sayısı | uzunluk | B | düzeltilmiş sıklık | ağırlık |
|---|---|---|---|---|---|
| A | 1 | 100 | 0,625 | 1,600 | 0,571 |
| B | 4 | 400 | 1,750 | 2,286 | 0,656 |

B belgesinde terim dört kat fazla geçiyor ama ağırlığı yalnızca yaklaşık yüzde 15 daha yüksek. İki bileşen birlikte çalıştı: doyum ikinci, üçüncü ve dördüncü geçişin katkısını kırptı; uzunluk normalleştirmesi de belgenin dört kat uzun olmasını hesaba kattı. Aynı terim 100 kelimelik bir belgede dört kez geçseydi ağırlık 0,842 olurdu — bu, "kısa ve yoğun" belgenin ödüllendirilmesidir.

> **Kendini yokla:** Terim sıklığını doyuma sokmasak ne olurdu?

Aynı kelimeyi yüz kez tekrar eden bir belge, o kelimeyi bir kez geçen ve gerçekten o konuyu anlatan bir belgeyi kolayca geçerdi. Doyum, bu tür manipülasyonu yapısal olarak sınırlar: yüzüncü geçiş, birincinin yanında neredeyse hiçbir şey eklemez. Uzunluk normalleştirmesi de aynı savunmanın ikinci yarısıdır — tekrarı uzatarak yapmak da işe yaramaz.

## Alan içi sıralama, alan dışında tersine dönüyor

29\. makalede bir sonucu anmıştık: sözcük eşleşmesi hâlâ sağlam bir taban çizgisi. Şimdi o cümlenin sayısını verelim, çünkü asıl öğretici olan sayının kendisi değil, iki ölçüm arasındaki **ters dönüş**.

Nandan Thakur ve arkadaşlarının NeurIPS 2021 veri kümeleri ve kıyaslamalar programında sunduğu çalışma, on getirme sistemini on sekiz derlem üzerinde, eğitildikleri alanın **dışında** karşılaştırdı. Kullanılan ölçü **nDCG@10**: ilk on sonucun ilgililik derecelerini, üst sıralardakine daha çok ağırlık verecek biçimde toplayan ve kusursuz sıralamaya bölerek sıfır ile bir arasına getiren bir sıralama kalitesi ölçüsü. Eğitim alanı olan kümede sıralama nettir: BM25 bu ölçüde 0,228 alırken yoğun bir model 0,408 alıyor — arada yaklaşık iki kat.

Alan dışına çıkıldığında aynı modellerin BM25'e göre ortalama performansı şöyle:

| yaklaşım | BM25'e göre ortalama |
|---|---|
| terim ağırlığı öğrenen seyrek modeller | −%27,9 ve −%20,3 |
| yoğun getirme modelleri | −%47,7 · −%7,4 · −%3,6 · −%2,8 |
| belge genişletmeli seyrek model | +%1,6 |
| geç etkileşimli model | +%2,5 |
| BM25 üstüne çapraz kodlayıcıyla yeniden sıralama | +%11 |

![Dokuz satırlı yatay bir çubuk şeması. Ortada dikey bir çizgi vardır ve üstünde BM25 yazar; bu çizgi sıfır farkı temsil eder. Her satırda solda yaklaşımın adı, ortada çubuk, sağda değeri yazılıdır. Çizginin solundaki altı çubuk BM25'in gerisinde kalan yaklaşımları gösterir ve değerleri yukarıdan aşağıya şöyledir: yoğun getirme eksi yüzde 47,7; terim ağırlığı öğrenen eksi yüzde 27,9; terim ağırlığı öğrenen eksi yüzde 20,3; yoğun getirme eksi yüzde 7,4; yoğun getirme eksi yüzde 3,6; yoğun getirme eksi yüzde 2,8. Çizginin sağındaki üç çubuk onu geçen yaklaşımları gösterir: belge genişletmeli seyrek artı yüzde 1,6; geç etkileşimli artı yüzde 2,5; yeniden sıralamalı artı yüzde 11. Şeklin altında soldakilerin BM25'in gerisinde, sağdakilerin önünde olduğu ve aynı modellerin eğitim alanında BM25'i açık farkla geçtiği belirtilir.](assets/alan-disi-tersine-donus.svg "Şekil 2 — Alan dışına çıkınca sıralama değişiyor")

Şekil 2, 16\. makaledeki ölçüm disiplininin getirmeye taşınmış hâli: alan içi başarı, alan dışı genellemenin göstergesi değil. Aynı eğitim verisiyle ince ayarlanmış modeller birbirinden çok farklı genelleyebiliyor.

Ama tablonun asıl değeri sağ tarafında. BM25'i alan dışında geçebilen yalnızca üç yaklaşım var ve üçü birbirinden bağımsız üç fikri temsil ediyor. Makalenin geri kalanı bu üçünü tek tek açıyor.

## Birinci yol: terimleri genişletmek

Sözcük eşleşmesinin kör noktası bellidir — sorguda geçmeyen bir kelimeyle yazılmış belge hiç görülmez. Ama bu, ters dizini terk etmeyi gerektirmiyor. Belge dizine girerken, içinde geçmeyen ama onu tanımlayan terimleri de **ekleyebiliriz**.

Thibault Formal, Benjamin Piwowarski ve Stéphane Clinchant'ın SIGIR 2021'de sunduğu çalışma bunu öğrenilen bir işleme çeviriyor. Model, her belge için sözlüğün tamamı üzerinde bir ağırlık dağılımı üretir; yani belgede hiç geçmeyen bir terime de sıfırdan büyük bir ağırlık verebilir. Bu hâliyle dağılım yoğundur ve ters dizinin bütün avantajını yok eder. Çalışmanın katkısı burada: iki düzenleyici ekleniyor. Birincisi ağırlıkların logaritmik bir doygunluktan geçirilmesi — BM25'in doyum fikrinin öğrenilmiş hâli. İkincisi, seyrekliği doğrudan hedefleyen ve sorgu ile belge arasındaki ortalama işlem sayısını cezalandıran bir terim.

Sonuç, ters dizinde çalışan ama anlamı gören bir getirici. Aşağıdaki ilk sütunun ölçüsü **ortalama karşılıklı sıra** (mean reciprocal rank, MRR): her sorgu için ilk doğru sonucun sırasının tersi alınır ve sorgular üzerinden ortalanır; ilk onda hiç doğru sonuç yoksa katkı sıfırdır. Bulma oranıyla farkı şurada — bulma oranı doğru belgenin listede olup olmadığını sorar, bu ölçü **kaçıncı sırada** olduğunu da hesaba katar.

| yöntem | MRR@10 | R@1000 | TREC DL R@1000 | ortalama işlem |
|---|---|---|---|---|
| BM25 | 0,184 | 0,853 | 0,745 | 0,13 |
| öğrenilmiş seyrek | 0,322 | 0,955 | 0,813 | 0,73 |
| yoğun (en iyi) | 0,335 | 0,964 | 0,720 | — |

Üçüncü sütun bu tablonun en öğretici yeri. Alan dışı bir değerlendirmede BM25'in bulma oranı 0,745, yoğun modelinki 0,720 — yani orada klasik yöntem hâlâ önde. Öğrenilmiş seyrek model ise 0,813 ile ikisini de geçiyor ve bunu ters dizinle yapıyor. Bedeli sütunun son hanesinde: sorgu başına ortalama işlem sayısı BM25'in kabaca beş katı, ama yaklaşık komşu araması gerektiren yoğun dizinlerin dünyasına hiç girmiyor.

## İkinci yol: etkileşimi geciktirmek

29\. makalede iki uç görmüştük: çapraz kodlayıcı doğru ama pahalı, ikili kodlayıcı ucuz ama belgeyi tek bir noktaya sıkıştırıyor. Aradaki yolu Omar Khattab ve Matei Zaharia'nın SIGIR 2020'de sunduğu çalışma açtı ve seride adını **geç etkileşimli** olarak zaten koymuştuk.

Mekanizma şu. Belge tek bir vektöre değil, her token'ı için bir vektöre kodlanır ve bunlar önceden hesaplanıp saklanır. Sorgu geldiğinde onun her token'ı da bir vektöre çevrilir. Puan, sorgunun her token'ı için belgedeki **en benzer** token vektörünün bulunup bu en büyük benzerliklerin toplanmasıyla hesaplanır.

Bu tasarımın inceliği, pahalı olan işi doğru yere koyması. Belgeyi okumak — yani onu vektörlere çevirmek — dizinleme anında bir kez yapılır. Sorguyla belge arasındaki ince etkileşim ise ucuz bir en-büyüğü-al işlemine indirgenir. Sayılar bunu açıkça gösteriyor:

| yöntem | MRR@10 | yeniden sıralama gecikmesi | sorgu başına işlem |
|---|---|---|---|
| BM25 | 16,7 | — | — |
| çapraz kodlayıcı (temel) | 34,7 | 10.700 ms | 97 T |
| çapraz kodlayıcı (büyük) | 36,5 | 32.900 ms | 340 T |
| geç etkileşimli | 34,9 | 61 ms | 7 G |

Geç etkileşimli düzen, çapraz kodlayıcının doğruluğunu neredeyse koruyup gecikmeyi yüz yetmiş kattan fazla düşürüyor ve işlem sayısını on dört bin kat azaltıyor. Aynı sistem yeniden sıralayıcı olarak değil doğrudan getirici olarak da kullanılabiliyor; o zaman 8,8 milyonluk derlemin tamamı üzerinde MRR@10 36,0'a çıkıyor ve ilk bin sonuçtaki bulma oranı yüzde 96,8'e ulaşıyor.

## Üçüncü yol: ikinci aşamayı ödemek

Üçüncü yol yeni bir fikir değil; 29\. makalede iki aşamalı sıralama olarak zaten anlatılmıştı. Ucuz getirici yüz civarı aday çıkarır, pahalı çapraz kodlayıcı yalnızca onları yeniden sıralar. Yukarıdaki alan dışı tabloda BM25'i en çok geçen düzen buydu: yüzde 11.

Bu yolun tek dezavantajı bedelidir ve bedel yukarıdaki gecikme sütununda duruyor. Yeniden sıralama, aday sayısıyla doğrusal olarak pahalanır ve bu maliyet **her sorguda** ödenir. 28\. ve 33\. makalelerdeki muhasebe aynen geçerli: ucuz olan aday üretsin, pahalı olan karar versin — ve pahalı olanın ne kadar aday göreceği bir bütçe kararıdır.

## Puanları nasıl toplayacağız

Üç yolu da elimizde tuttuğumuzu düşünelim: bir sözcük eşleşmesi getiricisi ve bir yoğun getirici, ikisi de kendi sıralamasını üretti. Sonuçları birleştirmek istiyoruz. En doğal fikir puanları toplamaktır ve tam olarak burada tökezlenir.

Sorun, puanların **karşılaştırılabilir olmaması**. BM25 puanı sınırsız bir toplamdır ve büyüklüğü sorgunun terim sayısına ve derlemin istatistiklerine bağlıdır. Kosinüs benzerliği eksi bir ile bir arasındadır. İkisini toplamak, biri metre biri fahrenhayt olan iki ölçümü toplamaya benzer.

Gordon Cormack, Charles Clarke ve Stefan Büttcher'in SIGIR 2009'da sunduğu yöntem sorunu kökten çözüyor: puanlara hiç bakma, yalnızca **sıralara** bak. Her belgenin puanı, bulunduğu her listedeki sırasının tersleri toplanarak hesaplanır:

puan(belge) = Σ 1 ⁄ (k + sıra)

Toplam, belgenin göründüğü bütün listeler üzerinden alınır; `k` sabittir ve çalışmada 60 olarak seçilip sonraki bütün deneylerde değiştirilmemiştir.

`k` sabitinin işlevi ince. Onsuz, tek bir listede birinci sırada olan bir belge ezici bir puan alırdı; `k` bu etkiyi yumuşatır, böylece bir sistemin aykırı bir tercihi bütün birleşimi ele geçirmez. Aynı zamanda alt sıralardaki belgelerin katkısı üstel bir işlevdeki gibi tümden yok olmaz.

Sayıyla görelim. Bir belge birinci listede 1., ikincide 30. sırada olsun; başka bir belge iki listede de 8. sırada olsun. Birincinin puanı 1/61 + 1/90 ≈ 0,0275; ikincininki 1/68 + 1/68 ≈ 0,0294. İki listenin de orta sıralarında bulunan belge, bir listede birinci ama öbüründe geride kalan belgenin önüne geçiyor. Yöntemin bütün mantığı bu: **uzlaşma**, tek bir sistemin kesin kanaatinden daha güvenilir sayılıyor.

![Soldan sağa üç sütunlu bir şema. Sol sütunda birinci getiricinin sıralaması vardır; belgeler kutular hâlinde alt alta dizilidir ve her kutunun yanında o sistemin verdiği ham puan yazılıdır, puanlar birler mertebesindedir. Orta sütunda ikinci getiricinin sıralaması vardır; aynı belgeler farklı bir sırada dizilidir ve yanlarındaki ham puanlar sıfır ile bir arasındadır. İki sütunun arasında, ham puanların ölçeklerinin birbirini tutmadığını belirten bir uyarı vardır. Sağ sütunda birleştirilmiş sıralama vardır; her belgenin yanında sıraların tersleri toplanarak hesaplanmış puanı yazılıdır. İki listede de orta sıralarda bulunan bir belge, birinci listede başta ama ikincide geride olan belgenin üstüne çıkmıştır ve bu kutu vurgulanmıştır. Şeklin altında yöntemin ham puanlara hiç bakmadığı, yalnızca sıraları kullandığı yazılıdır.](assets/sirayla-birlestirme.svg "Şekil 3 — Puanları değil, sıraları birleştirmek")

Şekil 3'teki yöntemin ölçülen kazancı da mütevazı ama tutarlı. Çalışma otuz ayrı sistem yapılandırmasının sonuçlarını birleştirdiğinde ortalama kesinlik 0,2016'dan 0,2145'e çıkıyor; aynı işi yapan iki yerleşik yöntem 0,2074 ve 0,2039'da kalıyor. Farklı deney kümelerinde yöntemin en iyi tekil sisteme göre kazancı ortalama yüzde 4–5 olarak raporlanıyor.

`k` sabitinin seçimine duyarlılık da ölçülmüş ve rahatlatıcı: `k` 10 ile 100 arasında değişirken sonuç 0,2123 ile 0,2147 arasında kalıyor. Yalnızca uçlarda — `k = 0` ve `k = 500` — belirgin bir düşüş var. Yani sabitin varlığı önemli, tam değeri değil.

## Ölçtüğümüz şey gerçekten kalite mi

Son bir uyarı ve bu makalenin belki en rahatsız edici bulgusu.

Bir getirme değerlendirme kümesi kurulurken hangi belgelerin ilgili olduğunu insanlar etiketler. Ama bütün derlemi etiketlemek imkânsız olduğu için, etiketlenecek adaylar mevcut sistemlerin getirdikleri arasından seçilir. O sistemler ağırlıklı olarak sözcük eşleşmesine dayanıyorsa, sonuç öngörülebilir: yoğun bir getiricinin bulduğu ama hiçbir klasik sistemin bulmadığı bir belge **hiç etiketlenmez** ve otomatik olarak ilgisiz sayılır.

Aynı BEIR çalışması bunu bir kümede ölçtü. İlk on sonucu içinde hiç etiketlenmemiş belge oranı BM25'te yüzde 6,4, belge genişletmeli seyrek modelde yüzde 2,8, buna karşılık iki yoğun modelde yüzde 14,4 ve yüzde 31,8. Sonra eksik etiketler — 980 sorgu-belge çifti — özgün etiketleme yönergesine göre, belgeyi hangi sistemin getirdiği bilinmeden elle tamamlandı.

| sistem | eksik etiketlerle | tamamlandıktan sonra |
|---|---|---|
| BM25 | 0,656 | 0,668 |
| belge genişletmeli seyrek | 0,713 | 0,714 |
| yoğun (bir model) | 0,481 | 0,555 |
| yoğun (başka bir model) | 0,332 | 0,445 |
| geç etkileşimli | 0,677 | 0,735 |

Sözcük eşleşmesinin puanı neredeyse hiç değişmiyor; yoğun modellerinki 7 ile 11 puan arası yükseliyor. Bu, o modellerin gerçekten daha iyi olduğunu kanıtlamıyor — ama önceki tablonun bir kısmının yöntemden değil **ölçme düzeninden** geldiğini kanıtlıyor. 16\. makaledeki uyarının en somut hâli: bir cetvelin kendisi de bir tasarım ürünüdür ve kimin lehine tasarlandığı ölçülebilir.

## Getirmenin disiplini

**Ters dizin, klasik aramanın bütün hız avantajının kaynağıdır.** Sorgu terimlerinin satırları okunur, belgelere tek tek bakılmaz.

**BM25 üç fikrin toplamıdır:** nadir terim daha değerlidir, terim sıklığı doyuma ulaşır, uzun belge normalleştirilir. Üçü de ampirik gözlemlerin kodlanmış hâlidir.

**Parametreler türetilmez, ölçülür.** Kaynak çalışma bunu açıkça söyler: model `k₁` ve `b` için yol göstermez.

**Alan içi sıralama alan dışında korunmuyor.** Eğitim kümesinde iki kat öne geçen bir model, alan dışında taban çizgisinin gerisine düşebiliyor.

**BM25'i alan dışında geçmenin üç yolu var** ve üçü de bir bedel ödüyor: terimleri genişletmek işlem sayısını artırır, etkileşimi geciktirmek depolamayı artırır, ikinci aşama eklemek her sorguya gecikme yazar.

**Farklı sistemlerin ham puanları toplanamaz.** Ölçekleri karşılaştırılabilir değildir; sıralar üzerinden birleştirmek bu sorunu tümden ortadan kaldırır.

**Uzlaşma, tekil kesinlikten güvenilirdir.** İki listede de orta sıradaki belge, bir listede birinci olandan öne geçebilir ve ölçümde bu tutarlı biçimde kazandırır.

**Değerlendirme kümesi de bir sistemdir.** Etiket havuzu hangi getiricilerle kurulduysa, ölçüm o getiricilerin lehinedir; eksik etiketleri tamamlamak tabloyu değiştiriyor.

### Sırada ne var

Bu makale boyunca bir işi görmezden geldik. Yoğun getiricide "en yakın `k` vektörü bul" dedik ve o işin nasıl yapıldığını hiç sormadık. Yirmi bir milyon vektörü tek tek taramak, 29\. makalede hesapladığımız bütün hız avantajını geri verirdi.

Pratikte tarama yapılmıyor: vektörler önceden bir yapıya yerleştiriliyor ve sorgu yalnızca o yapının bir kısmını geziyor. Bunun karşılığında sonucun **yaklaşık** olduğunu kabul ediyoruz — gerçekten en yakın belge kaçırılabiliyor. Bir sonraki makale bu takası açıyor: hangi yapılar kullanılıyor, kaçırma oranı nasıl ayarlanıyor, ve bir getirme hattında ölçülen kalitenin ne kadarı modelin, ne kadarı dizinin?

## Kaynakça

- Robertson, S. & Zaragoza, H. (2009). *The Probabilistic Relevance Framework: BM25 and Beyond*. Foundations and Trends in Information Retrieval 3(4), s. 333–389. [Bağlantı](https://doi.org/10.1561/1500000019)
- Thakur, N., Reimers, N., Rücklé, A., Srivastava, A. & Gurevych, I. (2021). *BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models*. NeurIPS 2021 Datasets and Benchmarks. [Bağlantı](https://datasets-benchmarks-proceedings.neurips.cc/paper/2021/hash/65b9eea6e1cc6bb9f0cd2a47751a186f-Abstract-round2.html)
- Formal, T., Piwowarski, B. & Clinchant, S. (2021). *SPLADE: Sparse Lexical and Expansion Model for First Stage Ranking*. SIGIR 2021, s. 2288–2292. [Bağlantı](https://dl.acm.org/doi/10.1145/3404835.3463098)
- Khattab, O. & Zaharia, M. (2020). *ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT*. SIGIR 2020, s. 39–48. [Bağlantı](https://dl.acm.org/doi/10.1145/3397271.3401075)
- Cormack, G. V., Clarke, C. L. A. & Büttcher, S. (2009). *Reciprocal Rank Fusion Outperforms Condorcet and Individual Rank Learning Methods*. SIGIR 2009, s. 758–759. [Bağlantı](https://dl.acm.org/doi/10.1145/1571941.1572114)
