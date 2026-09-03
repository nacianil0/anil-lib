---
article_id: article_8a7a07df-541b-4526-a51c-180047ba1dd3
title: "RAG Değerlendirmesi: Doğruluk ve Kaynak Sadakati"
slug: rag-degerlendirmesi-dogruluk-ve-kaynak-sadakati
category: agents-and-retrieval
level: intermediate
reading_order: 45
summary: "Bir getirme hattının üç ayrı yerde yanlış yapabileceğini kurar ve her katmanı ayrı ölçmenin yolunu gösterir: cevabın kaynağa sadakatinin ifade ifade nasıl sayıldığını, doğruluk cetvelinin kendisinin nasıl yanılttığını, getirmenin doğruluğu artırırken güvenilirliği neden düşürebildiğini, ilgililik etiketinin hattın sonucuyla neden zayıf ilişkilendiğini, atıfların ne kadarının gerçekten tuttuğunu ve ölçümü yapan modelin hangi yanlılıklarla nasıl düzeltildiğini ölçümlerle anlatır."
tags:
  - rag-degerlendirmesi
  - kaynak-sadakati
  - atif
  - hakem-model
  - olcum-disiplini
content_hash: sha256:66e664c1e5a0e35ceb60fb1ad03b4bde27ac052d8486f7a63294e26d861e3369
classification_version: 1
classification_batch: 10
---
## Tek sayı üç hatayı saklıyor

44\. makale hattın her düğmesini bir "puan"la ölçtü ve puanın ne olduğunu sormadı. Şimdi soruyoruz, çünkü bir getirme hattı üç ayrı yerde yanlış yapabilir ve tek bir doğruluk sayısı bu üçünü birbirinden ayırmaz.

Birinci hata getirmede: doğru belge hiç gelmemiştir. İkinci hata okumada: doğru belge gelmiş, ama model onu okumak yerine ezberinden cevap vermiştir — 41\. makalede bunun ölçülmüş oranını görmüştük, ezber oranı yüzde 20 ile 75 arasında değişiyordu. Üçüncü hata üretimde: model belgeyi okumuş, ama belgede olmayan bir şey eklemiştir. 17\. makalede bu üçüncü türe içsel uydurma demiş ve önemli bir şey söylemiştik: getirme, dışsal uydurmayı içsel uydurmaya çevirir, yani sorunu **denetlenebilir** hâle getirir. Bu makale o denetimin nasıl yapıldığını anlatıyor.

Üç soru var. Her katmanı nasıl ayrı ölçeriz? Cevabın kaynağa bağlılığını — bu seride **kaynak sadakati** (groundedness) diyeceğiz; 31\. makalede bir açıklamanın sadakatinden söz etmiştik, sözcük aynı, nesne bu kez cevabın önündeki belge — nasıl sayarız? Ve ölçümü çoğu zaman bir dil modeli yaptığına göre, cetvele ne kadar güvenebiliriz?

## Üç katman, üç ölçü

Shahul Es ve arkadaşlarının EACL 2024 sistem gösterimleri programında sunduğu çerçeve, hattı üç ölçüye ayırıyor ve üçü de aynı ilkeye dayanıyor: insan etiketi olmadan, yalnızca soru, getirilen bağlam ve cevaba bakarak ölçmek.

**Kaynak sadakati.** Cevap önce ifadelere ayrılır — 17\. makaledeki atomik olgu düzeneğinin aynısı: uzun bir cümle, her biri tek başına denetlenebilir kısa iddialara bölünür. Sonra her ifade için tek bir soru sorulur: bu, getirilen bağlamdan çıkarılabiliyor mu? Sadakat, desteklenen ifadelerin bütün ifadelere oranıdır. Dört ifadeli bir cevabın üçü bağlamda destekleniyorsa sadakat 0,75; dördüncü ifade doğru bile olsa — modelin ezberinden gelmiş olabilir — sayılmaz, çünkü ölçülen şey doğruluk değil, kaynağa bağlılıktır.

**Cevap ilgililiği** (answer relevance). Cevap soruyu gerçekten karşılıyor mu, yoksa konunun etrafında mı dolaşıyor? Çerçeve bunu tersten ölçüyor: cevaptan olası sorular üretilir ve bunların asıl soruya benzerliğine bakılır. Eksik ya da gereksiz bilgi taşıyan cevap, asıl sorudan uzak sorular üretir.

**Bağlam ilgililiği** (context relevance). Getirilen parçaların ne kadarı soruya gerçekten gerekli? Uzun bir bağlamın yalnızca iki cümlesi soruyla ilgiliyse, geri kalanı 44\. makaledeki dikkat dağıtıcı yüktür.

![Soldan sağa akan üç kutulu bir hat şeması. Kutular getirme, okuma ve üretimdir; en sağda cevap kutusu vardır ve kutular oklarla bağlıdır. Her kutunun üstünde o katmanın tipik hatası yazılıdır: getirme için yanlış belge, okuma için belgeyi yok sayıp ezberden cevaplama, üretim için belgede olmayan ekleme. Her kutunun altında o katmanı ölçen ölçü yazılıdır: getirme için bağlam ilgililiği ve bulma oranı, okuma ve üretim için kaynak sadakati, cevap için doğruluk ve cevap ilgililiği. Şeklin altında tek bir doğruluk sayısının üç hatayı birbirinden ayırmadığı, her katmanın kendi ölçüsüyle ölçüldüğü yazılıdır.](assets/uc-katman-uc-hata.svg "Şekil 1 — Hattın üç katmanı, üç hatası, üç ölçüsü")

Şekil 1'deki ayrımın işe yaradığı ölçülmüş. Yazarlar iki insan etiketleyicinin karşılaştırmalı kararlarıyla ölçülerin ne kadar uzlaştığına baktı: sadakatte 0,95, cevap ilgililiğinde 0,78, bağlam ilgililiğinde 0,70. Aynı modele "0 ile 10 arasında bir puan ver" demek sırasıyla 0,72, 0,52 ve 0,63 veriyor. Ölçüyü ifadelere ayırmak, tek bir puana indirgemekten belirgin biçimde daha güvenilir — ve sadakat, üç ölçünün en iyi ölçüleni. Sebebi sezgisel: "bu ifade şu metinden çıkıyor mu" sorusu dar ve denetlenebilirdir; "bu cevap iyi mi" sorusu değildir.

## Cevap doğru mu: cetvelin kendisi

Katmanları ayırdık; şimdi en eski soruya dönelim. Cevap doğru mu?

Vaibhav Adlakha ve arkadaşlarının Transactions of the Association for Computational Linguistics'te 2024'te yayımlanan çalışması, bu sorunun cetvelini sınadı. Eski soru-cevap ölçüleri kısa cevaplar için tasarlanmıştı: tam eşleşme, cevabın referansla birebir aynı olmasını ister. Talimat izleyen bir model ise cümleyle cevap verir — "Sorunun cevabı 1896'dır, çünkü…" — ve tam eşleşme bunu yanlış sayar. Yazarlar 1.800 model cevabını insanlara puanlattı ve otomatik ölçülerin insan kararıyla sıra ilişkisini hesapladı:

| ölçü | insan kararıyla sıra ilişkisi (Kendall τ) |
|---|---|
| tam eşleşme | 27,3 |
| F1 | 40,2 |
| bulma oranı (referansın token'ları cevapta var mı) | 55,6 |
| GPT-4 hakem | 67,5 |

Tam eşleşme, insan kararıyla en zayıf ilişkilenen ölçü. Referansın token'larının cevapta bulunup bulunmadığına bakan basit bir bulma oranı iki kat daha iyi; bir dil modeline sormak en iyisi, ama en pahalısı. Aynı çalışma kaynak sadakati için de ucuz bir cetvel öneriyor: cevabın token'larının ne kadarının bilgi parçasında geçtiği. Bu sayı insan kararıyla 43,4 ilişki veriyor; GPT-4 hakem 55,0 veriyor; cevap ile parça arasındaki F1 ise **negatif** — çünkü uzun ve doğru bir cevap parçadaki her şeyi tekrar etmez ve F1 bunu cezalandırır. 16\. makaledeki ders bir kez daha: cetvel bir tasarım ürünüdür ve neyi ödüllendirdiği ölçülmelidir.

Cetvelin bir başka tasarım kararı, bilmemenin nasıl puanlanacağı. Xiao Yang ve arkadaşlarının NeurIPS 2024 veri kümeleri ve kıyaslamalar programında sunduğu çalışma, her cevabı dört sınıfa ayırıyor — kusursuz, kabul edilebilir, eksik, yanlış — ve bunları 1, 0,5, 0 ve **−1** ile puanlıyor. Yanlış cevap, "bilmiyorum" demekten daha kötüdür; 39\. makaledeki çekimserlik burada bir ölçüye dönüşüyor. Bu cetvelle ölçüldüğünde getirmenin etkisi öğretici:

| düzen | doğru | uydurma | eksik | güvenilirlik |
|---|---|---|---|---|
| yalnızca model | 33,5 | 13,5 | 53,0 | 20,0 |
| web getirmeli hat | 43,6 | 30,1 | 26,3 | 13,4 |

![İki gruplu, üç sütunlu yatay bir çubuk şeması. Her grupta solda düzenin adı — yalnızca model ve web getirmeli hat — ortada üst üste üç çubuk, sağda üç değer vardır; çubuklar doğru, uydurma ve eksik cevap yüzdelerini gösterir ve uydurma çubuğu vurgulu renktedir. Değerler yalnızca model için 33,5, 13,5 ve 53,0; getirmeli hat için 43,6, 30,1 ve 26,3 olarak yazılıdır. Şeklin sağında her düzenin güvenilirlik puanı ayrıca yazılıdır: 20,0 ve 13,4. Şeklin altında getirmenin eksik cevapların yarısını doğruya, öteki yarısını uydurmaya çevirdiği ve uydurma eksi puanla cezalandırıldığı için güvenilirliğin düştüğü yazılıdır.](assets/getirme-ne-degistirdi.svg "Şekil 2 — Getirme doğruyu artırdı, güvenilirliği düşürdü")

Şekil 2 bu makalenin en rahatsız edici tablosu. Getirme, doğru cevapları 33,5'ten 43,6'ya çıkarıyor; ama aynı anda uydurmayı 13,5'ten 30,1'e çıkarıyor. Eksik cevaplar yarıya inmiş; kaybolan "bilmiyorum"ların bir kısmı doğruya, bir kısmı yanlışa dönüşmüş. Yanlış cevap eksi puan aldığı için güvenilirlik 20,0'dan 13,4'e düşüyor. Getirme, çekimser bir modeli kendinden emin bir yanlışçıya çevirebiliyor. Aynı çalışmanın ölçtüğü en iyi endüstri sistemleri bile soruların yalnızca yüzde 63'ünü hiç uydurma yapmadan cevaplıyor.

> **Kendini yokla:** Getirme doğru cevap oranını artırırken güvenilirlik puanı neden düşebilir?

Çünkü cetvel yanlış cevabı eksik cevaptan daha ağır cezalandırıyor ve getirme, "bilmiyorum" diyen soruların bir kısmını yanlış cevaba çeviriyor. Doğru sayısındaki artış, uydurma sayısındaki artışın bedelini karşılamıyor. Hangi cetvelin kullanılacağı bir değer kararıdır: bir sisteme "bilmiyorum" demeyi ne kadar ödüllendirdiğin, onun ne kadar konuşacağını belirler.

## Getirici iyi mi: ilgililik etiketi yetmiyor

Birinci katmanı ölçmek en kolay iş gibi görünüyor: 42\. makaledeki ölçüler elimizde, nDCG'yi ve bulma oranını hesaplarız. Sorun şu ki bu ölçüler bir **ilgililik etiketi** (relevance label) ister ve etiketin kimin için verildiği önemlidir.

Alireza Salemi ve Hamed Zamani'nin SIGIR 2024'te sunduğu çalışma bunu doğrudan ölçtü. Aynı getiriciler için üç etiket kaynağı denendi: belge cevabı içeriyor mu, insan etiketleyicinin işaretlediği kanıt belgesi mi, ve bir dil modeli belgeyi ilgili buluyor mu. Her etiketle hesaplanan getirme ölçülerinin hattın nihai başarısıyla sıra ilişkisine bakıldı:

| etiket kaynağı | NQ | HotpotQA |
|---|---|---|
| belge cevabı içeriyor | 0,35 | 0,36 |
| insan kanıt etiketi | 0,18 | 0,01 |
| dil modeli ilgililik kararı | 0,05 | 0,03 |
| belgenin tek başına üreticiye verdiği sonuç | 0,49 | 0,61 |

Son satır çalışmanın önerisi: her getirilen belgeyi **tek başına** üreticiye ver, çıkan cevap doğru mu bak, sonucu o belgenin etiketi say. Bu etiketle hesaplanan ölçüler hattın başarısıyla belirgin biçimde daha iyi ilişkileniyor: cevabı içerme etiketine göre bir kümede 0,35'e karşı 0,49, ötekinde 0,36'ya karşı 0,61. İnsan kanıt etiketi çok adımlı sorularda neredeyse sıfır ilişki veriyor; çünkü bir belge insan gözüyle "kanıt" olabilir ama üretici onu kullanamıyor olabilir — ya da tersi.

43\. makalenin dersi burada yeniden görünüyor. Orada dizin bulma oranının getirme bulma oranından ayrı olduğunu görmüştük; burada getirme bulma oranı da hattın sonucundan ayrılıyor. Her katmanın kendi ölçüsü var ve bir katmanın ölçüsü bir üst katmanın sonucunu ancak zayıfça tahmin ediyor. 42\. makaledeki etiket yanlılığı uyarısı bunun bir başka yüzüydü: etiket, hangi sistem için verildiyse onun lehinedir.

## Kaynağa sadakat: içsel uydurmayı saymak

Şimdi ikinci ve üçüncü katmana, cevabın kaynağa bağlılığına geliyoruz. Bunu ölçmek için önce ne kadar sık kırıldığını bilmek gerekiyor.

Cheng Niu ve arkadaşlarının ACL 2024'te sunduğu çalışma bunun için bir derlem kurdu: altı modele 2.965 soru-cevap, veriden metne ve özetleme görevi verilmiş, 17.790 cevabın tamamı insan eliyle **parça parça** etiketlenmiş — hangi sözcük öbeği kaynağa aykırı, hangisi kaynakta yok. Uydurma dört türe ayrılıyor: açık çelişki, örtük çelişki, açıkça dayanaksız bilgi, örtük dayanaksız bilgi. İki etiketleyicinin uyuşma oranı yüzde 91,8.

Sayılar, kaynak sadakatinin neden ayrı bir ölçü olduğunu gösteriyor. Bütün cevapların yüzde 43,1'i en az bir uydurma parçası taşıyor. Ama dağılım eşit değil: soru-cevap görevinde 989 sorunun cevaplarında GPT-4'ün 48 cevabı uydurma içerirken 7 milyar parametreli bir modelin 378 cevabı içeriyor — yaklaşık yüzde 5'e karşı yüzde 38. Aynı model ailesinde ölçek büyüdükçe yüz kelime başına uydurma parçası sayısı düşüyor — veriden metne görevi dışında. Ve bir görev türü özellikle zor: yapılandırılmış veriden metin yazarken en iyi model bile yüz kelime başına 0,27 uydurma parçası üretiyor, soru-cevapta 0,06.

Jiawei Chen ve arkadaşlarının AAAI 2024'te sunduğu çalışma aynı soruya dört yetenek üzerinden bakıyor ve dördü de bu makalenin katmanlarına oturuyor. **Gürültüye dayanıklılık** (noise robustness): getirilen belgelerin bir kısmı ilgisizse model doğru olanı bulabiliyor mu? Bir modelin doğruluğu ilgisiz belge oranı sıfırken 96,3, yüzde 80'ken 76,0. **Reddetme** (negative rejection): hiçbir belge cevabı içermiyorsa model susabiliyor mu? Aynı model soruların yalnızca yüzde 24,7'sini açıkça reddediyor; daha esnek bir ölçümle yüzde 45. **Bilgi bütünleştirme** (information integration): cevap iki belgeden parça istiyorsa? Doğruluk 55'e, gürültüyle 34'e düşüyor. **Karşıolgusal dayanıklılık** (counterfactual robustness): belge yanlışsa? Modelin kendi başına yüzde 89 bildiği sorularda, yanlış belge verildiğinde doğruluk yüzde 9'a iniyor; model hatayı yalnızca yüzde 8 oranında fark ediyor.

Son sayı 41\. makaledeki ezber oranının aynadaki görüntüsü. Orada model önündeki belgeyi okumuyordu; burada fazla iyi okuyor ve kendi doğru bilgisini yanlış belgeye teslim ediyor. İki uç da hatadır ve ikisi de aynı eksikliğe işaret eder: modelin kaynağa ne kadar güveneceğini bilmemesi. Bu sorunun kendisi — kaynağın güvenilirliği ve bilginin tazeliği — ileride ayrı bir makalenin konusu.

## Atıf: cümleyi kaynağa bağlamak

Kaynak sadakatinin okuyucuya görünen biçimi **atıftır** (citation): cevaptaki her iddianın yanında, onu destekleyen belgenin işareti. Bu, sadakati ölçülebilir kılmanın en dürüst yolu — ve en kolay kırılanı.

Hannah Rashkin ve arkadaşlarının Computational Linguistics'te 2023'te yayımlanan çalışması önce tanımı sağlamlaştırdı. Bir cümle bir kaynağa **atfedilebilir** (attributable to identified sources) ise, "kaynağa göre, [cümle]" ifadesi doğru olmalıdır. Test bu kadar basit görünüyor, ama iki incelik taşıyor: cümle bağlamı olmadan anlaşılabilir olmalı — "o yıl" hangi yıl? — ve kaynak, cümlenin çıkarımını değil kendisini desteklemelidir. Yazarlar bu testi üç görevde insan etiketleyicilere uygulattı ve tutarlı biçimde uygulanabildiğini gösterdi; çerçeve, sonraki bütün atıf ölçümlerinin dayanağı oldu.

Tianyu Gao ve arkadaşlarının EMNLP 2023'te sunduğu çalışma bu tanımı iki ölçüye çevirdi. **Atıf bulma oranı** (citation recall): cevaptaki ifadelerin ne kadarı, verdiği atıflarla tamamen destekleniyor? **Atıf kesinliği** (citation precision): verilen atıfların ne kadarı gerçekten kendi ifadesini destekliyor? Üç ifadeli bir cevabın ikisi atıflarıyla destekleniyorsa bulma oranı üçte iki; altı atıfın dördü kendi cümlesini destekliyorsa kesinlik üçte iki. Ölçüm, 41\. makaledeki gibi ifade–kaynak çiftini bir model ya da insanla denetleyerek yapılıyor.

| düzen (ChatGPT, uzun cevaplı soru-cevap) | doğruluk | atıf bulma oranı | atıf kesinliği |
|---|---|---|---|
| beş parça isteme, atıf üretimde | 40,4 | 73,6 | 72,5 |
| aynı düzen, yeniden sıralamayla | 40,2 | 84,8 | 81,6 |
| kapalı kitap, atıf sonradan eklenmiş | 38,3 | 26,7 | 26,7 |

Tablonun iki dersi var. Birincisi, atıf sonradan eklenemiyor: model önce ezberinden cevap yazıp sonra kaynak aradığında atıfların dörtte üçü tutmuyor. İkincisi, atıf kalitesi doğruluktan ayrı bir eksen: yeniden sıralama doğruluğu değiştirmezken atıf bulma oranını 73,6'dan 84,8'e çıkarıyor. Açıklama gerektiren sorularda tablo daha kötü — atıf bulma oranı 51,1'e düşüyor.

Bu sayılar laboratuvar sayıları. Nelson Liu, Tianyi Zhang ve Percy Liang'ın EMNLP 2023 bulguları programında sunduğu çalışma, kullanımdaki üretken arama motorlarını ölçtü. Sonuç: üretilen cümlelerin ortalama yalnızca yüzde 51,5'i verdiği atıflarla tamamen destekleniyor; atıfların yüzde 74,5'i kendi cümlesini destekliyor. Ve en öğretici bulgu: atıf kesinliği, kullanıcıların algıladığı faydayla **ters** ilişkili — sıra ilişkisi −0,96. En yararlı görünen sistemler en kötü atıf verenler. Akıcı ve kendinden emin bir cevap, kaynağını tutturan cevaptan daha yararlı görünüyor; 17\. makaledeki uyarının atıf kılığındaki hâli.

Xiang Yue ve arkadaşlarının aynı programda sunduğu çalışma, atıf denetiminin kendisinin bir sınıflandırma görevi olarak ne kadar çözülebildiğini ölçüyor. Üç sınıf: kaynak ifadeyi destekliyor, kaynak yetersiz kalıyor, kaynak ifadeyle çelişiyor. GPT-4, gerçek arama motoru çıktılarında 84,3 F1 ile denetleyebiliyor; ama çelişkiyi yakalamak bütün modeller için en zor sınıf. Kaynağın "yetersiz kaldığını" söylemek kolay, "tersini söylediğini" fark etmek zor.

## Ölçen model ne kadar güvenilir

Bu makaledeki ölçülerin çoğunu bir dil modeli hesaplıyor: ifadeleri ayıran, desteklenip desteklenmediğine karar veren, doğruluğa puan veren model. Alandaki adı **hakem model** (LLM-as-a-judge). 35\. makalede doğrulayıcının yanlış pozitif ve yanlış negatiflerini konuşmuştuk; hakem model de bir doğrulayıcıdır ve aynı iki hatayı yapar. Soru, ne kadar ve hangi yönde.

Lianmin Zheng ve arkadaşlarının NeurIPS 2023 veri kümeleri ve kıyaslamalar programında sunduğu çalışma bunu insanlarla karşılaştırarak ölçtü. İyi haber: iki cevaptan hangisinin iyi olduğuna GPT-4 ile insanlar, beraberlik dışı kararlarda yüzde 85 uzlaşıyor — insanların kendi aralarındaki uzlaşma yüzde 81. Kötü haber üç yanlılık. **Konum yanlılığı** (position bias): iki cevabın sırası değiştirildiğinde hakem aynı kararı veriyor mu?

| hakem | tutarlı karar | ilk sıradakini kayırma |
|---|---|---|
| Claude-v1 | %23,8 | %75,0 |
| GPT-3.5 | %46,2 | %50,0 |
| GPT-4 | %65,0 | %30,0 |

![Üç satırlı, üç sütunlu yatay bir çubuk şeması. Her satırda solda bir hakem modelin adı, ortada üst üste iki çubuk, sağda iki değer vardır; üstteki çubuk iki cevabın sırası değiştirildiğinde hakemin aynı kararı verme oranını, alttaki vurgulu çubuk ilk sıradaki cevabı kayırma oranını gösterir. Değerler yukarıdan aşağıya yüzde 23,8 ve 75,0; 46,2 ve 50,0; 65,0 ve 30,0 olarak yazılıdır. Şeklin sağında iki satırlık bir gösterge çubukları açıklar. Şeklin altında en iyi hakemin bile üç karardan birinde sıraya göre fikir değiştirdiği ve yanlılığın rastgele değil tek yönlü olduğu yazılıdır.](assets/hakem-konum-yanliligi.svg "Şekil 3 — Hakem model cevapların sırasına göre fikir değiştiriyor")

Şekil 3'teki en iyi hakem bile üç karardan birinde sıraya göre fikir değiştiriyor ve yanlılık rastgele değil: ilk sıradaki kayırılıyor. İkinci yanlılık **uzunluk yanlılığı** (verbosity bias): daha uzun cevap, daha iyi görünüyor. Üçüncüsü **kendini kayırma** (self-enhancement bias): hakemin, kendi ürettiği cevapları tercih etme eğilimi. Peiyi Wang ve arkadaşlarının ACL 2024'te sunduğu çalışma konum yanlılığının ne kadar ileri gidebildiğini gösterdi: cevapların sırası uygun seçildiğinde, 13 milyar parametreli bir model 80 sorunun 66'sında ChatGPT'yi geçiyor — hakem ChatGPT'nin kendisiyken. Çözüm mekanik: her karşılaştırmayı iki sırayla da yap, yalnızca iki sırada da aynı çıkan kararı say. Bu iki düzeltme hakemin insanla uzlaşmasını 9,8 ve 14,3 puan artırıyor.

Jon Saad-Falcon ve arkadaşlarının NAACL 2024'te sunduğu çalışma bir adım daha atıyor ve hakemin hatasını **ölçüp düzeltiyor**. Düzen üç aşamalı: alanın belgelerinden sentetik soru-cevap çiftleri üretilir; bu verilerle bağlam ilgililiği, kaynak sadakati ve cevap ilgililiği için üç küçük hakem eğitilir; sonra yaklaşık 150 insan etiketli örnek, hakemin sistematik hatasını kestirmek ve puana bir **güven aralığı** (confidence interval) koymak için kullanılır. Yöntemin adı tahmin destekli çıkarım (prediction-powered inference): hakemin binlerce kararı sayıyı verir, küçük insan kümesi o sayının ne kadar yanıldığını söyler. Sonuç, sistemlerin gerçek sıralamasıyla 0,91 ve 0,97 sıra ilişkisi; genel amaçlı hakem çerçevesinden bağlam ilgililiğinde 0,16 daha yüksek.

> **Kendini yokla:** Hakem model ile insanlar yüzde 85 uzlaşıyorsa insan etiketine neden hâlâ ihtiyaç var?

Çünkü kalan yüzde 15 rastgele değil, tek yönlü: hakem ilk sıradakini, uzun olanı ve kendi üslubunu kayırıyor. Rastgele hata büyük sayılarda sönerdi; yanlı hata sönmez, birikir. Küçük bir insan kümesi bu yanlılığın yönünü ve büyüklüğünü ölçer; düzeltme ve güven aralığı oradan gelir. 16\. makaledeki ders: bir sayıyı değil, o sayının hangi belirsizlikle geldiğini raporlamak.

## Değerlendirmenin disiplini

**Üç katman, üç ölçü.** Getirme, okuma ve üretim ayrı ayrı bozulur; tek bir doğruluk sayısı hangisinin bozulduğunu söylemez.

**Sadakat ifade ifade sayılır.** Cevabı atomik ifadelere ayırıp her birini kaynakla denetlemek, insanla en çok uzlaşan ölçüdür; tek puan istemek uzlaşmayı düşürür.

**Doğruluk cetveli de bir tasarımdır.** Tam eşleşme insan kararıyla zayıf ilişkilenir; yanlış cevaba eksi puan vermek, getirmenin bedelini görünür kılar.

**Getirme çekimserliği yanlışa çevirebilir.** Doğru sayısı artarken uydurma da artıyorsa güvenilirlik düşer; hangisinin ağır bastığı cetvele bağlıdır.

**Getiricinin ölçüsü hattın sonucunu zayıf tahmin eder.** Belgenin tek başına üreticiye ne verdiği, insan kanıt etiketinden çok daha iyi bir ilgililik ölçüsüdür.

**Atıf sonradan eklenemez.** Ezberden yazılıp sonra kaynak aranan cevabın atıflarının dörtte üçü tutmaz; kullanımdaki sistemlerde cümlelerin yarısı desteksizdir.

**Hakem model yanlıdır ve yanlılık ölçülür.** Sırayı değiştirip iki karar iste; küçük bir insan kümesiyle hakemin hatasını kestir ve puana güven aralığı koy.

### Sırada ne var

Bu makale boyunca hattı bir kez çalıştırdık ve sonucunu ölçtük. Ama bazı sorular tek getirmeyle cevaplanamaz: cevabın ilk yarısı bulunmadan ikinci yarısının ne aranacağı bile belli değildir. Model bir belgeyi okuyup "şimdi şunu aramalıyım" diyebilseydi ne olurdu? Ve bu makalenin hakemi hattın dışında duruyordu — cevap üretilirken içeride dursa, model kendi cümlesinin desteklenip desteklenmediğine üretirken karar verse? Bir sonraki makale getirmeyi döngüye alıyor.

## Kaynakça

- Es, S., James, J., Espinosa-Anke, L. & Schockaert, S. (2024). *RAGAs: Automated Evaluation of Retrieval Augmented Generation*. EACL 2024 System Demonstrations, s. 150–158. [Bağlantı](https://aclanthology.org/2024.eacl-demo.16/)
- Adlakha, V., BehnamGhader, P., Lu, X. H., Meade, N. & Reddy, S. (2024). *Evaluating Correctness and Faithfulness of Instruction-Following Models for Question Answering*. Transactions of the Association for Computational Linguistics 12, s. 681–699. [Bağlantı](https://doi.org/10.1162/tacl_a_00667)
- Yang, X., Sun, K., Xin, H., Sun, Y., Bhalla, N., Chen, X., Choudhary, S., Gui, R. D., Jiang, Z. W., Jiang, Z., Kong, L., Moran, B., Wang, J., Xu, Y. E., Yan, A., Yang, C., Yuan, E., Zha, H., Tang, N., Chen, L., Scheffer, N., Liu, Y., Shah, N., Wanga, R., Kumar, A., Yih, W. & Dong, X. L. (2024). *CRAG – Comprehensive RAG Benchmark*. NeurIPS 2024 Datasets and Benchmarks. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/1435d2d0fca85a84d83ddcb754f58c29-Abstract-Datasets_and_Benchmarks_Track.html)
- Salemi, A. & Zamani, H. (2024). *Evaluating Retrieval Quality in Retrieval-Augmented Generation*. SIGIR 2024, s. 2395–2400. [Bağlantı](https://doi.org/10.1145/3626772.3657957)
- Niu, C., Wu, Y., Zhu, J., Xu, S., Shum, K., Zhong, R., Song, J. & Zhang, T. (2024). *RAGTruth: A Hallucination Corpus for Developing Trustworthy Retrieval-Augmented Language Models*. ACL 2024, s. 10862–10878. [Bağlantı](https://aclanthology.org/2024.acl-long.585/)
- Chen, J., Lin, H., Han, X. & Sun, L. (2024). *Benchmarking Large Language Models in Retrieval-Augmented Generation*. AAAI 2024. [Bağlantı](https://doi.org/10.1609/aaai.v38i16.29728)
- Rashkin, H., Nikolaev, V., Lamm, M., Aroyo, L., Collins, M., Das, D., Petrov, S., Tomar, G. S., Turc, I. & Reitter, D. (2023). *Measuring Attribution in Natural Language Generation Models*. Computational Linguistics 49(4), s. 777–840. [Bağlantı](https://doi.org/10.1162/coli_a_00486)
- Gao, T., Yen, H., Yu, J. & Chen, D. (2023). *Enabling Large Language Models to Generate Text with Citations*. EMNLP 2023, s. 6465–6488. [Bağlantı](https://aclanthology.org/2023.emnlp-main.398/)
- Liu, N. F., Zhang, T. & Liang, P. (2023). *Evaluating Verifiability in Generative Search Engines*. Findings of EMNLP 2023, s. 7001–7025. [Bağlantı](https://aclanthology.org/2023.findings-emnlp.467/)
- Yue, X., Wang, B., Chen, Z., Zhang, K., Su, Y. & Sun, H. (2023). *Automatic Evaluation of Attribution by Large Language Models*. Findings of EMNLP 2023, s. 4615–4635. [Bağlantı](https://aclanthology.org/2023.findings-emnlp.307/)
- Zheng, L., Chiang, W.-L., Sheng, Y., Zhuang, S., Wu, Z., Zhuang, Y., Lin, Z., Li, Z., Li, D., Xing, E. P., Zhang, H., Gonzalez, J. E. & Stoica, I. (2023). *Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena*. NeurIPS 2023 Datasets and Benchmarks. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/91f18a1287b398d378ef22505bf41832-Abstract-Datasets_and_Benchmarks.html)
- Wang, P., Li, L., Chen, L., Cai, Z., Zhu, D., Lin, B., Cao, Y., Kong, L., Liu, Q., Liu, T. & Sui, Z. (2024). *Large Language Models are not Fair Evaluators*. ACL 2024, s. 9440–9450. [Bağlantı](https://aclanthology.org/2024.acl-long.511/)
- Saad-Falcon, J., Khattab, O., Potts, C. & Zaharia, M. (2024). *ARES: An Automated Evaluation Framework for Retrieval-Augmented Generation Systems*. NAACL 2024, s. 338–354. [Bağlantı](https://aclanthology.org/2024.naacl-long.20/)
