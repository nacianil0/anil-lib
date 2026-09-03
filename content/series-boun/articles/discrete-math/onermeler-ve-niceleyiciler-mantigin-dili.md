---
article_id: article_8aee91f6-deeb-4218-a4fd-09f6f31c60b0
title: "Önermeler ve Niceleyiciler: Mantığın Dili"
slug: onermeler-ve-niceleyiciler-mantigin-dili
category: discrete-math
level: beginner
reading_order: 2
summary: "Önerme, bağlaç ve doğruluk tablosundan başlayıp koşullu önermenin dört akrabasını, temel çıkarım kurallarını ve iç içe niceleyicileri kurar; her tanımı mülakatta savunulabilir bir cümleye bağlar."
tags:
  - mantik
  - onerme
  - dogruluk-tablosu
  - niceleyici
  - cikarim-kurallari
content_hash: sha256:d1bbccc0807125affbf3c1adcc6cb89b2f8442f23d944c70425306ea1201c77c
classification_version: 1
classification_batch: 0
---
## Neden mantıkla başlıyoruz

İlk makalede beş yeteneği kurduk: anlatmak, çözmek, ispatlamak, savunmak ve takip sorularına dayanmak. Beşinin de ortak bir aracı var, o araç dil. Mülakatta yanlış cevaptan daha sık başa bela olan şey, *belirsiz* cevaptır: "genelde çalışır", "hemen hemen her durumda", "bazen bozulur". Bu cümlelerin hiçbiri sınanabilir değil, dolayısıyla hiçbiri savunulabilir değil.

Bu makale o belirsizliği kesip atan aracı kuruyor. CmpE220 katalog tanımının ilk cümlesi de tam buradan başlar: önerme mantığı ve ispatlar. Sırayla üç şey yapacağız. Önce bir cümlenin ne zaman değerlendirilebilir bir iddia olduğunu netleştireceğiz. Sonra iddiaları birleştiren bağlaçları ve bunların doğruluk tablolarını kuracağız. Son olarak "her" ve "bazı" sözcüklerinin arkasındaki niceleyicilere geçip, cümledeki sıralarının anlamı nasıl tersine çevirdiğini göreceğiz.

## Önerme: doğruluk değeri olan cümle

Sezgisel tanım: **önerme (proposition)**, doğru ya da yanlış olan — ikisi birden olmayan — bir bildirim cümlesidir.

Formal tanım: bir önerme, doğruluk değerler kümesi {D, Y} içinden tam olarak bir değer alan bildirimdir.

Örnekler yardımcı olur. "İstanbul Türkiye'dedir" bir önermedir ve doğrudur. "2 + 2 = 5" bir önermedir ve yanlıştır. "Bu diziyi sırala" bir önerme değildir, çünkü emir cümlesine doğru ya da yanlış diyemezsin. "Saat kaç?" da değildir.

Sınır örneği önemli: "x, 3'ten büyüktür" bir önerme **değildir**. Doğruluğu x'e bağlıdır; x bilinmeden değerlendirilemez. Buna **yüklem (predicate)** diyeceğiz ve makalenin ikinci yarısında ona döneceğiz. Bu ayrımı şimdiden yapmanın pratik sebebi şudur: mülakatta "bu algoritma hızlıdır" dediğinde, aslında içinde serbest değişkenler olan bir yüklem söylemiş olursun — hangi girdi, hangi ölçü, hangi karşılaştırma. Cümleyi önermeye çevirmek, o değişkenleri bağlamak demektir.

## Bağlaçlar ve doğruluk tabloları

Önermeleri **bağlaç (connective)** denen işleçlerle birleştiririz. Beş temel bağlacı ve okunuşlarını sırayla verelim.

**Değilleme (negation)** ¬p: "p değil". p doğruysa ¬p yanlıştır.

**Ve (conjunction)** p ∧ q: yalnızca ikisi de doğruysa doğrudur.

**Veya (disjunction)** p ∨ q: en az biri doğruysa doğrudur. Buradaki "veya" **kapsayıcıdır**; ikisi birden doğru olduğunda da doğrudur. Türkçedeki günlük "veya" çoğu zaman dışlayıcıdır ("çay veya kahve"), bu yüzden dışlayıcı hâl için ayrı bir işleç kullanılır: p ⊕ q, yalnızca tam olarak biri doğruysa doğrudur.

**Koşullu (conditional/implication)** p → q: "eğer p ise q". p'ye **hipotez**, q'ya **sonuç** denir.

**Çift koşullu (biconditional)** p ↔ q: "p ancak ve ancak q". İkisinin doğruluk değeri aynıysa doğrudur.

Dördünün doğruluk tablosu tek bakışta:

| p | q | p ∧ q | p ∨ q | p → q | p ↔ q |
|---|---|-------|-------|-------|-------|
| D | D | D | D | D | D |
| D | Y | Y | D | Y | Y |
| Y | D | Y | D | D | Y |
| Y | Y | Y | Y | D | D |

Bu tablonun en çok itiraz çeken satırları son ikisidir: p yanlışken p → q her hâlükârda doğrudur. Buna **boş doğruluk (vacuous truth)** denir ve bilgisayar mühendisliğinde her gün karşına çıkar. "Bu listedeki bütün elemanlar çifttir" ifadesi boş liste için doğrudur, çünkü ihlal eden bir eleman yoktur. Bir döngü hiç dönmediğinde döngü gövdesine dair her iddia sağlanmış sayılır; ilerideki makalelerde döngü değişmezlerini kurarken bu tam olarak işimize yarayacak.

Koşullunun bu tanımını savunmanın en kolay yolu, onu bir söz gibi düşünmektir. "Sınavı geçersen sana kitap alacağım" sözünü ne zaman bozmuş olurum? Yalnızca sen geçtiğinde ve ben kitabı almadığımda. Sen geçmediysen, kitabı alsam da almasam da sözümü bozmuş olmam.

> **Sesli anlat:** "p → q neden yalnızca tek bir satırda yanlıştır?" sorusuna altmış saniyede cevap ver ve cevabına boş doğruluğa dair bir örnek ekle.
>
> İyi bir cevabın omurgası: "Koşullu önerme bir söz verir: hipotez sağlandığında sonucun da sağlanacağını. Bu söz yalnızca hipotez doğru, sonuç yanlışken bozulur. Hipotez yanlışsa söz sınanmamıştır, dolayısıyla bozulmamıştır; boş listedeki bütün elemanların çift olması bu yüzden doğru sayılır."

## Koşullunun dört akrabası

Mülakatta en sık yapılan mantık hatası, koşullu bir önermeyi yanlış yönde kullanmaktır. Bir p → q önermesinin üç akrabası vardır ve ikisi ona denk değildir.

- **Karşıt (converse)**: q → p
- **Ters (inverse)**: ¬p → ¬q
- **Karşıt ters (contrapositive)**: ¬q → ¬p

Şekil 1 dördünü bir kare üzerinde gösteriyor: çapraz duran çiftler birbirine denktir, yan yana duranlar değildir.

![Koşullu önermenin dört akrabası bir kare üzerinde: sol üstte koşullu, sağ üstte karşıt, sol altta ters, sağ altta karşıt ters; çapraz çiftler denk olarak işaretli, yan yana çiftler denk değil olarak işaretli](assets/kosullu-onermenin-akrabalari.svg "Şekil 1 — Koşullunun dört akrabası: çapraz olanlar denktir")

Denkliği doğruluk tablosuyla görelim. p → q ile ¬q → ¬p aynı sütunu üretir:

| p | q | p → q | ¬q | ¬p | ¬q → ¬p |
|---|---|-------|----|----|---------|
| D | D | D | Y | Y | D |
| D | Y | Y | D | Y | Y |
| Y | D | D | Y | D | D |
| Y | Y | D | D | D | D |

Karşıtın denk olmadığını görmek için tek bir satır yeter: p yanlış, q doğru olduğunda p → q doğrudur ama q → p yanlıştır.

Somut örnek hatayı görünür kılar. "Bir sayı 4'e bölünüyorsa çifttir" doğrudur. Karşıtı — "bir sayı çiftse 4'e bölünür" — yanlıştır; 6 bunu bozar. Karşıt tersi ise — "bir sayı çift değilse 4'e bölünmez" — doğrudur ve orijinal cümleyle aynı şeyi söyler.

Bu, bir sonraki makalenin de temelidir: karşıt tersi ispatlamak, orijinali ispatlamakla aynı şeydir. Bazen ikincisi çok daha kolaydır.

## Denklik, totoloji ve iki yararlı kural

Bir bileşik önerme, bileşenlerinin bütün doğruluk değerleri için doğruysa **totoloji (tautology)**, hepsi için yanlışsa **çelişki (contradiction)**, ikisi de değilse **olumsal önerme (contingency)** adını alır. p ∨ ¬p bir totolojidir; p ∧ ¬p bir çelişkidir.

İki önerme bütün satırlarda aynı değeri alıyorsa **mantıksal olarak denktir (logically equivalent)** deriz ve p ≡ q yazarız. Denklik, karmaşık bir ifadeyi sadeleştirmenin aracıdır. Mülakat için ezberlenmeye değer üç tanesi:

**Koşullunun açılımı:** p → q ≡ ¬p ∨ q. Bu, koşulluyu tamamen "veya" cinsinden yazmanı sağlar.

**Koşullunun değillemesi:** ¬(p → q) ≡ p ∧ ¬q. Bir sözün bozulması, hipotezin sağlanıp sonucun sağlanmamasıdır. Bunu bir kez içselleştirdiğinde, karşı örnek üretmek mekanik bir işe dönüşür.

**De Morgan kuralları:** ¬(p ∧ q) ≡ ¬p ∨ ¬q ve ¬(p ∨ q) ≡ ¬p ∧ ¬q. Değilleme bir bağlacın içine girerken bağlacı çevirir.

Üçüncüsünü türetelim, çünkü türetmek ezberden iyidir. p → q ≡ ¬p ∨ q olduğunu biliyoruz. O hâlde ¬(p → q) ≡ ¬(¬p ∨ q). De Morgan'ı uygula: ≡ ¬(¬p) ∧ ¬q. Çift değillemeyi sadeleştir: ≡ p ∧ ¬q. Üç satırda vardık.

## Çıkarım kuralları: geçerli ile geçerli olmayan

Bir **çıkarım kuralı (rule of inference)**, doğru kabul edilen öncüllerden hangi sonuca geçebileceğini söyler. Kural geçerliyse, öncüller doğru olduğunda sonuç zorunlu olarak doğrudur.

Şekil 2 iki geçerli kuralı ve onlara çok benzeyen bir geçersiz akıl yürütmeyi yan yana koyuyor. Yan yana koymamın sebebi, bu üçünün karıştırılmaya en açık üçlü olması; ayrı ayrı öğrenildiğinde ayırt edilmesi zorlaşıyor.

![Üç akıl yürütme kalıbı yan yana: modus ponens ve modus tollens geçerli olarak, sonucu doğrulama ise geçersiz olarak işaretlenmiş; her kalıpta öncüller bir çizginin üstünde, sonuç altında duruyor](assets/cikarim-kurallari.svg "Şekil 2 — İki geçerli kural ve onlara benzeyen bir geçersiz akıl yürütme")

**Modus ponens.** Öncüller: p → q ve p. Sonuç: q. "Kod derlenmiyorsa test çalışmaz; kod derlenmiyor; öyleyse test çalışmıyor."

**Modus tollens.** Öncüller: p → q ve ¬q. Sonuç: ¬p. Karşıt tersin kullanımından başka bir şey değildir. "Kod derlenmiyorsa test çalışmaz; test çalışıyor; öyleyse kod derleniyor."

**Sonucu doğrulama (affirming the consequent).** Öncüller: p → q ve q. Sonuç diye öne sürülen: p. Bu **geçersizdir**. "Bellek sızıntısı varsa bellek kullanımı artar; bellek kullanımı arttı; öyleyse sızıntı var." Hayır: önbellek ısınması da kullanımı artırır. Hata ayıklarken en pahalı yanılgılardan biri budur.

Küçük bir problemle pekiştirelim.

**Problem.** Şu üç öncül veriliyor: (1) Servis yavaşsa kuyruk büyür. (2) Kuyruk büyümedi. (3) Servis yavaş değilse dağıtım geri alınmaz. Dağıtım geri alındı mı?

**Strateji.** Öncülleri sembolleştir, sonra geçerli kuralları sırayla uygula.

**Adımlar.** y: servis yavaş, k: kuyruk büyür, g: dağıtım geri alınır. Öncüller: y → k, ¬k, ¬y → ¬g. Birinci ve ikinciye modus tollens uygula: ¬y. Şimdi ¬y ile üçüncü öncüle modus ponens uygula: ¬g.

**Cevap ve savunma.** Dağıtım geri alınmadı. Her adımda geçerli bir kural kullandık; hiçbir yerde karşıtı ya da tersi kullanmadık. Dikkat: eğer ikinci öncül "kuyruk büyüdü" olsaydı, buradan "servis yavaş" sonucunu çıkaramazdık — o, sonucu doğrulama hatası olurdu.

## Yüklemler, evren ve niceleyiciler

Makalenin başında "x, 3'ten büyüktür" ifadesinin önerme olmadığını söylemiştik. Buna P(x) diyelim: bir ya da daha çok değişken içeren, değişkenlere değer verildiğinde önermeye dönüşen ifade, yani **yüklem (predicate)**.

Yüklemi önermeye çevirmenin ikinci yolu, değişkeni bir **niceleyici (quantifier)** ile bağlamaktır.

**Evrensel niceleyici (universal quantifier)** ∀x P(x): "evrendeki her x için P(x) doğrudur". Yanlış olması için tek bir karşı örnek yeter.

**Varlıksal niceleyici (existential quantifier)** ∃x P(x): "evrende P(x)'i doğru kılan en az bir x vardır". Doğru olması için tek bir tanık yeter.

İkisinin sınır örneği aynı yerde, boş evrende ortaya çıkar ve makalenin başındaki boş doğruluğa bağlanır. Evren boşsa ∀x P(x) doğrudur, çünkü ihlal edecek eleman yoktur; aynı evrende ∃x P(x) ise yanlıştır, çünkü tanıklık edecek eleman da yoktur. Bu asimetri ilk bakışta tuhaf görünür, ama iki niceleyicinin yaptığı işten doğrudan çıkar: biri karşı örnek arar, diğeri tanık arar. Boş bir listeye "bütün elemanları sıralı" demek doğrudur; "içinde sıralı bir eleman var" demek yanlıştır.

Burada asla atlanmaması gereken bir parça var: **söylem evreni (domain of discourse)**. ∀x (x² ≥ x) ifadesi tam sayılar üzerinde doğrudur, ama gerçel sayılar üzerinde yanlıştır; x = 0,5 için 0,25 ≥ 0,5 sağlanmaz. Evreni söylemeden niceleyici kullanmak, mülakatta en kolay yakalanan açıklardan biridir. Bir iddia ortaya attığında, karşındaki neredeyse her zaman "hangi küme üzerinde?" diye soracaktır.

Türkçe burada ekstra bir tuzak kuruyor. "Her öğrenci bir dil biliyor" cümlesinin iki okuması var: her öğrencinin bildiği (muhtemelen farklı) bir dil vardır; ya da öyle bir dil vardır ki bütün öğrenciler onu bilir. Günlük konuşmada bağlamdan anlarız, mülakatta anlamayız. Bu yüzden niceleyici sırası yazılır.

## Sıra her şeyi değiştirir

İki niceleyicili ifadelerde sıra anlamı tersine çevirir. Klasik örnek üzerinden gidelim; evren "bütün insanlar", A(x, y) ise "y, x'in annesidir" olsun.

∀x ∃y A(x, y): "her insan için, o insanın annesi olan bir kişi vardır." Doğru.

∃y ∀x A(x, y): "öyle bir kişi vardır ki, bütün insanların annesidir." Yanlış.

Aradaki fark şudur: birinci ifadede y, x'e bağlı olarak seçilebilir; ikincisinde önce y sabitlenir ve sonra bütün x'ler için çalışmak zorundadır. Bilgisayar mühendisliğinde bu ayrım her yerdedir. "Her girdi için bir algoritma çalışır" ile "bir algoritma bütün girdiler için çalışır" aynı şey değildir; asimptotik tanımlarda göreceğin "her ε için bir N vardır" kalıbı da tam olarak bu sıraya dayanır.

Bir de yaygın bir yanlış anlama: aynı türden niceleyicilerin sırası değiştirilebilir. ∀x ∀y P(x, y) ile ∀y ∀x P(x, y) denktir; ∃x ∃y için de öyle. Sıra yalnızca **farklı** türden niceleyiciler arasında önemlidir.

Son olarak, bu makalenin bir sonraki makaleye devrettiği en önemli araç: niceleyicilerin değillemesi.

¬∀x P(x) ≡ ∃x ¬P(x)

¬∃x P(x) ≡ ∀x ¬P(x)

Sözle: "hepsi öyle değil" demek, "öyle olmayan en az biri var" demektir; "hiçbiri öyle değil" demek ise "hepsi öyle değildir" demektir. Bu iki denklik, De Morgan kurallarının niceleyicili hâlidir ve karşı örnekle çürütmenin bütün gerekçesini verir: evrensel bir iddiayı yıkmak için tek bir tanık bulman yeterlidir, çünkü değillemesi varlıksal bir iddiadır.

> **Sesli anlat:** "∀x ∃y P(x, y) ile ∃y ∀x P(x, y) arasındaki fark nedir?" sorusunu doksan saniyede, kendi seçtiğin bir örnekle anlat ve hangisinin diğerini gerektirdiğini söyle.
>
> İyi bir cevabın omurgası: "Birincisinde y, x seçildikten sonra seçilebilir; ikincisinde tek bir y bütün x'ler için çalışmak zorundadır. Bu yüzden ikincisi birincisinden daha güçlü bir iddiadır ve onu gerektirir; tersi doğru değildir. Ayrıca hangi evren üzerinde konuştuğumuzu söylemem gerekir, çünkü doğruluk evrene bağlıdır."

## Bu makalenin mülakattaki karşılığı

Şimdiye kadar öğrendiklerini tek bir alışkanlığa indirgeyebilirsin: bir iddia söylerken hipotezini, evrenini ve niceleyicisini de söyle.

"Hash tablosunda arama sabit zamandadır" cümlesi, hipotezi ve evreni gizlediği için savunulamaz. Aynı iddianın savunulabilir hâli şöyledir: "Uniform dağılım varsayımı altında ve yük faktörü sabit tutulduğunda, ortalama durumda arama sabit zamandadır; en kötü durumda değildir." Fark, konuyu daha iyi bilmek değil; cümlenin mantıksal iskeletini görünür kılmaktır.

Takip sorusu zincirini de artık okuyabilirsin. Görüşmeci "her zaman mı?" diye sorduğunda niceleyicini yokluyordur; "hangi durumda bozulur?" diye sorduğunda değillemeni istiyordur; "tersi de doğru mu?" diye sorduğunda karşıtı ile karşıt tersi ayırt edip etmediğine bakıyordur.

### Sırada ne var

Elimizde artık bir iddiayı kesin biçimde ifade etme aracı var. Sıradaki soru şu: bir iddianın doğru olduğunu nasıl gösteririz? Bir sonraki makalede ispatın anatomisini kuruyoruz — doğrudan ispat, karşıt tersiyle ispat, çelişkiyle ispat ve tek bir karşı örnekle çürütme. Bu makaledeki denkliklerin neden ezberlenmeye değer olduğunu orada göreceksin: her ispat tekniği, aslında bir mantıksal denkliğin kullanımıdır.

## Kaynakça

- Rosen, K. H. *Discrete Mathematics and Its Applications*, 1. bölüm (The Foundations: Logic and Proofs). McGraw Hill. [Bağlantı](https://www.mheducation.com/highered/product/Discrete-Mathematics-and-Its-Applications-Rosen.html)
- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (ders notları), 1. ve 3. bölümler. MIT OpenCourseWare 6.042J. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE220 — Discrete Computational Structures*. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe220/)
