---
article_id: article_963a38f0-e30b-40ce-8bf4-a90226c8b4dc
title: "KV Cache ve Çıkarım Ekonomisi"
slug: kv-cache-ve-cikarim-ekonomisi
category: reasoning-and-memory
level: intermediate
reading_order: 26
summary: "Üretimin maliyet yapısını kurar: anahtar-değer önbelleğinde tam olarak neyin saklandığı ve boyutunun nasıl hesaplandığı, ön dolum ile adım adım üretimin neden bambaşka kaynaklara takıldığı, önbelleğin ağırlıkları geçebilen bellek yükü ve bu yükü küçültmenin iki yolu — anahtar-değer başlarını paylaşmak ve belleği sayfalara bölmek."
tags:
  - anahtar-deger-onbellegi
  - on-dolum
  - bellek-bant-genisligi
  - gruplandirilmis-sorgu-dikkati
  - sayfali-dikkat
content_hash: sha256:d31d3e9409f0246eb0abbca722175f9e3835db53609665e6eda47fcff150876c
classification_version: 1
classification_batch: 5
---
## Sohbetin faturası

21\. makalede küçük bir hesap yapmıştık. Her turu yaklaşık 500 token tutan bir sohbette onuncu turda model 5.000 token okur; ama sohbetin tamamı boyunca işlediği girdinin toplamı 500 × (1 + 2 + … + 10) = 27.500 token'dır. Model durumsuz olduğu için her tur bütün geçmişi baştan görür ve maliyet tur sayısıyla karesel büyür.

Aynı makalede bu hesabın bir kaçamağı olduğunu da söylemiştik: önceki token'ların ara hesapları saklanıp yeniden kullanılabilir. Buna anahtar-değer önbelleği demiş, maliyet yapısını buraya bırakmıştık. 25\. makalede ise dikkat hesabının karesel doğasının hiçbir teknikle ortadan kalkmadığını gördük.

Bu makale o iki ipi birleştiriyor. Üç soru: önbellekte tam olarak ne saklanıyor, bir çağrının maliyeti hangi kaynağa takılıyor, ve uzun sohbetler faturayı neden bu kadar hızlı büyütüyor?

## Önbellekte ne var

6\. ve 7\. makalede kurduğumuz hattı hatırla. Her token, her katmanda ve her dikkat başında üç vektöre dönüşür: sorgu, anahtar ve değer. Dikkat, güncel token'ın sorgusunu önceki bütün token'ların anahtarlarıyla karşılaştırır ve değerleri o ağırlıklarla toplar.

Kritik gözlem şu: 7\. makaledeki nedensel maske yüzünden bir token'ın anahtarı ve değeri, kendisinden **sonra** gelen token'lardan etkilenmez. Yani ilk token'ın anahtarı, dizinin onuncu adımında da beşinci adımdakiyle birebir aynıdır. Aynı hesabı her adımda yeniden yapmak saf israftır.

Çözüm sade: her token'ın anahtar ve değer vektörleri bir kez hesaplanıp saklanır, sonraki adımlarda okunur. Saklanmayan tek şey sorgudur — çünkü her adımda yalnızca yeni token'ın sorgusuna ihtiyaç vardır.

![Solda katmanlar boyunca dizilmiş token sütunları gösterilir; her hücrede o token için saklanan anahtar ve değer vektörleri vardır ve bunlar dolu kutularla işaretlenmiştir. Sağdaki yeni token yalnızca kendi sorgu vektörünü üretir ve okla bütün önceki hücrelere bağlanır; sorgu vektörünün saklanmadığı belirtilir. Altta önbellek boyutunun formülü verilir: iki çarpı katman sayısı çarpı anahtar-değer başı sayısı çarpı baş boyutu çarpı sayı başına bayt.](assets/onbellekte-ne-saklanir.svg "Şekil 1 — Saklanan şey anahtarlar ve değerler")

Şekil 1'deki formül bu makalenin geri kalanının anahtarı. Bir token için saklanan bayt sayısı şudur: 2 (anahtar ve değer) × katman sayısı × anahtar-değer başı sayısı × baş boyutu × sayı başına bayt.

Somut bir örnek yapalım. Anahtar-değer başı sayısı ile baş boyutunun çarpımı, modelin iç genişliğini verir; başların hepsi kendi çiftini tutuyorsa bu çarpım doğrudan model genişliğidir. On üç milyar parametreli, 40 katmanlı ve 5.120 birim genişliğinde bir modelde, 16 bitlik sayılarla bir token'ın maliyeti 2 × 5.120 × 40 × 2 = 819.200 bayt, yani yaklaşık 800 kilobayt. Bu modelin 2.048 token'lık bir dizisi için önbellek **1,6 gigabayt** tutar. Tek bir kullanıcı, tek bir istek için.

Şimdi bunu ağırlıkların yanına koy. Aynı modeli 40 gigabaytlık bir kartta çalıştırırken ağırlıklar belleğin yaklaşık yüzde 65'ini, yani 26 gigabaytını kaplar. Ağırlıklar sabittir: kaç kullanıcıya hizmet verirsen ver bir kez yüklenir. Önbellek ise **kullanıcı başınadır**. Geriye kalan bellek, aynı anda kaç isteğe hizmet verilebileceğini doğrudan belirler.

## Önbellek neyi çözüyor, neyi çözmüyor

Girişteki 27.500 token'lık hesaba dönelim, çünkü önbelleğin ne kazandırdığını en net orada görüyoruz.

Önbellek yoksa, onuncu turda modelin önündeki 5.000 token'ın tamamı sıfırdan işlenir; on tur boyunca toplam 27.500 token'lık iş çıkar. Sunucu bir turdan diğerine önbelleği elinde tutabiliyorsa durum değişir: onuncu turda yalnızca **yeni** eklenen 500 token için anahtar ve değer hesaplanır, önceki 4.500 token'ınki hazırdır. On tur boyunca toplam iş 5.000 token'a iner. Karesel büyüyen bir maliyet, doğrusala düşmüş olur.

Ama bu kazanç, dikkatin kendisini ucuzlatmıyor. Her yeni token, dikkat hesabında önündeki **bütün** anahtarlarla karşılaştırılmak zorunda; dizi uzadıkça bir token üretmenin maliyeti de uzunlukla doğrusal artar. Bir sohbetin tamamı boyunca toplandığında bu yine karesel bir toplam verir. 25\. makaledeki cümle burada da geçerli: kare hâlâ kare. Önbelleğin sildiği şey **yeniden hesaplama**; taşımaya devam ettiği şey dikkatin kendi maliyeti.

Bir de saklama koşulu var. Önbellek bir turdan diğerine ancak sunucu onu bellekte tutuyorsa işe yarar. Belleğin dolduğu ve isteklerin farklı makinelere dağıldığı gerçek sistemlerde bu her zaman garanti değil; bir sohbetin önbelleği atıldığında bir sonraki tur bütün geçmişi yeniden işler.

## Aynı çağrının iki bambaşka aşaması

Bir çağrının maliyetini tek bir sayıyla anlatmak yanıltıcı, çünkü içinde birbirine hiç benzemeyen iki aşama var. Reiner Pope ve arkadaşlarının MLSys 2023'te sunduğu çalışma bu ikisini ayırıp adlandırıyor.

**Ön dolum** (prefill): istemin tamamı bir kerede işlenir. Bütün token'lar aynı anda mevcut olduğu için model tek bir ileri geçişte hepsini paralel işler ve önbelleği doldurur.

**Adım adım üretim** (decode): cevap token token üretilir ve her adım bir öncekinin çıktısına bağlıdır. 10\. makaledeki otoregresif döngünün ta kendisi. Bir not: orada "kod çözme" dediğimiz şey her adımda dağılımdan token seçen kuraldı; burada aynı İngilizce sözcük aşamanın kendisini adlandırıyor.

İki aşamanın performans karakteri taban tabana zıt ve sebebi basit bir muhasebe.

N parametreli bir modelin bir token için yaptığı iş yaklaşık 2N işlemdir — 8\. makaledeki 6ND kuralının ileri geçişe düşen payı. Ama o işi yapabilmek için, ağırlıkların tamamının yavaş bellekten hesap çekirdeklerine taşınması gerekir; 16 bitlik sayılarla bu 2N bayttır.

Ön dolumda bu taşıma bir kez yapılır ve yüzlerce token için kullanılır; iş bol, taşıma az. Adım adım üretimde ise her token için ağırlıkların tamamı yeniden okunur ve karşılığında yalnızca **bir** token'lık iş yapılır.

![İki aşama yan yana gösterilir. Solda ön dolum: istemin bütün token'ları tek bir geniş blok hâlinde aynı anda işlenir ve altında bu aşamanın hesap gücüyle sınırlandığı yazılıdır. Sağda adım adım üretim: art arda dizilmiş küçük kutular, her biri bir token, aralarında oklar vardır ve altında bu aşamanın bellek bant genişliğiyle sınırlandığı yazılıdır. Her panelin altında o aşamanın önbellekle ilişkisi de yazılıdır: ön dolum önbelleği doldurur, üretim her adımda onu okur ve büyütür.](assets/on-dolum-ve-uretim.svg "Şekil 2 — Aynı model, iki farklı darboğaz")

Şekil 2'deki ayrımı sayıyla görelim. Aynı çalışmanın kullandığı hızlandırıcı, saniyede 275 trilyon işlem yapabiliyor ve yavaş belleğinden saniyede 1.200 gigabayt okuyabiliyor. Bu iki sayının oranı, çipin okuduğu her bayt için kaç işlem yapabileceğini söyler: 275 ÷ 1,2 ≈ **229 işlem**.

Şimdi adım adım üretimde ne yapıldığına bakalım. Aynı anda kaç isteğe hizmet verdiğine yığın büyüklüğü diyelim. Ağırlıklar bir kez okunur ve yığındaki her istek için birer token üretilir. Yani okunan her 2 bayt karşılığında 2 × yığın büyüklüğü kadar işlem yapılır — bayt başına tam olarak yığın büyüklüğü kadar.

Sonuç şu: yığın büyüklüğü 229'a ulaşana kadar çip hesap yapmakla değil, **beklemekle** meşgul. Tek bir kullanıcıya hizmet veriliyorsa çip kapasitesinin 229'da birini kullanıyor demektir. Ön dolumda ise aynı okuma yüzlerce token'a bölündüğü için çip gerçekten hesap yapar; çalışma, büyük yığınlarla 2.048 token'lık istemler işlenirken yüzde 76'lık bir kullanım oranı bildiriyor.

> **Kendini yokla:** Adım adım üretim bellek beklemekle geçiyorsa, aynı anda daha çok kullanıcıya hizmet vermek neden bedava değil?

Çünkü yığını büyütmenin bedeli bellekten çıkıyor. Her ek istek kendi anahtar-değer önbelleğini getirir ve o önbellek, ağırlıkların yanında kalan yerden yenir. Hesap gücü boşta duruyor olabilir; ama önbellekleri koyacak yer bittiğinde yığın büyütülemez. Çıkarım ekonomisinin merkezindeki gerilim tam olarak budur: darboğaz hesap değil, bellek.

## Önbelleğin ağırlıkları geçtiği yer

Bu gerilimin ne kadar sertleşebileceğini aynı çalışmadan bir sayı gösteriyor. 500 milyardan büyük, her dikkat başının kendi anahtar ve değerini tuttuğu bir modelde, 512'lik bir yığın ve 2.048 token'lık bağlamla anahtar-değer önbelleği **3 terabayt** tutuyor — modelin parametrelerinin üç katı. Ve bu önbelleğin tamamı, üretilen **her** token için yavaş bellekten yeniden okunmak zorunda; o sırada çipin hesap çekirdeği neredeyse boşta.

Formüldeki kaldıraç, anahtar-değer başı sayısında. Her sorgu başının kendi anahtar ve değer başı olmak zorunda değil; birden çok sorgu başı aynı anahtar-değer çiftini paylaşabilir. Buna **gruplandırılmış sorgu dikkati** (grouped-query attention, GQA) deniyor ve bugün büyük modellerin çoğunda standart.

Llama 3'ün 70 milyar parametreli sürümünün resmî teknik raporundaki sayılarla hesaplayalım — rapor hakemli bir yayın değil, mimari değerleri oradan alıyoruz. Model 80 katmanlı, genişliği 8.192 ve 64 sorgu başı var — yani baş boyutu 8.192 ÷ 64 = 128 — ama yalnızca **8** anahtar-değer başı. Formülü uygulayalım: 2 × 80 × 8 × 128 × 2 = 327.680 bayt, yani token başına 320 kilobayt.

![Üç çubuklu bir karşılaştırma. Birinci çubuk 70 milyar parametreli bir modelin 16 bitlik ağırlıklarını 140 gigabayt olarak gösterir. İkinci çubuk aynı model için 128.000 token'lık tek bir sohbetin anahtar-değer önbelleğini gruplandırılmış sorgu dikkatiyle yaklaşık 42 gigabayt olarak gösterir. Üçüncü çubuk aynı önbelleğin, her sorgu başının kendi anahtar-değer çiftini tutması hâlinde yaklaşık 336 gigabayta çıkacağını gösterir; bu çubuk ağırlıklar çubuğundan belirgin biçimde uzundur.](assets/onbellegin-bellek-yuku.svg "Şekil 3 — Tek bir uzun sohbetin bellek yükü")

Şekil 3'teki karşılaştırma 25\. makaleyi doğrudan buraya bağlıyor. Modelin ağırlıkları 16 bitlik sayılarla 140 gigabayt. 128.000 token'lık **tek** bir uzun sohbetin önbelleği yaklaşık 42 gigabayt — ağırlıkların neredeyse üçte biri, ve bu tek bir kullanıcı için. Aynı model anahtar-değer başlarını paylaşmasaydı, yani 8 yerine 64 başı olsaydı, aynı sohbet yaklaşık 336 gigabayt tutardı: ağırlıkların iki katından fazla, tek bir kullanıcı için.

Bu, uzun bağlamın gerçek faturasının nerede kesildiğini gösteriyor. 25\. makalede pencereyi esnetmenin eğitim tarafındaki bedelini görmüştük; çalışma anındaki bedeli bu. Pencereyi sekiz kat büyütmek, aynı karta sığdırabileceğin eşzamanlı kullanıcı sayısını kabaca sekizde birine indirir.

## Önbelleği küçültmek ve israf etmemek

Anahtar-değer başlarını paylaşma fikri iki uçlu bir eksen. Bir uçta her sorgu başının kendi çifti var — 7\. makalede kurduğumuz çok başlı dikkatin standart hâli. Öbür uçta bütün sorgu başları tek bir anahtar-değer çiftini paylaşır; bu uç önbelleği baş sayısı kadar, yani onlarca kat küçültür ama kaliteyi düşürür.

Aradaki noktanın neden işe yaradığına dair yapısal bir okuma var. 6\. ve 7\. makalede kurduğumuz düzende her başın kendi sorgusu, kendi anahtarı ve kendi değeri vardı; paylaşımlı düzende sorgular başına ayrı kalırken anahtar ve değerler ortaklaşır. Yani her baş neyi aradığını kendi belirlemeye devam eder, önüne konan malzeme ortaktır. Bunun bir kaybı var ve ölçülmüş; ama uçtaki tek çiftli düzenin kaybından belirgin biçimde küçük.

Joshua Ainslie ve arkadaşlarının EMNLP 2023'te sunduğu çalışma bu ekseni hem adlandırdı hem de kullanışlı hâle getirdi. İki katkısı var. Birincisi: mevcut bir modeli sıfırdan yeniden eğitmeye gerek yok — hâlihazırda eğitilmiş bir kontrol noktası, orijinal ön eğitim hesabının yalnızca **yüzde 5'iyle** paylaşımlı düzene çevrilebiliyor. İkincisi: aradaki bir nokta seçmek, yani birkaç sorgu başını bir anahtar-değer çiftinde gruplamak, kaliteyi tek çiftli uca düşmeden koruyup hızın büyük kısmını veriyor. Llama 3'ün 64 sorgu başını 8 anahtar-değer başına bağlaması tam olarak bu tercih.

İkinci kaldıraç, önbelleği küçültmek değil **israf etmemek**. Woosuk Kwon ve arkadaşlarının SOSP 2023'te sunduğu çalışma, o tarihteki servis sistemlerinin belleği nasıl kullandığını ölçtü ve sonuç şaşırtıcı çıktı: önbellek için ayrılan alanın yalnızca yüzde 20,4 ile 38,2 arasındaki kısmı gerçekten token durumlarını tutuyordu. Gerisi boşa gidiyordu.

Sebep, önbelleğin tuhaf bir nesne olması. Boyu baştan bilinmez — cevabın kaç token süreceğini kimse bilmiyor — ve iş sürerken büyür. Sistemler bu yüzden her istek için en kötü durumu, yani izin verilen en uzun diziyi baştan ayırıyordu. Cevap kısa çıkarsa ayrılan yerin çoğu ömrü boyunca boş kalıyor, üstelik başka istekler o boşluğu kullanamıyordu.

Çözüm, işletim sistemlerinin onlarca yıldır kullandığı fikirden geliyor: belleği bitişik büyük bloklar hâlinde değil, küçük ve eşit **sayfalar** hâlinde dağıtmak. Bir dizinin önbelleği bellekte dağınık durabilir; bir tablo hangi sayfanın nereye ait olduğunu tutar. Yönteme **sayfalı dikkat** (PagedAttention) deniyor. Aynı ölçümde kullanım oranı yüzde 96,3'e çıkıyor ve aynı gecikme düzeyinde iş hacmi 2 ile 4 kat artıyor.

Sayfalı düzenin bir yan kazancı daha var ve 24\. makaledeki maliyet notunu kapatıyor. Sayfalar paylaşılabildiği için, birden çok isteğin ortak bir başlangıcı varsa — hepsinde aynı sistem istemi duruyorsa — o kısmın anahtar ve değerleri bir kez hesaplanıp bütün isteklerde yeniden kullanılabilir. Sistem istemine yazdığın kurallar her turda yeniden **gönderilir**, ama her turda yeniden **hesaplanmak** zorunda değildir.

> **Kendini yokla:** Sistem isteminin ortasındaki tek bir kelimeyi kullanıcıya göre değiştirirsen ne kaybedersin?

O kelimeden sonrasının paylaşılabilirliğini. Anahtar ve değerler bir token'ın önündeki bütün metne koşullanarak hesaplanır; önek bir noktada ayrıştığında, o noktadan sonraki hiçbir hücre başka bir istekle ortak olamaz. Değişken kısmı sona koymak, sabit kısmı başa almak bu yüzden bir üslup tercihi değil, doğrudan bir maliyet kararı.

## Bunun kullanıcıya yansıması

Bu yapı, model kullanırken gördüğün birkaç şeyi doğrudan açıklıyor.

**Girdi ve çıktı token'ları aynı şey değil.** Girdi token'ları ön dolumda paralel işlenir; çıktı token'ları tek tek üretilir ve her biri ağırlıkların tamamının yeniden okunmasını gerektirir. Aynı sayıda token için çıktı tarafı yapısal olarak daha pahalı.

**İlk kelimenin gelmesi ile akışın hızı ayrı ölçülerdir.** İlk token'ı beklerken ön dolum çalışıyordur ve süresi istemin uzunluğuyla artar. Sonrasındaki akış hızını belirleyen şey ise ön dolumun süresi değil, bellek bant genişliği — ve bağlam uzadıkça her adımda okunacak önbellek de büyüdüğü için akış yavaşlar.

**Uzun sohbet, uzun istemden farklı bir maliyet.** İstemi uzatmak ön dolumu uzatır. Sohbeti uzatmak ise önbelleği büyütür ve sistemin aynı anda kaç kişiye hizmet verebileceğini düşürür.

**Cevabın parça parça akması bir görsel efekt değil.** Arayüzün metni akıtarak göstermesi bir animasyon değil; model cevabı gerçekten token token üretiyor. 10\. makaledeki döngü tek tek ilerlediği için, ilk token hazır olduğunda geri kalanını beklemenin bir anlamı yok.

**Değişmeyen başlangıç ucuzdur.** Sistem isteminin ve sabit örneklerin dizinin başında ve değişmeden durması, o kısmın hesabının yeniden kullanılabilmesini sağlar. 23\. makaledeki 997 örnekli istem — yaklaşık 85.000 token — tam olarak bu yüzden göründüğü kadar korkutucu değil: değişmeyen bir önek olarak bir kez ödenebilir.

## Çıkarım ekonomisinin disiplini

**İsteminin değişmeyen kısmını başa al ve sabit tut.** Ortasındaki tek bir kelimeyi değiştirmek, o noktadan sonrasının önbelleğini geçersiz kılar.

**Çıktı uzunluğunu bilinçli seç.** Maliyetin ve gecikmenin en doğrudan kaldıracı, istenen cevabın kaç token olduğudur.

**Uzun bağlamı bellek bütçesi olarak düşün.** İlan edilen pencere, aynı zamanda kullanıcı başına ayrılacak belleği ilan ediyor.

**Ölçerken iki sayıyı ayrı tut.** İlk token'a kadar geçen süre ile saniyedeki token sayısı farklı darboğazları ölçer; birini iyileştiren değişiklik öbürünü iyileştirmeyebilir. İstemi kısaltmak birinciyi düzeltir, ikinciye dokunmaz; daha küçük bir model seçmek ikinciyi düzeltir.

Son olarak, bu makaledeki bütün sayıların ortak bir dersi var ve 16\. makaledeki disiplinin donanım tarafındaki karşılığı. Bir modelin "hızlı" ya da "ucuz" olması tek başına bir özelliği değil; hangi yığın büyüklüğünde, hangi bağlam uzunluğunda ve hangi donanımda ölçüldüğüne bağlı bir sonuç. Aynı model, tek kullanıcıya hizmet verirken çipin hesap gücünün küçük bir kısmını kullanır ve token başına pahalıdır; kalabalık bir yığında aynı çip verimli çalışır ve token başına maliyet düşer. Bir sağlayıcının fiyatı bu tercihlerin toplamıdır, modelin bir sabiti değil.

### Sırada ne var

Bu makalede darboğazın hesap değil bellek olduğunu gördük: ağırlıkları taşımak, önbelleği taşımak, ikisine birden yer bulmak. O hâlde en doğrudan çare belli — sayıları küçültmek. Bir modelin ağırlıklarını 16 bit yerine 8 ya da 4 bitle saklarsan hem bellek hem taşıma yarıya, çeyreğe iner. 19\. makalede bu fikrin adını koymuş, mekanizmasını ertelemiştik. Peki bu kabalaştırma modelin neyini bozuyor ve nerede durmak gerekiyor?

## Kaynakça

- Pope, R., Douglas, S., Chowdhery, A., Devlin, J., Bradbury, J., Levskaya, A., Heek, J., Xiao, K., Agrawal, S. & Dean, J. (2023). *Efficiently Scaling Transformer Inference*. MLSys 2023. [Bağlantı](https://proceedings.mlsys.org/paper_files/paper/2023/hash/c4be71ab8d24cdfb45e3d06dbfca2780-Abstract-mlsys2023.html)
- Kwon, W., Li, Z., Zhuang, S., Sheng, Y., Zheng, L., Yu, C. H., Gonzalez, J. E., Zhang, H. & Stoica, I. (2023). *Efficient Memory Management for Large Language Model Serving with PagedAttention*. SOSP 2023. [Bağlantı](https://dl.acm.org/doi/10.1145/3600006.3613165)
- Ainslie, J., Lee-Thorp, J., de Jong, M., Zemlyanskiy, Y., Lebrón, F. & Sanghai, S. (2023). *GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints*. EMNLP 2023, s. 4895–4901. [Bağlantı](https://aclanthology.org/2023.emnlp-main.298/)
- Meta (2024). *The Llama 3 Herd of Models*. Teknik rapor, hakemli olmayan ön çalışma (arXiv:2407.21783). [Bağlantı](https://arxiv.org/abs/2407.21783)
