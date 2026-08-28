# Fable 5 Master Prompt — Mevcut AI Serisini Yeniden Kur ve Boğaziçi CmpE Scientific Interview Serisini Tek Görevde İnşa Et

## /goal

Bu görevi **tek Fable 5 ana agent olarak, tek oturumda ve sonuna kadar** tamamla. İşi iki ayrı chate, iki ayrı agente, background workflow’lara veya daha sonra yapılacak bir “ikinci faz” görevine bölme. Bu prompt iki büyük sonucu aynı görev içinde ister:

1. `C:\dev\anil-lib` içindeki mevcut **“Sıfırdan Yüze: Yapay Zekâ”** serisinin yayımlanmış ilk 10 makalesini ve çalışan kullanıcı deneyimini koruyarak, yayımlanmamış geleceğini akademik + teorik + araştırma + mühendislik açısından yeniden tasarla ve kalıcı seri sistemini buna göre güncelle.
2. Aynı platformda, AI serisinden ayrı fakat aynı kalite standardını taşıyan **Boğaziçi Üniversitesi Computer Engineering M.Sc. scientific interview hazırlık serisini** araştır, tasarla, kalıcı seri sistemini kur ve platforma güvenli biçimde hazır hale getir.

**Bu görevde makale gövdesi yazma.** Görevin çıktısı iki serinin de konuları, kapsamı, prerequisite yapısı, pedagojik/editoryal sözleşmesi, yaşayan roadmap/handoff düzeni ve gerektiği ölçüde platformdaki güvenli altyapısı tamamlanmış, sonraki yazım oturumlarında doğrudan kullanılabilir hale gelmiş olmasıdır.

Kapsamı “önce bir kısmını yapayım, gerisi sonra” diye daraltma. AI tarafını bitirip BOUN tarafını başka göreve bırakma veya BOUN araştırmasını yapıp platform entegrasyonunu erteleme. Gerçek bir dış engel yoksa aşağıdaki bütün kabul kriterleri karşılanana kadar çalışmaya devam et.

---

# I. Önce mevcut gerçekliği doğrula

Repo içindeki gerçek mevcut durum, eski promptlardan daha yüksek önceliklidir. Önce mevcut kodu ve kalıcı seri belgelerini okuyarak state’i doğrula.

Özellikle mevcut AI serisinde:

- `docs/seri/SOZLESME.md`
- `docs/seri/HANDOFF.md`
- `docs/seri/YOL-HARITASI.md`
- gerçek article/catalog/roadmap/assets yapısı
- yayımlanmış 1–10 makalenin kendileri
- seri route’ları ve reader davranışı
- progress/bookmark/sync yapısı
- shared component ve veri sözleşmeleri
- mevcut doğrulama/test araçları

incelensin.

Mevcut kayıtlara göre ilk 10 AI makalesi yayımlanmış durumda; 11’den sonrası henüz yayımlanmamış roadmap’tir. Eski sözleşme toplam 100 makale ve sabit 5+1 üretim ritmi üzerine kurulmuştur. Bu görev, kullanıcının **açık sözleşme değişikliği talebidir**: toplam makale sayısı artık sabit bir akademik hedef değildir ve gelecekteki yazım oturumları yalnızca 5’li batch’e bağlı olmak zorunda değildir. Buna karşılık mevcut sözleşmedeki güçlü akademik, editoryal, pedagojik, kaynak, görselleştirme ve doğrulama ilkeleri korunmalıdır.

Daha önce hazırlanmış ancak hiç tetiklenmemiş “100 yazılık AI akademi/literatür serisi”, “200 yazılık AI research & engineering serisi” ve bunları birleştirmeyi amaçlayan promptlar **yeni bağımsız seriler için bağlayıcı planlar değildir**. Bunları yalnızca geçmiş niyeti ve konu havuzunu anlamak için kullan. Bu master prompt nihai kullanıcı niyetidir.

---

# II. İş Paketi A — Mevcut AI serisinin geleceğini yeniden tasarla

## A1. Temel karar

**İkinci bir AI serisi oluşturma.**

Daha önce ayrı bir akademik/literatür serisine veya ayrı research & engineering serisine koymayı düşündüğümüz değerli içeriklerin yeri, uygunsa, mevcut “Sıfırdan Yüze: Yapay Zekâ” serisinin yayımlanmamış geleceğidir.

Ama bunu mevcut 11–100 listesinin üzerine birkaç yeni başlık serpiştirmek gibi ele alma. 11’den sonrasını gerçek akademik ve pedagojik gerekçelerle baştan değerlendir.

Yayımlanmış **1–10 makale sabittir**:

- article id / slug / URL / reading order korunmalı;
- kullanıcı progress ve bookmark geçmişi bozulmamalı;
- onları sırf yeni roadmap’e uydurmak için yeniden yazma;
- bu görevde 1–10 için genel bir “content improvement” veya yeni fact-check turu başlatma.

Ancak 1–10’u okuyarak onların:

- hangi kavramları gerçekten kurduğunu,
- hangi ileri konular için söz verdiğini,
- hangi terim ve prerequisite’leri oluşturduğunu,
- hangi kavramların daha sonra formal/akademik düzeyde yeniden kurulması gerektiğini

çıkar. Gelecek roadmap bu gerçek geçmişin üzerine oturmalı.

11’den sonrası yayımlanmamış olduğundan güçlü gerekçeyle:

- korunabilir,
- çıkarılabilir,
- birleştirilebilir,
- bölünebilir,
- sırası değiştirilebilir,
- yeni konularla değiştirilebilir,
- yeni fazlara taşınabilir.

Eski sıralamayı korumak başarı kriteri değildir. Öğrenme zincirinin daha iyi olması başarı kriteridir.

## A2. AI serisinin yeni nihai amacı

Seri sıfırdan başlayıp giderek **akademik olarak okuryazar, araştırma yapabilen ve ciddi AI mühendisliği düşünebilen** okuyucuya dönüşen tek bir öğrenme yolu olmalı.

Yalnızca LLM ürünlerini veya güncel AI araçlarını anlatan bir seri olarak kalmamalı. Aşağıdaki eksenlerin seride gerçekten gerekli olup olmadığını, prerequisite ilişkilerini ve uygun derinliğini güncel akademik kaynaklarla araştır:

- AI için gerekli matematiksel ve teorik temeller;
- linear algebra, calculus/optimization, probability/statistics, information-theoretic veya başka matematiksel araçlar yalnızca gerçekten AI öğrenme grafında gerektikleri ölçüde;
- klasik ve modern machine learning / deep learning fikirleri;
- öğrenme, optimization, generalization, representation ve scaling;
- klasik ve modern akademik eserlerin literatüre kazandırdığı önemli fikirler;
- modern model mimarileri, Transformer ailesi ve alternatifleri;
- data, pre-training, post-training, preference learning ve evaluation;
- inference ve model davranışı;
- AI araştırma pratiği: paper okuma, araştırma sorusu, hipotez, baseline, ablation, experiment design, reproducibility, negative results, statistical/measurement discipline ve benchmark problemleri;
- modeli veya kritik model bileşenlerini temelden inşa ederek anlama;
- reinforcement learning, sequential decision making, control ve agentic AI;
- retrieval, tools, memory, planning ve long-horizon systems;
- mechanistic interpretability, features/representations, circuits, probing, causal intervention ve model içi mekanizma araştırması;
- multimodality ve önemli üretken model aileleri;
- AI systems: GPU/accelerator zihinsel modeli, compute/memory/communication maliyetleri, training systems, distributed computation, inference systems, serving, optimization, reliability ve production trade-off’ları;
- robustness, safety, alignment, evaluation science ve responsible deployment;
- gerektiği yerde governance ve frontier/open research questions.

Bunları “her birine belli sayıda makale” diye kota haline getirme. Güncel ileri seviye üniversite dersleri, canonical textbooks/papers, güçlü konferans çalışmaları ve aktif araştırma programlarını karşılaştırarak doğal kapsamı çıkar. Örneğin modern dil modeli eğitimi ve systems tarafında Stanford’un “Language Modeling from Scratch” yaklaşımı gibi uçtan uca model kurma müfredatları ve CMU’nun LLM systems çizgisi yararlı sinyaller olabilir; fakat hiçbir müfredatı mekanik biçimde kopyalama.

Önemli soru her başlık için şudur:

**Bu konu gerçekten okunmaya ve öğrenilmeye değer mi, ciddi AI araştırmacısı/mühendisi olma yolunda bir yetkinlik veya prerequisite kuruyor mu, yoksa roadmap’i yalnızca büyütüyor mu?**

## A3. “100” artık hedef değil

Toplam makale sayısını 100’e, 200’e veya herhangi bir rakama göre tasarlama.

Önce:

- nihai öğrenme hedefini,
- bilgi grafını,
- prerequisite ilişkilerini,
- kavramların formalizasyon ve tekrar noktalarını,
- fazların doğal sınırlarını

kur.

Makale sayısı bundan sonra ortaya çıksın. Güçlü seri 70 makaleyse 70, 130 gerekiyorsa 130, 200’den fazla gerçekten değerli konu gerekiyorsa daha uzun olabilir.

“Sıfırdan Yüze” adının bu yeni doğal uzunlukta marka olarak korunmasının mantıklı olup olmadığını değerlendirebilirsin. Ancak isim konusu çalışan linkleri, progress’i, bookmark’ları veya kullanıcı beklentisini bozacak gereksiz bir migration’a dönüşmemeli. Teknik geriye uyumluluk ve yayımlanmış içerik stabilitesi önceliklidir.

## A4. İlk 10’dan formal ve akademik derinliğe geçiş

İlk 10’u yeniden sıralayamadığın için, yeni matematiksel/teorik konuları geçmişe zorla eklemeye çalışma.

Bunun yerine “sezgisel olarak gördük, şimdi formal olarak kuruyoruz” yaklaşımını kullanabilirsin. Daha önce sezgisel anlatılan loss, gradient, attention, probability distribution veya başka bir fikir ileride matematiksel/formal düzeyde yeniden ele alınabilir. Bu tekrar değil, **sezgiden formalizme bilinçli geçiş** olmalı ve eski makaleye açık pedagojik bağ taşımalı.

Mevcut 1–10’da geleceğe bırakılmış açık borçları sessizce yok etme. Yeni roadmap hangi eski sözün nerede ödeneceğini açıkça izleyebilmeli.

## A5. AI sözleşmesi ve yaşayan state

Mevcut AI `SOZLESME`, `YOL-HARITASI` ve `HANDOFF` modelinin güçlü taraflarını koru fakat yeni kullanıcı kararına göre normalize et.

Korunması beklenen temel ilkeler:

- deep research;
- mümkün olduğunca birincil ve güvenilir akademik kaynak;
- hakemli/hakemsiz ayrımının dürüstlüğü;
- ciddi ama okunabilir Türkçe;
- sezgi → mekanizma → teknik ayrıntı → akademik bağlam;
- formülü önce kavramsal olarak kurma ve gerektiğinde küçük gerçek örnekle gösterme;
- prerequisite zinciri;
- progressive disclosure;
- spaced recall ve retrieval practice;
- worked examples;
- cognitive load yönetimi;
- scaffolding/fading;
- terim tutarlılığı;
- tanımsız sembol/kavram kullanmama;
- dekoratif değil öğretici görselleştirme;
- kaynak/URL/sayısal iddia doğrulaması;
- yayımlanmış içeriğin stabil olması;
- yaşayan handoff ve roadmap.

Değiştirilecek tarihsel kısıtlar:

- “seri mutlaka 100 makaledir”;
- “üretim mutlaka 5 makale + 1 hazırlık işi olarak yapılır”.

Gelecekte kullanıcı “1 yazı yaz”, “2 yazı yaz” veya “5 yazı yaz” diyebilmeli. Batch büyüklüğü değişse bile continuity bozulmamalı. Her yazım görevi sonunda kalıcı state, prerequisite/recall kayıtları ve sıradaki güvenli başlangıç noktası güncellenmeli.

Gerekirse mevcut sözleşmeyi sürümle ve tarihli değişiklik kaydı bırak. Mevcut ilk 10’un historical metadata’sını yeni modele uydurmak için bozma.

---

# III. İş Paketi B — Boğaziçi CmpE Scientific Interview hazırlık serisini kur

AI serisinin yeni geleceğini netleştirdikten sonra **aynı görev içinde** BOUN serisine geç. AI tarafını başka chat’e bırakma ve BOUN için yeni agent gerektirme.

## B1. Ayrı seri, ortak kalite

BOUN serisi mevcut AI serisinin bir fazı değildir. Platformda ayrı bir seri olmalı.

Ama iki seri aynı yüksek kalite standardını kullanabilir ve platform altyapısını güvenli biçimde paylaşabilir.

BOUN serisinin amacı:

**Boğaziçi Üniversitesi Computer Engineering M.Sc. scientific interview için, unutulmuş bilgisayar bilimi ve bilgisayar mühendisliği temellerini yeniden kurarak kısa akademik görüşmede teknik bilgisini açıklayabilen, küçük problem çözebilen, ispat/matematiksel muhakeme yapabilen ve trade-off tartışabilen aday yetiştirmek.**

Bu bir “mülakat soru ezberi” serisi değildir ve genel bir “bilgisayar mühendisliği lisansını yeniden oku” projesi de değildir.

## B2. Güncel resmi Boğaziçi gerçeğini yeniden doğrula

Kapsam kararlarını başlamadan güncel resmi Boğaziçi CmpE kaynaklarıyla doğrula.

2026 Ağustos sonu itibarıyla resmi M.Sc. sayfasındaki güçlü başlangıç sinyalleri:

- scientific interview, pre-evaluation’ı geçen adaylarla yapılıyor;
- en az iki faculty member interview yapıyor;
- her görüşme yaklaşık 10 veya 15 dakika;
- görüşmede past academic record, research direction, skillset ve technical knowledge konuşuluyor;
- Scientific Preparation altında CMPE220 — Discrete Computational Structures, CMPE250 — Data Structures ve CMPE322 — Operating Systems listeleniyor.

Bunlar **güçlü çekirdek sinyalleridir ama kesin interview syllabus değildir**.

Güncel resmi bölüm kaynaklarından ayrıca:

- undergraduate curriculum,
- course catalog,
- prerequisite yapısı,
- erişilebilen syllabus / lecture material / homework / exam kaynakları

incelensin.

CMPE300 — Analysis of Algorithms resmi olarak CMPE250 prerequisite’ine sahip ve algorithm analysis, complexity, divide-and-conquer, dynamic/greedy/graph algorithms, lower bounds, parallel/probabilistic algorithms ve matematiksel analiz araçları içeriyor; bu nedenle güçlü ikinci-halka adaylarından biridir.

Güncel lisans çekirdeğindeki probability/statistics, programming languages, formal languages/automata, operating systems ve diğer supporting fundamentals da değerlendirilebilir. Computer organization/architecture, systems programming, databases veya başka alanlar tarihsel/current curriculum farkları nedeniyle yalnızca güncel kaynak ve interview-readiness getirisiyle değerlendirilmeli.

Eski/legacy Boğaziçi sayfaları veya geçmiş öğrenci deneyimleri yardımcı sinyal olabilir ama güncel resmi kaynakla aynı ağırlıkta değildir. Informal deneyimden “bu soru kesin gelir” çıkarımı yapma.

Kaynak önceliği:

1. güncel resmi Boğaziçi CmpE graduate/program/interview bilgisi;
2. güncel resmi curriculum/course catalog/syllabus/material;
3. standart ve güvenilir textbook / üniversite dersi / akademik kaynak;
4. geçmiş interview deneyimi yalnızca düşük ağırlıklı yardımcı sinyal.

## B3. BOUN için doğal kapsam

Şu başlıkları nihai liste olarak değil, araştırılması gereken çekirdek adaylar olarak değerlendir:

- logic ve proof techniques;
- sets, functions, relations;
- induction, recursion;
- counting ve combinatorics;
- graphs, trees ve discrete structures;
- data structures ve doğru veri yapısını seçme;
- sorting/searching/hashing/heaps/search structures;
- graph representations ve traversals;
- asymptotic reasoning ve complexity;
- recurrences ve mathematical analysis of algorithms;
- divide-and-conquer;
- greedy;
- dynamic programming;
- shortest paths, MST ve gerekli graph algorithm düşüncesi;
- correctness ve lower-bound reasoning;
- processes ve threads;
- CPU scheduling;
- concurrency;
- synchronization ve critical sections;
- deadlocks;
- memory management;
- paging ve virtual memory;
- file systems;
- I/O;
- protection/security;
- system-level trade-offs.

Bunların yanında yalnızca gerçekten yüksek hazırlık getirisi veya gerçek prerequisite değeri varsa:

- probability/statistics;
- computer organization/architecture;
- systems programming;
- databases;
- programming languages;
- formal languages/automata;
- başka gerekli matematik/CS temelleri

dahil edilebilir.

Serinin uzunluğunu 30/50/100 gibi bir sayıya kilitleme. Önce interview-readiness tanımı ve bilgi grafı kurulsun, sonra doğal makale sayısı ortaya çıksın.

## B4. BOUN’un ayırt edici pedagojisi

AI serisinin kanıta dayalı pedagojik yaklaşımını referans al ama BOUN serisine özel başarı kriterini ekle:

**oral reasoning + whiteboard/problem solving.**

Bir okuyucu ilgili konuyu tamamladığında:

- kavramı sezgisel olarak açıklayabilmeli;
- gerekliyse formal tanımı verebilmeli;
- küçük bir problem üzerinde uygulayabilmeli;
- çözümün neden doğru olduğunu savunabilmeli;
- complexity / memory / resource / correctness / concurrency trade-off’larını tartışabilmeli;
- “neden?”, “hangi durumda bozulur?”, “alternatifi ne?”, “karmaşıklığı nedir?”, “bunu nasıl ispatlarsın?” takip sorularına dayanabilmeli.

Gelecekteki makalelerde uygun yerde:

- worked example;
- kısa proof;
- küçük algoritmik/problem-solving egzersizi;
- pseudocode veya kod;
- diyagram;
- comparison;
- oral checkpoint / whiteboard-style question

kullanılabilsin.

Ancak bunu her makaleye aynı şablonu yapıştıran mekanik checklist’e dönüştürme.

## B5. AI ve BOUN serilerinin sınırı

İki seri birbirini kopyalamamalı.

BOUN serisinde graph theory, probability, algorithms veya systems gibi bir konu **CS temeli olarak** gerekiyorsa öğretilsin. O konunun AI’daki ileri kullanımı varsa uygun bir çapraz referans düşünülebilir, fakat BOUN içeriği AI serisini prerequisite yapmamalı.

AI’ya özgü model, training, interpretability, agents veya AI systems derinliği mevcut AI serisine aittir.

BOUN serisinin amacı AI öğretmek değil, bilim mülakatında ortaya konabilecek bilgisayar bilimi temeli ve muhakeme yeteneğini güçlendirmektir.

---

# IV. Platform mimarisi ve regresyon sınırları

Bu görev yalnızca roadmap markdown’ları yazıp bırakmak değildir. İki seri de sonraki yazım oturumlarına **repo içinde kalıcı ve güvenli biçimde hazır** olmalıdır.

Fakat çözüm mimarisini bu prompttan tahmin etme. Repo içindeki mevcut seri sistemini inceleyip en sade, mevcut yapıyla uyumlu tasarımı seç.

Gerektiği ölçüde:

- AI serisinin güncellenmiş yaşayan state’i;
- BOUN serisinin ayrı roadmap/sözleşme/handoff state’i;
- yeni seri kimliğinin platform tarafından temsil edilmesi;
- progress/bookmark/sync izolasyonu;
- route ve catalog ayrımı;
- shared reader/component davranışı;
- seri seçimi veya keşfi için gerekli minimal UI/meta entegrasyonu

ele alınabilir.

Ortak bir component, schema veya reader altyapısına dokunmadan önce bütün tüketicilerini incele. Görünen tek kullanım noktasına göre karar verme.

Tercih:

- additive;
- backwards-compatible;
- mevcut veriyle uyumlu;
- gelecekte üçüncü seri gerekirse yapıyı kilitlemeyen

çözüm olsun.

Mevcut AI serisinin:

- `/seri` deneyimi,
- yayımlanmış 1–10 içeriği,
- user progress,
- bookmark,
- mevcut catalog/hash davranışı,
- mevcut kütüphane `/read` tarafı,
- başka çalışan ekran/consumer’lar

bozulmamalı.

Zorunlu breaking change görürsen sessizce yapma. Önce etkisini kanıtla ve güvenli migration/backward-compatibility yolu oluştur.

Bu görevde yeni makale olmadığı için boş/planlanan seri state’inin UI veya sync tarafında null/empty/partial data hatasına yol açmadığını da düşün.

---

# V. Tek agent çalışma kuralı — workflow ve subagent YOK

Bu görevde **tek agent sensin**.

- Background workflow açma.
- `/workflow` veya `/workflows` kullanma.
- Subagent oluşturma.
- Sonnet/Opus helper çağırma.
- Topic-per-agent yapma.
- Reviewer swarm oluşturma.
- Nested delegation yapma.
- Otomatik retry agent döngüsü kurma.

Web research, repo arama/okuma, shell, mevcut proje araçları ve gerekli skill’leri **kendin, ana chat içinde** kullan.

Bu kural kaliteyi düşürmek için değil, geçmişte yaşanan aşırı orkestrasyonu ve token israfını engellemek içindir. Önceki üretim turlarında aynı işi farklı araştırma/reviewer ajanlarına tekrar tekrar yaptırmak usage limitlerini tüketti ve kapanmayan loop’lar yarattı. Bu görevde aynı hatayı tekrarlama.

Token disiplinin:

- dosyayı ihtiyaç yokken tekrar tekrar okuma;
- aynı web sorusunu farklı biçimlerde defalarca araştırma;
- aynı kararı art arda farklı “review turlarıyla” yeniden tartışma;
- her küçük değişiklikten sonra bütün projeyi baştan audit etme;
- çalışma sırasında sürekli uzun durum raporları üretme.

Bunun yerine kanıtı bir kez topla, karar ver, uygula ve finalde gerekli doğrulamayı yap.

Kurulu skill’leri gerektiğinde kullanabilirsin. Özellikle seri kapsamı ve tasarım kararında brainstorming, gerçek hata veya regresyonda systematic-debugging, onaylanmış kapsamın uygulanmasında planlama/uygulama ve tamamlanma iddiasında verification yaklaşımı yararlı olabilir. Ancak skill kullanımı yeni agent/workflow üretmemeli ve seremoniye dönüşmemeli.

---

# VI. Eğitim ve güvenlik bağlamı

Bütün çalışma kullanıcının:

- kişisel eğitimi,
- bilgisayar bilimi temellerini tazelemesi,
- AI alanında akademik ve mühendislik uzmanlığını geliştirmesi,
- olası yüksek lisans/tez çalışması,
- Boğaziçi CmpE scientific interview hazırlığı

içindir.

AI safety, adversarial robustness, model misuse, red teaming, OS protection, systems security veya cyber security gibi akademik başlıkların roadmap’te görünmesi tek başına görevi zararlı yapmaz.

Yalnızca “cyber”, “attack”, “security”, “red team” gibi kelimeler gördüğün için bütün görevi terk etme veya erken sonlandırma. Her alt konuyu gerçek eğitim ve akademik niyetine göre değerlendir.

Belirli bir alt başlık gerçekten sakıncalı operasyonel ayrıntıya yaklaşırsa yalnızca o alt kısmı güvenli, savunmacı, teorik veya akademik seviyede sınırla; **geri kalan meşru seri tasarımı ve eğitim görevini bitirmeye devam et.**

Geçici belirsizlik, bir URL’nin kırık olması, eski/yeni müfredat çelişkisi, zor bir araştırma konusu veya ilk başarısız yaklaşım görevi bırakma nedeni değildir. Doğrulanabilir alternatif kaynaktan ilerle.

Yalnızca gerçekten kullanıcı kararı olmadan güvenli biçimde çözülemeyen bir dış engel varsa dur.

---

# VII. Makale yazma yasağı

Bu master görev **seri mimarisi + araştırma + kalıcı repo kurulumu** görevidir.

Bu görevde:

- AI makale 11’i yazma;
- BOUN makale 1’i yazma;
- “örnek olsun” diye tam makale üretme;
- yayımlanmış AI 1–10’u yeniden yazma.

Gelecekte yazılacak makalelerin:

- başlık/odak;
- prerequisite;
- pedagojik amaç;
- araştırma yönü;
- olası worked example/görselleştirme ihtiyacı

roadmap/handoff seviyesinde tanımlanabilir.

Ama article body üretimi sonraki görevlerin işidir.

---

# VIII. Görevin tek seferde tamamlanma kriterleri

Bu taskı ancak aşağıdakilerin **tamamı** gerçekleştiğinde bitmiş say.

## AI tarafı

- Mevcut yayımlanmış 1–10 korunmuş ve yeni roadmap bunlarla çelişmiyor.
- 1–10’un açık ileri borçları ve prerequisite mirası kaybolmamış.
- 11’den sonrası güncel akademik/araştırma/mühendislik hedeflerine göre gerçekten yeniden değerlendirilmiş.
- Eski ayrı akademik ve research-engineering seri fikirlerindeki değerli konular ikinci seri açılmadan mevcut AI serisine entegre edilmiş veya gerekçeli biçimde dışarıda bırakılmış.
- Doğal faz/prerequisite yapısı kurulmuş.
- Toplam makale sayısı akademik/pedagojik kapsamın sonucu olmuş, 100/200 sayısına göre şişirilmemiş.
- `SOZLESME`, `YOL-HARITASI`, `HANDOFF` ve gerekiyorsa ilgili platform state’i yeni kararla tutarlı.
- Sabit 5+1 yerine 1/2/5 gibi küçük değişken batch’lerle devam edilebilecek continuity modeli kurulmuş.
- Sonraki AI yazım chat’i yalnızca kalıcı repo state’ini okuyarak ne yazacağını anlayabiliyor.

## BOUN tarafı

- Güncel resmi Boğaziçi kaynakları doğrulanmış.
- Scientific Preparation ile interview syllabus birbirine karıştırılmamış.
- Interview-readiness açıkça tanımlanmış.
- Doğal çekirdek + supporting fundamentals seçilmiş.
- Gereksiz lisans konuları roadmap’i şişirmiyor.
- Fazlar ve prerequisite grafı akademik gerekçeyle kurulmuş.
- Oral reasoning + problem solving pedagojisi sözleşmeye yansımış.
- Makale sayısı doğal kapsamdan çıkmış.
- Ayrı yaşayan roadmap/sözleşme/handoff state’i mevcut.
- Sonraki BOUN yazım chat’i yalnızca kalıcı state’i okuyarak ilk 1/2/5 makaleyi güvenle yazmaya başlayabiliyor.

## Platform tarafı

- İki seri birbirinden güvenli biçimde ayrılmış.
- Shared altyapıda yapılmış değişiklikler başka consumer’ları bozmuyor.
- Existing AI 1–10, progress/bookmark/sync ve mevcut library davranışında regresyon yok.
- BOUN serisinin henüz makalesi olmaması veya yalnızca plan state’ine sahip olması null/empty-state hatası oluşturmuyor.
- Repo’da agent scratch, geçici research dump, workflow script’i veya gereksiz generated çöp bırakılmamış.
- Gerekli docs/config/metadata değişiklikleri kalıcı ve anlaşılır durumda.

## Final doğrulama

Repo’nun mevcut doğrulama araçlarını ve gerçek build/test düzenini kendin keşfet. Taze kanıtla:

- ilgili content/schema/roadmap tutarlılığını;
- type/build/test durumunu;
- gerekiyorsa gerçek render ve iki seri arasındaki navigasyon/izolasyonu;
- final `git diff` / `git status` kapsamını

kontrol et.

Bir hata bulursan kök nedene yönelik en küçük güvenli düzeltmeyi yap ve yalnızca etkilenen kısmı yeniden doğrula. Yeni genel audit/reviewer loop’u başlatma.

Taze doğrulama olmadan “tamamlandı” deme. Fakat gerekli kanıtlar temiz olduğunda da “bir tur daha bakalım” diyerek görevi uzatma.

---

# IX. Final teslim biçimi

Görevin sonunda uzun çalışma günlüğü verme.

Kısa ve karar odaklı olarak şunları bildir:

1. AI serisinin yeni tezi, doğal kapsamı ve önemli roadmap değişiklikleri;
2. eski 100/200 bağımsız seri fikirlerinden mevcut AI serisine hangi ana eksenlerin entegre edildiği;
3. AI serisinin yeni doğal uzunluğu veya kapsam aralığı ve bunun gerekçesi;
4. BOUN serisinin adı/tezi, çekirdek kapsamı, doğal uzunluğu veya kapsam aralığı;
5. BOUN için kullanılan güncel resmi akademik dayanakların özeti;
6. iki serinin birbirinden nasıl ayrıldığı ve nerede tamamlayıcı olduğu;
7. yaşayan sözleşme/roadmap/handoff modelinin nasıl çalışacağı;
8. platformda yapılan gerekli değişiklikler ve regresyon doğrulaması;
9. sonraki AI ve BOUN yazım görevlerinin hangi kalıcı state’ten başlayacağı;
10. yalnızca gerçekten kalan dış engel varsa o engel.

Bu sonuçları üretmeden ve iki seri de sonraki yazım görevine hazır hale gelmeden görevi bitmiş sayma.
