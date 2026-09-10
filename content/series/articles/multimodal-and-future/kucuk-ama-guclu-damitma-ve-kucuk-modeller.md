---
article_id: article_40e6f7d4-4c6d-4ca2-bf54-77d31c5f2c09
title: "Küçük ama Güçlü: Damıtma ve Küçük Modeller"
slug: kucuk-ama-guclu-damitma-ve-kucuk-modeller
category: multimodal-and-future
level: intermediate
reading_order: 87
summary: "Aynı kaliteyi daha az kaynakla vermenin üçüncü yolu mimaride değil eğitimde. Önce mekanizma: öğretmenin sert etiketi değil, bütün sınıflara dağıttığı olasılıklar aktarılır; sıcaklık o dağılımı okunur kılar ve öğrenci hiç görmediği bir sınıfı bile öğrenebilir. Sonra daha derin bir okuma: aktarılan şey etiket değil fonksiyondur, bu yüzden aynı boyuttaki öğrenci öğretmenini geçebiliyor. Aynı hesap bütçesinin iki yolu ölçülmüş sayılarla karşılaştırılıyor ve damıtmanın ölçek yasası iki koşul veriyor; öğretmen fazla güçlenince öğrenci kötüleşiyor. Budama üçüncü aile olarak giriyor. Kapanışta sınır: geniş kapsamlı taklit biçimi aktarıyor, içeriği değil — ve 34'te bırakılan işaret ödeniyor."
tags:
  - damitma
  - kucuk-modeller
  - budama
  - ogretmen-ogrenci
  - hesap-butcesi
content_hash: sha256:628fb20a8cdc5d1ef8e8e92fb8f59af7a582f2771eda43573f0fcbf91a8634a9
classification_version: 1
classification_batch: 21
---
## 86'nın bıraktığı üçüncü yol

Son iki makale aynı soruyu mimarinin içinden sordu: aynı kaliteyi daha az kaynakla nasıl verirsin? Biri hangi parametrelerin çalışacağını seçti, öbürü geçmişin nasıl tutulacağını değiştirdi. Üçüncü bir yol daha var ve mimariden değil eğitimden geçiyor: büyük bir modelin bildiklerini küçük bir modele aktarmak.

Bu yolun adı **damıtma** ve seride ilk kez 34\. makalede geçmişti. Orada bir işaret bırakılmıştı: doğrulanabilir ödülle eğitimin temel modelin sınırını aşmadığı ölçülmüştü, fakat aynı çalışma damıtmanın o sınırı aştığını da bildiriyordu. O işaret bu makalede tahsil edilecek. Ama önce mekanizma gerekiyor, çünkü damıtmanın adı yanıltıcı: aktarılan şey soyut bir "bilgi" değil, oldukça somut bir nesne.

## Sert etiketin söylemedikleri

Bir sınıflandırma modelini olağan biçimde eğitirken hedef, doğru sınıfa 1, geri kalan her şeye 0 veren bir vektördür. Buna **sert etiket** diyelim. Sert etiket bir şeyi söyler, çok şeyi söylemez: bir "2" görüntüsünün hangi "7"lere benzediğini, hangi "3"lerden uzak durduğunu söylemez.

Eğitilmiş büyük bir model ise tam olarak bunu söyler. Çıkışındaki softmax bütün sınıflara bir olasılık dağıtır ve bu dağılımdaki küçük sayılar — 2'ye verilen 0,9'un yanında 7'ye verilen 10⁻⁶ ile 3'e verilen 10⁻⁹ — modelin öğrendiği benzerlik yapısını taşır. Sorun şu ki bu sayılar softmax'tan sonra o kadar küçüktür ki eğitim sinyaline neredeyse hiç katkı yapmazlar.

Geoffrey Hinton, Oriol Vinyals ve Jeff Dean'in 2015'te yayımladığı — hakemli bir konferans bildirisi değil, bir çalıştay çalışması olan — kısa metin bu sorunu tek bir müdahaleyle çözüyor: 10\. makalede kurduğumuz **sıcaklık**. Softmax'a girmeden önce logit'leri `T`'ye bölersen dağılım yumuşar; küçük olasılıklar büyür ve okunur hâle gelir. Öğretmen modelin yüksek sıcaklıkta ürettiği bu dağılıma **yumuşak etiket** (soft target) denir ve öğrenci aynı sıcaklıkta ona uymaya çalışır. Eğitim bittiğinde sıcaklık 1'e döner.

Bir kayıt: yumuşak etiketten gelen gradyanların büyüklüğü `1/T²` ile ölçekleniyor, dolayısıyla sert ve yumuşak hedefler birlikte kullanılacaksa yumuşak terim `T²` ile çarpılır. Bu, bir uygulama ayrıntısı gibi görünüyor ama mekanizmanın nerede yaşadığını gösteriyor: aktarılan şey, sıcaklığın büyüttüğü o küçük olasılıklar.

Ölçüsü şaşırtıcı derecede net. Yazarlar MNIST'te iki gizli katmanı 1200 birimli, düzenlileştirilmiş bir ağ eğitiyorlar: 67 test hatası. Aynı veriyle eğitilen, iki gizli katmanı 800 birimli, hiç düzenlileştirilmemiş küçük ağ: 146 hata. Aynı küçük ağ, tek fark olarak büyük ağın 20 sıcaklığındaki yumuşak etiketlerine de uymayı öğrendiğinde: **74 hata**. Küçük ağın mimarisi değişmedi, verisi değişmedi; yalnızca hedefi değişti ve hatanın büyük kısmı kapandı.

Aynı çalışmanın ikinci deneyi mekanizmayı çıplak bırakıyor. Aktarım kümesinden **bütün 3'ler siliniyor**; öğrenci hayatında hiç 3 görmüyor. Yine de 206 hata yapıyor ve bunların 133'ü 3'lerde. Yalnızca 3 sınıfının sapması elle 3,5 artırıldığında hata 109'a, 3'lerdeki hata 14'e iniyor: model, hiç görmediği bir sınıfın test örneklerinin yüzde 98,6'sını doğru sınıflandırıyor. 3'ün ne olduğunu, öbür rakamların yumuşak etiketlerindeki "3'e benzerlik" bileşeninden öğrenmiş.

Mekanizmanın kendisi 2015'ten eski. Cristian Buciluă, Rich Caruana ve Alexandru Niculescu-Mizil'in KDD 2006'da sunduğu çalışma, büyük bir model topluluğunun bilgisini tek bir küçük ağa taşımak için etiketsiz veriyi topluluğa etiketletiyor ve etiketsiz veri yoksa sentetik örnek üretiyordu; sonuç, topluluktan bin kat küçük ve bin kat hızlı, buna rağmen ona yakın başarıda bir ağdı. Yumuşak etiket bu fikrin sıcaklıkla keskinleştirilmiş hâli.

![Üç sütunlu bir tablo; sütunlar damıtmanın üç aktarım biçimi. Birinci sütun yumuşak etiket: aktarılan şey öğretmenin bütün sınıflara dağıttığı olasılıklar, gereken erişim öğretmenin çıkış dağılımı, bedeli öğretmenin her eğitim örneği için çalıştırılması, ve ölçülen etkisi hiç görülmemiş bir sınıfın test örneklerinin yüzde 98,6'sının doğru sınıflandırılması. İkinci sütun ara temsil: aktarılan şey öğretmenin ara katmanlarındaki aktivasyonlar, gereken erişim modelin içi, bedeli öğrenci ile öğretmenin katmanlarını eşleyen ek bir izdüşüm, ve etkisi öğrencinin daha derin ve daha ince kurulabilmesi. Üçüncü sütun üretilen veri: aktarılan şey öğretmenin ürettiği metnin kendisi, gereken erişim yalnızca çıktı yani bir arayüz yeter, bedeli üretim maliyeti ve üretilen verinin kalitesi, ve etkisi 800 bin örnekle küçük bir modelin akıl yürütme davranışını devralması. En altta bir kayıt: üç biçim de aynı şeyi yapar, öğretmenin fonksiyonunu örnekler; farkları örneklemenin nereden alındığıdır.](assets/damitmanin-uc-aktarim-bicimi.svg "Şekil 1 — Aynı fonksiyon, üç ayrı örnekleme yeri")

Şekil 1 üç biçimi ve her birinin ne gerektirdiğini veriyor. Ayrım pratikte belirleyici: yumuşak etiket öğretmenin çıkış dağılımını ister, ara temsil modelin içini ister — Adriana Romero ve arkadaşlarının ICLR 2015'te sunduğu çalışma bunu ilk kuranlardan, ve TinyBERT gibi izleyicileri dikkat ağırlıklarını da eşliyor — üretilen veri ise yalnızca çıktıyı ister, yani kapalı bir arayüzün ardındaki modelden bile alınabilir. Bu üçüncü biçimin dil modellerindeki ilk kurulumu Yoon Kim ve Alexander Rush'ın EMNLP 2016'da sunduğu çalışma: öğretmenin token başına dağılımı yerine öğretmenin **ürettiği dizinin kendisi** hedef yapılıyor ve makine çevirisinde öğrencinin, öğretmeninden on kat hızlı çalışırken başarımını büyük ölçüde koruduğu ölçülüyor.

## Aktarılan şey etiket değil, fonksiyon

Buraya kadarki anlatı "büyük model küçüğe bilgi aktarır" diyor. Üç ölçüm bu anlatının eksik olduğunu gösteriyor.

Birincisi eski. Jimmy Ba ve Rich Caruana'nın NeurIPS 2014'te sunduğu çalışma, tek gizli katmanlı sığ ağların derin ağların öğrendiği karmaşık fonksiyonları öğrenebildiğini ve doğrudan etiketlerle ulaşamadıkları doğruluklara, derin bir ağın çıktısını taklit ederek ulaşabildiğini gösterdi — bazı durumlarda aynı parametre sayısıyla. Yani sığ ağın eksiği kapasite değil, hedefti.

İkincisi Lucas Beyer ve arkadaşlarının CVPR 2022'de sunduğu çalışma. Yazarlar damıtmayı bir **fonksiyon eşleştirme** problemi olarak ele alıyorlar: öğretmen ile öğrenci **tam olarak aynı** girdiyi görmeli — aynı kırpma, aynı bozma, aynı artırma — ve eğitim çok uzun sürmeli. İki koşul da sezgiye aykırı: alışıldık düzende öğretmenin etiketleri bir kez hesaplanıp saklanır ve öğrenci kendi artırmalarını görür. Tutarlı görüntü ve sabırlı eğitimle, 9.600 dönemlik bir damıtmayla ImageNet'te bir ResNet-50'yi yüzde 82,8 doğruluğa çıkarıyorlar — aynı mimarinin olağan eğitimine göre 4,4 puan.

Üçüncüsü daha da rahatsız edici. Tommaso Furlanello ve arkadaşlarının ICML 2018'de sunduğu çalışma, öğrenciyi öğretmenle **aynı mimaride ve aynı boyutta** kuruyor. Sıkıştırma yok; tek fark, öğrencinin hedefinin öğretmenin çıktısı olması. CIFAR-10'da sonuçlar: 0,38 milyon parametreli ağda test hatası 6,69'dan 6,64'e, 1,48 milyonda 5,06'dan 4,86'ya, 9,16 milyonda 4,13'ten 4,03'e iniyor. Öğrenci öğretmenini geçiyor. En büyük yapılandırmada — 36 milyon parametre — yön tersine dönüyor: 3,77'den 3,86'ya. Yani kazanç ne evrensel ne de sıkıştırmadan geliyor.

Bu üç ölçüm birlikte okununca damıtmanın tanımı değişiyor: öğrenci, öğretmenin **fonksiyonunu** örnekliyor ve bu fonksiyon, sert etiketlerin tanımladığı hedeften daha yumuşak, daha düzenli, öğrenilmesi daha kolay bir hedef. Furlanello ve arkadaşlarının gradyan çözümlemesi de bunu söylüyor: damıtma kaybının gradyanı, yanlış sınıflara dair bilgiyi taşıyan bir terim ile gerçek etiketten gelen gradyanın yeniden ölçeklenmiş hâlinin toplamı.

## Aynı bütçenin iki yolu

Şimdi pratik soru. Elinde belirli bir hesap bütçesi var ve küçük bir model istiyorsun. İki yol var: küçük modeli doğrudan, hesap-optimal noktanın çok ötesinde uzun uzun eğitmek; ya da aynı bütçenin bir kısmını bir öğretmene harcayıp öğrenciyi ondan damıtmak. Hangisi?

Google DeepMind'ın 2024'te yayımladığı Gemma 2 raporu — hakemli değil — ikinci yolu bir üretim kararı olarak veriyor: 2 ve 9 milyar parametreli modeller sonraki token tahmini yerine damıtma ile, üstelik hesap-optimal token sayısının **elli katından fazlasıyla** eğitilmiş. Raporun ablasyonu iki sayıyı yan yana koyuyor. 2 milyarlık bir model 500 milyar token üzerinde eğitildiğinde — ki bu, o boyut için hesap-optimal sayının on katı — sıfırdan eğitimde üç ölçütün ortalaması 60,3, 7 milyarlık bir öğretmenden damıtıldığında 67,7. Aynı öğretmenle üç ayrı öğrenci boyunda doğrulama perplexity'si: 200 milyonda 23'e karşı 21, 400 milyonda 19'a karşı 17, 1 milyarda 17'ye karşı 15. Kazanç boyut büyüdükçe kaybolmuyor.

Bu tek bir raporun kararı. Dan Busbridge ve arkadaşlarının ICML 2025'te sunduğu çalışma soruyu ölçek yasasına çeviriyor: 143 milyon ile 12,6 milyar parametre arasında öğretmen ve öğrenciler, birkaç milyardan 512 milyara kadar token. Vardıkları formül üç şey söylüyor ve üçü de pratikte bağlayıcı.

Birincisi bir tavan: yeterli veri ya da hesap verildiğinde damıtma, denetimli öğrenmenin verdiğinden **daha düşük** bir çapraz entropi üretemiyor. İkincisi bir eşik: damıtma yalnızca öğrenciye ayrılan hesap, öğrenci boyuna bağlı bir sınırın altındaysa ve öğretmen ya zaten varsa ya da tek bir damıtmanın ötesinde işe yarayacaksa daha verimli. Üçüncüsü sezgiye en aykırı olanı.

![İki sütunlu karşılaştırma tablosu; sütunlar aynı hesap bütçesinin iki kullanımı. Birinci sütun küçük modeli doğrudan uzun eğitmek, ikinci sütun aynı modeli bir öğretmenden damıtmak. Satırlar sırasıyla ölçülen sonuçları veriyor. İki milyar parametreli model beş yüz milyar token üzerinde eğitildiğinde üç ölçütün ortalaması sıfırdan eğitimde 60,3, damıtmada 67,7. İlk satırda yüksek olan iyidir. Doğrulama perplexity'si iki yüz milyonluk öğrencide 23'e karşı 21, dört yüz milyonlukta 19'a karşı 17, bir milyarlıkta 17'ye karşı 15; bu üç satırda düşük olan iyidir. Altta ölçek yasasının üç kaydı: yeterli veri ya da hesap verildiğinde damıtma denetimli öğrenmenin altına inemez; damıtma yalnızca öğrenciye ayrılan hesap bir eşiğin altındaysa ve öğretmen zaten varsa ya da başka işlere de yarayacaksa daha verimlidir; ve öğretmen büyüdükçe öğrencinin kaybı önce düşer sonra yükselir. En altta bir kayıt: sayılar iki ayrı çalışmadan gelir; birinci ve ikinci satır bir üretim raporunun ablasyonu, üç kayıt ise 143 milyon ile 12,6 milyar arasında kurulan bir ölçek yasası.](assets/ayni-butcenin-iki-yolu.svg "Şekil 2 — Küçük modeli uzun eğitmek mi, damıtmak mı")

Şekil 2 iki yolu ve yasanın üç kaydını bir arada veriyor; üstteki tablo tek bir üretim raporunun ablasyonundan, alttaki üç kayıt ise ayrı bir ölçek yasasından geliyor.

Üçüncü kayıt **kapasite boşluğu** (capacity gap): öğretmen güçlendikçe öğrencinin kaybı önce düşüyor, bir en iyi noktadan sonra **yükselmeye başlıyor**. Çalışma bunu 143 ve 198 milyonluk öğrencileri 300 milyondan 14 milyara kadar öğretmenlerden damıtarak gösteriyor. Sebebi de ölçüyorlar: öğretmen kendi başarısını artırdıkça öğrencinin ona olan uzaklığı da artıyor; bir noktadan sonra öğrenci öğretmeni modelleyemiyor ve öğretmenin kazancından yararlanamıyor. Yazarların düzeltmesi önemli: boşluk yalnızca boyut farkı değil, **öğrenme kapasitesi** farkı; boyut bunun özel bir hâli.

Alandaki pratik cevaplar bu bulgudan önce de vardı. Seyed Iman Mirzadeh ve arkadaşlarının AAAI 2020'de sunduğu çalışma araya bir "öğretmen asistanı" koyuyor: önce orta boy bir modele damıt, sonra ondan küçüğe. Jang Hyun Cho ve Bharath Hariharan'ın ICCV 2019'da sunduğu çalışma ise daha doğrudan bir öneri veriyor — öğretmeni erken durdurmak, yani onu bilerek daha az güçlü bırakmak.

> **Kendini yokla:** Damıtma, yeterli hesap verildiğinde denetimli öğrenmenin altına inemiyorsa, üretimde neden kullanılıyor?

Çünkü "yeterli hesap" koşulu tam olarak sağlanmayan koşuldur. Küçük bir modeli üretime almanın sebebi çıkarım maliyetidir ve eğitim bütçesi genellikle o modeli doyuracak kadar büyük değildir. Damıtma o eşiğin altındaki bölgede kazandırır; ayrıca öğretmen çoğu zaman zaten eğitilmiştir ve tek bir öğrenci için değil bir model ailesi için kullanılır. Yasanın iki koşulu tam olarak bu iki gerçeği kodluyor.

## Küçültmenin öbür ailesi: budama

Damıtma bir modeli yeniden eğiterek küçültür. Üçüncü bir aile ise mevcut modelden parça atar: **budama** (pruning). 27\. makaledeki kuantizasyon her ağırlığı daha kaba bir ızgaraya yuvarlıyordu; budama bazı ağırlıkları — ya da bütün başları, katmanları, boyutları — tümüyle siler.

Fikrin kuramsal çerçevesini Jonathan Frankle ve Michael Carbin'in ICLR 2019'da sunduğu çalışma verdi: yoğun bir ağın içinde, kendi başlangıç değerleriyle eğitildiğinde tek başına aynı başarıya ulaşabilen seyrek bir alt ağ vardır. Büyük dil modellerinde bunu yeniden eğitmeden yapan yöntemler var — Elias Frantar ve Dan Alistarh'ın ICML 2023'te sunduğu çalışma ile Mingjie Sun ve arkadaşlarının ICLR 2024'te sunduğu, ağırlığın büyüklüğünü girdi aktivasyonunun büyüklüğüyle çarparak sıralayan çok daha basit ölçüt bunun iki örneği.

Ama asıl ilginç olan, budamanın damıtmayla birleştiği yer. Mengzhou Xia ve arkadaşlarının ICLR 2024'te sunduğu çalışma 7 milyarlık bir modeli 1,3 ve 2,7 milyara indiriyor ve sonra kısa bir devam eğitimi yapıyor; aynı boyuttaki modelleri sıfırdan eğitmenin **yüzde 3'ü** kadar hesapla, o modellerin önüne geçiyor. Saurav Muralidharan ve arkadaşlarının NeurIPS 2024'te sunduğu çalışma aynı düzeni damıtmayla tamamlıyor: 15 milyarlık bir modelden 8 ve 4 milyarlık sürümler türetiliyor, budamadan sonraki yeniden eğitimin hedefi öğretmenin çıktısı oluyor ve model başına 40 kata kadar az token yetiyor; üç modelli ailenin toplam eğitim maliyeti 1,8 kat düşüyor ve türetilen modeller sıfırdan eğitilmiş eşlerine göre MMLU'da yüzde 16'ya varan iyileşme veriyor.

Yani üç aile — kuantizasyon, budama, damıtma — birbirinin alternatifi değil; üretimdeki tipik hat üçünü sırayla kullanıyor.

## Neyi devralamaz

Şimdi sınıra gelelim, çünkü damıtmanın en yaygın kullanımı en zayıf olanı.

2023'ten beri yaygın bir pratik var: güçlü, kapalı bir modele sorular sordurup cevaplarını toplamak ve açık bir temel modeli bu cevaplarla eğitmek. Bu, Şekil 1'in üçüncü sütunu — üretilen veri — ve ucuz olduğu için çekici. Yizhong Wang ve arkadaşlarının ACL 2023'te sunduğu çalışma bu üretimin nasıl otomatikleştirileceğini gösterdi ve alandaki pek çok küçük model bu yolla kuruldu.

Arnav Gudibande ve arkadaşlarının ICLR 2024'te sunduğu çalışma bu pratiği doğrudan ölçüyor. 1,5 ile 13 milyar arasında temel modeller, 300 binden 150 milyona kadar taklit token'ı. İlk sonuç cesaret verici: insan değerlendiriciler, taklit modelin çıktılarının yaklaşık yüzde 70'ini öğretmeninkine eşit ya da daha iyi buluyor. İkinci sonuç bunu yıkıyor.

![İki bölmeli bir tablo. Üst bölme, hiç örnek verilmeden sorulan bir olgu sorusu kümesinde ölçülen doğruluk. Satırlar: 7 milyarlık temel model 17, aynı modelin geniş kapsamlı sohbet verisiyle taklit edilmiş hâli 10, aynı modelin hedefli üretilmiş veriyle taklit edilmiş hâli 22; 13 milyarlık temel model 20, geniş kapsamlı taklit 15, hedefli taklit 27; öğretmen model 31. Yüksek olan iyidir. Alt bölme aynı çalışmanın insan değerlendirmesi: taklit modelin çıktılarının yaklaşık yüzde 70'i öğretmene eşit ya da daha iyi bulunuyor ve bu oran taklit verisi arttıkça doyuyor. En altta iki kayıt yan yana duruyor: geniş kapsamlı taklit doğruluğu temel modelin altına düşürüyor, hedefli taklit ise öğretmene yaklaştırıyor; ve insan değerlendirmesi ikisini birbirinden ayıramıyor çünkü ölçtüğü şey biçim.](assets/taklidin-iki-bicimi.svg "Şekil 3 — Aynı temel model, iki ayrı taklit")

Şekil 3'ün üst bölmesi ölçümü veriyor. Geniş kapsamlı sohbet verisiyle eğitilen 7 milyarlık modelin olgu sorularındaki doğruluğu 17'den **10'a düşüyor**; 13 milyarlıkta 20'den 15'e. Aynı öğretmenden, ama yalnızca o görev için üretilmiş veriyle eğitildiğinde ise 22 ve 27'ye çıkıyor; öğretmenin kendisi 31. Yazarların teşhisi: taklit modelleri öğretmenin **biçimini** öğreniyor — akıcı, kendinden emin, iyi yapılandırılmış cevaplar — ama olgusal içeriğini öğrenmiyor. 16\. makaledeki ayrımın en keskin hâli: değerlendiricinin ölçtüğü şey ile modelin öğrendiği şey aynı olmayabilir, ve 73\. makalede gördüğümüz gibi bu, hakemin kendisini de vurur.

Daha genel bir bulgu aynı yöne işaret ediyor. Samuel Stanton ve arkadaşlarının NeurIPS 2021'de sunduğu çalışma iki şeyi ayırıyor: **sadakat**, öğrencinin öğretmenin tahminlerine uyma derecesi; ve genelleme, öğrencinin görülmemiş veride başarısı. Buradaki "sadakat", 31\. makalede kurduğumuz sadakatle aynı sözcük ama başka nesne — orada bir açıklamanın gerçek süreci temsil etmesiydi, burada bir öğrencinin bir öğretmene uyması. Bulgu şu: öğrenci öğretmeni tam olarak temsil edebilecek kapasitedeyken bile ikisinin tahmin dağılımları arasında büyük bir fark kalıyor ve — asıl şaşırtıcı olan — öğretmene daha çok benzemek her zaman daha iyi genellemek anlamına gelmiyor. Yazarların kendi cevabı: damıtma çalışıyor, ama adının söylediği şeyi yapmıyor.

> **Kendini yokla:** Geniş kapsamlı taklit doğruluğu düşürürken hedefli taklit yükseltiyor. Aradaki fark veri miktarı mı?

Hayır; fark, verinin öğretmenin fonksiyonunun hangi bölgesinden örneklendiği. Hedefli veri, öğrencinin sınanacağı dağılımın üzerinden geçiyor ve orada öğretmenin davranışını taşıyor. Geniş kapsamlı sohbet verisi başka bir dağılımın üzerinden geçiyor; öğrenci oradaki biçimi öğrenirken sınanacağı dağılımdan uzaklaşıyor. Ölçüm bunu doğruluyor: taklit verisini artırmak eğriyi düzleştiriyor ya da aşağı çekiyor, temel modeli büyütmek ise yukarı taşıyor.

## 34'ün sorusu: sınır aşılabilir mi?

34\. makalede şunu ölçmüştük: doğrulanabilir ödülle eğitim, modelin çok denemede çözebildiği soru kümesini genişletmiyor, daraltıyordu. Aynı çalışma bir karşı örnek de veriyordu — damıtma o eğrinin üstüne çıkıyordu. Şimdi o iddianın kendi ölçümüne bakabiliriz.

DeepSeek-AI ekibinin Nature'da 2025'te yayımladığı çalışma — 34\. makalede pekiştirmeli öğrenme tarafı için kullanmıştık — ek bilgisinde tam bu karşılaştırmayı yapıyor. Güçlü bir akıl yürütme modeliyle üretilmiş 800 bin örnek, açık temel modelleri ince ayarlamakta kullanılıyor. Sonra aynı temel modele, aynı ekibin kendi büyük ölçekli pekiştirmeli öğrenme düzeni 10 binin üzerinde adım boyunca uygulanıyor. İki yol, aynı 32 milyarlık temel model:

Damıtılan model AIME 2024'te ilk denemede yüzde 72,6, MATH-500'de 94,3, LiveCodeBench'te 57,2. Pekiştirmeli öğrenmeden geçen sürüm sırasıyla 47,0, 91,6 ve 40,2. Aynı boyuttaki bir başka akıl yürütme modeli 50,0, 90,6 ve 41,9. Fark küçük değil ve bütün ölçütlerde aynı yönde. Damıtılan 1,5 milyarlık model bile AIME'de yüzde 28,9 ile, karşılaştırma tabanı olarak konan iki büyük ticari modelin 9,3 ve 16,0'ının önüne geçiyor.

Yazarların kendi çıkarımı iki cümle ve ikisi de kayıtlı: küçük modele doğrudan uygulanan büyük ölçekli pekiştirmeli öğrenme muazzam hesap istiyor ve damıtmanın başarısına ulaşamayabiliyor; fakat **insan zekâsının sınırının ötesine geçmek** için hâlâ daha güçlü temel modeller ve daha büyük ölçekli pekiştirmeli öğrenme gerekebilir. Yani 34'ün işareti ödendi ve sınırı olduğu gibi duruyor: damıtma öğrencinin tavanını yükseltir, ama o tavanı öğretmenin nerede olduğu belirler. Bir sürü küçük modelin toplamı, hiç kimsenin bulmadığı bir çözümü bulmaz.

## Damıtmanın disiplini

**Aktarılan şey etiket değil, fonksiyondur.** Öğrenci öğretmenin bütün sınıflara dağıttığı olasılıkları — ya da ürettiği metni — örnekler; bu yüzden sıcaklık, aynı girdiyi görmek ve uzun eğitim mekanizmanın parçasıdır, ayrıntı değil.

**Daha güçlü öğretmen daha iyi öğrenci demek değildir.** Kapasite boşluğu ölçülmüş bir olgudur ve öğretmeni zayıflatmak ya da araya bir ara model koymak buna verilen pratik cevaplardır.

**Damıtmanın kazandığı yer eşiğin altıdır.** Yeterli veri ve hesapla denetimli öğrenme yakalanır; damıtma, öğrenciye ayrılan bütçe sınırlıyken ve öğretmen zaten varken kazandırır.

**Biçim ile içerik ayrı devralınır.** Geniş kapsamlı taklit üslubu taşır, olgusal doğruluğu taşımaz; ve insan değerlendirmesi ikisini ayırt etmekte zayıftır.

**Küçük modelin hesabı ömür boyudur.** Nikhil Sardana ve arkadaşlarının ICML 2024'te sunduğu çalışma ölçek yasasına çıkarım talebini ekliyor: 13 milyarlık bir model yerine 7 milyarlığı daha uzun eğitmek, ömrü boyunca 2 trilyon token'lık talebi karşılayacak bir model için toplam hesabı 1,7×10²² işlem — yüzde 17 — azaltıyor. 9\. makaledeki sabit bütçe doğrusu, eğitim ile çıkarımın toplamına göre yeniden çiziliyor.

### Sırada ne var

Küçük model artık elimizde. Peki nereye gidiyor? Cevaplardan biri, serinin bu noktasına kadar hep varsaydığımız yerin dışı: veri merkezi değil, cebindeki telefon. Orada 26 ve 28\. makalelerdeki servis hesabının dayandığı tek varsayım — aynı anda çok sayıda isteğe hizmet vermek — ortadan kalkıyor. Bir sonraki makale cihazın bütçesini kuruyor: bellek, bant genişliği, güç ve ısı aynı anda bağlayıcı olduğunda hangi teknik hangi kısıtı gevşetir?

## Kaynakça

- Hinton, G., Vinyals, O. & Dean, J. (2015). *Distilling the Knowledge in a Neural Network*. Hakemli bir konferans bildirisi değil; NIPS 2014 Derin Öğrenme Çalıştayı'nda sunulan çalışma, okunan sürüm arXiv:1503.02531. [Bağlantı](https://arxiv.org/abs/1503.02531)
- Buciluă, C., Caruana, R. & Niculescu-Mizil, A. (2006). *Model Compression*. KDD 2006. [Bağlantı](https://doi.org/10.1145/1150402.1150464)
- Romero, A., Ballas, N., Kahou, S. E., Chassang, A., Gatta, C. & Bengio, Y. (2015). *FitNets: Hints for Thin Deep Nets*. ICLR 2015. [Bağlantı](https://arxiv.org/abs/1412.6550)
- Jiao, X., Yin, Y., Shang, L., Jiang, X., Chen, X., Li, L., Wang, F. & Liu, Q. (2020). *TinyBERT: Distilling BERT for Natural Language Understanding*. EMNLP 2020 Findings. [Bağlantı](https://aclanthology.org/2020.findings-emnlp.372/)
- Kim, Y. & Rush, A. M. (2016). *Sequence-Level Knowledge Distillation*. EMNLP 2016. [Bağlantı](https://aclanthology.org/D16-1139/)
- Ba, J. & Caruana, R. (2014). *Do Deep Nets Really Need to be Deep?*. NeurIPS 2014. [Bağlantı](https://papers.nips.cc/paper_files/paper/2014/hash/b0c355a9dedccb50e5537e8f2e3f0810-Abstract.html)
- Beyer, L., Zhai, X., Royer, A., Markeeva, L., Anil, R. & Kolesnikov, A. (2022). *Knowledge Distillation: A Good Teacher Is Patient and Consistent*. CVPR 2022. [Bağlantı](https://openaccess.thecvf.com/content/CVPR2022/html/Beyer_Knowledge_Distillation_A_Good_Teacher_Is_Patient_and_Consistent_CVPR_2022_paper.html)
- Furlanello, T., Lipton, Z. C., Tschannen, M., Itti, L. & Anandkumar, A. (2018). *Born-Again Neural Networks*. ICML 2018. [Bağlantı](https://proceedings.mlr.press/v80/furlanello18a.html)
- Gemma Ekibi (2024). *Gemma 2: Improving Open Language Models at a Practical Size*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2408.00118. [Bağlantı](https://arxiv.org/abs/2408.00118)
- Busbridge, D., Shidani, A., Weers, F., Ramapuram, J., Littwin, E. & Webb, R. (2025). *Distillation Scaling Laws*. ICML 2025. [Bağlantı](https://proceedings.mlr.press/v267/busbridge25a.html)
- Mirzadeh, S. I., Farajtabar, M., Li, A., Levine, N., Matsukawa, A. & Ghasemzadeh, H. (2020). *Improved Knowledge Distillation via Teacher Assistant*. AAAI 2020. [Bağlantı](https://ojs.aaai.org/index.php/AAAI/article/view/5963)
- Cho, J. H. & Hariharan, B. (2019). *On the Efficacy of Knowledge Distillation*. ICCV 2019. [Bağlantı](https://openaccess.thecvf.com/content_ICCV_2019/html/Cho_On_the_Efficacy_of_Knowledge_Distillation_ICCV_2019_paper.html)
- Frankle, J. & Carbin, M. (2019). *The Lottery Ticket Hypothesis: Finding Sparse, Trainable Neural Networks*. ICLR 2019. [Bağlantı](https://arxiv.org/abs/1803.03635)
- Frantar, E. & Alistarh, D. (2023). *SparseGPT: Massive Language Models Can Be Accurately Pruned in One-Shot*. ICML 2023. [Bağlantı](https://proceedings.mlr.press/v202/frantar23a.html)
- Sun, M., Liu, Z., Bair, A. & Kolter, J. Z. (2024). *A Simple and Effective Pruning Approach for Large Language Models*. ICLR 2024. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/14c856c7a41297804de4c4890e846b25-Abstract-Conference.html)
- Xia, M., Gao, T., Zeng, Z. & Chen, D. (2024). *Sheared LLaMA: Accelerating Language Model Pre-training via Structured Pruning*. ICLR 2024. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/160adf2dc118a920e7858484b92a37d8-Abstract-Conference.html)
- Muralidharan, S., Turuvekere Sreenivas, S., Joshi, R., Chochowski, M., Patwary, M., Shoeybi, M., Catanzaro, B., Kautz, J. & Molchanov, P. (2024). *Compact Language Models via Pruning and Knowledge Distillation*. NeurIPS 2024. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/4822991365c962105b1b95b1107d30e5-Abstract-Conference.html)
- Wang, Y., Kordi, Y., Mishra, S., Liu, A., Smith, N. A., Khashabi, D. & Hajishirzi, H. (2023). *Self-Instruct: Aligning Language Models with Self-Generated Instructions*. ACL 2023. [Bağlantı](https://aclanthology.org/2023.acl-long.754/)
- Gudibande, A., Wallace, E., Snell, C., Geng, X., Liu, H., Abbeel, P., Levine, S. & Song, D. (2024). *The False Promise of Imitating Proprietary Language Models*. ICLR 2024. Okunan sürüm, aynı çalışmanın ön baskısı olan arXiv:2305.15717'dir ve başlığı "…Proprietary LLMs"tir. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/4db16435e3a5a2ef3fc39b8f0d12498d-Abstract-Conference.html)
- Stanton, S., Izmailov, P., Kirichenko, P., Alemi, A. A. & Wilson, A. G. (2021). *Does Knowledge Distillation Really Work?*. NeurIPS 2021. [Bağlantı](https://papers.nips.cc/paper_files/paper/2021/hash/376c6b9ff3bedbbea56751a84fffc10c-Abstract.html)
- DeepSeek-AI, Guo, D., Yang, D. ve ark. (2025). *DeepSeek-R1 incentivizes reasoning in LLMs through reinforcement learning*. Nature 645, s. 633–638. [Bağlantı](https://www.nature.com/articles/s41586-025-09422-z)
- Sardana, N., Portes, J., Doubov, S. & Frankle, J. (2024). *Beyond Chinchilla-Optimal: Accounting for Inference in Language Model Scaling Laws*. ICML 2024. [Bağlantı](https://proceedings.mlr.press/v235/sardana24a.html)
