---
article_id: article_1907ac99-989b-41e0-86b5-40095b27c100
title: "LLM Reasoning, Test-Time Compute ve Verification"
slug: llm-reasoning-test-time-compute-ve-verification
category: reasoning-and-memory
level: intermediate
reading_order: 8
summary: "LLM'lerde reasoning'i aday üretme, arama, doğrulama ve durdurma döngüsü olarak ele alarak test-time compute'un performansa etkisini açıklar."
tags:
  - reasoning
  - test-time-compute
  - verification
  - llm
  - arama
content_hash: sha256:85808d52c7399ee99b252311d7d740dc0c16aaae5e68a24acf1eea7a06447cdc
classification_version: 1
classification_batch: 0
---
# LLM Reasoning, Test-Time Compute ve Verification

## Kısa tez ve neden bu konu üst seviye

**Kısa tez.** LLM’lerde reasoning, modelin sadece daha uzun cevap üretmesi değildir. Asıl mesele, inference sırasında ek hesaplama ayrılarak ara düşünce izleri üretmek, alternatif çözüm yollarını örneklemek, gerektiğinde geri dönmek ve bu adayları outcome ya da process düzeyinde doğrulamaktır. Bu yüzden reasoning’i anlamanın doğru birimi tek başına son cevap değil, **aday üretme, arama, doğrulama ve durdurma** döngüsüdür.

**Neden bu konu bir üst seviye?** Çünkü 2020-2022 döneminin baskın resmi şuydu: daha fazla parametre, daha fazla veri, daha fazla train-time compute. Kaplan ve Chinchilla çizgisi bunu açık biçimde formüle etti. Reasoning literatürü bu tabloya ikinci bir eksen ekledi: **aynı ağırlıklarla, soru başına daha fazla ve daha akıllı inference compute** kullanmak. Snell ve arkadaşları, uygun test-time scaling ile bazı görevlerde küçük bir baz modelin, FLOPs eşitlemesinde çok daha büyük bir modeli aşabildiğini gösterdi. OpenAI’nin o1 raporları da train-time RL ile test-time thinking’in ayrı ama birbirini tamamlayan ölçekleme eksenleri olduğunu açıkça savundu. Bu, “model gücü = yalnızca parametre sayısı” basitleştirmesini bozuyor.

Bu konunun önemi sadece performans değil. Eğer başarı, son cevaptan çok **arama politikasına** ve **doğrulama kalitesine** bağlıysa, güvenilirlik, maliyet, benchmark yorumu ve güvenlik denetimi de değişir. Aynı model, kötü arama politikasıyla zayıf; iyi örnekleme ve verifier ile çok daha güçlü olabilir. Tersi de doğrudur: uzun düşünme izleri olup hâlâ kırılgan kalabilir.

## Temel kavramlar ve araştırma haritası

**Temel kavramlar.** *Chain-of-thought* (CoT), modelin ara reasoning adımlarını doğal dilde dışsallaştırmasıdır. Wei ve arkadaşları bunun yeterince büyük modellerde karmaşık muhakeme görevlerini ciddi biçimde iyileştirdiğini gösterdi; Kojima ve arkadaşları ise aynı fikrin “Let’s think step by step” gibi çok basit zero-shot tetikleyicilerle bile çalışabildiğini gösterdi. *Self-consistency*, tek bir greedy iz yerine çoklu reasoning izi örnekleyip en tutarlı cevabı seçer. *Tree of Thoughts* (ToT), lineer CoT’yi ağaç biçimine genişletir: model birden fazla düşünce dalı üretir, bunları değerlendirir, ileri bakar ve gerekirse geri döner. *Verifier*, bu adayları puanlayan mekanizmadır; bazen sadece final cevabı değerlendirir, bazen de her ara adımı. *Outcome reward model* (ORM), yalnızca sonucu puanlar; *process reward model* (PRM) ise reasoning sürecinin adımlarını puanlar. *Test-time compute* veya *inference-time scaling*, model ağırlıklarını değiştirmeden inference sırasında ek hesaplama ayrılmasıdır.

**Inference-time scaling ile pretraining scaling farkı.** Pretraining scaling, model boyutunu, veri miktarını ve eğitim hesaplamasını değiştirir; yani ağırlıkları yeniden şekillendirir. Inference-time scaling ise sabit bir modeli, soru bazında daha fazla düşünmeye, örneklemeye, dallanmaya veya doğrulamaya zorlar. Birincisi kapasitenin tabanını yükseltir; ikincisi o kapasitenin tekil örnekte ne kadar etkili açığa çıktığını belirler. Bu yüzden inference-time scaling, baz modelin dağılımında hiç bulunmayan bir beceriyi sihirli biçimde yaratmaz; ama baz modelin zaten kısmen taşıdığı doğru çözüm izlerini çok daha iyi yüzeye çıkarabilir.

**Araştırma haritası.** Çizgi kabaca şöyle ilerledi: 2021’de GSM8K ve verifiers ekseni, “doğru cevabı bulmak için aday üretip sonradan seçme” fikrini ciddileştirdi. 2022’de CoT, zero-shot CoT ve least-to-most prompting, ara adım üretmenin performans kazancı sağladığını gösterdi. 2022-2023’te self-consistency ve ToT, “tek iz” yerine “çoklu aday + seçim” yaklaşımını öne çıkardı. Aynı dönemde Uesato ve Lightman, outcome supervision ile process supervision ayrımını netleştirdi. 2023’te faithfulness literatürü, CoT’nin her zaman modelin gerçek içsel hesabını yansıtmadığını gösterdi. 2024’te Snell ve arkadaşları test-time compute için hesap-optimal bir çerçeve sundu. 2024-2025 döneminde o1 ve DeepSeek-R1 gibi reasoning modelleri RL ile uzun düşünme, self-reflection ve verification kalıplarını sistematik hale getirdi. 2025-2026’da ise tablo daha da netleşti: verification merkezîdir, overthinking gerçektir, faithfulness sınırlıdır ve benchmark başarısı tek başına yeterli değildir.

## Reasoning, chain-of-thought ve test-time compute nasıl çalışır

LLM bağlamında “reasoning”i en sağlam şekilde metafizik değil, **operasyonel** tanımlamak gerekir: modelin zor, çok adımlı görevlerde ara temsil ve ek inference compute kullanarak başarı oranını artırabilme kapasitesi. CoT burada üç işe yarar. Birincisi, zor girdiden doğrudan cevaba atlamak yerine problemi alt adımlara böler. Least-to-most prompting’in kolaydan zora genellemede sağladığı sıçrama bunun açık örneğidir. İkincisi, modelin tek bir deterministik patikaya kilitlenmesini azaltır; self-consistency çoklu reasoning izlerini örnekleyerek varyansı yönetir. Üçüncüsü, search ve verification için bir yüzey sağlar; ToT gibi yöntemler ancak ara “thought” birimleri varsa dallanma, lookahead ve backtracking yapabilir.

Ama CoT’nin faydası “model nihayet gerçek düşüncesini yazıyor” demek değildir. Lanham ve arkadaşları, CoT’nin performans artışının sadece ek test-time compute veya belirli phrasing’lerden gelmediğini, ayrıca modellerin göreve göre CoT’ye bazen güçlü bazen zayıf biçimde koşullandığını gösterdi. Daha da sert biçimde, Turpin ve arkadaşları CoT açıklamalarının gerçek karar nedenini sistematik olarak yanlış temsil edebildiğini, Chen ve arkadaşları ise reasoning modellerinde bile verilen ipuçlarının kullanımını CoT’nin çoğu zaman düşük oranda açığa vurduğunu gösterdi. Arcuschin ve arkadaşları bunu yapay bias enjekte edilmemiş, doğal promptlarda da gözledi. Kısacası CoT, çoğu zaman faydalı bir **çalışma alanı**dır; ama otomatik olarak güvenilir bir **mekanizma aynası** değildir.

**Test-time compute nedir?** En sade tanım şu: model ağırlıklarını sabit tutup inference sırasında ek hesaplama harcamak. Bu, sadece daha uzun düşünme değildir. Test-time compute literatürü bunu birkaç aileye ayırıyor: tekrar örnekleme, self-correction, verifier-guided reranking, tree search ve hibrit search stratejileri. Bu yöntemler aynı problemi çözmeye çalışır: tek bir greedy decoding patikası, özellikle zor görevlerde, çok kırılgandır. Repeated sampling farklı adaylar açar. Self-consistency bu adaylar arasında çoğunluk veya marjinalleştirme yapar. Tree search lineer düşünmeyi kırar, çıkmaz sokaklardan dönebilir. Verifier ise hangi patikanın umut verici olduğunu puanlar.

**Verifier neden kritik?** Çünkü brute-force çoklu örnekleme tek başına pahalı ve dağınıktır. Cobbe ve arkadaşlarının erken verifier çalışması matematik problemlerinde aday çözümleri sonradan seçmenin gücünü gösterdi. Daha sonra step-aware verifier ve PRM çalışmaları, “doğru sonuca yanlış süreçle” ve “yanlış sonuca doğruya yakın süreçle” durumlarını ayırmanın önemli olduğunu gösterdi. PRM/ORM ayrımı tam burada devreye girer: ORM nihai cevabı kontrol eder, PRM ise reasoning sürecini denetler. PRM daha ince kredi ataması sağlar; ORM daha ucuz etiketlenebilir. Modern TTS literatürü bu yüzden verifier’ı artık yan modül değil, merkezî bileşen olarak görüyor.

## Ana tartışmalar

**Daha uzun CoT gerçekten daha iyi reasoning midir?** Kısmen evet, ama doğrusal biçimde değil. s1 çalışması, küçük ama kaliteli reasoning verisiyle yapılan ince ayar ve “budget forcing” gibi basit test-time müdahalelerin matematik benchmarklarında anlamlı kazanımlar sağlayabildiğini gösterdi. Bu, “daha fazla düşünme” kampının neden hızla güçlendiğini açıklıyor. Fakat 2025-2026 literatürü daha soğuk bir tablo çiziyor: uzun trace’ler yararlı olabilir, ama fayda bir eşikten sonra azalıyor ve ardından bozulabiliyor. “Does Thinking More Always Help?”, “When More Thinking Hurts” ve “Thinking Past the Answer” çizgisi, reasoning token’larının marjinal faydasının negatifleşebildiğini, modelin doğru cevabı bulduktan sonra mantıksal drift veya ikinci kez yanlış yeniden yorumlama ile cevabı bozabildiğini gösterdi. “Uzun düşünme” bir araçtır; garanti değildir.

**Verification olmadan reasoning güvenilir midir?** En güçlü kanıtlar bunun hayır yönünde olduğunu söylüyor. Setlur ve arkadaşları teorik ve ampirik olarak, verification tabanlı RL/search yöntemlerinin, sadece başarılı trace’leri taklit eden verifier-free yöntemlerden belirgin biçimde daha iyi ölçeklendiğini; test-time budget büyüdükçe farkın açıldığını savundu. Snell ve arkadaşları da test-time compute’un etkisinin prompt zorluğuna bağlı olduğunu ve compute-optimal stratejilerin basit best-of-N’den çok daha verimli olabildiğini gösterdi. Bunun başka bir yüzü de şu: dış verifier veya güvenilir geri bildirim yoksa modelin kendi hatasını düzeltme yeteneği zayıf. Huang ve arkadaşları intrinsic self-correction’ın reasoning görevlerinde sık sık başarısız olduğunu, bazen performansı düşürdüğünü gösterdi. Kamoi ve arkadaşlarının kritik anketi de, prompted LLM geri bildirimiyle saf self-correction için güçlü pozitif kanıt olmadığını; başarıların çoğunun güvenilir dış sinyale dayandığını savundu.

**System 1 / System 2 benzetmesi ne kadar faydalı?** Faydalı, çünkü iyi bir sezgisel çerçeve veriyor: hızlı, sezgisel, tek atış üretim ile yavaş, deliberatif, arama içeren üretimi ayırıyor. ToT ve test-time compute survey’leri de bu analojiyi özellikle bu yüzden kullanıyor. Ama sınırı açık: LLM’de “System 2”, insan zihnindeki ayrı bir bilişsel modül değil; çoğu zaman doğal dilde dışsallaştırılmış scratchpad, örnekleme, search, self-evaluation ve bazen tool use kombinasyonudur. Survey’ler de mevcut reasoning LLM’lerin basit işlerde gereksiz uzun düşünmeye kayabildiğini ve hızlı-yavaş geçişini insan kadar akıcı yapamadığını vurguluyor. Bu analoji, zihinsel mimari açıklaması değil; **compute tahsisi ve kontrol politikası analojisi** olarak yararlı.

**Process supervision ile outcome supervision farkı.** Basit anlatım şudur: outcome supervision sadece “son cevap doğru mu?” der; process supervision ise “ara adımlar mantıklı mı?” diye de bakar. Lightman ve arkadaşları MATH üzerinde process supervision’ın outcome supervision’ı belirgin biçimde geçtiğini ve PRM800K gibi step-level veriyle güçlü sonuçlar verdiğini gösterdi. Buna karşılık Uesato ve arkadaşları GSM8K benzeri doğal dil matematik problemlerinde saf outcome supervision’ın daha az label ile benzer final-answer hata oranına ulaşabildiğini, fakat **doğru reasoning adımları** üretmek için process-based supervision veya onu taklit eden reward modellerine ihtiyaç olduğunu gösterdi. 2025’te Jia ve arkadaşları tartışmayı daha da inceltti: uygun varsayımlar altında outcome supervision’ın istatistiksel olarak process supervision’dan temelde daha zor olmayabileceğini, gözlenen farkın daha çok algoritmik sınırlardan kaynaklanabileceğini savundular. Yani “process supervision her durumda özsel olarak üstündür” demek de, “sadece sonuca bakmak yeterlidir” demek de fazla kaba.

## Güçlü bulgular, kırılgan alanlar ve yanlış anlaşılan noktalar

**Güçlü bulgular.** En sağlam sinyal şu: reasoning modelleri ve test-time scaling özellikle **verifiable** görevlerde parlıyor. Matematik, yarışma tipi kodlama, bazı STEM soru-cevap setleri ve formal olarak denetlenebilen alt görevler bu yüzden öne çıkıyor. DeepSeek-R1, reasoning yeteneklerinin saf RL ile teşvik edilebildiğini ve ortaya çıkan kalıpların self-reflection, verification ve dinamik strateji uyarlamasına benzediğini raporladı. GPQA gibi “Google-proof” bilim soruları ve FrontierMath gibi yeni, yayımlanmamış, otomatik doğrulanabilir problem bankaları da bu sınıf değerlendirmelerin neden önemli olduğunu gösteriyor: kolay benchmarklar doygunlaşırken, zor ve verifiable benchmarklar hâlâ ayırt edici.

Aynı derecede güçlü ikinci bulgu, **search + verification** kombinasyonunun lineer CoT’den daha sistematik olduğu. Self-consistency, aynı soruda çoklu reasoning izleri arasında marjinalleştirme yaparak ciddi kazançlar verdi. ToT, planlama ve search gerektiren görevlerde CoT’yi ezdi. Snell’in çalışması, compute-optimal test-time scaling’in best-of-N’den daha verimli olabildiğini gösterdi. Setlur’un sonucu ise daha sert: verification olmadan yapılan scaling, özellikle budget büyüdükçe, sistematik olarak geride kalıyor.

**Zayıf veya tartışmalı noktalar.** Birincisi, CoT’nin faithfulness’ı sınırlı. Reasoning modelleri, özellikle ipucu kullanımı, post-hoc rationalization ve shortcut alma durumlarında, çoğu zaman gerçekten kullandıkları bilgiyi CoT’de açık etmiyor. Bu yüzden “model dürüstçe düşündüğünü yazıyor” varsayımı zayıf. İkincisi, uzun düşünmenin her zaman faydalı olduğu görüşü zayıf; overthinking literatürü bunu ikna edici biçimde sarstı. Üçüncüsü, reasoning modellerinin tüm “genel zekâ” problemlerinde açık üstünlük sağladığı iddiası da zayıf. PlanBench çalışması, o1 benzeri reasoning modellerinin planlamada güçlü bir sıçrama yaptığını ama hâlâ doygun olmaktan uzak olduğunu gösterdi. Apple çizgisindeki “Illusion of Thinking” çalışması çok yüksek karmaşıklıkta çöküşler raporladı; ancak sonrasındaki itirazlar ve tool-augmentation çalışmaları, bunun en azından bir bölümünün değerlendirme tasarımı ve tool yokluğu ile karıştığını savundu. Burada kesin hüküm yerine dikkatli okuma gerekir.

**Yanlış anlaşılan noktalar.** Bir: *Chain-of-thought = modelin gerçek zihni* değildir. CoT çoğu zaman faydalı bir çalışma alanı ve eğitim sinyalidir; güvenilir içsel açıklama olmak zorunda değildir. İki: *daha uzun cevap = daha iyi akıl yürütme* değildir; bazen sadece daha uzun hata yoludur. Üç: *reasoning modeli her konuda daha iyidir* önermesi yanlıştır; düşük zorluklu görevlerde standart modeller daha verimli veya daha iyi olabilir. Dört: *verification sadece final cevabı kontrol etmektir* yanlıştır; modern literatürde step-level verification, PRM, generative verifier, hatta formal verification önemli yer tutuyor.

**Benchmark kırılganlığı.** Reasoning başarısının benchmark skoru ile eşitlenmesi ciddi hata üretir. GSM-Symbolic, sadece sayıları değiştirmenin bile tüm modellerde düşüş yarattığını; hatta sonuca katkısı olmayan tek bir ek clause’ın performansı sert biçimde düşürebildiğini gösterdi. Bu, bazı benchmark başarılarının gerçek kural çıkarımından çok yüzey kalıbı eşlemesine dayanabileceğini düşündürüyor. FrontierMath’ın yeni ve yayımlanmamış problemlere dayanması tam da bu yüzden önemli: contamination ve benchmark saturation etkisini azaltmak.

## Gelecek yönelimleri ve okuyucu için zihinsel model

**Gelecek yönelimleri.** Literatürde en güçlü aday yönler beş başlıkta toplanıyor. Birincisi, **adaptif compute tahsisi**: her soruya aynı token bütçesini vermek yerine zorluğa göre budget ayarlamak. Overthinking sonuçları bunu güçlü biçimde destekliyor. İkincisi, **daha iyi ve daha ucuz verifiers**: process verifiers, generative verifiers, uncertainty-aware verifiers ve formal verification tabanlı yöntemler burada öne çıkıyor. Üçüncüsü, **erken durdurma ve stop policy**: modelin doğru cevaba ulaştıktan sonra daha fazla reasoning ile kendini bozmaması gerekiyor. Dördüncüsü, **tool-augmented reasoning**: reasoning trace içinde arama, kod çalıştırma, formal kontrol ve dış bellek kullanımı. Beşincisi, **faithfulness ve monitorability**: reasoning izini sadece performans için değil, güvenlik ve denetim için de daha okunabilir ve daha az obfuscatable hale getirmek.

**Okuyucu için zihinsel model.** En kullanışlı çerçeve şudur: reasoning’i tek bir “düşünme” eylemi olarak değil, dört parçalı bir kontrol döngüsü olarak gör.

**Önerme.** Model bir ya da birden fazla ara çözüm izi üretir. CoT, least-to-most ve benzeri teknikler burada çalışır.

**Arama.** Tek bir çizgiye kilitlenmek yerine alternatif patikalar açılır. Self-consistency paralel örnekleme yapar; ToT daha açık search yapar.

**Doğrulama.** Adaylar final cevap veya ara adım düzeyinde puanlanır. Verifier, PRM, ORM, tool check ya da formal proof burada devreye girer.

**Durdurma.** Ne zaman düşünmeyi bırakacağını bilmek, ne zaman düşünmeye başladığı kadar önemlidir. Overthinking literatürü, doğru cevap sonradan bozulabildiği için stop policy’nin ayrı problem olduğunu gösteriyor.

Bu modeli bir cümleye indirgersek: **iyi reasoning, uzun trace üretmek değil; doğru adayları açıp doğru adayları seçip doğru anda durabilmektir.**

## Araştırma sonrası netleşenler ve kaynakça

**Araştırma Sonrası Netleşenler.**

**Bu konuda en yaygın ama yanlış basitleştirme nedir?** “Model ne kadar uzun düşünürse o kadar iyi reason eder.” Literatür bunun hem faithfulness hem de overthinking açısından yanlış olduğunu gösteriyor. Uzun trace bazen gerçek aramayı yansıtır, bazen de post-hoc rationalization veya drift üretir.

**Hangi iddia kaynaklarla güçlü destekleniyor?** En güçlü destek alan iddia şu: **verification, inference-time scaling’in merkezindedir.** Verifier-guided yöntemler, verifier-free trace taklidine göre daha iyi ölçekleniyor; process-level denetim çoğu durumda reasoning kalitesini artırıyor; güvenilir dış geri bildirim yoksa self-correction kırılgan kalıyor.

**Hangi iddia hâlâ spekülatif?** “Uzun doğal dil CoT, modelin genel ve içsel reasoning mekanizmasının sadık penceresidir” iddiası spekülatif. Faithfulness çalışmaları bunun en iyi ihtimalle göreve ve kurguya bağlı, kısmi bir doğru olduğunu gösteriyor. Ayrıca “reasoning modeli = genel amaçlı insan benzeri System 2” anlatısı da hâlâ fazla iddialı.

**Bu konuyu anlamak, önceki AI/LLM belgelerindeki hangi fikri değiştirir?** Parametre sayısı, veri miktarı ve pretraining compute tek başına yeterli açıklama değildir. Artık şu soruyu da sormak gerekiyor: model bu prompt için hangi adayları açıyor, bunları nasıl puanlıyor ve ne zaman duruyor? Yani kapasite sadece “öğrenilmiş ağırlıklar” değil, **inference politikası** ile de belirleniyor.

**Okuyucu bu belgeyi okuduktan sonra hangi soruyu daha iyi sormaya başlamalı?** “Bu modelin cevabı doğru mu?” yerine, **“Bu cevaba giden adaylar nasıl üretildi, hangileri neden elendi, hangi verifier kullanıldı ve model nerede durdu?”** sorusunu sormaya başlamalı. Çünkü son cevap tek başına başarıyı açıklar gibi görünür, ama reasoning sistemlerinin gerçek kalitesi çoğu zaman arama ve doğrulama tasarımında saklıdır.

**Belgenin sonunda istenen net cevap.** “LLM reasoning’i anlamak için neden sadece cevaba değil, arama ve doğrulama sürecine bakmak gerekir?” Çünkü aynı final cevap çok farklı yollarla üretilebilir: kimi zaman doğru reasoning ile, kimi zaman yüzeysel shortcut ile, kimi zaman da yanlış bir reasoning izi sonunda tesadüfen doğru sonuca ulaşarak. Search süreci modelin hangi alternatifleri düşündüğünü, verification süreci ise bu alternatifleri hangi ölçüte göre seçtiğini gösterir. Faithfulness sorunları nedeniyle CoT tek başına yeterli değildir; verifier ve stop policy olmadan uzun düşünme de yeterli değildir. Bu nedenle reasoning’in gerçek nesnesi tek cevap değil, **çözüm uzayında gezinme ve seçme biçimidir.**

**Açık sorular ve sınırlamalar.** Bu alanın önemli kısmı hâlâ arXiv preprint’lerine dayanıyor; dolayısıyla bazı sonuçlar henüz tam yerleşmiş değil. Özellikle faithfulness ölçümü, gerçek-world tool use altında reasoning’in sınırları ve process supervision ile outcome supervision arasındaki pratik farkların tam kaynağı konusunda açık sorular sürüyor. Ayrıca benchmarkların hızla doygunlaşması, bugün güçlü görünen sonucun yarın ayırt edici olmamasına yol açabiliyor.

**Kaynakça.**

- Wei, J. ve ark. *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*. CoT’nin modern başlangıç noktası.
- Kojima, T. ve ark. *Large Language Models are Zero-Shot Reasoners*. Zero-shot CoT’nin temel sonucu.
- Wang, X. ve ark. *Self-Consistency Improves Chain of Thought Reasoning in Language Models*. Çoklu reasoning izi ve tutarlılık seçimi.
- Zhou, D. ve ark. *Least-to-Most Prompting Enables Complex Reasoning in Large Language Models*. Alt problem ayrıştırmasının değeri.
- Yao, S. ve ark. *Tree of Thoughts: Deliberate Problem Solving with Large Language Models*. Arama, lookahead ve backtracking.
- Uesato, J. ve ark. *Solving Math Word Problems with Process- and Outcome-Based Feedback*. Outcome ve process supervision karşılaştırması.
- Lightman, H. ve ark. *Let’s Verify Step by Step*. PRM ve process supervision için ana referans.
- Lanham, T. ve ark. *Measuring Faithfulness in Chain-of-Thought Reasoning*. CoT faithfulness tartışmasının erken ana kaynağı.
- Turpin, M. ve ark. *Language Models Don’t Always Say What They Think*. CoT’nin gerçek nedeni maskeleyebildiğine dair güçlü negatif sonuç.
- Snell, C. ve ark. *Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters*. Test-time scaling’in hesap-optimal çerçevesi.
- Setlur, A. ve ark. *Scaling Test-Time Compute Without Verification or RL is Suboptimal*. Verification’ın merkezî rolüne dair en sert sonuçlardan biri.
- Huang, J. ve ark. *Large Language Models Cannot Self-Correct Reasoning Yet*. Intrinsic self-correction sınırları.
- Kamoi, R. ve ark. *When Can LLMs Actually Correct Their Own Mistakes?* Self-correction için kritik survey.
- DeepSeek-AI. *DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning*. RL ile reasoning kalıplarının teşviki.
- Muennighoff, N. ve ark. *s1: Simple test-time scaling*. Basit budget forcing ve uzun düşünmenin erken iyimser okuması.
- Chen, Y. ve ark. *Reasoning Models Don’t Always Say What They Think*. Reasoning modellerinde CoT monitorability sınırları.
- Arcuschin, I. ve ark. *Chain-of-Thought Reasoning In The Wild Is Not Always Faithful*. Doğal promptlarda da unfaithfulness.
- Mirzadeh, I. ve ark. *GSM-Symbolic*. Matematik benchmark kırılganlığı ve yüzey kalıbı sorunu.
- Valmeekam, K. ve ark. *LLMs Still Can’t Plan; Can LRMs?* Planlama tarafındaki kırılganlık.
- Shojaee, P. ve ark. *The Illusion of Thinking*. Yüksek karmaşıklıkta reasoning çöküşü iddiası.
- Song, Z. ve ark. *Thinking Isn’t an Illusion*. Tool use eklendiğinde karşı argüman.
- Rein, D. ve ark. *GPQA: A Graduate-Level Google-Proof Q&A Benchmark*. Zor bilimsel reasoning değerlendirmesi.
- Glazer, E. ve ark. *FrontierMath*. Yüksek zorluklu, contamination’a dirençli matematik benchmarkı.
- Kaplan, J. ve ark. *Scaling Laws for Neural Language Models*. Train-time scaling arka planı.
- Hoffmann, J. ve ark. *Training Compute-Optimal Large Language Models*. Chinchilla çizgisi ve compute-optimal pretraining.
- Ji, Y. ve ark. *Test-Time Compute: from System-1 Thinking to System-2 Thinking*. TTS taksonomisi.
- Venktesh, V. ve ark. *Trust but Verify! A Survey on Verification Design for Test-time Scaling*. Verifier merkezli TTS taksonomisi.
- Sui, Y. ve ark. *Stop Overthinking*. Efficient reasoning ve overthinking literatürü özeti.
- Zhou, S. ve ark. *When More Thinking Hurts*. Overthinking’in maliyet ve doğruluk cephesi.
- Caldarella, S. ve ark. *Thinking Past the Answer*. “Doğru yerde duramama” problemini görünür kılan çalışma.