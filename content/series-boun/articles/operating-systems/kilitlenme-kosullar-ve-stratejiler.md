---
article_id: article_80837c80-ea35-42cd-a1e0-a350f0c7aad9
title: "Kilitlenme: Koşullar ve Stratejiler"
slug: kilitlenme-kosullar-ve-stratejiler
category: operating-systems
level: advanced
reading_order: 31
summary: "Filozoflar makalesinde döngüyü tek bir oku çevirerek kırmıştık ama neden yeterli olduğunu söylememiştik. Bu makale kilitlenmeyi kuram düzeyine taşıyor: dört koşul aynı anda sağlanmadıkça kilitlenme olamaz, dolayısıyla her önleme tekniği bir koşulu hedefler. Ardından kaçınma geliyor — Dijkstra'nın 1965'te kendi kalemiyle yazdığı bankacı algoritması, güvenli ve güvensiz durum ayrımı ve doğruluk makalesindeki azalan ölçünün buradaki karşılığı. Sonra tespit ve kurtarma: kaynak atama grafında döngü aramak tek örnekli kaynaklarda kesin cevap verir, çok örnekli kaynaklarda vermez. Bütün sayılar kaba kuvvetle ya da kendi programımla doğrulandı."
tags:
  - kilitlenme
  - dort-kosul
  - bankaci-algoritmasi
  - kilit-sirasi
  - livelock
content_hash: sha256:ce2e59913eadd265a41952f1f0ac529ff1bff73fb5b1f5c1c18a3f7d3e46233d
classification_version: 1
classification_batch: 10
---
## Döngüyü kırdık, ama neden yeterliydi?

Klasik problemler makalesinde yemek yiyen filozofların kilitlenmesini tek bir hamleyle çözdük: bir filozof çatalları ters sırada alsın, yeter. Beklenenler grafındaki döngü kapanamaz hâle geldi ve kaba kuvvet taraması bunu doğruladı.

Ama o çözüm bir gözleme dayanıyordu, bir kurama değil. Döngünün kilitlenmenin çekirdeğinde olduğunu gördük; döngüyü kırmanın **neden** yeterli olduğunu, hangi koşullar bir araya gelirse kilitlenmenin mümkün hâle geldiğini söylemedik. Bu makale o boşluğu dolduruyor ve ardından dört ayrı stratejiyi sırayla açıyor: önleme, kaçınma, tespit ve kurtarma.

Baştan bir uyarı: kilitlenme, eşzamanlılık hatalarının en ünlüsü ama en sık görüleni değildir. Dört büyük açık kaynak projede (MySQL, Apache, Mozilla, OpenOffice) bulunup düzeltilmiş eşzamanlılık hatalarını inceleyen bir çalışma **105 hata** sayar; bunların **74'ü kilitlenme dışı**, yalnızca **31'i kilitlenmedir**. Kilitlenme dışı hataların yüzde 97'si iki sınıfa girer: **atomiklik ihlali (atomicity violation)** — birlikte yürümesi gereken bir komut dizisinin araya girilerek bölünmesi — ve **sıra ihlali (order violation)** — iki iş parçacığı arasında gereken sıranın zorlanmamış olması. Birincisinin çaresi paylaşılan erişimleri kilit altına almak, ikincisininki koşul değişkeniyle sırayı zorlamaktır; ikisini de önceki iki makalede kurmuştuk. Mülakatta "en sık eşzamanlılık hatası kilitlenmedir" demek, kolayca yanlışlanabilecek bir iddiadır.

## Kilitlenmenin dört koşulu

En küçük kilitlenme iki kilit ve iki iş parçacığıyla kurulur. T1 önce L1'i sonra L2'yi alır; T2 önce L2'yi sonra L1'i alır. Kod tek başına bakıldığında masumdur ve çoğu koşuda **hiçbir şey olmaz**. Ama araya bir bağlam anahtarı doğru anda girerse T1 L1'i, T2 L2'yi tutar ve ikisi de ötekinin tuttuğunu ister.

Bu iki kurulumun bütün erişilebilir durumlarını taradım. Ters sıralı kurulumda **19 erişilebilir durum** var ve içlerinden **yalnızca biri** kilitlenmedir; ikisi de aynı sırayla aldığında erişilebilir **16 durumun hiçbiri** kilitlenme değil. Bu sayılar kaynaktan değil, kendi programımdandır; modelde her iş parçacığı bir kez çalışır (al, al, bırak, bırak) ve durum, bitmiş hâl dahil iki program sayacı ile iki kilidin sahibidir. Sayılar bir şeyi çok net söylüyor: kilitlenme kodun bir özelliği değil, **belirli bir izin** özelliğidir. Yüz koşuda görünmeyip yüz birincide görünmesi bu yüzdendir.

Peki hangi koşullarda mümkün oluyor? Klasik cevap 1971 tarihli bir çalışmadan gelir ve dört maddedir:

- **Karşılıklı dışlama (mutual exclusion):** iş parçacıkları ihtiyaç duydukları kaynak üzerinde dışlayıcı denetim iddia eder — bir kilidi almak budur.
- **Elde tutup bekleme (hold-and-wait):** iş parçacığı kendine ayrılmış kaynakları **tutmaya devam ederken** bir başkasını bekler. Özgün 1971 metni bu koşula *wait for* der; *hold-and-wait* sonraki ders kitaplarının adlandırmasıdır ve mülakatta beklenen ad odur.
- **Önkesmesizlik (no preemption):** kaynak, onu tutan iş parçacığından zorla alınamaz.
- **Döngüsel bekleme (circular wait):** öyle bir zincir vardır ki her iş parçacığı, zincirdeki bir sonrakinin istediği bir kaynağı tutar.

Bu dört koşuldan **herhangi biri sağlanmazsa kilitlenme olamaz.** Cümlenin yönüne dikkat: dördü birden sağlandığında kilitlenme *mümkün* olur, *zorunlu* olmaz — yukarıdaki 19 durumdan yalnızca birinin kilitlenme olması bunun sayısal hâlidir. Bu, doğrudan bir tasarım reçetesi verir: kilitlenmeyi önlemek istiyorsan dört koşuldan **birini** ortadan kaldır. Şekil 1 hem en küçük kilitlenmeyi hem de dört koşulun her birine karşılık gelen kaldırma tekniğini gösteriyor.

![İki panelli şema. Sol panel iki kilitli en küçük kilitlenmeyi çiziyor: T1'den L2'ye bekliyor, L2'den T2'ye sahibi, T2'den L1'e bekliyor ve L1'den T1'e sahibi okları kapalı bir döngü oluşturur; T1 L1'i tutup L2'yi, T2 L2'yi tutup L1'i ister. Sağ panel dört koşulu ve kaldırma yolunu sıralıyor: karşılıklı dışlama, kilitsiz veri yapısı ve CAS; elde tutup bekleme, bütün kilitleri tek seferde almak; önkesmesizlik, deneme kilidiyle geri çekilmek; döngüsel bekleme, küresel kilit sırası koymak. Vurgulu dördüncüsü pratikte en çok kullanılanıdır. Alt satırlar: dördünden biri sağlanmazsa kilitlenme olamaz, dördü birden sağlansa bile olmak zorunda değildir; kaba kuvvet taramasında ters sırada 19 erişilebilir durumun yalnızca 1'i kilitlenme, aynı sırada 16 durumun hiçbiri kilitlenme değil](assets/dort-kosul.svg "Şekil 1 — Dört koşul aynı anda sağlanmalı; her önleme tekniği bir koşulu hedefler")

> **Sesli anlat:** "Kilitlenmenin dört koşulunu say ve her birini kaldırmanın bedelini anlat. Doksan saniye."
>
> İyi bir cevabın omurgası: "Dört koşul aynı anda sağlanmadıkça kilitlenme olamaz: karşılıklı dışlama, elde tutup bekleme, önkesmesizlik ve döngüsel bekleme. Dolayısıyla önleme tekniklerinin her biri bu koşullardan birini hedefler. Karşılıklı dışlamayı kaldırmak, kilit kullanmamak demektir; karşılaştır-ve-değiştir gibi atomik komutlarla kilitsiz veri yapıları yazılabilir ama bunlar zordur ve livelock'a açıktır. Elde tutup beklemeyi kaldırmak, bütün kilitleri tek seferde almak demektir; bunun için hangi kilitlere ihtiyaç duyduğunu önceden bilmen gerekir ve eşzamanlılığı düşürür. Önkesmesizliği kaldırmak, deneme kilidi kullanıp alamazsan elindekini bırakmaktır; gerçek bir önkesme değildir, kendi sahipliğinden geri çekilmedir ve livelock riski getirir. Dördüncüsü, döngüsel beklemeyi kaldırmak, pratikte en çok kullanılanıdır: bütün kilitlere küresel bir sıra koy ve her yerde o sırayla al. Bedeli, sıranın bir sözleşme olması — kod tabanının tamamını bilmeyi gerektirir ve tek bir dikkatsizlik yeter."

## Önleme: dört koşuldan birini kaldırmak

**Döngüsel bekleme** en pratik hedeftir. Kilitler üzerinde **tam bir sıra** tanımlanır ve her kod yolu kilitleri o sırayla alır; sıra korunuyorsa döngü kapanamaz. Büyük sistemlerde tam sıra ağırdır, **kısmi sıra** yeter: Linux'un bellek eşleme kodundaki yorum on ayrı kilit alma grubunu sıralar.

Sıranın koda nasıl geçtiğini küçük bir numara gösteriyor. İki kilidi parametre olarak alan bir fonksiyon düşün; çağıranlardan biri ikisini bir sırayla, öteki ters sırayla verirse fonksiyon "hep önce birinciyi al" kuralını uygulasa bile kilitlenir. Çözüm, sırayı içerikten değil **kilidin adresinden** türetmektir:

```
if (m1 > m2) {          /* yüksekten alçağa adres sırası */
    kilitle(m1);
    kilitle(m2);
} else {
    kilitle(m2);
    kilitle(m1);
}
```

Çekirdek içinde bu kural bir yorum satırı değil, bir tasarım kısıtıdır. xv6'da küresel bir kilit alma sırası vardır: örneğin konsol kesme yordamı, satır sonu geldiğinde bekleyen süreci uyandırmak için konsol kilidini tutarken sürecin kilidini de alır — bu yüzden küresel sırada konsol kilidi süreç kilitlerinden önce gelir. Çekirdeğin en uzun zinciri dosya sistemindedir: bir dosya yaratmak aynı anda dizinin kilidini, yeni dosyanın düğüm kilidini, bir disk bloğu tampon kilidini, disk sürücüsünün kilidini ve çağıran sürecin kilidini tutmayı gerektirir ve kod her zaman bu sırayla alır. Kaynağın kendi saptaması, senkronizasyon makalesinde bıraktığımız ince taneli kilitleme borcunu da kapatıyor: kilitlenme tehlikesi, kilitlemenin ne kadar ince taneli yapılabileceğinin başlıca sınırıdır. Daha çok kilit, daha çok kilitlenme fırsatı demektir.

**Elde tutup bekleme** koşulu, bütün kilitleri tek bir atomik adımda alarak kaldırılır: önce küresel bir "hazırlık" kilidi alınır, kilitler onun altında sırayla alınır, sonra hazırlık kilidi bırakılır. Araya bir bağlam anahtarı giremediği için sıra bile önemsizleşir. Bedeli iki katlıdır: bu yöntem hangi kilitlere ihtiyaç duyulduğunu **önceden** bilmeyi gerektirir — kapsülleme tam da bunu gizler — ve kilitler gerçekten gerektiği anda değil, en başta alındığı için eşzamanlılık düşer.

**Önkesmesizlik** koşulu, bloke eden `kilitle` yerine **deneme kilidi (trylock)** kullanılarak gevşetilir: ikinci kilidi almayı dene, olmazsa birinciyi bırak ve baştan başla. İki iş parçacığı kilitleri farklı sıralarda alsa bile kilitlenme olmaz. Ama yeni bir sorun doğar: ikisi de sürekli deneyip sürekli başarısız olabilir. Bu duruma **livelock** denir — Türkçeye "canlı kilitlenme" diye çevrilir ama bu seride "canlılık" başka bir şeyi, Lamport'un özellik sınıfını adlandırdığı için terimi İngilizce bırakıyorum. Livelock kilitlenme değildir, çünkü iş parçacıkları koşmaya devam eder; ilerleme olmadığı için yine bir canlılık ihlalidir ve üstelik işlemciyi yakar. Çaresi genellikle geri çekilmeden önce rastgele bir gecikme koymaktır. İki uyarı daha: bu yöntem gerçek bir önkesme kurmaz — kaynağı bir başkasından zorla almaz, iş parçacığının **kendi sahipliğinden** düzgünce geri çekilmesini sağlar — ve geri çekilirken yol boyunca ayrılmış bütün kaynakların da bırakılması gerekir.

**Karşılıklı dışlama** koşulunu kaldırmak, kilidi tümüyle terk etmek demektir. Senkronizasyon makalesinde tanıştığımız karşılaştır-ve-değiştir komutu bunu mümkün kılar: bir değeri atomik olarak artırmak için değeri oku, yenisini hesapla ve karşılaştır-ve-değiştir ile yerleştirmeyi dene; araya biri girdiyse başarısız olur ve döngü tekrar dener. Aynı desenle bir listenin başına kilitsiz ekleme yapılabilir. Kilit olmadığı için kilitlenme de olamaz — ama livelock hâlâ mümkündür ve silme, arama gibi işlemleri de kapsayan gerçek bir kilitsiz veri yapısı yazmak, kilidi doğru kullanmaktan çoğu zaman daha zordur.

## Kaçınma: bankacı algoritması

Önleme, bir koşulu yapısal olarak imkânsız kılar. **Kaçınma (avoidance)** ise daha yumuşaktır: koşullar sağlanabilir durumda kalır, ama sistem her tahsis isteğinde "bunu verirsem başım derde girer mi?" diye sorar ve girecekse isteği erteler.

Bunun için sistemin gelecek hakkında bir şey bilmesi gerekir. En basit bilgi, her sürecin **en fazla** ne kadar kaynak isteyeceğidir. Fikri ortaya atan metin, problemi 1965'te bu varsayımla kurar: bellek sayfalarını "ödünç alan" süreçler ve her sürecin önceden bildirdiği bir üst sınır.

Kaynağın kendi örneği şudur. Toplam 100 sayfalık bir bellek var. P1'in en fazla ihtiyacı 80, şu anki borcu 40; P2'nin ihtiyacı 60, borcu 20. Kasada 40 sayfa duruyor ve bu durumda yanlış bir şey yok. Şimdi ikisi de birer sayfa daha istesin ve ikisine de verilsin: borçlar 41 ve 21 olur, kasa 38'e düşer, kalan istekler 39 ve 39'dur. Bu **güvensiz durumdur (unsafe state)**, çünkü iki süreç de tek bir sayfa geri vermeden kalan isteğinin tamamını isteyebilir — ve her biri 39 sayfa isterken kasada 38 vardır.

Güvenlik denetiminin kendisi son derece basittir ve kaynak onu şöyle yazar: kasadaki miktarın **en az bir sürecin** kalan isteğini karşılayıp karşılamadığına bak. Karşılıyorsa o süreç işini bitirebilir demektir; onu bitmiş say, borcunu kasaya geri ekle ve kalan süreçlerle aynı soruyu tekrarla. Sonunda bütün süreçler bitmiş sayılabiliyorsa — yani banker bütün parasını geri alabiliyorsa — durum **güvenlidir (safe state)**.

```
serbest := kasa;
her müşteri için  kuşkulu[i] := doğru;
tekrar:
    öyle bir i ara ki kuşkulu[i] ve kalan_istek[i] ≤ serbest
    bulunursa: kuşkulu[i] := yanlış; serbest := serbest + borç[i]; tekrar
güvenli ancak ve ancak serbest = sermaye
```

Bu yordamın **neden durduğu**, doğruluk makalesinde kurduğumuz azalan ölçü fikrinin birebir uygulamasıdır: her tur en az bir süreci kuşkulu olmaktan çıkarır, kuşkulu süreç sayısı negatif olmayan bir tam sayıdır ve azalır, dolayısıyla yordam sonlanır. Aynı yordamın **şekli** de tanıdıktır: graf algoritmaları makalesindeki gevşetme gibi, elde tutulan bir tahmin (serbest para) tekrar tekrar iyileştirilir ve artık iyileşmediğinde durulur.

Sayıları elle bırakmadım; bankacının denetimini Dijkstra'nın yazdığı biçimde kodladım ve dört duruma da uyguladım. Başlangıç durumu güvenli; yalnızca P1'e ya da yalnızca P2'ye bir sayfa verilirse kasa 39'a düşer ve durum hâlâ güvenlidir, çünkü kalan isteği 39 olan süreç bitirilebilir; ikisine birden verilirse durum güvensiz olur. Şekil 2 iki tabloyu yan yana koyuyor.

![İki panelli, tablo biçimli şema; sütunlar süreç, ihtiyaç, borç ve kalan istek. Sol panel Dijkstra'nın örneği, toplam sermaye 100 sayfa: P1 80, 40, 40; P2 60, 20, 40; kasa 100 − 60 = 40, vurgulu kutuda GÜVENLİ. Sağ panelde ikisine de birer sayfa daha verilmiş: P1 80, 41, 39; P2 60, 21, 39; kasa 100 − 62 = 38, soluk kutuda GÜVENSİZ. Alt satırlar: kasa en az bir sürecin kalan isteğini karşılıyorsa o süreç bitirilir ve borcunu geri verir; burada kasa 38, iki kalan istek 39, hiçbiri bitemez; yalnızca birine verilseydi kasa 39 olurdu, yani güvenli. Vurgulu satır: güvensiz durum kilitlenmiş durum değildir, kilitlenmenin artık mümkün olduğu durumdur](assets/bankaci-guvenli-durum.svg "Şekil 2 — Güvensiz durum kilitlenmiş durum değildir; kilitlenmenin mümkün olduğu durumdur")

Bu ayrımı mülakatta kaçırmamak gerekir: **güvensiz durum kilitlenmiş durum değildir.** Güvensiz bir durumda süreçler pekâlâ ilerleyip sorunsuz bitebilir; algoritma yalnızca en kötü ihtimalin artık kapatılamadığını söyler. Bankacı bu yüzden **muhafazakârdır** ve bedeli budur: belki hiç yaşanmayacak bir felaketi önlemek için bekletme yapar.

Aynı fikrin çizelgeleme tarafındaki hâli de vardır. Hangi iş parçacığının hangi kilitleri isteyeceğini önceden biliyorsan, çakışabilecek olanları aynı anda çalıştırmazsın. Dört iş parçacığından ikisi hem L1 hem L2 istiyorsa onları farklı zamanlara koyarsın; yalnızca tek kilit alan bir iş parçacığı kimseyle kilitlenemeyeceği için serbestçe örtüşebilir. Bedeli yine aynıdır: üç iş parçacığı da iki kilidi istiyorsa hepsini aynı işlemciye sıraya dizmek gerekir ve toplam süre uzar. Bu yüzden kaçınma, bütün görevlerin ve ihtiyaçlarının önceden bilindiği gömülü sistemler gibi dar ortamlarda anlamlıdır; genel amaçlı bir işletim sisteminde kullanılmaz.

## Tespit ve kurtarma

Dördüncü strateji en tembeli ve pratikte en yaygınlarından biridir: kilitlenmenin olmasına izin ver, olduğunda fark et ve toparla.

Tespit, graf algoritmaları makalesindeki döngü tespitinin doğrudan uygulanmasıdır. Sistem **kaynak atama grafını (resource-allocation graph)** kurar — süreçlerden kaynaklara "istiyor" okları, kaynaklardan süreçlere "sahibi" okları — ve grafta döngü arar. Veritabanı sistemleri bunu yapar: bir kilitlenme dedektörü belirli aralıklarla çalışır, döngü bulursa işlemlerden birini geri alıp yeniden başlatır. İşletim sistemi tarafında kurtarma çoğu zaman daha kabadır; yılda bir donan bir sistemi yeniden başlatmak, nadir bir olay için karmaşık bir düzenek yazmaktan ucuzdur. Bu, mühendislikte sık karşılaşılan bir karardır: bir kötülük nadirse ve bedeli küçükse, onu önlemeye harcanacak emek başka yerde daha çok kazandırır.

Buradaki asıl mülakat inceliği şudur: **döngü her zaman kilitlenme demek değildir.** Her kaynak türünden yalnızca bir örnek varsa — her kilit tektir — grafta döngü bulmak kilitlenme bulmaktır. Ama bir kaynak türünün birden çok örneği varsa döngü yalnızca **gerekli** koşuldur, yeterli değil.

Bunu somutlaştırmak için kendim bir örnek kurdum ve tespit yordamıyla doğruladım. İki kaynak türü olsun, A ve B, her birinin ikişer örneği var. P1 bir B örneği tutuyor ve bir A istiyor; P3 bir A örneği tutuyor ve bir B istiyor — yani P1, A, P3, B üzerinden kapanan bir döngü var. Ama A'nın ikinci örneğini P2, B'nin ikinci örneğini P4 tutuyor ve bu ikisi başka hiçbir şey istemiyor. P2 ile P4 işlerini bitirip örneklerini bırakır, P1 ile P3 istediklerini alır ve **dördü de biter**: döngü var, kilitlenme yok. Aynı döngüyü tek örnekli kaynaklarla kurduğumda — P2 ve P4 olmadan — hiçbiri bitemiyor. Fark, ihtiyaç duyulan kaynağın döngü dışındaki bir süreçten gelebilmesidir.

> **Sesli anlat:** "Kaynak atama grafında döngü buldun. Sistem kilitlenmiş midir? Doksan saniye."
>
> İyi bir cevabın omurgası: "Cevap kaynakların örnek sayısına bağlı. Her kaynak türünden tek örnek varsa döngü kilitlenmeye denktir: döngüdeki her süreç, bir sonrakinin tuttuğu tek örneği bekler ve o örneği başka kimse veremez. Kaynak türünün birden çok örneği varsa döngü yalnızca gerekli koşuldur. Örneğin iki kaynak türü ve ikişer örnek olsun; iki süreç arasında bir döngü kapansın ama ihtiyaç duyulan örneklerin ikincilerini döngü dışındaki iki süreç tutsun ve onlar başka bir şey beklemesin. Onlar bitip bıraktığında döngüdekiler de ilerler. Bu yüzden çok örnekli durumda döngü aramak yetmez; tespit algoritması, isteği karşılanabilen bir süreç arayıp onu bitmiş sayarak ve kaynaklarını geri ekleyerek ilerler — bankacı algoritmasının güvenlik denetimiyle aynı iskelet. Ben bu iki durumu küçük bir programla ayrı ayrı doğruladım: çok örnekli kurulumda dört sürecin dördü de bitebiliyor, tek örnekli kurulumda hiçbiri bitemiyor."

## Kilitlenme, açlık, livelock: aynı şey değiller

Üç kavram sık karıştırılır ve ayrımı tek soruyla yapmak mümkündür: **sistem ilerliyor mu, bu iş parçacığı ilerliyor mu?**

| Durum | Sistem ilerler mi? | Bu iş parçacığı ilerler mi? | İşlemci yanar mı? |
|---|---|---|---|
| Kilitlenme | Hayır | Hayır | Uyuyan kilitlerde hayır, dönen kilitlerde evet |
| Açlık | Evet | Hayır | — |
| Livelock | Hayır | Hayır | Evet (sürekli deneme) |
| Öncelik tersine dönmesi | Kilidi tutan çalışabiliyorsa evet | Hayır (yüksek öncelikli bekler) | Dönerek beklemede evet |

Dördü de birer canlılık ihlalidir; hiçbiri güvenlik ihlali değildir. Bu, klasik problemler makalesinde kurduğumuz ayrımın pratikteki karşılığıdır: karşılıklı dışlama bozulmadan da program çalışmayabilir. Öncelik tersine dönmesinin senkronizasyon makalesinde tanıştığımız çaresi — öncelik kalıtımı — burada da aynı mantıkla çalışır: bekleyenin önceliğini tutana geçici olarak ödünç ver.

## Mülakatta nasıl görünür

Kilitlenme, işletim sistemleri mülakatının en klasik sorularından biridir ve neredeyse her zaman aynı zincirle ilerler: **dört koşulu say → birini kaldırmayı anlat → bankacıyı sor → "peki gerçekte ne yapılıyor?" diye bitir.** Son halka en ayırt edicisidir; doğru cevap "pratikte kaçınma kullanılmaz, kilit sırası konur ve gerekirse tespit edilip toparlanır"dır.

Altı tipik hata var. **Dört koşulu sağlamayı kilitlenmenin garantisi sanmak** — dördü de sağlanan kurulumda taradığım 19 durumdan yalnızca biri kilitlenmeydi. **Güvensiz durumu kilitlenmiş durum sanmak** — güvensiz durum yalnızca en kötü ihtimalin kapatılamadığı durumdur. **Bankacı algoritmasının varsayımını atlamak** — her sürecin en fazla ne isteyeceğini önceden bildirmesi gerekir ve genel amaçlı sistemlerde bu bilgi yoktur. **Deneme kilidini kilitlenmenin kesin çözümü sanmak** — livelock kapıyı arkadan açar. **Grafta döngü bulmayı her durumda kilitlenme kanıtı saymak** — yalnızca tek örnekli kaynaklarda kanıttır. **Kilitlenme ile açlığı aynı kutuya koymak** — kilitlenmede sistem durur, açlıkta sistem ilerler ama biri hep dışarıda kalır.

Bir de ölçü refleksi: kilitlenme korkusuyla kilitleri sürekli birleştirmek eşzamanlılığı öldürür, ince taneli kilitleme ise kilitlenme fırsatını çoğaltır. Doğru cevap ikisinin arasındadır ve kilit sırasını yazılı bir sözleşme hâline getirmekten geçer.

İngilizce karşılıklar hazır olmalıdır: *deadlock*, *mutual exclusion*, *hold-and-wait*, *no preemption*, *circular wait*, *deadlock prevention*, *lock ordering*, *trylock*, *livelock*, *lock-free*, *deadlock avoidance*, *banker's algorithm*, *safe / unsafe state*, *deadlock detection*, *resource-allocation graph*, *starvation*, *atomicity violation*, *order violation*.

### Sırada ne var

Eşzamanlılık bölümü burada kapanıyor. Sanallaştırmanın ilk yarısını — işlemciyi paylaştırmayı — çoktan kurmuştuk; ikinci yarısı belleği paylaştırmak.

Sıradaki makale sorunun kendisiyle başlıyor: bir süreç kendi adres uzayının sıfırdan başladığını sanırken, fiziksel bellekte bambaşka bir yerde durur. Bu yanılsamayı kim kurar ve bedeli nedir? Taban ve sınır yazmaçlarından bölütlemeye, oradan sayfalamaya geçeceğiz; sayfa tablosunun aslında veri yapıları makalesindeki doğrudan erişim dizisi olduğunu, çok düzeyli tablonun ise ağaç muhasebesinin bir örneği olduğunu göreceğiz. İşletim sistemi makalesinde tanıştığımız tuzak kavramı da geri dönecek: geçersiz bir adres, bir tuzağın ta kendisidir.

## Kaynakça

- Dijkstra, E. W. *Cooperating Sequential Processes* (EWD 123), Technological University Eindhoven, 1965 — 6. bölüm "The Problem of the Deadly Embrace" ve 6.1 "The Banker's Algorithm": problemin bellek sayfaları üzerinden kuruluşu ve iki süreçlik sayısal örnek (toplam 100 sayfa; P1 için ihtiyaç 80 ve borç 40, P2 için ihtiyaç 60 ve borç 20; ikisine de birer sayfa verildiğinde borçlar 41 ve 21, kalan istekler 39 ve 39, kasa 38), birebir gerekçesiyle: "This is an unsafe situation, for both processes might want to realize their full further claim before returning a single page to available store"; bankacının beş koşulu ve müşterinin **en fazla ihtiyacını önceden bildirme** zorunluluğu; `need`, `loan`, `claim` ve `cash` tanımları; güvenlik denetiminin `finish doubtful` dizisi üzerinde yazılmış özgün yordamı ve "Safety of the situation means, that all transactions can be finished, i.e. that the banker sees a way of getting all his money back" saptaması. Metin, yazarın arşivindeki transkripsiyondan okunmuştur. [Bağlantı](https://www.cs.utexas.edu/~EWD/transcriptions/EWD01xx/EWD123-2.html)
- Coffman, E. G., Elphick, M. J. & Shoshani, A. *System Deadlocks*, ACM Computing Surveys, cilt 3, sayı 2, Haziran 1971, s. 67–78 — dört koşulun ilk derlendiği çalışma. 2. bölüm ("Characterizations of Deadlocks", basılı s. 70) dördünü sırasıyla şöyle verir: "Tasks claim exclusive control of the resources they require (\"mutual exclusion\" condition)", "Tasks hold resources already allocated to them while waiting for additional resources (\"wait for\" condition)", "Resources cannot be forcibly removed from the tasks holding them until the resources are used to completion (\"no preemption\" condition)", "A circular chain of tasks exists, such that each task holds one or more resources that are being requested by the next task in the chain (\"circular wait\" condition)" ve hemen ardından "The existence of these conditions effectively defines a state of deadlock." **Ad farkı:** özgün metinde ikinci koşulun adı **"wait for"**dur; gövdede kullanılan *hold-and-wait* adı OSTEP'in ve güncel ders kitaplarının adlandırmasıdır — "hold-and-wait" ifadesi Coffman, Elphick ve Shoshani'nin makalesinin hiçbir yerinde geçmez. **Nitelik farkı:** "necessary and sufficient" ifadesi özgün metinde dört koşul için değil, istek grafındaki çevrim için kullanılır: "a circuit (directed loop) in the request graph is a necessary and sufficient condition for a deadlock, assuming the first three conditions given above are operative." ACM Digital Library kopyası bot filtresi arkasında olduğu için tam metin bir üniversite ders kopyasından okunmuştur. [Bağlantı](https://uobdv.github.io/Design-Verification/Supplementary/System_Deadlocks-Four_necessary_and_sufficient_conditions_for_deadlock.pdf)
- Arpaci-Dusseau, R. H. & Arpaci-Dusseau, A. C. *Operating Systems: Three Easy Pieces*, Chapter 32: Common Concurrency Problems — Lu ve arkadaşlarının dört büyük açık kaynak uygulama (MySQL, Apache, Mozilla, OpenOffice) üzerindeki çalışmasından aktarılan **105 eşzamanlılık hatası**, bunların **74'ünün kilitlenme dışı ve 31'inin kilitlenme** olması, kilitlenme dışı hataların **yüzde 97'sinin atomiklik ya da sıra ihlali** olması ve iki hata sınıfının MySQL/Mozilla'dan alınmış kod örnekleriyle düzeltmeleri; iki kilitli en küçük kilitlenme örneği ve bağımlılık grafındaki döngü; kilitlenmenin neden gerçek kod tabanlarında ortaya çıktığı (sanal bellek ile dosya sistemi arasındaki döngüsel bağımlılık; kapsüllemenin `Vector.AddAll` üzerinden gizlediği kilit sırası); **kilitlenmenin dört koşulu**, birebir ve Coffman, Elphick ve Shoshani'nin 1971 tarihli *System Deadlocks* çalışmasına atıfla: "Mutual exclusion… Hold-and-wait… No preemption… Circular wait", ve "If any of these four conditions are not met, deadlock cannot occur"; dört önleme tekniği — kilitler üzerinde tam ve kısmi sıra (Linux bellek eşleme kodundaki on grup), kilidin adresine göre sıralama numarası, hazırlık kilidiyle hepsini birden alma, `trylock` ile geri çekilme ve **livelock** ile rastgele gecikme çaresi, karşılaştır-ve-değiştir ile kilitsiz atomik artırma ve liste başına ekleme; **çizelgelemeyle kaçınma**, dört iş parçacığı ve iki kilitlik iki tabloyla ve eşzamanlılık bedeliyle; Dijkstra'nın bankacı algoritmasına atıf; **tespit ve kurtarma**, veritabanlarındaki periyodik kilitlenme dedektörü ve "her şeyi kusursuz yapma" ilkesi. Arpaci-Dusseau Books, Sürüm 1.10. [Bağlantı](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- Cox, R., Kaashoek, F. & Morris, R. *xv6: a simple, Unix-like teaching operating system* (RISC-V sürümü), Chapter 6: Locking, 6.4 "Deadlock and lock ordering" — çekirdek içindeki **küresel kilit alma sırası** zorunluluğu ve iki kod yolunun A–B ile B–A sırasında kilitlenmesi; konsol kesme yordamının `cons.lock` tutarken bekleyen sürecin kilidini alması ve bundan doğan "konsol kilidi süreç kilitlerinden önce" kuralı; çekirdeğin en uzun zinciri olarak dosya yaratma yolunun beş kilidi (dizin kilidi, yeni dosyanın düğüm kilidi, disk bloğu tamponu, `vdisk_lock`, çağıranın `p->lock`) aynı sırayla alması; küresel sıranın program yapısıyla çelişebilmesi ve kilit kimliklerinin önceden bilinemediği durumlar; birebir saptama: "the danger of deadlock is often a constraint on how fine-grained one can make a locking scheme, since more locks often means more opportunity for deadlock". MIT 6.1810 / 6.828, 2024. [Bağlantı](https://pdos.csail.mit.edu/6.828/2024/xv6/book-riscv-rev4.pdf)
- Silberschatz, A., Galvin, P. B. & Gagne, G. *Operating System Concepts*, onuncu baskı — bu makalenin kapsamının ders kitabı karşılığı **Chapter 8 Deadlocks**'tur; ilgili alt bölümler resmî içindekiler tablosundan doğrulanmıştır: 8.1 System Model, 8.2 Deadlock in Multithreaded Applications, 8.3 Deadlock Characterization, 8.4 Methods for Handling Deadlocks, 8.5 Deadlock Prevention, 8.6 Deadlock Avoidance, 8.7 Deadlock Detection, 8.8 Recovery from Deadlock. John Wiley & Sons. [Bağlantı](https://www.os-book.com/OS10/index.html)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE322 — Operating Systems* — bu makalenin resmî dayanağı katalog tanımındaki "deadlock prevention, avoidance, detection and recovery" ifadesidir; sayfa 2026-09-10'da doğrulanmıştır. Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe322/)
