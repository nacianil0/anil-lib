---
article_id: article_50c7623c-ebdb-4c81-ab42-8835193ad1d4
title: "Açık Ağırlıklar ve Model Ekosistemi"
slug: acik-agirliklar-ve-model-ekosistemi
category: models-and-training
level: intermediate
reading_order: 20
summary: "Faz 2'yi kapatır: bir modelin ağırlıklarını üretmek bugün ne kadar hesap istiyor, 'açık' sözcüğü ağırlık, veri, kod, lisans ve belgelendirme eksenlerinde ne anlama geliyor, açık ağırlık ile açık kaynak nerede ayrışıyor ve şeffaflık nasıl ölçülüyor."
tags:
  - acik-agirlik
  - acik-kaynak
  - lisans
  - seffaflik
  - model-ekosistemi
content_hash: sha256:3e85a2a5055dfb6f914bad2897ea02dc2a3e4de21fbba80c587d0f161d5b5f44
classification_version: 1
classification_batch: 4
---
## Ağırlıklar kimin elinde

19\. makalenin bütün mekanizması tek bir varsayıma dayanıyordu: ağırlık matrisine erişebiliyoruz. Donduracağın, yanına iki küçük matris ekleyeceğin, sonunda birleştireceğin bir matris olmalı. Bu varsayım karşılanmadığında LoRA'nın hiçbir cümlesi kurulamaz — bir arayüzün arkasındaki modele adaptör takılamaz.

O hâlde Faz 2'yi kapatmadan önce iki soruyu sormamız gerekiyor. Birincisi üretim tarafında: bu ağırlıkları bugün kim üretebiliyor ve bedeli nedir? İkincisi paylaşım tarafında: paylaşılan ağırlıklara "açık" demek ne kadar doğru?

İkinci soru masum görünüyor ama değil. "Açık kaynak" ifadesi yazılım dünyasında otuz yılda oturmuş, hukuki ağırlığı olan bir terim. Aynı ifadenin bu alana taşınması, hem bir tanım tartışması hem de bir güç tartışması açtı.

## Kim üretebilir

Sayıyla başlayalım, çünkü sezgi burada yanıltıyor.

DeepSeek-AI ekibinin 2024 sonunda yayımladığı DeepSeek-V3 teknik raporu, kendi eğitim maliyetini açıkça bildiren ender belgelerden biri. Model 671 milyar parametre taşıyor, ama her token için bunların yalnızca 37 milyarı çalışıyor — çünkü mimarisi **uzmanlar karışımı** (mixture of experts): her girdi, ağın yalnızca bir alt kümesine yönlendirilir. Bu mimarinin nasıl kurulduğu 85\. makalenin konusu; burada gereken tek şey, hesabın toplam parametreye göre değil çalışan parametreye göre yapılması gerektiğidir.

8\. makaledeki kuralı uygulayacağız: eğitim hesabı, kabaca parametre sayısı ile token sayısının çarpımının altı katıdır. Ama önce kuralın işlediğini bildiğimiz bir sayıda sınayalım.

8\. makalenin tablosunda GPT-3'ün ön eğitim hesabı 3,14×10²³ işlem olarak duruyordu — 175 milyar parametre ve 300 milyar token'dan aynı kuralla türetilmiş. Şimdi bunu 9\. makalenin birimine çevirelim. Bir PF-gün, bir petaFLOP/s hızındaki bir makinenin bir günde yaptığı iştir: 10¹⁵ × 86.400 = 8,64×10¹⁹ işlem. Bölelim: 3,14×10²³ ÷ 8,64×10¹⁹ ≈ 3.634 PF-gün. 11\. makalede aynı eğitimin bildirilmiş değerini görmüştük: 3.640 PF-gün. İki yoldan gelen sayılar binde ikiden küçük bir farkla örtüşüyor, yani cetvel çalışıyor.

Şimdi aynı cetveli yeni modele tutalım. Model 14,8 trilyon token görmüş:

6 × 37×10⁹ × 14,8×10¹² ≈ 3,3×10²⁴ işlem.

Bölelim: 3,3×10²⁴ ÷ 8,64×10¹⁹ ≈ **38.000 PF-gün**. Yani aradan geçen dört yılda tek bir eğitim koşusunun büyüklüğü **on kata yakın** arttı.

Raporun kendi verdiği para karşılığı ise ters yönde okunuyor: 2,788 milyon H800 kart-saati ve saat başına 2 dolar varsayımıyla toplam 5,576 milyon dolar. Rakam, bu ölçekteki bir model için beklenenden düşük ve rapor bunun sebebini mühendislik optimizasyonlarına bağlıyor. Yazarların kendi koydukları kayıt önemli: bu tutar yalnızca nihai eğitim koşusunu kapsıyor; ondan önceki araştırma, mimari denemeleri ve başarısız koşular sayılmıyor. Teknik raporun kendisi de hakem sürecinden geçmiş bir yayın değil.

İki sayıyı yan yana koyunca ortaya çıkan tablo, "eğitim ucuzladı" ya da "eğitim pahalılaştı" cümlelerinin ikisini de reddediyor. Birim maliyet düşüyor, ölçek büyüyor. Giriş bileti dört şeyin aynı anda bulunmasını istiyor: birkaç milyon dolarlık bir hesap bütçesi, kesintisiz haftalarca çalışabilen bir hızlandırıcı kümesi — bu model 2.048 kartlık bir kümede eğitildi — 14\. makaledeki bütün veri hattı ve bunları çalıştıracak bir ekip. Dördünün bir arada olması, ağırlıkları sıfırdan üretebilen aktörlerin sayısını dar tutan asıl kısıt.

![Üstte GPT-3'ün ön eğitim hesabı, altta DeepSeek-V3'ün ön eğitim hesabı PF-gün ölçeğinde iki çubuk olarak gösterilir; her çubuğun yanında parametre ve token sayıları, altta ise altı çarpı parametre çarpı token kuralı yazılıdır.](assets/kim-egitebilir-pf-gun.svg "Şekil 1 — Aynı birimle iki eğitim koşusu")

Şekil 1'in taşıdığı asıl mesaj çubukların boyu değil, birimin aynı kalması. 9\. makalede kurduğumuz cetvel dört yıl sonra hâlâ çalışıyor ve karşılaştırmayı reklam diline düşmeden yapmamızı sağlıyor.

Aynı ekibin ertesi yıl yayımladığı akıl yürütme modeli DeepSeek-R1, bu tabloya ikinci bir ayrıntı ekliyor: Daya Guo ve arkadaşlarının imzasını taşıyan çalışma *Nature* dergisinde hakem sürecinden geçerek yayımlandı. Bu, birazdan göreceğimiz "blog yazısıyla duyurma" alışkanlığının içinde önemli bir istisna — ve alanın bilimsel denetimden tümüyle kaçmak zorunda olmadığını gösteriyor.

## "Açık" tek bir eksen değil

Ağırlıkları üretenler belliyse, paylaşanlar hangi anlamda paylaşıyor?

Andreas Liesenfeld ve Mark Dingemanse'nin ACM FAccT 2024'te yayımladığı çalışma bu soruyu ölçülebilir hâle getirdi. Kendilerini "açık" olarak tanıtan 40 metin üreteci ve 6 görsel üretecini, **on dört ayrı açıklık boyutunda** tek tek değerlendirdiler. Boyutlar üç öbekte toplanıyor: erişilebilirlik (eğitim kodu, ön eğitim verisi, taban model ağırlıkları, post-training verisi, post-training ağırlıkları), belgelendirme (kod belgeleri, mimari açıklaması, ön baskı, hakemli makale, **model kartı** (model card), **veri künyesi** (datasheet)) ve erişim ile lisans (paket dağıtımı, arayüz, lisans).

Bu çerçevenin gücü, bir modeli tek bir etiketle yargılamayı imkânsız kılması. Çalışmanın örnek karşılaştırması bunu açıkça gösteriyor: BloomZ adlı model on dört boyutun neredeyse hepsinde açıkken, Llama 2 yalnızca ağırlıkları paylaşıyor ve eğitim verisi hakkında hiçbir belgeye sahip değil.

![Bir tabloda iki model satır olarak, beş açıklık ekseni sütun olarak dizilir: ağırlıklar, eğitim verisi, kod, lisans ve rapor. Üstteki satırda beş hücrenin beşi de açık işaretlidir. Alttaki satırda yalnızca ağırlıklar hücresi açık, eğitim verisi ve kod kapalı, lisans ile rapor ise kısmi işaretlidir; altta tek bir etiketin bu farkı görünmez kıldığı belirtilir.](assets/acikligin-eksenleri.svg "Şekil 2 — Aynı etiket, çok farklı iki gerçek")

Alandaki iki terim bu ayrımı taşıyor. Ağırlıkları indirilebilen ama geri kalan eksenleri kapalı olan modellere **açık ağırlıklı** (open weight), bütün eksenleri açık olanlara **açık kaynak** (open source) deniyor. Yazarların üçüncü terimi ise ikisinin karıştırılmasını adlandırıyor: bu iki modelin ikisine birden "açık kaynak" demek, ikinci durumda **açıklık cilası** (open-washing) olur. Tanım, en anlaşılmaz bileşeni — ağırlıkları — paylaşıp geri kalan her şeyi kapalı tutmaya izin verdiğinde, terim bir pazarlama etiketine dönüşüyor.

Çalışmanın ikinci gözlemi bilimsel iletişimle ilgili ve 16\. makaledeki liderlik tablosu tartışmasının kardeşi. Yazarların "blog yazısıyla duyurma" dediği düzende bir model, hakemli bir makale yerine bir kurumsal blog gönderisiyle tanıtılıyor; gönderi, seçilmiş rakiplerle seçilmiş değerlendirme kümelerinde karşılaştırma tabloları içeriyor. Tablolar bilimsel yayının görüntüsünü taşıyor ama denetimini taşımıyor. Şekil 2'nin "rapor" sütununun neden ayrı bir eksen olduğu tam olarak bu.

Ölçümün toplu sonucu şu: en açık uçta üniversite ve araştırma girişimlerinin modelleri var; büyük ticari sağlayıcıların "açık" diye duyurduğu modellerin çoğu ise alt sıralarda ve bazıları kapalı bir arayüz hizmetinden yalnızca bir tık daha açık.

## Lisans neyi kısıtlıyor

Ağırlıklar indirilebiliyorsa iş bitmiş sayılmıyor; hangi koşullarla kullanabileceğini lisans söylüyor.

Somut bir örnek üzerinden gidelim. Meta'nın Llama 3.1 için yayımladığı Community License, adında "topluluk" geçmesine rağmen standart bir açık kaynak lisansı değil. İki maddesi karakteristik. Birincisi ölçek eşiği: sürümün yayımlandığı tarihte aylık etkin kullanıcısı 700 milyonu aşan bir kuruluş, modeli kullanmak için ayrıca izin almak zorunda. İkincisi görünürlük: modeli kullanan ürünlerin ilgili yerlerde "Built with Llama" ibaresini göstermesi ve bu modelden türetilen modellerin adının "Llama" ile başlaması gerekiyor.

Bu maddeler ticari olarak anlaşılır. Ama açık kaynak tanımıyla uyuşmuyorlar, çünkü o tanımın çekirdeğinde kimseyi ve hiçbir kullanım alanını dışlamama ilkesi var: kullanıcıyı büyüklüğüne göre ayıran bir madde, tanım gereği açık kaynak sayılmıyor.

Karşılaştırma da öğretici. Aynı FAccT çalışması, kullanımı sınırlayan iki farklı lisansın nasıl farklı eşikler koyduğunu gösteriyor: biri kullanıcıdan üretilen metnin makine üretimi olduğunu açıkça belirtmesini isterken, öbürü yalnızca "insan üretimi olduğunu iddia etmemesini" istiyor. İkincisi belirgin biçimde daha alçak bir eşik — ima serbest kalıyor.

## Tanım kavgası

Bu kargaşayı gidermek için Open Source Initiative, 28 Ekim 2024'te bir yıl süren bir ortak tasarım sürecinin ardından **Açık Kaynak Yapay Zekâ Tanımı**'nın 1.0 sürümünü yayımladı. Tanım dört özgürlük istiyor: sistemi herhangi bir amaçla izin almadan kullanmak, nasıl çalıştığını inceleyip bileşenlerini görmek, çıktısını değiştirmek de dâhil olmak üzere değiştirmek ve değiştirilmiş ya da değiştirilmemiş hâlini paylaşmak.

Tartışmayı yaratan madde ise veri maddesi. Tanım, eğitim verisinin kendisinin yayımlanmasını **istemiyor**; onun yerine "yetkin bir kişinin esasen eşdeğer bir sistem kurabileceği kadar ayrıntılı" veri bilgisi istiyor — verinin kaynağı, kapsamı, nasıl toplandığı, nasıl seçildiği, nasıl işlendiği.

Bu bir uzlaşma ve iki yönden eleştiriliyor. Bir yandan pratik gerekçesi güçlü: 14\. makaledeki veri hattını hatırla — telif durumu belirsiz, lisansları karışık, bir kısmı yeniden dağıtılamayan derlemler. Öbür yandan eleştirenlere göre veriyi zorunlu tutmayan bir tanım, tam da denetlenmesi gereken bileşeni denetim dışında bırakıyor.

Tartışmanın daha derin bir katmanı da var. David Gray Widder, Meredith Whittaker ve Sarah Myers West'in 2024'te *Nature*'da yayımladığı inceleme, açıklığın bu alanda ne sağlayıp ne sağlayamayacağını maddi olarak çözümlüyor. Üç kazanım sayıyorlar: şeffaflık, yeniden kullanılabilirlik ve genişletilebilirlik. En açık hâliyle bile bir modelin sunduğu şey, mevcut bir modelin üzerinde bir miktar denetim ve deney imkânıdır. Vardıkları sonuç ise şu: açıklık tek başına alandaki güç yoğunlaşmasını dağıtmıyor — çünkü hesap, veri ve emek zincirinin tamamı hâlâ birkaç büyük aktörün elinde.

> **Kendini yokla:** Bir modelin ağırlıkları herkese açıksa, o modelin nasıl davrandığını bilimsel olarak inceleyebilir miyiz?

Kısmen. Ağırlıklar elindeyse modelin bir girdiye ne yanıt verdiğini istediğin kadar ölçebilir, iç hesaplarına bakabilir, 19\. makaledeki gibi uyarlayabilirsin. Ama "bu davranış nereden geliyor" sorusu eğitim verisine bakmayı gerektirir; veri yayımlanmamışsa o soru kapalı kalır. 18\. makaledeki ezber ölçümleri ya da 14\. makaledeki filtre etkileri, ancak derlem incelenebildiğinde yapılabilen ölçümlerdi.

## Şeffaflığı ölçmek

"Açıklık bir derece meselesidir" demek, ölçmeyi de gerektiriyor. Bu alandaki en düzenli çaba, Rishi Bommasani ve arkadaşlarının Stanford'da yürüttüğü Temel Model Şeffaflık Endeksi.

Yöntem sade ve 16\. makaledeki cetvel tartışmasının içine oturuyor: yüz ayrı şeffaflık göstergesi tanımlanıyor, sağlayıcılar bu göstergelerde tek tek puanlanıyor. 2023 Ekim'indeki ilk turda on temel model sağlayıcısı puanlandı ve ortalama 100 üzerinden 37'ydi. Bir yıl sonra, sağlayıcıların kendi şeffaflık raporlarını sundukları ikinci turda on dört sağlayıcı puanlandı ve ortalama **58** oldu. İki turdaki sağlayıcı kümesi birebir aynı olmadığı için bu 21 puanlık farkı bir eğilim olarak okumak gerekiyor, tek tek şirketlerin ilerlemesi olarak değil. Çalışmanın hakem sürecinden geçmiş sürümü 2025'te TMLR'de yayımlandı.

Artışın nedeni öğretici: sağlayıcılar, ölçüldüklerini bilerek daha önce hiç açıklamadıkları bilgileri açıkladılar. Ölçüm, ölçtüğü şeyi değiştirdi — bu kez olumlu yönde.

Ama nerede iyileşmediği de aynı ölçüde öğretici. En düşük puanlı alanlar iki turda da aynı kaldı: eğitim verisinin telif durumu, veriye erişim, veriyi etiketleyen insan emeğinin koşulları ve modelin aşağı akıştaki etkisi. Yani şeffaflık, ticari riski en düşük olan yerlerde artıyor. Bu, 13\. makalede tanıştığımız aşırı optimizasyon örüntüsünün bir başka yüzü: bir gösterge kümesi hedefe dönüştüğünde, ölçülen boyutlarda ilerleme ölçülmeyenlerin pahasına gelebilir. FAccT çalışmasının kendi uyarısı da bu yöndedir — bir açıklık ölçüsünü tek bir sayıya indirmek, o sayıyı iyileştirmenin en ucuz yolunu aramayı davet eder.

## Açık ağırlık ne kazandırıyor

Bütün bu eleştiri, açık ağırlıkların değersiz olduğu anlamına gelmiyor. Somut kazanımları var ve hepsi bu serideki önceki makalelere bağlanıyor.

Birincisi uyarlama. 19\. makaledeki LoRA yalnızca ağırlıklara erişimle mümkün; kendi verinle kendi işine uyarlanmış bir model kurmak açık ağırlığın en doğrudan getirisi.

İkincisi yerellik. Model kendi donanımında çalışıyorsa istem de cevap da dışarı çıkmaz. Bu, gizlilik gerektiren alanlarda başka hiçbir yolla elde edilemeyen bir özellik.

Üçüncüsü denetlenebilirlik. FAccT çalışmasının görsel üreteçler bölümündeki gözlem çarpıcı: değerlendirilen sistemler arasında yalnızca birinin eğitim verisi incelenebilir durumdaydı ve incelendiğinde ciddi hukuki ve etik sorunlar bulundu. Kapalı sistemlerde aynı sorunların bulunmadığını değil, **bakılamadığını** biliyoruz.

Dördüncüsü bilimsel tekrarlanabilirlik. Aynı çalışma, kapalı bir sağlayıcının modellerini kullanan araştırma ekiplerinin, o modeller kullanımdan kaldırıldığında sonuçlarını tekrarlayamaz hâle geldiğini örnekliyor. Bir modelin ağırlıkları elindeyse ölçümün beş yıl sonra tekrarlanabilir; değilse ölçüm, sağlayıcının ürün takvimine bağlıdır.

Bu dört kazanımın hiçbiri "açık" etiketinin kendisinden gelmiyor; her biri belirli bir eksenin açık olmasından geliyor. Şekil 2'nin ana fikri de bu: hangi kazanımı istediğini biliyorsan, hangi eksenin açık olması gerektiğini de bilirsin.

Başlıktaki "ekosistem" sözcüğünün karşılığı da burada. Yayımlanan bir ağırlık kümesi tek bir nesne olarak kalmıyor: üzerine 19\. makaledeki adaptörler takılıyor, 27\. makalenin konusu olan kuantizasyon teknikleriyle küçültülmüş sürümleri çıkıyor, dar alanlara uyarlanmış türevleri dolaşıma giriyor. Bu türev katmanı, taban modeli üretemeyecek olan çok daha geniş bir kesimin alana katkı verebildiği tek yer.

## Geri alınamayan bir karar

Bunun bir de öbür yüzü var ve dürüstlük onu da söylemeyi gerektiriyor.

Kapalı bir modelin sağlayıcısı, bir sorun bulduğunda modeli geri çekebilir, davranışını değiştirebilir, belirli kullanımları teknik olarak engelleyebilir. Ağırlıklar bir kez yayımlandığında bu araçların hiçbiri kalmaz: indirilmiş kopya kalıcıdır ve üzerindeki her kısıt yalnızca lisans metninde durur.

Bu asimetri soyut değil; ölçülmüş bir yüzü var ve doğrudan 19\. makalenin mekanizmasına bağlanıyor. Xiangyu Qi ve arkadaşlarının ICLR 2024'te sunduğu çalışma, hizalanmış bir modelin güvenlik davranışının ince ayarla ne kadar kolay bozulduğunu ölçtü. Kasıtlı taraf çarpıcı: on kadar özel olarak hazırlanmış eğitim örneğiyle, bir arayüz üzerinden sunulan ticari bir modelin güvenlik davranışı 0,20 doların altında bir maliyetle geçersiz kılınabiliyordu.

Daha rahatsız edici bulgu ikinci deneyde. Hiçbir kötü niyet taşımayan, yaygın kullanılan talimat kümeleriyle yapılan sıradan bir ince ayar bile güvenlik davranışını ölçülebilir biçimde zayıflatıyor. Yani zarar saldırganın niyetine bağlı değil; ince ayarın kendisi 11\. ve 13\. makalelerde kurulan hizalamayı aşındırıyor.

Bunu 19\. makaleyle yan yana koy. Orada LoRA'nın davranışı ucuza değiştirebildiğini, bilgiyi ise zor taşıdığını görmüştük. Güvenlik davranışı da bir davranıştır — yani post-training'in en pahalı ürünü, uyarlamanın en ucuz hedefi. Açık ağırlık bu iki cümleyi aynı anda doğru kılıyor: kendi işine uyarlama özgürlüğüyle, hizalamayı sökme özgürlüğü aynı erişimden doğuyor.

Bundan "ağırlıkları yayımlamayın" sonucu çıkmıyor; nitekim yukarıdaki ölçüm kapalı bir modelin ince ayar hizmeti üzerinden yapıldı, yani sorun açık ağırlığa özgü değil. Çıkan sonuç şu: yayımlama geri alınamaz bir karardır ve etkisi o modelin ömrü boyunca sürer. Açık ağırlık tartışmasının güvenlik tarafını, hizalama sorununu kurduktan sonra 61–70\. makalelerde ele alacağız.

Alanın düzenlenmesi tarafında da aynı gerilim var. Yürürlüğe giren düzenleyici çerçeveler açık lisanslı modellere bazı belgelendirme yükümlülüklerinden muafiyet tanıyor; bu muafiyet, "açık kaynak" teriminin hukuki bir ödüle dönüşmesi anlamına geliyor ve tanımın nerede çizileceğini yüksek bahisli bir mesele hâline getiriyor. Düzenleme tarafının tam kurulumunu 69\. makalede yapacağız; burada işaretlenmesi gereken tek şey, tanım tartışmasının akademik bir titizlik meselesi olmaktan çıkmış olması.

### Sırada ne var

Faz 2 burada kapanıyor. Bir modelin nasıl eğitildiğini, nasıl asistana dönüştürüldüğünü, nasıl ölçüldüğünü, neyi bildiğini, nasıl uyarlandığını ve kimin elinde olduğunu gördük. Bundan sonrası eğitimle değil **kullanımla** ilgili.

Ve kullanım tarafında her şey tek bir kanaldan geçiyor. Model ister kendi diskinde dursun ister bir arayüzün arkasında, ona söyleyebildiğin her şey tek bir dizinin içine sığmak zorunda. O dizinin içinde tam olarak ne var, sınırı nereden geliyor ve ilan edilen sınırla gerçekten kullanılabilen sınır aynı şey mi?

## Kaynakça

- DeepSeek-AI (2024). *DeepSeek-V3 Technical Report*. arXiv ön çalışması (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2412.19437)
- DeepSeek-AI, Guo, D., Yang, D. ve ark. (2025). *DeepSeek-R1 incentivizes reasoning in LLMs through reinforcement learning*. Nature 645, s. 633–638. [Bağlantı](https://www.nature.com/articles/s41586-025-09422-z)
- Liesenfeld, A. & Dingemanse, M. (2024). *Rethinking open source generative AI: open-washing and the EU AI Act*. ACM FAccT 2024. [Bağlantı](https://dl.acm.org/doi/10.1145/3630106.3659005)
- Meta (2024). *Llama 3.1 Community License Agreement*. [Bağlantı](https://www.llama.com/llama3_1/license/)
- Open Source Initiative (2024). *The Open Source AI Definition – 1.0*. [Bağlantı](https://opensource.org/ai/open-source-ai-definition)
- Widder, D. G., Whittaker, M. & West, S. M. (2024). *Why 'open' AI systems are actually closed, and why this matters*. Nature 635, s. 827–833. [Bağlantı](https://www.nature.com/articles/s41586-024-08141-1)
- Bommasani, R., Klyman, K., Longpre, S. ve ark. (2025). *The 2024 Foundation Model Transparency Index*. Transactions on Machine Learning Research. [Bağlantı](https://arxiv.org/abs/2407.12929)
- Qi, X., Zeng, Y., Xie, T., Chen, P.-Y., Jia, R., Mittal, P. & Henderson, P. (2024). *Fine-tuning Aligned Language Models Compromises Safety, Even When Users Do Not Intend To!*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=hTEGyKf0dZ)
