---
article_id: article_732fb7f6-659a-4863-b98b-eb0dd05dcef0
title: "Süreçler ve İş Parçacıkları"
slug: surecler-ve-is-parcaciklari
category: operating-systems
level: advanced
reading_order: 27
summary: "İşletim sisteminin en temel soyutlaması: çalışan program. Sürecin makine durumu envanteri, çalışan/hazır/engellenmiş durum makinesi ve korunan değişmezi, süreç denetim bloğu ile süreç listesi; bağlam anahtarında kimin neyi kaydettiği ve ölçülmüş maliyeti; iş parçacığının aynı adres uzayını paylaşıp ayrı yığın tutması, iki kullanım gerekçesi ve iş ile açıklık ayrımının sistem karşılığı; paylaşılan sayaç örneğiyle yarış koşulu, kritik kesim, karşılıklı dışlama ve atomiklik."
tags:
  - surec
  - is-parcacigi
  - baglam-anahtari
  - yaris-kosulu
  - kritik-kesim
content_hash: sha256:b177f7035d79f880ed6e9317e344dd5e6c61320fe0d04fd2b447950dd28cfc75
classification_version: 1
classification_batch: 8
---
## Çekirdek neyi kaydediyor

Önceki makale sınırın nasıl çizildiğini kurdu: kullanıcı kipi, çekirdek kipi ve aralarındaki geçişler. Ama bir soru kasıtlı olarak açık bırakıldı. Zamanlayıcı kesmesi geldiğinde çekirdek denetimi geri alıyor ve başka bir programa geçiyor — peki tam olarak **neyi** kaydediyor, **neyi** geri yüklüyor?

Cevap, işletim sisteminin en temel soyutlamasını tanımlamayı gerektirir: **süreç (process)**, yani çalışan program. Bu makale önce sürecin envanterini çıkarıyor, sonra onu bir durum makinesi olarak yazıyor, sonra geçişin maliyetini ölçüyor; ardından aynı adres uzayını paylaşan birden çok yürütme akışına — **iş parçacığına (thread)** — geçip paylaşımın bedelini adıyla tanıtıyor.

## Süreç: makine durumunun envanteri

Süreç, basitçe çalışan bir programdır. Ama mülakatta bu cevap yetmez; ardından "peki neyden oluşur?" gelir. Doğru yaklaşım, sürecin **makine durumunun (machine state)** envanterini çıkarmaktır: program çalışırken **neyi okuyabilir ve neyi değiştirebilir?**

Üç kalem vardır.

**Bellek.** Komutlar bellektedir, okunan ve yazılan veri de bellektedir. Sürecin adresleyebildiği belleğe **adres uzayı (address space)** denir ve sürecin bir parçasıdır.

**Yazmaçlar.** Pek çok komut yazmaçları açıkça okur ya da günceller. İçlerinden ikisi özellikle kritiktir: **program sayacı (program counter)** hangi komutun sırada olduğunu, **yığın işaretçisi (stack pointer)** ile çerçeve işaretçisi ise fonksiyon parametreleri, yerel değişkenler ve dönüş adresleri için kullanılan yığını yönetir. Veri yapıları makalesinde "çağrı yığını bir yığındır" diye bıraktığımız pin, işletim sistemi tarafında tam olarak burada karşılanır: yığın soyut bir arayüz değil, adres uzayında gerçek bir bölge ve bir yazmaçtır.

**Giriş/çıkış bilgisi.** Sürecin açık dosyalarının listesi de durumun parçasıdır.

Bir programın nasıl sürece dönüştüğü de aynı envanterden okunur. İşletim sistemi önce kodu ve statik veriyi diskteki çalıştırılabilir dosyadan okuyup adres uzayına yükler. Erken sistemler bunu **hevesle** — hepsini çalıştırmadan önce — yapardı; modern sistemler **tembel** yapar, yani parçaları gerektikçe yükler. Sonra çalışma zamanı **yığını** ayırır ve `main` fonksiyonunun parametrelerini (argüman sayısı ve argüman dizisi) oraya yerleştirir; **heap** için de bir miktar yer ayırır, ki program dinamik olarak bellek isteyebilsin. Son olarak giriş/çıkış kurulur: Unix türevi sistemlerde her sürecin varsayılan olarak üç açık dosya tanıtıcısı vardır — standart girdi, standart çıktı ve standart hata.

Buradaki ayrım da önceki makalenin ilke/düzenek ayrımının bir uygulamasıdır: bu adımların **nasıl** yapıldığı düzenek, hangi sürecin ne zaman çalıştırılacağı ilkedir.

## Süreç bir durum makinesidir

Bir süreç her an üç durumdan birindedir ve bu üçlü, doğruluk makalesinde kurduğumuz durum makinesi modelinin doğrudan bir örneğidir:

- **Çalışan (running):** süreç bir işlemcide komut yürütüyor.
- **Hazır (ready):** süreç çalışmaya hazır ama işletim sistemi şu an onu seçmedi.
- **Engellenmiş (blocked):** süreç öyle bir işlem yaptı ki, başka bir olay gerçekleşmeden çalışmaya hazır olamaz. Kanonik örnek, diska giriş/çıkış isteği göndermektir.

Geçişlerin de adı vardır. Hazırdan çalışana geçmeye **çizelgelenmek (scheduled)**, çalışandan hazıra dönmeye **çizelgeden çıkarılmak (descheduled)** denir. Çalışandan engellenmişe geçiş giriş/çıkış başlatmakla, engellenmişten hazıra dönüş giriş/çıkışın tamamlanmasıyla olur.

Bu makine üzerinde korunan değişmez şudur: **her an en fazla bir süreç çalışan durumdadır** (tek işlemcide) ve engellenmiş bir süreç, beklediği olay gerçekleşmeden hazır kümesine geri konmaz. Kilitlenme makalesinde göreceğimiz sorunların çoğu, tam olarak bu ikinci koşulun sonsuza kadar sağlanamamasıdır.

Modelin faydası soyut değil, sayısaldır. İki süreç düşün; ilki bir süre çalıştıktan sonra giriş/çıkış başlatıyor. Süreç 0 üç zaman biriminde çalışır, sonra engellenir; işletim sistemi bunu görür ve Süreç 1'i çalıştırır — **kaynak kullanımı böyle artar**. Süreç 1 çalışırken giriş/çıkış tamamlanır ve Süreç 0 hazıra döner; Süreç 1 bitince Süreç 0 kalan işini yapar. Aynı iki süreç hiç giriş/çıkış yapmasaydı basitçe sırayla çalışırlardı. Önceki makalede **çoklu programlamanın** gerekçesi olarak anlattığımız "yavaş aygıtı beklerken işlemciyi boş tutma" cümlesi, bu iki izin farkıdır.

Üç durum sadeleştirmedir; gerçek sistemlerde iki uç durum daha vardır. Süreç yaratılırken bulunduğu bir **başlangıç durumu** ve çıkmış ama henüz temizlenmemiş olduğu bir **son durum** — Unix türevi sistemlerde adı **zombi**dir. Son durum işe yarar: ebeveyn süreç, çocuğun dönüş kodunu okuyup başarıyla bitip bitmediğini görebilsin diye kayıt bir süre daha tutulur. Ebeveyn son bir bekleme çağrısı yaptığında çekirdek kaydı temizler.

![Dikey bir çizgiyle ayrılmış iki panelli bir şema. Sol panelin başlığı süreç durum makinesi. Panelde üç durum kutusu var: solda vurgulanmış ÇALIŞAN kutusu, sağda HAZIR kutusu, ikisinin altında ortada ENGELLENMİŞ kutusu. Çalışan ile hazır arasında iki yatay ok var; üstteki ok çalışandan hazıra gidiyor ve çizelgeden çıkar diye etiketlenmiş, alttaki ok hazırdan çalışana dönüyor ve çizelgele diye etiketlenmiş. Çalışandan engellenmişe inen bir ok var ve yanında giriş çıkış başlat yazıyor; engellenmişten hazıra çıkan bir ok var ve yanında giriş çıkış bitti yazıyor. Şemada iki soluk kesik çizgili kutu daha var: yukarıda başlangıç kutusu, ondan hazıra giden soluk bir ok çıkıyor; aşağıda zombi kutusu, ona çalışandan gelen soluk bir ok iniyor. Panelin altında iki satır: her an en fazla bir sürecin çalışan durumda olduğu ve engellenmiş bir sürecin beklediği olay gelmeden hazır olmadığı. Sağ panelin başlığı süreç denetim bloğu, yani PCB. Panelde çerçeveli bir alan listesi var; sırayla süreç kimliği, durum ve durumun çalışan, hazır veya engellenmiş olabileceği, ebeveyn işaretçisi, bellek başlangıcı ve boyutu, çekirdek yığınının tabanı yazıyor. Bunların altında vurgulanmış bir kutu var; başlığı yazmaç bağlamı ve içinde iki satır hâlinde program sayacı, yığın işaretçisi ve genel amaçlı yazmaçlar yazıyor. Vurgulu kutunun altında açık dosyalar, çalışma dizini ve tuzak çerçevesi satırları var. Panelin altında iki satır: bütün bu kayıtları tutan yapıya süreç listesi ya da görev listesi denir; bir süreci durdurmak kaydetmek, sürdürmek geri yüklemektir](assets/surec-durum-makinesi.svg "Şekil 1 — Sürecin üç durumu ve çekirdeğin her süreç için tuttuğu kayıt")

## Süreç denetim bloğu

İşletim sistemi de bir programdır ve her program gibi veri yapıları tutar. Süreçleri izlemek için hazır olanların bir **süreç listesi (process list)** — bazı sistemlerde görev listesi — ve hangisinin çalıştığı bilgisi gerekir; engellenmiş süreçler de izlenmelidir, ki bir giriş/çıkış tamamlandığında doğru süreç uyandırılıp hazır yapılabilsin.

Tek bir süreç hakkındaki bilgiyi tutan yapıya **süreç denetim bloğu (Process Control Block, PCB)** ya da süreç tanımlayıcısı denir. Şekil 1'in sağ paneli, xv6 öğretim çekirdeğinin gerçekten tuttuğu alanları gösteriyor: süreç belleğinin başlangıcı ve boyutu, çekirdek yığınının tabanı, süreç durumu, süreç kimliği, ebeveyn işaretçisi, uyunan kanal, öldürülme bayrağı, açık dosyalar, çalışma dizini, **yazmaç bağlamı** ve o anki kesme için tuzak çerçevesi. Linux, macOS ya da Windows'un karşılıkları çok daha karmaşıktır ama iskelet aynıdır.

Yazmaç bağlamı, bu makalenin açılış sorusunun cevabıdır. Durmuş bir süreç için yazmaçlarının içeriğini tutar; o değerler gerçek yazmaçlara geri konduğunda süreç kaldığı yerden devam eder.

## Bağlam anahtarı ve gerçek maliyeti

**Bağlam anahtarı (context switch)**, çekirdeğin çalışan sürecin yazmaç değerlerini kaydedip başkasınınkileri geri yüklemesidir. Kavramsal olarak basittir; inceliği, **iki ayrı kaydetme/geri yükleme çiftinin** olmasıdır ve mülakatta bu ayrımı yapabilmek fark yaratır.

**Birincisini donanım yapar.** Zamanlayıcı kesmesi geldiğinde çalışan sürecin **kullanıcı yazmaçları** donanım tarafından, o sürecin çekirdek yığınına örtük olarak kaydedilir. Bu, önceki makaledeki tuzak davranışının aynısıdır.

**İkincisini yazılım yapar.** Çekirdek A'dan B'ye geçmeye karar verirse, **çekirdek yazmaçlarını** açıkça — bu kez yığına değil, sürecin PCB'sindeki yazmaç bağlamı alanına — kaydeder, B'ninkileri geri yükler ve yığın işaretçisini B'nin çekirdek yığınına çevirir. Yığınları değiştirmek işin püf noktasıdır: çekirdek geçiş yordamına A'nın bağlamında girer, B'nin bağlamında döner. Sonra tuzaktan dönüş komutu çalışır ve B'nin kullanıcı yazmaçları geri yüklenir; B artık çalışan süreçtir.

Maliyeti ölçülmüş bir sayıdır. 1996'da 200 MHz'lik bir P6 üzerinde Linux 1.3.37 ile bir sistem çağrısı yaklaşık **4 mikrosaniye**, bir bağlam anahtarı yaklaşık **6 mikrosaniye** sürüyordu; modern sistemler 2–3 GHz işlemcilerle mikrosaniyenin altına iniyor.

Bu sayıları çevrime çevirmek öğretici bir sonuç veriyor ve aritmetiği kendim yaptım: 200 MHz'de 6 mikrosaniye **1.200 çevrim** demektir. 3 GHz'de yarım mikrosaniye ise **1.500 çevrim**. Yani geçen otuz yılda süre yaklaşık on kat düşerken **çevrim sayısı düşmedi**. Sebep, işletim sistemi işlemlerinin çoğunun bellek yoğun olması ve bellek bant genişliğinin işlemci hızı kadar hızlı iyileşmemesidir. Bellek hiyerarşisi makalesinde bu gözlem donanım tarafından tekrar karşımıza çıkacak.

Pratik okuması şudur: bağlam anahtarı ucuz **değildir** ama 10 ms'lik zaman dilimlerinin yanında küçüktür — saniyede 100 anahtar, 6 mikrosaniyeden %0,06 ek yük eder. Zaman dilimini agresif biçimde küçültürsen bu oran hızla büyür; CPU zamanlama makalesinde tepki süresi ile ek yük arasındaki bu takas ana konu olacak.

> **Sesli anlat:** "Bağlam anahtarı nedir, kim neyi kaydeder? Süreç durumlarını da anlat. Doksan saniye."
>
> İyi bir cevabın omurgası: "Süreç, çalışan programın soyutlamasıdır ve makine durumuyla tanımlanır: adres uzayı, yazmaçlar — özellikle program sayacı ve yığın işaretçisi — ve açık dosyalar gibi giriş/çıkış bilgisi. Her an üç durumdan birindedir: çalışan, hazır, engellenmiş. Hazırdan çalışana geçmeye çizelgelenmek, tersine çizelgeden çıkarılmak denir; giriş/çıkış başlatınca engellenmişe, giriş/çıkış bitince hazıra döner. Bağlam anahtarı, çekirdeğin bir süreçten diğerine geçmesidir ve iki ayrı kaydetme vardır. Kesme geldiğinde donanım kullanıcı yazmaçlarını o sürecin çekirdek yığınına örtük olarak kaydeder. Çekirdek geçmeye karar verirse, çekirdek yazmaçlarını açıkça sürecin denetim bloğuna kaydeder, ötekininkileri geri yükler ve çekirdek yığınını değiştirir; sonra tuzaktan dönüş kullanıcı yazmaçlarını geri yükler. Maliyet ölçülmüştür: 1996'da 200 MHz'de yaklaşık 6 mikrosaniye, bugün mikrosaniyenin altı — ama çevrim cinsinden neredeyse aynı, çünkü bu işlemler bellek yoğundur."

## İş parçacığı: aynı adres uzayı, ayrı yığın

Şimdi tek bir süreç için yeni bir soyutlama: **iş parçacığı (thread)**. Klasik görüntüde bir programın tek bir yürütme noktası vardır — komutların çekildiği tek bir program sayacı. Çok iş parçacıklı bir programda **birden fazla yürütme noktası** vardır.

Tek bir iş parçacığının durumu, bir sürecinkine çok benzer: kendi program sayacı ve kendi özel yazmaç kümesi vardır. İki iş parçacığı tek işlemcide sırayla çalışıyorsa aralarında yine bir bağlam anahtarı olur ve yazmaç durumu kaydedilip geri yüklenir. Süreçlerde bu durum PCB'de tutuluyordu; iş parçacıkları için **iş parçacığı denetim bloğu (Thread Control Block, TCB)** tutulur.

**Ama bir büyük fark vardır ve mülakatta beklenen cümle budur: adres uzayı aynı kalır.** İş parçacıkları arasındaki bağlam anahtarında sayfa tablosunu değiştirmek gerekmez. Süreçler arası geçişte gerekir.

İkinci fark yığındadır. Klasik bir sürecin adres uzayında tek bir yığın vardır ve genellikle adres uzayının tepesinde durur. Çok iş parçacıklı bir süreçte **her iş parçacığı için bir yığın** olmalıdır, çünkü her biri bağımsız çalışır ve kendi fonksiyon çağrılarını yapar. Yığında tutulan yerel değişkenler, parametreler ve dönüş değerleri bu yüzden **iş parçacığına özel depolamada (thread-local storage)** durur.

Bunun bir bedeli var: yığın ile heap'in birbirinden bağımsız büyüyebildiği düzgün adres uzayı yerleşimi bozulur. İkinci yığın adres uzayının ortasına bir yere konur ve heap'in büyüme alanını sınırlar. Pratikte çoğu zaman sorun olmaz, çünkü yığınların çok büyük olması gerekmez — istisna, ağır özyineleme kullanan programlardır. Özyineleme derinliğinin bellek maliyeti olduğunu karmaşıklık makalesinde söylemiştik; burada o maliyet **iş parçacığı başına** ödenir.

![Dikey bir çizgiyle ayrılmış iki panelli bir şema; iki panel de dikey bir bellek şeridi gösteriyor ve adresler yukarıdan aşağıya artıyor. Sol panelin başlığı tek iş parçacıklı adres uzayı. Şeridin en üstünde sıfır KB işaretiyle kod bölgesi, hemen altında bir KB işaretiyle heap bölgesi, ortada iki KB işaretinden başlayan geniş bir boş alan, en altta on beş ve on altı KB işaretleri arasında vurgulanmış tek bir yığın bloğu var. Şeridin sağında iki ok duruyor: biri boş alana doğru aşağı iniyor ve heap büyür diye, diğeri boş alana doğru yukarı çıkıyor ve yığın büyür diye etiketlenmiş. Panelin altında iki satır: tek yürütme noktası ve tek program sayacı olduğu; tek yığının adres uzayının tepesinde durduğu. Sağ panelin başlığı çok iş parçacıklı adres uzayı. Şerit aynı biçimde başlıyor, yani üstte kod ve altında heap var, ama bu kez iki vurgulanmış yığın bloğu içeriyor: biri şeridin ortasında ve yığın iki diye, diğeri en altta ve yığın bir diye etiketlenmiş; ikisinin arasında ve heap ile yığın ikinin arasında boş alanlar kalmış. Şeridin sağında not satırları var: kod ve heap paylaşılır; her iş parçacığı kendi yığınını tutar; yerel değişkenler orada durur. Panelin altında iki satır: iş parçacıkları arası geçişte sayfa tablosunun değişmediği ve her iş parçacığı için ayrı bir iş parçacığı denetim bloğu, yani TCB tutulduğu](assets/surec-ve-is-parcacigi-bellek.svg "Şekil 2 — Paylaşılan ve paylaşılmayan: kod ile heap ortak, yığın iş parçacığına özel")

Şekil 2'deki fark, iş parçacığının neden kullanıldığını da açıklıyor. **İki gerekçe** vardır.

**Birincisi paralellik.** Çok büyük diziler üzerinde işlem yapan bir programı tek işlemcide çalıştırmak doğrudandır; birden çok işlemci varsa işi bölerek hızlandırabilirsin. Bunun adı paralelleştirmedir ve işlemci başına bir iş parçacığı doğal yoldur. Alt sınırlar makalesinde kurduğumuz **iş ile açıklık** ayrımı buranın analiz aracıdır: iş toplam komut sayısıdır, açıklık bağımlılık zincirinin uzunluğudur ve hızlanmanın tavanını açıklık belirler. İşletim sistemi tarafında bir ek kısıt daha vardır — açıklık ne kadar kısa olursa olsun, çekirdeğin çizelgeleyebileceği iş parçacığı sayısı ve her geçişin maliyeti sınırı aşağı çeker.

**İkincisi yavaş giriş/çıkış nedeniyle tıkanmamak.** Bir iş parçacığı diski ya da ağı beklerken engellenirse, çizelgeleyici aynı sürecin çalışmaya hazır başka bir iş parçacığına geçebilir. Bu, çoklu programlamanın süreçler için yaptığı şeyin **tek bir programın içinde** yapılmış hâlidir; web sunucuları ve veritabanı yönetim sistemleri tam olarak bu yüzden iş parçacığı kullanır.

Her iki durumda da iş parçacığı yerine ayrı süreçler kullanılabilirdi. Seçimi belirleyen paylaşımdır: iş parçacıkları adres uzayını paylaştığı için veri paylaşmak kolaydır; mantıksal olarak ayrı ve bellekte paylaşıma ihtiyaç duymayan işler için ise **süreç daha sağlam bir seçimdir**, çünkü yalıtım kendiliğinden gelir. Bu, önceki makaledeki monolitik çekirdek ile mikroçekirdek takasının aynısıdır: yalıtım satın alınır, bedeli iletişim maliyetidir.

## Paylaşılan verinin bedeli

Adres uzayını paylaşmak kolaylık getirir ve beraberinde bu fazın en zor konusunu açar.

Somut örnek şu: iki iş parçacığı paylaşılan bir sayacı on milyon kez birer birer artırıyor. Beklenen sonuç 20.000.000'dur. Gerçekte ne olur? Bazen doğru sonucu verir. Ama iki farklı çalıştırma **19.345.221** ve **19.221.041** üretmiştir; birincisinde 654.779 (%3,27), ikincisinde 778.959 (%3,89) artırma kaybolmuştur. Yalnızca yanlış değil, her seferinde **farklı biçimde** yanlıştır — iki çalıştırma arasındaki fark bile 124.180'dir.

Sebep, tek satırlık artırmanın tek bir komut olmamasıdır. Derleyici bunu üç komuta çevirir: değeri bellekten bir yazmaca **yükle**, yazmaca bir **ekle**, yazmacı belleğe **geri yaz**. Toplamda 60 milyon komut yürütülür ve bunların hiçbiri bölünmez değildir.

Şimdi kritik senaryo. Sayaç 50 olsun. İş parçacığı 1 ilk iki komutu yürütsün: yazmaç 51 oldu ama bellek hâlâ 50. Tam bu anda zamanlayıcı kesmesi gelsin; çekirdek İş parçacığı 1'in yazmaçlarını kaydedip İş parçacığı 2'ye geçsin. İş parçacığı 2 üç komutu da yürütsün: belleği 50 okur, 51 yapar, 51 yazar. Sonra denetim İş parçacığı 1'e dönsün; onun kaydedilmiş yazmacında hâlâ 51 vardır ve son komutunu yürütüp **51'i tekrar yazar**. Artırma iki kez çalıştı, sayaç 50'den yalnızca 51'e çıktı. Doğru sonuç 52 olmalıydı.

Bu duruma **yarış koşulu (race condition)** — daha dar anlamıyla **veri yarışı (data race)** — denir: sonuç, kodun yürütülme **zamanlamasına** bağlıdır. Kötü şansla, yani uygunsuz anlarda gelen bağlam anahtarlarıyla yanlış sonuç alırsın ve sonuç her çalıştırmada değişebilir; buna **belirsiz (indeterminate)** denir. Bilgisayarlardan alışık olduğumuz belirlenimci hesabın tersidir.

Yarış koşuluna yol açabilen kod parçasına **kritik kesim (critical section)** denir: paylaşılan bir değişkene — daha genel olarak paylaşılan bir kaynağa — erişen ve **birden fazla iş parçacığı tarafından eşzamanlı yürütülmemesi gereken** kod parçası. İstenen özelliğin adı **karşılıklı dışlamadır (mutual exclusion)**: bir iş parçacığı kritik kesimin içindeyken diğerlerinin girmesi engellenir.

Çözüm yönünün adı da bellidir: üç komutluk diziyi **atomik (atomic)** yürütmek, yani "ya hep ya hiç" — ya hepsi olmuş gibi görünmeli ya da hiçbiri, arada görünür bir durum olmamalı. Donanım bunu tek bir komut için garantiler; genel bir dizi için garantilemez, çünkü her olası dizi için özel komut tasarlanamaz. Bu yüzden çözüm senkronizasyon ilkelleriyle kurulur ve bu makalenin konusu değildir; kritik kesim gereksinimleri, kilitler, semaforlar ve monitörler kendi makalelerinde açılacak. Burada amaç **problemi doğru adlandırmaktı**.

Bu terimlerin çoğunu Edsger Dijkstra ortaya koymuştur; Turing Ödülü'nü bu ve benzeri çalışmalarıyla almıştır ve eşzamanlılık makalelerinde adını sık duyacağız.

> **Sesli anlat:** "Bir yarış koşulunu somut bir örnekle anlat. Neden ortaya çıkıyor ve ne istiyoruz? Doksan saniye."
>
> İyi bir cevabın omurgası: "İki iş parçacığı paylaşılan bir sayacı artırsın. Kaynak kodda tek satır ama makine kodunda üç komuttur: belleği yazmaca yükle, yazmaca ekle, yazmacı belleğe geri yaz. Sayaç 50 olsun; birinci iş parçacığı ilk iki komutu yürütsün, yazmacı 51 olsun ama belleğe henüz yazmasın. Tam o anda zamanlayıcı kesmesi gelsin ve ikinci iş parçacığı çalışsın; o üç komutu da yürütür, bellek 51 olur. Denetim birinciye döndüğünde kaydedilmiş yazmacında hâlâ 51 vardır ve onu yazar. İki artırma yapıldı ama sayaç 50'den 52'ye değil 51'e çıktı. Buna yarış koşulu denir; sonuç zamanlamaya bağlıdır ve her çalıştırmada değişebilir, yani belirsizdir. Paylaşılan kaynağa erişen ve aynı anda birden fazla iş parçacığı tarafından yürütülmemesi gereken koda kritik kesim, istediğimiz garantiye karşılıklı dışlama denir; teknik olarak o üç komutun atomik, yani ya hep ya hiç yürütülmesini istiyoruz."

## Mülakatta nasıl görünür

Bu makalenin soruları genellikle iki kutupludur: **tanım** ("süreç nedir?") ve **ayrım** ("süreçle iş parçacığının farkı nedir?"). İkincisinde tek cümlelik cevap yetmez; paylaşılanı ve paylaşılmayanı saymak gerekir.

Altı tipik hata var. **Süreci "program" ile eşitlemek** — program diskteki dosyadır, süreç onun çalışan hâlidir ve aynı programdan pek çok süreç yaratılabilir. **İş parçacıklarının yığını paylaştığını sanmak** — kod, heap ve açık dosyalar paylaşılır, **yığın paylaşılmaz**. **Bağlam anahtarında tek bir kaydetme olduğunu sanmak** — biri donanımın örtük kaydı, diğeri çekirdeğin açık kaydıdır. **Sayfa tablosunun her anahtarda değiştiğini sanmak** — iş parçacıkları arasında değişmez. **Yarış koşulunu yalnızca çok işlemcili makinelere özgü sanmak** — tek işlemcide de olur, çünkü kesme üç komutun ortasında gelebilir. **Engellenmiş ile hazırı karıştırmak** — engellenmiş süreç işlemci verilse bile çalışamaz.

Bir de ölçü refleksi: "bağlam anahtarı pahalı mı?" sorusunun cevabı sayı ister. Mikrosaniyenin altı, ama çevrim cinsinden binlerce; zaman dilimine oranı ne kadar büyürse zamanlayıcının seçimi o kadar önemlidir.

İngilizce karşılıklar hazır olmalıdır: *process*, *machine state*, *address space*, *program counter*, *stack pointer*, *scheduled / descheduled*, *running / ready / blocked*, *zombie*, *process list*, *Process Control Block*, *context switch*, *thread*, *Thread Control Block*, *thread-local storage*, *race condition*, *data race*, *indeterminate*, *critical section*, *mutual exclusion*, *atomic*.

### Sırada ne var

Bu makale iki soruyu açık bıraktı ve ikisi de sıradaki iki makalenin konusudur.

Birincisi bir **ilke** sorusudur: hazır kümesinde birden çok süreç varken çekirdek hangisini seçmeli? Sıradaki makale bu kararı verenin adını koyuyor — çizelgeleyici — ve kararı ölçmek için ölçütler tanımlıyor. Orada açgözlü algoritmalar makalesinin sezgisi ve alt sınırlar makalesindeki **açgözlü çizelgeleyici teoreminin** "optimalin en fazla iki katı" kalıbı doğrudan işe yarayacak; ayrıca heap makalesinde kurduğumuz öncelik kuyruğu, öncelikli çizelgelemenin doğal veri yapısı olarak geri dönecek.

İkincisi bir **doğruluk** sorusudur: kritik kesimi nasıl koruruz? Onun cevabı bir sonraki durakta değil, eşzamanlılık bölümünde verilecek — ve orada doğruluk makalesindeki değişmez dili, kilitlerin ne söz verdiğini yazmanın tek düzgün yolu olacak.

## Kaynakça

- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 4: The Abstraction: The Process — sürecin tanımı ("The abstraction provided by the OS of a running program is something we will call a process") ve **makine durumu** üçlüsü: adres uzayı, yazmaçlar (özellikle program sayacı ve yığın/çerçeve işaretçisi) ve açık dosyalar gibi giriş/çıkış bilgisi; **ilke ile düzeneğin ayrılması** kutusu ("You can think of the mechanism as providing the answer to a how question… The policy provides the answer to a which question"); programdan sürece geçiş adımları (kod ve statik verinin yüklenmesi, hevesli ile tembel yükleme, yığının ayrılıp argüman sayısı ve argüman dizisiyle doldurulması, heap'in ayrılması, üç varsayılan dosya tanıtıcısı); **üç süreç durumunun** birebir tanımları (running, ready, blocked) ve **çizelgelenmek/çizelgeden çıkarılmak** geçiş adları; iki süreç izinin iki tablosu (yalnızca işlemci kullanan ve giriş/çıkış yapan senaryolar); **süreç listesi** ve **Process Control Block** tanımı ("Sometimes people refer to the individual structure that stores information about a process as a Process Control Block (PCB)"); xv6'nın `proc` yapısındaki alanların tam listesi ve `context` yapısı; başlangıç durumu ile **zombi** son durumu ve ebeveynin dönüş kodunu okuması. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 6: Mechanism: Limited Direct Execution — **bağlam anahtarının** tanımı ve iki farklı kaydetme/geri yükleme çifti: "The first is when the timer interrupt occurs; in this case, the user registers of the running process are implicitly saved by the hardware, using the kernel stack of that process. The second is when the OS decides to switch from A to B; in this case, the kernel registers are explicitly saved by the software (i.e., the OS), but this time into memory in the process structure of the process."; yığın değiştirmenin rolü ("the kernel enters the call to the switch code in the context of one process… and returns in the context of another"); çizelgeleyicinin karar verici olarak adlandırılması; **ölçülmüş maliyetler**: lmbench ile 1996'da 200 MHz P6 üzerinde Linux 1.3.37 ile sistem çağrısı yaklaşık 4 mikrosaniye, bağlam anahtarı yaklaşık 6 mikrosaniye, modern 2–3 GHz sistemlerde mikrosaniyenin altı; Ousterhout'un gözlemi ("many OS operations are memory intensive, and memory bandwidth has not improved as dramatically as processor speed over time"). Bu makaledeki çevrim sayıları ve yüzdeler bu kaynaktan değil, verilen sürelerden kendi hesabımdır. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 26: Concurrency: An Introduction — **iş parçacığı** tanımı ("a multi-threaded program has more than one point of execution") ve "each thread is very much like a separate process, except for one difference: they share the same address space and thus can access the same data"; **TCB** ("now, we'll need one or more thread control blocks (TCBs) to store the state of each thread of a process") ve tek büyük fark ("the address space remains the same (i.e., there is no need to switch which page table we are using)"); yığın farkı ve **thread-local storage** ("Instead of a single stack in the address space, there will be one per thread"), adres uzayı yerleşiminin bozulması ve özyineleme istisnası; **iki kullanım gerekçesi** — paralellik ve yavaş giriş/çıkış nedeniyle tıkanmamak ("Threading enables overlap of I/O with other activities within a single program, much like multiprogramming did for processes across programs") — ile süreç tercihinin ne zaman daha sağlam olduğu ("Processes are a more sound choice for logically separate tasks where little sharing of data structures in memory is needed"); paylaşılan sayaç örneği ve **gözlenen çıktılar**: beklenen 20000000, gözlenen 19345221 ve 19221041; artırmanın üç komutluk x86 dizisi; adım adım yürütme izi; **yarış koşulu**, **veri yarışı**, **belirsiz**, **kritik kesim** ("A critical section is a piece of code that accesses a shared variable… and must not be concurrently executed by more than one thread") ve **karşılıklı dışlama** tanımları; **atomiklik** ("all or nothing") ve terimlerin Dijkstra'ya dayanması. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Cox, R., Kaashoek, F. & Morris, R. *xv6: a simple, Unix-like teaching operating system* (RISC-V sürümü) — sürecin xv6'da **yalıtım birimi** olarak tanımlanması ("an overview of an xv6 process, which is the unit of isolation in xv6"); Unix'in işlemcileri süreçler arasında saydam biçimde değiştirmesi ve gerektiği kadar yazmaç durumunu kaydedip geri yüklemesi ("Unix transparently switches hardware CPUs among processes, saving and restoring register state as necessary, so that applications don't have to be aware of time-sharing"); bu saydamlığın, bazı uygulamalar sonsuz döngüde olsa bile işlemcinin paylaşılmasına izin vermesi. MIT 6.1810 / 6.828, 2024. [Bağlantı](https://pdos.csail.mit.edu/6.828/2024/xv6/book-riscv-rev4.pdf)
- Silberschatz, A., Galvin, P. B. & Gagne, G. *Operating System Concepts*, onuncu baskı — Chapter 3 (Processes) ve Chapter 4 (Threads & Concurrency) bu makalenin kapsamının ders kitabı karşılığıdır; ilgili alt bölümler resmî içindekiler tablosundan doğrulanmıştır: 3.1 Process Concept, 3.2 Process Scheduling, 3.3 Operations on Processes, 3.4 Interprocess Communication, 4.1 Overview, 4.2 Multicore Programming, 4.3 Multithreading Models, 4.6 Threading Issues. John Wiley & Sons. [Bağlantı](https://www.os-book.com/OS10/index.html)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE322 — Operating Systems* — bu makalenin resmî dayanağı katalog tanımının şu ifadeleridir (birebir): "Concurrent processes, CPU scheduling, process synchronization, critical section problem." Bu makale üçünün ilkini ve dördüncüsünün problem tanımını kurar; CPU zamanlama ve senkronizasyon çözümleri sonraki makalelere aittir. Sayfa bu run'da (2026-09-02) yeniden doğrulandı. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe322/)
