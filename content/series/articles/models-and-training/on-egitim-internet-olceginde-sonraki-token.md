---
article_id: article_6938db00-d07b-4b21-82ea-31f95a10d443
title: "Ön Eğitim: İnternet Ölçeğinde Sonraki Token"
slug: on-egitim-internet-olceginde-sonraki-token
category: models-and-training
level: beginner
reading_order: 8
summary: "2. makaledeki öğrenme döngüsünün trilyonlarca token üzerinde nasıl koştuğunu gösterir: etiketi metnin kendisinin yazdığı öz-denetimli hedef, ham web verisinden derleme giden temizlik hattı ve bir eğitim koşusunun gerçek faturası."
tags:
  - on-egitim
  - oz-denetimli-ogrenme
  - egitim-verisi
  - hesap-butcesi
  - tekillestirme
content_hash: sha256:0000000000000000000000000000000000000000000000000000000000000000
classification_version: 1
classification_batch: 1
---
## Aynı döngü, başka ölçek

7\. makale elimizde çalışan ama bomboş bir mimari bırakarak bitti: bloklar üst üste dizilmiş, dikkat bağlamı tartmaya hazır, ama tek bir parametre bile henüz anlamlı değil. Hedefi 5\. makaleden biliyoruz — her adımda sonraki token üzerinde bir olasılık dağılımı üretmek. Döngüyü de 2\. makaleden biliyoruz: veri girer, model tahmin eder, kayıp yanlışlığı tek bir sayıya indirir, güncelleme adımı parametreleri o sayıyı azaltacak yönde oynatır, sonra baştan.

2\. makale bu makalenin sözünü kelimesi kelimesine vermişti: değişen şey kutuların içeriği olacaktı — veri üç ev yerine trilyonlarca kelime parçası, model tek bir çarpma yerine yüz milyarlarca sayı, kayıp ise ev fiyatı hatası yerine "bir sonraki kelimeyi ne kadar iyi tahmin ettin" ölçüsü. Döngünün şekli değişmeyecekti. Şimdi o sözü tahsil ediyoruz. Bu aşamanın adı ön eğitim (pre-training) ve aşağıda göreceğin her sayı, 2\. makaledeki öğrenme döngüsünün aynısının dev ölçekte koşturulmasından ibarettir.

Bir şey daha aynı kalıyor. 1\. makalede kuralları elle yazmayı denemiş ve daha spam filtresinde tükenmiştik. Ön eğitimde de tek bir kural yazılmaz: yalnızca metin vardır ve tek bir hedef. Değişen şey döngü değil, fatura.

## Cevap anahtarını metin yazıyor

5\. makalede bu hedefin sessiz avantajını söylemiştik: etiketli veri gerektirmez, çünkü her düzgün metin kendi kendinin cevap anahtarıdır. Bunu elle görelim.

Önce sözle: diziyi soldan sağa okursun, her konumda o ana kadarki parçayı girdi, hemen sıradaki token'ı doğru cevap sayarsın. Sekiz token'lık bir cümle bu kuralla sekiz ayrı eğitim örneği verir. Somutlaştıralım — 5\. makaleden tanıdığın cümleyi uzatıyoruz: "Bugün hava çok güzel olduğu için parka gittik." Burada her kelimeyi tek token sayıyoruz; 4\. makaleden biliyoruz ki gerçek bir tokenizer "olduğu"yu birkaç parçaya böler, ama mekanizmayı görmek için bu basitleştirme yeterli.

| Adım | Bağlam (girdi) | Hedef |
|---|---|---|
| 1 | metin başı | Bugün |
| 2 | Bugün | hava |
| 3 | Bugün hava | çok |
| 4 | Bugün hava çok | güzel |
| 5 | Bugün hava çok güzel | olduğu |
| 6 | Bugün hava çok güzel olduğu | için |
| 7 | Bugün hava çok güzel olduğu için | parka |
| 8 | Bugün hava çok güzel olduğu için parka | gittik |

Sekiz token, sekiz hedef. Hiçbirini insan yazmadı.

![Sekiz satırlık merdiven: her satırda soldaki bağlam kutusu bir önceki satıra göre bir token uzar, sağdaki hedef kutusu dizinin sıradaki token'ıdır ve hedefler cümlenin kendisinden kesilir.](assets/oz-denetimli-hedef.svg "Şekil 1 — Tek cümleden sekiz eğitim hedefi")

Şekil 1'deki merdiven bu üretimin neden bedavaya geldiğini gösteriyor: bağlam her satırda bir token uzuyor, hedef bir token kayıyor ve dizinin uzunluğu kadar örnek kendiliğinden ortaya çıkıyor.

Buradaki öğrenme, 2\. makaledeki döngünün ta kendisidir: her girdinin bir doğru cevabı vardır, kayıp o cevaba göre hesaplanır, gradyan inişi parametreleri oynatır. Değişen tek şey, doğru cevabı kimin yazdığıdır — burada kimse yazmaz, cevap metnin kendisinden kesilir. Bu yüzden buna öz-denetimli öğrenme (self-supervised learning) denir; denetimsiz öğrenme değildir, çünkü hedef gayet bellidir. Üçüncü bir öğrenme türü icat etmiyoruz: bu, 1\. makalede kurulan denetimli öğrenmenin etiket maliyeti sıfıra inmiş hâlidir.

> **Kendini yokla:** Ön eğitim için tek bir insan hiçbir veriyi etiketlemedi. O hâlde modelin öğrendiği "doğru cevap" nereden geliyor?

Metnin kendisinden. Her token, kendinden öncekiler için doğru cevaptır; model bağlamı görür, sıradakini tahmin eder, sonra gerçekleşen token'ı cevap anahtarı olarak kullanır. Etiketleme maliyeti sıfır olduğu için veriyi sınırlayan şey insan emeği değil, yalnızca metnin varlığıdır.

Şimdi ölçeğe çıkaralım. Meta'nın 2024 tarihli Llama 3 raporuna göre eğitimin son aşamasında dizi uzunluğu 8.192 token, tek adımda işlenen yığın (batch) ise 16.777.216 token. Bölelim: 16.777.216 ÷ 8.192 = 2.048 dizi ve 2.048 × 8.192 = 16.777.216 hedef. Yani tek bir güncelleme adımında 16 milyondan fazla "sonraki token" tahmini yapılıyor, hepsinin kaybı ortalanıyor ve ortaya tek bir gradyan çıkıyor.

Tarihsel bir not: alan bu fikre uzun süre "öz-denetimli" demedi. Alec Radford ve arkadaşlarının 2018'de tanıttığı GPT-1, yöntemini "etiketlenmemiş metinden oluşan çeşitli bir derlem üzerinde üretici ön eğitim" diye tarif eder; bir yıl sonraki GPT-2 raporunun başlığı ise doğrudan "denetimsiz" sözcüğünü taşır. Terim sonradan kaydı, mekanizma değil. İkisi de OpenAI'ın kendi teknik raporlarıdır ve hakemli yayın değildir.

## Ham cevherden derleme

Peki bu hedefi besleyecek metin nereden geliyor? Çoğunlukla tek bir yerden: Common Crawl, 2008'den beri düzenli toplanan ücretsiz ve açık bir web arşivi. Tek bir aylık dökümü bile büyüktür; Ekim 2025 arşivi 2,61 milyar sayfa ve sıkıştırılmamış hâlde 468 TiB içerik taşıyor. Ama bu yığın olduğu gibi kullanılamaz. İçindekilerin büyük kısmı gezinti menüsü, çerez uyarısı, otomatik üretilmiş spam ve tekrardır.

Common Crawl bir maden ocağıysa, C4 ve FineWeb gibi derlemler farklı zenginleştirme tesisleridir. Benzetmenin bozulduğu yer şurası: madende değerli olan şey nesnel biçimde ölçülebilir, oysa metinde "kalite"nin nesnel bir ölçüsü yoktur ve her ekip kendi kural setini kurar — C4 süslü parantez içeren her sayfayı kod diye atarken Dolma ve The Pile kodu kasten içerir. Benzetmenin biçimsel karşılığı ise şudur: filtreleme hattı bir dizi sezgisel kuraldan ve eğitilmiş sınıflandırıcıdan ibarettir, "iyi veri"nin tanımı ampiriktir ve ancak deneyle sınanır.

Colin Raffel ve arkadaşlarının 2020'de yayımladığı T5 çalışması bu hattın ders kitabı örneğidir, çünkü kurallarını tek tek yazmıştır: yalnızca nokta, ünlem ya da soru işaretiyle biten satırları tut; üç cümleden kısa sayfaları at; "lorem ipsum" geçen sayfaları at; "kullanım koşulları" ve "çerez politikası" satırlarını sil; İngilizce olma olasılığı 0,99'un altındaki sayfaları çıkar. Sonuç: aylık yaklaşık 20 TB ham metinden geriye yaklaşık 750 GB kaldı. Oranı hesaplayalım: 750 ÷ 20.000 = 0,0375, yani yüzde 3,75 — her 27 GB'ın yalnızca 1 GB'ı. Aynı iş 2024'te Dolma ekibi tarafından tekrar yapıldı ve yaklaşık 200 TB ham metinden 11 TB'lık bir derlem çıktı, yani yüzde 5,75. İki bağımsız ekip, farklı yıllarda, farklı reçetelerle ham web verisinin yaklaşık yüzde 95'ini atıyor.

![Yukarıdan aşağıya daralan huni: tek bir aylık web arşivinden metin çıkarma, dil filtresi, kalite filtreleri, tekilleştirme ve karışım ağırlıkları aşamalarından geçildikçe veri küçülür ve her aşamanın yanında ölçülmüş büyüklükler durur.](assets/veri-hunisi.svg "Şekil 2 — Ham web verisinden eğitim token'larına")

Şekil 2 bu daralmayı aşama aşama gösteriyor. Bugün elimizdeki açık derlemler bu hattın çıktılarıdır: C4 yaklaşık 750 GB, The Pile 825 GiB'lık 22 alt kümeden oluşan bir karışım, Dolma 3.059 milyar token, FineWeb ise 96 Common Crawl anlık görüntüsünden damıtılmış 15 trilyon token. Bunlardan Dolma ve FineWeb hakemli konferans yayınlarıdır; The Pile hakem sürecinden geçmemiş bir ön baskıdır.

Hattın en sessiz ama en önemli adımı tekilleştirmedir (deduplication). Katherine Lee ve arkadaşlarının 2022'deki çalışması bunun neden süs olmadığını ölçtü: C4'ün içinde 61 kelimelik tek bir cümle 60.000'den fazla kez geçiyordu. Çarpalım: 61 × 60.000 = 3.660.000 kelime, yani yüz bin kelimelik kitap ölçüsüyle 36 kitap dolusu aynı cümle. Aynı çalışma, tekilleştirilmemiş veriyle eğitilen modellerin istemsiz çıktılarının yüzde 1'inden fazlasının eğitim verisinden birebir kopya olduğunu, tekilleştirmeden sonra ezberlenmiş metin üretme sıklığının on kata kadar düştüğünü gösterdi.

"Öyleyse ne kadar çok atarsan o kadar iyi" diye düşünme. FineWeb ekibi 96 anlık görüntünün tamamı arasında küresel tekilleştirme yapınca elde 4 trilyon token kaldı, ama bu veriyle eğitilen model tekilleştirilmemiş veriyle eğitilene göre neredeyse hiç iyileşmedi; her anlık görüntüyü ayrı ayrı tekilleştirip 20 trilyon token bırakmak daha iyi sonuç verdi. Ne çok atmak ne çok tutmak kendiliğinden doğrudur. Temizlik hattının ayrıntısı 14. makalenin konusu.

## Aynı veriyi kaç kez okumalı?

Derlemi kurdun; şimdi ondan ne kadar okuyacağına karar vermen gerekiyor. Bu iki ayrı sayıdır ve karıştırılır.

Tom Brown ve arkadaşlarının 2020 tarihli GPT-3 çalışması bunu açıkça gösteriyor. Havuzdaki beş kaynağın toplamı 499 milyar token'dı, ama eğitim bütçesi 300 milyar token'dı — yani model havuzun tamamını bir kez bile okumadı. Buna karşılık bazı kaynakları defalarca okudu. Wikipedia hesabı bir satır: bütçenin yüzde 3'ü Wikipedia'dan çekildiyse 300.000.000.000 × 0,03 = 9 milyar token demektir, oysa Wikipedia havuzunda yalnızca 3 milyar token vardı; 9 ÷ 3 = 3, yani Wikipedia üç kez baştan sona okundu. Common Crawl'da tam tersi: 300.000.000.000 × 0,60 = 180 milyar token çekildi ama havuzda 410 milyar vardı, 180 ÷ 410 = 0,44. Devasa ve gürültülü kaynağın yarısı bile okunmadı.

Verinin üzerinden bir tam geçişe epok (epoch) denir ve yukarıdaki iki hesap, epok sözcüğünün "veri bir kez okundu" anlamına gelmediğini gösterir. Hangi kaynaktan kaç kez okunacağı, veri karışımı (data mixture) denen ve elle verilen bir tasarım kararıdır; çalışmanın kendi tablosu bu ağırlıkların veri kümesi boyutuyla orantılı olarak **kasten** belirlenmediğini yazar. Bir dürüstlük notu borçluyuz: aynı tablonun ağırlıkları toplamda yüzde 101 ediyor ve iki satırı kendi içinde tutmuyor. Bu, yayımlanmış çalışmanın bilinen bir iç tutarsızlığıdır; yukarıdaki iki hesabı tutarlı olan satırlarla yaptık.

> **Kendini yokla:** Aynı metni modele on kez göstermekle, on kat daha fazla farklı metin göstermek arasındaki fark nedir?

İkincisi yeni bilgi ekler, birincisi eklemez. Üstelik birincisi 2\. makaledeki aşırı öğrenme riskini büyütür: model örüntüyü değil, o metnin kendisini yeniden üretmeye yaklaşır. Bu yüzden verinin tekrarı bedava bir çarpan değil, bir bütçe kararıdır.

## Doksan bin yıllık okuma

Trilyon sözcüğü hiçbir şey ifade etmiyor. Somutlaştıralım — ama önce varsayımları açık açık masaya koyalım, çünkü bu hesabın öğretici değeri tam olarak varsayımların görünür olmasından geliyor.

Birincisi veri: Llama 3'ün ön eğitim derlemi 15,6 trilyon token; yuvarlak hesap için 15 trilyon alıyoruz. İkincisi token'dan kelimeye geçiş: Dolma'nın kendi tablosundan 11.519×10⁹ bayt ÷ 3.059×10⁹ token = 3,77 bayt/token çıkıyor ve ortalama bir İngilizce kelimeyi ardındaki boşlukla birlikte 5 karakter sayarsak 3,77 ÷ 5 = 0,75 kelime/token buluruz. Bu oran İngilizce metin için geçerlidir; 4\. makalede gördüğümüz gibi Türkçede aynı içerik kabaca iki katı token tutar, yani Türkçe bir derlemde token başına düşen kelime sayısı belirgin biçimde daha azdır. Üçüncüsü okuma hızı: Marc Brysbaert'in 190 çalışmayı ve 18.573 katılımcıyı birleştiren 2019 tarihli meta-analizine göre yetişkinler İngilizce kurgu dışı metni sessiz okurken dakikada ortalama 238 kelime ilerliyor.

Şimdi çarpalım ve bölelim; ara adımların hepsi burada:

| Dönüşüm | İşlem | Sonuç |
|---|---|---|
| token → kelime | 15.000.000.000.000 × 0,75 | 11.250.000.000.000 kelime |
| kelime → dakika | 11.250.000.000.000 ÷ 238 | 47.268.907.563 dakika |
| dakika → saat | 47.268.907.563 ÷ 60 | 787.815.126 saat |
| saat → gün | 787.815.126 ÷ 24 | 32.825.630 gün |
| gün → yıl | 32.825.630 ÷ 365 | 89.933 yıl |

Yani hiç durmadan, uyumadan, günde yirmi dört saat okuyan bir insan yaklaşık doksan bin yılda bitirirdi. Günde sekiz saat okursa, yılda 2.920 saat eder: 787.815.126 ÷ 2.920 = 269.800 yıl. Kelime/token oranını 0,65 alsak sonuç yaklaşık 78 bin, 0,80 alsak yaklaşık 96 bin yıl çıkar; yani makul aralıkta oynatmak büyüklük mertebesini değiştirmiyor. Söylenebilecek dürüst cümle şu: on binlerce yıl.

Benzetmenin bozulduğu yer tam burası ve hemen söylenmeli: model okumaz. İnsan okurken anlar, sorgular, önceki bilgisiyle çelişkiye düşer, kenara not alır, unutur ve hatırlar; model her token'da tek bir şey yapar, sıradakini tahmin eder ve hatası kadar ayarlanır. Benzetmenin biçimsel karşılığı ise şudur: 15 trilyon token, 15 trilyon kez uygulanmış bir tahmin-ve-düzelt işlemidir; buradaki dakikada 238 kelime yalnızca büyüklüğü hissettirmek için kullanılan bir cetveldir.

Aynı hesabı 2020'nin GPT-3'ü için tekrarlayalım. Onun 300 milyar token'ı 225.000.000.000 kelime eder; aynı zincirden geçirince 945.378.151 dakika, 15.756.303 saat, 656.513 gün ve nihayet 1.799 yıl çıkar — yaklaşık bin sekiz yüz yıl. Bir iç tutarlılık kontrolü hesabın uydurma olmadığını gösterir: token oranı 15 trilyon ÷ 300 milyar = 50 ve yıl oranı 89.933 ÷ 1.799 da 50 çıkıyor. Dört yılda elli kat.

## Bir koşunun anatomisi

Peki bu kadar token, döngünün içinden nasıl geçiyor? Adım adım. Tek bir adımda bir yığın token işlenir, kayıp ortalanır, gradyan hesaplanır ve parametreler oynatılır — 2\. makaledeki mini yığın fikrinin dev hâli. Llama 3'ün kosinüs çizelgesi 1.200.000 adım üzerinden kuruludur; her adımda 16 milyondan fazla tahmin olduğunu biraz önce hesaplamıştık.

Bir şey değişiyor: öğrenme oranı artık sabit değil. 2\. makalede öğrenme oranı veriden öğrenilmeyen sabit bir hiperparametreydi; ön eğitimde ise bir çizelgeye bağlıdır. GPT-3'te ilk 375 milyon token boyunca oran sıfırdan tepe değerine doğrusal olarak çıkar — buna ısınma denir — sonra 260 milyar token boyunca kosinüs eğrisiyle tepe değerinin yüzde 10'una iner ve orada kalır. Sezgisi basit: en baştaki rastgele ağırlıklarda büyük adımlar atmak koşuyu devirir, sonlara doğru büyük adımlar atmak da bulunan iyi bölgeyi terk eder.

![Öğrenme oranı eğrisi: işlenen token arttıkça oran önce kısa bir doğrusal ısınmayla tepe değerine çıkar, ardından uzun bir kosinüs sönümüyle tepe değerinin yüzde onuna iner ve orada düz kalır.](assets/ogrenme-orani-cizelgesi.svg "Şekil 3 — Isınma ve kosinüs sönümü")

Şekil 3'teki eğrinin asimetrisi meselenin kendisi: ısınma çok kısa, sönüm çok uzundur.

Bir de işin bölüşülmesi var. Llama 3, on altı bin grafik işlemcisine kadar çıkan bir kümede eğitildi ve iş dört ayrı eksende bölündü: veri, ağırlık tensörleri, katmanlar ve bağlam. Fabrika benzetmesiyle: veriyi bölmek, aynı montaj hattının binlerce kopyasını kurup her birine farklı kutular vermek ve vardiya sonunda öğrenilenleri ortaklaştırmaktır; modeli bölmek ise hattın kendisinin tek binaya sığmayıp parçalarının ayrı binalara dağıtılmasıdır. Benzetmenin bozulduğu yer şurası: fabrikada binalar arası taşıma yavaşlatıcı bir ayrıntıdır, burada ise işlemciler arası iletişim baskın maliyet kalemidir ve her adımda herkes herkesi beklemek zorundadır — o kadar ki veri merkezinin elektrik çekişi onlarca megavat mertebesinde anlık dalgalanır. Benzetmenin biçimsel karşılığı ise şudur: veri paralelliğinde her işlemci aynı ağırlıkların bir kopyasını tutup farklı yığın parçası üzerinde gradyan hesaplar ve gradyanlar toplanır; model paralelliğinde tek bir ağırlık matrisi ya da katman yığını işlemcilere bölünür.

Bedavaya gelmiyor. Llama 3 ekibinin kendi ölçümüne göre donanımın teorik kapasitesinin ancak yüzde 41 ile 43'ü fiilen kullanılabildi.

> **Kendini yokla:** 2\. makalede üç ev üzerinde çalıştırdığımız döngüyle ön eğitim arasında mekanik bir fark var mı?

Yok. Veri girer, model tahmin eder, kayıp yanlışlığı tek sayıya indirir, gradyan inişi parametreleri oynatır. Değişen şey ölçek — üç örnek yerine trilyonlarca token, bir parametre yerine milyarlarca — ve ölçekten doğan mühendislik. Döngünün şekli aynı.

### İleri okuma notu: optimizatörün adı

Ön eğitimde kullanılan güncelleme kuralının adı genellikle AdamW'dir: yaygın kullanılan Adam optimizatörünün, ağırlık sönümünü gradyan adımından ayıran sürümü. İkisinin eşdeğer olduğu sanılıyordu; Ilya Loshchilov ve Frank Hutter uyarlamalı optimizatörlerde eşdeğer olmadığını gösterdi. Fikir yine 2\. makaledeki gradyan inişidir, adım boyunu geçmişe bakarak ayarlayan bir sürümü.

## Faturayı kaba hesapla

Şimdi hesap bütçesine (compute budget) gelelim. Birimi FLOP, yani kayan noktalı tek bir işlem.

Önce sözle: ileri geçişte her aktif parametre, her token için yaklaşık iki işlem yapar; geri geçiş bunun kabaca üç katıdır. Toplam: parametre başına, token başına altı işlem. Sembolle, N parametre sayısı ve D token sayısı olmak üzere toplam hesap ≈ 6 × N × D. Sayı koyalım. GPT-3 için 6 × 174.600.000.000 × 300.000.000.000 = 6 × 5,238×10²² = 3,14×10²³ FLOP; çalışmanın kendi tablosunda yazan değer de 3,14×10²³. Llama 3 için 6 × 405.000.000.000 × 15.600.000.000.000 = 6 × 6,318×10²⁴ = 3,79×10²⁵; raporun verdiği değer 3,8×10²⁵. Bu kaba bir kestirimdir; bazı ekipler hesabı biraz farklı sayar, o yüzden yayımlanan FLOP değerleriyle yüzde on mertebesinde sapmalar görülür.

| Model | Yıl | Parametre | Eğitim token'ı | Toplam hesap (FLOP) |
|---|---|---|---|---|
| GPT-3 | 2020 | 175 milyar | 300 milyar | 3,14×10²³ |
| OPT-175B | 2022 | 175 milyar | 180 milyar | ~4,30×10²³ (başarısız koşular dâhil toplam) |
| Llama 3 405B | 2024 | 405 milyar | 15,6 trilyon | 3,8×10²⁵ |

İki uç arasındaki oran 3,8×10²⁵ ÷ 3,14×10²³ = 121. Dört yılda tek bir eğitim koşusunun hesabı 121 katına çıkmış.

Bunun enerji karşılığı da ölçüldü: David Patterson ve arkadaşlarının hesabına göre GPT-3'ün eğitimi 10.000 çipte 14,8 gün sürdü, 1.287 MWh elektrik harcadı ve 552,1 ton karbondioksit eşdeğerine karşılık geldi. Not düşelim: bu bir tahmindir ve hakem sürecinden geçmemiş bir ön baskıdan gelir; aynı model için başka bir ekibin tahmini 500 tondur.

Bir mit düzeltmesi de tam buraya düşüyor. Popüler anlatı "GPT-3, 45 TB veriyle eğitildi" der. Birincil kaynağa bakalım: 45 TB, filtrelemeden **önceki** sıkıştırılmış düz metnin miktarıdır; filtrelemeden sonra 570 GB kalmıştır ve model bunun bile tamamını görmemiştir. Dürüst cümle şu: model 300 milyar token işledi ve interneti okumadı.

## Eğitim bozulur

Bu işin düğmeye basılıp beklenen bir işlem olduğunu düşünme.

Meta'nın Llama 3 raporu 54 günlük bir kesitte 466 iş kesintisi bildiriyor; bunların 47'si planlıydı, kalan 419'u beklenmedik. Beklenmedik kesintilerin yaklaşık yüzde 78'i donanım kaynaklıdır: 148 arızalı grafik işlemcisi, 72 bellek arızası, 54 yazılım hatası, 35 ağ sorunu. Yine de aynı ekip bu dönemde yalnızca üç kez elle müdahale gerektiğini ve etkin eğitim süresinin yüzde 90'ın üzerinde kaldığını yazıyor. Arıza olağan, durmak değil.

Durmamayı mümkün kılan şeyin adı kontrol noktasıdır (checkpoint): ağırlıkların belirli aralıklarla diske yazılan kopyası. Meta'nın 2022'de OPT-175B eğitimi için tuttuğu günlük bunun ne işe yaradığını çıplak biçimde gösteriyor. Kayıp ıraksadığında ekip öğrenme oranını düşürüp daha eski bir kontrol noktasından yeniden başlatmış; iki ay içinde en az 35 kez elle yeniden başlatma yapılmış ve yüzden fazla makine devre dışı bırakılmış. En sert kayıt 21 Aralık'a ait: bulut sağlayıcının destek ekibi kümenin tamamını yanlışlıkla silmiş.

GPT-3 çalışmasının kendi itirafı da aynı ölçeğin yüzünü gösteriyor. Yazarlar filtrelemedeki bir hatanın bazı örtüşmeleri gözden kaçırdığını, ama eğitimin maliyeti yüzünden modeli yeniden eğitmenin mümkün olmadığını yazar. Bu ölçekte bilinen bir hata bile düzeltilemiyor.

Bu bölümdeki sayıların kaynağı hakkında bir dürüstlük notu: hepsi şirketlerin kendi teknik raporlarından ve eğitim günlüklerinden geliyor ve hiçbiri hakemli yayın değil. Bu makalenin en çok sayı çektiği kaynak olan Llama 3 raporu da bir ön baskıdır. Yine de bunlar birincil kayıtlardır; bu ölçekte eğitim yapan ekiplerin sayısı azdır ve anlatan başka kimse yoktur.

## Elde edilen şey bir metin tamamlayıcı

Koşu bitti. Elimizde ne var?

Adı temel model (base model). Yaptığı iş, kendisine verilen bağlamın en olası devamını üretmektir — 5\. makalede tanımladığımız anlamda bir sonraki token tahmincisi, hepsi bu. "Soruyu cevapla", "talimatı yerine getir", "kibar ol" gibi davranışlar bu dağılımın kendiliğinden özellikleri değildir. GPT-1'in özeti bunu zaten iki aşamalı bir yapı olarak kurmuştu: önce üretici ön eğitim, sonra göreve özgü ikinci bir aşama. O ikinci yarı 11–13. makalelerin konusu.

Kapatmadan önce bir gerilimi işaretleyelim. Model eğitim verisini bir veritabanı gibi saklamaz; sakladığı şey parametrelerdir. Ama "hiçbir şey ezberlemez" iddiası da yanlış: Nicholas Carlini ve arkadaşlarının 2023 tarihli hakemli çalışması, 6 milyar parametreli GPT-J modelinin eğitim derlemi The Pile'ın en az yüzde 1'ini birebir üretebilecek biçimde ezberlediğini ölçtü. İkisi birden doğrudur ve tam olarak bu gerilim 18. ve 72. makalelerin konusu olacak.

### Sırada ne var

Ön eğitim bittiğinde elinde iki şey kalıyor: bir kayıp değeri ve bir fatura. Fatura da tek kalem değil — aynı parayı iki farklı şekilde harcayabilirsin, ya modeli büyütürsün ya veriyi. 2\. makalenin ileri okuma notunda ölçeğin klasik eğriyi bozabildiğini görmüş ve o tartışmayı ölçek yasalarına ertelemiştik; randevu bir sonraki makalede. Peki bu paylaştırmanın bilinen bir cevabı var mı, yoksa iş deneme yanılmaya mı kalıyor?

## Kaynakça

- Grattafiori, A. ve ark. (2024). *The Llama 3 Herd of Models*. Meta AI teknik raporu (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2407.21783)
- Radford, A., Narasimhan, K., Salimans, T. & Sutskever, I. (2018). *Improving Language Understanding by Generative Pre-Training*. OpenAI teknik raporu (hakemli değildir). [Bağlantı](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)
- Radford, A., Wu, J., Child, R., Luan, D., Amodei, D. & Sutskever, I. (2019). *Language Models are Unsupervised Multitask Learners*. OpenAI teknik raporu (hakemli değildir). [Bağlantı](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
- Common Crawl. *Overview*. commoncrawl.org (kurumsal birincil kayıt). [Bağlantı](https://commoncrawl.org/overview)
- Common Crawl (2025). *October 2025 Crawl Archive Now Available*. commoncrawl.org blog (kurumsal birincil kayıt). [Bağlantı](https://commoncrawl.org/blog/october-2025-crawl-archive-now-available)
- Raffel, C., Shazeer, N., Roberts, A., Lee, K., Narang, S., Matena, M., Zhou, Y., Li, W. & Liu, P. J. (2020). *Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer*. Journal of Machine Learning Research, 21(140), 1–67. [Bağlantı](https://www.jmlr.org/papers/v21/20-074.html)
- Soldaini, L. ve ark. (2024). *Dolma: an Open Corpus of Three Trillion Tokens for Language Model Pretraining Research*. ACL 2024. [Bağlantı](https://arxiv.org/abs/2402.00159)
- Gao, L. ve ark. (2020). *The Pile: An 800GB Dataset of Diverse Text for Language Modeling*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2101.00027)
- Penedo, G., Kydlíček, H., Ben Allal, L., Lozhkov, A., Mitchell, M., Raffel, C., Von Werra, L. & Wolf, T. (2024). *The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale*. NeurIPS 2024, Datasets and Benchmarks Track. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2024/hash/370df50ccfdf8bde18f8f9c2d9151bda-Abstract-Datasets_and_Benchmarks_Track.html)
- Lee, K., Ippolito, D., Nystrom, A., Zhang, C., Eck, D., Callison-Burch, C. & Carlini, N. (2022). *Deduplicating Training Data Makes Language Models Better*. ACL 2022, s. 8424–8445. [Bağlantı](https://aclanthology.org/2022.acl-long.577/)
- Brown, T. B. ve ark. (2020). *Language Models are Few-Shot Learners*. NeurIPS 2020 (arXiv:2005.14165). [Bağlantı](https://arxiv.org/abs/2005.14165)
- Brysbaert, M. (2019). *How many words do we read per minute? A review and meta-analysis of reading rate*. Journal of Memory and Language, 109, 104047. [Bağlantı](https://doi.org/10.1016/j.jml.2019.104047)
- Loshchilov, I. & Hutter, F. (2019). *Decoupled Weight Decay Regularization*. ICLR 2019. [Bağlantı](https://arxiv.org/abs/1711.05101)
- Patterson, D., Gonzalez, J., Le, Q., Liang, C., Munguia, L.-M., Rothchild, D., So, D., Texier, M. & Dean, J. (2021). *Carbon Emissions and Large Neural Network Training*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2104.10350)
- Zhang, S. ve ark. (2022). *OPT: Open Pre-trained Transformer Language Models*. Meta AI teknik raporu (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2205.01068)
- Meta AI (2022). *OPT-175B Chronicles (eğitim günlüğü)*. metaseq deposu (hakemlenmemiş birincil kayıt). [Bağlantı](https://github.com/facebookresearch/metaseq/tree/main/projects/OPT/chronicles)
- Carlini, N., Ippolito, D., Jagielski, M., Lee, K., Tramèr, F. & Zhang, C. (2023). *Quantifying Memorization Across Neural Language Models*. ICLR 2023. [Bağlantı](https://arxiv.org/abs/2202.07646)
