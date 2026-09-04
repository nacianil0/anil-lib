---
article_id: article_904dc391-074d-4c2c-b903-acd81ae7cbd6
title: "Web, Kod ve Dosyalarla Çalışan Modeller"
slug: web-kod-ve-dosyalarla-calisan-modeller
category: agents-and-retrieval
level: intermediate
reading_order: 48
summary: "En çok kullanılan üç aracı arayüz olarak kurar: arama motorunun cevap değil liste döndürmesini ve sayfanın isteme girmeden önce süzülmesini, yorumlayıcının hesabı devralıp hata mesajını gözleme çevirmesini, dosya sisteminin bir depo dizinine dönüşmesini; aynı modelde yalnızca arayüz düğmelerini değiştirerek çözülen görev oranının nasıl değiştiğini ölçümlerle gösterir."
tags:
  - arac-arayuzu
  - web-arama
  - kod-yorumlayicisi
  - dosya-sistemi
  - depo-duzeyi-getirme
content_hash: sha256:0bdd0421bcf5c7841b71956d555825cfaf40bf9f69cf81485ff5f2078257379b
classification_version: 1
classification_batch: 11
---
## Araç bir sözcük değil, bir arayüzdür

47\. makalede araç bir soyutlamaydı: bir ad, bir şema, dönen bir metin. Bu soyutlama işlev çağrısının mekanizmasını kurmaya yetti; ama bir modelin bugün en çok kullandığı üç araç o kadar küçük değil. Bir arama motoru sayfalar döndürür. Bir kod yorumlayıcısı modelin yazdığı programı çalıştırır ve hata mesajı da geri gelir. Bir dosya sistemi yüz binlerce satırlık bir depodur. Üçünde de aynı soru var: çağrı döndüğünde isteme **ne** girer, ve bunu kim kararlaştırır?

John Yang ve arkadaşlarının NeurIPS 2024'te sunduğu çalışma bu katmana bir ad verdi: **ajan–bilgisayar arayüzü** (agent-computer interface), yani modelin kullanabildiği komutlar ile bilgisayarın döndürdüğü geri bildirimin biçimi. Ajan sözcüğünün tam tanımı serinin bir sonraki fazının işi; bu makale için "araç kullanan model" demek yeter, ve arayüz sözcüğünü buradan alıyoruz: **araç arayüzü**, aracın modele nasıl göründüğüdür. Tez şu: arayüz, modelin başarısını mekanizma kadar belirler ve bu ölçülebilir. Aynı model, aynı görevler; yalnızca arayüzün bir düğmesi değişince çözülen görev oranı üçte bir oynuyor. Sayıları üçüncü bölümde göreceğiz.

Üç araç, üç soru: arama motorunun döndürdüğü şey isteme nasıl sığar; program çalışınca ne döner ve dönen şey neyi doğrular; bir depo nasıl aranır.

## Web: arama sonucu bir cevap değil, bir listedir

İlk şaşırtıcı şey, arama aracının cevap döndürmemesi. Bir arama çağrısı başlıklar, kısa özetler ve adresler döndürür; sayfanın kendisi ikinci bir araçla — getirme, okuma — istenir. Bu iki adımlı düzen tasarım kararıdır ve nedeni 44\. makaleden okunur: on sayfayı birden isteme koymak pencereyi doldurur ve ortada kaybolmayı satın alır; önce ucuz bir listeyle seçmek, sonra seçileni okumak 29\. makaledeki iki aşamalı sıralamanın web hâlidir.

Sayfa gelince iş bitmiyor. Xiao Liu ve arkadaşlarının KDD 2023'te sunduğu çalışma bir web soru-cevap sisteminin getirme hattını açıkça kuruyor: soru bir arama motoruna gönderilir ve genellikle ondan az adres döner; sayfalar paralel indirilir; HTML'den düz metin çıkarılır; sonra metin parçalanır ve 29\. makaledeki ikili kodlayıcıyla — toplam 300 milyon parametreyi geçmeyen iki küçük modelle — soruya en yakın parçalar seçilir. İsteme giren şey sayfa değil, bu parçalardır; 44\. makaledeki parçalama, web için yeniden kuruluyor. Üretici model de cevabını bu parçalara atıfla yazıyor: 45\. makaledeki atıf, arayüzün bir parçası.

Ölçümü insan yapmış. Cevaplar doğruluk, atıf isabeti ve akıcılık gibi eksenlerde sıfırla üç arasında puanlanmış; 10 milyar parametreli sistemin doğruluk puanı 2,810, atıf isabeti 2,757. Karşılaştırma noktası, aynı işi yapan ve kaynağı hakemli olmayan bir ön çalışma: Reiichiro Nakano ve arkadaşlarının 2021'de yayımladığı, 175 milyar parametreli bir modeli metin tabanlı bir tarayıcıyla eğiten sistem 2,889 ve 2,837 alıyor; aynı sistemin 13 milyarlık sürümü doğrulukta 2,102'de kalıyor. Küçük ve hedefli bir getirme hattı, on yedi kat büyük bir modele yaklaşıyor.

O ön çalışmanın kendisi web arayüzünün ilk örneği olduğu için anmaya değer. Modele tarayıcı olarak on komutluk bir dil verilmişti: ara, bağlantıya tıkla, sayfada bul, alıntıla, aşağı ve yukarı kaydır, en başa dön, geri git, bitir. Model sayfanın kendisini değil, metne çevrilmiş ve kaydırılabilen bir penceresini görüyordu; alıntıla komutu, cevaba girecek kaynakları topluyordu. İnsan değerlendiriciler modelin cevaplarını yüzde 56 oranında insan gösterimcilerin cevaplarına tercih etmişti. Sayıları hakemli olmayan bir kaynaktan aldığımız için kesinlik iddiası taşımıyor; ama tasarımın kendisi — sayfa yerine pencere, okuma yerine komut — sonraki bütün web arayüzlerinin iskeleti oldu.

Sayfanın ham hâlini modele vermenin bedelini Xiang Deng ve arkadaşlarının NeurIPS 2023 veri kümeleri ve ölçütler programında sunduğu çalışma ölçtü. 137 web sitesinden 2.000'i aşkın görev topladılar; bir sayfanın HTML'i ortalama 1.135 öğe içeriyor. Görünmeyen ve anlam taşımayan öğeleri süzmek bu sayıyı 580'e indiriyor ve hedef öğeyi yüzde 94,7 oranında koruyor; sonra küçük bir model aday öğeleri sıralıyor ve büyük model yalnızca adayları görüyor. 44\. makaledeki hat burada tıpatıp: önce süz, sonra sırala, sonra oku. Sonuçlar arayüzün sınırını da gösteriyor: en iyi düzende doğru öğe yüzde 55,1, doğru adım yüzde 52,0, ama görevin bütünü yalnızca yüzde 5,2 oranında tamamlanıyor. 40\. makaledeki çarpımsal düşüşün web hâli; tarayıcıyı baştan sona yöneten sistemler serinin bir sonraki fazının konusu.

> **Kendini yokla:** Arama aracı sayfa içeriği yerine neden başlık ve özet döndürür?

Çünkü pencere bir bütçedir ve iki aşamalı getirme bu bütçeyi korur: ucuz listeyle seçmek, pahalı içeriği yalnızca seçilen için harcamak. Sayfaların tamamını koymak 44'teki ortada kaybolmayı ve 41'deki dikkat dağıtıcı belgeyi aynı anda çağırır.

## Kod: yorumlayıcı bir hesap makinesi değil, bir doğrulayıcıdır

İkinci araç, modelin yazdığı programı çalıştıran bir yorumlayıcı. İlk bakışta 46 ve 47'deki hesap makinesinin büyük hâli; ama döndürdüğü şey bir sayıdan fazlası.

Luyu Gao ve arkadaşlarının ICML 2023'te sunduğu çalışma başlangıç noktası. 32\. makaledeki düşünce zincirinde model ara adımları yazıp hesabı da kendisi yapıyordu. Buradaki düzen ara adımları **program** olarak yazdırıyor — değişken adları soruyu taşıyor, satırlar akıl yürütmeyi — ve son satırı yorumlayıcıya bırakıyor. Sıradan okul matematiği sorularında çözme oranı düşünce zinciriyle 65,6, programla 72,0. Asıl bulgu, aynı soruların sayıları büyütülmüş sürümünde: doğrudan cevap 5,0, düşünce zinciri 20,1, program 61,5. Model büyük sayılarla hesap yapamıyor; programı yazabiliyor ve program sayıya duyarsız.

![İki panelli yatay çubuk şeması. Sol panelin başlığı GSM8K sıradan sayılar, sağ panelinki GSM-Hard aynı sorular büyük sayılardır. Her panelde solda düzenin adı, ortada çubuk, sağda çözme oranı vardır: doğrudan cevap 19,7 ve 5,0; düşünce zinciri 65,6 ve 20,1; program artı yorumlayıcı 72,0 ve 61,5, bu son satırın çubuğu vurgulu renktedir. Sol panelde kesikli çizgili dördüncü bir çubuk vardır: program yazılıp yorumlayıcı yerine modelin kendisine çalıştırtıldığında 23,2. Şeklin altında çubukların aynı ölçekte olduğu, büyük sayılarda düşünce zincirinin 45 puan ve programın 10 puan kaybettiği yazılıdır.](assets/hesabi-yorumlayiciya-devretmek.svg "Şekil 1 — Program aynı, hesabı kim yapıyor")

Şekil 1'deki kesikli çubuk kazancın kaynağını ayırıyor. Yazarlar aynı programı yazdırıp yorumlayıcı yerine modelin kendisine çalıştırtmış: 23,2. Kazanç kod biçiminden değil, hesabı devretmekten geliyor. Wenhu Chen ve arkadaşlarının Transactions on Machine Learning Research'te 2023'te yayımlanan çalışması aynı fikri sembolik bir kütüphaneyle kuruyor ve en büyük kazancı finansal tablolarda ölçüyor: bir finans kümesinde düşünce zinciri 40,4, program 64,5; sebep, tabloların üzerinde yapılan hesap hatalarının programda kaybolması.

Bu düzende yorumlayıcı bir kez çağrılıyor. Zhibin Gou ve arkadaşlarının ICLR 2024'te sunduğu çalışma çağrıyı 46\. makaledeki döngüye örüyor: model bir gerekçe yazar, bir program yazar, program çalışır, çıktı metne girer, model yeni bir gerekçeyle devam eder; her soruda en çok üç çalıştırma. Eğitim iki katmanlı: önce güçlü bir modelden alınan örülmüş izlerle taklit, sonra 34\. makaledeki reddetmeli örneklemenin bir biçimi — modelin kendi ürettiği geçerli izler ve yanlış izlerin bir öğretmen tarafından düzeltilmiş devamları. Sonuç, yarışma düzeyindeki bir matematik kümesinde: 7 milyarlık model 44,6 ile 70 milyarlık en iyi açık modelin 22,7'sini, 34 milyarlık model 50,8 ile büyük bir ticari modelin düşünce zinciri sonucu olan 42,5'i geçiyor; aynı ticari model programla çözünce 51,8.

Kod, aracı çağırmanın dili de olabilir. Xingyao Wang ve arkadaşlarının ICML 2024'te sunduğu çalışma, 47\. makalede JSON olarak gördüğümüz çağrıyı Python koduyla yazdırıyor ve bunun kazancını çok araçlı görevlerde ölçüyor: kodda döngü ve koşul var, JSON'da yok; on aracı bir döngüde çağırmak kodda tek eylem, JSON'da on tur. 82 görevlik, gösterimsiz bir sınavda en iyi modelin başarısı kodla yüzde 74,4, JSON'la 52,4, sabit kalıplı metinle 53,7; görev başına ortalama tur sayısı 5,5'e karşı 7,6 ve 7,7. On yedi modelin on ikisinde en iyi biçim kod. 47'deki "çağrının doğal biçimi eğitimde görülen biçimdir" cümlesi buraya da uzanıyor: model ön eğitimde milyarlarca satır kod görmüş, JSON çağrıyı sonradan öğrenmiştir.

Yorumlayıcının asıl armağanı ise hata mesajıdır. Xinyun Chen ve arkadaşlarının ICLR 2024'te sunduğu çalışma bunu bir döngüye çeviriyor: model kodu yazar, kod birim testlerinde çalıştırılır, çalışma sonucu — geçen ve kalan testler, hata satırı — isteme döner, model kodu açıklayıp düzeltir. Bir çeviri kümesinde doğruluk 80,4'ten birim testli geri bildirimle 91,6'ya, açıklama da eklenince 92,5'e çıkıyor; bir Python üretim kümesinde 61,4'ten 69,4 ve 69,8'e. Birim testin olmadığı bir SQL kümesinde bile modelin kendi kodunu satır satır açıklaması 81,3'ü 84,1'e çıkarıyor. 35\. makalede öz-düzeltmenin dış geri bildirimsiz zayıf olduğunu görmüştük; yorumlayıcı o dış geri bildirimi bedavaya veriyor.

> **Kendini yokla:** Program sıradan sayılarda 6 puan, büyük sayılarda 41 puan kazandırıyor. Fark nereden geliyor?

Çünkü iki kümede program aynı, yalnızca hesabın yükü farklı. Sıradan sayılarda model hesabı kendisi de yapabiliyor, kazanç küçük; büyük sayılarda hesap modelin en zayıf halkası ve yorumlayıcı o halkayı devralıyor. 31\. makaledeki içerik etkisinin tersi: içeriği değiştirmeden zorluğu değiştirmek, hangi halkanın kırıldığını gösterir.

Bir sınır da 30\. makaleden. Yorumlayıcı sözdizimini ve çalışmayı sınar; programın soruya doğru cevap verip vermediğini değil. Yanlış formülü kusursuz çalıştıran bir program, kusursuz biçimlenmiş bir uydurmadır. 35\. makaledeki sağlam doğrulayıcı burada yalnızca yarım: birim test varsa doğrulayıcı sağlamdır, yoksa yorumlayıcı yalnızca programın koşabildiğini söyler.

## Dosyalar: depo bir belge değil, bir dizindir

Üçüncü araç en büyüğü. Bir yazılım deposu binlerce dosya, yüz binlerce satırdır ve 21\. makaledeki pencereye sığmaz. Modelin dosya sistemiyle çalışması, 43 ve 44\. makalelerin sorusunu yeniden sormak demek: neyi dizine koyacağız, neyi pencereye?

Fengji Zhang ve arkadaşlarının EMNLP 2023'te sunduğu çalışma bunu kod tamamlama için kuruyor ve mekanizması bu makalenin en tanıdık parçası. Depodaki dosyalar 44\. makaledeki kayan pencereyle parçalanır; tamamlanacak yerin çevresi sorgu olur; en yakın parçalar isteme konur; model devamı yazar. Sonra 46\. makaledeki yinelemeli getirme: modelin yazdığı taslak, yeni sorgu olarak dizine gönderilir ve getirme tekrarlanır, çünkü taslak, henüz yazılmamış kodun hangi işlevleri çağıracağını söyler. Satır tamamlamada tam eşleşme: yalnızca açık dosyayla 40,56; tek getirmeyle 55,31; ikinci yinelemeyle 56,81; doğru parçaların elle verildiği tavan 57,75. Ve ölçek bulgusu: 350 milyon parametreli bir model getirmeyle 43,94 alırken, 6 milyarlık model getirmesiz 34,56'da kalıyor. 41\. makaledeki cümle kod için de geçerli: bilgiyi dışarıda tutan küçük model, içinde tutan büyük modeli geçiyor.

Getirici bu işte de kusursuz değil. Tianyang Liu ve arkadaşlarının ICLR 2024'te sunduğu ölçüt, depo içinde doğru parçayı bulmayı ayrı bir görev olarak ölçüyor. Kolay altkümede rastgele seçim 15,68, sözcük örtüşmesi 20,82, koda özel bir embedding modeli 25,94; başka dosyadan ilk kez çağrılan bir parçanın arandığı zor altkümede 6,44, 10,01 ve 17,70. Kod için de 43\. makalenin sorusu açık: dizinin kaçırdığı komşu sessizdir.

Yang ve arkadaşlarının çalışması ise depoyu tamamlama değil, onarma için açıyor: gerçek hata kayıtlarından türetilmiş görevlerde model bir dosyayı bulmalı, okumalı, değiştirmeli ve testleri geçirmeli. Bu, serinin ileride kod yazan sistemler için ayrıca kuracağı bir döngü; burada bizi ilgilendiren döngü değil, arayüzün dört düğmesi. **Arama** komutları en çok elli sonuç döndürür ve sonucu özetler; ham bir arama aracının yüzlerce satırlık dökümü isteme girmez. **Dosya görüntüleyici** dosyayı değil, satır numaralı yüz satırlık bir pencereyi gösterir; kaydırmak ve satıra gitmek ayrı komutlardır. **Düzenleyici** bir satır aralığını yeni metinle değiştirir ve değişiklikten sonra dosyayı otomatik olarak yeniden gösterir; ayrıca bir kod denetleyicisi çalışır — sözdizimini bozan düzenleme reddedilir, hata modele gösterilir. **Bağlam yönetimi** eski gözlemleri kısaltır: yalnızca son beş gözlem tam tutulur.

![Dört gruplu yatay çubuk şeması; her satırda solda düğmenin ayarı, ortada çubuk, sağda çözülen görev yüzdesi vardır. Düzenleyici grubunda satır aralığı artı lint 18,0 vurgulu, satır aralığı lint yok 15,0, düzenleme komutu yok 10,3. Arama grubunda özetlenmiş sonuç 18,0 vurgulu, yinelemeli sonuç 12,0, arama komutu yok 15,7. Dosya görüntüleyici grubunda pencere 30 satır 14,3, pencere 100 satır 18,0 vurgulu, tam dosya 12,7. Bağlam grubunda son 5 gözlem 18,0 vurgulu, tam geçmiş 15,0. Şeklin altında değerlerin 300 görevde çözülen görev yüzdesi olduğu, aynı modelin kullanıldığı ve vurgulu satırın her grupta tekrarlanan tam düzen olduğu yazılıdır.](assets/arayuzun-dugmeleri.svg "Şekil 2 — Aynı model, dört düğme")

Şekil 2 bu makalenin tezinin ölçüsü. Aynı model, 300 görevlik aynı küme; tam düzen görevlerin yüzde 18,0'ini çözüyor ve her satır tek bir düğmenin değişmesini gösteriyor. Kod denetleyicisini kaldırmak 15,0'e, düzenleme komutunu kaldırıp modeli kabuk komutlarına bırakmak 10,3'e düşürüyor. Arama sonuçlarını özetlemek yerine tek tek göstermek 12,0; arama komutunu hiç vermemek 15,7 — kötü bir arama aracı, aracın yokluğundan kötü, 47'deki kötü getirici gibi. Görüntüleyici penceresi 30 satıra inince 14,3, dosyanın tamamına açılınca 12,7: az bilgi de çok bilgi de kaybettiriyor ve yüz satır bu modelin ölçüsü. Tam geçmişi taşımak 15,0. Ölçek de var: aynı görev kümesinde 41\. makaledeki türden tek getirmeli bir düzen görevlerin yüzde 2,67'sini çözüyor; yalnızca kabuk komutları verilen model yüzde 11,00'ini; arayüzle yüzde 18,00'ini. Fatura da yazılı: görev başına maliyet tek getirmede 0,13 dolar, arayüzle 1,67; 28\. makaledeki muhasebe bu kez on üç kat.

Yazarların kendi cümlesi dersin özü: insan için tasarlanmış arayüzler modele uymuyor. İnsanın alışık olduğu dizin gezme komutlarını art arda çağırmak modelde son derece verimsiz; ham arama araçları düzinelerce ilgisiz satır döküyor. Model, kendi güçlü ve zayıf yanları olan yeni bir kullanıcı türü; arayüz ona göre çizilmeli.

> **Kendini yokla:** Dosyanın tamamını göstermek, yüz satırlık pencere göstermekten neden kötü?

Çünkü pencere doluyor ve ilgisiz satırlar 41\. makaledeki dikkat dağıtıcı belge gibi çalışıyor; 44'teki "küçükle ara, büyüğü döndür" burada "küçük pencereyle oku, gerekince kaydır"a dönüşüyor. Otuz satırın da kötü olması aynı kuralın öbür ucu: pencere işlevin bütününü göstermeyecek kadar küçülürse model bağlamı kaybediyor.

## Arayüzün disiplini

**Araç, döndürdüğü şeyle tanımlanır.** Adı ve şeması 47\. makalenin işiydi; bu makalede öğrendiğimiz, dönen metnin biçiminin — liste mi içerik mi, pencere mi dosya mı, hata mesajı mı sayı mı — başarıyı belirlediği.

**Liste önce, içerik sonra.** Arama başlık ve özet döndürür; içerik seçilen için ayrıca istenir. Sayfa geldiğinde de bütünü değil, süzülmüş ve parçalanmış hâli isteme girer.

**Yorumlayıcı hesabı devralır, doğruluğu değil.** Program büyük sayıya duyarsızdır ve kazanç oradadır; ama yorumlayıcı yalnızca sözdizimini ve çalışmayı sınar. Anlamı sınayan şey birim testtir; test yoksa doğrulayıcı yarımdır.

**Hata mesajı bir gözlemdir.** Çalışma sonucunu isteme geri koymak, öz-düzeltmeye eksik olan dış geri bildirimi verir; birim testle en büyük kazanç, açıklamayla bir tık daha.

**Kod, çağrının dili olabilir.** Döngü ve koşul gerektiren çok araçlı işlerde kod olarak eylem hem başarıyı artırır hem tur sayısını düşürür; model kodu ön eğitimden tanır.

**Pencere küçük ve hedefli olmalı.** Yüz satır, otuz satırdan da tam dosyadan da iyi; arama sonuçları özetlenmeli; eski gözlemler kısaltılmalı. Az bilgi ile çok bilgi aynı anda kaybettirir.

**Kötü araç, aracın yokluğundan kötüdür.** Tek tek dökülen arama sonuçları aramasızlıktan, sıradan getirici doğru belgesizlikten daha düşük puan alır. Arayüz kararı bir performans kararıdır ve ölçülmeden verilmez.

### Sırada ne var

Bu makaledeki üç arayüzün ortak bir sorunu var: hepsi uygulamaya özel. Bir arama aracını, bir yorumlayıcıyı, bir dosya görüntüleyicisini her uygulama kendisi yazıyor; 47\. makaledeki araç tanımları her sağlayıcıda başka biçimde duruyor; aynı aracı iki modele bağlamak iki ayrı iş. Binlerce aracın ve onlarca uygulamanın olduğu bir dünyada bu, çarpım kadar iş demek. Bir sonraki makale bu çarpımı toplama çevirmeye çalışan standarda bakıyor: araçların kendilerini nasıl tanıttığı, uygulamanın onları nasıl keşfettiği ve bir protokolün nereye kadar yettiği.

## Kaynakça

- Yang, J., Jimenez, C. E., Wettig, A., Lieret, K., Yao, S., Narasimhan, K. & Press, O. (2024). *SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering*. NeurIPS 2024. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/5a7c947568c1b1328ccc5230172e1e7c-Abstract-Conference.html)
- Liu, X., Lai, H., Yu, H., Xu, Y., Zeng, A., Du, Z., Zhang, P., Dong, Y. & Tang, J. (2023). *WebGLM: Towards An Efficient Web-Enhanced Question Answering System with Human Preferences*. KDD 2023. [Bağlantı](https://doi.org/10.1145/3580305.3599931)
- Nakano, R., Hilton, J., Balaji, S., Wu, J., Ouyang, L., Kim, C., Hesse, C., Jain, S., Kosaraju, V., Saunders, W., Jiang, X., Cobbe, K., Eloundou, T., Krueger, G., Button, K., Knight, M., Chess, B. & Schulman, J. (2021). *WebGPT: Browser-assisted question-answering with human feedback*. OpenAI, hakemli olmayan ön çalışma (arXiv:2112.09332). [Bağlantı](https://arxiv.org/abs/2112.09332)
- Deng, X., Gu, Y., Zheng, B., Chen, S., Stevens, S., Wang, B., Sun, H. & Su, Y. (2023). *Mind2Web: Towards a Generalist Agent for the Web*. NeurIPS 2023 Datasets and Benchmarks Track. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/5950bf290a1570ea401bf98882128160-Abstract-Datasets_and_Benchmarks.html)
- Gao, L., Madaan, A., Zhou, S., Alon, U., Liu, P., Yang, Y., Callan, J. & Neubig, G. (2023). *PAL: Program-aided Language Models*. ICML 2023, PMLR 202, s. 10764–10799. [Bağlantı](https://proceedings.mlr.press/v202/gao23f.html)
- Chen, W., Ma, X., Wang, X. & Cohen, W. W. (2023). *Program of Thoughts Prompting: Disentangling Computation from Reasoning for Numerical Reasoning Tasks*. Transactions on Machine Learning Research. [Bağlantı](https://openreview.net/forum?id=YfZ4ZPt8zd)
- Gou, Z., Shao, Z., Gong, Y., Shen, Y., Yang, Y., Huang, M., Duan, N. & Chen, W. (2024). *ToRA: A Tool-Integrated Reasoning Agent for Mathematical Problem Solving*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=Ep0TtjVoap)
- Wang, X., Chen, Y., Yuan, L., Zhang, Y., Li, Y., Peng, H. & Ji, H. (2024). *Executable Code Actions Elicit Better LLM Agents*. ICML 2024, PMLR 235, s. 50208–50232. [Bağlantı](https://proceedings.mlr.press/v235/wang24h.html)
- Chen, X., Lin, M., Schärli, N. & Zhou, D. (2024). *Teaching Large Language Models to Self-Debug*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=KuPixIqPiq)
- Zhang, F., Chen, B., Zhang, Y., Keung, J., Liu, J., Zan, D., Mao, Y., Lou, J.-G. & Chen, W. (2023). *RepoCoder: Repository-Level Code Completion Through Iterative Retrieval and Generation*. EMNLP 2023, s. 2471–2484. [Bağlantı](https://aclanthology.org/2023.emnlp-main.151/)
- Liu, T., Xu, C. & McAuley, J. (2024). *RepoBench: Benchmarking Repository-Level Code Auto-Completion Systems*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=pPjZIOuQuF)
