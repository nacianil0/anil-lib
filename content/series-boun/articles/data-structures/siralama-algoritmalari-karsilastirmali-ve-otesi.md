---
article_id: article_4b599b29-da33-4aac-9e36-113cf9039942
title: "Sıralama Algoritmaları: Karşılaştırmalı ve Ötesi"
slug: siralama-algoritmalari-karsilastirmali-ve-otesi
category: data-structures
level: advanced
reading_order: 15
summary: "Beş klasik sıralama algoritmasının tek çerçevede karşılaştırılması: eklemeli, seçmeli, birleştirmeli, hızlı ve heapsort; yerinde çalışma ile kararlılığın tanımı ve ne zaman önemli olduğu; karar ağacı argümanıyla n log n alt sınırının sezgisi; ve modeli terk eden doğrusal sıralamalar — sayma ve radix."
tags:
  - siralama
  - mergesort
  - quicksort
  - kararlilik
  - radix-sort
content_hash: sha256:f1f0849eb5e761356fe8c24c4f77a0f3cb282f139bff5c9389327724e2622f4b
classification_version: 1
classification_batch: 4
---
## Sıralama neden hâlâ konuşuluyor

Bu fazın hemen her makalesi sıralamaya dayandı. İkili arama sıralı bir dizi ister; ikili arama ağacının değişmezi sıralı dolaşmadır; heap'i her seferinde boşaltmak zaten bir sıralamadır. Şimdiye kadar sıralamayı bir **araç** olarak kullandık; bu makalede ilk kez kendisi bir **problem** olarak masaya yatıyor.

Problemi net yazalım. Girdi n sayıdan oluşan bir dizidir. Çıktı, aynı elemanları içeren ama artan sırada duran bir dizidir — yani girdinin sıralı bir **permütasyonu**. Bu tanım basit görünüyor ama iki ek özellik, algoritma seçimini pratikte belirleyen şeydir:

- **Yerinde (in-place)** çalışma: algoritma sabit miktarda ek bellek kullanır. Girdiyi üzerine yazar.
- **Kararlılık (stable)**: eşit anahtarlı iki kayıt çıktıda, girdideki göreli sıralarını korur.

İkisi de "hangi sıralamayı kullanırsın?" sorusunun cevabında geçmesi gereken kalemlerdir ve ikisi de karmaşıklık sınıfında görünmez. Bu makalenin ana mesajlarından biri budur: **iki algoritma aynı karmaşıklık sınıfında olabilir ve yine de birbirinin yerine geçemez.**

## İki karesel taban

**Seçmeli sıralama (selection sort).** Dizinin ilk i + 1 elemanı içindeki en büyüğü bul ve i'inci konuma takas et; sonra kalan öneki aynı şekilde sırala. Doğruluğu tümevarımla iki satırda kurulur: sıralı bir dizinin son elemanı, dizinin en büyüğüdür ve algoritma oraya bir tane koyar; kalan önek de tümevarımla sıralanır. Maliyet T(n) = T(n − 1) + Θ(n) yinelemesinden Θ(n²) çıkar ve bu, **girdiden bağımsızdır**: dizi zaten sıralı olsa da aynı işi yapar. Buna karşılık takas sayısı yalnızca Θ(n)'dir — takasın çok pahalı olduğu ortamlarda tek avantajı budur. Kararlı değildir; uzak takaslar eşit anahtarlıların sırasını bozar.

**Eklemeli sıralama (insertion sort).** İlk i elemanı sırala, sonra i + 1'inci elemanı komşu takaslarla doğru yerine kaydır. Yine T(n) = T(n − 1) + Θ(n) ve en kötü durumda Θ(n²). Ama burada girdi önemlidir: dizi neredeyse sıralıysa her eleman birkaç adımda yerine oturur ve algoritma doğrusala yaklaşır. Kararlıdır ve yerindedir. Küçük dizilerde sabitleri o kadar küçüktür ki gerçek kütüphaneler, büyük algoritmaların özyinelemesini küçük parçalarda kesip eklemeli sıralamaya devreder.

İki algoritmanın da karesel olması tesadüf değil. Önceki makalede gördüğümüz gibi ikisi de aslında aynı desenin — öncelik kuyruğu sıralamasının — farklı temsillerle çalıştırılmış hâlidir: seçmeli sıralama sırasız dizi, eklemeli sıralama sıralı dizi üzerinde. İki temsilde de iki işlemden biri doğrusal olduğu için toplam karesel çıkıyor.

## Böl ve yönet: birleştirmeli sıralama

**Birleştirmeli sıralama (merge sort)** farklı bir fikirden gelir: diziyi ikiye böl, iki yarıyı özyinelemeli olarak sırala, sonra **birleştir**.

Bütün iş birleştirmede. İki sıralı diziyi tek bir sıralı diziye çevirmek için iki parmak yürütürsün: her adımda iki parmağın gösterdiği elemanlardan küçük olanı çıktıya yaz ve o parmağı ilerlet. Doğruluğu tümevarımla gelir: çıktının sıradaki hücresine yazılacak eleman, kalan iki önekin en küçüğüdür; iki önek de sıralı olduğu için o eleman mutlaka ikisinin başındaki elemanlardan biridir. n elemanlı birleştirme Θ(n) adım sürer.

Maliyet yinelemesi T(n) = 2T(n/2) + Θ(n)'dir ve çözümü Θ(n log n)'dir. Özyineleme ağacıyla görmek en temizidir: ağacın derinliği log₂ n, her seviyedeki toplam iş Θ(n), çarpımları Θ(n log n). Tümevarım makalesinde "aynı fikrin iki yüzü" derken kastedilen tam bu yapıydı; buradaki yineleme, ileride yineleme çözme tekniklerini formalleştirdiğimizde kanonik örnek olacak.

Birleştirmeli sıralamanın iki ayırt edici özelliği vardır. Birincisi, garanti **girdiden bağımsızdır**: her girdide n log n. İkincisi ve asıl bedeli: birleştirme için ayrı bir dizi gerekir, yani **Θ(n) ek bellek** ister. Yerinde birleştirme yapan çözümler vardır ama dikkate değer ölçüde karmaşıktır. Buna karşılık kararlıdır — iki parmak eşitlik durumunda soldaki parmağı tercih ettiği sürece.

Şekil 1 birleştirme adımını ve özyineleme ağacının derinliğini gösteriyor.

![Üstte iki sıralı dizi yan yana: solda 1, 5, 6, 7 ve sağda 2, 3, 4, 9. Çıktıya çoktan yazılmış hücreler soluk, sıradaki hücreler koyu; her dizinin üzerinde bir üçgen işaretçi duruyor ve soldaki 5'i, sağdaki 9'u gösteriyor. İki işaretçiden çıkan kesikli oklar aşağıdaki birleşik dizinin ilk boş hücresine iniyor. Birleşik dizide 1, 2, 3, 4 yazılmış, sıradaki hücre soru işaretiyle boş, kalan üç hücre de boş. Altında her adımda iki parmağın gösterdiği elemanlardan küçüğünün yazıldığı ve eşitlikte soldakinin tercih edildiği, kararlılığın buradan geldiği not düşülmüş. En altta özyineleme ağacı şeması: en üstte n uzunluğunda tek bir çubuk, altında n bölü iki uzunluğunda iki çubuk, onun altında n bölü dört uzunluğunda dört çubuk; sağda her seviyedeki toplam işin n olduğu, seviye sayısının log iki n olduğu ve çarpımlarının n çarpı log iki n verdiği yazıyor](assets/birlestirme-adimi.svg "Şekil 1 — Birleştirme adımı ve özyineleme ağacı: her seviyede n iş, log n seviye")

## Hızlı sıralama: ortalamada en hızlı, en kötüde karesel

**Hızlı sıralama (quicksort)** da böl ve yönettir ama işi tersine yapar: birleştirmeli sıralama ucuz böler ve pahalı birleştirir, hızlı sıralama pahalı böler ve hiç birleştirmez.

Bölme işleminin adı **ayırmadır (partition)**. Bir eleman **eksen (pivot)** seçilir ve dizi yeniden düzenlenir; öyle ki eksen kendi nihai konumuna oturur, solunda ondan büyük hiçbir eleman kalmaz, sağında ondan küçük hiçbir eleman kalmaz. Sonra iki parça bağımsız olarak özyinelemeli sıralanır. Birleştirme adımı yoktur, çünkü ayırma zaten küresel sırayı kurmuştur.

Maliyeti tamamen ayırmanın ne kadar dengeli olduğuna bağlıdır. En iyi durumda her ayırma diziyi tam ortadan böler ve yineleme T(n) = 2T(n/2) + Θ(n) olur — birleştirmeli sıralamanın aynısı, Θ(n log n). En kötü durumda ayırma her seferinde tek elemanlık bir parça üretir ve yineleme T(n) = T(n − 1) + Θ(n) olur, yani **Θ(n²)**. Zaten sıralı bir diziye ilk elemanı eksen seçerek uygulanan naif hızlı sıralamanın başına gelen tam olarak budur ve mülakatta en sevilen tuzaklardan biridir.

Ortalama durumda ise ayırma "yeterince ortada" olur: farklı anahtarlı n elemanlı bir dizide ortalama karşılaştırma sayısı yaklaşık 2n ln n'dir, bu da yaklaşık 1,39 · n log₂ n eder. Takas sayısı bunun altıda biri kadardır. Yani sabiti birleştirmeli sıralamadan biraz büyük olmasına rağmen pratikte daha hızlıdır; nedeni iç döngüsünün çok kısa olması ve ek dizi kopyalamamasıdır.

Buradaki "ortalama" kelimesine dikkat. Karmaşıklık makalesinde kurduğumuz uyarı burada da geçerlidir: ortalama durum bir dağılım varsayımıdır. Modern gerçekleştirimler bu varsayımı savunulabilir kılmak için **diziyi önceden rastgele karıştırır** ya da ekseni rastgele seçer. Böylece kötü durum girdinin bir özelliği olmaktan çıkar ve yalnızca kötü şansa bağlı kalır — hash makalesinde evrensel hash ailesiyle yaptığımız hamlenin aynısı. Ama en kötü durum **yok olmaz**, yalnızca olasılığı düşer.

Belleği de sayalım: ayırma yerinde yapılır, ek bellek yalnızca özyineleme yığınıdır. Karmaşıklık makalesinden biliyoruz ki özyineleme derinliği doğrudan bellek maliyetidir; dengeli bölmelerde bu logaritmiktir, dengesiz bölmelerde doğrusal olabilir. Hızlı sıralama kararlı değildir: ayırma uzak elemanları takas eder.

## Heapsort: garanti ve yerinde, ama kararsız

Önceki makalede kurduğumuz heap, öncelik kuyruğu sıralaması desenine takıldığında **heapsort** verir: yığını kur, sonra n kez en uçtakini al. Maliyet her girdide O(n log n)'dir; karşılaştırma ve takas sayısı 2n log₂ n'nin altında kalır.

Heapsort'un konumu tabloda tektir: **hem en kötü durumda n log n garantisi verir hem de yerinde çalışır.** Birleştirmeli sıralama garantiyi verir ama belleği ister; hızlı sıralama belleği istemez ama garantiyi vermez. Heapsort ikisini birden sunar. Karşılığında kaybettiği iki şey vardır: kararlı değildir ve bellek erişim deseni dağınık olduğu için pratikte hızlı sıralamadan yavaş çalışır.

## Karşılaştırma tablosu

| Algoritma | En kötü durum | Ortalama durum | Ek bellek | Yerinde | Kararlı |
|---|---|---|---|---|---|
| Eklemeli sıralama | n² | n² | sabit | evet | evet |
| Seçmeli sıralama | n² | n² | sabit | evet | hayır |
| Birleştirmeli sıralama | n log n | n log n | n | hayır | evet |
| Hızlı sıralama | n² | n log n | log n (yığın) | evet | hayır |
| Heapsort | n log n | n log n | sabit | evet | hayır |

Tabloyu okuma biçimi şudur: son üç sütunun hiçbiri ilk iki sütundan türetilemez. Birleştirmeli sıralama ile heapsort aynı sınıftadır ve tamamen farklı takaslar sunar.

**Kararlılık ne zaman önemli?** Kayıtları birden çok alana göre sıralamak istediğinde. Bir tabloyu önce ada, sonra bölüme göre sıralarsan ve ikinci sıralama kararlıysa, aynı bölümdeki kayıtlar ad sırasını korur — yani iki geçişte iki anahtarlı sıralama elde edersin. İkinci sıralama kararsızsa birinci geçişin bilgisi kaybolur. Aynı ilke birazdan doğrusal sıralamalarda **zorunlu** hâle gelecek.

Şekil 2 farkı somutlaştırıyor.

![Yan yana üç sütun; her kayıt bir ad ve bir not taşıyor, her satırın solunda o kaydın girdideki sırasını gösteren küçük bir sayı var. Solda girdi: Ada 2, Boran 1, Cem 2, Deniz 1 ve sıra numaraları 1, 2, 3, 4. Ortada kararlı sıralamanın nota göre çıktısı: Boran 1, Deniz 1, Ada 2, Cem 2 ve sıra numaraları 2, 4, 1, 3; altında girdideki sıranın korunduğu, iki ve dört olarak yazıyor. Sağda kararsız bir sıralamanın olası çıktısı: Deniz 1, Boran 1, Ada 2, Cem 2 ve sıra numaraları 4, 2, 1, 3; altında sıranın bozulduğu, dört ve iki olarak yazıyor. Eşit notlu kayıtlar üç sütunda da vurgulu. En altta çok anahtarlı sıralamanın ancak ikinci geçiş kararlıysa doğru sonuç verdiği not ediliyor](assets/kararlilik.svg "Şekil 2 — Kararlılık: eşit anahtarlı kayıtların göreli sırası korunur mu?")

> **Sesli anlat:** "Kararlı sıralama ne demek, ne zaman önemlidir ve hangi algoritmalar kararlıdır? Altmış saniyede anlat."
>
> İyi bir cevabın omurgası: "Bir sıralama, eşit anahtarlı kayıtların çıktıdaki göreli sırasını girdideki gibi koruyorsa kararlıdır. Karmaşıklık sınıfından okunmaz; ayrı bir özelliktir. Önemli olduğu asıl yer çok anahtarlı sıralamadır: bir tabloyu önce ikincil anahtara, sonra birincil anahtara göre sıralarsam, ikinci geçiş kararlı olduğu sürece birinci geçişin kurduğu sıra korunur ve iki geçişte sözlük sırası elde ederim; ikinci geçiş kararsızsa o bilgi kaybolur. Eklemeli sıralama ve birleştirmeli sıralama kararlıdır; seçmeli sıralama, hızlı sıralama ve heapsort kararsızdır, çünkü üçü de uzak konumlar arasında takas yapar. Kararsız bir algoritmayı kararlı hâle getirmenin standart yolu, anahtara girdi indisini ikincil anahtar olarak eklemektir; bedeli ek bellektir."

## Alt sınır: n log n'in altına neden inilemez?

Hash makalesinde karar ağacı argümanını arama için kurmuştuk. Aynı argüman sıralamaya neredeyse hiç değiştirilmeden uygulanır ve sonuç çok daha çarpıcıdır.

Karşılaştırma modelinde bir sıralama algoritmasının yapabileceği tek şey karşılaştırmalardır; dolayısıyla algoritma yine bir ikili karar ağacıdır. Yapraklar olası çıktılardır ve sıralamada olası çıktı sayısı **girdinin n! permütasyonudur** — algoritma her permütasyonu ayırt edebilmek zorundadır, yoksa bazı girdilerde yanlış çıktı üretir. Yani ağacın en az n! yaprağı olmalıdır.

En az L yapraklı bir ikili ağacın yüksekliği en az log₂ L'dir. Buradan en kötü durumdaki karşılaştırma sayısı en az log₂(n!) çıkar. Son adım bu ifadeyi tanıdık bir sınıfa yerleştirmektir: n! çarpımının en büyük yarısındaki her çarpan en az n/2 olduğu için n! ≥ (n/2)^(n/2), dolayısıyla log₂(n!) ≥ (n/2)·log₂(n/2), yani **Ω(n log n)**.

Sayma makalesinde n! sayısının ne kadar hızlı büyüdüğünü hesaplarken bu argümanın malzemesini zaten hazırlamıştık; aynı makalede "karşılaştırmalı sıralamanın n! olası çıktıyı ayırt etmek zorunda olması alt sınır ispatının çekirdeğidir" diye not düşmüştük. Şimdi çekirdek yerine oturdu. Sıkı hâli ve genel karar ağacı kuramı algoritma analizi fazının alt sınırlar makalesine ait; burada sezgisi ve savunması yeterli.

Sonucun iki okuması var. Birincisi: birleştirmeli sıralama ve heapsort **asimptotik olarak optimaldir**; daha iyisi aranmaz. İkincisi ve daha önemlisi: bu bir **model sonucudur**. "Hiçbir sıralama n log n'den hızlı olamaz" cümlesi yanlıştır; doğrusu "hiçbir **karşılaştırmalı** sıralama n log n'den hızlı olamaz"dır. Farkı görmek, alt sınır sorularında iyi adayı ayıran şeydir.

## Modelin ötesi: sayma ve radix

Modeli terk edelim. Anahtarların {0, …, u − 1} aralığında tam sayı olduğunu varsayarsak, hash makalesindeki hamleyi tekrarlayabiliriz: anahtarı karşılaştırma malzemesi değil, **indis** olarak kullan.

**Sayma sıralaması (counting sort).** u hücrelik bir dizi aç ve her hücrede o anahtara sahip kayıtların bir zincirini tut — hash tablosundaki zincirlemenin aynısı. Bütün kayıtları zincirlere dağıt, sonra hücreleri indis sırasında gezerek zincirleri sırayla boşalt. Maliyet Θ(n + u)'dur: n kayıt dağıtılır, u hücre gezilir. u = O(n) ise bu doğrusaldır. Zincirlere sona ekleme yapıldığı sürece **kararlıdır** ve bu kararlılık az sonra zorunlu olacak. Ek belleği Θ(n + u)'dur.

**Radix sıralaması (radix sort).** u büyükse tek geçiş işe yaramaz, ama anahtarı **basamaklara** ayırabiliriz. Anahtarı n tabanında yaz: k = a·n + b biçiminde iki basamaklı bir sayı, ya da genel olarak c = log_n u basamaklı bir sayı. Sonra basamak basamak sırala — **en anlamsız basamaktan en anlamlıya doğru** — ve her geçişte kararlı bir sıralama (sayma sıralaması) kullan. Her geçiş Θ(n) sürer, c geçiş vardır, toplam Θ(cn). c sabitse, yani u = O(n^c) ise, bu doğrusaldır.

Neden en anlamsız basamaktan başlanır ve kararlılık neden zorunludur? Çünkü her geçiş, önceki geçişlerin kurduğu sırayı **korumak** zorundadır. En anlamlı basamağa göre sıralarken eşit çıkan iki anahtarın arasındaki sırayı zaten daha önceki geçişler doğru kurmuştur; kararsız bir sıralama bu bilgiyi bozar ve sonuç yanlış çıkar.

Somut bir iz: [17, 3, 24, 22, 12] dizisini n = 5 tabanında sıralayalım. Basamaklara ayırınca 17 = (3, 2), 3 = (0, 3), 24 = (4, 4), 22 = (4, 2), 12 = (2, 2) olur. Önce düşük basamağa göre kararlı sıralama: düşük basamaklar sırasıyla 2, 3, 4, 2, 2 olduğu için sonuç 17, 22, 12, 3, 24 çıkar — düşük basamağı 2 olan üçü girdideki sırayı korur. Sonra yüksek basamağa göre kararlı sıralama: yüksek basamaklar şimdi 3, 4, 2, 0, 4 olduğu için sonuç 3, 12, 17, 22, 24 olur. Sıralı. Dikkat: son geçişte 22 ile 24'ün yüksek basamağı eşitti ve doğru sıraya birinci geçiş karar vermişti; kararlılık olmasaydı ikisi ters dönebilirdi.

Bu algoritmalar alt sınırı **ihlal etmiyor**, çünkü karşılaştırma modelinde değiller. Anahtarları kara kutu olarak görmüyorlar; içlerine bakıp aritmetik yapıyorlar. Aynı zamanda bedava da değiller: anahtarların tam sayı olması, aralığın sınırlı olması ve ek bellek ödenmesi gerekiyor. Mülakatta doğru cümle şudur: "u sınırlıysa sıralamayı doğrusala indirebilirim, ama bunun için karşılaştırma modelinden çıkmam ve anahtarın yapısını kullanmam gerekir."

## Mülakatta nasıl görünür

Sıralama nadiren "quicksort'u anlat" diye sorulur. Tipik zincir şudur: "Bu veriyi nasıl sıralarsın?" → "Neden onu seçtin?" → "Peki şu kısıt eklenirse?"

İyi bir cevabın sırası sabittir. Önce girdi hakkında ne bildiğini sor ya da varsayımını söyle: boyut, anahtar tipi, bellekte mi diskte mi, neredeyse sıralı mı, eşit anahtar var mı. Sonra algoritmayı seç ve seçimi tablodaki **tek bir hücreye** dayandır. Sonra vazgeçtiğini kendin söyle. En sonda ek belleği ekle.

Birkaç hazır cevap: "En kötü durumda garanti istiyorum ve ek bellek veremem" → heapsort. "Kararlılık gerekiyor" → birleştirmeli sıralama. "Genel amaçlı, en hızlısı" → rastgeleleştirilmiş hızlı sıralama, küçük parçalarda eklemeli sıralamaya devrederek. "Veri diske sığmıyor" → dış sıralama, yani parçaları sırala ve çok yollu birleştir; burada blok tabanlı maliyet modeli geri gelir. "Anahtarlar küçük tam sayılar" → sayma ya da radix sıralaması.

Sık yapılan üç hata: "quicksort O(n log n)" deyip durumu belirtmemek; kararlılığı hiç anmamak; ve alt sınırı modelden bağımsızmış gibi ifade etmek.

İngilizce karşılıklar hazır olmalıdır: *insertion sort*, *selection sort*, *merge sort*, *quicksort*, *heapsort*, *partition*, *pivot*, *in-place*, *stable*, *comparison sort*, *lower bound*, *counting sort*, *radix sort*, *external sort*.

### Sırada ne var

Bu makale, fazın kapanışına bir adım kaldığını gösteriyor. Veriyi bir kümede tutmayı (dizi, liste, ağaç, heap, hash tablosu) ve sıralamayı öğrendik. Eksik olan tek yapı, öğeler arasındaki **ilişkileri** taşıyan yapı: graf.

Sıradaki makale grafı bir veri yapısı olarak ele alıyor. Ayrık matematik fazında grafı tanımlamış, el sıkışma lemmasını ispatlamış ve ağaç karakterizasyonlarını kurmuştuk; ama grafı bilgisayarda **nasıl sakladığımızı** hiç konuşmadık. İki temsil var — komşuluk listesi ve komşuluk matrisi — ve ikisi arasındaki seçim, bu fazda üç kez sorduğumuz sorunun aynısıdır: neyi ucuzlatmak için neyi pahalılaştırıyoruz? Sonra iki temel dolaşmayı kuracağız: kuyrukla yürüyen genişlik öncelikli arama ve yığınla (ya da özyinelemeyle) yürüyen derinlik öncelikli arama. Temel yapılar makalesinde tanımladığımız iki arayüz, orada iki farklı algoritmaya dönüşecek. Bağlı bileşenler ve topolojik sıralama da orada, kümeler makalesinde bıraktığımız sözlerin karşılığı olarak açılacak.

## Kaynakça

- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 3: Sorting ve Lecture 5: Linear Sorting — permütasyon, sıralılık, yıkıcı ve yerinde sıralama tanımları (yerinde = O(1) ek yer); seçmeli ve eklemeli sıralamanın tümevarımlı doğruluk ispatları ve T(n) = T(n − 1) + Θ(n) ⇒ Θ(n²) analizi; birleştirmeli sıralamanın iki parmaklı birleştirmesi, tümevarımlı doğruluğu ve T(n) = 2T(n/2) + Θ(n) ⇒ Θ(n log n) çözümünün hem yerine koyma hem özyineleme ağacıyla verilmesi; karşılaştırmalı sıralama alt sınırı (yaprak sayısı ≥ n!, yükseklik ≥ log(n!) ≥ log((n/2)^(n/2)) = Ω(n log n)) ve birleştirmeli sıralamanın bu modelde optimal olması; kararlılığın tanımı; sayma sıralamasının zincir tabanlı kurulumu ve Θ(n + u) maliyeti; demet sıralamasının en anlamsız basamaktan başlaması ve kararlılık gerekliliği; radix sıralamasının Θ(n + n·log_n u) maliyeti ve u = O(n^c) iken doğrusal olması; beş algoritmanın yerinde/kararlı özet tablosu. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 2.2 (Mergesort) ve 2.3 (Quicksort) — birleştirmeli sıralamanın her girdide N log N garantisi vermesi ve asıl dezavantajının N ile orantılı ek yer olması; yukarıdan aşağı birleştirmeli sıralamanın ½N lg N ile N lg N arasında karşılaştırma yapması; hiçbir karşılaştırma tabanlı sıralamanın lg(N!) ~ N lg N'den az karşılaştırmayla garanti veremeyeceği ve birleştirmeli sıralamanın asimptotik olarak optimal olması; hızlı sıralamanın yerinde çalışması ve ayırma sürecinin üç koşulu; farklı anahtarlı bir dizide ortalama ≈ 2N ln N karşılaştırma ve bunun altıda biri kadar takas; en kötü durumda ≈ N²/2 karşılaştırma ve rastgele karıştırmanın bu duruma karşı koruma sağlaması; algoritmanın 1960'ta C. A. R. Hoare tarafından bulunması; küçük dizilerde eklemeli sıralamaya devretme iyileştirmesi. Addison-Wesley. [Bağlantı](https://algs4.cs.princeton.edu/23quicksort/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 2. bölüm (Getting Started — eklemeli sıralama ve birleştirmeli sıralama), 6. bölüm (Heapsort), 7. bölüm (Quicksort) ve 8. bölüm (Sorting in Linear Time — 8.1 alt sınırlar, 8.2 sayma sıralaması, 8.3 radix sıralaması). MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE250 — Data Structures and Algorithms* (katalog tanımı "Advanced Sorting" başlığını içerir; bu makalenin resmî dayanağı odur). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe250/)
