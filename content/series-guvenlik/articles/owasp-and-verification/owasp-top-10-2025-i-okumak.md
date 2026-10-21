---
article_id: article_af54bdf5-9a87-4253-89ca-d74188933c89
title: "OWASP Top 10:2025'i Okumak: Liste Neyi Ölçer, Neyi Ölçmez?"
slug: owasp-top-10-2025-i-okumak
category: owasp-and-verification
level: advanced
reading_order: 1
summary: "OWASP Top 10:2025'in hangi veriden ve hangi yargıdan üretildiğini açar: yaygınlık, test kapsamı ve sıklık ayrımını, kategorinin bir zayıflık kümesi olduğunu, sıralamanın yayımlanan formülle birebir yeniden üretilemediğini ve listenin göremediklerini. Sonunda bir 'Top 10 uyumlu' sürüm iddiasının yerine sürümlü ASVS gereksinimlerine ve kanıta dayanan bir iddia kurar."
tags:
  - owasp-top-10
  - risk-farkindaligi
  - asvs
  - wstg
  - dogrulama
content_hash: sha256:0b2e5de713519b8e42984828b9669fc31e0c1e337d4a5419331bf8de26b7155e
classification_version: 1
classification_batch: 0
---
## "Sıfır bulgu" ne söyler?

Çok kiracılı bir faturalama ürününün sürüm adayı bütün kapılardan geçti. Güvenlik tarayıcısının özet kartında "OWASP Top 10: 0 yüksek önemli bulgu" yazıyor ve ürün yöneticisi sürüm notuna "OWASP Top 10 uyumlu" cümlesini eklemek istiyor. Aynı sürümde, bir kiracının kullanıcısının fatura kimliğini değiştirerek başka bir kiracının faturasını okuyabildiği bir uç nokta da var. Tarayıcı onu görmedi; iki kiracıyı birbirinden ayıran kuralın ne olduğunu bilmiyordu.

Bu yazının sorusu, o sürüm notundaki cümlenin neyi kanıtladığı. Cevap, OWASP Top 10'un ne olduğuna bağlı ve OWASP bunu kendi sayfasında tek cümleyle söylüyor: liste, geliştiriciler ve web uygulaması güvenliği için standart bir **farkındalık belgesidir (awareness document)**; web uygulamalarının en kritik riskleri üzerine geniş bir uzlaşıyı temsil eder. Tanımda "gereksinim", "test" ya da "uyum" sözcükleri yok. 2025 sürümü listenin sekizinci edisyonu ve on kategorisi şunlar:

| Kod | Kategori | 2021 edisyonuna göre |
|---|---|---|
| A01:2025 | Broken Access Control | 1. sırada kaldı; sunucu taraflı istek sahteciliği (SSRF) katıldı |
| A02:2025 | Security Misconfiguration | 5. sıradan 2. sıraya |
| A03:2025 | Software Supply Chain Failures | açıklı ve eski bileşenler kategorisinin genişlemesi |
| A04:2025 | Cryptographic Failures | 2. sıradan 4. sıraya |
| A05:2025 | Injection | 3. sıradan 5. sıraya |
| A06:2025 | Insecure Design | 4. sıradan 6. sıraya |
| A07:2025 | Authentication Failures | yerinde; adı kısaldı |
| A08:2025 | Software or Data Integrity Failures | yerinde |
| A09:2025 | Security Logging & Alerting Failures | yerinde; "izleme" yerine "uyarı" |
| A10:2025 | Mishandling of Exceptional Conditions | yeni |

Kategori adlarını İngilizce bırakıyoruz, çünkü bulgu raporları, araçlar ve standartlar onları bu adlarla anar; seri boyunca bir kategoriye hep edisyonuyla birlikte gönderme yapacağız (A10:2025 gibi). Edisyonsuz bir "A10" belirsizdir: 2021 edisyonunda A10 başka bir kategoriydi.

Yazının sonunda sürüm notuna ne yazılması gerektiğine döneceğiz. Önce listenin hangi sayılardan yapıldığına bakmak gerekiyor, çünkü o sayılar neyin kanıtlanabileceğini de belirliyor.

## Bir sayının içinde ne var: yaygınlık, test kapsamı, sıklık

Top 10 verisi, uygulama güvenliği testi yapan kurumların paylaştığı bulgulardan gelir: araç üreticileri, danışmanlıklar, hata ödül platformları. 2025 edisyonu için 2021–2024 dönemine ait veri istendi ve 2,8 milyondan fazla uygulamanın verisi toplandı. Veri çağrısı, ağırlıklı olarak araçlardan gelen bulgularla ağırlıklı olarak insan testinden gelen bulguların ayrı veri kümeleri olarak gönderilmesini önerdi. Örneklem dünyadaki uygulamalar değildir; bu kurumların test ettiği uygulamalardır ve onların test etmeyi bildiği şeylerle sınırlıdır.

Her katkı aynı iki sayıyı taşır: bir yıl içinde belirli bir zayıflık için test edilen uygulama sayısı ve o zayıflığın en az bir örneğinin bulunduğu uygulama sayısı. "Zayıflık" burada MITRE'nin tuttuğu zayıflık sözlüğündeki bir maddedir: **CWE (Common Weakness Enumeration)**. Bu iki sayıdan iki oran çıkar:

- **Yaygınlık oranı (incidence rate):** bir CWE'nin en az bir örneğini taşıyan uygulamaların, o CWE için test edilen uygulamalara oranı.
- **Test kapsamı (coverage):** bütün katkılar içinde, bir CWE için test edilmiş uygulamaların oranı. Kapsama yükseldikçe yaygınlık oranı da daha temsilî olur.

Üçüncü bir sayı bilerek dışarıda bırakılır: **sıklık (frequency)**, yani aynı zayıflığın bir uygulamada kaç kez bulunduğu. Gerekçe ölçüm aracıyla ilgili: elle test eden bir uzman tekrarlayan bir açığı genellikle bir kez yazar, otomatik araç her örneği ayrı bulgu sayar. Bir uygulamada dört ya da dört bin örnek bulunması Top 10 hesabını değiştirmez; sorulan tek şey "bu uygulamada var mı" sorusudur.

Bu ayrım raporlardaki en yaygın okuma hatasının da kaynağı. A01:2025'in tablosu yaygınlığı iki sayıyla verir: en yüksek değer yüzde 20,15, ortalama yüzde 3,74. Kapsama da iki sayıyla gelir: en yüksek yüzde 100, ortalama yüzde 42,93. Kategori sayfasının giriş cümlesi test edilen uygulamaların yüzde yüzünde bir tür bozuk erişim denetimi bulunduğunu söylüyor; tabloda ise yüzde yüz, kapsama sütununda duruyor. Kapsama bir CWE için tanımlandığından bu sayının doğal okuması, kategorideki zayıflıklardan en az biri için verideki bütün uygulamaların test edilmiş olmasıdır. Yüzde yüz bir test edilme oranıdır; bir açık oranı değildir. Enjeksiyon kategorisinin sayfası aynı sayıyı doğru kurar: test edilen uygulamaların yüzde yüzü bir tür enjeksiyon için test edilmiştir.

İki yaygınlık sayısı arasındaki fark da bilgi taşır. A06:2025'te en yüksek yaygınlık yüzde 22,18, ortalaması yüzde 1,86. Belge "en yüksek" ve "ortalama" sütunlarının tam olarak hangi birimler üzerinden alındığını ayrıca tanımlamıyor; okunabilecek şey, kategorinin eşit yaygın zayıflıklardan oluşmadığıdır. Birkaç yaygın ve çok sayıda seyrek zayıflık aynı başlığın altında durur ve tek başına okunan ortalama yaygın olanı gizler.

> **Teşhis et:** Bir güvenlik panosu "A05:2025 Injection — test edilen uygulamaların %100'ü" diyor. Ekip toplantısında "demek ki bütün uygulamalarımız enjeksiyona açık" sonucu çıkıyor. Bu okumanın hatası ne ve hangi soru sorulmalı?

Sayı test kapsamıdır. A05:2025'in tablosunda yüzde yüz, kapsama sütununun en yüksek değeridir; aynı tablonun ortalama yaygınlığı yüzde 3,08. İyi bir cevap önce paydayı adlandırır: kimin, hangi CWE için, hangi dönemde test ettiği uygulamalar. Sonra kapsama ile yaygınlığı ayırır ve asıl soruyu sorar: bizim uygulamalarımızda hangi enjeksiyon CWE'leri, hangi uç noktalarda ve hangi kimlikle test edildi? "Hepsi açık" diyen cevap ile "oran düşük, bize bir şey olmaz" diyen cevap aynı hatayı iki yönden yapar: başkalarının örnekleminden senin sistemine hüküm çıkarır.

## Kategori bir zayıflık değil, bir küme

2025 edisyonunda 589 CWE incelendi; listeye giren on kategoride 248 CWE var ve MITRE sözlüğünde yayın anında 968 CWE bulunuyordu. Kategori başına ortalama 25 CWE düşüyor; en büyüğü 40 CWE ile A01:2025 ve bu 40, bilerek konmuş bir tavan.

Gruplama ölçütü mümkün olduğunca **kök nedendir (root cause)**. OWASP'ın örneğiyle "kriptografik hata" ve "yapılandırma hatası" kök nedendir; "hassas veri ifşası" ve "hizmet reddi" ise **belirtidir (symptom)**. CWE'lerin kendisi de iki türün karışımıdır ve kategori yapısı bu karışımı olabildiğince kök neden tarafına toplamaya çalışır. Listenin neden on CWE'den oluşmadığına da cevap verilmiş: her CWE her dilde ve çatıda var olmadığı için on CWE'lik bir liste bazı ekipler için kısmen anlamsız kalır; aynı açık farklı araçlarda farklı CWE'lerle raporlandığı için de tek CWE'ye bağlanan bir kategori bulguları dağıtır.

Mühendislik açısından sonucu şu: kategori bir çalışma birimi değildir. A01:2025'in içinde yol geçişi (CWE-22), kullanıcının denetlediği anahtarla yetki atlatma (CWE-639), siteler arası istek sahteciliği (CSRF, CWE-352) ve bu edisyonda kategoriye katılan SSRF (CWE-918) birlikte durur. Bunlar dört ayrı mekanizma, dört ayrı düzeltme ve dört ayrı testtir. "A01'de üç bulgumuz var" cümlesi bir ekibe ne yapacağını söylemez; bulgu CWE kimliğiyle ve aşağıda göreceğimiz gibi karşıladığı ya da karşılamadığı gereksinimin kimliğiyle raporlanmalıdır.

Aynı sebeple edisyonlar arası karşılaştırma dikkat ister. SSRF 2021'de kendi kategorisiydi, 2025'te A01'in içinde. A03:2025, 2021'in açıklı ve eski bileşenler kategorisinin bağımlılık ekosistemini, yapı sistemlerini ve dağıtım altyapısını da kapsayacak biçimde genişletilmiş hâli. A10:2025 tamamen yeni. "A10 bulgularımız iki edisyonda arttı" diyen bir grafik iki farklı şeyi aynı eksene koyar.

## Sıra nereden geliyor?

Riskin ikinci yarısı yaygınlıktan değil, yayımlanmış açıklardan gelir. OWASP, ABD'nin Ulusal Açık Veritabanındaki (NVD) yayımlanmış açık kayıtlarını, yani **CVE (Common Vulnerabilities and Exposures)** kayıtlarını CWE'lerine göre gruplayıp her CWE için açık puanlama sistemi CVSS'in (Common Vulnerability Scoring System) v2 ve v3 sürümlerindeki **istismar** ve **etki** alt puanlarının ağırlıklı ortalamasını çıkarmış; yaklaşık 175 bin CVE–CWE kaydı ve 643 farklı CWE. CVSS v4 kullanılmamış, çünkü yeni puanlama bu iki alt puanı aynı kolaylıkla vermiyor. Bu ortalamaların anlamı sınırlıdır: aynı CWE'yi taşıyan, başka sistemlerde raporlanmış açıkların ortalaması. Senin uygulamanda o zayıflığın nasıl istismar edileceğini söylemez.

Yayımlanan formül bu parçaları tek bir puanda toplar: en yüksek yaygınlığın bin katı, en yüksek kapsamanın yüz katı, ortalama istismarın on katı, ortalama etkinin yirmi katı ve toplam bulunma sayısının on binde biri. Oranlar kesir olarak girer. Formülü tablodaki sayılarla kendimiz uyguladık. Listeye girmeyen bellek yönetimi kategorisi için hesap 29,60 + 55,62 + 67,50 + 96,40 + 22,04 = 271,16 veriyor; OWASP'ın yayımladığı değer 271,08. Fark yuvarlamadır, yani formülü doğru okuyoruz. A01:2025 için aynı hesap 201,50 + 100,00 + 70,40 + 76,80 + 183,97 = 632,67 veriyor; yayımlanan değer 621,60. On bir puanlık farkı kaynak açıklamıyor; tablodaki sayılar puanın girdileriyle birebir aynı değil.

Seçimin bir kısmı da veriden gelmez. On kategorinin sekizi veriden, ikisi topluluk anketinden seçilir; gerekçe, verinin geçmişe baktığı ve yeni bir zayıflık türünün ölçekte test edilebilir hâle gelmesinin yıllar alabildiğidir. A03:2025 anketin birincisi: katılımcıların tam yüzde ellisi onu birinci sıraya koymuş. Veride yalnızca 11 CVE ile görünüyor; test edildiğinde ortalama yaygınlığı yüzde 5,72 ile en yüksek olan kategori, ama ortalama kapsaması yüzde 27,47. A09:2025 üçüncü kez anketle listeye girdi; sayfası kategorinin test edilmesinin çok zor olduğunu ve veride hep az temsil edileceğini yazıyor.

Puan sırası ile liste sırası da örtüşmüyor. Kendi hesabımızla A08:2025'in puanı 385,35, listeye girmeyen uygulama dayanıklılığı kategorisininki 522,02; liste ilkini içeriyor, ikincisini dışarıda bırakıyor. A10:2025'in puanı (530,96) A08'inkinden yüksek ama A10 onuncu sırada. Yazarlar bunu saklamıyor: edisyonun "veriyle bilgilendirilmiş, ama körü körüne veriye dayalı olmadığını" ve puanlamanın kusursuz bir sistem olmadığını kendileri söylüyorlar. Şekil 1 bir sıranın hangi girdilerden geçtiğini ve neyin hesaba hiç girmediğini gösteriyor.

![Üstte üç girdi kutusu: katkıcı test verisi, 2021–2024, araç ve insan, 2,8 milyon+ uygulama; NVD'deki CVE'ler, CVSS v2 ve v3 alt puanları, yaklaşık 175 bin CVE–CWE kaydı; topluluk anketi, verinin henüz göremediği riskler için oy. İlk iki kutudan oklar CWE başına kapsama ve yaygınlık ile CWE başına istismar ve etki ortalaması kutularına iner; ikisi kümeleme ve puan kutusunda birleşir: CWE'ler kök nedene göre kategorilere, 10 kategoride 248 CWE; puan yaygınlık, kapsama, istismar, etki ve bulunma sayısından. Bu kutu ile anket Top 10:2025 kutusuna bağlanır: 8 kategori veriden, puan ve yargıyla; 2 kategori anketten, A03 ve A09. Altta hesaba girmeyenler: bir uygulamadaki örnek sayısı, senin bağlamın ve iş etkin, ölçekte otomatik test edilemeyen tasarım, iş mantığı ve uyarının işe yaraması.](assets/bir-siranin-girdileri.svg "Şekil 1 — Bir Top 10 sırasının girdileri ve hesaba girmeyenler")

Bu, sıralamayı değersiz kılmıyor; neye yaradığını sınırlıyor. Sıra, sektörün başka sistemlerde gördüğü zayıflık sınıflarının kabaca bir önceliğidir. Senin ürünün için A04'ün A05'ten önemli olduğunu söylemez; bir iki sıralık fark, bu formülün ve bu örneklemin içinde bile kesin bir ölçüm değildir.

## Listenin göremedikleri

Bazı riskler yapısal olarak verinin dışında kalır. OWASP'ın 2021 edisyonunda listeyi standart olarak kullanmanın sınırlarını anlatan sayfa iki örnek veriyordu: güvensiz tasarım çoğu test biçiminin kapsamının dışındadır; kayıt ve izlemenin gerçekten yerinde ve etkili olup olmadığı ise ancak görüşmelerle ve olay müdahalelerinden örnekler istenerek anlaşılabilir. Bir statik analiz aracı kayıt kodunun yokluğunu bulabilir; iş mantığının ya da erişim denetiminin kritik ihlalleri kaydedip kaydetmediğini belirleyemeyebilir. 2025 edisyonunun A09 sayfası aynı noktayı uyarı tarafından yapıyor: iyi kayıt, uyarı olmadan güvenlik olaylarını yakalamakta az değerlidir.

Listeye girmeyen ama sınırda kalan üç konu da adıyla yazılmış. Uygulama dayanıklılığı, 2021'de de liste dışında kalan hizmet reddi başlığının kök nedene göre yeniden adlandırılmış hâli ve puanlamada A10:2025'e çok yaklaşmış. Bellek yönetimi hataları en çok CVE'yle ilişkilenen üçüncü sınıf olduğu hâlde ankette en düşük puanı almış; yazarlar bunu web uygulamalarının geleneksel masaüstü uygulamalarına baskın gelmesine bağlıyor. Yapay zekâ üretimi koda uygunsuz güvenin ise henüz ne CWE'si ne CVE'si var.

En büyük kör nokta ise senin bağlamın. OWASP kendi örneğini veriyor: aynı içerik yönetim sistemini kamuya açık bilgi için kullanan bir kurumla sağlık kayıtları için kullanan bir sağlık sistemi aynı yazılımı çalıştırır ama tehdit aktörleri ve bir ihlalin iş etkisi bambaşkadır. Listenin puanı istismar ve teknik etkiyi ortalamadan alır; maruziyetin, saldırganın ve iş etkisinin senin ürünündeki değerini veremez. ASVS'nin cümlesiyle: saldırgan için kapsam diye bir şey yoktur. Şekil 2, bir "sıfır bulgu" raporunun bu katmanlardan hangisi için konuşabildiğini gösteriyor. Sağdaki örneklerden biri, sistemin bir hata anında izin verici duruma düşmesi (fail-open), sıradaki yazının konusu.

![İç içe dört dikdörtgen. En dıştaki ürünün risk yüzeyi; üst kenarında listenin dışında kalanlar yazar: dayanıklılık, X01, ve ürüne özgü kötüye kullanım. İkincisi Top 10:2025 kategorilerindeki zayıflıklar; sağında aracın kendiliğinden göremediği örnekler sıralanır: kiracılar arası erişim, A01; hata yolunda fail-open, A10; uyarının işe yaraması, A09; tasarım hatası, A06. Üçüncüsü aracın test edebildiği CWE'ler; alt kenarında test edilebilir ama bu taramada dışarıda kalanların notu var. En içteki bu taramada test edilenler; ortasında “0 bulgu” iddiasının yalnızca bu kutu için geçerli olduğu yazar.](assets/sifir-bulgu-nereye-kadar.svg "Şekil 2 — Bir sıfır bulgu raporu yalnızca en içteki kutu için konuşur")

## Hangi soruya hangi belge

OWASP'ın belgeleri farklı sorulara cevap verir ve birini ötekinin yerine kullanmak sahte güvence üretir. Aşağıdaki tablo bu serinin her yazıda kullanacağı ayrımı özetliyor.

| Belge ve sürüm | Cevapladığı soru | Cevaplamadığı soru |
|---|---|---|
| Top 10:2025 | Hangi zayıflık sınıfları yaygın, ekip neyi bilmeli? | Ürün neyi sağlamalı, nasıl test edilir? |
| API Security Top 10:2023 | API'ye özgü riskler hangileri? | Web genelindeki her sınıf |
| ASVS 5.0.0 | Hangi gereksinim doğrulanabilir, hangi seviyede? | Nasıl uygulanır, nasıl test edilir? |
| Cheat Sheet Series, Proactive Controls 2024 | Bir kontrol nasıl uygulanır? | Uygulamanın gerçekten uyguladığı |
| WSTG v4.2 | Bir kontrol nasıl test edilir? | Hangi kontrolün gerekli olduğu |
| SAMM v2, NIST SSDF v1.1 | Ekip ve süreç ne kadar olgun? | Tek bir uygulamanın güvenliği |

Bu ayrımın merkezinde **ASVS (Application Security Verification Standard)** var, çünkü bir güvenlik iddiasını doğrulanabilir yapan oradaki biçimdir. 30 Mayıs 2025'te yayımlanan 5.0.0 sürümü 17 bölümde gereksinimler tanımlıyor; resmî JSON dışa aktarımından kendi saydığımız toplam 345: 70'i birinci seviyede, 183'ü ikinci, 92'si üçüncü. ASVS her gereksinimin "geçti" ya da "kaldı" kararıyla doğrulanabilir olmasını şart koşar ve **doğrulama seviyesini (verification level)** organizasyonun kendi risk analizine bırakır: az hassas veri toplayan erken aşama bir girişim birinci seviyeyle başlayabilir, bir bankanın çevrim içi bankacılığı için üçüncü seviyenin altını gerekçelendirmek zordur. ASVS kendini iki komşusundan da bilerek ayırır: bir gereksinimin belirli bir teknolojide nasıl uygulanacağı Cheat Sheet Series'in, nasıl test edileceği WSTG'nin işidir.

Gereksinim kimliği de sürümüyle yazılır, çünkü numaralar büyük sürümler arasında değişir: ASVS'nin kendi önerdiği biçimle `v5.0.0-8.2.2`, 5.0.0 sürümünde veri düzeyinde erişimin yalnızca o veri üzerinde açık yetkisi olan tüketicilere verildiğini doğrulayan birinci seviye gereksinimdir; amacı, bir nesneye kullanıcının verdiği kimlikle yetki denetimi yapılmadan erişilmesini (IDOR, insecure direct object reference) ve API'lerdeki karşılığı olan nesne düzeyinde bozuk yetkilendirmeyi (BOLA, broken object level authorization) önlemektir. `v5.0.0-8.4.1` ikinci seviyede çok kiracılı uygulamalarda kiracılar arası denetimi ister. Test tarafında, Ekim 2026 itibarıyla kararlı WSTG sürümü v4.2'dir (Aralık 2020): sitenin "kararlı" adresi bu sürüme yönleniyor ve sürümün kendi çapraz atıfları ASVS'nin eski sürümlerini gösteriyor. Program tarafında NIST'in Güvenli Yazılım Geliştirme Çerçevesinin nihai sürümü Şubat 2022 tarihli 1.1; 1.2 sürümü yalnızca Aralık 2025'te yayımlanmış bir kamu taslağı.

OWASP'ın 2021 edisyonu bu ayrımı listenin kendisi için açıkça yazmıştı: Top 10'u kodlama ya da test standardı olarak kullanmak asgaridir ve yalnızca bir başlangıçtır; bir uygulama güvenliği standardı benimsemek isteyen herkes ASVS'ye yönlendirilir; araçlar Top 10'u kapsamlı biçimde tespit edemez, test edemez ve ondan koruyamaz, bu yüzden OWASP Top 10'un tamamını kapsama iddialarını doğru bulmaz. 2025 edisyonu aynı yönü uygulama güvenliği programı bölümünde koruyor: listeler eksiksiz değildir, yalnızca bir başlangıç noktasıdır ve güvenlik gereksinimleri için ASVS önerilir.

> **Teşhis et:** Bir araç üreticisi "ürünümüz OWASP Top 10:2025'in tamamını kapsıyor" diyor. Satın alma kararından önce ondan hangi üç bilgiyi istersin?

Birincisi hangi CWE'leri test ettiği: kategori bir kümedir ve "on kategoriyi kapsamak", içlerindeki 248 CWE'nin hangileri sorusunu cevapsız bırakır. İkincisi bu CWE'lerin hangi koşulda test edildiği: kimliği doğrulanmış oturumla mı, farklı yetki düzeylerinde iki hesapla mı, çok adımlı bir iş akışının içinde mi. Üçüncüsü sonucun hangi doğrulanabilir gereksinime bağlandığı ve bu eşlemenin hangi ASVS sürümüyle yapıldığı. Yaygın yanlış cevap kategori başına bulgu sayısını istemektir; bulgu sayısı kapsamayı ölçmez ve sıfır bulgu, test edilmemiş bir zayıflıkla aynı görünür.

## "Top 10 uyumlu" yerine ne yazılır?

Faturalama ürününe dönelim. Bu seride her yazı bir **güven sınırı (trust boundary)** arayacak: verinin, isteğin ya da kararın güvenin değiştiği yerden geçtiği nokta. Bu yazıdaki sınır alışılmadık bir yerde, kodda değil kanıtta: aracın test ettiği küme ile ürünün yaptığı her şey arasında. Sürüm notundaki cümle o sınırın öbür tarafı hakkında konuşuyordu.

Doğru iddia, neyin doğrulandığını sürümlü kimliklerle ve kanıtıyla söyler, neyin doğrulanmadığını da saklamaz. Bunu sürümle birlikte duran küçük bir kanıt dosyası olarak tutmak, iddiayı denetlenebilir yapar:

```yaml
release: faturalama-2026.10.3
standard: OWASP ASVS v5.0.0
target_level: L2
requirements:
  - id: v5.0.0-8.2.2
    status: verified
    evidence: tests/authz/cross-tenant-read.spec.ts
  - id: v5.0.0-8.4.1
    status: verified
    evidence: tests/authz/tenant-isolation.spec.ts
  - id: v5.0.0-16.5.3
    status: not-verified
    evidence: null
scanner:
  report: dast-2026-10-20.json
  tested_cwes: [22, 79, 89, 352, 918]
  not_covered: [is-mantigi, kiracilar-arasi-erisim]
```

Sürüm kapısı bu dosyadan iki kural çıkarır: "doğrulandı" denen her gereksinimin çalıştırılabilir bir kanıtı vardır ve kanıtı olmayan gereksinim sürüm notunda doğrulanmış diye geçmez. Gerçek bir kapı yalnızca dosya adının yazılmış olmasına değil, o testin bu yapıda koşup geçtiğine de bakar; aşağıdaki çekirdek kuralın biçimini gösteriyor ve sürüm notunu bir iddiadan denetlenebilir bir kayda çeviren de bu biçim:

```ts
type Requirement = { id: string; status: "verified" | "not-verified"; evidence: string | null };

export function assertEvidence(requirements: Requirement[]): void {
  const unproven = requirements.filter((r) => r.status === "verified" && !r.evidence);
  if (unproven.length > 0) {
    throw new Error(`Kanıtsız "doğrulandı" iddiası: ${unproven.map((r) => r.id).join(", ")}`);
  }
}
```

Kanıt dosyasındaki ilk gereksinimin testi, tarayıcının kendiliğinden yapamadığı şeydir. WSTG'nin IDOR testi (WSTG-ATHZ-04, v4.2) bunun yöntemini verir: en az iki, çoğunlukla daha fazla kullanıcıyla, birinin nesnesine ötekinin kimliğiyle erişmeyi denemek. Faturalama ürününde bu iki kiracı demektir:

```ts
it("A kiracısının kullanıcısı B kiracısının faturasını okuyamaz", async () => {
  const invoiceOfB = await seed.invoice({ tenant: "tenant-b" });
  const res = await api.as(userOfTenantA).get(`/invoices/${invoiceOfB.id}`);

  expect([403, 404]).toContain(res.status);
  expect(await res.text()).not.toContain(invoiceOfB.number);
});
```

Test bilerek iki durum kodunu da kabul ediyor; başka bir kiracının nesnesinin var olduğunu bile söylememek için hangisinin seçileceği ve kiracı sınırının hangi katmanda zorunlu kılınacağı yetkilendirme yazısının konusu. Burada önemli olan şu: bu test kırmızıya döndüğünde "OWASP Top 10: 0 bulgu" kartı yeşil kalmaya devam ederdi. Sürüm notunun yeni hâli üç cümleden oluşur: hangi ASVS 5.0.0 gereksinimlerinin hangi kanıtla doğrulandığı, hangilerinin doğrulanmadığı ve tarayıcının hangi CWE'leri hangi kapsamla test ettiği.

## Karar kartı

- **Varsayım:** "Güvenlik taraması Top 10 için temizse ürün Top 10 risklerine karşı korunuyor."
- **Güven sınırı:** Kanıtın sınırı, yani aracın gerçekten test ettiği CWE'ler ve uç noktalar ile ürünün yaptığı her şey arasındaki fark.
- **Karar:** Sürüm iddiasını sürümlü ASVS gereksinimleri ve kanıtla yazmak; Top 10'u tehdit modelleme ve eğitim gündemi olarak kullanmak; bulguları kategoriyle değil CWE ve gereksinim kimliğiyle raporlamak.
- **Somut risk:** Tarayıcının kapsamı dışındaki bir kiracılar arası erişim açığının "uyumlu" etiketiyle üretime çıkması.
- **Doğrulanabilir özellik:** "Doğrulandı" denen her gereksinimin (ör. `v5.0.0-8.2.2`) çalıştırılabilir bir kanıtı vardır; kanıtsız iddia sürüm kapısını durdurur.
- **Negatif test:** A kiracısının kullanıcısı B kiracısının nesnesini istediğinde 403 ya da 404 alır ve yanıt gövdesinde B'nin verisi bulunmaz.
- **Üretimde sinyal:** Kiracı başına yetki reddi sayaçları ve beklenmedik başarılı nesne erişimleri; tarama raporunun test ettiği CWE listesinin sürümden sürüme değişimi.
- **Kalan risk:** Gereksinim listesi de tehdit modelinin dışında kalanı göremez; kanıt dosyası yalnızca yazılmış testleri listeler, yazılmamış olanı bulmaz.

### Sırada ne var

Bir kategoriyi okumayı öğrendik; sıradaki adım birini doğrulanabilir bir gereksinime ve teste çevirmek. Listenin en yeni kategorisi A10:2025 hatanın kendisini konu alıyor: yetki kararını veren servis zaman aşımına uğradığında kodun hangi dala düştüğünü kim test ediyor? Bir sonraki yazı bu soruyu bir belge paylaşım servisinin hata yollarında, ASVS gereksinimleri ve hata enjeksiyonlu negatif testlerle cevaplıyor.

## Kaynakça

- van der Stock, A., Glas, B., Smithline, N., Janca, T. & Gigler, T. (2025). *OWASP Top 10:2025* — Introduction; What are Application Security Risks?; Establishing a Modern Application Security Program; A01, A03, A05, A06, A09 ve A10 kategori sayfaları; Next Steps. OWASP Foundation. Erişim: 21 Ekim 2026. [Bağlantı](https://top10.owasp.org/2025/)
- OWASP Foundation (2025). *OWASP Top 10 — Data 2025* (2025 edisyonunun veri çağrısı). Erişim: 21 Ekim 2026. [Bağlantı](https://owasp.org/projects/top-ten?tab=data-2025)
- OWASP Top 10 ekibi (2021). *How to use the OWASP Top 10 as a standard* (2021 edisyonu). OWASP Foundation. [Bağlantı](https://owasp.org/Top10/2021/A00_2021_How_to_use_the_OWASP_Top_10_as_a_standard/)
- OWASP ASVS Projesi (2025). *OWASP Application Security Verification Standard 5.0.0* — "What is the ASVS?", V8 Authorization ve resmî JSON dışa aktarımı. OWASP Foundation. [Bağlantı](https://github.com/OWASP/ASVS/releases/tag/v5.0.0_release)
- OWASP API Security Projesi (2023). *OWASP Top 10 API Security Risks – 2023*. OWASP Foundation. [Bağlantı](https://api-security.owasp.org/editions/2023/en/0x11-t10/)
- OWASP Proactive Controls Projesi (2024). *OWASP Top 10 Proactive Controls 2024*. OWASP Foundation. [Bağlantı](https://top10proactive.owasp.org/)
- OWASP Cheat Sheet Series. *OWASP Cheat Sheet Series*. OWASP Foundation. Erişim: 21 Ekim 2026. [Bağlantı](https://cheatsheetseries.owasp.org/)
- OWASP WSTG Projesi (2020). *Web Security Testing Guide v4.2* — WSTG-ATHZ-04: Testing for Insecure Direct Object References. OWASP Foundation. [Bağlantı](https://wstg.owasp.org/v4.2/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References/)
- OWASP SAMM Projesi. *OWASP SAMM v2 — The Model*. OWASP Foundation. Erişim: 21 Ekim 2026. [Bağlantı](https://owaspsamm.org/model/)
- Souppaya, M., Scarfone, K. & Dodson, D. (2022). *Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities* (NIST SP 800-218). NIST. [Bağlantı](https://doi.org/10.6028/NIST.SP.800-218)
- Booth, H., Ogata, M., Kent, K., Souppaya, M. & Dodson, D. (2025). *Secure Software Development Framework (SSDF) Version 1.2* (NIST SP 800-218 Rev. 1, ilk kamu taslağı). NIST. [Bağlantı](https://csrc.nist.gov/pubs/sp/800/218/r1/ipd)
