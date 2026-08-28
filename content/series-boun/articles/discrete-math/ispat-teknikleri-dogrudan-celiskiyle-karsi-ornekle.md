---
article_id: article_402c5768-db61-4d1a-a76c-17cc4aeaa531
title: "İspat Teknikleri: Doğrudan, Çelişkiyle, Karşı Örnekle"
slug: ispat-teknikleri-dogrudan-celiskiyle-karsi-ornekle
category: discrete-math
level: intermediate
reading_order: 3
summary: "İspatın anatomisini kurar; doğrudan, karşıt tersiyle ve çelişkiyle ispatı çalışılmış örneklerle yürütür, karşı örnek disiplinini ve sık yapılan ispat hatalarını mülakatta savunulabilir bir strateji seçimine bağlar."
tags:
  - ispat
  - dogrudan-ispat
  - celiskiyle-ispat
  - karsi-ornek
  - kok-iki
content_hash: sha256:7bf193df15dbe5f2a21ef990e5a0db87642eade6a98c3b46611c55dd669375fa
classification_version: 1
classification_batch: 0
---
## Mantıktan ispata

Önceki makalede bir iddiayı kesin biçimde söylemeyi öğrendik: hipotez, sonuç, evren, niceleyici. Orada kurduğumuz denkliklerin hepsi burada işe yarayacak, çünkü **her ispat tekniği aslında bir mantıksal denkliğin kullanımıdır**. Karşıt tersiyle ispat p → q ≡ ¬q → ¬p denkliğini kullanır. Çelişkiyle ispat, bir önermenin değillemesinin çelişkiye götürmesini kullanır. Karşı örnekle çürütme ise ¬∀x P(x) ≡ ∃x ¬P(x) denkliğinin doğrudan uygulanmasıdır.

Bu makalenin amacı sana yeni bir matematik konusu öğretmek değil; elindekiyle **ne yapacağına karar verme** refleksini kurmak. Mülakatta "bunu ispatlayabilir misin?" sorusu geldiğinde kaybedilen ilk otuz saniye, hangi tekniğin denenmesi gerektiğine karar verilemediği saniyelerdir.

## İspat nedir, ne değildir

Sezgisel tanım: **ispat (proof)**, bir iddianın doğru olduğunu, kabul edilmiş şeylerden başlayıp her adımı geçerli bir çıkarımla ilerleyerek gösteren sonlu bir argümandır.

Formal tanım: aksiyomlardan, tanımlardan ve önceden ispatlanmış teoremlerden başlayarak, geçerli çıkarım kurallarıyla iddiaya ulaşan sonlu adım dizisi.

Sınır örneği kritik: bir iddianın yüz örnekte doğrulanması ispat değildir. Yüz örnek yalnızca iddianın yüz örnekte doğru olduğunu gösterir. Buna karşılık **tek bir karşı örnek**, evrensel bir iddiayı tamamen yıkar. Bu asimetri bu makalenin en pratik cümlesidir ve doğrudan niceleyicilerden gelir: evrensel iddianın değillemesi varlıksal bir iddiadır, dolayısıyla onu kanıtlamak için tek tanık yeter.

Sözlüğü de netleştirelim, çünkü mülakatta bu kelimeler ayrım gözetilerek kullanılır. **Teorem (theorem)** ispatlanmış önemli bir iddiadır. **Lemma** başka bir ispatta kullanılmak üzere ispatlanmış yardımcı iddiadır. **Sonuç (corollary)** bir teoremden hemen çıkan iddiadır. **Varsayım (conjecture)** ise henüz ispatlanmamış, doğru olduğu düşünülen iddiadır.

## Strateji seçimi

Şekil 1, koşullu bir iddiayla karşılaştığında izlenecek karar akışını gösteriyor. Akış tek bir soruyla başlar ve her "hayır" cevabı seni bir sonraki tekniğe taşır.

![Koşullu bir iddia için ispat stratejisi seçim akışı: doğrudan yürüyebiliyorsan doğrudan ispat, yürüyemiyorsan karşıt tersini dene, o da kolay değilse çelişkiyle ispata geç](assets/ispat-strateji-akisi.svg "Şekil 1 — Strateji seçimi: hangi tekniği ne zaman denemeli")

Akışın altında duran fikir basit: üç teknik de aynı iddiayı ispatlar, aralarındaki fark yalnızca **kolaylıktır**. Hangisinin kolay olacağını önceden bilmenin yolu yok; bu yüzden sıra vardır.

İddia çift koşulluysa, yani p ↔ q biçimindeyse, akış iki kez çalıştırılır. Çift koşullu önerme (p → q) ∧ (q → p) ile denk olduğundan iki yönün **ayrı ayrı** ispatlanması gerekir ve iki yön için farklı teknikler seçilebilir: bir yön doğrudan, diğer yön karşıt tersiyle gidebilir. Mülakatta "ancak ve ancak" ifadesini duyduğunda ilk söylemen gereken cümle şudur: "İki yönü de göstermem gerekiyor." Tek yönü gösterip durmak, bu tür sorularda en sık kaybedilen puandır. Aynı şey "gerek ve yeter koşul" ifadesi için de geçerlidir; o da bir çift koşullunun başka türlü söylenişidir.

## Doğrudan ispat

En sade tekniktir. p → q iddiası için p'nin doğru olduğunu varsayarsın ve tanımları kullanarak q'ya yürürsün.

**İddia.** n bir tam sayı ve n tekse, n² de tektir.

**Strateji.** Tekliğin tanımını yaz, cebiri yürüt, sonucu yeniden tekliğin tanımına sok.

**İspat.** n tek olsun. Tanım gereği n = 2k + 1 olacak biçimde bir k tam sayısı vardır. O hâlde

n² = (2k + 1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1.

2k² + 2k bir tam sayı olduğundan n², "2 çarpı bir tam sayı artı 1" biçimindedir; yani tektir.

**Savunma.** İspatın her adımı tanımdan çıkıyor ve hiçbir yerde n hakkında ek bir varsayım yapılmadı; dolayısıyla iddia bütün tek tam sayılar için geçerlidir. Sayısal bir kontrol de yapalım: n = 7 için k = 3, n² = 49 = 2·24 + 1. Uyuyor. Ama unutma, bu kontrol ispatın parçası değil, yalnızca hata avıdır.

Doğrudan ispatın anahtarı neredeyse her zaman **tanımı açmaktır**. Mülakatta "tek sayı" deyip devam edersen tıkanırsın; "n = 2k + 1 olacak biçimde bir k vardır" dediğinde yol açılır.

## Karşıt tersiyle ispat

Bazen p'den q'ya yürümek zordur ama ¬q'dan ¬p'ye yürümek kolaydır. İkinci makaledeki denklik sayesinde ikisi aynı şeydir.

**İddia (Lemma).** n bir tam sayı ve n² çiftse, n de çifttir.

Doğrudan denemek can sıkıcıdır: n² = 2m bilgisinden n hakkında bir şey çıkarmak için karekök almak gerekir ve karekökün tam sayı olduğunu bilmiyoruz. Karşıt tersi ise neredeyse yazılmış hâlde gelir.

**Karşıt ters.** n çift değilse, n² de çift değildir. Yani: n tekse n² tektir.

Bu, az önce ispatladığımız iddianın ta kendisi. Dolayısıyla lemma ispatlanmıştır.

**Savunma.** Burada mantıksal bir sıçrama yok: p → q ile ¬q → ¬p bütün doğruluk değerlerinde aynı sütunu üretir, bu yüzden birini ispatlamak diğerini ispatlamaktır. Karşıtı — "n çiftse n² çifttir" — de doğrudur ama bu ayrı bir iddiadır ve onu ispatlamak lemmayı ispatlamaz.

> **Sesli anlat:** "Karşıt tersiyle ispat neden meşrudur, karşıtla ispat neden değildir?" sorusunu altmış saniyede cevapla.
>
> İyi bir cevabın omurgası: "p → q ile ¬q → ¬p mantıksal olarak denktir; doğruluk tablolarında aynı sütunu verirler, bu yüzden birini göstermek diğerini göstermektir. Karşıt olan q → p ise denk değildir: p yanlış, q doğruyken orijinal doğru, karşıt yanlıştır. Dolayısıyla karşıtı ispatlamak orijinal hakkında hiçbir şey söylemez."

## Durum ayrımıyla ispat

Doğrudan ispatın en çok kullanılan varyantı, evreni birbirini dışlayan ve hepsini kapsayan parçalara bölüp her parçada ayrı yürümektir. Buna **durum ayrımı (proof by cases)** denir.

**Problem.** Her n tam sayısı için n² + n ifadesinin çift olduğunu göster.

**Strateji.** Her tam sayı ya çifttir ya tektir; iki durum evreni tümüyle kapsar. Her durumda ifadeyi "2 çarpı bir tam sayı" biçimine sokmayı hedefle.

**Adımlar.** Birinci durumda n çift olsun: n = 2k. O hâlde n² + n = 4k² + 2k = 2(2k² + k) ve parantez içi tam sayıdır, yani ifade çifttir. İkinci durumda n tek olsun: n = 2k + 1. O hâlde

n² + n = (4k² + 4k + 1) + (2k + 1) = 4k² + 6k + 2 = 2(2k² + 3k + 1),

ve yine parantez içi tam sayıdır.

**Savunma.** İki durum birbirini dışlar ve birlikte bütün tam sayıları kapsar; dolayısıyla iddia her n için gösterilmiştir. Bu iki koşul durum ayrımının bütün yüküdür: durumlar örtüşürse ispat gereksiz uzar, evreni kapsamazsa ispat yanlış olur. Mülakatta "bütün durumları saydığından emin misin?" sorusu tam olarak ikincisini yoklar.

Bu ispatın daha kısa bir yolu da vardır ve göstermeye değer: n² + n = n(n + 1) çarpanlarına ayrılır; ardışık iki tam sayıdan biri mutlaka çifttir, dolayısıyla çarpım çifttir. Aynı iddianın iki ispatı olması sık görülür ve mülakatta ikincisini de söyleyebilmek, konuyu ezberlemediğini gösteren en ucuz sinyaldir.

## Çelişkiyle ispat

Yapı şudur: ispatlamak istediğin iddianın **değillemesini** varsayarsın ve bu varsayımdan mantıksal bir çelişki üretirsin. Çelişki, varsayımın yanlış olduğunu gösterir; dolayısıyla iddia doğrudur.

Klasik örneği yürütelim.

**İddia.** √2 rasyonel bir sayı değildir.

**Strateji.** Rasyonel olduğunu varsay, sadeleştirilmiş kesir olarak yaz, çiftlik lemmasını iki kez uygula ve "sadeleştirilmiş" varsayımını çürüt.

Şekil 2 ispatın iskeletini adım adım gösteriyor; metni okurken şekildeki kutuları takip et.

![Kök 2 sayısının irrasyonelliğinin çelişkiyle ispatı: varsayımdan başlayıp kare alma, çiftlik lemmasının iki kez uygulanması ve ortak bölen çelişkisiyle sonuca giden altı adımlık zincir](assets/kok-iki-celiski-zinciri.svg "Şekil 2 — Çelişkiyle ispatın iskeleti: kök 2 örneği")

**İspat.** √2 rasyonel olsun. O hâlde √2 = a / b olacak biçimde, b sıfırdan farklı ve a ile b ortak böleni olmayan tam sayılar vardır. (Her rasyonel sayı sadeleştirilmiş biçimde yazılabilir; bu, varsayımın parçasıdır.)

İki tarafın karesini al: 2 = a² / b², yani a² = 2b².

Sağ taraf 2'nin katı olduğundan a² çifttir. Lemma gereği a çifttir; yani a = 2k olacak biçimde bir k tam sayısı vardır.

Bunu yerine koy: (2k)² = 2b², yani 4k² = 2b², yani b² = 2k².

Aynı gerekçeyle b² çifttir, dolayısıyla b de çifttir.

Şimdi a ve b'nin ikisi de çift, yani ikisinin de 2 ortak böleni var. Bu, "a ile b'nin ortak böleni yok" varsayımıyla çelişir.

Çelişki, başlangıçtaki varsayımın yanlış olduğunu gösterir. Dolayısıyla √2 rasyonel değildir.

**Savunma.** İspatın kalbi, çiftlik lemmasının iki kez kullanılmasıdır; lemma olmadan "a² çift, öyleyse a çift" adımı boşlukta kalır. Mülakatta bu ispat istendiğinde en sık atlanan yer de burasıdır: lemmayı gerekçesiz kullanmak, ispatı yarım bırakmak demektir.

Bir uyarı: çelişkiyle ispat güçlü olduğu için fazla kullanılmaya müsaittir. Bir iddiayı doğrudan ispatlayabiliyorken çelişkiye sarmak, ispatı okunması zor hâle getirir. "¬q varsayalım... doğrudan yürüyelim... q elde ettik, çelişki" biçimindeki ispatlar aslında gizlenmiş doğrudan ispatlardır ve öyle yazılmalıdır.

## Karşı örnek disiplini

Evrensel bir iddiayı çürütmenin maliyeti tek bir örnektir. Bunu somutlaştıralım.

**İddia (yanlış).** Her n doğal sayısı için n² + n + 41 asaldır.

Bu ifade n = 0, 1, 2, …, 39 için gerçekten asal üretir. Kırk ardışık doğrulama, insanı ikna etmeye fazlasıyla yeter — ama ispat değildir. n = 40 için:

40² + 40 + 41 = 1600 + 81 = 1681 = 41².

1681 asal değildir; iddia yıkılmıştır. n = 41 de işe yaramaz: 41² + 41 + 41 = 41 · (41 + 1 + 1) = 41 · 43.

Buradan çıkan üç kural:

**Bir örnek ispat değildir, ama bir karşı örnek çürütmedir.** Asimetrinin kaynağı niceleyicilerdir.

**Karşı örnek ararken sınırlara git.** Sıfır, boş küme, tek elemanlı küme, negatif değerler, eşitlik hâlleri. Yukarıdaki örnekte karşı örnek, ifadenin kendi katsayısıyla (41) ilişkili yerde ortaya çıktı; tesadüf değil, çünkü n = 41 olduğunda ifade 41'in katı olur.

**Karşı örnek bulamamak, iddianın doğru olduğunu göstermez.** Aramayı bıraktığında elinde ya bir karşı örnek ya da bir ispat olmalı; ikisi de yoksa iddian hâlâ varsayımdır ve mülakatta öyle sunulmalıdır.

## Varlık ispatları: tanık göstermek ya da göstermemek

∃x P(x) biçimindeki bir iddiayı ispatlamanın iki yolu vardır.

**Yapıcı (constructive) ispat**, tanığı açıkça üretir. "Toplamı çift olan iki asal vardır" iddiası için 3 ile 5'i göstermek yeter.

**Yapıcı olmayan (nonconstructive) ispat**, tanığın var olduğunu gösterir ama hangisi olduğunu söylemez. Klasik örnek: irrasyonel a ve b sayıları için a^b'nin rasyonel olabileceğini göstermek. √2^√2 sayısını düşün. Bu sayı ya rasyoneldir ya da değildir. Rasyonelse a = b = √2 seçimi iddiayı verir. Rasyonel değilse a = √2^√2 ve b = √2 al; o zaman a^b = (√2^√2)^√2 = √2^2 = 2 olur ve 2 rasyoneldir. Her iki durumda da böyle bir çift vardır — ama hangisi olduğunu bu argüman söylemez.

Bu ayrım bilgisayar mühendisliğinde önemlidir, çünkü yapıcı bir ispat çoğu zaman doğrudan bir algoritma verir; yapıcı olmayan ispat vermez. İleride açgözlü algoritmaların doğruluğunu tartışırken bu farkı tekrar kullanacağız.

## Sık yapılan dört hata

**Döngüsel akıl yürütme.** İspatlanacak şeyi bir adımda varsaymak. En sinsi hâli, iddiayı farklı kelimelerle yeniden söyleyip "dolayısıyla" demektir.

**Örnekle ispat.** Birkaç değerde doğrulayıp genellemek. Yukarıdaki kırk asal tam olarak bunun cezasıdır.

**Gizli varsayım.** "n / 2 bir tam sayıdır" demek, n'nin çift olduğunu varsaymaktır; söylenmediyse ispat kırıktır. Sıfıra bölmemek, kümenin boş olmadığını varsaymak, kökün gerçel olduğunu varsaymak aynı aileden.

**"Açıkça görülüyor ki".** Bu ifade genellikle ispatın en zayıf adımını örter. Mülakatta bunu söylersen, takip sorusu tam oradan gelir.

Dördünün de ortak paydası şu: ispatın bir yerinde, gerekçesi söylenmeyen bir adım vardır. Bunu yakalamanın pratik yolu, ispatı bitirdikten sonra geriye doğru okuyup her cümle için "bu hangi tanımdan ya da hangi önceki adımdan çıkıyor?" diye sormaktır. Cevap veremediğin ilk cümle, görüşmecinin soracağı ilk cümledir.

> **Sesli anlat:** "√2'nin irrasyonel olduğunu tahtada ispatla" isteğini doksan saniyede karşıla. Adımları sırayla söyle ve hangi adımda lemma kullandığını açıkça belirt.
>
> İyi bir cevabın omurgası: "Rasyonel olduğunu varsayıp sadeleştirilmiş bir a bölü b kesri olarak yazarım. Kare alınca a kare eşittir 2b kare çıkar, yani a kare çifttir. Kare çiftse sayının kendisi çifttir lemmasıyla a çifttir; a'yı 2k yazıp yerine koyunca b kare eşittir 2k kare çıkar, aynı lemmayla b de çifttir. O hâlde a ile b'nin ortak böleni 2'dir; bu, kesri sadeleştirilmiş seçmiş olmamla çelişir. Çelişki varsayımı düşürür."

## Mülakatta nasıl görünür

Takip sorusu zinciri burada da tanıdık bir biçim alır. Birinci halka tekniği yoklar: "Neden çelişkiyle ispatladın, doğrudan olmuyor mu?" İkinci halka kullandığın ara adımı yoklar: "Kare çiftse sayının kendisi çift, bunu nereden biliyorsun?" Üçüncü halka genelleştirmeyi yoklar: "Aynı argüman √4 için de yürür mü?"

Üçüncüsünün cevabı öğreticidir: yürümez. √4 = 2 rasyoneldir, çünkü argümanın "a² = 2b²" adımı 2'nin asal olmasına dayanır ve 4 asal değildir. Bir ispatın nerede bozulduğunu söyleyebilmek, ispatı ezberlemekten daha güçlü bir sinyaldir.

### Sırada ne var

Şimdiye kadarki tekniklerin hepsi tek seferde biten argümanlardı. Ama bilgisayar mühendisliğindeki iddiaların çoğu sonsuz bir aile hakkındadır: "her n için bu algoritma n adımda biter", "her ağaç için bu özellik sağlanır". Böyle bir aileyi tek tek ispatlayamayız. Sıradaki makalede bunun aracını kuruyoruz: tümevarım. Aynı fikrin ikinci yüzünün özyineleme olduğunu ve bir özyinelemeli fonksiyonun doğruluğunu ispatlamanın neden tümevarımla aynı şey olduğunu göreceksin.

## Kaynakça

- Rosen, K. H. *Discrete Mathematics and Its Applications*, 1.7 ve 1.8 bölümleri (Introduction to Proofs, Proof Methods and Strategy). McGraw Hill. [Bağlantı](https://www.mheducation.com/highered/product/Discrete-Mathematics-and-Its-Applications-Rosen.html)
- Lehman, E., Leighton, F. T. & Meyer, A. R. *Mathematics for Computer Science* (ders notları), 1. bölüm (What is a Proof?). MIT OpenCourseWare 6.042J. [Bağlantı](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE220 — Discrete Computational Structures*. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe220/)
