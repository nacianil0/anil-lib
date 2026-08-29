---
article_id: article_74b3baef-a0ec-400d-8fdf-75e2acfbe086
title: "Talimatla Eğitim: Supervised Fine-Tuning"
slug: talimatla-egitim-supervised-fine-tuning
category: models-and-training
level: intermediate
reading_order: 12
summary: "Bir talimat-cevap çiftinin kayba tam olarak nasıl döndüğünü adım adım kurar: hangi token'ların kayba girdiği, sınırı çizen özel işaretler, talimat verisinin ölçekle ilişkisi ve 'bin örnek yeter mi' tartışmasının ölçülmüş iki yüzü."
tags:
  - denetimli-ince-ayar
  - talimat-ince-ayari
  - kayip-maskesi
  - lima
  - sentetik-veri
content_hash: sha256:42b3b0bf7b18fe5dbf4161b10749e9517982a9240ab8a77755041298f4ddd7a6
classification_version: 1
classification_batch: 2
---
## Aynı döngü, bu kez cevabı insan yazıyor

11\. makale post-training'in haritasını çizdi ve ilk durağın adını koydu: denetimli ince ayar. Aynı makalede bunun yeni bir öğrenme türü olmadığını da söylemiştik — 2\. makaledeki döngünün ta kendisi, tek farkı doğru cevabı bir insanın yazması.

Bu doğru ama eksik. "Doğru cevabı insan yazıyor" cümlesi, mekanizmanın en öğretici ayrıntısını gizliyor. Ön eğitimde dizinin **her** konumu bir eğitim hedefiydi; talimatla eğitimde öyle değil. Modelin talimatın kendisini üretmeyi öğrenmesini istemiyoruz, talimata verilecek cevabı üretmeyi öğrenmesini istiyoruz — ve bu ayrımın kayıp hesabında doğrudan bir karşılığı var.

Bu makalenin soruları şunlar: bir talimat-cevap çifti kayba tam olarak nasıl dönüşür, kaç örnek gerekir, ve o örnekleri kim yazar? Sonuncusu, sanılandan çok daha tartışmalı bir soru.

## Merdivenin yalnızca yarısı

8\. makalede tek bir cümleden sekiz eğitim hedefi çıkarmıştık: bağlam her satırda bir token uzuyor, hedef bir token kayıyor, dizinin uzunluğu kadar örnek kendiliğinden ortaya çıkıyordu. Şimdi aynı merdiveni bir talimat-cevap çiftine kuralım.

Çift şu olsun. Talimat: "Şu cümleyi soruya çevir: Kedi uyudu." Cevap: "Kedi uyudu mu?" Yine 8\. makaledeki basitleştirmeyi kullanıyoruz — her kelimeyi ve noktalama işaretini tek token sayıyoruz; gerçek bir tokenizer başka türlü bölerdi.

| # | Token | Bölüm | Hedef mi? |
|---|---|---|---|
| 1 | Şu | talimat | hayır |
| 2 | cümleyi | talimat | hayır |
| 3 | soruya | talimat | hayır |
| 4 | çevir | talimat | hayır |
| 5 | : | talimat | hayır |
| 6 | Kedi | talimat | hayır |
| 7 | uyudu | talimat | hayır |
| 8 | . | talimat | hayır |
| 9 | Kedi | cevap | evet |
| 10 | uyudu | cevap | evet |
| 11 | mu | cevap | evet |
| 12 | ? | cevap | evet |
| 13 | cevap sonu | cevap | evet |

On üç token, ama yalnızca beş hedef. Oran 5 ÷ 13 = 0,385, yani konumların yüzde 38'i. Ön eğitim olsaydı on üç token on üç hedef verirdi.

Buna kayıp maskesi (loss mask) denir: talimat token'larının kayba katkısı sıfırlanır, yalnızca cevap token'larının kaybı ortalamaya girer. Yeni bir mekanizma değil. 6\. makalede maskelemeyi "yasak konumların skorunu eksi sonsuz yapmak" diye kurmuş, 7\. makalede nedensel maske olarak özelleştirmiştik. Aynı fikir, üçüncü kez ve başka bir yerde: orada dikkatin nereye bakabileceğini, burada kaybın neyi sayacağını sınırlıyoruz.

![Yatay bir token şeridi: soldaki sekiz kutu talimat bölümüdür ve solgun görünür, sağdaki beş kutu cevap bölümüdür ve belirgindir; her cevap kutusunun üzerinde aşağı bakan küçük bir ok kayıp toplamına gider, talimat kutularının üzerinde ok yoktur ama hepsi bağlam okuyla sağdaki kutulara bağlanır.](assets/kayip-maskesi.svg "Şekil 1 — Aynı dizi, iki farklı rol")

Şekil 1'in okunacak yeri talimat kutularının çift rolü: kayba girmiyorlar ama bağlamda duruyorlar. Model dokuzuncu token'ı tahmin ederken ilk sekizin hepsini görür; yalnızca "sekizinci token'dan sonra ne gelmeliydi" sorusunun cevabı için ceza almaz.

> **Kendini yokla:** Talimat token'ları kayba girmiyorsa model onları hiç öğrenmiyor mu?

Öğreniyor — ama başka bir anlamda. Talimat token'ları girdi olarak kalır; model onları okur, dikkat onlara bakar, cevap onlara koşullanır. Kayba girmemesi "görünmez" demek değil, "üretilmesi istenmiyor" demektir. Model talimatı anlamayı öğrenir, talimat yazmayı değil.

Bu kuralın mutlak olmadığını da söylemek gerekiyor. Zhengyan Shi ve arkadaşlarının NeurIPS 2024'te yayımlanan çalışması, kaybı talimat token'larına da uygulamanın bazı durumlarda daha iyi sonuç verdiğini ölçtü. İki koşul belirleyici çıktı: talimatın cevaba göre uzun olduğu veriler ve eğitim örneği sayısının az olduğu ayarlar. Yazarların açıklaması öğretici — kaybı yaymak, küçük talimat verisine aşırı uyum sağlamayı azaltıyor. Yani "yalnızca cevaba kayıp" bir varsayılan, bir yasa değil.

## Sınırı kim çiziyor?

Model, talimatın nerede bitip cevabın nerede başladığını nereden biliyor? Eğitim sırasında bunu maske söyler, ama çıkarım anında maske yoktur — model bir metin akışı görür.

Cevap sözlükte. Eğitim çiftleri, sıradan metinde geçmeyen özel token'larla sarılır: konuşmacı sınırlarını, talimatın başını ve cevabın sonunu işaretleyen ayraçlar. Model bu işaretleri de tıpkı diğer token'lar gibi öğrenir; "cevap sonu" işaretini üretmeyi öğrenmesi, üretimin ne zaman duracağını bilmesinin tek yoludur — 10\. makaledeki otoregresif döngünün kendiliğinden duracak bir mekanizması yoktur. Bu işaretlerin bütününe sohbet biçimi denir ve rollerin, sistem talimatlarının nasıl kurulduğu ileride ayrı bir makalenin konusu; burada bilmemiz gereken tek şey, sınırın veriye açıkça yazıldığıdır.

### İleri okuma notu: çok turlu sohbet

Yukarıdaki örnek tek turluydu: bir talimat, bir cevap. Gerçek sohbet verisi genellikle uzun bir dizidir — kullanıcı, asistan, kullanıcı, asistan. Maske kuralı aynen genelleşir: kullanıcının bütün turları bağlamda durur ama hedef değildir, asistanın bütün turları hedeftir. Yani beş turluk bir sohbetten tek bir dizi içinde birden çok kayıp bölgesi çıkar. Bunun pratik bir sonucu var: aynı token bütçesiyle daha çok denetim sinyali elde etmek istiyorsan, uzun ve çok turlu örnekler kısa çiftlerden daha verimlidir.

## Talimat verisi nereden gelir?

En doğrudan yol insanlara yazdırmaktır ve 11\. makalede maliyetini görmüştük: InstructGPT'nin SFT kümesi 12.725 istemden ibaretti ve arkasında kırk kişilik bir ekip vardı.

Ondan önce denenmiş daha ucuz bir yol var. Jason Wei ve arkadaşlarının ICLR 2022'de sözlü sunumla yayımlanan FLAN çalışması şunu sordu: elde zaten onlarca etiketli doğal dil işleme veri kümesi var — duygu sınıflandırması, çıkarım, soru-cevap. Bunları yeniden yazmak yerine, her birini doğal dilde bir talimata çevirsek ne olur?

Yaptıkları tam olarak bu. 62 mevcut veri kümesini on iki görev kümesine ayırdılar ve her veri kümesi için elle **on ayrı talimat şablonu** yazdılar; ayrıca çeşitliliği artırmak üzere her veri kümesine, görevi tersine çeviren üç şablona kadar ekleme yaptılar — duygu sınıflandırmasında "bu yorumun duygusu nedir" sorusunun yanına "şu duyguda bir film yorumu yaz" görevini koymak gibi. Eğitim sırasında her örnek, o veri kümesinin şablonlarından rastgele seçilen biriyle biçimlendirildi.

![Solda tek bir veri kümesi satırı: metin alanı ve etiket alanı. Sağa doğru üç ok çıkar ve her biri aynı satırı farklı bir doğal dil talimatına çevirir; üçüncüsünde görev tersine döner, yani etiket girdiye ve metin hedefe geçer.](assets/sablonla-talimata.svg "Şekil 2 — Var olan bir veri kümesi nasıl talimata çevrilir")

Şekil 2'deki tek satırın üç ayrı talimata dönüşmesi, yöntemin bütün fikri: veri zaten vardı, eksik olan onu talimat biçiminde sormaktı. Sonuç ölçüldü — 137 milyar parametreli model bu şekilde eğitildiğinde, hiç görmediği görevlerde zero-shot olarak, değerlendirilen 25 veri kümesinin 20'sinde GPT-3'ün zero-shot performansını geçti. Çalışmanın ayrıştırma deneyleri iki şeyi daha gösterdi: talimat kümesi sayısı arttıkça performans artıyor ve doyuma ulaşmıyor; talimat metni çıkarıldığında ise kazanç kayboluyor, yani işi yapan şey verinin kendisi değil, doğal dille sorulmuş olması.

Ama aynı çalışmanın en öğretici bulgusu bir başarı değil, bir başarısızlık. Talimat ince ayarı yalnızca büyük modellerde işe yaradı: 100 milyar mertebesindeki iki modelde hiç görülmemiş görevlerde belirgin iyileşme sağlarken, 8 milyar ve daha küçük modellerde performansı **düşürdü**. Yazarların açıklaması, eğitimde kullanılan yaklaşık kırk görevi öğrenmenin küçük modelin bütün kapasitesini doldurmasıdır.

> **Kendini yokla:** Aynı talimat verisi neden küçük bir modele zarar verip büyük bir modele yarar sağlasın?

Çünkü parametreler ortak ve sınırlı bir kaynaktır. Küçük bir modelde kırk yeni görevi öğrenmek, ön eğitimden gelen daha genel yetenekleri yerinden eder; büyük modelde aynı görevler kapasitenin küçük bir kısmını kullandığı için genel yetenekler yerinde kalır ve üzerine talimat takibi eklenir. 2\. makaledeki genelleme sorununun kapasite tarafı burada karşımıza çıkıyor.

## Bin örnek yeter mi?

Buraya kadar sayı büyüdü: 62 veri kümesi, on iki bin istem. Chunting Zhou ve arkadaşlarının NeurIPS 2023'te yayımlanan LIMA çalışması tersini denedi ve sonuç alanın varsayımını sarstı.

LIMA, 65 milyar parametreli bir LLaMa temel modelini yalnızca **1.000 örnekle** ince ayara soktu; pekiştirmeli öğrenme, ödül modeli, tercih verisi yok. Örnekler elle seçildi: 200'ü fen ve mühendislik konulu Stack Exchange sorusu, 200'ü diğer konulardan Stack Exchange, 200'ü wikiHow, 150'si bir yazma forumundan, 50'si mevcut bir talimat kümesinden ve 200'ü doğrudan yazarların kendi kalemlerinden. Toplam yaklaşık 750.000 token — kıyas için, aynı temel modelin ön eğitimi 1,4 trilyon token gördü. Oran 1.400.000.000.000 ÷ 750.000 = 1.866.667, yani yaklaşık 1,9 milyon kat.

Sonuç: insan değerlendiricilere göre LIMA'nın cevapları, GPT-4'ün cevaplarına yüzde 43 oranında eşit ya da üstün bulundu; Bard'a karşı bu oran yüzde 58, DaVinci003'e karşı yüzde 65 çıktı.

Yazarlar bulgularını bir hipotez hâline getirdi ve adını koydular: **yüzeysel hizalama hipotezi** (superficial alignment hypothesis). Kendi ifadeleriyle, bir modelin bilgisi ve yetenekleri neredeyse tamamen ön eğitimde öğrenilir; hizalama ona yalnızca kullanıcıyla etkileşirken hangi biçim alt dağılımını kullanacağını öğretir. 11\. makalenin kapanışındaki cümle bu hipotezin tam karşılığıydı: post-training modele yeni bilgi öğretmez, hangi bölgenin kullanıcıya döneceğini seçer.

Hipotez cazip ama tartışmalı ve karşı kanıtı aynı yıl geldi. Arnav Gudibande ve arkadaşlarının hakem sürecinden geçmemiş 2023 tarihli çalışması, güçlü bir modelin çıktılarını taklit ederek eğitilen modelleri inceledi. İnternet üzerinden görevlendirilen değerlendiriciler bu modellerin çıktılarını ChatGPT'ninkiyle yarışır buldu; hedefli otomatik değerlendirmeler ise taklit verisinde iyi temsil edilmeyen görevlerde temel modelle hedef model arasındaki açığın neredeyse hiç kapanmadığını gösterdi. Yazarların sonucu tek cümle: taklit modelleri üslubu taklit etmekte ustadır, olgusallığı taklit etmekte değil.

İki bulgu çelişmiyor; aynı madalyonun iki yüzü. Biçim ucuzdur, bilgi değildir. LIMA ekibinin kendi sınırlama notu da bu yöndedir: modelin ürün düzeyindeki sistemler kadar sağlam olmadığını, üretimde talihsiz bir çekiliş ya da düşmanca bir istemin sık sık zayıf bir cevaba yol açtığını yazarlar. 10\. makaleyi hatırla — üretim bir çekiliştir; bin örnekle kurulmuş bir davranış, çekilişin kötü gittiği durumlara karşı dayanıksızdır.

Aradaki ayrımı somutlaştıralım. Bin örnek, modele "cevapların başında selam verme, doğrudan konuya gir" gibi bir biçim kuralını rahatlıkla öğretebilir; çünkü bu kural bin örneğin hepsinde aynıdır ve zaten ön eğitimde görülmüş bir yazım tarzının seçilmesinden ibarettir. Aynı bin örnek, modele Osmanlı vergi sisteminin nasıl işlediğini öğretemez; çünkü o bilgi ya ön eğitim derleminde vardır ya yoktur. Yüzeysel hizalama hipotezinin doğru olduğu yer birincisi, sınırının başladığı yer ikincisidir. Tartışmanın kapanmamış kısmı ise aradaki gri bölgedir: akıl yürütme adımlarını sıraya koymak, bir formatı istikrarla sürdürmek, uzun bir görevde tutarlı kalmak — bunlar biçim mi, yetenek mi? Alanın buna verdiği ortak bir cevap henüz yok.

> **Kendini yokla:** Bin örnekle eğitilen bir model, o bin örnekte hiç geçmeyen bir konuda nasıl doğru cevap verebiliyor?

Çünkü bilgi o bin örnekten gelmiyor. Bilgi ön eğitimde, trilyonlarca token boyunca parametrelere yazıldı; bin örnek yalnızca o bilginin hangi biçimde dışarı verileceğini gösteriyor. Bu, ön eğitimde hiç geçmemiş bir konu için işe yaramaz — model orada da akıcı bir cevap üretir, ama doğru olmasının bir sebebi yoktur.

## Aynı koşu, iki cetvel

Buradan tuhaf bir olgu çıkıyor ve 2\. makaledeki en temel uyarılardan birine ters düşüyor gibi görünüyor.

InstructGPT'nin SFT modeli 12.725 istem üzerinde **on altı epok** eğitildi. Aynı çalışma, modellerin doğrulama kaybında daha birinci epoktan sonra aşırı öğrendiğini açıkça yazıyor. Klasik reçete burada dururdu. Ama devam etmişler ve şunu bildiriyorlar: daha çok epok, bu aşırı öğrenmeye rağmen hem ödül modeli puanını hem insan tercih puanlarını yükseltiyor. Son model seçimi doğrulama kaybına göre değil, ödül modeli puanına göre yapılmış.

LIMA ekibi de aynı duvara çarpmış ve daha açık söylemiş: perplexity üretim kalitesiyle bağlantılı çıkmadığı için kontrol noktasını elle seçmişler — elli örneklik küçük bir doğrulama kümesine bakarak, beşinci ve onuncu epoklar arasından.

![İki eğri aynı yatay epok ekseni üzerinde: doğrulama kaybı eğrisi birinci epoktan sonra yükselmeye başlar, insan tercih puanı eğrisi ise on altıncı epok bölgesine kadar yükselmeye devam eder; iki eğrinin ayrıştığı nokta işaretlenmiştir.](assets/iki-cetvel-sft.svg "Şekil 3 — Doğrulama kaybı yükselirken tercih puanı da yükseliyor")

Şekil 3 bu ayrışmayı gösteriyor; eğrilerin biçimi şematiktir, ölçülmüş olan yönleridir. 9\. makaledeki uyarı yine karşımızda: aynı koşu, iki cetvel. Doğrulama kaybı modelin metni ne kadar olası bulduğunu ölçer; insan tercihi cevabın ne kadar işe yaradığını. İkisi aynı yöne gitmek zorunda değil ve talimatla eğitimde çoğu zaman gitmiyor.

Bu, "aşırı öğrenme iyidir" demek değil. Ölçtüğün şeyin ne olduğuna dikkat et demek. 2\. makaledeki aşırı öğrenme tanımı — modelin örüntü yerine örneğin kendisini ezberlemesi — hâlâ geçerli bir tehlikedir; değişen şey, doğrulama kaybının bu tehlikenin güvenilir bir göstergesi olmaktan çıkmasıdır.

## Sentetik kestirme ve bedeli

İnsan pahalı, veri kümeleri sınırlı. Üçüncü bir yol daha var: talimat verisini modele ürettirmek.

Yizhong Wang ve arkadaşlarının ACL 2023'te yayımlanan Self-Instruct çalışması bunu sistemli biçimde kurdu. 175 elle yazılmış tohum görevle başlanır; her adımda havuzdan sekiz görev örnek olarak modele verilir, model yeni talimatlar üretir, sonra o talimatlara girdi ve çıktı üretir, ardından düşük kaliteli ve tekrar eden üretimler otomatik kurallarla elenir. Kalanlar havuza eklenir ve döngü yeniden başlar. GPT-3 üzerinde çalıştırıldığında yaklaşık 52.000 talimat ve 82.000 örnek çıktı; bu veriyle kendi kendine ince ayara sokulan model, aynı ölçüm kümesinde ham GPT-3'e göre yüzde 33 mutlak iyileşme sağladı ve insan değerlendirmesinde InstructGPT'nin ilk sürümünün yalnızca yüzde 5 gerisinde kaldı.

Ucuz, ölçeklenebilir ve işe yarıyor. Ama aynı çalışmanın kendi kalite denetimi, bedelin nerede olduğunu açıkça gösteriyor. Yazarlar üretilen veriden rastgele bir örneklem alıp elle inceledi:

| Soru | Evet oranı |
|---|---|
| Talimat geçerli bir görev tarif ediyor mu? | %92 |
| Girdi talimata uygun mu? | %79 |
| Çıktı doğru ve kabul edilebilir bir cevap mı? | %58 |
| Bütün alanlar geçerli mi? | %54 |

Talimatların yüzde 92'si anlamlı; ama tam ve doğru olan örneklerin oranı yüzde 54. Yani bu yöntemle üretilen verinin yaklaşık yarısı kusurlu. Yazarların kendi yorumu da bu yönde: yöntem çeşitlilikte iyi, doğrulukta değil.

Bir de yöntemin yapısal sınırı var ve bu makalenin tavanını çiziyor. SFT'nin öğrenme sinyali tek yönlüdür: "şu bağlamda şu token gelmeliydi." Bu sinyalle modele iyi bir cevabı gösterebilirsin, ama kötü bir cevabın neden kötü olduğunu söyleyemezsin — kayıp fonksiyonunun böyle bir kanalı yoktur. Sözlükteki bütün öteki token'lar, kusurlu bir cevap da mükemmel bir cevap da olsa aynı biçimde cezalandırılır. Elinde bir kez "bu cevap şundan daha iyi" biçiminde bir yargı varsa, onu SFT'nin dilinde ifade etmenin yolu yoktur.

Buradan çıkan pratik sonuç, üç kaynağın birbirinin alternatifi olmadığıdır. Mevcut veri kümelerini şablonla talimata çevirmek geniş görev çeşitliliği verir; insan yazımı örnekler biçimi ve tonu belirler; sentetik üretim ölçek sağlar ama filtrelenmeden kullanıldığında hatayı da ölçeklendirir. Bugünkü reçeteler üçünü birden karıştırır ve karışım oranının kendisi bir tasarım kararıdır — verinin kendisiyle ilgili bu soruların tamamına bir sonraki makalelerden birinde döneceğiz.

### Sırada ne var

SFT'nin yapabileceğinin sınırını gördük: model, kendisine gösterilen cevapları taklit etmeyi öğrenir. Peki gösterilecek doğru cevabın olmadığı yerde ne yapacağız? "Kariyerime yeniden heves duymak için beş fikir say" isteğinin bir cevap anahtarı yok; iki farklı cevabı okuyup birini yeğleyebiliriz, ama ikisini de baştan yazmak zorunda kalmadan. İnsanın bu ucuz yargısı — "bu daha iyi" — bir eğitim sinyaline nasıl çevrilir?

## Kaynakça

- Ouyang, L. ve ark. (2022). *Training language models to follow instructions with human feedback*. Advances in Neural Information Processing Systems 35 (NeurIPS 2022). [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/b1efde53be364a73914f58805a001731-Abstract-Conference.html)
- Shi, Z., Yang, A. X., Wu, B., Aitchison, L., Yilmaz, E. & Lipani, A. (2024). *Instruction Tuning With Loss Over Instructions*. Advances in Neural Information Processing Systems 37 (NeurIPS 2024). [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2024/hash/7ffb43adf37b3eeaba559098bc084cc6-Abstract-Conference.html)
- Wei, J., Bosma, M., Zhao, V. Y., Guu, K., Yu, A. W., Lester, B., Du, N., Dai, A. M. & Le, Q. V. (2022). *Finetuned Language Models are Zero-Shot Learners*. ICLR 2022 (sözlü sunum). [Bağlantı](https://openreview.net/forum?id=gEZrGCozdqR)
- Zhou, C., Liu, P., Xu, P., Iyer, S., Sun, J., Mao, Y., Ma, X., Efrat, A., Yu, P., Yu, L., Zhang, S., Ghosh, G., Lewis, M., Zettlemoyer, L. & Levy, O. (2023). *LIMA: Less Is More for Alignment*. Advances in Neural Information Processing Systems 36 (NeurIPS 2023). [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2023/hash/ac662d74829e4407ce1d126477f4a03a-Abstract-Conference.html)
- Touvron, H. ve ark. (2023). *LLaMA: Open and Efficient Foundation Language Models*. Meta AI teknik raporu, arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2302.13971)
- Gudibande, A., Wallace, E., Snell, C., Geng, X., Liu, H., Abbeel, P., Levine, S. & Song, D. (2023). *The False Promise of Imitating Proprietary LLMs*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2305.15717)
- Wang, Y., Kordi, Y., Mishra, S., Liu, A., Smith, N. A., Khashabi, D. & Hajishirzi, H. (2023). *Self-Instruct: Aligning Language Models with Self-Generated Instructions*. Proceedings of the 61st Annual Meeting of the Association for Computational Linguistics (ACL 2023), s. 13484–13508. [Bağlantı](https://aclanthology.org/2023.acl-long.754/)
