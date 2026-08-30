---
article_id: article_7846ed23-12b4-4966-8f47-d78e0670e3fd
title: "Uzun Bağlam: Pencereyi Büyütmenin Bedeli"
slug: uzun-baglam-pencereyi-buyutmenin-bedeli
category: reasoning-and-memory
level: intermediate
reading_order: 25
summary: "Eğitim uzunluğunun ötesine geçmenin neden bozulmayla sonuçlandığını, pozisyonları esnetmenin bu bozulmayı nasıl önlediğini ve bedelinin nereden çıktığını ölçümlerle kurar: kısa bağlam başarısındaki gerileme, eğitim maliyeti, karesel hesabın kaybolmaması ve sonsuz akışın sonsuz bağlam anlamına gelmemesi."
tags:
  - uzun-baglam
  - pozisyon-enterpolasyonu
  - dikkat-cukuru
  - flashattention
  - etkin-uzunluk
content_hash: sha256:21e1b134f2e2a52c49b5cb8196d48824582a55b683da1f21c358557bf16f561a
classification_version: 1
classification_batch: 5
---
## Sınırı satın almak

21\. makalede pencerenin sınırının üç ayrı yerden geldiğini görmüştük: modelin eğitildiği uzunluk, dikkatin karesel hesap maliyeti ve anahtar-değer önbelleğinin bellek ihtiyacı. Aynı makalede sınırın bir mimari sabit değil bir mühendislik tercihi olduğunu da söylemiştik — uzun pencere satın alınabilir.

Şimdi faturaya bakma zamanı. Bu makalenin sorusu üç parçalı: eğitim uzunluğunun ötesine nasıl geçiliyor, bu geçişin ölçülen bedeli ne, ve elde edilen uzunluk gerçekten kullanılabilir mi?

Baştan bir uyarı: burada anlatılan tekniklerin hiçbiri 21\. makaledeki etkin uzunluk sorununu çözmüyor. Hepsi modelin daha uzun bir diziyi **çalıştırabilmesini** sağlıyor; o diziyi iyi kullanabilmesini değil. İkisinin farkı bu makalenin son bölümünde.

## Eğitim uzunluğunun ötesi neden bozuluyor

7\. makalede dikkatin sırayı görmediğini, sıranın modele pozisyon kodlamasıyla verildiğini kurmuştuk. Bugün yaygın kullanılan kodlama, her token'ın konumunu bir açıya çevirip sorgu ve anahtar vektörlerini o açı kadar döndürüyor. Model, eğitim boyunca yalnızca belirli bir uzunluğa kadar olan açıları görür.

Modele o uzunluğun ötesinde bir dizi verirsen, hiç görmediği açılarla karşılaşır. Shouyuan Chen, Sherman Wong, Liangjian Chen ve Yuandong Tian'ın 2023'te yayımladığı çalışma bunun sonucunu net bir dille kaydediyor: doğrudan uzatma, dikkat skorlarını **felaket düzeyinde** büyütüyor ve öz-dikkat mekanizmasını tamamen bozuyor. Çalışma hakemli bir yayın değil; bulgusu buna rağmen alanın yönünü belirledi.

Önerdikleri çözüm şaşırtıcı derecede basit ve adı **pozisyon enterpolasyonu** (position interpolation). Modelden hiç görmediği açıları anlamasını istemek yerine, yeni ve uzun diziyi onun bildiği aralığa **sıkıştırıyorlar**. Dört bin token'lık bir aralığa alışmış bir modele otuz iki bin token'lık bir dizi verilecekse, konum numaraları sekize bölünüp eski aralığın içine yerleştiriliyor.

![Üç şerit alt alta gösterilir. Birincisi modelin eğitildiği pozisyon aralığıdır ve eşit aralıklı çentiklerle işaretlidir. İkincisinde aynı çentik aralığı korunarak dizi eğitilmiş aralığın ötesine taşırılmıştır; taşan bölge kesikli çizgiyle çizilmiş ve bozulma bölgesi olarak etiketlenmiştir. Üçüncüsünde ise aynı uzun dizi, çentikler arası mesafe küçültülerek eğitilmiş aralığın içine sıkıştırılmıştır ve komşu token konumlarının birbirine yaklaştığı belirtilmiştir.](assets/pozisyonlari-sikistirmak.svg "Şekil 1 — Uzatmak yerine sıkıştırmak")

Şekil 1'deki benzetme bir cetvel: elindeki cetvelin sonu geldiğinde ya cetveli uzatırsın ya da çentikleri sıklaştırıp aynı cetvele daha çok şey sığdırırsın. Benzetme şurada bozulur: cetvelde çentikleri sıklaştırmak ölçümü bozmaz, burada bozar — birbirine yaklaşan komşu token'ların konumları modelin gözünde daha az ayırt edilebilir hâle gelir. Benzetmenin biçimsel karşılığı da tam olarak bu: konum indeksi ölçeklenerek küçültülür, yani her token'ın açısı orantılı olarak daraltılır, dolayısıyla art arda gelen iki token arasındaki açı farkı da daralır.

Aritmetiği küçük bir örnekle görelim. 4.096 token'lık bir pencereyle eğitilmiş bir modele 32.768 token'lık bir dizi vereceksin. Doğrudan uzatmada dizinin son token'ının konumu 32.767 olur ve model bu sayıyı hiç görmemiştir. Sıkıştırmada ise bütün konumlar sekize bölünür: son token'ın konumu 32.767 ÷ 8 = 4.095,875 olur. Model artık bilmediği bir bölgeye değil, **bildiği bölgenin arasına** düşen bir sayıyla karşılaşır. Komşu iki token'ın konumları arasındaki fark da 1 yerine 0,125'e iner — kazanç ile bedel aynı işlemden çıkıyor.

Yaklaşımın neden çalıştığına dair sayısal bir gerekçe de veriliyor: sıkıştırmayla elde edilen dikkat skorlarının kuramsal üst sınırı, uzatmayla elde edilenlerin üst sınırından en az yaklaşık **600 kat** küçük. Yani sıkıştırma, modeli bilinen bir davranış aralığında tutuyor. Bu düzenle bin eğitim adımının altında bir ek eğitimle bağlam penceresi 32.768 token'a çıkarılıyor.

## Ölçülen bedel

Bu fikrin en verimli sürümü, Bowen Peng, Jeffrey Quesnelle, Honglu Fan ve Enrico Shippole'un ICLR 2024'te sunduğu YaRN yöntemi. Temel gözlem şu: pozisyon kodlaması tek bir açı değil, farklı hızlarda dönen bir açılar demeti üretir. Hızlı dönen bileşenler bir iki token'lık yakın komşulukları ayırt etmeye yarar; yavaş dönenler binlerce token uzaktaki ilişkileri taşır. Yukarıdaki örnekte hepsini birden sekize bölmek, yavaş bileşenler için gerekli olan bir şeyi hızlı bileşenlere de dayatıyor: "harften bir sonraki harf" ayrımını yapan bileşen, gereksiz yere körleşiyor.

YaRN bu yüzden sıkıştırmayı bileşen bileşen ayarlıyor: uzak ilişkileri taşıyan yavaş bileşenler tam olarak sıkıştırılıyor, yakın komşuluğu taşıyan hızlı bileşenler ise neredeyse hiç dokunulmadan bırakılıyor. Aradaki bileşenlerde geçiş kademeli. Fikir sade ama sonucu, kısa görev başarısının ne kadarının korunacağını doğrudan belirliyor.

Sonuç, eğitim bütçesinde ölçülüyor. Llama 2'nin 7 ve 13 milyar parametreli sürümleri 400 adımda 64.000 token'a çıkarılıyor; ardından aynı kontrol noktasından yalnızca 200 adım daha eğitilerek 128.000 token'a. Kullanılan veri, orijinal ön eğitim verisinin binde birinden az. Karşılaştırma da açık: aynı 7 milyar parametreli modeli 32.000 token'a çıkarmak YaRN ile 128 A100 kart-saati tutuyor; pozisyon enterpolasyonunun ilk hâliyle yalnızca 16.000 token'a çıkarmak 640 kart-saati.

Uzun dizilerde perplexity de düzenli düşüyor — 128.000 token'a çıkarılmış 7 milyar parametreli modelde 8.192 token'da 3,56, 32.768'de 2,70, 131.072'de 2,37. Yani model uzun metni gerçekten işleyebiliyor.

Şimdi faturaya bakalım, çünkü asıl öğretici kısım orada.

![İki değerlendirme kümesi için üçer çubuk gösterilir. MMLU'da esnetilmemiş modelin puanı 35,7, kaba enterpolasyonla esnetilmiş modelin puanı 25,9, YaRN ile esnetilmiş modelin puanı 30,0'dır; dört şıklı bir sınavda rastgele tahminin karşılığı olan 25 düzeyi kesikli bir çizgiyle işaretlenmiştir. Sağdaki HellaSwag kümesinde aynı sıra 77,8, 70,2 ve 77,2 puandır.](assets/esnetmenin-kisa-baglam-bedeli.svg "Şekil 2 — Uzun pencere, kısa görevlerden ödeniyor")

Şekil 2'de ölçülen model, 2.000 token'lık bir pencereyle eğitilmiş ve 32.000 token'a esnetilmiş bir modelin kendisi. Soldaki küme 16\. makalede tanıştığımız MMLU, sağdaki ise günlük sağduyu sorularından oluşan HellaSwag. Esnetilmemiş hâli MMLU'da 35,7 alıyor. Kaba pozisyon enterpolasyonuyla esnetildiğinde bu puan 25,9'a düşüyor — dört şıklı bir sınavda rastgele tahminin beklenen değeri 25 olduğuna göre, model o sınavda neredeyse hiçbir şey bilmiyor demektir. HellaSwag'de de 77,8'den 70,2'ye iniyor.

YaRN aynı esnetmeyi çok daha ucuz ödüyor: HellaSwag'de 77,2 ile neredeyse hiç kayıp yok, MMLU'da 30,0 ile kaybın bir kısmı geri alınıyor ama tamamı değil. Yani pencereyi büyütmek bedava değil; bedeli, uzun metinlerde değil **kısa** görevlerde ödeniyor.

Daha yeni ve daha uzun eğitilmiş modellerde bu bedel küçülüyor ama kaybolmuyor. Llama 2'nin 7 milyar parametreli sürümünde MMLU esnetilmemiş hâlde 43,8; 64.000 token'a esnetildiğinde 42,5; 128.000'e esnetildiğinde 41,7. On üç milyarlık sürümde 55,8 → 52,8 → 51,9. Küçük ama düzenli bir aşınma: her esnetme adımı bir şeyler götürüyor.

> **Kendini yokla:** Modelin ilan edilen penceresi 128.000'e çıktıysa ve kısa görevlerdeki puanı biraz düştüyse, bu takas ne zaman kârlı?

Yalnızca gerçekten uzun girdilerle çalışıyorsan. Kullanım senaryolarının çoğu birkaç bin token'lık istemlerden oluşuyorsa, esnetilmiş bir modele geçmek her çağrıda küçük bir vergi ödemek ve karşılığında hiç kullanmadığın bir kapasiteyi satın almak demek. Karar, 16\. makaledeki disiplinle verilir: kendi görev kümende iki modeli de ölç.

## Karesel hesap kaybolmuyor

Şimdiye kadarki her şey eğitim uzunluğuyla ilgiliydi. 21\. makaledeki ikinci sınır — dikkatin karesel maliyeti — bu tekniklerin hiçbiriyle ortadan kalkmıyor. Pencereyi sekiz kat büyütmek, dikkat alt-katmanının işini hâlâ altmış dört kat artırıyor.

Değişen şey, bu işin nasıl yapıldığı. Tri Dao, Daniel Fu, Stefano Ermon, Atri Rudra ve Christopher Ré'nin NeurIPS 2022'de sunduğu FlashAttention, dikkat hesabını **yaklaşıklamadan** hızlandırıyor. Ayrım önemli: o tarihe kadar önerilen hızlandırmaların çoğu dikkatin bir kısmını atarak, yani sonucu bozarak kazanç arıyordu ve çalışmanın kaydettiği gibi çoğu gerçek zamanda hızlanma bile sağlamıyordu.

Fikir donanım tarafında. Bir çipin hesap yaptığı küçük ve hızlı belleğiyle, verinin durduğu büyük ve yavaş belleği arasında ciddi bir hız farkı var. Dikkat hesabı, dizi uzunluğunun karesi büyüklüğünde bir ara matris üretir; standart uygulama bu matrisi yavaş belleğe yazar, sonra geri okur. Pahalı olan hesabın kendisi değil, bu gidiş gelişler. FlashAttention diziyi bloklara bölüyor, her bloğun katkısını hızlı bellekte hesaplayıp toplama ekliyor ve o dev ara matrisi **hiç yazmıyor**.

Bunun iki sonucu var. Birincisi hız: 1.000 token'lık dizilerde GPT-2'nin eğitimi 3 kat, 1.000 ile 4.000 token arası uzun erimli kıyaslama takımında 2,4 kat hızlanıyor. İkincisi ve uzun bağlam açısından daha önemlisi bellek: karesel büyüyen ara matris hiç var olmadığı için, dikkatin bellek ihtiyacı dizi uzunluğuyla doğrusal kalıyor. Aynı kartta çok daha uzun diziler işlenebilir hâle geliyor.

Bunun ne kadar açtığını gösteren sonuçlar da var. Uzun erimli bağımlılık ölçen zor bir sınavda, 16.000 token'lık dizilerde ilk kez rastgeleden iyi bir sonuç alınıyor (yüzde 61,4); 64.000 token'lık sürümünde yüzde 63,1. Daha uzun bağlamın kendisi de kaliteyi iyileştiriyor: GPT-2'de perplexity 0,7 düşüyor, uzun belge sınıflandırmasında 6,4 puan kazanılıyor.

Ama şu ayrımı kaçırmamak gerek: FlashAttention işlem sayısını azaltmıyor, bellek trafiğini azaltıyor. Kare hâlâ kare — dizi iki katına çıktığında yapılacak çarpma sayısı dört katına çıkmaya devam ediyor. Kazanılan şey, o karenin daha ucuza ödenmesi. Bu, uzun bağlamın neden hâlâ pahalı olduğunun ve neden 26\. makalede ayrı bir ekonomi kurmamız gerektiğinin sebebi.

## Sonsuz akış, sonsuz bağlam değildir

Uzun bağlam tartışmasının en çok yanlış anlaşılan bölümü burası ve bir ölçüm onu tek başına açıklığa kavuşturuyor.

Diziyi kısaltmanın en basit yolu, eski token'ları atıp yalnızca son N token'ı tutmak — buna **pencere dikkati** (window attention) denir. 21\. makaledeki "kaydırmak" seçeneğinin en ucuz hâli. Guangxuan Xiao ve arkadaşlarının ICLR 2024'te sunduğu çalışma bu yöntemin metin cache boyunu aştığı anda çöktüğünü gösteriyor: bir kitabın metninde, 13 milyar parametreli bir modelle son 1.024 token tutulduğunda perplexity **5158,07**'ye fırlıyor. Model, herhangi bir anlamlı üretimi bırakmış demektir.

Sebep beklenmedik. Dizinin **ilk** birkaç token'ı, anlamları ne olursa olsun, dikkatin büyük bir kısmını üstüne çeker. Yazarlar buna **dikkat çukuru** (attention sink) diyor. Açıklama softmax'ın kendisinde: 6\. makalede kurduğumuz gibi softmax, skorları toplamı bir olan ağırlıklara çevirir. Sorgu hiçbir önceki token'la güçlü eşleşme bulamadığında bile bu bir birimlik dikkatin bir yere dökülmesi gerekir. İlk token'lar bu iş için idealdir, çünkü nedensel maske yüzünden kendilerinden sonraki **bütün** token'lar tarafından görülürler; model onları boşaltma yeri olarak kullanmayı öğrenir.

Ölçüm bunu ikna edici biçimde kanıtlıyor.

![Üç önbellek düzeni alt alta şeritler hâlinde gösterilir; her şerit uzun bir metni, şerit üzerindeki dolu bölgeler ise önbellekte tutulan token'ları temsil eder. Birinci düzende yalnızca şeridin sonundaki bölge doludur ve karşısındaki perplexity değeri 5158,07'dir. İkinci düzende şeridin en başındaki dört token da korunmuştur ve değer 5,40'a iner. Üçüncü düzende baştaki dört token yerine dört satır sonu karakteri konmuştur ve değer 5,60'tır.](assets/dikkat-cukuru-olcumu.svg "Şekil 3 — Dört token'ın farkı")

Şekil 3'teki son satır belirleyici. İlk dört token'ın **içeriği** kaldırılıp yerlerine dört tane satır sonu karakteri konduğunda perplexity yine düzeliyor: 5,60. Yani kurtaran şey o token'ların anlamı değil, o konumların dolu olması.

Kaç token gerektiği de ölçülmüş ve cevap öğretici. Yedi milyar parametreli modelde son 4.096 token tutulduğunda perplexity 3359,95; başa tek bir token eklenince 11,88'e, iki token eklenince 10,51'e, dört token eklenince 9,59'a iniyor. Sekiz token eklemek yalnızca 9,54 veriyor — yani dörtten sonrası kayda değer bir şey katmıyor. Modelin dikkati tek bir çukura değil, birkaç tanesine birden dökülüyor. Yazarların açıklaması eğitim düzeninde: ön eğitim sırasında bütün örneklerin başında duran sabit bir token olmadığı için model bu işi ilk birkaç konuma paylaştırmayı öğreniyor.

Bu bilgiyle kurulan yöntem, ilk birkaç token'ı sabit tutup geri kalanı kaydırıyor ve modelin dört milyon token'lık akışları kararlı biçimde işlemesini sağlıyor; pencereyi her adımda yeniden hesaplayan yönteme göre 22,2 kata varan hızlanmayla.

> **Kendini yokla:** İlk dört token'ın yerine anlamsız karakterler konunca sonuç düzeliyorsa, o token'lar modele ne veriyor?

Bilgi değil, yer. 6\. makalede softmax'ın skorları toplamı bir olan ağırlıklara çevirdiğini kurmuştuk; bu, dikkatin her adımda tamamen dağıtılması zorunluluğu demek. Sorgu hiçbir yerde güçlü eşleşme bulamadığında bu bir birim bir yere gitmek zorunda ve model onu ilk konumlara dökmeyi öğrenmiş. O konumlar boşalınca dikkat, gerçekten ilgili olmayan token'lara dağılıyor ve dağılım bozuluyor. Yani ilk token'lar bir bilgi kaynağı değil, bir tahliye kanalı.

Şimdi kritik cümle. Çalışmanın kendisi, ne yaptığını ve ne yapmadığını açıkça ayırıyor: modellerin dikkat penceresi büyütülmüyor, uzun metinlerdeki bellekleri ve o metni kullanma becerileri artırılmıyor. Model sonsuza kadar konuşabiliyor ama penceresinden çıkmış olanı hâlâ hatırlamıyor. Aynı çalışmanın bir başka cümlesi bu makalenin de tezi: bağlam boyunu büyütmek, modelin o boyun ötesindeki başarısını iyileştirmez ve hiçbiri uzun bağlamın **etkili** kullanımını garanti etmez.

## İlan edilen sayı, bir kez daha

21\. makaledeki RULER ölçümünü hatırla: on yedi modelin yalnızca yarısı 32.000 token'da tatmin edici başarı gösterebiliyordu, hepsinin ilan ettiği sayı 32.000 ya da daha büyük olmasına rağmen. Bu makalede anlatılan tekniklerin tamamı, ilan edilen sayıyı üretenler.

Buradan dürüst bir özet çıkıyor. Pencereyi esnetmek modelin uzun diziyi **çalıştırabilmesini** sağlar: hesap patlamaz, perplexity bozulmaz, metin sonuna kadar okunur. Modelin o dizinin ortasındaki bilgiyi bulabilmesini, uzun metin üzerinde akıl yürütebilmesini ise sağlamaz. 21\. makaledeki üç ölçüm — ortadaki bilginin kaybı, uzunluğun kendisinin yük olması, etkin uzunluğun ilan edilenin altında kalması — esnetilmiş modellerde de geçerli.

Bu ayrımın kaçmasının bir sebebi de ölçme alışkanlığı. Esnetme çalışmalarının çoğu başarıyı iki şeyle gösteriyor: uzun metinde perplexity ve saklanmış bir parolayı bulma sınavı. İkisi de 21\. makalede uyardığımız türden ölçüler. Perplexity, 5\. makalede kurduğumuz gibi içsel bir ölçüdür ve uzun bağlamda görev başarısıyla ilişkisi zayıflar; parola bulma sınavı ise yalnızca geri çağırmayı ölçer. Bir modelin 128.000 token'da düşük perplexity vermesi, o 128.000 token'ı kullanarak bir soruyu cevaplayabileceği anlamına gelmiyor. Aynı ayrım tersten de doğru: esnetme olmadan model o uzunluğa hiç ulaşamaz. Yani bu teknikler gerekli, ama yeterli değil.

Kimin neye karar verdiği de burada netleşiyor. Esnetme, model sağlayıcısının verdiği bir karar; sen bir modelin uzun sürümünü seçtiğinde bu makaledeki takası hazır olarak satın alıyorsun. Senin elindeki karar ise başka: hangi modeli seçeceğin, kendi görevlerinde kısa ve uzun başarıyı ölçüp ölçmediğin, ve pencereyi ne kadar doldurduğun.

## Uzun bağlam disiplini

**Kendi etkin uzunluğunu ölç.** 21\. makaledeki tarif değişmedi: cevabı bilinen bir küme kur, aynı görevi artan uzunluklarda çalıştır, doğruluğun düştüğü noktayı bul. İlan edilen sayı bir üst sınırdır, bir kapasite değil.

**Esnetilmiş modele geçerken kısa görevleri yeniden ölç.** Bedel orada ödeniyor ve uzun bağlam sınavlarında görünmüyor.

**Akışı bellek sanma.** Sonsuz akış sağlayan yöntemler pencereyi büyütmez; yalnızca modelin kaydırma sırasında çökmesini önler. Pencereden çıkan bilgi gitmiştir.

**Uzunluk, seçmenin yerini tutmaz.** Her şeyi pencereye koymak, 21\. makalede gördüğümüz gibi doğruluğu düşürebiliyor. Doğru parçayı seçip getirmenin mekanizması 41\. makalenin konusu ve uzun pencere onu gereksiz kılmıyor.

**Bedeli iki yerde ara.** Biri bu makalede: kısa görevlerdeki aşınma ve ek eğitim maliyeti. Öbürü çalışma anında: dizi uzadıkça hem hesap hem bellek büyüyor.

### Sırada ne var

Bu makalede pencereyi büyütmenin eğitim tarafındaki bedelini gördük. Geriye çalışma anındaki bedel kaldı ve orası daha somut: bir modelin cevap üretirken saniyede kaç token çıkarabildiği, aynı anda kaç kullanıcıya hizmet verilebildiği ve uzun sohbetlerin faturayı neden hızla büyüttüğü hep aynı yapıdan doğuyor. 21\. makalede adını koyup maliyet yapısını ertelediğimiz anahtar-değer önbelleği, bu yapının tam merkezinde duruyor.

## Kaynakça

- Chen, S., Wong, S., Chen, L. & Tian, Y. (2023). *Extending Context Window of Large Language Models via Positional Interpolation*. Hakemli olmayan ön çalışma (arXiv:2306.15595). [Bağlantı](https://arxiv.org/abs/2306.15595)
- Peng, B., Quesnelle, J., Fan, H. & Shippole, E. (2024). *YaRN: Efficient Context Window Extension of Large Language Models*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=wHBfxhZu1u)
- Dao, T., Fu, D. Y., Ermon, S., Rudra, A. & Ré, C. (2022). *FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness*. NeurIPS 2022. [Bağlantı](https://openreview.net/forum?id=H4DqfPSibmx)
- Xiao, G., Tian, Y., Chen, B., Han, S. & Lewis, M. (2024). *Efficient Streaming Language Models with Attention Sinks*. ICLR 2024. [Bağlantı](https://arxiv.org/abs/2309.17453)
- Hsieh, C.-P., Sun, S., Kriman, S., Acharya, S., Rekesh, D., Jia, F., Zhang, Y. & Ginsburg, B. (2024). *RULER: What's the Real Context Size of Your Long-Context Language Models?*. COLM 2024. [Bağlantı](https://arxiv.org/abs/2404.06654)
