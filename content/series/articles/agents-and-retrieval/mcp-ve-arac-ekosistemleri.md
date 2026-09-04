---
article_id: article_9d673b78-5932-404e-b51d-33cbb200b6fe
title: "MCP ve Araç Ekosistemleri"
slug: mcp-ve-arac-ekosistemleri
category: agents-and-retrieval
level: intermediate
reading_order: 49
summary: "Araç tanımının uygulamadan protokole taşınmasını kurar: MCP'nin ana bilgisayar, istemci ve sunucu üçlüsünü, araçların listelenip çağrıldığı iki isteği ve sunucunun sohbeti görmeme ilkesini; binlerce sunucuya ulaşan ekosistemin sayılarını ve bir yıl içinde yarısı bozulan araçların ölçümünü; bin araç arasından seçimin getirmeye dönüşmesini; protokolün biçimi çözüp planlamayı çözmediğini ve araç açıklamasının neden bir saldırı yüzeyi olduğunu ölçümlerle anlatır."
tags:
  - mcp
  - arac-protokolu
  - arac-ekosistemi
  - arac-getirme
  - arac-zehirleme
content_hash: sha256:738e3d199d7fc6d5fc32a694d4e25ec261d78c31527f0aaca6d510d767b1de16
classification_version: 1
classification_batch: 11
---
## Çarpım problemi

48\. makale üç arayüzü kurdu ve ortak kusurlarını söyleyerek bitti: hepsi uygulamaya özel. Bir arama aracını, bir yorumlayıcıyı, bir dosya görüntüleyicisini her uygulama kendisi yazıyor; 47\. makaledeki araç tanımı her sağlayıcıda başka bir biçimde duruyor. Bir aracı iki modele bağlamak iki ayrı iş, on aracı beş uygulamaya bağlamak elli. Alanda araç sayısı da uygulama sayısı da hızla büyüyünce bu çarpım, işin kendisinden pahalı hâle geldi.

Bu makale çarpımı toplamaya çevirmeyi deneyen standarda bakıyor: **Model Bağlam Protokolü** (Model Context Protocol, MCP). Kısaltmayı Türkçeleştirmiyoruz; alanda ve belgelendirmede yalnızca kısaltmayla anılıyor. Üç soru soracağız. Bir protokol araç tanımını ve çağrıyı nasıl taşır, ve 47\. makaledeki mekanizmanın neresini değiştirir? Binlerce aracın olduğu bir ekosistem nasıl görünür ve ne kadar dayanıklıdır? Ve protokol neyi çözmez: araç seçimi, planlama ve güven?

Önce bir çerçeve. Yujia Qin ve arkadaşlarının ACM Computing Surveys'te yayımlanan derlemesi araç kullanan sistemleri dört parçaya ayırıyor: araç kümesi, kararı veren denetleyici model, dünyanın cevabını modele taşıyan algılayıcı ve araçların çalıştığı ortam. 47 ve 48\. makaleler denetleyiciyle algılayıcıyı — modelin çağrı üretmesini ve sonucun isteme dönmesini — kurdu. Bu makalenin konusu araç kümesinin kendisi: nereden gelir, nasıl bulunur, kime güvenilir.

## Bir protokolün anatomisi

MCP, Kasım 2024'te yayımlanmış açık bir belirtim; bugün beş sürümü var ve bu makale Temmuz 2026 tarihli güncel sürümü esas alıyor. Belirtim resmî belgelendirmedir, hakemli bir çalışma değil; ne söylediğini olduğu gibi aktarıyoruz, ne kadar işe yaradığını ölçen çalışmalar sonraki bölümlerde.

Sürümlerin tarihleri protokolün hızını gösteriyor: Kasım 2024, Mart 2025, Haziran 2025, Kasım 2025 ve Temmuz 2026; her sürüm bir öncekiyle geriye dönük uyum kuralına bağlı, ve bir özelliğin kaldırılması için en az on iki aylık bir kullanımdan kaldırma penceresi tanımlanmış.

Üç rol var. **Ana bilgisayar** (host), dil modelini çalıştıran uygulamadır: bir sohbet arayüzü, bir kod düzenleyicisi. **Sunucu** (server), araçları, veri kaynaklarını ve hazır istem şablonlarını sunan hizmettir; yerel bir süreç de olabilir, ağın öbür ucundaki bir servis de. Aradaki **istemci** (client) ana bilgisayarın içinde yaşar ve tek bir sunucuyla konuşur: her sunucu için ayrı bir istemci. Konuşmanın dili JSON-RPC 2.0, yani JSON gövdeli istek-cevap mesajları; taşıma katmanı yerel süreçler için standart giriş-çıkış, uzak sunucular için HTTP.

Araç tarafında iki istek her şeyi taşıyor. **Listeleme** isteğiyle istemci sunucuya araçlarını sorar; cevap, her araç için 47\. makaledeki üçlünün aynısını döndürür: bir ad, bir açıklama, argümanları tanımlayan bir girdi şeması; isteğe bağlı olarak bir çıktı şeması ve davranış açıklamaları. **Çağırma** isteğiyle istemci bir aracı adıyla ve argümanlarıyla çalıştırır; cevap, bir içerik listesi — metin, görüntü, ses, bir kaynağa bağlantı — ve bir hata bayrağı döndürür. Belirtim iki hata türünü ayırıyor: protokol hatası (bilinmeyen araç, bozuk istek) ile aracın çalışıp başarısız olması; ikincisi bir hata bayrağıyla sıradan bir sonuç olarak döner ki model onu okuyup düzeltebilsin — 48\. makaledeki "hata mesajı bir gözlemdir" kuralı protokole yazılmış. Sunucu araç listesini değiştirdiğinde bir bildirim gönderir; istemci listeyi yeniden çeker.

![Üç sütunlu mimari şeması. Solda ana bilgisayar kutusu ve içinde dil modeli ile iki istemci kutusu; ortada ve sağda iki sunucu kutusu, biri yerel dosya sistemi ve git, öbürü uzak bir servis. Her istemciden yalnızca bir sunucuya çift yönlü ok gider. Üstteki okun üzerinde tools/list ve dönen tanımlar, alttaki okun üzerinde tools/call ve dönen sonuç yazılıdır. Ana bilgisayar kutusunun içinde sohbet geçmişinin yalnızca burada durduğu, sunucu kutularının altında sunucunun sohbetin tamamını göremediği yazılıdır. Şeklin altında mesaj biçiminin JSON-RPC olduğu ve her sunucunun ayrı bir istemciyle konuştuğu belirtilir.](assets/mcp-uc-rol.svg "Şekil 1 — Sunucu araçları verir, sohbeti görmez")

Şekil 1'deki ayrımın bir tasarım ilkesi var ve belirtim onu açıkça yazıyor: sunucu sohbetin tamamını okuyamaz ve öbür sunucuların içine bakamaz; geçmiş ana bilgisayarda kalır, sunucuya yalnızca çağrının argümanları gider. 24\. makaledeki talimat hiyerarşisi burada mimariye dönüşmüş: üçüncü taraf, pencerenin tamamına değil, kendi çağrısına erişir.

Güncel sürümün iki kararı, serinin önceki makalelerine doğrudan bağlanıyor. Birincisi, protokol durumsuz hâle getirildi: her istek kendi protokol sürümünü ve istemcinin yeteneklerini taşıyor, açılış el sıkışması kaldırıldı — 21\. makaledeki durumsuz modelin protokol hâli; sunucu çağrılar arasında durum tutmak istiyorsa bunu açık bir tanıtıcıyla, sıradan bir argüman olarak yapıyor. İkincisi küçük ama öğretici: sunucuların araç listesini **belirlenimci bir sırayla** döndürmesi gerekiyor; gerekçe, 26 ve 28\. makalelerdeki önek paylaşımı. Araç tanımları istemin başında duruyor ve sıra her seferinde aynıysa önbellek tutuyor; sıra değişirse önek bozuluyor ve tanımlar her çağrıda yeniden hesaplanıyor. Bir protokol kararının nedeni, anahtar-değer önbelleğinin ekonomisi.

> **Kendini yokla:** MCP, 47\. makaledeki işlev çağrısının yerine mi geçiyor?

Hayır; onun iki ucunu standartlaştırıyor. Model hâlâ 47'deki gibi bir çağrı üretir — ad ve argümanlar, kendi şablonunun biçiminde. Değişen, tanımın nereden geldiği (uygulamanın kodundan değil, sunucunun listeleme cevabından) ve çağrıyı kimin çalıştırdığı (uygulamanın kendi kodu değil, istemcinin sunucuya ilettiği çağırma isteği). Çalıştırıcı, protokolün arkasına taşınmış oldu; modelin gördüğü dizi aynı.

## Ekosistem: sayılar ve kırılganlık

Protokolün amacı bir ekosistemdi ve ekosistem oluştu. Xinyi Hou ve arkadaşlarının ACM Transactions on Software Engineering and Methodology'de 2026'da yayımlanan çalışması, Eylül 2025 itibarıyla halka açık sunucu dizinlerini elle saydı: 26 büyük derleme; en büyüğü 26.404 sunucu, ikincisi 16.592, resmî derleme 1.204. Sayılar etkileyici, ama yazarlar aynı anda güvenilirliğini de ölçtü: en büyük ikinci dizinden rastgele 300 sunucu seçtiler; 30'unun adında MCP geçiyor ama protokolle ilgisi yok, 18'i ya bitmemiş ya erişilemez durumda. Dizin sayıları, çalışan sunucu sayısını abartıyor.

Resmî dizin de var ve tasarımı öğretici. Protokolün kendi kayıt sistemi, sunucuların kodunu değil üst verisini tutuyor: adı, nerede bulunduğu (bir paket deposu ya da uzak adres), nasıl çalıştırılacağı. Adlar ters alan adı biçiminde ve bir alan adının ya da bir kod barındırma hesabının sahipliği doğrulanmadan o ad altında sunucu yayımlanamıyor; güvenlik taraması ise dizinin işi değil, paket depolarına ve aşağı akıştaki pazar yerlerine bırakılmış. Yani dizin kimliği doğruluyor, davranışı değil. Bu ayrımın neden önemli olduğunu son bölümde göreceğiz.

Kırılganlığın daha keskin ölçüsü, protokolden önceki API ekosisteminden geliyor. 47\. makalede Qin ve arkadaşlarının 16.464 gerçek API'sini görmüştük. Zhicheng Guo ve arkadaşlarının ACL 2024 bulguları programında sunduğu çalışma, aynı kümeye bir yıl sonra döndü ve API'lerin yüzde 55,6'sının durumunun kararsız olduğunu buldu. Ayrıntılı sayım Şekil 2'de.

![Yatay çubuk şeması; her satırda solda bir API durumu, ortada çubuk, sağda yüzde vardır: başarıyla çalışıyor 44,4 vurgulu renkte; belgeden ayrıştırma hatası 25,9; bağlanılamıyor 14,8; yetki gerekiyor 6,4; parametreleri değişmiş 3,6; bulunamıyor 3,5; diğer 1,4. Şeklin altında bu sayıların ToolBench'teki API'lerin bir yıl sonraki durumu olduğu ve ayrıştırma hatalarının yerel belgelendirmeden kaynaklandığı yazılıdır.](assets/apilerin-bir-yil-sonrasi.svg "Şekil 2 — Bir yıl sonra çalışan API'ler yarıdan az")

Şekil 2'deki ayrıştırma hataları yerel belge işlemeden kaynaklanıyor ve düzeltilebilir; ama bağlanılamayan, yetki isteyen, parametresi değişen ve kaybolan API'ler ekosistemin doğası. Sonucu ölçüm için ağır: aynı modeli aynı sorularla üç kez sınayınca geçme oranı 33,0, 31,5 ve 37,5 çıkıyor, çünkü araçlar koşudan koşuya değişiyor. Yazarların çözümü, 16\. makaledeki cetvel disiplininin araç hâli: gerçek API'lerin yerine bir **sanal API sunucusu** — önce gerçek çağrıların önbelleği (süzmeden sonra 164.980 kayıt), önbellekte olmayan çağrılar için de belgesine ve önbellekteki gerçek örneklere bakarak cevabı taklit eden bir dil modeli. Bir ölçütün kararlı kalması için dünyanın kendisi dondurulmak zorunda kaldı.

Ekosistemin ilk büyük örneği araçların değil modellerin ekosistemiydi ve mekanizması aynıydı. Yongliang Shen ve arkadaşlarının NeurIPS 2023'te sunduğu çalışmada bir dil modeli, açık bir model deposundaki binlerce uzman modeli yalnızca **açıklamalarından** tanıyor: isteği görevlere ayırıyor, her göreve açıklamasına göre bir model seçiyor, modelleri çalıştırıyor ve sonuçları birleştiriyor. Bir aracın ekosisteme girmesi için gereken tek şey, 47\. makaledeki tanım üçlüsünün ilk iki parçası: bir ad ve iyi bir açıklama. Aracı modelin kendisi de yazabilir: Tianle Cai ve arkadaşlarının ICLR 2024'te sunduğu çalışmada güçlü bir model bir görev sınıfı için bir kez Python işlevi yazıyor, sonra ucuz bir model bu işlevi çağırıyor; çağrı başına maliyeti on beş kat düşük modelin doğruluğu altı görevin altısında pahalı modelin düşünce zinciri sonucuna yaklaşıyor ya da geçiyor, örneğin bir dizi görevinde 20,4'ten 92,2'ye. Ekosistemdeki araçlar yalnızca insanlar tarafından yazılmıyor.

## Bin araç arasından seçmek

47\. makalede araç seçimini bir getirme sorunu olarak kurmuştuk. Ekosistem ölçeğinde bu sorun tek sorun hâline geliyor, çünkü 16 binden fazla API'nin tanımı, 128 bin token'lık bir pencereye bile sığmıyor — Yu Du ve arkadaşlarının ICML 2024'te sunduğu çalışmanın açılış gözlemi. Kaba çözüm, API'leri 500'erlik 33 gruba bölüp modele sırayla göstermek; sonuç, kendi kurdukları sınavda yüzde 14,0. Önerdikleri düzen hiyerarşik: bir üst model soruyu API pazarının kategorilerine dağıtıyor, kategori başına bir model kendi kategorisinin araçlarını tarıyor, araç başına bir model tanımına bakıyor; aday küme daralınca 47'deki geri almalı ağaç çözüyor; çözüm işe yaramazsa hata nedeni geri besleniyor ve arama yeniden başlıyor. Dört ile altı yansıma turunda geçme oranı yüzde 20'ye varan artış gösteriyor; toplamda yüzde 73,8 — aynı sınavda 47'deki eğitilmiş getiriciyle çalışan ticari modelin 36,6'sına karşı.

Getiriciyi eğitmeden iyileştirmenin yolu da 44\. makaleden tanıdık. Yanfei Chen ve arkadaşlarının EMNLP 2024 bulguları programında sunduğu çalışma iki şey yapıyor: dizinleme sırasında her araç belgesi için bir dil modeline yapay sorgular yazdırıp belgeyi bunlarla genişletiyor — belge genişletmenin araç hâli — ve sorgu anında kullanıcının uzun, dolaylı isteğinden **niyetleri** çıkarıp her niyetle ayrı arıyor. Çok araçlı sorgularda ilk beşte nDCG, yoğun getiriciyle 0,530'dan 0,723'e; sözcük eşleşmesiyle 0,264'ten 0,564'e. Çok araçlı sorgunun tuzağı, bir aracı kaçırmanın görevi yarım bırakması; 43\. makaledeki bulma oranı burada bir **tamlık** ölçüsüne dönüşüyor.

Sağlayıcılar bu getirmeyi ürüne koydu. Bir sağlayıcının belgelendirmesi — hakemli değil, ölçüm koşulları verilmemiş — beş sunuculu tipik bir kurulumun araç tanımlarının yaklaşık 55 bin token tuttuğunu, tanımları isteğe bağlı yükleyip yalnızca aranıp bulunan üç-beş aracı pencereye almanın bu yükü yüzde 85'ten fazla azalttığını ve araç sayısı 30 ile 50'yi geçince seçim doğruluğunun düştüğünü söylüyor; tek istekte on bin araç ertelenebiliyor. Sayılar sağlayıcının kendi ölçümü; yön, hakemli çalışmalarla aynı.

> **Kendini yokla:** Araç açıklaması getirmekle belge getirmek arasındaki fark nedir?

Belge bir cevabı taşır, araç açıklaması bir eylemi. Yanlış getirilen belge 41\. makaledeki gibi dikkat dağıtır; yanlış getirilen araç 47'deki gibi yanlış çağrıya, yani dünyada yanlış bir işe dönüşür. Ve çok araçlı görevde ölçü bulma oranı değil tamlıktır: dört aracın üçünü getirmek görevi çözmez.

## Protokol neyi çözmüyor

Protokol tanımı ve çağrıyı taşır; kararı taşımaz. Bunun ölçüsünü Zhenting Wang ve arkadaşlarının ICLR 2026'da sunduğu çalışma veriyor. 28 gerçek MCP sunucusunu — 250 araç, on bir alan — bir sınav ortamına bağladılar; her göreve, gerekli sunuculara ek olarak on tane ilgisiz sunucu eklediler, böylece model her görevde yüzden fazla araç görüyor. Görevler bulanık yazılmış: hangi aracın çağrılacağı söylenmiyor. Ölçüm iki katmanlı: kural tabanlı üç ölçü — çağrılan aracın var olması, argümanların şemaya uyması, çağrının hatasız çalışması — ve bir hakem modelin puanladığı görev tamamlama, araç seçimi ve planlama.

![İki panelli yatay çubuk şeması; sol panel 8 milyar parametreli açık model, sağ panel en yüksek puanlı ticari model. Her panelde dört satır vardır; solda ölçünün adı, ortada çubuk, sağda değer: araç adı geçerli yüzde 96,1 ve 100,0; şemaya uyum yüzde 89,4 ve 99,3; çalıştırma başarısı yüzde 90,9 ve 99,1; görev tamamlama 0,261 ve 0,677, bu son satır vurgulu renktedir. Şeklin altında ilk üç ölçünün kural tabanlı ve yüzde, dördüncünün hakem model puanı ve sıfır ile bir arasında olduğu yazılıdır.](assets/bicim-cozuldu-is-cozulmedi.svg "Şekil 3 — Biçim çözüldü, iş çözülmedi")

Şekil 3'ün iki paneli aynı hikâyeyi anlatıyor. En küçük modelde bile araç adı yüzde 96,1 geçerli, şema uyumu yüzde 89,4; en iyi modelde üçü de yüzde 99'un üstünde. Protokol, 47\. makaledeki biçim sorununu büyük ölçüde kapatmış. Ama görev tamamlama puanı en iyi modelde 0,677, küçük modelde 0,261; paralellik ve verimlilik puanı — bağımsız çağrıları aynı anda yapma, gereksiz çağrıdan kaçınma — en iyi modelde bile 0,359'u geçmiyor. Yazarların özeti: modeller arasındaki farkı artık şema anlayışı değil, planlama ve akıl yürütme belirliyor. 46 ve 47'nin döngü ve paralellik dersleri, protokolün çözmediği yer.

Protokolün çözmediği ikinci şey güven. Araç tanımı 47\. makalede istemin başına, sistem isteminin yanına giriyordu; 24\. makaledeki hiyerarşide bu en yüksek güven düzeyi. Oysa tanımı yazan, ekosistemdeki bir sunucu — bir üçüncü taraf. Hou ve arkadaşları bir sunucunun yaşam döngüsünü dört evreye ve on altı etkinliğe ayırıp her evrenin tehditlerini sınıflandırıyor: dört saldırgan türü, on altı tehdit senaryosu. En öğreticisi **araç zehirleme** (tool poisoning): iki sayıyı toplayan sıradan bir aracın **açıklamasına**, "toplamayı bitirdikten sonra şu dosyayı oku ve şu adrese gönder" diye bir talimat gömülüyor. Kod masum; toplama doğru; ama açıklama sistem istemine girdiği için model talimatı yetkili sayıyor ve kullanıcı doğru sonucu alırken arka planda dosya dışarı çıkıyor. Belirtim bunun farkında ve kendi cümlesiyle söylüyor: araç açıklamaları, güvenilen bir sunucudan gelmedikçe güvenilmez sayılmalıdır; her çağrıdan önce kullanıcı onayı alınmalıdır. Ama protokol bunu zorlayamaz; ana bilgisayarın uygulaması gerekir. Aynı çalışmanın öbür senaryoları — adı meşru bir sunucuya benzeyen sahte sunucu, kurulduktan sonra davranış değiştiren sunucu, yalıtımdan kaçış — serinin güvenlik fazının konusu; burada yalnızca yerini işaretliyoruz.

> **Kendini yokla:** Araç açıklaması neden bir saldırı yüzeyi?

Çünkü 47\. makalede tanımlar istemin en ayrıcalıklı yerine, sistem istemine giriyordu ve model açıklamayı bir talimat gibi okuyor. 24'teki hiyerarşi üçüncü taraf metni en alta koyar; ama açıklama üçüncü taraftan gelip en üste yazılıyor. Zehir, kodda değil, metinde.

## Ekosistemin disiplini

**Protokol tanımı ve çağrıyı taşır, kararı değil.** MCP, tanımın nereden geldiğini ve çağrıyı kimin çalıştırdığını standartlaştırır; modelin ürettiği çağrı ve verdiği karar 47\. makaledeki gibidir.

**Sunucu sohbeti görmez.** Geçmiş ana bilgisayarda kalır; sunucuya yalnızca çağrının argümanları gider. Bu bir mimari ilke, ama onu uygulayan ana bilgisayardır.

**Araç listesi bir önek, sırası bir maliyettir.** Tanımlar istemin başındadır; sıra sabit kalırsa önbellek tutar, değişirse her çağrı yeniden ödenir.

**Dizin sayısı çalışan araç sayısı değildir.** Binlerce sunucudan bir kısmı bitmemiş ya da erişilemez; API'lerin yarıdan fazlası bir yıl içinde kararsızlaşır. Ölçüm için dünyanın dondurulması gerekebilir.

**Ekosistemde seçim bir getirme sorunudur ve ölçüsü tamlıktır.** Hiyerarşik daraltma, belge genişletme ve niyet çıkarma işe yarar; kötü seçilen araç yanlış eyleme dönüşür.

**Biçim çözüldü, iş çözülmedi.** Protokol üzerinde geçerli ad ve şema yüzde 99'a yaklaşır; görev tamamlama ve paralel planlama aynı modellerde çok daha düşüktür.

**Açıklama bir saldırı yüzeyidir.** Üçüncü tarafın yazdığı açıklama sistem istemine girer; güvenilmeyen sunucunun açıklaması talimat gibi okunmamalı ve çağrı onaysız yapılmamalıdır.

### Sırada ne var

Bu makalede araçlar dünyaya bağlanıyordu; peki dünyadan gelen şey ne kadar güncel ve ne kadar güvenilir? 41\. makale modelin bilgisinin bir tarihte donduğunu söylemişti; 45, getirilen kaynağın yanlış olabileceğini ölçmüştü; bu makale, aracın kendisinin bile bir yıl içinde bozulduğunu gösterdi. Faz 5'in son makalesi bu üç ipi birleştiriyor: modelin bilgisi hangi tarihe kadar geçerlidir ve bu tarih ilan edilenle aynı mıdır; iki kaynak çelişince model hangisine inanır; ve bir cevabın kaynağını göstermek, o kaynağa güvenmeyi ne kadar hak eder?

## Kaynakça

- Qin, Y., Hu, S., Lin, Y., Chen, W., Ding, N., Cui, G., Zeng, Z., Zhou, X., Huang, Y., Xiao, C., Han, C., Fung, Y. R., Su, Y., Wang, H., Qian, C., Tian, R., Zhu, K., Liang, S., Shen, X., Xu, B., Zhang, Z., Ye, Y., Li, B., Tang, Z., Yi, J., Zhu, Y., Dai, Z., Yan, L., Cong, X., Lu, Y., Zhao, W., Huang, Y., Yan, J., Han, X., Sun, X., Li, D., Phang, J., Yang, C., Wu, T., Ji, H., Li, G., Liu, Z. & Sun, M. (2025). *Tool Learning with Foundation Models*. ACM Computing Surveys 57(4), s. 1–40. [Bağlantı](https://doi.org/10.1145/3704435)
- Model Context Protocol (2026). *Specification, revision 2026-07-28* ve *The MCP Registry*. Resmî belirtim ve belgelendirme. [Bağlantı](https://modelcontextprotocol.io/specification/2026-07-28)
- Hou, X., Zhao, Y., Wang, S. & Wang, H. (2026). *Model Context Protocol (MCP): Landscape, Security Threats, and Future Research Directions*. ACM Transactions on Software Engineering and Methodology, makale 3796519. [Bağlantı](https://doi.org/10.1145/3796519)
- Guo, Z., Cheng, S., Wang, H., Liang, S., Qin, Y., Li, P., Liu, Z., Sun, M. & Liu, Y. (2024). *StableToolBench: Towards Stable Large-Scale Benchmarking on Tool Learning of Large Language Models*. Findings of ACL 2024, s. 11143–11156. [Bağlantı](https://aclanthology.org/2024.findings-acl.664/)
- Shen, Y., Song, K., Tan, X., Li, D., Lu, W. & Zhuang, Y. (2023). *HuggingGPT: Solving AI Tasks with ChatGPT and its Friends in Hugging Face*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/77c33e6a367922d003ff102ffb92b658-Abstract-Conference.html)
- Cai, T., Wang, X., Ma, T., Chen, X. & Zhou, D. (2024). *Large Language Models as Tool Makers*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=qV83K9d5WB)
- Du, Y., Wei, F. & Zhang, H. (2024). *AnyTool: Self-Reflective, Hierarchical Agents for Large-Scale API Calls*. ICML 2024, PMLR 235, s. 11812–11829. [Bağlantı](https://proceedings.mlr.press/v235/du24h.html)
- Chen, Y., Yoon, J., Sachan, D. S., Wang, Q., Cohen-Addad, V., Bateni, M., Lee, C.-Y. & Pfister, T. (2024). *Re-Invoke: Tool Invocation Rewriting for Zero-Shot Tool Retrieval*. Findings of EMNLP 2024, s. 4705–4726. [Bağlantı](https://aclanthology.org/2024.findings-emnlp.270/)
- Anthropic (2026). *Tool search tool*. Resmî belgelendirme. [Bağlantı](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)
- Wang, Z., Chang, Q., Patel, H., Biju, S., Wu, C.-E., Liu, Q., Ding, A., Rezazadeh, A., Shah, A., Bao, Y. & Siow, E. (2026). *MCP-Bench: Benchmarking Tool-Using LLM Agents with Complex Real-World Tasks via MCP Servers*. ICLR 2026. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2026/hash/9e4b14eb6f16fe7b5818a8d633a0606a-Abstract-Conference.html)
