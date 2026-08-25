---
article_id: article_e97ef8ba-1ea2-4ffd-9c0d-53c0df68ba95
title: "Sinir Ağları: Katmanların İçinde Ne Oluyor?"
slug: sinir-aglari-katmanlarin-icinde-ne-oluyor
category: foundations
level: beginner
reading_order: 3
summary: "Nörondan katmana, aktivasyonun neden zorunlu olduğundan geriye yayılıma: katmanlı ağların girdiyi nasıl yeni temsillere çevirdiğini ve seksen yıllık iniş çıkışları anlatır."
tags:
  - sinir-aglari
  - aktivasyon
  - geriye-yayilim
  - temsil-ogrenimi
  - derin-ogrenme
content_hash: sha256:6c5587d892287d16a97b2f6121ec622518c1e4bd0b35a853ee8dd8017b9cfe98
classification_version: 1
classification_batch: 0
---
## Doğrunun duvarı

2\. makalede öğrenmeyi üç kavramla makineleştirmiştik; kısaca yeniden kuralım. Model, parametreleri ayarlanabilen bir fonksiyondur; kayıp fonksiyonu, tahminlerle gerçek değerler arasındaki farkı tek bir sayıya indirger; gradyan inişi de her parametreyi kaybı azaltacak yönde küçük adımlarla günceller. O makaledeki model gösterişsizdi: tek bir doğru. Ama metrekareyi fiyata bağlayan o mütevazı doğru bile, veriden öğrenmenin bütün mekanizmasını taşıyordu.

Doğrunun huyu ise bellidir: eğimi her yerde aynıdır. Gerçek dünyadaki ilişkilerse kıvrılır. Ev örneğinde kalalım: 50 metrekareden 100 metrekareye çıkmak fiyatı ciddi biçimde artırır; 400 metrekareden 450'ye çıkmak aynı etkiyi yapmaz. İlişki bir yerde doyuma ulaşır, bükülür. Tek doğrunun bu kıvrımı yakalama şansı yoktur: hangi eğimi seçersek seçelim ya küçük evlerde ya büyük evlerde sistematik hata yaparız. Görüntü, ses ve dil gibi verilerde durum çok daha ağırdır; piksellerle "bu bir kedi" yargısı arasındaki ilişki, akla gelebilecek en kıvrımlı ilişkilerden biridir.

Bu makalenin sorusu şu: doğrudan çok daha güçlü bir fonksiyonu nasıl inşa ederiz — ve onu yine 2. makaledeki döngüyle, yani kayıp ve gradyan inişiyle nasıl eğitmeyi sürdürürüz? Cevap, yapay zekânın seksen yıllık fikri: sinir ağı (neural network).

## Tek nöronun anatomisi

Sinir ağının yapı taşı, gösterişli adına rağmen küçük bir hesap birimidir: nöron (neuron). Bir nöron üç şey yapar. Girdilerinin her birini kendi ağırlığıyla çarpar; çarpımları toplar ve üstüne sapma (bias) denen sabit bir sayı ekler; son olarak bu toplamı aktivasyon (activation) denen bir fonksiyondan geçirir. Şekil 1'deki akış bundan ibarettir: girdiler, ağırlıklar, toplam, aktivasyon, çıktı.

![Bir yapay nöronun bileşenleri: girdiler ağırlıklarla çarpılıp toplanır, sapma eklenir ve sonuç aktivasyon fonksiyonundan geçerek çıktıyı üretir](assets/noron-anatomisi.svg "Şekil 1 — Tek nöronun anatomisi")

Küçük bir sayısal örnekle izleyelim. Girdiler x₁ = 2 ve x₂ = 1 olsun; ağırlıklar w₁ = 0,5 ve w₂ = −1, sapma b = 1. Toplam: 2 × 0,5 + 1 × (−1) + 1 = 1. En eski aktivasyon bir eşikti: toplam sıfırı aşarsa nöron "1" der, aşmazsa "0". Burada 1 &gt; 0 olduğundan çıktı 1. Dikkat edersen ağırlıklar ve sapma, 2. makaledeki parametrelerin ta kendisi: bir nöronu "ayarlamak", bu sayıları değiştirmek demek.

Bu fikir derin öğrenme çağının icadı değil. Nörofizyolog Warren McCulloch ile o sırada yirmili yaşlarının başındaki mantıkçı Walter Pitts, 1943 tarihli makalelerinde nöronu tam böyle bir eşik birimi olarak modelledi ve bu birimlerden kurulan ağların mantık işlemlerini hesaplayabildiğini gösterdi — "beyin" ile "hesaplama" ilk kez aynı matematiksel dilde buluştu. Kritik bir eksik vardı ama: McCulloch-Pitts nöronu öğrenmiyordu; ağırlıklar elle kuruluyordu. Öğrenen nöron için on beş yıl beklemek gerekti. Frank Rosenblatt'ın 1958'de tanıttığı perceptron eksik parçayı ekledi: çıktı yanlışsa ağırlıkları hatayı azaltacak yönde güncelleyen bir kural — bugünkü "hatadan öğrenme" fikrinin doğrudan atası. Üstelik perceptron yalnızca kâğıt üstünde bir denklem değildi: Rosenblatt'ın Mark I makinesinde ağırlıklar motorlarla çevrilen ayar düğmeleriydi (potansiyometre) ve öğrenme, kelimenin gerçek anlamıyla düğmelerin dönmesiydi. 1958'deki ilk basın gösterimi oda büyüklüğünde bir IBM 704 bilgisayarında koştu; makine, solundan işaretli kartlarla sağından işaretli kartları yaklaşık elli denemede ayırt etmeyi öğrendi ve dönemin basını, bir gün "yürüyecek, konuşacak, görecek" bir makinenin embriyosunu gördüğünü yazdı — bu erken abartının hikâyesini Cornell Chronicle'ın 2019 tarihli perceptron tarihçesi aktarır.

## Aktivasyon: üst üste doğrular yine doğrudur

Şimdi işin kalbindeki soruya gelelim: nöronun sonundaki o aktivasyon fonksiyonu neden var? Onsuz olmaz mıydı?

Olmazdı — ve nedenini iki doğruyla kendimiz görebiliriz. Aktivasyonu atalım ve "doğrusal nöronları" üst üste bağlayalım. İlk katmanda iki nöron olsun: y₁ = 2x + 1 ve y₂ = 3x − 2. İkinci katmandaki nöron bunları tartıp toplasın: z = 4y₁ − y₂ + 5. Yerine koyunca: z = 4(2x + 1) − (3x − 2) + 5 = 8x + 4 − 3x + 2 + 5 = 5x + 11. İki katman, dört ağırlık, üç sapma — ve sonuç yine tek bir doğru. Bu bir tesadüf değil, cebirsel bir zorunluluk: doğrusal (linear) fonksiyonların bileşimi yine doğrusaldır.

> **Kendini yokla:** Aktivasyonsuz yüz katmanlı, milyonlarca parametreli dev bir ağ kursak, bu ağ en fazla hangi modele denk gelir?

Az önceki hesabın büyütülmüş hâline: tek bir doğrusal modele. Katman sayısı ne olursa olsun, aktivasyon yoksa bütün o katmanlar cebirde tek bir doğruya (çok girdili hâliyle tek bir düzleme) sadeleşir. Derinlik ancak araya doğrusal olmayan bir şey girince anlam kazanır. Aktivasyonun görevi tam olarak budur: her nöronun çıkışını hafifçe bükerek doğrusallığı kırmak.

Peki hangi bükme? Tarihsel cevap sigmoid'di: her girdiyi 0 ile 1 arasına yumuşakça sıkıştıran S biçimli bir eğri. "Yumuşakça" sözcüğü süs değil, mekanizmanın kendisi. 2. makaleden hatırla: gradyan inişi, "bu parametreyi birazcık oynatırsam kayıp ne kadar değişir?" sorusuyla yol alır. McCulloch-Pitts tarzı sert eşik bu soruya cevap veremez: eşiğin uzağındaki küçük dokunuşlar hiçbir şeyi değiştirmez, eşiğin üstündeki tek bir dokunuş her şeyi değiştirir — açık/kapalı bir anahtar gibi. Sigmoid ise bir dimmer düğmesi gibidir: her küçük dokunuşun küçük ve ölçülebilir bir etkisi vardır; gradyan da tam bu etkiyi ölçer. Bu anahtar-dimmer sezgisi, Michael Nielsen'in ücretsiz çevrimiçi kitabındaki sigmoid gerekçesinin uyarlamasıdır; benzetmenin bozulduğu yer şurası: dimmerin işi ışığı kısmaktır, sigmoid'in asıl işi ise doğrusallığı kırmaktır — yumuşaklık, öğrenmeyi mümkün kılan ikinci özelliktir, amacın kendisi değil.

Sigmoid'in bedeli sonradan çıktı. Eğrinin iki ucu neredeyse yataydır: girdisi çok büyük ya da çok küçük olan bir nöron bu düz bölgeye "doyar" ve orada gradyan sıfıra yaklaşır. Katmanlar derinleştikçe bu küçücük gradyanlar çarpıla çarpıla söner; giriş katmanlarına neredeyse hiç öğrenme sinyali ulaşmaz. Bu sorunun teşhisi 1990'lara uzanır: Yoshua Bengio, Patrice Simard ve Paolo Frasconi'nin 1994 tarihli makalesi, derin ve tekrarlı ağların eğitiminin neden bu kadar zor olduğunu gradyanların sönmesi ve patlamasıyla açıkladı. Xavier Glorot ile Bengio'nun 2010'daki deneysel çalışması da sigmoid'in, rastgele başlatılan derin ağlar için neden elverişsiz olduğunu katman katman ölçerek gösterdi.

Modern cevap neredeyse utandıracak kadar basit: ReLU (rectified linear unit). Tanımı tek satır: girdi negatifse çıktı 0, değilse girdinin kendisi. Vinod Nair ve Geoffrey Hinton 2010'da ReLU'nun bir model ailesinde eğitimi somut biçimde iyileştirdiğini gösterdi; Xavier Glorot, Antoine Bordes ve Yoshua Bengio'nun 2011 çalışması ise derin ağlarda ReLU'nun sigmoid ailesine denk ya da ondan iyi çalıştığını ortaya koydu. İşin dürüst tarafı şu: ReLU sıfır noktasında türevsizdir, negatif tarafı dümdüz kesiktir ve kâğıt üstünde pek "iyi huylu" görünmez; onu öne çıkaran teori değil, deney oldu. Bugün de tek bir "en iyi aktivasyon" yok — modern modellerde ReLU'nun yumuşatılmış akrabaları da kullanılıyor — ama öğrenmeye ReLU'dan başlamak doğru varsayılan seçimdir.

## Katmanlar: girdiyi yeniden tarif etmek

Tek nöron tek karar verir. Güç, nöronları katman (layer) hâlinde yan yana dizip katmanları üst üste bindirince ortaya çıkar: bir katmandaki her nöron aynı girdiye bakar ve kendi ağırlıklarıyla kendi çıktısını üretir; bu çıktılar demeti, bir sonraki katmanın girdisi olur. Böyle ağlara derin ağ diyoruz — "derin" sözcüğü, katman sayısından başka bir şeye işaret etmez.

Asıl önemli soru, katmanların ne işe yaradığı. Cevabı tek kavramda toplayacağız ve bu kavram serinin sonuna kadar peşimizden gelecek: temsil (representation). Bir katman, girdisini olduğu gibi taşımaz; onu yeni bir dile çevirir — ham sayıların yerine, görev için daha kullanışlı özelliklerin dilini koyar. Her katmanın çıktısı, girdinin yeni bir temsilidir.

Görüntüden örnek verelim, çünkü bu alanda katmanların içine gerçekten bakılabildi. Matthew Zeiler ve Rob Fergus'un 2014'te yayımlanan görselleştirme çalışması, görüntü ağlarında katmanların neye tepki verdiğini ilk kez herkesin görebileceği biçimde ortaya koydu: ilk katman kenarlara ve renk lekelerine, sonraki katman dokulara ve kenar birleşimlerine, daha üst katmanlar nesne parçalarına ve nesnelerin kendilerine tepki veriyordu. Piksel dilinden kenar diline, kenar dilinden şekil diline, şekil dilinden "kedi" diline — Şekil 2'deki merdiven tam bu dönüşümü gösteriyor.

![Katmanlar boyunca temsil dönüşümü: piksellerden kenarlara, kenarlardan basit şekillere, şekillerden kedi kavramına uzanan dört aşamalı akış](assets/temsil-katmanlari.svg "Şekil 2 — Katmanlar boyunca temsil dönüşümü")

Bu gözlem, derin öğrenmenin kalbindeki iddiayı somutlaştırır: özellikleri elle tasarlamak yerine, ağın kendisi onları kademe kademe öğrenir. Yoshua Bengio, Aaron Courville ve Pascal Vincent'in 2013 tarihli derlemesi bu bakışın manifestosu sayılır: bir modelin başarısı büyük ölçüde verinin temsiline bağlıdır ve derin ağların vaadi, iyi temsilleri veriden kendiliğinden çıkarmaktır. Buna temsil öğrenimi (representation learning) denir; terimi aklında tut, çünkü 4. makalede kelimeler için aynı fikri "embedding" adıyla göreceğiz.

İki dürüstlük notu gerekiyor. Birincisi: kenar→şekil→nesne merdiveni, büyük görüntü ağlarında gözlenmiş sağlam bir bulgudur ama bir doğa yasası değildir; her ağda ve her görevde aynı tertiplikte tekrarlanacağının garantisi yok. İkincisi: "her nöron tek bir kavramı tanır" diye düşünme. Temsil dağıtıktır: bir kavram çok sayıda nörona yayılır ve tek bir nöron, birbiriyle ilgisiz birçok şeye tepki verebilir. Chris Olah ve arkadaşlarının 2020'de Distill'de yayımladığı inceleme — editörlü bir web dergisi; klasik hakemli dergi düzeni değil — bunun ünlü bir örneğini verir: bir görüntü ağındaki tek bir nöron hem kedi yüzlerine, hem araba önlerine, hem de kedi bacaklarına tepki veriyordu. Modelin içini okuma çabasının bugün geldiği noktaya, serinin yorumlanabilirlik makalelerinde ayrıntısıyla döneceğiz.

## XOR duvarı ve ilk kış

Şimdi zamanda geri gidelim; çünkü katman fikrinin değeri, en net biçimde onun yokluğunda görüldü.

Perceptron tek katmandı: girdilerden doğruca çıktıya. Böyle bir modelin çizebildiği tek şey, girdi uzayında düz bir sınırdır — "çizginin bu tarafı 1, öbür tarafı 0". Şu basit bilmeceye bak: iki girdi var ve kural şu — girdilerden yalnızca biri 1 ise cevap 1; ikisi de 0 ya da ikisi de 1 ise cevap 0 (mantıkta buna XOR denir). Dört olası girdiyi bir karenin köşelerine yerleştir: (0,0) ile (1,1) köşeleri "0", (0,1) ile (1,0) köşeleri "1". Kalemi al ve "1" köşelerini "0" köşelerinden ayıran tek bir düz çizgi çizmeyi dene. Çizemezsin: çapraz köşeleri tek doğruyla aynı tarafta toplamanın yolu yoktur. Marvin Minsky ve Seymour Papert, 1969 tarihli *Perceptrons* kitabında bu türden sınırları matematiksel kesinlikle kanıtladı; XOR, kanıtladıkları çok daha genel sınırların yalnızca en küçük örneğiydi.

Popüler anlatı buradan şöyle devam eder: "kitap sinir ağlarını öldürdü ve ilk yapay zekâ kışı başladı." Tarihçiler bu güçlü biçimi reddediyor. Sonuçlar kitaptan yıllar önce konferanslarda dolaşıyordu ve alan zaten boşalmıştı — asıl neden, kimsenin birden fazla katmanı eğitmeyi bilmemesiydi. Arşiv görüşmelerine dayanan bir tarih denemesinde Yuxi Liu (hakemli olmayan ama kaynakları zengin bir inceleme), alanın kurucularından Bernard Widrow'un tanıklığını aktarır: kitap çıktığında sahada zaten neredeyse kimse kalmamıştı. Kitap bir suikast değil, çoktan boşalmış bir alanın mezar taşıydı. Minsky ve Papert çok katmanlı ağları da düşünmüş, kanıt sunmadan bu yönde bir genişletmenin verimsiz kalacağını tahmin etmişlerdi: teoremleri doğruydu, tahminleri yanlış çıktı.

Peki çok katman XOR'u nasıl çözer? Araya iki nöronluk küçük bir gizli katman (hidden layer) koy: nöronlardan biri "girdilerden en az biri açık mı?" sorusuna, öbürü "ikisi birden açık mı?" sorusuna cevap versin. Şimdi dört köşeyi bu iki cevabın koordinatlarında yeniden yaz: (0,0) → (0,0); (0,1) ve (1,0) → (1,0); (1,1) → (1,1). Ayırt etmek istediğimiz "1" durumlarının ikisi de tek noktada toplandı ve artık tek bir düz çizgi yetiyor. Gizli katmanın yaptığı şeyin adını koyalım: koordinat sistemini yeniden çizdi — yani girdiye yeni bir temsil verdi. XOR'un çözümü, doğru temsili bulmaktan ibaretti. Sorun şuydu: 1969'da bu gizli katmanın ağırlıklarını veriden öğrenecek bir algoritma ortada yoktu.

## Geriye yayılım: hatayı geriye pay etmek

Zorluğun tam olarak nerede olduğunu görelim. Kayıp, ağın en sonunda, çıktı ile gerçek değer karşılaştırılınca hesaplanır. Çıktı katmanının ağırlıkları için suç ortadadır: çıktı fazla geldiyse, onu yukarı iten ağırlık aşağı oynamalıdır. Ama ortadaki bir gizli nöron? Onun çıktısını kimse "doğru cevapla" karşılaştırmıyor; o yalnızca bir ara hesap. Ağırlıklarını hangi yönde oynatacağız?

Cevabın adı geriye yayılım (backpropagation): kaybın her bir parametreye duyarlılığını, türevin zincir kuralıyla, çıkıştan girişe doğru katman katman hesaplamak. Sezgisi şu: ağdaki her işlem, yerel bir soruya cevap verebilir — "girdim birazcık oynasa çıktım ne kadar oynar?" Bu yerel duyarlılıklar, kayıptan geriye doğru yol boyunca çarpılır ve böylece her ağırlığa tek bir sayı ulaşır: "sen kaybı bu kadar etkiledin." O sayı elde olduktan sonra gerisi 2. makaleden tanıdıktır: gradyan inişi, her ağırlığı kendi payı yönünde günceller. İstersen şöyle düşün: takım maçı kaybetmiştir ve yenilginin "suçu" oyunculara geriye doğru pay edilmektedir. Benzetmenin bozulduğu yer şurası: bu pay etme adaletle, niyetle ya da tartışmayla yapılmaz; yalnızca türevle yapılır — her bağlantının aldığı pay, "çıktıyı sayısal olarak ne kadar oynattın" sorusunun cevabından ibarettir.

> **Kendini yokla:** Ağın ortasındaki bir nöron kaybı hiç "görmez"; kayıp en sonda hesaplanır. Bu nöronun ağırlıkları buna rağmen nasıl güncellenebiliyor?

Çünkü güncellenmek için kaybı görmek gerekmez; kaybın kendisine ne kadar duyarlı olduğunu bilmek yeter. Sonraki katmandan ona tek bir sayı gelir — "senin çıktın, sondaki hatayı şu kadar etkiledi" — ve bu sayı, aradaki bütün yerel duyarlılıkların çarpımıyla hesaplanmıştır. Hiçbir nöron küresel resmi bilmez; herkes yerel duyarlılığını bildirir, zincir kuralı gerisini halleder.

Bu fikrin tarihi, makalenin en öğretici düzeltmelerinden birini içerir. Geriye yayılımı üne kavuşturan çalışma, David Rumelhart, Geoffrey Hinton ve Ronald Williams'ın 1986'da Nature'da yayımlanan makalesidir; ama katkıları algoritmanın matematiğini icat etmek değildi. Ters yönde verimli türev hesabı — bugünkü adıyla ters modda otomatik türev — 1970'te Finlandiyalı yüksek lisans öğrencisi Seppo Linnainmaa'nın tezinde yayımlanmıştı ve fikrin kökleri 1960'ların kontrol teorisine kadar uzanır. Bu öncelik tarihinin en ayrıntılı derlemesini Jürgen Schmidhuber tutar; derlemenin sağlam kaynaklara dayandığını, ama Schmidhuber'in aynı zamanda bu kredi tartışmasının taraflarından biri olduğunu birlikte söylemek gerekir. 1986 makalesinin asıl gösterdiği şey ise daha önemliydi: gradyanla eğitilen gizli katmanlar, kimse onlara ne olmaları gerektiğini söylemeden, işe yarar iç temsiller öğreniyordu. Bir önceki bölümün diliyle: geriye yayılım, temsil öğreniminin motorudur. Bugün kullanılan her derin öğrenme kütüphanesi, her eğitim adımında bu algoritmayı çalıştırır.

## Her fonksiyonu öğrenebilir mi?

1980'lerin sonunda teori de yetişti. George Cybenko'nun 1989 makalesi ile Kurt Hornik, Maxwell Stinchcombe ve Halbert White'ın aynı yıl yayımlanan bağımsız kanıtı, bugün evrensel yaklaşıklık teoremi (universal approximation theorem) dediğimiz sonucu kurdu: tek gizli katmanlı bir ağ, yeterince nöronla, sınırlı bir bölge üzerindeki her sürekli fonksiyonu istenen hassasiyette yaklaşıklayabilir. Sezgi için Nielsen'in görsel kanıtından bir imge ödünç alalım: nöron çiftleriyle basamaklar, basamaklarla kuleler inşa edilebilir; bir dağ silüetini, yeterince ince dikilmiş dikdörtgen kulelerle istediğin kadar iyi taklit edebilirsin. Benzetmenin bozulduğu yer: bu resim tek girdili fonksiyonlar için çalışır; girdi boyutu arttıkça gereken kule sayısı patlar — birazdan bunun ciddi bir soruna dönüştüğünü göreceğiz.

Bu teorem, alanın en çok yanlış anlaşılan sonucu olabilir; "sinir ağları her şeyi öğrenebilir" cümlesine dört ayrı hata sıkışmıştır. Birincisi, teorem yaklaşıklıktan söz eder, tam hesaplamadan değil: hatayı istediğin kadar küçültebilirsin ama genelde sıfırlayamazsın. İkincisi, söz verilen yalnızca sürekli fonksiyonlardır; ani sıçramalar yapan ilişkiler genel olarak kapsam dışıdır. Üçüncüsü, "yeterince nöron" korkunç bir sayı olabilir: kuramsal sınırlar, d boyutlu bir girdide hassasiyet arttıkça gereken nöron sayısının 1/ε^d gibi büyüyebileceğini söyler. Chinmay Hegde'nin NYU ders notlarındaki örnekle: on boyutlu bir girdide hassasiyeti on kat artırmak, genişlik sınırını on milyar katına çıkarabilir. Dördüncüsü ve en önemlisi: bu bir varlık teoremidir. "Böyle ağırlıklar vardır" der; gradyan inişinin o ağırlıkları bulacağını da, bulunan ağın 2. makalede gördüğümüz anlamda yeni veriye genelleyeceğini de söylemez. Temsil edebilmek, öğrenebilmek demek değildir.

O hâlde derinliğin gerekçesi ne — madem tek gizli katman ilkece yetiyor? Burada teori derinliğin tarafını tutar: Ronen Eldan ve Ohad Shamir'in 2016 kanıtı, öyle fonksiyon aileleri kurar ki, üç katmanlı mütevazı bir ağın hesapladığını herhangi bir iki katmanlı ağ ancak boyutla üstel büyüyen genişlikte yaklaşıklayabilir — derinliği bir katman artırmak, üstel bir bedeli makul düzeye indirir. Dürüst dipnot: bu kanıtlar özel kurgulanmış fonksiyon aileleri içindir ve derinliğin gerçek dünya verisindeki başarısını ne ölçüde açıkladıkları hâlâ tartışmalıdır. Pratikteki gözlem ise nettir: derin ağlar, kenar→şekil→nesne türü kademeli temsilleri, geniş ama sığ ağlardan çok daha ekonomik öğrenir.

## İkinci bahar: eski fikir, yeni yakıt

1986'nın ateşlediği umut 1990'larda yeniden soğudu: sönen gradyanlar derin yığınları eğitilmez kılıyordu, etiketli veri azdı, bilgisayarlar yavaştı. Şekil 3'teki zaman şeridinin ikinci soluk bandı bu döneme denk gelir. Sonra üç şey aynı anda değişti.

![Sinir ağlarının zaman çizgisi: 1943 yapay nöron, 1958 perceptron, 1969 eleştiri, 1986 geriye yayılım, 2012 AlexNet; 1969 sonrası ilk kış ve 1990 sonrası durgunluk soluk bantlarla gösterilmiştir](assets/sinir-agi-tarihi.svg "Şekil 3 — Sinir ağlarının iniş ve çıkışları")

Birincisi veri: 2012'deki ImageNet yarışması, 1000 sınıfa ayrılmış 1,2 milyon etiketli görüntü sunuyordu — bu ölçekte etiketli veri daha önce yoktu. İkincisi donanım: grafik işlemcileri (GPU), sinir ağının bol miktardaki çarpma-toplama işini paralel yürütmeye neredeyse kusursuz uyuyordu. Üçüncüsü, bu makalede tanıştığın küçük ama kritik mühendislik seçimleriydi — başta ReLU.

2012'de Alex Krizhevsky, Ilya Sutskever ve Geoffrey Hinton'ın AlexNet adıyla anılan ağı bu üçünü birleştirdi: yaklaşık 60 milyon parametre, iki oyuncu sınıfı ekran kartı (üçer gigabaytlık GTX 580'ler) ve beş-altı günlük eğitim. Sonuç, alanın dışından kimsenin de görmezden gelemeyeceği kadar açıktı: ImageNet'te ilk beş tahmin üzerinden hata oranı yüzde 15,3'tü — ikinci olan sistemin hatası yüzde 26,2 idi. Bir puanlık iyileşmenin iyi bir yıl sayıldığı bir yarışmada yaklaşık on bir puanlık fark. Aynı makale ReLU'nun payını da sayıya döker: küçük bir karşılaştırma deneyinde, ReLU'lu ağ aynı eğitim hatası düzeyine, sigmoid'in bir akrabası olan tanh aktivasyonlu eşdeğerinden altı kat hızlı ulaşıyordu. Krizhevsky ve arkadaşları aşırı öğrenmeye karşı "dropout" adlı bir teknik de kullandı; 2. makalede kurduğumuz aşırı öğrenme kavramının bu tür frenlerine serinin ilerleyen makalelerinde ayrıca geleceğiz.

Burada durup dürüst özeti yapalım: 2012'de yeni bir öğrenme algoritması keşfedilmedi. Geriye yayılım 1970 ve 1986'nın fikriydi; nöron 1943'ün, öğrenen ağırlık 1958'in. Değişen şey koşullardı: internet ölçeğinde etiketli veri, paralel donanım, ReLU ve daha iyi başlatma teknikleri. Eski fikir, yeni yakıt. Şekil 3'ün bütün hikâyesi budur: 1943'te fikir, 1958'de öğrenme, 1969'da duvar, 1986'da motor, 2012'de patlama. Hikâye bugün de kapanmış değil: 2024 Nobel Fizik Ödülü, yapay sinir ağlarıyla makine öğrenmesini mümkün kılan temel keşifleri nedeniyle John Hopfield ile Geoffrey Hinton'a verildi. Bu seksen yıllık çizgi artık yalnızca mühendislik folkloru değil; ödül komitelerinin de temel bilim saydığı bir araştırma geleneği.

### Sırada ne var

Elimizde artık güçlü bir makine var: sayıları alıp katman katman yeni temsillere çeviren ve hatasından geriye yayılımla ders çıkaran bir ağ. Ama dikkat: bu makinenin yediği her şey sayıydı — pikseller zaten sayıdır, metrekare zaten sayıdır. Peki "kedi" kelimesi? Dil sayı değildir; bir sonraki makalenin sorusu tam da bu: kelimeleri, anlamlarını kaybetmeden sinir ağının işleyebileceği sayılara nasıl çeviririz? Cevabın iki anahtar kelimesi token ve embedding — ve embedding'in, bu makalede sabitlediğimiz "temsil" kavramının ta kendisi olduğunu göreceksin.

## Kaynakça

- McCulloch, W. S. & Pitts, W. (1943). *A Logical Calculus of the Ideas Immanent in Nervous Activity*. Bulletin of Mathematical Biophysics. [Bağlantı](https://link.springer.com/article/10.1007/BF02478259)
- Rosenblatt, F. (1958). *The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain*. Psychological Review. [Bağlantı](https://direct.mit.edu/books/edited-volume/5431/chapter/3958515/1958-F-Rosenblatt-The-perceptron-a-probabilistic)
- Cornell Chronicle (2019). *Professor's perceptron paved the way for AI — 60 years too soon*. Cornell University. [Bağlantı](https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon)
- Nielsen, M. (2015). *Neural Networks and Deep Learning*. Ücretsiz çevrimiçi kitap. [Bağlantı](http://neuralnetworksanddeeplearning.com/)
- Bengio, Y., Simard, P. & Frasconi, P. (1994). *Learning Long-Term Dependencies with Gradient Descent is Difficult*. IEEE Transactions on Neural Networks. [Bağlantı](https://pubmed.ncbi.nlm.nih.gov/18267787/)
- Glorot, X. & Bengio, Y. (2010). *Understanding the Difficulty of Training Deep Feedforward Neural Networks*. AISTATS, PMLR. [Bağlantı](https://proceedings.mlr.press/v9/glorot10a.html)
- Nair, V. & Hinton, G. E. (2010). *Rectified Linear Units Improve Restricted Boltzmann Machines*. ICML. [Bağlantı](https://icml.cc/Conferences/2010/papers/432.pdf)
- Glorot, X., Bordes, A. & Bengio, Y. (2011). *Deep Sparse Rectifier Neural Networks*. AISTATS, PMLR. [Bağlantı](https://proceedings.mlr.press/v15/glorot11a.html)
- Zeiler, M. D. & Fergus, R. (2014). *Visualizing and Understanding Convolutional Networks*. ECCV. [Bağlantı](https://cs.nyu.edu/~fergus/papers/zeilerECCV2014.pdf)
- Bengio, Y., Courville, A. & Vincent, P. (2013). *Representation Learning: A Review and New Perspectives*. IEEE TPAMI. [Bağlantı](https://dl.acm.org/doi/10.1109/tpami.2013.50)
- Olah, C., Cammarata, N., Schubert, L., Goh, G., Petrov, M. & Carter, S. (2020). *Zoom In: An Introduction to Circuits*. Distill. [Bağlantı](https://distill.pub/2020/circuits/zoom-in/)
- Minsky, M. & Papert, S. (1969). *Perceptrons: An Introduction to Computational Geometry*. MIT Press. [Bağlantı](https://openlibrary.org/search?q=Perceptrons+Minsky+Papert)
- Liu, Y. *The Perceptron Controversy*. Tarih denemesi (hakemli değil). [Bağlantı](https://yuxi.ml/essays/posts/perceptron-controversy/)
- Rumelhart, D. E., Hinton, G. E. & Williams, R. J. (1986). *Learning Representations by Back-Propagating Errors*. Nature. [Bağlantı](https://www.nature.com/articles/323533a0)
- Schmidhuber, J. *Who Invented Backpropagation?* IDSIA (araştırmacı sayfası, hakemli değil). [Bağlantı](https://people.idsia.ch/~juergen/who-invented-backpropagation.html)
- Cybenko, G. (1989). *Approximation by Superpositions of a Sigmoidal Function*. Mathematics of Control, Signals and Systems. [Bağlantı](https://link.springer.com/article/10.1007/BF02551274)
- Hornik, K., Stinchcombe, M. & White, H. (1989). *Multilayer Feedforward Networks are Universal Approximators*. Neural Networks. [Bağlantı](https://dblp.org/rec/journals/nn/HornikSW89.html)
- Hegde, C. (2022). *Foundations of Deep Learning* ders notları, "Universal approximators". NYU Tandon. [Bağlantı](https://chinmayhegde.github.io/fodl/representation02/)
- Eldan, R. & Shamir, O. (2016). *The Power of Depth for Feedforward Neural Networks*. COLT, PMLR. [Bağlantı](http://proceedings.mlr.press/v49/eldan16.pdf)
- Krizhevsky, A., Sutskever, I. & Hinton, G. E. (2012). *ImageNet Classification with Deep Convolutional Neural Networks*. NeurIPS. [Bağlantı](https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html)
- Nobel Vakfı (2024). *The Nobel Prize in Physics 2024*. NobelPrize.org. [Bağlantı](https://www.nobelprize.org/prizes/physics/2024/press-release/)
