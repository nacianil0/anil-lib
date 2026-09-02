---
article_id: article_e1f28bc3-2db7-4299-bbc9-fef3a9ee2e9a
title: "Bellek: Sohbet İçinde ve Sohbetler Arasında"
slug: bellek-sohbet-icinde-ve-sohbetler-arasinda
category: reasoning-and-memory
level: intermediate
reading_order: 39
summary: "Durumsuz bir modelin nasıl hatırlıyormuş gibi göründüğünü kurar: pencere dolduğunda neyin atıldığını, aynı bütçeye ham geçmiş yerine özet koymanın ölçülen kazancını, sohbetler arası kalıcı belleğin bir yazma-getirme-okuma hattı olduğunu, geri çağırma puanının tazelik ve önemle nasıl kurulduğunu ve bu hattın en çok nerede — güncellenen bilgide ve zaman sorularında — kırıldığını gösterir."
tags:
  - bellek
  - ozetleme
  - kalici-bellek
  - geri-cagirma-puani
  - bilgi-guncellemesi
content_hash: sha256:409878aa792cb272ecd1044d4e3bbf8f8bddfdd8cb07b53fee21ba6e6f769320
classification_version: 1
classification_batch: 9
---
## Çağrı bitince geriye ne kalıyor

Son dört makale tek bir cevabı iyileştirmenin yollarını aradı: doğrulayıcıyla seçtik, oyladık, ağaç kurduk, ödülü adımlara dağıttık. Hepsinin sessiz varsayımı aynıydı — soru soruldu, cevap üretildi, iş bitti.

21\. makalede bu varsayımın altındaki gerçeği görmüştük. Model **durumsuzdur**: her çağrıda önüne konan diziden başka hiçbir şey görmez, çağrı bittiğinde geriye hiçbir şey kalmaz. Buna rağmen bir sohbet asistanı size dün ne konuştuğunuzu hatırlar gibi davranır. Arada bir mekanizma var ve bu makale onu kuruyor.

Baştan bir terim ayrımı gerekiyor, çünkü bu seride "bellek" sözcüğü ikinci kez karşımıza çıkıyor. 26\. ve 27\. makalelerde bellek **donanımdı**: gigabaytlarla ölçülen, bant genişliğiyle sınırlanan fiziksel yer. Bu makalede **bellek** (memory) bir üründür: bir sohbette biriken bilginin, sonraki çağrılarda modelin önüne yeniden konabilecek biçimde saklanması. İkisi aynı sözcüğü paylaşır, aynı şeyi anlatmaz. Bir yerde bant genişliği tartışılır, öbüründe neyin hatırlanmaya değer olduğu.

Soru üç katmanda soruluyor: bir sohbetin içinde pencere dolduğunda ne atılır, sohbetler arasında ne saklanır, ve saklanan şey soru geldiğinde nasıl bulunur?

## Pencere dolduğunda ilk çözüm: kes

Tek bir sohbetin içinde hatırlama işini pencerenin kendisi yapar. Her turda bütün geçmiş yeniden gönderilir, model her şeyi önünde görür, kimse bir şey saklamak zorunda kalmaz. Bu düzen pencere dolana kadar çalışır.

Dolduğunda en basit çözüm kesmektir: en eski turları at, sığanı gönder. Jing Xu, Arthur Szlam ve Jason Weston'ın ACL 2022'de sunduğu çalışma bu kesmenin ne kadara mal olduğunu ölçtü. Çalışma bunun için insan-insan sohbetlerinden oluşan çok oturumlu bir küme topladı: aynı iki kişi ayrı seanslarda konuşuyor ve sonraki seanslarda öncekilerde öğrendiklerine atıfta bulunuyor.

Ölçüm doğrudan. Dördüncü oturumda, önceki oturumun konuşma geçmişi de isteme konduğunda, 128 token'lık bir bütçeyle içeriğin **yüzde 100'ü** kesiliyor; 1.024 token'lık bütçeyle bile yüzde 80'i. Yani geçmişi ham hâliyle taşımak, pencereyi hızla tüketen bir tercihtir. Kesilen şey de rastgele değildir: kesilen hep en eskidir, oysa bir kişinin adı, işi ya da tercihi tam olarak orada geçer.

## Aynı bütçe, iki farklı içerik

Aynı çalışmanın önerdiği alternatif basit: geçmişi ham hâliyle taşıma, **özetini** taşı. Her oturumun sonunda o oturumda öğrenilenler birkaç satırlık bir nota indirgenir ve sonraki oturumda isteme o not konur.

Sonuç, aynı bütçede iki içeriğin karşılaştırılması olarak okunur. Aşağıdaki sayılar doğrulama perplexity'si — 5\. makaleden hatırlayacağın gibi küçük olan iyidir — ve son sütun dördüncü oturumda kesilen token oranıdır.

| 1.024 token'lık bütçede bağlam | oturum 4 perplexity | kesilen |
|---|---|---|
| önceki oturum yok | 9,37 | %0 |
| önceki oturumun ham geçmişi | 9,16 | %80 |
| önceki oturumun özeti | 9,04 | %0 |

![Aynı genişlikte üç yatay bütçe çubuğu üst üste dizilmiştir; her çubuk bin yirmi dört token'lık aynı pencereyi temsil eder. En üstteki çubukta yalnızca güncel tur vardır ve çubuğun sağında boş yer kalmıştır; yanında perplexity 9,37 yazar. Ortadaki çubuk önceki oturumun ham geçmişiyle doldurulmuştur, çubuğun sağ ucundan taşan kısım kesik çizgiyle dışarıda gösterilir ve yüzde 80'inin kesildiği belirtilir; yanında 9,16 yazar. En alttaki çubukta önceki oturumun özeti küçük bir blok olarak durur, geri kalan yer güncel tura ayrılmıştır, hiçbir şey taşmaz; yanında 9,04 yazar. Şeklin altında üç çubuğun da aynı bütçeyi harcadığı, farkın yalnızca o bütçeye ne konduğu olduğu yazılıdır.](assets/ayni-butce-uc-icerik.svg "Şekil 1 — Aynı pencere, üç farklı doldurma biçimi")

Şekil 1'in öğrettiği şey tabloda gizli. Özet, ham geçmişten hem daha iyi bir sayı veriyor hem de hiçbir şeyi kesmiyor. Ham geçmiş bilgiyi daha eksiksiz taşır ama pencereye sığmaz; sığdırmak için kesilir ve kesilen kısım geri gelmez. Özet bilgi kaybeder ama kaybettiğini **seçerek** kaybeder.

Aynı çalışmanın ikinci ölçümü farkın nerede ortaya çıktığını gösteriyor. Bir oturumun **açılış** cümlelerinde — yani "geçen sefer bahsettiğin şey ne oldu" türünden ifadelerin geçtiği yerde — hiç geçmiş verilmediğinde perplexity 10,69'a çıkıyor; ham geçmişle 8,27'ye, özetle 7,94'e iniyor. Bellek en çok konuşmanın yeniden başladığı anda işe yarıyor.

Bir ayrıntı da kimin özetlendiğiyle ilgili. Yalnızca karşı tarafın söylediklerini özetlemek açılışlarda 8,49, yalnızca kendi söylediklerini özetlemek 8,52 veriyor; ikisi birlikte 7,94. Yani bellek tek taraflı olduğunda kazancın önemli bir kısmı gidiyor — sohbet iki kişilik bir şeydir ve ikisinin de söyledikleri hatırlanmaya değer.

Özetin ikinci kazancı 26\. ve 28\. makalelerin muhasebesinde. Bir özet, sistem istemi gibi sabit bir **önektir**: her turun başında aynı biçimde durur, dolayısıyla anahtar-değer önbelleğinde bir kez hesaplanıp tekrar tekrar kullanılabilir. Ham geçmiş de öyledir, ama ham geçmiş her turda uzar; kaç token'lık bir önek taşıdığın, o oturumun her turunda ödediğin sabit maliyettir. 24\. makalede sistem isteminin uzunluğunun her çağrıya bindiğini söylemiştik — bellek notu da aynı faturaya yazılır ve bu, "her şeyi hatırla" tasarımının neden pratikte tercih edilmediğinin ekonomik yüzüdür.

> **Kendini yokla:** Özet, ham geçmişten daha az bilgi taşıdığı hâlde neden daha iyi bir sonuç veriyor?

Çünkü karşılaştırma "özet ile tam geçmiş" arasında değil, "özet ile **kesilmiş** geçmiş" arasında yapılıyor. Bütçe sabit olduğunda ham geçmişin yüzde 80'i zaten atılıyor ve atılan kısım seçilmiyor, sadece en eski olduğu için gidiyor. Özet ise aynı bütçeye neyin gireceğine karar verilmiş hâlidir. Kayıp iki durumda da var; farklı olan, kaybın kör mü yoksa seçili mi olduğu.

## Sohbetler arasında: bellek bir depoya dönüşüyor

Şimdiye kadarki her şey tek bir sohbetin içindeydi. Sohbet kapandığında pencere de kapanır; 26\. makaledeki anahtar-değer önbelleği zaten tek bir çalışma boyunca yaşayan bir hızlandırma yapısıdır, bilgi saklamak için değil aynı hesabı tekrarlamamak için vardır. Sohbetler arasında bir şey kalacaksa, pencerenin de önbelleğin de dışında bir yere yazılması gerekir.

Di Wu ve arkadaşlarının ICLR 2025'te sunduğu çalışma bu düzeni sade bir çerçeveye oturtuyor. **Kalıcı bellek** (long-term memory), anahtar-değer çiftlerinden oluşan bir depodur ve üç aşamada çalışır: **yazma** (indexing) — biten her oturum bir ya da birkaç kayda dönüştürülür; **getirme** (retrieval) — yeni soru için bir sorgu kurulup en ilgili kayıtlar toplanır; **okuma** (reading) — toplanan kayıtlar isteme konur ve model cevabı üretir.

Bu çerçevenin en önemli sonucu, ortadaki aşamanın adında saklı. Getirme, 29\. makalede kurduğumuz işin ta kendisidir. Yani sohbetler arası bellek, yeni bir mekanizma değil; bir getirme problemidir ve o makalenin bütün sonuçları — anlamsal aramanın kör noktaları, bulma oranının önemi, kaçırılan sonucun sessizliği — burada da geçerlidir.

![Üç katmanı yan yana karşılaştıran bir şema. Soldaki katman bağlam penceresidir: içinde güncel turun token'ları vardır, altında ömrünün tek çağrı olduğu ve maliyetinin token başına ödendiği yazar. Ortadaki katman anahtar-değer önbelleğidir: içinde önceki token'ların anahtar ve değer vektörleri vardır, altında ömrünün tek çalışma olduğu ve amacının aynı hesabı tekrarlamamak olduğu yazar. Sağdaki katman dış bellek deposudur: içinde geçmiş oturumlardan çıkarılmış kayıtlar listelenir, altında ömrünün sınırsız olduğu ve içeriğine ancak bir getirme adımıyla erişilebildiği yazar. Üç katmanın üstünde ortak bir başlık, altında ise yalnızca en sağdaki katmanın sohbet bittikten sonra hayatta kaldığı belirtilir.](assets/bellegin-uc-katmani.svg "Şekil 2 — Bilginin yazıldığı üç ayrı yer")

Şekil 2'deki ayrım pratikte sık karıştırılır. Bir sohbet asistanının "hatırlaması", üç katmanın hangisinde olduğuna göre tamamen farklı şeyler demektir. Pencerede duran bilgi bedavaya erişilir ama çağrı bitince gider. Önbellekte duran bilgi hesabı azaltır ama bilgi taşımaz. Yalnızca dış depodaki bilgi kalıcıdır ve onun bedeli, her kullanımda **bulunmak zorunda olmasıdır**.

## Bulmak, okumaktan zor

Aynı çalışma bu bedeli ölçüyor ve bu makalenin en öğretici sayısını veriyor. Değerlendirme kümesi 500 soruluk; her soru, uzun bir sohbet geçmişinin içine gizlenmiş bir bilgiyi gerektiriyor ve beş yeteneği ayrı ayrı sınıyor: bilgiyi çıkarma, birden çok oturum üzerinde akıl yürütme, zaman üzerine akıl yürütme, güncellenen bilgiyi izleme ve cevabı bilmediğinde çekimser kalma.

Ölçüm iki koşulda yapılıyor. Birincisinde modele **yalnızca** cevabın geçtiği oturumlar veriliyor — buna kusursuz getirme koşulu diyelim. İkincisinde soru başına yaklaşık 115 bin token'lık tam geçmiş veriliyor ve modelin ilgili yeri kendisinin bulması bekleniyor.

| Model | kusursuz getirme | 115 bin token'lık geçmiş | düşüş |
|---|---|---|---|
| GPT-4o | 0,870 | 0,606 | %30,3 |
| Llama 3.1 Instruct 70B | 0,744 | 0,334 | %55,1 |
| Llama 3.1 Instruct 8B | 0,710 | 0,454 | %36,1 |
| Phi-3 128k Instruct 14B | 0,702 | 0,380 | %45,9 |
| Phi-3.5 Mini Instruct 4B | 0,660 | 0,342 | %48,1 |

![İki sütun grubundan oluşan bir çubuk grafik; her model için yan yana iki çubuk vardır. Sol çubuk kusursuz getirme koşulundaki doğruluğu, sağ çubuk yüz on beş bin token'lık tam geçmiş koşulundaki doğruluğu gösterir ve her modelde sağ çubuk belirgin biçimde kısadır. Beş model soldan sağa şu sırayla dizilidir: GPT-4o çifti 0,870 ve 0,606; Llama 3.1 70B çifti 0,744 ve 0,334; Llama 3.1 8B çifti 0,710 ve 0,454; Phi-3 14B çifti 0,702 ve 0,380; Phi-3.5 Mini çifti 0,660 ve 0,342. Her çiftin üstünde düşüş oranı yüzde olarak yazılıdır. Şeklin altında iki koşulda da aynı modelin aynı soruları cevapladığı, değişen tek şeyin ilgili bilgiyi bulma işinin kime bırakıldığı belirtilir.](assets/kusursuz-getirme-ve-tam-gecmis.svg "Şekil 3 — Aynı soru, aynı model: fark yalnızca bulma işinde")

Şekil 3'ün söylediği şey şu: bu modeller soruları **cevaplayabiliyor**. İlgili oturum önlerine konduğunda GPT-4o yüzde 87 doğrulukla çalışıyor. Aynı bilgi 115 bin token'ın içine gömüldüğünde doğruluk yüzde 60,6'ya düşüyor. Kaybedilen şey okuma yeteneği değil, bulma yeteneği. 21\. ve 25\. makalelerde uzun bağlamın ortasındaki bilginin kaybolduğunu ölçmüştük; burada aynı olgu bir bellek sorunu kılığında geri dönüyor.

Ticari sistemlerde tablo daha da sert. Aynı geçmişi doğrudan okuyan bir düzen yüzde 91,8 doğruluk verirken, bellek bileşeni olan iki ticari asistan aynı işte yüzde 57,7 ve yüzde 33,0'te kalıyor — yani belleği olan sistem, belleği olmayan ama her şeyi okuyan sistemin gerisinde. Bellek tasarımı bedavaya gelmiyor; kötü kurulmuş bir bellek, hiç bellek olmamasından kötü olabiliyor.

## Neyle aranacak, ne saklanacak

Düşüşün nedeni bulunduğuna göre, aynı çalışmanın önerdiği düzeltmeler de aynı yeri hedefliyor ve hepsi tek bir ayrıma dayanıyor: bir kaydın **anahtarı** ile **değeri** aynı şey olmak zorunda değildir. Değer, isteme konacak metindir; anahtar ise o kaydın bulunmasını sağlayan şey.

Bu ayrımın neden gerekli olduğunu 29\. makaleden biliyoruz. İkili kodlayıcıda belge, **sorgunun ne olduğu bilinmeden** kodlanır; o tek nokta, belgeye sorulabilecek bütün soruları aynı anda temsil etmek zorundadır. Bir sohbet oturumunun ham metni bu iş için kötü bir anahtardır: içinde onlarca konu geçer, hiçbiri öne çıkmaz. Çözüm, kaydı değer olarak olduğu gibi saklayıp anahtarını **zenginleştirmektir** — oturumdan çıkarılmış kullanıcı olguları anahtara eklendiğinde bulma oranı yüzde 9,4, nihai doğruluk yüzde 5,4 artıyor.

Saklama biriminin ne kadar büyük olacağı ayrı bir karar. Bütün bir oturumu tek kayıt yapmak yerine tek bir **turu** kayıt yapmak daha iyi çalışıyor. Daha ileri gidip her kaydı tek tek olgulara indirgemek ise genel başarıyı düşürüyor — bilgi kaybı yüzünden — ama birden çok oturumu birleştirmeyi gerektiren sorularda doğruluğu artırıyor. Yani sıkıştırma tek yönlü bir kazanç değil: parçalar küçüldükçe birleştirme kolaylaşır, bağlam ise zayıflar.

Zaman ise ayrıca ele alınmak zorunda. Zamanı hiç modellemeyen bir düzen, "geçen aydan beri ne değişti" türü sorularda kötü çalışıyor; kayıtlara zaman damgası bağlayıp sorguyu o aralıkla daraltmak bulma oranını yüzde 6,8 ile 11,3 arasında artırıyor. Ve son bir uyarı: getirme kusursuz olsa bile iş bitmiyor. Getirilen kayıtları yapılandırılmış bir biçimde vermek ve modelden önce onlar üzerine not almasını istemek, doğruluğu üç ayrı modelde 10 puana varan oranda daha yükseltiyor.

## Neyi geri çağıralım

Depoda binlerce kayıt varken hangisinin isteme gireceğine bir kural karar vermek zorunda. En doğrudan kural ilgiye bakmaktır: sorguya en yakın kaydı getir. Ama bir sohbet belleğinde ilgi tek başına yetmez, çünkü kayıtların bir de zamanı ve önemi vardır.

Joon Sung Park ve arkadaşlarının UIST 2023'te sunduğu çalışma bu üçlüyü açıkça birleştiren bir puanlama önerdi. Her kaydın üç ayrı puanı hesaplanır, üçü de sıfır ile bir arasına ölçeklenir ve toplanır:

puan = tazelik + önem + ilgi

Üç terimin her biri farklı bir şey ölçer. **Tazelik**, kaydın en son ne zaman kullanıldığına bakan üstel bir sönümdür; çalışmanın kullandığı sönüm çarpanı geçen saat başına 0,995'tir. **Önem**, kaydın oluşturulduğu anda modele "bu ne kadar kayda değer" diye sorularak 1–10 arasında bir sayıya çevrilir; çalışmanın örneklerinde "odayı toplamak" 2, "hoşlandığın kişiye çıkma teklif etmek" 8 alıyor. **İlgi**, kaydın ve sorgunun embedding'leri arasındaki kosinüs benzerliğidir — 29\. makaledeki nokta çarpımın ta kendisi.

Sayıyla görelim. Elimizde iki kayıt olsun. Birincisi üç gün önce yazılmış, önemi düşük, sorguyla ilgisi yüksek bir not; ikincisi dün yazılmış, önemi yüksek, sorguyla ilgisi orta bir not. Sönüm çarpanı 0,995 ile üç gün, yani 72 saat sonra tazelik 0,995⁷² ≈ 0,70; bir gün, yani 24 saat sonra 0,995²⁴ ≈ 0,89. Ölçeklenmiş puanları sırasıyla (0,70 + 0,20 + 0,90) = 1,80 ve (0,89 + 0,80 + 0,55) = 2,24 diyelim. İkinci kayıt öne geçiyor — ilgisi daha düşük olduğu hâlde. Üçlü puanın bütün marifeti bu: yalnızca ilgiye bakan bir kural, dün söylenmiş önemli bir şeyi bugünkü soruyla kelime örtüşmesi az diye kaçırabilir.

Aynı çalışma ham kayıtların yetmediğini de gösteriyor. Yalnızca gözlemleri saklayan bir düzen "en çok kiminle vakit geçirdin" sorusuna, en sık karşılaştığı kişiyi söyleyerek cevap veriyor — oysa o karşılaşmaların hiçbiri derin değil. Çözüm olarak önerilen katman **yansıma**: model belirli aralıklarla kendi kayıtlarını okuyup daha üst düzey çıkarımlar yazıyor ve o çıkarımlar da depoya giriyor. Bileşenlerin katkısı ayrı ayrı ölçülmüş: tam mimari 29,89 puan alırken yansıma çıkarıldığında 26,88'e, yansıma ve planlama birlikte çıkarıldığında 25,64'e, bellek de çıkarıldığında 21,21'e iniyor.

## Bellek eskiyince

Şimdi yöntemin kırıldığı yere gelelim, çünkü kalıcı belleğin asıl zor kısmı yazmak değil, yazılanı güncel tutmak.

Bir kullanıcı üç ay önce "İstanbul'da oturuyorum" demişse ve dün "Ankara'ya taşındım" demişse, depoda artık iki kayıt vardır ve ikisi de doğrudur — biri geçmiş için. Getirme, ikisini de aynı sorguya yakın bulur. Yukarıdaki değerlendirmenin beş yeteneğinden biri tam olarak bunu sınıyor ve bu, sistemlerin en zorlandığı yerlerden biri.

Adyasha Maharana ve arkadaşlarının ACL 2024'te sunduğu çalışma tabloyu genişletiyor. Ortalama 300 tur ve 9 bin token uzunluğunda, otuz beş oturuma kadar uzanan sohbetler üzerinde ölçüm yapıyorlar. Uzun bağlamlı modeller ve getirme tabanlı düzenler soru cevaplamayı yüzde 22 ile 66 arasında iyileştiriyor, ama insan düzeyinin **yüzde 56 gerisinde** kalıyor; zaman üzerine akıl yürütmede fark yüzde 73'e çıkıyor. Uzun bağlamlı modeller ayrıca tuzak sorularda — yani cevabı sohbette hiç geçmemiş sorularda — taban modele göre yüzde 83 daha kötü sonuç veriyor ve konuşmaları yanlış kişiye atfetmeye eğilimliler.

Bu son bulgu, çekimserliğin neden ayrı bir yetenek olarak ölçüldüğünü açıklıyor. Bir bellek sistemi her soruya bir kayıt getirir; getirdiği kayıt ilgisiz olduğunda model "bunu bilmiyorum" demek yerine getirileni kullanmaya çalışır. 17\. makaledeki ayrımla söylersek: getirme, dışsal uydurmayı içsel uydurmaya çevirir — ama içsel uydurma da uydurmadır ve burada kaynağın kendisi eksik ya da eskidir.

> **Kendini yokla:** Bellek deposu büyüdükçe getirme neden kolaylaşmaz, zorlaşır?

Çünkü büyüyen şey yalnızca doğru kaydın bulunma ihtimali değil, ona benzeyen yanlış kayıtların sayısı. Aynı kullanıcı hakkında yüzlerce not biriktiğinde, çoğu birbirine anlamca yakın olur: eski adresle yeni adres, eski tercihle yeni tercih, bir kez denenmiş bir fikirle vazgeçilmiş bir fikir. 29\. makaledeki tek vektörün sınırı burada da geçerli — ayrıştırılması gereken ilişki sayısı arttıkça, sabit boyutlu bir temsilin taşıyabileceği ayrım tükenir. Depo büyüdükçe zorlaşan şey bulmak değil, **doğru olanı** bulmaktır.

## Belleğin disiplini

**Model hatırlamaz; sistem hatırlatır.** Hatırlıyormuş gibi görünen her davranışın altında, bir yere yazma ve oradan geri getirme adımı vardır.

**Pencere, önbellek ve dış depo aynı şey değildir.** Biri tek çağrı, biri tek çalışma, biri sınırsız yaşar; yalnızca sonuncusu bilgi saklar.

**Özetlemek bilgi kaybetmektir — ama seçerek.** Sabit bütçede alternatif, bilgiyi kaybetmemek değil, en eskiyi körlemesine atmaktır.

**Sohbetler arası bellek bir getirme problemidir.** Modeller ilgili oturum önlerine konduğunda soruyu cevaplıyor; kaybettikleri şey okuma değil bulma.

**Kötü bir bellek, belleksizlikten kötü olabilir.** Ölçümde bellek bileşenli ticari sistemler, her şeyi doğrudan okuyan düzenin gerisinde kaldı.

**Bir kaydın anahtarı ile değeri aynı şey olmak zorunda değildir.** Neyle arandığı ile ne saklandığı ayrı tasarım kararlarıdır; anahtarı zenginleştirmek en ucuz kazançlardan biridir.

**Geri çağırma yalnızca ilgiye bakamaz.** Tazelik ve önem ayrı terimlerdir; ilgiye indirgenmiş bir puan, dün söylenmiş önemli bir şeyi kaçırır.

**En zor iş yazmak değil, güncellemek.** Değişen bir olgu depoda iki kayıt bırakır ve ikisi de sorguya yakındır; zaman üzerine akıl yürütme, ölçülen en büyük açığın olduğu yerdir.

**Bellek sistemi de çekimser kalabilmelidir.** Getirme her soruya bir şey döndürür; döndürdüğünün ilgisiz olabileceğini bilmek belleğin parçasıdır.

### Sırada ne var

Bu makale belleği tek bir sorunun etrafında kurdu: geçmiş bilgi, sonraki çağrıda nasıl hazır olur? Cevap bir hattı işaret etti — yaz, getir, oku.

Şimdi aynı sorunun zaman eksenine yayılmış hâline geçiyoruz. Bir görev tek bir soru-cevaptan ibaret olmadığında, onlarca adım sürdüğünde ve her adım bir öncekinin çıktısına dayandığında ne oluyor? 33\. makalede kapsamanın deneme sayısıyla nasıl arttığını görmüştük; bir sonraki makale ters yöne bakıyor: adım sayısı arttıkça başarı olasılığına ne oluyor, ve neden bu düşüş yalnızca "model yeterince iyi değil" ile açıklanamıyor?

## Kaynakça

- Xu, J., Szlam, A. & Weston, J. (2022). *Beyond Goldfish Memory: Long-Term Open-Domain Conversation*. ACL 2022, s. 5180–5197. [Bağlantı](https://aclanthology.org/2022.acl-long.356/)
- Wu, D., Wang, H., Yu, W., Zhang, Y., Chang, K.-W. & Yu, D. (2025). *LongMemEval: Benchmarking Chat Assistants on Long-Term Interactive Memory*. ICLR 2025. [Bağlantı](https://openreview.net/forum?id=pZiyCaVuti)
- Park, J. S., O'Brien, J. C., Cai, C. J., Morris, M. R., Liang, P. & Bernstein, M. S. (2023). *Generative Agents: Interactive Simulacra of Human Behavior*. UIST 2023. [Bağlantı](https://dl.acm.org/doi/10.1145/3586183.3606763)
- Maharana, A., Lee, D.-H., Tulyakov, S., Bansal, M., Barbieri, F. & Fang, Y. (2024). *Evaluating Very Long-Term Conversational Memory of LLM Agents*. ACL 2024, s. 13851–13870. [Bağlantı](https://aclanthology.org/2024.acl-long.747/)
