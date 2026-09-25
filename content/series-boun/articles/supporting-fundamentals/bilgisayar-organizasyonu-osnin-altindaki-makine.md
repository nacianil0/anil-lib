---
article_id: article_10e5a169-82f9-49ef-8b2d-296c2f49149e
title: "Bilgisayar Organizasyonu: OS'nin Altındaki Makine"
slug: bilgisayar-organizasyonu-osnin-altindaki-makine
category: supporting-fundamentals
level: advanced
reading_order: 37
summary: "Karmaşıklık makalesinin RAM modeli her bellek erişimini aynı fiyatta sayıyordu; bu makale o varsayımın donanımda nerede ve neden çöktüğünü gösteriyor. Önce hiyerarşinin nedeni kuruluyor — statik ile dinamik belleğin hücre düzeyindeki farkı ve yerellik. Sonra sayılar geliyor: kaynağın çevrim tablosuyla yaptığım kendi hesabımda aynı komut sayısı, yalnızca isabet oranları değiştiği için ortalamada altı kat farklı maliyet veriyor. Önbelleğin adresi nasıl böldüğü, doğrudan eşlemeli ile kümeli çağrışımlının neyi takas ettiği ve çakışma ıskasının nereden çıktığı bir sonraki bölümde. Kapanışta üç eski borç ödeniyor: TLB'nin neden bir önbellek olduğu, sayfa boyutunun iki yönlü takası ve bağlam anahtarının neden çevrim cinsinden ucuzlamadığı. Bütün çevrim hesapları kendi aritmetiğimdir."
tags:
  - bilgisayar-organizasyonu
  - bellek-hiyerarsisi
  - onbellek
  - boru-hatti
  - ram-modeli
content_hash: sha256:8f7dd789cf766cdf1ed94260711bbba20451bea692ff6cfb1d9ab3fcfeba5a39
classification_version: 1
classification_batch: 12
revised_at: "2026-09-25"
revision_note: "Bellek hiyerarşisi şekli tablo yerine logaritmik eksende yeniden çizildi; kesişim aralığı, sayfa boyutu ve boru hattı açıklamaları düzeltildi."
---
## Soyutlamanın altına inmek

Karmaşıklık makalesinde bir model kurduk ve bütün maliyet hesaplarımızı onun üstüne yığdık: RAM modeli, bellekteki her hücreye erişimin aynı fiyatta olduğunu varsayar. O modelin ne kadar işe yaradığını gördük — makineden bağımsız, tek bir sayıyla karşılaştırma yapmayı mümkün kılan şey bu varsayımdı.

Ama işletim sistemleri fazı boyunca aynı varsayımı üç kez elimizle bozduk. Dengeli arama makalesinde veri diske taştığında modeli açıkça terk edip blok saymaya geçtik. Bellek yönetimi makalesinde bir adres çevirisinin donanımda ek bir bellek erişimi olduğunu gördük. Sanal bellek makalesinde fiziksel belleği bir önbellek gibi ele alıp ıska olasılığını maliyete kattık. Her seferinde "aslında her erişim aynı fiyat değil" dedik ve nedenini bir üst kata bıraktık.

Bu makale o kata iniyor. Sorusu şu: **bellek erişimleri neden aynı fiyatta değil, fark ne kadar, ve bu fark yazdığın algoritmayı nasıl değiştirir?** Resmî dayanak da yerinde; bölümün bilgisayar organizasyonu dersinin öğrenme çıktıları arasında hiyerarşik bellek sistemlerinin tasarım ilkeleri ve makine komutlarının yürütülmesi açıkça sayılıyor.

## Neden bir hiyerarşi var

Cevap teknolojide, tasarımda değil. Bellek hücresi iki ayrı biçimde kurulabilir.

**Statik bellek (static RAM, SRAM)** hücresi altı transistörden oluşur. Değeri bir geri beslemeli devre tutar; sözcük hattı kaldırıldığı anda çıkış hazırdır ve hücre durumunu kendiliğinden korur, tazelenmesi gerekmez.

**Dinamik bellek (dynamic RAM, DRAM)** hücresi ise tek bir transistör ve tek bir kondansatörden ibarettir. Değer kondansatördeki yükte durur. Okumak için erişim hattı kaldırılır ve kondansatörün yeterince boşalması beklenir — bu bekleme dinamik belleğin ne kadar hızlanabileceğini doğrudan sınırlar. Üstelik yük sızdığı için hücrenin düzenli olarak **tazelenmesi (refresh)** gerekir.

Altı transistörle bir transistör arasındaki fark, aynı silikon alanına kaç bit sığdığının farkıdır. Sorunun "neden hepsi statik bellek değil?" biçimi mülakatta sık sorulur ve cevabı tek kelimedir: maliyet. Hızlı bellek pahalıdır, ucuz bellek yavaştır, ve hiçbir bütçe ikisini birden alamaz.

Peki küçük bir hızlı bellek nasıl büyük bir hızlı bellek gibi davranabilir? Cevap, bellek yönetimi makalesinde tanımladığımız iki özelliktir. Zamansal yerellik, az önce kullanılan verinin yakında yine kullanılacağını söyler; uzamsal yerellik, bir adrese erişen programın komşu adreslere de erişeceğini. İkisi de programların gözlenmiş bir huyudur, bir teorem değil — ve bütün hiyerarşi bu huy üzerine bahis oynar.

Kaynağın verdiği basit hesap bahsin ne kadar kazandırdığını gösteriyor: ana bellek erişimi 200 çevrim, önbellek erişimi 15 çevrim olsun. Yüz veri ögesine yüzer kez erişen bir kod, önbelleksiz 10.000 × 200 = 2.000.000 çevrim harcar. Önbellekle ilk yüz erişim ıskadır (100 × 200 = 20.000), kalan 9.900 erişim isabettir (9.900 × 15 = 148.500), toplam 168.500 çevrim. Kaynak bunu yüzde 91,5'lik bir iyileşme olarak veriyor; aritmetiği kendim yeniden yaptığımda tam değer yüzde 91,575 çıktı, yani kaynak son basamağı atmış.

## Hiyerarşinin sayıları

Soyut "daha hızlı" ve "daha yavaş" mülakatta yetmez; sayı istenir. Şekil 1 katmanları erişim maliyetlerine göre logaritmik bir eksene diziyor; eksende her aralık on kattır, bu yüzden katmanlar arasındaki uzaklık doğrudan kaç mertebe fark olduğunu gösterir.

![Yatay, logaritmik bir çevrim ekseni; eksen 1'den 10 üzeri 8'e kadar uzanıyor ve her aralık on kat. Eksen üzerinde beş nokta var ve her noktadan yukarı çıkan bir sapın ucunda katmanın adı, maliyeti ve kapasitesi yazıyor. Soldan sağa: yazmaç 1 çevrim, 1 kilobaytın altı; L1 veri önbelleği 3 çevrim, onlarca kilobayt; L2 önbelleği 14 çevrim, birkaç megabayt; vurgulu renkte ana bellek 240 çevrim, gigabayt mertebesi; ikinci vurgu renginde ve eksenin en sağında disk 3 çarpı 10 üzeri 7 çevrim, terabayt mertebesi. İlk dört nokta eksenin sol üçte birine sıkışmış, disk tek başına sağ uçta duruyor. Eksenin altında iki ayraç var: yazmaçtan ana belleğe yaklaşık 2,5 mertebe, ana bellekten diske yaklaşık 5 mertebe daha. Üstteki not çevrim sayılarının bir Pentium M için üreticinin verdiği değerler olduğunu, alttaki not disk değerinin 10 milisaniye erişim ve 3 gigahertz saat varsayımıyla yapılmış kendi hesabım olduğunu söylüyor](assets/bellek-hiyerarsisi-katmanlari.svg "Şekil 1 — Katmanlar arasındaki fark mertebe cinsindendir: yazmaçtan ana belleğe iki buçuk, ana bellekten diske beş mertebe daha")

Şekildeki çevrim sayıları bir Pentium M için üreticinin açıkladığı değerler: yazmaç 1, birinci düzey veri önbelleği 3, ikinci düzey önbellek 14, ana bellek 240 çevrim. Aynı kaynağın gerçek bir ölçümü de var: çalışma kümesi büyütülerek yapılan rastgele erişim denemesinde eleman başına maliyet, veri birinci düzeye sığdığı sürece 10 çevrimin altında kalıyor, ikinci düzeye taştığında 28 çevrime fırlıyor, ikinci düzey de yetmediğinde 480 çevrim ve üstüne çıkıyor.

İki sayı kümesi arasındaki fark önemlidir ve mülakatta söylenmesi gerekir: ilki bir erişimin **yalın maliyeti**, ikincisi gerçek bir iş yükünün **ölçülmüş ortalamasıdır**. İkincisi daha büyüktür çünkü ıskaların yanında kirli satırların geri yazılması da vardır.

Bu sayılar 2007 tarihlidir ve mutlak değerleri bugün farklıdır. Değişmeyen, **mertebeler arasındaki orandır**: yazmaçtan ana belleğe iki buçuk mertebe, ana bellekten diske beş mertebe daha.

## AMAT bir kat yukarı çıkıyor

Sanal bellek makalesinde ölçütü tanımlamıştık: AMAT = bellek maliyeti + ıska olasılığı × disk maliyeti. Orada hiyerarşinin en alt iki katı için yazılmıştı. Aynı formül, aynı biçimde, üst katlarda da çalışır — yalnızca sayılar değişir:

```
AMAT = T_L1 + P_ıska(L1) × ( T_L2 + P_ıska(L2) × T_bellek )
```

Az önceki çevrim sayılarını koyup üç senaryo hesaplayalım. Aritmetiğin tamamı benim; kaynak bu hesabı vermiyor.

| Senaryo | L1 isabet | L1 ıskasında L2 isabet | AMAT (çevrim) |
|---|---|---|---|
| İyi yerellik | %95 | %90 | 4,9 |
| Zayıf yerellik | %80 | %90 | 10,6 |
| Yerellik yok | %80 | %50 | 29,8 |

İlk satır: 3 + 0,05 × (14 + 0,10 × 240) = 3 + 0,05 × 38 = 4,9. Üçüncü satır: 3 + 0,20 × (14 + 0,50 × 240) = 3 + 0,20 × 134 = 29,8.

Tablonun asıl söylediği şey şudur: **üç satırda da komut sayısı aynıdır.** RAM modeli üçünü de birbirinin aynı sayar, çünkü model bellek erişimlerini birer adım olarak sayar ve hepsine aynı fiyatı biçer. Gerçek makinede aralarında altı kat vardır.

> **Sesli anlat:** "Bellek hiyerarşisi neden var, bir önbellek ıskası ne kadar pahalı, ve bu senin yazdığın algoritmayı nasıl değiştirir? Doksan saniye."
>
> İyi bir cevabın omurgası: "Hiyerarşinin nedeni teknolojidir: statik bellek hücresi altı transistördür, hızlıdır ve tazeleme istemez; dinamik bellek hücresi bir transistör ve bir kondansatördür, çok daha küçük ve ucuzdur ama kondansatörün boşalmasını beklemek gerekir. Hızlı bellek pahalı olduğu için azdır, ve azının çoğu gibi davranabilmesi tek bir bahse dayanır: zamansal ve uzamsal yerellik. Maliyet farkı mertebe düzeyindedir — bir kaynağın Pentium M için verdiği tabloda yazmaç 1, birinci düzey önbellek 3, ikinci düzey 14, ana bellek 240 çevrim. Bu farkı tek sayıya çeviren ölçüt AMAT'tır ve sanal bellek makalesindeki formülün aynısı bir kat yukarıda da geçerlidir: birinci düzey maliyeti artı ıska olasılığı çarpı bir alttaki katmanın maliyeti. Aynı çevrim tablosuyla kendi yaptığım hesapta, birinci düzey isabet oranı yüzde 95'ten yüzde 80'e düşünce ortalama erişim 4,9 çevrimden 10,6'ya çıkıyor; ikinci düzey de kaçırmaya başlayınca 29,8'e. Komut sayısı üçünde de aynı. Pratik sonucu şudur: karmaşıklık sınıfı aynı kalırken erişim deseni sabitleri altı kat değiştirebilir, bu yüzden büyük veri üzerinde çalışan kodda erişim sırası bir uygulama ayrıntısı değil bir tasarım kararıdır."

## Önbellek adresi nasıl böler

Önbellek tek tek baytları tutmaz. Bellekle arasındaki alışveriş birimine **önbellek satırı (cache line)** denir; bugünün ölçüsü 64 bayttır, erken önbelleklerde 32 baytlıktı. Bu tek başına uzamsal yerellik üzerine oynanmış bir bahistir: bir bayt istendiğinde altmış dört bayt getirilir, çünkü komşuların da isteneceği varsayılır.

Adres üç parçaya bölünür. En alttaki bitler satır içindeki **konum (offset)**; 64 baytlık satır için 6 bit. Ortadaki bitler satırın önbellekte nereye düşebileceğini seçer. Kalan üst bitler **etiket (tag)** olur ve satırla birlikte saklanır, çünkü aynı yere düşebilen pek çok adres vardır ve hangisinin durduğu ayırt edilmelidir.

Asıl tasarım kararı ortadaki alanın kaç bit olduğudur ve üç uç vardır.

**Tam çağrışımlı (fully associative)** önbellekte ortadaki alan sıfır bittir: her satır her yere düşebilir. Esnekliğin bedeli, her satır için bir karşılaştırıcı gerekmesidir. Kaynağın verdiği örnekte 4 MB'lık ve 64 baytlık satırları olan bir önbellek 65.536 satır tutar; altmış beş bin karşılaştırıcıyı birkaç çevrimde çalıştırmak mümkün değildir. Bu yüzden tam çağrışımlılık yalnızca çok küçük yapılarda kullanılır — bazı Intel işlemcilerinde adres çevirisi önbelleği böyledir ve girdi sayısı birkaç düzineyi geçmez.

**Doğrudan eşlemeli (direct-mapped)** önbellekte her adresin gidebileceği tek bir yer vardır. Aynı örnekte adresin 6'dan 21'e kadarki 16 biti satırı doğrudan seçer. Tek karşılaştırıcı yeter, hızlıdır, ucuzdur. Kırılganlığı şudur: aynı yere düşen iki blok, önbelleğin geri kalanı tamamen boşken bile birbirini atar.

**Kümeli çağrışımlı (set-associative)** önbellek ikisinin ortasıdır. Satırlar **önbellek kümelerine (cache set)** ayrılır; adres bir kümeyi seçer, küme içindeki birkaç yerden herhangi biri kullanılabilir ve o kümenin etiketleri paralel karşılaştırılır. Küme sözcüğü burada ayrık matematik makalesinin küme kavramıyla ilgili değildir, yalnızca İngilizcedeki *set* sözcüğü ortaktır; kastedilen, aynı indisi paylaşan satırların oluşturduğu gruptur. Aynı 4 MB'lık önbellek 8 yollu kurulursa 8.192 küme olur ve kümeyi seçmek 13 bit ister. Kaynak, ikinci düzey önbelleklerde 24'e varan çağrışımlılıktan, birinci düzeyde ise genellikle 8'den söz ediyor.

Şekil 2 üç düzeni aynı erişim dizisi üzerinde karşılaştırıyor.

![Üç bölümlü bir şema. En üstte bir adres çubuğu üç parçaya bölünmüş: etiket, vurgulu çerçeveli küme indisi ve konum; altlarında sırasıyla hangi blok, hangi küme ve satır içinde nerede yazıyor. Ortada üst üste üç düzen var ve her birinde sekiz yuva bulunuyor. Birincisi doğrudan eşlemeli: sekiz yuva yan yana, sıfırdan yediye numaralanmış, yalnızca üç numaralı yuva dolu ve içinde blok 11 yazıyor; altındaki iki satır 3 mod 8 ile 11 mod 8'in ikisinin de 3 verdiğini, blok 11 gelince blok 3'ün yedi yuva boş dursa bile atıldığını ve bunun bir çakışma ıskası olduğunu söylüyor. İkincisi iki yollu kümeli çağrışımlı: dört küme ve her kümede iki yuva var, küme 3 vurgulu ve iki yuvasında blok 3 ile blok 11 birlikte duruyor; altındaki not aynı kümeye düştüklerini ama küme iki yuvalı olduğu için ikisinin birden durabildiğini, bedelinin küme içindeki iki etiketin paralel karşılaştırılması olduğunu söylüyor. Üçüncüsü tam çağrışımlı: tek küme, sekiz yuvanın ilk ikisinde blok 3 ile blok 11 duruyor ve altındaki not çakışma ıskasının hiç olmadığını, bedelin sekiz yuva için sekiz karşılaştırıcı olduğunu söylüyor](assets/onbellek-eslemesi.svg "Şekil 2 — Aynı iki blok, üç eşleme düzeni: çakışma nereden çıkar")

Buradan bir terim çıkıyor ve sanal bellek makalesinde tanımladığımız kavramı tamamlıyor. Orada **zorunlu ıskayı** tanımlamıştık: önbellek boş başladığı için ilk erişim kaçınılmaz olarak ıskadır. Standart sınıflandırma üçlüdür. **Kapasite ıskası (capacity miss)** önbellek dolduğu ve bir şeyin çıkarılması gerektiği için olur. **Çakışma ıskası (conflict miss)** ise yalnızca donanımda görülür: yer vardır ama blok oraya konamaz, çünkü eşleme onu belirli bir kümeye hapsetmiştir. İşletim sisteminin sayfa önbelleğinde çakışma ıskası **yoktur**, çünkü o önbellek tam çağrışımlıdır — bir sayfa fiziksel bellekte herhangi bir çerçeveye konabilir. Bu ayrımı söyleyebilmek, sanal bellek ile donanım önbelleğini aynı sanan cevaptan ayırır.

## Komut yürütme ve zamanın denklemi

Bir işlemcinin bir komutu işlemesi üç adımdır: getir, çöz, yürüt. Bu adımların her biri birleşimsel devrelerden kurulur — ayrık matematik makalesinde sadeleştirdiğimiz Boole ifadeleri, donanımda tam olarak bunlardır. Bir Boole ifadesini iki terim kısaltmak, o devrede daha az kapı ve daha kısa gecikme demektir; sadeleştirmenin "zarif" değil **ölçülebilir** bir kazanç olmasının nedeni budur.

Programın süresini veren ilişki bir birim sadeleştirmesinden çıkar ve türetmesini kendim yazıyorum:

```
süre          komut       çevrim       süre
------  =  ---------- × ---------- × --------
program     program      komut        çevrim
```

Yani **süre = komut sayısı × komut başına çevrim (cycles per instruction, CPI) × saat çevrimi süresi.** Üç çarpanın üçü de ayrı ayrı iyileştirilebilir ve üçü birbirine bağlıdır: saat frekansını yükseltmek çevrim süresini kısaltır ama bellek gecikmesi nanosaniye cinsinden sabit kaldığı için CPI'yi yükseltir. Mülakatta "daha hızlı işlemci aldım, program neden hızlanmadı?" sorusunun cevabı bu denklemin hangi çarpanının değiştiğidir.

**Boru hattı (pipeline)** CPI'ye saldırır. Komutlar birbirini beklemek yerine aşamalarda örtüştürülür: biri çözülürken öteki getirilir. Kazanç tek bir komutun süresinde değildir — her komut yine bütün aşamalardan geçer — birim zamanda biten komut sayısındadır (*throughput*). Alt sınırlar makalesindeki iş ile açıklık ayrımının donanımdaki akrabasıdır: toplam iş değişmez, birbirini beklemeyen parçalar örtüştüğü için toplam süre kısalır. Boru hattının bedeli, akışın bozulduğu yerde ortaya çıkar: yanlış kestirilen bir dal, hazırlanmış komutları çöpe atar. Kaynak, çözülmüş komutları önbelleğe almanın özellikle boru hattı yanlış kestirim yüzünden boşaldığında kazandırdığını söylüyor.

Buradan karmaşıklık tarafına bir sonuç düşer ve asimptotik analiz makalesindeki **kesişim noktası** pinini öder. İki algoritma düşünelim: A, n² işlem yapıyor ve hepsi birinci düzey önbellekte (3 çevrim); B, 20n işlem yapıyor ama her biri ana belleğe iniyor (240 çevrim). RAM modelinde karşılaştırma n² ile 20n arasındadır ve kesişim n = 20'dedir. Çevrim cinsinden karşılaştırma 3n² ile 4.800n arasındadır ve kesişim n = 1.600'e kayar. Sabitler seksen kat büyümüştür; asimptotik sıralama değişmez, ama "hangisini kullanayım?" sorusunun cevabı 20 < n < 1.600 aralığında tersine döner: RAM modeli orada B'yi seçer, gerçek makinede A kazanır. Bu hesap da kendimindir.

## Üç eski borç

**TLB bir önbellektir.** Bellek yönetimi makalesinde adres çevirisi önbelleğini "son çevirileri saklayan küçük bir donanım yapısı" diye tanıtmıştık. Artık tam adını koyabiliriz: sanal sayfa numarasını anahtar, sayfa tablosu girdisini değer alan, birkaç düzine girdilik, genellikle tam çağrışımlı bir önbellek. Aynı üç kavram aynen geçerlidir — isabet, ıska ve ıska cezası. Iska cezası burada bir bellek erişimi değil, sayfa tablosunun yürünmesidir.

**Sayfa boyutunun iki yönlü takası.** Bellek yönetimi makalesinde büyük sayfanın iç parçalanmayı artırdığını söylemiştik; şimdi öteki yönü sayabiliriz. Bir TLB'nin kapsadığı bellek miktarı, girdi sayısı çarpı sayfa boyutudur. 64 girdilik bir TLB, 4 KB'lık sayfalarla 256 KB kapsar; aynı TLB 2 MB'lık sayfalarla 128 MB kapsar — beş yüz kat. Büyük veri üzerinde dolaşan bir program için bu fark, çeviri ıskasının bütünüyle ortadan kalkması anlamına gelebilir. Bedeli iç parçalanmadır: bir bölgenin son sayfası ortalama yarı boş kalır ve 2 MB'lık sayfada bu yarım sayfa 1 MB demektir; ayrıca her sayfa hatası 4 KB yerine 2 MB'lık bir sayfayı hazırlamak zorundadır. Takas budur ve yönü iş yüküne göre değişir. Kapsama hesabı kendimindir.

**Bağlam anahtarı neden çevrim cinsinden ucuzlamıyor?** Süreçler makalesinde ölçülmüş bir gözlem aktarmıştık: 1996'da 200 MHz'de yaklaşık 6 mikrosaniye, bugün mikrosaniyenin altı — ama çevrime çevrildiğinde 1.200'e karşı 1.500, yani düşme yok. Gerekçeyi donanım tarafına bırakmıştık.

Gerekçe 1990 tarihli bir ölçüm çalışmasında duruyor. Çalışma, çekirdeğe giriş-çıkışı ve süreçler arası geçişi zorlayan küçük kıyas programlarını farklı makine ve işletim sistemlerinde koşturuyor ve sonuçları makinenin ham hızına **göreli** olarak veriyor. Boş bir sistem çağrısında göreli hız tipik olarak 0,5 ile 0,8 arasında; iki süreç arasında bir bayt gidip gelmesini ölçen bağlam anahtarı kıyasında ise 0,3 ile 0,5 arasında. Yani işlemci üç kat hızlandığında bu işler bir buçuk kat hızlanıyor.

Çalışmanın kendi sonucu iki donanım başlığı sayıyor. Birincisi bellek bant genişliğinin işlemci hızına yetişememesi; ikincisi bağlam anahtarının yeni mimarilerde yaklaşık iki kat pahalılaşmış olması. Birinci başlık doğrudan bu makalenin konusuna bağlanır: bağlam anahtarı yazmaç kopyalayan, çekirdek yığını değiştiren, sayfa tablosunu değiştiren ve bunu yaparken önbelleği ve adres çevirisi önbelleğini soğutan bir iştir. Yani **bellek yoğundur**, ve bellek hiyerarşisi işlemci kadar hızlı iyileşmemektedir. Süreçler makalesinde bıraktığımız borç budur.

## Mülakatta nasıl görünür

Takip zinciri genellikle üç halkalıdır. "Önbellek nedir?" diye başlar; "ıska maliyetini nasıl hesaplarsın?" ile devam eder ve AMAT'ı ister; "peki bu kodu nasıl hızlandırırsın?" ile biter ve erişim desenini ister. Üçüncü halkaya gelmeden ilk ikisini kapatmak iyi bir işarettir.

Altı tipik hata var. **Önbelleği yazılım sanmak** — işlemci önbelleği donanımdadır ve programcı onu doğrudan yönetmez; işletim sisteminin sayfa önbelleği ise yazılımdır ve ikisi farklı katmanlardır. **Yerelliği bir garanti sanmak** — yerellik programların gözlenmiş huyudur; rastgele erişen bir iş yükünde hiyerarşinin bütün kazancı buharlaşır. **"Önbellek ıskası pahalıdır" deyip sayı verememek** — mertebe söylenmelidir: birinci düzey birkaç çevrim, ana bellek yüzlerce. **Çakışma ıskası ile kapasite ıskasını karıştırmak** — kapasitede yer yoktur, çakışmada yer vardır ama eşleme izin vermez. **Daha yüksek frekansı daha hızlı program sanmak** — süre üç çarpanın çarpımıdır ve frekansı yükseltmek CPI'yi bozabilir. **Asimptotik sıralamayı sabitlerden bağımsız sanmak** — sıralama değişmez ama kesişim noktası kayar, ve gerçek girdiler kaymış kesişimin solunda kalabilir.

Bir de ölçü refleksi: "bu kod neden yavaş?" sorusuna verilecek ilk cevap komut saymak değil, erişim desenini tarif etmektir. Dizi mi dolaşıyorsun yoksa işaretçi mi kovalıyorsun — bu iki cümle, asimptotik sınıftan daha çok şey söyler.

İngilizce karşılıklar hazır olmalıdır: *static RAM (SRAM)*, *dynamic RAM (DRAM)*, *refresh*, *memory hierarchy*, *cache line*, *tag*, *offset*, *cache set*, *direct-mapped*, *set-associative*, *fully associative*, *capacity miss*, *conflict miss*, *miss penalty*, *TLB reach*, *cycles per instruction (CPI)*, *clock cycle*, *pipeline*, *branch misprediction*, *combinational circuit*.

### Sırada ne var

Bu makale donanımı gösterdi ama hepsine dışarıdan baktık: çevrim tabloları, eşleme düzenleri, ölçülmüş kıyaslar. Programcının elinde bunların hiçbiri görünmüyor — ta ki bellekle doğrudan konuşan bir dil kullanana kadar.

Sıradaki makale aynı kavramları koda indiriyor: bir sürecin adres uzayı düzeninin C'de nasıl göründüğü, işaretçinin gerçek maliyeti, heap'ten yer almanın ve geri vermenin ne demek olduğu ve süreç yaratan çağrıların kendisi. Süreçler makalesinde ertelediğimiz `fork()`, `exec()` ve `wait()` üçlüsü ile sanal bellek makalesinde adını anıp mekanizmasını açmadığımız kopyalarken yazma orada ödenecek.

## Kaynakça

- Drepper, U. *What Every Programmer Should Know About Memory*, Sürüm 1.0, Red Hat, Inc., 21 Kasım 2007 — **statik bellek** hücresinin altı transistörlü yapısı, çıkışın sözcük hattı kaldırılır kaldırılmaz hazır olması ve tazeleme gerektirmemesi; **dinamik bellek** hücresinin tek transistör ve tek kondansatörden oluşması, kondansatörün boşalmasını beklemenin hızı sınırlaması ve alan avantajı; "neden hepsi SRAM değil" sorusunun cevabının maliyet olması; **zamansal ve uzamsal yerelliğin** önbellek kavramının anahtarı olması; **91,5'lik hesap** (ana bellek 200 çevrim, önbellek 15 çevrim, 100 öge × 100 erişim → 2.000.000'a karşı 168.500 çevrim); Intel'in Pentium M için verdiği erişim tablosu (**yazmaç 1, L1d 3, L2 14, ana bellek 240 çevrim**); rastgele erişim ölçümündeki üç plato (**L1d'de 10 çevrimin altı, L2'de yaklaşık 28, ana bellekte 480 ve üstü**) ve kirli satırların geri yazılmasının katkısı; **önbellek satırının** erken sistemlerde 32, bugün 64 bayt olması ve 64 bitlik veri yolunda 8 aktarım etmesi; adresin **etiket / küme / konum** biçiminde üçe bölünmesi; 4 MB'lık ve 64 baytlık satırlı bir önbelleğin **65.536 satır** tutması, tam çağrışımlı düzenin bu ölçekte uygulanamaz olması ve tam çağrışımlılığın yalnızca **birkaç düzine girdilik** yapılarda (bazı Intel işlemcilerinin TLB'si) kullanılması; doğrudan eşlemeli düzenin bitleri 6'dan 21'e kullanması, tek karşılaştırıcıyla yetinmesi ve adresler düzgün dağılmadığında bazı girdilerin sürekli atılması; **8 yollu** kümeli çağrışımlı düzenin **8.192 küme** ve **13 bit** vermesi; ikinci düzey önbelleklerde 24'e varan, birinci düzeyde genellikle 8 olan çağrışımlılık; çözülmüş komutları önbelleğe almanın boru hattı yanlış kestirim yüzünden boşaldığında kazandırması. Bu makaledeki AMAT hesapları, kesişim noktası hesabı ve TLB kapsama hesabı bu kaynaktan değil, kendi aritmetiğimdir. [Bağlantı](https://people.freebsd.org/~lstewart/articles/cpumemory.pdf)
- Ousterhout, J. K. *Why Aren't Operating Systems Getting Faster As Fast as Hardware?*, USENIX Summer Conference, Anaheim, Haziran 1990 — çekirdek giriş-çıkışını, süreç geçişini, dosya sistemini ve bellek kopyalamayı zorlayan kıyas kümesi ve sonuçların makinenin ham hızına göreli olarak verilmesi; boş sistem çağrısı kıyasında göreli hızların tipik olarak **0,5–0,8** aralığında kalması ve çekirdeğe giriş-çıkış maliyetinin temel hesaplama hızı kadar iyileşmemiş olması; iki süreç arasında boru üzerinden bir bayt gidip gelmesini ölçen bağlam anahtarı kıyasında göreli hızların **0,3–0,5** aralığında olması; sonuç bölümünün saydığı iki donanım başlığı — bellek bant genişliğinin işlemci hızına yetişememesi ve bağlam anahtarının yeni mimarilerde yaklaşık iki kat pahalı olması. [Bağlantı](https://web.stanford.edu/~ouster/cgi-bin/papers/osfaster.pdf)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 22: Beyond Physical Memory: Policies — ıskaların **üçe** ayrılması ("compulsory, capacity, and conflict misses, sometimes called the Three C's"), **kapasite ıskasının** önbellekte yer kalmamasından, **çakışma ıskasının** donanımda bir ögenin nereye konabileceğinin kümeli çağrışımlılıkla sınırlanmasından doğması ve işletim sisteminin sayfa önbelleğinde çakışma ıskası olmaması ("it does not arise in the OS page cache because such caches are always fully-associative"); AMAT formülünün tanımı. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Bryant, R. E. & O'Hallaron, D. R. *Computer Systems: A Programmer's Perspective*, üçüncü baskı, 4. bölüm (Processor Architecture; 4.2 Logic Design and the Hardware Control Language HCL, 4.4 General Principles of Pipelining, 4.5.5 Pipeline Hazards) ve 6. bölüm (The Memory Hierarchy; 6.2 Locality, 6.3 The Memory Hierarchy, 6.4 Cache Memories — 6.4.2 Direct-Mapped Caches, 6.4.3 Set Associative Caches, 6.4.4 Fully Associative Caches, 6.5 Writing Cache-Friendly Code). Pearson, 2016. Bölüm ve alt bölüm adları yayıncının resmî içindekiler ve önsöz belgesinden doğrulanmıştır; kitabın gövdesi okunmadığı için buradaki hiçbir sayı ya da tanım bu kaynağa dayandırılmamıştır. [Bağlantı](https://csapp.cs.cmu.edu/3e/pieces/preface3e.pdf)
- Patterson, D. A. & Hennessy, J. L. *Computer Organization and Design: The Hardware/Software Interface, RISC-V Edition*, ikinci baskı, 4. bölüm (The Processor) ve 5. bölüm (Large and Fast: Exploiting Memory Hierarchy). Morgan Kaufmann / Elsevier, Aralık 2020. Kitap ücretsiz değildir; kitabın gövdesi okunmadığı için buradaki hiçbir sayı ya da tanım bu kaynağa dayandırılmamıştır. **Ad farkı:** kitabın kendi içindekiler sayfası ve kütüphane katalog kaydı (K10plus, ISBN 9780128203316) 4. bölümü *The Processor* olarak verir; yayıncının satış sayfasındaki içindekiler listesi ise *The RISC-V Processor* der. Kitabın kendi adı esas alınmıştır. [Bağlantı](https://shop.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-820331-6)
- MIT OpenCourseWare, *6.004 Computation Structures*, Bahar 2017 (eğitmen: Chris Terman) — ders birimlerinin listesi: 4 Combinational Logic, 7 Performance Measures, 8 Design Tradeoffs, 13 Building the Beta, **14 Caches and the Memory Hierarchy**, **15 Pipelining the Beta**, 16 Virtual Memory. Birim adları doğrulanmıştır; ders materyallerinin içeriği okunmamıştır. [Bağlantı](https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü, **CMPE244 Computer Organization** ders sayfası (erişim: 11 Eylül 2026) — katalog tanımı: "Register transfer level design. Basic computer layout. Instruction sets and their implementation. Addressing techniques. ALU, hardwired and microprogrammed controllers. Memory unit. I/0 structures and interrupt handling. Improvements on von Neumann machine. Bus structures. Assembly programming."; öğrenme çıktıları arasında **hiyerarşik bellek sistemlerinin tasarım ilkeleri** ve **RISC-V assembly ile makine komutlarının yürütülmesi**. Bu makalenin kapsamı bu iki çıktıyla katalog tanımının kesişimidir. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe244/)
