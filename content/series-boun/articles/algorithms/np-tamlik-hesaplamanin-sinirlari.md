---
article_id: article_80eba0f5-067c-4906-b677-9bc6fc56922c
title: "NP-Tamlık: Hesaplamanın Sınırları"
slug: np-tamlik-hesaplamanin-sinirlari
category: algorithms
level: advanced
reading_order: 25
summary: "Alt sınır bir modelin içindeyken taşınabilirdi; burada sınır problemin kendisine geçiyor. Karar problemleri ve sayılabilirlik argümanıyla hiç çözülemeyen problemler, durma probleminin iki satırlık çelişki ispatı; P ile NP'nin doğrulayıcı diliyle tanımı, indirgemenin yönü ve maliyet muhasebesi, NP-zor ile NP-tam ayrımı; sözde polinomun neden problemi kolaylaştırmadığı; 2 ile 3 arasındaki eşik ve 2-SAT'ı polinom zamanda çözen güçlü bağlı bileşen algoritması."
tags:
  - np-tamlik
  - indirgeme
  - karar-verilemezlik
  - guclu-bagli-bilesenler
  - sozde-polinom
content_hash: sha256:f0966a726f793d1cafac147bad4ba57c6bf10356348a8531c251f5089521024c
classification_version: 1
classification_batch: 8
---
## Sınır artık modelin değil, problemin

Alt sınırlar makalesi bir imkânsızlık ispatladı: karşılaştırma modelinde hiçbir sıralama algoritması n log n'in altına inemez. Ama o makalenin son uyarısı sınırın ne kadar kırılgan olduğunu da söyledi — **sınır modele aitti.** Sayma sıralaması karşılaştırma yapmadığı için aynı problemi doğrusal zamanda çözer. Modeli değiştir, sınır kalksın.

Bu makale sınırı modelden alıp **problemin kendisine** taşıyor. Üç kademeli bir cevap var ve mülakatta üçünü de ayırt edebilmen beklenir.

Birincisi: bazı problemler için **hiçbir** modelde algoritma yoktur — yalnızca yavaş değil, hiç yok. İkincisi: bazı problemler için hızlı algoritma **bilinmiyor** ve bunun binlerce problem için aynı anda geçerli olması tesadüf değil, tek bir açık sorunun sonucudur. Üçüncüsü: bu iki sınıfın arasındaki çizgi çoğu zaman şaşırtıcı derecede incedir — aynı problemin "2" sürümü kolay, "3" sürümü en zor problemlerden biri olabilir.

## Karar problemleri ve hiç çözülemeyenler

Önce dili sabitleyelim. Bir **karar problemi (decision problem)**, her girdiyi EVET (1) ya da HAYIR (0) cevabına eşleyen bir eşlemedir. En kısa yol probleminin karar sürümü "verilen grafta s'den t'ye ağırlığı en fazla d olan bir yol var mı?", altküme toplamının karar sürümü "verilen tam sayı kümesinin toplamı S olan bir altkümesi var mı?" biçimindedir. Optimizasyon problemini karar problemine çevirmek zorluğu değiştirmez ve tartışmayı basitleştirir; bu yüzden karmaşıklık kuramı karar problemleri üzerinden konuşur.

Bir problem, onu sonlu zamanda çözen bir program varsa **karar verilebilirdir (decidable)**. Şimdi kümeler makalesinde bıraktığımız sayılabilirlik pinini ödeyelim; sonuç, ilk duyduğunda rahatsız edicidir.

Bir program **sonlu** bir bit dizgesidir, yani bir doğal sayıdır. Sonlu dizgelerin kümesi sayılabilir sonsuzdur: hepsini önce uzunluğa, sonra sözlük sırasına göre dizip numaralandırabilirsin. Bir karar problemi ise `p : N → {0, 1}` biçiminde bir fonksiyondur, yani **sonsuz** bir bit dizgesidir; bunların kümesi Cantor'un köşegen argümanıyla sayılamazdır. Sayılabilir çoklukta program, sayılamaz çoklukta problem. Demek ki **problemlerin neredeyse hepsi hiçbir programla çözülemez.** Bu, tek tek zor bir problem bulma meselesi değildir; zorluk kural, çözülebilirlik istisnadır. Şansımız, aklımıza gelen problemlerin çoğunun algoritmik yapıda ve karar verilebilir olmasıdır.

Somut ve isimli bir örnek de var. **Durma problemi (halting problem):** verilen bir program verilen bir girdide duruyor mu? İspat iki satırdır ve mantık makalesindeki çelişkiyle ispat kalıbının en zarif uygulamalarından biridir.

Diyelim ki durma problemini çözen bir `P` makinesi var: `P(M)` girdisi, `M` makinesi sıfırlarla dolu bir bant üzerinde duruyorsa kabul eder, sonsuza kadar çalışıyorsa reddeder. `P`'yi küçük bir değişiklikle `Q` makinesine çevirelim: `Q(M)`, `M(M)` **duruyorsa sonsuza kadar çalışsın**, `M(M)` sonsuza kadar çalışıyorsa **dursun**. Şimdi tek soru: `Q(Q)` ne yapar? Duruyorsa, tanımı gereği sonsuza kadar çalışması gerekir; sonsuza kadar çalışıyorsa, tanımı gereği durması gerekir. Tek çıkış, `P`'nin en baştan var olmamasıdır.

Bu, doğruluk makalesinde kurduğumuz **kısmi doğruluk ile sonlanma** ayrımının uç hâlidir. Orada bir algoritmanın sonlandığını ayrıca ispatlamak gerektiğini söylemiştik; burada bunu **genel olarak** yapacak bir algoritmanın olmadığını öğreniyoruz. Sonlanma ispatı elle yapılır çünkü otomatikleştirilemez.

Karar verilebilir problemler de kendi içinde katmanlıdır. **R** sonlu zamanda karar verilebilen problemler, **EXP** üstel zamanda (2 üzeri n^O(1)) karar verilebilenler, **P** ise polinom zamanda (n^O(1)) karar verilebilenlerdir. Bu üç sınıf birbirinden kesin olarak ayrıdır: P, EXP'in ve EXP, R'nin **öz** altkümesidir. Satranç, EXP'te olup P'de olmayan problemlerden biridir.

> **Sesli anlat:** "Hiç çözülemeyen bir problem olduğunu nasıl gösterirsin? İki farklı argüman ver. Doksan saniye."
>
> İyi bir cevabın omurgası: "İki yol var. Birincisi sayma argümanı: bir program sonlu bir dizgedir, sonlu dizgelerin kümesi sayılabilir sonsuzdur; bir karar problemi ise doğal sayılardan sıfır-bire bir fonksiyondur, yani sonsuz bir bit dizgesidir ve bunların kümesi köşegen argümanıyla sayılamazdır. Sayılabilir çoklukta program, sayılamaz çoklukta problem var; demek ki neredeyse bütün problemler çözülemez. Bu argüman varlık gösterir ama hangi problemin çözülemez olduğunu söylemez — yapıcı olmayan bir ispattır. İkincisi somut örnek verir: durma problemi. Onu çözen bir P makinesi olduğunu varsayarım, P'den Q'yu türetirim — Q, M kendi kendine verildiğinde duruyorsa sonsuza döner, dönüyorsa durur — ve Q'yu kendisine veririm. Q(Q) hem durmalı hem durmamalıdır; çelişki. Demek ki P yoktur."

Bu iki argümanın farkı, ispat teknikleri makalesinde bıraktığımız pini kapatır. Sayma argümanı **yapıcı olmayan bir ispattır**: çözülemez problemlerin var olduğunu gösterir, ama tek bir tanesini bile eline vermez. Durma problemi ise elle tutulur bir örnektir. Mülakatta "böyle bir şey vardır" demek ile "işte bu" demek arasındaki farkı bilmek, varlık argümanlarının algoritma vermediğini bilmek demektir.

## P, NP ve doğrulayıcı

Şimdi karar verilebilir dünyanın içine dönelim. **P**, polinom zamanda **çözülebilen** karar problemleridir. **NP** ise polinom zamanda **doğrulanabilen** karar problemleridir ve tanımı, asimptotik analiz makalesinde kurduğumuz niceleyicili kalıpla yazılır:

> Bir X problemi NP'dedir, ancak ve ancak **öyle bir V doğrulayıcısı vardır ki**, V girdinin boyutunda polinom zamanda çalışır ve şu iki koşulu sağlar: (a) I bir EVET girdisiyse, **öyle bir c sertifikası vardır ki** V(I, c) EVET der; (b) I bir HAYIR girdisiyse, **her c sertifikası için** V(I, c) HAYIR der.

Niceleyicilerin sırasına ve türüne dikkat et: EVET tarafında **bir tane vardır**, HAYIR tarafında **hepsi için**. Mantık makalesinde bir niceleyicinin değillemesinin türünü değiştirdiğini görmüştük; buradaki asimetri tam olarak odur ve NP'nin en sık atlanan özelliğidir. Sertifikayı, girdinin EVET girdisi olduğunun **ispatı** gibi düşün: gerçekten EVET ise ikna edici bir ispat vardır, HAYIR ise hiçbir ispat tutmaz.

Sertifika ve doğrulayıcı üçlüsü tanıdık problemlerde şöyle görünür: en kısa yolun sertifikası bir yoldur, doğrulayıcı ağırlıklarını toplar ve d ile karşılaştırır; negatif çevrimin sertifikası bir çevrimdir; altküme toplamının sertifikası bir altkümedir, doğrulayıcı toplamını alır. Üçünde de doğrulama, aramanın yanında bedavadır.

İki kapsama doğrudan tanımdan çıkar. **P ⊆ NP:** doğrulayıcı sertifikayı yok sayıp problemi kendisi çözer. **NP ⊆ EXP:** bütün sertifikaları tek tek dene; polinom uzunluktaki sertifikaların sayısı en fazla 2 üzeri n^O(1)'dir. Ortadaki soru — **P = NP mi?** — açıktır ve çoğu kişi P'nin NP'nin öz altkümesi olduğunu düşünür; yani çözüm **üretmek** doğrulamaktan zordur.

Sayılar bu inancı sezgisel kılar. n = 100 değişkenli bir formülde 2¹⁰⁰ ≈ 1,27 × 10³⁰ atama vardır; saniyede 10⁹ atama deneyen bir makine bunu yaklaşık 4 × 10¹³ yılda bitirir. Aynı boyutta n³ = 10⁶ işlem ise 1 milisaniye sürer. Tek bir atamanın doğrulanması ise clause sayısıyla doğrusaldır.

![Dikey bir çizgiyle ayrılmış iki panelli bir şema. Sol panelin başlığı P nin NP ye eşit olmadığı varsayımı altında. Panelde büyük bir elips var ve NP diye etiketlenmiş. Elipsin sağ yarısını kesecek biçimde kesik çizgili dikdörtgen bir bölge çizilmiş ve NP zor diye etiketlenmiş; dikdörtgen elipsin sağ kenarını aşarak dışarı taşıyor. Elips ile dikdörtgenin kesiştiği mercek biçimli bölge vurgulanmış ve NP tam diye etiketlenmiş. Elipsin sol iç kısmında daha küçük, dolu bir elips var; P diye etiketlenmiş ve içine en kısa yol yazılmış. Panelin altında dört satır: P için en kısa yol, iki SAT ve iki boyama; NP tam için üç SAT, altküme toplamı ve üç boyama; NP zor olup NP de olmayan örnek olarak durma problemi; ve NP tam eşittir NP kesişim NP zor. Sağ panelin başlığı P eşittir NP olsaydı. Panelde kesik çizgili dikdörtgen bölge bütün paneli kaplıyor ve NP zor diye etiketlenmiş; içinde solda tek bir dolu elips var ve iki satır hâlinde P eşittir NP ve eşittir NP tam yazılmış, yani üç bölge tek bölgeye çökmüş. Elipsin sağında, dikdörtgenin içinde ama elipsin dışında durma problemi yazıyor. Panelin altında dört satır: her NP probleminin polinom zamanda çözüleceği, zorluk varsayımına dayanan kriptografinin çökeceği, NP zorun NP dışında kalan kısmının değişmeyeceği ve durma probleminin yine çözülemeyeceği. En altta not: NP zor NP nin dışına taşar, NP zor olmak NP de olmayı gerektirmez](assets/p-np-kapsama.svg "Şekil 1 — İki panel: P ≠ NP varsayımı altında ve P = NP durumunda sınıfların yerleşimi")

Şekil 1'in sol panelinde dikkat edilecek nokta, **NP-zor bölgesinin NP'nin dışına taşmasıdır.** Durma problemi NP-zordur ama NP'de değildir; NP-zor olmak "en az NP'nin en zorları kadar zor" demektir, "NP'de olmak" demek değil.

> **Sesli anlat:** "P ile NP'yi tanımla. P = NP olsaydı ne değişirdi? Altmış saniye."
>
> İyi bir cevabın omurgası: "P, polinom zamanda çözülebilen karar problemleridir. NP, polinom zamanda doğrulanabilen karar problemleridir: polinom zamanda çalışan bir doğrulayıcı vardır ki, girdi EVET ise onu EVET yaptıran polinom uzunlukta bir sertifika vardır, girdi HAYIR ise hiçbir sertifika onu EVET yaptıramaz. Niceleyiciler asimetriktir — EVET tarafında 'bir tane vardır', HAYIR tarafında 'hepsi için'. P, NP'nin altkümesidir çünkü doğrulayıcı sertifikayı yok sayıp problemi çözebilir; NP de EXP'in altkümesidir çünkü bütün sertifikaları deneyebilirsin. P = NP olsaydı bugün yalnızca doğrulayabildiğimiz her problem için polinom zamanlı bir çözücü de olurdu; pratik sonucu, zorluk varsayımına dayanan kriptografinin çökmesidir. Ama NP-zorun NP dışında kalan kısmı — örneğin durma problemi — bundan etkilenmezdi."

## İndirgeme: zorluğu taşımak

Zorluğu problemler arasında taşımanın aracı **indirgemedir (reduction)**. A probleminden B problemine bir indirgeme, A'nın girdilerini B'nin **denk** girdilerine çeviren polinom zamanlı bir algoritmadır; denk olmak, iki problemin girdi ile çevrilmiş girdi için aynı EVET/HAYIR cevabını vermesi demektir. Gösterimi `A ≤p B`'dir.

Notasyon bir kez oturunca iki okuma birden gelir ve mülakatta ikisi de sorulur: **B kolaysa A da kolaydır** (B için polinom algoritma varsa, çevir ve çöz) ve karşıt tersi olan **A zorsa B de zordur**. Graf algoritmaları makalesinde kurduğumuz maliyet muhasebesi burada da geçerlidir ve bu kez neyin polinom kaldığını denetler: indirgeme O(n^k) sürüyor ve ürettiği örneğin boyutu da O(n^k) ise, B için O(m^j) bir algoritma A'ya O(n^{kj}) verir. Polinomun polinomu polinomdur; bu yüzden bir indirgeme zinciri boyunca "polinom zamanda çözülebilirlik" korunur.

Bunun üstüne iki tanım oturur. Bir X problemi **NP-zordur (NP-hard)**, eğer NP'deki **her** problem X'e polinom zamanda indirgenebiliyorsa. Bir X problemi **NP-tamdır (NP-complete)**, eğer hem X ∈ NP hem de X NP-zorsa. Yani NP-tam problemler NP'nin en zorlarıdır ve hepsi birbirine indirgenebildiği için **denktirler**: biri için polinom algoritma bulunursa hepsi için bulunmuş olur.

İlk NP-tam problemi 1971'de Cook buldu: **SAT** ve onun üç literalli biçimi **3SAT** — verilen bir Boolean formülü doğru yapan bir değişken ataması var mı? NP-zorluğunun sezgisi şudur: NP'deki her problemin polinom zamanlı bir doğrulayıcısı vardır, her doğrulayıcı VE/VEYA/DEĞİL kapılarından oluşan bir devre olarak yazılabilir, her devre bir formüle ve her formül 3SAT biçimine çevrilebilir. Boolean cebiri makalesinde kurduğumuz denklik kuralları tam olarak bu çevirinin aracıdır.

Bir problemin NP-tam olduğunu göstermek artık iki adımlıdır ve **ikinci adımın yönü kritiktir**:

1. **X ∈ NP olduğunu göster:** bir sertifika ve polinom zamanlı doğrulayıcı ver.
2. **X'in NP-zor olduğunu göster:** bilinen bir NP-tam Y probleminden X'e indirgeme kur — yani `Y ≤p X`. Üç şey ispatlanır: (a) Y girdilerinden X girdilerine polinom zamanlı bir çeviri; (b) Y'nin cevabı EVET ise X'inki de EVET; (c) X'in cevabı EVET ise Y'ninki de EVET.

![Dikey bir çizgiyle ayrılmış iki panelli bir şema. Sol panelin başlığı doğru yön: bilinen zordan yeniye. Solda üç SAT yazan bir kutu, sağda X yazan vurgulanmış bir kutu var; ikisi arasında soldan sağa kalın bir ok çizili ve okun üstünde polinom çeviri yazıyor. Okun altında üç SAT küçük eşittir p X yazıyor. Altında iki okuma satırı var: X kolaysa üç SAT de kolaydır ve üç SAT zorsa X de zordur. Onların altında vurgulanmış bir kutu içinde bu yönün X in NP zor olduğunu gösterdiği yazılı. Panelin alt kısmında somut indirgeme dört satırda özetlenmiş: üç SAT küçük eşittir p bağımsız küme; dört clause ve üç değişken on iki düğüm ve yirmi dört kenara çevriliyor; her clause bir üçgen oluyor ve çelişkili literaller kenarla bağlanıyor; formül sağlanabilir ancak ve ancak boyutu dört olan bağımsız küme varsa. Sağ panelin başlığı yanlış yön: yaygın hata. Solda X yazan bir kutu, sağda üç SAT yazan bir kutu var; aralarındaki ince ok çarpı işaretiyle üzeri çizilmiş ve okun altında X küçük eşittir p üç SAT yazıyor. Altında iki satır: bu yönün yalnızca X in NP de olduğunu gösterdiği, zorluğunu göstermediği. Panelin alt yarısında ikinci örnek var; başlığı bağımsız küme küçük eşittir p düğüm örtüsü. Beş düğümlü bir çevrim grafı çizilmiş; iki düğüm koyu, üç düğüm açık renkli. Grafın sağında dört satır: koyu düğümler bağımsız kümedir ve sayısı iki; açık düğümler düğüm örtüsüdür ve sayısı üç; iki artı üç eşittir beş, yani düğüm sayısı; ve S bağımsızdır ancak ve ancak tümleyeni V eksi S bir örtüdür. En altta not: indirgeme kurarken hangi problemin girdisini hangisine çevirdiğini yüksek sesle söyle](assets/indirgeme-yonu.svg "Şekil 2 — İndirgemenin yönü: bilinen zor problemden yeni probleme")

Somut ve elle doğrulanabilir iki indirgeme, Şekil 2'de özetlenen kalıbı gösteriyor.

**Bağımsız küme ≤p düğüm örtüsü.** Bir grafta S kümesi bağımsızdır (hiçbir kenarın iki ucu birden S'te değildir) ancak ve ancak tümleyeni V∖S bir düğüm örtüsüdür (her kenarın en az bir ucu ondadır). İndirgeme "boyutu k olan bağımsız küme var mı?" sorusunu "boyutu |V| − k olan düğüm örtüsü var mı?" sorusuna çevirir ve O(|V|) sürer. Beş düğümlü bir çevrimde en büyük bağımsız küme 2, en küçük düğüm örtüsü 3, toplamları tam 5'tir; beş maksimum bağımsız kümenin beşinin de tümleyeninin örtü olduğunu tek tek denetledim.

**3SAT ≤p bağımsız küme.** Her clause için bir üçgen kur, çelişkili literalleri (x ile değili) kenarla bağla ve k'yı clause sayısı yap. Dört clause ve üç değişkenli bir formülde bu 12 düğüm ve 24 kenar üretir; kaba kuvvetle arayınca boyutu 4 olan bir bağımsız küme bulunur ve ondan okunan atama formülü gerçekten sağlar. Bütün atamaları kesen sekiz clause'lık sağlanamaz bir formülde ise karşılık gelen grafta boyutu 8 olan bağımsız küme **yoktur**. İki yönü de bu iki örnekle denetledim.

> **Sesli anlat:** "Yeni bir X probleminin NP-tam olduğunu nasıl gösterirsin? İndirgemenin yönü hangisidir ve neden? Doksan saniye."
>
> İyi bir cevabın omurgası: "İki adım. Önce X'in NP'de olduğunu gösteririm: bir sertifika tanımlar ve onu polinom zamanda denetleyen doğrulayıcıyı yazarım. Sonra X'in NP-zor olduğunu gösteririm ve burada yön kritiktir: bilinen bir NP-tam problemi — çoğu zaman 3SAT'ı — X'e indirgerim, yani 3SAT örneğini X örneğine çeviririm. Çeviri polinom zamanda olmalı ve iki yönü de ispatlamalıyım: 3SAT EVET ise X EVET, X EVET ise 3SAT EVET. Yön böyledir çünkü A ≤p B, B'nin en az A kadar zor olduğunu söyler; X'i 3SAT'a indirgeseydim yalnızca X'in NP'de olduğunu göstermiş olurdum, zor olduğunu değil. Bu, en sık yapılan hatadır."

## Sözde polinom neden kolaylık değildir

Dinamik programlama makalesi altküme toplamını O(nT) zamanda çözdü ve bir uyarı bıraktı: bu **sözde polinomdur (pseudo-polynomial)**. Şimdi uyarının tam anlamı verilebilir.

Girdi boyutu, sayıların **kaç tane** olduğuyla değil, kaç **bit** tuttuğuyla ölçülür. n tane 64 bitlik sayı yaklaşık 6.500 bit, yani 808 bayt yer kaplar — ama hedef T, 2⁶⁴ ≈ 1,8 × 10¹⁹ kadar büyük olabilir ve tablo n·T ≈ 1,8 × 10²¹ hücre ister. Karmaşıklık makalesinde açtığımız "girdi boyutu sayı mı basamak mı" pini burada kapanır: **T girdinin uzunluğunda üsteldir**, dolayısıyla O(nT) girdi boyutunda polinom değildir.

Bu ayrımın teknik adı vardır. Altküme toplamı ve bölüntü **zayıf NP-tamdır (weakly NP-complete)**: NP-tamlık ispatı, değerleri girdi boyutunda üstel olan sayılar kullanır, bu yüzden sözde polinom algoritmaya izin verirler. 3-bölüntü gibi problemler ise **güçlü NP-tamdır (strongly NP-complete)**: yalnızca girdi boyutunda polinom değerler kullanılarak da NP-zor olduğu gösterilebilir, dolayısıyla P = NP olmadıkça sözde polinom algoritmaları bile yoktur.

Pratikte hangi tarafta olduğun sayılarla belirlenir. n = 50 için kaba kuvvet 2⁵⁰ ≈ 1,13 × 10¹⁵ altküme dener. Aynı n'de T = 10³ ise tablo yalnızca 50.000 hücredir, T = 10⁶ ise 5 × 10⁷, T = 10⁹ ise 5 × 10¹⁰. Küçük hedeflerde dinamik programlama açık ara kazanır; hedef büyüdükçe avantaj sessizce yok olur. Mülakatta "sırt çantası problemini dinamik programlamayla polinom zamanda çözerim" demek eksik bir cümledir; doğrusu "kapasitede polinom, girdi boyutunda değil" demektir.

## Eşik ne kadar ince: 2 ile 3 arasında

Kolay ile en zor arasındaki çizgi genellikle bir parametrenin 2'den 3'e çıkmasıdır ve iki kanonik örnek vardır.

**Boyama.** Bir grafın 2-boyanabilir olup olmadığı graf temsilleri makalesindeki BFS ile Θ(|V| + |E|) zamanda karar verilir: bir düğümü boya, komşularını ters renge boya, çakışma olursa hayır. Beş düğümlü tek çevrim 2-boyanamaz, altı düğümlü çift çevrim boyanır; ikisini de kaba kuvvetle denetledim. Ama **3-boyama NP-tamdır.**

**Sağlanabilirlik.** 3SAT NP-tamdır; oysa her clause'un tam iki literali olduğu **2-SAT polinom zamanda çözülür** — ve çözen algoritma, graf temsilleri makalesinin bilinçli olarak dışarıda bıraktığı konudur.

### Güçlü bağlı bileşenler ve ters bitiş sırası

Graf temsilleri makalesi yönlü graflarda **güçlü bağlı bileşen (strongly connected component)** tanımını vermiş, algoritmasını ertelemişti. Tanım şuydu: u ile v aynı bileşendedir ancak ve ancak u'dan v'ye ve v'den u'ya yol varsa. Kümeler makalesindeki parçalanış teoremi burada da doğrudan işler — karşılıklı erişilebilirlik bir denklik bağıntısıdır, dolayısıyla düğümleri parçalar.

Algoritma iki dolaşma geçişidir ve topolojik sıralamada kullandığımız **ters bitiş sırasını** kullanır:

```
1  guclu_bilesenler(G)
2      birinci geçiş: G üzerinde tam DFS yap             # bitiş sırasını üret
3          her düğümü, özyinelemeli çağrıları bittikten
4          sonra bir listeye ekle                        # bitiş (postorder) sırası
5      G_R = G'nin bütün kenarları ters çevrilmiş hâli   # Θ(|V| + |E|)
6      ikinci geçiş: G_R üzerinde DFS yap
7          başlangıç düğümlerini bitiş sırasının
8          TERSİNDEN dene                                # ters bitiş sırası
9      her çağrının ulaştığı düğüm kümesi bir bileşendir
```

Sekiz düğümlü ve on bir kenarlı somut bir graf üzerinde çalıştırdım. Birinci geçiş `h, g, f, c, e, d, b, a` bitiş sırasını verdi; tersi `a, b, d, e, c, f, g, h`. Ters graf üzerinde bu sırayla yapılan ikinci geçiş üç bileşen buldu: `{a, b, c}`, `{d, e}`, `{f, g, h}`. Aynı sonucu, her düğüm çiftinin karşılıklı erişilebilirliğini kaba kuvvetle hesaplayarak bağımsız olarak doğruladım — birebir aynı çıktı.

Maliyet, graf temsilleri makalesinin doğrusal zaman pinini ödeyen biçimdedir: iki DFS geçişi ve ters grafın kurulması, üçü de Θ(|V| + |E|), toplam Θ(|V| + |E|).

Bileşenleri tek düğüme büzersen **yoğunlaştırma (condensation)** grafını elde edersin ve bu graf **her zaman bir DAG'dır**; örnekte üç bileşen ve C₀ → C₁, C₀ → C₂, C₁ → C₂ kenarları çıktı, çevrimsiz olduğunu ayrıca denetledim. Dinamik programlama makalesindeki "bağımlılık grafının şekli deseni belirler" cümlesi burada da geçerlidir: çevrimi büzünce topolojik sıralanabilir bir yapı kalır.

### 2-SAT'ı bileşenlerle çözmek

Şimdi bağlantı. Bir 2-CNF formülünü **imalar grafına** çevir: her değişken için iki düğüm (x ve değili), her `(a ∨ b)` clause'u için iki kenar — `¬a → b` ve `¬b → a`, çünkü a yanlışsa b doğru olmak zorundadır. n değişken ve m clause, 2n düğüm ve 2m kenar verir.

Teorem şudur: **formül sağlanabilir, ancak ve ancak hiçbir x değişkeni kendi değiliyle aynı güçlü bağlı bileşende değilse.** Sebebi açıktır: aynı bileşende olmak, x'ten ¬x'e ve ¬x'ten x'e ima zinciri olması demektir, yani her iki atama da kendi kendini çürütür. Kararı vermek Θ(n + m) sürer.

Dört örnek üzerinde bileşen kararını kaba kuvvet arama sonucuyla karşılaştırdım; dördünde de eşleşti. Sağlanamayan bir örnekte her iki değişken de kendi değiliyle aynı bileşene düşüyordu. Aynı formüller üç literalli olsaydı bu numara işlemezdi: üçüncü literal, "biri yanlışsa diğeri doğrudur" biçiminde tek bir imaya çevrilemez ve problem NP-tama sıçrar.

## Mülakatta nasıl görünür

Bu makale, "daha hızlısı olmaz" cevabının en güçlü hâlini verir: **bu problem için hızlı algoritma bulmak, binlerce başka problemi de aynı anda çözmek demektir.**

Altı tipik hata var. **İndirgemenin yönünü ters kurmak** — X'i 3SAT'a indirgemek zorluğu göstermez. **NP'yi "polinom zamanda çözülemeyen" diye tanımlamak** — NP, doğrulanabilirlik sınıfıdır ve P'yi içerir. **NP-zor ile NP-tamı karıştırmak** — durma problemi NP-zordur ama NP'de değildir, dolayısıyla NP-tam değildir. **P ≠ NP'yi ispatlanmış gibi konuşmak** — açık bir sorudur. **Sözde polinomu polinom saymak** — kapasitede polinom, girdi boyutunda değil. **NP-tamlığı "çözülemez" diye okumak** — NP-tam problemler pekâlâ çözülür; kaba kuvvet, yaklaşıklama, parametreli algoritmalar ve pratikte iyi çalışan çözücüler vardır, garanti edilemeyen şey en kötü durumda polinom süredir.

Bir de sınıflar arası bir refleks: bir problemin **iyi tanımlı olmaması** ile **zor olması** ayrı şeylerdir. Graf algoritmaları makalesindeki negatif çevrimli en kısa yol sorusu zor değil, iyi tanımsızdı; doğru cevap bir sayı değil, çevrimin kendisini raporlamaktı.

İngilizce karşılıklar hazır olmalıdır: *decision problem*, *decidable*, *undecidable*, *halting problem*, *countable*, *certificate*, *verifier*, *polynomial-time reduction*, *NP-hard*, *NP-complete*, *satisfiability*, *pseudo-polynomial*, *weakly / strongly NP-complete*, *strongly connected component*, *reverse postorder*, *condensation*.

### Sırada ne var

Bu makaleyle Faz C kapanıyor. Asimptotik tanımlardan başlayıp yinelemeler, doğruluk ispatları, üç tasarım deseni ve alt sınırlar üzerinden buraya geldik; elinde artık bir algoritmayı **ölçme**, **savunma** ve **sınırını gösterme** takımı var.

Sıradaki faz karakteri değiştiriyor: kuramdan sisteme geçiyoruz. Şimdiye kadar bütün makaleler tek bir programın maliyetini konuştu ve makinenin o programa ait olduğunu varsaydı. Oysa gerçek bir bilgisayarda aynı anda onlarca program çalışır, hiçbiri diğerine güvenmez ve hiçbiri donanıma doğrudan dokunamaz. Sıradaki makale **işletim sisteminin** ne olduğunu, kullanıcı modu ile çekirdek modu ayrımının neden donanım desteği gerektirdiğini ve bir sistem çağrısının sıradan bir fonksiyon çağrısından nasıl ayrıldığını kuruyor. Doğruluk makalesindeki durum makinesi modeli oradan itibaren yeniden ve sürekli işimize yarayacak.

## Kaynakça

- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 19: Complexity — **karar problemi** tanımı ("assignment of inputs to YES (1) or NO (0)") ve örnek tablosu (s-t Shortest Path, Negative Cycle, Longest Simple Path, Subset Sum, Tetris, Chess, Halting problem); **karar verilebilirlik**: "Program is finite (constant) string of bits, i.e., a nonnegative integer ∈ N. Problem is function p : N → {0, 1}, i.e., infinite string of bits", program sayısının sayılabilir, problem sayısının sayılamaz olması ve buradan "most decision problems not solvable by any program (undecidable)" sonucu; **R, EXP, P** tanımları ve P ⊊ EXP ⊊ R kesin kapsamaları; **NP'nin doğrulayıcı tanımı** üç koşuluyla birlikte ve "You can think of the certificate as a proof that I is a YES input"; P ⊆ NP ile NP ⊆ EXP gerekçeleri; **indirgeme** ("Because B can be used to solve A, B is at least as hard as A"), **NP-hard** ve **NP-complete = NP ∩ NP-hard** tanımları; NP-tam problem listesi ve **Subset Sum'ın "weakly NP-complete" olması** ("which is what allows a pseudopolynomial-time algorithm, but no polynomial algorithm unless P = NP") ile 3-Partition'ın "strongly NP-complete" olması; 2-boyamanın P'de, 3-boyamanın NP-tam olması. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Demaine, E., Devadas, S. & Lynch, N. *6.046J Design and Analysis of Algorithms*, Lecture 16: NP-Completeness — **indirgeme** tanımı ("a polynomial-time algorithm that converts inputs to problem A into equivalent inputs to problem B") ve üç sonucu; **NP-hard** tanımı ("every problem Y ∈ NP reduces to X") ile "If P ≠ NP, then X ∉ P"; NP-tamlık ispatının iki adımı ve indirgemenin üç ispat yükümlülüğü (polinom çeviri, EVET → EVET, EVET ← EVET); **3SAT'ın Cook tarafından 1971'de NP-tam bulunması** ve NP-zorluğunun devre argümanıyla sezgisi ("The verifier is an algorithm that can be implemented as a circuit… converted to 3SAT form"); 3SAT'ın NP'de olmasının sertifika/doğrulayıcı gerekçesi; **Subset Sum'ın 3DM'den indirgenmesi** ve "only weakly NP-hard… the values of the numbers used in the reduction are exponential in input"; güçlü NP-zorluğun tanımı ("must only use number values that are polynomial in the size of the input"); Partition'ın Subset Sum'dan indirgenmesi ve "we can reduce Partition to Subset Sum, though this is not the direction we want for the reduction" uyarısı. MIT OpenCourseWare, Bahar 2015. [Bağlantı](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/pages/lecture-notes/)
- Aaronson, S. (ders veren) & Kishore, A. (yazıcı). *6.045J / 18.400J Automata, Computability, and Complexity*, Lecture 6: Turing machines — Turing makinesinin sonlu otomattan farkı (banda yazabilme ve istediği anda durabilme) ve makinenin her adımda verdiği üç karar (durum değiştir, banda yaz, sola/sağa git ya da dur); **evrensel Turing makinesi** ve Turing'in 1936 tarihli *On Computable Numbers* makalesi; **Church-Turing tezi** ("anything we would naturally regard as 'computable' is actually computable by a Turing machine"); **durma probleminin karar verilemezliği**, birebir aktarılan ispatıyla: "Let P be a Turing machine that solves the halting problem… we can easily modify P to produce a new Turing machine Q, such that Q(M) runs forever if M(M) halts, or halts if M(M) runs forever. Then the question becomes: what happens with Q(Q)?"; **Cantor'un köşegen argümanı** ve gerçel sayıların tam sayılardan çok olması; Turing makinelerinin sayısının sayılabilir, problemlerin sayısının sayılamaz olması. MIT OpenCourseWare, Bahar 2011. [Bağlantı](https://ocw.mit.edu/courses/6-045j-automata-computability-and-complexity-spring-2011/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 4.2 Directed Graphs — **güçlü bağlılığın bir denklik bağıntısı olması** (yansıma, simetri, geçişlilik açıkça listelenir) ve düğümleri denklik sınıflarına, yani **güçlü bileşenlere** parçalaması; **derinlik öncelikli sıralar** (preorder, postorder, reverse postorder) ve "a reverse postorder in a DAG provides a topological order"; **Kosaraju-Sharir algoritması**: ters grafın ters bitiş sırasını hesapla, sonra standart DFS'i o sırayla çalıştır, her çağrının ulaştığı düğümler bir güçlü bileşendir; **maliyet**: "uses preprocessing time and space proportional to V + E"; iki geçişin sırasının değiştirilebilir olması ("True, the strong components of a digraph are the same as the strong components of its reverse") — bu makaledeki sunum bu değişkeni kullanır; **2-sağlanabilirlik**: imalar grafının kurulumu ("For each clause x + y, include edges from y' to x and from x' to y") ve karar ölçütü ("The formula is satisfiable if and only if no variable x is in the same strong component as its negation x'"), ayrıca yoğunlaştırma grafının ("kernel DAG (contract each strong component to a single vertex)") topolojik sıralamasının bir atama vermesi. Princeton University. [Bağlantı](https://algs4.cs.princeton.edu/42digraph/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 6.6 Intractability — P ve NP'nin arama problemi (search problem) çerçevesiyle tanımı, "nondeterministic polynomial time" adlandırmasının kaynağı, poli-zaman indirgeme tanımı, Cook-Levin teoremi ve SAT'ın NP-tamlığı, NP-tam problem ailesi ve "P = NP?" sorusunun konumu. Princeton University. [Bağlantı](https://algs4.cs.princeton.edu/66intractability/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE300 — Analysis of Algorithms* — bu makalenin resmî dayanağı dersin *Course Learning Outcomes* bölümündedir; ilgili ifade birebir şöyledir: "lower bound theory will be covered". Karmaşıklık sınıfları ve indirgeme, bu başlığın doğal devamı olarak Faz C'yi kapatır. Sayfanın metni son olarak 2026-09-01'de doğrulandı ve değişmemişti. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe300/)
