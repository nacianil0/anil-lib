---
article_id: article_b16b4d33-25fb-4f40-a5b9-8f86caa89da5
title: "Ajan Mimarileri"
slug: ajan-mimarileri
category: agents-and-retrieval
level: intermediate
reading_order: 52
summary: "Kontrol döngüsünün karar kutusunun içini kurar: her adımda karar veren düzenle önce plan yazan düzenin aynı görevde neden aynı, başka görevde neden ters sonuç verdiğini; ayrıştırmanın gerektiğinde yapılmasını; başarısız bir bölümü okuyup sonrakine ders taşımanın kazancını ve hakem yanılınca nasıl zarar verdiğini; eylem ağacında aramanın kazancını ve dünyanın geri alınamazlığını; hata döngüsünün anatomisini, onu kıran dört dış sinyali ve döngünün ağırlıklara yazılmasını ölçümlerle anlatır."
tags:
  - ajan-mimarisi
  - plan-ve-yurutme
  - oz-yansima
  - eylem-agaci
  - hata-dongusu
content_hash: sha256:69446813eb8052ff8422f13caadf6145583773e99d2edb9d28d3ce9bfc614b50
classification_version: 1
classification_batch: 12
---
## Karar kutusunun içi

51\. makale bir kutuyu bilerek boş bıraktı. Şekil 1'deki döngüde pencere modele giriyor, modelden bir çağrı, bir mesaj ya da dur çıkıyordu; ama kutunun içinde bir sonraki eylemin nasıl üretildiğini söylemedik. Bir plan mı yazılıyor, yazılıyorsa ne zaman; bir eylem başarısız olunca geri mi dönülüyor; bölüm bitince ondan bir şey öğreniliyor mu? Ve 51'in son bulgusu bir soru olarak kaldı: tur sınırına takılan bölümlerin yüzde 90'ından fazlası aynı şeyi tekrar ediyordu — bu döngüyü tur sınırından başka ne kırar?

Bu makale karar kutusunun içini dört biçimde kuruyor ve her birini ölçüyor: her adımda yeniden karar veren düzen ile önce plan yazan düzen; ayrıştırmayı gerektiğinde yapan düzen; başarısız bölümü okuyup bir sonrakine ders taşıyan düzen; ve eylemleri bir ağaç gibi arayan düzen. Sonra hepsinin ortak düşmanına, **hata döngüsüne** (error loop), yani yeni bilgi üretmeden dönen döngüye bakıyor ve onu neyin kırdığını sayıyor. Kapanışta, bir mimarinin istemde değil ağırlıklarda yaşayabildiğini görüyoruz.

Bir çerçeve notu: 51'de Lei Wang ve arkadaşlarının derlemesinden alınan ayrım — plan geri bildirim almadan mı kuruluyor, alarak mı — bu makalenin ilk eksenidir; Sumers ve arkadaşlarının karar döngüsü — öner, değerlendir, seç, çalıştır — ikinci ekseni. Dört biçimin her biri bu iki eksende bir yerde duruyor.

## Her adımda karar vermek, önce plan yazmak

İki uç var. Birinci uçta 46'daki düşün–eyle–gözle düzeni: model her turda o ana kadarki her şeye bakıp bir sonraki tek eylemi yazar; plan diye ayrı bir şey yoktur, plan düşünce satırlarının içinde örtük durur. İkinci uçta **önce plan, sonra yürütme** (plan-and-execute): model görevi başta alt adımlara böler, sonra her alt adımı sırayla yürütür. 51'de Huang ve arkadaşlarının ölçtüğü şey ikinci ucun en saf hâliydi — plan bir kez yazılıyor, hiç geri bildirim almıyor — ve yürütülebilirlik yüzde 8'de kalıyordu.

Archiki Prasad ve arkadaşlarının NAACL 2024 bulguları programında sunduğu çalışma iki ucu aynı modelle, aynı görevlerde ölçtü ve tablo öğretici. 51'deki ev işleri ortamında iki düzen de görevlerin yüzde 43,3'ünü çözüyor; aynı sayı. Alışveriş ortamında her adımda karar veren düzen yüzde 32, önce plan yazan yüzde 17. Yazarların kurduğu üçüncü ortamda — bir sanal dünyada tarif ağaçlarını izleyerek eşya yapmak, her eşya başka eşyalar gerektiriyor — sıra tersine dönüyor: 19'a karşı 27. Aynı iki mimari, üç görevde üç farklı sıralama.

Fark, planın ihtiyaç duyduğu bilginin eyleme geçmeden önce görünür olup olmamasında. Tarif ağacı baştan bilinir; "tahta kılıç için önce tahta, sonra çubuk" planı yazılabilir ve plan doğrudur. Alışverişte hangi ürünlerin listeleneceği aranmadan bilinmez; baştan yazılan plan, henüz görülmemiş bir liste hakkında karar verir ve 51'in kısmi gözlenebilirliğine çarpar. Ev işlerinde iki etki birbirini götürüyor: nesnenin nerede olduğu bilinmez ama görev yapısı — bul, al, götür, koy — bilinir.

Yazarların önerdiği düzen iki ucu birleştiriyor ve adı yapısını anlatıyor: **gerektiğinde ayrıştırma** (as-needed decomposition). Önce görev olduğu gibi her adımda karar veren düzene verilir; başarısız olursa bir planlayıcı görevi alt görevlere böler ve her alt görev yeniden aynı döngüye girer; o da başarısız olursa bir daha bölünür, en çok üç ya da dört kat derine. Ayrıştırma bir tasarım kararı değil, bir başarısızlık cevabıdır. Sonuç Şekil 2'de: ev işlerinde 71,6, alışverişte 44, tarif ortamında 52. Yazarların en öğretici ölçümü yürütenin yeteneğinde: aynı düzen, yalnızca temel becerilerle istemlenmiş zayıf bir yürütücünün ev işlerindeki başarısını yüzde 3,3'ten 41,7'ye çıkarıyor; ve bölme, tanım gereği yürütenin başaramadığı yerde devreye girdiği için, zayıf yürütücüde daha sık, güçlüde daha seyrek çalışıyor. Planın derinliği görevin değil, yürütenin yeteneğinin bir fonksiyonu.

![Üç bölmeli şema. Sol bölme her adımda karar veren düzeni gösterir: gözlem kutusundan modele, modelden tek bir eylem kutusuna, oradan çevreye ve yeni gözlemle modele dönen küçük bir çevrim; altında planın düşünce satırlarında örtük olduğu yazar. Orta bölme önce plan yazan düzeni gösterir: en üstte plan kutusu, altında sırayla üç adım kutusu ve her adımdan çevreye giden oklar; adımlardan plana geri dönen ok yoktur ve altında planın bir kez yazıldığı belirtilir. Sağ bölme gerektiğinde ayrıştırmayı gösterir: görev kutusundan dene kutusuna, oradan başarılı dalı bitti kutusuna, başarısız dalı böl kutusuna gider; böl kutusundan iki alt görev kutusu çıkar ve her biri yeniden dene kutusuna bağlanır; en çok üç ya da dört kat yazılıdır. Şeklin altında ayrıştırmanın bir tasarım kararı değil bir başarısızlık cevabı olduğu yazılıdır.](assets/uc-dongu-bicimi.svg "Şekil 1 — Aynı döngü, üç karar biçimi")

Şekil 2 beş düzeni üç ortamda yan yana koyuyor. Sıralamanın ortamdan ortama değiştiğine ve ayrıştırmanın üçünde de en üstte durduğuna dikkat; en büyük kazanç tarif ortamında, 19'dan 52'ye.

![Üç gruplu yatay çubuk şeması; gruplar ev işleri, alışveriş ve tarif ortamıdır. Her grupta beş satır vardır: her adımda karar, önce plan sonra yürütme, yeniden deneme, yansımalı yeniden deneme ve gerektiğinde ayrıştırma; solda düzenin adı, ortada çubuk, sağda başarı yüzdesi. Ev işlerinde değerler sırasıyla 43,3, 43,3, 47,8, 57,5 ve 71,6; alışverişte 32, 17, 30, 35 ve 44; tarif ortamında 19, 27, 15, 32 ve 52. Ayrıştırma satırlarının çubukları vurgulu renktedir. Şeklin altında değerlerin başarı yüzdesi olduğu ve beş düzenin de aynı modelle çalıştığı yazılıdır.](assets/gerektiginde-ayristirma.svg "Şekil 2 — Aynı model, beş düzen, üç ortam")

> **Kendini yokla:** Önce plan yazan düzen ev işlerinde her adımda karar verenle aynı puanı alırken alışverişte neden yarısını, tarif ortamında neden fazlasını alıyor?

Çünkü planın işe yaraması, plan için gereken bilginin eylemden önce görünür olmasına bağlı. Tarif ağacı baştan bilinir ve plan doğru çıkar; ürün listesi aranmadan bilinmez ve plan görülmemiş bir liste hakkında karar verir. Ev işlerinde görev yapısı bilinir, nesnenin yeri bilinmez; iki etki birbirini götürür. Mimari seçimi görevin gözlenebilirliğine bağlıdır, ve gerektiğinde ayrıştırma bu seçimi baştan yapmak yerine başarısızlığa bırakır.

## Bölüm bitince ders çıkarmak

Şimdiye kadarki düzenler bir bölümün içinde çalışıyordu. Noah Shinn ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma bölümler arasına bakıyor: bir deneme başarısız olduysa, ikinci deneme birinciden ne öğrenebilir?

Düzen üç parçalı. Bir **eyleyen** (actor), 46'daki düşün–eyle–gözle döngüsüyle bölümü oynar. Bir **değerlendirici** (evaluator) bölümün başarılı olup olmadığını söyler; ev işlerinde bu, bir kural — aynı eylem aynı gözlemle üçten fazla tekrarlandıysa ya da eylem sayısı 30'u geçtiyse bölüm başarısız sayılır — ya da bir dil modeli. Bölüm başarısızsa üçüncü parça, bir **öz-yansıma** (self-reflection) modeli, bölümün izini okuyup birkaç cümlelik sözel bir ders yazar: "şişeyi aldığımı sandım ama almamıştım; bir dahaki sefere almayı gözlemle doğrula." Bu ders bir belleğe yazılır — en çok son üç ders tutulur — ve bir sonraki denemede istemin başına konur. 39\. makaledeki yansıma, kayıtları okuyup üst düzey bir çıkarım yazmaktı; buradaki yansıma aynı ailedendir, girdisi bir başarısız bölüm, çıktısı bir sonraki bölümün istemine giren bir uyarıdır. Ağırlıklara dokunulmaz; 37'deki pekiştirmeli öğrenmenin ödülü bir sayı değil, bir cümledir.

Ölçüm iki yüzlü ve iki yüzü de öğretici. Ev işlerinde 134 görevin 130'u on iki denemenin sonunda çözülüyor; yalnızca yeniden deneyen — dersi olmayan — düzen altıncı ve yedinci denemeden sonra ilerlemeyi bırakıyor ve görevlerin yüzde 22'sinde aynı hatada kalıyor: model bir nesneyi aldığını sanıp almamış, uzun bir iz boyunca o yanlış inançla yürümüş. Yansımanın yaptığı şey uzun ve başarısız bir izi tek bir cümleye damıtmak; bir sonraki bölüm o cümleyi görüyor ve aynı yere düşmüyor. Prasad ve arkadaşlarının tablosunda da aynı ayrım var: dersi olmayan yeniden deneme ev işlerinde 47,8, dersli yeniden deneme 57,5.

Öbür yüz, kod üretiminde. Kendi ürettiği birim testlerle kendini değerlendiren bir düzen, bir Python kümesinde ilk denemedeki başarıyı 80,1'den 91,0'a çıkarıyor; ama bir başka Python kümesinde 80,1'den 77,1'e **düşürüyor**. Sebep hakemde: ikinci kümede modelin yazdığı testlerin yüzde 16,3'ü yanlış bir çözümü doğru sayıyor, birinci kümede yüzde 1,4'ü. Yanlış bir "başarısız" sinyali alan yansıma, doğru bir çözümü bozuyor. 35\. makalede öz-düzeltmenin dış geri bildirimsiz çalışmadığını görmüştük; burada bir ek var: geri bildirim var ama yanlışsa, yansıma yanlışı büyütür. Yazarların en zor elli soruda yaptığı ablasyon bunu tamamlıyor: test üretimi kaldırılıp yalnızca yansıma bırakılınca başarı 60'tan 52'ye düşüyor — model hangi çözümün doğru olduğunu bilmeden yansıma yazınca zararlı düzenlemeler yapıyor; yansıma kaldırılıp yalnızca test bırakılınca 60'ta kalıyor; ikisi birlikte 68.

Bir sınır daha, başka bir çalışmadan geliyor ve sonraki bölümün kapısını açıyor: alışveriş ortamında yansımalı yeniden deneme, otuz denemenin en iyisini seçmekten neredeyse farksız — yüzde 35'e karşı 32 — çünkü yazılan dersler genel kalıyor ve ajan aynı yerel çukurda dönüyor. Ders yazmak, dersin doğru olmasını garanti etmez.

> **Kendini yokla:** Aynı yansıma düzeni bir kod kümesinde on puan kazandırıp öbüründe üç puan kaybettiriyor. Fark modelde mi, hakemde mi?

Hakemde. İki kümede de model ve yansıma aynı; değişen, modelin kendi yazdığı testlerin yanlış çözümü geçirme oranı — yüzde 1,4'e karşı 16,3. Yansıma, hakemin sinyalini büyüten bir kaldıraçtır: sinyal doğruysa kazancı, yanlışsa zararı büyütür. 35'teki doğrulayıcı disiplini burada bir mimari kural olarak geri dönüyor: yansımadan önce hakemi ölç.

## Eylemleri ağaç gibi aramak

36\. makalede ağaç aramasını düşünce adımları üzerinde kurmuştuk; 47'de geri almalı bir karar ağacı araç çağrılarını 35,3'ten 63,8'e taşımıştı. Andy Zhou ve arkadaşlarının ICML 2024'te sunduğu çalışma aynı fikri ajan döngüsünün bütününe uyguluyor: ağacın her düğümü çevrenin bir durumu, her kenarı bir eylem.

Mekanizma 36'nın makinesiyle aynı, iki ek parçayla. Bir düğümden model birkaç aday eylem önerir — çalışmada beş —; her aday çevrede çalıştırılır ve gözlem alınır; yeni düğüm, hem çevrenin verdiği sonuçla hem modelin "buradan sonrası ne kadar iyi" diye yazdığı bir değerle puanlanır — 37'deki değer işlevinin dil modeliyle kestirilmiş hâli —; puan yukarı doğru yayılır ve arama en umut verici dalı seçer. Ek parçaların ilki bu: değerlendirme yalnızca modelden değil, çevreden de gelir. İkincisi, başarısız bir yaprağa varılınca bir önceki bölümdeki yansıma yazılır ve ağacın geri kalanına taşınır.

Sonuçlar üç ortamda ve karşılaştırma düzeni yerinde. Çok adımlı soru cevaplamada tam eşleşme: düşün–eyle–gözle 0,32; aynı düzenin otuz denemeden en iyisi 0,38; yansımalı yeniden deneme 0,51; ağaç araması 0,63. Kod üretiminde en güçlü modelle 92,7 — yansımalı düzenin 91,0'ının ve tek denemenin 80,1'inin üstünde. Alışverişte puan 75,9 ve tam başarı yüzde 38,0; yansımalı düzen 64,2 ve 35,0; 51'deki taklit ve pekiştirmeli öğrenmeyle eğitilmiş ajan 62,4 ve 28,7. Ağaç, eğitilmiş ajanı istemle geçiyor.

Bedeli iki kalem. Birincisi 33 ve 36'dan tanıdık: elli yola varan deneme sayısı, her denemede kendi ön dolumu ve üretimiyle. İkincisi yeni ve ajanlara özgü: ağaç, bir düğüme geri dönebilmeyi varsayar. Soru cevaplamada bir arama sorgusu geri alınabilir; bir kod yorumlayıcısı yeniden başlatılabilir; alışveriş ortamında sepet sıfırlanabilir. Ama gönderilmiş bir e-posta, çalıştırılmış bir ödeme, silinmiş bir dosya geri alınamaz. 47'deki geri almalı ağaç yalnızca okuma çağrıları üzerinde çalışıyordu; ağaç araması dünyayı değiştiren eylemlerde ancak bir kum havuzunda — 48'deki yorumlayıcı, bir simülasyon, bir kopya — kurulabilir. Aramanın kazancı, dünyanın geri alınabilirliğiyle sınırlıdır.

> **Kendini yokla:** Eylem ağacı araması soru cevaplamada ve kodda çalışıyor; bir e-posta ajanında neden aynı biçimde kurulamaz?

Çünkü arama, bir düğüme dönüp başka bir dalı denemeyi varsayar ve bu, eylemin geri alınabilir olmasını gerektirir. Arama sorgusu ve program çalıştırma dünyayı değiştirmez; e-posta gönderme değiştirir. Geri alınamayan eylemlerde ağaç ancak bir kum havuzunda ya da yalnızca okuma eylemleri üzerinde kurulur; 47'deki geri almalı ağacın okuma çağrılarıyla sınırlı olmasının sebebi buydu.

## Hata döngüsünün anatomisi

Şimdi ortak düşmana bakalım. 51'de mekanizmayı görmüştük: politika pencerenin fonksiyonudur, pencere değişmiyorsa eylem de değişmez. Bu makalenin ölçümleri döngünün üç kılığını gösterdi ve her birinin bir dış sinyalle kırıldığını.

Birinci kılık, tekrar: aynı eylem, aynı gözlem. Bunu kıran en ucuz şey bir sayaçtır — Shinn ve arkadaşlarının "üçten fazla tekrar ya da otuz eylem" kuralı — ve 51'deki tur sınırı bunun kaba hâlidir. Sayaç döngüyü fark eder ama nedenini söylemez; yeniden deneme, dersi olmayan hâliyle, yalnızca zarı yeniden atar.

İkinci kılık, yanlış inanç: model bir şeyin olduğunu sanır ve o inançla uzun bir iz yürür. Bunu kıran şey bir gözlemdir, ve gözlem modelin dışından gelmek zorundadır. Zhibin Gou ve arkadaşlarının ICLR 2024'te sunduğu çalışma bunu doğrudan ölçtü: model kendi cevabını bir araçla — bir arama motoru, bir kod yorumlayıcısı — sınayıp düzeltince çok adımlı soru cevaplamada tam eşleşme 33,7'den 38,7'ye çıkıyor; aynı düzeltme döngüsü araç olmadan, yani model kendi cevabını kendi okuyup düzeltince 34,9'da kalıyor. Okul matematiğinde yorumlayıcı geri bildirimli düzeltme 70 milyarlık bir açık modelde 59,3'ü 62,3'e taşıyor; yorumlayıcı geri bildirimi kaldırılınca bir ticari modelde aynı düzeltme döngüsü 70,1'i 68,3'e **düşürüyor**. 35\. makalenin cümlesi ajan döngüsünde bir mimari ilke oluyor: döngüye giren geri bildirim dışarıdan gelmiyorsa, döngü yalnızca kendi hatasını yeniden okur.

Üçüncü kılık daha sinsi: ilerleme var ama görünmüyor, ya da yok ama görünüyor. 48'deki kod onarım ajanında bir düzenleme denemesi yüzde 90,5 olasılıkla sonunda başarıyordu; bir başarısız düzenlemeden sonra bu oran 57,2'ye düşüyor ve ajan bunu görmeden düzenlemeye devam ediyordu. Chang Ma ve arkadaşlarının NeurIPS 2024 veri kümeleri ve ölçütler programında sunduğu çalışma bunu ölçülebilir kılan bir cetvel kuruyor: **ilerleme oranı** (progress rate), görevin alt hedeflerinden o ana kadar karşılananların payı, her turda yeniden hesaplanan sıfırla bir arasında bir sayı. Ölçünün insanla uyumu dokuz ortamda 0,95'in üstünde. Ve tablo, 51'deki başarı oranının gizlediği şeyi gösteriyor: en güçlü modelin ortalama ilerleme oranı 70,0, başarı oranı 47,9; gerçek web sitelerinde 39,4'e karşı 15,1. Ajan çoğu görevde bir yere kadar geliyor ve orada kalıyor. Zaman ekseninde de görünüyor: en güçlü iki model ev işleri ve planlama görevlerinde otuz adım boyunca ilerlerken, web ve araç görevlerinde erken tepe yapıp duruyor; açık ağırlıklı modellerin çoğu altıncı adımdan sonra hiç ilerlemiyor. Bir ilerleme ölçüsü olmadan bu iki durum — hâlâ ilerleyen döngü ile takılmış döngü — dışarıdan aynı görünür.

![Ortasında kapalı bir çevrim olan şema: aynı pencere kutusundan aynı düşünce kutusuna, oradan aynı eylem kutusuna, oradan aynı gözlem kutusuna ve yeniden aynı pencere kutusuna dönen dört oklu bir halka; halkanın içinde yeni bilgi yok yazar. Halkadan dışarı dört ok çıkar ve her biri bir kutuya varır: tekrar sayacı ya da tur sınırı kutusunda üçten çok tekrar ya da otuz eylem yazar; dış gözlem kutusunda test, yorumlayıcı ve arama yazar; bölüm sonu dersi kutusunda başarısız izden bir cümle yazar; ilerleme ölçüsü kutusunda karşılanan alt hedef payı yazar. Şeklin altında dört çıkışın da modelin dışından geldiği ve döngünün kendi içinden çıkamadığı belirtilir.](assets/hata-dongusunun-cikislari.svg "Şekil 3 — Döngüyü içeriden kıran bir şey yok; dört çıkış da dışarıdan")

Şekil 3'ün dört çıkışının ortak özelliği, hepsinin modelin dışından gelmesi. 40\. makalede toparlanma olasılığının aynı kestiricinin içinden büyütülemeyeceğini kurmuştuk; bu makale o cümlenin mimari karşılığını verdi: sayaç, gözlem, ders ve ilerleme ölçüsü, dördü de döngünün dışına konmuş birer sensördür. Mimari tasarlamak, büyük ölçüde bu sensörleri nereye koyacağına karar vermektir.

## Döngüyü ağırlıklara yazmak

Şimdiye kadarki her mimari istemle kuruldu: model sabit, döngü kodda ve istemde. Üç çalışma, döngünün bir parçasını modelin kendisine ya da ajanın kalıcı belleğine taşıyor.

Birincisi, dersleri bir kütüphaneye biriktirir. Guanzhi Wang ve arkadaşlarının Transactions on Machine Learning Research'te 2024'te yayımlanan çalışması, açık dünyalı bir oyunda hedefleri kendisi öneren, her hedef için 48'deki gibi kod yazan ve kodu çevre geri bildirimi, çalışma hataları ve kendi doğrulamasıyla düzelten bir ajan kuruyor; çalışan her program bir **beceri kütüphanesine** (skill library) yazılıyor ve sonraki hedeflerde 29'daki anlamsal aramayla geri getiriliyor — Sumers ve arkadaşlarının yordamsal belleği, kod olarak. Yüz altmış istem turunda 63 farklı eşya keşfediyor, karşılaştırıldığı düzenlerin 3,3 katı; alet ağacının tahta düzeyine 6 turda çıkıyor, düşün–eyle–gözle ve yansımalı düzen o düzeye hiç çıkamıyor. Kütüphane kaldırılınca ajan geç evrede duraklıyor; hedefleri kendisi önermesi kaldırılıp rastgele hedef verilince keşfedilen eşya sayısı yüzde 93 düşüyor. Dersler cümle değil, çağrılabilir kod olarak birikince döngü kendi üstüne binebiliyor.

İkincisi, döngünün pahalı parçasını ucuz bir modele verir. Bill Yuchen Lin ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma iki modül kuruyor: küçük bir model — bir kâhin ajanın izleriyle eğitilmiş, 12'deki denetimli ince ayar — sıradan adımları hızlı ve ucuz atıyor; büyük model yalnızca küçük olan takıldığında, bir hata geldiğinde ya da bir alt hedef bittiğinde çağrılıyor ve tek bir eylem yerine birkaç adımlık bir plan veriyor. Bir fen deneyleri ortamında ortalama puan 84,7; düşün–eyle–gözle 36,4; yansımalı düzen 45,3. Ve fatura: eylem başına 757 token'a karşı düşün–eyle–gözlede 1.971, yansımalı düzende 2.983. 28\. makaledeki muhasebe burada mimarinin kendisine yazılmış: büyük modeli her adımda değil, gerektiğinde çağırmak.

Üçüncüsü, döngünün ürettiği başarısızlıkları eğitim verisine çevirir. Yifan Song ve arkadaşlarının ACL 2024'te sunduğu çalışma, önce 7 milyarlık bir modeli uzman izleriyle ince ayarlıyor, sonra ajanı çevrede koşturup başarısız izlerini topluyor ve her başarısız izi aynı görevin uzman iziyle eşleştirip 13\. makaledeki doğrudan tercih optimizasyonuyla eğitiyor: başarılı iz tercih edilen, başarısız iz edilmeyen. Üç ortamda ortalama ödül: alışverişte 63,1'den 67,4'e, fen ortamının görülmemiş görevlerinde 53,0'dan 65,0'a, ev işlerinin görülmemiş görevlerinde 67,2'den 72,4'e. Karşılaştırma öğretici: aynı veriyle 37'deki yakınsal politika optimizasyonu, ev işlerinde 22,1 ile ince ayarın altına düşüyor. Yazarların yorumu, pekiştirmeli öğrenme optimizasyonunun kararsızlığı; en çok da ödülün yalnızca sonda ve ikili olduğu ev işlerinde. Döngüde öğrenilen şey burada istem değil, ağırlık; ve öğrenilen şey mimarinin kendisi: "bunu denedim, olmadı" bilgisi.

## Mimarinin disiplini

**Plan, gerektirdiği bilgi görünürse işe yarar.** Tarif ağacı baştan bilinirse plan kazandırır; ürün listesi aranmadan bilinmezse plan görülmemiş şey hakkında karar verir. Mimari seçimi görevin gözlenebilirliğine bağlıdır.

**Ayrıştırmayı başarısızlığa bırak.** Gerektiğinde ayrıştırma, bölme derinliğini yürütenin yeteneğine göre ayarlar; güçlü modelle az böler, zayıfla çok.

**Ders, hakem kadar iyidir.** Başarısız bir bölümü okuyup bir sonrakine cümle taşımak, sinyal doğruysa on puan kazandırır; hakem yanlış çözümü geçiriyorsa aynı düzen puan kaybettirir. Yansımadan önce hakemi ölç.

**Ağaç, geri alınabilir dünyada çalışır.** Eylem ağacı araması istemle eğitilmiş ajanı geçer; ama bir düğüme dönebilmeyi varsayar. Geri alınamayan eylemlerde ancak kum havuzunda ya da yalnızca okuma çağrılarında kurulur.

**Hata döngüsü içeriden kırılmaz.** Sayaç, dış gözlem, bölüm sonu dersi ve ilerleme ölçüsü — dördü de modelin dışında birer sensördür. Araçsız öz-düzeltme kazandırmaz; yorumlayıcısız düzeltme puan düşürebilir.

**İlerlemeyi ölç, yalnızca sonucu değil.** Başarı oranı takılmış döngü ile hâlâ ilerleyen döngüyü ayırt etmez; ilerleme oranı eder. En güçlü model görevlerin yarısında bir yere kadar gelip duruyor.

**Döngü ağırlıklara yazılabilir.** Dersler kod olarak birikebilir, pahalı model gerektiğinde çağrılabilir, başarısız izler tercih çiftine dönüşebilir. Mimari yalnızca istemde değil, modelin içinde de yaşar.

### Sırada ne var

Bu makalede döngünün içinde tek bir karar verici vardı ve ikinci model girdiğinde bile — hızlı modülün yanındaki yavaş modül, dersi yazan yansıma modeli — iş bölümü sabitti. Peki ya döngüde birden çok ajan olursa: biri planlayıp öbürü yürütse, ikisi aynı soruya ayrı cevap verip tartışsa, bir orkestra şefi işi parçalara bölüp dağıtsa? Bir sonraki makale çoklu ajan sistemlerine bakıyor: rol vermenin ve konuşturmanın ölçülen kazancı, tartışmanın 36'daki oylamadan ne zaman farklı olduğu, ve iki ajanın bir ajandan pahalı olmasının ötesinde nerede başarısız olduğu.

## Kaynakça

- Prasad, A., Koller, A., Hartmann, M., Clark, P., Sabharwal, A., Bansal, M. & Khot, T. (2024). *ADaPT: As-Needed Decomposition and Planning with Language Models*. Findings of NAACL 2024. [Bağlantı](https://aclanthology.org/2024.findings-naacl.264/)
- Shinn, N., Cassano, F., Berman, E., Gopinath, A., Narasimhan, K. & Yao, S. (2023). *Reflexion: Language Agents with Verbal Reinforcement Learning*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html)
- Zhou, A., Yan, K., Shlapentokh-Rothman, M., Wang, H. & Wang, Y.-X. (2024). *Language Agent Tree Search Unifies Reasoning, Acting, and Planning in Language Models*. ICML 2024, PMLR 235. [Bağlantı](https://proceedings.mlr.press/v235/zhou24r.html)
- Gou, Z., Shao, Z., Gong, Y., Shen, Y., Yang, Y., Duan, N. & Chen, W. (2024). *CRITIC: Large Language Models Can Self-Correct with Tool-Interactive Critiquing*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=Sx038qxjek)
- Ma, C., Zhang, J., Zhu, Z., Yang, C., Yang, Y., Jin, Y., Lan, Z., Kong, L. & He, J. (2024). *AgentBoard: An Analytical Evaluation Board of Multi-turn LLM Agents*. NeurIPS 2024 Datasets and Benchmarks Track. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/877b40688e330a0e2a3fc24084208dfa-Abstract-Datasets_and_Benchmarks_Track.html)
- Wang, G., Xie, Y., Jiang, Y., Mandlekar, A., Xiao, C., Zhu, Y., Fan, L. & Anandkumar, A. (2024). *Voyager: An Open-Ended Embodied Agent with Large Language Models*. Transactions on Machine Learning Research. [Bağlantı](https://openreview.net/forum?id=ehfRiF0R3a)
- Lin, B. Y., Fu, Y., Yang, K., Brahman, F., Huang, S., Bhagavatula, C., Ammanabrolu, P., Choi, Y. & Ren, X. (2023). *SwiftSage: A Generative Agent with Fast and Slow Thinking for Complex Interactive Tasks*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/4b0eea69deea512c9e2c469187643dc2-Abstract-Conference.html)
- Song, Y., Yin, D., Yue, X., Huang, J., Li, S. & Lin, B. Y. (2024). *Trial and Error: Exploration-Based Trajectory Optimization of LLM Agents*. ACL 2024. [Bağlantı](https://aclanthology.org/2024.acl-long.409/)
