---
article_id: article_301158b1-5b41-4304-a4f7-182c1171eb37
title: "RAG'in Ötesi: Getirerek Akıl Yürüten Sistemler"
slug: ragin-otesi-getirerek-akil-yuruten-sistemler
category: agents-and-retrieval
level: intermediate
reading_order: 46
summary: "Tek getirmenin cevaplayamadığı çok adımlı soruları kurar: modelin iki olguyu tek tek bilip birleştiremediği bileşim açığını, getirmeyi düşünce zincirine örmenin ölçülen kazancını, düşün-eyle-gözle döngüsünün uydurmayı nasıl sıfırlayıp yeni hata türleri açtığını, ne zaman getirileceğine modelin kendi belirsizliğiyle karar vermeyi, hakemi döngünün içine alan yansıma token'larını ve adım sayısı arttıkça getirme hatasının nasıl biriktiğini ölçümlerle anlatır."
tags:
  - cok-adimli-soru
  - yinelemeli-getirme
  - dusun-eyle-gozle
  - etkin-getirme
  - yansima-tokenlari
content_hash: sha256:5d587253ce1ea09bf6bb51ea57823d0fb87a7aed3fc19e1c32587fe5c67d0c3f
classification_version: 1
classification_batch: 10
---
## Tek getirmenin yetmediği soru

Son beş makale boyunca hat hep aynı biçimde çalıştı: soru geldi, bir kez getirildi, cevap üretildi. 44\. makale bu tek getirmenin düğmelerini, 45\. makale ölçüsünü kurdu. Şimdi düzenin kendisini sorgulayacağız, çünkü bazı sorular tek getirmeyle cevaplanamaz.

Şu soruyu düşün: "Justin Bieber'ın doğduğu yıl Masters turnuvasını kim kazandı?" Cevap için iki olgu gerekiyor — doğum yılı, sonra o yılın şampiyonu — ve ikincisini aramak için birincisinin cevabını bilmek zorundasın. Soruyu olduğu gibi dizine gönderirsen iki konuya birden yakın, ikisine de tam uymayan belgeler gelir; 44\. makaledeki yeniden yazma tablosunda çok adımlı soruların getirmeyle **kötüleştiğini** görmüştük. Sorun getiricinin kalitesi değil, ikinci sorgunun henüz var olmaması.

Alandaki adı **çok adımlı soru** (multi-hop question): cevabı birden çok belgeden, belirli bir sırayla toplanması gereken soru. Bu makale üç şeyi kuruyor: modelin böyle sorularda neden tek başına da başarısız olduğunu, getirmeyi bir döngüye almanın ölçülen kazancını ve döngünün kendi bedelini.

## Bileşim açığı

Önce getirmesiz hâli ölçelim. Model iki olguyu ayrı ayrı biliyorsa birleştirmesi kolay olmalı — değil mi?

Ofir Press ve arkadaşlarının EMNLP 2023 bulguları programında sunduğu çalışma bunu doğrudan ölçtü. Ünlü kişilerin doğum yılı, doğum yeri gibi olgularını birleştiren iki adımlı sorular kurdular ve modele hem bileşik soruyu hem de iki alt soruyu ayrı ayrı sordular. Davinci-002, alt soruların büyük kısmını biliyor; bileşik soruların yüzde 45,4'ünü cevaplıyor. En zor kategoride tablo çarpıcı: alt soruların yüzde 80'i doğru, bileşik soruların yalnızca yüzde 1,2'si. Model her iki olguyu da "bilen" ama ikisini yan yana getiremeyen bir durumda.

Yazarlar bu olguya **bileşim açığı** (compositionality gap) diyor: modelin alt soruları doğru cevaplayıp bileşik soruyu cevaplayamadığı soruların oranı. Ve çalışmanın asıl bulgusu, açığın ölçekle **kapanmaması**: küçükten büyüğe bütün model boylarında yaklaşık yüzde 40'ta sabit kalıyor. Model büyüdükçe daha çok olgu biliyor, ama bu olguları birleştirme yeteneği aynı hızda büyümüyor.

31\. makaledeki tartışmayı hatırla: modelin akıl yürütmesi, eğitimde görülmüş hesap parçalarını tanıyıp birleştirmeye ne kadar dayanıyor? Bileşim açığı bu sorunun getirme dünyasındaki ölçüsü. İki olguyu birleştirmek eğitimde görülmemiş bir parça olabilir; model iki parçayı da tanıyıp aradaki köprüyü kuramıyor.

Çalışmanın önerdiği düzeltme, 32\. makaledeki ara adımların bir özel biçimi. **Kendine sorma** (self-ask) düzeninde model, bileşik soruyu cevaplamadan önce açıkça takip sorusu yazar — "Justin Bieber ne zaman doğdu?" — kendi cevabını verir, sonra bir sonraki takip sorusunu yazar. Bu biçimin bir yan ürünü var: takip sorusu tek başına bir sorgudur ve **bir arama motoruna gönderilebilir**. Modelin kendi cevabı yerine aramanın sonucu isteme konur ve zincir devam eder.

| yöntem | Bamboogle | 2WikiMultiHopQA | MuSiQue |
|---|---|---|---|
| doğrudan cevap | 17,6 | 25,4 | 5,6 |
| düşünce zinciri | 46,4 | 29,8 | 12,6 |
| yalnızca arama motoru | 0,0 | 2,2 | 1,5 |
| kendine sorma | 57,6 | 30,0 | 13,8 |
| kendine sorma + arama | 60,0 | 40,1 | 15,2 |

![Üç gruplu, üç sütunlu yatay bir çubuk şeması. Her grupta solda bir soru kümesinin adı — Bamboogle, 2WikiMultiHopQA, MuSiQue — ortada üst üste dört çubuk, sağda dört değer vardır; çubuklar doğrudan cevap, düşünce zinciri, kendine sorma ve kendine sorma artı arama düzenlerinin doğruluğunu gösterir, sonuncusu vurgulu renktedir. Değerler ilk grupta 17,6, 46,4, 57,6, 60,0; ikinci grupta 25,4, 29,8, 30,0, 40,1; üçüncü grupta 5,6, 12,6, 13,8, 15,2 olarak yazılıdır. Şeklin sağında dört satırlık bir gösterge düzenleri açıklar. Şeklin altında ara adımların tek başına kazandırdığı, aramanın üstüne eklendiği ve arama motorunun tek başına neredeyse sıfır aldığı yazılıdır.](assets/bilesim-acigi-ve-arama.svg "Şekil 1 — Ara adımlar ve arama: her biri ayrı bir kazanç")

Şekil 1'de üç şey aynı anda görünüyor. Ara adımlar tek başına büyük kazanç veriyor — Bamboogle'da 17,6'dan 46,4'e. Takip sorularını açıkça yazmak onun üstüne ekliyor. Arama, en çok 2WikiMultiHopQA'da kazandırıyor: 30,0'dan 40,1'e. Ve üçüncü satır önemli: arama motoru tek başına neredeyse hiçbir soruyu cevaplayamıyor, çünkü bileşik sorunun ikinci yarısı sorulmadan aranamıyor. Kazanç ne modelden ne aramadan; ikisinin **sırayla** çalışmasından geliyor.

> **Kendini yokla:** Bileşim açığı model büyüdükçe neden kapanmıyor?

Çünkü ölçek, modelin olgu dağarcığını büyütüyor ama iki olguyu birleştirme işlemi ayrı bir yetenek ve aynı hızda büyümüyor. 40\. makaledeki uyarının bir başka biçimi: adım sayısı arttığında başarı çarpımsal düşer ve düzeltme modelin içinden değil, dışarıdan gelen bir yapıdan — burada zincire örülmüş bir aramadan — gelir.

## Getirmeyi zincire örmek

Kendine sorma, aramayı zincirin belirli noktalarına — takip sorularına — bağlıyordu. Harsh Trivedi ve arkadaşlarının ACL 2023'te sunduğu çalışma bunu genelleştiriyor: **getirmeyi düşünce zinciriyle iç içe örmek** (interleaving retrieval with chain-of-thought). Düzen basit. Model zincirin bir cümlesini üretir; o cümle sorgu olarak dizine gönderilir; gelen parçalar isteme eklenir; model bir sonraki cümleyi bu genişlemiş istemle üretir. Her cümle hem bir akıl yürütme adımı hem bir sonraki aramanın sorgusudur.

Ölçülen kazanç iki katmanda. Getirme tarafında, dört çok adımlı soru kümesinde altın paragrafların bulma oranı tek adımlı getirmeye göre 11,3, 22,6, 12,5 ve 21,2 puan artıyor. Cevap tarafında F1 puanı 7,1, 13,2 ve 7,1 artıyor; yalnızca bir kümede — modelin ilgili bilgiyi zaten ezberinde taşıdığı kümede — getirme 21 puan iyileşirken cevap değişmiyor. 41\. makaledeki tabloyu hatırla: model zaten biliyorsa getirme kazandırmaz. Bir de ölçek bulgusu var: 3 milyar parametreli bir model bu döngüyle, tek adımlı getirme yapan 58 kat büyük modeli geçiyor. Yazarların insan eliyle yaptığı bir inceleme kazancın nereden geldiğini gösteriyor: örülmüş zincirlerde olgusal hata daha az, çünkü her adım bir belgeye dayanıyor.

Zhihong Shao ve arkadaşlarının EMNLP 2023 bulguları programında sunduğu çalışma aynı fikri daha kaba bir taneyle kuruyor: cümle cümle değil, cevap cevap. Model bir cevap üretir; cevabın tamamı soruyla birleştirilip yeniden aranır; gelen belgelerle cevap yeniden üretilir. HotpotQA'da tek getirmeli doğrudan cevap 31,6 tam eşleşme alırken birinci yineleme 39,2, ikincisi 44,1, üçüncüsü 45,2 veriyor; yedinci yineleme 45,1. Kazancın büyük kısmı ikinci yinelemede geliyor ve sonrası doyuyor — 36\. makaledeki öz-tutarlılık eğrisinin aynısı, bu kez getirme için.

![İki bölmeli bir karşılaştırma şeması. Sol bölme tek getirmeli düzeni gösterir: soru kutusundan dizine bir ok gider, dizinden parçalar kutusuna, oradan modele ve cevaba doğrusal bir akış vardır; altında getirmenin bir kez, cevaptan önce yapıldığı yazılıdır. Sağ bölme örülmüş döngüyü gösterir: soru kutusundan model kutusuna, modelden zincirin bir cümlesi kutusuna, oradan dizine, dizinden yeni parçalar kutusuna ve tekrar modele dönen bir çevrim çizilidir; çevrimden çıkan bir ok cevap kutusuna gider. Sağ bölmenin altında her cümlenin hem bir akıl yürütme adımı hem bir sonraki aramanın sorgusu olduğu yazılıdır. Şeklin altında ikinci sorgunun ancak birinci cevaptan sonra yazılabildiği belirtilir.](assets/tek-getirme-ve-dongu.svg "Şekil 2 — Bir kez getirmek ile döngüde getirmek")

Şekil 2'nin sağ bölmesi bu makalenin geri kalanının iskeleti. Bundan sonraki her düzen, o çevrimin bir parçasını değiştiriyor: modelin ne zaman aradığını, ne aradığını ya da aradığını nasıl denetlediğini.

## Düşün, eyle, gözle

Shunyu Yao ve arkadaşlarının ICLR 2023'te sunduğu çalışma, döngüyü bir dil olarak kuruyor. Modelin ürettiği metin üç türde satırdan oluşur: bir **düşünce** (thought) — ne yapacağını planladığı serbest metin —, bir **eylem** — "şunu ara", "bu sayfada şu terimi bul", "cevabı ver" — ve eylemin dünyadan getirdiği **gözlem** (observation). 37\. makaledeki eylem sözcüğünü hatırlıyorsun; orada bir sonraki token'dı, burada dünyaya dokunan bir çağrı. Düşünce, eylem ve gözlem birbirini izler ve model bir sonraki düşünceyi bütün geçmişi görerek yazar.

Sonuçlar tek başına etkileyici değil, öğretici:

| yöntem | HotpotQA (tam eşleşme) | Fever (doğruluk) |
|---|---|---|
| doğrudan cevap | 28,7 | 57,1 |
| düşünce zinciri | 29,4 | 56,3 |
| öz-tutarlılık (21 zincir) | 33,4 | 60,4 |
| yalnızca eylem | 25,7 | 58,9 |
| düşün–eyle–gözle | 27,4 | 60,9 |
| düşün–eyle–gözle, sonra öz-tutarlılık | 35,1 | 62,0 |

Döngü, HotpotQA'da düşünce zincirinin biraz gerisinde. Ama yazarların insan eliyle yaptığı hata incelemesi tabloyu ters çeviriyor. Düşünce zincirinin doğru cevaplarının yüzde 14'ü uydurulmuş olgularla doğruya varmış; döngüde bu oran yüzde 6. Yanlış cevaplarda düşünce zincirinin hatalarının yüzde 56'sı uydurma; döngüde **yüzde sıfır**. Buna karşılık döngünün kendi hata türleri var: yanlışların yüzde 47'si akıl yürütme hatası — tekrar eden adımlardan çıkamamak dahil — ve yüzde 23'ü arama sonucunun boş ya da işe yaramaz gelmesi. Dış dünyaya bağlanmak uydurmayı siliyor, ama iki yeni hata kapısı açıyor: dünyanın cevap vermemesi ve döngünün kendine dolanması. 35\. makalede dış geri bildirimin öz-düzeltmeyi mümkün kıldığını görmüştük; burada dış geri bildirimin bedeli görünüyor.

Bu yüzden tablonun son satırı HotpotQA'da en iyisi: önce döngü çalışıyor, belirli adım sayısında cevap bulamazsa öz-tutarlılığa devrediliyor. Ters sıra — önce öz-tutarlılık, zincirler uzlaşamazsa döngü — Fever'da 64,6 ile en iyi sonucu veriyor. İki düzenin hataları farklı olduğu için birleşimleri ikisinden de iyi; 29\. makaledeki melez arama fikrinin akıl yürütme biçimi.

## Ne zaman getirmeli: model emin değilken

Şimdiye kadarki düzenler ne zaman aranacağını yapısal olarak belirliyordu: her takip sorusunda, her cümlede, her cevapta. Zhengbao Jiang ve arkadaşlarının EMNLP 2023'te sunduğu çalışma bu kararı modelin kendi belirsizliğine bağlıyor ve düzene **etkin getirme** (active retrieval) diyor.

Mekanizma şöyle. Model bir sonraki cümleyi geçici olarak üretir. Cümledeki token'lardan herhangi birinin olasılığı bir eşiğin altındaysa — model o cümleden emin değilse — cümle sorgu olarak kullanılıp getirme yapılır ve cümle getirilen parçalarla yeniden üretilir; eminse cümle olduğu gibi kalır ve arama yapılmaz. 16\. makaledeki kalibrasyon burada bir düğmeye dönüşüyor: modelin kendi güveni, ne zaman dışarı bakacağını söylüyor. 41\. makaledeki uyarlanabilir getirme sorunun popülerliğine bakıyordu; bu düzen cümle cümle, üretim sırasında bakıyor.

Kazanç ölçülmüş. İki adımlı bir soru kümesinde tam eşleşme: getirmesiz 28,2; sorunun başında tek getirme 39,4; her cümleden önce önceki cümleyle getirme 39,0; önceki pencereyle 43,2; soruyu alt sorulara ayırıp her biri için getirme 47,8; ileriye bakan etkin getirme **51,0**. İnce ayrım öğretici: önceki cümleyle aramak neredeyse hiç kazandırmıyor, çünkü önceki cümle bir sonraki cümlenin ihtiyacını söylemez. Henüz yazılmamış cümlenin taslağıyla aramak kazandırıyor; 40\. makaledeki "hatayı oluştuğu yerde yakalamak" fikrinin getirme hâli.

## Hakemi döngünün içine almak

45\. makale hakemi hattın dışında tutuyordu: cevap bitince ölçülüyordu. Akari Asai ve arkadaşlarının ICLR 2024'te sunduğu çalışma hakemi üretimin içine alıyor ve bunu 30\. makaledeki araçla yapıyor — özel token'larla.

Model, sıradan sözcüklerin yanında dört tür **yansıma token'ı** (reflection token) üretmeyi öğreniyor. Birincisi getirme kararı: şimdi getir, getirme, ya da devam et. İkincisi ilgililik: getirilen parça soruya yararlı mı. Üçüncüsü destek: üretilen bölüm parçayla tamamen, kısmen destekleniyor mu, yoksa desteklenmiyor mu. Dördüncüsü fayda: bölüm cevap için ne kadar işe yaradı. Bu token'lar 45\. makaledeki üç ölçünün — bağlam ilgililiği, kaynak sadakati, cevap ilgililiği — üretim anındaki karşılıkları.

![Yukarıdan aşağıya akan bir karar şeması. En üstte soru ve o ana kadar üretilen metin kutusu vardır. Altında ilk karar kutusu getir mi diye sorar; hayır dalı doğrudan üretime, evet dalı getirilen parçalar kutusuna gider. Getirilen her parça için ikinci karar ilgili mi diye sorar; ilgisiz parçalar elenir. Kalan parçaların her biriyle bir bölüm üretilir ve üçüncü karar üretilen bölümün parçayla desteklenip desteklenmediğini, dördüncü karar bölümün cevaba ne kadar yararlı olduğunu sorar. En altta bu iki puanla adaylar arasından bir bölümün seçildiği ve seçilen bölümle döngünün bir sonraki bölüm için başa döndüğü gösterilir. Şeklin altında dört kararın da modelin ürettiği özel token'lar olduğu ve eleştirmen modele yalnızca eğitimde ihtiyaç duyulduğu yazılıdır.](assets/yansima-tokenlari.svg "Şekil 3 — Dört karar, dört yansıma token'ı")

Şekil 3'teki dört karar, sıradan token'larla aynı dağılımdan üretiliyor; modelin "getir" demesi ile "Paris" demesi arasında mekanik bir fark yok. Fark eğitimde.

Eğitim düzeni 38\. makaledeki adım etiketlerine benziyor. Önce güçlü bir modelden alınan yansıma etiketleriyle küçük bir **eleştirmen model** (critic model) eğitiliyor; sonra eleştirmen, 150 bin talimat-cevap çiftinin arasına yansıma token'larını çevrimdışı yerleştiriyor; üretici model bu işaretli metinle sıradan dil modelleme kaybıyla eğitiliyor. Çıkarım anında eleştirmene gerek kalmıyor — üretici, yansıma token'larını kendisi üretiyor ve her bölüm için birkaç aday parçayı bu token'ların olasılıklarıyla puanlayıp en iyisini seçiyor.

Sonuçlar, 7 milyar parametreli bir modelin ölçeğinde:

| düzen | PopQA doğruluk | ASQA atıf kesinliği | ASQA atıf bulma oranı |
|---|---|---|---|
| Llama-2 7B, getirmeli | 38,2 | 2,9 | 4,0 |
| ChatGPT, getirmeli | 50,8 | 65,1 | 76,6 |
| yansımalı model, 7B | 54,9 | 66,9 | 67,8 |
| yansımalı model, 13B | 55,8 | 70,3 | 71,3 |

Getirmeli sıradan bir 7 milyarlık model atıflarında neredeyse hiç isabet ettiremiyor; aynı ölçekte yansımalı model, çok daha büyük bir ticari modelin atıf kesinliğini geçiyor. Kazancın kaynağı modelin büyüklüğü değil, ne zaman getireceğine ve ürettiğinin desteklenip desteklenmediğine üretirken karar verebilmesi. Bir yan kazanç daha var: yansıma token'larının ağırlıkları çıkarım anında değiştirilebiliyor — destek token'ına daha çok ağırlık verirsen model daha çok atıf yapan, daha az akıcı cevaplar üretiyor. 45\. makaledeki fayda–atıf gerilimi burada bir düğme.

> **Kendini yokla:** Yansıma token'ları hakemi hattın dışından içine alınca ne değişir?

Dışarıdaki hakem cevabı ölçer; içerideki hakem cevabı **değiştirir**. Desteklenmeyen bölüm daha üretilirken elenir, gereksiz getirme yapılmaz, ilgisiz parça isteme girmez. Bedel de içeride: her bölüm için birkaç aday üretmek ve puanlamak, tek geçişli üretimden pahalıdır.

## Adımlar çoğalınca

Döngü her sorunu çözmüyor ve 40\. makale bunun nedenini önceden söylemişti: adım sayısı arttıkça başarı çarpımsal düşer. Getirme döngüsünde her adım kendi getirme hatasını taşır.

Wenhan Xiong ve arkadaşlarının ICLR 2021'de sunduğu çalışma bunun getirme tarafını ölçtü. İki adımlı sorularda ilk parça soruyla aranır, ikinci parça soru artı ilk parçayla aranır — her adımın sorgusu bir öncekinin sonucunu içerir. İki altın parçayı birden ilk iki sonuçta bulma oranı yüzde 65,9; sözcük eşleşmesiyle aynı iş yüzde 10,3. İlk yirmi sonuçta yüzde 80,2. Yani iki adımda bile beş sorudan birinde zincirin bir halkası kayıp.

Kendi hesabımızı yapalım; sayılar açıklama amaçlı. Birinci adımın bulma oranı 0,9, ikinci adımınki — birinci doğruysa — 0,8 olsun. İki halkanın da doğru gelme olasılığı 0,9 × 0,8 = 0,72; üç adımlı bir soruda üçüncü adım 0,8 ise 0,58. Bu, 40\. makaledeki eğrinin getirme kılığı. Ve birinci adım yanlış geldiğinde ikinci adımın sorgusu yanlış parçayla kurulur — hata yalnızca birikmez, bir sonraki aramayı yanlış yöne çevirir. Düşün–eyle–gözle incelemesindeki "arama sonucu hatası" yüzde 23 bu birikimin ölçülmüş yüzüdür.

Bu yüzden değerlendirme kümelerinin nasıl kurulduğu önemli. Zhilin Yang ve arkadaşlarının EMNLP 2018'de sunduğu çalışma, çok adımlı soruların ilk büyük kümesini kurdu: 113 bin soru, her biri iki Wikipedia paragrafına dayanıyor; bir kısmı bir **köprü varlık** (bridge entity) üzerinden — "X'in üyesi olan kişinin eski grubu" —, bir kısmı iki varlığı **karşılaştıran** sorular; ve her soru için hangi cümlelerin cevabı desteklediği işaretli. Bu **destekleyici olgular** (supporting facts), sonraki bütün ölçümlerin altın paragraf etiketi oldu. İnsanlar bin örneklik bir alt kümede yüzde 83,6 tam eşleşme alırken temel model, dikkat dağıtıcı paragraflarla birlikte yüzde 60,9'da kalıyor.

Ama Harsh Trivedi ve arkadaşlarının Transactions of the Association for Computational Linguistics'te 2022'de yayımlanan çalışması bir tuzağı gösterdi. Bir soru gerçekten çok adımlı mı, yoksa model tek bir paragraftan **kısayolla** cevaplayabiliyor mu? Yazarlar bunu ölçen bir düzenek kurdu: modele zincirin halkaları birbirinden koparılmış hâlde veriliyor ve yine cevaplayabiliyorsa soru **bağlantısız akıl yürütmeyle** (disconnected reasoning) çözülebiliyor demektir. İlk kümede bu kısayol puanı 68,8; iki adımlı bir başka kümede 63,4 — yani soruların çoğunluğu, zinciri hiç kurmadan çözülebiliyor. Kendi kurdukları küme, tek adımlı soruları özenle birleştirip kısayolu bozarak 37,8'e iniyor. 16\. makaledeki disiplinin çok adımlı hâli: bir küme çok adımlı görünüp tek adımlı ölçüyor olabilir, ve döngülü sistemlerin kazancı ancak kısayolu kapatılmış kümelerde görünür.

Son bir maliyet notu. Shao ve arkadaşlarının HotpotQA ölçümünde düşün–eyle–gözle döngüsü soru başına ortalama 2,9 model çağrısı ve 14,3 getirilmiş paragraf harcıyor; kendine sorma 3,2 çağrı ve 16,0 paragraf. Tek getirmeli hattın bir çağrısı ve beş parçasıyla karşılaştır. 28 ve 33\. makalelerdeki muhasebe: döngü, doğruluğu çağrı sayısıyla satın alıyor ve 40\. makaledeki gecikme uyarısı burada da geçerli — her adım kendi ön dolumunu ve üretimini getiriyor.

## Döngünün disiplini

**İkinci sorgu birinci cevaptan sonra yazılır.** Çok adımlı soruda tek getirme yapısal olarak yetersizdir; sorgu henüz yoktur.

**Bileşim açığı ölçekle kapanmıyor.** Model iki olguyu bilip birleştiremiyor; düzeltme dışarıdan, zincire örülmüş aramadan geliyor.

**Getirmeyi zincire örmek iki katmanda kazandırır.** Altın paragrafların bulma oranı ve cevap doğruluğu birlikte artar; kazanç ikinci yinelemede doyar.

**Dış dünya uydurmayı siler, iki kapı açar.** Döngüde uydurma kaynaklı hata sıfıra iniyor; yerini arama sonucu hatası ve kendine dolanan döngüler alıyor.

**Ne zaman getirileceğine belirsizlik karar verebilir.** Henüz yazılmamış cümlenin taslağıyla aramak, önceki cümleyle aramaktan açık farkla iyidir.

**Hakem içeri alınabilir.** Yansıma token'ları, ilgililik ve destek kararını üretim anına taşır; küçük bir model, büyük bir modelin atıf kesinliğini geçebilir.

**Halka sayısı arttıkça zincir kopar.** Adım başına getirme hatası çarpımsal birikir ve bir sonraki aramayı yanlış yöne çevirir; ölçüm ancak kısayolu kapatılmış kümelerde anlamlıdır.

### Sırada ne var

Bu makale boyunca modelin dünyaya dokunduğu tek eylem vardı: aramak. Ama düşün–eyle–gözle döngüsündeki "eylem" satırı aramaya özel değil. Timo Schick ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma bunun ilk kanıtını verdi: 6,7 milyar parametreli bir model, hesap makinesi, soru-cevap sistemi, arama motoru, çevirmen ve takvim çağrılarını ne zaman yapacağını kendi kendine öğrenince, olgu sorularında 25 kat büyük bir modeli geçti — bir olgu kümesinde 39,8'e karşı 53,5, bir aritmetik kümesinde 14,0'a karşı 40,4. Arama, modelin çağırabileceği araçlardan yalnızca biri. Bir sonraki makale eylemin kendisini soruyor: model bir işlevi nasıl çağırır, çağrının biçimi nasıl garanti edilir ve dönen sonuç isteme nasıl girer?

## Kaynakça

- Press, O., Zhang, M., Min, S., Schmidt, L., Smith, N. A. & Lewis, M. (2023). *Measuring and Narrowing the Compositionality Gap in Language Models*. Findings of EMNLP 2023, s. 5687–5711. [Bağlantı](https://aclanthology.org/2023.findings-emnlp.378/)
- Trivedi, H., Balasubramanian, N., Khot, T. & Sabharwal, A. (2023). *Interleaving Retrieval with Chain-of-Thought Reasoning for Knowledge-Intensive Multi-Step Questions*. ACL 2023, s. 10014–10037. [Bağlantı](https://aclanthology.org/2023.acl-long.557/)
- Shao, Z., Gong, Y., Shen, Y., Huang, M., Duan, N. & Chen, W. (2023). *Enhancing Retrieval-Augmented Large Language Models with Iterative Retrieval-Generation Synergy*. Findings of EMNLP 2023, s. 9248–9274. [Bağlantı](https://aclanthology.org/2023.findings-emnlp.620/)
- Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K. & Cao, Y. (2023). *ReAct: Synergizing Reasoning and Acting in Language Models*. ICLR 2023. [Bağlantı](https://openreview.net/forum?id=WE_vluYUL-X)
- Jiang, Z., Xu, F. F., Gao, L., Sun, Z., Liu, Q., Dwivedi-Yu, J., Yang, Y., Callan, J. & Neubig, G. (2023). *Active Retrieval Augmented Generation*. EMNLP 2023, s. 7969–7992. [Bağlantı](https://aclanthology.org/2023.emnlp-main.495/)
- Asai, A., Wu, Z., Wang, Y., Sil, A. & Hajishirzi, H. (2024). *Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=hSyW5go0v8)
- Xiong, W., Li, X. L., Iyer, S., Du, J., Lewis, P., Wang, W. Y., Mehdad, Y., Yih, W., Riedel, S., Kiela, D. & Oğuz, B. (2021). *Answering Complex Open-Domain Questions with Multi-Hop Dense Retrieval*. ICLR 2021. [Bağlantı](https://openreview.net/forum?id=EMHoBG0avc1)
- Yang, Z., Qi, P., Zhang, S., Bengio, Y., Cohen, W. W., Salakhutdinov, R. & Manning, C. D. (2018). *HotpotQA: A Dataset for Diverse, Explainable Multi-hop Question Answering*. EMNLP 2018, s. 2369–2380. [Bağlantı](https://aclanthology.org/D18-1259/)
- Trivedi, H., Balasubramanian, N., Khot, T. & Sabharwal, A. (2022). *MuSiQue: Multihop Questions via Single-hop Question Composition*. Transactions of the Association for Computational Linguistics 10, s. 539–554. [Bağlantı](https://doi.org/10.1162/tacl_a_00475)
- Schick, T., Dwivedi-Yu, J., Dessì, R., Raileanu, R., Lomeli, M., Hambro, E., Zettlemoyer, L., Cancedda, N. & Scialom, T. (2023). *Toolformer: Language Models Can Teach Themselves to Use Tools*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/d842425e4bf79ba039352da0f658a906-Abstract-Conference.html)
