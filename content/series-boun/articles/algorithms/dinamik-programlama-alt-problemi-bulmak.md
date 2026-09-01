---
article_id: article_63de9671-33cd-403a-92e7-746b16585236
title: "Dinamik Programlama: Alt Problemi Bulmak"
slug: dinamik-programlama-alt-problemi-bulmak
category: algorithms
level: advanced
reading_order: 22
summary: "Böl ve yönetin çöktüğü yer ile açgözlünün çöktüğü yer aynı çözüme bakıyor: her alt problemi bir kez çöz ve sakla. Örtüşen alt problemlerin teşhisi, bellekleme ile tablolama ayrımı, altı adımlı alt problem reçetesi ve tablolama döngüsünün değişmezi; ağırlıklı aralık çizelgelemenin sayısal olarak çalışılmış DP çözümü, LCS ve 0/1 sırt çantası; dinamik programlamanın neden yalnızca optimal altyapı istediği ve sözde polinom tuzağı."
tags:
  - dinamik-programlama
  - bellekleme
  - ortusen-alt-problemler
  - sirt-cantasi
  - optimal-altyapi
content_hash: sha256:3a1a75948c3b91a4f9f841500bdf2e6b28459bdfab01897347fc9b8a8cdf599e
classification_version: 1
classification_batch: 7
---
## İki çöküşün tek nedeni

Son iki makale birer başarı hikâyesiyle bitmedi; ikisi de bir çöküşle bitti.

Böl ve yönet makalesinde naif Fibonacci özyinelemesini gördük: alt problemler **örtüştüğü** için aynı değer milyonlarca kez yeniden hesaplanıyordu. Açgözlü makalesinde ağırlıklı aralık çizelgelemeyi gördük: hiçbir basit seçim kuralı çalışmıyordu, çünkü bir isteği almak ile almamak arasındaki karar ancak **ikisinin de sonuçları hesaplandıktan sonra** verilebiliyordu.

Bu iki çöküş aynı çözüme bakıyor. Çözüm tek cümledir: **her alt problemi bir kez çöz ve cevabı sakla; aynı alt problem tekrar karşına çıktığında hesaplama, hatırla.** Desenin adı **dinamik programlamadır (dynamic programming, DP)**.

Adın kendisi bir kaza. Richard Bellman 1950'lerde bu yöntemi geliştirirken devlet fonu arıyordu ve "matematik yapmak" kulağa hoş gelmediği için havalı bir ad seçti; "programlama" burada bilgisayar programı değil, bir **plan ya da çizelge** anlamındadır, "dinamik" de o planın güncellenmesidir. Adın konuya dair hiçbir şey anlatmaması, kavramın kendisinin basit olduğunu gizlemesin.

Formal çerçeve şudur. Özyinelemeli bir algoritmanın çağrıları bir graf oluşturur: her alt problem bir düğüm, "A'yı hesaplamak için B gerekiyor" bir kenar. Algoritma sonlanıyorsa bu graf **döngüsüzdür**, yani bir DAG'dır — graf makalesinde tanıştığımız yönlü döngüsüz graf. Desenleri bu grafın şekli ayırır: böl ve yönette graf bir **ağaçtır** (her alt problem tek bir yerden çağrılır), dinamik programlamada bir **DAG'dır** (bir alt probleme birden çok yerden gelinir, yani giren derecesi 1'den büyüktür). Örtüşen alt problem, ağacın DAG'a dönüşmesidir.

## Örtüşmeyi teşhis etmek

Kanonik teşhis örneği hâlâ Fibonacci'dir. `fib(n)` naif olarak `fib(n−1) + fib(n−2)` diye yazılırsa çağrı sayısı tam olarak 2·F(n+1) − 1 olur. Bu formülü küçük bir betikle üç değerde denetledim: n = 6 için 25 çağrı, n = 10 için 177 çağrı, n = 30 için **2.692.537** çağrı. Oysa **farklı** alt problem sayısı yalnızca n + 1 tanedir: F(0), F(1), …, F(n). n = 30 için 31 farklı alt problem, 2,7 milyon çağrı. F(15) tek başına **987 kez** hesaplanıyor.

Teşhis refleksi şu iki soruyu yan yana sormaktır: **kaç farklı alt problem var** ve **kaç çağrı yapılıyor?** İkisi arasında büyük bir uçurum varsa örtüşme vardır ve dinamik programlama tam olarak o uçurumu kapatır. Şekil 1 aynı hesabı iki biçimde gösteriyor: solda naif ağaç, sağda tekrar eden düğümlerin tek düğüme indiği DAG.

![İki panelli bir şema. Üst panelin başlığı naif özyineleme ağacı; F beş için on beş çağrı ve aynı alt problemin defalarca hesaplanması. Kökte F beş var. Kökün çocukları F dört ve F üç. F dört düğümünün çocukları F üç ve F iki; bu F üç düğümünün çocukları F iki ve F bir, o F iki düğümünün çocukları da F bir ve F sıfır; F dördün ikinci çocuğu olan F iki düğümünün çocukları F bir ve F sıfır. Kökün ikinci çocuğu olan F üç düğümünün çocukları F iki ve F bir; o F iki düğümünün çocukları F bir ve F sıfır. Ağaçta toplam on beş düğüm var ve yapraklar soluk çizilmiş. Ağacın yanında F üç iki kez, F iki üç kez, F bir beş kez hesaplanıyor yazıyor; altında n eşittir otuz için iki milyon altı yüz doksan iki bin beş yüz otuz yedi çağrı ve otuz bir alt problem yazıyor. Alt panelin başlığı bellekleme sonrası: aynı hesap altı düğümlü bir DAG, alt problem başına sabit iş. Altı düğüm soldan sağa F sıfır, F bir, F iki, F üç, F dört, F beş diye dizilmiş; her düğümden bir sonrakine kısa bir ok, ayrıca bir sonrakinin sonrasına uzun bir ok gidiyor, yani her düğüme kendisinden önceki iki düğümden ok geliyor. Panelin solunda topolojik sıra artan i yazıyor](assets/fibonacci-agactan-daga.svg "Şekil 1 — Aynı hesap, iki şekil: örtüşen alt problemler ağacı DAG'a çökertiyor")

Bellekleyen sürüm iki satır fark eder:

```
1  fib(n)
2      memo = boş sözlük
3      F(i)
4          if i < 2 then return i              # taban durum
5          if i not in memo then               # bellekleme denetimi
6              memo[i] = F(i - 1) + F(i - 2)   # bağıntı
7          return memo[i]
8      return F(n)                             # özgün problem
```

Artık her alt problem bir kez çözülür, alt problem başına iş sabittir, toplam maliyet Θ(n) toplama olur. Küçük bir dürüstlük notu: Fibonacci sayıları Θ(n) bit uzunluğundadır ve sözcük boyutu w olan bir makinede her toplama O(⌈n/w⌉) sürer, yani gerçek maliyet O(n + n²/w)'dir. RAM modelinin "her aritmetik işlem sabit" varsayımı burada yalan söylüyor; karmaşıklık makalesinde kurduğumuz "n nedir?" disiplini bunu yakalar.

## Bellekleme ile tablolama

Aynı fikrin iki yüzü var ve mülakatta ikisinin adı da beklenir.

**Yukarıdan aşağı bellekleme (top-down, memoization).** Özyinelemeyi olduğu gibi bırak, üstüne bir hafıza koy. Yukarıdaki kod budur. Sloganı **"özyinele ama yeniden kullan"**.

**Aşağıdan yukarı tablolama (bottom-up, tabulation).** Özyinelemeyi tamamen at, alt problemleri **topolojik sırada** bir döngüyle doldur. Sloganı **"dikkatli kaba kuvvet"** — bütün alt problemleri çözersin ama her birini bir kez.

```
1  fib(n)
2      F[0] = 0;  F[1] = 1                     # taban durumlar
3      for i = 2 to n                          # topolojik sıra
4          F[i] = F[i - 1] + F[i - 2]          # bağıntı
5      return F[n]                             # özgün problem
```

Hangisi ne zaman? Ayrım pratikte üç noktada belirir. Birincisi **erişilebilirlik**: bellekleme yalnızca gerçekten ihtiyaç duyulan alt problemleri çözer, tablolama hepsini çözer. Alt problem uzayı büyük ama seyrek kullanılıyorsa bellekleme kazanır: A = (3, 4, 3, 1) sayılarından 6 toplamı elde edilip edilemeyeceğini soran küçük bir **altküme toplamı (subset sum)** probleminde tablolama 35 hücrenin tamamını doldururken, bellekleme yalnızca erişilebilen **15** durumu çözer — bunu kendi kodumla saydım. İkincisi **yığın derinliği**: bellekleme özyinelemedir, çağrı yığını alt problem sayısı kadar derinleşebilir; n büyükse taşar. Üçüncüsü **sabitler**: tablolama bir dizi üzerinde döngüdür, sözlük araması ve çağrı yükü taşımaz; aynı asimptotik maliyette ölçülebilir biçimde hızlıdır.

Tablolamanın gizli bir borcu var ve bu borç doğruluk makalesinin aracıyla ödenir. Döngünün değişmezi şudur: *"i'inci yinelemenin başında, topolojik sırada i'den önce gelen bütün alt problemler doğru çözülmüştür."* Başlatma adımı taban durumlarla gelir; koruma adımı, bağıntının **yalnızca daha önce çözülmüş** alt problemlere baktığını kullanır; sonuçlanma adımı, döngü bittiğinde özgün problemin de çözülmüş olduğunu verir. Koruma adımının çalışması için döngü sırasının bir **topolojik sıra** olması zorunludur — graf makalesindeki DAG bilgisi burada bir doğruluk şartına dönüşüyor. Sıra yanlışsa bağıntı henüz doldurulmamış bir hücreyi okur ve değişmez daha ilk adımda kırılır.

> **Sesli anlat:** "Bellekleme ile tablolama arasındaki farkı ve hangisini ne zaman seçeceğini anlat. Altmış saniye."
>
> İyi bir cevabın omurgası: "İkisi de aynı alt problem kümesini bir kez çözer, fark yalnızca ziyaret sırasındadır. Bellekleme yukarıdan aşağıdır: özyinelemeyi bırakırım, bir hafıza sözlüğü eklerim, bir alt problem sorulunca önce hafızaya bakarım. Avantajı, yalnızca gerçekten erişilen alt problemleri çözmesidir; dezavantajı çağrı yığını derinliği ve sözlük yüküdür. Tablolama aşağıdan yukarıdır: alt problemleri topolojik sırada bir döngüyle doldururum. Avantajı düşük sabitler ve yığın kullanmaması; dezavantajı erişilmeyecek alt problemleri de çözmesidir. Tablolamanın doğruluğunu döngü değişmeziyle savunurum: her adımın başında topolojik sırada önceki bütün hücreler doğrudur, bağıntı yalnızca onlara baktığı için koruma sağlanır. Alt problem uzayı seyrek kullanılıyorsa bellekleme, yoğunsa ve derinlik riskliyse tablolama seçerim."

## Altı adımlık reçete

Asıl zorluk kodda değil, **alt problemi bulmakta**. Doğruluk makalesinde "uygun bir değişmezi keşfetmek ispatın zor kısmıdır" demiştik; dinamik programlamada tam olarak aynı zorluk, alt problem tanımını bulmak olarak geri geliyor. 6.006 dersinin bu iş için altı adımlık bir çerçevesi var ve mülakat tahtasında bu altı satırı sırayla yazmak, cevabı yapılandırmanın en hızlı yoludur.

1. **Alt problem tanımı.** Alt problemin ne anlama geldiğini **kelimelerle**, parametreleri üzerinden yaz. Sık kullanılan kalıplar: bir dizinin önekleri, son ekleri, bitişik alt dizileri; birden çok girdinin çarpımı; ya da yardımcı bir değişkenle taşınan kısmi durum.
2. **Bağıntı.** Alt problem çözümünü daha küçük alt problem çözümleri cinsinden yaz. Yöntem sabittir: alt problem hakkında **bir soru** sor — cevabını bilseydin problem küçülürdü — ve o sorunun bütün olası cevaplarını **yerel olarak kaba kuvvetle** dene, en iyisini al.
3. **Topolojik sıra.** Bağıntının döngüsüz olduğunu ve alt problemlerin bir DAG oluşturduğunu gerekçelendir.
4. **Taban durumlar.** Bağıntının bozulduğu, bağımsız alt problemlerin çözümlerini ver.
5. **Özgün problem.** Aranan cevabın hangi alt problemden ya da hangi alt problemlerin birleşiminden okunacağını göster. Yalnızca sayıyı değil çözümün kendisini de istiyorsan **ebeveyn işaretçisi** tut.
6. **Süre analizi.** Alt problem sayısı × alt problem başına **özyinelemesiz** iş. Özyinelemeli çağrılar sabit sayılır; onların maliyeti kendi alt problemlerinin satırında zaten sayılmıştır.

İkinci adımdaki "bir soru sor" fikri, desenin bütün gücünü taşır. Verimlilik için o sorunun **az sayıda** olası cevabı olmalıdır; cevap sayısı üstelse kaba kuvvete geri düşersin.

## Ağırlıklı aralık çizelgeleme

Şimdi açgözlü makalesinin kapanışında verilen sözü ödeyelim. Problem aynıydı: tek bir kaynak, n istek, her isteğin başlangıç zamanı s(i) ve bitiş zamanı f(i). Tek fark, her isteğin bir **w(i) ağırlığı** olması ve toplam ağırlığı en büyük yapan bağdaşan altkümeyi istememiz.

Somut bir örnek üzerinden gidelim. Beş toplantı isteği var; parantez içindeki sayı isteğin değeri:

| İstek | Saat | Değer |
|---|---|---|
| A | 09–11 | 4 |
| B | 11–13 | 8 |
| C | 12–15 | 11 |
| D | 13–15 | 5 |
| E | 13–17 | 10 |

Açgözlü makalesinde **ispatladığımız** kural "en erken biteni seç"ti. Burada A, B, D seçilir ve toplam **17** eder. En büyük değerliden başlayan kural C'yi alır, sonra yalnızca A sığar: **15**. Zaman birimi başına en çok değer veren kural yine A, B, D verir: **17**. En kısa süreni seçen kural da aynı üçlüyü verir: **17**. Optimal ise **22**'dir ve A + B + E'dir. Bu dört sonucu ve optimalin tekliğini kaba kuvvetle bütün altkümeler üzerinde denetledim.

Açgözlü neden çöktü? Çünkü **açgözlü seçim özelliği** kayboldu: en erken biten isteği içeren bir optimal çözüm olduğu artık doğru değil. Ama **optimal altyapı** duruyor — ve dinamik programlama zaten yalnızca onu ister. Bu ayrım, önceki makalenin ayırdığı iki iddianın tam olarak işe yaradığı yerdir.

Alt problemi kuralım. İstekleri bitiş zamanına göre sıralayalım (yukarıdaki tablo zaten sıralı). Her j isteği için **p(j)** = j'den önce biten ve j ile bağdaşan **en son** istek olsun; yoksa 0 yazalım. Alt problem tanımı: **OPT(j) = ilk j istek arasından seçilebilecek en büyük toplam ağırlık.** Bağıntı, tek bir sorunun kaba kuvvetle denenmesidir — *j'inci istek çözümde var mı?*

- Varsa: w(j) kazanılır ve j ile çakışan bütün istekler elenir, geriye OPT(p(j)) kalır.
- Yoksa: geriye OPT(j − 1) kalır.

Yani **OPT(j) = max{ w(j) + OPT(p(j)), OPT(j − 1) }**, taban durum OPT(0) = 0. Topolojik sıra artan j'dir, çünkü hem p(j) hem j − 1 kesin olarak j'den küçüktür. Özgün problem OPT(n)'dir.

Tabloyu elle dolduralım. p değerleri sırasıyla p(A) = 0, p(B) = A, p(C) = A, p(D) = B, p(E) = B'dir — örneğin C 12'de başlar, A 11'de bittiği için bağdaşır, B 13'te bittiği için bağdaşmaz.

- OPT(A) = max(4 + 0, 0) = **4**
- OPT(B) = max(8 + OPT(A) = 12, 4) = **12** — B'yi almak kazandırıyor
- OPT(C) = max(11 + OPT(A) = 15, 12) = **15** — C'yi almak hâlâ kazandırıyor
- OPT(D) = max(5 + OPT(B) = 17, 15) = **17**
- OPT(E) = max(10 + OPT(B) = 22, 17) = **22** — E'yi almak D'yi almaktan iyi

Sonuç 22'dir ve ebeveyn işaretçilerini geri yürüterek çözüm kümesi {A, B, E} olarak okunur. Şekil 2 istekleri, p değerlerini ve tablonun hücre hücre dolmasını birlikte gösteriyor. Dikkat: son iki satırda D ile E'nin **aynı** p değeri var (ikisi de B'den sonra başlıyor) ama E daha ağır; açgözlünün göremediği şey tam olarak buydu.

![İki bölümlü bir şema. Üstte dokuzdan on yediye kadar saatlerin işaretlendiği bir zaman ekseni ve beş yatay çubuk var: A dokuzdan on bire değer dört, B on birden on üçe değer sekiz, C on ikiden on beşe değer on bir, D on üçten on beşe değer beş, E on üçten on yediye değer on. A, B ve E çubukları vurgulanmış, C ile D soluk; üstteki başlıkta koyu olanların optimal çözüm olduğu ve A artı B artı E toplamının yirmi iki ettiği yazıyor. Çubukların altında en erken biteni seç kuralının A artı B artı D ile on yedi, en değerliyi seç kuralının A artı C ile on beş verdiği yazıyor. Altta bir DP tablosu var; tablonun üstünde bağıntının OPT j eşittir w j artı OPT p j ile OPT j eksi birin büyüğü olduğu yazılı. Tablonun sütunları j, istek, saat, p j, al sütunu w j artı OPT p j, alma sütunu OPT j eksi bir ve son sütun OPT j. Satırlar sırasıyla şöyle: bir, A, dokuz on bir, p yok, dört artı sıfır eşittir dört, sıfır, OPT dört; iki, B, on bir on üç, p bir, sekiz artı dört eşittir on iki, dört, OPT on iki; üç, C, on iki on beş, p bir, on bir artı dört eşittir on beş, on iki, OPT on beş; dört, D, on üç on beş, p iki, beş artı on iki eşittir on yedi, on beş, OPT on yedi; beş, E, on üç on yedi, p iki, on artı on iki eşittir yirmi iki, on yedi, OPT yirmi iki. Son sütundaki her vurgulu hücreden iki ok çıkıyor: kısa ok bir üstteki satırın OPT hücresine, uzun ok p j satırının OPT hücresine gidiyor. En altta not: her hücre yalnızca daha önce dolmuş iki hücreye bakar, bu yüzden artan j bir topolojik sıradır](assets/agirlikli-aralik-dp-tablosu.svg "Şekil 2 — Ağırlıklı aralık çizelgeleme: tek bir sorunun kaba kuvvetle denenmesi bir tabloya dönüşüyor")

Maliyet: n alt problem, alt problem başına sabit iş — ama p(j) değerlerini de hesaplamak gerekiyor. Naif olarak her j için geriye bakmak Θ(n²) verir; bitiş zamanları zaten sıralı olduğu için her p(j) ikili aramayla bulunabilir ve toplam **O(n log n)**'e iner. Sıralama da zaten O(n log n)'dir.

## İki klasik: LCS ve 0/1 sırt çantası

**En uzun ortak alt dizi (longest common subsequence, LCS).** İki dizgi verilir; ikisinin de alt dizisi olan (bitişik olmak zorunda değil) en uzun diziyi arıyoruz. Alt problem: x(i, j) = A'nın i'inci karakterinden itibaren gelen son ek ile B'nin j'inci karakterinden itibaren gelen son ekin en uzun ortak alt dizisinin uzunluğu. Sorulacak soru: *ilk karakterler eşleşiyor mu?*

- Eşleşiyorsa, o çifti kullanan bir en uzun ortak alt dizi vardır: x(i, j) = x(i+1, j+1) + 1.
- Eşleşmiyorsa ikisi birden içeride olamaz; hangisinin dışarıda kaldığını kaba kuvvetle dene: x(i, j) = max{ x(i+1, j), x(i, j+1) }.

Taban durum, dizgilerden biri bittiğinde 0'dır; topolojik sıra azalan i + j'dir; maliyet |A|·|B| alt problem × sabit iş = **Θ(|A|·|B|)**. Ders notlarının örneğini kendi kodumla doğruladım: `hieroglyphology` ile `michaelangelo` dizgilerinin en uzun ortak alt dizisi **5** uzunluğundadır ve `hello`, `heglo`, `iello`, `ieglo` dördü de geçerli çözümdür — 195 hücrelik bir tablo, dört farklı optimal cevap. Optimal çözüm tek değildir; DP onlardan birini bulur.

**0/1 sırt çantası.** Açgözlünün çöktüğü üçüncü yerdi: kapasitesi 50 olan çantaya, (ağırlık, değer) değerleri (10, 60), (20, 100) ve (30, 120) olan üç eşyadan seçim yapıyoruz. Oran sırasıyla dolduran açgözlü kural 160'ta kalıyordu, optimal 220'ydi. Alt problem: x(i, c) = i'inci eşyadan itibaren kalanlarla ve c kapasiteyle elde edilebilecek en büyük değer. Soru: *i'inci eşyayı alıyor muyum?*

x(i, c) = max{ x(i+1, c), v(i) + x(i+1, c − w(i)) } — ikinci seçenek yalnızca c ≥ w(i) ise. Taban durum x(n, c) = 0; topolojik sıra azalan i. Alt problem sayısı (n + 1)(C + 1) = 204, alt problem başına sabit iş. Tabloyu doldurup 220 çıktığını ve seçilen eşyaların ikinci ile üçüncü olduğunu bağımsız olarak denetledim; kaba kuvvet de aynı sonucu veriyor.

Burada bir tuzak var ve mülakatta güzel bir takip sorusudur. **O(nC) polinom zaman mıdır?** Girdi n + 1 sayıdan oluşur; C sayısı girdide **bir sayı** olarak durur ve ⌈lg C⌉ bitle yazılır. C = 2⁶⁴ ise tablo 2⁶⁴ sütunludur. Yani O(nC), girdi **boyutunda** değil, girdi **değerlerinde** polinomdur; bunun adı **sözde polinom (pseudopolynomial)** zamandır. Sayma sıralaması ve radix sıralaması da aynı ailedendir: karmaşıklık makalesinde "girdi boyutu sayı mı basamak mı?" diye açtığımız pin tam olarak buraya çıkıyor. Sırt çantası problemi sözde polinom zamanda çözülebilir, ama gerçek polinom zamanda çözülüp çözülemeyeceği açık bir sorudur — o tartışma hesaplamanın sınırları makalesine ait.

> **Sesli anlat:** "Bir problemin dinamik programlamaya uygun olduğunu nereden anlarsın — hangi iki özelliği ararsın? Doksan saniye."
>
> İyi bir cevabın omurgası: "İki özellik ararım. Birincisi **optimal altyapı**: bir optimal çözümün içindeki alt problem çözümleri de kendi alt problemleri için optimaldir; bunu kes-yapıştır argümanıyla ispatlarım — daha iyi bir alt çözüm olsaydı yerine koyup bütünü iyileştirirdim. İkincisi **örtüşen alt problemler**: aynı alt problem özyineleme ağacında defalarca görünür, yani alt problem bağımlılık grafı ağaç değil DAG'dır. Bunu teşhis etmek için farklı alt problem sayısıyla çağrı sayısını karşılaştırırım; Fibonacci'de otuz için otuz bir alt probleme karşılık iki buçuk milyondan fazla çağrı vardır. Açgözlü de optimal altyapı ister ama **fazladan** açgözlü seçim özelliğini de ister; DP onu istemez, bu yüzden daha geniş bir problem sınıfını çözer ama karşılığında daha pahalıdır. Alt problem uzayı büyükse maliyeti alt problem sayısı çarpı alt problem başına iş olarak savunurum."

## Mülakatta nasıl görünür

Dinamik programlama sorusu tahtaya gelince beklenen sıra sabittir: alt problemi **kelimelerle** tanımla, bağıntıyı bir soruyu kaba kuvvetle deneyerek kur, topolojik sırayı gerekçelendir, taban durumları ver, özgün problemi göster, maliyeti alt problem sayısı × alt problem başına iş olarak hesapla. Altı satır, altı cümle.

Beş tipik hata var. **Alt problemi parametresiz tanımlamak** — "alt problem, dizinin geri kalanı" bir tanım değildir; hangi parametrenin hangi aralıkta değiştiğini söylemek gerekir. **Topolojik sırayı savunmamak** — sıra bir DAG sırası değilse tablolama boş hücre okur. **Alt problem sayısını yanlış saymak** — iki parametreli bir alt problem uzayında maliyet çarpımdır, toplam değil. **Bellekleme denetimini unutmak** — hafızayı yazıp okumayı unutan kod hâlâ üsteldir ve bu, mülakatta en sık görülen sessiz hatadır. **Sözde polinomu polinom sanmak** — O(nC) girdi boyutunda polinom değildir.

Bir de kavram karışıklığı var: dinamik programlama ile açgözlüyü ayırt edememek. Ayrım tek cümledir: **açgözlü seçer, DP hatırlar.** Açgözlü her adımda bir seçim yapar ve dönmez, bunun için açgözlü seçim özelliğine ihtiyaç duyar; DP bütün seçenekleri hesaplar ve en iyisini saklar, bunun için yalnızca optimal altyapıya ihtiyaç duyar. Bir problemde açgözlü çalışıyorsa DP de çalışır ama gereksiz yere pahalıdır; açgözlü çalışmıyorsa geriye DP kalır.

İngilizce karşılıklar hazır olmalıdır: *dynamic programming*, *memoization*, *tabulation*, *overlapping subproblems*, *optimal substructure*, *subproblem*, *topological order*, *base case*, *parent pointer*, *longest common subsequence*, *0/1 knapsack*, *pseudopolynomial*.

### Sırada ne var

Bu makalede alt problem grafının bir DAG olduğunu ve tablolamanın o DAG üzerinde topolojik sırada yürüdüğünü gördük. Sıradaki makalede aynı fikri tersinden okuyacağız: **DAG'ın kendisi bir graf olduğunda**, en kısa yol hesabı doğrudan bir dinamik programa dönüşür. Bellman-Ford algoritması, alt problemi "en fazla k kenar kullanarak s'ten v'ye en ucuz yol" diye tanımlayan bir DP'den başka bir şey değildir.

Graf algoritmaları makalesi iki klasik problemi kuruyor: bütün düğümleri en ucuza bağlayan **minimum kapsayan ağaç** ve tek bir kaynaktan herkese giden **en kısa yollar ağacı**. İkisi aynı grafta **farklı** ağaçlar üretir ve bu fark, mülakatın en sevdiği karşı sezgilerden biridir. Heap makalesinin ödenmemiş `azalt_anahtar` borcu da orada kapanacak: hem Prim hem Dijkstra o işlemin üzerine kuruludur.

## Kaynakça

- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 15: Recursive Algorithms — özyinelemeli çağrıların bir bağımlılık grafı oluşturduğu ve sonlanan bir algoritmada bu grafın döngüsüz olduğu; desenlerin graf şekline göre sınıflandırılması (kaba kuvvet: yıldız, azalt-yönet: zincir, böl-yönet: ağaç, **dinamik programlama: DAG**); dinamik programlamanın "alt problem bağımlılıkları örtüşürse, yani giren derece 1'den büyükse" tanımı; "recurse but re-use" (yukarıdan aşağı) ile "careful brute force" (aşağıdan yukarı) sloganları; adın Richard Bellman tarafından, devlet fonu alabilmek için matematik yaptığını gizleyen "havalı bir ad" olarak konması ve "dynamic" ile "program" sözcüklerinin plan/çizelge güncelleme anlamı; naif Fibonacci'nin T(n) = Ω(2^(n/2)) maliyeti ve F(k) alt probleminin birden çok kez hesaplanması; belleklemeli ve tablolamalı iki Fibonacci kodu; Fibonacci sayılarının Θ(n) bit uzunluğundan gelen O(n + n²/w) düzeltmesi; **SRT BOT** altı adımlı çerçevesi (alt problem tanımı, bağıntı, topolojik sıra, taban durumlar, özgün problem, süre analizi) ve her adımın açıklaması; bağıntı kurmanın "bir soru sor, cevaplarını yerel olarak kaba kuvvetle dene" yöntemi ve verimlilik için cevap sayısının polinom olması gerektiği; optimal altyapının bir dipnotta "özyinelemenin özelliği, yalnızca dinamik programlamanın değil" diye kaydedilmesi. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 16: Dynamic Programming Subproblems — LCS'in SRT BOT ile tam çözümü (alt problem son ekler üzerinde x(i, j); ilk karakterler eşleşirse x(i+1, j+1) + 1, eşleşmezse max{x(i+1, j), x(i, j+1)}; taban durum bir dizgi bittiğinde 0; topolojik sıra azalan i + j; maliyet O(|A|·|B|)) ve `hieroglyphology`/`michaelangelo` örneğinde `hello`, `heglo`, `iello`, `ieglo` çözümleri; LIS'te doğal alt problemin yetmemesi ve **alt problem kısıtlaması/genişletmesi** tekniği; alt problem sayısı ile bağıntının dallanması arasındaki takas. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 18: Pseudopolynomial — çubuk kesme probleminde birim uzunluk başına en değerli parçayı seçen açgözlü kuralın optimal olmaması; altküme toplamı probleminin alt problemi x(i, t) ve O(nT) maliyeti; yukarıdan aşağı çözümün yalnızca **erişilebilir** alt problemleri çözmesi; **sözde polinom** tanımı ("çalışma süresi girdi boyutunda ve girdi sayılarında sabit dereceli bir polinomla sınırlı") ve güçlü polinom ile arasındaki fark; sayma sıralaması, radix sıralaması ve Fibonacci'nin de sözde polinom olması; sırt çantası probleminin çubuk kesme ile altküme toplamını genellediği ve yalnızca sözde polinom olduğu; altküme toplamının sayılar polinomla sınırlı değilken polinom zamanda çözülüp çözülemeyeceğinin P ≠ NP sorusuna bağlanması. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Demaine, E., Devadas, S. & Lynch, N. *6.046J Design and Analysis of Algorithms*, Lecture 1: Introduction — ağırlıklı aralık çizelgelemede "açgözlü algoritma artık çalışmaz" tespiti ve dinamik programlamaya geçiş; alt problem tanımının bir kesim noktasıyla kurulması (R_x = {j ∈ R | s(j) ≥ x}), bağıntının opt(R) = max(w(i) + opt(R_{f(i)})) biçimi, n alt problem ve O(n²) toplam sürenin O(n log n)'e indirilebilmesi. MIT OpenCourseWare, Bahar 2015. [Bağlantı](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/pages/lecture-notes/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 14. bölüm (Dynamic Programming) — dinamik programlamanın genel çerçevesi, optimal altyapı ile örtüşen alt problemlerin iki koşul olarak ayrılması, yukarıdan aşağı bellekleme ile aşağıdan yukarı tablolamanın karşılaştırılması ve klasik örnekler. Bölüm adı ve numarası, MIT Press'in yayımladığı resmî *Selected Solutions* belgesinin içindekiler tablosundan doğrulandı. MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE300 — Analysis of Algorithms* (ders çıktıları "basic classes of algorithms (comparison-based, recursive, divide-and-conquer, dynamic, greedy, numerical, graph)" ifadesini içerir; bu makalenin resmî dayanağı odur). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe300/)
