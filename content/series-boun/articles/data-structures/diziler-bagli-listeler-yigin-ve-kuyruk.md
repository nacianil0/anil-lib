---
article_id: article_8f8aabe8-a41a-4f75-b02f-62c8ae0ebf0c
title: "Diziler, Bağlı Listeler, Yığın ve Kuyruk"
slug: diziler-bagli-listeler-yigin-ve-kuyruk
category: data-structures
level: intermediate
reading_order: 10
summary: "Faz B'nin ilk somut yapıları: arayüz ile temsil ayrımı, dizinin bitişik bellek düzeni ve indis aritmetiği, bağlı listenin işaretçi maliyeti, dinamik dizi büyütmesiyle amortize maliyetin kurulması ve ortalama durumdan ayrılması, yığın ile kuyruğun arayüz olarak tanımlanması ve dört yapının işlem başına maliyet tablosu."
tags:
  - dizi
  - bagli-liste
  - yigin
  - kuyruk
  - amortize-maliyet
content_hash: sha256:cd0e0b22b774b4d32c206ad53c4e13cd729a616dd3b8b2fb9bdf2b6720b475f7
classification_version: 1
classification_batch: 3
---
## Arayüz bir söz, temsil bir faturadır

Karmaşıklık makalesinde maliyeti makineden bağımsız ölçmeyi ve adım saymayı öğrendik. Şimdi o ölçüyü ilk kez gerçek yapıların üzerinde kullanıyoruz. Bu fazın her makalesinde aynı soru tekrar edecek: **bu yapı neyi ucuzlatmak için neyi pahalılaştırıyor?**

Soruyu düzgün sorabilmek için önce bir ayrım gerekir. Bir veri yapısı tartışmasının iki katmanı vardır: **arayüz (interface)** hangi işlemlerin desteklendiğini söyler, **temsil (representation)** o işlemlerin nasıl gerçekleştirildiğini söyler. Arayüz problemdir, temsil çözümdür. "Sona ekle, baştan çıkar" bir arayüzdür; bunu dizi üstünde de bağlı liste üstünde de gerçekleştirebilirsin, ama iki gerçekleştirme aynı sözü farklı fiyata tutar.

Bu ayrım mülakatta doğrudan işe yarar. "Hangi veri yapısını kullanırdın?" sorusunun iyi cevabı bir yapı adıyla başlamaz; hangi işlemlerin sık, hangilerinin seyrek olduğunu saymakla başlar. Fiyat listesi ancak ondan sonra anlam kazanır.

## Dizi: indis bir fonksiyondur

Kümeler ve fonksiyonlar makalesinde fonksiyonu, tanım kümesindeki her elemanı değer kümesinde tam bir elemana götüren kural diye tanımlamıştık. Bir **dizi (array)** tam olarak budur: tanım kümesi 0'dan n − 1'e kadar olan indisler, değer kümesi saklanan öğeler.

Bu fonksiyonu ucuz kılan şey bellek düzenidir. Dizi elemanları bellekte **bitişik (contiguous)** durur ve hepsi aynı boyuttadır. Bu yüzden i'inci elemanın adresi tek bir çarpma ve bir toplamayla bulunur: taban adres artı i çarpı eleman boyutu. Hesap i'nin büyüklüğüne bağlı değildir; ilk eleman ile milyonuncu eleman aynı fiyata gelir. RAM modelinin "her hücreye erişim aynı maliyettedir" varsayımı burada doğrudan nakde çevrilir ve indisle okuma ile indise yazma sabit zamanlı olur.

Bedeli aynı düzenin kendisidir. Diziye ortadan bir eleman eklemek istersen, arkasındaki bütün elemanları bir hücre sağa kaydırmak zorundasın; başa ekleme en kötü hâldir ve n kaydırma yapar. Silme simetriktir. Yani dizi, konumsal erişimi ucuzlatmak için yapısal değişikliği pahalılaştırır.

İkinci ve daha az konuşulan bir bedel daha var: dizi tek parça yer ister. Bir milyon elemanlık dizi, bellekte bir milyon elemanlık **kesintisiz** bir bloğun bulunmasına bağlıdır; toplam boş bellek yetse bile parçalıysa tahsis başarısız olabilir.

Şekil 1 iki bellek düzenini yan yana koyuyor.

![Üstte bitişik bellek hücrelerinden oluşan bir dizi: her hücrenin adresi taban adres artı indis çarpı eleman boyutu formülüyle etiketlenmiş, ortaya ekleme yapıldığında sağdaki hücrelerin kaydığı oklarla gösterilmiş. Altta bellekte dağınık duran bağlı liste düğümleri: her düğümde öğe ve sonraki alanları var, oklar düğümleri birbirine bağlıyor ve başa ekleme yalnızca iki işaretçiyi değiştiriyor](assets/dizi-ve-bagli-liste.svg "Şekil 1 — Bitişik dizi ile dağınık bağlı listenin bellek düzeni")

## Bağlı liste: bitişikliği bırakmak

**Bağlı liste (linked list)**, bitişiklik varsayımını terk eder. Her öğe kendi **düğümünde (node)** saklanır ve düğüm, sıradaki düğümün adresini tutan bir **işaretçi (pointer)** taşır. Yapı, ilk düğümü gösteren tek bir **baş (head)** işaretçisiyle tutulur.

Kazanç yapısal değişikliktedir. Başa eklemek için yeni bir düğüm ayırır, onun sonraki alanına eski başı yazar ve başı yeni düğüme çevirirsin: üç atama, sabit maliyet. Baştan silmek de aynı şekilde sabittir. Elindeki düğümün adresini zaten biliyorsan araya ekleme de sabittir; kaydırma diye bir şey yoktur, çünkü kaydırılacak bitişik komşu yoktur.

Bedeli erişimdedir. i'inci elemana gitmek için baştan başlayıp i kez ilerlemek zorundasın; indis aritmetiği yoktur, çünkü düğümlerin adresleri arasında hesaplanabilir bir ilişki yoktur. Bu yüzden konumsal erişim doğrusaldır. Sırasız bir listede arama da doğrusaldır — ama dikkat: sırasız bir **dizide** arama da doğrusaldır. Bağlı listenin dizi karşısında kaybettiği şey arama değil, konumsal erişimdir.

Üç maliyet daha görünür olmalıdır. Her düğüm için fazladan işaretçi yeri ödersin. Düğümler bellekte dağınık durduğu için gerçek makinede önbellek davranışı dizininkinden kötüdür; bu, RAM modelinin dışarıda bıraktığı ve pratikte sabit çarpanı büyüten bir kalemdir. Ve tek yönlü listede bir düğümü silmek için **önceki** düğüme ihtiyacın vardır; her düğümün hem sonrakini hem öncekini tuttuğu **çift yönlü bağlı liste (doubly linked list)** bunu düğüm başına bir işaretçi daha ödeyerek çözer.

> **Sesli anlat:** "Diziyle bağlı liste arasındaki maliyet farkını ve hangisini ne zaman seçtiğini doksan saniyede anlat."
>
> İyi bir cevabın omurgası: "Dizi elemanları bellekte bitişik durur, bu yüzden i'inci elemanın adresi taban adres artı i çarpı eleman boyutuyla hesaplanır ve indisle erişim sabit zamanlıdır; buna karşılık ortaya ekleme ve silme, arkadaki elemanları kaydırmayı gerektirdiği için doğrusaldır. Bağlı listede düğümler dağınık durur ve işaretçiyle bağlanır; elimde düğümün adresi varsa ekleme ve silme sabit zamanlıdır, ama i'inci elemana ulaşmak baştan yürümeyi gerektirir, yani doğrusaldır. Erişim ve tarama ağırlıklı, boyutu belli bir iş için diziyi; uçlardan ya da elimdeki düğümden sık ekleme ve silme yapan bir iş için bağlı listeyi seçerim. Bağlı liste düğüm başına ek işaretçi yeri öder ve dağınık yerleşimi yüzünden gerçek makinede önbellek davranışı daha kötüdür."

## Dinamik dizi ve amortize maliyet

Dizi sabit zamanlı erişim verir ama boyutu sabittir. Sona ekleme yapabilmek için her seferinde bir büyük dizi ayırıp bütün elemanları kopyalarsak, n ekleme için 1 + 2 + ⋯ + (n − 1) kopyalama, yani karesel bir maliyet öderiz. Bu kabul edilemez.

**Dinamik dizi (dynamic array)** fikri şudur: dizi dolduğunda kapasiteyi bir artırmak yerine **katlarsın**, tipik olarak ikiye. Böylece pahalı kopyalama seyrekleşir ve iki pahalı adım arasında gittikçe daha çok ucuz adım sığar.

Hesabı bir kere elle yapalım. Kapasite 1'den başlasın ve her dolduğunda ikiye katlansın. Bin kez sona ekleme yaparsan yeniden tahsisler kapasite 1, 2, 4, …, 512 iken olur ve kopyalanan toplam eleman sayısı 1 + 2 + 4 + ⋯ + 512 = 1023'tür. Bu, ikinin kuvvetlerinin toplamının bir sonraki kuvvetin bir eksiği olmasının doğrudan sonucudur; dolayısıyla toplam kopyalama işi her zaman 2n'in altında kalır. Bin eklemenin toplam maliyeti bin ekleme adımı artı 1023 kopyalama adımıdır, yani işlem başına üç adımın altında: **sabit**.

Bu sonucun adı vardır: sona ekleme **amortize (amortized)** sabit zamanlıdır. Tanımı şudur: bir işlemin amortize maliyeti T(n) ise, k işlemden oluşan herhangi bir dizinin toplam maliyeti en fazla k çarpı T(n)'dir. Tek bir işlem doğrusal olabilir; garanti tek işlem için değil, **işlem dizisi** içindir.

Buradaki ayrım mülakatın sevdiği tuzaklardan biridir ve karmaşıklık makalesinde bilerek askıya almıştık. **Amortize maliyet ile ortalama durum aynı şey değildir.** Ortalama durum bir **olasılık dağılımı** varsayar: girdiler şu dağılımdan gelirse beklenen maliyet budur. Amortize maliyet hiçbir olasılık varsayımı yapmaz; en kötü işlem dizisi için bile geçerli bir **muhasebe** sonucudur. Şanssız bir kullanıcı ortalamanın dışına düşebilir, ama amortize garantiyi delemez.

Silme tarafı düşünülmeden yapı yarım kalır. Diziyi doluluk oranı yarının altına düştüğü anda yarıya indirirsen, tam sınırda ekleme ve silmeyi dönüşümlü yapan bir kullanıcı her adımda yeniden tahsis tetikler ve amortize garanti çöker. Standart çözüm iki eşiği ayırmaktır: küçültmeyi daha düşük bir doluluk oranında yap ve küçülttükten sonra diziyi tam dolu bırakma. Böylece pahalı bir adımdan sonra bir sonrakine kadar yine doğrusal sayıda ucuz adım yapılması **zorunlu** hâle gelir. Şekil 2 bu muhasebeyi gösteriyor.

![Sona ekleme işlemlerinin tek tek maliyetini gösteren çubuklar: çoğu çubuk bir birim yüksekliğinde, kapasitenin katlandığı yerlerde tek tek yükselen sivri çubuklar var ve sivrilerin arası her seferinde iki katına çıkıyor. Altta aynı işlemlerin toplam maliyetini işlem sayısına bölen düz amortize çizgisi ve kopyalama toplamının iki n sınırının altında kaldığını gösteren hesap kutusu](assets/amortize-buyutme.svg "Şekil 2 — Dinamik dizi büyütmesinde tek işlem maliyeti ile amortize maliyet")

> **Sesli anlat:** "Amortize maliyetle ortalama durumun farkını ve dinamik dizide sona eklemenin neden amortize sabit olduğunu altmış saniyede açıkla."
>
> İyi bir cevabın omurgası: "Dizi dolduğunda kapasiteyi ikiye katlarım. Kopyalanan toplam eleman sayısı bir artı iki artı dört diye gider ve her zaman iki n'in altında kalır; yani n eklemenin toplam maliyeti n ile orantılıdır ve işlem başına sabittir. Buna amortize sabit denir. Ortalama durumdan farkı şudur: ortalama durum girdilerin bir olasılık dağılımından geldiğini varsayar, amortize maliyet ise hiçbir dağılım varsaymaz; en kötü işlem dizisi için bile geçerli bir toplam maliyet muhasebesidir. Tek bir ekleme yine doğrusal olabilir, garanti edilen şey dizinin toplamıdır."

## Yığın ve kuyruk: arayüzü kısıtlamak

Yığın ve kuyruk yeni bir bellek düzeni getirmez; var olan düzenlerin üzerine **kısıtlanmış bir arayüz** koyar. İkisi de erişimi tek bir uca indirger ve karşılığında her işlemi sabit zamanlı yapar.

**Yığın (stack)** son giren ilk çıkar kuralıyla çalışır: yalnızca sona ekler ve yalnızca sondan alırsın. Dinamik dizi üzerinde gerçekleştirildiğinde iki işlem de amortize sabit zamanlıdır. Yığının kanonik kullanımı, işi askıya alıp sonra kaldığın yerden devam etmendir; özyinelemeli çağrıların çerçevelerini tutan çağrı yığını da, parantez eşleştirme de, geri izlemeli arama da aynı desendir. Karmaşıklık makalesinde "özyineleme derinliği doğrudan bellek maliyetidir" derken kastedilen tam olarak bu yığındı.

Bir uyarı: Türkçede *yığın* sözcüğü hem *stack* hem de *heap* için kullanılabiliyor. Bu seride **yığın = stack**'tir; öncelik kuyruğunu gerçekleştiren ağaç yapısına, karışıklık olmasın diye kendi makalesinde **heap** adıyla devam edeceğiz. Mülakat İngilizce yürüyeceği için ikisini İngilizce adlarıyla ayırabilmek zaten gereklidir.

**Kuyruk (queue)** ilk giren ilk çıkar kuralıyla çalışır: sona ekler, baştan alırsın. Gerçekleştirmesi dikkat ister. Ham dizi üzerinde baştan almak bütün elemanları kaydırmak demektir ve doğrusal maliyet doğurur; bu, mülakatta sık yapılan hatadır. İki doğru yol vardır: baş ve son işaretçileri tutulan bağlı liste, ya da **dairesel tampon (circular buffer)** — sabit boyutlu bir dizide baş ve son indislerini modüler aritmetikle döndürerek kaydırmayı tamamen ortadan kaldırmak. İkisinde de her iki işlem sabit zamanlıdır.

Kuyruk, işletim sistemleri fazında tekrar karşımıza çıkacak: hazır süreçleri bekleten zamanlayıcı kuyruğu bu yapının kendisidir ve zamanlama politikası aslında "kuyruktan hangi sırayla alacağız?" sorusunun cevabıdır.

**Problem.** Elinde yalnızca yığın var: sona ekleyebiliyor ve sondan alabiliyorsun. Bunlarla ilk giren ilk çıkar davranışı gösteren bir kuyruk kur ve işlem başına maliyeti savun.

**Strateji.** Girişi ve çıkışı ayır: bir yığın yalnızca gelenleri toplasın, diğeri yalnızca gidenleri versin. Sırayı ters çevirme işini seyrek yap ve sonucunu tekrar tekrar kullan.

**Adımlar.** İki yığın tut, giriş ve çıkış. Kuyruğa ekleme, giriş yığınına eklemektir. Kuyruktan alma, çıkış yığını boş değilse doğrudan ondan almaktır; boşsa önce giriş yığınındaki bütün elemanlar tek tek alınıp çıkış yığınına konur, sonra çıkıştan alınır. Bir yığından alıp diğerine koymak sırayı ters çevirdiği için en eski eleman çıkışın tepesine gelir ve ilk giren ilk çıkar kuralı sağlanır.

**Savunma.** Tek bir alma işlemi doğrusal olabilir, çünkü aktarma bütün elemanlara dokunur. Ama her eleman hayatı boyunca en fazla dört işlem görür: girişe konur, girişten alınır, çıkışa konur, çıkıştan alınır. n elemanlı bir işlem dizisinin toplam maliyeti bu yüzden 4n ile sınırlıdır, yani işlem başına amortize sabittir. Bu, dinamik dizideki muhasebenin aynısıdır: garanti tek işleme değil, dizinin toplamına verilir. Dikkat edilecek yer değişmezdir: aktarma yalnızca çıkış yığını boşken yapılmalıdır. Çıkış boşalmadan aktarma yapılırsa aynı eleman birden çok kez taşınabilir ve dört işlem argümanı çöker.

## Dört yapının maliyet tablosu

Aşağıdaki tabloda maliyetler **en kötü durum** için verilmiştir; dinamik dizinin sona ekleme hücresi amortizedir ve öyle işaretlenmiştir. n saklanan öğe sayısıdır.

| İşlem | Dizi | Bağlı liste (baş işaretçili) | Dinamik dizi |
|---|---|---|---|
| indisle erişim | 1 | n | 1 |
| sırasız arama | n | n | n |
| başa ekleme ve baştan silme | n | 1 | n |
| sona ekleme | n | n | 1 (amortize) |
| elde tutulan düğümden sonra ekleme | n | 1 | n |
| ek bellek | yok | düğüm başına işaretçi | en fazla n boş hücre |

Yığın ve kuyruk bu tabloda ayrı bir satır değildir, çünkü ayrı bir temsil değildir: yığın dinamik dizi üstünde amortize sabit, kuyruk çift yönlü bağlı liste ya da dairesel tampon üstünde sabit zamanlı çalışır. Arayüzü daraltmanın karşılığı budur — daha az söz verirsin, verdiğin sözü daha ucuza tutarsın.

Tablodan çıkan tek cümlelik kural şudur: **dizi konumu, bağlı liste yapıyı ucuzlatır.** Aradığın şey "kaçıncı eleman" ise dizi, "şu düğümün yanına" ise bağlı liste kazanır. Hiçbiri sırasız aramayı ucuzlatmaz; onun için başka bir değişmez gerekir ve fazın geri kalanı tam olarak bunu kurar.

## Mülakatta nasıl görünür

Bu konu neredeyse hiç doğrudan sorulmaz; bir tasarım sorusunun içine gömülür. Standart takip zinciri şudur: "Bunu hangi yapıyla tutarsın?" → "Neden diğeri değil?" → "Şu işlem sıklaşırsa cevabın değişir mi?"

İyi bir cevabın sırası sabittir. Önce ihtiyaç duyulan işlemleri say ve hangisinin sık olduğunu belirt. Sonra yapıyı seç ve seçimi tek bir maliyet hücresine dayandır. Sonra vazgeçtiğin şeyi kendin söyle — bu, mülakatçının soracağı ikinci soruyu önden karşılamaktır. En sonda ek bellek maliyetini ekle.

Bir örnek: "Son yüz işlemi geri alınabilir tutmam gerekiyor" isteği bir yığındır ve dinamik dizi üstünde amortize sabit çalışır; kapasite sabit tutulacaksa dairesel tampon daha uygundur, çünkü orada en eskiyi düşürmek de sabit zamanlıdır. Buna karşılık "listenin ortasından sık sık eleman çıkarıyorum ve elemanın kendisini zaten elimde tutuyorum" isteği çift yönlü bağlı listedir, çünkü orada silme sabit zamanlıdır; aynı işi dizi üstünde yapmak her silmede kaydırma demektir.

İngilizce karşılıklar hazır olmalıdır: *array*, *linked list*, *doubly linked list*, *pointer*, *node*, *dynamic array*, *amortized cost*, *stack*, *queue*, *circular buffer*, *contiguous memory*, *LIFO*, *FIFO*.

### Sırada ne var

Bu makalenin tablosunda bir hücre inatla doğrusal kaldı: **sırasız arama**. Dizi konumu, bağlı liste yapıyı ucuzlattı, ama ikisi de "bu anahtar burada mı?" sorusuna baştan sona taramaktan başka cevap veremedi. Sıralı dizide ikili aramayla logaritmaya inebiliriz, fakat o zaman da ekleme kaydırma yüzünden doğrusala çıkar. Bir sonraki makale bu ikilemi bir **değişmez** kurarak çözüyor: ikili arama ağacı, sıralı dizinin arama yeteneğiyle bağlı listenin yapısal esnekliğini aynı yapıda birleştirmeye çalışır. Orada yeni soru şu olacak: bu değişmez ne kadar iyi korunuyor ve korunmadığında maliyet ne oluyor?

## Kaynakça

- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 10. bölüm (Elementary Data Structures — diziler, yığınlar, kuyruklar ve bağlı listeler) ve 16. bölüm (Amortized Analysis — dinamik tabloların amortize analizi). MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 2: Data Structures — dizi, bağlı liste ve dinamik dizi için işlem başına en kötü durum tablosu; amortize maliyetin tanımı ("k işlem en fazla k·T(n) maliyet çıkarıyorsa işlemin amortize maliyeti T(n)'dir"); sona eklemenin amortize sabit oluşu ve küçültme eşiğinin büyütme eşiğinden ayrılması. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 1.3 (Stacks and Queues — bağlı liste ve boyutlandırılan dizi gerçekleştirmeleri) ve 1.4 (Analysis of Algorithms — bellek kullanımı ve amortize maliyet). Addison-Wesley. [Bağlantı](https://algs4.cs.princeton.edu/home/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE250 — Data Structures and Algorithms* (katalog tanımı "Search Structures" ve "Complexity" başlıklarını içerir; M.Sc. programı sayfasında Scientific Preparation dersi olarak *CmpE250: Data Structures* adıyla geçer). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe250/)
