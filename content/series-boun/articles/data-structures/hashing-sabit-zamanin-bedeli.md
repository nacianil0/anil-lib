---
article_id: article_62b07642-f73f-403f-bf5e-c24609bac6e1
title: "Hashing: Sabit Zamanın Bedeli"
slug: hashing-sabit-zamanin-bedeli
category: data-structures
level: advanced
reading_order: 14
summary: "Karşılaştırma modelinin logaritmik duvarı ve onu aşmanın yolu: doğrudan erişim dizisi, hash fonksiyonu, güvercin yuvasıyla çakışmanın kaçınılmazlığı, zincirleme ile açık adresleme, yük faktörünün maliyete etkisi, ortalama sabit zamanın dayandığı varsayım ve evrensel hash ailesiyle en kötü durum savunması."
tags:
  - hashing
  - hash-tablosu
  - cakisma
  - yuk-faktoru
  - evrensel-hash
content_hash: sha256:74d1063d62d5f1aa0e5db78ffa668f896b8aaf8244844a1700930418b8ffdd1b
classification_version: 1
classification_batch: 4
---
## Çakışma olunca ne yapıyoruz?

Sayma makalesinde güvercin yuvası ilkesini kurarken bir söz vermiştik: anahtar uzayı kova sayısından büyük olduğu sürece hiçbir hash fonksiyonu birebir olamaz, dolayısıyla bir hash tablosu tasarımında sorulacak doğru soru "çakışma olur mu?" değil, **"çakışma olunca ne yapıyoruz ve maliyeti ne?"** sorusudur. Bu makale o sözü ödüyor.

Ama önce daha temel bir soruyla başlamamız gerekiyor, çünkü hash tablosu yalnızca bir hızlandırma numarası değil, **modelin değiştirilmesidir**. Faz boyunca bütün arama yapılarımız aynı işi yapıyordu: aradığın anahtarı saklanan anahtarlarla karşılaştır, cevaba göre bir yöne git. Bu deseni ne kadar iyileştirirsen iyileştir aşamayacağın bir sınır var ve o sınırı önce ispatlayacağız. Sonra sınırı aşmanın tek yolunu göreceğiz: karşılaştırmayı bırakıp anahtarın kendisinden bir **adres hesaplamak**.

## Karşılaştırma modelinin duvarı

Bir modeli adlandıralım. **Karşılaştırma modelinde (comparison model)** algoritmanın öğeler hakkında öğrenebileceği tek şey, ikisini karşılaştırmasının sonucudur: küçük mü, büyük mü, eşit mi. Öğeler kara kutudur; içlerine bakılmaz, üzerlerinde aritmetik yapılmaz. Sıralı dizide ikili arama, ikili arama ağacı, dengeli arama ağacı — hepsi bu modeldedir.

Şimdi bu modeldeki **her** algoritmayı tek bir nesneyle temsil edelim: **karar ağacı (decision tree)**. İç düğümler yapılan bir karşılaştırmayı, iki dal karşılaştırmanın iki olası sonucunu, yapraklar ise algoritmanın verebileceği çıktıları gösterir. Kökten bir yaprağa giden yol, algoritmanın belirli bir girdideki çalışmasıdır ve o yolun uzunluğu yapılan karşılaştırma sayısıdır.

Alt sınır üç adımda çıkar. **Birinci adım:** n öğe saklıyorsak arama işleminin en az n + 1 farklı çıktısı vardır — n öğeden her biri ya da "yok" — ve her çıktı için en az bir yaprak gerekir. **İkinci adım:** karşılaştırmanın iki sonucu olduğu için ağaç ikilidir; en az n + 1 yaprağı olan bir ikili ağacın yüksekliği en az ⌈log₂(n + 1)⌉ − 1'dir. Bu, ikili arama ağaçları makalesinde tümevarımla ispatladığımız yükseklik alt sınırının aynısıdır. **Üçüncü adım:** en kötü durumdaki karşılaştırma sayısı en uzun kök–yaprak yolunun uzunluğudur, yani yükseklik.

Sonuç: **karşılaştırma modelinde hiçbir arama algoritması en kötü durumda logaritmadan hızlı olamaz.** Bir milyon öğe için bu en az 19 karşılaştırma demektir; sıralı dizide ikili arama ve dengeli arama ağacı bu sınıra zaten ulaşıyordu. Yapının daha akıllısını icat ederek bu duvarın öte tarafına geçilemez.

Duvarı aşmanın tek yolu ispatın içinde yazılı. Dal sayısı iki olduğu için yükseklik logaritmik çıktı; **dallanma çarpanını sabit olmaktan çıkarabilirsek** sınır düşer. B-ağacında bunu düğüm başına çok anahtar tutarak yapmıştık ve taban değişmişti, ama çarpan hâlâ sabitti. Gerçekten kırmak için tek adımda n yönden birine gidebilen bir işlem gerekiyor. Böyle bir işlem var ve karmaşıklık makalesinde RAM modelini tanımlarken zaten varsaymıştık: **diziye indisle erişim sabit zamanlıdır.**

Şekil 1 iki dünyayı yan yana koyuyor.

![Dikey bir çizgiyle ayrılmış iki yarı. Solda karar ağacı: kökte k küçüktür x bir sorusunu taşıyan bir kutu, ondan evet ve hayır etiketli iki dal, altlarında iki karşılaştırma kutusu daha ve en altta olası çıktıları temsil eden dört yaprak kutusu; altında iç düğümün karşılaştırma, yaprağın çıktı olduğu ve dallanma çarpanı iki iken yüksekliğin en az log iki n artı bir eksi bir olduğu yazıyor. Sağda doğrudan erişim dizisi: anahtar k yazan bir kutudan çıkıp h parantez k etiketli bir okla sekiz hücrelik bir şeridin içindeki tek bir vurgulu hücreye inen erişim; şeridin altında u hücre yazıyor ve yanında dallanma çarpanının u kadar büyük olduğu, erişimin sabit zamanlı ve karşılaştırmasız olduğu, bedelinin u hücrelik yer olduğu ve on harfli isimler için bunun yaklaşık on yedi virgül altı terabayt ettiği belirtiliyor. En altta iki modelin farkı özetleniyor: karşılaştırma yalnızca yön seçer, adres hesabı hedefi doğrudan bulur](assets/karsilastirma-duvari.svg "Şekil 1 — Karar ağacı ile doğrudan erişim dizisi: dallanma çarpanı neyi değiştirir")

## Doğrudan erişim dizisi ve alan sorunu

Fikir en kaba hâliyle şudur: her öğeye {0, …, u − 1} aralığında benzersiz bir tam sayı anahtar ver ve öğeyi bir dizinin k'ıncı hücresinde sakla. Aramak, eklemek ve silmek tek indisleme işlemidir — en kötü durumda sabit zaman. Karşılaştırma yapılmadığı için alt sınır ihlal edilmiş olmaz; **model değişmiştir.** Bu yapının adı **doğrudan erişim dizisidir (direct access array)**.

Bedeli hemen görünür: dizi u hücreliktir, saklanan öğe sayısı n değil. Anahtar uzayı büyükse bu felakettir. Anahtarların on harfli isimler olduğunu düşün: 26¹⁰ = 141.167.095.653.376 olası isim var ve her isim için tek bir bit ayırsan bile yaklaşık 17,6 terabayt yer gerekir. Oysa gerçek uygulamanda belki birkaç bin isim vardır.

Sorun ölçüde: n küçük, u devasa. Çözüm de oradan gelir — **u'yu n mertebesine indirgemek.**

## Hash fonksiyonu ve kaçınılmaz çakışma

**Hash fonksiyonu** h, {0, …, u − 1} anahtar uzayını {0, …, m − 1} indis uzayına götüren bir fonksiyondur; m, saklanan öğe sayısı n ile aynı mertebede seçilir. Elde edilen küçük diziye **hash tablosu (hash table)**, h(k) değerine de k anahtarının **hash'i** denir.

Şimdi sayma makalesinin sonucu devreye giriyor. m < u olduğu sürece h birebir **olamaz**: daha büyük sonlu bir kümeden daha küçüğüne birebir fonksiyon yoktur. Yani h(a) = h(b) olan a ≠ b anahtarları her zaman vardır. Buna **çakışma (collision)** denir ve bunu kötü bir hash fonksiyonu seçmiş olmanın cezası saymak yanlıştır; bu bir sayma gerçeğidir ve kaçınılmazdır.

Kümeler makalesinde bir fonksiyonun birebir olmamasının ne demek olduğunu, sayma makalesinde de bunun neden zorunlu olduğunu kurmuştuk. Burada aynı gerçeğin mühendislik yüzünü görüyoruz: tasarım kararı çakışmayı önlemek değil, **çakışma çözümünü ve maliyetini seçmektir.**

## İki çakışma çözümü

**Zincirleme (chaining).** Her hücrede tek bir öğe değil, aynı hücreye düşen öğelerin tümünü tutan bir yapı — tipik olarak bir bağlı liste — sakla. Arama iki adımdır: hash'i hesapla, sonra o zincirde sırayla ara. Zincir kısa kalırsa toplam maliyet sabit mertebede kalır. Temel yapılar makalesinden biliyoruz ki bağlı listede baştan ekleme sabit zamanlıdır; zincire eklemek de öyledir.

**Açık adresleme (open addressing).** Ayrı bir yapı hiç kullanma; öğeleri tablonun kendi hücrelerinde tut ve hücre doluysa belirli bir kurala göre başka bir hücreye bak. En basit kuralın adı **doğrusal denemedir (linear probing)**: bir sonraki hücreye, sonra bir sonrakine bak. Arama üç sonuçtan biriyle biter: aranan anahtar bulunur, boş bir hücreye rastlanır (öğe yok), ya da farklı bir anahtar görülür ve denemeye devam edilir. Bu yaklaşımda tablo boyutu saklanan öğe sayısından **büyük olmak zorundadır**.

İki yöntemin somut hâlini görelim. Anahtarlar 10, 22, 31, 4, 15, 28 ve tablo boyutu m = 7 olsun; hash fonksiyonu h(k) = k mod 7 olsun. Hash değerleri sırasıyla 3, 1, 3, 4, 1, 0'dır: 10 ile 31 çakışıyor, 22 ile 15 çakışıyor.

Şekil 2 aynı anahtarları iki çözümde gösteriyor.

![Üstte hash fonksiyonunun k mod 7 olduğu ve anahtarların ekleme sırasıyla 10, 22, 31, 4, 15, 28 olduğu yazıyor. Solda zincirleme: yedi hücreli dikey bir tablo ve hücrelerden çizgiyle uzanan zincirler; 0 hücresinde 28, 1 hücresinde 22 ve ona bağlı 15, 3 hücresinde 10 ve ona bağlı 31, 4 hücresinde 4; 2, 5 ve 6 hücreleri boş. Sağda doğrusal deneme: aynı yedi hücreli tablo ama zincir yok; 0 hücresinde 28, 1 hücresinde 22, 2 hücresinde 15, 3 hücresinde 10, 4 hücresinde 31, 5 hücresinde 4, 6 hücresi boş. Kesikli üç ok, dolu hücreye düşen anahtarların bir sonraki boş hücreye kaydığını gösteriyor ve 0 ile 5 arasındaki kesintisiz dolu bölge öbeklenme olarak etiketlenmiş. Altta iki yöntemin farkı özetleniyor: zincirlemede ek işaretçi maliyeti vardır ve silme kolaydır, doğrusal denemede işaretçi yoktur ama silme işaret ister; her iki yöntemde de maliyeti belirleyen tek sayı yük faktörüdür](assets/cakisma-cozumu.svg "Şekil 2 — Aynı anahtarlar, iki çakışma çözümü: zincirleme ve doğrusal deneme")

Zincirlemede yerleşim doğrudan hash değeriyle belirlenir. Doğrusal denemede ise ekleme sırası önemlidir: 10 üçüncü hücreye girer, 22 birinciye, 31 üçüncü dolu olduğu için dördüncüye kayar, 4 dördüncü dolu olduğu için beşinciye kayar, 15 birinci dolu olduğu için ikinciye kayar, 28 sıfırıncıya girer. Sonuçta 4 anahtarı, kendi hash değerinin hiç çakışmadığı hâlde yerinden olmuştur — çünkü 31 oraya kaymıştı. Bu zincirleme etkiye **öbeklenme (clustering)** denir ve açık adreslemenin karakteristik maliyetidir.

İki yöntemin farkları mülakat sorusudur. Zincirleme ek bellek ister (düğüm başına işaretçi) ama tablo dolulukla birlikte bozulmaz ve silme kolaydır: zincirden düğümü çıkarırsın. Açık adresleme işaretçi ödemez ve bitişik bellek üzerinde çalıştığı için pratikte hızlıdır, ama silme sinsi bir problemdir: bir hücreyi boşaltırsan üzerinden kayarak yerleşmiş anahtarların arama yolunu koparırsın; bu yüzden silinen hücrelere "burada bir şey vardı" işareti konur.

## Yük faktörü: maliyeti belirleyen tek sayı

Her iki yöntemde de maliyeti belirleyen tek büyüklük vardır: **yük faktörü (load factor)** α = n / m. Ama iki yöntemde farklı okunur.

**Zincirlemede** α, zincir başına ortalama öğe sayısıdır ve 1'den büyük olabilir. Anahtarlar hücrelere düzgün dağılmışsa bir zincirin beklenen uzunluğu 1 + (n − 1)/m'dir. n = m seçersen bu neredeyse tam olarak 2'dir: arama ortalama iki öğeye bakar. m'yi n ile aynı mertebede tuttuğun sürece α sabit kalır ve işlemler sabit mertebede biter.

**Açık adreslemede** α, tablonun doluluk oranıdır ve 1'den **küçük olmak zorundadır**. Doğrusal denemede ortalama deneme sayısı için bilinen yaklaşık değerler şunlardır: isabetli arama için ½(1 + 1/(1 − α)), isabetsiz arama ve ekleme için ½(1 + 1/(1 − α)²). Sayılara dökelim:

| α | isabetli arama | isabetsiz arama / ekleme |
|---|---|---|
| 0,25 | 1,17 | 1,39 |
| 0,50 | 1,50 | 2,50 |
| 0,75 | 2,50 | 8,50 |
| 0,90 | 5,50 | 50,50 |
| 0,95 | 10,50 | 200,50 |
| 0,99 | 50,50 | 5.000,50 |

Tablodan çıkan ders tek cümledir: **açık adreslemede maliyet doluluğa doğrusal değil, patlayarak bağlıdır.** Yarıya kadar dolu bir tabloda ekleme ortalama 2,5 denemedir; yüzde 99 dolu bir tabloda beş bin. "Belleği tam kullanalım" içgüdüsü burada tam olarak yanlıştır.

Buradan doğal olarak şu çıkar: α'yı sabit bir bantta tutmak zorundasın. n büyüdükçe m'yi büyütür, tabloyu yeni boyuta göre yeniden kurarsın. Bu, dinamik dizideki muhasebenin aynısıdır: yeniden kurma pahalıdır ama seyrek yapılır ve maliyeti aradaki bütün işlemlere yayılır, yani işlem başına amortize sabittir. Küçültme eşiğini büyütme eşiğinden ayırmak burada da zorunludur, yoksa eşiğin iki yanında gidip gelen bir işlem dizisi garantiyi bozar.

> **Sesli anlat:** "Hash tablosunda sabit zaman hangi varsayıma dayanır, yük faktörü nedir ve en kötü durum nedir? Doksan saniyede anlat."
>
> İyi bir cevabın omurgası: "Hash tablosu karşılaştırma yapmaz, anahtardan bir indis hesaplar; bu yüzden karşılaştırma modelinin logaritmik alt sınırına tabi değildir. Anahtar uzayı tablo boyutundan büyük olduğu için hash fonksiyonu birebir olamaz — bu güvercin yuvası ilkesinin doğrudan sonucudur — yani çakışma kaçınılmazdır. Maliyeti belirleyen sayı yük faktörü, yani öğe sayısının tablo boyutuna oranıdır. Zincirlemede bu, zincir başına ortalama öğe sayısıdır; tablo boyutunu öğe sayısıyla aynı mertebede tuttuğum sürece sabit kalır. Açık adreslemede doluluk oranıdır ve bire yaklaştıkça deneme sayısı patlar; yüzde doksan dolulukta isabetsiz arama ortalama elli deneme yapar. Sabit zaman iddiası bir **ortalama durum** iddiasıdır ve anahtarların hücrelere düzgün dağıldığı varsayımına dayanır. En kötü durumda bütün anahtarlar aynı hücreye düşer ve arama doğrusal olur. Yük faktörünü sabit tutmak için tabloyu büyütmek gerekir; bunun maliyeti dinamik dizideki gibi amortize edilir."

## Ortalama sabit zaman hangi varsayıma dayanır?

Şimdi mülakatın asıl ayırt edici sorusuna geliyoruz. "Hash tablosunda arama sabit zamanlıdır" cümlesi eksiktir; hangi durumdan söz ettiğini ve hangi varsayımı yaptığını söylemek gerekir.

Yukarıdaki bütün analizler tek bir varsayıma dayanıyordu: **hash fonksiyonu anahtarları hücrelere düzgün dağıtır.** Bu varsayımın adı vardır — düzgün hash varsayımı — ve bir teorem değil, bir modeldir.

Pratikte kullanılan en yaygın fonksiyon **bölme yöntemidir**: h(k) = k mod m. Cebirsel yapılar makalesinden mod aritmetiğinin bir grup yapısı olduğunu biliyoruz; buradaki iş de o yapının doğal kullanımıdır. Yöntem sezgiseldir ve iyi çalışır, ama garantisi yoktur: m, saklanan anahtarların simetrilerine denk düşerse dağılım bozulur. Bu yüzden m genellikle ikinin ve onun kuvvetlerinden uzak bir asal sayı seçilir. Yine de bu bir sezgisel kuraldır.

Kötü haber şu: u, n'den çok büyük olduğu sürece **sabit** her hash fonksiyonu için, hepsi aynı hücreye düşen n anahtarlık bir girdi kümesi vardır. Bu yine bir sayma sonucudur. Dolayısıyla girdiyi sen seçmiyorsan — ki gerçek sistemlerde girdiyi çoğu zaman dışarıdaki biri seçer — düzgün dağılım varsayımını savunamazsın. Karmaşıklık makalesinde kurduğumuz uyarı burada tam anlamını buluyor: ortalama durum bir dağılım varsayımıdır ve varsayım sana ait değilse garanti de sana ait değildir.

Bu sadece teorik bir kaygı değildir: bir kütüphanenin hash fonksiyonu bilinen ve sabitse, aynı hash değerine sahip anahtarları toplu hâlde üretmek mümkündür ve bu, tabloyu bilerek doğrusal davranmaya zorlar.

Kuramsal çıkış yolu zariftir: **hash fonksiyonunu sabitleme, rastgele seç.** Evrensel hash ailesi, u'dan büyük bir p asalı için h_{a,b}(k) = ((a·k + b) mod p) mod m biçimindeki fonksiyonların kümesidir; a ve b {0, …, p − 1} aralığından seçilir ve a sıfır olamaz. Bu ailenin özelliği şudur: aileden rastgele seçilen bir h için, herhangi iki farklı anahtarın çakışma olasılığı en fazla 1/m'dir. Buradan bir zincirin beklenen uzunluğunun 1 + (n − 1)/m ile sınırlı olduğu doğrudan çıkar.

Farkı iyi anlamak gerekiyor, çünkü mülakatta buraya kadar gelen aday azdır. **Beklenti artık girdiler üzerinden değil, hash fonksiyonu seçimi üzerinden alınıyor.** Yani garanti girdinin "tipik" olmasına bağlı değildir; düşman girdiyi seçse bile, senin hangi h'yi seçtiğini bilmediği sürece beklenen maliyet sabittir. Yine de en kötü durum değişmemiştir: kötü şansla bütün anahtarlar aynı hücreye düşebilir ve arama doğrusal olur. Hash tablosunun en kötü durum garantisi yoktur; olan, girdiden bağımsız hâle getirilmiş bir beklentidir.

## Mülakatta nasıl görünür

Bu serinin ilk makalesinde örnek olarak verilen takip zinciri tam olarak buydu ve şimdi cevaplarını verebiliyoruz.

"Sabit zaman derken hangi durumu kastediyorsun?" → Ortalama durumu; en kötü durumda bütün anahtarlar aynı hücreye düşerse arama doğrusaldır.

"Anahtarları kim seçiyor? Girdiyi düşman seçiyorsa ne olur?" → Sabit bir hash fonksiyonunda düşman çakışan anahtarlar üretebilir. Savunma, hash fonksiyonunu çalışma anında rastgele seçmek ve beklentiyi girdiden bağımsız hâle getirmektir.

"O hâlde neden her yerde hash tablosu kullanmıyoruz?" → Çünkü hash tablosu **sırayı yok eder**. En küçük ya da en büyük elemanı bulma, ardıl ve öncül, sıralı gezinme ve aralık sorgusu hash tablosunda desteklenmez; hepsi doğrusal tarama ister. Dengeli arama ağacı bu işlemleri logaritmik verir. Ayrıca hash tablosu en kötü durum garantisi vermez, dengeli ağaç verir. Seçim bu iki eksende yapılır: sıralı işlemlere ihtiyacın var mı, ve en kötü durum garantisine ihtiyacın var mı.

Sorulabilecek iki ek ayrıntı. Birincisi, anahtar tam sayı değilse önce tam sayıya çevrilir; dizgiler için standart yöntem, dizgiyi bir tabana göre büyük bir sayı gibi okuyup mod almaktır. İkincisi, eşitlik denetimi hash denetiminden ayrıdır: aynı hash değeri eşitlik anlamına gelmez, o yüzden hücreye vardıktan sonra anahtarın kendisi karşılaştırılır. Bu ayrımı atlamak, gerçek kodda sessiz hatalara yol açar.

Sık yapılan üç hata: "hash tablosu O(1)" deyip durumu belirtmemek; yük faktörünü hiç anmamak; ve hash tablosunu sıralı bir yapı sanıp aralık sorgusu vaat etmek.

İngilizce karşılıklar hazır olmalıdır: *hash function*, *hash table*, *collision*, *chaining*, *open addressing*, *linear probing*, *clustering*, *load factor*, *direct access array*, *comparison model*, *decision tree*, *universal hashing*, *expected time*, *amortized*.

### Sırada ne var

Bu makale karşılaştırma modelinin arama için koyduğu duvarı gösterdi ve modeli değiştirerek aştı. Sıradaki makale aynı duvarı **sıralama** için kuruyor ve aynı kaçış yolunu tekrar kullanıyor.

Önce dört klasik algoritmayı tek bir çerçevede karşılaştıracağız: eklemeli, seçmeli, birleştirmeli ve hızlı sıralama, bir de önceki makalede kurduğumuz heap'ten çıkan heapsort. Karşılaştırma dört sütunlu olacak: en kötü durum maliyeti, ortalama durum maliyeti, ek bellek ve **kararlılık** — eşit anahtarlı kayıtların göreli sırasının korunup korunmadığı. Sonra karar ağacı argümanını sıralamaya uygulayacağız: n! olası çıktı olduğu için hiçbir karşılaştırmalı sıralama n log n'den hızlı olamaz. Sayma makalesinde n! sayısını hesaplarken bu argümanın malzemesini zaten hazırlamıştık. En sonda yine modeli terk edip anahtarları tam sayı olarak kullanan ve doğrusal zamanda çalışan sıralamalara bakacağız — çakışmaları zincirlerde toplama fikri orada bir kez daha karşımıza çıkacak.

## Kaynakça

- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 4: Hashing — karşılaştırma modeli ve karar ağacı kurulumu; aramanın en az n + 1 yaprak gerektirmesi ve yüksekliğin ⌈lg(n + 1)⌉ − 1 ile alttan sınırlanması; sabitten büyük dallanma çarpanı ihtiyacı; doğrudan erişim dizisi, O(u) alan maliyeti ve on harfli isimler için 26¹⁰ ≈ 17,6 TB örneği; m < u olduğunda güvercin yuvası ilkesiyle hiçbir hash fonksiyonunun birebir olamayacağı; zincirleme ile açık adresleme ayrımı; bölme yönteminin sezgisel oluşu ve m'nin ikinin ve onun kuvvetlerinden uzak asal seçilmesi; u ≫ n iken her sabit hash fonksiyonunun O(n) uzunlukta zincir üreten bir girdi kümesi bulunması; evrensel aile h_{a,b}(k) = ((ak + b) mod p) mod m, çakışma olasılığının 1/m ile sınırlı olması ve beklenen zincir uzunluğunun 1 + (n − 1)/m çıkması; yük faktörü sabit tutulduğunda beklenen ve amortize sabit zaman. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 3.4 (Hash Tables) — hash aramanın iki parçası (hash fonksiyonu ve çakışma çözümü); modüler hashing ve M'nin asal seçilmesi; iyi bir hash fonksiyonunun üç gereği (belirlenimci, ucuz, düzgün dağıtan); düzgün hashing varsayımı (Varsayım J); ayrık zincirlemede zincir uzunluğunun N/M ile orantılı olması (Önerme K ve Özellik L); doğrusal denemenin tanımı ve üç olası sonucu; yük faktörünün α = N/M olarak tanımı ve açık adreslemede birden küçük olma zorunluluğu; N = αM için ortalama deneme sayısının isabetli aramada ≈ ½(1 + 1/(1 − α)), isabetsiz arama ve eklemede ≈ ½(1 + 1/(1 − α)²) olması (Önerme M); sabit ve bilinen bir hash fonksiyonu için aynı hash değerini veren anahtarların toplu hâlde üretilebilmesi. Addison-Wesley. [Bağlantı](https://algs4.cs.princeton.edu/34hash/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 11. bölüm (Hash Tables — doğrudan erişim tabloları, zincirlemeli hash tabloları ve 11.2'deki analiz, hash fonksiyonları, açık adresleme). MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE250 — Data Structures and Algorithms* (katalog tanımı "Hashing" başlığını içerir; bu makalenin resmî dayanağı odur). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe250/)
