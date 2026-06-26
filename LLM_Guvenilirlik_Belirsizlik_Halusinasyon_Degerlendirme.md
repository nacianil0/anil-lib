# LLM Güvenilirlik Bilimi: Belirsizlik, Halüsinasyon ve Değerlendirme Tasarımı

*Teknik-kavramsal derleme · Dil: Türkçe · Tarih bağlamı: 2026 ortası · Kapsam: kalibrasyon, epistemik/aleatorik belirsizlik, halüsinasyon, factuality/faithfulness, benchmark güvenilirliği, LLM-as-judge ve eval tasarımı*

---

## 1. Kısa Tez

Bir dil modelinin (LLM) güvenilirliği, "verdiği cevaplar doğru mu?" sorusuna indirgenemez. Doğruluk (accuracy) bir modelin **ne kadar sık** isabet ettiğini ölçer; güvenilirlik ise modelin **ne zaman bilmediğini, ne zaman tahmin yürüttüğünü, ne kadar emin göründüğünü** ve bu emin görünmenin gerçek isabet oranıyla ne kadar örtüştüğünü ilgilendirir. Bu derlemenin tezi şudur: Modern LLM değerlendirmesinin asıl konusu, bireysel cevapların doğruluğu değil, modelin **belirsizlik davranışı** ile onu ölçen **değerlendirme sisteminin neyi ödüllendirdiği** arasındaki ilişkidir. Halüsinasyon, kalibrasyon ve benchmark tasarımı üç ayrı problem gibi görünür; oysa son yılların en güçlü teorik sonuçları bunların aynı istatistiksel yapının üç yüzü olduğunu göstermektedir (Kalai ve Vempala, 2024; Kalai vd., 2025).

## 2. Konunun Neden Önemli Olduğu

Bir modelin %92 doğruluk skoru, o modeli karar zincirine koyan biri için çok az şey söyler. Kritik olan şudur: Modelin yanıldığı %8'lik dilimde, model **emin mi görünüyordu?** Eğer model yanlış cevapları da doğru cevaplar kadar kendinden emin bir tonla veriyorsa, kullanıcı hangi cevaba güveneceğini ayırt edemez; bu durumda yüksek doğruluk bile pratikte güvenilmez bir sistem üretir. Tersine, daha düşük doğruluğa sahip ama "bunu bilmiyorum" diyebilen, düşük güveni sinyalize eden bir model, uzmana devretme (deferral) imkânı sunduğu için bazı bağlamlarda daha kullanışlıdır (Tian vd., 2023).

Bu ayrımın pratik bedeli ölçülmüştür. Tıp, hukuk ve finans gibi yüksek riskli alanlarda modeller doğru bilgiyi düşük güvenle, yanlış bilgiyi yüksek güvenle üretebilir; bu da insan uzmanı her çıktıyı baştan denetlemeye zorlar ve otomasyonun değerini ortadan kaldırır (Geng vd., 2023). Aynı şekilde, halüsinasyonun mahkeme kararlarında olmayan emsaller üretmesi ya da tıbbi bağlamda yanlış bilgi vermesi, modelin "ortalama doğruluğu"yla değil, "emin olduğu anlardaki hata davranışı"yla ilgilidir (Farquhar vd., 2024). Dolayısıyla güvenilirliği anlamak, doğruluk sayısının arkasındaki belirsizlik yapısını ve onu ölçen aracın körlüklerini anlamaktır.

## 3. Temel Kavramlar

**Belirsizlik (uncertainty).** Bir modelin bir çıktıya dair ne ölçüde "kararsız" olduğudur. Önemli olan, belirsizliğin tek bir şey olmamasıdır; kaynağına göre niteliksel olarak farklı türleri vardır.

**Epistemik belirsizlik (epistemic uncertainty).** Modelin **bilgi eksikliğinden** doğan, ilke olarak daha fazla veri veya daha iyi bir modelle azaltılabilen belirsizliktir. "Bu soruyu çözmek için yeterince şey görmedim" durumudur (Hüllermeier ve Waegeman, 2021).

**Aleatorik belirsizlik (aleatoric uncertainty).** Verinin veya görevin **doğasında olan**, ne kadar veri eklerseniz ekleyin yok olmayan belirsizliktir. Sorunun kendisi muğlaksa (örneğin eksik tanımlanmış bir istem) ya da birden çok geçerli cevap varsa, bu belirsizlik içkindir (Hüllermeier ve Waegeman, 2021). Bu ayrım klasik makine öğrenmesinden ödünç alınmıştır; ileride göreceğimiz gibi LLM'lere taşınması tartışmalıdır (Kirchhof vd., 2025).

**Kalibrasyon (calibration).** Modelin ifade ettiği güvenin (confidence) gerçek isabet oranıyla örtüşmesidir. Sezgisel tanım: Modelin "%70 eminim" dediği tüm durumları topladığınızda, bunların yaklaşık %70'i gerçekten doğru çıkıyorsa model kalibredir. Bu kavram havadan tahmin yapan bir meteoroloğa benzetilir: "%30 yağmur" dediği günlerin yaklaşık %30'unda yağmur yağıyorsa tahminci kalibredir (Kalai ve Vempala, 2024).

**Güven ile doğruluk (confidence vs. correctness).** Güven, modelin **kendi cevabına biçtiği** olasılıktır; doğruluk, cevabın **gerçekte** doğru olup olmamasıdır. Kalibrasyon tam olarak bu ikisi arasındaki hizalanmayı ölçer.

**Halüsinasyon (hallucination).** Modelin akıcı, makul görünen ama yanlış veya dayanaksız içerik üretmesidir. Tek bir olgu değil, bir hata ailesidir.

**Factuality (olgusal doğruluk), faithfulness (bağlılık), groundedness (dayanaklılık) ve completeness (eksiksizlik).** Bunlar sık sık karıştırılan, ama ayrı değerlendirme eksenleridir. *Factuality*, çıktının **dış dünya gerçekliğiyle** uyumudur. *Faithfulness*, çıktının kendisine **verilen bağlama/kaynağa** sadakatidir. *Groundedness*, her olgusal iddianın bir kaynak materyale dayanıp dayanmadığıdır. *Completeness*, cevabın soruyu **eksiksiz** kapsayıp kapsamadığıdır. Kritik nokta: Bir cevap, dünyaya göre olgusal olarak doğru olup yine de verilen bağlama sadakatsiz (unfaithful) olabilir; ya da bağlama tam sadık olup, bağlam yanlışsa olgusal olarak hatalı olabilir (Huang vd., 2024; bkz. Bölüm 5.4).

**Benchmark (ölçüt kümesi).** Modelleri standart, karşılaştırılabilir bir görev kümesi üzerinde sınayan değerlendirme veri setidir.

**LLM-as-judge (hakem olarak LLM).** Bir modelin çıktılarını **başka bir LLM'in** puanladığı veya karşılaştırdığı değerlendirme yaklaşımıdır; insan değerlendirmesinin ölçeklenebilir ama önyargılı bir vekili olarak kullanılır (Zheng vd., 2023).

## 4. Teknik Arka Plan

LLM, özünde olasılıksal bir dizi modelidir: Bir bağlam verildiğinde, bir sonraki kelime-parçası (token) için bir olasılık dağılımı üretir ve tüm dizinin olasılığı, koşullu token olasılıklarının çarpımı (log uzayında toplamı) olarak yazılabilir. Bu, "model bir cevaba ne kadar olasılık biçti?" sorusunu en azından prensipte ölçülebilir kılar (Kalai ve Vempala, 2024).

Kalibrasyonun biçimsel (formal) tanımı sade ve aydınlatıcıdır. Bir model her tahmine bir güven skoru *s* atasın; mükemmel kalibrasyon, "güven skoru *p* olan tüm tahminler arasında doğru olma olasılığının tam *p* olması" demektir; yani *P*(doğru | güven = *p*) = *p* (Guo vd., 2017). Bu hiçbir zaman tam tutmaz; ne kadar saptığını ölçmek için iki yaygın metrik kullanılır. **Expected Calibration Error (ECE)** güven skorlarını kovalara (bin) ayırır, her kovada ortalama güven ile gerçek isabet oranı arasındaki farkı alır ve bunları ağırlıklı ortalar; sıfıra ne kadar yakınsa model o kadar kalibredir (Naeini vd., 2015). **Brier skoru**, tahmin edilen olasılık ile gerçekleşen sonuç arasındaki karesel farkı ölçen, daha eski ve bütünleşik bir ölçüttür (Brier, 1950). Her ikisi de "model emin görünüyor mu?"yu değil, "emin görünmesi gerçeği yansıtıyor mu?"yu ölçer.

Burada modern LLM'lere özgü, kritik ve sık atlanan bir bulgu vardır. Denetimsiz ön-eğitim (unsupervised pretraining), token olasılıkları **şaşırtıcı derecede iyi kalibre** dil modelleri üretir; modelin koşullu olasılıkları, gerçek doğruluk oranlarıyla nispeten uyumludur (Tian vd., 2023). Ancak çoğu kullanışlı modelin geçtiği sonraki aşama olan **insan geri bildirimiyle pekiştirmeli öğrenme (RLHF)**, bu kalibrasyonu bozma eğilimindedir: RLHF sonrası modeller, ham token olasılıkları düzeyinde aşırı-özgüvenli (overconfident) hâle gelir (Tian vd., 2023). İlginç olansa, aynı çalışmanın gösterdiği gibi, bu modellere açıkça "ne kadar eminsin?" diye sorulduğunda, çıktı olarak ürettikleri **sözel güven (verbalized confidence)**, ham olasılıklarından daha iyi kalibre olabilmektedir. Bu, "token olasılığı = güvenilir sinyal" varsayımının neden tehlikeli olduğunu daha en baştan ortaya koyar.

## 5. Ana Mekanizma

### 5.1 Belirsizliğin anatomisi ve LLM'de ayrımın güçlüğü

Klasik resimde belirsizliği epistemik (azaltılabilir, bilgi eksikliği) ve aleatorik (içkin, görevin doğası) olarak ikiye ayırmak doğal görünür (Kendall ve Gal, 2017; Hüllermeier ve Waegeman, 2021). LLM'lerde bu ikiyi ayırmaya dönük somut yöntemler önerilmiştir; örneğin **girdi-açıklaştırma topluluğu (input clarification ensembling)**, muğlak bir istemin birden çok netleştirilmiş versiyonunu üretip çıktıları toplulaştırarak, belirsizliğin ne kadarının istemdeki muğlaklıktan (aleatorik) geldiğini ayırmaya çalışır (Hou vd., 2024). Daha yeni çalışmalar ise belirsizliği anlam uzayında ayrıştırmak için kuantum bilgi kuramından (von Neumann entropisi) yararlanır (Walha vd., 2026).

Ne var ki bu ayrımın LLM'lere taşınması ciddi biçimde tartışmalıdır. Bir konum yazısı (position paper), açık uçlu ve etkileşimli dil görevlerinde aleatorik/epistemik ayrımının klasik tanımlarının "birbiriyle çeliştiğini ve anlamını yitirdiğini" savunur; çünkü çok-turlu, eksik tanımlanmış istemlerle dolu gerçek kullanımda her çıktıya sabit bir aleatorik/epistemik skor atamak, belirsizliğin asıl kaynağını yakalayamaz (Kirchhof vd., 2025). Bu, "belirsizlik" başlığının altının bile henüz tam oturmadığı bir alan olduğunun göstergesidir.

### 5.2 Kalibrasyon eğrileri ve sezgisi

Kalibrasyonu görmenin en doğal yolu **güvenilirlik diyagramı (reliability diagram / calibration curve)** denen grafiktir. Yatay eksende modelin ifade ettiği güven, dikey eksende o güven düzeyindeki gerçek isabet oranı yer alır. Mükemmel kalibre bir model 45 derecelik köşegen üzerine düşer: "%80 eminim" dediği yerde gerçekten %80 isabet eder. Eğri köşegenin **altında** kalıyorsa model aşırı-özgüvenlidir (söylediği kadar haklı değildir); **üstünde** kalıyorsa fazla temkinlidir (aslında söylediğinden daha sık haklıdır). Buradaki sezgisel ders şudur: Bir modelin tek tek cevaplarına bakarak kalibre olup olmadığını anlayamazsınız; kalibrasyon, **çok sayıda tahmin üzerinde toplu bir istatistiktir**. Bu yüzden "model çok kendinden emin konuşuyor" gözlemi ile "model kalibre" yargısı taban tabana farklı şeylerdir — emin görünmek bir üslup, kalibrasyon ise ölçülen bir özelliktir.

### 5.3 Token olasılığı bir güven sinyali olarak ne kadar işe yarar?

İlk bakışta modelin bir cevaba biçtiği olasılık, doğal bir güven ölçüsü gibi durur. Sorun, serbest-metin üretiminde token olasılıklarının iki farklı belirsizliği birbirine **karıştırmasıdır**: anlamsal belirsizlik (cevabın *anlamına* dair belirsizlik) ile sözdizimsel/sözcüksel belirsizlik (aynı anlamı *nasıl ifade edeceğine* dair belirsizlik). Model "Paris" demekte kararlı ama bunu "Paris", "Fransa'nın başkenti Paris" ya da "başkent Paris'tir" diye söyleme arasında kararsızsa, token olasılıkları yüksek belirsizlik gösterir; oysa anlamca model gayet emindir (Kuhn, Gal ve Farquhar, 2023).

Bu içgörü, **anlamsal entropi (semantic entropy)** yöntemini doğurmuştur: Aynı soruya birden çok cevap örneklenir, anlamca eşdeğer olanlar kümelenir ve entropi token dizileri üzerinde değil **anlam kümeleri** üzerinde hesaplanır. Bu yaklaşım, halüsinasyonun bir alt türü olan **konfabülasyonları (confabulations)** — keyfî ve yanlış üretimleri — yer doğruluğu (ground truth) etiketi gerektirmeden saptayabilmiştir (Farquhar vd., 2024, *Nature*). Sonraki çalışmalar bu sinyali modelin iç temsillerinden (hidden states) ucuzca okumaya çalışmıştır (Kossen vd., 2024). Çıkarılacak ders: Ham token olasılığı tamamen değersiz değildir, ama tek başına ve naif biçimde kullanıldığında güvenilirlik sinyali olarak yanıltıcıdır; anlamlı hâle gelmesi için anlam düzeyinde toplulaştırma gerekir.

### 5.4 Halüsinasyon: tanımı, türleri ve kaynakları

Halüsinasyon tek bir olgu değil, en az iki bağımsız eksende sınıflanan bir hata ailesidir.

**İçsel (intrinsic) ve dışsal (extrinsic) ayrımı.** İçsel halüsinasyon, çıktının verilen kaynak/bağlamla **doğrudan çeliştiği** durumdur (kaynak "gelir 10 milyon" derken modelin "15 milyon" demesi). Dışsal halüsinasyon, çıktının kaynaktan **doğrulanamayan**, ne desteklenen ne de çelişen, "havadan" eklenmiş bilgi içermesidir (Ji vd., 2023).

**Factuality ve faithfulness ayrımı.** Daha yeni ve LLM'lere uygun taksonomi, halüsinasyonu **olgusal (factuality) halüsinasyon** — çıktının dünya gerçekliğinden sapması — ve **bağlılık (faithfulness) halüsinasyonu** — çıktının kullanıcının talimatına veya verilen bağlama sadakatsizliği — diye ikiye ayırır (Huang vd., 2024). Bu iki ekseni bir düzlem gibi düşünmek aydınlatıcıdır: Yatay eksen dünyaya uygunluk (factuality), dikey eksen bağlama uygunluk (faithfulness). En iyi cevaplar sağ-üst köşededir; ama "bağlama sadık ama olgusal olarak yanlış" ve "olgusal olarak doğru ama bağlama sadakatsiz" gibi iki ayrı patolojik köşe vardır. Bu yüzden factuality ile faithfulness'ı tek bir "doğruluk" altında toplamak temel bir hatadır (Huang vd., 2024).

**Kaynakları: training, retrieval ve decoding.** Halüsinasyon yalnızca "bilgi eksikliği" değildir; üç aşamayla ilişkilidir. *Eğitim (training)* aşamasında, modelin gördüğü verideki seyreklik, çelişki veya yanlışlık olgusal halüsinasyonu besler; ayrıca eğitim verisinde nadir geçen olgular sistematik bir zayıflık noktasıdır (aşağıda 5.5). *Geri-getirme (retrieval)* aşamasında, modele dış belge sağlansa bile, getirilen belge alakasız, eksik veya çelişkili olabilir; ya da model doğru belgeyi göz ardı edip parametrik (içsel) bilgisine sapabilir (bkz. 5.7 ve Bölüm 9). *Çözümleme (decoding)* aşamasında, örnekleme stratejisi ve sıcaklık (temperature) gibi parametreler üretimin çeşitliliğini ve dolayısıyla dayanaksız üretim riskini etkiler; yüksek sıcaklık sözcüksel çeşitliliği artırırken bazı durumlarda ungrounded üretimi de artırabilir (Huang vd., 2024). Üç aşama da katkı yapar; bu yüzden halüsinasyonu tek bir nedene bağlamak yanlıştır.

### 5.5 Kalibrasyon ile halüsinasyon arasındaki şaşırtıcı bağ

Alanın en karşı-sezgisel teorik sonuçlarından biri şudur: **Kalibre bir dil modeli halüsinasyon yapmak zorundadır.** Kalai ve Vempala (2024), ideal koşullarda — hatasız eğitim verisi varsayımıyla bile — kalibrasyon koşulunu sağlayan üretici bir dil modelinin belirli olgu türlerinde halüsinasyon oranının bir **istatistiksel alt sınırı** olduğunu kanıtlar. Daha çarpıcısı: Bu alt sınır, eğitim verisinde **tam bir kez geçen** olguların oranıyla (literatürdeki adıyla "monofact" oranı, klasik Good-Turing kayıp-kütle tahmininin akrabası) yakından ilişkilidir ve **transformer mimarisiyle ya da veri kalitesiyle hiçbir ilgisi yoktur** (Kalai ve Vempala, 2024). Sezgisi şudur: Veride yalnızca bir kez görülen olgularla, modelin asla görmediği ama "olur" diye üreteceği yanlış olguları istatistiksel olarak ayırt etmenin bir yolu yoktur; kalibre kalmak isteyen model, doğru nadir olgulara olasılık ayırdığı oranda, yanlış ama makul olgulara da olasılık ayırmak zorundadır. Bu, halüsinasyonun bir "mühendislik kusuru" değil, üretici-ve-kalibre olmanın istatistiksel bir maliyeti olduğunu söyler. (Yazarların kendi uyarısı önemlidir: Bu, halüsinasyonun **kaçınılmaz** olduğu anlamına gelmez; soruyu yanıtlamayı reddetme ya da dış kaynak kullanma gibi müdahaleler bu çerçevenin dışındadır.)

### 5.6 Değerlendirme neyi ödüllendiriyor? Halüsinasyonun "sınav" kökeni

Yukarıdaki teorinin pratik uzantısı, 2025'in en çok tartışılan eval makalesidir. Kalai, Nachum, Vempala ve Zhang (2025), halüsinasyonun ön-eğitimde **ikili sınıflandırma hatası** olarak doğduğunu (geçerli ile geçersiz çıktı ayırt edilemiyorsa, üretici hatalar istatistiksel olarak kaçınılmazdır), ama eğitim sonrası **kalıcılığının** çoğunlukla **değerlendirmelerin nasıl puanlandığıyla** ilgili olduğunu savunur. Argüman sade: Çoğu benchmark yalnızca doğruluğu ölçer; "bilmiyorum" cevabı yanlış cevapla aynı (sıfır) puanı alır. Bu durumda, tıpkı zor bir sınavda boş bırakmak yerine tahmin yürüten bir öğrenci gibi, model için de **emin olmadığında tahmin yürütmek** beklenen puanı yükseltir. Yani model, sürekli "sınav modunda" çalışmaya ve emin olmadığında susmak yerine kendinden emin yanlışlar üretmeye **teşvik edilir** (Kalai vd., 2025).

Yazarların önerdiği çözüm "sosyo-teknik"tir: Halüsinasyona dair yeni testler eklemek yerine, lider tablolara hükmeden mevcut benchmarkların **puanlamasını** değiştirmek. Örnek bir puanlama şeması: Doğru cevap +1, "bilmiyorum" 0, yanlış cevap ise −*t*/(1−*t*) (burada *t* hedeflenen güven eşiğidir) puan alır; bu sayede model ancak en az *t* kadar eminse cevap vermeli, değilse susmalıdır — yazarların "davranışsal kalibrasyon (behavioral calibration)" dediği davranış (Vempala, 2025 söyleşisi). Bu çerçeve, doğruluk ölçümü ile güvenilirlik ölçümü arasındaki farkı en keskin biçimde gösterir: Doğruluğu kovalayan bir lider tablo, modelleri **daha az güvenilir** olmaya itebilir.

### 5.7 Değerlendirmenin mekaniği: kontaminasyon, doygunluk, oyunlaştırma

Bir benchmark skorunun güvenilirliği üç ayrı tehditle aşınır.

**Benchmark kontaminasyonu (benchmark data contamination, BDC).** Test verisinin, modelin eğitim verisine sızmasıdır; bu durumda model "akıl yürütmez, hatırlar" ve skor, yeteneği değil ezberi ölçer (Xu vd., 2024). Kontaminasyon doğrudan (sorunun aynısı eğitimde), dolaylı (başka sözcüklerle ifade edilmiş hâli) veya gizli (modelin benchmark skoruna göre seçilmesi) olabilir. Saptama yöntemleri arasında n-gram örtüşmesi (GPT-3'te 13-gram, GPT-4'te 40-gram), çıktı dağılımının "sivriliğine" bakan yaklaşımlar ve Min-K% Prob gibi olasılık temelli testler vardır (Shi vd., 2024; Dong vd., 2024). Karşı önlemler iki başlıkta toplanır: **veri perdeleme/güncelleme (data curation)** — eğitimde bulunmayan özel veya eğitim-kesiminden sonra yayımlanmış veri kullanmak (LiveCodeBench, SWE-bench gibi "canlı" benchmarklar) — ve **veri yeniden yapılandırma (data refactoring)** — mevcut soruları yeniden ifade etmek. Ne var ki modern modeller, perdelenmiş formatların kendisi de internete sızdığı için bu dönüşümleri çoğunlukla aşar (Samuel vd., 2025).

**Benchmark doygunluğu (saturation).** Modeller bir benchmarkı tavanladığında, üstteki skor farkları istatistiksel olarak anlamsızlaşır ve benchmark ayırt edici gücünü yitirir. 2026 itibarıyla MMLU, HumanEval, MBPP, GSM8K ve HellaSwag büyük ölçüde doygundur; sınır modeller bunlarda dar bir bantta, ~%90'ların üzerinde kümelenmektedir. Buna yanıt olarak ardışık biçimde daha zor benchmarklar üretilmiştir: MMLU-Pro (on seçenekli, zorunlu akıl yürütmeli), GPQA Diamond (doktora düzeyi, "Google'lanamaz" fen soruları; Rein vd., 2024), ARC-AGI-2 ve "Humanity's Last Exam" (uzmanlarca yazılmış, sınır modellerin uzun süre düşük skor aldığı bir tavan testi; Phan vd., 2025). Bu, bir "Kızıl Kraliçe" koşusudur: Benchmark doyunca yenisi yapılır, o da kısa sürede doyar.

**Benchmark oyunlaştırma (gaming).** Skoru yeteneği artırmadan yükseltmektir. Topluluk-oylu lider tablolar üzerine yapılan kapsamlı bir incelemede, sağlayıcıların çok sayıda özel model varyantını (bir örnekte tek ayda 27 varyant) gizlice sınayıp yalnızca en iyisini yayımlamasının ("N denemeden en iyisini seç") puanları sistematik biçimde şişirebildiği gösterilmiştir; ayrıca veri erişiminin eşitsiz olduğu ve açık modellerin daha sık "sessizce" kaldırıldığı saptanmıştır (Singh vd., 2025). Platformun işletmecileri bu bulguların bazı rakamlarına itiraz etmiş, açık modellerin payının iddia edilenden yüksek olduğunu ve güven aralıklarının çoğu sıralama farkını anlamsız kıldığını belirtmiştir (LMArena, 2025); dolayısıyla bu, kapanmamış, canlı bir tartışmadır.

### 5.8 LLM-as-judge: mekanizma, insan değerlendirmesinden farkı ve önyargılar

İnsan değerlendirmesi güvenilirliğin altın standardına en yakın olandır, ama pahalı, yavaş ve ölçeklenmesi güçtür; üstelik insan değerlendiriciler de tutarsızlık, yorgunluk ve önyargı taşır. Bu boşluğu doldurmak için **LLM-as-judge** yaygınlaştı: Güçlü bir model, başka modellerin çıktılarını puanlar ya da ikili karşılaştırır (Zheng vd., 2023). Bu yaklaşımın insan uzmanlarıyla yüksek uyum gösterebildiği rapor edilmiştir; ama "objektif hakem" sanılması ciddi bir yanılgıdır, çünkü sistematik önyargılar taşır:

- **Konum önyargısı (position bias):** Karşılaştırmada belirli bir konumdaki (örneğin ilk) cevabı, içerikten bağımsız olarak yeğleme. Ölçülen etki kazanma oranında onlarca puanlık sapmaya ulaşabilir; istemdeki sırayı rastgeleleştirerek kısmen düzeltilebilir (Zheng vd., 2023; Shi vd., 2024).
- **Ayrıntı/uzunluk önyargısı (verbosity/length bias):** Ek bilgi sağlamasa bile daha uzun cevaplara daha yüksek puan verme. Bu etki insan değerlendiricilerde de vardır, ama LLM hakemlerde sistematik olarak daha büyüktür; "uzunluk-kontrollü kazanma oranı" gibi sonradan düzeltmeler önerilmiştir (Dubois vd., 2024).
- **Kendini yeğleme önyargısı (self-preference / self-enhancement bias):** Modelin kendi ürettiği (veya kendi stiline benzeyen) çıktıları kayırması. Bu eğilimin, modelin kendi üretimini "tanıma" yeteneğiyle ilişkili olduğu gösterilmiştir; daha büyük modellerde daha güçlü olma eğilimindedir (Panickssery vd., 2024).
- Bunlara ek olarak, gerçek model adları gösterildiğinde kayırmanın değişmesi, çoğunluk görüşüne uyma (bandwagon), dikkat dağıtıcılara duyarlılık gibi düzinelerce bilişsel önyargı kataloglanmıştır (Koo vd., 2024; "Justice or Prejudice?", 2024).

Pratik bir tuzak da **hakem kayması (judge drift)**: Hakem model bir sürüm yükseltmesi aldığında, rubrik (puanlama ölçütü) değişmese bile ortalama skorlar ve dağılım kayar; böylece "0.91 yardımcılık skoru" bir gece içinde anlamını değiştirebilir, ama eval kapısı bunu fark etmez (sektör analizleri, 2026). Buradaki temel ders: İnsan hakem ile LLM hakem aynı şeyi ölçmez; LLM hakem ucuz ve ölçeklenebilir bir **vekildir**, ve vekilin önyargıları sonuçları sistematik biçimde çarpıtabilir.

### 5.9 Agent ve reasoning sistemlerinde eval neden daha zor?

Tek-turlu bir cevabı puanlamak görece kolaydır; çok adımlı bir **ajan (agent)** ya da uzun akıl yürüten bir **reasoning** sistemini değerlendirmek niteliksel olarak daha zordur. Birkaç nedenle:

Birincisi, değerlendirmenin nesnesi yalnızca nihai cevap değil, **adımlardan oluşan bir yörüngedir (trajectory)**: araç çağrıları, ara durumlar, bellek okuma/yazma. Yüzey örtüşmesine bakan klasik metrikler (ROUGE, BERTScore) hedefe yönelik akıl yürütmeye kördür; LLM-as-judge ise göreve bakmaksızın sabit boyutlarla (yardımcılık, akıcılık) puanlar (AdaRubric, 2026). İkincisi, hatalar **birikir ve yayılır**: bir planlama adımındaki halüsinasyon, sonraki araç parametrelerine sızıp nihai cevabı bozar; sınır modeller bile çok-adımlı yörüngelerde hatanın hangi adımdan kaynaklandığını saptamada düşük başarı gösterir ve bu başarı adım sayısı arttıkça düşer (AgentHallu, 2026). Üçüncüsü, nihai cevabın doğru çıkması, sürecin **sağlam** olduğu anlamına gelmez — model şanstan, ezberden veya yanlış gerekçeyle doğru sonuca varmış olabilir; bu yüzden tek seferlik başarı (pass@1) uzun-ufuklu görevlerde güvenilmez bir ölçüttür ve bir "güvenilirlik bilimi" önerilmektedir (METR, 2025; çeşitli, 2026).

Dördüncü ve en sinsi neden: **Akıl yürütme izi (chain-of-thought, CoT) modelin gerçek hesabını yansıtmayabilir.** Modeller, cevabı aslında istemdeki yüzeysel bir ipucundan türetmişken, makul görünen ama bu ipucunu hiç anmayan bir gerekçe üretebilir (Turpin vd., 2023). Anthropic'in çalışması, Claude 3.7 Sonnet gibi reasoning modellerinin, cevaplarını gerçekten etkileyen ipuçlarını CoT'da yalnızca ~%25 oranında andığını; sonuç-temelli RL'in bu sadakati ~%28'in ötesine taşıyamadığını; ve sadakatin zorlaşan görevlerde (GPQA) belirgin biçimde düştüğünü göstermiştir (Chen vd., 2025). Çarpıcı bir ayrıntı: Sadakatsiz CoT'lar genelde daha kısa değil, **daha uzundur** — yani uzun açıklama, şeffaflık demek değildir. Üstüne, müdahaleci deneyler, CoT metni bozulsa bile modelin sıklıkla aynı sonuca vardığını göstermiştir; bu da nihai cevabın üretilen gerekçeyle her zaman hizalı olmadığını söyler (Lanham vd., 2023). Sonuç: Süreç-temelli değerlendirme (modelin "düşündüğünü söylediği" şeyi puanlama) cazip ama kırılgandır, çünkü ölçtüğümüz iz, gerçek nedensel süreçle aynı olmayabilir.

## 6. Akademik Tartışmalar

Alanın canlı, kapanmamış tartışmaları, "neyin nasıl ölçüleceği" sorusunun çevresinde döner:

- **Belirsizlik ayrımının geçerliliği.** Aleatorik/epistemik ayrımı LLM'ler için anlamlı mı, yoksa açık uçlu görevlerde mi çöküyor? Klasik çerçeveyi savunanlar (Hou vd., 2024) ile bunun LLM ajanlarında anlamını yitirdiğini söyleyenler (Kirchhof vd., 2025) karşı karşıyadır.
- **Halüsinasyonun kaçınılmazlığı.** Kalai ve Vempala (2024) kalibre modeller için bir alt sınır kanıtlar; Xu vd. (2024) hesaplanabilirlik çerçevesinde bir kaçınılmazlık iddiası kurar. Ancak yazarların kendisi bile bunun "halüsinasyon yenilemez" demek olmadığını vurgular — reddetme ve dış kaynak bu çerçevenin dışındadır. Bir başka çalışma çizgisi, halüsinasyon ile **mod çöküşü (mode collapse)** arasında bir değiş tokuş olduğunu gösterir (Kalavasis vd.): aşırı temkinli bir model çeşitliliğini yitirir.
- **Kontaminasyonun gerçek etkisi.** 2024–2025 boyunca çelişkili bulgular vardı: Bazı saptama çalışmaları net kontaminasyon sinyali bulurken, kontrollü çalışmalar (Bordt vd., 2025) test-seti dahil edilmesinin benchmark doğruluğuna ölçülebilir bir etkisinin az olabileceğini gösterdi. 2026'da yapılan replika-sayısını taramalı bir çalışma, etkinin replika sayısına ve göreve bağlı olduğunu ortaya koyarak bu gerilimi kısmen çözmüştür. Yani "kontaminasyon her zaman skoru şişirir" basit kuralı tartışmalıdır.
- **Lider tabloların meşruiyeti.** "The Leaderboard Illusion" (Singh vd., 2025) topluluk-oylu arenalarda yapısal çarpıklıklar olduğunu savunur; platform işletmecileri kimi rakamlara itiraz eder (LMArena, 2025). Bu, "tek bir lider tablo yeterli midir?" sorusunun hâlâ açık olduğunu gösterir.
- **CoT'nin yorumlanabilirlik değeri.** "CoT akıl yürütmenin penceresidir" görüşü ile "CoT açıklanabilirlik değildir" görüşü (Barez vd., 2025; Chen vd., 2025) çatışır; bu, özellikle güvenlik denetimi için izlere ne kadar güvenilebileceği açısından kritiktir.

## 7. Güçlü Bulgular (sağlam kaynaklarla desteklenenler)

- **Ön-eğitim iyi kalibre eder, RLHF bozar.** Denetimsiz ön-eğitimin token olasılıklarını iyi kalibre ürettiği, RLHF'in ham olasılık kalibrasyonunu bozma eğiliminde olduğu ve sözel güvenin RLHF modellerinde sıklıkla daha iyi kalibre olduğu, somut benchmarklar üzerinde gösterilmiştir (Tian vd., 2023; ECE'de göreli ~%50 iyileşme).
- **Token olasılığı anlamsal ve sözcüksel belirsizliği karıştırır.** Bu karışıklık ve anlam-düzeyinde toplulaştırmanın halüsinasyon saptamada işe yaradığı, hakemli bir *Nature* çalışmasıyla desteklenmiştir (Farquhar vd., 2024; Kuhn vd., 2023).
- **Kalibrasyon ile halüsinasyon arasında istatistiksel bir bağ vardır.** Kalibre üretici modellerin belirli olgu türlerinde halüsinasyon oranının alt sınırı bulunduğu, STOC'ta yayımlanan bir teoremle kanıtlanmıştır (Kalai ve Vempala, 2024).
- **Değerlendirme puanlaması tahmin yürütmeyi ödüllendirir.** Doğruluk-odaklı benchmarkların modelleri "bilmiyorum" yerine tahmine ittiği argümanı, geniş yankı bulan bir çalışmada ortaya konmuştur (Kalai vd., 2025).
- **LLM hakemler sistematik önyargı taşır.** Konum, uzunluk ve kendini yeğleme önyargıları çoklu model aileleri ve veri setlerinde tekrar tekrar ölçülmüştür (Zheng vd., 2023; Panickssery vd., 2024; Koo vd., 2024).
- **RAG halüsinasyonu azaltır ama yok etmez.** Geri-getirme bağlamlı üretimin halüsinasyonu düşürdüğü ama ortadan kaldırmadığı, hukuk gibi alanlarda yüksek oranlarda halüsinasyon ölçüldüğü gösterilmiştir (Magesh vd., 2024; Lewis vd., 2020).

## 8. Zayıf / Tartışmalı Noktalar

- **Belirsizlik türlerinin operasyonel ölçümü** hâlâ olgunlaşmamıştır; aleatorik/epistemik ayrımının LLM'lerde anlamı tartışmalıdır (Kirchhof vd., 2025).
- **Halüsinasyonun "tek tanımı" yoktur**; içsel/dışsal ve olgusal/bağlılık eksenleri farklı şeyleri ölçer ve literatürde terimler her zaman tutarlı kullanılmaz (Huang vd., 2024).
- **Kontaminasyonun skora etkisi koşullara bağlıdır**; "her zaman şişirir" veya "hiç etkilemez" uçlarının ikisi de yanlıştır (Bordt vd., 2025; 2026 replika çalışması).
- **LLM-as-judge'ın insan yargısıyla uyumu görev ve rubriğe bağlıdır**; bazı görevlerde yüksek uyum, bazılarında sistematik sapma görülür (Zheng vd., 2023).
- **CoT sadakatini ölçmek bile dolaylıdır**; mevcut sadakat testleri çoğunlukla iç işleyişten ziyade "çıktı tutarlılığını" ölçer (Lanham vd., 2023; Chen vd., 2025).
- **Lider tablo bulgularının büyüklüğü** ihtilaflıdır; eleştiri ve yanıt arasındaki sayısal anlaşmazlık çözülmemiştir (Singh vd., 2025; LMArena, 2025).

## 9. Yanlış Anlaşılan Noktalar

- **"Benchmark skoru = güvenilirlik."** Yanlış. Skor doğruluğu ölçer; güvenilirlik belirsizlik davranışını, kalibrasyonu ve hata anlarındaki özgüveni de içerir. Üstelik skor kontaminasyon, doygunluk veya oyunlaştırmayla aşınmış olabilir (Xu vd., 2024; Singh vd., 2025; Kalai vd., 2025).
- **"Model emin konuşuyorsa doğrudur."** Yanlış. Emin görünmek bir üsluptur; kalibrasyon ölçülen bir özelliktir. RLHF sonrası modeller sistematik biçimde aşırı-özgüvenli olabilir (Tian vd., 2023).
- **"Halüsinasyon yalnızca RAG ile çözülür."** Yanlış. RAG halüsinasyonu azaltır ama yok etmez: getirilen belge alakasız/eksik/çelişkili olabilir; model doğru belgeyi göz ardı edip parametrik bilgisine sapabilir ("bağlam-sadakati halüsinasyonu"); ve teorik alt sınır veri kalitesinden bağımsızdır (Magesh vd., 2024; Huang vd., 2024; Kalai ve Vempala, 2024). Kritik bir kavramsal nokta: **Olgusal doğruluk, bağlılığı garanti etmez** — cevap dünyaya göre doğru olup verilen bağlama sadakatsiz olabilir.
- **"LLM-as-judge objektif hakemdir."** Yanlış. Konum, uzunluk ve kendini yeğleme önyargıları taşır ve hakem sürümü değiştikçe skorlar kayar (Zheng vd., 2023; Panickssery vd., 2024).
- **"Daha çok kaynak göstermek otomatik olarak daha doğru cevap demektir."** Yanlış. Kaynak göstermek dayanaklılık (groundedness) algısını artırır, ama getirilen kaynaklar yanlış, alakasız veya çelişkili olabilir; model gösterdiği kaynağı sadakatsiz biçimde özetleyebilir. Atıf sayısı, atfın doğruluğunun garantisi değildir (Magesh vd., 2024).
- **(Ek) "CoT'yi okumak modelin gerçek düşüncesini okumaktır."** Yanlış. Üretilen gerekçe, gerçek nedensel süreçle sistematik biçimde uyuşmayabilir; üstelik daha uzun gerekçe daha şeffaf demek değildir (Turpin vd., 2023; Chen vd., 2025).

## 10. Kavramsal Harita

Kavramları birbirine bağlayan zihinsel iskelet şöyle kurulabilir:

**Güvenilirlik** üç sütun üzerinde durur: (a) **doğruluk** — ne kadar sık isabet, (b) **belirsizlik/kalibrasyon** — emin görünmenin gerçekle hizası, (c) **değerlendirme tasarımı** — bunları ölçen aracın neyi ödüllendirdiği.

(a) altında: doğruluk yalnızca bir sayıdır ve tek başına yanıltıcıdır.

(b) altında: **belirsizlik** ikiye ayrılır (epistemik = azaltılabilir bilgi eksikliği; aleatorik = içkin) ama bu ayrım LLM'lerde tartışmalıdır. Belirsizliği ölçmenin bir yolu token olasılıklarıdır; fakat bunlar **anlamsal** ve **sözcüksel** belirsizliği karıştırır, bu yüzden **anlamsal entropi** gibi anlam-düzeyi yöntemler gerekir. **Kalibrasyon** bu belirsizliğin gerçekle hizasıdır; ECE/Brier ile ölçülür, güvenilirlik diyagramıyla görselleşir. Önemli köprü: **Kalibre olmak, halüsinasyonu istatistiksel olarak gerektirebilir** (monofact alt sınırı).

(c) altında: **benchmark** bir vekildir; üç tehditle aşınır — kontaminasyon (ezber), doygunluk (ayırt edememe), oyunlaştırma (yeteneksiz skor artışı). **İnsan değerlendirmesi** altın standarda yakın ama pahalıdır; **LLM-as-judge** ucuz vekildir ama önyargılıdır. Değerlendirmenin **puanlama kuralı**, modelin halüsinasyon davranışını doğrudan şekillendirir: doğruluğu ödüllendirip belirsizliği cezalandıran kural, modeli tahmine iter.

**Halüsinasyon** bu haritada üç eksene değer: türü (içsel/dışsal, olgusal/bağlılık), kaynağı (training/retrieval/decoding) ve değerlendirmeyle ilişkisi (puanlama onu besler). **Reddetme (refusal) / belirsizlik ifadesi / halüsinasyon** üçlüsü bir değiş tokuştur: reddetmeyi azaltırsanız halüsinasyon artar; halüsinasyonu reddetmeyle bastırırsanız aşırı-temkin ve fayda kaybı riski doğar. **Ajan/reasoning** sistemlerinde tüm bu zorluklar katlanır, çünkü süreç çok adımlıdır, hatalar yayılır ve akıl yürütme izi gerçek süreci yansıtmayabilir.

## 11. 2026 İtibarıyla Durum

2026 ortasında alanın fotoğrafı şöyledir. Klasik bilgi/akıl-yürütme benchmarkları (MMLU ve türevleri, HumanEval, GSM8K) büyük ölçüde **doygundur**; sınır modeller bunlarda birbirinden ayırt edilemez. Değerlendirmenin ağırlığı, doygunluğa direnmek için tasarlanmış daha zor testlere (MMLU-Pro, GPQA Diamond, ARC-AGI-2, Humanity's Last Exam) ve **ajan/araç-kullanımı** benchmarklarına (SWE-bench türevleri, yörünge-farkında testler) kaymıştır. Sektörel analizler, laboratuvar skorlarıyla gerçek dağıtım performansı arasında kayda değer bir uçurum (kimi raporlarda ~%37) bildirir; bu, "offline benchmark ile gerçek kullanım aynı şey değildir" tezini güçlendirir.

Halüsinasyon cephesinde, eval-teşvik bağlantısı (Kalai vd., 2025) alanın gündemine "puanlamayı düzeltme" çağrısını sokmuştur; bazı model sağlayıcıları belirsizliği ifade etmeye ve gerektiğinde reddetmeye daha açık modeller geliştirme yönünde hareket etmiştir. Burada açık bir gerilim vardır: Belirsizliğini daha çok ifade eden, daha sık reddeden bir model daha az yanlış üretebilir ama daha düşük "fayda" algısı yaratabilir — yani refusal/halüsinasyon değiş tokuşu hâlâ çözülmemiş bir tasarım sorusudur. LLM-as-judge yaygınlaşmaya devam etmekte, ama önyargı azaltma (debiasing), hakem-kayması izleme ve insan-hakem ile kalibrasyon aktif araştırma alanlarıdır. Belirsizlik nicelemesi, özellikle ajanlar için, yeni bir alt-alan olarak şekillenmektedir (Kirchhof vd., 2025 ve sonrası).

**Açık problemler:** (1) Açık uçlu ve ajansal görevler için anlamlı, ölçeklenebilir belirsizlik ölçütleri; (2) kontaminasyona dirençli, doygunluğa karşı kendini yenileyen "canlı" değerlendirme protokolleri; (3) insan yargısıyla kalibre, önyargısı denetlenmiş otomatik hakemler; (4) süreç-temelli (yörünge/CoT) değerlendirmenin, izlerin sadakatsizliği göz önünde tutularak güvenilir kılınması; (5) doğruluk, kalibrasyon ve uygun reddetmeyi tek bir çerçevede birleştiren puanlama standartları.

## 12. Okuyucu İçin Zihinsel Model

Bir LLM'i "her soruya cevap veren bilgi kutusu" değil, **istatistiksel bir sınav adayı** gibi düşünün. Bu aday üç ayrı açıdan değerlendirilebilir: *Ne kadar sık doğru cevaplıyor?* (doğruluk), *Emin olduğunu söylediğinde gerçekten haklı mı, boş bıraktığında gerçekten bilmiyor mu?* (kalibrasyon), ve *Bu adayı sınayan sınav, doğru şeyi mi ödüllendiriyor?* (eval tasarımı). Sınav yalnızca doğru cevabı puanlayıp boş bırakmayı yanlışla eşitlerse, akıllı aday emin olmasa bile tahmin yürütmeyi öğrenir — kendinden emin yanlışlar, yani halüsinasyonlar, böyle doğar.

İki kalıcı sezgi: Birincisi, **"emin görünmek" ile "kalibre olmak" farklı şeylerdir** — birincisi üslup, ikincisi çok sayıda tahmin üzerinde ölçülen bir istatistik. İkincisi, **bir benchmark skoru bir vekildir, gerçeğin kendisi değil** — ezberle, doygunlukla veya oyunlaştırmayla bozulmuş olabilir ve gerçek kullanımdan sapabilir. Bu yüzden bir LLM sistemini değerlendirirken doğru cevap saymak başlangıçtır, bitiş değil; asıl iş, modelin ne zaman bilmediğini gösterip göstermediğini, emin olduğunda haklı olup olmadığını ve onu ölçen aracın hangi davranışı ödüllendirdiğini anlamaktır.

---

## Grill-Me Kalite Kapısı

**Bu konudaki en yaygın yanlış basitleştirme nedir?**
"Güvenilirlik = doğruluk" denklemi. Bu, güvenilirliği bir sayıya indirger ve modelin emin olmadığında ne yaptığını, emin olduğunda haklı olup olmadığını (kalibrasyon) ve skoru üreten aracın körlüklerini (kontaminasyon, doygunluk, oyunlaştırma, hakem önyargısı) tamamen görmezden gelir.

**Bu konuyu anlamak önceki AI/LLM anlayışında neyi değiştirir?**
Halüsinasyonu "ara sıra olan rastgele bir hata" olmaktan çıkarıp, üretici-ve-kalibre olmanın istatistiksel bir maliyeti (Kalai ve Vempala, 2024) ve değerlendirme teşviklerinin öngörülebilir bir yan ürünü (Kalai vd., 2025) olarak yeniden çerçeveler. Bu, "daha büyük model = daha güvenilir" beklentisini de zayıflatır: Mesele yalnızca yetenek değil, kalibrasyon, reddetme davranışı ve ölçme tasarımıdır.

**Hangi iddia güçlü kaynaklarla destekleniyor?**
Ön-eğitimin iyi kalibre ettiği/RLHF'in bozduğu (Tian vd., 2023), token olasılığının anlamsal ve sözcüksel belirsizliği karıştırdığı (Farquhar vd., 2024), kalibre modeller için bir halüsinasyon alt sınırı bulunduğu (STOC 2024), LLM hakemlerin sistematik önyargı taşıdığı (Zheng vd., 2023; Panickssery vd., 2024) ve RAG'in halüsinasyonu azaltıp yok etmediği (Magesh vd., 2024) — bunların hepsi hakemli/yüksek-etkili kaynaklarla desteklenir.

**Hangi iddia hâlâ tartışmalı?**
Aleatorik/epistemik ayrımının LLM'lerde anlamlı olup olmadığı (Kirchhof vd., 2025), kontaminasyonun benchmark skoruna gerçek etkisinin büyüklüğü (Bordt vd., 2025'e karşı saptama çalışmaları), lider tablo çarpıklıklarının ölçeği (Singh vd., 2025'e karşı LMArena, 2025) ve CoT izlerine güvenlik denetimi için ne kadar güvenilebileceği.

**Okuyucu bu belgeyi okuduktan sonra hangi kavramı daha ciddiye almalı?**
**Kalibrasyonu.** "Model doğru mu?" sorusundan "Model haklı olduğunu söylediğinde gerçekten haklı mı, ve onu ölçen sistem bu davranışı ödüllendiriyor mu?" sorusuna geçiş, LLM güvenilirliğini anlamanın anahtarıdır.

---

## Kapanış Sorusuna Net Cevap

**"Bir LLM sisteminin güvenilirliğini anlamak için neden doğru cevap saymak yetmez; belirsizlik, kalibrasyon ve eval tasarımını da anlamak gerekir?"**

Çünkü doğru cevap saymak yalnızca *ortalama isabeti* ölçer; oysa bir sistemin pratikteki güvenilirliği, *hata anlarındaki davranışına* ve *ölçme aracının geçerliliğine* bağlıdır. Üç bağımsız boşluk, doğruluk sayısının gizlediği şeylerdir. Birincisi **belirsizlik/kalibrasyon boşluğu**: Yüksek doğruluklu bir model bile yanlışlarını yüksek güvenle veriyorsa, kullanıcı hangi cevaba güveneceğini ayırt edemez; kalibrasyon tam da bunu ölçer ve doğruluktan bağımsızdır. İkincisi **değerlendirme-teşvik boşluğu**: Yalnızca doğruluğu ödüllendiren bir eval, modeli emin olmadığında susmak yerine tahmin yürütmeye iter, yani daha yüksek doğruluk uğruna daha çok halüsinasyon üretir (Kalai vd., 2025). Üçüncüsü **ölçüm-geçerliliği boşluğu**: Skorun kendisi kontaminasyon (ezber), doygunluk (ayırt edememe), oyunlaştırma (yeteneksiz artış) veya hakem önyargısıyla bozulmuş ve gerçek kullanımdan sapmış olabilir. Bu yüzden güvenilirlik, "kaç soruyu doğru bildi?" değil; "ne zaman bilmediğini gösterdi mi, emin olduğunda haklı mıydı, ve onu ölçen araç neyi ödüllendiriyordu?" sorularının bütünüdür.

---

## 13. Kaynakça

*(Yöntem notu: Kaynaklar, hangi iddiayı desteklediklerine göre metin içinde anılmıştır. Aşağıdaki liste yazar–yıl ve mümkün olduğunda erişim bağlantısı içerir. Survey ve hakemli kaynaklar önceliklendirilmiştir.)*

**Belirsizlik ve kalibrasyon (temel ve LLM)**

1. Hüllermeier, E. ve Waegeman, W. (2021). *Aleatoric and Epistemic Uncertainty in Machine Learning: An Introduction to Concepts and Methods.* Machine Learning, 110:457–506. — Epistemik/aleatorik ayrımının kanonik referansı.
2. Guo, C., Pleiss, G., Sun, Y. ve Weinberger, K. (2017). *On Calibration of Modern Neural Networks.* ICML. — Kalibrasyonun biçimsel tanımı, ECE, temperature scaling.
3. Gal, Y. ve Ghahramani, Z. (2016). *Dropout as a Bayesian Approximation.* ICML. — Belirsizlik tahmininin Bayesçi temeli.
4. Kendall, A. ve Gal, Y. (2017). *What Uncertainties Do We Need in Bayesian Deep Learning for Computer Vision?* NeurIPS. — Epistemik/aleatorik ayrımının derin öğrenmeye taşınması.
5. Naeini, M. P., Cooper, G. ve Hauskrecht, M. (2015). *Obtaining Well Calibrated Probabilities Using Bayesian Binning.* AAAI. — ECE'nin kaynağı. / Brier, G. W. (1950). *Verification of Forecasts Expressed in Terms of Probability.* Monthly Weather Review. — Brier skoru.
6. Kadavath, S. vd. (2022). *Language Models (Mostly) Know What They Know.* arXiv:2207.05221. — Modellerin kendi doğruluklarını öz-değerlendirebildiği bulgusu.
7. Tian, K. vd. (2023). *Just Ask for Calibration.* EMNLP. arXiv:2305.14975. — Ön-eğitim iyi kalibre eder/RLHF bozar; sözel güven daha iyi kalibre olabilir.
8. Geng, J. vd. (2023). *A Survey of Confidence Estimation and Calibration in Large Language Models.* NAACL 2024. arXiv:2311.08298. — Kalibrasyon survey'i.
9. Hou, B. vd. (2024). *Decomposing Uncertainty for LLMs through Input Clarification Ensembling.* ICML. arXiv:2311.08718. — Belirsizlik ayrıştırma yöntemi.
10. Kirchhof, J. vd. (2025). *Position: Uncertainty Quantification Needs Reassessment for Large-Language-Model Agents.* arXiv:2505.22655. — Aleatorik/epistemik ayrımının LLM'lerde sorunlu olduğu eleştirisi.
11. Kuhn, L., Gal, Y. ve Farquhar, S. (2023). *Semantic Uncertainty.* ICLR. — Anlamsal vs sözcüksel belirsizlik.
12. Farquhar, S., Kossen, J., Kuhn, L. ve Gal, Y. (2024). *Detecting Hallucinations in Large Language Models Using Semantic Entropy.* Nature, 630:625–630. DOI:10.1038/s41586-024-07421-0. — Anlamsal entropiyle konfabülasyon saptama.
13. Kossen, J. vd. (2024). *Semantic Entropy Probes.* arXiv:2406.15927. — Anlamsal entropiyi iç temsillerden okuma.

**Halüsinasyon: teori ve taksonomi**

14. Kalai, A. T. ve Vempala, S. S. (2024). *Calibrated Language Models Must Hallucinate.* STOC 2024, s. 160–171. DOI:10.1145/3618260.3649777 / arXiv:2311.14648. — Kalibre modeller için halüsinasyon alt sınırı; monofact bağı.
15. Kalai, A. T., Nachum, O., Vempala, S. S. ve Zhang, E. (2025). *Why Language Models Hallucinate.* arXiv:2509.04664. — Değerlendirmenin tahmini ödüllendirmesi; davranışsal kalibrasyon.
16. Ji, Z. vd. (2023). *Survey of Hallucination in Natural Language Generation.* ACM Computing Surveys. — İçsel/dışsal ayrımı.
17. Huang, L. vd. (2024). *A Survey on Hallucination in Large Language Models: Principles, Taxonomy, Challenges, and Open Questions.* ACM TOIS. DOI:10.1145/3703155 / arXiv:2311.05232. — Olgusal/bağlılık taksonomisi; data/training/inference kaynakları.

**LLM-as-judge**

18. Zheng, L. vd. (2023). *Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena.* NeurIPS 2023. — Konum, uzunluk, kendini-yeğleme önyargılarının ilk sistematik kataloğu.
19. Panickssery, A., Bowman, S. ve Feng, S. (2024). *LLM Evaluators Recognize and Favor Their Own Generations.* arXiv:2404.13076. — Kendini-yeğleme önyargısının öz-tanımayla ilişkisi.
20. Koo, R. vd. (2024). *Benchmarking Cognitive Biases in LLMs as Evaluators.* — Çoklu bilişsel önyargı kataloğu (bandwagon, dikkat dağıtma vb.). / "Justice or Prejudice? Quantifying Biases in LLM-as-a-Judge" (2024), arXiv:2410.02736.
21. Dubois, Y. vd. (2024). *Length-Controlled AlpacaEval.* arXiv:2404.04475. — Uzunluk önyargısına karşı sonradan düzeltme.

**Benchmark: kontaminasyon, doygunluk, oyunlaştırma**

22. Xu, R. vd. (2024). *Benchmark Data Contamination of Large Language Models: A Survey.* — BDC kavramı ve saptama/önleme taksonomisi.
23. Shi, W. vd. (2024). *Detecting Pretraining Data from Large Language Models (Min-K% Prob).* ICLR. — Olasılık temelli kontaminasyon saptama.
24. Carlini, N. vd. (2023). *Quantifying Memorization Across Neural Language Models.* ICLR. — Ezberin model boyutu/sıklık/bağlamla artışı.
25. Singh, S. vd. (2025). *The Leaderboard Illusion.* NeurIPS 2025 D&B. arXiv:2504.20879. — Topluluk-oylu arenalarda yapısal çarpıklıklar. / LMArena (2025), *Response to "The Leaderboard Illusion."* — İşletmecinin yanıtı (sayısal itirazlar).
26. Rein, D. vd. (2024). *GPQA: A Graduate-Level Google-Proof Q&A Benchmark.* — Doygunluğa dirençli zor benchmark.
27. Phan, L. vd. (2025). *Humanity's Last Exam.* (Center for AI Safety & Scale AI). — Uzman-yazımı tavan testi.
28. Bordt, S. vd. (2025) ve ilgili 2026 çalışmaları. *Test-set kontaminasyonunun üretici değerlendirmeye etkisi.* — Kontaminasyon etkisinin koşula bağlılığı.

**Akıl yürütme/CoT sadakati ve ajan değerlendirmesi**

29. Turpin, M., Michael, J., Perez, E. ve Bowman, S. (2023). *Language Models Don't Always Say What They Think.* NeurIPS 2023. arXiv:2305.04388. — CoT'nin gerçek nedeni gizleyebilmesi.
30. Chen, Y. vd. (2025, Anthropic). *Reasoning Models Don't Always Say What They Think.* arXiv:2505.05410. — Reasoning modellerinde ~%25 sadakat; zor görevlerde düşüş; sadakatsiz CoT'ların daha uzun olması.
31. Lanham, T. vd. (2023). *Measuring Faithfulness in Chain-of-Thought Reasoning.* arXiv:2307.13702. — Müdahaleci deneyler; nihai cevabın izden bağımsızlaşabilmesi.
32. Jimenez, C. vd. (2024). *SWE-bench: Can Language Models Resolve Real-World GitHub Issues?* ICLR. — Ajansal, kontaminasyona dirençli görev.
33. Liu, N. F. vd. (2024). *Lost in the Middle: How Language Models Use Long Contexts.* TACL. — Uzun bağlamda dikkat zaafı (RAG'i de etkiler).

**RAG ve dayanaklılık**

34. Lewis, P. vd. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.* NeurIPS. arXiv:2005.11401. — RAG'in tanımı.
35. Magesh, V., Surani, F., Dahl, M., Suzgun, M., Manning, C. ve Ho, D. (2024). *Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools.* (Stanford). — RAG tabanlı hukuk araçlarında yüksek halüsinasyon oranları.

*Not: 2026 ortası itibarıyla aktif tartışma içeren konularda (belirsizlik ayrımı, kontaminasyon etkisi, lider tablo çarpıklıkları, CoT izlerinin güvenilirliği) tek bir görüş kesinleşmemiştir; yukarıdaki kaynaklar karşıt konumları birlikte temsil edecek şekilde seçilmiştir.*
