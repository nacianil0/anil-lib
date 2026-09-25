---
article_id: article_4e58c1b7-62da-4a39-b0f1-8c37e29d5a61
title: "Bilimde Yapay Zekâ: Keşif Aracı Olarak LLM"
slug: bilimde-yapay-zeka-kesif-araci-olarak-llm
category: multimodal-and-future
level: advanced
reading_order: 113
summary: "35. makaledeki üretmek–doğrulamak asimetrisini laboratuvara taşır ve tek bir ölçütle dört vakayı sıralar: bir iddiayı üretmenin maliyeti ile doğrulamanın maliyeti arasındaki oran. Doğrulaması kör ve deneysel olan protein yapısında, doğrulayıcısı bir program olan matematikte, doğrulayanı bir insan olan sezgi kılavuzluğunda ve doğrulaması bir kimyagerin aylarını alan malzeme keşfinde ne olduğunu — hakemli itirazlarıyla birlikte — ölçer."
tags:
  - bilimde-yapay-zeka
  - dogrulama
  - tekrarlanabilirlik
  - malzeme-kesfi
  - hipotez-uretimi
content_hash: sha256:f5801841dc2749771b469ca5c08df121a2a9ef3010f8d4e2e9d60cf1dc230dca
classification_version: 1
classification_batch: 27
---
## Bilgi eskimiyor, henüz yok

112\. makale bir modelin bildiklerini güncel tutma sorusunu ölçtü. Orada bilgi vardı ve eskiyordu; soru onu nereye yazacağımızdı.

Şimdi bir adım daha zor bir yere gidiyoruz: bilginin henüz **olmadığı** yere. Bir dil modeli yeni bir protein yapısı, yeni bir kristal, yeni bir matematiksel yapı ya da yeni bir araştırma fikri önerdiğinde, onu güncel tutmak diye bir sorun yok. Sorun daha eski ve daha sert: bu iddianın doğru olduğunu kim söylüyor?

35\. makalede bunun çerçevesini kurmuştuk. Üretmek ile doğrulamak farklı maliyetlerdir ve bir arama düzeninin işe yarayıp yaramayacağı bu iki maliyetin oranına bağlıdır. Orada doğrulayıcı bir modeldi ve arama baskısı arttıkça kandırılabiliyordu. Bilimde doğrulayıcı bir model değil: bir deney, bir program, bir hakem ya da bir kimyagerdir.

Bu makalenin tezi tek cümle: **yapay zekânın bir bilimde ne kadar işe yaradığını belirleyen şey modelin gücü değil, o bilimde bir iddiayı üretmenin maliyeti ile doğrulamanın maliyeti arasındaki orandır.** Dört vakaya bakacağız ve dördü bu oranın dört ayrı değerinde duruyor.

## Doğrulama kör ve deneysel olduğunda

En temiz vaka protein yapısı tahmini, ve temiz olmasının sebebi modelin kendisi değil, alanın 1994'ten beri işlettiği bir düzen.

Yapı tahmini yarışması iki yılda bir toplanıyor. Deneysel olarak çözülmüş ama **henüz yayımlanmamış** yapılar seçiliyor; katılımcılara yalnızca amino asit dizisi veriliyor; tahminler gönderiliyor; sonra gerçek yapılar açıklanıp körlemesine puanlanıyor. 99\. makaledeki ön kaydın ve 102\. makaledeki bağımsız doğrulamanın kurumsallaşmış hâli — cevap anahtarı katılımcının elinde yok ve elde edildikten sonra değiştirilemiyor.

John Jumper ve arkadaşlarının *Nature*'da yayımladığı çalışmanın ölçüsü bu düzenin içinde okunmalı. On dördüncü turda 87 protein alanında, yöntemin omurga doğruluğunun ortancası 0,96 ångström; ikinci en iyi yöntemin ortancası 2,8 ångström. Güven aralıkları da veriliyor: birincisi 0,85–1,16, ikincisi 2,7–4,0. 101\. makalenin istediği biçimde — tek bir sayı değil, aralığıyla.

Burada dikkat edilmesi gereken şey sayının büyüklüğü değil, sayının **nereden geldiği**. Bir yapının doğruluğunu söyleyen şey bir model, bir hakem ya da bir oylama değil; kristalografi laboratuvarında çözülmüş, katılımcının göremediği bir gerçek. Üretmek pahalı — devasa bir model, devasa bir eğitim —, doğrulamak ise zaten yapılmış ve saklanmış. Oran, üretimin lehine olabilecek en uç noktada.

Bu koşulun nasıl oluştuğunu da söylemek gerekiyor, çünkü kendiliğinden oluşmadı. Modelin hem eğitim verisi hem cevap anahtarı, onlarca yıl boyunca deneysel olarak çözülüp açık bir veri tabanına biriktirilmiş yapılardan geliyor. 111\. makaledeki ayrımın kardeşi: orada metnin bir yan ürün olduğunu, yörüngenin olmadığını söylemiştik. Burada doğrulama altyapısı bir yan ürün değil — bilerek, kurumsal olarak ve on yıllar boyunca **peşin ödenmiş** bir altyapı. Bir alanda yapay zekânın parlaması, çoğu zaman o alanın kendi geçmişte ödediği faturanın görünür hâli.

## Doğrulayıcı bir program olduğunda

İkinci vaka matematik ve orada doğrulayıcı daha da katı: bir program.

Bernardino Romera-Paredes ve arkadaşlarının *Nature*'da yayımladığı çalışma, bir dil modelini bir **değerlendiriciyle** eşleştiriyor — 35\. makaledeki doğrulayıcının en katı hâli. Düzen şöyle: model çözümün kendisini değil, çözümü **üreten programı** yazıyor; program çalıştırılıyor; çıktısı bir puanlama işleviyle ölçülüyor; yüksek puan alanlar bir sonraki turda modele örnek olarak geri veriliyor. Yazarların kendi gerekçesi doğrudan 17\. makaleye bağlanıyor: dil modelleri makul görünen ama yanlış ifadeler üretiyor, ve değerlendirici tam olarak bunlara karşı bir kapı.

Sonuç ölçülebilir bir matematiksel nesne. Bir aşırı birleşimsel problemde, sekiz boyutta daha önce bilinenden büyük bir yapı bulunuyor: 512 elemanlı. Arama uzayının büyüklüğü bu başarının anlamını veriyor — sekiz boyut için kaba kuvvetle taranacak uzay 3¹⁶⁰⁰ mertebesinde. Ve asimptotik alt sınırda yirmi yılın en büyük iyileştirmesi yapılıyor.

Yöntemin asıl özelliği bulunan şeyin biçimi. Elde edilen şey 512 vektörlük bir liste değil, o listeyi **üreten bir program**; yazarlar programı okuyup basitleştirerek yapının neden çalıştığını elle de kurabiliyor. 77\. makaledeki atıf sorusunun burada bir karşılığı var: çıktı bir ağırlık kümesi değil okunabilir bir yordam olduğunda, "neden" sorusu cevaplanabilir hâle geliyor.

> **Kendini yokla:** Bu düzende dil modelinin uydurması neden zarar vermiyor?

Çünkü uydurma bir cevap değil, bir **aday** üretiyor ve adayı bir program eliyor. 35\. makalede doğrulayıcının arama baskısı altında kandırılabildiğini görmüştük; oradaki doğrulayıcı öğrenilmiş bir modeldi ve kendi hataları vardı. Burada doğrulayıcı öğrenilmiş bir şey değil: bir yapının tanımını kontrol eden sabit bir kod parçası. Tanımı doğru yazıldığı sürece ikna edilecek bir kanısı yok; kod hatalı yazılmışsa arama o hatayı da bulup sömürebilir, bu yüzden güvenin yükü değerlendiricinin doğruluğuna taşınıyor. Modelin başarısı üretim tarafında, güvenilirlik doğrulama tarafında duruyor ve ikisi birbirine karışmıyor.

## Doğrulayan bir insan olduğunda

Üçüncü vaka, modelin cevabı hiç vermediği vaka.

Alex Davies ve arkadaşlarının *Nature*'da yayımladığı çalışma, makine öğrenmesini bir kanıt aracı olarak değil, bir **sezgi aracı** olarak kullanıyor. Düzen üç adımda işliyor. Matematikçi iki nesne arasında bir ilişki olabileceğini tahmin eder. O ilişkiyi öğrenmesi için bir ağ eğitilir: eğer ağ rastlantıyla açıklanamayacak kadar iyi tahmin ediyorsa, aranmaya değer bir yapı vardır. Sonra 77\. makaledeki atıf araçlarından biriyle — girdilerin hangisine duyarlı olduğunu ölçen gradyan tabanlı bir yöntemle — ilişkinin hangi büyüklüklerden geçtiği daraltılır.

Düğüm kuramındaki örnek yöntemin tamamını gösteriyor. Bir düğümün cebirsel bir niceliğinin, geometrik nicelikleriyle tahmin edilebildiği görülüyor; atıf yöntemi bunun üç geometrik büyüklükten geçtiğini söylüyor; yalnızca o üç büyüklükle eğitilen ikinci bir ağ neredeyse aynı doğruluğu veriyor. Buradan bir sanı kuruluyor ve **kanıtlanıyor**.

Kanıt kimde? Matematikçide. Modelin ürettiği hiçbir şey sonucun kanıtı değil; model yalnızca nereye bakılacağını söyledi. Doğrulama maliyeti burada yüksek — bir teorem kanıtlamak aylar sürer — ama üretim tarafı da buna göre daraltılmış: model bir iddia değil, bir yön üretiyor.

Aynı çalışmanın ikinci alanı bu ayrımı daha da keskinleştiriyor. Temsil kuramındaki açık bir sanı üzerinde elde edilen sonuç bir teorem değil, o sanının öngördüğü bir **aday algoritma**. Yani iki uygulamanın biri kanıtla kapanıyor, öteki kapanmıyor ve kapanmadığı da böyle yazılıyor. Bir aracın çıktısının ne olduğu — teorem mi, sanı mı, aday mı — yazıldığı sürece sorun değil; sorun, üçünün aynı cümlede aynı ağırlıkla sunulması.

Bu üç vakanın ortak bir özelliği var ve dördüncüsünden ayrıldıkları yer tam orası: üçünde de doğrulama, üretimden **önce** hazırdı. Yarışmanın cevap anahtarı çözülmüş ve saklanmıştı; puanlama programı yazılıydı; matematikçi zaten oradaydı ve sanıyı kanıtlayacak aygıta sahipti. Doğrulamanın önceden var olması, üretimi ne kadar ölçeklersen ölçekle sonucun okunabilir kalmasını sağlıyor.

![Dört satırlı beş sütunlu bir tablo ve altında bir kutu. Üstte başlık: aynı soru, dört ayrı doğrulama maliyeti. Sütunlar vaka, modelin ürettiği, doğrulayan, doğrulamanın maliyeti ve geriye ne kaldı. Birinci satır protein yapısı: bir yapı tahmini üretir, doğrulayan önceden çözülmüş ama saklanmış deneysel yapıdır, maliyeti sıfırdır çünkü zaten yapılmıştır, geriye ortanca 0,96 ångströmlük omurga doğruluğu kalmıştır ve ikinci en iyi yöntem 2,8'dedir. İkinci satır matematikte program araması: çözümü üreten bir program üretir, doğrulayan sabit bir puanlama programıdır, maliyeti bir çalıştırmadır, geriye sekiz boyutta 512 elemanlı yeni bir yapı ve yirmi yılın en büyük asimptotik iyileştirmesi kalmıştır. Üçüncü satır sezgi kılavuzluğu: bir yön üretir, iddia üretmez; doğrulayan matematikçinin kanıtıdır; maliyeti aylardır; geriye kanıtlanmış bir teorem kalmıştır. Dördüncü satır vurguludur, malzeme keşfi: kararlı olduğu öngörülen kristal yapılar üretir, doğrulayan sentez ve kırınım analiziyle bir kimyagerdir, maliyeti hedef başına haftalar ve aylardır, geriye hakemli iki itiraz kalmıştır. Altta bir kutu durur: ölçüt modelin gücü değil, üretmenin maliyeti ile doğrulamanın maliyeti arasındaki orandır; ilk üç satırda doğrulama üretimden ucuz ya da kesindir, dördüncüde değildir. En altta bir kayıt: değerler sırasıyla Jumper, Romera-Paredes, Davies ve Merchant ile Szymanski ve arkadaşlarının çalışmalarından gelir.](assets/dogrulamanin-dort-maliyeti.svg "Şekil 1 — Belirleyici olan modelin gücü değil, oran")

Şekil 1'in dördüncü satırı ötekilerden ayrılıyor: orada doğrulama ne üretimden ucuz ne de kesin.

## Doğrulama pahalı olduğunda

Dördüncü vaka malzeme keşfi ve burada oran tersine dönüyor: bir kristal yapıyı öngörmek hesapla yapılıyor, sentezlemek ve gerçekten yeni olduğunu göstermek bir laboratuvarın aylarını alıyor.

Amil Merchant ve arkadaşlarının *Nature*'da yayımladığı çalışma öngörü tarafını ölçekliyor. Çizge ağlarıyla, termodinamik kararlılık sınırının — alandaki adıyla **dışbükey zarfın** (convex hull) — altında 2,2 milyon yapı buluyorlar; bunların 381 bini yeni kararlı kayıt olarak zarfa giriyor ve toplam 421 bine çıkıyor. Yazarlar 736 yapının bağımsız biçimde deneysel olarak elde edilmiş olduğunu da bildiriyor.

Aynı sayıda *Nature*'da yayımlanan ikinci çalışma sentez tarafını otomatikleştiriyor. Nathan Szymanski ve arkadaşlarının kurduğu robotik laboratuvar, hesaplama, literatür verisi ve aktif öğrenmeyi birleştirip on yedi gün kesintisiz çalışıyor. Çalışmanın 2023'teki ilk hâli bu sürede 58 hedeften 41 yeni bileşik elde edildiğini bildiriyordu. Aşağıdaki itirazların ardından Ocak 2026'da bir yazar düzeltmesi yayımlandı; makalenin bugünkü özeti 57 hedeften 36 bileşik diyor ve başlığı artık "yeni" değil "inorganik" malzemelerden söz ediyor. Sayımın bu kadar oynaması tartışmanın kendisinin bir parçası; eleştiri de bu yüzden ürünlerin tamamını tek tek sayarak ilerliyor.

Şimdi hakemli itiraz. Ve iki tane var.

Anthony Cheetham ile Ram Seshadri'nin *Chemistry of Materials*'ta yayımlanan değerlendirmesi öngörü tarafını ele alıyor. Sonuçları tek cümlede: yenilik, inandırıcılık ve kullanışlılık üçlüsünü birden karşılayan bileşikler için **kayda değer bir kanıt bulamıyorlar**. Yöntemin umut verici olduğunu da yazıyorlar; itirazları iddianın kendisine.

Josh Leeman ve arkadaşlarının *PRX Energy*'de yayımlanan incelemesi sentez tarafını ele alıyor ve daha sert. Otonom laboratuvarın 43 sentez ürününün tamamını inceleyip dört ortak analiz kusuru gösteriyorlar; vardıkları sonuç şu: o çalışmada **hiçbir yeni malzeme keşfedilmemiş**.

Kusurun mekanizması bu makale için asıl önemli olan şey, çünkü bir dikkatsizlik değil. Öngörülen bileşiklerin hepsinde her element kendi ayrı kristalografik konumunda duruyor — yani **düzenli** bir yapı öngörülüyor. Gerçek katılarda elementler çoğu zaman aynı konumu paylaşır; bunun adı bileşimsel **düzensizlik** ve sonucu daha yüksek simetrili bir yapıdır. Leeman ve arkadaşları, başarılı sayılan malzemelerin üçte ikisinin, öngörülen düzenli bileşiğin zaten bilinen düzensiz karşılıkları olmasının muhtemel olduğunu yazıyor. İkinci kusur ölçüm tarafında: toz kırınımı verisinin otomatik çözümlenmesi — kristalografideki adıyla Rietveld uyarlaması — henüz güvenilir değil.

Bu iki cümle 110\. makalenin ölçütünü laboratuvara taşıyor. Orada bir modelin kurduğu haritanın var olmayan sokaklar içerebildiğini görmüştük; burada öngörü hattının durum uzayı gerçek durumu **içermiyor**: düzensiz bir katı, modelin arama uzayında temsil edilebilir bir nesne değil. Model yanlış cevap vermiyor; sorduğu soru dünyanın sorusu değil.

![İki bölmeli şekil. Üstte iki sütunlu dört satırlı bir tablo; sütunlar iddia ve hakemli itiraz. Birinci satır: dışbükey zarfın altında 2,2 milyon yapı ve 381 bin yeni kararlı kayıt; karşısında yenilik, inandırıcılık ve kullanışlılık üçlüsünü birden karşılayan bileşikler için kayda değer kanıt bulunamadığı yazar. İkinci satır: on yedi günde 57 hedeften 36'sının sentezlenmesi; karşısında 43 sentez ürününün tamamının incelendiği ve hiçbir yeni malzemenin keşfedilmediği sonucu yazar. Üçüncü satır vurguludur, neden: öngörülen bileşiklerde her element ayrı bir kristalografik konumda durur; karşısında gerçek katılarda elementlerin aynı konumu paylaştığı, bunun daha yüksek simetri verdiği ve başarılı sayılanların üçte ikisinin bilinen düzensiz karşılıklar olmasının muhtemel olduğu yazar. Dördüncü satır ölçüm: toz kırınımı verisinin otomatik çözümlenmesi; karşısında bu çözümlemenin henüz güvenilir olmadığı yazar. Altta bir kutu durur: modelin yanlış cevap vermediği, sorduğu sorunun dünyanın sorusu olmadığı; düzensiz bir katının arama uzayında temsil edilebilir bir nesne olmadığı ve bunun 110’un ölçütünün laboratuvardaki hâli olduğu yazılıdır. En altta bir kayıt: sol sütun Merchant ve Szymanski ve arkadaşlarının, sağ sütun Cheetham ile Seshadri'nin ve Leeman ve arkadaşlarının yayımlanmış değerlendirmeleridir.](assets/iddia-ve-hakemli-itiraz.svg "Şekil 2 — Aynı sonuç, iki taraftan okunuşu")

Şekil 2'nin üçüncü satırı iki tarafı birbirine bağlıyor: itiraz bir suçlama değil, bir **mekanizma** öneriyor ve o mekanizma sınanabilir.

İki tarafın da hakkını vermek gerekiyor. Öngörü hattı gerçek bir şey üretti: 736 yapının bağımsız biçimde elde edilmiş olması, kayda değer bir kesişim. İtirazlar bu sayıyı reddetmiyor; itirazları "kararlı öngörüldü" ile "yeni bir malzeme keşfedildi" arasındaki mesafeye. Ve o mesafe tam olarak doğrulama maliyetinin durduğu yer.

O mesafeyi bir kez de sayıyla görmek gerekiyor; girdilerin ikisi de yukarıdaki paragraflarda duruyor ve bölme bize ait. Otonom laboratuvar on yedi günde 36 hedefi sentezledi: günde yaklaşık 2,1 sentez. Aynı hızla çalışan tek bir laboratuvar, öngörülen 381 bin yeni kararlı kaydı denemek için 381.000 ÷ 2,1 ≈ 180 bin gün, yani **yaklaşık 500 yıl** çalışırdı. Sayı büyüklük mertebesi olarak okunmalı — kimse bütün kayıtları sentezlemeye kalkışmıyor — ama makasın yönünü tartışmasız gösteriyor: öngörü hattı bir gecede ölçeklendi, doğrulama hattı ölçeklenmedi.

> **Kendini yokla:** Bu makas neden yalnızca bir hız sorunu değil?

Çünkü hangi kaydın denenmeye değer olduğunu seçmek de doğrulamanın parçası ve o seçim de aynı hatta sıkışmış. Doğrulama hattı yavaş olduğunda ne olduğu 16\. ve 71\. makalelerin konusuydu: ölçülemeyen iddialar ölçülenlerin yanında aynı ağırlıkla durmaya başlar. Burada fark şu ki eleme kimsenin elinde değil — 381 bin kayıt yayımlandığında, hangisinin gerçekten yeni olduğu sorusu tek tek cevaplanmayı bekleyen 381 bin ayrı soru hâline geliyor. Hakemli iki itirazın yaptığı iş de zaten bu: küçük bir alt kümeyi elle tek tek inceleyip genele dair bir şey söylemek.

## Üretim ucuzlayınca ne oluyor

Son bir soru kalıyor ve dört vakanın hepsini ilgilendiriyor: üretim tarafı ucuzladığında ne oluyor?

Chenglei Si, Diyi Yang ve Tatsunori Hashimoto'nun ICLR 2025'te sunduğu çalışma bunu doğrudan ölçüyor. Yüzden fazla araştırmacı işe alınıyor; bir kısmı kendi araştırma fikirlerini yazıyor, bir kısmı hem insan hem model fikirlerini **kör** olarak değerlendiriyor; fikirlerin biçimi ve üslubu değerlendirme öncesi standartlaştırılıyor. Sonuç istatistiksel olarak anlamlı: model fikirleri yenilik ekseninde insan uzmanların fikirlerinden daha yüksek puan alıyor (p < 0,05), uygulanabilirlik ekseninde biraz daha düşük.

Ama çalışmanın asıl öğretici bulgusu puanlarda değil, üretim tarafında. Model her konu başlığı için 4.000 aday fikir üretiyor; benzerlik eşiğiyle tekilleştirildiğinde geriye üretilenlerin yalnızca yaklaşık yüzde 5'i kalıyor. Yani dört bin fikir üretmek iki yüz farklı fikir demek. Ve ikinci bulgu ilkini tamamlıyor: modelin kendi fikirlerini değerlendirmesi güvenilir çıkmıyor — 35\. makaledeki öz-düzeltme sınırının araştırma fikri düzeyindeki hâli.

Lisa Messeri ile M. J. Crockett'in *Nature*'da yayımladığı değerlendirme aynı noktayı bir risk olarak adlandırıyor. Bu bir ölçüm çalışması değil, bir çerçeve önerisi ve öyle okunmalı; ama önerdiği çerçeve buradaki sayılarla uyumlu. Yazarlara göre yapay zekâ araçlarının cazibesi üretkenlik ve nesnellik vaadinden geliyor; riski, bizi dünyayı gerçekte anladığımızdan daha çok anladığımıza inandıran bir **anlama yanılsaması**. Ve bunun toplu sonucu bilimsel tek kültür: belirli yöntemlerin, soruların ve bakış açılarının ötekileri bastırması. Kapanış cümleleri makalenin tezini bir kez daha söylüyor: daha çok ürettiğimiz ama daha az anladığımız bir evre riski.

![İki bölmeli şekil. Üstte üç satırlı iki sütunlu bir tablo; sütunlar ölçülen ve sonuç. Birinci satır yenilik: model fikirleri insan uzmanların fikirlerinden yüksek puan alıyor, p değeri 0,05'in altında. İkinci satır uygulanabilirlik: model fikirleri biraz daha düşük. Üçüncü satır vurguludur, üretimin çeşitliliği: konu başına 4.000 aday fikirden benzerlik eşiğiyle tekilleştirme sonrası geriye yaklaşık yüzde 5 kalıyor. Altta iki kutu yan yana durur. Sol kutunun başlığı ucuzlayan taraf; içinde adayın sınırsıza yakın olduğu, bir konu başlığı için dört bin fikrin bir gecede üretilebildiği yazılıdır. Sağ kutunun başlığı ucuzlamayan taraf; içinde modelin kendi fikirlerini güvenilir biçimde değerlendiremediği, körlemesine insan değerlendirmesinin yüzden fazla araştırmacı gerektirdiği ve bir fikrin gerçekten işe yarayıp yaramadığının ancak yürütülerek anlaşıldığı yazılıdır. En altta bir kayıt: bütün değerler Si, Yang ve Hashimoto'nun ölçümüdür.](assets/uretim-ucuzlayinca.svg "Şekil 3 — Dört bin aday, iki yüz fikir")

Şekil 3'ün iki alt kutusu bu makalenin tezinin son hâli: ucuzlayan taraf üretim, ucuzlamayan taraf doğrulama, ve ikisi arasındaki makas açıldıkça darboğaz doğrulamaya kayıyor.

## Şu an dürüstçe söylenebilecekler

**Belirleyici olan modelin gücü değil, iki maliyetin oranı.** Aynı türden bir sistem, doğrulaması kör ve hazır olan bir alanda ortanca 0,96 ångström verirken, doğrulaması bir kimyagerin aylarını alan bir alanda hakemli iki itirazla karşılanıyor.

**Kör ve önceden kaydedilmiş bir cevap anahtarı, bir sonucu tartışmadan çıkarıyor.** Yapı tahmininde kimse "gerçekten doğru mu" diye tartışmıyor, çünkü doğrulama yarışmanın kuralına yazılmış. 99 ve 102'nin disiplini bir alanın kurumu hâline geldiğinde ölçüm de tartışılmaz oluyor.

**Doğrulayıcı doğru yazılmış bir program olduğunda uydurma zararsızdır.** Model çözümü değil onu üreten programı üretiyor, program çalıştırılıyor ve puanlanıyor; sekiz boyutta 512 elemanlı yeni bir yapı ve yirmi yılın en büyük asimptotik iyileştirmesi buradan çıktı.

**Model bir iddia değil bir yön üretebilir ve bu ayrı bir kullanım biçimidir.** Düğüm kuramındaki örnekte kanıt matematikçide kaldı; modelin katkısı üç geometrik büyüklüğe daraltma oldu.

**Doğrulama pahalıysa, üretimi ölçeklemek iddiaları hakemlerin okuma hızından hızlı büyütüyor.** 2,2 milyon yapı ve 381 bin yeni kararlı kayda karşı iki hakemli değerlendirme; biri üçlü ölçütü karşılayan kanıt bulamıyor, öteki 43 ürünün tamamını inceleyip hiçbir yeni malzeme bulunmadığı sonucuna varıyor.

**İtirazın gerekçesi bir dikkatsizlik değil, bir durum uzayı kusuru.** Öngörü düzenli yapılar üretiyor; gerçek katılar çoğu zaman düzensiz. Başarılı sayılanların üçte ikisinin bilinen düzensiz karşılıklar olması muhtemel görülüyor ve toz kırınımının otomatik çözümlenmesi henüz güvenilir değil.

**Üretim ucuzladığında çeşitlilik ucuzlamıyor.** Dört bin aday fikir, benzerlik eşiğinden sonra yaklaşık iki yüz fikre iniyor; ve model kendi fikirlerini güvenilir biçimde ayıklayamıyor.

Çerçevenin sınırı da yazılmalı. Buradaki dört vaka birbirinin kontrollü karşılaştırması değil: farklı alanlar, farklı yöntemler, farklı yıllar. "Oran belirleyicidir" cümlesi bu vakalardan **çıkarılmış** bir okuma, ölçülmüş bir yasa değil. Ayrıca malzeme tarafındaki tartışma hâlâ açık; itirazların kendisi de yanıtlanabilir ve alanın son sözü söylenmiş değil. 98\. makalenin ölçütü burada da geçerli: bir değerlendirmeyi okurken iddiasını, kanıtını ve kanıtın nereye kadar uzandığını ayrı ayrı ayırmak gerekiyor.

### Sırada ne var

Faz boyunca modeli sırayla bir gövdeye, bir ürüne ve bir laboratuvara bağladık; her seferinde soru aynıydı — bu sistemi kuran kararlar neydi ve neyi kapattı. Bir sonraki makale soruyu kaynağına götürüyor ve bu kez hiç yeni konu açmıyor: elimizdeki her şeyi tek bir vaka üzerinde topluyor. Bir sınır model sıfırdan nasıl yapılır, sabit bir bütçe zincir boyunca nereye gider, ve hangi karar en ucuz olduğu hâlde geri dönüşü olmayanıdır?

## Kaynakça

- Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O. ve ark. (2021). *Highly accurate protein structure prediction with AlphaFold*. Nature, 596(7873), s. 583–589. [Bağlantı](https://doi.org/10.1038/s41586-021-03819-2)
- Romera-Paredes, B., Barekatain, M., Novikov, A., Balog, M., Kumar, M. P., Dupont, E. ve ark. (2024). *Mathematical discoveries from program search with large language models*. Nature, 625(7995), s. 468–475. [Bağlantı](https://doi.org/10.1038/s41586-023-06924-6)
- Davies, A., Veličković, P., Buesing, L., Blackwell, S., Zheng, D., Tomašev, N. ve ark. (2021). *Advancing mathematics by guiding human intuition with AI*. Nature, 600(7887), s. 70–74. [Bağlantı](https://doi.org/10.1038/s41586-021-04086-x)
- Merchant, A., Batzner, S., Schoenholz, S. S., Aykol, M., Cheon, G. & Cubuk, E. D. (2023). *Scaling deep learning for materials discovery*. Nature, 624(7990), s. 80–85. [Bağlantı](https://doi.org/10.1038/s41586-023-06735-9)
- Szymanski, N. J., Rendy, B., Fei, Y., Kumar, R. E., He, T., Milsted, D. ve ark. (2023). *An autonomous laboratory for the accelerated synthesis of inorganic materials*. Nature, 624(7990), s. 86–91. [Bağlantı](https://doi.org/10.1038/s41586-023-06734-w)
- Szymanski, N. J., Rendy, B., Fei, Y., Kumar, R. E., He, T. ve ark. (2026). *Author Correction: An autonomous laboratory for the accelerated synthesis of inorganic materials*. Nature, 650(8100), s. E1. [Bağlantı](https://doi.org/10.1038/s41586-025-09992-y)
- Cheetham, A. K. & Seshadri, R. (2024). *Artificial Intelligence Driving Materials Discovery? Perspective on the Article: Scaling Deep Learning for Materials Discovery*. Chemistry of Materials, 36(8), s. 3490–3495. [Bağlantı](https://doi.org/10.1021/acs.chemmater.4c00643)
- Leeman, J., Liu, Y., Stiles, J., Lee, S. B., Bhatt, P., Schoop, L. M. & Palgrave, R. G. (2024). *Challenges in High-Throughput Inorganic Materials Prediction and Autonomous Synthesis*. PRX Energy, 3(1), 011002. [Bağlantı](https://doi.org/10.1103/PRXEnergy.3.011002)
- Si, C., Yang, D. & Hashimoto, T. (2025). *Can LLMs Generate Novel Research Ideas? A Large-Scale Human Study with 100+ NLP Researchers*. International Conference on Learning Representations 2025. [Bağlantı](https://arxiv.org/abs/2409.04109)
- Messeri, L. & Crockett, M. J. (2024). *Artificial intelligence and illusions of understanding in scientific research*. Nature, 627(8002), s. 49–58. [Bağlantı](https://doi.org/10.1038/s41586-024-07146-0)
