---
article_id: article_e191a849-82e5-42ea-9ea6-9d15a88398fe
title: "Kümeler, Fonksiyonlar ve Bağıntılar"
slug: kumeler-fonksiyonlar-ve-bagintilar
category: discrete-math
level: intermediate
reading_order: 5
summary: "Mülakatın nesne dilini kurar: küme eşitliğinin çift kapsama ile ispatı, birebir ve örten fonksiyonların ispat kalıpları, bağıntı özellikleri, denklik bağıntısı ile parçalanış ilişkisi, kısmi sıralar ve sayılabilirliğin hesaplanabilirlikle bağı."
tags:
  - kume
  - fonksiyon
  - birebir-orten
  - baginti
  - denklik-baginti
  - kismi-sira
content_hash: sha256:4878aebbe57072ef8f81665df25762a08424cd7be91be447f2838e120699c9ae
classification_version: 1
classification_batch: 1
---
## Mülakatın nesne dili

Şimdiye kadarki üç makale iddiaların **nasıl** söyleneceğini ve ispatlanacağını kurdu. Bu makale, o iddiaların **neyin hakkında** olduğunu kuruyor. Bilgisayar mühendisliğindeki hemen her nesne üç temel yapıdan birine indirgenir: bir **küme (set)**, bir **fonksiyon (function)** ya da bir **bağıntı (relation)**.

Bunun mülakat açısından pratik karşılığı şudur. Bir hash tablosu bir fonksiyondur; sorulacak ilk soru o fonksiyonun birebir olup olmadığıdır. Bir veri tabanı tablosu bir bağıntıdır; birincil anahtar tartışması bir fonksiyonel bağımlılık tartışmasıdır. Bir görev bağımlılık grafı kısmi sıradır; topolojik sıralama, o kısmi sırayı bir tam sıraya genişletmektir. Bu dili konuşabilmek, cevabı "biliyorum" düzeyinden "tanımıyla savunuyorum" düzeyine taşır.

## Kümeler ve iki tuzak

Sezgisel tanım: küme, sırasız ve tekrarsız bir nesne topluluğudur. {1, 2, 3} ile {3, 1, 2, 2} aynı kümedir.

Birinci tuzak **üyelik ile alt küme farkıdır**. x ∈ A ifadesi x'in A'nın bir **elemanı** olduğunu, B ⊆ A ifadesi B'nin her elemanının aynı zamanda A'nın elemanı olduğunu söyler. A = {1, {2, 3}} kümesini düşün: burada {2, 3} ∈ A doğrudur ama 2 ∈ A yanlıştır. Boş küme her kümenin alt kümesidir (∅ ⊆ A her zaman), ama ∅ ∈ A yalnızca boş küme açıkça A'nın içinde listelenmişse doğrudur. Mülakatta bu ayrımı karıştırmak, dikkatli dinleyen bir görüşmecinin hemen yakaladığı bir sinyaldir.

İkinci tuzak **güç kümesidir (power set)**: A'nın bütün alt kümelerinin kümesi. n elemanlı bir kümenin güç kümesinin 2ⁿ elemanı vardır, çünkü her eleman için bağımsız olarak "içeride" veya "dışarıda" kararı verilir. Bu, sıradaki makalede kuracağımız çarpma kuralının ilk kullanımıdır ve kaba kuvvet algoritmalarının neden 2ⁿ adımda çalıştığını da açıklar. Kartezyen çarpım A × B ise sıralı ikililerin kümesidir ve |A × B| = |A| · |B| sağlar.

Küme işlemleriyle mantıksal bağlaçlar arasında birebir bir karşılık vardır: birleşim "veya", kesişim "ve", tümleyen ise "değil" ile aynı doğruluk davranışını gösterir. İkinci makaledeki De Morgan kuralları bu yüzden kümelerde de aynen geçerlidir.

## Küme eşitliğinin ispat kalıbı

İki kümenin eşit olduğunu göstermenin standart yolu **çift kapsamadır**: A ⊆ B ve B ⊆ A gösterilir. Bu, üçüncü makaledeki "ancak ve ancak" kuralının küme dilindeki hâlidir; tek yönü gösterip durmak yine en sık kaybedilen puandır.

**İddia.** A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C).

**Strateji.** Rastgele bir eleman al, üyeliği mantıksal bir önermeye çevir, önermeyi ikinci makaledeki dağılma kuralıyla dönüştür, sonucu tekrar küme diline çevir.

**Birinci yön.** x ∈ A ∩ (B ∪ C) olsun. Tanım gereği x ∈ A **ve** (x ∈ B veya x ∈ C). Dağılma kuralıyla bu, (x ∈ A ve x ∈ B) **veya** (x ∈ A ve x ∈ C) önermesine denktir. Küme diline dönersek x ∈ (A ∩ B) ∪ (A ∩ C).

**İkinci yön.** Bütün adımlar denklik olduğu için ters yönde de aynı zincir yürür: x ∈ (A ∩ B) ∪ (A ∩ C) alındığında aynı dönüşümler geriye doğru uygulanır.

**Savunma.** İspatın tek maddesi şudur: küme özdeşlikleri, mantıksal denkliklerin kılık değiştirmiş hâlidir. Bu yüzden yeni bir özdeşlikle karşılaştığında ezberlemen gerekmez; üyeliği önermeye çevirip ikinci makaledeki denkliklerden birini uygularsın. Mülakatta "bunu Venn şemasıyla gösterebilir misin?" sorusu gelirse şema bir sezgi aracıdır; ispat, eleman kovalamaktır.

## Fonksiyonlar

Formal tanım: f: A → B fonksiyonu, A'nın **her** elemanına B'de **tam olarak bir** eleman atayan bir kuraldır. A tanım kümesi (domain), B değer kümesidir (codomain). f'nin gerçekten ürettiği değerlerin kümesine görüntü kümesi (range) denir ve değer kümesinin bir alt kümesidir.

Sınır örneği tanımın iki yarısını da yoklar: f(x) = 1 / x kuralı ℝ üzerinde bir fonksiyon **değildir**, çünkü x = 0'a bir değer atamaz. Aynı kural ℝ \ {0} üzerinde pekâlâ bir fonksiyondur. Fonksiyon, formülden ibaret değildir; formül artı tanım kümesi artı değer kümesidir.

Üç özellik mülakatın merkezindedir.

**Birebir (injective):** farklı girdiler farklı çıktılara gider. İspat kalıbı sabittir: f(a₁) = f(a₂) varsay, a₁ = a₂ sonucuna yürü.

**Örten (surjective):** değer kümesinde karşılıksız eleman kalmaz. İspat kalıbı: rastgele bir b ∈ B al, f(a) = b sağlayan bir a **inşa et**. Bu, üçüncü makaledeki yapıcı ispatın tipik bir örneğidir.

**Birebir örten (bijective):** ikisi birden. Bir fonksiyonun **tersinin var olması, birebir örten olmasıyla aynı şeydir** — mülakatın en sık sorulan karakterizasyonlarından biridir.

Şekil 1 üç durumu yan yana koyuyor.

![Üç panelde ok şemaları: solda birebir ama örten olmayan fonksiyon, değer kümesinde karşılıksız eleman kalır; ortada örten ama birebir olmayan fonksiyon, iki girdi aynı çıktıya gider; sağda birebir örten fonksiyon, her çıktı tam olarak bir girdiyle eşleşir](assets/fonksiyon-turleri.svg "Şekil 1 — Birebir, örten ve birebir örten: aynı üç noktanın üç farklı eşlemesi")

**Çalışılmış örnek.** f: ℝ → ℝ, f(x) = 3x − 7 birebir örtendir. Birebirlik için 3a − 7 = 3b − 7 varsayalım; her iki tarafa 7 ekleyip 3'e bölünce a = b çıkar. Örtenlik için rastgele bir y alalım ve x = (y + 7) / 3 seçelim; bu bir gerçel sayıdır ve f(x) = 3 · (y + 7) / 3 − 7 = y verir. Ters fonksiyon böylece elimizde: f⁻¹(y) = (y + 7) / 3.

**Karşı örnek.** g: ℝ → ℝ, g(x) = x² ne birebirdir ne örten. Birebir değildir, çünkü g(2) = g(−2) = 4. Örten değildir, çünkü −1 sayısının ön görüntüsü yoktur. Ama tanım ve değer kümesini [0, ∞) olarak daraltırsan **aynı formül** birebir örten olur. Buradan çıkan cümle mülakatta doğrudan işe yarar: birebirlik ve örtenlik formülün değil, üçlünün — formül, tanım kümesi, değer kümesi — özelliğidir.

**Bileşke (composition)** işlemi bu üç özelliği taşıyabilir: (g ∘ f)(x) = g(f(x)) tanımıyla, f ve g birebirse bileşkeleri de birebirdir, ikisi de örtense bileşkeleri de örtendir. Ters yönde ise dikkatli olmak gerekir ve mülakat sorusu tam buradan gelir: g ∘ f birebirse f birebir olmak **zorundadır** — çünkü f(a) = f(b) eşitliği bileşkede de aynı çıktıyı verir — ama g birebir olmak zorunda değildir. Bu ayrım kodda serileştirme ve geri okuma çiftlerinde doğrudan işe yarar; zincirin tersinir olması, her halkasının tersinir olduğu anlamına gelmez.

Bu ayrımın mühendislikteki en görünür yeri hash fonksiyonlarıdır. Anahtar uzayı kova sayısından büyük olduğu sürece hiçbir hash fonksiyonu birebir olamaz; çakışma bir uygulama hatası değil, sayma gerçeğidir. Sıradaki makalede bunu güvercin yuvası ilkesiyle ispatlayacağız, hash tablolarının kendisini ise ilerleyen fazda ayrı bir makalede açacağız.

> **Sesli anlat:** "Birebir ile örten farkını, aynı formülün ikisini de değiştirebildiğini gösteren bir örnekle altmış saniyede anlat."
>
> İyi bir cevabın omurgası: "Birebir, farklı girdilerin farklı çıktılara gitmesi; örten ise değer kümesinde karşılıksız eleman kalmamasıdır. x kare fonksiyonu gerçel sayılardan gerçel sayılara ne birebirdir ne örten: artı iki ile eksi iki aynı yere gider ve eksi bir hiç üretilmez. Aynı formülü negatif olmayan gerçel sayılardan negatif olmayan gerçel sayılara tanımlarsam birebir örten olur ve tersi karekök olur. Yani bu özellikler formülün değil, tanım kümesi ve değer kümesiyle birlikte üçlünün özelliğidir."

## Bağıntılar ve dört özellik

A kümesi üzerindeki bir **ikili bağıntı**, A × A kartezyen çarpımının bir alt kümesidir. Yani bağıntı, "hangi sıralı ikililer birbiriyle ilişkilidir?" sorusunun cevabını bir küme olarak verir. Fonksiyon da özel bir bağıntıdır: her birinci bileşene tam olarak bir ikinci bileşen düşen bağıntı.

Dört özellik bütün sınıflandırmayı taşır. Her birinin yanına sınır örneğini de koyalım, çünkü mülakatta asıl yoklanan yer orasıdır.

| Özellik | Tanım | Örnek | Sağlamayan örnek |
|---|---|---|---|
| Yansımalı (reflexive) | her x için x R x | tam sayılarda ≤ | tam sayılarda küçüktür |
| Simetrik (symmetric) | x R y ise y R x | eşitlik | tam sayılarda ≤ |
| Ters simetrik (antisymmetric) | x R y ve y R x ise x = y | tam sayılarda ≤ | tam sayılarda "aynı mutlak değere sahip" |
| Geçişli (transitive) | x R y ve y R z ise x R z | tam sayılarda ≤ | tam sayılarda eşit değildir |

Son satır iyi bir sınavdır: 1 ile 2 eşit değildir, 2 ile 1 eşit değildir, ama 1 ile 1 eşittir; dolayısıyla "eşit değildir" bağıntısı geçişli değildir. Bir başka kritik gözlem: simetrik olmak ile ters simetrik olmak **birbirinin zıddı değildir**. Eşitlik bağıntısı ikisini birden sağlar; bütün tam sayılar üzerindeki bölünebilirlik ise ikisini de sağlamaz — 2 sayısı 4'ü böler ama 4, 2'yi bölmez (simetrik değil), buna karşılık 2 ile −2 birbirini böler ve eşit değildirler (ters simetrik değil).

## Denklik bağıntıları ve parçalanış

Yansımalı, simetrik ve geçişli bir bağıntıya **denklik bağıntısı (equivalence relation)** denir. Sezgi şudur: denklik bağıntısı, eşitliğin gevşetilmiş hâlidir — "tamamen aynı" yerine "bizim umursadığımız açıdan aynı" der.

Kanonik örnek modüler denkliktir: n pozitif bir tam sayı olmak üzere, a ile b arasındaki fark n'nin katıysa a ≡ b (mod n) yazılır. Üç koşul da doğrudan doğrulanır: fark sıfırsa n'nin katıdır (yansımalı), farkın işaretini değiştirmek katlığı bozmaz (simetrik), iki katın toplamı yine kattır (geçişli).

Denklik bağıntılarının asıl teoremi şudur: **bir denklik bağıntısının denklik sınıfları, kümenin bir parçalanışını (partition) oluşturur.** Yani sınıflar boş değildir, ikişer ikişer ayrıktır ve birleşimleri bütün kümeyi verir. MIT ders notlarında bu Teorem 9.10.4 olarak verilir ve mod 5 örneğiyle somutlaştırılır: tam sayılar, kalanına göre tam beş sınıfa ayrılır.

Sınır örneği bu tanımın en sevilen mülakat sorusudur: "simetrik ve geçişli olmak yansımalılığı gerektirmez mi? x R y ise y R x, geçişlilikle x R x çıkar." Argüman, x'in **hiçbir** elemanla ilişkili olmadığı durumda çöker; boş bağıntı, boş olmayan bir küme üzerinde simetrik ve geçişlidir ama yansımalı değildir. Üç koşulun ayrı ayrı istenmesinin sebebi tam olarak budur.

> **Sesli anlat:** "Denklik bağıntısının üç koşulunu ve üçünün de gerçekten gerekli olduğunu gösteren bir sınır örneğini doksan saniyede anlat."
>
> İyi bir cevabın omurgası: "Denklik bağıntısı yansımalı, simetrik ve geçişlidir; bu üçü sağlandığında denklik sınıfları kümeyi ayrık parçalara böler. Üçü de gereklidir: boş bağıntı, boş olmayan bir küme üzerinde simetrik ve geçişlidir ama yansımalı değildir, çünkü hiçbir eleman kendisiyle bile ilişkili değildir. Bu yüzden simetri ile geçişlilikten yansımalılık türetilemez. Somut örnek olarak mod 5 denkliğini veririm: tam sayıları kalanlarına göre beş sınıfa ayırır."

## Kısmi sıralar

Yansımalı, **ters simetrik** ve geçişli bir bağıntıya **kısmi sıra (partial order)** denir. Tek harf değişti — simetrik yerine ters simetrik — ve anlam tamamen değişti: denklik bağıntısı eşitliği gevşetir, kısmi sıra sıralamayı gevşetir.

Şekil 2 bu ayrımı özet hâlinde gösteriyor.

![Şema: ikili bağıntının dört özelliği üstte; yansımalı, simetrik ve geçişli birleşimi denklik bağıntısına ve oradan kümenin parçalanışına; yansımalı, ters simetrik ve geçişli birleşimi kısmi sıraya ve oradan karşılaştırılamaz çiftlere gider](assets/bagintidan-denklige-ve-siraya.svg "Şekil 2 — Tek bir koşul değişince: denklik bağıntısı ile kısmi sıra")

"Kısmi" sözcüğü kritik bilgiyi taşır: iki eleman **karşılaştırılamaz** olabilir. Pozitif tam sayılarda bölünebilirlik bağıntısını al: 2 ile 3 arasında hiçbir yönde ilişki yoktur, ama ikisi de 6'yı böler. Bir kümenin alt kümeleri üzerindeki kapsama bağıntısı da böyledir. Her eleman çiftinin karşılaştırılabildiği özel duruma **tam sıra (total order)** denir; gerçel sayılarda ≤ bunun örneğidir.

Mühendislikteki en yakın karşılığı bağımlılık grafıdır. Derleme sistemindeki "A, B'den önce derlenmelidir" ilişkisi bir kısmi sıradır; karşılaştırılamaz çiftler bağımsız işlerdir ve paralel çalıştırılabilirler. Topolojik sıralama, bu kısmi sırayı onunla uyumlu bir tam sıraya genişletme işlemidir — dolayısıyla tek bir doğru sıralama olmaması bir hata değil, kısmi sıranın doğal sonucudur. Bu konuyu graf dolaşmaları makalesinde algoritmasıyla birlikte açacağız.

## Sayılabilirlik: küçük ama önemli bir bakış

Sonsuz kümelerin "boyutu" da fonksiyonlarla tanımlanır: iki küme arasında birebir örten bir fonksiyon varsa aynı boyuttadırlar. Doğal sayılarla eşlenebilen kümelere **sayılabilir (countable)** denir.

Şaşırtıcı sonuçlar buradan gelir. Tam sayılar sayılabilirdir: 0, 1, −1, 2, −2 sırasıyla numaralandırılırlar. Rasyonel sayılar da sayılabilirdir. Ama gerçel sayılar **sayılamaz (uncountable)**; herhangi bir numaralandırma verildiğinde, köşegen üzerinde her basamağı değiştirerek listede olmayan bir sayı inşa edilebilir. Bu, üçüncü makaledeki karşı örnek disiplininin sonsuz kümelerdeki hâlidir.

Bilgisayar mühendisliği için sonucu şudur: programlar sonlu alfabede sonlu dizilerdir, dolayısıyla **program kümesi sayılabilirdir**. Doğal sayılardan {0, 1} kümesine giden fonksiyonların kümesi ise sayılamazdır. Her fonksiyonu hesaplayan bir program olsaydı, sayılabilir program kümesinden sayılamaz fonksiyon kümesine örten bir eşleme kurmuş olurduk; bu imkânsızdır. Dolayısıyla **hiçbir programın hesaplayamadığı fonksiyonlar vardır**. Durma probleminin ve karar verilemezliğin arkasındaki sayma argümanı budur; hesaplamanın sınırlarını konuştuğumuz makalede bu köprüye geri döneceğiz.

## Mülakatta nasıl görünür

Takip zinciri burada genellikle şöyle işler. Birinci halka tanımı yoklar: "Denklik bağıntısı nedir?" İkinci halka sınırı yoklar: "Üç koşuldan birini atarsan ne bozulur?" Üçüncü halka uygulamayı yoklar: "Bunu kodda nerede görürsün?"

Üçüncüsünün iyi cevabı somut olmalıdır: bir önbellekte anahtarları "aynı kovaya düşenler" diye gruplamak bir denklik bağıntısıdır ve kovalar denklik sınıflarıdır. Bir görev planlayıcıdaki bağımlılık ilişkisi kısmi sıradır. Bir eşitlik karşılaştırıcısını yanlış yazmak — örneğin geçişliliği bozmak — sıralama kütüphanelerinde gerçek hatalara yol açar, çünkü sıralama algoritmaları karşılaştırıcının geçişli ve kendi içinde tutarlı bir sıra tanımladığını varsayar.

Son bir uyarı: bu makalenin tanımları kısa olduğu için ezberlenmeye çok müsaittir. Ezberin görüşmede çöktüğü nokta hep aynıdır — sınır örneği istendiğinde. Her tanımın yanına bir sağlayan ve bir sağlamayan örnek koymadan çalışmayı bitmiş sayma.

### Sırada ne var

Bu makalede nesneleri kurduk ama onları **saymadık**. Oysa algoritma analizinin tamamı bir sayma işidir: kaç alt küme var, kaç karşılaştırma yapılıyor, kaç olası durum geziliyor. Sıradaki makalede kombinatoriğin temel araçlarını kuruyoruz: çarpma ve toplama kuralları, permütasyon ve kombinasyon, binom katsayıları ve güvercin yuvası ilkesi. Bu makaledeki fonksiyon dili orada doğrudan işe yarayacak, çünkü saymanın standart tekniği bir kümeyi başka bir kümeyle eşlemektir.

## Kaynakça

- Rosen, K. H. *Discrete Mathematics and Its Applications*, 2.1–2.3 ve 2.5 bölümleri (Sets; Set Operations; Functions; Cardinality of Sets) ile 9.1, 9.5 ve 9.6 bölümleri (Relations and Their Properties; Equivalence Relations; Partial Orderings). McGraw Hill. [Bağlantı](https://www.mheducation.com/highered/product/Discrete-Mathematics-and-Its-Applications-Rosen.html)
- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (ders notları), 4. bölüm (Mathematical Data Types), 7. bölüm (Infinite Sets) ve 9. bölümün kısmi sıra ile denklik bağıntısı kesitleri. MIT OpenCourseWare 6.042J. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE220 — Discrete Computational Structures*. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe220/)
