---
article_id: article_57dd0a42-134a-46dd-a9dc-edc8095eee4a
title: "Araç Kullanımı: İşlev Çağrısı"
slug: arac-kullanimi-islev-cagrisi
category: agents-and-retrieval
level: intermediate
reading_order: 47
summary: "Modelin dünyaya dokunan çağrısını token düzeyinde kurar: araç tanımının isteme girişini, çağrının JSON biçimini ve ikinci durma token'ını, sonucun ayrı bir konuşmacı rolüyle dönüşünü; biçim garantisinin türü zorlayıp değeri zorlayamadığını üç denetçinin sayılarıyla, ne zaman çağrılacağının öz-denetimli ölçüsünü, yüzlerce araçta seçimin bir getirme sorununa dönüşmesini, bağımsız çağrıları aynı anda çalıştırmanın kazancını ve güvenilirliğin kapsamayla değil pass^k ile ölçülmesini anlatır."
tags:
  - arac-kullanimi
  - islev-cagrisi
  - arac-tanimi
  - uydurulmus-cagri
  - paralel-cagri
content_hash: sha256:5dbbdaebae38d222e099806196c159e0517d58126f4ca788d630404370e257e7
classification_version: 1
classification_batch: 11
---
## Eylem satırı aramaya özel değildi

46\. makale bir kapıyı bilerek açık bıraktı. Düşün–eyle–gözle döngüsünde model üç tür satır üretiyordu ve eylem satırının tek içeriği aramaktı: şunu ara, bu sayfada şu terimi bul. Kapanıştaki çalışma bunun genel olduğunu gösterdi: 6,7 milyar parametreli bir model hesap makinesi, soru-cevap sistemi, arama motoru, çevirmen ve takvim çağrılarını kendi kendine öğrenince 25 kat büyük bir modeli geçiyordu. Arama, araçlardan yalnızca biriydi.

Bu makale eylemin kendisini soruyor. Bir dil modeli yalnızca token üretir; 37\. makalede eylem bir sonraki token'dı, 46'da dünyaya dokunan bir çağrıya dönüştü. Ama dünyaya dokunmak mekanik olarak ne demek? Model bir işlevi nasıl çağırır, çağrının biçimi nasıl garanti edilir, dönen sonuç isteme nasıl girer? Ve üç soru daha: model ne zaman çağıracağını nereden bilir, yüzlerce araç arasından doğrusunu nasıl seçer, bir çağrı yanlış gidince ne olur?

Önce iki terim. **Araç kullanımı** (tool use), modelin dünyadaki bir şeyi — hesap makinesi, veritabanı, takvim, arama motoru — çağırıp sonucunu okumasının genel adı. **İşlev çağrısı** (function calling) ise bu işin bugünkü standart biçimi: geliştiricinin tanımladığı bir işlevin adını ve argümanlarını, bir programın ayrıştırabileceği yapıda üretmek. Buradaki işlev sözcüğü 30\. makaledeki anlamıyla kullanılıyor, yani bir programın çağrılabilir parçası; serinin ilk makalelerindeki matematiksel fonksiyonla karışmasın diye iki ayrı sözcük taşıyoruz.

## Bir çağrının anatomisi

Bir işlev çağrısı dört durakta yaşar ve dördü de 24\. makalede kurduğumuz tek dizinin içinde olup biter.

Birinci durak **araç tanımı** (tool definition). Geliştirici her araç için üç şey yazar: bir ad, aracın ne yaptığını ve ne zaman kullanılacağını söyleyen düz metin bir açıklama, ve argümanların adını, türünü, hangilerinin zorunlu olduğunu söyleyen bir şema — 30\. makaledeki şemanın kendisi. Bu tanımlar isteme sıradan metin olarak yazılır; çoğu sağlayıcıda sistem istemine, Meta'nın Llama 3.1 belgelendirmesindeki JSON düzeninde kullanıcı mesajına. Bir sağlayıcının belgelendirmesindeki çerçeve cümle işin özünü söylüyor: "Bu ortamda kullanıcının sorusunu cevaplamak için kullanabileceğin bir araç kümesi var", ardından şemalar gelir. Bedeli tokendir ve sıfır değildir: aynı belgelendirmeye göre yalnızca araç kullanımını açan çerçeve metin, tanımlar hariç, modele ve ayara göre 264 ile 804 token arasında yer tutar; her tanım kendi token'larını ekler ve hepsi her çağrıda yeniden okunur.

Kendi hesabımızı yapalım; sayılar açıklama amaçlı. Yirmi araç, tanım başına 150 token: 3.000 token; çerçeve metniyle birlikte 3.300. Yüz turluk bir sohbette bu blok her turda pencerede durur: 330 bin token okunur. 26\. makaledeki anahtar-değer önbelleği ve 28'deki önek paylaşımı bu bloğu her turda yeniden hesaplamaktan kurtarır, ama 21\. makaledeki pencereden düşmez: araç tanımları, sohbet daha başlamadan pencerenin bir kısmını almıştır.

İkinci durak çağrının kendisi. Model, sıradan bir cevap yazmak yerine, araç adını ve argümanlarını yapılandırılmış biçimde üretir. Llama 3.1 belgelendirmesi somut biçimi veriyor: bir ad alanı ve bir parametre sözlüğü içeren tek bir JSON nesnesi. Bunu üretmek modelin öğrendiği bir alışkanlıktır; 12\. makaledeki denetimli ince ayarın bir uzantısı, ve az sonra göreceğimiz gibi biçimin kendisi de öğrenilir.

Üçüncü durak modelin dışında. Bir **çalıştırıcı** (executor) — modeli çağıran uygulamanın kendi kodu — üretilen JSON'u ayrıştırır, gerçek işlevi çalıştırır ve sonucu alır. Model bu sırada hiçbir şey yapmaz; durmuştur. Llama 3.1 belgelendirmesi bunun için 24\. makaledeki tur sonu token'ının yanına ikinci bir durma token'ı koyuyor: **mesaj sonu** token'ı (belgelendirmenin adıyla eom_id). Tur sonu "cevabım bitti" demektir; mesaj sonu ise "durdum ama tur bitmedi, bir araç sonucu bekliyorum". Aynı belgelendirmede sistem istemine yazılan tek satırlık bir işaret — `Environment: ipython` — modelin bu ikinci token'ı kullanacağı kipi açıyor.

Dördüncü durak sonucun geri dönüşü. Çalıştırıcı, aracın döndürdüğü metni diziye **yeni bir konuşmacı rolüyle** ekler — Llama 3.1'de bu rolün adı ipython — ve turu tur sonu token'ıyla kapatır; sonra dizinin sonunu asistan başlığıyla yine açık bırakır. Model, kendi çağrısını ve dönen sonucu bütün geçmişle birlikte görerek cevabı yazar ya da bir çağrı daha yapar. 46\. makalenin ikinci şeklindeki döngünün eylemden gözleme, gözlemden modele giden kenarı, token düzeyinde tam olarak budur.

![Yukarıdan aşağıya dizilmiş beş mesaj kutusu ve sağda modelin dışındaki çalıştırıcı kutusu. En üstte metin başlangıcı işareti; ilk kutu sistem rolüdür ve Environment: ipython satırı ile get_weather aracının tanımını (ad, açıklama, şema) taşır; ikinci kutu kullanıcı rolüdür ve Ankara'da hava nasıl diye sorar; üçüncü kutu asistan rolüdür ve içinde name ile parameters alanlarından oluşan JSON çağrı, sonunda mesaj sonu işareti eom_id vardır; dördüncü kutu ipython rolüdür ve içinde 24 derece ve açık sonucu, sonunda tur sonu işareti eot_id vardır; beşinci kutu asistan başlığıyla açık bırakılmıştır ve cevap üretiminin buradan devam edeceği belirtilir. Üçüncü kutudan sağdaki çalıştırıcı kutusuna, çalıştırıcıdan dördüncü kutuya birer ok gider; çalıştırıcı kutusunda JSON'u ayrıştırır, işlevi çalıştırır, sonucu ipython rolüyle ekler yazılıdır. En altta dört durağın tek dizide olduğu, yalnızca çalıştırıcının dışarıda kaldığı ve iki durma token'ının farkı yazılıdır.](assets/islev-cagrisinin-yasam-dongusu.svg "Şekil 1 — Dört durak, tek dizi")

Şekil 1'i 24\. makalenin ilk şekliyle yan yana koy: aynı başlık token'ları, aynı tur sonu; farklı olan, dizinin ortasına giren iki yeni parça — modelin ürettiği çağrı ve dışarıdan gelen sonuç. Mimaride araç kanalı diye bir şey yok; 24'teki sistem kanalı gibi, araç sonucu da dizinin içinde bir başlık token'ıyla işaretlenmiş sıradan metindir.

> **Kendini yokla:** Araç sonucu neden modelin kendi cevabı olan asistan rolüyle değil, ayrı bir rolle diziye giriyor?

İki sebebi var ve ikisi de 24\. makaleden. Birincisi talimat hiyerarşisi: araç çıktısı, pencereye giren üçüncü taraf bir metindir — bir web sayfası, bir veritabanı satırı — ve içindeki bir talimatın sistem istemini ezmemesi gerekir; Wallace ve arkadaşlarının çerçevesinde araç çıktısı en düşük güven düzeyindedir. İkincisi öğrenilmiş alışkanlık: model o rolün altında dünyadan gelen gözlemi görmeye eğitilmiştir; sonuç asistan rolüne konsaydı model onu kendi yazdığı bir cümle sanır ve bir sonraki turda kendi iddiası gibi taşırdı.

## Biçim garantisi ve garantinin bittiği yer

Çağrı bir JSON'sa ve şeması belliyse, 30\. makalede kurduğumuz araç doğrudan uygulanabilir: çağrı üretilirken şema bir dilbilgisine çevrilir ve kod çözme anındaki maske geçersiz token'ları eler. Sağlayıcıların bugün **katı** (strict) diye adlandırdığı kip tam olarak budur ve iki sonucunu 30'dan biliyoruz: çıktı her zaman ayrıştırılabilir, ve maske token hizalı kurulmazsa doğruluk düşer.

Katı kipin ölçülmüş bir yan etkisi daha var. Shishir Patil ve arkadaşlarının ICML 2025'te sunduğu liderlik tablosu çalışmasında, çağrıyı serbest metinle isteyen düzen, yapılandırılmış çağrı kipine göre yaklaşık üç kat daha çok ayrıştırma hatası veriyor: 4.251 örnekte ortalama 412,93'e karşı 182,5. Ama ayrıştırılabilen cevaplara bakılınca tablo tersine dönüyor: birkaç araç arasından seçim gerektiren kategoride yapılandırılmış kip ortalama 77,5 yanlış çağrı üretirken serbest kip 21. Biçimi kilitlemek ayrıştırmayı kurtarıyor, seçimi değil.

Ve 30\. makalenin son uyarısı burada asıl ağırlığını kazanıyor: geçerlilik doğruluk değildir. Şema konum alanının bir dize olmasını zorlar; o dizenin var olan bir şehir olmasını değil. Bir sipariş numarası biçimce kusursuz ve tamamen uydurma olabilir.

Bunun ölçüsünü Zuxin Liu ve arkadaşlarının NeurIPS 2024'te sunduğu çalışma veriyor. Amaçları işlev çağrısı için eğitim verisi üretmekti; bunun için modelin ürettiği her çağrıyı üç denetçiden geçirdiler. **Biçim denetçisi** JSON'un ayrıştırılıp ayrıştırılmadığına, işlev adının ve argümanların tanımlı kümede olup olmadığına bakar. **Çalıştırma denetçisi** çağrıyı gerçekten çalıştırır; tür hatası, geçersiz parametre, zaman aşımı, eksik argüman burada düşer. **Anlam denetçisi** — bir başka dil modeli — çalışan çağrının sonucunun soruyla örtüşüp örtüşmediğini, çağrı sayısının kullanıcının istediğiyle uyuşup uyuşmadığını sorar. Her üretici modelden 40 bin çağrı istenmiş; sayılar öğretici:

| üretici model | biçimde düşen | çalıştırmada düşen | anlamda düşen | geçen | geçme oranı |
|---|---|---|---|---|---|
| 236 milyar parametreli sohbet modeli | 817 | 3.359 | 2.165 | 33.659 | %84,15 |
| 33 milyar parametreli kod modeli | 4.311 | 15.496 | 6.424 | 13.769 | %34,42 |

![İki panelli yatay çubuk şeması. Sol panelin başlığı 236 milyar parametreli sohbet modeli, sağ panelinki 33 milyar parametreli kod modelidir. Her panelde dört satır vardır; solda satırın adı, ortada çubuk, sağda değer yazılıdır: biçimde düşen 817 ve 4.311, çalıştırmada düşen 3.359 ve 15.496, anlamda düşen 2.165 ve 6.424, geçen 33.659 ve 13.769. Geçen satırının çubuğu vurgulu renktedir. Her panelin altında geçme oranı yüzde 84,15 ve yüzde 34,42 yazılıdır. Şeklin altında iki modelden de 40 bin çağrı istendiği, çubukların aynı ölçekte olduğu ve biçimin her iki modelde en küçük eleme olduğu yazılıdır.](assets/uc-denetci-iki-model.svg "Şekil 2 — Biçim en küçük eleme, çalıştırma en büyüğü")

Şekil 2'de iki şey görünüyor. Biçim en az eleyen denetçi: büyük modelde 40 bin çağrıdan yalnızca 817'si ayrıştırılamıyor. Asıl eleme çalıştırmada — küçük modelde 15 binden fazla çağrı biçimce doğru ama çalışmıyor — ve anlamda. Yani biçim garantisi hataların en küçük sınıfını sıfırlar. Aynı çalışma, elenen veriyi eğitime geri katınca ne olduğunu da ölçmüş: çalıştırmada ya da anlamda düşen örneklerle eğitilen model işlev çağrısı sınavında geriliyor, küçük modelde daha çok. 14\. makaledeki temizlik ilkesi burada bir denetçi zincirine dönüşmüş.

Biçimin en pahalı hatası ise var olmayan bir aracı çağırmak. Patil ve arkadaşlarının NeurIPS 2024'te sunduğu bir önceki çalışması bunu ölçülebilir kılmak için çağrıyı bir **soyut sözdizimi ağacına** (abstract syntax tree) çeviriyor: işlev adı kök, argümanlar dallar. Bir çağrı, veritabanındaki bir aracın ağacının alt ağacıysa doğrudur; hiçbir aracın alt ağacı değilse **uydurulmuş çağrı** sayılır — 17\. makaledeki uydurmanın araç biçimi ve yanlış argümanla yapılan çağrıdan ayrı bir sınıf. Üç makine öğrenmesi kütüphanesinden 1.645 araç çağrısıyla kurdukları kümede sayılar sert: doğrudan istendiğinde büyük bir ticari modelin çağrılarının yüzde 36,55'i ilk kütüphanede, yüzde 78,65'i üçüncüsünde var olmayan araçları çağırıyor. Aynı kümede eğitilmiş 7 milyarlık model aynı iki kütüphanede yüzde 6,98 ve yüzde 5,40'ta kalıyor; doğru araç belgesi isteme konduğunda ilkinde sıfıra iniyor.

Çağrının biçimi tek başına da bir değişken. Xingyao Wang ve arkadaşlarının ICML 2024'te sunduğu çalışma aynı araç kümesini üç biçimde çağırttı: JSON, sabit kalıplı serbest metin ve Python kodu olarak bir işlev çağrısı. Açık ağırlıklı modellerde JSON sürekli en zayıf biçim — 70 milyarlık bir sohbet modelinde kod olarak yüzde 35,6 ve metin olarak yüzde 37,6 doğru çağrıya karşılık JSON'da yüzde 14,3 — ama ticari modellerde en iyi: bir modelde JSON yüzde 82,0, kod yüzde 75,4. Yazarların yorumu 24\. makalenin şablon dersini tekrarlıyor: çağrının doğal biçimi, modelin eğitimde gördüğü biçimdir. Ticari modeller JSON'a özel eğitilmiş, açık modeller kodu ön eğitimden tanıyor.

> **Kendini yokla:** Biçim denetçisinden geçen bir çağrı neden hâlâ yanlış olabilir?

Çünkü şema alanın **türünü** sınar, **değerini** değil. "Sekiz haneli sipariş numarası" kuralına uyan on milyonlarca sayı vardır ve yalnızca biri o müşterinindir; bunu ancak çağrıyı çalıştırmak ya da veritabanına bakmak gösterir. Şekil 2'nin çalıştırma satırı bu yüzden en kalabalık.

## Ne zaman çağırmalı: modelin kendi ölçüsü

Bir araç tanımlanınca model onu ne zaman kullanacağını nereden bilir? Sistem istemine "gerekirse ara" yazmak 22\. makaledeki türden bir istem kararıdır, ölçülebilir bir ölçüt değil. Timo Schick ve arkadaşlarının NeurIPS 2023'te sunduğu Toolformer'ın asıl katkısı biçim değil, bu ölçüttü — ve 8\. makaledeki anlamıyla öz-denetimliydi: etiket, verinin kendisinden kesildi.

Mekanizma şöyle. Sıradan bir metin parçası al. Modele birkaç gösterimle bir araç çağrısının nasıl yazıldığını göster — 23\. makaledeki örnekle öğrenme — ve metnin her konumu için "burada bir çağrı başlar mı" olasılığını hesapla; eşiği geçen konumlarda aday çağrılar örnekle. Adayları gerçekten çalıştır. Sonra ölçüt: çağrı ve sonucu metnin önüne konduğunda, metnin **geri kalanının** kaybı — 5\. makaledeki sonraki token kaybı — düşüyor mu? Çağrısız hâle ve sonuçsuz çağrıya göre kayıp en az bir eşik kadar düşmüyorsa çağrı atılır. Kalan çağrılar metne yerleştirilir ve model bu metinle ince ayardan geçer. Çıkarım anında model çağrının açılış işaretini üretince üretim durur, araç çağrılır, sonuç metne eklenir, üretim sürer.

Ölçütün seçiciliği sayılarda: eşik 0,5'ken 3.680 hesap makinesi çağrısı kalıyor, eşik 2,0'ye çekilince 138; arama çağrıları 207.241'den 13.944'e iniyor. Eğitimden sonra kararı model veriyor ve verdiği karar ölçülmüş: olgu sorularının yüzde 98,1'inde soru-cevap aracını, aritmetik sorularının yüzde 97,9'unda hesap makinesini kendiliğinden çağırıyor. 46\. makaledeki etkin getirme "belirsizsen ara" diyordu; Toolformer'ın ölçütü bunun eğitim zamanındaki akrabası: sonraki token'ları kolaylaştırıyorsa çağır.

Shibo Hao ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma aynı soruya başka bir cevap veriyor ve mekanizması 4 ve 7\. makalelerle konuşuyor. Her aracı **bir token** olarak sözlüğe ekliyorlar: çıktı katmanına, sıradan sözcüklerin embedding'lerinin yanına, araç başına bir embedding satırı. Modelin geri kalanı donuk; yalnızca bu satırlar eğitiliyor. Model üretim sırasında bir araç token'ı seçtiğinde araç kipine geçiyor, argümanları yazıyor, sonuç metne ekleniyor: 24\. makaledeki özel token'ların araç hâli.

Kazancı, araç sayısı artınca görünüyor. Dört işlemli sıradan matematik sorularında düşün–eyle–gözle düzeniyle fark yok: 0,32'ye karşı 0,33. On üç işlemli — kuvvet, karekök, ortak kat — bir kümede tek adımlı sorularda 0,57'ye karşı 0,73, çok adımlılarda 0,06'ya karşı 0,15. Yazarların açıklaması 21\. makaleden: on üç aracın her biri için gösterim isteme sığmıyor (dört örnek, beş aracı kapsıyor); gösterimi olmayan araçlar ya hiç çağrılmıyor ya yanlış argümanla çağrılıyor. Araç token'ının eğitimi ise gösterimle sınırlı değil, elindeki bütün veriyi kullanabiliyor.

Ters yöndeki hata da ölçülüyor: hiç gerekmediği hâlde çağırmak. Patil ve arkadaşlarının liderlik tablosu bunun için ayrı bir kategori tutuyor — araçlar tanımlı ama sorunun hiçbiriyle ilgisi yok, doğru davranış çağırmamak — ve bir adım ötesini de: çok turlu bir sohbette hiçbir aracın isteği karşılayamadığını fark etmek. Tek turlu kategorilerde en iyi modeller yüzde 80 ile 95 bandındayken, eksik işlevi fark etmesi gereken kategoride aynı modelin puanı çağrı kipine göre yüzde 6 ile 41 arasında. Çağırmamayı öğrenmek, çağırmayı öğrenmekten zor.

## Doğru aracı seçmek: kaç araç, hangi araç

Şimdiye kadar bir ya da birkaç araç vardı. Gerçek uygulamalarda yüzlerce olabilir ve bu, sorunun sınıfını değiştirir.

Minghao Li ve arkadaşlarının EMNLP 2023'te sunduğu çalışma sorunu üç yeteneğe ayırıyor. **Çağırma**: araçlar istemde verilmiş, doğru çağrıyı üret. **Getirip çağırma**: araçlar istemde yok; önce bir arama aracıyla doğru aracı bul, sonra çağır. **Planlayıp getirip çağırma**: sorunun kaç adımı olduğunu da model belirliyor. 73 gerçek araç ve elle işaretlenmiş 753 çağrıyla kurdukları sınavda doğruluk:

| model | çağırma | getirip çağırma | planlayıp getirip çağırma |
|---|---|---|---|
| Alpaca-7B | 24,06 | 5,19 | 0,00 |
| GPT-3.5-turbo | 59,40 | 38,52 | 22,00 |
| GPT-4 | 63,66 | 37,04 | 70,00 |

İkinci sütun ilkinden 20 puandan fazla düşük ve sebebi çalışmanın hata çözümlemesinde: en güçlü modelin hatalarının yüzde 67,86'sı doğru aracı **getirememek**. Üçüncü sütundaki sıçrama ise küçük bir alt kümeden geliyor — elli çağrı — ve yazarlar planlamanın büyük modelde iyi, küçüklerde hiç olmadığını söylüyor; 7 milyarlık model üç adımı hiç kuramıyor.

Aracı getirmek, 29 ve 43\. makalelerin işidir: araç açıklamaları belgedir, soru sorgudur, aradaki şey bir ikili kodlayıcı ve bir vektör dizinidir. Yujia Qin ve arkadaşlarının ICLR 2024'te sunduğu çalışma bunu en büyük ölçekte kurdu: bir API pazarından 49 kategoride 16.464 gerçek araç topladılar ve araç açıklamaları üzerinde bir getirici eğittiler. Sonuç 42\. makalenin tablosunu andırıyor: ilk beş sonuçta nDCG, sözcük eşleşmesiyle 17,0, genel amaçlı bir embedding modeliyle 45,4, araç açıklamalarıyla eğitilmiş getiriciyle 84,9. Ve bir sürpriz: getiricinin bulduğu beş aracı vermek, insanın işaretlediği doğru araç kümesini vermekten daha iyi sonuç veriyor — geçme oranı 66,7'ye karşı 67,3 — çünkü doğru kümedeki bazı araçların daha iyi bir eşdeğeri var ve getirici onu buluyor.

Getirmenin 41\. makaledeki uyarısı burada da geçerli: kötü getirici zarar verir. Patil ve arkadaşlarının 1.645 araçlık kümesinde, eğitim sırasında doğru araç belgesini isteme koymak sınav puanını iki kütüphanede 12,37 ve 23,46 puan yükseltiyor; ama sınavda doğru belge yerine sıradan bir getiricinin bulduğu belge verilince puan, doğru belgeye göre yüzde 29,20, sözcük eşleşmeli getiriciyle yüzde 52,27 düşüyor. Belgesiz eğitilmiş modele sınavda belge vermek de yardım etmiyor, sözcük eşleşmeli belge açıkça zarar veriyor. Yanlış araç açıklaması, 41'deki dikkat dağıtıcı belgenin araç hâli: hiç belge vermemekten kötü.

## Aynı anda, sırayla ve yanlış giden çağrılar

Bir soru birden çok çağrı gerektirebilir ve çağrıların birbirine bağımlı olup olmaması her şeyi değiştirir. Patil ve arkadaşlarının liderlik tablosu tek turlu çağrıları buna göre sınıflandırıyor: **tek** (bir araç, bir çağrı), **çoklu** (birkaç araç arasından birini seç), **paralel** (parallel; aynı aracı birden çok kez, aynı anda), **paralel çoklu** ve **ilgisiz** (araç var, soru araç istemiyor). Altmış dört bini aşkın gerçek kullanıcı sorgusundan kurdukları alt küme tasarımcıların beklentisini düzeltiyor: kullanıcılar aynı anda çok çağrıyı nadiren, araçlar arasından **seçmeyi** çok sık istiyor; sorgu başına ortalama üç araç seçeneği, en çok otuz yedi; araç başına ortalama dört parametre, en çok yirmi sekiz.

Paralellik mümkün olduğunda kazancı büyük ve ölçülmüş. Sehoon Kim ve arkadaşlarının ICML 2024'te sunduğu çalışma, 46\. makaledeki döngünün bir zayıflığından yola çıkıyor: düşün–eyle–gözle her çağrıyı sırayla yapar; iki kentin nüfusunu karşılaştıran soruda ikinci arama birinciyi beklemek zorunda değildir ama bekler. Önerdikleri düzen üç parçalı: bir **planlayıcı** model soruyu bağımlılık çizgesine çevirir — hangi çağrı hangisinin sonucuna muhtaç —, bir görev dağıtıcı bağımlılığı olmayanları aynı anda çalıştırıcıya gönderir, sonuçlar yer tutucuların yerine yazılır ve bekleyen çağrılar açılır.

![İki bölmeli zaman çizgisi şeması. Üst bölmenin başlığı sırayla düşün–eyle–gözle düzenidir: soldan sağa model, ara A, model, ara B, model ve cevap kutuları tek bir hat üzerinde art arda dizilmiştir; her model kutusu bir öncekinin bitmesini bekler. Alt bölmenin başlığı aynı anda planlayıcı ve çalıştırıcı düzenidir: solda planlayıcı kutusu, ondan çıkan iki ok üst üste duran ara A ve ara B kutularına aynı anda gider, ikisinden çıkan oklar tek bir model kutusunda birleşir ve cevap kutusuna varır; alt hat üst hattan belirgin biçimde kısadır. Sağ kenarda ölçülen sayılar yazılıdır: iki bağımsız aramada gecikme 7,12 saniyeden 3,95 saniyeye ve girdi 2.900 token'dan 1.300'e; sekiz bağımsız aramada gecikme 20,47'den 5,47 saniyeye ve girdi 20.000 token'dan 2.800'e. Şeklin altında kutu uzunluklarının şematik olduğu, ölçülmüş olanın sağdaki sayılar olduğu yazılıdır.](assets/sirayla-ve-ayni-anda.svg "Şekil 3 — Bağımsız çağrılar sırada beklemez")

Şekil 3'teki iki hat aynı soruyu çözüyor. İki bağımsız arama gerektiren sorularda uçtan uca gecikme 7,12 saniyeden 3,95'e iniyor (1,80 kat), sekiz bağımsız arama gerektirenlerde 20,47'den 5,47'ye (3,74 kat); girdi token'ı ilkinde 2.900'den 1.300'e, ikincisinde 20.000'den 2.800'e; maliyet 3,37 ve 6,73 kat düşüyor. Doğruluk ilk kümede aynı kalıyor (62,47'ye karşı 62,00), ikincisinde 72,47'den 77,13'e çıkıyor. Kazancın sebebi öğretici: sıralı döngü aynı çağrıyı gereksiz yere tekrarlıyor ve yarım sonuçla erken duruyor; planlayıcı bu iki hatayı yapısal olarak yapamıyor. 28\. makaledeki gecikme muhasebesinin bir yüzü daha: bağımsız işlerin sırada beklemesi, hesabın değil düzenin bedelidir.

Bağımlı çağrılarda ise sıra kaçınılmazdır ve hata birikir; 46\. makaledeki halka başına hata burada çağrı başına hatadır. Qin ve arkadaşlarının çözümü 36\. makaledeki ağaç aramasının araç hâli: model çıkmaza girince "vazgeç" adlı bir işlevi çağırıp o düğümü terk ediyor ve başka bir dal açıyor. Aynı modelle, aynı sorularda geçme oranı düz döngüde 35,3; döngüyü aynı bütçeyle defalarca tekrarlayınca 44,5; geri almalı ağaçla 63,8. Kazanç zor sorularda daha büyük, çünkü düz döngünün kaç kez tekrarlanırsa tekrarlansın bulamadığı yollar var.

Peki bütün bunlar gerçek bir işte ne ediyor? Shunyu Yao ve arkadaşlarının ICLR 2025'te sunduğu çalışma bir müşteri hizmetleri ortamı kuruyor: gerçek bir veritabanı, yazan ve okuyan araçlar, sistem istemine konmuş bir alan politikası — iade yalnızca şu koşulda, değişiklik aracı yalnızca bir kez çağrılır — ve kullanıcıyı canlandıran ikinci bir model. Başarı, konuşmanın sonunda veritabanının beklenen duruma gelip gelmediğiyle ölçülüyor: 35\. makaledeki sağlam doğrulayıcının veritabanı hâli. En iyi modelin işlev çağrısıyla başarısı perakende alanında yüzde 61,2, havayolu alanında yüzde 35,2. Aynı görevi sekiz denemede sekiz kez tutturma olasılığı ise yüzde 25'in altına iniyor.

Bu son sayı bir ölçü tanımlıyor. 33\. makaledeki kapsama, k denemenin **en az birinin** başarılı olma olasılığıydı ve k ile artıyordu. Yazarlar tersini öneriyor: k denemenin **hepsinin** başarılı olma olasılığı, pass^k. Aynı denemelerden hesaplanır, ama k büyüdükçe düşer; kapsama keşfi, bu ölçü güvenilirliği ölçer. Başarısızlıkların insan eliyle incelemesi de öğretici: yüzde 55'e yakını doğru aracı yanlış argümanla çağırmak ya da kullanıcıya yanlış bilgi vermek; yüzde 25'i politikayı hesaba katmayan bir karar — iki ürünü tek çağrıda değiştirmek gerekirken ilkini değiştirip durmak gibi. Politika sistem isteminden çıkarılınca başarı perakendede 61,2'den 56,8'e, aynı koşuda havayolunda 33,2'den 10,8'e düşüyor; kural karmaşıklaştıkça model ona daha çok muhtaç. Bir de fatura: maliyetin yüzde 95,9'u girdi token'ından geliyor, yani politika metniyle araç tanımlarından. Birinci bölümdeki token bedeli, ölçekte böyle görünüyor.

> **Kendini yokla:** pass@k ile pass^k aynı denemelerden hesaplanıyorsa neden biri k ile yükselir, öbürü düşer?

Çünkü ilki "en az biri", ikincisi "hepsi" der. On denemeden üçü başarılıysa kapsama yüksek, pass^k düşüktür; müşteri hizmetinde ikinci deneme yoktur ve cetvelin hangi soruya cevap verdiğini bilmek gerekir. 16\. makaledeki disiplin: cetvel bir tasarım ürünüdür.

## İşlev çağrısının disiplini

**Çağrı, dizinin içinde sıradan metindir.** Araç tanımı istemde, çağrı asistan rolünde, sonuç ayrı bir rolde durur; mimaride araç kanalı yoktur. Sonucu asistan rolüne koyma: model onu kendi iddiası sanır.

**İkinci durma token'ını öğren.** Mesaj sonu "araç sonucu bekliyorum", tur sonu "bitti" demektir; ikisini karıştıran bir çalıştırıcı ya cevabı keser ya sonsuza kadar bekler.

**Biçim garantisi en küçük hata sınıfını kapatır.** Şema türü zorlar, değeri değil; çalıştırma ve anlam denetimi ayrı katmanlardır ve elemenin büyüğü oradadır. Katı kip ayrıştırmayı kurtarır, seçimi kurtarmaz.

**Uydurulmuş çağrı, çağrı hatası değildir.** Var olmayan bir aracı çağırmak ayrı bir hata sınıfıdır; ölçüsü soyut sözdizimi ağacı, ilacı eğitimde ve istemde doğru araç belgesidir.

**Ne zaman çağıracağı ölçülebilir.** Çağrı sonraki token'ları kolaylaştırıyorsa tutulur; çağrılmaması gereken durum ayrıca sınanır ve daha zordur.

**Araç sayısı artınca sorun getirmeye döner.** Yüzlerce araçta seçim bir getirme sorunudur; kötü getirici, hiç getirmemekten kötü olabilir.

**Bağımsız çağrılar sırada beklemez, bağımlı çağrılar hata biriktirir.** Bağımlılık çizgesi gecikmeyi ve maliyeti düşürür; bağımlı zincirde geri alma gerekir ve güvenilirlik kapsamayla değil pass^k ile ölçülür.

### Sırada ne var

Bu makalede araç bir soyutlamaydı: adı, şeması ve döndürdüğü metin. Ama en çok kullanılan üç araç öyle küçük değil. Bir arama motoru sayfalar döndürür ve sayfanın hangi parçasının isteme gireceği 44\. makalenin sorusudur; bir kod yorumlayıcısı modelin yazdığı programı çalıştırır ve hata mesajı da bir gözlemdir; bir dosya sistemi yüz binlerce satırlık bir depodur ve 43\. makalenin dizini orada yeniden ortaya çıkar. Bir sonraki makale bu üç aracı ayrı ayrı açıyor: web, kod ve dosyalarla çalışan modeller, ve her birinin arayüzünün modelin başarısını nasıl değiştirdiği.

## Kaynakça

- Schick, T., Dwivedi-Yu, J., Dessì, R., Raileanu, R., Lomeli, M., Hambro, E., Zettlemoyer, L., Cancedda, N. & Scialom, T. (2023). *Toolformer: Language Models Can Teach Themselves to Use Tools*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/d842425e4bf79ba039352da0f658a906-Abstract-Conference.html)
- Meta (2024). *Model Cards and Prompt Formats — Llama 3.1*. Resmî belgelendirme. [Bağlantı](https://www.llama.com/docs/model-cards-and-prompt-formats/llama3_1/)
- Anthropic (2026). *Tool use with Claude* ve *Define tools*. Resmî belgelendirme. [Bağlantı](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- Wallace, E., Xiao, K., Leike, R., Weng, L., Heidecke, J. & Beutel, A. (2024). *The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions*. OpenAI, hakemli olmayan ön çalışma (arXiv:2404.13208). [Bağlantı](https://arxiv.org/abs/2404.13208)
- Patil, S. G., Mao, H., Yan, F., Ji, C. C.-J., Suresh, V., Stoica, I. & Gonzalez, J. E. (2025). *The Berkeley Function Calling Leaderboard (BFCL): From Tool Use to Agentic Evaluation of Large Language Models*. ICML 2025, PMLR 267, s. 48371–48392. [Bağlantı](https://proceedings.mlr.press/v267/patil25a.html)
- Liu, Z., Hoang, T., Zhang, J., Zhu, M., Lan, T., Kokane, S., Tan, J., Yao, W., Liu, Z., Feng, Y., Murthy, R., Yang, L., Savarese, S., Niebles, J. C., Wang, H., Heinecke, S. & Xiong, C. (2024). *APIGen: Automated Pipeline for Generating Verifiable and Diverse Function-Calling Datasets*. NeurIPS 2024 Datasets and Benchmarks Track. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/61cce86d180b1184949e58939c4f983d-Abstract-Datasets_and_Benchmarks_Track.html)
- Patil, S. G., Zhang, T., Wang, X. & Gonzalez, J. E. (2024). *Gorilla: Large Language Model Connected with Massive APIs*. NeurIPS 2024. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/e4c61f578ff07830f5c37378dd3ecb0d-Abstract-Conference.html)
- Wang, X., Chen, Y., Yuan, L., Zhang, Y., Li, Y., Peng, H. & Ji, H. (2024). *Executable Code Actions Elicit Better LLM Agents*. ICML 2024, PMLR 235, s. 50208–50232. [Bağlantı](https://proceedings.mlr.press/v235/wang24h.html)
- Hao, S., Liu, T., Wang, Z. & Hu, Z. (2023). *ToolkenGPT: Augmenting Frozen Language Models with Massive Tools via Tool Embeddings*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/8fd1a81c882cd45f64958da6284f4a3f-Abstract-Conference.html)
- Li, M., Zhao, Y., Yu, B., Song, F., Li, H., Yu, H., Li, Z., Huang, F. & Li, Y. (2023). *API-Bank: A Comprehensive Benchmark for Tool-Augmented LLMs*. EMNLP 2023, s. 3102–3116. [Bağlantı](https://aclanthology.org/2023.emnlp-main.187/)
- Qin, Y., Liang, S., Ye, Y., Zhu, K., Yan, L., Lu, Y., Lin, Y., Cong, X., Tang, X., Qian, B., Zhao, S., Hong, L., Tian, R., Xie, R., Zhou, J., Gerstein, M., Li, D., Liu, Z. & Sun, M. (2024). *ToolLLM: Facilitating Large Language Models to Master 16000+ Real-world APIs*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=dHng2O0Jjr)
- Kim, S., Moon, S., Tabrizi, R., Lee, N., Mahoney, M. W., Keutzer, K. & Gholami, A. (2024). *An LLM Compiler for Parallel Function Calling*. ICML 2024, PMLR 235, s. 24370–24391. [Bağlantı](https://proceedings.mlr.press/v235/kim24y.html)
- Yao, S., Shinn, N., Razavi, P. & Narasimhan, K. (2025). *τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/1b126cc38b8638e07bef37e7b2bb72bf-Abstract-Conference.html)
