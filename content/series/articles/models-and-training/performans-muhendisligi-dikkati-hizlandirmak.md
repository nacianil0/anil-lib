---
article_id: article_a8ba5966-f811-496e-872e-ab6832679b7c
title: "Performans Mühendisliği: Dikkati Hızlandırmak"
slug: performans-muhendisligi-dikkati-hizlandirmak
category: models-and-training
level: advanced
reading_order: 108
summary: "Bir işlemin bedelini işlem sayısı değil, taşıdığı bayt ve onu koşturan birim belirler: bir eğitim adımındaki işlemlerin yüzde 0,2'si zamanın yüzde 39'unu yiyor. Çekirdek, birleştirme, bellek yerleşimi ve bellek kullanım verimini kurar; aynı dikkat algoritmasının üç uygulamasında kullanım oranının nasıl yüzde 25'ten 75'e çıktığını ve yeni bir çip geldiğinde nasıl geri düştüğünü gösterir."
tags:
  - cekirdek-muhendisligi
  - bellek-erisimi
  - islem-birlestirme
  - karma-duyarlik
  - kullanim-orani
content_hash: sha256:a0321cae95c521579306c5d4ae9241b698086c9ae5d522657645861afb64f38c
classification_version: 1
classification_batch: 26
---
## Kartın içinde kalan kayıp

Bir önceki makale bir eğitim adımını dört eksende kartlara dağıttı ve defterler kapandı: model sığıyor, aktivasyonlar sığıyor, boru hattı kabarcığı yüzde beşin altına iniyor. Ama son satır kapanmadı. Alanın en iyi mühendisliğe sahip koşularında bile kart başına verim tepe hızın yüzde 52'sinde duruyor, ve bu kaybın geri kalanı kartlar arasında değil, **bir kartın içinde** oluşuyor.

Bu makale oraya bakıyor. Elimizde iki hazır araç var. 106\. makalede çipin sırt noktasını kurmuştuk: bir hesabın işlem yoğunluğu — ana bellekten okunan bayt başına yapılan işlem sayısı — sırt noktasının solundaysa çip veri bekliyordur, sağındaysa hesap yapıyordur. 86\. makalede ise bunun sert sonucunu görmüştük: işlem sayısını azaltmak duvar saatini azaltmaya yetmiyor, çünkü darboğaz çoğu zaman aritmetik değil bellek erişimi.

Şimdi o uyarıyı bir mühendislik disiplinine çeviriyoruz. Soru şu: bir kartın içinde tek bir işlem tam olarak neye mal olur, bu maliyeti değiştiren kaldıraçlar nelerdir, ve aynı matematiği aynı donanımda iki kat hızlı çalıştıran şey nedir?

## Bir FLOP bir zaman birimi değildir

8\. makaleden beri hesabı FLOP ile sayıyoruz — parametre başına token başına altı işlem, GPT-3 için 3,14×10²³. Bu muhasebe doğru ve vazgeçilmez, ama tek bir gizli varsayım taşıyor: her işlemin aynı süreyi aldığı. Gerçek makine bunu doğrulamıyor.

Andrei Ivanov, Nikoli Dryden, Tal Ben-Nun, Shigang Li ve Torsten Hoefler'in MLSys 2021'de sunduğu çalışma bir Transformer eğitim yinelemesini işlem sınıflarına ayırıp ikisini birden ölçüyor: her sınıf toplam işlemin ne kadarını yapıyor, ve toplam sürenin ne kadarını yiyor.

| İşlem sınıfı | İşlemin yüzdesi | Sürenin yüzdesi |
|---|---|---|
| Matris çarpımları | %99,80 | %61,0 |
| İstatistiksel normalleştirme | %0,17 | %25,5 |
| Öge bazlı işlemler | %0,03 | %13,5 |

Tablodaki iki sütun birbirini tutmuyor ve tutmaması bu makalenin başlangıç noktası. Kalanı biz hesaplayalım: matris çarpımı **dışındaki** işlemler toplamın yüzde 0,20'si, ama sürenin yüzde 39'u. Birim işlem başına düşen süreyi oranlarsak, matris çarpımı dışındaki bir işlem matris çarpımı içindeki bir işlemden yaklaşık **319 kat** pahalı: (39 ÷ 0,20) ÷ (61 ÷ 99,80) = 195 ÷ 0,611.

Bu farkın iki ayrı kaynağı var ve ikisini ayırmak gerekiyor.

Birincisi bellek erişimi, yani 106'nın sırt noktası. Katman normalleştirmesi ya da bir toplama, girdisini kart belleğinden okur, üzerinde bir iki işlem yapar ve sonucu geri yazar; işlem yoğunluğu bir mertebesindedir ve sırt noktasının çok solundadır. Çalışmanın kendi özeti bu: bir eğitim yinelemesinin üçte birinden fazlası — yüzde 37'si — bellekle sınırlı işlemlerde geçiyor.

İkincisi donanımın kendisi. Tri Dao'nun ICLR 2024'te sunduğu çalışma bunu tek cümlede söylüyor: çiplerde matris çarpımına ayrılmış özel birimler olduğu için matris çarpımı verimi, matris çarpımı olmayan işlemlerin veriminin **16 katına** kadar çıkabiliyor. Yani aynı sayıda işlem, hangi birimin koşturduğuna göre on altı kat farklı sürüyor. 89\. makalede bir çipi hızlandırıcı yapan şeyin "eklenen değil çıkarılan" olduğunu görmüştük; madalyonun öbür yüzü bu — o özel birime uymayan iş, çipin geri kalanında yürüyor.

> **Kendini yokla:** Bir mimari değişiklik toplam işlem sayısını yüzde 10 azaltıyor. Duvar saatinde en çok ne kazanırsın?

En çok yüzde 6,1. Sebebi tablonun ilk sütununda: işlemlerin yüzde 99,8'i matris çarpımlarında olduğu için yüzde 10'luk bir kesinti ancak oradan gelebilir, ve matris çarpımları sürenin yüzde 61'ini tutuyor. 0,10 × 61 = 6,1 puan. 86\. makaledeki uyarının aritmetiği tam olarak budur: işlem saymak, süreyi saymanın kötü bir vekilidir.

![Dört satırlı üç sütunlu bir tablo ve altında iki kutu. Üstte başlık: bir eğitim yinelemesinde işlem ile sürenin dağılımı. Sütunlar işlem sınıfı, işlemin yüzdesi ve sürenin yüzdesi. Birinci satır matris çarpımları: 99,80 ve 61,0. İkinci satır istatistiksel normalleştirme: 0,17 ve 25,5. Üçüncü satır öge bazlı işlemler: 0,03 ve 13,5. Bir çizginin altındaki dördüncü satır vurguludur, matris çarpımı dışındaki her şey: 0,20 ve 39,0. Birinci kutunun başlığı binde ikilik kısım, sürenin üçte birinden fazlası; içinde birim işlem başına oranın hesabı durur: 39 bölü 0,20 eşittir 195, 61 bölü 99,80 eşittir 0,611, ve 195 bölü 0,611 eşittir 319 kat. İkinci kutunun başlığı farkın iki ayrı sebebi; içinde taşınan baytın yinelemenin yüzde 37'sini bellekle sınırlı işlemlerde geçirmesi ve koşturan birimin matris çarpımı verimini ötekilerin 16 katına kadar çıkarması yazılıdır. En altta bir kayıt: yüzdeler Ivanov ve arkadaşlarından, 16 kat Dao'dan, 319 kat bizim hesabımızdır.](assets/islem-sinifi-ve-sure.svg "Şekil 1 — İşlemlerin binde ikisi, sürenin üçte birinden fazlası")

Şekil 1'in alt kutusu bu bölümün tek cümlelik sonucu: azaltılacak şey işlem değil, gidiş geliş.

## Çekirdek: karta gönderilen tek bir program

Gidiş gelişi azaltmak için önce onu ne yaptığını adlandırmak gerekiyor. Bir hızlandırıcıda hesap, **çekirdek** (kernel) denen birimler hâlinde koşar: karta gönderilen ve çipin binlerce işlem birimi üzerinde aynı anda çalışan tek bir program. Her çekirdek girdisini kart belleğinden okur, işini yapar, sonucunu kart belleğine geri yazar.

Sözcüğün seride üç ayrı nesneyi daha taşıdığını burada açıkça söyleyelim, çünkü karışması kolay: 10\. makalede çekirdek örnekleme bir kesme kuralıydı, 97\. makalede çekirdek nokta çarpımını başka bir uzaya gitmeden hesaplayan bir fonksiyondu, 26 ve 89\. makalelerde "hesap çekirdeği" çipin işlem biriminin kendisiydi. Buradaki dördüncü anlam alan yazınının kullandığıdır; 85\. makalede uzmanlar karışımının blok-seyrek çekirdeklerinden söz ederken de bu anlamdaydı.

Adlandırma yapıldığında maliyet yapısı kendiliğinden görünüyor. Bir katman normalleştirmesi, bir toplama ve bir etkinleştirme ayrı ayrı çekirdek olarak koşarsa aynı dizilim kart belleğine üç kez yazılıp üç kez okunur. Oysa yapılan aritmetik, tek bir okuma ve tek bir yazmayla bitebilecek kadar azdır. Çözümün adı **birleştirme** (fusion): art arda gelen işlemleri tek bir çekirdeğe koymak, böylece ara sonuç kart belleğine hiç inmez, çipin içindeki hızlı bellekte kalır.

Sayı koyalım, çünkü bu hesap tamamen bizim elimizde. GPT-3'ün ölçüleriyle bir katmanın aktivasyon dizilimi mikro yığın bir iken 1 × 2.048 × 12.288 = 25,2 milyon sayı, 16 bitte 50,3 MB tutar. Katman normalleştirmesi, etkinleştirme ve artık bağlantının toplanması ayrı ayrı koşarsa her biri bu diziyi bir kez okur bir kez yazar: altı tur, 302 MB. Tek çekirdekte birleştirilirse bir okuma bir yazma: 101 MB. 106'daki 1,5 TB/s'lik kart belleği bandıyla ilki 201, ikincisi 67 mikrosaniye sürer. Fark katman başına 134 mikrosaniye; doksan altı katman için mikro yığın başına 12,9 milisaniye. Bu sadeleştirilmiş bir sayımdır — gerçek uygulamalar bazı ara değerleri zaten tutar — ama mertebe doğru ve tek bir eğitim adımının yanında küçük değil.

Kazanç ölçülmüş de. Deepak Narayanan ve arkadaşlarının SC 2021 çalışması, 107'de gördüğümüz kurulumda birleştirmenin tek başına etkisini ayırıyor: 175 milyar parametreli modelde kart başına verim 113'ten 135 teraFLOP/s'ye çıkıyor, yüzde 19; 530 milyarlık modelde 133'ten 148'e, yüzde 11. Ivanov ve arkadaşlarının çalışması aynı kaldıracı sistematik uyguluyor ve taşınan veriyi yüzde 22,91'e kadar azaltıp bir kodlayıcı katmanında 1,30 kat, uçtan uca eğitimde 1,19 kat hızlanma ölçüyor. İkincisi daha küçük, ve yazarlar sebebini de söylüyor: uçtan uca koşuda eniyilenmemiş başka parçalar var.

Birleştirmenin de bir sınırı var ve iki yerden geliyor. Birincisi bağımlılık: bir işlemin girdisi ancak bir öncekinin **tamamı** bittikten sonra hazır oluyorsa ikisi tek çekirdeğe konamaz; normalleştirmenin ortalamayı bütün dizi üzerinden alması bunun tipik örneğidir. İkincisi kaynak: birleştirilen çekirdek daha çok ara değeri çipin içinde tutmak zorunda kalır, bu da aynı anda koşabilen iş sayısını düşürür. İkinci uygulamanın yeniden yazılma gerekçelerinden biri tam olarak buydu. Yani birleştirme sınırsız bir kaldıraç değil, dengelenen bir takas.

Aynı çalışmanın ikinci bulgusu daha da şaşırtıcı, çünkü aritmetiğe hiç dokunmuyor: verinin bellekte **hangi düzende** durduğu. Aynı matris çarpımı, aynı sayılar, aynı işlem sayısı — yalnızca boyutların bellekteki sırası değiştirilerek yüzde 52'ye varan hızlanma elde ediliyor. Sebebi 106'daki bellek merdiveni: uygun sırayla dizilmiş veri tek seferde ve bitişik olarak okunabiliyor, uygun olmayan sırada aynı baytlar için daha çok tur atılıyor.

Bu bölümü kapatan sayı ise alçakgönüllülük dersi. Aynı çalışma kendi sonucunu yalnızca genel amaçlı kütüphanelerle değil, elle eniyilenmiş bir uygulamayla da karşılaştırıyor ve aradaki fark 1,08 kat. Yani kazancın büyük kısmını uzmanlar zaten almış durumda; sistematik yöntemin getirdiği şey o son dilim ve — daha önemlisi — aynı işi her yeni model için elle yapmak zorunda kalmamak.

## İki cetvel: kullanım oranı ve bellek kullanım verimi

Bu noktada ölçüm sorunu çıkıyor. 106\. makalede tanıttığımız kullanım oranı — gözlenen iş hacminin teorik tepe hızdaki iş hacmine oranı — hesap tarafının cetveli. Bellekle sınırlı bir çekirdeği onunla ölçersen her zaman düşük bir sayı görürsün, ve o sayı sana hiçbir şey söylemez.

Ivanov ve arkadaşları bellek tarafının cetvelini de kullanıyor: **bellek kullanım verimi** (memory usage efficiency). İki çarpandan oluşuyor. Birincisi, bir uygulamanın taşıdığı bayt miktarının, o hesabın taşımak **zorunda** olduğu en az bayta oranı — bu alt sınırın kendisi Hong Jia-Wei ve H. T. Kung'un STOC 1981'de sunduğu klasik çalışmadan gelir ve bir hesabın bellek hiyerarşisi karşısındaki kaçınılmaz bedelini tanımlar. İkincisi, ulaşılan bant genişliğinin tepe bant genişliğine oranı. İkisinin çarpımı 100 ise uygulama hem en az baytı taşımış hem de bandı tam kullanmıştır.

> **Kendini yokla:** Bir çekirdeğin kullanım oranı yüzde 5 çıkıyor. Kötü mü yazılmış?

Bu sayıdan bilinmez. Çekirdek bellekle sınırlıysa yüzde 5 tavan olabilir: çip zamanının neredeyse tamamını veri taşıyarak geçiriyordur ve yapacak hesap zaten yoktur. Doğru soru "kaç işlem yaptı" değil, "taşıması gerekenden fazlasını taşıdı mı ve bandı doldurdu mu" sorusudur. Bellek kullanım verimi yüzde 90 olan bir normalleştirme çekirdeği, kullanım oranı yüzde 5 olsa da bitmiştir. Bir ölçüyü değil, hangi ölçünün geçerli olduğunu seçmek gerekiyor — 101\. makalenin dilinde: cevap hangi cetveli seçtiğine bağlı.

![Beş satırlı üç sütunlu bir tablo ve altında iki kutu. Üstte başlık: üç işlem iki düzende, GPT-3 ölçüleri, mikro yığın 1, tek katman. Sütunlar ölçü, ayrı çekirdekler ve birleştirilmiş. Birinci satır çekirdek sayısı: 3 ve 1. İkinci satır kart belleği turu: 6 ve 2. Üçüncü satır taşınan bayt: 302 MB ve 101 MB. Dördüncü satır vurguludur, 1,5 TB bölü saniyelik bantta süre: 201 mikrosaniye ve 67 mikrosaniye. Beşinci satır yapılan işlem sayısı: iki sütunda da aynı. Birinci kutunun başlığı ölçülen karşılıkları; içinde birleştirmenin aynı kurulumda kart başına verimi yüzde 19 ve yüzde 11 artırdığı, sistematik uygulandığında taşınan veriyi yüzde 22,91 azaltıp katmanı 1,30 kat ve uçtan uca eğitimi 1,19 kat hızlandırdığı yazılıdır. İkinci kutunun başlığı sınır; içinde iki madde durur: bir öncekinin tamamını bekleyen işlem aynı çekirdeğe konamaz, ve birleştirilen çekirdek çipte daha çok yer tuttuğu için eşzamanlı iş azalır. En altta bir kayıt: 50,3 MB, 302 MB, 101 MB ve iki süre bizim hesabımızdır, yüzdeler kaynaklardan.](assets/cekirdegin-gidis-gelisi.svg "Şekil 2 — Aynı aritmetik, farklı sayıda tur")

Şekil 2'nin sağ sütunu birleştirmenin ne yaptığını gösteriyor: işlem sayısı sabit, tur sayısı düşüyor.

## Aynı algoritma, üç uygulama, üç sonuç

Bu kaldıraçların hepsi tek bir örnekte toplanıyor ve o örnek dikkat hesabı. 25\. makalede FlashAttention'ın ne yaptığını kurmuştuk: dizi bloklara bölünüyor, her bloğun katkısı çipin hızlı belleğinde hesaplanıp toplama ekleniyor ve dizi uzunluğunun karesi büyüklüğündeki ara matris kart belleğine **hiç yazılmıyor**. 86\. makalede de bunun neden işlem sayısını azaltmadan hızlandırdığını görmüştük. Mekanizmayı tekrar etmiyoruz; buradaki soru başka: bir algoritma doğru olduktan sonra, uygulaması ne kadar iyi olabilir?

Önce şunu görelim: dikkat, yukarıdaki üç kaldıracın kesiştiği yer. Bir dikkat bloğu iki matris çarpımı ile aralarındaki bir softmax'tan oluşuyor — yani tablonun ilk satırıyla ikinci satırı iç içe. Softmax ise tam olarak biraz önce adını koyduğumuz bağımlılık sınırının örneği: bir satırın en büyük değerini ve toplamını bilmeden hiçbir öge son hâlini alamıyor, dolayısıyla iki çarpım ayrı çekirdeklere düşüyor ve aradaki dev matris kart belleğine yazılıyor. 25\. makalede gördüğümüz düzenin kilit hamlesi bu bağımlılığı kırmaktı: softmax'ın toplamı ve en büyüğü blok blok **birikimli** tutuluyor, her yeni blok geldiğinde önceki kısmi sonuç yeniden ölçekleniyor. Bağımlılık kırılınca birleştirmenin önü açılıyor. Yani dikkati hızlandıran şey daha az işlem değil, birleştirmeyi mümkün kılan bir yeniden yazım.

Cevap üç adımda ve her adım bir öncekinin bıraktığı boşluğu kapatıyor.

Birinci uygulama, dikkati tam olarak hesapladığı hâlde çipin tepe hızının ancak **yüzde 25 ile 40'ı** arasında çalışıyor. Aynı çipte iyi yazılmış bir matris çarpımı yüzde 80–90'a çıktığına göre arada kapatılacak büyük bir boşluk var.

İkinci uygulama o boşluğun üçünü birden hedefliyor: matris çarpımı olmayan işlem sayısını azaltmak — yukarıdaki 16 kat tam olarak bunun için önemli — işi dizi uzunluğu boyunca da paralelleştirerek çipi daha dolu tutmak, ve tek bir blok içinde işi öyle bölmek ki paylaşılan bellekte gereksiz okuma yazma kalmasın. Sonuç iki kata yakın hızlanma ve tepe hızın **yüzde 50 ile 73'ü**. Uçtan uca bir eğitim koşusunda kart başına 225 teraFLOP/s, yani yüzde 72 kullanım oranı. Bu son sayıyı 106'nın rakamıyla doğrulayabiliriz: 225 ÷ 312 = 0,72.

Sonra yeni bir çip geliyor ve tablo bozuluyor. Jay Shah, Ganesh Bikshandi, Ying Zhang, Vijay Thakkar, Pradeep Ramani ve Tri Dao'nun NeurIPS 2024'te sunduğu çalışmanın açılış cümlesi şu: ikinci uygulama yeni nesil çipte yalnızca **yüzde 35** kullanım oranına ulaşıyor. Algoritma aynı, kod aynı, sonuçlar aynı; değişen tek şey makine. Üçüncü uygulama yeni çipin yeni yeteneklerine göre yeniden yazılıyor — hesapla veri taşımayı iç içe geçiren eşzamansız çalışma, matris çarpımı ile softmax'ı sıraya değil birbirinin içine yerleştirme, ve düşük duyarlıklı biçimler için donanım desteğini kullanma. Ortadaki hamle doğrudan yukarıdaki 16 kat farkının sonucu: softmax matris çarpımı biriminde koşmadığına göre, bir bloğun softmax'ı bir sonraki bloğun çarpımıyla **aynı anda** yürütülebilir ve özel birim boş kalmaz. Sonuç 1,5 ile 2 kat hızlanma, 16 bitte saniyede 740 teraFLOP ve **yüzde 75** kullanım oranı, 8 bitte saniyede 1,2 katrilyon işleme yakın.

Duyarlık tarafında bir ayrıntı daha var ve 27\. makaledeki kuantizasyon tartışmasının eğitim tarafındaki karşılığı. Sekiz bite inmek tek başına hata getiriyor; aynı çalışma hatayı ölçüyor ve bloklara ayrılmış bir ölçekleme düzeniyle, düz bir sekiz bitlik uygulamaya göre **2,6 kat düşük** sayısal hata elde ediyor. Yani duyarlık bir model kararı olduğu kadar bir çekirdek kararıdır: aynı bit genişliğinde, ölçeğin nereye uygulandığına göre hata değişiyor.

![Dört satırlı dört sütunlu bir tablo ve altında iki kutu. Üstte başlık: aynı dikkat algoritması, üç uygulama, iki çip. Sütunlar uygulama, çip, kullanım oranı ve ne değişti. Birinci satır birinci uygulama, A100, yüzde 25 ile 40 arası, ara matris kart belleğine hiç yazılmıyor. İkinci satır ikinci uygulama, A100, yüzde 50 ile 73 arası, çarpım dışı işlem azaldı ve iş dizi boyunca da bölündü. Üçüncü satır ayrı bir renkle vurguludur: aynı ikinci uygulama, H100, yüzde 35, ne değişti sütununda hiçbir şey yazar, yalnızca çip değişmiştir. Dördüncü satır vurguludur: üçüncü uygulama, H100, yüzde 75, eşzamansızlık ile iç içe softmax ve 8 bit. Birinci kutunun başlığı kıyas noktaları; içinde iyi yazılmış bir matris çarpımının aynı çipte yüzde 80 ile 90 arasına çıktığı ve ikinci uygulamanın uçtan uca 225 TFLOP bölü saniye verdiği, 225 bölü 312'nin yüzde 72 ettiği yazılıdır. İkinci kutunun başlığı duyarlık da bir çekirdek kararıdır; içinde üçüncü uygulamanın 8 bitte saniyede 1,2 katrilyon işleme yaklaştığı ve bloklara ayrılmış ölçeklemeyle düz 8 bitten 2,6 kat düşük sayısal hata verdiği yazılıdır. En altta bir kayıt: oranlar Dao ile Shah ve arkadaşlarından, 225 bölü 312 çevrimi bizim hesabımızdır.](assets/ayni-algoritma-uc-uygulama.svg "Şekil 3 — Makine değişince puan sıfırlanır")

Şekil 3'ün üçüncü satırı bu bölümün asıl dersi: aynı kod, yeni çipte yüzde 73'ten yüzde 35'e düşüyor. Bir çekirdek bir makineyle yapılmış sözleşmedir ve makine değişince sözleşme yeniden yazılır.

## Çekirdeği kim yazar

Bu ölçüde bir işi her model için elle yapmak sürdürülebilir değil; bu yüzden alanın çözümü derleyicilere kaydı. Jason Ansel ve arkadaşlarının ASPLOS 2024'te sunduğu çalışma bugünkü hâlini anlatıyor: model kodu çalışma anında yakalanıp bir hesap çizgesine çevriliyor, çizge üzerinde birleştirme ve yerleşim kararları otomatik veriliyor, ve sonuçta çekirdekler üretiliyor. Ölçülen kazanç 180'den fazla gerçek model üzerinde geometrik ortalama olarak çıkarımda 2,27 kat, eğitimde 1,41 kat; altı ayrı derleyicinin üstünde.

İki sayı arasındaki fark da öğretici ve tahmin edilebilir. Çıkarımdaki kazanç daha büyük, çünkü 26\. makalede gördüğümüz gibi adım adım üretim bellek bant genişliğiyle sınırlıdır ve derleyicinin asıl yaptığı iş bellekle sınırlı işlemleri birleştirmektir. Matris çarpımının kendisinde kazanacak çok şey yoktur; orası zaten elle eniyilenmiş kütüphanelerin alanıdır. Yani derleyici, tablonun binde ikilik kısmını hedefliyor — ve o kısım sürenin yüzde 39'uydu.

## Çekirdek mühendisliğinin disiplini

**İşlem saymak süre saymak değildir.** İşlemlerin yüzde 0,2'si sürenin yüzde 39'unu yiyor; birim işlem başına fark yaklaşık 319 kat. Bir eniyilemenin değeri kaç işlem sildiğiyle değil, kaç bayt taşımadığıyla ölçülür.

**Bir FLOP'un bedeli hangi birimin koşturduğuna bağlıdır.** Matris çarpımı verimi, matris çarpımı olmayan işlemlerinkinin 16 katına kadar çıkar; algoritmayı o birime oturtmak bir eniyilemedir.

**Birleştirmenin kazancı ölçülmüştür ve küçük değildir.** Aynı kurulumda yüzde 19 ve yüzde 11; sistematik uygulandığında taşınan veride yüzde 22,91 azalma ve 1,30 kat hızlanma.

**Aritmetiğe dokunmadan da hızlanılır.** Yalnızca bellekteki yerleşimi değiştirmek aynı matris çarpımını yüzde 52'ye kadar hızlandırıyor.

**İki cetvel vardır ve hangisinin geçerli olduğu işleme bağlıdır.** Kullanım oranı hesap tarafını, bellek kullanım verimi bellek tarafını ölçer; bellekle sınırlı bir çekirdekte düşük kullanım oranı bir kusur değil, bir sınırdır.

**Bir çekirdek bir makineyle yapılmış sözleşmedir.** Aynı kod, yeni nesil bir çipte yüzde 73'ten yüzde 35'e düşüyor. Taşınabilirlik bir varsayım değil, ayrıca kazanılan bir özelliktir.

### Sırada ne var

Bu iki makale bir eğitim adımını hem kartlara dağıttı hem de kartın içinde hızlandırdı. Ama bir eğitim koşusu tek bir adım değil; on binlerce kartta haftalarca süren yüz binlerce adım. O sürede kartlar bozulur, ağ bağlantıları düşer, bir sunucu ötekilerden yavaş çalışmaya başlar — ve kayıp eğrisi hiçbir sebep yokken yukarı sıçrar. Bir sonraki makale bunların hepsini birden soruyor: koşan bir eğitimin neyine bakılır, bir arıza ne kadar sürede fark edilir, kontrol noktası ne sıklıkta alınmalı, ve kayıp sıçradığında ne yapılır?

## Kaynakça

- Ivanov, A., Dryden, N., Ben-Nun, T., Li, S. & Hoefler, T. (2021). *Data Movement Is All You Need: A Case Study on Optimizing Transformers*. MLSys 2021. [Bağlantı](https://proceedings.mlsys.org/paper_files/paper/2021/hash/bc86e95606a6392f51f95a8de106728d-Abstract.html)
- Dao, T. (2024). *FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning*. ICLR 2024. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/98ed250b203d1ac6b24bbcf263e3d4a7-Abstract-Conference.html)
- Narayanan, D., Shoeybi, M., Casper, J., LeGresley, P., Patwary, M., Korthikanti, V., Vainbrand, D., Kashinkunti, P., Bernauer, J., Catanzaro, B., Phanishayee, A. & Zaharia, M. (2021). *Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM*. SC 2021, s. 1–15. [Bağlantı](https://doi.org/10.1145/3458817.3476209)
- Jia-Wei, H. & Kung, H. T. (1981). *I/O Complexity: The Red-Blue Pebble Game*. STOC 1981, s. 326–333. [Bağlantı](https://doi.org/10.1145/800076.802486)
- Shah, J., Bikshandi, G., Zhang, Y., Thakkar, V., Ramani, P. & Dao, T. (2024). *FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-precision*. NeurIPS 2024. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/7ede97c3e082c6df10a8d6103a2eebd2-Abstract-Conference.html)
- Ansel, J., Yang, E., He, H., Gimelshein, N., Jain, A., Voznesensky, M., Bao, B., Bell, P., Berard, D., Burovski, E. ve ark. (2024). *PyTorch 2: Faster Machine Learning Through Dynamic Python Bytecode Transformation and Graph Compilation*. ASPLOS 2024, s. 929–947. [Bağlantı](https://doi.org/10.1145/3620665.3640366)
