---
article_id: article_83b44d0c-556d-42ed-8dd4-3bafbefa52a3
title: "Heap ve Öncelik Kuyruğu"
slug: heap-ve-oncelik-kuyrugu
category: data-structures
level: advanced
reading_order: 13
summary: "Arama ağacının değişmezini bilinçli olarak zayıflatan yapı: öncelik kuyruğu arayüzü, heap özelliği ve kökün en küçük olduğunun tümevarımla ispatı, tam ikili ağacın dizi üzerindeki indis aritmetiği, yukarı ve aşağı sızdırma, yığın kurmanın neden doğrusal olduğu ve heapsort."
tags:
  - heap
  - oncelik-kuyrugu
  - heapsort
  - build-heap
  - tam-ikili-agac
content_hash: sha256:5ed0571dfc02a0866e8ddbb0d59c289837c881f41f7f4cccdbdef68f3f0941bb
classification_version: 1
classification_batch: 4
---
## Tam sıralamaya ihtiyacın olmadığı zaman

Önceki iki makale tek bir soruyu maliyetiyle birlikte kapattı: "bu anahtar burada mı ve komşuları kim?" Cevap sıralı bir değişmez tutmak, dengelemek ve her işlemi ağacın yüksekliğine bağlamaktı.

Şimdi farklı bir soru soruyoruz: **"şu anda en küçüğü ver; onu çıkar; sonra tekrar en küçüğü ver."** Aradaki fark küçük görünüyor ama tasarım kararını tamamen değiştiriyor. Bu soruyu cevaplamak için elemanların tamamının sırasını bilmene gerek yok. Yalnızca en küçüğün nerede olduğunu bilmen ve o çıkınca yerine kimin geçeceğini ucuza bulman yeterli. Tam sıralamayı korumak bu iş için **gereğinden fazla iş yapmaktır** ve fazladan yapılan her iş bir maliyettir.

Bu makale o gereksiz işi kesen yapıyı kuruyor. Yöntem, fazın en öğretici hamlelerinden biri: değişmezi güçlendirmek yerine **bilinçli olarak zayıflatmak** ve zayıflatmanın karşılığında ne kazanıldığını tek tek göstermek.

Bir terim uyarısıyla başlayalım, çünkü Türkçede karışıyor. Temel yapılar makalesinde *yığın* sözcüğünü **stack** için ayırmıştık. Bu makalenin konusu olan ağaç yapısına, karışıklık olmasın diye İngilizce adıyla **heap** diyeceğiz. Mülakat İngilizce yürüyeceği için ikisini zaten ayrı adlarla söyleyebilmen gerekiyor: *stack* son gireni ilk çıkarır, *heap* en öncelikliyi çıkarır ve aralarında hiçbir akrabalık yoktur.

## Arayüz: öncelik kuyruğu

Temel yapılar makalesinde kurduğumuz ayrımı tekrar kullanıyoruz: önce **arayüz (interface)**, sonra **temsil (representation)**. İstediğimiz arayüzün adı **öncelik kuyruğudur (priority queue)** ve dört işlemi vardır:

| İşlem | Anlamı |
|---|---|
| `kur(X)` | verilen koleksiyondan yapıyı oluştur |
| `ekle(x)` | yeni öğeyi yapıya koy |
| `en_küçük()` | en küçük anahtarlı öğeyi döndür (çıkarmadan) |
| `en_küçüğü_al()` | en küçük anahtarlı öğeyi çıkar ve döndür |

Dikkat edilecek iki nokta var. Birincisi, bu bir **kuyruk değildir**: sıradaki eleman geliş sırasına göre değil, anahtarına göre seçilir. İsimdeki "kuyruk" yalnızca "sırada bekleyenler" çağrışımından gelir. İkincisi, yapı genellikle ya en küçük ya en büyük için optimize edilir, ikisi için birden değil. Biz en küçük üzerinden gideceğiz; en büyük hâli bütün karşılaştırmaların yönünü çevirmekle elde edilir ve tek bir satır bile fazladan fikir gerektirmez.

Nerede karşına çıkar? Sınırlı bant genişliğine sahip bir yönlendiricinin hangi paketi önce göndereceğine karar vermesinde; işletim sistemi çekirdeğinin süreç zamanlamasında; kesikli olay benzetiminde ("sıradaki olay ne zaman?"); ve ilerideki graf algoritmalarında. Bu dördü öncelik kuyruğunun ders kitabı örnekleridir ve dördü de aynı deseni paylaşır: eleman akışı sürüyor, her an bir "en önemli" isteniyor, ama kimse tam sıralı liste istemiyor.

## Elimizdeki yapılarla ne kadar iyi yapabiliriz?

Yeni bir yapı icat etmeden önce eldekilerle deneyelim — mülakatta da doğru sıra budur.

**Sırasız dinamik dizi.** Eklemek sona koymaktır: amortize sabit. En küçüğü almak bütün diziyi taramaktır: doğrusal. Ekleme ucuz, alma pahalı.

**Sıralı dizi.** Eklemek doğru yere sokmaktır: doğrusal. En küçüğü almak bir uçtan almaktır: sabit. Bu sefer tam tersi.

**Dengeli arama ağacı.** Her ikisi de logaritmik. İyi görünüyor ama iki itirazı var: yapı, ihtiyacımızdan çok daha fazlasını sunuyor (arama, ardıl, sıralı dolaşma) ve bu fazlalığın bedelini düğüm başına işaretçilerle ödüyoruz.

Buradan çok öğretici bir gözlem çıkar. Bir öncelik kuyruğu, her seferinde en küçüğü çekerek **sıralama algoritmasına dönüşür**: önce hepsini ekle, sonra hepsini sırayla al. Bu kalıba **öncelik kuyruğu sıralaması** denir ve şaşırtıcı olan şudur: sırasız diziyle yaptığında ortaya çıkan algoritma **seçmeli sıralamadır (selection sort)**, sıralı diziyle yaptığında ortaya çıkan ise **eklemeli sıralamadır (insertion sort)**. İki tanıdık karesel algoritma, aynı deseni farklı temsillerle çalıştırmanın sonucu. İkisinin de karesel olmasının nedeni ortada: her iki temsilde de iki işlemden biri doğrusaldır.

Aradığımız şey, iki işlemin **ikisinin de** logaritmik olduğu ama dengeli arama ağacından daha basit ve daha az bellek isteyen bir temsil.

## Değişmezi zayıflatmak: heap özelliği

İkili arama ağacının değişmezi küresel bir söz veriyordu: bir düğümün sol alt ağacındaki **her** anahtar ondan küçük, sağ alt ağacındakilerin **hepsi** ondan büyük. Sıralı dolaşmanın artan olmasını sağlayan da buydu.

Heap bu sözü çok daha küçüğüyle değiştirir. **Min-heap özelliği (min-heap property)** yalnızca ebeveyn ile çocuk arasında konuşur:

> Her düğüm için: düğümün anahtarı, varsa çocuklarının anahtarlarından küçük ya da eşittir.

Sol ile sağ çocuk arasında **hiçbir şey söylenmez**. Kardeşler arasında sıra yoktur, alt ağaçlar arasında sıra yoktur. Bir heap sıralı bir yapı değildir; sıralı dolaşması artan çıkmaz.

Peki bu kadar az sözle ne kazanılır? Şu iddia ile:

**İddia.** Bir min-heap'te her düğümün anahtarı, kendi alt ağacındaki bütün düğümlerin anahtarlarından küçük ya da eşittir.

**İspat (tümevarım).** Tümevarımı, alt ağaçtaki düğümün ata düğümden kaç seviye aşağıda olduğuna, yani d = derinlik(j) − derinlik(i) farkına uygulayalım. **Taban:** d = 0 ise j düğümü i'nin kendisidir ve anahtar kendisine eşittir. **Adım:** d > 0 olsun. j'nin ebeveyni de i'nin alt ağacındadır ve i'ye uzaklığı d − 1'dir; tümevarım hipotezine göre anahtar(i) ≤ anahtar(ebeveyn(j)). Öte yandan heap özelliği doğrudan ebeveyn(j) düğümünde uygulanınca anahtar(ebeveyn(j)) ≤ anahtar(j) verir. İki eşitsizliği birleştirince anahtar(i) ≤ anahtar(j) çıkar. ∎

Sonucun özel hâli tam aradığımız şeydir: **köke uygulandığında, en küçük anahtar köktedir.** Yani `en_küçük()` sabit zamanlıdır — tek bir hücreye bakarsın.

Burada durup ne olduğunu adlandıralım. Yerel bir kural (ebeveyn ≤ çocuk) küresel bir sonuç (kök ≤ hepsi) üretti ve köprüyü tümevarım kurdu. Bu tam olarak tümevarım makalesindeki yapısal tümevarım refleksidir; ikili arama ağacında sıralı dolaşmanın doğruluğunu da aynı refleksle ispatlamıştık. Mülakatta "heap'in kökü neden en küçüktür?" sorusuna "çünkü öyle tanımlı" demek zayıf bir cevaptır; iki satırlık bu tümevarım güçlü cevaptır.

## Tam ikili ağaç ve dizinin geri dönüşü

Zayıflatmanın ikinci karşılığı bellektedir ve daha da çarpıcıdır: heap **hiç işaretçi kullanmaz.**

Nedeni şu: değişmez artık şeklin nasıl olduğunu umursamıyor. Arama ağacında şekil, anahtarların değerleri tarafından zorlanır — 5'i nereye koyacağın serbest değildir. Heap'te ise ebeveyn–çocuk ilişkisi dışında bir şart olmadığı için şekli **biz seçebiliriz** ve mümkün olan en derli toplu şekli seçeriz: **tam ikili ağaç (complete binary tree)**. Tanımı şudur: son seviye dışındaki bütün seviyeler doludur, son seviye ise soldan sağa doğru boşluksuz doldurulmuştur.

Tam ikili ağaçlar ile diziler arasında birebir eşleme vardır: ağacı okuma sırasında — kökten yapraklara, her seviyede soldan sağa — gezip düğümleri sırayla dizi hücrelerine yazarsın. Kök 0. hücrededir ve komşuları **hesaplanır**, saklanmaz:

- `sol(i) = 2i + 1`
- `sağ(i) = 2i + 2`
- `ebeveyn(i) = ⌊(i − 1) / 2⌋`

Bu, temel yapılar makalesindeki indis aritmetiğinin ta kendisidir: dizinin ucuzlattığı şey konumdur ve burada konumu tam olarak ağaç yapısını taşımak için kullanıyoruz. Bağlı liste düğüm başına en az bir işaretçi ödüyordu; heap sıfır ödüyor. Üstelik veri bitişik bellekte durduğu için erişim de dostçadır.

Şekil 1 aynı heap'i iki gösterimde yan yana koyuyor.

![Üstte yedi hücreli bir dizi: hücrelerde sırayla 1, 3, 2, 7, 4, 9, 5 değerleri ve altlarında 0'dan 6'ya indisler. Üst sağda çerçeveli bir kutuda indis aritmetiği: sol çocuk 2i artı 1, sağ çocuk 2i artı 2, ebeveyn i eksi 1 bölü 2'nin alt tam sayısı. Altta aynı verinin tam ikili ağaç hâli: kök 1, çocukları 3 ve 2, 3'ün çocukları 7 ve 4, 2'nin çocukları 9 ve 5; her düğümün yanında dizideki indisi yazılı. Sağ altta notlar: heap özelliği ebeveyn küçük eşit çocuktur, kardeşler arasında sıra yoktur, dizinin kendisi sıralı değildir, yükseklik log iki n'nin alt tam sayısıdır](assets/heap-dizi-temsili.svg "Şekil 1 — Aynı heap, iki gösterim: dizi hücreleri ve tam ikili ağaç")

Şekildeki dizinin **sıralı olmadığına** dikkat et: 1, 3, 2, 7, 4, 9, 5. Heap özelliği sağlanıyor ama artan sıra yok. Bu, mülakatta en sık düzeltilen kavram yanılgısıdır.

Yüksekliği de buradan okuruz. Derinlik d seviyesinde en fazla 2^d düğüm bulunur; n düğümlü tam bir ağacın yüksekliği tam olarak ⌊log₂ n⌋'dir. Bir milyon eleman için bu 19, bir milyar için 29 eder. Heap **her zaman** dengelidir ve bunun için hiçbir dengeleme işi yapılmaz — denge, temsilin bedava yan ürünüdür. Dengeli arama ağacında dönüşlerle satın aldığımız garantiyi burada tanım gereği alıyoruz.

> **Sesli anlat:** "Heap ile ikili arama ağacının değişmezleri nasıl farklıdır ve bu fark neyi ucuzlatır? Doksan saniyede anlat."
>
> İyi bir cevabın omurgası: "Arama ağacının değişmezi küreseldir: bir düğümün sol alt ağacındaki her anahtar ondan küçüktür, sağ alt ağacındaki her anahtar büyüktür; bu yüzden sıralı dolaşma artan çıkar. Heap'in değişmezi yereldir: yalnızca her düğümün çocuklarından küçük ya da eşit olmasını ister, kardeşler arasında hiçbir şey söylemez. Bu zayıflatmanın üç karşılığı var. Birincisi, kök en küçüktür — bunu derinlik farkı üzerinden tümevarımla ispatlarım — yani en küçüğü sabit zamanda veririm. İkincisi, değişmez şekli zorlamadığı için şekli ben seçerim ve tam ikili ağacı seçerim; o da dizide indis aritmetiğiyle saklanır, işaretçi maliyeti sıfırdır ve yükseklik log n olur, dengeleme yapmam gerekmez. Bedeli ise şudur: heap sıralı bir yapı değildir. Verilen bir anahtarı aramayı, ardılı bulmayı, sıralı gezinmeyi ve aralık sorgusunu ucuzlatmaz; onlar için hâlâ dengeli arama ağacı gerekir."

## İki onarım yordamı

Değişmez bozulduğunda onarmanın iki yönü vardır ve ikisi de tek bir yol boyunca yürür.

**Yukarı sızdırma (sift-up / swim).** Bir düğümün anahtarı ebeveynininkinden küçükse ikisini takas et ve aynı denetimi ebeveynde tekrarla; ebeveyn küçük ya da eşit çıkana kadar veya köke varana kadar sürer. Yürünen yol kökten o düğüme giden yoldur, dolayısıyla en fazla yükseklik kadar adım atılır.

**Aşağı sızdırma (sift-down / sink).** Bir düğümün anahtarı çocuklarından birinden büyükse, **iki çocuğun küçük olanıyla** takas et ve aynı denetimi o çocukta tekrarla. Küçük olanla takas etmek zorunludur: büyük olanla takas edersen yeni ebeveyn, diğer kardeşten büyük kalır ve değişmez onarılmaz. Yine en fazla yükseklik kadar adım atılır.

İki işlem bu iki yordamla yazılır:

**Ekleme.** Yeni öğeyi dizinin sonuna koy — okuma sırasında sıradaki yaprak orasıdır — ve yukarı sızdır. Dizinin sonuna eklemek dinamik dizide amortize sabittir, sızdırma logaritmiktir; toplam logaritmik.

**En küçüğü alma.** En küçük köktedir ama dizinin ortasından hücre silmek pahalıdır; ucuz olan sondan silmektir. O yüzden kökü son öğeyle takas et, sonuncuyu (artık eski kök) çıkar, ve yeni kökü aşağı sızdır. Yine logaritmik.

Somut bir iz sürelim. Şekil 1'deki [1, 3, 2, 7, 4, 9, 5] heap'ine 0 ekleyelim. 0, 7. hücreye yazılır; ebeveyni ⌊6/2⌋ = 3. hücredeki 7'dir, 0 < 7 olduğu için takas olur. Şimdi 0, 3. hücrededir; ebeveyni ⌊2/2⌋ = 1. hücredeki 3'tür, takas olur. Şimdi 0, 1. hücrededir; ebeveyni kökteki 1'dir, takas olur. Sonuç [0, 1, 2, 3, 4, 9, 5, 7]: üç takas, ağacın yüksekliği ⌊log₂ 8⌋ = 3.

Şimdi baştaki heap'ten en küçüğü alalım. Kökteki 1 ile son hücredeki 5 takas edilir, 1 çıkarılır ve dizi [5, 3, 2, 7, 4, 9] olur. Kökteki 5 aşağı sızar: çocukları 3 ve 2, küçüğü 2'dir ve 2 < 5, takas → [2, 3, 5, 7, 4, 9]. Yeni konumunda 5'in tek çocuğu 9'dur ve 9 > 5, durulur. İki karşılaştırma turu, bir takas.

Şekil 2 iki yordamı yan yana gösteriyor.

![Dikey bir çizgiyle ayrılmış iki yarı. Solda yukarı sızdırma: yedi düğümlü bir heap ağacının en soluna yeni yaprak olarak eklenen 0 değeri, kesikli ve ok uçlu bir çizgiyle 7, sonra 3, sonra köke giden yol boyunca yukarı taşınıyor; yol üzerindeki dört düğüm vurgulu. Altında üç takasla köke çıktığı ve sonucun 0, 1, 2, 3, 4, 9, 5, 7 olduğu yazıyor. Sağda aşağı sızdırma: kökteki 5 değeri, iki çocuğunun küçüğü olan 2 ile takas edilerek bir seviye iniyor, yeni konumunda tek çocuğu 9 kendisinden büyük olduğu için duruyor. Altında küçük olan çocukla takas etmenin zorunlu olduğu, büyükle takas edilirse değişmezin onarılmadığı ve sonucun 2, 3, 5, 7, 4, 9 olduğu yazıyor. En altta her iki yordamın da kökten yaprağa giden tek bir yol boyunca yürüdüğü ve maliyetin yüksekliğe eşit olduğu belirtiliyor](assets/heap-sizdirma.svg "Şekil 2 — Yukarı ve aşağı sızdırma: onarım tek bir yol boyunca yürür")

Karşılaştırma sayısını sıkı biçimde de verebiliriz: n öğeli bir heap'te ekleme en fazla 1 + log₂ n karşılaştırma, en küçüğü alma en fazla 2 log₂ n karşılaştırma yapar. Alma işleminin katsayısının iki olmasının nedeni her seviyede iki karşılaştırma yapılmasıdır: önce hangi çocuğun küçük olduğu, sonra o çocuğun ebeveynden küçük olup olmadığı.

## Yığın kurmak: n log n mi, n mi?

Elinde n öğelik bir dizi var ve bunu bir heap hâline getirmek istiyorsun. İlk akla gelen yol tek tek eklemektir: n kez ekleme, her biri logaritmik, toplam O(n log n).

Daha iyisi var ve nedeni sayma refleksiyle görülür. Diziyi baştan **zaten bir tam ikili ağaç** olarak kabul et — şekil olarak öyle, yalnızca heap özelliği bozuk. Sondan başa doğru her düğüm için aşağı sızdırma uygula. Bir düğüme sıra geldiğinde iki çocuğunun alt ağaçları zaten birer heap'tir, dolayısıyla tek bir aşağı sızdırma o alt ağacı heap yapmaya yeter.

Maliyeti neden düşük? Çünkü aşağı sızdırmanın maliyeti düğümün **derinliği** değil **yüksekliğidir** ve tam bir ağaçta düğümlerin ezici çoğunluğu yaprağa yakındır. Düğümlerin yaklaşık yarısı yapraktır (yükseklik 0, hiç iş yok), dörtte biri yükseklik 1'dir, sekizde biri yükseklik 2'dir. Toplam iş, her yükseklik seviyesindeki düğüm sayısıyla o yüksekliğin çarpımlarının toplamıdır ve bu toplam n ile sınırlıdır; ∑ h/2^h serisi 2'ye yakınsadığı için sınır tam olarak n çıkar.

Sayılarla görelim. n = 1000 için derinlikler toplamı 7.987, yükseklikler toplamı 994. n = 10⁶ için derinlikler toplamı 17.951.445, yükseklikler toplamı 999.993. Aynı işi yapan iki yol arasında on sekiz kat fark var ve fark, hangi büyüklüğün toplandığından geliyor.

Burada bir ayrımı temiz tutmak gerekiyor, çünkü mülakatta karıştırılır. Bu **amortize bir sonuç değildir.** Dinamik dizide amortize maliyet, tek tek pahalı olabilen işlemlerin toplamını sınırlıyordu; burada ise her aşağı sızdırma zaten kendi düğümünün yüksekliği kadar iş yapar ve biz yalnızca **toplamı daha sıkı hesaplıyoruz**. Kaba hesap her düğüme log n biçiyor, sıkı hesap gerçek yükseklikleri topluyor. Sonuç en kötü durum için geçerli bir üst sınırdır, bir ortalama ya da muhasebe hilesi değildir.

## Heapsort

Öncelik kuyruğu sıralaması desenini heap ile çalıştırınca **heapsort** çıkar: önce yığını kur, sonra n kez en uçtakini al. Maliyet O(n log n)'dir; doğrusal kurma bu sonucu değiştirmez, çünkü ikinci faz zaten n logaritmik işlem yapar.

Heapsort'un ayırt edici özelliği **yerinde (in-place)** çalışmasıdır ve numara zariftir: heap'i sıralanacak dizinin bir öneki olarak tut. Alma işlemi en uçtakini zaten dizinin sonuna takas ediyordu; onu silmek yerine heap'in sınırını bir azaltırsan, çıkarılan öğeler dizinin arkasında sıralı bir kuyruk oluşturur. Bir max-heap ile yapıldığında dizi artan sırada biter. Ek bellek sabittir. Karşılaştırma ve takas sayısı 2n log₂ n'nin altında kalır.

İki not, mülakat için kritik. Birincisi, heapsort **kararlı değildir**: takaslar uzak hücreler arasında yapılır ve eşit anahtarlı öğelerin göreli sırası korunmaz. İkincisi, en kötü durumda da O(n log n)'dir — bu, sıralama makalesinde göreceğimiz gibi her algoritmanın veremediği bir garantidir.

> **Sesli anlat:** "Heap neden bir dizide saklanır ve yığını kurmak neden doğrusal zamanda mümkün? Altmış saniyede açıkla."
>
> İyi bir cevabın omurgası: "Heap'in değişmezi ağacın şeklini zorlamadığı için şekli ben seçerim; en derli toplu şekil olan tam ikili ağacı seçerim. Tam ikili ağaçlar ile diziler arasında birebir eşleme vardır: düğümleri okuma sırasında hücrelere yazarım, kök sıfırıncı hücrededir, sol çocuk 2i artı 1, sağ çocuk 2i artı 2, ebeveyn i eksi 1 bölü 2'nin alt tam sayısıdır. Böylece işaretçi maliyeti sıfır olur ve yükseklik tanım gereği log n kalır. Kurmaya gelince: tek tek eklersem her ekleme düğümün derinliği kadar iş yapar ve derinlikler toplamı n log n mertebesindedir. Onun yerine diziyi baştan tam ağaç kabul edip sondan başa doğru aşağı sızdırma uygularım; o zaman her düğümün maliyeti derinliği değil yüksekliği olur. Düğümlerin yarısı yaprak, dörtte biri bir yükseklikte olduğu için yükseklikler toplamı n ile sınırlıdır. Bu amortize bir sonuç değil, aynı işin daha sıkı sayılmasıdır."

## Mülakatta nasıl görünür

Heap neredeyse hiç "heap anlat" diye sorulmaz; bir tasarım sorusunun içinden çıkar. Standart takip zinciri şudur: "Bu akışta her an en önceliklisini nasıl verirsin?" → "Neden sıralı tutmuyorsun?" → "Peki bu yapı neyi yapamaz?"

İlk soruya cevap arayüzü adlandırmak ve heap'i temsil olarak önermektir. İkinci soruya cevap zayıflatma argümanıdır: tam sıralama fazladan iştir; ihtiyacın olan tek şey en uçtakine sabit zamanda erişmek ve onu logaritmik zamanda değiştirmektir. Üçüncü soru cevabın kalitesini ölçer ve sınırı **kendin** söylemelisin: heap'te verilen bir anahtarı aramak doğrusaldır, ardıl ve öncül yoktur, sıralı gezinme yoktur, aralık sorgusu yoktur. Bunlar isteniyorsa dengeli arama ağacına dönersin. Aynı biçimde "en küçük ve en büyük ikisi birden sürekli isteniyor" denirse tek bir heap yetmez; iki uçlu yapılar ya da iki heap'in eşlenmesi konuşulur.

Sorulabilecek iki ek ayrıntı hazırda dursun. Birincisi, heap'in ikili olması zorunlu değildir: her düğüme d çocuk verirsen yükseklik log_d n'ye iner ama her aşağı sızdırma adımında d çocuk arasından en küçüğü bulmak gerekir; takas ağırlıklı iş yükünde bu takas kârlı olabilir. Bu, blok tabanlı arama yapılarındaki dallanma çarpanı tartışmasının aynısıdır. İkincisi, dinamik dizi üstünde çalışıldığı için yeniden boyutlandırma varsa logaritmik sınırlar amortize olur.

Sık yapılan üç hata: heap'i sıralı sanmak; "heap ile arama logaritmik" demek (değildir, doğrusaldır); ve öncelik kuyruğunu FIFO kuyruğuyla karıştırmak.

İngilizce karşılıklar hazır olmalıdır: *priority queue*, *heap*, *min-heap* / *max-heap*, *heap property*, *complete binary tree*, *implicit tree*, *sift-up* (*swim*), *sift-down* (*sink*), *build-heap*, *heapsort*, *in-place*, *stable*.

### Sırada ne var

Bu fazda üç kez aynı şeyi yaptık: bir değişmez seçtik, işlemleri o değişmeze bağladık ve maliyeti ağacın yüksekliğine indirdik. Ama temel yapılar makalesinin bıraktığı bir hücre hâlâ boş: **sırasız arama.** Dizi de bağlı liste de heap de "bu anahtar var mı?" sorusuna doğrusal cevap veriyor; dengeli arama ağacı logaritmik veriyor ve dahasını vermiyor.

Sıradaki makale bu duvarı yıkıyor, ama bunun için karşılaştırma yapmayı tamamen bırakmak gerekiyor. Anahtarı başka anahtarlarla kıyaslamak yerine anahtarın **kendisinden bir adres hesaplarsak** arama tek adıma iner. Bedeli ise sayma makalesinde çoktan ispatladığımız bir gerçektir: anahtar uzayı kova sayısından büyükse çakışma kaçınılmazdır. O yüzden orada sorulacak doğru soru "çakışma olur mu?" değil, "çakışma olunca ne yapıyoruz ve maliyeti ne?" olacak.

## Kaynakça

- Demaine, E., Ku, J. & Solomon, J. *6.006 Introduction to Algorithms*, Lecture 8: Binary Heaps — öncelik kuyruğu arayüzü ve kullanım örnekleri (yönlendirici, çekirdek zamanlaması, kesikli olay benzetimi, graf algoritmaları); öncelik kuyruğu sıralamasının sırasız diziyle seçmeli, sıralı diziyle eklemeli sıralamaya dönüşmesi; dizinin tam ikili ağaç olarak yorumlanması ve indis aritmetiği (sol 2i + 1, sağ 2i + 2, ebeveyn ⌊(i − 1)/2⌋); max-heap özelliği ve "her düğüm kendi alt ağacındaki bütün düğümlerden büyüktür" iddiasının derinlik farkı üzerinden tümevarımla ispatı; yukarı/aşağı sızdırmanın doğruluğu ve logaritmik maliyeti; yerinde öncelik kuyruğu sıralaması; tek tek eklemenin derinlikler toplamı ile doğrusal kurmanın yükseklikler toplamı karşılaştırması. MIT OpenCourseWare, Bahar 2020. [Bağlantı](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/)
- Sedgewick, R. & Wayne, K. *Algorithms*, dördüncü baskı, 2.4 (Priority Queues) — öncelik kuyruğunun temel işlemleri; bütün ilkel gerçekleştirimlerde ekleme ya da en uçtakini alma işleminden birinin en kötü durumda doğrusal olması; yığın-sıralı ikili ağaç tanımı ve en büyük anahtarın kökte bulunması önermesi; ikili yığının tam ikili ağacın seviye sırasıyla dizide tutulması olarak tanımı; `swim` ve `sink` yordamları; n öğeli bir öncelik kuyruğunda eklemenin en fazla 1 + lg n, en uçtakini almanın en fazla 2 lg n karşılaştırma yapması; aşağı sızdırma tabanlı kurmanın doğrusal zamanlı olması; heapsort'un ek bellek istemeden çalışması ve 2n lg n'den az karşılaştırma ve takas yapması; çok yollu yığınların dallanma çarpanı takası. Addison-Wesley. [Bağlantı](https://algs4.cs.princeton.edu/24pq/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L. & Stein, C. *Introduction to Algorithms*, dördüncü baskı, 6. bölüm (Heapsort — yığın özellikleri, sızdırma yordamı, yığın kurma, heapsort ve öncelik kuyrukları). MIT Press, 2022. [Bağlantı](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *CMPE250 — Data Structures and Algorithms* (katalog tanımı "Heap Structures" başlığını içerir; bu makalenin resmî dayanağı odur). Boğaziçi Üniversitesi. [Bağlantı](https://cmpe.bogazici.edu.tr/courses/cmpe250/)
