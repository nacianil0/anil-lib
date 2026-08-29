---
article_id: article_23ea987c-09e7-424a-bab6-2ad1dcb328b6
title: "Eğitim Verisi: Toplama, Temizlik, Karışım ve Tekrar"
slug: egitim-verisi-toplama-temizlik-karisim-ve-tekrar
category: models-and-training
level: intermediate
reading_order: 14
summary: "8. makalenin bıraktığı temizlik hattı borcunu öder: filtrelerin kimin metnini attığı, kaliteyi bir modele sordurmanın sonuçları, tekilleştirmenin ters yüzü, tekrarın ölçülmüş getirisi ve sentetik verinin çöküş tartışması."
tags:
  - egitim-verisi
  - veri-temizligi
  - tekillestirme
  - sentetik-veri
  - model-cokusu
content_hash: sha256:208d67ad2ab9d231e6de3f60f9b93d8e31aad1293bd0732fb428b534f30b393a
classification_version: 1
classification_batch: 2
---
## Üç makale, tek darboğaz

11\., 12\. ve 13\. makaleler ham bir tahminciyi asistana çevirdi ve her aşamada aynı şeye çarptık: veri. Ön eğitimin trilyonlarca token'ı, denetimli ince ayarın on iki bin insan yazımı cevabı, ödül modelinin otuz üç bin sıralaması. Üçünün de arkasında birinin oturup "şunu al, bunu at" demesi var.

8\. makalede bu hattın kaba resmini çizmiştik: ham web arşivinden metin çıkarma, kalite filtreleri, tekilleştirme, veri karışımı — ve her aşamada verinin küçülmesi. Aynı makalede iki borç bırakmıştık: temizlik hattının ayrıntısı ve tekilleştirmenin sınırları. Şimdi o borçları ödüyoruz.

Bu makalenin sorusu üç parçalı. Bir derlem kurulurken neyin atılacağına kim, hangi ölçüte göre karar veriyor? Kalan veri, hangi oranlarda karıştırılıp kaç kez okunuyor? Ve verinin kendisi tükenmeye başladığında ne oluyor?

## Filtre nötr değildir

8\. makalede T5 ekibinin C4 için yazdığı kuralları tek tek görmüştük: yalnızca noktalama işaretiyle biten satırları tut, beş cümleden az sayfaları at, süslü parantez içeren sayfaları kod diye at, İngilizce olma olasılığı düşükleri çıkar. Kurallar makul görünüyor. Peki bu kuralların fiilen ne attığını kimse ölçtü mü?

Jesse Dodge ve arkadaşlarının EMNLP 2021'de yayımlanan çalışması tam olarak bunu yaptı: bir derlemi kuran filtreleri değil, o filtrelerin **çıkardığı** metni inceledi. Bulguları üç başlıkta toplanıyor.

Birincisi, derlemin içinde beklenmedik şeyler var: patent metinleri ve resmî kurum sayfaları en çok temsil edilen kaynaklar arasında. İkincisi, içeride makine üretimi metin — örneğin makine çevirisi çıktıları — ve başka değerlendirme kümelerinin test örnekleri bulunuyor. Bir özetleme kümesinin hedef özetlerinin yüzde 15,49'u, bir başkasının kısa özetlerinin yüzde 24,88'i C4'ün içinde birebir geçiyordu. Buna kirlilik (contamination) denir ve seride ayrı bir makalenin konusu olacak; burada işaretlenecek şey, kirliliğin bir değerlendirme sorunu olmadan önce bir **veri** sorunu olduğudur.

Üçüncü bulgu en rahatsız edici olanı. C4'ün kural setinde, müstehcen kabul edilen kelimeleri içeren sayfaları atan bir engel listesi (blocklist) var. Dodge ve arkadaşları bu listenin hangi metinleri attığını lehçelere göre ölçtü.

| Metnin lehçesi | Engel listesinin çıkardığı belge oranı |
|---|---|
| Afrikalı Amerikalı İngilizcesi | %42 |
| Hispanik hizalı İngilizce | %32 |
| Beyaz Amerikalı İngilizcesi | %6,2 |
| Diğer İngilizce | %7,2 |

Aradaki fark yaklaşık yedi kat. Sonuç, tamamlanmış derlemde de görünüyor: C4 belgelerinin yalnızca yüzde 0,07'si Afrikalı Amerikalı İngilizcesi, yüzde 0,09'u Hispanik hizalı İngilizce olarak sınıflanıyor.

![Dört yatay çubuk aynı eksende: Afrikalı Amerikalı İngilizcesi ve Hispanik hizalı İngilizce çubukları belirgin biçimde uzundur, Beyaz Amerikalı İngilizcesi ve diğer İngilizce çubukları kısadır; her çubuğun ucunda çıkarılan belge oranı yazar.](assets/filtre-kimin-metnini-atiyor.svg "Şekil 1 — Aynı engel listesi, çok farklı sonuçlar")

Şekil 1'in söylediği şey bir hata değil, bir seçim. Kimse "şu lehçeyi at" diye kural yazmadı; kelime listesi yazıldı ve kelimelerin farklı topluluklarda farklı sıklıkta ve farklı anlamlarda kullanılması sonucu belirledi. 8\. makalede "iyi veri"nin tanımının ampirik olduğunu söylemiştik; buraya bir şey daha eklemek gerekiyor — o tanım aynı zamanda değer yüklüdür ve sonuçları ölçülebilir.

> **Kendini yokla:** Bir kalite filtresi neden "tarafsız" olamaz?

Çünkü filtre, kalitenin bir tanımını uygular ve o tanımı birileri yazar. Kural ne kadar mekanik görünürse görünsün — "şu kelimeyi içeriyorsa at" — kelimenin kimlerde daha sık geçtiği veriye bakılmadan bilinemez. Filtrenin tarafsız olup olmadığı niyetle değil, ölçülen sonuçlarıyla belirlenir.

## Kaliteyi bir modele sordurmak

Elle yazılmış kurallar kabaca çalışıyor. Peki ya kaliteyi doğrudan öğretebilseydik?

FineWeb ekibinin yaptığı budur. 8\. makalede bu derlemin 96 Common Crawl anlık görüntüsünden damıtılmış 15 trilyon token olduğunu söylemiştik. Ekip bir adım daha attı ve FineWeb-Edu adını verdiği eğitici içerik alt kümesini kurdu.

Yöntem üç adımlı. Önce büyük bir dil modeline — Llama 3'ün talimat ince ayarından geçmiş 70 milyar parametreli sürümüne — 460.000 web sayfası verildi ve her birine 0 ile 5 arasında bir eğitim değeri puanı istendi. Sonra bu puanlarla küçük ve ucuz bir puanlayıcı eğitildi: bir embedding modelinin çıktısı üzerine oturtulmuş basit bir doğrusal model — yani 4\. makaledeki vektörlerin üstünde çalışan tek katmanlık bir tahminci. Son olarak bu sınıflandırıcı 15 trilyon token'ın tamamına uygulandı ve puanı 3'ün altında kalan her şey atıldı.

Sayılar şöyle: geriye 1,3 trilyon token kaldı. Oran 1,3 ÷ 15 = 0,087, yani derlemin yaklaşık yüzde 8,7'si. Yüzde doksan birden fazlası atıldı. Sonuç ölçüldüğünde, aynı bütçeyle FineWeb-Edu üzerinde eğitilen model bilgi ve akıl yürütme ağırlıklı değerlendirmelerde belirgin biçimde ilerledi: MMLU adlı çok konulu bilgi sınavında doğruluk yüzde 33'ten 37'ye, ARC adlı fen sorusu kümesinde yüzde 46'dan 57'ye çıktı — bu kümelerin tam olarak neyi ölçtüğü ve neyi ölçemediği seride ayrı bir makalenin konusu. Göreli olarak 4 ÷ 33 = 0,121 ve 11 ÷ 46 = 0,239, yani yaklaşık yüzde 12 ve yüzde 24 iyileşme.

Burada durup bir döngüyü işaretlemek gerekiyor. Bir sonraki modelin ne öğreneceğine, bir önceki model karar veriyor. Bu bir itiraz değil — yöntem işe yarıyor ve maliyeti insan etiketlemesinin yanında hiç kalıyor. Ama 13\. makaledeki uyarı burada aynen geçerli: puanlayan bir vekildir. Vekilin "eğitici" saydığı şey, onu eğiten talimatın ve o talimatı yazan ekibin tanımıdır.

## Tekilleştirmenin ters yüzü

8\. makalede, Katherine Lee ve arkadaşlarının ACL 2022 çalışmasına dayanarak tekilleştirmenin neden süs olmadığını görmüştük: C4'ün içinde 61 kelimelik tek bir cümle altmış binden fazla kez geçiyordu ve tekilleştirilmemiş veriyle eğitilen modeller eğitim metnini birebir üretmeye çok daha yatkındı.

Aynı makalede bir tuhaflığı da not etmiştik: FineWeb ekibi 96 anlık görüntünün tamamı arasında küresel tekilleştirme yapınca elde 4 trilyon token kaldı ama model neredeyse hiç iyileşmedi; her anlık görüntüyü ayrı ayrı tekilleştirip 20 trilyon token bırakmak daha iyi sonuç verdi. Bunun sebebini şimdi açalım, çünkü sezgiye aykırı ve öğretici.

Ekip eski bir anlık görüntüyü tek başına inceledi. Küresel tekilleştirmeden sonra o anlık görüntünün verisinin yaklaşık yüzde 90'ı silinmişti. Elle bakınca şunu buldular: **hayatta kalan yüzde 10, atılan yüzde 90'dan daha kötüydü.** Kalanlar daha çok reklam, anlamsız anahtar kelime listesi ve bozuk biçimlendirilmiş metin içeriyordu.

Mekanizma anlaşılınca basit. Bir metin birden çok anlık görüntüde tekrarlanıyorsa, bu genellikle o sayfanın aylarca ayakta kalmış, gerçek bir içerik olduğu anlamına gelir. Küresel tekilleştirme bu içeriği "tekrar" diye siler ve geriye yalnızca bir kez görünmüş, çoğu zaman geçici ve düşük kaliteli sayfalar kalır. Yani tekrarın kendisi iki farklı şeyin işareti olabiliyor: yüz binlerce belgeden oluşan dev tekrar kümeleri gerçekten düşük kalitedir, ama anlık görüntü sayısı mertebesindeki küçük tekrar kümeleri kalitenin **lehine** bir işarettir.

![İki kol tek bir kaynaktan ayrılır: solda küresel tekilleştirme kolu 4 trilyon token'a iner ve kalan verinin daha kötü olduğu not edilir, sağda anlık görüntü başına tekilleştirme kolu 20 trilyon token bırakır ve kalite korunur.](assets/tekillestirmenin-iki-kolu.svg "Şekil 2 — Aynı işlem, iki farklı kapsam")

Şekil 2'deki iki kol arasındaki fark bir algoritma farkı değil, bir kapsam kararı. 8\. makaledeki "ne çok atmak ne çok tutmak kendiliğinden doğrudur" cümlesinin altı burada dolduruluyor: doğru soru "tekilleştirsem mi" değil, "hangi pencerede tekilleştireyim".

## Karışım: hangi kaynaktan ne kadar

Temizlik bitti, elde birden çok kaynak var: web metni, kitaplar, ansiklopedi, kod, akademik makale. Şimdi karar verilmesi gereken şey, eğitim akışının yüzde kaçının hangi kaynaktan geleceği. 8\. makalede bunun adını koymuştuk — veri karışımı — ve GPT-3'ün karışımında Wikipedia'nın üç kez baştan sona okunurken Common Crawl'ın yarısının bile okunmadığını hesaplamıştık. Ağırlıklar elle verilmişti ve çalışmanın kendi metni bunların derlem boyuyla orantılı olarak **kasten** belirlenmediğini yazıyordu.

"Elle verilmiş" sözü burada gizli bir maliyet taşıyor: ağırlıkları denemek pahalıdır. Her farklı karışım, sonucunu görmek için ayrı bir eğitim koşusu ister.

Sang Michael Xie ve arkadaşlarının NeurIPS 2023'te yayımlanan DoReMi çalışması bu maliyeti kırmanın bir yolunu gösterdi. Fikir şu: ağırlıkları büyük modelle deneme yanılma yaparak aramak yerine, önce çok küçük bir vekil model eğit ve hangi kaynakların kaybının inatla yüksek kaldığına bakarak ağırlıkları oradan türet. Sayılar: 280 milyon parametreli bir vekil modelle çıkarılan ağırlıklar, otuz kat büyük 8 milyar parametreli bir modelin eğitiminde kullanıldı; sonuç, sonraki görevlerdeki ortalama doğrulukta 6,5 puanlık iyileşme ve taban modelin doğruluğuna 2,6 kat daha az adımda ulaşmak oldu.

Buradaki fikir 9\. makaledeki hesap-optimal eğitim mantığının bir akrabası: karışım da tahsis edilecek bir bütçedir ve iyi tahsis, aynı hesapla daha çok şey öğrenmek demektir.

## Aynı veriyi kaç kez okumalı?

Derlem kuruldu, temizlendi. Şimdi bütçe sorusu: elindeki token'ları kaç kez okuyacaksın?

9\. makalede bu sorunun cevabını bir ileri okuma notunda kısaca vermiş, ayrıntısını buraya bırakmıştık. Niklas Muennighoff ve arkadaşlarının NeurIPS 2023'te yayımlanan çalışması, sabit bir hesap bütçesinde veriyi tekrar etmenin ne kadar işe yaradığını doğrudan ölçtü. Ölçeği ciddi: dört yüzden fazla eğitim koşusu, 10 milyondan 9 milyar parametreye kadar modeller, 900 milyar token'a kadar eğitim, ve 100 milyon, 400 milyon, 1,5 milyar tekil token'lık sabit veri bütçeleri.

Sonuç üç kademeli.

**Dörde kadar bedava.** Aynı veriyi dört epoka kadar tekrar etmek, aynı miktarda taze veri kullanmaya kıyasla kayıpta ihmal edilebilir bir fark yaratıyor. Yani elindeki derlem, hesap bütçesi açısından dört katına kadar "büyüyor".

**On altıda yarı yol.** Çalışma tekrarlanan token'ın değer kaybını bir sayıyla veriyor: yaklaşık 15 tekrar, yani 16 epok, tekrarlanan token'ların değerinin 1 − 1/*e* kadarını yitirdiği nokta. Bu oran hesaplanabilir: 1 ÷ *e* = 0,368, dolayısıyla değerin yaklaşık yüzde 63'ü gitmiş, yüzde 37'si kalmıştır. Yazarların ifadesiyle anlamlı kazanç kabaca 16 epoka kadar sürüyor.

**Sonrası boş.** On altıncı epoktan sonra getiri son derece hızlı düşüyor ve eklenen hesabın değeri sıfıra yaklaşıyor.

![Dört basamaklı azalan bir merdiven: birinci ve dördüncü epokta tekrarlanan token'ın değeri taze token'a yakın gösterilir, on altıncı epokta yaklaşık üçte bire iner, ilerisinde neredeyse sıfırdır.](assets/tekrarin-getirisi.svg "Şekil 3 — Tekrarlanan token'ın değeri")

Şekil 3'ün okunacak yeri ilk iki basamağın neredeyse eşit yüksekliği: dört epok, bir epok kadar iyi. 2\. makaledeki aşırı öğrenme uyarısı burada ortadan kalkmıyor, yalnızca eşiği görünür hâle geliyor — tehlike tekrarın kendisinde değil, tekrarın miktarındadır.

Aynı çalışmadan iki ek bulgu daha var ve ikisi de karışım kararlarını doğrudan ilgilendiriyor. Birincisi: veri kısıtlı bir rejimde eğitim karışımına Python kodu eklemek, yalnızca doğal dil görevlerinde ölçüldüğünde bile etkin token sayısını — yani elindeki verinin taze token cinsinden karşılığını — iki katına çıkarabiliyor — kod, doğal dilde işe yarayan bir şey öğretiyor. İkincisi ve daha rahatsız edici olanı: aynı rejimde perplexity'ye göre filtreleme işe yarıyor, tekilleştirme ise yaramıyor.

Bu ikinci bulgu, biraz önce anlattığımız FineWeb sonucuyla çelişmiyor; iki farklı soruya cevap veriyorlar. FineWeb'in sorusu "hangi pencerede tekilleştireyim", Muennighoff ve arkadaşlarınınki "verim zaten kısıtlıyken tekilleştirme bana ek kazanç sağlar mı". İkinci soruda cevap hayır çıkıyor, çünkü tekilleştirmenin faydası veri bolken tekrarı azaltmaktır; veri zaten kıtsa ve tekrar zaten kaçınılmazsa, elindekini daha da küçültmenin bir getirisi kalmıyor.

> **Kendini yokla:** "Dört epoka kadar tekrar bedavadır" cümlesi, 2\. makaledeki aşırı öğrenme uyarısını geçersiz kılar mı?

Kılmaz. Aşırı öğrenme, modelin örüntü yerine örneğin kendisini yeniden üretmeye yaklaşmasıdır ve yeterince tekrarda hâlâ olur. Ölçülen şey, bu bozulmanın nerede başladığıdır: bu ölçekte dördüncü epoka kadar fark edilir bir bedel yok, on altıncıdan sonra ise eklenen hesabın karşılığı yok. Uyarı geçerli, eşiği artık sayıyla biliniyor.

## Post-training verisi: az, pahalı ve kırılgan

Buraya kadarki her şey ön eğitim içindi: milyarlarca sayfayı eleyip azaltmak. Post-training verisinde huni ters çalışır — hiçbir şeyden başlayıp binlerce örneği tek tek inşa edersin.

Ölçek farkı çarpıcı. 12\. makalede LIMA'nın bütün eğitim kümesinin yaklaşık 750.000 token olduğunu görmüştük; aynı modelin ön eğitimi 1,4 trilyon token gördü. Ama post-training verisinde her satırın kalitesi, ön eğitimdeki bir satırdan kat kat önemlidir: on iki bin örneğin içindeki iki yüz kötü örnek, trilyonlarca token içindeki aynı sayıda kötü örnekten çok daha görünür bir iz bırakır.

Bu yüzden aynı temizlik sorusu, burada daha keskin biçimde geri geliyor. 12\. makaledeki Self-Instruct kalite denetimini hatırla: üretilen talimatların yüzde 92'si geçerli bir görev tarif ediyordu, ama bütün alanları doğru olan örneklerin oranı yüzde 54'tü. Ölçek ucuz, doğruluk değil.

Buradan alanın en çok tartışılan sorusuna geliyoruz. Bir modelin ürettiği metinle başka bir modeli eğitmek — yani sentetik veri kullanmak — uzun vadede ne yapar?

Ilia Shumailov ve arkadaşlarının 2024'te Nature'da yayımlanan çalışması karamsar cevabı verdi. Bir modelin çıktısıyla bir sonraki model eğitilir, onun çıktısıyla bir sonraki eğitilir — birkaç kuşak sonra dağılımın kuyrukları kayboluyor ve model geri dönülemez biçimde bozuluyor. Buna model çöküşü (model collapse) adını verdiler ve aynı olguyu dil modellerinin yanı sıra başka üretken model ailelerinde de gösterdiler.

Ama bu sonucun bir varsayımı var ve varsayım kritik: her kuşakta yeni sentetik veri, eskisinin **yerine** geçiyor. Matthias Gerstgrasser ve arkadaşlarının aynı yıl yayımlanan çalışması bu varsayımı değiştirdi. Gerçek dünyada veri birikir — eski gerçek metin ortadan kalkmaz, üzerine yenisi eklenir. Bu düzende deneyi tekrarladıklarında çöküş görülmedi; sentetik veriyi gerçek verinin yerine koymak yerine yanına eklemek, hatayı sınırlı tutuyor.

Dürüst formülasyon şu: model çöküşü gerçek bir olgudur ama otomatik bir kader değildir. Belirleyici olan sentetik verinin varlığı değil, gerçek verinin korunup korunmadığıdır.

## Verinin sahibi kim?

Son bir kısıt var ve teknik değil.

9\. makalede kamuya açık insan üretimi metin stoğunun 2026 ile 2032 arasında eğitim kümelerinin büyüklüğüne yaklaşacağı tahminini görmüştük. O tahmin stoğun **var olduğunu** varsayıyor. Shayne Longpre ve arkadaşlarının NeurIPS 2024'te yayımlanan çalışması, stoğun erişilebilir kısmının ne kadar hızlı daraldığını ölçtü: eğitim derlemlerinin altında yatan 14.000 web alan adı denetlendi.

Bulgular tek bir yıla ait — 2023'ten 2024'e. O bir yıl içinde C4'teki token'ların yüzde 5'inden fazlası veri toplayan botlara tamamen kapatıldı; en aktif biçimde bakımı yapılan kritik kaynaklar arasında bu oran yüzde 28'in üzerine çıktı. Kullanım koşullarındaki kısıtlamalar hesaba katıldığında C4'ün yüzde 45'i kısıtlı hâle gelmiş durumda. Çalışma ayrıca sitelerin kullanım koşullarında yazdıklarıyla botlara verdikleri makine okunur talimatların çoğu zaman birbirini tutmadığını gösteriyor.

Bunun modele etkisi doğrudan: kapanan kaynaklar rastgele dağılmıyor. En çok kapananlar, en çok bakım gören ve en güncel içeriği taşıyan siteler. Yani daralan şey yalnızca veri miktarı değil, verinin çeşitliliği ve tazeliği.

### Sırada ne var

Veriyi topladık, temizledik, karıştırdık ve kaç kez okuyacağımıza karar verdik. Ama bütün bu makale boyunca ölçü birimi olarak "token" dedik ve o token'ların nereden geldiğini 4\. makaleden sonra hiç sorgulamadık. Oysa aynı metnin kaç token ettiği tokenizer'ın kararına bağlı ve 4\. makalede ölçmüştük: aynı içerik Türkçede İngilizcenin 1,4 ile 1,8 katı token tutuyor. 8\. makalede bu farkın yeteneklere yansımasını bir sonraki makaleye borç bırakmıştık. Peki bir modelin kelimelerin harflerini sayamaması, aritmetikte tökezlemesi ya da bir dilde diğerinden pahalı çalışması — bunların ne kadarı gerçekten tokenizer'ın işi?

## Kaynakça

- Dodge, J., Sap, M., Marasović, A., Agnew, W., Ilharco, G., Groeneveld, D., Mitchell, M. & Gardner, M. (2021). *Documenting Large Webtext Corpora: A Case Study on the Colossal Clean Crawled Corpus*. Proceedings of the 2021 Conference on Empirical Methods in Natural Language Processing (EMNLP 2021), s. 1286–1305. [Bağlantı](https://aclanthology.org/2021.emnlp-main.98/)
- Raffel, C., Shazeer, N., Roberts, A., Lee, K., Narang, S., Matena, M., Zhou, Y., Li, W. & Liu, P. J. (2020). *Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer*. Journal of Machine Learning Research, 21(140), 1–67. [Bağlantı](https://www.jmlr.org/papers/v21/20-074.html)
- Penedo, G., Kydlíček, H., Ben Allal, L., Lozhkov, A., Mitchell, M., Raffel, C., Von Werra, L. & Wolf, T. (2024). *The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale*. NeurIPS 2024, Datasets and Benchmarks Track. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2024/hash/370df50ccfdf8bde18f8f9c2d9151bda-Abstract-Datasets_and_Benchmarks_Track.html)
- Lee, K., Ippolito, D., Nystrom, A., Zhang, C., Eck, D., Callison-Burch, C. & Carlini, N. (2022). *Deduplicating Training Data Makes Language Models Better*. ACL 2022, s. 8424–8445. [Bağlantı](https://aclanthology.org/2022.acl-long.577/)
- Xie, S. M., Pham, H., Dong, X., Du, N., Liu, H., Lu, Y., Liang, P., Le, Q. V., Ma, T. & Yu, A. W. (2023). *DoReMi: Optimizing Data Mixtures Speeds Up Language Model Pretraining*. Advances in Neural Information Processing Systems 36 (NeurIPS 2023). [Bağlantı](https://arxiv.org/abs/2305.10429)
- Muennighoff, N., Rush, A. M., Barak, B., Le Scao, T., Tazi, N., Piktus, A., Pyysalo, S., Wolf, T. & Raffel, C. (2023). *Scaling Data-Constrained Language Models*. Advances in Neural Information Processing Systems 36 (NeurIPS 2023). [Bağlantı](https://arxiv.org/abs/2305.16264)
- Wang, Y., Kordi, Y., Mishra, S., Liu, A., Smith, N. A., Khashabi, D. & Hajishirzi, H. (2023). *Self-Instruct: Aligning Language Models with Self-Generated Instructions*. ACL 2023, s. 13484–13508. [Bağlantı](https://aclanthology.org/2023.acl-long.754/)
- Shumailov, I., Shumaylov, Z., Zhao, Y., Papernot, N., Anderson, R. & Gal, Y. (2024). *AI models collapse when trained on recursively generated data*. Nature, 631, 755–759. [Bağlantı](https://doi.org/10.1038/s41586-024-07566-y)
- Gerstgrasser, M., Schaeffer, R., Dey, A. ve ark. (2024). *Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data*. Conference on Language Modeling (COLM 2024). [Bağlantı](https://arxiv.org/abs/2404.01413)
- Longpre, S. ve ark. (2024). *Consent in Crisis: The Rapid Decline of the AI Data Commons*. NeurIPS 2024, Datasets and Benchmarks Track. [Bağlantı](https://arxiv.org/abs/2407.14933)
