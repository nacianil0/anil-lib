---
article_id: article_4f5d7963-b910-4600-b7fa-9fade6c4e80d
title: "AGI Tartışması: Tanımlar, Testler, Zaman Çizelgeleri"
slug: agi-tartismasi-tanimlar-testler-zaman-cizelgeleri
category: multimodal-and-future
level: advanced
reading_order: 117
summary: "\"Yapay genel zekâ\" tek bir ad ama en az sekiz tanım taşıyor, ve her tanım başka bir sınav ve başka bir kıyas insanı istiyor. Turing testinde hükmün sorgucuların kim olduğuna göre değiştiğini, ARC'de insan tabanının hangi insanla ve hangi kümeyle ölçüldüğüne göre yüzde 65 ya da 97–98 çıktığını, görev ufkunun eğiminin sağlam ama seviyesinin eşiğe ve kıyas insanına bağlı olduğunu ve uzman anketlerinin tarih değil sorunun ifadesine duyarlılığı ölçtüğünü gösteriyor. Kehanet yok: yalnızca tanımlar, sınavlar ve ölçümler."
tags:
  - yapay-genel-zeka
  - tanim-ve-sinav
  - turing-testi
  - gorev-ufku
  - uzman-anketleri
content_hash: sha256:947bf78760fe271b8565a485ff84f323549f89d6a5ca8a1690aa2d3cde1c5647
classification_version: 1
classification_batch: 28
---
## Birinci makalenin sorusu, yeniden

Serinin ilk makalesi yapay zekâyı bir sınavla değil bir alanla tanımlamıştı: makinelerin, insanda zekâ saydığımız işleri yapmasını hedefleyen bütün çalışmalar. Aynı makale Alan Turing'in 1950'deki hamlesini de anmıştı: "makineler düşünebilir mi" sorusunu cevaplanamayacak kadar bulanık bulup yerine davranışa dayalı bir sınama koymak. Ve bir işaret bırakmıştı: bir modelin yaptığının anlama sayılıp sayılmayacağı tartışmalı bir soruydu ve okur tarafların gerekçeleriyle ileride karşılaşacaktı. 110\. makale bu işaretin bir kısmını tartışmayı sürdürerek değil, sorunun ölçülebilir bir hâlini kurarak ödedi.

116'da bir tartışmanın, aynı adın iki ayrı işlemi taşıdığı anlaşılınca eridiğini gördük. Bu makale aynı soruyu alanın en çok konuşulan adına soruyor: **yapay genel zekâ** (artificial general intelligence, AGI) kaç ayrı şeyi adlandırıyor, ve her biri hangi sınavı gerektiriyor?

Makalenin işi kavramsal temizlik, kehanet değil. Bir zaman çizelgesi tahmini alıntılanmayacak; tarihlerden yalnızca, tahminlerin sorunun ifadesine nasıl tepki verdiğini ölçen çalışmaların sayıları kullanılacak. 71\. makalenin kuralı burada doğrudan geçerli: yapı tanımlanmadan ölçülemez. Orada ölçülmek istenen soyut şeye **yapı**, onu gözlenebilir bir işleme çevirme adımına **görevleştirme** demiştik. AGI bir yapı adı; tartışmanın büyük kısmı, aynı adın farklı görevleştirmeleri arasında geçiyor.

## Bir ad, sekiz tanım

Tanımları, neyi kıyasladıklarına ve kimi ölçü aldıklarına göre dizelim.

**Ayırt edilemezlik.** Turing'in *Mind*'da 1950'de yayımlanan makalesi tanım vermez, bir oyun kurar: yazılı mesajlarla yürüyen, üç kişilik bir taklit oyunu; sorgucu, karşısındakilerden hangisinin makine olduğunu bulmaya çalışır. Turing "düşünmek" sözcüğünü gündelik kullanımına bakarak, yani bir kamuoyu yoklamasıyla tanımlama fikrini de açıkça saçma bulur. Sınav: oyun. Kıyas: bir insan tanık; yargıç: sorgucu.

**Geniş bir ortamlar kümesinde hedefe ulaşma.** Shane Legg ile Marcus Hutter'in *Minds and Machines*'te 2007'de yayımlanan tanımı, zekânın insan tanımlarından damıttıkları bir cümleyle başlıyor: bir ajanın çok çeşitli ortamlarda hedeflerine ulaşma yeteneği. Biçimsel hâli, hesaplanabilir bütün ortamlardaki başarının, basit ortamlara daha çok ağırlık veren bir toplamı. Bu toplam hesaplanamıyor; yazarların kendi cümlesiyle tanım bu hâliyle bir zekâ sınavına çevrilemez. Ve insana hiç atıf yapmıyor.

**Beceri edinme verimliliği.** François Chollet'nin 2019'da yayımladığı, hakemli olmayan çalışması zekâyı, bir görev kapsamında, önsel bilgiye, deneyime ve genelleme zorluğuna göre beceri edinmenin verimliliği (skill-acquisition efficiency) diye tanımlıyor. Sınavı ARC: birkaç örnekten kuralı çıkarılması gereken ızgara bulmacaları. Kıyas: sıradan insanlar. 31\. makalede akıl yürütmenin tanımındaki "yeni" sözcüğünün tanımın tamamını taşıdığını görmüştük; bu tanımda aynı işi "genelleme zorluğu" terimi görüyor (bu bağlantı bizim okumamız).

**Ekonomik ikame.** OpenAI'ın 9 Nisan 2018 tarihli kuruluş ilkeleri AGI'yi ekonomik açıdan değerli işlerin çoğunda insanları geride bırakan, büyük ölçüde özerk sistemler diye tanımlıyor. Bu bir kurum beyanı; ekinde bir sınav yok.

**Anket soruları.** Katja Grace ve arkadaşlarının uzman anketleri iki soru soruyor: makinelerin **her görevi** insanlardan daha iyi ve daha ucuz yapabildiği **yüksek düzey makine zekâsı** (high-level machine intelligence, HLMI), ve **her mesleğin** tam otomasyonu (full automation of labor, FAOL). Sınav yok; soru, katılımcının kafasındaki tanıma bırakılıyor.

**Seviyeler.** Meredith Ringel Morris ve arkadaşlarının ICML 2024'teki konum bildirisi tanımı iki eksenli bir tabloya çeviriyor: genellik — dar ya da genel — ve performans; performans seviyeleri, nitelikli yetişkinlerin yüzde 50'lik, 90'lık ve 99'luk dilimleriyle kıyaslanıyor. Sınav: bilişsel görevlerin çoğu, ama o görevlerin ölçütü yazarların kendi ifadesiyle henüz kurulmadı. Yazarlar OpenAI'ın iş gücünü ikame eşiğini kendi tablolarında yüzde 99'luk dilimin seviyesine yerleştiriyor; aynı ad, tablonun başka bir hücresi.

**Bilişsel profil.** Dan Hendrycks ve arkadaşlarının 2025'te yayımladığı, hakemli olmayan tanım, iyi eğitim görmüş bir yetişkinin bilişsel çok yönlülüğüne ve yetkinliğine yetişmeyi ölçü alıyor ve bunu psikometrideki on bilişsel alana eşit ağırlıkla bölüyor. Kendi el ile yaptıkları değerlendirmede GPT-4'e yüzde 27, GPT-5'e yüzde 57 veriyorlar; iki model de uzun süreli belleğe yeni bilgi yazma alanında sıfır alıyor.

**Karşıt bir üretim yordamı.** Chollet'nin Aralık 2024'te yazdığı ve ARC ekibinin 2025 raporunda aktarılan tanım bir sınav değil, sınav üretme yordamı: sıradan insanlar için kolay ama yapay zekâ için zor görevler üretmek imkânsız hâle geldiğinde AGI gelmiş olacak.

![Solda tek bir düğüm: yapay genel zekâ. Ondan sekiz çizgi sekiz satıra gider; sütunlar tanım, sınav ve kimle kıyas. Turing 1950, ayırt edilemezlik: üç kişilik yazılı oyun; insan tanık. Legg ile Hutter 2007, geniş ortamlarda hedef: yok, hesaplanamaz; insan yok. Chollet 2019, beceri edinme verimliliği: ARC bulmacaları; sıradan insanlar. Kurum beyanı 2018, ekonomik işlerin çoğu: yok; insanlar. Anket soruları, her görev ya da meslek: yok, yalnızca soru; çalışanlar. Morris ve ark. 2024, seviye tablosu: henüz kurulmadı; nitelikli yetişkin, %50, %90, %99. Hendrycks ve ark. 2025, on bilişsel alan: el ile değerlendirme; iyi eğitimli yetişkin. Chollet 2024, karşıt görev üretimi: görev üretme yordamı; sıradan insanlar. Sınavı olmayan dört hücre vurgulu. Altta: dört satırda çalıştırılabilir bir sınav yok.](assets/bir-ad-sekiz-tanim.svg "Şekil 1 — Aynı ad, başka sınav, başka insan")

Şekil 1 sekiz tanımı yan yana koyuyor ve tabloyu okumanın iki yolu var. Sütun sütun okunduğunda tanımların üç ayrı eksende ayrıştığı görülüyor: neyi kıyasladıkları, kimi ölçü aldıkları ve bir sınavlarının olup olmadığı. Sınav sütunu yukarıdan aşağı okunduğunda ise daha sert bir sonuç çıkıyor: sekiz tanımın dördünün ekinde çalıştırılabilir bir sınav yok. "AGI geldi mi" sorusu, hangi satırın kastedildiği söylenmeden sorulduğunda, bir ölçüm sorusu değil.

> **Kendini yokla:** İki araştırmacı aynı modelin AGI olup olmadığı konusunda anlaşamıyor ve ikisi de ölçüm gösteriyor. Tartışmayı ilerletmek için önce neyi sormak gerekir?

Hangi tanımı ve hangi kıyas insanını kullandıklarını. Biri ayırt edilemezliği bir insan tanıkla, öbürü beceri edinmeyi sıradan insanlarla ölçüyorsa, iki ölçüm aynı soruya verilmiş iki cevap değil, iki ayrı soruya verilmiş iki cevaptır; 116'daki öz-düzeltme tartışmasıyla aynı biçim.

## Tanım sınava dönünce: iki taraf aynı çalışmada

Tanım bir sınava çevrildiğinde bazen iki tarafın ölçümü aynı çalışmanın içinden çıkıyor.

Cameron Jones ile Benjamin Bergen'in *PNAS*'ta 2026'da yayımlanan, önceden kaydedilmiş deneyi Turing'in üç kişilik oyununu kuruyor: bir sorgucu beş dakika boyunca biri insan biri model iki tanıkla aynı anda yazışıyor ve hangisinin insan olduğuna karar veriyor. İnsan gibi davranması istenen bir kişilik talimatıyla GPT-4.5, oyunların yüzde 73'ünde insan sanıldı; aynı model kişilik talimatı olmadan yüzde 36'da, LLaMa-3.1-405B yüzde 38'de kaldı. 1960'ların kurallı sohbet programı ELIZA yüzde 23 aldı.

Aynı makale öbür tarafı da ölçüyor. Sorgucuların yalnızca yüzde 12'si Turing'in öngördüğü türden bilgi ve akıl yürütme soruları sordu; çoğu sohbet etti. Yazarların önerdiği bir okuma: Turing testi doğrudan bir zekâ sınavı değil, insana benzerliğin sınavı. Ölçüm sağlam, ama ölçülen şey tartışmalı.

Burada bir geçme kuralı sorusu da var. 1\. makalede Turing'in bir **öngörüsünü** görmüştük: 2000'e gelindiğinde ortalama bir sorgucunun beş dakikalık sorgudan sonra doğru teşhis şansının yüzde 70'i geçmeyeceği. Bu cümle bir geçme kuralı değildi, ama öyle okunursa, modelin insan sanılma oranı en az yüzde 30 olmalı. Yazarların ölçütü ise sorgucunun şanstan iyi ayırt edememesi. Kişilik talimatı olmayan iki model için iki kural, iki ayrı katılımcı grubunda aynı hükmü veriyor. Çevrim içi katılımcılarla oranlar yüzde 42,1 ve 47,1: iki kurala göre de geçiyorlar. Üniversite öğrencileriyle yüzde 27,7 ve 26,4: iki kurala göre de geçemiyorlar. Yazarların kendi hükmü, bu modellerin kişilik talimatı olmadan "sağlam biçimde geçmediği". Hükmü burada kural değil, sorgucuların kim olduğu değiştiriyor (kuralın okunuşu ve karşılaştırma bizim).

ARC'de de tartışmalı olan kıyas insanı. ARC'nin "insan tabanı" olarak dolaşan iki sayı var; ikisi de gerçek bir ölçüm, ama farklı koşullarda. Özgün gizli değerlendirme görevlerini ilk çözen iki kişi yüzde 97 ve 98 almıştı. Solim LeGris ve arkadaşlarının *Scientific Data*'da 2025'te yayımlanan çalışması ise açık değerlendirme kümesini 946 çevrim içi katılımcıya, her göreve üç deneme hakkıyla çözdürdü: ortalama doğruluk yüzde 65 civarında. Kümeler farklı olduğu için iki sayı birbirinden çıkarılamaz; ama "insan düzeyi" denince hangisinin kastedildiği, bir modelin o düzeyin üstünde mi altında mı sayılacağını belirliyor.

ARC ekibinin kendi, hakemli olmayan raporları başka iki sınırı da yazıyor. 2024 raporuna göre bir puanın ancak bir hesap bütçesiyle birlikte anlamı var: Aralık 2024'te OpenAI'ın o3 modelinin önizleme sürümü, özel testte ilk sürümün yarı gizli kümesinde görev başına tahminen 200 dolarla yüzde 76, 20.000 dolarla yüzde 88 almıştı. 2025 raporunda ise ekip, doğrudan ezberlemeye dayanıklı kurulmuş iki sürümün de açık eğitim kümesine çok benzeyen verilerle eğitilmiş modellerce bir "bilgi aşırı uyumuna" uğradığını ileri sürüyor; etkinin büyüklüğünü ölçemediklerini de yazıyorlar.

Bir sınav da kendini AGI sınavı saymadığını açıkça söylüyor. Long Phan ve geniş bir yazar grubunun *Nature*'da 2026'da yayımlanan, uzmanların yazdığı 2.500 soruluk ölçütü, sorularını veri toplandığı sırada (2024) sınırda olan modellerin çözemediklerinden seçmiş; yazarlar yüksek bir puanın tek başına özerk araştırma yeteneğini ya da AGI'yi göstermeyeceğini yazıyor.

## İnsan süresiyle ölçülen eksen: görev ufku

Tanımların çoğunun sınavı yok, ya da sınavı bir anlık fotoğraf veriyor. 40\. makalede zaman içinde izlenebilen bir ölçü kurmuştuk: bir modelin **yüzde 50 görev tamamlama ufku**, yarı yarıya başarabildiği görevlerin uzman bir insan için süresi. Thomas Kwa ve arkadaşlarının NeurIPS 2025'teki ölçümünde bu ufuk 207 günde bir ikiye katlanıyordu, yüzde 95 güven aralığı 166–240 gün; 2019'un bir modelinde 2 saniye, 2025'in bir sınır modelinde 110 dakika.

Bu eğimi ileriye uzatmak bir kehanet olur; burada yalnızca geriye bakacağız, çünkü bir eğimin ne olduğunu anlamak için geriye bakmak yeter. 110 dakika 6.600 saniye; 6.600 ÷ 2 = 3.300 kat büyüme; 2 tabanında logaritması 11,7, yani yaklaşık on iki ikiye katlanma. 11,7 × 207 ≈ 2.420 gün, yaklaşık 6,6 yıl; güven aralığının iki ucu 5,3 ile 7,7 yıl veriyor. İki model arasındaki gerçek süre — GPT-2'nin Şubat 2019'dan o3'ün Nisan 2025'ine — yaklaşık 6,2 yıl ve bu aralığın içinde (hepsi bizim hesabımız; kaynak o3'ün eğilimin biraz üstünde kaldığını da not ediyor). Yani 207 gün, on iki ikiye katlanmaya yakın bir geçmiş aralığa uydurulmuş bir eğim. 40'ta yazarların neden tek tek noktalardan çok eğime güvendiklerini de görmüştük: görev örneklemindeki hatalar modeller arasında ilişkili.

Eğim sağlam, ama ufkun **seviyesi** iki seçime bağlı. Birincisi başarı eşiği. 40'ta yüzde 80 ufkunun kabaca beş kat kısa olduğunu görmüştük; kaynak 4 ile 6 kat arası veriyor. Bu oranı 110 dakikalık bir yüzde 50 ufkuna uygularsak yüzde 80 ufku 110 ÷ 6 ≈ 18 ile 110 ÷ 4 ≈ 28 dakika arasına iner (oranı tek bir modele uygulamak bizim hesabımız). 40'ın kendi basit modeli burada bir şey öğretiyor. Her adımın bağımsız ve eşit olasılıkla başarısız olduğu bir görevde başarı olasılığı adım sayısıyla üstel düşer, ve yüzde 50 ile yüzde 80 ufuklarının oranı ln 0,5 ÷ ln 0,8 ≈ 3,1 olur (bizim hesabımız). Ölçülen oran 4–6 kat. Başarısızlıklar sabit bir adım hatası gibi davranmıyor; görevlerin zorluğu eşit dağılmıyor (bu son cümle bizim okumamız).

İkincisi kıyas insanı. Yazarların küçük bir iç deneyinde, dört işte, deponun bakımını yapan geliştiriciler aynı işleri dışarıdan gelen yüklenicilerden 5 ile 18 kat daha kısa sürede bitiriyor, ve modellerin sonuçları yüklenicilerin süresiyle örtüşüyor. Görev kümesi de gerçek işten daha derli toplu: yazarların on altı maddelik "dağınıklık" puanında kümenin ortalaması 16'da 3,2, hiçbir görev 8'i geçmiyor; iyi bir araştırma makalesi yazmak gibi bir işi 9 ile 15 arasında puanlıyorlar. Yazarların kendi uyarısı açık: ufuk her zaman bir alana, bir görev dağılımına ve kıyas alınan insanların beceri ve bağlam düzeyine göre ölçülüyor. 55\. makalede aynı ekibin, deneyimli geliştiricilerin kendi depolarında yapay zekâ araçlarıyla yüzde 19 yavaşladığını ölçen, hakemli olmayan deneyini görmüştük; ölçünün öbür tarafı, ufkun ölçüldüğü koşulların dışında.

> **Kendini yokla:** Yüzde 50 ile yüzde 80 ufukları arasındaki oran neden bağımsız adım modelinin verdiği 3,1'den büyük çıkıyor?

Bizim okumamızla: bağımsız adım modeli her görevi aynı adım hatasına sahip sayıyor. Gerçek görevlerin bir kısmı modelin kolayca çözdüğü, bir kısmı hiç çözemediği görevler; yüzde 80 başarı istemek, zorluğun bu dağılımında çok daha kısa görevlere çekilmek demek.

## Anketler neyi ölçer

Zaman çizelgesi tartışmasının kaynağı çoğu zaman uzman anketleri, ve anketler bir ölçüm yapıyor — ama tarihin değil, inancın ve inancın sorunun ifadesine duyarlılığının ölçümünü.

Grace ve arkadaşlarının *Journal of Artificial Intelligence Research*'te 2025'te yayımlanan, Ekim 2023'te altı büyük mecrada yayın yapmış 2.778 araştırmacının katıldığı anketi iki tanımı katılımcıların rastgele ayrılmış iki alt kümesine soruyor: her görev sorusunu 1.714 kişi, her meslek sorusunu 774 kişi yanıtladı. Katılımcıların inançlarını birleştiren dağılım, her görevin makinelerce daha iyi ve daha ucuz yapılabilmesine (yüksek düzey makine zekâsı) anket yılından 24 yıl sonra yüzde 50 olasılık veriyor; her mesleğin tam otomasyonuna 93 yıl sonra. Mantıken yakın iki olay arasında 69 yıl. Yazarlar bu farkı, iki soru aynı olayı kastediyorsa bir çerçeveleme etkisi olarak okuyor, ama nedenini bilmediklerini de yazıyor: sorular farklı önsözlerle sorulmuştu — yalnızca birincisinde "bilimsel etkinliğin büyük bir kesintiye uğramadığını varsay" talimatı vardı — ve meslek sorusundan önce tek tek mesleklerin otomasyonu soruluyordu.

Soru biçimi de cevabı değiştiriyor: "şu yıla kadar olasılık kaç" diye sorulan katılımcılarda bu nokta 34 yıl, "şu olasılığa hangi yılda ulaşılır" diye sorulanlarda 17 yıl sonrasına düşüyor. 2022 ile 2023 anketleri arasındaki kayma ise 13 yıl. Soru biçiminden gelen 17 yıllık fark, iki anket arasındaki 13 yıllık kaymadan büyük (farklar bizim hesabımız; iki anketin örneklemleri de farklı).

Ankete katılım oranı yüzde 15 ve yazarların kendisi, katılımcıların sordukları soruların genelinde isabetli öngörücüler olmadığına dair işaretler bulunduğunu yazıyor. Stuart Armstrong ve arkadaşlarının *Journal of Experimental & Theoretical Artificial Intelligence*'ta 2014'te yayımlanan çalışması 1950–2012 arasındaki 95 zaman çizelgesi tahminini inceliyor: 2100 sonrasını gösteren tahminler dışarıda bırakıldığında uzmanların tahminleri 26 yıllık, uzman olmayanlarınki 27 yıllık bir standart sapmayla dağılıyor ve tahminlerin üçte birinden fazlası, tahminin yapıldığı günden 15–25 yıl sonrasında toplanıyor. Anket, bir topluluğun inancının dağılımını ve o dağılımın sözcüklere nasıl tepki verdiğini güvenilir biçimde ölçüyor; bir olayın ne zaman olacağını ölçmüyor.

## Tanımların ölçmediği

Sekiz tanımın hiçbiri bir şeyi içermiyor ve bu eksik bir kategori hatasını önlüyor. 61\. makalede hizalama sorununu bir sistemin kovaladığı hedefin, ona vermek istediğimiz hedeften nerede ve neden ayrıştığı sorusu diye kurmuş ve açıkça yazmıştık: hizalama sorunu bir yetenek sorunu değildir. AGI tanımlarının hepsi yetenek tanımı; bir sistemin hangi tanıma göre "genel" sayıldığı, kimin hedefini kovaladığı hakkında hiçbir şey söylemiyor.

Tanımlar neyin "genel" sayılacağında da ayrışıyor. Hendrycks ve arkadaşları fiziksel yetenekleri tanımın dışında bırakıyor; Morris ve arkadaşları ise fiziksel görevleri AGI için ön koşul saymıyor, ama bir sistemin genelliğini artırdığını söylüyor. 111'de internetten gelen ön eğitimin eylemin anlamsal yarısını taşıdığını ama motor yarısını taşımadığını görmüştük, yani bu seçim tablodaki yeri değiştiren bir seçim. Hendrycks ve arkadaşları bir de kendi adlandırdıkları bir **yetenek çarpıtmasına** (capability contortion) işaret ediyor: uzun süreli belleğin eksikliğini devasa bağlam pencereleriyle kapatmak. 44'te uzun pencerenin getirmeyi emekliye ayırmadığını, 112'de bir modeli güncel tutmanın dört ayrı faturası olduğunu görmüştük; aynı eksik, profil tanımında sıfır puanlık bir alan olarak ortaya çıkıyor.

110'da Şekil 3'ten çıkan soru burada da geçerli. Orada "model dünya modeli kurdu mu" sorusu, "hangi derinlikte sınadın" sorusuna dönüşmüştü; burada "AGI geldi mi" sorusu, "hangi tanımın hangi sınavıyla, hangi insanla kıyaslanarak" sorusuna dönüşüyor.

## Şu an söylenebilecekler

**"AGI" bir ad, en az sekiz tanım.** Tanımlar neyi kıyasladıklarında, kimi ölçü aldıklarında ve bir sınavlarının olup olmadığında ayrışıyor; dördünün çalıştırılabilir bir sınavı yok.

**Bir tanım sınava dönünce iki taraf aynı çalışmadan çıkabiliyor.** Kişilik talimatlı bir model beş dakikalık Turing testinde yüzde 73 insan sanılıyor; aynı çalışma testin zekâdan çok insana benzerliği ölçtüğünü öne sürüyor, ve talimatsız modeller için hükmü sorgucuların kim olduğu değiştiriyor.

**"İnsan düzeyi" bir sayı değil, bir seçim.** ARC'nin insan tabanı olarak iki gerçek ölçüm dolaşıyor: iki kişilik ilk değerlendirmenin yüzde 97–98'i ve 946 kişilik kalabalığın yüzde 65'i; kümeler de insanlar da farklı.

**Görev ufkunun eğimi sağlam, seviyesi eşiğe ve kıyas insanına bağlı.** 207 gün (166–240), yaklaşık on iki ikiye katlanmalık bir geçmişe uydurulmuş; yüzde 80 eşiği ufku 4–6 kat kısaltıyor, küçük bir deneyde bakımcı ile yüklenici arasında 5–18 kat fark çıkıyor.

**Anketler tarih değil, sözcüklere duyarlılığı ölçer.** "Her görev" ile "her meslek" arasında 69 yıl, soru biçiminde 17 yıl fark; iki anket arasındaki kayma 13 yıl.

**Hizalama bir yetenek eşiği değildir.** Hiçbir AGI tanımı bir sistemin kimin hedefini kovaladığını söylemiyor.

Bu okumanın da sınırları var. Tanım listesi eksiksiz değil ve bir kısmı hakemli değil: Chollet'nin 2019 çalışması, Hendrycks ve arkadaşlarının tanımı, ARC ekibinin raporları ve kurum beyanı öyle; tanımları temsil ettikleri için kullanıldılar, kanıt oldukları için değil. Ölçüm sayıları çoğunlukla 2022–2026'ya ait ve hızla eskiyor. Ve eğimi ileriye uzatmadık: o bir ölçüm değil, bir varsayım olurdu.

### Sırada ne var

Serinin son makalesine geldik. Yeni bir ölçüm getirmeyecek. Bunun yerine seri boyunca kurulan her şeyi bir kez daha, bu kez okurun kendi kullanacağı biçimde çiziyor: bir iddiayla ya da bir sistemle karşılaştığında hangi soruları hangi sırayla soracağını.

## Kaynakça

- Turing, A. M. (1950). *Computing Machinery and Intelligence*. Mind, 59(236), s. 433–460. [Bağlantı](https://doi.org/10.1093/mind/LIX.236.433)
- Legg, S. & Hutter, M. (2007). *Universal Intelligence: A Definition of Machine Intelligence*. Minds and Machines, 17(4), s. 391–444. [Bağlantı](https://doi.org/10.1007/s11023-007-9079-x)
- Chollet, F. (2019). *On the Measure of Intelligence*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/1911.01547)
- OpenAI (2018). *OpenAI Charter*, 9 Nisan 2018. Kurum beyanı (hakemli bir yayın değildir). [Bağlantı](https://openai.com/charter/)
- Grace, K., Sandkühler, J. F., Stewart, H., Weinstein-Raun, B., Thomas, S., Stein-Perlman, Z. ve ark. (2025). *Thousands of AI Authors on the Future of AI*. Journal of Artificial Intelligence Research, 84. [Bağlantı](https://doi.org/10.1613/jair.1.19087)
- Morris, M. R., Sohl-Dickstein, J., Fiedel, N., Warkentin, T., Dafoe, A., Faust, A. ve ark. (2024). *Position: Levels of AGI for Operationalizing Progress on the Path to AGI*. Proceedings of the 41st International Conference on Machine Learning, PMLR 235, s. 36308–36321. [Bağlantı](https://proceedings.mlr.press/v235/morris24b.html)
- Hendrycks, D., Song, D., Szegedy, C., Lee, H., Gal, Y., Brynjolfsson, E. ve ark. (2025). *A Definition of AGI*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2510.18212)
- Chollet, F., Knoop, M., Kamradt, G. & Landers, B. (2026). *ARC Prize 2025: Technical Report*. Düzenleyicilerin teknik raporu (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2601.10904)
- Jones, C. R. & Bergen, B. K. (2026). *Large Language Models Pass a Standard Three-Party Turing Test*. Proceedings of the National Academy of Sciences, 123, e2524472123. [Bağlantı](https://doi.org/10.1073/pnas.2524472123)
- LeGris, S., Vong, W. K., Lake, B. M. & Gureckis, T. M. (2025). *A Comprehensive Behavioral Dataset for the Abstraction and Reasoning Corpus*. Scientific Data, 12, 1380. [Bağlantı](https://doi.org/10.1038/s41597-025-05687-1)
- Chollet, F., Knoop, M., Kamradt, G. & Landers, B. (2025). *ARC Prize 2024: Technical Report*. Düzenleyicilerin teknik raporu (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2412.04604)
- Chollet, F., Knoop, M., Kamradt, G., Landers, B. & Pinkard, H. (2025). *ARC-AGI-2: A New Challenge for Frontier AI Reasoning Systems*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2505.11831)
- Phan, L., Gatti, A., Li, N., Khoja, A. ve ark. (2026). *A Benchmark of Expert-Level Academic Questions to Assess AI Capabilities*. Nature, 649, s. 1139–1146. [Bağlantı](https://doi.org/10.1038/s41586-025-09962-4)
- Kwa, T., West, B., Becker, J., Deng, A. ve ark. (2025). *Measuring AI Ability to Complete Long Software Tasks*. Advances in Neural Information Processing Systems 38 (NeurIPS 2025). [Bağlantı](https://doi.org/10.52202/085713-3086)
- Armstrong, S., Sotala, K. & Ó hÉigeartaigh, S. S. (2014). *The Errors, Insights and Lessons of Famous AI Predictions – and What They Mean for the Future*. Journal of Experimental & Theoretical Artificial Intelligence, 26(3), s. 317–342. [Bağlantı](https://doi.org/10.1080/0952813X.2014.895105)
