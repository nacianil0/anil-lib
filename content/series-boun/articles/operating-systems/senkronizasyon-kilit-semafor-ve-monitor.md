---
article_id: article_1bc01092-4bf4-45a1-b988-21c19516d4d1
title: "Senkronizasyon: Kilit, Semafor ve Monitör"
slug: senkronizasyon-kilit-semafor-ve-monitor
category: operating-systems
level: advanced
reading_order: 29
summary: "Kritik kesim problemi kurulmuştu; burada çözülüyor. Dijkstra'nın 1965'te koyduğu üç koşul — karşılıklı dışlama, kritik kesimin dışındaki sürecin ötekileri engellememesi, kararın sonsuza ertelenememesi — ve bir kilidin korunan değişmez diliyle yazılan sözü. Kesmeleri kapatmanın çekirdek içindeki yeri ve dışarıdaki çaresizliği, yükle/sakla ile kurulan bayrağın kaba kuvvetle bulunan karşı örneği, test-and-set ile kurulan dönen kilit, sıra kilidiyle gelen sınırlı bekleme; dönmek ile uyumak arasındaki seçim, öncelik tersine dönmesi; semaforun tek sayaçla üç işi görmesi ve koşul değişkeninin neden kilidi parametre olarak alması gerektiği."
tags:
  - kritik-kesim
  - kilit
  - semafor
  - kosul-degiskeni
  - test-and-set
content_hash: sha256:61eb35176e1c74006288ee216f2c4fb67a4d2b34f2dd524bcb591edad4346f88
classification_version: 1
classification_batch: 9
revised_at: "2026-09-25"
revision_note: "Üç koşulun kaynağı düzeltildi: sınırlı bekleme Dijkstra'nın maddesi değil, ayrı bir adalet koşulu; öncelik tersine dönmesinin üç iş parçacıklı hâli ve monitör farkı eklendi."
---
## Kilidin ne söz verdiği

Süreçler makalesi problemi kurmuştu: paylaşılan bir sayacı artıran iki iş parçacığı, tek satırlık artırma makine kodunda üç komuta çevrildiği için birbirinin işini kaybediyordu. CPU zamanlama makalesi bunun neden kaçınılmaz olduğunu gösterdi: modern çizelgeleyiciler önkesmelidir, yani o üç komutun **ortasında** kesme gelebilir — ve yeterince çok çalıştırırsan gelir.

Eşzamanlı kod okurken doğru zihinsel duruş şudur: **çizelgeleyiciyi kötü niyetli varsay.** Kendine, iş parçacıklarını mümkün olan en uygunsuz anlarda kesen bir düşman gibi davran. Belirli bir kesme sırasının olasılığı düşük olabilir; ispat için gerekli olan tek şey **mümkün** olmasıdır.

Doğruluk makalesinin dili burada birebir işe yarıyor. Bir kilit, korunan bir değişmez sözü verir: *her an kritik kesimde en fazla bir iş parçacığı vardır.* Bir kilidin doğru olduğunu göstermek, bu değişmezin her olası geçişte korunduğunu göstermektir; kırmak içinse değişmezi bozan tek bir yürütme izi yeter.

## Problemin üç koşulu

Problemi ilk kez formüle eden Dijkstra'dır. 1965 tarihli ders notlarında çözümden şunları ister: her an en fazla bir süreç kritik kesiminde olsun; kritik kesiminin **iyice dışında** duran bir süreci durdurmak ötekilerin özgürlüğünü hiçbir biçimde kısıtlamasın; birden fazla süreç girmek üzereyse, hangisinin önce gireceği kararı — süreçlere hangi sonlu hızları verirsen ver — **sonsuza ertelenemesin**. Bir de yasak koyar: çözüm, süreçlerin göreli hızları hakkında hiçbir şey varsayamaz.

Bugünkü ders kitapları bu listeyi üç adlı koşulla söyler ve mülakatta beklenen adlar bunlardır. Dijkstra'nın maddeleriyle birebir örtüşmezler; hangisinin nereden geldiğini bilmek, üçüncü koşulu doğru savunmanın ön şartıdır.

**Karşılıklı dışlama (mutual exclusion).** Herhangi bir anda süreçlerden **en fazla biri** kritik kesiminde olabilir. Dijkstra'nın ilk maddesidir ve "kötü bir şey olmasın" türünden bir koşuldur.

**İlerleme (progress).** Kritik kesim boşken ve girmek isteyenler varken, içeri kimin gireceği kararına yalnızca girmek isteyenler katılır ve bu karar sonsuza ertelenemez. Dijkstra'nın ikinci ve üçüncü maddesinin birleşimidir: dışarıda duran süreç kimseyi durduramaz, bekleyenler de "önce sen, hayır önce sen" diye sonsuza kadar takılamaz. Dikkat: bu koşul **birinin** gireceğini söyler, **senin** gireceğini değil.

**Sınırlı bekleme (bounded waiting).** Bir süreç girmek istediğini bildirdikten sonra, isteği karşılanana kadar ötekilerin kritik kesime kaç kez girebileceğinin bir üst sınırı vardır. Bu, ilerlemenin üstüne eklenen bir adalet koşuludur ve Dijkstra'nın 1965 listesinde yoktur: onun üçüncü maddesi kararın verileceğini garanti eder, ama her kararda aynı şanssız süreç dışarıda kalabilir. Sınırlı bekleme bunu, yani **açlığı**, yasaklar.

Bir gerçekleştirimi değerlendirirken üç eksen kullanılır ve bu eksenler yukarıdaki koşulların mühendislik karşılığıdır: **doğruluk** (karşılıklı dışlamayı sağlıyor mu?), **adalet** (bekleyen bir iş parçacığı aç kalır mı?) ve **başarım** (çekişme yokken maliyeti ne, tek işlemcide çekişme varken ne, çok işlemcide ne?). Bir kilit önerisini savunurken bu üçünü ayrı ayrı cevaplamak gerekir; mülakatta "kilidi nasıl kurarsın?" sorusunun tam cevabı budur.

## Kilit bir değişkendir

Kilidin arayüzü iki işlemden ibarettir. `kilitle()` çağrısı kilidi almaya çalışır; kilit boştaysa çağıran onu alır ve kritik kesime girer, bu iş parçacığı artık kilidin **sahibidir**. Kilit tutuluyorsa çağrı **dönmez**. `birak()` çağrısı kilidi serbest bırakır; bekleyen varsa biri onu alır.

Kilit değişkeninin kendisi yalnızca bir durum tutar: boş ya da tutulmuş. POSIX'te bu nesnenin adı **mutex**'tir (mutual exclusion'ın kısaltması). İçine sahibin kimliği veya bekleyenlerin kuyruğu da konabilir, ama bunlar kullanıcıdan gizlenir — veri yapıları makalesindeki arayüz ile temsil ayrımının aynısı.

Bir de kültürel kural var: kilit veriyi korur. Her paylaşılan veri parçasına bir kilit eşlenir ve o veriye erişen her kod yolu eşlenmiş kilidi tutar; buna "kilit şu veriyi korur" denir. Tek bir büyük kilit her şeyi korumak için kullanılabilir — **kaba taneli (coarse-grained)** yaklaşım — ama farklı verileri farklı kilitlerle korumak eşzamanlılığı artırır; buna **ince taneli (fine-grained)** denir. Bedeli birazdan göreceğimiz kilitlenme riskidir.

## Birinci deneme: kesmeleri kapatmak

Tek işlemcili bir makinede en eski çözüm en kaba olanıdır: kritik kesime girerken kesmeleri kapat, çıkarken aç. Kesme yoksa önkesme de yoktur, dolayısıyla üç komutluk dizi bölünmez gibi çalışır.

Kullanıcı programları için bu çözüm ölüdür ve üç nedeni vardır. Birincisi, kesmeleri kapatmak **ayrıcalıklı bir komuttur**; onu herhangi bir programa açmak, işletim sistemi makalesinde kurduğumuz güçlü yalıtımı çöpe atmak demektir — açgözlü bir program kilidi alıp işlemciyi süresiz tutabilir. İkincisi, **çok işlemcide çalışmaz**: başka bir çekirdekte koşan iş parçacığı senin kapattığın kesmelerden etkilenmez ve kritik kesime rahatça girer. Üçüncüsü, kesmeler uzun süre kapalı kalırsa **kaybolur**; diskin okuma isteğini bitirdiğini kaçıran bir çekirdek, bekleyen süreci hiç uyandıramaz.

Ama çözümün bir yaşadığı yer var: **çekirdeğin kendi içi**. Orada güven sorunu yoktur, çekirdek zaten ayrıcalıklıdır. İşletim sistemi makalesinde "kesmeleri kapatmak" seçeneğini anıp bırakmıştık; somut hâli şudur. Bir çekirdek kilidi hem sıradan çekirdek kodu hem de bir kesme işleyicisi tarafından kullanılıyorsa, o kilidi **kesmeler açıkken tutmak yasaktır**. Sebebi tek satırlık bir felakettir: sistem çağrısı sayaç kilidini tutarken zamanlayıcı kesmesi gelir, kesme işleyicisi aynı kilidi almaya çalışır, kilit ancak kesilen kod devam ederse bırakılacaktır ama o kod ancak işleyici dönerse devam edecektir. İşlemci kilitlenir. xv6 öğretim çekirdeği bu yüzden daha ihtiyatlı davranır: **herhangi bir** kilit alınırken o işlemcideki kesmeleri kapatır ve iç içe kritik kesimleri sayarak, sayaç sıfıra indiğinde en dıştaki kesitin başındaki kesme durumunu geri yükler. Sıralama da önemlidir: kesmeler bayrak kurulmadan **önce** kapatılmalıdır, yoksa kilidin tutulduğu ama kesmelerin açık olduğu kısa bir pencere kalır ve talihsiz zamanlı bir kesme sistemi kilitler.

## İkinci deneme: bir bayrak

Donanımdan yardım almadan, sıradan okuma ve yazmalarla deneyelim. Bir bayrak değişkeni tutalım: 0 boş, 1 tutulmuş. `kilitle()` bayrağı okur, 1 ise dönerek bekler, 0 ise bayrağı 1 yapıp girer. `birak()` bayrağı 0 yapar.

Kötü niyetli çizelgeleyici bunu ikinci hamlede kırar. İş parçacığı 1 bayrağı okur ve 0 görür; tam bayrağı yazmadan kesilir. İş parçacığı 2 çalışır, bayrağı okur ve **yine 0 görür**; o da yazmadan kesilir. Denetim 1'e döner: bayrağı 1 yapar ve kritik kesime girer. Sonra 2 döner; onun elinde de hâlâ "boştu" bilgisi vardır: bayrağı 1 yapar ve **o da girer**. Şekil 1'deki merdiven bu sırayı adım adım gösteriyor. Karşılıklı dışlama daha ilk koşulda düşmüştür.

Bunu göz kararıyla bırakmadım: iki iş parçacığının bütün yürütme sıralarını kaba kuvvetle taradığım küçük bir program yazdım. Bayrak çözümünde erişilebilir **57 durumun** içinde ikisinin de kritik kesimde olduğu bir durum var; birazdan kuracağımız test-and-set kilidinde erişilebilir **5 durumun** hiçbirinde yok. Bu sayılar bana ait, kaynaktan alınmadı. Modelde iki iş parçacığı sonsuz döngüde çalışır; durum, iki program sayacı, bayrak ve her iş parçacığının okuduğu değerdir. Bayrakta oku, sına, yaz, kritik kesim ve bırak beş ayrı adımdır; test-and-set'te okuma, yazma ve sınama tek adımdır. İki sayı bu yüzden farklı incelikte sayılmıştır ve birbirine oranlanmamalıdır; karşılaştırılacak olan ihlalin varlığıdır.

İkinci bir sorun daha var: bekleme biçimi. Bayrağı sürekli okuyarak beklemeye **meşgul bekleme** ya da **dönerek bekleme (spin-waiting)** denir ve bekleyen iş parçacığı bu sırada işlemciyi yakar.

![İki panelli şema. Solda yükle/sakla ile kurulan bayrağın çöküşü, adım ve iki iş parçacığı sütunlu bir izdir: önce İş parçacığı 1, sonra İş parçacığı 2 bayrağı okur ve 0 görür; İş parçacığı 1 bayrağı 1 yapıp kritik kesime girerken İş parçacığı 2 de bayrağı 1 yapar; 5. adımda ikisi de vurgulu biçimde kritik kesimdedir: karşılıklı dışlama yok. Sağda merdivenin dört basamağı: kesmeleri kapatmak çok işlemcide olmaz; bayrak karşılıklı dışlamayı bile veremez; vurgulu test_and_set oku ve yaz tek adımda, karşılıklı dışlama var ama adalet yok; sıra kilidi numara verir, sınırlı bekleme de var. Alt satır: kaba kuvvetle tarandı, bayrakta 57 durumun içinde ihlal var, test-and-set'te 5 durumda yok](assets/kilit-merdiveni.svg "Şekil 1 — Sıradan okuma ve yazma yetmez; eksik olan tek şey bölünmezliktir")

## Donanımdan tek bir söz: test-and-set

Bayrak çözümünün hatası mantıkta değil, **bölünmezliktedir**: "oku" ile "yaz" arasında bir boşluk var. Donanım o boşluğu kapatan tek bir komut verirse iş biter. En basit biçimi **test-and-set** ya da atomik takas komutudur:

```
int test_and_set(int *adres, int yeni) {
    int eski = *adres;   // 1) eski değeri oku
    *adres = yeni;       // 2) yeni değeri yaz
    return eski;         // üç adım tek, bölünmez komuttur
}

void kilitle(kilit_t *k) { while (test_and_set(&k->bayrak, 1) == 1) ; }
void birak(kilit_t *k)   { k->bayrak = 0; }
```

Doğruluğu iki durumla okunur. Kilit boşsa (`bayrak = 0`), `test_and_set` eski değer olarak 0 döndürür — çağıran döngüye takılmaz, girer — ve aynı anda bayrağı 1 yapar. Kilit tutuluyorsa eski değer 1 döner, çağıran döner ve bekler; her denemede bayrağı 1 yapmaya devam eder ama zaten 1'dir, bir şey bozulmaz. Testi ve atamayı tek bir bölünmez işlem yapmak, karşılıklı dışlamayı sağlamaya **yeter**.

Bu kilide **dönen kilit (spin lock)** denir. İnce ama kritik bir koşulu var: tek işlemcide çalışması için çizelgeleyicinin **önkesmeli** olması gerekir. Önkesme yoksa dönen iş parçacığı işlemciyi hiç bırakmaz ve kilidi tutan asla çalışamaz — dönen kilit, CPU zamanlama makalesindeki zamanlayıcı kesmesi garantisine yaslanır.

Donanımın verdiği tek ilkel bu değildir. **Karşılaştır-ve-değiştir (compare-and-swap)** bir adresteki değer beklenene eşitse yenisini yazar ve eski değeri döndürür; test-and-set'ten daha güçlüdür ve kilitsiz veri yapılarının temelidir. **Getir-ve-ekle (fetch-and-add)** bir değeri atomik olarak artırıp eskisini döndürür ve daha ilginç bir kilit kurmaya yarar: **sıra kilidi (ticket lock)**. Kilit iki sayaç tutar — dağıtılan bilet ve sıradaki numara. Gelen iş parçacığı getir-ve-ekle ile kendine bir bilet alır ve sırası gelene kadar bekler; bırakan, sıradaki numarayı bir artırır. Farkı Şekil 1'in sağ panelinde: basit dönen kilitte bir iş parçacığı sonsuza kadar şanssız olabilir, sıra kilidinde numara aldıysan **önündekiler bitince mutlaka girersin**. Üçüncü koşul, yani sınırlı bekleme, tam olarak budur.

## Dönmek mi, uyumak mı?

Dönen kilitler doğrudur ama pahalıdır ve pahalılığın nedeni Dijkstra'nın 1965'te yazdığı gibidir: bir süreç zaten beklemek zorundaysa "uyuyabilirdi"; oysa dönen çözüm onu sürekli ortak değişken okuyup yazarken tutar, sanki bunun bir bedeli yokmuş gibi. Tek işlemcide bedel somuttur: kilidi tutan iş parçacığı kritik kesimin içinde önkesilirse, geri kalan N − 1 iş parçacığının her biri **birer tam zaman dilimi boyunca dönüp** işlemciyi boşa harcar. Çok işlemcide tablo tersine döner: kilidi tutan başka bir çekirdekte gerçekten çalışıyorsa ve kritik kesim kısaysa, birkaç yüz çevrim dönmek bağlam anahtarından ucuzdur.

Aradaki üç seçenek — Şekil 2'nin sol paneli — şöyle sıralanır. **Dön:** hiçbir sistem çağrısı yok, tek işlemcide en kötü durumda N − 1 zaman dilimi boşa gider. **İşlemciyi bırak (yield):** dönmek yerine kendini çizelgeden çıkarırsın; yüz iş parçacığı varsa doksan dokuz bağlam anahtarı ödersin ve açlık hâlâ mümkündür. **Kuyrukta uyu:** kilit kendi bekleyen kuyruğunu tutar, giremeyen iş parçacığı kuyruğa eklenip uyutulur, bırakan onu uyandırır. Üçüncüsü hem israfı hem açlığı çözer, ama işletim sisteminden destek ister — Solaris'te `park()` ve `unpark()` çağrıları, Linux'ta `futex`. Gerçek kilitler ikisini birleştirir: **iki fazlı kilit (two-phase lock)** önce kısa bir süre döner (kilit birazdan bırakılacaksa bu ucuzdur), olmazsa uyur.

Uyuyan kilitlerin kendi tuzağı da vardır. Bir iş parçacığı "kilit tutuluyor" görüp kuyruğa eklendikten sonra, tam uyumadan önce kesilirse ve o arada kilit bırakılırsa, uyandırma **kimseye ulaşmaz**; sonra o iş parçacığı uyur ve belki hiç uyanmaz. Bu yarışın adı **uyandırma/bekleme yarışıdır** ve çözümü çekirdekten ek bir söz istemektir: "uyumak üzereyim" diyebilmek ya da kilit bırakma ile kuyruğa girmeyi atomik yapmak.

Son bir tuzak, kilidin kendisinden değil çizelgeleyiciyle etkileşiminden doğar. Düşük öncelikli bir iş parçacığı kilidi alsın; yüksek öncelikli bir iş parçacığı aynı kilidi isteyip dönmeye başlasın. Çizelgeleyici her zaman yüksek önceliği seçtiği için düşük öncelikli olan hiç çalışamaz ve kilidi bırakamaz; sistem donar. Adı **öncelik tersine dönmesidir (priority inversion)**. Daha sinsi biçimi üç iş parçacıklıdır ve uyuyan kilitlerde de olur: yüksek öncelikli iş parçacığı kilidi bekleyip uyurken orta öncelikli bir iş parçacığı düşük öncelikliyi önkeser; kilidi tutan çalışamadığı için yüksek öncelikli olan, kendisiyle hiç ilgisi olmayan orta öncelikli işin bitmesini bekler. 1997'de Mars Pathfinder aracında yaşanan buydu. Standart çözümü **öncelik kalıtımıdır (priority inheritance)**: kilidi bekleyen yüksek öncelikli iş parçacığı, kendi önceliğini kilidi tutana geçici olarak ödünç verir.

![İki panelli şema. Solda kilidi bekleyenin üç seçeneği: Dön, çekirdek gerekmez ama tek işlemcide N−1 dilim boşa gider; İşlemciyi bırak, yani yield, yüz iş parçacığında doksan dokuz anahtar öder; vurgulu Kuyrukta uyu, kilit kendi bekleyen kuyruğunu tutar ve bırakan sıradakini uyandırır, israf da açlık da biter ama OS desteği ister. Alt satır: gerçek kilitler önce kısa süre döner, sonra uyur. Sağda semafor, tek sayaç ve iki işlem: V sayacı bölünmez biçimde 1 artırır, bekleyen varsa birini uyandırır; P sonuç negatif olmayacaksa 1 azaltır, olacaksa çağıran bekler. Başlangıç 1 kilit, 0 sıralama, N en fazla N girişlik havuz demektir. Başka biçimde P önce azaltıp negatife iner ve mutlak değer bekleyen sayısıdır](assets/bekleme-ve-semafor.svg "Şekil 2 — Bekleyenin üç seçeneği ve aynı sayacın üç farklı işi")

> **Sesli anlat:** "Bir kilit nasıl kurulur? Donanımdan ne isteriz, işletim sisteminden ne isteriz? Doksan saniye."
>
> İyi bir cevabın omurgası: "Önce koşulları söylerim: karşılıklı dışlama, ilerleme ve sınırlı bekleme; ayrıca süreçlerin göreli hızları hakkında varsayım yapmam yasak. Sıradan okuma ve yazmalarla kurulan bayrak çözümü daha ilk koşulu sağlamaz, çünkü okuma ile yazma arasında kesme gelebilir ve iki iş parçacığı da bayrağı sıfır görüp içeri girer. Eksik olan mantık değil, bölünmezliktir; o yüzden donanımdan tek bir atomik komut isterim: test-and-set, eski değeri döndürürken yenisini yazar. Bununla dönen kilit üç satırdır ve karşılıklı dışlamayı sağlar. Ama adaleti sağlamaz; getir-ve-ekle ile kurulan sıra kilidi herkese numara verdiği için sınırlı beklemeyi de sağlar. Kesmeleri kapatmak yalnızca tek işlemcide ve yalnızca çekirdeğin içinde geçerli bir seçenektir. İşletim sisteminden isteyeceğim şey ise beklemenin biçimidir: dönmek yerine kuyrukta uyuyabilmek için park ve unpark benzeri çağrılar gerekir; gerçek kilitler önce kısa süre döner, sonra uyur."

## Semafor: bir sayaç, iki işlem

Kilit tek bir soruyu cevaplar: içeride miyim? Dijkstra 1965'te bundan daha genel bir ilkel önerdi — **semafor**: paylaşılan bir tam sayı ve onun üzerinde tanımlı iki bölünmez işlem.

**V işlemi**, argüman semaforun değerini bir artırır ve bu artış bölünmez sayılır. Sıradan bir `S := S + 1` neden yetmez? Çünkü iki süreç aynı anda okuyup aynı değeri yazabilir ve artışlardan biri kaybolur — süreçler makalesindeki sayaç örneğinin ta kendisi. **P işlemi**, sonuç negatif olmayacaksa değeri bir azaltır; negatif olacaksa azaltma yapılmaz ve çağıran bekler. Gecikmeyi taşıyan işlem P'dir: değeri sıfır olan bir semafor üzerinde P çağıran süreç, bir başkası aynı semafora V yapana kadar devam edemez. Modern isimleri `sem_wait` ve `sem_post`'tur; bekletme yönünü hatırlamak için "aşağı" ve "yukarı" da denir. Dijkstra'nın tanımında değer hiç negatife inmez. OSTEP'in anlattığı öteki biçimde ise P önce azaltır, sonuç negatifse bekler; bu gerçekleştirimde faydalı bir değişmez vardır: **negatif değerin mutlak değeri, bekleyen süreç sayısıdır.**

Semaforun gücü tek bir sayının üç farklı iş görmesindedir ve farkı yaratan yalnızca **başlangıç değeridir**; Şekil 2'nin sağ paneli üçünü yan yana koyuyor.

**Bir ile başlat:** semafor bir kilittir. `P` ile gir, `V` ile çık; ikinci süreç P'de bekler. Buna **ikili semafor** denir.

**Sıfır ile başlat:** semafor bir sıralama aracıdır. Bir iş parçacığının bitirdiğini ötekine bildirmek istiyorsan, bekleyen P çağırır ve sıfırda takılır; bitiren V çağırır ve onu serbest bırakır. İş parçacığı beklemenin (join) çekirdek deseni budur.

**N ile başlat:** semafor bir kaynak havuzudur. En fazla N iş parçacığının aynı anda girmesine izin verirsin; N + 1'incisi bekler. Bellek yoğun bir bölgeye giren iş parçacığı sayısını sınırlamak — buna **kısma (throttling)** denir — bu kullanımın kanonik örneğidir.

## Koşul değişkeni ve monitör

Kilit "başkası içeride" diye bekletir. Ama sık sık başka bir şey beklemek isteriz: tampon dolana kadar, çocuk süreç bitene kadar, disk okuması tamamlanana kadar. Bunun aracına **koşul değişkeni (condition variable)** denir: iş parçacıklarının kendilerini üzerine yatırabileceği açık bir kuyruk. İki işlemi vardır — `bekle()` çağıran uyur, `bildir()` bekleyenlerden birini uyandırır.

Kritik incelik, `bekle()` çağrısının neden **kilidi de parametre olarak aldığıdır** ve bu, mülakatın en ayırt edici sorularından biridir. Cevabı bir yanlış tasarımı adım adım kırarak bulunur.

Naif tasarımda bekleyen, koşulu kilitsiz kontrol eder ve uygun değilse uyur. Kontrol ile uyuma arasında başka bir iş parçacığı koşulu sağlar ve uyandırma çağrısı yapar; ama henüz uyuyan kimse yoktur, dolayısıyla uyandırma **boşa gider**. Sonra bekleyen uyur ve zaten gerçekleşmiş bir olayı bekler; belki sonsuza kadar. Bu hatanın adı **kayıp uyandırmadır (lost wakeup)**.

Bariz düzeltme, kontrol ile uyumayı kilitle korumaktır. Ama bu da çalışmaz ve bozulma biçimi çok öğreticidir: bekleyen kilidi **tutarken** uyur, uyandıracak olan ise kilidi almak için bekler. İkisi de sonsuza kadar bekler.

Doğru çözüm, iki şeyi tek bir bölünmez adımda yapmaktır: **çağıranı uyuyanlar kuyruğuna yaz, sonra kilidi bırak.** Uyanınca da kilidi geri al. `bekle(koşul, kilit)` imzasının tek nedeni budur.

Bir tuzak daha var. Uyandırma neredeyse bütün sistemlerde yalnızca bir **ipucudur**: "dünyanın durumu değişmiş olabilir". Uyanan iş parçacığı çalışana kadar başka biri araya girip durumu geri çevirebilir. Bu yoruma **Mesa semantiği** denir; uyanan iş parçacığının hemen çalışacağını garanti eden **Hoare semantiği** daha güçlüdür ama gerçek sistemlerin neredeyse hiçbiri onu kullanmaz. Pratik sonucu tek satırlık bir kuraldır: **koşulu `if` ile değil, `while` ile kontrol et.**

Kilit ile koşul değişkenlerinin bir arada paketlenmiş hâline **monitör (monitor)** denir: veri, onu koruyan kilit ve o veriyle ilgili beklemeleri taşıyan koşul değişkenleri tek bir yapıda durur. Monitörü elle kurulmuş bir kilit–koşul çiftinden ayıran şey, kilidin **programcıya bırakılmamasıdır**: monitörün her giriş yordamına girerken kilit dil ya da derleyici tarafından alınır, çıkarken bırakılır; bu yüzden kilidi almayı unutmak diye bir hata kalmaz. Java'nın `synchronized` bloğu ve `wait`/`notify` çifti bu fikrin doğrudan uygulamasıdır.

> **Sesli anlat:** "Semaforla kilit arasındaki fark nedir, koşul değişkeni ne zaman gerekir? Doksan saniye."
>
> İyi bir cevabın omurgası: "Kilit ikili bir sorunun cevabıdır: kritik kesim boş mu, değil mi. Semafor bir sayaçtır ve iki bölünmez işlemi vardır; artıran işlem bekleyen varsa birini uyandırır, azaltan işlem sonuç negatif olacaksa bekler. Farkı başlangıç değeri yaratır: bir ile başlatırsam kilit olur, sıfır ile başlatırsam sıralama aracı olur — biri bitirmeden öteki geçemez —, N ile başlatırsam en fazla N girişe izin veren kaynak havuzu olur. Koşul değişkeni ise 'kilit boşalsın' diye değil, 'şu koşul sağlansın' diye beklemek gerektiğinde lazımdır: tampon dolsun, çocuk süreç bitsin. Bekleme çağrısının kilidi parametre almasının nedeni, uyuyanlar kuyruğuna girmekle kilidi bırakmanın atomik olması gerektiğidir; ayrı yaparsan ya uyandırma kaybolur ya da kilidi tutarken uyuyup uyandıracak olanı kilitlersin. Ve uyandırma bir ipucu olduğu için koşul her zaman while ile kontrol edilir. Kilidi ve koşul değişkenlerini korudukları veriyle birlikte paketlersem buna monitör denir."

## Mülakatta nasıl görünür

Bu makalenin soruları merdivenden iner: "kritik kesim nedir?" ile başlar, "kilidi nasıl kurarsın?" ile devam eder, "neden test-and-set yetiyor da bayrak yetmiyor?" ile derinleşir. Son halkada genellikle bir takas sorulur: dönmek mi uyumak mı, kaba taneli mi ince taneli.

Altı tipik hata var. **Karşılıklı dışlamayı tek koşul sanmak ya da ilerlemeyi sınırlı bekleme sanmak** — ilerleme birinin gireceğini söyler, sınırlı bekleme her bekleyenin sırası geleceğini; basit dönen kilit ilkini sağlar, ikincisini sağlamaz. **Bayrak çözümünün neden bozulduğunu 'çok işlemci' ile açıklamak** — tek işlemcide de bozulur, çünkü okuma ile yazma arasında kesme gelir. **Atomikliği kilidin kendisiyle karıştırmak** — donanım tek bir komutu bölünmez yapar, kilit o komutun üstüne kurulan yazılımdır. **Dönen kilidi her yerde kötü ilan etmek** — kısa kritik kesimlerde ve çok işlemcide sıklıkla en hızlı seçenektir. **Semaforu yalnızca kilit sanmak** — sıralama ve kaynak sayma kullanımları en az kilit kadar yaygındır. **Koşulu `if` ile kontrol etmek** — Mesa semantiğinde uyanmak koşulun hâlâ doğru olduğunu garanti etmez.

Bir de ölçü refleksi: "dönmek mi uyumak mı?" sorusunun cevabı sayı ister. Bağlam anahtarının maliyeti ile kritik kesimin beklenen uzunluğu karşılaştırılır; kritik kesim anahtar maliyetinden kısaysa dönmek kazanır.

İngilizce karşılıklar hazır olmalıdır: *critical section*, *mutual exclusion*, *progress*, *bounded waiting*, *lock*, *mutex*, *coarse-grained / fine-grained locking*, *disabling interrupts*, *spin lock*, *busy waiting / spin-waiting*, *test-and-set*, *compare-and-swap*, *fetch-and-add*, *ticket lock*, *yield*, *park / unpark*, *futex*, *two-phase lock*, *priority inversion*, *priority inheritance*, *semaphore*, *binary semaphore*, *throttling*, *condition variable*, *lost wakeup*, *Mesa semantics*, *monitor*.

### Sırada ne var

Elimizde artık üç ilkel var: kilit, semafor ve koşul değişkeni. Ama bir ilkeli bilmekle onu doğru kullanmak aynı şey değildir; eşzamanlılığın zor kısmı burada başlar.

Sıradaki makale üç klasik problemi çözüyor ve her çözümü savunuyor: sınırlı tamponlu üretici-tüketici, okuyucu-yazar ve yemek yiyen filozoflar. Üçü de rastgele seçilmiş bulmacalar değil, birer sınav sorusudur — üretici-tüketici koşul değişkeninin doğru kullanımını, okuyucu-yazar adaleti, filozoflar ise kilit sırasının kendisini sınar. Orada ayrıca doğruluk makalesindeki kısmi doğruluk ile sonlanma ayrımının eşzamanlılık karşılığını adlandıracağız: güvenlik ve canlılık. Filozofların çöktüğü yer ise kendi makalesini bekleyen bir konunun kapısını açacak — dört koşulu, önlemesi ve kaçınmasıyla kilitlenme.

## Kaynakça

- Dijkstra, E. W. *Cooperating Sequential Processes* (EWD 123), Technological University Eindhoven, 1965 — **genelleştirilmiş karşılıklı dışlama probleminin** kuruluşu ve çözümün sağlaması gereken koşullar, birebir: "given N cyclic processes, each with a critical section, can we construct them in such a way, that at any moment at most one of them is engaged in its critical section?" ile "stopping one process well outside its critical section may in no way restrict the freedom of the others" ve "if more than one process is about to enter its critical section, it must be impossible to devise for them such finite speeds, that the decision which one of them is the first one to enter its critical section, can be postponed until eternity"; ortak değişkene erişimin bölünmez sayılması varsayımı; **meşgul beklemenin maliyeti** ("they have to wait anyhow, and as far as we are concerned 'they could go to sleep'") ve tek işlemcili bir sistemde bekleyen sürecin işlemci zamanını yemesinin neden kabul edilemez olduğu; **semaforların** ortak değişken olarak tanımı ve **P ile V işlemlerinin** birebir tanımları — V "to increase the value of its argument semaphore by 1; this increase is to be regarded as an indivisible operation", P "to decrease the value of its argument semaphore by 1 as soon as the resulting value would be non-negative"; sıradan bir artırmanın neden yetmediğinin adım adım gösterimi; ikili ile genel semafor ayrımı ve tek bir ikili semaforla N sürecin kritik kesim probleminin çözülmesi. Metin, yazarın arşivindeki transkripsiyondan okunmuştur. [Bağlantı](https://www.cs.utexas.edu/~EWD/transcriptions/EWD01xx/EWD123.html)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 28: Locks — kilidin bir değişken olarak tanımı, boş/tutulmuş durumları ve **sahiplik**; POSIX'te adının **mutex** olması, kaba taneli ile ince taneli kilitleme ayrımı; kilit değerlendirmesinin **üç ekseni** (karşılıklı dışlama, adalet/açlık, başarım — çekişmesiz, tek işlemcide çekişmeli ve çok işlemcili durumlar); **kesmeleri kapatmanın** üç zaafı (ayrıcalık ve güven, çok işlemcide işe yaramaması, kesmelerin kaybolması) ve yalnızca çekirdek içinde kullanılabilirliği; **yükle/sakla ile kurulan bayrağın** iki sorunu ve karşılıklı dışlamayı bozan yürütme izi; "kötü niyetli çizelgeleyici gibi düşün" kutusu; **test-and-set** komutunun C karşılığı, üzerine kurulan dönen kilit ve doğruluk gerekçesi, dönen kilidin tek işlemcide **önkesmeli çizelgeleyici** gerektirmesi; dönen kilitlerin adalet sağlamaması; **compare-and-swap** ve **fetch-and-add**; fetch-and-add ile kurulan **sıra kilidinin** bütün iş parçacıkları için ilerleme garantisi; dönmenin maliyeti (N − 1 iş parçacığının birer zaman dilimi harcaması), **yield** yaklaşımının 99 bağlam anahtarı örneği ve açlığı çözmemesi; **kuyruk + park/unpark** ile uyuyan kilit, **uyandırma/bekleme yarışı** ve Solaris'in `setpark()` çözümü; Linux'un `futex` desteği ve **iki fazlı kilit**; **öncelik tersine dönmesi** kutusu (iki iş parçacıklı dönen kilit senaryosu ve dönen kilitten vazgeçmenin yetmediğini gösteren üç iş parçacıklı, orta öncelikli senaryo; Mars ve Dünya örnekleri) ile **öncelik kalıtımı**. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Reeves, G. E. *What Really Happened on Mars?*, 1997 — OSTEP'in öncelik tersine dönmesi kutusunda [R97] olarak atıf yaptığı, Mars Pathfinder yazılım ekibinden birinci elden anlatım: düşük öncelikli ASI/MET görevinin `select()` düzeneğindeki dışlayıcı semaforu tutarken önkesilmesi, orta öncelikli görevlerin onu çalıştırmaması ve semaforu bekleyen yüksek öncelikli `bc_dist` görevinin takılması; düzeltmenin semaforda **öncelik kalıtımını** açmak olması. Metin OSTEP'in kendi sitesindeki kopyadan okunmuştur. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/Citations/mars.html)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 30: Condition Variables — **koşul değişkeninin** tanımı ("an explicit queue that threads can put themselves on when some state of execution is not as desired") ve fikrin Dijkstra'nın özel semaforlarına dayanıp adının Hoare'ın monitör çalışmasından gelmesi; `wait()` ile `signal()` işlemleri ve POSIX imzalarında **bekleme çağrısının kilidi de parametre alması**; **Mesa semantiği** ile **Hoare semantiği** ayrımı ("Signaling a thread only wakes them up; it is thus a hint that the state of the world has changed") ve pratikte her sistemin Mesa'yı kullanması; koşulun **`while` ile kontrol edilmesi** kuralı ve sahte uyanmaların bu kuralı ayrıca gerektirmesi. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 31: Semaphores — semaforun tanımı, `sem_init` ile başlangıç değerinin davranışı belirlemesi, `sem_wait` ile `sem_post` davranışları ve P/V adlarının Dijkstra'daki kökeni; **negatif değerin bekleyen iş parçacığı sayısına eşit olması** değişmezi; **ikili semaforun kilit olarak** kullanımı ve başlangıç değerinin neden 1 olduğu; semaforun **sıralama** için sıfırla başlatılması; **kısma (throttling)** kullanımı: bellek yoğun bölgeye giren iş parçacığı sayısını başlangıç değeriyle sınırlamak. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Cox, R., Kaashoek, F. & Morris, R. *xv6: a simple, Unix-like teaching operating system* (RISC-V sürümü), Chapter 6: Locking — çekirdek içi eşzamanlılığın üç kaynağı (çok işlemcili paralellik, iş parçacığı değişimi ve **kesme işleyicileri**); kilidin veriyi koruması ("If the programmer associates a lock with each shared data item… we say that the lock protects the data item") ve kilitlerin başarımı sınırlaması; **kesme işleyicileriyle paylaşılan kilitler**: bir işlemcinin böyle bir kilidi kesmeler açıkken tutmasının yasak olması ve `tickslock` üzerinden verilen tek işlemcilik kilitlenme senaryosu; xv6'nın daha ihtiyatlı kuralı (herhangi bir kilit alınırken o işlemcide kesmeleri kapatmak), `push_off`/`pop_off` ile iç içe kritik kesimlerin sayılması ve sayaç sıfırlanınca en dıştaki kesitin kesme durumunun geri yüklenmesi, `push_off` çağrısının bayrak kurulmadan **önce** yapılmasının zorunluluğu. MIT 6.1810 / 6.828, 2024. [Bağlantı](https://pdos.csail.mit.edu/6.828/2024/xv6/book-riscv-rev4.pdf)
- Silberschatz, A., Galvin, P. B. & Gagne, G. *Operating System Concepts*, onuncu baskı — bu makalenin kapsamının ders kitabı karşılığı **Chapter 6 Synchronization Tools**'tur; ilgili alt bölümler resmî içindekiler tablosundan doğrulanmıştır: 6.1 Background, 6.2 The Critical-Section Problem (karşılıklı dışlama, ilerleme ve sınırlı bekleme adlandırmasının ders kitabı kaynağı), 6.3 Peterson's Solution, 6.4 Hardware Support for Synchronization, 6.5 Mutex Locks, 6.6 Semaphores, 6.7 Monitors, 6.8 Liveness, 6.9 Evaluation. John Wiley & Sons. [Bağlantı](https://www.os-book.com/OS10/index.html)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE322 — Operating Systems* — bu makalenin resmî dayanağı katalog tanımındaki "process synchronization, critical section problem" ifadesidir; sayfa bu run'da (2026-09-10) yeniden çekilerek doğrulandı. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe322/)
