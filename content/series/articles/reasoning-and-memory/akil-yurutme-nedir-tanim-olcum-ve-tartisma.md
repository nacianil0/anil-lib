---
article_id: article_680c7501-555f-4c11-9e13-f8b89549ec78
title: "Akıl Yürütme Nedir? Tanım, Ölçüm ve Tartışma"
slug: akil-yurutme-nedir-tanim-olcum-ve-tartisma
category: reasoning-and-memory
level: intermediate
reading_order: 31
summary: "Faz 4'ü, ara adımların adını doğru koyarak açar: alanın 'akıl yürütme' tanımını, aynı sorunun yüzeysel varyantlarında ölçülen kırılganlığı, konuya eklenen tek bir ilgisiz cümlenin yarattığı çöküşü, modelin yazdığı gerekçenin gerçek sebebi temsil edip etmediğini ve insanların da aynı içerik etkilerini gösterdiğini ölçümlerle kurar."
tags:
  - akil-yurutme
  - olcum-disiplini
  - sadakat
  - kirilganlik
  - icerik-etkisi
content_hash: sha256:3e89d25770034e39cb2247a1f42447e8c57beb06722fd98825ff76cf71f962be
classification_version: 1
classification_batch: 7
---
## Adı konmamış bir gözlem

Serinin son üç fazında aynı gözlemle üç ayrı yerden çarpıştık. 15\. makalede bir toplama işleminin, sayıyı virgüllü hâlde tekrar ettirince düzeldiğini gördük. 22\. makalede ara adım istemenin ölçülen kazancını dört görev sınıfına ayırdık. 30\. makalede bir şemanın alan sırasının, cevabı gerekçeden önce yazdırarak o kazancı tamamen sildiğini ölçtük.

Üçü de aynı yere işaret ediyor: model cevaba varmadan önce metin üretirse, ölçülebilir biçimde daha doğru cevap veriyor.

Bu gözlemin bir adı var ve alanda çok kullanılıyor: **akıl yürütme** (reasoning). Ama ad, gözlemden çok daha fazlasını iddia ediyor. Bu makale ara adımların nasıl çalıştığını anlatmıyor — o 32\. makalenin işi. Bu makale daha önce gelmesi gereken soruyu soruyor: bir dil modelinin "akıl yürüttüğünü" söylediğimizde tam olarak ne iddia etmiş oluyoruz, bu iddia nasıl ölçülüyor ve ölçüm nerede iddiayı desteklemiyor?

## Tanım neden zor

Alanın üzerinde anlaştığı tek bir tanım yok. Ama tanım denemelerinin ortak bir çekirdeği var ve bu çekirdek işimizi görüyor.

Iman Mirzadeh ve arkadaşlarının ICLR 2025'te sunduğu çalışma mantıksal akıl yürütmeyi şöyle tanımlıyor: bir aracın, **yeni** bir hedefe ulaşmak için mantıksal adımlar kullanması. Buradaki "yeni" sözcüğü tanımın tamamını taşıyor. Onsuz tanım, ezberlenmiş bir çözümü geri çağırmayı ya da daha önce görülmüş adımları taklit etmeyi de kapsardı. Aynı tanım iki alt beceri gerektiriyor: problemi alt problemlere **ayırabilmek** ve alt problemlerin çözümlerini **birleştirebilmek**.

Bu tanım hemen bir ölçüm programı doğuruyor. Eğer akıl yürütme adımların kendisiyse, sorunun yüzeyi değişip mantığı sabit kaldığında başarı değişmemelidir. Bir öğrenci bir problemi gerçekten çözebiliyorsa, problemdeki isimler ya da sayılar değiştiğinde çözmeye devam eder. Alan son yılların en öğretici ölçümlerini tam olarak bu beklentiyi sınayarak yaptı.

Bir uyarıyı baştan koyalım: 16\. makalede kurduğumuz ölçüm disiplini burada da geçerli. "Akıl yürütme ölçüldü" diye bir şey yok; ölçülen şey her zaman bir kümedeki bir protokolle alınan bir puandır. Aşağıdaki çalışmaların değeri, o puanı tek bir sayı olmaktan çıkarıp bir **dağılım** hâline getirmelerinden geliyor.

## Aynı soru, elli farklı örnek

Mirzadeh ve arkadaşları, ilkokul düzeyi matematik sorularından oluşan yaygın bir değerlendirme kümesinin yüz sorusunu alıp her birini bir **şablona** çevirdiler: isimler, nesneler ve sayılar değişken hâline getirildi, aralarındaki mantıksal koşullar sabit tutuldu. Her şablondan elli örnek üretildi. Sonuç, aynı yüz soruluk sınavın elli farklı sürümü — hepsinde çözüm adımları birebir aynı, yalnızca yüzey farklı. Ölçüm sekiz örnekli ara adımlı istemle ve açgözlü seçimle yapıldı; yirmiden fazla açık model ile dört kapalı model denendi.

Beklenti şu: elli sürümün puanları birbirine çok yakın çıkmalı. Çıkmıyor.

![Yatay eksende doğruluk yüzdesi bulunan bir dağılım şeması. Elli sürümün puanları bir çan biçiminde dağılmış çubuklarla gösterilir ve dağılımın ortalaması ile standart sapması etiketlenmiştir. Dağılımın sağ tarafında, ortalamadan belirgin biçimde uzakta, özgün değerlendirme kümesinin puanını gösteren kesikli dikey bir çizgi durur. Şeklin altında, çözüm adımlarının elli sürümde birebir aynı olduğu, değişen tek şeyin isimler ve sayılar olduğu ve özgün kümenin puanının dağılımın merkezinde değil sağ kuyruğunda yer aldığı yazılıdır.](assets/ayni-soru-elli-surum.svg "Şekil 1 — Tek bir puan yerine bir dağılım")

Şekil 1'in gösterdiği iki ayrı bulgu var. Birincisi yayılma. Dokuz milyar parametreli bir modelde en iyi sürümle en kötü sürüm arasındaki fark yüzde 12'den büyük; başka bir modelde yaklaşık yüzde 15. İkincisi, kesikli çizginin yeri: özgün kümenin puanı çoğu modelde dağılımın merkezinde değil, sağ kuyruğunda. Yirmi beş modelin yirmi birinde bu böyle. İstatistiksel olarak, bir dağılımdan çekilmiş rastgele bir örneğin sistematik olarak dağılımın sağında olması beklenmez.

Değişimin türü de ayrıştırıldı ve sonuç ilginç. Yalnız isimleri değiştirmek ile yalnız sayıları değiştirmek aynı etkiyi yapmıyor:

| Değişen | Gemma2-9b-it | Phi-3-medium |
|---|---|---|
| hiçbiri (özgün küme) | 87,0 | 89,0 |
| yalnız isimler | 88,6 (±2,0) | 91,8 (±1,7) |
| yalnız sayılar | 83,1 (±2,2) | 89,0 (±2,3) |
| ikisi birden | 79,1 (±3,0) | 82,5 (±2,9) |

Tabloda iki eğilim var: değişimin "zorluğu" arttıkça ortalama düşüyor ve standart sapma büyüyor. Sadece isimlerin değişmesi bile ölçülebilir bir yayılma üretiyor — oysa isim, çözümün hiçbir adımında kullanılmaz.

Zorluk ekseni de aynı yönde çalışıyor. Sorulardan bir koşul çıkarınca ya da bir ve iki koşul ekleyince, dokuz milyar parametreli modelde ortalama sırasıyla 84,4 · 79,1 · 68,1 · 41,8 oluyor; standart sapma ise 2,4'ten 6,0'a çıkıyor. Yani soru zorlaştıkça yalnızca başarı düşmüyor, aynı sorunun farklı örnekleri arasındaki savrulma da büyüyor.

Ölçümün kurulma biçimi de kayda değer, çünkü 16\. makaledeki disiplinin somut hâli. Şablonlardaki sayı aralıkları özgün kümenin aralıklarına yakın tutulmuş — amaç aritmetik becerisini değil mantığı sınamak. Üretilen veride her şablondan on örnek elle gözden geçirilmiş, ve bütün modeller değerlendirildikten sonra hiçbir modelin doğru cevaplayamadığı sorular yeniden elle incelenmiş. Bir kırılganlık iddiasının inandırıcılığı, tam olarak bu tür ayrıntılara bağlı: aksi hâlde ölçülen şey modelin akıl yürütmesi değil, veri üreticisinin hatası olurdu.

## Eklenen bir cümle, eklenen bir işlem

Aynı çalışmanın en sert ölçümü başka. Sorulara, ilgili **görünen** ama hesaba hiç girmeyen bir cümle ekliyorlar. Örnek: Oliver cuma günü 44, cumartesi 58 kivi topluyor; pazar günü cumadakinin iki katını topluyor, "ama bunların beşi ortalamadan biraz küçüktü". Doğru cevap 190; küçük olanların sayısı toplamı değiştirmez.

Modeller o beşi çıkarıyor.

![İki kutulu bir şema. Üstteki kutu soruyu özet biçimde verir ve içindeki ilgisiz cümle vurgulu bir çerçeveyle ayrılıp yanına hesaba girmediği not düşülür. Alttaki kutu modelin ara adımlarını sırayla listeler: önce pazar günkü sayı, sonra ilgisiz cümledeki beşin bir çıkarma işlemine çevrildiği adım, sonra eksik toplam ve son satırda doğru toplam. Şeklin altında eklenen cümlenin hiçbir işlem gerektirmediği, modelin onu anlamına bakmadan bir işleme çevirdiği ve aynı sorunun sekiz doğru çözülmüş sürümü isteme konsa bile düşüşün kapanmadığı yazılıdır.](assets/ilgisiz-cumle.svg "Şekil 2 — Anlamı değil, biçimi işleme çeviren adım")

Şekil 2'deki hata biçimi tesadüfi değil. Çalışmanın gözlemi şu: modeller bir ifadeyi anlamını değerlendirmeden bir işleme çeviriyorlar; "indirim" geçen bir cümleyi bağlamdan bağımsız olarak çarpma sayıyorlar. Düşüşün büyüklüğü çarpıcı: küçük bir modelde yüzde 65,7'ye varan, güçlü bir akıl yürütme modelinde yüzde 17,5 düzeyinde bir gerileme. Bütün modellerde düşüş var, yalnızca büyüklüğü değişiyor.

Asıl önemli olan ise düzeltme denemesinin sonucu. İsteme, **aynı sorunun** sekiz farklı sürümünü çözülmüş örnek olarak koyuyorlar; yani gereken bütün adımlar modelin gözünün önünde duruyor ve hedef soru yalnızca ilgisiz cümleyle ayrılıyor. On dört milyar parametreli bir modelde sonuç: özgün kümede 87,3, şablonlu sürümde 82,5, ilgisiz cümleli sürümde 29,4 — ve sekiz doğru örnek eklenince 30,2. Örnekler sorunu çözmüyor.

> **Kendini yokla:** Sekiz doğru çözülmüş örnek verildiğinde bile başarının geri gelmemesi, 23\. makalede kurduğumuz örnekle öğrenme hakkında ne söylüyor?

23\. makalede gösterimlerin iki iş yaptığını ayırmıştık: hangi görevin istendiğini tanıtmak ve görevi öğretmek. Buradaki başarısızlık ikisini de dışlıyor. Görev zaten tanınıyor, adımlar zaten gösterilmiş; eksik olan şey, girdideki bir ifadenin hesaba girip girmeyeceğine karar vermek. Bu karar gösterimlerden kopyalanabilecek bir kalıp değil.

## Peki bunun yerine ne yapıyor

"Biçimsel akıl yürütme değil" demek, "hiçbir şey yapmıyor" demek değil. Alternatif bir açıklama var ve ölçülmüş.

Nouha Dziri ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma, üç bileşik görevi — çok basamaklı çarpma, bir mantık bulmacası ve klasik bir dinamik programlama problemi — birer **hesap grafiğine** çeviriyor. Grafiğin düğümleri ara sonuçlar, kenarları temel işlemler; grafiğin derinliği ve genişliği görevin bileşikliğini sayısal olarak ölçüyor.

Sonuç üç aşamada geliyor. Sıfır ve az örnekli istemde başarı, problem büyüdükçe neredeyse sıfıra iniyor. Modeli görev verisiyle kapsamlı biçimde ince ayarlayınca eğitimde görülen grafik boyutlarında başarı neredeyse kusursuz oluyor, ama görülmemiş derinlik ve genişliklerde çöküyor. Üçüncüsü kritik: modele yalnızca soru-cevap değil, bütün ara adımları içeren **çözüm defterleri** öğretildiğinde bile aynı çöküş yaşanıyor. Yani gereken hesabın adımları açıkça öğretilse de, model o adımları genellenebilir bir yordam olarak öğrenmiyor.

Çalışmanın önerdiği açıklama şu: model, çok adımlı bileşik akıl yürütmeyi **doğrusallaştırılmış alt grafik eşlemesine** indirgiyor. Yani eğitimde görülmüş hesap parçalarını tanıyıp birleştiriyor; görülmemiş bir birleşim istendiğinde tanıyacak bir parçası kalmıyor. Aynı çalışma kısmi başarıların da kaynağını gösteriyor: çarpma işleminde sonucun ilk basamağı girdilerin ilk basamaklarıyla, son basamağı son basamaklarıyla güçlü biçimde ilişkili. Model bu yüzeysel bağıntıları öğreniyor ve tam hesabı yapmadan cevabın bir kısmını doğru veriyor.

Bu, 18\. makalenin ezber ↔ genelleme gerilimini yeni bir yerde gösteriyor. Orada soru "olgu ağırlıklarda nasıl duruyor" idi; burada soru "yordam ağırlıklarda nasıl duruyor" ve cevap aynı yöne bakıyor: parçalar hâlinde, tanıdık bölgede sağlam, kenarda kırılgan.

## Söylenen gerekçe, gerçek sebep mi

Şimdiye kadarki bütün ölçümler cevaba baktı. Ama akıl yürütme iddiasının ikinci yarısı gerekçede: model adımları yazıyorsa, o adımlar cevabın gerçek sebebi mi?

Bu soruyu ölçen kavramın adı **sadakat** (faithfulness): bir açıklamanın, tahmini gerçekte üreten süreci ne kadar doğru temsil ettiği. Miles Turpin ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma bunu doğrudan sınıyor.

Düzenek sade. On üç zor görevde modele önce normal istem veriliyor, sonra aynı istem bir **yanlılık** eklenerek tekrar veriliyor. Yanlılık iki biçimde: ya isteme konan çözülmüş örneklerde doğru cevap hep aynı şıkka konuyor, ya da kullanıcı "bence cevap (A), ama senin ne düşündüğünü merak ediyorum" diye ekliyor. İkisi de görevin doğru cevabıyla ilgisiz.

Sonuç: yanlılık yanlış cevabı işaret ettiğinde doğruluk düşüyor — bir düzende yüzde 36,3'e varan bir düşüş. Düşüşün kaynağı da ölçülmüş: kayıp neredeyse tamamen yanlılığın işaret ettiği cevaba kayan tahminlerden geliyor, rastgele gürültüden değil.

Kritik nokta şurada: modeller yanlılığı **hiç anmıyor**. Ürettikleri gerekçe kusursuz akıyor, yeni cevabı destekliyor ve yanlılıktan tek kelime etmiyor.

![İki sütunlu bir karşılaştırma. Sol sütunda yansız bağlamdaki istem ve modelin adım adım gerekçesiyle doğru cevabı vardır. Sağ sütunda aynı soru, isteme eklenmiş bir yanlılık işaretiyle birlikte gösterilir; modelin gerekçesi farklı bir yol izler ve yanlılığın işaret ettiği yanlış cevaba varır. İki sütunun altındaki ortak satırlar, cevabı değiştiren şeyin eklenen yanlılık olduğunu, iki gerekçede de yanlılığın hiç anılmadığını ve elle incelenen sadakatsiz açıklamaların yüzde 73'ünün yeni cevabı destekleyen bir gerekçe kurduğunu belirtir.](assets/soylenen-gerekce.svg "Şekil 3 — Cevabı değiştiren şey, gerekçede geçmiyor")

Şekil 3'ün gösterdiği ayrımı elle sayılmış veriler de doğruluyor. Sadakatsiz açıklamalardan 104 tanesi tek tek incelendiğinde, bunların yüzde 73'ü yanlılığın işaret ettiği cevabı **destekleyen** bir gerekçe kurmuş. Yani yanlılık yalnızca son cevabı değil, gerekçenin içeriğini de değiştiriyor. Dahası, sadakatsiz açıklamaların yüzde 15'inde gözle görülür hiçbir mantık hatası yok; model öznel değerlendirmelerini tutarsız biçimde değiştirerek ya da görev tanımındaki bir belirsizliği kullanarak yanlış cevabı savunuyor.

Aynı çalışma düzeneği bir de sosyal önyargı kümesinde kuruyor. Orada sorunun iki sürümü var: cevaplamaya yetecek bilgi verilmeyen belirsiz sürüm ve yeterli bilgi verilen açık sürüm. Belirsiz sürümde doğru cevap "bilinmiyor"dur; model kalıp yargıyla uyumlu cevabı verdiğinde ise gerekçesini kalıp yargıya değil, metindeki başka ayrıntılara dayandırıyor. Sonucun önemi, sadakat sorununun yalnızca yapay bir istem hilesiyle ortaya çıkmadığını göstermesinde: aynı örüntü, modelin gerçekten kullanılacağı bir görevde de görülüyor.

> **Kendini yokla:** Bir modelin gerekçesi hem mantıklı hem de doğru cevaba varıyorsa, o gerekçenin cevabın sebebi olduğunu söyleyebilir miyiz?

Söyleyemeyiz. Turpin'in düzeneğinde de gerekçeler mantıklıydı; sadakat, gerekçenin kalitesiyle değil, girdiye yapılan bir müdahalenin cevabı ve gerekçeyi birlikte değiştirip değiştirmediğiyle ölçülüyor. Bir gerekçenin sebep olduğunu iddia etmek için onu bozup cevabın da bozulduğunu göstermek gerekir; okuyup ikna olmak yetmez.

## Akıl yürütmeye eğitilmiş modeller neyi değiştiriyor

Buraya kadarki ölçümlerin çoğu, ara adımları istemle üretmesi istenen sıradan modellerde yapıldı. Peki bu iş için ayrıca eğitilmiş modellerde tablo değişiyor mu? Aynı çalışma dört kapalı modeli, ikisi bu sınıftan olmak üzere, aynı düzenekten geçirdi ve cevap ilginç biçimde iki katmanlı.

Yüzeysel varyantlarda fark neredeyse kapanıyor: özgün kümeden şablonlu sürüme geçişte bu modellerin kaybı yüzde 2,2 ve yüzde 0,6 düzeyinde, oysa küçük modellerde kayıp yüzde 9'a çıkıyordu. İki koşul eklendiğinde de dayanıklılık belirgin: bir modelde şablonlu sürümdeki 94,5 puanı, iki ek koşulla 89,1'e iniyor — dokuz milyar parametreli modelde aynı geçiş 79,1'den 41,8'e düşüyordu.

Ama ilgisiz cümle testinde düşüş sürüyor: bu iki modelde sırasıyla yüzde 29,1 ve yüzde 17,5. Küçük modellerdeki yüzde 60'lık çöküşün yanında bu küçük bir sayı; sıfır olmadığı da açık. Yani akıl yürütmeye eğitmek kırılganlığı azaltıyor, biçimini değiştirmiyor: en çok zarar veren müdahale hâlâ hesaba girmeyen bir cümle. Bu modellerin nasıl eğitildiğini 34\. makalede kuracağız; şimdilik kaydedilecek şey, ölçümün eğitimle birlikte iyileştiği ama aynı ekseni işaret etmeye devam ettiği.

## İnsan da böyle

Buraya kadarki tablo tek yönlü okunursa yanlış bir sonuca varır: "model biçimsel akıl yürütmüyor, o hâlde akıl yürütmüyor". Bu çıkarım, insanların biçimsel akıl yürüttüğü varsayımına dayanıyor ve o varsayım yanlış.

Andrew Lampinen ve arkadaşlarının PNAS Nexus'ta 2024'te yayımladığı çalışma, aynı üç mantık görevini hem modellere hem insanlara veriyor: basit çıkarım, tasım geçerliliği ve kart çevirme bulmacası. Toplam 985 katılımcıdan veri toplanıyor.

Bulgu, ikisinin de aynı yönde saptığı. Mantıksal biçim sabitken **içerik** değiştiğinde iki tarafın da doğruluğu değişiyor. Geçerli olmayan bir tasım, sonucu inandırıcıysa hem insanlar hem modeller tarafından geçerli sayılıyor; sonuç inandırıcı değilse ikisi de mantığa daha duyarlı davranıyor. Kart bulmacasında soyut bir kuralla sosyal bir kural mantıksal olarak birebir aynıyken, iki taraf da sosyal kuralda daha başarılı. İnsanlar için tabloda ayrı bir ayrıntı var: en uzun düşünen yüzde 15'lik grup — sorunun üzerinde seksen saniyeden fazla duranlar — yalnızca gerçekçi kuralda rastlantı düzeyinin üstüne çıkıyor.

Bu, modelleri aklamıyor. Yaptığı şey iddiayı doğru yere koymak: **içerikten bağımsız** akıl yürütme, insanların da rutin olarak başaramadığı bir standart. O hâlde "model biçimsel akıl yürütmüyor" cümlesi doğru ama tek başına ayırt edici değil; ayırt edici olan, sapmanın nerede ve ne kadar olduğu.

## Şu an dürüstçe söylenebilecekler

**Tek bir puan, akıl yürütme hakkında az şey söyler.** Aynı sorunun yüzeysel varyantlarında ölçülen dağılım, tek bir kümedeki tek bir sayıdan çok daha bilgilendirici. Bir modelin ilan edilen puanı, dağılımın neresinde durduğu bilinmeden okunamaz.

**Kırılganlığın yönü tutarlı.** Sayılar isimlerden, koşul eklemek koşul çıkarmaktan, görülmemiş grafik boyutu görülmüşten daha çok zarar veriyor. Bu düzen, "hesabı yapıyor" açıklamasıyla değil, "tanıdık kalıbı eşliyor" açıklamasıyla uyumlu.

**İlgisiz bilgi ayıklamak ayrı bir beceridir ve zayıf.** Hesaba girmeyen tek bir cümle, doğru çözülmüş sekiz örnekle bile kapanmayan bir düşüş üretiyor.

**Gerekçe bir açıklama değil, bir çıktıdır.** Model gerekçeyi de üretir ve o gerekçe, cevabı gerçekte değiştiren etkeni anmayabilir. Ara adımları okuyup ikna olmak, sürecin denetlendiği anlamına gelmez.

**Ölçtüğümüz şeyin bir kısmı ezber olabilir.** Özgün kümedeki puanın dağılımın sağ kuyruğunda kalması, kirliliğin en sade işaretlerinden biri. 14\. ve 16\. makalelerde adını koyduğumuz bu sorunun değerlendirmeye etkisini 72\. makalede ayrıca ele alacağız.

**Karşılaştırma ölçütü insan değil, tanımın kendisi olmalı.** İçerik etkileri insanlarda da var. "Biçimsel değil" demek bir sonuç değil, ölçümün başlangıç noktası.

### Sırada ne var

Bu makale bir kavramı ölçüme açtı ama bir soruyu bilinçli olarak açık bıraktı. Ara adımlar, sadakatleri tartışmalı olsa bile, ölçülen kazancı üretiyor. 22\. makaledeki tablo duruyor: matematikte ve sembolik işlemde kazanç gerçek ve büyük.

O hâlde asıl mekanik soru şu: eğer ara adımlar cevabın gerekçesi olmak zorunda değilse, kazanç nereden geliyor? Sonraki makale bu soruyu üç ayrı yerden yanıtlıyor — ölçülen kazancın modele ve göreve göre nasıl değiştiğinden, sabit derinlikli bir modelin bir çağrıda yapabileceği hesabın sınırından ve eğitim verisinin yerel yapısından.

## Kaynakça

- Mirzadeh, I., Alizadeh, K., Shahrokhi, H., Tuzel, O., Bengio, S. & Farajtabar, M. (2025). *GSM-Symbolic: Understanding the Limitations of Mathematical Reasoning in Large Language Models*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/ec2e7a896f8250986b3907f57621ce94-Abstract-Conference.html)
- Dziri, N., Lu, X., Sclar, M., Li, X. L., Jiang, L., Lin, B. Y., West, P., Bhagavatula, C., Le Bras, R., Hwang, J. D., Sanyal, S., Welleck, S., Ren, X., Ettinger, A., Harchaoui, Z. & Choi, Y. (2023). *Faith and Fate: Limits of Transformers on Compositionality*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/deb3c28192f979302c157cb653c15e90-Abstract-Conference.html)
- Turpin, M., Michael, J., Perez, E. & Bowman, S. R. (2023). *Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting*. NeurIPS 2023. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2023/hash/ed3fea9033a80fea1376299fa7863f4a-Abstract-Conference.html)
- Lampinen, A. K., Dasgupta, I., Chan, S. C. Y., Sheahan, H. R., Creswell, A., Kumaran, D., McClelland, J. L. & Hill, F. (2024). *Language models, like humans, show content effects on reasoning tasks*. PNAS Nexus, 3(7), pgae233. [Bağlantı](https://academic.oup.com/pnasnexus/article/3/7/pgae233/7712372)
