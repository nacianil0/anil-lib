---
article_id: article_95fcd2e4-41da-4870-958a-7e1886a9a5e3
title: "Açgözlü Algoritmalar: Ne Zaman ve Neden Çalışır?"
slug: acgozlu-algoritmalar-ne-zaman-ve-neden-calisir
category: algorithms
level: advanced
reading_order: 21
summary: "Her adımda o an en iyi görünen seçimi yapan algoritmalar: aralık çizelgelemede denenen dört kuralın üçünün karşı örnekle çökmesi ve dördüncüsünün değişim argümanıyla ispatlanması. Açgözlünün iki koşulu — açgözlü seçim özelliği ve optimal altyapı — ve üç ispat kalıbı; para üstü, sırt çantası ve ağırlıklı çizelgelemede kuralın yanılması; Huffman kodlarının sayısal olarak çalışılmış bir örneği ve optimalliği."
tags:
  - acgozlu
  - degisim-argumani
  - huffman
  - aralik-cizelgeleme
  - karsi-ornek
content_hash: sha256:690a5792a6dcd41ad1507ec4ad69852f9b156eb777e722de5623b05f30122725
classification_version: 1
classification_batch: 6
---
## İleriye bakmayan algoritma

Böl ve yönet bir problemi parçalayarak çözüyordu. Şimdiki desen neredeyse zıddıdır: hiç parçalamaz, geriye de bakmaz. Girdiyi tek tek işler, her adımda o an en iyi görünen seçimi yapar ve o seçime bir daha dönmez. **Açgözlü (greedy)** algoritma, ileriye bakmadan çalışan miyop bir algoritmadır.

İskeleti üç satırdır. Basit bir kuralla bir öğe seç; bu seçimle bağdaşmayan öğeleri ele; kalanla aynı şeyi tekrarla. Bu kadar basit olması hem gücü hem tehlikesidir: mülakatta bir problem duyduğunda akla ilk gelen çözüm çoğu zaman açgözlüdür ve **çoğu zaman yanlıştır.** Bu makalenin işi ayırt etme ölçütünü kurmaktır — bir açgözlü kuralın doğru olduğu nasıl ispatlanır ve yanlış olduğu nasıl gösterilir?

## Aralık çizelgeleme: dört kural, üç yanlış

Kanonik problem şu: elimizde tek bir kaynak var — bir toplantı odası, bir laboratuvar cihazı, bir makine — ve n istek geliyor. i isteğinin başlangıç zamanı s(i), bitiş zamanı f(i) ve s(i) her zaman f(i)'den küçük. İki istek **bağdaşır (compatible)** demek, örtüşmemeleri demektir: ya f(i) ≤ s(j) ya da f(j) ≤ s(i). Amaç, birbiriyle bağdaşan **en büyük** istek altkümesini seçmek.

Açgözlü iskelet hazır; geriye tek soru kalıyor: hangi kuralla seçelim? Dört makul aday var ve mühendislik sezgisi üçünü de doğrular gibi durur.

**En erken başlayanı seç.** Şu örneğe bak: istekler [0, 10], [1, 2], [3, 4], [5, 6]. Kural en erken başlayan [0, 10] isteğini alır, kalan üçü de onunla çakıştığı için eler ve **1** istek çizelgeler. Oysa [1, 2], [3, 4], [5, 6] birlikte alınabilirdi: optimal **3**. Uzun bir isteğin erken başlaması, kuralı tek başına çökertiyor.

**En kısa süreni seç.** Uzunluk sorunsa süreyi ölçüt yapalım: [0, 5], [4, 6], [5, 10] örneğinde kural iki birimlik [4, 6] isteğini seçer, o da hem [0, 5] hem [5, 10] ile çakıştığı için ikisini birden eler ve **1** istek kalır. Oysa [0, 5] ile [5, 10] birlikte alınabilirdi: optimal **2**. Kısa bir istek, tam ortada durup iki uzun isteği birden öldürebiliyor.

**En az çakışanı seç.** Şimdi gerçekten akıllı görünen kural: her istek için kaç istekle çakıştığını say, en az çakışanı seç. Bu kural da çöker ama karşı örneği kurmak emek ister. Şu on bir isteği düşün: dördü birbiriyle bağdaşan [0, 4], [6, 10], [12, 16], [18, 22]; ilk ikisini kesen üç istek [2, 7], [3, 8], [1, 9]; son ikisini kesen üç istek [14, 19], [15, 20], [13, 21]; ve tam ortada duran [9, 13]. Çakışma sayıları sayılırsa ortadaki isteğin yalnızca **2** çakışması vardır — geri kalan her isteğin 3 ya da 4 çakışması var. Kural ortadakini seçer, o da [6, 10] ile [12, 16] isteklerini birden öldürür ve toplam **3**'te kalır. Oysa baştaki dördü birlikte alınabilirdi: optimal **4**.

**En erken biteni seç.** Dördüncü kural doğrudur ve birazdan ispatlayacağız. Sezgisi tek cümledir: kaynağı **en erken serbest bırakan** isteği almak, geriye kalan zamanı en büyük tutar. Şekil 1 dört kuralı yan yana koyuyor; ilk panelle son panel aynı örnek üzerinde çalışıyor ve sonuç 1'e karşı 3.

![Dört panelli bir şema; her panelde zaman ekseni boyunca yatay çubuklar olarak çizilmiş istekler var. Sol üst panelin başlığı en erken başlayanı seç, kötü. Dört çubuk var: sıfırdan ona uzanan uzun bir çubuk vurgulanmış, altındaki birden ikiye, üçten dörde ve beşten altıya uzanan üç kısa çubuk soluk. Altında açgözlü bir, optimal üç yazıyor. Sağ üst panelin başlığı en kısa süreni seç, kötü. Üç çubuk var: sıfırdan beşe, dörtten altıya ve beşten ona; ortadaki en kısa çubuk vurgulanmış, diğer ikisi soluk. Altında açgözlü bir, optimal iki yazıyor. Sol alt panelin başlığı en az çakışanı seç, kötü. Beş şeritte toplam on bir çubuk var; en alt şeritte birbiriyle bağdaşan dört çubuk, üstündeki üç şeritte bunları kesen altı çubuk ve en üst şeritte tam ortada duran tek bir çubuk; ortadaki çubuk vurgulanmış ve yanında iki çakışma yazıyor, ayrıca en alttaki dört çubuktan birinci ve dördüncüsü de vurgulanmış. Altında açgözlü üç, optimal dört yazıyor. Sağ alt panelin başlığı en erken biteni seç, doğru. Sol üst panelle aynı dört çubuk var ama bu kez üç kısa çubuk vurgulanmış ve uzun çubuk soluk. Altında açgözlü üç, optimal üç yazıyor. En altta not: ilk üç kural karşı örnekle çöker, dördüncüsü ispatlanabilir](assets/aralik-cizelgeleme-dort-kural.svg "Şekil 1 — Aynı iskelet, dört farklı seçim kuralı: üçü karşı örnekle çöküyor")

Buradaki asıl ders kuralların kendisi değil, **yöntemdir**. İspat teknikleri makalesinde kurduğumuz karşı örnek disiplini algoritma tasarımında tam olarak böyle görünür: bir açgözlü kural önerdiğinde ilk yapılacak şey onu övmek değil, üç dört adımlık küçük bir girdiyle **kırmayı denemektir**. Kırılmıyorsa ispata geçilir.

## Neden çalışır: iki özellik ve bir değişim

Açgözlü bir kuralın doğru olması iki özelliğe bağlıdır ve ikisinin adı mülakatta beklenir.

**Açgözlü seçim özelliği (greedy-choice property):** yerel olarak optimal olan bir seçim, küresel olarak da optimaldir. Yani ilk açgözlü seçimi içeren **bir** optimal çözüm vardır.

**Optimal altyapı (optimal substructure):** bir optimal çözümün içindeki alt problem çözümleri de kendi alt problemleri için optimaldir.

İkincisi böl-yönetten ve birazdan göreceğimiz dinamik programlamadan tanıdıktır; açgözlüyü ayıran birincisidir. Ve birincisi neredeyse her zaman **değişim argümanıyla (exchange argument)** ispatlanır: bir optimal çözüm al, onu adım adım açgözlünün çözümüne dönüştür ve her dönüşümde çözümün kötüleşmediğini göster.

En erken biten kuralı için ispat şöyle yürür. Önce kolay olan: algoritmanın çıktısı gerçekten bağdaşan bir kümedir — çünkü seçtiği her isteğin ardından onunla çakışan bütün istekleri eliyor; aksi hâlde ikinci adımın tanımıyla çelişki çıkar.

Asıl iddia optimalliktir ve tümevarımla ispatlanır. Optimal çözümün büyüklüğü k üzerinden gidelim. k = 1 durumu açıktır: tek bir istek yeterliyse açgözlü de bir istek seçer. Şimdi iddianın k için doğru olduğunu varsayalım ve optimal çözümü k + 1 istek olan bir L listesi verilsin; optimal çözüm sırasıyla j₁, j₂, …, j_{k+1} istekleri olsun.

Açgözlünün ilk seçtiği istek i₁'dir ve kural gereği f(i₁) ≤ f(j₁)'dir — çünkü açgözlü en erken biteni seçmiştir. Şimdi **değiştir**: optimal çözümde j₁ yerine i₁ koy. Yeni küme hâlâ bağdaşır, çünkü i₁ daha erken bittiği için j₂ ve sonrasındaki hiçbir istekle çakışmaz; büyüklüğü de yine k + 1'dir, yani **hâlâ optimaldir.** Bu, açgözlü seçimi içeren bir optimal çözümün var olduğunu gösterir: açgözlü seçim özelliği kanıtlanmıştır.

Geriye optimal altyapı kalıyor. i₁ seçildikten sonra elde kalan alt problem, başlangıcı f(i₁)'den erken olmayan isteklerdir. Değiştirilmiş optimal çözümün geri kalan k isteği bu alt problem için optimaldir; tümevarım hipotezine göre açgözlü de o alt problemde k istek seçer. Toplam k + 1 eder ve ispat kapanır.

Aynı ispatı önceki makalenin diliyle de okuyabilirsin ve bu okuma mülakatta çok işe yarar: açgözlü algoritmanın koruduğu **değişmez**, "şu ana kadar seçilen küme, bir optimal çözümün alt kümesidir" cümlesidir. Başlatma adımı boş kümeyle bedava gelir, koruma adımı yukarıdaki değişim argümanıdır, sonuçlanma adımı ise elde istek kalmadığında seçilen kümenin artık optimal çözümün kendisi olduğunu verir.

> **Sesli anlat:** "Bir açgözlü algoritmanın optimal olduğunu nasıl ispatlarsın? Doksan saniye."
>
> İyi bir cevabın omurgası: "İki şey göstermem gerekir. Birincisi açgözlü seçim özelliği: yaptığım ilk yerel seçimi içeren bir optimal çözümün var olduğunu ispatlarım. Bunu genellikle değişim argümanıyla yaparım — herhangi bir optimal çözümü alırım, içindeki ilk seçimi benimkiyle değiştiririm ve çözümün ne bağdaşmasının bozulduğunu ne de kötüleştiğini gösteririm. Aralık çizelgelemede bu tek satırdır: açgözlü en erken biteni seçtiği için f(i₁) ≤ f(j₁)'dir, dolayısıyla i₁'i j₁'in yerine koymak sonraki hiçbir isteği bozmaz. İkincisi optimal altyapı: seçimden sonra kalan alt problemin optimal çözümü, bütünün optimal çözümünün içinde olmalıdır; bunu kes-yapıştır argümanıyla gösteririm — daha iyi bir alt çözüm olsaydı onu yerine koyup bütünü iyileştirirdim, bu da optimalliğe aykırı olurdu. İkisi birleşince tümevarım yürür. Aynı ispatı döngü değişmezi diliyle de kurabilirim: değişmez, 'seçilen küme bir optimal çözümün alt kümesidir' olur ve koruma adımı değişim argümanının kendisidir."

## Nerede yanılır

Açgözlünün tehlikesi, doğru olduğu problemle yanlış olduğu problemin **birbirine çok benzemesidir**. Üç klasik örnek bunu gösteriyor.

**Ağırlıklı aralık çizelgeleme.** Aynı problem, tek fark: her isteğin bir w(i) ağırlığı var ve toplam ağırlığı en büyük yapan bağdaşan altkümeyi istiyoruz. Bu tek değişiklik açgözlüyü öldürür. En erken biten kısa bir istek, çok değerli bir uzun isteği elemeye değmeyebilir; hiçbir basit sıralama kuralı çalışmaz. Çözüm için alt problemleri saklayan bir yaklaşım gerekir.

**Para üstü.** Verilen bir tutarı en az sayıda madenî parayla ödemek istiyoruz. Açgözlü kural "sığan en büyük parayı ver" olur ve tanıdık sistemlerde çalışır: 1, 5, 10, 25 ve 50 kuruşluk paralarla üç yüz kuruşa kadar bütün tutarlarda açgözlü seçim optimaldir. Ama bu, kuralın değil **sistemin** özelliğidir. Paralar 1, 3 ve 4 birim olsaydı 6 birim için açgözlü 4 + 1 + 1 verirdi — üç para; oysa 3 + 3 iki parayla ödüyor. Aynı kural, aynı algoritma, farklı girdi ailesi: kural artık yanlış.

**Sırt çantası.** Kapasitesi 50 olan bir çantaya, ağırlık ve değerleri (10, 60), (20, 100) ve (30, 120) olan üç eşya koyacağız. Değer/ağırlık oranları sırasıyla 6, 5 ve 4. Eşyaları **bölebiliyorsan** — kesirli sırt çantası — açgözlü oran sırasıyla doldurur ve 60 + 100 + 80 = 240 ile optimali bulur. Eşyaları bölemiyorsan — 0/1 sırt çantası — aynı kural önce iki eşyayı alır, kalan 20 birime üçüncü sığmaz ve 160'ta kalır. Oysa ikinci ile üçüncü eşyayı almak tam 50 ağırlık ve **220** değer verir. Bölünebilirlik gibi masum görünen bir varsayım, açgözlüyü optimalden düşürüyor.

Ortak ders şudur: açgözlü kuralın doğruluğu kuralın kendisinde değil, **problemin yapısındadır**. Mülakatta "açgözlü yaparım" demek yetmez; "şu yapı sağlandığı için açgözlü doğru" ya da "şu karşı örnek yüzünden açgözlü yanlış" demek gerekir.

## Huffman kodları

Açgözlünün en güzel başarısı bir sıkıştırma problemidir. Bir metni ikili olarak kodlayacağız. Sabit uzunluklu kod, R simgelik bir alfabe için simge başına ⌈lg R⌉ bit harcar ve simgelerin farklı sıklıkta geçmesini kullanmaz. Değişken uzunluklu kod kullanmak istiyorsak bir sorun çıkar: ayırıcı işaret koymadan çözebilmeliyiz. Çözüm **önek-serbest (prefix-free)** kodlardır: hiçbir kod sözcüğü bir başkasının öneki olmayacak. Örneğin {01, 10, 0010, 1111} önek-serbesttir, {01, 10, 0010, 1010} değildir çünkü 10, 1010'un önekidir.

Önek-serbest bir kod, yaprakları simgeler olan bir ikili ağaçtır; sola inmek 0, sağa inmek 1 demektir ve bir simgenin kod uzunluğu derinliğidir. Amaç, frekanslar verildiğinde **toplam bit sayısını en küçük** yapan ağacı bulmaktır.

Huffman'ın açgözlü kuralı tek satırdır: **en seyrek iki simgeyi al, birleştir ve frekansları toplamı olan tek bir simge gibi davran; tekrarla.** Her adımda en küçük iki frekansı çekmek gerektiği için doğal veri yapısı bir öncelik kuyruğudur — heap makalesinde kurduğumuz arayüz burada tam olarak iş görüyor. Algoritmayı 1950'de, MIT'de öğrenciyken David Huffman bulmuştur.

Sayısal bir örnek yürütelim. Yüz simgelik bir metinde frekanslar A: 34, E: 25, N: 15, R: 12, I: 9, S: 5 olsun. Birleştirme sırası şöyle gider: önce S (5) ile I (9) birleşir ve 14 olur; sonra R (12) ile bu 14 birleşir ve 26 olur; sonra N (15) ile E (25) birleşip 40 olur; sonra 26 ile A (34) birleşip 60 olur; en son 40 ile 60 birleşip kök 100 olur. Ortaya çıkan kodlar N = 00, E = 01, A = 11, R = 100, S = 1010, I = 1011'dir.

Maliyeti hesaplayalım: 34·2 + 25·2 + 15·2 + 12·3 + 9·4 + 5·4 = 68 + 50 + 30 + 36 + 36 + 20 = **240 bit**. Altı simgelik alfabe için sabit uzunluklu kod ⌈lg 6⌉ = 3 bit ister, yani 300 bit. Kazanç **%20** ve simge başına ortalama uzunluk 2,40 bittir. Şekil 2 ağacı ve tabloyu gösteriyor.

![Solda bir ikili ağaç, sağda bir tablo. Ağacın kökünde yüz yazıyor. Kökten sola inen dal kırk değerli bir iç düğüme, sağa inen dal altmış değerli bir iç düğüme gidiyor. Kırk düğümünün soldaki yaprağı N on beş, sağdaki yaprağı E yirmi beş. Altmış düğümünün sol dalı yirmi altı değerli bir iç düğüme, sağ dalı A otuz dört yaprağına gidiyor. Yirmi altı düğümünün sol yaprağı R on iki, sağ dalı on dört değerli bir iç düğüme gidiyor; onun da sol yaprağı S beş, sağ yaprağı I dokuz. Bütün sol dallar sıfır, bütün sağ dallar bir ile etiketli. Sağdaki tabloda simge, frekans, kod ve bit sütunları var: A otuz dört, kod bir bir, altmış sekiz bit; E yirmi beş, kod sıfır bir, elli bit; N on beş, kod sıfır sıfır, otuz bit; R on iki, kod bir sıfır sıfır, otuz altı bit; I dokuz, kod bir sıfır bir bir, otuz altı bit; S beş, kod bir sıfır bir sıfır, yirmi bit. Toplam yüz simge ve iki yüz kırk bit. Altında sabit uzunluklu kodun simge başına üç bitle üç yüz bit ettiği, kazancın yüzde yirmi olduğu ve ortalama kod uzunluğunun iki virgül kırk bit olduğu yazıyor. En altta not: birleştirme sırası S artı I, sonra R, sonra N artı E, sonra A biçimindedir ve her adımda en seyrek iki düğüm birleştirilir](assets/huffman-agaci.svg "Şekil 2 — Huffman ağacı: en seyrek iki simgeyi birleştirmek 300 biti 240 bite indiriyor")

Bu kuralın optimal olduğu — yani hiçbir önek-serbest kodun daha az bit harcamadığı — ispatlanmıştır. Açgözlü seçim özelliği burada şu biçimi alır: en seyrek iki simgenin ağacın **en derin seviyesinde kardeş** olduğu bir optimal ağaç vardır. Sezgisi basittir; en seyrek simgeler en uzun kodu almalıdır ve en derin seviyedeki iki yaprak zaten kardeştir, dolayısıyla onları yer değiştirerek maliyeti artırmadan istediğimiz biçime getirebiliriz. Optimal altyapı ise şudur: iki simgeyi tek bir birleşik simgeyle değiştirdiğinde, küçülmüş alfabe için optimal olan ağaç, geri açıldığında özgün alfabe için de optimaldir.

Bir incelik mülakatta güzel bir takip sorusudur: **her optimal önek-serbest kod bir Huffman kodu değildir.** Frekanslar A: 26, B: 24, C: 14, D: 13, E: 12, F: 11 olsun. Huffman 250 bitlik bir kod üretir. Ama A = 00, B = 01, C = 100, D = 101, E = 110, F = 111 kodu da tam 250 bit harcar ve dolayısıyla o da optimaldir — oysa bu kodda A ile B **aynı bitle başlar** ve Huffman ağacında bu imkânsızdır, çünkü en seyrek iki simge (E ve F) kardeş olmak zorundadır. Optimal çözüm tek değildir; açgözlü kural onlardan **birini** bulur.

Son bir uyarı: aynı problemi yukarıdan aşağıya çözmek — simgeleri frekansları kabaca eşit iki gruba bölüp özyinelemeye girmek — Shannon ve Fano'nun önerdiği yöntemdir ve **optimal değildir.** Huffman'ı çalıştıran şey aşağıdan yukarıya, en seyrekten başlayan sıradır.

## Üç ispat kalıbı

Açgözlü savunmasında tekrar tekrar karşına çıkacak üç kalıp var; üçünü de adıyla bilmek gerekir.

**Değişim argümanı.** Bir optimal çözümü al ve açgözlünün seçimini içerecek biçimde değiştir; değişimin çözümü kötüleştirmediğini göster. Aralık çizelgelemede ve Huffman'da kullandığımız kalıp budur. Graf ve ağaç makalesinde tanıştığımız ekstremal argümanın algoritmik yüzüdür: "en erken biten", "en seyrek iki simge" gibi uç bir eleman seçilir ve ispat onun üzerine kurulur.

**Açgözlü önde kalır.** Her adımdan sonra açgözlünün kısmi çözümünün, başka herhangi bir çözümün aynı boyuttaki kısmi hâlinden geride olmadığını göster. Aralık çizelgelemede bu, açgözlünün r'inci seçtiği isteğin bitiş zamanının, herhangi bir çözümün r'inci isteğinin bitiş zamanından küçük ya da eşit olduğu biçimini alır.

**Kes ve yapıştır.** Optimal altyapıyı ispatlamanın standart yoludur: bir optimal çözümün içindeki alt çözüm optimal olmasaydı, onu daha iyisiyle değiştirip bütünü iyileştirirdin — bu da bütünün optimal olduğu varsayımıyla çelişir.

Dördüncü bir araç da her zaman elinin altındadır ve çoğu zaman en hızlısıdır: **karşı örnek.** Bir kuralı bir iki dakikada ispatlayamıyorsan, üç dört elemanlı küçük girdilerle kırmayı dene. Yukarıdaki üç yanlış kuralın karşı örnekleri de dört ya da on bir istekle kurulmuştu.

## Mülakatta nasıl görünür

Açgözlü bir çözüm önerdiğinde beklenen sıra sabittir. Kuralı tek cümlede söyle. Sonra ya ispatla — açgözlü seçim özelliği ve optimal altyapı, değişim argümanıyla — ya da doğrudan "bu kuralın doğru olduğundan emin değilim, karşı örnek arayayım" de ve arayışı sesli yap. İkisi de kabul edilebilir cevaplardır; kabul edilmeyen, ispatsız iddiadır.

Dört tipik hata var. Kuralı ispatlamadan "açgözlü çalışır" demek. Problemin küçük bir varyantının kuralı bozduğunu fark etmemek — ağırlık eklemek, bölünebilirliği kaldırmak, para sistemini değiştirmek. Optimal altyapıyı açgözlü seçim özelliğiyle karıştırmak; ikisi ayrı iddialardır ve dinamik programlama yalnızca ikinciyi ister. Ve açgözlünün "yaklaşık" bir yöntem olduğunu sanmak; doğru problemde açgözlü tam olarak optimaldir, üstelik çoğu zaman en hızlı çözümdür.

İngilizce karşılıklar hazır olmalıdır: *greedy algorithm*, *greedy-choice property*, *optimal substructure*, *exchange argument*, *greedy stays ahead*, *cut and paste*, *interval scheduling*, *compatible*, *prefix-free code*, *fractional knapsack*.

### Sırada ne var

Bu makalede açgözlünün çöktüğü üç yer gördük ve üçünde de aynı şey oldu: doğru cevabı bulmak için **birden fazla olasılığı aynı anda taşımak** gerekiyordu. Ağırlıklı aralık çizelgelemede bir isteği almak ile almamak arasındaki karar, ancak ikisinin de sonuçları hesaplandıktan sonra verilebilir.

Böl ve yönet makalesinde de bir çöküş görmüştük: naif Fibonacci özyinelemesi, aynı alt problemi milyonlarca kez çözüyordu çünkü alt problemler **örtüşüyordu**. Sıradaki makale bu iki çöküşün aynı çözüme baktığını gösteriyor. Her alt problemi bir kez çöz ve sakla; sonra ihtiyaç duyduğunda hesaplama, hatırla. Bu desenin adı **dinamik programlamadır** ve iki yüzü vardır: yukarıdan aşağı bellekleme ile aşağıdan yukarı tablolama. Mülakatın en klasik takip sorusu da orada karşımıza çıkacak: "bunu açgözlüyle çözemez miydin?"

## Kaynakça

- Demaine, E., Devadas, S. & Lynch, N. *6.046J Design and Analysis of Algorithms*, Lecture 1: Introduction — aralık çizelgeleme probleminin tanımı (n istek, tek kaynak, s(i) ve f(i), bağdaşma koşulu f(i) ≤ s(j) ya da f(j) ≤ s(i), amaç en büyük bağdaşan altküme); açgözlü algoritmanın "ileriye bakmadan girdiyi parça parça işleyen miyop algoritma" tanımı ve üç adımlı iskeleti; dört seçim kuralının denenmesi (en erken başlayan, en kısa süren, en az çakışan — üçü de "Bad" olarak işaretli — ve en erken biten); çıktının bağdaşan bir zincir olduğunun çelişkiyle ispatı (Sav 1); en erken biten kuralının optimalliğinin k üzerinden tümevarımla ve f(i₁) ≤ f(j₁) değişimiyle ispatı (Sav 2); ağırlıklı aralık çizelgelemede "açgözlü algoritma artık çalışmaz" tespiti ve dinamik programlamaya geçiş. MIT OpenCourseWare, Bahar 2015. [Bağlantı](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/pages/lecture-notes/)
- Leiserson, C. E. *6.046J Introduction to Algorithms (SMA 5503)*, Lecture 16: Greedy Algorithms (and Graphs) — açgözlü algoritmaların "hallmark"ının açgözlü seçim özelliği olarak adlandırılması ("a locally optimal choice is globally optimal"); optimal altyapının kes-yapıştır argümanıyla ispatı; örtüşen alt problem varlığında dinamik programlamanın da uygulanabileceği, ancak açgözlü seçim özelliğinin daha verimli bir algoritma verdiği; değişim (swap) argümanının kanonik kullanımı. MIT OpenCourseWare, Güz 2005. [Bağlantı](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/pages/lecture-notes/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 5.5 (Data Compression) — sabit uzunluklu kodun R simge için ⌈lg R⌉ bit istemesi; değişken uzunluklu kodlarda tek anlamlı çözülebilirlik ihtiyacı ve önek-serbest kodların tanımı ({01, 10, 0010, 1111} önek-serbesttir, {01, 10, 0010, 1010} değildir); Huffman kodlarının optimal önek-serbest kodları kurması, algoritmanın David Huffman tarafından 1950'de MIT'de öğrenciyken bulunması ve Önerme A: hiçbir önek-serbest kod daha az bit kullanmaz; alıştırmalarda kaydedilen iki incelik: her optimal önek-serbest kod bir Huffman kodu değildir (A 26, B 24, C 14, D 13, E 12, F 11 örneği) ve Shannon-Fano'nun yukarıdan aşağı bölme yönteminin optimal olmaması. Addison-Wesley. [Bağlantı](https://algs4.cs.princeton.edu/55compression/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 15. bölüm (Greedy Algorithms) — açgözlü stratejinin genel çerçevesi, açgözlü seçim özelliği ile optimal altyapının tanımları, etkinlik seçimi problemi, kesirli ve 0/1 sırt çantası karşılaştırması ve Huffman kodları. MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE300 — Analysis of Algorithms* (ders çıktıları "basic classes of algorithms (comparison-based, recursive, divide-and-conquer, dynamic, greedy, numerical, graph)" ifadesini içerir; bu makalenin resmî dayanağı odur). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe300/)
