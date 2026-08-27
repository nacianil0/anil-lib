---
article_id: article_ffb7fe2e-37b4-4cbd-a1de-01044c11886e
title: "Metin Üretimi: Örnekleme, Sıcaklık ve Olasılıklar"
slug: metin-uretimi-ornekleme-sicaklik-ve-olasiliklar
category: models-and-training
level: beginner
reading_order: 10
summary: "Eğitilmiş bir modelin her adımda ürettiği olasılık dağılımından metnin nasıl çıktığını anlatır: otoregresif döngü, açgözlü seçim, sıcaklığın elle hesaplanmış etkisi ve kuyruğu kesen yöntemler."
tags:
  - metin-uretimi
  - ornekleme
  - sicaklik
  - cekirdek-ornekleme
  - acgozlu-secim
content_hash: sha256:0000000000000000000000000000000000000000000000000000000000000000
classification_version: 1
classification_batch: 1
---
## Dağılım var, metin yok

9\. makale eğitimin ekonomisiyle kapandı ve elimizde eğitilmiş bir model bıraktı — ama o makale boyunca modelden tek bir kelime çıkmadı. 5\. makalede çizdiğimiz resim hâlâ yerinde duruyor: "Bugün hava çok ___" bağlamını verdiğinde model tek bir kelime söylemez, sözlüğündeki her token'a bir sayı verir. "güzel" 0,31, "sıcak" 0,22, "soğuk" 0,18, "yağmurlu" 0,09, "mikroskop" ise sıfır değil ama gülünç derecede küçük bir payla 0,001. Çıktı bir cevap değil, bir dağılım.

Aynı makalede bir söz vermiştik: modelin ürettiği metin bu dağılımdan yapılan bir çekiliştir ve çekilişin nasıl yapıldığı çıktının karakterini kökten değiştirir. Sözün vakti geldi. Bu makalenin sorusu tek cümleye sığıyor: dağılım elimizde, ondan tek bir metin nasıl çıkar ve o metni çıkarma biçimi çıktının neyini değiştirir? Burada üç şey kuracağız: dağılımdan token seçmenin iki temel yolu, dağılımın şeklini tek başına değiştiren bir sayı — sıcaklık (temperature) — ve dağılımın kuyruğunu kesen yöntem ailesi. Bu kuralların toplu adı kod çözme (decoding).

## Seç, ekle, baştan çalıştır

Model metin üretmez. Metni üreten şey bir döngüdür.

Döngü üç adımlıdır ve hiç değişmez. Bağlamı modele verirsin; model sonraki token üzerinde bir dağılım döndürür; bir kural o dağılımdan tek bir token seçer. Seçilen token bağlamın sonuna eklenir ve model baştan çalıştırılır. Buna otoregresif (autoregressive) üretim denir: modelin bir sonraki girdisi, kendi az önceki çıktısıdır. Yüz token'lık bir cevap, modelin yüzden fazla kez çalıştırılması demektir; 7\. makalede gördüğümüz paralellik burada işe yaramaz, çünkü sonraki adımın girdisi henüz üretilmemiştir.

![Bağlam kutusundan modele, modelden sonraki token dağılımına, oradan çekiliş kuralına ve seçilen token'a giden ok zinciri; son ok seçilen token'ı genişlemiş bağlam kutusuna geri taşır.](assets/uretim-dongusu.svg "Şekil 1 — Üretim döngüsünün bir turu")

Şekil 1 döngünün tek turunu gösteriyor: bağlam, dağılım, seçim, genişlemiş bağlam. Döngüde geri alma yok. "güzel" bir kez seçildiğinde bağlam "Bugün hava çok güzel" olur ve sonraki bütün dağılımlar bu seçime koşullanır; model "keşke sıcak deseydim" diye geri dönemez.

5\. makalede perplexity'yi bir yol ayrımı sayısı olarak okumuştuk: modelin her adımda kaç yollu bir kavşakta durduğunun ölçüsü. Üretim ise o kavşakta hangi yola sapıldığıdır. Benzetmenin bozulduğu yer şurası: gerçek bir kavşakta yollar eşdeğerdir ve yanlış saptığında geri dönebilirsin; buradaki yolların ağırlıkları birbirinden farklıdır ve seçilen token bağlama eklendiği için geri dönüş yoktur. Benzetmenin biçimsel karşılığı ise şudur: her adımda dağılımdan bir token seçilir, bağlama eklenir ve bir sonraki dağılım genişlemiş bağlama koşullanarak yeniden hesaplanır.

Dikkat: model kelime değil token üretir; 4\. makaledeki ayrım burada da geçerlidir. Ve 1\. makaledeki tanım hiç değişmedi — tahmin, görülmemiş bir girdiye çıktı üretmektir.

## En olasıyı kovalamanın bedeli

En sade kural akla ilk geleni yapar: her adımda en yüksek olasılıklı token'ı al. Buna açgözlü seçim (greedy decoding) denir ve hava durumu örneğinde her seferinde "güzel" çıkarır. Karşı kutupta örnekleme (sampling) durur: dağılımı bir zar gibi kullanıp payları oranında çekiliş yapmak. Bunu 2\. makaledeki "rastgele seçilmiş küçük bir parça" ile karıştırma: orada rastgelelik verinin seçimindeydi, burada çıktının seçiminde.

Açgözlü seçim kulağa doğru geliyor. Sonuç berbat.

Ari Holtzman, Jan Buys, Li Du, Maxwell Forbes ve Yejin Choi'nin 2020'de ICLR'de yayımlanan çalışması bunu ölçtü ve alanın konuya bakışını değiştirdi. GPT-2'nin büyük sürümünü aldılar, eğitim derleminin ayrılmış kısmından gelen kısa paragraflara koşullayarak beş bin metin pasajı ürettiler ve yalnızca üretim kuralını değiştirdiler. Tekrar ölçüsü şu: ilk iki yüz token içinde, en az iki token uzunluğundaki bir ifadenin sonda üst üste en az üç kez yinelenmesi.

Tablonun son satırındaki çekirdek örnekleme (nucleus sampling, top-p), dağılımın kuyruğunu p adı verilen bir olasılık eşiğine göre kesen bir kuraldır; mekanizmasını birazdan adım adım kuracağız, satır burada yalnızca karşılaştırma için duruyor.

| Üretim kuralı | Tekrar % | Perplexity |
|---|---|---|
| İnsan metni | 0,28 | 12,38 |
| Açgözlü seçim | 73,66 | 1,50 |
| Saf örnekleme | 0,22 | 22,73 |
| Çekirdek örnekleme (top-p), p = 0,95 | 0,36 | 13,13 |

Açgözlü seçimle üretilen metinlerin yüzde 73,66'sı tekrara saplanmış; insan metninde bu oran yüzde 0,28. Perplexity sütunu ise asıl tuhaflığı gösteriyor: açgözlü metnin perplexity'si 1,50, insan metninin 12,38. Yani model, kendi ürettiği metni insan metninden kat kat daha olası buluyor. Bu bir başarı değil, semptom.

Burada ince bir ayrım şart. 5\. makaledeki perplexity, modelin başkasının yazdığı ayrılmış bir metne verdiği olasılığın ölçüsüydü ve düşük olması iyiydi. Bu sütundaki perplexity ise modelin kendi ürettiği metne verdiği olasılığın ölçüsü: aynı formül, başka soru. Aynı dikkatle saf örnekleme satırına da bak — tekrar oranı 0,22 ile insanınkinin bile altında, ama perplexity'si 22,73, yani üretilen metin modelin kendisine göre bile tuhaf. Tekrar etmemek ile tutarlı olmak aynı şey değildir.

Tekrarın mekaniği bir kısır döngüdür: bir ifade bir kez üretildiğinde bağlamda görünür hâle gelir, modelin o ifadeye verdiği olasılık yükselir ve ifade yeniden seçilir. Holtzman ve arkadaşları bu artışı denedikleri ifadelerin ezici çoğunluğunda gözlemledi.

Asıl bulgu ise şu: doğal dil olasılığı maksimize etmez. İnsanların yazdığı metinde token başına olasılık sürekli dalgalanır; art arda birkaç adım boyunca yüksek olasılık bölgesinde kalmak kural değil istisnadır. Yazarlar bunu Paul Grice'ın iletişim ilkelerine bağlıyor: apaçık olanı söylemek bilgi taşımaz, dolayısıyla iyi bir yazar her kelimesini olabildiğince öngörülebilir yapmaz. Modelin en olasıyı kovalaması tam da bu yüzden insan metnine benzemiyor. Dikkat et, buradan "yüksek olasılık kötüdür" sonucu çıkmaz: tek bir adımda en olası token'ı seçmek çoğu zaman doğrudur, sorun yüzlerce adım boyunca hiç düşmemektir.

> **Kendini yokla:** Aynı soruyu bir modele iki kez sorduğunda iki farklı cevap alabiliyorsun. Modelin parametreleri arada değişmediğine göre bu fark nereden geliyor?

Dağılımdan değil, dağılımdan yapılan çekilişten. Model her iki seferde de aynı olasılıkları üretir; farkı yaratan, o olasılıklardan token seçme yöntemidir. Örneklemede her adımda yeniden zar atılır; açgözlü seçimde bu kaynaktan gelen fark ortadan kalkar — neredeyse. O "neredeyse"ye birazdan döneceğiz.

### İleri okuma notu: ışın arama

Açgözlü seçimin daha titiz kardeşi ışın arama (beam search), her adımda tek bir yol yerine aynı anda birkaç yolu birden tutar ve sonunda toplam olasılığı en yüksek diziyi seçer. Çıktısı girdiyle sıkı sıkıya belirlenmiş görevlerde — makine çevirisi gibi — hâlâ standarttır; Transformer'ın 2017'deki çeviri sonuçları dört genişlikli bir ışınla ve 0,6'lık bir uzunluk cezasıyla üretilmişti. Açık uçlu üretimde ise aynı bozulmayı yaşar: on altı genişlikli ışın aramanın tekrar oranı yüzde 28,94 ölçülmüştür. Bu bozulma, ışın aramanın açık uçlu üretimde yerini örnekleme temelli kurallara bırakmasının sebebidir.

## Zarın ağırlığını değiştirmek

Açgözlü seçim ile saf örnekleme arasında sürekli bir ayar var ve adı sıcaklık.

Önce sözle: her adayın olasılığını sıcaklığın tersi kuvvetine yükselt, sonra çıkan sayıları toplamları 1 olacak biçimde yeniden ölçekle. Sembolle, p bir adayın başlangıç olasılığı ve T sıcaklık olmak üzere, adayın yeni payı p^(1/T) bölü bütün adayların p^(1/T) değerlerinin toplamıdır.

Sıcaklık aslında softmax'a giren ham skorlar üzerinde tanımlıdır — 7\. makalede bu skorlara logit dendiğini görmüştük — ve sıcaklık her logit'i T'ye böler. İki işlem birbirine denktir: T = 1'deki olasılıkları biliyorsan, logit'lere hiç dokunmadan yukarıdaki üs alma kuralıyla aynı sonuca varırsın. Bu bir yaklaştırma değil, özdeşliktir. Bir yan faydası daha var: formül, başlangıç sayılarının ortak bir çarpanla ölçeklenmesine duyarsızdır. Yani ham değerlerle de yeniden normalleştirilmiş değerlerle de başlasan aynı beş sayıyı bulursun; aşağıda aritmetiği kolay olsun diye ham değerlerle çalışıyoruz.

Bir dürüstlük notu: bu beş olasılığın toplamı 1 değil, 0,801. Hata değil — kalan yaklaşık yüzde 19,9'luk pay, sözlüğün geri kalanındaki on binlerce token'a dağılmıştır. Elle takip edilebilsin diye sözlüğü bu beş adaya indiriyoruz. Beşini kendi içlerinde normalleştirince, yani her birini 0,801'e bölünce, T = 1'deki çalışma dağılımımız çıkar: güzel 0,387, sıcak 0,275, soğuk 0,225, yağmurlu 0,112, mikroskop 0,001.

Sayı koyalım. T = 0,5 için üs 1/T = 2, yani her olasılığın karesi: 0,31² = 0,0961; 0,22² = 0,0484; 0,18² = 0,0324; 0,09² = 0,0081; 0,001² = 0,000001. Toplam 0,185001. Her satırı bu toplama bölünce sırasıyla 0,519 / 0,262 / 0,175 / 0,044 çıkar; "mikroskop" ise milyonda beş, yani pratikte sıfır.

Şimdi ters yön. T = 1,5 için üs 2/3'tür: 0,31^(2/3) = 0,458; 0,22^(2/3) = 0,364; 0,18^(2/3) = 0,319; 0,09^(2/3) = 0,201. Mikroskop satırı elle en kolayı: 0,001 = 10⁻³ olduğundan (10⁻³)^(2/3) = 10⁻² = 0,010. Toplam 1,352. Bölünce: 0,339 / 0,270 / 0,236 / 0,149 / 0,007.

| Aday | T = 0,5 | T = 1 | T = 1,5 |
|---|---|---|---|
| güzel | 0,519 | 0,387 | 0,339 |
| sıcak | 0,262 | 0,275 | 0,270 |
| soğuk | 0,175 | 0,225 | 0,236 |
| yağmurlu | 0,044 | 0,112 | 0,149 |
| mikroskop | 0,000 | 0,001 | 0,007 |

Küçük bir uyarı: bu makaledeki üç basamaklı olasılık listelerini topladığında yer yer 1,001 bulursun. Tam değerlerin toplamı 1'dir; aradaki fark yuvarlama artığıdır.

![Yan yana üç çubuk paneli aynı beş adayı gösterir: soldaki panelde ilk çubuk belirgin biçimde uzar ve kuyruk erir, ortadaki panel T = 1'deki çalışma dağılımıdır, sağdaki panelde çubuklar birbirine yaklaşır ve en küçük çubuk gözle görülür hâle gelir.](assets/sicaklik-uc-panel.svg "Şekil 2 — Aynı dağılım, üç ayrı sıcaklık")

Şekil 2 aynı beş adayı üç sıcaklıkta yan yana koyuyor ve tablonun en öğretici satırı en alttaki. Sıcaklığı 1'den 1,5'e çıkarmak "güzel"in payını 0,387'den 0,339'a yalnızca biraz düşürür; ama "mikroskop"un payını yaklaşık altı katına çıkarır (tam değerlerle 0,001248'den 0,007396'ya). Değişim tepede küçük, kuyrukta büyüktür — yüksek sıcaklığın neden saçmalık ürettiğinin sayısal kanıtı budur. Ters yönde, T = 0,5 "güzel"i 0,519'a yükseltir ve "mikroskop"u yok eder. T sıfıra giderken dağılım tek bir adaya çöker; sınırda kalan şey açgözlü seçimdir.

Bir sınır kaydı gerekiyor: bu beş sayı, kapalı bir dünyanın sayılarıdır. Gerçek bir modelde sıcaklığı değiştirmek, dışarıda bıraktığımız yüzde 19,9'luk kuyruğu da yeniden şekillendirir; dolayısıyla "gerçek modelde de mikroskop 0,007'ye çıkar" denemez.

Sıcaklığı hileli bir zarın ağırlığı gibi düşünebilirsin: düşürmek ağır yüzü daha da ağırlaştırmak, yükseltmek zarı dengeye yaklaştırmaktır. Benzetmenin bozulduğu yer şurası: zarın yüzleri elle değiştirilebilir, oysa sıcaklık modelin bildiklerine hiç dokunmaz ve listeye tek bir yeni aday eklemez — olasılığı tam sıfır olan bir token hiçbir sıcaklıkta seçilebilir hâle gelmez, çünkü sıfırın pozitif her kuvveti yine sıfırdır. Benzetmenin biçimsel karşılığı ise şudur: parametreler sabit kalır, değişen tek şey softmax çıktısının şeklidir.

İsim de tesadüf değil. Popüler anlatı "sıcaklık"ı dil modelleri için uydurulmuş şirin bir metafor sayar; birincil kaynak başka yeri gösteriyor. David Ackley, Geoffrey Hinton ve Terrence Sejnowski'nin 1985 tarihli Boltzmann makineleri çalışmasında bir birimin, önceki durumundan bağımsız olarak açık duruma ayarlanma olasılığı, enerji farkının T'ye bölünmesiyle hesaplanır ve metin açıkça T'nin sıcaklık gibi davranan bir parametre olduğunu söyler; makalenin şekli aynı eğriyi T = 1,0, T = 4,0 ve T = 0,25 için çizer. Dürüst sonuç: formül gerçekten istatistiksel mekanikten ödünç alınmıştır, ama dil modelinde ne ısı ne enerji vardır — "enerji"nin yerinde logit durur ve ortada fiziksel bir denge süreci değil, tek adımlık bir yeniden ölçekleme vardır.

> **Kendini yokla:** Sıcaklığı sıfıra yaklaştırırsan ne olur — ve bu neden her zaman istenen şey değildir?

Dağılım sivrilir, en olası aday neredeyse bütün payı alır ve üretim açgözlü seçime yakınsar. İstenmemesinin sebebi az önceki tablo: çıktı tekdüzeleşir ve tekrara saplanır. Holtzman ve arkadaşları sıcaklığı 0,9'un altına indirmenin tekrarı ciddi biçimde artırdığını ölçtü.

## Bu bir yaratıcılık düğmesi mi?

Yaygın anlatı sıcaklığı böyle tanıtır. Ölçüldüğünde bu kadar temiz çıkmıyor.

Max Peeperkorn, Tom Kouwenhoven, Dan Brown ve Anna Jordanous'un 2024'te Hesaplamalı Yaratıcılık Konferansı'nda en iyi öğrenci bildirisi ödülü alan çalışması, tek bir modele tek ve sabit bir hikâye yazma istemi verip yedi ayrı sıcaklık değerinde yüzer hikâye üretti. Sonuç: sıcaklık, yenilikle zayıf ve tutarsızlıkla orta düzeyde ilişkili çıktı; tutunum ve tipiklikle hiçbir ilişkisi bulunmadı.

Bu bulguyu da fazla uzatmamak gerekir; ölçüm tek model ve tek istem üzerinde kurulmuştur. Dürüst formülasyon şu: sıcaklık, dağılımın ne kadar sivri olacağını ayarlayan tek bir sayıdır ve çeşitlilik bunun doğrudan sonucudur. Sıcaklığı yükseltmek modele yeni bir fikir vermez — zaten dağılımda payı olan ama arkalarda kalmış adayların şansını artırır.

## Kuyruğu kesmenin iki yolu

Sıcaklık kuyruğu inceltir ama silmez. Kesme yöntemleri tam bunu yapar: adayların bir kısmını tamamen atıp kalanları yeniden normalleştirir.

Birincisi top-k örnekleme: en olası k aday tutulur, gerisi atılır. Angela Fan, Mike Lewis ve Yann Dauphin 2018'de hikâye üretiminde k = 10 ile kullandı ve gerekçelerini açıkça yazdılar: ışın arama genelgeçer ve tekrarlı cümleler üretiyordu, tamamen rastgele örnekleme ise çok olasılıksız kelimeler sokuyordu — ve model eğitim sırasında böyle hatalarla dolu bir bağlamı hiç görmediği için üretim oradan sonra bozuluyordu.

Hesabı yapalım. k = 3 dediğimizde hava durumu örneğinde güzel, sıcak ve soğuk kalır; ham toplamları 0,31 + 0,22 + 0,18 = 0,71. Her birini bu toplama bölünce 0,437 / 0,310 / 0,254 çıkar. "yağmurlu" ve "mikroskop" artık seçilemez, olasılıkları sıfırlanmıştır.

İkincisi, tabloda adını andığımız çekirdek örnekleme: adaylar olasılığa göre sıralanır ve kümülatif toplam p eşiğine ulaşana kadar aday alınır; yani çekirdek, eşiği geçmeye yetecek en küçük aday kümesidir. p = 0,7 için çalışma dağılımımızda kümülatif toplam önce 0,387, sonra 0,662, sonra 0,887 olur; eşik üçüncü adayda aşılır. Çekirdek {güzel, sıcak, soğuk} olur ve yeniden normalleştirince yine 0,437 / 0,310 / 0,254 çıkar.

Aynı sonuç. Bunu tesadüf diye söylemek dürüstlük gereği: bu tek dağılımda iki kural aynı kümeyi seçti. Farkı görmek için ikinci bir bağlam gerekiyor. Kendi kurduğumuz küçük bir örnek olsun: "Türkiye'nin başkenti ___" için Ankara 0,92, İstanbul 0,03, Konya 0,02, İzmir 0,015, Bursa 0,015.

k = 3 kuralı burada Ankara, İstanbul ve Konya'yı tutar; ham toplam 0,97 ve yeniden normalleştirilmiş paylar 0,948 / 0,031 / 0,021. Yani sabit k, cevabın apaçık olduğu bir bağlamda bile yaklaşık yüzde 5 ihtimalle yanlış bir şehir üretmeye izin veriyor. p = 0,9 kuralında ise kümülatif toplam daha ilk adayda 0,92 olur, eşik hemen aşılır ve çekirdek tek adaydan ibaret kalır: Ankara, olasılık 1,000. Aynı p = 0,9'u hava durumu bağlamına uygularsak kümülatif toplam 0,387, 0,662, 0,887, 0,999 diye ilerler; eşik ancak dördüncü adayda aşılır ve çekirdekte dört aday olur.

![İki satırlı karşılaştırma: üstte düz bir dağılım, altta sivri bir dağılım; sol sütunda sabit sayılı kesme çizgisi her iki satırda da üçüncü adaydan sonra, sağ sütunda kümülatif eşik çizgisi üstte dördüncü adaydan sonra, altta birinci adaydan sonra duruyor.](assets/kesme-iki-baglam.svg "Şekil 3 — Aynı iki kural, iki ayrı dağılım")

Şekil 3'te kilit cümle tek bakışta görünüyor: sabit olan k'dir, uyum sağlayan p'dir. Sabit k, sivri bağlamda gereğinden çok aday tutar ve düz bağlamda gereğinden az; sabit p ise tutulan aday sayısını değil tutulan olasılık kütlesinin alt sınırını sabitlediği için dağılımın şekline kendiliğinden uyarlanır — çekirdek, eşiği geçmeye yetecek kadar aday alır ve orada durur. Yaygın bir yanlış okumayı da burada kapatalım: p = 0,9, "model yüzde 90 doğru" demek değildir. Ölçülen şey doğruluk değil, modelin kendi dağılımının kütlesidir; model bütünüyle yanılıyorsa çekirdek de bütünüyle yanlış adaylardan oluşur.

Üçüncü bir seçenek de var ve tartışması öğretici. Minh Nhat Nguyen ve arkadaşlarının ICLR 2025'te sözlü sunum olarak kabul edilen çalışmasının önerdiği min-p kuralı, eşiği sabit bir kütleye değil dağılımın en yüksek olasılığına oranlar: en olası adayın payı 0,92 ise ve oran 0,1 ise eşik 0,092 olur, altında kalan her aday elenir. Mekanizma nettir. Üstünlük iddiası ise nettir denemez: Rylan Schaeffer, Joshua Kazdan ve Yegor Denisov-Blanch'ın 2025 tarihli, hakem sürecinden geçmemiş yeniden analizi çalışmanın dört kanıt hattını da sorgular ve topluluk benimsemesine dair sayılar bildirinin son sürümünden çıkarılmıştır. Kuralın kendisi yerinde duruyor; üstünlüğü ise kapanmamış bir tartışma.

Bu kuralların birbirinin alternatifi olduğunu sanma; sıra hâlinde uygulanırlar. Logit'ler hesaplanır, sıcaklıkla ölçeklenir, softmax'tan geçer, kesme kuralı adayları eler, kalanlar yeniden normalleştirilir ve çekiliş yapılır. Bazı sistemler buna ek olarak tekrarı doğrudan cezalandırır: Nitish Shirish Keskar ve arkadaşlarının 2019 tarihli, hakem sürecinden geçmemiş CTRL çalışması, zaten üretilmiş token'ların skorunu softmax'tan önce bir katsayıya bölmeyi önerir ve katsayı olarak yaklaşık 1,2 verir. Bu bir eğitim değişikliği değil, yalnızca üretim anında uygulanan bir kuraldır.

> **Kendini yokla:** Model "mikroskop" kelimesine sıfır değil, çok küçük bir olasılık veriyor. Uzun bir metin boyunca bu küçüklük neden yine de önemlidir?

Çünkü her adımda yeniden çekiliş yapılır ve küçük olasılıklar yüzlerce adım boyunca birikir. Kesme yöntemlerinin varlık sebebi tam olarak budur: kuyruğu kesip bu birikimi engellemek.

## Aynı soru, başka cevap

Şimdi o "neredeyse"ye dönelim.

Sıcaklık sıfırda model her adımda aynı en olası token'ı seçer ve tek başına çalışan bir makinede sonuç gerçekten de her seferinde aynı olur. Ama bir sohbet arayüzünün arkasındaki sunucu senin isteğini yalnız işlemez; o an gelen başka isteklerle birlikte tek bir yığın hâlinde işler. Yığının büyüklüğü değişince kayan noktalı toplamaların sırası değişir, sonuçlar son basamakta oynar ve iki aday birbirine çok yakınsa en yüksek olasılıklı adayın kim olduğu değişebilir — otoregresif döngü de bu tek farkı sonraki bütün adımlara taşır.

Horace He ve Thinking Machines Lab'in hakem sürecinden geçmemiş blog yazısında ölçülmüş hâli şöyle: aynı istem, sıcaklık sıfır, bin deneme — seksen farklı sonuç. İlk yüz iki token bütün denemelerde aynıydı, ayrışma yüz üçüncüde başladı. Aynı yazının ikinci tespiti daha da öğretici: "eşzamanlılık yüzünden sonuçlar rastgele" biçimindeki yaygın açıklama eksiktir — yanlış değil, resmin tamamı değil. Suçlu eşzamanlılık değil, hesabın yığın büyüklüğüne duyarlı olmasıdır; yığın büyüklüğünden bağımsız çekirdeklerle aynı deney tekrarlandığında bin tamamlamanın hepsi birebir aynı çıktı. Bedeli hız oldu, o yüzden çoğu sistem bunu varsayılan yapmıyor.

Yani "aynı soruyu sordum, başka cevap aldım" deneyiminin iki ayrı kaynağı var. Baskın olanı çekiliş kuralının kendisidir; ikincisi, sıcaklık sıfırda bile tümüyle kaybolmayan bu altyapı etkisi.

## Akıcılık, doğruluk değildir

Bütün makale tek bir cümleye sığıyor: üretim bir çekiliştir. Buradan rahatsız edici bir sonuç çıkar — çekiliş kuralı, çekildiği dağılımdan daha iyi olamaz.

Adam Tauman Kalai ve arkadaşlarının 2025 tarihli, hakem sürecinden geçmemiş ön çalışması bu sorunun kaynağını örnekleme ayarlarında değil, eğitim ve değerlendirme hedeflerinde arıyor: modeller belirsizliği kabul etmek yerine tahmin yürütmeye teşvik ediliyor, çünkü yaygın değerlendirmelerin çoğu ikili puanlıyor ve "bilmiyorum" cevabına hiç kredi vermiyor. İyi bir sınav çözücü olacak biçimde ayarlanan bir sistem, emin olmadığında susmaz, tahmin eder.

İki olguyu yan yana koy. Model yanlış bir bilgiye en yüksek olasılığı atamışsa ve sıcaklık yalnızca zaten üretilmiş bir dağılımın şeklini değiştiriyorsa, sıcaklığı sıfıra çekmek o yanlışı tam olarak seçer — üstelik her seferinde ve en kararlı biçimde. Akıcı bir cümle, doğru bir cümle demek değildir; ikisini üreten mekanizma aynıdır. Bu olgunun adı halüsinasyon (hallucination) ve ciddiyetiyle 17. makalede ele alacağız.

### Sırada ne var

6\. makaleden buraya kadar tek bir şey inşa ettik: bağlamı tartan bir mimari, internet ölçeğinde sonraki-token hedefiyle eğitildi ve şimdi kendi dağılımından metin üretiyor. Artık "GPT tarzı bir model nedir, nasıl eğitilir, nasıl metin üretir" sorusuna uçtan uca cevap verebilirsin. Ama elimizdeki şey hâlâ bir metin tamamlayıcı: ona bir soru sorduğunda en olası devam bir cevap değil, benzer başka sorulardan oluşan bir liste olabilir — çünkü bu model soru cevaplamayı değil, metin devam ettirmeyi öğrendi. Sonraki token tahmincisi ile karşındaki asistan arasındaki fark tam olarak nedir ve o fark hangi ek eğitimden geliyor?

## Kaynakça

- Holtzman, A., Buys, J., Du, L., Forbes, M. & Choi, Y. (2020). *The Curious Case of Neural Text Degeneration*. ICLR 2020. [Bağlantı](https://arxiv.org/abs/1904.09751)
- Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł. & Polosukhin, I. (2017). *Attention Is All You Need*. Advances in Neural Information Processing Systems 30 (NIPS 2017). [Bağlantı](https://arxiv.org/abs/1706.03762)
- Ackley, D. H., Hinton, G. E. & Sejnowski, T. J. (1985). *A Learning Algorithm for Boltzmann Machines*. Cognitive Science, 9(1), 147–169. [Bağlantı](https://www.cs.toronto.edu/~fritz/absps/cogscibm.pdf)
- Peeperkorn, M., Kouwenhoven, T., Brown, D. & Jordanous, A. (2024). *Is Temperature the Creativity Parameter of Large Language Models?* Proceedings of the 15th International Conference on Computational Creativity (ICCC'24). [Bağlantı](https://arxiv.org/abs/2405.00492)
- Fan, A., Lewis, M. & Dauphin, Y. (2018). *Hierarchical Neural Story Generation*. Proceedings of the 56th Annual Meeting of the Association for Computational Linguistics (ACL 2018), s. 889–898. [Bağlantı](https://aclanthology.org/P18-1082/)
- Nguyen, M. N., Baker, A., Neo, C., Roush, A., Kirsch, A. & Shwartz-Ziv, R. (2025). *Turning Up the Heat: Min-p Sampling for Creative and Coherent LLM Outputs*. ICLR 2025 (sözlü sunum). [Bağlantı](https://arxiv.org/abs/2407.01082)
- Schaeffer, R., Kazdan, J. & Denisov-Blanch, Y. (2025). *Min-p, Max Exaggeration: A Critical Analysis of Min-p Sampling in Language Models*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2506.13681)
- Keskar, N. S., McCann, B., Varshney, L. R., Xiong, C. & Socher, R. (2019). *CTRL: A Conditional Transformer Language Model for Controllable Generation*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/1909.05858)
- He, H. & Thinking Machines Lab (2025). *Defeating Nondeterminism in LLM Inference*. Thinking Machines Lab blog yazısı (hakemli değildir). [Bağlantı](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)
- Kalai, A. T., Nachum, O., Vempala, S. S. & Zhang, E. (2025). *Why Language Models Hallucinate*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2509.04664)
