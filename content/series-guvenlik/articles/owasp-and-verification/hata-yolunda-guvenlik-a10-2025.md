---
article_id: article_c3e84f7f-8430-44d0-aed2-0310c75d4a95
title: "Hata Yolunda Güvenlik: A10:2025'ten Doğrulanabilir Gereksinime"
slug: hata-yolunda-guvenlik-a10-2025
category: owasp-and-verification
level: advanced
reading_order: 2
summary: "A10:2025'i bir belge paylaşım servisinin hata yollarında okur: yetki servisi cevap vermediğinde kodun izin dalına düşmesi, iç ayrıntı sızdıran hata yanıtı ve yarım kalan işlem. Üçünü ASVS 5.0.0'ın V16.5 gereksinimlerine, hata enjeksiyonlu negatif testlere ve üretim sinyallerine çevirir; fail-closed kararının erişilebilirlik bedelini ve fail-open'ın hangi koşulda bilinçli bir ürün kararı olabileceğini tartışır."
tags:
  - a10-2025
  - fail-closed
  - hata-isleme
  - asvs
  - negatif-test
content_hash: sha256:bd88bc2427fc7ceb626ddfd528ad64d501c57823e4864216291fa70f77bbcf10
classification_version: 1
classification_batch: 0
---
## Yetki servisi cevap vermediğinde

Çok kiracılı bir ürünün belge paylaşım servisi, `POST /documents/{id}/shares` çağrısıyla bir belge için alıcıya özel bir paylaşım bağlantısı üretiyor. Kimin hangi belgeyi paylaşabileceğine servis kendisi karar vermiyor; kararı merkezi bir politika servisine soruyor. Bir akşam politika servisinin cevap süresi istemcinin zaman aşımı eşiğini geçiyor. Kayıtlar "policy check failed" uyarılarıyla doluyor, ama kimse çağrılmıyor, çünkü paylaşım özelliği çalışmaya devam ediyor. Fazlasıyla çalışıyor: belgeyi yalnızca görüntüleme yetkisi olan kullanıcılar da paylaşım bağlantısı üretebiliyor.

Kod şöyle:

```ts
// Kırılgan sürüm: eğitim amaçlı, kontrollü örnek.
// Kırılan özellik: yetki kararı alınamadığında işlem gerçekleşmemeli.
async function createShare(user: User, documentId: string, recipient: string) {
  const decision = await policy
    .check({ subject: user.id, action: "document:share", resource: documentId })
    .catch((err) => {
      log.warn("policy check failed", { err });
      return undefined;
    });

  if (decision?.denied) {
    throw new HttpError(403, "forbidden");
  }
  return shares.create({ documentId, recipient, createdBy: user.id });
}
```

Hata tam oluştuğu yerde yakalanıyor, kaydediliyor ve kod devam ediyor. İki karar hatayı izne çeviriyor. Birincisi `catch`, istisnayı `undefined` değerine dönüştürüyor. İkincisi koşul olumsuz kurulmuş: yalnızca açık bir ret işlemi durduruyor, ret olmayan her şey geçiyor. `undefined` geçiyor, boş bir nesne geçiyor; politika ekibi bir sürüm yükseltmesinde alanın adını değiştirse, hiçbir kesinti olmadan bütün istekler geçiyor.

Saldırganın özel bir beceriye ihtiyacı yok. Kimliği doğrulanmış, paylaşma yetkisi olmayan bir kullanıcı yeterli; politika servisinin yavaşladığı anı bekleyebilir ya da istek başına pahalı politika değerlendirmeleri tetikleyerek o anı kendisi yaratabilir. Korunan varlık, başkalarının belgelerinin gizliliği. Güven sınırı uygulama ile politika servisi arasındaki çağrıda: karar sürecin dışından geliyor ve her biçimde gelebilir, ya da hiç gelmeyebilir.

Bu tam olarak OWASP Top 10'un 2025'te açtığı yeni kategorinin konusu. Bu yazının işi, o kategoriyi bu servis için doğrulanabilir bir gereksinime, gereksinimi bir negatif teste ve testi üretimde izlenecek bir sinyale çevirmek; sonra bunun bedelini hesaba katmak.

## A10:2025'i okumak: bir davranış ailesi

A10:2025, **istisnai durumların yanlış ele alınması (Mishandling of Exceptional Conditions)**, listenin 2025'te eklenen kategorisi. Yirmi dört CWE içeriyor ve bunların bir kısmı daha önce genel bir "kötü kod kalitesi" başlığında duruyordu; yazarlar o başlığı fazla genel bulup daha belirli bir kategori kurmuşlar. Kategori sayfası istisnai durumun nasıl yanlış ele alındığını üç başarısızlıkla tanımlıyor: program olağan dışı durumun oluşmasını önlemiyor, oluşurken fark etmiyor ya da sonrasında kötü tepki veriyor veya hiç tepki vermiyor.

Kategorinin CWE listesi bir davranış ailesi gibi okunur. İç ayrıntı sızdıran hata mesajları (CWE-209, 215, 550), fark edilip üzerine bir şey yapılmayan hatalar (CWE-252 denetlenmeyen dönüş değeri, CWE-390 eylemsiz hata tespiti, CWE-391), fazla geniş yakalama ve bildirme (CWE-396, 397), eksik ya da fazladan parametrenin ele alınmaması (CWE-234, 235) ve bu yazının asıl konusu: **CWE-636, güvenli başarısız olmamak (Not Failing Securely, "Failing Open")**. MITRE'nin tanımıyla bu zayıflıkta ürün bir hata ya da arızayla karşılaştığında tasarımı onu mevcut seçenekler arasında daha az güvenli bir duruma düşürür: en zayıf şifreleme algoritmasını seçmek ya da en serbest erişim kuralını uygulamak gibi. Tanımın açıklaması tipik gerekçeyi de yazıyor: yönetim ve destek maliyetini azaltmak için "işlevsel kalarak" başarısız olmayı, güvenli kalarak başarısız olmaya tercih etmek.

Kategori sayfasının önerilerini dikkatle okumak gerekiyor. Sayfa her hatanın oluştuğu yerde yakalanıp ele alınmasını, bunun üstüne bir de genel hata işleyicisi bulunmasını öneriyor. Yukarıdaki kırılgan kod tam olarak bunu yapıyor: hatayı oluştuğu satırda yakalıyor ve kaydediyor. Aynı kategori CWE-396'yı (genel istisnayı yakalamak) ve CWE-390'ı (hatayı fark edip doğru eylemi yapmamak) da listeliyor; yani "yakalamak" güvenlik özelliğinin kendisi değil. Özellik, hatadan sonra sistemin hangi durumda kaldığıyla ilgili: bir güvenlik kararının her çıkış yolu tanımlı ve güvenli bir duruma varmalı. Kategori sayfasının bir başka önerisi bunu açıkça söylüyor: bir işlemin ortasında hata olursa işlemin her parçası geri alınmalı ve yazarlar buna "failing closed" diyor. Yarım kalmış bir işlemi ortasından kurtarmaya çalışmak, kaynağın ifadesiyle, düzeltilemez hataların çoğu zaman doğduğu yerdir.

Top 10:2025'i okuduğumuz yazıda bir kategori tablosunun test kapsamı ile yaygınlığı ayrı ayrı verdiğini görmüştük; A10:2025'in tablosunda kapsama yine yüzde yüz, ortalama yaygınlık yüzde 2,95. Bu sayı bize servisimizin bu zayıflığı taşıyıp taşımadığını söylemez. Söyleyecek olan, aşağıda kuracağımız test.

## Üç cevap: izin, ret ve karar alınamadı

Paylaşım servisinin bakış açısından politika servisinin üç olası cevabı var. **İzin**: geçerli biçimde gelmiş açık bir "evet". **Ret**: geçerli biçimde gelmiş açık bir "hayır". Üçüncüsü ise bir cevap değil, cevabın yokluğu: zaman aşımı, reddedilen bağlantı, 5xx durum kodu, ayrıştırılamayan gövde, eksik ya da yanlış tipte alan, bilinmeyen bir şema sürümü. Bu üçüncü duruma bu seride **karar alınamadı** diyeceğiz. Ret değildir; politika servisi "hayır" demedi, hiçbir şey diyemedi.

Bir sistemin üçüncü durumu nasıl ele aldığı iki adla anılır. **Fail-open**, karar alınamadığında izin verici duruma düşmektir: işlem yapılır. **Fail-closed**, kısıtlayıcı duruma düşmektir: işlem yapılmaz. Yaygın iki altyapı bileşeni bu seçimi açık bir ayar olarak sunuyor ve varsayılanı kapalı tutuyor. Envoy'un dış yetkilendirme filtresinde `failure_mode_allow` ayarı yanlışken (varsayılan budur) yetki servisiyle iletişim kurulamadığında ya da servis 5xx döndüğünde istemci isteği reddedilir; doğruyken istek kabul edilir. Kubernetes'in kabul denetimi kancalarında (admission webhooks) `failurePolicy: Fail` (varsayılan) kanca çağrısındaki hatada API isteğini reddeder, `Ignore` ise hatayı yok sayıp isteği geçirir; doğru iletilmiş açık bir ret ise bu ayardan bağımsız olarak her zaman reddeder. İki örnekte de karar koda gömülü bir `catch` bloğunda değil, adı olan, incelenebilen bir ayarda duruyor.

Envoy örneğinde bir ayrıntı daha var: yetki servisi hata verdiğinde istemciye dönen varsayılan durum kodu 403'tür. İstemcinin gözünden ret ile karar alınamadı aynı görünür. Paylaşım servisinde ikisini bilerek ayıracağız: açık ret için 403, karar alınamadığında 503. Fark yalnızca estetik değil. Bir istemci 503'ü bir süre sonra yeniden deneyebilir, 403'ü denememelidir. Kullanıcıya gösterilecek mesaj farklıdır: "yetkin yok" ile "şu an karar verilemiyor, biraz sonra dene" aynı cümle değildir. Ve gözlem farklıdır: 503'lerdeki ani artış bir bağımlılık arızasıdır, 403'lerdeki ani artış bir yetki değişikliğinin ya da kötüye kullanım denemesinin işareti olabilir. İki sinyali aynı sayaçta toplamak ikisini de körleştirir.

Düzeltilmiş yetki fonksiyonu yalnızca geçerli biçimdeki açık izni geçirir ve diğer her şeyi iki sınıftan birine koyar:

```ts
type Decision = { allowed: boolean };

export class Forbidden extends Error {}
export class PolicyUnavailable extends Error {}

function isDecision(value: unknown): value is Decision {
  return typeof (value as Partial<Decision> | null)?.allowed === "boolean";
}

export async function authorize(user: User, action: string, resource: string): Promise<void> {
  let decision: unknown;
  try {
    decision = await policy.check({ subject: user.id, action, resource });
  } catch (err) {
    metrics.authz.inc({ action, outcome: "indeterminate", reason: reasonOf(err) });
    throw new PolicyUnavailable("policy decision unavailable", { cause: err });
  }
  if (!isDecision(decision)) {
    metrics.authz.inc({ action, outcome: "indeterminate", reason: "malformed" });
    throw new PolicyUnavailable("malformed policy decision");
  }
  if (decision.allowed !== true) {
    metrics.authz.inc({ action, outcome: "deny" });
    throw new Forbidden();
  }
  metrics.authz.inc({ action, outcome: "allow" });
}
```

Politika istemcisinin de iki görevi var: zaman aşımını kendisi koymak ve HTTP hatasını bir istisnaya çevirmek. İkincisi göründüğünden önemli; nedenini birazdan göreceğiz.

```ts
async function check(input: CheckInput): Promise<unknown> {
  const res = await fetch(POLICY_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(800),
  });
  if (!res.ok) throw new PolicyHttpError(res.status);
  return res.json();
}
```

Son halka, istisnayı yanıta çeviren merkezi işleyici. `Forbidden` 403'e, `PolicyUnavailable` 503'e gider; tanımadığı her şey için varsayılan dal 500'dür ve hiçbir koşulda bir başarı kodu değildir. ASVS'nin **son çare hata işleyicisi (last resort error handler)** dediği şey budur: yakalanmamış istisnaların hem kayda düşmesini hem de süreci düşürmemesini sağlar. Bu işleyicinin kendisi de yanlış kurulabilir; bilinmeyen hatayı "boş ama başarılı" bir yanıta çeviren bir genel işleyici, bütün uygulamayı tek noktadan fail-open yapar.

Şekil 1, aynı üç cevap sınıfının iki kod sürümünde nereye vardığını gösteriyor. Fark yalnızca üçüncü sütunda.

![Üstte politika servisinin cevabı kutusu, altında üç sütun: izin, yani allowed true; ret, yani allowed false; karar alınamadı, yani zaman aşımı, 5xx, bozuk ya da eksik gövde, eski şema. Altında iki satır var. Kırılgan kodun satırı, yalnızca açık ret durdurur: izin sütununda paylaşım oluşur, ret sütununda 403, karar alınamadı sütununda vurgulu biçimde paylaşım oluşur, fail-open. Düzeltilmiş kodun satırı, yalnızca açık izin geçer: izin sütununda 201 ve denetim kaydı, ret sütununda 403 ve ret sayacı, karar alınamadı sütununda 503, yan etki yok ve karar alınamadı sayacı.](assets/uc-cevap-iki-politika.svg "Şekil 1 — Aynı üç cevap, iki kod: fark yalnızca karar alınamadığında")

> **Teşhis et:** Bir ekip arkadaşın, aşağıdaki sürümde `catch` olmadığı için fail-open olamayacağını söylüyor. Haklı mı? Hangi cevapta izin dalına düşülür?

```ts
const res = await fetch(POLICY_URL, { method: "POST", body, signal: AbortSignal.timeout(800) });
const { allowed } = await res.json();
if (allowed === false) throw new HttpError(403, "forbidden");
// devam: paylaşım oluşturulur
```

Haklı değil; iki ayrı yoldan fail-open. Birincisi durum kodu: `fetch` yalnızca ağ hatasında ya da istek iptal edildiğinde reddeder. Fetch standardına göre sunucunun döndürdüğü her HTTP yanıtı, 503 de dahil, başarıyla çözülen bir sözdür. Politika servisi yük altındayken `503` ve `{"error":"overloaded"}` döndürürse `allowed` tanımsız kalır, `false` değildir ve kod devam eder. İkincisi koşulun biçimi: `allowed === false` yalnızca tam olarak `false` değerini durdurur; `null`, `"false"` dizgesi ya da yeniden adlandırılmış bir alan geçer. Zaman aşımı yolu ise burada kapalı kalır, çünkü `AbortSignal.timeout` sinyali bir `TimeoutError` ile iptal eder, `fetch` sözü bu hatayla reddedilir ve istisna yukarı çıkar; bu da yalnızca merkezi işleyici onu bir hata yanıtına çevirdiği sürece geçerlidir. İyi bir cevap durum kodunun denetlenmemesini ve olumsuz koşulu ayrı ayrı adlandırır. Zayıf cevap "araya try/catch ekleyelim" demektir: yazının başındaki sürümde bir `catch` vardı ve en kötüsü oydu.

## İşlemin ortası: kısmi başarısızlık

Paylaşım servisinin bir güvenlik değişmezi daha var: her paylaşım bağlantısının bir denetim kaydı bulunur. Kimin hangi belgeyi kiminle paylaştığı sorusu, bir veri sızıntısı araştırmasında ilk sorulan sorudur ve cevabı bu kayıttır. Kırılgan sürüm iki adımı ayrı ayrı yapıyor:

```ts
// Kırılgan sürüm: paylaşım kalıcı olduktan sonra kayıt yazılıyor.
const share = await shares.create({ documentId, recipient, createdBy: user.id });
await audit.write({ type: "document.shared", shareId: share.id, actor: user.id });
```

Kayıt servisi o anda yanıt vermezse paylaşım veritabanında kalır, kaydı ise hiç yazılmaz. Değişmez bozulmuştur ve bunu fark edecek bir şey yoktur. Kayıt yazımının yük altında başarısız olduğunu fark eden bir kullanıcı, iz bırakmadan paylaşım üretmenin yolunu da bulmuş olur. Bu bir **kısmi başarısızlıktır (partial failure)**: çok adımlı bir işlemin bir kısmı kalıcı olmuş, kalanı olmamıştır. A10:2025'in kendi örnek senaryosu aynı biçimde: bir para transferi borçlandırma, alacaklandırma ve kayıt adımlarından oluşur; araya giren bir ağ kesintisinden sonra işlem bütünüyle geri alınmazsa saldırgan hesabı boşaltabilir ya da yarış koşuluyla aynı parayı birden çok kez gönderebilir.

Düzeltme, iki yazmayı tek bir işlemde birleştirmek. Paylaşım satırı ve denetim olayı aynı veritabanı işleminde yazılır; olay bir **giden kutusu (outbox)** tablosuna konur ve ayrı bir yayımlayıcı onu denetim deposuna taşır:

```ts
const share = await db.transaction(async (tx) => {
  const created = await tx.shares.insert({ documentId, recipient, createdBy: user.id });
  await tx.auditOutbox.insert({
    type: "document.shared",
    shareId: created.id,
    actor: user.id,
    occurredAt: new Date().toISOString(),
  });
  return created;
});
```

İşlem başarısız olursa ikisi de yoktur; başarılı olursa ikisi birlikte kalıcıdır. Denetim deposu o an kapalıysa olay giden kutusunda bekler ve yayımlayıcı yeniden dener. Değişmezin yeni biçimi şu: kayıt gecikebilir, ama kaybolamaz. Bedeli de açık: ek bir tablo, ek bir arka plan süreci ve denetim deposunda görünürlüğün gecikmesi. Şekil 2 iki sırayı yan yana koyuyor.

![İki satır. Üst satır, ayrı adımlar ve kırılgan sıra: paylaşım yazılır ve commit edilir kutusundan, denetim kaydı yazılır kutusuna ok gider; bu kutuda hata yazar, kayıt servisi düştü; sonra vurgulu son durum kutusu: paylaşım var, kayıt yok. Alt satır, tek işlem ve paylaşım ile outbox birlikte: işlem başlar, paylaşım ve outbox satırı kutusundan commit kutusuna ok gider, ikisi birlikte kalıcı; oradan yayımlayıcı kutusuna, outbox'tan denetim deposuna. İşlem kutusundan aşağıya inen ok hata olursa geri alma kutusuna varır: ikisi de yok. Yanında not: kayıt gecikebilir ama kaybolmaz, teslim yayımlayıcının yeniden denemesiyle.](assets/yarim-kalan-paylasim.svg "Şekil 2 — Yarım kalan paylaşım: ayrı adımlar ile tek işlem")

İki seçeneği daha düşünmek gerekiyor. Kaydı önce, paylaşımı sonra yazmak tersi yönde bir yarım iş bırakır: paylaşım oluşturulamadığında sahte bir "paylaşıldı" kaydı kalır. Bu daha az zararlıdır ama bir soruşturmayı yanıltır; tek işlem iki yarım durumu da ortadan kaldırır. Denetim deposu ile paylaşım tablosu aynı veritabanında değilse dağıtık bir işlem yerine giden kutusu deseni tam olarak bu ayrılığı yönetmek için vardır.

> **Teşhis et:** Ekipten biri şunu öneriyor: denetim kaydı yazılamazsa paylaşımı yine oluşturalım, kaydı bellek içi bir kuyrukta tutup birkaç kez yeniden deneyelim; kullanıcı beklemesin. Bu tasarım hangi güvenlik özelliğini zayıflatır ve hangi anda tamamen kaybeder?

"Her paylaşımın denetim kaydı vardır" özelliğini bir garantiden en iyi çabaya indirir. Süreç ayakta kaldığı sürece yeniden denemeler büyük olasılıkla başarılı olur; ama kuyruk boşalmadan gelen bir çökme, dağıtım ya da bellek taşması anında paylaşım kalır ve kayıt kalıcı olarak kaybolur. Bu, denetim tarafının fail-open'ıdır. İyi bir cevap "kayıt gecikebilir" ile "kayıt kaybolabilir"i ayırır: ilki, kayıt paylaşımla aynı işlemde kalıcı bir giden kutusuna yazılıyorsa kabul edilebilir; ikincisi değildir. Ekip yine de en iyi çabayı seçecekse bunun bir risk kabulü olduğunu ve kimin adına kabul edildiğini yazması gerekir. Zayıf cevap yeniden deneme sayısını tartışır; sorun deneme sayısı değil, denemenin nerede tutulduğudur.

## Hata yanıtı ne söyler, kayıt ne söyler

Hata yolunun üçüncü yüzü, istemciye ne söylendiği. Paylaşım servisinin eski hâli yinelenen bir paylaşımda şunu döndürüyordu:

```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{"error":"duplicate key value violates unique constraint \"shares_document_recipient_key\"","stack":"at SharesRepo.create (src/shares/repo.ts:41:11)"}
```

Bu yanıt tablo adını, kısıt adını ve dolayısıyla şemanın bir parçasını, kaynak dosyasının yolunu ve hata metniyle veritabanı motorunu anlatıyor. A10:2025'in ikinci örnek senaryosu bunun nasıl kullanıldığını yazıyor: saldırgan hataları bilerek tetikleyip dönen sistem bilgisini daha iyi bir SQL enjeksiyonu kurmak için keşif olarak kullanır. Bu CWE-209'dur. ASVS 5.0.0'ın karşılığı açık: `v5.0.0-16.5.1` (ikinci seviye), beklenmeyen ya da güvenlik açısından hassas bir hata oluştuğunda tüketiciye genel bir mesaj döndürülmesini ve yığın izi, sorgu, gizli anahtar ve belirteç gibi iç verinin açığa çıkmamasını ister.

Burada iki tür hatayı ayırmak gerekiyor. Yinelenen paylaşım beklenen bir durumdur ve API'nin tanımlı davranışının parçası olmalıdır: 409 ya da var olan paylaşımı döndüren **eşgüçlü (idempotent)** bir cevap, yani aynı isteğin ikinci kez gelmesinin ilkinden farklı bir sonuç üretmediği bir cevap. Beklenmeyen hata ise genel bir 500'dür. Genel yanıtın da bir biçimi olmalı ki istemciler onu tutarlı işleyebilsin. HTTP API'leri için bu biçim RFC 9457'deki **Problem Details** yapısıdır (Temmuz 2023, RFC 7807'nin yerini aldı; OWASP'ın hata işleme rehberi Ekim 2026 itibarıyla eski numarayı anıyor):

```http
HTTP/1.1 503 Service Unavailable
Content-Type: application/problem+json
Retry-After: 5

{
  "type": "https://docs.example.test/problems/authz-unavailable",
  "title": "Yetki kararı şu an alınamıyor",
  "status": 503,
  "correlationId": "c-7f3a9e"
}
```

Ayrıntı kaybolmuyor; yer değiştiriyor. `correlationId` alanı, yani **korelasyon kimliği (correlation id)**, istemcinin elindeki yanıtla sunucudaki kayıt satırını birbirine bağlar. Kayıt tarafının gereksinimi `v5.0.0-16.3.4` (ikinci seviye): beklenmeyen hataların ve arka uçtaki TLS hataları gibi güvenlik kontrolü hatalarının kaydedilmesi. Karar alınamadığında yazılan satır eylemi, kaynak kimliğini, kullanıcı kimliğini, nedeni (zaman aşımı, 5xx, bozuk gövde) ve korelasyon kimliğini taşır; belirteç, oturum bilgisi ya da belge içeriği taşımaz. Bir güvenlik olayının nasıl kaydedileceği ve hangisinin uyarıya dönüşeceği, kendi yazısını hak eden ayrı bir tasarım sorusu.

## Gereksinimden teste: hata matrisi

Şimdi kategoriyi doğrulanabilir hâle getirebiliriz. ASVS 5.0.0'ın V16.5 bölümü hata işlemeyi dört gereksinimle yazıyor; kayıt bölümünden bir gereksinimle birlikte bu servisteki karşılıkları ve kanıtları şöyle:

| Gereksinim | Bu serviste | Kanıt |
|---|---|---|
| `v5.0.0-16.5.3` (L2) | Yetki kararı alınamazsa paylaşım oluşmaz | hata matrisi testi |
| `v5.0.0-16.5.1` (L2) | İstemci genel mesaj alır, iç ayrıntı almaz | yanıt gövdesi testi |
| `v5.0.0-16.5.2` (L2) | Politika servisi düşünce servis güvenli çalışır | zaman aşımı ve devre kesici testi |
| `v5.0.0-16.5.4` (L3) | Yakalanmayan istisna 500'e çevrilir | son çare işleyici testi |
| `v5.0.0-16.3.4` (L2) | Karar alınamadığı kaydedilir | kayıt testi |

`v5.0.0-16.5.3` metninde fail-open adıyla geçiyor: uygulama, bir istisna oluştuğunda da dahil, kontrollü ve güvenli biçimde başarısız olmalı ve doğrulama mantığından gelen hatalara rağmen bir işlemin yapılması gibi fail-open durumlarını önlemelidir. Bunu sınayan test, politika servisinin verebileceği her bozuk cevabı tek tek enjekte eder. **Hata enjeksiyonu (fault injection)**, bağımlılığa testte bilerek hata verdirmektir; dışarıdan test eden birinin ulaşamadığı yolu içeriden açar:

```ts
const failures: Array<[string, () => Promise<unknown>]> = [
  ["zaman aşımı", () => Promise.reject(new DOMException("timeout", "TimeoutError"))],
  ["bağlantı reddi", () => Promise.reject(Object.assign(new Error("connect"), { code: "ECONNREFUSED" }))],
  ["5xx yanıt", () => Promise.reject(new PolicyHttpError(503))],
  ["boş gövde", () => Promise.resolve({})],
  ["yanlış tip", () => Promise.resolve({ allowed: "true" })],
  ["eski şema", () => Promise.resolve({ denied: false })],
];

describe.each(failures)("politika servisi: %s", (_name, failure) => {
  it("paylaşım ve denetim kaydı oluşmaz, 503 döner, iç ayrıntı sızmaz", async () => {
    policy.check = failure;
    const res = await api.as(viewer).post(`/documents/${doc.id}/shares`, {
      recipient: "alici@example.test",
    });

    expect(res.status).toBe(503);
    expect(await shares.countFor(doc.id)).toBe(0);
    expect(await auditOutbox.countFor(doc.id)).toBe(0);
    expect(await res.text()).not.toMatch(/stack|ECONNREFUSED|policy\.internal|constraint/i);
  });
});

it("denetim kaydı yazılamazsa paylaşım geri alınır", async () => {
  policy.check = async () => ({ allowed: true });
  auditOutbox.failNextInsert(new Error("disk full"));
  const res = await api.as(editor).post(`/documents/${doc.id}/shares`, {
    recipient: "alici@example.test",
  });

  expect(res.status).toBe(500);
  expect(await shares.countFor(doc.id)).toBe(0);
});
```

Matrisin satırları rastgele değil: her biri ilk kırılgan sürümün izin dalına düşen bir cevaptır. "Eski şema" satırı kesinti olmadan fail-open'ı yakalar; "yanlış tip" satırı `"true"` dizgesinin bir izin olmadığını sabitler. Açık ret için 403 ve sıfır paylaşım, açık izin için 201 ve tam olarak bir giden kutusu satırı bekleyen iki pozitif test de matrisin yanında durur; yoksa her şeyi reddeden bir kod da bu testleri geçerdi.

OWASP'ın test rehberi aynı soruya dışarıdan yaklaşır. WSTG'nin hata işleme testi (`WSTG-ERRH-01`, v4.2) mevcut hata çıktısını bulmayı ve farklı çıktıları çözümlemeyi hedefler: girdi noktalarını beklenmeyen veriyle zorlamak, ayrıştırıcıyı bozacak girdiler göndermek, HTTP kurallarını kıran istekler denemek. Rehberin bir uyarısı yukarıdaki teşhisle aynı yere düşer: hatalar bazen bir başarı koduyla ve hata gövdesiyle, bazen bir yönlendirmenin arkasında döner. Dış test istemciye neyin sızdığını bulur; hata enjeksiyonu bağımlılık bozulduğunda kodun hangi dala düştüğünü bulur. İkisi birbirinin yerine geçmez.

Matrisin kanıtlamadığı şey de yazılmalı. Test yalnızca saydığın hata türlerini ve bu kod yolunu sınar. Toplu paylaşım ya da yönetici içe aktarması gibi `authorize` çağrısını hiç yapmayan ikinci bir yol varsa matris yeşil kalır. Top 10'u okuduğumuz yazıdaki "sıfır bulgu" kartının sorunu burada küçük ölçekte tekrar ediyor: kanıt, kapsadığı kadar konuşur.

## Üretimde: sinyal ve bedel

Üretimde izlenecek şey, kararın üç sonucunun ayrı ayrı sayılmasıdır: izin, ret ve nedeniyle birlikte karar alınamadı. Karar alınamadı oranındaki artış bir bağımlılık olayıdır ve uyarı üretmelidir; ret oranındaki kullanıcı başına sıçrama bir kötüye kullanım sinyali olabilir. Bir yerde bilinçli bir fail-open yolu bırakıldıysa onun da sayacı olmalı ve beklenen değeri sıfırdır. Hazırlık ortamında politika servisine düzenli aralıklarla hata verdirip 503 beklemek, testin üretime benzeyen bir ortamda da geçerli kaldığını gösterir.

Fail-closed'un bedeli erişilebilirliktir. Paylaşım artık politika servisi kadar ayaktadır; politika servisini zayıflatabilen bir saldırgan yetkisiz paylaşım üretemez ama yetkili paylaşımı da durdurabilir. Bu, bir gizlilik riskini bir erişilebilirlik riskine çevirmektir; çoğu durumda doğru takastır, yine de bir takastır. ASVS'nin `v5.0.0-16.5.2` gereksinimi tam bu durumu konu alır: dış kaynağa erişim başarısız olduğunda uygulamanın devre kesici ya da kontrollü bozulma (graceful degradation) gibi desenlerle güvenli çalışmaya devam etmesi. Kısa bir zaman aşımı ve bir **devre kesici (circuit breaker)**, politika servisi yanıt vermediğinde bekleyen isteklerin ve bağlantıların birikmesini engeller ve hatayı hızlı döndürür; böylece paylaşım dışındaki özellikler de onunla birlikte batmaz.

Bağımlılığı azaltmanın cazip yolu kararları önbelleğe almaktır ve burada başka bir gereksinimle karşılaşırsın. `v5.0.0-8.3.2` (üçüncü seviye), yetki kararlarının dayandığı değerlerdeki değişikliklerin hemen uygulanmasını ister; uygulanamıyorsa yetkisi kalkmış bir kullanıcının işlemini fark edip uyaran ve geri alan telafi edici kontroller ister ve bu alternatifin bilgi sızıntısını önlemeyeceğini açıkça not eder. "İzin" kararını beş dakikalığına önbelleğe almak, yetkisi alınan bir kullanıcının beş dakika daha paylaşım yapabilmesi demektir. Bu süre tehdit modeline yazılmış bir kabul olmalıdır, bir yan etki değil.

Fail-open bazen meşru bir ürün kararıdır. Bu bir standardın maddesi değil, bizim mühendislik ölçütümüz: dört koşul birlikte sağlanmalı. Karar gizliliği ya da bütünlüğü korumuyordur (bir öneri servisi, erişimi değil maliyeti koruyan bir kota); aşağı akışta kötüye kullanımı yakalayacak başka bir kontrol vardır; fail-open süre ve kapsamla sınırlıdır; ve görünürdür. Envoy'un `failure_mode_allow_header_add` ayarı son koşula iyi bir örnek: iki ayar birden açıkken yetki servisi ulaşılamaz olduğunda veya 5xx döndürdüğünde isteğe `x-envoy-auth-failure-mode-allowed: true` başlığı eklenir ve arkadaki servis isteğin hangi koşulda geçtiğini bilir. Bir kullanıcının veri üzerindeki eylemini yetkilendiren bir karar ilk koşulu hiçbir zaman sağlamaz.

## Karar kartı

- **Varsayım:** "Politika servisi her zaman cevap verir; vermezse kullanıcıyı engellemek daha kötüdür."
- **Güven sınırı:** Uygulama ile politika servisi arasındaki çağrı. Karar sürecin dışından gelir; her biçimde gelebilir ya da hiç gelmeyebilir.
- **Karar:** Yalnızca geçerli biçimdeki açık izin geçer; ret 403, karar alınamadı 503 olur. Paylaşım ve denetim olayı tek işlemde yazılır. İstemci genel bir hata alır, ayrıntı korelasyon kimliğiyle kayda gider.
- **Somut risk:** Politika servisi yavaşken ya da şeması değiştiğinde yetkisiz paylaşım bağlantısı üretilmesi; denetim kaydı olmayan paylaşım.
- **Doğrulanabilir özellik:** `v5.0.0-16.5.3`: karar alınamadığında işlem gerçekleşmez; `v5.0.0-16.5.1`: hata yanıtı iç ayrıntı taşımaz.
- **Negatif test:** Altı satırlık hata matrisi (zaman aşımı, bağlantı reddi, 5xx, boş gövde, yanlış tip, eski şema): her satırda 503, sıfır paylaşım, sıfır denetim olayı. Denetim yazımı hata verirse paylaşım geri alınır.
- **Üretimde sinyal:** İzin, ret ve karar alınamadı sayaçları ayrı tutulur; karar alınamadı oranına uyarı kurulur; bilinçli bir fail-open yolu varsa sayacının beklenen değeri sıfırdır.
- **Kalan risk:** Fail-closed, paylaşımın erişilebilirliğini politika servisine bağlar; karar önbelleği iptal gecikmesi yaratır; hata matrisi yalnızca saydığı hata türlerini ve bu kod yolunu kanıtlar, `authorize` çağrısını atlayan ikinci bir yolu bulmaz.

### Sırada ne var

Bu yazıda tek bir çağrının hata yollarını saydık ve hepsi önceden bildiğimiz bir sınırdan, uygulama ile politika servisi arasından geçiyordu. Gerçek bir özellikte kaç güven sınırı ve kaç hata yolu olduğunu kim, hangi yöntemle çıkarıyor? Sıradaki yazı bir dosya yükleme hattının veri akışını çizip her sınır geçişini bir tehdide ve doğrulanabilir bir gereksinime bağlıyor: tehdit modelleme.

## Kaynakça

- van der Stock, A., Glas, B., Smithline, N., Janca, T. & Gigler, T. (2025). *A10:2025 – Mishandling of Exceptional Conditions*. OWASP Top 10:2025. OWASP Foundation. Erişim: 21 Ekim 2026. [Bağlantı](https://top10.owasp.org/2025/A10_2025-Mishandling_of_Exceptional_Conditions/)
- MITRE. *CWE-636: Not Failing Securely ('Failing Open')*. Common Weakness Enumeration, CWE List Version 4.20. Erişim: 21 Ekim 2026. [Bağlantı](https://cwe.mitre.org/data/definitions/636.html)
- Envoy Project (2026). *External Authorization (proto): failure_mode_allow, status_on_error, failure_mode_allow_header_add*. Envoy v1.40.0 belgeleri. [Bağlantı](https://www.envoyproxy.io/docs/envoy/v1.40.0/api-v3/extensions/filters/http/ext_authz/v3/ext_authz.proto)
- The Kubernetes Authors. *Dynamic Admission Control: Failure policy*. Kubernetes belgeleri. Erişim: 21 Ekim 2026. [Bağlantı](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#failure-policy)
- OWASP ASVS Projesi (2025). *OWASP Application Security Verification Standard 5.0.0* — V16 Security Logging and Error Handling; V8.3 Operation Level Authorization. OWASP Foundation. [Bağlantı](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x25-V16-Security-Logging-and-Error-Handling.md)
- WHATWG. *Fetch Standard* — fetch() yönteminin ağ hatası dışında yanıtla çözülmesi. Yaşayan standart. Erişim: 21 Ekim 2026. [Bağlantı](https://fetch.spec.whatwg.org/)
- WHATWG. *DOM Standard* — AbortSignal.timeout() ve TimeoutError. Yaşayan standart. Erişim: 21 Ekim 2026. [Bağlantı](https://dom.spec.whatwg.org/)
- MITRE. *CWE-209: Generation of Error Message Containing Sensitive Information*. Common Weakness Enumeration, CWE List Version 4.20. Erişim: 21 Ekim 2026. [Bağlantı](https://cwe.mitre.org/data/definitions/209.html)
- Nottingham, M., Wilde, E. & Dalal, S. (2023). *Problem Details for HTTP APIs* (RFC 9457). IETF. [Bağlantı](https://www.rfc-editor.org/rfc/rfc9457)
- OWASP Cheat Sheet Series. *Error Handling Cheat Sheet*. OWASP Foundation. Erişim: 21 Ekim 2026. [Bağlantı](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- OWASP WSTG Projesi (2020). *Web Security Testing Guide v4.2* — WSTG-ERRH-01: Testing for Improper Error Handling. OWASP Foundation. [Bağlantı](https://wstg.owasp.org/v4.2/4-Web_Application_Security_Testing/08-Testing_for_Error_Handling/01-Testing_For_Improper_Error_Handling/)
