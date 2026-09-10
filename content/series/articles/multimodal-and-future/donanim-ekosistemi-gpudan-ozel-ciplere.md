---
article_id: article_74090ee6-e644-4abf-87cb-cf7434e9b8ef
title: "Donanım Ekosistemi: GPU'dan Özel Çiplere"
slug: donanim-ekosistemi-gpudan-ozel-ciplere
category: multimodal-and-future
level: intermediate
reading_order: 89
summary: "26'da hesapladığımız 'bayt başına 229 işlem' oranının adı var: işlem yoğunluğu, ve onunla kurulan çatı çizgisi modeli 2009'dan beri donanım okumanın standart aracı. Önce o araç kuruluyor ve bir dil modelinin iki aşaması ile cihaz durumu aynı düzleme yerleştiriliyor. Ardından bugünkü bütün darboğazların tek kaynağı: yirmi yılda hesap altmış bin kat, bellek bandı yüz kat, kartlar arası bant otuz kat büyüdü. Sonra hızlandırıcının tanımı — bir çipi hızlı yapan şey eklenen değil, çıkarılan: önbellek, dal öngörüsü, sıra dışı yürütme. Hassasiyetin bir donanım sözleşmesi olduğu, ölçeğin üçüncü ekseninin kartlar arası bağ olduğu ve en iyi mühendisliğin bile tepe hızın yarısında çalıştığı ölçümlerle veriliyor. Kapanışta donanım piyangosu: hangi araştırma fikrinin kazandığını kısmen çipler belirliyor."
tags:
  - donanim
  - cati-cizgisi
  - bellek-duvari
  - alana-ozel-mimari
  - hassasiyet
content_hash: sha256:f895bdb9c9c45cad173e7f6d546ca591ff6671824291b41939fbce058034f5d4
classification_version: 1
classification_batch: 21
---
## Bayt başına 229 işlem neydi

88\. makalede cihazda dört kısıt saymıştık ve üçü doğrudan donanımdan geliyordu. Aynı makalede 26\. makalenin bir hesabını da geri çağırmıştık: bir hızlandırıcının saniyedeki işlem kapasitesi, yavaş belleğinden saniyede okuyabildiği bayta bölündüğünde çıkan sayı — yaklaşık 229. O sayıyı orada bir muhasebe aracı olarak kullanmıştık.

Aslında bilgisayar mimarisinin merkezî kavramlarından biriydi. Bu makale onu adıyla kuruyor, üç ayrı eğrinin yirmi yılda nasıl ayrıştığını gösteriyor ve bir çipi "hızlandırıcı" yapan şeyin ne olduğunu tanımlıyor. Faz 13'te eğitim sistemlerinin mühendisliğine ayrı ayrı bakacağız; burada gereken, manzaranın kendisi.

## Çatı çizgisi

Samuel Williams, Andrew Waterman ve David Patterson'ın 2009'da Communications of the ACM'de yayımladığı çalışma iki eksenli, çok basit bir model kuruyor.

Yatay eksen **işlem yoğunluğu**: bir hesabın, ana bellekten okuduğu her bayt için yaptığı işlem sayısı. Dikey eksen ulaşılabilir hız. Modelin varsayımı şu: veri çipin içindeki önbelleğe sığmıyorsa hesap ya işlem gücüyle ya bellek bant genişliğiyle sınırlıdır. Bant genişliği bayt/saniye olduğuna göre, hız ile yoğunluğun çarpımı bant genişliğini verir; bu da grafikte eğik bir doğru demektir. İşlem gücü ise bir tavan, yani yatay bir çizgi. İkisinin kesiştiği yere **sırt noktası** deniyor: tepe hıza ulaşmak için gereken en küçük işlem yoğunluğu.

![Yatay ekseni işlem yoğunluğu, dikey ekseni ulaşılabilir hız olan bir çatı çizgisi şeması; iki eksen de logaritmiktir. Sol alttan yükselen eğik bir doğru bellek bant genişliğinin koyduğu sınırı, onun bittiği yerden sağa uzanan yatay bir çizgi işlem gücünün koyduğu tavanı gösterir. İkisinin kesiştiği yer sırt noktası olarak işaretlenmiştir ve değeri okunan bayt başına 229 işlemdir. Eğik doğrunun üzerinde üç konum işaretli. En solda cihazda üretim: yığın bir olduğu için işlem yoğunluğu birdir ve tavanın çok altındadır. Ortada bulutta üretim: yığın büyüdükçe yoğunluk da büyür ve nokta sağa kayar. Sağda ön dolum: bütün dizi bir kerede işlendiği için yoğunluk yüksektir ve nokta yatay çizginin altında, tavana yakın durur. En altta bir kayıt: çizimin biçimi şematiktir, ölçülmüş olan sırt noktasının değeridir.](assets/cati-cizgisi-ve-iki-asama.svg "Şekil 1 — Aynı çipte üç ayrı konum")

Şekil 1 bu düzlemi ve seride kurduğumuz üç durumu bir arada gösteriyor. Bir hesabın nerede durduğu, hangi eniyilemenin işe yarayacağını da söyler: sol tarafta işlem sayısını azaltmanın faydası yoktur, çünkü çip zaten beklemektedir.

Sayılarla. Çalışmanın incelediği iki yaygın işlemcinin sırt noktaları 4,4 ve 6,7 — yani ana bellekten okunan sekiz baytlık her sayı için 35 ile 55 arasında işlem yapılması gerekiyor ki çip tepe hızına ulaşsın. Ölçtükleri dört bilimsel hesap çekirdeğinin dört makinedeki on altı bileşiminde ise yoğunluklar 0,25 ile 1,64 arasında, ortancası 0,60. Yani makinelerin istediğiyle işlerin verdiği arasında yaklaşık bir büyüklük mertebesi fark var. Yazarların vardığı sonuç bu yüzden önemli: sırt noktası, saat hızından da tepe performanstan da daha iyi bir başarı öngörücüsü.

Aynı hesabı bizim örneğimizde de yapabiliriz. 26\. makalede adım adım üretimin muhasebesini çıkarmıştık: ağırlıklar 16 bitteyse token başına 2N bayt okunur ve yığındaki her istek için yaklaşık 2N işlem yapılır, dolayısıyla işlem yoğunluğu tam olarak yığın büyüklüğüne eşittir. Sırt noktası 229 olan bir çipte bunun anlamı tek bir sayı: o çipin tepe hızına ulaşmak için yığında **229 istek** olması gerekir. Yığın 32 ise çip kapasitesinin yaklaşık yedide birini, yığın 1 ise iki yüz yirmi dokuzda birini kullanıyorsun. 28\. makaledeki bütün çizelgeleme mühendisliğinin tek amacı bu paydayı sırt noktasına yaklaştırmaktı.

Modelin ne söylemediğini de yazmak gerekiyor, çünkü basitliği hem gücü hem sınırı. Çatı çizgisi tek bir varsayıma dayanır: veri çipin içindeki belleğe sığmaz. Sığdığında model bozulur — ve 86\. makaledeki tam dikkat algoritmasının yaptığı tam olarak buydu: puan tablosunu ana belleğe hiç yazmayıp işi çip içi belleğe sığacak parçalara böldü, yani hesabın işlem yoğunluğunu değiştirdi. Model ayrıca gecikme hakkında hiçbir şey söylemez; yalnızca birim zamanda çıkarılan işi konuşur. 28\. makaledeki gecikme ile iş hacmi ayrımı bu düzlemde görünmez ve ayrıca düşünülmelidir.

## Üç ıraksayan üstel

Peki bu fark neden kapanmıyor? Amir Gholami ve arkadaşlarının IEEE Micro'da 2024'te yayımladığı çalışma cevabı üç eğriyi üst üste koyarak veriyor.

Son yirmi yılda donanımın tepe işlem kapasitesi yaklaşık 60.000 kat arttı — iki yılda 3 kat. Aynı sürede DRAM bant genişliği 100 kat (iki yılda 1,6), kartlar arası iletişim bandı ise 30 kat (iki yılda 1,4) arttı. Üçü de üstel büyüyor, ama üsler farklı; ve iki farklı üstelin arası da üstel büyür.

![Beş satırlı bir tablo; satırlar birlikte büyüyen fakat farklı hızlarda büyüyen beş büyüklük. Donanımın tepe işlem kapasitesi yirmi yılda yaklaşık 60.000 kat, yani iki yılda 3,0 kat arttı. DRAM bant genişliği aynı sürede 100 kat, yani iki yılda 1,6 kat arttı. Kartlar arası iletişim bandı 30 kat, yani iki yılda 1,4 kat arttı. Büyük dil modellerinin parametre sayısı 2018 ile 2022 arasında iki yılda 410 kat arttı. Tek bir hızlandırıcının belleği ise iki yılda yalnızca 2 kat arttı. En altta bir kayıt: 26, 27, 28, 85, 86 ve 88. makalelerde ayrı ayrı karşılaştığımız bütün darboğazlar bu tablonun satırları arasındaki farktan çıkıyor; bir çipin tepe hızı hızlı büyüdü, o hıza veri taşıyan her şey yavaş.](assets/uc-iraksayan-ustel.svg "Şekil 2 — Hepsi büyüdü, ama farklı hızlarda")

Şekil 2'nin son iki satırı işi bitiriyor. Aynı çalışmanın ölçümüne göre büyük Transformer modellerinin parametre sayısı 2018–2022 aralığında iki yılda 410 kat büyürken, tek bir hızlandırıcının belleği iki yılda yalnızca 2 kat büyüdü. Eğitim için gereken hesap ise iki yılda 750 kat arttı.

Bu tablo, serinin bu bölümünde ayrı ayrı gördüğümüz şeylerin tek kaynağı. 26\. makaledeki "adım adım üretim bellek bant genişliğiyle sınırlıdır", 27\. makaledeki bellek duvarı, 85\. makaledeki hepsi-hepsiye iletişim maliyeti, 86\. makaledeki "işlem sayısını azaltmak duvar saatini azaltmıyor" uyarısı ve 88\. makaledeki cihaz bütçesi — hepsi aynı üç eğrinin ayrışmasının farklı yerlerdeki görünüşü.

> **Kendini yokla:** Yeni bir mimari, aynı kaliteyi yarı işlemle veriyor. Bu, çalışma süresinin de yarıya ineceği anlamına gelir mi?

Hayır, ve nedeni Şekil 1'de duruyor. Hesap sırt noktasının solundaysa çip zaten bellek bekliyordur; işlem sayısını azaltmak boşta geçen süreyi kısaltmaz. Kazanç ancak eniyileme hesabın işlem yoğunluğunu da yükseltiyorsa — ya da taşınan baytı azaltıyorsa — duvar saatine yansır. 86\. makaledeki tam dikkat algoritmasının işlem sayısını hiç azaltmadan hızlanma sağlaması bunun tersinden örneğiydi.

## Hızlandırıcı ne çıkarır

Şimdi asıl soruya gelelim: bir çipi bu iş için "hızlı" yapan nedir?

Sorunun bugün bu biçimde sorulmasının bir sebebi var. John Hennessy ve David Patterson'ın Communications of the ACM'de 2019'da yayımladığı derleme, genel amaçlı işlemcilerde tek iş parçacığının başarımını yıllardır büyüten kaynakların — daha küçük transistör, daha yüksek saat, daha derin ardışık düzen — tükendiğini ve mimarinin önündeki açık yolun **alana özel mimariler** olduğunu savunuyor. Yani hızlandırıcılar bir moda değil, genel amaçlı yolun kapanmasının sonucu.

Norman Jouppi ve arkadaşlarının ISCA 2017'de sunduğu çalışma, Google'ın veri merkezlerinde 2015'ten beri çalışan ilk özel çipin ölçümlerini veriyor ve cevabı beklenmedik bir yerde buluyor. Çipin kalbi 65.536 adet 8 bitlik çarpma-toplama biriminden oluşan bir matris birimi; tepe kapasitesi saniyede 92 trilyon işlem. Ölçülen sonuç, aynı dönemin işlemcisine ve grafik kartına göre çıkarımda 15 ile 30 kat hız, vat başına işlemde 30 ile 80 kat iyileşme.

Bu kazancın nereden geldiğine dair yazarların kendi cümlesi şudur: azlık, alana özel bir işlemcinin erdemidir. Çipte önbellek yok, dal öngörüsü yok, sıra dışı yürütme yok, çok iş parçacıklı çalışma yok, tahmini önyükleme yok, bağlam değiştirme yok. Bunların hepsi genel amaçlı işlemcilerde ortalama durumu iyileştirmek için vardır ve transistör ile enerji harcarlar; tek bir işi yapan bir çipte gereksizdirler.

![İki sütunlu karşılaştırma tablosu; sütunlar genel amaçlı işlemci ile alana özel hızlandırıcı. Çipte ne var satırında: genel amaçlı işlemcide önbellek hiyerarşisi, dal öngörüsü, sıra dışı yürütme, çok iş parçacığı ve bağlam değiştirme bulunur; alana özel hızlandırıcıda bunların hiçbiri yoktur, yerine büyük bir matris çarpma birimi ve yazılımla yönetilen çip içi bellek vardır. Neye eniyilendiği satırında: genel amaçlı işlemci ortalama durumu, hızlandırıcı ise yüzde 99'luk gecikme dilimini eniyiler. Sırt noktası satırında: 2009'da ölçülen iki yaygın işlemcide 4,4 ve 6,7, ilk özel çipte ağırlık belleğinden okunan bayt başına 1350. Gecikme sınırı altında ne olduğu satırında: 7 milisaniyelik yüzde 99'luk sınır konduğunda işlemci ve grafik kartı yığın büyüklüğünü 200 yerine 16 kullanmak zorunda kalıyor ve ulaşabilecekleri en yüksek iş hacminin yüzde 42 ile yüzde 37'sinde çalışıyorlar; özel çip aynı sınır altında yüzde 80'inde çalışıyor. En altta bir kayıt: hızlandırıcıyı hızlı yapan şey eklenen değil, çıkarılan.](assets/genel-amacli-ve-alana-ozel.svg "Şekil 3 — Bir çipi hızlandırıcı yapan şey, içinde olmayanlar")

Şekil 3'ün son satırı, 28\. makaledeki gecikme–iş hacmi ayrımının donanımdaki karşılığı. Aynı çalışma, ölçtüğü uygulamalardan birine 7 milisaniyelik bir yüzde 99'luk gecikme sınırı koyuyor — ürün ekibinin isteği. Bu sınır altında işlemci ve grafik kartı yığın büyüklüğünü 200 yerine 16'da tutmak zorunda kalıyor ve ulaşabilecekleri en yüksek iş hacminin sırasıyla yüzde 42 ve 37'sinde çalışıyorlar. Özel çip aynı sınır altında yüzde 80'inde. Yani "daha hızlı" olmak yalnızca tepe hızla değil, bir gecikme sınırının altında ne kadar iş çıkarabildiğinle ölçülüyor.

Özelleşmenin bedeli de aynı çalışmada duruyor ve bir uyarı olarak okunmalı. Yazarlar, o yıllarda mimarların büyük bölümünün evrişimli ağları hızlandırmaya çalıştığını, oysa kendi veri merkezlerindeki iş yükünün yalnızca yüzde 5'inin evrişimli ağlar olduğunu bildiriyorlar. Bir çipi bir iş yüküne göre tasarlamak, o iş yükünün doğru tahmin edilmiş olmasını gerektirir; tasarımdan üretime geçen yıllar içinde alan yön değiştirirse esneklik diye bir yedek kalmaz.

Aynı çipin çatı çizgisi de öğretici: sırt noktası, ağırlık belleğinden okunan bayt başına 1350 işlem — yani 2009'daki 4,4'ün yüzlerce katı sağda. Özelleşme tavanı yükseltiyor, fakat tavana ulaşmak için gereken yoğunluğu da yükseltiyor; sonuç olarak incelenen altı uygulamanın dördü o çipte hâlâ bellek bant genişliğiyle sınırlı.

## Hassasiyet bir donanım sözleşmesidir

27\. makalede kuantizasyonu bir yazılım tekniği olarak kurmuştuk. Donanım tarafından bakınca aynı şey bir sözleşme: bir sayı biçimi ancak çip onu doğrudan çarpabiliyorsa hız kazandırır.

Paulius Micikevicius ve arkadaşlarının ICLR 2018'de sunduğu çalışma bu sözleşmenin ilk yaygın hâlini kuruyor. Ağırlıklar, aktivasyonlar ve gradyanlar 16 bitte tutuluyor — bu hem belleği hem taşınan baytı yarıya indiriyor — fakat ağırlıkların 32 bitlik bir ana kopyası saklanıyor ve kayıp, gradyanlar 16 bitin alt sınırında yok olmasın diye bir çarpanla ölçekleniyor. İki ek önlem olmadan eğitim ıraksıyor; onlarla birlikte doğruluk korunuyor.

Bu, 27\. makaledeki kaydın donanım tarafındaki açıklaması. Orada "yalnızca ağırlığı kuantize eden yöntemlerde çarpma hâlâ 16 bitte yapılır, kazanılan şey taşımadır" demiştik. Sebebi burada: çarpmanın da kazanç sağlaması için çipin o genişlikte bir çarpma birimi taşıması gerekir. 88\. makaledeki doku sıkıştırma örneği aynı ilkenin uç hâliydi — biçim, çözücüsü zaten donanımda olduğu için bedelsizdi.

## Üçüncü eksen: kartlar arası

Tek çipin hesabı ve belleği iki eksendi. Ölçek büyüdüğünde üçüncüsü bağlayıcı hâle geliyor: kartlar arasındaki bağ. Şekil 2'de en yavaş büyüyen satır oydu.

İki ölçüm bunun ağırlığını gösteriyor. Samyam Rajbhandari ve arkadaşlarının SC 2020'de sunduğu çalışma, eğitim durumunu — parametre, gradyan ve eniyileyici durumu — kartlar arasında bölerek 400 karta 100 milyar parametreli modeller sığdırıyor ve saniyede 15 katrilyon işleme ulaşıyor. Deepak Narayanan ve arkadaşlarının SC 2021'de sunduğu çalışma üç farklı paralellik biçimini birlikte çizelgeliyor ve 3.072 kartta 1 trilyon parametreli bir model üzerinde saniyede 502 katrilyon işlem bildiriyor.

Bu ikinci sayının yanındaki kayıt daha öğretici: kart başına elde edilen verim, çipin teorik tepe hızının **yüzde 52'si**. Yani alanın en iyi mühendisliğe sahip eğitim koşularında bile bir çip zamanın yaklaşık yarısını veri bekleyerek geçiriyor. Şekil 1'in dili bunu tek cümlede söyler: iş, sırt noktasının solunda kalıyor.

Bu eksenin hangi iş yükünde ne kadar zorlandığı da iş yükünün kendisine bağlı. 85\. makalede uzmanlar karışımının her katmanda bir hepsi-hepsiye iletişim doğurduğunu görmüştük. Donanım tarafından bakınca bunun neden pahalı olduğu netleşiyor: geri yayılımda kullanılan toplama deseni, kartların halka ya da ızgara biçiminde dizildiği topolojilere iyi oturur; hepsi-hepsiye deseni ise ağı ikiye böldüğünde iki yarı arasından geçmesi gereken bant genişliğini — kesim bandını — zorlar. Yani bir mimari kararı, kümenin kablolamasına kadar iniyor.

Aynı sorun donanım tarafından da saldırılıyor. Jouppi ve arkadaşlarının ISCA 2023'te sunduğu çalışma, 4.096 çipli bir sistemde kartlar arası topolojiyi optik anahtarlarla çalışma anında yeniden yapılandırıyor; bunun bedeli sistem maliyetinin yüzde 5'inden, gücünün yüzde 3'ünden az ve bu esneklikle bir dil modeli tepe hızın ortalama yüzde 60'ında eğitilebiliyor. Aynı çipte, embedding tablolarını işleyen ayrı bir birim çip alanının ve gücünün yalnızca yüzde 5'ini kaplarken o iş sınıfını 5–7 kat hızlandırıyor: özelleşmenin ikinci kez, çipin içinde tekrarlanması.

## Donanım piyangosu

Buraya kadar donanımın modeli nasıl kısıtladığını anlattık. Ters yön de var ve daha az konuşuluyor.

Sara Hooker'ın Communications of the ACM'de 2021'de yayımladığı makale buna **donanım piyangosu** adını veriyor: bir araştırma fikri, alternatiflerinden üstün olduğu için değil, o gün var olan donanım ve yazılıma uyduğu için kazanabilir. Kendi verdiği örnek keskin: 2012'de 16.000 işlemci çekirdeğiyle yapılan bir görüntü sınıflandırma çalışmasının aynısı, bir yıl sonra iki işlemci çekirdeği ve dört grafik kartıyla yapıldı. Grafik kartları yapay zekâ için tasarlanmamıştı; matris çarpımında iyi oldukları için derin ağların önünü açtılar.

Madalyonun öbür yüzü de aynı makalede. Matris çarpımına aşırı eniyilenmiş hızlandırıcılarda, o kalıbın dışına çıkan mimarilerin başarımı — yazarın verdiği örnek kapsül ağları — işlemcide makul kalırken hızlandırıcıda uçurumdan düşüyor. 86\. makalede alternatif mimarilerin işlem sayısını azaltmasına rağmen duvar saatinde kazanamamasının bir sebebi de buydu: cetvelin kendisi bir seçim.

Bu bağın yalnızca donanımdan ibaret olmadığını da eklemek gerekiyor. Bir fikrin bugün denenebilir olması, onu yazacağın kütüphanenin, derleyicinin ve çekirdeklerin de o kalıba göre yazılmış olmasına bağlı. 88\. makaledeki iki çerçevenin aynı modelde 3,53 kata varan fark vermesi bunun küçük ölçekli bir örneğiydi. Donanım ile yazılım birlikte bir yatak açıyor ve araştırma o yatağın içinde akıyor.

> **Kendini yokla:** Yeni bir mimari fikri, mevcut hızlandırıcılarda yavaş çalışıyor. Bu, fikrin kötü olduğunu mu gösterir?

Göstermez; ölçümün hangi donanımda yapıldığını gösterir. İki ayrı iddia karışıyor — "bu fikir daha az iş yaptırıyor" ile "bu fikir bugünkü çiplerde daha hızlı çalışıyor". Birincisi mimarinin özelliği, ikincisi mimari ile donanımın birlikte özelliği. Bir sonucu okurken hangisinin ölçüldüğü söylenmelidir; ve bir fikrin yaygınlaşamaması, ölçülen ikinci iddianın sonucudur, birincinin değil.

## Donanımı okumanın disiplini

**Bir hesabın hızını sırt noktasına göre oku.** İşlem yoğunluğu makinenin sırt noktasının solundaysa iş bellek bant genişliğiyle sınırlıdır ve işlem azaltmak bir şey kazandırmaz.

**Üç eğri farklı hızlarda büyüdü.** Hesap iki yılda 3, bellek bandı 1,6, kartlar arası bant 1,4 kat; bugün bir sistemde karşılaşılan darboğazların çoğu bu ayrışmanın doğrudan sonucu.

**Hızlandırıcıyı hızlı yapan şey çıkarılanlardır.** Önbellek, dal öngörüsü, sıra dışı yürütme ve bağlam değiştirme ortalama durumu iyileştirir; tek işi yapan bir çipte alan ve enerji harcarlar.

**Tepe hız bir sayı, ulaşılan hız başka bir sayıdır.** Alanın en iyi eğitim koşularında kart başına verim teorik tepenin yarısı mertebesindedir; bir hızlandırıcıyı tepe değeriyle karşılaştırmak yanıltıcıdır.

**Bir sayı biçimi ancak donanımda karşılığı varsa hız verir.** Aksi hâlde kazanılan şey yalnızca taşınan bayttır.

**Çatı çizgisi bir modeldir, bir yasa değil.** Verinin çip içi belleğe sığdığı durumu ve gecikmeyi kapsamaz; ikisi de ayrıca düşünülür.

**Donanım hangi fikrin kazanacağını da etkiler.** Bir mimarinin bugünkü çiplerde yavaş olması, o mimarinin daha az iş yaptırmadığı anlamına gelmez.

### Sırada ne var

Bu makale boyunca hep aynı birimlerle konuştuk: işlem, bayt, saniye. Bir birim daha var ve bu üçünün altında duruyor: vat. Bir çipin yaptığı her işlem elektrik harcar, harcanan elektriğin bir karbon karşılığı vardır ve o karşılık hangi şebekeden çekildiğine bağlıdır. Bir sonraki makale bu hesabı kuruyor — ve asıl mesele, aynı eğitim koşusunun neden dört ayrı sayıyla bildirilebildiği.

## Kaynakça

- Williams, S., Waterman, A. & Patterson, D. (2009). *Roofline: An Insightful Visual Performance Model for Multicore Architectures*. Communications of the ACM 52(4), s. 65–76. [Bağlantı](https://doi.org/10.1145/1498765.1498785)
- Gholami, A., Yao, Z., Kim, S., Hooper, C., Mahoney, M. W. & Keutzer, K. (2024). *AI and Memory Wall*. IEEE Micro 44(3), s. 33–39. [Bağlantı](https://arxiv.org/abs/2403.14123)
- Hennessy, J. L. & Patterson, D. A. (2019). *A New Golden Age for Computer Architecture*. Communications of the ACM 62(2), s. 48–60. [Bağlantı](https://doi.org/10.1145/3282307)
- Jouppi, N. P., Young, C., Patil, N., Patterson, D. ve ark. (2017). *In-Datacenter Performance Analysis of a Tensor Processing Unit*. ISCA 2017. [Bağlantı](https://doi.org/10.1145/3079856.3080246)
- Micikevicius, P., Narang, S., Alben, J., Diamos, G., Elsen, E., Garcia, D., Ginsburg, B., Houston, M., Kuchaiev, O., Venkatesh, G. & Wu, H. (2018). *Mixed Precision Training*. ICLR 2018. [Bağlantı](https://arxiv.org/abs/1710.03740)
- Rajbhandari, S., Rasley, J., Ruwase, O. & He, Y. (2020). *ZeRO: Memory Optimizations Toward Training Trillion Parameter Models*. SC 2020. [Bağlantı](https://doi.org/10.1109/SC41405.2020.00024)
- Narayanan, D., Shoeybi, M., Casper, J., LeGresley, P., Patwary, M., Korthikanti, V., Vainbrand, D., Kashinkunti, P., Bernauer, J., Catanzaro, B., Phanishayee, A. & Zaharia, M. (2021). *Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM*. SC 2021. [Bağlantı](https://doi.org/10.1145/3458817.3476209)
- Jouppi, N., Kurian, G., Li, S., Ma, P., Nagarajan, R., Nai, L., Patil, N., Subramanian, S., Swing, A., Towles, B., Young, C., Zhou, X., Zhou, Z. & Patterson, D. (2023). *TPU v4: An Optically Reconfigurable Supercomputer for Machine Learning with Hardware Support for Embeddings*. ISCA 2023. [Bağlantı](https://doi.org/10.1145/3579371.3589350)
- Hooker, S. (2021). *The Hardware Lottery*. Communications of the ACM 64(12), s. 58–65. [Bağlantı](https://doi.org/10.1145/3467017)
