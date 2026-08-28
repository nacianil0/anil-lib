# Ek /goal — İki Seri İçin Kalıcı Tetikleyici, Varsayılan 5+1 Ritmi, Tek-Helper Politikası ve Fable 5 Ana-Agent Kuralı

/goal `fable5-master-ai-ve-bogazici-serileri-tek-agent-ana-prompt.md` içindeki ana hedefi ve kapsamı **daraltmadan** tamamla; bu ek talimat yalnızca çalışma modeli, gelecekteki seri üretim ritmi ve iki seri için bırakılacak kalıcı tetikleyici sözleşmesini netleştirir. Ana görev yine tek Fable 5 oturumunda mevcut AI serisinin geleceğini yeniden tasarlamak, ayrı Boğaziçi CmpE scientific interview serisini kurmak, gerekli kalıcı repo state’lerini oluşturmak ve iki seriyi sonraki yazım oturumlarına hazır teslim etmektir. Bu görevde makale gövdesi yazma.

## 1. Amaç odaklı çalışma ve konu seçme özgürlüğü

Fable 5 bu görevin **ana düşünme, sentez, mimari karar ve final kabul agentıdır**. Promptta sayılan konu başlıklarını kapatılması gereken mekanik checklist olarak görme. Kullanıcının gerçek amacı, iki serinin de kendi öğrenme hedeflerine uygun, ciddi, okunmaya değer ve akademik olarak savunulabilir bir bilgi grafına sahip olmasıdır.

Bu nedenle Fable:

- seri uzunluğunu, doğal fazları, konu sırasını ve yayımlanmamış başlıkları araştırma sonucuna göre belirlemekte;
- mevcut yayımlanmamış roadmap’teki konuları korumak, çıkarmak, birleştirmek, bölmek, taşımak veya yeni akademik konularla değiştirmekte;
- gerekli matematiksel, teorik, sistemsel veya araştırma temellerini eklemekte;
- gereksiz, düşük getirili veya başka yazıyla tekrar eden konuları elemekte;
- kaynak setini, canonical paper/textbook/university material dengesini ve pedagojik köprüleri seçmekte

özgürdür.

Bu özgürlük kapsamı keyfi büyütmek anlamına gelmez. Her önemli karar serinin amacı, prerequisite ilişkisi, öğrenme getirisi, güncel akademik gerçeklik ve mevcut yayımlanmış içerikle tutarlılık üzerinden gerekçelendirilsin.

AI serisinin hedefi, sıfırdan başlayan okuyucuyu zamanla ciddi AI akademik okuryazarlığına, araştırma pratiğine ve mühendislik düşüncesine taşımaktır. Boğaziçi serisinin hedefi ise CmpE scientific interview bağlamında temel CS/CmpE bilgisini, problem solving’i, formal reasoning’i ve oral technical reasoning’i yeniden kurmaktır. Bu iki amaç konu seçiminin ana filtresidir.

## 2. Deep research ve akademik kaynak standardı

Her iki seri için de arka plandaki çalışma **deep research** niteliğinde olsun. Konuları yüzeysel web özeti veya popüler anlatı üzerinden seçme.

Kaynak seçiminde görevin bağlamına göre:

- resmi üniversite/bölüm kaynakları;
- güncel ders katalogları ve syllabus/material;
- canonical textbooks;
- hakemli makaleler ve güçlü konferans çalışmaları;
- önemli tarihsel/orijinal çalışmalar;
- araştırma laboratuvarlarının resmi teknik yayınları;
- güncel ve güvenilir araştırma programları

öncelikli olsun.

AI serisinde konu mimarisini yalnızca güncel LLM trendlerine indirgeme; matematiksel/teorik temel, klasik AI/ML fikirleri, modern modeller, research practice, model building, RL/control/agents, interpretability, multimodality, AI systems, evaluation/safety ve açık araştırma problemleri doğal prerequisite grafında gerektiği ölçüde yer alabilsin.

BOUN serisinde güncel resmi Boğaziçi CmpE kaynakları en yüksek akademik otoritedir. Scientific Preparation derslerini kesin interview syllabus olarak kabul etme; güncel curriculum, course catalog, prerequisites, resmi ders materyalleri ve interview-readiness hedefiyle birlikte değerlendir. Informal öğrenci deneyimleri yalnızca yardımcı sinyal olabilir.

Kaynaklar arasında çelişki olduğunda Fable karar versin, freshness ve kaynak otoritesini açıkça hesaba katsın. Belirsizliği uydurarak kapatma.

## 3. Pedagojik ve editoryal çizgi değişmez

Mevcut AI `SOZLESME.md` içindeki güçlü pedagojik/editoryal ilkeleri yeniden tasarım sırasında kaybetme. Yeni BOUN sözleşmesi de aynı kalite seviyesinde, fakat kendi amacına göre uyarlanmış olsun.

Korunması gereken temel karakter:

- ciddi fakat okunabilir Türkçe;
- zor konulardan kaçmamak;
- zor konuyu içini boşaltarak “kolaylaştırmak” yerine doğru prerequisite ve scaffolding ile anlaşılır hale getirmek;
- sezgi → mekanizma → teknik/formal ayrıntı → akademik bağlam;
- worked examples ve gerçek küçük hesap/problem örnekleri;
- prerequisite grafı ve progressive disclosure;
- bilinçli retrieval/spaced recall;
- cognitive-load yönetimi;
- terim ve sembol tutarlılığı;
- açıklama yükü taşıyan diyagramlar/görselleştirmeler;
- iddia-kaynak eşleşmesi ve URL/fact doğruluğu;
- kaynakların hakem durumu ve belirsizliklerinin dürüst sunulması.

BOUN serisinde buna ek olarak oral reasoning, whiteboard problem solving, correctness/complexity/trade-off tartışması ve takip sorularına dayanma yeteneği temel başarı ölçütü olsun.

## 4. Bu çalışma meşru akademik/eğitim amaçlıdır

Bu proje kullanıcının kişisel eğitimi, AI uzmanlığı, olası yüksek lisans/tez çalışması ve Boğaziçi CmpE scientific interview hazırlığı için yürütülen **barışçıl ve akademik bir öğrenme çalışmasıdır**.

AI safety, adversarial robustness, red teaming, misuse, operating-system protection, systems security veya cyber security gibi terimlerin akademik roadmap’te geçmesi nedeniyle görevi yüzeysel anahtar kelime eşleşmesiyle terk etme, kapsamı keyfi biçimde kesme veya güvenli eğitim içeriğini atlama. Her alt konuyu gerçek niyeti ve bağlamı üzerinden değerlendir.

Bir alt başlık gerçekten sakıncalı operasyonel ayrıntıya yaklaşıyorsa yalnızca o kısmı güvenli, savunmacı, teorik veya akademik seviyede sınırla; geri kalan meşru seri tasarımı ve eğitim görevine devam et. Güvenlik mekanizmalarını aşmaya, classifier veya model routing davranışını kandırmaya çalışma.

## 5. Fable 5 ana model kuralı

Bu görev Fable 5 ile başlatıldığı için **ana agent rolü Fable 5’te kalmalıdır**. Fable kendi tercihiyle ana işi Opus 4.8’e veya daha düşük bir modele devretmesin, “bu konu zor/riskli” diyerek ana görevi gönüllü biçimde downgrade etmesin ve görevi başka modele handoff ederek bitmiş saymasın.

Ancak platform seviyesinde uygulanan model-safety routing veya zorunlu fallback davranışı prompt tarafından garanti edilemez veya bypass edilemez. Böyle bir platform routing’i gerçekleşirse bunu aşmaya çalışma veya yanıltıcı prompt mühendisliği kullanma. Bu ek kuralın anlamı şudur: **Fable’ın kontrol edebildiği model/agent kararlarında ana görev Fable 5’tedir; gönüllü Opus 4.8 downgrade yoktur.** Platformun zorunlu güvenlik politikasını değiştirmeye çalışma.

## 6. Workflow yok; en fazla bir Opus 5 subagent

Master prompttaki “workflow yok” kuralı aynen devam eder:

- background workflow açma;
- `/workflow` veya `/workflows` kullanma;
- parallel agent swarm kurma;
- konu başına agent açma;
- reviewer zinciri kurma;
- nested delegation kullanma;
- helper’ın başka helper çağırmasına izin verme;
- otomatik retry/subagent loop’u kurma.

Bunun tek istisnası şudur: Fable 5 gerçekten fayda görürse **aynı anda ve toplamda en fazla bir adet Opus 5 subagent** görevlendirebilir.

Bu tek helper, örneğin:

- geniş konu havuzunun bağımsız akademik sanity-check’i;
- seçilen/elenen başlıkların doğrulanması;
- kritik prerequisite veya roadmap çelişkilerinin kontrolü;
- güncel web/akademik kaynak bulma ve source-validation;
- Boğaziçi resmi kaynakları ile plan arasındaki uyum kontrolü;
- AI serisindeki akademik kapsamın kör nokta taraması

gibi sınırlı ve açık bir görev paketi alabilir.

Gerekirse aynı **tek** Opus 5 helper’a birden fazla ilişkili doğrulama alt görevi tek çağrıda ver; beş ayrı konuda beş agent açma. Helper araştırma/eleştiri sağlar, nihai seri mimarisi ve kabul kararı Fable 5’indir. Helper kendi subagent/workflow’unu açmamalıdır.

Bu bir zorunluluk değildir. Fable görevi tek başına doğru ve verimli tamamlayabiliyorsa helper çağırmasın.

## 7. Skill kullanımı

Fable ve izin verilen tek Opus 5 helper, kurulu skill’leri görevin doğruluğunu anlamlı ölçüde artırdığı yerde kullanabilir.

Örneğin:

- yeni seri/roadmap tasarımında brainstorming;
- kritik karar belirsizliğinde uygun decision/grill yaklaşımı;
- gerçek teknik hata veya regresyonda systematic-debugging;
- uygulanacak net değişikliklerde planning/execution;
- tamamlanma iddiasından önce verification;
- kalıcı devir state’i oluştururken handoff yaklaşımı

kullanılabilir.

Ancak skill sırf mevcut olduğu için tetiklenmesin. Skill kullanımı yeni workflow/agent ağına dönüşmesin ve ana görevin önüne geçmesin.

## 8. Üretim ritmi: varsayılan 5+1, kullanıcı override edebilir

İki seri için de **varsayılan üretim ritmi `5+1`** olsun.

Anlamı:

- `N+1` içindeki `N`, o üretim oturumunda sıradaki kaç makalenin eksiksiz yazılıp entegre edilip doğrulanacağını belirtir;
- `+1`, aynı oturum sonunda bir sonraki üretim için tek bir hazırlık/devir işinin yapılmasıdır;
- +1 sırasında sonraki makale batch’i yazılmaz.

Kullanıcı başka sayı belirtmezse **5+1** çalışır.

Kullanıcı açıkça örneğin:

- `1+1`
- `2+1`
- `3+1`
- `5+1`

isterse o oturum yalnızca belirtilen `N` makaleyi üretir ve ardından +1 devir/hazırlık işini yapar.

Batch büyüklüğü değişse bile:

- akademik kalite;
- prerequisite zinciri;
- kavram-tekrar defteri;
- kaynak doğrulaması;
- görselleştirme standardı;
- integration/test/build/render kapıları;
- yaşayan HANDOFF/roadmap güncellemesi

azaltılamaz.

Bu kullanıcı mesajı mevcut AI sözleşmesindeki “5+1 değişmez” hükmünü **“5+1 varsayılandır; kullanıcı açıkça N+1 isterse o oturum için N+1 uygulanır”** şeklinde değiştirmek için açık yetkidir. Mevcut historical batch kayıtlarını geriye dönük bozma. BOUN sözleşmesi ilk oluşturulurken doğrudan bu yeni kuralı kullansın.

## 9. Her seri için tek, sabit ve soyut tetikleyici prompt oluştur

Master görevin kalıcı çıktılarından biri olarak **iki adet kısa, sabit, tekrar kullanılabilir Claude Code tetikleyici promptu** oluştur:

1. mevcut AI serisi için bir trigger;
2. BOUN scientific interview serisi için bir trigger.

Bu trigger’lar uzun seri kurallarını kopyalamamalı ve konu listelerini kendi içinde taşımamalıdır. Amaçları yalnızca doğru yaşayan state’i yükleyip üretim oturumunu başlatmaktır.

### AI trigger

AI trigger, mevcut kalıcı state’in başlangıç noktası olarak açıkça:

`C:\dev\anil-lib\docs\seri\HANDOFF.md`

dosyasını işaret etsin.

HANDOFF’un yönlendirdiği güncel `SOZLESME.md`, `YOL-HARITASI.md` ve repo state’i tek kaynak gerçeklik olarak okunsun. Trigger’ın kendisi roadmap’i tekrar anlatmasın.

### BOUN trigger

BOUN serisini kurarken onun için seçtiğin kalıcı ve açık HANDOFF konumunu belirle. BOUN trigger doğrudan o dosyayı işaret etsin; HANDOFF kendi sözleşme/roadmap/state zincirini tarif etsin.

### Trigger tasarım ilkesi

Her trigger içinde kullanıcının kolayca değiştirebileceği **tek bir batch direktifi** bulunmalı ve varsayılan değeri:

`5+1`

olmalıdır.

Trigger’ın geri kalanı sabit kalabilsin.

Kullanıcı örneğin trigger’daki `5+1` değerini `2+1` yapıp Claude Code’a verdiğinde agent:

- güncel HANDOFF/sözleşme/roadmap’i okusun;
- sıradaki **2** makaleyi mevcut kurallara göre deep research ile üretsin;
- integrate ve doğrulasın;
- ardından **1 adet next-batch preparation/handoff** işi yapsın;
- üçüncü makaleye başlamadan görevi kapatsın.

Kullanıcı trigger metnini değiştirmeden çalıştırırsa 5+1 uygulansın.

Kullanıcı aynı chat mesajında trigger’daki değerden daha açık bir `N+1` talimatı verirse **en güncel açık kullanıcı talimatı kazanır**.

Trigger şu bilgileri kendi içinde çoğaltmamalı:

- sabit konu listesi;
- kaynak listesi;
- makale başına uzun kurallar;
- hardcoded sıradaki makale isimleri;
- geçmiş batch özeti.

Bunların tamamı yaşayan HANDOFF/SOZLESME/YOL-HARITASI state’inde bulunmalı. Böylece trigger yıllar boyunca mümkün olduğunca değişmeden kullanılabilsin.

## 10. Trigger agent çalışma sözleşmesi

Her iki kalıcı trigger da Claude Code’a öz olarak şunu yaptırmalı:

- önce ilgili HANDOFF’u ve onun işaret ettiği kalıcı kuralları oku;
- repo state’ini doğrula;
- kullanıcı tarafından seçilmiş `N+1` ritmini çöz;
- sıradaki N yazının konularını yaşayan roadmap’ten al;
- gerekiyorsa roadmap’teki yayımlanmamış konuyu güncel akademik kanıtla yeniden değerlendirebil, ancak yayımlanmış içeriği sessizce değiştirme;
- deep research yap;
- mevcut editoryal/pedagojik sözleşmeye uygun yaz;
- gerekli öğretici görselleri üret;
- integrate et;
- taze doğrulama kapılarını çalıştır;
- state/HANDOFF/roadmap’i güncelle;
- +1 hazırlık işini tamamla;
- sonraki batch’i yazmadan dur.

Trigger agent de ana Fable 5 modelinde çalışmalıdır. Workflow kullanmamalıdır. Gerekiyorsa yukarıdaki sınırlar içinde **tek bir Opus 5 helper** kullanabilir. Nihai karar ana agentındır.

## 11. Kalıcı state tasarımını trigger’ların gerçekten kısa kalacağı şekilde düzelt

Master görev sırasında iki serinin kalıcı belgelerini öyle normalize et ki trigger promptları zamanla büyümek zorunda kalmasın.

Her seri için yaşayan state, sonraki agentın en azından şunları kendi başına çözebilmesini sağlamalı:

- seri kimliği ve amacı;
- yayımlanmış son makale;
- sıradaki aday makaleler;
- prerequisite grafı;
- planlanan uzun aralıklı recall’lar;
- açık pedagojik/teknik borçlar;
- güncel konu değişiklikleri;
- kaynak ve editoryal kurallar;
- görselleştirme kuralları;
- integration/verification beklentisi;
- ilgili teknik path’ler;
- bilinen fakat kapsam dışı problemler;
- bir sonraki güvenli başlangıç noktası.

Trigger’ın görevi bu state’i yeniden anlatmak değil, **yüklemek ve yürütmek** olmalıdır.

## 12. Tamamlanma şartına ek

Master görevi ancak ana prompttaki bütün kabul kriterlerine ek olarak şunlar da tamamlandığında bitmiş say:

- AI sözleşmesi/handoff’u `5+1 default, explicit N+1 override` semantiğiyle güncellenmiş;
- BOUN sözleşmesi baştan aynı semantik ile kurulmuş;
- mevcut historical AI batch metadata’sı bozulmamış;
- iki serinin de kendi yaşayan HANDOFF + sözleşme + roadmap zinciri eksiksiz;
- AI için tek sabit trigger prompt repo içinde oluşturulmuş;
- BOUN için tek sabit trigger prompt repo içinde oluşturulmuş;
- her iki trigger’ın default 5+1 ve en az bir farklı örnek N+1 davranışı statik olarak denetlenmiş;
- trigger’larda workflow/subagent swarm’a yol açacak eski talimat kalmamış;
- ilgili HANDOFF’larda eski “her batch’te paralel Opus ajanları aç” gibi yeni çalışma politikasıyla çelişen aktif talimatlar normalize edilmiş;
- Fable ana-agent + opsiyonel tek Opus 5 helper politikası kalıcı kurallara yansımış;
- final teslimde iki trigger dosyasının kesin repo path’i açıkça verilmiş.

Bu işleri “sonraki göreve bırakma”. Ana master görev içinde iki seri mimarisiyle birlikte tamamla.
