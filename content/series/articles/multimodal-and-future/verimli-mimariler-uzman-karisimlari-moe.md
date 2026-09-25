---
article_id: article_a22c61d9-5173-4fba-9d99-5cb178d0129e
title: "Verimli Mimariler: Uzman Karışımları (MoE)"
slug: verimli-mimariler-uzman-karisimlari-moe
category: multimodal-and-future
level: intermediate
reading_order: 85
summary: "20'de bırakılan borcu ödüyor: 671 milyar parametre taşıyıp her token için yalnızca 37 milyarını çalıştıran mimari nasıl kuruluyor. Parametre sayısı ile token başına hesabın nasıl ayrıldığını, seyrek kapılı katmanın ileri beslemeli katmanın yerine nasıl geçtiğini ve yönlendirmenin neden bir eğitim problemi olduğunu kuruyor — yük dengesizliği, kapasite, düşen token'lar, ve atamayı tersine çeviren çözüm. Ölçek yasasının değişip değişmediğini iki tarafın ölçümüyle bırakıyor: bir çalışma yönlendirmenin faydasının azaldığını ve 937 milyar parametrede kesildiğini söylüyor, bir başkası neyin sabit tutulduğunu değiştirip 10²⁰ işlemde yirmi kat tasarruf ölçüyor — 9'daki Kaplan-Chinchilla ayrımının aynı biçimi. Bedelin bellekte ve iletişimde ödendiğini, ve uzmanların gerçekten uzmanlaşıp uzmanlaşmadığının iki ayrı ölçümde iki ayrı cevap verdiğini gösteriyor."
tags:
  - uzmanlar-karisimi
  - kosullu-hesaplama
  - yonlendirme
  - yuk-dengeleme
  - olcek-yasalari
content_hash: sha256:19ea027bd573d7dfa38ce5ccc4b8170c9a21fd6e242d677268f0e7a38c990f7b
classification_version: 1
classification_batch: 20
---
## 20'de bırakılan borç

20\. makalede bir modelin eğitim maliyetini okurken şöyle bir cümle kurmuştuk: model 671 milyar parametre taşıyor ama her token için bunların yalnızca 37 milyarı çalışıyor, çünkü mimarisi uzmanlar karışımı; ve orada gereken tek şeyin, hesabın toplam parametreye göre değil çalışan parametreye göre yapılması olduğunu söyleyip mimarinin kendisini buraya bırakmıştık. Borç bu makalede ödeniyor.

Önceki iki makale bir varsayımı hiç sorgulamadan taşıdı: modelin her token için bütün parametrelerini çalıştırdığını. 9\. makaledeki hesap tam olarak buna dayanıyordu — bir token'ın eğitim maliyeti, parametre sayısıyla doğru orantılıdır. Bu ilişkiyi koparmak mümkün olsaydı ne olurdu?

Üç soru: bağ nasıl koparılıyor, kopardığında ölçek yasasına ne oluyor, ve faturayı kim ödüyor?

## Parametre ile hesabı ayırmak

Yoğun bir Transformer'da her parametre her token'a katılır. Bu, mimarinin bir sonucu değil tanımı: dikkat bütün konumlara bakar, ileri beslemeli katman her konuma ayrı ayrı ama **aynı ağırlıklarla** uygulanır. Dolayısıyla parametre sayısını iki katına çıkarmak, token başına hesabı da iki katına çıkarır.

**Koşullu hesaplama** (conditional computation) bu bağı kırar: ağın hangi parçasının çalışacağına girdiye bakarak karar ver. Fikrin kökü eskiye uzanıyor; Robert Jacobs, Michael Jordan, Steven Nowlan ve Geoffrey Hinton'ın 1991'de Neural Computation'da yayımladığı çalışma, birkaç uzman ağı ile hangisine güvenileceğini belirleyen bir kapı ağını birlikte eğitmeyi önermişti. Noam Shazeer ve arkadaşlarının ICLR 2017'de sunduğu çalışma, kendi ilişkili çalışmalar bölümünde bu geleneğin sınırını da söylüyor: o çalışmalarda uzmanlar karışımı **modelin kendisiydi**. Yeni olan, onu bir modelin içindeki bir **katman** hâline getirmek.

Katmanın yeri tesadüf değil. 7\. makalede blok içindeki parametreleri saymıştık: dikkat alt-katmanı dört kare matris, ileri beslemeli alt-katman iki dikdörtgen matris, ve oran tam olarak iki — bloğun işleyen yarısı, bakan yarısının iki katı parametre taşır. Parametreyi çoğaltıp hesabı sabit tutmak istiyorsan, çoğaltacağın yer bellidir.

Kurulum şöyle: ileri beslemeli katmanın yerine `N` tane kopyası konur; bunlara **uzman** denir. Yanlarına küçük bir **kapı ağı** (gating network) eklenir; kapı ağı her token için uzmanlara birer puan verir ve en yüksek puanlı `k` tanesi çalıştırılır. Çıktı, seçilen uzmanların çıktılarının kapı puanlarıyla ağırlıklı toplamıdır.

Aritmetiği tanım gereği: sekiz uzman ve her token için iki uzman seçilirse, ileri beslemeli katmanın parametreleri sekiz katına çıkar ama token başına çalışan parametre yalnızca iki katına çıkar. Sekiz kat kapasiteye iki kat hesapla ulaşılmış olur. Shazeer ve arkadaşlarının bildirdiği rakam bu mantığın uç noktasını gösteriyor: tek bir uzmanlar karışımı katmanında 137 milyara varan parametre, ve model kapasitesinde bin katı aşan bir artış, hesaplama verimliliğinde küçük bir kayıpla.

![İki sütunlu karşılaştırma tablosu; sütunlar yoğun katman ve uzmanlar karışımı katmanı. Satırlar: token başına çalışan parametre, toplam parametre, token başına hesap, bellekte tutulan parametre ve cihazlar arası iletişim. Yoğun katmanda çalışan parametre toplam parametreye eşittir, toplam parametre katmanın kendi boyudur, hesap parametreyle doğru orantılıdır, bellek çalışan parametreyle aynıdır ve ek iletişim yoktur. Uzmanlar karışımında çalışan parametre yalnızca seçilen uzman sayısına bağlıdır, toplam parametre uzman sayısıyla çarpılır, hesap yalnızca seçilenlere göre artar, bellek toplam parametreye göre ödenir ve uzmanlar cihazlara dağıtılmışsa her katmanda hepsi-hepsiye iletişim gerekir. Altta iki gerçek model: biri 47 milyar toplam ve 13 milyar etkin parametreyle sekiz uzmandan ikisini seçiyor, öteki 671 milyar toplam ve 37 milyar etkin parametre taşıyor. En altta bir kayıt: sekiz uzmandan ikisini seçmek katmanın parametresini sekiz kat büyütürken token başına hesabı yalnızca iki kat artırır.](assets/yogun-katman-ile-uzman-karisimi.svg "Şekil 1 — Yoğun katman ile uzmanlar karışımı: neyin çarpıldığı, neyin sabit kaldığı")

Şekil 1'in okunacak satırı en alttaki. Uzmanlar karışımı ucuz bir büyütme yöntemi değil; **hangi maliyetin büyüyeceğini seçme** yöntemi. Hesap sabit tutulur, bellek büyür.

## Yönlendirme bir eğitim problemidir

Şekil 2 hem akışı hem de akışın bozulma biçimini veriyor. Kapı ağı eğitilebilir bir parçadır ve kendi başına bırakılırsa kötü bir alışkanlık edinir: birkaç uzmanı sürekli seçer, o uzmanlar daha çok eğitilir, daha iyi olurlar, daha çok seçilirler. Sonuç, parametrelerin çoğunun ölü kalması.

Alanın standart cevabı bir **yük dengeleme kaybı** (load balancing loss) eklemek: eğitim kaybına, uzmanlar arasındaki kullanım dengesizliğini cezalandıran bir terim konur. İkinci bir önlem **kapasite**: her uzmanın bir yığın içinde kabul edeceği en fazla token sayısı önceden belirlenir; sınırı aşan token'lar o uzman tarafından işlenmez, katmanı artık bağlantı üzerinden atlayarak geçer. Yani dengesizliğin bedeli **düşen token** olarak ödenir.

Dmitry Lepikhin ve arkadaşlarının ICLR 2021'de sunduğu çalışma bu düzeni ölçekte gösterdi: 600 milyar parametreli bir çeviri modeli, 2048 hızlandırıcıda dört günde eğitildi — toplam 22 hızlandırıcı-yılı. O güne kadarki en iyi yoğun karşılığı ise 235,5 hızlandırıcı-yılı harcamış ve daha düşük çeviri kalitesinde kalmıştı.

William Fedus ve arkadaşlarının JMLR 2022'de yayımladığı çalışma düzeni sadeleştirdi: iki uzman yerine **bir** uzman seç. Sadeleştirme hem yönlendirme hesabını hem iletişimi düşürdü ve aynı işlem bütçesinde ön eğitimde 7 kata varan hızlanma ölçüldü. Aynı çalışma mimariyi bir trilyon parametrenin üstüne taşıdı.

Nan Du ve arkadaşlarının ICML 2022'de sunduğu çalışma aynı yılın ölçek tarafındaki karşılığını veriyor ve sayıları doğrudan enerji cinsinden konuşuyor: 1,2 trilyon parametreli seyrek bir model, o günün yaygın yoğun modelinden yaklaşık yedi kat büyük olmasına rağmen eğitimi için harcanan enerjinin **üçte birini** kullanıyor, çıkarımda **yarı** işlem harcıyor ve 29 doğal dil görevinde daha iyi sonuç veriyor. Uzmanlar karışımının çekiciliğini tek bir cümlede toplayan sayı bu üçlüdür.

Barret Zoph ve arkadaşlarının 2022'de yayımladığı — hakemli bir yerde yayımlandığı doğrulanamayan — çalışma kararlılık tarafını topladı: seyrek modeller yoğunlardan daha kolay ıraksıyor ve yönlendiricinin ürettiği sayıların büyümesini cezalandıran ek bir terim bunu belirgin biçimde düzeltiyor.

Yanqi Zhou ve arkadaşlarının NeurIPS 2022'de sunduğu çalışma ise problemi baştan kuruyor: token'lar uzman seçeceğine, **uzmanlar token seçsin**. Her uzman kendi kapasitesi kadar en yüksek puanlı token'ı alır. Bu tersine çevirme yük dengesini yardımcı bir kayba gerek kalmadan garanti ediyor ve 8 milyar parametreli, 64 uzmanlı bir modelde yakınsamayı iki kattan fazla hızlandırıyor.

![Üç bölmeli şema. Üstte yönlendirme akışı: token vektörü kapı ağına girer, kapı ağı uzmanlara puan verir, en yüksek puanlı iki uzman çalıştırılır ve çıktıları kapı puanlarıyla ağırlıklı toplanır; dört uzman kutusundan ikisi çalışıyor, ikisi boşta. Ortada dengesizlik döngüsü: birkaç uzman sürekli seçilir, daha çok eğitilir, daha iyi olur, daha çok seçilir; kalan uzmanlar ölü kalır. Altta üç önlem ve bedelleri: yük dengeleme kaybı dengesizliği cezalandıran ek bir terimdir ve asıl hedefle yarışır; kapasite sınırı uzman başına en fazla token sayısını belirler, aşan token'lar katmanı atlayarak geçer ve bedel düşen token olarak ödenir; atamayı tersine çevirmek, yani uzmanların token seçmesi, dengeyi yardımcı kayba gerek kalmadan garanti eder ve 8 milyar parametreli 64 uzmanlı bir modelde yakınsamayı iki kattan fazla hızlandırır.](assets/yonlendirme-ve-yuk-dengesi.svg "Şekil 2 — Yönlendirme, dengesizlik ve üç önlemin bedeli")

## Ölçek yasası değişiyor mu? İki taraf

Buraya kadar her şey uzmanlar karışımının lehine görünüyor. Asıl soru ise 9\. makalenin sorusu: bu kazanç ölçekle birlikte nasıl davranıyor?

Alanın iki büyük cevabı var ve **birbiriyle çelişiyorlar**; Şekil 3 ikisini yan yana koyuyor.

Aidan Clark ve arkadaşlarının ICML 2022'de sunduğu çalışma, beş büyüklük mertebesine yayılan bir model kümesi eğitip yönlendirilmiş modeller için bir ölçek yasası kuruyor. İki bulgusu var. Birincisi olumlu: yönlendirme, denedikleri bütün boyutlarda ve bütün varyantlarda başarıyı iyileştiriyor. İkincisi kısıtlayıcı: iyileşmenin eğimi model büyüdükçe **azalıyor**, ve bir kesim noktası var — o noktanın ötesinde yönlendirme artık hiçbir şey kazandırmıyor. Üç yönlendirme tekniği için hesapladıkları kesim noktaları 937 milyar, 85 milyar ve 83 milyar parametre. Aynı çalışma yönlendirilmiş bir modeli aynı başarıyı veren yoğun modelin boyuna eşleyen bir **etkin parametre sayısı** de tanımlıyor; böylece iki aile tek eğri üzerinde okunabiliyor.

Jan Ludziejewski, Jakub Krajewski ve arkadaşlarının ICML 2024'te sunduğu çalışma bu sonuca doğrudan itiraz ediyor, ve itirazın yeri önemli: veride değil, **neyin sabit tutulduğunda**. Önceki çalışmalarda iki şey örtük olarak sabitlenmiş — eğitim süresi ve uzman boyu. Yazarlar uzman boyunu bir değişkene çeviriyorlar; aynı toplam uzman parametresini az sayıda büyük uzman yerine çok sayıda küçük uzmana bölmenin ölçüsüne **tanecik** (granularity) diyorlar. Üç değişkeni birden — model boyu, eğitim token'ı ve tanecik — eniyilediklerinde sonuç tersine dönüyor: uzmanlar karışımı her hesap bütçesinde yoğun modelden verimli çıkıyor. Sayıyla: 10²⁰ işlemlik bir bütçeyle eğitilen hesap-optimal bir uzmanlar karışımı, 20 kat daha büyük bütçeyle eğitilmiş yoğun bir Transformer'ın kalitesine ulaşıyor, ve tasarruf 10²⁵ işlemin ötesinde 40 katı geçiyor. Aynı çalışma, uzman boyunu ileri beslemeli katmanın boyuna eşitleyen yaygın uygulamanın "neredeyse hiçbir zaman en iyi olmadığını" da söylüyor.

![İki sütunlu karşılaştırma tablosu; sütunlar iki ayrı ölçek çalışması. Satırlar: neyin sabit tutulduğu, neyin değiştirildiği, kurulan ölçü ve varılan sonuç. Birinci çalışmada eğitim süresi ile uzman boyu sabit tutulmuş, model boyu ile uzman sayısı değiştirilmiş; kurulan ölçü, yönlendirilmiş modeli aynı başarıdaki yoğun modele eşleyen etkin parametre sayısı; sonuç, yönlendirmenin bütün boyutlarda iyileştirme sağladığı fakat iyileşmenin ölçekle azaldığı ve üç teknik için 937 milyar, 85 milyar ve 83 milyar parametrede kesildiği. İkinci çalışmada yalnızca hesap bütçesi sabit tutulmuş; model boyu, eğitim token sayısı ve uzman taneciği birlikte değiştirilmiş; kurulan ölçü, üç değişkenli hesap-optimal yapılandırma; sonuç, uzmanlar karışımının her bütçede yoğun modelden verimli olduğu, 10 üzeri 20 işlemde yirmi kat, 10 üzeri 25 işlemin ötesinde kırk katı aşan tasarruf. En altta bir kayıt: çelişki veride değil, ailenin tanımında.](assets/olcek-iddiasinin-iki-tarafi.svg "Şekil 3 — Aynı mimari, iki ölçek yasası: neyin sabit tutulduğu")

> **Kendini yokla:** İki çalışma da aynı mimariyi aynı yoğun karşılığıyla karşılaştırıyor ve zıt sonuç bildiriyor. Fark verilerinde mi?

Hayır; fark **neyin sabitlendiğinde**. Birinci çalışma eğitim süresini ve uzman boyunu sabitleyip model boyunu ve uzman sayısını değiştiriyor; ikincisi eğitim token sayısını ve uzman taneciğini de serbest bırakıyor. Bir ölçek yasası tek bir modelin değil, bir **model ailesinin** iddiasıdır, ve aileyi tanımlayan şey tam olarak neyin sabit tutulduğudur. Bu ayrımın aynısını 9\. makalede görmüştük: aynı türden veriden iki farklı tahsis çıkmıştı, çünkü biri model boyunu ölçeklerken veri miktarını neredeyse sabit tutmuştu. Ölçek yasası okurken sorulacak ilk soru "hangi eğri" değil, "hangi aile".

Pratik bir soru daha var: sıfırdan mı eğitilmeli? Aran Komatsuzaki ve arkadaşlarının ICLR 2023'te sunduğu çalışma üçüncü bir yol gösteriyor. Eğitilmiş yoğun bir kontrol noktası alınır, ileri beslemeli katmanı kopyalanarak uzmanlara çoğaltılır, önlerine yeni bir kapı ağı konur ve eğitim oradan devam eder; kopyalar zamanla birbirinden ayrışır. Yazarlar bu yolun, aynı ek bütçeyle yoğun eğitimi sürdürmeye göre daha iyi sonuç verdiğini bildiriyor. 19\. makaledeki uyarlama mantığının mimari düzeydeki karşılığı: elde duran eğitim yatırımı çöpe atılmıyor.

## Bedel bellekte ve iletişimde ödenir

Uzmanlar karışımının hesabı ucuzlatması, maliyeti yok etmesi değil, **taşıması** anlamına geliyor. Taşındığı yer 27\. makalede kurduğumuz bellek duvarı.

Üç somut biçimde ödeniyor. Birincisi bellek: token başına iki uzman çalışsa da, hangi token'ın hangi uzmana gideceği önceden bilinmediği için **bütün** uzmanların bellekte hazır olması gerekir. 671 milyar parametreli bir modelin 37 milyarı çalışıyor olabilir, ama 671 milyarının tamamı yüklüdür.

İkincisi iletişim: uzmanlar tek bir cihaza sığmaz, cihazlara dağıtılır, ve her uzmanlar karışımı katmanında token'lar kendi uzmanlarının bulunduğu cihaza gönderilip sonuçlar geri toplanır. Bu, her katmanda bir **hepsi-hepsiye iletişim** (all-to-all communication) demektir; 28\. makaledeki servis hesabına, yoğun bir modelde hiç bulunmayan bir kalem eklenir.

Üçüncüsü ve en az fark edileni 28\. makaledeki yığınlama ile ilgili. Seyreklik **token başınadır, yığın başına değil**. Yığın büyüdükçe farklı token'lar farklı uzmanlara gider ve yeterince büyük bir yığında pratikte bütün uzmanlar etkinleşir. Yani çıkarımda kazanılan şey, tek bir token'ın hesabıdır; toplam iş yükü yığınla birlikte bütün uzmanlara yayılır.

Bu yüzden uzmanlar karışımının çıkarım tarafı ayrı bir mühendislik alanı. Samyam Rajbhandari ve arkadaşlarının ICML 2022'de sunduğu çalışma, uzmanlar karışımına özgü paralellik ve damıtma teknikleriyle, aynı kaliteyi veren yoğun modellere göre 4,5 kat daha hızlı ve 9 kat daha ucuz çıkarım bildiriyor. Trevor Gale ve arkadaşlarının MLSys 2023'te sunduğu çalışma ise düşen token sorununu kökünden kaldırıyor: kapasite sınırını bir zorunluluk olmaktan çıkaran blok-seyrek çekirdekler yazıyorlar, böylece hiçbir token atılmıyor.

## Uzmanlar gerçekten uzmanlaşıyor mu?

Adın çağrıştırdığı resim şu: bir uzman matematiğe, bir başkası koda, bir başkası biyolojiye bakar. Ölçüm bu resmi doğrulamıyor — ya da tam olarak doğrulamıyor, ve iki ölçümün ayrıldığı yer öğretici.

Albert Jiang ve arkadaşlarının 2024'te yayımladığı — hakemli bir yerde yayımlandığı doğrulanamayan — çalışma, sekiz uzmanlı ve token başına iki uzman seçen bir modelin — Şekil 1'deki 47 milyar toplam, 13 milyar etkin parametreli model — yönlendirmesini inceliyor. Bulgu açık: uzman atamalarının dağılımı LaTeX ile yazılmış makalelerde, biyoloji özetlerinde ve ansiklopedi maddelerinde birbirine çok benziyor; yani konuya göre bir uzmanlaşma **görünmüyor**. Görünen şey başka: ardışık token'lar sık sık aynı uzmana gidiyor. Orta katmanlarda ardışık iki token'ın birinci tercihinin aynı çıkma oranı yüzde 22,7 ile 28,4 arasında, oysa rastgele atamada beklenen oran yüzde 12,5. Yani yönlendirici konuyu değil, konumsal ve sözdizimsel bir yapıyı yakalıyor.

Niklas Muennighoff ve arkadaşlarının ICLR 2025'te sunduğu çalışma ise tersini buluyor — ve bulabilmesinin sebebi, modelin bütün eğitim ara kayıtlarıyla birlikte açık olması. 64 uzmanlı ve token başına sekiz uzman seçen bir modelde: yönlendirme eğitimin erken bir aşamasında **doyuyor** (ön eğitimin yüzde 40'ında, son hâline göre doyma yüzde 80'e varıyor), uzmanlar nadiren birlikte etkinleşiyor, ve alan düzeyinde de sözlük düzeyinde de uzmanlaşma görülüyor.

İki sonucu çelişki olarak değil, tasarım farkı olarak okumak gerekiyor. Sekiz uzmandan iki tanesini seçmekle 64 uzmandan sekiz tanesini seçmek aynı tanecikte değil; ikincisinde her uzman daha küçük ve daha özelleşebilir. Damai Dai ve arkadaşlarının ACL 2024'te sunduğu çalışma tam bu tezi savunuyor: uzmanları inceltmek ve yanlarına her token'ın kullandığı ortak uzmanlar koymak, uzmanlaşmayı artırıyor. Bildirdikleri sayı iddiayı somutlaştırıyor: 16 milyar parametreli seyrek modelleri, 7 milyar parametreli yoğun bir modelin başarısına yaklaşık **yüzde 40** hesapla ulaşıyor.

> **Kendini yokla:** Bir uzmanlar karışımı modelinin "671 milyar parametreli" olduğunu söylemek neden yanıltıcı olabilir?

Çünkü tek bir sayı üç ayrı büyüklüğü birbirine karıştırıyor. Kalite tarafında anlamlı olan büyüklük, o modeli aynı başarıyı veren yoğun bir modele eşleyen etkin parametre sayısıdır. Hesap tarafında anlamlı olan, token başına çalışan parametredir — burada 37 milyar. Bellek ve dağıtım tarafında anlamlı olan ise toplam parametredir — 671 milyar, ve donanımı belirleyen budur. Üçü aynı model için üç farklı sayıdır; hangisinin söylendiği belirtilmeden karşılaştırma yapılamaz.

## Uzmanlar karışımının disiplini

**Uzmanlar karışımı parametre ile hesabı ayırır.** Katmanın parametresi uzman sayısıyla, token başına hesabı ise yalnızca seçilen uzman sayısıyla çarpılır; sekiz uzmandan ikisini seçmek sekiz kat kapasiteyi iki kat hesapla verir.

**Yönlendirme kendiliğinden dengelenmez.** Kapı ağı bırakılırsa birkaç uzmana yığılır; yük dengeleme kaybı, kapasite sınırı ve atamayı tersine çevirmek bunun üç ayrı çözümüdür ve ilk ikisinin bedeli sırasıyla asıl hedefle yarışan bir terim ve düşen token'lardır.

**Ölçek iddiası, neyin sabit tutulduğuna bağlıdır.** Eğitim süresi ve uzman boyu sabitken yönlendirmenin faydası azalıyor ve belirli bir boyutta kesiliyor; üç değişken birden eniyilendiğinde uzmanlar karışımı her bütçede öne geçiyor. Çelişki veride değil, ailenin tanımında.

**Bedel bellekte ve iletişimde ödenir.** Çalışan parametre az olsa da bütün uzmanlar yüklüdür, ve her katmanda cihazlar arası hepsi-hepsiye bir iletişim vardır.

**Seyreklik token başınadır, yığın başına değil.** Yığın büyüdükçe uzmanların tamamı etkinleşir; kazanılan şey tek bir token'ın hesabıdır.

**"Kaç parametre" sorusunun üç ayrı cevabı vardır.** Toplam parametre donanımı, çalışan parametre hesabı, etkin parametre sayısı ise kaliteyi belirler; hangisi kastedildiği söylenmeden sayı bir şey ifade etmez.

**Uzmanlaşma bir varsayım değil, ölçülecek bir şeydir.** Sekiz uzmanlı bir modelde konuya göre uzmanlaşma görünmezken 64 uzmanlı açık bir modelde alan ve sözlük uzmanlaşması ölçülüyor; farkı yaratan tanecik.

Bütün bunlar birleşince pratik bir karar kuralı çıkıyor ve 60\. makaledeki maliyet-gecikme hesabına doğrudan bağlanıyor. Uzmanlar karışımı, belleğin bol ve isteklerin yığınlanabildiği bir sunucu ortamında kazandırır: orada asıl kıt kaynak hesaptır ve seyreklik tam olarak onu ucuzlatır. Belleğin kıt olduğu bir yerde — tek bir hızlandırıcıda ya da cihaz üstünde — kazandırmaz, çünkü orada kıt olan şey hesap değil, modelin sığıp sığmadığıdır. Aynı model, iki ortamda iki ayrı ekonomiye tabidir.

### Sırada ne var

Bu makale bloğun bir yarısına dokundu — parametrelerin çoğunun durduğu, işleyen yarısına. Öteki yarısı, yani bakan yarısı, seride 6\. makaleden beri hiç sorgulanmadan duruyor: dikkat. Oysa 7\. makalede bir kapı açık bırakmıştık, dikkatin uzak bağlantıları kurmanın tek yolu olmadığını söylemiştik. Bir sonraki makale o kapıdan giriyor: dikkatin karesel maliyeti tam olarak nerede ödeniyor, onu ödemeyen mimariler neyi feda ediyor, ve feda edilen şey ölçülebilir mi?

## Kaynakça

- Jacobs, R. A., Jordan, M. I., Nowlan, S. J. & Hinton, G. E. (1991). *Adaptive Mixtures of Local Experts*. Neural Computation 3(1), s. 79–87. [Bağlantı](https://doi.org/10.1162/neco.1991.3.1.79)
- Shazeer, N., Mirhoseini, A., Maziarz, K., Davis, A., Le, Q., Hinton, G. & Dean, J. (2017). *Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer*. ICLR 2017. [Bağlantı](https://arxiv.org/abs/1701.06538)
- Lepikhin, D., Lee, H., Xu, Y., Chen, D., Firat, O., Huang, Y., Krikun, M., Shazeer, N. & Chen, Z. (2021). *GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding*. ICLR 2021. [Bağlantı](https://arxiv.org/abs/2006.16668)
- Fedus, W., Zoph, B. & Shazeer, N. (2022). *Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity*. Journal of Machine Learning Research 23(120). [Bağlantı](https://www.jmlr.org/papers/v23/21-0998.html)
- Zoph, B., Bello, I., Kumar, S., Du, N., Huang, Y., Dean, J., Shazeer, N. & Fedus, W. (2022). *ST-MoE: Designing Stable and Transferable Sparse Expert Models*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2202.08906. [Bağlantı](https://arxiv.org/abs/2202.08906)
- Zhou, Y., Lei, T., Liu, H., Du, N., Huang, Y., Zhao, V., Dai, A., Chen, Z., Le, Q. & Laudon, J. (2022). *Mixture-of-Experts with Expert Choice Routing*. NeurIPS 2022. [Bağlantı](https://papers.nips.cc/paper_files/paper/2022/hash/2f00ecd787b432c1d36f3de9800728eb-Abstract-Conference.html)
- Clark, A., de las Casas, D., Guy, A., Mensch, A., Paganini, M., Hoffmann, J., Damoc, B., Hechtman, B., Cai, T., Borgeaud, S., van den Driessche, G., Rutherford, E., Hennigan, T., Johnson, M., Millican, K., Cassirer, A., Jones, C., Buchatskaya, E., Budden, D., Sifre, L., Osindero, S., Vinyals, O., Rae, J., Elsen, E., Kavukcuoglu, K. & Simonyan, K. (2022). *Unified Scaling Laws for Routed Language Models*. ICML 2022. [Bağlantı](https://proceedings.mlr.press/v162/clark22a.html)
- Ludziejewski, J., Krajewski, J., Adamczewski, K., Pióro, M., Krutul, M., Antoniak, S., Ciebiera, K., Król, K., Odrzygóźdź, T., Sankowski, P., Cygan, M. & Jaszczur, S. (2024). *Scaling Laws for Fine-Grained Mixture of Experts*. ICML 2024. [Bağlantı](https://proceedings.mlr.press/v235/ludziejewski24a.html)
- Komatsuzaki, A., Puigcerver, J., Lee-Thorp, J., Ruiz, C. R., Mustafa, B., Ainslie, J., Tay, Y., Dehghani, M. & Houlsby, N. (2023). *Sparse Upcycling: Training Mixture-of-Experts from Dense Checkpoints*. ICLR 2023. [Bağlantı](https://arxiv.org/abs/2212.05055)
- Du, N., Huang, Y., Dai, A. M., Tong, S., Lepikhin, D., Xu, Y., Krikun, M., Zhou, Y., Yu, A. W., Firat, O., Zoph, B., Fedus, L., Bosma, M., Zhou, Z., Wang, T., Wang, Y. E., Webster, K., Pellat, M., Robinson, K., Meier-Hellstern, K., Duke, T., Dixon, L., Zhang, K., Le, Q. V., Wu, Y., Chen, Z. & Cui, C. (2022). *GLaM: Efficient Scaling of Language Models with Mixture-of-Experts*. ICML 2022. [Bağlantı](https://proceedings.mlr.press/v162/du22c.html)
- Rajbhandari, S., Li, C., Yao, Z., Zhang, M., Aminabadi, R. Y., Awan, A. A., Rasley, J. & He, Y. (2022). *DeepSpeed-MoE: Advancing Mixture-of-Experts Inference and Training to Power Next-Generation AI Scale*. ICML 2022. [Bağlantı](https://proceedings.mlr.press/v162/rajbhandari22a.html)
- Gale, T., Narayanan, D., Young, C. & Zaharia, M. (2023). *MegaBlocks: Efficient Sparse Training with Mixture-of-Experts*. MLSys 2023. [Bağlantı](https://proceedings.mlsys.org/paper_files/paper/2023/hash/5a54f79333768effe7e8927bcccffe40-Abstract-mlsys2023.html)
- Jiang, A. Q., Sablayrolles, A., Roux, A., Mensch, A., Savary, B., Bamford, C., Chaplot, D. S., de las Casas, D., Bou Hanna, E., Bressand, F., Lengyel, G., Bour, G., Lample, G., Renard Lavaud, L., Saulnier, L., Lachaux, M.-A., Stock, P., Subramanian, S., Yang, S., Antoniak, S., Le Scao, T., Gervet, T., Lavril, T., Wang, T., Lacroix, T. & El Sayed, W. (2024). *Mixtral of Experts*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2401.04088. [Bağlantı](https://arxiv.org/abs/2401.04088)
- Muennighoff, N., Soldaini, L., Groeneveld, D., Lo, K., Morrison, J., Min, S., Shi, W., Walsh, P., Tafjord, O., Lambert, N., Gu, Y., Arora, S., Bhagia, A., Schwenk, D., Wadden, D., Wettig, A., Hui, B., Dettmers, T., Kiela, D., Farhadi, A., Smith, N. A., Koh, P. W., Singh, A. & Hajishirzi, H. (2025). *OLMoE: Open Mixture-of-Experts Language Models*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/9b224ace8963c9385ad5e2b5c9039b97-Abstract-Conference.html)
- Dai, D., Deng, C., Zhao, C., Xu, R. X., Gao, H., Chen, D., Li, J., Zeng, W., Yu, X., Wu, Y., Xie, Z., Li, Y. K., Huang, P., Luo, F., Ruan, C., Sui, Z. & Liang, W. (2024). *DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models*. ACL 2024. [Bağlantı](https://aclanthology.org/2024.acl-long.70/)
