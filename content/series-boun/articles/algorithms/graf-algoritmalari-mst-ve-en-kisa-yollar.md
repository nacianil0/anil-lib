---
article_id: article_6a50cd2b-b728-4b06-9589-c3b1b0338783
title: "Graf Algoritmaları: MST ve En Kısa Yollar"
slug: graf-algoritmalari-mst-ve-en-kisa-yollar
category: algorithms
level: advanced
reading_order: 23
summary: "Kenarların ağırlığı olunca iki farklı soru doğuyor ve aynı graf üzerinde iki farklı ağaç veriyor: minimum kapsayan ağaç ile en kısa yollar ağacı. Kesit teoreminin değişim argümanıyla ispatı, Prim ile Kruskal, heap makalesinden kalan azalt_anahtar borcunun kapanması; gevşetmenin güvenliği, Dijkstra'nın doğruluğu ve negatif kenarda çökmesi, Bellman-Ford'un bir dinamik programlama olarak okunması ve dört algoritmanın maliyet tablosu."
tags:
  - minimum-kapsayan-agac
  - en-kisa-yollar
  - dijkstra
  - bellman-ford
  - azalt-anahtar
content_hash: sha256:dbccdab19371a26517c0086ed49079f82cc584db01946aa0be16aa752693672e
classification_version: 1
classification_batch: 7
---
## İki soru, iki farklı ağaç

Graf makalesinde BFS'in ağırlıksız graflarda en kısa yolları verdiğini ve maliyetinin Θ(|V| + |E|) olduğunu görmüştük. Orada bir uyarı bırakmıştık: BFS'in doğru cevap vermesi, **bütün kenarların aynı maliyette** olmasına bağlıdır. Şimdi kenarların ağırlığı var — mesafe, gecikme, ücret, kablo uzunluğu — ve ağırlıklarla birlikte iki farklı klasik soru doğuyor.

**Birinci soru:** bütün düğümleri birbirine bağlı tutan en ucuz kenar kümesi hangisidir? Bu, **minimum kapsayan ağaç (minimum spanning tree, MST)** problemidir. Graf ve ağaç makalesinde kapsayan ağacın varlığını ispatlamıştık ve n düğümlü bir ağacın tam n − 1 kenarı olduğunu biliyoruz; şimdi bunlardan **en hafifini** arıyoruz.

**İkinci soru:** belirli bir kaynak düğümden diğer bütün düğümlere giden en ucuz yollar hangileridir? Bu, **tek kaynaklı en kısa yollar (single-source shortest paths, SSSP)** problemidir ve cevabı yine bir ağaçtır: **en kısa yollar ağacı (shortest paths tree)**.

İki soru kulağa benzer geliyor ve mülakatta sık karıştırılıyor. Oysa cevapları **aynı grafta bile farklıdır**. Şu beş düğümlü grafı ele alalım; kenarlar A–B 4, A–C 3, A–E 7, B–C 2, B–D 5, C–E 6, D–E 1.

MST'nin kenarları A–C 3, B–C 2, B–D 5, D–E 1'dir ve toplam ağırlığı **11**'dir. A'dan başlayan en kısa yollar ağacının kenarları ise A–B 4, A–C 3, A–E 7, E–D 1'dir; kenar ağırlıkları toplamı **15**'tir. İki ağaç yalnızca iki kenarda değil, yapıda da farklıdır: MST B'ye C üzerinden gelir, en kısa yollar ağacı doğrudan A'dan gelir. Bunu hem Kruskal hem Prim ile ayrı ayrı hesaplayıp, ayrıca Dijkstra'nın çıktısıyla karşılaştırarak doğruladım. Şekil 1 iki ağacı aynı graf üzerinde yan yana koyuyor.

![Aynı grafı iki kez gösteren, dikey bir çizgiyle ayrılmış iki panelli bir şema. Her panelde beş düğüm aynı yerde duruyor: A solda ortada, B sağ üstte, C ortada, D sağ altta, E altta. Kenarlar ve ağırlıkları iki panelde de aynı: A ile B arasında dört, A ile C arasında üç, A ile E arasında yedi, B ile C arasında iki, B ile D arasında beş, C ile E arasında altı, D ile E arasında bir. Sol panelin başlığı minimum kapsayan ağaç, toplam on bir; bu panelde A ile C, B ile C, B ile D ve D ile E kenarları kalın çizilmiş, kalan üç kenar ince ve soluk. Panelin altında seçilen kenarlar A C, B C, B D, D E diye yazıyor. Sağ panelin başlığı en kısa yollar ağacı, kaynak A, kenar toplamı on beş; bu panelde A ile B, A ile C, A ile E ve D ile E kenarları kalın çizilmiş, kalan üçü ince ve soluk, kaynak düğüm A vurgulanmış. Panelin altında A ya uzaklıklar A sıfır, C üç, B dört, E yedi, D sekiz diye yazıyor. En altta not: aynı graf, iki farklı ağaç. Minimum kapsayan ağaç toplamı, en kısa yollar ağacı ise her düğüme uzaklığı en küçük yapar](assets/mst-ile-en-kisa-yollar-agaci.svg "Şekil 1 — Aynı graf, iki farklı soru, iki farklı ağaç")

Fark tesadüf değil, tanımdan geliyor. MST **toplam** maliyeti en küçük yapar; kimsenin kaynağa ne kadar uzakta olduğu umurunda değildir. En kısa yollar ağacı ise **her düğüme ayrı ayrı** maliyeti en küçük yapar; toplam kenar ağırlığı umurunda değildir. İki farklı amaç fonksiyonu, iki farklı optimal nesne.

## Minimum kapsayan ağaç ve kesit teoremi

MST algoritmalarının hepsi tek bir teoremin farklı yüzleridir. Önce tanım: bir **kesit (cut)**, düğüm kümesinin iki ayrık parçaya bölünmesidir; bir kenar, uçları farklı parçalardaysa o kesiti **keser (crossing edge)**.

> **Kesit teoremi.** Bir kesit verilsin. O kesiti kesen kenarların **en hafifi** minimum kapsayan ağaçtadır. (Ağırlıkların tümü farklıysa MST tektir ve iddia bu hâliyle geçerlidir; eşit ağırlıklar varsa "bir MST'dedir" demek gerekir.)

İspat, açgözlü makalesinden tanıdık bir **değişim argümanıdır** ve tam olarak kes-yapıştır kalıbıdır. Kesitin en hafif kesen kenarı (u, v) olsun ve bir MST olan T'de bulunmadığını varsayalım. T bir ağaç olduğu için u'dan v'ye giden tek bir basit yol vardır; bu yol kesitin bir tarafından diğerine geçmek zorunda olduğuna göre, üzerinde kesiti kesen en az bir kenar vardır. O kenarı çıkarıp yerine (u, v)'yi koy: sonuç hâlâ bir kapsayan ağaçtır ve (u, v) en hafif kesen kenar olduğu için toplam ağırlığı **artmamıştır**, hatta kesin olarak azalmıştır. Bu, T'nin minimum olduğu varsayımıyla çelişir.

MST'nin **optimal altyapısı** da vardır: T'den herhangi bir (u, v) kenarını çıkarınca T iki alt ağaca ayrılır ve her alt ağaç, kendi düğümlerinin indüklediği alt grafın MST'sidir. İspat yine kes-yapıştırdır — daha hafif bir alt ağaç olsaydı onu yerine koyup bütünü hafifletirdik. Örtüşen alt problemler de var, yani dinamik programlama **çalışırdı**; ama MST'nin fazladan bir özelliği daha var — açgözlü seçim özelliği — ve o özellik daha verimli bir algoritma veriyor. Önceki iki makalenin ayrımı burada tam olarak iş görüyor: **DP yalnızca optimal altyapı ister, açgözlü fazladan açgözlü seçim özelliği ister ve karşılığında daha ucuza çalışır.**

**Prim algoritması** kesit teoremini doğrudan uygular. Bir A kümesi tut (başta tek bir düğüm); her adımda A ile V − A arasındaki kesitin en hafif kesen kenarını al ve karşı ucunu A'ya kat. Verimli gerçekleştirim için V − A'yı bir **öncelik kuyruğunda** tutarız ve her düğümün anahtarı, onu A'ya bağlayan en hafif kenarın ağırlığıdır. Yukarıdaki grafta A'dan başlayan izleme şöyle: başta anahtarlar B = 4, C = 3, E = 7; C çıkar (3) ve B'nin anahtarı 2'ye, E'ninki 6'ya **düşer**; B çıkar (2) ve D'nin anahtarı 5 olur; D çıkar (5) ve E'nin anahtarı 1'e düşer; son olarak E çıkar (1). Toplam 3 + 2 + 5 + 1 = 11.

**Kruskal algoritması** aynı teoremi başka bir yerden uygular. Kenarları ağırlığa göre küçükten büyüğe sırala; sırayla al, ama döngü yaratan kenarı atla; n − 1 kenar toplanınca dur. Atlanmayan her kenar, o anda birbirinden ayrı duran iki bileşeni ayıran kesitin en hafif kesen kenarıdır — yani yine kesit teoremi. Döngü denetimi için **ayrık küme (union-find)** yapısı kullanılır ve maliyet, kenarları sıralamanın maliyetiyle sınırlanır: O(|E| log |V|).

## Ödenmemiş borç: `azalt_anahtar`

Heap makalesinde öncelik kuyruğu arayüzünü kurmuş, ama bir işlemi bilinçli olarak dışarıda bırakmıştık: **`azalt_anahtar` (decrease-key)**. Prim'in de Dijkstra'nın da üzerinde durduğu işlem tam olarak budur, dolayısıyla borcu burada ödemek gerekiyor.

Sorun şudur: heap, kuyruktaki bir öğenin **nerede** durduğunu bilmez. Bir düğümün anahtarını düşürmek istediğinde önce onu heap dizisinde bulman gerekir ve arama Θ(n) sürer — bu, log n'lik kazancı yok eder. Çözüm, öncelik kuyruğunu bir sözlükle **çapraz bağlamaktır**: her öğeye benzersiz bir kimlik ver ve kimlikten heap dizisindeki indise giden bir eşleme tut. Düğüm kimlikleri 0'dan |V| − 1'e tam sayılarsa bu eşleme bir **doğrudan erişim dizisi** olabilir ve arama O(1)'e iner. Yer değiştirme işlemleri sırasında eşlemenin de güncellenmesi gerekir; bu, heap kodunun iki satırlık bir değişikliğidir.

İndis bulunduktan sonra iş kolaydır. Anahtar yalnızca **azaldığı** için heap özelliği yalnızca yukarı doğru bozulabilir; öğeyi **yukarı sızdırmak** yeter ve maliyet O(log n) olur. Bu yapının adı geçtiğinde İngilizcesi *indexed priority queue* ya da *changeable priority queue*'dur.

Bu iki işlemin sayısı, hem Prim'in hem Dijkstra'nın maliyetini belirler ve muhasebe ikisinde de birebir aynıdır:

**Maliyet = Θ(|V|) × T(en_küçüğü_çıkar) + Θ(|E|) × T(azalt_anahtar)**

Neden Θ(|E|)? Çünkü her düğüm kuyruktan çıkarken bütün komşuları gözden geçirilir ve el sıkışma lemmasına göre komşuluk listelerinin toplam uzunluğu 2|E|'dir — graf makalesinde kurduğumuz sayma burada doğrudan işe yarıyor. Öncelik kuyruğunun temsili değiştikçe tablo şöyle değişir:

| Kuyruk temsili | en_küçüğü_çıkar | azalt_anahtar | Toplam |
|---|---|---|---|
| Sırasız dizi | O(\|V\|) | O(1) | O(\|V\|²) |
| İkili heap | O(log \|V\|) | O(log \|V\|) | O(\|E\| log \|V\|) |
| Fibonacci heap | O(log \|V\|) amortize | O(1) amortize | O(\|E\| + \|V\| log \|V\|) |

Seçim yoğunluğa bağlıdır ve bu, graf makalesindeki temsil kararının aynısıdır. |V| = 10⁵ ve |E| = 10⁶ olan seyrek bir grafta |E| log |V| ≈ 1,7 × 10⁷, |V|² = 10¹⁰ — heap altı yüz kat kazanır. |V| = 10⁴ olan tam bir grafta ise |E| ≈ 5 × 10⁷ ve |E| log |V| ≈ 6,6 × 10⁸ iken |V|² = 10⁸ — bu kez **sırasız dizi** kazanır. Fibonacci heap kuramda her durumda iyidir ama sabitleri büyüktür ve pratikte pek kullanılmaz.

> **Sesli anlat:** "Prim ile Dijkstra arasındaki farkı anlat. İkisi de öncelik kuyruğu kullanıyor; ne değişiyor? Altmış saniye."
>
> İyi bir cevabın omurgası: "Kod iskeleti neredeyse aynı: bir öncelik kuyruğu tut, en küçük anahtarlıyı çıkar, komşularının anahtarlarını gerekiyorsa düşür. Fark **anahtarın ne olduğudur**. Prim'de bir düğümün anahtarı, onu ağaca bağlayan **tek bir kenarın ağırlığıdır** — w(u, v). Dijkstra'da ise kaynaktan o düğüme giden **yolun toplam ağırlığıdır** — d(u) + w(u, v). Bu tek fark iki farklı ağaç üretir: Prim toplam kenar ağırlığını, Dijkstra her düğüme olan uzaklığı en küçük yapar. Maliyet muhasebesi ikisinde de aynıdır: V kez en küçüğü çıkar, E kez azalt anahtar; ikili heap ile E log V, sırasız dizi ile V kare. Prim negatif ağırlıklarla da çalışır, Dijkstra çalışmaz."

## En kısa yollar: tanımlar ve gevşetme

Bir yolun ağırlığı, üzerindeki kenarların ağırlıkları toplamıdır; δ(s, t) ise s'ten t'ye giden yolların **en küçük** ağırlığıdır. Üç tanım gerekiyor.

**Optimal altyapı.** Bir en kısa yolun her alt yolu da bir en kısa yoldur. İspat kes-yapıştır: alt yol daha kısayla değiştirilebilseydi bütün yol kısalırdı.

**Üçgen eşitsizliği.** Her u, v, x için δ(u, v) ≤ δ(u, x) + δ(x, v). Sezgisi tek cümledir: x üzerinden gitmek, doğrudan gitmekten daha ucuz olamaz.

**Negatif çevrim.** Ağırlıklar negatif olabiliyorsa toplam ağırlığı negatif olan bir çevrim bulunabilir; o çevrimin üzerinden geçen bir düğüm için "en kısa yol" diye bir şey **yoktur**, çünkü çevrimi bir kez daha dolaşmak maliyeti hep düşürür. Bu durumda δ(s, v) = −∞ yazarız. Tanımda minimum yerine infimum kullanılmasının nedeni budur.

Bütün en kısa yol algoritmaları tek bir işlem üzerine kuruludur: **gevşetme (relaxation)**. Her düğüm için gerçek uzaklığın **üstünde** kalan bir tahmin d(s, v) tut (başta ∞, yalnızca d(s, s) = 0). Bir (u, v) kenarı üçgen eşitsizliğini bozuyorsa — yani d(s, v) > d(s, u) + w(u, v) ise — tahmini düşür. Gevşetme **güvenlidir**: d(s, v) her zaman s'ten v'ye giden gerçek bir yolun ağırlığıdır (ya da ∞), çünkü onu u üzerinden geçen bir yolun ağırlığına eşitliyoruz. Dolayısıyla d(s, v) hiçbir zaman δ(s, v)'nin altına inemez. Algoritmalar yalnızca **kenarları hangi sırada gevşetecekleri** konusunda ayrışır.

## Dört algoritma

**BFS.** Bütün ağırlıklar eşitse kuyruk yeter ve maliyet Θ(|V| + |E|)'dir. Graf makalesinin sonucu.

**DAG gevşetmesi.** Graf yönlü ve döngüsüzse düğümleri **topolojik sırada** işlemek ve her düğümün çıkan kenarlarını bir kez gevşetmek yeter. Doğruluk, topolojik sıra üzerinde tümevarımla gelir: v işlendiğinde, ona giden en kısa yoldaki bir önceki düğüm u zaten işlenmiştir, dolayısıyla d(s, u) = δ(s, u)'dur ve (u, v) gevşetildiğinde d(s, v) doğru değere iner. Maliyet Θ(|V| + |E|) ve **negatif ağırlıklar sorun değildir**. Dikkat: bu algoritma bir önceki makalenin diliyle okununca doğrudan bir dinamik programdır — alt problem δ(s, v), bağıntı δ(s, v) = min{δ(s, u) + w(u, v)}, topolojik sıra grafın kendi topolojik sırası.

**Dijkstra.** Ağırlıklar negatif değilse BFS'in fikri genellenebilir: kaynağın etrafında bir küre büyüt, hep daha yakın düğümleri önce keşfet. Kuyruğun yerini öncelik kuyruğu alır. Her adımda kuyruktaki en küçük tahminli düğümü çıkar, **kesinleştir** ve çıkan kenarlarını gevşet; düşen her tahmin bir `azalt_anahtar` çağrısıdır.

Yukarıdaki graf üzerinde A'dan izleme şöyle yürüyor. A çıkar (0): B = 4, C = 3, E = 7. C çıkar (3): C üzerinden B 5 ederdi, mevcut 4'ten iyi değil; E 9 ederdi, mevcut 7'den iyi değil — hiçbir şey değişmez. B çıkar (4): D = 9 olur. E çıkar (7): D **9'dan 8'e düşer** — işte `azalt_anahtar`. D çıkar (8). Sonuç: A 0, C 3, B 4, E 7, D 8. Şekil 2 bu izlemeyi adım adım gösteriyor.

![Bir Dijkstra izleme tablosu. Üstte kaynağın A olduğu ve kenarların A B dört, A C üç, A E yedi, B C iki, B D beş, C E altı, D E bir olduğu yazıyor. Tablonun sütunları kuyruktan çıkan, A, B, C, D, E başlıklı. Başlangıç satırında A sıfır, diğer dört düğüm sonsuz. Birinci satır: A çıkıyor sıfırla, B dört, C üç, D sonsuz, E yedi oluyor. İkinci satır: C çıkıyor üçle ve hiçbir değer değişmiyor. Üçüncü satır: B çıkıyor dörtle, D sonsuzdan dokuza iniyor. Dördüncü satır: E çıkıyor yediyle, D dokuzdan sekize iniyor; bu hücre farklı renkle vurgulanmış ve yanında dokuz oktan sekiz yazıyor. Beşinci satır: D çıkıyor sekizle ve hiçbir değer değişmiyor. Her satırda kuyruktan çıkan düğümün hücresi kutu içine alınmış. Tablonun altında iki not var: C çıkarken hiçbir tahmin düşmez çünkü C üzerinden B beş, E dokuz ederdi ve ikisi de mevcut değerden iyi değildir; kesinleşen tahmin kutuludur ve D nin tahmininin dokuzdan sekize düşmesi bir azalt anahtar çağrısıdır](assets/dijkstra-izleme-tablosu.svg "Şekil 2 — Dijkstra'nın öncelik kuyruğu adımları: D'nin tahmini iki kez düşüyor")

Doğruluğun ispatı tümevarımdır ve **negatif olmama varsayımının tam olarak nerede kullanıldığını** görmek gerekir. Kuyruktan çıkarılan k'ıncı düğüm v olsun ve s'ten v'ye bir en kısa yol düşünelim. Bu yol üzerinde henüz çıkarılmamış ilk düğüm y, ondan önceki düğüm x olsun. x çıkarıldığında tümevarım hipotezine göre d(s, x) = δ(s, x)'ti ve (x, y) gevşetildi, dolayısıyla d(s, y) ≤ δ(s, y)'dir. Şimdi kritik adım: **δ(s, y) ≤ δ(s, v)**, çünkü y, v'ye giden en kısa yolun üzerindedir ve **ağırlıklar negatif olmadığı için** yolun geri kalanı maliyeti düşüremez. Öte yandan v en küçük tahminli düğüm olduğu için d(s, v) ≤ d(s, y). Zinciri birleştirince d(s, v) = δ(s, v) çıkar.

Negatif bir kenar bu zinciri kırar ve algoritma sessizce yanlış cevap verir. En küçük karşı örnek üç düğümlüdür: s → a ağırlık 1, s → b ağırlık 2, b → a ağırlık −2. Dijkstra a'yı 1 tahminiyle çıkarır ve kesinleştirir; oysa gerçek uzaklık s → b → a yolundan 2 − 2 = **0**'dır. Bu çöküşü kodla da çalıştırıp doğruladım.

**Bellman-Ford.** Negatif kenarlar varsa sıraya güvenemeyiz, o hâlde sırayı **kenar sayısı** üzerinden kuralım. δ_k(s, v), en fazla k kenar kullanan yolların en küçük ağırlığı olsun. Negatif çevrim yoksa her sonlu en kısa yol **basittir** (bir çevrim içerseydi çevrimin ağırlığı negatif olmadığı için onu atmak yolu kısaltmaz ama daha az düğümlü bir yol verirdi), dolayısıyla en fazla |V| − 1 kenar taşır ve δ(s, v) = δ_{|V|−1}(s, v) olur.

Algoritma bu alt problemleri artan k sırasında doldurur: |V| − 1 tur boyunca bütün kenarları gevşet. Bu, kelimenin tam anlamıyla bir **dinamik programdır** — alt problem (v, k) çifti, topolojik sıra artan k. Maliyet |V| − 1 tur × |E| kenar = **O(|V| · |E|)**.

Negatif çevrim tespiti bir tur daha atmakla gelir: |V|. turda hâlâ düşen bir tahmin varsa, o düğüm bir **tanıktır** ve ondan erişilebilen her düğümün uzaklığı −∞'dur. Beş düğümlü bir örnekte bunu iki kez çalıştırdım: negatif kenarlı ama negatif çevrimsiz sürümde tablo k = 2'de sabitlendi ve δ₄ = δ₅ çıktı; tek bir kenar ekleyip ağırlığı −2 olan bir çevrim yarattığımda tablo hiç durulmadı ve k = 5'te bir tanık belirdi.

| Algoritma | Kısıt | Maliyet |
|---|---|---|
| BFS | ağırlıksız (ya da hepsi eşit) | Θ(\|V\| + \|E\|) |
| DAG gevşetmesi | graf döngüsüz, ağırlık serbest | Θ(\|V\| + \|E\|) |
| Dijkstra | ağırlıklar negatif değil | O(\|E\| log \|V\|) ya da O(\|V\|²) |
| Bellman-Ford | ağırlık serbest, çevrim tespiti dahil | O(\|V\| · \|E\|) |

Tablonun okunuşu tek cümledir: **kısıt gevşedikçe maliyet artar.** Mülakatta bir graf problemi duyduğunda ilk yapılacak şey en hızlı algoritmayı söylemek değil, hangi satırda olduğunu tespit etmektir.

> **Sesli anlat:** "Dijkstra'yı negatif ağırlıklı bir grafta neden kullanamazsın? İspatın hangi adımı kırılıyor? Doksan saniye."
>
> İyi bir cevabın omurgası: "Dijkstra'nın doğruluğu tek bir adıma dayanır: bir düğüm kuyruktan en küçük tahminle çıktığında tahmini artık kesinleşmiştir. Bunun ispatında, en kısa yol üzerinde henüz çıkmamış ilk düğüm y için δ(s, y) ≤ δ(s, v) diyoruz; bu adım **yolun geri kalanının maliyeti artıramayacağı** varsayımını kullanır, yani ağırlıkların negatif olmamasını. Negatif bir kenar varsa daha uzak görünen bir düğüm üzerinden gitmek toplamı düşürebilir ve kesinleştirdiğimiz değer yanlış kalır. Üç düğümlük bir karşı örnek yeter: s'ten a'ya bir, s'ten b'ye iki, b'den a'ya eksi iki. Dijkstra a'yı bir diye kesinleştirir, doğrusu sıfırdır. Negatif kenar varsa Bellman-Ford'a geçerim: alt problemi 'en fazla k kenar kullanan en ucuz yol' diye tanımlar, |V| − 1 tur bütün kenarları gevşetir, maliyeti |V| çarpı |E|'dir; bir tur daha atarak negatif çevrimi de tespit eder."

## Mülakatta nasıl görünür

Beş tipik hata var. **MST ile en kısa yollar ağacını karıştırmak** — biri toplamı, diğeri her düğüme olan uzaklığı en küçük yapar ve aynı grafta farklı çıkarlar. **Dijkstra'yı negatif kenarda kullanmak** — sessizce yanlış cevap verir, çökmez. **Prim ile Dijkstra'yı ayırt edememek** — tek fark anahtarın w(u, v) mi d(u) + w(u, v) mi olduğudur. **Öncelik kuyruğu temsilini yoğunluğa göre seçmemek** — seyrek grafta heap, yoğun grafta sırasız dizi kazanır. **`azalt_anahtar`ı sihir sanmak** — çapraz bağlı bir sözlük olmadan heap'te öğe bulmak doğrusal zaman alır ve bütün analiz çöker.

Bir de kaynak seçimi hatası: negatif çevrim varlığında "en kısa yol" sorusunun **iyi tanımlı olmadığını** söylemek gerekir. Doğru cevap bir sayı değil, çevrimin kendisini raporlamaktır.

İngilizce karşılıklar hazır olmalıdır: *minimum spanning tree*, *cut*, *crossing edge*, *cut property*, *shortest paths tree*, *relaxation*, *triangle inequality*, *negative-weight cycle*, *decrease-key*, *indexed priority queue*, *single-source shortest paths*, *witness*.

### Sırada ne var

Bu makaleye kadar hep aynı soruyu sorduk: bu problemi **ne kadar hızlı** çözebilirim? Sıradaki makale üç yeni soru soruyor. Birincisi tersinden: daha hızlısı **imkânsız** mı? Karar ağacı kuramı, karşılaştırma modelinde n log n'in altına inilemeyeceğini ispatlıyor ve asimptotik analiz makalesinde ödediğimiz yükseklik lemması o ispatın çekirdek adımıydı. İkincisi: **madenî para atmak** hız kazandırır mı? Rastgeleleştirilmiş hızlı sıralamanın beklenti analizi ve Monte Carlo ile Las Vegas ayrımı orada. Üçüncüsü: birden çok işlemci varken maliyet nedir? **İş ile derinlik** ayrımı, bu makaledeki "aynı algoritma, ucuzlatılmış adım" muhasebesinin paralel karşılığıdır.

## Kaynakça

- Leiserson, C. E. *6.046J Introduction to Algorithms (SMA 5503)*, Lecture 16: Greedy Algorithms (and Graphs) — MST tanımı (bağlı, yönsüz, ağırlıklı grafta bütün düğümleri bağlayan en hafif ağaç) ve ağırlıkların farklı olduğu basitleştirici varsayım; **optimal altyapı teoremi** (T'den (u, v) çıkarılınca oluşan T₁ ve T₂ alt ağaçları, indüklenmiş alt grafların MST'leridir) ve kes-yapıştır ispatı; örtüşen alt problemlerin de bulunduğu ve dinamik programlamanın çalışacağı, ama açgözlü seçim özelliğinin daha verimli bir algoritma verdiği kaydı; **açgözlünün nişanesi**: "A locally optimal choice is globally optimal"; **kesit teoremi** (A ⊆ V için A ile V − A arasındaki en hafif kenar MST'dedir) ve u'dan v'ye giden tek basit yol üzerindeki ilk kesen kenarla takas edilerek yapılan ispatı; Prim'in sözde kodu (Q ← V, key[v] ← ∞, EXTRACT-MIN, örtük DECREASE-KEY, π ebeveyn dizisi); el sıkışma lemmasından Θ(E) örtük DECREASE-KEY sayısı ve **Zaman = Θ(V)·T_EXTRACT-MIN + Θ(E)·T_DECREASE-KEY** formülü; dizi O(V²), ikili heap O(E lg V), Fibonacci heap O(E + V lg V) tablosu; Kruskal'ın ayrık küme yapısıyla O(E lg V) maliyeti. MIT OpenCourseWare, Güz 2005. [Bağlantı](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/pages/lecture-notes/)
- Demaine, E. *6.046J Introduction to Algorithms (SMA 5503)*, Lecture 17: Shortest Paths I — yol ağırlığı ve δ(u, v) tanımları; **optimal altyapı** ("A subpath of a shortest path is a shortest path", kes-yapıştır); **üçgen eşitsizliği** δ(u, v) ≤ δ(u, x) + δ(x, v); negatif ağırlıklı çevrim varlığında bazı en kısa yolların var olmaması; Dijkstra'nın açgözlü fikri (uzaklığı bilinen S kümesini büyüt) ve sözde kodu; gevşetme adımının örtük DECREASE-KEY olması; **d[v] ≥ δ(s, v) değişmezi** ve gevşetmelerin bunu koruduğu (ilk ihlal edilen düğüm üzerinden üçgen eşitsizliğiyle çelişki); doğruluğun üçüncü kısmı — S'ye eklenen her v için d[v] = δ(s, v), ispatta y'nin S dışındaki ilk düğüm seçilmesi ve d[y] = δ(s, y) ≤ δ(s, u) < d[u] çelişkisi; maliyet formülünün **Prim'inkiyle aynı** olduğu kaydı ve aynı üç satırlık kuyruk tablosu; ağırlıklar eşitken öncelik kuyruğunun yerini FIFO kuyruğun alması, yani BFS. MIT OpenCourseWare, Güz 2005. [Bağlantı](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/pages/lecture-notes/)
- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 11: Weighted Shortest Paths, Lecture 12: Bellman-Ford, Lecture 13: Dijkstra's Algorithm — ağırlıklı graf tanımı ve δ(s, t) = inf{w(π)} ifadesinde neden minimum değil infimum kullanıldığı; negatif ağırlıklı çevrim üzerinden erişilen düğümler için δ = −∞; **gevşetmenin güvenli olduğunun ispatı** ("Relaxing some edge (u, v) sets d(s, v) to d(s, u) + w(u, v), which is the weight of a path from s to v through u"); DAG gevşetmesinin topolojik sıra üzerinde tümevarımla doğruluğu ve Θ(|V| + |E|) maliyeti; **k-kenarlı uzaklık δ_k** tanımı, negatif çevrim yoksa en kısa yolun basit olduğunun çelişkiyle ispatı ve en fazla |V| − 1 kenar taşıdığı; Bellman-Ford'un graf çoğaltmasıyla bir DAG'a indirgenmesi, **tanık (witness)** tanımı δ_{|V|}(s, v) < δ_{|V|−1}(s, v) ve tanıktan erişilebilen her düğümün −∞ olması; Dijkstra'nın iki gözlemi (negatif olmayan ağırlıklarda en kısa yol boyunca uzaklığın azalmaması; uzaklık sırası bilinseydi DAG gevşetmesiyle çözülebileceği), **değiştirilebilir öncelik kuyruğu** arayüzü (build, delete_min, decrease_key) ve bunun bir öncelik kuyruğu ile bir sözlüğün çapraz bağlanmasıyla gerçekleştirildiği; doğruluk ispatının negatif olmayan ağırlıkları tam olarak δ(s, y) ≤ δ(s, v') adımında kullandığı; dizi, ikili heap ve Fibonacci heap için maliyet tablosu ve seyrek/yoğun graf ayrımı. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 4.3 (Minimum Spanning Trees) ve 4.4 (Shortest Paths) — kesit ve kesen kenar tanımları, ağırlıkların farklı olduğu varsayımı altında MST'nin tek olması; **Kesit özelliği** önermesi ("the crossing edge of minimum weight is in the MST") ve açgözlü MST algoritmasının bunun genel hâli olarak ifadesi; Prim'in tembel ve istekli gerçekleştirimleri, isteklinin **her ağaç dışı düğüm için kuyrukta yalnızca tek bir kenar tutması** ve bunun için indeksli öncelik kuyruğunun `decrease-key` işlemini gerektirmesi; tembel sürümün E log E, istekli sürümün E log V maliyeti; Kruskal'ın E log E maliyeti ve union-find ile döngü denetimi; en kısa yollar tarafında kenar gevşetme ile düğüm gevşetme kodları, **en kısa yol optimallik koşulları** önermesi, Dijkstra'nın E log V maliyeti ve ağırlıklı DAG'larda topolojik sırayla doğrusal zamanlı, negatif ağırlıkları da kaldıran çözüm. Addison-Wesley. [Bağlantı](https://algs4.cs.princeton.edu/43mst/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 21. bölüm (Minimum Spanning Trees) ve 22. bölüm (Single-Source Shortest Paths) — kesit teoremi ve güvenli kenar çerçevesi, Kruskal ile Prim, gevşetme temelli en kısa yol algoritmaları, Bellman-Ford ve Dijkstra. Bölüm adları ve numaraları, MIT Press'in yayımladığı resmî *Selected Solutions* belgesinin içindekiler tablosundan doğrulandı. MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE300 — Analysis of Algorithms* (ders çıktıları "basic classes of algorithms (comparison-based, recursive, divide-and-conquer, dynamic, greedy, numerical, graph)" ifadesini içerir; graf algoritmaları bu listenin son kalemidir ve bu makalenin resmî dayanağı odur). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe300/)
