---
article_id: article_16f62c83-18b8-47c7-8ea4-8dd458511c53
title: "Yüzüncü Adım: Sezgiden Bilime — Haritanın Sentezi"
slug: yuzuncu-adim-sezgiden-bilime-haritanin-sentezi
category: foundations
level: advanced
reading_order: 100
summary: "Bir ara durak: yeni kavram tanıtmadan, yalnızca yayımlanmış sayıları kullanarak buraya kadarki yolun haritasını çiziyor. Fazların bir konu listesi değil bir zincir olduğunu gösteriyor — her faz, bir öncekinin cevapsız bıraktığı ölçüm sorusunu devralıyor. Ve serinin baştan beri tek bir refleksi tekrarladığını, aynı sayıların altı ayrı yerde aynı soruyu doğurduğunu ortaya koyuyor: aynı hesap bütçesinin iki tahsisi 0,114 nat'lık kayıp farkı yaratıyor, doğru cevabı A şıkkına taşımak bir modeli 53,1'den 68,2'ye çıkarıyor, aynı ağ aynı sıfır eğitim hatasına yüzde 85,75 ve yüzde 9,78 test doğruluğuyla ulaşıyor. Cevap, hangi cetveli seçtiğine bağlı."
tags:
  - sentez
  - harita
  - geri-cagirma
  - olcut-secimi
  - arastirma-pratigi
content_hash: sha256:f920b7dfd4f7c33cd6abc1b68d4069c4f90888625262f8574a2097af8a4cedc9
classification_version: 1
classification_batch: 24
---
## Bir ara durak

Doksan dokuz makale geride kaldı; bu makale bir bitiş değil, bir ara durak — yol devam ediyor ve haritanın sağ kenarında hâlâ çizilmemiş bölgeler var. Yeni bir kavram tanıtmıyor, yeni bir kaynak açmıyor, hiçbir sayıyı yeniden ölçmüyor. Tek işi var: buraya kadar kurulanın haritasını çıkarmak ve o haritanın **neden bu biçimde** olduğunu göstermek.

Bir uyarıyla başlayalım, çünkü böyle makaleler kolayca özet listesine dönüşür. Amaç fazları sırayla saymak değil. Amaç, fazların bir konu listesi **olmadığını** göstermek: her faz, bir öncekinin cevapsız bıraktığı bir ölçüm sorusunu devralıyor, ve bu devir zinciri serinin asıl omurgası.

99\. makalede deney tasarımının disiplinini kurarken bir şey söylemiştik: buradaki bütün kararlar deneyi kurmakla ilgili, hiçbiri iki sayıya bakıp "bu fark gerçek mi" sorusunu cevaplamıyor. O soruya girmeden önce durup haritaya bakmanın sebebi şu: bundan sonraki makale bu fazların hepsinden örnek çekecek ve o örneklerin nerede durduğunu bilmek gerekiyor.

## Zincirin biçimi

Serinin fazları bir merdiven gibi kurulmadı; her basamak bir öncekinin **eksik ölçüsünü** taşıyor.

1\. makalede yapay zekâyı kural yazmak ile veriden öğrenmek arasındaki fark üzerinden kurmuştuk ve modeli "ayarlanabilir bir fonksiyon" diye tanımlamıştık. 2\. makalede o ayarın nasıl yapıldığını gördük — kayıp, gradyan inişi, öğrenme oranı — ve orada deneyerek bir eşik bulduk: üç evlik oyuncak problemde öğrenme oranı 3/14 ≈ 0,214'ün altındayken yakınsıyordu. Bu sayı doksan üç makale boyunca bekledi ve 95\. makalede kanıtlandı: kaybın ikinci türevi 28/3, genel kural α < 2/λ, ve 2/λ tam olarak 3/14. Ölçüm ile teorem aynı ondalık basamakta buluştu.

Bu, zincirin en temiz örneği ama tek örneği değil. Aynı desen fazlar arasında sürekli tekrarlanıyor: bir makale bir mekanizmayı kuruyor, ölçüsünü açık bırakıyor, ve ölçü daha ileride — çoğu zaman çok daha ileride — kapanıyor.

![Dokuz satırlık üç sütunlu bir tablo. Üstte başlık: her faz, bir öncekinin cevapsız bıraktığı ölçüm sorusunu devralıyor. Sütunlar aralık, kurduğu ve bıraktığı sorudur. Birinci satır 1–10: modelin ne yaptığı; bıraktığı soru, ne kadar iyi yaptığının nasıl ölçüleceği. İkinci satır 11–20: ne istediğimizi söylemek; bıraktığı soru, söylediğimizin ölçüsünün ne olduğu. Üçüncü satır 21–30: pencereye ne koyduğumuz; bıraktığı soru, koyduğumuzun faturası. Dördüncü satır 31–40: hesabı çıkarıma kaydırmak; bıraktığı soru, hangi hesabın neye değdiği. Beşinci satır 41–60: dışarıya bağlanmak ve eylem; bıraktığı soru, güvenilirliğin nasıl ölçüleceği. Altıncı satır 61–80: amacın ve zararın yazılışı; bıraktığı soru, değerlendirmenin geçerli olup olmadığı. Yedinci satır 81–90: modaliteler ve verimlilik; bıraktığı soru, aynı faturanın enerji karşılığı. Sekizinci satır 91–97: sezginin biçimsel hâli; bıraktığı soru, hangi ölçüt üzerinden en iyi olduğu. Dokuzuncu satır vurguludur, 98'den beri: literatürün kendisi; okumak, tasarlamak, ölçmek. En altta bir kayıt: satırlar yayımlanmış makalelerin kendi bölümlerinden çıkarılmıştır.](assets/serinin-haritasi.svg "Şekil 1 — Her faz, bir öncekinin ölçüsünü devralıyor")

Şekil 1'in sağ sütunu okunduğunda zincir görünür oluyor. Birinci satırın bıraktığı soru ikinci satırda değil, 16\. makalede karşılandı — benchmark'ların ne ölçüp ne ölçemediği. 16'nın bıraktığı soru 71\. makalede karşılandı — bir puanın bir ölçüm olduğu ve dört halkalı bir zincirin ucunda durduğu. 71'in bıraktığı soru 98'e ve buradan sonrasına devredildi.

Aynı şey öteki satırlar için de geçerli. 21\. makalede bağlam penceresinin sınırını kurduk; faturası 26\. ve 28\. makalelerde çıktı. 33\. makalede çıkarım anında hesap harcamanın iki eksenini kurduk; o hesabın ne zaman değdiği 40\. makalede bir zaman birimine bağlandı. 61\. makalede hizalama sorununu kurduk; hizalamanın ölçülebilir olup olmadığı 71–73'te tartışıldı.

> **Kendini yokla:** 2\. makaledeki 3/14 eşiği ile 95\. makaledeki 2/λ kuralı arasındaki ilişki bir tekrar mı, yoksa başka bir şey mi?

Tekrar değil, **bilinçli formalizasyon**. Tekrar aynı şeyi ikinci kez anlatmaktır; buradaysa ikinci anlatım birincisinin **nereden geldiğini** söylüyor: 2'de ölçülen bir olguydu, 95'te bir teoremin özel hâli oldu. Serideki birçok ileri makale bu biçimde çalışıyor — 91 embedding'in, 93 dağılımın, 94 kaybın, 96 genellemenin daha önce sezgiyle kurulmuş hâlini biçimsel düzeyde yeniden kuruyor, ve hiçbiri ilk anlatımı geçersiz kılmıyor.

## Her yetenek bir fatura taşıyor

Haritanın en uzun zinciri maliyetle ilgili ve seride hiç kesintiye uğramadan ilerliyor.

8\. makalede ön eğitimin hesabını 6 × parametre × token kuralıyla kurduk ve bir modelin ne kadar veri gördüğünü söylemenin, ne kadar hesap harcadığını söylemek olduğunu gördük; 9\. makalede aynı bütçenin iki farklı tahsisinin iki farklı kayıp verdiğini. Faturanın ikinci yarısı çıkarımda çıktı: 26\. makalede anahtar-değer önbelleğinin boyutu hesaplandı ve bu yükün ağırlıkların kendisini geçebildiği görüldü; 28\. makalede aynı fatura servis düzeyine taşındı, yığınlama ve spekülatif üretim ile boşta duran hesabın nasıl doldurulduğu kuruldu.

Üçüncü yarı çıkarım anında hesap harcamayla geldi. 33\. makalede aynı FLOP'un eğitime mi çıkarıma mı harcanacağı bir seçim hâline geldi; 60\. makalede aynı seçim ajan tarafında bir dolar hesabına indi — yirmi turluk bir görevde girdi faturası 290 bin birime çıkıyor, istem önbelleğiyle 56.600'e iniyor. 85\. makalede mimarinin kendisi faturayı bölüyordu: 671 milyar parametrenin yalnızca 37 milyarı her token için çalışıyor.

Ve zincirin son halkası ölçüyü değiştiriyor. 89\. makalede donanımın kendi cetveli kuruldu — 26'da hesaplanan "bayt başına 229 işlem" oranının bir adı ve bir modeli olduğu ortaya çıktı. 90\. makalede aynı fatura enerjiye ve karbona çevrildi ve o çevrimin her halkasında bir varsayım bulunduğu gösterildi. Yani "kaç FLOP" sorusunun cevabı boyunca birim beş kez değişti: token, bellek, saniye, dolar, kilovat saat. Aynı iş, beş cetvel.

## Amaç nereye yazılır

İkinci uzun zincir, modele ne istediğimizi söyleme biçimiyle ilgili.

11\. makalede ham modelden asistana geçişin aşamalarını kurduk ve orada bir oran vardı: asistanlaştırma aşaması, ön eğitimin harcadığı hesabın yüzde 1,6'sı kadar hesap harcıyordu. 12\. makalede az sayıda ama iyi seçilmiş örneğin ne yapabildiğini, 13\. makalede tercihlerin bir ödül sinyaline çevrilmesini gördük. O makalede kullanılan ceza teriminin biçimsel kimliği ise seksen bir makale sonra, 94\. makalede tanımlandı: KL ıraksaması, çapraz entropi eksi entropi.

Aynı zincirin ikinci yarısı amacın **yanlış** yazılmasıyla ilgili. 61\. makalede hizalama sorununun kendisi, 62\. makalede reddetmenin öğretilmesi, 63'te saldırıların uyarlanır hâli kuruldu; 64\. makalede ilkelerin yazılması ve denetimin ölçeklenmesi — 13'ün elli bir makale önce verdiği sözün karşılığı. Ve bütün bu düzenin dayandığı varsayım 71\. makalede sınandı: hizalamanın ölçüldüğü cetvelin kendisi geçerli mi?

Bu zincirin biçimi tekrarlanıyor: bir hedef yazılıyor, hedefi ölçen bir vekil seçiliyor, vekil kovalandıkça gerçek hedefle bağı zayıflıyor. 13\. makalede aşırı optimizasyon olarak adlandırılan bu desen, 57'de ajanın cetveldeki kısayolu, 72'de ölçütün kirlenmesi ve 98'de ayar bütçesi asimetrisi olarak üç kez daha karşımıza çıktı.

## Dışarıya bağlanmak

Üçüncü zincir modelin kendi penceresinin dışına uzanmasıyla ilgili ve en hızlı büyüyen bölüm.

21\. makalede bağlam penceresinin sınırını, 23\. makalede örnekle öğrenmeyi, 24\. makalede rollerin ve sohbet biçiminin nasıl kurulduğunu gördük. 41\. makalede modelin bilgisinin yetmediği yer adlandırıldı ve dışarıya bağlanma başladı; 43\. makalede dizin yapıları, 45\. makalede getirme hattının üç ayrı yerde yanlış yapabileceği ve her katmanın ayrı ölçülmesi gerektiği kuruldu.

47\. makalede model dünyaya dokundu — işlev çağrısı — ve 51\. makalede bu döngüye adı kondu: ajan bir model değil, bir sistem. 57\. makalede ajanın nasıl ölçüleceği tek soruya toplandı ve orada 33'ün kapsaması yerine pass^k kullanıldı, çünkü bir ajan için önemli olan denemelerden birinin tutması değil, hepsinin tutması. 40\. makalede aynı soru zamana bağlandı: bir modelin bitirebildiği görevin uzunluğu, seçtiğin güvenilirlik çıtasına göre tanımlı ve yüzde 80 çıtasındaki ufuk, yüzde 50 çıtasındakinin kabaca beşte biri.

## Tekrarlanan tek refleks

Haritanın ikinci okunuşu daha ilginç. Fazlar farklı konulardan geçiyor ama aynı refleksi tekrar tekrar üretiyorlar — ve o refleks tek bir soruda toplanıyor: **bu sayı neyin ölçüsü ve hangi koşulda geçerli?**

![Altı bloklu bir liste; her blokta bir makale numarası, bir ölçüm satırı ve altında o ölçümün doğurduğu soru var. Birinci blok 9. makale: aynı bütçe, iki tahsis; kayıp farkı token başına 0,114 nat; soru, hangi eğrinin ölçülüp hangisinin uydurulduğu. İkinci blok 71. makale: doğru cevabı A şıkkına taşımak 53,1'den 68,2'ye çıkarıyor; soru, puanın hangi kısmının düzeneğe ait olduğu. Üçüncü blok 33. makale: tek deneme olasılığı 0,1 iken on denemede kapsama 0,651, olasılık 0,001 iken yüz denemede 0,095; soru, aynı bütçenin hangi zorlukta ne kazandırdığı. Dördüncü blok 40. makale: yüzde 50 görev ufku 2 saniyeden 110 dakikaya, ikiye katlanma 207 gün; soru, hangi güvenilirlik çıtasının seçildiği. Beşinci blok 96. makale: aynı ağ, sıfır eğitim hatası, test doğruluğu bir yanda yüzde 85,75 öbür yanda yüzde 9,78; soru, sıfır eğitim hatasının neyin kanıtı olduğu. Altıncı blok vurguludur, 98. makale: aynı bildiriler iki komitede, kabul edilenlerin yarısı reddedilirdi; soru, seçicilik arttıkça ne olduğu. En altta bir kayıt: bütün sayılar ilgili makalelerde yayımlanmış hâlleriyle alınmıştır ve burada yeniden ölçülmemiştir.](assets/ayni-refleks-alti-yerde.svg "Şekil 2 — Altı ayrı sayı, tek bir soru")

Şekil 2'nin altı satırı serinin altı ayrı yerinden geliyor ve hiçbiri ötekiyle konu olarak akraba değil. Ölçek yasaları, çoktan seçmeli sınav protokolü, çıkarım bütçesi, görev uzunluğu, genelleme kuramı ve hakemlik — ama altısı da aynı biçimde kuruluyor: bir sayı veriliyor, sonra o sayının hangi koşulda üretildiği sorulunca sayı anlamını değiştiriyor.

Birinci satır bunun en eski hâli. 9\. makalede aynı hesap bütçesinin iki farklı tahsisini görmüştük: bir tarafta 800 milyar parametre ve 120 milyar token, öbür tarafta çok daha az parametre ve çok daha fazla token. İki tahsisin kayıp farkı token başına 0,114 nat ve bu, "daha büyük daha iyidir" cümlesinin neden eksik olduğunu gösteriyordu. Sayı yanlış değildi; eksik olan, hangi eğrinin ölçüldüğü ve hangisinin uydurulduğuydu.

Beşinci satır aynı refleksin en keskin hâli. 96\. makalede aynı ağın, aynı eğitim bütçesiyle, sıfır eğitim hatasına iki farklı dünyada ulaştığını gördük: gerçek etiketlerle test doğruluğu yüzde 85,75, rastgele etiketlerle 9,78 — on sınıflı bir problemde rastgele tahminin düzeyi. "Eğitim hatası sıfır" cümlesi iki durumda da doğru ve iki durumda da bambaşka bir şey anlatıyor.

Altıncı satır ise refleksi alanın kendisine çeviriyor. 98\. makalede gördüğümüz gibi aynı bildiriler iki bağımsız komiteye verildiğinde, bir komitenin kabul ettiklerinin yaklaşık yarısı öbüründe reddediliyor. "Hakemli mecrada yayımlandı" cümlesi de bir ölçüm ve onun da bir koşulu var.

## Aynı sözcük, başka nesne

Haritanın küçük ama pratik bir parçası da terimlerle ilgili, çünkü seri boyunca birkaç sözcük birden fazla kavram taşıdı ve her seferinde ayrım makalenin içinde açıkça yapıldı.

**Değer.** 6\. makalede dikkat üçlüsünün üçüncü öğesiydi; 37\. makalede beklenen getirinin adı oldu. İkisi arasında hiçbir ilişki yok.

**Bellek.** 26\. makalede donanımın belleği, 39 ve 56'da ürünün hatırladığı şey. Birincisi bayt, ikincisi içerik.

**Kapsama.** 33\. makalede `k` denemenin en az birinde çözülen soruların oranı, 65'te modelin cevap vermeyi seçtiği soruların oranı, 83'te üretimin çeşitlilik ölçüsü.

**Güvenilirlik.** 50\. makalede getirilen belgenin niteliği, 57'de ajanın aynı görevi her seferinde bitirmesi, 71'de ölçüm aracının tekrarda tutarlı olması.

**Yanlılık.** 3\. makalede nöronun sabit terimi — orada **sapma** denmişti, tam da bu yüzden —, 45 ve 73'te hakemin kayırması, 93 ve 96'da tahmincinin ortalamada kaçırdığı pay.

**Yeniden üretme.** 9\. makalede bir çalışmanın bağımsız tekrarı, 55'te bir hatanın kasıtlı olarak yeniden oluşturulması.

Bu ayrımların hepsi ilgili makalede yapıldı ve hiçbiri geriye dönük olarak değiştirilmedi. Haritayı okurken işe yarayan tarafı şu: bir terimi gördüğünde hangi fazda olduğunu sormak, çoğu zaman hangi anlamda kullanıldığını da söylüyor.

## Sezgiden bilime

Başlıktaki "sezgiden bilime" ifadesi bir üslup tercihi değil, haritanın kendisinin biçimi.

Serinin ilk fazlarında her şey sezgiyle kuruldu: model ayarlanabilir bir fonksiyondu, dikkat bir tartım işlemiydi, ölçek yasası bir eğilimdi. Orta fazlarda bu sezgiler mekanizmaya döndü: dikkatin karesel maliyeti bir bellek hesabına, hizalama bir eğitim düzenine, ajan bir kontrol döngüsüne. İleri fazlarda mekanizmalar biçimsel düzeyde yeniden kuruldu: gradyan bir yön, kayıp bir bilgi ölçüsü, genelleme bir ayrışım oldu. Ve bu fazda, aynı disiplin literatürün kendisine uygulandı.

Bu sıra pedagojik bir tercih değil, zorunluluk. 91\. makaledeki vektör uzayı kurulumu 4\. makaleyi yeniden anlatmıyor; 4'te kurulan sezgiyi **girdi** olarak kullanıyor. 95, 2\. makalenin ölçümünü girdi olarak alıyor. 98, seri boyunca kullanılmış onlarca çalışmanın okunma biçimini konu ediniyor. Her biçimselleştirme, kendisinden önce gelen bir sezgiyi gerektiriyor — tersi mümkün değil, çünkü biçimselleştirme neyin biçimselleştirileceğini söylemiyor.

Aynı şey geriye doğru da işliyor ve haritanın en pratik parçası bu: **erken bir makaledeki bir sayı, ileri bir makalenin sınama aracı hâline geliyor.** 2'nin 3/14'ü 95'in teoremini sınadı. 4'ün analoji aritmetiği ölçümü 91'in geometri kurulumunun sınırını çizdi. 16'nın iki soruluk farkı 71'in hata payı tablosunda yerine oturdu. 33'ün kapsama eğrisi 40'ın güvenilirlik çıtasıyla birleşti.

> **Kendini yokla:** Serinin ileri fazlarında bir kavram ikinci kez kuruluyorsa, birinci kurulumu okumadan ikincisi anlaşılabilir mi?

Çoğu zaman hayır — ve sebebi 91\. makalenin kendi hikâyesinde görünüyor. Orada embedding'lerin matematiği kurulurken, 4\. makalenin analoji aritmetiği hakkında zaten ölçülmüş bir sınırı vardı; ikinci kurulum o sınırı **varsayarak** ilerledi ve "aritmetik doğru mu" sorusunu değil "soru neden sorulabilir" sorusunu sordu. Birinci kurulum okunmadığında ikincisi teknik olarak takip edilebilir ama neye cevap verdiği görünmez. Biçimselleştirme bir yerine geçme değil, bir derinleştirmedir.

## Haritayı kendin çiz

Bu makalenin çıktısı bir özet değil, bir okuma düzeni. Elindeki haritayı kullanmanın üç yolu var.

**Bir sayıyı gördüğünde nereden geldiğini sor.** Serinin hemen her makalesinde bir sayı, koşulu söylenmeden aktarıldığında anlamını yitiriyordu. 9'un 0,114 nat'ı, 71'in 15 puanlık şık etkisi, 96'nın 9,78'i — üçü de ancak koşuluyla birlikte bir şey söylüyor.

**Bir kavramı gördüğünde nerede kurulduğunu ve nerede derinleştiğini sor.** Terimlerin çoğu seride iki kez geçiyor: bir kez sezgiyle, bir kez biçimsel olarak. Kalibrasyon 16'da adlandırıldı ve 65'te kuruldu; kirlilik 8, 14, 18 ve 31'de işaret edildi ve 72'de ödendi; KL 13'te kullanıldı ve 94'te tanımlandı.

**Bir iddiayı gördüğünde hangi fazın sorusunu cevapladığını sor.** Şekil 1'in sağ sütunu bunun için var. Bir çalışma "modelimiz daha iyi" diyorsa, hangi satırın ölçüsünü kullandığını bulmak, iddianın neye dayandığını bulmaktır.

**Bir maliyeti gördüğünde hangi birimde verildiğini sor.** Aynı iş seride beş ayrı birimle ölçüldü — token, bayt, saniye, dolar ve kilovat saat — ve bir birimde kazanç görünen şey başka bir birimde kayıp olabiliyordu. 27\. makalede modeli küçültmek belleği kazandırıp doğruluğu riske atıyordu; 28'de spekülatif üretim hızı artırırken toplam hesabı büyütüyordu; 85'te aynı ağırlık sayısı iki farklı çalışan parametre sayısına karşılık geliyordu.

Bu dört sorunun ortak yanı, hiçbirinin bilgi değil **alışkanlık** olması. Serinin bu noktasında okuyucunun elinde bir mekanizmalar deposu var; asıl aktarılan şey ise bu depoyu kullanırken her seferinde aynı soruları sorma refleksi. Şekil 2'nin altı satırı bunun kanıtı: birbirinden tamamen ayrı altı konu, tek bir okuma alışkanlığıyla çözülüyor.

Bu haritanın bir de kasıtlı boşluğu var. Buraya kadar hiçbir makale, bir Transformer'ı baştan sona kendi elleriyle kurmadı; mimarinin parçaları 6 ve 7'de ayrı ayrı anlatıldı, eğitim döngüsü 8'de ölçek düzeyinde kuruldu, ama ikisi hiç birleştirilmedi. Bu boşluk bilinçli ve haritanın ilerisinde duruyor.

Ve bir sınır, çünkü harita bir bilgi değil bir düzen: buradaki hiçbir satır, kendi makalesini okumanın yerine geçmiyor. Şekil 1 ve Şekil 2 yalnızca nerede ne olduğunu söylüyor; o yerlerdeki sayıların nasıl üretildiği kendi makalelerinde duruyor ve bu makale onları yeniden üretmiyor.

### Sırada ne var

Harita çıkarıldı, ama 99\. makalenin sonunda açık bıraktığımız soru hâlâ açık duruyor: elinde iki sayı var ve aralarındaki farkın gürültüden mi geldiğini yoksa gerçek mi olduğunu bilmen gerekiyor. Bir sonraki makale bu soruyu doğrudan cevaplıyor ve seride iki kez verilmiş bir sözü ödüyor — hangi farkın anlamlı sayılabileceğini, kaç örneğin gerektiğini ve güven aralığının nasıl kurulduğunu biçimsel olarak kuruyor.

## Kaynakça

- Kaplan, J., McCandlish, S., Henighan, T., Brown, T. B., Chess, B., Child, R., Gray, S., Radford, A., Wu, J. & Amodei, D. (2020). *Scaling Laws for Neural Language Models*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2001.08361)
- Hoffmann, J., Borgeaud, S., Mensch, A., Buchatskaya, E., Cai, T., Rutherford, E., de Las Casas, D., Hendricks, L. A., Welbl, J., Clark, A. ve ark. (2022). *An empirical analysis of compute-optimal large language model training*. Advances in Neural Information Processing Systems 35 (NeurIPS 2022). [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/c1e2faff6f588870935f114ebe04a3e5-Abstract-Conference.html)
- Zheng, C., Zhou, H., Meng, F., Zhou, J. & Huang, M. (2024). *Large Language Models Are Not Robust Multiple Choice Selectors*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=shr9PXz7T0)
- Kwa, T., West, B., Becker, J., Deng, A., Garcia, K., Hasin, M., Jawhar, S., Kinniment, M., Rush, N., Von Arx, S. ve ark. (2025). *Measuring AI Ability to Complete Long Software Tasks*. NeurIPS 2025. [Bağlantı](https://papers.nips.cc/paper_files/paper/2025/hash/85069585133c4c168c865e65d72e9775-Abstract-Conference.html)
- Zhang, C., Bengio, S., Hardt, M., Recht, B. & Vinyals, O. (2017). *Understanding deep learning requires rethinking generalization*. ICLR 2017. [Bağlantı](https://openreview.net/forum?id=Sy8gdB9xx)
- Beygelzimer, A., Dauphin, Y. N., Liang, P. & Wortman Vaughan, J. (2023). *Has the Machine Learning Review Process Become More Arbitrary as the Field Has Grown? The NeurIPS 2021 Consistency Experiment*. NeurIPS 2021 program başkanlarının raporu; hakemlikten geçmemiştir (arXiv:2306.03262). [Bağlantı](https://arxiv.org/abs/2306.03262)
- Levy, O., Goldberg, Y. & Dagan, I. (2015). *Improving Distributional Similarity with Lessons Learned from Word Embeddings*. Transactions of the ACL 3, 211–225. [Bağlantı](https://aclanthology.org/Q15-1016/)
