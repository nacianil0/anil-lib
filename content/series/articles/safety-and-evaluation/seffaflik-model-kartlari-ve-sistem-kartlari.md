---
article_id: article_fa0b9232-7ac9-48db-b9c7-96670c5500cf
title: "Şeffaflık: Model Kartları ve Sistem Kartları"
slug: seffaflik-model-kartlari-ve-sistem-kartlari
category: safety-and-evaluation
level: intermediate
reading_order: 80
summary: "Bir puanın koşullarının nereye yazıldığını izler: model kartının bölümlerini ve ayrıştırılmış değerlendirmenin neden merkezde durduğunu — kamuya açık bir denetimden yedi ay sonra üç şirketin de yeni sürüm yayımlaması, en karanlık tenli kadın altkümesinde hatanın yüzde 17,7 ile 30,4 arasında düşmesi, denetlenmeyen iki şirketin aynı altkümede yüzde 31,37 ve 22,50'de kalması —; verinin belgesini ve belgesizliğini — popüler kümelerin lisanslarının yüzde 70'inden fazlasının belirtilmemiş olması, bir yılda C4'ün token'larının yüzde 5'inden fazlasının ve en canlı kaynaklarının yüzde 28'inden fazlasının kullanıma kapanması —; sistem kartının model kartına ne eklediğini — 123 sayfalık bir kartın güvenlik düzeyi kararı, ajan güvenliği ve hizalama değerlendirmesi bölümleri, yüzden fazla dış kırmızı takım üyesi —; pratikte ne yazılıp ne yazılmadığını — 32.111 kartta çevresel etki yüzde 2,0, değerlendirme 15,4, sınırlar 17,4 —; ve önerinin yükümlülüğe dönüşmesini: veri künyesi kavramının Avrupa Birliği yasasının teknik dokümantasyon ekinde geçmesi. Kapanışta belgenin bir iddia olduğunu ve denetimin bugünkü hâlini verir."
tags:
  - seffaflik
  - model-karti
  - sistem-karti
  - belgeleme
  - denetim
content_hash: sha256:6604b0f9f7a59edffdbd448804eb871ad6b335197f86d77084728185ddfa0633
classification_version: 1
classification_batch: 19
---
## Sayının yanındaki belge

Önceki makale bir puanın hangi dünyada ölçüldüğünü sordu ve her seferinde cevabın koşullarda durduğunu gösterdi: hangi dağılım, hangi grup, hangi bozulma kümesi, saldırgan neyi görüyor ve kaç deneme yapabiliyor. 71 aynı şeyi bir halka önce söylemişti: protokol sonucun içindedir. İkisi birlikte bir sonuç veriyor — bir puan, koşulları olmadan taşınamaz. Peki koşullar nereye yazılır?

Cevap bir belge türü: 20'de adını koyduğumuz **model kartı** (model card) ve onun sistem düzeyindeki akrabası. Orada bu belgeleri bir açıklık boyutu olarak, yani "var mı yok mu" diye görmüştük; burada içine bakıyoruz. Soru dört tane. Model kartında ne var ve neden o var? Veri tarafında hangi belge duruyor ve ne kadar dolduruluyor? Sistem kartı model kartına ne ekliyor? Ve bir belge kendi kendini doğrulamadığına göre, ona kim bakıyor?

## Model kartı: hangi sınav, kimin için, hangi grupta

Margaret Mitchell, Simone Wu, Andrew Zaldivar ve arkadaşlarının FAT* 2019'da sunduğu çalışma öneriyi kurdu: yayımlanan her eğitilmiş model, yanında kısa ve yapılandırılmış bir belgeyle gelsin. Belgenin bölümleri model ayrıntıları, **amaçlanan kullanım** (intended use) ve amaçlanmayan kullanım, ölçüm yordamı, değerlendirme verisi, eğitim verisi, nicel çözümleme, etik değerlendirmeler ve uyarılar.

Önerinin merkezinde tek bir teknik fikir var ve makalenin asıl katkısı o: **ayrıştırılmış değerlendirme** (disaggregated evaluation). Tek bir toplam puan yerine, puan ilgili gruplara — ve grupların kesişimlerine — bölünerek raporlanır. 79'daki alt topluluk kaymasını hatırla: ortalama doğruluk 92,2 iken en kötü grup doğruluğu 56,0 olabiliyordu. Model kartı bunu bir tasarım kararı hâline getiriyor: ortalamanın altında ne olduğu belgenin zorunlu bölümü.

Bu fikrin nereden geldiği önemli, çünkü kâğıt üstünde kalmadı. Ticari yüz çözümleme sistemlerinin cinsiyet ve ten tonu kesişimlerinde farklı hata oranları verdiğini gösteren denetim çalışmasının ardından, Inioluwa Deborah Raji ve Joy Buolamwini'nin AIES 2019'da sunduğu takip çalışması denetimin kendisini ölçtü. Bulgu üç katmanlı. Denetimin yayımlanmasından yedi ay içinde hedeflenen üç şirketin üçü de yeni arayüz sürümü yayımladı. Üçünde de cinsiyet ve ten tonu arasındaki fark azaldı; en büyük iyileşme en karanlık tenli kadın altkümesinde, iki ölçüm dönemi arasında hatada yüzde 17,7 ile 30,4 arası düşüş, ve genel hatada yüzde 5,72 ile 8,3 arası düşüş. Üçüncü katman kontrol grubu gibi çalışıyor: denetlenmeyen iki şirketin aynı ölçütteki genel hatası yüzde 8,66 ve 6,60, aynı altkümede 31,37 ve 22,50. Yani ayrıştırılmış ölçümü kamuya açık biçimde yayımlamak ölçülebilir bir değişiklik üretti, ve değişiklik ölçümün yöneldiği yerde oldu.

> **Kendini yokla:** Model kartı bir belge; bir belge nasıl olur da hata oranını düşürür?

Belge tek başına düşürmez; düşüren şey belgenin **hangi sayıyı görünür kıldığı**. Toplam doğruluk raporlanırken en karanlık tenli kadın altkümesindeki hata toplamın içinde eriyordu ve kimse onu bir hedef olarak görmüyordu. Ayrıştırılmış tablo o sayıyı ayrı bir satır yapınca, hem geliştirici hem dışarıdaki denetçi için üzerinde çalışılabilir bir büyüklük hâline geldi. 61'in cümlesi burada tersine çalışıyor: bir sayı hedefe dönüştüğünde iyileşiyor — buradaki fark, hedefin vekil değil, gerçekten önemsenen ölçü olması.

## Verinin belgesi

Model kartının bir eşi veri tarafında. Timnit Gebru ve arkadaşlarının önerdiği ve Communications of the ACM'de 2021'de yayımlanan **veri künyesi** (datasheet) — 20'de adını koymuştuk — elektronik bileşenlerin künyelerinden esinleniyor: her veri kümesi, kendisini üreten kararları anlatan bir belgeyle gelsin. Belge yaşam döngüsünü izleyen sorulardan oluşuyor: küme neden oluşturuldu, örnekler neyi temsil ediyor, nasıl toplandı, kim etiketledi ve nasıl ödendi, temizlikte ne atıldı, hangi kullanımlar için uygun değil, bakımı kim yapıyor.

Emily Bender ve Batya Friedman'ın Transactions of the Association for Computational Linguistics'te 2018'de yayımladığı çalışma dil verisi için daha dar ve daha keskin bir biçim öneriyor: **veri açıklaması** (data statement). Buradaki soru kimin dilinin toplandığı — konuşucuların demografisi, konuşma durumu, tür, metnin üretildiği bağlam. Gerekçe hem etik hem bilimsel: bir sistemin hangi topluluğun dilinde çalıştığı bilinmiyorsa, genelleme iddiası da tanımsız kalır. Mahima Pushkarna, Andrew Zaldivar ve Oddur Kjartansson'un FAccT 2022'de sunduğu **veri kartı** (data card) önerisi aynı işi okunabilirlik tarafından ele alıyor: belge, sorularıyla değil cevaplarıyla, sabit bir satır–sütun düzeninde ve soldan sağa artan ayrıntıyla sunuluyor.

Bir belge sonradan da yazılabilir, ve yazıldığında ne çıktığını gösteren en iyi örnek Jesse Dodge ve arkadaşlarının EMNLP 2021'de sunduğu çalışma. Ekip, yaygın kullanılan bir web derlemesini — 14'te temizlik hattını anlatırken andığımız türden, tek bir tarama anından süzgeçlerle üretilmiş bir küme — kaynağına ve içeriğine kadar inceliyor. Üç bulgu belgesizliğin ne demek olduğunu gösteriyor. Birincisi kaynak: derlemedeki en çok temsil edilen tek site bir patent arşivi, ve ilk onda ikinci bir patent sitesi daha var; kullanıcıların "internet metni" sandığı şeyin büyük bir kısmı hukuk dili. İkincisi içerik: metnin içinde makine çevirisiyle üretilmiş parçalar ve başka değerlendirme kümelerinden gelmiş sınav örnekleri bulunuyor — 72'deki kirliliğin belgeleme tarafından görünen hâli. Üçüncüsü süzgecin kendisi: kelime listesine göre eleyen filtre, belirli lehçelerdeki — örneğin Afrika kökenli Amerikalıların İngilizcesi — ve cinsel yönelim ile kimlik hakkında konuşan metinleri orantısız biçimde çıkarıyor. 14'te engel listesinin bir temizlik aracı olduğunu görmüştük; belgeleme onun aynı zamanda bir kapsam kararı olduğunu gösteriyor.

Bu öneriler ne kadar tutuyor? Shayne Longpre ve arkadaşlarının Nature Machine Intelligence'ta 2024'te yayımladığı köken denetimi 1.800'den fazla metin veri kümesini kaynağına kadar izledi ve sonuç ağır: iki büyük paylaşım platformunda popüler kümelerin lisanslarının yüzde 70'inden fazlası "belirtilmemiş", ve lisans bilgisi bulunanlarda hata oranı yüzde 50'nin üzerinde. Ekibin kendi elle izleme çalışması bu oranı yüzde 72'den 30'a indiriyor — yani sorun bilginin var olmaması değil, kaydedilmemesi. Aynı ekibin NeurIPS 2024 veri kümeleri ve ölçütler programında sunduğu ikinci çalışma verinin öbür ucunu ölçüyor: 14.000 alan adının izin protokolleri bir yıl boyunca izlendiğinde, yaygın bir ön eğitim derlemesindeki token'ların yüzde 5'inden fazlası ve en canlı biçimde bakılan kaynaklarının yüzde 28'inden fazlası tümüyle kullanıma kapanmış; kullanım koşulları metinleri hesaba katıldığında oran yüzde 45'e çıkıyor. 8 ve 14'te derlemenin nasıl toplandığını görmüştük; burada aynı derlemenin altındaki zeminin kaydırıldığını görüyoruz, ve bu kayma yalnızca belgelendiği ölçüde bilinebiliyor.

## Sistem kartı: modelden sisteme

Model kartı bir modeli anlatır. Ama kullanıcının karşılaştığı şey bir model değil, bir sistem: modelin çevresindeki süzgeçler, sistem istemi, araçlar, kullanım politikası ve dağıtım kararı. **Sistem kartı** (system card) bu katmanı belgeliyor ve son yıllarda sağlayıcıların yayımladığı biçim bu. Bu belgeler hakemli değil; burada işaretlenerek kullanılıyorlar.

İki örneği yan yana koymak biçimi görünür kılıyor. Bir sağlayıcının 2024'te yayımladığı otuz üç sayfalık kart şu sırayı izliyor: modelin verisi ve eğitimi, risklerin belirlenmesi ve azaltılması, dış kırmızı takım, kendi hazırlık çerçevesine göre değerlendirmeler, üçüncü taraf değerlendirmeleri, toplumsal etkiler. Kırmızı takım bölümünün sayıları 63'teki işin kurumsal hâli: yüzden fazla dış kırmızı takım üyesi, kırk beş dil, yirmi dokuz ülke, dört aşamalı bir düzen — ilk aşamada on kişi, ikincisinde otuz. Başka bir sağlayıcının 2025'te yayımladığı yüz yirmi üç sayfalık kart daha geniş: eğitim verisi ve süreci, uzun düşünme kipi, veri işçileri, karbon ayak izi, kullanım politikası, yayımlama kararı süreci ve güvenlik düzeyi belirlemesi — 70'te gördüğümüz eşik–önlem çifti —, koruma sonuçları, ajan güvenliği (istem enjeksiyonu ve bilgisayar kullanımı; 58 ve 54'ün konusu), hizalama değerlendirmesi (sistematik aldatma, gizli hedefler, kendini koruma; 67'nin konusu) ve güvenlik düzeyi başına uzman kırmızı takım. Şekil 1 iki belgeyi bölüm bölüm karşılaştırıyor.

![Üç sütunlu karşılaştırma tablosu; sütunlar bölüm, model kartında ne var, sistem kartında ne var. Kimlik ve amaç satırı: model kartında model ayrıntıları, amaçlanan ve amaçlanmayan kullanım; sistem kartında kullanım politikası ve dağıtım kararı. Veri satırı: model kartında eğitim ve değerlendirme verisi bölümü; sistem kartında veri kategorileri ve veri ortaklıkları, ama küme listesi ya da köken yok. Performans satırı: model kartında ayrıştırılmış değerlendirme, gruplar ve kesişimler; sistem kartında güvenlik değerlendirmeleri, ret ve aşırı ret oranları, jailbreak dayanıklılığı. Risk satırı: model kartında etik değerlendirmeler ve uyarılar; sistem kartında kırmızı takım sonuçları, ajan güvenliği, hizalama değerlendirmesi ve güvenlik düzeyi belirlemesi. Denetim satırı: model kartında yok; sistem kartında üçüncü taraf değerlendirmeleri, ama erişim koşulları yazılı değil. Altta iki kayıt: model kartı bir modeli, sistem kartı bir dağıtımı belgeler; ve iki belge de geliştiricinin kendi beyanıdır.](assets/model-karti-sistem-karti.svg "Şekil 1 — Model kartı ile sistem kartı: aynı bölümler, farklı katman")

Farkın en görünür olduğu yer veri bölümü. Sistem kartının veri bölümü kategori sayıyor — kamuya açık veri, veri ortaklıklarıyla alınan telifli içerik, web, kod ve matematik, çoklu ortam — ama hangi küme, ne kadar, hangi lisansla sorusuna cevap vermiyor. Model kartının önerisi bu soruyu soruyor; sistem kartının pratiği sormuyor.

## Ne yazılıyor, ne yazılmıyor

Öneri ile pratik arasındaki mesafe ölçüldü. Weixin Liang, Nazneen Rajani ve arkadaşlarının Nature Machine Intelligence'ta 2024'te yayımladığı çalışma büyük bir model paylaşım platformundaki 32.111 model kartını çözümlüyor — platformdaki 74.970 model deposunun yüzde 44,2'si. Bulgu bölüm bazında: en çok doldurulan bölüm eğitim; en az doldurulanlar ise çevresel etki yüzde 2,0 (32.111 kartın 639'u), atıf yüzde 14,4, değerlendirme yüzde 15,4, sınırlar yüzde 17,4. Yani belgenin en kolay kısmı — modelin nasıl eğitildiği — yazılıyor, en zor ve en gerekli kısmı — neyi ölçtük, nerede çalışmıyor, ne kadara mal oldu — yazılmıyor.

Avinash Bhat ve arkadaşlarının CHI 2023'te sunduğu çalışma aynı boşluğu iki taraftan ele alıyor: önce kamuya açık model kartlarını çözümleyip öneri ile pratik arasındaki farkı gösteriyorlar, sonra geliştirme ortamının içinde çalışan bir araçla bu farkı kapatmayı deniyorlar — kart bölümlerini geliştirme anında hatırlatan ve belgeyi kodun izine bağlayan bir düzen. Laboratuvar çalışmasının bulgusu araçtan çok pratikle ilgili: belgeleme, geliştirmeden sonra yapılan bir iş olarak bırakıldığında en son ve en eksik yazılan şey oluyor. Şekil 2 iki ölçümü birleştiriyor.

![İki bölmeli şekil. Üstte model kartı bölümlerinin doldurulma oranları yatay çubuklarla: eğitim yüzde 74,3, sınırlar yüzde 17,4, değerlendirme yüzde 15,4, atıf yüzde 14,4, çevresel etki yüzde 2,0; altında kayıt, kart incelenen depoların yüzde 44,2'sinde var ve toplam 32.111 kart incelendi. Altta ikinci bölme, dışarıdan okuyanın sorduğu üç soru ve karşılık geldikleri bölümler: nerede çalışmıyor sorusu sınırlar bölümüne ve yüzde 17,4'e; hangi koşulda ölçüldü sorusu değerlendirme bölümüne ve yüzde 15,4'e; kaça mal oldu sorusu çevresel etki bölümüne ve yüzde 2,0'a. En altta kayıt: en kolay yazılan bölüm en çok, en gerekli üç bölüm en az dolduruluyor.](assets/ne-yaziliyor-ne-yazilmiyor.svg "Şekil 2 — Doldurulan bölümler ile gereken bölümler ters sırada")

Bir üst katmanda aynı olguyu 69'da görmüştük: yüz göstergeli şeffaflık endeksinin ilk turunda ortalama puan 37, altı ay sonra 58 idi, ve en az bir geliştirici göstergelerin 96'sında puan alıyordu. O ölçüm "yapılabilir mi" sorusunu kapattı; buradaki iki ölçüm "yapılıyor mu" sorusunu açık bırakıyor.

## Öneriden yükümlülüğe

Bu belgelerin hikâyesinin son bölümü hukuk tarafında ve seride bir yerde duruyor: 69'da Avrupa Birliği'nin genel amaçlı model rejimini, hesap eşiğini ve dört temel yükümlülüğü görmüştük. Buraya ait olan kısım o yükümlülüklerden birinin **içeriği**.

Yasanın teknik dokümantasyon eki, yüksek riskli bir sistem için belgenin neyi taşıması gerektiğini madde madde sayıyor ve liste akademik önerilerle şaşırtıcı biçimde örtüşüyor: sistemin genel tanımı; tasarım belirtimleri — genel mantık, algoritmalar, kilit tasarım kararları ve gerekçeleri, sistemin neyi eniyilemek üzere tasarlandığı, beklenen çıktı kalitesi, yapılan takaslar —; ve verinin tarafında, eğitim yöntemlerini ve eğitim kümelerini anlatan **künyeler**: kümelerin genel tanımı, kökeni, kapsamı ve temel özellikleri, verinin nasıl elde edilip seçildiği, etiketleme yordamları, temizleme yöntemleri. 2018'de bir akademik öneri olarak yazılan sözcük, altı yıl sonra bir yasanın ekinde bir zorunluluk olarak duruyor. Şekil 3 zinciri veriyor.

![Sekiz satırlı zaman çizgisi; sütunlar yıl, belge, belgenin statüsü. 2018: veri açıklaması ve veri künyesi önerileri, akademik öneri. 2019: model kartı, tedarikçi beyanı ve denetimin etkisinin ölçülmesi, raporlama biçimi. 2020: iç algoritmik denetim çerçevesi, denetimin girdisi. 2021: bir web derleminin sonradan belgelenmesi, eksikliğin ölçülmesi. 2022: veri kartı ve sağlayıcıların sistem kartları, ürün belgesi. 2023: şeffaflık endeksinin ilk turu, ölçülen bir şey. 2024: yasanın teknik dokümantasyon eki ve 32 bin kartın çözümlemesi, yasal yükümlülük. 2025: yüz sayfayı aşan sistem kartları, güvenlik düzeyi kararı. Altta kayıt: zincir boyunca belgenin biçimi korundu, onu doğrulayan düzenek hâlâ eksik.](assets/belgeleme-zaman-cizgisi.svg "Şekil 3 — Belgenin öneriden yükümlülüğe giden yolu")

## Belgeye kim bakıyor

Bütün bu belgelerin ortak özelliği, geliştiricinin kendi beyanı olmaları. Bir beyanın değeri onu sınayacak bir düzenek varsa doğar; ve alanın bu tarafı belgelerin kendisinden geride.

Raji ve arkadaşlarının FAT* 2020'de sunduğu çalışma bir iç denetim çerçevesi öneriyor: modelin yayımlanmasından önce, geliştirme sürecinin içinde, tanımlı aşamalarla — kapsam belirleme, eşleme, veri toplama, sınama ve düşünüm — yürüyen bir denetim. Fikir havacılık ve finans denetimlerinden alınmış: denetim, ürün bittikten sonra yapılan bir sınav değil, süreç boyunca kayıt tutan bir yordam.

Denetimin neye bakacağı da ayrı bir soru. Jakob Mökander ve arkadaşlarının AI and Ethics'te 2023'te yayımladığı çalışma denetimi üç katmana ayırıyor ve ayrım pratikte işe yarıyor: **yönetişim denetimi** geliştirici kurumun kendi süreçlerine, hesap verme yapısına ve risk yönetimine bakar; **model denetimi** yayımlanmadan önce modelin kendi yeteneklerini ve sınırlarını ölçer; **uygulama denetimi** modelin belirli bir ürüne gömülmüş hâlini, o bağlamdaki etkisiyle birlikte inceler. Katmanların ayrılması bir belgenin neyi söyleyip neyi söylemediğini de netleştiriyor: sistem kartı ağırlıklı olarak model denetimi katmanının çıktısıdır; yönetişim katmanı için kurumun iç süreç kayıtları, uygulama katmanı için dağıtımı yapanın kendi ölçümleri gerekir. 70'in koşullu taahhütleri birinci katmana, 79'un sağlamlık ölçümleri ikinci katmana, 59'un insan–ajan devir ölçüleri üçüncüsüne düşer.

Dışarıdan denetim tarafında iki ölçüm alanın hâlini veriyor. Victor Ojewale ve arkadaşlarının CHI 2025'te sunduğu çalışma 35 denetim uygulayıcısıyla görüşüp 435 aracı tarıyor ve boşluğu adlandırıyor: araçların çoğu standart koymaya ve değerlendirmeye yarıyor, zararın keşfine ve hesap verebilirliğe değil. Abeba Birhane ve arkadaşlarının IEEE'nin güvenli ve güvenilir makine öğrenmesi konferansı SaTML'de 2024'te sunduğu çalışma denetim pratiklerini yapan kuruma göre sınıflandırıyor — düzenleyici, hukuk bürosu, sivil toplum, gazetecilik, akademi, danışmanlık — ve sonucu açık: denetimlerin yalnızca bir kısmı gerçek bir hesap verme sonucuna dönüşüyor. Ve 69'da gördüğümüz sınır burada da geçerli: kara kutu erişimiyle yapılan bir denetim, modelin ne yaptığını değil yalnızca ne cevapladığını görebiliyor.

> **Kendini yokla:** Sistem kartı üçüncü taraf değerlendirmeleri içeriyorsa, bu denetim sorununu çözmez mi?

Çözmez, çünkü üçüncü tarafın neyi gördüğü belgede yazmıyor. Bir dış ekip ağırlıklara mı, kayıtlara mı, yoksa yalnızca arayüze mi erişti; kaç saat, hangi sürüm, hangi güvenlik önlemleri açıkken çalıştı; bulgularının hangileri yayımlandı — bunlar sonucun içindedir ve 79'un cümlesiyle aynı sebeple: değerlendirmeyi yapanın bütçesi ve erişimi söylenmeden sonuç okunamaz. Üçüncü taraf değerlendirmesi bir denetim değil, denetimin bir bileşenidir; kalan bileşen erişimin koşullarını yazan bir düzenlemedir.

## Şeffaflığın disiplini

**Belge bir puanın taşıyıcısıdır.** Koşulları yazılmamış bir puan, taşındığı her yerde yanlış okunur; model kartının varlık nedeni koşulları puana bağlı tutmaktır.

**Ayrıştırılmış değerlendirme belgenin çekirdeğidir.** Ortalama, en kötü grubu gizler; belgenin işi o grubu ayrı bir satır yapmaktır ve bunun ölçülmüş bir etkisi vardır.

**Veri belgesi model belgesinden daha çok ihmal ediliyor.** Popüler kümelerin lisanslarının yüzde 70'inden fazlası belirtilmemiş, kayıtlı olanların yarısından fazlası hatalı; ve elle izleme oranı yüzde 72'den 30'a indirebiliyor — eksik olan bilgi değil, kayıt.

**Sistem kartı model kartının yerine geçmez.** Dağıtım katmanını, güvenlik değerlendirmelerini ve yayımlama kararını belgeler; eğitim verisinin kökenini ve değerlendirme protokolünün ayrıntısını belgelemez.

**Pratik, en gerekli bölümü en az dolduruyor.** 32.111 kartta çevresel etki yüzde 2,0, değerlendirme 15,4, sınırlar 17,4; en çok doldurulan bölüm eğitim.

**Belgeleme sonradan yapılınca yapılmıyor.** Ölçülen boşluğun açıklaması araç eksikliği değil, işin sıraya en sonda konması.

**Belge bir beyandır, kanıt değil.** Beyanın değeri onu sınayan düzenekle doğar; bugünkü denetim ekosisteminin araçları değerlendirmeye yoğunlaşmış, hesap verebilirliğe değil, ve denetimlerin yalnızca bir kısmı sonuç üretiyor.

### Sırada ne var

Buraya kadarki fazın tamamı — ölçmek, içine bakmak, kırılganlığı sınamak, belgelemek — tek bir modaliteyle çalışan modeller üzerineydi: metin girer, metin çıkar. Oysa 54'te bir ajanın ekrana bakmasını konuşurken bir borç bırakmıştık: pikselleri okuyan modellerin mekanizmasını ilerideki bir fazın konusu diye işaretlemiştik. Serinin bir sonraki fazı o borcu ödüyor ve bir sonraki makale ilk adımı atıyor: bir görüntü nasıl token'a çevrilir, metinle görüntü hangi noktada aynı diziye girer, ve bunu yapan modeller neyi görüp neyi göremiyor?

## Kaynakça

- Mitchell, M., Wu, S., Zaldivar, A., Barnes, P., Vasserman, L., Hutchinson, B., Spitzer, E., Raji, I. D. & Gebru, T. (2019). *Model Cards for Model Reporting*. ACM FAT* 2019. [Bağlantı](https://doi.org/10.1145/3287560.3287596)
- Raji, I. D. & Buolamwini, J. (2019). *Actionable Auditing: Investigating the Impact of Publicly Naming Biased Performance Results of Commercial AI Products*. AAAI/ACM AIES 2019. [Bağlantı](https://doi.org/10.1145/3306618.3314244)
- Gebru, T., Morgenstern, J., Vecchione, B., Wortman Vaughan, J., Wallach, H., Daumé III, H. & Crawford, K. (2021). *Datasheets for Datasets*. Communications of the ACM 64(12). [Bağlantı](https://doi.org/10.1145/3458723)
- Bender, E. M. & Friedman, B. (2018). *Data Statements for Natural Language Processing: Toward Mitigating System Bias and Enabling Better Science*. Transactions of the Association for Computational Linguistics 6. [Bağlantı](https://doi.org/10.1162/tacl_a_00041)
- Pushkarna, M., Zaldivar, A. & Kjartansson, O. (2022). *Data Cards: Purposeful and Transparent Dataset Documentation for Responsible AI*. ACM FAccT 2022. [Bağlantı](https://doi.org/10.1145/3531146.3533231)
- Dodge, J., Sap, M., Marasović, A., Agnew, W., Ilharco, G., Groeneveld, D., Mitchell, M. & Gardner, M. (2021). *Documenting Large Webtext Corpora: A Case Study on the Colossal Clean Crawled Corpus*. EMNLP 2021. [Bağlantı](https://doi.org/10.18653/v1/2021.emnlp-main.98)
- Longpre, S., Mahari, R., Chen, A., Obeng-Marnu, N., Sileo, D., Brannon, W., Muennighoff, N., Khazam, N., Kabbara, J., Perisetla, K., Wu, X., Shippole, E., Bollacker, K., Wu, T., Villa, L., Pentland, S. & Hooker, S. (2024). *A large-scale audit of dataset licensing and attribution in AI*. Nature Machine Intelligence. [Bağlantı](https://doi.org/10.1038/s42256-024-00878-8)
- Longpre, S., Mahari, R., Lee, A., Lund, C., Oderinwale, H., Brannon, W., Saxena, N., Obeng-Marnu, N., South, T., Hunter, C., Klyman, K., Klamm, C., Schoelkopf, H., Singh, N., Cherep, M. ve ark. (2024). *Consent in Crisis: The Rapid Decline of the AI Data Commons*. NeurIPS 2024 Datasets and Benchmarks. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/c3738949a80306cc48a8ea8ba0560f9d-Abstract-Datasets_and_Benchmarks_Track.html)
- OpenAI (2024). *GPT-4o System Card*. Sağlayıcı yayını; hakemli değildir. [Bağlantı](https://arxiv.org/abs/2410.21276)
- Anthropic (2025). *Claude 4 System Card*. Sağlayıcı yayını; hakemli değildir. [Bağlantı](https://www-cdn.anthropic.com/6be99a52cb68eb70eb9572b4cafad13df32ed995.pdf)
- Liang, W., Rajani, N., Yang, X., Ozoani, E., Wu, E., Chen, Y., Smith, D. S. & Zou, J. (2024). *Systematic analysis of 32,111 AI model cards characterizes documentation practice in AI*. Nature Machine Intelligence. [Bağlantı](https://doi.org/10.1038/s42256-024-00857-z)
- Bhat, A., Coursey, A., Hu, G., Li, S., Nahar, N., Zhou, S., Kästner, C. & Guo, J. L. C. (2023). *Aspirations and Practice of ML Model Documentation: Moving the Needle with Nudging and Traceability*. ACM CHI 2023. [Bağlantı](https://doi.org/10.1145/3544548.3581518)
- Avrupa Parlamentosu ve Konseyi (2024). *Regulation (EU) 2024/1689 — Yapay Zekâ Yasası, Ek IV: Madde 11(1)'de anılan teknik dokümantasyon*. Avrupa Birliği Resmî Gazetesi. [Bağlantı](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
- Raji, I. D., Smart, A., White, R. N., Mitchell, M., Gebru, T., Hutchinson, B., Smith-Loud, J., Theron, D. & Barnes, P. (2020). *Closing the AI Accountability Gap: Defining an End-to-End Framework for Internal Algorithmic Auditing*. ACM FAT* 2020. [Bağlantı](https://doi.org/10.1145/3351095.3372873)
- Mökander, J., Schuett, J., Kirk, H. R. & Floridi, L. (2023). *Auditing large language models: a three-layered approach*. AI and Ethics. [Bağlantı](https://doi.org/10.1007/s43681-023-00289-2)
- Ojewale, V., Steed, R., Vecchione, B., Birhane, A. & Raji, I. D. (2025). *Towards AI Accountability Infrastructure: Gaps and Opportunities in AI Audit Tooling*. ACM CHI 2025. [Bağlantı](https://doi.org/10.1145/3706598.3713301)
- Birhane, A., Steed, R., Ojewale, V., Vecchione, B. & Raji, I. D. (2024). *AI auditing: The Broken Bus on the Road to AI Accountability*. IEEE SaTML 2024. [Bağlantı](https://doi.org/10.1109/SaTML59370.2024.00037)
