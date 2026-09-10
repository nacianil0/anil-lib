---
article_id: article_52ac6ec5-db5f-4042-831a-5cbad0b4901e
title: "Klasik Eşzamanlılık Problemleri: Çözümü Savunmak"
slug: klasik-eszamanlilik-problemleri-cozumu-savunmak
category: operating-systems
level: advanced
reading_order: 30
summary: "Üç klasik problem birer bulmaca değil, birer sınavdır. Önce ispatın iki yarısı adlandırılıyor: güvenlik özelliği 'kötü bir şey olmaz', canlılık özelliği 'iyi bir şey olur' der ve bu ikisi kısmi doğruluk ile sonlanmanın eşzamanlılık karşılığıdır. Sınırlı tamponlu üretici-tüketici dört adımda kuruluyor ve her adımda bir hata kırılıyor: kilit tek başına yetmez, koşul if ile değil while ile denetlenir, tek koşul değişkeni herkesi uyutur, semaforlarda kilidin sırası kilitlenme üretir. Ardından okuyucu-yazar kilidinin adalet açığı ve yemek yiyen filozofların beklenenler döngüsü — kaba kuvvetle taranmış durum uzaylarıyla."
tags:
  - uretici-tuketici
  - okuyucu-yazar
  - yemek-yiyen-filozoflar
  - guvenlik-ve-canlilik
  - kilitlenme
content_hash: sha256:7d340a62897b07dca909df276948b5c7ee7710f98f3886b8b096cf0dcd6e9b8d
classification_version: 1
classification_batch: 9
---
## Neyi ispatlamaya çalışıyoruz?

Önceki makale üç ilkel verdi: kilit, semafor, koşul değişkeni. Bir ilkeli tanımak ile onu doğru kullanmak arasında büyük bir mesafe var ve bu makale o mesafeyi üç klasik problemle kat ediyor. Üçü de rastgele seçilmiş bulmaca değil; her biri farklı bir hata sınıfını yakalayan bir sınavdır.

Ama önce ispatın neye benzediğini adlandıralım. Eşzamanlı bir programın doğruluğu iki ayrı türden özelliğe bölünür. **Güvenlik özelliği (safety property)** "kötü bir şey **olmaz**" der. **Canlılık özelliği (liveness property)** ise "iyi bir şey **olur**" der. İkisini ispatlamanın teknikleri de birbirinden farklıdır.

Bu ayrım, doğruluk makalesinde kurduğumuz ikilinin doğrudan genellemesidir ve kaynağın kendisi de tam olarak bu köprüyü kurar: tek süreçli bir programın **kısmi doğruluğu** bir güvenlik özelliğidir — doğru girdiyle başlayan program, doğru çıktıyı üretmeden duramaz. Programın **sonlanacağı** iddiası ise bir canlılık özelliğidir. Eşzamanlılıkta karşılıkları şunlardır: karşılıklı dışlama ve "kaybolan artırma yok" birer güvenlik özelliğidir; kilitlenmesizlik ve açlıksızlık birer canlılık özelliğidir.

Terim uyarısı: buradaki "güvenlik", bir sistemin saldırıya dayanıklılığı anlamındaki güvenlik değildir; sözcük teknik bir sınıf adıdır ve karşılığı İngilizcede *safety*'dir. Koruma ve güvenlik konusunun kendi makalesi geldiğinde ayrımı hatırlamak gerekecek.

Bir çözümü savunmak, artık iki soruya ayrı ayrı cevap vermek demektir: **hangi kötü şey olamaz** ve **hangi iyi şeyin olacağını garanti edebiliyorum**.

## Üretici-tüketici: sınırlı tampon

Problem şudur: bir ya da daha çok **üretici** iş parçacığı veri üretip bir tampona koyar, bir ya da daha çok **tüketici** onları alıp işler. Tampon **sonludur** ve bu yüzden problemin öteki adı **sınırlı tampondur (bounded buffer)**.

Uydurma bir problem değildir. Çok iş parçacıklı bir web sunucusunda üretici gelen istekleri bir iş kuyruğuna koyar, tüketiciler onları işler. Kabuğa `grep foo dosya.txt | wc -l` yazdığında iki süreç eşzamanlı koşar: `grep` üretici, `wc` tüketici, aralarındaki boru çekirdek içindeki sınırlı bir tampondur.

Tampon bir kuyruktur ve veri yapıları makalesinde bıraktığımız pin burada karşılanıyor: sabit boyutlu bir dizi, bir koyma indisi, bir alma indisi ve modülo aritmetiğiyle sarmalama — yani **dairesel tampon**. Bir de doluluk sayacı tutulur. Şekil 1'in sol paneli bu yapıyı ve üzerinde doğan iki bekleme koşulunu gösteriyor: üretici `sayaç == MAX` iken bekler, tüketici `sayaç == 0` iken bekler.

Çözümü tek hamlede yazmak yerine, dört adımda kuralım; her adımda bir hata kırılacak.

**Adım 1: yalnızca kilit yetmez.** `koy` ve `al` yordamları paylaşılan yapıyı değiştirir, dolayısıyla kritik kesimdir ve kilit gerekir. Ama kilit tek başına problemi çözmez: tampon doluyken üreticiye ne yapacağını söylemez. Beklemek gerekir ve beklenen şey kilidin boşalması değil, **bir koşulun sağlanmasıdır**. Bu yüzden koşul değişkeni şart.

**Adım 2: `if` değil, `while`.** Üretici, tampon doluysa `bekle` çağırsın. Kontrolü `if` ile yaparsan şu iz seni kırar: bir tüketici tampon boş olduğu için uyur; üretici bir öğe koyup bildirim yapar ve tüketiciyi **hazır** yapar — ama henüz çalıştırmaz; araya ikinci bir tüketici girip tek öğeyi alır; ilk tüketici sonunda çalışınca boş tampondan almaya kalkar. Sebep önceki makalede adlandırdığımız Mesa semantiğidir: bildirim yalnızca "durum değişmiş olabilir" ipucudur. Düzeltme tek kelimeliktir — `while`.

**Adım 3: tek koşul değişkeni yetmez.** `while` ile bile tek bir koşul değişkeni kullanırsan bildirim **yanlış tarafa** gidebilir. İki tüketici ve bir üretici düşün: tüketici bir öğe alıp bildirim yapar; uyandırması gereken üreticidir ama aynı koşul değişkeninde uyuyan öteki tüketiciyi uyandırır. O uyanır, tamponu boş bulur ve yeniden uyur. Üretici hâlâ uyumaktadır. **Üçü de uykudadır** ve program ilerlemez — bir canlılık ihlali. Çözüm, bildirimi yönlendirmektir: iki koşul değişkeni tutulur, üreticiler `boş`u bekleyip `dolu`yu bildirir, tüketiciler `dolu`yu bekleyip `boş`u bildirir. Böylece bir tüketici asla bir tüketiciyi uyandıramaz.

Doğru çözüm bu kadardır:

```
uretici:                       tuketici:
  kilitle(mutex);                kilitle(mutex);
  while (sayac == MAX)           while (sayac == 0)
      bekle(bos, mutex);             bekle(dolu, mutex);
  koy(i);                        x = al();
  bildir(dolu);                  bildir(bos);
  birak(mutex);                  birak(mutex);
```

**Adım 4: aynı problemi semaforla kur ve sırayı boz.** Semafor bu problem için icat edilmişti; üç semafor yeter. `bos` sayacı MAX ile, `dolu` sayacı 0 ile başlatılır — ikisi de kaynak sayan genel semafordur; `mutex` ise 1 ile başlatılan ikili semafordur. Üretici `P(bos)`, `P(mutex)`, koy, `V(mutex)`, `V(dolu)` yapar; tüketici simetriğini.

Şimdi tek bir şeyi değiştirelim: kilidi **en dışa** alalım, yani önce `P(mutex)`, sonra `P(bos)`. Tüketici kilidi alır, sonra `dolu` semaforunda bekler — çünkü tampon boştur — ve **kilidi tutmaya devam eder**. Üretici gelir, ilk iş olarak kilidi ister ve bekler. Tüketici üreticinin bildirimini bekliyor, üretici tüketicinin bıraktığı kilidi bekliyor: klasik bir kilitlenme.

Bu iki kurulumu da kaba kuvvetle taradım. Kilit en içteyken erişilebilir 10 durumun hiçbirinde iki iş parçacığı da bloke değil; kilit en dıştayken erişilebilir 14 durumun içinde bir kilitlenme durumu var (tüketici `mutex`i tutuyor, `dolu`yu bekliyor; üretici `mutex`i bekliyor). Bu sayılar kaynaktan değil, kendi programımdandır.

İlginç olan, aynı uyarının problemi ortaya atan metinde de bulunmasıdır. Dijkstra 1965'te aynı çözümü verdikten sonra okura bir alıştırma bırakır: üreticideki **iki V işleminin sırası önemsizdir, tüketicideki iki P işleminin sırası ise esastır.** Altmış yıllık bu cümle, mülakatta "neden bu sıra?" sorusunun tam cevabıdır: artırmak kimseyi bekletmez, azaltmak bekletir; bekleten bir işlemi kilidi tutarken yapmak kilitlenme üretir.

![Dikey bir çizgiyle ayrılmış iki panelli bir şema. Sol panelin başlığı sınırlı tampon. Panelde dört hücreli yatay bir dizi var; ilk iki hücre dolu diye etiketlenmiş ve vurgulanmış, son iki hücre boş. Dizinin üstünde MAX eşittir dört ve sayaç eşittir iki yazıyor. Dizinin altında iki ok var: birinci hücreyi gösteren ok al indisi diye, üçüncü hücreyi gösteren ok koy indisi diye etiketlenmiş; dizinin üstünde sağ uçtan sol uca dönen kesik çizgili bir ok ve onun sağında modülo ile sarmalar notu var. Panelin alt kısmında beş satır var: üretici sayaç MAX'a eşitken bekler; tüketici sayaç sıfıra eşitken bekler; iki ayrı koşul değişkeni tutulur, adları boş ve dolu; üretici boş'u bekler ve dolu'yu bildirir; tüketici dolu'yu bekler ve boş'u bildirir. Sağ panelin başlığı iki hata, iki iz. Panelde alt alta iki çerçeveli kutu var. Birinci kutunun başlığı tek koşul değişkeni; içinde üç satır var: tüketici bir öğe alıp bildirim yapar; bildirim üreticiye değil öteki tüketiciye gider; o uyanır, tamponu boş bulur, yeniden uyur ve üçü de uykuda kalır. İkinci kutu vurgulanmış; başlığı semaforlarda yanlış sıra; içinde dört satır var: tüketici önce kilidi alır, sonra dolu semaforunda bekler; kilidi tutmaya devam eder; üretici kilidi bekler, ikisi de ilerleyemez; doğrusu kilidin en içte, sayaçların dışta olmasıdır. Panelin altında iki satır: kaba kuvvet taraması, kilit en dıştayken on dört durumun içinde kilitlenme var; kilit en içteyken on durumun hiçbirinde yok](assets/sinirli-tampon.svg "Şekil 1 — Dört adımlı kuruluş: her adım bir hatayı kırar, sonuncusu sırayla ilgilidir")

> **Sesli anlat:** "Üretici-tüketici problemini koşul değişkeniyle çöz ve iki tipik hatayı anlat. Doksan saniye."
>
> İyi bir cevabın omurgası: "Paylaşılan sınırlı bir tampon var; üretici doluyken, tüketici boşken beklemeli. Tampon paylaşılan bir veri yapısı olduğu için bir kilit gerekir, ama kilit tek başına yetmez: beklenen şey kilidin boşalması değil, bir koşulun sağlanmasıdır, o yüzden koşul değişkeni kullanırım. Kilidi alırım, koşulu **while** ile kontrol ederim, sağlanmıyorsa beklerim; işimi yapınca karşı tarafı bildiririm ve kilidi bırakırım. İki tipik hata var. Birincisi koşulu `if` ile kontrol etmek: bildirim yalnızca bir ipucudur, uyanana kadar durum değişmiş olabilir; araya giren ikinci bir tüketici tek öğeyi alırsa uyanan boş tampondan almaya kalkar. İkincisi tek koşul değişkeni kullanmak: bir tüketici öteki tüketiciyi uyandırabilir, o tamponu boş bulup yeniden uyur ve üçü de uykuda kalır. Onun için iki koşul değişkeni tutarım, biri boş biri dolu. Semaforla çözersem üç semafor kullanırım — boş MAX'la, dolu sıfırla, mutex birle — ve kilidi **en içe** koyarım; en dışa koyarsam tüketici kilidi tutarken bekler, üretici kilidi bekler ve kilitlenme olur."

## Birini mi uyandırmalı, hepsini mi?

Üretici-tüketicide bildirimi doğru tarafa yönlendirmek için ikinci bir koşul değişkeni kullandık. Bazen bu mümkün değildir ve o zaman ikinci bir araç gerekir.

Örnek, çok iş parçacıklı bir bellek ayırıcıdır. Ortak sayaç boştaki bayt sayısını tutar; `ayır(boyut)` yeterli yer yoksa bekler, `serbest_bırak(boyut)` sayacı artırıp bildirim yapar. Şimdi iz şu olsun: boşta hiç yer yokken bir iş parçacığı 100 bayt, bir başkası 10 bayt ister; ikisi de uyur. Üçüncü bir iş parçacığı 50 bayt serbest bırakır ve bildirim yapar. Hangisi uyanmalı? Doğru cevap 10 bayt bekleyendir, ama bildirim çağrısı kimin neyi beklediğini bilmez ve pekâlâ 100 bayt bekleyeni uyandırabilir; o uyanır, yerin hâlâ yetmediğini görür, yeniden uyar — ve 10 bayt bekleyen sonsuza kadar uyumaya devam eder.

Burada koşulu ikiye bölmek işe yaramaz, çünkü bekleme koşulu bir eşik değil bir **parametredir**. Çözüm, bildirimi genişletmektir: bekleyenlerin **hepsini** uyandır. Uyanan herkes koşulunu `while` içinde yeniden denetler; koşulu sağlanmayanlar hemen geri uyur. Bu desene **kapsayıcı koşul (covering condition)** denir. Bedeli gereksiz uyandırmalardır, yani başarımdır. Kural şudur: bildirimi genişletmek doğruluğu **satın alır**, ama programın yalnızca hepsini uyandırınca çalıştığını fark ediyorsan ve bunun gerekmediğini düşünüyorsan, elinde büyük ihtimalle bir hata vardır.

Bir ek uyarı: bazı iş parçacığı kütüphanelerinde tek bir bildirimle iki iş parçacığı birden uyanabilir. Buna **sahte uyanma (spurious wakeup)** denir ve koşulu her zaman `while` ile denetlemenin ikinci gerekçesidir.

## Okuyucu-yazar: paylaşımı gevşetmek

İkinci problem farklı bir şeyi sınar: karşılıklı dışlama her zaman gerekli midir?

Paylaşılan bir listede iki tür işlem düşün: ekleme yapısını değiştirir, arama yalnızca okur. Hiçbir ekleme sürmüyorsa çok sayıda aramanın **aynı anda** yürümesinde bir sakınca yoktur. Bu gözlemi kurala çeviren yapıya **okuyucu-yazar kilidi (reader-writer lock)** denir: aynı anda ya bir yazar vardır ya da istediğin kadar okuyucu.

Semaforlarla kurulumu zarif bir numaraya dayanır. İki semafor ve bir sayaç tutulur: `yazma_kilidi`, okuyucu sayacını koruyan `kilit` ve `okuyucu_sayısı`. Okuma kilidini alan okuyucu sayacı bir artırır; **eğer birinci okuyucuysa** `yazma_kilidi` üzerinde de `P` yapar. Bırakırken sayacı azaltır ve **son okuyucuysa** `yazma_kilidi` üzerinde `V` yapar. Yazar ise doğrudan `yazma_kilidi`ni alır. Böylece ilk okuyucu bütün okuyucular adına yazma kilidini tutar; sonrakiler bedava girer, yazarlar son okuyucu çıkana kadar bekler.

Bu çözümün güvenlik özelliği tamdır: yazar yazarken hiçbir okuyucu içeride değildir. Canlılık tarafında ise açık bir kusur vardır ve mülakat sorusu tam olarak burasıdır: **okuyucular yazarı aç bırakabilir.** Okuyucu akışı hiç kesilmezse sayaç sıfıra hiç inmez ve bekleyen yazar hiç giremez. Düzeltmenin yönü bellidir — bir yazar beklemeye başladığı andan itibaren yeni okuyucuların girişini engelle — ama bu kurulum daha karmaşıktır.

Bir de başarım uyarısı: okuyucu-yazar kilidi kulağa hoş gelir, ama sayaç bakımı ve ek semaforlar yüzünden basit bir kilitten daha yavaş kalabilir. Karmaşıklık makalesinden beri tekrarladığımız refleks burada da geçerli: önce basit çözümü ölç, sonra karmaşığa geç.

## Yemek yiyen filozoflar: döngüyü kırmak

Üçüncü problem Dijkstra'ya aittir ve pratik faydası düşük, öğretici değeri yüksektir. Beş filozof yuvarlak bir masada oturur; her komşu çiftin arasında bir çatal vardır, yani toplam beş çatal. Filozofların hayatı düşünmek ile yemek arasında gider gelir; yemek için **iki çatal** gerekir — solundaki ve sağındaki. Görev, `catallari_al` ve `catallari_birak` yordamlarını kilitlenme olmadan, kimse aç kalmadan ve eşzamanlılığı mümkün olduğunca yüksek tutarak yazmaktır.

En doğal deneme her çatala bir ikili semafor koymak ve sırayla önce solu, sonra sağı almaktır. Kaynağın da uyardığı gibi bu çözüm basit **ve bozuktur**: beş filozof da aynı anda acıkırsa her biri solundaki çatalı kapar ve grup sonsuza kadar donar. Dijkstra bu duruma **ölümcül kucaklaşma (deadly embrace)** adını vermişti; bugünkü adı **kilitlenmedir (deadlock)**.

Durumu göz kararıyla bırakmadım. Beş filozofun bütün erişilebilir durumlarını tarayan küçük bir program yazdım. Naif kurulumda **82 erişilebilir durum** var ve içlerinden biri tam olarak beklenen felaket: her filozof kendi solundaki çatalı tutuyor ve hiçbiri ilerleyemiyor. Filozoflardan yalnızca birinin — diyelim en yüksek numaralının — çatalları **ters sırada** aldığı kurulumda ise erişilebilir **70 durumun hiçbirinde** böyle bir tıkanma yok. İki kurulumda da aynı anda en fazla **iki** filozof yiyebiliyor, çünkü beş çatal var ve her yiyen iki tanesini tutuyor.

Neden işe yaradığı Şekil 2'de görülüyor. Herkes önce solunu alırsa "kimin çatalını bekliyorum" grafında beş ok da aynı yönde döner ve bir **döngü** kapanır; kilitlenmenin çekirdek koşulu budur. Tek bir filozofun sırasını ters çevirmek, o kenarın yönünü ters çevirir; kalan dört ok aynı yönde olsa bile döngü artık kapanamaz. Aynı fikri Dijkstra iki çatalı **tek bir bölünmez işlemle** alarak da çözmüştü; o kurulumda erişilebilir durum sayısı 11'e düşüyor ve orada da kilitlenme yok.

Burada bir kaynak farkını da açıkça söylemek gerekir. Ders kitabı anlatımı, asimetrik sırayı "Dijkstra'nın kendi çözümü" olarak sunar; ama işaret ettiği 1971 tarihli çalışmayı okuduğunda orada başka bir çözüm bulursun. Dijkstra her filozofa bir durum değişkeni (düşünüyor / **aç** / yiyor) ve birer özel semafor verir, komşuları uygunsa aç filozofu masaya gönderen bir test yordamı yazar. Üstelik kendi çözümü için şunu da açıkça yazar: bu kurulum kilitlenmeden bağışıktır **ama** bir filozof iki komşusunun iş birliğiyle açlıktan ölebilir; bunu düzeltmek için "çok aç" gibi bir ara durum daha gerekir. Bu makale asimetrik sırayı, olduğu şey olarak sunuyor: **kilitlenmeyi kıran en basit yol** — Dijkstra'nın çözümü olarak değil. Açlık ise ikisinde de ayrı bir sorundur, yani güvenliği çözmek canlılığı çözmez.

![Dikey bir çizgiyle ayrılmış iki panelli bir şema; iki panelde de beş düğümlü birer beşgen graf var ve düğümler saat yönünde P sıfırdan P dörde kadar etiketlenmiş. Sol panelin başlığı naif çözüm, herkes önce solundakini alır. Bu grafta beş ok var ve hepsi aynı yönde, yani P sıfırdan P bire, P birden P ikiye, P ikiden P üçe, P üçten P dörde ve P dörtten P sıfıra gidiyor; oklar kapalı bir döngü oluşturuyor ve hepsi vurgulanmış. Panelin altında iki satır: her filozof solundaki çatalı tutar ve sağındakini bekler; beklenenler döngüsü kapanır, bu bir kilitlenmedir. Sağ panelin başlığı asimetrik sıra, P dört önce sağındakini alır. Bu grafta yine beş ok var ama sonuncusunun yönü ters: P sıfırdan P bire, P birden P ikiye, P ikiden P üçe, P üçten P dörde giden dört ok aynı yönde, beşinci ok ise P sıfırdan P dörde gidiyor ve vurgulanmış. Panelin altında iki satır: sıfır numaralı çatalı P dört önce aldığı için o kenarın yönü değişir; kalan oklar aynı yönde olsa bile döngü kapanamaz. Şemanın en altında iki satır daha var: kaba kuvvet taramasında naif kurulumda seksen iki erişilebilir durumun içinde kilitlenme var; asimetrik kurulumda yetmiş durumun hiçbirinde yok ve ikisinde de aynı anda en çok iki filozof yiyebiliyor](assets/filozoflar-dongusu.svg "Şekil 2 — Kilitlenmenin çekirdeği bir döngüdür; tek bir oku çevirmek onu kapanamaz yapar")

> **Sesli anlat:** "Yemek yiyen filozoflar probleminde naif çözüm neden bozuk, en basit düzeltme nedir? Doksan saniye."
>
> İyi bir cevabın omurgası: "Beş filozof, aralarında beş çatal; yemek için iki çatal gerekiyor. Naif çözüm her çatala bir ikili semafor koyar ve herkes önce solunu, sonra sağını alır. Karşılıklı dışlama sağlanır — iki komşu aynı anda yiyemez — ama canlılık sağlanmaz: beşi birden acıkırsa her biri solundaki çatalı alır ve hepsi sağdakini bekler, yani kilitlenme olur. Nedeni 'kimi bekliyorum' grafında kapanan bir döngüdür. En basit düzeltme simetriyi kırmaktır: bir filozof çatalları ters sırada alsın. O zaman bir kenarın yönü değişir, döngü kapanamaz ve kilitlenme imkânsız olur; bunu beş filozofun bütün durumlarını tarayarak doğruladım, naif kurulumda tıkanan bir durum var, asimetrik kurulumda yok. Ama açlık ayrı bir sorundur ve bu düzeltme onu çözmez; iki komşusu sırayla yiyerek bir filozofu sonsuza kadar bekletebilir."

## Üç problem, tek tablo

Üç problemin öğrettiğini yan yana koymak, mülakatta hangi sorunun neyi ölçtüğünü de gösterir.

| Problem | Güvenlik özelliği | Canlılık özelliği | Asıl sınadığı |
|---|---|---|---|
| Üretici-tüketici | Dolu tampona koyma, boş tampondan alma yok | Uyandırma doğru tarafa gider; kimse boşuna uyumaz | Koşul değişkeninin doğru kullanımı |
| Okuyucu-yazar | Yazar yazarken içeride okuyucu yok | Yazar sonunda girer | Adalet ve açlık |
| Filozoflar | İki komşu aynı anda yemez | Kimse sonsuza kadar beklemez | Kilit alma sırası |

Tablo bir şeyi daha söylüyor: **güvenliği sağlamak kolay, canlılığı sağlamak zordur.** Hiç kimseyi hiçbir yere sokmayan bir çözüm bütün güvenlik özelliklerini sağlar ve tamamen işe yaramaz. İyi bir çözümün savunması bu yüzden iki ayaklıdır ve ikinci ayak genellikle unutulan ayaktır.

## Mülakatta nasıl görünür

Bu üç problem mülakatın en tahmin edilebilir kısmıdır; adları doğrudan sorulur. Ama iyi cevabı ayıran şey çözümü ezberden yazmak değil, **her satırın hangi hatayı önlediğini** söyleyebilmektir.

Altı tipik hata var. **`while` yerine `if` yazmak** — Mesa semantiğinde uyanmak koşulun hâlâ doğru olduğunu göstermez. **Tek koşul değişkeniyle idare etmeye çalışmak** — üretici üreticiyi, tüketici tüketiciyi uyandırabilir. **Semafor çözümünde kilidi en dışa koymak** — bekleten bir işlemi kilit altında yapmak kilitlenme üretir. **Okuyucu-yazar kilidini adil sanmak** — kesintisiz okuyucu akışı yazarı aç bırakır. **Filozoflarda kilitlenmeyi karşılıklı dışlama hatası sanmak** — karşılıklı dışlama sağlanmıştır, çöken canlılıktır. **Kilitlenme ile açlığı aynı şey sanmak** — kilitlenmede kimse ilerleyemez, açlıkta sistem ilerler ama biri hep dışarıda kalır. Bir de yaygın bir yama refleksi vardır: program çalışmıyor diye bütün bildirimleri "hepsini uyandır"a çevirmek. Bellek ayırıcı gibi bekleme koşulu parametreli olan durumlarda bu doğru araçtır; ötekilerde çoğunlukla asıl hatayı örter.

Bir de savunma refleksi: her çözümden sonra "hangi kötü şey olamaz, hangi iyi şey olur?" sorusunu kendine sor. Cevabın ikinci yarısı yoksa çözüm yarımdır.

İngilizce karşılıklar hazır olmalıdır: *safety property*, *liveness property*, *producer-consumer*, *bounded buffer*, *circular buffer*, *condition variable*, *signal / wait*, *broadcast*, *covering condition*, *spurious wakeup*, *reader-writer lock*, *starvation*, *dining philosophers*, *deadly embrace*, *deadlock*, *wait-for cycle*, *lock ordering*.

### Sırada ne var

Filozoflar problemi bir kapı açtı ve kapamadı. Kilitlenmenin çekirdeğinde bir bekleme döngüsü olduğunu gördük ve tek bir oku çevirerek onu kırdık — ama bunun neden yeterli olduğunu, hangi koşullar bir araya gelirse kilitlenmenin **mümkün** hâle geldiğini söylemedik.

Sıradaki makale tam olarak bunu yapıyor: kilitlenmenin dört koşulu, koşullardan birini kaldırarak **önleme**, kaynakların önceden bildirilmesine dayanan **kaçınma** — bankacı algoritması —, döngüyü çalışırken bulan **tespit** ve bulduktan sonraki **kurtarma**. Doğruluk makalesindeki azalan ölçü fikri orada güvenli durum kavramına dönüşecek; graf algoritmaları makalesindeki döngü tespiti ise beklenenler grafında bire bir işe yarayacak.

## Kaynakça

- Lamport, L. *Proving the Correctness of Multiprocess Programs*, IEEE Transactions on Software Engineering, cilt SE-3, sayı 2, Mart 1977, s. 125–143 — **güvenlik ve canlılık özelliklerinin** tanımı ve ayrımı, birebir: "To prove the correctness of a program, one must prove two essentially different types of properties about it, which we call safety and liveness properties. A safety property is one which states that something will not happen… A liveness property is one which states that something must happen."; tek süreçli bir programın **kısmi doğruluğunun bir güvenlik özelliği**, **sonlanmasının bir canlılık özelliği** olması ("the partial correctness of a single process program is a safety property… An example of a liveness property is the statement that a program will terminate if its input is correct"); iki türü ispatlamak için kullanılan tekniklerin birbirinden farklı olması ve makalede ayrı bölümlerde ele alınması; üretici-tüketici programı üzerinde kilitlenmesizliğin bir canlılık özelliği olarak ispatlanması. [Bağlantı](https://lamport.azurewebsites.net/pubs/proving.pdf)
- Dijkstra, E. W. *Cooperating Sequential Processes* (EWD 123), Technological University Eindhoven, 1965 — **sınırlı tamponun** semaforlarla çözümü: genel semafor "number of queuing portions" ile ikili semafor "buffer manipulation"ın birlikte kullanımı, üreticinin `P(buffer manipulation) … V(buffer manipulation); V(number of queuing portions)` ve tüketicinin `P(number of queuing portions); P(buffer manipulation) …` dizileri; okura bırakılan iki alıştırma, birebir: "a) the order of the two V-operations in the producer is immaterial b) the order of the two P-operations in the consumer is essential"; aynı ikili semaforun çözümü **birden çok üretici ve tüketiciye** doğrudan genişletmesi; tampon üzerindeki "ekle" ve "al" işlemlerinin aynı bilgiyi güncellediği için zaman içinde birbirini dışlaması gerektiği saptaması. Metin, yazarın arşivindeki transkripsiyondan okunmuştur. [Bağlantı](https://www.cs.utexas.edu/~EWD/transcriptions/EWD01xx/EWD123.html)
- Dijkstra, E. W. *Hierarchical Ordering of Sequential Processes* (EWD 310; Acta Informatica 1, 1971) — **yemek yiyen filozoflar** probleminin özgün kuruluşu: beş filozof, iki çatalla yenen spagetti ve "no two neighbours may be eating simultaneously" kısıtı; her çatala bir ikili semafor koyup önce solu sonra sağı alan **naif çözümün reddi**, birebir gerekçesiyle: "it contains the danger of the deadly embrace. When all five philosophers get hungry simultaneously, each will grab his left hand fork and from that moment onwards the group is stuck"; iki çatalı tek işlemde alan **paralel P işlemi** seçeneği; Dijkstra'nın kendi çözümü — her filozof için düşünüyor/aç/yiyor durum değişkeni, ortak `mutex` semaforu, filozof başına birer özel semafor ve komşuları uygunsa aç filozofu masaya gönderen `test` yordamı; çözümün kilitlenmeden bağışık olduğu ama **açlığa açık** kaldığı saptaması ve bunun "çok aç" gibi bir ara durumla düzeltilebileceği notu. Metin, yazarın arşivindeki transkripsiyondan okunmuştur. [Bağlantı](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD310.html)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 30: Condition Variables — **üretici-tüketici (sınırlı tampon)** probleminin Dijkstra'ya dayanması ve genel semaforun bu problem için icat edilmiş olması; gerçek hayattaki karşılıkları (çok iş parçacıklı web sunucusunun iş kuyruğu; `grep foo file.txt | wc -l` boru hattında çekirdek içi sınırlı tampon); bozuk çözümün üç aşamalı düzeltilişi — `if` ile beklemenin iki tüketici ve bir üreticiyle kırılması ve **Mesa semantiği** açıklaması, `while` düzeltmesi, tek koşul değişkeninin bir tüketiciyi uyandırıp üç iş parçacığını birden uyutması ve **iki koşul değişkenine** (`empty`, `fill`) geçiş; çok hücreli tampon için `fill_ptr`, `use_ptr`, `count` ile modülo aritmetiği; "koşullar için `if` değil `while` kullan" kuralı ve sahte uyanmalar; **kapsayıcı koşullar** (Lampson ve Redell'in Pilot çalışmasından): bellek ayırıcı örneğinde 100 ve 10 bayt bekleyen iki iş parçacığıyla 50 baytlık serbest bırakmanın yanlış iş parçacığını uyandırması, çözümün `broadcast` ile bekleyenlerin hepsini uyandırmak olması, bedelinin gereksiz uyandırmalar olması ve "programın yalnızca broadcast ile çalıştığını fark ediyorsan büyük ihtimalle bir hatan vardır" uyarısı. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 31: Semaphores — sınırlı tamponun semaforlu çözümü: `empty` ve `full` sayaçlarıyla `mutex` ikili semaforunun birlikte kullanımı, kilidin **en dışa** konduğu sürümde ortaya çıkan kilitlenmenin adım adım izi ("The consumer holds the mutex and is waiting for the someone to signal full. The producer could signal full but is waiting for the mutex") ve düzeltmenin kilidin kapsamını daraltmak olması; **okuyucu-yazar kilidi**: `writelock`, `lock` ve `readers` sayacıyla kurulumu, ilk okuyucunun yazma kilidini alması ve son okuyucunun bırakması, **okuyucuların yazarı aç bırakabilmesi** ve düzeltme yönü, ayrıca bu kilidin ek yük yüzünden basit kilitten yavaş kalabileceği uyarısı; **yemek yiyen filozoflar**: sol/sağ çatal yardımcı fonksiyonları, naif çözümün kilitlenmesi ve tek bir filozofun sırasını ters çevirerek bağımlılığın kırılması. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Silberschatz, A., Galvin, P. B. & Gagne, G. *Operating System Concepts*, onuncu baskı — bu makalenin kapsamının ders kitabı karşılığı **Chapter 7 Synchronization Examples**'tır; ilgili alt bölümler resmî içindekiler tablosundan doğrulanmıştır: 7.1 Classic Problems of Synchronization, 7.2 Synchronization within the Kernel, 7.3 POSIX Synchronization, 7.5 Alternative Approaches. Canlılık kavramının kitaptaki yeri 6.8 Liveness bölümüdür. John Wiley & Sons. [Bağlantı](https://www.os-book.com/OS10/index.html)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE322 — Operating Systems* — bu makalenin resmî dayanağı katalog tanımındaki "process synchronization, critical section problem" ifadesidir; sayfa bu run'da (2026-09-10) yeniden çekilerek doğrulandı. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe322/)
