---
article_id: article_51824a21-d8fe-4db1-bd4a-5b79e21f721d
title: "Veriden Öğrenmek: Model, Parametre ve Kayıp"
slug: veriden-ogrenmek-model-parametre-ve-kayip
category: foundations
level: beginner
reading_order: 2
summary: "Parametre, kayıp fonksiyonu ve gradyan inişini elle hesaplanan sayısal bir örnekle kurar; öğrenme oranının yakınsama eşiğini, genellemeyi ve aşırı öğrenmeyi gösterir."
tags:
  - parametre
  - kayip-fonksiyonu
  - gradyan-inisi
  - genelleme
  - asiri-ogrenme
content_hash: sha256:a78cfeb1ae66d17f748239c3b497556d352d96a995b9c392d9653fe56d1b002a
classification_version: 1
classification_batch: 0
---
## Düğmeleri kim çeviriyor?

Serinin ilk makalesinde bir yol ayrımı kurmuştuk: bir işi bilgisayara yaptırmanın bir yolu kuralları tek tek elle yazmak, öbür yolu örnekler gösterip kuralı makineye buldurtmaktır. İkinci yolun merkezinde tek bir fikir vardı — model, içinde ayarlanabilir sayılar taşıyan bir fonksiyondur; öğrenmek de bu sayıları örneklere bakarak ayarlamaktır. Fonksiyonun biçimini tasarımcı seçer, sayıları veri seçer.

O cümlede bilerek açık bırakılmış bir boşluk var ve bu makalenin sorusu tam olarak o boşluk: düğmeleri kim çeviriyor, neye göre çeviriyor, ne zaman durmaya karar veriyor? Cevap üç kavramda toplanacak — kayıp fonksiyonu, gradyan inişi ve genelleme — ve bu üçü serinin sonuna kadar peşimizi bırakmayacak. Bugün bir dil modelinin internet ölçeğindeki eğitimi de, telefonundaki minik bir sınıflandırıcı da, birazdan üç sayı üzerinde elle çalıştıracağımız aynı döngüyü koşturuyor.

## Tek düğmeli bir model

Mekanizmayı görebilmek için mümkün olan en küçük örneği kuralım. Elimizde üç ev var; her biri için büyüklüğünü ve satış fiyatını biliyoruz. Büyüklüğü 100 metrekare biriminde, fiyatı milyon lira biriminde yazalım:

| büyüklük (100 m²) | fiyat (milyon TL) |
|---|---|
| 1 | 2 |
| 2 | 4 |
| 3 | 7 |

Modelimiz akla gelebilecek en sade fonksiyon olsun: fiyat = w × büyüklük. Yani "her 100 metrekare şu kadar lira eder" diyen tek bir orantı. Sabit bir terim eklemedik, çünkü sıfır metrekarelik bir ev sıfır lira eder; bu sayede modelde çevrilecek tek bir düğme kalıyor ve mekanizmayı bir kerede bütün olarak görebiliyoruz.

O düğmenin adı **parametre** (parameter). Aynı sayıya, özellikle sinir ağları (neural network) bağlamında, **ağırlık** (weight) da denir; ikisi eşanlamlıdır ve bu seride ikisini de kullanacağız. Burada tek bir parametremiz var: w. Modern bir dil modelinin adındaki "7 milyar parametre" ifadesi de tam olarak bunu söyler — eğitim yordamının ayarlamasına izin verilen sayıların adedi. Bizde bu sayı 7.000.000.000 değil, 1.

Baştan söylenmesi gereken bir şey daha var, çünkü ilerideki pek çok karışıklığı önler: model burada bir ilişkiyi "anlamıyor". Emlak piyasası hakkında bir kanaati yok; yapacağı tek şey, birazdan tanımlayacağımız tek bir sayıyı küçültene kadar w'yi oynatmak. "Anlama", ortaya çıkan sayılara bizim yüklediğimiz bir yorumdur; algoritmanın içinde öyle bir adım yoktur.

## Yanlışlığı tek sayıya indirgemek

w'yi çevirebiliriz, ama hangi yöne? Bunu bilmek için önce "bu ayar ne kadar kötü?" sorusunun sayısal bir cevabı olmalı. Bulanık bir hedef optimize edilemez.

Bu sorunun ilk ciddi cevabı, yapay zekâdan iki yüzyıl önce, gökyüzünde verildi. 1805'te Adrien-Marie Legendre, kuyruklu yıldızların yörüngelerini hesaplama yöntemleri üzerine kitabının bir ekinde şu problemi çözdü: birden çok gözlemcinin aynı gök cismi için aldığı ölçümler birbirini tutmuyor, ama cismin tek bir yörüngesi var. Legendre'ın önerisi, "yanlışlık"ı ölçmenin bir tanımını yapmaktı — her ölçümün tahmin edilenden sapmasının karesini al, hepsini topla, bu toplamı en küçük yapan yörüngeyi seç. Yöntemin adını da o koydu: en küçük kareler. Dört yıl sonra Carl Friedrich Gauss aynı yöntemi, neden karesinin alındığına dair olasılıksal bir gerekçeyle yayımladı ve 1795'ten beri kullandığını söyledi. İstatistik tarihinin en ünlü öncelik tartışması böyle başladı; Stephen Stigler'ın 1981 tarihli incelemesi, kendi ifadesiyle kesin olmamakla birlikte, Gauss'un yöntemi gerçekten önce bulmuş olabileceğini savunur — ama yayın önceliğinin tartışmasız Legendre'da olduğunu teslim eder.

Bugün bu tanıma **kayıp fonksiyonu** (loss function) diyoruz. Önce sözle: her örnek için modelin tahmini ile gerçek değer arasındaki farkı al, karesini al, bütün örneklerin ortalamasını al. Bu ölçüye ortalama karesel hata (mean squared error) denir. Şimdi sembolle, üç evimiz için:

L(w) = (1/3) × [ (w×1 − 2)² + (w×2 − 4)² + (w×3 − 7)² ]

Sayı koyalım. w = 0 iken model her eve "sıfır lira" der; hatalar −2, −4, −7; kareleri 4, 16, 49; toplam 69; üçe bölünce **L(0) = 23**. Berbat. w = 2 iken tahminler 2, 4, 6 olur; ilk iki ev tam tutar, üçüncüsünde 1 birim şaşarız; kayıp (0 + 0 + 1)/3 ≈ 0,333. Çok daha iyi. w = 3 iken tahminler 3, 6, 9; hatalar 1, 2, 2; kayıp 9/3 = 3. Yine kötüleştik. Demek ki kayıp, w büyüdükçe önce düşüyor, bir yerde dibi buluyor, sonra tekrar yükseliyor: w'nin bir fonksiyonu olarak çanak biçiminde bir eğri.

> **Kendini yokla:** Bu üç eve birden tam uyan, yani kaybı sıfıra indiren bir w değeri var mı?

Yok. w = 2 ilk iki evi tam tutturur ama üçüncüsünü kaçırır; üçüncüyü tam tutturan w = 7/3 ise ilk ikisini şaşırır ve kaybı 0,185'e çıkarır. Üç nokta tek bir doğru üzerinde durmuyor, dolayısıyla hiçbir ayar hepsini birden yakalayamaz. Bu örnekte kaybı en küçük yapan değer w* = 31/14 ≈ 2,214'tür ve o noktada bile kayıp sıfır değil, 0,119'dur. Verinin kendisi çelişkiliyse en iyi model bile bir hata payı bırakır — bu gözlem makalenin sonunda "indirgenemez hata" adıyla geri gelecek.

Bu w* değerini aslında hiçbir öğrenme yapmadan, doğrudan bir formülle bulduk: tek parametreli doğrusal bir modelde en iyi eğim, çarpımların toplamının karelerin toplamına oranıdır (bizde 31/14). O hâlde neden bir algoritma kuruyoruz? Çünkü böyle kapalı formüller yalnızca en basit modeller için vardır. Yedi milyar parametreli bir model için "en iyi ayarı veren formül" diye bir şey yok; geriye adım adım iyileştirme kalıyor. Üç evimiz de o adımları elle izleyebileceğimiz kadar küçük bir laboratuvar.

Son bir dürüstlük notu: karesini almak doğa yasası değil, bir seçim. Kare, büyük hataları orantısız cezalandırır — 10 birimlik hata, 1 birimlik hatanın 100 katına mal olur — bu yüzden aykırı örneklere karşı hassastır. Simon Prince'in ücretsiz ders kitabı seçimi ilkesel biçimde türetir: ortalama karesel hata, ölçüm gürültüsünün normal dağıldığını varsaydığında ortaya çıkan kayıptır — Gauss'un 1809'daki gerekçesinin modern hâli. Farklı varsayımlar farklı kayıplar doğurur; hangi kaybı seçtiğin tarafsız bir teknik ayrıntı değil, modelin neyi önemseyeceğine dair bir karardır.

## Sisli vadide yokuş aşağı

Elimizde artık bir manzara var: her w değerine bir kayıp değeri karşılık geliyor, hepsi birlikte çanak biçimli bir eğri çiziyor. En dip noktayı bulmak istiyoruz. Ama modelin o eğrinin tamamını görme imkânı yok; yalnızca bulunduğu tek bir noktayı biliyor.

**Gradyan inişi** (gradient descent) bu kısıt altında çalışan bir yöntemdir ve tarifi tek cümledir: bulunduğun noktada eğimi ölç, eğimin ters yönüne küçük bir adım at, tekrarla. Şekil 1'deki döngü bu makalenin bütün mekanizmasını taşıyor; bölümler ilerledikçe kutularının içini dolduracağız.

![Öğrenme döngüsü: veri modele girer, model tahmin üretir, kayıp tahminle gerçeği karşılaştırır, güncelleme parametreleri gradyan inişiyle değiştirir ve döngü modele geri döner](assets/ogrenme-dongusu.svg "Şekil 1 — Öğrenme döngüsü")

Sezgi için Stanford'un CS231n ders notlarındaki benzetme yardımcı olur: gözü bağlı bir yürüyüşçü gibisin, engebeli bir arazide vadinin dibine inmeye çalışıyorsun. Manzarayı göremiyorsun ama ayağının altındaki eğimi hissedebiliyorsun; eğimin aşağı gösterdiği yöne bir adım at, sonra tekrar yokla. Benzetmenin bozulduğu yer şurası: gerçek bir yürüyüşçü siste bile birkaç metre görür, geldiği yolu hatırlar, küçük bir tümseğin üstünden atlayabilir; algoritmanın ise ne haritası ne hafızası vardır, yalnızca durduğu tek noktadaki eğimi bilir. Benzetmenin biçimsel karşılığı ise nettir: "ayağın altındaki eğim", kaybın o andaki w'deki türevidir — w'yi bir birim oynatırsan kaybın ne kadar değişeceğini söyleyen tek bir sayı.

Bizim kaybımız için o sayı şudur: dL/dw = (2/3) × (14w − 31). w = 0'da bu **−20,667** eder. İşareti negatif; yani w'yi artırırsan kayıp azalır; öyleyse sağa git. Ne kadar gidelim? Adımın uzunluğunu belirleyen çarpana **öğrenme oranı** (learning rate) diyoruz ve α ile gösteriyoruz. Güncelleme kuralı önce sözle: yeni w, eski w eksi öğrenme oranı çarpı eğim. Sembolle: w ← w − α × (dL/dw).

α = 0,05 seçelim ve w = 0'dan başlayalım. İlk adım: 0 − 0,05 × (−20,667) = 1,033. Devamı şöyle gidiyor:

| adım | w | kayıp | eğim |
|---|---|---|---|
| 0 | 0,000 | 23,000 | −20,667 |
| 1 | 1,033 | 6,627 | −11,022 |
| 2 | 1,584 | 1,970 | −5,879 |
| 3 | 1,878 | 0,646 | −3,135 |
| 4 | 2,035 | 0,269 | −1,672 |
| 12 | 2,213 | 0,119 | −0,011 |

Bu tabloda görülecek üç şey var ve üçü de gradyan inişinin karakterini anlatır. Birincisi, kayıp başta hızla düşüyor (23 → 6,6 → 2,0 → 0,65), sonra sürünüyor. İkincisi ve daha ilginci, eğim kendiliğinden küçülüyor: −20,667'den −0,011'e. Kimse algoritmaya "dibe yaklaşınca yavaşla" demedi; dibe yaklaştıkça eğim zaten sıfıra yaklaştığı için adımlar da kısalıyor. Algoritmanın freni kendi içinde. Üçüncüsü, on iki adım sonra 2,213'teyiz — 2,2143'e yaklaşıyoruz ama tam olarak varmıyoruz. Gradyan inişi asimptotiktir; hedefe sonsuzda ulaşır, pratikte "yeterince yakın" bir yerde durursun. Şekil 2 bu inişi eğrinin üstünde gösteriyor.

![Çanak biçimli kayıp eğrisi üzerinde gradyan inişi adımları: başlangıçta büyük olan adımlar dibe yaklaştıkça kısalır ve eğrinin en alt noktasındaki en iyi w değerine yakınsar](assets/kayip-inisi.svg "Şekil 2 — Kayıp eğrisinde iniş")

Bu desen bize özgü değil: Google'ın ücretsiz makine öğrenmesi kursu, yedi örneklik bir yakıt verimliliği verisinde aynı yöntemi gösterir ve kayıp orada da 303,71'den birkaç adımda 68,70'e iner. Yöntemin kendisi çok daha eski; adım yönü ile adım boyunu ayıran bu iki parçalı iskeleti 1847'de Augustin-Louis Cauchy, Comptes Rendus'te yayımladığı bir yazıda kurmuştu. Bugün büyük modelleri eğiten optimizasyon yöntemleri onun iskeletinin süslenmiş hâlleridir.

Bir uyarı: bizim kaybımız düzgün bir çanak, dolayısıyla eğimin sıfırlandığı tek nokta aynı zamanda mutlak en iyi noktadır. Sinir ağlarında kayıp yüzeyi böyle değil; girintili çıkıntılı, çok sayıda dibi olan bir arazi. Orada gradyan inişi *bir* iyi çözüm bulur, *en iyi* çözümü değil. Çanaktan bütün alana genelleme yapma.

## Öğrenme oranının tavanı

Öğrenme oranını kim seçiyor? Biz seçiyoruz — ve bu seçim, alanın en çok "kara büyü" muamelesi gören ayarlarından biridir. CS231n notları adım boyunu "en önemli ve en baş ağrıtan ayarlardan biri" diye tanımlar. Küçük seçersen model doğru yöne gider ama sabaha kadar yürür. Büyük seçersen ne olur?

Aynı üç evle, aynı başlangıçtan, yalnızca α'yı 0,25 yapalım. Kayıp 23'ten başlıyor ve şöyle gidiyor: 40,8, sonra 72,4, dördüncü adımda 228,7, sekizinci adımda 2.283,1, on ikinci adımda **22.803,7**. Model hedefin üstünden atlıyor, karşı yamaca daha yükseğe düşüyor, oradan daha sert atlıyor ve patlıyor. Gerçek bir eğitim kaydında "kayıp NaN oldu" satırını gördüğünde olan şey tam olarak budur.

> **Kendini yokla:** α = 0,05 ile kayıp düzenli biçimde azalıyordu; α = 0,25 ile büyüyor. Adımın yönü her iki durumda da aynı hesaptan geliyor — o hâlde bozulan tam olarak nedir?

Yön değil, uzunluk. Her adım seni hedefe doğru götürür ama ne kadar götürdüğünü α belirler; α fazla büyükse hedefi geçip öte tarafa, üstelik başladığından daha uzağa düşersin. Bu üç ev örneğinde bunu tam olarak hesaplayabiliriz. Güncelleme kuralını açarsak w ← w × (1 − α × 28/3) + α × 62/3 elde ederiz; yani her adım, w'nin hedefe olan uzaklığını sabit bir çarpanla — (1 − α × 9,333) ile — çarpar. Uzaklığın küçülmesi için bu çarpanın mutlak değerinin 1'den küçük olması gerekir. Buradan eşik doğrudan çıkar: eğitim ancak **α < 3/14 ≈ 0,214** iken yakınsar.

| öğrenme oranı α | uzaklık çarpanı | sonuç |
|---|---|---|
| 0,05 | 0,533 | düzgün yakınsar |
| 0,10 | 0,067 | çok hızlı yakınsar |
| 0,20 | −0,867 | yakınsar ama salınarak |
| 0,2143 | −1,000 | kıl payı ıraksar |
| 0,25 | −1,333 | patlar |

Sayısal deney teoriyi ondalık basamağına kadar doğruluyor. Buradan çıkan ders, serinin ilerideki bütün eğitim tartışmaları için geçerli: hiperparametre ayarı sihir değil, aritmetik. Burada iki tür sayıyı ayırmakta fayda var, çünkü ikisi kolayca karışır. **Parametre**, veriden öğrenilen sayıdır — bizim w'miz. **Hiperparametre** (hyperparameter), öğrenmenin kendisini ayarlayan ve veriden öğrenilmeyen sayıdır — bizim α'mız. Modeli eğitirken w'yi algoritma seçer, α'yı sen seçersin.

Dikkat çekici olan, eşiğin verinin kendisine bağlı olması: 3/14'teki 14, ev büyüklüklerinin kareleri toplamıydı. Girdilerin ölçeği değişirse eşik de değişir; aynı öğrenme oranının her problemde çalışmamasının ve pratikte girdilerin benzer ölçeklere getirilmesinin sebebi budur. Gerçek modellerde bu tavanı kapalı formülle hesaplamak mümkün olmadığı için insanlar deneyerek arar — ama aradıkları şey keyfî bir sayı değil, var olan bir sınırdır.

## Üç örnek değil üç milyar

Şimdiye kadar her adımda üç evin üçüne birden baktık. Üç için sorun yok. Peki eğitim verisi üç milyar örnekse? Tek bir adım atmak için üç milyar tahmin yapıp üç milyar hata hesaplamak gerekir — ve bu, tek bir adım.

Çözüm şaşırtıcı derecede basit: her adımda verinin tamamı yerine rastgele seçilmiş küçük bir parçasına bak. Bir tek örnek bile olabilir; pratikte genellikle birkaç yüz örneklik "mini yığınlar" kullanılır. Böyle hesaplanan eğim, gerçek eğimin gürültülü ama sistematik olarak sapmayan bir tahminidir. Yönteme **stokastik gradyan inişi** (stochastic gradient descent, SGD) denir.

Kazanç, kendi minik örneğimizde bile görünüyor. Aynı verilerle, aynı α = 0,05 ile, her adımda tek bir eve bakarak ilerlersek üç güncelleme sonunda kayıp 0,121 oluyor; oysa üç evin üçüne birden bakan sürüm aynı üç adımda ancak 0,646'ya inebilmişti — üstelik üç kat daha fazla hesap yaparak. Bedeli de görünüyor: tek örneğe bakan sürüm bir yere oturmuyor, 2,17 ile 2,32 arasında sonsuza kadar zıplıyor. Her ev onu kendi yönüne çekiyor.

Bu ikilemin çözümü, makine öğrenmesinden çok önce, saf istatistikte bulundu. Herbert Robbins ve Sutton Monro'nun 1951 tarihli çalışması sinir ağlarıyla ilgili değildi; rastgele hatayla *ölçülebilen* bir fonksiyonun kökünü ardışık deneylerle bulma problemini çözüyordu. Kanıtladıkları koşul şuydu: adım boyları zamanla küçülmeli, ama toplamları sonlu kalacak kadar hızlı değil — resmî hâliyle adımların toplamı sonsuz, karelerinin toplamı sonlu olmalı. αₖ = 0,15/k gibi azalan bir program bunu sağlar; üç evimizde denediğimizde zıplayan SGD 2,21443'e oturuyor, kesin cevap ise 2,21429. Bugün her ciddi eğitim koşusunda bir "öğrenme oranı programı" bulunmasının teorik gerekçesi 1951 tarihli bu makaledir. Büyük modellerin eğitimi de milyarlarca örneği parça parça görerek, bu izinle mümkün oluyor.

## Döngünün tamamı

Şekil 1'e dönelim; artık bütün kutuların içi dolu. Veri modele girer. Model mevcut parametreleriyle bir tahmin üretir. Kayıp fonksiyonu, tahminle gerçeği karşılaştırıp yanlışlığı tek bir sayıya indirger. Güncelleme adımı, her parametrenin bu sayıyı ne yönde etkilediğini hesaplar ve parametreleri kaybı azaltacak yönde küçük bir miktar oynatır. Sonra baştan.

Bu döngü, bu serinin geri kalanında karşına çıkacak her modelin eğitiminin iskeletidir. Değişen şey kutuların içeriği olacak: veri üç ev yerine trilyonlarca kelime parçası, model tek bir çarpma yerine katmanlar hâlinde yüz milyarlarca sayı, kayıp ise ev fiyatı hatası yerine "bir sonraki kelimeyi ne kadar iyi tahmin ettin" ölçüsü. Döngünün şekli değişmeyecek.

## Ezberleyen öğrenci

Buraya kadar tek bir amacımız vardı: kaybı küçültmek. Ama kaybı hangi veriler üzerinde küçültüyoruz? Elimizdekiler üzerinde. Oysa modelin asıl işi, henüz görmediği evlerin fiyatını kestirmek. Bu ikisi aynı şey değil ve aradaki fark, alanın en pahalı derslerinden biri.

1\. makalede eski sınav sorularıyla çalışan öğrenciyi kurmuş, adını koymayı buraya bırakmıştık. Benzetmenin öteki ucu şu: geçen yılın sınav kâğıdını cevaplarıyla birlikte ezberleyen öğrenci, geçen yılın sınavında tam not alır, bu yılkinde çakar. Benzetmenin bozulduğu yer şurası: öğrencinin niyeti, tembelliği, paniği vardır; modelin hiçbiri yoktur — buradaki "ezber", yalnızca parametrelerin tam da eldeki örnekleri yeniden üretecek biçimde seçilmesi demektir. Biçimsel karşılığı ise ölçülebilir bir imzadır: eğitim verisindeki hata düşerken, görülmemiş veri üzerindeki hatanın yükselmesi. Bu yüzden veriyi baştan ikiye ayırırız: **eğitim kümesi** üzerinde öğreniriz, ayırdığımız **test kümesi** üzerinde dürüst bir ölçüm alırız. Bu ayrımın işe yaraması tek bir disipline bağlıdır — test kümesine bakıp modelde değişiklik yaparsan, o küme artık test kümesi değildir; geliştirme sırasında tekrar tekrar bakılan küme ayrı tutulur ve doğrulama kümesi diye anılır. Hastie, Tibshirani ve Friedman'ın istatistiksel öğrenme klasiği bu üçlü ayrımı yöntemin temeli sayar.

Olayı sayılarla görelim. Christopher Bishop'ın 2006 tarihli ders kitabındaki klasik gösterimi yeniden ürettik: gerçek ilişki sin(2πx) eğrisi; elimizde bu eğriden alınmış ve üstüne standart sapması 0,25 olan rastgele gürültü eklenmiş yalnızca 10 eğitim noktası var. Bu noktalara giderek daha esnek eğriler uyduruyoruz — polinomun derecesi arttıkça eğri daha çok kıvrılabiliyor; derece 1 düz bir doğru, derece 9 ise on parametresiyle on noktanın tam üstünden geçebilen bir eğri. Hatayı, ortalama karesel hatanın karekökü olarak ölçüyoruz (böylece hata fiyat ya da yükseklik gibi orijinal birimlerde okunuyor) ve aynı ölçümü 100 taze test noktası üzerinde tekrarlıyoruz:

| polinom derecesi | parametre sayısı | eğitim hatası | test hatası |
|---|---|---|---|
| 0 | 1 | 0,5920 | 0,7400 |
| 1 | 2 | 0,4709 | 0,5563 |
| 3 | 4 | 0,1146 | **0,2754** |
| 6 | 7 | 0,0718 | 0,2773 |
| 9 | 10 | **0,0000** | 0,3462 |

> **Kendini yokla:** Dokuzuncu derece polinomun eğitim hatası tam 0,0000. Bu neden iyi haber değil?

Çünkü aynı satırda test hatası 0,3462: üçüncü dereceninkinden, yani 0,2754'ten belirgin biçimde kötü. Daha çok parametre, daha düşük eğitim hatası ve daha kötü gerçek performans. On parametreli bir eğri, on noktanın tam üstünden geçmeyi her zaman başarabilir; başardığı şey ilişkiyi bulmak değil, gürültüyü de dahil ederek noktaların tam konumunu kopyalamaktır. Eğitim hatasının sıfırlanması, modelin iyi olduğunun değil, yeterince esnek olduğunun kanıtıdır. Buna **aşırı öğrenme** (overfitting) diyoruz. Şekil 3'teki iki eğri bütün hikâyeyi taşıyor: model karmaşıklığı arttıkça eğitim hatası aralıksız düşer, test hatası ise önce düşüp sonra yükselir — arada bir yerde en iyi denge vardır.

![Model karmaşıklığı arttıkça eğitim hatası sürekli düşerken test hatasının önce düşüp sonra yükselmesi; ikisinin ayrıştığı bölge aşırı öğrenmedir](assets/asiri-ogrenme.svg "Şekil 3 — Eğitim hatası, test hatası ve aşırı öğrenme")

Aşırı öğrenmenin ikinci ve daha az bilinen imzası parametrelerin kendisinde görünür. Dokuzuncu derece uyumdaki katsayılara baktığımızda 28,71, −393,99, 2.684,59, −9.412,70 ve **16.886,14** gibi sayılar buluyoruz. Model, on noktadan tam geçmeyi devasa katsayıları birbirine karşı şiddetle sadeleştirerek başarıyor. Aşırı öğrenme yalnızca "ezberlemek" değil, aynı zamanda çarpıtmaktır. Bu şişmeyi frenlemenin bir yolu var: katsayıların büyüklüğüne kaybın içinde küçük bir ceza eklemek. Aynı deneyde 10⁻⁶ gibi minik bir ceza, en büyük katsayıyı 16.886'dan 32'ye indiriyor ve test hatasını 0,2778'e, yani neredeyse mümkün olan en iyi değere geri getiriyor — üstelik tek bir parametre silmeden. Bu fikrin adı düzenlileştirme (regularization); serinin ilerleyen makalelerinde geri geleceğiz.

Şimdi tablonun en sessiz satırına dikkat et. En iyi test hatası 0,2754 idi. Veriye eklediğimiz gürültünün standart sapması 0,25'ti. Yani en iyi model, gürültü tabanının hemen üstünde durdu — çünkü aşağısı yok. Verinin içinde olmayan bilgiyi hiçbir model çıkaramaz; adil bir paranın hangi yüze geleceğini kusursuz bir model de ancak yarı yarıya bilir. Buna **indirgenemez hata** denir ve biçimsel karşılığı basittir: verideki gürültünün düzeyi, test hatasının altına inemeyeceği tabandır. Bu tabana yaklaşmak başarısızlık değil, başarıdır. Kalan hatayı ayrıştıran klasik çerçeveyi sinir ağları literatürüne Stuart Geman, Elie Bienenstock ve René Doursat'ın 1992 tarihli incelemesi yerleştirdi: karesel kayıpta test hatası tam olarak üçe ayrılır — modelin fazla katı olmasından gelen yanlılık, fazla esnek olup gürültüyü kovalamasından gelen değişkenlik ve indirgenemez gürültü. Öğretici tarafı şu: aynı makale, bu ikilem yüzünden sinir ağlarının zor problemler için gerçekçi olmayan miktarda veri isteyeceği sonucuna varmıştı. Çözümlemesi bugün hâlâ standart; tahmini yanlış çıktı.

### İleri okuma notu: çift iniş

Yukarıdaki U biçimli tablo klasik modeller için sağlam bir kuraldır, ama çok büyük ölçekte manzara daha incelikli. Mikhail Belkin, Daniel Hsu, Siyuan Ma ve Soumik Mandal'ın 2019'daki çalışması, model kapasitesini eğitim verisini tam olarak ezberleyeceği noktanın da ötesine taşırsan test hatasının yeniden düşmeye başlayabildiğini gösterdi; ders kitabındaki U, daha büyük bir eğrinin sol yarısı çıktı ve bu desene "çift iniş" (double descent) adı verildi. Buna karşılık Alicia Curth, Alan Jeffares ve Mihaela van der Schaar'ın 2023'teki çalışması, klasik yöntemlerde gözlenen çift inişin büyük ölçüde yatay eksende neyin sayıldığına bağlı bir görüntü olduğunu savunuyor. Yani ortada kapanmış bir tartışma değil, sürmekte olan bir bilimsel anlaşmazlık var — ve bu, okuduğun her "kural"ın ne kadar sağlam olduğunu sorma alışkanlığı için iyi bir örnek. Ölçeğin bu davranışına 9. makalede, ölçek yasalarını konuşurken döneceğiz.

## Milyonlarca düğmeye ölçeklemek

Son bir eksik kaldı. Bizim modelimizde tek bir parametre vardı ve onun kaybı nasıl etkilediğini elle hesapladık. Milyonlarca parametreli bir modelde her parametre için bu hesabı ayrı ayrı yapmak imkânsızdır. Neyse ki gerekmiyor: bütün parametrelerin kayba duyarlılığını, kabaca tek bir tahmin hesabının maliyetiyle birlikte veren bir yöntem var. Adı **geriye yayılım** (backpropagation).

Sık yapılan bir karışıklığı burada temizleyelim: geriye yayılım, gradyan inişinin alternatifi değildir. Geriye yayılım eğimi *hesaplar*, gradyan inişi o eğimi *kullanır*; ikisi farklı işler yapar ve ikisi de gereklidir. David Rumelhart, Geoffrey Hinton ve Ronald Williams'ın 1986'da Nature'da yayımladığı makale bu yöntemi üne kavuşturdu ve asıl önemlisi, böyle eğitilen ara katmanların kimse söylemeden işe yarar iç özellikler öğrendiğini gösterdi. Mekanizmanın nasıl çalıştığı ve kime ait olduğu tartışması bir sonraki makalenin konusu.

### Sırada ne var

Elimizde çalışan bir öğrenme makinesi var, ama modelimiz hâlâ tek bir doğru. Gerçek ilişkiler kıvrılır: metrekare ile fiyat arasındaki bağ bir yerde doyuma ulaşır, piksellerle "bu bir kedi" yargısı arasındaki bağın ise düz bir çizgiyle uzaktan yakından ilgisi yoktur. Bir sonraki makalenin sorusu şu: doğruya kıyasla çok daha güçlü, katman katman bükülebilen bir fonksiyonu nasıl kurarız — ve onu yine bu makaledeki döngüyle nasıl eğitmeyi sürdürürüz? O ağın milyonlarca ağırlığına hangi payın düştüğünü hesaplayan mekanizmayı, yani adını burada koyduğumuz geriye yayılımı da orada açacağız.

## Kaynakça

- Stigler, S. M. (1981). *Gauss and the Invention of Least Squares*. The Annals of Statistics. [Bağlantı](https://projecteuclid.org/journals/annals-of-statistics/volume-9/issue-3/Gauss-and-the-Invention-of-Least-Squares/10.1214/aos/1176345451.full)
- Prince, S. J. D. (2023). *Understanding Deep Learning*. MIT Press (ücretsiz PDF). [Bağlantı](https://udlbook.github.io/udlbook/)
- Stanford CS231n. *Optimization: Stochastic Gradient Descent*. Ders notları (hakemli değil). [Bağlantı](https://cs231n.github.io/optimization-1/)
- Google. *Machine Learning Crash Course — Linear regression: Gradient descent*. Kurumsal ders (hakemli değil). [Bağlantı](https://developers.google.com/machine-learning/crash-course/linear-regression/gradient-descent)
- Cauchy, A.-L. (1847). *Méthode générale pour la résolution des systèmes d'équations simultanées*. Comptes Rendus de l'Académie des Sciences, cilt 25. [Bağlantı](https://gallica.bnf.fr/ark:/12148/bpt6k2982c)
- Robbins, H. & Monro, S. (1951). *A Stochastic Approximation Method*. The Annals of Mathematical Statistics. [Bağlantı](https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-22/issue-3/A-Stochastic-Approximation-Method/10.1214/aoms/1177729586.full)
- Hastie, T., Tibshirani, R. & Friedman, J. (2009). *The Elements of Statistical Learning* (2. baskı). Springer (ücretsiz PDF). [Bağlantı](https://hastie.su.domains/ElemStatLearn/)
- Bishop, C. M. (2006). *Pattern Recognition and Machine Learning*. Springer (ücretsiz resmî PDF). [Bağlantı](https://www.microsoft.com/en-us/research/wp-content/uploads/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf)
- Geman, S., Bienenstock, E. & Doursat, R. (1992). *Neural Networks and the Bias/Variance Dilemma*. Neural Computation. [Bağlantı](https://direct.mit.edu/neco/article/4/1/1/5624/Neural-Networks-and-the-Bias-Variance-Dilemma)
- Belkin, M., Hsu, D., Ma, S. & Mandal, S. (2019). *Reconciling Modern Machine-Learning Practice and the Classical Bias–Variance Trade-off*. PNAS. [Bağlantı](https://www.pnas.org/doi/10.1073/pnas.1903070116)
- Curth, A., Jeffares, A. & van der Schaar, M. (2023). *A U-turn on Double Descent: Rethinking Parameter Counting in Statistical Learning*. NeurIPS. [Bağlantı](https://arxiv.org/abs/2310.18988)
- Rumelhart, D. E., Hinton, G. E. & Williams, R. J. (1986). *Learning Representations by Back-Propagating Errors*. Nature. [Bağlantı](https://www.nature.com/articles/323533a0)
