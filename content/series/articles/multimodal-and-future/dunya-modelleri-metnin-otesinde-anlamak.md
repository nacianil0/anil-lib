---
article_id: article_60582af1-e07e-48e6-871d-829f774ebca3
title: "Dünya Modelleri: Metnin Ötesinde Anlamak"
slug: dunya-modelleri-metnin-otesinde-anlamak
category: multimodal-and-future
level: advanced
reading_order: 110
summary: "1. makalede açık bırakılan soruyu ölçülebilir hâle getirir: sonraki token'ı tahmin etmeyi öğrenen bir sistem, metnin anlattığı dünyanın bir modelini de kurmuş olur mu? Terimin iki soyunu ayırır — pekiştirmeli öğrenmedeki açık geçiş modeli ile dil modelindeki örtük model — ve geçerli bir sonraki token ile okunabilir bir sondanın neyi kanıtlamadığını, Manhattan haritasını kuran ama sokakları uydurmuş bir modelin ölçümleriyle gösterir."
tags:
  - dunya-modeli
  - temsil
  - degerlendirme
  - pekistirmeli-ogrenme
  - saglamlik
content_hash: sha256:39cfe5338a69ab9b5d9dc4597a2c8499a48a0e0740cc32d26519c468ee2af278
classification_version: 1
classification_batch: 26
---
## Dört makalelik "nasıl"dan sonra "ne"

Son faz baştan sona bir mühendislik fazıydı. Bir eğitim adımının kaç bayt tuttuğunu, kaç karta bölündüğünü, kartın içinde kaç mikrosaniye harcadığını ve haftalar süren bir koşunun kaç kez bozulduğunu saydık. Her sorunun cevabı bir sayıydı ve her soru "nasıl" sorusuydu.

Şimdi yön değişiyor. Bütün bu mühendisliğin ucunda duran şey, sonraki token'ı tahmin etmeyi öğrenmiş bir model. Peki o model **neyi** öğrenmiş oluyor?

Bu soruyu 1\. makalede açık bırakmıştık. Emily Bender ve Alexander Koller'in 2020'de ACL'de ödül alan bildirisi, yalnızca dilin biçimiyle eğitilmiş bir sistemin ilke olarak anlamı öğrenemeyeceğini savunuyordu; o makalenin dürüst pozisyonu, tartışmanın açık olduğu ve okurun ilerleyen makalelerde tarafların gerekçeleriyle karşılaşacağıydı. Bu makale o borcun bir kısmını ödüyor — ama felsefi tartışmayı sürdürerek değil, sorunun **ölçülebilir** bir hâlini kurarak. Soru şu: bir dizi tahmincisinin, dizilerin ardında duran dünyanın doğru bir modelini kurup kurmadığını nasıl sınarsın?

## Terimin iki soyu

"Dünya modeli" ifadesi iki ayrı alandan geliyor ve karıştırılırsa tartışma anlamsızlaşıyor.

Birincisi pekiştirmeli öğrenmeden. 37\. makalede Markov karar sürecini kurmuştuk: durum, eylem, geçiş ve ödül. Orada geçiş fonksiyonu — hangi durumda hangi eylemin nereye götürdüğü — çevrenin bir özelliğiydi ve ajan onu bilmiyordu. Bir **dünya modeli**, işte o geçiş fonksiyonunun öğrenilmiş bir kopyasıdır. Açıktır, ayrı bir bileşendir ve tek bir işe yarar: dünyaya dokunmadan plan yapabilmek.

David Ha ve Jürgen Schmidhuber'in NeurIPS 2018'de sunduğu çalışma bunun en çarpıcı gösterisini yapıyor. Ajan önce çevreyi gözlemliyor, sonra gördüklerinden bir geçiş modeli öğreniyor; ardından politika **tamamen o modelin ürettiği hayalî çevrenin içinde** eğitiliyor ve gerçek çevreye geri taşınıyor. Bir araba yarışı görevinde tam dünya modelli ajan 100 rastgele denemede 906 ± 21 puan alıyor; o tarihte bildirilen en iyi sonuç 838 ± 11, yaygın bir derin pekiştirmeli öğrenme yöntemininki 343 ± 18 idi.

Bu soyun bugünkü hâli Danijar Hafner, Jurgis Pasukonis, Jimmy Ba ve Timothy Lillicrap'in 2025'te *Nature*'da yayımladığı çalışma. Yöntem yine aynı iskelet — çevrenin bir modelini öğren, davranışı o modelin içinde hayal ederek iyileştir — ama iddia farklı: **tek bir sabit yapılandırmayla** yüz elliden fazla farklı görevde, her biri için ayrı ayarlanmış uzman yöntemlerin üstüne çıkıyor. Aynı yöntem, insan verisi ya da kademeli müfredat olmadan, açık bir oyun dünyasında elmas toplamayı başaran ilk sistem olmuş; bu, seyrek ödül altında uzun vadeli plan gerektiren bir hedef olduğu için alanda bir ölçüt sayılıyordu.

İkinci soy dil modellerinden ve burada açık bir geçiş fonksiyonu **yok**. Model yalnızca sonraki token'ı tahmin etmek üzere eğitiliyor. Soru şu: bu eğitim, dizilerin ardındaki dünyanın bir modelini **örtük** olarak kurdurur mu? İki soyun ortak yanı "dünya modeli" sözcüğü; ayrıldıkları yer, birinde modelin bir bileşen, ötekinde bir hipotez olması.

Aradaki asimetriyi de baştan söylemek gerekiyor, çünkü iki soyun kanıt standartları farklı. Pekiştirmeli öğrenmedeki modelin doğruluğu ucuza sınanır: gerçek çevre elinin altındadır, modele bir durum ve eylem verir, tahmin ettiği sonraki durumu gerçeğiyle karşılaştırırsın. Dil modelinde böyle bir çevre yok — karşılaştırılacak bir gerçeklik ya hiç tanımlı değildir ya da tanımlıysa bile ona sorgu atmak kolay değildir. Bu yüzden ikinci soydaki bütün sınavlar dolaylıdır ve sınavın tasarımı sonucun yarısını belirler.

![Dört satırlı üç sütunlu bir tablo ve altında iki kutu. Üstte başlık: dünya modeli iki ayrı nesneyi adlandırıyor. Sütunlar soru, pekiştirmeli öğrenmede ve dil modelinde. Birinci satır nedir: ayrı bir bileşen ve bir hipotez. İkinci satır ne tahmin eder: durum artı eylem ok durum, ve geçmiş ok sonraki token. Üçüncü satır ne işe yarar: dokunmadan plan yapmak, ve hedef değil yan ürün. Dördüncü satır vurguludur, nasıl sınanır: gerçek çevreyle kıyasla, ve ancak davranıştan. Birinci kutunun başlığı açık modelin iki ölçülmüş sonucu; içinde hayalî çevrede eğitilip gerçek çevreye taşınan ajanın bir araba yarışında 906 artı eksi 21 aldığı, o tarihteki en iyi sonucun 838 artı eksi 11 ve yaygın bir yöntemin puanının 343 artı eksi 18 olduğu, ayrıca tek sabit yapılandırmayla 150'den fazla görev ve elmas toplayan ilk sistem yazılıdır. İkinci kutuda asimetri durur: açık modelde karşılaştırılacak bir çevre var, örtük modelde yok; bu yüzden ikinci sütunun bütün sınavları dolaylıdır. En altta bir kayıt: puanlar Ha ile Schmidhuber'den, görev sayısı ve elmas Hafner ve arkadaşlarından.](assets/terimin-iki-soyu.svg "Şekil 1 — Bir bileşen ile bir hipotez")

Şekil 1'in son satırı ayrımın pratik sonucunu taşıyor: açık bir modeli doğrudan sınayabilirsin, örtük bir modeli ancak davranışından çıkarsayabilirsin.

## Aldatılabilen bir model

Açık dünya modelinin bir zayıflığı ilk çalışmada zaten görülmüş ve serinin başka bir yerinde tanıdığımız bir biçime sahip. Ha ve Schmidhuber, hayalî çevrede eğitilen ajanın bazen modelin **kusurlarını** bulup onları sömüren politikalar öğrendiğini yazıyor: gerçek çevrede imkânsız olan ama modelin izin verdiği hareketler. Çözümleri hayali daha gürültülü yapmak olmuş.

Bu, 13\. makaledeki aşırı optimizasyonun ta kendisi. Orada ödül modeli gerçek tercihin kusurlu bir vekiliydi ve politika vekili sömürüyordu; burada dünya modeli gerçek çevrenin kusurlu bir vekili ve politika onu sömürüyor. Aynı biçim, başka bir nesne. Ve buradan bu makalenin birinci dersi çıkıyor: bir modelin ne kadar iyi olduğu, onun **üzerinde ne yapmak istediğine** bağlı. Gözlemleri iyi tahmin eden bir model, üzerinde arama yapmaya yetmeyebilir.

## Okunabilir olmak, doğru olmak değildir

Şimdi ikinci soya, dil modellerine dönelim. Bu soruyu ölçmenin bilinen yolu 77\. makalede kurulmuştu: Kenneth Li ve arkadaşlarının ICLR 2023 çalışması, yalnızca Othello hamlelerinin dizisiyle eğitilmiş bir modelde tahta durumunun bir sondayla okunabildiğini, üstelik sonda üzerinden temsile müdahale edilince modelin hamlelerinin buna göre değiştiğini gösteriyordu. Okuma artı müdahale — o tarihten beri bu alandaki en güçlü kanıt biçimi.

Peki bu kanıt ne kadarını kanıtlıyor? Keyon Vafa, Justin Y. Chen, Ashesh Rambachan, Jon Kleinberg ve Sendhil Mullainathan'ın NeurIPS 2024'te sunduğu çalışma tam bu soruyu soruyor ve cevabı rahatsız edici.

Yazarların hamlesi önce kuramsal. Ardındaki gerçeklik sonlu bir durum makinesiyse — bir harita, bir oyun, bir mantık bulmacası — dil kuramının klasik bir sonucu devreye giriyor: **birbirinden farklı her iki durum, onları ayırt eden bir dizi vardır.** Kilit ayrıntı şu: o ayırt edici dizinin tek bir token uzunluğunda olması gerekmez. Dolayısıyla "modelin ürettiği bir sonraki token geçerli mi" diye bakmak, durumu doğru temsil edip etmediğini güvenilir biçimde ölçmez; yalnızca bir adımlık ayrımları sınar.

Buradan iki ölçüt çıkıyor ve ikisi de sezgisel. Birincisi: aynı duruma götüren iki farklı önek, aynı devamları kabul etmeli. İkincisi: farklı durumlara götüren iki önek, farklı devamlar vermeli.

Somut bir örnek bu kuramsal cümleyi bir anda anlaşılır kılıyor ve yazarların kendi örneği. Taşların sütunlara yığıldığı bir dört-taş oyununda iki ayrı tahta düşünün. İkisinde de geçerli hamleler kümesi **tamamen aynı**: hangi sütuna oynayabileceğin iki tahtada da birebir örtüşüyor. Yani "bir sonraki hamle geçerli mi" sınavı bu iki tahtayı asla ayırt edemez. Onları ayıran en kısa dizi dört hamle uzunluğunda, ve ikisini ayırt eden dizilerin tamamı otuz hamleye kadar uzanıyor. Bir sınav iki durumu ayırt edemiyorsa, modelin onları karıştırıp karıştırmadığını da ölçemez.

![Yan yana iki kutu, altında bir uzunluk ekseni ve en altta bir kural kutusu. Üstte başlık: iki farklı tahta, aynı geçerli hamleler. Soldaki kutunun başlığı Tahta A, sağdakinin başlığı Tahta B; ikisinde de geçerli hamleler her sütun açık, taşların dizilişi farklı yazar. Kutuların altında kalın bir cümle durur: bir adımlık sınav ikisini ayırt edemez çünkü geçerli hamle kümeleri birebir aynıdır. Onun altında ayırt eden dizinin uzunluğunu gösteren doğrusal bir eksen vardır; üzerinde üç işaret bulunur. Birinci işaret 1'dedir ve bir adımlık sınavı gösterir. İkinci işaret 4'tedir, vurguludur ve en kısa ayırt eden diziyi gösterir. Üçüncü işaret 30'dadır ve ayırt eden dizilerin en uzununu gösterir. En alttaki kutunun başlığı kural: iki durumu ayıran en kısa dizi birden uzunsa, bir sonraki token'a bakan sınav o çifti hiç göremez ve modelin onları karıştırdığını da ölçemez. En altta bir kayıt: eksen dizi uzunluğudur ve doğrusaldır, 1, 4 ve 30 değerleri Vafa ve arkadaşlarından gelir.](assets/ayirt-eden-dizi.svg "Şekil 2 — Aynı hamleler, farklı durumlar")

Şekil 2'nin alt kutusu ölçütün mantığını taşıyor: sınavın uzunluğu, ayırt edebildiği durum çiftlerini belirliyor.

Bu iki ölçütün bir özelliği daha var ve yöntem olarak önemli: ikisi de yalnızca modelin **çıktısına** bakıyor. 77\. makaledeki sonda ve müdahale düzeni modelin içine erişmeyi gerektiriyordu; burada gereken tek şey modele istem verip devamını okuyabilmek. Bu, aynı sınavın ağırlıkları yayımlanmamış bir modele de uygulanabileceği anlamına geliyor — 69\. makaledeki erişim kademelerinin en dar basamağında bile.

Sınama alanı olarak New York'un taksi yolculuklarını seçiyorlar. Gerçek dünya modeli belli: Manhattan'ın 4.580 kavşak ve 9.846 sokaktan oluşan çizgesi. Modeller bu çizge üzerindeki yolculuk dizileriyle eğitiliyor; 89,3 milyon ve 1,5 milyar parametreli iki boy kullanılıyor. Ve üç ayrı veri düzeni deneniyor: en kısa yollar, gürültülü en kısa yollar, ve **rastgele yürüyüşler**.

Bilinen ölçütlerle sonuç mükemmele yakın: üretilen bir sonraki yön neredeyse her zaman geçerli bir dönüş, ve bir sonda modelin bulunduğu kavşağı örneklerin yüzde 90'ından fazlasında doğru okuyor. 77\. makaledeki kanıt biçimi burada da geçiyor.

Yeni ölçütlerle sonuç çöküyor. Hiçbir model sıkıştırma ölçütünde iyi değil: aynı kavşağa götüren iki önek verildiğinde modeller sık sık farklı devamların geçerli olduğunu iddia ediyor. Yazarlar modelin ürettiği dizilerden haritayı geri kurunca ne olduğu görünüyor — ortaya çıkan haritada var olmayan sokaklar ve başka sokakların üstünden geçen bağlantılar var. Model doğru yolları bulabiliyor, ama bunu tutarlı bir harita üzerinden yapmıyor.

> **Kendini yokla:** Bir model, bir sonraki adımı neredeyse her zaman geçerli üretiyorsa hangi hatayı hâlâ yapabilir?

İki farklı geçmişi aynı duruma götürdüğü hâlde onları ayrı durumlar sanabilir — ya da tersini. Bir adımlık sınav bunu göremez, çünkü iki durum aynı geçerli hamle kümesine sahip olabilir ve ancak birkaç hamle sonra ayrışabilirler. Sınavın derinliği cevabı belirliyor: yazarların ölçümünde rastgele yürüyüşlerle eğitilen model tek token uzunluğundaki ayrımlarda yüzde 100 alırken, tam ayrım kümesine bakıldığında yüzde 50'ye düşüyor.

> **Kendini yokla:** Aynı boydaki iki modelden biri en kısa yollarla, öteki rastgele yürüyüşlerle eğitilmiş. Hangisinin daha tutarlı bir harita kurmasını beklersin, neden?

Rastgele yürüyüşlerle eğitileninkini — ve ölçüm de öyle diyor. Sebebi veri kapsamı: en kısa yollar kenarların yalnızca küçük bir alt kümesinden geçer ve hep aynı yönlerde geçer, dolayısıyla model haritanın büyük kısmını hiç görmez. Amaçsız yürüyüş ise kötü, dolambaçlı ve alışılmadık geçişleri de gösterir. Yani "kaliteli veri" burada iyi değil, **dar** demek oluyor — ve darlık, göreve uyduğu sürece görünmüyor.

## Tutarsız haritanın faturası

"Harita tutarsız ama sonuç doğru" savunması akla geliyor ve çalışma onu da sınıyor. Modelden bir rota isteniyor, ama yol boyunca belirli bir olasılıkla **sapma** ekleniyor: modelin önerdiği hamle değiştiriliyor ve modelden yeniden yol bulması bekleniyor. Hedefe ulaşan geçerli yolların oranı şöyle:

| Sapma olasılığı | %0 | %1 | %10 |
|---|---|---|---|
| En kısa yollarla eğitilen | 0,99 | 0,69 | 0,08 |
| Gürültülü en kısa yollarla eğitilen | 0,96 | 0,52 | 0,03 |
| Rastgele yürüyüşlerle eğitilen | 0,99 | 0,99 | 1,00 |
| Gerçek dünya modeli | 1,00 | 1,00 | 1,00 |

İlk sütunda dört satır da neredeyse aynı. İkinci sütunda — **yüz hamlede bir** sapmayla — ilk iki model çöküyor. Üçüncü sütunda ellide biri bile kalmıyor.

Üçüncü satır bu tablonun asıl haberi. Rastgele yürüyüşlerle eğitilen model, gürültülü en kısa yollarla eğitilenle **aynı boyda**; tek farkları hangi dizileri gördükleri. Amaçsızca dolaşan yolculukları görmüş olan model haritayı daha tutarlı kurmuş, ve tutarlılığı sapma altında ödüyor. Yani buradaki ayrım ölçekten değil, eğitim dağılımından geliyor.

İki ölçüm arasındaki uyum da tesadüf değil: sıkıştırma ve ayrım ölçütlerinde daha iyi olan model, sapma altında da daha sağlam. Bu, ölçütlerin işe yaradığının kanıtı — bir cetvel, ancak umursadığın bir farkla birlikte hareket ediyorsa cetveldir.

Bu sonucun neden önemli olduğunu görmek için sapma tablosunu ajan diline çevirmek yeter. 51–60\. makalelerde kurduğumuz ajan döngüsü tam olarak budur: bir plan yapılır, bir eylem denenir, dünya beklenenden farklı cevap verir ve plan yeniden kurulur. Sapma oranı, o döngüde ne sıklıkta beklenmedik bir cevap geldiğinin ölçüsüdür — ve gerçek bir ortamda yüzde birin çok üstündedir. Bir modelin eğitildiği görevdeki puanı, onun bir ajanın içinde ne kadar dayanacağını söylemiyor; söyleyen şey, dünyasının tutarlı olup olmadığı.

![Dört satırlı üç sütunlu bir tablo ve altında iki kutu. Üstte başlık: aynı modeller, iki ayrı sınav. Sütunlar soru, bilinen sınavlar ve dizi tabanlı ölçütler. Birinci satır ne sorar: sonraki token geçerli mi, ve aynı duruma götüren iki önek aynı devamları mı veriyor. İkinci satır neye erişir: modelin içine, ve yalnızca çıktıya. Üçüncü satır vurguludur, sonuç: geçerlilik neredeyse yüzde 100 ve sonda yüzde 90'ın üstünde, buna karşılık hiçbir model iyi değil. Dördüncü satır kurulan harita: bilinen sınavlarda sorulmuyor, dizi tabanlı ölçütlerde olmayan sokaklar ve üst geçitler çıkıyor. Birinci kutunun başlığı cevabı sınavın derinliği belirliyor; içinde rastgele yürüyüşlerle eğitilen modelin tek token'lık ayrımlarda yüzde 100 aldığı, ayırt eden dizilerin tamamına bakıldığında yüzde 50'ye indiği yazılıdır. İkinci kutunun başlığı başka bir alanda aynı tablo; içinde oturma düzeni bulmacalarında hiçbir modelin sıkıştırma isabetinin yüzde 40'ı, ayrım duyarlığının 0,60'ı geçmediği yazılıdır. En altta bir kayıt: bütün değerler Vafa ve arkadaşlarının ölçümleridir.](assets/iki-sinav-iki-cevap.svg "Şekil 3 — Aynı model, iki sınav, iki cevap")

Şekil 3'ün iki sütunu yan yana durduğunda soru kendiliğinden değişiyor: "model dünya modeli kurdu mu" değil, "hangi derinlikte sınadın".

Aynı ölçütler başka alanlarda da uygulanıyor ve tablo değişmiyor. Oturma düzeni bulmacalarında hiçbir modelin sıkıştırma isabeti yüzde 40'ı, ayrım duyarlığı 0,60'ı geçmiyor — yani bilgi tam verildiğinde bulmacayı çözebilen modeller, iki farklı ifadenin aynı duruma karşılık geldiğini yarıdan fazla durumda fark edemiyor.

## Şu an dürüstçe söylenebilecekler

**Soru ölçülebilir hâle geldi ve cevabı sınavın derinliğine bağlı.** Ardındaki gerçeklik sonlu durumlu bir yapıysa, iki durumu ayıran dizilerin tamamına bakmak gerekir; tek token'lık sınav yanıltıcı biçimde iyimserdir. Aynı model bir sınavda yüzde 100, ötekinde yüzde 50 alıyor.

**Okunabilir bir temsil, doğru bir dünya modeli demek değil.** Sonda kavşağı yüzde 90'ın üstünde okuyabiliyor, üretilen hamleler neredeyse hep geçerli — ve aynı modelin kurduğu harita var olmayan sokaklar içeriyor.

**Tutarsız modelin faturası bozulma altında kesiliyor.** Yüz hamlede bir sapmayla geçerli rota oranı 0,99'dan 0,69'a, on hamlede bir sapmayla 0,08'e iniyor; tutarlı harita kuran model aynı koşullarda 1,00'de kalıyor.

**Eğitim dağılımı, bu soruda ölçekten daha belirleyici çıktı.** Aynı boydaki iki modelden amaçsız yürüyüşleri görmüş olan, en kısa yolları görmüş olandan hem ölçütlerde hem sağlamlıkta daha iyi.

**Açık dünya modeli bir bileşen, örtük dünya modeli bir hipotezdir.** Birincisi eğitilebilir, içinde plan yapılabilir ve doğrudan sınanabilir; ikincisi ancak davranıştan çıkarsanır. İkisi aynı sözcükle anılsa da aynı iddia değildir.

**Ve bir model, üzerinde arama yapıldığında kusurlarını ele verir.** Hayalî çevrede eğitilen ajanın modelin açıklarını sömürmesi, 13\. makaledeki aşırı optimizasyonun aynı biçimidir: bir vekil ne kadar iyi olursa olsun, yeterince aranırsa kırılır.

Çerçevenin kendi sınırını da yazmak gerekiyor, çünkü dar. İki ölçüt, ardındaki gerçekliğin **belirlenimci ve sonlu durumlu** olmasını varsayıyor: bir harita, bir oyun tahtası, bir bulmaca. Böyle bir yapıda "aynı duruma götüren önekler" kümesi tanımlıdır ve sorgulanabilir. Fiziğin, bir sohbetin ya da bir kurumun durumu ise ne sonludur ne belirlenimcidir, ve orada aynı ölçütü uygulamak için önce neyin durum sayılacağına karar vermek gerekir — ki bu karar zaten tartışmanın kendisidir. Yani elimizdeki şey genel bir sınav değil, sınavın **nasıl tasarlanacağının** bir örneği: doğru soru "bir sonraki adım geçerli mi" değil, "hangi geçmişler aynı sayılmalı".

Son olarak açtığımız soruya dönelim, çünkü kapanmadı. Bu ölçümler "bu sistemler dünyayı anlıyor mu" sorusunu çözmüyor; çözdükleri şey, o tartışmada **neyin kanıt sayılacağı**. Artık bir tarafın "sonda tahtayı okuyabiliyor" demesi tek başına yetmiyor, çünkü aynı modelin kurduğu haritanın yanlış olduğu gösterilebiliyor. Öteki tarafın "yalnızca biçimle eğitildi, o hâlde hiçbir şey kuramaz" demesi de yetmiyor, çünkü ölçütler modelden modele farklı çıkıyor ve fark yöntemin kendisinden değil verinin kapsamından geliyor. Tartışmanın ilerlediği yer burası: ilkeden sonuca değil, ölçümden sonuca.

### Sırada ne var

Bu makale dünya modelini bir ölçüm sorusu olarak kurdu ve sınavları metin ile çizge üzerinde yaptı. Ama her iki alanda da dünya, dizilerin içinde duruyordu; hata yapmanın bedeli bir ölçüt puanıydı. Bir sonraki makale sınavı en zor hâline taşıyor: modeli bir gövdeye bağlamak. Orada durum bir kavşak değil bir konum, eylem bir token değil bir tork, ve yanlış tahminin bedeli geri alınamıyor. Bir dil modelinin öğrendikleri o dünyada ne kadar işe yarar, ve gerçek bir gövdenin verisi neden bu kadar az?

## Kaynakça

- Bender, E. M. & Koller, A. (2020). *Climbing towards NLU: On Meaning, Form, and Understanding in the Age of Data*. ACL 2020. [Bağlantı](https://aclanthology.org/2020.acl-main.463/)
- Ha, D. & Schmidhuber, J. (2018). *Recurrent World Models Facilitate Policy Evolution*. NeurIPS 2018. [Bağlantı](https://papers.nips.cc/paper_files/paper/2018/hash/2de5d16682c3c35007e4e92982f1a2ba-Abstract.html)
- Hafner, D., Pasukonis, J., Ba, J. & Lillicrap, T. (2025). *Mastering Diverse Control Tasks Through World Models*. Nature, 640(8059), s. 647–653. [Bağlantı](https://doi.org/10.1038/s41586-025-08744-2)
- Li, K., Hopkins, A. K., Bau, D., Viégas, F., Pfister, H. & Wattenberg, M. (2023). *Emergent World Representations: Exploring a Sequence Model Trained on a Synthetic Task*. ICLR 2023. [Bağlantı](https://openreview.net/forum?id=DeG07_TcZvT)
- Vafa, K., Chen, J. Y., Rambachan, A., Kleinberg, J. & Mullainathan, S. (2024). *Evaluating the World Model Implicit in a Generative Model*. NeurIPS 2024. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/2f6a6317bada76b26a4f61bb70a7db59-Abstract-Conference.html)
