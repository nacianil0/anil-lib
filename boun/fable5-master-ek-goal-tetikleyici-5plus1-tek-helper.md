# Ek /goal — Kanonik Yürütme, `N+1`, Living-State ve Trigger Sözleşmesi

> **Kanonik rol:** Bu dosya yalnızca (1) ana oturum sahipliği, (2) helper/skill bütçesi, (3) araştırma ve review disiplini, (4) `BATCH=N+1` çözümü ve (5) living-state/trigger çalışma sözleşmesi için source of truth’tur. Kapsam, iki serinin amaçları, değişmez yayın sınırları ve final kabul ölçütleri master prompttadır. Bu dosya onları genişletemez veya daraltamaz.

## 1. Tek ana oturum ve karar sahipliği

Master görevi mevcut ana oturum tamamlar. Ana oturum:

- araştırma sentezi, mimari karar, çelişki çözümü, dosya değişiklikleri ve final kabulün sahibidir;
- işi isteyerek ikinci bir ana chat’e, “faz 2” görevine veya başka modele handoff ederek bitmiş saymaz;
- promptla kontrol edilemeyen bir platform kesintisi yoksa audit → karar → uygulama → doğrulama zincirini aynı oturumda kapatır.

“Fable 5” oturum/launcher seçimidir; prompt metni gerçek serving modeli garanti edemez. Platform safety fallback’i, model erişimi veya kuruluş politikası modeli değiştirebilir. Böyle bir geçişi bypass etmeye çalışma, modelin değişmediğini iddia etme veya aynı isteği güvenlik mekanizmasını aşmak için yeniden yazma. Oturum devam edebiliyorsa ana karar sahipliğini aynı konuşmada sürdür.

Gelecekteki trigger’lar da belirli bir model sürümünü garanti etmez; çalıştırıldıkları ana oturumu sorumlu karar sahibi yapar.

## 2. En fazla bir bounded helper

Helper zorunlu değildir. Yalnızca belirgin bir kör noktayı ana oturumdan daha verimli kapatacaksa **tek bir helper kimliği ve tek bir bounded iş paketi** kullanılabilir.

İzin verilen helper rolü:

- salt-okunur repo incelemesi;
- güncel resmî/akademik kaynak bulma ve doğrulama;
- sınırlı prerequisite, kapsam veya regresyon sanity-check’i;
- ana oturumun verdiği somut soruya kanıtlı advisory rapor.

Helper:

- dosya yazmaz ve planı uygulamaz;
- yeni helper, agent team, dynamic fan-out, workflow, batch review veya advisor çağırmaz;
- nihai mimari ya da kabul kararı vermez;
- bütün görevi yeniden audit etmez;
- başarısız olursa yerine ikinci helper açılmaz; ana oturum eldeki kanıtla devam eder veya gerçek engeli bildirir.

Aynı helper’ı yalnızca ilk bounded iş paketini netleştiren kısa bir follow-up için resume etmek yeni helper sayılmaz; kapsamı yeni bir review turuna genişletme.

Harness izin veriyorsa helper’a yalnızca gereken read/search/web araçlarını ver; file-write ile agent/workflow oluşturma araçlarını engelle ve spawn depth’i `1` ile sınırla. Harness bunu teknik olarak zorlayamıyorsa davranışsal sınırı uygula ve bunun platform garantisi olduğunu iddia etme.

Belirli bir helper modelini talep edebilirsin; gerçek model çözümü runtime’a aittir. İstenen model ikame edilirse bunu telafi etmek için ikinci helper açma.

## 3. Skill ve araç kullanımı

Kurulu skill’leri isim listesi tamamlamak için değil, doğrudan karar veya doğrulama kalitesi artırıyorsa kullan. Örnek yetenekler: tasarım seçeneklerini karşılaştırma, gerçek teknik hatayı teşhis etme, net değişikliği uygulama, handoff/state tasarlama ve tamamlanma kanıtı toplama.

Şu sınırlar geçerlidir:

- Skill kendi başına yeni agent ağı veya tekrar eden reviewer döngüsü başlatamaz.
- İnteraktif onay bekleyen bir skill, master’da zaten karara bağlanmış bir konuyu yeniden açmaz.
- Skill bulunamaması dış engel değildir; aynı amacı mevcut repo/web/test araçlarıyla tamamla.
- Gerçek bir dış ürün kararı yoksa brainstorming/grill çıktısını iç karar denetimi olarak kullan ve uygulama için ara onay bekleme.

## 4. Araştırma ve review bütçesi

Kurulum görevi ile gelecekteki makale üretimini ayır:

- **Bu master kurulumunda:** curriculum/domain/prerequisite mimarisini savunmaya yetecek temsilî ve karar taşıyan kanıt topla. Her planlanan makale için article-level deep research yapma.
- **Gelecekteki bir üretim run’ında:** deep research yalnızca seçilmiş `N` makale ve bunların doğrudan prerequisite/köprüleri içindir.
- Mevcut roadmap’i her üretim run’ında baştan tasarlama. Yalnızca seçilmiş `N` hedefte yeni ve maddi kanıt bir sorun gösterirse sınırlı, sürümlü ve gerekçeli değişiklik yap.
- Aynı web sorusunu, dosya taramasını veya review kararını farklı model/skill turlarında tekrarlama.
- Kanıt yeterliyse karar ver; belirsizliği kaydet, sonsuz kaynak arama başlatma.
- Tek final consistency/review geçişi yap. Bulgu varsa düzelt ve yalnızca etkilenen kontrolleri yeniden çalıştır; sonra dur.

## 5. `BATCH=N+1` — tek kanonik semantik

### 5.1 Geçerli direktif

Batch override yalnızca şu exact assignment biçiminde geçerlidir:

`BATCH=N+1`

Geçerli satırın regex’i `^BATCH=([1-9][0-9]*)\+1$` biçimindedir: `N`, ilk basamağı 1–9 olan pozitif bir onluk tam sayıdır; devamında 0–9 gelebilir. Örneğin `BATCH=2+1` ve `BATCH=10+1` geçerlidir. Yalnız başına geçen “2 makale”, roadmap sıra numarası, eski batch adı veya başka bir sayı override sayılmaz.

Bir trigger dosyasında tam olarak bir assignment satırı bulunur ve dağıtılan varsayılan değer şudur:

`BATCH=5+1`

### 5.2 Çözüm önceliği

Bir üretim oturumu `N` değerini yalnızca şu sırayla çözer:

1. Kullanıcının mevcut mesajındaki en son geçerli ve açık `BATCH=N+1` assignment’ı.
2. Kullanıcı mesajında yoksa, çalıştırılan trigger’daki tek assignment.
3. O da yok veya geçersizse güvenli fallback `BATCH=5+1`.

`SOZLESME`, roadmap, HANDOFF, historical batch kaydı, helper önerisi veya model tercihi bu run için başka `N` seçemez. En güncel açık kullanıcı assignment’ı yalnızca o üretim run’ını override eder; kalıcı varsayılanı değiştirmez.

Bu master **kurulum** görevi bir production run değildir: `BATCH` değeri ne olursa olsun burada sıfır makale gövdesi yazılır.

### 5.3 `N` ne demektir?

`N`, yaşayan roadmap’te sırada bulunan, henüz yayımlanmamış **tam olarak kaç makalenin** bu run içinde:

- gerekli article-level research’ünün yapılacağını;
- yazılacağını;
- repo’ya entegre edileceğini;
- ilgili kapılardan geçirilip doğrulanacağını

belirtir.

Roadmap’te kalan makale sayısı `N`’den azsa doldurma konusu icat etme; kalan gerçek makaleleri tamamla ve `+1` fazında seriyi tamamlanmış/yeniden planlama gerektirir state’ine geçir.

Her başarılı production run, makale sayısından bağımsız olarak bir sonraki kesintisiz historical `classificationBatch`/cohort kimliğini alır. Mevcut Batch 0 ve Batch 1 metadata’sı korunur. “Batch 2 daima 11–15’tir” gibi beşli aralık formülü aktif kural değildir.

### 5.4 `+1` ne demektir?

`+1` bir makale, helper veya tek dosya değildir. `N` makalenin entegrasyonu ve doğrulaması başarıyla bittikten sonra yapılan **tek preparation/state-transition fazıdır**.

Bu faz, yalnızca gerektiği kadar:

- HANDOFF’taki yayımlanmış cursor ve bir sonraki güvenli başlangıcı;
- roadmap’teki durum, prerequisite ve recall kayıtlarını;
- açık kaynak/editoryal/teknik borçları;
- sıradaki run için bounded hazırlık notunu

günceller ve çapraz state tutarlılığını doğrular.

`+1` sırasında sonraki makalenin gövdesi yazılmaz. Seride makale kalmadıysa yeni konu uydurmak yerine completion state’i kaydedilir. `N` tamamlanmadan gerçek bir dış engel oluşursa `+1` yapılmış gibi gösterme; mevcut state’i ve engeli dürüstçe kaydet.

Batch büyüklüğü değişse de akademik kalite, prerequisite zinciri, kaynak doğrulaması, görsel standardı, entegrasyon ve doğrulama kapıları düşürülemez.

### 5.5 Karar tablosu

| Girdi | Çözülen run | Anlam |
|---|---:|---|
| Hiç assignment yok | `5+1` | Varsayılan beş makale, ardından bir preparation fazı |
| Trigger: `BATCH=2+1` | `2+1` | İki makale, ardından bir preparation fazı |
| Trigger: `BATCH=5+1`; current user: `BATCH=3+1` | `3+1` | En güncel açık kullanıcı assignment’ı kazanır |
| Sadece “2 makale” ifadesi | `5+1` | Exact assignment olmadığı için override oluşmaz |

Bu tablo semantiğin test oracle’ıdır; trigger dosyalarına kopyalanmaz.

## 6. Her seri için yaşayan state hiyerarşisi

Her seri kendi namespace’i ve kendi state zincirine sahiptir. Sorumluluklar domain bazlıdır:

1. **Yayımlanmış gerçek:** article dosyaları + frontmatter + catalog ve bunların doğrulanan route/id/hash bilgileri. Geçmiş hakkında en yüksek otoritedir.
2. **`SOZLESME`:** uzun ömürlü normatif kurallar, kalite kapıları, state sahipliği ve bu dosyadaki kanonik `5+1 default / explicit N+1 override` semantiğinin kalıcı kopyası. Yalnız policy değişince güncellenir.
3. **Roadmap / `YOL-HARITASI`:** yayımlanmamış plan, fazlar, prerequisite grafı, recall/borç kayıtları ve doğal kapsam. Machine-readable UI roadmap bunun senkron izdüşümüdür.
4. **`HANDOFF`:** trigger’ın giriş noktası; mevcut cursor, son yayımlanan makale, sıradaki güvenli başlangıç, açık borçlar ve ilgili path’ler. Kalıcı kuralları veya tüm roadmap’i kopyalamaz; sahiplerine link verir.
5. **Trigger:** state değildir. Yalnız HANDOFF’u yükler, o run’ın `BATCH` değerini taşır ve yürütmeyi başlatır.

Çelişki kabul edilmez. Önce yayımlanmış gerçeği koru; sonra kuralı `SOZLESME`’den, gelecekteki sırayı roadmap’ten, mevcut cursor’ı HANDOFF’tan çöz ve dosyaları uzlaştır. HANDOFF, `SOZLESME` veya roadmap’i override edemez.

Historical üretim günlüğü tutulabilir fakat “non-normative history” diye ayrılır; eski sabit 100/5’li batch veya paralel-agent ifadeleri aktif komut olarak okunamaz.

## 7. İki kısa trigger’ın sözleşmesi

Master kurulumunda biri AI, biri BOUN için iki ayrı, kısa ve model-sürümünden bağımsız **Claude Code production trigger** oluştur. Trigger metni belirli bir serving modele veya değişken komut adına bağlanmasın.

Her trigger:

- ilgili serinin kesin HANDOFF path’ini gösterir;
- tam olarak bir editable assignment satırı taşır: `BATCH=5+1`;
- öz olarak “HANDOFF’u ve işaret ettiği state zincirini yükle → §5’e göre batch’i çöz → sıradaki `N` makaleyi araştır/yaz/entegre et/doğrula → `+1` fazını tamamla → sonraki makale gövdesine başlamadan dur” der;
- ana oturumu karar ve kabul sahibi bırakır.

Trigger şunları içermez:

- sabit veya sıradaki konu başlıkları;
- kaynak/bibliyografya listesi;
- makale başına uzun editoryal/pedagojik kurallar;
- geçmiş batch özeti veya açık borç listesi;
- model sürümü, routing/fallback iddiası;
- helper/skill/workflow ayrıntısı;
- ikinci bir `BATCH=...` assignment’ı veya karar tablosu.

Trigger’ın değiştirilmesi gereken tek operasyonel alan assignment satırıdır. Güncel state değiştikçe trigger değil, ilgili owner artifact güncellenir.

## 8. Ek operasyonel kabul kapıları

Master kabul kriterlerine ek olarak şunları taze diff üzerinde kanıtla:

- Bu dosya, prompt setinde `N+1` semantiğinin tek ayrıntılı tanımıdır.
- Helper politikası yalnızca burada ayrıntılıdır; master ve chat eki referans verir.
- AI ve BOUN `SOZLESME` dosyaları kanonik batch semantiğini kendi yaşam döngüleri için bir kez taşır; HANDOFF ve trigger bunu yeniden anlatmaz.
- Aktif living state’te “sabit beşli batch”, “Batch k = sabit beşli sıra”, paralel agent/reviewer zorunluluğu veya repo-dışı scratch state bağımlılığı kalmaz.
- İki trigger’da da exact assignment sayısı birdir ve varsayılan `BATCH=5+1`’dır.
- §5.5 karar tablosundaki dört senaryo statik olarak doğrulanır.
- Setup sırasında hiçbir article body oluşturulmamış veya değiştirilmemiştir.
- Model/helper kimliği hakkında gözlemlenemeyen garanti verilmemiştir.

Bu kapılar temiz olduğunda master’ın final teslim biçimiyle görevi kapat.
