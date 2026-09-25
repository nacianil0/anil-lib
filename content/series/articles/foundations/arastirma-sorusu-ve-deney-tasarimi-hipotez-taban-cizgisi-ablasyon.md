---
article_id: article_5e078b0d-9ce4-4b43-a3bb-64d740c34c74
title: "Araştırma Sorusu ve Deney Tasarımı: Hipotez, Taban Çizgisi, Ablasyon"
slug: arastirma-sorusu-ve-deney-tasarimi-hipotez-taban-cizgisi-ablasyon
category: foundations
level: advanced
reading_order: 99
summary: "98. makale bir çalışmayı okumayı kurmuştu; bu makale masanın öbür tarafına geçiyor ve okurken aradığımız kusurların doğduğu yeri konu ediniyor: deneyin tasarlandığı an. Sınanabilir bir hipotezin ne yasakladığını, taban çizgisi seçiminin bir sonuç değil bir tasarım kararı olduğunu — budama literatüründe 81 bildirinin dörtte biri hiçbir yönteme karşı karşılaştırılmamış —, arama bütçesinin deneyin bir parçası olduğunu — aynı iki modelden hangisinin kazandığı on denemenin altında ve üstünde değişiyor — ve ablasyonun neyi gösterip neyi göstermediğini kurar. Bir ölçüt de buradan çıkıyor: bir ablasyon farkı, aynı kurulumun koşular arası sapmasından büyük değilse hiçbir şey söylemez."
tags:
  - deney-tasarimi
  - hipotez
  - taban-cizgisi
  - ablasyon
  - arama-butcesi
content_hash: sha256:f376adf75f27090bd50da81cdd646d2a94cfc2d77e60804eb3253eaf85e22264
classification_version: 1
classification_batch: 24
---
## Masanın öbür tarafı

98\. makale bir çalışmayı okumanın disiplinini kurdu: iddia özette, kanıt tablodadır ve ikisi arasındaki bağ çoğu zaman kopar. Orada saydığımız bütün kusurların tek bir doğum yeri var — deneyin tasarlandığı an. Ayar bütçesi asimetrisi, kanıtı olmayan özet cümlesi, kazancın kaynağını göstermeyen tablo: hiçbiri yazım aşamasında ortaya çıkmıyor, hepsi kurulum sırasında karar veriliyor.

Bu makale masanın öbür tarafına geçiyor. Sorusu şu: **bir merak nasıl sınanabilir bir soruya, sınanabilir bir soru nasıl bir deneye çevrilir, ve o deneyin hangi parçası sonucun kendisini belirler?**

Üç parça üzerinde duracağız, çünkü üçü de okuma tarafında en sık kırılan yerlerdi: hipotezin ne yasakladığı, taban çizgisine ne verildiği ve kazancın kaynağını gösteren deneyin nasıl kurulduğu. Baştan bir sınır: bu makale bir farkın gerçek olup olmadığına karar vermiyor. O aygıtı — anlamlı fark, örneklem büyüklüğü, güven aralığı — 101\. makalede kuracağız. Buradaki iş daha önce geliyor: karar verilecek farkı üreten deneyi doğru kurmak.

## Sınanabilir soru ne yasaklar

Bir hipotezin gücü neyi öngördüğünde değil, **neyi yasakladığında**dır. "Yeni yöntemimiz daha iyi çalışacak" cümlesi hiçbir gözlemi dışarıda bırakmaz: hangi ölçüde, hangi kümede, ne kadarlık bir farkla, hangi koşul altında? Bunların hiçbiri yazılmadığı için hiçbir sonuç bu cümleyle çelişemez, dolayısıyla cümle sınanmamıştır.

Sınanabilir hâle getirmek, deneyden **önce** dört şeyi yazmak demek: hangi ölçü, hangi küme, hangi karşılaştırma ve hangi büyüklükteki farkın iddiayı desteklediği. Dördü de yazıldığında hipotez artık bir yasak taşır — belirtilen kümede belirtilen ölçüde o büyüklükte bir fark çıkmazsa iddia düşer.

Brian Nosek ve arkadaşlarının PNAS'ta 2018'de yayımladığı çalışma bu ayrımı iki sözcükle adlandırıyor: **öngörü** (prediction) ile **sonradan açıklama** (postdiction). Öngörü, hangi çözümlemenin yapılacağının sonuçlar görülmeden belirlenmesidir; sonradan açıklama, veriye baktıktan sonra hangi çözümlemenin bildirileceğine karar vermektir. İkisi de meşru iştir — birincisi sınar, ikincisi hipotez üretir — ama aynı kanıt gücüne sahip değillerdir, ve sıralamaları görünmediğinde okuyucu ikisini ayırt edemez. Çözüm olarak önerilen pratiğin adı **ön kayıt** (preregistration): çözümleme planını, sonuçlar bilinmeden bağımsız bir kayda yazmak.

Bunun etkisi alan dışında ölçüldü. Robert Kaplan ve Veronica Irvin'in PLOS ONE'da 2015'te yayımladığı çalışma, ABD'nin ulusal kalp-akciğer-kan enstitüsünün 1970–2012 arasında desteklediği 55 büyük klinik denemeyi tarıyor. 2000 öncesinde yayımlanan 30 denemenin 17'si (yüzde 57) birincil sonuç değişkeninde anlamlı bir yarar bildiriyor; 2000 sonrasında yayımlanan 25 denemenin yalnızca 2'si (yüzde 8). Arada değişen şey tedaviler değil, birincil sonucun denemeden önce kamuya kaydedilmesi zorunluluğu.

Nosek'te aktarılan bir yan bulgu da kaydın neyi yakaladığını gösteriyor: ön kayıtlı çalışmaların yayımlanmış makalelerinin yüzde 40'ı deney koşullarından en az birini, yüzde 70'i sonuç değişkenlerinden en az birini bildirmemiş. Sürekli anlamlı çıkan bulguların yüzde 96'sı makaleye girerken, boş çıkan etkilerin yüzde 65'i girmemiş. Yani kayıt olmasa bu ayıklama görünmezdi.

Makine öğrenmesi alanında ön kayıt henüz yerleşmiş bir pratik değil; ama aynı disiplinin daha zayıf bir biçimi yerleşti. NeurIPS'in bildiri kontrol listesi bir zorunluluk: listeyi içermeyen bildiri hakemliğe bile girmeden reddediliyor, cevaplar hakemlere görünüyor ve kabul edilen bildiriyle birlikte yayımlanıyor. Listenin ilk sorusu tam olarak 98\. makalenin okuma disiplininin yazar tarafı: özetteki ve girişteki temel iddialar bildirinin katkılarını ve **kapsamını** doğru yansıtıyor mu? Kurgunun ilginç yanı, "hayır" cevabının gerekçesiyle birlikte kabul edilebilir sayılması — amaç iyi cevaplar toplamak değil, cevabı olmayan soruların görünür kalmasını sağlamak.

> **Kendini yokla:** "Yeni yöntemimiz daha iyi çalışacak" hipotezini hangi deney sonucu çürütür?

Hiçbiri — ve sorun tam olarak bu. Cümle hiçbir gözlemi yasaklamadığı için her sonuçla uyumludur: fark küçük çıkarsa "yine de pozitif", bir kümede kaybederse "o küme farklı", hiç fark çıkmazsa "en azından daha ucuz" denebilir. Yasak koymayan bir hipotez sınanamaz; sınanabilir hâli, hangi ölçüde ne kadarlık bir farkın beklendiğini deneyden önce söyler.

## Taban çizgisi bir sonuç değil, bir karar

Bir farkın anlamı, neye göre ölçüldüğüne bağlı. 97\. makalede bunu yöntem seçimi tarafından görmüştük: yeni bir yöntemin değeri, **iyi ayarlanmış** bir klasik taban çizgisine göre ölçülür ve ayarlanmamış bir taban çizgisini geçmek bir sonuç değildir. Tasarım tarafındaki karşılığı daha sert: taban çizgisini seçmek, sonucun ne kadarının kazanç sayılacağına önceden karar vermektir.

Bunun ne kadar gevşek yapıldığı ölçüldü. Davis Blalock, Jose Javier Gonzalez Ortiz, Jonathan Frankle ve John Guttag'ın MLSys 2020'de sunduğu meta-çözümleme, sinir ağı budama literatüründen 81 bildiriyi topluyor — 2010 sonrası 79 çalışma ve sonraki işlerin karşılaştırdığı iki klasik.

![Dört satırlık bir tablo ve altında iki kutu. Üstte başlık: budama literatüründe 81 bildiri, kaç yönteme karşı karşılaştırılmış. Sütunlar karşılaştırma ve bildirilerin payıdır. Birinci satır: hiçbir başka budama yöntemine karşı, dörtte birinden fazlası. İkinci satır: en fazla bir yönteme karşı, yaklaşık yarısı. Üçüncü satır: üç ya da daha az yönteme karşı, neredeyse hepsi. Dördüncü satır vurguludur: sonraki hiçbir çalışmanın karşılaştırmadığı yöntemler, onlarca. Birinci kutuda ikinci bir ölçüm durur: hiçbir veri kümesi ve ağ çifti bildirilerin üçte birinde bile görünmüyor, dolayısıyla iki çalışmanın sayıları çoğu zaman yan yana bile konamıyor. İkinci kutuda tasarım kuralı durur: taban çizgisi seçmek, sonucun ne kadarının kazanç sayılacağına önceden karar vermektir. En altta bir kayıt: sayılar Blalock ve arkadaşlarının meta-çözümlemesinden alınmıştır ve budama literatürüne aittir.](assets/taban-cizgisi-secimi.svg "Şekil 1 — Kaç yönteme karşı karşılaştırıldı")

Şekil 1'in üç satırı aynı şeyi söylüyor: karşılaştırma seyrek. Dördüncü satır ise bunun bileşik sonucu — bir yöntem hiç karşılaştırılmamışsa, onu geçtiğini iddia eden bir sonuç da yoktur, dolayısıyla alanın "en iyi" dediği şey bir sıralama değil bir alışkanlıktır. Alttaki ilk kutu bunu daha da kapatıyor: iki çalışma farklı ağları farklı kümelerde budarsa sayıları yan yana bile konamaz.

Taban çizgisine yeterince bütçe verildiğinde ne olduğunu gösteren bir örnek de var. Mario Lucic, Karol Kurach, Marcin Michalski, Olivier Bousquet ve Sylvain Gelly'nin NeurIPS 2018'de sunduğu çalışma, düşmanca üretken ağların önerilmiş varyantlarını tarafsız bir kurulumda karşılaştırıyor ve sonuç şu: yeterli hiperparametre araması ve yeterli yeniden başlatmayla modellerin **neredeyse hepsi benzer değerlere ulaşıyor**. Yazarlar hiçbir varyantın özgün tasarımı tutarlı biçimde geçtiğine dair kanıt bulamıyor. Aynı çalışmanın ikinci önerisi tasarım açısından daha da önemli: en iyi sonucu değil, sonuçların **dağılımının özetini** bildir.

## Arama bütçesi deneyin içindedir

Buradan doğal bir soru çıkıyor: taban çizgisine "yeterli bütçe" vermek ne demek, ve bütçe değişince sonuç değişir mi?

Jesse Dodge, Suchin Gururangan, Dallas Card, Roy Schwartz ve Noah Smith'in EMNLP 2019'da sunduğu çalışma bu soruyu bir ölçüye çeviriyor: tek bir en iyi puan yerine, **belirli bir bütçeyle bulunan en iyi modelin beklenen doğrulama başarımı**. Yani "elli deneme yaptım, en iyisi şu" değil; "x deneme yapan biri ortalamada ne alır". Bu ölçü bütçenin bir fonksiyonu olduğu için iki modelin eğrileri kesişebilir.

![Dört bloklu bir liste ve altında iki kutu. Üstte başlık: aynı karşılaştırma, değişen tek şey arama bütçesi. Birinci blok duygu sınıflandırması: ondan az hiperparametre denemesinde lojistik bağlanım önde, bütçe büyüdükçe evrişimli ağ öne geçiyor. İkinci blok temsil seçimi: iki saatin altında yalnızca sabit vektörler, altı saat ile bir gün arasında dondurulmuş bağlamsal temsil, on gün dolayında ince ayarlı bağlamsal temsil. Üçüncü blok çıkarım kümesi: bildirilen puana ulaşmak için beklenen deneme sayısı n-gram taban çizgisinde 2, grafik tabanlı modelde 20. Dördüncü blok vurguludur, okuduğunu anlama: bildirilen eşleşme puanına ulaşmak için beklenen bütçe 55 deneme, yaklaşık 18 gün eğitim. Birinci kutuda çıkarım durur: hangi modelin daha iyi olduğu bütçenin fonksiyonudur, bütçe yazılmadan karşılaştırma tekrarlanamaz. İkinci kutuda bir sayım durur: rastgele seçilmiş elli EMNLP 2018 bildirisinin hiçbiri önerilen raporlama kalemlerinin tamamını vermiyor. En altta bir kayıt: bütün değerler Dodge ve arkadaşlarının kendi deneylerinden alınmıştır.](assets/arama-butcesi-deneyin-parcasi.svg "Şekil 2 — Kazanan, bütçenin fonksiyonu")

Şekil 2'nin ilk satırı en sade hâli: aynı iki model, aynı veri, aynı ölçü; ondan az denemede lojistik bağlanım önde, bütçe büyüdükçe evrişimli ağ öne geçiyor. İkinci satır aynı deseni bir literatür tartışmasına uyguluyor — bağlamsal temsilleri dondurmak mı, ince ayarlamak mı daha iyi? Cevap bütçeye göre değişiyor ve yazarların özgün sonucu yalnızca dar bir bütçe aralığında geçerli kalıyor. Üçüncü ve dördüncü satırlar ters yönden okunuyor: yayımlanmış bir puana ulaşmak için ortalamada kaç deneme gerekir? Aynı tablodaki dört model için bu sayı ikiyle yirmi arasında değişiyor; başka bir çalışmada elli beş denemeye, yani yaklaşık on sekiz gün eğitime çıkıyor.

Alttaki ikinci kutu bunun raporlama tarafı: yazarlar rastgele seçtikleri elli EMNLP 2018 bildirisine bakıyor ve hiçbirinin önerdikleri kalemlerin tamamını vermediğini buluyorlar.

Bütçenin nasıl harcandığı da bir tasarım kararı. James Bergstra ve Yoshua Bengio'nun JMLR'de 2012'de yayımladığı çalışma, ızgara aramayla rastgele aramayı karşılaştırıyor — burada **rastgele arama**, hiperparametre uzayından bağımsız örnekler çekmek anlamında; 63\. makaledeki aynı adlı saldırı yöntemiyle karıştırılmaz, orada aranan şey bir istemdi. Argüman geometrik ve tek bir sayıyla görülüyor: iki hiperparametreli bir uzayda dokuz denemelik bir ızgara, gerçekte önemli olan tek ekseni yalnızca **üç** farklı değerde yoklar; dokuz rastgele nokta ise o ekseni dokuz farklı değerde yoklar. Hiperparametrelerin çoğu sonucu az etkilediği için — yazarların ölçtüğü şey bu — ızgaranın simetrisi boşa harcanan bir bütçedir. Aynı çalışmada, otuz iki boyutlu bir yapılandırma uzayında saf rastgele arama, elle ve ızgarayla dikkatle ayarlanmış bir düzenle yedi veri kümesinin dördünde istatistiksel olarak eşit, birinde daha iyi sonuç veriyor.

Aynı çözümlemenin ikinci yarısı daha az anılır ama tasarım açısından daha bağlayıcı: hangi hiperparametrelerin önemli olduğu **veri kümesine göre değişiyor**. Bu, ızgarayı yalnızca verimsiz değil, yeni bir kümede ilkece yanlış kılar — ızgara, hangi eksenin önemli olduğunu tasarımcının önceden bildiğini varsayar, oysa bilinen şey önceki kümeden gelir. Taban çizgisine "önceki makalede bildirilen ayarlarla" bakmanın 98\. makalede gördüğümüz asimetrisi burada bir kök nedene kavuşuyor: o ayarlar başka bir kümenin önemli eksenlerine göre seçilmişti.

## Ablasyonun kanıt yükü

Deney kurulduysa geriye tek soru kalıyor: kazanç nereden geliyor? 98\. makalede ablasyonu bir bileşeni çıkarıp aynı ölçümü tekrarlamak diye tanımlamıştık. Tasarım tarafında bunun iki sınırı var ve ikisi de sık atlanıyor.

Birincisi gürültü. Bir bileşeni çıkarınca puan oynar; oynamanın bir kısmı bileşenden, bir kısmı aynı kurulumun kendi değişkenliğinden gelir.

![Beş satırlık bir tablo ve altında üç kutu. Üstte başlık: aynı bütçe, aynı görev, değişen tek bileşen; 65.536 adımda kayıp ve düşük olanın iyi olduğu yazılıdır. Sütunlar model, kayıp, sapma ve nottur. Birinci satır taban çizgisi olan özgün Transformer: kayıp 2,182, sapma artı eksi 0,005, 223 milyon parametre. İkinci satır vurguludur, GeLU aktivasyonu: 2,179, artı eksi 0,003, 223 milyon. Üçüncü satır geçitli doğrusal birim: 2,174, artı eksi 0,003, 223 milyon. Dördüncü satır ELU aktivasyonu: 2,270, artı eksi 0,007, 223 milyon. Beşinci satır uzmanlar karışımı mimarisi: 2,135, artı eksi 0,007, 1,1 milyar parametre. Birinci kutu vurguludur: evrensel Transformer standart ayarlarla 2,40, yirmi beş yapılandırma denendikten sonra en iyi hâli 2,265 ve taban çizgisine hâlâ yetişemiyor. İkinci kutuda okuma kuralı durur: GeLU ile taban çizgisi arasındaki 0,003'lük fark, taban çizgisinin kendi koşular arası sapması olan 0,005'ten küçüktür, dolayısıyla tek başına bir kazanç kanıtı değildir. Üçüncü kutuda ablasyonun görmediği şey durur: iki bileşeni ayrı ayrı çıkarmak, ikisini birden çıkarmanın etkisini vermez. En altta bir kayıt: değerler Narang ve arkadaşlarının tablosundan alınmıştır.](assets/ablasyonun-kanit-yuku.svg "Şekil 3 — Fark, kendi gürültüsünden büyük mü")

Şekil 3, Sharan Narang ve arkadaşlarının EMNLP 2021'de sunduğu geniş taramadan alınmış bir kesit. Çalışma, Transformer mimarisine önerilmiş çok sayıda değişikliği tek bir ortak kurulumda, görev ve hiperparametreler sabit tutularak ve parametre ya da işlem sayısı eşitlenerek yeniden ölçüyor. Sonuç yazarların da beklemediği türden: değişikliklerin çoğu anlamlı bir iyileşme sağlamıyor. Faydalı bulunanlar ise üç sınıfa düşüyor — görece basit değişiklikler, deneylerin yapıldığı kod tabanında geliştirilmiş olanlar, ve parametre ya da işlem sayısını artıranlar.

İkinci sınıf bu çalışmanın kendi tasarım kararını da gerektirdi. Bir değişiklik yeniden kurulurken yanlış kurulmuş olabilir ve o zaman ölçülen şey yöntem değil, yeniden kurulumun kusurudur. Yazarlar bunu kapatmak için on iki tekniğin yazarlarına ulaşıp kendi kodlarını incelemelerini istemiş; altısı cevap vermiş ve altısı da kurulumu doğru bulmuş. Bu, ablasyonun görünmeyen ön koşulu: çıkarılan ya da eklenen bileşenin, çıkarıldığı biçimiyle gerçekten o bileşen olduğu ayrıca gösterilmelidir.

Şeklin ikinci kutusu okuma kuralını veriyor. GeLU aktivasyonunun kaybı 2,179; taban çizgisinin kaybı 2,182. Fark 0,003. Ama taban çizgisinin kendi koşular arası sapması 0,005. Yani gözlenen fark, aynı kurulumu tekrar çalıştırınca doğal olarak oynayan aralığın içinde kalıyor ve tek başına bir kazanç kanıtı değil. Aynı tabloda ELU'nun 2,270'i ise sapmanın on katından uzakta: orada bir etki var ve yönü aşağı değil yukarı, yani kayıp artıyor. Uzmanlar karışımının 2,135'i de ayrı okunur, çünkü o satırda değişen tek şey bileşen değil — parametre sayısı 223 milyondan 1,1 milyara çıkmış durumda.

Şeklin ilk kutusu ise ayar bütçesiyle ablasyonun nasıl birleştiğini gösteriyor. Evrensel Transformer standart ayarlarla 2,40 veriyor; yazarlar yirmi beş farklı yapılandırma deniyor, bunlardan yalnızca ikisi ilk sonucu geçiyor ve en iyi hâl 2,265'te kalıyor — taban çizgisinin 2,182'sinin hâlâ gerisinde. Bu, 98\. makaledeki ayar bütçesi asimetrisinin tersi: burada bütçe **taban çizgisine değil, sınanan yönteme** fazladan verildi ve yine de yetmedi.

> **Kendini yokla:** Bir ablasyon tablosunda iki bileşeni ayrı ayrı çıkarmak puanı birer puan düşürüyor. İkisini birden çıkarınca puan kaç düşer?

Tablodan bilinemez. Tek tek ablasyonlar her bileşenin **ötekiler yerindeyken** ne taşıdığını ölçer; ikisi birden çıkarıldığında ortaya çıkacak sayı bir toplam da olabilir, ikisinden küçük de — biri ötekinin işini üstleniyorsa. Etkileşim ancak o koşu gerçekten çalıştırılırsa ölçülür, ve çalıştırılmadıysa tablo iki puanlık toplam hakkında hiçbir şey söylemiyordur.

## Bozarak sormak

Ablasyon bir bileşeni çıkarır; deneyin ikinci biçimi bir bileşeni **bozar**. İkisi de aynı mantığı taşır: bir şeyi kasıtlı olarak değiştirip sonucun ne kadarının ona bağlı olduğunu okumak.

Seride iki örneğini gördük. 96\. makaledeki rastgele etiket deneyi veriyi bozuyordu: etiketler anlamsızlaştırılıyor ve aynı ağın hâlâ sıfır eğitim hatasına indiği gösteriliyordu. 97\. makaledeki rastgele döndürme deneyi öznitelik eksenlerini bozuyordu ve tablo verisinde yöntemlerin sıralamasını tersine çeviriyordu. İkisinin de ortak yanı, bir **varsayımı** hedef almaları: birincisi kapasiteye bakan genelleme sınırlarının iki durumu ayırt edebileceği varsayımını, ikincisi ağaçların eksen seçimine bağlı olmadığı varsayımını.

Tasarım kuralı buradan çıkıyor: iyi bir bozma deneyi rastgele bir gürültü eklemez, iddianın dayandığı varsayımı seçer ve yalnızca onu bozar. Sonuç değişmezse varsayım gereksizdir; sonuç çökerse iddianın taşıyıcısı bulunmuştur.

Bunun bir ön koşulu da var ve atlandığında deney anlamını yitiriyor: bozulmamış koşunun **aynı kurulumda** çalıştırılmış olması. Rastgele etiket deneyinin ikna ediciliği, sıfır eğitim hatasının kendisinden değil, aynı ağın aynı bütçeyle gerçek etiketlerde yüzde 85,75, rastgele etiketlerde yüzde 9,78 test doğruluğu vermesinden geliyordu — iki sayı yan yana durduğu için ezber ile öğrenme ayrışabildi. Tek başına bozulmuş koşu bir gözlemdir; karşılaştırma ise bir deneydir.

## Deney tasarımının disiplini

**Hipotez bir yasak taşımalı.** Hangi ölçü, hangi küme, hangi karşılaştırma, ne büyüklükte fark — dördü deneyden önce yazılmadıysa hiçbir sonuç hipotezle çelişemez.

**Öngörü ile sonradan açıklama ayrı raflardır.** İkisi de gereklidir; sırası görünmezse okuyucu ikisini ayırt edemez. Klinik denemelerde birincil sonucun önceden kaydedilmesi, anlamlı yarar bildiren çalışma oranını yüzde 57'den yüzde 8'e indirdi.

**Taban çizgisi seçmek kazancı tanımlamaktır.** Zayıf ya da ayarlanmamış bir taban çizgisi, farkın bir kısmını yöntemin hanesine yazar. Budama literatüründe bildirilerin dörtte birinden fazlası hiçbir başka yöntemle karşılaştırılmamış.

**Arama bütçesi deneyin parçasıdır ve yazılmalıdır.** Hangi modelin kazandığı bütçeye göre değişebiliyor; yayımlanmış bir puana ulaşmak için gereken deneme sayısı aynı tabloda iki ile yirmi arasında oynayabiliyor.

**Bütçenin nasıl harcandığı da bir karar.** Az sayıda hiperparametre gerçekten önemliyse, ızgara aramanın simetrisi boşa gider: dokuz ızgara noktası kritik ekseni üç değerde yoklar, dokuz rastgele nokta dokuz değerde.

**Ablasyon farkı kendi gürültüsüyle birlikte okunur.** Koşular arası sapmadan küçük bir fark bir kazanç kanıtı değildir; ve tek tek ablasyonlar bileşenler arası etkileşimi ölçmez.

**Bozma deneyi varsayımı hedef alır.** Rastgele gürültü değil, iddianın dayandığı şey bozulur.

Bu listenin eksik bıraktığı bir yer var. Buradaki bütün kararlar deneyi **kurmakla** ilgili; hiçbiri elde edilen iki sayıya bakıp "bu fark gerçek mi" sorusunu cevaplamıyor. Şekil 3'teki 0,003 ile 0,005'i yan yana koyup bir hüküm verdiğimizde aslında sezgiyle davrandık — o karşılaştırmanın biçimsel hâli, kaç ölçüm gerektiği ve hangi belirsizlikle geldiği henüz kurulmadı.

### Sırada ne var

Seride bir eşiğe geldik. Buraya kadar mimariler, eğitim, çıkarım, akıl yürütme, getirme, ajanlar, güvenlik, değerlendirme, çoklu modalite, matematiksel omurga ve şimdi araştırma pratiği kuruldu — ve bundan sonraki iki makale bu fazların hepsinden örnek çekecek. Bir sonraki makale bu yüzden yeni bir kavram tanıtmıyor: buraya kadar kurulan her şeyin haritasını çiziyor, hangi fazın hangi fazı neyle beslediğini tek bir şekle koyuyor ve okuyucuya kendi haritasını çizmesi için bir düzen bırakıyor.

## Kaynakça

- Nosek, B. A., Ebersole, C. R., DeHaven, A. C. & Mellor, D. T. (2018). *The preregistration revolution*. Proceedings of the National Academy of Sciences 115(11), 2600–2606. [Bağlantı](https://doi.org/10.1073/pnas.1708274114)
- Kaplan, R. M. & Irvin, V. L. (2015). *Likelihood of Null Effects of Large NHLBI Clinical Trials Has Increased over Time*. PLOS ONE 10(8), e0132382. [Bağlantı](https://doi.org/10.1371/journal.pone.0132382)
- Blalock, D., Gonzalez Ortiz, J. J., Frankle, J. & Guttag, J. (2020). *What is the State of Neural Network Pruning?*. MLSys 2020. [Bağlantı](https://proceedings.mlsys.org/paper_files/paper/2020/hash/6c44dc73014d66ba49b28d483a8f8b0d-Abstract.html)
- Lucic, M., Kurach, K., Michalski, M., Bousquet, O. & Gelly, S. (2018). *Are GANs Created Equal? A Large-Scale Study*. NeurIPS 2018. [Bağlantı](https://papers.nips.cc/paper_files/paper/2018/hash/e46de7e1bcaaced9a54f1e9d0d2f800d-Abstract.html)
- Dodge, J., Gururangan, S., Card, D., Schwartz, R. & Smith, N. A. (2019). *Show Your Work: Improved Reporting of Experimental Results*. EMNLP-IJCNLP 2019, 2185–2194. [Bağlantı](https://doi.org/10.18653/v1/D19-1224)
- Bergstra, J. & Bengio, Y. (2012). *Random Search for Hyper-Parameter Optimization*. Journal of Machine Learning Research 13, 281–305. [Bağlantı](https://jmlr.org/papers/v13/bergstra12a.html)
- Narang, S., Chung, H. W., Tay, Y., Fedus, W., Fevry, T., Matena, M., Malkan, K., Fiedel, N., Shazeer, N., Lan, Z., Zhou, Y., Li, W., Ding, N., Marcus, J., Roberts, A. & Raffel, C. (2021). *Do Transformer Modifications Transfer Across Implementations and Applications?*. EMNLP 2021, 5758–5773. [Bağlantı](https://doi.org/10.18653/v1/2021.emnlp-main.465)
- NeurIPS. *NeurIPS Paper Checklist Guidelines*. Konferansın gönderi kuralları belgesi; hakemli bir çalışma değildir. [Bağlantı](https://neurips.cc/public/guides/PaperChecklist)
