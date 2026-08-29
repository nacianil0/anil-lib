---
article_id: article_ea3f03f4-8752-402b-8880-e9e6582737d0
title: "Dengeli Arama: AVL'den B-Ağacına"
slug: dengeli-arama-avlden-b-agacina
category: data-structures
level: advanced
reading_order: 12
summary: "Yüksekliği garanti altına alan mekanizmalar: sıralı dolaşmayı koruyan dönüşler, AVL'nin yükseklik dengesi ve logaritmik yükseklik ispatı, kırmızı-siyah ile 2-3 ağaçlarının aynı fikri kurma biçimi ve RAM modelinin bilinçli olarak terk edildiği yer — blok tabanlı dış bellek modeli ve B-ağacı."
tags:
  - dengeli-agac
  - avl
  - donus
  - kirmizi-siyah-agac
  - b-agaci
content_hash: sha256:7b51a5cd9cf22bf83a3490a1094d504f580972867e3f2a56519304bcc16b2117
classification_version: 1
classification_batch: 3
---
## Yükseklik tesadüfe bırakılamaz

Önceki makale işlemleri tek bir ölçüye bağladı: arama, ekleme, silme, en küçük, ardıl — hepsinin maliyeti ağacın yüksekliği h ile orantılıydı. Sonra kötü haberi verdi: h'nin logaritmik kalacağının hiçbir garantisi yok. Anahtarlar sıralı geldiğinde ağaç zincire dönüşüyor ve h, n − 1 oluyor.

Bu makale eksik yarıyı tamamlıyor. Fikir tek cümleyle özetlenir: değişmeze **ikinci bir koşul** ekle ve her değişiklikten sonra o koşulu ucuza onar. İkinci koşulun adı **denge (balance)**, onarım aracının adı **dönüş (rotation)**, sonucu ise şudur: dengeli bir arama ağacı yüksekliğin logaritmik kalacağını **her girdi için** garanti eder; bu bir ortalama durum iddiası değildir.

Sonra modeli de değiştireceğiz. Karmaşıklık makalesinin RAM modeli bütün bellek erişimlerini aynı fiyatta sayıyordu. Veri diskteyken bu varsayım çöker ve doğru ağaç ikili ağaç olmaktan çıkar.

## Dönüş: yapıyı değiştir, sırayı koru

Bir arama ağacında yüksekliği düşürmek istiyoruz ama sıralı dolaşmayı bozmaya iznimiz yok — çünkü değişmez o dolaşmanın artan olmasıdır. İkisini birden yapan yerel işleme **dönüş (rotation)** denir.

Sağa dönüşü tarif edelim. Kökü x olan bir alt ağacın sol çocuğu y olsun. Dönüşten sonra y kök olur, x onun sağ çocuğu olur; y'nin eski sağ alt ağacı ise x'in sol alt ağacına geçer. Sola dönüş bunun tam simetriğidir ve ikisi birbirinin tersidir.

İki özelliği vardır ve ikisi de kritiktir. Birincisi: dönüş yalnızca sabit sayıda işaretçiyi yeniden bağlar, yani sabit zamanlıdır. İkincisi: sıralı dolaşma değişmez. Bunu görmek için dolaşmayı dönüşten önce ve sonra yazmak yeter; Şekil 1'deki iki şekilde de y'nin sol alt ağacı, sonra y, sonra ortadaki alt ağaç, sonra x, sonra x'in sağ alt ağacı sırası çıkar. Aynı sıra, farklı şekil — dönüşün bütün gücü buradadır.

![Solda kökü x, sol çocuğu y olan bir alt ağaç; y'nin altında A ve B, x'in sağında C üçgenleriyle gösterilen alt ağaçlar var. Sağda sağa dönüşten sonraki hâl: y kök, sol çocuğu A, sağ çocuğu x ve x'in altında B ile C. İki ok dönüşün iki yönünü gösteriyor ve altta her iki şeklin de aynı sıralı dolaşmayı verdiği yazılı](assets/donus.svg "Şekil 1 — Sağa ve sola dönüş: şekil değişir, sıralı dolaşma değişmez")

Dönüş tek başına bir denge mekanizması değildir; yalnızca araçtır. Eksik olan, dönüşün ne zaman uygulanacağını söyleyen kuraldır. Farklı dengeleme şemaları tam olarak bu kuralda ayrışır.

## AVL: yükseklik dengesi

İlk dengeleme şeması AVL ağacıdır; adını 1962'de öneren Adelson-Velsky ve Landis'ten alır. Kuralı yereldir ve tek cümledir: **her düğümün sol ve sağ alt ağaçlarının yükseklikleri arasındaki fark en fazla birdir.** Farkı işaretli tanımlarsak — sağ alt ağacın yüksekliği eksi sol alt ağacın yüksekliği — bu değerin yalnızca −1, 0 veya 1 olmasına izin verilir.

Bu yerel kuralın küresel sonucu bir ispat ister ve ispat sayma makalesindeki refleksin aynısıdır: en kötü durumu, yani **verilen yüksekliği tutturan en seyrek ağacı** say. F(h), yükseklik dengesi sağlayan ve yüksekliği h olan bir ağacın taşıyabileceği en az düğüm sayısı olsun. Yüksekliği sıfır olan ağaç tek düğümdür, yani F(0) = 1; yüksekliği bir olan en seyrek ağaç kök ve tek çocuktan oluşur, yani F(1) = 2. Yüksekliği h olan en seyrek ağaçta kök, alt ağaçlarından biri h − 1 yüksekliğinde olmak zorundadır ve denge kuralı diğerinin en az h − 2 olmasını zorlar. Buradan yineleme çıkar: F(h) = 1 + F(h − 1) + F(h − 2).

Şimdi kaba ama yeterli bir alt sınır alalım. F artan olduğu için F(h − 1) ≥ F(h − 2)'dir, dolayısıyla F(h) ≥ 2F(h − 2) yazabiliriz. Bunu tekrar tekrar uygulamak F(h) ≥ 2^(h/2) verir. Ağacımızda n düğüm varsa n ≥ F(h) ≥ 2^(h/2) olur ve iki tarafın logaritmasını alınca **h ≤ 2 log₂ n** çıkar: yükseklik dengesi, yüksekliğin logaritmik kalmasını garanti eder.

Sınır daha da sıkılaştırılabilir ve bu, mülakatta cevabı bir seviye yukarı taşıyan ayrıntıdır. F(h) = 1 + F(h − 1) + F(h − 2) yinelemesi Fibonacci yinelemesinin kaydırılmış hâlidir; taban değerlerle birlikte çözümü F(h) = Fib(h + 3) − 1'dir. Fibonacci sayıları altın oran φ'nin kuvvetleri gibi büyüdüğü için sınır h ≤ log_φ n mertebesine iner ve log_φ 2 ≈ 1,4404 olduğundan bu, kabaca 1,44 log₂ n demektir. Bir milyon anahtar için: kaba sınır 2 log₂(10⁶) ≈ 39,9 der, sıkı sınır ≈ 28,7 der, gerçek en kötü değer ise 27'dir. Üçü de logaritmiktir; fark yalnızca sabit çarpandadır ve bu, karmaşıklık makalesinde konuştuğumuz "sabitler düşer ama yok olmaz" durumunun temiz bir örneğidir.

Onarım nasıl yapılır? Ekleme ya da silme ağacı yalnızca yaprak düzeyinde değiştirdiği için, dengesi bozulabilecek düğümler yalnızca değişen yaprağın **atalarıdır** ve yükseklikleri en fazla bir değişmiştir. Kökten aşağı değil, yapraktan yukarı yürüyerek dengesi bozulan **en alttaki** atayı bulur ve orada onarım yaparsın. Yerel onarım teoremi şunu söyler: farkı ikiye çıkmış bir düğümün alt ağacı, alt ağacındaki diğer bütün düğümler dengeliyse, **bir veya iki dönüşle** dengeye getirilebilir. İki dönüş gereken durum, bozulmanın "zikzak" olduğu, yani çocuğun eğiminin ters yönde olduğu durumdur; orada önce çocuğa bir dönüş uygulanıp bozulma tek yöne indirilir, sonra asıl dönüş yapılır.

Maliyet muhasebesi böylece kapanır: atalar zinciri en fazla h uzunluğundadır, her ata için sabit iş yapılır, h ise logaritmiktir. Sonuç: arama, ekleme ve silme **en kötü durumda** logaritmiktir. Bu, önceki makalenin veremediği garantidir.

> **Sesli anlat:** "Dengeli arama ağacı ne demek, AVL bunu nasıl garanti ediyor ve maliyeti ne? Doksan saniyede anlat."
>
> İyi bir cevabın omurgası: "Dengeli demek, yüksekliğin işlem sayısından bağımsız olarak logaritmik kalmasının garanti edilmesi demektir. AVL bunu yerel bir kuralla yapar: her düğümde sol ve sağ alt ağaçların yükseklik farkı en fazla birdir. Bu kuralın küresel sonucunu, verilen yüksekliği tutturan en seyrek ağacı sayarak ispatlarım: en az düğüm sayısı F(h) = 1 + F(h−1) + F(h−2) yinelemesini sağlar, buradan F(h) en az iki üzeri h bölü iki çıkar, yani yükseklik en fazla iki log iki n'dir; Fibonacci çözümüyle sabit yaklaşık 1,44'e iner. Onarım için dönüş kullanırım: dönüş sabit sayıda işaretçiyi yeniden bağlar ve sıralı dolaşmayı değiştirmez. Ekleme ya da silmeden sonra yapraktan köke doğru yürür, dengesi bozulan en alttaki atayı bir veya iki dönüşle düzeltirim. Atalar zinciri logaritmik olduğu için üç işlem de en kötü durumda logaritmiktir."

## Aynı fikrin başka dengeleri

AVL tek şema değildir ve mülakatta genellikle adı geçen ikinci şema **kırmızı-siyah ağaçtır (red-black tree)**. Onun kuralı yüksekliği doğrudan değil, dolaylı olarak sınırlar: düğümlere kırmızı ve siyah renkler atanır ve renk kuralları, kökten herhangi bir yaprağa giden en uzun yolun en kısa yolun iki katını geçemeyeceğini zorlar. Sonuç, n düğümlü bir kırmızı-siyah ağacın yüksekliğinin 2 log₂ n'yi aşmamasıdır.

Renk kurallarının nereden geldiğini anlamanın en kolay yolu **2-3 ağacından** geçer. 2-3 ağacında iki tür düğüm bulunur: bir anahtar ve iki bağ taşıyan 2-düğümü, iki anahtar ve üç bağ taşıyan 3-düğümü. Ağaç aşağı doğru değil **yukarı** doğru büyür: yeni anahtar bir yaprağa eklenir, yaprak taşarsa ortadaki anahtar ebeveyne yükselir ve bu taşma zinciri gerekirse köke kadar çıkar. Kök bölündüğünde bütün yapraklar aynı anda bir seviye derinleşir, dolayısıyla **bütün yapraklar her zaman aynı derinliktedir**. Bu mükemmele yakın dengenin karşılığı şudur: N anahtarlı bir 2-3 ağacında arama ve ekleme en fazla log₂ N düğüm ziyaret eder.

Kırmızı-siyah ağaç, 2-3 ağacının ikili ağaç kılığındaki hâlidir: bir 3-düğümü, aralarında kırmızı bir bağ bulunan iki 2-düğümü olarak temsil edilir. Renk kuralları böylece 2-3 ağacının denge kuralının ikili ağaca çevrilmiş yazımı olur. İki şemayı tek cümlede karşılaştırmak gerekirse: AVL daha sıkı dengeler, bu yüzden aramada biraz daha hızlıdır ama ekleme ve silmede daha çok onarım yapar; kırmızı-siyah daha gevşek dengeler, onarım maliyeti daha düşüktür. İkisi de en kötü durumda logaritmiktir ve seçim, iş yükünün okuma ağırlıklı mı yazma ağırlıklı mı olduğuna bakar.

## Model değişiyor: blok, disk ve B-ağacı

Şimdiye kadarki bütün muhasebe karmaşıklık makalesindeki RAM modeline dayanıyordu ve o modelin üç varsayımından biri şuydu: bellekteki her hücreye erişim aynı maliyettedir. Veri ana belleğe sığmayıp diskte durduğunda bu varsayım yalnızca yanlış olmakla kalmaz, analizin sonucunu tersine çevirir. Disk erişimi ana bellek erişiminden mertebelerce pahalıdır ve disk veriyi tek tek baytlar hâlinde değil, sabit boyutlu **bloklar (block)** hâlinde okur. Bir baytı okumakla dört bin baytı okumak neredeyse aynı fiyattadır.

Bu yüzden model değiştirilir. **Dış bellek modelinde (external memory model)** maliyet, yapılan işlem sayısıyla değil, **taşınan blok sayısıyla** ölçülür. Bloğun içindeki hesap bedavaya yakındır. Model değişince soru da değişir: artık "kaç karşılaştırma yapıyorum?" değil, "kaç blok okuyorum?" diye soruyoruz.

Dengeli ikili ağaç bu ölçüde kötü bir yapıdır. Her düğüm bir anahtar taşır; bir düğümü okumak bir blok taşımak demektir ve bloğun geri kalanı boşa gider. Bir milyar anahtar için yükseklik log₂(10⁹) ≈ 29,9, yani yaklaşık otuzdur: tek bir arama otuz blok okuması ister.

**B-ağacı (B-tree)** doğrudan bu maliyeti hedefler: her düğüme bir anahtar değil, bir bloğa sığacak kadar **çok** anahtar koyar. Tanım şöyle verilir: B ≥ 2 bir tam sayı olmak üzere bir B-ağacında bütün yapraklar aynı derinliktedir ve kök dışındaki her iç düğümün en az B, en fazla 2B çocuğu vardır. Alt sınır ağacın seyrekleşmesini, üst sınır düğümün bloğa sığmasını garanti eder; iki sınır arasındaki oyun payı sayesinde ekleme ve silme her seferinde yapıyı yeniden kurmak zorunda kalmaz. Her düğümün en az B çocuğu olduğu için yükseklik B tabanında logaritmiktir ve arama, ekleme, silme B tabanında logaritmik sayıda blok taşımasıyla biter.

Kazancı sayıya dökelim. Blok başına yaklaşık yüz çocuk sığdığını varsayalım. Bir milyar anahtar için log₁₀₀(10⁹) = 4,5'tir, yani ağaç beş seviyedir: bir arama beş blok okur. Aynı veri dengeli bir ikili ağaçta otuz blok okuması isterdi. Altı kat fark, taban değişiminden gelir: ikili ağaç her adımda arama alanını ikiye, B-ağacı yüze böler. Üstelik en üstteki bir iki seviye pratikte önbellekte tutulabildiği için gerçek disk erişimi sayısı daha da azalır.

Buradan çıkan asıl ders yapının kendisi değil, **modelin seçimidir**. Aynı problem — sıralı bir kümede arama — iki farklı maliyet modelinde iki farklı doğru cevap verir. Mülakatta "hangi ağaç?" sorusuna cevap verirken önce hangi modelde konuştuğunu söylemek, cevabı ezberden ayıran şeydir.

Şekil 2 iki yapıyı aynı veri üzerinde karşılaştırıyor.

![Solda dengeli ikili ağaç: her düğümde tek anahtar var, kökten yaprağa inen yol boyunca her düğüm ayrı bir blok olarak işaretlenmiş ve bir milyar anahtar için yaklaşık otuz seviye yazıyor. Sağda B-ağacı: her düğüm içinde çok sayıda anahtar bulunan geniş bir dikdörtgen ve bir blok olarak etiketli, kök ve iki seviye gösterilmiş, bir milyar anahtar ve düğüm başına yüz çocuk için beş seviye yazıyor](assets/b-agaci-blok.svg "Şekil 2 — Aynı veri, iki model: düğüm başına bir anahtar ile düğüm başına bir blok")

> **Sesli anlat:** "Veritabanı indeksleri neden dengeli ikili ağaç değil de B-ağacı kullanır? Altmış saniyede açıkla."
>
> İyi bir cevabın omurgası: "Çünkü maliyet modeli değişiyor. Veri diskte durduğunda pahalı olan karşılaştırma değil, blok taşımaktır ve disk zaten tek tek bayt değil sabit boyutlu bloklar okur. Dengeli ikili ağaçta her düğüm tek anahtar taşır, yani her seviye bir blok okuması eder; bir milyar anahtarda bu yaklaşık otuz okuma demektir. B-ağacında her düğüm bir bloğa sığacak kadar anahtar taşır, kök dışında her iç düğümün en az B en fazla iki B çocuğu vardır ve bütün yapraklar aynı derinliktedir; yükseklik B tabanında logaritmik olur. Düğüm başına yüz çocukla bir milyar anahtar beş seviyeye iner, yani otuz okuma yerine beş okuma. Kısacası B-ağacı ağacın dallanmasını bloğun boyutuna uydurur."

## Mülakatta nasıl görünür

Takip zinciri genellikle önceki makalenin bıraktığı yerden başlar: "Yüksekliği nasıl garanti edersin?" → "Dengeleme ne kadara mal oluyor?" → "Peki veri belleğe sığmazsa?"

İlk soruya cevap, bir denge koşulu adlandırıp onun logaritmik yüksekliği neden zorladığını söylemektir; AVL'nin en seyrek ağaç argümanı bu iş için en kısa yoldur. İkinci soruya cevap, dönüşün sabit zamanlı olduğunu ve onarımın yalnızca atalar zincirinde yürüdüğünü söylemektir; buradan toplam maliyetin yine logaritmik olduğu çıkar. Üçüncü soruya cevap ise modeli değiştirmektir — ve bu, mülakatçının duymayı beklediği ama çoğu adayın söylemediği cümledir.

Sık yapılan iki hataya dikkat. Birincisi, dengelemenin aramayı hızlandırdığını sanmak: dengeleme aramanın **garantisini** kurar, ortalama davranışı zaten iyi olan bir ağacı daha hızlı yapmaz. İkincisi, B-ağacını "daha çok anahtar tutan ağaç" diye anlatmak: asıl mesele anahtar sayısı değil, düğüm boyutunun blok boyutuna eşitlenmesidir.

İngilizce karşılıklar hazır olmalıdır: *balanced search tree*, *rotation*, *AVL tree*, *height balance*, *red-black tree*, *2-3 tree*, *B-tree*, *block*, *external memory model*, *branching factor*, *worst-case guarantee*.

### Sırada ne var

Bu iki makale bir soruyu çok iyi cevapladı: "bu anahtar burada mı ve komşuları kim?" Sıradaki makale farklı bir soruyu ele alıyor: "şu anda en küçüğü ver, sonra tekrar en küçüğü ver." Bu soru için tam sıralamayı korumak gereğinden fazla iş yapmaktır. Heap, arama ağacının değişmezini bilinçli olarak **zayıflatarak** — yalnızca ebeveyn ile çocuk arasında bir ilişki isteyerek — hem en küçüğü sabit zamanda bulur hem de bütün yapıyı tek bir dizide, hiç işaretçi kullanmadan saklar. Orada eski bir bilgiyi geri çağıracağız: tam ikili ağacın dizi üzerindeki temsili ve indis aritmetiği.

## Kaynakça

- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 7: Binary Trees II: AVL — dönüşün sabit sayıda işaretçiyi yeniden bağlaması ve dolaşma sırasını koruması; AVL özelliği (eğim −1, 0 veya 1); en seyrek ağaç yinelemesi F(h) = 1 + F(h−1) + F(h−2) ≥ 2F(h−2) ve buradan çıkan logaritmik yükseklik; bir veya iki dönüşle yerel onarım; AVL'nin ilk dengeleme şeması olarak Adelson-Velsky ve Landis (1962) künyesi. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 3.3 (Balanced Search Trees) — 2-düğümü ve 3-düğümü tanımları; N anahtarlı bir 2-3 ağacında arama ve eklemenin en fazla log₂ N düğüm ziyaret etmesi; 3-düğümünün sola yatık kırmızı bağla iki 2-düğümü olarak temsil edilmesi; n düğümlü kırmızı-siyah ağacın yüksekliğinin 2 log₂ n'yi aşmaması. Addison-Wesley. [Bağlantı](https://algs4.cs.princeton.edu/33balanced/)
- Morin, P. *Open Data Structures*, 14. bölüm (External Memory Searching), 14.2 (B-Trees) — B ≥ 2 için B-ağacı tanımı (bütün yapraklar aynı derinlikte, kök dışındaki her iç düğümün en az B en fazla 2B çocuğu); yükseklik sınırı ve arama, ekleme, silmenin B tabanında logaritmik sayıda blok taşımasıyla bitmesi (Teorem 14.1). [Bağlantı](https://opendatastructures.org/ods-cpp/14_2_B_Trees.html)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 13. bölüm (Red-Black Trees — 13.1 özellikler ve yükseklik sınırı, 13.3 ekleme). MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE250 — Data Structures and Algorithms* (katalog tanımı "Search Structures" ve "File organization" başlıklarını içerir; bu makale ikisini birleştiren yapıyı kurar). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe250/)
