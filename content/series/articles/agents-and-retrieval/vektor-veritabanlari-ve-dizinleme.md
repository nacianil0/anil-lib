---
article_id: article_609bf004-a126-4a8c-8658-beea8f2a33f5
title: "Vektör Veritabanları ve Dizinleme"
slug: vektor-veritabanlari-ve-dizinleme
category: agents-and-retrieval
level: intermediate
reading_order: 43
summary: "42. makalenin borç bıraktığı işi açar: yirmi bir milyon vektör arasından en yakın k taneyi tek tek taramadan nasıl bulduğumuzu, ağaç dizinlerinin yüksek boyutta neden çöktüğünü, üç dizin ailesinin — kümeleme, ürün kuantizasyonu ve yakınlık çizgesi — mekanizmasını ve parametrelerini, bulma oranı ile hız arasındaki takas eğrisini, dizinin kaçırdığı komşunun ne zaman önemli olduğunu ve bir vektör veritabanının dizinin üstüne neyi eklediğini ölçümlerle gösterir."
tags:
  - vektor-dizini
  - yaklasik-arama
  - hnsw
  - urun-kuantizasyonu
  - vektor-veritabani
content_hash: sha256:eaea0de3cbebd622f08ee8d36f8fbc5a368137366b61571e4e68b36d97d4992c
classification_version: 1
classification_batch: 10
---
## Sormadığımız soru

42\. makale bir işi bilerek görmezden geldi. Yoğun getiricide "en yakın `k` vektörü bul" dedik ve o işin nasıl yapıldığını hiç sormadık. 29\. makale de aynı yerde durmuştu: vektörlerin önceden kümelenip bir dizine yerleştirildiğini, sorgunun yalnızca yakın kümelere baktığını ve bunun karşılığında sonucun **yaklaşık** olduğunu söylemiş, mekanizmayı açmamıştı. O makalenin sayılarını hatırla: yirmi bir milyon parça, her biri 768 boyutlu bir vektör, toplam 65 gigabayt; dizini kurmak 8,5 saat, sonra saniyede 995 sorgu.

Bu makale o kutuyu açıyor ve üç soruya cevap veriyor. Yirmi bir milyon vektörü tek tek taramadan en yakınları nasıl buluyoruz? Kaçırma oranı hangi düğmeyle ayarlanıyor ve neye mal oluyor? Ve bir getirme hattında ölçtüğümüz kalitenin ne kadarı embedding modelinin, ne kadarı dizinin?

Baştan söyleyelim: bu makalede "dizin" sözcüğü, 42\. makaledeki ters dizinin vektör dünyasındaki karşılığı için kullanılıyor. Ters dizin her terim için belge listesi tutuyordu; **vektör dizini** (vector index) ise sorgu geldiğinde yirmi bir milyon vektörün yalnızca küçük bir kısmına dokunmayı sağlayan bir yapıdır. Yapıyı kurma işine de dizinleme diyeceğiz — 39\. makalede belleğe yazma için kullandığımız İngilizce sözcüğün aynısı, burada anlamı vektörleri bir yapıya yerleştirmek.

## Tam taramanın faturası

Önce dizinsiz hâli hesaplayalım, çünkü dizinin varlık sebebi bu hesap.

Bir sorgu vektörü geldi. En yakın `k` belgeyi bulmanın en dürüst yolu, sorguyu bütün belge vektörleriyle karşılaştırmaktır: 21.015.324 belge, her biri için 768 boyutlu bir nokta çarpım. Bu, sorgu başına 21.015.324 × 768 ≈ **16,1 milyar** çarpma-toplama demek. Alandaki adıyla **tam tarama** (brute-force search).

Asıl fatura hesapta değil bellekte. Nokta çarpım için her vektörün her sayısı bir kez okunmalı; yani sorgu başına 65 gigabaytın tamamı bellekten hesap çekirdeklerine taşınacak. 26\. makaledeki bellek bant genişliği sınırı burada da geçerlidir: taşınacak bayt sayısı, hesaplanacak işlem sayısından daha sıkı bir tavandır. 42\. makaledeki ters dizin bu faturayı ödemiyordu — sorgudaki terimlerin satırları okunuyor, belgelere tek tek bakılmıyordu. Vektörlerde "terim" yok; her vektör her sorguya aday.

Dizinin yaptığı iş tam olarak şu: her sorguda yirmi bir milyon vektörün büyük çoğunluğuna hiç dokunmamak. Bunun tek yolu, gerçekten en yakın belgeyi **kaçırma** ihtimalini kabul etmektir. Alandaki adı **yaklaşık en yakın komşu araması** (approximate nearest neighbor search): sorgunun `k` en yakın komşusunu değil, onlara yeterince yakın bir kümeyi bulmayı hedefleyen yöntemlerin toplu adı.

## Ağaçlar neden işe yaramıyor

Akla ilk gelen fikir, uzayı bölmektir. Vektörleri bir ağaçla bölgelere ayır; sorgu hangi bölgeye düşüyorsa yalnızca oraya ve komşularına bak. Düşük boyutta bu mükemmel çalışır — bir haritada en yakın şehri bulmak gibi.

Roger Weber, Hans-Jörg Schek ve Stephen Blott'un 1998'de VLDB'de sunduğu çalışma bu fikrin yüksek boyutta neden çöktüğünü hem ölçtü hem kanıtladı. Ölçüm tarafı sert: veri ya da uzay bölmeye dayanan yapıların tamamı, boyut sayısı **10 civarını** aştığında basit bir sıralı taramanın gerisine düşüyor. Kanıt tarafı daha da sert: her bölmeleme ve kümeleme yönteminin, boyut belirli bir eşiği geçtiğinde ortalamada bütün bloklara dokunmak zorunda kaldığını — yani taramaya dönüştüğünü — gösteriyorlar. Kendi maliyet modellerinde bu eşik 610 boyut çıkıyor ve yazarlar bunun kaba bir üst sınır olduğunu, pratikte eşiğin çok daha aşağıda kaldığını söylüyor.

5\. makalede boyutluluk lanetini bir olasılık sorunu olarak görmüştük: boyut arttıkça uzay o kadar hızlı büyür ki eldeki veri hiçbir bölgeyi dolduramaz. Burada aynı olgu geometrik yüzünü gösteriyor. Yüksek boyutta bir sorgunun en yakın komşusuyla en uzak komşusu arasındaki mesafe farkı küçülür; bölgeler arasındaki sınırlar sorguya o kadar yakın düşer ki hemen her bölge "komşu" sayılır ve ağaç, budayabileceği hiçbir şey bulamaz.

Aynı çalışmanın önerdiği çıkış yolu, bugünkü dizinlerin atası: madem tarama kaçınılmaz, taramayı ucuzlatalım. Her vektörü boyut başına birkaç bitlik kaba bir yaklaşığıyla sakla, önce yaklaşıkları tara, yalnızca umut vaat eden adayların tam vektörünü oku. 27\. makaledeki fikir — sayıları daha kaba bir ızgaraya yuvarlayarak bellekten kazanmak — burada bir arama yapısına dönüşüyor.

## Üç dizin ailesi

Bugünkü vektör dizinleri üç fikrin üstüne kurulu ve üçü birleştirilebiliyor: kümele, sıkıştır, çizge kur.

**Birincisi: kümele ve yalnızca yakın kümelere bak.** Vektörler önceden `K` kümeye ayrılır; her kümenin bir **küme merkezi** (centroid) vardır ve her vektör en yakın merkezin listesine yazılır. Kümeleme için alandaki standart yöntem **k-ortalamalar** (k-means): merkezleri rastgele başlat, her vektörü en yakın merkeze ata, merkezleri atanan vektörlerin ortalamasına taşı, tekrarla. Sorgu geldiğinde önce `K` merkezle karşılaştırılır, en yakın birkaç kümenin listesi taranır, gerisine dokunulmaz. Bu yapıya **ters dosya** (inverted file, IVF) denir ve adı boşuna 42\. makaledekine benzemiyor: ters dizin terim başına belge listesi tutuyordu, ters dosya küme başına vektör listesi tutar.

Jeff Johnson, Matthijs Douze ve Hervé Jégou'nun 2021'de IEEE Transactions on Big Data'da yayımlanan çalışması küme sayısı için pratik kuralı veriyor: `K`, vektör sayısının kareköküne yakın seçilir. Yirmi bir milyon vektör için bu yaklaşık 4.600 küme demek; 4.096 alalım. Küme başına ortalama 5.131 vektör düşer. Sorguda 32 küme yoklanırsa taranan vektör sayısı 32 × 5.131 ≈ 164 bin, üstüne 4.096 merkez karşılaştırması gelir: toplam 168 bin civarı mesafe hesabı, yani tam taramanın **yüzde 0,8'i**. Bu sayılar açıklama amaçlıdır; düğmenin adı ise gerçektir — yoklanan küme sayısı arttıkça hem bulma oranı hem sorgu süresi artar.

**İkincisi: sıkıştır.** Ters dosya hesabı azaltıyor ama 65 gigabaytı küçültmüyor; her vektör hâlâ 768 tane 32 bitlik sayı. Jégou, Douze ve Cordelia Schmid'in 2011 tarihli çalışması bunun için **ürün kuantizasyonu** (product quantization) fikrini getirdi ve Johnson ve arkadaşlarının çalışması mekanizmayı açıkça yazıyor. Vektör `b` alt vektöre bölünür; her alt vektör kendi **kod defterindeki** (codebook) 256 merkezden en yakınına yuvarlanır ve yalnızca o merkezin numarası saklanır. 256 seçenek bir bayta sığdığı için vektör `b` bayta iner. 768 boyutlu vektörü 64 alt vektöre bölersen 3.072 bayt yerine 64 bayt saklarsın: 48 kat küçük bir dizin, yirmi bir milyon vektör için 65 gigabayt yerine 1,3 gigabayt.

27\. makaledeki kuantizasyonla akrabalığı görüyorsun: orada ağırlıklar bir ızgaraya yuvarlanıyordu ve ızgaranın ölçeği bir sabitle veriliyordu; burada alt vektörler bir kod defterine yuvarlanıyor ve defterin kendisi veriden k-ortalamalarla öğreniliyor. Fark, yuvarlamanın tek tek sayılara değil küçük vektör parçalarına uygulanması — "ürün" sözcüğü de buradan geliyor: `b` defterin her birinden bir seçim, toplamda 256 üzeri `b` farklı yeniden kurulum.

Sıkıştırılmış vektörle mesafe nasıl hesaplanıyor? İncelik burada ve adı **asimetrik uzaklık hesabı** (asymmetric distance computation): sorgu sıkıştırılmaz, belge sıkıştırılmıştır. Sorgu geldiğinde her alt vektör için sorgunun o parçasıyla 256 merkezin uzaklıkları bir kez hesaplanıp küçük bir tabloya yazılır; sonra herhangi bir belgenin uzaklığı, kodundaki `b` numarayla bu tablolardan `b` sayı okuyup toplamaktan ibarettir. Nokta çarpım yerine tablo okuma.

Küçük bir örnekle kuralım. Dört boyutlu bir belge vektörü alalım: (0,20, 0,95, 0,80, 0,10). İkişer boyutluk iki alt vektöre bölelim ve her yarı için dört merkezlik bir kod defteri olsun — yani alt vektör başına iki bit. İlk yarının defteri (0,2, 0,8), (0,8, 0,2), (0,5, 0,5), (0,1, 0,1); ikinci yarının defteri (0,9, 0,1), (0,1, 0,9), (0,5, 0,5), (0,2, 0,2). Belgenin ilk yarısı (0,20, 0,95) birinci defterin ilk merkezine, ikinci yarısı (0,80, 0,10) ikinci defterin ilk merkezine en yakındır; belgenin kodu (1, 1) olur ve 128 bit yerine **4 bitle** saklanır.

Şimdi (0,30, 0,70, 0,70, 0,30) sorgusu gelsin. İlk yarısı (0,30, 0,70) için birinci defterin dört merkezine karesel uzaklıklar 0,02, 0,50, 0,08 ve 0,40; ikinci yarısı (0,70, 0,30) için 0,08, 0,72, 0,08 ve 0,26. Belgenin kodu (1, 1) olduğuna göre tahmini uzaklık iki tablonun ilk hücrelerinin toplamı: 0,02 + 0,08 = **0,10**. Gerçek karesel uzaklık ise 0,1225. Aradaki fark, belgenin ilk yarısını merkeze yuvarlarken kaybettiğimiz 0,15'in bedeli. Tablo bir kez kuruluyor; yirmi bir milyon belgenin her biri için yapılan iş iki tablo okuması ve bir toplama.

![Üç bölümlü bir şema. Solda dört boyutlu bir belge vektörünün sayıları kutular hâlinde dizilidir ve ortasından ikiye bölünmüştür; her yarının altında o yarının en yakın kod defteri merkezine yuvarlandığı ve yalnızca merkez numarasının saklandığı yazılıdır, saklanan kod iki numaradan oluşur. Ortada sorgu vektörü aynı biçimde ikiye bölünmüş ve her yarı için dört hücrelik bir uzaklık tablosu çizilmiştir; birinci tabloda 0,02, 0,50, 0,08, 0,40, ikinci tabloda 0,08, 0,72, 0,08, 0,26 değerleri durur ve her tablonun ilk hücresi vurgulanmıştır. Sağda belgenin kodundaki iki numaranın bu iki tablodan birer hücre okuduğu ve okunan iki değerin toplandığı gösterilir; sonuç 0,10 olarak yazılıdır ve altında gerçek uzaklığın 0,1225 olduğu belirtilir. Şeklin altında tabloların sorgu başına bir kez kurulduğu, belge başına yalnızca okuma ve toplama yapıldığı yazılıdır.](assets/urun-kuantizasyonu.svg "Şekil 1 — Sıkıştırılmış belgeyle uzaklık: tablo oku, topla")

Şekil 1'deki düzenin gerçek ölçekteki hâli de aynı çalışmada ölçülmüş. Bir milyar 128 boyutlu vektör, her biri 8 bayta sıkıştırılmış: tek bir kartta sorgu başına 17,7 mikrosaniyede, ilk on sonuç içinde gerçek en yakın komşuyu bulma oranı 0,376. Aynı çalışma yüz milyon görüntünün en yakın komşu çizgesini 35 dakikada, bir milyar vektörünkini dört kartla on iki saatin altında kuruyor. Ters dosya ile ürün kuantizasyonunu birleştiren düzen — önce kaba küme merkezine ata, sonra merkezden kalan farkı sıkıştır — alanın en yaygın taban çizgisidir.

Ama 0,376 sayısını unutma. Sıkıştırma bedava değil: bir milyar ölçeğinde belleğe sığan sıkıştırılmış dizinlerin, gerçek en yakın komşuyu birinci sırada bulma oranı yüzde 50 civarında kalıyor — bu sayı bir sonraki ailenin varlık gerekçesi.

**Üçüncüsü: çizge kur.** Yury Malkov ve Dmitry Yashunin'in IEEE Transactions on Pattern Analysis and Machine Intelligence'da 2020'de yayımlanan çalışması, bugün en yaygın kullanılan yapıyı tanımlıyor: **hiyerarşik gezilebilir küçük dünya** çizgesi (Hierarchical Navigable Small World, HNSW). Fikir üç parçadan oluşuyor.

Birincisi **yakınlık çizgesi** (proximity graph): her vektör bir düğümdür ve en yakın `M` komşusuna bağlanır. Arama, herhangi bir düğümden başlayıp her adımda sorguya en yakın komşuya atlayarak ilerler; komşuların hepsi sorgudan daha uzak olduğunda durur. Bu açgözlü yürüyüş, iyi kurulmuş bir çizgede az adımda hedefe varır.

İkincisi hiyerarşi. Çizge tek katman olsa uzaktaki bir başlangıçtan hedefe ulaşmak çok adım alırdı. Bu yüzden her vektör alt katmanda bulunur, ama üstel olarak azalan bir olasılıkla üst katmanlara da yerleştirilir: en üst katmanda birkaç düğüm ve uzun bağlantılar, aşağı indikçe daha çok düğüm ve daha kısa bağlantılar. Arama en üstten başlar, orada en yakın düğümü bulur, bir alt katmana iner ve oradan devam eder. Yazarlar yapıyı bilinen bir veri yapısına bağlıyor: bu, **atlamalı listenin** (skip list) bağlı liste yerine yakınlık çizgesiyle kurulmuş hâlidir. Katman seçim olasılığının ölçeği için önerdikleri değer `1 / ln(M)`; komşu sayısı arttıkça katmanlar seyrelir.

Üçüncüsü, komşu seçiminde bir sezgisel kural: bir düğümün en yakın `M` vektöre değil, farklı yönlerdeki komşulara bağlanması. Bu, iki ayrı kümenin arasındaki bağlantıyı korur; yalnızca en yakınlara bağlanan bir çizge kümeler arasında kopabilir ve arama yanlış kümede sıkışıp kalır.

Parametreler üç tane ve her birinin neyi değiştirdiği net. `M` bellek tüketimini belirler; bellek `M` ile orantılıdır. Kurulum sırasındaki aday listesi genişliği dizinin kalitesini belirler; yazarların notu, kurulum sırasında bulma oranını 0,95'e çıkaracak kadar büyük tutmanın çoğu kullanım için yeterli olduğu yönünde. Sorgu sırasındaki aday listesi genişliği ise bulma oranı ile hız arasındaki düğmedir. Çalışmanın Tablo 3'ü bedeli somutlaştırıyor: iki yüz milyon vektörlük bir kümede dizin, kurulum genişliği 500 ile **5,6 saatte**, 40 ile **42 dakikada** kuruluyor ve iki durumda da 64 gigabayt bellek istiyor; aynı veri için sıkıştırılmış ters dosya dizini 11–12 saatte kuruluyor ama 23,5–30 gigabaytla yetiniyor. Çizge hızlı ve doğru, ama sıkıştırılmış dizinin iki katından fazla bellek yiyor.

Şimdi 29\. makalenin sayılarına geri dön. Oradaki dizin bir HNSW'ydi: düğüm başına 512 komşu, kurulum genişliği 200, sorgu genişliği 128. Saniyede 995 sorgu bu ayarların sonucuydu ve 8,5 saatlik kurulum süresi de öyle.

> **Kendini yokla:** HNSW'nin sorgu genişliğini artırırsan hangi iki şey aynı anda değişir?

Aday listesi büyüdükçe arama daha çok düğüme bakar; gerçek en yakın komşuyu kaçırma ihtimali düşer, ama sorgu süresi uzar. Bu iki şeyin birbirinden bağımsız ayarlanamaması, bir sonraki bölümün konusu olan eğrinin ta kendisidir.

## Bulma oranı ile hız arasındaki eğri

Bir dizinin kalitesi tek sayıyla verilemez, çünkü her dizin bir düğmeyle ayarlanır ve düğmenin her konumu farklı bir hız–kalite çifti üretir. Martin Aumüller, Erik Bernhardsson ve Alexander Faithfull'un Information Systems dergisinde 2020'de yayımlanan karşılaştırma çerçevesi bunu ölçmenin standardı oldu.

Önce ölçünün tanımı, çünkü bu makalenin en önemli ayrımı buradan çıkacak. Çerçevede bulma oranı, dizinin döndürdüğü `k` sonuç içinde **tam taramanın bulacağı** `k` gerçek en yakın komşudan kaçının bulunduğudur. Dikkat: burada ilgililik etiketi yok. Ölçüt, sorguya gerçekten en yakın vektörlerle örtüşme; 29 ve 42\. makalelerdeki bulma oranı ise doğru **belgenin** bulunup bulunmadığına bakıyordu. Bu ikisini ayırt etmek için buradakine **dizin bulma oranı** diyeceğiz.

Her dizin için parametrelerin bütün kombinasyonları çalıştırılır, her koşu bir dizin bulma oranı ve saniyedeki sorgu sayısı verir ve yalnızca en iyi noktalar — belirli bir bulma oranında en hızlı olanlar — bir eğri olarak çizilir. Çerçevenin kendi örneği: ağaç tabanlı bir dizin belirli bir ayarda saniyede 1.249 sorguyu yaklaşık 0,52 bulma oranıyla cevaplıyor; ayar değişince aynı dizin daha yavaş ama daha doğru bir noktaya kayıyor.

Bulgular üç başlıkta toplanıyor. Kelime vektörlerinden oluşan bir kümede çizge tabanlı dizinler ağaç tabanlılardan açık farkla hızlı; HNSW bütün bulma oranlarında en hızlısı ve ters dosya üçüncü sırada, yalnızca çok yüksek bulma oranlarında çizgelerin gerisine düşüyor. Ama hiçbir dizin her kümede önde değil: yazarların ürettiği yapay bir kümede HNSW hiçbir ayarda 0,86 bulma oranını geçemiyor, başka bir kümede ters dosya 0,7'nin üstüne çıkamıyor. Ve bütün dizinler yüksek bulma oranında hız kaybediyor — eğrinin sağ ucu diktir.

Harsha Vardhan Simhadri ve arkadaşlarının NeurIPS 2021 yarışmasının sonuçlarını derleyen çalışması aynı takası bir milyar vektör ölçeğinde ve iki donanım bütçesinde gösteriyor. Birinci parkurda dizinin tamamı 64 gigabayt belleğe sığmak zorunda; bir milyar vektörün sıkıştırılmadan sığması imkânsız olduğu için yarış, sıkıştırma kalitesinin yarışına dönüşüyor. İkinci parkurda ucuz bir katı hâl diski ekleniyor ve tam vektörler diskte tutulabiliyor. Sıralama ölçüsü, saniyede belirli bir sorgu eşiğinde ulaşılan ilk on sonuçtaki dizin bulma oranı.

| veri kümesi | 64 gigabayt bellek, saniyede 10.000 sorgu | bellek + disk, saniyede 1.500 sorgu |
|---|---|---|
| BIGANN | 0,635 | 0,949 |
| DEEP | 0,650 | 0,937 |
| MS SPACEV | 0,729 | 0,901 |
| MS Turing | 0,704 | 0,936 |

![Dört satırlı, üç sütunlu yatay bir çubuk şeması. Her satırda solda bir veri kümesinin adı, ortada iki üst üste çubuk, sağda iki değer vardır. Her satırdaki üstteki kısa çubuk yalnızca belleğe sığan sıkıştırılmış dizinin saniyede on bin sorgudaki dizin bulma oranını, alttaki uzun çubuk diske de yazılan dizinin saniyede bin beş yüz sorgudaki dizin bulma oranını gösterir. Değerler yukarıdan aşağıya 0,635 ve 0,949; 0,650 ve 0,937; 0,729 ve 0,901; 0,704 ve 0,936 olarak yazılıdır. Şeklin sağında iki satırlık bir gösterge, kısa çubuğun bellek bütçesine, uzun çubuğun disk bütçesine karşılık geldiğini açıklar. Şeklin altında aynı milyar vektör için iki bütçenin iki farklı bulma oranı verdiği ve farkın algoritmadan değil hangi bütçenin harcandığından geldiği yazılıdır.](assets/iki-butce-iki-bulma-orani.svg "Şekil 2 — Aynı milyar vektör, iki bütçe, iki bulma oranı")

Şekil 2'nin söylediği şey basit ama sonuçları ağır: aynı bir milyar vektör, aynı algoritma ailesi, ama iki bütçe. Belleğe sığdırmak için sıkıştırılan dizin ilk onda gerçek komşuların üçte ikisini buluyor; diski kullanabilen dizin yüzde 90'ın üstünü. Çalışmanın kendi yorumu, ilk parkurdaki hız eşiğinin, kuantizasyon kaybının doyduğu bölgeye denk geldiği yönünde — orada daha iyi bir algoritma değil, daha çok bellek gerekiyor. Aynı çalışmanın bir ayrıntısı 42\. makaledeki alan dışı dersini dizinlere taşıyor: sorgu vektörleri metinden, belge vektörleri görüntüden gelen kümede sıkıştırmaya dayalı bütün yöntemler çöküyor, çünkü dizin belge dağılımına göre kurulmuşken sorgular başka bir dağılımdan geliyor.

Disk fikrinin kaynağı, Suhas Jayaram Subramanya ve arkadaşlarının NeurIPS 2019'da sunduğu çalışma. Alandaki yerleşik kanı, bir dizinin ancak bellekten servis edilebileceği yönündeydi; disk, hatta katı hâl diski bile çok yavaş sayılıyordu. Çalışma bunu tersine çeviriyor: bir milyar noktalık dizin, 64 gigabayt bellek ve ucuz bir diskle tek bir iş istasyonunda kuruluyor ve on altı çekirdekte saniyede beş binden fazla sorguyu, ortalama üç milisaniyenin altında gecikmeyle ve gerçek en yakın komşuyu birinci sırada yüzde 95'in üstünde bularak cevaplıyor. Aynı bellek bütçesindeki sıkıştırılmış dizinler yüzde 50 civarında kalıyor. Yöntemin sırrı, sıkıştırılmış vektörleri bellekte gezmek için kullanıp yalnızca son adayların tam vektörünü diskten okumak — Weber ve arkadaşlarının yirmi yıl önce çizdiği yolun ta kendisi.

## Kaçırılan komşu kimdir

Şimdi bu makalenin asıl sorusuna geliyoruz. Dizin bulma oranı 0,90 olan bir sistem, gerçek en yakın on komşudan birini kaçırıyor demektir. Bu, getirme kalitesinden yüzde 10 kaybettiğimiz anlamına mı geliyor?

Craig Macdonald ve Nicola Tonellotto'nun CIKM 2021'de sunduğu çalışma bunu doğrudan ölçtü. Geç etkileşimli bir getiricide, dizinin yaklaşık puanlarıyla aday sayısını binlerden 200'e indirdiler. İlgili belgelerin bulma oranı yüzde 18 düştü — 0,77'den 0,59'a. Buna karşılık sıralama kalitesini ölçen üç ölçüde, nDCG@10 dahil, istatistiksel olarak anlamlı hiçbir fark çıkmadı; cevap süresi ise 406 milisaniyeden 202'ye indi. Kaçırılan belgeler vardı, ama üst sıraları belirleyen belgeler değildi.

Leonardo Kuffo ve arkadaşlarının SIGIR 2026'da sunduğu çalışma bu olgunun mekanizmasını gösteriyor. Fikir şu: bir sorgunun tam taramayla bulunan en yakın komşularının hepsi ilgili değildir; bir kısmı yalnızca geometrik olarak yakındır. Yazarlar tam tarama sonuçlarını ilgili ve ilgisiz diye etiketleyip yalnızca ilgili olanların ne kadarının bulunduğunu ölçüyorlar. Bir web arama kümesinde aynı dizin ayarı için geleneksel dizin bulma oranı 0,863 iken ilgili komşuların bulma oranı 0,932; ilgili komşusu az olan sorgularda fark daha büyük — 0,762'ye karşı 0,903. Sebep ölçülmüş: ilgisiz komşular sorguya neredeyse aynı uzaklıkta duruyor, aralarındaki sıralama küçük dalgalanmalarla değişiyor ve dizin tam da onları birbirine karıştırıyor. İlgili komşuların puanları ise birbirinden belirgin biçimde ayrılıyor; dizin onları kaçırmıyor.

Bunun bir bütçe sonucu var. Dizin, ilgili komşuların bulma oranı hedeflenerek ayarlandığında aynı kaliteyi yüzde 14 daha az hesapla veriyor; hedef yüzde 95'lik geleneksel bulma oranından yüzde 95'lik hoşgörülü bulma oranına çevrildiğinde maliyet bir milyar vektörlük kümede yaklaşık dörtte bir, web arama kümesinde yaklaşık üçte bir düşüyor. Çünkü eğrinin sağ ucu diktir: son birkaç puanlık bulma oranı, en ilgisiz komşuları toplamak için harcanan en pahalı hesaptır.

> **Kendini yokla:** Dizin bulma oranı 0,90 olan bir sistemin getirme kalitesi neden yüzde 10'dan çok daha az düşebilir?

Çünkü dizin bulma oranı, kaçırılan komşunun ilgili olup olmadığına bakmaz. Kaçırılan komşular ağırlıkla sorguya yakın ama ilgisiz, birbirinin yerine geçebilen belgelerdir; sıralamanın üstünü belirleyen ilgili belgeler geometride daha belirgin durur ve dizin onları tutar. Ama bu bir teminat değil, ölçüm gerektiren bir eğilimdir.

Bu, 29\. makaledeki uyarıyı hem yumuşatıyor hem keskinleştiriyor. Kaçırılan sonuç hâlâ sessizdir; ama kaçırılanların çoğu zararsızdır. Hangisi olduğunu görmenin tek yolu, 42\. makalede kurduğumuz ölçüm disiplinini dizine uygulamaktır: aynı değerlendirme kümesinde önce tam taramayla, sonra dizinle ölç. Aradaki fark dizinin payıdır, gerisi embedding modelinin. Ve 42\. makaledeki etiket yanlılığı uyarısı burada da geçerli — dizinin kaçırdığı belge etiketlenmemişse kayıp görünmez.

## Vektör veritabanı neyi ekliyor

Şimdiye kadar anlattığımız her şey bir dizindi: bir kütüphane, bir veri yapısı. Piyasadaki "vektör veritabanı" ürünleri bunun üstüne ne koyuyor?

James Jie Pan, Jianguo Wang ve Guoliang Li'nin The VLDB Journal'da 2024'te yayımlanan derlemesi soruyu sistem tasarımı açısından cevaplıyor. Beş yıl içinde yirmiden fazla ticari **vektör veritabanı yönetim sistemi** (vector database management system) ortaya çıkmış; yazarlar bu alanı zorlaştıran beş engel sayıyor: anlamsal benzerliğin belirsizliği, vektörlerin büyüklüğü, karşılaştırmanın pahası, dizinleme için doğal bir bölümlemenin olmayışı ve hem öznitelik hem vektör içeren **melez sorguların** (hybrid query) zorluğu. İlk dördü bu makalenin konusuydu. Beşincisi yeni.

Gerçek bir sorgu nadiren yalnızca "en yakın on belge"dir. "2024'ten sonraki belgeler arasından en yakın on tanesi", "yalnızca bu kullanıcının erişebildiği belgeler arasından", "fiyatı şu aralıkta olan ürünler arasından". Vektörün yanında bir de etiket vardır ve sonuç, önce etikete uyan sonra vektöre yakın olan belgelerden oluşmalıdır. 39\. makaledeki anahtar–değer ayrımını hatırla: neyle arandığı ile ne saklandığı ayrı kararlardı. Burada anahtarın kendisi ikiye ayrılıyor — vektör ve etiket.

Siddharth Gollapudi ve arkadaşlarının 2023 Web Konferansı'nda sunduğu çalışma bunun neden zor olduğunu ölçüyor. Etiketin **seçiciliğini** (specificity), dizindeki vektörlerin o etiketi taşıyan oranı olarak tanımlıyorlar. İki bariz yol var ve ikisi de kırılıyor. Sonradan süzme: dizini normal sorgula, gelen sonuçlardan etikete uymayanları at. Seçicilik düşükse — etiket vektörlerin binde birinde varsa — on sonuç için ortalama on bin komşu getirmek gerekir; dizinin sorgu genişliği bunun için on binlere çıkarılmalıdır ve gecikme buna göre büyür. Önceden süzme: her etiket için ayrı dizin kur. Etiket sayısı ya da bir vektörün etiket sayısı arttığında dizin sayısı patlar. Çalışmanın önerisi, çizgeyi kurarken bağlantıları yalnızca geometriye göre değil etiket kümesine göre de seçmek; bu yolla seçiciliği onda birden milyonda bire kadar inen filtrelerde yüzde 90'ın üstünde bulma oranı korunuyor, öteki yaklaşımlar ise düşük seçicilikte anlamlı bir doğruluğa ulaşamıyor ve saniyede neredeyse bin kat daha az sorgu cevaplıyor.

Derlemenin saydığı öteki işler de dizinin değil sistemin işleridir: vektörlerin eklenmesi, güncellenmesi ve silinmesi — ki bir çizgeden düğüm çıkarmak, bir ters dosyadan vektör çıkarmaktan çok daha zordur; dizinin birden çok makineye bölünmesi; sözcük eşleşmesiyle vektör aramasının 42\. makaledeki gibi birleştirilmesi; ve bütün bunların bir sorgu dili arkasında sunulması. 41\. makaledeki dizin değiştirme fikri burada somutlaşıyor: bilgiyi güncellemek, ağırlıklara değil bu sisteme yazmak demek.

![Üç katmanlı bir kutu şeması. En alttaki katmanın adı dizin yapısıdır; içinde üç kutu yan yana durur — ters dosya, ürün kuantizasyonu ve yakınlık çizgesi — ve her kutunun altında o yapının düğmesi yazılıdır: yoklanan küme sayısı, kod uzunluğu ve sorgu genişliği. Ortadaki katmanın adı veritabanı işleridir; içinde etiketle süzme, ekleme ve silme, makinelere bölme ve melez sorgu kutuları vardır. En üstteki katmanın adı uygulamadır; içinde tek bir kutu bulunur ve içinde getirme hattı yazar. Katmanlar arasında yukarı doğru oklar vardır. Şeklin sağında, alt katmanın düğmelerinin bulma oranı ile hızı, orta katmanın işlerinin ise sonucun doğruluğunu ve tazeliğini belirlediği yazılıdır. Şeklin altında bir vektör veritabanının bir dizin artı bu orta katman olduğu belirtilir.](assets/dizinden-veritabanina.svg "Şekil 3 — Dizin, veritabanı ve uygulama: hangi düğme neyi değiştirir")

Şekil 3'ün alt katmanı bu makalenin ilk yarısı, orta katmanı ikinci yarısı. Bir vektör veritabanı, alt katmandaki yapılardan birini ya da birkaçını orta katmanın işleriyle sarmalayan sistemdir. Hangi ürünün hangi dizini kullandığı değişir; hangi katmanın hangi kararı belirlediği değişmez.

## Geç etkileşim için dizin

Son bir düğüm 42\. makaleye bağlanıyor. Orada geç etkileşimli düzenin belgeyi tek vektör yerine token başına bir vektörle sakladığını ve bunun depolamayı artırdığını söylemiştik. Keshav Santhanam ve arkadaşlarının NAACL 2022'de sunduğu çalışma bu faturayı bu makalenin araçlarıyla ödüyor: token vektörleri önce k-ortalamalarla bulunan merkezlere atanıyor, sonra yalnızca merkezden kalan fark birkaç bitle saklanıyor. Depolama 6–10 kat düşüyor ve kalite korunuyor. Aynı ekibin CIKM 2022'deki devam çalışması ise arama tarafını hızlandırıyor: her belgeyi bir merkezler torbası gibi görüp düşük puanlı belgeleri tam vektörlere hiç bakmadan eliyor; gecikme kart üzerinde 7 kata, işlemci üzerinde 45 kata kadar düşüyor ve 140 milyon parçalık bir derlemde onlarca milisaniyeye iniyor. Merkeze ata, farkı sıkıştır, önce kaba puanla ele: aynı üç fikir, bu kez belge başına yüzlerce vektör için.

## Dizinlemenin disiplini

**Tam tarama hesapta değil bellekte pahalıdır.** Sorgu başına bütün vektörleri bellekten geçirmek, dizinin varlık sebebidir.

**Yüksek boyutta bölmeleme taramaya dönüşür.** On boyut civarının üstünde ağaçlar sıralı taramanın gerisine düşer; çıkış yolu, taramayı yaklaşık vektörlerle ucuzlatmaktır.

**Üç aile, üç düğme.** Ters dosyada yoklanan küme sayısı, ürün kuantizasyonunda kod uzunluğu, çizgede sorgu genişliği; üçü de bulma oranı ile hızı aynı anda değiştirir.

**Sıkıştırma bellekten kazandırır, birinci sıradaki doğruluktan götürür.** Bir milyar ölçeğinde sıkıştırılmış dizinler gerçek en yakın komşuyu yarı yarıya kaçırırken, diski kullanan çizge yüzde 95'in üstünü buluyor.

**Dizin bulma oranı, getirme bulma oranı değildir.** Birincisi tam taramayla örtüşmeyi ölçer, ikincisi doğru belgeyi. Kaçırılan komşuların çoğu ilgisiz olduğu için ikincisi birincisinden daha az düşer — ama bunu ancak kendi kümende ölçerek bilirsin.

**Eğrinin sağ ucu diktir.** Son birkaç puanlık dizin bulma oranı en pahalı hesaptır ve çoğunlukla en ilgisiz komşular için harcanır.

**Vektör veritabanı, dizin artı sistemdir.** Etiketle süzme, güncelleme ve silme, makinelere bölme dizinin değil sistemin işidir; düşük seçicilikli bir filtre, iyi bir dizini bile çökertebilir.

### Sırada ne var

Bu makale boyunca dizine konan şeyin ne olduğunu sormadık: vektörler hazırdı. Oysa 29\. makale bir borç bırakmıştı — metnin nereden kesileceği "başlı başına bir tasarım kararı"ydı ve sonraya bırakılmıştı. Dizine yüz kelimelik parçalar mı konacak, tek cümleler mi, yoksa daha küçük bir şey mi? Sorgu dizine gitmeden önce yeniden yazılmalı mı? Gelen adaylar istemin neresine, kaç tane ve hangi sırayla konacak? Bir sonraki makale, getirme hattının bu görünmez kararlarını tek tek ölçüme vuruyor.

## Kaynakça

- Weber, R., Schek, H.-J. & Blott, S. (1998). *A Quantitative Analysis and Performance Study for Similarity-Search Methods in High-Dimensional Spaces*. VLDB 1998, s. 194–205. [Bağlantı](https://www.vldb.org/conf/1998/p194.pdf)
- Johnson, J., Douze, M. & Jégou, H. (2021). *Billion-Scale Similarity Search with GPUs*. IEEE Transactions on Big Data 7(3), s. 535–547. [Bağlantı](https://doi.org/10.1109/TBDATA.2019.2921572)
- Jégou, H., Douze, M. & Schmid, C. (2011). *Product Quantization for Nearest Neighbor Search*. IEEE Transactions on Pattern Analysis and Machine Intelligence 33(1), s. 117–128. [Bağlantı](https://doi.org/10.1109/TPAMI.2010.57)
- Malkov, Y. A. & Yashunin, D. A. (2020). *Efficient and Robust Approximate Nearest Neighbor Search Using Hierarchical Navigable Small World Graphs*. IEEE Transactions on Pattern Analysis and Machine Intelligence 42(4), s. 824–836. [Bağlantı](https://doi.org/10.1109/TPAMI.2018.2889473)
- Karpukhin, V., Oğuz, B., Min, S., Lewis, P., Wu, L., Edunov, S., Chen, D. & Yih, W. (2020). *Dense Passage Retrieval for Open-Domain Question Answering*. EMNLP 2020, s. 6769–6781. [Bağlantı](https://aclanthology.org/2020.emnlp-main.550/)
- Aumüller, M., Bernhardsson, E. & Faithfull, A. (2020). *ANN-Benchmarks: A benchmarking tool for approximate nearest neighbor algorithms*. Information Systems 87, 101374. [Bağlantı](https://doi.org/10.1016/j.is.2019.02.006)
- Simhadri, H. V., Williams, G., Aumüller, M., Douze, M., Babenko, A., Baranchuk, D., Chen, Q., Hosseini, L., Krishnaswamy, R., Srinivasa, G., Subramanya, S. J. & Wang, J. (2022). *Results of the NeurIPS'21 Challenge on Billion-Scale Approximate Nearest Neighbor Search*. Proceedings of the NeurIPS 2021 Competitions and Demonstrations Track, PMLR 176, s. 177–189. [Bağlantı](https://proceedings.mlr.press/v176/simhadri22a.html)
- Subramanya, S. J., Devvrit, Kadekodi, R., Krishnaswamy, R. & Simhadri, H. V. (2019). *DiskANN: Fast Accurate Billion-point Nearest Neighbor Search on a Single Node*. NeurIPS 2019. [Bağlantı](https://proceedings.neurips.cc/paper/2019/hash/09853c7fb1d3f8ee67a61b6bf4a7f8e6-Abstract.html)
- Macdonald, C. & Tonellotto, N. (2021). *On Approximate Nearest Neighbour Selection for Multi-Stage Dense Retrieval*. CIKM 2021, s. 3318–3322. [Bağlantı](https://doi.org/10.1145/3459637.3482156)
- Kuffo, L., Tsakalidou, I., De Viti, R., Angel, A., Iša, J. & Lenhardt, R. (2026). *Semantic Recall for Vector Search*. SIGIR 2026, s. 3907–3912. [Bağlantı](https://doi.org/10.1145/3805712.3809894)
- Pan, J. J., Wang, J. & Li, G. (2024). *Survey of vector database management systems*. The VLDB Journal 33(5), s. 1591–1615. [Bağlantı](https://doi.org/10.1007/s00778-024-00864-x)
- Gollapudi, S., Karia, N., Sivashankar, V., Krishnaswamy, R., Begwani, N., Raz, S., Lin, Y., Zhang, Y., Mahapatro, N., Srinivasan, P., Singh, A. & Simhadri, H. V. (2023). *Filtered-DiskANN: Graph Algorithms for Approximate Nearest Neighbor Search with Filters*. The ACM Web Conference 2023, s. 3406–3416. [Bağlantı](https://doi.org/10.1145/3543507.3583552)
- Santhanam, K., Khattab, O., Saad-Falcon, J., Potts, C. & Zaharia, M. (2022). *ColBERTv2: Effective and Efficient Retrieval via Lightweight Late Interaction*. NAACL 2022, s. 3715–3734. [Bağlantı](https://aclanthology.org/2022.naacl-main.272/)
- Santhanam, K., Khattab, O., Potts, C. & Zaharia, M. (2022). *PLAID: An Efficient Engine for Late Interaction Retrieval*. CIKM 2022, s. 1747–1756. [Bağlantı](https://doi.org/10.1145/3511808.3557325)
