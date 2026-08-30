---
article_id: article_70332652-9902-4d4d-81e2-5e294088cf60
title: "Düşünce Zinciri: Ara Adımların Gücü ve Sınırı"
slug: dusunce-zinciri-ara-adimlarin-gucu-ve-siniri
category: reasoning-and-memory
level: intermediate
reading_order: 32
summary: "Ara adımların ölçülen kazancını ve mekanizmasını kurar: kazancın model ölçeğine ve görev zorluğuna nasıl bağlandığını, kazancın ne fazladan hesaptan ne de bilgi hatırlatmadan geldiğini gösteren üç ablasyonu, sabit derinlikli bir modelin sıralı hesap sınırını, eğitim verisinin yerel yapısının rolünü ve gösterimlerdeki akıl yürütmenin geçersiz olmasının neden çok az şey değiştirdiğini."
tags:
  - dusunce-zinciri
  - ara-adimlar
  - sirali-hesap
  - gosterim-tasarimi
  - olcek
content_hash: sha256:2ad54a31ef657628ee5e18c3448458b8286ce09d699519ce977a37b7c3e35e10
classification_version: 1
classification_batch: 7
---
## Ara adımların adı

31\. makalede bir kavramı ölçüme açtık ve bir soruyu bilerek açık bıraktık: ara adımlar cevabın gerekçesi olmak zorunda değilse, kazanç nereden geliyor?

Önce adı koyalım. Modelden cevabı doğrudan vermek yerine, cevaba giden ara adımları yazmasını istemenin alandaki adı **düşünce zinciri** (chain of thought). Tekniğin kendisi bir eğitim yöntemi değil; 23\. makalede kurduğumuz örnekle öğrenmenin bir kullanımı. İsteme konan çözülmüş örneklerde yalnızca cevap değil, cevaba giden adımlar da gösterilir; model o biçimi devam ettirir.

Bu makale üç ayrı yerden aynı soruyu yanıtlıyor. Önce kazancın nerede olduğunu ve nerede olmadığını ölçüyor; sonra kazancın *neyden gelmediğini* üç ablasyonla eliyor; en sonunda iki bağımsız açıklama kuruyor — biri modelin mimarisinden, öbürü eğitim verisinin biçiminden.

## Somut bir zincir

Mekanizmaya girmeden önce elle bir örnek yürütelim. Soru şu: bir rafta 3 kutu var, her kutuda 12 kalem; hepsi boşaltılıp kalemler 8 kişiye eşit dağıtılıyor. Kişi başına kaç kalem düşüyor?

Doğrudan cevap düzeninde model, sorunun son token'ından hemen sonra cevabı üretmek zorunda. Yani "3", "12" ve "8" sayılarından tek bir ileri geçişte 4,5 sonucuna varması gerekiyor — çarpma ve bölmenin ikisi de o tek geçişin içinde.

Ara adımlı düzende aynı hesap üç ayrı token dizisine yayılıyor: "3 kutu boşaltıldı, yani 3 × 12 = 36 kalem", sonra "36 kalem 8 kişiye bölünüyor", sonra "36 ÷ 8 = 4,5". Kritik nokta ortadaki adımda: model 36 sayısını yazdıktan sonra, o sayı artık bağlamda duruyor ve bir sonraki adımın girdisi oluyor. Model 36'yı yeniden hesaplamak zorunda değil; **okuyor**.

15\. makaledeki tokenizasyon bulgusu tam burada bağlanıyor. Sayılar token ızgarasında parçalara bölündüğü için, uzun bir hesabı tek geçişte yapmak modelin en zayıf olduğu iştir; ara sonucu yazıp geri okumak, aynı hesabı modelin en güçlü olduğu işe — metin devam ettirmeye — çeviriyor.

## Kazanç modele ve göreve bağlı

Jason Wei ve arkadaşlarının NeurIPS 2022'de sunduğu çalışma tekniğin kurucu ölçümü. Düzenek olabildiğince sade: elle yazılmış sekiz çözülmüş örnek, açgözlü seçim, hiçbir ince ayar yok. Aynı sekiz örnek bütün matematik kümelerinde kullanılıyor.

Sonuçlar ilkokul matematiği kümesinde şöyle:

| Model | doğrudan cevap | ara adımlarla |
|---|---|---|
| PaLM 8B | 4,9 | 4,1 |
| PaLM 62B | 9,6 | 29,9 |
| PaLM 540B | 17,9 | 56,9 |
| LaMDA 420M | 2,6 | 0,4 |
| LaMDA 137B | 6,5 | 14,3 |
| GPT-3 175B | 15,6 | 46,9 |

Tablonun en öğretici satırları küçük modellerinkiler. 420 milyon parametreli modelde ara adım istemek başarıyı 2,6'dan 0,4'e **düşürüyor**; 8 milyar parametreli modelde de küçük bir gerileme var. Teknik büyük modellerde başarıyı üçe katlarken küçük modellerde zarar veriyor. Bu, tekniğin ölçekle birlikte ortaya çıkan bir davranış olduğu anlamına geliyor.

İkinci eksen görevin zorluğu. Aynı çalışma, dört alt kümeye ayrılmış bir matematik kümesinde 540 milyar parametreli modeli ölçüyor: tek işlemle çözülen en kolay alt kümede puan 94,1'den 94,1'e, yani hiç değişmiyor; çok adımlı alt kümede 42,2'den 94,7'ye çıkıyor.

![İki panelli çubuk karşılaştırması. Sol panelde üç model boyu için doğrudan cevap ve ara adımlı cevap çubukları yan yana durur; en küçük modelde ara adımlı çubuk daha kısadır, orta ve büyük modellerde belirgin biçimde daha uzundur. Sağ panelde aynı büyük model için iki görev türü gösterilir: tek işlemle çözülen kolay alt kümede iki çubuk eşit yükseklikte, çok adımlı alt kümede ara adımlı çubuk çok daha uzundur. Panellerin altında kazancın hem model ölçeğine hem görev zorluğuna bağlı olduğu yazılıdır.](assets/kazancin-iki-ekseni.svg "Şekil 1 — Kazanç iki eksende birden değişiyor")

Şekil 1'in iki paneli tek bir cümleye çıkıyor: ara adımlar, yeterince büyük bir modelin yeterince adımlı bir problemde işine yarıyor. Küçük modelde ya da tek adımlı problemde kazanç yok, hatta eksi.

Çalışmanın elle yaptığı hata çözümlemesi de kayda değer. Doğru cevap veren elli örnekte üretilen zincirlerin tamamı — tesadüfen doğru cevaba varan iki tanesi dışında — mantıksal ve matematiksel olarak doğru. Yanlış cevap veren elli örnekte ise zincirlerin yüzde 46'sı küçük bir düzeltmeyle doğru hâle geliyor: yüzde 8'i yalnızca hesap makinesi hatası taşıyor, yüzde 16'sı sembolleri karıştırmış, yüzde 22'si tek bir adımı atlamış. Kalan yüzde 54'te hata anlamı kavramada. Dışarıdan bir hesaplayıcı bağlandığında 137 milyar parametreli modelin puanı 14,3'ten 17,3'e çıkıyor — küçük ama beklenen bir kazanç.

## Kazanç neyden gelmiyor

Açıklama arayışında üç sezgisel aday var ve aynı çalışma üçünü de eliyor. Her ablasyon, ara adımların bir özelliğini korurken ötekini bozuyor.

**Yalnızca denklem.** Belki kazanç, modelin problemi bir denkleme çevirmesinden geliyordur. Modelden ara adım yerine yalnızca çözülecek denklemi yazması isteniyor. İlkokul matematiğinde bu neredeyse hiç yardımcı olmuyor; tek ya da iki adımlı problemlerde ise yardımcı oluyor. Yani zor problemlerde denklemin kendisini kurmak, doğal dildeki ara adımlar olmadan yapılamıyor.

**Yalnızca değişken hesap.** Belki kazanç, modelin zor problemde daha fazla token üretmesinden, yani daha çok hesap harcamasından geliyordur. Bunu sınamak için modelden ara adım yerine, gereken denklemin karakter sayısı kadar nokta üretmesi isteniyor. Sonuç doğrudan cevaptan farksız. Fazladan token üretmek, tek başına, kazancı vermiyor.

**Cevaptan sonra gerekçe.** Belki ara adımlar yalnızca modelin ön eğitimde öğrendiği ilgili bilgiyi harekete geçiriyordur. Bunu sınamak için zincir cevaptan **sonra** yazdırılıyor. Sonuç yine doğrudan cevaptan farksız.

![Beş çubuklu bir karşılaştırma. Soldan sağa doğrudan cevap, yalnızca denklem, yalnızca nokta üretimi, cevaptan sonra gerekçe ve ara adımlı cevap çubukları yer alır. İlk dört çubuk birbirine yakın yükseklikteyken beşinci çubuk belirgin biçimde daha uzundur. Çubukların altında her ablasyonun neyi koruyup neyi bozduğu kısa etiketlerle yazılıdır ve kazancın ne fazladan hesaptan ne de bilgi hatırlatmadan geldiği belirtilir.](assets/uc-ablasyon.svg "Şekil 2 — Üç aday açıklama, üç eleme")

Şekil 2'deki üçüncü çubuk özellikle önemli, çünkü 30\. makalede ölçtüğümüz şemanın alan sırası bulgusunun kurucu hâli. Aynı sayıda token, aynı içerik, yalnızca sıra farklı: cevap önce gelirse kazanç yok. Sebebi 10\. makaledeki otoregresif döngü — model her adımda kendi ürettiği metne koşullanır, dolayısıyla cevaptan sonra yazılan hiçbir şey cevabı etkileyemez.

> **Kendini yokla:** Nokta üretme ablasyonu neden "fazladan hesap" açıklamasını eliyor da, "üretilen token sayısı hiç önemli değil" sonucuna götürmüyor?

Çünkü ablasyon token sayısını sabit tutup **içeriği** boşaltıyor. Nokta üretmek modele fazladan geçiş kazandırır ama o geçişlerin girdisi bilgi taşımaz; bir sonraki adımda koşullanacak bir ara sonuç yoktur. Sonuç şu: token sayısı gerekli olabilir, ama tek başına yeterli değil — token'ların **neye** koşullandığı belirleyici.

Bir gözlem daha aynı yöne bakıyor. Takeshi Kojima ve arkadaşlarının NeurIPS 2022'de gösterdiği gibi, isteme hiç çözülmüş örnek koymadan yalnızca "adım adım düşünelim" cümlesini eklemek de kazanç veriyor — 22\. makalede bu cümlenin iki matematik kümesindeki puanlarını (78,7 ve 40,7) otomatik istem aramasıyla karşılaştırmıştık. Tek bir cümle, hiçbir örnek göstermeden aynı davranışı tetikleyebiliyorsa, kazancın kaynağı gösterimlerin taşıdığı bilgi olamaz. Geriye tek bir aday kalıyor: üretimin **biçimi**.

## Birinci açıklama: sabit derinlik ve sıralı hesap

İlk açıklama mimariden geliyor ve 7\. makaledeki yapıyı hatırlamayı gerektiriyor. Bir Transformer, sabit sayıda katmandan oluşur. Tek bir token üretilirken yapılan hesabın derinliği bu katman sayısıyla sınırlıdır ve girdi uzadıkça artmaz. Yani model bir token'lık zamanda ancak sabit sayıda ardışık dönüşüm yapabilir.

Bazı problemler ise doğaları gereği **sıralı hesap** (serial computation) ister: her adımın girdisi bir önceki adımın çıktısıdır ve adımlar paralelleştirilemez. Bir permütasyon dizisini sırayla bileştirmek ya da bir sayıyı arka arkaya kare almak böyledir.

Zhiyuan Li ve arkadaşlarının ICLR 2024'te sunduğu çalışma bu gerilimi biçimsel olarak kuruyor. Sabit derinlikli ve sabit bit hassasiyetli bir kod çözücü, ara adım üretmeden yalnızca sığ bir hesap sınıfını çözebiliyor. Buna karşılık `T` adımlık bir düşünce zinciriyle — embedding boyutunun girdi uzunluğunun logaritmasıyla büyümesine izin verilirse — aynı sabit derinlikli model, `T` boyutunda bir mantık devresiyle çözülebilen **her** problemi çözebiliyor. Ara adım üretmek, mimarinin veremediği derinliği zaman ekseninde satın alıyor.

![Üç bölümlü bir şema. Solda tek bir token için katman yığını gösterilir; yığının yüksekliği sabittir ve yanında derinliğin girdi uzunluğundan bağımsız olduğu yazılıdır. Ortada ok işaretiyle bir dönüşüm gösterilir. Sağda art arda üretilen token kutuları vardır; her kutunun altında aynı sabit yükseklikte bir yığın durur ve kutular arasında soldan sağa bir bağ zinciri çizilmiştir. Şeklin altında sabit derinliğin bir çağrıda yapılabilecek ardışık hesabı sınırladığı, üretilen her token'ın bu sınırı bir kez daha ödeyerek hesabı zaman eksenine yaydığı belirtilir.](assets/derinlik-ve-sirali-hesap.svg "Şekil 3 — Derinliği zamana çevirmek")

Şekil 3, 10\. makaledeki token kutularının yeni bir okuması. Orada döngü bir üretim mekanizmasıydı; burada bir hesap mekanizması. Her yeni token, sabit derinlikli yığının bir kez daha çalıştırılması demek — ve önceki token'ların hepsi bağlamda durduğu için, yığın bir önceki adımın sonucunu girdi olarak alabiliyor.

Aynı çalışma bunu deneyle de gösteriyor. Beş elemanlı permütasyonların bileşkesini hesaplayan bir görevde, ara adım üretmeyen model yaklaşık yüzde 20'de kalıyor — bu, beş seçenek arasından rastgele seçim yapmakla aynı. Ara adım üretimi açıldığında görev çözülüyor. Deneyin en titiz yanı kontrol koşulunda. Ara adımlı eğitimin bir istatistiksel avantajı var: model daha çok etiket görüyor. Bunu ayıklamak için üçüncü bir düzen kuruluyor — ara adımlar modele **ipucu etiketi** olarak öğretiliyor ama cevap yine tek seferde isteniyor. Bu düzen tabandan daha iyi çıkıyor; buna karşılık sıralı hesap gerektiren üç görevde ara adım **üretimi** ikisini de belirgin farkla geçiyor ve fark derinlik azaldıkça büyüyor. Yani üstünlüğün asıl kaynağı fazladan etiket değil, çıkarım anında adım üretmenin kendisi.

## İkinci açıklama: verinin yerel yapısı

İkinci açıklama mimariye değil, eğitim verisinin biçimine bakıyor.

Ben Prystawski ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma kontrollü bir dünya kuruyor. Yüz değişkenli olasılık ağları üretiliyor; her ağdan bir milyon örnek yazılıyor ve bu örneklerle sıfırdan küçük bir model eğitiliyor. Kritik değişken, her örneğin ağın **hangi** değişkenlerini içerdiği. Üç koşul var: örnekler ağın neredeyse tamamını içeriyor; örnekler yalnızca birbirine komşu değişkenlerden oluşan yerel öbekler içeriyor; ya da örnekler yerel ama yanlış bir komşuluk tanımına göre seçiliyor.

Ölçüm, eğitimde hiç birlikte görülmemiş değişken çiftleri arasındaki koşullu olasılığın ne kadar doğru kestirildiği. Sonuç net: ara adım üretmek yalnızca **yerel yapılı** koşulda kazandırıyor. Ağın tamamını gören modelde de, yanlış yerellikle eğitilen modelde de kazanç yok.

Sebebi sezgisel olarak şöyle. Eğitim verisi yerel öbeklerden oluşuyorsa, model komşu değişkenler arasındaki ilişkileri iyi öğrenir; hiç birlikte görmediği uzak çiftler arasındaki ilişkiyi ise öğrenemez. Ara adım üretmek, uzak çifti bir dizi komşu adıma bölüyor ve her adımda modelin iyi bildiği bir ilişkiyi kullanıyor. Kısa ve güvenilir sıçramaların zinciri, tek bir uzun ve güvenilmez sıçramadan daha isabetli oluyor.

Çalışma bir de kontrol kestirimi kullanıyor: ara adım olarak, hedefle ilgisiz rastgele değişkenler ürettiriliyor. Kazanç kayboluyor. Bu, Wei'nin nokta üretme ablasyonunun aynısıdır ve iki bağımsız düzenekten aynı sonucu verir: ara adımın **içeriği** işin merkezinde.

Bu açıklama 4\. ve 8\. makalelerle doğrudan bağlantılı. Dağılımsal hipotez, anlamın birlikte geçme örüntüsünden doğduğunu söylüyordu. İnsan metinleri de yerel yapılıdır: bir metinde birlikte anılan şeyler genellikle birbirine yakın kavramlardır, uzak çiftler nadiren aynı cümlede geçer. Düşünce zincirinin işe yaraması, ön eğitim derleminin bu özelliğinden besleniyor.

## Gösterimlerdeki adımlar doğru olmak zorunda mı

Şimdi rahatsız edici bir bulgu. Eğer ara adımlar bir hesabı taşıyorsa, isteme konan örnek zincirlerin doğru olması gerekmez mi?

Boshi Wang ve arkadaşlarının ACL 2023'te sunduğu çalışma tam bunu sınıyor. İsteme konan çözülmüş örneklerin akıl yürütmesi kasten bozuluyor: adımlar hem yanlış sayılar taşıyor hem birbirinden çıkmıyor hem de cevaba mantıksal olarak götürmüyor. Hedef sorular değişmiyor.

| Düzen | İlkokul matematiği | Çok adımlı soru |
|---|---|---|
| örneklerde ara adım yok | 15,4 | 20,6 |
| doğru ara adımlar | 48,5 | 45,2 |
| geçersiz ara adımlar | 39,5 | 39,4 |
| ilgisiz ara adımlar | 11,0 | 23,9 |

Geçersiz akıl yürütmeyle bile kazancın büyük kısmı korunuyor; zincirin kalitesini doğrudan ölçen içsel ölçütlerde korunan pay yüzde 90'ı geçiyor. Buna karşılık adımların soruyla **ilgisi** koparıldığında başarı, ara adımsız düzenin bile altına düşüyor. Adımların sırası bozulduğunda da benzer bir çöküş var.

> **Kendini yokla:** Geçersiz adımlarla kazancın korunması, 23\. makaledeki hangi bulgunun kardeşi?

23\. makalede, gösterimlerdeki etiketler rastgele değiştirildiğinde kazancın yüzde 90'dan fazlasının korunduğunu, ama girdi dağılımı ya da biçim bozulduğunda kazancın çöktüğünü ölçmüştük. Buradaki tablo aynı örüntünün ara adımlar için tekrarı: gösterimler modele *ne yapacağını* öğretiyor, *nasıl doğru yapılacağını* değil. Doğruluk gösterimden değil, modelin kendisinden geliyor.

## Kazanç nerede yok

22\. makalede Zayne Sprague ve arkadaşlarının ICLR 2025 meta-analizini görmüştük: kazanç sembolikte 14,2, matematikte 12,3, mantıkta 6,9 ve **diğer bütün görevlerde 0,7** puan. Aynı çalışmanın bu makaleye ait olan iki bulgusu daha var.

Birincisi keskin bir ayrım testi. Geniş kapsamlı bir çoktan seçmeli kümede kazancın nereden geldiğini bulmak için sorular ikiye ayrılıyor: soruda ya da modelin cevabında eşittir işareti geçenler ve geçmeyenler. Toplam kazancın yüzde 95'e varan kısmı ilk gruptan geliyor. Matematik dışında kazancın ne zaman geleceğini önceden söyleyen hiçbir özellik bulunamıyor.

İkincisi kazancın kaynağını ayrıştırıyor. Matematik ve mantık soruları iki aşamaya bölünebilir: problemi biçimsel bir plana çevirmek ve o planı yürütmek. Dört düzen karşılaştırılıyor — doğrudan cevap, ara adımlar, plan üretip doğrudan çözdürmek, plan üretip ara adımlarla çözdürmek ve plan üretip bir dış çözücüye çalıştırmak. Sonuç: yalnızca planı üretmek kazancın büyük kısmını vermiyor; kazanç yürütme aşamasında. Ama aynı planı bir Python yorumlayıcısına ya da bir teorem kanıtlayıcısına verdiğinizde sonuç ara adımlardan belirgin biçimde daha iyi.

Bu, tekniğin yerini dürüstçe koyuyor: düşünce zinciri, sembolik bir çözücünün evrensel ama kaba bir yaklaşımı. Çözücünün olduğu yerde çözücü kazanıyor; olmadığı yerde ise zaten kazanç küçük.

Bir kapsam uyarısı gerekli. Buradaki ölçümlerin tamamı **istemle** tetiklenen ara adımlara ait: model hazır alınıyor, ağırlıklarına dokunulmuyor, yalnızca isteme örnek ya da bir cümle konuyor. Ara adım üretmek üzere ayrıca eğitilmiş modellerde tablonun aynı kalacağını varsaymak için bir sebep yok; onların nasıl eğitildiğini ve neyi değiştirdiğini 34\. makalede kuracağız. Bu makalenin ölçtüğü şey, eğitim değişmeden yalnızca istemle ne kadar yol alınabildiği.

## Ara adımların disiplini

**Kazanç ölçeğe bağlıdır.** Küçük modellerde ara adım istemek başarıyı düşürebiliyor. Bir teknik "işe yarıyor" derken hangi ölçekte ölçüldüğü sorulmalı.

**Kazanç görev zorluğuna bağlıdır.** Tek adımlı bir işte kazanç sıfır. Adım sayısı arttıkça kazanç büyüyor.

**Ara adım cevaptan önce üretilmelidir.** Cevaptan sonra yazılan gerekçe hiçbir şey değiştirmiyor; bu, 30\. makaledeki şema kuralının kaynağı.

**Boş token kazanç getirmiyor.** Uzunluk değil, üretilen içeriğin bir sonraki adıma koşullanması belirleyici.

**Gösterimlerde ilgi ve sıra, doğruluktan önemli.** Örnek zincirleri kusursuz olmak zorunda değil; soruyla ilgili ve doğru sıralı olmak zorunda.

**Sembolik bir çözücü varsa onu kullan.** Ara adımlar yürütmeyi iyileştiriyor ama gerçek bir yorumlayıcının altında kalıyor.

**Teknik bedelsiz değil.** Kazancın olmadığı görevlerde ara adım istemek yalnızca boşa token harcamak demektir; kazancın olduğu görevlerde bile fatura üretilen token sayısıyla doğru orantılı büyür.

### Sırada ne var

Bu makalede kazancın mekanizmasını kurduk ve mekanizmanın bir yan etkisi var: model artık cevaba varmadan önce yüzlerce, bazen binlerce token üretiyor. Bu token'ların hepsi, 26\. ve 28\. makalelerde muhasebesini çıkardığımız adım adım üretim aşamasında, yani belleğin dar boğaz olduğu tarafta harcanıyor.

Sonraki makale bu faturayı bir eksene çeviriyor. Eğer daha fazla düşünmek daha iyi cevap veriyorsa, ne kadar düşünme satın alınabilir, bu para nereye gider ve aynı parayı modeli büyütmeye harcamak daha mı iyi olurdu? 9\. makalede eğitim tarafında kurduğumuz hesap ekseninin çıkarım tarafındaki karşılığı burada açılıyor.

## Kaynakça

- Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E. H., Le, Q. V. & Zhou, D. (2022). *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*. NeurIPS 2022. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/9d5609613524ecf4f15af0f7b31abca4-Abstract-Conference.html)
- Li, Z., Liu, H., Zhou, D. & Ma, T. (2024). *Chain of Thought Empowers Transformers to Solve Inherently Serial Problems*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=3EWTEy9MTM)
- Prystawski, B., Li, M. Y. & Goodman, N. D. (2023). *Why think step by step? Reasoning emerges from the locality of experience*. NeurIPS 2023. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2023/hash/e0af79ad53a336b4c4b4f7e2a68eb609-Abstract-Conference.html)
- Wang, B., Min, S., Deng, X., Shen, J., Wu, Y., Zettlemoyer, L. & Sun, H. (2023). *Towards Understanding Chain-of-Thought Prompting: An Empirical Study of What Matters*. ACL 2023, s. 2717–2739. [Bağlantı](https://aclanthology.org/2023.acl-long.153/)
- Sprague, Z., Yin, F., Rodriguez, J. D., Jiang, D., Wadhwa, M., Singhal, P., Zhao, X., Ye, X., Mahowald, K. & Durrett, G. (2025). *To CoT or not to CoT? Chain-of-thought helps mainly on math and symbolic reasoning*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/ead542f13a38179d1b55b88610f959a1-Abstract-Conference.html)
