---
article_id: article_82f2ddf3-a9a1-438a-9e2f-105292d3b8c9
title: "Tokenizer'ın Gücü ve Tuzağı"
slug: tokenizerin-gucu-ve-tuzagi
category: models-and-training
level: intermediate
reading_order: 15
summary: "8. ve 14. makalenin bıraktığı borcu öder: token ızgarasının harf sayma, aritmetik ve dil maliyeti üzerindeki ölçülmüş etkisi; sözlük boyunun bir tahsis kararı oluşu ve tokenizer'sız mimarilerin ilk işareti."
tags:
  - tokenizer
  - tokenizasyon
  - sozluk-boyu
  - aritmetik
  - turkce
content_hash: sha256:eea61b68c815422ab851c2f3d9b9b06d098734e91c4808364c7be141a873fdac
classification_version: 1
classification_batch: 3
---
## Ölçtüğümüz her şeyin birimi

Son dört makale boyunca tek bir birimle hesap yaptık. Ön eğitimin trilyonlarca token'ı, denetimli ince ayarın yedi yüz elli bin token'ı, tekrar eşiğini veren etkin token sayısı. Bütçeyi, veri duvarını, hesap-optimal tahsisi hep bu birimle konuştuk — ve 4\. makaleden beri bu birimin nereden geldiğini bir kez bile sorgulamadık.

Hatırlatalım. 4\. makalede metnin ağa girmesi için geçtiği hattı kurmuştuk: bayt çifti kodlaması metni sık geçen parçalara böler, her parça bir kimlik numarası alır, her kimlik embedding tablosundan bir vektör açar. Aynı makalede rahatsız edici bir ölçüm de yapmıştık: İnsan Hakları Evrensel Bildirgesi'nin 1. maddesi İngilizce 33 token tutarken Türkçesi GPT-4'ün tokenizer'ında 60, GPT-4o'nunkinde 46 token tutuyordu. 8\. ve 14\. makaleler bu farkın **yeteneklere** nasıl yansıdığını bu makaleye borç bırakmıştı.

Borcu ödemenin yolu, tokenizer'ı bir ön işleme adımı olarak görmeyi bırakmaktan geçiyor. Tokenizer nötr bir ayırıcı değil; modelin dünyayı hangi ızgaradan göreceğine karar veren bir tasarım tercihidir. Bu makalede o ızgaranın üç somut sonucunu ölçeceğiz — harfler, sayılar ve diller — ve sonra ızgaranın kendi boyunun bir bütçe kararı olduğunu göstereceğiz.

## Modelin göremediği harfler

Bir modele "arkadaşlarımla kelimesinde kaç tane a var" diye sor. Soru bir çocuğa kolay gelir: harflere bakarsın, sayarsın, beş. Modele kolay gelmemesinin sebebi zekâsı değil, önüne konan girdinin biçimidir.

Bu makale için tiktoken kütüphanesiyle yaptığımız — 4\. makaledeki ölçümün aynı yöntemle tekrarı olan — bölmede GPT-4'ün tokenizer'ı bu kelimeyi altı parçaya ayırıyor: `ark`, `ada`, `ş`, `ları`, `ml`, `a`. Kelimede beş tane "a" var ama hiçbir parça "a sayısı" diye bir bilgi taşımıyor: birinci parçada bir, ikincide iki, dördüncü ve altıncıda birer tane. Model bu beşi görmek için her parçanın **içine** bakabilmek zorunda; oysa parçalar ona bölünmez birer sembol olarak geliyor.

![Bir Türkçe kelime altı token kutusuna bölünmüş olarak gösterilir; kutuların altında kelimenin harfleri tek tek dizilir ve hangi harfin hangi kutunun içinde kaldığı çizgilerle işaretlenir; sağda aranan harfin kutu başına düşen sayısı yazar.](assets/token-izgarasi-ve-harfler.svg "Şekil 1 — Harfler token sınırlarının içinde kalır")

Şekil 1'in gösterdiği şey 4\. makaledeki BPE adımlarının doğal devamı: orada parçaların nasıl **oluştuğunu** görmüştük, burada oluşan parçaların içine bakmanın neden ayrı bir iş olduğunu görüyoruz. Sınırlar dilbilgisine göre değil sıklığa göre çizildiği için "a" harfi ızgaraya rastgele dağılıyor.

Peki model bu parçaların içindekini gerçekten bilmiyor mu? Lukas Edman, Helmut Schmid ve Alexander Fraser'ın EMNLP 2024'te sunduğu CUTE adlı değerlendirme kümesi tam bu soruyu ayrıştırdı. 7 milyardan 132 milyar parametreye kadar bir model grubunu, dört örnekli istemlerle, iki düzeyde aynı görevle sınadılar: bir kez karakter düzeyinde ("şu kelimedeki her 'e'yi sil"), bir kez kelime düzeyinde ("şu cümledeki her 'the'yi sil"). Kelime düzeyi kontrol görevidir: model görevi anlıyor mu, yoksa karakteri mi göremiyor?

Sonuç ikiye ayrılıyor ve bu ayrım makalenin en öğretici bulgusu.

**Modeller token'larının nasıl yazıldığını biliyor.** Bir kelimeyi harflerine ayırma ve harflerden kelimeyi geri kurma görevlerinde başarı yüksek. Bilgi orada.

**Ama o bilgiyi kullanamıyorlar.** Aynı modeller karakter düzeyinde ekleme, silme, değiştirme ve yer değiştirme görevlerinde çöküyor. Karakter ile kelime düzeyi arasındaki fark, ekleme görevinde bir modelde 72,8 puana kadar çıkıyor. Silme görevinde en iyi performans yüzde 72 civarında ve yazarlar bunun bile cömert bir ölçüm olduğunu not düşüyor: test yalnızca en sık geçen bin kelime üzerinde yapılmış.

Bir ölçüm daha var ve doğrudan 4\. makaleye bağlanıyor. Modellere iki kelimeden hangisinin verilen kelimeye daha yakın olduğu soruldu — bir kez **anlamca**, bir kez **yazılışça**. Anlam sorusunda başarı yüzde 76 ile 93 arasında. Yazılış sorusunda ise modellerin çoğu rastgele seçim düzeyinde ya da altında kaldı. 4\. makalede embedding'in anlamı geometriye çevirdiğini söylemiştik; CUTE bunun ters yüzünü ölçüyor — aynı geometri yazılışı taşımıyor, çünkü onu taşımaya hiç zorlanmadı.

Bu bulguları "modeller aptalca hatalar yapıyor" diye okumak yanıltıcı olur; doğru okuma, hangi görevlerin ızgaraya takıldığını bilmektir. Yazarların saydığı örnekler bu sınırı somutlaştırıyor: kelime bulmacaları, aliterasyon gibi ses tekrarına dayanan şiir biçimleri ve şifre çözme görevleri her karakterin açıkça kullanılmasını ister. Yazım düzeltme, çekim ekleri ve kod tamamlama da karakter düzeyi bilgiye dayanır — ama bu görevlerde anlam bilgisi de işin içine girdiği için sınır o kadar net görünmez. CUTE'un tasarım kararı tam da bu ayrımı yapmak: anlam bilgisini devre dışı bırakıp yalnızca ızgaranın ne engellediğini ölçmek.

> **Kendini yokla:** Model bir kelimeyi harf harf yazabiliyorsa, o kelimedeki harfleri saymayı neden beceremiyor?

Çünkü ikisi farklı işler. Harf harf yazmak, eğitim verisinde defalarca görülmüş bir örüntüyü tekrarlamaktır — kelime ile açılmış hâli arasındaki eşleşme metinlerde vardır ve model onu ezberleyebilir. Saymak ise o açılımı üretip üzerinde işlem yapmayı, yani token sınırlarını aşan bir hesabı adım adım yürütmeyi gerektirir. Bilginin var olması, o bilgi üzerinde işlem yapabilmeyi getirmiyor.

## Sayılar neden bölünüyor

Aynı ızgara sorunu sayılarda daha keskin, çünkü sayılarda konumun anlamı var.

Kendi ölçümümüzle başlayalım. GPT-4'ün tokenizer'ında `3742` iki parçaya ayrılıyor: `374` ve `2`. Neden? Çünkü bu tokenizer sayıları soldan sağa üçerli öbeklere bölüyor — 1, 2 ve 3 basamaklı bütün sayı dizilerinin sözlükte kendi token'ı var, ve daha uzun sayılar soldan başlanarak üçer üçer kırpılıyor. Aynı kural yüzünden `1000000` üç parça oluyor: `100`, `000`, `0`.

Tuzağı görmek için tek bir karşılaştırma yeter. `374` tek başına bir sayı olarak geçtiğinde o token "üç yüz yetmiş dört" demektir. `3742`'nin içinde geçtiğinde aynı token "üç bin yedi yüz kırk" demektir. Token aynı; taşıdığı büyüklük, kendisinden **sonra** kaç basamak geldiğine bağlı. Toplama işlemi ise ters yönde çalışır: birler basamağından başlarsın, elde varsa sola taşırsın. Yani ızgara bir yönde, aritmetik öbür yönde kuruluyor.

![Üstte 374 token'ı iki bağlamda gösterilir: tek başınayken üç yüz yetmiş dördü, 3742 sayısının içindeyken üç bin yedi yüz kırkı temsil eder; altta virgüllü yazımda son öbeğin her zaman birler dilimi olduğu işaretlenir.](assets/sayilarin-bolunmesi.svg "Şekil 2 — Aynı üç rakam, iki farklı büyüklük")

Şekil 2'nin alt satırı çözümü de gösteriyor: sayıya virgül koyarsan öbekleme sağdan sola sabitlenir. Ölçtük — `3,742` dizisi `3`, `,`, `742` diye ayrılıyor ve son öbek artık her zaman birler-onlar-yüzler dilimi.

Aaditya Singh ve DJ Strouse'un 2024 tarihli çalışması bu farkın bedelini doğrudan ölçtü. Yöntem sade: aynı toplama sorularını modele iki biçimde sordular — normal hâliyle (soldan sağa öbeklenir) ve virgüllü hâliyle (sağdan sola öbeklenir). Toplananlar 7 ile 9 basamak arasında, her uzunluk çiftinden onar soru, sıcaklık sıfır. Sonuçlar:

| Model | Soldan sağa öbekleme | Virgülle sağdan sola |
|---|---|---|
| GPT-3.5 | %75,6 | %97,8 |
| GPT-4 | %84,4 | %98,9 |

Modelin ağırlıkları değişmedi, sorunun matematiği değişmedi; değişen tek şey aynı sayının kaç parçaya ve nereden bölündüğü. GPT-3.5'te aradaki fark yirmi iki puandan fazla. Yazarlar hatanın rastgele olmadığını da gösteriyor: soldan sağa öbeklemede hatalar kalıplaşmış biçimler alıyor, yani model yanlış ama **sistematik** bir hesap yürütüyor. Ayrıca modele sayıyı önce virgüllü hâlde tekrar ettirmek — 32\. makalenin konusu olacak ara adım fikrinin küçük bir hâli — kaybedilen doğruluğu geri getiriyor. Bu çalışmanın hakem sürecinden geçmemiş bir ön çalışma olduğunu belirtelim; bulgu, kendi tokenizer ölçümümüzle uyumlu olduğu için burada mekanizmayı göstermek üzere kullanılıyor.

Bir tarihsel not, kararın ne kadar keyfî olabildiğini gösteriyor. GPT-3'ün tokenizer'ında sayı bölünmesi hiç düzenli değildi: 710 sayısının kendi token'ı varken 711'in yoktu, çünkü sözlük dile bakarak değil sıklığa bakarak kurulmuştu. Sonraki nesillerde farklı laboratuvarlar farklı yollar seçti — bazı model aileleri her rakamı ayrı token yapmayı tercih etti, GPT ailesi üçerli öbeklemeye geçti. Ortada yerleşmiş bir standart yok; bu, alanın kararı henüz vermediği anlamına geliyor.

## Sözlük boyu: gizli bir tahsis kararı

Şimdiye kadarki her şey sözlüğün **içeriğiyle** ilgiliydi. Bir de boyu var ve boy, 9\. makaleden tanıdığımız türden bir tahsis kararı.

İki yönlü bir denge bu. Sözlük büyürse aynı metin daha az token tutar: diziler kısalır, hesap ucuzlar, modelin bir seferde görebildiği metin artar. Ama sözlük büyürse embedding tablosu da büyür. 4\. makalede hesaplamıştık: GPT-2'nin küçük sürümünde 50.257 satır × 768 sayı ≈ 38,6 milyon parametre, yani modelin yaklaşık üçte biri düpedüz sözlük defteridir. Sözlüğü ikiye katlamak o defteri de ikiye katlar — ve o parametreler artık katmanlara harcanamaz.

Büyüklüğü görmek için aynı vektör boyunu koruyup sözlüğü bugünkü ölçeklere çıkaralım: 200 bin satır × 768 sayı = 153,6 milyon parametre. Bu, 124 milyon parametreli modelin tamamından fazladır. Gerçek sistemlerde vektör boyu da büyüdüğü için oran bu kadar uç olmaz; ama hesabın gösterdiği şey doğru — sözlük satırları "bedava" değil, model bütçesinin gerçek bir kalemidir.

Sözlüğün ikinci, daha az konuşulan etkisi üretim tarafında. 10\. makalede üretimin bir çekiliş olduğunu ve kesme kurallarının — en olası k aday, kümülatif eşik — bu çekilişi daralttığını görmüştük. O kurallar token üzerinde çalışır: "en olası elli aday" derken sayılan şey kelime değil, sözlükteki token'dır. Dolayısıyla bir kelime beş token'a bölünüyorsa o kelime için çekiliş beş kez yapılır, tek token'a sığıyorsa bir kez. Aynı cümleyi üretmek için atılan zar sayısı dile göre değişir — ve her zar, üretimin yoldan çıkabileceği bir andır.

Chaofan Tao ve arkadaşlarının NeurIPS 2024'te yayımladığı çalışma bu dengeyi ölçek yasası çerçevesinde kurdu. 33 milyondan 3 milyar parametreye kadar modelleri, 500 milyar karaktere kadar veriyle, farklı sözlük boylarıyla eğitip üç bağımsız yöntemle aynı soruyu sordular: verilen bir hesap bütçesinde sözlük ne kadar olmalı?

Üç yöntem de aynı yere çıkıyor: **optimal sözlük boyu hesap bütçesine bağlıdır ve büyük modeller büyük sözlük ister.** Çarpıcı sonuç, bugünkü modellerin çoğunun bu tarafa az pay ayırmış olması. Çalışmanın tahminine göre 70 milyar parametreli bir modelin sözlüğü en az 216 bin olmalıydı; fiilen kullanılan 32 bindi — yaklaşık yedide biri. Tahmini sınadıklarında da doğrulandı: aynı 2,3×10²¹ FLOP bütçesiyle sözlüğü 32 binden 43 bine çıkarmak, ARC-Challenge adlı fen sorusu kümesindeki doğruluğu 29,1'den 32,0'a taşıdı.

![Bir hesap bütçesi çubuğu iki parçaya bölünür: embedding tablosuna giden pay ile katmanlara giden pay; sözlük büyüdükçe embedding payı genişler, dizi uzunluğu kısalır ve toplam bütçenin sabit kaldığı işaretlenir.](assets/sozluk-boyu-tahsisi.svg "Şekil 3 — Sözlük boyu bir bütçe paylaşımıdır")

Şekil 3'ün okunacak yeri çubuğun toplam uzunluğunun değişmemesi. 9\. makaledeki hesap-optimal eğitim mantığı burada bir eksen daha kazanıyor: parametreyi katmanlara mı sözlüğe mi vereceğin de bir tahsis sorusu ve cevabı bütçeye göre değişiyor.

## Türkçenin faturası

Şimdi 4\. makaledeki ölçüme geri dönelim ve bedelini adlandıralım. Aynı içerik Türkçede İngilizcenin 1,8 katı (GPT-4) ya da 1,4 katı (GPT-4o) token tutuyorsa, bu üç ayrı faturaya dönüşür.

Birincisi para. Token başına ücretlendirilen bir hizmette aynı metin için daha çok ödersin. İkincisi zaman: 10\. makalede kurduğumuz otoregresif döngü token token ilerler, daha çok token daha uzun süre demektir. Üçüncüsü ve en az görüneni kapasite: modelin bir seferde görebildiği metin token cinsinden sınırlıdır, dolayısıyla aynı sınır Türkçe metnin daha azını alır. Aleksandar Petrov ve arkadaşlarının NeurIPS 2023 çalışmasının ölçtüğü eşitsizlik buydu — aynı içeriğin token uzunluğu diller arasında 15 kata kadar değişebiliyor.

Bunlar kullanım tarafındaki bedeller. Bir de **eğitim** tarafındaki bedel var ve 14\. makaledeki karışım tartışmasına doğrudan bağlanıyor. Mehdi Ali ve arkadaşlarının NAACL 2024 Findings'te yayımlanan çalışması, 2,6 milyar parametre ölçeğinde 24 model eğiterek tokenizer seçiminin etkisini ölçtü. İki bulgu bizi ilgilendiriyor. Avrupa'nın en sık beş dili üzerinde eğitilen çok dilli bir tokenizer, İngilizceye kıyasla üç kat büyük bir sözlük istiyor. Ve İngilizce merkezli bir tokenizer'ı çok dilli eğitimde kullanmak, verimsiz sözlük yüzünden yüzde 68'e varan ek eğitim maliyeti getiriyor — üstelik sonraki görevlerdeki başarıyı da ciddi biçimde düşürerek.

Aynı çalışmadan üçüncü bir uyarı geliyor ve 9\. makaledeki cetvel tartışmasının akrabası: tokenizer'ları değerlendirmek için yaygın kullanılan ölçüler — kelime başına düşen token sayısı gibi — modelin sonraki görevlerdeki başarısını her zaman öngörmüyor. Yani "daha az token üreten tokenizer daha iyidir" cümlesi test edildiğinde her koşulda doğru çıkmıyor.

> **Kendini yokla:** Türkçe metnin daha çok token tutması, tek başına neden "model Türkçeyi daha kötü biliyor" demek değildir?

Çünkü token sayısı bir maliyet ölçüsüdür, bir yetenek ölçüsü değil. Daha uzun diziler modeli pahalılaştırır ve bağlam sınırını daha çabuk doldurur; ama modelin o dildeki başarısı asıl olarak eğitim verisinde o dilin ne kadar ve ne kalitede yer aldığına bağlıdır. Tokenizer verimsizliği bir dezavantajdır, açıklamanın tamamı değildir — ve iki etkiyi ayırmak, ölçmeyi gerektirir.

## Tokenizer'ı atabilir miyiz?

Bütün bu sorunların ortak kaynağı tek bir karar: metni, model onu görmeden önce sabit bir sözlüğe göre parçalara ayırıyoruz. Akla gelen ilk soru, bu adımı tamamen kaldırmanın mümkün olup olmadığı.

4\. makalede iki uç yolu ve bedellerini görmüştük: harf düzeyi bölme sözlüğü minikleştirir ama dizileri uzatır ve her birimi anlamsızlaştırır. Bu yüzden alt-kelime uzlaşısına varılmıştı. Ama diziyi uzatmanın bedeli, 7\. makalede gördüğümüz karesel dikkat maliyetiyle birleşince ödenemez hâle geliyordu.

Son yıllarda bu bedeli düşürmeyi deneyen mimariler çıktı. Artidoro Pagnoni ve arkadaşlarının ACL 2025'te sunduğu Byte Latent Transformer, sabit sözlük yerine ham baytları **dinamik boyutlu** yamalara toplar: metnin öngörülebilir olduğu yerde uzun yamalar, karmaşıklaştığı yerde kısa yamalar kullanır — yani hesabı metnin zorluğuna göre dağıtır. Çalışma, 8 milyar parametreye ve 4 trilyon eğitim baytına kadar giden, hesabı sabit tutan ilk ölçek karşılaştırmasını sunuyor ve bayt düzeyinde eğitilen bir modelin ölçekte tokenizer'lı modellerin performansını yakalayabildiğini gösteriyor.

Buradan "tokenizer bitti" sonucu çıkmıyor; çıkan sonuç, sabit sözlüğün bir zorunluluk değil bir tercih olduğu. Bu mimarilerin nasıl kurulduğunu ve dikkatin karesel maliyetine getirilen öbür alternatifleri 86\. makalede ele alacağız; burada işaretlenecek şey, bu makalede saydığımız üç bedelin — harfler, sayılar, diller — hepsinin aynı tasarım kararından doğduğudur.

### Sırada ne var

Tokenizer'ın modelin neyi kolay, neyi zor bulduğunu belirlediğini gördük. Ama bu makalede kullandığımız her cümle bir ölçüme dayanıyordu: yüzde 72,8'lik fark, yüzde 84,4 ile 98,9 arası sıçrama, 29,1'den 32,0'a çıkan doğruluk. Bu sayılar nereden geliyor ve ne kadarına güvenilebilir? 5\. makalede perplexity'nin ancak aynı tokenizer'la hesaplanmışsa karşılaştırılabileceğini söylemiş, ölçmenin tuzaklarını buraya bırakmıştık — şimdi tokenizer'ın ne kadar değiştirdiğini de bildiğimize göre soru daha da keskin. Bir modelin "iyi" olduğunu söylediğimizde tam olarak neyi ölçmüş oluyoruz?

## Kaynakça

- Edman, L., Schmid, H. & Fraser, A. (2024). *CUTE: Measuring LLMs' Understanding of Their Tokens*. EMNLP 2024, s. 3017–3026. [Bağlantı](https://aclanthology.org/2024.emnlp-main.177/)
- Singh, A. K. & Strouse, D. (2024). *Tokenization counts: the impact of tokenization on arithmetic in frontier LLMs*. arXiv ön çalışması (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2402.14903)
- OpenAI. *tiktoken: BPE tokenizer kütüphanesi* (bu makaledeki bölme ve sayım ölçümlerinde kullanıldı). GitHub. [Bağlantı](https://github.com/openai/tiktoken)
- Tao, C., Liu, Q., Dou, L., Muennighoff, N., Wan, Z., Luo, P., Lin, M. & Wong, N. (2024). *Scaling Laws with Vocabulary: Larger Models Deserve Larger Vocabularies*. NeurIPS 2024. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2024/file/cf5a019ae9c11b4be88213ce3f85d85c-Paper-Conference.pdf)
- Petrov, A., La Malfa, E., Torr, P. & Bibi, A. (2023). *Language Model Tokenizers Introduce Unfairness Between Languages*. NeurIPS 2023. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2023/hash/74bb24dca8334adce292883b4b651eda-Abstract-Conference.html)
- Ali, M., Fromm, M., Thellmann, K. ve ark. (2024). *Tokenizer Choice For LLM Training: Negligible or Crucial?*. Findings of NAACL 2024, s. 3907–3924. [Bağlantı](https://aclanthology.org/2024.findings-naacl.247/)
- Pagnoni, A., Pasunuru, R., Rodriguez, P. ve ark. (2025). *Byte Latent Transformer: Patches Scale Better Than Tokens*. ACL 2025, s. 9238–9258. [Bağlantı](https://aclanthology.org/2025.acl-long.453/)
