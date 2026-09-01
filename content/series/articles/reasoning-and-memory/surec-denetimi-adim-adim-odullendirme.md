---
article_id: article_90e32fe9-931e-43a7-a016-15175f7ba5ff
title: "Süreç Denetimi: Adım Adım Ödüllendirme"
slug: surec-denetimi-adim-adim-odullendirme
category: reasoning-and-memory
level: intermediate
reading_order: 38
summary: "Ödülü zincirin sonunda değil her adımda vermenin ne değiştirdiğini kurar: sonuç denetiminin doğru cevaba yanlış yoldan varmayı neden görmediğini, adım etiketlerinin insan eliyle ve otomatik olarak nasıl üretildiğini, iyi bir adım ödülünün aslında ilerlemeyi ölçtüğünü ve süreç denetimli doğrulayıcıların nerede genelleme yapamadığını ölçümlerle gösterir."
tags:
  - surec-denetimi
  - sonuc-denetimi
  - dogrulayici
  - kredi-atama
  - adim-etiketi
content_hash: sha256:19aa569f8916a3db2489605f61f906080d9f72b9cf5c0f2e5310cd601f19cb17
classification_version: 1
classification_batch: 8
---
## Sondaki tek sayı

37\. makalede çerçeveyi kurup tek bir soruyu açıkta bıraktık: bölümün sonunda verilen tek bir sayı, binlerce karara nasıl dağıtılır? Sorunun adını da koyduk — kredi atama.

34\. makalede aynı sorunun sonucunu görmüştük. Kural tabanlı ödül yalnızca nihai cevabı denetliyordu; doğru cevaba yanlış bir gerekçeyle varan çözüm de tam puan alıyordu. Oradaki cümle şuydu: sonuç ödülü, akıl yürütmenin kalitesini değil sonucunu ölçüyor. 35\. makalede ise bir ipucu geçmişti — doğrulayıcıya puanını her token'dan sonra verdirmek, yalnızca sonda verdirmekten daha iyi çalışıyordu.

Bu makale o üç ipin ucunu birleştiriyor. Ödülü sonda değil, her adımda verirsek ne değişir? Adımları kim etiketleyecek, bu ne kadara mal olacak, ve elde edilen şey gerçekten daha iyi akıl yürütme mi?

## İki denetim biçimi

Ayrım basit. **Sonuç denetimi** (outcome supervision), geri bildirimi yalnızca nihai sonuca göre verir: cevap doğru mu, değil mi. **Süreç denetimi** (process supervision), zincirin her adımına ayrı bir geri bildirim verir: bu adım doğru mu, değil mi.

Bu iki denetimle eğitilen doğrulayıcılara da kısaca sonuç denetimli ve süreç denetimli doğrulayıcı diyeceğiz. İkisi de 35\. makaledeki işi yapar — bir çözüme puan verir — ama eğitim sinyalleri farklıdır.

Süreç denetiminin lehine üç gerekçe baştan sayılabilir. Birincisi bilgi miktarı: hatanın **nerede** olduğunu söylemek, olduğunu söylemekten fazlasıdır. İkincisi denetlenebilirlik: adım etiketleri insan tarafından okunabilir, dolayısıyla ödülün neyi ödüllendirdiği görülebilir. Üçüncüsü 31\. makaledeki soruyla ilgili: süreç denetimi, modeli insanın onayladığı bir zinciri izlemeye doğrudan teşvik eder, oysa sonuç denetimi zincire hiç bakmaz.

![Dikey bir çizgiyle ayrılmış iki bölmeli karşılaştırma şeması; iki bölmede de aynı çözüm gösterilir. Sol bölme sonuç denetimidir: dört ara adım kutusu üst üste dizilmiştir ve hiçbirinin yanında bir işaret yoktur; yalnızca en alttaki nihai cevap kutusunun yanında olumlu yazar. Bölmenin altında tek sayının bütün zincire ait olduğu belirtilir. Sağ bölme süreç denetimidir: aynı dört adımın her birinin yanında ayrı bir işaret vardır; birinci, ikinci ve dördüncü adımlar olumlu, üçüncü adım olumsuz olarak işaretlenmiş ve o kutu vurgulanmıştır; nihai cevap yine doğrudur ve o da olumlu işaretlidir. Bölmenin altında hatanın yerinin belli olduğu ama cevabın yine doğru çıktığı yazar. Şeklin altında zincirin iki bölmede de aynı zincir olduğu, üçüncü adımın hatalı olduğu ve sonuç denetiminin bunu göremediği belirtilir.](assets/sonuc-ve-surec-odulu.svg "Şekil 1 — Aynı zincir, iki farklı geri bildirim")

Şekil 1'in sağ tarafındaki üçüncü adım bu makalenin bütün gerekçesi. Zincirde bir hata var ama nihai cevap doğru; sonuç denetimi bu çözümü kusursuz sayar ve 37\. makalede gördüğümüz gibi hatalı adımın olasılığını da artırır.

## İlk karşılaştırma: aynı puan, farklı zincir

Bu iki denetimi ilk kez ciddi biçimde karşılaştıran çalışma Jonathan Uesato ve arkadaşlarının 2022 tarihli raporu. Çalışma **hakemli değildir** ve seri bunu böyle işaretleyerek kullanıyor; alanın bu ayrımı kuran ilk ölçümü olduğu için yerine bir başkası konamıyor.

Çalışmanın en değerli katkısı bir yöntemden çok bir **ölçü**: iz hatası. İnsan denetçiler, modelin ürettiği zincirde herhangi bir hata olup olmadığına bakıyor. Yanında klasik ölçü de duruyor: nihai cevap hatası. İki ölçüyü yan yana koyunca tablo şöyle çıkıyor.

Nihai cevapta iki denetim biçimi neredeyse aynı: ödül modeli kullanılmadığında yüzde 23,5'e karşı 22,3; kullanıldığında yüzde 16,6'ya karşı 14,8. Yani "hangisi daha doğru cevap veriyor" diye sorulursa cevap "ikisi de aynı" oluyor.

İz hatasına bakınca ayrışma başlıyor. Doğrudan nihai cevap doğruluğuna göre pekiştirmeli öğrenme uygulanan düzenlerin en iyi iz hatası yüzde 12,4; süreç temelli en iyi yöntemin iz hatası yüzde 3,8. Aynı doğruluk, dört kat daha bozuk gerekçe.

Bir de sürpriz var ve alanın sonraki tartışmasını şekillendirdi. Yalnızca nihai cevap etiketleriyle eğitilen ödül modelinin tahminleri, kendi eğitim etiketleriyle yüzde 77 oranında uyuşurken **adım etiketleriyle** yüzde 85 oranında uyuşuyor. Yani sonuç denetimli bir doğrulayıcı, kimse söylemeden adımların doğruluğunu yaklaşık olarak öğreniyor. Çalışmanın kendi yorumu makul: bir modelin adımların doğruluğunu tanıması, cevabı kafadan hesaplayıp karşılaştırmasından kolay.

Çalışmanın kendi en iyi düzeni ikisini birleştiriyor: denetimli öğrenme ile ödül modeline dayalı pekiştirmeli öğrenme birlikte kullanıldığında iz hatası yüzde 14,0'ten 3,4'e, nihai cevap hatası yüzde 16,8'den 12,7'ye iniyor. Yani iki ölçü aynı anda iyileştirilebiliyor — ama bunun için gerekçeye bakan bir sinyal gerekiyor.

Yazarlar bir uyarı da düşüyor ve bu uyarı birazdan işimize yarayacak: matematikte "yanlış gerekçeyle doğru cevap" görece nadirdir, dolayısıyla bulgular başka alanlara olduğu gibi taşınmayabilir.

## Ölçek büyüyünce ayrışma

Hunter Lightman ve arkadaşlarının ICLR 2024'te sunduğu çalışma aynı karşılaştırmayı üç değişiklikle tekrarlıyor: daha güçlü bir temel model, çok daha fazla insan geri bildirimi ve daha zor bir matematik kümesi.

İnsan denetçiler, modelin ürettiği çözümlerin her adımını olumlu, olumsuz ya da nötr diye etiketliyor. Ortaya çıkan küme, 12 bin soruya üretilmiş 75 bin çözüm üzerinde **800 bin adım etiketi**. Etiketleme yalnızca ilk hatalı adıma kadar sürüyor; ondan sonrası zaten geçersiz.

Sonuçlar, doğrulayıcıyı 35\. makaledeki gibi en iyi-N seçiminde kullanarak ölçülüyor. Soru başına 1.860 çözüm üretildiğinde:

| Seçici | çözülen soru oranı |
|---|---|
| çoğunluk oyu | %69,6 |
| sonuç denetimli doğrulayıcı | %72,4 |
| süreç denetimli doğrulayıcı | %78,2 |

Tablodaki tek tek sayılardan daha önemli olan şey eğrilerin biçimi.

![Yatay ekseni soru başına aday çözüm sayısı, dikey ekseni çözülen soru oranı olan bir eğri şeması. Üç eğri vardır. Çoğunluk oyu eğrisi en altta seyreder ve erken düzleşir. Sonuç denetimli doğrulayıcının eğrisi onun biraz üstündedir ve o da düzleşir. Süreç denetimli doğrulayıcının eğrisi en üsttedir ve aday sayısı büyüdükçe ötekilerden giderek daha çok ayrılır. Sağ kenarda üç eğrinin ulaştığı değerler yüzde 69,6, yüzde 72,4 ve yüzde 78,2 olarak işaretlenmiştir. Şeklin altında aradaki farkın aday sayısıyla açıldığı ve bunun daha iyi bir doğrulayıcının arama baskısına daha uzun dayanması anlamına geldiği yazılıdır.](assets/en-iyi-n-egrileri.svg "Şekil 2 — Aday sayısı büyüdükçe fark açılıyor")

Şekil 2'deki açılma, 35\. makaledeki dört yüz eşiğinin öbür yüzü. Orada aday sayısı büyüdükçe doğrulayıcıyı kandıran çözümlerin öne çıktığını ve başarının düştüğünü görmüştük. Daha iyi bir doğrulayıcı bu dönüm noktasını ileri iter: arama baskısı arttıkça ayakta kalabilen doğrulayıcı, aramanın kazancını daha uzun süre toplar. Yani süreç denetiminin değeri yalnızca "biraz daha doğru puan vermek" değil, **arama bütçesini kullanılabilir kılmak**.

Bir ayrıntı da puanların nasıl birleştirildiğinde. Süreç denetimli doğrulayıcı her adıma ayrı bir olasılık verir; çözümün tek bir puanı gerekince bu olasılıklar **çarpılır**, yani puan "bütün adımların doğru olma olasılığı" olarak okunur. Sonucu şu: tek bir kötü adım çözümün tamamını dibe çeker. Aynı işi bir başka çalışma adımların en düşük puanını alarak yapıyor; ikisinin ortak sezgisi aynı — zincir en zayıf halkası kadar güçlüdür.

Çalışma iki dürüstlük notu da düşüyor. Birincisi, iki doğrulayıcının eğitim kümeleri birebir karşılaştırılabilir değil; bu yüzden ayrıca küçük ölçekli, her şeyin sabit tutulduğu bir karşılaştırma yapılıyor ve orada da süreç denetimi bütün veri ölçeklerinde önde çıkıyor. İkincisi, etiketlenecek çözümleri rastgele seçmek yerine "doğrulayıcının yüksek puan verdiği ama cevabı yanlış olan" çözümleri seçmek, veri verimliliğini yaklaşık 2,6 kat artırıyor. Etiket bütçesi kısıtlıysa nereye harcandığı, ne kadar harcandığı kadar önemli.

## Etiketi kim yazacak

Sekiz yüz bin insan etiketi, yöntemin en görünür maliyeti. 34\. makalede doğrulanabilir ödülün cazibesi tam da etiketin bedava olmasıydı; süreç denetimi o bedavalığı geri alıyor.

Peiyi Wang ve arkadaşlarının ACL 2024'te sunduğu çalışma bu maliyeti kaldırmanın bir yolunu veriyor ve fikri doğrudan 37\. makaleden geliyor. Bir adımın kalitesi, o adımdan sonra doğru cevaba varma **potansiyeli** olarak tanımlanıyor. Ölçmek için bir "tamamlayıcı" model, o adımdan itibaren birkaç ayrı devam üretiyor ve kaçının doğru cevaba vardığına bakılıyor. Katı ölçümde adım, devamlardan en az biri doğruya varıyorsa olumlu sayılıyor; yumuşak ölçümde etiket doğrudan doğruya varan devamların oranı oluyor.

Sayıyla görelim. Bir adımdan sekiz devam üretilmiş olsun ve bunların üçü doğru cevaba varsın. Katı ölçümde etiket 1'dir — en az bir devam vardığı için adım "iyi" sayılır. Yumuşak ölçümde etiket 3 bölü 8, yani 0,375'tir. Aynı adım, aynı deneme, iki farklı etiket. Bir başka adımın sekiz devamının yedisi doğruya varıyorsa katı ölçümde ikisi de 1 alır ama yumuşak ölçümde biri 0,375, öbürü 0,875 alır. Ayrımı yapan şey adımın doğruluğu değil, oradan devam edebilme kolaylığı.

Bu tanım, 37\. makaledeki değer işlevinin tam kendisidir: bir durumdan itibaren beklenen getiri. Adım etiketi artık "bu adım doğru mu" sorusunun değil, "bu adımdan sonrası ne kadar iyi" sorusunun cevabı.

Ölçülen kazanç ikiye ayrılıyor. Doğrulayıcı olarak kullanıldığında adayları sıralıyor; ödül olarak kullanıldığında modeli adım adım eğitiyor. 7 milyar parametreli bir modelde ikinci kullanım ilkokul matematiğinde yüzde 77,9'dan 84,1'e, zor matematik kümesinde 28,6'dan 33,0'e çıkarıyor. İki kullanım birleştirildiğinde aynı kümelerde yüzde 89,1 ve 43,5'e ulaşılıyor.

> **Kendini yokla:** Adım etiketi "bu adım doğru mu" yerine "bu adımdan sonrası ne kadar iyi" sorusunu ölçüyorsa ne değişir?

İki şey. Birincisi, biçimsel olarak kusursuz ama işe yaramayan bir adım — doğru fakat çözümü hiçbir yere götürmeyen bir hesap — düşük puan alabilir. İkincisi ve daha rahatsız edici olanı, hatalı bir adım, model onu sonradan telafi edebiliyorsa yüksek puan alabilir. Etiket artık doğruluğu değil, o modelin o adımdan devam edebilme becerisini ölçüyor. Bu, ucuzluğun karşılığında ödenen bedel: ölçüt nesnel olmaktan çıkıp modele göreli hâle geliyor.

## İyi bir adım ödülü neyi ölçmeli

Bu soruyu doğrudan ele alan çalışma Amrith Setlur ve arkadaşlarının ICLR 2025'te sunduğu iş ve cevabı 37\. makalenin sözlüğüyle veriyor: bir adımın ödülü, doğruluğu değil **ilerlemeyi** ölçmelidir — yani adımı atmadan önceki ve attıktan sonraki başarı olasılığı arasındaki fark. Bu farkın adı zaten vardı: avantaj.

Çalışmanın ikinci ve daha ince iddiası şu: ilerleme, modelin kendisiyle değil, ondan **farklı** bir tamamlayıcı politikayla ölçülmeli. Sezgisi şöyle: bir adımın iyi olup olmadığını anlamak istiyorsan, o adımdan sonrasını zaten senin gibi düşünen birine değil, bağımsız bir çözücüye tamamlatmalısın. Şaşırtıcı sonuç, bu tamamlayıcının modelden **zayıf** olmasının bile işe yarayabilmesi.

Bu tanım seride yeni değil. 34\. makaledeki grup göreli avantaj, aynı fikrin **cevap** düzeyindeki hâliydi: bir cevabın ödülünden grubun ortalaması çıkarılıyordu. Buradaki tek fark, aynı hesabın zincirin her adımı için ayrı ayrı yapılması.

Ölçülen kazanç iki eksende. Çıkarım anında arama yapılırken bu ilerleme ödülüyle sıralama, sonuç denetimli doğrulayıcıya göre yüzde 8'den fazla doğruluk ve 1,5 ile 5 kat arası hesap verimliliği veriyor. Eğitimde yoğun ödül olarak kullanıldığında örnek verimliliği 5–6 kat, doğruluk yüzde 6'dan fazla artıyor. Karşılaştırma noktası önemli: otomatik adım etiketleriyle eğitilen doğrulayıcılar eğitimde daha önce sonuç denetimine göre yalnızca yüzde 1–2 kazandırabilmişti.

## Nerede kırılıyor

Şimdi yöntemin sınırlarına gelelim, çünkü tablo tek yönlü değil.

Chujie Zheng ve arkadaşlarının ACL 2025'te sunduğu ölçüm takımı, insan uzmanların hata konumunu işaretlediği 3.400 çözümden oluşuyor ve modelden en erken hatalı adımı bulmasını istiyor. Bu takımın bir yan ürünü, bu makalenin en çarpıcı sayısını veriyor: **nihai cevabı doğru olan** çözümlerin içinde gerekçesi bozuk olanların oranı, soru zorluğuyla birlikte hızla büyüyor.

| Soru kümesi | doğru cevaplı çözümlerde süreç hatası |
|---|---|
| ilkokul matematiği | %3,5 |
| lise-üniversitesi düzeyi matematik | %18,8 |
| olimpiyat düzeyi | %32,2 |
| geniş olimpiyat derlemi | %51,8 |

![Dört sütunlu bir grafik; başlığın altında oranların yalnızca nihai cevabı doğru olan çözümler arasında hesaplandığı belirtilir. Sütunlar soldan sağa, soru kümesi zorlaştıkça yükselir: ilkokul matematiğinde yüzde 3,5 ile neredeyse görünmeyen bir şerit, lise ve üniversite düzeyinde yüzde 18,8, olimpiyat düzeyinde yüzde 32,2, geniş olimpiyat derleminde yüzde 51,8. Son iki sütun vurgulu renktedir. Her sütunun üstünde oranı, altında küme adı yazılıdır. Şeklin altında bunların sonuç denetiminin kusursuz saydığı çözümler olduğu ve zorluk arttıkça doğru cevabın gerekçe hakkında giderek daha az şey söylediği belirtilir.](assets/surec-hatasi-zorluk.svg "Şekil 3 — Doğru cevap, bozuk gerekçe: oran zorlukla büyüyor")

Şekil 3, Uesato ve arkadaşlarının uyarısıyla Lightman ve arkadaşlarının sonucu arasındaki gerilimi çözüyor. İlkokul matematiğinde yanlış gerekçeyle doğru cevap gerçekten nadirdir — yüzde 3,5 — ve orada sonuç denetimi iyi bir vekildir. Olimpiyat düzeyinde ise doğru cevapların yarısına yakınının gerekçesi bozuktur; orada nihai cevap, akıl yürütme hakkında neredeyse hiçbir şey söylemez. İki çalışmanın farklı sonuçlara varmasının sebebi yöntem değil, sorunun zorluğu.

Aynı ölçüm takımının doğrulayıcılar hakkındaki bulgusu ise daha rahatsız edici. Otomatik adım etiketleriyle eğitilmiş açık doğrulayıcılar, kolay kümelerde iyi çalışırken zor kümelerde çöküyor: bir örnekte dört kümenin ortalaması yüzde 31,5'te kalıyor. İnsan etiketli kümeyle eğitilen bir doğrulayıcı yüzde 56,5'e çıkıyor. Ama asıl utandırıcı karşılaştırma şu: hiçbir süreç eğitimi almamış, yalnızca "bu çözümü adım adım eleştir" diye istem verilen genel modeller bunların üstüne çıkıyor — kapalı bir modelde yüzde 61,9, akıl yürütmeye eğitilmiş bir modelde yüzde 87,9. Süreç denetimli doğrulayıcıların eğitildikleri dağılımın dışına çıkamaması, alanın açık sorunu.

> **Kendini yokla:** Süreç denetimiyle özel olarak eğitilmiş bir doğrulayıcı, hiç öyle bir eğitim almamış genel bir modelin gerisinde nasıl kalabiliyor?

Çünkü ikisi farklı şeyler öğrenmiş. Süreç doğrulayıcısı, belirli üreticilerin belirli zorluktaki sorularda ürettiği adımların dağılımına uydurulmuştur; o dağılımın dışında elinde bir şey kalmaz. 35\. makaledeki uyarı burada geri dönüyor: doğrulayıcı çoğu zaman tam bir denetim yapmaz, gördüğü çözümleri ayırt etmeye yarayan işaretlere dayanır ve o işaretler alan değişince taşınmaz. Genel model ise soruyu baştan çözebilecek yetkinliği getirir. Bu, 16\. makaledeki uyarının bir başka biçimi: bir doğrulayıcının puanı, hangi dağılımda ölçüldüğü söylenmeden anlamlı değildir.

Maliyet tarafı da unutulmamalı. 33\. makaledeki muhasebede doğrulayıcı çalıştırmak token başına maliyeti ikiye katlıyordu; süreç denetimli bir doğrulayıcı çıkarım anında kullanıldığında bu fatura büyümez, çünkü bütün adımların puanı tek bir ileri geçişte okunabilir. Asıl maliyet **etiketin üretiminde**: otomatik etiketleme her adım için birkaç devam üretmek demektir, yani eğitim verisi hazırlamanın bedeli adım sayısıyla ve devam sayısıyla çarpılarak büyür. Süreç denetimi, çıkarımda değil hazırlıkta pahalıdır.

Son bir sınır da kavramsal. Bir "adım"ın nerede bittiği bir sözleşmedir: satır sonu, cümle, ya da bir denklem. Etiket bu sınırlara göre üretildiği için, sınırın seçimi ölçülen şeyi değiştirir. Ve 31\. makaledeki sadakat sorusu tam olarak çözülmüş olmuyor: süreç denetimi zincirin **denetlenmesini** sağlıyor, o zincirin cevabı gerçekten üreten süreç olduğunu garanti etmiyor.

## Süreç denetiminin disiplini

**Nihai cevap, gerekçe hakkında zorlukla azalan bir bilgi taşır.** Kolay sorularda iyi bir vekildir; zor sorularda değildir.

**İki ölçüyü ayrı tutun.** Nihai cevap hatası ile iz hatası aynı yönde hareket etmek zorunda değil; ölçmezseniz farkı göremezsiniz.

**Süreç denetiminin asıl kazancı arama baskısı altında görünür.** Aday sayısı büyüdükçe iyi doğrulayıcı ile kötüsü arasındaki fark açılır.

**Otomatik adım etiketi bir değer kestirimidir.** "Bu adım doğru mu" değil, "bu adımdan sonrası ne kadar iyi" sorusunu yanıtlar; ucuzluğun bedeli budur.

**İyi bir adım ödülü ilerlemeyi ölçer.** Mutlak doğruluk değil, başarı olasılığındaki değişim — yani avantaj.

**Süreç doğrulayıcıları eğitildikleri zorluk bandının dışına çıkamıyor.** Bu, alanın kapanmamış sorunu; istemle eleştiri yapan genel modeller bazı kümelerde onları geçiyor.

**Süreç denetimi çıkarımda değil hazırlıkta pahalıdır.** Adım puanları tek bir geçişte okunur; asıl bedel etiketlerin üretilmesinde ödenir.

**Denetlenebilir zincir, sadık zincir demek değildir.** Adımları puanlamak, o adımların cevabı gerçekten ürettiğini kanıtlamaz.

### Sırada ne var

Bu batch boyunca tek bir sorunun etrafında döndük: bir cevabı daha iyi hâle getirmek için ne yapılabilir? Doğrulayıcıyla seçtik, oylayarak seçtik, ağaç kurup aradık, çerçeveyi biçimselleştirdik ve ödülü adımlara dağıttık.

Hepsinin ortak varsayımı şuydu: soru soruldu, cevap üretildi, iş bitti. Oysa 21\. makalede modelin **durumsuz** olduğunu görmüştük — çağrı bittiğinde geriye hiçbir şey kalmıyor. Bir sonraki makale bu varsayımı kaldırıyor: bir sohbetin içinde biriken bilgi nasıl taşınır, pencere dolduğunda ne atılır, ve sohbetler arasında hatırlamak ne demektir?

## Kaynakça

- Uesato, J., Kushman, N., Kumar, R., Song, F., Siegel, N., Wang, L., Creswell, A., Irving, G. & Higgins, I. (2022). *Solving math word problems with process- and outcome-based feedback*. arXiv (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2211.14275)
- Lightman, H., Kosaraju, V., Burda, Y., Edwards, H., Baker, B., Lee, T., Leike, J., Schulman, J., Sutskever, I. & Cobbe, K. (2024). *Let's Verify Step by Step*. ICLR 2024. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/aca97732e30bcf1303bc22ac3924fd16-Abstract-Conference.html)
- Wang, P., Li, L., Shao, Z., Xu, R. X., Dai, D., Li, Y., Chen, D., Wu, Y. & Sui, Z. (2024). *Math-Shepherd: Verify and Reinforce LLMs Step-by-step without Human Annotations*. ACL 2024. [Bağlantı](https://aclanthology.org/2024.acl-long.510/)
- Setlur, A., Nagpal, C., Fisch, A., Geng, X., Eisenstein, J., Agarwal, R., Agarwal, A., Berant, J. & Kumar, A. (2025). *Rewarding Progress: Scaling Automated Process Verifiers for LLM Reasoning*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/98711dea460bdefe0e651ca23ec98ba2-Abstract-Conference.html)
- Zheng, C., Zhang, Z., Zhang, B., Lin, R., Lu, K., Yu, B., Liu, D., Zhou, J. & Lin, J. (2025). *ProcessBench: Identifying Process Errors in Mathematical Reasoning*. ACL 2025. [Bağlantı](https://aclanthology.org/2025.acl-long.50/)
