---
article_id: article_b4fca595-5e96-4fc9-b14f-9180cc4834d1
title: "Tehdit Modelleme: Güven Sınırını Çizmek, Varsayımı Yazmak"
slug: tehdit-modelleme-guven-sinirini-cizmek
category: design-and-configuration
level: advanced
reading_order: 3
summary: "Bir belge ürününün dosya yükleme ve önizleme hattını veri akış diyagramıyla çizer: kullanıcının seçtiği baytların API'ye uğramadan işçiye ve dönüştürücü kütüphaneye vardığını, 'işçi iç ağda, girdisi güvenilir' varsayımının bir güven sınırı ihlali olduğunu gösterir. Her sınır geçişini STRIDE ile bir tehdide, sürümlü bir ASVS 5.0.0 gereksinimine ve negatif teste bağlar; dönüştürücüyü yalıtmanın neyi değiştirdiğini ve modelin değişiklikle bayatlamasının nasıl önleneceğini tartışır."
tags:
  - tehdit-modelleme
  - guven-siniri
  - veri-akis-diyagrami
  - stride
  - dosya-yukleme
content_hash: sha256:a8f9049d77d554440d9f3ffc1455b943ea537b4df77ac1640416db5ab096753b
classification_version: 1
classification_batch: 1
---
## Önizleme işçisi neye güveniyor?

Belge paylaşım servisinin hata yollarını incelediğimiz çok kiracılı ürüne yeni bir özellik ekleniyor: kullanıcı bir PDF, DOCX ya da PNG yüklediğinde ürün arka planda bir önizleme görüntüsü üretecek. Tasarım dört parçadan oluşuyor. Yükleme API'si dosyanın adını, türünü ve boyutunu alır ve karşılığında kısa ömürlü bir **imzalı yükleme adresi (presigned URL)** verir; tarayıcı baytları bu adresle doğrudan nesne deposuna yazar. Yükleme bitince API bir kuyruğa önizleme isteği bırakır. Önizleme işçisi mesajı alır, dosyayı nesne deposundan indirir, türüne göre bir dönüştürücü kütüphaneye verir ve çıkan PNG'yi nesne deposunun önizleme önekine yazar.

Tasarım belgesinin güvenlik bölümü tek cümle: "İşçi iç ağda çalışır ve yalnızca kendi API'mizin yazdığı mesajları okur; girdisi güvenilirdir." Kod bu cümleye göre yazılmış:

```ts
// Kırılgan sürüm: eğitim amaçlı, kontrollü örnek.
// Kırılan özellik: işçi, istemcinin beyanını sunucunun ürettiği kimliklerle aynı güvenle kullanıyor.

// Yükleme API'si, yükleme tamamlandığında:
await queue.publish("preview.requested", {
  tenantId: session.tenantId,
  documentId: doc.id,
  objectKey: `incoming/${session.tenantId}/${upload.fileName}`,
  contentType: upload.contentType,
});

// Önizleme işçisi:
async function onPreviewRequested(msg: PreviewRequested): Promise<void> {
  const workFile = path.join("/var/work", msg.objectKey);
  await storage.download(msg.objectKey, workFile);
  const png = await converters[msg.contentType](workFile);
  await storage.put(`previews/${msg.tenantId}/${msg.documentId}.png`, png);
}
```

Mesajın dört alanından ikisi sunucudan geliyor: kiracı kimliği oturumdan, belge kimliği veritabanından. Öbür ikisi kullanıcının sözü. `objectKey` kullanıcının verdiği dosya adını taşıyor, `contentType` tarayıcının gönderdiği tür beyanı; dosyanın baytları ise baştan sona kullanıcının. İşçi hepsini aynı güvenle kullanıyor: adı yerel bir dosya yolu kurmak için, beyan edilen türü hangi ayrıştırıcının çalışacağını seçmek için, baytları da o ayrıştırıcıyı beslemek için. Dönüştürücü işçinin kendi sürecinde çalışıyor ve işçinin depolama kimlik bilgisi her kiracının önekinde okuma ve yazma yetkisi taşıyor; önizlemeler bütün kiracılar için aynı işçide üretildiğinden bu yetki kolaylık olsun diye verilmiş.

Saldırganın özel bir yeteneğe ihtiyacı yok. Herhangi bir kiracının, dosya yükleyebilen herhangi bir kullanıcısı yeter: dosyanın adını, beyan edilen türünü ve içeriğini o seçiyor. Korunan varlık üç tane: öteki kiracıların belgeleri ve önizlemeleri, işçinin bütün kiracılara uzanan kimlik bilgisi ve bütün kiracıların paylaştığı önizleme hattının çalışır kalması. Güven sınırı, tasarım belgesinin baktığı yerde, iç ağın kenarında durmuyor. Bir kullanıcının seçtiği baytlar ile o baytları bütün kiracılar adına işleyen süreç arasında duruyor.

Belgedeki cümlenin bir zayıflık kaydı var. MITRE'nin CWE-501'i, **güven sınırı ihlali (trust boundary violation)**, bir ürünün güvenilen ve güvenilmeyen veriyi aynı veri yapısında ya da aynı mesajda karıştırmasıdır. Bu yazının sorusu, bu karışıklığın kod yazılmadan önce, tasarım incelemesinde nasıl yakalanacağı. Yöntemin adı **tehdit modelleme (threat modeling)**: özelliğin veri akışını çizmek, her sınır geçişini bir tehdide bağlamak ve her tehdidi doğrulanabilir bir gereksinime ve bir negatif teste çevirmek.

## Dört soru ve sınırın tanımı

OWASP'ın tehdit modelleme rehberi yöntemi yapılandırılmış ve tekrarlanabilir bir süreç olarak tanımlar: sistemi güvenlik açısından modellemek, modele dayanarak geçerli tehditleri bulmak ve her birine bir cevap belirlemek. Bakış saldırganın bakışıdır, zamanı ideal olarak tasarım aşamasıdır ve model bir kez yazılıp bırakılmaz, sistemle birlikte güncellenir. Rehberin dayandığı Tehdit Modelleme Manifestosu (2020) yöntemi dört soruya indirger: Ne üzerinde çalışıyoruz? Ne ters gidebilir? Bununla ne yapacağız? Yeterince iyi iş çıkardık mı? Yazının geri kalanı bu dört soruyu sırayla önizleme hattına soruyor.

Bu soruların yakaladığı şey bir tasarım kusurudur. Top 10:2025'in A06 kategorisi, güvensiz tasarım (Insecure Design), ayrımı açıkça yapar: güvensiz tasarım ile güvensiz uygulamanın kök nedenleri, ortaya çıktıkları zaman ve düzeltmeleri farklıdır; güvenli bir tasarım uygulama hatası taşıyabilir, ama güvensiz bir tasarım kusursuz bir uygulamayla düzelmez, çünkü gereken kontrol hiç tasarlanmamıştır. Önizleme işçisinin kodu tasarım belgesini sadakatle uyguluyor; kusur belgede. Kategori sayfası tehdit modellemenin iş kalemlerinin ayrıntılandırıldığı oturumların içinde yapılmasını ve özellikle veri akışlarındaki ve erişim denetimindeki değişikliklere bakılmasını önerir. Program düzeyinde NIST'in güvenli yazılım geliştirme çerçevesi SSDF v1.1 aynı işi iki uygulamayla ister: PW.1.1 yazılımın güvenlik riskini tehdit modelleme, saldırı modelleme ya da saldırı yüzeyi haritalama gibi risk modelleme biçimleriyle değerlendirmeyi, PW.1.2 gereksinimleri, riskleri ve tasarım kararlarını izleyip güncel tutmayı.

Top 10'u okuduğumuz yazıda güven sınırına, verinin, isteğin ya da kararın güvenin değiştiği yerden geçtiği nokta demiş ve onu alışılmadık bir yerde, kanıtın kapsamında bulmuştuk. Şimdi tanımı biçimselleştirebiliriz. CWE-501'in açıklaması sınırı programın içinden geçen bir çizgi olarak anlatır: çizginin bir yanında veri güvenilmezdir, öbür yanında güvenilir sayılır; doğrulama mantığının işi verinin çizgiyi güvenle geçmesini sağlamaktır ve ihlal, program bu çizgiyi bulanıklaştırdığında olur. Bunun üstüne kurduğumuz mühendislik ölçütü bizim çıkarımımız: sınırın yerini ağ topolojisi belirlemez, iki soru belirler. Bu veriyi kim seçti, yani kökeni ne? Ve veri hangi sürece varıyor, o süreç kandırılırsa neye dokunabilir? Kökenin değiştiği ya da varılan sürecin yetkisinin büyüdüğü her geçiş bir sınır geçişidir. Önizleme işçisi iç ağda, ama girdisinin kökeni herhangi bir kullanıcı ve yetkisi bütün kiracılar; iki soruya göre de sınır işçinin tam girişinden geçiyor.

## Ne üzerinde çalışıyoruz: veri akış diyagramı

Rehber modeli kurmanın en yaygın yolu olarak **veri akış diyagramını (data flow diagram, DFD)** verir ve çizimin beş şeyi açıkça göstermesini ister: **dış varlıklar (external entity)**, yani sistemin denetlemediği aktörler; **süreçler (process)**, yani veriyi işleyen kod; **veri depoları (data store)**; **veri akışları (data flow)**; ve güven sınırları. Şekil 1 önizleme özelliğinin ilk tasarımını bu dille çiziyor. Akışlar numaralı; her biri ya bir sınırı geçiyor ya da geçmiyor ve tehdit listesi bu ayrımdan çıkacak.

![Veri akış diyagramı. Solda internet sınırının dışında Kullanıcı, her kiracıdan. Sınırın içinde Yükleme API'si beyanı doğrular; Kuyruk preview.requested; Nesne deposu incoming/ ve previews/; Önizleme işçisi geniş depolama yetkisi taşır ve içinde vurgulu bir kutu vardır: dönüştürücü, aynı süreç. Numaralı akışlar: 1 beyan, 2 imzalı yükleme adresi, 3 baytlar API'ye uğramadan depoya, 4 önizleme isteği, 5 teslim, 6 ham baytlar işçiye, 7 önizleme PNG'si depoya. 3 ve 6 vurgulu yoldur, kullanıcının seçtiği baytlar. İşçinin girişinde vurgulu kesikli çizgi: tasarım belgesinde olmayan sınır. İşçiden kuyruğa noktalı ok: hata, sınırsız yeniden teslim. Altta gösterim açıklaması.](assets/onizleme-veri-akisi.svg "Şekil 1 — Önizleme özelliğinin veri akış diyagramı ve tasarımın görmediği sınır")

Çizim iki şeyi görünür kılıyor. Birincisi baytların yolu. Tasarım toplantısında API'nin doğrulamaları konuşulmuştu: ad uzunluğu, izin verilen türler, boyut üst sınırı. Ama API yalnızca 1 numaralı akışı, kullanıcının beyanını görüyor. Baytlar 3 numaralı akışla internetten doğrudan nesne deposuna, 6 ile işçiye ve oradan aynı süreçteki dönüştürücüye gidiyor; bu yol üzerinde onları doğrulayan tek bir süreç yok. Beyan doğrulandı, içerik hiç görülmedi. İkincisi kuyruk. 4 ve 5 numaralı akışların iki ucu da bizim, bu yüzden sınır geçmiyor gibi görünüyorlar; ama mesajın iki alanı 1 numaralı akışta internetten gelmiş beyanların kopyası. Bir sınırı geçmiş veri kendi sistemimizin içinde dolaşırken güvenilir hâle gelmez; kökeni onunla birlikte taşınır. Vurgulu kesikli çizgi bu yüzden işçinin girişinde duruyor.

Diyagramda bir de noktalı kenar var. Hata yolunu incelediğimiz yazıda tek bir çağrının hata yollarını saymıştık; bir veri akışında hata yolları da kenardır ve çizilmeyen kenar tasarlanmaz. Dönüştürücü bir dosyada her seferinde çöküyorsa kuyruk o mesajı yeniden teslim eder; sınırsız yeniden denenen böyle bir **zehirli mesaj (poison message)** işçileri meşgul eder ve bütün kiracıların önizlemelerini bekletir. Yarım kalan iş de aynı yazıdaki kısmi başarısızlıktır: önizleme nesne deposuna yazılmış ama belgenin durumu güncellenmemişse, yeniden teslim edilen mesajın ne yapacağı tanımlı olmalıdır.

## Ne ters gidebilir: sınır geçişlerinde STRIDE

İkinci soru için rehber örnek yöntem olarak STRIDE'ı kullanır: Microsoft çalışanlarının geliştirdiği, altı tehdit sınıfının baş harflerinden oluşan bir hatırlatıcı. Her sınıf korunmak istenen bir özelliğin ihlalidir: kimlik sahteciliği (spoofing) kimlik doğrulamayı, kurcalama (tampering) bütünlüğü, inkâr (repudiation) hesap verebilirliği, bilgi ifşası (information disclosure) gizliliği, hizmet reddi (denial of service) erişilebilirliği, yetki yükseltme (elevation of privilege) yetkilendirmeyi bozar; aşağıdaki tabloda parantez içindeki harfler bu İngilizce adların baş harfleri. Altı sınıf doldurulacak bir form değil, her sınır geçişinde sorulacak altı sorudur; rehberin önerisi de her tehdidi hangi bileşeni, akışı ya da sınırı etkilediğiyle birlikte kaydetmek.

Önizleme hattında sorular şu cevapları veriyor. 1 numaralı akışta kullanıcı başka bir kiracı adına yükleme yapmayı deneyebilir; kiracı kimliği istekten değil oturumdan alındığı sürece bu kimlik sahteciliği kapanır. Aynı akıştaki tür ve boyut ise birer iddiadır. 3 numaralı akışta kurcalama asıl yüzünü gösterir: adı `.png` ile biten dosyanın içeriği PDF, SVG ya da bambaşka bir biçim olabilir ve dönüştürücü beyana göre seçiliyorsa hangi ayrıştırıcının çalışacağını saldırgan seçer. Dosyanın gerçek türünü adı değil, ilk baytlarındaki biçim imzası, yani **sihirli bayt (magic bytes)** söyler. Hizmet reddi iki biçimde gelir: açıldığında bin katına çıkan bir arşiv, yani **sıkıştırma bombası (decompression bomb, CWE-409)**, ve dosyası küçük ama piksel boyutu dev bir görüntü, yani **piksel seli (pixel flood)**. DOCX'in kendisi bir zip arşivi olduğu için bomba yalnızca arşiv yükleyen özelliklerin sorunu değil.

4 ve 5 numaralı akışlarda kurcalama ile yetki yükseltme birleşir. Dosya adı `../` gibi üst dizin parçaları taşıyorsa işçinin `path.join` ile kurduğu yol çalışma dizininin dışına çıkar: **yol geçişi (path traversal, CWE-22)**. Kuyruğa yazabilen her bileşen, ister kendi kodumuzdaki bir hata ister iç ağdaki başka bir servis olsun, işçiye başka bir kiracının anahtarını dönüştürtebilir ve çıktıyı istediği öneke yazdırabilir; işçinin yetkisi bütün kiracılara uzandığından bu bir kiracılar arası bilgi ifşasıdır. İnkâr burada sessizdir: mesaj, hangi kullanıcının isteğiyle üretildiğini taşımıyor.

Dönüştürücüye varan baytlarda tehdit sınıfı değişir. ASVS 5.0.0, güvenilmeyen verinin seri dışına çıkarılmasını, ham dosya ya da ikili veri ayrıştırmayı, dinamik kod çalıştırmayı ve doğrudan bellek işlemeyi **tehlikeli işlev (dangerous functionality)** diye adlandırır ve bu işlemlerdeki açıkların uygulamayı ele geçirtme, hatta altındaki altyapıyı açığa çıkarma riskinin yüksek olduğunu yazar. OWASP'ın dosya yükleme rehberi aynı şeyi görüntüler için söyler: görüntüyü çözüp yeniden kodlamak her kötü içeriği temizlemez ve görüntü işleyicinin kendisi de güvenilmeyen girdi işler. Ayrıştırıcıda kod çalıştıran bir dosya, o kodu işçinin kimlik bilgisiyle çalıştırır: yetki yükseltme. Bazı biçimler dışarıdaki bir kaynağa ya da yerel bir dosyaya başvurabilir; dönüştürücü bu başvuruyu izlerse sunucu kullanıcının seçtiği adrese istek yapar ya da yerel bir dosyayı önizlemeye gömer: bilgi ifşası.

> **Teşhis et:** Bir ekip arkadaşın kuyruk için şu çözümü öneriyor: "API mesajı HMAC ile imzalasın, işçi imzayı doğrulasın; böylece mesaj güvenilir olur." Bu öneri hangi tehdidi kapatır, hangisini olduğu gibi bırakır?

İmza, mesajı kimin yazdığını ve yolda değişmediğini kanıtlar. İç ağdaki başka bir bileşenin işçiye sahte istek bırakmasını, yani 4 ve 5 numaralı akışlardaki kimlik sahteciliğini ve kurcalamayı kapatır; kuyruğa yazabilen bileşen sayısı arttıkça bu değerli bir kontroldür. Ama mesajın içeriğini kanıtlamaz. Kurallara uyan bir API, kullanıcının verdiği `../` içeren dosya adını ve yanlış tür beyanını sadakatle imzalar; imza doğrulanır, işçi yine yanlış yolu kurar ve yine yanlış ayrıştırıcıyı seçer. İyi bir cevap iki soruyu ayırır: mesajı kim yazdı ve mesajın alanlarını kim seçti. İlkini kimlik doğrulama çözer, ikincisini kökene göre tasarım: mesaj yalnızca sunucunun ürettiği kimliği taşır. Zayıf cevap imzayı bir güven damgası gibi anlatır; CWE-501'in tarif ettiği karışıklık imzalı bir mesajda da olduğu gibi durur.

## Tehditten gereksinime ve teste

Üçüncü soru, "bununla ne yapacağız", rehberde dört cevapla verilir: azaltmak, ortadan kaldırmak, aktarmak ya da kabul etmek; azaltma kararları da uygulanabilir güvenlik gereksinimlerine çevrilir. Aşağıdaki tablo önizleme hattının tehditlerini sürümlü ASVS 5.0.0 gereksinimlerine ve her birini bir negatif teste bağlıyor. Tabloyu bir tehdit modeline çeviren son sütundur: testi yazılamayan satır henüz bir karar değildir.

| Geçiş | Tehdit | Karar | Gereksinim | Negatif test |
|---|---|---|---|---|
| 1 | Başka kiracı adına yükleme (S) | Kiracı oturumdan alınır, istekteki yok sayılır | `v5.0.0-8.4.1` (L2) | A'nın oturumuyla B'ye yükleme denemesi: belge A'da oluşur ya da istek reddedilir |
| 3 | İçerik uzantının türüyle uyuşmuyor (T) | Tür sihirli bayttan, beyan yalnızca karşılaştırılır | `v5.0.0-5.2.2` (L1) | Adı `.png`, içeriği PDF: reddedilir, dönüştürücü çağrılmaz |
| 3 | Sıkıştırma bombası, piksel seli (D) | Girdi sayısı ve açılmış boyut açmadan önce; piksel sayısı başlıktan | `v5.0.0-5.2.3` (L2), `v5.0.0-5.2.6` (L3) | 60 MiB'a açılan 61 KB'lık DOCX ve 20.000 × 20.000 PNG: ikisi de reddedilir |
| 4–5 | Ad yolu kuruyor, mesaj kiracıyı taşıyor (T, E) | Mesajda yalnızca belge kimliği; anahtar ve yol sunucuda üretilir | `v5.0.0-5.3.2` (L1) | Adı `../../tenant-b/rapor.pdf` olan dosya: okunan ve yazılan anahtarlar yalnızca A'nın önekinde |
| 6 | Ayrıştırıcıda kod çalışması, dış başvuru (E, I) | Dönüştürücü ayrı süreçte: kimlik bilgisi ve ağ yok, kaynakları sınırlı | `v5.0.0-15.2.5` (L3), `v5.0.0-15.1.5` (L3) | Yalıtım içinden yerel bir test sunucusuna bağlantı denemesi başarısız olur |
| hata kenarı | Zehirli mesaj (D) | Üç deneme, ölü mektup kuyruğu, kiracı başına eşzamanlılık sınırı | `v5.0.0-15.1.3`, `v5.0.0-15.2.2` (L2) | Hep çöken dosya üç denemeden sonra ölü mektup kuyruğunda; öteki kiracının işi ilerler |

Düzeltilmiş tasarım tablonun satırlarını koda çeviriyor. Mesaj artık yalnızca sunucunun ürettiği belge kimliğini taşıyor; şemada başka alan yok, fazlası reddediliyor. İşçi kiracıyı, nesne anahtarını ve beklenen türü veritabanındaki kayıttan; dosyanın gerçek türünü ve piksel boyutunu dosyanın kendisinden yeniden türetiyor. Kullanıcının beyanı veritabanında kalıyor ve yalnızca karşılaştırılıyor; hiçbir yol, anahtar ya da ayrıştırıcı seçimi onunla yapılmıyor. Şekil 2 iki tasarımı yan yana koyuyor.

![İki panel. Önce: karışık mesaj, tek süreç. Mesajda tenantId ve documentId sunucunun ürettiği alanlar, objectKey: ad ve contentType istemcinin beyanı. Mesaj tek bir sürece gider: işçi kodu, dönüştürücü ve kimlik bilgisi bir arada; ad yolu kurar, beyan ayrıştırıcıyı seçer. Sonra: yalnızca kimlik, iki süreç. Mesajda yalnızca documentId var. Kimlik bilgisini tutan işçi yeniden türetir: veritabanından kiracı ve anahtar, dosyanın kendisinden tür ve piksel. Baytlar vurgulu okla güven sınırı 2'nin, yalıtımın içindeki dönüştürücüye gider; dönüştürücüde ağ yok, kimlik yok; PNG işçiye döner. Beyan veritabanında kalır, yalnızca karşılaştırılır.](assets/once-sonra-isci-siniri.svg "Şekil 2 — Önce ve sonra: mesajın alanları ve kimlik bilgisinin yeri")

```ts
type PreviewRequested = { documentId: string };

const LIMITS = {
  maxBytes: 25 * 1024 * 1024,
  maxUnpackedBytes: 50 * 1024 * 1024,
  maxEntries: 1_000,
  maxPixels: 40_000_000,
};

export async function onPreviewRequested(raw: unknown): Promise<void> {
  const { documentId } = parsePreviewRequested(raw);  // tek alan, UUID; fazlası reddedilir
  const doc = await documents.get(documentId);
  if (!doc || doc.previewStatus !== "pending") return; // bilinmeyen ya da tekrar teslim: yan etkisiz

  const key = `incoming/${doc.tenantId}/${doc.id}`;   // anahtar sunucuda üretildi, ad yok
  const { size } = await storage.head(key);           // boyutu nesne deposu ölçtü, kullanıcı değil
  if (size > LIMITS.maxBytes) return reject(doc, "too-large");

  const head = await storage.readRange(key, 0, 64);
  const kind = sniff(head);                           // sihirli bayt: "png" | "pdf" | "zip" | null
  if (kind === null || kind !== doc.expectedKind) return reject(doc, "type-mismatch");
  if (kind === "png" && pngPixels(head) > LIMITS.maxPixels) return reject(doc, "too-many-pixels");
  if (kind === "zip") {
    const dir = await zipDirectory(key);              // merkez dizin: ön eleme, kesin sınır değil
    if (dir.entries > LIMITS.maxEntries || dir.declaredBytes > LIMITS.maxUnpackedBytes) {
      return reject(doc, "archive-limits");
    }
  }

  // Ayrı süreç: kimlik bilgisi ve ağ yok; açtığı baytları kendisi sayar ve sınırda durur.
  const png = await sandbox.convert(storage.stream(key), { kind, limits: LIMITS, timeoutMs: 20_000 });
  await storage.put(`previews/${doc.tenantId}/${doc.id}.png`, png);
  await documents.markPreviewReady(doc.id);           // önizleme kalıcı olduktan sonra
}

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function pngPixels(head: Buffer): number {
  // İmza (8 bayt), sonra ilk parça IHDR: 4 bayt uzunluk, 4 bayt tür, genişlik, yükseklik.
  if (!head.subarray(0, 8).equals(PNG_SIGNATURE) || head.toString("ascii", 12, 16) !== "IHDR") {
    return Number.POSITIVE_INFINITY;
  }
  return head.readUInt32BE(16) * head.readUInt32BE(20);
}
```

Kodda üç ayrıntı doğrudan tehdit modelinden geliyor. Boyut kullanıcının beyanından değil, nesne deposunun kendi kaydettiği boyuttan okunuyor. Zip arşivinin merkez dizinindeki girdi sayısı ve açılmış boyut alanları da bir beyandır, onları da dosyayı hazırlayan kişi yazmıştır; bu yüzden ASVS'nin açmadan önce istediği kontrol bir ön elemedir ve asıl sınır, yalıtılmış süreçte açma sırasında sayılan baytlardır. PNG'nin piksel boyutu ise dosyanın ilk yirmi dört baytından okunur: PNG belirtimine göre ilk sekiz bayt imzadır, ilk parça IHDR'dir ve genişlik ile yükseklik onun ilk iki dört baytlık alanıdır. Görüntüyü çözmeden reddetmek, bombayı çözücüye hiç vermemek demektir.

Sayıları kendimiz ürettik (Python 3.14'ün `zipfile` ve `zlib` modülleri, en yüksek sıkıştırma düzeyi). Sıfırlarla dolu 60 MiB'lık tek bir dosyayı sıkıştıran zip 61.287 bayt tutuyor; oran yaklaşık 1.027'ye 1. Aynı içerikle 1 GiB'lık dosyanın zip'i yaklaşık 1 MB. 20.000 × 20.000 piksellik, tek kanallı ve 8 bitlik bir PNG 388.871 bayt; çözüldüğünde yalnızca piksel verisi 400 MB, görüntüyü dört kanala açan bir kütüphanede 1,6 GB eder. İki dosya da sıradan bir yükleme sınırının altında kalıyor: boyut sınırı tek başına ikisini de durdurmaz.

Dönüştürücüyü yalıtmak ayrı bir karardır ve ASVS'de üçüncü seviyededir. `v5.0.0-15.2.5`, belgelerde tehlikeli işlev içerdiği yazılmış kısımların çevresinde **yalıtılmış ortam (sandbox)**, kapsülleme, konteyner ya da ağ düzeyinde ayırma gibi ek korumalar ister; amaç, uygulamanın bir parçasını ele geçiren saldırganın oradan başka bir yere geçmesini geciktirmek ve caydırmaktır. Önizleme hattında bunun anlamı somut: dönüştürücü işçinin içinde değil, her dosya için açılan kısa ömürlü ayrı bir süreçte çalışır; baytları girdisinden alır, PNG'yi çıktısına yazar; depolama kimlik bilgisi, ağ erişimi ve kalıcı yazılabilir bir dosya sistemi yoktur; işlemci süresi, bellek ve duvar saati sınırlıdır. Kimlik bilgisi işçide, ayrıştırma yalıtılmış süreçte kalır. İşçinin kendi yetkisi de **en az yetki (least privilege)** ilkesine göre daralır; aşağıdaki şematik politikanın sözdizimi sağlayıcıya göre değişir, içeriği değişmez:

```json
{
  "principal": "preview-worker",
  "allow": [
    { "action": "object:read", "resource": "documents/incoming/*" },
    { "action": "object:write", "resource": "documents/previews/*" }
  ],
  "deny": [{ "action": ["object:list", "object:delete"], "resource": "documents/*" }]
}
```

Statik bir politika kiracıyı mesaj başına ayıramaz; kiracı sınırını, anahtarın mesajdan değil veritabanından türetilmesi korur. Politika başka bir şeyi sınırlar: ele geçirilmiş bir işçi listeleyemez, silemez ve iki önek dışındaki hiçbir yere dokunamaz. Hata kenarı da kararını alıyor: üç denemeden sonra mesaj bir **ölü mektup kuyruğuna (dead-letter queue)** taşınır ve belge "önizleme üretilemedi" durumuna geçer. Belgenin durumu ancak önizleme nesne deposunda kalıcı olduktan sonra "hazır" olur; yeniden teslim edilen bir mesaj, durumu artık "bekliyor" olmayan bir belgede hiçbir şey yapmaz.

> **Teşhis et:** Yoğun saatlerde yalıtılmış dönüştürücü havuzu doluyor ve önizlemeler gecikiyor. Öneri: "Havuz 30 saniye içinde yanıt vermezse işçi dosyayı kendi sürecinde dönüştürsün; kullanıcı önizlemesiz kalmasın." Bu tasarım hangi güvenlik özelliğini, hangi anda kaybeder?

Kimlik bilgisi ile ayrıştırmanın ayrı süreçlerde durması özelliğini, yani Şekil 2'deki ikinci sınırı kaybeder; hem de tam bir arıza anında. Havuzu kimin doldurabildiğine bakmak gerekir: dönüştürülmesi uzun süren dosyaları art arda yükleyen herhangi bir kullanıcı. Önce havuzu doldurur, sonra asıl dosyasını yükler ve o dosya bütün kiracılara yetkili süreçte ayrıştırılır. Bu, hata yolunu incelediğimiz yazıdaki fail-open'ın mimarideki karşılığıdır: koruma yalnızca her şey yolundayken vardır. İyi bir cevap bozulma kipinde de sınırın korunmasını ister: önizleme gecikir, kuyruk bekler, kiracı başına eşzamanlılık sınırlanır; bekleme süresi bir alarm olur, bir izin değil. Zayıf cevap geri dönüşün süresini ya da sıklığını tartışır; sorun süre değil, geri dönüşü kimin tetikleyebildiğidir.

## Yeterince iyi iş çıkardık mı?

Dördüncü sorunun ilk cevabı testlerdir. Rehberin gözden geçirme listesindeki son madde tam olarak bunu sorar: üzerinde anlaşılan azaltımlar test edilebiliyor mu, gereksinimlerin başarısı ya da başarısızlığı ölçülebiliyor mu? Tablodaki her satırın testi aynı kalıbı izler: tehdit edilen geçişe kötü niyetli girdiyi verir ve hem sonucu hem yan etkiyi denetler.

```ts
describe("önizleme işçisi: sınır geçişleri", () => {
  const uploadAndHandle = async (fixture: string, opts: UploadOptions = {}) => {
    const doc = await seed.upload({ tenant: "tenant-a", fixture, ...opts });
    await worker.handle({ documentId: doc.id });
    return doc;
  };

  it.each([
    ["aslinda-pdf.png", "rejected:type-mismatch"],
    ["sifir-60mib.docx", "rejected:archive-limits"], // 61.287 bayt
    ["20000x20000.png", "rejected:too-many-pixels"], // 388.871 bayt
  ])("%s dönüştürücüye verilmez", async (fixture, status) => {
    const doc = await uploadAndHandle(fixture);
    expect(await documents.previewStatus(doc.id)).toBe(status);
    expect(sandbox.calls).toHaveLength(0);
  });

  it("dosya adı hiçbir anahtar ya da yol kurmaz", async () => {
    const doc = await uploadAndHandle("kucuk.pdf", { fileName: "../../tenant-b/rapor.pdf" });
    expect(new Set(storage.reads)).toEqual(new Set([`incoming/tenant-a/${doc.id}`]));
    expect(storage.writes).toEqual([`previews/tenant-a/${doc.id}.png`]);
  });

  it("belge kimliğinden fazlasını taşıyan mesaj reddedilir", async () => {
    const docOfB = await seed.upload({ tenant: "tenant-b", fixture: "kucuk.pdf" });
    await expect(worker.handle({ documentId: docOfB.id, tenantId: "tenant-a" })).rejects.toThrow(/unexpected field/);
    expect(storage.writes).toHaveLength(0);
  });

  it("hep çöken dosya üç denemeden sonra ölü mektup kuyruğuna gider", async () => {
    const doc = await seed.upload({ tenant: "tenant-a", fixture: "kucuk.pdf" });
    sandbox.failAlwaysFor(doc.id);
    await queue.drain();
    expect(await deadLetters.ids()).toContain(doc.id);
    expect(await documents.previewStatus(doc.id)).toBe("failed");
  });
});
```

OWASP'ın test rehberindeki kötü niyetli dosya yükleme testi (`WSTG-BUSL-09`, v4.2) aynı listeyi dışarıdan dener: arşiv içinden dizin geçişi, zip bombası, zararlı içerik. Rehber bomba denemesini ancak riskler değerlendirilip yazılı onay alındıktan sonra yapmayı şart koşar; otomatik ölçeklenen bir altyapıda bomba bir maliyet kalemine de dönüşebilir. Yukarıdaki testler bu yüzden yerel ya da yetkili test ortamında, sınırları test yapılandırmasıyla belirlenmiş küçük dosyalarla koşar.

Testlerin sınırı da yazılmalı. Bu testler tablodaki tehditleri ve bu kod yolunu kanıtlar; tabloya hiç girmemiş bir akışı bulmaz. Önizlemeler bir gün e-postayla gönderilmeye başlandığında diyagramda yeni bir akış ve büyük olasılıkla yeni bir sınır geçişi doğar; model güncellenmezse testler yeşil kalmaya devam eder. Top 10'u okuduğumuz yazıdaki kural burada da geçerli: kanıt, kapsadığı kadar konuşur.

## Model değişiklikle birlikte yaşar

Tehdit modelinin en sık ölüm nedeni bayatlamaktır. Manifesto'nun beş değerinden ikisi doğrudan buna karşıdır: tek bir teslim yerine sürekli iyileştirme ve bir güvenlik ya da mahremiyet fotoğrafı yerine bir anlayış yolculuğu. Kaçınılacak kalıplar arasında kusursuz temsil arayışını da sayar: tek bir ideal görünüm yoktur, birden çok temsil farklı sorunları aydınlatır. A06:2025'in önerisi de modeli değişikliğin konuşulduğu yere, iş kalemlerinin oturumlarına taşımaktır.

Pratikte bu üç alışkanlığa dönüşür. Model, kodun yanında ve kodla aynı inceleme sürecinden geçen bir dosyada yaşar: diyagramın kaynağı ve tehdit tablosu. Her tehdit satırının bir cevabı vardır; azaltma cevabı bir test dosyasına, kabul cevabı bir kişinin adına ve bir gözden geçirme tarihine bağlıdır. Değişiklik açıklamasında da tek bir soru durur: bu değişiklik yeni bir veri akışı, veri deposu, dış varlık, sınırı geçen yeni bir alan ya da yeni bir yetki ekliyor mu? Cevap evetse model aynı değişiklikte güncellenir. Kayıt şöyle görünebilir:

```yaml
feature: belge-onizleme
diagram: docs/threat-model/belge-onizleme.md
reviewed: 2026-10-21
threats:
  - id: T4
    crossing: "4-5 kuyruk → işçi"
    stride: [T, E]
    response: mitigate
    requirement: v5.0.0-5.3.2
    test: tests/preview/boundaries.spec.ts
  - id: T9
    crossing: "hata kenarı"
    stride: [D]
    response: accept
    owner: önizleme ekibinin teknik lideri
    review_by: 2027-01-31
    note: "Bir kullanıcı kendi kiracısının önizlemelerini yavaşlatabilir; kiracı başına sınır etkiyi o kiracıda tutar."
```

Bu dosya bir kanıt değildir; Top 10'u okuduğumuz yazıdaki kanıt dosyası gibi bir kapının girdisidir. Kapı iki kuralı denetleyebilir: her azaltma satırının test dosyası mevcuttur ve bu yapıda koşmuştur; her kabul satırının bir sahibi ve geçmemiş bir gözden geçirme tarihi vardır. Kapı tehdit bulmaz. Tehdidi insanlar bulur; kapı yalnızca bulunmuş bir tehdidin sessizce düşmesini engeller.

## Karar kartı

- **Varsayım:** "İşçi iç ağda ve yalnızca kendi API'mizin yazdığı mesajları okuyor; girdisi güvenilir."
- **Güven sınırı:** Dosyayı seçen herhangi bir kullanıcı ile bütün kiracılara yetkili önizleme işçisi arasında; ikinci sınır, kimlik bilgisini tutan işçi ile baytları ayrıştıran dönüştürücü arasında. Sınırı ağ konumu değil, verinin kökeni ve vardığı sürecin yetkisi belirler.
- **Karar:** Mesaj yalnızca sunucunun ürettiği belge kimliğini taşır; işçi kiracıyı, anahtarı ve beklenen türü veritabanından, gerçek türü ve piksel boyutunu içerikten yeniden türetir. Dönüştürücü kimlik bilgisi ve ağı olmayan, kaynakları sınırlı ayrı bir süreçte çalışır; yalıtım yanıt vermezse önizleme bekler, işçide dönüştürülmez. Üç denemeden sonra ölü mektup kuyruğu.
- **Somut risk:** Bir kullanıcının yüklediği dosyanın işçinin yetkisiyle başka kiracıların dosyalarına ulaşması; tek bir sıkıştırma bombası ya da piksel seliyle önizleme hattının bütün kiracılar için durması.
- **Doğrulanabilir özellik:** `v5.0.0-5.3.2` (yollar ve anahtarlar sunucuda üretilir), `v5.0.0-5.2.2` (içerik uzantının türüyle tutarlı), `v5.0.0-5.2.3` (girdi sayısı ve açılmış boyut açmadan önce), `v5.0.0-15.2.5` (tehlikeli işlev yalıtılır), `v5.0.0-8.4.1` (kiracılar arası denetim).
- **Negatif test:** Türü uyuşmayan dosya, 60 MiB'a açılan 61 KB'lık DOCX, 20.000 × 20.000 piksellik PNG, adında `../` olan dosya ve fazladan alan taşıyan mesaj: hepsinde önizleme yok, nesne deposunda yan etki yok. Hep çöken dosya üç denemede ölü mektup kuyruğunda; yalıtım içinden ağ bağlantısı başarısız.
- **Üretimde sinyal:** Ret nedenine göre sayaçlar (tür uyuşmazlığı, arşiv sınırı, piksel sınırı); yalıtımda kaynak sınırına takılan dönüşümler; ölü mektup kuyruğunun derinliği ve kiracı başına bekleme süresi; işçinin nesne deposunda reddedilen erişim denemeleri.
- **Kalan risk:** Model yalnızca çizilen akışları kapsar ve değişiklikle bayatlar. Yalıtım ayrıştırıcının ele geçirilmesini engellemez, etkisini sınırlar. Dönüştürücünün çıktısı da güvenilmeyen veridir ve kullanıcıya nasıl sunulacağı ayrı bir sınır sorusudur. Kabul edilen bir risk, sahibi yazılmadıkça kimsenin değildir.

### Sırada ne var

Sınırı çizdik ve her geçişe bir karar ile bir test bağladık. Ama aynı kod iki ortamda farklı davranabilir: modelde kapalı diye yazılan bir hata ayıklama ucu üretimde açık kalabilir, test ortamında kısıtlı tutulan bir ayrıştırıcı ayarı üretime gevşetilmiş gidebilir. Kodun çevresindeki ayarlar da birer güvenlik kararıdır ve çoğu zaman kimse onları kod gibi incelemez. Sıradaki yazı yapılandırmayı kodla aynı inceleme ve test disiplinine sokuyor: güvenli varsayılanlar.

## Kaynakça

- OWASP Cheat Sheet Series. *Threat Modeling Cheat Sheet*. OWASP Foundation. Erişim: 21 Ekim 2026. [Bağlantı](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html)
- Braiterman, Z., Shostack, A., Marcil, J., de Vries, S., Michlin, I., Wuyts, K., Hurlbut, R., Schoenfield, B. S. E., Scott, F., Coles, M., Romeo, C., Miller, A., Tarandach, I., Douglen, A. & French, M. (2020). *Threat Modeling Manifesto*. Erişim: 21 Ekim 2026. [Bağlantı](https://www.threatmodelingmanifesto.org/)
- van der Stock, A., Glas, B., Smithline, N., Janca, T. & Gigler, T. (2025). *A06:2025 – Insecure Design*. OWASP Top 10:2025. OWASP Foundation. Erişim: 21 Ekim 2026. [Bağlantı](https://top10.owasp.org/2025/A06_2025-Insecure_Design/)
- MITRE. *CWE-501: Trust Boundary Violation*. Common Weakness Enumeration, CWE List Version 4.20. Erişim: 21 Ekim 2026. [Bağlantı](https://cwe.mitre.org/data/definitions/501.html)
- MITRE. *CWE-409: Improper Handling of Highly Compressed Data (Data Amplification)*. Common Weakness Enumeration, CWE List Version 4.20. Erişim: 21 Ekim 2026. [Bağlantı](https://cwe.mitre.org/data/definitions/409.html)
- MITRE. *CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')*. Common Weakness Enumeration, CWE List Version 4.20. Erişim: 21 Ekim 2026. [Bağlantı](https://cwe.mitre.org/data/definitions/22.html)
- OWASP ASVS Projesi (2025). *OWASP Application Security Verification Standard 5.0.0* — V5 File Handling. OWASP Foundation. [Bağlantı](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x14-V5-File-Handling.md)
- OWASP ASVS Projesi (2025). *OWASP Application Security Verification Standard 5.0.0* — V15 Secure Coding and Architecture; V8.4 Other Authorization Considerations. OWASP Foundation. [Bağlantı](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x24-V15-Secure-Coding-and-Architecture.md)
- OWASP Cheat Sheet Series. *File Upload Cheat Sheet*. OWASP Foundation. Erişim: 21 Ekim 2026. [Bağlantı](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
- OWASP WSTG Projesi (2020). *Web Security Testing Guide v4.2* — WSTG-BUSL-09: Test Upload of Malicious Files. OWASP Foundation. [Bağlantı](https://wstg.owasp.org/v4.2/4-Web_Application_Security_Testing/10-Business_Logic_Testing/09-Test_Upload_of_Malicious_Files/)
- Souppaya, M., Scarfone, K. & Dodson, D. (2022). *Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities* (NIST SP 800-218) — PW.1.1, PW.1.2. NIST. [Bağlantı](https://doi.org/10.6028/NIST.SP.800-218)
- Blume, C., Lemieux, P.-A., Lilley, C., Needham, C., Rosenthol, L., Seeger, C. A., Thompson, S. & Truta, C. (Ed.) (2025). *Portable Network Graphics (PNG) Specification (Third Edition)*. W3C Recommendation, 24 Haziran 2025. [Bağlantı](https://www.w3.org/TR/2025/REC-png-3-20250624/)
