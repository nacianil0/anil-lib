---
article_id: article_5316c1ca-05cf-4852-82ac-504f751fdbe4
title: "Graf Temsilleri, BFS ve DFS"
slug: graf-temsilleri-bfs-ve-dfs
category: data-structures
level: advanced
reading_order: 16
summary: "Faz B'nin kapanışı: grafın komşuluk listesi ve komşuluk matrisi olarak saklanması ve iki temsilin işlem başına maliyet tablosu; kuyrukla yürüyen genişlik öncelikli aramanın katman katman doğruluk ispatı ve en kısa yollar ağacı; yığınla ya da özyinelemeyle yürüyen derinlik öncelikli arama; bağlı bileşenlerin denklik bağıntısı teoremiyle bağı; yönlü döngüsüz grafta ters bitiş sırasının topolojik sıralama vermesi ve döngü tespiti."
tags:
  - graf
  - bfs
  - dfs
  - topolojik-siralama
  - bagli-bilesen
content_hash: sha256:e0af275b69cb6e6e04651805390fb971e6d1b4b85dc369ca6a826452014101e3
classification_version: 1
classification_batch: 5
---
## Grafı bir veri yapısı olarak görmek

Ayrık matematik fazında grafı tanımladık: düğümler, kenarlar, dereceler, yollar, bağlılık, ağaçlar. El sıkışma lemmasını ispatladık ve ağacın üç denk karakterizasyonunu kurduk. Ama o makale boyunca graf bir **matematiksel nesneydi**; bilgisayarın belleğinde neye benzediğini hiç sormadık.

Bu fazın geri kalanı hep aynı soruyu sordu: bu yapı neyi ucuzlatmak için neyi pahalılaştırıyor? Dizi indisle erişimi ucuzlatıp araya ekleme yapmayı pahalılaştırdı. Hash tablosu sırayı feda edip aramayı ucuzlattı. Heap tam sıralamadan vazgeçip "en küçüğü ver" işlemini ucuzlattı. Şimdi aynı soruyu son bir kez, graf üzerinde soruyoruz. Fazı kapatan makale bu; sonrasında yapıları anlatmayı bırakıp analiz etmeye başlayacağız.

İki şey kuracağız. Önce grafı saklamanın iki yolunu ve aralarındaki takası. Sonra grafın üzerinde yürümenin iki yolunu — ve bu iki yol, temel yapılar makalesinde tanımladığımız iki arayüzün, kuyruk ile yığının, doğrudan algoritmaya dönüşmüş hâli olacak.

Bütün makale boyunca grafı G = (V, E) diye yazacağız: V düğüm kümesi, E kenar kümesi. Maliyetleri |V| ve |E| cinsinden konuşuyoruz, çünkü graf problemlerinde tek bir "n" yoktur. Karmaşıklık makalesinde "n nedir sorusunun cevabı her zaman söylenmelidir" demiştik; graf, bu uyarının en somut örneğidir.

## İki temsil: komşuluk listesi ve komşuluk matrisi

Grafın arayüzü aslında tek bir işlemden ibarettir: **bana u düğümünün komşularını ver.** Neredeyse bütün graf algoritmaları bu işlemin üstüne kurulur. Sorumuz, bu sözü hangi temsille daha ucuza tutabileceğimizdir.

**Komşuluk matrisi (adjacency matrix).** |V| × |V| boyutunda bir tablo tut; A[u][v] hücresi, u ile v arasında kenar varsa 1, yoksa 0 olsun. Yönsüz grafta matris simetriktir. Bu temsil bir soruyu bedavaya getirir: "u ile v arasında kenar var mı?" tek bir hücre okumasıdır, yani sabit zamanlıdır. Karşılığında iki bedel öder. Yer her zaman |V|² hücredir — grafın kaç kenarı olduğu hiç fark etmez. Ve "u'nun komşularını gez" işlemi, u'nun kaç komşusu olursa olsun, bütün satırı taramayı gerektirir: Θ(|V|).

**Komşuluk listesi (adjacency list).** Her düğüm için, komşularının listesini tut. Düğümler 0'dan |V| − 1'e numaralıysa bu listeleri bir dizide tutabilirsin; numaralı değillerse hash tablosu kullanırsın. Burada "u'nun komşularını gez" işlemi tam olarak u'nun derecesi kadar sürer, yani Θ(deg(u)) — hiçbir gereksiz iş yok. Buna karşılık "u ile v arasında kenar var mı?" sorusu u'nun listesini taramaktır: Θ(deg(u)).

Toplam yer için sayma refleksini kullanalım. Bütün komşuluk listelerinin uzunlukları toplamı, yönsüz grafta derecelerin toplamıdır; el sıkışma lemması bunun tam olarak 2·|E| olduğunu söylüyordu. Graf makalesinde ispatladığımız o lemma, burada doğrudan bir bellek muhasebesine dönüşüyor: komşuluk listelerinin toplam yeri Θ(|V| + |E|)'dir. Bu yüzden graf algoritmalarında "doğrusal zaman" ifadesi Θ(|V| + |E|) anlamına gelir — girdinin boyutu budur.

Şekil 1 aynı grafı iki temsille yan yana gösteriyor.

![Solda altı düğümlü bir graf çizimi: a, b, c üstte, d, e, f altta; kenarlar a-b, a-c, b-c, b-d, c-e, d-e, d-f, e-f. Ortada aynı grafın komşuluk listeleri, her satırda bir düğüm ve ondan çıkan oklarla komşularının listesi: a için b ve c, b için a, c, d, c için a, b, e, d için b, e, f, e için c, d, f, f için d ve e; listelerin altında toplam uzunluğun on altı olduğu ve bunun iki çarpı sekiz kenar ettiği not düşülmüş. Sağda altıya altı komşuluk matrisi: satır ve sütun başlıkları a'dan f'ye, kenar olan hücrelerde bir, olmayanlarda sıfır; köşegen sıfırlarla dolu ve matrisin köşegene göre simetrik olduğu vurgulanmış. En altta iki satır: kenar var mı sorusunun matriste sabit, listede derece kadar sürdüğü; komşuları gezme işleminin matriste düğüm sayısı kadar, listede derece kadar sürdüğü yazıyor](assets/graf-iki-temsil.svg "Şekil 1 — Aynı graf, iki temsil: komşuluk listesi ve komşuluk matrisi")

Maliyetleri tek tabloda toplayalım.

| İşlem | Komşuluk matrisi | Komşuluk listesi |
|---|---|---|
| Yer | \|V\|² | \|V\| + \|E\| |
| u ile v arasında kenar var mı? | sabit | deg(u) |
| u'nun komşularını gez | \|V\| | deg(u) |
| Kenar ekle / sil | sabit | ekleme sabit, silme deg(u) |
| Bütün grafı dolaş (BFS/DFS) | \|V\|² | \|V\| + \|E\| |

Seçimi belirleyen tek şey grafın **yoğunluğudur**. Basit yönsüz bir grafta kenar sayısı en fazla C(|V|, 2) = |V|(|V| − 1)/2'dir; sayma makalesindeki o değer burada üst sınır olarak geri geliyor. |E| bu üst sınıra yakınsa graf **yoğundur (dense)** ve matris hem yerini hak eder hem de sabit zamanlı kenar sorgusunu bedava verir. |E| kabaca |V| mertebesindeyse graf **seyrektir (sparse)** ve matris neredeyse tamamen sıfır saklar.

Somut bir hesap yapalım. |V| = 10⁶ düğüm ve |E| = 10⁷ kenar olan bir ağ düşün — ortalama derece 20, gerçek sosyal ve yol ağlarına yakın bir profil. Matris 10¹² hücre ister; hücre başına yalnızca 1 bit saysan bile 1,25 × 10¹¹ bayt, yani 125 GB eder. Komşuluk listeleri ise 10⁶ + 2 × 10⁷ = 2,1 × 10⁷ girdi tutar. Yoğunluk oranı 10⁷ / (≈5 × 10¹¹) = 2 × 10⁻⁵; matrisin yüz binde ikisi doludur. Aynı fark dolaşma maliyetinde de görünür: matris üzerinde her düğümün komşularını bulmak bütün satırı taramak demektir ve toplam 10¹² adıma çıkar, listelerle 1,1 × 10⁷ adım yeter.

Pratikte neredeyse bütün büyük graflar seyrektir; bu yüzden varsayılan cevap komşuluk listesidir. Matris, düğüm sayısı küçük ve kenar sorgusu sık olduğunda ya da matris çarpımı gibi cebirsel işlemler yapılacağında tercih edilir. Mülakatta doğru cümle "komşuluk listesi kullanırım" değil, "graf seyrek olduğu için komşuluk listesi kullanırım; yoğun olsaydı ve sık sık kenar sorgusu yapacak olsaydım matrisi düşünürdüm"dür.

## Genişlik öncelikli arama: kuyrukla katman katman

Elimizde temsil var; şimdi grafın üzerinde yürüyelim. İlk soru şu: bir s düğümünden başlayarak her düğüme olan **uzaklığı (distance)** — yani en az kaç kenarla oraya varıldığını — nasıl hesaplarız?

Fikir basit: düğümleri uzaklık sırasına göre keşfet. L₀ = {s} olsun; L₁, s'ye bir kenarla bağlı olup L₀'da olmayan düğümler; L₂, L₁'deki bir düğüme komşu olup daha önce hiç görülmemiş düğümler; ve böyle devam. Bu kümelere **katman (level set)** diyoruz. **Genişlik öncelikli arama (breadth-first search, BFS)** tam olarak bu katmanları sırayla üretir.

Gerçekleştirmesi bir kuyrukla yapılır ve neden kuyruk olduğu tanımdan çıkar: katmanları sırayla işlemek istiyorsun, yani önce gördüğünü önce açmak istiyorsun — ilk giren ilk çıkar. Temel yapılar makalesinde kuyruğu "arayüzü daraltılmış bir yapı" olarak tanımlamıştık; şimdi o arayüz bir algoritmanın omurgası oldu.

Algoritma her düğüm için iki şey saklar: uzaklık δ(s, v) ve **ebeveyn** P(v) — yani s'den v'ye giden en kısa yollardan birinde v'den bir önceki düğüm. Ebeveynler topluca bir ağaç kurar: **en kısa yollar ağacı (shortest paths tree)**. Bu ağaç neden değerli? Çünkü her düğüme giden yolu ayrı ayrı saklamak Θ(|V|²) yer isteyebilir; ebeveyn işaretçileri aynı bilgiyi Θ(|V|) yerde tutar ve herhangi bir yolu geriye doğru yürüyerek verir.

**Doğruluğu** katman üzerinde tümevarımla gelir — tümevarım makalesindeki kalıbın aynısı. Tümevarım hipotezi: j < i olan bütün katmanlar için δ ve P doğru hesaplanmıştır. Taban durumu i = 0: L₀ = {s}, δ(s, s) = 0. Tümevarım adımı: uzaklığı i olan her v düğümü, uzaklığı i − 1 olan bir u düğümünün komşusu olmak zorundadır, çünkü s'den v'ye i uzunluğunda bir yol varsa o yolun sondan bir önceki düğümü s'ye i − 1 uzaklıktadır. Algoritma L_{i−1}'deki her u'nun bütün komşularına baktığı için v'yi mutlaka görür; daha önce görülmediği için de tam olarak bu adımda i etiketini alır. Daha erken görülmüş olamazdı, çünkü daha erken görülseydi uzaklığı i'den küçük olurdu.

**Maliyeti** yine el sıkışma lemmasından çıkar. Her düğüm tam olarak bir katmana girer ve kuyruktan bir kez çıkar; kuyruktan çıktığında komşularını gezer, bu da deg(u) adımdır. Bütün düğümler üzerinde toplarsak Σ deg(u) = 2|E|. Buna, ulaşılamayan düğümlere sonsuz uzaklık atamak için gereken Θ(|V|) eklenir. Toplam: **O(|V| + |E|)**, yani graf boyutunda doğrusal.

Küçük bir uyarı: BFS'in en kısa yol vermesi, kenarların **ağırlıksız** olmasına bağlıdır. Her kenar bir birim sayıldığı için "en az kenar" ile "en kısa" aynı şeydir. Kenarların ağırlığı olduğunda katman fikri çöker ve öncelik kuyruğuna ihtiyaç duyulur; heap makalesinde kurduğumuz yapının graf algoritmalarındaki asıl işi budur ve bu, ağırlıklı en kısa yollar makalesinin konusudur.

## Derinlik öncelikli arama: yığınla derine

İkinci yürüme biçimi tam tersini yapar: bir yol bulup tıkanana kadar ilerle, tıkanınca geri çekil ve keşfedilmemiş ilk sapağa gir. Bu, **derinlik öncelikli aramadır (depth-first search, DFS)**.

Yazması özyinelemeyle çok kısadır: `ziyaret(u)` çağrısı, u'nun daha önce görülmemiş her v komşusu için P(v) = u atar ve `ziyaret(v)` çağırır. Özyineleme yerine açık bir yığın da kullanabilirsin; ikisi aynı şeydir, çünkü çağrı yığını zaten bir yığındır. Temel yapılar makalesinde "yığının kanonik kullanımı işi askıya alıp sonra kaldığın yerden devam etmendir" demiştik; geri izleme tam olarak budur.

Maliyeti BFS'inkiyle aynı argümanla O(|E|)'dir: her düğüm en fazla bir kez ziyaret edilir ve ziyaretinde komşularını gezer. Bir kaynaktan erişilebilirlik için Θ(|V|) ek işe gerek yoktur, çünkü ulaşılmayan düğümlere bir değer atamıyoruz.

Ama DFS'in verdiği ağaç **en kısa yollar ağacı değildir**. Bu, mülakatta en sık yakalanan noktalardan biridir. Şekil 2 aynı graf üzerinde iki ağacı yan yana koyuyor.

![Aynı altı düğümlü graf üzerinde iki dolaşma ağacı yan yana. Solda genişlik öncelikli aramanın a düğümünden ürettiği ağaç, katmanlara ayrılmış: sıfırıncı katmanda a, birinci katmanda b ve c, ikinci katmanda d ve e, üçüncü katmanda f; ağaç kenarları a-b, a-c, b-d, c-e, d-f ve her düğümün yanında uzaklığı yazıyor. Altında kuyruk kullanıldığı ve ağacın derinliğinin üç olduğu not edilmiş. Sağda derinlik öncelikli aramanın aynı düğümden ürettiği ağaç, tek bir zincir hâlinde: a, b, c, e, d, f sırayla alt alta bağlı; her düğümün yanında ağaçtaki derinliği yazıyor, f için beş. Altında yığın ya da özyineleme kullanıldığı ve ağacın derinliğinin beş olduğu not edilmiş. En altta f düğümünün gerçek uzaklığının üç olmasına rağmen derinlik öncelikli ağaçta beşinci seviyede durduğu, dolayısıyla bu ağacın en kısa yol vermediği vurgulanıyor](assets/bfs-dfs-agaclari.svg "Şekil 2 — Aynı graf, iki dolaşma: BFS ağacı ve DFS ağacı")

Şekildeki grafta komşuluk listeleri şu sırada duruyor: a → b, c; b → a, c, d; c → a, b, e; d → b, e, f; e → c, d, f; f → d, e. Sekiz kenar var, dereceler toplamı 16 = 2 × 8 — el sıkışma lemması tutuyor.

BFS a'dan başlayınca katmanlar L₀ = {a}, L₁ = {b, c}, L₂ = {d, e}, L₃ = {f} çıkar; uzaklıklar sırasıyla 0, 1, 1, 2, 2, 3'tür. DFS aynı listelerle a'dan başlayınca a → b → c → e → d → f zincirini kurar ve ağaç tek bir yola dönüşür. f düğümünün a'ya gerçek uzaklığı 3'tür, ama DFS ağacında 5. seviyededir. İki algoritma aynı düğümleri bulur, aynı maliyetle çalışır ve **tamamen farklı ağaçlar üretir**.

Bir ayrıntı daha: DFS'in ürettiği ağaç, komşuluk listelerinin sırasına bağlıdır. Aynı graf, listeler farklı sırada tutulursa farklı bir DFS ağacı verir. BFS'in ürettiği **uzaklıklar** ise sıradan bağımsızdır; yalnızca ebeveyn seçimi değişebilir, çünkü aynı uzaklıkta birden çok ebeveyn adayı olabilir.

> **Sesli anlat:** "BFS ile DFS arasındaki farkı ve hangisini ne zaman seçeceğini altmış saniyede anlat."
>
> İyi bir cevabın omurgası: "İkisi de grafın tamamını dolaşır ve ikisi de komşuluk listeleriyle Θ(|V| + |E|) sürer; fark, sıradaki düğümü hangi yapıdan aldıklarındadır. BFS kuyruk kullanır, yani önce göreni önce açar; bu yüzden düğümleri uzaklık sırasına göre keşfeder ve ağırlıksız grafta en kısa yolları verir. DFS yığın kullanır — ya da eşdeğer olarak özyineleme — ve bir yolu tıkanana kadar takip eder; verdiği ağaç en kısa yol ağacı değildir, üstelik komşuluk listelerinin sırasına bağlıdır. En kısa yol, katman katman yayılma ya da en yakın komşuları önce bulma isteniyorsa BFS seçerim. Derinlemesine yapıyla ilgili bir soru varsa DFS seçerim: erişilebilirlik, bağlı bileşenler, döngü tespiti, topolojik sıralama. Bellek tarafında da farklılar: BFS'in kuyruğu en geniş katman kadar büyür, DFS'in yığını en uzun yol kadar derinleşir."

## Bağlı bileşenler: eski teoremin algoritmik karşılığı

BFS de DFS de tek bir kaynaktan erişilebilen düğümleri bulur. Bütün grafı görmek istiyorsan basit bir sarmalayıcı yeter: ziyaret edilmemiş bir düğüm kaldığı sürece, ondan yeni bir arama başlat. Buna **tam dolaşma** diyelim. Her düğüm tam olarak bir kez ziyaret edildiği için maliyet yine Θ(|V| + |E|)'dir.

Bu sarmalayıcı, doğrudan bağlı bileşenleri verir: her aramanın ziyaret ettiği düğümler kümesi bir bağlı bileşendir. İspata gerek yok, çünkü ispatı çoktan yapmıştık. Graf makalesinde bağlılığın bir **denklik bağıntısı** olduğunu gösterdik; kümeler makalesinde de her denklik bağıntısının kümeyi parçalara ayırdığını ispatlamıştık. Bağlı bileşenler o parçalanışın ta kendisidir, tam dolaşma da parçaları tek tek numaralandıran işlemdir. İki makale önce ispatlanan bir teoremin, üç makale sonra bir algoritmanın doğruluk savunması hâline gelmesi bu serinin çalışma biçimidir.

Ön işleme Θ(|V| + |E|) sürer; sonrasında "u ile v aynı bileşende mi?" sorusu iki bileşen numarasını karşılaştırmaktır, yani sabit zamanlıdır.

Yönlü graflarda işler karışır: u'dan v'ye gidebiliyor olmak, v'den u'ya gidilebildiği anlamına gelmez. Orada aranan şey **güçlü bağlı bileşenlerdir** ve karşılıklı erişilebilirlik yine bir denklik bağıntısıdır; ama bulmak için DFS'i iki kez, ikincisini grafın kenarları ters çevrilmiş hâlinde çalıştırmak gerekir. Bu makale yönsüz durumla yetiniyor.

## Topolojik sıralama: kısmi sıranın algoritması

Kümeler makalesinde **kısmi sırayı (partial order)** tanımlamış ve bağımlılık grafını örnek vermiştik: bazı işler diğerlerinden önce yapılmak zorundadır, ama her iş ikilisi karşılaştırılabilir olmak zorunda değildir. Cebirsel yapılar makalesinde aynı ilişkiyi Hasse diyagramıyla çizmiştik. O zaman açık bıraktığımız soru şuydu: böyle bir bağımlılık kümesini gerçekten yapılabilir bir **sıraya** nasıl dizeriz?

Önce dili kuralım. **Yönlü döngüsüz graf (directed acyclic graph, DAG)**, hiçbir yönlü döngüsü olmayan yönlü graftır. Bir grafın **topolojik sıralaması (topological order)**, düğümlerin öyle bir sıralanışıdır ki her (u, v) kenarı için u, v'den önce gelir.

İlk soru varlıktır: hangi graflar topolojik olarak sıralanabilir? Cevap tam olarak DAG'lardır. Bir yönü kolay: sıralama varsa döngü olamaz, çünkü bir döngüde her düğüm kendinden önce gelmek zorunda kalırdı — ispat teknikleri makalesindeki çelişkiyle ispatın bir satırlık hâli. Diğer yön, aşağıdaki algoritmanın kendisiyle yapıcı biçimde ispatlanır.

Algoritma şaşırtıcı derecede kısadır. Tam DFS çalıştır ve düğümlerin **bitiş sırasını (finishing order)** kaydet — bir düğüm, bütün özyinelemeli çağrıları döndükten sonra "biter". **Bitiş sırasının tersi, DAG'da bir topolojik sıralamadır.**

İspat, her (u, v) kenarı için v'nin ziyaretinin u'nunkinden önce bitmesi gerektiğini göstermekten ibarettir ve iki duruma ayrılır. **Durum 1: u, v'den önce ziyaret edildi.** O zaman u'nun ziyareti bitmeden önce v ziyaret edilir — ya doğrudan (u, v) kenarından ya da başka bir yoldan — dolayısıyla v önce biter. **Durum 2: v, u'dan önce ziyaret edildi.** Graf döngüsüz olduğu için v'den u'ya gidilemez; yani v'nin ziyareti u'yu hiç görmeden biter. Her iki durumda da v önce biter, ters bitiş sırasında u önde olur. Durum ayrımıyla ispat, ispat teknikleri makalesinde kurduğumuz kalıptır.

Somutlaştıralım. Şu bağımlılık grafını alalım: a → c, a → d, b → d, c → e, d → e, d → f, e → g, f → g. Düğümleri a'dan g'ye alfabetik sırayla deneyerek tam DFS çalıştırırsak bitiş sırası g, e, c, f, d, a, b çıkar. Tersi: **b, a, d, f, c, e, g.** Sekiz kenarın hepsini tek tek denetle — hepsinde kaynak, hedeften önce geliyor. Dikkat çekici olan, b'nin en son ziyaret edilmesine rağmen sırada başa geçmesidir; bu, "en son biten en başa gelir" kuralının doğal sonucudur.

Aynı algoritma bedavaya **döngü tespiti** verir. Graf döngülüyse ters bitiş sırası topolojik sıralama olamaz; o hâlde sırayı bulduktan sonra her kenarı tek tek denetle — bir kenarın kaynağı hedefinden sonra geliyorsa graf döngülüdür. Denetim Θ(|E|) sürer. Yukarıdaki grafa g → a kenarını eklersek ters bitiş sırası aynı kalır ama tam olarak o kenar kuralı ihlal eder ve döngü yakalanır.

> **Sesli anlat:** "Topolojik sıralama nedir, ne zaman vardır ve nasıl bulursun? Doksan saniyede anlat ve doğruluğunu savun."
>
> İyi bir cevabın omurgası: "Yönlü bir grafın topolojik sıralaması, her kenarın kaynağının hedefinden önce geldiği bir düğüm sıralamasıdır. Var olmasının koşulu grafın yönlü döngüsüz olmasıdır: döngü varsa her düğüm kendinden önce gelmek zorunda kalır, bu imkânsızdır. Bulmak için tam derinlik öncelikli arama çalıştırırım ve düğümleri bitiş sırasına göre kaydederim; bu sıranın tersi bir topolojik sıralamadır. Doğruluğu iki duruma ayrılır: bir kenarın kaynağı önce ziyaret edilmişse hedef, kaynağın ziyareti bitmeden ziyaret edilip biter; hedef önce ziyaret edilmişse döngüsüzlük yüzünden oradan kaynağa ulaşılamaz, yani hedef yine önce biter. Maliyeti Θ(|V| + |E|). Aynı çalıştırmayla döngü tespiti de yaparım: elde ettiğim sırayı kenarlar üzerinde doğrularım, ihlal eden bir kenar varsa graf döngülüdür. Kavramsal olarak bu, kısmi sırayı tam sıraya genişletmektir ve genellikle birden çok geçerli cevap vardır."

Son bir bağlantı: topolojik sıralama tek değildir. Yukarıdaki örnekte a ile b arasında hiçbir bağımlılık yok, dolayısıyla ikisinin sırası serbesttir. Kısmi sıra tam sıra değildir; algoritmanın yaptığı şey, kısmi sırayı bozmadan onu bir tam sıraya **genişletmektir**. Kümeler makalesinde tanımladığımız iki kavram arasındaki fark, tam olarak burada bir algoritmaya dönüşüyor.

## Mülakatta nasıl görünür

Graf soruları genellikle graf diliyle sorulmaz. "Şu bağımlılıkları hangi sırayla çalıştırırsın?", "İki kişi arasındaki en kısa tanışıklık zinciri kaç adım?", "Bu yapılandırmada döngüsel bağımlılık var mı?" — üçü de graf sorusudur ve ilk iş problemi grafa çevirmektir: düğümler ne, kenarlar ne, graf yönlü mü, ağırlıklı mı?

Sonra sırayla üç şey söylenir. Temsil: graf seyrek mi yoğun mu, komşuluk listesi mi matris mi. Algoritma: BFS mi DFS mi, ve gerekçesi. Maliyet: Θ(|V| + |E|) ve bunun neden doğrusal sayıldığı.

Sık yapılan dört hata var. Birincisi, DFS'in bulduğu yolu en kısa yol sanmak. İkincisi, ziyaret işaretini koymayı unutmak — döngülü bir grafta bu sonsuz döngüdür ve tahtada kod yazarken en sık düşülen tuzaktır. Üçüncüsü, maliyeti yalnızca |V| cinsinden söylemek; graf algoritmalarında iki parametre vardır ve ikisi de söylenmelidir. Dördüncüsü, temsil seçimini hiç anmamak: aynı algoritma matris üzerinde Θ(|V|²), listeler üzerinde Θ(|V| + |E|) sürer ve seyrek grafta bu fark mertebelerdir.

İngilizce karşılıklar hazır olmalıdır: *adjacency list*, *adjacency matrix*, *sparse* / *dense*, *breadth-first search*, *depth-first search*, *shortest paths tree*, *connected component*, *reachability*, *directed acyclic graph (DAG)*, *topological sort*, *cycle detection*.

### Sırada ne var

Bu makaleyle veri yapıları fazı kapanıyor. Geriye dönüp bakınca fazın tamamı tek bir cümlenin çeşitlemesiydi: her yapı bir şeyi ucuzlatmak için başka bir şeyi pahalılaştırır ve iyi bir mühendis takası adıyla söyleyebilir.

Ama faz boyunca bir borç birikti. "Θ(n log n)", "Ω(n log n)", "O(n²)" gibi ifadeleri sürekli kullandık ve hiçbirinin formal tanımını vermedik. Karmaşıklık makalesinde Big-O'yu sezgisel anlattık ve "üst sınır, alt sınır ile sıkı sınır ayrımının formal tanımları asimptotik analiz makalesinde kurulacak" diye söz verdik. Hash ve sıralama makalelerinde karar ağacı argümanlarını kurarken "en az log₂ L yükseklik" adımını sezgiye dayandırdık. Şimdi bu borçları ödeme sırası geldi.

Sıradaki faz, yapı anlatmayı bırakıp **analiz ve tasarım** anlatıyor ve ilk makalesi asimptotik gösterimin formal tanımlarını kuruyor: O, Ω ve Θ'nın niceleyicili tanımları, tanımdan yürüyen ispatlar, limit testleri ve bu gösterimlerle yapılan klasik hatalar. Mantık makalesinde öğrendiğimiz niceleyici sırası orada teknik bir araca dönüşecek: "öyle bir c ve öyle bir n₀ vardır ki her n ≥ n₀ için…" kalıbı, bu serideki en önemli tanım kalıbıdır.

## Kaynakça

- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 9: Breadth-First Search ve Lecture 10: Depth-First Search — grafın küme ve komşuluk listeleri ikilisiyle temsili; komşuluk yapısının Θ(|V|) ve her listenin Θ(deg(u)) yer tutması, el sıkışma lemmasıyla toplam yerin Θ(|V| + |E|) olması ve graf algoritmalarında doğrusal zamanın Θ(|V| + |E|) anlamına gelmesi; yol, uzaklık ve en kısa yollar ağacı tanımları; BFS'in katman kümelerini üretmesi, katman üzerinde tümevarımla doğruluğu ve O(|V| + |E|) maliyeti; DFS'in özyinelemeli tanımı, erişilebilirlik ispatı ve O(|E|) maliyeti; tam BFS ve tam DFS ile bağlı bileşenlerin bulunması; DAG ve topolojik sıralama tanımları; ters bitiş sırasının DAG'da topolojik sıralama olduğunun iki durumlu ispatı ve döngü tespiti. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 4.1 (Undirected Graphs) ve 4.2 (Directed Graphs) — komşuluk listesi temsilinin varsayılan seçim olması ve aynı arayüzün komşuluk matrisiyle de gerçekleştirilebilmesi; DFS'in işaretleyerek özyinelemeli dolaşması ve kaynaktan erişilebilir düğümleri derecelerin toplamıyla orantılı sürede bulması; BFS'in kuyrukla en kısa yolları bulması ve en kötü durumda V + E ile orantılı sürmesi; bağlı olmanın bir denklik bağıntısı olması ve bileşenlerin denklik sınıfları olması; DFS ön işlemesiyle sabit zamanlı bağlılık sorgusu; bir yönlü grafın topolojik sıralamasının ancak ve ancak DAG ise var olması, DAG'da ters postorder'ın topolojik sıralama vermesi ve bunun V + E ile orantılı sürede hesaplanması. Addison-Wesley. [Bağlantı](https://algs4.cs.princeton.edu/41graph/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 20. bölüm (Elementary Graph Algorithms — graf temsilleri, genişlik öncelikli arama, derinlik öncelikli arama ve topolojik sıralama). MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE250 — Data Structures and Algorithms* (katalog tanımı "Graphs" başlığını içerir; bu makalenin resmî dayanağı odur). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe250/)
