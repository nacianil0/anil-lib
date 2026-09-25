---
article_id: article_fe3deee8-df80-4e54-be55-cc8ad74ac9b2
title: "CPU Zamanlama: Ölçütler, Kurallar ve Geri Besleme"
slug: cpu-zamanlama-olcutler-kurallar-ve-geri-besleme
category: operating-systems
level: advanced
reading_order: 28
summary: "Hazır kümesinde birden çok süreç varken çekirdek hangisini seçer? Önce ölçüt tanımlanır — dönüş süresi ve tepki süresi —, sonra kurallar önerilip karşı örnekle kırılır: FCFS ve konvoy etkisi, en kısa iş önce ve önkesmeli hâli, round-robin'in tepki süresini iyileştirip dönüş süresini bozması. Zaman dilimi ile bağlam anahtarı ek yükü arasındaki takas sayıyla; geleceği bilmeyen bir çizelgeleyicinin geçmişten öğrenmesi (çok seviyeli geri besleme kuyruğu), Linux'un vruntime ve kırmızı-siyah ağaç ile oranlı paylaşımı, çok işlemcide önbellek yakınlığı ve bir çizelgeleyicinin 'yeterince iyi' olduğunu ispatlamanın kalıbı."
tags:
  - cpu-zamanlama
  - donus-suresi
  - tepki-suresi
  - round-robin
  - geri-besleme-kuyrugu
content_hash: sha256:6fddb9d3fa20c0448309e4a14a9ff6f54e25d1bbd62dc34dc5a8f6cc5fe06848
classification_version: 1
classification_batch: 9
---
## Hazır kümesinden hangisi?

Süreçler makalesi bir durum makinesi kurdu ve bir soruyu kasıtlı olarak açıkta bıraktı. Hazır kümesinde beş süreç varken zamanlayıcı kesmesi geliyor, çekirdek denetimi geri alıyor — sonra? Beşinden **hangisini** çalıştıracak?

Kararı veren bileşenin adı **çizelgeleyici (scheduler)**, verdiği karara götüren kurala da **çizelgeleme ilkesi (scheduling policy)** denir. İşletim sistemi makalesinde kurduğumuz ilke ile düzenek ayrımı ilk kez burada tam anlamıyla iş görüyor: bağlam anahtarı bir **düzenektir**, yani "nasıl" sorusunun cevabıdır ve önceki makalede ölçüldü; hangi sürecin ne kadar çalışacağı ise **ilkedir**, yani "hangisi" sorusunun cevabıdır ve bu makalenin konusudur.

Yöntem tanıdık gelecek, çünkü algoritma tasarımı bölümünün refleksleriyle birebir aynı: önce ölçüt tanımla, sonra kural öner, kuralı küçük bir karşı örnekle kırmayı dene, ayakta kalan kuralı koşullarıyla savun.

## Ölçütü tanımlamadan karşılaştırma yapılamaz

Çizelgeleme literatürü, çalıştırılacak birime **iş (job)** der; bir süreç ya da bir iş parçacığı olabilir. Sistemdeki işlerin toplamına **iş yükü (workload)** denir ve bir ilkeyi savunmadan önce iş yükü hakkında ne varsaydığını söylemek zorundasın. Klasik anlatım beş varsayımla başlar ve hepsini tek tek gevşetir: bütün işler aynı süre çalışır, hepsi aynı anda gelir, başlayan iş bitene kadar çalışır, işler yalnızca işlemci kullanır, her işin süresi önceden bilinir. Beşi de gerçekçi değildir; öğretici olan, her birini gevşettiğimizde hangi kuralın çöktüğüdür.

İki ölçüt yeter. **Dönüş süresi (turnaround time)**, işin tamamlandığı an ile sisteme geldiği an arasındaki farktır:

T_dönüş = T_tamamlanma − T_geliş

**Tepki süresi (response time)** ise işin sisteme gelişi ile **ilk kez** çalıştırılışı arasındaki farktır:

T_tepki = T_ilk_çalışma − T_geliş

Birincisi bir toplu iş ölçütüdür: işin bitmesini bekleyen biri vardır. İkincisi bir etkileşim ölçütüdür: terminalde oturmuş, tuşa bastıktan sonra ekranda bir şey görmeyi bekleyen biri vardır. Üçüncü bir ölçüt olarak **adalet (fairness)** de vardır ve neredeyse her zaman başarımla çatışır.

Bu, karmaşıklık makalesindeki "n nedir?" disiplininin işletim sistemi karşılığıdır. Orada maliyeti nereden saydığını söylemeden karmaşıklık iddiası kuramıyordun; burada hangi ölçütü optimize ettiğini söylemeden "bu çizelgeleyici daha iyidir" diyemezsin. İlkelerin adları ve klasik örnekleri kaynaktandır; aşağıdaki ortalamaları bu iki tanımdan yeniden hesapladım, küçük bir benzetim programıyla ayrıca doğruladım ve kaynağın verdiği değerlerle aynı çıktılar. Ek yük yüzdeleri ise yalnızca benim hesabımdır.

## FCFS ve konvoy etkisi

En basit kural, kuyruğa ilk gireni ilk çalıştırmaktır: **FIFO** ya da **FCFS (First Come, First Served)**. Uygulaması iki satırdır ve eşit uzunluktaki işlerde iyi çalışır.

Kırmak için tek bir küçük girdi yeter. A işi 100 birim, B ve C onar birim sürsün ve üçü de t = 0'da gelsin; FCFS onları geliş sırasıyla çalıştırsın. Tamamlanma anları 100, 110 ve 120'dir, dolayısıyla ortalama dönüş süresi (100 + 110 + 120) / 3 = **110**'dur. Aynı üç işi kısa olanlardan başlayarak çalıştırsaydın tamamlanma anları 10, 20 ve 120 olacak, ortalama **50**'ye düşecekti. Aradaki fark iki kattan fazladır ve tek nedeni sıralamadır.

Bu tuzağın adı **konvoy etkisidir (convoy effect)**: kısa işler, kaynağı uzun süre tutan bir işin arkasında birikir. Marketteki tek kasa kuyruğunda önündeki kişinin üç dolu sepetle beklediğini gördüğündeki his budur.

Açgözlü algoritmalar makalesinde kurduğumuz refleks burada aynen geçerli: bir seçim kuralı önerildiğinde önce onu kırmaya çalış. FCFS'i kıran girdi bir satırlıktır ve mülakatta bu girdiyi hemen üretebilmek beklenir.

## En kısa iş önce ve önkesmenin gerekliliği

Kural açık: kısa işi öne al. Bunun adı **SJF (Shortest Job First)**, yani en kısa iş önce kuralıdır ve yukarıdaki iş yükünde ortalama dönüş süresini 110'dan 50'ye indirir.

Şimdi ikinci varsayımı gevşetelim: işler herhangi bir anda gelebilsin. A, t = 0'da gelip 100 birim çalışsın; B ve C, t = 10'da gelip onar birim sürsün. SJF **önkesmesizdir (non-preemptive)**: başlayan işi bitirir. A çalışmaya başlamıştır, dolayısıyla B ve C onun bitmesini bekler; ortalama dönüş süresi 103,33 olur. Bu girdide SJF, FCFS ile birebir aynı çizelgeyi üretir — kural değişti ama sonuç değişmedi, çünkü kararın verildiği an geçmişti.

Eksik olan, kuralın kendisi değil, kararı **yeniden verebilme** yetkisidir. Üçüncü varsayımı da gevşetip çalışan bir işi durdurabilirsek kural şuna dönüşür: her yeni iş geldiğinde, kalan süresi en az olanı çalıştır. Adı **STCF (Shortest Time-to-Completion First)**, yani en kısa kalan süre önce kuralıdır ve **önkesmelidir (preemptive)**. Aynı iş yükünde A on birim çalışır, B ve C araya girip biter, sonra A kalan doksan birimini tamamlar; ortalama dönüş süresi **50**'ye düşer.

Buradaki asıl ders bir yetki devridir. Önkesme, önceki iki makalede kurduğumuz düzeneğin — zamanlayıcı kesmesi ve bağlam anahtarı — olmadan var olamaz. Modern çizelgeleyicilerin neredeyse hepsi önkesmelidir; işbirliğine dayalı yaklaşımın sonsuz döngüde çöktüğünü işletim sistemi makalesinde görmüştük.

Bir de model uyarısı: SJF'nin "bütün işler aynı anda gelirse dönüş süresi açısından optimal olduğu", STCF'nin de gelişler serbestken optimal olduğu ispatlanabilir. Ama bu iddia iki varsayıma yaslanır — işlerin süresi biliniyor ve tek ölçüt dönüş süresi. İkisi de birazdan düşecek.

![Dikey bir çizgiyle ayrılmış iki panelli bir zaman çizelgesi şeması. Sol panelin başlığı dönüş süresi ölçütü. Altında iş kümesi yazıyor: A sıfırıncı anda gelir ve yüz birim sürer, B ile C onuncu anda gelir ve onar birim sürer. Panelde iki yatay zaman çizgisi var. Üstteki çizginin etiketi FCFS ve SJF, aynı çizelge; çizgi üzerinde çok geniş bir A bloğu, ardından iki dar blok olarak B ve C duruyor; hemen altında ortalama dönüş süresinin yüz üç virgül üç olduğu yazıyor. Alttaki çizginin etiketi STCF, yani önkesmeli; çizgi üzerinde önce dar bir A bloğu, sonra B ve C blokları, sonra geniş ve kalanı diye etiketlenmiş ikinci bir A bloğu var; A'nın iki parçası da vurgulanmış ve hemen altında ortalama dönüş süresinin elli olduğu yazıyor. Panelin en altında sıfırdan yüz yirmiye giden bir zaman ekseni var. Sağ panelin başlığı tepki süresi ölçütü. Altında iş kümesi yazıyor: A, B ve C sıfırıncı anda gelir ve her biri beş birim sürer. Panelde yine iki yatay zaman çizgisi var. Üstteki çizginin etiketi SJF; üzerinde art arda üç eşit blok, A, B ve C sırasıyla duruyor; altında ortalama tepki süresinin beş, ortalama dönüş süresinin on olduğu yazıyor. Alttaki çizginin etiketi round robin, dilim bir birim; üzerinde on beş dar blok A B C A B C biçiminde dönüşümlü sıralanmış ve ilk üç blok vurgulanmış; altında ortalama tepki süresinin bir, ortalama dönüş süresinin on dört olduğu yazıyor. Bu panelin de en altında sıfırdan on beşe giden bir zaman ekseni var. Şemanın en altında iki panele birden ait üç satır duruyor: aynı iş kümesi, iki ölçüt, ters işaret; tepki süresini beşten bire indiren kural dönüş süresini ondan on dörde çıkarır; önkesme yetkisi olmadan SJF, bu iş kümesinde FCFS ile aynı çizelgeyi üretir](assets/zamanlama-gantt.svg "Şekil 1 — Aynı işler, farklı kurallar: bir ölçütte kazanan kural ötekinde kaybeder")

## Tepki süresi başka bir kural seçtirir

Zaman paylaşımlı makineler ortaya çıkınca ikinci ölçüt doğdu. Terminalde oturan kullanıcı işinin ne zaman biteceğiyle değil, ekranın ne zaman kıpırdayacağıyla ilgilenir.

Üç iş de beşer birim sürsün ve hepsi t = 0'da gelsin. SJF onları sırayla çalıştırır; tepki süreleri 0, 5 ve 10, ortalaması **5**'tir. Alternatif kural şudur: her işi bir **zaman dilimi (time slice)** — bazen **zamanlama kuantumu (scheduling quantum)** — kadar çalıştır, sonra kuyruktaki sıradakine geç. Adı **round-robin (RR)**, yani sıra ile çalıştırmadır. Dilim bir birimken çizelge A B C A B C … olur; tepki süreleri 0, 1 ve 2, ortalaması **1**'dir.

Şimdi aynı çizelgeye öteki ölçütle bak. Round-robin altında A 13'te, B 14'te, C 15'te biter; ortalama dönüş süresi **14**'tür. SJF'de aynı sayı **10**'du. Round-robin, dönüş süresi ölçütünde FCFS'ten bile kötü olabilir, çünkü yaptığı iş her işi mümkün olduğunca **uzatmaktır**.

Bu bir uygulama kusuru değil, yapısal bir takastır: işlemciyi kısa ölçekte eşit bölen her adil kural dönüş süresinde kötüdür. Adaletten vazgeçersen kısa işleri bitirebilirsin; adaleti seçersen tepki süresi kazanır, dönüş süresi kaybeder. Şekil 1 iki ölçütü yan yana koyuyor ve işaretlerin nasıl ters döndüğünü gösteriyor.

## Zaman dilimini küçültmenin bedeli

Önceki makale bağlam anahtarının maliyetini ölçmüş ve bir söz vermişti: dilim küçüldükçe tepki süresi iyileşir, ek yük büyür. Sayılar şöyle. Bir bağlam anahtarı 6 mikrosaniye sürsün. Dilim 10 ms ise saniyede en fazla 100 anahtar olur ve ek yük **%0,06**'dır — ihmal edilebilir. Dilim 1 ms'ye inerse ek yük **%0,6**, 100 mikrosaniyeye inerse **%5,7** olur. Anahtarın maliyeti sabit, dilim ise değişkendir; oran doğrudan bölmeden çıkar.

Kalıbın adı tanıdık: **amortize etme**. Veri yapıları makalesinde dinamik dizinin kopyalama maliyetini çok sayıda ekleme üzerine yaymıştık; burada sabit bir anahtar maliyetini daha uzun bir dilime yayıyoruz. Uyarıyı da tekrarlayalım: amortize etmek maliyeti yok etmez, seyrekleştirir.

İki incelik daha var. Birincisi, bağlam anahtarının gerçek bedeli yazmaç kaydetmekten ibaret değildir. Çalışan program önbelleklerde, TLB'de ve dal öngörücülerinde durum biriktirir; başka bir işe geçmek bu durumu boşa çıkarır. İkincisi, round-robin'in tepki süresi tavanı basit bir formüldür: N iş ve q dilimiyle en kötü durumda bir iş (N − 1)·q kadar bekler. Yüz iş ve 10 ms dilimle bu **990 ms** eder — kullanıcının fark ettiği bir gecikmedir. Doğru cevap bu yüzden "dilim küçük olsun" değil, "anahtar maliyetini amorti edecek kadar büyük, sistemi tepkisiz bırakmayacak kadar küçük olsun"dur.

> **Sesli anlat:** "FCFS'in kötü olduğu bir girdi ver ve neden kötü olduğunu ölçütle açıkla. Round-robin dönüş süresini iyileştirir mi? Doksan saniye."
>
> İyi bir cevabın omurgası: "Önce ölçütü söylemem lazım. Dönüş süresi, tamamlanma eksi geliş; tepki süresi, ilk çalıştırılma eksi geliş. FCFS'i kırmak için üç iş yeter: biri yüz, ikisi onar birim, hepsi sıfırıncı anda gelsin. FCFS geliş sırasıyla çalıştırırsa ortalama dönüş süresi 110; kısa olanları öne alırsam 50. Buna konvoy etkisi denir, kısa işler uzun işin arkasında birikir. Round-robin dönüş süresini iyileştirmez, tam tersine **kötüleştirir**: aynı üç işi beşer birim yaparsam, sırayla çalıştırmada ortalama dönüş 10, round-robin'de 14 olur, çünkü round-robin her işi mümkün olduğunca uzatır. İyileştirdiği şey tepki süresidir: 5'ten 1'e iner. Yani ölçütü söylemeden 'daha iyi' diyemem; adil olan her kural dönüş süresinde kaybeder. Dilimi küçültmenin bedeli de sayısaldır: 6 mikrosaniyelik bir anahtar 10 ms'lik dilimde on binde altı, 100 mikrosaniyelik dilimde yüzde beşin üstünde ek yük demektir."

## Giriş/çıkış ve gerçek iş yükü

Dördüncü varsayımı da gevşetelim: işler giriş/çıkış yapar. Bir iş diske istek gönderdiğinde işlemciyi kullanmaz, engellenmiş duruma geçer; çizelgeleyicinin orada bir kararı vardır. Standart yaklaşım, bir işin her **işlemci parçasını** ayrı bir iş saymaktır. On milisaniye çalışıp giriş/çıkış yapan bir iş, elli milisaniye boyunca yalnızca hesap yapan bir işle karşılaştırıldığında STCF ilkesi kısa olanı seçer; o giriş/çıkışını beklerken uzun iş çalışır. Böylece işlemci ile disk **örtüşür** ve ikisi de boş kalmaz. Süreçler makalesinde çoklu programlamanın gerekçesi olarak anlattığımız örtüşme, çizelgeleyici tarafında bu kuralla gerçekleşir.

## Geleceği bilmeyen çizelgeleyici: geri besleme

Beşinci varsayım en kötüsüdür: işletim sistemi bir işin ne kadar süreceğini **bilmez**. O hâlde SJF'yi nasıl taklit edeceğiz? Cevap, kâhinliği tahminle değiştirmektir: geçmişe bak, geleceği kestir.

Bunu yapan klasik yapıya **çok seviyeli geri besleme kuyruğu (Multi-Level Feedback Queue, MLFQ)** denir. Farklı öncelik düzeylerinde birden çok kuyruk vardır; bir iş her an tam olarak bir kuyruktadır. Kurallar beş tanedir:

1. Önceliği yüksek olan çalışır.
2. Öncelikleri eşit olanlar kendi aralarında round-robin ile çalışır.
3. Sisteme yeni giren iş **en yüksek** önceliğe konur.
4. Bir iş bulunduğu düzeydeki tahsisini tükettiğinde — işlemciyi kaç kez bıraktığından bağımsız olarak — önceliği bir düşer.
5. Belirli bir S süresi geçtiğinde bütün işler en üst kuyruğa taşınır.

Üçüncü kural, cehaleti iyimserliğe çeviren adımdır: iş kısa **olabilir** varsayılır ve en yüksek öncelik verilir. Gerçekten kısaysa hemen biter ve SJF'ye benzer bir davranış elde edilir; uzunsa kuyrukları yavaşça iner ve kendini ele verir.

Dördüncü ve beşinci kurallar birer yamadır ve ikisi de karşı örnekle doğmuştur. Yalnızca ilk üç kural varken uzun işler **açlığa (starvation)** düşer: yeterince çok etkileşimli iş varsa işlemciyi hiç göremezler. Beşinci kural bunu çözer ve ikinci bir fayda daha getirir — davranışı değişen, yani hesap ağırlıklıyken etkileşimliye dönen bir iş yeniden yukarı taşınır. Dördüncü kuralın önceki hâli ise işlemciyi tahsisi bitmeden gönüllü bırakan işi cezalandırmıyordu; bunu fark eden bir program tahsisinin %99'unu kullanıp gereksiz bir giriş/çıkış yaparak önceliğini sonsuza kadar koruyabilir, yani **çizelgeleyiciyi oynatabilirdi**. Muhasebeyi düzeyde biriktirmek — "nasıl harcadığın değil, ne kadar harcadığın önemli" — bu açığı kapatır.

S'nin değeri ise sistem tasarımının kirli sırrıdır: çok büyük seçilirse uzun işler açlığa düşer, çok küçük seçilirse etkileşimli işler paylarını alamaz. Bu tür sayılara **büyücü sabitleri (voo-doo constants)** denir ve genellikle yöneticiye bırakılır. Somut bir örnek: Solaris'in zaman paylaşımı sınıfında varsayılan yapılandırma 60 kuyruk, en yüksek öncelikte 20 milisaniyeden başlayıp en düşükte birkaç yüz milisaniyeye çıkan dilimler ve yaklaşık saniyede bir öncelik yükseltmesi kullanır. Kuyruk düzeyine göre dilim uzunluğunun değişmesi de bilinçlidir: üstteki kuyruklarda etkileşimli işler vardır ve aralarında hızla dönmek anlamlıdır, alttaki kuyruklarda hesap ağırlıklı işler vardır ve uzun dilim daha az anahtar demektir. Şekil 2 solda beş kuralı, sağda iki farklı işin kuyruklar arasındaki yolculuğunu topluyor.

![Dikey bir çizgiyle ayrılmış iki panelli bir şema. Sol panelin başlığı çok seviyeli geri besleme kuyruğunun beş kuralı. Panelde alt alta beş çerçeveli satır var. Birincide önceliği yüksek olan çalışır yazıyor. İkincide öncelikler eşitse round robin yazıyor. Üçüncü satır vurgulanmış ve yeni gelen iş en üst kuyruğa girer diyor; hemen altında iyimser varsayım, yani işin kısa olabileceği notu var. Dördüncü satır da vurgulanmış ve bir iş bulunduğu düzeydeki tahsisini tükettiğinde bir alt kuyruğa iner diyor; hemen altında işlemciyi kaç kez bıraktığının önemsiz olduğu ve oyunu bunun engellediği yazıyor. Beşinci satırda S süresi dolunca bütün işler en üst kuyruğa taşınır yazıyor; hemen altında açlığı bu kuralın engellediği notu var. Panelin altında iki satır: dördüncü ve beşinci kural yamadır, ikisi de karşı örnekle doğdu; S büyük seçilirse uzun işler aç kalır, küçük seçilirse etkileşimli işler pay alamaz. Sağ panelin başlığı işlerin kuyruklar arasındaki yolculuğu. Panelde üç yatay kuyruk şeridi var; en üstte yüksek öncelikli Q2, ortada Q1, en altta düşük öncelikli Q0 yazıyor ve her şeridin sağında dilim uzunlukları on, yirmi ve kırk milisaniye olarak duruyor. Şeritlerin üzerinde iki iz çizilmiş. Birinci iz koyu ve uzun bir işi gösteriyor: Q2 de bir dilim çalışıp aşağı iner, Q1 de bir dilim çalışıp yine iner, Q0 da kalır; inişler kısa aşağı oklarla gösterilmiş. İkinci iz soluk ve etkileşimli bir işi gösteriyor: Q2 de kısa kısa çalışıp her seferinde giriş çıkış için bırakır ve aynı seviyede kalır. Şeritlerin sağ ucunda dikey kesikli bir çizgi var; bu çizgi boyunca Q0 daki koyu izden Q2 ye çıkan yukarı bir ok uzanıyor ve çizginin ne anlama geldiği panelin altındaki not satırında yazıyor. Panelin altında bir satır: geçmişe bakıp geleceği kestiren bir çizelgeleyici, kısa işi bilmeden kısa işe benzer davranır](assets/mlfq-kurallar.svg "Şekil 2 — Kâhinlik yerine geri besleme: iş kendini davranışıyla ele verir")

## Kuyruğu kim tutuyor?

Buraya kadar hep ilkeden konuştuk; ilkenin bir de veri yapısı vardır ve Faz B'nin bütün maliyet muhasebesi burada geri döner.

Heap makalesinde öncelik kuyruğunu arayüz olarak tanımlamış ve ilkel gerçekleştirimlerin sınırını göstermiştik: sırasız dizide ekleme ucuz, en küçüğü çekmek pahalı; sıralı dizide tersi. Öncelikli ve çok seviyeli zamanlamanın istediği de bu arayüzdür — "en yüksek öncelikliyi ver" ve "bir işin önceliğini değiştir". MLFQ'nun kuyruk başına round-robin listesi bu arayüzün en ucuz gerçekleştirimidir; öncelik sayısı sabit olduğu için dizi yeter.

Linux'un yıllarca kullandığı **Tümüyle Adil Çizelgeleyici (Completely Fair Scheduler, CFS)** ise farklı bir yol seçer (çekirdek 6.6 sürümüyle, aynı sanal çalışma zamanı fikrini koruyan EEVDF'e geçmeye başladı; aşağıdaki anlatım CFS'indir) ve bu yol bizim için daha öğretici. CFS sabit dilim yerine her sürecin biriktirdiği **sanal çalışma zamanını (vruntime)** sayar ve her kararda vruntime'ı en küçük olanı çalıştırır. Dilim de dinamiktir: `sched_latency` — tipik değeri 48 ms — çalışabilir süreç sayısına bölünür. Dört süreç varsa dilim 12 ms olur. Süreç sayısı artınca dilim tehlikeli biçimde küçüleceği için bir alt sınır konur: `min_granularity`, tipik olarak 6 ms. On süreçte hesap 4,8 ms verir ama alt sınır devreye girer ve dilim 6 ms olur; bunun sonucu, tam adaletin hedeflendiği turun 48 değil **60 ms** sürmesidir. Bu, hedefin sessizce gevşetildiği yerdir ve bu aritmetik bana aittir.

Öncelik burada klasik Unix `nice` değeriyle verilir: −20 ile +19 arasında, varsayılanı 0. CFS her nice değerini bir ağırlığa eşler ve dilimi ağırlıkların oranından hesaplar. İki süreçten birine nice −5 (ağırlık 3121), ötekine nice 0 (ağırlık 1024) verilirse birincinin payı 3121 / 4145 = **%75,3**, yani 48 ms'nin 36,1 ms'si olur. Ağırlık tablosu, nice farkı sabit kaldığında oranın da yaklaşık sabit kalacağı biçimde seçilmiştir: nice 5 ile 10 çifti aynı hesapla %75,28 verir — aynı değil, ama pratik olarak aynıdır.

Asıl vurgu veri yapısında. Binlerce çalışabilir süreç arasından en küçük vruntime'ı bulmak sıralı bir listede doğrusal zaman ister; CFS bunun yerine süreçleri vruntime'a göre bir **kırmızı-siyah ağaçta** tutar ve ekleme, silme, en küçüğü bulma işlemlerinin hepsi logaritmik olur. Dengeli arama ağaçları makalesinde "en kötü durumda da logaritmik yükseklik garantisi" diye anlattığımız yapı, çekirdeğin sıcak yolunda bu yüzden kullanılıyor: dört bin süreçte doğrusal tarama dört bin adım, ağaç yaklaşık on iki adımdır. Uykuya giden süreçler ağaçtan çıkarılır; ağaçta yalnızca çalışabilir olanlar durur.

Bir de desen tekrarı var. En kısa iş önce, en kısa kalan süre önce, round-robin ve vruntime kuralları **aynı iskeleti** paylaşır: hazır kümesinden bir anahtara göre en iyisini seç, çalıştır, anahtarı güncelle. Graf algoritmaları makalesinde Prim ile Dijkstra'nın tek farkının kuyruğa konan anahtar olduğunu görmüştük; burada da tek fark anahtarın ne olduğudur — kalan süre mi, geliş sırası mı, biriken sanal zaman mı.

## Çok işlemcide: yakınlık, denge ve "en fazla iki katı"

Tek işlemci varsayımını da bırakalım. İlk akla gelen çözüm, tek bir hazır kuyruğunu bütün işlemcilerin paylaşmasıdır. İki sorunu vardır. Birincisi ölçeklenmez: kuyruk paylaşılan bir veri yapısıdır ve kilitlenmesi gerekir, işlemci sayısı arttıkça sistem kilit beklemekle vakit geçirir. İkincisi **önbellek yakınlığını (cache affinity)** bozar: bir süreç çalıştığı işlemcinin önbelleğinde durum biriktirir ve her seferinde başka bir işlemcide çalıştırılırsa bu durumu yeniden kurmak zorunda kalır.

Alternatif, işlemci başına bir kuyruk tutmaktır. Ölçeklenir ve yakınlığı kendiliğinden korur, ama yeni bir sorun doğurur: **yük dengesizliği**. Bir kuyruk boşalırken öteki dolu kalabilir, hatta bir işlemci tümüyle boş dururken bir başkasında iki iş sırayla çalışabilir. Çözüm, işleri kuyruklar arasında **göçürmektir (migration)**; yaygın tekniğin adı **iş çalmadır (work stealing)**: az iş kalan kuyruk ara sıra bir başkasına bakar ve orası belirgin biçimde doluysa bir iş çalar. Ne kadar sık bakacağın yine bir takastır — çok sık bakmak ölçeklenmeyi bozar, seyrek bakmak dengesizliği büyütür.

Şimdi alt sınırlar makalesinden bir alacağımızı tahsil edelim. Orada **açgözlü çizelgeleyici teoremini** görmüştük: hazır iş varken hiçbir işlemciyi boş bırakmayan bir çizelgeleyici T_P ≤ T₁/P + T∞ süresini sağlar ve bu, **optimalin en fazla iki katıdır**. İş çalma bu ideale yaklaşır ama birebir aynısı değildir: boşalan işlemci iş aramaya çıkar, ama çalacak iş ararken kısa bir süre boş kalabilir; bu yüzden teoremin sınırı ona olduğu gibi aktarılamaz. Bir model farkı daha var: o teorem bağımlılık DAG'ı olan tek bir hesabı P işlemcide çizelgelemekle ilgilidir, buradaki iş kümesi ise birbirinden bağımsızdır. Taşınan şey teorem değil, **savunma biçimidir**: bir çizelgeleyicinin optimal olduğunu ispatlayamıyorsan, optimalden ne kadar uzaklaşabileceğini sınırlarsın. SJF için "şu varsayımlar altında optimaldir" dersin; round-robin için optimal değildir, o yüzden en kötü durumunu (N − 1)·q ile sınırlarsın. Mülakatta "bu çizelgeleyici iyi mi?" sorusuna verilecek olgun cevap budur.

> **Sesli anlat:** "Zaman dilimini küçültmenin bedeli nedir, sayıyla anlat. MLFQ neden beş kurala ihtiyaç duyuyor? Doksan saniye."
>
> İyi bir cevabın omurgası: "Dilim küçüldükçe tepki süresi iyileşir, çünkü bir işin sırasını beklemesi en kötü durumda N eksi bir çarpı dilim kadardır. Bedeli sabit anahtar maliyetinin daha sık ödenmesidir: altı mikrosaniyelik bir anahtar on milisaniyelik dilimde on binde altı ek yük, yüz mikrosaniyelik dilimde yüzde beşin üstü olur; ayrıca önbellek ve TLB durumu da boşa gider. Yani dilim, anahtarı amorti edecek kadar büyük, sistemi tepkisiz bırakmayacak kadar küçük seçilir. MLFQ'ya gelince: ilk üç kural iyimserlik kurallarıdır — yeni iş en üst kuyruğa girer, uzun olduğunu davranışıyla ele verir ve aşağı iner, böylece süreyi bilmeden SJF'ye benzer davranırız. Kalan iki kural karşı örnekle doğdu: yalnızca bu üçüyle uzun işler açlığa düşer, o yüzden S süresinde bir herkes en üste taşınır; ve işlemciyi gönüllü bırakan iş cezalandırılmazsa program tahsisinin doksan dokuzunu kullanıp gereksiz bir giriş/çıkış yaparak çizelgeleyiciyi oynatır, o yüzden muhasebe düzey bazında biriktirilir."

## Mülakatta nasıl görünür

Bu makalenin soruları üç kalıpta gelir: **tanım** ("dönüş süresi nedir?"), **karşılaştırma** ("SJF mi round-robin mi?") ve **karşı örnek** ("bu kuralın kötü olduğu bir girdi ver"). Üçüncüsü en ayırt edicisidir; hazırda bir girdi taşımak gerekir.

Altı tipik hata var. **Ölçüt söylemeden 'daha iyi' demek** — bir kural dönüş süresinde kazanırken tepki süresinde kaybediyor olabilir. **Dönüş süresi ile tepki süresini karıştırmak** — biri bitişi, öteki ilk çalıştırılmayı ölçer. **SJF'yi koşulsuz optimal ilan etmek** — optimallik "bütün işler aynı anda gelir ve süreler bilinir" varsayımına yaslanır; süreler bilinmediği için gerçek sistemler onu doğrudan kullanamaz. **Önkesmeyi bir ilke sanmak** — önkesme bir düzenektir; ilke, önkesme anında kimin seçileceğidir. **Round-robin'i her açıdan iyi sanmak** — dönüş süresinde kötüdür ve bu kaçınılmazdır. **MLFQ'nun öncelik yükseltmesini süs sanmak** — açlığı engelleyen tek kural odur.

Bir de ölçü refleksi: "dilim ne kadar olmalı?" sorusunun cevabı sayı ister. Anahtar maliyeti, hedef ek yük oranı ve iş sayısı verilince dilim üç satırda hesaplanır.

İngilizce karşılıklar hazır olmalıdır: *scheduler*, *scheduling policy*, *workload*, *turnaround time*, *response time*, *fairness*, *FIFO / FCFS*, *convoy effect*, *shortest job first*, *shortest time-to-completion first*, *preemptive / non-preemptive*, *round-robin*, *time slice*, *scheduling quantum*, *multi-level feedback queue*, *allotment*, *priority boost*, *starvation*, *gaming the scheduler*, *proportional share*, *virtual runtime*, *nice*, *cache affinity*, *load imbalance*, *migration*, *work stealing*.

### Sırada ne var

Bu makale hazır kümesinden **hangisinin** seçileceğini anlattı ve bunu yaparken sürekli tek bir şeye güvendi: çizelgeleyici, çalışan bir işi istediği anda durdurabilir. Süreçler makalesinde açıkta bıraktığımız problem de buydu — üç komutluk bir artırmanın ortasında gelen kesme, paylaşılan sayacı bozuyordu.

Sıradaki makale bu problemin çözümünü kuruyor: kritik kesimin hangi koşulları sağlaması gerektiği, donanımın hangi tek komutu verdiği, o komutla bir kilidin nasıl kurulduğu, bekleyen bir iş parçacığının dönmek ile uyumak arasındaki seçimi, semaforun tek bir tam sayıyla nasıl hem kilit hem sıralama aracı olduğu. Doğruluk makalesindeki korunan değişmez dili orada bir kilidin ne söz verdiğini yazmanın tek düzgün yolu olacak; işletim sistemi makalesindeki "kesmeleri kapatmak" seçeneği ise çekirdeğin kendi içindeki eşzamanlılık başlığı altında geri dönecek.

## Kaynakça

- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 7: Scheduling: Introduction — **iş yükü** kavramı ve beş basitleştirici varsayım; **dönüş süresi** tanımı (T_turnaround = T_completion − T_arrival) ve bir başarım ölçütü olarak adaletle çatışması; **FIFO/FCFS** ve 100 + 10 + 10 örneğiyle ortalama 110 hesabı; **konvoy etkisi**; **SJF** ve aynı iş kümesinde ortalamanın 50'ye düşmesi; geç gelen işlerle 103,33 hesabı; önkesmeli çizelgeleyiciler kutusu ve **STCF/PSJF** ile ortalamanın yeniden 50 olması; **tepki süresi** tanımı (T_response = T_firstrun − T_arrival); **round-robin** ve zaman diliminin zamanlayıcı kesmesi periyodunun katı olma zorunluluğu; üç eşit işte tepki sürelerinin 1'e karşı 5, dönüş sürelerinin 14'e karşı 10 olması; "adil olan her kural dönüş süresinde kötüdür" saptaması; amortize etme kutusu (1 ms anahtar / 10 ms dilim ≈ %10, 100 ms dilim < %1) ve bağlam anahtarının önbellek, TLB ve dal öngörücüsü maliyeti; giriş/çıkışın her işlemci parçasını ayrı iş sayarak hesaba katılması ve örtüşme. Bu makaledeki bütün ortalamalar ve yüzdeler bu tanımlardan kendi hesabımdır ve bir benzetim programıyla ayrıca doğrulanmıştır. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 8: Scheduling: The Multi-Level Feedback Queue — MLFQ'nun Corbató ve arkadaşlarınca 1962'de CTSS'te tanımlanması; **beş kuralın** birebir metni (öncelik sırası, eşit önceliklerde round-robin, yeni işin en üst kuyruğa girmesi, tahsis tükendiğinde önceliğin düşmesi, S süresinde toplu öncelik yükseltmesi); **tahsis (allotment)** tanımı; ilk üç kuralın açığı olarak **açlık**, **çizelgeleyiciyi oynatma** (tahsis dolmadan giriş/çıkış yaparak aynı düzeyde kalma) ve davranış değiştiren işin cezalandırılması; muhasebeyi düzeyde biriktiren düzeltilmiş 4. kural; S'nin bir **büyücü sabiti** olması ve Ousterhout yasası; kuyruk düzeyine göre değişen dilim uzunlukları; **Solaris** zaman paylaşımı sınıfının varsayılanları (60 kuyruk, 20 ms'den birkaç yüz ms'ye, yaklaşık saniyede bir yükseltme); MLFQ'nun BSD, Solaris ve Windows NT türevlerinde taban çizelgeleyici olması. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 9: Scheduling: Proportional Share — oranlı paylaşım fikri ve piyango çizelgelemesinde biletlerin payı temsil etmesi; **Linux CFS**: sabit dilim yerine **vruntime** sayımı ve her kararda en küçük vruntime'ın seçilmesi, `sched_latency` (tipik 48 ms) değerinin süreç sayısına bölünmesi, n = 4 için 12 ms, `min_granularity` (tipik 6 ms) alt sınırı ve on süreçte 4,8 ms yerine 6 ms kullanılması; `nice` değerinin −20…+19 aralığı ve `prio_to_weight` tablosu (nice −5 → 3121, nice 0 → 1024), dilimin ağırlık oranından hesaplanması ve örnekte payların yaklaşık 3/4 ile 1/4 (36 ms ve 12 ms) çıkması, vruntime'ın ağırlıkla ters ölçeklenmesi, nice farkı sabitken oranın korunması; çalışabilir süreçlerin **kırmızı-siyah ağaçta** vruntime'a göre tutulması, sıralı listenin O(n) olması ve ağaç işlemlerinin O(log n) olması, uyuyan süreçlerin ağaçtan çıkarılması; Google veri merkezi ölçümünde çizelgelemenin toplam işlemci zamanının yaklaşık %5'ini alması. On süreçte turun 48 yerine 60 ms sürmesi ve nice 5/10 çiftinin %75,28 vermesi bu kaynaktan değil, verilen tablodan kendi hesabımdır. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- The Linux Kernel Documentation. *EEVDF Scheduler* — çekirdeğin 6.6 sürümüyle CFS'ten EEVDF'e geçmeye başladığı ve EEVDF'in her göreve sanal çalışma zamanı atamayı sürdürdüğü. [Bağlantı](https://docs.kernel.org/scheduler/sched-eevdf.html)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 10: Multiprocessor Scheduling — **önbellek yakınlığı** tanımı ("a process, when run on a particular CPU, builds up a fair bit of state in the caches (and TLBs) of the CPU"); **tek kuyruklu (SQMS)** yaklaşımın iki zaafı: kilit çekişmesi nedeniyle ölçeklenmemesi ve işlerin işlemciden işlemciye zıplaması; **çok kuyruklu (MQMS)** yaklaşımın ölçeklenmesi ve yakınlığı koruması, buna karşılık **yük dengesizliği** doğurması (bir işlemcinin boş kalması dahil); **göçürme** ve **iş çalma (work stealing)** ile ne sıklıkta bakılacağının takası; Linux'ta O(1), CFS ve BFS çizelgeleyicilerinin bir arada var olması, O(1)'in MLFQ benzeri öncelik tabanlı, CFS'in belirlenimci oranlı paylaşım olması. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Cox, R., Kaashoek, F. & Morris, R. *xv6: a simple, Unix-like teaching operating system* (RISC-V sürümü) — çekirdeğin işlemciyi süreçler arasında **çoklamasının** iki biçimi: engellenen bir sistem çağrısında gönüllü, uzun süre hesap yapan süreçlerde donanım zamanlayıcısının sürüklediği **gönülsüz** geçiş ("Xv6 uses the standard technique in which a hardware timer's interrupts drive context switches"); bu çoklamanın her sürece kendi işlemcisi varmış yanılsamasını vermesi ve gerçekleştirmenin altı somut zorluğu (yazmaçların kaydedilmesi, geçişin saydamlığı, birden çok işlemcinin aynı süreç kümesini paylaşması nedeniyle gereken kilit planı, çıkan sürecin kaynaklarının serbest bırakılması, her işlemcinin hangi süreci çalıştırdığını bilmesi ve uyandırma bildirimlerinin kaybolmaması). MIT 6.1810 / 6.828, 2024. [Bağlantı](https://pdos.csail.mit.edu/6.828/2024/xv6/book-riscv-rev4.pdf)
- Silberschatz, A., Galvin, P. B. & Gagne, G. *Operating System Concepts*, onuncu baskı — bu makalenin kapsamının ders kitabı karşılığı **Chapter 5 CPU Scheduling**'dir; ilgili alt bölümler resmî içindekiler tablosundan doğrulanmıştır: 5.1 Basic Concepts, 5.2 Scheduling Criteria, 5.3 Scheduling Algorithms, 5.4 Thread Scheduling, 5.5 Multi-Processor Scheduling, 5.6 Real-Time CPU Scheduling, 5.7 Operating-System Examples, 5.8 Algorithm Evaluation. John Wiley & Sons. [Bağlantı](https://www.os-book.com/OS10/index.html)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE322 — Operating Systems* — bu makalenin resmî dayanağı katalog tanımındaki "CPU scheduling" ifadesidir; sayfa bu run'da (2026-09-10) yeniden çekilerek doğrulandı ve metin değişmemişti. Sayfada Course Learning Outcomes bölümü yoktur; ders içeriğine dair bütün resmî iddialar yalnızca Catalog Description'a dayanır. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe322/)
