---
article_id: article_5720977d-9343-4f86-bee7-b4d9bfc0a034
title: "Doğruluk: Döngü Değişmezleriyle İspat"
slug: dogruluk-dongu-degismezleriyle-ispat
category: algorithms
level: advanced
reading_order: 19
summary: "Bir algoritmanın doğru olduğunu ispatlamanın iki ayrı işe bölünmesi: kısmi doğruluk ve sonlanma. Floyd'un değişmez ilkesi, döngü değişmezinin üç adımı (başlatma, koruma, sonuçlanma) ve boş doğruluğun başlatma adımını neden bedava kıldığı; eklemeli sıralamanın ve ikili aramanın satır satır ispatı; sonlanmanın azalan bir ölçüyle ayrıca ispatlanması ve değişmezin korunduğu hâlde durmayan bir döngü; hızlı üs almanın kolay okunmayan değişmezi."
tags:
  - dogruluk
  - dongu-degismezi
  - ispat
  - sonlanma
  - eklemeli-siralama
content_hash: sha256:a7d1397da99c24aa13ad1d08d51e7a1e960bf47ed9e10799dd71da87876be2f7
classification_version: 1
classification_batch: 6
---
## Hızlı ama yanlış

Önceki iki makale bir algoritmanın **ne kadar sürdüğünü** ölçmeyi öğretti. Asimptotik tanımlar ölçüyü, yineleme bağıntıları ve Master Teoremi özyinelemeli maliyeti verdi. Ama bir mülakatçının sorduğu ikinci soru hep aynıdır ve çoğu adayı ilkinden daha çok zorlar: **doğru sonucu verdiğini nereden biliyorsun?**

"Denedim, çalışıyor" bir cevap değildir. Birkaç girdide çalışmak, bütün girdilerde çalışmayı ispatlamaz — karşı örnek disiplinini kurduğumuz makalede tam tersini konuşmuştuk: tek bir karşı örnek iddiayı yıkar, ama bin tane örnek onu ispatlamaz. Doğruluk, ölçü gibi hesaplanan değil, **ispatlanan** bir özelliktir.

Bu seride şimdiye kadar doğruluğu hep tümevarımla savunduk ve bu doğal bir seçimdi: savunduğumuz şeyler özyinelemeliydi, özyinelemenin yapısı da tümevarımın yapısına birebir oturuyordu. Oysa gerçek kodun büyük kısmı özyinelemeli değil, **döngülüdür**. Bu makale tümevarımın döngüler için giydiği kıyafeti kuruyor.

## Doğruluk ikiye bölünür

İlk adım, "doğru" kelimesini ikiye ayırmaktır. Bir hesaplama süreci hakkında iki ayrı şey ispatlanır:

**Kısmi doğruluk (partial correctness):** süreç bir sonuç ürettiğinde, ürettiği sonuç doğrudur. "Kısmi" kelimesi sonucun yarım doğru olduğu anlamına gelmez; sürecin belki hiç sonuç üretmeyeceği, bir döngüde takılıp kalabileceği anlamına gelir.

**Sonlanma (termination):** süreç her zaman bir sonuç üretir, yani durur.

Bu ayrım Robert W. Floyd'a aittir ve pratikte hayati bir sonucu vardır: **iki özellik iki ayrı araçla ispatlanır.** Kısmi doğruluk değişmezlerle, sonlanma iyi sıralama ilkesiyle gösterilir. Bir mülakatta yalnızca birincisini yapıp "ispatladım" demek eksik bir cevaptır ve iyi bir mülakatçı boşluğu hemen görür.

## Değişmez ilkesi

Bir programı **durum makinesi (state machine)** olarak düşün: her an bir durumdasın (bütün değişkenlerin o andaki değerleri), bir **başlangıç durumu** var ve **geçişler** seni bir durumdan diğerine taşıyor. Bu bakış açısıyla bakınca kritik kavram şudur:

**Korunan değişmez (preserved invariant):** durumlar üzerinde tanımlı bir P özelliğidir; P bir q durumunda doğruysa ve q durumundan r durumuna bir geçiş varsa, P r durumunda da doğrudur.

Buradan tek satırlık ama çok işlevli bir ilke çıkar.

**Değişmez İlkesi.** Korunan bir değişmez başlangıç durumunda doğruysa, erişilebilen bütün durumlarda doğrudur.

Bu ilke yeni bir şey değildir: adım sayısı üzerinde tümevarımın yeniden giydirilmiş hâlidir. Değişmezin başlangıç durumunda doğru olduğunu göstermek taban durumudur; korunduğunu göstermek tümevarım adımıdır. Yeni olan, bunu programlara uygulanacak biçimde paketlemesidir.

Programlardan bağımsız, sezgi kuran bir örnek: sonsuz bir tam sayı ızgarasında, başlangıçta orijinde duran ve her adımda çaprazlardan birine — yani (m, n) konumundan (m ± 1, n ± 1) konumuna — sıçrayan bir robot düşün. Robot (1, 0) noktasına ulaşabilir mi? Her geçişte koordinatların toplamı 0, +2 ya da −2 değişir; yani **toplamın çiftliği korunur**. Başlangıçta 0 + 0 = 0 çifttir, dolayısıyla erişilebilen her konumda koordinat toplamı çifttir. 1 + 0 = 1 tek olduğu için (1, 0) erişilemez. Bir tek satırlık değişmez, sonsuz bir olasılık kümesi hakkında kesin bir imkânsızlık sonucu verdi.

Bu ilkeyi 1967'de Carnegie Tech'te formüle eden Floyd, program doğrulamasının temellerine ve dilbilgisi kuramına katkılarıyla 1970'lerin sonunda Turing Ödülü aldı. İlkenin kendisi neredeyse aşikârdır; değerli olan, bu kadar basit bir yöntemin bu kadar geniş biçimde uygulanabildiğinin görülmesidir.

## Döngü değişmezinin üç adımı

Bir döngüde durumlar yineleme sınırlarıdır: her yinelemenin başında değişkenler bir değer taşır. **Döngü değişmezi (loop invariant)**, her yinelemenin başında doğru olan bir özelliktir ve ispatı üç adımda yapılır. Adların kaynağı CLRS'in ikinci bölümüdür ve mülakatta bu üç kelimeyi sırasıyla söyleyebilmek beklenir:

**Başlatma (initialization).** Değişmez, ilk yineleme başlamadan önce doğrudur.

**Koruma (maintenance).** Değişmez bir yinelemenin başında doğruysa, o yinelemenin gövdesi çalıştıktan sonra — yani bir sonraki yinelemenin başında — hâlâ doğrudur.

**Sonuçlanma (conclusion).** Döngü bittiğinde, değişmez ile döngünün çıkış koşulu **birlikte** istediğimiz sonucu verir.

Üçünün her biri ayrı bir iş yapar. Başlatma ile koruma birlikte, tümevarımın taban ve adım durumlarıdır; ikisi değişmezin döngü boyunca doğru kaldığını söyler. Asıl kazancı veren üçüncü adımdır: değişmez tek başına genellikle işe yaramaz, ama çıkış koşuluyla birleşince tam olarak ispatlamak istediğin şeye dönüşür.

Başlatma adımı çoğu zaman bedavadır ve bunun nedeni mantık makalesinde tanımladığımız **boş doğruluk (vacuous truth)** kavramıdır: bir döngü henüz hiç dönmemişken üzerinde konuştuğun aralık boştur ve boş bir küme hakkındaki "her elemanı şu özelliği sağlar" iddiası ihlal eden eleman bulunmadığı için doğrudur.

Bir uyarı, ve bu makalenin en sık atlanan noktası: **üçlü yalnızca kısmi doğruluk verir.** Sonuçlanma adımı "döngü bittiğinde" diye başlar; döngünün bittiğini varsayar, ispatlamaz. Sonlanma ayrı bir iştir ve birazdan ayrıca yapacağız. Türkçede iki kelimenin birbirine benzemesi tuzağı büyütür: **sonuçlanma** değişmez ispatının üçüncü adımıdır, **sonlanma** ise döngünün gerçekten durduğu iddiasıdır.

Değişmez yazarken niceleyici disiplini de asimptotik makalesindeki gibi geçerlidir. "Dizinin başı sıralı" bir değişmez değildir; "her i için, i'inci yinelemenin başında A[1..i − 1] alt dizisi sıralıdır" bir değişmezdir. Neyin, ne zaman, hangi aralıkta doğru olduğu yazılmalıdır.

## Eklemeli sıralamanın doğruluğu

Kanonik örnek eklemeli sıralamadır. Sıralama makalesinde algoritmayı tanımış ve maliyetini konuşmuştuk; şimdi doğruluğunu ispatlıyoruz. Bir tanesi 1 tabanlı olmak üzere satırları numaralayalım:

```
1  for i = 2 to n
2      key = A[i]
3      j = i - 1
4      while j >= 1 and A[j] > key
5          A[j + 1] = A[j]
6          j = j - 1
7      A[j + 1] = key
```

Önce yanlış bir değişmez deneyelim, çünkü öğretici olan orası. "A[1..i − 1] sıralıdır" değişmezini alsan üç adımı da geçirebilirsin — ama bu değişmez, ilk i − 1 hücreyi sıfırlayan bir programı da onaylar. Sıfırlarla dolu bir dizi de sıralıdır. Eksik olan, elemanların **kaybolmadığıdır**.

Doğru değişmez şudur: **her i için, dış döngünün i'inci yinelemesi başlarken A[1..i − 1] alt dizisi, dizinin başlangıçtaki A[1..i − 1] elemanlarının sıralı bir permütasyonudur.** İspat edilecek şey ne kadar güçlüyse tümevarım hipotezi de o kadar güçlü olur; önceki makalede yineleme çözerken öğrendiğimiz "hipotezi güçlendir" refleksi burada da geçerlidir.

**Başlatma.** i = 2 iken A[1..1] tek elemanlıdır. Tek elemanlı bir dizi hem sıralıdır hem de kendisinin permütasyonudur. Adım bedava geldi.

**Koruma.** İçteki `while` döngüsü, key'den büyük olan elemanları birer hücre sağa kaydırır ve durduğunda A[j + 1] boşalmış olur. İç döngünün kendi değişmezi de yazılabilir: **A[j + 2..i] hücreleri, yinelemenin başındaki A[j + 1..i − 1] elemanlarını taşır, hepsi key'den büyüktür ve aralarında sıralıdır; A[1..j] hiç dokunulmamıştır.** Döngü ya j = 0 olduğu için ya da A[j] ≤ key olduğu için durur. İki durumda da yedinci satır key'i doğru yere koyar: solunda kalan her şey key'den küçük ya da eşit, sağında kalan her şey key'den büyüktür ve ikisi de kendi içinde sıralıdır. Hiçbir eleman silinmedi, yalnızca yer değiştirdi. Böylece A[1..i] sıralı bir permütasyon olur ve bu, bir sonraki yinelemenin başındaki değişmezin ta kendisidir.

**Sonuçlanma.** Döngü i = n + 1 olunca biter. Değişmezde i yerine n + 1 koy: A[1..n] alt dizisi, başlangıçtaki A[1..n] elemanlarının sıralı bir permütasyonudur. A[1..n] bütün dizidir; yani dizi sıralanmıştır ve içindeki elemanlar aynı elemanlardır. İstediğimiz tam olarak buydu. Şekil 1 üç adımı [5, 2, 4, 6, 1, 3] dizisi üzerinde gösteriyor.

![Üç satırlı bir şema. Üstte başlatma etiketiyle altı hücreli bir dizi var: beş, iki, dört, altı, bir, üç. Yalnızca ilk hücrenin üstünde sıralı önek yazan koyu bir bant duruyor ve altında i eşittir iki yazıyor. Ortada koruma etiketiyle aynı dizinin dördüncü yineleme sırasındaki hâli var: ilk üç hücre iki, dört, beş olarak sıralanmış ve üstlerinde sıralı önek bandı duruyor; dördüncü hücredeki altı değeri anahtar olarak dışarı alınmış ve oka bağlı bir kutuda gösteriliyor; kalan iki hücre bir ve üç değerlerini taşıyor. Bandın altında i eşittir dört yazıyor. En altta sonuçlanma etiketiyle bir, iki, üç, dört, beş, altı biçiminde tamamen sıralı dizi var ve bant bütün diziyi kaplıyor; altında i eşittir yedi, yani n artı bir yazıyor. En altta değişmezin tam ifadesi duruyor: i'inci yinelemenin başında A bir ile i eksi bir arası, başlangıçtaki aynı hücrelerin sıralı bir permütasyonudur](assets/eklemeli-siralama-degismezi.svg "Şekil 1 — Eklemeli sıralamanın döngü değişmezi: başlatma, koruma, sonuçlanma")

> **Sesli anlat:** "Döngü değişmezi nedir, üç adımı nedir ve bir döngünün doğruluğunu onunla nasıl ispatlarsın? Doksan saniye."
>
> İyi bir cevabın omurgası: "Döngü değişmezi, döngünün her yinelemesinin başında doğru olan bir özelliktir ve üç adımda kullanılır. Başlatmada değişmezin ilk yinelemeden önce doğru olduğunu gösteririm; bu genellikle boş doğrulukla bedava gelir, çünkü ilgilendiğim aralık henüz boştur. Koruma adımında, bir yinelemenin başında doğruysa gövdenin sonunda da doğru kaldığını gösteririm — bu tümevarım adımının aynısıdır. Sonuçlanmada döngünün çıkış koşulunu değişmezle birleştiririm ve ispatlamak istediğim şeyi okurum. Eklemeli sıralamada değişmez şudur: i'inci yinelemenin başında A[1..i − 1], başlangıçtaki aynı elemanların sıralı bir permütasyonudur. Permütasyon şartını mutlaka koyarım, yoksa diziyi sıfırlayan bir program da değişmezi sağlar. Döngü i = n + 1'de bittiği için sonuçlanma adımı bütün dizinin sıralı olduğunu verir. Bir uyarı eklerim: bu üçlü yalnızca kısmi doğruluk verir; döngünün durduğunu ayrıca ispatlamak gerekir."

## İkili aramanın doğruluğu

İkinci örnek, aynı yöntemin çok farklı bir algoritmada nasıl göründüğünü gösteriyor. Sıralı bir A[1..n] dizisinde x arıyoruz. Değişkenler bir kapalı aralığı sınırlar:

```
1  lo = 1;  hi = n
2  while lo <= hi
3      mid = ⌊(lo + hi) / 2⌋
4      if A[mid] = x then return mid
5      if A[mid] < x then lo = mid + 1
6      else hi = mid - 1
7  return "yok"
```

Değişmez tek cümledir ve algoritmanın bütün fikri odur: **her yinelemenin başında, x dizide bulunuyorsa indisi lo ile hi arasındadır.** Sedgewick ve Wayne aynı fikri "aranan anahtarı içerebilecek alt diziyi sınırlayan indisler" diye anlatır.

**Başlatma.** lo = 1 ve hi = n iken aralık bütün dizidir; x dizideyse indisi elbette bu aralıktadır.

**Koruma.** Kritik adım budur ve **dizinin sıralı olduğu varsayımı tam burada kullanılır.** A[mid] değeri x'ten küçükse, sıralılık nedeniyle A[1..mid] hücrelerinin hepsi x'ten küçüktür; dolayısıyla x bu bölgede olamaz ve lo'yu mid + 1 yapmak hiçbir olasılığı elemez. Simetrik olarak A[mid] değeri x'ten büyükse x, mid ve sağındaki hücrelerde olamaz; hi = mid − 1 güvenlidir. Her iki dalda da değişmez korunur.

**Sonuçlanma.** Döngü lo > hi olunca biter; o anda [lo, hi] aralığı **boştur**. Değişmez "x dizideyse indisi bu aralıktadır" diyor, aralık boş; öyleyse x dizide değildir ve yedinci satır doğru cevabı döndürür. Boş doğruluk bu kez başlatmada değil, sonuçlanmada iş gördü: boş bir aralıkta hiçbir indis olmadığı için varsayım imkânsız hâle geldi. Dördüncü satırdan dönüldüğünde ise A[mid] = x zaten doğrudan doğrulanmıştır.

Somut bir iz: A = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] dizisinde 40 aranırken aralıklar sırasıyla [1, 10], [6, 10], [6, 7], [7, 7] olur ve dördüncü karşılaştırmadan sonra lo = 8 > hi = 7 ile döngü biter — "yok" doğru cevaptır. Aralık uzunlukları 10, 5, 2, 1, 0 diye iner. Sedgewick ve Wayne'in önermesi bu davranışı sayıya bağlar: N anahtarlı sıralı bir dizide ikili arama en kötü durumda lg N + 1'den fazla karşılaştırma yapmaz; burada N = 10 için sınır yaklaşık 4,32 ve gözlenen en kötü değer 4'tür. Şekil 2 aramanın aralığını ve yanında azalan ölçüyü gösteriyor.

![İki sütunlu bir şema. Solda üst üste dört satır var ve her satır on hücreli aynı sıralı diziyi gösteriyor: iki, beş, sekiz, on iki, on altı, yirmi üç, otuz sekiz, elli altı, yetmiş iki, doksan bir. Birinci satırda bütün dizi koyu bir bantla işaretli ve beşinci hücre olan on altı orta eleman olarak vurgulanmış. İkinci satırda yalnızca altıncıdan onuncuya kadar olan hücreler bantlı ve sekizinci hücre olan elli altı vurgulanmış. Üçüncü satırda altıncı ve yedinci hücreler bantlı, altıncı hücre olan yirmi üç vurgulanmış. Dördüncü satırda yalnızca yedinci hücre bantlı ve otuz sekiz vurgulanmış. Başlıkta değişmez yazıyor: kırk dizideyse indisi lo ile hi arasındadır. Sağ sütunda her satırın karşısında lo ve hi değerleriyle aralık uzunluğu yazıyor: on, beş, iki, bir. En altta kesikli çizgili boş bir aralık satırı var ve karşısında lo sekiz büyüktür hi yedi, uzunluk sıfır yazıyor. Sağ sütunun başlığı ölçü hi eksi lo artı bir. En altta iki not: başlatmada aralık bütün dizidir ve korumada sıralılık yalnızca burada kullanılır; sonuçlanmada aralık boşalınca değişmez kırkın dizide olmadığını söyler ve ölçü her adımda en az yarılanır](assets/ikili-arama-degismezi.svg "Şekil 2 — İkili aramanın değişmezi ve sonlanmayı veren azalan ölçü")

## Sonlanma ayrı bir ispattır

Şimdi ertelediğimiz işe geliyoruz. Bir döngünün durduğunu göstermenin standart yolu, duruma bir **ölçü** atamaktır: durumları doğal sayılara götüren bir f fonksiyonu bul, her geçişte f'in **kesin olarak azaldığını** göster. Doğal sayılar iyi sıralı olduğu için — tümevarım makalesindeki iyi sıralama ilkesi — azalan bir doğal sayı dizisi sonsuza kadar sürmez. Dahası nicel bir sonuç da çıkar: bir q durumundan başlayan yürütmenin uzunluğu en fazla f(q) adımdır. Böyle bir ölçüye **türetilmiş değişken (derived variable)** denir.

Örneklerimizde ölçüyü bulmak kolaydır. Eklemeli sıralamanın dış döngüsünde n − i azalır ve n − 1 adımda tükenir; iç döngüde j azalır ve en fazla i − 1 adımda 0'a iner. İkili aramada ölçü aralık uzunluğu hi − lo + 1'dir: her yinelemede en az yarıya iner, çünkü mid aralığın içindedir ve mid ya aralıktan çıkarılır ya da aralığın yarısıyla birlikte atılır.

Ölçünün **kesin** azalması şarttır; "azalır ya da aynı kalır" yetmez. Sonsuz bir yürütme, zayıf anlamda azalan bir ölçünün sabit kaldığı durumlarda pekâlâ ilerleyebilir. Bunu somutlaştıran, gerçek kodda sürekli karşılaşılan bir hata var. İkili aramayı yarı açık aralıkla yazmayı deneyip beşinci satırda `lo = mid + 1` yerine `lo = mid` yazdığını düşün. Değişmez hâlâ korunur — x, [lo, hi] aralığındaysa mid'den sonra da o aralıktadır — ama lo = hi − 1 durumuna gelindiğinde mid = lo çıkar, lo değişmez ve döngü sonsuza kadar döner. Yukarıdaki on elemanlı dizide 91 aranırken program tam olarak buraya takılır: değişmez ihlal edilmemiştir, algoritma yine de asla cevap vermez. Kısmi doğruluk ile sonlanmanın ayrı iki iş olduğunun daha net bir kanıtı zor bulunur.

Ölçünün mutlaka bir doğal sayı olması da gerekmez; iyi sıralı bir kümeye giden kesin azalan herhangi bir ölçü sonlanmayı verir. Bu genelleme, adım sayısı önceden sınırlanamayan süreçlerde işe yarar; ama mülakatta karşına çıkacak döngülerin neredeyse tamamı doğal sayılı basit bir ölçüyle kapanır.

## Değişmez okunmaz, bulunur

Şimdiye kadarki iki değişmez, algoritmaya bakınca görülebilecek türdendi. Her zaman böyle olmaz; doğru değişmezi keşfetmek çoğu zaman ispatın **asıl zor kısmıdır**. Bunu gösteren güzel bir örnek hızlı üs alma algoritmasıdır: aᵇ hesaplamak için b − 1 çarpma yapmak yerine, üssü ikili gösterimi üzerinden işleyerek logaritmik sayıda çarpmayla sonuca varır.

```
x = a;  y = 1;  z = b
while z ≠ 0
    r = z mod 2;  z = ⌊z / 2⌋
    if r = 1 then y = x · y
    x = x · x
return y
```

Kodun içinde "y sonucun bir parçasıdır" gibi bir cümle yazmıyor. Doğru değişmez şudur ve tahtaya yazana kadar görünmez: **z bir doğal sayıdır ve y · xᶻ = aᵇ eşitliği her yinelemenin başında geçerlidir.**

**Başlatma.** Başlangıçta (x, y, z) = (a, 1, b) ve 1 · aᵇ = aᵇ. Sağlanıyor.

**Koruma.** İki durum var. z çiftse yeni değerler (x², y, z/2) olur ve y · (x²)^(z/2) = y · xᶻ değişmedi. z tekse yeni değerler (x², x·y, (z − 1)/2) olur ve (x·y) · (x²)^((z − 1)/2) = y · x^(1 + z − 1) = y · xᶻ; yine değişmedi. Her iki dalda da çarpım korunuyor.

**Sonuçlanma.** Döngü yalnızca z = 0 olduğunda biter. Değişmezde z = 0 koy: y · x⁰ = y = aᵇ. Döndürülen değer istenen değerdir.

**Sonlanma.** Ölçü z'dir: her yinelemede en az yarıya iner, doğal sayıdır, dolayısıyla en fazla ⌈log₂ b⌉ + 1 yinelemede 0'a ulaşır. Her yinelemede en fazla iki çarpma yapıldığı için toplam çarpma sayısı 2(⌈log₂ b⌉ + 1) ile sınırlıdır.

Sayıyla görelim: a = 3, b = 13 için (x, y, z) üçlüsü (3, 1, 13) → (9, 3, 6) → (81, 3, 3) → (6561, 243, 1) → (43046721, 1594323, 0) yolunu izler. Dört yinelemede 7 çarpmayla 3¹³ = 1.594.323 bulunur; naif yöntem 12 çarpma isterdi. Her satırda y · xᶻ çarpımının 1.594.323'e eşit kaldığını kontrol edebilirsin — değişmez tam olarak bunu söylüyor.

> **Sesli anlat:** "Bir algoritmanın durduğunu nasıl ispatlarsın? Değişmez bunun için yeter mi? Altmış saniye."
>
> İyi bir cevabın omurgası: "Yetmez. Döngü değişmezi kısmi doğruluk verir: döngü bittiğinde sonucun doğru olduğunu söyler, ama bittiğini söylemez. Sonlanma için ayrı bir argüman kurarım: duruma bir ölçü atarım — doğal sayı değerli, her yinelemede kesin olarak azalan bir büyüklük — ve iyi sıralama ilkesine dayanırım, çünkü azalan bir doğal sayı dizisi sonsuza kadar süremez. İkili aramada ölçü aralık uzunluğu hi − lo + 1'dir ve her adımda en az yarılanır; hızlı üs almada ölçü üstür ve her adımda yarılanır. Ölçünün **kesin** azalması şart; zayıf azalma yetmez. Klasik örnek, ikili aramada lo'yu mid + 1 yerine mid yapmaktır: değişmez hâlâ korunur ama ölçü sabit kalabilir ve döngü sonsuza girer."

## Mülakatta nasıl görünür

"Bu algoritma neden doğru?" sorusunun iyi cevabı sabit bir iskelete oturur. Önce değişmezi **tek cümlede ve tam** söyle: hangi büyüklük, hangi aralıkta, ne zaman. Sonra üç adımı sırayla geç. Sonra sonlanmayı ayrıca ispatla ve ölçünü adıyla ver. Bu sıra, cevabı ezberden anlatmakla anlayarak anlatmak arasındaki farkı gösterir.

Dört tipik hata var. Değişmezi fazla zayıf kurmak — eklemeli sıralamada permütasyon şartını unutmak bunun kanonik örneğidir. Sonuçlanma adımını atlayıp "değişmez doğru, demek ki algoritma doğru" demek; değişmez tek başına hiçbir şey ispatlamaz, çıkış koşuluyla birleşmesi gerekir. Sonuçlanma ile sonlanmayı karıştırmak. Ve döngünün sıralılık gibi bir önkoşulunu hangi adımda kullandığını gösterememek; ikili aramada sıralılık tam olarak koruma adımında devreye girer, başka hiçbir yerde değil.

İngilizce karşılıklar hazır olmalıdır: *loop invariant*, *initialization*, *maintenance*, *termination*, *partial correctness*, *preserved invariant*, *well ordering principle*, *derived variable*, *decreasing measure*, *off-by-one error*.

### Sırada ne var

Artık bir algoritmanın maliyetini hesaplayabiliyor ve doğruluğunu ispatlayabiliyoruz. Bu ikisi **analiz** araçlarıdır: önümüze konmuş bir algoritmayı değerlendirirler. Faz C'nin bundan sonraki bölümü karakter değiştiriyor ve **tasarım** desenlerine geçiyor: bir problemle karşılaştığında algoritmayı nereden bulacaksın?

İlk desen tanıdık: böl ve yönet. Bu seride onu zaten birkaç kez kullandık — birleştirmeli sıralama, ikili arama, hızlı üs almanın kendisi bile aynı fikrin türevleridir. Sıradaki makale onu bir **tasarım deseni** olarak kuruyor ve şaşırtıcı bir soruyla başlıyor: bir problemi ikiye bölmek tek başına hiçbir şey kazandırmayabilir. O hâlde kazanç tam olarak nereden geliyor? Cevap iki yerdedir ve ikisi de önceki makalenin yineleme bağıntısında açıkça görünür.

## Kaynakça

- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (ders notları), 5.4 (State Machines) — durum makinesinin ikili bağıntı olarak tanımı; 5.4.2 çapraz hareket eden robot ve koordinat toplamının çiftliğinin korunması, (1, 0) noktasının erişilemezliği; 5.4.3 yürütme ve erişilebilir durum tanımları, korunan değişmezin tanımı (Tanım 5.4.5) ve Değişmez İlkesi ile bunun tümevarım ilkesinin yeniden ifadesi olması; Robert W. Floyd'un ilkeyi 1967'de Carnegie Tech'te formüle etmesi ve Turing Ödülü; 5.4.5 Floyd'un kısmi doğruluk ile sonlanma ayrımı ("partial correctness" teriminin kaynağı), hızlı üs alma programı, z ∈ ℕ ve y·xᶻ = aᵇ değişmezinin çift ve tek durumlar için ayrı ayrı korunduğunun gösterilmesi, kısmi doğruluğun z = 0'dan okunması ve çarpma sayısının en fazla 2(⌈log b⌉ + 1) olması; 5.4.6 türetilmiş değişkenler, kesin ve zayıf azalma tanımları (Tanım 5.4.6), Teorem 5.4.7 (kesin azalan N-değerli bir ölçü varsa yürütme uzunluğu en fazla f(q)'dur), Teorem 5.4.8 (iyi sıralı kümeye giden kesin azalan ölçü sonlanmayı verir) ve zayıf azalmanın sonlanmayı garanti etmemesi; ayrıca "uygun bir değişmezi keşfetmek zor olabilir" uyarısı. MIT OpenCourseWare 6.042J. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 2. bölüm (Getting Started) — döngü değişmezi kavramının başlatma, koruma ve sonuçlanma adımlarıyla kurulması ve eklemeli sıralamanın bu araçla ispatlanması bu bölümün kanonik içeriğidir; bu makaledeki üç adımın adları oradan gelir. MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 2.1 (Elementary Sorts) ve 3.1 (Elementary Symbol Tables) — eklemeli sıralamanın "kartları teker teker alıp sıralı tuttuğun elin doğru yerine yerleştirmek" biçiminde tarifi ve en iyi durumda N − 1 karşılaştırmayla 0 takas yapması; ikili aramanın "aranan anahtarı içerebilecek alt diziyi sınırlayan indisleri koruma" fikri ve Önerme B: N anahtarlı sıralı bir dizide arama en kötü durumda lg N + 1'den fazla karşılaştırma yapmaz. Addison-Wesley. [Bağlantı](https://algs4.cs.princeton.edu/31elementary/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE300 — Analysis of Algorithms* (ders çıktıları "the theory of complexity analysis, basic techniques that are commonly used in analyzing the performance" ifadesini içerir; algoritma doğrulaması bu çerçevenin parçasıdır). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe300/)
