---
article_id: article_13f4a74b-8d5b-4363-a38d-2db536b3cd53
title: "Graflar ve Ağaçlar: Tanımlar ve İlk İspatlar"
slug: graflar-ve-agaclar-tanimlar-ve-ilk-ispatlar
category: discrete-math
level: intermediate
reading_order: 7
summary: "Bilgisayar mühendisliğinin en çok kullandığı yapıyı kurar: düğüm, kenar ve derece tanımları, el sıkışma lemmasının sayma refleksiyle ispatı ve tek dereceli düğüm sonucu, yürüyüş/yol/döngü/bağlılık dili, ağaçların yapısal tümevarımla kurulan üç denk karakterizasyonu ve kapsayan ağaç."
tags:
  - graf
  - agac
  - derece
  - el-sikisma-lemmasi
  - kapsayan-agac
content_hash: sha256:58991b594768267cfc7cb8450ead5ce05020b0b64ae6d098bc11bc6a5583f926
classification_version: 1
classification_batch: 2
---
## Neden graf dili?

Önceki iki makalede iki ayrı araç kurduk: bağıntı dili (nesneler arasındaki ilişkileri konuşmak) ve sayma refleksi (bir koleksiyonun büyüklüğünü savunmak). Bu makalede ikisi aynı masada buluşuyor. **Graf (graph)**, bir küme üzerindeki simetrik bir bağıntının çizilmiş hâlidir; graf hakkındaki ilk teoremlerin ispatı ise neredeyse tamamen saymadır.

Graf dilini bilmek mülakat açısından pahalı bir yatırım değil, zorunlu bir yatırımdır. Bilgisayar ağı, sosyal ağ, derleyicinin bağımlılık çözümü, işletim sisteminin kilitlenme tespiti, veri tabanı sorgu planı, dosya sistemindeki dizin ağacı, ikili arama ağacı, öncelik kuyruğunun altındaki heap — hepsi graf ya da graf özel hâlidir. "Bu problemi grafa çevirirsem ne olur?" sorusu, mülakatta en çok işe yarayan tek cümlelik hamledir.

Bu makale iki şey öğretiyor: kesin tanımlar ve o tanımların üzerine kurulan ilk ispatlar. Tanımları bilmeden ispat kurulamaz, ispatı görmeden de tanımların neden tam olarak öyle yazıldığı anlaşılmaz.

## Düğüm, kenar, derece

Bir **basit graf (simple graph)** iki şeyden oluşur: boş olmayan sonlu bir **düğüm (vertex, eş anlamlısı node)** kümesi V ve düğümlerin ikili alt kümelerinden oluşan bir **kenar (edge)** kümesi E. Bir kenarın iki ucu (endpoint) vardır; aynı kenarla bağlanan iki düğüme **komşu (adjacent)** denir.

Tanımın iki sonucu doğrudan gelir ve mülakatta sorulur. Kenar iki *farklı* düğümün kümesi olduğu için bir düğümden kendine giden kenar — **ilmek (self-loop)** — basit grafta yoktur. Kenarlar bir *küme* oluşturduğu için aynı iki düğüm arasında iki kenar da yoktur; buna izin veren yapıya **çoklu graf (multigraph)** denir. Bu makalede "graf" dediğimizde basit grafı kastediyoruz.

Bir düğümün **derecesi (degree)**, ona değen kenarların sayısıdır ve derece(v) diye yazılır. Derece sıfır olabilir: hiçbir kenara değmeyen düğüm yalıtıktır.

Kenarların yönü olduğunda yapı **yönlü graf (directed graph, digraph)** olur ve kenarlar sıralı ikililere döner. Bu, önceki makaledeki bağıntı tanımının aynısıdır: bir kümedeki ikili bağıntı ile yönlü graf aynı nesnenin iki adıdır. Simetrik bağıntı yönsüz grafa, yansımalı olmayan ve döngüsüz bir bağıntı ise bir bağımlılık grafına karşılık gelir. Bu yazıda yönsüz graflarla çalışacağız.

İki graf ailesi sık sık isimleriyle anılır. **Tam graf (complete graph)** Kₙ, n düğümün her ikilisi arasında kenar taşır; kenar sayısı doğrudan önceki makaledeki sayma sonucudur: C(n, 2) = n(n − 1) / 2. Beş düğümlü K₅'in on kenarı vardır. **Döngü grafı (cycle graph)** Cₙ ise n düğümü tek bir halka hâlinde dizer ve n kenarı vardır.

## El sıkışma lemması

Şimdi grafın ilk teoremini kuruyoruz ve ispat tamamen bir sayma hamlesidir.

**El sıkışma lemması (handshaking lemma).** Bir grafta bütün düğümlerin derecelerinin toplamı, kenar sayısının iki katıdır.

**İspat.** Aynı koleksiyonu iki farklı yoldan sayıyoruz: "uç" koleksiyonunu, yani (düğüm, o düğüme değen kenar) çiftlerini. Düğümler üzerinden saydığımızda her düğüm kendi derecesi kadar çift üretir, toplam derecelerin toplamıdır. Kenarlar üzerinden saydığımızda her kenar tam iki uç üretir — iki ucu vardır — toplam 2·|E| olur. Aynı koleksiyonun iki sayımı eşit olmak zorundadır.

Adı buradan gelir: bir partide herkesin kaç kişiyle tokalaştığını toplarsan, sonuç gerçekleşen tokalaşma sayısının iki katıdır; çünkü her tokalaşma iki kişi tarafından sayılır. Şekil 1 bunu küçük bir graf üzerinde gösteriyor.

![Solda beş düğümlü bir graf; her düğümün yanında derecesi yazılı ve dereceler toplamı 12 ile kenar sayısı 6 karşılaştırılıyor. Sağda her kenarın iki uç ürettiğini gösteren sayma argümanı ve tek dereceli düğüm sayısının neden çift olmak zorunda olduğunu gösteren pariteli toplam](assets/el-sikisma-lemmasi.svg "Şekil 1 — El sıkışma lemması ve tek dereceli düğüm sonucu")

Lemma tek başına küçük görünür ama hemen bir sonuç doğurur ve o sonuç mülakatta doğrudan sorulur.

**Sonuç (corollary).** Her grafta derecesi tek olan düğümlerin sayısı çifttir.

**İspat.** Düğümleri iki gruba ayır: derecesi çift olanlar ve tek olanlar. Bütün derecelerin toplamı 2·|E| olduğuna göre çift bir sayıdır. Çift dereceli düğümlerin katkısı da çifttir. Dolayısıyla tek dereceli düğümlerin dereceleri toplamı çift olmak zorundadır. Tek sayıların toplamının çift olması ancak tek sayıda terim yoksa, yani terim sayısı çiftse mümkündür.

**Problem.** Yedi kişilik bir grupta herkesin tam olarak üç arkadaşı olabilir mi? (Arkadaşlık karşılıklıdır.)

**Strateji.** Grubu grafa çevir: kişiler düğüm, arkadaşlıklar kenar. İddia, her düğümün derecesinin 3 olmasıdır. Derece toplamına bak.

**Adımlar.** Yedi düğümün her birinin derecesi 3 ise derecelerin toplamı 21'dir. El sıkışma lemmasına göre bu toplam 2·|E| olmalı, yani çift olmalıdır. 21 tektir. Böyle bir graf yoktur.

**Savunma.** Burada yaptığımız şey bir sayma çelişkisidir ve genel kalıbı şudur: tek dereceli düğüm sayısı (yedi tane) tek olduğu için sonuç zaten imkânsızdı. Aynı argüman "on düğümlü, her düğümün derecesi 3 olan bir graf var mı?" sorusunda çelişki üretmez — toplam 30, kenar sayısı 15 çıkar — ve gerçekten böyle graflar vardır. Lemma bir varlık kanıtı değildir; yalnızca *imkânsızlığı* ucuza gösterir. Bir mülakatta "olamaz" demek "olur" demekten çok daha kolay savunulur, çünkü elinde tek satırlık bir parite argümanı vardır.

> **Sesli anlat:** "El sıkışma lemmasını bir cümlede söyle ve tek dereceli düğüm sayısının neden çift olduğunu altmış saniyede açıkla."
>
> İyi bir cevabın omurgası: "Derecelerin toplamı kenar sayısının iki katıdır, çünkü her kenar tam iki uca sahiptir ve derece toplamı bu uçları sayar. Buradan şu çıkar: toplam çift bir sayıdır. Çift dereceli düğümler toplama çift katkı verir, dolayısıyla tek dereceli düğümlerin katkısı da çift olmak zorundadır; tek sayıların toplamı ancak çift sayıda tek terim varsa çift olur. Pratik faydası, imkânsızlık iddialarını bir satırda göstermesidir: yedi kişinin her birinin tam üç arkadaşı olduğu bir ağ kurulamaz."

## Yürüyüş, yol, döngü, bağlılık

Graf üzerinde hareket etmenin dili üç kelimeyle kurulur ve bu üçünün farkı sınav sorusudur.

**Yürüyüş (walk)**, birbirini izleyen kenarlardan oluşan bir düğüm dizisidir; düğümler ve kenarlar tekrarlanabilir. Uzunluğu, içindeki kenar sayısıdır. **Yol (path)**, bütün düğümleri farklı olan bir yürüyüştür. **Döngü (cycle)** ise en az üç düğümlü, başladığı düğümde biten ve bunun dışında düğüm tekrarı olmayan kapalı bir yürüyüştür.

İki düğüm, aralarında bir yol varsa **bağlıdır (connected)**; her düğüm kendine sıfır uzunluklu yolla bağlıdır. Grafın kendisi, düğümlerinin her ikilisi bağlıysa bağlıdır. Bağlı olmayan bir graf, kendi içinde bağlı parçalara ayrılır; bunlara **bağlı bileşen (connected component)** denir. Bir graf, tam olarak bir bağlı bileşeni varsa bağlıdır.

Bu tanımların pratik karşılığı doğrudandır: bir ağın bağlı olması "her makineden her makineye erişilebilir" demektir, bileşen sayısı ise ağın kaç yalıtık adaya bölündüğünü söyler. Bileşenleri bulmanın algoritması graf dolaşmaları makalesinin konusu olacak; burada tanımı ve neden bu tanımın seçildiğini kuruyoruz.

Tanımda gizlenen bir incelik var: bağlılık bir **denklik bağıntısıdır**. Her düğüm kendine bağlıdır (yansımalı), u'dan v'ye yol varsa tersi de vardır (simetrik), u'dan v'ye ve v'den w'ye yol varsa birleştirip u'dan w'ye bir yürüyüş elde edersin ve tekrar eden düğümleri kesip atarak yol yaparsın (geçişli). Önceki makalede kurduğumuz teoremi hatırla: bir denklik bağıntısı kümeyi parçalara ayırır. Bağlı bileşenler tam olarak o parçalardır. Yeni bir teorem ispatlamamıza gerek kalmadı; eski teoremi tanıdık.

## Ağaçlar ve yapraklar

Döngüsü olmayan graf **orman (forest)**, bağlı ve döngüsüz graf ise **ağaç (tree)** diye adlandırılır. Bir ormanın her bağlı bileşeni tanım gereği bir ağaçtır. Ağaçta derecesi 1 olan düğüme **yaprak (leaf)** denir.

Ağaç, bilgisayar mühendisliğinin en çok kullandığı yapıdır çünkü iki şeyi aynı anda verir: her düğüme erişilebilir (bağlı) ve fazlalık yoktur (döngüsüz). Dosya sistemi, sözdizim ağacı, ikili arama ağacı, heap ve karar ağacı bu iki özelliğin üzerine kurulur.

İlk teoremi tümevarımla kuracağız. Sayaç düğüm sayısı olacak, ama tümevarım adımı sayıyı bir azaltmakla değil **yapıyı küçültmekle** yürüyecek: bir yaprağı silip elinde kalan şeyin yine bir ağaç olduğunu göstererek. Tümevarım makalesinde söz verdiğimiz yapısal kalıp tam olarak budur. Ama önce bir yardımcı sonuca ihtiyacımız var, çünkü tümevarım adımı bir yaprağı silmeye dayanıyor ve silinecek yaprağın var olduğunu bilmemiz gerekiyor.

**Lemma.** En az iki düğümü olan her ağacın en az iki yaprağı vardır.

**İspat (en uzun yol argümanı).** Graf sonlu olduğu için en uzun yol vardır; ona v₀, v₁, …, v_k diyelim. Ağaç bağlı ve en az iki düğümlü olduğundan en az bir kenarı vardır, yani k ≥ 1. Uçtaki v₀'ın derecesinin 1 olduğunu gösterelim. Diyelim ki v₀'ın v₁ dışında bir komşusu u var. İki durum mümkündür. u yol üzerinde değilse, u'yu başa ekleyerek daha uzun bir yol elde ederiz; bu, yolun en uzun olmasıyla çelişir. u yol üzerindeyse, diyelim u = v_i (i ≥ 2), o zaman v₀'dan v_i'ye giden yol parçası ile v_i'den v₀'a giden kenar bir döngü kapatır; bu da ağacın döngüsüz olmasıyla çelişir. Demek ki v₀'ın tek komşusu vardır ve yapraktır. Aynı argüman v_k için de geçerlidir; iki uç farklı düğüm olduğuna göre en az iki yaprak vardır.

Bu ispatın adı **ekstremal argümandır**: "en uzun", "en küçük", "en ağır" olan nesneyi seç ve onun uç olmasından çelişki türet. Sayma ve tümevarımın yanına koyabileceğin üçüncü bir ispat refleksidir; ilerideki açgözlü algoritma ve alt sınır tartışmalarında tekrar karşına çıkacak.

## Ağacın kenar sayısı: yapısal tümevarım

**Teorem.** n düğümlü her ağacın tam olarak n − 1 kenarı vardır.

**İspat (düğüm sayısı üzerinden tümevarım; adım yapısaldır).** İddiamız P(n): "n düğümlü her ağacın n − 1 kenarı vardır."

**Taban durumu.** n = 1 için ağaç tek bir düğümdür, kenarı yoktur ve 1 − 1 = 0.

**Tümevarım adımı.** P(n)'in doğru olduğunu varsayalım ve n + 1 düğümlü bir T ağacı alalım. n + 1 ≥ 2 olduğu için yukarıdaki lemma gereği T'nin bir yaprağı vardır; ona v diyelim. v'yi ve ona değen tek kenarı silelim.

Kalan grafın hâlâ bir ağaç olduğunu göstermemiz gerekiyor. Döngüsüzlük kolay: alt grafta yeni döngü doğmaz. Bağlılık için şunu görmek yeterlidir: kalan iki düğüm arasındaki bir yol, v'den geçseydi v'ye girip çıkması gerekirdi, yani v'nin derecesi en az 2 olurdu; oysa v bir yapraktır. Demek ki kalan düğümler arasındaki yollar v'yi hiç kullanmıyordu ve silmek onları bozmaz.

Kalan ağacın n düğümü vardır, dolayısıyla tümevarım hipotezine göre n − 1 kenarı vardır. v'yi ve kenarını geri koyduğumuzda T'nin kenar sayısı n olur ve n = (n + 1) − 1. P(n + 1) doğrudur.

Bu ispat, tümevarım makalesindeki kalıbın graf hâlidir: bir nesneyi *kendisinden küçük aynı türden bir nesneye* indirgersin, orada tümevarım hipotezini kullanırsın, sonra geri kurarsın. İndirgemenin geçerli olduğunu — yani silme işleminden sonra elinde hâlâ bir ağaç olduğunu — göstermeyi atlamak, bu tür ispatlarda en sık yapılan hatadır.

Teorem elimize geçtiğine göre yaprak lemmasının sayma hâlini de kurabiliriz ve bu, sayma refleksinin ne kadar ucuz olduğunu gösterir: n ≥ 2 düğümlü bir ağaçta derecelerin toplamı, el sıkışma lemmasına göre 2(n − 1) = 2n − 2'dir. Bağlı olduğu için hiçbir derece sıfır değildir. En fazla bir yaprak olsaydı, toplam en az 1 + 2(n − 1) = 2n − 1 olurdu ve bu 2n − 2'den büyüktür. Çelişki. Aynı sonuç, iki farklı ispat tekniğiyle iki satırda kurulabiliyor; mülakatta ikisini de bilmek "bunu başka nasıl gösterirsin?" takip sorusuna hazır olmaktır.

## Kapsayan ağaç

Bir grafın **kapsayan ağacı (spanning tree)**, grafın bütün düğümlerini içeren ve ağaç olan bir alt grafıdır.

**Teorem.** Bağlı her grafın bir kapsayan ağacı vardır.

**İspat (kenar silerek).** Bağlı G grafında bir döngü varsa, o döngü üzerindeki herhangi bir kenarı sil. Graf bağlı kalır: silinen kenarı kullanan her yürüyüş, döngünün geri kalanını dolaşarak aynı iki ucu birleştirebilir. Kenar sayısı her adımda bir azaldığı için bu işlem sonludur ve döngü kalmayınca durur. Kalan graf bağlıdır, döngüsüzdür ve bütün düğümleri taşır: kapsayan ağaç.

Bu teoremin doğrudan bir sonucu, karmaşıklık tartışmalarında sürekli kullanılır: **n düğümlü bağlı bir grafın en az n − 1 kenarı vardır.** Çünkü kapsayan ağacı n − 1 kenar taşır ve o ağaç grafın alt grafıdır. Yani bir ağı bağlı tutmanın bir alt maliyeti vardır ve ağaç tam olarak o alt sınırda çalışan yapıdır — bağlılığı sağlayan, fazladan tek kenar taşımayan graf.

Kenar ağırlıklı graflarda "en ucuz kapsayan ağaç" sorusu **minimum kapsayan ağaç (minimum spanning tree)** problemidir ve algoritmaları graf algoritmaları makalesinde kuracağız. Buradaki tanım o makalenin zeminidir.

## Üç denk karakterizasyon

Ağacı tanımlarken "bağlı ve döngüsüz" dedik. Ama pratikte bir yapının ağaç olduğunu göstermenin başka yolları da vardır ve mülakatta hangisini seçtiğin, ispatın uzunluğunu belirler.

**Teorem.** n düğümlü bir G grafı için aşağıdaki üç ifade denktir:

1. G bağlıdır ve döngüsüzdür (yani ağaçtır).
2. G bağlıdır ve tam olarak n − 1 kenarı vardır.
3. G'nin her düğüm ikilisi arasında tam olarak bir yol vardır.

Şekil 2 ispatın halkasını gösteriyor: üç ifadeyi bir çember üzerinde kapatırsak, herhangi birinden diğerine geçebiliriz.

![Üç ifadeyi bir çember üzerinde gösteren denklik halkası: bağlı ve döngüsüz, bağlı ve n eksi bir kenarlı, her ikili arasında tek yol. Oklar üzerinde her geçişin hangi argümanla yapıldığı yazılı: yaprak silen tümevarım, döngü kenarı silme ve alt sınır, tek yolun döngüyü dışlaması](assets/agac-karakterizasyonlari.svg "Şekil 2 — Ağaç karakterizasyonlarının denklik halkası")

**(1) ⇒ (2).** Bu, yukarıda tümevarımla ispatladığımız teoremdir.

**(2) ⇒ (3).** G bağlı olduğu için her ikili arasında en az bir yol vardır; göstermemiz gereken, iki farklı yolun olamayacağıdır. Diyelim ki bir yerlerde iki farklı yol var. O hâlde, uzunlukları toplamı en küçük olan böyle bir çifti seç: u ile v arasında iki farklı yol, p ve q. Bu ikisi uçlar dışında ortak bir düğümde buluşamaz; buluşsalardı, buluşma noktasına kadarki ya da sonrasındaki parçalar daha küçük toplam uzunlukta iki farklı yol verirdi ve seçimimizle çelişirdi. Uçlar dışında kesişmeyen iki farklı yol ise birleştiğinde bir döngü kapatır. O döngü üzerindeki bir kenarı silelim: yukarıdaki argümana göre graf bağlı kalır, ama artık n − 2 kenarı vardır. Bu, bağlı bir grafın en az n − 1 kenarı olması gerektiğiyle çelişir. Demek ki yol tektir.

**(3) ⇒ (1).** Her ikili arasında bir yol varsa graf bağlıdır. Döngüsüz olduğunu görmek için: bir döngü olsaydı, döngü üzerindeki iki düğüm arasında döngünün iki yayı iki farklı yol verirdi ve "tam olarak bir yol" koşulu bozulurdu.

Üçü de aynı nesneyi tarif ediyor, ama farklı maliyetlerle denetleniyor. Elinde kenar sayısı varsa (2) bir aritmetik kontrole iner. Elinde bir arama algoritmasının çıktısı varsa (3) doğal gelir. Tanımdan yürümen gerekiyorsa (1) esastır. Mülakatta "bunun ağaç olduğunu nasıl gösterirsin?" sorusuna verilecek en iyi cevap, üç yolu da söyleyip elindeki bilgiye uygun olanı seçmektir.

> **Sesli anlat:** "Bir grafın ağaç olduğunu göstermenin üç denk yolunu say ve hangisini ne zaman seçeceğini doksan saniyede anlat."
>
> İyi bir cevabın omurgası: "Birincisi tanım: bağlı ve döngüsüz. İkincisi sayma: bağlı ve tam olarak düğüm sayısının bir eksiği kadar kenarı var. Üçüncüsü yol tekliği: her düğüm ikilisi arasında tam olarak bir yol var. Üçü denktir; tanımdan sayıya geçiş yaprak silen tümevarımla, sayıdan yol tekliğine geçiş ise döngü kenarını silip bağlı grafın en az n eksi bir kenar gerektirmesiyle çelişerek gösterilir. Pratikte hangisi ucuzsa onu denetlerim: kenar sayısı elimdeyse ikincisi tek satırdır, ama bağlılığı ayrıca doğrulamam gerekir — yalnızca kenar saymak yetmez, çünkü bir döngü artı bir yalıtık düğüm de aynı kenar sayısını verir."

## Mülakatta nasıl görünür

Graf soruları sözlü mülakatın en verimli konularıdır çünkü tek bir tanım hatası bütün cevabı çökertir ve mülakatçı bunu hızlı görür. En sık takip zinciri şudur: "Graf nedir?" → "Ağaç ile grafın farkı ne?" → "n düğümlü bir ağaçta kaç kenar var, neden?"

Üç hata sık yapılır. Birincisi **bağlılığı unutmak**: "döngüsüz graf ağaçtır" yanlıştır, o orman olur. İkincisi **kenar sayısını yeterli sanmak**: n − 1 kenar tek başına ağaç yapmaz, bağlılık da gerekir. Üçüncüsü **yürüyüş ile yolu karıştırmak**; bağlılık tanımında düğüm tekrarına izin verip vermemek fark etmez, ama döngü tanımında eder.

Bir de dil uyarısı: mülakat İngilizce yürüyecekse "düğüm" için *vertex* ve *node*, "kenar" için *edge*, "derece" için *degree*, "yol" için *path*, "bağlı" için *connected*, "kapsayan ağaç" için *spanning tree* karşılıklarının ağzına yerleşmiş olması gerekir. Bu terimlerin telaffuzu, tanımı bilmek kadar hızlı gelmelidir.

### Sırada ne var

Bu makaleyle graf ve ağaç dilini kurduk; bir sonraki makale Faz A'yı kapatıyor. Cebirsel yapılara — yarıgrup, monoid, grup — ve oradan kafeslere, kafeslerden Boolean cebirine geçeceğiz. Orada göreceğin şey şu olacak: ikinci makaledeki mantık, beşinci makaledeki küme cebiri ve devre tasarımının Boolean cebiri **aynı** kural setini paylaşır. Aynı kuralları üç ayrı yerde tanımak, mülakatta "bu neye benziyor?" sorusuna cevap verme refleksinin kendisidir.

## Kaynakça

- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (ders notları), 11. bölüm (Simple Graphs): 11.1 düğüm komşuluğu ve dereceler, Lemma 11.2.1 el sıkışma lemması, 11.8 yürüyüş ve yollar, 11.9 bağlılık, 11.10 ormanlar ve ağaçlar (Teorem 11.10.3 ağaç özellikleri, Lemma 11.10.4, Teorem 11.10.6 kapsayan ağaç). MIT OpenCourseWare 6.042J. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Rosen, K. H. *Discrete Mathematics and Its Applications*, 10. bölüm (Graphs): 10.1 graf modelleri, 10.2 graf terminolojisi ve özel graflar, 10.4 bağlılık; 11. bölüm (Trees): 11.1 ağaçlara giriş, 11.4 kapsayan ağaçlar, 11.5 minimum kapsayan ağaçlar. McGraw Hill. [Bağlantı](https://www.mheducation.com/highered/product/Discrete-Mathematics-and-Its-Applications-Rosen.html)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE220 — Discrete Computational Structures* (katalog tanımı "Graphs, lattices and Boolean algebra" ifadesini içerir). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe220/)
