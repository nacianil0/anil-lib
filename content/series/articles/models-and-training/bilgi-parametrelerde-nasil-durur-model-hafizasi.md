---
article_id: article_cca9681e-46dc-4113-8aea-5deeffcab68b
title: "Bilgi Parametrelerde Nasıl Durur? Model Hafızası"
slug: bilgi-parametrelerde-nasil-durur-model-hafizasi
category: models-and-training
level: intermediate
reading_order: 18
summary: "8. makalenin bıraktığı ezber-genelleme gerilimini öder: ileri beslemeli katmanların anahtar-değer belleği oluşu, bir olgunun yerini bulan nedensel izleme, yeri bilmenin düzenlemeyi getirmemesi, parametre başına kaç bit sığdığı ve kapasite dolduğunda ezberin yerini genellemeye bırakması."
tags:
  - model-hafizasi
  - ezber
  - genelleme
  - bilgi-kapasitesi
  - model-duzenleme
content_hash: sha256:052e9a2ca62c645ae3a6601f7e8d5def0ed1a9f9d07e8418db5099ab236360de
classification_version: 1
classification_batch: 3
revised_at: "2026-09-25"
revision_note: "Ezber–genelleme şekli ezberin kapasite dolunca gerilediğini gösterecek biçimde düzeltildi; kapasite hesabı kaynaktaki modelle yeniden yapıldı."
---
## Defterden ağırlığa

17\. makale bir tespitle kapandı: modeller olgusal bilgiyi ağırlıklı olarak ön eğitimde ediniyor; post-training o bilgiyi kullanmayı öğretiyor. Bilmediği bir şeyi ince ayarla öğretmeye çalışmak ise uydurma eğilimini artırıyordu.

O hâlde bilgi ön eğitimde bir yere yazılıyor. Nereye?

İlk akla gelen cevap yanlış ama öğretici. 4\. makalede embedding defterini kurmuştuk: her token'ın bir satırı var, satırlar eğitimle yazılıyor. Bir olgu oraya sığar mı? "Ankara Türkiye'nin başkentidir" cümlesindeki bilgi, "Ankara" satırında olamaz — çünkü o satır kelimenin cümleye girmeden önceki hâlidir ve 4\. makalede bunun sınırını görmüştük: tek satır, kelimenin bütün anlamlarının ortalamasında asılı kalır. Bir olgu, iki kavram arasındaki **ilişkidir**; tek bir vektöre değil, o vektörü işleyen bir hesaba yazılmış olmalı.

7\. makalede o hesabın anatomisini çıkarmıştık. Bir Transformer bloğu iki alt-katmandan oluşur ve parametreleri saymıştık: dikkat alt-katmanı dört kare matris, ileri beslemeli alt-katman iki dikdörtgen matris ve oran tam olarak iki çıkıyordu — ileri beslemeli katman, dikkatin iki katı parametre taşır, yani bloğun üçte ikisi. Orada "Transformer eşittir dikkat" denkleminin çatladığını söylemiştik. Şimdi asıl soruyu sorabiliriz: o üçte iki ne yapıyor?

## İleri beslemeli katman bir bellektir

Mor Geva, Roei Schuster, Jonathan Berant ve Omer Levy'nin EMNLP 2021'de yayımladığı çalışma bu soruya somut bir cevap verdi: ileri beslemeli katmanlar **anahtar-değer belleği** (key-value memory) gibi çalışıyor.

Mekanizma 7\. makaledeki iki matrisin yeni bir okumasıdır. Birinci matrisin her satırı bir **anahtar** gibi davranır: gelen temsille eşleştiğinde güçlü bir tepki verir. Çalışma bu anahtarların neye tepki verdiğini elle inceledi ve tepkilerin insan tarafından yorumlanabilir metin örüntülerine karşılık geldiğini buldu — alt katmanlarda yüzeysel örüntüler (belirli bir sonek, belirli bir kalıp), üst katmanlarda anlamsal örüntüler (belirli bir konu, belirli bir ilişki türü). İkinci matrisin karşılık gelen satırı ise bir **değerdir** ve sözlük üzerinde bir dağılımı iter: o örüntüden sonra hangi token'ların gelmesi muhtemelse onların olasılığını yükseltir.

![Bir ileri beslemeli katmanın iki matrisi anahtar ve değer olarak gösterilir: gelen temsil anahtar satırlarıyla eşleştirilir, en güçlü eşleşen anahtarın karşılık gelen değer satırı sözlük üzerinde bir dağılımı yukarı iter; sağda çıkan token adayları sıralanır.](assets/anahtar-deger-bellegi.svg "Şekil 1 — Bloğun üçte ikisi ne yapıyor")

Çalışmanın son bulgusu resmi tamamlıyor ve tek bir belleğe indirgeme tuzağından koruyor: bir ileri beslemeli katmanın çıktısı tek bir anahtar-değer çiftinin cevabı değil, tetiklenen belleklerin **bileşimidir**. Dahası bu bileşim katmanlar boyunca durmaz; 7\. makalede tanıştığımız artık bağlantılar sayesinde her katmanın çıktısı bir öncekinin üstüne eklenir ve nihai dağılım bu birikimin sonunda ortaya çıkar. Yani bir olgu tek bir yerde "yazılı" değil, birden çok katmanın katkısının toplamında oluşur.

Şekil 1'deki halka 6\. ve 7\. makalede kurduğumuz hattı tamamlıyor. Dikkat bilgiyi **taşır** — hangi token'ın hangi token'a bakacağına karar verir. İleri beslemeli katman ise taşınan bilgiyi bir örüntüyle eşleştirip sözlüğe doğru iter. Şekil 1'deki basitleştirilmiş örnekte, "Ankara" ile "başkent" bir arada geldiğinde tetiklenen anahtar, "Türkiye" token'ının olasılığını yükselten bir değere bağlıdır; gerçek modellerde bu iş tek bir çifte değil, birçok çiftin bileşimine düşer. Olgu ne embedding satırındadır ne dikkat ağırlıklarında; ikisinin ürettiği temsile tepki veren bir anahtar-değer çiftindedir.

> **Kendini yokla:** Bir olgu neden tek bir embedding satırına yazılamaz?

Çünkü olgu bir ilişkidir, bir nesne değil. Embedding satırı "Ankara" token'ının bağlamdan bağımsız başlangıç hâlidir; "Ankara → başkent → Türkiye" ilişkisi ise ancak "Ankara" ile "başkent"in bir arada bulunduğu bir temsilde ortaya çıkar. İlişkiyi kodlayan şey satırın kendisi değil, o satırdan doğan temsile tepki veren hesaptır.

## Bir olgunun yerini bulmak

Geva ve arkadaşları bir katman türünün ne yaptığını gösterdi. Bir sonraki soru daha iddialı: **belirli** bir olgu, modelin neresinde duruyor?

Kevin Meng, David Bau, Alex Andonian ve Yonatan Belinkov'un NeurIPS 2022'de sunduğu çalışma bunun için bir yöntem kurdu: nedensel izleme (causal tracing). Fikir bir deney tasarımıdır ve sade.

Önce modele doğru istem verilir ve bütün ara hesaplar kaydedilir. Sonra aynı istem, konuyu belirten token'lar bozularak tekrar verilir — model artık doğru cevabı üretemez. Üçüncü adımda bozuk koşu yeniden çalıştırılır, ama bu kez birinci koşudan **tek bir ara hesap** geri konur. Doğru cevap geri geliyorsa, o hesap olgunun taşınmasında belirleyicidir; gelmiyorsa değildir. Bu, 2\. makaledeki "hangi parametre neyi değiştiriyor" sorusunun tek tek ölçülmüş hâlidir.

Örnekle yürütelim. İstem "Ankara, ... ülkesinin başkentidir" olsun ve model doğru cevabı üretsin. İkinci koşuda "Ankara" token'larının temsiline gürültü eklenir; model artık cevabı bulamaz. Üçüncü koşuda gürültü yerinde durur, ama on beşinci katmanın "Ankara" konumundaki ileri beslemeli çıktısı birinci koşudan kopyalanır. Doğru cevap geri geliyorsa, o tek hesap olgunun taşınması için yeterlidir. Aynı işlem bütün katmanlar ve bütün konumlar için tek tek tekrarlanır; ortaya modelin hangi noktalarının olguyu taşıdığını gösteren bir harita çıkar.

Sonuç net bir yer işaret etti: konuyu belirten token'ları işleyen **orta katmanlardaki ileri beslemeli modüller**. Yazarlar hipotezlerini sınamak için bir de müdahale yöntemi geliştirdi — o modüllerin ağırlık matrisine tek bir yön boyunca küçük bir düzeltme ekleyerek belirli bir olguyu değiştirmek (bir sonraki makalede bu tür düzeltmelere "rank-bir güncelleme" dendiğini göreceğiz). Model artık başka bir cevap veriyordu ve değişiklik, aynı olgunun farklı sorulmuş hâllerine de taşınıyordu.

Bu, iki ayrı iddiayı birden destekliyor gibi görünüyordu: olgular yerelleştirilebilir ve yerelleştirildikleri yerden düzenlenebilir.

## Yeri bilmek düzenlemeyi bilmek değildir

İkinci iddia beklenmedik biçimde çöktü.

Peter Hase, Mohit Bansal, Been Kim ve Asma Ghandeharioun'un NeurIPS 2023'te sunduğu çalışma basit bir kontrol yaptı: nedensel izlemenin işaret ettiği katman, bir olguyu değiştirmek için gerçekten **en iyi** katman mı? Cevap hayır çıktı. Bir olgunun saklandığı yer olarak işaretlenen katmanla, o olguyu yeni bir olguyla değiştirmek için düzenlenmesi gereken katman arasında sistematik bir ilişki bulunamadı; olgu, izlemenin gösterdiğinden bambaşka bir yerdeki ağırlıklar düzenlenerek de değiştirilebiliyordu.

Sonucun anlamını abartmadan söyleyelim. Nedensel izleme yanlış değil — bir olgunun **akışını** doğru ölçüyor. Yanlış olan, bu ölçümden "öyleyse müdahale de oraya yapılmalı" sonucunu çıkarmaktı. Yazarların kendi ifadesiyle bu, sezgiye aykırı bir sonuç: bir modelin nasıl çalıştığını daha iyi anlamak, onu nasıl değiştireceğini bilmek anlamına her zaman gelmiyor.

Pratik sonucu da var. Bir modelin yanlış ya da eskimiş bir olgusunu, modeli baştan eğitmeden düzeltmek cazip bir fikirdir ve bunun üzerine kurulmuş bir araştırma alanı vardır. Hase ve arkadaşlarının bulgusu bu alanı kapatmıyor — düzenleme yöntemleri çalışıyor — ama yöntemin **nereye** uygulanacağının, yerelleştirme sonuçlarına bakarak değil doğrudan ölçülerek seçilmesi gerektiğini söylüyor. Yani "olgunun yerini bul, oraya yaz" reçetesi, kulağa ne kadar makul gelirse gelsin sınandığında doğrulanmıyor.

Bu, seride ikinci kez karşımıza çıkan bir örüntü. 9\. makalede ölçek yasalarının "yasa değil, uydurulmuş eğri" olduğunu görmüştük; burada da bir yerelleştirme sonucunun ne kadar ileri götürülebileceğinin sınırı çiziliyor. Modelin içine bakma araçlarının neyi söyleyip neyi söyleyemediği 74–77\. makalelerin konusu olacak; burada işaretlenecek şey, bu araçların bulgularının doğrudan bir mühendislik reçetesine dönüşmediğidir.

## Kaç bit sığar?

Yer sorusunun bir de nicelik yüzü var. Bir modelin ağırlıkları ne kadar bilgi tutabilir?

Zeyuan Allen-Zhu ve Yuanzhi Li'nin ICLR 2025'te sunduğu çalışma bu soruyu doğrudan ölçmek için düzenli bir deney kurdu. Bilgiyi üçlü olarak tanımladılar — (ABD, başkent, Washington D.C.) gibi — ve kontrollü veri kümeleriyle modelin kaç üçlüyü çıkarılabilir biçimde sakladığını saydılar. Sonuç tek bir sayıya iniyor: **parametre başına 2 bit** — ve bu tavan, ağırlıklar int8'e indirgendiğinde bile korunuyor.

Sayıyı somutlaştıralım. 7 milyar parametreli bir model 7×10⁹ × 2 = 1,4×10¹⁰ bit, yani 14 milyar bit saklayabilir. Bayta çevirelim: 14×10⁹ ÷ 8 = 1,75×10⁹ bayt, kabaca 1,75 gigabayt. Yazarların tahminine göre bu, İngilizce Wikipedia ile ders kitaplarının toplamını aşan bir bilgi miktarıdır. Rakamın hem küçüklüğü hem büyüklüğü öğretici: 1,75 gigabayt bir sabit diskte hiçbir yer tutmaz, ama olgu olarak sayıldığında devasadır.

Bu tavan, seride birkaç kez değdiğimiz bir yanlış anlamayı da büyüklük mertebesiyle düzeltiyor: model eğitim verisinin tamamını saklayamaz. Hesabı kendimiz yapalım. 9\. makaledeki Llama 3 modeli 405 milyar parametre taşıyor ve 15,6 trilyon token gördü. Parametre başına 2 bitle kapasitesi 4,05×10¹¹ × 2 = 8,1×10¹¹ bit, yani 8,1×10¹¹ ÷ 8 ≈ 1,01×10¹¹ bayt, kabaca 101 gigabayt eder. Her token en az bir bayt tutar — bayt düzeyinde bir token bile bir bayttır — dolayısıyla eğitim verisi en az 15,6 terabayttır. Oran: 15.600 ÷ 101 ≈ 154. Yani model, gördüğü ham metnin **en iyimser varsayımla bile yaklaşık yüz elli dörtte birini** taşıyabilecek kapasitededir. Karşılaştırma kaba: ham metin sıkıştırılabilir, olgu bitiyle metin baytı aynı birim değildir. Ama aradaki iki büyüklük mertebesi, verinin büyük kısmının saklanmadığını, ya atıldığını ya da örüntüye dönüştüğünü söylemeye yetiyor.

Bu sayının bir de ikinci ölçümü var. John Morris ve arkadaşlarının 2025 tarihli çalışması aynı soruyu farklı tanımlayarak sordu — modelin veri kümesi hakkında tuttuğu **istenmeyen** bilgi ile veri üreten süreç hakkında tuttuğu genel bilgiyi bilgi kuramsal olarak ayırdılar. 500 binden 1,5 milyar parametreye kadar yüzlerce model eğitip vardıkları sayı parametre başına yaklaşık 3,6 bit. Bu çalışma hakem sürecinden geçmemiş bir ön çalışmadır; ve iki sayının farkı bir çelişki değil, tanım farkıdır — biri çıkarılabilir olgu üçlülerini, öbürü istenmeyen ezberi ölçüyor. Her iki sayının da kontrollü deney koşullarında ölçüldüğünü, evrensel bir sabit olmadığını akılda tutmak gerekiyor. İkisinin ortak dersi ise sayıdan bağımsız: kapasite sonludur ve parametre sayısıyla doğrusal ölçeklenir.

## Kapasite dolunca ne oluyor

Şimdi 8\. makalenin bıraktığı gerilime gelebiliriz. Orada iki şeyi birden söylemiştik: model eğitim verisini bir veritabanı gibi saklamaz, ama "hiçbir şey ezberlemez" de yanlıştır — Nicholas Carlini ve arkadaşlarının ICLR 2023 çalışması, 6 milyar parametreli bir modelin eğitim derleminin en az yüzde 1'ini birebir üretebildiğini ölçmüştü. İkisi birden doğruydu ve açıklamasını buraya bırakmıştık.

Aynı çalışma ezberin neye bağlı olduğunu da ölçtü ve üç ilişki buldu. Ezberlenen metin miktarı şu üçüyle birlikte, log-doğrusal biçimde artıyor: modelin **kapasitesi**, bir örneğin veride kaç kez **tekrarlandığı** ve modele verilen **bağlamın uzunluğu**. Üçü de tanıdık. Kapasite yukarıdaki bit hesabıdır; tekrar 14\. makaledeki tekilleştirme tartışmasının tam merkezidir; bağlam uzunluğu ise 10\. makaledeki üretim mekanizmasının bir parametresidir — daha çok ipucu, daha kolay geri çağırma.

Açıklama Morris ve arkadaşlarının çalışmasında bir araya geliyor. Eğitim verisi kapasitenin altındayken model ezberler: her yeni örneği ayrı ayrı saklamak, kaybı azaltmanın en ucuz yoludur. Veri büyümeye devam edip **kapasite dolduğunda** bu strateji tükenir — artık her örneği ayrı saklayacak yer yoktur. O noktada model, örnekler arasındaki ortak yapıyı kullanmaya başlar; istenmeyen ezber azalırken genelleme devreye girer. Bu açıklamanın kanıtının nerede bittiğini de bilmek gerekiyor: hakemsiz bir ön çalışmadan geliyor ve ölçümler 1,5 milyar parametreye kadar modellerde yapıldı. Aynı geçişin çok daha büyük modellerde ve gerçek derlemlerde nasıl işlediği açık bir soru.

![Yatay eksen eğitim verisi miktarı, dikey eksen bit. Üstte kesikli bir çizgi kapasite tavanını gösterir: parametre sayısı çarpı parametre başına bit. İstenmeyen ezber eğrisi önce hızla yükselip tavana ulaşır; "kapasite dolar" diye işaretlenen noktadan sonra düşmeye başlar. Genelleme eğrisi o noktaya kadar sıfıra yakın kalır, sonra yükselir. İki eğrinin toplamı tavanı aşmaz. Altta eğrilerin biçiminin şematik olduğu ve ölçümlerin 1,5 milyar parametreye kadar modellerden geldiği yazar.](assets/kapasite-ve-genelleme.svg "Şekil 2 — Kapasite dolunca ezber geriler, genelleme büyür")

Şekil 2, 2\. makaledeki aşırı öğrenme uyarısının bu makaledeki karşılığı. Orada modelin örüntü yerine örneğin kendisini yeniden üretmeye yaklaşmasının tehlikesini görmüştük; burada o davranışın ne zaman **zorunlu**, ne zaman **imkânsız** olduğunu görüyoruz. Bu çerçevede ezber bir kusur değil, kapasite bol olduğunda en ekonomik çözümdür; genellemeyi getiren şey ise yer darlığıdır.

Bu, 9\. makaledeki hesap-optimal tartışmasına yeni bir okuma da veriyor. "Aynı bütçeyle daha çok veri" reçetesi yalnızca kaybı düşürmüyor; modeli ezberleyemeyeceği kadar çok veriyle karşılaştırarak genellemeye **mecbur** bırakıyor. Ezberin değerlendirmeye etkisi — yani modelin bir sınav sorusunu bildiği için değil gördüğü için doğru cevaplaması — 72\. makalenin konusu.

## Geri çağırmanın kırılganlığı

Bilginin nerede durduğunu ve ne kadarının sığdığını gördük. Son bir soru: yazılan bilgi ne kadar esnek geri çağrılabiliyor?

Lukas Berglund ve arkadaşlarının ICLR 2024'te sunduğu çalışmaya göre bu esneklik sınırlı. "A, B'dir" biçiminde bir cümleyle eğitilen bir model, "B, A'dır" yönünü kendiliğinden öğrenmiyor. Uydurma ifadelerle yaptıkları kontrollü deneyde — model, kurgusal bir bestecinin kurgusal bir eserle ilişkisini öğrendikten sonra ters yönde sorulduğunda başarısız oluyordu — doğru cevabın olasılığı, rastgele bir ismin olasılığından yüksek bile çıkmadı.

Gerçek dünyadan ölçüm de aynı yöne bakıyor. Ünlü kişilerin ebeveynleri sorulduğunda GPT-4 "şu kişinin annesi kimdir" sorusunu yüzde 79 doğrulukla cevaplarken, aynı ilişkinin tersini — "şu kişinin oğlu kimdir" — yüzde 33 doğrulukla cevaplayabiliyordu.

Bulgunun ne kadar sağlam olduğu da ölçülmüş: etki farklı model boylarında ve farklı model ailelerinde tekrarlanıyor ve veri çoğaltma teknikleriyle ortadan kalkmıyor. Yani bu, tek bir modelin ya da tek bir eğitim koşusunun tuhaflığı değil.

Bir ayrıntı, olguyu doğru yerine oturtuyor: aynı ilişki **bağlamda** verildiğinde model tersini çıkarabiliyor. Yani sorun akıl yürütmede değil, ağırlıklara yazılmış bilginin nasıl adreslendiğinde. Bu, Şekil 1'deki anahtar-değer resmiyle tutarlı: eğitim "besteci → eser" yönünde bir anahtar kurar; ters yön için gereken anahtar hiç kurulmamıştır ve kendiliğinden doğmaz.

> **Kendini yokla:** Model ters yönü bağlamda çıkarabiliyorsa, ağırlıklarda neden çıkaramıyor?

Çünkü ikisi farklı mekanizmalar. Bağlamdaki bilgi dikkat yoluyla erişilebilir durumdadır: model her iki ismi de önünde görür ve aralarındaki ilişkiyi okuyabilir. Ağırlıklardaki bilgi ise 6\. ve 7\. makalede kurduğumuz hattın ürettiği temsile tepki veren anahtarlarda durur ve o anahtarlar eğitim sırasında hangi yönde tetiklendiyse o yönde çalışır. Ön eğitim hedefi soldan sağa çalıştığı için "A, B'dir" cümlesi yalnızca A'dan B'yi tahmin etmeyi ödüllendirir; ters yön bu cümleden kayba katkı vermez ve kendiliğinden öğrenilmez. Yazarların önerdiği açıklama da budur.

Bu son bulgu, 17\. makaleyle birlikte okunduğunda tabloyu tamamlıyor. Bir modelin bir soruya cevap verememesinin üç ayrı sebebi olabilir ve üçü farklı şeylerdir: olgu hiç öğrenilmemiştir (eğitim verisinde yoktu ya da kapasite yetmedi), öğrenilmiştir ama sorulan yönden adreslenemiyordur (ters yön hiç kurulmamıştır), ya da öğrenilmiştir ve doğru adreslenmiştir fakat model belirsizken susmak yerine tahmin etmeye eğilimlidir. Birinci durumda gereken daha çok veri ya da daha büyük model, ikincisinde bilginin farklı yönlerden yazılması, üçüncüsünde ise 17\. makaledeki teşvik düzeninin değişmesidir. "Model bunu bilmiyor" cümlesi bu üçünü birbirine karıştırdığı için çoğu zaman yanlış çözüme götürür.

### Sırada ne var

Bu makale bilginin nerede durduğunu, ne kadarının sığdığını ve nasıl kırılgan olduğunu gösterdi. Ama bütün bunlar boyunca modeli sabit varsaydık: ağırlıklar ön eğitimde yazıldı, biz de onları inceledik. Oysa pratikte insanlar hazır bir modeli alıp kendi işlerine uyarlıyor. 11\. makalede ince ayarı tanımlamış, LoRA adlı verimli biçimini ileriye bırakmıştık; 17\. makale ise ince ayarın bilgi yüklemek için kötü bir kanal olduğunu gösterdi. O hâlde ince ayar tam olarak neyi değiştiriyor ve milyarlarca parametreli bir modeli, hepsini yeniden yazmadan uyarlamak nasıl mümkün oluyor?

## Kaynakça

- Geva, M., Schuster, R., Berant, J. & Levy, O. (2021). *Transformer Feed-Forward Layers Are Key-Value Memories*. EMNLP 2021, s. 5484–5495. [Bağlantı](https://aclanthology.org/2021.emnlp-main.446/)
- Meng, K., Bau, D., Andonian, A. & Belinkov, Y. (2022). *Locating and Editing Factual Associations in GPT*. NeurIPS 2022. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/6f1d43d5a82a37e89b0665b33bf3a182-Abstract-Conference.html)
- Hase, P., Bansal, M., Kim, B. & Ghandeharioun, A. (2023). *Does Localization Inform Editing? Surprising Differences in Causality-Based Localization vs. Knowledge Editing in Language Models*. NeurIPS 2023. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2023/hash/3927bbdcf0e8d1fa8aa23c26f358a281-Abstract-Conference.html)
- Allen-Zhu, Z. & Li, Y. (2025). *Physics of Language Models: Part 3.3, Knowledge Capacity Scaling Laws*. ICLR 2025. [Bağlantı](https://arxiv.org/abs/2404.05405)
- Morris, J. X., Sitawarin, C., Guo, C. ve ark. (2025). *How much do language models memorize?*. arXiv ön çalışması (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2505.24832)
- Carlini, N., Ippolito, D., Jagielski, M., Lee, K., Tramèr, F. & Zhang, C. (2023). *Quantifying Memorization Across Neural Language Models*. ICLR 2023. [Bağlantı](https://openreview.net/forum?id=TatRHT_1cK)
- Berglund, L., Tong, M., Kaufmann, M., Balesni, M., Stickland, A. C., Korbak, T. & Evans, O. (2024). *The Reversal Curse: LLMs trained on "A is B" fail to learn "B is A"*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=GPKTIktA0k)
