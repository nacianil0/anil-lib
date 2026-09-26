---
article_id: article_325cc537-6231-4bb1-9cc0-8bae9daabe8c
title: "Olasılık ve İstatistik: Mülakat İçin Çekirdek"
slug: olasilik-ve-istatistik-mulakat-icin-cekirdek
category: supporting-fundamentals
level: advanced
reading_order: 36
summary: "Bu seri boyunca her maliyet iddiasını koşuluyla söylemeye çalıştık, ama bir koşulu hep erteledik: 'ortalama durum' dediğimizde hangi dağılımı varsaydığımızı hiç adlandırmadık. Bu makale o borcu ödüyor. Olasılık uzayı ve dört adımlı yöntemle başlıyor, koşullu olasılıkla devam ediyor ve nadir bir hastalık testinde pozitif çıkan birinin hasta olma olasılığının neden yüzde dokuz olduğunu hesaplıyor. Sonra beklenen değer geliyor ve asıl araç kuruluyor: beklentinin doğrusallığı bağımsızlık istemez. Üç eski borç bu araçla ödeniyor — doğum günü çakışması, hash tablosunun beklenen zincir uzunluğu ve rastgeleleştirilmiş seçimin doğrusal beklenen maliyeti. Son bölüm beklentinin neden yetmediğini gösteriyor: Markov ve Chebyshev eşitsizlikleri aynı soruya üç ayrı cevap veriyor. Bütün sayılar kendi programımla üretildi."
tags:
  - olasilik
  - beklenen-deger
  - bayes
  - chebyshev
  - istatistik
content_hash: sha256:6495a7136bcff6d1999b31ee435e86de4ef0dc1d4d18a6d65b9756c809650dd1
classification_version: 1
classification_batch: 11
revised_at: "2026-09-25"
revision_note: "Formüller sezgiyle katmanlandı: seri örneği ve Bayes adım adım hesaplandı, doğum günü çift sayımıyla, Markov ve Chebyshev tek cümlelik gerekçeyle anlatıldı."
---
## Ertelenen koşul

Bu serinin en çok tekrarlanan disiplini şuydu: bir iddiayı koşuluyla söyle. Hangi durum — en kötü mü, ortalama mı? Hangi model — karşılaştırma modeli mi, dış bellek mi? Ama "ortalama durum" dediğimiz her yerde sessizce bir şey daha varsaydık ve adını hiç koymadık: **bir dağılım.**

Karmaşıklık makalesinde "ortalama durum her zaman bir dağılım varsayımı taşır" dedik ve varsayımı adlandırmayı erteledik. Hash tablosunun sabit zamanı bir beklentiydi, hızlı sıralamanın ortalama durumu bir beklentiydi. Rastgeleleştirilmiş algoritmalar makalesinde daha ileri gidip "beklenti girdiden değil madenî paradan gelir" dedik — ama **beklenen değeri hiçbir yerde tanımlamadık.** Sayma makalesinde doğum günü çakışmasını güvercin yuvasıyla kesin olarak gösterdik ve "olasılık hâli sonra gelecek" diye not düştük.

Bu makale o borçların hepsini ödüyor ve tek bir işi var: bir maliyet iddiasını, hangi dağılım altında ve **ne kadar yoğunlaşmış** olduğunu söyleyerek savunabilmek. Resmî dayanak da yerinde — bölümün olasılık ve istatistik dersinin katalog tanımı tam olarak bu konuları sayıyor.

## Olasılık uzayı ve dört adımlı yöntem

Bir olasılık problemini çözmenin disiplinli yolu dört adımdır ve mülakatta panik anında tutunacak dal budur.

**Birinci adım: örneklem uzayını bul.** Deneyin bütün olası **sonuçlarının (outcomes)** kümesine **örneklem uzayı (sample space)** denir. **İkinci adım: ilgilendiğin olayı tanımla.** Bir **olay (event)** örneklem uzayının bir alt kümesidir — kümeler makalesinin dilinden hiç çıkmadık. **Üçüncü adım: sonuç olasılıklarını belirle.** Her sonuca negatif olmayan bir sayı atanır ve toplamları 1 eder. **Dördüncü adım: olayın olasılığını hesapla**, yani içindeki sonuçların olasılıklarını topla.

Sonlu ve **eşit olasılıklı** bir uzayda dördüncü adım sayma problemine indirgenir: P(A) = |A| / |S|. Sayma makalesinde kurduğumuz bütün araçlar — çarpma kuralı, kombinasyon, içerme-dışarma — burada doğrudan olasılık hesabına dönüşür. Olasılığın "yeni" tarafı, uzay eşit olasılıklı olmadığında başlar.

Küçük bir örnek yapalım, çünkü mülakat problemleri tam bu boyuttadır. Üç maçlık bir seride ilk maçı kazanma olasılığı 1/2; sonraki maçlarda takım bir önceki maçı kazandıysa 2/3, kaybettiyse 1/3 olasılıkla kazanıyor. İki maç kazanan seriyi alıyor. Örneklem uzayı altı sonuçtan oluşur: `KK`, `KMK`, `KMM`, `MKK`, `MKM`, `MM` — yani "seriyi kazan" olayı `{KK, KMK, MKK}`'dır. Her sonucun olasılığı, maçları sırayla oynatan bir ağaçta kökten yaprağa giden yol üzerindeki olasılıkların çarpımıdır:

```
KK  : 1/2 · 2/3        = 1/3   (6/18)
KMK : 1/2 · 1/3 · 1/3  = 1/18
MKK : 1/2 · 1/3 · 2/3  = 1/9   (2/18)
```

`KMK` satırını okuyalım: ilk maçı 1/2 ile kazanır, kazandıktan sonra ikinciyi 1/3 ile kaybeder, kaybettikten sonra üçüncüyü 1/3 ile kazanır. Toplam 6/18 + 1/18 + 2/18 = **1/2**. İki takım baştan simetrik olduğu için şaşırtıcı değil; ama hesabın dört adımı atlamadan yürüdüğünü görmek, asimetrik bir soruda da aynı yolu izleyebilmek demektir. Kurulum bir sonraki bölümün de örneği olacak.

## Koşullu olasılık ve Bayes

Bir bilgi geldiğinde olasılık güncellenir. `B` gerçekleştiği bilindiğinde `A`'nın olasılığına **koşullu olasılık (conditional probability)** denir:

```
P(A | B) = P(A ∩ B) / P(B),     P(B) > 0 olmak üzere
```

Tanım `P(B) = 0` iken tanımsızdır ve bu bir ayrıntı değildir: gerçekleşmemiş bir şeyin koşulunda konuşmak anlamsızdır.

İki sonuç hemen çıkar. **Toplam olasılık yasası**, `B` ve tümleyeni üzerinden `P(A) = P(A|B)P(B) + P(A|B̄)P(B̄)` der. **Bağımsızlık (independence)** ise `P(A ∩ B) = P(A)P(B)` eşitliğidir; denk olarak `P(A|B) = P(A)`, yani `B`'yi öğrenmek `A` hakkındaki bilgini değiştirmez. Bağımsızlık bir gözlem değil, bir **varsayımdır** ve mülakatta en sık atlanan yer burasıdır.

Önceki bölümün seri örneğine dönelim: takım ilk maçı kazandıysa seriyi kazanma olasılığı nedir? Tanımı doğrudan uygulayalım. `B` = "ilk maçı kazandı" olayı `{KK, KMK, KMM}`'dir ve olasılığı 1/2'dir. `A ∩ B` = "ilk maçı kazandı ve seriyi aldı" olayı `{KK, KMK}`'dir ve olasılığı az önceki tablodan 1/3 + 1/18 = 7/18'dir. Oran `(7/18) / (1/2) = 7/9 ≈ 0,778`. Aynı sayı ağaçtan da doğrudan okunur: ilk maç kazanıldıysa ikinciyi 2/3 ile kazanıp seri biter, 1/3 ile kaybeder ve üçüncüyü 1/3 ile kazanır; `2/3 + 1/3 × 1/3 = 7/9`. Koşullamak, örneklem uzayını `B`'ye daraltıp olasılıkları yeniden toplamı 1 edecek biçimde ölçeklemektir; formüldeki bölme tam olarak bu ölçeklemedir. Yani tek bir maçlık bilgi, olasılığı 1/2'den 7/9'a çıkarıyor. İki sayıyı da kesirli aritmetikle hesapladım ve dört yüz bin koşuluk bir benzetimle doğruladım (0,5007 ve 0,7776).

Şimdi klasik örneği yapalım, çünkü sezgiyi en sert kıran odur. Bir hastalık her bin kişiden birinde var. Test **duyarlı**: hastaysan yüzde 99 olasılıkla pozitif çıkıyorsun. Test **özgül**: sağlıklıysan yüzde 99 olasılıkla negatif çıkıyorsun. Testin pozitif çıktı. Hasta olma olasılığın nedir?

Yüz bin kişilik bir topluluk üzerinden saydım. Hasta olanlar 100 kişidir ve bunların 99'u pozitif çıkar. Sağlıklı olanlar 99.900 kişidir ve bunların yüzde 1'i, yani **999 kişi** yanlışlıkla pozitif çıkar. Pozitif çıkanların toplamı 1098; gerçekten hasta olanlar 99. Yani

```
P(hasta | pozitif) = 99 / 1098 = 0,0902 → yüzde 9,02
```

Bu sayım, **Bayes kuralının (Bayes' rule)** kendisidir. Koşullu olasılığın tanımını iki yönden yazarsan payları aynı olur, `P(hasta ∩ pozitif) = P(pozitif | hasta) · P(hasta)`, ve buradan

```
P(hasta | pozitif) = P(pozitif | hasta) · P(hasta) / P(pozitif)
```

çıkar. Paydadaki `P(pozitif)`'i toplam olasılık yasası verir. Sayılarla pay `0,99 × 0,001 = 0,00099` (yüz bin kişide 99 kişi), payda `0,00099 + 0,01 × 0,999 = 0,01098` (yüz bin kişide 1098 kişi). Formül ile sayım aynı hesaptır; mülakatta sayımla başlayıp formülü onun kısaltması olarak yazmak, formülü ezberden yazıp hangi terimin ne olduğunu karıştırmaktan daha güvenlidir.

Şekil 1 bu sayımı gösteriyor.

![Üstte bir ağaç, altta çerçeveli bir hesap kutusu var. Ağacın kökünde yüz bin kişi yazıyor; kökten çıkan iki dal hasta yüz ve sağlıklı doksan dokuz bin dokuz yüz yazan iki kutuya gidiyor. Hasta kutusundan çıkan iki dal pozitif doksan dokuz ve negatif bir yazan yapraklara varıyor; pozitif doksan dokuz yaprağı vurgulanmış, negatif bir yaprağı soluk. Sağlıklı kutusundan çıkan iki dal pozitif dokuz yüz doksan dokuz ve negatif doksan sekiz bin dokuz yüz bir yazan yapraklara varıyor; pozitif dokuz yüz doksan dokuz yaprağı da vurgulanmış ve sağında yanlış pozitif notu duruyor. Alttaki kutuda üç satır var: pozitif çıkanlar doksan dokuz artı dokuz yüz doksan dokuz eşittir bin doksan sekiz; P hasta koşulu pozitif eşittir doksan dokuz bölü bin doksan sekiz eşittir yüzde dokuz virgül sıfır iki; aynı test yaygınlık yüzde bir olsaydı yüzde elli, özgüllük yüzde doksan dokuz virgül dokuz olsaydı yüzde kırk dokuz virgül sekiz verirdi. Şemanın en altında iki satır: yanlış pozitifler gerçek pozitiflerden çok olduğu sürece pozitif bir test hasta olmak anlamına gelmez, belirleyici olan testin iyiliği değil taban oranıdır](assets/bayes-nadir-hastalik.svg "Şekil 1 — Aynı test, iki farklı soru: hastaya pozitif deme olasılığı %99, pozitif olanın hasta olma olasılığı %9")

Sayı sezgiye aykırı görünüyorsa nedeni şudur: hastalık nadir olduğu için **yanlış pozitiflerin sayısı gerçek pozitiflerin on katıdır.** İki karşılaştırma da hesapladım. Yaygınlık binde bir yerine yüzde bir olsaydı sonuç yüzde 50'ye çıkardı; yaygınlık aynı kalıp özgüllük yüzde 99,9'a çıksaydı yüzde 49,8 olurdu. Yani cevabı belirleyen tek başına testin iyiliği değil, **taban oranıdır.**

Mülakatta bu bir cümleye iner: `P(pozitif | hasta)` ile `P(hasta | pozitif)` aynı sayı değildir ve ikisini karıştırmak en bilinen olasılık hatasıdır.

> **Sesli anlat:** "Nadir bir hastalığın testi pozitif çıktı; hasta olma olasılığı nedir ve neden sezgiye aykırı? Doksan saniye."
>
> İyi bir cevabın omurgası: "Soru bir koşullu olasılık sorusudur ve karıştırılan iki şey vardır: testin duyarlılığı `P(pozitif | hasta)`'dır, sorulan ise `P(hasta | pozitif)`'tir. Tanım gereği `P(hasta | pozitif)`, hem hasta hem pozitif olma olasılığının pozitif olma olasılığına bölümüdür. Somut sayarak göstermek en hızlısıdır: yüz bin kişide yaygınlık binde birse yüz hasta vardır ve yüzde 99 duyarlılıkla bunların 99'u pozitif çıkar; geri kalan 99.900 sağlıklı kişinin yüzde 1'i, yani 999 kişi yanlış pozitif verir. Pozitiflerin toplamı 1098, gerçekten hasta olan 99, oran yüzde 9,02. Sezgiye aykırı görünmesinin nedeni taban oranıdır: hastalık nadir olduğu için yanlış pozitiflerin sayısı gerçek pozitifleri on kat aşar. Testi düzeltmek de çözer: özgüllüğü yüzde 99,9'a çıkarırsam aynı yaygınlıkta sonuç yüzde 49,8'e fırlar. Genel kural olarak, taban oranı düşükken pozitif bir sonuç ancak yanlış pozitif oranı taban oranıyla karşılaştırılabilir düzeye inerse bilgi taşır."

## Rastgele değişken ve beklenen değer

**Rastgele değişken (random variable)**, adının aksine ne rastgeledir ne değişkendir: örneklem uzayından sayılara giden bir **fonksiyondur**. Kümeler ve fonksiyonlar makalesindeki tanım burada olduğu gibi kullanılıyor; "iki zarın toplamı" her sonuca bir sayı atayan bir fonksiyondur.

**Beklenen değer (expected value)**, bu fonksiyonun olasılıklarla ağırlıklandırılmış ortalamasıdır:

```
E[R] = Σ R(ω) · P(ω)   (bütün sonuçlar üzerinden)
     = Σ x · P(R = x)  (bütün değerler üzerinden)
```

Özel ve çok işe yarar bir hâli var. Bir olay gerçekleştiğinde 1, gerçekleşmediğinde 0 değerini alan rastgele değişkene **gösterge rastgele değişkeni (indicator random variable)** denir ve beklentisi doğrudan olayın olasılığıdır: `E[I_A] = P(A)`.

Asıl araç şudur:

```
E[R₁ + R₂] = E[R₁] + E[R₂]
```

**Bu eşitlik bağımsızlık gerektirmez.** `R₁` ile `R₂` istedikleri kadar birbirine bağlı olsun; toplamın beklentisi yine beklentilerin toplamıdır. Bağımsızlıkla uğraşmak zor olduğu için **beklentinin doğrusallığı (linearity of expectation)** olasılığın en verimli aracıdır.

Kanonik örnek: bir davette `n` kişi şapkalarını vestiyere bırakıyor, çıkışta şapkalar karışıyor ve herkese rastgele bir şapka veriliyor. Kaç kişi kendi şapkasını alır? Dağılımı yazmak zordur, çünkü olaylar bağımlıdır — `n − 1` kişi kendi şapkasını aldıysa sonuncusu da kesinlikle kendininkini alır. Ama doğrusallık bunu umursamaz. `i`'inci kişi için bir gösterge tanımla; her birinin kendi şapkasını alma olasılığı `1/n`'dir, yani her göstergenin beklentisi `1/n`'dir; `n` tanesini topla ve sonuç **tam olarak 1** çıkar — `n` ne olursa olsun. Benzetimle doğruladım: `n` = 3, 5 ve 10 için iki yüz biner koşuda ortalama 0,999 civarında çıktı.

Aynı teknik veri yapıları makalesinin bıraktığı bir borcu ödüyor. `m` hücreli bir hash tablosuna `n` anahtar düzgün ve bağımsız dağılıyorsa, bir hücredeki **beklenen zincir uzunluğu** yük faktörünün kendisidir: `α = n/m`. Kanıtı yine göstergelerle iki satırdır. Belirli bir `j` hücresini sabitle ve `i`'inci anahtar o hücreye düşerse 1, düşmezse 0 olan `I_i` göstergesini tanımla; düzgün dağılım varsayımıyla `E[I_i] = 1/m`. Zincirin uzunluğu `L_j = I_1 + … + I_n` olduğu için doğrusallıkla `E[L_j] = n · 1/m = α`. Bu iki satırda bağımsızlık bile kullanılmadı; her anahtarın tek başına düzgün dağılması yetti. Benzetimde `α` = 0,5 için 0,497, `α` = 1 için 1,014, `α` = 2 için 1,972 ölçtüm. "Hash tablosu ortalamada sabit zamanlıdır" cümlesinin arkasındaki tek varsayım budur — ve düşman girdi tam olarak bu varsayımı bozar.

## Üç eski borç

**Doğum günü.** Sayma makalesinde güvercin yuvası ilkesiyle "366 kişide çakışma kesindir" demiş, "kaç kişide muhtemeldir?" sorusunu ertelemiştik. Sezgi az önce kurduğumuz araçtan geliyor: çakışmayı kişiler değil **çiftler** üretir. `n` kişide `n(n−1)/2` çift vardır ve her çiftin aynı günde doğmuş olma olasılığı `1/d`'dir. Her çift için bir gösterge tanımlayıp toplarsan beklenen çakışan çift sayısı `n(n−1)/(2d)` çıkar. Çift olayları ikişerli bağımsızdır ama karşılıklı bağımsız değildir: 1 ile 2 ve 1 ile 3 aynı gündeyse 2 ile 3 de aynı gündedir. Doğrusallık bunların hiçbirini istemez. `d` = 365 ve `n` = 23 için 253 çift ve beklenen 253/365 ≈ 0,69 çakışan çift vardır. Sezginin yanıldığı yer burasıdır: 23 kişi yılın küçük bir kesridir, ama 253 çift küçük bir sayı değildir.

Kesin hesap tümleyenden yapılır: `n` kişinin hepsinin farklı doğum günü olma olasılığı `d(d−1)…(d−n+1) / dⁿ`'dir — birinci kişi serbesttir, ikincisi kalan `d−1` günden birine, üçüncüsü kalan `d−2` günden birine düşmek zorundadır. Kesirli aritmetikle hesapladım: `n` = 23'te çakışma olasılığı **0,5073**, yani yarıyı geçen en küçük kişi sayısı 23'tür. Kaynak bu çarpımı `1 + x < eˣ` eşitsizliğiyle `e^(−n(n−1)/2d)` ile üstten sınırlar; üsteki sayı, az önce hesapladığımız beklenen çakışan çift sayısının ta kendisidir. Kaynağın pratik kuralı da buradan okunur: beklenen çift sayısı 1'e ulaştığında, yani yaklaşık `√(2d)` kişide, çakışma olasılığı kabaca `1 − 1/e ≈ 0,632` olur. `d` = 365 için `√730 ≈ 27` ve gerçek değeri **0,6269** buldum. (Kaynağın 95 kişi için verdiği "çakışmama olasılığı 1/200.000'den küçüktür" ifadesi de bu üst sınırdan gelir; tam değer 1/694.527'dir.)

Hash tablosuyla bağlantı doğrudandır ve kaynak da bu bağı kuruyor: `n` anahtarı `d` hücreye atarken beklenen çakışan çift sayısı yaklaşık `n²/(2d)`'dir, dolayısıyla `n`, `√d` mertebesine geldiğinde çakışma beklemek gerekir. Bir milyon hücreli bir tabloda bu eşik bin dört yüz civarında anahtardır. Güvercin yuvası "çakışma kaçınılmazdır" diyordu; olasılık "çok daha erken gelir" diyor.

**Rastgeleleştirilmiş seçim.** Rastgeleleştirilmiş algoritmalar makalesinde paranoyak hızlı sıralamanın beklenti analizini yapmış, seçim algoritmasınınkini açıkça borç bırakmıştık. Şimdi ödeyelim. Bir ekseni, ayırdığı iki parçanın ikisi de `3n/4`'ten küçükse **iyi** sayalım. Sıralamada ortada duran elemanların yarısı iyi eksendir, yani `P(iyi) ≥ 1/2`. İlk başarıya kadar geçen deneme sayısı **geometrik dağılıma** uyar ve beklentisi `1/p ≤ 2`'dir. Her deneme en fazla `c·n` iş yaptığına göre

```
E[T(n)] ≤ E[T(3n/4)] + 2cn
```

Bağıntıyı açtım: `2cn · (1 + 3/4 + (3/4)² + …) = 2cn · 4 = 8cn`, yani **Θ(n)**. Sıralamadan farklı olarak burada logaritmik çarpan yoktur, çünkü seçim her turda yalnızca **bir** parçaya iner. Sınırın gevşek olup olmadığını benzetimle ölçtüm; ölçtüğüm algoritma kötü ekseni yeniden denemeyen düz rastgele seçimdir. Rastgele bir `k` için `n` = 100'den 100.000'e kadar toplam incelenen öğe sayısı `n`'in yaklaşık **3 katı** çıktı, aranan medyan olduğunda yaklaşık 3,3 katı — ikisi de gevşek sınırın epey altında, ama aynı büyüme sınıfında.

Burada rastgeleleştirilmiş algoritmalar makalesinin ayrımı formalleşiyor: bu beklenti girdinin dağılımı hakkında **hiçbir şey** varsaymıyor. Her girdi için geçerlidir, çünkü rastgelelik algoritmanın kendi madenî parasındadır. Ortalama durum analizinden farkı tam olarak budur.

## Beklenti yetmez: ortalamadan sapma

"Beklenen maliyet doğrusaldır" cümlesini söylediğinde iyi bir mülakatçının ikinci sorusu hazırdır: **ne sıklıkla bundan çok saparsın?** Beklenti tek başına bunu söylemez.

En zayıf ama en az varsayım isteyen araç **Markov eşitsizliğidir**: negatif olmayan bir `R` ve her `a > 0` için

```
P(R ≥ a) ≤ E[R] / a
```

Yalnızca beklentiyi bilmek yeter. Neden doğru olduğu tek cümledir: `R ≥ a` olan sonuçların toplam olasılığı `P(R ≥ a)`'dır ve her birinde değer en az `a` olduğu için bu sonuçlar beklentiye en az `a · P(R ≥ a)` katkı verir; `R` negatif olmadığı için geri kalan sonuçlar bu katkıyı azaltamaz, yani `a · P(R ≥ a) ≤ E[R]`.

Daha iyisini istiyorsan ikinci bir sayı ödemelisin: **varyans**, `Var[R] = E[(R − E[R])²]`, yani değişkenin kendi ortalamasından uzaklığının karesinin ortalaması — ne kadar yayıldığının ölçüsü. Karekökü **standart sapmadır** ve değişkenle aynı birimdedir. Varyansı bilirsen her `a > 0` için **Chebyshev eşitsizliği** çalışır:

```
P(|R − E[R]| ≥ a) ≤ Var[R] / a²
```

Bu yeni bir fikir değildir: Markov'u `R`'ye değil, negatif olmayan `(R − E[R])²` değişkenine uygularsın. `|R − E[R]| ≥ a` olayı `(R − E[R])² ≥ a²` olayıyla aynıdır ve Markov bu olay için `E[(R − E[R])²] / a² = Var[R] / a²` sınırını verir.

Somut örnek: adil bir madenî parayı 100 kez atalım ve `X` tura sayısı olsun. Her atış, beklentisi 1/2 ve varyansı `1/2 · 1/2 = 1/4` olan bir Bernoulli değişkenidir; beklentiler her zaman, varyanslar ise atışlar bağımsız olduğu için toplanır. Böylece `E[X] = 50`, `Var[X] = 100 · 1/4 = 25`, `σ = 5`. `P(X ≥ 75)` nedir? Üç cevabı da hesapladım. Markov `50/75` = **0,667** diyor — yani neredeyse hiçbir şey söylemiyor. Chebyshev'i uygulamak için `X ≥ 75` olayının `|X − 50| ≥ 25` olayının içinde kaldığını görmek yeter; sınır `25/25²` = **0,04**, yaklaşık on yedi kat daha iyi (0,667 / 0,04 ≈ 16,7). Gerçek değer, binom olasılıklarını toplayarak bulunur: **2,8 × 10⁻⁷**. Şekil 2 üçünü aynı ölçekte gösteriyor.

![Logaritmik olasılık ekseninde üç işaret. X, 100 adil para atışında tura sayısı, beklentisi 50, standart sapması 5; sorulan, X'in en az 75 olma olasılığı. Eksen soldan sağa 1, 10 üzeri eksi 2, eksi 4, eksi 6 ve eksi 8 diye etiketli; her aralık yüz kat, sağa doğru olasılık küçülür. Markov sınırı 0,667 en solda, Chebyshev sınırı 0,04 biraz sağında, başka renkteki gerçek değer 2,8 çarpı 10 üzeri eksi 7 ise 10 üzeri eksi 6 ile eksi 8 arasında. Alttaki kutu: Markov yalnızca X'in negatif olmadığını ve beklentisini varsayar, Chebyshev varyansı da bilir, gerçek değer dağılımın tamamını, binom olduğunu bilir. Son satır: ne kadar çok varsayarsan sınır o kadar sıkı olur](assets/markov-chebyshev.svg "Şekil 2 — Aynı olasılık, üç cevap: sınırın sıkılığı varsayımın fiyatıdır")

Ders üç katmanlıdır. Markov hiçbir şey varsaymaz ve neredeyse hiçbir şey vermez. Chebyshev bir sayı daha ister ve çok daha iyisini verir. Gerçek değer ikisinden de çok küçüktür, çünkü `X` **bağımsız** değişkenlerin toplamıdır ve bağımsız toplamlar ortalamalarının çevresinde çok sert **yoğunlaşır (concentration)**. Mülakatta doğru cümle şudur: "beklenen maliyeti verebilirim, üstelik bağımsız katkıların toplamı olduğu için beklentiden uzağa düşme olasılığı da hızla küçülür."

Bu aynı zamanda rastgeleleştirilmiş algoritmalar makalesinin Monte Carlo/Las Vegas ayrımını tamamlıyor. Las Vegas algoritması hep doğru cevabı verir ve süresi bir rastgele değişkendir — sorulacak şey beklentisi ve yoğunlaşmasıdır. Monte Carlo algoritması sabit sürede biter ve **cevabı** bir rastgele değişkendir — sorulacak şey hata olasılığıdır ve tekrar ederek üstel olarak düşürülür.

> **Sesli anlat:** "Beklentinin doğrusallığı neden bu kadar güçlü ve beklentiyi bilmek neden yetmez? Doksan saniye."
>
> İyi bir cevabın omurgası: "Doğrusallık, toplamın beklentisinin beklentilerin toplamı olduğunu söyler ve kritik ayrıntı şudur: bağımsızlık gerektirmez. Bu yüzden zor problemleri gösterge değişkenlerine parçalayabiliriz — her olay için 1/0 değerli bir değişken tanımlarız, beklentisi doğrudan o olayın olasılığıdır ve toplarız. Şapka problemi kanonik örnektir: olaylar açıkça bağımlıdır, ama her kişinin kendi şapkasını alma olasılığı 1/n olduğu için beklenen sayı her n'de tam olarak 1 çıkar. Aynı teknik hash tablosunda beklenen zincir uzunluğunun yük faktörüne eşit olduğunu iki satırda verir. Ama beklenti tek başına bir dağılımı anlatmaz: aynı beklentiye sahip iki değişkenden biri hep ortalamasında durabilir, öteki uçlarda gezinebilir. Sapmayı sınırlamak için ikinci bir araç gerekir. Markov eşitsizliği yalnızca değişkenin negatif olmadığını ve beklentisini varsayar, karşılığında çok gevşek bir sınır verir; Chebyshev varyansı da ister ve belirgin biçimde sıkı bir sınır verir. Yüz para atışında P(X ≥ 75) için Markov 0,667, Chebyshev 0,04 verir; gerçek değer ise 2,8 çarpı on üzeri eksi yedi'dir, çünkü bağımsız toplamlar ortalamaları çevresinde çok sert yoğunlaşır. Yani doğru cevap beklentiyi vermek değil, beklentiyle birlikte yoğunlaşmayı da söylemektir."

## Dağılımların adını bilmek

Bir dağılımın adını bilmek, ona ait üç şeyi hazır almak demektir: beklenti, varyans ve kuyruk davranışı. Mülakatta derinlik değil, doğru eşleştirme beklenir.

**Bernoulli(p)** tek bir evet/hayır denemesidir; `E = p`, `Var = p(1−p)`. **Binom(n, p)** bağımsız `n` Bernoulli denemesindeki başarı sayısıdır; `E = np`, `Var = np(1−p)`. **Geometrik(p)** ilk başarıya kadar geçen deneme sayısıdır; `E = 1/p` — rastgeleleştirilmiş seçimde kullandığımız tam olarak buydu. **Düzgün dağılım** bütün sonuçları eşit olasılıklı sayar ve "ortalama durum" analizlerinin çoğunun sessiz varsayımıdır. **Poisson**, nadir olayların sabit bir aralıktaki sayısını modeller; **üstel dağılım** iki olay arasındaki bekleme süresini; **normal (Gauss) dağılım** ise çok sayıda bağımsız katkının toplamının limit biçimidir — Chebyshev'in gevşek kalmasının nedeni de budur.

İlk üçünü benzetimle doğruladım: Bernoulli(0,3) için dört yüz bin örnekte ortalama 0,2993; Geometrik(0,3) için kuramsal 3,333'e karşı ölçülen 3,333; Binom(20; 0,3) için kuramsal 6'ya karşı ölçülen 6,006.

## İstatistik: örnekten sonuca

Olasılık, dağılımı bilip sonucu tahmin etmektir. **İstatistik** ters yöndedir: sonuçları görüp dağılım hakkında konuşmaktır.

Temel kavramlar sırayla şöyle. Bir **örneklem (sample)**, popülasyondan çekilmiş sonlu bir gözlem kümesidir ve ondan hesaplanan her şey (ortalama, varyans) bir **örneklem istatistiğidir** — yani kendisi de bir rastgele değişkendir. **Nokta kestirimi** bilinmeyen bir parametre için tek bir sayı verir; **aralık kestirimi** bir aralık ve bir güven düzeyi verir. **Hipotez testi**, gözlenen farkın rastgelelikle açıklanıp açıklanamayacağını sorar.

Bu makalenin araçları burada doğrudan işe yarıyor. Bir örneklem ortalaması, `n` bağımsız gözlemin toplamının `n`'e bölümüdür; doğrusallık gereği beklentisi popülasyon ortalamasıdır ve varyansı `n` kat küçülür. Chebyshev eşitsizliği bunu bir güvene çevirir: örneklem büyüdükçe ortalamadan belirli bir uzaklığa düşme olasılığının üst sınırı `1/n` hızıyla azalır. "Kaç ölçüm yeter?" sorusunun cevabı tam olarak bu hesaptan çıkar.

Mülakatta ayırt edici tek bir incelik var ve kaynak da ayrı bir alt bölüm ayırıyor: **güven, olasılık değildir.** "Yüzde 95 güven aralığı", gerçek parametrenin o aralıkta olma olasılığının yüzde 95 olduğu anlamına gelmez; parametre sabittir, rastgele olan aralıktır. Doğru okuma şudur: bu **yöntem** tekrar tekrar uygulanırsa ürettiği aralıkların yüzde 95'i gerçek parametreyi içerir. Bu cümleyi doğru kurabilmek, konuyu ezberleyenle anlayanı ayırır.

## Mülakatta nasıl görünür

Zincir şöyle kurulur: **olasılık uzayı nedir → koşullu olasılık ve Bayes → beklenen değer ve doğrusallık → beklenti yetiyor mu → hangi dağılım.** Dördüncü halka en sık atlanandır.

Altı tipik hata var. **`P(A|B)` ile `P(B|A)`'yı karıştırmak** — nadir hastalık örneği bunun kanonik hâlidir ve taban oranı belirleyicidir. **Bağımsızlığı varsayım değil gözlem sanmak** — çarpım kuralı ancak bağımsızlık varsayıldığında geçerlidir ve gerçek sistemlerde bu varsayım çoğu zaman yanlıştır. **Doğrusallık için bağımsızlık aramak** — gerekmez; asıl güç buradan gelir. **Beklenen değeri "tipik değer" sanmak** — beklenti hiç gerçekleşmeyecek bir sayı olabilir. **Beklenen zaman ile ortalama durumu karıştırmak** — birincisi algoritmanın rastgeleliğinden, ikincisi girdinin dağılımından gelir. **Güven aralığını olasılık ifadesi sanmak** — rastgele olan aralıktır, parametre değil.

İngilizce karşılıklar hazır olmalıdır: *sample space*, *outcome*, *event*, *probability space*, *conditional probability*, *law of total probability*, *Bayes' rule*, *independence*, *base rate*, *random variable*, *distribution*, *expected value (expectation)*, *indicator random variable*, *linearity of expectation*, *variance*, *standard deviation*, *Markov's inequality*, *Chebyshev's inequality*, *concentration*, *Bernoulli*, *binomial*, *geometric*, *uniform*, *Poisson*, *exponential*, *normal (Gaussian)*, *sample statistic*, *point / interval estimation*, *confidence interval*, *hypothesis testing*.

### Sırada ne var

Bu makale bir maliyet iddiasını dağılımıyla savunmayı öğretti. Ama bütün maliyet hesaplarımız hâlâ bir soyutlamanın üstünde duruyor: karmaşıklık makalesinde kurduğumuz RAM modeli, her bellek erişiminin aynı fiyatta olduğunu varsayıyor — ve işletim sistemleri fazı boyunca bunun doğru olmadığını defalarca gördük.

Sıradaki makale o soyutlamanın altına iniyor: bellek hiyerarşisi, önbellekler, komut yürütme ve işletim sistemi kavramlarının donanım gerekçesi. Bağlam anahtarının neden çevrim cinsinden ucuzlamadığı, TLB'nin neden bir önbellek olduğu ve sayfa boyutunun iki yönlü takası orada cevabını bulacak.

## Kaynakça

- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (MIT 6.042J, Bahar 2015 baskısı), Bölüm 16: Events and Probability Spaces — **dört adımlı yöntem** (§16.2: örneklem uzayını bul, ilgilenilen olayı tanımla, sonuç olasılıklarını belirle, olay olasılıklarını hesapla); **doğum günü ilkesi** (§16.4): `d` günlük bir yılda `n` kişinin hepsinin farklı doğum günü olma olasılığının `d(d−1)…(d−(n−1))/dⁿ` olması, `1 + x < eˣ` eşitsizliğiyle elde edilen `e^(−n(n−1)/2d)` üst sınırı, 95 kişi ve 365 gün için bu sınırın 1/200.000'den küçük çıkması, `√(2d)` kişide çakışma olasılığının yaklaşık `1 − 1/e ≈ 0,632` olduğu pratik kuralı, `d = 365` için `√730 ≈ 27` ve yaklaştırmanın gerçek değere (≈ 0,626) yakınlığı; doğum günü eşleşmesinin **hash tablosuna rastgele eklenen öğeler arasındaki çakışmalar için iyi bir model** olduğu ve `n²`, `d`'nin küçük bir kesrini aşınca çok sayıda çakışma beklenmesi gerektiği; §16.5'te olasılık uzaylarının küme kuramıyla genel tanımı. MIT OpenCourseWare. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (MIT 6.042J, Bahar 2015 baskısı), Bölüm 17: Conditional Probability ve Bölüm 18: Random Variables — koşullu olasılığın tanımı ve notasyonu (§17.2) ile `P(Y) = 0` iken tanımsız olması; **koşullu olasılık için dört adımlı yöntem** (§17.3) ve ağaç diyagramının neden çalıştığı (§17.4); **toplam olasılık yasası** (§17.5); Simpson paradoksu (§17.6); **bağımsızlık** ve karşılıklı bağımsızlık (§17.7–17.8); rastgele değişken örnekleri ve dağılım fonksiyonları (§18.1–18.3); beklentinin tanımı (Definition 18.4.1) ve **gösterge rastgele değişkeninin beklentisinin olayın olasılığına eşit olması** (Lemma 18.4.2); **beklentinin doğrusallığı** (Theorem 18.5.1, Theorem 18.5.2, Corollary 18.5.3) ve birebir alıntı: "The great thing about linearity of expectation is that no independence is required"; iki zarın toplamının beklentisinin 7 olması (§18.5.1); **şapka denetimi problemi** (§18.5.2): göstergeler bağımsız olmadığı hâlde beklenen sayının her `n` için tam olarak 1 çıkması. MIT OpenCourseWare. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (MIT 6.042J, Bahar 2015 baskısı), Bölüm 19: Deviation from the Mean — **Markov teoremi** (§19.1), **Chebyshev teoremi** (§19.2), varyansın özellikleri (§19.3), rastgele örneklemeyle kestirim (§19.4), **güven ile olasılığın ayrımı** (§19.5), bağımsız rastgele değişkenlerin toplamlarının yoğunlaşması (§19.6–19.7). MIT OpenCourseWare. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı — bu makalenin algoritma tarafındaki ders kitabı karşılığı **5. bölüm (Probabilistic Analysis and Randomized Algorithms)** ile **9. bölüm (Medians and Order Statistics)**'tir; bölüm ve alt bölüm adları MIT Press'in kitap sayfasındaki resmî içindekiler belgesinden doğrulanmıştır (5.1 The hiring problem, 5.2 Indicator random variables, 5.3 Randomized algorithms, 5.4 Probabilistic analysis and further uses of indicator random variables; 9.1 Minimum and maximum, 9.2 Selection in expected linear time, 9.3 Selection in worst-case linear time). Kitabın gövdesi okunmadığı için buradaki hiçbir tanım ya da sayı bu kaynağa dayandırılmamıştır. MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Leiserson, C. E. & Demaine, E. *Design and Analysis of Algorithms* (MIT 6.046J, Bahar 2015), Ders 6: Randomization — "iyi eksen" tanımı (iki parçanın da `3n/4`'ten küçük olması), iyi eksen olasılığının 1/2'den büyük olması ve **beklenen deneme sayısının en fazla 2 olması**; buradan kurulan `T(n) ≤ T(n/4) + T(3n/4) + 2cn` bağıntısı ve Monte Carlo ile Las Vegas ayrımı. Bu makaledeki seçim çözümlemesi (tek parçaya inildiği için `E[T(n)] ≤ E[T(3n/4)] + 2cn` ve geometrik seri açılımıyla `8cn`) bu lemmadan **kendi türetmemdir** ve benzetimle ölçülmüştür. MIT OpenCourseWare. [Bağlantı](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE343 — Introduction to Probability and Statistics for Computer Engineers* — bu makalenin resmî dayanağı katalog tanımıdır: "Introduction to probability theory. Random variables, expectation, variance and moment generating functions. Distributions: Bernoulli, binomial, uniform, Gaussian, exponential, Poisson, gamma. Introduction to statistical concepts. Sampling and sample statistics. Point and interval estimation. Hypothesis testing. Regression." Sayfanın *Course Learning Outcomes* bölümü ayrıca olasılık kurallarını, **Bayes teoreminin kullanımını**, rastgele değişken kavramını, dağılımları ve örnekleme ile hipotez testi kavramlarını sayar. Ders önkoşulu MATH101'dir. Sayfa 2026-09-11'de doğrulanmıştır. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe343/)
