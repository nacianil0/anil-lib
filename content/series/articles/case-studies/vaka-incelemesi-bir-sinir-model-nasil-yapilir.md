---
article_id: article_9d3c7b18-5e40-4a2f-8c61-6b2f0e7a4c93
title: "Vaka İncelemesi: Bir Sınır Model Nasıl Yapılır?"
slug: vaka-incelemesi-bir-sinir-model-nasil-yapilir
category: case-studies
level: advanced
reading_order: 114
summary: "Serinin ilk vaka incelemesi: yeni bir kavram tanıtmadan, tek bir hesap bütçesini zincir boyunca izliyor. 8-16 ve 106-109'un kararlarını bir sıraya dizip her birine iki soru soruyor — bütçenin ne kadarını yiyor ve ne zaman değiştirilemez hâle geliyor. Çıkan tablo tersine: parayı harcayan karar ile kaderi belirleyen karar aynı karar değil, ve hesabın yüzde ikisinden azını tutan aşama kullanıcının gördüğü hemen her şeyi belirliyor."
tags:
  - vaka-incelemesi
  - sinir-model
  - hesap-butcesi
  - karar-zinciri
  - geri-alinamazlik
content_hash: sha256:55361204ac43487006e6310357280c3eebcdea4679a4e89889b755dee9edf491
classification_version: 1
classification_batch: 27
---
## Aynı parçalar, bu kez tek bir sıra

Seride bir sınır modelin bütün parçalarını ayrı ayrı kurduk. 8\. makalede ön eğitimi, 9'da bütçenin bölünmesini, 12 ve 13'te post-training'i, 15'te tokenizer'ı, 16 ve 71–73'te değerlendirmeyi, 61–70'te güvenliği, 106–109'da eğitim sistemini gördük. Bu makale yeni bir parça eklemiyor. Yaptığı tek şey parçaları **bir sıraya dizmek** ve her birine iki soru sormak: bu karar bütçenin ne kadarını yiyor, ve ne zaman değiştirilemez hâle geliyor?

100\. makale de bir toplamaydı ama başka türlüydü: orada fazların birbirini nasıl doğurduğunu gösteren bir harita çizmiştik, yani kavramların birbirine göre yerini. Burada çizilen şey bir harita değil bir **zincir**: kararların birbirini nasıl kısıtladığı. Haritada yer vardır, zincirde sıra.

Ve zincire bakınca beklenmedik bir şey görünüyor. Bir sınır modelin maliyeti neredeyse tamamen tek bir aşamada toplanıyor, ama kullanıcının gördüğü şeyi belirleyen aşama o değil. **Parayı harcayan karar ile kaderi belirleyen karar aynı karar değil** — ve ikisi arasındaki mesafe ölçülmüş durumda.

Zinciri bir bütçeyle yürüteceğiz, çünkü her karar sonunda aynı tek sayıdan pay alıyor.

## Bütçe tek sayıdır ve ilk karar onu ikiye böler

Başlangıç noktası bir FLOP miktarı. 8\. makaledeki kestirimle, N parametreli bir modeli D token üzerinde eğitmenin maliyeti yaklaşık 6ND'dir. Aaron Grattafiori ve arkadaşlarının Llama 3 teknik raporu — hakemli olmayan bir rapordur ve seride baştan beri böyle işaretlenir — 405 milyar parametre ve 15,6 trilyon token bildiriyor; 6 × 4,05×10¹¹ × 1,56×10¹³ = 3,79×10²⁵, raporun kendi verdiği değer 3,8×10²⁵.

İlk karar bu sayıyı ikiye bölmek: ne kadar model, ne kadar veri. Jordan Hoffmann ve arkadaşlarının NeurIPS 2022'de sunduğu çalışma bu bölmenin ölçülmüş cevabını vermişti ve 9\. makalede görmüştük — sabit bir bütçede parametre başına yaklaşık yirmi token; dört kat küçük ama yirmi kat çok token görmüş model, elli yedi konulu bir sınavda yüzde 67,6 ile yüzde 60,0'ın önüne geçiyordu.

Bu kararın kapattığı şey, karar anında görünmeyen yerde. Seçilen N yalnızca eğitim maliyetini değil **çıkarım maliyetini de ömür boyu** belirliyor: 26 ve 28\. makalelerde gördüğümüz gibi her kullanıcı isteği, her turda o N parametreyi okumak zorunda. Eğitim bir kez ödenir, çıkarım her gün ödenir. Yani bütçeyi bölen karar aslında iki ayrı bütçeyi birden bölüyor ve ikincisi faturaya yıllarca yayılıyor.

Değiştirilebilirliği: koşu başlayana kadar serbest, sonra yalnızca baştan başlayarak.

## Hiç hesap harcamayan karar

Zincirin ikinci halkası, bütçeden pay almadığı hâlde en bağlayıcı olanı.

Tokenizer, ilk eğitim adımından önce eğitilir ve 15\. makalede ölçtüğümüz gibi, modelin aritmetiğini, harf saymasını ve hangi dilde kaç token harcayacağını belirler. Maliyeti 10²⁵ mertebesindeki bir bütçenin yanında pratikte sıfırdır — bir metin derlemi üzerinde birleştirme kurallarını çıkarmak, tek bir eğitim adımının yanına bile yazılamaz.

Değiştirilebilirliği ise zincirin en katısı: ilk eğitim adımı atıldıktan sonra **asla**. Sözlük değişirse her token kimliği değişir, her embedding anlamsız kalır, ve elde kalan tek şey baştan eğitmektir. Yani hesap defterinde görünmeyen bir karar, ürünün ömrü boyunca geçerli.

> **Kendini yokla:** Bir kararın ucuz olması neden onu daha az değil, daha çok riskli yapabiliyor?

Çünkü maliyet, üzerinde ne kadar düşünüleceğini belirleyen şeylerden biridir ve ucuz karar gözden kaçar. 3,8×10²⁵ FLOP'luk bir koşuya karar veren ekip o kararı haftalarca tartışır; tokenizer'ın sözlük boyu bir yapılandırma satırıdır. Ama zincirdeki yeri gereği birincisi yeniden koşulabilir, ikincisi koşulamaz. Riski belirleyen şey kararın fiyatı değil, geri alma fiyatı.

## Okunan geri okunmaz

Üçüncü halka veri. 14\. makale temizlik hattını, 8 hangi filtrenin kimin metnini attığını kurmuştu. Burada önemli olan bu kararın **iki ayrı şeyi birden** kapatması.

Birincisi bilinen: karışım, modelin ne bildiğini belirler. İkincisi daha sinsi ve 72\. makalenin konusuydu: karışım, modelin **ne ile sınanabileceğini** de belirler. Bir sınav sorusu eğitim verisine bir kez girdiyse, o sınav o model için artık geçerli bir ölçüm aracı değildir; ve verinin okunması geri alınamaz. Kirlilik bir hata değil, bir **durum**dur: bir kez oluşunca ölçüm tarafında kalıcı bir kısıt yaratır.

Bu yüzden değerlendirme kararı, değerlendirme yapılmadan çok önce — veri karışımı seçilirken — alınmış olur. 71\. makalenin geçerlilik zinciri burada zincirin kendisine uygulanıyor: bir puanın ne anlama geldiği, o puanın ölçüldüğü anda değil, veri hattının kurulduğu anda belirlenmiş oluyor.

Değiştirilebilirliği: karışım koşu sırasında ayarlanabilir, ama okunmuş olan geri okunmaz.

## Planın faturaya dönüştüğü yer

Dördüncü halka, 106–109\. makalelerin tamamı. Ve bu halkanın işlevi zincirde ayrıdır: burada yeni bir şeye karar verilmiyor, **birinci halkadaki kararın gerçek fiyatı belirleniyor**.

3,8×10²⁵ FLOP bir plan; o planın kaç gün süreceğini kartların ne kadarının gerçekten çalıştığı belirler. 108\. makalede bunun ölçüsünü görmüştük: aynı dikkat algoritmasının üç uygulamasında kullanım oranı yüzde 25–40'tan yüzde 50–73'e çıkıyor, sonra yeni bir çipte yüzde 35'e düşüp yeniden yüzde 75'e çıkarılıyor. Tri Dao'nun ICLR 2024'te sunduğu çalışma bu basamağın ortasındaki adımı ölçüyor.

Sayının anlamı zincir açısından şu: kullanım oranı ikiye katlandığında, aynı plan yarı sürede biter. Yani birinci halkada "bütçe" diye yazılan şey bir niyet; gerçek bütçe, dördüncü halkada belli oluyor. Aynı şey güvenilirlik tarafında da geçerli — 109\. makalede kontrol noktası aralığının kapalı formülünü, John Young'ın 1974'te *Communications of the ACM*'de verdiği birinci mertebe yaklaşımdan türetmiştik; `T* = √(2δM)` ve kaçınılmaz kayıp `√(2δ/M)`, yani koşunun ne kadarının arızaya gideceği de burada kararlaştırılıyor.

Değiştirilebilirliği: zincirdeki en esnek halka. Çekirdek değiştirilebilir, paralellik yeniden bölünebilir, kontrol noktası aralığı koşu ortasında ayarlanabilir. Hiçbiri ürünün ne olduğunu değiştirmez; yalnızca ne zaman ve kaça biteceğini.

![Altı satırlı dört sütunlu bir tablo. Üstte başlık: tek bütçe, altı karar. Sütunlar karar, bütçeden aldığı pay, ne zaman değiştirilemez olur ve neyi kapatır. Birinci satır bütçenin bölünmesi: payı neredeyse tamamı, koşu başlayınca değiştirilemez, çıkarım maliyetini ömür boyu kapatır. İkinci satır vurguludur, tokenizer: payı pratikte sıfır, ilk eğitim adımında değiştirilemez olur, aritmetiği ve dil maliyetini kapatır. Üçüncü satır veri karışımı: payı hattın kendi maliyeti kadar, okunan geri okunmaz, hem bilgiyi hem hangi sınavın geçerli kalacağını kapatır. Dördüncü satır sistem ve koşu: payı bütçeyi harcama hızıdır, koşu boyunca değiştirilebilir, yalnızca süreyi ve fiyatı kapatır. Beşinci satır vurguludur, post-training: payı yüzde ikinin altı, hiçbir zaman değiştirilemez olmaz ve yeniden yapılabilir, karakteri reddetmeyi ve kalibrasyonu kapatır. Altıncı satır ağırlığın yayımlanması: payı yok denecek kadar az, yayımlandığı an değiştirilemez olur ve geri alma kurumun elinde değildir, sonraki her savunma seçeneğini kapatır. Altta bir kayıt: paylar Llama 3 raporundan ve Ouyang ve arkadaşlarının bildirdiği değerlerden türetilmiştir; değiştirilebilirlik sütunu zincirin yapısından çıkar, ölçüm değildir.](assets/karar-zinciri.svg "Şekil 1 — Tek bütçe, altı karar, iki ayrı sütun")

Şekil 1'in ikinci ve üçüncü sütunları yan yana okunduğunda tablo kendini gösteriyor: pay sütunu yukarıdan aşağıya küçülürken, bağlayıcılık sütunu aynı yönde artmıyor — zikzak yapıyor.

## Yüzde ikinin altındaki karar

Beşinci halka post-training, ve zincirdeki asıl sürpriz burada.

11–13\. makalelerde bu aşamanın ne yaptığını görmüştük: ham bir dil modelini talimat izleyen bir asistana çeviren denetimli ince ayar ve tercih eğitimi. Şimdi faturasına bakalım. Long Ouyang ve arkadaşlarının NeurIPS 2022'de sunduğu çalışma kendi sayılarını açıkça yazıyor: 175 milyar parametreli denetimli ince ayar modelini eğitmek 4,9 petaflop/s-gün, tercih eğitiminden geçmiş sürümü eğitmek 60 petaflop/s-gün tutuyor; aynı boydaki ham modelin ön eğitimi 3.640 petaflop/s-gün.

Kendi hesabımız: 60 ÷ 3.640 = yüzde 1,65; ikisi birlikte (4,9 + 60) ÷ 3.640 = yüzde 1,78. Yani asistanı asistan yapan bütün iş, ön eğitimin **yüzden birkaçı** kadar hesap harcıyor.

Ve aynı çalışmanın 11\. makalede aktardığımız ölçümü bu oranın karşılığını veriyor: etiketleyiciler 1,3 milyar parametreli post-training'den geçmiş modelin çıktılarını, 175 milyar parametreli ham modelin çıktılarına tercih etti. Yüz kattan fazla küçük bir model, yalnızca bu aşamadan geçtiği için.

İki sayıyı yan yana koy. Zincirin yüzde 1,78'lik halkası, kullanıcının gördüğü çıktıda yüz kat parametre farkını yenebiliyor.

Bu halkanın ikinci özelliği daha da çarpıcı: **zincirdeki tek tam geri alınabilir karar** bu. Tokenizer değiştirilemez, okunan veri geri okunamaz, yayımlanan ağırlık geri çağrılamaz; ama post-training istendiği kadar yeniden yapılabilir — aynı ham modelin üzerine bir kez daha, başka verilerle, başka ilkelerle. 105\. makalede kendi küçük modelimizde bunun faturasını da ölçmüştük: hizalama vergisi olarak derlem kaybında 0,77'lik artış. Ödenen bedel var, ama kalıcı değil.

![İki sütunlu, üç satırlı bir tablo ve altında iki kutu. Üstte başlık: aynı zincir, iki ayrı sıralama. Sol sütun hesabın nereye gittiği, sağ sütun kullanıcının gördüğünü neyin belirlediği. Birinci satır: solda ön eğitim yüzde doksan sekizden fazlasını alır, sağda post-training kullanıcının gördüğü hemen her şeyi belirler. İkinci satır: solda post-training yüzde 1,78 alır, sağda ön eğitim bilgiyi ve yeteneği belirler. Üçüncü satır vurguludur: solda tokenizer pratikte sıfır alır, sağda tokenizer aritmetiği ve dil maliyetini kalıcı olarak belirler. Altta iki kutu yan yana durur. Sol kutunun başlığı ölçülen oran; içinde denetimli ince ayarın 4,9 ve tercih eğitiminin 60 petaflop saniye gün tuttuğu, aynı boydaki ham modelin ön eğitiminin 3.640 petaflop saniye gün tuttuğu, altmışın üç bin altı yüz kırka bölümünün yüzde 1,65 ve ikisi birlikte yüzde 1,78 ettiği yazılıdır. Sağ kutunun başlığı ölçülen karşılık; içinde etiketleyicilerin 1,3 milyar parametreli post-training görmüş modelin çıktılarını 175 milyar parametreli ham modelin çıktılarına tercih ettiği yazılıdır. En altta bir kayıt: bütün petaflop değerleri Ouyang ve arkadaşlarının bildirdiği sayılardır, iki yüzde kendi hesabımızdır.](assets/maliyet-ve-sonuc-tersine.svg "Şekil 2 — Yüzde 1,78, yüz kat parametreyi yeniyor")

Şekil 2'nin iki sütunu neredeyse birbirinin tersi ve bu makalenin tezi o tersliktir.

## Binadan çıkan karar

Altıncı halka en kısa ve en ağır olanı: ağırlıklar yayımlanacak mı?

20\. makalede bu kararın eksenlerini — ağırlık, veri, kod, lisans, belgelendirme — kurmuştuk. 61–70 arasında güvenlik tarafını ölçtük. Burada önemli olan tek bir yapısal özellik: bu, zincirdeki **geri alınması kurumun elinde olmayan tek karar**.

Öteki bütün halkalarda "yanlış karar verdik" demenin bir bedeli vardır ve bedel ödenebilir: koşuyu yeniden başlat, veriyi temizle, post-training'i tekrarla. Ağırlıklar yayımlandığında ise geri çekme diye bir işlem yok; dosya çoğaltılmıştır. Ve bu, güvenlik tarafındaki iki ölçümü yapısal bir sonuca çeviriyor: 63\. makalede açık bir modelde bulunan bir saldırının kapalı bir modele taşınabildiğini, 68'de ağırlıklardan silinmiş bilginin küçük bir örnek kümesiyle geri kazanılabildiğini görmüştük. İkisi de yayım sonrasında uygulanacak bir savunmanın neden az şey yapabileceğini söylüyor.

Bir incelik daha var ve kararı ikili olmaktan çıkarıyor. 20\. makalede "açık" sözcüğünün beş ayrı eksende — ağırlık, veri, kod, lisans, belgelendirme — ayrı ayrı anlam taşıdığını görmüştük; geri alınamazlık da eksen eksen işliyor. Ağırlığı yayımlamak geri alınamaz; aynı modele yalnızca ölçülü bir arayüzden erişim vermek, erişimi kapatmayı açık bırakır. 68'de bu ara basamakların adı konmuştu: yayım bir anahtarın açılıp kapanması değil, üzerinde durulabilecek bir gradyan. Zincir açısından önemli olan şu — gradyanın hangi basamağında durulduğu, sonradan hangi kararların hâlâ verilebileceğini belirliyor.

Sayash Kapoor ve arkadaşlarının ICML 2024'te sunduğu çerçeve bu kararın nasıl tartılacağını veriyor ve 68'de kullanmıştık: sorulması gereken şey modelin ne yapabildiği değil, **o model olmasaydı saldırganın nerede olacağı** — yani marjinal risk. Zincir açısından çerçevenin değeri şu: karar geri alınamaz olduğu için, karar anında elde olması gereken kanıt da ötekilerden farklı. Geri alınabilir kararlarda deneyip görmek meşru bir yöntemdir; burada değil.

## Zincirin şekli

Altı halkayı yan yana koyunca ortaya çıkan yapı şu.

Hesap neredeyse tamamen tek bir halkada toplanıyor — ön eğitim. Kullanıcının gördüğü davranış neredeyse tamamen başka bir halkada belirleniyor — post-training, ve payı yüzde ikinin altında. Ürünün ömür boyu taşıyacağı kısıtların bir kısmı hiç hesap harcamayan bir halkada kilitleniyor — tokenizer. Ölçebileceğin şeylerin sınırı, ölçmeyi düşünmeden çok önce veri hattında çiziliyor. Ve tek geri alınamaz dış karar en sonda duruyor.

Zincirin bir eksiğini de burada yazmak gerekiyor, çünkü şimdiye kadar her halkayı FLOP cinsinden tarttık ve iki halka bu birimle tartılamıyor. 13\. makalede tercih etiketlerinin kimden geldiğini, 64'te ilkelerin kim tarafından yazıldığını görmüştük; ikisi de hesap defterinde neredeyse görünmeyen ama sonucun tamamını taşıyan kararlar. Bir tercih çiftine "bu daha iyi" diyen kişinin kim olduğu, hangi yönergeyle çalıştığı ve neyi tartışmalı saydığı, post-training'in ne üreteceğini belirliyor — ve bunun FLOP karşılığı yok. Zincirdeki en ucuz iki halkadan biri makineyle ilgili değil; insanla.

Bundan pratik bir okuma çıkıyor ve 99\. makalenin diliyle söylenebilir: bir kararın ne kadar dikkat hak ettiğini belirleyen şey maliyeti değil, **geri alma maliyeti**. Zincirde bu iki büyüklük birbirinden bağımsız, hatta sık sık ters yönde.

Geri alma maliyetini aynı birimle yazmak mümkün ve hesap bir satır; girdilerin ikisi de yukarıda duruyor. Ön eğitim bütçesini 100 birim sayalım; post-training o bütçenin yüzde 1,78'i, yani 1,78 birim. Şimdi iki "yanlış yaptık" cümlesini fiyatlandıralım. Post-training yanlışsa yeniden yapılır: 1,78 birim. Tokenizer yanlışsa her şey yeniden yapılır: 100 + 1,78 = 101,78 birim. Oran 101,78 ÷ 1,78 ≈ **57**. Aynı cümle, zincirin ikinci halkasında beşinci halkadakinin elli yedi katına mal oluyor — ve ikinci halkanın kararı verilirken hesap defterinde hiç görünmüyordu.

Zincirin bir okuma değeri daha var ve 80 ile 102\. makalelerin konusuna bağlanıyor. Bir model kartı ya da teknik rapor okurken hangi halkanın belgelendiğine bakmak, o belgenin ne işe yarayacağını söylüyor: bütçe ve mimari yazılmışsa sonucun yeniden **kurulabilirliği** hakkında bir şey öğrenirsin, veri karışımı yazılmışsa hangi ölçümün geçerli kalacağı hakkında, post-training yazılmışsa modelin neden öyle davrandığı hakkında. 102'de gördüğümüz gibi bu üçünü birden belgeleyen rapor neredeyse yok; ve hangisinin eksik olduğu, hangi sorunun cevapsız kalacağını belirliyor.

> **Kendini yokla:** Elinde sabit bir bütçe var ve yalnızca bir halkaya fazladan bir ay ayırabiliyorsun. Zincirin neresine ayırırsın?

Geri alma maliyetinin en yüksek olduğu yere — yani tokenizer ve veri kararlarına. Post-training'e ayrılan bir ay, sonuçtan memnun kalınmazsa yeniden yapılabilir; tokenizer'a ayrılmayan bir ay ise modelin ömrü boyunca geri alınamaz. Ve bu cevabın sezgiye ters geldiği yer öğretici: post-training kullanıcı üzerindeki etkisi en yüksek halka, ama tam da yeniden yapılabildiği için acil değil.

## Şu an dürüstçe söylenebilecekler

**Bir sınır model bir adımlar listesi değil, bir kararlar zinciridir.** Her karar bir sonrakinin seçenek kümesini daraltıyor ve bazıları onu kapatıyor.

**Maliyetin dağılımı ile bağlayıcılığın dağılımı örtüşmüyor.** Hesabın neredeyse tamamı ön eğitimde; kullanıcının gördüğünü belirleyen aşama post-training ve payı ölçülmüş olarak yüzde 1,78; ürünün kalıcı kısıtlarının bir kısmı payı pratikte sıfır olan tokenizer'da.

**Ölçülmüş karşılaştırma bu tersliği tek başına taşıyor.** 4,9 ve 60 petaflop/s-güne karşı 3.640; ve 1,3 milyar parametreli post-training görmüş modelin çıktıları, 175 milyar parametreli ham modele tercih ediliyor.

**Bütçe birinci halkada yazılır, dördüncü halkada belli olur.** Aynı plan, kullanım oranı yüzde 25–40'tan yüzde 50–73'e çıktığında yarı sürede biter; kontrol noktası aralığı `√(2δM)` ile seçilir ve kaçınılmaz kayıp `√(2δ/M)` kadardır.

**Değerlendirme kararı, değerlendirmeden önce alınır.** Bir sınav eğitim verisine girdiyse o sınav o model için geçerli bir ölçüm aracı olmaktan çıkar; ve okunan geri okunmaz.

**Zincirde tam geri alınabilir tek karar post-training'dir.** Bedeli vardır — kendi ölçümümüzde derlem kaybında 0,77'lik artış — ama kalıcı değildir.

**Ve tek dış geri alınamaz karar ağırlığın yayımlanmasıdır.** Geri çekme diye bir işlem olmadığı için, o karar anında istenen kanıt ötekilerden farklı olmak zorunda: deneyip görmek burada bir yöntem değil.

Bu okumanın sınırını da yazmak gerekiyor. Zincir gerçek bir projenin akışı değil, yayımlanmış ölçümlerden kurulmuş bir soyutlama: gerçek ekipler bu kararları sırayla değil iç içe verir, ve birçoğu bir öncekine geri döner. Ayrıca yüzde 1,78 oranı tek bir çalışmanın kendi bildirdiği sayılardan geliyor ve 2022 tarihli; bugünün post-training hatları — sentetik veri üretimi, çok turlu tercih eğitimi, akıl yürütme eğitimi — daha pahalı ve oran büyümüş olabilir. Elimizde bu oranın güncel ve bağımsız bir ölçümü **yok**; cümlenin taşıdığı şey mertebe, kesin değer değil.

### Sırada ne var

Bu makale zinciri modeli **üreten** tarafta izledi: bütçe, veri, sistem, post-training, yayım. Ama bir modelin var olması onu kullanılabilir kılmıyor. Bir sonraki makale aynı vaka incelemesi disiplinini masanın öbür tarafına taşıyor: elinde bir model varken bir ürün nasıl kuruluyor, 41–60\. makalelerin getirme ve ajan katmanları hangi sırayla dizileniyor, ve bu zincirde geri alınamaz kararlar nerede duruyor?

## Kaynakça

- Hoffmann, J., Borgeaud, S., Mensch, A., Buchatskaya, E., Cai, T., Rutherford, E. ve ark. (2022). *An empirical analysis of compute-optimal large language model training*. Advances in Neural Information Processing Systems 35. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/c1e2faff6f588870935f114ebe04a3e5-Abstract-Conference.html)
- Grattafiori, A. ve ark. (2024). *The Llama 3 Herd of Models*. Meta AI teknik raporu (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2407.21783)
- Ouyang, L., Wu, J., Jiang, X., Almeida, D., Wainwright, C., Mishkin, P. ve ark. (2022). *Training language models to follow instructions with human feedback*. Advances in Neural Information Processing Systems 35. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/b1efde53be364a73914f58805a001731-Abstract-Conference.html)
- Dao, T. (2024). *FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning*. International Conference on Learning Representations 2024. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/98ed250b203d1ac6b24bbcf263e3d4a7-Abstract-Conference.html)
- Young, J. W. (1974). *A First Order Approximation to the Optimum Checkpoint Interval*. Communications of the ACM, 17(9), s. 530–531. [Bağlantı](https://doi.org/10.1145/361147.361115)
- Kapoor, S., Bommasani, R., Klyman, K., Longpre, S., Ramaswami, A., Cihon, P. ve ark. (2024). *On the Societal Impact of Open Foundation Models*. Proceedings of the 41st International Conference on Machine Learning, PMLR 235. [Bağlantı](https://proceedings.mlr.press/v235/kapoor24a.html)
