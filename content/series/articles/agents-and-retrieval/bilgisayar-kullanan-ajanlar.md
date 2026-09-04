---
article_id: article_25d8925e-4196-465b-a945-6cec9f36f61c
title: "Bilgisayar Kullanan Ajanlar"
slug: bilgisayar-kullanan-ajanlar
category: agents-and-retrieval
level: intermediate
reading_order: 54
summary: "Ajanı insan için çizilmiş arayüze koyar: ekranın üç gösterimini — sayfa kaynağı, erişilebilirlik ağacı, ekran görüntüsü — ve her birinin token bedelini ve eksikliğini; eylemin kimlikle mi koordinatla mı verildiğini; planın doğru, tıklamanın yanlış olduğu yerin adını, öğe konumlandırmayı, ve bunun için ayrıca eğitilmiş modellerin kazancını; işaretlemenin nerede işe yaradığını nerede zarar verdiğini; beş ortamda ajanla insan arasındaki uçurumu ve uçurumun üç nedenini; aynı ekran görüntüsünün webde neden kazandırıp telefonda neden kaybettirdiğini ölçümlerle anlatır."
tags:
  - bilgisayar-kullanimi
  - ekran-gosterimi
  - erisilebilirlik-agaci
  - oge-konumlandirma
  - web-ajani
content_hash: sha256:6a5ef710be92b504193064a528e4c798a3b4b50dd50a5701abf52dac926274b4
classification_version: 1
classification_batch: 12
---
## İnsan için çizilmiş arayüz

48\. makale bir tez kurmuştu: insan için tasarlanmış arayüz modele uymaz, arayüz modele göre çizilmeli. O makaledeki üç arayüz — arama, yorumlayıcı, dosya — modele göre çizilmişti ve bu yüzden metin döndürüyordu. Ama insanların bilgisayarla konuştuğu arayüz bunların hiçbiri değil: bir ekran, bir fare, bir klavye. Bir tarayıcıda uçak bileti almak, bir hesap tablosunda toplam almak, bir telefonda alarm kurmak; bunların hiçbirinin 47\. makaledeki gibi bir işlev çağrısı yok. Bu makale ajanı o arayüze koyuyor ve üç soru soruyor: ajan ekranı nasıl görür, eylemi nasıl verir, ve insan için çizilmiş bir arayüzde başarısı neden insanın bu kadar gerisinde?

Alandaki ad **grafik kullanıcı arayüzü** (graphical user interface, GUI): düğmeler, metin kutuları, listeler, kaydırma çubukları. Ajanı burada çalıştırmanın adı ise bilgisayar kullanımı; 53'teki ajanlar birbirleriyle metinle konuşuyordu, buradaki ajan ekranla konuşuyor. Bir sözcük daha, çünkü bu makalenin merkezinde duracak: modelin "arama düğmesine tıkla" niyetini ekrandaki belirli bir öğeye ya da koordinata çevirmesine **öğe konumlandırma** (grounding) diyeceğiz. İngilizce sözcük 45\. makaledeki kaynak sadakatiyle aynı kökten; kavram başka: orada cümlenin kaynağa bağlanması, burada niyetin ekrana bağlanması.

## Ekranı nasıl görmeli: üç gösterim

51'in ilk dersi buradaki her şeyi belirliyor: model dünyayı değil pencereyi görür. Bir ekran pencereye üç biçimde girebilir ve üçü de 48'deki gibi bir arayüz kararıdır.

Birincisi sayfanın kaynağı: web sayfasının HTML ağacı, bir telefon uygulamasının görünüm hiyerarşisi. 48\. makalede bunun bedelini görmüştük: bir sayfa ortalama 1.135 öğe taşıyor ve süzülünce 580'e iniyor. Boyuttan başka bir sorun daha var: kaynak, ekranda görünmeyen şeyleri de taşır ve görünenlerin nerede olduğunu söylemez.

İkincisi **erişilebilirlik ağacı** (accessibility tree): işletim sisteminin ya da tarayıcının, görme engelli kullanıcılara ekranı okumak için ürettiği yapı — her öğenin rolü (bağlantı, düğme, metin kutusu), metni ve özellikleri (odaklanabilir mi, seçili mi). Shuyan Zhou ve arkadaşlarının 40'ta gördüğümüz web ortamı bunu ana gösterim olarak seçiyor: kaynağın görünen ve anlamlı alt kümesi, her öğeye bir kimlik numarası eklenmiş hâlde. Ajan "[1582] Sepete ekle" satırını görür ve `click [1582]` yazar. Bu gösterimin kusuru, kaynağını üreten insanlarda: Boyu Gou ve arkadaşlarının ICLR 2025'te sunduğu çalışmanın aktardığı bir taramada, en çok ziyaret edilen bir milyon sitenin ana sayfalarının yüzde 95,9'unda erişilebilirlik hatası var — eksik alternatif metin, etiketsiz form alanı —, sayfa başına ortalama 56,8. Ağaç, sayfayı yapan kişi özenmediyse eksik ya da yanlıştır; masaüstü uygulamalarında ise çoğu zaman hiç yoktur ya da üretmesi yavaştır.

Üçüncüsü **ekran görüntüsü** (screenshot): piksellerin kendisi. İnsanın gördüğü şey bu ve hiçbir şeyi eksik bırakmıyor; ama bir metin modeline verilemez. Görüntüyü token'a çeviren modellerin mekanizması serinin çoklu modalite fazının konusu; bu makalede o modelleri bir kara kutu olarak kullanıyor, yalnızca ne ölçtüklerini aktarıyoruz. Bedel dengesi çarpıcı: Boyuan Zheng ve arkadaşlarının ICML 2024'te sunduğu çalışmanın 48'deki web görevi kümesinin görüntülü sürümünde bir sayfanın HTML'i ortalama 128.827 token, aynı sayfanın ekran görüntüsü 4.240 görsel token tutuyor. Otuz kat; 21\. makaledeki pencere için bu, gösterim seçiminin bir bütçe kararı olması demek.

![Aynı web sayfasının üç gösterimi yan yana ve her birinin altında eylemin biçimi. Sol bölmede sayfa kaynağı: iç içe etiketlerden oluşan bir HTML parçası, altında binlerce öğe ve yüz bin token dolayında bedel yazar; eylem, öğenin kaynak yolu ya da seçicisidir. Orta bölmede erişilebilirlik ağacı: rol, metin ve kimlik numarası taşıyan satırlar, örneğin köşeli parantez içinde 1582 ve düğme Sepete ekle; altında görünenlerin alt kümesi ve yüzlerce öğe yazar; eylem, kimlik numarasıyla tıklamadır. Sağ bölmede ekran görüntüsü: bir sayfanın piksel karesi, üstünde bir düğmenin çevresinde koordinat işareti; altında dört bin görsel token dolayında bedel yazar; eylem, koordinata tıklamadır. Şeklin altında üç gösterimin sırasıyla eksiksiz ama pahalı, ucuz ama eksik, eksiksiz ama bir görüntü modeli gerektiren olduğu yazılıdır.](assets/ekranin-uc-gosterimi.svg "Şekil 1 — Aynı ekran, üç gösterim, üç eylem biçimi")

## Eylem: kimliğe mi, koordinata mı

Şekil 1'in alt satırı ikinci soruya geçiyor: ajan eylemi nasıl verir? 37'de eylem kümesi sözlüktü, 51'de çevrenin komutları; burada iki seçenek var ve ikisi ayrı bir öğrenme sorunu.

Birinci seçenek, kimlikle: erişilebilirlik ağacındaki her öğe numaralıdır, ajan numarayı seçer. Zhou ve arkadaşlarının deyişiyle bu, öğe seçimini bir sınıflandırma sorununa çevirir: n öğe arasından biri. 47'de araç seçimini bir getirme sorunu olarak kurmuştuk; bu onun ekran hâli, ve aynı zayıflığı taşır: öğe listede yoksa seçilemez.

İkinci seçenek, koordinatla: ekranın piksel ızgarasında bir nokta. Bu, alanın başladığı yer. Tianlin Shi, Andrej Karpathy ve arkadaşlarının ICML 2017'de sunduğu çalışma, 100 küçük web görevinden — düğmeye tıkla, tarih seç, kaydırıcıyı ayarla — bir küme kurdu; her görev 210'a 160 piksellik bir sayfa, girdi yalnızca piksel, eylem ızgaradaki 400 noktadan birinde hareket, sürükleme ya da tıklama. İnsan gösterimlerinden öğrenen ağın ortalama başarı oranı yüzde 24,8, üstüne pekiştirmeli öğrenmeyle 34,8; insanın en az yarısı kadar başarılı olduğu görev sayısı yüzde 17'den 26'ya çıkıyor. Aynı küme genişletilmiş hâliyle alanın on yıllık ölçütü oldu: Evan Liu ve arkadaşlarının ICLR 2018'de sunduğu çalışma, sayfa kaynağını okuyan bir ağla ve görev başına 3–10 gösterimle — önceki 200 yerine — daha yüksek başarıya çıktı. Peter Shaw ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma ise halkayı kapattı: yalnızca piksel girdisi ve genel fare–klavye eylemleriyle, ekran görüntüsü okumaya önceden eğitilmiş bir model, aynı kümede insan çalışanları geçti ve kaynağı okuyan en iyi sistemle eşleşti; ön eğitim kaldırılınca puan 66,5'ten 17,1'e düşüyor. 8\. makaledeki ön eğitim dersi burada ekran için: pikselleri okumayı öğrenmiş bir model, ekrana bakmayı bedava alıyor.

İki seçenek arasındaki asıl ayrım hata türünde. Kimlikle eylemde ajan yanlış öğeyi seçebilir ama var olmayan bir öğeye tıklayamaz; koordinatla eylemde ajan doğru öğeyi bilip yanlış noktaya tıklayabilir. Bu ikincisi, öğe konumlandırmanın kendisi ve ölçüsü var.

Zheng ve arkadaşlarının çalışması bunu en temiz biçimde ayırdı. Görüntü alabilen bir modele 48'deki web görevlerini verip iki aşamaya böldüler: önce model bir sonraki eylemi sözle yazar — "arama kutusuna şehir adını yaz" —, sonra bu söz ekrandaki bir öğeye bağlanır. İkinci aşama için üç yöntem denediler: modelin öğenin özelliklerini yazması ve eşleşmesi; ekran görüntüsüne numaralı kutular çizilip modelin numara söylemesi; ve 48'deki gibi aday öğelerin metin listesinden seçim. Bir de kâhin: doğru öğeyi insan bağlar. Adım başarısı üç bölünmede: özellikle 16,1, 12,1, 19,0; işaretli görüntüyle 20,3, 13,9, 23,7; metin listesiyle 39,1, 32,7, 42,0; kâhinle 61,9, 65,0, 62,1. Aynı model, aynı plan; yalnızca niyetin ekrana bağlanma biçimi değişiyor ve puan üç kat oynuyor. Şekil 2 dört yöntemi ve canlı site sonucunu yan yana koyuyor: canlı sitelerde bütün görev başarısı, en iyi kendi konumlandırmasıyla yüzde 37,8, kâhinle 51,1. Yazarların cümlesi 51'deki "doğru plan, geçersiz eylem" bulgusunun ekran hâli: model iyi bir web ajanı olabilir, konumlandırıldığı sürece.

![İki panelli yatay çubuk şeması. Sol panelin başlığı adım başarısı, sağ panelinki canlı sitede görev başarısı. Sol panelde dört satır vardır; solda konumlandırma yönteminin adı, ortada çubuk, sağda yüzde: öğe özellikleriyle 16,1, işaretli görüntüyle 20,3, metin listesinden seçimle 39,1, insan konumlandırmasıyla 61,9; son satır vurgulu renktedir. Sağ panelde iki satır vardır: metin listesinden seçimle 37,8, insan konumlandırmasıyla 51,1. Şeklin altında planın her satırda aynı model tarafından yazıldığı ve yalnızca niyetin ekrana bağlanma biçiminin değiştiği yazılıdır.](assets/plan-ayni-konumlandirma-farkli.svg "Şekil 2 — Plan aynı, konumlandırma farklı")

> **Kendini yokla:** Aynı model, aynı plan; adım başarısı 16'dan 62'ye çıkıyor. Değişen ne?

Niyetin ekrana bağlanma biçimi. Model her satırda aynı sözel eylemi yazıyor; fark, "arama kutusu" sözünün hangi öğeye çevrildiğinde. Kâhin bu çeviriyi insana yaptırınca puan dörde katlanıyor; yani darboğaz planlama değil, konumlandırma. 48'deki arayüz tezi burada en keskin hâlini alıyor: aynı beyin, farklı el.

## Piksellerden koordinata

Konumlandırma darboğazsa, onu ayrıca öğrenmek gerekir. Kanzhi Cheng ve arkadaşlarının ACL 2024'te sunduğu çalışma bunun için bir ölçüt kurdu: 600'ü aşkın ekran görüntüsü — telefon, masaüstü, web — üzerinde 1.200'ü aşkın "şuna tıkla" talimatı; ölçü, modelin söylediği noktanın doğru öğenin içine düşme oranı. Genel amaçlı görüntü modeli yüzde 16,2 alıyor; ekran görüntülerinde öğe bulmaya ayrıca eğitilmiş 9,6 milyarlık model 53,4. Ve çalışmanın asıl bulgusu: konumlandırma puanı arttıkça üç ayrı ajan kümesindeki görev başarısı da artıyor; konumlandırma, ajan başarısının ölçülebilir bir bileşeni.

Gou ve arkadaşları aynı yolu ölçekledi. Web sayfalarının kaynağından öğelerin konumlarını ve betimlemelerini otomatik çıkarıp 1,3 milyon ekran görüntüsünde 10 milyon öğelik bir eğitim kümesi kurdular — 12\. makaledeki sentetik verinin ekran hâli; etiketi insan değil, sayfanın kendi kaynağı yazıyor. Aynı ölçütte 7 milyarlık model yüzde 86,3'e, 72 milyarlık 89,4'e çıkıyor; ve hiç masaüstü görüntüsü görmemiş model masaüstünde de çalışıyor. Sonra bu modeli bir ajanın eli yaptılar: planı yazan model yalnızca ekran görüntüsü görür, hiç kaynak ya da ağaç okumaz, niyeti konumlandırma modeli koordinata çevirir. 48'deki web kümesinde öğe doğruluğu yalnızca pikselle 44,8; kaynak listesinden seçen metin yöntemiyle 42,3; numaralı kutularla 25,6. İnsan gibi yalnızca ekrana bakan bir ajan, kaynağı okuyan ajana yetişti.

Numaralı kutular her yerde işe yaramıyor ve bunun ölçüsü öğretici. Tianbao Xie ve arkadaşlarının NeurIPS 2024 veri kümeleri ve ölçütler programında sunduğu masaüstü ortamında, en iyi modelin görüntüsüne kutular çizmek puanı görüntü artı ağaç düzenine göre **düşürüyor**. Yazarların açıklaması iki parçalı: masaüstü ekranı bir web sayfasından çok daha yoğun — bir hesap tablosunun her hücresi bir öğe — ve kutular yardım yerine gürültü oluyor; ayrıca bazı görevler kutuyla değil koordinatla verilir, bir hücrenin içindeki nokta gibi. Çözünürlük de bir düğme: ekran 1920'ye 1080 ve yalnızca görüntüyle çalışan düzende çözünürlüğü düşürmek puanı düşürüyor; ama işaretli düzende görüntüyü 768'e 432'ye küçültmek puanı **artırıyor** ve daha da küçültmek yeniden düşürüyor. Görüntüyü token'a çeviren model kendi eğitildiği çözünürlükte iyi görüyor; ekranı ona uydurmak, 48'deki yüz satırlık pencerenin piksel hâli. Bir sağlayıcının belgelendirmesi — hakemli değil, kendi modeli için — aynı dersi bir kural olarak yazıyor: ekranı 1024'e 768 ya da 1280'e 720 gibi bir çözünürlükte tut, büyük ekranı küçültüp döndürülen koordinatları geri ölçekle, küçük yazıyı okumak için ekranın bir bölgesini tam çözünürlükte yakınlaştır.

## Neden hâlâ insanın gerisinde

Üç soru kaldı ve üçünü de aynı tablo cevaplıyor: bu ajanlar gerçek arayüzlerde ne kadar başarılı? Şekil 3 beş ortamı yan yana koyuyor; ortamların hepsi çalışan siteler ya da uygulamalar, hepsinde insan da ölçülmüş.

![Beş satırlı çift çubuk şeması; her satırda solda ortamın adı ve görev sayısı, ortada üst üste iki çubuk, sağda iki yüzde vardır. Üstteki soluk çubuk insanın, alttaki vurgulu çubuk en iyi ajanın görev başarısıdır. Web ortamında 812 görev, insan 78,2, ajan 14,4; görsel web ortamında 910 görev, insan 88,7, ajan 16,4; masaüstü ortamında 369 görev, insan 72,4, ajan 12,2; telefon ortamında 116 görev, insan 80,0, ajan 30,6; canlı site kümesinde 643 görev, ajan 59,1 ve insan çubuğunun yerinde ölçülmedi yazar. Şeklin altında değerlerin her çalışmanın kendi en iyi ajanına ait olduğu, modellerin ve yılların farklı olduğu ve canlı site kümesinde başarının bir hakem modelle ölçüldüğü yazılıdır.](assets/insan-ve-ajan-bes-ortam.svg "Şekil 3 — Beş ortam, aynı uçurum")

Sayılar: Zhou ve arkadaşlarının 812 görevlik web ortamında insan yüzde 78,2, en iyi ajan 14,4. Jing Yu Koh ve arkadaşlarının ACL 2024'te sunduğu ve görsel bilgi gerektiren 910 görevlik sürümünde insan 88,7, görüntü alabilen en iyi model 16,4. Xie ve arkadaşlarının 369 görevlik masaüstü ortamında insan 72,4 — ve bir görevi ortanca 112 saniyede bitiriyor, web ortamındaki 35 saniyeye karşı —, en iyi ajan 12,2. Christopher Rawles ve arkadaşlarının ICLR 2025'te sunduğu 116 görevlik telefon ortamında insan 80,0, en iyi ajan 30,6. Hongliang He ve arkadaşlarının ACL 2024'te sunduğu 643 görevlik canlı site kümesinde görüntü artı metinle 59,1; bu kümede insan ölçülmedi ve puan 45\. makaledeki gibi bir hakem modelle verildi, insan hakemle uyumu yüzde 85,3.

Uçurumun üç nedeni ölçülmüş.

Birincisi konumlandırma. Xie ve arkadaşlarının hata incelemesi en sık hatayı adlandırıyor: ajan doğru planı yazıyor ve yanlış koordinata tıklıyor; sonra 51'deki döngü başlıyor — aynı tıklama tekrar ediyor — ve yanlış tıklama beklenmedik bir pencere, bir açılır uyarı, bir reklam açıp ekranı kirletiyor. Yazarlar buna çevre gürültüsü diyor; 50'deki dizine sızan yanlış belgenin ekran hâli. Rawles ve arkadaşları telefonda aynı şeyi görüyor: en zor hatalar ince etkileşimlerde, bir kaydırıcıyı doğru değere çekmek gibi.

İkincisi durma kararı, ve 51'in bulgusu burada başka bir kılıkta. Zhou ve arkadaşları isteme "görev yapılamazsa dur" ibaresini koyunca en iyi model, yapılabilir görevlerin yüzde 54,9'unu yapılamaz ilan ediyor; ibare kaldırılınca genel başarı 11,7'den 14,4'e çıkıyor ama model yapılamaz görevlerin ancak yüzde 44,4'ünü tanıyor. Durma iznini vermek de vermemek de bir hata sınıfı açıyor ve ikisi ayrı ayrı ölçülmeli.

Üçüncüsü gösterimin platforma bağlı olması, ve bu makalenin en öğretici çelişkisi bu. He ve arkadaşlarının canlı site kümesinde görüntü artı metin 59,1 alırken yalnızca erişilebilirlik ağacı 40,1 alıyor: ekran görüntüsü on dokuz puan kazandırıyor. Rawles ve arkadaşlarının telefon ortamında ise aynı ajanın yalnızca ağaç okuyan sürümü 30,6, ağaca ekran görüntüsü ve numaralı kutular eklenen sürümü 25,4: görüntü beş puan **kaybettiriyor**. Çelişkinin en yalın okuması gösterimin kalitesi; bu serinin yorumu, iki çalışmanın ortak ölçümü değil. Telefonun erişilebilirlik ağacı işletim sisteminin kendi görünüm hiyerarşisinden gelir ve telefon ekranı seyrektir; web sayfasınınkini sayfayı yapan kişi üretir ve yüzde 95,9'u kusurludur. Ağaç iyiyse görüntü gürültüdür; ağaç kötüyse görüntü tek eksiksiz kaynaktır. Gösterim kararı platformun kararıdır.

Uçurumu kapatmaya başlayan şey ise 52'den tanıdık. Saaket Agashe ve arkadaşlarının ICLR 2025'te sunduğu çalışma, masaüstü ortamında aynı modeli bir bellekle donatıyor: görevi alt görevlere bölen bir plan, her alt görev için geçmiş bölümlerden getirilen deneyim özetleri, ve bölüm sonunda deneyimin belleğe yazılması — 52'deki ders ve beceri kütüphanesi, ekran için. Aynı modelle başarı 11,21'den 20,58'e çıkıyor; neredeyse iki kat, ama insanın hâlâ üçte biri.

> **Kendini yokla:** Ekran görüntüsü canlı sitelerde on dokuz puan kazandırıp telefonda beş puan kaybettiriyor. Görüntü mü değişti, ekran mı?

Ekranın öbür gösterimi değişti. Telefonda erişilebilirlik ağacı işletim sisteminin görünüm hiyerarşisinden gelir ve ekran seyrektir; görüntü ona az şey ekler, gürültü ekler. Webde ağaç sayfayı yapanın özenine bağlıdır ve çoğu sayfada kusurludur; görüntü, ağacın atladığını görür. Aynı model, aynı görüntü modeli; kazanç, görüntünün öbür gösterimin boşluğunu doldurup doldurmadığına bağlı.

## Ekran ajanının disiplini

**Gösterim bir bütçe ve bir eksiklik kararıdır.** Kaynak eksiksiz ama otuz kat pahalı; erişilebilirlik ağacı ucuz ama üreticisinin özenine bağlı; ekran görüntüsü eksiksiz ama bir görüntü modeli ister.

**Eylem kimlikle ya da koordinatla verilir ve ikisi ayrı hata yapar.** Kimlik listede olmayanı seçemez; koordinat doğru öğeyi bilip yanlış noktaya basar.

**Darboğaz plan değil, konumlandırma.** Aynı model aynı planla, niyetin ekrana bağlanma biçimine göre 16'dan 62'ye çıkıyor; canlı sitede 37,8'den 51,1'e.

**Konumlandırma ayrıca öğrenilir.** Sayfa kaynağından otomatik üretilmiş on milyon öğe, yalnızca ekrana bakan bir ajanı kaynağı okuyanla eşitliyor; ön eğitim kaldırılınca piksel ajanı dörtte birine düşüyor.

**İşaretleme her yerde işe yaramaz.** Seyrek web sayfasında numaralı kutular kazandırır; yoğun masaüstü ekranında gürültü olur. Çözünürlük, görüntü modelinin eğitildiği ölçeğe uydurulur.

**Uçurum üç yerden gelir.** Yanlış tıklama ve onun açtığı gürültü; yapılabilir görevi yapılamaz ilan etme; platformun gösterim kalitesi. İnsan beş ortamda yüzde 72 ile 89 arasında, en iyi ajan 12 ile 31.

**Görüntü, öbür gösterimin boşluğunu dolduruyorsa kazandırır.** Ağaç eksiksizse görüntü kaybettirir; ağaç kusurluysa görüntü tek eksiksiz kaynaktır.

### Sırada ne var

Bu makaledeki ajan ekranı gördü ve tıkladı; ama 48'de bir arayüzün daha eksik kaldığını söylemiştik: kod. Kod yazan ajanın dünyası bir ekran değil, bir depo; gözlemi bir ekran görüntüsü değil, bir test çıktısı; eylemi bir tıklama değil, bir düzenleme. 48'de kod onarım ajanının dört düğmesini görmüştük, 51'de o ajanın neden hızlı başarıp yavaş başarısız olduğunu. Bir sonraki makale döngüyü kod için baştan kuruyor: depo nasıl gezilir, hata nasıl yeniden üretilir, test ne zaman doğrulayıcıdır, ve bir ajanın yazdığı kodun bir insanınkinden farkı ölçülebilir mi?

## Kaynakça

- Zhou, S., Xu, F. F., Zhu, H., Zhou, X., Lo, R., Sridhar, A., Cheng, X., Ou, T., Bisk, Y., Fried, D., Alon, U. & Neubig, G. (2024). *WebArena: A Realistic Web Environment for Building Autonomous Agents*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=oKn9c6ytLx)
- Gou, B., Wang, R., Zheng, B., Xie, Y., Chang, C., Shu, Y., Sun, H. & Su, Y. (2025). *Navigating the Digital World as Humans Do: Universal Visual Grounding for GUI Agents*. ICLR 2025. [Bağlantı](https://openreview.net/forum?id=kxnoqaisCT)
- Zheng, B., Gou, B., Kil, J., Sun, H. & Su, Y. (2024). *GPT-4V(ision) is a Generalist Web Agent, if Grounded*. ICML 2024, PMLR 235. [Bağlantı](https://proceedings.mlr.press/v235/zheng24e.html)
- Shi, T., Karpathy, A., Fan, L., Hernandez, J. & Liang, P. (2017). *World of Bits: An Open-Domain Platform for Web-Based Agents*. ICML 2017, PMLR 70, s. 3135–3144. [Bağlantı](https://proceedings.mlr.press/v70/shi17a.html)
- Liu, E. Z., Guu, K., Pasupat, P., Shi, T. & Liang, P. (2018). *Reinforcement Learning on Web Interfaces using Workflow-Guided Exploration*. ICLR 2018. [Bağlantı](https://openreview.net/forum?id=ryTp3f-0-)
- Shaw, P., Joshi, M., Cohan, J., Berant, J., Pasupat, P., Hu, H., Khandelwal, U., Lee, K. & Toutanova, K. (2023). *From Pixels to UI Actions: Learning to Follow Instructions via Graphical User Interfaces*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/6c52a8a4fadc9129c6e1d1745f2dfd0f-Abstract-Conference.html)
- Cheng, K., Sun, Q., Chu, Y., Xu, F., Li, Y., Zhang, J. & Wu, Z. (2024). *SeeClick: Harnessing GUI Grounding for Advanced Visual GUI Agents*. ACL 2024. [Bağlantı](https://aclanthology.org/2024.acl-long.505/)
- Xie, T., Zhang, D., Chen, J., Li, X., Zhao, S., Cao, R., Hua, T. J., Cheng, Z., Shin, D., Lei, F., Liu, Y., Xu, Y., Zhou, S., Savarese, S., Xiong, C., Zhong, V. & Yu, T. (2024). *OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments*. NeurIPS 2024 Datasets and Benchmarks Track. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/5d413e48f84dc61244b6be550f1cd8f5-Abstract-Datasets_and_Benchmarks_Track.html)
- Anthropic (2026). *Computer use tool*. Resmî belgelendirme. [Bağlantı](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)
- Koh, J. Y., Lo, R., Jang, L., Duvvur, V., Lim, M. C., Huang, P.-Y., Neubig, G., Zhou, S., Salakhutdinov, R. & Fried, D. (2024). *VisualWebArena: Evaluating Multimodal Agents on Realistic Visual Web Tasks*. ACL 2024. [Bağlantı](https://aclanthology.org/2024.acl-long.50/)
- Rawles, C., Clinckemaillie, S., Chang, Y., Waltz, J., Lau, G., Fair, M., Li, A., Bishop, W., Li, W., Campbell-Ajala, F., Toyama, D., Berry, R., Tyamagundlu, D., Lillicrap, T. & Riva, O. (2025). *AndroidWorld: A Dynamic Benchmarking Environment for Autonomous Agents*. ICLR 2025. [Bağlantı](https://openreview.net/forum?id=il5yUQsrjC)
- He, H., Yao, W., Ma, K., Yu, W., Dai, Y., Zhang, H., Lan, Z. & Yu, D. (2024). *WebVoyager: Building an End-to-End Web Agent with Large Multimodal Models*. ACL 2024. [Bağlantı](https://aclanthology.org/2024.acl-long.371/)
- Agashe, S., Han, J., Gan, S., Yang, J., Li, A. & Wang, X. E. (2025). *Agent S: An Open Agentic Framework that Uses Computers Like a Human*. ICLR 2025. [Bağlantı](https://openreview.net/forum?id=lIVRgt4nLv)
