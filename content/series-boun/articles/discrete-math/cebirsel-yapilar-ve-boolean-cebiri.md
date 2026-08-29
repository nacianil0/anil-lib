---
article_id: article_af059184-faf5-4f7e-a38f-72e361d05f4a
title: "Cebirsel Yapılar ve Boolean Cebiri"
slug: cebirsel-yapilar-ve-boolean-cebiri
category: discrete-math
level: intermediate
reading_order: 8
summary: "Faz A'yı kapatan soyutlama katmanı: ikili işlem, kapalılık, birleşme, birim ve ters; yarıgrup, monoid ve grup merdiveni ile birleşmenin paralel indirgemeye bakan yüzü; kısmi sıradan kafese, kafesten Boolean cebirine geçiş ve mantık, küme cebiri ile devre tasarımının aynı kural setini paylaştığının gösterimi."
tags:
  - cebirsel-yapilar
  - grup
  - monoid
  - kafes
  - boolean-cebiri
content_hash: sha256:51856dc2da091442eb644752266db6fd813c05ab070297aa91eb9c94815a7e2f
classification_version: 1
classification_batch: 2
---
## Aynı kuralları paylaşan yapılar

Şimdiye kadar birbirinden bağımsız görünen birkaç yapıyla çalıştık. Tam sayılar toplama altında; kümeler birleşme ve kesişme altında; önermeler "ve" ile "veya" altında; fonksiyonlar bileşke altında. Bu makalenin iddiası şu: bunların hepsi *aynı birkaç kuralın* farklı kılıklarıdır ve o kuralları bir kez öğrenirsen her yeni yapıda hangi soruları soracağını bilirsin.

Bu, matematiksel bir zarafet gösterisi değil, mülakatta doğrudan işe yarayan bir refleks. "Bu işlem birleşme özelliğine sahip mi?" sorusu, bir hesabı paralelleştirip paralelleştiremeyeceğini söyler. "Bu yapının birim elemanı var mı?" sorusu, boş girdide ne döndüreceğini söyler. "Tersi var mı?" sorusu, işlemi geri alıp alamayacağını söyler. Soyutlama, cevap sayısını azaltmak için değil, doğru soruları elde tutmak içindir.

Bu aynı zamanda Faz A'nın kapanış makalesi. Boğaziçi'nin CMPE220 katalog tanımı "Algebraic structures. Groups and semi-groups. Graphs, lattices and Boolean algebra" diyor; graflar önceki makaledeydi, kalan üç başlık burada.

## İkili işlem ve dört soru

Bir S kümesi üzerinde **ikili işlem (binary operation)**, S'nin iki elemanını alıp bir sonuç üreten bir kuraldır. Bir yapıyı tanımaya çalışırken sorulacak dört soru vardır ve sırası önemlidir.

**Kapalılık (closure).** Sonuç yine S'de mi? Doğal sayılarda çıkarma kapalı değildir: 3 − 5 doğal sayı değildir. Kapalılık sağlanmıyorsa geri kalan soruların anlamı yoktur, çünkü elindeki şey S üzerinde bir işlem değildir.

**Birleşme (associativity).** (a ∗ b) ∗ c ile a ∗ (b ∗ c) her zaman eşit mi? Toplama ve çarpma birleşmelidir; çıkarma değildir, çünkü (8 − 3) − 2 = 3 ama 8 − (3 − 2) = 7.

**Birim eleman (identity element).** Her a için a ∗ e = e ∗ a = a olan bir e var mı? Toplamada 0, çarpmada 1, dizi birleştirmede boş dizi, küme birleşmesinde boş kümedir.

**Ters eleman (inverse element).** Her a için a ∗ b = b ∗ a = e olan bir b var mı? Tam sayılarda toplamanın tersi −a'dır; çarpmanın tersi tam sayılarda yoktur, çünkü 1/2 tam sayı değildir.

Beşinci bir soru daha vardır ama tanımların hiçbirinde zorunlu değildir: **değişme (commutativity)**, yani a ∗ b = b ∗ a. Fonksiyon bileşkesi ve dizi birleştirme değişmeli değildir; bu, onların daha zayıf yapılar olduğu anlamına gelmez, yalnızca sırayı koruman gerektiği anlamına gelir.

## Yarıgrup, monoid, grup

Bu dört sorunun cevabı bir merdiven oluşturur ve her basamak bir isim taşır. Şekil 1 merdiveni örnekleriyle gösteriyor.

![Dört basamaklı bir merdiven: kapalı ikili işlemden başlayıp birleşme özelliğiyle yarıgruba, birim elemanla monoide, ters elemanla gruba çıkar. Her basamağın yanında eklenen aksiyom ve o basamakta duran örnek yapı yazılı](assets/cebirsel-yapi-merdiveni.svg "Şekil 1 — Yarıgruptan gruba: her basamakta eklenen tek aksiyom")

**Yarıgrup (semigroup)**, üzerinde birleşmeli bir ikili işlem tanımlı kümedir — tek koşul birleşmedir. Boş olmayan diziler, birleştirme işlemi altında yarıgruptur.

**Monoid**, birim elemanı da olan yarıgruptur. Bütün diziler (boş dizi dâhil) birleştirme altında monoiddir; boş dizi birim elemandır. Doğal sayılar toplama altında monoiddir; birim eleman 0'dır.

**Grup (group)**, her elemanın tersi de olan monoiddir. Tam sayılar toplama altında gruptur. Doğal sayılar toplama altında grup **değildir**, çünkü 3'ün toplamaya göre tersi olan −3 kümede yoktur. Tam sayılar çarpma altında da grup değildir: birim eleman 1 vardır ama 2'nin tersi yoktur.

**Problem.** Beş elemanlı Z₅ kümesi, yani {0, 1, 2, 3, 4}, mod 5 toplama altında grup mudur?

**Strateji.** Dört soruyu sırayla sor; her birine tek cümlelik gerekçe ver.

**Adımlar.** Kapalılık: mod 5 toplamanın sonucu her zaman 0–4 aralığındadır. Birleşme: mod alma işlemi toplamanın birleşme özelliğini bozmaz, çünkü kalanı en sonda almakla her adımda almak aynı sonucu verir. Birim eleman: 0. Ters: a'nın tersi 5 − a'dır (0'ın tersi 0'dır); örneğin 3 + 2 = 5 ≡ 0. Dördü de sağlandı, Z₅ bir gruptur.

**Savunma.** Aynı soruyu mod 5 **çarpma** için sorsaydık cevap hayır olurdu: 0'ın çarpmaya göre tersi yoktur. Sıfırı dışarıda bırakıp {1, 2, 3, 4} kümesine bakarsak cevap tekrar evet olur, çünkü 5 asaldır ve her eleman bir tersi bulur — örneğin 2 · 3 = 6 ≡ 1. Asal olmayan bir modda, diyelim 6'da, bu bozulur: 2 · x ≡ 1 (mod 6) denkleminin çözümü yoktur. Yapının adını söylemek yetmez; hangi aksiyomun nerede kırıldığını göstermek gerekir.

## Birleşme neden mühendislik sorusudur

Aksiyomlar arasında birleşme, mülakatta en çok karşılığı olanıdır çünkü doğrudan **paralelleştirme** sorusudur.

Bir listeyi tek bir değere indirgediğini düşün: toplama, en büyüğü bulma, dizi birleştirme, iki kümenin birleşimi, bit dizilerinde XOR. İşlem birleşmeliyse listeyi istediğin yerden parçalara bölebilir, parçaları ayrı ayrı işleyip sonuçları birleştirebilirsin; sonuç değişmez. İşlem birleşmeli değilse — çıkarma gibi — bu bölme yasaktır ve indirgeme sırayla yürümek zorundadır.

Birim eleman da aynı tabloda bir yer tutar: boş parçanın sonucudur. Bir işçiye boş bir dilim düştüğünde ne döndüreceği sorusunun cevabı birim elemandır. Yani "bu indirgeme paralelleştirilebilir mi?" sorusunun teknik hâli "bu işlem bir monoid mi kuruyor?" sorusudur.

İkinci somut örnek XOR'dur. n bitlik diziler XOR altında gruptur; birim eleman sıfır dizisi, her elemanın tersi ise kendisidir. Bu tek cümle, XOR tabanlı eşlik biti (parity), yedekleme disklerindeki kurtarma ve "aynı şeyle iki kez XOR'la, başladığın yere dön" numarasının hepsini birden açıklar.

> **Sesli anlat:** "Bir yapının grup olduğunu göstermek için neyi denetlersin ve birleşme özelliğinin mühendislikte karşılığı nedir? Doksan saniyede anlat."
>
> İyi bir cevabın omurgası: "Dört şeyi denetlerim: işlem kapalı mı, birleşmeli mi, birim elemanı var mı, her elemanın tersi var mı. Sadece birleşme varsa yarıgrup, birim de varsa monoid, ters de varsa gruptur. Mühendislikte en çok işime yarayan aksiyom birleşmedir: bir indirgemeyi parçalara bölüp paralel çalıştırabilmem tam olarak işlemin birleşmeli olmasına bağlıdır, birim eleman ise boş parçanın döndürdüğü değerdir. Örnek olarak bit dizileri XOR altında gruptur ve her elemanın tersi kendisidir; eşlik biti ve yedekten kurtarma bu yüzden çalışır."

## Kısmi sıradan kafese

Şimdi ikinci hatta geçiyoruz. Küme makalesinde **kısmi sıra (partial order)** tanımlanmıştı: yansımalı, ters simetrik ve geçişli bir bağıntı. Kısmi sıralı bir kümeyi çizmenin standart yolu **Hasse diyagramıdır**: elemanlar düğüm, "hemen üstünde" ilişkisi ise yukarı doğru çizilen kenardır; yansımalılık ve geçişlilikten gelen kenarlar okunabilirlik için çizilmez, çünkü zaten tanımdan bilinirler.

Kısmi sırada iki elemanı karşılaştıramayabilirsin, ama yine de "ikisinin de üstünde olan en küçük eleman" ile "ikisinin de altında olan en büyük eleman" sorulabilir. Birincisine **en küçük üst sınır (least upper bound, join)** denir ve a ∨ b yazılır; ikincisine **en büyük alt sınır (greatest lower bound, meet)** denir ve a ∧ b yazılır.

**Kafes (lattice)**, her eleman ikilisinin hem en küçük üst sınırı hem en büyük alt sınırı bulunan kısmi sıralı kümedir. Şekil 2, bir kümenin bütün alt kümelerinin kapsama sırasıyla oluşturduğu kafesi gösteriyor.

![Üç elemanlı bir kümenin sekiz alt kümesinin Hasse diyagramı: en altta boş küme, en üstte kümenin kendisi, aralarda tek ve iki elemanlı alt kümeler. İki alt küme seçilip en küçük üst sınırlarının birleşim, en büyük alt sınırlarının kesişim olduğu vurgulanmış; ayrıca birbirinin tümleyeni olan bir çift işaretlenmiş](assets/altkume-kafesi.svg "Şekil 2 — Güç kümesi kafesi: en küçük üst sınır birleşim, en büyük alt sınır kesişimdir")

İki örnek bu tanımı somutlaştırır.

**Güç kümesi kafesi.** Bir kümenin bütün alt kümeleri, kapsama (⊆) ile kısmi sıralanır. İki alt kümenin en küçük üst sınırı birleşimleri, en büyük alt sınırı ise kesişimleridir. En altta boş küme, en üstte kümenin kendisi durur.

**Bölen kafesi.** Bir sayının bölenleri, "böler" bağıntısıyla kısmi sıralanır. İki bölenin en küçük üst sınırı en küçük ortak katları (ekok), en büyük alt sınırı en büyük ortak bölenleridir (ebob). 12'nin bölenleri {1, 2, 3, 4, 6, 12} böyle bir kafestir.

Bir kafeste bazı ek özellikler olabilir ya da olmayabilir. Kafes **sınırlıysa** en küçük bir eleman (0 diyelim) ve en büyük bir eleman (1 diyelim) vardır. **Dağılmalıysa (distributive)** iki işlem birbirine dağılır: a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c) ve simetriği. **Tümleyenliyse (complemented)** her a için, a ∨ b = 1 ve a ∧ b = 0 olan bir b vardır.

## Boolean cebiri

**Boolean cebiri**, en küçük ve en büyük elemanı olan, hem dağılmalı hem tümleyenli bir kafestir.

Tanımın kendisi kuru görünür; asıl mesele bu tanımı sağlayan üç sistemin **aynı** olmasıdır. Bu makalenin asıl teslim ettiği fikir budur.

| Boolean cebiri | Küme cebiri | Önerme mantığı | Devre |
|---|---|---|---|
| a ∨ b | A ∪ B | p veya q | OR |
| a ∧ b | A ∩ B | p ve q | AND |
| a′ (tümleyen) | A′ (tümleyen) | ¬p | NOT |
| 1 (en büyük) | evrensel küme | totoloji | sabit 1 |
| 0 (en küçük) | boş küme | çelişki | sabit 0 |
| a ∨ a′ = 1 | A ∪ A′ = evrensel küme | p ∨ ¬p totolojidir | — |
| (a ∨ b)′ = a′ ∧ b′ | (A ∪ B)′ = A′ ∩ B′ | ¬(p ∨ q) ≡ ¬p ∧ ¬q | De Morgan |

Son satır, ikinci makalede mantıksal denklik olarak öğrendiğin De Morgan kuralının, beşinci makalede küme özdeşliği olarak ispatladığın kuralla ve devre tasarımında kullandığın kuralla **aynı** kural olduğunu gösteriyor. Üçü ayrı ayrı ezberlenecek üç şey değil, bir kuralın üç kılığıdır. Ders kitabı bunu doğrudan söyler: üç sistem de aynı davranır, yani izomorfiktir.

Bir sınır örneği tanımın hangi koşulunun gerçekten çalıştığını gösterir. 12'nin bölen kafesi sınırlıdır (en küçük eleman 1, en büyük eleman 12) ve dağılmalıdır, ama Boolean cebiri **değildir**: 2'nin tümleyeni olması için ebob(2, b) = 1 ve ekok(2, b) = 12 olan bir b gerekir; aday yalnızca 3'tür, ama ekok(2, 3) = 6 ≠ 12. Buna karşılık 30'un bölen kafesi Boolean cebiridir; sekiz elemanı vardır ve {2, 3, 5} kümesinin güç kümesiyle birebir eşleşir — örneğin 2'nin tümleyeni 15'tir, çünkü ebob(2, 15) = 1 ve ekok(2, 15) = 30. Fark, 30'un karesiz olması, 12'nin ise bir tam kare çarpanı (4) taşımasıdır.

> **Sesli anlat:** "Boolean cebiri ile küme cebiri arasındaki karşılığı bir örnekle altmış saniyede anlat."
>
> İyi bir cevabın omurgası: "Boolean cebiri, en küçük ve en büyük elemanı olan, dağılmalı ve tümleyenli bir kafestir. Bir kümenin güç kümesi kapsama sırasıyla tam olarak böyle bir kafes kurar: en küçük üst sınır birleşim, en büyük alt sınır kesişim, tümleyen ise küme tümleyeni, en küçük eleman boş küme, en büyük eleman evrensel kümedir. Aynı yapı önerme mantığında 've', 'veya' ve 'değil' ile kurulur. Somut karşılık De Morgan'dır: birleşimin tümleyeni tümleyenlerin kesişimidir, 'veya'nın değillemesi değillemelerin 've'sidir, OR kapısının çıkışının değili girişlerin değillerinin AND'idir. Üç ifade aynı özdeşliktir."

## Devre sadeleştirme

Boolean cebirinin en görünür karşılığı devre tasarımıdır. Devre literatüründe ∨ yerine + ve ∧ yerine · yazılır, tümleyen ise üs işaretiyle gösterilir: x′. Bir Boolean fonksiyonunu daha az kapıyla gerçekleştirmek, doğrudan daha ucuz, daha küçük ve daha hızlı donanım demektir.

**Problem.** F(x, y) = x·y + x·y′ + x′·y fonksiyonunu sadeleştir ve kazancı say.

**Strateji.** Ortak çarpanı dışarı al, tümleyen kuralını uygula, sonra kalan ifadeye dağılma kuralını ters yönde kullan.

**Adımlar.** İlk iki terimde x ortaktır: x·y + x·y′ = x·(y + y′). Tümleyen kuralına göre y + y′ = 1 ve x·1 = x. Geriye F = x + x′·y kaldı. Şimdi Boolean cebirinde toplamanın çarpma üzerine dağıldığını kullanıyoruz: x + x′·y = (x + x′)·(x + y) = 1·(x + y) = x + y.

**Savunma.** Sonucu doğruluk tablosuyla denetleyelim. x = 0, y = 0 için üç terim de 0 verir, toplam 0'dır ve x + y = 0. x = 0, y = 1 için yalnızca üçüncü terim 1'dir, toplam 1'dir ve x + y = 1. x = 1, y = 0 için yalnızca ikinci terim 1'dir, toplam 1'dir. x = 1, y = 1 için birinci terim 1'dir, toplam 1'dir. Dört satır da tutuyor. Kapı sayısına gelince: ilk ifade iki NOT, üç AND ve iki OR, yani yedi kapı ister; sadeleşmiş hâli tek bir OR kapısıdır.

Bu adımdaki tek "tuhaf" hamle, toplamanın çarpma üzerine dağılmasıydı: sayılarda 2 + (3 · 4) ile (2 + 3) · (2 + 4) eşit değildir, ama Boolean cebirinde eşittir. Dağılma kuralının iki yönlü çalışması, Boolean cebirini sayı cebirinden ayıran özelliktir ve mülakatta buradan takip sorusu gelir.

Elle sadeleştirme küçük fonksiyonlarda yeterlidir; değişken sayısı arttığında sistematik yöntemler kullanılır. Ders kitaplarında bunlar Karnaugh haritası ve Quine-McCluskey yöntemi adıyla geçer. İkisinin adını ve ne yaptığını bilmek, çoğu mülakat için yeterli derinliktir; ezberlenmesi gereken şey yöntem değil, "minimum kapı sayısı" probleminin var olduğu ve otomatikleştirilebildiğidir.

## Mülakatta nasıl görünür

Bu makalenin konuları mülakatta genellikle tek başına değil, bir köprü olarak sorulur. Tipik takip zinciri şudur: "Grup nedir?" → "Şu yapı grup mu, değilse hangi aksiyom kırılıyor?" → "Bunun bir yazılım karşılığı var mı?"

En sık üç hata görülür. Birincisi **aksiyomları eksik saymak**: kapalılığı atlayıp doğrudan birleşmeden başlamak. İkincisi **birim eleman ile yutan elemanı karıştırmak**: çarpmada 1 birim elemandır, 0 ise yutan elemandır ve tersi yoktur. Üçüncüsü **her kafesi Boolean cebiri sanmak**; yukarıdaki 12 örneği tam olarak bu hatanın panzehiridir.

İngilizce karşılıkların da hazır olması gerekir: *closure*, *associativity*, *identity element*, *inverse*, *semigroup*, *monoid*, *group*, *partial order*, *lattice*, *join*, *meet*, *complement*, *distributive*, *Boolean algebra*.

### Sırada ne var

Bu makaleyle Faz A kapandı. Artık iddiayı kesin söyleyebiliyor, tek seferde biten argüman kurabiliyor, sonsuz aileleri tümevarımla ispatlayabiliyor, nesneleri küme ve fonksiyon diliyle adlandırabiliyor, sayabiliyor, graf diline çevirebiliyor ve karşındaki yapının hangi kuralları paylaştığını tanıyabiliyorsun.

Sıradaki fazda soru değişiyor: artık "bu doğru mu?" değil, "bu ne kadara mal olur?" diye soracağız. İlk makale karmaşıklığı kuruyor: bir algoritmanın maliyetini makineden bağımsız biçimde nasıl ölçeriz, girdi boyutu büyüdükçe maliyet nasıl büyür ve Big-O gösterimi tam olarak neyi söyler, neyi söylemez. Sayma makalesindeki üç büyüklük — ikili çiftlerin sayısı, alt küme sayısı ve sıralama sayısı — orada karmaşıklık sınıflarının somut zemini olacak.

## Kaynakça

- Doerr, A. & Levasseur, K. *Applied Discrete Structures*, 11. bölüm (Algebraic Structures): 11.1 işlemler, 11.2 cebirsel sistemler (monoid ve grup tanımları), 11.3 grupların genel özellikleri; 13. bölüm (Boolean Algebra): 13.1 kısmi sıralar, 13.2 kafesler (en küçük üst sınır ve en büyük alt sınır tanımları), 13.3 Boolean cebirleri (Tanım 13.3.5 ve üç sistemin izomorfluğu), 13.7 anahtarlama kuramına giriş. Creative Commons BY-NC-SA lisanslı açık ders kitabı. [Bağlantı](https://discretemath.org/)
- Rosen, K. H. *Discrete Mathematics and Its Applications*, 9.6 (Partial Orderings; kafesler), 12. bölüm (Boolean Algebra): 12.1 Boolean fonksiyonları, 12.2 Boolean fonksiyonlarının gösterimi, 12.3 mantık kapıları, 12.4 devrelerin minimizasyonu. McGraw Hill. [Bağlantı](https://www.mheducation.com/highered/product/Discrete-Mathematics-and-Its-Applications-Rosen.html)
- Encyclopedia of Mathematics. *Semi-group* ("A set with one binary operation satisfying the law of associativity"). Springer ve Avrupa Matematik Derneği. [Bağlantı](https://encyclopediaofmath.org/wiki/Semi-group)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE220 — Discrete Computational Structures* (katalog tanımı: "Algebraic structures. Groups and semi-groups. Graphs, lattices and Boolean algebra"). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe220/)
