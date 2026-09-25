---
article_id: article_dd953c36-6ef2-45d1-993e-0b9c1022a17d
title: "Uçta Yapay Zekâ: Telefonda ve Cihazda LLM"
slug: ucta-yapay-zeka-telefonda-ve-cihazda-llm
category: multimodal-and-future
level: intermediate
reading_order: 88
summary: "Küçük model artık var; peki nereye gidiyor? Cihazda 26 ve 28'in servis hesabının dayandığı tek varsayım — aynı anda çok sayıda isteğe hizmet vermek — ortadan kalkıyor: yığın birdir ve model kalıcı olarak bellek bant genişliğine çakılır. Ardından dört kısıt aynı anda bağlayıcı hâle geliyor ve dördü de ölçülmüş: bellek, bant genişliği, güç ve ısı. Üretimdeki bir cihaz modelinin anatomisi parça parça açılıyor — ağırlıkta iki bit, sözlük tablosunda dört, önbellekte sekiz, kaybı telafi eden düşük ranklı adaptörler ve önbelleği paylaşan iki bloklu bir gövde. Kapanışta iki dürüst kayıt: daha az bit her zaman daha hızlı değil, ve sürekli çalıştırmayı bitiren şey pil değil ısı."
tags:
  - cihazda-cikarim
  - bellek-bant-genisligi
  - kuantizasyon
  - enerji-butcesi
  - melez-calistirma
content_hash: sha256:f4224c55b765a7f2648ccbe5171cbeea12e0ba43c6a1eeeadefe16f95d0fa51e
classification_version: 1
classification_batch: 21
---
## Aynı model, başka bir yer

87\. makalede küçük bir model elde ettik. Şimdi onu bir yere koymak gerekiyor ve seri boyunca varsaydığımız yer hep aynıydı: bir veri merkezindeki hızlandırıcı. 26 ve 28\. makalelerdeki bütün servis hesabı bu varsayımın üzerine kuruluydu — ağırlıkları bir kez oku, aynı anda çok sayıda isteğe token üret, maliyeti onlara böl.

Bu makalenin sorusu, o varsayımı kaldırınca ne olduğu. Model telefonda çalışıyorsa tek bir kullanıcısı vardır, sıraya girecek başka istek yoktur ve kart yerine avuç içine sığan bir yonga vardır. Değişen şey yalnızca ölçek değil, hesabın **yapısı**.

Alanın bu bölgeye verdiği ad **uç** (edge): hesabın, verinin üretildiği yerde — telefonda, dizüstünde, arabada, sensörün yanında — yapılması. Bu makalede telefonu örnek alacağız, çünkü kısıtları en dar ve ölçümleri en çok olan cihaz o; fakat aşağıdaki dört kısıt bütün uç donanımları için aynı listedir, yalnızca sayıları değişir.

## Cihazda yığın yoktur

26\. makalede bir oran hesaplamıştık. Kullanılan hızlandırıcı saniyede 275 trilyon işlem yapabiliyor ve yavaş belleğinden saniyede 1.200 gigabayt okuyabiliyordu; bu ikisinin oranı, çipin okuduğu her bayt için yapabileceği işlem sayısını veriyordu: yaklaşık 229. Sonra adım adım üretimin muhasebesini çıkarmıştık: ağırlıklar bir kez okunur ve yığındaki her istek için birer token üretilir, yani okunan bayt başına yapılan işlem **tam olarak yığın büyüklüğü kadardır**.

Bu cümlenin cihazdaki karşılığını yazmak yeterli. Yığın büyüklüğü 1'dir; 16 bitlik ağırlıklarda bayt başına bir işlem yapılır, 4 bite indirilmiş ağırlıklarda dört. O hızlandırıcıyı bir an telefonun içine koyduğunu düşün: 229'luk kapasitenin yüzde ikisinden azı kullanılır. Telefon yongalarının kendi oranı başka bir sayıdır, ama birazdan göreceğimiz ölçüm aynı yöne çıkıyor: model, üretimin her adımında bellek bant genişliğine çakılır. Bulutta yığınlama bu boşluğu doldurmak için vardı; cihazda dolduracak bir şey yok.

![İki sütunlu karşılaştırma tablosu; sütunlar aynı modelin iki çalışma yeri: veri merkezi ve cihaz. Satırlar sırasıyla şunları veriyor. Aynı anda hizmet verilen istek sayısı: veri merkezinde onlarca ya da yüzlerce, cihazda bir. Okunan bayt başına yapılan işlem: veri merkezinde yığın büyüklüğü kadar, cihazda 16 bitlik ağırlıklarla bir. Ağırlıkları okumanın bedelini kimin paylaştığı: veri merkezinde bütün yığın, cihazda tek kullanıcı. Neyin sınırladığı: veri merkezinde ön dolumda hesap gücü ve üretimde bellek bant genişliği, cihazda her iki aşamada da bellek bant genişliği. Boşta duran kapasitenin doldurulma yolu: veri merkezinde sürekli yığınlama ve parçalı ön dolum, cihazda böyle bir yol yok. En altta bir kayıt: cihazda ölçülen üretim verimi ön dolum veriminin çok altında kalıyor ve bu, aynı olgunun doğrudan gözlemi.](assets/bulutta-ve-cihazda-ayni-hesap.svg "Şekil 1 — Yığın düşünce geriye ne kalıyor")

Şekil 1 iki hesabı yan yana koyuyor. Ölçüm de aynı yöne bakıyor: Stefanos Laskaridis ve arkadaşlarının MobiCom 2024'te sunduğu çalışma dört telefon, iki işletim sistemi ve iki ayrı çalıştırma çerçevesiyle cihaz üstü çalıştırmayı sistematik olarak ölçen ilk iş ve vardıkları ilk sonuç şu: cihazda dil modeli çıkarımı büyük ölçüde bellek sınırlıdır, ve ön dolum verimi üretim veriminin çok üstündedir.

Ölçeği görmek için iki sayı yeter. Aynı çalışmada, masaüstü sınıfı bir yongaya sahip bir bilgisayar 7 milyar parametreli, 4 bite indirilmiş bir modeli saniyede 46,8 token'la çalıştırıyor. Bir telefonda 1,1 milyarlık bir model saniyede yaklaşık 13,6 token veriyor. Aradaki fark parametre sayısıyla açıklanamaz; bant genişliğiyle açıklanır.

## Dört kısıt aynı anda bağlayıcı

Veri merkezinde tek bir kısıt üzerinde eniyileme yaparsın: genellikle bellek, bazen gecikme. Cihazda dört kısıt aynı anda bağlayıcıdır ve dördü de ölçülmüştür.

Zechun Liu ve arkadaşlarının ICML 2024'te sunduğu çalışma bunları tek yerde topluyor. **Bellek:** telefonlarda çalışma belleği 6 ile 12 gigabayt arasında ve bu bellek işletim sistemiyle bütün öbür uygulamalarla paylaşılıyor; bir uygulamanın yüzde 10'unu geçmemesi beklenir. **Enerji:** milyar parametre başına token başına yaklaşık 0,1 joule harcanıyor; 7 milyarlık bir model token başına 0,7 joule demek. Tam dolu bir telefon pili yaklaşık 50 kilojoule taşır. Bu iki sayıyı bölmek bize bir tavan veriyor — kaynağın vermediği, girdileri yukarıda duran kendi hesabımız: 50.000 ÷ 0,7 ≈ 71.400 token, saniyede 10 token hızında yaklaşık 7.100 saniye, yani **iki saatin biraz altı**. Bu, ekran kapalıyken ve başka hiçbir uygulama çalışmazken geçerli bir üst sınır. 350 milyonluk, 8 bitlik bir model ise token başına 0,035 joule harcıyor: aynı pille bütün gün.

![Dört satırlı bir tablo; satırlar cihazdaki dört kısıt. Birinci satır bellek: ölçülmüş değer çalışma belleğinin 6 ile 12 gigabayt arası olması ve bir uygulamanın bunun yüzde 10'unu geçmemesinin beklenmesi; gevşeten teknikler kuantizasyon ve ağırlıkları flash bellekten akıtmak; bedeli doğruluk kaybı ve okuma gecikmesi. İkinci satır bellek bant genişliği: ölçülmüş değer yığın büyüklüğünün bir olması ve 16 bitlik ağırlıklarda okunan bayt başına yalnızca bir işlem yapılması; gevşeten teknikler daha az bit ve anahtar-değer önbelleğini paylaşmak; bedeli çözme işleminin kendi maliyeti. Üçüncü satır enerji: ölçülmüş değer milyar parametre başına token başına yaklaşık 0,1 joule, yani 7 milyarlık modelde token başına 0,7 joule, 350 milyonluk 8 bitlik modelde 0,035 joule; gevşeten teknik daha küçük model; bedeli kalite tavanı. Dördüncü satır ısı ve güç: ölçülmüş değer telefonlarda sürekli 13,8 vata varan çekim ve yüzey sıcaklığının 47,9 dereceye çıkması; gevşeten teknikler süre sınırı koymak ve işi sinir ağı işlemcisine vermek; bedeli sürekli çalıştırmanın mümkün olmaması. En altta bir kayıt: tam dolu bir pil yaklaşık 50 kilojoule taşır; bu iki sayı bölündüğünde saniyede 10 token hızında 7 milyarlık bir modelin iki saatin biraz altında pili bitireceği çıkar.](assets/cihaz-butcesi.svg "Şekil 2 — Dördü birden bağlıyor")

Aynı çalışmanın mimari bulgusu da bu bütçeden çıkıyor. Milyarın altındaki ölçekte, yazarların ölçümüne göre modelin **derin ve ince** olması, aynı parametre sayısını geniş ve sığ dağıtmaktan iyi sonuç veriyor; embedding tablosunu giriş ve çıkışta paylaşmak ve gruplu sorgu dikkati kullanmak da parametreyi bu bütçenin içinde tutuyor. Kurdukları 125 ve 350 milyonluk modeller, aynı boyuttaki önceki en iyi modellerin sırasıyla 2,7 ve 4,3 puan önüne geçiyor. Cihazı hedefleyen mimari çalışmanın kendisi yeni değil — Zhiqing Sun ve arkadaşlarının ACL 2020'de sunduğu MobileBERT aynı soruyu dil modellerinden önceki kuşakta sormuş ve cevabı yine mimaride aramıştı; yeni olan, kısıt listesinin dörde çıkması.

Şekil 2'nin son satırı en az fark edilenidir. Aynı MobiCom çalışması telefonlarda sürekli 13,8 vata varan güç çekimi ve yüzey sıcaklığının 47,9 dereceye çıktığını ölçüyor. Telefonlar edilgen soğutulur; bu sıcaklıkta işletim sistemi hızı kısar ve cihaz elde tutulamaz hâle gelir. Ölçülen pil dayanımı da bunu tamamlıyor: üretilen token başına yaklaşık 0,16 ile 0,21 miliwatt-saat harcanıyor ve çalışmanın konuşma yüküyle tam dolu bir pil, cihaza göre 490 ile 591 arası isteme yetiyor. Yani cihazda çalıştırmanın gerçek sınırı çoğu zaman pil değil, ısı.

> **Kendini yokla:** Bir modeli 4 bite indirmek cihazda hem belleği hem de token hızını iyileştiriyor. Bu iki kazanç neden aynı kaynaktan geliyor?

Çünkü cihazda üretimin her adımı, bütün ağırlıkları bellekten okumak demektir ve yığın olmadığı için o okuma maliyeti hiçbir şeyle paylaşılmaz. Bit sayısını yarıya indirmek hem depolanan hem de her adımda taşınan baytı yarıya indirir. Bulutta ikinci kazanç yığınla seyrelir; cihazda doğrudan token hızına yansır.

## Bir cihaz modelinin anatomisi

Şimdi bu kısıtların bir üretim sisteminde nasıl karşılandığına bakalım. Apple'ın 2025'te yayımladığı — hakemli olmayan, kendi sistemine dair — teknik raporu cihazda çalışan yaklaşık 3 milyar parametreli modelini parça parça anlatıyor ve her parça yukarıdaki kısıtlardan birine cevap veriyor.

**Ağırlıklar iki bitte.** Model, ağırlık başına 2 bite **kuantizasyona duyarlı eğitimle** indiriliyor — 27\. makalede eğitilmiş modeli tek geçişte kuantize etmekle, ağırlıkları eğitim sırasında kaba ızgaraya alıştırmak arasında yaptığımız ayrımın ikincisi. Sözlük tablosu 4 bitte, anahtar-değer önbelleği 8 bitte tutuluyor. Sıkıştırmanın yediği kalite ise 19\. makaledeki mekanizmayla geri alınıyor: dondurulmuş kuantize gövdenin üzerine düşük ranklı adaptörler eğitiliyor.

**Gövde ikiye bölünüyor.** Katmanların yüzde 62,5'i birinci blokta, kalan yüzde 37,5'i ikinci blokta. İkinci bloğun anahtar ve değer izdüşümleri **tümüyle kaldırılmış**; o katmanlar birinci bloğun ürettiği önbelleği paylaşıyor. İki sonuç birden çıkıyor: önbellek belleği yüzde 37,5 azalıyor, ve ikinci blok anahtar-değer üretmediği için ön dolum aşaması onun hesabını tamamen atlayabiliyor — ilk token'ın gelme süresi yaklaşık yüzde 37,5 kısalıyor. 21 ve 26\. makalelerdeki iki ayrı maliyet kalemi, tek bir mimari kararla birlikte azalıyor.

![Üç sütunlu bir tablo; sütunlar cihazda çalışan bir üretim modelinin üç tasarım kararı. Birinci sütun ağırlık ve önbellek hassasiyeti: karar, ağırlıkların kuantizasyona duyarlı eğitimle ağırlık başına iki bite indirilmesi, sözlük tablosunun dört bitte ve anahtar-değer önbelleğinin sekiz bitte tutulması; gevşettiği kısıt bellek ve bant genişliği; kaybın telafisi dondurulmuş gövdenin üzerine eğitilen düşük ranklı adaptörler. İkinci sütun önbellek paylaşımı: karar, katmanların yüzde 62,5'inin birinci blokta, yüzde 37,5'inin anahtar ve değer izdüşümleri kaldırılmış ikinci blokta olması ve ikinci bloğun birinci bloğun önbelleğini paylaşması; gevşettiği kısıt önbellek belleği ve ilk token süresi; ölçülen kazanç ikisinde de yaklaşık yüzde 37,5. Üçüncü sütun sunucu tarafındaki karşılığı: karar, sunucu modelinin ağırlık başına 3,56 bite, grafik donanımının doku sıkıştırma biçimiyle indirilmesi; gevşettiği kısıt bellek; kazancı çözmenin donanımda sabit işlevli birimle neredeyse bedelsiz yapılabilmesi. En altta bir kayıt: üç karar da aynı yere bakıyor, her adımda bellekten okunan bayt.](assets/cihaz-modelinin-anatomisi.svg "Şekil 3 — Her karar aynı kaleme yazılıyor")

Bellek kısıtının bir sonucu daha var ve doğrudan 19\. makalenin mekanizmasını kullanıyor. Cihaza tek bir temel model sığıyor, ama ondan beklenen iş bir tane değil: özetleme, yeniden yazma, bildirim önceliklendirme. Aynı ekibin 2024 raporundaki çözüm, her iş için ayrı bir model değil, temel modelin üzerine takılan ayrı bir düşük ranklı adaptör. 3 milyarlık model için rankı 16 olan bir adaptörün parametreleri 16 bitte tutulduğunda onlarca megabayt yer kaplıyor ve adaptörler çalışma anında yüklenip değiştirilebiliyor. Gövde bellekte bir kez durur, davranış megabaytlarla değişir: cihaz bütçesinde ödenebilir tek çoklu görev biçimi bu.

Şekil 3'ün üçüncü sütunu ayrıca öğretici. Aynı raporun sunucu modeli, ağırlık başına 3,56 bite, grafik işlem hattının **doku sıkıştırma** biçimiyle indiriliyor. Bu biçim yapay zekâ için tasarlanmamıştı; oyun dokularını sıkıştırmak için vardı ve çözücüsü donanımda sabit işlevli bir birim olarak zaten duruyordu. Ağırlıklar o biçime çevrilince, çözme işlemi neredeyse bedelsiz hâle geliyor. Verimlilik burada bir algoritmadan değil, hazır duran bir donanım parçasından geliyor — bir sonraki makalenin konusuna doğrudan bir kapı.

Bir de sezgiyi bozan ölçüm var. MobiCom çalışması, 4 bite indirilmiş modellerin 3 bitlik sürümlerinden **ortalama yüzde 24,77 daha hızlı** çalıştığını buluyor. Sebep, kuantize ağırlıkların çarpmadan önce çözülmesi gerektiği ve 3 bitin bellek hizalamasına 4 bit kadar uymadığı. 27\. makalenin kaydı burada kendini gösteriyor: kazanılan şey taşımadır, işlem değil — ve taşımayı azaltmanın da bir tabanı var.

## Belleğin bir katı daha aşağısı

Model çalışma belleğine sığmıyorsa ne olur? Keivan Alizadeh ve arkadaşlarının ACL 2024'te sunduğu çalışma bu soruya sistem tarafından cevap veriyor: ağırlıkları flash bellekte tut, çalışma belleğine yalnızca gerekeni getir.

Fikrin işe yaraması iki gözleme ve bir donanım gerçeğine dayanıyor. Birincisi, ileri beslemeli katmanların aktivasyonları seyrektir: her token için ağırlıkların ancak küçük bir kısmı gerçekten kullanılır. İkincisi, ardışık token'lar büyük ölçüde **aynı** ağırlıkları kullanır; yazarlar bunu bir pencere içinde tutarak yeniden okumayı ortadan kaldırıyorlar. Donanım gerçeği ise flash belleğin fiziğinden geliyor: küçük parçalar hâlinde rastgele okumak yavaş, büyük parçalar hâlinde ardışık okumak hızlı; bu yüzden satır ve sütunlar birlikte paketleniyor.

Sonuç, çalışma belleğinin **iki katı** boyutunda bir modeli çalıştırabilmek ve saf yükleme düzenine göre işlemcide 4, grafik biriminde 20 kata varan hızlanma. Zhenliang Xue ve arkadaşlarının 2024'te yayımladığı — hakemli olmayan — çalışma aynı fikri bir adım öteye taşıyor. Matris çarpımını, birlikte etkinleşen nöron öbeklerine ayırıyorlar ve öbekleri iki ayrı işlemciye dağıtıyorlar: yoğun etkinleşen öbekler telefonun sinir ağı işlemcisine, seyrek olanlar merkezi işlemciye. Bunun sebebi, sinir ağı işlemcisinin büyük ve düzenli matris işlerinde verimli, dağınık erişimde verimsiz olması — yani cihazda hangi işin hangi birime verileceği de bir tasarım kararı. Depolama tarafında ise öbek düzeyinde bir hat kuruyorlar: bir öbek hesaplanırken bir sonraki flash bellekten okunuyor. Sonuç, bir telefonda 47 milyar parametreli bir modelin saniyede 11,68 token'la çalışması.

Bu düzenin 86\. makaledeki dersle aynı olduğunu fark et: darboğaz aritmetik değil, bellek erişimi; ve doğru cevap hesabı azaltmak değil, veriyi hiyerarşinin doğru katmanında tutmak. Orada katmanlar çipin içindeydi; burada bir kat daha aşağıya, kalıcı depolamaya iniliyor.

## Ne zaman cihaz, ne zaman değil

Cihazda çalıştırmanın üç somut gerekçesi var ve üçü de mimariyle ilgili değil. Gecikme: ağ turu yok. Gizlilik: veri cihazdan çıkmıyor. Kullanılabilirlik: bağlantı olmadan da çalışıyor. Üçüncüsü, kullanıcı verisiyle uyarlama için de bir kapı açıyor — H. Brendan McMahan ve arkadaşlarının AISTATS 2017'de kurduğu düzen, güncellemeleri cihazda hesaplayıp yalnızca değişimi merkeze göndermeyi öneriyordu ve bugünkü cihaz üstü kişiselleştirmenin çerçevesi hâlâ bu.

İkinci gerekçe, üzerinde durmayı hak eden bir kayıt taşıyor. "Cihazda çalışıyor" cümlesi tek başına gizlilik garantisi değildir: modelin ağırlıkları cihazdaysa da istem, uygulamanın kendisine, işletim sistemine ve — melez bir düzende — sunucuya gidebilir. Gizlilik iddiası, hangi verinin hangi sınırı geçtiğine dair somut bir cümleyle birlikte anlamlıdır; 80\. makaledeki belgeleme tartışmasının cihaz tarafındaki karşılığı budur.

Karşı taraf da ölçülmüş. Birincisi kalite tavanı: 87\. makalenin sınırı burada bağlayıcı, çünkü cihaza sığan model küçüktür ve küçük model öğretmeninin ötesine geçmez. İkincisi süreklilik: yukarıdaki ısı ve güç ölçümleri, bir dil modelini arka planda sürekli çalışır tutmanın bugün mümkün olmadığını söylüyor. MobiCom çalışmasının kendi cümlesi bunu iyi özetliyor — bir şeyin çalıştırılabilir olması, dağıtılabilir olduğu anlamına gelmiyor.

Pratikte kurulan düzen bu yüzden melez: kısa, gecikmeye duyarlı ve gizli işler cihazda; uzun, zor ve büyük model isteyen işler sunucuda. Yukarıdaki raporun iki ayrı model yayımlamasının sebebi de bu.

Bu ayrımın kendisi 60\. makaledeki hesabın cihaz tarafındaki hâli. Orada bir yönlendiricinin sorguyu güçlü ya da zayıf modele ayırmasını konuşmuştuk ve ölçüt maliyet ile gecikmeydi. Cihazda üçüncü bir ölçüt ekleniyor: verinin sınırı geçip geçmemesi. Ve dördüncüsü, cihaz modelinden beklenen iş listesinin dar olması — özetleme, yeniden yazma, sınıflandırma gibi girdisi önünde duran ve çıktısı kısa işler. Bu işlerde küçük bir model iyi çalışır, çünkü 87\. makaledeki sınır tam olarak burada bağlamaz: aktarılması gereken şey öğretmenin olgusal bilgisi değil, bir biçim dönüşümü. Cihaz modelinin dar iş listesi bir eksiklik değil, kısıtlarla uyumlu bir seçim.

> **Kendini yokla:** Aynı model iki farklı çalıştırma çerçevesinde 3,53 kata varan hız farkı veriyor. Bu, modelin hızı hakkında ne söyler?

Tek başına hiçbir şey söylemez. Ölçülen şey model değil, model ile donanım arasındaki yazılım katmanıdır: işlemlerin nasıl kaynaştırıldığı, çekirdeklerin hangi yonga için derlendiği, belleğin nasıl hizalandığı. Cihaz üstü bir sayıyı okurken hangi çerçeve, hangi yonga, hangi bit genişliği ve hangi bağlam uzunluğuyla ölçüldüğü söylenmemişse sayı karşılaştırılabilir değildir. Colby Banbury, Vijay Janapa Reddi ve arkadaşlarının NeurIPS 2021'in veri kümeleri ve ölçütler bölümünde sunduğu MLPerf Tiny'nin bütün işi tam olarak budur: küçük cihazlarda ölçüm koşullarını — görev, veri, kalite eşiği ve enerji ölçme yordamı — sabitleyip sayıları karşılaştırılabilir kılmak.

## Uçta çalıştırmanın disiplini

**Yığın birdir ve bu her şeyi değiştirir.** Bulutun bütün servis mühendisliği okunan baytı çok isteğe bölmek üzerine kuruluydu; cihazda o payda yoktur, dolayısıyla model kalıcı olarak bant genişliği sınırındadır.

**Dört kısıt aynı anda bağlar.** Bellek, bant genişliği, enerji ve ısı; bir tekniği yalnızca birini gevşettiği için seçmek, öbür üçünde bedel ödemek demektir.

**Daha az bit her zaman daha hızlı değildir.** Çözme maliyeti ve bellek hizalaması, 3 bitin 4 bitten yavaş çıkmasına yol açabiliyor; bit sayısı bir tasarım değişkenidir, doğrudan bir hız ölçüsü değil.

**Sınırı belirleyen çoğu zaman ısıdır.** Pil dayanımı hesaplanabilir bir sayıdır; edilgen soğutulan bir cihazın sürekli yük altında ne kadar dayanacağı ayrı bir sayıdır ve daha kısıtlayıcıdır.

**Cihaz modelinin dar iş listesi bir seçimdir.** Girdisi önünde duran ve çıktısı kısa işlerde küçük model iyi çalışır; olgusal bilgi isteyen işlerde çalışmaz, ve ayrım ürünün kendisinde yapılır.

**Cihaz üstü sayılar koşullarıyla okunur.** Hangi yonga, hangi çerçeve, hangi bit genişliği, hangi bağlam uzunluğu — bunlar söylenmeden verilen bir token/saniye değeri karşılaştırma için kullanılamaz.

### Sırada ne var

Bu makalede dört kısıt saydık ve üçü doğrudan donanımdan geliyordu: ne kadar bellek, ne kadar bant genişliği, ne kadar güç. 26\. makalede hesapladığımız "bayt başına 229 işlem" oranı da öyle. Bir sonraki makale o oranın ne olduğunu ve nereden geldiğini kuruyor: hesap kapasitesi, bellek bandı ve iletişim bandı yirmi yıl boyunca **farklı hızlarda** büyüdü, ve bugün karşılaştığımız her darboğaz o üç eğrinin ayrışmasından çıkıyor. Bir yongayı "hızlandırıcı" yapan şey tam olarak nedir?

## Kaynakça

- Laskaridis, S., Katevas, K., Minto, L. & Haddadi, H. (2024). *MELTing Point: Mobile Evaluation of Language Transformers*. MobiCom 2024. [Bağlantı](https://arxiv.org/abs/2403.12844)
- Liu, Z., Zhao, C., Iandola, F., Lai, C., Tian, Y., Fedorov, I., Xiong, Y., Chang, E., Shi, Y., Krishnamoorthi, R., Lai, L. & Chandra, V. (2024). *MobileLLM: Optimizing Sub-billion Parameter Language Models for On-Device Use Cases*. ICML 2024. [Bağlantı](https://proceedings.mlr.press/v235/liu24ce.html)
- Sun, Z., Yu, H., Song, X., Liu, R., Yang, Y. & Zhou, D. (2020). *MobileBERT: a Compact Task-Agnostic BERT for Resource-Limited Devices*. ACL 2020. [Bağlantı](https://aclanthology.org/2020.acl-main.195/)
- Apple (2025). *Apple Intelligence Foundation Language Models: Tech Report 2025*. Hakemli bir yerde yayımlanmamış kurumsal teknik rapor; okunan sürüm arXiv:2507.13575. [Bağlantı](https://arxiv.org/abs/2507.13575)
- Apple (2024). *Apple Intelligence Foundation Language Models*. Hakemli bir yerde yayımlanmamış kurumsal teknik rapor; okunan sürüm arXiv:2407.21075. [Bağlantı](https://arxiv.org/abs/2407.21075)
- Alizadeh, K., Mirzadeh, I., Belenko, D., Khatamifard, S. K., Cho, M., Del Mundo, C. C., Rastegari, M. & Farajtabar, M. (2024). *LLM in a flash: Efficient Large Language Model Inference with Limited Memory*. ACL 2024. [Bağlantı](https://aclanthology.org/2024.acl-long.678/)
- Xue, Z., Song, Y., Mi, Z., Zheng, X., Xia, Y. & Chen, H. (2024). *PowerInfer-2: Fast Large Language Model Inference on a Smartphone*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2406.06282. [Bağlantı](https://arxiv.org/abs/2406.06282)
- McMahan, H. B., Moore, E., Ramage, D., Hampson, S. & Agüera y Arcas, B. (2017). *Communication-Efficient Learning of Deep Networks from Decentralized Data*. AISTATS 2017. [Bağlantı](https://proceedings.mlr.press/v54/mcmahan17a.html)
- Banbury, C., Reddi, V. J., Torelli, P., Holleman, J., Jeffries, N., Kiraly, C., Montino, P., Kanter, D., Ahmed, S., Pau, D., Thakker, U., Torrini, A., Warden, P., Cordaro, J., Di Guglielmo, G., Duarte, J., Gibellini, S., Parekh, V., Tran, H., Tran, N., Wenxu, N. & Xuesong, X. (2021). *MLPerf Tiny Benchmark*. NeurIPS 2021 Veri Kümeleri ve Ölçütler bölümü. [Bağlantı](https://datasets-benchmarks-proceedings.neurips.cc/paper_files/paper/2021/hash/da4fb5c6e93e74d3df8527599fa62642-Abstract-round1.html)
