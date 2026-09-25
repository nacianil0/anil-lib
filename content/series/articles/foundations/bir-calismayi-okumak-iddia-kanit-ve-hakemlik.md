---
article_id: article_c3e7f280-95ab-4d61-8f34-71b0a5e9d4c2
title: "Bir Çalışmayı Okumak: İddia, Kanıt ve Hakemlik"
slug: bir-calismayi-okumak-iddia-kanit-ve-hakemlik
category: foundations
level: advanced
reading_order: 98
summary: "Seri boyunca onlarca çalışmanın sonucunu kullandık; bu makale o sonuçların nasıl okunduğunu konu ediniyor. Bir çalışmanın iddiası özetinde, kanıtı tablolarındadır ve ikisi arasındaki eşleşme her zaman tam değildir. Hakemliğin kendisi de ölçüldü: NeurIPS'in iki bağımsız komiteyle yaptığı deneyde 2014'te kabul edilen bildirilerin yüzde 49,5'i, 2021'de yüzde 50,6'sı öbür komite tarafından reddedilirdi — ve süreç daha seçici hâle getirildikçe rastgeleliğe yaklaşıyor: yalnızca sözlü sunumlar kabul edilseydi oran yüzde 88,8 olurdu. Ayar bütçesi eşitlendiğinde birçok üstünlük iddiası eriyor: doğru düzenlileştirilmiş bir LSTM kendisinden sonraki mimarileri geçiyor, metrik öğrenmede on yılda iki katına çıktığı söylenen kazanç adil karşılaştırmada en iyi ihtimalle küçük kalıyor."
tags:
  - arastirma-pratigi
  - hakemlik
  - iddia-kanit
  - taban-cizgisi
  - on-baski
content_hash: sha256:8c573b6f5a0daeebc827cf446d7131b31f252ee99144471afa319844581eef87
classification_version: 1
classification_batch: 23
---
## Şimdiye kadar hep başkası okudu

Seri boyunca hep aynı şeyi yaptık: bir çalışmanın sonucunu alıp anlattık. 96\. makalede bir kuramsal sınırın modelleri ters sıraladığını, 97\. makalede aynı soruya üç çalışmanın üç farklı cevap verdiğini gördük. İkisinde de kurtarıcı aynı şeydi — sonucun hangi koşulda ölçüldüğünü okumak.

Serinin bu fazı o okumayı doğrudan konu ediniyor. İlk sorusu şu: **bir çalışmanın iddiası tam olarak nerede yazılıdır, o iddiayı hangi kanıt taşır ve ikisi arasındaki bağ koptuğunda bunu nasıl fark ederiz?**

Serinin buraya kadarki fazları alanın **ne bildiğini** kurdu: mimariler, eğitim, ajanlar, güvenlik, ölçek, matematik. Bu faz alanın **nasıl bildiğini** kuruyor. Aradaki fark küçük görünüyor ama pratikte belirleyici: bir sonucu kullanabilmek için doğru olduğunu bilmek yetmez, hangi koşulda doğru olduğunu bilmek gerekir. 94\. makalede kaybın dilini, 96\. makalede genellemenin muhasebesini kurmuştuk; bu faz o dili literatürün kendisine çeviriyor.

Baştan bir uyarı: bu makale istatistiksel anlamlılık, güven aralığı ya da örneklem büyüklüğü hesabı yapmıyor. Onlar serinin ilerideki bir makalesinin işi. Buradaki soru daha önce geliyor — sayıya bakmadan önce, sayının hangi iddiayı taşıdığını bulmak.

## Bir bildirinin iskeleti

Önce yapıyı kuralım, çünkü her bölümün taşıdığı kanıt yükü farklı.

**Özet** iddiaları söyler; hiçbirinin kanıtını taşımaz. **Giriş** problemi ve katkı listesini kurar; buradaki cümleler çoğunlukla gövdedeki bir bölüme işaret eder ve o işaretin karşılığı olup olmadığı denetlenebilir. **Yöntem** ne yapıldığını anlatır; bir okuyucunun aynı deneyi kurabilmesi için gereken her ayrıntı buradadır ya da eksiktir. **Deneyler** ölçülen sayıları verir. **Ablasyon** — bir bileşeni çıkarıp aynı ölçümü tekrarlamak — kazancın kaynağını gösterir. **Sınırlar** bölümü, yazarın kendi kapsam beyanıdır.

İki gözlem bu iskeleti okumayı kolaylaştırır. Birincisi, bir bildiriyi baştan sona okumak nadiren doğru sıradır: özet ve şekil başlıkları önce, sonra deneyler, en sonda yöntem. İkincisi ve daha önemlisi, bölümlerin **eksikliği** de bilgidir. Ablasyon yoksa kazancın hangi bileşenden geldiği bilinmiyordur; sınırlar bölümü yoksa kapsamı okuyucu tahmin edecektir; yöntem bölümü ayar bütçesinden söz etmiyorsa karşılaştırmanın adil olup olmadığı denetlenemez.

## İddia özette, kanıt tablodadır

Bir bildiriyi okurken en yaygın hata, özeti bir sonuç listesi gibi okumaktır. Oysa özet bir **iddia listesi**dir ve her iddianın gövdede bir karşılığı olmak zorundadır.

Okumanın en basit ve en verimli disiplini şu: özetteki her cümleyi ayrı bir iddia olarak yaz, sonra gövdede o iddiayı taşıyan tabloyu ya da şekli bul. Eşleşmeyen cümleler kalır ve o cümleler makalenin en riskli yeridir.

97\. makalede kullandığımız çalışmayı bu gözle yeniden okuyalım — içeriğini zaten biliyorsun, dolayısıyla dikkatini yalnızca eşleşmeye verebilirsin.

![Beş satırlık bir eşleme tablosu ve altında iki kutu. Üstte incelenen çalışmanın Grinsztajn ve arkadaşlarının tablo verisi karşılaştırması olduğu yazılıdır. Sütunlar özetteki iddia, kanıtı taşıyan bölüm ve kanıtın türüdür. Birinci satır: ağaç toplulukları orta ölçekte önde; kanıtı 45 küme üzerinde eşit arama bütçesiyle yapılan karşılaştırma; türü doğrudan ölçüm. İkinci satır: sinir ağları fazla düzgün çözümlere eğilimli; kanıtı hedefi yumuşatma deneyi; türü kontrollü bozma. Üçüncü satır: bilgi taşımayan öznitelikler ağları daha çok vuruyor; kanıtı öznitelik atma ve ekleme deneyi; türü kontrollü bozma. Dördüncü satır: veri döndürmeye göre değişmez değil; kanıtı rastgele döndürme deneyi; türü kontrollü bozma. Beşinci satır vurguludur: bu üç eğilim farkı açıklıyor; doğrudan kanıtı yoktur ve çalışma kısmen diyerek sınırını yazar; türü çıkarım. Birinci kutuda çalışmanın kendi kapsam cümlesi durur: yalnızca sayısal değişkenler ve orta ölçekli sınıflandırma kümeleri. İkinci kutuda okuma kuralı durur: eşleşmeyen cümle yanlış demek değil, kanıt yükü henüz ödenmemiş demek. En altta bir kayıt: satırlar çalışmanın özetiyle bölümleri karşılaştırılarak çıkarılmıştır.](assets/iddia-kanit-haritasi.svg "Şekil 1 — Hangi cümleyi hangi bölüm taşıyor")

Şekil 1'in son satırı en öğretici olanı. Çalışma üç eğilim ölçüyor ve bunların performans farkını **kısmen** açıkladığını yazıyor. "Kısmen" sözcüğü bir tevazu ifadesi değil, bir kanıt beyanı: ölçülen şey üç eğilimin varlığı, ölçülmeyen şey bu üç eğilimin farkın tamamını üretip üretmediği. İyi yazılmış bir çalışma bu ayrımı kendi yapar; okuyucunun işi, yapılmadığı yerde fark etmek.

Aynı gözle bakılacak ikinci yer kapsam cümlesidir. Bu çalışma çözümlemesini sayısal değişkenli ve orta ölçekli sınıflandırma kümeleriyle sınırlıyor ve bunu açıkça yazıyor. 97\. makalede üç çalışmanın çelişmediğini, kapsamlarının farklı olduğunu söylemiştik; o karşılaştırmayı mümkün kılan şey tam olarak bu cümlelerdi.

Eşlemenin ters yönü de öğretici. 96\. makalede kullandığımız rastgele etiket deneyini düşün: özetteki iddia "derin ağlar rastgele etiketleri kolayca uyduruyor" ve kanıtı doğrudan bir tabloda, sıfır eğitim hatasıyla duruyor — eşleşme tam. Ama aynı özetin ikinci cümlesi çok daha büyük bir şey söylüyordu: klasik genelleme çerçevesi bu modelleri açıklamakta yetersiz. Bu cümlenin kanıtı bir tablo değil, bir **çıkarım zinciri**: eğer kapasite ölçüsü iki durumda da aynıysa ve sonuçlar yetmiş beş puan farklıysa, o ölçü ayırt edemiyor demektir. Zincir sağlam; ama bir tablodan okunan sayı ile bir muhakemeden çıkan sonucu aynı raftan almamak gerekiyor. Bir yıl sonra o zinciri daha da sıkılaştıran ayrı bir çalışmanın yayımlanmış olması — 96\. makaledeki düzgün yakınsama sonucu — tam da bunun kanıtı.

> **Kendini yokla:** Özetteki bir cümlenin gövdede karşılığı yoksa, bu cümle yanlış mıdır?

Hayır. Yanlış olduğu değil, **kanıt yükünün henüz ödenmediği** anlamına gelir. Bir yazar geçmiş literatüre dayanarak, sezgiye dayanarak ya da ileride ölçülecek bir şeyi öngörerek de cümle kurabilir. Okuyucunun işi cümleyi çürütmek değil, hangi güvenle taşınacağını bilmek: ölçülmüş bir sonuçla, ölçülmemiş bir yorum aynı ağırlıkta aktarılmaz.

## Hakemlik ne ölçüyor

"Hakemli bir mecrada yayımlandı" cümlesi seri boyunca bir güven işareti olarak kullanıldı — SOZLESME'nin kendi kuralı da öyle diyor. Peki bu işaret ne kadar bilgi taşıyor?

Sorunun ölçülmüş bir cevabı var, üstelik ölçümü alanın kendisi yaptı. NeurIPS'in 2014 program başkanları Corinna Cortes ve Neil Lawrence bir deney kurdu: gönderilerin yüzde 10'u ikiye bölünmüş iki bağımsız komite tarafından ayrı ayrı değerlendirildi. Deney 2021'de çok daha büyük ölçekte tekrarlandı — 9.122 gönderiden 882'si iki komiteye birden gitti ve komitelerin bundan haberi yoktu.

![İki sütunlu bir karşılaştırma ve altında bir kutu. Üstte aynı bildirilerin iki bağımsız komiteye verildiği ve bunun NeurIPS'in kendi deneyi olduğu yazılıdır. Sütunlar NeurIPS 2014 ve NeurIPS 2021 deneyleridir. Birinci satır çift değerlendirilen bildiri sayısı: 2014'te 166, 2021'de 882. İkinci satır kabul veya ret kararında anlaşmazlık oranı: 2014'te yüzde 25,9, 2021'de yüzde 23. Üçüncü satır vurguludur: bir komitenin kabul ettiği bildirilerden öbür komitenin reddettiklerinin oranı 2014'te yüzde 49,5, 2021'de yüzde 50,6. Dördüncü satır rastgele bir komiteye göre görece iyileşme: 2014 için bildirilmemiş, 2021 için yüzde 35. Alttaki kutuda 2021 deneyinin eşik çözümlemesi durur: eşik seçicileştikçe süreç rastgeleye yaklaşıyor. Yalnızca sözlü ve öne çıkan sunumlar kabul edilseydi kabul edilenlerin yüzde 88,8'i reddedilirdi ve iyileşme yalnızca yüzde 8 olurdu; poster eşiği bir kademe aşağı çekilseydi oran yüzde 63,2 ve iyileşme yüzde 25 olurdu; gerçek eşikte oran yüzde 50,6 ve iyileşme yüzde 35. En altta bir kayıt: sayılar 2021 deneyinin raporundan alınmıştır ve o rapor hakemlikten geçmemiştir.](assets/hakemligin-tutarliligi.svg "Şekil 2 — Aynı bildiriler, iki komite")

Şekil 2'nin üçüncü satırı manşet. Bir komitenin kabul ettiği bildirilerin yaklaşık **yarısı**, öbür komite tarafından reddedilirdi — ve bu oran yedi yılda neredeyse hiç değişmedi.

Bu "yarı"nın ne kadar kötü olduğunu anlamak için bir kıyas noktası gerekiyor. Raporun kullandığı taban çizgisi, kabul oranı aynı kalmak koşuluyla kararlarını yazı turayla veren iki komite. Böyle iki komitede bir bildirinin öbür tarafta reddedilme olasılığı yalnızca kabul oranına bağlıdır: kabul oranı yüzde 25 ise, kabul edilenlerin yüzde 75'i öbür tarafta reddedilir (bu örnek sayı bizim, raporun değil). Gerçek komitelerin yüzde 50,6'sı bu rastgele düzeyden yüzde 35 daha iyi; şekildeki "iyileşme" satırı bu kıyastır.

Asıl öğretici bulgu alttaki kutuda. Yazarlar eşiği oynatıp ne olacağını hesaplıyorlar ve sezgiye aykırı bir sonuç çıkıyor: **süreç ne kadar seçici olursa o kadar keyfîleşiyor.** Yalnızca sözlü sunumlar kabul edilseydi, kabul edilenlerin yüzde 88,8'i öbür komitede reddedilirdi; rastgele komiteye göre iyileşme yüzde 35'ten yüzde 8'e düşerdi. Sebebi anlaşılır: eşik yükseldikçe karar, hakemler arası gürültünün büyük olduğu dar bir aralıkta veriliyor. Kabul oranı birkaç yüzdeye indiğinde rastgele komite de kabul ettiklerinin neredeyse tamamını öbür tarafta kaybeder; gerçek komitenin yüzde 88,8'i o tavana yakın duruyor.

Bunu doğru okumak önemli. Sonuç "hakemlik işe yaramıyor" değil. Cortes ve Lawrence'ın 2014 deneyini yedi yıl sonra yeniden inceledikleri çalışma daha ölçülü bir cümle kuruyor: puanlardaki değişkenliğin yaklaşık yarısı öznel kaynaklı, ve süreç **kötü bildirileri elemekte iyi, iyi bildirileri seçmekte zayıf**. Yani hakemlik bir alt sınır güvencesi veriyor, bir kalite sıralaması vermiyor.

İşin bir de ironik yanı var: 2021 deneyinin raporu bir konferansta hakemlikten geçmedi; program başkanlarının yayımladığı bir belge. Hakemliğin ölçümü hakemsiz.

Sürecin neyi ölçtüğüne dair ikinci bir ölçüm daha var. Andrew Tomkins, Min Zhang ve William Heavlin'in PNAS'ta 2017'de yayımladığı çalışma, kabul oranı yüzde 15,6 olan bir konferansta her gönderiyi **aynı anda** iki tek-kör ve iki çift-kör hakeme verdi — tek-körde hakem yazarları görüyor, çift-körde görmüyor. Sonuç: tek-kör değerlendirme, tanınmış yazarların ve yüksek itibarlı kurumların bildirilerine anlamlı bir avantaj sağlıyor. Yani kararın bir kısmı, bildirinin içeriğinden değil künyesinden geliyor.

## Kanıtın tarafgirliği: ayar bütçesi

Bir çalışmanın iddiasını çürütmenin en sık rastlanan yolu, kanıtındaki bir asimetriyi göstermektir. Ve en yaygın asimetri hiperparametre ayarında.

Mekanizması basit. Yeni bir yöntem öneren ekip, kendi yönteminin ayarlarını haftalarca arar; karşılaştırdığı taban çizgisini ise genellikle önceki makalede bildirilen ayarlarla çalıştırır. İki modelin puanı arasındaki fark artık iki şeyin toplamı: yöntem farkı artı arama bütçesi farkı. Tablo bu ikisini ayırmaz.

![Üç bloklu bir liste ve altında bir kutu. Üstte başlık: aynı karşılaştırma, ayar bütçesi eşitlendiğinde. Birinci blok dil modelleme: yerleşik iddia, yeni yinelemeli mimarilerin LSTM'i geçtiği; eşit ve büyük ölçekli otomatik ayar altında doğru düzenlileştirilmiş standart LSTM daha yeni modelleri geçiyor. İkinci blok metrik öğrenme: yerleşik iddia, son dört yılın yöntemlerinin doğruluğu ikiye katladığı; aynı mimari, aynı embedding boyu, çapraz doğrulamalı ayar ve test kümesinden geri bildirim yasağı altında iyileşme en iyi ihtimalle küçük kalıyor. Üçüncü blok vurguludur, kelime vektörleri: yerleşik iddia, sinir ağı tabanlı vektörlerin sayım tabanlıları geçtiği; aynı tasarım ve ayar seçimleri sayım tabanlıya da taşındığında farklar çoğunlukla yerel ya da anlamsız kalıyor ve hiçbir yöntemin genel üstünlüğü görülmüyor. Alttaki kutuda ortak mekanizma yazılıdır: puan farkı, yöntem farkı ile arama bütçesi farkının toplamıdır ve tablo bu ikisini ayırmaz. En altta bir kayıt: üç satır da metinde anılan çalışmaların kendi sonuçlarından alınmıştır.](assets/ayar-butcesi-asimetrisi.svg "Şekil 3 — Aynı karşılaştırma, eşit bütçeyle")

Şekil 3 aynı deseni üç ayrı alanda gösteriyor. Gábor Melis, Chris Dyer ve Phil Blunsom'un ICLR 2018'de sunduğu çalışma dil modelleme mimarilerini büyük ölçekli otomatik ayarla yeniden değerlendirdi ve doğru düzenlileştirilmiş standart bir LSTM'in kendisinden sonra önerilen mimarileri geçtiğini buldu. Kevin Musgrave, Serge Belongie ve Ser-Nam Lim'in ECCV 2020'de sunduğu çalışma metrik öğrenmede aynı denetimi yaptı — aynı mimari, aynı embedding boyu, çapraz doğrulamayla ayarlanmış hiperparametreler ve test kümesinden geri bildirim yasağı — ve dört yılda "iki katına çıktı" denen kazancın adil karşılaştırmada en iyi ihtimalle küçük kaldığını gösterdi.

Üçüncü satır sana tanıdık. 91\. makalede Omer Levy, Yoav Goldberg ve Ido Dagan'ın Transactions of the ACL'de 2015'te yayımladığı karşılaştırmanın sayılarını görmüştük: kazançların çoğu algoritmadan değil, tasarım ve hiperparametre seçimlerinden geliyordu ve aynı seçimler sayım tabanlı eski yöntemlere taşındığında fark büyük ölçüde kapanıyordu. O zaman bunu embedding'lerin matematiği hakkında bir bilgi olarak okumuştuk; burada bir **okuma dersi** olarak duruyor. Aynı bulgu, iki farklı soruya cevap veriyor.

97\. makaledeki taban çizgisi kuralının okuyucu tarafındaki karşılığı da bu: bir tablodaki fark, taban çizgisinin ne kadar ciddiye alındığı bilinmeden okunamaz. Makalede aranacak cümle şudur — "her iki yöntem için de aynı arama bütçesi kullanıldı".

## Dört yaygın kopma biçimi

Ayar bütçesi, iddia ile kanıt arasındaki bağın koptuğu tek yer değil. Zachary Lipton ve Jacob Steinhardt'ın ACM Queue'da 2019'da yayımladığı inceleme — hakem sürecinden değil editoryal incelemeden geçmiş bir yazı; bu makalenin kendi ölçütü bu ayrımın yazılmasını istiyor — alanda tekrarlanan dört deseni adlandırıyor ve dördü de bir okuma denetimine çevrilebiliyor.

**Açıklama ile tahminin karışması.** Bir çalışma bir olguyu ölçer, sonra neden olduğuna dair bir hikâye anlatır. İkisi aynı cümlede geçtiğinde okuyucu ikisini birden ölçülmüş sanır. Denetim: hikâyenin kendisini sınayan bir deney var mı?

**Kazancın kaynağının gösterilmemesi.** Yeni bir mimari önerilir, puan yükselir; ama yükselişin mimariden mi yoksa aynı anda değişen ayarlardan mı geldiği ölçülmez. Bu, önceki bölümün asimetrisinin genel hâli ve tek çaresi ablasyon.

**Süsleme matematiği.** Sonucun kurulmasında rol oynamayan gösterişli bir biçimselleştirme, teknik ile teknik olmayan kavramların aynı sembollerle karıştırılması. Denetim: teoremi çıkarsan deneysel sonuç değişir miydi?

**Dilin kötüye kullanımı.** Gündelik çağrışımı olan sözcüklerin teknik terim olarak seçilmesi ya da yerleşik bir terime yeni bir anlam yüklenmesi. Bu seride her terimi ilk geçtiği yerde tanımlayıp sonra hep aynı anlamda kullanmamızın sebebi de bu.

Yazarların kendi çerçevesi bir suçlama değil, bir öz-denetim çağrısı: alan hızla büyüdükçe bu desenler kendiliğinden çoğalıyor. D. Sculley ve arkadaşlarının ICLR 2018 çalıştayında sunduğu kısa bildiri aynı gerilimi tek cümlede kuruyor — yayın hızı ile deneysel titizlik birbirinin rakibi ve rekabetin kazananı otomatik olarak ikincisi değil.

Bu tartışmanın alan dışında da uzun bir geçmişi var. John Ioannidis'in PLoS Medicine'de 2005'te yayımladığı ve tıp literatüründe dönüm noktası sayılan çalışma, bir bulgunun doğru çıkma ihtimalinin yalnızca o çalışmanın kendi sayılarına değil, alanın yapısına da bağlı olduğunu savunuyor: aynı soruyu kaç ekibin kovaladığı, kaç farklı çözümlemenin denenip birinin bildirildiği, sınanan hipotezin baştan ne kadar makul olduğu. Okuyucu tarafındaki karşılığı doğrudan: **bir sonucun tek başına ne kadar ikna edici olduğu, kaç şeyin denendiği bilinmeden okunamaz.**

## Aynı çalışmanın iki sürümü

Son bir ayrım, pratikte en sık atlanandır. Bir çalışmanın ön baskısı ile hakemlikten geçmiş sürümü **aynı belge değildir**.

Fark yalnızca biçimsel de değil. Hakem süreci sırasında deneyler eklenir, iddialar daraltılır, bazen başlık bile değişir. Seride kullandığımız iki tanınmış çalışmanın hakemli sürümdeki başlıkları ön baskılarındakinden farklı — bu, bir kaynakçada ön baskıya atıf vermenin, aslında başka bir belgeye atıf vermek olabileceği anlamına geliyor.

Pratikte üç şey değişebiliyor ve üçü de okunan iddiayı doğrudan etkiliyor. Kapsam daralır: "bütün görevlerde" ifadesi "denediğimiz üç görevde" hâline gelir. Kanıt eklenir: hakemin istediği ablasyon ya da taban çizgisi karşılaştırması yayımlanmış sürüme girer ve bazen ana iddiayı zayıflatır. Ve nadiren de olsa sonuç düzelir: bir hata bulunur, sayılar yeniden hesaplanır. Bir sonucu aktarırken hangi sürümü okuduğunu bilmek, dolayısıyla bir künye titizliği değil bir doğruluk meselesi.

Bir de daha sert bir örnek var ve 95\. makalede gördük. Adam'ı öneren çalışma ICLR 2015'te hakemlikten geçti ve alanın en yaygın kullanılan eniyileyicisi oldu; yakınsama kanıtındaki hata üç yıl sonra, yine ICLR'da yayımlanan bir başka çalışmayla bulundu. Kanıtı yanlış olan bir teorem, alanın en çok kullanılan yönteminin arkasında üç yıl durdu.

Buradan çıkan ders bir güvensizlik çağrısı değil, bir ölçek düzeltmesi. Hakemlik bir okuma turudur — dikkatli, ama sonlu. Bir sonucun gerçekten sağlam olduğunu gösteren şey hakem raporu değil, sonucun bağımsız biçimde yeniden üretilmesi ve kullanıldığı yerde tutmasıdır.

> **Kendini yokla:** İki çalışma çelişen sonuçlar bildiriyorsa, hangisinin hakemli mecrada yayımlandığına bakmak yeterli midir?

Yeterli değil, çünkü hakemlik, Şekil 2'nin gösterdiği gibi, iyi çalışmayı seçmekte zayıf bir cetvel. Çelişkiyi çözmek için bakılacak yer mecra değil kurulum: iki çalışma aynı ölçüyü mü kullanıyor, aynı kapsamda mı ölçüyor, taban çizgilerine aynı bütçeyi mi vermişler? 97\. makaledeki üç tablo çalışması gibi, çoğu zaman çelişki değil kapsam farkı çıkar.

## Okumanın disiplini

Bu makalenin çıktısı bir kontrol listesi değil, bir sıra. Bir çalışmayı okurken sorulacaklar, sorulma sırasıyla:

**İddia nerede ve kaç tane?** Özetteki her cümleyi ayrı yaz; sonuç bildiren cümlelerle yorum bildirenleri ayır.

**Her iddiayı hangi tablo taşıyor?** Eşleşmeyen cümleler makalenin kanıt yükü ödenmemiş kısmıdır ve aktarılırken öyle söylenir.

**Kapsam cümlesi nerede?** Hangi veri, hangi ölçek, hangi ölçüt. Bu cümle yoksa, sonucun kapsamı okuyucunun tahminine bırakılmış demektir — ve tahmin genellikle iddiadan geniş olur.

**Taban çizgisine ne kadar bütçe verilmiş?** Karşılaştırılan yöntemlerin ayar bütçeleri eşit değilse tablodaki fark yöntem farkı değildir.

**Bu, hangi sürüm?** Ön baskı mı, hakemli sürüm mü; ikisi arasında iddia daralmış mı.

**Ölçülen sayı mı, türetilen sayı mı?** Bir bildirideki her sayı ölçüm değildir: bazıları başka sayılardan hesaplanmış oranlar, bazıları bir modele uydurulmuş kestirimlerdir. 9\. makaledeki ölçek yasası eğrileri bunun en görünür örneğiydi — ölçülen şey birkaç yüz nokta, çizilen şey içinden geçirilmiş bir regresyondu.

Bu sıranın çalışmadığı bir yer de var: kanıtın kendisi yayımlanmamışsa liste boşa döner. Kapalı bir modelin raporunda eğitim verisi, ayar bütçesi ve değerlendirme protokolü verilmiyorsa, iddia ile kanıt arasındaki bağı kurmak ilkece mümkün değildir. 20\. makaledeki açıklık eksenleri tartışmasının okuyucu tarafındaki karşılığı budur.

### Sırada ne var

Şimdiye kadar okuyucu tarafındaydık: birinin kurduğu deneyi okuyup iddiayla kanıtı eşleştirdik. Ama bu makalede saydığımız kusurların hepsi bir yerde başlıyor — deneyin tasarlandığı anda. Bir sonraki makale masanın öbür tarafına geçiyor: bir araştırma sorusu nasıl sınanabilir hâle getirilir, taban çizgisi nasıl seçilir ve bir sonucun hangi parçasının hangi bileşenden geldiğini gösteren deneyler nasıl kurulur?

## Kaynakça

- Cortes, C. & Lawrence, N. D. (2021). *Inconsistency in Conference Peer Review: Revisiting the 2014 NeurIPS Experiment*. Hakemli olmayan çalışma (arXiv:2109.09774). [Bağlantı](https://arxiv.org/abs/2109.09774)
- Beygelzimer, A., Dauphin, Y. N., Liang, P. & Wortman Vaughan, J. (2023). *Has the Machine Learning Review Process Become More Arbitrary as the Field Has Grown? The NeurIPS 2021 Consistency Experiment*. NeurIPS 2021 program başkanlarının raporu; hakemlikten geçmemiştir (arXiv:2306.03262). [Bağlantı](https://arxiv.org/abs/2306.03262)
- Melis, G., Dyer, C. & Blunsom, P. (2018). *On the State of the Art of Evaluation in Neural Language Models*. ICLR 2018. [Bağlantı](https://openreview.net/forum?id=ByJHuTgA-)
- Musgrave, K., Belongie, S. & Lim, S.-N. (2020). *A Metric Learning Reality Check*. ECCV 2020. [Bağlantı](https://arxiv.org/abs/2003.08505)
- Levy, O., Goldberg, Y. & Dagan, I. (2015). *Improving Distributional Similarity with Lessons Learned from Word Embeddings*. Transactions of the ACL 3, 211–225. [Bağlantı](https://aclanthology.org/Q15-1016/)
- Grinsztajn, L., Oyallon, E. & Varoquaux, G. (2022). *Why do tree-based models still outperform deep learning on typical tabular data?* NeurIPS 2022, Datasets and Benchmarks Track. [Bağlantı](https://openreview.net/forum?id=Fp7__phQszn)
- Reddi, S. J., Kale, S. & Kumar, S. (2018). *On the Convergence of Adam and Beyond*. ICLR 2018. [Bağlantı](https://openreview.net/forum?id=ryQu7f-RZ)
- Ioannidis, J. P. A. (2005). *Why Most Published Research Findings Are False*. PLoS Medicine 2(8), e124. [Bağlantı](https://doi.org/10.1371/journal.pmed.0020124)
- Lipton, Z. C. & Steinhardt, J. (2019). *Troubling Trends in Machine Learning Scholarship*. ACM Queue 17(1), 45–77 (hakemli değil, editoryal inceleme). [Bağlantı](https://doi.org/10.1145/3317287.3328534)
- Sculley, D., Snoek, J., Wiltschko, A. & Rahimi, A. (2018). *Winner's Curse? On Pace, Progress, and Empirical Rigor*. ICLR 2018 çalıştay bildirisi. [Bağlantı](https://openreview.net/forum?id=rJWF0Fywf)
- Tomkins, A., Zhang, M. & Heavlin, W. D. (2017). *Reviewer bias in single- versus double-blind peer review*. Proceedings of the National Academy of Sciences 114(48), 12708–12713. [Bağlantı](https://doi.org/10.1073/pnas.1707323114)
