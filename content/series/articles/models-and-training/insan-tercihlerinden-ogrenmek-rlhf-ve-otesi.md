---
article_id: article_d74128a8-4e91-4f16-82e2-7e020cf37daf
title: "İnsan Tercihlerinden Öğrenmek: RLHF ve Ötesi"
slug: insan-tercihlerinden-ogrenmek-rlhf-ve-otesi
category: models-and-training
level: intermediate
reading_order: 13
summary: "Cevap anahtarı olmayan görevlerde insanın 'bu daha iyi' yargısının nasıl eğitim sinyaline çevrildiğini kurar: tercih çifti, ödül modelinin elle hesaplanmış kaybı, referans modele bağlanan tasma, aşırı optimizasyon ve DPO'nun kısayolu."
tags:
  - rlhf
  - odul-modeli
  - tercih-optimizasyonu
  - dpo
  - asiri-optimizasyon
content_hash: sha256:b023bfcca42499f680a62f88180f2fb88d1402765bb211fdf9e01f9dc792c804
classification_version: 1
classification_batch: 2
---
## Cevap anahtarı olmayan sorular

12\. makale denetimli ince ayarın tavanını çizerek bitti. SFT'nin sinyali tek yönlüdür: "şu bağlamda şu token gelmeliydi." Bu sinyalle iyi bir cevabı gösterebilirsin ama kötü bir cevabın neden kötü olduğunu söyleyemezsin.

Oysa 11\. makaledeki kullanım dağılımı, isteklerin neredeyse yarısının serbest metin üretimi olduğunu söylüyordu. "Kariyerime yeniden heves duymak için beş fikir say" isteğinin cevap anahtarı yoktur. Ama iki cevabı yan yana koyup birini seçmek kolaydır — hem hızlıdır hem de üzerinde daha kolay anlaşılır. Bu makalenin sorusu tam olarak şu: insanın "bu daha iyi" yargısı, gradyan inişinin anlayacağı bir sayıya nasıl çevrilir?

Fikrin dil modellerinden eski olduğunu bilmek yardımcı oluyor. Paul Christiano ve arkadaşlarının NIPS 2017'de yayımlanan çalışması, simülasyondaki bir robota takla atmayı öğretti — ama "takla" için bir ödül fonksiyonu yazmadan. İnsana yalnızca kısa video çiftleri gösterildi ve her seferinde "hangisi daha çok taklaya benziyor?" diye soruldu. Davranış, bir saatten kısa sürede toplanan 900 sorguyla öğrenildi ve ajanın çevreyle etkileşimlerinin yüzde birinden azı için insan geri bildirimi gerekti. Kimse taklanın tanımını yazmadı; insanlar yalnızca tanıdıklarını işaret etti.

## İki cevaptan tek bir sayıya

Mekanizma iki parçalı. Önce insan yargısını taklit eden bir model kurulur, sonra asıl model o modele göre ayarlanır.

Birinci parça 11\. makalede adını koyduğumuz ödül modelidir. Girdisi bir istem ve bir cevap, çıktısı tek bir sayı: bu cevap ne kadar iyi. Eğitim verisi, aynı isteme verilmiş cevapların insan tarafından sıralanmasından gelir.

Veri toplamanın ekonomisi burada öğretici. InstructGPT çalışmasında etiketleyicilere aynı istem için 4 ile 9 arasında cevap gösterilip sıralamaları istendi. Tek bir sıralama, cevapların ikili kombinasyonları kadar karşılaştırma üretir: dokuz cevap için 9 × 8 ÷ 2 = 36 çift, dört cevap için 4 × 3 ÷ 2 = 6 çift. Yani bir etiketleyicinin tek bir oturumda yaptığı iş, onlarca eğitim örneğine dönüşür. 33.207 istemin bu kadar veri vermesinin sebebi budur.

![Solda tek bir istem kutusu; ondan çıkan dört ok modelin ürettiği dört ayrı cevaba gider. Etiketleyici bu dördünü sıralar ve sıralamadan altı ikili karşılaştırma çıkar; sağdaki ödül modeli kutusu her cevaba tek bir sayı verir ve yeğlenen cevabın sayısı daha büyüktür.](assets/tercihten-odule.svg "Şekil 1 — Bir istem, dört cevap, altı karşılaştırma")

Şekil 1'de dikkat edilecek şey, insanın hiçbir yerde cevap yazmıyor olması. 12\. makalede insan cevabı baştan yazıyordu; burada yalnızca modelin ürettikleri arasında sıralama yapıyor. Bu, 11\. makaledeki maliyet merdiveninin son basamağı.

Bir ayrıntı kolayca gözden kaçıyor ve mekanizmanın tamamı ona dayanıyor: bu dört cevap nereden geliyor? Aynı modelden, aynı istemle. Peki aynı model aynı isteme nasıl dört farklı cevap veriyor? 10\. makalenin cevabı buydu — üretim bir çekiliştir. Model her adımda bir dağılım üretir ve o dağılımdan örnekleme yapılır; aynı istem dört kez çalıştırıldığında dört ayrı çekiliş yapılır. Sıcaklık sıfıra çekilseydi ve açgözlü seçim kullanılsaydı, dört cevap birbirinin aynısı olurdu ve sıralanacak hiçbir şey kalmazdı. Yani tercih verisinin varlık koşulu, örneklemenin çeşitlilik üretmesidir; 10\. makaledeki kesme ve sıcaklık ayarları burada veri toplama aracına dönüşüyor.

Peki sıralama nasıl bir sayıya dönüşüyor? Kullanılan araç Ralph Bradley ve Milton Terry'nin 1952'de eşleştirmeli karşılaştırmalar için önerdiği modeldir. Sezgisi tek cümle: iki cevabın ödül puanı arasındaki fark ne kadar büyükse, insanın büyük puanlıyı seçme olasılığı o kadar yüksektir.

Sembole geçelim. İki cevabın ödülü arasındaki farka *d* diyelim. İnsanın yüksek puanlıyı seçme olasılığı, 3\. makalede tanıştığımız sigmoid eğrisiyle hesaplanır — herhangi bir sayıyı 0 ile 1 arasına yumuşakça sıkıştıran S biçimli eğri. Olasılık 1 bölü (1 artı *e* üzeri eksi *d*) olur. Kayıp ise 2\. makaledeki mantığın aynısıdır: doğru cevaba verilen olasılığın logaritmasının eksisi.

Sayı koyalım. Ödül modeli yeğlenen cevaba 1,2, yeğlenmeyene 0,4 verirse *d* = 0,8'dir. *e* üzeri eksi 0,8 = 0,449, dolayısıyla olasılık 1 ÷ 1,449 = 0,690. Kayıp da bu sayının doğal logaritmasının eksisi: 0,371.

| Ödül farkı *d* | Tahmin edilen tercih olasılığı | Kayıp |
|---|---|---|
| −0,8 | 0,310 | 1,171 |
| 0 | 0,500 | 0,693 |
| 0,8 | 0,690 | 0,371 |
| 3,0 | 0,953 | 0,049 |

Tablonun okunacak yeri üst satır: model sıralamayı ters kurduğunda kayıp 1,171'e çıkıyor, doğru kurduğunda 0,371'e iniyor. Ortadaki satır da öğretici — model iki cevaba aynı puanı verdiğinde, yani hiçbir şey söylemediğinde, kayıp 0,693'tür. Gradyan inişi bu sayıyı düşürmek için ödül modelinin parametrelerini oynatır ve model yavaş yavaş insanın hangisini seçeceğini tahmin etmeyi öğrenir.

Bir kayıt: ödül modelinin verdiği mutlak sayının kendi başına anlamı yoktur. Yalnızca farklar anlamlıdır — bütün puanlara 5 eklesen olasılıklar değişmez. Bu yüzden ödül modeli "bu cevap 1,2 puanlık bir cevaptır" demez; "bu cevap şundan iyidir" der.

> **Kendini yokla:** Ödül modeli neden ayrı bir model olarak eğitiliyor? İnsan sıralamaları doğrudan asıl modele verilemez mi?

Verilemez, çünkü sıralamalar sonludur ve eğitim sırasında model sürekli **yeni** cevaplar üretir. İnsan her yeni cevabı anında puanlayamaz. Ödül modelinin işi tam da budur: insanın yargısını, daha önce hiç görülmemiş cevaplara da uygulanabilen bir işleve çevirmek. Yani insan yargısı için bir vekil kuruyoruz.

### İleri okuma notu: ödül modeli neden asıl modelden küçük olabiliyor

InstructGPT'de bütün boyutlardaki politikalar için tek bir 6 milyar parametreli ödül modeli kullanıldı; 175 milyar parametreli ödül modelleri daha düşük doğrulama kaybına ulaşabiliyordu ama eğitimleri kararsızdı ve hesap maliyetini büyük ölçüde artırıyorlardı. Sezgisi şu: ödül modelinin işi metin üretmek değil, iki metni karşılaştırmak. Karşılaştırmak üretmekten kolay bir iştir. Aynı asimetri seride ileride yine karşımıza çıkacak — bir çıktıyı doğrulamak, onu üretmekten ucuzdur.

## Ödül, tersine çevrilmiş kayıptır

İkinci parçada asıl model devreye giriyor. Adı bu bağlamda politika (policy): bir bağlam verildiğinde ne üreteceğine karar veren şey. Döngü şöyle işler — politika bir isteme cevap üretir, ödül modeli o cevaba puan verir, güncelleme adımı parametreleri yüksek puanlı cevapların olasılığını artıracak yönde oynatır.

2\. makaledeki döngüyle karşılaştır: orada kayıp vardı ve onu **azaltıyorduk**; burada ödül var ve onu **artırıyoruz**. İşaret dışında yapı aynıdır; ödül, tersine çevrilmiş bir kayıptır. Farklı olan şey, doğru cevabın önceden bilinmemesidir — model kendi ürettiği cevaplar üzerinden öğrenir. Bu ayrımın kendi biçimsel çerçevesi vardır ve seride ilerideki bir makalede kurulacaktır; burada mekanizmayı çalıştırmak için gereken tek şey, ödülün yönünü bilmektir.

Şimdi bu döngünün en kritik parçası geliyor ve olmasa her şey çöker.

Ödül modeli bir vekildir, gerçeğin kendisi değil. Politika, ödül modelinin zayıf noktalarını bulup sömürebilir: onun yüksek puan verdiği ama insanın berbat bulacağı metinler üretmeye başlayabilir. Bunu engellemek için politikanın başlangıç noktasından — yani SFT modelinden — fazla uzaklaşması cezalandırılır. Ölçü, iki olasılık dağılımının birbirinden ne kadar ayrıştığını veren bir sayıdır ve adı KL ıraksamasıdır (Kullback–Leibler divergence); biçimsel kurulumu seride ileride yapılacak, burada işlevi yeterli: SFT modelinin o token'a verdiği olasılıkla politikanın verdiği olasılık ayrıştıkça büyüyen bir ceza.

InstructGPT'de bu ceza her token'da ayrı ayrı uygulanır. Nisan Stiennon ve arkadaşlarının NeurIPS 2020'de yayımlanan özetleme çalışması, aynı terimin iki işi birden gördüğünü yazar: politikanın tek bir kalıba çökmesini engelleyen bir keşif teşviki olur, ve politikanın ödül modelinin eğitim sırasında hiç görmediği türden çıktılara kaymasını önler.

![Kapalı bir döngü: politika kutusundan çıkan ok üretilen cevaba, oradan ödül modeline, oradan güncelleme adımına ve geri politikaya gider. Politikanın yanında sabit duran referans model kutusu vardır; ikisi arasındaki kesikli bağ KL cezası diye etiketlenmiştir. Ayrı bir kısayol oku tercih çiftinden doğrudan politikaya gider ve ödül modeli kutusunu atlar.](assets/odul-dongusu-ve-kisayol.svg "Şekil 2 — Ödül döngüsü ve onu kısaltan yol")

Şekil 2'deki kesikli bağ tasmadır: politika serbestçe dolaşabilir ama referans modelden uzaklaştıkça direnç artar. Şekildeki kısayol oku ise birazdan geleceğimiz yol.

## Goodhart yasası devrede

Tasma neden gerekli? Çünkü vekil ölçüyü fazla kovalamak, ölçtüğü şeyi bozar. Bu bozulmanın adı aşırı optimizasyondur.

Stiennon ve arkadaşları bunu doğrudan gösterdi: optimizasyonu ilerlettikçe ödül modelinin verdiği puan yükselmeye devam ederken gerçek insan tercihi bir noktadan sonra düşüyor, ve yeterince ileri gidildiğinde ödül modeli insan tercihiyle **ters** ilişkili hâle geliyor. Yani en yüksek puanlı çıktı, en kötü çıktı oluyor.

Leo Gao, John Schulman ve Jacob Hilton'ın ICML 2023'te yayımladığı çalışma bu olguyu doğrudan konu edindi ve adını koydu: bir vekil ölçü hedefe dönüştüğünde iyi bir ölçü olmaktan çıkar — Goodhart yasası. Deney düzeni öğretici: sabit bir "gerçek" ödül modeli hakem yerine konur, onun ürettiği tercihlerle bir vekil ödül modeli eğitilir, sonra vekil kovalanırken gerçek puanın ne yaptığına bakılır. Bulgular iki tanedir. Birincisi, bozulmanın matematiksel biçimi optimizasyon yöntemine göre değişiyor. İkincisi, bu biçimin katsayıları ödül modelinin parametre sayısıyla düzgün biçimde ölçekleniyor — yani daha büyük ödül modeli daha geç bozuluyor, ama bozulmuyor değil.

![Yatay eksen referans modelden uzaklaşma miktarını gösterir. Ödül modelinin verdiği puan eğrisi baştan sona yükselir; gerçek insan tercihi eğrisi önce onunla birlikte yükselir, bir tepe yapar ve sonra düşmeye başlar. Tepe noktası dikey kesikli bir çizgiyle işaretlenmiştir.](assets/asiri-optimizasyon.svg "Şekil 3 — Vekil yükselirken gerçek düşüyor")

Şekil 3, tasmanın sıkılığının neden ayarlanması gereken bir hiperparametre olduğunu gösteriyor: çok gevşek bırakırsan tepeyi geçersin, çok sıkarsan tepeye hiç ulaşamazsın. Yuntao Bai ve arkadaşlarının Anthropic'te yürüttüğü hakem sürecinden geçmemiş çalışma bu ilişkinin şaşırtıcı derecede düzenli olduğunu bildiriyor: eğitimin büyük bölümünde ödül, referanstan uzaklığın **karekökü** ile yaklaşık doğrusal ilişkili. Yani her ek kazanç, giderek artan bir uzaklaşma bedeliyle geliyor.

Buradan çıkan şey 9\. makaledeki uyarının bir başka yüzü. Orada aynı eğriyi iki farklı cetvelle ölçmenin sonucu değiştirdiğini görmüştük; burada cetvelin kendisi optimize edilen şey olduğunda bozulduğunu görüyoruz.

Bir benzetme yardımcı olabilir ama sınırını da baştan söyleyelim. Ödül modeli, sınavı hazırlayan öğretmenin yerine geçmiş bir asistan gibidir: gerçek öğretmenin nasıl puanladığını izlemiş ve taklit etmeyi öğrenmiştir. Öğrenci bir süre asistanı memnun ederek gerçekten öğrenir; ama asistanın alışkanlıklarını yeterince tanıdığında, öğrenmeden puan almanın yollarını bulur. Benzetmenin bozulduğu yer şurası: buradaki öğrenci kasten kandırmaya çalışmaz, hiçbir niyeti yoktur — yalnızca puanı yükselten yönde parametre oynatan bir yordam çalışır. Benzetmenin biçimsel karşılığı ise şudur: politika, ödül modelinin gerçek insan yargısıyla ayrıştığı bölgelere doğru gradyan izler, çünkü orada ödül daha yüksektir.

> **Kendini yokla:** Ödül modelinin puanı yükselirken gerçek kalite neden düşebilir?

Çünkü ödül modeli insan yargısının bir yaklaşımıdır ve yaklaşımın hatalı olduğu bölgeler vardır. Politika, ödülü artırmak için o bölgeleri arar; ne kadar çok ararsa, çıktı o kadar "ödül modelini kandıran ama insanı memnun etmeyen" bir yere kayar. Vekil ölçü, hedef hâline geldiği anda ölçmeyi bıraktı.

## Kısayol: ödül modelini atlamak

Bu düzenek karmaşıktır. İki ayrı model, bir pekiştirmeli öğrenme döngüsü, dengelenmesi gereken bir tasma katsayısı — birazdan geleceğimiz çalışmanın kendi ifadesiyle karmaşık ve çoğu zaman kararsız bir prosedür. Onu kısaltan yöntemin adı doğrudan tercih optimizasyonu (direct preference optimization, DPO).

Rafael Rafailov ve arkadaşlarının NeurIPS 2023'te yayımlanan ve konferansın öne çıkan çalışmaları arasında ikincilikle anılan makalesi, düzeneği kısaltan bir gözlem yaptı. Ödül modeli farklı bir biçimde parametrelendirilirse, o ödülü en iyi kullanan politika kapalı biçimde yazılabiliyor. Sonuç şu: ayrı bir ödül modeli eğitip sonra ona göre pekiştirmeli öğrenme çalıştırmak yerine, tercih çiftleri doğrudan politikanın üzerinde basit bir sınıflandırma kaybıyla kullanılabiliyor. Çalışmanın başlığındaki espri de bunu söylüyor — dil modelin zaten gizliden gizliye bir ödül modelidir.

Yaptığı iş sezgi düzeyinde şudur: yeğlenen cevabın olasılığını artır, yeğlenmeyenin olasılığını azalt; ama bunu referans modele göre yap ve modelin sıralamayı ne kadar yanlış kurduğuna göre ağırlıklandır. Tasma kaybolmuyor, kaybın içine gömülüyor. 11\. makalede üçüncü durağın toplu adını tercih optimizasyonu koymuştuk; ödül modelini hiç kurmadan ilerleyen bu doğrudan yolların en bilineni DPO'dur.

Dürüstlük notu: çalışmanın kendi deneyleri 6 milyar parametreye kadar olan modellerde yürütüldü ve yazarlar hem çok daha büyük ölçeklere taşımayı hem de dağılım dışı genellemenin pekiştirmeli öğrenmeyle nasıl karşılaştırıldığını açık soru olarak bırakıyor. DPO pratikte yaygın biçimde benimsendi, ama "her durumda RLHF'nin yerini alır" cümlesi kapanmış bir tartışma değil.

Tartışmanın nereye oturduğunu gösteren bir sonraki adım da geldi. Fahim Tajwar ve arkadaşlarının ICML 2024'te yayımlanan çalışması, tercih verisiyle ince ayarın farklı yollarını aynı düzenekte karşılaştırdı ve şu genel eğilimi buldu: modelin **kendi** ürettiği cevaplar üzerinde çalışan yöntemler ile belirli cevapların olasılığını aktif olarak aşağı iten yöntemler, sabit bir veri kümesi üzerinde en büyük olabilirlik hedefiyle çalışanlardan daha iyi sonuç veriyor. Bu, DPO'yu diskalifiye etmez — DPO da yeğlenmeyen cevabın olasılığını aşağı iter. Söylediği şey daha ince: asıl fark kaybın biçiminde değil, verinin nereden geldiğindedir. Tercih çiftleri eğitilen modelin güncel çıktılarından toplanıyorsa kazanç büyür; aylar önce başka bir modelden toplanmış sabit bir kümeyse küçülür.

## Kimin tercihi?

Bütün bu düzenek tek bir girdiye dayanıyor: birinin oturup "bu daha iyi" demesi. O biri kim?

11\. makalede InstructGPT etiketleyicilerinin birbirleriyle zamanın yüzde 72,6 ± 1,5'inde hemfikir olduğunu söylemiştik. Aynı çalışmadaki iki sayı daha bu tabloyu tamamlıyor: hiç eğitim verisi üretmemiş ayrı bir etiketleyici grubunda uyum yüzde 77,3 ± 1,3, özetleme çalışmasında ise araştırmacıların birbiriyle uyumu yüzde 73 ± 4. Yani konuya en hâkim olanlar bile dörtte bire yakın oranda ayrışıyor. Ödül modeli bu gürültünün ortalamasını öğrenir — ve ortalamanın kimin ortalaması olduğu bir tasarım kararıdır, teknik bir zorunluluk değil.

Ölçülen tek bir şey de yok. Anthropic'in çalışması yardımseverlik ve zararsızlık için **ayrı** karşılaştırma kümeleri topladı: 44 bin yardımseverlik, 42 bin kırmızı takım karşılaştırması. Ayrı toplanmalarının sebebi 11\. makalede işaretlediğimiz gerilim — ikisi çoğu zaman birbirine ters çeker ve tek bir ödül sayısına sıkıştırıldıklarında hangisinin ağır bastığı gizlenir.

Mekanizmanın yapısal bir sonucu daha var ve doğrudan buradan çıkıyor. Ödül modeli "doğru cevap"ı değil, "etiketleyicinin seçtiği cevap"ı öğrenir. Bu ikisi çoğu zaman örtüşür, ama örtüşmediği durumlar sistematiktir: uzun ve kendinden emin yazılmış bir cevap, kısa ve temkinli bir cevaba yeğlenmeye açıktır; kullanıcıyı onaylayan bir cevap, onu düzelten bir cevaptan daha hoş gelebilir. Optimizasyon bu eğilimleri yaratmaz, zaten var olanları büyütür — çünkü ölçtüğü şey memnuniyettir. Bunun ölçülmüş biçimlerine ve karşı önlemlerine seride ileride ayrıca döneceğiz.

Son bir yön: tercih etiketlerini insan yerine başka bir modelin üretmesi. Yazılı ilkelere dayanan bu yaklaşım insan emeğini büyük ölçüde ortadan kaldırır ve bugün yaygın kullanılır; ilkelerin nasıl yazıldığı ve denetimin nasıl ölçekleneceği 64\. makalenin konusu. Burada işaretlenecek tek şey şu: ödül modelinin öğrendiği "iyi", nihayetinde birinin yazdığı bir ölçüttür.

### Sırada ne var

Üç makale boyunca ham tahminciyi asistana çevirdik ve her aşamada aynı şeye çarptık: veri. Ön eğitimin trilyonlarca token'ı, SFT'nin on iki bin insan yazımı cevabı, ödül modelinin otuz üç bin sıralaması. Her birinin nereden geldiğini, nasıl temizlendiğini ve hangi oranlarda karıştırıldığını 8\. makalede bir borç olarak bırakmıştık. Şimdi o borcu ödeme zamanı: bir eğitim derlemi tam olarak nasıl kuruluyor, neyi atmaya kim karar veriyor ve aynı veriyi kaç kez okumak hâlâ öğretiyor?

## Kaynakça

- Christiano, P. F., Leike, J., Brown, T., Martic, M., Legg, S. & Amodei, D. (2017). *Deep Reinforcement Learning from Human Preferences*. Advances in Neural Information Processing Systems 30 (NIPS 2017). [Bağlantı](https://papers.nips.cc/paper_files/paper/2017/hash/d5e2c0adad503c91f91df240d0cd4e49-Abstract.html)
- Bradley, R. A. & Terry, M. E. (1952). *Rank Analysis of Incomplete Block Designs: I. The Method of Paired Comparisons*. Biometrika, 39(3/4), 324–345. [Bağlantı](https://doi.org/10.2307/2334029)
- Stiennon, N., Ouyang, L., Wu, J., Ziegler, D., Lowe, R., Voss, C., Radford, A., Amodei, D. & Christiano, P. F. (2020). *Learning to summarize with human feedback*. Advances in Neural Information Processing Systems 33 (NeurIPS 2020). [Bağlantı](https://proceedings.neurips.cc/paper/2020/hash/1f89885d556929e98d3ef9b86448f951-Abstract.html)
- Ouyang, L. ve ark. (2022). *Training language models to follow instructions with human feedback*. Advances in Neural Information Processing Systems 35 (NeurIPS 2022). [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/b1efde53be364a73914f58805a001731-Abstract-Conference.html)
- Gao, L., Schulman, J. & Hilton, J. (2023). *Scaling Laws for Reward Model Overoptimization*. Proceedings of the 40th International Conference on Machine Learning (ICML 2023), PMLR 202. [Bağlantı](https://proceedings.mlr.press/v202/gao23h.html)
- Rafailov, R., Sharma, A., Mitchell, E., Ermon, S., Manning, C. D. & Finn, C. (2023). *Direct Preference Optimization: Your Language Model is Secretly a Reward Model*. Advances in Neural Information Processing Systems 36 (NeurIPS 2023). [Bağlantı](https://arxiv.org/abs/2305.18290)
- Tajwar, F., Singh, A., Sharma, A., Rafailov, R., Schneider, J., Xie, T., Ermon, S., Finn, C. & Kumar, A. (2024). *Preference Fine-Tuning of LLMs Should Leverage Suboptimal, On-Policy Data*. Proceedings of the 41st International Conference on Machine Learning (ICML 2024). [Bağlantı](https://arxiv.org/abs/2404.14367)
- Bai, Y. ve ark. (2022). *Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback*. Anthropic teknik raporu, arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2204.05862)
