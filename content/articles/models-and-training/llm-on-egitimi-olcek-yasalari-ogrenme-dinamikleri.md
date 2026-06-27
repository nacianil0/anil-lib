---
article_id: article_fdbb2b23-0c87-4162-ba32-91dc1d276c95
title: "LLM Ön Eğitimi, Ölçek Yasaları ve Öğrenme Dinamikleri: Teknik Bir İnceleme"
slug: llm-on-egitimi-olcek-yasalari-ogrenme-dinamikleri
category: models-and-training
level: advanced
reading_order: 7
summary: "Ön eğitim hedefi, optimizasyon dinamikleri, ölçek yasaları ve test-zamanı hesaplama kaymasını teknik düzeyde inceleyen kapsamlı bir derleme."
tags:
  - on-egitim
  - olcek-yasalari
  - optimizasyon
  - ogrenme-dinamikleri
  - test-zamani
content_hash: sha256:7b32ed2c3d5115cb1c960810460c06b872350077666a812ed6aa10c5e7693bdb
classification_version: 1
classification_batch: 0
---
# LLM Ön Eğitimi, Ölçek Yasaları ve Öğrenme Dinamikleri: Teknik Bir İnceleme (2026)

## 1. Kısa Tez

Bir büyük dil modelinin (LLM — Large Language Model) yeteneği, "çok büyük bir model çok fazla veriyle eğitildi" cümlesiyle açıklanamaz. Yetenek; **eğitim hedefinin** (sonraki-token tahmini), **veri dağılımının ve kalitesinin**, **optimizasyonun** (gradyan inişi), **ölçeğin** (parametre, veri, hesaplama) ve **ölçümün** (hangi metrikle baktığımız) birleşik etkisinden doğar. Ölçek yasaları bu birleşik sürecin yalnızca bir boyutunu — kaybın hesaplama ile öngörülebilir ilişkisini — açıklar; gerçek bir kanun değil, dar bir rejimde geçerli ampirik bir düzenliliktir. 2026 itibarıyla alan, "saf ön-eğitim ölçeklemesinin" getirilerinin yavaşladığı ve hesaplamanın bir kısmının **test-zamanı (çıkarım) hesaplamasına** kaydığı bir geçiş dönemindedir; ancak ne "ölçek her şeyi çözer" ne de "ölçek bitti" tezi kesin olarak doğrulanmış değildir.

## 2. Konunun Neden Önemli Olduğu

LLM'lerin nasıl yetenek kazandığı, hem teknik hem de kavramsal olarak yanlış anlaşılan bir konudur. Popüler anlatı, kapasiteyi tek bir değişkene (boyut) indirger. Oysa aynı hesaplama bütçesiyle eğitilen iki model, veri karışımı, tekilleştirme (deduplication), öğrenme oranı çizelgesi ve değerlendirme metriği farklı olduğu için çok farklı davranabilir. Bu inceleme, okuyucunun şu soruları daha iyi sorabilmesini amaçlar: Bir kayıp (loss) düşüşü hangi yeteneğe karşılık gelir? Bir "beliren yetenek" (emergent ability) gerçek bir faz geçişi mi yoksa ölçüm yan etkisi mi? Ön eğitimden gelen ham kapasite ile son-eğitimden (post-training) gelen davranış nasıl ayrışır? Bu ayrımları yapabilmek, kaynakları eleştirel okumak ve abartılı iddiaları ayıklamak için gereklidir.

## 3. Temel Kavramlar

**Ön eğitim (pretraining):** Modelin, büyük ölçekli ve büyük oranda etiketsiz metin üzerinde, tek bir öz-denetimli (self-supervised) hedefle — tipik olarak sonraki token'ı tahmin etmekle — temel bilgi ve temsilleri öğrendiği aşamadır. Stanford CS224n ders notlarının ifadesiyle, ön eğitim "NLP uygulamalarını parametre başlangıç değeri (initialization) sağlayarak iyileştirebilir": çok metinden genel şeyler öğrenilir, sonra az etiketli veriyle göreve uyarlanır.

**Token:** Metnin model tarafından işlenen en küçük birimi; bir kelime, kelime parçası veya karakter olabilir.

**Sonraki-token tahmini (next-token prediction) / otoregresif dil modelleme:** Model, verili bir önceki bağlama (önek) bakarak sözlükteki (vocabulary) her olası sonraki token için bir olasılık dağılımı üretir.

**Kayıp fonksiyonu (loss function):** Modelin tahmininin gerçeğe ne kadar uzak olduğunu ölçen tek sayı. LLM'lerde standart kayıp **çapraz entropi (cross-entropy)** kaybıdır.

**Gradyan inişi (gradient descent):** Kaybı azaltacak yönde model ağırlıklarını küçük adımlarla güncelleyen optimizasyon yöntemi.

**Parametre / ağırlık (weight):** Modelin öğrenilen sayısal katsayıları. "Boyut" (N) genellikle parametre sayısını ifade eder.

**Hesaplama (compute, C):** Eğitim için harcanan toplam işlem miktarı; genellikle FLOP (floating-point operations) cinsinden ve yaklaşık olarak C ≈ 6ND (N parametre, D token sayısı) ile ifade edilir.

**Ölçek yasası (scaling law):** Kayıp ile ölçek değişkenleri (N, D, C) arasındaki ampirik güç yasası (power-law) ilişkisi.

**Beliren yetenek (emergent ability):** Wei ve arkadaşlarının (2022) tanımıyla, "küçük modellerde bulunmayan ama büyük modellerde bulunan" yetenek.

**Son-eğitim (post-training):** Ön eğitimden sonra modelin davranışını insan amacıyla hizalamak için uygulanan aşamalar; talimat ayarlama (instruction tuning) ve insan geri bildiriminden pekiştirmeli öğrenme (RLHF — Reinforcement Learning from Human Feedback) gibi.

**Test-zamanı hesaplaması (test-time / inference-time compute):** Modelin bir soruyu yanıtlarken çıkarım sırasında harcadığı hesaplama; uzun "düşünme zinciri" (chain-of-thought) üretmek gibi.

## 4. Teknik Arka Plan

### 4.1 Çapraz entropi kaybının sezgisi

Sonraki-token tahmininde model, her adımda sözlük üzerinde bir olasılık dağılımı üretir. Çapraz entropi kaybı, gerçekte gelen token'a modelin atadığı olasılığın negatif logaritmasıdır; tüm token'lar üzerinde ortalaması alınır. Sezgisel olarak: model gerçek token'a yüksek olasılık verdiyse kayıp küçük, düşük olasılık verdiyse kayıp büyüktür. Matematiksel olarak bu, **negatif log-olabilirlik (negative log-likelihood, NLL)** ile aynıdır.

Bu kaybın iki güçlü yorumu vardır. Birincisi **bilgi-kuramsal sıkıştırma**: NLL'yi en aza indirmek, token'ları kodlamak için gereken ortalama bit sayısını en aza indirmekle analitik olarak eşdeğerdir (Bridging Information-Theoretic and Geometric Compression, arXiv 2310.13620). Yani iyi bir dil modeli, aynı zamanda metnin iyi bir sıkıştırıcısıdır. İkincisi **şaşkınlık (perplexity)**: kaybın üssel halidir (PP = e^L), ve sezgisel olarak "modelin her adımda kaç eşit-olasılıklı seçenek arasında kaldığı" (etkili dallanma çarpanı) olarak okunur. Bir model perplexity'si 10 ise, ortalama olarak her token için 10 eşit olasılıklı seçenek arasından seçim yapıyormuş gibi şaşkındır.

Kritik nokta: kayıp **dağılım düzeyinde** bir ortalamadır. Düşmesi, modelin "ortalama olarak" daha iyi tahmin yaptığını gösterir; her konuda eşit ölçüde güvenilir olduğunu **göstermez**.

### 4.2 Sonraki-token tahmini neden bu kadar güçlü bir sinyal?

"Sonraki kelimeyi tahmin et" yüzeysel bir görev gibi görünür. Ancak metni iyi tahmin edebilmek için modelin, metnin ardındaki yapıyı içselleştirmesi gerekir. Bilgi-kuramsal bakış açısıyla: milyarlarca belge üzerinde sonraki token'ı doğru tahmin etmek için model, dilin yapısını sıkıştıran içsel bir temsil inşa etmek zorundadır. "Bir tren saatte 60 km hızla 2 saat giderse toplam mesafe..." öneki için "120" token'ını üretmek, modelin örtük biçimde aritmetik bir ilişkiyi temsil etmesini gerektirir.

Bu, **temsil öğrenme (representation learning)** ile token tahmini arasındaki bağdır: eğitim sinyali yalnızca bir kelime tahmini olsa da, o tahmini yapmak için gereken bilgi, dünya hakkında yapılandırılmış örüntüleri içerir. Teorik çalışmalar bu sezgiyi resmileştirmeye çalışır; örneğin Markov Kategorileri çerçevesi (arXiv 2507.19247), "görünüşte basit olan sonraki-token tahmini hedefinin... temsilleri nasıl yonttuğunu" sıkıştırma ve verinin koşullu belirsizliğiyle eşleşme üzerinden inceler. Ancak bu, hâlâ aktif bir teorik araştırma alanıdır ve "token tahmini = anlama" denklemi kanıtlanmış değildir.

### 4.3 Gradyan inişi sezgisi

Eğitim, kaybı azaltacak ağırlıkları bulma sürecidir. Kaybı, ağırlıkların oluşturduğu çok boyutlu bir "manzara" (loss landscape) üzerinde bir yükseklik haritası gibi düşünün. Gradyan, bu manzarada en dik yokuş-yukarı yönü gösterir; gradyan inişi ise her adımda gradyanın **tersi** yönde küçük bir adım atarak vadiye doğru iner. "Küçük adım"ın boyutu **öğrenme oranı (learning rate)** ile kontrol edilir. Pratikte ham gradyan inişi yerine Adam gibi uyarlamalı optimize ediciler ve dikkatle ayarlanmış öğrenme oranı çizelgeleri (warmup + decay) kullanılır. Bu ayrıntıların önemi sadece teknik değildir: aşağıda göreceğimiz gibi, öğrenme oranı çizelgesindeki bir farklılık, ölçek yasası katsayılarının yanlış kestirilmesine bile yol açabilmiştir.

### 4.4 Ağırlıklar neyi saklar, neyi saklamaz?

Ağırlıklar, eğitim verisindeki istatistiksel örüntüleri sıkıştırılmış biçimde saklar: dilbilgisel yapılar, olgusal ilişkiler, üslup kalıpları, akıl yürütme şablonları. **Saklamadıkları** ise eşit derecede önemlidir: ağırlıklar verinin birebir bir kopyası değildir (gerçi tekilleştirilmemiş veride ezberleme olabilir — bkz. 5.1), eğitim kesim tarihinden sonraki olayları içermez, ve bir "doğruluk veritabanı" değildir. Bir olgu eğitim dağılımında nadir veya çelişkili temsil edildiyse, model onu güvenilmez biçimde "hatırlar". Bu yüzden düşük kayıp, her olgunun doğru saklandığı anlamına gelmez.

## 5. Ana Mekanizma

### 5.1 Veri kalitesi, karışım ve tekilleştirme

**Tekilleştirme (deduplication):** Lee ve arkadaşları (ACL 2022, "Deduplicating Training Data Makes Language Models Better"), mevcut dil modelleme veri kümelerinin çok sayıda yinelenen örnek içerdiğini gösterdi; örneğin C4 veri kümesinden 60.000 kereden fazla tekrarlanan tek bir 61-kelimelik İngilizce cümle çıkardılar. Bulguları nettir: tekilleştirme, modellerin ezberlenmiş metni on kat daha az üretmesini sağlar ve aynı veya daha iyi doğruluğa daha az eğitim adımıyla ulaşılmasını mümkün kılar. Ayrıca eğitim-test örtüşmesini (doğrulama kümesinin %4'ünden fazlasını etkiliyordu) azaltır — bu, kontaminasyon nedeniyle abartılı değerlendirme sonuçlarını önler.

**Veri kalitesi:** Gunasekar ve arkadaşları (Microsoft Research, 2023, "Textbooks Are All You Need"), yalnızca 1,3 milyar parametreli phi-1 modelini, "ders kitabı kalitesinde" seçilmiş 6 milyar token web verisi ve GPT-3.5 ile üretilmiş 1 milyar token sentetik ders kitabı/alıştırma ile (8 A100 üzerinde 4 günde) eğiterek HumanEval'da %50,6 pass@1 doğruluk elde etti — kendisinden çok daha büyük modelleri geçerek. Bu, "veri kalitesi ölçeklemenin sınırını kaydırır" tezinin güçlü bir kanıtıdır. Ancak phi serisi bir uyarı da taşır: sentetik veriyle eğitilen modeller, dağıtım dışı sağlamlık (robustness) ve değerlendirme kontaminasyonu açısından eleştirilmiştir; "ders kitabı kalitesi"nin ne kadarının gerçek genelleme, ne kadarının kıyaslamaya (benchmark) uyum olduğu tartışmalıdır.

**Veri karışımı (data mixture):** FineWeb (Penedo ve ark., NeurIPS 2024) 96 Common Crawl anlık görüntüsünden türetilmiş 15 trilyon token'lık bir veri kümesidir ve diğer açık ön-eğitim veri kümelerinden daha iyi performans gösteren modeller ürettiğini, çıkarım filtrelemesi ve tekilleştirme stratejilerini ayrıntılı ablasyon deneyleriyle göstermiştir. FineWeb-Edu (1,3 trilyon token), Llama-3-70B-Instruct ile sayfaların eğitsel değerine 0-5 arası puan verilerek filtrelendi. Bu çalışmalar, hangi filtrenin hangi kazanımı sağladığını şeffaf biçimde belgelemesiyle önemlidir.

### 5.2 Ölçek yasaları ve hesaplama-optimal eğitim

**Kaplan ve ark. (2020, "Scaling Laws for Neural Language Models"):** OpenAI ekibi, yedi büyüklük mertebesini kapsayan 200'den fazla model eğiterek, çapraz entropi test kaybının model boyutu (N), veri kümesi boyutu (D) ve hesaplama (C) ile güç yasası ilişkisi içinde ölçeklendiğini gösterdi: L ∝ N^−α, L ∝ D^−β, L ∝ C^−γ. Mimari ayrıntıların (genişlik, derinlik) geniş bir aralıkta minimal etkisi olduğunu buldular. Önemli sonuçları: "büyük modeller belirgin biçimde daha örnek-verimlidir (sample-efficient)", dolayısıyla hesaplama-verimli eğitim "çok büyük modelleri görece az veriyle eğitmeyi ve yakınsamadan çok önce durmayı" gerektirir. Bütçe dağılımı: N ∝ C^0.73, D ∝ C^0.27. Yani aslan payı model boyutuna giderdi. Bu, GPT-3'e (2020) kadar OpenAI'nin işletim kılavuzuydu.

**Hoffmann ve ark. (2022, "Training Compute-Optimal Large Language Models" — Chinchilla):** DeepMind ekibi, 70M–16B arası 400'den fazla modeli daha dikkatli bir taramayla eğiterek farklı bir sonuca vardı: hesaplama-optimal eğitim için model boyutu ve eğitim token sayısı **eşit oranda** ölçeklenmelidir. Yani model boyutu iki katına çıkınca, eğitim token sayısı da iki katına çıkmalıdır. Bunu doğrulamak için 70B parametreli Chinchilla'yı 1,4 trilyon token üzerinde, daha büyük Gopher (280B, ~300B token) ile **aynı hesaplama bütçesiyle** eğittiler; Chinchilla Gopher'ı geçti (ortalama doğrulukta %7'den fazla iyileşme). Bundan "yaklaşık 20 token/parametre" şeklindeki etkili sezgisel kural (heuristic) doğdu. Chinchilla'nın parametrik kayıp yüzeyi: L(N,D) = E + A/N^α + B/D^β.

**Chinchilla ne değiştirdi?** Kaplan'ın "büyük model > büyük veri" reçetesinin tersine, birçok mevcut modelin (GPT-3 dâhil) **ciddi biçimde yetersiz eğitildiğini** (undertrained) ortaya koydu. Bu, daha küçük ama daha çok veriyle eğitilmiş modellere yöneliş yarattı (örn. LLaMA serisi); küçük model aynı zamanda çıkarım maliyetini düşürdüğü için pratik bir avantaj sağladı.

**Kaplan–Chinchilla çelişkisinin çözümü (2024):** İki katsayı kümesi neden farklıydı? Pearce ve Song (2024, "Reconciling Kaplan and Chinchilla Scaling Laws", arXiv 2406.12907, TMLR'de yayımlandı), çelişkinin büyük kısmının Kaplan'ın **gömme (embedding) parametrelerini saymayıp yalnızca gömme-dışı parametreleri saymasından** ve analizini küçük ölçekte yapmasından kaynaklandığını buldu. Makalenin ifadesiyle: "much of this discrepancy can be attributed to Kaplan counting non-embedding rather than total parameters, combined with their analysis being performed at small scale." Chinchilla çalışmasını bu koşullar altında simüle ettiklerinde Kaplan'a yakın (N\E ∝ C^0.74) eğimli katsayılar elde ettiler; toplam parametre kullanıldığında ise N_T ∝ C_T^0.49 (Chinchilla'ya yakın) çıktı. Sonuç: "gelecekteki ölçek çalışmaları toplam parametre ve toplam hesaplamayı kullanmalıdır." Tamamlayıcı bir çalışma olan Porian ve ark. (2024, arXiv 2406.19146) ise farkı üç nedene bağladı: son katman hesaplama maliyeti, **warmup (ısınma) süresi** ve ölçek-bağımlı optimize edici (öğrenme oranı) ayarı. Bu, 4.3'te değindiğimiz noktayı somutlaştırır: optimizasyon ayrıntıları, görünüşte "doğa kanunu" olan katsayıları kaydırabilir. (Not: Pearce & Song, öğrenme oranı *azalma* çizelgesinin tek başına farkı açıklamadığını; asıl etkenin parametre sayma kuralı olduğunu savunur. Warmup ve öğrenme oranı ayarı açıklaması özellikle Porian ve ark.'na aittir.)

**Chinchilla'nın kendisi de eleştirildi (2024):** Besiroglu, Erdil, Barnett ve You (Epoch AI, 2024, "Chinchilla Scaling: A replication attempt", arXiv 2404.10102), Hoffmann ve ark.'nın üçüncü yaklaşımının (parametrik kayıp uyumu) raporlanan kestirimlerinin ilk iki yöntemle tutarsız olduğunu buldu; makalenin verbatim ifadesiyle: "the reported estimates are inconsistent with their first two estimation methods, fail at fitting the extracted data, and report implausibly narrow confidence intervals—intervals this narrow would require over 600,000 experiments, while they likely only ran fewer than 500." Hoffmann'ın raporladığı güven aralığı, optimal katsayı a için 0,454–0,455 idi; replikasyon ise a için ~0,018 standart hata (yani ~50 kat daha geniş aralık) buldu. Nedenler, bir orijinal yazar (Borgeaud) tarafından da doğrulandı: optimize edicinin (L-BFGS-B) Huber kaybını örnekler üzerinde toplamak yerine ortalamasını alması yüzünden yüksek bir kayıp ölçeği oluşması ve yakınsamadan önce erken durması; ve makale gövdesindeki parametrelerin (özellikle veri üsteli β'nın 0,2849 yerine 0,28 olarak) yanlı tahminlere yol açacak şekilde yuvarlanması. Düzeltilmiş uyum (β ≈ 0,366), üçüncü yaklaşımı ilk ikisiyle uyumlu hale getirdi (yaklaşık 20–26 token/parametre). Önemli olan: bu eleştiri Chinchilla'nın **temel reçetesini çürütmedi**, aksine onu sağlamlaştırdı — ama "ölçek yasaları kesin matematik" algısına önemli bir uyarı koydu.

### 5.3 Ön eğitim kapasitesinin son-eğitim davranışından ayrılması

Ön eğitim, ham kapasiteyi (bilgi, akıl yürütme şablonları, dil) üretir; ama Ouyang ve ark.'nın (2022, InstructGPT) ifadesiyle, ön eğitim hedefi olan "bir web sayfasındaki sonraki token'ı tahmin etmek", "kullanıcının talimatını yardımcı ve güvenli biçimde takip etmek" hedefinden farklıdır. Bu boşluğu kapatmak için son-eğitim kullanılır: (1) insan gösterimleriyle denetimli ince ayar (supervised fine-tuning), (2) bir ödül modeli (reward model) eğitimi, (3) pekiştirmeli öğrenme (RLHF). Çarpıcı veri: InstructGPT'nin 1,3B parametreli RLHF'li versiyonu, insan tercih değerlendirmelerinde 175B parametreli ham GPT-3'ü geçti; insanlar InstructGPT yanıtlarını GPT-3'e kıyasla zamanın %71'inde tercih etti. Ve son-eğitimin hesaplama maliyeti ön eğitimin yalnızca küçük bir kesridir (denetimli ince ayar ~%0,1, RLHF ~%0,2).

Bu ayrım kavramsal olarak kritiktir: bir modelin "kibar", "yardımcı" veya "reddedici" olması büyük ölçüde son-eğitim eseridir; ham yetenek ise ön eğitimden gelir. Bir modelin neyi **yapabileceği** (kapasite) ile neyi **yapmayı seçtiği** (davranış/hizalama) farklı kaynaklardan gelir.

## 6. Akademik Tartışmalar

### 6.1 "Ölçek her şeyi çözer" vs. "veri kalitesi ve eğitim reçetesi en az ölçek kadar önemli"

Bir uçta, ölçek yasalarının öngörü gücüne dayanan ve daha fazla hesaplama/veri/parametrenin öngörülebilir biçimde daha iyi modeller getireceğini savunan görüş (Kaplan'ın erken çerçevesi, ve frontier laboratuvarlarının devasa veri merkezi yatırımları bu inancı yansıtır). Diğer uçta, phi modelleri (Textbooks Are All You Need) ve FineWeb gibi çalışmalar, **aynı ölçekte** veri kalitesinin frontier'i kaydırdığını gösterir; LLaMA-13B'nin daha az hesaplamayla GPT-3'ü (175B) MMLU'da geçebilmesi, daha çok eğitim token'ı ve iyileştirilmiş veri filtreleme sayesindedir. Gerçek muhtemelen ikisinin sentezidir: ölçek gereklidir ama yeterli değildir; veri ve reçete, aynı hesaplamadan ne kadar yetenek çıkacağını belirler.

### 6.2 Beliren yetenekler: gerçek faz geçişi mi, ölçüm yan etkisi mi?

**Gerçek-faz-geçişi görüşü (Wei ve ark., 2022):** Ölçek belirli bir eşiği aştığında, küçük modellerde bulunmayan yetenekler (çok-adımlı akıl yürütme, üç-haneli toplama, talimat takibi) aniden ortaya çıkar ve küçük modellerden ekstrapolasyonla öngörülemez. Suyun donması gibi "faz geçişi" benzetmesi sıkça kullanılır.

**Ölçüm-yan-etkisi görüşü (Schaeffer ve ark., NeurIPS 2023, "Are Emergent Abilities a Mirage?"):** "Ani sıçrama", seçilen metriğe bağlıdır. Doğrusal-olmayan/süreksiz bir metrik (örn. tam-eşleşme doğruluğu — ya %100 doğru ya sıfır, kısmi puan yok) kullanırsanız görünüşte beliren yetenek elde edersiniz. Doğrusal/sürekli bir metriğe (token düzenleme mesafesi, log-olabilirlik, Brier skoru) geçerseniz iyileşme pürüzsüz ve öngörülebilir hale gelir. Schaeffer'in özetlediği üç açıklayıcı faktör: (1) araştırmacının token başına hata oranını doğrusal-olmayan/süreksiz biçimde ölçen bir metrik seçmesi, (2) küçük parametre rejiminde yetersiz çözünürlük (test kümesi boyutuyla sınırlı), (3) büyük parametre rejiminin yetersiz örneklenmesi. Stanford HAI'nin aktardığı gibi, görme modellerinde "beliren yetenek" iddiası yoktur çünkü görme araştırmacıları bu sert metrikleri kullanmaz.

**Nüanslı durum (2024–2025):** Schaeffer'in kendisi bile "hiçbir şey LLM'lerin beliren yetenek sergileyemeyeceğini iddia etmiyor" der. Wei ise blogunda, belirmenin doğrusal eksende bile görülebildiğini (7B'den 13B'ye sıçrama) ve sürekli surrogat metriklerin tam-eşleşme performansını öngörebileceğine dair sağlam kanıt görmediğini savunur. Dahası, Du ve ark. (2024) gibi çalışmalar, sürekli metriklerle (Brier skoru) bile **ön-eğitim kaybı belirli bir eşiğin altına düştüğünde** eşik benzeri davranış gözlemlediklerini raporlar; Schaeffer'in kendi makalesinde bile modüler aritmetik, Fransızca-İngilizce çeviri ve IPA transliterasyonu gibi bazı görevlerde kısmi-puan metrikleri keskin sıçrama gösterdi. Yani "her belirme bir seraptır" ifadesi fazla güçlüdür; bazı yetenekler metrikten bağımsız olarak keskin görünmeye devam etmektedir. Bu konu **henüz kapanmamıştır**.

### 6.3 Grokking ve faz geçişi teorisi

İlgili bir olgu olan **grokking** (modelin eğitim kaybı sıfıra indikten çok sonra aniden genelleme kazanması), belirmenin gerçek bir dinamik fenomen olabileceğine dair mekanistik kanıt sunar. Ancak buradaki teorik tartışma da çözülmemiştir: kimi çalışmalar grokking'i nöronlar arası sinerjik etkileşimden doğan gerçek bir faz geçişi olarak görür (arXiv 2408.08944), kimileri ise "süreksiz görünen eğrilerin aslında gizli bir koordinatta sürekli ilerleme" olabileceğini gösterir (Barak ve ark.; singular learning theory yaklaşımı, arXiv 2603.01192). Bu, belirme tartışmasının daha derin bir versiyonudur: gözlemlenen süreksizlik, altta yatan sürekli bir sürecin ölçüm yansıması olabilir.

## 7. Güçlü Bulgular (Sağlam Kaynaklarla Desteklenen)

1. **Kayıp, ölçekle güç yasası izler.** Kaplan ve ark. (2020) ve Hoffmann ve ark. (2022), kaybın N, D, C ile güç yasası ilişkisini bağımsız olarak doğruladı. Bu, alanın en sağlam ampirik bulgusudur.
2. **Hesaplama-optimal eğitim için N ve D birlikte ölçeklenmelidir** (Chinchilla, ~20 token/parametre); GPT-3 dâhil birçok erken model yetersiz eğitilmişti. 2024 replikasyonu (Epoch AI) bu temel reçeteyi sağlamlaştırdı.
3. **Tekilleştirme ölçülebilir fayda sağlar:** daha az ezberleme, daha verimli eğitim, daha az test kontaminasyonu (Lee ve ark., 2022).
4. **Veri kalitesi ölçekten bağımsız bir kaldıraçtır:** phi-1 (Gunasekar ve ark., 2023) ve FineWeb (Penedo ve ark., 2024) aynı ölçekte kalite farkının büyük performans farkı yarattığını gösterir.
5. **Son-eğitim, ön eğitimden ucuzdur ama davranışı dramatik biçimde değiştirir:** InstructGPT (Ouyang ve ark., 2022), ön-eğitim hesaplamasının ~%0,2'siyle 1,3B modeli 175B modelden daha tercih edilir hale getirdi.

## 8. Zayıf / Tartışmalı Noktalar

1. **Belirme tartışması çözülmemiştir.** Hem "ölçüm yan etkisi" (Schaeffer) hem de "metrikten bağımsız gerçek eşikler" (Du ve ark.; Wei'nin savunması) için kanıt vardır. Kesin konuşmak yanlıştır.
2. **Ölçek yasası katsayıları kırılgandır.** Kaplan–Chinchilla çelişkisi (Pearce & Song; Porian ve ark., 2024) ve Chinchilla'nın kendi parametrik uyumundaki hata (Epoch AI, 2024), katsayıların optimizasyon ayrıntılarına ve parametre sayma kurallarına duyarlı olduğunu gösterdi. Ölçek yasası bir "doğa kanunu" değil, dikkatli yorumlanması gereken ampirik bir uyumdur.
3. **Veri duvarı (data wall) tartışmalıdır.** Yüksek kaliteli insan-üretimi metnin tükenmekte olduğu (Sutskever'in "veri AI'nın fosil yakıtı, zirve veriye ulaştık" tezi) ile sentetik veri ve yeni kaynakların bunu telafi edeceği görüşleri çatışır. Sentetik veri aşırı kullanımı "model çöküşü" (model collapse) riski taşır.
4. **Test-zamanı ölçeklemesinin sınırları belirsizdir.** Bunun ne kadar süreceği ve hangi görevlerde genelleştiği henüz açık bir sorudur.

## 9. Yanlış Anlaşılan Noktalar

- **"Daha büyük model = otomatik olarak daha akıllı model."** Yanlış. Aynı hesaplama bütçesinde küçük-ama-iyi-eğitilmiş model (Chinchilla, LLaMA), büyük-ama-yetersiz-eğitilmiş modeli geçer. Boyut tek başına yeterli değildir.
- **"Sonraki-token tahmini yüzeysel bir görevdir."** Yanlış. Metni iyi sıkıştırabilmek (tahmin edebilmek), dünya hakkında yapılandırılmış temsiller öğrenmeyi gerektirir; bu, temsil öğrenmeyle derinden bağlıdır.
- **"Kayıp düştükçe model her konuda daha güvenilir olur."** Yanlış. Kayıp bir dağılım-düzeyi ortalamasıdır; nadir veya çelişkili konularda iyileşme garanti değildir. Ortalama perplexity düşerken belirli bir alanda hâlâ halüsinasyon olabilir.
- **"Ölçek yasası geleceğe dair kesin bir kehanettir."** Yanlış. Ölçek yasaları, belirli bir mimari, veri dağılımı ve optimizasyon rejiminde gözlemlenen ampirik düzenliliklerdir; rejim değişince (örn. veri tükenince, test-zamanı hesaplaması devreye girince) ekstrapolasyon kırılabilir.

## 10. Kavramsal Harita

- **Eğitim hedefi** (sonraki-token tahmini / çapraz entropi) → modele *ne* öğreneceğini söyler.
- **Veri** (kalite + karışım + tekilleştirme) → modelin *neyden* öğrendiğini belirler.
- **Optimizasyon** (gradyan inişi + öğrenme oranı çizelgesi) → öğrenmenin *nasıl* gerçekleştiğini ve ne kadar verimli olduğunu belirler.
- **Ölçek** (N, D, C) → öğrenmenin *ne kadar* derine gidebileceğinin tavanını belirler; ölçek yasalarıyla öngörülür.
- **Ölçüm** (metrik seçimi) → ne öğrenildiğini *nasıl gördüğümüzü* belirler; belirme tartışmasının merkezi.
- **Son-eğitim** (RLHF, talimat ayarı) → ham kapasiteyi *davranışa* dönüştürür.
- **Test-zamanı hesaplaması** → eğitimden sonra, çıkarımda ek yetenek çıkarır; yeni bir ölçekleme boyutu.

Bu altı eksen birbirini etkiler; yetenek hiçbirinin tek başına değil, hepsinin kesişiminin ürünüdür.

## 11. 2026 İtibarıyla Durum

2024 boyunca model iyileşmeleri büyük ölçüde son-eğitim ve test-zamanı hesaplamasından geldi; saf ön-eğitim ölçeklemesinde haber azaldı. Aralık 2024'te NeurIPS'te (Vancouver) Ilya Sutskever, "Sequence to sequence learning: what a decade" konuşmasında "Pre-training as we know it will end... the data is not growing because we have but one internet" diyerek veri kıtlığını ve "zirve veri" (peak data) tezini vurguladı. Buna karşılık, OpenAI'nin o1 projesinde yer alan araştırmacı Noam Brown gibi isimler "duvar" anlatısına karşı çıktı (Haziran 2024'te X'te "Startup founders, please don't bet your company's future on frontier models hitting a wall" ifadesiyle) ve çözümün test-zamanı ölçeklemesi olduğunu savundu. Frontier laboratuvarların devasa veri merkezi yatırımları da ölçeğe olan inancın sürdüğünü gösterir: Anthropic 12 Kasım 2025'te ABD'de (Texas ve New York'ta Fluidstack ile) $50 milyarlık bir bilişim altyapısı yatırımı duyurdu ("a $50 billion investment in American computing infrastructure... with sites coming online throughout 2026"); Meta ise 2025 için $60–65 milyar capex ve 2GW+ veri merkezi (Louisiana'daki Hyperion) planı açıkladı (Zuckerberg: "We'll bring online ~1GW of compute in 2025 and we'll end the year with more than 1.3 million GPUs").

**Test-zamanı hesaplaması** yeni bir boyut açtı. OpenAI'nin o1'i (Eylül 2024), performansının hem pekiştirmeli öğrenme (eğitim-zamanı hesaplaması) hem de "düşünmeye harcanan zaman" (test-zamanı hesaplaması) ile tutarlı biçimde iyileştiğini gösterdi; OpenAI'nin kendi ifadesiyle "bu yaklaşımı ölçeklemenin kısıtları, LLM ön-eğitiminin kısıtlarından önemli ölçüde farklıdır". Noam Brown'ın TED AI Konferansı'ndaki (Ekim 2024) çarpıcı ifadesiyle, bazı görevlerde "20 saniyelik düşünme, 100.000 kat daha fazla veriye bedel" olabilmektedir. DeepSeek-R1 (Ocak 2025), saf pekiştirmeli öğrenmeyle o1'e denk akıl yürütme elde edilebileceğini, üstelik çok daha düşük maliyetle gösterdi. Snell ve ark. (2024) "test-zamanı hesaplamasını optimal ölçeklemenin, parametre ölçeklemekten daha etkili olabileceğini" buldu. Ancak bu paradigmanın sınırları (uzun düşünme zincirlerinde "az-düşünme/aşırı-düşünme" sorunları, plato etkileri) aktif araştırma konusudur.

**Sentetik veri ve veri-verimliliği** öne çıktı; "ölçeği yukarı değil, aşağı ve dışarı" çevirme (data frugality) çağrıları akademik literatürde güçlendi. Genel tablo: saf ön-eğitim ölçeklemesi muhtemelen yavaşlıyor (kırılmıyor); ilerleme artık birden fazla eksene (veri kalitesi, son-eğitim, test-zamanı hesaplaması) dağılıyor. Bu, tezimizi doğrular: yetenek tek bir faktörün değil, birleşik bir sistemin ürünüdür.

## 12. Okuyucu İçin Zihinsel Model

LLM yeteneğini bir **damıtma sürecinin** ürünü olarak düşünün:
1. **Hedef** (sonraki-token tahmini), modelin neyi optimize edeceğini tanımlar — ve bu hedef, göründüğünden çok daha zengindir çünkü iyi tahmin = iyi sıkıştırma = yapılandırılmış temsil.
2. **Veri**, hammaddedir; kalitesi ve çeşitliliği, çıkacak yeteneğin tavanını belirler — kötü veriyle büyük model, iyi veriyle küçük modeli geçemeyebilir.
3. **Optimizasyon**, bu hammaddeyi ne kadar verimli işleyeceğinizi belirler — ve ayrıntıları (öğrenme oranı, warmup) ölçek yasası katsayılarını bile kaydırabilir.
4. **Ölçek**, ne kadar derine inebileceğinizin tavanıdır — öngörülebilir ama sınırsız değil.
5. **Ölçüm**, ne elde ettiğinizi nasıl gördüğünüzdür — yanlış metrik, gerçek olmayan "sıçramalar" gösterebilir veya gerçek kazanımları gizleyebilir.
6. **Son-eğitim ve test-zamanı hesaplaması**, ham kapasiteyi kullanılabilir ve daha yetenekli davranışa çevirir.

Bu altı bileşeni ayrı ayrı düşünebildiğinizde, "büyük model = akıllı model" gibi indirgemeci cümleleri ve abartılı "belirme" iddialarını eleştirel biçimde değerlendirebilirsiniz.

---

## GRILL-ME Kalite Kapısı

**En yaygın yanlış basitleştirme nedir?** "Çok büyük bir model çok veriyle eğitildi, o yüzden akıllı." Bu cümle, hesaplama-optimal dağılımı (Chinchilla), veri kalitesini, optimizasyon ayrıntılarını ve ölçüm sorunlarını tamamen gizler. Aynı hesaplamayla farklı reçeteler radikal biçimde farklı modeller üretir.

**Bu konuyu anlamak önceki AI/LLM anlayışında neyi değiştirir?** "Boyut → zekâ" doğrusal denkleminden, "hedef × veri × optimizasyon × ölçek × ölçüm × son-eğitim" çok-faktörlü modeline geçiş. Yetenek bir özellik değil, bir sistemin çıktısıdır.

**Hangi iddia güçlü kaynaklarla desteklenir?** Kaybın ölçekle güç yasası izlediği (Kaplan 2020, Hoffmann 2022); hesaplama-optimal eğitimin N ve D'yi birlikte ölçeklemeyi gerektirdiği (Chinchilla, 2024 replikasyonuyla doğrulandı); tekilleştirmenin ve veri kalitesinin ölçülebilir fayda sağladığı (Lee 2022, Gunasekar 2023, Penedo 2024).

**Hangi iddia hâlâ tartışmalıdır?** Beliren yeteneklerin gerçek faz geçişi mi yoksa ölçüm yan etkisi mi olduğu; veri duvarının ne kadar yakın ve aşılabilir olduğu; test-zamanı ölçeklemesinin sınırları. Bunlarda kesin konuşmak hatadır.

**Okuyucu hangi kavramı daha ciddiye almalı?** **Ölçüm/metrik seçimini.** Bir yeteneğin "ortaya çıkıp çıkmadığı", "bir modelin diğerinden iyi olup olmadığı" sorularının cevabı, büyük ölçüde hangi metrikle baktığınıza bağlıdır. Metrik okuryazarlığı, abartılı iddialara karşı en güçlü savunmadır.

---

## Sonuç: LLM yeteneği neden tek bir faktörden değil, birleşik etkiden doğar?

Çünkü her faktör diğerinin etkisini koşullar. **Eğitim hedefi** (sonraki-token tahmini), zengin temsiller öğrenme *potansiyelini* yaratır — ama bu potansiyel ancak **veri** yeterince kaliteli ve çeşitliyse gerçekleşir. **Optimizasyon**, bu potansiyelin ne kadarının fiilen ağırlıklara yazılacağını belirler; kötü bir öğrenme oranı çizelgesi, ölçek yasası katsayılarını bile yanıltacak kadar etkilidir. **Ölçek**, ulaşılabilir tavanı yükseltir ama getiriler azalan marjinaldir ve veri tükenmesiyle sınırlanır. **Ölçüm**, tüm bu sürecin sonunda ne elde ettiğimizi *görme biçimimizdir* — ve yanlış metrik, olmayan sıçramalar icat edebilir veya gerçek kazanımları gizleyebilir. Son olarak **son-eğitim ve test-zamanı hesaplaması**, ham kapasiteyi kullanılabilir yeteneğe dönüştüren ayrı katmanlardır. Bu faktörlerden herhangi biri zayıfsa, diğerlerinin gücü boşa gider: iyi veri ama yetersiz ölçek, ya da büyük ölçek ama kötü optimizasyon, ya da güçlü model ama yanıltıcı ölçüm — hepsi yanlış sonuçlara götürür. Bu yüzden LLM yeteneği, bir çarpım gibi davranır: bileşenlerin hiçbiri sıfır olamaz ve hiçbiri tek başına bütünü açıklayamaz.

## 13. Kaynakça

- Kaplan, J. ve ark. (2020). "Scaling Laws for Neural Language Models." arXiv:2001.08361.
- Hoffmann, J. ve ark. (2022). "Training Compute-Optimal Large Language Models" (Chinchilla). NeurIPS / arXiv:2203.15556.
- Wei, J. ve ark. (2022). "Emergent Abilities of Large Language Models." TMLR / arXiv:2206.07682.
- Schaeffer, R., Miranda, B., Koyejo, S. (2023). "Are Emergent Abilities of Large Language Models a Mirage?" NeurIPS / arXiv:2304.15004.
- Lee, K. ve ark. (2022). "Deduplicating Training Data Makes Language Models Better." ACL 2022 / arXiv:2107.06499.
- Gunasekar, S. ve ark. (2023). "Textbooks Are All You Need" (phi-1). arXiv:2306.11644.
- Penedo, G. ve ark. (2024). "The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale." NeurIPS 2024 / arXiv:2406.17557.
- Ouyang, L. ve ark. (2022). "Training Language Models to Follow Instructions with Human Feedback" (InstructGPT). arXiv:2203.02155.
- Besiroglu, T., Erdil, E., Barnett, M., You, J. (2024). "Chinchilla Scaling: A replication attempt." arXiv:2404.10102 (Epoch AI).
- Pearce, T., Song, J. (2024). "Reconciling Kaplan and Chinchilla Scaling Laws." TMLR / arXiv:2406.12907.
- Porian, T. ve ark. (2024). "Resolving Discrepancies in Compute-Optimal Scaling of Language Models." arXiv:2406.19146.
- Snell, C. ve ark. (2024). "Scaling LLM Test-Time Compute Optimally Can Be More Effective Than Scaling Model Parameters." arXiv:2408.03314.
- OpenAI (2024). "OpenAI o1 System Card." arXiv:2412.16720.
- DeepSeek-AI (2025). "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning." arXiv:2501.12948.
- Sutskever, I. (2024). NeurIPS 2024 konuşması, "Sequence to sequence learning: what a decade" ("Pre-training as we know it will end").
- "Bridging Information-Theoretic and Geometric Compression in Language Models." arXiv:2310.13620.
- "A Markov Categorical Framework for Language Modeling." arXiv:2507.19247.
- Du ve ark. (2024). "Understanding Emergent Abilities from the Loss Perspective" / "Predicting Emergent Abilities with Infinite Resolution Evaluation." ICLR 2024.