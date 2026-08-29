---
article_id: article_913d5536-ba0f-404e-843f-92d216e77535
title: "Bağlam Penceresi: İstemin Anatomisi"
slug: baglam-penceresi-istemin-anatomisi
category: reasoning-and-memory
level: intermediate
reading_order: 21
summary: "Faz 3'ü açar: modelin durumsuz olması ve her turda bütün sohbetin yeniden gönderilmesi, pencerenin içinde tam olarak ne bulunduğu, sınırın eğitim uzunluğu ile karesel maliyetten doğması, ilan edilen uzunlukla ölçülen etkin uzunluğun ayrışması ve bilginin pencerede nereye konduğunun doğruluğu değiştirmesi."
tags:
  - baglam-penceresi
  - istem
  - durumsuzluk
  - etkin-uzunluk
  - uzun-baglam
content_hash: sha256:b4bbaf649863a4a12f325c14e52756cac133874ef08042867786d3eeed239c9f
classification_version: 1
classification_batch: 4
---
## Modelin gördüğü tek şey

Faz 2 kapandı. Bir modelin nasıl eğitildiğini, nasıl asistana dönüştüğünü, neyi bildiğini, nasıl uyarlandığını ve kimin elinde olduğunu biliyoruz. Buradan sonrası eğitimle değil kullanımla ilgili — ve kullanım tarafında işe garip bir gerçekle başlamak gerekiyor.

Model, sohbetleri hatırlamaz. Aslına bakılırsa iki cümle arasında bile hiçbir şey hatırlamaz.

10\. makaledeki otoregresif döngüyü hatırla: modele bir dizi verilir, model sonraki token üzerinde bir dağılım döndürür, bir kural o dağılımdan bir token seçer, seçilen token dizinin sonuna eklenir ve model **baştan** çalıştırılır. Bu döngüde modelin kalıcı bir iç durumu yoktur; her çağrıda önüne konan diziden başka hiçbir şey görmez. Buna **durumsuz** (stateless) olmak denir.

O hâlde bir sohbet arayüzü nasıl çalışıyor? Cevap sıradan ve önemli: her turda bütün sohbet baştan gönderiliyor. Üçüncü sorunu yazdığında model, birinci soruyu, birinci cevabı, ikinci soruyu, ikinci cevabı ve üçüncü soruyu tek bir dizi hâlinde okur; sonra devamını üretir. Sohbetin "hafızası" modelde değil, o dizinin kendisindedir.

Bu dizinin alabileceği en büyük uzunluğa **bağlam penceresi** (context window) denir ve bu makale onun anatomisiyle ilgili: içinde ne var, sınırı nereden geliyor ve ilan edilen sınırla gerçekten kullanılabilen sınır aynı şey mi?

## Pencerenin içinde ne var

Pencereyi bir metin kutusu gibi düşünmek yanıltıyor; içinde birbirinden farklı işlere ait parçalar yan yana durur ve model bunları aynı türden token'lar olarak görür.

Somut bir örnek üzerinden gidelim. Aşağıdaki sayılar 15\. makaledeki yöntemle, GPT-4o'nun kullandığı sözlükle yerelde ölçüldü.

Bir teknik destek asistanına verilen kısa bir Türkçe **sistem istemi** (system prompt) — modelin nasıl davranacağını söyleyen, kullanıcının görmediği talimat — 33 token tutuyor. Kullanıcının ilk sorusu 16, modelin ilk cevabı 37 token. İkinci soru 13, ikinci cevap 35 token. Rollerin nasıl kurulduğu ve sistem isteminin nasıl yazıldığı 24\. makalenin konusu; burada onu pencerede yer kaplayan bir bileşen olarak sayıyoruz.

Şimdi maliyeti sayalım. Model **birinci** cevabı üretirken önünde 33 + 16 = 49 token vardı. **İkinci** cevabı üretirken önünde 33 + 16 + 37 + 13 = 99 token vardı. Aynı sohbet, aynı kullanıcı, iki katına çıkmış bir girdi.

![Soldan sağa tek bir şerit, farklı bileşenlere ayrılmış olarak gösterilir: sistem istemi, önceki turlar, eklenen belgeler, güncel mesaj, üretilen cevap ve kalan boşluk; şeridin sağ ucunda pencerenin sınırı işaretlidir ve altta bütün bileşenlerin aynı türden token olarak sayıldığı belirtilir.](assets/baglam-penceresinin-anatomisi.svg "Şekil 1 — Pencere tek bir dizidir")

Şekil 1'deki şeridin sağ ucunda üretilen cevabın da yer kapladığına dikkat et. Model cevabını üretirken her yeni token'ı aynı dizinin sonuna ekler; yani çıktı da pencereden yer kapar. Uzun bir cevap istemek, girdiye ayrılan yeri azaltır.

Bu düzenin en az fark edilen sonucu şu: sohbet uzadıkça her tur pahalanır. Basit bir hesapla görelim. Diyelim her tur — soru artı cevap — yaklaşık 500 token tutuyor. Onuncu turda model yaklaşık 5.000 token okur. Ama sohbetin tamamı boyunca işlediği girdinin toplamı 500 × (1 + 2 + … + 10) = **27.500** token'dır, oysa sohbetin kendisi 5.000 token uzunluğundadır. Maliyet, tur sayısıyla doğrusal değil karesel büyür.

15\. makalenin faturası tam da buraya biniyor. Aynı içerik Türkçede İngilizcenin 1,4 ila 1,8 katı token tuttuğuna göre, aynı sohbet Türkçede pencereyi o oranda hızlı doldurur ve her turda o oranda çok girdi işlenir. Token ızgarası, bir ölçme ayrıntısı olmaktan çıkıp kullanılabilir sohbet uzunluğuna dönüşüyor.

19\. makalede bıraktığımız bir ayrıntı da burada yerini buluyor. Önek ayarı, ağırlıklara dokunmak yerine dizinin başına öğrenilebilir sanal token'lar ekliyordu; o token'lar da Şekil 1'deki şeritten yer kapar. Yani parametreden tasarruf eden bir yöntem, bedelini pencereden ödüyor. Bu gerilim uyarlamanın bütün biçimlerinde var: ya ağırlığa yazarsın ve pencereyi serbest bırakırsın, ya pencereye yazarsın ve ağırlığa dokunmazsın. İkisi de bedava değil.

Bir ayrıntı daha var ve göründüğünden önemli. 12\. makalede sohbet biçimini kurmuştuk: konuşmacı sınırları ve cevabın sonu, sıradan metinde geçmeyen özel token'larla işaretlenir. Yani Şekil 1'deki bölümler modelin gözünde ayrı kutular değil; hepsi tek bir dizide, aralarına konmuş işaretlerle ayrılmış token'lardır. Sistem istemini kullanıcı mesajından ayıran şey ayrı bir kanal değil, dizinin içindeki bir işarettir.

Bunun doğrudan bir sonucu var. Pencereye eklenen bir belgenin içeriği de aynı diziye karışır ve model, "bu cümle bana verilen talimat, şu cümle okuduğum belge" ayrımını mimari olarak değil, yalnızca eğitimle edindiği alışkanlık kadar yapar. 6\. ve 7\. makalede gördüğümüz dikkat mekanizması bu iki bölümü ayırmaz; hepsine aynı biçimde bakar. Ayrımın nerede ve neden kırıldığı ileride güvenlik fazında ayrıca ele alınacak; burada işaretlenecek şey, ayrımın bir duvar değil bir eğilim olduğudur.

> **Kendini yokla:** Model durumsuzsa, sunucu her turda bütün diziyi baştan mı hesaplıyor?

Modelin gördüğü şey açısından evet: her çağrıda bütün diziye koşullanır. Ama hesabın kendisi tekrarlanmak zorunda değil. Önceki token'ların ara hesapları saklanıp yeniden kullanılabilir; buna anahtar-değer **önbelleği** (KV cache) denir ve üretim ekonomisinin merkezinde durur. Adı 18\. makaledeki anahtar-değer **belleğine** benziyor ama akrabası değil: orası ileri beslemeli katmanın ağırlıklarında duran kalıcı bir yapıydı, burası tek bir çalışma boyunca yaşayan geçici bir hızlandırma. Bu önbelleğin maliyet yapısını 26\. makalede kuracağız.

## Sınır nereden geliyor

Neden bir sınır var? Üç ayrı sebep aynı yere bakıyor.

**Birincisi eğitim uzunluğu.** Bir model belirli bir uzunluktaki dizilerle eğitilir ve o uzunluğun ötesine kendiliğinden genellemez. Ofir Press, Noah Smith ve Mike Lewis'in ICLR 2022'de sunduğu çalışma bunu doğrudan ölçtü: 7\. makalede tanıştığımız klasik pozisyon kodlamasıyla eğitilmiş bir model, eğitildiği uzunluğun biraz ötesinde iyileşmeyi bırakıp hızla bozuluyor. Yazarların önerdiği alternatif — dikkat skorlarına uzaklıkla artan bir ceza eklemek — 1.024 token'la eğitilmiş bir modelin 2.048 token'da, doğrudan 2.048 ile eğitilmiş bir modelin perplexity değerini yakalamasını sağlıyor. Bugün yaygın kullanılan yöntem ise Jianlin Su ve arkadaşlarının önerdiği ve *Neurocomputing* dergisinde yayımlanan döndürmeli pozisyon kodlamasıdır; pencereyi eğitim uzunluğunun ötesine esnetmenin yollarını 25\. makalede ele alacağız.

**İkincisi hesap.** 7\. makalede öz-dikkatin maliyetinin dizinin karesiyle büyüdüğünü görmüştük: masadaki kişi sayısı iki katına çıktığında konuşma çiftleri dört katına çıkar. Pencereyi 8 kat büyütmek, dikkat alt-katmanının işini **64 kat** artırır. Bu, uzun pencerenin neden bedava bir özellik olmadığının en sert sebebi.

**Üçüncüsü bellek.** Yukarıda adı geçen anahtar-değer önbelleği, dizideki her token için yer tutar; yani bellek ihtiyacı uzunlukla doğrusal büyür ve aynı anda kaç kullanıcıya hizmet verilebileceğini doğrudan sınırlar.

Bu üçü birlikte, pencerenin bir mimari sabit değil bir **mühendislik tercihi** olduğunu söylüyor. Uzun pencere satın alınabilir; bedeli eğitim, hesap ve bellektir.

## Pencere dolduğunda

Sohbet uzayıp dizi pencereye sığmaz hâle geldiğinde bir şeyin çıkması gerekir. Kullanılan üç yol var ve üçünün de bedeli farklı.

**Kaydırmak.** En eski turlar diziden atılır, sistem istemi genellikle sabit tutulur. Ucuz ve basit; ama atılan şey sessizce gider — model, o turların hiç yaşanmadığı bir dünyada cevap verir ve bunu sana söylemez.

**Özetlemek.** Eski turlar daha kısa bir metne dönüştürülüp onun yerine konur. Daha çok bilgi korunur, ama özeti üreten şey de bir dil modelidir; 17\. makaledeki bütün uydurma riskleri artık **belleğin kendisinde** çalışır. Üstelik özetlerin özeti alındıkça hata birikir.

**Seçmek.** Sohbetin ya da belgelerin yalnızca soruyla ilgili parçaları pencereye alınır. Bu, en iyi çalışan yol ama ayrı bir mekanizma gerektiriyor: neyin ilgili olduğuna karar veren bir arama katmanı. Onu 41\. makalede kuracağız.

Buradan önemli bir ayrım çıkıyor. Kullanıcının "model konuşmanın başını unuttu" dediği durum, 18\. makaledeki unutmayla aynı şey değildir. Orada bilginin ağırlıklara hiç yazılmamış ya da yazıldığı yönden adreslenemiyor olmasından söz ediyorduk. Burada ağırlıklarda hiçbir şey değişmez; metin diziden çıkarılmıştır, o kadar. Biri modelin kalıcı yapısıyla, öbürü tek bir çağrının girdisiyle ilgilidir. Sohbetler arasında taşınan kalıcı bellek fikri ise üçüncü bir şeydir ve 39\. makalenin konusudur.

## İlan edilen sınır ile etkin sınır

Bir sınır satın alınabiliyorsa, ilan edilen sayı ne kadar gerçek?

Cheng-Ping Hsieh ve arkadaşlarının COLM 2024'te sunduğu RULER bu soruyu ölçülebilir hâle getirdi. Uzun bağlam yeteneğini sınamanın yaygın yolu, uzun bir metnin içine tek bir cümle saklayıp modelden onu bulmasını istemekti — "samanlıkta iğne" denen bu sınav yalnızca geri çağırmayı ölçer ve modelleri olduğundan iyi gösterir, çünkü birebir eşleşen bir dizgiyi bulmak bağlamın tamamını kullanmayı gerektirmez.

RULER dört ayrı yetenek ailesinde on üç görev tanımladı. Geri çağırma, iğne sınavının zorlaştırılmış biçimleri: birden çok iğne, birden çok değer, birden çok soru. Çok adımlı izleme, bir değişkenin metin boyunca elden ele geçen değerini takip etmeyi ister. Toplama, bütün girdiyi tarayıp en sık geçen kelimeleri çıkarmayı ister — yani tek bir noktaya bakmakla çözülemez. Dördüncü aile ise uzun metne dayalı soru-cevap. Ardından on yedi modeli farklı uzunluklarda ölçtüler.

Ölçüm için bir eşik gerekiyordu ve seçimleri şeffaf: küçük bir referans modelin 4.000 token'da aldığı puan (85,6) eşik kabul edildi. Bir modelin **etkin bağlam uzunluğu** (effective context length), bu eşiğin üstünde kalabildiği en büyük uzunluktur.

Sonuçlar ilan edilen sayılarla ayrışıyor. Ölçümün yapıldığı tarihte GPT-4, 128.000 token ilan ediyordu ve eşiği 64.000'e kadar koruyabildi. Aynı sayıyı ilan eden Command-R 32.000'de kaldı. 200.000 ilan eden Yi-34B yine 32.000'de kaldı. Mixtral ise ilan ettiği 32.000'i taşıyabildi. Toplu sonuç şu: ölçülen on yedi modelin yalnızca yarısı 32.000 token'da tatmin edici başarı gösterebiliyor — hepsinin ilan ettiği sayı 32.000 ya da daha büyük olmasına rağmen.

![Dört model için ilan edilen pencere uzunluğu ile ölçülen etkin uzunluk üst üste binen çubuklarla gösterilir; açık renkli uzun çubuk ilan edilen sayıyı, üzerine binen koyu çubuk etkin uzunluğu temsil eder. İlk üç satırda iki çubuk arasında belirgin bir fark varken son satırda ikisi tam olarak çakışır.](assets/ilan-edilen-ve-etkin-uzunluk.svg "Şekil 2 — İlan edilen uzunluk bir kapasite değil bir üst sınır")

Şekil 2, 16\. makaledeki disiplinin yeni bir iddiaya uygulanmış hâli. Orada bir puanın hangi görev diliminde, hangi biçimle ve kaç örnekle alındığını sormayı öğrenmiştik. Burada aynı soru şuna dönüşüyor: "128.000 token" hangi görevde ölçüldü? Yalnızca geri çağırmada mı, yoksa o uzunlukta akıl yürütme de gerekiyor muydu?

## Bilgi pencerede nereye konuyor

Uzunluk tek değişken değil. Aynı bilgi, pencerenin farklı yerlerine konduğunda farklı sonuç veriyor.

Nelson Liu ve arkadaşlarının TACL'de yayımladığı çalışma bunu düzenli bir deneyle gösterdi. Modele yirmi belge ve bir soru verdiler; belgelerden yalnızca biri cevabı içeriyordu. Sonra o tek belgenin sırasını değiştirip aynı ölçümü tekrarladılar. İçerik sabit, sıra değişken.

Sonuç bir U eğrisi. Doğru belge başta olduğunda ölçülen model yüzde 75,8 doğruluk veriyor; sonda olduğunda yüzde 63,2; **ortada** olduğunda yüzde 53,8.

Asıl çarpıcı karşılaştırma ise bir sonraki satırda. Aynı modele hiç belge verilmediğinde, yani yalnızca kendi ağırlıklarındaki bilgiyle cevaplamaya bırakıldığında doğruluğu yüzde 56,1. Yani doğru cevabı içeren belgeyi yirmi belgenin ortasına koymak, modele **hiçbir şey vermemekten daha kötü** bir sonuç veriyor. Üst sınırı da görelim: yalnızca doğru belge verildiğinde doğruluk yüzde 88,3.

![Yatay eksende doğru belgenin yirmi belge arasındaki sırası, dikey eksende doğruluk yer alır; eğri başta yüksek başlar, ortada dibe iner ve sonda kısmen toparlanır. İki kesikli yatay çizgi, hiç belge verilmediğindeki ve yalnızca doğru belge verildiğindeki doğruluk düzeylerini işaretler ve ortadaki değerin birincisinin altında kaldığı görünür.](assets/ortadaki-bilgi.svg "Şekil 3 — Aynı bilgi, farklı yer, farklı sonuç")

> **Kendini yokla:** Şekil 3'te doğru belge ortadayken doğruluğun hiç belge vermemenin altına düşmesi neyi gösterir?

İlgisiz metnin nötr olmadığını. Model, önüne konan on dokuz ilgisiz belgeyi görmezden gelemiyor; onlar cevabı ararken dikkatini dağıtıyor ve kendi ağırlıklarından gelebilecek doğru cevabı da bastırıyor. Yani bağlama bir şey eklemek, en kötü ihtimalle etkisiz olmak yerine zararlı olabiliyor.

## Uzunluğun kendisi bir yük

Son bir ölçüm, tabloyu tamamlıyor ve en rahatsız edici olanı.

Mosh Levy, Alon Jacoby ve Yoav Goldberg'in ACL 2024'te sunduğu çalışma, akıl yürütme görevini sabit tutup yalnızca girdinin uzunluğunu değiştirdi. Üç ayrı görev türü, her biri 250'den 3.000 token'a kadar beş uzunluk düzeyinde; eklenen metin görevle ilgisiz dolgu. Yani zorluk aynı, uzunluk farklı.

Bütün modellerde doğruluk düşüyor. Ölçülen en güçlü model 250 token'da görevi kusursuz çözerken 3.000 token'da yaklaşık 0,68 doğruluğa iniyor. Dikkat et: 3.000 token, o modelin ilan edilen sınırının yüzde biri bile değil. Bozulma teknik sınırın çok altında başlıyor.

Çalışmanın kaydettiği başarısızlık biçimleri de öğretici, çünkü hiçbiri "model daha az bildi" demiyor. Girdi uzadıkça modeller cevap vermeyi reddetmeye, iki seçenekten birine sistematik olarak kaymaya ve ara adımları yazmadan önce cevabı söylemeye başlıyor. Yani uzunluk yalnızca doğruluğu düşürmüyor, görevin yapılış biçimini de bozuyor. Dahası, eklenen dolgu görevle ilgili metinden seçildiğinde bile düşüş sürüyor: sorun tek başına ilgisiz metnin dikkat dağıtması değil, uzunluğun kendisi.

Aynı çalışmanın ikinci bulgusu 16\. makaleye doğrudan bağlanıyor ve işareti ters çeviriyor: uzun girdilerde modelin sonraki token tahminindeki başarısıyla akıl yürütme başarısı arasında **negatif** bir ilişki ölçülmüş. Yani 5\. makalede kurduğumuz içsel ölçü, uzun bağlamda yalnızca yetersiz değil, yanıltıcı da olabiliyor.

## Pencereyi kullanma disiplini

Bu üç ölçümden çıkan pratik kurallar, sezgiye aykırı oldukları için değerli.

**Az koy.** Pencereye bir şey eklemenin maliyeti yalnızca token değil; ilgisiz metin doğruluğu düşürüyor. "Ne olur ne olmaz, hepsini vereyim" en kötü stratejilerden biri.

**Nereye koyduğuna dikkat et.** Kritik bilgi başta ya da sonda daha iyi kullanılıyor. Uzun bir belge yığınının ortası, pencerenin en zayıf bölgesi.

**Kısa tut, sonra ölç.** Bozulma ilan edilen sınırın çok altında başlıyor. Kendi görevinde nerede başladığını bilmenin tek yolu, 16\. makaledeki disiplinle ölçmek.

Ölçmenin somut hâli de karmaşık değil. Elinde cevabı bilinen bir örnek kümesi olsun ve aynı görevi artan uzunluklarda — araya ilgisiz metin ekleyerek — çalıştır. Doğruluğun düşmeye başladığı nokta senin gerçek sınırındır ve modelin ilan ettiği sayıyla ilgisi olmayabilir. 16\. makaledeki uyarı burada da geçerli: küçük bir kümede görülen fark gürültü olabilir, dolayısıyla farkın anlamlı sayılıp sayılamayacağı küme büyüklüğüne göre değerlendirilmelidir.

Bu kuralların hiçbiri "uzun bağlam işe yaramaz" demiyor. Dedikleri şu: pencere bir depo değil, bir çalışma masası. Masaya ne koyduğun ve nereye koyduğun, masanın büyüklüğü kadar önemli. Pencereyi büyütmenin teknik yollarını 25\. makalede, üretim maliyetini 26\. makalede, pencereye dışarıdan doğru metni getirmeyi 41\. makalede, sohbetler arası kalıcı belleği ise 39\. makalede ele alacağız.

### Sırada ne var

Bu makale pencerenin geometrisini kurdu: ne kadar yer var, nereye ne konuyor, sınır nereden geliyor. Ama içine ne yazılacağı sorusuna hiç girmedik. Oysa bu alanın en kalabalık halk bilgisi tam orada birikti: modele kibar davranmak, ona bir rol vermek, sihirli cümleler eklemek. Bu iddiaların hangileri ölçüldüğünde ayakta kalıyor?

## Kaynakça

- Press, O., Smith, N. A. & Lewis, M. (2022). *Train Short, Test Long: Attention with Linear Biases Enables Input Length Extrapolation*. ICLR 2022. [Bağlantı](https://openreview.net/forum?id=R8sQPpGCv0)
- Su, J., Ahmed, M., Lu, Y., Pan, S., Bo, W. & Liu, Y. (2024). *RoFormer: Enhanced transformer with Rotary Position Embedding*. Neurocomputing 568, 127063. [Bağlantı](https://doi.org/10.1016/j.neucom.2023.127063)
- Hsieh, C.-P., Sun, S., Kriman, S., Acharya, S., Rekesh, D., Jia, F., Zhang, Y. & Ginsburg, B. (2024). *RULER: What's the Real Context Size of Your Long-Context Language Models?*. COLM 2024. [Bağlantı](https://arxiv.org/abs/2404.06654)
- Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F. & Liang, P. (2024). *Lost in the Middle: How Language Models Use Long Contexts*. Transactions of the ACL 12, s. 157–173. [Bağlantı](https://aclanthology.org/2024.tacl-1.9/)
- Levy, M., Jacoby, A. & Goldberg, Y. (2024). *Same Task, More Tokens: the Impact of Input Length on the Reasoning Performance of Large Language Models*. ACL 2024, s. 15339–15353. [Bağlantı](https://aclanthology.org/2024.acl-long.818/)
