---
article_id: article_aba4e5bd-105c-44f8-bacc-e0f511d65cec
title: "Sistem İstemleri, Roller ve Sohbet Biçimi"
slug: sistem-istemleri-roller-ve-sohbet-bicimi
category: reasoning-and-memory
level: intermediate
reading_order: 24
summary: "Sohbetin perde arkasındaki tek diziyi açar: rolleri işaretleyen özel token'ların somut biçimi, sistem isteminin ayrıcalığının mimari değil eğitimle kurulduğu, talimat hiyerarşisinin ölçülen kazancı ve bedeli, rol vermenin sınırı ve aynı bilginin tek seferde değil turlara yayılarak verilmesinin ölçülen maliyeti."
tags:
  - sistem-istemi
  - sohbet-bicimi
  - konusmaci-rolu
  - talimat-hiyerarsisi
  - cok-turlu
content_hash: sha256:6cfffe49931d79ab13cc3e0f84a7ed24229ff0d2f5d751bfc96e19f3f803a996
classification_version: 1
classification_batch: 5
---
## Perdenin arkasındaki tek dizi

Önceki makalede istemi tek parça bir metin gibi ele aldık: birkaç gösterim, sonra cevaplanacak girdi. Gerçek bir sohbet arayüzünde ise o metin bölünmüş durumda. Bir bölüme sistem istemi deniyor, birine kullanıcının mesajı, birine modelin cevabı. 21\. makalede bu bölümlerin ayrı kanallar olmadığını, aynı dizinin içine konmuş işaretlerle ayrıldığını söylemiştik. 12\. makalede de bu işaretlerin sohbet biçimini kurduğunu ve ayrıntısının ileriye bırakıldığını.

Şimdi ayrıntıya bakıyoruz. Üç soru var: o işaretler somut olarak neye benziyor, sistem istemi bir talimatı gerçekten ayrıcalıklı kılıyor mu, ve sohbet turlara bölündükçe ne oluyor?

Başlarken bir terim uyarısı gerekiyor, çünkü aynı sözcük iki ayrı şey için kullanılıyor. 22\. makalede **rol** derken modele verilen kimliği kastediyorduk: "sen deneyimli bir hukukçusun". Bu makalede sık geçecek olan ise **konuşmacı rolü** (role): dizideki her mesajın kime ait olduğunu söyleyen etiket — sistem, kullanıcı, asistan. Biri içeriktir, öbürü adrestir. Karıştırılmaları kolay olduğu için ikisini ayrı adlarla kullanacağız.

## İşaretlerin somut hâli

Bir modeli sohbet için kullanmak istiyorsan, ona metni onun beklediği biçimde vermen gerekir. Bu biçime **sohbet şablonu** (chat template) denir ve model ailesine göre değişir; bir ailenin şablonunu başka bir aileye uygulamak, modeli hiç eğitilmediği bir düzenle karşılaştırmak demektir.

Meta'nın Llama 3 için yayımladığı resmî belgelendirme somut bir örnek veriyor. Dört özel token yeterli: metnin başlangıcını işaretleyen bir token, bir mesajın rol adını iki yandan saran başlık token'ları ve bir mesajın bittiğini söyleyen tur sonu token'ı. Belgelendirmenin adlandırmasıyla bunlar begin_of_text, start_header_id ile end_header_id, ve eot_id.

![Tek bir yatay token dizisi gösterilir. Dizinin başında bir başlangıç işareti, ardından sırayla sistem, kullanıcı ve asistan rolleri için başlık işaretleri ve mesaj gövdeleri, her mesajın sonunda bir tur sonu işareti bulunur. Dizinin sonunda asistan başlığı açık bırakılmıştır ve üretimin buradan devam edeceği belirtilmiştir. Altta bu işaretlerin sıradan metinde geçmeyen, eğitimde öğrenilmiş token'lar olduğu not edilir.](assets/sohbet-sablonunun-anatomisi.svg "Şekil 1 — Roller, dizinin içindeki işaretlerdir")

Şekil 1'de dikkat edilecek iki şey var. Birincisi: dizinin sonu asistan başlığıyla **açık** bırakılıyor. Model o noktadan itibaren üretmeye başlar ve tur sonu token'ını ürettiğinde durur — 10\. makaledeki otoregresif döngünün kendiliğinden duracak bir mekanizması yoktu, durma kararı işte bu öğrenilmiş token'la veriliyor.

İkincisi ve daha önemlisi: bu işaretlerin hepsi token. Sözlükte kendilerine ayrılmış birer satırları var ve model onları diğer bütün token'lar gibi işliyor. Mimaride "sistem kanalı" diye bir yer yok; 6\. ve 7\. makalede kurduğumuz dikkat mekanizması sistem istemine ayrı bir muamele yapmaz. Bir mesajın sistem isteminden geldiğini gösteren tek şey, önündeki başlık token'ının hangi kelimeyi sardığıdır.

Burada küçük ama kritik bir mühendislik ayrıntısı var. Kullanıcı, mesajının içine tur sonu işaretinin metnini harfi harfine yazarsa ne olur — sohbeti kendisi bölüp yeni bir sistem mesajı açabilir mi? Cevap 4\. makaledeki tokenizer'da saklı. Bu işaretler sıradan metinden **üretilemeyen** sözlük girdileridir: kullanıcının yazdığı karakter dizisi normal alt-kelime kurallarıyla parçalanır ve o tek özel token'a asla dönüşmez. Yani biçimin bütünlüğünü koruyan şey modelin dikkati değil, tokenizer'ın kendisi. Sohbet biçimini kuran katman, güvenliğin de ilk katmanı.

Üç konuşmacı rolünün işlevleri de birbirinden ayrı. **Sistem** rolü uygulamayı kuran geliştiricinindir ve kullanıcıya görünmez; her turda dizinin başında durur. **Kullanıcı** rolü, arayüzün karşısındaki kişinin yazdığıdır. **Asistan** rolü modelin kendi önceki cevaplarıdır — ve bu üçüncüsü göründüğünden önemli, çünkü modelin geçmiş cevapları da bir sonraki turda girdi olarak önüne gelir. Bu makalenin son bölümü tam olarak bunun bedeliyle ilgili.

Bunun sonucu, temel modele bakınca netleşiyor. 11\. makaledeki temel model bu şablonu hiç tanımaz: ona sohbet biçiminde bir metin verirsen o işaretleri anlamsız simgeler olarak okur ve metni tamamlamaya çalışır. Rol ayrımı mimariden değil, 12\. ve 13\. makalelerdeki post-training aşamalarından geliyor. Öğrenilmiş bir alışkanlık, kurulmuş bir duvar değil.

Şablonun model ailesine bağlı olması, pratikte sessiz bir hata kaynağı. Bir modeli kendi arayüzü üzerinden değil de doğrudan çalıştırıyorsan, isteme uyguladığın şablon o modelin eğitildiği şablonla birebir aynı olmak zorunda: farklı işaretler, farklı satır sonları, rol adlarının farklı yazımı. Yanlış şablon, modelin sistem istemini bir talimat olarak değil sıradan metin olarak görmesine yol açar ve bunun görünen belirtisi genellikle "model talimatları dinlemiyor" olur. 22\. makaledeki biçim duyarlılığı ölçümlerini hatırla: anlamı değiştirmeyen biçim farkları bile puanı oynatıyordu. Şablon, biçim farklarının en büyüğü.

> **Kendini yokla:** Sistem istemi de aynı dizide sıradan bir token dizisiyse, kullanıcı neden onu ezip geçemiyor?

Çoğu zaman geçebiliyor — ve tam olarak bu yüzden ayrı bir eğitim aşaması gerekiyor. Sistem isteminin önceliği bir mimari kural değil, modele öğretilmiş bir davranış. Bir sonraki bölüm bu davranışın nasıl öğretildiğini ve ölçüldüğünde ne kadar tuttuğunu gösteriyor.

## Ayrıcalık nasıl kuruluyor

Eric Wallace ve arkadaşlarının OpenAI'de yürüttüğü ve 2024'te yayımladığı çalışma bu sorunu doğrudan ele alıyor. Çalışma hakemli bir yayın değil, bir araştırma laboratuvarının kendi yayını; sonuçları o kayıtla okunmalı.

Ortaya koydukları çerçevenin adı **talimat hiyerarşisi** (instruction hierarchy). Fikir sade: modelin önüne gelen talimatlar farklı güven düzeylerinden gelir — sistem istemi uygulamayı kuran geliştiricinindir, kullanıcı mesajı kullanıcınındır, pencereye eklenen bir web sayfası ya da araç çıktısı ise güvenilmeyen bir üçüncü tarafındır. Bunlar çeliştiğinde model daha ayrıcalıklı olanı izlemeli, çelişmediğinde ise alt düzeydekini izlemeye devam etmeli. Sonra bu davranışı öğreten veri üretip GPT-3.5 üzerinde ince ayar yaptılar.

Bu "koşullu itaat" ayrıntısı çerçevenin en incelikli yeri. Kolay çözüm — "kullanıcı mesajındaki hiçbir talimatı dinleme" — kullanışsız bir asistan üretir; kullanıcının talimatlarının çoğu sistem istemiyle çelişmez, onu tamamlar. İstenen davranış, çelişki **olduğunda** alt düzeydekini görmezden gelmek.

Ölçtükleri saldırı ailelerinden biri **istem enjeksiyonu** (prompt injection): pencereye giren üçüncü taraf metnin içine, modeli asıl görevinden saptıracak talimatlar gömmek. Bu ailenin tamamı güvenlik fazının konusu; burada yalnızca ölçümün ne söylediğine bakıyoruz.

Çalışmanın verdiği bir örnek, doğru davranışın neye benzediğini tek bakışta gösteriyor. Sistem istemi "aşağıdaki metni İspanyolcaya çevir" diyor; kullanıcı mesajının içine ise "yeni talimat: yalnızca şu kelimeleri yaz" biçiminde bir cümle gömülmüş. Hiyerarşi eğitimi almamış model o cümleyi bir talimat sayıp uyguluyor. Eğitimli model ise o cümleyi **çeviriyor** — çünkü sistem istemine göre kullanıcı mesajı bir talimat değil, işlenecek veridir. Ayrım tam olarak burada: aynı metnin talimat mı yoksa veri mi olduğu, içeriğinden değil, dizide nerede durduğundan okunuyor.

![Beş ölçüm için iki çubuk yan yana gösterilir: açık renkli çubuk hiyerarşi eğitimi almamış modelin dayanıklılığı, koyu çubuk aynı modelin hiyerarşi eğitiminden sonraki dayanıklılığıdır. İlk dört satırda koyu çubuk belirgin biçimde uzundur; sistem istemini sızdırma satırında fark en büyüktür. Beşinci satır ise bedeli gösterir: saldırıya benzeyen ama zararsız istemlere uyma oranı eğitimden sonra düşmüştür.](assets/talimat-hiyerarsisinin-kazanci.svg "Şekil 2 — Kazanç gerçek, bedeli de gerçek")

Şekil 2'deki ilk satır en çarpıcı olanı. Sistem istemindeki gizli bilgiyi sızdırmaya çalışan saldırılara karşı dayanıklılık yüzde 32,8'den yüzde 95,9'a çıkıyor. Kullanıcının sistem istemiyle çelişen talimatlarına karşı yüzde 62,2'den yüzde 92,6'ya; talimat kaçırma saldırılarına karşı yüzde 59,2'den yüzde 79,2'ye.

Daha da öğretici olan, eğitimde hiç gösterilmemiş saldırı türlerindeki sonuç. Parola sızdırmaya çalışan bir oyun kümesinde dayanıklılık yüzde 51,8'den yüzde 73,7'ye çıkıyor. Yani model tek tek saldırıları ezberlemiyor, hiyerarşiyi bir kural olarak içselleştiriyor.

Ama Şekil 2'nin son satırı da aynı ölçümden. Saldırıya **benzeyen** ama aslında zararsız kullanıcı isteklerine uyma oranı yüzde 83,1'den yüzde 60,4'e düşüyor; sistem istemi hakkında soru soran zararsız mesajlarda yüzde 85,2'den yüzde 75,0'e. Model daha korunaklı hâle gelirken bir miktar da fazla temkinli oluyor. Bu, 11\. makaledeki hizalama vergisiyle aynı aileden bir maliyet: bir davranışı güçlendirmek, komşusunu zayıflatıyor.

Ve şu kayıt önemli: parola sızdırma sınavında eğitimden **sonraki** sayı yüzde 73,7. Yani denenen saldırıların yaklaşık dörtte biri hâlâ sonuç alıyor. Sistem istemine yazılan bir sırrın kullanıcıdan gizli kalacağını varsaymak, ölçümün desteklemediği bir varsayım. Bu makalede kurulan ayrım — sistem istemi bir adrestir, bir kasa değil — 21\. makaledeki cümleyle aynı kapıya çıkıyor: ayrım bir duvar değil, bir eğilim.

## Sistem istemine ne yazmalı

O hâlde sistem istemi ne işe yarıyor? Burada 22\. makalenin sonucu doğrudan devreye giriyor.

Mingqian Zheng ve arkadaşlarının ölçümünü hatırla: sistem istemine "sen deneyimli bir hukukçusun" gibi bir kimlik yazmak, olgusal sorulardaki doğruluğu anlamlı biçimde iyileştirmiyordu ve hangi kimliğin işe yarayacağını önceden kestirmenin yolu yoktu. Bu bulgu sistem isteminin **değersiz** olduğunu söylemiyor; kimliğin bir kaldıraç olmadığını söylüyor.

22\. makaledeki desen burada da geçerli: sonucu oynatan şey, istemde belirsiz bırakılan şeydir. Sistem istemi tam olarak bu belirsizlikleri kapatmak için doğru yer, çünkü her turda dizinin başında durur ve kullanıcının mesajlarıyla birlikte kaymaz. Oraya yazılmaya değer olanlar şunlar: çıktının biçimi ve uzunluğu, hangi konuların kapsam dışı olduğu, bilgi yetersizse ne yapılacağı, hangi dilde cevap verileceği, hangi kaynaklara dayanılacağı.

Farkı somutlaştıralım. "Sen yardımsever ve deneyimli bir müşteri temsilcisisin" cümlesi kulağa güçlü geliyor ama modele hiçbir karar kuralı vermiyor: cevap ne kadar uzun olacak, sipariş numarası yoksa ne yapılacak, rakip ürünler sorulursa ne denecek, kullanıcı Türkçe dışında yazarsa hangi dilde cevap verilecek — hepsi boş. Aynı yerin şöyle doldurulması ölçülebilir bir fark yaratır: "Yalnızca sipariş, kargo ve iade konularında cevap ver. Başka konu gelirse kısaca kapsam dışı olduğunu söyle. Sipariş numarası verilmemişse önce onu iste. Cevapların en fazla beş cümle olsun. Kullanıcı hangi dilde yazdıysa o dilde cevap ver." Hiçbiri sihirli cümle değil; hepsi 22\. makaledeki tek kaldıracın uygulaması — belirsizliği azaltmak.

Wallace ve arkadaşlarının kendi önerisi de bu çizgide ve pratikte en çok işe yarayan tek cümle olabilir: geliştirici talimatlarını sistem mesajına koy, üçüncü taraf içeriği — özetlenecek metni, getirilen belgeyi, araç çıktısını — kullanıcı mesajına ayrı olarak ver. Talimatla veriyi aynı cümlenin içine katıştırmak, modelden yapamayacağı bir ayrımı yapmasını istemek demek.

Bir maliyet notu da düşelim, çünkü sonraki makalelere bağlanıyor. Sistem istemi her turda yeniden gönderilir; 21\. makaledeki durumsuzluk onu da kapsar. Yani sistem istemine yazdığın her kural, sohbetin her turunda yeniden okunan sabit bir yüktür. Bu yükün neden göründüğü kadar pahalı olmadığı — dizinin başındaki değişmeyen kısmın hesabının saklanıp yeniden kullanılabilmesi — 26\. makalenin konusu.

## Turlara bölmenin bedeli

Şimdiye kadar sohbeti tek bir dizinin büyümesi olarak düşündük. Ama sohbetin bir özelliği daha var: bilgi tek seferde değil, parça parça geliyor. Bunun ölçülmüş bir bedeli olduğu ancak yakınlarda net biçimde gösterildi.

Philippe Laban, Hiroaki Hayashi, Yingbo Zhou ve Jennifer Neville'in ICLR 2026'da sunduğu ve konferansın öne çıkan bildirileri arasında gösterilen çalışma, basit bir deney kurdu. Ellerinde tek seferde verilmiş, eksiksiz talimatlar vardı. Bu talimatları parçalara böldüler ve aynı bilgiyi bir sohbet boyunca tur tur açtılar. İçerik aynı, veriliş biçimi farklı. Sekiz sağlayıcıdan on beş modeli, altı üretim görevinde (kod, veritabanı sorgusu, eylem çağrısı, matematik, veriden metin, özet) ve iki yüz binden fazla benzetilmiş sohbette ölçtüler.

![Üç ölçüm düzeni için ortalama başarı çubuklarla gösterilir: talimatın tamamı tek mesajda verildiğinde 73,4, aynı parçalar tek mesajda art arda birleştirildiğinde 69,8, parçalar turlara yayıldığında 44,8 puan. İlk iki çubuk birbirine yakınken üçüncü çubuk belirgin biçimde kısadır.](assets/turlara-bolmenin-bedeli.svg "Şekil 3 — Aynı bilgi, farklı veriliş, farklı sonuç")

Şekil 3'teki ortadaki çubuk bulgunun kilidi. Talimatın parçalarını tek bir mesajda art arda birleştirmek başarıyı neredeyse hiç düşürmüyor: tek seferde verilen tam talimatın yüzde 95,1'i korunuyor. Aynı parçaları turlara yaydığında ise ortalama başarı yüzde 39 düşüyor. Yani sorun metnin miktarı değil — 21\. makaledeki uzunluk yükü burada belirleyici değil. Sorun, bilginin **kademeli** açılması.

Düşüşün nereden geldiği de ayrıştırılmış. Modellerin en iyi hâli pek bozulmuyor: en iyi denemelerdeki başarı ortalama yüzde 16 geriliyor. Asıl patlama tutarlılıkta: aynı görevin farklı denemeleri arasındaki savrulma ortalama yüzde 112 artıyor, yani ikiye katlanıyor. Model beceriksizleşmiyor, **öngörülemez** hâle geliyor.

Sebep, bu serinin şimdiye kadar kurduğu iki şeyin birleşimi. Model erken turlarda eksik bilgiyle bir varsayım yapıp bir cevap üretiyor. O cevap dizinin içine asistan rolüyle giriyor ve bir sonraki turda modelin önünde duruyor — 23\. makaledeki gösterimler gibi, ama bu kez yanlış bir gösterim olarak. Model kendi erken cevabına yaslanıyor ve yeni bilgi geldiğinde onu terk etmek yerine üstüne bina ediyor. Yazarların ifadesiyle: bir sohbette yanlış yola sapan model, kaybolur ve geri dönmez.

Bu mekanizma, 21\. makaledeki durumsuzlukla birlikte okununca tuhaf bir tersine dönüş üretiyor. Model hiçbir şey hatırlamadığı için sohbetin tamamı her turda yeniden gönderiliyordu; bu, hafızanın çözümü gibi görünüyordu. Ama aynı düzen, modelin kendi hatasını da her turda yeniden önüne koyuyor. Hatırlamayan bir sistemin belleği, kendi yanlışlarını da eksiksiz taşıyor.

Çalışmanın bir gözlemi daha bu tabloyu tamamlıyor: modeller uzun ve fazla ayrıntılı cevaplar üretme eğiliminde ve bu eğilim erken turlarda zararlı, çünkü henüz sorulmamış soruların cevaplarını da varsayımla dolduruyorlar. Fazla söz, sonraki turlara taşınan fazla varsayım demek.

> **Kendini yokla:** Sohbetin ortasında modelin yanlış bir varsayıma saplandığını fark ettin. Ne yapmalı?

Sohbeti kurtarmaya çalışmak yerine, birikmiş bütün gereksinimleri tek bir mesajda toplayıp temiz bir sohbette baştan sormak. Aynı çalışma bunun yakınındaki iki müdahaleyi de ölçtü — tam talimatı sohbetin içinde yeniden özetlemek ve her turda bütün gereksinimleri yeniden saymak — ikisi de belirgin biçimde iyileştiriyor ama hiçbiri tek seferlik düzeye geri getirmiyor. Yanlış cevap dizide durduğu sürece etkisi tamamen silinmiyor.

## Sohbeti kurmanın disiplini

Bu makaledeki üç ölçümden çıkan kurallar birbirini tamamlıyor.

**Talimatı sistem mesajına, veriyi kullanıcı mesajına koy.** İkisini aynı cümleye karıştırmak, modelden mimarisinde olmayan bir ayrımı yapmasını istemektir.

**Sistem istemini bir kasa sayma.** Oraya yazdığın her şey, yeterince ısrarlı bir kullanıcının erişebileceği bir yerdedir. Sır saklamanın yeri istem değil, sistemin kendisi.

**Kimlik yerine kısıt yaz.** Rol vermenin ölçülen katkısı öngörülemez; biçim, kapsam ve çekimserlik kuralları yazmanın katkısı ölçülebilir.

**Gereksinimi baştan topla.** Aklındaki bütün koşulları ilk mesajda vermek, aynı koşulları beş turda açmaktan ölçülebilir biçimde daha iyi sonuç veriyor. Sohbet bir keşif aracı olarak değerli; ama keşif bittiğinde, öğrendiklerini tek bir temiz istemde toplamak en ucuz iyileştirme.

**Sohbet dağıldıysa yeniden başlat.** Yanlış bir erken cevap, sonraki bütün turların girdisidir. Onu diziden çıkarmanın yolu, diziyi yenilemektir.

**Şablonu doğrula.** Modeli doğrudan çalıştırıyorsan, uyguladığın sohbet şablonunun o modelin belgelendirmesindekiyle birebir aynı olduğunu kontrol et. Bu, "talimatları dinlemiyor" şikâyetinin en sık ve en sessiz sebebi.

Bu makalenin bütününden çıkan tek cümle şu: sohbet bir yapı değil, bir gelenek. Roller dizinin içine yazılmış işaretler, sistem isteminin önceliği eğitimle kurulmuş bir eğilim, turların sırası ise modelin kendi hatalarını taşıyan bir kanal. Hiçbiri mimaride garanti altına alınmış değil — ve tam da bu yüzden hepsi ölçülebilir, hepsi bozulabilir.

### Sırada ne var

Bu makale ve öncekiler pencerenin içine ne konacağıyla ilgiliydi: örnekler, roller, talimatlar. Hepsinin ortak kısıtı aynıydı — pencere sonlu. Peki o sınır neden tam olarak orada duruyor ve büyütmenin bir yolu var mı? 21\. makalede bir modelin eğitildiği uzunluğun ötesine kendiliğinden genellemediğini söylemiş, esnetme yollarını sonraya bırakmıştık. Şimdi o yolların ne olduğuna ve neyi bozduğuna bakma zamanı.

## Kaynakça

- Meta (2024). *Model Cards and Prompt Formats — Meta Llama 3*. Resmî belgelendirme. [Bağlantı](https://www.llama.com/docs/model-cards-and-prompt-formats/meta-llama-3/)
- Wallace, E., Xiao, K., Leike, R., Weng, L., Heidecke, J. & Beutel, A. (2024). *The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions*. OpenAI, hakemli olmayan ön çalışma (arXiv:2404.13208). [Bağlantı](https://arxiv.org/abs/2404.13208)
- Zheng, M., Pei, J., Logeswaran, L., Lee, M. & Jurgens, D. (2024). *When "A Helpful Assistant" Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models*. Findings of EMNLP 2024, s. 15126–15154. [Bağlantı](https://aclanthology.org/2024.findings-emnlp.888/)
- Laban, P., Hayashi, H., Zhou, Y. & Neville, J. (2026). *LLMs Get Lost In Multi-Turn Conversation*. ICLR 2026. [Bağlantı](https://openreview.net/forum?id=VKGTGGcwl6)
