---
article_id: article_2a73f0c5-9b41-4e8e-b6d2-5c1e4a8f7d20
title: "Robotik ve Somutlaşmış Yapay Zekâ"
slug: robotik-ve-somutlasmis-yapay-zeka
category: multimodal-and-future
level: advanced
reading_order: 111
summary: "110. makalenin bıraktığı soruyu gövdede sınar: bir dil modelinin öğrendikleri, durumun bir konum ve eylemin bir tork olduğu bir dünyada ne kadar işe yarar? 51. makalenin eylem arayüzü borcunu gerçek bir kolda öder — sekiz tam sayı, 256 kutu, saniyede bir ile üç karar —, internetten gelen ön eğitimin görülen görevlerde hiçbir şey kazandırmayıp görülmemiş nesnelerde puanı ikiye katladığını gösterir, ve gerçek gövde verisinin neden bu kadar az olduğunu bir üretim hızı hesabıyla yanıtlar."
tags:
  - robotik
  - somutlasmis-yapay-zeka
  - eylem-arayuzu
  - veri-kitligi
  - benzetim
content_hash: sha256:43f2125ccfc6aec619d17dbe5d459a41b9e4ce6f426a6138a40b2f40d4c25265
classification_version: 1
classification_batch: 27
---
## Kavşaktan konuma

110\. makale "dünya modeli" sorusunu ölçülebilir hâle getirdi ve sınavlarını dizilerin üstünde yaptı: hamle dizileri, kavşak dizileri, oturma düzeni bulmacaları. O dünyaların ortak bir rahatlığı vardı. Yanlış bir adımın bedeli bir ölçüt puanıydı; bardak devrilmiyordu, model bir sonraki örneğe temiz bir sayfayla başlıyordu.

Bu makale sınavı gövdeye taşıyor. Aynı model bir robot kolunu sürdüğünde durum bir kavşak değil bir konum, eylem bir token değil bir tork, ve yanlış tahminin bedeli bir sonraki örnekte silinmiyor. Soru 110'un kapanışında duruyordu: bir dil modelinin öğrendikleri o dünyada ne kadar işe yarar, ve gerçek bir gövdenin verisi neden bu kadar az?

Önce bir sözcük uyarısı, çünkü bu makalede iki ayrı nesneyi adlandırma riski var. 81\. makalede "donuk gövde" derken kastettiğimiz, üstüne yeni katmanlar bindirilen önceden eğitilmiş ağdı. Burada gövde fiziksel anlamında kullanılıyor: kolu, kamerası ve eklem motorları olan bir makine. Karışmasın diye ağ anlamındaki gövdeye bu makalede "önceden eğitilmiş ağ" diyeceğiz.

**Somutlaşmış yapay zekâ** (embodied AI), kararlarını bir bedenin içinden, gerçek zamanda ve geri alınamayan eylemlerle veren sistemlerin adı. Bedenin getirdiği fark tek bir şey değil, üç ayrı şey: eylemin biçimi değişiyor, verinin kaynağı değişiyor, hatanın bedeli değişiyor. Bu makale üçünü sırayla ölçüyor. Sonucu baştan söyleyelim: internetten gelen ön eğitim bu üç parçadan yalnızca birinin yarısına yarıyor, ve hangisi olduğu ölçülmüş durumda.

## Eylem arayüzü gövdeye takılınca

51\. makalede ajanın kontrol döngüsünü kurarken bir cümle bırakmıştık: modelin gördüğü eylem kümesi, dünyanın gerçek hareket kümesi değil, ona göre çizilmiş bir arayüzdür. Orada örnek bir ev ortamının metin sürümüydü; arayüz dokuz şablondu ve "ısıt" komutu altta düzinelerce fiziksel hareketi tetikliyordu. Model o düzineyi hiç görmüyordu. Şimdi o düzineye bakmak zorundayız, çünkü borç orada değil burada ödenir.

Brohan ve arkadaşlarının Robotics: Science and Systems 2023'te sunduğu çalışma, gerçek bir kolu süren bir dizi modelinin arayüzünü açıkça yazıyor. Eylem, uç işlevcinin — kolun ucundaki tutucu, İngilizcede end-effector — altı serbestlik dereceli konum ve dönüş değişimi, tutucunun açıklığı ve bölümü bitirme komutundan oluşuyor. Sürekli olan boyutların hepsi 256 eşit **kutuya ayrılıyor**; ayrıklaştırma (discretization) denen bu işlem, 27\. makaledeki kuantizasyonun akrabasıdır ama nesnesi başkadır: orada ağırlıkların hassasiyeti azaltılıyordu, burada dünyanın kendisi ızgaraya oturtuluyor. Sonuç sekiz tam sayıdır.

Zitkovich ve arkadaşlarının Conference on Robot Learning 2023'te sunduğu çalışma bu arayüzü bir görüntü-dil modeline takıyor ve son adımı atıyor: sekiz sayı, modelin sözlüğünden ayrılan 256 token'la yazılıyor. Yani eylem, metin gibi yazılıyor; 81\. makalenin görüntü-dil modeli, çıktı tarafına eylemi de ekleyince **görme-dil-eylem modeli** (vision-language-action model) adını alıyor. Aynı çalışma arayüzün ikinci eksenini de veriyor: 55 milyar parametreli sürüm saniyede bir ile üç karar üretebiliyor, 5 milyarlık sürüm saniyede beş civarında. Brohan ve arkadaşlarının 35 milyon parametreli modeli saniyede üç.

Bu iki sayı — 256 kutu ve saniyede üç karar — arayüzün tamamıdır. Ve ikisi de dünyanın değil, tasarımın özelliğidir.

Black ve arkadaşlarının Robotics: Science and Systems 2025'te sunduğu çalışma, arayüzü baştan başka kuruyor. Eylem token olarak yazılmıyor; ayrı bir "eylem uzmanı", sürekli değerleri doğrudan üretiyor ve tek tek adımlar yerine bir **eylem öbeği** (action chunk), yani birkaç adımlık bir hareket parçası bir kerede veriliyor. Sonuç saniyede elli karara kadar çıkıyor ve yazarlar bunu çamaşır katlama gibi görevler için zorunlu sayıyor. Kendi cümleleri ölçünün nerede kesildiğini söylüyor: eylemi token'a ayrıklaştıran mimariler eylem öbeklerini desteklemediği için bu görevlerde belirgin biçimde geride kalıyor.

47\. makaledeki ders burada birebir geçerli ve daha sert. Orada bir çağrının biçimini bir şemayla kilitlemenin ayrıştırmayı kurtardığını ama doğruluğu kurtarmadığını görmüştük: şema konum alanının bir dize olmasını zorlar, o dizenin var olan bir şehir olmasını zorlamaz. Sekiz sayılık bir eylem vektöründe aynı ayrım fiziksel hâle geliyor. Sekiz tam sayının her bileşimi geçerli bir eylemdir; hiçbiri biçimi bozmaz; ve içlerinden bazıları bardağı devirir. Geçerliliğin doğruluğa dair hiçbir şey söylememesi, metinde bir ayrıştırma hatasıydı; gövdede bir kırık cam.

![Üç sütunlu, altı satırlı bir tablo ve altında iki kutu. Üstte başlık: aynı soru, üç arayüz. Sütunlar metin ortamının şablonları, token olarak yazılan eylem ve sürekli eylem öbeği. Birinci satır eylemin biçimi: dokuz komut şablonu, sekiz tam sayı, sürekli değerlerden oluşan öbek. İkinci satır çözünürlük: şablon içi ya da dışı, boyut başına 256 kutu, ayrıklaştırma yok. Üçüncü satır karar sıklığı: adım adım metin turu, saniyede bir ile üç veya beş, saniyede elliye kadar. Dördüncü satır dünyaya ne gidiyor: altta düzinelerce hareketi tetikleyen tek komut, uç işlevcinin konum ve dönüş değişimi artı tutucu, aynı büyüklükler öbek hâlinde. Beşinci satır vurguludur, arayüzün yasakladığı: şablonun dışındaki her hareket, kutu genişliğinden ince düzeltme, yok denecek kadar az. Altıncı satır bedeli: fiziksel ayrıntı hiç görülmüyor, hızlı görevlerde geride kalıyor, eğitim ve çıkarım daha pahalı. Birinci kutunun başlığı iki sayı bütün arayüzü belirliyor; içinde 256 kutunun hareket aralığının 256'da birinden ince düzeltmeyi temsil edilemez kıldığı, saniyede üç kararın iki karar arasında 333 milisaniye bıraktığı ve bu aralıkta olan bitenin görülmediği yazılıdır. İkinci kutuda 47’nin dersi durur: biçim geçerliliği değeri zorlamaz; sekiz tam sayının her bileşimi geçerlidir ve bazıları bardağı devirir. En altta bir kayıt: kutu sayısı ve sıklıklar Brohan, Zitkovich ve Black ve arkadaşlarının bildirdiği değerlerdir, 333 milisaniye kendi hesabımızdır.](assets/uc-eylem-arayuzu.svg "Şekil 1 — Arayüz dünyanın değil, tasarımın özelliği")

Şekil 1'in beşinci satırı bu bölümün asıl cümlesini taşıyor: her arayüz bir şeyi mümkün kılarken başka bir şeyi imkânsız kılıyor, ve imkânsız kıldığı şey modelin hatası olarak görünüyor.

> **Kendini yokla:** Bir görevi saniyede üç karar yerine saniyede elli kararla sürmek, "daha pürüzsüz" olmanın ötesinde neyi değiştirir?

Düzeltmenin en küçük aralığını değiştirir. Saniyede üç kararda iki karar arasında 333 milisaniye vardır — bu bizim hesabımız, 1 saniyeyi 3'e bölmek — ve o aralıkta dünyada olan biten ne görülür ne düzeltilir. Kayan bir tabak o aralıkta düşmeye başlayabilir. İkinci sınır ayrıklaştırmadan gelir: 256 kutu, hareket aralığının 256'da birinden ince bir düzeltmeyi temsil edilemez kılar. Yani arayüz yalnızca modelin ne söyleyebileceğini değil, ne kadar erken ve ne kadar ince söyleyebileceğini de belirliyor.

## İnternetin verdiği ve vermediği

Şimdi asıl soru: bu arayüzün arkasına internetten gelen bir model koymak neyi kazandırıyor?

Zitkovich ve arkadaşlarının ölçümü bu soruya beklenmedik biçimde net bir cevap veriyor, çünkü cevap iki parçaya ayrılıyor ve parçalar birbirine hiç benzemiyor.

Eğitimde görülmüş görevlerde kazanç **yok**. Görüntü-dil modeliyle kurulmuş iki sürüm 91 ve 93 puan alıyor; aynı robot verisiyle sıfırdan eğitilen küçük model 92. Üç sayı birbirinin içinde. İnternetten gelen bütün o metin ve görüntü, robotun zaten öğrendiği işleri yapmasına hiçbir şey katmıyor.

Görülmemiş nesne, arka plan ve ortamlarda tablo değişiyor: küçük model 32, görüntü-dil modeliyle kurulan sürümler 62. İki katı. Ve robot verisinde hiç bulunmayan anlamsal talimatlarda — "elmayı üçün üstüne taşı", "muzu ikiyle birin toplamının yanına koy", "yorgun birine uygun içeceği al" — küçük model ortalama 17, büyük sürüm 60 alıyor.

Aynı çalışmanın bildirdiği başarısızlık listesi tablonun öbür yarısını veriyor ve liste öğretici olduğu için tam okumaya değer: nesneleri belirli bir yerinden, örneğin sapından tutmak; robot verisinde görülmemiş yeni hareketler, örneğin bir bezle silmek; havlu katlamak gibi ince ve hassas hareketler; ve birkaç katmanlı dolaylı akıl yürütme. Yani internet modele **hangi** nesneye gidileceğini öğretiyor, o nesneye **nasıl** dokunulacağını öğretmiyor.

Bunun bir ablasyonla kesin ölçüsü var. O'Neill ve arkadaşlarının International Conference on Robotics and Automation 2024'te sunduğu ortak çalışma, aynı 5 milyar parametreli modeli, aynı robot verisiyle, aynı geçmiş uzunluğuyla iki kez eğitiyor. Görüntü-dil ön eğitiminden başlatılan sürüm anlamsal talimatlarda yüzde 44,4, genelleme sınavında yüzde 52 alıyor. Sıfırdan başlatılan sürüm yüzde 0 ve yüzde 1. Tek fark ön eğitimdir; sonuç neredeyse boş ile yarı yarıya arasındadır.

![İki bölmeli şekil. Üstte üç satırlı üç sütunlu bir tablo; sütunlar sınav, robot verisiyle eğitilen küçük model ve görüntü-dil modeliyle kurulan sürüm. Birinci satır eğitimde görülmüş görevler: 92 ve 91 ile 93. İkinci satır vurguludur, görülmemiş nesne arka plan ve ortam ortalaması: 32 ve 62. Üçüncü satır robot verisinde bulunmayan anlamsal talimatlar: 17 ve 60. Ortada tek satırlık bir ablasyon kutusu: aynı 5 milyar parametreli model, aynı robot verisi, aynı geçmiş uzunluğu; görüntü-dil ön eğitiminden başlatılınca anlamsal talimatlarda yüzde 44,4 ve genellemede yüzde 52, sıfırdan başlatılınca yüzde 0 ve yüzde 1. Altta iki kutu yan yana durur. Sol kutunun başlığı internetin verdiği; içinde hangi nesne, hangi hedef, hangi sembol, hangi dil ve hangi kişi yazılıdır. Sağ kutunun başlığı internetin vermediği; içinde nesneyi sapından tutmak, robot verisinde görülmemiş yeni hareketler, havlu katlamak gibi ince hareketler ve çok katmanlı dolaylı akıl yürütme yazılıdır. En altta bir kayıt: ilk tablo Zitkovich ve arkadaşlarının, ablasyon O'Neill ve arkadaşlarının ölçümüdür; puanlar yüzdedir.](assets/internetin-iki-yarisi.svg "Şekil 2 — Anlam aktarılıyor, hareket aktarılmıyor")

Şekil 2'nin iki alt kutusu yan yana durduğunda, ön eğitimin ne satın aldığı tek cümleye iniyor: eylemin anlamsal yarısı geliyor, motor yarısı gelmiyor. Ve motor yarısının tek kaynağı gerçek gövde verisidir.

## Verinin neden bu kadar az olduğu

Brohan ve arkadaşlarının çalışması kendi veri kümesinin nasıl toplandığını açıkça yazıyor: on üç robotla, on yedi ay boyunca, yaklaşık 130 bin **gösterim**. Burada bir sözcük çakışması var ve adını koymak gerekiyor: 23\. makalede gösterim, isteme konan tek bir çözülmüş örnekti; burada bir insanın robotu uzaktan sürerek baştan sona yaptırdığı bir görevin kaydıdır. İkisi de "işte böyle yapılıyor" demenin bir biçimidir, ama birinin maliyeti birkaç yüz token, ötekinin maliyeti bir insanın gerçek zamanda harcadığı dakikalardır.

Bu üçlüden bir üretim hızı çıkar. Kendi hesabımız: 130.000 ÷ (13 × 17) ≈ **robot başına ayda 588 gösterim**, yani robot başına günde yirmi civarı. Sayıların üçü de çalışmanın kendi bildirdiği değerlerdir; bölme bize aittir.

Alanın havuzunu da biliyoruz. O'Neill ve arkadaşlarının derlediği ortak küme, 34 laboratuvarın 60 ayrı veri kümesini tek biçime çevirip birleştiriyor: 22 farklı gövde, 527 beceri ve bir milyondan fazla gerçek robot yörüngesi. Yayımlandığı tarihte bu, alanın açık robot verisinin büyük kısmını tek çatı altında topluyordu; o günden bu yana başka açık kümeler de eklendi.

Karşılaştırma buradan çıkıyor ve 8\. makalenin sayısıyla yan yana konunca ölçek farkı görünüyor.

| | Ne kadar | Nasıl üretildi |
|---|---|---|
| Bir modelin ön eğitim metni | 15,6 trilyon token | İnsanlar kendi sebepleriyle zaten yazmıştı |
| Alanın ortak açık robot havuzu | 1 milyondan fazla yörünge | 34 laboratuvar, 60 küme, yıllar |
| Tek bir laboratuvarın kendi hattı | 130 bin gösterim | 13 robot × 17 ay |

Aradaki mesafeyi bir hesapla görmek mümkün, ve girdilerinin hepsi yukarıdaki paragraflarda duruyor. Saniyede üç karar veren bir robot bir saatte 3 × 3.600 = 10.800 adım üretir; her adım sekiz sayıysa, saat başına 86.400 sayı. 8\. makaledeki 15,6 trilyon token'ı bu birimle doldurmak için 15,6×10¹² ÷ 86.400 ≈ 1,8×10⁸ robot-saati, yani yaklaşık **20.600 robot-yılı** gerekirdi. Birimler birebir aynı şey değil — bir eylem sayısı bir sözcük parçası değildir ve ikisinin taşıdığı bilgi karşılaştırılamaz — ama büyüklük mertebesi soruyu görünür kılıyor: az önceki tablodaki bir milyon yörünge, bu ölçekte bir yuvarlama hatasıdır.

Asıl fark satırların sağ sütununda. Metin bir **yan üründür**: insanlar zaten yazıyordu, yazdıkları duruyordu, model sonradan geldi ve okudu. Bir yörünge yan ürün değildir. Bir insanın bir robotu, gerçek zamanda, o veri için sürmesi gerekir; bir saatlik veri bir saat sürer ve kısaltılamaz. 9\. makaledeki ölçek yasaları bir bütçeyi model boyu ile veri arasında paylaştırmayı öğretiyordu; burada veri ekseninin fiyatı para değil, takvim.

Black ve arkadaşlarının çalışması bu kıtlığın bugünkü hâlini tek bir oranla gösteriyor. Kendi ön eğitim karışımlarının yalnızca yüzde 9,1'i açık kaynaklı kümelerden geliyor — az önceki bir milyon yörüngelik havuz da içinde. Geri kalanı kendi topladıkları, on bin saatin üzerinde bir gösterim yığını. Yani alanın ortak açık havuzu, tek bir ekibin karışımının onda birinden azını dolduruyor.

> **Kendini yokla:** Görüntü ve ses de "dünyaya ait" verilerdir ve 81–84\. makalelerde bunların bolluğundan yararlanıldığını gördük. Robot verisindeki kıtlık neden orada yok?

Çünkü görüntü ve ses de yan üründür. İnsanlar fotoğraf çekip altyazı yazıyor, video yükleyip konuşuyor; o eşleşmiş çiftler kimse istemeden birikiyor. Eylem böyle birikmiyor: kimse kendi eklem açılarını, tutucusunun kapanma anını ya da uç işlevcisinin yörüngesini kaydedip yayımlamıyor. Modalitenin bolluğu içeriğinden değil, insanların onu zaten üretiyor olmasından geliyor.

## İki ucuz kaynak ve ikisinin de faturası

Kıtlığın iki bilinen çıkış yolu var ve ikisi de bedava değil.

Birincisi benzetim. Bir fizik motorunda veri saatte değil, çekirdek sayısıyla üretilir. Tobin ve arkadaşlarının IROS 2017'de sunduğu yöntem bugünkü standardı kurdu: **alan rastgeleleştirmesi** (domain randomization) — benzetimi gerçeğe benzetmeye çalışmak yerine, onu o kadar çok rastgele biçimde çeşitlendirmek ki gerçek dünya da o çeşitliliğin içinde bir örnek gibi görünsün.

Faturasını Marcin Andrychowicz ve OpenAI'daki arkadaşlarının *International Journal of Robotics Research*'te yayımlanan çalışması ölçüyor. Bir robot elin avucunda bir küpü döndürme görevinde, rastgeleleştirmesiz bir benzetimde aynı performansa ulaşmak yaklaşık **üç yıllık** benzetilmiş deneyim istiyor; tam rastgeleleştirilmiş benzetimde yaklaşık **yüz yıllık**. Yani rastgeleleştirme öğrenmeyi otuz kattan fazla yavaşlatıyor.

Karşılığında ne alınıyor? Gerçek robotta arka arkaya kaç döndürme yapıldığı. Tam rastgeleleştirmeyle eğitilen politikanın ortancası 13; hiç rastgeleleştirmeden eğitilenin ortancası 0; fizik parametreleri sabit tutulanın ve modellenmemiş etkiler çıkarılanınki 2. Fatura otuz kat hesap, aldığı şey sıfır ile on üç arasındaki fark. Benzetim ucuz değil; yalnızca parayı takvimden hesaba taşıyor.

Kaufmann ve arkadaşlarının *Nature*'da yayımladığı yarış dronu çalışması aynı hesabın ikinci hâlini gösteriyor. Politika benzetimde eğitiliyor, ama benzetim gerçek pistte toplanmış veriyle düzeltiliyor: algının ve dinamiğin gerçekle benzetim arasındaki farkı ayrı ayrı ölçülüp benzetime geri yazılıyor, sonra politika bu düzeltilmiş benzetimde son hâline getiriliyor. Sonuç, üç insan şampiyona karşı kazanılan yarışlar ve etkinliklerin en hızlı turu. Yazarların kendi sınır listesi de aynı ölçüde öğretici: dronun kamerası saniyede 30 kare, insan pilotunki 120; sistem çarpışma sonrası toparlanmak üzere hiç eğitilmemiş; ve algı, pistin görünüşünün eğitimdeki gibi kalacağını varsayıyor, aydınlatma değişirse bozuluyor. Benzetimde eğitilmiş bir politika kendi dağılımının içinde şampiyon, dışında kırılgan.

İkinci ucuz kaynak başka gövdelerin verisi. O'Neill ve arkadaşlarının ortak kümesinin amacı tam buydu ve sonucu iki yönlü. Verisi az olan alanlarda kazanç açık: ortak veriyle eğitilen politika, laboratuvarların kendi yöntemlerinin ortalama başarısını yüzde elli oranında aşıyor. Verisi bol olan alanda ise aynı model **geriliyor**: tek bir robotun kendi verisiyle eğitilen sürüm 92 alırken, bütün gövdelerin karışımıyla eğitilen aynı mimari 73'e düşüyor. Yazarların tanısı kapasite: model karışımı taşıyamıyor ve yetersiz kalıyor. 55 milyar parametreli sürüme geçildiğinde puan 91'e dönüyor.

![Üç sütunlu, beş satırlı bir tablo. Üstte başlık: iki ucuz kaynak, iki ayrı fatura. Sütunlar soru, benzetim ve başka gövdelerin verisi. Birinci satır neyi ucuzlatıyor: veriyi takvimden çıkarıp hesaba bağlıyor, kendi robotunu çalıştırmadan veri veriyor. İkinci satır neyi pahalılaştırıyor: aynı performans için üç yıl yerine yüz yıllık benzetilmiş deneyim, karışımı taşıyacak kapasite. Üçüncü satır vurguludur, ödendiğinde ne oluyor: gerçek robotta ortanca 13 arka arkaya döndürme, verisi az alanlarda ortalama yüzde elli daha yüksek başarı. Dördüncü satır ödenmediğinde ne oluyor: rastgeleleştirme olmadan ortanca 0, fizik sabitken 2; küçük modelde verisi bol alanda 92'den 73'e düşüş. Beşinci satır kalan sınır: dağılımın dışında kırılgan, aydınlatma değişince algı bozuluyor ve çarpışma sonrası toparlanma öğretilmemiş; kapasite büyütülünce 91'e dönüyor. En altta bir kayıt: benzetim sütunu OpenAI ekibinin ve Kaufmann ve arkadaşlarının, gövde sütunu O'Neill ve arkadaşlarının ölçümleridir.](assets/iki-ucuz-kaynak.svg "Şekil 3 — Ucuz olan, bedava olan değildir")

Şekil 3'ün son satırı ikisinin ortak dersini taşıyor: her iki kaynak da gerçek veriyi değil, gerçek verinin bir vekilini veriyor; ve vekilin nerede bozulduğu, 13\. makaledeki aşırı optimizasyonla aynı yerdedir — yeterince zorlandığında.

## Geri alınamayan hata

Üçüncü fark en az ölçülen fark. 40\. makalede çok adımlı görevlerde başarının neden çarpımsal düştüğünü kurmuştuk: adım başına olasılıklar çarpılıyor ve kendi kendine toparlanma olasılığı düşük bir tavan koyuyor; asıl mesele, düzeltmenin aynı modelin içinden gelememesiydi. Metinde düzeltme dışarıdan gelebilir — bir araç çıktısı, bir hata mesajı, bir kullanıcı. Gövdede bazı hatalar için dışarısı yoktur: kırılan bardak geri kurulmaz ve sahneyi bir insan yeniden dizer.

Bunun ikinci bir sonucu var ve 101\. makalenin disiplinini doğrudan ilgilendiriyor. Metin ölçütlerinde bir modeli bin kez sınamak bir hesap sorusudur; gövdede her deneme gerçek zamanda geçer ve sahnenin elle sıfırlanmasını gerektirir. Zitkovich ve arkadaşları çalışmalarının değerlendirmesinde yaklaşık altı bin deneme yaptıklarını yazıyor. Bu, robot öğrenmesinde alışılmadık ölçüde büyük bir sayıdır ve yine de 101'in istediği türden bir anlamlılık hesabına dar gelir: altı bin deneme düzinelerce koşula bölündüğünde koşul başına düşen örneklem küçülür. Ölçümün pahalı olması, ölçümün disiplinini gevşetmenin gerekçesi değildir; ama neden bu literatürde güven aralıklarının seyrek göründüğünü açıklar.

110\. makalenin sapma tablosu burada son bir kez okunmalı. Orada yüz hamlede bir sapmayla geçerli rota oranı 0,99'dan 0,69'a iniyordu ve o sapma yapay olarak ekleniyordu. Bir gövdede sapma eklenmez; tutucu kayar, nesne yuvarlanır, aydınlatma değişir. Yani gövde, dünya modelinin tutarlılığını sınayan doğal bir düzenektir ve sınavı sürekli uygular.

## Şu an dürüstçe söylenebilecekler

**Arayüz dünyanın değil, tasarımın özelliğidir ve iki sayıya iner.** Kaç kutu ve saniyede kaç karar. 256 kutu, hareket aralığının 256'da birinden ince bir düzeltmeyi temsil edilemez kılar; saniyede üç karar, iki karar arasında 333 milisaniye bırakır. Modelin "beceremediği" şeylerin bir kısmı, arayüzün baştan yasakladığı şeylerdir.

**İnternetten gelen ön eğitim, eylemin anlamsal yarısını taşıyor, motor yarısını taşımıyor.** Görülmüş görevlerde 92'ye karşı 91 — fark yok. Görülmemiş nesnelerde 32'ye karşı 62, anlamsal talimatlarda 17'ye karşı 60. Buna karşılık sapından tutmak, yeni bir hareket yapmak ve havlu katlamak listede başarısızlık olarak duruyor.

**Ön eğitimin katkısı bir ablasyonla kesindir.** Aynı model, aynı robot verisi, aynı geçmiş: ön eğitimliyken yüzde 44,4 ve 52, sıfırdan başlatıldığında yüzde 0 ve 1.

**Gövde verisinin kıtlığı bir ilgi eksikliği değil, bir üretim biçimi sorunudur.** Metin bir yan üründür ve zaten yazılmıştır; yörünge yan ürün değildir ve bir saatlik veri bir saat sürer. Robot başına ayda 588 gösterim, otuz dört laboratuvarın toplamı bir milyon yörünge, ve tek bir ekibin karışımında açık verinin payı yüzde 9,1.

**Benzetim ve başka gövdeler ucuzdur, bedava değildir.** Rastgeleleştirme aynı performansı üç yıl yerine yüz yıllık benzetilmiş deneyimle satın alıyor; ödenmezse gerçek robotta ortanca sıfır. Gövde karışımı verisi az olanı yükseltiyor ama verisi bol olanı 92'den 73'e düşürüyor; kapasite büyütülünce 91'e dönüyor.

**Ve gövde, dünya modeli sorusunun doğal sınav düzeneğidir.** Sapma eklenmesi gerekmez; dünya kendiliğinden sapar. 110'da ölçülen şey — tutarsız bir modelin faturasının bozulma altında kesilmesi — burada her denemede kesiliyor.

Çerçevenin sınırını da yazmak gerekiyor. Bütün bu ölçümler masa üstü manipülasyondan geliyor: bir kol, bir tutucu, birkaç nesne. Yürüyen bir gövde, iki elle çalışan bir sistem ya da insanların arasında hareket eden bir makine, burada sayılmayan sorunlar getirir ve o sorunların ölçüsü henüz bu netlikte değil. Ayrıca üç ana kaynağın ikisi aynı araştırma soyundan geliyor; bağımsız gruplarca tekrarlanmış sonuç sayısı, 102\. makalenin istediği eşiğin altında.

### Sırada ne var

Bu makale modeli bir gövdeye bağladı ve dünyanın hareket ettiğini gördük: nesne kayıyor, ışık değişiyor, sahne yeniden diziliyor. Ama dünya yalnızca gövdenin önünde hareket etmiyor. Bir ürün içinde çalışan modelin bilgisi eskiyor, kullanıcısı değişiyor, doğru cevap dün doğruyken bugün yanlış oluyor. Bir modeli güncel tutmanın kaç yolu var, ve her yol modelde neyi bozuyor?

## Kaynakça

- Brohan, A., Brown, N., Carbajal, J., Chebotar, Y., Dabis, J., Finn, C. ve ark. (2023). *RT-1: Robotics Transformer for Real-World Control at Scale*. Robotics: Science and Systems XIX. [Bağlantı](https://www.roboticsproceedings.org/rss19/p025.html)
- Zitkovich, B., Yu, T., Xu, S., Xu, P., Xiao, T., Xia, F. ve ark. (2023). *RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control*. Proceedings of the 7th Conference on Robot Learning, PMLR 229, s. 2165–2183. [Bağlantı](https://proceedings.mlr.press/v229/zitkovich23a.html)
- O'Neill, A., Rehman, A., Maddukuri, A., Gupta, A., Padalkar, A., Lee, A. ve ark. (2024). *Open X-Embodiment: Robotic Learning Datasets and RT-X Models*. 2024 IEEE International Conference on Robotics and Automation (ICRA), s. 6892–6903. [Bağlantı](https://doi.org/10.1109/ICRA57147.2024.10611477)
- Black, K., Brown, N., Driess, D., Esmail, A., Equi, M. R., Finn, C. ve ark. (2025). *π₀: A Vision-Language-Action Flow Model for General Robot Control*. Robotics: Science and Systems XXI. [Bağlantı](https://www.roboticsproceedings.org/rss21/p010.html)
- Tobin, J., Fong, R., Ray, A., Schneider, J., Zaremba, W. & Abbeel, P. (2017). *Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World*. 2017 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), s. 23–30. [Bağlantı](https://doi.org/10.1109/IROS.2017.8202133)
- OpenAI: Andrychowicz, M., Baker, B., Chociej, M., Józefowicz, R., McGrew, B. ve ark. (2020). *Learning Dexterous In-Hand Manipulation*. The International Journal of Robotics Research, 39(1), s. 3–20. [Bağlantı](https://doi.org/10.1177/0278364919887447)
- Kaufmann, E., Bauersfeld, L., Loquercio, A., Müller, M., Koltun, V. & Scaramuzza, D. (2023). *Champion-level drone racing using deep reinforcement learning*. Nature, 620(7976), s. 982–987. [Bağlantı](https://doi.org/10.1038/s41586-023-06419-4)
