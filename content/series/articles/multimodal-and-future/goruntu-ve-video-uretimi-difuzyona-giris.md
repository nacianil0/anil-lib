---
article_id: article_82d5dc14-e5af-46cf-8d49-08c01632e40e
title: "Görüntü ve Video Üretimi: Difüzyona Giriş"
slug: goruntu-ve-video-uretimi-difuzyona-giris
category: multimodal-and-future
level: intermediate
reading_order: 83
summary: "Üretimin ters yönünü kuruyor: token token değil, bütün tuvali defalarca düzelterek. Bozma yönünün tasarım, geri getirme yönünün öğrenilen taraf olduğunu; gürültüyü tahmin etmenin neden yeterli bir hedef olduğunu; adım sayısının modelin değil örnekleyicinin özelliği olduğunu aynı modelin iki örnekleyicisinde ölçülmüş sayılarla gösteriyor (on adımda 367,43 ile 13,36). Maliyetin pikselden gizil uzaya taşınmasını, omurganın U-Net'ten Transformer'a geçişini (118,6 Gflop'ta 2,27), ve kılavuzluğun 10'daki sıcaklık düğmesinin buradaki hâli olduğunu tek modelde üç ayarla veriyor: sadakat 0,67'den 0,83'e çıkarken çeşitlilik 0,67'den 0,57'ye iniyor. Zaman ekseni eklenince neyin değiştiğini, ve cetvelin kendisinin — FID'in — neden yanlı olduğunu kapanışta ölçüyle bırakıyor."
tags:
  - difuzyon
  - goruntu-uretimi
  - video-uretimi
  - kilavuzluk
  - ornekleyici
content_hash: sha256:7117c574b3a3957c1927f70460671191ca08d3e035482e0edcb56301e7781520
classification_version: 1
classification_batch: 20
---
## Ters yöndeki soru

Son iki makale aynı hamleyi iki kez yaptı: bir modaliteyi token'a çevirip dil modeline anlattı. Görüntü sabit boyutlu yamalara bölündü, ses iki token ailesine ayrıldı, ikisi de bir dizinin içine yerleşti. Şimdi ters yön: model bir görüntüyü ya da videoyu **üretecek**.

Akla gelen ilk cevap, aynı yolu tersine yürümek olurdu. Metinde üretim 10\. makalede kurulmuştu: model bir sonraki token'ın olasılık dağılımını verir, o dağılımdan örneklenir, seçilen token diziye eklenir, döngü devam eder. Görüntü token'ları da varsa aynı döngü kurulabilir.

Kurulabilir, ve kuruluyor — bir sonraki makalenin konusu tam olarak bu. Ama görüntü tarafında baskın aile uzun süre başka bir yerden geldi ve mantığı bambaşka. O ailenin fikri şu: resmi parça parça yazmaya çalışma. Bütün tuvali birden, kötü bir hâlde üret, sonra defalarca düzelt.

Öncesinde sahnede başka bir aile vardı. Ian Goodfellow ve arkadaşlarının NeurIPS 2014'te sunduğu çalışma **düşmanca üretken ağ** (generative adversarial network) düzenini kurmuştu: bir üretici ile bir ayırt edici, biri diğerini kandırmaya diğeri kandırılmamaya çalışarak birlikte eğitilir. Düzen yüksek çözünürlüklü görüntü üretimini ilk kez mümkün kıldı ama iki bilinen zaafı vardı — eğitimin kararsızlığı ve dağılımın bir kısmını hiç kapsamama eğilimi. Difüzyonun onu geride bırakması bir makalenin başlığında ilan edildi ve o çalışmaya birazdan döneceğiz.

Bu makale o ailenin nasıl çalıştığını kuruyor. Üç soru: geri getirme neden öğrenilebilir bir iş? Bedeli nerede ödeniyor? Ve üretilen şeyin "iyi" olduğunu kim, neye göre söylüyor?

## Bozmak tasarımdır, geri getirmek öğrenilir

Fikrin ilk hâli Jascha Sohl-Dickstein ve arkadaşlarının ICML 2015'te sunduğu çalışmada duruyor ve adını denge dışı termodinamikten alıyor. Kurulum iki yönlü. **İleri yön** veriyi adım adım bozar: her adımda görüntüye küçük bir miktar Gauss gürültüsü eklenir, yeterince adım sonra geriye yapısı olmayan bir gürültüden başka bir şey kalmaz. **Geri yön** bu bozulmayı tersine çevirmeyi öğrenir.

Asıl mesele ileri yönün **öğrenilmiyor** olması. Gürültü çizelgesini biz seçiyoruz, dolayısıyla ileri yönde bilinmeyen hiçbir şey yok. Üstelik ileri yön kapalı biçimde yazılabiliyor: sıfırıncı adımdaki temiz görüntüden `t`'inci adımdaki bozuk görüntüye tek hamlede gidilir — bozuk görüntü, temiz görüntünün bir katsayıyla küçültülmüş hâli artı gürültünün başka bir katsayıyla ölçeklenmiş hâlidir, ve iki katsayının kareleri toplamı birdir. Küçük bir sayısal örnek, tanım gereği: sinyalin payı 0,25'e düştüğü adımda görüntünün katsayısı 0,5, gürültününki yaklaşık 0,87'dir; yani o adımdaki resim, temiz resmin yarısı ile gürültünün epeyce fazlasının toplamıdır.

Jonathan Ho ve arkadaşlarının NeurIPS 2020'de sunduğu çalışma bu çerçeveyi çalışır hâle getiren sadeleştirmeyi yaptı. Model, bir önceki adımın görüntüsünü tahmin etmeye çalışmıyor; **eklenmiş olan gürültüyü** tahmin ediyor. Eğitim döngüsü sade: bir eğitim görüntüsü al, rastgele bir adım numarası seç, o adıma karşılık gelen gürültüyü ekle, modele bozuk görüntüyü ve adım numarasını ver, "hangi gürültüyü ekledim" diye sor. Kayıp, gerçek gürültü ile tahmin edilen gürültü arasındaki ortalama karesel hata — 2\. makalede kurduğumuz kaybın burada, başka bir soruya bağlanmış hâli.

Sayılar çalışmanın kendisinden: adım sayısı bin, gürültü çizelgesi 0,0001'den 0,02'ye doğrusal olarak artıyor, ve CIFAR-10 üzerinde 3,17 FID ile 9,46 Inception puanı elde ediliyor. Aynı yıllarda Yang Song ve Stefano Ermon NeurIPS 2019'da başka bir kapıdan giriyordu: veri yoğunluğunun logaritmasının gradyanını tahmin et ve onu izle; alanda bu niceliğe **skor** deniyor ve 6\. makaledeki dikkat skorlarıyla hiçbir ilgisi yoktur, yalnızca sözcük aynıdır. Song ve arkadaşlarının ICLR 2021'de sunduğu çalışma ikisinin aynı stokastik diferansiyel denklemin iki ayrıklaştırması olduğunu gösterdi. Bunun pratik sonucu birazdan işimize yarayacak: **adım sayısı modelin bir özelliği değil.**

![İki satırlı akış şeması. Üst satır ileri yön: soldan sağa temiz görüntü, azıcık gürültülü, çok gürültülü ve saf gürültü kutuları; üzerinde iki kayıt — çizelge tasarımdır, öğrenilmez; ve kapalı biçim, yani sıfırıncı adımdan herhangi bir adıma tek hamlede gidilir. Alt satır geri yön sağdan sola aynı kutuları izler; üzerinde üç kayıt — her adımda ağ eklenmiş gürültüyü tahmin eder, kayıp gerçek gürültü ile tahmin arasındaki ortalama karesel hatadır, ve tek bir ağ bütün gürültü düzeylerini öğrenir çünkü adım numarası ağa girdi olarak verilir. Sağ altta bir kutu: sinyal payı 0,25 olan adımda görüntünün katsayısı 0,5, gürültünün katsayısı yaklaşık 0,87.](assets/bozmak-ve-geri-getirmek.svg "Şekil 1 — İleri yön tasarımdır, geri yön öğrenilir")

Şekil 1'in sağ üstündeki not, düzenin neden bu kadar sade durabildiğini açıklıyor. Tek bir ağ, bin farklı zorluk derecesindeki aynı soruyu cevaplıyor: "bu resme ne kadar gürültü karışmış ve hangisi?" Gürültü düzeyi ağa girdi olarak verildiği için ağ hangi zorlukta çalıştığını biliyor.

> **Kendini yokla:** İleri yöndeki bozma adımının öğrenilmesine neden gerek yok?

Çünkü orada bilinmeyen yok: gürültüyü ekleyen biziz, çizelgeyi de biz seçiyoruz. Bilinmeyen olan geri yön. Asıl kurnazlık şurada: adımlar yeterince küçük tutulursa, bir Gauss adımının tersi de yaklaşık olarak Gauss'tur. Yani geri yöndeki her adım, ileri yöndeki adımla **aynı basit biçime** sahip olabilir ve ağın işi yalnızca o biçimin ortalamasını kestirmeye iner. Adım sayısının binlerle ölçülmesinin sebebi budur: her adım küçük olsun ki tersi kolay bir biçimde yazılabilsin.

## Bedel adım sayısıdır

26\. makalede çıkarımın iki ayrı darboğazı olduğunu görmüştük: bir kerelik ön dolum ve adım adım üretim. Burada her şey ikinci türden. Tek bir görüntü için ağ bin kez çalıştırılıyor, ve adımlar birbirini beklemek zorunda.

Jiaming Song ve arkadaşlarının ICLR 2021'de sunduğu çalışma bu bedeli **modeli yeniden eğitmeden** düşürdü. Gözlem şu: eğitim hedefi, ileri yöndeki sürecin Markov olmasına aslında bağlı değil. O hâlde aynı eğitilmiş ağ, adımları atlayan ve rastgeleliği tamamen kapatabilen başka bir örnekleyiciyle de kullanılabilir. Sonuç, aynı model üzerinde iki örnekleyicinin karşılaştırılması olduğu için tertemiz bir ölçüm veriyor; Şekil 2 onu taşıyor.

![İki sütunlu tablo; satırlar örnekleme adım sayısı 10, 20, 50, 100 ve 1000. Sütunlar CIFAR-10 üzerinde FID değeri; birinci sütun rastgeleliği açık olan özgün örnekleyici, ikinci sütun rastgeleliği kapatan belirlenimci örnekleyici. Değerler sırasıyla 367,43 ve 13,36; 133,37 ve 6,84; 32,72 ve 4,67; 9,99 ve 4,16; 3,17 ve 4,04. Tablonun altında üç kayıt: iki sütun aynı eğitilmiş modeli kullanır, fark yalnızca örnekleyicidir; düşük FID iyidir; ve bin adımda özgün örnekleyici öne geçerken elli adımda arada yedi kattan fazla fark vardır.](assets/adim-sayisi-ve-orneklendirici.svg "Şekil 2 — Aynı model, iki örnekleyici: adım sayısının bedeli")

Tabloyu okumanın doğru yolu sütunları değil satırları karşılaştırmak. Bin adımda iki örnekleyici birbirine yakın, hatta özgün olan bir tık önde. Elli adımda ise arada yedi kattan fazla fark var: aynı ağ, aynı ağırlıklar, tek değişen şey adımların nasıl atlandığı. Yani "difüzyon yavaştır" cümlesi modelin değil, seçilen örnekleyicinin bir özelliği.

Adım sayısını daha da aşağı çekmenin yolu damıtma. Tim Salimans ve Jonathan Ho'nun ICLR 2022'de sunduğu çalışma, öğretmen modelin iki adımını öğrenciye tek adımda öğretiyor ve bunu tekrarlıyor: her turda adım sayısı yarıya iniyor. CIFAR-10'da dört adımda 3,0 FID bildiriyorlar. Yang Song ve arkadaşlarının ICML 2023'te sunduğu çalışma bir adım daha ileri gidip tek adımda üretmeyi hedefliyor ve CIFAR-10'da 3,55, ImageNet 64×64'te 6,20 bildiriyor. Bu üç sayı üç ayrı çalışmadan geliyor ve eğitim koşulları birebir aynı değil; karşılaştırılabilir olan şey büyüklük sırasıdır, ondalıklar değil — 71\. makalenin uyarısı burada da geçerli.

## Maliyeti uzayda ödemek

İkinci bedel ağın **neyin üzerinde** çalıştığından geliyor. Piksel uzayında difüzyon pahalı, ve pahalılığın ölçüsü Robin Rombach ve arkadaşlarının CVPR 2022'de sunduğu çalışmanın açılışında yazılı: o dönemin en güçlü difüzyon modellerini eğitmek 150 ile 1000 V100 günü arasında sürüyor, ve eğitilmiş bir modelden elli bin örnek üretmek tek bir A100'de yaklaşık beş gün alıyor.

Çalışmanın hamlesi şu: önce bir otokodlayıcı eğit, görüntüyü daha küçük bir gizil ızgaraya indir, difüzyonu orada çalıştır. İndirgeme çarpanı bir tasarım değişkeni ve çalışma onu tarıyor: çarpan 1 (yani piksel uzayı) eğitimi çok yavaşlatıyor, çarpan 32 algısal olarak fazla şey siliyor, 4 ile 8 arası en iyi dengeyi veriyor. Takasın biçimi tanıdık olmalı: 81\. makalede görüntü yamasının boyutu, token sayısı ile ayrıntı arasında aynı türden bir takas kuruyordu. Sıkıştırma her yerde aynı soruyu soruyor — neyi atmaya razısın.

Omurga tarafında da bir değişim var. Difüzyon modelleri uzun süre U-Net adı verilen evrişimli bir omurga kullandı. William Peebles ve Saining Xie'nin ICCV 2023'te sunduğu çalışma onu 7\. makalenin mimarisiyle değiştirdi: gizil ızgara yamalara bölünüp bir Transformer'a diziliyor. Bulgu iki katmanlı. Birincisi ölçek düzenli davranıyor — omurganın hesabı arttıkça FID düşüyor. İkincisi ve daha ilginci, U-Net'in taşıdığı varsayımın **zorunlu olmadığı**: 118,6 Gflop'luk en büyük sürüm, ImageNet 256×256'da o günün en iyisi olan 2,27 FID'e ulaşıyor. Patrick Esser ve arkadaşlarının ICML 2024'te sunduğu çalışma aynı omurgayı 8 milyar parametreye taşıyor ve gürültüden veriye düz bir yol öğrenen bir eğitim biçimini — doğrultulmuş akış — sistematik olarak karşılaştırıp öne çıkarıyor. Bu ailenin pratik vaadi de adım sayısıyla ilgili: yol ne kadar düzse, onu izlemek için o kadar az adım gerekir.

## Kılavuzluk: sıcaklık düğmesinin buradaki hâli

Buraya kadar model koşulsuz çalıştı: gürültüden bir görüntü çıkarıyor, ama hangi görüntü olacağını söyleyen bir şey yok. Metinden görüntü üretmek için metnin modele girmesi gerekiyor, ve giriş yolu 81\. makaleden tanıdık. Gizil difüzyon çalışması bunu **çapraz dikkatle** yapıyor: istem bir metin kodlayıcısından geçirilip bir dizi vektöre çevriliyor, omurganın ara katmanlarına çapraz dikkat blokları ekleniyor, ve görüntünün her konumu üretilirken metnin ilgili parçalarına bakılıyor. 81'de görüntüyü dil modeline bağlayan üç yoldan biri buydu; burada aynı mekanizma ters yönde, dili görüntü üreticisine bağlamak için kullanılıyor.

Koşul girdikten sonra üretimin en çok kullanılan düğmesi devreye giriyor, ve bu düğme seride tanıdık.

Prafulla Dhariwal ve Alex Nichol'un NeurIPS 2021'de sunduğu çalışma — başlığında difüzyonun düşmanca üretken ağları geçtiğini ilan eden çalışma — koşullu üretimi güçlendirmenin bir yolunu buldu: ayrı bir sınıflandırıcı eğit, örnekleme sırasında onun gradyanını kullanarak üretimi istenen sınıfa doğru it. İtme katsayısı bir hiperparametre. Jonathan Ho ve Tim Salimans'ın çalışması ise sınıflandırıcıyı tamamen ortadan kaldırdı: modeli eğitirken koşulu bir olasılıkla düşür, böylece aynı ağ hem koşullu hem koşulsuz tahmin yapmayı öğrensin; örnekleme sırasında koşullu tahmini al ve koşulsuz olandan **uzağa** doğru bir katsayıyla uzat. Yöntemin adı sınıflandırıcısız kılavuzluk ve bugün fiilen standart. Çalışma hakemli bir konferansta değil, NeurIPS 2021'in bir çalıştayında sunuldu; bu makalede bildirilen sayılar arXiv'deki tam sürümden alınmıştır.

Yazarların kendi çerçevelemesi bizim için önemli: kılavuzluğu "düşük sıcaklıkta örnekleme ya da kesme ile aynı ruhta" bir yöntem olarak tanıtıyorlar. Yani bu bizim kurduğumuz bir benzetme değil, alanın kendi ifadesi — ve 10\. makalede sıcaklığın yaptığı işin aynısı: dağılımı modlarına doğru sıkıştırmak.

Takas ölçülmüş durumda. Şekil 3, tek bir modelin üç ayarını veriyor.

![Üç satırlı tablo; satırlar kılavuzluk katsayısı yok, 1,25 ve 1,50. Sütunlar FID, Inception puanı, kesinlik ve kapsama. Değerler sırasıyla: kılavuzluksuz 9,62 / 121,50 / 0,67 / 0,67; katsayı 1,25 ile 3,22 / 201,77 / 0,76 / 0,62; katsayı 1,50 ile 2,27 / 278,24 / 0,83 / 0,57. Tablonun altında üç kayıt: üç satır aynı eğitilmiş modeldir, ölçüm ImageNet 256 çarpı 256 üzerindedir; kesinlik sadakati, kapsama çeşitliliği ölçer ve ikisi ters yönde hareket eder; FID ikisini birden içerdiği için ortada bir en küçük değeri vardır. En altta ikinci bir çalışmadan gelen uç örnek: katsayı ona çıkarıldığında kesinlik 0,88'e yükselirken kapsama 0,32'ye iniyor ve FID 4,59'dan 9,11'e geri kötüleşiyor.](assets/kilavuzlugun-takasi.svg "Şekil 3 — Kılavuzluk katsayısı: sadakat yukarı, çeşitlilik aşağı")

İki ölçü ayrı adlandırılmalı. **Kesinlik** — 45\. makaledeki atıf kesinliğiyle aynı sözcük, başka nesne — üretilen örneklerin ne kadarının gerçek veri kümesinin bölgesine düştüğünü, yani sadakati ölçer. Karşılığı olan ölçü, gerçek verinin ne kadarının modelin ürettiği bölge tarafından **kapsandığını** söyler, yani çeşitliliği; kaynak onu doğrudan dağılım kapsaması olarak tanımlıyor, ve 33\. makaledeki kapsamayla aynı sözcüğü paylaşsa da nesnesi başkadır. Tabloda kesinlik 0,67'den 0,83'e çıkarken kapsama 0,67'den 0,57'ye iniyor. Katsayı daha da yukarı itilirse — Dhariwal ve Nichol'un kendi tablosunda kılavuzluk katsayısı ona çıkarıldığında — kesinlik 0,88'e varıyor ama kapsama 0,32'ye düşüyor ve FID kötüleşiyor.

> **Kendini yokla:** FID hem sadakati hem çeşitliliği içeriyorsa, kılavuzluk katsayısını FID'i en küçük yapan yere sabitlemek neden yeterli bir kural değil?

Çünkü FID'in en küçüğü, iki şeyin **belirli bir ağırlıkla** toplanmış hâlinin en küçüğüdür ve o ağırlığı işin kendisi değil cetvel seçiyor. Tabloda 1,25 ile 1,50 arasında FID yaklaşık bir puan iyileşiyor; aynı aralıkta kapsama beş puan düşüyor. Bir ürün için "her istemde makul bir görsel" gerekiyorsa yüksek katsayı doğru olabilir; bir veri kümesi üretilecekse çeşitliliğin çökmesi ölümcüldür. Dahası aynı katsayı her koşulda aynı şeyi yapmıyor: sınıflandırıcısız kılavuzluğu tanıtan çalışma, aynı katsayının farklı adım sayılarında farklı sonuç verdiğini kendi tablosunda gösteriyor.

## Zaman ekseni girince

Videoda bir eksen daha var ve bu eksen üç ayrı soruyu birden açıyor: hareket tutarlı mı, nesneler kalıcı mı, ve bellek yetiyor mu.

İlk yaklaşım doğrudan: Jonathan Ho ve arkadaşlarının NeurIPS 2022'de sunduğu çalışma görüntü omurgasını zamana genişletiyor, uzay ve zaman üzerindeki dikkati ayrıştırarak hesabı yönetilebilir tutuyor. Andreas Blattmann ve arkadaşlarının CVPR 2023'te sunduğu çalışma daha ekonomik bir yol öneriyor: **eğitilmiş bir görüntü modelini al**, uzamsal katmanları dondur, araya yalnızca zamansal katmanlar ekle ve yalnızca onları eğit. Böylece görüntü modelinin bütün bilgisi korunuyor ve öğrenilmesi gereken tek şey karelerin birbirine nasıl bağlanacağı. Çalışma bunu hem 512×1024 çözünürlüklü gerçek sürüş videolarında hem de kamuya açık bir metinden görüntü modelini 1280×2048 çözünürlüklü bir metinden video modeline çevirerek gösteriyor.

Omer Bar-Tal ve arkadaşlarının 2024'te yayımladığı çalışma yaygın bir tasarım kararını eleştiriyor. Video modellerinin çoğu önce birbirinden uzak anahtar kareler üretip aralarını zamansal bir üst-örnekleyiciyle dolduruyor; yazarlara göre bu düzen küresel zamansal tutarlılığı doğası gereği zorlaştırıyor, çünkü hızlı hareket seyrek örneklenmiş karelerde kayboluyor. Önerdikleri mimari videonun **bütün zamansal süresini tek geçişte** üretiyor ve bunu hem uzamsal hem zamansal olarak çoklu ölçekte çalışarak yapıyor. Çalışmanın hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv'dedir.

## Cetvelin kendisi

Bu alanda tek bir sayı hâkim: FID. Martin Heusel ve arkadaşlarının NeurIPS 2017'de tanıttığı ölçü, gerçek görüntülerin ve üretilen görüntülerin bir görüntü sınıflandırıcısının ara katmanındaki temsillerini alıp her iki kümeye birer Gauss uydurur ve iki Gauss arasındaki uzaklığı verir. Düşük olan iyidir.

16\. ve 71\. makalelerin sorusu burada da geçerli: bu cetvel neyi ölçüyor, neyi ölçemiyor? Üç ayrı bulgu var. Min Jin Chong ve David Forsyth'in CVPR 2020'de sunduğu çalışma FID'in **yanlı** olduğunu gösteriyor: değeri örnek sayısına bağlı, ve yanlılık terimi değerlendirilen modele göre değişiyor — yani A modeli B modelinden yalnızca yanlılık terimi küçük olduğu için daha iyi görünebiliyor, ve bu, sabit sayıda örnekle ölçerek düzelmiyor. Sadeep Jayasumana ve arkadaşlarının CVPR 2024'te sunduğu çalışma normallik varsayımının yanlış olduğunu ve FID'in insan değerlendiricilerle çeliştiği durumları gösteriyor.

Üçüncü bulgu ölçülen şeyin kapsamıyla ilgili. Metinden görüntü üretiminde asıl soru "resim güzel mi" değil, "istenen şey mi": Jack Hessel ve arkadaşlarının EMNLP 2021'de sunduğu çalışma metin ile görüntüyü aynı uzaya koyan bir modeli referanssız bir hizalama ölçüsüne çeviriyor. Dhruba Ghosh ve arkadaşlarının NeurIPS 2023'te sunduğu ölçüt ise hizalamayı nesne düzeyine indiriyor: üretilen görüntüde istenen nesneler var mı, sayıları doğru mu, renkleri ve konumsal ilişkileri isteme uyuyor mu — yani bir nesne bulucuyla otomatik denetlenebilen, bileşimsel bir soru kümesi. Tony Lee ve arkadaşlarının NeurIPS 2023'te sunduğu bütünsel değerlendirme ise 12 ayrı boyut, 62 senaryo ve 26 model üzerinde ölçüyor ve bulgusu 71'in cümlesini yineliyor: hiçbir model bütün boyutlarda en iyi değil.

Son olarak 72\. makalenin sorusu bu ailede de karşımıza çıkıyor. Nicholas Carlini ve arkadaşlarının USENIX Security 2023'te sunduğu çalışma, kamuya açık difüzyon modellerinden **binden fazla** eğitim örneğini geri çıkarıyor ve difüzyon modellerinin önceki üretken model ailelerinden — düşmanca üretken ağlardan — iki kattan fazla eğitim verisi sızdırdığını ölçüyor. Üreten bir model, ezberlediğini de üretebilir.

## Difüzyonun disiplini

**Bozma yönü tasarımdır, geri getirme yönü öğrenilir.** Gürültü çizelgesini biz seçtiğimiz için ileri yönde bilinmeyen yoktur; öğrenilen tek şey, küçük bir bozmanın tersini kestirmektir.

**Hedef gürültüyü tahmin etmektir, resmi değil.** Kayıp, eklenen gürültü ile tahmin edilen gürültü arasındaki ortalama karesel hatadır; gürültü düzeyi ağa girdi olarak verildiği için tek bir ağ bütün zorluk düzeylerini öğrenir.

**Adım sayısı modelin değil örnekleyicinin özelliğidir.** Aynı eğitilmiş ağda, elli adımda iki örnekleyici arasında yedi kattan fazla FID farkı vardır; damıtma bu sayıyı dört adıma, tek adıma kadar indirebiliyor.

**Maliyet uzayda ödenir.** Difüzyonu pikselden gizil ızgaraya taşımak eğitimi ve çıkarımı ucuzlatır; indirgeme çarpanı, atılan ayrıntı ile kazanılan hız arasındaki takasın adıdır.

**Kılavuzluk bir düğmedir ve iki ucu ölçülmüştür.** Katsayı büyüdükçe kesinlik yükselir, kapsama düşer; FID ikisini birden içerdiği için ortada bir en küçük değeri vardır ve o nokta işin gereğini bilmez.

**Cetvelin kendisi denetlenmelidir.** FID örnek sayısına bağlı biçimde yanlıdır, normallik varsayımı tartışmalıdır ve insan değerlendirmesiyle çelişebilir; hizalama ve kapsam ayrı cetveller ister.

**Üreten model ezberi de üretir.** Kamuya açık modellerden binden fazla eğitim örneği geri çıkarılabilmiştir ve sızıntı, önceki üretken ailelerin iki katından fazladır.

### Sırada ne var

Elimizde artık iki ayrı üretim düzeni var: token token ilerleyen otoregresif düzen ve bütün tuvali defalarca düzelten difüzyon. İkisi farklı kayıplar, farklı örnekleyiciler ve farklı maliyet yapıları kullanıyor. Peki bunlar gerçekten iki ayrı aile mi? Bir sonraki makale bu soruyu tersinden soruyor: görüntüyü de sese de bir sözlüğe indirip her şeyi tek bir dizi modeline yaptırmak mümkün mü, ve mümkünse dikiş yeri tam olarak nerede kalıyor?

## Kaynakça

- Sohl-Dickstein, J., Weiss, E. A., Maheswaranathan, N. & Ganguli, S. (2015). *Deep Unsupervised Learning using Nonequilibrium Thermodynamics*. ICML 2015. [Bağlantı](https://proceedings.mlr.press/v37/sohl-dickstein15.html)
- Ho, J., Jain, A. & Abbeel, P. (2020). *Denoising Diffusion Probabilistic Models*. NeurIPS 2020. [Bağlantı](https://papers.nips.cc/paper_files/paper/2020/hash/4c5bcfec8584af0d967f1ab10179ca4b-Abstract.html)
- Song, Y. & Ermon, S. (2019). *Generative Modeling by Estimating Gradients of the Data Distribution*. NeurIPS 2019. [Bağlantı](https://papers.nips.cc/paper_files/paper/2019/hash/3001ef257407d5a371a96dcd947c7d93-Abstract.html)
- Song, Y., Sohl-Dickstein, J., Kingma, D. P., Kumar, A., Ermon, S. & Poole, B. (2021). *Score-Based Generative Modeling through Stochastic Differential Equations*. ICLR 2021. [Bağlantı](https://arxiv.org/abs/2011.13456)
- Song, J., Meng, C. & Ermon, S. (2021). *Denoising Diffusion Implicit Models*. ICLR 2021. [Bağlantı](https://arxiv.org/abs/2010.02502)
- Salimans, T. & Ho, J. (2022). *Progressive Distillation for Fast Sampling of Diffusion Models*. ICLR 2022. [Bağlantı](https://arxiv.org/abs/2202.00512)
- Song, Y., Dhariwal, P., Chen, M. & Sutskever, I. (2023). *Consistency Models*. ICML 2023. [Bağlantı](https://proceedings.mlr.press/v202/song23a.html)
- Rombach, R., Blattmann, A., Lorenz, D., Esser, P. & Ommer, B. (2022). *High-Resolution Image Synthesis with Latent Diffusion Models*. IEEE/CVF CVPR 2022. [Bağlantı](https://openaccess.thecvf.com/content/CVPR2022/html/Rombach_High-Resolution_Image_Synthesis_With_Latent_Diffusion_Models_CVPR_2022_paper.html)
- Peebles, W. & Xie, S. (2023). *Scalable Diffusion Models with Transformers*. IEEE/CVF ICCV 2023. [Bağlantı](https://openaccess.thecvf.com/content/ICCV2023/html/Peebles_Scalable_Diffusion_Models_with_Transformers_ICCV_2023_paper.html)
- Esser, P., Kulal, S., Blattmann, A., Entezari, R., Müller, J., Saini, H., Levi, Y., Lorenz, D., Sauer, A., Boesel, F., Podell, D., Dockhorn, T., English, Z. & Rombach, R. (2024). *Scaling Rectified Flow Transformers for High-Resolution Image Synthesis*. ICML 2024. [Bağlantı](https://proceedings.mlr.press/v235/esser24a.html)
- Dhariwal, P. & Nichol, A. (2021). *Diffusion Models Beat GANs on Image Synthesis*. NeurIPS 2021. [Bağlantı](https://papers.nips.cc/paper_files/paper/2021/hash/49ad23d1ec9fa4bd8d77d02681df5cfa-Abstract.html)
- Ho, J. & Salimans, T. (2022). *Classifier-Free Diffusion Guidance*. NeurIPS 2021 Deep Generative Models çalıştayında kısa sürümü sunuldu; hakemli bir konferans bildirisi değildir. Okunan sürüm arXiv:2207.12598. [Bağlantı](https://arxiv.org/abs/2207.12598)
- Ho, J., Salimans, T., Gritsenko, A., Chan, W., Norouzi, M. & Fleet, D. J. (2022). *Video Diffusion Models*. NeurIPS 2022. [Bağlantı](https://papers.nips.cc/paper_files/paper/2022/hash/39235c56aef13fb05a6adc95eb9d8d66-Abstract-Conference.html)
- Blattmann, A., Rombach, R., Ling, H., Dockhorn, T., Kim, S. W., Fidler, S. & Kreis, K. (2023). *Align Your Latents: High-Resolution Video Synthesis with Latent Diffusion Models*. IEEE/CVF CVPR 2023. [Bağlantı](https://openaccess.thecvf.com/content/CVPR2023/html/Blattmann_Align_Your_Latents_High-Resolution_Video_Synthesis_With_Latent_Diffusion_Models_CVPR_2023_paper.html)
- Bar-Tal, O., Chefer, H., Tov, O., Herrmann, C., Paiss, R., Zada, S., Ephrat, A., Hur, J., Liu, G., Raj, A., Li, Y., Rubinstein, M., Michaeli, T., Wang, O., Sun, D., Dekel, T. & Mosseri, I. (2024). *Lumiere: A Space-Time Diffusion Model for Video Generation*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2401.12945. [Bağlantı](https://arxiv.org/abs/2401.12945)
- Goodfellow, I. J., Pouget-Abadie, J., Mirza, M., Xu, B., Warde-Farley, D., Ozair, S., Courville, A. & Bengio, Y. (2014). *Generative Adversarial Nets*. NeurIPS 2014. [Bağlantı](https://papers.nips.cc/paper_files/paper/2014/hash/f033ed80deb0234979a61f95710dbe25-Abstract.html)
- Heusel, M., Ramsauer, H., Unterthiner, T., Nessler, B. & Hochreiter, S. (2017). *GANs Trained by a Two Time-Scale Update Rule Converge to a Local Nash Equilibrium*. NeurIPS 2017. [Bağlantı](https://papers.nips.cc/paper_files/paper/2017/hash/8a1d694707eb0fefe65871369074926d-Abstract.html)
- Chong, M. J. & Forsyth, D. (2020). *Effectively Unbiased FID and Inception Score and Where to Find Them*. IEEE/CVF CVPR 2020. [Bağlantı](https://openaccess.thecvf.com/content_CVPR_2020/html/Chong_Effectively_Unbiased_FID_and_Inception_Score_and_Where_to_Find_CVPR_2020_paper.html)
- Jayasumana, S., Ramalingam, S., Veit, A., Glasner, D., Chakrabarti, A. & Kumar, S. (2024). *Rethinking FID: Towards a Better Evaluation Metric for Image Generation*. IEEE/CVF CVPR 2024. [Bağlantı](https://openaccess.thecvf.com/content/CVPR2024/html/Jayasumana_Rethinking_FID_Towards_a_Better_Evaluation_Metric_for_Image_Generation_CVPR_2024_paper.html)
- Hessel, J., Holtzman, A., Forbes, M., Le Bras, R. & Choi, Y. (2021). *CLIPScore: A Reference-free Evaluation Metric for Image Captioning*. EMNLP 2021. [Bağlantı](https://aclanthology.org/2021.emnlp-main.595/)
- Ghosh, D., Hajishirzi, H. & Schmidt, L. (2023). *GenEval: An Object-Focused Framework for Evaluating Text-to-Image Alignment*. NeurIPS 2023 Datasets and Benchmarks. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/a3bf71c7c63f0c3bcb7ff67c67b1e7b1-Abstract-Datasets_and_Benchmarks.html)
- Lee, T., Yasunaga, M., Meng, C., Mai, Y., Park, J. S., Gupta, A., Zhang, Y., Narayanan, D., Teufel, H. B., Bellagente, M., Kang, M., Park, T., Leskovec, J., Zhu, J.-Y., Fei-Fei, L., Wu, J., Ermon, S. & Liang, P. (2023). *Holistic Evaluation of Text-to-Image Models*. NeurIPS 2023 Datasets and Benchmarks. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/dd83eada2c3c74db3c7fe1c087513756-Abstract-Datasets_and_Benchmarks.html)
- Carlini, N., Hayes, J., Nasr, M., Jagielski, M., Sehwag, V., Tramèr, F., Balle, B., Ippolito, D. & Wallace, E. (2023). *Extracting Training Data from Diffusion Models*. USENIX Security 2023. [Bağlantı](https://www.usenix.org/conference/usenixsecurity23/presentation/carlini)
