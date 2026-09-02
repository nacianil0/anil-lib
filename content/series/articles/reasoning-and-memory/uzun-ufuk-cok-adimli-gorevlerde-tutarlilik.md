---
article_id: article_d123c019-045a-4053-b5c1-c49c59d03304
title: "Uzun Ufuk: Çok Adımlı Görevlerde Tutarlılık"
slug: uzun-ufuk-cok-adimli-gorevlerde-tutarlilik
category: reasoning-and-memory
level: intermediate
reading_order: 40
summary: "Adım sayısı arttıkça başarının neden çarpımsal olarak düştüğünü kurar: bağımsız adımlarda üstel çöküşün biçimsel ifadesini, kendi kendine toparlanma olasılığının koyduğu düşük tavanı, görev süresi cinsinden ölçülen ufkun ne olduğunu, güvenilirlik çıtası yükseltildiğinde ufkun neden kısaldığını ve düzeltmenin neden aynı modelin içinden gelemeyeceğini gösterir."
tags:
  - uzun-ufuk
  - hata-birikmesi
  - gorev-ufku
  - guvenilirlik
  - toparlanma
content_hash: sha256:44f68db96064a262db328a86c45403bcb0f59d58d1853926543430bfe447fae7
classification_version: 1
classification_batch: 9
---
## Yirmi adımlık bir iş

39\. makale bilginin zaman içinde nasıl taşındığını kurdu: yaz, getir, oku. Ama bir işin uzun sürmesi yalnızca hatırlamak demek değil. Gerçek bir görevde adımlar birbirine bağlıdır — ikinci adımın girdisi birincinin çıktısıdır, üçüncününki ikincinin. Hatırlamak yetmez, **doğru** hatırlamak ve her adımda doğru davranmak gerekir.

33\. makalede bir ekseni ölçmüştük: aynı soruya daha çok deneme üretirsen kapsama artar. Bu makale ters eksene bakıyor. Bir görevi daha çok **adıma** bölersen ne oluyor?

Cevabın sezgisi rahatsız edici derecede basit ve alanın en sağlam sonuçlarından biri. Onu önce çıplak hâliyle kuralım, sonra nerede yanlış olduğuna bakalım.

## Çarpım kuralı

Diyelim bir görev `n` adımdan oluşuyor ve model her adımı birbirinden bağımsız olarak `1 − ε` olasılıkla doğru yapıyor. Görevin tamamının doğru olması için **hepsinin** doğru olması gerekir. Olasılıklar çarpılır:

başarı = (1 − ε)ⁿ

Sözle: adım başına hata oranı sabit kalsa bile, görevin başarısı adım sayısıyla üstel olarak düşer. Şimdi sayı koyalım. Adım başına doğruluk yüzde 99 olsun — çoğu ölçümde erişilmesi zor bir değer.

| adım sayısı | %99 doğrulukla | %95 doğrulukla | %90 doğrulukla |
|---|---|---|---|
| 10 | 0,904 | 0,599 | 0,349 |
| 20 | 0,818 | 0,359 | 0,122 |
| 50 | 0,605 | 0,077 | 0,005 |
| 100 | 0,366 | 0,006 | 0,000 |

![Yatay ekseni adım sayısı, dikey ekseni görevin tamamını doğru bitirme olasılığı olan bir eğri şeması. Üç eğri de sol üstteki aynı noktadan başlayıp sağa doğru düşer. En üstteki sürekli eğri adım başına yüzde 99 doğruluğa aittir ve yavaş iner; yüz adıma geldiğinde hâlâ eksenin belirgin biçimde üstündedir. Ortadaki sürekli eğri yüzde 95 doğruluğa aittir ve elli adım dolayında eksene yaklaşır. En alttaki kesikli eğri yüzde 90 doğruluğa aittir ve yirmi adım dolayında eksene yapışır. Şeklin sağ orta bölümünde üç satırlık bir gösterge kutusu vardır; her satırda eğrinin çizgi örneği ve karşılığındaki adım başına doğruluk oranı yazılıdır. Şeklin altında adım başına doğrulukta küçük bir farkın görev düzeyinde büyük bir fark yarattığı belirtilir.](assets/carpimsal-dusus.svg "Şekil 1 — Adım sayısı arttıkça başarı çarpımsal düşüyor")

Şekil 1'in okunması gereken yeri sütunlar arası fark. Adım başına doğruluğu yüzde 99'dan 95'e indirmek — kulağa küçük gelen bir bozulma — elli adımlık bir görevde başarıyı 0,605'ten 0,077'ye düşürüyor. Yaklaşık sekiz kat. Tersinden okunduğunda daha da öğretici: yüzde 99 doğruluklu bir modelin yarı yarıya başarabildiği görev uzunluğu yaklaşık 69 adımdır. Adım sayısını iki katına çıkarmak isteyen birinin adım başına hata oranını yarıya indirmesi gerekir.

Bu, 33\. makaledeki kapsama eğrisinin aynadaki görüntüsü. Orada deneme sayısı arttıkça `1 − (1 − p)ᵏ` yükseliyordu; burada adım sayısı arttıkça `(1 − ε)ⁿ` düşüyor. Aynı çarpım, iki farklı yönde.

## Varsayımı yıkalım: adımlar bağımsız değil

Yukarıdaki hesap bir varsayıma dayanıyordu: adımların hataları birbirinden bağımsız. Gerçekte değiller ve bu iki yönde işleyebilir.

Nouha Dziri ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma — 31\. makalede hesap grafiği kavramını buradan almıştık — bu soruyu biçimsel olarak ele alıyor. İki ayrı durum ayırıyorlar.

Birincisi, bir işlevin `n` kez **bağımsız** uygulanması. Bu durumda tam olarak yukarıdaki çarpım geçerlidir ve çalışma başarısızlık olasılığının `n` ile üstel hızda bire yaklaştığını gösteriyor.

İkincisi ve daha ilginci, aynı işlevin **yinelemeli** uygulanması: her adımın girdisi bir öncekinin çıktısıdır. Burada yeni bir olasılık devreye giriyor. Model yanlış bir girdiyle çalıştığında, sırf rastlantı eseri doğru çıktıyı üretebilir; buna toparlanma olasılığı diyelim ve `c` ile gösterelim. Çalışmanın sonucu şu: bu durumda başarı olasılığının tavanı

tavan = c ⁄ (c + ε)

değerine yaklaşır. Yani hata biriktikçe başarı sıfıra gitmez, bir tabana oturur.

Bu iyi bir haber gibi duruyor ama değil. Çalışmanın kendi uyarısı kritik: `c`, yanlış bir girdiden **tesadüfen** doğru çıktıya varma olasılığıdır ve iyi tanımlanmış bir işlemde bu çok küçüktür. `c ≪ ε` olduğunda tavan da sıfıra yakındır. Sayıyla görelim: adım başına hata oranı 0,05 ve tesadüfi toparlanma olasılığı 0,005 ise tavan 0,005 ⁄ 0,055 ≈ 0,091'dir. Yani ne kadar uzun çalışırsan çalış, başarı yüzde 9'un üstüne çıkamaz.

![Dikey bir çizgiyle ayrılmış iki bölmeli şema; iki bölmede de aynı adım zinciri kutular hâlinde soldan sağa dizilmiştir. Sol bölme toparlanmanın olmadığı durumu gösterir: ilk iki kutu doğru, üçüncü kutu hata olarak işaretlenmiştir ve ondan sonraki kutu da hatadır; ikinci ile üçüncü kutu arasındaki geçişin üstünde adım başına hata olasılığı işaretlidir. Bölmenin altında bir kez hataya düşen dizinin hatada kaldığı, başarının bir eksi hata olasılığının adım sayısıncı kuvveti olduğu ve adım sayısı büyüdükçe sıfıra gittiği yazar. Sağ bölme toparlanmanın olduğu durumu gösterir: birinci kutu doğru, ikinci kutu hata, üçüncü ve dördüncü kutular yeniden doğrudur; hatadan doğruya dönen geçişin üstünde toparlanma olasılığı işaretlidir. Bölmenin altında başarının tavanının, toparlanma olasılığının toparlanma ile hata olasılığının toplamına bölümü olduğu, toparlanma hata oranından çok daha küçük olduğu için bu tavanın da küçük kaldığı ve örnek değerlerle 0,091 çıktığı yazar. Şeklin altında toparlanmayı büyütmek isteyenin onu dışarıdan getirmek zorunda olduğu belirtilir.](assets/toparlanma-tavani.svg "Şekil 2 — Toparlanma sıfırı engelliyor, ama tavanı düşük")

Şekil 2'nin asıl dersi buradan çıkıyor ve bu makalenin çekirdeği. Uzun bir görevi kurtaran şey, modelin kendi kendine yanlıştan doğruya sıçraması olamaz — o olasılık yapısal olarak küçüktür. Kurtaracak şey, `c`'yi **dışarıdan** büyüten bir mekanizmadır: hatayı yakalayan bir doğrulayıcı, geri dönülebilecek bir kontrol noktası, ya da adımın kalitesini ölçen bir sinyal.

Aynı çalışmanın ampirik tarafı bu tabloyu somutlaştırıyor. Çok basamaklı çarpma, bu yapının en saf örneğidir: `k` basamaklı iki sayının çarpımı, tek basamaklı çarpmaların ve taşımaların bileşimidir. İnsanlar üç basamaklı çarpmayı temel kuralları öğrendikten sonra yapabiliyor; ölçüldüğünde iki güçlü model bu işte yüzde 55 ve yüzde 59 doğruluk veriyor. Ve 31\. makalede gördüğümüz gibi, çözümün bütün ara adımlarını içeren defterlerle eğitmek bile bu çöküşü ortadan kaldırmıyor.

> **Kendini yokla:** Adım başına doğruluğu yüzde 95'ten 99'a çıkarmak, elli adımlık bir görevde başarıyı kaç kat artırır?

Tabloya bakalım: 0,077'den 0,605'e. Yaklaşık sekiz kat. Buradaki asıl ders orandan çok orantısızlıkta: adım başına doğrulukta yüzde 4 puanlık bir iyileşme, görev düzeyinde sekiz katlık bir fark yaratıyor. Uzun görevlerde küçük güvenilirlik farkları küçük kalmaz.

## Adım sayısı zorluğun tanımı olduğunda

Çarpım kuralı bir tahmin veriyor: görevleri yalnızca adım sayısına göre zorlaştırırsan, insanların başarısı görece sabit kalırken modellerin başarısı çökmeli. Bu tahmini doğrudan sınayan bir değerlendirme kümesi var.

Grégoire Mialon ve arkadaşlarının ICLR 2024'te sunduğu çalışma, sorularını üç düzeye ayırıyor ve düzeyleri **adım sayısıyla** tanımlıyor: birinci düzey en fazla beş adım ve en çok bir araç; ikinci düzey kabaca beş ile on adım ve birden çok aracın birleştirilmesi; üçüncü düzey ise keyfî uzunlukta eylem dizileri. Sorular insanlar için kavramsal olarak basit: cevaplar kesin, tek anlamlı ve internette hazır metin hâlinde bulunmayacak biçimde tasarlanmış. 466 soruluk küme üzerinde insan katılımcıların ortalama başarısı yüzde 92.

Modellerin tablosu düzeylere göre okununca çarpım kuralının resmi çıkıyor: araçlarla donatılmış güçlü bir model en kolay düzeyde yüzde 30'u aşamıyor, en zor düzeyde **yüzde 0** alıyor. Genel ortalama yüzde 15. Adım sayısı, tek başına, başarıyı sıfıra götüren bir eksen.

Bu kümenin tasarımında ikinci bir incelik var ve 16\. makaledeki ölçme tartışmasına bağlanıyor. Cevaba ulaşmak birkaç adımın hepsinin başarılmasını gerektirdiği için, doğru cevabı eğitim verisinden hatırlayarak kestirmek zorlaşıyor: çoktan seçmeli bir soruda yanlış bir gerekçe de doğru şıkka varabilir, burada varamaz. Yani adım sayısı yalnızca bir zorluk ekseni değil, aynı zamanda ölçümü sağlamlaştıran bir tasarım kararı.

Aynı yıl ICLR'de sunulan bir başka çalışma bunu gerçek web arayüzlerinde ölçüyor: dört alanda çalışan, tam işlevli sitelerden oluşan bir ortamda, uçtan uca görev başarısı en iyi düzende yüzde 14,41'de kalıyor; aynı görevlerde insan başarısı yüzde 78,24. Buradaki fark bilgi eksikliğinden değil — modeller her adımda ne yapacağını genelde biliyor — dizinin tamamını hatasız yürütememekten geliyor.

## Ufku süreyle ölçmek

Bu tablo bir ölçme sorunu doğuruyor. "Adım sayısı" görevden göreve farklı anlamlara gelir: bir adım bir çarpma işlemi de olabilir, bir dosya düzenlemesi de. Farklı görevleri karşılaştırılabilir kılan ortak bir birim gerekiyor.

Thomas Kwa, Ben West ve arkadaşlarının NeurIPS 2025'te sunduğu çalışma böyle bir birim öneriyor ve ölçüyü şaşırtıcı bir yerden alıyor: **insan süresi**. Tanım şöyle: bir modelin **yüzde 50 görev tamamlama ufku**, o modelin yarı yarıya başarabildiği görevlerin, ilgili alanda uzman bir insanın ne kadar sürede bitirdiğidir.

Düzenek üç parçalı. Önce 170 görevlik bir küme kuruluyor — yazılım mühendisliği görevleri, makine öğrenmesi araştırma görevleri ve kısa yazılım işleri. Sonra bu görevler hem uzman insanlara hem de modellere yaptırılıyor; insanlardan süre, modellerden başarı oranı kaydediliyor. Sonra her modelin başarı oranı görev süresinin fonksiyonu olarak modellenip yüzde 50'ye denk gelen süre bulunuyor.

Ölçümün kendisi zaten ilk bulguyu veriyor: bir görevin insan süresi ile modellerin o görevdeki ortalama başarısı arasında negatif bir ilişki var ve başarı oranının süre logaritmasıyla azalışı üstel bir modelle iyi uyuyor (R² ≈ 0,80). Yani "uzun görev" ile "zor görev" ölçülebilir biçimde aynı yöne bakıyor.

Sonuçlar 2019'dan 2025'e on iki sınır modelinde şöyle: GPT-2'nin yüzde 50 ufku **2 saniye**; 2025'in bir sınır modelinde **110 dakika** ve bazı görevlerde dört saati aşıyor. Ufkun logaritması yayın tarihine göre bağlandığında ikiye katlanma süresi **207 gün**, yani yaklaşık yedi ay çıkıyor; yüzde 95 güven aralığı 166–240 gün.

İnsan tarafı da bu kadar temiz değil ve bunu bilmek ölçüyü doğru okumak için gerekli. Yazılım mühendisliği görevlerinde toplanan insan denemelerinin yaklaşık 460'ından yalnızca 286'sı başarıyla sonuçlanmış; yani "insan süresi" dediğimiz sayı, **başaran** insanların süresidir. Uzun görevler insanlar için de sık sık yarım kalıyor ve karşılaştırma bu kayıtla okunmalı.

Yazarlar burada dürüst bir ayrım yapıyor ve bu ayrım ölçüm disiplini açısından öğretici: tek tek modellerin ufuk tahminlerindeki belirsizlik geniştir, çünkü aynı insan süresine sahip görevler modeller için çok farklı zorluktadır. Ama bu hatalar modeller arasında ilişkilidir, dolayısıyla **eğimden** tek tek noktalardan daha eminler. 16\. makaledeki disiplinin bir başka biçimi: bir sayıyı değil, o sayının hangi belirsizlikle geldiğini raporlamak.

## Güvenilirliğin bedeli

Şimdi bu makalenin en önemli sayısına geliyoruz ve çarpım kuralına geri dönüyor.

Aynı çalışma yüzde 50 ufkunun yanında yüzde **80** ufkunu da ölçüyor: modelin beş denemenin dördünde başarabildiği görev uzunluğu. Trend benzer, ama ufuklar kabaca **beş kat kısa**.

![İki yatay çubuğun karşılaştırıldığı bir şema. Üstteki uzun çubuk yüzde 50 güvenilirlik çıtasındaki görev ufkunu temsil eder ve ucunda 110 dakika yazar. Alttaki çubuk yüzde 80 çıtasındaki ufku temsil eder ve üsttekinin yaklaşık beşte biri uzunluğundadır. İki çubuğun arasında, aradaki farkın aynı modele ait olduğunu ve yalnızca istenen güvenilirliğin değiştiğini belirten bir açıklama vardır. Şeklin altında, daha güvenilir olmasını istediğin bir işin daha kısa olmak zorunda olduğu yazılıdır.](assets/guvenilirlik-ufku.svg "Şekil 3 — Aynı model, iki farklı güvenilirlik çıtası")

Şekil 3, çarpım kuralının pratikteki karşılığı. Bir işin "yapılabilir" sayılması için hangi başarı oranını kabul ettiğin, o işin ne kadar uzun olabileceğini doğrudan belirliyor. İki denemeden birinde tutan bir sistem iki saatlik işleri deneyebilir; beş denemenin dördünde tutması isteniyorsa aynı sistemin işi yarım saatlik parçalara bölünmelidir. Üretimde çalışan bir hattın hangi çıtayı seçtiği, teknik bir ayrıntı değil, o hattın ne yapabileceğini tanımlayan karardır.

Çalışmanın kendi sınır notları da bu tabloya ait. Görev kümesi yapılandırılmış görevlerden oluşuyor; daha "dağınık" görevlerde — yani ortamın kendiliğinden değiştiği, hedefin baştan net olmadığı işlerde — mutlak başarı belirgin biçimde düşük, eğilim ise benzer. Ve ekstrapolasyon açıkça çekinceli veriliyor: eğilim aynen sürerse bir aylık (167 iş saatlik) ufka 2028 ortası ile 2031 ortası arasında ulaşılır; ama yazarların kendi ifadesiyle bu tahmin hem dış geçerlilik kaygılarına hem de eğilimin değişme ihtimaline açıktır.

## Ufku uzatan şey ne

Çalışmanın ilerlemenin kaynağı hakkındaki gözlemi, biçimsel tarafla birebir örtüşüyor. Ufku uzatan şey olarak sayılanlar arasında ilk sırada **güvenilirlik ve hatadan toparlanabilme** var; mantıksal akıl yürütme ve araç kullanımı onu izliyor.

Bunu Şekil 2'nin diliyle okuyalım. Ufku uzatmanın iki yolu vardır: adım başına hata oranını `ε` düşürmek ya da toparlanma olasılığını `c` yükseltmek. Birincisi modelin kendisiyle ilgilidir. İkincisi ise bu serinin son beş makalesinin konusu:

**Doğrulayıcı.** 35\. makalede öğrendiğimiz şey burada kritik: model dış geri bildirim olmadan kendi hatasını güvenilir biçimde bulamıyor. Yani `c`'yi modelin kendi içinden büyütmeye çalışmak, tam olarak işe yaramadığı ölçülmüş olan yoldur. Sağlam bir doğrulayıcı — bir test, bir derleyici, bir kural — `c`'yi dışarıdan büyütür.

**Arama.** 36\. makaledeki ağaç araması, hatalı bir dalı terk edip başka bir daldan devam etmeyi mümkün kılar. Bu, toparlanmanın en doğrudan biçimidir: yanlış girdiyle devam etmek zorunda kalmazsın, geri dönersin.

**Süreç denetimi.** 38\. makaledeki adım ödülü, hatayı sonunda değil oluştuğu yerde görünür kılar. Uzun ufukta bu, hata biriktikten sonra değil biriktiği anda müdahale edebilmek demektir.

**İskonto ve kredi atama.** 37\. makaledeki getiri tanımı burada somutlaşıyor: uzun bir bölümde ödül geç geliyorsa, hangi adımın işe yaradığını söylemek zorlaşır. Uzun ufuk problemi, kredi atama probleminin zaman eksenine yayılmış hâlidir.

Dördünün ortak bedeli var ve 33\. makaledeki muhasebeye yazılıyor. Doğrulayıcı çalıştırmak token başına maliyeti artırır, arama aday sayısıyla çarpar, kontrol noktasından geri dönmek harcanmış adımları çöpe atar. Uzun ufuk ayrıca 28\. makaledeki iki gecikme ölçüsünü birden büyütür: her adım kendi ön dolumunu ve kendi üretimini getirir, dolayısıyla n adımlık bir görevin toplam gecikmesi tek bir çağrınınkinin n katından fazladır — çünkü her adımın istemi bir öncekinin çıktısını da taşır. Ufku uzatmak, güvenilirliği hesapla satın almaktır.

> **Kendini yokla:** Modelin kendi hatasını kendi bulmasına neden güvenemeyiz?

Çünkü hatayı üreten süreçle onu arayan süreç aynı. 35\. makalede ölçülen buydu: dış geri bildirim olmadan yapılan öz-düzeltme, doğruluğu artırmak yerine düşürebiliyordu. Biçimsel tarafta aynı şey `c ≪ ε` olarak görünüyor — aynı kestiricinin yanlış girdiden tesadüfen doğru çıktıya varması, hata yapmasından çok daha seyrektir. Toparlanma, farklı bir bilgi kaynağından gelmek zorundadır.

## Uzun ufkun disiplini

**Görev başarısı adım sayısıyla çarpımsal düşer.** Adım başına doğruluk sabit kalsa bile, uzunluk tek başına bir zorluk kaynağıdır.

**Küçük güvenilirlik farkları uzun görevlerde büyür.** Adım başına yüzde 4 puanlık bir iyileşme, elli adımda sekiz katlık bir fark yapabilir.

**Kendi kendine toparlanma sıfırı engeller ama tavanı düşüktür.** Tesadüfi toparlanma hata oranından çok daha seyrek olduğu için, o tavan pratikte sıfıra yakındır.

**Toparlanma dışarıdan gelmek zorundadır.** Doğrulayıcı, arama, kontrol noktası, adım ödülü — hepsi aynı terimi büyütmenin farklı yollarıdır.

**Ufuk, seçtiğin güvenilirlik çıtasına göre tanımlıdır.** Aynı model için yüzde 80 çıtasındaki ufuk, yüzde 50 çıtasındakinin kabaca beşte biridir.

**"Uzun görev" ölçülebilir bir niceliktir.** İnsan süresi cinsinden tanımlanmış ufuk, farklı görev türlerini ortak bir cetvele koyar.

**Eğime, tek tek noktalardan daha çok güvenilir.** Aynı süredeki görevler modeller için çok farklı zorlukta olduğundan, tek bir ufuk tahmini geniş bir belirsizlik taşır.

**İnsan taban çizgisi de kusursuz değildir.** Uzun görevlerde insan denemeleri de sık sık yarım kalır; "insan süresi" başaranların süresidir ve karşılaştırma bu kayıtla okunmalıdır.

**Ekstrapolasyon bir ölçüm değildir.** Yedi aylık ikiye katlanma bir gözlemdir; onu geleceğe uzatmak, eğilimin süreceği varsayımını ekler ve o varsayım ölçülmüş değildir.

### Sırada ne var

Faz 4 burada kapanıyor. Otuz birinci makaleden beri tek bir şeyi geliştirmeye çalıştık: modelin kendi kafasındaki bilgiyle, kendi ürettiği adımlarla ne kadar ileri gidebileceğini. Doğrulayıcı ekledik, arama kurduk, ödülü adımlara dağıttık, belleği dışarı çıkardık ve sonunda ufkun ne kadar uzayabileceğini ölçtük.

Bütün bu çabanın altında bir varsayım daha duruyor ve sıradaki faz onu kaldırıyor: gerekli bilginin modelin ağırlıklarında zaten bulunduğu varsayımı. 18\. makalede o ağırlıkların sonlu bir kapasitesi olduğunu hesaplamıştık; 17\. makalede modelin bilmediği yerde susmak yerine uydurduğunu görmüştük. Peki modelin bilgisi tam olarak nerede yetmiyor, bunu nasıl ölçeriz, ve cevabı üretmeden önce doğru metni modelin önüne koymak neyi değiştirir?

## Kaynakça

- Dziri, N., Lu, X., Sclar, M., Li, X. L., Jiang, L., Lin, B. Y., West, P., Bhagavatula, C., Le Bras, R., Hwang, J. D., Sanyal, S., Welleck, S., Ren, X., Ettinger, A., Harchaoui, Z. & Choi, Y. (2023). *Faith and Fate: Limits of Transformers on Compositionality*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/deb3c28192f979302c157cb653c15e90-Abstract-Conference.html)
- Mialon, G., Fourrier, C., Swift, C., Wolf, T., LeCun, Y. & Scialom, T. (2024). *GAIA: a benchmark for General AI Assistants*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=fibxvahvs3)
- Zhou, S., Xu, F. F., Zhu, H., Zhou, X., Lo, R., Sridhar, A., Cheng, X., Ou, T., Bisk, Y., Fried, D., Alon, U. & Neubig, G. (2024). *WebArena: A Realistic Web Environment for Building Autonomous Agents*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=oKn9c6ytLx)
- Kwa, T., West, B., Becker, J., Deng, A., Garcia, K., Hasin, M., Jawhar, S., Kinniment, M., Rush, N., Von Arx, S., Bloom, R., Broadley, T., Du, H., Goodrich, B., Jurkovic, N., Miles, L. H., Nix, S., Lin, T., Painter, C., Parikh, N., Rein, D., Sato, L. J. K., Wijk, H., Ziegler, D. M., Barnes, E. & Chan, L. (2025). *Measuring AI Ability to Complete Long Software Tasks*. NeurIPS 2025. [Bağlantı](https://papers.nips.cc/paper_files/paper/2025/hash/85069585133c4c168c865e65d72e9775-Abstract-Conference.html)
