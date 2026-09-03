---
article_id: article_494762df-8293-487d-863a-ba2be95c1913
title: "Parçalama, Yeniden Sıralama ve RAG Hattının İncelikleri"
slug: parcalama-yeniden-siralama-ve-rag-hattinin-incelikleri
category: agents-and-retrieval
level: intermediate
reading_order: 44
summary: "Getirme hattının görünmez kararlarını tek tek ölçüme vurur: dizine ne konacağı — parça, cümle ya da önerme — sorgunun dizine gitmeden önce nasıl yeniden yazıldığı, adayların bir dil modeliyle nasıl yeniden sıralandığı, kaç parçanın istemin neresine konacağı, getirilen metnin nasıl sıkıştırıldığı ve uzun pencerenin getirmeyi neden gereksiz kılmadığı; her kararın ölçülen kazancını ve bedelini gösterir."
tags:
  - parcalama
  - sorgu-yeniden-yazma
  - yeniden-siralama
  - baglam-yerlesimi
  - rag-hatti
content_hash: sha256:1331988bd31eddfd36483d64f146c4ac9e8b66c1e92f7bfa2c8fe78824a23182
classification_version: 1
classification_batch: 10
---
## Görünmez kararlar

41\. makale mimariyi kurdu: getirici, dizin, üretici. 42\. makale getiricinin içini, 43\. makale dizinin içini açtı. Ama bu üç makale boyunca hattın başındaki ve sonundaki kararları hep hazır kabul ettik. Dizine konan şey yüz kelimelik parçalardı — neden yüz? Sorgu dizine olduğu gibi gönderiliyordu — neden? Getirilen beş parça istemin başına konuyordu — neden beş, neden başa?

29\. makale bunlardan birini açıkça borç bırakmıştı: metnin nereden kesileceği "başlı başına bir tasarım kararı"ydı ve getirme hattının ayrı bir konusuydu. Bu makale o borcu ve yanındakileri ödüyor. Bir getirme hattı, birbirine bağlı beş kararın toplamıdır: parçalama, sorgu, getirme, yeniden sıralama, yerleştirme. Her birinin ölçülmüş bir etkisi var ve her biri bir bedel taşıyor.

Xiaohua Wang ve arkadaşlarının EMNLP 2024'te sunduğu çalışma bu kararları modül modül taradı ve makalenin çerçevesini veriyor: hattı sabit tut, bir modülü değiştir, ölç. Getirmesiz bir modelin beş görevdeki ortalama puanı 0,351; en iyi hat 0,446. Bu makale o farkın nereden geldiğini, karar karar açıyor.

## Dizine ne konur

İlk karar, belgenin nereden kesileceği. Alandaki adı **parçalama** (chunking) ve birimi **parça** (chunk). 41\. makaledeki mimari Wikipedia'yı yüz kelimelik ayrık parçalara bölmüştü; bu bir ölçüm sonucu değil, bir başlangıç noktasıydı.

Neden önemli olduğunu 29 ve 39\. makalelerden biliyorsun. İkili kodlayıcı belgeyi sorgu bilinmeden kodlar; tek bir vektör, o parçaya sorulabilecek bütün soruları aynı anda temsil etmek zorundadır. Parça büyüdükçe taşıması gereken soru sayısı artar ve 29\. makaledeki kapasite sınırına yaklaşır. 39\. makaledeki ayrımla söylersek: parça hem **anahtardır** — onunla aranır — hem **değerdir** — istemine konur. İyi bir anahtar küçük ve odaklıdır; iyi bir değer ise cevabı taşıyacak kadar geniş. Bu iki istek birbiriyle çelişir ve parçalama kararı bu çelişkinin çözümüdür.

Tong Chen ve arkadaşlarının EMNLP 2024'te sunduğu çalışma bu ödünleşimi üç birimle ölçtü. Aynı Wikipedia üç biçimde dizinlendi: 41 milyon parça (ortalama 58,5 kelime), 114 milyon cümle (21,0 kelime) ve 257 milyon **önerme** (proposition, 11,2 kelime). Önerme, çalışmanın tanımıyla metindeki atomik ifadedir: her biri tek bir olguyu, kendi başına anlaşılır ve kısa bir cümleyle taşır. 17\. makaledeki atomik olguyu hatırlıyorsun — orada uzun metni denetlenebilir en küçük birimlere ayırmak için kurulmuştu; burada aynı birim getirme için kullanılıyor. "Kule şu anda 3,99 derece eğik duruyor" gibi bir önerme, "kule" yerine "Pisa Kulesi" yazacak kadar kendine yeter.

Ölçü, ilk beş sonuç içinde doğru parçayı bulma oranı; beş soru-cevap kümesinin ortalaması:

| getirici | parça | cümle | önerme |
|---|---|---|---|
| Contriever (denetimsiz) | 43,0 | 47,3 | 52,7 |
| SimCSE (denetimsiz) | 34,3 | 40,9 | 46,3 |
| DPR (parça çiftleriyle eğitilmiş) | 57,3 | 59,2 | 59,9 |
| GTR (parça çiftleriyle eğitilmiş) | 65,2 | 66,7 | 68,0 |

![Dört satırlı, üç sütunlu bir yatay çubuk şeması. Her satırda solda bir getiricinin adı, ortada üst üste üç çubuk, sağda üç değer vardır; çubuklar sırasıyla parça, cümle ve önerme birimiyle ilk beşte bulma oranını gösterir ve önerme çubuğu vurgulu renktedir. Değerler yukarıdan aşağıya 43,0, 47,3, 52,7; 34,3, 40,9, 46,3; 57,3, 59,2, 59,9; 65,2, 66,7, 68,0 olarak yazılıdır. İlk iki satırda üç çubuk arasındaki fark belirgin, son iki satırda küçüktür. Şeklin sağında üç satırlık bir gösterge, üç birimin ortalama kelime sayısını verir: parça 58,5, cümle 21,0, önerme 11,2. Şeklin altında birim küçüldükçe bulma oranının arttığı, farkın parça çiftleriyle eğitilmiş getiricilerde daraldığı yazılıdır.](assets/uc-birim-uc-bulma-orani.svg "Şekil 1 — Aynı getirici, üç birim")

Şekil 1'de iki şey görünüyor. Birincisi, birim küçüldükçe bulma oranı artıyor: denetimsiz getiricilerde önerme, parçaya göre 12,0 ve 9,3 puan kazandırıyor — yüzde 35,0 ve 22,5 göreli artış. İkincisi, fark parça çiftleriyle eğitilmiş getiricilerde daralıyor; DPR kendi eğitildiği kümelerde parçayla neredeyse aynı sonucu veriyor. Ama o getiricilerin eğitimde görmediği kümelerde önerme yine açık farkla önde: bir varlık sorusu kümesinde DPR'ın bulma oranı göreli olarak yüzde 25 artıyor. 42\. makaledeki alan dışı dersi burada da geçerli — eğitim dağılımına uyan birim, dağılım değişince avantajını kaybediyor.

Getirme tamam; peki cevap? Aynı çalışma getirilen birimleri aynı token bütçesiyle bir okuyucu modele veriyor. Contriever ile ilk beş sonuçtan tam eşleşme doğruluğu parçayla 24,9, cümleyle 27,6, önermeyle 31,1. Küçük birim yalnızca daha iyi bulunmuyor, aynı bütçeye daha çok cevap sığdırıyor — çünkü istemin her token'ı bir olguya harcanıyor, dolgu metnine değil.

> **Kendini yokla:** Parçayı küçültmek getirmeyi neden kolaylaştırır ve aynı anda cevabı neden zorlaştırabilir?

Küçük parça iyi bir anahtardır: tek bir vektörün taşıması gereken soru sayısı azalır, sorguyla eşleşme keskinleşir. Ama aynı parça kötü bir değer olabilir: cevabın gerektirdiği bağlam — "kule" hangi kule, "o yıl" hangi yıl — kesilen sınırın dışında kalır. Önerme bu sorunu kendine yeterlik koşuluyla çözer; başka bir çözüm de anahtarla değeri ayırmaktır.

O ayrımın adı **küçükle ara, büyüğü döndür** (small-to-big): dizine küçük parçalar konur, eşleşen küçük parçanın içinde bulunduğu büyük parça isteme verilir. Wang ve arkadaşlarının tek belge üzerindeki ölçümünde 175 token'lık parçalarla arayıp 512 token'lık parçaları döndürmek, düz parçalamaya göre cevabın kaynağa sadakatini artırıyor; komşu cümleleri de kapsayan **kayan pencere** (sliding window) parçalama ise hem sadakati hem ilgililiği artırarak en iyi sonucu veriyor. Aynı çalışma parça büyüklüğünü de taradı: 2.048 token'lık parçalarla cevabın kaynağa sadakati 80,4 iken 512 token'da 97,6'ya çıkıyor, 128 token'da 95,7'ye geriliyor. Bu sayılar tek bir belge ve model eliyle üretilmiş 170 soru üzerinden, bir dil modelinin puanlamasıyla ölçüldü; eğilim öğretici, tam değerler değil.

Bir de sınırı dürüstçe kesmek fikri var: paragraf ya da anlam bütünlüğüne göre bölen **anlamsal parçalama** (semantic chunking), sabit uzunlukta kesen **sabit boyutlu parçalamaya** (fixed-size chunking) karşı. Renyi Qu ve arkadaşlarının NAACL 2025'te sunduğu çalışma bu sezgiyi sınadı ve sonuç sezgiye aykırı. Anlamsal parçalama yalnızca yapay olarak birbirine yapıştırılmış, konu çeşitliliği yüksek belgelerde kazandırıyor — bir soru-cevap kümesinde belge bulma başarısı sabit boyutluyla 43,8 iken anlamsal kesimle 63,9. Gerçek belgelerde tablo dönüyor: bir çok adımlı soru kümesinde sabit boyutlu 90,6, anlamsal 87,4. Kanıt cümlesi düzeyinde fark neredeyse sıfır. Çalışmanın kendi sonucu net: sabit boyutlu parçalama pratik uygulamalar için daha verimli ve güvenilir bir seçim olarak kalıyor, çünkü parçalama stratejisinin etkisi çoğu zaman öteki etkenlerin gölgesinde kalıyor.

## Sorguyu dizine göndermeden önce

İkinci karar, sorgunun dizine hangi biçimde gideceği. Kullanıcının yazdığı cümle, dizindeki belgelere benzemez: kısa, soru biçiminde ve belgelerin dilinden uzaktır. 29\. makaledeki ortak uzay varsayımı burada gerilir — sorgu ve belge aynı haritaya konuyor, ama biri soru biri cevap.

Luyu Gao ve arkadaşlarının ACL 2023'te sunduğu çalışma bu gerilimi tuhaf bir hamleyle çözüyor. Sorguyu dizine göndermek yerine önce bir dil modeline "bu soruyu cevaplayan bir belge yaz" deniyor. Üretilen **varsayımsal belge** (hypothetical document) gerçek değildir, olgusal hatalar içerebilir; ama ilgili bir belgeye *benzer*. Sonra bu belge kodlanır ve dizinde belge–belge benzerliğiyle aranır. Yazarların yorumu, kodlayıcının dar boğazının uydurulmuş ayrıntıları süzen kayıplı bir sıkıştırıcı gibi çalıştığı yönünde. Sonuç, hiçbir ilgililik etiketi kullanmadan alınıyor:

| yöntem | DL19 nDCG@10 | DL20 nDCG@10 |
|---|---|---|
| BM25 | 50,6 | 48,0 |
| Contriever (denetimsiz) | 44,5 | 42,1 |
| varsayımsal belgeyle Contriever | 61,3 | 57,9 |
| Contriever (etiketle ince ayarlı) | 62,1 | 63,2 |

Denetimsiz bir getirici, sorgu yeniden yazılınca etiketli veriyle ince ayarlanmış hâline yaklaşıyor. Bedel, her sorguda bir dil modeli çağrısı.

Xinbei Ma ve arkadaşlarının EMNLP 2023'te sunduğu çalışma **sorgu yeniden yazmayı** (query rewriting) daha ileri götürüyor: yeniden yazan küçük bir model, cevabın doğruluğundan türetilen bir ödülle pekiştirmeli öğrenmeyle eğitiliyor — 34\. makaledeki düzen, bu kez bir yardımcı bileşen için. Sayılar iki ders taşıyor:

| küme | getirmesiz | getir-oku | dil modeli yeniden yazar | eğitilmiş yeniden yazar |
|---|---|---|---|---|
| HotpotQA (tam eşleşme) | 32,4 | 30,5 | 32,8 | 34,4 |
| AmbigNQ | 42,1 | 45,8 | 46,4 | 47,8 |
| PopQA | 41,9 | 43,2 | 46,0 | 45,7 |

İlk satır 41\. makaledeki uyarının ta kendisi: çok adımlı sorularda sorguyu olduğu gibi göndermek, getirmesiz cevaptan daha kötü sonuç veriyor. Yeniden yazma bunu tersine çeviriyor. Öteki satırlar ise kazancın mütevazı ama tutarlı olduğunu söylüyor.

## Adayları yeniden sıralamak

Üçüncü karar, 29\. makaleden beri tanıdığımız iki aşamalı düzenin ikinci aşaması. Ucuz getirici yüzlerce aday çıkarır, pahalı bir model yalnızca onları yeniden sıralar. 42\. makalede bu düzenin çapraz kodlayıcıyla alan dışında BM25'i yüzde 11 geçtiğini görmüştük. Yeni olan, o pahalı modelin artık bir dil modeli olabilmesi.

Rodrigo Nogueira ve arkadaşlarının EMNLP 2020 bulguları programında sunduğu çalışma bunun en sade biçimini kurdu. Bir dizi-diziye modeline sorgu ve belge verilir, modelden "doğru" ya da "yanlış" sözcüğünü üretmesi istenir; puan, "doğru" token'ına verilen olasılıktır. 7\. makaledeki logit burada bir ilgililik puanına dönüşüyor. MS MARCO'da BM25'in 0,184 olan ortalama karşılıklı sırası, 220 milyon parametreli modelle 0,381'e, 3 milyar parametreliyle 0,398'e çıkıyor; 340 milyon parametreli bir çapraz kodlayıcı 0,372'de kalıyor.

Weiwei Sun ve arkadaşlarının EMNLP 2023'te sunduğu çalışma bir adım daha atıyor: modele adayları tek tek değil, **liste hâlinde** verip sıralı bir izin listesi üretmesini istiyor. Pencere sınırı yüzünden yirmi aday bir seferde sıralanır ve pencere listenin sonundan başına doğru onar adım kaydırılır. Sonuçlar dikkat çekici — sekiz BEIR kümesinin ortalama nDCG@10 değeri BM25'te 43,4, 3 milyar parametreli ince ayarlı modelde 51,4, GPT-4 ile 53,7. Üstelik yazarlar GPT-4'ün ürettiği sıralamaları 440 milyon parametreli bir öğrenciye damıtıyor ve bu öğrenci BEIR'de 3 milyarlık denetimli modeli geçiyor. 34\. makaledeki damıtma, bu kez bir sıralama davranışı için.

Bedel her sorguda ödenir ve Wang ve arkadaşlarının ölçümü bunu saniye cinsinden veriyor. BM25'in getirdiği bin adayı yeniden sıralamak 220 milyonluk modelle sorgu başına 4,5 saniye, 7 milyarlık bir modelle 82,4 saniye sürüyor; ortalama karşılıklı sıra 0,318 ile 0,324 arasında — kazanç küçük, fatura büyük. Terim ağırlıklarını önceden hesaplayan bir yöntem ise 0,02 saniyede 0,278 veriyor. 28 ve 33\. makalelerdeki muhasebe burada da geçerli: pahalı olanın kaç aday göreceği bir bütçe kararıdır ve sıralama kalitesindeki son birkaç puan, hattın en pahalı saniyeleridir.

## Kaç parça, nereye

Dördüncü karar, adaylar seçildikten sonra başlıyor: kaç tanesi isteme girecek ve nereye?

"Daha çok" cevabı bir dönem doğruydu. Gautier Izacard ve Edouard Grave'in EACL 2021'de sunduğu çalışma, her parçayı kodlayıcıda ayrı ayrı işleyip kod çözücüde birleştiren bir modelle, parça sayısını 10'dan 100'e çıkarınca doğruluğun bir soru-cevap kümesinde yüzde 6, ötekinde yüzde 3,5 arttığını ölçtü. Yazarların notu önemli: cevabı belgeden kesip alan modeller 10–20 parçada tepe yaparken, üreten model yüz parçadan yararlanmaya devam ediyor.

Ama o mimari parçaları ayrı ayrı okuyordu. Bugünün modelleri getirilen her şeyi tek bir pencereye alıyor ve 21 ile 25\. makalelerde gördüğümüz sorun geri dönüyor. Nelson Liu ve arkadaşlarının Transactions of the Association for Computational Linguistics'te 2024'te yayımlanan çalışması bunu getirme düzeninde ölçtü ve alandaki adını koydu: **ortada kaybolma** (lost in the middle). Deney sade: cevabı içeren tek bir belge, 10, 20 ya da 30 belgelik bir istemin farklı konumlarına yerleştiriliyor. Sonuç U biçimli bir eğri — doğruluk belge en başta ya da en sondayken yüksek, ortadayken düşük. GPT-3.5-Turbo'nun getirmesiz doğruluğu yüzde 56,1, doğru belge tek başına verildiğinde yüzde 88,3; oysa 20 ve 30 belgelik istemlerde doğru belge ortadayken doğruluk yüzde 20'den fazla düşüyor ve en kötü durumda **getirmesiz cevabın altına** iniyor. Uzun pencereli sürüm de kurtarmıyor: aynı belge sayısında 4K ve 16K'lık modellerin eğrileri neredeyse üst üste biniyor.

41\. makalede dikkat dağıtıcı belgeler için andığımız çalışma — Florin Cuconasu ve arkadaşlarının SIGIR 2024 çalışması — konumu da ölçtü. Doğru belge, dikkat dağıtıcı belgelerle birlikte istemin sorguya uzak ucuna, ortasına ya da sorgunun hemen yanına konuyor:

| dikkat dağıtıcı sayısı | uzak | orta | yakın |
|---|---|---|---|
| 0 | 0,564 | 0,564 | 0,564 |
| 4 | 0,275 | 0,286 | 0,380 |
| 8 | 0,264 | 0,227 | 0,375 |

![Üç grup ve üç sütunlu bir yatay çubuk şeması. Her grupta solda dikkat dağıtıcı belge sayısı — sıfır, dört, sekiz — yazılıdır; ortada üst üste üç çubuk doğru belgenin sorguya uzak, orta ve yakın konumundaki doğruluğu gösterir; sağda üç değer durur. İlk grupta üç çubuk aynı uzunluktadır ve değerleri 0,564'tür. İkinci grupta değerler 0,275, 0,286 ve 0,380; üçüncü grupta 0,264, 0,227 ve 0,375'tir ve her iki grupta yakın konumun çubuğu vurgulu renkte ve en uzundur. Şeklin sağında üç satırlık bir gösterge konumları açıklar. Şeklin altında dikkat dağıtıcı sayısı arttıkça doğruluğun düştüğü, doğru belgenin sorguya yakın durmasının kaybın önemli bir kısmını geri aldığı yazılıdır.](assets/dogru-belge-nerede.svg "Şekil 2 — Doğru belge istemin neresinde duruyor")

Şekil 2'nin son satırı iki şeyi birden söylüyor. Sekiz dikkat dağıtıcı, doğru belge ortadayken doğruluğu yarıdan fazla düşürüyor; aynı belgeyi sorgunun yanına koymak kaybın önemli bir kısmını geri alıyor. Yerleştirme bir ayrıntı değil, doğruluğun bileşenidir.

Bu bulgu bir mühendislik kuralına dönüştü. Wang ve arkadaşlarının taradığı **yeniden paketleme** (repacking) seçeneklerinde en ilgili belgeyi listenin sonuna — yani sorgunun hemen yanına — koyan düzen 0,446 ile, ilgiliyi başa koyan 0,437'yi ve ilgilileri iki uca dağıtan 0,443'ü geçiyor. Huiqiang Jiang ve arkadaşlarının ACL 2024'te sunduğu çalışma aynı fikri sıkıştırmayla birleştiriyor: belgeler soruyla ilgililiklerine göre yeniden sıralanıyor, sonra sorudan bağımsız token'lar atılıyor. Bir çok belgeli soru-cevap kümesinde yaklaşık dört kat daha az token'la doğruluk yüzde 21,4'e varan oranda **artıyor**; uçtan uca gecikme 1,4–2,6 kat düşüyor. Daha az metin, daha doğru cevap — çünkü atılan metin dikkat dağıtıcıydı.

## Getirileni sıkıştırmak

Bu son gözlem beşinci kararı doğuruyor: getirilen parçalar isteme olduğu gibi mi girecek, yoksa önce süzülecek mi? 39\. makaledeki özetleyerek taşıma fikri burada getirme hattına uygulanıyor.

Fangyuan Xu, Weijia Shi ve Eunsol Choi'nin ICLR 2024'te sunduğu çalışma iki sıkıştırıcı kuruyor. Çıkarımcı olan, getirilen belgelerden yalnızca işe yarayacak cümleleri seçiyor; özetleyici olan, belgelerden soruya odaklı kısa bir özet üretiyor. İkisi de görev başarısına göre eğitiliyor ve ikisinin de dikkat çekici bir yetkisi var: hiçbir belge yardımcı değilse **boş** dönmek. Yazarlar buna **seçici güçlendirme** (selective augmentation) diyor — 41\. makaledeki uyarlanabilir getirmenin, getirme yapıldıktan sonra devreye giren biçimi.

| istemdeki kanıt | NQ token | NQ tam eşleşme | TriviaQA token | TriviaQA tam eşleşme |
|---|---|---|---|---|
| getirmesiz | 0 | 22,0 | 0 | 49,3 |
| ilk 1 belge | 132 | 33,1 | 136 | 57,8 |
| ilk 5 belge | 660 | 39,4 | 677 | 62,4 |
| çıkarımcı sıkıştırıcı | 37 | 36,6 | 38 | 59,0 |
| özetleyici sıkıştırıcı | 36 | 37,0 | 32 | 58,7 |

Beş belgenin 660 token'ı 36 token'a iniyor — yüzde 6'ya — ve doğruluğun büyük kısmı korunuyor; tek belgelik 132 token'ın verdiğinden daha iyi. Aynı çalışmanın dil modelleme deneyinde bir ayrıntı daha var: ilk bir belgeyi eklemek, ilk beşi eklemekten daha iyi sonuç veriyor. Daha çok metin her zaman daha iyi değil; ilgisiz belge zarar veriyor — 41\. makaledeki ölçümün bir başka yüzü.

Wang ve arkadaşlarının hat taramasında sıkıştırma ortalama puanı 0,441'den 0,446'ya taşıyor; kazanç küçük, ama istem kısaldığı için 26 ve 28\. makalelerdeki maliyet düşüyor. Kararın bedeli de burada: sıkıştırıcının kendisi bir model çağrısıdır.

## Uzun pencere getirmeyi gereksiz kılar mı

Bütün bu incelikleri gereksiz kılacak bir itiraz var: pencere yeterince büyükse belgelerin tamamını koy, hattı unut. 25\. makale pencereyi büyütmenin bedelini anlatmıştı; şimdi iki yolun aynı görevlerde ölçülmüş hâline bakalım.

Peng Xu ve arkadaşlarının ICLR 2024'te sunduğu çalışma, aynı modelleri 4K, 16K ve 32K pencereyle, getirmeli ve getirmesiz, yedi uzun bağlam görevinde karşılaştırdı. 70 milyar parametreli bir modelde 4K pencere artı getirme 36,0 ortalama puan alırken 16K pencere tek başına 36,8 alıyor — dörtte bir pencereyle neredeyse aynı sonuç, çok daha az hesapla. Ama asıl bulgu ötekisi: 32K pencereli model getirmesiz 37,4, getirmeyle 39,6. Uzun pencere getirmenin yerini almıyor; getirme uzun pencereye de kazandırıyor. Sebebi bu makalenin bütünü: pencereye ne konduğu ve nereye konduğu, pencerenin ne kadar büyük olduğundan bağımsız bir doğruluk bileşenidir.

> **Kendini yokla:** Pencereye sığdığı hâlde bütün belgeleri koymak neden getirmeyle seçmekten daha kötü sonuç verebilir?

Çünkü modelin pencerenin tamamını eşit okumadığını ölçtük: ortadaki bilgi kaybolur, dikkat dağıtıcı belgeler doğru cevabı bastırır ve her fazladan token ön dolumun faturasına yazılır. Getirme hattı, pencereye girecek metni seçerek bu üç maliyeti birden düşürür; pencerenin büyüklüğü yalnızca üst sınırı belirler.

## Hattın bütünü

Beş kararı bir araya getirelim. Wang ve arkadaşlarının taraması, her modülü en iyi seçeneğine koyduğunda hattın nasıl göründüğünü ve neye mal olduğunu söylüyor.

![Soldan sağa akan altı kutulu bir hat şeması. Kutular sırasıyla parçalama, sorgu yeniden yazma, melez getirme, yeniden sıralama, yeniden paketleme ve sıkıştırma; sonda istem ve model kutusu vardır ve kutular oklarla bağlıdır. Her kutunun altında o kararın düğmesi yazılıdır: birim büyüklüğü, varsayımsal belge, sözcük eşleşmesi artı vektör, aday sayısı, en ilgili en sona, boş dönebilir. Şeklin alt bölümünde üç satırlık bir karşılaştırma vardır: getirmesiz model 0,351 puan ve 1,27 saniye; varsayımsal belgesiz tam hat 0,429 puan ve 1,45 saniye; varsayımsal belgeli tam hat 0,446 puan ve 11,7 saniye. Şeklin altında son 0,017 puanın yaklaşık sekiz katlık gecikmeye mal olduğu yazılıdır.](assets/getirme-hatti.svg "Şekil 3 — Beş karar, bir hat: her düğme ve bedeli")

Şekil 3'ün alt satırları bu makalenin ekonomisi. Getirmesiz model beş görevde 0,351 ortalama puan alıyor ve sorguya 1,27 saniyede cevap veriyor. 42\. makalede kurduğumuz melez getirmeyi yeniden sıralama, paketleme ve sıkıştırmayla birlikte çalıştıran hat puanı 0,429'a taşıyor ve gecikmeyi neredeyse hiç değiştirmiyor: 1,45 saniye — bu dördü sorgu başına birer küçük model çağrısı. Üstüne varsayımsal belge eklenince puan 0,443'e, en iyi paketlemeyle 0,446'ya çıkıyor ama gecikme 11,7 saniyeye fırlıyor; sorgu başına bir büyük dil modeli çağrısının bedeli bu. Aynı taramanın önerdiği ilk modül, hattın hiç çalışmaması gerektiğini söyleyebilen bir sınıflandırıcı: soru getirme gerektirmiyorsa doğrudan cevap ver — 41\. makaledeki uyarlanabilir getirmenin hat başındaki karşılığı.

Çalışmanın sınırlarını da söyleyelim, çünkü 16\. makaledeki disiplin bunu gerektiriyor. Tarama belirli bir model ailesi ve belirli kümelerle yapıldı; parça büyüklüğü deneyi tek bir belge üzerinde ve bir dil modelinin puanlamasıyla ölçüldü; kararlar tek tek değiştirildiği için etkileşimleri görünmüyor. Alınacak ders sıralama değil yöntem: her düğme ölçülebilir ve ölçülmelidir.

## Hattın disiplini

**Parça hem anahtar hem değerdir.** Küçük parça iyi aranır, büyük parça iyi cevaplar; ikisini ayırmak — küçükle ara, büyüğü döndür — çelişkiyi çözer.

**Anlamsal kesim ölçülmeden tercih edilmez.** Gerçek belgelerde sabit boyutlu parçalama çoğu zaman aynı ya da daha iyi sonuç veriyor ve daha ucuz.

**Sorgu belgeye benzemez.** Varsayımsal bir belge yazdırmak, denetimsiz bir getiriciyi etiketle ince ayarlanmış hâline yaklaştırıyor; yeniden yazma çok adımlı sorularda getirmenin zararını kazanca çeviriyor.

**Yeniden sıralama saniye cinsinden ölçülür.** Sıralama kalitesindeki son birkaç puan, sorgu başına saniyelerce süren model çağrılarıdır.

**Doğru belge sorguya yakın durmalı.** Ortadaki belge kaybolur; en ilgili belgeyi listenin sonuna koymak ölçülen en ucuz kazançlardan biridir.

**Daha çok metin daha iyi cevap değildir.** Beş belgenin token'larının yüzde 6'sı doğruluğun büyük kısmını taşıyor; atılanlar dikkat dağıtıcıydı.

**Uzun pencere hattı emekliye ayırmıyor.** Dörtte bir pencere artı getirme, tam pencereye yaklaşıyor; getirme en uzun pencereye de kazandırıyor.

### Sırada ne var

Bu makalede her düğmeyi "puan"la ölçtük ve puanın ne olduğunu sormadık. Oysa bir getirme hattı üç ayrı yerde yanlış yapabilir: yanlış belgeyi getirebilir, doğru belgeyi getirip cevabı yine ezberinden verebilir, ya da doğru belgeyi okuyup belgede olmayan bir şey ekleyebilir. Tek bir doğruluk sayısı bu üçünü birbirinden ayırmaz. Bir sonraki makale hattın her katmanını ayrı ayrı ölçmenin yolunu, cevabın kaynağına ne kadar sadık olduğunu nasıl saydığımızı ve ölçümü yapan modelin kendisine ne kadar güvenebileceğimizi ele alıyor.

## Kaynakça

- Wang, X., Wang, Z., Gao, X., Zhang, F., Wu, Y., Xu, Z., Shi, T., Wang, Z., Li, S., Qian, Q., Yin, R., Lv, C., Zheng, X. & Huang, X. (2024). *Searching for Best Practices in Retrieval-Augmented Generation*. EMNLP 2024, s. 17716–17736. [Bağlantı](https://aclanthology.org/2024.emnlp-main.981/)
- Chen, T., Wang, H., Chen, S., Yu, W., Ma, K., Zhao, X., Zhang, H. & Yu, D. (2024). *Dense X Retrieval: What Retrieval Granularity Should We Use?*. EMNLP 2024, s. 15159–15177. [Bağlantı](https://aclanthology.org/2024.emnlp-main.845/)
- Qu, R., Tu, R. & Bao, F. (2025). *Is Semantic Chunking Worth the Computational Cost?*. Findings of NAACL 2025, s. 2155–2177. [Bağlantı](https://aclanthology.org/2025.findings-naacl.114/)
- Gao, L., Ma, X., Lin, J. & Callan, J. (2023). *Precise Zero-Shot Dense Retrieval without Relevance Labels*. ACL 2023, s. 1762–1777. [Bağlantı](https://aclanthology.org/2023.acl-long.99/)
- Ma, X., Gong, Y., He, P., Zhao, H. & Duan, N. (2023). *Query Rewriting in Retrieval-Augmented Large Language Models*. EMNLP 2023, s. 5303–5315. [Bağlantı](https://aclanthology.org/2023.emnlp-main.322/)
- Nogueira, R., Jiang, Z., Pradeep, R. & Lin, J. (2020). *Document Ranking with a Pretrained Sequence-to-Sequence Model*. Findings of EMNLP 2020, s. 708–718. [Bağlantı](https://aclanthology.org/2020.findings-emnlp.63/)
- Sun, W., Yan, L., Ma, X., Wang, S., Ren, P., Chen, Z., Yin, D. & Ren, Z. (2023). *Is ChatGPT Good at Search? Investigating Large Language Models as Re-Ranking Agents*. EMNLP 2023, s. 14918–14937. [Bağlantı](https://aclanthology.org/2023.emnlp-main.923/)
- Izacard, G. & Grave, E. (2021). *Leveraging Passage Retrieval with Generative Models for Open Domain Question Answering*. EACL 2021, s. 874–880. [Bağlantı](https://aclanthology.org/2021.eacl-main.74/)
- Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F. & Liang, P. (2024). *Lost in the Middle: How Language Models Use Long Contexts*. Transactions of the Association for Computational Linguistics 12, s. 157–173. [Bağlantı](https://doi.org/10.1162/tacl_a_00638)
- Cuconasu, F., Trappolini, G., Siciliano, F., Filice, S., Campagnano, C., Maarek, Y., Tonellotto, N. & Silvestri, F. (2024). *The Power of Noise: Redefining Retrieval for RAG Systems*. SIGIR 2024, s. 719–729. [Bağlantı](https://dl.acm.org/doi/10.1145/3626772.3657834)
- Jiang, H., Wu, Q., Luo, X., Li, D., Lin, C.-Y., Yang, Y. & Qiu, L. (2024). *LongLLMLingua: Accelerating and Enhancing LLMs in Long Context Scenarios via Prompt Compression*. ACL 2024, s. 1658–1677. [Bağlantı](https://aclanthology.org/2024.acl-long.91/)
- Xu, F., Shi, W. & Choi, E. (2024). *RECOMP: Improving Retrieval-Augmented LMs with Context Compression and Selective Augmentation*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=mlJLVigNHp)
- Xu, P., Ping, W., Wu, X., McAfee, L., Zhu, C., Liu, Z., Subramanian, S., Bakhturina, E., Shoeybi, M. & Catanzaro, B. (2024). *Retrieval meets Long Context Large Language Models*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=xw5nxFWMlo)
