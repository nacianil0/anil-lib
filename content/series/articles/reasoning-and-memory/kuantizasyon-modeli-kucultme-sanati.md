---
article_id: article_b7dd6202-b513-4d55-9e96-33cb155445eb
title: "Kuantizasyon: Modeli Küçültme Sanatı"
slug: kuantizasyon-modeli-kucultme-sanati
category: reasoning-and-memory
level: intermediate
reading_order: 27
summary: "Ağırlıkları daha kaba bir ızgaraya yuvarlamanın mekanizmasını kurar: tek bir aykırı değerin bütün bloğu nasıl çökerttiğini, akıllı yuvarlamanın en yakına yuvarlamadan neyi kurtardığını, dört bitin neden tatlı nokta olduğunu, kaybın nerede ölçülmesi gerektiğini ve fazla eğitilmiş modellerin kuantizasyona neden daha kırılgan olduğunu gösterir."
tags:
  - kuantizasyon
  - aykiri-deger
  - egitim-sonrasi-kuantizasyon
  - bit-genisligi
  - olcum-disiplini
content_hash: sha256:513d804f22775385c8fb99013edbfa577582b104031165f97e76881dd87dd210
classification_version: 1
classification_batch: 6
---
## Sayıları küçültmek

26\. makale bir teşhisle kapandı: çıkarımın darboğazı hesap değil bellek. Adım adım üretimde her token için ağırlıkların tamamı yavaş bellekten okunuyor, anahtar-değer önbelleği de aynı bellekten pay istiyor, ve çip beklemekle meşgul.

O teşhisin en doğrudan çaresi belli. Ağırlıklar 16 bitlik sayılarla saklanıyorsa, 8 bitle saklandığında taşınacak bayt yarıya, 4 bitle saklandığında çeyreğe iner. Bellekten kazanılan yer aynı karta daha çok kullanıcı sığdırır; taşınan baytın azalması doğrudan gecikmeye yansır.

19\. makalede bu fikrin adını koymuştuk: kuantizasyon, sayıları daha kaba bir ızgaraya yuvarlayarak bellekten kazanmak. QLoRA'nın donmuş taban modeli dört bite indirmesini orada görmüş, mekanizmayı buraya bırakmıştık. Şimdi üç soru: yuvarlama tam olarak neyi bozuyor, neden bazı sayılar bütün hesabı çökertiyor, ve "kuantize model neredeyse aynı" cümlesi hangi ölçümde doğru?

## Izgaranın kendisi

Bir ağırlık, 2\. makaleden beri bildiğimiz şey: bir sayı. 16 bitle saklandığında çok ince bir ızgara üzerinde duruyor. Onu 4 bite indirmek, elimizde yalnızca **on altı** farklı değer olduğu anlamına gelir; her ağırlık bu on altı değerden birine yuvarlanmak zorundadır.

Hangi on altı değer? Ağırlıklar sıfır etrafında toplandığı için doğal seçim, en büyük mutlak değere göre ölçeklemek. Sekiz ağırlıktan oluşan küçük bir küme alalım:

| Ağırlık | 0,42 | −0,17 | 0,05 | −0,63 | 0,21 | 0,08 | −0,02 | 0,31 |
|---|---|---|---|---|---|---|---|---|
| 4 bit sonrası | 0,45 | −0,18 | 0,09 | −0,63 | 0,18 | 0,09 | 0,00 | 0,27 |

En büyük mutlak değer 0,63. İşaretli dört bit −8 ile 7 arasını kodlar; simetrik yuvarlamada uçlardan biri kullanılmaz ve aralık −7 ile 7 olur — sekiz bitte de aynı gelenekle −127 ile 127 arası kullanılır. Buna göre ölçek çarpanı 7 ÷ 0,63 ≈ 11,11 ve ızgaranın adımı 0,63 ÷ 7 = 0,09. Her ağırlık bu adımın bir katına yuvarlanıyor: 0,42 × 11,11 = 4,67, en yakın tam sayı 5, geri çevrildiğinde 0,45. En büyük hata 0,04 civarında, yani kabaca ızgara adımının yarısı. Saklanan şey artık sekiz küçük tam sayı ve bir tane 16 bitlik **kuantizasyon sabiti** — buradaki 0,63.

Bu sabit bedava değil. Sabiti kaç ağırlığa bölüştürdüğün, kuantizasyonun ikinci ayarıdır: **blok** boyu. Tim Dettmers ve Luke Zettlemoyer'in hesabı basit — 16 bitlik bir sabit 64 ağırlıkta bir yazılıyorsa, parametre başına 16 ÷ 64 = 0,25 bit ek maliyet demektir. Blok küçüldükçe ızgara her bölgeye daha iyi uyar ama ek maliyet büyür. Buradaki "blok", 7\. makaledeki Transformer bloğuyla aynı şey değil; kastedilen, tek bir kuantizasyon sabitini paylaşan ardışık ağırlık kümesidir.

![İki panelli bir sayı doğrusu karşılaştırması. Üstteki panelde eşit aralıklı ızgara çizgileri bulunur ve üç ağırlık örnek olarak çizginin üstüne konmuştur; her biri kısa bir bağlantıyla en yakın ızgara çizgisine çekilir ve altında hata payının ızgara adımının yarısı kadar olduğu yazılıdır. Alttaki panelde aynı sekiz ağırlıktan biri ötekilerin on kat uzağına yerleştirilmiştir; ızgara bu aykırı değere göre gerildiği için kalan yedi ağırlığın hepsi aynı sıfır çizgisine düşer ve panelin altında bu çöküşün sebebi yazılıdır.](assets/izgara-ve-aykiri-deger.svg "Şekil 1 — Aynı ızgara, tek bir aykırı değerle")

Şekil 1'in alt paneli bu makalenin asıl sorununu gösteriyor. Aynı sekiz sayıdan birini −6,3 yapalım, yani ötekilerin on katı. Ölçek artık ona göre kurulur ve adım 0,9'a çıkar. Kalan yedi sayının hepsi 0,9'un yarısından küçük olduğu için hepsi **sıfıra** yuvarlanır. Tek bir **aykırı değer** (outlier), bloğun geri kalanını silmiştir.

## Aykırı değerler nerede yaşıyor

Bu gözlem kuantizasyonu bir mühendislik ayrıntısından bir araştırma konusuna çeviriyor. Peki gerçek modellerde böyle sayılar var mı?

Tim Dettmers ve arkadaşlarının NeurIPS 2022'de sunduğu çalışma bunu sistematik olarak ölçtü ve cevap net: var, ama beklenen yerde değil. Ağırlıklar görece uysal; sorun **aktivasyonlarda**. 3\. makalede kurduğumuz aktivasyon kavramını hatırla: ağın katmanları arasında akan ara değerler. Bu değerlerin bazı boyutlarında, ötekilerden yirmi kata kadar büyük sayılar çıkıyor.

Ölçümün üç ayrıntısı önemli. Birincisi, bu değerler ölçekle birlikte beliriyor: küçük modellerde katmanların dörtte biri civarında görülüyor, 6,7 milyar parametre civarında bir faz geçişi oluyor ve bütün katmanlara yayılıyor. İkincisi, son derece düzenliler — 6,7 milyar ölçeğinde bir dizide 150.000 aykırı değer sayılıyor, ama bunlar yalnızca **altı** boyutta toplanmış durumda. Üçüncüsü ve en önemlisi, bu değerler taşıyıcı: onları sıfırlamak dikkatin en yüksek olasılıklı seçime verdiği payı yüzde 20'den fazla düşürüyor ve doğrulama perplexity'sini yüzde 600 ile 1.000 arasında bozuyor. Aynı sayıda rastgele boyut sıfırlandığında düşüş sırasıyla en fazla yüzde 0,3 ve yüzde 0,1.

Yani girdinin binde birlik bir kısmı, modelin davranışının orantısız bir kısmını taşıyor. Çalışmanın çözümü de buradan çıkıyor: o binde biri 16 bitte bırak, kalan yüzde 99,9'u 8 bitle çarp. Karma hassasiyetli bu ayrıştırma 176 milyar parametreli BLOOM'un bellek ayak izini 1,96 kat küçültüyor ve doğruluğu koruyor.

> **Kendini yokla:** Aykırı değerler girdinin yalnızca binde biriyse, onları 16 bitte tutmanın bellek kazancına maliyeti neden ihmal edilebilir?

Çünkü kazanç kalan yüzde 99,9'dan geliyor. Binde birlik bir kısmın iki kat fazla yer kaplaması toplam bellekte binde birlik bir fark yaratır; buna karşılık geri kalanın yarıya inmesi neredeyse tam bir yarılanma sağlar. Pahalı olan şey bellek değil, o ayrıştırmayı hızlı çalışan bir çekirdek hâline getirmek.

## Yuvarlamayı akıllandırmak

Aykırı değerleri ayırmak 8 bitte yetiyor. Peki 4 bitte?

En basit yöntem, her ağırlığı bağımsız olarak en yakın ızgara noktasına yuvarlamaktır: **en yakına yuvarlama** (round-to-nearest). Bu yöntemin nerede kırıldığını Elias Frantar ve arkadaşlarının ICLR 2023'te sunduğu çalışma tabloya döktü. Aşağıdaki sayılar WikiText2 üzerinde ölçülen perplexity, yani 5\. makaledeki içsel ölçü; küçük olan iyidir.

| OPT modeli | 16 bit | 4 bit, en yakına | 4 bit, GPTQ | 3 bit, en yakına | 3 bit, GPTQ |
|---|---|---|---|---|---|
| 66 milyar | 9,34 | 110 | 9,55 | 6,1×10³ | 14,16 |
| 175 milyar | 8,34 | 10,54 | 8,37 | 7,3×10³ | 8,68 |

66 milyarlık satır tam olarak Şekil 1'in alt panelidir: naif yuvarlama modeli kullanılamaz hâle getirmiş, akıllı yuvarlama ise 16 bitlik hâlden yalnızca 0,21 perplexity uzakta kalmış. 3 bitte en yakına yuvarlama her iki modelde de tamamen çöküyor.

GPTQ'nun yaptığı şey, yuvarlamayı bağımsız kararlar dizisi olarak görmemek. Bir ağırlığı yuvarlarken oluşan hatayı aynı katmandaki **henüz yuvarlanmamış** ağırlıklara dağıtıyor; onlar da bu telafiyi üstlenerek yuvarlanıyor. Böylece hedef tek tek ağırlıkları korumak değil, katmanın çıktısını korumak oluyor. Hangi ağırlığın ne kadar telafi alacağını belirlemek için küçük bir kalibrasyon kümesi kullanılıyor: C4 derleminden rastgele seçilmiş 128 tane 2.048 token'lık parça. Bütün işlem 175 milyar parametreli bir model için tek bir kartta yaklaşık dört saat sürüyor — modeli yeniden eğitmek yok, tek geçişte yuvarlama var. Alanın adlandırması bu yüzden **eğitim sonrası kuantizasyon** (post-training quantization).

Pratik karşılığı da var. 3 bite indirilmiş 175 milyarlık model, embedding ve çıkış katmanları 16 bitte bırakılsa bile yaklaşık 63 gigabayt tutuyor ve önbelleğiyle birlikte tek bir 80 gigabaytlık karta sığıyor; 16 bitlik hâli beş kart istiyordu. Token başına gecikme aynı kartta 230 milisaniyeden 71 milisaniyeye iniyor.

Ji Lin ve arkadaşlarının MLSys 2024'te en iyi bildiri ödülünü alan çalışması aynı problemi başka bir yerden yakalıyor: bütün ağırlıklar eşit derecede önemli değil ve hangilerinin önemli olduğuna **ağırlığa değil aktivasyona** bakarak karar vermek gerekiyor. Ağırlıkların yüzde birini korumak kuantizasyon hatasını belirgin biçimde düşürüyor; korumanın yolu da o kanalları önceden ölçeklemek. Yöntem geriye yayılım ya da yeniden kurulum kullanmadığı için, yazarların iddiasına göre kalibrasyon kümesine aşırı uyum sağlamıyor. Buradaki risk 2\. makaledeki aşırı öğrenmenin bu alandaki karşılığıdır: yuvarlamayı 128 metin parçasına göre ayarlarsan, o parçalara benzemeyen girdilerde kaybın büyüyebilir.

## Kaç bit?

Elimizde iki eksen var: modelin parametre sayısı ve parametre başına bit. Toplam model biti ikisinin çarpımıdır ve hem bellek hem taşıma bu çarpıma bağlıdır. O hâlde asıl soru şu: aynı toplam bit bütçesiyle 30 milyarlık bir modeli 8 bitte mi, 60 milyarlıkı 4 bitte mi çalıştırmak daha iyi?

Dettmers ve Zettlemoyer'in ICML 2023'te sunduğu çalışma bu soruyu 19 milyondan 176 milyara kadar beş model ailesinde, 3 ile 16 bit arasında, 35.000'den fazla deneyle taradı. Sonuç şaşırtıcı derecede keskin: sabit bir toplam bit bütçesinde hassasiyeti 16'dan 4'e düşürmek başarıyı **istikrarlı biçimde artırıyor**, 3 bitte ise ilişki tersine dönüyor. Yani 4 bit, denenen bütün ölçeklerde ve ailelerde neredeyse evrensel olarak optimal. Aynı çalışma blok boyu için de 64 ile 128 arasını öneriyor.

![Yatay ekseninde toplam model biti, dikey ekseninde ölçülen ortalama başarı bulunan bir grafik. Dört eğri çizilidir: 16 bit, 8 bit, 4 bit ve 3 bit hassasiyet. Aynı toplam bit değerinde 4 bitlik eğri 8 ve 16 bitlik eğrilerin üstünde, 3 bitlik eğri ise hepsinin altındadır. Grafiğin üzerinde dikey kesik çizgiyle aynı toplam bit değeri işaretlenmiş ve bu çizgi üzerinde iki nokta konmuştur: biri 8 bitlik eğrinin, öbürü 4 bitlik eğrinin üzerindedir ve 4 bitlik olan daha yüksektedir.](assets/bit-genisligi-ve-basari.svg "Şekil 2 — Aynı bit bütçesi, farklı hassasiyet")

Şekil 2'deki eğriler bir mühendislik reçetesi veriyor: bütçen daralıyorsa hassasiyeti düşürme, **modeli küçült**. Dört bitte kal ve parametre sayısıyla oyna.

## "Neredeyse aynı" ne demek?

Buraya kadar her şey iyi görünüyor. Ama 16\. makalenin disiplini tam da böyle cümlelerde devreye girer: neredeyse aynı, hangi cetvelde?

İki ölçüm bu iddiayı sınırlıyor.

Birincisi kapasite. 18\. makalede kurmuştuk: Zeyuan Allen-Zhu ve Yuanzhi Li'nin ölçümüne göre bir model parametre başına yaklaşık iki bit olgu saklıyor ve bu oran **8 bite indirildiğinde bile korunuyor**. O makalede geçtiğimiz kısım şuydu: aynı ölçüm 4 bitte tekrarlandığında kapasite parametre başına 0,7 bite düşüyor, yani iki kattan fazla kayıp. "Dört bit optimaldir" cümlesi çoktan seçmeli değerlendirme kümelerinde doğru, olgu saklama kapasitesinde değil. 9\. makaleden beri tekrarladığımız uyarı burada da geçerli: aynı model, iki farklı cetvel.

İkincisi davranış. Abhinav Dutta ve arkadaşlarının NeurIPS 2024'te sunduğu çalışma altı ayrı kuantizasyon düzenini yedi değerlendirme kümesinde karşılaştırdı. Doğruluk farkı gerçekten küçük: sıfır ile iki puan arası. Ama araştırmacılar ikinci bir sayı daha ölçtüler — **cevap değişimi** (flips): taban modele göre doğrudan yanlışa ya da yanlıştan doğruya dönen cevapların oranı. Bu oran yüzde 13,6'ya kadar çıkıyor. Yalnızca ağırlıkları 8 bite indirip aktivasyonları 16 bitte bırakan düzen hem doğruluğu hem davranışı koruyor; ötekilerin hepsinde cevaplar yer değiştiriyor.

Bulgunun tuhaflığı da öğretici. Dört şıklı bir soruda doğru cevabın bozulması kolaydır; buna karşılık yanlış bir cevabın doğruya dönme şansı üçte birdir. Yine de iki yön dengeleniyor ve toplam doğruluk sabit kalıyor. Yani "aynı puan" iki modelin aynı olduğunu göstermiyor, yalnızca hatalarının aynı sayıda olduğunu gösteriyor. Serbest metin üretimi ölçüldüğünde fark açıkça görünüyor: cevap değişimi yüksek olan modeller çok turlu bir değerlendirmede belirgin biçimde geriye düşüyor.

## Neyi kuantize ediyoruz?

26\. makalede belleği kalemlere ayırmıştık ve kuantizasyon bunların her birine ayrı ayrı uygulanır. Kalemleri birbirine karıştırmamak, ilan edilen hızlanmaları okumanın tek yolu.

**Ağırlıklar.** Kazanç doğrudan adım adım üretimdedir: token başına taşınan 2N bayt yarıya ya da çeyreğe iner. Bir uyarıyla — GPTQ gibi yalnızca ağırlığı kuantize eden yöntemlerde çarpma hâlâ 16 bitte yapılır, ağırlıklar okunurken çözülür. Kazanılan şey taşımadır, işlem değil.

**Aktivasyonlar.** Tamsayı çekirdeklerinin gerçekten çalışması için hem ağırlığın hem aktivasyonun 8 bitte olması gerekir; zor olan taraf da burasıdır. Guangxuan Xiao ve arkadaşlarının ICML 2023'te sunduğu çalışma zorluğu taşıyarak çözüyor: aktivasyonlardaki kanal ölçek farkı, matematiksel olarak eşdeğer bir dönüşümle ağırlıklara aktarılıyor. Aktivasyon yumuşuyor, ağırlık biraz zorlaşıyor, ikisi de kuantize edilebilir hâle geliyor. Sonuç 1,56 kata varan hızlanma, iki kat bellek tasarrufu ve 530 milyar parametreli bir modelin tek bir sekiz kartlı düğümde servis edilebilmesi.

**Anahtar-değer önbelleği.** 26\. makaledeki 42 gigabaytlık hesabı hatırla: 128.000 token'lık tek bir sohbet. O sayı 16 bitlik anahtar ve değerlerle çıkmıştı. Zirui Liu ve arkadaşlarının ICML 2024'te sunduğu çalışma önbelleği iki bite indiriyor ve bunu yaparken bir ayrım gözetiyor: anahtarlar kanal bazında, değerler token bazında kuantize ediliyor. Tepe bellek kullanımı 2,6 kat azalıyor, yığın büyüklüğü dört kata kadar büyüyebiliyor ve iş hacmi 2,35 ile 3,47 kat artıyor.

![Üç kalemli bir şema. Solda ağırlıklar kutusu; altında adım adım üretimde taşınan baytın azaldığı ama çarpmanın hâlâ on altı bitte yapılabildiği yazılıdır. Ortada aktivasyonlar kutusu; altında tamsayı çarpımının ancak ağırlıkla birlikte kuantize edilirse mümkün olduğu ve aykırı değerlerin asıl burada yaşadığı yazılıdır. Sağda anahtar-değer önbelleği kutusu; altında kazancın kullanıcı başına bellekte ve yığın büyüklüğünde göründüğü yazılıdır. Üç kutunun altındaki ortak satır, üç kalemin ayrı ayrı ilan edildiğini ve tek bir sayıyla karşılaştırılamayacağını söyler.](assets/uc-kalem.svg "Şekil 3 — Kuantizasyonun üç ayrı hedefi")

Şekil 3'ün altındaki not pratik bir okuma kuralı. Bir sağlayıcı "dört bitlik model" dediğinde bu neredeyse her zaman yalnızca ağırlıkları kasteder; aktivasyonlar ve önbellek başka hassasiyette olabilir. İlan edilen bellek kazancıyla ilan edilen hız kazancı da farklı kalemlerden gelir.

## Fazla eğitilmiş model neden daha kırılgan?

Şimdiye kadarki her şey, eğitilmiş bir modeli sonradan küçültmekle ilgiliydi. Alternatif yol modeli baştan kaba ızgaraya alışacak biçimde eğitmek: **kuantizasyona duyarlı eğitim** (quantization-aware training). Bu yol eğitim maliyetini düşürmez — ağırlıklar kuantize olsa bile çarpımlar yüksek hassasiyette yapılır — ama ağırlıkların ızgaraya uyum sağlamasını mümkün kılar.

İki yolun sınırını çizen ölçüm, Tanishq Kumar ve arkadaşlarının ICLR 2025'te sunduğu çalışmadan geliyor. 465 ön eğitim koşusuyla kuantizasyon kaybını ölçek yasalarının içine yerleştiriyorlar ve şu sonucu buluyorlar: eğitim sonrası kuantizasyonun yol açtığı bozulma, model **daha çok veriyle eğitildikçe artıyor**.

Bu sezgiye ters bir sonuç ve 9\. makaledeki tahsis tartışmasını doğrudan etkiliyor. Chinchilla'nın hesap-optimal oranı parametre başına yaklaşık 20 token'dı. Bugün üretilen modeller bunun çok ötesinde eğitiliyor; bir aile parametre başına 2.000 token'a kadar çıkıyor. Çalışmanın bulduğu şey şu: yeterince yüksek bir token/parametre oranında ek veri, eğitim kaybını düşürdüğünden daha fazla kuantizasyon bozulması ekliyor. Yani modeli kuantize ederek servis edeceksen, bir noktadan sonra **daha fazla ön eğitim verisi çıkarım zamanında zarar veriyor**.

Sebebin sezgisi 18\. makaleyle aynı çerçevede: model daha çok veri gördükçe aynı ağırlıklara daha çok bilgi sıkıştırıyor. Sıkıştırma arttıkça, ağırlıklara verilen aynı miktarda bozulma daha çok şeyi bozuyor. Aynı çalışma, ağırlık hassasiyetinden alınan kazancın parametre başına altı-yedi bit civarında doyduğunu da ölçüyor: 16 bitin bir gerekçe değil, bir alışkanlık olduğuna dair bir işaret.

> **Kendini yokla:** Aynı mimariyi iki farklı veri bütçesiyle eğitip ikisini de dört bite indirsen, hangisinin kaybı daha büyük olur ve neden?

Daha çok veriyle eğitilenin. İki model de aynı sayıda parametreye sahip olduğu için ızgaranın kabalığı aynıdır; fark, o parametrelerde ne kadar bilgi durduğundadır. Az eğitilmiş modelin ağırlıklarında bol boşluk vardır ve yuvarlama önce o boşluğu yer; çok eğitilmiş modelde her ağırlık iş yapıyordur.

## Kuantizasyonun disiplini

**"Dört bit" tek başına bir özellik değildir.** Neyin dört bitte olduğunu sor: ağırlıklar mı, aktivasyonlar mı, önbellek mi.

**Bellek kazancıyla hız kazancını ayrı oku.** Yalnızca ağırlığı kuantize etmek belleği ve taşımayı azaltır, işlem sayısını azaltmaz. Aktivasyonu da kuantize etmek işlemi ucuzlatır ama zor olan taraftır.

**Bütçe daralıyorsa hassasiyeti değil parametre sayısını değiştir.** Dört bit tatlı noktadır; üçe inmek ölçülmüş biçimde geri tepiyor.

**Doğruluk farkı sıfırsa ikinci bir sayıya bak.** Aynı puan aynı model demek değildir; kaç cevabın yer değiştirdiği ayrı bir ölçüdür ve serbest metin üretiminde asıl fark orada görünür.

**Kendi görevinde ölç.** Kuantizasyon kaybı göreve, dile ve modelin ne kadar eğitildiğine bağlıdır. Yayımlanmış bir perplexity farkı senin işinde ne kaybettiğini söylemez.

### Sırada ne var

Modeli küçülttük; bellek yükü de, taşınan bayt da azaldı. Ama 26\. makaledeki muhasebe hâlâ ortada duruyor: tek bir kullanıcıya hizmet verirken çip kapasitesinin küçük bir kısmını kullanıyoruz ve boşta duran hesap gücü kuantizasyonla birlikte daha da arttı. O boşluğu kim dolduracak? Aynı anda kaç isteğe hizmet verildiği, isteklerin sıraya nasıl konduğu ve boştaki hesabın ileriye dönük tahminler üretmek için nasıl harcanabileceği — çıkarımın ekonomisi burada sistem katmanına geçiyor.

## Kaynakça

- Dettmers, T., Lewis, M., Belkada, Y. & Zettlemoyer, L. (2022). *LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale*. NeurIPS 2022. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/c3ba4962c05c49636d4c6206a97e9c8a-Abstract-Conference.html)
- Frantar, E., Ashkboos, S., Hoefler, T. & Alistarh, D. (2023). *GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers*. ICLR 2023. [Bağlantı](https://openreview.net/forum?id=tcbBPnfwxS)
- Lin, J., Tang, J., Tang, H., Yang, S., Chen, W.-M., Wang, W.-C., Xiao, G., Dang, X., Gan, C. & Han, S. (2024). *AWQ: Activation-aware Weight Quantization for On-Device LLM Compression and Acceleration*. MLSys 2024. [Bağlantı](https://proceedings.mlsys.org/paper_files/paper/2024/hash/42a452cbafa9dd64e9ba4aa95cc1ef21-Abstract-Conference.html)
- Dettmers, T. & Zettlemoyer, L. (2023). *The case for 4-bit precision: k-bit Inference Scaling Laws*. ICML 2023, PMLR 202, s. 7750–7774. [Bağlantı](https://proceedings.mlr.press/v202/dettmers23a.html)
- Allen-Zhu, Z. & Li, Y. (2025). *Physics of Language Models: Part 3.3, Knowledge Capacity Scaling Laws*. ICLR 2025. [Bağlantı](https://arxiv.org/abs/2404.05405)
- Dutta, A., Krishnan, S., Kwatra, N. & Ramjee, R. (2024). *Accuracy is Not All You Need*. NeurIPS 2024. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2024/hash/e0e956681b04ac126679e8c7dd706b2e-Abstract-Conference.html)
- Xiao, G., Lin, J., Seznec, M., Wu, H., Demouth, J. & Han, S. (2023). *SmoothQuant: Accurate and Efficient Post-Training Quantization for Large Language Models*. ICML 2023, PMLR 202. [Bağlantı](https://proceedings.mlr.press/v202/xiao23c.html)
- Liu, Z., Yuan, J., Jin, H., Zhong, S., Xu, Z., Braverman, V., Chen, B. & Hu, X. (2024). *KIVI: A Tuning-Free Asymmetric 2bit Quantization for KV Cache*. ICML 2024, PMLR 235. [Bağlantı](https://proceedings.mlr.press/v235/liu24bz.html)
- Kumar, T., Ankner, Z., Spector, B. F., Bordelon, B., Muennighoff, N., Paul, M., Pehlevan, C., Ré, C. & Raghunathan, A. (2025). *Scaling Laws for Precision*. ICLR 2025. [Bağlantı](https://openreview.net/forum?id=wg1PCg3CUP)
