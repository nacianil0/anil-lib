---
article_id: article_0a3ffcc2-e270-476a-bcb0-d9af6912c388
title: "C ve Bellek: Sistem Programlama Penceresi"
slug: c-ve-bellek-sistem-programlama-penceresi
category: supporting-fundamentals
level: advanced
reading_order: 38
summary: "Önceki makale donanımı dışarıdan gösterdi; bu makale aynı kavramları programcının elinde görünür kılıyor. Bir sürecin adres uzayı düzeni izin bitleriyle birlikte açılıyor: kod neden yazılamaz, koruma sayfası ne işe yarar, heap bölgesi hangi yönde büyür. Ardından işaretçinin gerçek maliyeti hesaplanıyor — aynı bir milyon tam sayı için dizi ile bağlı liste arasında, kendi aritmetiğimle, on üç kattan fazla fark çıkıyor. free çağrısının boyutu nereden bildiği ve beş klasik bellek hatası bir arada veriliyor. Son üçte bir, süreçler makalesinden devreden borcu ödüyor: fork iki kez dönüyor, exec hiç dönmüyor, kabuğun ikisini neden ayırdığı gösteriliyor ve sanal bellek makalesinde adı anılıp mekanizması açılmayan kopyalarken yazma sayfa hatasıyla birlikte kuruluyor."
tags:
  - c-dili
  - adres-uzayi
  - isaretci
  - malloc
  - fork
content_hash: sha256:fbaef8475c712555d278c76e3a5f25d813bc5e1be9926e93562d83f5779d122b
classification_version: 1
classification_batch: 12
---
## Kavramın programcıdaki karşılığı

Önceki makale makineyi dışarıdan gösterdi: çevrim tabloları, eşleme düzenleri, ölçülmüş kıyaslar. Programcının gördüğü hiçbir şey yoktu orada. Yüksek seviyeli bir dilde zaten olmaz; bellek ayırma da, serbest bırakma da, adresin kendisi de dilin arkasında durur.

C bu perdeyi kaldırır. Adres bir değerdir, bellek ayırmak bir kütüphane çağrısıdır, serbest bırakmak senin sorumluluğundur ve hata yapınca sonucu işletim sistemi makalelerinde tanımladığımız mekanizmalarla karşılaşırsın. Bu makalenin işi, işletim sistemi fazında soyut olarak kurduğumuz her kavramın kodda nasıl göründüğünü tek tek eşleştirmek.

Resmî dayanağın bir sınırı var. Bölümün sistem programlama dersinin katalog tanımı C dilini, işaretçileri ya da bellek düzenini **adlandırmıyor**; saydığı şeyler arasında bizim için belirleyici olan iki ifade var: "Unix environment and system calls" ve "assembly language programming". Yani bu makalenin resmî zemini dilin kendisi değil, **sistem çağrıları** tarafıdır; C ise o çağrıların görüldüğü pencere olduğu için seçilmiştir.

## Bir sürecin adres uzayı düzeni

Süreçler makalesinde adres uzayını "sürecin gördüğü bellek" diye tanımlamış, bellek yönetimi makalesinde de onu sayfa tablosuyla fiziksel belleğe bağlamıştık. Şimdi içine bakalım. Şekil 1 bir sürecin kullanıcı adres uzayını klasik sırasıyla gösteriyor; izin etiketleri, tek sayfalık yığın ve trambolin bir eğitim işletim sisteminden (xv6) alınmıştır. xv6'nın kendi yerleşimi bir noktada farklıdır: tek sayfalık yığın veri bölgesinin hemen üstünde, arada koruma sayfasıyla durur ve heap yığının üstünden yukarı büyür.

![Solda dikey bir adres uzayı sütunu, sağda üç açıklama kutusu. Sütunun en üstünde en büyük sanal adres yazıyor ve aşağıya doğru şu bloklar sıralanıyor: kullanıcıya kapalı trambolin bloğu; vurgulu çerçeveli tek sayfalık yığın, yanında oku ve yaz izni ile aşağı büyür notu, içinde en üstte argüman metinleri ve dizisi bulunduğu yazıyor; kesik çizgili çerçeveyle çizilmiş erişilemez koruma sayfası; kesik çizgili eşlenmemiş boşluk; heap bölgesi, yanında oku ve yaz izni ile yukarı büyür notu; ilklenmiş veri, yanında oku ve yaz izni; en altta ikinci vurgu rengiyle kod bloğu, yanında yalnızca oku ve çalıştır izni. Sütunun en altında sanal adres sıfır yazıyor. Sağdaki üç kutunun başlıkları sırasıyla kod yazılamaz, veri çalıştırılamaz ve koruma sayfası geçersizdir; açıklamaları null işaretçiye yazmanın sıfırdaki komutu bozmayıp sayfa hatası doğurduğu, programın kendi verisinin ortasına atlayamadığı ve yığın taşmasının komşu veriyi sessizce bozmak yerine temiz bir çökmeyle bittiği. Şeklin altında iki not: heap'in yukarı büyüdüğü ve eşlenmemiş boşluğun onun bütçesi olduğu, yığının ise tek sayfa kalıp altındaki koruma sayfasıyla korunduğu; buradaki heap'in bir bölge, öncelik kuyruğu makalesindeki heap'in bir veri yapısı olduğu](assets/adres-uzayi-duzeni.svg "Şekil 1 — Bir sürecin adres uzayı düzeni ve izin bitlerinin işi")

Düzenin ayrıntıları şunlar. Kullanıcı belleği sıfırıncı sanal adresten başlar ve en büyük sanal adrese kadar uzanabilir; eğitim sisteminde bu tavan ilke olarak 256 gigabayttır. **Kod** bölgesi oku ve çalıştır izinleriyle eşlenir, **yazma izni verilmez**; **veri, yığın ve heap** bölgeleri ise oku ve yaz izinleriyle eşlenir, çalıştırma izni verilmez.

Bu izin seçimlerinin her biri bir hata sınıfını yakalamak içindir ve mülakatta "neden böyle?" sorusunun cevabı hazır olmalıdır. Kod yazılabilir olsaydı, null işaretçiye yapılan bir yazma sıfırıncı adresteki komutları değiştirir ve program çalışmaya devam ederdi; hata, sebebinden çok uzakta patlardı. Kod yazılamaz olduğu için aynı hata anında bir sayfa hatası doğurur, çekirdek süreci öldürür ve geliştirici sorunu bulur. Veri çalıştırılamaz olduğu için de program kendi verisinin ortasına atlayamaz. Koruma, güvenlik ve Linux makalesinde kurduğumuz **en az ayrıcalık ilkesinin** adres uzayı içindeki hâli tam olarak budur.

**Yığın** tek sayfadır ve en üstünde komut satırı argümanlarının metinleri ile onlara işaret eden işaretçi dizisi durur; hemen altında, `main(argc, argv)` az önce çağrılmış gibi görünmesini sağlayan değerler vardır. Yığının hemen altına, kullanıcı erişimi kapatılmış bir **koruma sayfası (guard page)** konur: yığın taşarsa donanım bir sayfa hatası üretir, çünkü o sayfa kullanıcı kipinde erişilemez. Sonsuz özyineleme bu yüzden sessizce komşu veriyi bozmak yerine temiz bir çökmeyle biter.

**Heap bölgesi** yukarı doğru büyür. Bir terim uyarısı gerekli: heap sözcüğü bu seride öncelik kuyruğu makalesinde bir **veri yapısının** adı olarak yerleşti; buradaki heap bir veri yapısı değil, adres uzayında devingen ayırmaların yapıldığı **bölgedir**. İki kavramın ortak yanı yalnızca İngilizce sözcüktür ve mülakatçı ikisini de aynı sözcükle söyleyecektir; hangisini kastettiğini bağlamla ayırt edebilmek gerekir.

Süreçler makalesindeki bir cümle de burada yerine oturuyor: iş parçacıkları kodu, heap bölgesini ve açık dosyaları paylaşır, **yığını paylaşmaz** — çünkü her iş parçacığının kendi çağrı zinciri vardır ve şekildeki tek yığın çoklanır.

## İşaretçinin gerçek maliyeti

Diziler ve bağlı listeler makalesinde takası kurmuştuk: dizi bitişik yerleşir ve indisle erişir, bağlı liste işaretçi taşır ve araya ekleme yapabilir. O makalede maliyeti adım cinsinden saymıştık. Şimdi önceki makalenin çevrim tablosuyla aynı takası **çevrim cinsinden** sayabiliriz.

Önce yer: 64 bitlik bir makinede bir işaretçi 8 bayttır. Dört baytlık tam sayıları tutan bir bağlı listede her düğüm en az 12 bayt eder ve hizalamayla birlikte 16'ya çıkar; aynı veri dizide 4 bayttır. Yani bağlı liste yalnızca işaretçi yüzünden dört kat yer kaplar.

Asıl fark yerde değil, trafikte. Önbellek satırı 64 bayttır ve bir satıra 16 tam sayı sığar. Bir diziyi baştan sona dolaşan kod, her 16 elemanda **bir** satır getirir; geri kalan 15 erişim birinci düzeyden gelir. Düğümleri bellekte dağılmış bir bağlı listeyi dolaşan kod ise her düğüm için **ayrı** bir satır getirir ve getirdiği satırın büyük kısmını kullanmaz.

Bir milyon tam sayı için hesabı yapalım; aritmetik benim, varsayımlarım da açık: her ıska ana belleğe iniyor, isabet 3 çevrim, ıska 240 çevrim, ön getirme yok ve listenin her düğümü ayrı bir satıra düşüyor.

| Yapı | Iska sayısı | İsabet sayısı | Toplam çevrim |
|---|---|---|---|
| Dizi, baştan sona | 62.500 | 937.500 | 17.812.500 |
| Bağlı liste, dağınık | 1.000.000 | 0 | 240.000.000 |

Oran 13,5. Asimptotik sınıf her iki dolaşmada da Θ(n)'dir; büyük O aynıdır, sabitler on üç kat farklıdır. Gerçekte fark daha da büyüktür, çünkü donanımın ön getirmesi dizinin bir sonraki satırını kod istemeden getirir, bağlı listede ise bir sonraki adresi öğrenmek için o anki düğümü okumak gerekir — kovalama, ön getirmeyi imkânsız kılar.

Mülakatta bu, "bağlı liste mi dizi mi?" sorusunun ikinci halkasıdır. Birinci halka arayüzdür: araya ekleme mi, indisle erişim mi? İkinci halka erişim desenidir ve cevabı yukarıdaki tablodur.

## Yığın mı, heap mi

C'de iki tür bellek vardır. **Yığın belleği** derleyici tarafından örtük olarak yönetilir; bu yüzden **otomatik bellek** de denir. Bir fonksiyon içinde `int x;` dediğinde derleyici çağrı sırasında yer açar ve dönüşte geri alır. **Heap belleği** açıkça istenir ve açıkça geri verilir.

Aradaki fark, klasik bir hatanın kaynağıdır:

```c
int *bozuk(void) {
    int x = 42;
    return &x;          /* x dönüşte yok oluyor: sarkan işaretçi */
}

int *dogru(void) {
    int *x = malloc(sizeof(int));
    if (x == NULL) return NULL;
    *x = 42;
    return x;           /* çağıran free etmekle yükümlü */
}
```

İlk fonksiyon derlenir, çoğu zaman çalışır bile — ve bu tam olarak tehlikeli olan şeydir. Derlenmek doğruluk kanıtı değildir; bir kez çalışmak da değildir.

## free boyutu nereden biliyor

`free(void *ptr)` imzası bir boyut parametresi almaz. O hâlde kütüphane serbest bırakılacak bölgenin kaç bayt olduğunu nereden bilir?

Cevap, çoğu ayırıcının kullanıcıya verilen bloğun **hemen öncesine** küçük bir **başlık bloğu (header block)** koymasıdır. Başlıkta en azından bölgenin boyutu ve genellikle bir de bütünlük denetimi için sihirli bir sayı durur. `free` çağrıldığında kütüphane işaretçiden başlığın boyutu kadar geri gider, sihirli sayıyı doğrular ve boyutu okur.

Buradan küçük ama mülakatta hoşa giden bir ayrıntı çıkar: kullanıcı N bayt istediğinde kütüphane N baytlık bir boş parça aramaz, **N artı başlık boyutu** kadar bir parça arar. Dosya sistemleri makalesindeki meta veri muhasebesinin aynısıdır — veriyi izlemek de yer kaplar.

Beş klasik hata vardır ve hepsi sorunsuz derlenir.

- **Ayırmayı unutmak.** Hedef işaretçiye yer ayırmadan `strcpy` çağırmak; sonuç genellikle bir bölütleme hatasıdır.
- **Yetersiz ayırmak.** Bir dizgi için `strlen(s)` kadar yer ayırmak; sonlandırıcı karakter için gereken bir bayt eksiktir. Bu hata bazen zararsız görünür, bazen komşu bir değişkeni ezer, bazen çöker — ve tampon taşması güvenlik açıklarının başlıca kaynağıdır.
- **İlklemeyi unutmak.** Ayrılan yeri doldurmadan okumak; heap'te ne varsa o okunur.
- **Serbest bırakmayı unutmak.** Bellek sızıntısı. Uzun ömürlü programlarda ve işletim sisteminin kendisinde bu ciddi bir sorundur, çünkü sızıntı sonunda belleği tüketir. Çöp toplayan diller de kurtarmaz: bir başvuru duruyorsa hiçbir toplayıcı o bloğu geri almaz.
- **Erken serbest bırakmak.** Serbest bırakılan bloğu kullanmaya devam etmek; sarkan işaretçi. Blok bu arada başka bir `malloc` çağrısına verilmiş olabilir.

Bir de sık sorulan bir ayrıntı: kısa ömürlü bir program `free` çağırmadan çıkarsa bellek sızar mı? Sistemde **iki ayrı bellek yönetimi katmanı** vardır. Birincisi işletim sistemindedir ve süreçlere bellek dağıtıp süreç bitince geri alır; ikincisi sürecin içinde, heap bölgesindedir. Süreç öldüğünde çekirdek kod, yığın ve heap dahil bütün sayfalarını geri alır — yani gerçek anlamda hiçbir şey kaybolmaz. Buna rağmen alışkanlık olarak serbest bırakmak doğrudur, çünkü kısa ömürlü olduğunu sandığın kod uzun ömürlü bir programın içine taşınabilir.

`malloc` ve `free` birer sistem çağrısı **değildir**, kütüphane çağrısıdır. Kütüphane kendi içinde çekirdekten toptan yer alır — heap'in sonunu kaydıran `brk` ve `sbrk` çağrılarıyla ya da `mmap` ile — ve aldığı bu büyük parçaları küçük parçalar hâlinde dağıtır. Bu ayrım, işletim sistemi makalesinde kurduğumuz sistem çağrısı ile sıradan fonksiyon çağrısı farkının somut bir örneğidir.

## Süreç yaratmanın tuhaf arayüzü

Süreçler makalesinde süreci tanımlamış ama nasıl yaratıldığını ertelemiştik. Borç burada ödeniyor ve arayüz gerçekten tuhaftır.

`fork()` çağrıldığında işletim sistemi, çağıran sürecin **neredeyse birebir kopyasını** yaratır. Kopya `main`'den başlamaz; sanki kendisi `fork()` çağırmış gibi hayata gelir. Yani tek bir çağrı **iki kez döner**: ebeveyne çocuğun süreç kimliğini, çocuğa sıfır.

```c
int rc = fork();
if (rc < 0) {
    /* fork başarısız */
} else if (rc == 0) {
    /* çocuk buradan devam eder */
} else {
    /* ebeveyn buradan devam eder; rc çocuğun kimliği */
}
```

Hangisinin önce yazdıracağı **belirsizdir**; tek işlemcili bir makinede bile çizelgeleyici karar verir. Süreçler makalesindeki belirsizlik tartışması burada ilk elden görünür.

`wait()` ebeveyni çocuğun bitmesine kadar bekletir ve sıralamayı belirli hâle getirir.

`exec()` ise büsbütün başka bir şey yapar: verilen çalıştırılabilir dosyadan kodu ve statik veriyi yükler, **o anki kod bölgesinin üzerine yazar**, heap ile yığını ve bellek uzayının geri kalanını yeniden ilkler ve programı çalıştırır. Yeni bir süreç **yaratmaz**; çalışan programı başka bir programa **dönüştürür**. Bu yüzden başarılı bir `exec` çağrısı **hiç dönmez** — ardından yazılmış satır çalışmaz.

> **Sesli anlat:** "`fork()` ne döndürür, `exec()` neden dönmez, ve kabuk ikisini neden ayrı çağırır? Doksan saniye."
>
> İyi bir cevabın omurgası: "`fork()` çağıran sürecin neredeyse birebir kopyasını yaratır; kopyanın kendi adres uzayı, kendi yazmaçları ve kendi program sayacı vardır. Tek çağrı iki kez döner: ebeveyne çocuğun kimliği, çocuğa sıfır — kod iki dalı bu değerle ayırır. Hangisinin önce çalışacağı belirsizdir, çizelgeleyici karar verir. `exec()` yeni süreç yaratmaz; verilen dosyadan kodu ve statik veriyi yükleyip mevcut kod bölgesinin üzerine yazar, heap ve yığını yeniden ilkler, yani çalışan programı başka bir programa dönüştürür — bu yüzden başarılı olursa dönmez. İkisinin ayrı olması tuhaf görünür ama kabuğun bütün gücü tam oradan gelir: `fork` ile `exec` arasında kalan aralıkta kabuk, henüz çalışmamış programın ortamını değiştirebilir. Çıktı yönlendirmesi tam olarak budur — çocukta standart çıktı kapatılır, hedef dosya açılır, ve Unix boş dosya tanıtıcısını sıfırdan aramaya başladığı için yeni dosya standart çıktının numarasını alır. Sonra `exec` çalışır, açık tanıtıcılar `exec` boyunca açık kaldığı için programın bütün çıktısı dosyaya gider ve programın bundan haberi bile olmaz. Ebeveyn `wait()` ile çocuğun bitmesini bekler ve yeni komut istemini basar."

## Kopyalarken yazma

`fork()` bir kopya yaratıyorsa, gigabaytlık bir sürecin çatallanması gigabaytlık bir kopyalama demek midir? Naif gerçekleştirim tam olarak bunu yapar: eğitim işletim sisteminde `fork`, çocuk için fiziksel bellek ayırıp ebeveynin belleğini oraya kopyalar.

Sanal bellek makalesinde adını anıp mekanizmasını açmadığımız çözüm burada. **Kopyalarken yazma (copy-on-write)** şudur: ebeveyn ile çocuk başlangıçta bütün fiziksel sayfaları **paylaşır**, ama her ikisinin sayfa tablosunda bu sayfalar **salt okunur** işaretlenir. Okumalar serbesttir. Biri yazmaya kalkıştığında donanım bir sayfa hatası üretir; çekirdeğin tuzak işleyicisi yeni bir fiziksel sayfa ayırır, eskisini oraya kopyalar, yazmaya çalışan sürecin sayfa tablosundaki girdiyi kopyaya yöneltir ve yazma iznini açar, sonra hatayı doğuran komutu **baştan çalıştırır**. Bu kez izin verildiği için komut sorunsuz biter. Şekil 2 çatallamadan hemen sonraki durumu ve ilk yazmanın ardından oluşan tabloyu yan yana gösteriyor.

![Üst üste iki aşamalı bir şema. Birinci aşamanın başlığı fork hemen sonrası. Üç sıra var: üstte ebeveyn sayfa tablosunun s0, s1, s2 girdileri; ortada P0, P1, P2 adlı üç fiziksel sayfa; altta çocuk sayfa tablosunun s0, s1, s2 girdileri. Her iki tablodan da dikey çizgiler aynı fiziksel sayfalara iniyor. Sağdaki notlar paylaşılan sayfa sayısının üç, kopyalanan sayfa sayısının sıfır olduğunu ve her iki tabloda da girdilerin salt okunur olduğunu söylüyor. İki aşamanın arasındaki ayırıcı çizginin altında sıra yazılı: çocuk s1'e yazmaya kalkışır, donanım sayfa hatası doğurur, çekirdek yeni bir sayfa ayırıp içeriği kopyalar, girdiyi kopyaya yöneltir ve yazma iznini açar, komut baştan çalıştırılır. İkinci aşamanın başlığı ilk yazmadan sonra. Aynı üç sıra duruyor ama fiziksel sayfalar sırasına vurgulu renkte dördüncü bir sayfa, P3, eklenmiş. Ebeveynin üç girdisi hâlâ P0, P1 ve P2'ye iniyor; çocuğun s0 ve s2 girdileri de öyle, ama çocuğun vurgulanmış s1 girdisinden çıkan kalın bağlantı önce aşağı iniyor, sonra sağa uzanıyor ve en sonunda yukarı çıkarak P3'e varıyor. Sağdaki notlar paylaşılan sayfa sayısının iki, kopyalanan sayfa sayısının bir olduğunu ve çocuğun s1 girdisinin artık oku ve yaz izinli olduğunu söylüyor. En altta bir not: fork ardından exec kalıbında devralınan sayfaların çoğu hiç yazılmaz, o sayfalar hiç kopyalanmaz](assets/kopyalarken-yazma.svg "Şekil 2 — Kopyalarken yazma: paylaşılan sayfalar, yazma hatası ve tek sayfalık kopya")

Bunun da bir maliyeti var. Her fiziksel sayfaya kaç sayfa tablosundan başvurulduğunun sayılması gerekir, çünkü sayfanın ne zaman serbest bırakılabileceği buna bağlıdır. Bu muhasebe bir iyileştirme de getirir: yazma hatası veren sayfaya yalnızca o sürecin tablosundan başvuruluyorsa kopyalamaya gerek yoktur, izni açmak yeterlidir.

Kazancı asıl gösteren, en yaygın kalıptır: `fork` ardından `exec`. Çatallanmadan sonra birkaç sayfa yazılır, sonra `exec` ebeveynden devralınan belleğin neredeyse tamamını serbest bırakır. Kopyalarken yazma bu belleğin hiç kopyalanmamasını sağlar. Üstelik **saydamdır**: uygulamada tek satır değişmez.

Bu mekanizma, işletim sistemi fazının üç parçasını aynı anda kullanır ve mülakatta bunu söylemek iyi bir işarettir. Sayfa tablosu ve izin bitleri bellek yönetimi makalesinden, sayfa hatasının bir tuzak olması ve işleyicinin işletim sisteminde durması sanal bellek makalesinden gelir; "işi gerçekten gerekene kadar erteleme" fikri de aynı makaledeki talep sayfalamanın fikridir — orada sayfa ancak erişildiğinde getiriliyordu, burada ancak yazıldığında kopyalanıyor.

## Mülakatta nasıl görünür

Takip zinciri genellikle şöyle akar: "`fork()` ne yapar?" → "gigabaytlık bir süreç çatallanırken ne kopyalanır?" → "peki yazma olduğunda ne olur?" İlk soruyu cevaplarken kopyalarken yazmayı **sorulmadan** anmak, ikinci halkayı baştan kapatır.

Altı tipik hata var. **`fork()`'un iş parçacığı yarattığını sanmak** — süreç yaratır ve yeni sürecin kendi adres uzayı vardır; iş parçacığı adres uzayını paylaşır. **`exec()`'in yeni süreç yarattığını sanmak** — mevcut süreci dönüştürür ve başarılıysa dönmez. **`free`'nin boyutu parametre aldığını sanmak** — boyut, bloğun hemen önündeki başlıkta durur. **Heap ile yığını karıştırmak** — yığını derleyici yönetir ve kapsam bitince geri alır, heap'i sen yönetirsin ve ömrü senin elindedir. **Kopyalarken yazmayı bir hızlandırma hilesi sanmak** — davranışı hiç değiştirmez, yalnızca zorunlu olmayan kopyayı yapmaz; yazılan her sayfa yine kopyalanır. **"Süreç bitince işletim sistemi topluyor, sızıntı önemli değil" demek** — kısa ömürlü programda doğrudur, uzun ömürlü programda ve çekirdekte yanlıştır.

Bir de ölçü refleksi: bellekle ilgili her cevapta iki soru vardır — **kim ayırıyor** ve **kim serbest bırakıyor**. Yığında ikisi de derleyicidir; heap'te ikisi de programcıdır; sayfa düzeyinde ikisi de çekirdektir. Cevabı bu üç katmanın hangisinde verdiğini söylemek, sorunun yarısını çözer.

İngilizce karşılıklar hazır olmalıdır: *address space layout*, *text segment*, *heap*, *stack*, *guard page*, *stack overflow*, *dangling pointer*, *memory leak*, *buffer overflow*, *uninitialized read*, *header block*, *segmentation fault*, *library call*, *`brk` / `sbrk`*, *`mmap`*, *`fork`*, *`exec`*, *`wait`*, *process identifier (PID)*, *copy-on-write*.

### Sırada ne var

İşletim sistemi ve donanım tarafında artık bütün mekanizmalar elimizde: blok, önbellek, sayfa, kilit, günlükleme ve dayanıklılık. Bunların hepsini aynı anda kullanan ve mülakatta transkript üzerinden en çok sorulan sistem henüz açılmadı.

Sıradaki makale veritabanlarına geçiyor ve dengeli arama makalesinden devreden borcu ödüyor: bir indeks tam olarak nedir, neden B-ağacının yaprakları birbirine bağlanır, ve aynı sorgunun tam tarama ile indeks üzerinden maliyeti blok cinsinden nasıl karşılaştırılır. Ardından eşzamanlılık fazında kurduğumuz güvenlik ve canlılık ayrımı, yalıtım düzeyleri olarak geri gelecek.

## Kaynakça

- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 5: Interlude: Process API — `fork()`'un yarattığı sürecin "an (almost) exact copy of the calling process" olması ve çocuğun `main()`'den değil "as if it had called fork() itself" biçiminde başlaması; ebeveynin çocuğun kimliğini, çocuğun sıfır alması ve bu farkın iki dalı ayırmaya yaraması; çıktının **belirsiz** olması ve çizelgeleyicinin karar vermesi; `wait()`'in ebeveyni bekletip sıralamayı belirli hâle getirmesi; `exec()`'in verilen çalıştırılabilir dosyadan kodu ve statik veriyi yükleyip "overwrites its current code segment (and current static data) with it; the heap and stack and other parts of the memory space of the program are re-initialized" biçiminde davranması, yeni süreç yaratmayıp mevcut programı dönüştürmesi ve "a successful call to exec() never returns"; `fork` ile `exec`'in ayrılmasının kabuğu mümkün kılması ve **çıktı yönlendirmesinin** çocukta standart çıktının kapatılıp hedef dosyanın açılmasıyla yapılması, Unix'in boş dosya tanıtıcılarını sıfırdan aramaya başlaması ve açık tanıtıcıların `exec()` boyunca açık kalması. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 14: Interlude: Memory API — **yığın belleğinin** derleyici tarafından örtük yönetilmesi ve "automatic memory" adı, **heap belleğinin** açıkça istenip açıkça bırakılması; `free(void *ptr)`'ın boyut parametresi almaması ve çoğu ayırıcının bloğun hemen öncesine boyut ile sihirli sayı taşıyan bir **başlık** koyması, dolayısıyla N bayt istendiğinde **N artı başlık boyutu** kadar bir parçanın aranması; beş klasik hata — ayırmayı unutmak, yetersiz ayırmak ve tampon taşmasının güvenlik açıklarının kaynağı olması, ilklemeyi unutmak ve **ilklenmemiş okuma**, serbest bırakmayı unutmak ve **bellek sızıntısının** çöp toplayan dillerde de sürmesi, erken serbest bırakmak ve **sarkan işaretçi**; derlenmenin ve bir kez çalışmanın doğruluk kanıtı olmaması; süreç bittiğinde çekirdeğin kod, yığın ve heap dahil bütün sayfaları geri alması ve sistemde **iki ayrı bellek yönetimi katmanı** bulunması; `malloc` ve `free`'nin sistem çağrısı değil **kütüphane çağrısı** olması ve altta `brk`, `sbrk` ya da `mmap` kullanması. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Cox, R., Kaashoek, F. & Morris, R. *xv6: a simple, Unix-like teaching operating system* — RISC-V sürümü, MIT 6.1810, 2024 — 3.6 Process address space: kullanıcı belleğinin sıfırdan başlayıp en büyük sanal adrese kadar uzanması ve ilke olarak 256 gigabayt adreslenebilmesi; **kod** bölgesinin oku, çalıştır ve kullanıcı izinleriyle, **veri, yığın ve heap** bölgelerinin oku, yaz ve kullanıcı izinleriyle eşlenmesi; kod yazılabilir olsaydı null işaretçiyle sıfırıncı adresteki komutların bozulabileceği ve bunun yerine donanımın sayfa hatası üretmesi, verinin çalıştırılamaz olmasının programın kendi verisine atlamasını engellemesi; **yığının tek sayfa** olması, en üstünde komut satırı argümanlarının metinleri ve onlara işaret eden işaretçi dizisi, hemen altında `main(argc, argv)` çağrılmış gibi görünmesini sağlayan değerler; yığının altındaki **koruma sayfasının** kullanıcı bitinin temizlenmesiyle erişilemez kılınması ve taşmanın sayfa hatası doğurması; adres uzayının tepesindeki trambolin sayfası. 4.6 Page faults and page-table tricks: **kopyalarken yazma** çatallamanın naif `fork`'un `uvmcopy` ile gerçekten kopyalaması yerine bütün fiziksel sayfaları paylaşıp salt okunur eşlemesi, yazmada sayfa hatası doğması, çekirdeğin yeni sayfa ayırıp kopyalaması, girdiyi kopyaya yöneltip yazma iznini açması ve hatayı doğuran komutun **baştan çalıştırılması**; her fiziksel sayfaya kaç tablodan başvurulduğunun sayılması ve tek başvuru varsa kopyanın gereksiz olması; `fork` ardından `exec` kalıbında devralınan belleğin büyük kısmının hiç kopyalanmaması ve mekanizmanın uygulamalar için **saydam** olması. [Bağlantı](https://pdos.csail.mit.edu/6.828/2024/xv6/book-riscv-rev4.pdf)
- Bryant, R. E. & O'Hallaron, D. R. *Computer Systems: A Programmer's Perspective*, üçüncü baskı, 3. bölüm (Representing and Manipulating Information'ın ardından gelen Machine-Level Representation of Programs; 3.10.1 Understanding Pointers, 3.10.3 Out-of-Bounds Memory References and Buffer Overflow), 8. bölüm (Exceptional Control Flow; 8.2.3 Private Address Space, 8.4.2 Creating and Terminating Processes, 8.4.3 Reaping Child Processes, 8.4.5 Loading and Running Programs, 8.4.6 Using fork and execve to Run Programs) ve 9. bölüm (Virtual Memory; 9.8.2 The fork Function Revisited, 9.9 Dynamic Memory Allocation, 9.11 Common Memory-Related Bugs in C Programs). Pearson, 2016. Bölüm ve alt bölüm adları yayıncının resmî içindekiler belgesinden doğrulanmıştır; kitabın gövdesi okunmadığı için buradaki hiçbir tanım ya da sayı bu kaynağa dayandırılmamıştır. [Bağlantı](https://csapp.cs.cmu.edu/3e/pieces/preface3e.pdf)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü, **CMPE230 Systems Programming** ders sayfası (erişim: 11 Eylül 2026) — katalog tanımı: "Overview of compilers, interpreters, assemblers, linkers and loaders. Unix environment and system calls. Shell programming. Signals and exceptions. Localization and Unicode. PERL and CGI programming. Assembly language programming. Introduction to multithreading. Introductory Graphical User Interface (GUI) programming."; önkoşul CMPE160. Katalog tanımı C dilini, işaretçileri ya da bellek düzenini adlandırmaz; bu makalenin resmî zemini "Unix environment and system calls" ve "assembly language programming" ifadeleridir. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe230/)
