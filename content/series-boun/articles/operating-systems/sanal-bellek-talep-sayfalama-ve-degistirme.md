---
article_id: article_9eddc8ae-eab4-485e-b9d9-e4b2e73635f4
title: "Sanal Bellek: Talep Sayfalama ve Değiştirme"
slug: sanal-bellek-talep-sayfalama-ve-degistirme
category: operating-systems
level: advanced
reading_order: 33
summary: "Önceki makale adres uzayının fiziksel belleğe sığdığını varsayıyordu. Bu makale o varsayımı kaldırıyor: sayfa tablosu girdisindeki bulunma biti sıfırsa erişim bir sayfa hatasına dönüşür, işletim sistemi sayfayı diskten getirir ve komut yeniden denenir. Ardından asıl soru geliyor — bellek doluysa hangi sayfa çıkarılmalı? Önce ölçüt tanımlanıyor (ortalama bellek erişim süresi), sonra optimal, FIFO ve LRU aynı erişim dizisi üzerinde yarıştırılıyor, Belady anomalisi gösteriliyor ve kusursuz LRU'nun neden uygulanamadığı ile saat algoritmasının onu nasıl yaklaştırdığı anlatılıyor. Bütün isabet oranları kendi programımla üretildi."
tags:
  - sanal-bellek
  - sayfa-hatasi
  - talep-sayfalama
  - degistirme-ilkeleri
  - thrashing
content_hash: sha256:b9e1150362f9ed9731b1601e7f994023f727fe33f7ff7cbfd5ac7a60ddd07ff3
classification_version: 1
classification_batch: 10
---
## Adres uzayı belleğe sığmazsa

Önceki makale boyunca sessizce doğru kabul ettiğimiz bir varsayım vardı: her sürecin adres uzayı fiziksel belleğe sığıyor. Sayfalama bu varsayımı çok daha yaşanabilir kıldı, çünkü artık adres uzayının kullanılmayan orta kısmına hiç çerçeve ayrılmıyor. Ama varsayım hâlâ yerinde duruyordu.

Şimdi kaldıralım. Sistemde aynı anda çok sayıda süreç var ve hepsinin **etkin olarak kullandığı** sayfaların toplamı fiziksel bellekten büyük olabilir. Üstelik programcıya "istediğin kadar büyük bir adres uzayın var" yanılsamasını vermek istiyoruz; bu yanılsama, süreçler makalesindeki heap'in sınırsızca büyüyebiliyormuş gibi görünmesinin de temeli.

Çözüm, bellek hiyerarşisine bir kat daha eklemektir: diskte, sayfaların geçici olarak barınabileceği bir alan ayrılır. Buna **takas alanı (swap space)** denir ve işletim sistemi oraya sayfa boyutunda birimlerle yazar, oradan sayfa boyutunda birimlerle okur. Bir sayfa uzun süre kullanılmıyorsa diske gönderilir, çerçevesi bir başkasına verilir.

## Bulunma biti ve sayfa hatası

Bir sayfanın bellekte olup olmadığını donanım nereden bilir? Cevap, önceki makalede adını anıp geçtiğimiz bir bitte: sayfa tablosu girdisindeki **bulunma biti (present bit)**. Bit 1 ise sayfa fiziksel bellektedir ve çeviri her zamanki gibi yürür. Bit 0 ise sayfa bellekte değildir, diskte bir yerdedir.

Bellekte olmayan bir sayfaya erişmeye **sayfa hatası (page fault)** denir. Adlandırma aslında biraz talihsizdir ve kaynağın kendisi de bunu söyler: erişim tümüyle meşrudur — sayfa sürecin adres uzayına eşlenmiştir, yalnızca o an bellekte değildir — dolayısıyla adı "hata" değil "ıska" olmalıydı. Ad, donanımın davranışından geliyor: donanım çözemediği bir durumla karşılaşınca yapabileceği tek şeyi yapar, denetimi işletim sistemine devreder. Bu, işletim sistemi makalesinde tanımladığımız **tuzağın** ta kendisidir; yasadışı bir erişimde olan da aynı şey olduğu için ikisi aynı adı taşır.

Denetimi alan koda **sayfa hatası işleyicisi (page-fault handler)** denir ve işi şudur: sayfanın diskte nerede olduğunu bul, oku, sayfa tablosu girdisini güncelle, komutu yeniden dene. Diskteki adres genellikle sayfa tablosu girdisinin kendisinde saklanır — sayfa bellekte olmadığına göre çerçeve numarası alanı zaten boştur, orası disk adresi için kullanılır.

İki ayrıntı mülakatta ayırt edicidir. Birincisi: **sayfa hatasını donanım değil işletim sistemi işler**, hatta donanım yönetimli TLB'si olan makinelerde bile. Bunun iki gerekçesi var — disk erişimi zaten o kadar yavaştır ki yazılımın ek yükü yanında görünmez kalır, ve donanımın takas alanını, disk sürücüsünü, dosya sistemini anlaması gerekirdi. İkincisi: **disk okuması sürerken süreç engellenmiş durumdadır**, yani süreç durum makinesindeki üçüncü durumda; işlemci bu sırada başka bir sürece verilir. Giriş/çıkış ile hesaplamayı örtüştürme fikri, süreçler makalesinde iş parçacığı gerekçesi olarak gördüğümüz fikrin aynısıdır.

Şekil 1 bir bellek erişiminin bütün yollarını tek şemada topluyor.

![Soldan sağa ve yukarıdan aşağıya akan bir akış şeması. En üst satırda üç çerçeveli kutu var: sanal adres kutusundan TLB kutusuna bir ok gider, TLB kutusundan sağa giden okun üstünde isabet yazar ve ok fiziksel erişim kutusuna varır. TLB kutusundan aşağı inen ikinci bir ok vardır, sağında ıska yazar ve sayfa tablosu kutusuna varır. Sayfa tablosu kutusundan sağa giden okun üstünde bulunma biti bir yazar ve ok TLB'ye yaz komutu yenile kutusuna varır. Sayfa tablosu kutusundan aşağı inen okun sağında bulunma biti sıfır yazar ve ok vurgulanmış SAYFA HATASI kutusuna varır. SAYFA HATASI kutusundan sağa giden ok işletim sistemi diskten okur kutusuna, oradan aşağı inen ok PTE'yi güncelle yeniden dene kutusuna varır. Şemanın altında iki satır var: disk erişimi sürerken süreç engellenmiş durumdadır ve işlemci başka bir sürece verilir; sayfa hatası bir tuzaktır, donanım çözemediği durumda denetimi işletim sistemine verir](assets/sayfa-hatasi-akisi.svg "Şekil 1 — Aynı erişimin üç sonu var: TLB isabeti, tablo isabeti ya da diske gitmek")

> **Sesli anlat:** "Bir sayfa hatası olduğunda adım adım ne olur? Doksan saniye."
>
> İyi bir cevabın omurgası: "Donanım sanal adresi çevirmek için önce TLB'ye bakar; ıska olursa sayfa tablosuna gider. Girdideki bulunma biti sıfırsa sayfa fiziksel bellekte değildir ve donanım bir tuzak doğurur; buna sayfa hatası denir, ama aslında meşru bir erişimin ıskasıdır. Denetimi işletim sistemindeki sayfa hatası işleyicisi alır. İşleyici, sayfanın disk üzerindeki yerini bulur — bu bilgi genellikle girdinin kullanılmayan çerçeve alanında saklanır — ve diske bir okuma isteği verir. Okuma sürerken süreç engellenmiş durumdadır, işlemci başka bir sürece verilir. Bellek doluysa işleyici önce bir çerçeve boşaltmak zorundadır; hangi sayfanın çıkacağına değiştirme ilkesi karar verir, ve çıkan sayfa değiştirilmişse önce diske yazılmalıdır. Okuma bitince işleyici sayfa tablosu girdisini günceller: bulunma bitini 1 yapar ve çerçeve numarasını yazar. Sonra komut yeniden denenir; bu sefer büyük ihtimalle TLB ıskası olur, o da tablodan karşılanır ve üçüncü denemede erişim isabet eder. Sayfa hatasını donanım değil işletim sistemi işler, çünkü disk zaten çok yavaştır ve donanımın takas alanını bilmesi gerekirdi."

## Bellek doluysa: değiştirme ve ölçüt

Bir sayfayı getirmek için çoğu zaman bir sayfayı çıkarmak gerekir. Hangisini? Buna karar veren kurala **değiştirme ilkesi (replacement policy)** denir ve doğru soruyu sormanın yolu, çizelgeleme makalesinde koyduğumuz disiplinden geçiyor: **ölçütü söylemeden "daha iyi" denemez.**

Ölçüt, fiziksel belleği bir **önbellek** olarak görmekten çıkar. Bellek, adres uzaylarındaki bütün sayfaların bir alt kümesini tutar; iyi bir ilke ıska sayısını azaltır. Bunu tek bir sayıya çeviren büyüklük **ortalama bellek erişim süresidir (average memory access time, AMAT)**:

```
AMAT = T_bellek + P_ıska × T_disk
```

Sayı koyalım. Bellek erişimi 100 nanosaniye, disk erişimi 10 milisaniye olsun. İsabet oranı yüzde 90 ise AMAT = 100 ns + 0,1 × 10 ms ≈ **1 milisaniye**. İsabet oranı yüzde 99,9'a çıkarsa AMAT **10,1 mikrosaniyeye** iner — yaklaşık **yüz kat** hızlanma. İki hesabı da kendim yaptım ve kaynağın verdiği değerlerle birebir aynı çıktı.

Bu iki sayı, konunun tamamını özetliyor. Disk, bellekten yüz bin kat yavaş olduğu için **küçücük bir ıska oranı bile toplam maliyeti ele geçirir.** Sanal belleğin başarısı ilkelerin zekâsından çok, ıska oranını yüzde birin altına indirebilmesinden gelir.

## Optimal, FIFO, LRU

Bir ilkeyi değerlendirmenin en dürüst yolu onu en iyisiyle karşılaştırmaktır. **Optimal ilke**, geleceğe bakıp **en uzak zamanda kullanılacak** sayfayı çıkarır ve ıska sayısını en aza indirir. Uygulanamaz — geleceği bilmiyoruz — ama bir referans noktası olarak paha biçilmezdir: "ilkem yüzde 80 isabet veriyor" tek başına anlamsızdır, "optimal yüzde 82 veriyor" cümlesiyle birlikte anlamlı olur.

Üç ilkeyi aynı erişim dizisi üzerinde koşturalım: 0, 1, 2, 0, 1, 3, 0, 3, 1, 2, 1 ve üç çerçeve. İlk üç erişim kaçınılmaz olarak ıskadır, çünkü önbellek boş başlar; bunlara **zorunlu ıska (compulsory miss)** denir.

**FIFO** en basit ilkedir: sayfalar geliş sırasına dizilir, çıkarma gerektiğinde en eski gelen atılır. Uygulaması çok kolaydır ve tek bir şeyi bilmez — sayfanın **önemini**. Bu dizide 0 numaralı sayfa defalarca kullanılmasına rağmen ilk giren olduğu için atılır ve hemen ardından geri istenir.

**LRU (least recently used)**, çizelgeleme makalesindeki kalıbı tekrarlar: geçmişe bakıp geleceği kestir. En uzun süredir kullanılmayan sayfayı çıkarır ve dayanağı **yerellik ilkesidir** — yakın geçmişte kullanılan sayfa yakın gelecekte de kullanılacaktır.

Sonuçlar şöyle: optimal 6 isabet (yüzde 54,5), FIFO 4 isabet (yüzde 36,4), LRU 6 isabet. Bu dizide LRU optimalle **aynı** sonucu veriyor. Sayıları kendi programımla ürettim ve kaynağın verdiği oranlarla birebir uyuştuğunu gördüm. Şekil 2 üç ilkenin erişim erişim davranışını yan yana koyuyor.

![Üç satırlı bir ızgara şeması. En üstteki satır erişim diye etiketlenmiş ve on bir erişimin sayfa numaralarını sırayla veriyor: sıfır bir iki sıfır bir üç sıfır üç bir iki bir. Altındaki üç satır sırasıyla optimal, FIFO ve LRU diye etiketlenmiş ve her satırda on bir kare var; dolu kareler isabeti, boş kareler ıskayı gösteriyor. Optimal satırında ilk üç kare boş, dördüncü ve beşinci dolu, altıncı boş, yedinci sekizinci ve dokuzuncu dolu, onuncu boş, on birinci dolu; satırın sağında altı isabet yüzde elli dört virgül beş yazıyor. FIFO satırında ilk üç kare boş, dördüncü ve beşinci dolu, altıncı ve yedinci boş, sekizinci dolu, dokuzuncu ve onuncu boş, on birinci dolu; sağında dört isabet yüzde otuz altı virgül dört yazıyor. LRU satırı optimal satırıyla birebir aynı desende ve sağında altı isabet yüzde elli dört virgül beş yazıyor. Izgaranın altında dolu kare isabet, boş kare ıska açıklaması ve erişim dizisinin kendisi tekrar veriliyor. Şemanın en altında dört satır var: LRU bu dizide optimalle aynı sonucu veriyor ve FIFO sık kullanılanı yalnızca eski diye atıyor; Belady anomalisi, FIFO bir iki üç dört bir iki beş bir iki üç dört beş dizisinde üç çerçevede dokuz, dört çerçevede on ıska yapar; aynı dizide LRU üç çerçevede on, dört çerçevede sekiz ıska yapar ve kapsama özelliği anomaliyi engeller; sayılar kendi programımdan ve kaynağın verdiği isabet oranlarıyla birebir uyuşuyor](assets/degistirme-karsilastirmasi.svg "Şekil 2 — Aynı dizi, üç ilke: FIFO sayfanın önemini değil yaşını bilir")

FIFO'nun bir tuhaflığı daha var ve mülakatın gözde sorularından biridir. Önbelleği büyütmek isabet oranını artırmalı, değil mi? FIFO'da **artırmayabilir.** 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 dizisini kendi programımla koşturdum: FIFO üç çerçeveyle 9 ıska yapıyor, **dört çerçeveyle 10**. Buna **Belady anomalisi (Belady's anomaly)** denir. LRU'da bu imkânsızdır, çünkü LRU'nun **kapsama özelliği (stack property)** vardır: N + 1 boyutlu bir önbelleğin içeriği her zaman N boyutlunun içeriğini kapsar, dolayısıyla büyütmek isabet oranını ya korur ya artırır. Aynı diziyi LRU ile koşturduğumda üç çerçevede 10, dört çerçevede 8 ıska çıktı — beklendiği gibi. Terim uyarısı: bu özelliğin İngilizce adı *stack property*'dir ama veri yapısı olarak yığınla ilgisi yoktur; ad, ilkeleri sınıflandıran özgün çalışmadan gelir.

## İş yükü ilkeyi seçtirir

Küçük bir dizide iyi görünmek yetmez. Üç ayrı iş yükü üç ayrı ders verir.

**Yerelliği olmayan iş yükünde** — her erişim rastgele bir sayfaya — LRU, FIFO ve rastgele ilke **aynı** sonucu verir; isabet oranını yalnızca önbellek boyutu belirler. Buradan çıkan ders şudur: iş yükünde kullanılabilecek bir düzen yoksa geçmişe bakmanın hiçbir faydası yoktur.

**Seksen-yirmi iş yükünde** — erişimlerin yüzde 80'i sayfaların yüzde 20'sine — LRU açık ara öne geçer, çünkü sıcak sayfaları elinde tutar. Burada ilke seçimi gerçekten para eder.

**Döngüsel iş yükü** ise LRU'nun en kötü durumudur: 50 sayfa sırayla, sonra baştan. Bu iş yükünü 49 çerçeveyle kendi programımla koşturdum ve hem LRU hem FIFO **tam olarak sıfır isabet** verdi — 10.000 erişimin 10.000'i ıska. Sebep zarif bir talihsizliktir: her ilke, birazdan istenecek olan sayfayı atar. İlginç olan, aynı iş yükünde **rastgele** ilkenin daha iyi sonuç vermesidir; rastgeleliğin sessiz bir erdemi, tuhaf uç durumlarının olmamasıdır.

Karmaşıklık makalesinde ortalama durumun her zaman bir dağılım varsayımı taşıdığını söylemiştik. Burası o cümlenin en somut örneklerinden biri: LRU'nun üstünlüğü bir teorem değil, iş yükü hakkında bir bahistir.

## LRU'yu gerçekten uygulamak: saat algoritması

Kusursuz LRU'nun bir sorunu var: **her bellek erişiminde** muhasebe yapmak gerekir. Erişilen sayfayı listenin başına taşımak, ya da her sayfa için bir zaman damgası güncellemek — hem de komut getirmeleri dahil her erişimde. Donanım zaman damgasını tutsa bile çıkarma anında bütün sayfaları taramak gerekir; 4 GB belleği 4 KB'lik sayfalara böldüğünde bir milyon sayfa eder ve bu taramayı her sayfa hatasında yapmak düşünülemez.

Burada dinamik programlama makalesindeki takasın bir akrabası çalışıyor: **sakla ya da yeniden hesapla.** Kusursuz LRU tam sırayı saklar ve pahalıya saklar; yaklaşık çözüm ise neredeyse hiçbir şey saklamaz ve sıralamayı çıkarma anında kabaca yeniden üretir.

Bunun için donanımdan tek bir bit istenir: **kullanım biti (use bit)**. Bir sayfaya erişildiğinde donanım biti 1 yapar; biti sıfırlamak işletim sisteminin işidir. **Saat algoritması (clock algorithm)** bu biti şöyle kullanır: bütün sayfalar dairesel bir listeye dizilir ve bir "akrep" bir sayfayı gösterir. Çıkarma gerektiğinde akrebin gösterdiği sayfanın kullanım bitine bakılır. Bit 1 ise sayfa yakın zamanda kullanılmıştır; bit **sıfırlanır** ve akrep bir ilerler. Bit 0 ise o sayfa kurban seçilir. Böylece bütün belleği tarayan bir arama yapılmaz ve son turda kullanılmamış bir sayfa bulunur.

Bir iyileştirme daha yapılır. Çıkarılacak sayfa değiştirilmişse önce diske yazılmalıdır; değiştirilmemişse çerçeve doğrudan yeniden kullanılabilir. Bunu ayırt etmek için ikinci bir bit tutulur: **kirli bit (dirty bit)**. Saat algoritması önce hem kullanılmamış hem temiz bir sayfa arar, bulamazsa kullanılmamış ama kirli sayfalara döner.

Dürüst bir not: saat algoritmasını yukarıdaki on bir erişimlik oyuncak dizide de koşturdum ve 4 isabet verdi, yani FIFO ile aynı. Bu, saatin kötü olduğunu göstermez; on bir erişimlik bir dizide bir yaklaştırmanın kendini gösteremeyeceğini gösterir. Yaklaşık LRU'nun kazancı, kaynağın seksen-yirmi gibi gerçekçi iş yüklerinde ölçtüğü yerdedir: kusursuz LRU kadar iyi değildir, ama geçmişe hiç bakmayan ilkelerden belirgin biçimde iyidir.

> **Sesli anlat:** "FIFO, LRU ve optimal ilkeleri karşılaştır; LRU gerçek sistemlerde nasıl uygulanır? Doksan saniye."
>
> İyi bir cevabın omurgası: "Önce ölçüt: amaç ıska sayısını azaltmak, çünkü ortalama bellek erişim süresi bellek maliyeti artı ıska olasılığı çarpı disk maliyetidir ve disk bellekten yüz bin kat yavaş olduğu için küçük bir ıska oranı bile toplamı ele geçirir. Optimal ilke en uzak gelecekte kullanılacak sayfayı çıkarır; uygulanamaz ama karşılaştırma noktasıdır. FIFO sayfanın yaşını bilir, önemini bilmez — sık kullanılan bir sayfayı yalnızca ilk giren olduğu için atabilir; üstelik Belady anomalisine açıktır, yani önbelleği büyütmek isabet oranını düşürebilir. LRU geçmişe bakıp geleceği kestirir ve yerellik varsayımına dayanır; kapsama özelliği olduğu için anomali yaşayamaz. Denediğim on bir erişimlik dizide optimal ve LRU altı isabet, FIFO dört isabet verdi. Ama LRU'nun üstünlüğü bir teorem değil, iş yükü hakkında bir bahis: yerelliği olmayan bir iş yükünde bütün gerçekçi ilkeler eşitlenir, döngüsel bir iş yükünde ise LRU en kötü durumdadır — elli sayfalık bir döngüyü kırk dokuz çerçeveyle koşturduğumda isabet oranı tam sıfır çıktı. Uygulama tarafında kusursuz LRU yapılmaz, çünkü her bellek erişiminde muhasebe ve çıkarmada milyonlarca sayfayı tarama gerektirir. Onun yerine donanımdan bir kullanım biti alınır ve saat algoritmasıyla yaklaştırılır: akrep dairesel listede ilerler, kullanım biti bir olan sayfanın bitini sıfırlayıp geçer, sıfır bulduğunu kurban seçer. Kirli biti de hesaba katıp önce temiz sayfaları çıkarmak yazma maliyetinden kurtarır."

## Talep sayfalama ve çırpınma

Sayfa ne zaman getirilir? Varsayılan cevap **talep sayfalamadır (demand paging)**: sayfa ancak erişildiğinde getirilir. Alternatif, işletim sisteminin tahmin yürütüp önceden getirmesidir — **ön getirme (prefetching)** — ve yalnızca başarı şansı makul olduğunda yapılır; örneğin bir kod sayfası getirilirken bir sonrakinin de isteneceği tahmin edilebilir.

Yazma tarafında ayrı bir kalıp vardır: bekleyen yazmalar biriktirilip diske tek bir büyük yazma olarak gönderilir. Disk, çok sayıda küçük yazma yerine tek bir büyük yazmayı çok daha verimli yapar.

Değiştirme de her zaman son anda yapılmaz. Çoğu sistem bir alt ve bir üst eşik tutar; boş çerçeve sayısı alt eşiğin altına düşünce arka planda çalışan bir iş parçacığı devreye girip yeterince sayfa boşaltır. Böylece sayfa hatası anında boşaltma beklenmez ve birden çok sayfa tek seferde yazılabilir.

Peki bellek gerçekten yetmiyorsa? Çalışan süreçlerin etkin olarak kullandığı sayfaların — yani **çalışma kümelerinin (working set)** — toplamı fiziksel bellekten büyükse sistem sürekli sayfalama yapmaya başlar. Buna **çırpınma (thrashing)** denir ve belirtisi tanıdıktır: işlemci neredeyse boştur, disk sürekli çalışır, hiçbir iş ilerlemez.

İki tür cevap vardır. Klasik cevap **kabul denetimidir (admission control)**: süreçlerin bir alt kümesini hiç çalıştırmayıp kalanların çalışma kümelerinin belleğe sığmasını sağlamak. Arkasındaki ilke günlük hayatta da geçerlidir — az işi iyi yapmak, çok işi kötü yapmaktan iyidir. Modern ve daha sert cevap Linux'un bazı sürümlerindeki bellek yetersizliği katilidir: bellek aşırı yüklendiğinde bellek yiyen bir süreç seçilip öldürülür. Etkilidir, ama yanlış süreci seçerse kullanıcının oturumunu da beraberinde götürebilir.

## Mülakatta nasıl görünür

Bu konunun zinciri neredeyse standarttır: **sayfa hatası nedir → adım adım ne olur → bellek doluysa hangi sayfa çıkar → LRU'yu nasıl uygularsın → çırpınma nedir.** Dördüncü halka, ezberleyenle anlayanı ayıran yerdir.

Altı tipik hata var. **Sayfa hatasını yasadışı erişim sanmak** — ikisi de tuzak doğurur ama sayfa hatası meşru bir erişimin ıskasıdır; yasadışı erişim geçerlilik bitiyle, sayfa hatası bulunma bitiyle ilgilidir. **Sayfa hatasını donanımın çözdüğünü söylemek** — işleyici işletim sistemindedir. **Değiştirme ilkesini ölçütsüz karşılaştırmak** — önce AMAT, sonra ilke. **Belady anomalisini LRU'ya da yakıştırmak** — kapsama özelliği yüzünden LRU'da imkânsızdır. **Kusursuz LRU uygulandığını sanmak** — gerçek sistemler kullanım bitiyle yaklaştırır; saat algoritması bunun en bilinen hâlidir. **Çırpınmayı yavaşlık sanmak** — çırpınma, işlemcinin boş kalıp diskin dolu olduğu özel bir çöküş biçimidir.

Bir de büyük resim refleksi: sanal belleğin bütün düzeneği aynı üç soruya indirgenebilir — çeviriyi kim yapar (donanım, TLB ve tablo), sayfa yoksa ne olur (tuzak ve işleyici), yer yoksa kim çıkar (değiştirme ilkesi). Bu üçlüyü söyleyebiliyorsan ayrıntıları oradan türetebilirsin.

İngilizce karşılıklar hazır olmalıdır: *swap space*, *present bit*, *page fault*, *page-fault handler*, *demand paging*, *prefetching*, *replacement policy*, *average memory access time (AMAT)*, *compulsory (cold-start) miss*, *optimal replacement*, *FIFO*, *least recently used (LRU)*, *Belady's anomaly*, *stack property*, *use (reference) bit*, *clock algorithm*, *dirty bit*, *working set*, *thrashing*, *admission control*.

### Sırada ne var

Diski bu makalede yalnızca bir kurtarma alanı olarak kullandık: sayfalar oraya gitti, oradan geri geldi. Ama disk asıl işini henüz yapmadı.

Sıradaki makale kalıcılığa geçiyor: dosya ve dizin soyutlamaları, bir dosyanın bloklarının diskte nasıl izlendiği ve tamponlamanın neden bu kadar belirleyici olduğu. Veri yapıları makalesinde bıraktığımız iki borç orada ödenecek — disk tabanlı arama yapıları ve ayırma yöntemleri — ve buradaki "sakla ya da yeniden hesapla" takası, dosya sistemi önbelleği olarak yeniden karşımıza çıkacak.

## Kaynakça

- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 21: Beyond Physical Memory: Mechanisms — diskte **takas alanı** ayrılması ve sayfa boyutunda okuma/yazma yapılması; **bulunma bitinin** tanımı ("If the present bit is set to one, it means the page is present in physical memory… if it is set to zero, the page is not in memory but rather on disk somewhere"); **sayfa hatası** terimi ve adlandırma eleştirisi ("really, it should be called a page miss"), hatanın donanımın istisna doğurup denetimi işletim sistemine vermesinden geldiği; **sayfa hatası işleyicisinin** disk adresini sayfa tablosu girdisinde bulması, okuma bitince girdiyi güncelleyip komutu yeniden denemesi ve TLB'nin bu sırada güncellenmesi; disk giriş/çıkışı sürerken sürecin **engellenmiş** durumda olması ve işlemcinin başka bir sürece verilmesi; sayfa hatalarının neden donanımda değil yazılımda işlendiği (diskin zaten yavaş olması ve donanımın takas alanını bilmek zorunda kalması); **alt ve üst eşik** ile arka plandaki takas iş parçacığının birden çok sayfayı birlikte boşaltması. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 22: Beyond Physical Memory: Policies — fiziksel belleğin sanal bellek sayfaları için bir **önbellek** olarak görülmesi; **AMAT** formülü ve sayısal örnek (bellek 100 ns, disk 10 ms; yüzde 90 isabette yaklaşık 1 ms, yüzde 99,9 isabette 10,1 mikrosaniye — "roughly 100 times faster"); **optimal ilkenin** Belady'ye ait olması ve en uzak gelecekte kullanılacak sayfayı çıkarması, ayrıca yalnızca karşılaştırma noktası olarak kullanılabilmesi; 0, 1, 2, 0, 1, 3, 0, 3, 1, 2, 1 erişim dizisi ve üç çerçeveyle **optimal 6 isabet / yüzde 54,5**, **FIFO 4 isabet / yüzde 36,4**, **LRU'nun optimalle aynı sonucu vermesi**; **zorunlu ıska** tanımı; **Belady anomalisi** ve 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 dizisi, LRU'nun **stack property** sayesinde anomaliye bağışık olması; üç iş yükü — yerelliği olmayan iş yükünde bütün gerçekçi ilkelerin eşitlenmesi, seksen-yirmi iş yükünde LRU'nun öne geçmesi, döngüsel iş yükünde 50 sayfa ve 49 çerçeveyle LRU ve FIFO'nun **yüzde 0 isabet** vermesi ve rastgele ilkenin daha iyi durması; kusursuz LRU'nun her erişimde muhasebe gerektirmesi ve 4 GB bellek / 4 KB sayfa ile bir milyon sayfayı taramanın maliyeti; **kullanım biti** ve **saat algoritması**; **kirli bit** ile temiz sayfaların önce çıkarılması; **talep sayfalama**, **ön getirme** ve yazmaların gruplanması; **çırpınma**, çalışma kümesi kavramı, **kabul denetimi** ve Linux'un bellek yetersizliği katili. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Silberschatz, A., Galvin, P. B. & Gagne, G. *Operating System Concepts*, onuncu baskı — bu makalenin kapsamının ders kitabı karşılığı **Chapter 10 Virtual Memory**'dir; ilgili alt bölümler resmî içindekiler tablosundan doğrulanmıştır: 10.1 Background, 10.2 Demand Paging, 10.3 Copy-on-Write, 10.4 Page Replacement, 10.5 Allocation of Frames, 10.6 Thrashing, 10.7 Memory Compression. Takas alanı yönetimi ayrıca 11.6 Swap-Space Management bölümündedir. John Wiley & Sons. [Bağlantı](https://www.os-book.com/OS10/index.html)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE322 — Operating Systems* — bu makalenin resmî dayanağı katalog tanımındaki "virtual memory, page replacement algorithms" ifadesidir; sayfa 2026-09-10'da doğrulanmıştır. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe322/)
