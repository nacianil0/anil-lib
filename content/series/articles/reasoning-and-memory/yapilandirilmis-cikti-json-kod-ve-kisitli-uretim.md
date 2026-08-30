---
article_id: article_a37e544d-fb75-401b-891b-ae6b095f6b35
title: "Yapılandırılmış Çıktı: JSON, Kod ve Kısıtlı Üretim"
slug: yapilandirilmis-cikti-json-kod-ve-kisitli-uretim
category: reasoning-and-memory
level: intermediate
reading_order: 30
summary: "Modelin çıktısını bir biçime zorlamanın üç yolunu ve kod çözme katmanındaki maskenin mekanizmasını kurar: maskenin neden yerel bir karar olduğunu ve dilbilgisine uygun ama olasılıksız çıktılar üretebildiğini, token ızgarasıyla dilbilgisinin uyuşmamasının doğruluğu nasıl düşürdüğünü ve şemanın alan sırasının ara adımları nasıl sildiğini ölçümlerle gösterir."
tags:
  - kisitli-uretim
  - yapilandirilmis-cikti
  - dilbilgisi
  - sema-tasarimi
  - kod-cozme
content_hash: sha256:09e56d93703ba2be09589877866d199ed29c906206293c5b90cbc0060ee7f7a2
classification_version: 1
classification_batch: 6
---
## Cevabı bir program okuyacaksa

Bir modeli tek başına kullandığında çıktısını sen okursun ve serbest metin gayet iyi bir biçimdir. Ama model bir sistemin içindeyse durum değişir: bir alan ayrıştırılacak, bir kod çalıştırılacak, bir arayüz doldurulacaktır. O zaman çıktı yalnızca doğru değil, **ayrıştırılabilir** olmak zorundadır.

22\. makalede istemin işe yarayan kaldıraçlarını "belirsizliği azaltmak" başlığında toplamıştık ve biçim kuralı bunlardan biriydi. 24\. makalede aynı kuralı sistem istemine yazmıştık. İkisinde de bir boşluk vardı: modelden bir biçim **istemek**, o biçimi almayı garanti etmiyor.

Garanti veren bir yol var ve bu makale onu kuruyor. Ama garantinin bir bedeli var; bedelin nereden çıktığı, 10\. ve 15\. makalelerde kurduğumuz iki mekanizmadan doğrudan okunuyor.

## Üç sertlik derecesi

Aynı amaca giden üç yol var ve aralarındaki fark, kısıtın nerede uygulandığı.

**Talimatla istemek.** Sistem istemine "cevabını şu şemaya uyan bir JSON olarak ver" yazarsın. En esnek yol ve hiçbir garantisi yok; model şemayı ihlal edebilir, açıklama ekleyebilir, alan adını değiştirebilir.

**İki aşamalı çevirme.** Önce modelden serbest metinle cevap istersin, sonra ikinci bir çağrıda o cevabı hedef biçime çevirtirsin. İçerik üretimiyle biçime uymayı birbirinden ayırır.

**Kısıtlı üretim** (constrained decoding). Kısıtı isteme değil, **kod çözme katmanına** koyarsın. 10\. makalede her adımda sözlüğün tamamı üzerinde bir dağılım vardı ve ondan bir token çekiyorduk. Kısıtlı üretimde çekilişten hemen önce, o an geçerli olmayan bütün token'ların olasılığı sıfırlanır. Geriye yalnızca hedef biçimi bozmayan adaylar kalır, ve çıktının biçime uyacağı garanti edilir.

Bu üçüncü yolun mekanizması bir **ayrıştırıcıdır** (parser). Şimdiye kadar üretilmiş metni izler ve her adımda "hangi token'lar geçerli bir devam başlatabilir" sorusunu cevaplar. JSON üretiyorsan ve son yazılan karakter bir açılış küme parantezi ise, geçerli devamlar yalnızca boşluk, tırnak işareti ya da kapanış parantezidir; başka her token yasaklanır.

Adım adım izleyelim. Model `{` yazmış olsun; ayrıştırıcının durumu "nesne açıldı, ilk anahtar bekleniyor"dur. Model tırnağı seçtiğinde durum "anahtar yazılıyor"a geçer ve geçerli küme genişler: herhangi bir harf ya da kapanış tırnağı. Beklenen alan adlarını ve türlerini tanımlayan bir **şema** (schema) da dayatılmışsa küme daha da daralır — anahtar adı yalnızca şemada tanımlı alanlardan biri olabilir, hatta ilk harf seçildiği anda geri kalanı tek bir olasılığa inebilir. Kapanış tırnağından sonra geçerli tek karakter iki noktadır; ondan sonra değerin türü şemadan okunur. Her adımda sözlüğün büyük bir kısmı elenir ve elenen oran, şema sıkılaştıkça artar.

Bir ayrım da burada yapılmalı, çünkü pratikte karışıyor. "Geçerli JSON döndür" garantisi ile "şu şemaya uy" garantisi aynı şey değil. Birincisi yalnızca ayraçların dengeli, tırnakların kapalı olmasını sağlar; alan adlarına, sayısına ya da sırasına karışmaz. İkincisi bunların hepsini dayatır. Birazdan göreceğimiz ölçümlerde ikisi arasındaki fark, bir modelde altmış puandan fazla.

![Bir kod çözme adımının çubuk grafiği. Yatay eksende aday token'lar, dikey eksende olasılıkları vardır. Geçerli adayların çubukları doludur; geçersiz olanlar boş bırakılmış ve üzerleri çizilmiştir. Grafiğin sağında, dikey bir ayırıcının ardından yalnızca geçerli üç çubuğun kaldığı ve toplamları bire gelecek biçimde yeniden ölçeklendiği ikinci bir grafik vardır. Altta, geçersiz adayların olasılığının sıfırlandığı, çekilişin yalnızca kalanlar arasından yapıldığı ve geçerliliğe üretilen metni izleyen bir ayrıştırıcının karar verdiği yazılıdır.](assets/uretim-maskesi.svg "Şekil 1 — Çekilişten önce daraltılan dağılım")

Bir ayrıntı da 10\. makaleyle doğrudan ilgili. Maske uygulandıktan sonra kalan olasılıklar, toplamları bire gelecek biçimde yeniden ölçeklenir. Bu, kesme kurallarının — sıcaklık, çekirdek örnekleme — maskeden önce mi sonra mı uygulandığına göre farklı sonuç vermesi demektir. Maskeden önce uygulanan bir eşik, geçerli ama düşük olasılıklı adayları daha kesilirken atabilir; sonra uygulanan aynı eşik onları kurtarabilir. Aynı istem, aynı şema ve aynı sıcaklıkla iki farklı kütüphane farklı çıktılar üretebilir ve fark çoğu zaman bu sıralamadan gelir.

Şekil 1'deki işleme **maske** deniyor ve bu, serinin dördüncü maske kullanımı. Karıştırmamak için sırayla anmakta yarar var: 6\. makaledeki maskeleme dikkatin bakamayacağı konumları, 7\. makaledeki nedensel maske geleceği, 12\. makaledeki kayıp maskesi kaybın saymadığı token'ları kapatıyordu. Buradaki maske ise kod çözme anında **geçersiz adayları** kapatıyor. Dördü de aynı fikri kullanır: bir kümenin bir kısmını hesap dışı bırakmak.

## Maskenin ilk sessiz bedeli: yerel karar

Şimdi bir soru. Maske yalnızca geçersiz token'ları eliyorsa, geriye kalan seçim modelin kendi tercihi olmaz mı? Yani kısıt, modeli yalnızca hatalardan mı koruyor?

Hayır, ve sebebi Kanghee Park ve arkadaşlarının NeurIPS 2024'te sunduğu çalışmada çarpıcı bir örnekle gösteriliyor.

Modelden "1 ile biten bir ikili dizi üret" diye istiyorlar. Kısıtsız bırakıldığında model bunu yaklaşık yüzde 90 oranında doğru yapıyor. Sonra biçimsel bir **dilbilgisi** (grammar) dayatıyorlar: geçerli diziler ya tam olarak `00000` ya da 1 ile başlayan beş uzunluklu dizilerdir.

İlk token'da model 0'a yaklaşık 0,45, 1'e yaklaşık 0,30 olasılık veriyor. Maske ne yapar? Her iki token da geçerli bir devama açıktır: 0 ile yalnızca `00000`'a, 1 ile beş uzunluklu on altı ayrı diziye gidilebilir — ve bu on altının sekizi 1 ile biter. Dolayısıyla maske ikisini de bırakır ve model 0'ı kabaca yarı yarıya seçer. Ama 0'ı seçtiği anda tuzağa düşmüştür: o daldaki tek geçerli dizi `00000`'dır ve o da 1 ile bitmez.

Sonuç ölçülmüş: kısıt altında modelin 1 ile biten dizi üretme oranı yüzde 90'dan **yüzde 30'a** düşüyor. Dilbilgisi kusursuz biçimde uygulanmıştır; istem ise çiğnenmiştir.

![Bir ağaç şeması. Kökten iki dal çıkar. Sol dal sıfır token'ıyla etiketlenmiş ve olasılığı 0,45 yazılıdır; bu dal aşağıda tek bir yaprağa, beş sıfırdan oluşan diziye iner. Sağ dal bir token'ıyla etiketlenmiş ve olasılığı 0,30 yazılıdır; bu dal aşağıda beş kutuya açılır: üçü bir ile biten tamamlamaları, ikisi sıfır ile biten tamamlamaları temsil eder ve sıfırla bitenler soluk çizilmiştir. Dalların altında sol dalın tek bir tamamlaması olduğu ve onun bir ile bitmediği, sağ dalın on altı tamamlamasından sekizinin bir ile bittiği yazılıdır. Şeklin altında maskenin her iki dalı da geçerli saydığı ve kısıt altında bir ile bitme oranının yüzde doksandan yüzde otuza düştüğü belirtilir.](assets/yerel-karar-kuresel-sonuc.svg "Şekil 2 — Maskenin göremediği şey")

Şekil 2 hatanın nerede olduğunu gösteriyor. Maske "bu token geçerli bir yere varabilir mi" sorusunu cevaplar. Cevaplamadığı soru şudur: "ne kadar olası bir yere varır?" Sol daldaki tek geçerli dizinin gerçek olasılığı 0,45 değil, o dizinin bütün adımlarının çarpımıdır ve çalışmanın hesabında bu değer on milyarda iki mertebesine iniyor. Maske bunu göremez, çünkü kararı yalnızca bir adım ileriye bakarak verir.

> **Kendini yokla:** Kısıtlı üretim çıktının biçime uyacağını garanti ediyorsa, neden çıktının modelin en olası cevabı olduğunu garanti etmiyor?

Çünkü garanti edilen şey her adımda geçerli bir token seçilmesi; oysa bir dizinin olasılığı adımların çarpımıdır. Yerel olarak yüksek olasılıklı bir token, küresel olarak neredeyse imkânsız bir dala açılabilir. Aynı çalışma bunu düzeltmek için önceki örneklerden hangi dalların gerçekte ne kadar olasılık taşıdığını öğrenen bir örnekleme yöntemi öneriyor; fikir, kısıtı korurken dağılımı geri kazanmak.

Bu örneğin yapay olduğunu düşünmek kolay, ama aynı kalıp gerçek şemalarda da kuruluyor. Bir şema iki alternatif yapıya izin veriyorsa — diyelim bir hata nesnesi ya da bir sonuç nesnesi — model ilk token'da hangi dala gireceğine, o dalın sonunda ne yazması gerekeceğini bilmeden karar verir. Maske her iki dalı da açık tuttuğu için karar, dalların gerçek olasılığına değil yalnızca ilk token'ın olasılığına dayanır. Seçenek sayısı arttıkça bu kaymanın büyüklüğü de artar.

## İkinci sessiz bedel: token ızgarası

İkinci sorun 15\. makaleden tanıdık. Dilbilgisi karakterlerle konuşur; model token'larla. İkisi hizalı değildir.

Bir örnek. Model JSON üretirken, açılış parantezinden sonra doğal olarak seçeceği token boşluklarla tırnağı birlikte taşıyan tek bir parça olabilir. Naif bir maske, o token'ın **ilk** karakterine bakıp onu geçerli sayar ya da saymaz; ama token birden çok dilbilgisi birimini kapsadığı için karar hatalı olur. Bu tür token'lara **köprü token'ı** (bridge token) deniyor ve naif kısıtlama onları eleyince, model aynı JSON'u ürettiği hâlde ön eğitimde hiç görmediği bir bölme yolundan geçer. 15\. makaledeki cümle burada geri dönüyor: token ızgarası nötr bir ön işleme adımı değil.

Luca Beurer-Kellner ve arkadaşlarının ICML 2024'te sunduğu çalışma bunun bedelini ölçtü. GSM8K matematik sorularını JSON biçiminde cevaplatıyorlar; 7 milyar parametreli bir modelde doğruluk:

| Düzen | Doğruluk |
|---|---|
| kısıtsız üretim | 0,415 |
| hizalamayı gözetmeyen kısıt, birinci araç | 0,345 |
| hizalamayı gözetmeyen kısıt, ikinci araç | 0,375 |
| token hizalı kısıt | 0,418 |

İki aracın da geçerli JSON ürettiğini vurgulamak gerekiyor; fark yalnızca hangi token yolundan geçildiğinde. Aynı çalışma ileriye bakış derinliğini de ayrı ayrı ölçüyor. Hiç ileriye bakmayan bir maske doğruluğu 0,308'e, bir token ileriye bakan 0,100'e düşürüyor; tam hizalı düzen ise kısıtsız üretimin bir tık üstünde kalıyor. Yani kaybın kaynağı kısıtın kendisi değil, **kötü uygulanmış** kısıt.

Bir de sürpriz var: aynı hizalı yöntem, geçerli devamların bir kısmını önceden hesaplayıp 28\. makaledeki spekülatif üretimi kullanarak, şemalı JSON üretiminde kısıtsız üretimden 1,77 kat **hızlı** çalışıyor. Kısıt, doğru kurulduğunda bir yavaşlatıcı olmak zorunda değil.

Sebebi 28\. makaledeki servis katmanına bağlanıyor. Bir şemada dilbilgisi çoğu adımda tek bir devama izin verir: alan adının harfleri, iki nokta, tırnak, virgül. O adımlarda modele sormanın bir anlamı yoktur — cevap zaten bellidir. Lianmin Zheng ve arkadaşlarının NeurIPS 2024'te sunduğu çalışma bunu sistem düzeyinde otomatikleştiriyor: dilbilgisi durumları önceden sıkıştırılıyor ve tek devamlı zincirler tek adımda geçiliyor. Yani kısıt, üretilecek token sayısını azaltarak zaman kazandırabiliyor.

## Neyi zorlayabilirsin, neyi zorlayamazsın

Kısıtın dayandığı şey biçimsel bir dil tanımı ve bunun iki yaygın biçimi var. Düzenli ifadeler sabit kalıpları tanımlar: bir tarih biçimi, bir kimlik numarası, kapalı bir seçenek listesi. **Bağlamdan bağımsız dilbilgisi** (context-free grammar) ise iç içe geçen yapıları da tanımlayabilir — JSON'un içindeki nesneler, bir programlama dilinin blokları. İkisi de bir ayrıştırıcıya çevrilebildiği için maskeye dönüştürülebilir; aradaki fark, ne kadar derin bir yapının ifade edilebildiğidir.

Asıl sınır burada. Bir dilbilgisi, üretilen metnin **sözdizimsel** olarak geçerli olacağını garanti eder. Garanti edemediği şey anlamsal geçerliliktir, çünkü o tür kurallar bağlamdan bağımsız bir dilbilgisiyle ifade edilemez.

Kod üretimi bu ayrımın en net göründüğü yer, ve kısıtlı üretimin ilk uygulama alanlarından biri. Bir dilbilgisi dayatarak modelin ayraçları dengelemesini, anahtar kelimeleri doğru yazmasını, ifadeleri kapatmasını garanti edebilirsin. Engelleyemediğin şeyler ise şunlar: tanımlanmamış bir değişkeni kullanmak, yanlış sayıda argüman geçirmek, var olmayan bir işlevi çağırmak. Bunların hepsi sözdizimsel olarak kusursuz kodlardır; hiçbir ayrıştırıcı onları reddetmez. JSON tarafında da aynısı geçerli — şema "yaş" alanının bir sayı olmasını zorlar, o sayının doğru olmasını değil.

Kısıt bu yüzden bir doğrulama katmanının yerine geçmez. Yaptığı şey, hataların bir sınıfını — ayrıştırılamayan çıktıyı — sıfıra indirmek ve geriye içerik denetimini bırakmaktır.

## Şemanın kendisi bir müdahaledir

Buraya kadar kısıtın nasıl uygulandığına baktık. Zhi Rui Tam ve arkadaşlarının EMNLP 2024 endüstri programında sunduğu çalışma başka bir soru soruyor: kısıtın **sıkılığı** ne yapıyor?

Aynı matematik sorularını dört modele üç düzende soruyorlar. Sayılar doğruluk yüzdesi:

| Model | serbest metin | JSON, şemasız | JSON, şemalı |
|---|---|---|---|
| claude-3-haiku | 86,51 | 86,99 | 23,44 |
| gpt-3.5-turbo | 75,99 | 74,70 | 49,25 |
| LLaMA-3-8B | 75,13 | 64,67 | 48,90 |
| gemini-1.5-flash | 89,33 | 89,66 | 89,21 |

İlk satır tek başına bir uyarı: JSON istemek zararsızken, JSON'un **şemasını** dayatmak aynı modeli 86,99'dan 23,44'e düşürüyor. Son satır ise etkinin evrensel olmadığını gösteriyor — bir model neredeyse hiç etkilenmiyor.

Sebep, çalışmanın en öğretici bulgusunda. Harf birleştirme görevinde GPT-3.5 Turbo'nun JSON kipiyle ürettiği cevapların **tamamı**, "cevap" alanını "gerekçe" alanından önce koymuş. Şema alanları o sırayla tanımlandığı için model önce cevabı yazmak zorunda kalıyor; yani ara adımları hiç üretmeden karar veriyor. 22\. makalede ölçtüğümüz ara adım kazancı, tek bir şema kararıyla silinmiş oluyor.

![İki JSON şeması yan yana gösterilir. Solda cevap alanı önce, gerekçe alanı sonra gelir; altında modelin cevabı yazarken henüz hiçbir ara adım üretmemiş olduğu ve gerekçenin karardan sonra yazıldığı belirtilir. Sağda gerekçe alanı önce, cevap alanı sonra gelir; altında modelin cevabı yazmadan önce ara adımları üretmiş olduğu belirtilir. İki şemanın altında ortak bir satır, ikisinin de aynı derecede geçerli JSON ürettiğini fakat aynı doğruluğu vermediğini söyler.](assets/sema-sirasi.svg "Şekil 3 — Aynı şema, iki farklı alan sırası")

Şekil 3'teki iki şema arasındaki tek fark iki satırın yeri. Model her adımda kendi ürettiği metne koşullanarak devam ettiği için — 10\. makaledeki otoregresif döngü — cevap alanı önce geldiğinde koşullanacak bir ara adım yoktur.

Bulgunun tersi de var ve dürüst bir tablo için gerekli. Sınıflandırma görevlerinde aynı kısıt bazı modellerde doğruluğu **yükseltiyor**; cevap uzayı daraldığı için seçim hataları azalıyor. Yani biçim kısıtının etkisi göreve bağlı: ara adım gerektiren işlerde riskli, sabit bir kümeden seçim yapılan işlerde yardımcı.

Bir yanlış açıklamayı da eliyorlar. Düşüşün sebebi ayrıştırma hataları değil: bir modelde ayrıştırma hata oranı binde 1,5 civarındayken başarı farkı yüzde 38'e çıkıyor. Kaybolan şey biçim değil, akıl yürütme.

> **Kendini yokla:** Şemadaki alanların sırası bu kadar belirleyiciyse, aynı şemayı kullanan iki uygulamadan biri neden hiç sorun yaşamayabilir?

Çünkü etki göreve bağlı. Ara adım gerektiren bir işte cevap alanının başta olması ara adımları siler; sabit bir kümeden seçim yapılan bir işte üretilecek ara adım zaten yoktur ve kısıt yalnızca seçim uzayını daraltır. Aynı şema, birinde zarar veren, öbüründe yardım eden bir müdahaledir.

Aynı çalışmada üçüncü düzen — önce serbest metinle cevaplatıp sonra biçime çevirtmek — serbest metinle neredeyse aynı doğruluğu koruyor. İkisi de aynı ilk cevaptan türediği için bu beklenen bir sonuç, ama pratik bir seçenek olarak kaydı önemli. Bedeli de açık ve 26\. ile 28\. makalelerin muhasebesinden okunuyor: iki ayrı çağrı, iki ayrı ön dolum ve iki ayrı üretim demek. Doğruluğu koruyan yol, gecikmeyi ve token maliyetini kabaca ikiye katlıyor. Bu yüzden seçim bir doğruluk kararı değil, doğruluk ile maliyet arasında bir denge kararı.

## Yapılandırılmış çıktının disiplini

**Şemanın alan sırası bir performans kararıdır.** Ara adımların yazılacağı alan, cevap alanından **önce** gelmelidir. Aksi hâlde model düşünmeden cevap vermek zorunda kalır.

**Şemayı gerektiği kadar sıkı tut.** Ölçümde en büyük düşüş, biçimi istemekten değil şemayı dayatmaktan geldi. İhtiyacın olmayan alan kısıtlarını koyma.

**Kısıtın uygulanışını sor.** Token hizalı bir uygulama kısıtsız üretimin doğruluğunu korur; naif bir uygulama on puana varan kayıp verir. İkisi de aynı geçerli JSON'u üretir.

**Ara adım gerektiren işte kısıtı gevşet, seçim işinde sıkılaştır.** Etki göreve göre işaret değiştiriyor.

**Geçerlilik doğruluk değildir.** Kısıtlı üretim çıktının ayrıştırılabileceğini garanti eder; içindeki sayının doğru olduğunu değil. 17\. makaledeki uyarı burada da geçerlidir: kusursuz biçimlenmiş bir cevap, kusursuz biçimlenmiş bir uydurma olabilir.

**Kısıtı doğrulamayla birlikte kur.** Şemanın zorlayamadığı her kural — bir sayının aralığı, bir kimliğin var olup olmadığı, bir kodun derlenip derlenmediği — ayrı bir kontrol ister. Kısıt hataların bir sınıfını sıfırlar, hepsini değil.

### Sırada ne var

Bu makalede aynı şeye tekrar tekrar çarptık. Şemanın sırası ara adımları siliyordu; 22\. makalede ara adımların kazancını ölçmüştük; 15\. makalede bir toplama işleminin ara adımlarla düzeldiğini görmüştük. Model bir cevaba varmadan önce metin üretmek, ölçülebilir biçimde işe yarıyor.

Peki bu ara adımlar tam olarak nedir? Modelin ürettiği o cümleler bir düşünme süreci mi, yoksa doğru cevabı daha olası kılan bir istem devamı mı? Serinin bundan sonraki fazı bu soruyla açılıyor ve önce kavramın kendisini masaya yatırmak gerekiyor: bir dil modelinin "akıl yürütmesi" ne demek ve nasıl ölçülür?

## Kaynakça

- Park, K., Wang, J., Berg-Kirkpatrick, T., Polikarpova, N. & D'Antoni, L. (2024). *Grammar-Aligned Decoding*. NeurIPS 2024. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2024/hash/2bdc2267c3d7d01523e2e17ac0a754f3-Abstract-Conference.html)
- Beurer-Kellner, L., Fischer, M. & Vechev, M. (2024). *Guiding LLMs The Right Way: Fast, Non-Invasive Constrained Generation*. ICML 2024, PMLR 235, s. 3658–3673. [Bağlantı](https://proceedings.mlr.press/v235/beurer-kellner24a.html)
- Tam, Z. R., Wu, C.-K., Tsai, Y.-L., Lin, C.-Y., Lee, H. & Chen, Y.-N. (2024). *Let Me Speak Freely? A Study On The Impact Of Format Restrictions On Large Language Model Performance*. EMNLP 2024 Industry Track. [Bağlantı](https://aclanthology.org/2024.emnlp-industry.91/)
- Zheng, L., Yin, L., Xie, Z., Sun, C., Huang, J., Yu, C. H., Cao, S., Kozyrakis, C., Stoica, I., Gonzalez, J. E., Barrett, C. & Sheng, Y. (2024). *SGLang: Efficient Execution of Structured Language Model Programs*. NeurIPS 2024. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2024/hash/724be4472168f31ba1c9ac630f15dec8-Abstract-Conference.html)
