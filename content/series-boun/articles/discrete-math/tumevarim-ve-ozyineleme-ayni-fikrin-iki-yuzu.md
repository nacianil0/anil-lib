---
article_id: article_83074b17-3164-47fc-9bac-0073f002be24
title: "Tümevarım ve Özyineleme: Aynı Fikrin İki Yüzü"
slug: tumevarim-ve-ozyineleme-ayni-fikrin-iki-yuzu
category: discrete-math
level: intermediate
reading_order: 4
summary: "Sonsuz aileler hakkındaki iddiaların aracını kurar: zayıf ve güçlü tümevarım, iyi sıralama ilkesi ve bunların özyinelemeli tanımlarla ilişkisi; çalışılmış ispatlar, klasik bir hatalı tümevarım ve özyinelemeli algoritmaların doğruluk savunmasıyla."
tags:
  - tumevarim
  - guclu-tumevarim
  - iyi-siralama
  - ozyineleme
  - yapisal-tumevarim
content_hash: sha256:7edbf51080837ab7f0d4a724b3fc860a5063ebaf474c90ca9c357ecfbf1dce17
classification_version: 1
classification_batch: 1
---
## Sonsuz aileler hakkındaki iddialar

Önceki makalede öğrendiğin teknikler tek seferde biten argümanlardı: hipotezi aç, tanımı kullan, sonuca yürü. Ama mühendislikte karşılaştığın iddiaların çoğu tek bir nesne hakkında değil, **sonsuz bir aile** hakkındadır. "Her n için bu formül doğrudur." "Her girdi boyutu için bu algoritma doğru sonucu verir." "Her ağaçta bu özellik sağlanır."

Böyle bir aileyi tek tek ispatlayamazsın; ömrün yetmez. Bunun yerine, aileyi kuran **yapıyı** kullanırsın: doğal sayılar 0'dan başlayıp birer birer ilerler, listeler daha kısa listelerden kurulur, ağaçlar daha küçük ağaçlardan. Bu makalenin konusu, o yapıyı ispat aracına çeviren fikirdir: **tümevarım (mathematical induction)**.

Aynı fikrin ikinci yüzü **özyineleme (recursion)**'dir. Bir mülakatta "bu özyinelemeli fonksiyonun doğru çalıştığını nasıl bilirsin?" sorusunu duyduğunda vermen gereken cevap tümevarımdır — ve bu tesadüf değil, tanım gereği böyledir. Makalenin sonunda bunun neden zorunlu olduğunu göreceksin.

## Tümevarımın anatomisi

Elinde her n doğal sayısı için tanımlı bir yüklem olsun: P(n). Tümevarım ilkesi şunu söyler:

Eğer **(a)** P(0) doğruysa ve **(b)** her n için "P(n) doğruysa P(n + 1) de doğrudur" önermesi doğruysa, o hâlde P(n) her doğal sayı için doğrudur.

İkinci makalenin diliyle yazarsak ispatlaman gereken iki şey vardır: P(0) ve ∀n (P(n) → P(n + 1)). Bunların birincisine **taban durumu (base case)**, ikincisine **tümevarım adımı (inductive step)** denir. Adımın içinde doğru varsaydığın P(n) önermesi ise **tümevarım hipotezi (induction hypothesis)** adını alır.

Klasik sezgi merdivendir: taban durumu ilk basamağa çıkabildiğini, tümevarım adımı ise herhangi bir basamaktan bir sonrakine geçebildiğini gösterir. İkisi birlikte bütün basamaklara çıkabildiğin anlamına gelir.

Taban her zaman sıfır olmak zorunda değildir. Tabanı bir k tam sayısında kurup adımı n ≥ k için ispatlarsan, elde ettiğin sonuç "her n ≥ k için P(n)" olur; bu, ilkenin geçerli bir varyantıdır ve aşağıdaki örneklerin çoğunda taban 1'dir.

Şekil 1 bu merdiveni özyinelemenin yanına koyuyor. Dikkat et: iki sütun aynı zinciri gösteriyor, yalnızca oklar ters yönde. Tümevarım tabandan yukarı doğru **ispatlar**, özyineleme tepeden aşağı doğru **hesaplar**.

![Solda tümevarım merdiveni: taban durumu P(1)'den başlayıp her adımda bir üst basamağa geçen yukarı yönlü oklar. Sağda özyineleme açılımı: f(4) çağrısının f(3), f(2) ve taban durum f(1)'e inen aşağı yönlü oklar. İki sütun aynı zinciri ters yönlerde kat eder](assets/tumevarim-merdiveni-ozyineleme-acilimi.svg "Şekil 1 — Aynı zincirin iki yönü: tümevarım yukarı ispatlar, özyineleme aşağı hesaplar")

Tümevarım hipotezinin kafa karıştıran yanı şudur: P(n)'i "doğru varsaymak", ispatlamak istediğin şeyi varsaymak gibi görünür. Değildir. İspatladığın şey P(n)'in kendisi değil, P(n) → P(n + 1) **koşullu önermesidir**; ikinci makaledeki doğruluk tablosundan hatırla, koşullu önermeyi ispatlamanın yolu hipotezi varsayıp sonuca yürümektir. Mülakatta bu itiraz gelirse cevabın tek cümledir: "P(n)'i mutlak olarak varsaymıyorum; bir koşullu önermenin hipotezi olarak varsayıyorum."

## Çalışılmış örnek: ilk n sayının toplamı

**İddia.** Her n ≥ 1 tam sayısı için 1 + 2 + ⋯ + n = n(n + 1) / 2.

**Strateji.** P(n)'i açıkça yaz, n = 1'de doğrula, sonra n + 1 durumunda toplamın son terimini ayırıp tümevarım hipotezini yerine koy.

**Taban durumu.** n = 1 için sol taraf 1, sağ taraf 1 · 2 / 2 = 1. Eşitlik sağlanıyor.

**Tümevarım adımı.** Bir n ≥ 1 için P(n)'in doğru olduğunu varsayalım; yani 1 + 2 + ⋯ + n = n(n + 1) / 2 olsun. n + 1 durumunu yazalım:

1 + 2 + ⋯ + n + (n + 1) = [n(n + 1) / 2] + (n + 1).

Sağ tarafta (n + 1) parantezine ayıralım:

[n(n + 1) / 2] + (n + 1) = (n + 1) · [n / 2 + 1] = (n + 1)(n + 2) / 2.

Bu tam olarak P(n + 1)'in sağ tarafıdır. Adım tamamlandı, dolayısıyla iddia her n ≥ 1 için doğrudur.

**Savunma.** İspatın kritik cümlesi, hipotezin **nerede kullanıldığıdır**: köşeli parantezli ifadeyi yazdığım anda. Bir tümevarım ispatını okurken ilk aranacak şey budur; hipotez hiç kullanılmamışsa ya ispat yanlıştır ya da iddia tümevarım gerektirmiyordur. Mülakatta "hipotezi nerede kullandın?" sorusu tam olarak bunu yoklar ve parmağını o satıra koyabilmek beklenir.

Bir sayısal kontrol de yapalım: n = 100 için formül 100 · 101 / 2 = 5.050 verir. Kontrol ispatın parçası değil, yalnızca hata avıdır — bu ayrımı önceki makaleden hatırla.

İkinci bir örnek, bölünebilirlik tarafından: her n ≥ 1 için n³ − n ifadesi 3'e bölünür. Taban durumda 1³ − 1 = 0 ve sıfır 3'e bölünür. Adımda (n + 1)³ − (n + 1) ifadesini açarsan n³ + 3n² + 3n + 1 − n − 1 = (n³ − n) + 3(n² + n) elde edersin; ilk parantez hipotez gereği 3'e bölünür, ikinci terim zaten 3'ün katıdır, toplam da 3'e bölünür. Kalıp aynı: **n + 1 durumunu, içinde n durumu görünecek biçimde yeniden yaz.**

## Nerede kırılır: eksik taban, kopuk halka

Tümevarım mekanik göründüğü için hataları da mekanik olur ve mülakatçılar bu hataları bilir.

Birinci hata **taban durumunu atlamaktır** ve klasik gösterimi şudur: P(n) yüklemi "n = n + 1" olsun. Tümevarım adımı kusursuz yürür — n = n + 1 varsayıp iki tarafa 1 eklersen n + 1 = n + 2 elde edersin, yani P(n + 1) — ama iddia açıkça yanlıştır, çünkü P(0) sağlanmaz. Yürüyen bir adım, tabanı olmayan bir merdivendir ve hiçbir şey ispatlamaz.

İkinci hata daha sinsidir: adımın **bazı n değerleri için geçerli olmaması**. MIT'nin *Mathematics for Computer Science* ders notlarında bunun klasik örneği verilir (5.1.6, "A Faulty Induction Proof"): "her n atlık kümede bütün atlar aynı renktedir" iddiası tümevarımla "ispatlanır". Taban durumu doğrudur; tek atlık bir kümede bütün atlar aynı renktedir. Adımda n + 1 atlık kümenin ilk n atı ve son n atı ayrı ayrı ele alınır; her iki alt küme hipotez gereği tek renktir ve **ortak atlar üzerinden** birleştirilir.

Argüman n = 1 için çöker: iki atlık bir kümede "ilk 1 at" ile "son 1 at" kümelerinin ortak elemanı yoktur, dolayısıyla renkleri birbirine bağlayacak köprü de yoktur. P(1) → P(2) halkası kopuktur; zincirin geri kalanı doğru olsa bile hiçbir şey taşımaz.

Buradan çıkan pratik kural: tümevarım adımını yazdıktan sonra **en küçük değerde tek tek çalıştır**. Adım "n ≥ 1 için" diyorsa n = 1'i somut olarak dene. Kopuk halka hep oradadır.

> **Sesli anlat:** "Tümevarım adımında tümevarım hipotezini varsaymak, ispatlanacak şeyi varsaymak değil midir?" itirazını altmış saniyede karşıla.
>
> İyi bir cevabın omurgası: "Hayır, çünkü ispatladığım önerme P(n) değil, 'P(n) doğruysa P(n + 1) de doğrudur' koşullusudur. Koşullu bir önermeyi ispatlamanın standart yolu hipotezi varsayıp sonuca yürümektir; burada da onu yapıyorum. P(n)'in kendisini taban durumundan başlayan zincir üretir. Zaten hipotezi mutlak doğru saysaydım taban durumuna hiç ihtiyacım olmazdı — ve tabansız bir tümevarım yanlış iddiaları da 'ispatlar'."

## Güçlü tümevarım

Bazen n + 1 durumunu kurmak için yalnızca n durumu yetmez; daha küçük **birden çok** duruma ihtiyaç duyarsın. **Güçlü tümevarım (strong induction)** tam olarak buna izin verir: adımda P(n)'i değil, "n'den küçük bütün değerler için P doğrudur" ifadesini varsayarsın.

Şekil 2 üç yaklaşımın hipotez kapsamını yan yana koyuyor: zayıf tümevarım tek bir önceki basamağı, güçlü tümevarım bütün önceki basamakları kullanır, iyi sıralama ilkesi ise en küçük karşı örnek üzerinden çelişki üretir.

![Üç panelli karşılaştırma: zayıf tümevarımda n+1 durumunu yalnızca n durumu besler; güçlü tümevarımda taban ile n arasındaki bütün durumlar besler; iyi sıralama ilkesinde en küçük karşı örnek seçilip daha küçük bir karşı örnek üretilerek çelişkiye varılır](assets/zayif-guclu-tumevarim-iyi-siralama.svg "Şekil 2 — Hipotezin kapsamı: zayıf tümevarım, güçlü tümevarım, iyi sıralama")

**İddia.** 1'den büyük her tam sayı, asal sayıların çarpımı olarak yazılabilir.

**Strateji.** n'nin asal olup olmamasına göre durum ayrımı yap; asal değilse onu iki **daha küçük** çarpana böl ve her ikisine hipotezi uygula. Tek bir önceki durum bu iş için yetersizdir, çünkü çarpanların n − 1 olacağının hiçbir garantisi yoktur.

**Taban durumu.** n = 2 asaldır; tek terimli bir çarpım olarak kendisi bir asal çarpanlara ayrılıştır.

**Tümevarım adımı.** n > 2 olsun ve 2 ile n − 1 arasındaki bütün sayıların asal çarpanlara ayrılabildiğini varsayalım. İki durum var. n asalsa iş bitmiştir. n asal değilse, tanım gereği n = a · b olacak biçimde 1 < a ve 1 < b koşullarını sağlayan tam sayılar vardır; her ikisi de n'den küçüktür. Hipotez a ve b için geçerlidir, yani ikisi de asal çarpımı olarak yazılabilir. Bu iki çarpımı yan yana koymak n'nin asal çarpanlara ayrılışını verir.

**Savunma.** Bu ispat zayıf tümevarımla doğrudan kurulamaz, çünkü a ve b'nin n − 1 olacağını söyleyemezsin; ihtiyacın olan şey "n'den küçük **her** değer". Mülakatta "neden güçlü tümevarım kullandın?" sorusunun cevabı da tam olarak budur: parçalama adımının kaç birim geriye atladığını kontrol edemiyorsan güçlü tümevarım gerekir.

İkinci bir örnek, aynı deseni daha somut gösteriyor: 8'den büyük veya eşit her tam sayı, 3'lerin ve 5'lerin toplamı olarak yazılabilir. Taban durumları üç tanedir: 8 = 3 + 5, 9 = 3 + 3 + 3, 10 = 5 + 5. Adımda n ≥ 11 için n − 3 sayısına bakılır; bu sayı 8'den büyük veya eşittir, hipotez gereği yazılabilir, üzerine bir 3 eklemek n'yi verir. Burada üç taban durumunun olması tesadüf değil: adım üç birim geriye atladığı için merdivenin ilk üç basamağının elle kurulması gerekir.

Zayıf ve güçlü tümevarım **güç bakımından denktir**; biriyle ispatlanabilen her şey diğeriyle de ispatlanabilir. Aralarındaki fark yalnızca kolaylıktır, tıpkı önceki makaledeki üç ispat tekniği gibi.

## İyi sıralama ilkesi

Üçüncü yüz şudur: doğal sayıların boş olmayan her alt kümesinin bir **en küçük elemanı vardır**. Buna **iyi sıralama ilkesi (well ordering principle)** denir ve tümevarımla denktir.

Kullanımı çelişkiyle ispatın bir kalıbıdır: iddianın yanlış olduğunu varsay, karşı örneklerin kümesini kur, iyi sıralama ile **en küçük karşı örneği** al ve ondan daha küçük bir karşı örnek üreterek çelişkiye var. Aynı asal çarpanlara ayırma teoremi MIT ders notlarında (Teorem 2.3.1) tam olarak böyle ispatlanır: en küçük ayrıştırılamayan sayı ne asal olabilir ne de bileşik, çünkü bileşikse çarpanları daha küçüktür ve en küçüklük varsayımıyla çelişir.

Üçünü bir arada tutan cümle şudur: **tümevarım, güçlü tümevarım ve iyi sıralama aynı gerçeğin üç sunumudur** — doğal sayılarda sonsuza kadar geriye gidilemez. Mülakatta bu cümleyi söyleyebilmek, üç tekniği ayrı ezberlemiş olmaktan daha güçlü bir sinyaldir.

## Özyineleme: aynı fikrin ikinci yüzü

**Özyinelemeli tanım (recursive definition)** iki parçadan oluşur: bir veya birkaç **taban durumu** ve daha küçük durumlara başvuran bir **özyineleme kuralı**. Faktöriyel bunun en sade örneğidir: 0! = 1 ve n! = n · (n − 1)!. Fibonacci sayıları iki taban durumu ister: F(0) = 0, F(1) = 1 ve F(n) = F(n − 1) + F(n − 2).

Yapı tanıdık gelmeli: özyinelemeli tanımın taban durumu tümevarımın taban durumudur, özyineleme kuralı da tümevarım adımıdır. Bu yüzden **özyinelemeli olarak tanımlanmış bir nesne hakkındaki iddia neredeyse her zaman tümevarımla ispatlanır**; başka bir araç aramak gereksizdir.

Somut bir örnek üzerinde yürütelim. Hanoi kuleleri probleminde n diski bir çubuktan diğerine taşıyan standart özyinelemeli çözüm şu adımlardan oluşur: üstteki n − 1 diski ara çubuğa taşı, en büyük diski hedefe koy, n − 1 diski üstüne taşı. Harcanan hamle sayısı T(1) = 1 ve T(n) = 2 · T(n − 1) + 1 özyinelemesini sağlar. Bu sayının aynı zamanda en azı olduğu da kısa bir argümanla görülür: en büyük diski hareket ettirebilmek için diğer n − 1 diskin üçüncü çubukta toplanmış olması gerekir, bu en az T(n − 1) hamle eder; en büyük disk en az bir hamle yapar; sonra aynı n − 1 disk yeniden taşınır.

**İddia.** Her n ≥ 1 için T(n) = 2ⁿ − 1.

**Taban durumu.** T(1) = 1 ve 2¹ − 1 = 1.

**Tümevarım adımı.** T(n) = 2ⁿ − 1 varsayalım. O hâlde

T(n + 1) = 2 · T(n) + 1 = 2 · (2ⁿ − 1) + 1 = 2ⁿ⁺¹ − 2 + 1 = 2ⁿ⁺¹ − 1.

Adım kapandı. Sayısal kontrol: T(3) = 7, T(5) = 31; formül uyuyor.

Bu ispat aynı zamanda bir **algoritma doğruluk ispatının** iskeletidir. Özyinelemeli bir fonksiyonun doğruluğunu savunurken izlenecek üç adım şudur: taban durumunun doğru cevabı verdiğini göster; özyinelemeli çağrıların **daha küçük** girdilerle yapıldığını göster (bu, sonlanmayı da verir); çağrıların doğru cevap verdiğini varsayıp birleştirme adımının bütünü doğru kurduğunu göster. Üçü sırasıyla tümevarımın taban durumuna, iyi sıralama ilkesine ve tümevarım adımına karşılık gelir.

> **Sesli anlat:** "Zayıf tümevarım, güçlü tümevarım ve özyineleme arasındaki ilişkiyi doksan saniyede anlat."
>
> İyi bir cevabın omurgası: "Zayıf tümevarımda adım yalnızca bir önceki durumu kullanır; güçlü tümevarımda tabandan n'ye kadar bütün durumları kullanabilirim. İkisi güç bakımından denktir, seçim kolaylık meselesidir: parçalama adımı kaç birim geriye atladığını kontrol edemiyorsam güçlüsünü kullanırım. Özyineleme ise aynı yapının hesaplama tarafıdır: taban durumu ile özyineleme kuralı, tümevarımın taban durumu ile adımının aynısıdır. Bu yüzden özyinelemeli bir fonksiyonun doğruluğunu ispatlamak, o fonksiyonun tanımı üzerinden tümevarım yapmak demektir."

## Yapısal tümevarım

Tümevarım yalnızca sayılar üzerinde çalışmaz. Bir küme özyinelemeli olarak tanımlanmışsa, o kümenin bütün elemanları hakkında **yapısal tümevarım (structural induction)** yapılabilir: taban elemanlarında iddiayı göster, sonra kurma kurallarının iddiayı koruduğunu göster.

Örnek olarak dengeli parantez dizilerini alalım. Küme şöyle tanımlansın: boş dizi dengelidir; s dengeliyse "(" s ")" dizisi de dengelidir; s ve t dengeliyse s ile t'nin yan yana yazılışı da dengelidir. Bu kümedeki her dizide açılan ve kapanan parantez sayısının eşit olduğunu göstermek üç satırlık bir yapısal tümevarımdır: boş dizide ikisi de sıfırdır; birinci kural her iki sayıyı bir artırır; ikinci kural iki eşit çifti toplar.

Bu, ileride sık kullanacağın bir alışkanlığın tohumudur. Ağaçlar, listeler ve dilbilgisi kuralları hep özyinelemeli tanımlarla gelir; onlar hakkındaki iddiaların ispatı da hep yapısal tümevarımla gider. Ağaç karakterizasyonlarını kurarken bu aracı doğrudan kullanacağız.

## Mülakatta nasıl görünür

Takip sorusu zinciri burada tipik olarak üç halkadır. Birincisi tanımı yoklar: "Tümevarım adımında ne varsayıyorsun, ne ispatlıyorsun?" İkincisi sınır durumunu yoklar: "Taban durumunu atlarsan ne olur, bir örnek verebilir misin?" Üçüncüsü seçimi yoklar: "Bu ispatta zayıf tümevarım yeter miydi?"

Üçüncüsünün cevabı, ispatın parçalama adımına bakmakla verilir. Adım n + 1'den n'ye iniyorsa zayıfı yeter; n'den kontrol edilemeyen daha küçük değerlere iniyorsa güçlüsü gerekir. Mergesort'un doğruluğu bu ikinci gruptadır, çünkü diziyi ikiye bölmek n − 1'e değil, kabaca n / 2'ye iner. Bu ayrımı söyleyebilmek, tekniği ezberlemekle kullanabilmek arasındaki farktır.

Son bir uyarı: mülakatta "tümevarımla ispatlarım" demek tek başına cevap değildir. Cevap, P(n)'in ne olduğunu **açıkça yazmakla** başlar. Yanlış kurulmuş bir P(n) ile en dikkatli adım bile bir yere varmaz.

### Sırada ne var

Buraya kadarki üç makale mülakatın **dilini** kurdu: iddiayı kesin söylemek, tek seferde biten argüman yürütmek ve sonsuz aileleri ispatlamak. Sıradaki makalede dilin konuştuğu **nesnelere** geçiyoruz: kümeler, fonksiyonlar ve bağıntılar. Birebir ve örten fonksiyonların ispat kalıplarını, denklik bağıntılarının kümeleri nasıl parçalara ayırdığını ve kısmi sıraların hangi mühendislik problemlerinde karşına çıktığını göreceksin. Bu makalede kurduğumuz tümevarım, orada sayılabilirlik tartışmasında ve sıradaki makalelerin sayma argümanlarında yeniden işe yarayacak.

## Kaynakça

- Rosen, K. H. *Discrete Mathematics and Its Applications*, 5.1–5.3 bölümleri (Mathematical Induction; Strong Induction and Well-Ordering; Recursive Definitions and Structural Induction). McGraw Hill. [Bağlantı](https://www.mheducation.com/highered/product/Discrete-Mathematics-and-Its-Applications-Rosen.html)
- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (ders notları), 2. bölüm (The Well Ordering Principle), 5. bölüm (Induction) ve 6. bölüm (Recursive Data Types). MIT OpenCourseWare 6.042J. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE220 — Discrete Computational Structures*. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe220/)
