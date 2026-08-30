---
article_id: article_b66ec8dc-ab87-4a3e-a513-10b6e7835522
title: "Yinelemeler ve Master Teoremi"
slug: yinelemeler-ve-master-teoremi
category: algorithms
level: advanced
reading_order: 18
summary: "Özyinelemeli algoritmaların maliyetini veren yineleme bağıntılarını çözmenin üç yolu: tahmin edip tümevarımla doğrulama ve üst sınır tuzağı, bağıntıyı açarak deseni yakalama, özyineleme ağacıyla seviye seviye toplama. Ardından bu işlerin çoğunu tek hamlede yapan Master Teoreminin üç durumu, teoremin uygulanamadığı yineleme biçimleri ve alt problem boyutunun ek işten neden daha belirleyici olduğu."
tags:
  - yineleme
  - master-teoremi
  - ozyineleme-agaci
  - bol-ve-yonet
  - analiz
content_hash: sha256:b125debc193827650f5b3642da66ec82cc1d679ace894b526b11c56c6a9f5d80
classification_version: 1
classification_batch: 5
---
## Özyinelemenin faturası

Özyinelemeli bir algoritmanın maliyetini yazmak kolaydır. Algoritma kendini çağırıyorsa, maliyeti de kendi cinsinden yazılır: bir alt problemin maliyeti çarpı kaç alt problem, artı bölme ve birleştirme için harcanan iş. Ortaya çıkan şeye **yineleme bağıntısı (recurrence)** denir.

Bu seride iki tanesini zaten yazdık ve ikisini de çözmeden bıraktık. Tümevarım makalesinde Hanoi kulelerinin hamle sayısı için T(n) = 2T(n − 1) + 1 bağıntısını kurduk. Sıralama makalesinde birleştirmeli sıralamanın T(n) = 2T(n/2) + Θ(n) bağıntısını yazdık ve çözümünü "özyineleme ağacıyla görülür" diyerek elle gösterdik. Önceki makale ölçüyü tanımladı; artık bu bağıntıları düzgün çözebiliriz.

Yineleme bir sayı dizisini **tanımlar** ama dizinin nasıl büyüdüğünü söylemez. "Yüzüncü terim kaç?" ya da "asimptotik büyüme sınıfı ne?" sorularının cevabı bağıntıya bakarak görülmez. Bu yüzden bir yinelemeyi **çözmek**, onu kapalı bir ifadeye — ya da algoritma analizi için çoğu zaman yeterli olan bir Θ sınıfına — dönüştürmek demektir.

Üç yöntem kuracağız, sonra bunların büyük kısmını tek hamlede yapan bir teoreme geçeceğiz. Yöntemler önce gelmeli, çünkü teorem her yinelemeye uygulanmaz ve uygulanmadığı yerde geriye elde kalan tek şey yöntemlerdir.

## Tahmin et ve tümevarımla doğrula

En basit yöntem, ilk birkaç terimi hesaplayıp bir desen yakalamak ve tahmini tümevarımla ispatlamaktır.

Hanoi bağıntısını alalım: T(1) = 1 ve n ≥ 2 için T(n) = 2T(n − 1) + 1. İlk terimler 1, 3, 7, 15, 31, 63. Desen açık: **T(n) = 2ⁿ − 1**.

Tahmin ettikten sonra ispat zorunludur. Taban durumu: T(1) = 1 = 2¹ − 1. Tümevarım adımı: T(n − 1) = 2ⁿ⁻¹ − 1 varsayımıyla

T(n) = 2T(n − 1) + 1 = 2(2ⁿ⁻¹ − 1) + 1 = 2ⁿ − 1.

Bitti. Tümevarım makalesinde kurduğumuz kalıbın yinelemelerle bu kadar iyi uyuşması tesadüf değildir: bağıntının ilk satırı taban durumuna, ikinci satırı tümevarım adımına birebir karşılık gelir. Sonucun somut hâli de etkileyicidir: 64 diskli klasik problemde T(64) = 2⁶⁴ − 1 = 18.446.744.073.709.551.615, yani yaklaşık 1,8 × 10¹⁹ hamle.

Şimdi bu yöntemin en öğretici tuzağına bakalım. Diyelim ki kapalı ifadeyi bulmakla uğraşmayıp daha "temiz" bir üst sınır ispatlamak istiyoruz: T(n) ≤ 2ⁿ. Aynı tümevarımı kuralım. Taban: T(1) = 1 ≤ 2. Adım: T(n − 1) ≤ 2ⁿ⁻¹ varsayımıyla

T(n) = 2T(n − 1) + 1 ≤ 2 · 2ⁿ⁻¹ + 1 = 2ⁿ + 1.

Ve tıkandık: elde ettiğimiz şey 2ⁿ + 1, ispatlamak istediğimiz ise 2ⁿ. Bir fazlalık, bütün ispatı bozdu. Dikkat çekici olan şudur: iddia **doğrudur** (T(n) = 2ⁿ − 1 ≤ 2ⁿ), ama tümevarım geçmiyor. Çözüm, hipotezi **güçlendirmektir**: T(n) ≤ 2ⁿ − 1 ile denersen adım tıkır tıkır yürür.

Bu, tümevarım makalesinde güçlü tümevarımı anlatırken karşılaştığımız olgunun aynısıdır: daha güçlü bir iddiayı ispatlamak bazen daha kolaydır, çünkü tümevarım hipotezi de o kadar güçlenir. Mülakatta tümevarım tıkandığında ilk refleks "hipotezi güçlendireyim mi?" olmalıdır.

## Açarak çözmek: deseni yakala

Tahmin yöntemi doğru tahmin etmeyi gerektirir. Bazı bağıntılarda ilk terimler hiçbir desen göstermez; o zaman bağıntıyı **açmak** gerekir: T(n)'yi bir önceki terim cinsinden yaz, sonra onu da aç, sonra onu da — ve sayılarda değil, **ifadelerde** desen ara.

Birleştirmeli sıralamayı bu yolla çözelim. Karşılaştırma sayısı için tam bağıntı şudur: T(1) = 0 ve n ikinin bir kuvveti olmak üzere T(n) = 2T(n/2) + n − 1. Buradaki n − 1, iki sıralı yarıyı birleştirirken yapılan en fazla karşılaştırma sayısıdır: her karşılaştırmadan sonra en az bir eleman çıktıya yazılır ve son eleman karşılaştırmasız yazılır, dolayısıyla n eleman için en fazla n − 1 karşılaştırma olur.

İlk terimler hiçbir şey söylemiyor: T(1) = 0, T(2) = 1, T(4) = 5, T(8) = 17, T(16) = 49. Şimdi açalım.

T(n) = 2T(n/2) + n − 1
= 4T(n/4) + (n − 2) + (n − 1)
= 8T(n/8) + (n − 4) + (n − 2) + (n − 1)
= 16T(n/16) + (n − 8) + (n − 4) + (n − 2) + (n − 1)

Desen görünüyor. k adım açtıktan sonra elimizde k tane n terimi ve bir geometrik toplam var:

T(n) = 2ᵏ · T(n/2ᵏ) + k·n − (2ᵏ − 1).

Son adım, k'yı tabana varacak şekilde seçmektir: k = log₂ n alırsak n/2ᵏ = 1 olur ve T(1) = 0 devreye girer:

**T(n) = n · log₂ n − n + 1.**

Sayıyla denetleyelim: n = 4 için 8 − 4 + 1 = 5 ✓, n = 8 için 24 − 8 + 1 = 17 ✓, n = 16 için 64 − 16 + 1 = 49 ✓, n = 1024 için 10.240 − 1.024 + 1 = 9.217 ✓. Baskın terim n log₂ n olduğu için sonuç Θ(n log n)'dir — sıralama makalesinde iddia ettiğimiz sınıf, artık ispatlı.

Kapalı ifadenin verdiği fazladan bilgiye de dikkat: birleştirmeli sıralama n log₂ n'den **daha az** karşılaştırma yapar, çünkü −n + 1 terimi negatiftir. Asimptotik sınıf bu bilgiyi atar; kapalı ifade tutar. n = 64 için toplam yalnızca 321 karşılaştırmadır.

## Özyineleme ağacı: seviye seviye topla

Açma yöntemi işe yarar ama cebirle uğraşmayı gerektirir. Üçüncü yöntem aynı işi **resim** üzerinden yapar ve tahtada anlatmaya en uygun olanıdır.

Genel bir böl-yönet yinelemesi düşün: T(n) = a·T(n/b) + g(n). Burada a alt problem sayısı, b küçülme çarpanı, g(n) ise bölme ve birleştirme için harcanan iş. Bunu bir ağaç olarak çiz: kök n boyutunda, her düğümün a çocuğu var ve her çocuk b kat küçük.

Üç şey doğrudan okunur. **Seviye i'de** aⁱ düğüm vardır ve her biri n/bⁱ boyutundadır, dolayısıyla o seviyedeki toplam iş aⁱ · g(n/bⁱ)'dir. **Derinlik** log_b n'dir, çünkü boyut her seviyede b kat küçülür ve 1'e inince durur. **Yaprak sayısı** a^(log_b n) = n^(log_b a)'dır.

Birleştirmeli sıralamada a = 2, b = 2, g(n) = n. Seviye i'deki iş 2ⁱ · (n/2ⁱ) = n — yani **her seviyede aynı**. Seviye sayısı log₂ n + 1 olduğu için toplam Θ(n log n) çıkar. Şekil 1 bunu gösteriyor.

![Yukarıdan aşağıya genişleyen bir özyineleme ağacı şeması. En üstte tek bir geniş kutu var ve içinde n yazıyor. Altında iki kutu, her biri yarı genişlikte ve içlerinde n bölü iki yazıyor. Onun altında dört kutu, her biri çeyrek genişlikte ve içlerinde n bölü dört yazıyor. Daha altta üç nokta ve en altta çok sayıda küçük kutudan oluşan bir yaprak sırası. Solda seviye etiketleri: seviye sıfır, seviye bir, seviye iki, ve en altta yapraklar. Sağda her seviyenin toplam işi yazıyor: iki üzeri sıfır çarpı n eşittir n, iki üzeri bir çarpı n bölü iki eşittir n, iki üzeri iki çarpı n bölü dört eşittir n, ve altında üç nokta. En sağ altta toplamın log iki n artı bir çarpı n olduğu ve bunun theta n log n ettiği yazıyor. En altta iki genel kural var: seviye i'de a üzeri i alt problem bulunur ve her biri n bölü b üzeri i boyutundadır; ağacın derinliği b tabanında log n, yaprak sayısı ise n üzeri b tabanında log a'dır](assets/ozyineleme-agaci.svg "Şekil 1 — Özyineleme ağacı: seviye başına iş, derinlik ve yaprak sayısı")

Asıl güç, seviye toplamlarının **hangi yönde gittiğine** bakmakta. g(n) = nᵈ biçimindeyse ardışık iki seviyenin toplamları arasındaki oran a/bᵈ'dir ve sabittir. Üç durum çıkar. Oran 1'den küçükse toplamlar geometrik azalır ve tüm toplam kökün sabit bir katıdır: **iş kökte birikir**. Oran 1'e eşitse her seviye aynı işi yapar ve toplam, seviye sayısıyla çarpılır: **iş eşit dağılır**. Oran 1'den büyükse toplamlar geometrik artar ve tüm toplam son seviyenin sabit bir katıdır: **iş yapraklarda birikir**.

İki örnek. T(n) = 2T(n/2) + n² için seviye i'deki iş 2ⁱ · (n/2ⁱ)² = n²/2ⁱ; oran 1/2, toplam 2n²'nin altında kalır, sonuç Θ(n²) — iş kökte. T(n) = 4T(n/2) + n için seviye i'deki iş 4ⁱ · (n/2ⁱ) = 2ⁱ · n; oran 2, toplam son seviyeye yakınsar ve n² mertebesine çıkar, sonuç Θ(n²) — bu sefer iş yapraklarda, üstelik kökteki işten mertebelerce fazla.

> **Sesli anlat:** "T(n) = 2T(n/2) + n yinelemesini tahtada nasıl çözersin? Doksan saniye."
>
> İyi bir cevabın omurgası: "Özyineleme ağacı çizerim. Kök n boyutunda ve n birim iş yapar. Altında iki düğüm var, her biri n/2 boyutunda ve toplam n birim iş yapıyor. Bir alt seviyede dört düğüm, her biri n/4, yine toplam n. Yani her seviyedeki toplam iş n'dir; bu, alt problem sayısının ikiye katlanmasıyla boyutun yarıya inmesinin birbirini götürmesindendir. Boyut her seviyede yarılandığı için derinlik log₂ n'dir; yaprak sayısı da n'dir. Toplam iş, seviye başına n çarpı log₂ n + 1 seviye, yani Θ(n log n). İstersen aynı sonucu bağıntıyı açarak da alırım: k adım açınca T(n) = 2ᵏT(n/2ᵏ) + kn − 2ᵏ + 1 çıkar ve k = log₂ n koyunca kapalı ifade n log₂ n − n + 1 olur. Bu, birleştirmeli sıralamanın en kötü durumdaki karşılaştırma sayısıdır."

## Master Teoremi

Böl-yönet yinelemelerinin çoğu aynı biçimde olduğu için üç durumu tek bir teoremde toplamak mümkündür. Bu teorem, CMPE300'ün resmî ders çıktılarında adıyla anılan araçtır.

**Master Teoremi.** T(n) = a·T(n/b) + g(n) biçimindeki bir yineleme için, n^(log_b a) ile g(n) karşılaştırılır:

- **Durum 1.** Bir ε > 0 için g(n) = O(n^(log_b a − ε)) ise, T(n) = Θ(n^(log_b a)).
- **Durum 2.** Bir k ≥ 0 için g(n) = Θ(n^(log_b a) · logᵏ n) ise, T(n) = Θ(n^(log_b a) · logᵏ⁺¹ n).
- **Durum 3.** Bir ε > 0 için g(n) = Ω(n^(log_b a + ε)) **ve** yeterince büyük n için bir c < 1 sabitiyle a · g(n/b) < c · g(n) ise, T(n) = Θ(g(n)).

Teoremi ezberlemek yerine ağaçla eşleştir: n^(log_b a) yaprak sayısıdır, g(n) ise kökteki iştir. Durum 1, yapraklardaki işin baskın olması; durum 3, kökteki işin baskın olması; durum 2, ikisinin dengede olmasıdır. Üçüncü durumdaki ek koşula **düzenlilik koşulu** denir ve "kökteki iş gerçekten baskın kalıyor mu, yoksa alt seviyelerde toparlanıyor mu?" sorusunu güvenceye alır.

"Polinomsal olarak küçük/büyük" ifadesindeki ε de önemlidir. g(n)'in yaprak sayısından küçük olması yetmez; **bir kuvvet kadar** küçük olması gerekir. Bu ayrıntı birazdan teoremin uygulanamadığı bir örnekte karşımıza çıkacak.

Şekil 2 üç durumu yan yana koyuyor.

![Yan yana üç küçük özyineleme ağacı silueti, her biri tepesi yukarıda bir üçgen olarak çizilmiş. Soldaki üçgende yalnızca en alttaki şerit koyu renkli ve altında iş yapraklarda birikiyor anlamına gelen bir etiket var; üstünde birinci durum başlığı, altında T(n) eşittir dört T(n bölü iki) artı theta n yinelemesi ve çözümünün theta n kare olduğu yazıyor. Ortadaki üçgende yukarıdan aşağıya beş yatay çizgi eşit kalınlıkta çizilmiş ve seviyelerin dengede olduğu belirtilmiş; üstünde ikinci durum başlığı, altında T(n) eşittir iki T(n bölü iki) artı theta n yinelemesi ve çözümünün theta n log n olduğu yazıyor. Sağdaki üçgende yalnızca tepe bölgesi koyu ve kökün baskın olduğu belirtilmiş; üstünde üçüncü durum başlığı, altında T(n) eşittir iki T(n bölü iki) artı theta n kare yinelemesi ve çözümünün theta n kare olduğu yazıyor. En altta iki satır: üç durumu ayıran ölçütün g(n) ile n üzeri b tabanında log a karşılaştırması olduğu ve üçüncü durumun ayrıca a çarpı g(n bölü b) küçüktür c çarpı g(n) düzenlilik koşulunu istediği belirtiliyor](assets/master-teoremi-uc-durum.svg "Şekil 2 — Master Teoreminin üç durumu: iş nerede birikiyor?")

Teoremi tanıdık yinelemelere uygulayalım.

| Yineleme | n^(log_b a) | g(n) | Durum | Çözüm |
|---|---|---|---|---|
| T(n) = T(n/2) + Θ(1) — ikili arama | n⁰ = 1 | Θ(1) | 2 (k = 0) | Θ(log n) |
| T(n) = 2T(n/2) + Θ(n) — birleştirmeli sıralama | n | Θ(n) | 2 (k = 0) | Θ(n log n) |
| T(n) = 2T(n/2) + Θ(n²) | n | Θ(n²) | 3 | Θ(n²) |
| T(n) = 4T(n/2) + Θ(n) | n² | Θ(n) | 1 | Θ(n²) |
| T(n) = 3T(n/2) + Θ(n) | n^1,585 | Θ(n) | 1 | Θ(n^log₂3) |

Üçüncü satırın düzenlilik koşulunu denetleyelim, çünkü mülakatta atlanan yer tam olarak orasıdır: a · g(n/b) = 2 · (n/2)² = n²/2 ve bu, c = 1/2 alınarak c · g(n)'e eşittir; c < 1 olduğu için koşul sağlanır.

İkinci ve üçüncü satırın karşılaştırması özellikle öğreticidir. İkisinde de a = 2 ve b = 2; yani aynı bölme yapısı. Fark yalnızca birleştirme maliyetinde ve sonuç Θ(n log n) ile Θ(n²) arasında değişiyor. Aynı fark gerçek bir algoritmada da görülür: iki yarının konveks kabuklarını birleştirirken bütün nokta çiftlerine bakan naif yöntem T(n) = 2T(n/2) + Θ(n²) verir ve Θ(n²) çıkar; iki parmakla ilerleyen doğrusal birleştirme T(n) = 2T(n/2) + Θ(n) verir ve Θ(n log n) çıkar. Böl-yönet algoritmalarında iyileştirme neredeyse her zaman **birleştirme adımındadır**.

> **Sesli anlat:** "Master Teoreminin üç durumunu ne belirler ve teoremi nasıl hatırlıyorsun? Doksan saniye."
>
> İyi bir cevabın omurgası: "Teorem T(n) = a·T(n/b) + g(n) biçimindeki yinelemeler içindir ve üç durumu ayıran tek ölçüt, kökte yapılan iş g(n) ile yaprak sayısı n^(log_b a)'nın karşılaştırılmasıdır. Ben özyineleme ağacından hatırlıyorum: g(n) yaprak sayısından polinomsal olarak küçükse iş yapraklarda birikir ve cevap Θ(n^(log_b a)) olur; ikisi aynı mertebedeyse her seviye eşit iş yapar ve cevaba bir logaritma çarpanı eklenir; g(n) polinomsal olarak büyükse iş kökte birikir ve cevap Θ(g(n)) olur. Üçüncü durumda ayrıca düzenlilik koşulunu denetlerim: a · g(n/b), g(n)'in sabit bir kesri kadar kalmalı. İki uyarı eklerim: 'küçük' ya da 'büyük' olmak yetmez, **polinomsal olarak** öyle olmalıdır; ve bağıntı bu biçimde değilse — alt problemler toplamsal küçülüyorsa ya da farklı boyutlardaysa — teorem uygulanmaz, tahmin edip tümevarımla doğrulamaya dönerim."

## Teoremin uygulanmadığı yerler

Master Teoremi bir tarif kitabıdır, evrensel bir çözücü değil. Üç tipik yerde susar.

**Bağıntı doğru biçimde değilse.** Hanoi bağıntısı T(n) = 2T(n − 1) + 1 böl-yönet biçiminde değildir: alt problem **çarpımsal** olarak değil, **toplamsal** olarak küçülüyor. Aynı şey T(n) = T(n − 1) + n için de geçerlidir; bunu açarak çözersin ve 1 + 2 + ⋯ + n = Θ(n²) elde edersin. Seçmeli ve eklemeli sıralamanın karesel çıkması bu bağıntıdandır.

**Alt problemler eşit boyutta değilse.** Doğrusal zamanlı medyan bulma algoritmasının maliyeti kabaca T(n) = T(n/5) + T(7n/10) + Θ(n) biçimindedir; iki farklı boyutta alt problem var, dolayısıyla a ve b diye tek bir çift yazılamaz. Burada tahmin-ve-doğrula yöntemine dönülür. Sezgi, alt problem boyutlarının toplamının n/5 + 7n/10 = 9n/10 olması, yani girdinin tamamından küçük kalmasıdır; bu, işin geometrik olarak azalacağını düşündürür. Tahmin: yeterince büyük bir c için T(n) ≤ c·n. Tümevarımda c·n/5 + 7c·n/10 + a·n = 9c·n/10 + a·n elde edilir ve bu, c ≥ 10a seçilirse c·n'i aşmaz. Doğrusal sonuç böyle ispatlanır.

**İki durum arasındaki boşluğa düşüyorsa.** T(n) = 2T(n/2) + n/log n yinelemesini dene. Yaprak sayısı n^(log₂2) = n. g(n) = n/log n, n'den küçüktür ama **polinomsal olarak** küçük değildir: hiçbir ε > 0 için n/log n = O(n^(1−ε)) olmaz, çünkü logaritma her kuvvetten yavaş büyür — önceki makaledeki lemma tam olarak burada iş görüyor. Durum 2 de uygulanmaz, çünkü orada k ≥ 0 isteniyor ve n/log n için k = −1 gerekirdi. Durum 3 zaten söz konusu değil. Teorem susar. Bu boşluğu kapatan genelleştirme **Akra-Bazzi formülüdür** ve bu yineleme için Θ(n log log n) verir.

Son olarak iki rahatlatıcı gerçek. Böl-yönet yinelemelerinin asimptotik çözümü **taban koşullarından bağımsızdır**: T(1)'in 0 mı 1 mi olduğu sonucu değiştirmez, çünkü en alttaki işin sabit bir katıyla çarpılması asimptotik sınıfı bozmaz. Ve çözüm **tabana yuvarlamalardan da bağımsızdır**: gerçek algoritmalarda alt problemler ⌈n/2⌉ ile ⌊n/2⌋ olur, bağıntıyı bu hâliyle tam çözmek zordur, ama asimptotik cevap değişmez. Bu yüzden yinelemeler yuvarlamasız yazılır; kaybedilen bir şey yoktur.

## Yineleme sezgisi: neyin önemli olduğu

Bütün bu hesapların ardından geriye kalan tek bir pratik kural var ve mülakatta bir yinelemeye bakar bakmaz cevabı kestirmeyi sağlar: **algoritmanın performansını, çağrı başına yapılan iş değil, alt problemlerin sayısı ve boyutu belirler.**

Hanoi ile birleştirmeli sıralamayı yan yana koy. Hanoi iki alt problem üretiyor ama her biri n − 1 boyutunda — yani neredeyse hiç küçülmüyor — buna karşılık çağrı başına yalnızca 1 birim iş yapıyor. Birleştirmeli sıralama da iki alt problem üretiyor ama her biri n/2 boyutunda, buna karşılık çağrı başına n − 1 birim iş yapıyor. Bağıntılar birbirine çok benziyor; sonuçlar benzemiyor. n = 64 için Hanoi 1,8 × 10¹⁹ hamle, birleştirmeli sıralama 321 karşılaştırma yapar.

Kural şu biçimde özetlenir: alt problem, girdiden **toplamsal** olarak küçükse (n − 1, n − 2 gibi) çözüm genellikle üsteldir; **çarpımsal** olarak küçükse (n/2, n/3 gibi) çözüm genellikle bir polinomla sınırlıdır.

Alt problem **sayısına** duyarlılık da yüksektir. T(n) = a·T(n/2) + n − 1 bağıntısında a'yı değiştir: a < 2 için çözüm Θ(n), a = 2 için Θ(n log n), a > 2 için Θ(n^(log₂ a)). Yani a 1,99'dan 2,01'e giderken çözümün **biçimi** iki kez değişir. Sayıyla görmek çarpıcıdır: girdiyi ikiye katladığında a = 1 için maliyet 2 katına, a = 2 için 2,1 katına, a = 3 için 3 katına çıkar.

## Mülakatta nasıl görünür

Özyinelemeli bir algoritma anlattıktan sonra gelen soru neredeyse her zaman aynıdır: "Maliyeti ne?" Doğru cevabın sırası sabittir. Önce bağıntıyı **yaz** — a kaç, b kaç, birleştirme kaça mal oluyor. Sonra çöz ve hangi yöntemi kullandığını söyle. Sonucu Θ ile ver, O ile değil; önceki makaledeki ayrım burada iş görüyor.

Master Teoremini kullanacaksan hangi durumda olduğunu ve **neden** o durumda olduğunu söyle. "Durum 2, çünkü g(n) tam olarak n^(log_b a) mertebesinde" cümlesi, teoremi ezberlemekle anlamak arasındaki farkı gösterir. Üçüncü durumda düzenlilik koşulunu denetlediğini de belirt.

Sık yapılan dört hata var. Master Teoremini biçime uymayan bir bağıntıya uygulamak — özellikle T(n) = T(n − 1) + … türü bağıntılara. Durum 1 ile 2 arasındaki "polinomsal olarak küçük" koşulunu atlamak. Derinlik ile yaprak sayısını karıştırmak: derinlik log_b n'dir, yaprak sayısı n^(log_b a); ikisi yalnızca özel durumlarda birbirine benzer. Ve tümevarım tıkandığında pes etmek; hipotezi güçlendirmek çoğu zaman tek yapılması gereken şeydir.

İngilizce karşılıklar hazır olmalıdır: *recurrence (relation)*, *closed form*, *base case*, *substitution method*, *recursion tree*, *master theorem*, *regularity condition*, *divide and conquer*, *subproblem*, *merge step*.

### Sırada ne var

Artık bir algoritmanın **ne kadar sürdüğünü** hesaplayabiliyoruz. Cevaplanmamış soru şu: doğru sonucu verdiğini nereden biliyoruz?

Bu seride doğruluğu şimdiye kadar hep tümevarımla savunduk ve bu, özyinelemeli algoritmalar için doğal bir araçtı: özyinelemenin yapısı tümevarımın yapısıyla birebir örtüşüyordu. Ama gerçek kodun büyük kısmı özyinelemeli değil, **döngülüdür**. Sıradaki makale, tümevarımın döngüler için giydiği kıyafeti kuruyor: **döngü değişmezi**. Üç adımı vardır — başlatma, koruma ve sonuçlanma — ve mantık makalesinde tanımladığımız boş doğruluk kavramı, başlatma adımının neden çoğu zaman bedava geldiğini açıklayacak. Eklemeli sıralamanın ve ikili aramanın doğruluğunu bu araçla, satır satır ispatlayacağız.

## Kaynakça

- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (ders notları), 21. bölüm (Recurrences) — 21.1 Hanoi kulelerinin T(n) = 2T(n − 1) + 1 bağıntısının tahmin-ve-doğrula ile çözülmesi (Sav 21.1.1) ve 21.1.1 "The Upper Bound Trap": T(n) ≤ 2ⁿ hipotezinin tümevarımda tıkanması; 21.1.2 açarak çözme yönteminin üç adımı; 21.2 birleştirmeli sıralamanın en fazla n − 1 karşılaştırmayla birleştirmesi, T(1) = 0, T(n) = 2T(n/2) + n − 1 bağıntısı, açılımdaki 2ᵏT(n/2ᵏ) + kn − 2ᵏ + 1 deseni ve n log n − n + 1 kapalı ifadesi; 21.4 böl-yönet yinelemelerinin genel biçimi; 21.4.1 Akra-Bazzi formülü; 21.4.2 taban koşullarının ve tabana yuvarlamaların asimptotik çözümü değiştirmemesi; 21.4.4 Teorem 21.4.2 Master Teoreminin üç durumu ve üçüncü durumdaki düzenlilik koşulu; 21.5 "A Feel for Recurrences": alt problem boyutunun çağrı başına işten daha belirleyici olması, toplamsal küçülmenin üstel ve çarpımsal küçülmenin polinomsal çözüm vermesi, T(n) = aT(n/2) + n − 1 bağıntısının a < 2, a = 2 ve a > 2 için üç farklı biçime girmesi. MIT OpenCourseWare 6.042J. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Demaine, E., Devadas, S. & Lynch, N. *6.046J Design and Analysis of Algorithms*, Lecture 2: Divide and Conquer — böl-yönet deseninin T(n) = aT(n/b) + [birleştirme işi] biçiminde yazılması (a ≥ 1, b > 1); konveks kabukta bütün nokta çiftlerine bakan naif birleştirmenin T(n) = 2T(n/2) + Θ(n²) = Θ(n²), iki parmaklı doğrusal birleştirmenin ise T(n) = 2T(n/2) + Θ(n) = Θ(n log n) vermesi; medyan bulmada beşli grupların medyanının seçilmesiyle çıkan eşit olmayan alt problemli bağıntı, "Master theorem does not apply" tespiti, n/5 + 7n/10 < n sezgisi ve T(n) ≤ c·n tahmininin tümevarımla ispatı. MIT OpenCourseWare, Bahar 2015. [Bağlantı](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/pages/lecture-notes/)
- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 3: Sorting — birleştirmeli sıralamanın özyineleme ağacının derinliği log₂ n olan tam bir ikili ağaç olması, n yaprak taşıması, seviye i'de 2ⁱ düğüm bulunması ve her düğümde O(n/2ⁱ) iş yapılması, toplamın Θ(n log n) çıkması. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 4. bölüm (Divide-and-Conquer — yerine koyma yöntemi, özyineleme ağaçları ve Master Teoremi). MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE300 — Analysis of Algorithms* (ders çıktıları "mathematical tools like interpolation, master theorem, etc. will be introduced" ifadesini içerir; bu makalenin resmî dayanağı odur). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe300/)
