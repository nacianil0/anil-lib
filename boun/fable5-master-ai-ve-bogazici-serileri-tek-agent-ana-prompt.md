# Fable 5 Master Prompt — AI ve Boğaziçi CmpE Serilerini Tek Ana Oturumda Kur

> **Kanonik rol:** Bu dosya, kurulum görevinin kapsamı, iki serinin amaçları, değişmez sınırlar ve kabul ölçütleri için tek source of truth’tur. Yürütme bütçesi, `N+1` semantiği, helper politikası ve kalıcı trigger sözleşmesi yalnızca `fable5-master-ek-goal-tetikleyici-5plus1-tek-helper.md` dosyasında tanımlanır.

## 0. Yetki ve source-of-truth hiyerarşisi

Bu üç prompt artifact’ını şu sırayla yorumla:

1. Platform/system kuralları ve kullanıcının aynı oturumdaki en güncel açık talimatı.
2. Mevcut ve yayımlanmış durum hakkında repo’dan gözlenen gerçekler: Git state’i, makale dosyaları, katalog/frontmatter, testler ve çalışan tüketiciler.
3. **Bu master prompt:** kurulum görevinin amacı, kapsamı, değişmezleri ve tamamlanma ölçütleri.
4. **Ek `/goal` dosyası:** yalnızca yürütme modeli, `BATCH=N+1` çözümü, yaşayan state hiyerarşisi ve trigger sözleşmesi.
5. **Kısa chat eki:** yalnızca bu iki kanonik dosyayı yükleyen başlatıcıdır; bağımsız kural koyamaz.

Eski promptlar ve görevin başlangıcındaki `SOZLESME` / `HANDOFF` / roadmap kayıtları mevcut durumu anlamak için girdidir. Bu master prompt, eski “tam 100 makale” ve “değişmez 5+1” hükümlerini değiştirmek için açık kullanıcı yetkisidir. Buna karşılık yayımlanmış içerik ve kullanıcı state’i hakkında repo gerçeği, prompt içindeki tarihsel bir özetten üstündür.

Dosyalar arasında çelişki görürsen önce bu hiyerarşiyle çöz ve artifact’ları birbiriyle tutarlı hale getir. Yalnızca güvenli biçimde çıkarılamayan gerçek bir ürün kararı veya zorunlu breaking migration kullanıcı kararı gerektirir.

---

## /goal

Bu görevi **mevcut Fable ana oturumunda, kasıtlı olarak ikinci bir chat’e veya sonraki faza bırakmadan** tamamla. İki sonuç aynı kurulum görevinin ayrılmaz parçalarıdır:

1. `C:\dev\anil-lib` içindeki **“Sıfırdan Yüze: Yapay Zekâ”** serisinin yayımlanmış ilk 10 makalesini ve çalışan kullanıcı state’ini koruyarak, yayımlanmamış geleceğini akademik + teorik + araştırma + mühendislik eksenlerinde yeniden tasarla.
2. Aynı platform için, AI serisinden bağımsız bir **Boğaziçi Üniversitesi Computer Engineering M.Sc. scientific interview hazırlık serisi** araştır, tasarla ve sonraki üretim oturumlarına güvenli biçimde hazırla.

Bu görevde **hiçbir makale gövdesi yazma**. Çıktı; iki serinin amaç, kapsam, prerequisite, pedagojik/editoryal sözleşme, roadmap, yaşayan handoff, kısa trigger ve gerektiği kadar platform state’inin tamamlanmasıdır.

“Kapsam büyük” gerekçesiyle hedefi küçültme; bunun yerine tekrarları kaldır, araştırmayı karar taşıyan kanıtla sınırla, değişiklik yüzeyine uygun doğrulama yap ve aşağıdaki teslim defterini tek oturumda kapat. Platformun oturumu zorla sonlandırması veya erişilemeyen zorunlu bir dış sistem gibi promptla kontrol edilemeyen olaylar garanti edilemez; bunlar yoksa işi bilinçli biçimde bölme.

---

## 1. Önce gerçek state’i ve değişiklik sınırını doğrula

Başlangıçta Git durumunu kaydet ve kullanıcıya ait mevcut değişiklikleri koru. Ardından en az şu state zincirini incele:

- `docs/seri/SOZLESME.md`
- `docs/seri/HANDOFF.md`
- `docs/seri/YOL-HARITASI.md`
- `content/series/catalog.json` ve `content/series/roadmap.json`
- yayımlanmış AI makaleleri ile bunların frontmatter/id/slug/order/hash bilgileri
- seri route’ları, reader ve dashboard tüketicileri
- progress, saved-place/bookmark, highlight ve sync kimlik doğrulaması
- shared component/schema tüketicileri
- ilgili doğrulama araçları ve testler

Audit başlangıç noktası olarak 2026-08-28 repo state’i 1–10’u yayımlanmış, 11 ve sonrasını planlanmış gösteriyor; bunu çalıştırma anında yeniden doğrula. State daha sonra değişmişse repo kazanır.

Değişiklikten önce yayımlanmış makalelerin en az şu kimlik snapshot’ını al: article id, slug, URL/route, reading order, path, classification/historical batch ve content hash. Finalde aynı snapshot ile karşılaştır.

Şu sınırlar bağlayıcıdır:

- Yayımlanmış AI makalelerinin gövdesini, id/slug/order/path bilgisini veya historical batch metadata’sını değiştirme.
- Kullanıcı progress/bookmark/highlight geçmişini geçersiz kılma.
- Yalnızca yeni roadmap’e uysun diye 1–10’u yeniden yazma veya onlar için genel fact-check turu başlatma.
- Eski “100 yazılık akademi” ve “200 yazılık research & engineering” fikirlerini ayrı yeni AI serileri olarak kurma; yalnızca değerli konu sinyalleri olarak değerlendir.
- Repo’da önceden var olan, bu değişiklikle ilgisiz bir hata varsa bunu sahiplenip kapsam dışı refactor’a dönüşme. Baseline ile ayır ve finalde dürüstçe belirt.
- Repo talimatlarını ve mevcut veri sözleşmelerini izle; çözümü dosya adlarından tahmin etme.

---

## 2. İş Paketi A — Mevcut AI serisinin geleceği

### A1. Değişmez tez

İkinci bir AI serisi oluşturma. “Sıfırdan Yüze: Yapay Zekâ”, sıfırdan başlayan okuyucuyu zamanla:

- akademik AI okuryazarlığına,
- araştırma sorusu kurup kanıt değerlendirebilme pratiğine,
- ciddi model ve AI-systems mühendisliği düşünebilme düzeyine

taşıyan tek öğrenme yolu olarak gelişsin.

“Sıfırdan Yüze” bir marka adıdır, makale sayısı taahhüdü değildir. Yayımlanmış kimliği ve linkleri etkileyen gereksiz bir yeniden adlandırma yapma.

### A2. Yayımlanmış temel ile bağ

1–10’u yalnızca şu amaçlarla oku:

- gerçekten kurulmuş kavram ve terimleri çıkarmak;
- açık veya örtük ileri konu vaatlerini kaydetmek;
- prerequisite mirasını belirlemek;
- ileride formal düzeyde yeniden kurulması gereken sezgileri saptamak.

Yeni matematiksel/teorik konuları geçmişe zorla ekleme. “Önce sezgisel gördük, şimdi formal kuruyoruz” köprüleriyle geleceğe yerleştir. Bu bilinçli formalizasyon tekrar sayılmaz; hangi eski kavramın nerede derinleşeceği roadmap’te izlenebilir olsun.

11’den sonrası yayımlanmamış plandır. Akademik ve pedagojik gerekçeyle korunabilir, çıkarılabilir, birleştirilebilir, bölünebilir, taşınabilir veya değiştirilebilir. Eski sırayı korumak değil, daha güçlü prerequisite ve öğrenme zinciri kurmak başarıdır.

### A3. Doğal akademik kapsam

Önce hedef yetkinlikleri, bilgi grafını, prerequisite ilişkilerini, formalizasyon/recall noktalarını ve fazların doğal sınırlarını kur; makale sayısı bunların sonucu olsun. 70, 100, 130 veya başka bir sayı baştan hedef değildir.

Aşağıdaki alanlar **zorunlu kota veya makale-başı checklist değil**, araştırılıp öğrenme getirisine göre seçilecek aday kapsam kümeleridir:

- AI için gerekli ölçüde linear algebra, calculus/optimization, probability/statistics, information theory ve diğer matematiksel araçlar;
- klasik ve modern ML/deep learning; learning, optimization, generalization, representation ve scaling;
- model mimarileri, Transformer ailesi ve anlamlı alternatifler; data, pre-training, post-training, preference learning, inference ve evaluation;
- paper okuma, araştırma sorusu, hipotez, baseline, ablation, experiment design, reproducibility, negative results, ölçüm ve benchmark disiplini;
- model veya kritik model bileşenlerini temelden kurarak anlama;
- reinforcement learning, sequential decision making, control ve agentic AI;
- retrieval, tools, memory, planning ve long-horizon systems;
- mechanistic interpretability, feature/representation, circuit, probing ve causal intervention çalışmaları;
- multimodality ve önemli generative model aileleri;
- GPU/accelerator zihinsel modeli, compute-memory-communication maliyetleri, distributed training, inference/serving, optimizasyon, reliability ve production trade-off’ları;
- robustness, safety, alignment, evaluation science, responsible deployment ve gerçekten gerekli governance/open-research soruları.

Her alanı şu filtreyle değerlendir: ciddi bir AI araştırmacısı veya mühendisi olma yolunda yetkinlik/prerequisite kuruyor mu; mevcut 1–10 ile anlamlı bağ kuruyor mu; yoksa roadmap’i yalnızca büyütüyor mu?

Güncel ileri seviye dersler, canonical textbook/paper’lar, güçlü konferans çalışmaları ve aktif araştırma programları karşılaştırılabilir; hiçbir müfredatı mekanik biçimde kopyalama.

### A4. AI yaşayan state’i

Mevcut güçlü editoryal/pedagojik ilkeleri koru: birincil ve güvenilir kaynak, hakem durumunun dürüstlüğü, ciddi ama okunabilir Türkçe, sezgi → mekanizma → teknik/formal ayrıntı → akademik bağlam, küçük gerçek worked example, progressive disclosure, prerequisite zinciri, spaced recall/retrieval practice, cognitive-load yönetimi, scaffolding/fading, terim/sembol tutarlılığı, öğretici görselleştirme ve iddia/URL/sayısal veri doğrulaması.

Bunları yaşayan state’te şu sorumluluklarla normalize et:

- `SOZLESME.md`: uzun ömürlü normatif kurallar; ek `/goal` dosyasındaki kanonik `5+1 default / explicit N+1 override` semantiğini içerir.
- `YOL-HARITASI.md` ve UI roadmap state’i: planlanan bilgi grafı, fazlar, prerequisite, recall ve yayımlanma durumları.
- `HANDOFF.md`: yalnızca güncel operasyonel state, açık borçlar ve bir sonraki güvenli başlangıç; kalıcı kuralları kopyalamak yerine sözleşme/roadmap’e referans verir.
- Katalog/frontmatter/makale dosyaları: yayımlanmış tarihsel gerçek.

Eski aktif “100’e kadar” ve “her handoff’a aynı 5+1 metnini kopyala” hükümlerini kaldır veya tarihsel not olarak açıkça etkisizleştir. Tarihsel üretim kayıtlarını silme; normatif talimatla geçmiş günlüğünü ayır.

---

## 3. İş Paketi B — Boğaziçi CmpE scientific interview serisi

### B1. Ayrı amaç

BOUN serisi AI serisinin fazı veya prerequisite’i değildir. Amacı, Boğaziçi CmpE M.Sc. scientific interview bağlamında unutulmuş CS/CmpE temellerini yeniden kurarak adayın:

- kavramı açık ve teknik biçimde anlatabilmesini;
- küçük problem çözebilmesini;
- gerektiğinde formal tanım veya kısa ispat kurabilmesini;
- correctness, complexity, memory, concurrency ve sistem trade-off’larını savunabilmesini;
- takip sorularına dayanabilmesini

sağlamaktır.

Bu, “kesin çıkacak sorular” ezberi veya bütün lisans müfredatını tekrar etme projesi değildir. Oral reasoning ve whiteboard/problem-solving, serinin pedagojik tasarım hedefidir; üniversitenin ilan ettiği kesin soru formatı gibi sunulamaz.

### B2. Resmî gerçekle başla, syllabus uydurma

Kapsam kararından hemen önce güncel resmî kaynakları yeniden doğrula. Başlangıç anchor’ları:

- M.Sc. programı ve scientific interview: `https://cmpe.bogazici.edu.tr/graduate/ms-program/`
- güncel lisans müfredatı: `https://cmpe.bogazici.edu.tr/undergraduate/curriculum/`
- güncel ders kataloğu: `https://cmpe.bogazici.edu.tr/courses/`
- CMPE300 örneği: `https://cmpe.bogazici.edu.tr/courses/cmpe300/`

Resmî sayfadaki interview süreci, konuşulan genel alanlar ve Scientific Preparation dersleri güçlü sinyallerdir; **hiçbiri tek başına kesin interview syllabus değildir**. Güncel curriculum, course catalog, prerequisite ve erişilebilen resmî syllabus/material ile birlikte değerlendir. Legacy sayfalar ve öğrenci deneyimleri yalnızca düşük ağırlıklı yardımcı kanıttır; “bu soru kesin gelir” sonucu üretmez.

Kaynak önceliği:

1. güncel resmî Boğaziçi CmpE graduate/interview bilgisi;
2. güncel resmî curriculum, course catalog, prerequisite ve ders materyali;
3. standart textbook, güvenilir üniversite dersi ve akademik kaynak;
4. açıkça “informal/legacy sinyal” diye etiketlenmiş geçmiş deneyim.

Erişim tarihi ve karar taşıyan URL’leri kalıcı araştırma notunda tut. Değişebilecek ayrıntıları prompttan yaşayan state’e kopyalanmış ebedî gerçekler haline getirme.

### B3. Doğal kapsam ve sınır

Şu kümeleri final liste değil aday bilgi grafı olarak değerlendir:

- çekirdek sinyaller: discrete computational structures, data structures/algorithms ve operating systems;
- yüksek getirili ikinci halka: algorithm analysis, asymptotic/recurrence/correctness/lower-bound reasoning, divide-and-conquer, greedy, dynamic programming ve graph algorithms;
- interview-readiness için gerektiği ölçüde logic/proof, sets/functions/relations, induction/recursion, counting/combinatorics, graphs/trees;
- operating-systems temelleri: process/thread, scheduling, concurrency/synchronization, deadlock, memory/virtual memory, file/I/O ve protection;
- yalnızca gerçek prerequisite veya yüksek hazırlık getirisi kanıtlanırsa probability/statistics, computer organization/architecture, systems programming, databases, programming languages, formal languages/automata veya başka supporting fundamentals.

Önce interview-readiness tanımını ve prerequisite grafını kur; makale sayısı doğal olarak ortaya çıksın. 30/50/100 kotası koyma.

Gelecekteki makaleler içerik uygunsa worked example, kısa proof, küçük algoritmik problem, pseudocode/kod, diyagram, comparison ve oral checkpoint kullanabilsin; her makaleye aynı mekanik şablonu yapıştırma.

### B4. AI–BOUN ayrımı

- BOUN, graph/probability/algorithms/systems konularını temel CS amacıyla ve kendi içinde yeterli biçimde öğretir.
- AI serisi model, training, interpretability, agents, AI research ve AI systems derinliğinin sahibidir.
- BOUN, AI serisini prerequisite yapmaz. İki tarafta da bağımsız öğrenme tamamlandıktan sonra yararlı bir çapraz referans eklenebilir.
- Ortak editoryal kalite paylaşılabilir; seri amacı, roadmap, namespace, katalog/state ve handoff birbirine karıştırılmaz.

BOUN için ayrı `SOZLESME + roadmap + HANDOFF` zinciri ve kısa trigger oluştur. Kalıcı path’leri repo mimarisine göre seç, finalde açıkça bildir.

---

## 4. Platform ve geriye uyumluluk sınırları

İki seriyi yalnızca Markdown planı olarak bırakma; sonraki üretim oturumlarının repo içinde güvenle başlayacağı kadar kalıcı state kur. Ancak gelecekte lazım olabilir diye genel bir multi-series framework tasarlama.

Çözüm:

- additive ve backwards-compatible;
- seri kimlikleri ve kullanıcı state’i açısından izole;
- mevcut veriyle uyumlu;
- gerekirse üçüncü seriye alan bırakacak kadar açık, fakat spekülatif soyutlama üretmeyecek kadar sade

olsun.

Ortak component/schema/reader/sync koduna dokunmadan önce bütün tüketicilerini bul. Özellikle şunları koru:

- mevcut `/seri` ve `/seri/[slug]` deneyimi;
- yayımlanmış AI 1–10;
- article-id temelli progress, saved-place/bookmark ve highlight state’i;
- katalog/frontmatter/hash davranışı;
- ana kütüphanenin `/read` tarafı;
- dashboard, navigation ve sync valid-id tüketicileri.

BOUN henüz makalesiz veya yalnızca plan state’ine sahipken UI/sync tarafında null, empty veya partial-data hatası üretmemeli. Minimal keşif/seri seçimi entegrasyonu gerçekten gerekiyorsa ekle; makale varmış gibi sahte katalog kaydı oluşturma.

Zorunlu breaking change görürsen sessizce uygulama. Etkiyi ve migration seçeneklerini kanıtla; gerçek kullanıcı kararı olmadan güvenli seçenek yoksa bu, ara karar gerektiren dış engeldir.

---

## 5. Araştırma, akademik ve güvenlik standardı

Araştırma karar kalitesini yükseltmeli, görevin kendisine dönüşmemelidir.

- Karar taşıyan iddialarda resmî/birincil kaynak, canonical eser veya güçlü akademik çalışma kullan.
- Güncel ürün, model, müfredat ve başvuru davranışını çalıştırma anında doğrula; doğrulanmayanı garanti gibi yazma.
- Kaynaklar çelişirse otorite, tarih ve bağlam farkını kaydet; belirsizliği uydurarak kapatma.
- Her aday başlık için bibliyografya toplamaya çalışma; seçme/eleme veya prerequisite kararını gerçekten etkileyen kaynakları kaydet.
- Geçici research dump, agent scratch veya workflow script’ini repoda bırakma.

AI safety, robustness, red teaming, OS protection ve systems security gibi meşru akademik alanları savunmacı/teorik/eğitsel amaçları içinde değerlendirebilirsin. Platform güvenlik politikasını normal biçimde uygula; classifier, model routing veya safeguard bypass etmeye çalışma. Gereksiz operasyonel zarar ayrıntısı doğarsa yalnızca o alt kapsamı güvenli seviyede sınırla; izin verilen yüksek seviyeli akademik roadmap tasarımını terk etme.

Model adı, serving route’u, helper modeli veya fallback davranışı promptla garanti edilemez. Bu konudaki kanonik çalışma kuralı ek `/goal` dosyasındadır.

---

## 6. Yürütme politikası

Tek ana oturum sahipliği, opsiyonel tek bounded helper, skill kullanımı, token/review disiplini, `N+1` çözümü ve iki trigger’ın sözleşmesi için yalnızca:

`fable5-master-ek-goal-tetikleyici-5plus1-tek-helper.md`

dosyasını uygula. Bu master içindeki kapsamı addendum gerekçesiyle daraltma. Aynı araştırmayı veya incelemeyi farklı agent/model turlarında tekrarlama.

---

## 7. Tamamlanma ve doğrulama defteri

Görev ancak aşağıdaki maddeler taze kanıtla kapatıldığında tamamdır.

### AI

- Yayımlanmış baseline snapshot final snapshot ile aynıdır; 1–10’un gövde/id/slug/order/path/hash/historical batch bilgileri değişmemiştir.
- 1–10’un prerequisite mirası, formalizasyon noktaları ve açık ileri borçları yeni roadmap’te izlenebilir.
- 11’den sonrası güncel akademik + araştırma + mühendislik hedefine göre gerçekten yeniden değerlendirilmiştir.
- Eski akademi/research-engineering fikirlerindeki değerli eksenler ikinci AI serisi açılmadan entegre edilmiş veya gerekçeli biçimde elenmiştir.
- Doğal faz/prerequisite yapısı ve doğal makale sayısı oluşmuştur; 100/200 sayısı hedef değildir.
- AI `SOZLESME / roadmap / HANDOFF` zinciri yeni source-of-truth sorumlulukları ve ek `/goal` dosyasındaki ritim semantiğiyle tutarlıdır.

### BOUN

- Güncel resmî Boğaziçi kaynakları erişim tarihiyle doğrulanmıştır.
- Resmî gerçek, tasarım çıkarımı ve informal sinyal birbirinden ayrılmıştır; Scientific Preparation “kesin interview syllabus” değildir.
- Interview-readiness, doğal çekirdek/supporting kapsam, prerequisite grafı ve oral/problem-solving pedagojisi tanımlıdır.
- Makale sayısı akademik hazırlık getirisinden çıkmıştır.
- BOUN’un ayrı yaşayan `SOZLESME / roadmap / HANDOFF` zinciri vardır ve ilk üretim oturumu yalnızca bu state’i okuyarak başlayabilir.
- BOUN, AI serisini prerequisite yapmaz ve iki seri arasında kopya roadmap oluşmaz.

### Trigger ve yaşayan state

- Her seri için bir kısa trigger vardır; kesin path’leri finalde verilir.
- Her trigger yalnızca ilgili HANDOFF giriş noktasını, tek bir `BATCH=5+1` direktifini ve kısa “yükle → üret/doğrula → +1 → dur” komutunu taşır.
- Trigger’lar konu listesi, kaynak listesi, geçmiş batch özeti, uzun editoryal kurallar, model routing veya helper ayrıntısı kopyalamaz.
- Default ve override davranışı ek `/goal` dosyasındaki karar tablosuyla statik olarak doğrulanmıştır.
- Aktif living-state talimatlarında sabit 100, değişmez 5’li batch, her handoff’a kural kopyalama, paralel reviewer/Opus swarm veya repo-dışı geçici state zorunluluğu kalmamıştır. Tarihsel kayıtlar kalırsa açıkça non-normative history olarak işaretlidir.

### Platform ve final kanıt

Her durumda:

- final `git diff --check`, hedefli `git diff` ve `git status` incelemesi;
- Markdown path/link ve source-of-truth çapraz referans kontrolü;
- yayımlanmış kimlik snapshot karşılaştırması;
- ana kütüphane + bütün seri kataloglarında global article-id benzersizliği;
- yayımlanmış roadmap kayıtlarının katalogla slug yanında title/order/status eşleşmesi;
- ilgili catalog/frontmatter/roadmap/state doğrulayıcıları

çalıştırılır.

Yalnızca doküman/data değiştiyse ilgili statik/content doğrulamalarını çalıştır. Schema, shared component, route, sync veya UI kodu değiştiyse etkilenen testlere ek olarak typecheck/build ve ilgili gerçek render/navigation/empty-state kontrollerini çalıştır. Bu durumda ayrıca library/AI/BOUN link çözümünü, bütün yayımlanmış serilerin sync valid-id kümesine alınmasını, bilinmeyen id’nin reddini, mevcut on AI static route’un korunmasını ve sıfır makaleli BOUN planning state’inde sahte article oluşmamasını kanıtla. Değişiklik yüzeyinin kanıtlamadığı geniş bir “her şeyi yeniden audit et” döngüsü başlatma.

Bir doğrulama hatası kendi değişikliğinden kaynaklanıyorsa kök nedene yönelik en küçük düzeltmeyi yap ve yalnızca etkilenen kapıları yeniden çalıştır. Baseline’dan gelen ilgisiz hata varsa kanıtıyla ayır. Temiz bir final denetiminden sonra yeni reviewer turu açma.

---

## 8. Final teslim

Uzun düşünce günlüğü verme. Kısa ve kanıtlı biçimde bildir:

1. AI serisinin yeni tezi, doğal kapsamı/uzunluğu ve önemli roadmap kararları;
2. eski 100/200 fikirlerinden entegre edilen veya gerekçeli elenen ana eksenler;
3. BOUN serisinin tezi, doğal kapsamı/uzunluğu ve resmî akademik dayanakları;
4. iki serinin sınırı ve yaşayan `SOZLESME → roadmap → HANDOFF → trigger` modeli;
5. değişen dosyalar ve iki trigger’ın kesin path’leri;
6. yayımlanmış AI 1–10 ile kullanıcı/platform state’inin korunduğunu gösteren snapshot/diff kanıtı;
7. çalıştırılan doğrulamalar, sonuçları ve yalnızca gerçekten kalan dış engel.

İki seri sonraki üretim görevine hazır, prompt setiyle living state çelişkisiz ve taze doğrulama tamamlanmışsa görevi kapat; “bir tur daha” diyerek uzatma.
