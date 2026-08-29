---
article_id: article_8ac0c0b8-aa30-49d8-b838-0850d9059cc1
title: "Ham Modelden Asistana: Post-Training Haritası"
slug: ham-modelden-asistana-post-training-haritasi
category: models-and-training
level: intermediate
reading_order: 11
summary: "Ön eğitimden çıkan metin tamamlayıcının nasıl asistana dönüştüğünü uçtan uca haritalar: post-training'in üç aşaması, etiketi kimin yazdığı, ölçülmüş davranış farkı ve bu farkın hesap bütçesindeki şaşırtıcı derecede küçük payı."
tags:
  - post-training
  - temel-model
  - talimat-takibi
  - hizalama-vergisi
  - instructgpt
content_hash: sha256:5c95883a270bb2f80796988d81949e1b7bd5274f26f747901c05ba26581b7522
classification_version: 1
classification_batch: 2
---
## Elimizdeki şey ne işe yarar?

10\. makale bir gerilimle kapandı. Altı makale boyunca bağlamı tartan bir mimari kurduk, onu internet ölçeğinde sonraki-token hedefiyle eğittik ve kendi dağılımından metin ürettirdik. 8\. makalede bu koşunun ürününe bir ad vermiştik: temel model. Yaptığı iş tek cümleye sığıyor — kendisine verilen bağlamın en olası devamını üretmek.

Şimdi o modele bir şey soralım. "Türkiye'de kaç il var?" yazdığında modelin sana bir sayı söylemesi için hiçbir sebep yok. Model soru cevaplamayı öğrenmedi; metin devam ettirmeyi öğrendi. İnternette bir soru cümlesinin ardından en sık gelen şey bir cevap değildir — sınav kâğıdında başka sorular, forum başlığında başka başlıklar, bir sözlük sayfasında başka maddeler gelir. Model de büyük olasılıkla onu yapar. Hata değil: tam olarak eğitildiği şey.

Bu makalenin sorusu şu: karşındaki asistan ile bu ham tahminci arasındaki fark tam olarak nedir, hangi ek eğitimden gelir ve o eğitimin faturası nedir? Ön eğitimden sonra gelen bütün eğitim aşamalarının toplu adı post-training. Bu makale onun haritasıdır; sonraki iki makale haritadaki iki büyük durağı tek tek açacak.

## Hedefle niyet arasındaki açı

Sorunun kaynağı modelin kalitesi değil, hedefin kendisi. Long Ouyang ve arkadaşlarının NeurIPS 2022'de yayımlanan InstructGPT çalışması bunu tek cümleyle koyar: dil modelleme hedefi — internetten alınmış bir sayfada sonraki token'ı tahmin etmek — "kullanıcının talimatını yardımsever ve güvenli biçimde yerine getir" hedefinden farklıdır. Çalışma bu açıyı adlandırırken modeli hizalanmamış (misaligned) sayar: davranış, istenen niyetle örtüşmüyordur.

Bir uyarı gerekiyor. 6\. makalede "hizalama" sözcüğünü Bahdanau'nun çeviri terimi olarak kurmuştuk: kaynak cümledeki hangi kelimenin hedefteki hangi kelimeye denk düştüğü. Buradaki hizalama başka bir şeydir — modelin davranışının insanın niyetiyle örtüşmesi. Aynı sözcük, iki ayrı kavram; bu makaleden itibaren hangi anlamda kullanıldığını bağlam söyler, ve ikinci anlamın kendisi ileride ayrı bir makalenin konusudur.

Açıyı kapatmanın ucuz bir yolu var ve önce onu denemek gerekir: modele ne istediğini örnekle anlatmak. Ön eğitim bittikten sonra hiçbir parametreye dokunmadan, istemin başına birkaç çözülmüş soru-cevap çifti koyarsan model deseni yakalar ve cevap vermeye başlar — 5\. makalede adını koyduğumuz few-shot düzeni. Örnek hiç verilmediğinde buna zero-shot denir. Bu gerçekten işe yarar, ama yeterli olmadığı ölçülmüştür: aynı çalışmada 175 milyar parametreli GPT-3'e böyle bir few-shot istem verildiğinde bile, etiketleyiciler InstructGPT'nin çıktısını yüzde 71 ± 4 oranında tercih etti. İstemle kurulan davranış, eğitimle kurulan davranışın yerini tutmadı.

Aradaki farkı önce davranış düzeyinde görelim. Aşağıdaki şekilde geçen üç aşamanın adlarını bir sonraki bölümde tek tek kuracağız; şimdilik yalnızca aynı isteme verilen cevabın nasıl değiştiğine bak.

![Aynı talimat üç ayrı kutuya girer: temel model kutusundan çıkan ok benzer başka sorulardan oluşan bir listeye, denetimli ince ayar sonrası kutudan çıkan ok kısa ve düz bir cevaba, tercih optimizasyonu sonrası kutudan çıkan ok aynı cevabı verip devamını da öneren daha yardımsever bir metne gider.](assets/ayni-istem-uc-davranis.svg "Şekil 1 — Aynı istem, üç aşamada üç davranış")

Şekil 1 aynı talimatın üç aşamadan geçerken nasıl başka başka karşılandığını gösteriyor. Dikkat edilecek şey şu: üç kutunun içindeki mimari aynı, parametre sayısı aynı, sonraki-token hedefi aynı. Değişen tek şey parametrelerin hangi veriyle ve hangi ölçüte göre ayarlandığıdır.

## Haritanın üç durağı

Post-training tek bir işlem değil, sıralı bir hattır. InstructGPT çalışması bu hattı üç adımda tarif eder ve bugün kullanılan reçetelerin çoğu hâlâ bu iskelet üzerinde durur.

**Birinci durak: gösterip öğretmek.** İnsanlar örnek talimatlar ve o talimatlara verilmesi gereken örnek cevapları yazar; model bu çiftler üzerinde normal denetimli öğrenmeyle eğitilir. Bu işlemin genel adı ince ayardır (fine-tuning) — eğitilmiş bir modeli daha küçük ve amaca dönük bir veriyle bir kez daha eğitmek. Talimat verisiyle yapılan biçimine denetimli ince ayar (supervised fine-tuning, SFT) denir.

Burada 8\. makalenin bedava öğle yemeği biter. Ön eğitimin sessiz avantajı, etiketin veriden kesilmesiydi: her token kendinden öncekiler için doğru cevaptı ve hiçbir insan bunu yazmıyordu. SFT'de etiket geri gelir ve bedeli vardır. InstructGPT için OpenAI, Upwork ve Scale AI üzerinden yaklaşık kırk kişilik bir ekip tuttu; SFT eğitim kümesi 11.295 etiketleyici tarafından yazılmış ve 1.430 gerçek kullanıcı isteminden gelmek üzere toplam 12.725 istemden ibaretti. Trilyonların yanında bu sayı yuvarlama hatası gibi durur; öyle olmadığını birazdan göreceğiz.

**İkinci durak: yargıyı modellemek.** Cevap yazmak pahalıdır, ama iki cevabı karşılaştırıp hangisinin daha iyi olduğunu söylemek çok daha ucuzdur ve daha güvenilirdir. İkinci aşamada etiketleyiciler aynı isteme verilen birden fazla cevabı sıralar; bu sıralamalardan, bir cevabın ne kadar iyi olduğunu tek bir sayıya çeviren ayrı bir model eğitilir. Adı ödül modeli (reward model). InstructGPT'nin ödül modeli 33.207 istem üzerinde toplanmış karşılaştırmalarla eğitildi.

**Üçüncü durak: ödüle göre ayarlamak.** Elde bir puanlayıcı varken model kendi cevaplarını üretir, puanlayıcı onları puanlar ve parametreler yüksek puan alan davranışa doğru oynatılır. Bu üçüncü aşamanın klasik biçiminin adı insan geri bildiriminden pekiştirmeli öğrenmedir (reinforcement learning from human feedback, RLHF); InstructGPT'de 31.144 istem üzerinde çalıştırıldı. Bugün aynı işi pekiştirmeli öğrenme kurmadan yapan daha kısa yollar da var. Durağın tamamının toplu adı tercih optimizasyonudur ve mekanizması 13\. makalenin konusu.

![Soldan sağa üç kutu: ön eğitim, denetimli ince ayar, tercih optimizasyonu. Her kutunun altında verinin ne olduğu, etiketi kimin yazdığı ve modelin neyi öğrendiği ayrı satırlarda durur; kutuların üzerindeki ok zinciri aynı parametrelerin sırayla üç kez ayarlandığını gösterir.](assets/post-training-haritasi.svg "Şekil 2 — Post-training haritası")

Şekil 2'de haritanın tamamı var ve okunacak satır ortadaki: etiketi kim yazıyor? Ön eğitimde kimse — metnin kendisi. SFT'de bir insan cevabı baştan yazıyor. Tercih optimizasyonunda insan artık cevap yazmıyor, yalnızca modelin ürettiği cevaplar arasında seçim yapıyor. Maliyet her durakta düşer, ölçek her durakta büyür.

> **Kendini yokla:** Ön eğitim ile SFT arasında öğrenme döngüsü açısından mekanik bir fark var mı?

Yok. 2\. makaledeki dört adım aynen geçerlidir: veri girer, model tahmin eder, kayıp yanlışlığı tek sayıya indirir, gradyan inişi parametreleri oynatır. Değişen tek şey doğru cevabı kimin yazdığıdır — ön eğitimde metnin kendisi, SFT'de bir insan. Bu yüzden SFT üçüncü bir öğrenme türü değil, 1\. makalede kurulan denetimli öğrenmenin ta kendisidir.

## "Talimat" tek bir şey değil

Haritanın ikinci ve üçüncü durağı "talimat takibi" diye özetleniyor, ama bu ifade insanın kafasında yanlış bir resim kuruyor: sorulan soruya doğru cevabı veren bir sistem. Gerçek kullanımın dağılımı başka bir şey söylüyor. InstructGPT çalışması, kendi arayüzüne gelen gerçek isteklerin ne olduğunu sınıflandırıp yayımladı.

| Kullanım türü | Pay |
|---|---|
| Üretim (metin yazma) | %45,6 |
| Açık uçlu soru-cevap | %12,4 |
| Fikir üretme | %11,2 |
| Sohbet | %8,4 |
| Yeniden yazma | %6,6 |
| Özetleme | %4,2 |
| Sınıflandırma | %3,5 |
| Diğer | %3,5 |
| Kapalı alan soru-cevap | %2,6 |
| Bilgi çıkarma | %1,9 |

Neredeyse yarısı serbest metin üretimi; tek bir doğru cevabı olan kapalı alan soru-cevap ise yüzde 2,6. Bu dağılımın post-training için doğrudan bir sonucu var: istenen davranışın büyük kısmı otomatik olarak puanlanamaz. "Kariyerime yeniden heves duymak için beş fikir say" isteğinin doğru cevabı yoktur; iyi ve kötü cevabı vardır. Elinde otomatik bir cevap anahtarı olmayınca geriye tek bir ölçü kalıyor: insanın yargısı. Haritanın ikinci ve üçüncü durağının neden pahalı insan emeğine dayandığının cevabı budur.

### İleri okuma notu: adlandırma kargaşası

Bu alanın terimleri iç içe geçmiş durumda ve kaynaklarda aynı şey için farklı adlar görürsün. **Post-training**, ön eğitimden sonra gelen her şeyin şemsiye adıdır. **İnce ayar**, eğitilmiş bir modeli yeni veriyle bir kez daha eğitme işleminin genel adıdır ve post-training'in içinde de dışında da kullanılır — kendi verinle kendi işine uyarlamak da bir ince ayardır ve seride ayrıca ele alınacaktır. **Talimat ince ayarı** (instruction tuning), SFT'nin talimat verisiyle yapılan biçimine verilen addır; birçok metin ikisini eşanlamlı kullanır. **RLHF** ise yalnızca üçüncü durağın klasik biçimidir, post-training'in tamamı değildir — nitekim bugün pek çok sistem üçüncü durağı RLHF'siz geçiyor.

## Faturayı yan yana koy

Şimdi bu üç durağın maliyetini ön eğitimle karşılaştıralım. 9\. makalede hesabın birimini kurmuştuk: PF-gün, yani bir petaFLOP/s hızındaki makinenin bir günlük iş miktarı.

InstructGPT çalışması üç sayıyı doğrudan veriyor. GPT-3'ün ön eğitimi 3.640 PF-gün. Aynı modelin 175 milyar parametreli SFT sürümünün eğitimi 4,9 PF-gün. Üçüncü aşamadan geçmiş sürümün eğitimi 60 PF-gün.

Bölelim. 60 ÷ 3.640 = 0,0165, yani üçüncü aşama ön eğitimin yüzde 1,6'sı kadar hesap harcıyor. SFT için 4,9 ÷ 3.640 = 0,00135, yani binde 1,3. İkisi toplandığında 64,9 ÷ 3.640 = 0,0178 — post-training'in tamamı, ön eğitim bütçesinin yüzde 1,8'i.

![İki panel yan yana: soldaki panelde ön eğitimin uzun hesap çubuğunun yanında post-training'in ince çubuğu yüzde 1,8 etiketiyle durur; sağdaki panelde post-training sonrası ölçülen insan tercih oranları karşılaştırılır ve ince çubuğun yarattığı fark belirgindir.](assets/hesap-ve-davranis.svg "Şekil 3 — Küçük hesap, büyük davranış farkı")

Şekil 3 bu asimetriyi iki panelde yan yana koyuyor ve makalenin en önemli cümlesi buradan çıkıyor: **modelin bildikleri ön eğitimden, davranışı post-training'den gelir.** Bilgiyi yazan koşu haftalar sürdü ve on binlerce çip çalıştırdı; davranışı yazan koşu onun yüzde ikisinden azını harcadı.

Bu, "post-training ucuzdur" demek değildir. Hesap ucuzdur; veri değildir. Ön eğitim verisi de emek ister — 8\. makaledeki temizlik hattı bunu göstermişti — ama o emek metni **süzmeye** gider, tek tek etiket yazmaya değil. Post-training verisinin her satırının arkasında bir insanın oturup ya cevabı yazması ya da iki cevabı okuyup karşılaştırması vardır. InstructGPT'nin kırk kişilik ekibi, birbirleriyle zamanın yüzde 72,6 ± 1,5'inde hemfikir oldu — yani bu iş, üzerinde kolayca anlaşılan bir iş bile değil.

## Ölçülen fark

Peki bütçenin yüzde ikisi neyi değiştirdi? Çalışmanın kendi ölçümleri şöyle.

Etiketleyiciler, 175 milyar parametreli InstructGPT'nin çıktısını aynı boyuttaki ham GPT-3'ün çıktısına karşı zamanın yüzde 85 ± 3'ünde tercih etti. Daha çarpıcı olan karşılaştırma ise şu: 1,3 milyar parametreli InstructGPT'nin çıktıları, 175 milyar parametreli GPT-3'ün çıktılarına tercih edildi. Yüz kattan fazla küçük bir model, yalnızca post-training'den geçtiği için.

Bunun ne demek olduğunu 9\. makalenin cetveliyle okumak gerekiyor. Orada ölçek yasaları bize parametre sayısını artırmanın kaybı ne kadar düşüreceğini söylüyordu. Burada ölçülen şey kayıp değil, insan tercihi. Aynı eğri, iki cetvel — 9\. makaledeki uyarı burada tam karşılığını buluyor: bir model başka bir modelden yüz kat küçükken "daha iyi" olabilir, çünkü hangi cetvelle ölçtüğün sonucu belirler.

İki ölçüm daha var. Girdide olmayan bilgiyi uydurma davranışı — özetleme ve kapalı alan soru-cevap gibi görevlerde — GPT-3'te yüzde 41 iken InstructGPT'de yüzde 21'e, yani kabaca yarıya indi. TruthfulQA adlı değerlendirme kümesinde doğru ve bilgilendirici cevap üretme sıklığı ise yaklaşık iki katına çıktı. Bu sayıları "halüsinasyon çözüldü" diye okuma: yüzde 21 hâlâ beş cevaptan birinden fazlası demektir, üstelik bu ölçüm yalnızca cevabın girdide olup olmadığına bakan dar bir ölçümdür.

> **Kendini yokla:** 1,3 milyar parametreli bir modelin 175 milyar parametreli bir modele tercih edilmesi, ölçek yasalarını yanlışlar mı?

Hayır — çünkü iki iddia aynı şeyi ölçmüyor. Ölçek yasaları sabit bir hedefte, ön eğitim kaybının parametre ve veriyle nasıl düştüğünü anlatır; buradaki karşılaştırma insan tercihini ölçer. Küçük modelin kazandığı yer bilgi değil davranıştır. Yeterince zor bir bilgi sorusunda büyük model hâlâ öndedir.

## Bedava değil: hizalama vergisi

Post-training'i ücretsiz bir iyileştirme sanma. Aynı çalışma, RLHF'den geçen modellerin bazı standart doğal dil işleme değerlendirmelerinde ham modele göre gerilediğini ölçtü ve bu gerilemeye bir ad verdi: hizalama vergisi (alignment tax). Ödenen bedel gerçektir; hizalama prosedürü bazı görevlerdeki performansı düşürür.

Vergiyi azaltmanın bir yolu da bulundu ve mekaniği öğretici: üçüncü aşamanın güncellemelerine, ön eğitim verisinden gelen güncellemeler karıştırıldı. Yani model, yeni davranışı öğrenirken eski hedefini de hatırlamaya zorlandı. Bu karışım, etiketleyici tercih puanlarından ödün vermeden gerilemeleri büyük ölçüde geri aldı.

Verginin sabit olmadığına dair de bir kayıt var. Yuntao Bai ve arkadaşlarının Anthropic'te yürüttüğü, hakem sürecinden geçmemiş 2022 tarihli çalışma, aynı hizalama eğitiminin küçük modellerde ağır bir vergiye yol açtığını — değerlendirmelerin genelinde performansın düştüğünü — buna karşılık 13 ve 52 milyar parametreli modellerde zero-shot değerlendirmelerde iyileşme sağladığını bildiriyor. Yani aynı işlem, modelin boyuna göre bir kez ceza bir kez ikramiye olabiliyor. Bu bulgunun kaynağı hakemli bir yayın değil, bir laboratuvarın kendi teknik raporudur.

Aynı rapordan gelen ikinci bir gerilim daha var ve seride uzun süre peşimizi bırakmayacak: yardımseverlik ile zararsızlık çoğu zaman birbirine ters çeker. Zarardan kaçınmaya aşırı odaklanmak, kullanıcının ihtiyacına hiç dokunmayan "güvenli" cevaplar üretir. Bu gerilimin kendisi ileride ayrı bir makalenin konusu; şimdilik şunu işaretleyelim: post-training tek bir ölçütü değil, birbiriyle çelişen birkaç ölçütü aynı anda optimize etmeye çalışır.

> **Kendini yokla:** Bir modeli talimat verisiyle eğitmek neden bazı görevlerdeki performansını düşürebilir?

Çünkü parametreler ortaktır. Model yeni bir davranışı öğrenirken aynı ağırlıklar oynar ve eski hedefe göre iyi ayarlanmış bazı bölgeler bozulur. 2\. makaledeki genelleme sorununun bir akrabası: dar bir veriye çok iyi uyum sağlamak, geniş veriden gelen yetenekleri aşındırabilir.

## Fikir yeni değil, ölçek yeni

İki aşamalı eğitim fikri 8\. makalede zaten karşımıza çıkmıştı: Alec Radford ve arkadaşlarının 2018 tarihli GPT-1 raporu yöntemini baştan iki yarım olarak kurar — önce etiketsiz metinle üretici ön eğitim, sonra göreve özgü ikinci bir aşama. O rapordaki ikinci yarım dar bir şeydi: modeli tek bir göreve, örneğin duygu sınıflandırmasına uydurmak. Değişen şey, ikinci yarımın hedefinin genişlemesidir. Artık modeli belirli bir göreve değil, "kullanıcının ne istediğini anla ve yardımcı ol" gibi kapsamı tanımsız bir davranışa uyduruyoruz — ve bu, tek bir görev için etiket toplamaktan çok daha zor bir ölçme problemi doğuruyor.

Bir sonucu da şu: bugün "model" dediğimiz şeyin neredeyse tamamı post-training'den geçmiş bir modeldir. Temel modeller çoğunlukla ürün olarak sunulmaz; araştırma ve daha ileri eğitim için bırakılır. Karşılaştığın davranışların — kibarlık, reddetme, madde madde cevap verme alışkanlığı — hiçbiri internetten öğrenilmiş değildir; hepsi bu ikinci yarımın ürünüdür.

## Harita neyi göstermiyor

Bu üç durak bir iskelettir, sabit bir reçete değil. Bugünkü sistemlerde hattın üzerine eklenmiş başka aşamalar da var: doğru cevabı otomatik olarak kontrol edilebilen alanlarda — matematik, kod — insan yargısı yerine doğrulanabilir bir ölçüt kullanan eğitim aşamaları, ya da tercih verisini insan yerine başka bir modelin ürettiği düzenler. İkisinin de yeri seride ileride; burada yalnızca haritanın kenarına işaretlenmiş durumdalar.

Bir de haritanın söylemediği şey var. Post-training modele yeni bilgi öğretmez; "bildikleri ön eğitimden, davranışı post-training'den gelir" cümlesi tam da bunu söylüyordu. Ön eğitimde hiç görülmemiş bir olgu, on iki bin talimat örneğiyle parametrelere yazılmaz. Post-training'in yaptığı şey, ön eğitimde biriken devasa dağılımın hangi bölgesinin kullanıcıya döneceğini seçmektir. Bu iddianın ne kadar doğru olduğu, ne kadarının abartı olduğu ise bir sonraki makalenin merkezindeki tartışmadır.

### Sırada ne var

Haritayı çizdik: üç durak, üç ayrı veri türü, üç ayrı etiket sahibi. Şimdi ilk durağa inip mekanizmaya bakmak gerekiyor. Bir talimat-cevap çifti kayba tam olarak nasıl dönüşüyor, cümlenin hangi token'ları kayba giriyor, hangileri girmiyor? Ve asıl rahatsız edici soru: on iki bin örnek nasıl yetiyor — yoksa aslında bin örnek de mi yeter?

## Kaynakça

- Ouyang, L., Wu, J., Jiang, X., Almeida, D., Wainwright, C., Mishkin, P., Zhang, C., Agarwal, S., Slama, K., Ray, A., Schulman, J., Hilton, J., Kelton, F., Miller, L., Simens, M., Askell, A., Welinder, P., Christiano, P., Leike, J. & Lowe, R. (2022). *Training language models to follow instructions with human feedback*. Advances in Neural Information Processing Systems 35 (NeurIPS 2022). [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/b1efde53be364a73914f58805a001731-Abstract-Conference.html)
- Brown, T. B. ve ark. (2020). *Language Models are Few-Shot Learners*. NeurIPS 2020 (arXiv:2005.14165). [Bağlantı](https://arxiv.org/abs/2005.14165)
- Radford, A., Narasimhan, K., Salimans, T. & Sutskever, I. (2018). *Improving Language Understanding by Generative Pre-Training*. OpenAI teknik raporu (hakemli değildir). [Bağlantı](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)
- Bai, Y. ve ark. (2022). *Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback*. Anthropic teknik raporu, arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2204.05862)
- Lin, S., Hilton, J. & Evans, O. (2022). *TruthfulQA: Measuring How Models Mimic Human Falsehoods*. Proceedings of the 60th Annual Meeting of the Association for Computational Linguistics (ACL 2022), s. 3214–3252. [Bağlantı](https://aclanthology.org/2022.acl-long.229/)
