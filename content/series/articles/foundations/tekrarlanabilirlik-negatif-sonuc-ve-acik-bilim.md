---
article_id: article_43559e94-6bf5-42d4-b725-ef03b1996111
title: "Tekrarlanabilirlik: Negatif Sonuç ve Açık Bilim"
slug: tekrarlanabilirlik-negatif-sonuc-ve-acik-bilim
category: foundations
level: advanced
reading_order: 102
summary: "Faz 11'i kapatıyor: bir sonucu yeniden elde etmek tek bir iş değil, üç ayrı iştir — aynı kodu çalıştırmak, yöntemi yeniden kurmak ve bulguyu başka bir düzenekte doğrulamak. Alanın iki terimi ters yönlerde kullandığını gösterip soruyu sözcükten kurtarıyor; 400 bildirinin hiçbirinin gerekli değişkenlerin tamamını belgelemediğini, 255 bildirinin 162'sinin kodsuz olarak yeniden üretilebildiğini ve bunu öngören şeyin mecra ya da yıl değil okunabilirlik, sözde kod, yazılmış hiperparametreler ve yazarın e-postaya cevap vermesi olduğunu aktarıyor. Ve en sert örnek: 17 alanda 329 bildiriyi etkileyen veri sızıntısı, düzeltildiğinde karmaşık modellerin onlarca yıllık lojistik bağlanıma üstünlüğünü tümden siliyor."
tags:
  - tekrarlanabilirlik
  - acik-bilim
  - veri-sizintisi
  - negatif-sonuc
  - belgeleme
content_hash: sha256:c982f4178e26ac1513a944486fd26f5f65c419c298af77e06b61ead7d7ccd6b3
classification_version: 1
classification_batch: 24
---
## Aynı sonuç, başka el

101\. makale bir farkın gürültüden büyük olup olmadığına karar vermeyi kurdu. Ama bir farkın senin elinde gerçek olması, başka bir elde de çıkacağı anlamına gelmiyor — ve 9\. makalede **yeniden üretme** (replication) terimini "bir çalışmanın bağımsız tekrarı" diye tanımlarken bu ayrımı henüz açmamıştık.

Bu makale onu açıyor ve fazı kapatıyor. Sorusu şu: **bir sonucu yeniden elde etmek ne demek, alan bunu ne kadar başarıyor ve başarısız olduğunda sebep nerede?**

Baştan bir uyarı, çünkü sözcükler burada tuzak. Alanın iki terimi var — tekrarlanabilirlik ve yeniden üretme — ve farklı topluluklar bunları **ters yönlerde** kullanıyor: kimileri için birincisi yazarın kodunu yeniden çalıştırmak, ikincisi bağımsız bir kurulumla aynı bulguya varmak; kimileri için tam tersi. Ayrışmanın bir sebebi var. Hesaplamalı bilimlerde asıl zorluk aynı çıktıyı yeniden almaktı, dolayısıyla "yeniden üretme" kodu ve veriyi paylaşmak anlamına geldi; deneysel bilimlerde asıl zorluk bulgunun yeni bir örneklemde çıkması olduğu için aynı sözcük bağımsız tekrarı adlandırdı. Makine öğrenmesi iki geleneğin de mirasçısı olduğu için iki kullanım da yaşıyor.

Bu yüzden tartışmayı sözcük üzerinden yürütmek boşa gider. Yerine üç soru sorulur: aynı kod mu, aynı veri mi, aynı sonuç mu?

## Üç derece, üç ayrı iş

Odd Erik Gundersen ve Sigbjørn Kjensmo'nun AAAI 2018'de sunduğu çalışma bu üç soruyu bir dereceler dizisine çeviriyor ve her derecenin neyi kanıtladığını ayırıyor.

![Üç bloklu bir tablo ve altında iki kutu. Üstte başlık: bir sonucu yeniden elde etmenin üç derecesi. Sütun başlıkları derece, uygulama ve veridir; her derecenin altında ne gösterdiği ayrı bir satırda yazılıdır. Birinci blok deney tekrarlanabilir: uygulama aynı, veri aynı; altında kodun çalıştığını ve sayıların yazıldığı gibi çıktığını gösterdiği yazılıdır. İkinci blok veri tekrarlanabilir: uygulama başka, veri aynı; altında yöntemin yeniden kurulacak kadar iyi tarif edildiğini gösterdiği yazılıdır. Üçüncü blok vurguludur, yöntem tekrarlanabilir: uygulama başka, veri başka; altında bulgunun tek bir uygulamaya ya da tek bir kümeye bağlı olmadığını gösterdiği yazılıdır. Birinci kutuda ölçüm durur: taranan 400 bildirinin hiçbiri gerekli değişkenlerin tamamını belgelemiyor ve üç etkenin her biri için oran yüzde 20 ile 30 arasında. İkinci kutuda bir eğilim durur: derece yükseldikçe puan düşüyor, yani en çok belgeleme isteyen derece en az karşılanan derece. En altta bir kayıt: dereceler ve sayılar Gundersen ile Kjensmo'nun çalışmasından alınmıştır.](assets/tekrarlanabilirligin-uc-derecesi.svg "Şekil 1 — Aynı kod mu, aynı veri mi, aynı sonuç mu")

Şekil 1'in üç satırı aynı kelimeyle adlandırılan üç farklı iddiaya karşılık geliyor. Birinci derece yalnızca "yazdıklarımız tutarlı" der; bir tohum sabitlenerek sağlanabilir ve hiçbir genellik taşımaz. İkinci derece yöntemin **tarif edilmiş** olduğunu gösterir: başka biri, yalnızca metne bakarak aynı şeyi kurabilmiştir. Üçüncü derece bulgunun kendisini sınar.

Xavier Bouthillier, César Laurent ve Pascal Vincent'ın ICML 2019'da sunduğu çalışma bu ayrımı bir başlık paradoksuna sıkıştırıyor: yeniden üretilemeyen araştırma yeniden üretilebilirdir. Cümle çelişkili görünüyor ama söylediği şey sade — bir yöntem, tohumlar sabitlendiği için birinci derecede kusursuz olabilir ve aynı zamanda bulgusu yanlış olabilir. Yazarlar bunu ölçüyor da: sekiz model, tek bir veri kümesinde, yalnızca başlangıç tohumu değiştirilerek eğitiliyor ve modellerin sıralaması koşudan koşuya belirgin biçimde oynuyor. Tek bir koşuya dayanan sıralama, kendi tekrarında ayakta kalmıyor.

Şekil 1'in ikinci kutusu bu resmin istatistiğini veriyor ve beklenen yönde: bir derece ne kadar çok belgeleme isterse, o kadar az karşılanıyor. Ölçümün kendi kurulumu da dikkate değer — yazarlar bir bildirinin yeniden üretilip üretilmediğini denemiyor, yeniden üretmek için **gerekli değişkenlerin yazılıp yazılmadığını** sayıyor. Yani bulunan şey bir başarısızlık oranı değil, bir ön koşul eksikliği: belgelenmemiş bir değişken, denemeye kalkışan kişinin tahmin etmek zorunda kalacağı bir seçim demek. Bir sonraki bölüm bu tahminin ne kadar sık tuttuğunu ölçüyor.

> **Kendini yokla:** Bir çalışmanın kodu yayımlanmış ve kodu çalıştırınca makaledeki sayılar birebir çıkıyor. Bu, sonucun doğru olduğunu gösterir mi?

Göstermez; yalnızca birinci dereceyi gösterir. Kod, makaledeki hesabın ne olduğunu kanıtlar — hesabın doğru soruyu sorduğunu değil. Sayıların birebir çıkması, tohum sabitlendiği için bütün oynaklık kaynaklarının kapatılmış olmasından da gelebilir; 101\. makalede gördüğümüz gibi en büyük kaynak veri örneklemiydi ve onu sabitlemek sonucu değil, yalnızca sonucun tekrarını garanti eder.

## Kodsuz yeniden kurmak

İkinci dereceyi ölçmenin tek yolu, gerçekten denemek. Edward Raff'ın NeurIPS 2019'da sunduğu çalışma tam olarak bunu yapıyor: 1984 ile 2017 arasında yayımlanmış 255 bildiri, yalnızca metne bakılarak yeniden kuruluyor. Yazarların kodu **kasıtlı olarak okunmuyor** — okunsaydı bağımsızlık kalmazdı — ve bir bildiri, iddialarının çoğunluğu bağımsız yazılan kodla doğrulandığında yeniden üretilmiş sayılıyor.

Sonuç: 255 bildirinin 162'si, yani yüzde 63,5'i yeniden üretilebiliyor; 93'ü üretilemiyor.

![İki sütunlu bir liste ve altında iki kutu. Üstte başlık: yeniden üretimi ne öngörüyor, ne öngörmüyor. Sol sütunda öngören özellikler sıralıdır: metnin okunabilirliği, sözde kodun varlığı, hiperparametrelerin yazılmış olması, algoritmanın zorluğu, bildirinin kuram ile deney arasındaki ağırlığı, gereken hesap düzeyi ve yazarların e-postaya cevap vermesi. Sağ sütunda öngörmeyen özellikler sıralıdır: yayın yılı, ilk deneme yılı, mecra türü, ek bölümün varlığı, bildirinin göz korkutucu görünmesi, oyuncak örnek problem kullanılması ve kullanılan hesabın bildirilmiş olması. Birinci kutuda genel sonuç durur: 255 bildirinin 162'si, yani yüzde 63,5'i bağımsız olarak yeniden üretilebildi, 93'ü üretilemedi. İkinci kutu vurguludur ve bir sınırı taşır: küme düzeyinde hesap gerektiren hiçbir bildiri yeniden üretilemedi, oysa yalnızca bir grafik işlemcisi gerektirenlerin oranı ortalamanın üstünde. En altta bir kayıt: liste Raff'ın anlamlılık testi tablosundan alınmıştır ve yazarın kendi yeniden kurma denemelerine dayanır.](assets/neyi-yeniden-uretebiliyoruz.svg "Şekil 2 — Yeniden üretimi öngören şey ne")

Şekil 2'nin sağ sütunu sol sütunu kadar öğretici. Yayın yılı, mecranın türü ve bildirinin ek bölüm taşıyıp taşımaması yeniden üretilebilirlikle ilişkili çıkmıyor. Yani "iyi bir konferansta yayımlanmış olmak" bir sonucun yeniden kurulabileceğini öngörmüyor — 98\. makaledeki hakemlik ölçümünün doğal devamı: hakemlik bir okuma turudur ve okuma, yeniden kurmaktan farklı bir iştir.

Sol sütun ise doğrudan yazılabilir şeylerden oluşuyor: metin kaç okumada anlaşılıyor, sözde kod var mı, hiperparametreler yazılı mı. Listedeki en beklenmedik kalem sonuncusu — yazarların e-postaya cevap verip vermemesi. Bu, yeniden üretilebilirliğin kısmen bir **belge** özelliği değil, bir **ilişki** özelliği olduğunu söylüyor: eksik kalan ayrıntı, yazılmadığı durumda ancak sorularak tamamlanıyor.

İki ayrıntı daha bu listeyi somutlaştırıyor. Okunabilirlik, yazarın tanımında "tam bir uygulamaya ulaşmak için metnin kaç kez okunması gerektiği" demek; en yüksek sınıfa giren bildirilerin **hepsi** yeniden üretilmiş. Ve tablo sayısı ilişkili çıkarken grafik sayısı çıkmıyor — yazarların yorumu, tablonun okura vurulacak kesin bir hedef vermesi, grafiğin vermemesi. 9\. makalede ölçek yasası eğrilerinin altında kaç ölçülmüş nokta olduğunu sormuştuk; burada aynı ayrım yeniden kuran kişinin tarafından görünüyor.

İkinci kutudaki sınır da dürüstçe söylenmeli: küme düzeyinde hesap gerektiren hiçbir bildiri bu çalışmada yeniden üretilemedi. Yeniden üretilebilirlik bir yazım disiplini olduğu kadar bir kaynak sorunu; 20\. makaledeki açıklık eksenlerinin yanında bir de hesap ekseni var ve o eksen açılmıyor. Yazarların kendi uyarısı da kayda değer: konu alanı da anlamlı bir etken çıkıyor ve kendi başarı oranları alt alanlara göre belirgin biçimde değişiyor — bunu yeniden üretenin uzmanlığına bağlıyor ve sonucun genelleştirilmemesini istiyorlar. Yani "yeniden üretilebilir" bir nitelik değil, bir **ilişki**: bildiri, onu kuran kişi ve o kişinin alanı birlikte belirliyor.

## Kurumun cevabı

Alan bu bulgulara kurumsal olarak da karşılık verdi. Joelle Pineau ve arkadaşlarının JMLR'de 2021'de yayımladığı rapor, NeurIPS 2019'da yürütülen üç parçalı bir programın sonuçlarını anlatıyor: gönderiyle birlikte kod paylaşma politikası, topluluğa açık bir yeniden üretme yarışması ve gönderi sırasında doldurulan bir tekrarlanabilirlik kontrol listesi.

Ölçülen değişim iki yönlü. Kod paylaşan yazarların oranı bir yıl içinde yüzde 50'nin altından yaklaşık yüzde 75'e çıkıyor; aynı yıl gönderi sayısı da yüzde 40 artıyor, yani politika yazarları uzaklaştırmıyor. Kod bağlantısı vermiş olmak hakem puanıyla da olumlu ilişkili çıkıyor. Yeniden üretme yarışmasında 173 bildiri sahiplenilmiş, 73 kurumdan katılımcı çalışmış ve 84 rapor incelenmiş — sahiplenilen bildirilerin yaklaşık yarısı rapora dönüşmüş.

Yarışmanın tasarımında iki ayrıntı önemli. Süreç, yazarların kod göndermesi için tanınan sürenin **bitiminden sonra** başlatılıyor, böylece katılımcılar yazarın paylaştığı her şeyden yararlanabiliyor; ve yazarlarla katılımcılar arasında açık bir yazışma kanalı kuruluyor, yani bulunan eksikler sessizce başarısızlığa dönüşmek yerine soruya dönüşebiliyor. Programın ilan edilmiş amacı da yalnızca doğrulama değil: bu ikincil çözümlemenin kamuya açık bir iz bırakması.

Bu rakamların ikinci yarısı da söylenmeli: 173, o yılın kabul edilen bildirilerinin küçük bir azınlığı. Yani bağımsız doğrulama artık var ve kurumsal bir yeri de var, ama alanın ürettiği iddiaların büyük çoğunluğu hâlâ denenmeden duruyor. 80\. makaledeki model kartı ve sistem kartı tartışmasının buradaki karşılığı da bu: belgeleme zorunlu hâle getirildiğinde hızla yayılıyor, fakat belgelemenin kendisi doğrulama değil.

Bunun yüksek görünürlüklü bir örneği de var ve tam olarak bu boşluğu gösteriyor. Benjamin Haibe-Kains ve arkadaşlarının Nature'da 2020'de yayımlanan yazısı, aynı dergide yayımlanmış bir meme kanseri taraması çalışmasına karşı çıkıyor — bulgusunun yanlış olduğunu iddia ederek değil, **denetlenemez** olduğunu söyleyerek: yöntem ayrıntılarının ve algoritma kodunun verilmemiş olması çalışmanın bilimsel değerini zayıflatıyor. İtiraz bir hata bildirimi değil, bir kapı kapanması bildirimidir: iddia doğru da olabilir, ama dışarıdan biri bunu sınayamaz. 98\. makalenin sonundaki cümle burada kurumsal bir karşılık buluyordu — kanıt yayımlanmamışsa, iddia ile kanıt arasındaki bağı kurmak ilkece mümkün değildir.

## Yeniden üretilebilir ama yanlış

Buraya kadar sorun eksik bilgiydi. Şimdi daha rahatsız edici bir duruma geliyoruz: bilgi eksik değil, sonuç yine de yanlış — ve yanlışlık her seferinde aynı yerden geliyor.

Sayash Kapoor ve Arvind Narayanan'ın Patterns'te 2023'te yayımladığı çalışma, makine öğrenmesini araç olarak kullanan bilim alanlarını tarıyor ve **veri sızıntısı** (data leakage) dedikleri hatanın yaygınlığını sayıyor: 17 alanda, toplam 329 bildiriyi etkileyen sızıntı vakaları ve sekiz ayrı sızıntı türü. Sızıntı, ders kitabı düzeyinde bir hatadan — eğitim ve test kümesini birlikte işlemek — açık bir araştırma problemine kadar uzanan bir aile.

![Dört bloklu bir liste ve altında iki kutu. Üstte başlık: iç savaş öngörüsü literatüründe dört çalışma ve sızıntının biçimi. Birinci blok, eksik değer tamamlama: eğitim ve test verisindeki eksikler birlikte tamamlanıyor ve test verisinin bilgisi eğitime karışıyor. İkinci blok, hazır kümenin yeniden kullanımı: aynı biçimde hazırlanmış hazır veri kümesi olduğu gibi yeniden kullanılıyor. Üçüncü blok, üçüncü kullanım: aynı hatalı veri kümesi bir kez daha devralınıyor. Dördüncü blok vurguludur, hedefin vekili: hedef değişkenin yerine geçen değişkenler öngörücü sayılıyor ve sonuç neredeyse kusursuz doğruluk oluyor. Birinci kutuda genel sayım durur: 17 alanda toplam 329 bildiriyi etkileyen sızıntı vakası ve sekiz ayrı sızıntı türü. İkinci kutuda bu literatürün sonucu durur: karmaşık modellerin lojistik bağlanımı geçtiğini iddia eden çalışmaların hepsi yeniden üretilemiyor ve düzeltilince üstünlük kalmıyor. En altta bir kayıt: vakalar Kapoor ile Narayanan'ın çalışmasından alınmıştır.](assets/sizinti-ve-tersine-donen-sonuc.svg "Şekil 3 — Aynı veri, düzeltilmiş hesap")

Şekil 3 çalışmanın tek bir alan üzerinde yaptığı ayrıntılı incelemeyi özetliyor. Yazarlar, karmaşık modellerin klasik istatistik yöntemlerini açık ara geçtiğine inanılan bir alanı seçiyor ve o alandaki iddiaları tek tek yeniden kuruyor. Bulgu sert: bu iddiayı taşıyan çalışmaların **hepsi** sızıntı yüzünden yeniden üretilemiyor, ve hesaplar düzeltildiğinde karmaşık modeller onlarca yıllık lojistik bağlanımdan kayda değer biçimde iyi çıkmıyor.

97\. makaledeki taban çizgisi dersinin en sert hâli bu. Orada iyi ayarlanmış bir klasik yöntemin yeni yöntemlerle başa baş gidebildiğini görmüştük; burada klasik yöntemin geçildiği izlenimi **tümüyle** bir hesap hatasından geliyor. Ve yazarların kendi notu okuma tarafını da bağlıyor: bu hataların hiçbiri bildiriyi okuyarak yakalanamazdı. 98\. makalenin iddia-kanıt eşlemesi burada yetmiyor, çünkü iddia ile kanıt birbirine tam oturuyor — kusur ikisinin de dayandığı veri hazırlığında.

72\. makaledeki kirlilik tartışmasıyla akrabalığı açık ama nesnesi farklı: orada sınav soruları eğitim verisine sızıyordu, burada test kümesinin bilgisi eğitim hattına sızıyor. İkisinin ortak yanı, sızıntının puanı **yukarı** taşıması ve hiçbir istatistiksel testin bunu görmemesi. Güven aralığı, yanlış hesaplanmış bir sayının etrafında da dar olabilir.

Yazarların önerdiği çare de bu yüzden istatistiksel değil, biçimsel: her iddianın yanında, modelin nasıl kurulduğunu ve verinin nasıl bölündüğünü madde madde beyan eden bir bilgi çizelgesi. Kendi incelemelerinde bu çizelge, saydıkları vakaların her birindeki sızıntıyı yakalıyor. Mekanizması 99\. makaledeki ön kayıt fikrinin akrabası — kararın metinde görünür hâle getirilmesi — ama nesnesi hipotez değil, veri hattı.

> **Kendini yokla:** 72\. makaledeki kirlilik ile buradaki sızıntı aynı şey mi?

Değil; ortak yanları puanı yukarı taşımaları. Kirlilikte değerlendirme soruları modelin **eğitim derlemine** karışır ve sorun modelin gördüğü metindedir. Sızıntıda veri hattının kendisi kusurludur: test kümesinin bilgisi, eksik değer tamamlamak ya da hedefin yerine geçen bir değişkeni öngörücü saymak gibi işlemlerle eğitime taşınır. Birincisi verinin nereden geldiğiyle, ikincisi verinin nasıl hazırlandığıyla ilgilidir — ve ikincisini yakalamak için eğitim derlemine değil, hazırlık adımlarına bakmak gerekir.

## Yayımlanmayanın ağırlığı

Son bir eksiklik kalıyor ve bu, yapılan işle değil yapılıp **anlatılmayan** işle ilgili.

Bir alan yalnızca olumlu sonuçları yayımlıyorsa, literatür gerçekliğin yanlı bir örneklemi hâline gelir: aynı fikri deneyip başarısız olan on ekip görünmez, başaran bir ekip görünür. Bunun ölçülmüş hâli alan dışından geliyor. Açık Bilim İşbirliği'nin Science'ta 2015'te yayımladığı çalışma, psikolojinin üç dergisinden seçilen 100 çalışmayı, çoğu zaman özgün malzemeyle ve yüksek güçlü tasarımlarla yeniden yapıyor. Özgün çalışmaların yüzde 97'si anlamlı sonuç bildirmiş; yeniden yapılanların yüzde 36'sı anlamlı çıkıyor. Etki büyüklükleri ortalamada yarıya iniyor: 0,403'ten 0,197'ye. Özgün etki büyüklüklerinin yüzde 47'si tekrarın güven aralığının içinde kalıyor. Ve bir ayrıntı, 99\. makaledeki hipotez tartışmasına doğrudan bağlanıyor: ana etkileri sınayan çalışmaların yüzde 47'si tekrarlanırken, etkileşim sınayanların yalnızca yüzde 22'si tekrarlanıyor — daha ince bir iddia, daha kırılgan bir sonuç.

Aynı çalışmanın ölçüyü tek bir kapıya bağlamaması da öğretici. "Tekrarlandı mı" sorusunun cevabı hangi ölçütle bakıldığına göre değişiyor: anlamlılık eşiğiyle yüzde 36, özgün etki büyüklüğünün tekrarın aralığında kalmasıyla yüzde 47, tekrarı yapan ekiplerin öznel değerlendirmesiyle yüzde 39; özgün ve tekrar sonuçları birleştirilip tek bir çözümleme yapıldığında ise yüzde 68. Beş sayı, tek bir olgu. 16\. makaleden beri tekrarladığımız cümlenin bu fazdaki son hâli: cevap, hangi cetveli seçtiğine bağlı — ve burada cetvelin seçimi bir tanım kararıdır, bir ölçüm kararı değil.

Bu sayıların makine öğrenmesine doğrudan taşınamayacağını söylemek gerekiyor: deneyler farklı, ölçüler farklı, tekrar maliyeti farklı. Karşılaştırılabilir ölçekte bir tarama bu alanda henüz yapılmadı — ve bu, bilinen bir eksikliktir, çözülmüş bir soru değil. Ama mekanizma ortak: yayımlanan sonuçların kümesi, denenen şeylerin kümesi değildir. 99\. makalede gördüğümüz yirmi beş yapılandırmadan yalnızca ikisinin işe yaradığı sonuç, tam da amacı olumsuz bir bulguyu bildirmek olduğu için yayımlanabilmişti.

## Tekrarlanabilirliğin disiplini

**Tek bir "tekrarlanabilirlik" yok, üç ayrı iş var.** Aynı kodu çalıştırmak kodun çalıştığını, yöntemi yeniden kurmak tarifin yeterli olduğunu, bulguyu başka veriyle almak iddianın genel olduğunu gösterir. Terimler topluluklar arasında ters kullanıldığı için soru sözcükle değil, üç sorusuyla sorulur.

**Belgeleme derecesi yükseldikçe karşılanma oranı düşüyor.** Taranan 400 bildirinin hiçbiri gerekli değişkenlerin tamamını vermiyor; her etken için oran yüzde 20–30 bandında.

**Kodsuz yeniden kurmak çoğu zaman mümkün, ama neyin mümkün kıldığı beklenmedik.** 255 bildirinin yüzde 63,5'i yeniden üretildi; öngören şey okunabilirlik, sözde kod, yazılmış hiperparametreler ve yazarın cevap vermesi — mecra ya da yıl değil.

**Kaynak da bir açıklık eksenidir.** Küme düzeyinde hesap gerektiren bildiriler bu taramada hiç yeniden üretilemedi; kod yayımlamak bu engeli kaldırmıyor.

**Zorunluluk belgeleme davranışını hızla değiştiriyor.** Kod paylaşımı bir yılda yüzde 50'nin altından yaklaşık yüzde 75'e çıktı ve gönderi sayısı düşmedi; ama bağımsız doğrulama hâlâ kabul edilen bildirilerin küçük bir azınlığına dokunuyor.

**Sızıntı, tekrarlanabilirliğin istatistikle çözülmeyen yüzüdür.** 17 alanda 329 bildiriyi etkiledi; bir alanda karmaşık modellerin klasik yönteme üstünlüğünü tümden sildi ve hiçbiri bildiriyi okuyarak yakalanamazdı.

**Yayımlanan sonuçlar denenen şeylerin örneklemi değildir.** Alan dışındaki en geniş tekrar çalışmasında anlamlı sonuç oranı yüzde 97'den 36'ya, etki büyüklükleri yarıya indi; incelikli iddialar daha da kırılgan çıktı.

Bu fazın bıraktığı asıl alışkanlık tek bir cümle: bir sonucu kullanmadan önce, onu **kimin, hangi düzenekte, hangi sayıyla** elde ettiğini sor. Okumak (98), tasarlamak (99), ölçmek (101) ve yeniden elde etmek (102) aynı alışkanlığın dört yüzü.

### Sırada ne var

Bir yöntemi gerçekten anladığının en sert sınavı, onu başkasının kodu olmadan yeniden kurabilmek. Serinin bir sonraki fazı bunu bir okuma alıştırması olmaktan çıkarıp doğrudan yapıyor: 6\. ve 7\. makalede kurduğumuz mimariyi, bütün parçalarıyla ve gerçek küçük sayılarla, sıfırdan elle inşa ediyoruz. Sorgu, anahtar ve değer matrisleri hangi boyutlarda; bir token gerçekte hangi sayı dizisine dönüşüyor; ve tek bir ileri geçişin sonunda çıkan dağılım elle takip edilebilir mi?

## Kaynakça

- Gundersen, O. E. & Kjensmo, S. (2018). *State of the Art: Reproducibility in Artificial Intelligence*. AAAI 2018 (Proceedings of the AAAI Conference on Artificial Intelligence 32(1)), s. 1644. [Bağlantı](https://doi.org/10.1609/aaai.v32i1.11503)
- Bouthillier, X., Laurent, C. & Vincent, P. (2019). *Unreproducible Research is Reproducible*. ICML 2019, PMLR 97, 725–734. [Bağlantı](https://proceedings.mlr.press/v97/bouthillier19a.html)
- Raff, E. (2019). *A Step Toward Quantifying Independently Reproducible Machine Learning Research*. NeurIPS 2019. [Bağlantı](https://papers.nips.cc/paper_files/paper/2019/hash/c429429bf1f2af051f2021dc92a8ebea-Abstract.html)
- Pineau, J., Vincent-Lamarre, P., Sinha, K., Larivière, V., Beygelzimer, A., d'Alché-Buc, F., Fox, E. & Larochelle, H. (2021). *Improving Reproducibility in Machine Learning Research (A Report from the NeurIPS 2019 Reproducibility Program)*. Journal of Machine Learning Research 22(164), 1–20. [Bağlantı](https://jmlr.org/papers/v22/20-303.html)
- Haibe-Kains, B., Adam, G. A., Hosny, A., Khodakarami, F. ve ark. (2020). *Transparency and reproducibility in artificial intelligence*. Nature 586, E14–E16. [Bağlantı](https://doi.org/10.1038/s41586-020-2766-y)
- Kapoor, S. & Narayanan, A. (2023). *Leakage and the reproducibility crisis in machine-learning-based science*. Patterns 4(9), 100804. [Bağlantı](https://doi.org/10.1016/j.patter.2023.100804)
- Open Science Collaboration (2015). *Estimating the reproducibility of psychological science*. Science 349(6251), aac4716. [Bağlantı](https://doi.org/10.1126/science.aac4716)
