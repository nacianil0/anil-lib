---
article_id: article_b7d892a3-a696-472a-840e-1ddf681246e0
title: "Dikkat Mekanizması: Bağlamı Tartmayı Öğrenmek"
slug: dikkat-mekanizmasi-baglami-tartmayi-ogrenmek
category: models-and-training
level: beginner
reading_order: 6
summary: "Statik embedding'in duvarını yıkan mekanizmayı kurar: sorgu, anahtar ve değer üçlüsü, softmax'la elde edilen dikkat ağırlıkları ve elle hesaplanmış bir örnekle bağlamsal temsilin doğuşu."
tags:
  - dikkat-mekanizmasi
  - sorgu-anahtar-deger
  - softmax
  - baglamsal-temsil
  - oz-dikkat
content_hash: sha256:0000000000000000000000000000000000000000000000000000000000000000
classification_version: 1
classification_batch: 1
---
## Aynı kelime, üç ayrı cümle

4\. makale bir duvara çarparak bitmişti ve Türkçe o duvarı tek kelimeyle gösteriyordu: "yüz". Üç cümle düşünmüştük — "Yüzüme baktı." — "Yüz lira verdim." — "Denizde yüz!" — ama defterde "yüz" token'ının tek bir satırı var; kelime hangi cümlede geçerse geçsin ağa aynı vektör gidiyor. 5\. makalede modelin işini kurmuştuk: her adımda, sözlükteki her token için bir olasılık üretmek. Sonraki token'ı iyi tahmin etmek istiyorsan elindeki temsil cümleye göre değişebilmeli; oysa defterden çektiğin satır, kelimenin cümleye girmeden önceki hâlidir.

Bu makalenin sorusu tek cümleye sığar: bir kelimenin vektörü, cümlenin geri kalanına bakılarak nasıl yeniden yazılır? Cevabın adını zaten biliyorsun — dikkat. Şimdi mekanizmayı kuracağız. Üç yeni parça getireceğiz: komşuların tartılması, sorgu-anahtar-değer üçlüsü ve ikisinin ürünü olan bağlamsal temsil (contextual representation). Yanlarına bir de ek kural iliştireceğiz: dil modelinin geleceğe bakmasını engelleyen kural. Sonunda "yüz"ü elle hesaplayacağız.

## Tek kâğıda sığmayan cümle

Fikrin doğduğu yer bir dil modeli değil, bir çeviri sistemiydi. 2014'ün standart tarifi şuydu: bir ağ kaynak cümleyi baştan sona okur ve cümlenin tamamını sabit uzunlukta tek bir vektöre sıkıştırır; ikinci bir ağ yalnızca o vektöre bakarak hedef cümleyi kelime kelime üretir. Cümle üç kelime de olsa elli kelime de olsa aradaki kâğıdın boyu aynıdır.

Şöyle hayal et: bir çevirmene beş yüz sayfalık kitabı okutuyorsun, ama not almasına izin vermiyorsun. Yalnızca tek bir küçük kâğıda özet çıkarabiliyor; sonra kitabı elinden alıp o kâğıtla çeviri yaptırıyorsun. Benzetmenin bozulduğu yer şurası: insan çevirmenin kâğıdı ayrık kelimelerden oluşur ve neyi unuttuğunu fark eder, kodlayan ağın vektörü ise sürekli sayılardan oluşur ve neyi kaybettiğini "bilmez". Benzetmenin biçimsel karşılığı ise nettir: kaynak cümlenin uzunluğu ne olursa olsun, üretim aşamasının eriştiği tek şey sabit boyutlu bir sayı listesidir.

Dzmitry Bahdanau, Kyunghyun Cho ve Yoshua Bengio 2015'te bu darboğazı işaret edip bir çözüm önerdi ve önerileri bugünkü büyük dil modellerinin çekirdeğine kadar yaşadı. Çözüm şuydu: kâğıdı tamamen kaldır. Üretimin her adımında kaynak cümlenin **bütün** konumlarına yeniden bak, her konuma bir ağırlık ver ve o adıma özel yeni bir bağlam vektörü hesapla. Ağırlıkları elle yazılmış bir tablo belirlemiyordu; küçük bir ağ, sistemin geri kalanıyla birlikte eğitiliyordu. Yazarlar bu parçaya hizalama (alignment) modeli adını verdi.

Sonuç ölçüldü. Kalite burada BLEU ile ölçülüyor: makine çevirisinin insan çevirileriyle ne kadar örtüştüğünü 0 ile 100 arasında tek bir sayıya indiren cetvel, yüksek olan iyidir. En fazla otuz kelimelik cümlelerle eğitilen çiftte kalite 13,93 BLEU'dan 21,50 BLEU'ya, elli kelimelik çiftte 17,82'den 26,75'e çıktı — farkları biz çıkardık, sırasıyla 7,57 ve 8,93 puan. Daha öğretici olan ikinci bulguydu: kâğıtlı sistemin başarısı cümle uzadıkça sert biçimde düşerken, dikkatli sistemlerin ikisi de uzunluğa daha dayanıklıydı; elli kelimeye kadarki cümlelerle eğitilen sürüm elli kelimeyi aşan cümlelerde bile bozulmuyordu.

Ağırlıkların ne öğrendiğine bakmak da öğreticiydi, çünkü kimse onlara hangi kelimenin hangisine karşılık geldiğini söylememişti. Yazarların incelediği İngilizce–Fransızca çevirilerde model, iki dilin sıfat-isim sırasının ters olduğu yerlerde ağırlığı doğru kelimeye kaydırıyor, gerektiğinde iki kelime ileri atlayıp sonra geriye dönüyordu. Tek bir hedef kelimeyi doğru üretmek için kaynakta iki kelimeye birden bakmak gerektiğinde de tıkanmıyordu: Fransızca artikelin biçimi ardından gelen isme bağlı olduğu için model, o artikeli üretirken hem karşılık gelen kelimeye hem ardındaki isme pay veriyordu. Sert eşleştirme yerine tartım yapmanın somut faydası tam buydu.

Burada iki dürüstlük notu gerekiyor. Birincisi: yazarlar sabit uzunluklu vektörün darboğaz olduğunu kanıtlanmış bir teorem gibi sunmaz, açıkça bir varsayım olarak ortaya koyar. İkincisi: bu sistem o günün geleneksel çeviri yazılımını geçmedi. Tüm cümlelerde geleneksel sistem 33,30, dikkatli sistemin en iyi sürümü 28,45 aldı; dikkat yalnızca sözlük dışı kelime içermeyen alt kümede öne geçti (36,15'e karşı 35,63).

Şekil 1'deki karşıtlık meselenin tamamıdır: üstte n girişten tek bir kutuya giden dar boğaz, altta her üretim adımı için yeniden hesaplanan ağırlıklı toplam.

![Üstte tüm kaynak token'ları tek bir sabit uzunluklu bağlam vektörüne sıkışır; altta her üretim adımı için token'lara ayrı dikkat ağırlıkları verilir ve her adımda yeni bir bağlam vektörü hesaplanır.](assets/sabit-vektor-darbogazi.svg "Şekil 1 — Tek özetten tartıma")

Popüler anlatı dikkatin 2017'de "Attention Is All You Need" başlıklı çalışmayla icat edildiğini söyler. Birincil kaynak buna izin vermiyor: 2015 tarihli makale "dikkat" sözcüğünü kendisi kullanır ve kod çözen tarafta bir dikkat mekanizması uyguladığını açıkça yazar. Dürüst sonuç şu: 2017'nin katkısı dikkati icat etmek değil, yinelemeli yapıyı tamamen atıp yalnızca dikkatle çalışan bir mimari kurmaktı. Başlık da tam bunu iddia ediyor.

## Sorgu, anahtar, değer: aynı satırın üç okunuşu

Bahdanau ve arkadaşlarının skoru küçük bir ağdan çıkıyordu. Minh-Thang Luong, Hieu Pham ve Christopher Manning aynı yıl bu skoru sadeleştirdi: küçük ağın yerine doğrudan nokta çarpımı koydular ve kendi kurulumlarında iyi çalıştığını raporladılar — evrensel bir sonuç değil, bir mimari tercih bulgusu. Ashish Vaswani ve arkadaşları 2017'de işlemi üç role bölüp isimlendirdi ve bugün kullandığımız biçim bu oldu; nokta çarpımın ayrıca hızlı ve az yer tutan bir işlem olduğu gözlemi de onlara ait.

Roller şöyle: dizideki her token'ın vektörü, üç ayrı öğrenilmiş dönüşümden geçirilir ve aynı satırdan üç farklı vektör çıkar. Dönüşüm dediğimiz şey 3\. makalenin katmanının yaptığının aynısıdır: girdinin her sayısı öğrenilmiş ağırlıklarla çarpılıp toplanır ve çıkan sayılar yeni vektörü kurar. Birinci dönüşümden çıkana sorgu (query), ikinciden çıkana anahtar (key), üçüncüden çıkana değer (value) denir; sorgu "ben neyi arıyorum" tarafını, anahtar "bende ne var" tarafını, değer ise "seçilirsem ne veririm" tarafını taşır. Bu üç dönüşümün ağırlıkları da ağın geri kalanı gibi eğitimle yazılır, yani rolleri elle tarif eden bir insan yoktur. Sorgular, anahtarlar ve değerler aynı diziden çıkıyorsa buna öz-dikkat (self-attention) denir — cümle kendi içine bakar.

Mekanizmanın tamamı iki cümlede özetlenebilir. Her token'ın sorgusu, cümledeki bütün token'ların anahtarlarıyla karşılaştırılıp birer benzerlik skoru üretir; sonra bu skorlar toplamı 1 olan katsayılara çevrilir ve o token'ın yeni temsili, bütün değerlerin bu katsayılarla alınmış ağırlıklı ortalaması olur. Tartım dediğimiz şey tam olarak budur: seçmek değil, pay dağıtmak.

Bu makalenin ana benzetmesi 4\. makalenin defterinin üzerine biner. Dikkat, defterden çektiğin satırı silmez; o satırın **üzerine**, aynı cümledeki komşulardan gelen katkıları yazar. Benzetmenin bozulduğu yer şurası: gerçek bir deftere yazınca satır kalıcı olarak değişir, oysa dikkatte özgün satır dokunulmadan durur — değişen, yalnızca o cümle için üretilen kopyadır; aynı token başka bir cümlede yine el değmemiş satırdan yola çıkar. Benzetmenin biçimsel karşılığı ise şudur: dikkatin çıktısı, komşuların değer vektörlerinin, dikkat ağırlıklarıyla alınmış ağırlıklı ortalamasıdır.

İkinci bir benzetme yardımcı olabilir ama üç sınırıyla birlikte verilmezse zarar verir. Kütüphane fişi benzetmesinde elindeki arama terimi sorgu, rafın etiketi anahtar, raftaki kitap değerdir. Benzetmenin bozulduğu üç yer şunlar: kütüphanede tek bir kitap seçilir, dikkatte hiçbir raf kapanmaz ve hepsinden bir pay alınır; etiketler ve kitaplar dışarıdan konmuş içerik değildir, aynı vektörün üç ayrı öğrenilmiş dönüşümüdür; nokta çarpım da "bu kayıt ilgili mi" sorusuna cevap vermez, yalnızca eğitimle şekillenmiş bir yön benzerliği ölçer. Biçimsel karşılığı yine aynı üç çarpımdır: sorgu, anahtar ve değer tek bir girdi vektöründen türer.

> **Kendini yokla:** Bir kelimenin embedding satırı eğitimden sonra sabittir. O hâlde "yüz" kelimesinin temsili, "Denizde yüz!" ile "Yüz lira verdim." cümlelerinde nasıl farklı olabiliyor?

Satır gerçekten sabit; değişen şey satırın kendisi değil, ona ne eklendiğidir. Dikkat katmanı cümledeki diğer token'ların değerlerini tartar ve bu satırın üzerine bindirir. "Denizde"nin ağırlığı yüksekse çıkan vektör eylem anlamına, "lira"nın ağırlığı yüksekse miktar anlamına kayar. Sabit olan girdi, bağlamsal olan çıktıdır.

## Skorları tartıya çeviren işlem

Sorgu ile anahtar arasındaki benzerliği ölçen işlem nokta çarpımdır (dot product): iki sayı listesini eleman eleman çarpıp sonuçları toplarsın. Aynı yöne bakan iki vektör büyük bir sayı verir, ilgisiz iki vektör sıfıra yakın bir sayı verir, ters yöne bakanlar ise negatif bir sayı. Çıkan sayıya skor diyelim; skorlar herhangi bir büyüklükte olabilir ve doğrudan bir ağırlık olarak kullanılamaz.

Bize gereken şey bu değil. Bize toplamı 1 olan tartı katsayıları lazım, çünkü çıktı bir ağırlıklı ortalama olacak ve ortalamada katsayıların toplamı 1 olmazsa çıktının büyüklüğü kontrolden çıkar. Bu dönüşümü yapan işlemin adı softmax.

Önce sözle: softmax, elindeki skorları önce hepsi pozitif olacak biçimde dönüştürür, sonra toplamları tam olarak 1 olacak şekilde ölçekler. Pozitifleştirmeyi üstel fonksiyon yapar ve bu masum bir seçim değildir — üstel alma, büyük skorları küçüklerin önüne orantısız biçimde çıkarır. Sembolle: bir skor kümesi için i'nci ağırlık, e üzeri i'nci skorun, bütün skorların üstellerinin toplamına bölümüdür. Küçük sayıyla: skorlar 1 ve 2,5 ise üsteller 2,7183 ve 12,1825 olur; ikinci skor birinciden 1,5 fazlayken üsteli yaklaşık 4,5 katıdır.

Çıkan sayıların adı dikkat ağırlığı (attention weight). Negatif olamazlar ve toplamları 1'dir; yani bir olasılık dağılımıdır. Burada bu makalenin en ince ayrımı geliyor: bu dağılım, 5\. makaledeki sonraki token dağılımıyla **aynı matematiksel nesnedir ama aynı şey değildir**. Orada soru "sıradaki kelime ne olabilir" idi; burada soru "bu kelimeyi yeniden yazarken hangi komşuya ne kadar pay verilecek". İkisini karıştırmamak gerekir.

> **Kendini yokla:** Bir token için bütün dikkat ağırlıkları eşit çıkarsa o katman ne yapmış olur?

Hiçbir şeyi öne çıkarmamış olur: çıktı, bütün değerlerin düz ortalamasıdır. Tartım ancak ağırlıklar birbirinden ayrıştığında bilgi taşır. Eşit ağırlık, "bağlamda ayırt edici bir şey bulamadım" demenin sayısal hâlidir.

## "Yüz"ü elle hesaplayalım

Somutlaştıralım. İki cümle alıyoruz, her biri üç parça: "serin denizde yüz" ve "cebimde yüz lira". Bir kayıt düşmek şart: 4\. makaleden biliyoruz ki gerçek bir tokenizer "cebimde"yi birkaç parçaya böler; mekanizmayı çıplak gözle görmek için burada her kelimeyi tek token sayıyoruz.

Sorgu ve anahtarlar dört boyutlu olsun. Boyutların anlamını biz atıyoruz, model böyle etiketlemez: su bağlamı, para bağlamı, eylem işareti, isim işareti. Değerler iki boyutlu olsun: birinci boyut "eylem" yönünde kanıt, ikinci boyut "miktar" yönünde kanıt. Gerçek bir modelde bu vektörlerin hepsi embedding satırının az önceki üç dönüşümden geçirilmesiyle çıkar; biz kalabalık olmasın diye doğrudan yazıyoruz.

| Token | Anahtar (4 boyut) | Değer (2 boyut) |
|---|---|---|
| serin | (2, 0, 0, 1) | (1, 0) |
| denizde | (5, 0, 0, 1) | (2, 0) |
| yüz | (1, 1, 1, 1) | (1, 1) |
| cebimde | (0, 2, 0, 1) | (0, 1) |
| lira | (0, 5, 0, 1) | (0, 2) |

Kritik nokta şu: "yüz"ün sorgusu iki cümlede de **aynıdır**, çünkü aynı token'ın aynı embedding satırından üretilir. Sorgumuz (1, 1, 0, 0) olsun; yani "ben su bağlamında mıyım, para bağlamında mıyım" diye soruyor.

Birinci adımda sorgunun her anahtarla nokta çarpımını alıyoruz: birinci cümlede sorgu ile "serin" 1×2 + 1×0 + 0×0 + 0×1 = 2, "denizde" ile 1×5 = 5, "yüz" ile 1×1 + 1×1 = 2 veriyor. İkinci cümlede aynı işlem "cebimde" için 2, "yüz" için 2 ve "lira" için 5 sonucunu veriyor; yani iki cümlede de aynı üç sayı, farklı token'lara dağılmış hâlde karşımıza çıkıyor.

İkinci adımda skorlar, anahtar boyutunun kareköküne bölünür; boyut 4 olduğu için bölen 2 ve elimizde birinci cümle için 1 · 2,5 · 1, ikinci cümle için 1 · 1 · 2,5 kalıyor.

Üçüncü adımda softmax devreye giriyor: gereken iki üstel 2,7183 ve 12,1825, birinci cümlenin toplamı ise 2,7183 + 12,1825 + 2,7183 = 17,6191. Ağırlıklar buradan çıkıyor: "serin" 2,7183 / 17,6191 = 0,154, "denizde" 12,1825 / 17,6191 = 0,691, "yüz" yine 0,154. (Üç basamağa yuvarlanmış hâlleri 0,999 topluyor; eksik kalan binde bir, tam değerlerin toplamı 1 olduğu için ortaya çıkan bir yuvarlama artığıdır.) İkinci cümlede aynı üç sayı başka token'lara düşüyor: "cebimde" 0,154, "yüz" 0,154, "lira" 0,691.

Dördüncü adımda değerlerin ağırlıklı ortalamasını alıyoruz. Birinci cümlede eylem boyutu 0,154×1 + 0,691×2 + 0,154×1 = 0,154 + 1,382 + 0,154 = 1,690 veriyor; ama bu, ağırlıkların 0,999'a düşen yuvarlanmış hâlleriyle yapılmış bir hesap — tam değerlerle sonuç 1,691. Miktar boyutu ise 0,154×0 + 0,691×0 + 0,154×1 = 0,154. Yani çıktı (1,691 ; 0,154). İkinci cümlede aynı iki sayı yer değiştiriyor: eylem boyutu 0,154, miktar boyutu 1,691, çıktı (0,154 ; 1,691).

Şekil 2 bu dört adımı akış olarak gösteriyor; kutulardaki sayılar yukarıdaki hesabın birebir aynısıdır. Mekanizmanın alandaki adı da bu dört adımdan geliyor: ölçekli nokta çarpım dikkati (scaled dot-product attention).

!["Yüz"ün girdi vektöründen sorgu, üç token'ın girdi vektörlerinden anahtarlar ve değerler üretilir; sorgu üç anahtarla ayrı ayrı çarpılıp üç skor verir, skorlar karekökle ölçeklenir, softmax onları dikkat ağırlıklarına çevirir ve değerlerin ağırlıklı ortalaması çıktıyı oluşturur.](assets/dikkat-akisi.svg "Şekil 2 — Ölçekli nokta çarpım dikkatinin akışı")

Aynı token, aynı embedding satırı, aynı sorgu. Ama çıktı tam tersine döndü: birinci cümlede eylem boyutu 1,691 ve miktar boyutu 0,154, ikinci cümlede tam tersi. Şekil 3 bunu iki boyutlu bir düzlemde gösteriyor — tek bir gri başlangıç noktasından çıkan iki ok, birbirine neredeyse dik iki yöne uzanıyor. 4\. makalenin duvarı yıkıldı. Dikkat mekanizması "yüz"ün iki anlamını hiçbir yerde sözlük olarak saklamıyor; komşularının değerlerini tartıp karıştırıyor, hepsi bu.

![İki boyutlu düzlemde aynı statik embedding noktasından çıkan iki ok: birinci cümlenin çıktısı eylem boyutu boyunca, ikinci cümlenin çıktısı miktar boyutu boyunca uzanır.](assets/baglamsal-cikti.svg "Şekil 3 — Aynı token'ın iki bağlamdaki çıktısı")

Söz verdiğimiz ek kural şimdi geliyor ve 5\. makaledeki hedeften doğuyor. Bir dil modeli sonraki token'ı tahmin etmek zorundaysa, bir token'ı işlerken kendinden sonrakileri **görmemelidir** — yoksa cevap anahtarını okumuş olur. Çözüm sade: yasak konumların skoru eksi sonsuz yapılır, üstel alma onları tam sıfıra indirir ve normalleştirme kalanlar üzerinden yapılır. Buna maskeleme (masking) denir. İkinci cümlemizde "lira"yı kapatalım: ağırlıklar 0,500 · 0,500 · 0 olur ve çıktı (0,500 ; 1,000) çıkar. Model "miktar" yönüne hâlâ eğilimli ama kararsız; kesinlik "lira" geldiğinde oluşuyor. Maskenin tam biçimini ve mimarideki yerini 7\. makalede kuracağız.

### İleri okuma notu: neden kareköke bölünüyor

O ikinci adım keyfî görünüyor olabilir. Değil. Aynı skorları (2 · 5 · 2) bölmeden softmax'a verirsek ağırlıklar 0,045 · 0,909 · 0,045 çıkar — dağılım neredeyse tek bir token'a kilitlenmiş. Vaswani ve arkadaşlarının dipnotu gerekçeyi verir: bileşenleri ortalaması sıfır, yayılımı (varyansı) 1 olan bağımsız değişkenler kabul edilirse — yani sayılar sıfırın çevresinde tipik olarak bir birim oynuyorsa — nokta çarpımın yayılımı anahtar boyutuna eşit olur. Yayılım boyut kadarsa standart sapma da karekökü kadardır; kareköke bölmek skorları eski ölçeğine geri çeker. Vaswani ve arkadaşlarının taban modelinde bu boyut 64'tür, yani bölen 8; sonraki büyük modellerde boyut da bölen de büyür (GPT-3'ün büyük sürümlerinde 128). Bu bir olasılık zorunluluğu değil, sayısal bir önlemdir: aşırı sivrilen softmax'ın gradyanları yok denecek kadar küçülür ve öğrenme durur.

## Mesafenin ortadan kalktığı yer

Dikkatin kazandırdığı ikinci şey kaliteyle değil, yapıyla ilgili. 5\. makalede dil modellerinin bir dönem yinelemeli ağlarla kurulduğunu görmüştük: bilgi dizide adım adım, komşudan komşuya taşınır ve her token yalnızca kendinden önceki adımın özetini devralır. Yüz token'lık bir cümlede birinci token'ın bilgisi yüzüncü token'a ulaşana kadar doksan dokuz aktarmadan geçer, her aktarmada biraz aşınır ve aktarmaların hiçbiri bir öncekini beklemeden yapılamaz.

Öz-dikkatte böyle bir yolculuk yok: yüzüncü token'ın sorgusu, birinci token'ın anahtarıyla doğrudan çarpılır ve arada taşıyıcı yoktur. Vaswani ve arkadaşlarının katman türlerini karşılaştıran tablosu bunu tek satırda söyler: yinelemeli katmanda herhangi iki konum arasındaki en uzun yol dizinin uzunluğuyla birlikte büyürken, öz-dikkatte dizi ne kadar uzarsa uzasın sabit kalır. Bedeli de aynı tabloda duruyor: her token her token'a baktığı için skor sayısı dizinin karesiyle artar, ve dizi temsil boyutundan uzunsa ham işlem sayısı bakımından yinelemeli katman daha ucuza gelir. Öz-dikkatin koşulsuz üstünlüğü hesap miktarında değil, yolun kısalığında. Bu takasın mimariye ne kazandırdığı 7\. makalenin işi.

## Ağırlıklar modelin açıklaması mı?

Dikkat ağırlıklarını renk yoğunluğuyla çizip "model şuraya baktı" demek çok kolay ve çok yaygın. Burada bir uyarı borcum var.

Sarthak Jain ve Byron Wallace 2019'da bu okumayı doğrudan test etti ve iki bulgu raporladı. Birincisi, öğrenilmiş dikkat ağırlıkları önemi ölçen gradyan tabanlı ölçütlerle çoğu zaman zayıf ilişkilendi; verdikleri somut örneklerden birinde bu ilişki 0,29 düzeyinde kaldı. İkincisi daha sarsıcıydı: birbirinden çok farklı dikkat dağılımları bulunabiliyor ve model yine neredeyse aynı tahmini üretiyordu — tahmindeki oynamayı, metin sınıflandırma görevlerinde 0,01'lik, soru-cevap kümelerinde 0,05'lik bir sınırın altında tutarak.

Sarah Wiegreffe ve Yuval Pinter aynı yıl karşı çıktı, ama beklenen yerden değil. İtirazları şuydu: dikkat dağılımı modelden koparılıp elle değiştirilebilecek bağımsız bir parça değildir; ağırlıklar diğer katmanlarla birlikte eğitilmiştir ve elle takılan bir dağılım, o modelin üretebileceği bir dağılım olmayabilir. Ayrıca bazı veri kümelerinde bütün ağırlıkları eşit yapmak öğrenilmiş dikkat kadar iyi sonuç veriyor; orada zaten yorumlanacak bir şey yoktur. Sorunun cevabı, "açıklama" sözcüğünden ne anladığına bağlıdır: makul bir hikâye mi arıyorsun, yoksa modelin hesabına sadık bir açıklama mı?

Yani ortada kapanmış bir tartışma değil, sürmekte olan bir anlaşmazlık var. İki tarafın hemfikir olduğu yer ise bizim için yeterli: dikkat ağırlığı, modelin hesabının içindeki bir ara büyüklüktür. Teşhis ve hata ayıklama için değerlidir; "model buraya baktığı için böyle karar verdi" cümlesinin kanıtı değildir. Vaswani ve arkadaşlarının kendi dili de bu konuda temkinlidir: başların dilbilgisel yapıyla ilgili davranış sergilediğini kanıtlanmış bir sonuç olarak değil, gözlem olarak yazarlar. Modelin içine bakmanın bugünkü araçlarını ve "açıklama" sözcüğünün ne kadarını hak ettiklerini 74–77. makalelerde ayrıca ele alacağız.

## Tartımın göremediği şey

Elimizde tek bir işlem var ve iş görüyor. Ama bir işlem bir mimari değil; iki büyük eksiği açıkça söyleyelim.

> **Kendini yokla:** Dikkatin çıktısı, komşuların değerlerinin ağırlıklı ortalamasıydı. Bu ortalamada terimlerin sırasını değiştirsen sonuç değişir mi?

Değişmez; toplamada sıra önemsizdir. Bunun bedeli şu: dikkat kelimelerin sırasını kendiliğinden bilmez. Kalemi al ve dene: birinci cümlede "serin" ile "denizde"nin yerini değiştir, yani "denizde serin yüz". Skorlar aynı üç çarpımdan çıkar — "denizde" 5, "serin" 2, "yüz" 2 — ve ağırlıklar yine aynı token'lara yapışır: 0,691 · 0,154 · 0,154. "Yüz"ün çıktısı yine (1,691 ; 0,154); token'ların yerini değiştirdiğinde her token'ın kendi çıktı vektörü zerre değişmez, yalnızca dizideki yeri değişir. Aynı örnek ikinci cümlede daha rahatsız edicidir: maskesiz bir dikkat katmanı için "yüz lira" ile "lira yüz" ayırt edilemez. Az önceki maske kısmi bir istisnadır — hangi komşunun görülebildiğini konum belirlediği için sıra tümüyle kaybolmaz — ama maske yalnızca "öncesi mi, sonrası mı" ayrımını taşır, "kaçıncı komşu" bilgisini taşımaz. Sıra bilgisi mekanizmanın içinde yoktur; dışarıdan, ayrı bir sinyal olarak eklenmesi gerekir.

İkinci eksik daha incedir. Bir cümlede aynı anda birden çok ilişki türü vardır: hangi kelime hangi fiilin öznesi, hangi zamir hangi ismi işaret ediyor, hangi sıfat hangi ismi niteliyor. Tek bir ağırlık kümesi bunların hepsini tek bir tartıya sıkıştırmak zorundadır ve kaçınılmaz olarak bulanıklaşır. Çözümün adı çok başlı dikkat (multi-head attention): aynı anda birden çok tartım çalıştırmak. Vaswani ve arkadaşları bunun ölçüsünü de verir — geliştirme kümesinde ölçüldüğünde tek başlı ayar, kendi en iyi ayarlarından 0,9 BLEU geride kalıyor. Nasıl kurulduğu 7\. makalenin işi.

Kazandığımız şeyi sayalım: bir kelimenin temsili artık cümleye göre yeniden yazılıyor, tartım öğreniliyor ve uzak komşular tek adımda erişilebiliyor. Fazlası iddia edilmiyor.

### Sırada ne var

Bir dikkat katmanı, her token'ın vektörünü bağlamla yeniden yazıyor — ama az önce adlandırdığımız iki eksikle birlikte. 7\. makalede bu tek işlemi çalışan bir mimariye çevireceğiz: aynı bloğu üst üste koyarak, sıra bilgisini dışarıdan ekleyerek. Asıl soru da orada karşımıza çıkacak: bu tek işlemi üst üste yığdığında ortaya çıkan şey neden yalnızca "daha çok dikkat" değil, ölçek çağının kapısını açan bir mimari oluyor?

## Kaynakça

- Bahdanau, D., Cho, K. & Bengio, Y. (2015). *Neural Machine Translation by Jointly Learning to Align and Translate*. ICLR 2015 (arXiv:1409.0473). [Bağlantı](https://arxiv.org/abs/1409.0473)
- Luong, T., Pham, H. & Manning, C. D. (2015). *Effective Approaches to Attention-based Neural Machine Translation*. EMNLP 2015, s. 1412–1421. [Bağlantı](https://aclanthology.org/D15-1166/)
- Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł. & Polosukhin, I. (2017). *Attention Is All You Need*. NeurIPS 2017 (arXiv:1706.03762). [Bağlantı](https://arxiv.org/abs/1706.03762)
- Jain, S. & Wallace, B. C. (2019). *Attention is not Explanation*. NAACL-HLT 2019, s. 3543–3556. [Bağlantı](https://aclanthology.org/N19-1357/)
- Wiegreffe, S. & Pinter, Y. (2019). *Attention is not not Explanation*. EMNLP-IJCNLP 2019, s. 11–20. [Bağlantı](https://aclanthology.org/D19-1002/)
