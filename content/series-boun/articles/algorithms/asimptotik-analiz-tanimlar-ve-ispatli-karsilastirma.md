---
article_id: article_431a796e-732b-4c24-98e9-4c4a966ca75f
title: "Asimptotik Analiz: Tanımlar ve İspatlı Karşılaştırma"
slug: asimptotik-analiz-tanimlar-ve-ispatli-karsilastirma
category: algorithms
level: advanced
reading_order: 17
summary: "Faz C'yi açan makale, veri yapıları fazının biriktirdiği asimptotik borcu ödüyor: Big-O'nun niceleyicili formal tanımı ve niceleyici sırasının neden hayati olduğu, tanımdan yürüyen bir olumlu ve bir olumsuz ispat, Ω ile Θ'nın tanımları ve eşik değerinin anlamı, limit testleri ile küçük o ve küçük omega, karar ağacı argümanındaki yükseklik adımının ispatı ve log₂(n!) = Θ(n log n) sonucu, sabitlerin gizlediği kesişim noktaları ve mülakatta en sık yapılan beş asimptotik hata."
tags:
  - asimptotik-analiz
  - big-o
  - theta
  - omega
  - alt-sinir
  - karar-agaci
content_hash: sha256:1e7cfb0e4bd89a05dbb95aebf103aabadc1f827c41d9ce6fd79157eed685d407
classification_version: 1
classification_batch: 5
---
## Sezgiden tanıma

Veri yapıları fazı boyunca bir dil kullandık ve tanımını hiç vermedik. "Bu işlem O(log n)", "birleştirmeli sıralama Θ(n log n)", "karşılaştırmalı sıralamanın alt sınırı Ω(n log n)" dedik. Karmaşıklık makalesinde Big-O'yu sezgisel olarak "yeterince büyük n'den sonra f, g'nin sabit bir katını aşmaz" diye tarif ettik ve formal tanımların bu makaleye bırakıldığını açıkça yazdık. Şimdi borcu ödüyoruz.

Faz burada karakter değiştiriyor. Önceki sekiz makale **yapı** anlattı: her biri bir veri düzeni kurdu ve maliyetini savundu. Bu fazın dokuz makalesi **analiz ve tasarım** anlatıyor: kullandığımız ölçüyü tanımlıyor, yineleme çözmeyi öğretiyor, doğruluğu ispatlıyor ve algoritma tasarım desenlerini kuruyor. İlk üç makale, önceki fazda sezgiye bırakılan her şeyi formalleştirir; bu, onların ilki.

Sezgisel tanım neden yetmiyor? Çünkü "daha hızlı büyümez" ifadesi sınır durumlarında kararsız kalır. n ile 2n arasında hangisi daha hızlı büyür? n ile n + log n? n² ile n² − 1000n? Bu sorulara "gözle bakarak" verilen cevaplar mülakatta çöker; bir takip sorusu geldiğinde dayanacak bir tanım gerekir. Üstelik alt sınır ispatları — sıralama makalesindeki n log n argümanı gibi — tanım olmadan yazılamaz bile.

## Big-O'nun formal tanımı

İşte tanım. f ve g fonksiyonlar olsun ve g negatif olmayan değerler alsın.

**Tanım.** f(n) = O(g(n)) demek, **öyle bir c > 0 sabiti ve öyle bir n₀ eşiği vardır ki**, her n ≥ n₀ için |f(n)| ≤ c · g(n) demektir.

Bu tanımın her parçası bir işe yarıyor. **c sabiti** sabit çarpanları görmezden gelmeyi sağlar: 100n² ile n²/2 aynı sınıfa düşer, çünkü aradaki fark bir c seçimiyle kapanır. **n₀ eşiği** küçük girdilerdeki istisnaları affeder: n = 1'de ne olduğu umurumuzda değildir, çünkü asimptotik analiz "girdi büyüdükçe" sorusunun cevabıdır. **Mutlak değer** f'nin negatif değerler aldığı durumları da kapsar; algoritma maliyetleri negatif olmadığı için pratikte fark etmez ama tanımı genel tutar.

Şimdi bu makaledeki en önemli cümle geliyor: **niceleyicilerin sırası değiştirilemez.** Mantık makalesinde "her/bazı" tuzaklarını konuşurken kurduğumuz kural burada teknik bir araca dönüşüyor. Tanım "**bir c vardır ki her n için**" biçimindedir. Sırayı ters çevirip "**her n için bir c vardır ki**" dersen ifade bütün anlamını kaybeder: verilen her n için c = f(n)/g(n) seçebilirsin ve iddia hiçbir bilgi taşımadan doğru çıkar. Yani yanlış sıralanmış bir niceleyici, tanımı totolojiye çevirir.

Sırayı doğru kurmanın pratik karşılığı şudur: c ve n₀, **n'den bağımsız** olarak, en baştan bir kez seçilir ve o eşikten sonrasının tamamı için çalışmak zorundadır. Mülakatta Big-O tanımını sorulduğunda cevabın omurgası bu bağımsızlıktır; "sabit bir kat" demek yetmez, sabitin girdiden bağımsız seçildiğini söylemek gerekir.

## Tanımdan yürüyen iki ispat

Tanımı ezberlemek yetmez; onu kullanabilmek gerekir. İki yönde de birer ispat yapalım.

**Olumlu ispat.** İddia: 3n² + 100n + 10 = O(n²).

Strateji, tanımın istediği iki tanığı — bir c ve bir n₀ — açıkça üretmektir. n ≥ 10 alalım. O bölgede 100n ≤ 10n² olur, çünkü her iki tarafı n'e bölünce 100 ≤ 10n çıkar ve bu n ≥ 10 için doğrudur. Yine n ≥ 10 için 10 ≤ n²'dir. Üç terimi toplarsak

3n² + 100n + 10 ≤ 3n² + 10n² + n² = 14n².

Demek ki c = 14 ve n₀ = 10 tanıklığı iddiayı ispatlıyor. Sayıyla denetleyelim: n = 10'da sol taraf 1.310, sağ taraf 1.400 — sağlanıyor. n = 9'da sol taraf 1.153, sağ taraf 1.134 — sağlanmıyor. Yani bu c için n₀ = 10 en küçük eşiktir ve eşiğin tanımda neden bulunduğu tam olarak burada görünür.

Tanıkların **tek olmadığına** dikkat et. c = 113 ve n₀ = 1 de işe yarar: n = 1'de iki taraf da 113'tür ve n büyüdükçe fark açılır. Yani eşiği küçültmek için sabiti büyütebilirsin ya da tersi. Tanım "bir c ve bir n₀ vardır" dediği için tek bir tanık bulmak yeterlidir; en iyi tanığı aramak gerekmez.

**Olumsuz ispat.** İddia: n² = O(n) **değildir**.

Burada ispat teknikleri makalesindeki iki refleks birden çalışır. Önce olumsuzlama: "vardır" ifadesinin değillemesi "her … için değil"dir, yani hiçbir (c, n₀) ikilisi işe yaramamalıdır. Sonra çelişkiyle ispat: varmış gibi başlayalım.

Diyelim ki öyle bir c > 0 ve n₀ var ki her n ≥ n₀ için n² ≤ c · n olsun. n pozitif olduğu için her iki tarafı n'e bölebiliriz ve **her n ≥ n₀ için n ≤ c** elde ederiz. Şimdi n = maks(n₀, ⌈c⌉ + 1) seçelim. Bu n, n₀'dan küçük değildir, dolayısıyla eşitsizliği sağlamalıdır; ama aynı zamanda c'den büyüktür. Çelişki. Demek ki böyle bir ikili yoktur.

Bu ispatın kalıbı bütün "O değildir" iddialarında aynıdır: tanımdaki eşitsizliği sadeleştir, sabit olması gereken bir şeyin n ile büyümek zorunda kaldığını göster, sonra o sabiti aşan bir n seç.

## Ω ve Θ: alt sınır ve sıkı sınır

Big-O yalnızca yukarıdan sınırlar. Karmaşıklık makalesinde uyarmıştık: n = O(n²) doğrudur ama n'in karesel olduğunu söylemez. Bu yüzden iki gösterim daha gerekir.

**Tanım.** f(n) = Ω(g(n)) demek, öyle bir c > 0 ve n₀ vardır ki her n ≥ n₀ için f(n) ≥ c · g(n) demektir. Yani Ω bir **alt sınırdır**.

**Tanım.** f(n) = Θ(g(n)) demek, hem f = O(g) hem de f = Ω(g) demektir. Açık yazılışıyla: öyle c₁, c₂ > 0 sabitleri ve öyle bir n₀ vardır ki her n ≥ n₀ için c₁ · g(n) ≤ f(n) ≤ c₂ · g(n). Yani Θ, f'yi g'nin iki katı arasına **sıkıştırır**; "sabit çarpan dışında eşit" demenin kısa yolu budur.

Üçünü tek bir resimde görmek en kalıcı olanıdır. Şekil 1 aynı f fonksiyonunu üç sınırla birlikte gösteriyor.

![Yatay eksende n, dikey eksende maliyet olan bir grafik. Ortada koyu bir eğri f(n) yükseliyor. Onun üstünde daha dik bir eğri c iki çarpı g(n) etiketiyle, altında daha yatık bir eğri c bir çarpı g(n) etiketiyle uzanıyor; iki eğrinin arasında kalan bant taralı ve içinde f'nin sıkıştığı yazıyor. Eksende sağa doğru bir yerde dikey kesikli bir çizgi var ve altında n sıfır yazıyor; bu çizginin solunda kalan bölge soluk taranmış ve üzerinde tanımın bu bölge hakkında hiçbir şey iddia etmediği not düşülmüş. Çizginin solunda f eğrisi bir yerde üst sınır eğrisinin üstüne çıkıyor ve bunun tanımı bozmadığı vurgulanıyor. Sağ üstte üç satırlık bir özet var: üst eğri tek başına O, alt eğri tek başına omega, ikisi birden theta](assets/o-omega-theta.svg "Şekil 1 — O, Ω ve Θ: iki sabit, bir eşik ve eşiğin solunda hiçbir iddia")

Şekildeki en öğretici ayrıntı, kesikli çizginin solundaki bölgedir. Orada f, üst sınırın üstüne çıkabilir ve bu tanımı bozmaz; çünkü tanım yalnızca n ≥ n₀ için konuşur. Asimptotik gösterimin küçük girdiler hakkında **hiçbir şey söylemediğini** anlamak, bu makalenin en pratik çıktısıdır.

Bir dil notu: Θ, "ortalama durum" demek değildir. Bu, mülakatta en sık karıştırılan iki eksenden biridir ve birazdan ayrı bir başlıkta ele alacağız.

## Limit testi ve küçük harfli akrabalar

Tanıklarla uğraşmadan iki fonksiyonu karşılaştırmanın pratik bir yolu var: oranlarının limitine bakmak.

f(n)/g(n) oranının n sonsuza giderken limitine bakalım. Limit **0** ise f, g'den kesinlikle yavaş büyür; buna **f(n) = o(g(n))** denir ve "küçük o" diye okunur. Limit **sıfırdan farklı sonlu bir sayı** ise f = Θ(g)'dir. Limit **sonsuz** ise f, g'den kesinlikle hızlı büyür; buna **f(n) = ω(g(n))** denir, "küçük omega". Küçük harfli gösterimler "kesinlikle" iddiasını taşır: o(g), O(g)'nin içindedir ama Θ(g) ile kesişmez.

Bu üç sonuç, karşılaştırmaların çoğunu tek satırda halleder. Elde tutmaya değer üç temel sonuç şunlardır: her 0 ≤ a < b için nᵃ = o(nᵇ); her ε > 0 için log n = o(nᵋ) — yani logaritma her kuvvet fonksiyonundan yavaştır; ve her a > 1, her b için nᵇ = o(aⁿ) — yani üstel, her polinomu geçer. Sayma makalesinde n! sayısının ne kadar hızlı büyüdüğünü hesaplarken bu sıralamanın somut hâlini zaten görmüştük; burada nedeni tek satıra iniyor.

Ama limit testinin bir sınırı var ve bunu bilmek iyi adayı ayırır: **limit var olmak zorunda değildir.** Örneğin f(n) = n · (2 + (−1)ⁿ) fonksiyonu, tek n'lerde n, çift n'lerde 3n değerini alır. f(n)/n oranı 1 ile 3 arasında salınır ve hiçbir limite yakınsamaz. Yine de f = Θ(n)'dir: c₁ = 1, c₂ = 3 ve n₀ = 1 tanıkları doğrudan tanımı sağlar. Yani limit testi **yeterli** koşuldur, gerekli değil. Limit yoksa tanıma dönmek gerekir.

> **Sesli anlat:** "Big-O'nun formal tanımını söyle ve bir örnekle ispatla. Doksan saniye."
>
> İyi bir cevabın omurgası: "f(n) = O(g(n)) demek, öyle bir c > 0 sabiti ve öyle bir n₀ eşiği vardır ki her n ≥ n₀ için f(n) ≤ c · g(n) demektir. Buradaki kritik nokta niceleyicilerin sırasıdır: c ve n₀ önce, n'den bağımsız olarak seçilir; sıra ters çevrilirse ifade her fonksiyon çifti için doğru olur ve hiçbir şey söylemez. Örnek: 3n² + 100n + 10 = O(n²). Tanık olarak c = 14 ve n₀ = 10 veririm. Gerekçe: n ≥ 10 iken 100n ≤ 10n² ve 10 ≤ n², dolayısıyla toplam 14n²'yi aşmaz. Tanıklar tek değildir; c = 113 ve n₀ = 1 de işe yarar. Ters yönde bir örnek de vereyim: n² = O(n) değildir, çünkü olsaydı n ≤ c her büyük n için geçerli olurdu ve c'yi aşan bir n seçmek çelişki verirdi. Ω aynı tanımın alt sınır hâlidir, Θ ise ikisinin birlikte sağlanmasıdır."

## Bir borcu kapatalım: log₂(n!) neden Ω(n log n)?

Tanımların hemen işe yaradığı bir yer var. Hash makalesinde ve sıralama makalesinde **karar ağacı** argümanını kurmuştuk: karşılaştırma modelinde çalışan bir algoritma bir ikili karar ağacıdır, yaprakları olası çıktılardır ve "en az L yapraklı bir ikili ağacın yüksekliği en az log₂ L'dir" adımını kullanmıştık. O adımı sezgiye bırakmıştık; şimdi iki parçaya ayırıp ikisini de kuralım.

**Birinci parça bir sayma lemmasıdır.** Yüksekliği h olan bir ikili ağacın en fazla 2ʰ yaprağı vardır. İspat, ağaçlar makalesinde kullandığımız yapısal tümevarımın aynısıdır: h = 0 ise ağaç tek düğümdür ve 1 = 2⁰ yaprağı vardır; h > 0 ise kökün iki alt ağacının yüksekliği en fazla h − 1'dir, dolayısıyla her biri en fazla 2ʰ⁻¹ yaprak taşır ve toplam 2ʰ'yi aşmaz. Karşıt tersini alırsak: L yapraklı bir ağaçta L ≤ 2ʰ, yani **h ≥ log₂ L**. Kullandığımız adım buydu.

**İkinci parça asimptotiktir** ve bu makalenin araçlarını istiyor. Sıralamada L ≥ n! olduğu için h ≥ log₂(n!) çıkıyordu; ama "log₂(n!)" tanıdık bir büyüme sınıfı değil. Sınıfa yerleştirelim.

Alt sınır için n! çarpımının **en büyük yarısına** bakmak yeter: n, n − 1, …, ⌈n/2⌉ çarpanlarının her biri en az n/2'dir ve bunlardan en az n/2 tane vardır, dolayısıyla n! ≥ (n/2)^(n/2). Logaritma alırsak log₂(n!) ≥ (n/2)·(log₂ n − 1). Şimdi tanıma uygun bir tanık üretelim: n ≥ 4 iken log₂ n ≥ 2 olduğu için log₂ n − 1 ≥ (log₂ n)/2'dir; buradan log₂(n!) ≥ (n/4)·log₂ n çıkar. Yani c = 1/4 ve n₀ = 4 tanıklarıyla **log₂(n!) = Ω(n log n)**.

Üst sınır daha kolaydır: n! çarpımının her çarpanı en fazla n olduğu için n! ≤ nⁿ ve log₂(n!) ≤ n·log₂ n, yani log₂(n!) = O(n log n). İkisi birlikte **log₂(n!) = Θ(n log n)** verir.

Sayılar da bunu doğruluyor. n = 10⁶ için log₂(n!) = 18.488.885 ve n·log₂ n = 19.931.569; oran 0,928. Kaba alt sınırımız (n/2)·log₂(n/2) = 9.465.784 ise gerçekten altta kalıyor. n = 1000 için oran 0,856, n = 10 için 0,656 — oran n büyüdükçe 1'e yaklaşıyor, yani üst sınır asimptotik olarak sıkı.

Sıralama makalesinde "sıkı hâli ve genel karar ağacı kuramı alt sınırlar makalesine ait" demiştik. O söz duruyor: burada kurulan şey, argümanın **asimptotik adımıdır**; karar ağacı kuramının kendisi bu fazın alt sınırlar makalesinde formalleşecek.

## Sabitler ne zaman yalan söyler

Asimptotik gösterim sabitleri ve eşikleri **bilerek** atar. Bu bir kusur değil, bir tasarım kararıdır; ama kararın bedelini bilmek gerekir. Tanımdaki n₀, keyfi biçimde büyük olabilir.

En bilinen örnek şu: 1000n mi küçüktür, n² mi? Asimptotik olarak 1000n kazanır, çünkü 1000n = o(n²). Ama iki fonksiyon tam olarak n = 1000'de kesişir; n = 100 iken 1000n = 100.000 ve n² = 10.000, yani n² dört kat küçüktür. Girdilerin hep 1000'in altında olduğu bir uygulamada "asimptotik olarak daha iyi" olan algoritma her zaman daha yavaş çalışır.

Daha uç bir örnek, logaritma ile küçük kuvvetleri karşılaştırır. log₂ n = o(n^0,1) doğrudur — logaritma her kuvvetten yavaştır. Ama kesişim n ≈ 10¹⁷,⁷ civarındadır. n = 10¹⁵'te log₂ n ≈ 49,8 iken n^0,1 ≈ 31,6'dır; yani logaritma hâlâ **daha büyüktür**. Ancak n = 10²⁰ dolayında sıralama tersine döner: 66,4'e karşı 100. Evrende o kadar çok girdi yok. Asimptotik olarak doğru olan bir cümle, pratikte hiçbir zaman geçerli olmayabilir.

Şekil 2 bu iki kesişimi ve büyüme sınıflarının sıralamasını bir arada gösteriyor.

![Solda bir grafik: yatay eksende n, dikey eksende maliyet. İki eğri var; biri doğrusal ve bin n etiketli, diğeri parabolik ve n kare etiketli. İki eğri n eşittir bin noktasında kesişiyor ve kesişim noktası işaretli. Kesişimin solunda n karenin altta kaldığı, sağında bin n'in altta kaldığı taranarak gösteriliyor; altta n yüz iken değerlerin yüz bin ve on bin olduğu yazıyor. Sağda dikey bir merdiven: aşağıdan yukarıya sabit, log n, kök n, n, n log n, n kare, n küp, iki üzeri n ve n faktöriyel basamakları sıralanmış; basamakların arasındaki oklarda küçük o bağıntısının geçerli olduğu belirtilmiş. Merdivenin altında üç kural yazıyor: a küçüktür b iken n üzeri a küçük o n üzeri b; her epsilon için log n küçük o n üzeri epsilon; a birden büyükken n üzeri b küçük o a üzeri n. En altta log iki n ile n üzeri sıfır virgül bir eğrilerinin ancak on üzeri on yedi virgül yedi civarında kesiştiği not düşülmüş](assets/buyume-siniflari-ve-kesisim.svg "Şekil 2 — Sabitlerin gizlediği kesişimler ve büyüme sınıflarının merdiveni")

Pratik sonuç şudur: asimptotik sınıf, algoritma seçiminin **birinci** kriteridir ama tek kriteri değildir. Sıralama makalesinde gerçek kütüphanelerin küçük dizilerde eklemeli sıralamaya devretmesinin nedeni tam olarak budur ve mülakatta bunu adıyla söyleyebilmek cevabı bir seviye yukarı taşır.

## Beş klasik hata

Asimptotik gösterimle yapılan hataların çoğu birkaç kalıba iner. Beşi mülakatta doğrudan yakalanır.

**"En az O(n²)" demek.** Big-O yalnızca üst sınırdır; "en az" ile birleştirilemez. Söylenmek istenen alt sınırsa doğru gösterim Ω(n²)'dir. Bu, cümlenin hangi sınırı iddia ettiğine dikkat etmemenin en sık görülen hâlidir.

**4ⁿ = O(2ⁿ) sanmak.** Taban 4, 2'nin yalnızca sabit bir katı olduğu için oran sabit kalır gibi görünür. Değildir: 4ⁿ / 2ⁿ = 2ⁿ ve bu sonsuza gider. Sabit çarpanlar üste taşındığında sabit kalmaz; n = 20 için oran zaten 1.048.576'dır.

**O(1)'leri toplamak.** Her sabit O(1)'dir, dolayısıyla 1 + 2 + ⋯ + n toplamı n tane O(1)'in toplamıdır, yani O(n)'dir — diye bir "ispat" kurulabilir. Yanlıştır: toplamdaki i **sabit değildir**, n ile birlikte büyür. Gerçek değer n(n + 1)/2 = Θ(n²)'dir; n = 100 için 5.050. Hata, sabit sayıda O ifadesi toplanabilirken n tanesinin toplanamayacağını görmemekten çıkar.

**Eşitlik işaretini ciddiye almak.** f = O(g) yazımı yerleşmiştir ama "=" burada bir denklik değildir; O(g) bir fonksiyon **sınıfıdır** ve doğrusu f ∈ O(g)'dir. Simetrik sanırsan şuna varırsın: 2n = O(n), demek ki O(n) = 2n; ayrıca n = O(n), demek ki n = 2n. Kural basittir: O ifadesi her zaman sağda durur.

**O ile en kötü durumu karıştırmak.** Bunlar **dik iki eksendir**. O, Ω ve Θ bir fonksiyonun büyüme sınıfını söyler; en iyi, en kötü ve ortalama durum ise o fonksiyonun hangi girdiler üzerinden tanımlandığını söyler. Dokuz kombinasyonun hepsi anlamlıdır: hızlı sıralamanın en kötü durum maliyeti Θ(n²), ortalama durum maliyeti Θ(n log n)'dir; ikisi de sıkı sınırdır. "Big-O en kötü durumdur" cümlesi yanlıştır ve bu ayrımı yapabilmek, karmaşıklık makalesinde açtığımız hesabın kapanışıdır.

> **Sesli anlat:** "Bir arkadaşın 'bu algoritma en az O(n log n)' diyor. Ne dersin? Altmış saniye."
>
> İyi bir cevabın omurgası: "Cümle bozuk, çünkü Big-O bir üst sınırdır ve 'en az' ifadesiyle birleşmez. Bir algoritmanın maliyeti O(n log n) ise, o maliyet yeterince büyük girdilerde n log n'in sabit bir katını **aşmaz** demektir. 'En az n log n' demek isteniyorsa doğru gösterim Ω(n log n)'dir. İkisi birden geçerliyse Θ(n log n) yazılır ve bu en bilgilendirici ifadedir. Aynı karışıklığın bir akrabası da Big-O'yu en kötü durumla eşitlemektir; bunlar farklı eksenlerdir. Hangi girdiyi seçtiğim en iyi, en kötü ya da ortalama durumu belirler; O, Ω ve Θ ise o seçimden çıkan fonksiyonun büyüme sınıfını belirler. Doğru cümle şöyle kurulur: 'bu algoritmanın en kötü durum maliyeti Θ(n log n)'dir.'"

## Mülakatta nasıl görünür

Asimptotik gösterim doğrudan sorulmaz; her cevabın içine gömülüdür. Ama iki soru sık sık açıkça gelir: "Big-O'nun tanımını söyler misin?" ve "Bu iki fonksiyondan hangisi daha hızlı büyür, neden?"

Birincisine cevap verirken üç şeyi söylemek gerekir: iki tanık (c ve n₀), eşitsizliğin yönü ve niceleyicilerin sırası. Sadece "sabit bir kat" demek, tanımı bilmediğini gösterir.

İkincisine cevap verirken önce limit testini dene, sonuç çıkmazsa tanıma dön. "nᵃ, nᵇ'den yavaş", "log her kuvvetten yavaş", "üstel her polinomdan hızlı" üçlüsü karşılaştırmaların büyük kısmını halleder. Kesişim noktasını da eklemek — "asimptotik olarak öyle ama pratikte n şu değeri geçene kadar tersi" — cevabı ayırt edici hâle getirir.

Takip zinciri genellikle şu üç halkadır: tanım → sınır durumu → trade-off. "Big-O nedir?" sorusundan sonra "peki Θ ile farkı ne?" gelir, ondan sonra da "asimptotik olarak daha iyi olan her zaman daha mı hızlıdır?" gelir. Üçüncü halkanın cevabı hayırdır ve gerekçesi bu makaledeki kesişim örnekleridir.

İngilizce karşılıklar hazır olmalıdır: *asymptotic notation*, *upper bound*, *lower bound*, *tight bound*, *big-O*, *big-Omega*, *big-Theta*, *little-o*, *little-omega*, *order of growth*, *threshold*, *constant factor*.

### Sırada ne var

Artık ölçüyü tanımladık. Sıradaki soru, o ölçüyü özyinelemeli algoritmalara nasıl uygulayacağımız.

Bu fazın ikinci makalesi **yinelemeleri** ele alıyor. Tümevarım makalesinde Hanoi kulelerinin T(n) = 2T(n − 1) + 1 bağıntısını kurmuş, sıralama makalesinde birleştirmeli sıralamanın T(n) = 2T(n/2) + Θ(n) bağıntısını yazmıştık; ikisini de çözmeden bıraktık. Sıradaki makale bu bağıntıları çözmenin üç yolunu kuruyor: tahmin edip tümevarımla doğrulama, bağıntıyı açarak deseni yakalama ve özyineleme ağacıyla seviye seviye toplama. Sonunda da bunların çoğunu tek hamlede halleden **Master Teoremi** geliyor — CMPE300'ün katalog tanımında adı geçen araç tam olarak budur. Orada, bu makalede kurduğumuz O, Ω ve Θ tanımları teoremin üç durumunu ayıran ölçütler olarak doğrudan iş görecek.

## Kaynakça

- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (ders notları), 13.7 (Asymptotic Notation) — Tanım 13.7.1 küçük o'nun limitle tanımı; Lemma 13.7.2 (a < b iken xᵃ = o(xᵇ)), Lemma 13.7.3 (log x = o(xᵋ)) ve Sonuç 13.7.4 (a > 1 iken xᵇ = o(aˣ)); Tanım 13.7.5 Big-O'nun lim sup ile verilmiş hâli ve limitin var olmadığı durumların neden kapsanması gerektiği (oran 3 ile 5 arasında salınan örnek); Tanım 13.7.9 Big-O'nun sabit ve eşikle verilen standart tanımı; Tanım 13.7.13 Theta; Tanım 13.7.15 Omega ve Tanım 13.7.16 küçük omega; 13.7.4 Pitfalls with Asymptotic Notation — üstel yanılgı (4ˣ = O(2ˣ) sanmak), sabit karışıklığı ve Σi = O(n) yanlış teoremi, eşitlik yanılgısı ve "O(f) = g yazmayacağız" kuralı, "en az O(n²)" ifadesinin neden hatalı olduğu ve doğrusunun Ω olması. MIT OpenCourseWare 6.042J. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 1.4 (Analysis of Algorithms) — çalışma süresinin ifade başına maliyet ve çalışma sıklığı çarpımıyla modellenmesi; tilde yaklaşımının tanımı (g(N) ~ f(N), oranın 1'e yakınsaması) ve düşük dereceli terimlerin atılması; büyüme mertebesi sınıflandırmasının N^b log^c N biçiminde toplanması; maliyet modelinin açıkça tanımlanması gereği; girdiye bağımlılıkla başa çıkmanın üç yolu — girdi modeli varsaymak, en kötü durum garantisi vermek ve rastgeleleştirme — ve amortize analizin işlem dizisi üzerinde en kötü durum garantisi vermesi. Addison-Wesley. [Bağlantı](https://algs4.cs.princeton.edu/14analysis/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 3. bölüm (Characterizing Running Times — O, Ω ve Θ gösterimlerinin formal tanımları ve asimptotik gösterimle çalışma kuralları). MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE300 — Analysis of Algorithms* (ders çıktıları "the theory of complexity analysis" ve "lower bound theory" başlıklarını içerir; bu makalenin resmî dayanağı odur). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe300/)
