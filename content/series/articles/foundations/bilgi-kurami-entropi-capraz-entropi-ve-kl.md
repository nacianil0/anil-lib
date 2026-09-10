---
article_id: article_6c52dde2-0990-4801-b79f-3f4bdf66cdb8
title: "Bilgi Kuramı: Entropi, Çapraz Entropi ve KL"
slug: bilgi-kurami-entropi-capraz-entropi-ve-kl
category: foundations
level: advanced
reading_order: 94
summary: "9'da kayıp eğrilerini nat/token cinsinden okumuştuk; bu makale o birimin ne saydığını gösteriyor. Şaşkınlık eksi logaritmadır, entropi şaşkınlığın beklentisidir ve çapraz entropi tam olarak ikiye ayrılır: verinin kendi belirsizliği artı modelin fazladan ödediği ceza. Bu ayrım 13'te işleviyle kullandığımız KL ıraksamasının biçimsel kurulumudur ve borç burada kapanıyor. Perplexity kaybın üsteli, yani 'kaç eşit olasılıklı seçenek kadar' sorusunun cevabı; Kaplan ile Chinchilla arasındaki 0,114 nat/token farkı yaklaşık yüzde 12 perplexity farkına karşılık geliyor. Kayıp aynı zamanda sıkıştırma oranıdır: Chinchilla 70B, ImageNet parçalarını yüzde 43,4'e indirip PNG'yi geçiyor. KL simetrik değil ve bu bir bütçe kuruyor: n adaydan en iyisini seçmenin bedeli log n eksi (n eksi 1) bölü n nat."
tags:
  - entropi
  - capraz-entropi
  - kl-iraksamasi
  - perplexity
  - sikistirma
content_hash: sha256:a61743a26f09af80c0c3019a0116f4f8f0ab9ab8c64a3c5d8708e43d331c39b3
classification_version: 1
classification_batch: 22
---
## Kaybın bir birimi var

93\. makalede kaybın nereden geldiğini kurduk: veriyi en olası kılan parametreleri arıyoruz ve olabilirliğin negatif logaritmasını en küçültüyoruz. 9\. makalede ise kayıp eğrilerini okurken bir birim kullanmıştık — nat/token.

Birimi olan her büyüklük bir şeyi sayar. Metre uzunluk sayar, saniye süre sayar. Peki nat neyi sayar?

Bu makalenin işi tek cümle: **kaybın ne saydığını göstermek ve o sayının tam olarak ikiye ayrıldığını kanıtlamak** — bir parçası verinin kendi belirsizliği, öbür parçası modelin fazladan ödediği ceza. İkinci parçanın adını 13\. makaleden biliyoruz: KL ıraksaması. Orada "biçimsel kurulumu seride ileride yapılacak" demiştik; borç burada kapanıyor.

## Şaşırmanın ölçüsü

Claude Shannon'ın 1948 tarihli çalışması, iletişimi bir olasılık problemi olarak kurar ve bir sorunun cevabını arar: bir mesajı kodlamak için ortalama kaç ikili karar gerekir?

Tek bir sonucun taşıdığı bilgiyi ölçmekle başla. Kesin olan bir sonuç sana hiçbir şey öğretmez; nadir olan bir sonuç çok şey öğretir. Bu iki koşulu sağlayan en sade işlev olasılığın negatif logaritmasıdır. Olasılığı 1 olan sonucun şaşkınlığı sıfır, olasılığı küçüldükçe şaşkınlık büyür.

Bir dağılımın **entropisi** (entropy), şaşkınlığın beklentisidir — yani her sonucun şaşkınlığı, o sonucun olasılığıyla ağırlıklandırılıp toplanır. 93\. makalede beklentiyi tanımlamıştık; entropi onun ilk ciddi kullanımı.

Sayı yapalım. Üç sonuçlu bir dağılım al: olasılıkları 0,5 · 0,25 · 0,25. İkilik logaritmayla şaşkınlıklar 1 · 2 · 2 bit. Entropi 0,5 çarpı 1 artı 0,25 çarpı 2 artı 0,25 çarpı 2 eşittir **1,5 bit**. Yorumu somut: bu kaynaktan gelen sonuçları en verimli biçimde kodlarsan, sonuç başına ortalama 1,5 ikili karar harcarsın.

Bu biçim keyfî bir seçim de değil. Shannon üç makul koşul yazıyor — ölçü olasılıklarda sürekli olmalı, eşit olasılıklı seçenek sayısı arttıkça artmalı, ve bir seçim iki ardışık seçime bölündüğünde ölçü parçaların ağırlıklı toplamına eşit çıkmalı — ve makalesinin ikinci teoremi bu üç koşulu sağlayan tek işlevin, olasılıkların logaritmalarıyla ağırlıklandırılmış toplamı olduğunu kanıtlıyor. Yani entropi, "belirsizlik" için akla gelen ölçülerden biri değil; üç koşulu birden isteyen için tek ölçü.

Birim seçimi bir hesap ayrıntısı. İkilik logaritma kullanırsan birim bit, doğal logaritma kullanırsan **nat** olur. Seride kayıp eğrileri nat cinsindendi; bu makalede sezgi için bit, model hesapları için nat kullanacağız.

## Yanlış kod kitabıyla yazmak

Şimdi asıl soruya gel. Gerçek dağılım p, ama elindeki model q. Kodlamayı q'ya göre yapıyorsun, sonuçlar ise p'den geliyor. Ortalamada kaç bit harcarsın?

Bu sayının adı **çapraz entropi** (cross-entropy): her sonucun q'ya göre şaşkınlığı, p'nin olasılıklarıyla ağırlıklandırılıp toplanır. Dikkat: iki dağılım iki ayrı rol oynuyor. Ağırlıklar gerçekten olan şeyden, şaşkınlıklar modelin inancından geliyor.

Aynı p ile devam edelim ve modelimiz q'nun olasılıkları 0,8 · 0,19 · 0,01 olsun. Çapraz entropi: 0,5 çarpı log₂(1÷0,8) artı 0,25 çarpı log₂(1÷0,19) artı 0,25 çarpı log₂(1÷0,01) — yani 0,161 artı 0,599 artı 1,661 eşittir **2,421 bit**.

Entropi 1,5 idi, çapraz entropi 2,421. Aradaki 0,921 bit nereden geliyor? Modelin yanlışlığından. Bu farkın adı **KL ıraksaması** ve tanımı tam olarak budur: çapraz entropi eksi entropi. Solomon Kullback ile Richard Leibler'ın 1951 tarihli çalışması bu büyüklüğü istatistiksel ayırt edilebilirlik ölçüsü olarak kurar.

Üç sonucu birlikte oku, çünkü bu makalenin omurgası bu üç cümlede:

Birincisi, çapraz entropi hiçbir zaman entropiden küçük olamaz. Yani KL sıfır ya da pozitiftir ve yalnızca q ile p tıpatıp aynıysa sıfırdır. Eğitimin ulaşabileceği en düşük kayıp, verinin kendi entropisidir.

İkincisi, kayıp iki parçaya ayrılır ve **yalnızca ikincisi düşürülebilir**. Birinci parça veriden gelir; hiçbir model onu azaltamaz. 2\. makaledeki indirgenemez hata kavramının bilgi kuramındaki karşılığı budur. 9\. makalede bu terimi sayıyla da görmüştük: Chinchilla ekibinin veriye uyarladığı kayıp formülünde 1,69 nat/token'lık sabit bir taban vardı ve o tabanın altına inen bir model yoktu. Formülün üç teriminden biri neden sabit diye sorulduğunda cevap işte bu: o terim modelin değil, dilin kendisinin payı.

Üçüncüsü, "modelim ne kadar iyi" sorusunun cevabı ham kayıp değil, kaybın entropiye olan uzaklığıdır. Ama entropiyi bilmiyoruz — bilseydik zaten problemi çözmüş olurduk.

![Tek bir hesabın üç satırda gösterimi. Üstte iki dağılım verilir: gerçek dağılım p'nin olasılıkları 0,5 ve 0,25 ve 0,25; modelin dağılımı q'nun olasılıkları 0,8 ve 0,19 ve 0,01. Birinci satır entropi H(p) eşittir 1,500 bit ve yanında bu terimin veriden geldiği, hiçbir modelin onu azaltamayacağı yazılıdır. İkinci satır çapraz entropi H(p,q) eşittir 2,421 bit ve yanında ağırlıkların p'den, şaşkınlıkların q'dan geldiği yazılıdır. Üçüncü satır KL ıraksaması eşittir 0,921 bit ve yanında bu terimin modelden geldiği, eğitimin düşürebildiği tek parça olduğu yazılıdır. Altta bir kutu içinde toplamın kendisi durur: kayıp eşittir verinin belirsizliği artı modelin fazladan ödediği ceza, sayılarla 1,500 artı 0,921 eşittir 2,421 bit. En altta iki kayıt vardır: KL hiçbir zaman negatif olamaz ve yalnızca iki dağılım tıpatıp aynıysa sıfırdır; ve sayılar bu iki dağılımdan elle hesaplanmıştır.](assets/kaybin-iki-parcasi.svg "Şekil 1 — Kaybın hangi parçası veriden, hangisi modelden")

Şekil 1 hesabı tek bakışta veriyor: aynı üç sayı üst üste, hangi terimin nereden geldiğiyle birlikte. Bu ayrım bir muhasebe hilesi değil; eğitimin ne yapabildiğini ve ne yapamayacağını ayıran çizgi.

> **Kendini yokla:** Eğitim kaybı düşmeye devam ediyorsa modelin gerçek dağılıma yaklaştığını söyleyebilir miyiz?

Hayır — kaybın hangi parçasının düştüğünü bilmeden söyleyemeyiz. Eğitim kaybı, eğitim kümesinin ampirik dağılımına göre hesaplanır ve o dağılım gerçek dağılım değildir. Ezberleyen bir model, eğitim kümesinde KL'yi sıfıra yaklaştırırken gerçek dağılıma göre KL'sini büyütebilir; 2\. makaledeki aşırı öğrenmenin bilgi kuramındaki ifadesi budur.

## Neden tam olarak bu kayıp

Şimdi üç adı birleştirelim. Bir dil modelinin eğitiminde "gerçek dağılım" gözlenen token'ın kendisidir: o token'a 1, kalan bütün sözlüğe 0. Böyle bir dağılımla çapraz entropiyi hesaplarsan bütün terimler düşer ve geriye tek bir sayı kalır — **doğru token'ın olasılığının negatif logaritması**.

Yani şu üçü aynı sayıdır: en büyük olabilirlik ilkesinin negatif logaritması, çapraz entropi kaybı ve doğru token'ın şaşkınlığı. Seride üçünü de kullandık; farklı adlar, tek nesne.

Buradan **perplexity**'ye tek adım kaldı. 5\. makalede perplexity'yi "şaşkınlık ölçüsü" diye tanıtmıştık; biçimsel tanımı kaybın üsteli. Terimi bu anlamda ilk kullanan çalışma Frederick Jelinek ve arkadaşlarının 1977 tarihli konuşma tanıma bildirisidir.

Örnek: model doğru token'a 0,2 olasılık veriyorsa kayıp eksi doğal logaritma 0,2 eşittir 1,609 nat; perplexity e üzeri 1,609 eşittir 5. Beş sayısı 1 bölü 0,2'nin ta kendisi ve okuması şu: model, o adımda beş eşit olasılıklı seçenek arasından seçim yapıyormuş gibi belirsiz.

![Kayıptan perplexity'ye çeviriyi gösteren bir tablo. Sütunlar: kayıp nat bölü token, perplexity ve okuma. Birinci satır 1,609 nat için perplexity 5,0 ve okuması doğru token'a 0,2 olasılık verilmiş demektir. İkinci satır 2,051 nat için perplexity 7,78 ve okuması Kaplan tahsisiyle eğitilen modelin kaybıdır. Üçüncü satır 1,937 nat için perplexity 6,94 ve okuması aynı bütçenin Chinchilla tahsisiyle ulaştığı kayıptır. Altta bir kayıt: iki kayıp arasındaki 0,114 nat bölü token farkı, perplexity'de yaklaşık yüzde 12'lik bir farka karşılık gelir ve bu oran iki üstelin bölünmesiyle elle hesaplanmıştır. En altta ikinci bir kayıt: kayıp toplanır, perplexity çarpılır; bu yüzden küçük kayıp farkları perplexity'de büyük görünür.](assets/kayiptan-perplexitye.svg "Şekil 2 — Aynı bilgi, iki ölçek")

Şekil 2 çeviriyi üç satırda gösteriyor. Ortadaki iki satır 9\. makaledeki ölçek tartışmasından: Jordan Hoffmann ve arkadaşlarının NeurIPS 2022'de yayımladığı çalışmanın uyarladığı kayıp formülüyle, aynı hesap bütçesinin iki farklı tahsisi 2,051 ve 1,937 nat/token veriyordu. Aradaki 0,114 nat/token küçük görünüyor; perplexity karşılıkları 7,78 ve 6,94, yani yaklaşık **yüzde 12** fark (bu oranı iki üsteli bölerek biz hesapladık). Sebep basit: kayıp toplanır, perplexity çarpılır.

## İngilizcenin entropisi ve sıkıştırma

Shannon'ın kendisi bu araçları hemen dile uyguladı. 1951 tarihli çalışması, insanlara metnin bir sonraki harfini tahmin ettirerek İngilizcenin entropisini kestirdi ve şu sonuca vardı: uzun menzilli bağıntılar (yüz harfe kadar) hesaba katıldığında entropi harf başına yaklaşık bir bit mertebesine, fazlalık ise kabaca yüzde 75'e iniyor. Thomas Cover ve Roger King'in 1978'de IEEE Transactions on Information Theory'de yayımladığı çalışma, tahmin yerine bahis kullanan yakınsak bir yöntemle bunu yaklaşık 1,3 bit/simge olarak ölçtü.

Peter Brown ve arkadaşlarının 1992'de Computational Linguistics'te yayımladığı çalışma yöntemi tersine çevirdi ve bizim için en öğretici olanı yaptı: bir kelime üçlü modeli kurup **bu modelin metne göre çapraz entropisini** hesapladılar. Bulunan sayı 1,75 bit/karakter. Cümlenin tamamını oku: çapraz entropi hiçbir zaman entropiden küçük olamayacağına göre, herhangi bir modelin ölçülen kaybı gerçek entropinin bir **üst sınırıdır**. Yani "daha iyi bir dil modeli" demek, "daha sıkı bir üst sınır" demek.

Bu bakış modern ölçekte de ölçüldü. Grégoire Delétang ve arkadaşlarının ICLR 2024'te sunduğu çalışma özdeşliği açıkça kuruyor: log-kaybı en küçültmek, aritmetik kodlamayla kayıpsız sıkıştırma oranını en küçültmekle aynı şey. Sayılar da çarpıcı: metin üzerinde eğitilmiş Chinchilla 70B, ImageNet görüntü parçalarını özgün boyutunun yüzde 43,4'üne, LibriSpeech ses örneklerini yüzde 16,4'üne indiriyor — PNG'nin yüzde 58,5'i ve FLAC'ın yüzde 30,3'ü karşısında. (Çalışma model boyutunu sıkıştırılmış boyuta katmadığında böyle; kattığında tablo tersine dönüyor.)

Buradaki parantez önemli, çünkü ölçünün sınırını çiziyor. Sıkıştırma oranını hesaplarken sıkıştırıcının kendisini de saymak gerekir: bir gzip programı birkaç kilobayttır, 70 milyar parametreli bir model ise yüz gigabayt mertebesinde. Bir gigabaytlık veriyi sıkıştırırken model boyutunu koda katarsan tablo tersine döner ve klasik sıkıştırıcılar öne geçer. Yani "dil modeli en iyi sıkıştırıcıdır" cümlesi, ancak modelin bedeli sayılmadığında doğru.

Sıkıştırma ile yetenek arasındaki bağ ise ölçülmüş bir ilişki. Yuzhen Huang ve arkadaşlarının COLM 2024'te sunduğu çalışma, 31 açık modeli aynı dış metinler üzerinde sıkıştırıcı olarak çalıştırıp 12 ölçütteki ortalama puanlarıyla karşılaştırıyor ve neredeyse doğrusal bir ilişki buluyor: bilgi, kod ve matematik alanlarının her birinde Pearson katsayısı yaklaşık eksi 0,95. İşaretin negatif olması beklenen yönde — daha küçük sıkıştırma oranı daha iyi model demek. Yine de bunun bir bağıntı olduğunu ve kuramsal bir eşitlik iddiası taşımadığını not etmek gerekiyor; çalışma da bunu kendi sınırı olarak yazıyor.

Bir uyarıyla kapatalım. Perplexity token başına tanımlıdır ve 15\. makalede gördüğümüz gibi token'lama modelden modele değişir. İki modelin perplexity'sini karşılaştırmak, ancak aynı token'lamayı kullanıyorlarsa anlamlıdır; farklı token'lamalarda karşılaştırılabilir olan şey karakter ya da bayt başına ölçülen sayıdır.

Bu uyarının pratik çözümü de aynı yerden çıkıyor. Bir metnin bayt sayısı token'lamadan bağımsızdır; dolayısıyla toplam kaybı token sayısına değil **bayt sayısına** bölersen elde ettiğin sayı modeller arasında karşılaştırılabilir olur. Alanın kullandığı ad bayt başına bit ve tanımı doğrudan: bir metni kodlamak için harcanan toplam bit, metnin bayt uzunluğuna bölünür. Sıkıştırma oranı da bunun başka bir yazılışıdır — sekiz bit bir bayt ettiğine göre, bayt başına 2 bit demek özgün boyutun yüzde 25'ine inmek demektir. Delétang ve arkadaşlarının yüzde 43,4 gibi sayıları tam olarak bu ölçekte veriliyor ve bu yüzden farklı modalitelerdeki sonuçları yan yana koyabiliyorlar.

Brown ve arkadaşlarının yöntemindeki incelik de burada. Ölçtükleri sayı modellerinin İngilizce hakkındaki bilgisinin bir özeti değil; **modelin metne göre çapraz entropisi**, yani modelin kendi kaybı. O kayıp gerçek entropiden büyük olduğu için üst sınır oluyor ve modeli iyileştiren herkes sınırı aşağı çekiyor. Aynı mantık modern ölçütlerde de geçerli: bir modelin ölçülen kaybı, dilin entropisi hakkında verdiğin en iyi üst sınırdır — alt sınır için kimsenin elinde bir yöntem yok.

## KL simetrik değildir ve bu bir bütçe kurar

Son ayrım en pratik olanı. KL bir uzaklık gibi görünür ama uzaklık değildir: p'den q'ya olan KL ile q'dan p'ye olan KL aynı sayı çıkmaz.

Aynı çiftle görelim. p'den q'ya KL 0,921 bit hesaplamıştık. Ters yönü hesaplayalım: q'nun entropisi 0,779 bit, q'dan p'ye çapraz entropi 1,200 bit, aradaki fark **0,421 bit**. Aynı iki dağılım, iki ayrı sayı — ve biri diğerinin iki katından fazla.

Fark yalnızca aritmetik değil, davranışsal. İleri yönde — gerçek dağılımı ağırlık, modeli şaşkınlık olarak alan yönde — model, p'nin kütle koyduğu hiçbir yeri boş bırakamaz; boş bıraktığı yerde logaritma patlar. Bu yön modeli **kütleyi örtmeye** zorlar. Ters yönde ise model kendi kütlesini nereye koyduğuna göre cezalandırılır; p'nin boş bıraktığı yerlere gitmemeyi öğrenir ama p'nin bazı tepelerini tümden ihmal edebilir. Bu yön modeli **tepe aramaya** zorlar.

Yuxian Gu ve arkadaşlarının ICLR 2024'te sunduğu çalışma bunu doğrudan bir yöntem kararına çeviriyor. 87\. makalede damıtmayı görmüştük: öğrenci öğretmenin dağılımına uyduruluyor. Standart damıtma ileri yönde çalışır ve öğrenci öğretmeni tam taklit edecek kapasitede değilse, öğretmenin neredeyse hiç kütle koymadığı bölgelere olasılık dağıtmayı öğrenir — pratikte düşük kaliteli metin. Yazarlar ters yönü kullanıyor ve gerekçeleri tam olarak bu.

Aynı asimetri 13\. makaledeki cezayı da açıklıyor. Orada politikanın referans modelden uzaklaşması KL ile ölçülüyordu. Şimdi o cezanın ne olduğunu tam söyleyebiliriz: politikanın ürettiği dağılıma göre ölçülen, referans modelden ayrışmanın nat cinsinden bedeli. Ve bedeli olan her şey bir bütçedir.

Bütçenin somut hâli var. Nisan Stiennon ve arkadaşlarının NeurIPS 2020'de yayımladığı çalışma, n aday üretip en yüksek puanlıyı seçmenin — 33\. ve 36\. makalelerdeki tanıdık kural — referans modelden ne kadar uzaklaştırdığını kapalı biçimde veriyor: logaritma n eksi (n eksi 1) bölü n nat. Sayılar: n 4 için 0,636; n 10 için 1,403; n 1.000 için 5,909; n 60.000 için 10,002 nat.

Bütçenin bir de kapalı çözümü var ve 93\. makaledeki üstel aileyi doğrudan geri getiriyor. Rafael Rafailov ve arkadaşlarının NeurIPS 2023'te sunduğu ve 13\. makalede kısayol olarak tanıştığımız çalışma şunu yazıyor: "ödülü en büyüt ama referans modelden KL cinsinden şu kadardan fazla uzaklaşma" probleminin en iyi çözümü, referans modelin her cevaba verdiği olasılığın, o cevabın ödülünün bütçe katsayısına bölünmüş üsteliyle çarpılıp yeniden normalleştirilmiş hâlidir. Biçime bak: üstel al, topla, böl. Softmax'ın ta kendisi — yalnızca logit'lerin yerinde ödül, sıcaklığın yerinde KL bütçesinin katsayısı duruyor. Tercih optimizasyonunun ödül modeli olmadan da yapılabilmesinin sebebi bu özdeşlik; 13\. makaledeki kısayol okunun matematiği burada.

![Üç panelli bir şekil. Sol panel aynı iki dağılımın iki yöndeki KL değerini verir: p'den q'ya 0,921 bit, q'dan p'ye 0,421 bit; altında aynı çiftin iki ayrı sayı verdiği yazılıdır. Orta panel iki yönün davranışını karşılaştırır: ileri yön modeli gerçek dağılımın kütle koyduğu her yeri örtmeye zorlar, ters yön ise modeli gerçek dağılımın tepelerine yerleşmeye zorlar ve bazı tepeleri ihmal edebilir. Sağ panel KL'yi bir bütçe olarak gösterir: n aday üretip en iyisini seçmenin bedeli logaritma n eksi (n eksi 1) bölü n nattır; n 4 için 0,636, n 10 için 1,403, n 1.000 için 5,909, n 60.000 için 10,002. En altta bir kayıt: KL bir uzaklık değildir, çünkü iki yön aynı sayıyı vermez; ve bütçe satırındaki değerler kaynağın verdiği kapalı biçimden elle hesaplanmıştır.](assets/kl-iki-yon.svg "Şekil 3 — Aynı çift, iki yön, iki sayı")

Şekil 3 üç okumayı bir arada veriyor. Leo Gao, John Schulman ve Jacob Hilton'un ICML 2023'te sunduğu çalışma bütçeyi bir eksen hâline getiriyor: ödül modeli üzerinden eniyileme yapıldıkça gerçek başarı önce yükselip sonra düşüyor ve eğrinin doğal ekseni KL'nin kendisi değil, **karekökü**. Yani KL'yi bir uzaklık gibi okumak istiyorsan karekökünü almalısın — çalışmanın bunu bir ön kestirim olarak yapıp sonradan on nat'a kadar doğrulaması, ölçünün seçiminin ne kadar önemli olduğunu gösteriyor.

> **Kendini yokla:** "Modelin referans modelden 6 nat uzaklaştı" cümlesi tek başına neden bir şey söylemez?

Çünkü KL bir yön taşır ve hangi dağılıma göre ortalama alındığını söylemeden sayı tanımsızdır. Üstelik 6 nat'ın ne kadar olduğu da bağlama bağlı: en iyi adayı bin adaydan seçmek zaten yaklaşık 5,9 nat harcıyor. Aynı sayı, bir yöntemde aşırı eniyileme işareti, başka bir yöntemde sıradan bir çalışma noktası olabilir.

### Sırada ne var

Dört makaledir aynı işi yapıyoruz: sezgiyle kurulmuş kavramları biçimsel düzeyde yeniden kuruyoruz. Uzayı, dönüşümü, dağılımı ve şimdi kaybın kendisini yerine oturttuk. Geriye o kaybı gerçekten **azaltan** mekanizma kaldı. 2\. makaleden beri "gradyan inişi" diyoruz ve 8\. makalede gerçek koşuların çizelgelerini okuduk; ama neden işe yaradığını, ne zaman yaramadığını ve modern eniyileyicilerin tam olarak neyi düzelttiğini hiç kurmadık. Bir sonraki makale oraya bakıyor.

## Kaynakça

- Shannon, C. E. (1948). *A Mathematical Theory of Communication*. Bell System Technical Journal 27, 379–423 ve 623–656. [Bağlantı](https://doi.org/10.1002/j.1538-7305.1948.tb01338.x)
- Shannon, C. E. (1951). *Prediction and Entropy of Printed English*. Bell System Technical Journal 30(1), 50–64. [Bağlantı](https://doi.org/10.1002/j.1538-7305.1951.tb01366.x)
- Kullback, S. & Leibler, R. A. (1951). *On Information and Sufficiency*. Annals of Mathematical Statistics 22(1), 79–86. [Bağlantı](https://doi.org/10.1214/aoms/1177729694)
- Cover, T. M. & King, R. C. (1978). *A Convergent Gambling Estimate of the Entropy of English*. IEEE Transactions on Information Theory 24(4), 413–421. [Bağlantı](https://doi.org/10.1109/TIT.1978.1055912)
- Brown, P. F., Della Pietra, S. A., Della Pietra, V. J., Lai, J. C. & Mercer, R. L. (1992). *An Estimate of an Upper Bound for the Entropy of English*. Computational Linguistics 18(1), 31–40. [Bağlantı](https://aclanthology.org/J92-1002/)
- Jelinek, F., Mercer, R. L., Bahl, L. R. & Baker, J. K. (1977). *Perplexity—a measure of the difficulty of speech recognition tasks*. Journal of the Acoustical Society of America 62(S1), S63. [Bağlantı](https://doi.org/10.1121/1.2016299)
- Delétang, G., Ruoss, A., Duquenne, P.-A., Catt, E., Genewein, T. ve ark. (2024). *Language Modeling Is Compression*. ICLR 2024. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/3cbf627fa24fb6cb576e04e689b9428b-Abstract-Conference.html)
- Huang, Y., Zhang, J., Shan, Z. & He, J. (2024). *Compression Represents Intelligence Linearly*. COLM 2024. [Bağlantı](https://openreview.net/forum?id=SHMj84U5SH)
- Hoffmann, J., Borgeaud, S., Mensch, A., Buchatskaya, E., Cai, T., Rutherford, E., de Las Casas, D., Hendricks, L. A., Welbl, J., Clark, A. ve ark. (2022). *An empirical analysis of compute-optimal large language model training*. Advances in Neural Information Processing Systems 35 (NeurIPS 2022). [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/c1e2faff6f588870935f114ebe04a3e5-Abstract-Conference.html)
- Gu, Y., Dong, L., Wei, F. & Huang, M. (2024). *MiniLLM: Knowledge Distillation of Large Language Models*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=5h0qf7IBZZ)
- Stiennon, N., Ouyang, L., Wu, J., Ziegler, D. M., Lowe, R., Voss, C., Radford, A., Amodei, D. & Christiano, P. (2020). *Learning to summarize with human feedback*. NeurIPS 2020. [Bağlantı](https://papers.nips.cc/paper_files/paper/2020/hash/1f89885d556929e98d3ef9b86448f951-Abstract.html)
- Rafailov, R., Sharma, A., Mitchell, E., Ermon, S., Manning, C. D. & Finn, C. (2023). *Direct Preference Optimization: Your Language Model is Secretly a Reward Model*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/a85b405ed65c6477a4fe8302b5e06ce7-Abstract-Conference.html)
- Gao, L., Schulman, J. & Hilton, J. (2023). *Scaling Laws for Reward Model Overoptimization*. ICML 2023. [Bağlantı](https://proceedings.mlr.press/v202/gao23h.html)
