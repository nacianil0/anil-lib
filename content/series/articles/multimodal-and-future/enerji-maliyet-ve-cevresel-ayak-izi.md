---
article_id: article_e00dee46-e208-4e02-b000-44af93c64f76
title: "Enerji, Maliyet ve Çevresel Ayak İzi"
slug: enerji-maliyet-ve-cevresel-ayak-izi
category: multimodal-and-future
level: intermediate
reading_order: 90
summary: "8'de GPT-3'ün eğitimi için bir enerji ve karbon sayısı vermiştik; bu makale o sayının nasıl kurulduğunu ve neden tek bir sayı olmadığını gösteriyor. İşlem sayısından karbona giden zincirin her halkasında bir varsayım var: ölçülen güç mü anma gücü mü, veri merkezi çarpanı, şebekenin karbon yoğunluğu, satın alınan enerjiye göre mi bulunduğu yere göre mi sayıldığı, imalatın sayılıp sayılmadığı. Aynı büyüklükte iki modelin biri daha çok enerji harcayıp daha az karbon salıyor. Mimari arama tahmininin 88 kat düzeltilmesi ölçüm dürüstlüğünün en iyi vakası; karşı tarafta aynı aramanın kendi bedelinin on beş katını geri kazandırdığı ölçümü duruyor. Çıkarımın payı, maliyet eşitliği ve aynı istemin iki ayrı sınırla 0,10 ile 0,24 vat-saat çıkması kapanışa taşınıyor."
tags:
  - enerji
  - karbon
  - olcum-kosullari
  - cikarim-maliyeti
  - veri-merkezi
content_hash: sha256:5ef98af29bb32bda33f390846880a2e916f7638b9fcc74bd05d2ee648b7dc672
classification_version: 1
classification_batch: 21
---
## Vat, seride ilk kez

89\. makale boyunca üç birimle konuştuk: işlem, bayt, saniye. Dördüncüsü hepsinin altında duruyor — vat. Bir çipin yaptığı her işlem elektrik harcar; harcanan elektriğin bir karbon karşılığı vardır; ve o karşılık, elektriğin hangi şebekeden çekildiğine bağlıdır.

8\. makalede bu zincirin bir çıktısını zaten vermiştik: GPT-3'ün eğitimi 10.000 çipte 14,8 gün sürdü, 1.287 megavat-saat elektrik harcadı ve 552,1 ton karbondioksit eşdeğerine karşılık geldi. O sayıyı orada bir ölçek göstergesi olarak kullanmış ve tahmin olduğunu not düşmüştük. Bu makalenin işi o zinciri açmak; konu enerjinin kendisinden çok **bir enerji sayısının nasıl okunacağı**.

## Bir sayının anatomisi

İşlem sayısından karbona giden yol dört halkalı ve her halkada bir varsayım var.

Birinci halka, işlemden kart-saatine. 9\. makaledeki 6ND kestirimi toplam işlem sayısını verir; bunu kartın gerçekte ulaştığı hıza böldüğünde kart-saati çıkar. 89\. makalede gördük ki bu hız tepe hızın yarısı mertebesinde olabiliyor, dolayısıyla hangi verimin kullanıldığı sonucu ikiye katlayabilir.

İkinci halka, kart-saatinden kilovat-saate. Burada iki yol var: kartın anma gücünü (üreticinin bildirdiği tasarım gücü) kullanmak ya da gerçekte çekilen gücü ölçmek. İkisi aynı değildir — aşağıda döneceğimiz BLOOM ölçümünde, modeli arayüz ardında sunan kartların ölçülen çekimi 400 vatlık anma gücünün karşısında 78 ile 171 vat arasında kalmış. Sonra veri merkezinin kendi payı: soğutma ve dağıtım için harcanan elektriği hesaba katan çarpana **PUE** (power usage effectiveness) deniyor ve modern veri merkezlerinde 1,08 ile 1,2 arasında değişiyor.

Üçüncü halka, kilovat-saatten karbona. Şebekenin karbon yoğunluğu — kilovat-saat başına gram karbondioksit eşdeğeri — bölgeye ve saate göre kat kat değişir. Dahası iki ayrı muhasebe biçimi var: **bulunduğu yere göre** sayım, bölgesel şebekenin ortalama karışımını kullanır; **satın alınan enerjiye göre** sayım, kurumun aldığı karbonsuz enerji sözleşmelerini de hesaba katar. Aynı elektrik, iki yöntemle iki ayrı karbon sayısı verir.

Dördüncü halka, sınırın nereye çizildiği. Yalnızca eğitim koşusu mu? Başarısız denemeler ve mimari aramalar da mı? Kartların imalatı, veri merkezinin inşası, suyun tüketimi?

![Dört halkalı bir zincir şeması. Birinci kutu işlem sayısı: girdisi parametre ve token sayısıdır, taşıdığı varsayım kartın gerçekte ulaştığı verimdir ve tepe hızın yarısı mertebesinde olabilir. İkinci kutu kart-saati: taşıdığı varsayım gücün ölçülmüş mü yoksa anma değeri mi alındığıdır; bir ölçümde 400 vatlık anma gücüne karşılık gerçek çekim 78 ile 171 vat arasında kalmıştır. Üçüncü kutu kilovat-saat: taşıdığı varsayımlar veri merkezi çarpanının 1,08 ile 1,2 arasında olması ve boşta geçen sürenin sayılıp sayılmadığıdır. Dördüncü kutu karbon: taşıdığı varsayımlar şebekenin karbon yoğunluğu, satın alınan enerjiye göre mi bulunduğu yere göre mi sayıldığı ve imalatın sınıra dâhil olup olmadığıdır. En altta bir kayıt: aynı eğitim koşusu için bildirilen sayı, bu dört halkadaki seçimlere göre kat kat değişebilir; bu yüzden bir enerji sayısı, hangi seçimlerle üretildiği söylenmeden karşılaştırılamaz.](assets/bir-enerji-sayisinin-zinciri.svg "Şekil 1 — Dört halka, dört varsayım")

Şekil 1 zinciri ve her halkanın taşıdığı varsayımı gösteriyor. Zinciri bir kez uçtan uca yürüyelim; girdilerin hepsi 8\. makalede verdiğimiz aynı çalışmadan geliyor ve sonuç oradaki sayının ta kendisi.

Koşu 10.000 karttan oluşan bir kümede 14,8 gün sürmüş. Aynı çalışma kart başına **ölçülmüş** ortalama sistem gücünü 330 vat — kartın kendisine bellek, ağ arabirimi, fanlar ve sunucu işlemcisinden düşen payın eklenmiş hâli — kart başına ölçülmüş hızı ise saniyede 24,6 trilyon işlem olarak veriyor. İki hesabı ayrı ayrı yapalım.

Enerji: 10.000 × 0,330 kilovat × 355,2 saat = 1.172 megavat-saat. Bu, kartların çektiği elektrik. Veri merkezinin kendi payı için 1,10'luk çarpanla çarpalım: 1.172 × 1,10 ≈ **1.290 megavat-saat** — çalışmanın bildirdiği 1.287'yle yuvarlama farkı kadar örtüşüyor.

İşlem: 10.000 × 24,6×10¹² × (14,8 × 86.400 saniye) ≈ **3,14×10²³ işlem** — 8\. makalenin tablosundaki değerin aynısı.

Karbon: koşunun yapıldığı bölgenin şebekesi kilovat-saat başına 429 gram; 1.287.000 kilovat-saat × 0,429 kilogram ≈ **552 ton**.

Üç sayının da nereden geldiğini artık biliyoruz — ve daha önemlisi, hangi girdiyi değiştirirsek hangisinin oynayacağını. Sistemin ölçülen gücü yerine yalnızca kartın 300 vatlık anma gücü kullanılsaydı enerji yüzde dokuz düşük çıkardı — burada anma gücü gerçeğin altında kalıyor, çünkü sunucunun geri kalanını saymıyor; BLOOM'un çıkarım ölçümünde ise tersine, üstündeydi; şebeke 57 gramlık olsaydı karbon yedide birine inerdi; kartların imalatı sınıra girseydi toplam yükselirdi. Aynı koşu, aynı model, dört ayrı sayı.

## Enerji ile karbon aynı eğri değil

Sasha Luccioni, Sylvain Viguier ve Anne-Laure Ligozat'ın JMLR'de 2023'te yayımladığı çalışma, 176 milyar parametreli açık bir modelin eğitim ayak izini kaynaktan ölçüyor ve benzer boyuttaki modellerle karşılaştırıyor. Tablodaki iki satır tek başına öğretici.

Bu model 433 megavat-saat harcamış ve 25 ton karbondioksit eşdeğeri salmış. Benzer boyuttaki başka bir açık model 324 megavat-saat harcamış ve 70 ton salmış. Yani **daha az enerji harcayan model, iki buçuk kattan fazla karbon salmış**. Sebep tek bir sayıda: birincinin çalıştığı şebekenin karbon yoğunluğu kilovat-saat başına 57 gram, ikincininki 231 gram.

Aynı tablo, yukarıda yürüdüğümüz zincirin bir halkasını da gösteriyor. GPT-3 için 552 değil **502 ton** yazıyor ve yanındaki sütunda, veri merkezi çarpanıyla çarpılmış hâli olarak 552'yi veriyor. 502, kartların çektiği 1.172 megavat-saatin 0,429 kilogramla çarpımına denk düşüyor; 552 ise 1,10'luk çarpan eklendikten sonraki değer — bu eşleştirme bizim hesabımız, tablo yolu yazmıyor. Aynı koşu, aynı kaynaklardan, iki sayı: fark yalnızca ikinci halkanın sayılıp sayılmadığında.

Aynı çalışma dördüncü halkayı da açıyor: yalnızca elektrik sayıldığında 24,7 ton olan rakam, kartların imalatından veri merkezinin işletimine kadar bütün süreçler dâhil edildiğinde **50,5 tona** çıkıyor. Tek bir eğitim koşusu, iki sınırla iki katı fark ediyor.

> **Kendini yokla:** Bir laboratuvar modelini daha temiz bir şebekede eğiterek karbon ayak izini beşte birine indirdi. Bu, modelin daha verimli hâle geldiği anlamına gelir mi?

Hayır; harcanan enerji aynı kalmış olabilir. Karbon, enerji ile şebekenin yoğunluğunun çarpımıdır ve ikinci çarpanı değiştirmek verimlilik değil, konum kararıdır. İkisi de gerçek bir azaltmadır, fakat farklı şeylerdir ve farklı biçimde genellenir: verimlilik kazancı her yerde geçerlidir, konum kazancı yalnızca o şebekede.

## Aynı koşunun iki sayısı

Alanın bu konudaki en öğretici vakası, tek bir rakamın iki kez ölçülmesi.

Emma Strubell, Ananya Ganesh ve Andrew McCallum'un ACL 2019'da sunduğu çalışma, dil işleme modellerinin eğitim maliyetini gündeme sokan iş oldu. Tablolarına göre bir Transformer modelinin eğitimi 192 pound karbondioksit eşdeğeri, **mimari arama** ile birlikte eğitilen aynı ailedeki model ise 626.155 pound — aynı tablodaki "bir otomobilin yakıtıyla birlikte ömür boyu salımı" değeri 126.000 pound.

David Patterson ve arkadaşlarının 2021'de yayımladığı — hakemli olmayan — çalışma bu ikinci sayıyı yeniden hesapladı ve ortalama bir kuruluş için **18,7 kat**, enerji açısından verimli bir kuruluş için **88 kat** yüksek olduğunu buldu. Hata kötü niyetten değil, görünmeyen bir yordamdan kaynaklanıyordu: mimari arama küçük bir **vekil görev** üzerinde yapılmış, bulunan model sonradan tam boyuta ölçeklenmişti. Dışarıdan bakan biri, aramanın tam boyutlu görevlerle yapıldığını varsaymıştı. Yazarların ilk önerisi de buradan çıkıyor: hesap ağırlıklı projelerde enerji ve karbon **ölçülmeli ve bildirilmeli**; başkasının geriye dönük tahminine bırakılmamalı.

İkinci düzeltme kavramsal. Mimari arama model başına bir kez değil, **alan ve arama uzayı ikilisi başına** bir kez yapılır; bulunan mimari sonra defalarca kullanılır. Aynı çalışmanın ölçümü bunu somutlaştırıyor: aramayla bulunan mimari yüzde 37 daha az parametre taşıyor, aynı doğruluğa yüzde 25 daha az enerjiyle ulaşıyor ve tek bir sonraki modelin eğitiminde 48,5 ton tasarruf sağlıyor — aramanın kendi enerji maliyetinin yaklaşık on beş katı.

İki tarafı da tutmak gerekiyor. Birinci çalışma alanın gözünü açtı ve ölçüm kültürünü başlattı; ikincisi o ilk sayının ölçüsünü düzeltti. Ölçüm kültürü bu iki çalışmanın arasında kuruldu.

Aynı ekibin IEEE Computer'da 2022'de yayımladığı — bu kez hakemli — çalışma, azaltmanın nerelerden geldiğini dört başlıkta topluyor ve her birinin çarpanını veriyor: verimli mimari seçimi hesabı 5–10 kat, bu iş için tasarlanmış çip vat başına başarımı 2–5 kat, bulut veri merkezinde çalışmak enerjiyi 1,4–2 kat, temiz şebekeli bir bölge seçmek karbonu 5–10 kat düşürüyor. Dördü birlikte, aynı kaliteyi koruyarak dört yılda enerjiyi 83, karbonu **747 kat** azaltmış. Aynı çalışmanın bir kaydı daha var ve ölçüm kültürünü doğrudan ilgilendiriyor: bildirmeyen çalışmalar için yapılan dışarıdan tahminler gerçek değerlerden 100 ile 100.000 kat sapabiliyor. 85\. makaledeki seyrek modelin enerji üçlüsü bu tablonun birinci satırının bir örneğiydi; 89\. makaledeki özel çip ikinci satırının.

## Çıkarımın payı

Eğitim bir kez olur, çıkarım her gün olur. Peki ne zaman eşitlenirler?

Luccioni'nin Yacine Jernite ve Emma Strubell ile birlikte FAccT 2024'te sunduğu çalışma bu soruyu iki adımda cevaplıyor. Önce on ayrı görevde, bin çıkarım için harcanan ortalama enerjiyi ölçüyor. Sınıflandırma görevleri en altta: metin sınıflandırma 0,002, görüntü sınıflandırma 0,007 kilovat-saat. Üretken metin görevleri bir büyüklük mertebesi yukarıda: metin üretimi 0,047, özetleme 0,049. En üstte görüntü üretimi: **2,907**. En düşük ile en yüksek arasındaki oran 1.450'yi aşıyor.

Karşılaştırma ölçüsü olarak bir telefonu tam şarj etmenin 0,022 kilovat-saat olduğunu veriyorlar. Bu ölçekle: en verimli metin üreten model bin çıkarımda bir telefon şarjının yüzde 9'unu harcıyor; en verimsiz görüntü üreten model 522 şarjı, yani üretilen görüntü başına yaklaşık yarım şarj.

Sonra eşitlik noktasını hesaplıyorlar: bir modelin eğitim ve ince ayar enerjisine ulaşmak için kaç çıkarım gerekir? Aynı ailedeki dört model için sayılar 205 milyon ile 593 milyon çıkarım arasında. Bu sayıyı zamana çevirmek için talebi bilmek gerekir ve kaynak onu vermiyor; varsayımı açıkça koyarak kendi kaba hesabımızı yapalım: günde on milyon istek alan bir hizmette 205 milyon çıkarım yaklaşık üç haftada, 593 milyon yaklaşık iki ayda dolar. Talep on kat düşükse süreler de on kat uzar.

![İki bölmeli şekil. Üst bölmede bin çıkarım için harcanan ortalama enerji, kilovat-saat cinsinden, dört görev için: metin sınıflandırma 0,002, görüntü sınıflandırma 0,007, metin üretimi 0,047, görüntü üretimi 2,907. Ölçek için bir telefonu tam şarj etmek 0,022 kilovat-saat; incelenen on görevin en düşüğü ile en yükseği arasındaki oran 1.450'yi aşıyor. Alt bölmede aynı model ailesindeki dört boyut için maliyet eşitliği, yani çıkarım enerjisinin eğitim ve ince ayar enerjisine ulaşması için gereken çıkarım sayısı: 560 milyonluk modelde 205 milyon, 1 milyarlıkta 292 milyon, 3 milyarlıkta 396 milyon, 7 milyarlıkta 593 milyon çıkarım. En altta bir kayıt: sayılar tek bir çalışmanın ölçtüğü modellere aittir ve donanıma, yığınlamaya ve bölgeye göre değişir.](assets/cikarimin-payi.svg "Şekil 2 — Ne zaman eşitleniyorlar")

Şekil 2 iki bölmeyi bir arada veriyor: üstte görev başına enerjinin dağılımı, altta maliyet eşitliği. Bir sayı daha var ve 26 ile 28\. makalelerdeki bütün servis mühendisliğinin gerekçesini yeniden yazıyor. Yukarıda andığımız BLOOM ölçümünde, modeli arayüz ardında hazır tutan makine, on dakikalık bir aralıkta **hiç istek gelmezken bile** yaklaşık 0,28 kilovat-saat harcıyordu; toplam enerjinin yaklaşık dörtte üçü, modeli bellekte tutmaya gidiyordu. Yığınlama ve çizelgeleme yalnızca hız için değil, bu boşta yanan enerjiyi işe çevirmek için de var.

## Aynı istem, iki sınır

Şimdi bu makalenin merkezindeki ölçüme geldik.

Google'ın 2025'te yayımladığı — hakemli olmayan, kendi altyapısına dair — teknik rapor, bir yapay zekâ asistanının ortanca metin isteminin enerji, karbon ve su ayak izini üretim ortamında ölçüyor. İlginç olan sonucun kendisi değil, iki ayrı sınırla iki kez verilmesi.

**Dar sınır** — literatürdeki çoğu ölçümün yaptığı gibi yalnızca hızlandırıcının etkin gücünü sayan ve en verimli veri merkezlerinden örnekleyen yordam — istem başına 0,10 vat-saat veriyor. **Geniş sınır** — bütün filodan örnekleyen, ana işlemciyi ve belleği, güvenilirlik için boşta bekletilen makineleri ve veri merkezi giderini de sayan yordam — 0,24 vat-saat. Aynı istem, aynı model, aynı gün: 2,4 kat fark, tamamen ölçümün sınırından.

![İki sütunlu tablo; sütunlar aynı istemin dar ve geniş ölçüm sınırıyla verilmiş değerleri. Hızlandırıcının etkin gücü satırında dar sınırda 0,10, geniş sınırda 0,14 vat-saat. Ana işlemci ve bellek satırında 0,04 ve 0,06. Boşta bekletilen makineler satırında 0,02 ve 0,02. Veri merkezi gideri satırında 0,01 ve 0,02; dar sınırda bu üç kalem ölçülüyor fakat toplama katılmıyor ve yıldızla işaretli. Toplam satırında dar sınır yalnızca hızlandırıcıyı saydığı için 0,10, geniş sınır hepsini saydığı için 0,24 vat-saat. Altta aynı iki sınırla karbon 0,02 ve 0,03 gram karbondioksit eşdeğeri, su 0,12 ve 0,26 mililitre. En altta bir kayıt: aradaki 2,4 katlık fark modelden değil, sınırın nereye çizildiğinden geliyor; ve kamuya açık öbür tahminler istem başına 0,3 vat-saatten 7 vat-saate kadar uzanıyor.](assets/ayni-istem-iki-sinir.svg "Şekil 3 — Fark modelde değil, sınırda")

Şekil 3 kalemleri tek tek veriyor. Karbon ve su için de aynı ikilik geçerli: 0,02'ye karşı 0,03 gram karbondioksit eşdeğeri, 0,12'ye karşı 0,26 mililitre su. Rapor ayrıca on iki ayda aynı istemin enerjisinin 33, karbonunun 44 kat düştüğünü bildiriyor.

Aynı raporun ilişkili çalışmalar bölümü, karşılaştırmanın neden bu kadar zor olduğunu gösteriyor: kamuya açık tahminler istem başına yaklaşık 0,3 vat-saatten 7 vat-saate kadar uzanıyor ve bunların bir kısmı hangi sınırla ölçüldüğünü hiç söylemiyor. Bir sayının hangi bileşenleri içerdiği söylenmediğinde, iki sayı arasındaki fark modelden mi yöntemden mi geliyor bilinemez.

Üçüncü bir kaynak da aynı sorunu taşıyor: su. Veri merkezleri soğutma için su tüketir ve elektrik üretiminin kendisi de tüketir. Yukarıdaki rapor istem başına 0,26 mililitre veriyor — beş damla — ve bunun daha önceki tahminlerden büyüklük mertebeleriyle düşük olduğunu söylüyor; alandaki bir başka çalışma benzer bir istem için 10 ile 50 mililitre arasında bir aralık vermişti. Fark yine yöntemde: hangi soğutma döngüsü, giren su mu yoksa girenden çıkan çıkarılarak bulunan tüketim mi, elektrik üretiminin payı sayılıyor mu. Suyun enerjiden bir farkı daha var ve karşılaştırmayı zorlaştırıyor: su yerel bir kaynaktır. Bir kilovat-saat her yerde bir kilovat-saattir; bir litre su, kurak bir bölgede başka bir şeydir.

## Birim düşerken toplam yükselebilir

Son bir ayrım kalıyor ve iki tarafı da ölçülmüş.

Eric Masanet ve arkadaşlarının Science'ta 2020'de yayımladığı çalışma, küresel veri merkezi enerjisini yeniden hesapladı. Bulguları şu: 2010'dan 2018'e hesap örneği sayısı **yüzde 550** artarken, veri merkezlerinin toplam enerji tüketimi yalnızca **yüzde 6** artmış ve 205 teravat-saatte, yani küresel elektrik tüketiminin yaklaşık yüzde 1'inde kalmıştı. Sekiz yıl boyunca verimlilik kazançları, talebin altı buçuk katına çıkmasını neredeyse tamamen soğurmuştu.

Bu, iyimserlik için iyi bir kanıt — ve aynı zamanda kolayca yanlış genelleştirilen bir kanıt. Ölçüm 2018'de bitiyor; bugünkü yapay zekâ altyapısının kurulmasından önce. Ve mekanizma dikkatle okunmalı: birim başına enerjinin düşmesi toplamın düşeceği anlamına gelmez, yalnızca toplamın talebin büyüme hızından yavaş büyüyebileceği anlamına gelir. Birim ucuzladıkça talep de artabilir ve bu, verimliliğin kendi kazancını yiyebileceği klasik durumdur.

Para tarafı da aynı ayrımı gösteriyor, ters yönde. Ben Cottier ve arkadaşlarının 2024'te yayımladığı — hakemli olmayan — çalışma, sınır modellerinin amortize edilmiş eğitim maliyetinin 2016'dan beri yılda **2,4 kat** büyüdüğünü hesaplıyor; en pahalı iki koşu için verdikleri değerler 40 ve 30 milyon dolar. Ama bu paranın dağılımı şaşırtıcı: hesaplama donanımı toplamın yüzde 47–64'ü, araştırma personeli (hisse dâhil) yüzde 29–49'u, **enerji ise yalnızca yüzde 2–6'sı**. 20\. makalede bir modelin nihai eğitim koşusu için bildirdiği 5,576 milyon dolarlık rakamı hatırla; bu oranı ona uygularsak elektriğin payı kabaca 110 ile 335 bin dolar arasında çıkar. Bu kendi hesabımız ve yalnızca büyüklük mertebesi verir: o rakam kiralık kart-saati üzerinden hesaplanmış bir bedeldi, buradaki oranlar ise amortize edilmiş maliyetin dağılımı.

> **Kendini yokla:** Enerji, bir eğitim koşusunun parasal maliyetinin yalnızca yüzde birkaçıysa, enerji tartışması neden önemli?

Çünkü iki soru farklı. "Bu koşuyu yapmak kime kaça mal oluyor" sorusunun cevabı çiplere ve insanlara gider; "bu koşu dünyaya neye mal oluyor" sorusunun cevabı elektriğe ve şebekeye gider. Fiyat, çevresel bedelin bir ölçüsü değildir — bu iki eğri birlikte hareket etmek zorunda değil ve bugün etmiyor.

## Bir enerji sayısını okumanın disiplini

**Sınır nerede çiziliyor, ilk soru budur.** Yalnızca hızlandırıcı mı, ana işlemci ve bellek de mi, boşta bekleyen kapasite ve veri merkezi gideri de mi? Aynı istem için iki sınır, 0,10 ile 0,24 vat-saat gibi 2,4 katlık bir fark üretebiliyor.

**Enerji ile karbon ayrı ölçülerdir.** Şebekenin karbon yoğunluğu kat kat değişir; daha çok enerji harcayan bir koşu daha az karbon salabilir.

**Muhasebe biçimi söylenmelidir.** Bulunduğu yere göre sayım ile satın alınan enerjiye göre sayım aynı elektrik için farklı sayılar verir.

**Tahmin ile ölçüm ayrı şeylerdir.** Geriye dönük tahminler görünmeyen yordamlar yüzünden kat kat sapabiliyor; bildirmek, tahmin ettirmekten iyidir.

**Eğitim ile çıkarım ayrı kalemlerdir ve eşitlendikleri bir nokta vardır.** O nokta yüz milyonlarca çıkarım mertebesindedir; günde on milyon istek alan bir hizmet için haftalar ile aylar arası demektir.

**Su, enerjiyle aynı biçimde toplanmaz.** Bir kilovat-saat her yerde aynıdır; bir litre suyun anlamı bulunduğu havzaya bağlıdır.

**Birim maliyet ile toplam yük ayrı eğrilerdir.** Verimlilik kazancı gerçektir; toplamın ne yapacağını belirleyen şey talebin nasıl büyüdüğüdür.

### Sırada ne var

Bu makaleyle birlikte serinin dokuzuncu fazı kapanıyor. Buraya kadar hep aynı biçimde çalıştık: bir mekanizmayı sezgiyle kurduk, sonra ölçümlerle sınadık, sonra ölçümün koşullarını sorguladık. Ama ölçümleri okumanın altında, henüz açıkça kurmadığımız bir katman var — vektör, matris, olasılık, entropi, gradyan. Serinin bir sonraki fazı geriye dönüyor ve erken makalelerde sezgiyle kurduğumuz kavramları biçimsel düzeyde yeniden kuruyor. Bir sonraki makale bunun ilkiyle başlıyor: bir kelimenin sayı dizisine çevrilmesi tam olarak hangi matematiksel nesneyi kuruyordu?

## Kaynakça

- Luccioni, A. S., Viguier, S. & Ligozat, A.-L. (2023). *Estimating the Carbon Footprint of BLOOM, a 176B Parameter Language Model*. Journal of Machine Learning Research 24(253), s. 1–15. [Bağlantı](https://www.jmlr.org/papers/v24/23-0069.html)
- Strubell, E., Ganesh, A. & McCallum, A. (2019). *Energy and Policy Considerations for Deep Learning in NLP*. ACL 2019. [Bağlantı](https://aclanthology.org/P19-1355/)
- Patterson, D., Gonzalez, J., Le, Q., Liang, C., Munguia, L.-M., Rothchild, D., So, D., Texier, M. & Dean, J. (2021). *Carbon Emissions and Large Neural Network Training*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2104.10350. [Bağlantı](https://arxiv.org/abs/2104.10350)
- Patterson, D., Gonzalez, J., Hölzle, U., Le, Q., Liang, C., Munguia, L.-M., Rothchild, D., So, D. R., Texier, M. & Dean, J. (2022). *The Carbon Footprint of Machine Learning Training Will Plateau, Then Shrink*. IEEE Computer 55(7), s. 18–28. [Bağlantı](https://arxiv.org/abs/2204.05149)
- Luccioni, S., Jernite, Y. & Strubell, E. (2024). *Power Hungry Processing: Watts Driving the Cost of AI Deployment?*. FAccT 2024, s. 85–99. [Bağlantı](https://doi.org/10.1145/3630106.3658542)
- Google (2025). *Measuring the environmental impact of delivering AI at Google Scale*. Hakemli bir yerde yayımlanmamış kurumsal teknik rapor; okunan sürüm arXiv:2508.15734. [Bağlantı](https://arxiv.org/abs/2508.15734)
- Masanet, E., Shehabi, A., Lei, N., Smith, S. & Koomey, J. (2020). *Recalibrating global data center energy-use estimates*. Science 367(6481), s. 984–986. [Bağlantı](https://doi.org/10.1126/science.aba3758)
- Cottier, B., Rahman, R., Fattorini, L., Maslej, N. & Owen, D. (2024). *The rising costs of training frontier AI models*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2405.21015. [Bağlantı](https://arxiv.org/abs/2405.21015)
