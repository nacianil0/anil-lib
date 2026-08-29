---
article_id: article_c9cea4e9-3a25-4cc5-a6a0-4c830ee5fc7c
title: "Sayma: Kombinatoriğin Temel Araçları"
slug: sayma-kombinatorigin-temel-araclari
category: discrete-math
level: intermediate
reading_order: 6
summary: "Algoritma analizinin altındaki sayma refleksini kurar: çarpma ve toplama kuralları, eşleyerek sayma, içerme-dışarma, permütasyon ve kombinasyon, binom katsayıları ve Pascal özdeşliği, güvercin yuvası ilkesinin hash çakışması ile sıkıştırma sınırlarına uygulanması."
tags:
  - sayma
  - permutasyon
  - kombinasyon
  - binom-katsayisi
  - guvercin-yuvasi
content_hash: sha256:1eec830260e9692eb24c552724eacd49d9d4a4c14d09368d6c3c203b4cc2613f
classification_version: 1
classification_batch: 1
---
## Neden saymayı hatırlaman gerekiyor

Algoritma analizinin tamamı bir sayma işidir. "Bu algoritma kaç adımda biter?" sorusu "kaç karşılaştırma yapılıyor?" sorusudur; "kaba kuvvet neden çalışmaz?" sorusu "kaç olasılık var?" sorusudur; "hash tablosunda çakışma olur mu?" sorusu "kaç anahtar, kaç kova?" sorusudur. Bu makale, o soruların hepsine aynı küçük araç setiyle cevap vermeyi kuruyor.

Önceki makalede kurduğumuz fonksiyon dili burada doğrudan işe yarayacak. Saymanın en güçlü tekniği zaten bir eşleme kurmaktır: elindeki kümeyi saymak zorsa, onunla **birebir örten** biçimde eşleşen daha kolay bir küme bul ve onu say.

## İki temel kural

**Çarpma kuralı (product rule).** Bir seçim art arda bağımsız adımlarla yapılıyorsa, toplam seçenek sayısı adımların seçenek sayılarının çarpımıdır. Sekiz karakterlik bir parolayı 26 küçük harf ve 10 rakamdan kuruyorsan seçenek sayısı 36⁸ = 2.821.109.907.456'dır.

**Toplama kuralı (sum rule).** Bir seçim, birbiriyle **kesişmeyen** durumlardan birinde yapılıyorsa, toplam seçenek sayısı durumların toplamıdır. Kritik koşul kesişmemektir; durumlar örtüşüyorsa toplama kuralı fazla sayar ve içerme-dışarma gerekir.

İkisi birlikte hemen her sayma probleminin iskeletini verir. Kalıp şudur: problemi **ya bağımsız adımlara böl** (çarp) **ya da ayrık durumlara böl** (topla). Mülakatta bir sayma sorusuna başlarken söylemen gereken ilk cümle, hangisini yaptığındır.

Önceki makaledeki güç kümesi sonucunu şimdi ispatlayabiliriz. n elemanlı bir kümenin alt kümelerini saymak için her elemanı sırayla ele al ve "içeride mi, dışarıda mı?" diye sor: n adımın her birinde iki seçenek vardır, çarpma kuralıyla toplam 2ⁿ. Bu tek satır, bütün alt kümeleri deneyen kaba kuvvet algoritmalarının neden 2ⁿ adımda çalıştığını da açıklar.

## Eşleyerek sayma

Yukarıdaki argümanın gizli adımı önemlidir: alt kümeleri, n bitlik ikili dizilerle eşledik. Her alt kümeye, i'inci biti "i'inci eleman içeride mi?" sorusunun cevabı olan bir dizi karşılık gelir ve bu eşleme birebir örtendir. İki küme arasında birebir örten bir fonksiyon varsa boyutları eşittir; dolayısıyla alt kümeleri saymak, dizileri saymaya indirgenir.

Bu teknik ders kitaplarında **bir şeyi başka bir şeyi sayarak saymak** diye geçer ve mülakatta zor görünen soruları kolaylaştıran en pratik hamledir. Bir sayma sorusunda tıkandığında sorulacak soru şudur: "Bu nesneleri, saymayı bildiğim hangi nesnelerle birebir eşleyebilirim?"

## İçerme-dışarma

Durumlar örtüştüğünde toplama kuralı bozulur ve düzeltme gerekir. İki küme için birleşimin eleman sayısı şöyle yazılır: |A ∪ B| = |A| + |B| − |A ∩ B|. Yani iki kez sayılan kesişim bir kez geri çıkarılır.

Üç kümede kalıp aynı biçimde devam eder; tekli toplamlardan ikili kesişimler çıkarılır ve üçlü kesişim geri eklenir: |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|. İşaretlerin sırayla artı ve eksi olması tesadüf değildir; her kesişim, fazladan sayıldığı kadar geri düşülür.

**Problem.** 1 ile 100 arasındaki tam sayılardan kaç tanesi 2'ye veya 3'e bölünür?

**Strateji.** İki kümeyi ayrı say, kesişimi bul, içerme-dışarma uygula. Kesişim, hem 2'ye hem 3'e bölünenler, yani 6'ya bölünenlerdir.

**Adımlar.** 2'ye bölünenler: 100 / 2 = 50 tane. 3'e bölünenler: 100 / 3 oranının tam kısmı, yani 33 tane. 6'ya bölünenler: 100 / 6 oranının tam kısmı, yani 16 tane. Sonuç 50 + 33 − 16 = 67.

**Savunma.** Kesişimi çıkarmasaydık 6'nın katlarını iki kez sayardık; sonuç 83 çıkardı ve 16 fazla olurdu. Buradaki tek incelik, "hem 2'ye hem 3'e bölünen" ile "6'ya bölünen" ifadelerinin aynı şey olmasıdır — bu, 2 ile 3'ün aralarında asal olmasından gelir. 2 ile 4 için aynı kısayol geçerli olmazdı.

## Permütasyon ve kombinasyon

İki soru bütün seçim problemlerini sınıflandırır: **sıra önemli mi?** ve **tekrar var mı?**

| Sıra önemli mi | Tekrar var mı | Sayı | Örnek |
|---|---|---|---|
| Evet | Evet | nʳ | dört haneli PIN: 10⁴ = 10.000 |
| Evet | Hayır | P(n, r) = n! / (n − r)! | sekiz koşucudan ilk üçü: 336 |
| Hayır | Hayır | C(n, r) = n! / (r! (n − r)!) | 52 karttan beşli el: 2.598.960 |

**Permütasyon (permutation)** sıralı seçimdir. n nesneden r tanesini sıralı seçmenin yolu, çarpma kuralıyla n · (n − 1) ⋯ (n − r + 1) çarpımıdır ve bu, faktöriyel diliyle n! / (n − r)! olarak yazılır.

**Kombinasyon (combination)** sırasız seçimdir ve permütasyondan **bölme kuralıyla** elde edilir: aynı r elemanlı alt kümeyi veren r! farklı sıralama vardır, dolayısıyla sıralı sayımı r!'e bölmek gerekir. Sonuç C(n, r) = n! / (r! (n − r)!).

Bu türetme, formülü ezberlemek yerine yeniden üretebilmeni sağlar; mülakatta formülü unutmak sorun değildir, türetememek sorundur.

Dördüncü kutu — sıra önemsiz, tekrar serbest — daha az sorulur ve C(n + r − 1, r) verir; "n türden r nesne seçmek" problemlerinde karşına çıkar.

**Problem.** On kişilik bir gruptan üç kişilik bir çalışma ekibi seçilecek ve ekipten biri sorumlu olarak atanacak. Kaç farklı sonuç vardır?

**Strateji.** Seçimi iki farklı sırayla adımlara böl ve iki sonucun aynı çıkmasını bir doğrulama olarak kullan.

**Birinci yol.** Önce ekibi seç, sonra sorumluyu ata: C(10, 3) = 120 ekip, her ekipte 3 sorumlu adayı, toplam 120 · 3 = 360.

**İkinci yol.** Önce sorumluyu seç, sonra ekibin kalan iki üyesini kalan dokuz kişiden seç: 10 · C(9, 2) = 10 · 36 = 360.

**Savunma.** İki sayının eşit çıkması tesadüf değildir; ikisi de aynı nesneleri — "üç kişilik ekip artı içlerinden bir sorumlu" üçlülerini — sayar. Bu, hem cevabı doğrulamanın hem de kombinatoryal ispat kurmanın standart yoludur. Mülakatta bir sayma cevabını savunmanın en ucuz yolu, aynı sayıyı ikinci bir yoldan üretmektir.

> **Sesli anlat:** "Permütasyon ile kombinasyon arasındaki farkı ve birinden diğerine nasıl geçildiğini altmış saniyede anlat."
>
> İyi bir cevabın omurgası: "Permütasyon sıralı seçimdir, kombinasyon sırasız. Sekiz koşucudan ilk üçü kimdir sorusu permütasyondur, çünkü birinci ile üçüncü farklı şeylerdir; sekiz koşucudan üçünü takıma seçmek kombinasyondur. İkisi arasındaki köprü bölme kuralıdır: aynı üç kişilik grubu üç faktöriyel farklı sırayla dizebilirim, o yüzden sıralı sayımı üç faktöriyele bölerim. Formülü unutursam bu türetmeden yeniden yazarım."

## Binom katsayıları ve Pascal özdeşliği

C(n, k) sayısına **binom katsayısı (binomial coefficient)** denir, çünkü (x + y)ⁿ açılımında xⁿ⁻ᵏ yᵏ teriminin katsayısıdır. Sebep saymadır: çarpımdaki n parantezin k tanesinden y seçersin, geri kalanından x; bu seçimi yapmanın yolu sayısı tam olarak C(n, k)'dir.

En çok kullanılan bağıntı **Pascal özdeşliğidir**:

C(n, k) = C(n − 1, k − 1) + C(n − 1, k).

Şekil 1 bunu üçgen üzerinde gösteriyor: her sayı, üstündeki iki sayının toplamıdır.

![Solda beş satırlık Pascal üçgeni; sağ altta 10 değeri ile onu üreten 4 ve 6 değerleri vurgulanmış. Sağda Pascal özdeşliğinin formülü, sayısal örneği ve bir elemanı sabitlemeye dayanan kombinatoryal ispatın adımları](assets/pascal-ucgeni-ve-ozdeslik.svg "Şekil 1 — Pascal üçgeni ve özdeşliğin kombinatoryal ispatı")

Özdeşliğin cebirsel ispatı faktöriyelleri açmakla yapılır ama **kombinatoryal ispatı** çok daha öğreticidir ve mülakatta daha iyi durur. Her iki taraf da aynı şeyi sayar: n elemanlı bir kümenin k elemanlı alt kümelerini. Kümedeki bir elemanı sabitle. Bir alt küme ya o elemanı içerir — geri kalan k − 1 eleman diğer n − 1 arasından seçilir, C(n − 1, k − 1) yol — ya da içermez — k elemanın hepsi diğer n − 1 arasından seçilir, C(n − 1, k) yol. İki durum ayrıktır ve hepsini kapsar; toplama kuralı sonucu verir.

Aynı teknik satır toplamlarını da verir: k sıfırdan n'ye kadar C(n, k) toplamı 2ⁿ'dir, çünkü sol taraf alt kümeleri boyutlarına göre gruplayarak, sağ taraf ise "her eleman için içeride mi dışarıda mı" diyerek **aynı** alt küme koleksiyonunu sayar. Bir eşitliği iki farklı sayma yoluyla göstermek, kombinatoriğin en zarif aracıdır.

## Güvercin yuvası ilkesi

Sezgisel tanım tek cümledir: nesne sayısı kutu sayısından fazlaysa, en az bir kutuda birden fazla nesne vardır.

Formal hâli önceki makalenin diliyle yazılır: sonlu bir A kümesinden, |B| < |A| olan sonlu bir B kümesine giden hiçbir fonksiyon birebir olamaz. Basitliğine bakma; bu ilke, ispatlanması aksi hâlde zor olan pek çok "kaçınılmazlık" iddiasını iki satıra indirir.

Şekil 2 hem temel hem genelleştirilmiş biçimi gösteriyor.

![Beş nesnenin dört kutuya yerleştirilmesi: oklar nesneleri kutulara bağlar, üçüncü kutuya iki nesne düşer ve vurgulanır. Altta genelleştirilmiş biçim ve yüz kişinin on iki aya dağılımı örneği](assets/guvercin-yuvasi-ilkesi.svg "Şekil 2 — Güvercin yuvası ilkesi ve genelleştirilmiş biçimi")

**Genelleştirilmiş biçim.** N nesne k kutuya konursa, en az bir kutuda N / k oranının üst tam sayısı kadar nesne bulunur. Yüz kişilik bir grupta, doğum aylarına göre en az dokuz kişinin aynı ayda doğmuş olması bundandır: 100 / 12 oranının üst tam sayısı dokuzdur.

Doğum günü örneğinin kesin hâli de buradadır: yılın 365 gününü kutu sayarsak, 366 kişilik bir grupta en az iki kişinin doğum günü aynı olmak **zorundadır**. Bu bir olasılık iddiası değil, bir kesinlik iddiasıdır; ayrımı aklında tut, birazdan buna döneceğiz.

İki mühendislik sonucu bu ilkeden doğrudan çıkar.

**Hash çakışması kaçınılmazdır.** Anahtar uzayı kova sayısından büyük olduğu sürece hiçbir hash fonksiyonu birebir olamaz. Bu, kötü bir hash fonksiyonu seçmiş olmanın cezası değildir; sayma gerçeğidir. Dolayısıyla bir hash tablosu tasarımında sorulacak doğru soru "çakışma olur mu?" değil, "çakışma olunca ne yapıyoruz ve maliyeti ne?" sorusudur. Bu, ileride hash tablolarını işlediğimiz makalenin başlangıç cümlesi olacak.

**Kayıpsız sıkıştırma her girdiyi kısaltamaz.** n bitlik dizilerin sayısı 2ⁿ'dir; uzunluğu n'den küçük bütün ikili dizilerin sayısı ise 1 + 2 + 4 + ⋯ + 2ⁿ⁻¹ = 2ⁿ − 1'dir. Kayıpsız bir sıkıştırıcı farklı girdileri farklı çıktılara götürmek zorunda olduğuna göre, 2ⁿ diziyi 2ⁿ − 1 hedefe birebir yerleştiremez. En az bir girdi kısalmaz. "Her dosyayı küçülten sıkıştırıcı" iddiası bu yüzden imkânsızdır.

> **Sesli anlat:** "Güvercin yuvası ilkesini bir sistem tasarımı kararıyla bağla ve doksan saniyede anlat."
>
> İyi bir cevabın omurgası: "İlke, nesne sayısı kutu sayısını aştığında bir kutuda birden fazla nesne olmak zorunda olduğunu söyler; formal hâli, daha büyük sonlu bir kümeden daha küçüğüne birebir fonksiyon olamayacağıdır. Hash tablosunda anahtar uzayı kova sayısından büyüktür, dolayısıyla çakışma bir olasılık değil bir zorunluluktur. Bu yüzden tasarım kararı çakışmayı önlemek değil, çakışma çözümünü ve en kötü durum maliyetini seçmektir: zincirleme mi, açık adresleme mi, yük faktörünü nerede tutuyorum. Aynı argüman kayıpsız sıkıştırmanın her girdiyi küçültemeyeceğini de gösterir."

## Sayma refleksi: analizde nerede işe yarar

Üç sayı, algoritma analizinde tekrar tekrar karşına çıkar ve hepsi bu makalenin araçlarından gelir.

**C(n, 2) = n(n − 1) / 2.** Bir kümedeki bütün ikili çiftlerin sayısı. Bütün çiftleri karşılaştıran bir algoritmanın adım sayısı budur; bin elemanlı bir dizide 499.500 karşılaştırma eder. Kabaca n²/2 olduğu için "iç içe iki döngü kare zamandır" sezgisinin kaynağıdır.

**2ⁿ.** Bütün alt kümeleri deneyen kaba kuvvet. Otuz elemanda bir milyarın üzerine çıkar; bu yüzden alt küme arama problemlerinde daha akıllı bir yöntem — dinamik programlama gibi — aranır.

**n!.** Bütün sıralamaları deneyen kaba kuvvet. On elemanda 3.628.800 eder ve çok hızlı biçimde erişilemez hâle gelir; gezgin satıcı türü problemlerin zorluğunun ilk sezgisi budur.

Bu üç sayıyı büyüklük sırasıyla söyleyebilmek, karmaşıklık tartışmasının hazırlığıdır. Sayma ayrıca **alt sınır** argümanlarının da malzemesidir: karşılaştırmalı sıralamanın n! olası çıktı sıralamasını ayırt etmek zorunda olması, ilerideki fazda kuracağımız alt sınır ispatının çekirdeğidir.

Bir uyarı da olasılık tarafına: sayma ile olasılık aynı şey değildir. Güvercin yuvası "366 kişide çakışma **kesindir**" der. Buna karşılık doğum günü ilkesi, olasılık tarafında çok daha erken bir eşik verir: MIT ders notlarındaki biçimiyle, yılda d gün varsa ve odada yaklaşık 2d sayısının karekökü kadar kişi varsa, iki kişinin doğum gününün çakışma olasılığı yaklaşık 1 − 1/e ≈ 0,632 olur. d = 365 için bu, kabaca 27 kişi demektir ve gerçek değer 0,626'dır. Kesinlik ile olasılık arasındaki bu uçurum, mülakatta ayırt edilmesi beklenen bir ayrımdır; olasılık araçlarını destekleyici temeller fazında ayrıca kuracağız.

## Mülakatta nasıl görünür

Sayma soruları mülakatın en sevilen küçük problemleridir, çünkü on dakikaya sığar ve düşünme biçimini açığa çıkarır. Takip zinciri genellikle şudur: "Kaç tane var?" → "Nasıl saydın, çarpma mı toplama mı?" → "Sıra önemli miydi, neden?"

En sık yapılan üç hata bellidir. Birincisi **çift sayma**: örtüşen durumları toplamak. İkincisi **sıra karışıklığı**: sırasız bir seçimi permütasyonla saymak, yani sonucu r! kat fazla bulmak. Üçüncüsü **bağımsızlık varsayımı**: ikinci adımın seçenek sayısı birinci adımın sonucuna bağlıysa çarpma kuralı doğrudan uygulanamaz.

Bu hataların hepsinin panzehiri aynıdır ve önceki makalelerden tanıdıktır: küçük bir değerde elle say. n = 3 için hem formülü hesapla hem de bütün durumları listele. İki sayı tutmuyorsa formül yanlıştır ve hangi hatayı yaptığın genellikle listeye bakınca görünür.

### Sırada ne var

Buraya kadar mantık, ispat, tümevarım, nesne dili ve sayma ile mülakatın matematiksel zeminini kurduk. Sıradaki makalede bu zeminin üzerine bilgisayar mühendisliğinin en çok kullandığı yapıyı koyuyoruz: graflar ve ağaçlar. Derece, yol ve bağlılık tanımlarını kuracak, el sıkışma lemmasını bu makaledeki sayma refleksiyle ispatlayacak ve ağaç karakterizasyonlarını tümevarımla göstereceğiz. Böylece Faz A'nın son iki makalesine, gereken bütün araçlar elimizdeyken gireceğiz.

## Kaynakça

- Rosen, K. H. *Discrete Mathematics and Its Applications*, 6.1–6.4 bölümleri (The Basics of Counting; The Pigeonhole Principle; Permutations and Combinations; Binomial Coefficients and Identities). McGraw Hill. [Bağlantı](https://www.mheducation.com/highered/product/Discrete-Mathematics-and-Its-Applications-Rosen.html)
- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (ders notları), 14. bölüm (Cardinality Rules; güvercin yuvası 14.8, içerme-dışarma 14.9) ve 16.4 (The Birthday Principle). MIT OpenCourseWare 6.042J. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE220 — Discrete Computational Structures*. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe220/)
