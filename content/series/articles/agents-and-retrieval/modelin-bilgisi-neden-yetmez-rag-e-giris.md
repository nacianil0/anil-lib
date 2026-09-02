---
article_id: article_39c655d4-ade1-4cfc-ba06-2ca83b09109a
title: "Modelin Bilgisi Neden Yetmez? RAG'e Giriş"
slug: modelin-bilgisi-neden-yetmez-rag-e-giris
category: agents-and-retrieval
level: intermediate
reading_order: 41
summary: "Faz 5'i açar: parametrik bilginin hangi olgularda çalışıp hangilerinde çöktüğünü, doğruluğun ön eğitimdeki belge sayısına nasıl bağlandığını, getirmeyle güçlendirilmiş üretimin mimarisini ve dizini değiştirerek bilgiyi güncellemenin ne demek olduğunu, getirmenin ne zaman zarar verdiğini ve modelin bağlam ile kendi ezberi çatıştığında hangisine uyduğunu ölçümlerle gösterir."
tags:
  - rag
  - parametrik-bilgi
  - baglamsal-bilgi
  - uzun-kuyruk
  - bilgi-catismasi
content_hash: sha256:55ed0ed756a34d4bc3bf7bd9fb8f5674c7022ce2d26438cad7a6be6b482cafbf
classification_version: 1
classification_batch: 9
---
## Ağırlıklardaki kütüphane

40\. makale Faz 4'ü kapattı ve son on makale boyunca bir varsayımı hiç sorgulamadık: gereken bilginin modelin ağırlıklarında zaten bulunduğu varsayımını. Ara adımlar ekledik, doğruladık, aradık, ödülü dağıttık, belleği dışarı çıkardık — ama cevabın hammaddesini hep içeriden aldık.

O hammaddenin sınırlarını aslında iki kez ölçmüştük. 18\. makalede ağırlıkların kapasitesinin sonlu olduğunu ve parametre başına iki bit mertebesinde kaldığını hesaplamıştık. 17\. makalede ise modelin bilmediği yerde susmak yerine uydurduğunu ve bunun bir arıza değil kalibrasyonun sonucu olduğunu görmüştük. Aynı makalede bir de söz vermiştik: cevabı üretmeden önce güvenilir metni modelin önüne koymanın tam kurulumu buraya, 41\. makaleye bırakılmıştı.

Şimdi o sözü ödüyoruz. Ama önce daha temel bir soruyu cevaplamak gerekiyor: model tam olarak neyi biliyor, neyi bilmiyor, ve bu ikisini birbirinden ayıran şey ne?

## Bilinen ile bilinmeyeni ayıran şey

İlk cevap alanın erken bir çalışmasından geliyor. Fabio Petroni ve arkadaşlarının EMNLP 2019'da sunduğu çalışma, dil modellerine olguları boşluk doldurma sorusu olarak sordu: "Dante [boşluk] şehrinde doğdu." Amaç, ağırlıklara yazılmış ilişkisel bilgiyi hiçbir ince ayar yapmadan ölçmekti.

Sonuç iki yüzlüydü. Bir yandan model şaşırtıcı derecede iyiydi: açık alan soru cevaplamada ilk on tahmin içinde doğru cevabı yüzde 57,1 oranında yakalıyor, aynı işi özel olarak kurulmuş bir bilgi tabanı yüzde 63,5 ile yapıyordu. Bir dil modeli, hiç öyle tasarlanmadığı hâlde bir bilgi tabanına yaklaşıyordu.

Öbür yandan aynı tablo derin bir çatlağı gösteriyordu. Sonuçlar ilişki türüne göre ayrıldığında:

| ilişki türü | ilk tahminde doğruluk |
|---|---|
| bire bir ilişkiler (ör. ülke → başkent) | %74,5 |
| çoktan bire ilişkiler | %34,2 |
| çoktan çoka ilişkiler | %24,3 |
| doğum tarihi | %1,4 |

Doğum tarihi satırı bir yazım hatası değil. Aynı model, bire bir ilişkilerde dört soruda üçünü doğru cevaplarken, doğum tarihlerinde yüz soruda birden azını doğru cevaplıyor. Parametrik bilgi düzgün dağılmış bir kütüphane değil; bazı raflar dolu, bazıları neredeyse boş.

## Doğruluk, kaç kez gördüğünün fonksiyonu

Peki hangi rafın dolu olacağını ne belirliyor? Nikhil Kandpal ve arkadaşlarının ICML 2023'te sunduğu çalışma bu soruyu doğrudan ölçtü ve cevabı tek bir değişkene bağladı: **ön eğitim verisinde o olguyla ilgili kaç belge geçtiği**.

Yöntem titiz. Ön eğitim derlemleri varlık bağlama işleminden geçiriliyor, sonra her soru-cevap çifti için sorunun ve cevabın varlıklarının **birlikte** geçtiği belgeler sayılıyor. Örneğin "Şair Dante hangi şehirde doğdu?" sorusu için Dante ile Floransa'nın birlikte geçtiği belgeler.

Sonuç net bir eğri veriyor. 176 milyar parametreli bir modelin doğruluğu, ilgili belge sayısı 10'dan 10.000'e çıktığında yüzde 25'ten yüzde 55'in üzerine tırmanıyor. İlişkinin nedensel olduğu ayrıca sınanmış: 4,8 milyar parametreli bir model, belirli belgeler çıkarılarak yeniden eğitildiğinde tam olarak o soruların doğruluğu düşüyor.

![Yatay ekseni ön eğitim verisindeki ilgili belge sayısı, dikey ekseni soru cevaplama doğruluğu olan bir eğri şeması. Yatay eksen logaritmiktir ve on üzeri sıfırdan on üzeri altıya kadar işaretlidir. Birbirinden ayrık üç eğri, üç farklı model boyunu temsil eder ve üçü de soldan sağa yükselir; büyük model eğrisi en üstte, küçük model eğrisi en alttadır. Büyük model eğrisinde on ilgili belge hizasında doğruluk yüzde 25, on bin belge hizasında yüzde 55 olarak işaretlenmiştir. Sol tarafta belge sayısının az olduğu bölge uzun kuyruk olarak etiketlenmiş ve üç eğrinin de orada birbirine yaklaşarak alçakta kaldığı görülür. Şeklin altında modeli büyütmenin eğriyi yukarı kaydırdığı ama sol uçtaki açığı kapatmadığı yazılıdır.](assets/uzun-kuyruk-egrisi.svg "Şekil 1 — Doğruluk, olgunun kaç belgede geçtiğine bağlı")

Şekil 1'in sol ucu bu makalenin gerekçesi. Orada, ön eğitimde yalnızca birkaç kez geçen olgular var — 17\. makaledeki "tam bir kez görülmüş olgular" kategorisiyle aynı bölge — ve model orada zayıf. İki doğal çözüm akla geliyor ve çalışma ikisini de kapatıyor.

Birincisi daha çok veri. Ama farklı yöntemlerle toplanmış beş ayrı ön eğitim derleminde aynı soruların ilgili belge sayıları arasındaki sıra ilişkisi 0,87 ile 0,97 arasında. Yani derlemler birbirini tekrar ediyor: internete daha çok bakmak, uzun kuyruğu doldurmuyor.

İkincisi daha büyük model. Çalışma bunu da ölçüyor: nadir sorulardaki doğruluk model boyunun logaritmasıyla çok düzgün bir doğru üzerinde ilerliyor (R² = 0,98). O doğruyu, güçlü bir denetimli sistemin ya da insanın seviyesine uzatınca çıkan sayı **10¹⁸ parametre** — bir kentilyon. Bu, "ölçekle çözülür" cevabının pratikte cevap olmadığının sayısal ifadesi.

> **Kendini yokla:** Ön eğitim derlemine yeni bir kaynak eklemek uzun kuyruğu neden doldurmuyor?

Çünkü kaynaklar birbirinden bağımsız değil. Farklı yöntemlerle toplanmış derlemlerin bile hangi olguyu ne kadar desteklediği neredeyse aynı sırayı izliyor: bir olgu internette azsa, her derlemde azdır. Yeni kaynak, çok geçen olguların sayısını daha da artırır ve nadir olanları nadir bırakır. Kuyruğu doldurmak için gereken şey daha çok metin değil, o olgunun **istendiği anda** getirilmesidir.

Aynı çalışma çözümü de aynı yerde deniyor ve sonucu bu makalenin dönüm noktası. Modele, cevabı destekleyen Wikipedia paragrafı doğrudan verildiğinde eğri yalnızca yukarı kaymıyor — **yön değiştiriyor**. Kapalı kitap düzende doğruluk belge sayısıyla artarken, paragrafı elinde olan modelde nadir sorular ortalamada daha kolay hâle geliyor ve eğri insanların eğrisine benziyor. Sebebi sezgisel: bir olgu nadirse, onu anlatan metin genellikle daha doğrudandır. Bilgiyi ezberden okumaya çevirmek, sorunun sınıfını değiştiriyor.

## Bilgiyi dışarıda tutmak

İşte buradan çıkan fikir. Bilgiyi ağırlıklara yazmak yerine dışarıda bir dizinde tut; soru geldiğinde ilgili parçayı bul, modelin önüne koy, cevabı öyle ürettir.

Patrick Lewis ve arkadaşlarının NeurIPS 2020'de sunduğu çalışma bu düzeni adlandırdı ve uçtan uca eğitilebilir bir mimariye çevirdi: **getirmeyle güçlendirilmiş üretim** (retrieval-augmented generation, RAG). Çalışmanın kurduğu ayrım seri boyunca kullanacağımız ayrımdır: **parametrik bellek** ağırlıklarda duran bilgidir, **parametrik olmayan bellek** ise dışarıdaki dizindir.

Mimari iki parçadan oluşuyor ve ikisini de tanıyorsun. Getirici, 29\. makaledeki ikili kodlayıcıdır: soru bir vektöre çevrilir, önceden hesaplanmış belge vektörleri arasında en yakın `K` tanesi bulunur. Üretici, bir dizi-diziye modelidir: soruyu ve getirilen belgeyi birlikte okuyup cevabı üretir. Dizin, Aralık 2018 tarihli Wikipedia'nın 100 kelimelik ayrık parçalara bölünmüş hâli — yirmi bir milyon parça.

İncelik, getirilen belgenin nasıl ele alındığında. Belge bir **gizli değişken** olarak görülür: hangisinin doğru olduğunu bilmiyoruz, bu yüzden ilk `K` belgenin her biriyle ayrı ayrı cevap üretilip sonuçlar belgenin olasılığıyla ağırlıklandırılarak toplanır. Bunun iki biçimi var. Birincisinde bütün cevaptan tek bir belge sorumlu tutulur; ikincisinde her token için farklı bir belge sorumlu olabilir. İkinci biçim, cevabın farklı parçalarının farklı kaynaklardan gelebilmesini sağlar.

Kaç belge getirileceği ayrı bir ayar. Çalışma modelleri beş ya da on belgeyle eğitiyor ve aradaki farkı anlamlı bulmuyor; ama çıkarım anında bu sayı serbestçe değiştirilebiliyor. Belge başına sorumluluk veren biçimde daha çok belge getirmek doğruluğu tekdüze artırırken, token başına sorumluluk veren biçimde başarı on belge civarında tepe yapıp düşüyor. Yani "daha çok getir" tek başına bir iyileştirme değil; nerede durulacağı ölçülmesi gereken bir seçenek.

![Soldan sağa akan üç aşamalı bir mimari şeması. Solda soru kutusu vardır; ondan bir ok soru kodlayıcısına gider ve kodlayıcı bir sorgu vektörü üretir. Sorgu vektöründen çıkan ok, önceden hesaplanmış belge vektörlerinin durduğu dizin kutusuna girer; dizinin altında yirmi bir milyon parçadan oluştuğu yazılıdır. Dizinden çıkan üç ayrı ok, getirilen üç belgeyi gösteren üç kutuya gider. Bu üç kutunun her biri, sorunun kendisiyle birlikte üretici modele girer ve üç ayrı cevap adayı üretilir. Sağda bu üç adayın belge olasılıklarıyla ağırlıklandırılıp tek bir cevaba toplandığı gösterilir. Şeklin altında dizinin eğitimden bağımsız olduğu ve değiştirilebildiği belirtilir.](assets/rag-mimarisi.svg "Şekil 2 — Getirici, dizin ve üretici")

Şekil 2'nin en önemli özelliği sağdaki ok değil, ortadaki kutunun **eğitimden bağımsız** olması. Ağırlıklar donduğunda bile dizin değiştirilebilir. Bu, sonraki bölümün konusu.

Ölçümler önce şunu gösteriyor: bu düzen işe yarıyor. Açık alan soru cevaplamada, o dönemin yalnızca parametrik bilgiye dayanan en iyi modeli Natural Questions kümesinde yüzde 36,6 tam eşleşme alırken, bu mimari yüzde 44,5'e çıkıyor. Getirmeli ama çıkarımcı — yani cevabı belgeden kesip alan — bir sistem yüzde 41,5'te kalıyor.

Son satır ilginç bir ayrıntı taşıyor. Üretmenin çıkarmaya göre bir üstünlüğü var: getirilen belgelerin **hiçbirinde** cevap birebir geçmediği durumlarda bile bu mimari soruların yüzde 11,8'ini doğru cevaplıyor. Çıkarımcı bir sistemin aynı durumda alabileceği puan sıfırdır. İpucu taşıyan ama cevabı içermeyen belgeler, üretime katkı yapabiliyor.

Bir ablasyon da getiricinin kendisini sınıyor. Öğrenilen getirici yerine sabit bir sözcük eşleşmesi getiricisi konduğunda açık alan soru cevaplamada tam eşleşme yüzde 43,5'ten 29,7'ye düşüyor — orada öğrenilen getirme kritik. Ama olgu doğrulama görevinde tablo tersine dönüyor: sözcük eşleşmesi öne geçiyor. Çalışmanın yorumu makul; o görevin iddiaları ağırlıklı olarak varlık merkezli, yani tam da kelime örtüşmesinin en güçlü olduğu durum. 29\. makaledeki SQuAD satırının aynısı, farklı bir görevde. Hangi getiricinin doğru olduğu, göreve bağlı bir ölçüm sorusudur.

## Dizini değiştirmek

Şimdi bu mimarinin en öğretici deneyine geliyoruz.

Araştırmacılar iki ayrı dizin kuruyor: biri 2016 tarihli Wikipedia'dan, öbürü 2018 tarihli olandan. Sonra bu iki tarih arasında görevi değişmiş **82 dünya lideri** seçip her birini "şu makamdaki kişi kimdir" biçiminde soruyorlar. Model aynı model; değişen tek şey hangi dizine bağlandığı.

| soru dönemi | 2016 dizini | 2018 dizini |
|---|---|---|
| 2016 liderleri | %70 | %12 |
| 2018 liderleri | %4 | %68 |

Köşegen ile köşegen dışı arasındaki fark bu makalenin özeti. Modelin "bildiği" şey, bağlandığı dizinin bildiği şeydir. Ağırlıklara hiç dokunulmadan, tek bir eğitim adımı atılmadan, modelin dünya bilgisi güncellenmiş oluyor.

18\. makaledeki tabloyla karşılaştır. Orada bir olguyu değiştirmek için ağırlıklara müdahale etmek gerekiyordu ve o müdahalenin nereye dokunduğunu bilmenin, düzenlemeyi bilmek anlamına gelmediğini görmüştük. Burada aynı iş bir dosyayı değiştirerek yapılıyor. Parametrik olmayan belleğin asıl vaadi doğruluk artışı değil, **düzenlenebilirlik**.

Aynı çalışmanın insan değerlendirmesi bunu bir başka eksende gösteriyor. Üretilen metinlerin olgusal doğruluğu karşılaştırıldığında, değerlendiriciler bu mimarinin çıktısını yüzde 42,7 oranında daha olgusal buluyor; yalnızca parametrik bilgiye dayanan taban modelin çıktısı yüzde 7,1 oranında öne çıkıyor.

## Ne zaman zarar veriyor

Şimdiye kadarki tablo tek yönlü göründü. Değil.

Alex Mallen ve arkadaşlarının ACL 2023'te sunduğu çalışma, uzun kuyruk sorularından oluşan 14 binlik bir küme kurup her soruyu iki kez soruyor: getirme ile ve getirme olmadan. Sonra soruları dört öbeğe ayırıyor ve her öbekte getirilen ilk belgenin cevabı içerme oranına bakıyor.

| | getirmeli düzen doğru | getirmeli düzen yanlış |
|---|---|---|
| **model tek başına doğru** | %24 (bulma 0,83) | %10 (bulma 0,14) |
| **model tek başına yanlış** | %17 (bulma 0,88) | %49 (bulma 0,11) |

![Dört gözlü bir tablo şeması. Satırlar modelin getirme olmadan doğru ya da yanlış cevap verdiğini, sütunlar getirmeli düzenin doğru ya da yanlış cevap verdiğini gösterir. Sol üst göz soruların yüzde 24'ünü ve 0,83 bulma oranını taşır ve nötr renktedir. Sağ üst göz yüzde 10 ve 0,14 bulma oranını taşır, vurgulu renktedir ve yanında getirmenin zarar verdiği yazar. Sol alt göz yüzde 17 ve 0,88 bulma oranını taşır, vurgulu renktedir ve yanında getirmenin kazandırdığı yazar. Sağ alt göz yüzde 49 ve 0,11 bulma oranını taşır ve nötr renktedir. Şeklin altında iki vurgulu gözün bulma oranları arasındaki büyük farkın, getirmenin kalitesinin sonucu belirlediğini gösterdiği yazılıdır.](assets/getirme-fayda-zarar.svg "Şekil 3 — Getirmenin kazandırdığı ve kaybettirdiği sorular")

Şekil 3'ün sağ üst gözü bu makalenin uyarısı: soruların yüzde 10'unda getirme, modelin zaten doğru bildiği bir cevabı bozuyor. O gözde getirilen belgenin cevabı içerme oranı 0,14 — genel ortalama olan 0,42'nin çok altında. Sol alttaki kazanç gözünde ise aynı oran 0,88. Yani getirme, kendisi doğru çalıştığında kazandırıyor; yanlış çalıştığında modelin kendi doğrusunu da götürüyor.

> **Kendini yokla:** Getirme, modelin zaten doğru bildiği bir soruda nasıl zarar verebilir?

Çünkü getirilen metin isteme girdiğinde model onu dikkate almak zorundadır — 21\. makalede kurduğumuz gibi pencereye giren her şey aynı diziye karışır ve modelin "bunu yok say" diyebileceği ayrı bir kanal yoktur. Cevabı içermeyen ama konuyla ilgili görünen bir pasaj, modelin kendi doğru cevabını bastırabilir. Ölçülen tabloda bu, soruların yüzde 10'unda oluyor ve o öbekte getirilen belgenin cevabı taşıma oranı 0,14 — yani getirme orada gerçekten başarısız olmuş.

Buradan doğal bir öneri çıkıyor ve çalışma onu **uyarlanabilir getirme** olarak adlandırıyor: her soruda değil, yalnızca modelin bilmesi beklenmeyen sorularda getir. Sorunun varlığı ne kadar popülerse model o kadar iyi biliyor; eşik altındakiler için dizine başvur. Bu hem doğruluğu yükseltiyor hem çıkarım maliyetini düşürüyor.

## Neyi çözmüyor

Getirme, 17\. makaledeki dışsal uydurmayı içsel uydurmaya çeviriyordu; yani sorunu denetlenebilir hâle getiriyordu. Denetlenebilir olmak, çözülmüş olmak değil.

**Model getirileni okumayabilir.** Shayne Longpre ve arkadaşlarının EMNLP 2021'de sunduğu çalışma bunu ölçmek için zarif bir düzenek kuruyor: bağlamdaki cevap varlığını başka bir varlıkla değiştirip modelin hangisini söylediğine bakıyorlar. "ABD Birinci Dünya Savaşı'nda kiminle savaştı?" sorusunun bağlamındaki "Almanya" ifadesi "Tayvan" ile değiştirildiğinde model hâlâ "Almanya" diyorsa, önündeki metni değil ezberini okuyor demektir. Ölçülen oran ezber oranı olarak adlandırılıyor ve düzeneğe göre modelin ezberlediği cevaba dönme sıklığı yüzde 20 ile yüzde 75 arasında değişiyor. Aynı çalışma iki uyarı daha veriyor: bu eğilim model büyüdükçe artıyor, ve getirilen belge sayısı arttıkça da artıyor — altın belgenin verildiği düzende ezber oranı 4 iken, yüz belge getirildiğinde 77'ye çıkıyor.

**Getirilen her belge yardımcı değil.** Florin Cuconasu ve arkadaşlarının SIGIR 2024'te sunduğu çalışma getirilen parçaları dört türe ayırıyor: cevabı içeren altın belge, cevabı içeren başka ilgili belgeler, cevabı içermeyen ama konuyla yakından ilgili **dikkat dağıtıcı** belgeler, ve tamamen ilgisiz rastgele belgeler. Dikkat dağıtıcı belgenin tanımı önemli: bunlar getiricinin en yüksek puan verdiği ama cevabı taşımayan parçalardır. Çalışmanın örneği açıklayıcı — Napolyon'un atının rengi soruluyorsa, eşinin atının rengini anlatan pasaj hem çok ilgili hem tamamen yanlıştır.

Sonuç iki katmanlı ve ikisi de sezgiye aykırı. Dikkat dağıtıcı belgeler doğruluğu **düşürüyor**. Buna karşılık isteme rastgele belgeler eklemek doğruluğu yüzde 35'e varan oranda **artırıyor**. Yani getiricinin en iyi bulduğu ama alakasız çıkan parçalar, hiç ilgisi olmayan parçalardan daha zararlı. 29\. makaledeki uyarı burada karşılığını buluyor: bir getirme hattında ölçülen kalite, yalnızca hangi belgelerin bulunduğunun değil, hangi yanlışların bulunduğunun da fonksiyonudur.

## Getirmenin disiplini

**Parametrik bilgi düzgün dağılmaz.** Aynı model bire bir ilişkilerde dörtte üç doğrulukla çalışırken doğum tarihlerinde yüzde iki bandında kalabilir.

**Bir olguyu bilmek, onu kaç belgede gördüğüyle ölçülür.** İlgili belge sayısı bin kat arttığında doğruluk iki katına çıkabiliyor.

**Uzun kuyruk veriyle de ölçekle de kapanmıyor.** Derlemler birbiriyle yüksek oranda ilişkili; ölçek doğrusu ise pratikte erişilemeyecek bir parametre sayısına işaret ediyor.

**Parametrik olmayan belleğin asıl vaadi düzenlenebilirliktir.** Dizini değiştirmek, ağırlıklara dokunmadan modelin bildiğini değiştirir.

**Getirme her soruda iyi değildir.** Modelin zaten doğru bildiği sorularda kötü bir getirme, doğru cevabı bozabilir.

**Model önüne konanı okumak zorunda değildir.** Bağlam ile ezber çatıştığında model ezbere dönebiliyor ve bu eğilim model büyüdükçe artıyor.

**En tehlikeli belge, ilgisiz olan değil, ilgili görünendir.** Getiricinin en yüksek puanladığı ama cevabı taşımayan parçalar, rastgele parçalardan daha çok zarar veriyor.

### Sırada ne var

Bu makale boyunca getiriciyi bir kara kutu olarak kullandık: "en ilgili parçaları bul" dedik ve geri kalanını 29\. makaleye havale ettik. Ama bu makalenin son bulgusu tam da o kutunun içine bakmayı zorunlu kılıyor — çünkü hattın kalitesini belirleyen şey, getiricinin neyi bulduğu kadar neyi yanlışlıkla üste çıkardığı.

29\. makale bu kutunun bir yarısını açmıştı: anlamsal arama, ikili kodlayıcı, ortak uzay. Öbür yarısı hep kapalı kaldı. "Sözcük eşleşmesi" diye geçiştirdiğimiz altmış yıllık mühendislik tam olarak nasıl çalışıyor, neden hâlâ sağlam bir taban çizgisi, ve iki yaklaşımı birleştirmek istediğimizde puanları nasıl toplayacağız?

## Kaynakça

- Petroni, F., Rocktäschel, T., Riedel, S., Lewis, P., Bakhtin, A., Wu, Y. & Miller, A. (2019). *Language Models as Knowledge Bases?*. EMNLP-IJCNLP 2019, s. 2463–2473. [Bağlantı](https://aclanthology.org/D19-1250/)
- Kandpal, N., Deng, H., Roberts, A., Wallace, E. & Raffel, C. (2023). *Large Language Models Struggle to Learn Long-Tail Knowledge*. ICML 2023, PMLR 202, s. 15696–15707. [Bağlantı](https://proceedings.mlr.press/v202/kandpal23a.html)
- Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W., Rocktäschel, T., Riedel, S. & Kiela, D. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*. NeurIPS 2020. [Bağlantı](https://papers.nips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html)
- Mallen, A., Asai, A., Zhong, V., Das, R., Khashabi, D. & Hajishirzi, H. (2023). *When Not to Trust Language Models: Investigating Effectiveness of Parametric and Non-Parametric Memories*. ACL 2023, s. 9802–9822. [Bağlantı](https://aclanthology.org/2023.acl-long.546/)
- Longpre, S., Perisetla, K., Chen, A., Ramesh, N., DuBois, C. & Singh, S. (2021). *Entity-Based Knowledge Conflicts in Question Answering*. EMNLP 2021, s. 7052–7063. [Bağlantı](https://aclanthology.org/2021.emnlp-main.565/)
- Cuconasu, F., Trappolini, G., Siciliano, F., Filice, S., Campagnano, C., Maarek, Y., Tonellotto, N. & Silvestri, F. (2024). *The Power of Noise: Redefining Retrieval for RAG Systems*. SIGIR 2024, s. 719–729. [Bağlantı](https://dl.acm.org/doi/10.1145/3626772.3657834)
