---
article_id: article_92b34d29-8459-4373-b248-5b8bbe14bca5
title: "Güvenli Varsayılanlar: Yapılandırma Bir Güvenlik Kararıdır"
slug: guvenli-varsayilanlar-yapilandirma
category: design-and-configuration
level: advanced
reading_order: 4
summary: "Önizleme özelliğinin üretime çıkmadan önceki yapılandırma incelemesinde çıkan dört bulguyu okur: ayar yokken açılan hata ayıklama uçları, adına rağmen dış varlık yüklemeyi açan bir XML ayrıştırıcı seçeneği, NODE_ENV eksik olduğu için yığın izi döndüren varsayılan hata işleyicisi ve konsoldan genişletilmiş bir depolama rolü. Etkin değerin hangi katmandan geldiğini, eksik bir ayarın hangi yöne düştüğünü ve ortamlar arası kaymanın nasıl yakalanacağını gösterir; yapılandırmayı açılışta fail-closed doğrulanan, saldırı yüzeyi envanteriyle sınanan ve kodla aynı incelemeden geçen bir sözleşmeye çevirir."
tags:
  - guvenli-varsayilan
  - yapilandirma
  - a02-2025
  - xxe
  - saldiri-yuzeyi
content_hash: sha256:a64eef0a0120be7f7ab48257a6ceaf0c7117b8085a7eca38a0052efb21e2b7e5
classification_version: 1
classification_batch: 1
---
## Hazırlıkta çalışıyordu

Tehdit modelini çizdiğimiz önizleme özelliği incelemeden geçti ve sürüm adayına girdi. Sürüm kontrol listesine bu kez bir madde eklenmiş: tehdit modelinin değişiklik sorusu, "bu değişiklik yeni bir yetki ekliyor mu?", ekibi ilk kez hazırlık ve üretim ortamlarının etkin yapılandırmasını yan yana koymaya götürmüş. İki ortama aynı yapı çıktısı dağıtılıyor ve ekip farkın birkaç adres ile kimlik bilgisinden ibaret olmasını bekliyor. Karşılaştırma dört bulgu çıkarıyor:

| Bulgu | Üretimdeki etkin değer | Değeri kim yazdı |
|---|---|---|
| `/internal/debug` uçları | yönlendirme tablosunda, kimlik doğrulamasız | Kimse: kod, `DEBUG_ROUTES` tanımsızsa uçları açıyor |
| XML içe aktarma ayrıştırıcısı | dış varlıkları yüklüyor | Uygulama kodu: bir müşterinin dosyası için eklenen `noent: true` |
| Beklenmeyen hatanın yanıtı | yığın izi | Kimse: yeni konteyner imajında `NODE_ENV` yok, çerçevenin varsayılanı devrede |
| Önizleme işçisinin depolama rolü | bütün depolama alanında okuma, yazma, listeleme | Bir operatör: hazırlıkta hata ayıklamak için genişletilen rolü konsoldan üretime kopyalamış |

Dört satırın ikisinde değeri kimse yazmadı, öbür ikisinde yazan kişi başka bir sorunu çözüyordu; dördünde de değer hiçbir incelemeden geçmedi. Hata ayıklama uçları yüklü yapılandırmayı ve ortam değişkenlerini döküyor: kimliği doğrulanmamış bir istemci için gizli değerlere giden en kısa yol. XML ayrıştırıcısı, içe aktarma yetkisi olan her kullanıcının sunucudaki bir dosyayı içe aktarılan belgenin içine çekmesine izin veriyor. Yığın izi kaynak yollarını, kütüphane adlarını ve iç bağlantı hedeflerini anlatıyor. Genişletilmiş rol ise tehdit modelleme yazısında iki öneke daralttığımız işçi yetkisini, kimse fark etmeden geri açmış.

Dört satır Top 10:2025'in A02 kategorisinin, güvenlik yapılandırma hatasının (Security Misconfiguration), tarifine birebir uyuyor: gereksiz özelliklerin açık olması, hata işlemenin yığın izi ve fazla bilgi veren mesajlar göstermesi, çerçeve ve kütüphane ayarlarının güvenli değerlere getirilmemiş olması, bulut servislerinde yanlış verilmiş izinler. Kategori 2021 edisyonundaki beşinci sıradan ikinciye çıktı ve eşlediği on altı CWE arasında hem XML dış varlık başvurusu (CWE-611) hem etkin bırakılmış hata ayıklama kodu (CWE-489) var; ortalama yaygınlığı yüzde 3,00, en yüksek yaygınlığı yüzde 27,70. Sayı yine bizim ürünümüz hakkında bir şey söylemiyor, ama dört bulgunun ortak kökünü adlandırıyor: kategori sayfasına göre tekrarlanabilir bir sertleştirme süreci olmayan sistemler daha yüksek risk altındadır.

Kırılan varsayım iki parçalı: varsayılanlar güvenlidir ve hazırlıkta doğru çalışan yapılandırma üretimde de aynı biçimde çalışır. Saldırganın yeteneği bulguya göre değişiyor: hata ayıklama ucu ve hata yanıtı için internetteki herhangi biri, XML için içe aktarma yetkisi olan herhangi bir kullanıcı, depolama rolü için tehdit modelinde konuştuğumuz gibi işçiyi ele geçiren biri. Güven sınırı bu kez de kodda değil: incelenmiş yapılandırma kaynağı ile çalışan sürecin etkin değeri arasında. Bir varsayılandan, bir ortam değişkeninden ya da konsoldan gelen değer bu sınırı hiçbir incelemeden geçmeden aşıyor. Bu yazının sorusu, yapılandırmayı kodla aynı inceleme ve test disiplinine nasıl sokacağımız.

## Varsayılan kimin kararı?

OWASP'ın önleyici kontroller listesi Proactive Controls 2024 bu konuya ayrı bir madde ayırır, C5. Tanımı kısa: **güvenli varsayılan (secure by default)**, ürünün kutudan çıktığı hâliyle yaygın istismar tekniklerine dayanıklı olmasıdır; yazılım kapsamlı bir kullanıcı yapılandırması gerektirmeden güvenli bir durumda başlamalı ve varsayılan ayar her zaman en güvenli seçenek olmalıdır. ASVS 5.0.0'ın yapılandırma bölümü V13 kontrol hedefini tek cümleye indirir: uygulamanın varsayılan yapılandırması internette kullanım için güvenli olmalıdır. Program tarafında SSDF v1.1'in PW.9 uygulaması aynı işi iki adımda ister: güvenliği etkileyen her ayar için varsayılan değerlerin güvenli olduğu bir temel çizgi tanımlamak (PW.9.1) ve bu varsayılanları uygulayıp her ayarı belgelemek (PW.9.2). Zayıflık sözlüğünde karşı kaydı da var: CWE-1188, kurulumu yapan ya da yöneten kişinin değiştirmesi beklenen bir kaynağın güvensiz bir varsayılanla başlatılması.

Bu tanımların bir serviste neye karşılık geldiğini görmek için etkin değerin nereden geldiğine bakmak gerekiyor. Tipik bir serviste bir ayar en az beş katmandan geçer: kütüphanenin ya da çerçevenin varsayılanı, uygulama kodunun kendi değeri, **kod deposundaki (repository)** yapılandırma dosyası, ortam değişkeni ve çalışma anında elle yapılan değişiklik. Etkin değer son yazan katmanın değeridir; hiçbir katman yazmadıysa varsayılan kazanır. Şekil 1 iki bulguyu bu katmanlarda izliyor.

![İki sütun, her biri yukarıdan aşağıya beş kutu ve aralarında aşağı oklar. Sol sütun hata yanıtının ayrıntısı: vurgulu kutu çerçeve varsayılanı, NODE_ENV yoksa development: yığın izi; ardından kesikli kutular uygulama kodu, kendi hata işleyicisi yok; kod deposundaki yapılandırma, NODE_ENV burada tanımlı değil; ortam değişkeni, yeni imajda NODE_ENV yok; en altta etkin değer, istemciye yığın izi. Sağ sütun XML dış varlıkları: kütüphane varsayılanı, libxml2 2.9 ve sonrası: dış varlık yüklenmez; vurgulu kutu uygulama kodu, noent: true, bir müşteri dosyası için; kesikli kutular kod deposundaki yapılandırma ve ortam değişkeni; etkin değer, dış varlıklar yüklenir. İki etkin değer de alttaki açılış denetimi kutusuna gider: fail-closed, hazırlıkta ya da üretimde güvensiz bir değer varsa süreç başlamaz.](assets/etkin-degerin-katmanlari.svg "Şekil 1 — Etkin değeri hangi katman yazdı: iki bulgu ve açılış denetimi")

Hata yanıtı sütununda değeri yazan tek katman çerçevenin varsayılanı. Express 5.3.0'ın varsayılan hata işleyicisini sağlayan finalhandler 2.1.1, ortamı sırasıyla kendisine verilen seçenekten, `NODE_ENV` değişkeninden ya da ikisi de yoksa `development` diye belirler ve ortam tam olarak `production` değilse yanıt gövdesine `err.stack` koyar. Express'in kendi belgesi de yığın izinin yalnızca üretim ortamında gönderilmediğini yazar. Davranışı yerelde, her isteği bir hatayla bitiren küçük bir sunucuyla ölçtük (kendi deneyimiz: Node.js 24.14, finalhandler 2.1.1, boş bir klasöre kurulu):

```ts
// probe.mts: Node.js 24 tür bildirimlerini ayıklayarak doğrudan çalıştırır.
import { createServer } from "node:http";
import finalhandler from "finalhandler";

const server = createServer((req, res) => {
  finalhandler(req, res, { onerror: () => {} })(new Error("db: connection refused (pg-primary.internal:5432)"));
});

server.listen(0, "127.0.0.1", async () => {
  const { port } = server.address() as { port: number };
  const res = await fetch(`http://127.0.0.1:${port}/`);
  const pre = (await res.text()).match(/<pre>([\s\S]*?)<\/pre>/)?.[1] ?? "";
  const firstLine = pre.split("<br>")[0].replaceAll("&nbsp;", " ").trim();
  console.log(`NODE_ENV=${process.env.NODE_ENV ?? "(yok)"} -> ${res.status} ${firstLine}`);
  server.close();
});
```

```text
$ node probe.mts
NODE_ENV=(yok) -> 500 Error: db: connection refused (pg-primary.internal:5432)
$ NODE_ENV=staging node probe.mts
NODE_ENV=staging -> 500 Error: db: connection refused (pg-primary.internal:5432)
$ NODE_ENV=Production node probe.mts
NODE_ENV=Production -> 500 Error: db: connection refused (pg-primary.internal:5432)
$ NODE_ENV=production node probe.mts
NODE_ENV=production -> 500 Internal Server Error
```

Dört çalıştırmanın üçünde istemci hatanın metnini alıyor; gövdenin sonraki satırları dosya yollarıyla birlikte yığın izini taşıyor. İç ağdaki bir veritabanının adının ve portunun yanıtta durması, hata yolunu incelediğimiz yazıdaki CWE-209 örneğinin kendisi. İki satır ayrıca dikkat istiyor. `staging` meşru bir ortam adı, ama çerçeve için `production` olmayan her değer geliştirme demek; hazırlık ortamı bu yüzden üretimden farklı davranıyor ve orada koşan bir "yanıtta iç ayrıntı yok" testi üretimi temsil etmiyor. `Production` ise büyük harfle yazıldığı için aynı kapıdan geçemiyor. Güvenli davranış tam olarak doğru yazılmış tek bir dizgeye bağlı; dizgenin yokluğu ya da küçük bir yazım farkı güvensiz tarafa düşüyor.

Hata yolunu incelediğimiz yazıda istemciye genel bir hata dönmeyi ve ayrıntıyı korelasyon kimliğiyle kayda göndermeyi bir kod kararı olarak kurmuştuk. Buradaki ders, o kararın çerçevenin varsayılanına bırakılmaması: kendi son çare hata işleyicimiz ortamdan bağımsız olarak yığın izi göndermez. Çerçevenin varsayılanı yalnızca o işleyiciye ulaşmayan bir hata kaldığında devreye girer; orada da ortamın tanımlı ve doğru yazılmış olmasını, birazdan kuracağımız açılış denetimi şart koşar.

## Varsayılan bir sürüm özelliğidir

XML sütununun hikâyesi başka: orada kütüphanenin varsayılanı güvenli ve onu uygulamanın kendi kodu ezmiş. OWASP'ın XXE önleme rehberine göre libxml2, 2.9 sürümünden beri dış varlıkları varsayılan olarak yüklemiyor ve iki seçenek bu varsayılanı geri açıyor: `XML_PARSE_NOENT` ve `XML_PARSE_DTDLOAD`. Node.js'teki libxml2 bağlaması libxmljs2'de ilkinin adı `noent`. Bağlamanın kendi testleri seçeneği masum bir işle gösteriyor: belgede tanımlanmış bir iç varlık, `noent: true` ile metindeki değeriyle yer değiştirir. Ekip de tam bunu istemiş: eski bir sistemden gelen bir müşterinin dosyalarında kendi tanımladığı varlıklar var ve içe aktarılan başlıklarda bu varlıkların adları görünüyordu.

```diff
 // import/xml.ts
-const doc = libxml.parseXml(body);
+const doc = libxml.parseXml(body, { noent: true }); // müşterinin dosyasındaki varlıklar çözülsün
```

Seçeneğin adı yanıltıyor. libxml2'nin kendi belgesi bunu açıkça yazar: adındaki karışıklığa rağmen bu seçenek varlıkların yerine konmasını açar ve aynı zamanda dış varlıkların, hem genel hem parametre varlıklarının yüklenmesini de açar; belge bunu tehlikeli diye niteler ve güvenilmeyen veri işleyenlere dış varlık yüklemeyi kapatan `XML_PARSE_NO_XXE` seçeneğini önerir (2.13'ten beri). Bir iç varlığı çözmek için eklenen bayrak, içe aktarma yetkisi olan her kullanıcıya şöyle bir belge göndermenin yolunu açmış: belge türü bildiriminde (`DOCTYPE`) sunucudaki bir dosyayı gösteren bir dış varlık ve başlık alanında o varlığa bir başvuru. Bu CWE-611'dir: ürün, denetim alanının dışındaki belgelere çözülen varlıklar içerebilen bir XML belgesini işler ve yanlış belgeleri çıktısına gömer. Kısaltması **XXE (XML External Entity)**.

Burada iki ders var. Birincisi, varsayılan bir kütüphane adının değil, bir sürümün ve bir seçenek kümesinin özelliğidir. Aynı rehber .NET için de aynı şeyi gösterir: `XmlDocument`, `XmlTextReader` ve `XPathNavigator` .NET Framework 4.5.2'den önceki sürümlerde dış varlık saldırılarına açık, 4.5.2 ve sonrasında korumalıdır. "Bu kütüphane güvenlidir" cümlesi bir sürüm ve bir seçenek listesi olmadan doğrulanamaz; doğrulanabilir olan, sabitlenmiş sürümde etkin davranışı sınayan bir testtir. İkincisi, güvenli olmayan bir seçeneği yapılandırma anahtarına çevirmek sorunu taşır, çözmez. ASVS bu konuda açık: `v5.0.0-1.5.1` (birinci seviye), XML ayrıştırıcılarının kısıtlayıcı bir yapılandırmayla çalışmasını ve dış varlık çözme gibi güvenli olmayan özelliklerin kapalı olmasını ister. Rehberin genel önerisi daha da ileri gider: belge türü tanımları mümkün olan her yerde kapatılır, ayrıştırıcı destekliyorsa `DOCTYPE` taşıyan belge reddedilir.

İçe aktarma biçimimizin belge türü tanımına hiçbir ihtiyacı yok; tehdit modelleme yazısındaki dört cevaptan en ucuzu burada işe yarıyor: ortadan kaldırmak. Ayrıştırıcı seçenekleri yapılandırmadan değil koddan gelir ve değiştirilemez, `DOCTYPE` taşıyan belge ayrıştırılmadan reddedilir ve müşterinin eski dosyaları bir kerelik dönüştürülür. Bunu sabitleyen test, yalnızca test ortamında yazılmış bir kanarya dosyası kullanır:

```ts
it("DOCTYPE taşıyan içe aktarma belgesi reddedilir ve hiçbir dosya okunmaz", async () => {
  const canary = await testEnv.writeFile("xxe-kanarya.txt", "KANARYA-7f3a");
  const body = [
    '<?xml version="1.0"?>',
    "<!DOCTYPE i [<!ENTITY x SYSTEM \"file://" + canary + "\">]>",
    "<import><title>&x;</title></import>",
  ].join("\n");

  const res = await api.as(editor).post("/imports", body, { "content-type": "application/xml" });

  expect(res.status).toBe(400);
  expect(await res.text()).not.toContain("KANARYA-7f3a");
  expect(await imports.countFor(editor.tenantId)).toBe(0);
});
```

> **Teşhis et:** XXE bulgusunu kapatmak için açılan değişiklik tek satır: `{ noent: true }` yerine `{ noent: true, nonet: true }`. Açıklamada "ayrıştırıcının ağ erişimi kapatıldı, dış varlık artık hiçbir yere ulaşamaz" yazıyor. Bu değişikliği onaylar mısın?

Onaylamamak gerekir. libxml2'nin belgesine göre `nonet` seçeneğinin karşılığı olan `XML_PARSE_NONET` yalnızca kütüphanenin yerleşik HTTP ve FTP istemcilerinin ağ erişimini kapatır; son yerleşik ağ istemcisi 2.15'te kaldırıldığından seçeneğin artık özel kaynak yükleyicilere iletilmek dışında bir etkisi yoktur. `file://` ile gösterilen yerel bir dosya ağ değildir: varlık yine yüklenir, dosyanın içeriği yine belgeye gömülür. Değişiklik ayrıca asıl kararı, `noent`'i, yerinde bırakıyor. İyi bir cevap seçeneğin adına değil belgelenmiş anlamına bakar ve değişikliği tehdide karşı sınar: yukarıdaki kanarya testi bu değişiklikten sonra da kırmızı kalır. Zayıf cevap "ağ kapalıysa sunucu adına dışarıya istek de kalkar" diye düşünür; kalkan şey tehdidin yalnızca bir dalıdır ve yerel dosya okuma dalı tam olarak bu bulgudur.

## Eksik değer hangi yöne düşer?

Hata ayıklama uçlarının satırı en kısa olanı ve en öğreticisi:

```ts
// Kırılgan sürüm: eğitim amaçlı, kontrollü örnek.
// Kırılan özellik: ayar hiç verilmediğinde güvensiz taraf seçiliyor.
if (process.env.DEBUG_ROUTES !== "false") {
  app.use("/internal/debug", debugRouter); // yüklü yapılandırmayı ve ortam değişkenlerini döker
}
```

Hata yolunu incelediğimiz yazıdaki kırılgan yetki kontrolünü hatırla: yalnızca açık bir ret işlemi durduruyordu, ret olmayan her şey geçiyordu. Bu satır aynı koşulun yapılandırmadaki hâli: yalnızca açıkça yazılmış `false` uçları kapatıyor; değişkenin yokluğu, boş dizge, `False` ya da `0` açıyor. Hazırlıkta değişken bilerek `true` verilmişti ve uçlar beklendiği gibi açıktı; üretimde ise değişkeni kimse tanımlamadığı için açıklar. Bu, CWE-489'un tarif ettiği durum: hata ayıklama kodu etkin hâlde sürüme çıkmış bir ürün.

Düzeltme iki kuraldan oluşuyor: yokluk güvenli tarafa düşer ve geçersiz değer süreci başlatmaz. Yapılandırma, süreç açılırken tek bir yerde tipli ve doğrulanmış bir nesneye çevrilir:

```ts
const ENVS = ["development", "test", "staging", "production"] as const;

export function loadConfig(source: Record<string, string | undefined>): AppConfig {
  const env = ENVS.find((e) => e === source.APP_ENV);
  if (!env) throw new ConfigError(`APP_ENV tanımsız ya da bilinmiyor: ${JSON.stringify(source.APP_ENV)}`);
  const deployed = env === "staging" || env === "production";

  const debugRoutes = source.DEBUG_ROUTES === "true"; // yalnızca açık "true" açar
  if (deployed && debugRoutes) throw new ConfigError(`${env}: hata ayıklama uçları açılamaz`);
  if (deployed && source.NODE_ENV !== "production") {
    throw new ConfigError(`${env}: NODE_ENV "production" olmalı, bulunan ${JSON.stringify(source.NODE_ENV)}`);
  }
  return { env, debugRoutes, errorDetail: deployed ? "generic" : "stack" };
}

it.each([
  [{ APP_ENV: "production", NODE_ENV: "production" }, null],
  [{ APP_ENV: "production" }, /NODE_ENV/],
  [{ APP_ENV: "production", NODE_ENV: "Production" }, /NODE_ENV/],
  [{ APP_ENV: "staging", NODE_ENV: "production", DEBUG_ROUTES: "true" }, /hata ayıklama/],
  [{ APP_ENV: "prod", NODE_ENV: "production" }, /APP_ENV/],
  [{}, /APP_ENV/],
])("açılış denetimi: %o", (source, error) => {
  if (error) expect(() => loadConfig(source)).toThrow(error);
  else expect(loadConfig(source).debugRoutes).toBe(false);
});
```

Bu açılış denetimi, hata yolunu incelediğimiz yazıdaki fail-closed kararının yapılandırmadaki karşılığı ve aynı bedeli taşıyor: eksik ya da yanlış bir değer dağıtımı durdurur, servis açılmaz. Bedel bilerek seçiliyor. Açılmayan bir süreç görünür ve geri alınabilir bir arızadır; güvensiz bir değerle sessizce açılan süreç ise ne görünür ne de kendiliğinden geri döner. OWASP'ın XXE rehberi aynı ilkeyi ayrıştırıcı için yazar: desteklenmeyen bir güvenlik ayarı bir yapılandırma hatası sayılmalı, güvenilmeyen XML kısmi bir sertleştirmeyle işlenmeye devam etmemelidir. Denetimin sınırı da açık: yalnızca ona yazdığın kuralları uygular. Listede olmayan bir ayar eskisi gibi varsayılanına güvenir.

## Kayma: aynı yapı, iki ortam

Dördüncü bulgu ötekilerden farklı: depolama rolünün doğru tanımı kod deposunda duruyor, tehdit modelleme yazısında yazdığımız iki önekli politika. Çalışan ortam ondan ayrışmış. Buna **yapılandırma kayması (configuration drift)** diyoruz: çalışan bir sistemin etkin yapılandırmasının, incelenmiş kaynağındaki tanımdan zamanla uzaklaşması. A02:2025'in önleme listesi kaymaya karşı üç şey ister: geliştirme, test ve üretim ortamlarının yalnızca kimlik bilgileri farklı olacak biçimde aynı yapılandırılması ve bunun otomatik, tekrarlanabilir bir sertleştirme süreciyle kurulması; bütün ortamlarda yapılandırmanın etkinliğini doğrulayan otomatik bir süreç; ve bulut depolama izinlerinin gözden geçirilmesi. API güvenliği listesinin yapılandırma maddesi (API8:2023) aynı otomatik ve sürekli değerlendirmeyi API yığınının bütünü için ister.

Proactive Controls'un C5 maddesi kaymanın kök nedenine bakar: yapılandırmanın elle değil bildirimsel olarak, altyapıyı ve politikayı kod olarak tanımlayan dosyalarla kurulmasını önerir; böylece politikalar kaynak kod gibi yönetilir, yani bir kaynak kod yönetim sistemine konur, sürümlenir, erişimi denetlenir ve değişiklik yönetimine tabi olur. Şekil 2 bu ayrımı iki yol olarak gösteriyor: biri inceleme sınırından geçer, öbürü onun etrafından dolaşır.

![Yapılandırmanın iki yolu. Solda Geliştirici, inceleme ister; oku kesikli inceleme sınırını geçerek kod deposuna gider: incelenmiş kaynak, config/ ve policy/. Kod deposundan Yapı ve dağıtım kutusuna, aynı yapı iki ortam; oradan Hazırlık ve Üretim kutularına, her biri etkin değer. Kayma denetimi kutusu, beklenen ile çalışanı karşılaştırır: noktalı oklarla kod deposundan beklenen değeri, Üretim'den çalışan değeri alır. Altta Operatör, konsol; vurgulu ok inceleme sınırına hiç uğramadan Üretim'e gider: incelemesiz yol, konsoldan elle değişiklik; kod deposunda iz yok, kayma doğar.](assets/yapilandirmanin-iki-yolu.svg "Şekil 2 — Yapılandırmanın iki yolu: incelenen değişiklik ve kayma")

İncelenen yolda bir değişiklik incelemeden geçerek kod deposuna girer ve aynı yapı iki ortama dağıtılır. Konsoldaki elle değişiklik kod deposuna hiç uğramaz; depo hâlâ doğruyu söyler, ama çalışan sistem artık onu dinlemiyordur. Kayma bu yüzden iki kontrolle yakalanır. Birincisi dağıtımdan önce çalışır: her ortamın etkin yapılandırması kod deposundan üretilir ve ortamlar arasında yalnızca izin verilmiş anahtarlar ayrışabilir.

```ts
// Ortamlar arasında yalnızca kimlik, adres ve ölçek ayrışabilir; güvenlik ayarları aynı olmak zorunda.
const MAY_DIFFER = new Set(["storageBucket", "publicBaseUrl", "databaseUrlRef", "replicas"]);

export function driftBetween(a: Record<string, unknown>, b: Record<string, unknown>): string[] {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...keys].filter((k) => !MAY_DIFFER.has(k) && JSON.stringify(a[k]) !== JSON.stringify(b[k]));
}

it("hazırlık ve üretim yalnızca izin verilen anahtarlarda ayrışır", () => {
  expect(driftBetween(effectiveConfig("staging"), effectiveConfig("production"))).toEqual([]);
});
```

> **Teşhis et:** Dağıtım öncesi karşılaştırma şu farkları raporluyor ve ekip "üretim doğru, hazırlık zaten iç ortam" diyerek kapıyı geçirmek istiyor. Hangi fark kabul edilebilir, hangileri değil?

```text
storageBucket   staging=docs-stg              production=docs-prd
debugRoutes     staging=true                  production=false
errorDetail     staging=stack                 production=generic
workerRole      staging=documents/*:rwl       production=incoming/*:r, previews/*:w
```

Yalnızca ilk satır bir ortam kimliğidir ve izin listesinde durur; öteki üçü güvenlik ayarıdır ve kabul edilemez, iki nedenle. Birincisi, hazırlık üretimi temsil etmek için var: yanıtta iç ayrıntı olmadığını sınayan test hazırlıkta yığın izi gördüğü için ya hep kırmızıdır ya da birileri onu orada atlamayı öğrenir; iki durumda da üretimin davranışı sınanmamış olur. İkincisi, "iç ortam" bir güven derecesi değil bir ağ konumudur; tehdit modelleme yazısındaki işçi gibi, hazırlığa ulaşabilen her kişinin ve her bileşenin bu uçları ve bu geniş rolü kullanabileceğini varsaymak gerekir. Geniş rol üstelik bu yazının kayma bulgusunun kaynağı: konsoldan yapılan bir kopya onu üretime taşımıştı. İyi bir cevap farkları kimlik, adres ve ölçek ile güvenlik ayarı diye ikiye ayırır ve ikincisini sıfıra indirir; hazırlıkta hata ayıklama gerekiyorsa bu ihtiyaç ayrı, kayıt tutulan ve süreli bir erişimle karşılanır. Zayıf cevap üretimin doğru olmasını yeterli sayar.

İkinci kontrol çalışırken çalışır. Süreç açılırken gizli olmayan etkin yapılandırmasının bir özetini açılış kaydına ve bir metrik etiketine yazar; izleme bunu sürümün beklenen özetiyle karşılaştırır. Depolama rolü gibi uygulamanın dışında duran ayarlar için düzenli bir iş canlı politikayı salt okunur bir sorguyla okur ve kod deposundaki politikayla karşılaştırır. Fark bir uyarıdır, otomatik bir düzeltme değil: önce farkı kimin ve neden yarattığı bilinmelidir, çünkü konsoldaki değişiklik bir olay müdahalesinin parçası da olabilir. A02:2025 bu doğrulamalar otomatik değilse en az yılda bir elle yapılmasını ister; kayma bir yıl beklemez.

## Saldırı yüzeyi envanteri

Hata ayıklama uçlarının asıl sorusu "kapalı mı" değil, "neden üretim yapısının içindeler". **Saldırı yüzeyi envanteri (attack surface inventory)**, bir ortamın dışarıya açtığı her girişin listesidir: yönlendirme tablosundaki uçlar, dinlenen portlar, yönetim, belge ve izleme uçları, kabul edilen dosya ve veri biçimleri, sunucunun kendisinin bağlandığı dış adresler. ASVS 5.0.0 bu listenin üretimde nasıl görünmesi gerektiğini birkaç gereksinimle söyler: `v5.0.0-13.4.2` bütün bileşenlerde hata ayıklama kiplerinin üretimde kapalı olmasını, `v5.0.0-13.4.5` iç API belgelerinin ve izleme uçlarının bilerek istenmedikçe açılmamasını, `v5.0.0-15.2.3` üretim ortamının yalnızca uygulamanın çalışması için gereken işlevi içermesini, test kodu, örnek parçalar ve geliştirme işlevi barındırmamasını ister; üçü de ikinci seviyededir.

Buradan çıkan karar bir anahtar değil, bir yokluk: hata ayıklama yönlendiricisi üretim yapısına hiç girmez. Açılış denetimi yanlış bir değeri yakalar; yapıdan çıkarılmış kod ise yanlış bir değerle bile çalışamaz. Envanter de bir dosya olarak kod deposunda durur ve sınanır:

```ts
it("üretim yapısının yönlendirme tablosu envanterle birebir aynı", async () => {
  const app = await buildApp(loadConfig({ APP_ENV: "production", NODE_ENV: "production" }));
  expect(listRoutes(app)).toEqual(readInventory("production").routes);
});

it.each(["/internal/debug/config", "/internal/debug/env", "/api-docs"])(
  "%s üretim benzeri ortamda bulunmaz",
  async (path) => {
    const res = await fetch(new URL(path, PROD_LIKE_BASE_URL));
    expect(res.status).toBe(404);
  },
);
```

Envanterin dışarıdan sağlaması OWASP'ın test rehberindedir: uygulama platformu yapılandırma testi (`WSTG-CONF-02`, v4.2) varsayılan ve bilinen dosyaların kaldırıldığını ve üretimde hata ayıklama kodu ya da eklentisi kalmadığını doğrulamayı, yönetim arayüzleri testi (`WSTG-CONF-05`) gizli yönetim arayüzlerini ve işlevlerini bulmayı hedefler. İçeriden test envanterin kodla uyuştuğunu, dışarıdan test ise envanterde olmayan bir girişin gerçekten bulunmadığını kanıtlar; hata yolunu incelediğimiz yazıdaki hata enjeksiyonu ile dış test gibi, ikisi birbirinin yerine geçmez. Envanter de kapsadığı kadar konuşur: uygulamanın kaydettiği uçları bilir, yük dengeleyicinin yönetim arayüzünü ya da yardımcı bir konteynerin açtığı portu bilmez. Onlar için altyapının kendi envanteri ve dışarıdan yapılan bir tarama gerekir.

## Karar kartı

- **Varsayım:** "Varsayılanlar güvenlidir ve hazırlıkta doğru çalışan yapılandırma üretimde de aynı biçimde çalışır."
- **Güven sınırı:** İncelenmiş yapılandırma kaynağı ile çalışan sürecin etkin değeri arasında. Bir varsayılandan, bir ortam değişkeninden ya da konsoldan gelen değer bu sınırı incelenmeden geçer.
- **Karar:** Yokluk güvenli tarafa düşer ve bilinmeyen değer süreci başlatmaz; güvenlik ayarları ortamlar arasında aynıdır, yalnızca kimlik, adres ve ölçek ayrışır; hata ayıklama kodu üretim yapısına girmez; ayrıştırıcı seçenekleri koddadır ve `DOCTYPE` reddedilir; canlı yapılandırma kod deposundakiyle düzenli olarak karşılaştırılır.
- **Somut risk:** Kimliği doğrulanmamış bir istemcinin hata ayıklama ucundan gizli değerleri okuması; içe aktarma yetkisi olan bir kullanıcının XXE ile sunucudaki bir dosyayı okuması; yığın iziyle iç adreslerin ve yolların sızması; konsoldan genişletilmiş bir rolün tehdit modelindeki daraltmayı sessizce geri alması.
- **Doğrulanabilir özellik:** `v5.0.0-13.4.2` (üretimde hata ayıklama kipleri kapalı), `v5.0.0-15.2.3` (üretimde yalnızca gereken işlev), `v5.0.0-1.5.1` (XML ayrıştırıcısı kısıtlayıcı yapılandırmada), `v5.0.0-13.4.5` (belge ve izleme uçları bilerek açılmadıkça kapalı).
- **Negatif test:** `NODE_ENV`'siz, `Production` yazımlı ya da `DEBUG_ROUTES=true` taşıyan dağıtılmış ortam yapılandırmasıyla süreç açılmaz; kanaryalı XXE belgesi 400 alır ve kanarya yanıtta yoktur; hata ayıklama ve belge uçları üretim benzeri ortamda 404'tür; hazırlık ile üretim yalnızca izin verilen anahtarlarda ayrışır.
- **Üretimde sinyal:** Açılış denetiminin durdurduğu dağıtımlar; çalışan yapılandırma özetinin sürümün beklenen özetinden ayrılması; canlı politika ile kod deposundaki politika arasındaki fark; reddedilen `DOCTYPE` taşıyan içe aktarmalar.
- **Kalan risk:** Açılış denetimi yalnızca kurallarına yazılan ayarları bilir; bir kütüphane yükseltmesi bir varsayılanı sessizce değiştirebilir ve bunu yalnızca etkin davranışı sınayan test yakalar; envanter uygulamanın dışındaki girişleri görmez; kayma denetimi farkı bulur, farkı kimin ve neden yarattığını bulmaz.

### Sırada ne var

Bu yazıda yapılandırmayı bir kod deposuna, incelemeye ve teste bağladık; ama "kod deposunda" demek henüz bir yer söylemek değil. XXE düzeltmesi tam olarak nerede duruyor, üretime giden yapı onu içeriyor mu ve ana daldan önceden açılmış bir **dal (branch)**, ana dala sonradan giren bu düzeltmeyi kendiliğinden alır mı? Sıradaki yazı bu soruları Git'in bir değişikliği nasıl temsil ettiğiyle cevaplıyor: dal bir kopya değil, bir işaretçidir.

## Kaynakça

- van der Stock, A., Glas, B., Smithline, N., Janca, T. & Gigler, T. (2025). *A02:2025 – Security Misconfiguration*. OWASP Top 10:2025. OWASP Foundation. Erişim: 21 Ekim 2026. [Bağlantı](https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration/)
- OWASP Proactive Controls Projesi (2024). *C5: Secure By Default Configurations*. OWASP Top 10 Proactive Controls 2024. OWASP Foundation. Erişim: 21 Ekim 2026. [Bağlantı](https://top10proactive.owasp.org/the-top-10/c5-secure-by-default/)
- OWASP ASVS Projesi (2025). *OWASP Application Security Verification Standard 5.0.0* — V13 Configuration. OWASP Foundation. [Bağlantı](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x22-V13-Configuration.md)
- OWASP ASVS Projesi (2025). *OWASP Application Security Verification Standard 5.0.0* — V1.5 Safe Deserialization; V15.2 Security Architecture and Dependencies. OWASP Foundation. [Bağlantı](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x10-V1-Encoding-and-Sanitization.md)
- Souppaya, M., Scarfone, K. & Dodson, D. (2022). *Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities* (NIST SP 800-218) — PW.9.1, PW.9.2. NIST. [Bağlantı](https://doi.org/10.6028/NIST.SP.800-218)
- MITRE. *CWE-1188: Initialization of a Resource with an Insecure Default*. Common Weakness Enumeration, CWE List Version 4.20. Erişim: 21 Ekim 2026. [Bağlantı](https://cwe.mitre.org/data/definitions/1188.html)
- MITRE. *CWE-611: Improper Restriction of XML External Entity Reference*. Common Weakness Enumeration, CWE List Version 4.20. Erişim: 21 Ekim 2026. [Bağlantı](https://cwe.mitre.org/data/definitions/611.html)
- MITRE. *CWE-489: Active Debug Code*. Common Weakness Enumeration, CWE List Version 4.20. Erişim: 21 Ekim 2026. [Bağlantı](https://cwe.mitre.org/data/definitions/489.html)
- OWASP Cheat Sheet Series. *XML External Entity Prevention Cheat Sheet*. OWASP Foundation. Erişim: 21 Ekim 2026. [Bağlantı](https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html)
- The libxml2 project. *parser.h File Reference* — xmlParserOption: XML_PARSE_NOENT, XML_PARSE_NO_XXE, XML_PARSE_NONET. libxml2 belgeleri. Erişim: 21 Ekim 2026. [Bağlantı](https://gnome.pages.gitlab.gnome.org/libxml2/html/parser_8h.html)
- libxmljs2 (2025). *libxmljs2 0.37.0* — ayrıştırıcı seçenekleri (`noent`, `dtdload`, `nonet`). [Bağlantı](https://github.com/marudor/libxmljs2)
- Express (2026). *Error Handling: The default error handler*. Express 5.x belgeleri. Erişim: 21 Ekim 2026. [Bağlantı](https://expressjs.com/en/guide/error-handling.html)
- pillarjs. *finalhandler 2.1.1* — `index.js`. [Bağlantı](https://github.com/pillarjs/finalhandler/blob/v2.1.1/index.js)
- OWASP API Security Projesi (2023). *API8:2023 Security Misconfiguration*. OWASP API Security Top 10. OWASP Foundation. [Bağlantı](https://owasp.org/API-Security/editions/2023/en/0xa8-security-misconfiguration/)
- OWASP WSTG Projesi (2020). *Web Security Testing Guide v4.2* — WSTG-CONF-02: Test Application Platform Configuration; WSTG-CONF-05: Enumerate Infrastructure and Application Admin Interfaces. OWASP Foundation. [Bağlantı](https://wstg.owasp.org/v4.2/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/)
