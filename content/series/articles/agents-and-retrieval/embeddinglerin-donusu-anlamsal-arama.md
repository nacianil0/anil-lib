---
article_id: article_96a66445-c969-40f3-b704-df7bf7012ef6
title: "Embedding'lerin Dönüşü: Anlamsal Arama"
slug: embeddinglerin-donusu-anlamsal-arama
category: agents-and-retrieval
level: intermediate
reading_order: 29
summary: "4. makalenin vektör uzayını bir ürün bileşenine çevirir: sorguyla belgeyi birlikte okuyan modelin neden ölçeklenemediğini, ikili kodlayıcının bu maliyeti nasıl düşürdüğünü ve karşılığında neyi feda ettiğini, sözcük eşleşmesinin nerede hâlâ öne geçtiğini ve tek bir vektörün taşıyabileceği ilişki sayısının matematiksel sınırını gösterir."
tags:
  - anlamsal-arama
  - ikili-kodlayici
  - getirme
  - embedding-boyutu
  - olcum-disiplini
content_hash: sha256:9d1b8db77e75999ce7c5a893bebf3c3c24d3fe79d0d9f525e0003ed954bc388f
classification_version: 1
classification_batch: 6
---
## Pencereye ne koyacağız

Son dört makale pencerenin maliyetiyle uğraştı: önbellekte ne durduğunu gördük, sayıları küçülttük, boştaki hesabı doldurduk. Ama bütün bu ekonominin sessiz bir varsayımı vardı — pencereye konacak metnin elimizde olduğu.

Gerçek bir sistemde öyle değil. Elinde bir kullanıcı sorusu ve milyonlarca belge var; pencereye sığacak olan birkaç tanesi. Hangileri?

En eski cevap sözcük eşleşmesidir: sorudaki kelimeleri içeren belgeleri getir. Bu yol şaşırtıcı derecede iyi çalışır ve altmış yıllık bir mühendislik birikimi taşır. Ama bir duvarı var. "Yüzüklerin Efendisi'ndeki kötü adam kim?" diye soran birine, "Sauron'u canlandıran Sala Baker…" diye başlayan belge lazımdır — ve o belgede "kötü adam" ifadesi geçmez. Ortak tek bir kelime yoksa sözcük tabanlı bir sistem o belgeyi hiç görmez.

4\. makalede bu duvarı aşacak fikri zaten kurmuştuk. Benzer bağlamlarda geçen kelimelerin benzer vektörler aldığı bir uzay; anlamın bir konum olduğu bir harita. O makalede embedding, modelin girişindeki bir ara adımdı. Bu makalede kendi başına bir ürün bileşenine dönüşüyor ve yaptığı işin adı **anlamsal arama** (semantic search), pencereye konacak metni bulma işinin genel adı ise **getirme** (retrieval).

Bu soruyla daha önce başka bir kılıkta karşılaşmıştık. 23\. makalede isteme konacak gösterimlerin seçimini konuşurken, hangi örneğin işe yarayacağını bulmanın kendisinin bir arama işi olduğunu söylemiştik. Getirilen şeyin bir belge mi yoksa bir çözülmüş örnek mi olduğu mekanizmayı değiştirmiyor.

## Ucuz olmayan doğru cevap

Doğru cevabı bulmanın en iyi yolu belli aslında. Soruyu ve belgeyi **birlikte** modele ver, ilgili olup olmadığını söylesin. Bu düzene **çapraz kodlayıcı** (cross-encoder) deniyor ve 6\. makaleden neden en iyi yol olduğunu biliyoruz: dikkat, sorudaki token'ların belgedeki token'lara bakmasına izin verir. "Kötü adam" ifadesi, "kötücül" kelimesinin bağlamsal temsilini doğrudan etkileyebilir.

Bedeli ne? Nils Reimers ve Iryna Gurevych'in EMNLP 2019'da sunduğu çalışma hesabı yapıyor. On bin cümlelik bir kümede en benzer çifti bulmak için her çifti ayrı ayrı modele vermek gerekir: 10.000 × 9.999 ÷ 2 = 49.995.000 çıkarım. O dönemin güçlü bir kartında bu yaklaşık **65 saat** sürüyor. Üstelik bu yalnızca on bin cümle; bir arama sisteminde belge sayısı milyonlarla ölçülür ve hesap her yeni sorguda baştan yapılır.

Aynı çalışmanın önerdiği çözüm, sorunun kaynağını ortadan kaldırıyor: soruyu ve belgeyi **birbirinden bağımsız** kodla. Her metin tek başına bir vektöre dönüşsün, benzerlik de iki vektör arasındaki nokta çarpımla ölçülsün — 6\. makalede dikkat skorlarını üretirken kullandığımız işlemin ta kendisi. Bu düzene **ikili kodlayıcı** (bi-encoder) deniyor. Aynı on bin cümlelik iş, 65 saatten yaklaşık **5 saniyeye** iniyor.

![İki panelli bir karşılaştırma. Solda çapraz kodlayıcı: sorgu ve belge tek bir kutuya birlikte girer, aralarında karşılıklı dikkat olduğunu söyleyen bir bağlantı vardır ve çıkışta tek bir ilgi puanı verilir; altında her sorgu-belge çifti için modelin yeniden çalıştırılması gerektiği yazılıdır. Sağda ikili kodlayıcı: sorgu ve belge iki ayrı kutuya ayrı ayrı girer, her biri kendi vektörünü üretir ve iki vektör bir nokta çarpımıyla karşılaştırılır; altında belge vektörlerinin önceden hesaplanıp saklanabildiği, sorgu geldiğinde yalnızca bir vektör üretildiği yazılıdır.](assets/capraz-ve-ikili-kodlayici.svg "Şekil 1 — Aynı işi iki farklı yerde yapmak")

Şekil 1'deki farkın asıl kaynağı, hesabın **ne zaman** yapıldığı. Çapraz kodlayıcıda belge her sorguda yeniden okunur. İkili kodlayıcıda belgelerin vektörleri bir kez hesaplanıp saklanır; sorgu geldiğinde yalnızca sorgunun vektörü üretilir ve kalan iş, saklanmış vektörler arasında en yakınları bulmaktan ibarettir. 26\. ve 28\. makalelerdeki "değişmeyeni bir kez öde" fikrinin bir başka görünümü.

Bu düzenin gerektirdiği tek koşul, sorgu ile belgenin **aynı uzaya** yerleştirilmesi. 4\. makaledeki anlam haritasını hatırla: orada kelimeler bir düzleme yerleşiyor ve yakınlık anlam yakınlığını gösteriyordu. Burada aynı düzleme bu kez cümleler, paragraflar ve sorular konuyor; iki kodlayıcı, biri soruları biri belgeleri kodlasa bile, aynı geometriye yazmak üzere birlikte eğitiliyor.

![İki boyutlu bir anlam haritası. Düzlemin üzerine belge noktaları dağılmıştır ve birkaçının yanında kısa etiketler vardır; birbirine yakın duran belgeler benzer konuları taşır. Haritanın bir yerinde farklı bir işaretle gösterilen bir sorgu noktası bulunur ve çevresinde, ona en yakın üç belgeyi içine alan bir daire çizilidir. Dairenin dışında kalan bir belge, sorguyla ortak kelimesi olmasına rağmen uzakta durur. Haritanın altında, belge noktalarının sorgudan önce yerleştirildiği, sorgunun ise geldiğinde bu sabit haritaya düştüğü yazılıdır.](assets/ortak-uzay.svg "Şekil 2 — Sorgu ve belgeler aynı haritada")

Şekil 2'de gizli bir bedel var ve bu makalenin geri kalanı onun faturası. Belgenin haritadaki yeri, **sorgunun ne olduğu bilinmeden** belirlenmek zorunda. Belge kodlanırken hangi soruyla eşleşeceği belli değildir; dolayısıyla o tek nokta, belgeye sorulabilecek bütün soruları aynı anda temsil etmelidir.

## Haritayı kim çiziyor

4\. makalede embedding defterini eğitimin yazdığını söylemiştik: benzer bağlamlarda geçen kelimeler benzer satırlar alıyordu. Getirme için kullanılan vektörler de eğitiliyor, ama hedef farklı. Burada istenen şey "benzer bağlamda geçiyor" değil, "bu soruya bu belge cevap veriyor".

Eğitim verisi soru-belge çiftlerinden oluşur ve döngü 2\. makaledekiyle aynıdır; değişen tek şey kaybın neyi ölçtüğü. Doğru belgenin puanı yükseltilir, yanlışlarınki düşürülür. Asıl incelik yanlış örneklerin nereden geldiği. Karpukhin ve arkadaşlarının bulduğu ucuz numara şu: bir mini yığında B tane soru varsa, her sorunun doğru belgesi öteki B−1 sorunun **yanlış** belgesidir. Soru ve belge vektörleri zaten hesaplandığı için B×B'lik bütün karşılaştırma tablosu bedavaya gelir; tek bir yığından B² eğitim çifti çıkar. Çalışmanın en iyi düzeni bunun üstüne bir de sözcük eşleşmesinin getirdiği, cevabı içermeyen ama kelimeleri örtüşen bir "zor" yanlış örnek ekliyor.

Bir de tanım meselesi var. Buradaki "belge" bir makalenin tamamı değil; çalışma Wikipedia'yı yüz kelimelik ayrık parçalara bölüyor ve getirmenin birimi bu parçalar oluyor — toplam 21.015.324 tane. Metnin nereden kesileceği başlı başına bir tasarım kararıdır ve getirme hattının ayrı bir konusudur; burada bilmemiz gereken tek şey, tek bir vektörün temsil ettiği metnin bir sayfa değil bir paragraf mertebesinde olduğudur.

Bu ölçek maliyetin nereye düştüğünü de gösteriyor. Yirmi bir milyon parçanın her biri 768 boyutlu bir vektöre dönüşüyor; sayı başına 4 bayttan hesaplarsak 21.015.324 × 768 × 4 ≈ **65 gigabayt**. Kurulum da ucuz değil: aynı çalışmada vektörleri hesaplamak sekiz kart üzerinde yaklaşık 8,8 saat, arama dizinini kurmak bir sunucuda 8,5 saat sürüyor. Sözcük eşleşmesinin ters dizinini kurmak ise yaklaşık 30 dakika. Buna karşılık sorgu anında tablo tersine dönüyor: bellekteki dizin saniyede 995 soruyu yanıtlarken, sözcük tabanlı dizin işlemci başına saniyede 23,7 soru işliyor.

Yani anlamsal arama kurulumda pahalı, sorguda ucuz. 27\. makaledeki fikir burada da geçerli — vektörleri daha az bitle saklamak aynı yuvarlama değiş tokuşuyla o 65 gigabaytı küçültür — ve boyut sayısı, bu iki maliyetin de doğrudan çarpanıdır.

## Ölçüldüğünde ne oluyor

Bu düzenin gerçekten işe yaradığını gösteren dönüm noktası, Vladimir Karpukhin ve arkadaşlarının EMNLP 2020'de sunduğu çalışma. Soru-cevap kümelerinde, getirilen ilk 20 pasaj içinde cevabın bulunma oranını — alandaki adıyla **bulma oranını** (recall) — ölçüyorlar. Aşağıdaki sayılar yüzde cinsinden ve büyük olan iyidir.

| Değerlendirme kümesi | Sözcük eşleşmesi | Anlamsal arama | İkisi birlikte |
|---|---|---|---|
| Natural Questions | 59,1 | 78,4 | 76,6 |
| TREC | 70,9 | 79,8 | 85,2 |
| SQuAD | 68,8 | 63,2 | 71,5 |

İlk satır alanın hikâyesini anlatıyor: yaklaşık yirmi puanlık bir sıçrama. Ama tablonun asıl öğretici satırı üçüncüsü — SQuAD'da anlamsal arama sözcük eşleşmesinin **altında** kalıyor. Sebep, 16\. makaledeki disiplini gerektiriyor: o kümenin soruları, insanlara pasaj gösterilip "bu metne bir soru yaz" denilerek üretilmiş. Soruyla belge arasında yapay derecede yüksek bir kelime örtüşmesi var ve bu, tam olarak sözcük eşleşmesinin en güçlü olduğu durum. Küme bir yöntemi değil, bir üretim biçimini ödüllendiriyor.

İkinci satır ayrı bir ders veriyor: TREC'te iki yöntemi birleştirmek ikisinden de iyi sonuç veriyor. Ama son sütunun ilk satırı bunun bir kural olmadığını söylüyor — Natural Questions'ta birleştirme, tek başına anlamsal aramanın altında kalıyor. Bunlar birbirinin yerine geçen değil, farklı hataları olan iki cetvel; hangisinin ya da hangi karışımın işe yarayacağı ölçülmesi gereken bir seçenektir.

> **Kendini yokla:** Bir belge kodlanırken hangi sorunun sorulacağı bilinmiyorsa, aynı belge iki farklı soru için nasıl "yakın" çıkabilir?

Çünkü yakınlık tek bir eksende değil, yüzlerce boyutlu bir uzayda ölçülüyor. Belgenin vektörü, taşıdığı bütün konuların bir bileşimidir ve iki farklı sorgu vektörü bu bileşimin farklı bileşenlerine yakın düşebilir. Sınır da tam burada: bileşenlerin sayısı boyut sayısıyla sınırlıdır — ve birazdan bu sınırın ölçülmüş bir değeri olduğunu göreceğiz.

## Hangi model, hangi iş?

Bir sonraki soru doğal olarak "hangi embedding modeli en iyi" oluyor ve cevabı 16\. makaleyi baştan okumayı gerektiriyor.

Nandan Thakur ve arkadaşlarının NeurIPS 2021 veri kümeleri ve kıyaslamalar programında sunduğu çalışma, on getirme sistemini on sekiz ayrı derlem üzerinde, **eğitildikleri alanın dışında** karşılaştırdı. Ana bulgu üç parçalı: sözcük eşleşmesi hâlâ sağlam bir taban çizgisi; ortalamada en iyi sonuçları **yeniden sıralayıcılar** (reranker) ve **geç etkileşimli** (late interaction) modeller veriyor, ama yüksek hesap maliyetiyle; ucuz olan tek vektörlü modeller ise kendi eğitim alanlarının dışında sık sık geride kalıyor.

İkinci ölçüm daha da doğrudan. Niklas Muennighoff ve arkadaşlarının EACL 2023'te sunduğu değerlendirme takımı, embedding modellerini sekiz farklı görev türünde, 58 veri kümesi ve 112 dil üzerinde, 33 modelle sınıyor. Sonuç tek cümle: **hiçbir yöntem bütün görevlerde önde değil.** Anlamsal benzerlikte en iyi olan model, getirmede ya da kümelemede aynı yerde durmuyor.

Bu, liderlik tablosu okuma disiplinini embedding'lere taşıyor. Bir modelin "en iyi" olduğu iddiası, hangi görevde ve hangi dilde ölçüldüğü söylenmeden bir bilgi taşımaz.

## Tek vektörün matematiksel sınırı

Şimdi asıl soruya gelelim. Bir belgeyi tek bir vektörle temsil etmenin bir tavanı var mı?

Orion Weller ve arkadaşlarının ICLR 2026'da sunduğu çalışma bunu hem kanıtlıyor hem gösteriyor. Kanıt tarafı sezgisel olarak şöyle kurulabilir: bir sorgu, belgeleri puanlarına göre sıralar ve ilk k tanesini döndürür. Belge sayısı arttıkça, "ilk k'da hangi belgelerin birlikte bulunabileceğine" dair kombinasyon sayısı çok hızlı büyür. Vektörlerin yaşadığı uzayın boyutu ise sabittir. Belirli bir boyutun üstünde, hiçbir sorgunun döndüremeyeceği belge kombinasyonları **zorunlu olarak** ortaya çıkar. Araştırmacılar bu kırılma noktasını, vektörleri doğrudan test verisine göre eniyileyerek, yani gerçek bir modelin asla erişemeyeceği en iyi durumda ölçüyorlar; 1.024 boyutlu bir uzay için elde ettikleri eşik dört milyon belge civarında.

Bu soyut sonucu somut hâle getirmek için tuhaf derecede basit bir veri kümesi kuruyorlar. Belgeler "Jon Durben kuokkaları ve elmaları sever" biçiminde tek cümleler; sorgular "kim kuokkaları sever?" biçiminde. Kırk altı belgeden seçilebilecek ikili kombinasyonların tamamı — 1.035 tane — sorgu olarak soruluyor ve bu kırk altı belge elli bin belgelik bir yığının içine saklanıyor. Görev, bir insan için önemsiz.

Sonuçlar şaşırtıcı. Aşağıdaki sayılar, yalnızca kırk altı belgelik küçük sürümde ilk iki sonuç içinde doğru belgeyi bulma oranı:

| Yöntem | Bulma oranı | Eş anlamlı sürümde |
|---|---|---|
| Sözcük eşleşmesi (BM25) | 97,8 | 10,6 |
| Çok vektörlü, geç etkileşimli | 83,5 | 25,6 |
| En iyi tek vektörlü model | 54,3 | 12,8 |
| Yaygın tek vektörlü modeller | 19,0 – 38,4 | 8,5 – 15,1 |

Elli bin belgelik tam sürümde durum daha da sert: modeller ilk **yüz** sonuçta bile yüzde 20 bulma oranına ulaşamıyor.

![İki eksenli bir çubuk grafik. Yatay eksende dört yöntem sıralanır: sözcük eşleşmesi, çok vektörlü geç etkileşimli model, en iyi tek vektörlü model ve tek vektörlü modellerin alt ucu. Her yöntem için iki çubuk vardır: koyu olan özgün veri kümesindeki bulma oranını, açık olan aynı kümenin eş anlamlılarla değiştirilmiş sürümündeki oranı gösterir. Sözcük eşleşmesinin koyu çubuğu neredeyse tavana ulaşır ama açık çubuğu en kısa çubuklardan biridir; tek vektörlü modellerin iki çubuğu da alçaktır. Grafiğin altında, her iki yöntemin de kendi kör noktası olduğu yazılıdır.](assets/limit-bulma-oranlari.svg "Şekil 3 — Basit bir görevde iki farklı kör nokta")

Şekil 3'ün sağ sütunları, sözcük eşleşmesinin zafer ilanı olmadığını gösteriyor. Araştırmacılar aynı kümenin bütün kelimelerini eş anlamlılarıyla değiştirdiklerinde sözcük eşleşmesi yüzde 89'dan fazla düşerek tek vektörlü modellerin altına iniyor. Yani tabloda iki kör nokta var: biri anlamı görmüyor, öbürü ilişki sayısını taşıyamıyor.

Bulgunun bir alan kayması olmadığı da ayrıca sınanmış. Bir embedding modelini aynı biçimde üretilmiş bir eğitim kümesiyle eğitmek neredeyse hiç yardımcı olmuyor; ilk on sonuçta bulma oranı sıfıra yakın bir yerden yalnızca 2,8'e çıkıyor. Buna karşılık kırk altı belgenin tamamını bağlam penceresine koyup bir modele hepsini birden okutmak — yani bu makalenin başında pahalı bulduğumuz çapraz okuma — bin sorgunun tamamını doğru cevaplıyor.

## Pratikte ne yapılıyor

Bu tablo, üretim sistemlerinde yerleşmiş üç alışkanlığı açıklıyor.

**Hibrit arama.** Sözcük eşleşmesiyle anlamsal aramanın sonuçları birleştirilir. DPR tablosundaki TREC satırı bunun ölçülmüş hâliydi: 79,8 ve 70,9, birlikte 85,2.

**İki aşamalı sıralama.** Ucuz ikili kodlayıcı yüz civarı aday getirir; pahalı çapraz kodlayıcı yalnızca o adayları yeniden sıralar. Böylece çapraz okumanın doğruluğu, milyonlarca belge yerine yüz belge maliyetiyle alınır. Getirme hattının bu iki katmanlı yapısı, 28\. makaledeki taslak-ve-doğrulayıcı düzeniyle aynı fikrin başka bir alandaki hâli: ucuz olan aday üretsin, pahalı olan karar versin.

**Yaklaşık arama.** Sorgu vektörü hazır olduğunda geriye "en yakın k tanesini bul" işi kalır ve yirmi bir milyon vektörü tek tek taramak bu işi yeniden pahalı yapar. Pratikte tarama yapılmaz: vektörler önceden kümelenip bir dizine yerleştirilir ve sorgu yalnızca yakın kümelere bakar. Bu, sonucun **yaklaşık** olduğu anlamına gelir; gerçekten en yakın belge kaçırılabilir. Yukarıdaki saniyede 995 soru sayısı da bu yaklaşıklığın karşılığıdır. Buradan çıkacak not şu: bir getirme hattında ölçülen kalite yalnızca embedding modelinin değil, dizinin de bir fonksiyonudur.

**Boyutu bir bütçe olarak yönetmek.** Depolama ve arama maliyeti boyutla doğrusal artar, ve yukarıdaki sonuç boyutun aynı zamanda bir kapasite olduğunu söylüyor. Aditya Kusupati ve arkadaşlarının NeurIPS 2022'de sunduğu iç içe temsil fikri bu ikilemi yönetilebilir kılıyor: model öyle eğitiliyor ki vektörün ilk 64, ilk 256 ya da ilk 1.024 boyutu tek başına anlamlı bir temsil oluyor. Aynı vektör, işin gerektirdiği yerde kısaltılıp kullanılabiliyor; ImageNet üzerindeki sınıflandırma deneylerinde aynı doğruluk 14 kata kadar küçük bir temsille elde edilmiş, aynı kümedeki büyük ölçekli getirmede ise 14 kata varan hızlanma ölçülmüş.

> **Kendini yokla:** Bir arama sisteminde embedding boyutunu 1.024'ten 256'ya düşürürsen ne kazanır, ne kaybedersin?

Depolamada ve karşılaştırma maliyetinde dörtte üç kazanırsın. Kaybettiğin şey, aynı uzayda ayrıştırılabilecek belge kombinasyonu sayısıdır — küçük bir derlemde bu fark hiç görünmeyebilir, derlem büyüdükçe kaçırılan sonuç olarak ortaya çıkar.

## Anlamsal aramanın disiplini

**"Anlamsal arama sözcük aramasını gömdü" cümlesi ölçülmedi.** İki yöntemin hataları farklıdır; birinin kör noktası öbürünün güçlü tarafıdır.

**Bir embedding modelinin sırası, ölçüldüğü göreve aittir.** Benzerlikte önde olan model getirmede önde olmayabilir; başka bir dilde hiç olmayabilir.

**Kendi derlemin üzerinde ölç.** Alan dışına genelleme, bu alandaki en zayıf halka olarak ölçülmüştür.

**Boyutu bir kapasite bütçesi say.** Belge sayısı ve ayrıştırılması gereken ilişki sayısı büyüdükçe, tek bir vektörün taşıyabileceği şeyin bir tavanı vardır.

**Kaçırılan sonuç sessizdir.** Sözcük eşleşmesinde bir belgenin neden gelmediği okunabilir: aranan kelime orada yoktur. Anlamsal aramada böyle bir iz yoktur; belge yalnızca listenin uzağında kalmıştır ve bunu gösteren bir sinyal üretilmez. Sistemin neyi kaçırdığı ancak kendi derlemin üzerinde kurulmuş bir değerlendirme kümesiyle görülür.

**Getirilen belge güvenilir içerik değildir.** 24\. makalede işaret ettiğimiz gibi, pencereye giren üçüncü taraf metin talimat taşıyabilir; getirme hattı bu yüzden aynı zamanda bir saldırı yüzeyidir ve tam kurulumu güvenlik fazına ait.

Bu makale bilinçli olarak tek bir soruyla sınırlı kaldı: doğru metin nasıl bulunur. Bulunan metnin modelin kendi bilgisiyle ilişkisi, ne zaman ona başvurulması gerektiği ve cevabın kaynağa sadakati ayrı bir tartışma; onu 41\. makale açacak.

### Sırada ne var

Diyelim ki doğru belgeleri bulduk, pencereye koyduk ve model cevabı üretti. O cevabı bir insan okuyacaksa iş bitti. Ama bir program okuyacaksa — bir alan çıkarılacak, bir kod çalıştırılacak, bir arayüz doldurulacaksa — serbest metin yetmez. Modelin çıktısını belirli bir biçime zorlamak mümkün, hatta yüzde yüz garantiyle mümkün. Peki bu zorlama modelin cevabına ne yapıyor?

## Kaynakça

- Reimers, N. & Gurevych, I. (2019). *Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks*. EMNLP-IJCNLP 2019, s. 3982–3992. [Bağlantı](https://aclanthology.org/D19-1410/)
- Karpukhin, V., Oğuz, B., Min, S., Lewis, P., Wu, L., Edunov, S., Chen, D. & Yih, W. (2020). *Dense Passage Retrieval for Open-Domain Question Answering*. EMNLP 2020, s. 6769–6781. [Bağlantı](https://aclanthology.org/2020.emnlp-main.550/)
- Thakur, N., Reimers, N., Rücklé, A., Srivastava, A. & Gurevych, I. (2021). *BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models*. NeurIPS 2021 Datasets and Benchmarks. [Bağlantı](https://datasets-benchmarks-proceedings.neurips.cc/paper/2021/hash/65b9eea6e1cc6bb9f0cd2a47751a186f-Abstract-round2.html)
- Muennighoff, N., Tazi, N., Magne, L. & Reimers, N. (2023). *MTEB: Massive Text Embedding Benchmark*. EACL 2023, s. 2014–2037. [Bağlantı](https://aclanthology.org/2023.eacl-main.148/)
- Weller, O., Boratko, M., Naim, I. & Lee, J. (2026). *On the Theoretical Limitations of Embedding-Based Retrieval*. ICLR 2026. [Bağlantı](https://arxiv.org/abs/2508.21038)
- Kusupati, A., Bhatt, G., Rege, A., Wallingford, M., Sinha, A., Ramanujan, V., Howard-Snyder, W., Chen, K., Kakade, S., Jain, P. & Farhadi, A. (2022). *Matryoshka Representation Learning*. NeurIPS 2022. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/c32319f4868da7613d78af9993100e42-Abstract-Conference.html)
