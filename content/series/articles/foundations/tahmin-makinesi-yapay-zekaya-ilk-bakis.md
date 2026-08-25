---
article_id: article_0d9a4d5a-7ca8-4d11-b60a-74f25dce3f86
title: "Tahmin Makinesi: Yapay Zekâya İlk Bakış"
slug: tahmin-makinesi-yapay-zekaya-ilk-bakis
category: foundations
level: beginner
reading_order: 1
summary: "Kural yazmakla veriden öğrenmek arasındaki farkı kurar; modelin ayarlanabilir bir fonksiyon olduğunu ve yapay zekâ, makine öğrenmesi, temsil öğrenimi ile derin öğrenmenin nasıl iç içe geçtiğini gösterir."
tags:
  - yapay-zeka
  - makine-ogrenmesi
  - model
  - tahmin
  - temeller
content_hash: sha256:e8ee32f82479afb89f9d6b47f220dc11c17be4122799495db8c8d742ccb0ec01
classification_version: 1
classification_batch: 0
---
## Kuralları yazmayı bir dene

Senden bir program yazman isteniyor: gelen her e-postayı "spam" ya da "spam değil" diye ayıracak. Kod yazmayı bilmesen de olur; kuralları düz Türkçe söylemen yeterli, çünkü bilgisayar dediğimiz şey sonuçta verdiğin kuralları harfiyen uygulayan bir makinedir.

İlk kural kendiliğinden gelir: iletide "bedava" kelimesi geçiyorsa spam. Birkaç saat içinde bu kural sana ihanet eder. Bir iş arkadaşın "yarınki eğitim bedava mı?" diye yazar ve iletisi çöp kutusuna düşer. Kuralı daraltırsın: "bedava" ve "hemen tıkla" birlikte geçiyorsa spam. Bu sefer karşı taraf uyum sağlar — "b3dava", "BEDAVA!!!", "bedаva" (içindeki bir harf Kiril alfabesinden). Her kaçamak için yeni bir kural yazarsın. Sonra ünlem işaretlerini saymaya başlarsın, ama sevincini paylaşan bir arkadaşın da üç ünlem kullanır. Gönderen adresi tanıdık değilse şüphelen dersin, ama tanımadığın bankandan gelen gerçek uyarı da spam olur. Altı ay sonra elinde binlerce kural, kuralların birbirini iptal ettiği yüzlerce istisna ve her hafta yeniden yazılması gereken bir liste kalır.

Buradaki başarısızlık senin beceriksizliğin değil. Sorun şu: "spam" diye bir şeyin ne olduğunu biliyorsun ama tarifini yazamıyorsun. Kural sayısı çok, kurallar bulanık ve kurallar zamanla değişiyor. Google'ın makine öğrenmesi (machine learning) başlangıç dersi aynı çıkmazı hava tahminiyle anlatır: yağmuru klasik yolla tahmin etmek için atmosferi modelleyip akışkanlar dinamiği denklemlerini çözmen gerekir; makine öğrenmesi yolunda ise sisteme onlarca yıllık geçmiş hava verisini verir ve örüntülerle sonuçlar arasındaki ilişkiyi kendisinin yakalamasını beklersin. İki yol arasındaki takas dürüstçe söylenmeli: fizik modeli *neden* yağdığını bilir, makine öğrenmesi modeli yalnızca genelde neyin neyi izlediğini bilir.

Bu seri tam buradan başlıyor. Yüz makale boyunca, bu ikinci yolun nereye kadar gittiğini adım adım kuracağız: ilk hesaplardan büyük dil modellerine (large language model), oradan ajanlara ve güvenlik tartışmalarına. Elinde tek bir zihinsel model olsun istiyorum ve bu makalenin bütün işi onu kurmak: **öğrenen sistem, örneklerden ayarlanan bir fonksiyondur.**

## İki ok, iki yön

Keras kütüphanesinin yaratıcısı François Chollet, *Deep Learning with Python* kitabının ilk bölümünde farkı iki basit şemaya indirger — bu, alanı öğretmenin bugün en yaygın yoludur ve boşuna değildir. Klasik programlamada insan kuralları yazar, program bu kuralları veriye uygular ve cevapları üretir: kurallar + veri → cevaplar. Makine öğrenmesinde yön tersine döner: insan hem veriyi hem cevapları verir, sistem kuralları üretir: veri + cevaplar → kurallar. Şekil 1'deki iki bant tam olarak bunu gösteriyor; alttaki bandın ikinci satırına dikkat et, çünkü asıl mesele orada: üretilen kural bir kez elde edildikten sonra, daha önce görülmemiş yeni bir girdiye uygulanır.

![Klasik programlama ile makine öğrenmesinin karşılaştırması: üstte kurallar ve veri programa girip cevapları üretir, altta veri ve cevaplar öğrenme adımına girip modeli üretir, model de yeni girdiye tahmin üretir](assets/kural-vs-ogrenme.svg "Şekil 1 — İki ok: kural yazmak ve veriden öğrenmek")

Bu ters çevirmenin ilk ciddi gösterimi 1959'da geldi. IBM'de çalışan Arthur Samuel, dama oynayan bir program yazdı; ama programın marifeti dama oynaması değil, oynadıkça iyileşmesiydi. Program kendi kendine oynayarak konum değerlendirmesini ayarlıyordu ve makalesinin bildirdiğine göre sekiz-on saatlik makine oyun süresi sonunda, kendisini yazan kişiden daha iyi oynar hâle geliyordu. Alana adını veren de Samuel'in bu çalışmasıdır. Onun kendi çerçevesi şuydu — makine öğrenmesi, bir bilgisayarı, aynı davranış insanlarda ya da hayvanlarda görülseydi "öğrenme" diyeceğimiz biçimde davranacak şekilde programlamaktır.

Burada bir uyarı borcum var. Türkçe kaynakların neredeyse tamamında Samuel'e atfedilen ve tırnak içinde verilen bir cümle dolaşır: bilgisayarlara açıkça programlanmadan öğrenme yeteneği kazandıran çalışma alanı. Bu cümlenin peşine düşenler, onu Samuel'in ne 1959 tarihli makalesinde ne de 1967'deki devamında bulabildiklerini bildiriyor; atıflar hep var olmayan bir sayfaya işaret ediyor. Bu tespiti yapan inceleme hakemli bir yayın değil, ama birincil kaynak taramasını yapmış olması ve hiçbir akademik kaynağın bu alıntıya sayfa numarası verememesi yeterince güçlü bir işaret. Dolayısıyla: fikir Samuel'indir, o cümle muhtemelen değildir. Serinin ilk sayfasında bunu söylememin sebebi, sonraki doksan dokuz makale boyunca aynı titizliği beklemen.

Samuel'in gösterdiği şeyin tanımı, Tom Mitchell'in 1997 tarihli ders kitabında keskinleşti — bu kitap makine öğrenmesini bir hileler koleksiyonu olmaktan çıkarıp kendi biçimselliği olan bir disipline dönüştürdü. Mitchell'in tanımı üç harfe dayanır: bir program, T görev sınıfında, P performans ölçüsüne göre ölçülen başarısını E deneyimiyle artırıyorsa öğreniyordur. Sözle söylersek: neyi yapacağını (T), ne kadar iyi yaptığını nasıl ölçtüğünü (P) ve neye bakarak iyileştiğini (E) söyleyemiyorsan, ortada "öğrenme" yoktur. Spam filtresine uygulayalım — T: gelen iletiyi spam/spam değil diye sınıflandırmak; P: doğru sınıflandırılan ileti oranı; E: geçmişte insanlar tarafından etiketlenmiş e-postalar. Samuel'in programı için ise T: dama oynamak; P: kazanılan oyunların oranı; E: kendi kendine oynanan oyunlar.

> **Kendini yokla:** Elinde insanlar tarafından "spam" ya da "spam değil" diye işaretlenmiş 20.000 e-posta var ve tek bir kural yazmadın. Şekil 1'deki iki oktan hangisindesin ve bu adımın çıktısı ne olur?

Alttaki oktasın: veri (e-postaların kendisi) ve cevaplar (insanların koyduğu etiketler) birlikte öğrenme adımına giriyor. Çıktı bir cevap değil, bir kuraldır — daha doğrusu kuralı taşıyan bir nesne, yani model. Cevaplar ancak ikinci adımda, o model yeni bir e-postayla karşılaştığında üretilir.

## "Tahmin" derken neyi kastediyoruz

Bu makalenin adı "Tahmin Makinesi" ve Türkçede tahmin kelimesi tehlikeli bir çağrışım taşıyor: geleceği kestirmek, bilmediğin bir şey hakkında atıp tutmak. Makine öğrenmesinde kelime bunların hiçbirini demek değil.

Makine öğrenmesinde **tahmin, daha önce görülmemiş bir girdiye karşılık çıktı üretmektir.** Zaman kavramı işin içinde yok. Bir fotoğrafa bakıp "bu bir kedi" demek tahmindir; fotoğraf dün çekilmiş olabilir, kedi otuz yıl önce ölmüş olabilir, hiç fark etmez. Yarım kalmış bir cümleyi tamamlamak tahmindir. Bir evin metrekaresine bakıp fiyatını söylemek tahmindir. Bir e-postaya "spam" demek tahmindir. Ortak nokta zaman değil, **görülmemişlik**: sistem, eğitildiği örneklerin arasında bulunmayan bir girdiyle karşılaşıyor ve buna rağmen bir çıktı üretmek zorunda.

> **Kendini yokla:** Bir modele arşivden çıkmış, 1974'te çekilmiş bir fotoğraf veriyoruz ve "bu bir kedi" cevabını alıyoruz. Gelecekle ilgili hiçbir şey söylenmedi. Buna neden yine de tahmin diyoruz?

Çünkü tahmini tahmin yapan şey, çıktının zamanı değil, girdinin yeniliğidir. Model o fotoğrafı eğitim sırasında görmedi; elindeki tek şey, gördüğü diğer fotoğraflardan çıkardığı kural. Bu kuralı yeni bir girdiye uygulayıp bir çıktı üretmesine tahmin diyoruz. Terimi bu anlamda sabitliyoruz ve seri boyunca hep bu anlamda kullanacağız.

Bunun keyfî bir tanım olmadığını görmek istersen, Avrupa Birliği'nin 2024 tarihli Yapay Zekâ Yasası'na bak. Bağlayıcı bir hukuk metni olarak yasa, yapay zekâ (artificial intelligence, AI) sisteminin ne olduğunu tanımlamak zorundaydı ve tanımın merkezine şunu koydu: aldığı girdiden, tahminler, içerik, öneriler ya da kararlar gibi çıktıları nasıl üreteceğini çıkarsayan makine tabanlı sistem. Yani "tahmin makinesi" ifadesi acemilere anlatmak için uydurulmuş bir benzetme değil; düzenleyicinin de merkeze koyduğu şey bu.

## Model dediğimiz şey: düğmeli bir kutu

Şekil 1'in alt bandındaki "Model" kutusunun içinde ne var? Türkçedeki "model" kelimesi yanıltıcı: ne bir manken, ne bir maket, ne de bir rol model. Kastedilen şey matematiksel modeldir.

En sade hâliyle bir modeli şöyle düşün: üstünde çok sayıda ayar düğmesi olan bir kutu. Soldan bir girdi giriyor, sağdan bir çıktı çıkıyor. Çıktının ne olacağını, kutunun içindeki devreyle birlikte düğmelerin konumu belirliyor. Düğmeleri çevirdikçe aynı girdi farklı çıktılar verir. "Eğitim" dediğimiz şey, elimizdeki örnekler üzerinde doğru cevabı verecek düğme konumlarını aramaktan ibarettir. Benzetmenin bozulduğu yer şurası: gerçek bir modelde düğmeler ne elle çevrilir ne de tek tek anlamlıdır — sayıları milyonlarca, bazen milyarlarcadır ve tek bir düğmenin "kediliği" ayarladığı falan yoktur. Benzetmenin biçimsel karşılığı şu: kutu, girdiyi çıktıya bağlayan bir fonksiyondur; düğmeler ise o fonksiyonun ayarlanabilir sayılarıdır — bu sayıların teknik adı parametredir ve onu 2. makalede ayrıntısıyla ele alacağız.

Google'ın makine öğrenmesi dersinin tanımı bu kutuyu güzelce şişkinliğinden arındırır: model, girdi örüntülerini çıktı değerlerine bağlayan sayılar topluluğudur. Fazlası iddia edilmiyor. Model bir zihin değil, bir niyet değil, bir anlayış değil; bir sayı yığını ve o sayıların tarif ettiği eşleme.

Bu eşlemenin akademik yazımı da en az o kadar sadedir. Andrew Ng'nin Stanford'daki CS229 ders notları denetimli öğrenmeyi (supervised learning) doğrudan böyle kurar: amaç, girdi uzayından çıktı uzayına giden ve her girdi için iyi bir çıktı üreten bir fonksiyon bulmaktır. Notların bir ayrıntısı özellikle değerli: bu fonksiyona tarihsel nedenlerle *hipotez* denir. Kelimenin kendisi doğru alçakgönüllülüğü taşıyor — bulduğumuz şey gerçeğin kendisi değil, gerçek hakkında bir öneri.

Burada iki kelimeyi daha yerine oturtalım, çünkü bundan sonra sürekli kullanacağız. Modeli örnekler üzerinde ayarlama sürecine **eğitim (training)**, eğitilmiş modeli yeni bir girdide çalıştırmaya **çıkarım (inference)** diyoruz. Şekil 1'in alt bandındaki iki satır tam olarak bu ikisidir.

Eğitimle çıkarım arasındaki ilişkiyi anlatmanın en iyi yolu, yine Google'ın dersinden ödünç aldığım bir benzetme: eski sınav sorularıyla çalışan bir öğrenci. Öğrenci geçmiş yılların sorularını ve cevaplarını çalışır, ama gireceği sınavda o sorular çıkmayacaktır. Çalışmanın bütün amacı, hiç görmediği sorulara cevap verebilmektir. Benzetmenin bozulduğu yer: öğrenci bir cevabın *neden* doğru olduğunu anlayabilir, model ise yalnızca hangi örüntünün hangi cevapla birlikte geldiğini kaydeder. Biçimsel karşılığı ise şu: eski sorular eğitim verisi, gerçek sınav görülmemiş girdi, alınan not da Mitchell'in P'sidir — ve cevap anahtarını ezberleyip sınavda çuvallayan öğrenci, 2. makalede adını koyacağımız bir hastalığın tam karşılığıdır.

## Aynı çerçeve, çok farklı çıktılar

Girdi–çıktı eşlemesi çerçevesinin gücü, ne kadar farklı işi aynı kalıba soktuğunda ortaya çıkıyor.

Çıktı sonlu bir etiket kümesinden seçiliyorsa buna sınıflandırma diyoruz: e-posta → {spam, spam değil}; fotoğraf → {kedi, köpek, kuş, …}; röntgen filmi → {bulgu var, bulgu yok}. Çıktı bir sayıysa iş yine aynıdır, yalnızca çıktı kümesi süreklidir: ev özellikleri → fiyat; hasta verileri → risk skoru.

İlginç olan üçüncü durum. Çıktı bir etiket ya da tek bir sayı değil de **bir sonraki parça** olduğunda ne olur? Bir cümlenin başını verip devamındaki kelimeyi tahmin etmeyi düşün: "Bugün hava çok ___". Bu da bir sınıflandırma problemidir — yalnızca etiket kümesi, modelin dağarcığındaki sonlu sayıda metin parçasıdır; bu parçalar çoğu zaman tam kelimeler değil, kelime parçalarıdır ve nasıl belirlendiklerini 4. makalede göreceğiz. Ama tahmini üretip cümleye ekler, sonra genişlemiş cümleyi tekrar girdi olarak verirsen, sistem yazmaya başlar. ChatGPT gibi sistemlerin ön eğitim hedefi, bütün gösterişine rağmen budur: sonraki parçayı tahmin etmek. Ham bir tahminciyi yardımcı bir asistana çeviren ek eğitim aşamaları da var; onlara serinin ilerleyen makalelerinde geleceğiz.

Bu iddiayı burada asılı bırakmıyorum, 5. makalede baştan sona kuracağız; ama iki not şimdiden yerine otursun. Birincisi: bu fikir yeni değil. Bilgi kuramının kurucusu Claude Shannon, 1951'de yayımlanan çalışmasında İngilizcenin ne kadar öngörülebilir olduğunu ölçmek için insan deneklere tam bu oyunu oynattı — önündeki metne bakıp bir sonraki harfi tahmin et. İkincisi: bu hedefi yeterince büyük ölçekte çalıştırmanın ne ürettiğini gösteren dönüm noktası, Tom Brown ve arkadaşlarının 2020'de yayımladığı GPT-3 çalışmasıdır. 175 milyar ayarlanabilir sayıyla eğitilen model, hiç özel olarak öğretilmediği işleri —çeviri, soru cevaplama, aritmetik— yalnızca bağlamına konan birkaç örnekle yapabiliyordu. Tek bir hedef: sonraki parçayı tahmin et.

## Kim kimin içinde

Şimdi haritayı çizelim, çünkü yapay zekâ, makine öğrenmesi ve derin öğrenme (deep learning) günlük dilde birbirinin yerine kullanılıyor ve bu kullanım yanlış.

Ian Goodfellow, Yoshua Bengio ve Aaron Courville'in 2016 tarihli *Deep Learning* kitabı — alanın standart lisansüstü ders kitabı, çevrimiçi ücretsiz — bu ilişkiyi iç içe halkalarla çizer. Şekil 2 o düzenin uyarlamasıdır ve internette dolaşan popüler versiyonlardan bir noktada ayrılır: ortadaki halkayı atlamaz.

![İç içe geçmiş beş halka: en dışta yapay zekâ, içinde makine öğrenmesi, onun içinde temsil öğrenimi, onun içinde derin öğrenme, en içte büyük dil modelleri; her halkada birer örnek teknoloji yazılıdır](assets/ai-ml-dl-llm.svg "Şekil 2 — Yapay zekâdan büyük dil modellerine iç içe halkalar")

En dıştaki halka **yapay zekâdır**: makinelerin, insanda zekâ saydığımız işleri yapmasını hedefleyen bütün çalışmalar. İçindeki halka **makine öğrenmesidir**: bu işi, kuralları veriden çıkararak yapan alt küme. Onun içindeki **temsil öğrenimi (representation learning)**, verinin işe yarar tarifini de elle tasarlamak yerine öğrenen yaklaşımdır — bir fotoğrafı ham piksel yığını olarak değil, görev için anlamlı özelliklerin diliyle ifade etmeyi kastediyorum; bu kavramı 3. makalede gerçek mekanizmasıyla kuracağız. Onun içindeki **derin öğrenme** ise temsili tek adımda değil, üst üste binen katmanlar boyunca kademe kademe kuran ailedir. "Derin" kelimesi derinlikli, bilgece ya da esrarengiz demek değil: hesabın katman sayısına, yani basit kavramların üzerine daha karmaşık kavramların inşa edildiği kademelerin derinliğine işaret ediyor.

Bu katmanlı temsil fikrinin alan tarafından yapılmış en yetkili özeti, Yann LeCun, Yoshua Bengio ve Geoffrey Hinton'ın 2015'te *Nature*'da yayımladığı derlemedir — üç yazar bu çalışmaları nedeniyle 2018 Turing Ödülü'nü paylaştı. Derlemenin kilit vurgusu şu: çok katmanlı modeller, veriyi birden fazla soyutlama düzeyinde temsil etmeyi öğrenir ve konuşma tanımadan görüntü tanımaya kadar bir dizi alandaki sıçramanın kaynağı budur. Şekil 2'nin en içindeki halka olan büyük dil modelleri de derin öğrenmenin dile uygulanmış hâlidir.

Şimdi dürüstlük notu: **her yapay zekâ makine öğrenmesi değildir.** Bir satranç motorunun arama algoritması, bir uçuş rezervasyon sisteminin kural motoru, klasik bilgi tabanları — bunların hepsi yapay zekâ başlığı altında çalışılmıştır ve hiçbiri veriden kural öğrenmez; kuralları insanlar yazmıştır. Şekil 2'deki en dış halkanın örneği bu yüzden "kural tabanlı sistemler". Bugün ilgi merkezindeki her şey en içteki halkalarda diye, dış halkanın var olmadığını düşünme.

> **Kendini yokla:** Bütün hamleleri insanların yazdığı kurallara ve aramaya dayanan bir satranç programı, Şekil 2'deki halkalardan hangisinin içinde, hangisinin dışındadır?

En dıştaki halkanın içinde, ikinci halkanın dışındadır: yapay zekâdır ama makine öğrenmesi değildir. Ölçüt performansı değil, kuralların nereden geldiği: bu programın kuralları veriden çıkarılmamış, insan tarafından yazılmıştır.

## Fikrin kısa tarihi

Veriden öğrenme fikri, alanın adından bile eskidir. Alan Turing'in 1950'de *Mind* dergisinde yayımladığı makale, "makineler düşünebilir mi?" sorusunu cevaplanamayacak kadar bulanık bulup yerine davranışa dayalı bir sınama koyduğu için ünlendi. Ama makalenin daha az bilinen son bölümleri bu serinin asıl konusudur: Turing, yetişkin bir zihni doğrudan programlamaya çalışmak yerine, basit bir "çocuk-makine" yapıp onu eğitmeyi öneriyordu. Doğal seçilime ve ödül-ceza yoluyla öğrenmeye açıkça atıf yapıyordu. Yani bu makalenin bütün öncülü, "yapay zekâ" terimi daha ortada yokken kâğıda dökülmüştü.

Terim beş yıl sonra geldi. 31 Ağustos 1955 tarihli bir öneri metniyle John McCarthy, Marvin Minsky, Nathaniel Rochester ve Claude Shannon, 1956 yazında Dartmouth College'da iki ay sürecek on kişilik bir çalışma önerdiler. Öneri alanın adını koydu ve kurucu iddiasını da yazdı: öğrenmenin her yönü ya da zekânın herhangi bir başka özelliği, ilke olarak bir makinenin benzetebileceği kadar kesin biçimde tarif edilebilir. Dikkat et — bu bir sonuç değil, bir varsayım. Yetmiş yıl sonra hâlâ kanıtlanmış değil.

Aradaki yetmiş yıl düz bir yükseliş de değildi. Alan, coşkulu vaatlerin ardından beklentilerin karşılanamadığı ve ilginin, parasal desteğin çekildiği dönemler yaşadı; bunlara sonradan "yapay zekâ kışları" dendi. Beklentinin gerçeği ne kadar aştığını ölçmenin en dürüst yolu, alanın kurucusunun kendi rakamına bakmak. Turing 1950'de, aşağı yukarı elli yıl içinde —yani 2000 yılına gelindiğinde— makinelerin taklit oyununu öyle iyi oynayacağını, ortalama bir sorgucunun beş dakikalık sorgulamadan sonra doğru teşhis şansının yüzde yetmişi geçmeyeceğini öngörmüştü. *Stanford Felsefe Ansiklopedisi*'nin Turing testi maddesi, bu öngörünün 2000 yılı geldiğinde yanlış çıktığını kaydeder. Alanın bugünkü canlılığı o tarihten çok sonra ve Turing'in tarif ettiğinden bambaşka bir yoldan —katmanlı öğrenmeyle— geldi; 2015'teki *Nature* derlemesi tam bu dönüşün alan tarafından yazılmış ilanıdır.

## Öğrenilen şey bir kuraldır, gerçeğin kendisi değil

Bu makalenin çerçevesi güçlü ama sınırsız değil ve sınırlarını en baştan bilmek, seriyi okurken seni kandırılmaktan koruyacak.

Birincisi: model gerçeği öğrenmez, *bir* kural öğrenir. David Wolpert'in 1996 tarihli çalışması bunu teorem hâline getirdi — bütün olası problemler üzerinden ortalama alındığında hiçbir öğrenme algoritması bir diğerinden üstün değildir. Pratikte öğrenmenin işe yaraması, gerçek dünya problemlerinin bütün olası problemler arasından rastgele seçilmemiş olmasından ve her algoritmanın gerçek dünya hakkında birtakım varsayımlar taşımasından kaynaklanır. Varsayımsız öğrenme yoktur.

İkincisi: yetenek pürüzlüdür. Stanford HAI'nin alanı her yıl sayılarla envanterleyen 2026 tarihli AI Index raporu —hakemli bir yayın değil, kurumsal bir durum raporu— bunun çarpıcı bir örneğini veriyor: matematik olimpiyatı düzeyindeki problemlerde altın madalya seviyesine çıkan modeller, analog saatteki zamanı yalnızca yüzde 50,1 doğrulukla okuyabiliyor. Bir işte olağanüstü olmak, ona yakın göründüğünü sandığın başka bir işte yeterli olmayı garanti etmiyor. Bu "pürüzlü sınır", modelleri değerlendirirken tek bir başarı haberinden genelleme yapmamak için iyi bir panzehir.

Üçüncüsü ve en tartışmalısı: mekanizmanın tahmin olması, olup bitenin *anlama* olup olmadığını çözmez. Emily Bender ve Alexander Koller'in 2020'de ACL konferansında ödül alan bildirisi, yalnızca dilin biçimiyle eğitilmiş bir sistemin ilke olarak anlamı öğrenemeyeceğini savunur. Melanie Mitchell ve David Krakauer'in 2023'te *PNAS*'ta yayımladığı derleme ise iki tarafın argümanlarını yan yana koyar ve tartışmanın açık olduğunu söyler. Bu makalenin dürüst pozisyonu şudur: *mekanik olarak* bu sistemler tahmin üretir; bunun anlama sayılıp sayılmayacağı, alanın ciddi biçimde tartıştığı açık bir sorudur ve serinin ilerleyen makalelerinde tarafların gerekçeleriyle karşılaşacaksın.

### Sırada ne var

Elimizde bir çerçeve var: girdiyi çıktıya bağlayan, üstünde ayar düğmeleri olan bir fonksiyon ve onu örneklerden ayarlama sözü. Ama "ayarlama" kelimesi şu ana kadar bir vaatten ibaretti. Milyonlarca düğmeyi hangi yöne, ne kadar çevireceğini makine nereden biliyor? Bir sonraki makalede bu sorunun tam cevabını kuracağız: yanlışlığı tek bir sayıya indiren kayıp fonksiyonu ve o sayıyı küçültmek için her düğmeye ayrı ayrı yön veren gradyan inişi.

## Kaynakça

- Google for Developers. *Machine Learning Crash Course — What is Machine Learning?*. Google. [Bağlantı](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml)
- Chollet, F. (2017). *Deep Learning with Python*. Manning. [Bağlantı](https://www.manning.com/books/deep-learning-with-python)
- Samuel, A. L. (1959). *Some Studies in Machine Learning Using the Game of Checkers*. IBM Journal of Research and Development. [Bağlantı](https://www.cs.virginia.edu/~evans/greatworks/samuel.pdf)
- "Source of Arthur Samuel's definition of machine learning" (2019). Blog incelemesi (hakemli değil). [Bağlantı](http://htydjtk.blogspot.com/2019/03/source-of-arthur-samuels-definition-of.html)
- Mitchell, T. M. (1997). *Machine Learning*. McGraw Hill. [Bağlantı](http://www.cs.cmu.edu/~tom/mlbook.html)
- Avrupa Birliği (2024). *Regulation (EU) 2024/1689 (Yapay Zekâ Yasası), Madde 3 — Tanımlar*. Avrupa Birliği Resmî Gazetesi. [Bağlantı](https://artificialintelligenceact.eu/article/3/)
- Google for Developers. *Machine Learning Crash Course — Supervised Learning*. Google. [Bağlantı](https://developers.google.com/machine-learning/intro-to-ml/supervised)
- Ng, A. & Ma, T. *CS229 Lecture Notes*. Stanford University. [Bağlantı](https://cs229.stanford.edu/main_notes.pdf)
- Shannon, C. E. (1951). *Prediction and Entropy of Printed English*. Bell System Technical Journal. [Bağlantı](https://www.princeton.edu/~wbialek/rome/refs/shannon_51.pdf)
- Brown, T. B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P. ve ark. (2020). *Language Models are Few-Shot Learners*. NeurIPS. [Bağlantı](https://proceedings.neurips.cc/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf)
- Goodfellow, I., Bengio, Y. & Courville, A. (2016). *Deep Learning*, 1. bölüm. MIT Press. [Bağlantı](https://www.deeplearningbook.org/contents/intro.html)
- LeCun, Y., Bengio, Y. & Hinton, G. (2015). *Deep Learning*. Nature. [Bağlantı](https://www.nature.com/articles/nature14539)
- Turing, A. M. (1950). *Computing Machinery and Intelligence*. Mind. [Bağlantı](https://courses.cs.umbc.edu/471/papers/turing.pdf)
- McCarthy, J., Minsky, M. L., Rochester, N. & Shannon, C. E. (2006 [1955]). *A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence*. AI Magazine. [Bağlantı](https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/1904)
- Stanford Encyclopedia of Philosophy. *The Turing Test*. Stanford University. [Bağlantı](https://plato.stanford.edu/entries/turing-test/)
- Wolpert, D. H. (1996). *The Lack of A Priori Distinctions Between Learning Algorithms*. Neural Computation. [Bağlantı](https://direct.mit.edu/neco/article/8/7/1341/6016/)
- Stanford HAI (2026). *The 2026 AI Index Report*. Stanford University. [Bağlantı](https://hai.stanford.edu/ai-index/2026-ai-index-report)
- Bender, E. M. & Koller, A. (2020). *Climbing towards NLU: On Meaning, Form, and Understanding in the Age of Data*. ACL. [Bağlantı](https://aclanthology.org/2020.acl-main.463/)
- Mitchell, M. & Krakauer, D. C. (2023). *The Debate Over Understanding in AI's Large Language Models*. PNAS. [Bağlantı](https://doi.org/10.1073/pnas.2215907120)
