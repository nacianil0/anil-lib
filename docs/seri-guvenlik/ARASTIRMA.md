# "Güven Sınırı" — Kaynak ve Kanıt Defteri

> Serinin birincil kaynak kanıtı ve araştırma borcu buradadır (`SOZLESME.md` §5, §8). Bu dosya
> yayımlanacak bir yazı değildir; yazılardaki iddiaların hangi kaynağın hangi bölümüne, hangi
> sürümle dayandığını ve neyin henüz doğrulanmadığını kaydeder. Her üretim run'ı kullandığı
> kaynakları yeniden doğrular ve bu dosyayı günceller.

Son güncelleme: 2026-10-26 (kurulum + run 1 + müfredat revizyonu: Git/GitHub hattı, §7–§11 + run 2:
yazı 3–4, §12–§14 + run 3: yazı 5–6, §15–§17 + run 4: yazı 7–8, §18–§20 + run 5: yazı 9–10, §21–§24)

---

## 1. Kaynak kaydı

Erişim tarihlerinin hepsi 2026-10-21. "Doğrulama kanalı" hedef sayfanın başlığının, kurumunun ve
ilgili bölümünün metinle eşleştirildiği yoldur; HTTP kodu tek başına doğrulama sayılmadı.

| Kaynak | Kurum | Sürüm / edisyon | Doğrulama kanalı | Rol |
|---|---|---|---|---|
| OWASP Top 10:2025 — https://top10.owasp.org/2025/ (owasp.org/Top10/2025/ buraya yönlenir) | OWASP Top 10 ekibi | 2025 (8. edisyon). RC notu 2025-12-24'te kaldırıldı; içerik deposunda son düzeltme `57db8ec5dd` (2026-04-06, yazım düzeltmeleri) | Sayfa metni + GitHub `OWASP/Top10` commit geçmişi | Risk farkındalığı |
| OWASP Top 10 proje sayfası ve "Data 2025" sekmesi — https://owasp.org/projects/top-ten | OWASP | güncel sürüm 2025 | Sayfa metni | Veri çağrısı, katkı biçimi |
| OWASP Top 10:2021 "How to use the OWASP Top 10 as a standard" — https://owasp.org/Top10/2021/A00_2021_How_to_use_the_OWASP_Top_10_as_a_standard/ | OWASP | 2021 edisyonu | Sayfa metni | Listenin standart olarak kullanım sınırı (2021 edisyonu diye işaretlenerek) |
| OWASP ASVS — https://github.com/OWASP/ASVS/releases/tag/v5.0.0_release ve https://asvs.owasp.org/ | OWASP | **5.0.0**, yayın 2025-05-30 | Etiketteki Markdown bölümleri + resmî `…5.0.0_en.flat.json` | Doğrulanabilir gereksinim |
| OWASP API Security Top 10 — https://owasp.org/API-Security/editions/2023/en/0x11-t10/ | OWASP API Security Project | **2023** | Sayfa metni (run 2: API8:2023 sayfası) | API'ye özgü risk farkındalığı |
| OWASP WSTG — https://owasp.org/www-project-web-security-testing-guide/ (`wstg.owasp.org/stable/` → `/v4.2/`) | OWASP | **v4.2** kararlı (GitHub sürümü 2020-12-03); "latest" geliştirme sürümü; `stable` 2026-10-21'de de `/v4.2/`'ye yönleniyor | `stable` yönlendirmesi + v4.2 sayfaları (run 2: BUSL-08, BUSL-09, CONF-02, CONF-05, INPV-07) + GitHub sürüm listesi | Test yöntemi |
| OWASP Cheat Sheet Series — https://cheatsheetseries.owasp.org/ | OWASP | yaşayan sayfalar | Sayfa metni (Error Handling, Authorization, Threat Modeling) | Uygulama rehberi |
| OWASP Top 10 Proactive Controls — https://top10proactive.owasp.org/ | OWASP | **2024** | Sayfa metni (giriş, C3) | Önleyici kontroller |
| OWASP SAMM — https://owaspsamm.org/model/ | OWASP | **v2** | Sayfa metni | Program olgunluğu |
| NIST SP 800-218 (SSDF) — https://csrc.nist.gov/pubs/sp/800/218/final | NIST | **v1.1, nihai**, Şubat 2022 (belge geçmişi: 2022-02-03) | CSRC yayın sayfası | Güvenli yazılım geliştirme çerçevesi |
| NIST SP 800-218 Rev. 1 (SSDF v1.2) — https://csrc.nist.gov/pubs/sp/800/218/r1/ipd | NIST | **İlk kamu taslağı**, 2025-12-17; yorum dönemi 2026-01-30'da kapandı; `r1/final` sayfası yok (404, 2026-10-21) | CSRC yayın sayfası + `r1/final` yoklaması | Yalnızca taslak olarak anılır |
| MITRE CWE — https://cwe.mitre.org/ | MITRE | **4.20** | Tanım sayfaları (209, 252, 390, 396, 636, 754, 755; run 2: 22, 215, 400, 409, 434, 489, 501, 611, 1188) | Zayıflık tanımları |
| Envoy ext_authz — https://www.envoyproxy.io/docs/envoy/v1.40.0/api-v3/extensions/filters/http/ext_authz/v3/ext_authz.proto | Envoy Proxy | **v1.40.0** (sürüm 2026-10-13) | Sürümlü belge sayfası | `failure_mode_allow` varsayılanı |
| Kubernetes Dynamic Admission Control — https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/ | Kubernetes | güncel belge (erişim tarihli) | Sayfa metni, "Failure policy" bölümü | `failurePolicy` varsayılanı |
| RFC 9457 — https://www.rfc-editor.org/rfc/rfc9457 | IETF | Temmuz 2023; RFC 7807'yi geçersiz kılar | RFC metni | Hata yanıtı biçimi |
| Threat Modeling Manifesto — https://www.threatmodelingmanifesto.org/ | Manifesto çalışma grubu (15 yazar) | ilk sürüm 2020-11-17 (GitHub sürümü `1`); CC BY 4.0 | Sayfa metni + GitHub sürüm listesi | Tehdit modellemenin dört sorusu, değerler, kalıplar (run 2) |
| OWASP Cheat Sheet: Threat Modeling, File Upload, XML External Entity Prevention | OWASP | yaşayan sayfalar (erişim 2026-10-21); CC BY-SA 4.0 | Sayfa metni | Yöntem (3), dosya yükleme (3), XXE (4) |
| OWASP Proactive Controls 2024 — C5 Secure By Default Configurations | OWASP | 2024 (site ana sayfası "Top 10 2024"; `archive/2024` yolu da var) | Sayfa metni | Güvenli varsayılanın tanımı, bildirimsel yapılandırma (4) |
| libxml2 belgeleri, `parser.h` — https://gnome.pages.gitlab.gnome.org/libxml2/html/parser_8h.html | libxml2 projesi | güncel belge (2.15 sonrasını anlatıyor; erişim 2026-10-21) | Sayfa metni, `xmlParserOption` | `NOENT`, `NO_XXE` (2.13'ten beri), `NONET` anlamları (4) |
| libxmljs2 — https://github.com/marudor/libxmljs2 | marudor | 0.37.0 (npm, 2025-06-01); `main` dalındaki `index.d.ts`, `src/xml_document.cc`, `test/xml_parser.test.js` | Kaynak kod | `noent` → `XML_PARSE_NOENT` eşlemesi (4) |
| Express 5.x belgeleri, Error Handling — https://expressjs.com/en/guide/error-handling.html | Express | Express 5.3.0 (npm, 2026-10-09); `finalhandler ^2.1.0` | Sayfa metni + npm kaydı | Varsayılan hata işleyicisi (4) |
| finalhandler 2.1.1 — https://github.com/pillarjs/finalhandler/blob/v2.1.1/index.js | pillarjs | 2.1.1 (npm, 2025-12-01) | Etiketteki kaynak: satır 73 (`opts.env \|\| process.env.NODE_ENV \|\| 'development'`), 160–162 | Ortam varsayılanı ve `err.stack` (4) |
| W3C PNG Specification (Third Edition) — https://www.w3.org/TR/2025/REC-png-3-20250624/ | W3C | W3C Recommendation, 2025-06-24 | Yerleşik tarayıcıdan sayfa metni (betiğe 403) | İmza ve IHDR yerleşimi (3) |

## 2. Doğrulama kanalları ve bu run'da görülen tuzaklar

- **OWASP Top 10:2025 metni kendi içinde birkaç yerde tutarsız.** Okurken kategori sayfasının
  *tablosu* esas alındı; tutarsızlık yazılara taşınmadı:
  - A01: giriş sayfası ortalama yaygınlığı %3,73, A01 tablosu %3,74 veriyor.
  - A03: giriş ve metodoloji "5 CWE" diyor, A03 tablosu 6; A03'ün arka plan paragrafı ortalama
    yaygınlığı %5,19, tablosu %5,72 veriyor.
  - A05: giriş "38 CWE", A05 sayfası ve tablosu 37.
  - A01 ve A02'nin arka plan cümlesi "test edilen uygulamaların %100'ünde bulundu" diyor; tabloda
    %100 **Max Coverage** sütunundadır (test edilmiş olma), en yüksek yaygınlık A01'de %20,15,
    A02'de %27,70'tir. A05'in cümlesi aynı sayıyı doğru biçimde "test edildi" diye kurar.
  - "Next Steps" X01'in eşlenen CWE listesi tablosuyla (16 CWE) ve kendi arka planında adı geçen
    CWE'lerle (400, 409, 674, 835) uyuşmuyor; liste başka bir kategoriden kopyalanmış görünüyor.
    X01'in CWE listesine dayanan hiçbir iddia kurulmadı.
- **Skor formülünün yeniden üretimi (kendi hesabımız):** `artifacts/owasp-run1/t25_scores.py`
  (çalışma alanı betiği, depoya girmez) yayımlanan formülü
  `(MaxInc × 1000) + (MaxCov × 100) + (AvgExploit × 10) + (AvgImpact × 20) + (Occurrences / 10000)`
  yüzdeleri kesir olarak alarak kategori tablolarına uyguladı:
  - X02 Memory Management Failures: **271,16** (yayımlanan 271,08 — yuvarlama farkı; okuma doğru).
  - A01: **632,67** (yayımlanan 621,60 — 11,07 fark; tablodaki girdiler skorun girdileriyle birebir
    aynı değil. Neden olduğu kaynakta yazmıyor; tahmin yürütülmedi).
  - Skor sırası: A01 632,67 · A02 607,91 · A04 554,53 · A05 536,02 · A07 535,77 · A06 534,15 ·
    A10 530,96 · X01 522,02 · A08 385,35 · A03 368,84 · A09 350,19 · X02 271,16.
  - Sonuç: yayımlanan liste bu skorun saf sıralaması değil (A08 listede 8., skoru 385,35; X01 listede
    yok, skoru 522,02; A06/A07 ve A10'un yeri de skorla birebir örtüşmüyor). İki kategori ankettendir
    (A03: ankette katılımcıların tam %50'si 1. sıraya koymuş; A09: üçüncü kez anketle listeye
    girmiş). Yazarların ifadesi: "data-informed, but not blindly data-driven".
- **ASVS sayıları resmî JSON'dan sayıldı (kendi hesabımız):** 345 gereksinim, 17 bölüm; L1 70,
  L2 183, L3 92. Metnin yaklaşık oranlarıyla tutarlı (L1 ≈ %20, L1+L2 ≈ %73, L3 ≈ %27).
- **ASVS kimliği biçimi** ASVS'nin kendi metninden: `v<sürüm>-<bölüm>.<kısım>.<gereksinim>`
  (`v5.0.0-1.2.5`); sürümsüz kimlik "en güncel sürüm" diye okunur, bu yüzden seride hep sürümlü.
- **WSTG:** `stable` adresi `/v4.2/`'ye yönleniyor (2026-10-21). v4.2'de `WSTG-ERRH-02` (Stack
  Traces) ayrı test değil; metni `WSTG-ERRH-01`'e birleştirilmiş. v4.2'nin kendi içindeki çapraz
  atıflar eski sürümleri gösteriyor (ASVS 4.x, Proactive Controls v3) — kararlı ama 2020 tarihli.
- **Proactive Controls 2024 C3** başlığı "Validate all Input & Handle Exceptions" olduğu hâlde
  metni girdi doğrulamaya ayrılmış; istisna işleme için yalnızca seri dışı veriye (deserialization)
  dair bir kayıt maddesi var. İstisna işleme gereksinimi ASVS V16.5'ten, uygulama rehberi Error
  Handling Cheat Sheet'ten alındı.
- **Run 2 kanal notları:** W3C `TR` sayfaları betiğe (tarayıcı User-Agent'ı ve `Accept`
  başlıklarıyla da) 403 döndü; yerleşik tarayıcı panosu metni okudu. GitHub API ve
  `raw.githubusercontent.com` anahtarsız çalıştı (ASVS etiketi, libxmljs2, finalhandler); npm
  kayıt API'si sürüm ve yayım tarihini verdi. ASVS bölüm dosyalarının adı API'den
  (`/contents/5.0/en?ref=v5.0.0_release`) okundu, tahmin edilmedi.
- **Kanal notları:** OWASP siteleri, CSRC, CWE, Envoy ve RFC Editor betikle (tarayıcı
  User-Agent'ıyla) açılıyor. GitHub API sürüm ve commit sorguları anahtarsız çalışıyor. ASVS'nin
  kesin metni için `raw.githubusercontent.com/OWASP/ASVS/v5.0.0_release/5.0/en/…` kullanıldı
  (`master` dalı sürüm sonrası değişebilir).

## 3. Yazı 1 — kanıt (OWASP Top 10:2025'i okumak)

| İddia | Kaynak ve bölüm | Not |
|---|---|---|
| Top 10 bir "standard awareness document"tır | Top 10:2025 ana sayfa; proje sayfası | Proje sayfası aynı metinde "reference standard" da diyor; yazıda belge sayfasının tanımı esas |
| 2025 sürümü 8. edisyondur; iki yeni kategori (A03'ün genişlemesi, A10) ve bir birleştirme (SSRF → A01) | Introduction, "What's changed" | |
| Veri 2021–2024; katkılar 31 Temmuz 2025'e kadar; araç ağırlıklı (HaT) ve insan ağırlıklı (TaH) veri ayrı | Proje sayfası, Data 2025 | Sekme plan diliyle yazılmış; dönem bilgisi Introduction'daki "starting in 2021" ile tutarlı |
| 2,8 milyondan fazla uygulamanın verisi; katkıcılar araç üreticileri ve danışmanlıklar | Introduction, "Thank you to our data contributors" | Örneklem "katkıcıların test ettiği uygulamalar"dır |
| Yaygınlık: bir CWE'nin en az bir örneğini taşıyan uygulama oranı; sıklık hesaba girmez (4 ile 4.000 örnek aynı) | Introduction, "How the categories are structured"; What are AppSec Risks, "Data Factors" | |
| Kapsama: bir CWE için test edilmiş uygulama oranı | What are AppSec Risks, "Data Factors" | |
| 589 CWE analiz edildi; 10 kategoride 248 CWE; MITRE sözlüğünde 968; kategori başına ort. 25, alt sınır 5, üst sınır 40 | Introduction | A03 için "5" tabloyla çelişiyor (§2) |
| İstismar ve etki puanları NVD'deki CVE'lerin CVSS v2/v3 alt puanlarından CWE başına ortalamadır; CVSS v4 kullanılmadı | Introduction, What are AppSec Risks | ~175 bin CVE–CWE kaydı, 643 CWE |
| Sıralama formülü ve 621,60 / 271,08 skorları | What are AppSec Risks | Yeniden üretim §2 |
| 8 kategori veriden, 2 kategori topluluk anketinden | Introduction, "Why we use a community survey" | Metodoloji paragrafı "12 kategori sıralandı" diyor |
| A03: ankette %50 birinci; yalnızca 11 CVE; test edildiğinde en yüksek ortalama yaygınlık | A03 Background + tablo (%5,72) | Arka plan %5,19 diyor (§2) |
| A09 test edilmesi çok zor ve veride hep az temsil edilir; iyi kayıt uyarı olmadan az değerlidir | Introduction; A09 Background | |
| X01 (uygulama dayanıklılığı) A10'a çok yakın skorlandı ve 2021'in liste dışı hizmet reddi başlığının yeniden adlandırılmasıdır; X02 bellek yönetimi en çok CVE'li üçüncü sınıf, ankette en düşük, gerekçe web uygulamalarının masaüstüne baskınlığı; X03 yapay zekâ üretimi koda uygunsuz güven, CWE/CVE yok | Next Steps; Top 10:2021 Next Steps (hizmet reddi orada liste dışı) | X01'in CWE listesi sayfada hatalı (§2), kullanılmadı |
| Top 10 tam liste değil, başlangıçtır; ASVS gereksinim için önerilir | Establishing a Modern Application Security Program | |
| Listeyi standart olarak kullanmak "bare minimum"dur; tam kapsama iddiası doğru değildir; araç üreticileri için ASVS | Top 10:2021 "How to use … as a standard" | 2021 edisyonu diye işaretlenerek |
| ASVS her gereksinimin geçti/kaldı kararıyla doğrulanabilir olmasını ister; nasıl uygulanacağı Cheat Sheet'in, nasıl test edileceği WSTG'nin işidir; "saldırgan için kapsam yoktur" | ASVS 5.0.0 "What is the ASVS?" | |
| 345 gereksinim, 17 bölüm, L1/L2/L3 = 70/183/92 | ASVS 5.0.0 resmî flat JSON | Kendi sayımımız |
| ASVS v5.0.0-8.2.2 (veri düzeyinde erişim, IDOR/BOLA, L1), 8.4.1 (çok kiracılı uygulamada kiracılar arası denetim, L2), 8.1.1 (yetki belgelemesi, L1) | ASVS 5.0.0 V8 | Metin etiketten |
| WSTG-ATHZ-04 IDOR testi en az iki (çoğunlukla daha fazla) kullanıcıyla yapılır | WSTG v4.2 | |
| API Security Top 10:2023 listesi (API1 BOLA … API10) | API Security Top 10:2023 | |
| SSDF v1.1 nihai (Şubat 2022); v1.2 yalnızca taslak (2025-12-17) | CSRC | |
| SAMM v2: beş iş işlevi, on beş uygulama | SAMM model sayfası | |

## 4. Yazı 2 — kanıt (Hata yolunda güvenlik)

| İddia | Kaynak ve bölüm | Not |
|---|---|---|
| A10:2025 yeni kategori; 24 CWE; hata işleme, mantık hataları, fail-open; tablo: maks. yaygınlık %20,67, ort. %2,95, 769.581 tekrarlanma, 3.416 CVE | A10:2025 Background + tablo | |
| Üç başarısızlık: önlememek, fark etmemek, kötü tepki vermek | A10:2025 Description | |
| İşlemin ortasında hata: işlemin bütün parçaları geri alınır ("failing closed") | A10:2025 How to prevent | |
| "Hiçbir şey sınırsız olmamalı": hız sınırı, kota, kısma | A10:2025 How to prevent | |
| Hata, oluştuğu yerde yakalanıp ele alınmalı; ek olarak global işleyici | A10:2025 How to prevent | Yazıda eleştirel okunur: aynı kategori CWE-390/396'yı içerir |
| Senaryo 3: borç–alacak–kayıt sırası, yarıda kesilen çok adımlı işlem | A10:2025 Example attack scenarios | |
| ASVS v5.0.0-16.5.1 (genel mesaj, iç ayrıntı yok, L2), 16.5.2 (dış kaynak hatasında güvenli çalışma, L2), 16.5.3 (fail-open önleme, L2), 16.5.4 (son çare işleyici, L3) ve dil notu (istisnasız diller) | ASVS 5.0.0 V16.5 | Metin etiketten |
| ASVS v5.0.0-16.3.4 beklenmeyen hataların ve güvenlik kontrolü hatalarının kaydı (L2) | ASVS 5.0.0 V16.3 | |
| ASVS v5.0.0-8.3.2 yetki değişikliğinin anında uygulanması; uygulanamıyorsa uyarı ve geri alma; bilgi sızıntısını önlemez (L3) | ASVS 5.0.0 V8.3 | Karar önbelleği gerilimi |
| WSTG-ERRH-01 (v4.2): amaç hata çıktısını bulmak ve çözümlemek; "happy path"in dışında kalan istisna kontrol atlatmaya yol açabilir | WSTG v4.2 | |
| Error Handling Cheat Sheet: global işleyici, genel yanıt, ayrıntı sunucu kaydında | Cheat Sheet (erişim 2026-10-21) | Sayfa RFC 7807'ye atıf yapıyor; 7807 RFC 9457 ile geçersizleşti |
| CWE-636 tanımı ve "fail functional" gerekçesi | CWE 4.20 | |
| CWE-209, 252, 390, 396 başlıkları | CWE 4.20 | |
| Envoy `failure_mode_allow`: false iken yetki servisiyle iletişim hatasında ya da 5xx'te istek reddedilir (Forbidden); true iken kabul edilir; varsayılan false | Envoy v1.40.0 belgesi | |
| Envoy `status_on_error`: yetki servisi hata verdiğinde ya da ulaşılamadığında istemciye dönen durum; varsayılan 403 Forbidden | Envoy v1.40.0 belgesi | Yazıda "ret ile karar alınamadı istemcide aynı görünür" çıkarımının dayanağı |
| Envoy `failure_mode_allow_header_add`: iki ayar birden açıkken iletişim hatasında ya da 5xx'te isteğe `x-envoy-auth-failure-mode-allowed: true` eklenir | Envoy v1.40.0 belgesi | |
| Kubernetes admission webhook `failurePolicy`: Ignore → istek devam eder; Fail → reddedilir; varsayılan Fail; doğru iletilmiş açık ret her zaman reddeder | Kubernetes belgesi, "Failure policy" | |
| `fetch()` yalnızca yanıt bir ağ hatasıysa TypeError ile reddeder; aksi hâlde (5xx dahil) yanıtla çözülür | WHATWG Fetch Standard, fetch() yöntem adımları ("Last Updated 19 October 2026") | |
| `AbortSignal.timeout(ms)` sinyali "TimeoutError" DOMException ile iptal eder | WHATWG DOM Standard, AbortSignal.timeout adımları | |
| RFC 9457 Problem Details, RFC 7807'yi geçersiz kılar (Temmuz 2023); yazarlar Nottingham, Wilde, Dalal | RFC 9457 başlık bilgisi | Error Handling Cheat Sheet hâlâ 7807'ye atıf yapıyor (erişim 2026-10-21) |
| "Fail-open'ın meşru olabileceği dört koşul" | — | Standart değil; yazıda "bizim mühendislik ölçütümüz" diye işaretlendi |
| Proactive Controls 2024 C3'ün metni istisna işleme rehberi vermiyor | Proactive Controls 2024, C3 | Yazıya taşınmadı; yalnızca kaynak seçiminin gerekçesi |

## 5. Planlanan yazılar için başlangıç noktaları

Yazı 3–25'in kaynak listesi `YOL-HARITASI.md`'de; aşağıdakiler henüz doğrulanmadı ve her biri
ilgili üretim run'ında açılıp sürüm/durumuyla kaydedilecek. Yazı numaraları 2026-10-21 revizyonundaki
yeni sıradır (eski 5–16 → 14–25); Git/GitHub hattının kaynakları §7–§11'de.

- NIST SP 800-63B'nin güncel nihai sürümü ve tarihi (yazı 14).
- NIST SP 800-61'in güncel sürümü (yazı 23) ve SP 800-57 Bölüm 1'in güncel revizyonu (yazı 21).
- SLSA belirtiminin güncel sürümü; CycloneDX/SPDX sürümleri (yazı 22).
- Durum makinesi yarış koşullarına dair birincil araştırmanın künyesi (yazı 17).
- Bulut üst veri servislerinin SSRF'e karşı tasarımı için sağlayıcı belgeleri (yazı 20).
- W3C CSP Level 3 ve Fetch standardının ilgili bölümleri (yazı 19).
- ASVS 5.0.0'ın V1, V2, V3, V4, V5, V6, V7, V9, (gerekirse V10), V11 + Ek C, V13, V15 bölümlerinden
  kullanılacak her kimliğin metni. Bu run'da yalnızca V8 ve V16 okundu. Resmî flat JSON/CSV 17
  bölümün 345 gereksiniminin hepsini içeriyor (bölüm başına sayım için yeterli); ayrı bölüm
  Markdown'ı V1, V2, V4, V6, V7, V8, V11, V13, V14, V15 ve V16 için indirildi, V3, V5, V9, V10 için
  indirilmedi. Yazıya alınacak kimlik metni etiketteki bölüm Markdown'ından okunur (§2 kanal notu).
  Yerel kopyalar `artifacts/` altında olduğundan (gitignore) kalıcı değildir.
  **Run 2:** V1, V2, V5, V8, V13 ve V15 etiketten yeniden indirildi (`artifacts/guvenlik-run2/src/asvs5/`;
  V13 run 1'deki kopyayla bayt bayt aynı). Yazıya giren kimlikler okundu: V1.5 (1.5.1), V5 (5.1.1,
  5.2.1–5.2.6, 5.3.1–5.3.3), V8 (8.2.1, 8.2.2, 8.3.1, 8.4.1), V13 (kontrol hedefi, 13.2.2, 13.4.1–13.4.7),
  V15 (15.1.1–15.1.5, 15.2.1–15.2.5). Hâlâ indirilmemiş bölümler: V3, V9, V10.

## 6. Açık araştırma borçları

- **Top 10:2025 metninin tutarsızlıkları** (§2) OWASP'a bildirilmedi; dış sisteme yazma bu serinin
  yetkisi değil. Kullanıcı isterse GitHub'da `OWASP/Top10` deposuna issue açılabilir. Bir sonraki
  bakımda sayfaların düzeltilip düzeltilmediğine bakılır; düzeltilirse yazı 1'in A01 paragrafı ve
  formül paragrafı yeniden okunur.
- **A01 puanı 621,60'ın yeniden üretilememesi:** kaynak açıklamadığı için yazıda neden tahmin
  edilmedi. OWASP bir veri eki yayımlarsa (giriş sayfası "ek veri analizi" planından söz ediyor)
  yazı 1'in formül paragrafı o ekle karşılaştırılır.
- **WSTG kararlı sürümü:** 5.0 kararlı olarak yayımlanırsa yazı 1 ve 2'deki "Ekim 2026 itibarıyla
  kararlı sürüm v4.2" ifadeleri ve `WSTG-ERRH-01` / `WSTG-ATHZ-04` kimlikleri yeni sürümde
  doğrulanır; kimlik değişirse revizyon işareti gerekmez, künye ve tarih güncellenir.
- **SSDF v1.2:** nihaileşirse yazı 1'deki "yalnızca taslak" cümlesi tarihli olarak güncellenir.
- **Kubernetes belgesi sürümsüz adreste:** sürümlü bir adres (`v1-NN.docs.kubernetes.io`) bir
  sonraki run'da bulunup künyeye yazılabilir; davranış (varsayılan `Fail`) uzun süredir aynı.
- **Planlanan yazıların kaynakları** §5'teki listede; her biri kendi üretim run'ında doğrulanacak.
- **Git/GitHub hattının borçları** §11'de.
- **Run 2'nin sürüme bağlı iddiaları (bakım kalemi, karar #26):** yazı 4'teki finalhandler/Express
  davranışı (finalhandler 2.x'in yeni bir ana sürümü ya da Express'in varsayılan işleyiciyi değiştirmesi
  durumunda yeniden ölçülür); libxml2 belgesinin `NOENT`/`NO_XXE`/`NONET` ifadeleri; libxmljs2 0.37.0
  seçenek adları. libxmljs2'nin içinde paketlediği libxml2 sürümü doğrulanmadı; yazı bu sürüme dayanan
  bir iddia kurmuyor.
- **Proactive Controls'un sonraki edisyonu:** sitede `archive/2024` yolu var, ana sayfa hâlâ "Top 10
  2024" diyor (2026-10-21). Yeni edisyon yayımlanırsa yazı 4'ün C5 atfı tarihlenir.
- **E2E kapsamı (isteğe bağlı):** `tests/e2e/series-reader.spec.ts`'in `ILLUSTRATED` listesi serinin en
  geniş tablosunu yazı 1–2'de sayıyor; yazı 3'ün beş sütunlu tablosu listede değil. Run 2'de aynı kural
  `artifacts/guvenlik-run2/render/paged.mjs` ile dört durumda doğrulandı; listeye eklemek küçük bir test
  değişikliğidir (karar #27).

## 7. Git/GitHub hattı — kaynak kaydı (müfredat revizyonu, 2026-10-21)

Erişim tarihlerinin hepsi 2026-10-21. Sayfalar metin olarak indirildi ve iddialar sayfa metniyle
eşleştirildi (`artifacts/git-revizyon/src/`; çalışma alanı, depoya girmez, kalıcı değil). HTTP 200
tek başına kanıt sayılmadı; GitHub Docs sayfalarında başlık, "Who can use this feature?" ve plan
cümlesi okundu.

| Kaynak | Kurum | Sürüm / durum | Rol |
|---|---|---|---|
| Git başvuru kılavuzu — https://git-scm.com/docs | Git projesi | Güncel kaynak sürümü **2.56.0** (git-scm.com ana sayfası). Sayfalar "last updated in" taşır: `git-pull` 2.55.0, `git-init` 2.54.0, BreakingChanges 2.55.0. Yerel deney Git **2.53.0.windows.2** ile | Davranış (normatif) |
| Pro Git, 2. baskı — https://git-scm.com/book/en/v2 | Scott Chacon, Ben Straub | yaşayan çevrimiçi metin; CC BY-NC-SA 3.0 | Kavramsal açıklama; bölüm 1.1–1.3, 2.5, 2.6, 3.1, 3.2, 3.5, 3.6, 7.7, 10.2, 10.3, 10.7 |
| GitHub blog, "We launched" — https://github.blog/news-insights/we-launched/ | GitHub | 2008-04-10 | Tarih |
| GitHub Docs — https://docs.github.com/en | GitHub | yaşayan; okunan sayfalar §8'de | Ürün davranışı ve plan koşulu |
| GitHub CLI kılavuzu — https://cli.github.com/manual/ | GitHub | `gh pr update-branch`, `gh pr merge` sayfaları | CLI davranışı |
| OWASP Top 10 CI/CD Security Risks — https://owasp.org/www-project-top-10-ci-cd-security-risks/ | OWASP lab projesi (proje liderleri Daniel Krivelevich, Omer Gil) | sayfada sürüm numarası yok | Risk farkındalığı (CICD-SEC-1…10) |
| Top 10:2025 A03 Software Supply Chain Failures | OWASP | 2025 (run 1'de indirilen metin) | Kod deposu, dal koruması, CI/CD'nin tedarik zincirine dahil olduğu |
| NIST SP 800-218 v1.1 (PDF) — https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf | NIST | v1.1 nihai, Şubat 2022 | Program: PS.1.1, PS.2.1, PS.3.1–3.2 |
| SemVer 2.0.0 — https://semver.org/spec/v2.0.0.html | Tom Preston-Werner (özgün yazar) | 2.0.0; CC BY 3.0 | Sürüm numarası belirtimi |
| DORA, "Trunk-based development" — https://dora.dev/capabilities/trunk-based-development/ | DORA | yaşayan sayfa | Araştırma özeti (görüş olarak) |
| Vincent Driessen, "A successful Git branching model" — https://nvie.com/posts/a-successful-git-branching-model/ | yazarın sitesi | 2010 yazısı + "Note of reflection", 2020-03-05 | GitFlow'un özgün tarifi ve yazarının sonraki görüşü |

## 8. Git/GitHub hattında doğrulanan ayrımlar

Kaynağın söylediği ile bizim çıkarımımız ayrı sütunlarda değil, cümlede ayrıdır: "kaynak:" doğrudan
sayfadan, "çıkarım:" bizimdir.

**Git'in modeli ve tarihi (Pro Git, başvuru kılavuzu)**
- Kaynak: Linux çekirdeği 2002'de tescilli dağıtık sistem BitKeeper'a geçti; 2005'te ücretsiz
  kullanım hakkı kaldırılınca topluluk (özellikle Linus Torvalds) kendi aracını geliştirdi (Pro Git
  1.2). Merkezî sistemlerde (CVS, Subversion, Perforce) sürümler tek sunucuda; dağıtık sistemlerde
  istemci deponun tam geçmişini aynalar (1.1). Git veriyi anlık görüntü akışı olarak düşünür,
  neredeyse her işlem yereldir, her şey SHA-1 özetiyle sağlamalanır (1.3).
- Kaynak: dal, commit'lerden birine işaret eden hafif, taşınabilir bir işaretçidir; varsayılan dalın
  adı Pro Git'te `master`'dır ve "özel bir dal değildir"; dal, işaret ettiği commit'in 40 karakterlik
  özetini taşıyan bir dosyadır (Pro Git 3.1).
- Kaynak (güncel kılavuz, Pro Git'ten farklı): `git init` ilk dalın adını `init.defaultBranch`
  ayarından alır; ayar yoksa "şu an `master`, Git 3.0 yayımlandığında `main`" (`git-init`,
  2.54.0). BreakingChanges: yeni depolarda varsayılan dal `main` olacak. GitHub yeni depoda varsayılan
  dalı `main` adlandırır; varsayılan dal bir depo ayarıdır ve yeni PR'ların tabanıdır (GitHub Docs
  "About branches"). Çıkarım: `main` ile `master` arasında yapısal bir fark yok; fark adlandırma ve
  ayardır.
- Kaynak: nesne biçimi varsayılan `sha1`, isteğe bağlı `sha256`; ikisi arasında şu an birlikte
  çalışma yok (`git-init`, `--object-format`).

**Uzak depo, `fetch`, `pull`, `push` (Pro Git 2.5, 3.5; kılavuz)**
- Kaynak: uzak izleme dalları uzak dalların durumuna verilen yerel referanslardır; okur onları
  taşıyamaz, Git ağ iletişiminde taşır; origin sunucusuyla iletişim yokken `origin/master` hareket
  etmez; `git fetch` yalnızca veriyi indirir, çalışılan işi birleştirmez ya da değiştirmez (Pro Git
  2.5, 3.5). `git branch -vv`'nin ahead/behind sayıları sunucuya sorulmaz, yerel önbellektir (3.5).
- Kaynak (güncel kılavuz, Pro Git'ten farklı): `git pull` önce `git fetch` çalıştırır, sonra yukarı
  akış dalını bütünleştirir; dört yol var ve `--ff-only` **varsayılandır**: yerel dal ıraksamışsa
  başarısız olur (`git-pull`, 2.55.0). Pro Git'in "çoğu durumda `fetch` + `merge`" anlatımı ve
  "2.27'den itibaren uyarı" notu bu konuda eski kalıyor.
- Kaynak: yukarı akış `.git/config`'te `remote` ve `merge` alanlarında durur; klon varsayılan dal için
  yukarı akışı otomatik kurar; `git status` "Your branch and origin/main have diverged" der
  (`git-pull`, UPSTREAM BRANCHES).

**Birleştirme, rebase, squash (Pro Git 3.2, 3.6; GitHub Docs)**
- Kaynak: deponuz dışında var olan ve başkalarının üzerine iş kurmuş olabileceği commit'leri rebase
  etmeyin; rebase mevcut commit'leri bırakıp benzer ama farklı yenilerini yaratır (Pro Git 3.6).
- Kaynak: GitHub'da üç PR birleştirme yöntemi var; "Merge pull request" `--no-ff` ile birleştirme
  commit'i üretir; squash bütün commit'leri tabanda tek commit yapar; rebase and merge her commit'i
  yeni SHA'yla tabana ekler ve her zaman committer bilgisini günceller. Squash kısa ömürlü dallarda en
  iyi çalışır: squash sonrası aynı dalda devam edilirse sonraki PR'lar zaten squash edilmiş commit'leri
  içerebilir, çatışma ihtimali artar ve aynı çatışma birden çok kez çözülebilir (GitHub Docs "Pull
  request merges").
- Kaynak: "dolaylı birleştirme": PR'ın head commit'leri tabana başka yoldan ulaşırsa PR, dal koruması
  koşulları sağlanmamış olsa bile birleşmiş görünür (aynı sayfa).
- Kaynak: PR sayfasında dal, tabanı birleştirerek ("Update branch") ya da rebase ederek güncellenir;
  HEAD dalı korumalıysa düğme kullanılamayabilir (GitHub Docs "Keeping your pull request in sync with
  the base branch"). `gh pr update-branch` varsayılan olarak birleştirme commit'iyle günceller,
  `--rebase` ile rebase eder (GitHub CLI kılavuzu).

**Geri alma ve kurtarma (Pro Git 7.7, 10.7; kılavuz)**
- Kaynak: `reset`'i tehlikeli yapan tek biçim `--hard`'dır ve Git'in gerçekten veri yok ettiği
  birkaç durumdan biridir; `checkout` çalışma ağacı açısından güvenlidir, `reset --hard` değildir
  (Pro Git 7.7).
- Kaynak: `git reflog expire` varsayılan olarak 90 günden eski girdileri (`gc.reflogExpire`), mevcut
  uca ulaşılamayan girdileri 30 günde (`gc.reflogExpireUnreachable`) siler; `git gc` ulaşılamaz
  nesneleri iki haftalık süreden sonra temizler (`gc.pruneExpire`) (`git-gc`, `git-reflog`).
- Kaynak: birleştirme commit'ini geri döndürmek, o birleştirmenin getirdiği ağaç değişikliklerini bir
  daha istemeyeceğini beyan eder; sonraki birleştirmeler yalnızca sonradan gelen değişiklikleri
  getirir (`git-revert`, `-m`).
- Kaynak: `--force-with-lease` uzak ref beklenen değerdeyse günceller; araya giren bir `fetch`
  beklentiyi tazeleyebileceği için `--force-if-includes` yerel dalın uzak ucu içerip içermediğini
  ayrıca denetler (`git-push`).
- Kaynak: GitHub'da kapalı ya da birleşmiş bir PR'ın head dalı silinmişse PR sayfasından geri
  yüklenebilir; açık PR'ı olan dal silinemez (GitHub Docs "Deleting and restoring branches in a pull
  request").

**Ekip akışı, sürüm, dağıtım (GitHub Docs; SemVer; DORA; Driessen)**
- Kaynak: GitHub 10 Nisan 2008'de "resmen yayında" duyurusu yaptı (GitHub blog).
- Kaynak: CODEOWNERS dosyası `.github/`, kök ya da `docs/` altında aranır; PR tabanındaki sürümü
  kullanılır; kod sahipleri yazma yetkisi taşımalıdır; sahipler inceleme için otomatik istenir ama
  onayın zorunlu olması dal koruması ya da ruleset'le sağlanır; CODEOWNERS'ın kendisine de sahip
  atanması önerilir; 3 MB üstü dosya yüklenmez (GitHub Docs "About code owners").
- Kaynak: birleştirme kuyruğu, PR'ın değişikliklerinin hedef dalın son hâli ve kuyruktaki öteki
  PR'larla birlikte gerekli kontrolleri geçmesini sağlar; Actions iş akışlarının `merge_group`
  olayını dinlemesi gerekir (GitHub Docs "Managing a merge queue").
- Kaynak: GitHub Release'ler Git etiketlerine dayanır; değişmez sürümde etiket bir commit'e kilitlenir,
  sürüm varken taşınamaz ya da silinemez, sürüm silinse bile aynı etiket adı yeniden kullanılamaz;
  sürüm varlıkları değiştirilemez; değişmez sürüm bir sürüm tasdiki (attestation) üretir (GitHub Docs
  "About releases", "Immutable releases").
- Kaynak: SemVer bir genel API ilan edilmesini şart koşar; MAJOR/MINOR/PATCH kuralları bu API'ye
  göredir; yayımlanmış bir sürümün içeriği değiştirilemez, değişiklik yeni sürümle yayımlanır
  (SemVer 2.0.0).
- Kaynak: trunk tabanlı geliştirmede her geliştirici işini günde en az bir kez (belki birkaç kez) ana
  dala birleştirir; dallar genellikle birkaç saatten uzun yaşamaz (DORA). GitFlow'un yazarı 2020
  notunda modelin bir standart, hatta dogma gibi görülmeye başladığını yazar; sürekli teslim yapan
  ekiplere çok daha basit bir akışı (GitHub flow gibi) önerir; açıkça sürümlenen ya da sahada birden
  çok sürümü desteklenen yazılım için GitFlow'un hâlâ uygun olabileceğini söyler (Driessen).

**Organizasyon yönetişimi (GitHub Docs)**
- Kaynak: depo rolleri en azdan en çoğa Read, Triage, Write, Maintain, Admin; özel depo rolleri
  yalnızca Enterprise Cloud; organizasyon owner'ları her depoda yöneticidir; deploy anahtarının özel
  anahtarına sahip olan, organizasyondan çıkarılmış olsa bile depoyu okuyup (ayara göre) yazabilir
  ("Repository roles for an organization").
- Kaynak: temel yetki bütün üyelere uygulanır, dış katkıcılara uygulanmaz; bir depoda daha yüksek
  erişim verilmişse temel yetkiyi geçersiz kılar; temel yetki değişikliği yeni ve mevcut bütün
  üyeleri etkiler; iç depolar temel yetki "none" olsa bile en az okuma görünürlüğündedir ("Setting
  base permissions for an organization").
- Kaynak: owner rolü sınırlı tutulmalı ama iki kişiden az olmamalı; tek owner'lı organizasyonda
  owner'a ulaşılamazsa projeler erişilemez hâle gelebilir ("Roles in an organization", "Maintaining
  ownership continuity"). Özel organizasyon rolleri yalnızca Enterprise Cloud.
- Kaynak: 2FA zorunlu kılındığında 2FA'sız üyeler ve fatura yöneticileri organizasyon kaynaklarına
  erişemez ama üyeliklerini (ve koltuklarını) korur; 2FA'sız dış katkıcılar çıkarılır, özel depo
  çatallarına erişimi de kaybeder ve üç ay içinde 2FA açarlarsa geri alınabilir; dış katkıcı olan bot
  ve servis hesapları için de 2FA gerekir; yalnızca güvenli 2FA yöntemlerini (SMS hariç) zorunlu
  kılmak ayrı bir seçenektir ("Requiring two-factor authentication in your organization").
- Kaynak: dış katkıcı takıma eklenemez; ücretli planda özel depoya dış katkıcı eklemek bir lisans
  kullanır ("Adding outside collaborators").
- Kaynak: denetim kaydı son 180 günün olaylarını listeler; yalnızca owner'lar erişir; JSON/CSV dışa
  aktarım; API erişimi Enterprise Cloud ("Reviewing the audit log for your organization").
- Kaynak: ruleset ve dal koruması birlikte çalışır; aynı dala birden çok ruleset uygulanabilir, kurallar
  birleşir ve aynı kuralın en kısıtlayıcı biçimi geçerli olur; okuma yetkisi olan herkes etkin
  ruleset'leri görebilir; bypass rol, takım ya da GitHub App için tanımlanır ("About rulesets"). Dal
  koruması varsayılan olarak zorla push'u ve silmeyi engeller; kısıtlamalar varsayılan olarak
  yöneticilere uygulanmaz, isteğe bağlı olarak uygulanabilir; eski onayları yeni push'ta düşürme ve
  "son push'u yapan dışında birinin onayı" seçenekleri var ("About protected branches"). Ruleset
  kural listesi: oluşturma/güncelleme/silme kısıtı, doğrusal geçmiş, dağıtım başarısı, imzalı commit,
  PR zorunluluğu, durum kontrolleri, zorla push engeli, kod tarama ve gizli bilgi taraması sonuçları,
  dosya yolu/uzantı/boyut kısıtları ("Available rules for rulesets").
- Kaynak: organizasyon token politikası klasik ve ince taneli kişisel erişim token'larının
  organizasyon kaynaklarına erişimini kısıtlayabilir; ince taneli token'lar için yönetici onayı
  varsayılandır; ince taneli token'larda varsayılan azami ömür politikası 366 gün, klasik token'larda
  süre zorunluluğu yok; politika token'ı iptal etmez, uyumsuz token'ı engeller ("Setting a personal
  access token policy for your organization").
- Kaynak: depoya yazma erişimi olan herkes depoda tanımlı bütün sırları okuyabilir; `GITHUB_TOKEN`
  varsayılan yetkisini içerik için salt okuma yapmak iyi uygulamadır; action'lar tam commit SHA'sıyla
  sabitlenmelidir, etiket taşınabilir ya da silinebilir; `pull_request_target` ve `workflow_run`
  ayrıcalıklıdır ve güvenilmeyen kodu check-out etmemelidir; buluta OIDC ile uzun ömürlü sır
  saklamadan erişilebilir; kendi barındırılan runner'lar kalıcı ele geçirilebilir (Actions "Secure use
  reference").
- Kaynak: sızan sır için ilk adım iptal ve/veya rotasyondur; geçmişi yeniden yazmanın yan etkileri
  (yeniden bulaşma, değişen commit kimlikleri, kapalı PR farklarının kaybı, imzaların düşmesi) vardır;
  klonlar, çatallar ve önbellek görünümleri kopyayı tutabilir ("Removing sensitive data from a
  repository"). Depo/organizasyon düzeyi push protection GitHub Secret Protection gerektirir ve
  varsayılan kapalıdır; kullanıcı düzeyi push protection varsayılan açıktır ve herkese açık depolara
  sır push'unu durdurur ("About push protection").

**Güvenlik eksenine bağ**
- Kaynak: Top 10:2025 A03, değişiklik yönetimi olmamasını (kuruluşun kod deposundaki değişiklikler
  dahil) ve CI/CD hattının inşa ettiği sistemlerden zayıf olmasını risk sayar; önlemler arasında kod
  deposunun korunması (sır commit'lememek, dal koruması, yedek), geliştirici iş istasyonu (MFA dahil)
  ve CI/CD'de görev ayrılığı, erişim kontrolü, imzalı yapı, ortam kapsamlı sırlar ve kurcalanmaya
  dayanıklı kayıt sayılır.
- Kaynak: OWASP Top 10 CI/CD Security Risks on risk sayar: yetersiz akış kontrolü (CICD-SEC-1),
  yetersiz kimlik ve erişim yönetimi (2), bağımlılık zinciri istismarı (3), zehirli hat yürütmesi
  (4), yetersiz hat tabanlı erişim kontrolü (5), yetersiz kimlik bilgisi hijyeni (6), güvensiz sistem
  yapılandırması (7), yönetilmeyen üçüncü taraf servis kullanımı (8), yanlış yapıt bütünlüğü
  doğrulaması (9), yetersiz kayıt ve görünürlük (10).
- Kaynak: SSDF v1.1 PS.1.1 kodun her biçimini (kaynak, çalıştırılabilir, kod olarak yapılandırma) en
  az yetki ilkesine göre saklamayı; PS.2.1 sürüm bütünlüğünü doğrulama bilgisini yayımlamayı; PS.3
  her sürümü arşivlemeyi ve korumayı ister.

## 9. Yerel deney (Git 2.53, yalıtılmış yapılandırma)

Betik ve çıktı: `artifacts/git-revizyon/git-sandbox.sh`, `git-sandbox-output.txt` (çalışma alanı).
Global ve sistem Git yapılandırması devre dışı (`GIT_CONFIG_GLOBAL` boş dosya, `GIT_CONFIG_NOSYSTEM=1`);
`origin` yerel bir bare depo, iki klon. Bu bölüm çıkarımdır; kaynak iddiası değildir.

| Deney | Sonuç (Git 2.53.0.windows.2) | Kaynakla ilişkisi |
|---|---|---|
| `init.defaultBranch` yokken `git init` | `refs/heads/master` | `git-init` ile uyumlu |
| Başka klon `main`'e push etti; `fetch` öncesi/sonrası | `fetch` yalnızca `origin/main`'i taşıdı; `main` ve `feature` yerinde; `main...origin/main` = 0 1 | Pro Git 3.5 ile uyumlu |
| `main`'de yapılandırmasız `pull` (ıraksama yok) | ileri sardı; `feature` yeni commit'i hâlâ içermiyor | düzeltilecek yanlış modelin gösterimi |
| Iraksamış `main`'de yapılandırmasız `pull` | "You have divergent branches and need to specify how to reconcile them"; çıkış 128 | `git-pull` (`--ff-only` varsayılanı) ile uyumlu |
| `merge --squash` ile tabana alınan dalda devam edip tabanı birleştirmek | `merge-base` eski çatal noktası; aynı satırda çatışma | GitHub Docs squash uyarısı ile uyumlu |
| Uzak dal başkasınca ilerletilmişken `push --force-with-lease` | "stale info" ile reddedildi | `git-push` ile uyumlu |
| Araya `fetch` girince `--force-with-lease --force-if-includes` | reddedildi | `git-push` ile uyumlu |
| Araya `fetch` girince yalnız `--force-with-lease` | zorla güncelledi; başkasının commit'i uzak daldan düştü, yerel `reflog`'ta duruyor | çıkarım: `fetch` "kira"yı tazeler; 8'in ana uyarısı |

## 10. Plan koşulları ve kaynak içi tutarsızlıklar (GitHub Docs, Ekim 2026)

- **Plan koşulları:** Korumalı dal ve kod sahipleri herkese açık depolarda Free ile, özel depolarda
  Pro, Team, Enterprise Cloud ve Server ile; ruleset'ler herkese açık depolarda Free ile, özel
  depolarda Pro, Team ve Enterprise Cloud ile; push ruleset'leri Team'de özel ve iç depolarda;
  birleştirme kuyruğu organizasyona ait herkese açık depolarda ve Enterprise Cloud'daki özel
  depolarda; SAML SSO, SCIM, özel organizasyon ve depo rolleri, iç depolar ve denetim kaydı akışı
  Enterprise'da; 2FA zorunluluğu Free, Team, Enterprise Cloud ve Server'da (yönetilen kullanıcılı
  kurumsal hesapta değil); depo/organizasyon düzeyi push protection GitHub Secret Protection ister.
  Kaynak sayfalar: "GitHub's plans", ilgili özellik sayfaları.
- **Tutarsızlık — organizasyon düzeyi ruleset:** "Creating rulesets for repositories in your
  organization" "GitHub Team ya da GitHub Enterprise planındaki müşteriler" der; "About rulesets"
  bir yerde "GitHub Team ve GitHub Enterprise planlarındaki müşteriler", başka bir yerde
  "GitHub Enterprise planındaki organizasyonlar" der. Yazı 12 bu koşulu tek cümleyle kesinleştirmez;
  üretimde plans sayfası, changelog ve gerekirse test organizasyonuyla yeniden bakılır.
- **Tutarsızlık değil, sürüm farkı:** Pro Git `master`'ı varsayılan dal ve `pull`'u `fetch` + `merge`
  diye anlatır; güncel başvuru kılavuzu varsayılan dalı ayara bağlar (Git 3.0'da `main`) ve `pull`'da
  `--ff-only`'yi varsayılan yapar. Yazılarda kılavuz esas alınır, fark adlandırılır (`SOZLESME.md`
  §5).
- **Lisans:** Pro Git CC BY-NC-SA 3.0, SemVer CC BY 3.0 (sayfalarında yazılı); GitHub Docs'un
  lisansı bu revizyonda doğrulanmadı. Hiçbirinden uzun pasaj kopyalanmaz; kısa alıntı atıfla yapılır,
  anlatım Türkçe yeniden kurulur.

## 11. Git/GitHub hattının açık araştırma borçları

- **Üretimde açılacak sayfalar:** GitHub Docs "GitHub credential types reference" (token biçimleri ve
  ömürleri; yazı 13), "Managing bots and service accounts with two-factor authentication" (11),
  "Converting branch protections to rulesets" (12), "Securely using pull_request_target" ve
  `GITHUB_TOKEN` varsayılan yetkileri (13), SAML SSO sayfası (yalnızca Enterprise Cloud belgesi; 11'de
  plan notu olarak). "Changing the default branch" run 3'te açıldı ve 5'te kullanıldı (§15).
- **Run 3'ün tarihli ve sürüme bağlı iddiaları (bakım kalemi):** Git 3.0'ın üç varsayılanı (yeni
  depolarda `main`, `reftable`, SHA-256; BreakingChanges 2.55.0, "planlanmış yayım tarihi yok"); `git
  init`'in `init.defaultBranch` yokken `master` vermesi ve ipucu metni (yerel Git 2.53.0.windows.2);
  `git pull` varsayılanı `--ff-only` (git-pull 2.55.0); actions/checkout v7.0.1'in varsayılan tek commit
  indirmesi; OCI image-spec v1.1.1 `revision` tanımı; GitHub'ın yeniden adlandırma etkileri (ham dosya
  adresleri ve eski adla `git pull` yönlendirilmez, action'ı eski dal adıyla çağıranlar kırılır); `gh repo
  list`'in `--limit` varsayılanı 30 (gh 2.98.0). Git 3.0 yayımlandığında 5'in "Ekim 2026 itibarıyla"
  cümleleri ve kurulumdaki `--object-format=sha1` gerekçesi yeniden okunur; ref biçimi değişince `.git/refs`
  bloğu Git 3.0'da dosya bulamaz (yazı bunu söylüyor).
- **Kaynak içi tutarsızlık (Git kılavuzu, Ekim 2026):** `git-pull` (2.55.0) varsayılanı `--ff-only`
  diye yazarken `git-push` (2.55.0) "Note about Fast-Forwards" bölümü "`git pull` bir birleştirme commit'i
  oluşturur" der; ret iletisinin ipucu da "push'tan önce `git pull`" önerir. Yazı 6 `git-pull` sayfasını ve
  yerel deneyi esas aldı, farkı adıyla yazdı. Pro Git 2.5 ve 3.5 de `pull`'u "getir ve birleştir" diye
  anlatıyor (§10'daki sürüm farkı).
- **Run 4'ün tarihli ve sürüme bağlı iddiaları (bakım kalemi):** GitHub'ın birleştirme yöntemi ayarları
  ("General" → "Pull Requests"; yöntemler Maintain/Admin, otomatik dal silme Admin; belgede plan koşulu yok);
  "Rebase and merge"ün her zaman yeni SHA üretmesi, baştan boş commit'leri atması ve imza doğrulamasız eklemesi;
  "Update branch"in korumalı HEAD dalında kullanılamayabilmesi; "Restore branch" yalnız kapanmış PR'da; "Revert"
  düğmesinin GitHub dışında birleşen PR için tek tek commit gerektirmesi; dolaylı birleştirme; korunan dalın plan
  koşulu ve zorla push/silme engelinin varsayılanı; gh 2.98.0 JSON alanları (`mergeCommitAllowed`,
  `squashMergeAllowed`, `rebaseMergeAllowed`, `deleteBranchOnMerge`). Git tarafında: `merge-tree` yeni kipi
  2.38'den, `zdiff3` 2.35'ten, `--force-if-includes` 2.30'dan, "Reapply" mesajı 2.43'ten (sürüm notları);
  yazılardaki ileti metinleri (`branch -d` ipucu, `merge --squash` iletileri) Git 2.53.0.windows.2 çıktısıdır
  ve sürümle değişebilir, kimlikler değişmez. GitHub Docs'un `/en/pull-requests/` adres yapısı Ekim 2026'da
  `get-started` / `how-tos` / `reference` diye yeniden düzenlenmiş; eski adresler (ör. "About pull request
  merges") yönleniyor olabilir, künyeler yeni adreslerle verildi.
- **Run 5'in tarihli ve sürüme bağlı iddiaları (bakım kalemi):** birleştirme kuyruğunun plan koşulu (kuruluşa ait herkese
  açık depo, GHEC özel depo, GHES kuruluş deposu), dal koruması ve kod sahiplerinin plan koşulu, ortam koruma kurallarının
  plan koşulu (Free/Pro/Team'de incelemeci ve bekleme süresi yalnız herkese açık depoda) ve yönetici muafiyetinin
  kapatılabilirliği; sıkı/gevşek gerekli kontrol ve beklenen kaynak; koşulla atlanan işin "Success", filtreyle atlananın
  "Pending" sayılması; `pull_request`'in `refs/pull/N/merge`'ü `actions/checkout` varsayılanıyla sınaması; değişmez sürümün
  davranışı ve "plan koşulu yok" tespiti (GA 2025-10-28); `gh release create`'in yerelde kalan etiket iletisi (gh 2.103.0
  ikilisinde görüldü, kılavuzda yok); action sabitleri (checkout v7.0.1, setup-node v7.1.0; yeni sürümler çıktıkça yazı 9'un
  örneği eskir, kimlik doğru kalır); Node.js'in tip ayıklama varsayılanı. Git tarafında: etiket getirmenin 2.20 kuralı,
  `versionsort.suffix` davranışı, ileti metinleri ("already exists", "would clobber existing tag", "stale info") Git
  2.55.0.windows.5 çıktısı. Değişmez sürümün kapatılınca önceki Release'lere etkisi yalnızca changelog'da; GitHub Docs'a
  girerse yazı 10'un kutusundaki geri dönüş cümlesi kesinleştirilir.
- **Tarihli iddialar:** Git 3.0'ın yayım zamanı ve varsayılan dal değişikliği; GitHub ruleset ve
  birleştirme kuyruğu plan koşulları; 2FA zorunluluğunun üye/dış katkıcı davranışı (son yıllarda
  değişti); immutable releases'ın kapsamı. Her biri yazıldığı run'da yeniden doğrulanır ve "Ekim
  2026 itibarıyla" gibi tarihlenir.
- **OWASP Top 10 CI/CD Security Risks'in yayın tarihi ve sürümü:** proje sayfasında yok; projenin
  GitHub deposundan doğrulanacak.
- **PR iş akışının tarihi:** fork + PR modelinin GitHub'daki evrimi için birincil kaynak (GitHub
  blog arşivi) bulunmadı; yazı 9 yalnızca 2008 lansmanını kullanır, evrim cümlesi kaynak bulunursa
  girer.
- **SLSA source track:** dal koruması ve inceleme için kaynak bütünlüğü düzeyleri; durumu (taslak /
  nihai) yazı 12 ve 22 için doğrulanacak.

## 12. Yazı 3 — kanıt (Tehdit modelleme)

Erişim tarihlerinin hepsi 2026-10-21; metinler `artifacts/guvenlik-run2/src/` altında.

| İddia | Kaynak ve bölüm | Not |
|---|---|---|
| Tehdit modelleme yapılandırılmış, tekrarlanabilir bir süreçtir: sistemi güvenlik açısından modellemek, tehditleri bulmak, cevap belirlemek; ideal olarak tasarımda; sistemle birlikte güncellenir | Threat Modeling Cheat Sheet, Overview | |
| Dört soru | Threat Modeling Manifesto; Cheat Sheet Overview Manifesto'ya atıfla | Manifesto ilk sürüm 2020-11-17 |
| DFD en yaygın yaklaşımdır; güven sınırları, veri akışları, veri depoları, süreçler ve dış varlıklar açıkça görünmeli | Cheat Sheet, System Modeling | |
| STRIDE: Microsoft çalışanlarının geliştirdiği altı sınıf; her sınıf bir özelliğin ihlali (Repudiation ↔ Accounting) | Cheat Sheet, Threat Identification tablosu | Yazıda "hesap verebilirlik" |
| Tehditler etkiledikleri bileşen, akış ya da sınırla kaydedilir | Cheat Sheet, Threat Identification | |
| Cevaplar: azalt, ortadan kaldır, aktar, kabul et; azaltımlar uygulanabilir gereksinime çevrilir | Cheat Sheet, Response and Mitigations (Shostack'a atıfla) | |
| Gözden geçirmenin son maddesi: azaltımlar test edilebiliyor mu | Cheat Sheet, Review and Validation | |
| Değerler: sürekli iyileştirme, anlayış yolculuğu; kalıp: kusursuz temsil | Manifesto, Values; Anti-patterns | |
| Güvensiz tasarım ≠ güvensiz uygulama; kusursuz uygulama eksik kontrolü düzeltmez; tehdit modelleme iş kalemi oturumlarında, veri akışı ve erişim denetimi değişikliklerine bakarak | A06:2025 Description, Secure Design | A06 tablosu: 39 CWE, maks. yaygınlık %22,18, ort. %1,86 (yazıda kullanılmadı) |
| PW.1.1 risk modelleme (tehdit modelleme, saldırı modelleme, saldırı yüzeyi haritalama); PW.1.2 gereksinim, risk ve kararların izlenmesi | NIST SP 800-218 v1.1 | |
| CWE-501 tanımı ve "programın içinden geçen çizgi" açıklaması | CWE 4.20 | |
| CWE-409 sıkıştırma bombası; CWE-22 yol geçişi | CWE 4.20 | |
| "Tehlikeli işlev" tanımı ve yüksek risk ifadesi; 15.1.3, 15.1.5, 15.2.2, 15.2.5 metinleri ve seviyeleri | ASVS 5.0.0 V15.1–V15.2 | |
| 5.1.1, 5.2.1, 5.2.2, 5.2.3, 5.2.6, 5.3.2, 5.3.3 metinleri ve seviyeleri | ASVS 5.0.0 V5 | |
| 8.4.1 kiracılar arası denetim (L2) | ASVS 5.0.0 V8.4 | |
| Content-Type kullanıcıdan gelir, güvenilmez; yeniden yazım her kötü içeriği temizlemez, görüntü işleyici de güvenilmeyen girdi işler; açılmış boyut sınırı | File Upload Cheat Sheet | |
| WSTG-BUSL-09: arşivle dizin geçişi, zip bombası, EICAR; bomba denemesi için riskleri değerlendirme ve yazılı onay; otomatik ölçeklemede maliyet | WSTG v4.2 | |
| PNG imzası `89 50 4E 47 0D 0A 1A 0A`; IHDR ilk parça; genişlik ve yükseklik 4'er bayt | W3C PNG (Third Edition), §5.2, §11.2.1 | Kendi ürettiğimiz dosyada bayt 16–23 doğrulandı (§14) |
| Sınırın yerini ağ değil, köken ve varılan sürecin yetkisi belirler | — | Bizim mühendislik ölçütümüz; yazıda öyle işaretli |

## 13. Yazı 4 — kanıt (Güvenli varsayılanlar)

| İddia | Kaynak ve bölüm | Not |
|---|---|---|
| A02:2025 tanımı ve "uygulama açık olabilir" listesi; 5. sıradan 2.'ye; 16 CWE (CWE-611, CWE-489 dahil); ort. yaygınlık %3,00, maks. %27,70; tekrarlanabilir sertleştirme süreci olmayan sistemler daha yüksek risk altında | A02:2025 Background, tablo, Description, mapped CWEs | Arka planın "test edilen uygulamaların %100'ü" cümlesi yine kapsama sütununu okuyor (§2); yazıda kullanılmadı |
| Önleme: ortamlar yalnız kimlik bilgileriyle farklı ve otomatik; bütün ortamlarda otomatik doğrulama; bulut depolama izinleri; otomatik değilse yılda bir | A02:2025 How to prevent | |
| Güvenli varsayılanın tanımı; bildirimsel yapılandırma kaynak kod gibi yönetilir | Proactive Controls 2024 C5 | |
| V13 kontrol hedefi; 13.4.2, 13.4.5 (L2); 15.2.3 (L2); 1.5.1 (L1) | ASVS 5.0.0 V13, V15, V1.5 | |
| PW.9.1 güvenli temel çizgi; PW.9.2 varsayılanları uygulama ve belgeleme | NIST SP 800-218 v1.1 | |
| CWE-1188, CWE-611, CWE-489 tanımları | CWE 4.20 | |
| finalhandler: `env = opts.env \|\| process.env.NODE_ENV \|\| 'development'`; `env !== 'production'` ise gövde `err.stack` | finalhandler v2.1.1 `index.js` satır 73, 160–162 | Express 5.3.0 `finalhandler ^2.1.0`; ölçüm §14 |
| Express varsayılan işleyicisi yığın izini üretim ortamında göndermez | Express 5.x Error Handling | |
| libxml2 2.9'dan beri XXE varsayılan kapalı; `NOENT` ve `DTDLOAD` tanımlanmamalı | XXE Prevention Cheat Sheet, libxml2 | |
| `NOENT`: adına rağmen yerine koymayı ve dış varlık yüklemeyi açar, tehlikeli; `NO_XXE` (2.13'ten beri) dış yüklemeyi kapatır; `NONET` yalnızca yerleşik HTTP/FTP istemcileri, 2.15'ten beri özel yükleyiciler dışında etkisiz | libxml2 `parser.h` belgesi | |
| libxmljs2'de `noent` → `XML_PARSE_NOENT`, `nonet` → `XML_PARSE_NONET`; kendi testi `noent: true` ile iç varlığı yerine koyar | libxmljs2 `src/xml_document.cc`, `index.d.ts`, `test/xml_parser.test.js` | `main` dalı; npm 0.37.0 |
| .NET: XmlDocument, XmlTextReader, XPathNavigator 4.5.2 öncesi açık, sonrası korumalı | XXE Prevention Cheat Sheet, .NET | |
| DTD mümkünse kapatılır, DOCTYPE reddedilir; desteklenmeyen güvenlik ayarı yapılandırma hatasıdır | XXE Prevention Cheat Sheet, General Guidance | |
| API8:2023: otomatik ve sürekli yapılandırma değerlendirmesi | API Security Top 10:2023 | |
| WSTG-CONF-02 hedefleri; WSTG-CONF-05 gizli yönetim arayüzleri | WSTG v4.2 | |

## 14. Run 2 ölçümleri (kendi hesabımız ve deneyimiz)

Betikler scratchpad'de (oturuma özgü, kalıcı değil); sonuçlar yazılardadır.

| Ölçüm | Ortam | Sonuç |
|---|---|---|
| Sıfırlarla dolu tek dosyalı zip, `ZIP_DEFLATED`, düzey 9 | Python 3.14.5, zlib 1.3.1.zlib-ng | 60 MiB → 61.287 bayt (≈1.027:1); 200 MiB → 203.974 bayt; 1 GiB → 1.043.770 bayt. Başka zlib uygulamasında birkaç bayt fark edebilir |
| 20.000 × 20.000, 8 bit gri PNG (IDAT sıfır satırlar) | aynı | 388.871 bayt; çözülmüş piksel verisi 400.000.000 bayt; dört kanal 1,6 GB (hesap); bayt 16–23 = `00 00 4e 20 00 00 4e 20` |
| finalhandler varsayılan hata gövdesi (`probe.mts`) | Node.js 24.14.0, finalhandler 2.1.1 | `NODE_ENV` yok / `staging` / `Production` → 500 + hata metni ve yığın izi; `production` → "Internal Server Error" |

## 15. Yazı 5 — kanıt (Git'in zihinsel modeli)

Erişim tarihlerinin hepsi 2026-10-21; metinler `artifacts/guvenlik-run3/src/` altında (yeniden indirildi;
müfredat revizyonundaki kopyalarla aynı gün). Git kılavuz sayfalarının "last updated in" sürümleri
künyede. git-scm.com ana sayfası güncel kaynak sürümünü **2.56.0 (2026-09-28)** gösteriyor.

| İddia | Kaynak ve bölüm | Not |
|---|---|---|
| Commit nesnesi ebeveynler, commit'i yapan, yazar, tarih ve kök ağaçtan oluşur; nesne içeriğinin SHA-1'iyle tanımlanır, değiştirilemez; nesne adı genellikle 40 onaltılık karakter | gitglossary 2.56.0: commit object, object, object name | Sözlük "such as" der; yazı "bu öğelerle" diye aktarır |
| Git veriyi anlık görüntü akışı olarak düşünür; neredeyse her işlem yereldir; dağıtık sistemde istemci bütün geçmişi aynalar; 2002 BitKeeper, 2005 ücretsiz kullanımın kalkması | Pro Git 1.1, 1.2, 1.3 | Tarih yalnızca "her klon tam geçmişi taşır" fikri için |
| Dal hafif, taşınabilir bir işaretçidir; `master` özel değildir; dal 40 karakter + satır sonu, 41 bayt | Pro Git 3.1 | Deneyde `wc -c` = 41 |
| Ref bir ada karşılık nesne adı ya da başka bir ref; HEAD bir symref; dalın ucu geliştirme yapıldıkça ilerler; etiketi commit komutu güncellemez | gitglossary: ref, HEAD, branch, tag | |
| `git switch`: çalışma ağacı ve index dala göre güncellenir; yeni commit'ler bu dalın ucuna eklenir | git-switch 2.55.0, Description | "Experimental" uyarısı artık yok |
| `init.defaultBranch` yoksa ilk dal "şu an `master`, Git 3.0'da `main`"; nesne biçimi varsayılanı `sha1`, `sha256` isteğe bağlı, birlikte çalışma yok; ref biçimi varsayılanı `files` (packed-refs ile), `reftable` seçenek | git-init 2.54.0 | Yerel ipucu metni de Git 3.0'ı anıyor (§17) |
| Git 3.0: yeni depolarda SHA-256, `reftable`, `main`; SHA-1'e pratik saldırılar ve "bilinen saldırılara karşı korumalar var"; planlanmış yayım tarihi yok | BreakingChanges 2.55.0, "Git 3.0" | |
| Çalışma ağacı = HEAD commit'inin ağacı + commit edilmemiş yerel değişiklikler (normalde); index çalışma ağacının saklanan bir sürümü | gitglossary: working tree, index | |
| Üç bölüm (çalışma ağacı, hazırlık alanı, Git dizini); "index" teknik ad | Pro Git 1.3 | |
| Kısa biçimde X index'in, Y çalışma ağacının durumu; `M ` index'te güncel, ` M` çalışma ağacı index'ten sonra değişti | git-status 2.53.0, Short Format | |
| `--staged`, `--cached`'ın eş anlamlısı | git-diff | Yazıda künyeye girmedi; sınır açıklaması git-status ile kuruldu |
| `--is-ancestor`: ata ise 0, değilse 1, hata 1 dışında sıfırdan farklı | git-merge-base 2.43.0 | Deneyde 128 |
| `--contains` | git-branch 2.56.0 | |
| Bir commit'in bütün ataları ondan ulaşılabilir | gitglossary: reachable | |
| Varsayılan dal: ziyaretçinin gördüğü, klonun ilk çıkardığı, aksi belirtilmedikçe yeni PR ve commit'lerin tabanı; GitHub yeni depoda `main` adını verir | GitHub Docs "Branches" (eski "About branches"; karar #32) | Yazıda "PR" kullanılmadı ("yeni değişikliklerin tabanı") |
| Organizasyon sahipleri yeni depoların varsayılan dal adını belirler (Repository → General → "Repository default branch"); kurumsal politika varsa organizasyon belirleyemez | GitHub Docs "Managing the default branch name for repositories in your organization" | Plan koşulu yazmıyor |
| Var olan depoda varsayılan dalı değiştirmek depo yöneticisi erişimi ister; organizasyon/kurumsal ruleset hedefliyorsa organizasyon yöneticisi | GitHub Docs "Changing the default branch" | |
| Yeniden adlandırma: dosya URL'leri yönlenir, ham dosya URL'leri ve eski adla `git pull` yönlenmez; koruma politikaları ve açık PR tabanları güncellenir; action'ı `@eski-ad` ile kullananlar kırılır | GitHub Docs "Renaming a branch" | |
| `gh repo list` `--json defaultBranchRef`; `--limit` varsayılanı 30 | GitHub CLI kılavuzu, gh_repo_list | Yerel gh 2.98.0; gerçek organizasyona karşı çalıştırılmadı |
| A03:2025: kod deposundaki değişikliklerin izlenmemesi risk; yapı çıktılarının bütünlüğü köken bilgisi, imza, zaman damgasıyla; ortam başına yeniden yapmak yerine terfi | A03:2025 Description, How to prevent | |
| PS.1.1 (kodun her biçimi en az yetkiyle; örnek 2: değişikliklerin bireysel hesaba hesap verebilir izlenmesi); PS.3.2 (her sürümün bütün bileşenleri için köken bilgisi) | NIST SP 800-218 v1.1 | |
| `org.opencontainers.image.revision`: paketlenen yazılımın kaynak denetimi revizyon tanımlayıcısı | OCI image-spec v1.1.1 (2025-03-03) `annotations.md` | github.com sayfası betiğe 429 verdi; etiketteki dosya raw.githubusercontent.com'dan okundu |
| actions/checkout varsayılan olarak yalnızca tetikleyen tek commit'i indirir; bütün geçmiş `fetch-depth: 0` | actions/checkout v7.0.1 (2026-07-20) README | |

## 16. Yazı 6 — kanıt (Uzak depoyla eşitlenmek)

| İddia | Kaynak ve bölüm | Not |
|---|---|---|
| Bare depo: dosyaların çıkarılmış kopyası olmayan, çoğunlukla `.git` uzantılı dizin | gitglossary: bare repository | |
| Uzak izleme dalları uzak dalların durumuna yerel referanslardır; kullanıcı taşıyamaz, Git ağ iletişiminde taşır | Pro Git 3.5 | |
| Uzak izleme dalı doğrudan değiştirilmemeli, üzerine yerel commit yapılmamalı | gitglossary: remote-tracking branch | |
| `branch -vv` önde/geride sayıları son getirmeden beri; sunuculara ulaşmaz, yerel önbellek | Pro Git 3.5 | |
| `ls-remote` uzak depodaki ref'leri ve commit kimliklerini listeler | git-ls-remote 2.48.0 | "Hiçbir şeyi değiştirmez" deneyle |
| Refspec fetch/push'ta uzak ref ile yerel ref eşlemesi; yukarı akış dalı `branch.<ad>.remote` ve `.merge` ile; `origin` klonlanan sunucuya verilen varsayılan ad | gitglossary: refspec, upstream branch; Pro Git 2.5 | |
| `fetch` ref'leri ve geçmişlerini tamamlayan nesneleri getirir, uzak izleme dallarını günceller; veriyi yalnızca indirir, işle birleştirmez | git-fetch 2.56.0; Pro Git 2.5 | |
| `--prune` getirmeden önce uzak depoda olmayan uzak izleme ref'lerini siler | git-fetch 2.56.0 | |
| `A...B` simetrik fark; `--left-right`, `--count` | gitrevisions 2.56.0; git-rev-list 2.56.0 | |
| Getirme ve gönderme protokolleri paylaşılmayan veriyi kötü niyetli karşı taraftan korumak için tasarlanmadı; korunacak veri ayrı depoda; ad alanları okuma erişimi denetimi için etkili değil | git-push 2.55.0, Security | Yazıda "dal bir erişim sınırı değildir" çıkarımı olarak |
| `pull`: önce aynı argümanlarla `fetch`, sonra argümansızsa geçerli dalın yukarı akışını bütünleştirir; dört yol; `--ff-only` varsayılan; `pull.rebase`, `pull.squash`, `pull.ff` | git-pull 2.55.0, Description | Kaynak içi fark §11 |
| İleri sarma: bütünleştirilen dal torun ise birleştirme commit'i yapılmaz, dal aynı commit'e güncellenir | gitglossary: fast-forward | |
| `origin/HEAD` (refs/remotes/<ad>/HEAD) uzak deponun varsayılan dalı | git-remote 2.53.0, set-head | |
| `push` uzak ref'leri günceller, eksik nesneleri gönderir; `push.default=simple`; `--set-upstream` | git-push 2.55.0, Description, Options | |
| Push kuralları: koruma olarak yalnız belirli güncellemeler; dala yalnızca ileri sarma (hedef kaynak commit'in atası); ileri sarma olmayan güncelleme geçmiş kaybettirir; `--force` geçmiş kaybetmeyi bilerek istenen durumlar için | git-push 2.55.0, Push Rules, Note about Fast-Forwards | "Safety feature" yazıda "koruma" |

## 17. Run 3 deneyleri (yazarın çalıştırması; kendi deneyimiz)

Ortam: Git **2.53.0.windows.2**, Git Bash; global ve sistem ayarı devre dışı (`GIT_CONFIG_GLOBAL` boş
dosya, `GIT_CONFIG_NOSYSTEM=1`). Betikler ve çıktılar `artifacts/guvenlik-run3/` altında (gitignore;
yalnızca bu makinede). WSL ve Docker bu makinede yok; başka bir platformda yeniden üretim yapılmadı,
kimliklerin taşınabilirliği içerik adreslemenin tanımına dayanır (aynı baytlar → aynı kimlik).

| Deney | Sonuç | Dosya |
|---|---|---|
| Yazı 5 kurulumu iki kez, ayrı klasörlerde | Aynı beş kimlik: `825fed9`, `8a819d8`, `31ad836`, `f8db4cb`, `85fdda1` | `deney5-kur.sh`, `deney5-cikti.txt` |
| `cat-file commit HEAD \| hash-object -t commit --stdin` | `rev-parse HEAD` ile aynı; yazar adı değişince `741e27d…` | `deney5-okur-cikti.txt` |
| `--is-ancestor` | dal: 1, `main`: 0, aday `31ad836`: 1, kendisi: 0, yazım hatalı kısa kimlik: "Not a valid object name" + 128, var olmayan tam kimlik: "Not a valid commit name" + 128 | aynı |
| Sığ klon (`file://`, `--depth 1`) | `--is-shallow-repository` true; eksik ata 128; ata sonradan `fetch --depth 1` ile gelince yol kesik, yanlış 1; tam klonda 0 | aynı |
| Yerel yolla `--depth` | "warning: --depth is ignored in local clones; use file:// instead." | `deney5-teshis2.txt` |
| 5'in ikinci Teşhis'i (`! --is-ancestor 8a819d8 $REVISION`) | Sığ klonda iki yapı için de "temiz" (128 yutuldu); tam klonda iki yapı için de "kırılgan" | `deney5-teshis2.txt` |
| Yazı 6 kurulumu (bare `origin.git`, `b` ve `a`) | Aynı beş kimlik; ıraksamada `eacea0f` (yerel), `120d7b5` (uzak) | `deney6-okur.sh`, `deney6-okur-cikti.txt` |
| `fetch`, `pull`, `push`, ıraksama | `31ad836..85fdda1 main -> origin/main`; ileri sarma; feature'da "Already up to date" ve 1; `push` "fetch first" (1); `pull` "Need to specify how to reconcile divergent branches." (128) | aynı |
| 6'nın ikinci Teşhis'i (`git fetch \|\| true`) | Erişilemeyen uzak depoda bayat `origin/main` ile "aday yapılıyor"; gönderilmemiş yerel commit varken de | `deney6-teshis2.sh`, `deney6-teshis2.txt` |
| Yazılardaki her bash bloğu temiz klasörde sırayla | 5: 11/11, 6: 10/10 blok çıktısı metindekiyle aynı | `blok-dogrula.mjs`, `blok-dogrula-5.txt`, `blok-dogrula-6.txt` |

## 18. Yazı 7 — kanıt (Ayrışan geçmişi birleştirmek)

Erişim tarihlerinin hepsi 2026-10-21; metinler `artifacts/guvenlik-run4/src/` altında (gitignore; yalnızca bu
makinede). GitHub Docs adresleri bölüm dizinlerinden kopyalandı (`src-idx/`): "Pull request merges" artık
`/en/pull-requests/reference/pull-request-merges`, "Keeping your pull request in sync" `/how-tos/create-pull-requests/`
altında, "About pull requests" `/get-started/` altında. git-scm.com ana sayfası güncel kaynak sürümünü 2.56.0 gösteriyor.

| İddia | Kaynak ve bölüm | Not |
|---|---|---|
| `merge-base`: üç yollu birleştirmede kullanılacak en iyi ortak ata; birden çok olabilir | git-merge-base 2.43.0, Description | |
| Üç yollu birleştirme iki ucun anlık görüntüsü ve ortak atayla; birleştirme commit'i birden çok ebeveynli | Pro Git 3.2 Basic Merging | Pro Git örnek çıktısı "recursive" stratejisini gösterir; güncel kılavuzda tek uç için varsayılan `ort` (git-merge 2.54.0). Yazı yalnızca deneyin `ort` çıktısını gösterdi |
| Bir tarafın değiştirdiği alan sonuca girer; iki taraf aynı alanı değiştirdiyse Git seçmez | git-merge 2.54.0, How Conflicts Are Presented | |
| Birleştirme commit'i: ileri sarma değilse ebeveynleri birleştirilen dalların uçları | gitglossary 2.56.0, merge | |
| Rebase: commit'leri başka bir başlangıç noktasına taşır; dalda olup hedefte olmayanları listeler, yeniden uygular, dalı son commit'e taşır | git-rebase 2.54.0, Description | |
| Başkalarının üzerine iş kurduğu dalı yeniden yazmak kötü fikir; aşağıdaki herkes geçmişini elle düzeltir | git-rebase 2.54.0, Recovering from Upstream Rebase | |
| "Deponun dışında var olan ve başkalarının üzerine iş kurmuş olabileceği commit'leri rebase etme"; rebase var olanları bırakıp benzer ama farklı yenilerini yaratır; aynı yazar, tarih ve mesajlı iki commit | Pro Git 3.6 The Perils of Rebasing | |
| `--onto <newbase>` | git-rebase 2.54.0, Options | |
| `--rebase` getirmeden sonra geçerli dalı yukarı akışın üstüne rebase eder; `pull.rebase` | git-pull 2.55.0, Options | "This is the default" `true` değerinin varsayılan oluşudur, `pull`'un varsayılanı değil |
| `patch-id`: dosya farklarının, satır numaraları dışarıda, özetlerinin toplamı; olası kopya commit'leri bulmak için | git-patch-id 2.54.0, Description | Varsayılan `--unstable` |
| `--squash`: birleştirme olmuş gibi ağacı ve hazırlığı hazırlar; commit yapmaz, HEAD'i taşımaz, MERGE_HEAD kaydetmez | git-merge 2.54.0, Options | |
| `merge.conflictStyle`: `merge` (varsayılan), `diff3`, `zdiff3` | git-config 2.56.0; git-merge 2.54.0 | |
| `merge-tree --write-tree`: çalışma ağacına ve index'e dokunmadan birleştirme, commit yok, yeni bir ağaç nesnesi yazar; çıkış 0 temiz, 1 çatışma, diğer: yapılamadı; `--name-only` | git-merge-tree 2.52.0 | Yazı "nesne veritabanına bir ağaç yazar" diye aktardı |
| PR bir daldaki değişikliklerin başka dala birleştirilmesini önerir; inceleme ve kontroller üzerinde yürür | GitHub Docs "About pull requests" | 7'de geçerken gloss; tanım 9 |
| Üç yöntem: "Merge pull request" `--no-ff`; squash tek commit; "Rebase and merge" her zaman committer'ı günceller ve yeni SHA üretir, baştan boş commit'leri atar | GitHub Docs "Pull request merges"; "About merge methods on GitHub" | |
| Squash kısa ömürlü dalda iyi; aynı dalda devam edilirse squash edilenler yeni PR'da yeniden listelenir, aynı çatışmalar tekrar çözülebilir; uzun yaşayan dalda birleştirme commit'i ya da sonraki PR'dan önce rebase | Aynı iki sayfa | |
| Squash'ın bedeli: değişikliklerin ne zaman ve kimce yazıldığı bilgisi kaybolur; "Rebase and merge" commit'leri imza doğrulaması olmadan ekler | "About merge methods on GitHub" | |
| "Update branch" birleştirir, "Update with rebase" rebase eder; PR dalının deposunda yazma yetkisi; HEAD dalı korumalıysa düğme kullanılamayabilir | GitHub Docs "Keeping your pull request in sync with the base branch" | |
| `gh pr update-branch`: varsayılan birleştirme commit'i, `--rebase` | GitHub CLI kılavuzu | gh 2.98.0 |
| Yöntem ayarları depo ayarlarında "General" → "Pull Requests"; "Configure pull request merges" Maintain ve Admin; otomatik dal silme Admin | GitHub Docs "Configuring commit squashing/merging/rebasing", "Repository roles for an organization", "Managing the automatic deletion of branches" | Plan koşulu yazmıyor (Ekim 2026) |
| `gh repo list/view --json` alanları: `mergeCommitAllowed`, `squashMergeAllowed`, `rebaseMergeAllowed`, `deleteBranchOnMerge` | GitHub CLI kılavuzu (gh_repo_view, gh_repo_list); yerel `gh repo list --json` alan listesi | Gerçek organizasyona karşı çalıştırılmadı |
| Depo ayarıyla çelişen bir ruleset kuralı birleştirmeyi engeller | "About merge methods on GitHub" | 7'de "ruleset" adı geçmedi; 12'ye işaret |

## 19. Yazı 8 — kanıt (Kod kaybetmeden geri almak)

| İddia | Kaynak ve bölüm | Not |
|---|---|---|
| Reset, restore, revert ayrımı (revert yeni commit; restore dalı güncellemez; reset dal ucunu taşır, geçmişi değiştirir) | git 2.56.0, "Reset, restore and revert" | |
| `--soft`, `--mixed` (varsayılan), `--hard`, `--keep` | git-reset 2.54.0 | `--keep` deneyde çıkış 128 ile durdu |
| `--hard` reset'in tek tehlikeli biçimi; Git'in veri yok ettiği az durumdan biri | Pro Git 7.7 | |
| `restore`: varsayılan kaynak index, `--staged` ile HEAD | git-restore 2.55.0 | |
| `revert` yeni commit'ler yazar; reset ve restore alternatifleri commit edilmemiş değişikliği atar | git-revert 2.54.0, Description | |
| `-m`: birleştirmeyi geri döndürmek ağaç değişikliklerini bir daha istememeyi beyan eder; sonraki birleştirmeler yalnızca ata olmayan commit'leri getirir | git-revert 2.54.0, Options | |
| Revert'ün revert'ü; dal yeni commit'lerle yeniden yapıldıysa gerekmez | "How to revert a faulty merge" (Linus Torvalds, Junio C Hamano, 2008), v2.56.0 etiketindeki `Documentation/howto/revert-a-faulty-merge.adoc` | git-scm.com/docs/howto sayfası GitHub'daki HEAD'e yönleniyor; künye sabit etiketle verildi |
| Reflog: dal ve ref uçlarının yerel depoda ne zaman güncellendiği; HEAD günlüğü dal değişimini de tutar; `HEAD@{n}` | git-reflog 2.51.1, Description | |
| `gc.reflogExpire` 90 gün, `gc.reflogExpireUnreachable` 30 gün, `gc.pruneExpire` iki hafta; nesne yaratan komutlar gc'yi kendiliğinden başlatır | git-gc 2.52.0; git-reflog 2.51.1 `--expire` | |
| Ayrık HEAD: HEAD doğrudan commit'i gösterir; ref oluşturulmazsa commit rutin çöp toplamayla silinir | git-checkout 2.55.0, Detached HEAD | |
| `switch --detach`: inceleme ve atılabilir denemeler için | git-switch 2.55.0 | |
| `branch -d` yalnızca yukarı akışa ya da HEAD'e tamamen birleşmiş dalı siler | git-branch 2.56.0 | Squash'tan sonra deneyde reddetti |
| `--lost-found`: sahipsiz nesneleri yazar, blob'un içeriğini dosyaya | git-fsck 2.53.0 | Teşhis deneyinde hazırlıktaki satır bulundu, yalnız çalışma ağacındaki yok |
| `--force`: bütün denetimleri kapatır, uzak depoya commit kaybettirebilir | git-push 2.55.0 | |
| `--force-with-lease` (beklenen değer verilmezse uzak izleme dalı); arka planda `fetch` çalıştıran her şeyle "çok kötü etkileşir" | git-push 2.55.0 | Deney: stale info → fetch → kabul, test commit'i düştü |
| `--force-if-includes`: uzak izleme ucunun yerel dalın reflog girdilerinden ulaşılabilirliği; `push.useForceIfIncludes` | git-push 2.55.0; git-config 2.56.0 | Deney: "remote ref updated since checkout" |
| `cherry-pick`: var olan commit'in değişikliğini yeni commit olarak uygular; `--abort` | git-cherry-pick 2.56.0 | |
| `merge --abort` commit edilmemiş değişiklik varken eski durumu her zaman kuramaz | git-merge 2.54.0, Description | 2'nin kısmi başarısızlık ilkesinin geri çağrısı |
| Kapanmış PR'ın dalı "Restore branch"; birleşmiş ya da kapanmış PR dalını silmek yazma yetkisi; açık PR'a bağlı dal silinemez | GitHub Docs "Deleting and restoring branches in a pull request" | Geri yüklemenin rolü belgede yazmıyor; yazı rol iddia etmedi |
| "Revert" düğmesi birleştirme commit'ini geri döndüren yeni PR; yazma yetkisi; GitHub'da birleştirilmemişse tek tek commit | GitHub Docs "Reverting a pull request" | |
| Dolaylı birleştirme: head commit'leri tabandan ulaşılabilir olunca PR birleşmiş işaretlenir, koruma sağlanmasa bile | GitHub Docs "Pull request merges", Indirect merges | 8'de tanımlandı; 9 kalan riskte geri çağırır |
| Korumalı dalda zorla push ve silme varsayılan engelli; zorla push dal silebilir ya da PR'da onaylanmamış commit'leri gösterebilir; plan: herkese açık depoda Free, özelde Pro, Team, Enterprise | GitHub Docs "About protected branches" | 12'ye işaret |
| Sızan sır: önce iptal ya da rotasyon; yeniden yazmanın yan etkileri; klon, çatal, önbellek görünümü ve PR'da kalabilir | GitHub Docs "Removing sensitive data from a repository" | 13'e işaret (Teşhis) |

## 20. Run 4 deneyleri (yazarın çalıştırması; kendi deneyimiz)

Ortam: Git **2.53.0.windows.2**, Git Bash; global ve sistem ayarı devre dışı. Betikler ve çıktılar
`artifacts/guvenlik-run4/` altında (gitignore; yalnızca bu makinede). Kimlikler 5–6'nın beş commit'iyle ve
6'nın `eacea0f`/`120d7b5` sonuyla aynı çıktı (karar #28 sürdü).

| Deney | Sonuç | Dosya |
|---|---|---|
| Rebase ve ortam değişkenleri | `GIT_AUTHOR_*` verilse de rebase özgün yazarı korur, commit'i yapanı ortamdan alır; kimlik verilmezse makineye özgü kimlik yazar | oturum içi deneme |
| 7: rebase | `eacea0f` → `66098e2` (tree, parent, committer değişti; patch-id `3ad660d…` aynı); eski commit'i içeren dal 0 | `deney7-kur.sh`, `deney7-kur-cikti.txt` |
| 7: üç son | `08bfade` (birleştirme), `4f3df21` (squash), `9f65d7a` + `b1ba17d` (rebase); üç ağaç `90c95de`; ata 0/1/1 | aynı |
| 7: paylaşılmış dalı güncellemek | Rebase'li gönderim "non-fast-forward" (1); birleştirme `3bfd1a1` (ebeveynler `ad2634c`, `66098e2`); `--is-ancestor 85fdda1` 0 | aynı |
| 7: squash ve devam | squash `ac8d84d`, devam `ec788df`; `merge-tree` 1, `add/add`; `rebase --onto` → `b2dff87` | aynı |
| 7: Teşhis (kendi tarafı) | Çatışma bölümü; `ebbce4d` (ebeveynler `b472cb6`, `ac8d84d`) için `--is-ancestor 85fdda1` 0, `git grep` yalnız `noent` satırı; `zdiff3` tabanı `31ad836` | `deney7-kur.sh` TESHIS bölümü; `deney7-teshis.sh`, `deney7-teshis.txt` |
| 7: otomatik silme sonrası | Uzak dal başka klondan silinince yerel dal ve `origin/<dal>` `fetch --prune`'a kadar kalır; aynı adla push dalı yeniden yaratır | oturum içi deneme |
| 8: reset biçimleri | ` M` → `MM` → ` M` → temiz; `8820cfa` günlükte, taslak satır hiçbir yerde | `deney8-kur.sh`, `deney8-kur-cikti.txt` |
| 8: ayrık HEAD | `0594ea1` uyarıyla; `HEAD@{1}` ile `kanarya-testi`; `eacea0f main@{4}` | aynı |
| 8: silinen dal | `-d` "not fully merged"; `-D` "(was ec788df)"; dalın günlüğü silindi, HEAD günlüğünde `ec788df` | aynı |
| 8: zorla push | fetch first (1), stale info (1), fetch, remote ref updated since checkout (1), forced update `a578de5...8023fd7` (0); kurtarma `49e55e1` (yazar `gelistirici-b`) | aynı |
| 8: yanlış birleştirme | `4021fbd` (ebeveynler `ac8d84d`, `49e55e1`); `revert -m 1` → `a87a8cd`; yeniden birleştirme "Already up to date" ve ata 0; "Reapply" `b921466` | aynı |
| 8: Teşhis (reset --hard tarifi) | `--keep` 128 ile durdu; gönderilmemiş commit günlükte; hazırlıktaki satır `fsck --lost-found` ile sahipsiz blob olarak bulundu, yalnız çalışma ağacındaki satır yok | `deney8-teshis.sh`, `deney8-teshis.txt` |
| Yazılardaki her bash bloğu temiz klasörde sırayla | 7: 9/9, 8: 11/11 blok çıktısı metindekiyle aynı | `blok-dogrula.mjs`, `blok-dogrula-7.txt`, `blok-dogrula-8.txt` |

## 21. Run 5 kaynak kanalları ve tuzaklar (2026-10-26)

Bütün erişimler 2026-10-26. Ham metinler `artifacts/guvenlik-run5/src/<grup>/` altında (gitignore; yalnızca bu makinede,
kalıcı değil); gruplar: `pr-events`, `reviews-codeowners`, `merge-queue`, `releases-deploy`, `git-tags`, `standards`, `plans`,
`oci`. Kaynak doğrulaması yedi paralel okuyucuyla yapıldı; yazılara giren her iddia ana oturumda kaydedilen metinde grep'le
yeniden eşleştirildi (rapor üzerinden kabul yok).

- **Kanal:** GitHub Docs sayfalarının Markdown gövdesi `https://docs.github.com/api/article/body?pathname=/en/<yol>` ile
  alındı; yollar `https://docs.github.com/api/pagelist/en/free-pro-team@latest` listesinden kopyalandı (3.198 yol). "Who can
  use this feature?" kutusu gövde, `meta` ve `article` API'lerinde yok; yalnızca işlenmiş HTML'deki `__NEXT_DATA__`'da
  (`*.availability.txt`). Bu makinede `curl` Windows schannel iptal denetiminde düştü (`CRYPT_E_REVOCATION_OFFLINE`);
  `--ssl-no-revoke` ile çalışıldı (sertifika doğrulaması açık, yalnızca iptal sorgusu kapalı).
- **Sayfa taşınmaları (Ekim 2026):** "About pull requests"ın eski adresi `/en/pull-requests/reference/pull-requests`'e
  yönleniyor; yeni "About pull requests" `/get-started/` altında. "About comparing branches in pull requests" →
  `/reference/branches`; "About status checks" → `/reference/status-checks`; "About pull request reviews" → kısa
  `/reference/pull-request-reviews`; "Approving a pull request with required reviews" `/how-tos/review-pull-requests/`
  altında; "Managing environments for deployment" `/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments`;
  değişmez sürüm sayfaları `/code-security/concepts/…` ve `/how-tos/…` altında. OWASP CI/CD Top 10 proje sayfası
  `owasp.org/projects/top-10-cicd-security-risks`'e, CICD-SEC sayfaları `owasp.github.io/www-project-top-10-ci-cd-security-risks/…`'a
  308 ile yönleniyor.
- **Sürümler:** git-scm.com güncel kaynak sürümü 2.56.0 (2026-09-28). Kılavuz sayfalarının "last updated in" değerleri:
  `git-tag` 2.55.0, `git-fetch` 2.56.0, `git-push` 2.55.0, `git-describe` 2.55.0, `git-cherry` 2.0.5 (metin o günden beri
  aynı), `git-cherry-pick` 2.56.0, `git-show-ref` 2.46.0, `gitrevisions` 2.56.0, `gitglossary` 2.56.0, `git-config` 2.56.0,
  `git-request-pull` 2.56.0 (yalnızca biçim değişikliği), `git-merge-tree` 2.52.0. GitHub CLI indirmeleri v2.103.2; yerelde
  gh 2.103.0. Node.js belgeleri: latest v26.12.1, latest-v24 v24.22.1, latest-v22 v22.23.4. GHES belgelerinin son sürümü 3.22.
- **Action sabitleri (yazı 9'un iş akışı):** `actions/checkout` v7.0.1 = `3d3c42e5aac5ba805825da76410c181273ba90b1`
  (yayım 2026-07-20), `actions/setup-node` v7.1.0 = `949feb2413d6458794dcd2491c4babbbce0c15c1` (yayım 2026-10-08); GitHub
  API'sinin herkese açık `releases/latest` ve `git/ref/tags/<etiket>` uçlarından (ikisi de doğrudan commit'i gösteren
  etiket). `setup-node`'un `node-version` girdisi ve `checkout`'un `fetch-depth: 1` varsayılanı o kimliklerdeki
  `action.yml`'den okundu; API yanıtları `src/actions/` altında (`kanit.txt`). GitHub Docs örnekleri Ekim 2026'da hâlâ
  `actions/checkout@v6` gösteriyor; belge örneği sürüm kaynağı sayılmadı. Node.js TypeScript belgesi: tip ayıklama v22.18.0 ve v23.6.0'dan beri varsayılan açık, v24.3.0 ve
  v22.18.0'dan beri deneysel uyarı yok; `.ts` uzantısı içe aktarmada zorunlu; `node --test`'in varsayılan örüntülerine `.ts`
  de girer. Yazı 9'un önkoşulu bu yüzden "Node.js 22.18+ ya da 24.3+".

### Kaynak içi tutarsızlıklar (GitHub Docs, Ekim 2026)

- **Sıkı gerekli kontrol "varsayılan" mı?** "About protected branches" tablosu sıkı biçimi "the default behavior for
  required status checks" diye anar; "Managing a branch protection rule" aynı ayarı isteğe bağlı bir onay kutusu olarak
  sunar. Yazı 9 "varsayılan" demedi; iki biçimi ve gevşek biçimin uyarısını aktardı.
- **`pull_request_target`'ın ref'i:** Olaylar sayfası ve "Securely using pull_request_target" varsayılan dal der (2025-12-08
  değişikliği); Değişkenler başvurusu hâlâ "base branch" der. Yazı 9 bu tetikleyiciyi işlemedi (13'ün konusu).
- **Kontrolü kim oluşturabilir?** "Status checks" sayfası yazma yetkisi olanların API ile kontrol ve commit durumu
  oluşturabileceğini, REST "check runs" sayfası check run oluşturmanın yalnızca GitHub App'lere açık olduğunu yazar. Yazı 9
  "durumunu ayarlayabilir" ifadesini "About protected branches"ın cümlesinden aldı (status ayarı).
- **Birleştirme kuyruğu:** geçici dal öneki `gh-readonly-queue/{base_branch}`; sayfanın örnekleri `main/pr-1` der, önekten
  sonrası belgelenmemiş. Yapı eşzamanlılığı yönetim sayfasında 1–100, ruleset sayfasında ve REST şemasında 0'a izin
  veriliyor. **Testi geçen grup commit'inin hedef dala aynı kimlikle ileri sarıldığı hiçbir sayfada yazmıyor**; belge
  yalnızca geçici dalın hedef dala "birleştirileceğini" söyler. Yazı 9 bu yüzden kuyruk grubunu ayrı kimlikle canlandırdı
  ve "test edilen commit `main`'e giren commit'tir" iddiasını kurmadı. Free-pro-team "Available rules for rulesets"
  sayfasında "Require merge queue" bölümü yok, GHEC sürümünde var (yalnızca depo düzeyi).
- **Organizasyon düzeyi ruleset ve push ruleset planı:** §10'daki tutarsızlık sürüyor (Team+Enterprise / yalnızca
  Enterprise; push ruleset fpt'de Team, GHEC/GHES'te Enterprise Cloud). 9 ve 10 bu koşulu kullanmadı; 12'de yeniden.
- **Değişmez sürüm:** belgeler etiketin "Release var oldukça" silinemeyeceğini yazar; `gh release create` kılavuzu
  koşulsuz "değiştirilemez ya da silinemez" der. Dosya ekleme yasağı bir sayfada yazılı, kavram sayfasında yalnızca
  "değiştirme ya da silme" var. Plan/görünürlük koşulu hiçbir sayfada yok. Değişmezliği kapatmanın önceki sürümlere
  etkisi yalnızca changelog'da; yazı 10 bunu ürün davranışı olarak aktarmadı.
- **CODEOWNERS örneği:** belgenin kendi örnek dosyasındaki yorumlar "onay gerektirir" der; bu yalnızca "Require review
  from Code Owners" açıkken doğru (sayfanın 9–11. satırları).

## 22. Yazı 9 — kanıt (GitHub'da ekip akışı)

| İddia | Kaynak ve bölüm | Not |
|---|---|---|
| GitHub 10 Nisan 2008'de "officially live" | GitHub Blog, "We Launched" (Chris Wanstrath) | JSON-LD zamanı UTC'de 11 Nisan 01.13; sayfa 10 Nisan gösterir |
| `git request-pull` üst projeye çekme isteği metni üretir, standart çıktıya yazar | git-request-pull 2.56.0 | "hiçbir yere göndermez" çıkarım (stdout) |
| PR bir daldan başka dala birleştirmeyi önerir; base/head/compare | GitHub Docs "About pull requests", "GitHub glossary" | |
| PR farkı üç noktalı (birleştirme tabanı) | "Branches" (reference) | |
| `pull_request`: `GITHUB_REF` `refs/pull/N/merge`, `GITHUB_SHA` son birleştirme commit'i; açık ve birleştirilebilir PR'da testler birleşmiş sonuca karşı; çatışmada iş akışı çalışmaz | "Events that trigger workflows" | |
| Varsayılan etkinlik türleri opened/synchronize/reopened; synchronize = head güncellendi | aynı sayfa; "Webhook events and payloads" | "base ilerleyince yeniden koşmaz" bizim çıkarımımız, yazıda öyle işaretlendi |
| En son commit'te geçmeli; deneme birleştirmesinin durumu varsa o geçmeli | "Troubleshooting required status checks" | |
| Sıkı/gevşek gerekli kontrol; gevşekte "Status checks may fail after you merge your branch if there are incompatible changes" | "About protected branches" | |
| Yazma yetkisi olan herkes durum ayarlayabilir; beklenen kaynak (GitHub App) seçilirse başkasının ayarladığı durum birleştirmeye izin vermez | aynı sayfa | |
| Koşulla atlanan iş "Success", gerekli kontrol olsa da engellemez; yol/dal filtresiyle atlanan iş akışı "Pending" kalır ve engeller | "Status checks"; "Troubleshooting required status checks" tablosu | |
| Kuyruk güvencesi, `gh-readonly-queue/<base>` öneki, başarısızlıkta çıkarma ve yeniden kurma, `merge_group` şartı ("The merge will fail as the required status check will not be reported"), "Only merge non-failing pull requests", joker karakter yasağı, yönetici yapılandırır, yazma yetkisi ekler | "Managing a merge queue", "Merging a pull request with a merge queue", Olaylar sayfası | Plan: kuruluşa ait herkese açık depo + GHEC özel depo; GHES'te kuruluşa ait her depo (yalnızca GHES 3.22 sayfası) |
| Onay ayarları: yazar kendini onaylayamaz; yalnızca yazma yetkisi olanların onayı sayılır; eski onayları düşürme (birleştirme tabanı yeni değişiklik getirince de); son push'u başkası onaylar; "hijacking" kaygısında düşürmek daha güvenli | "About protected branches", "Approving a pull request with required reviews" | |
| CODEOWNERS: konum sırası, base dalındaki sürüm, yazma yetkisi ve görünür takım, var olmayan sahip sessizce atanmaz, geçersiz satır atlanır, 3 MB, son eşleşen örüntü, otomatik istek (taslakta yok), onay zorunluluğu ayarla, sahiplerden birinin onayı yeter, dosyanın kendisine sahip | "About code owners" | Plan: dal korumasıyla aynı |
| İş akışı sürümü olayın commit'inden; `pull_request` birleştirme commit'inden | "Workflows" (concepts); "Securely using pull_request_target" | |
| Ortam koruma kuralları: en çok 6 incelemeci, biri yeter, kendini onaylamayı engelleme, bekleme süresi, dal/etiket kısıtı; iş çalıştırıcıya gitmeden geçilmeli; yöneticiler varsayılan olarak atlar | "Deployments and environments" (reference) | Plan: Free/Pro/Team'de incelemeci ve bekleme süresi yalnızca herkese açık depoda; özel/iç depoda Enterprise |
| Dal korumasını ve ruleset'i Admin yönetir | "Repository roles for an organization" (tablo) | Özel rol (edit repository rules) yalnızca GHEC |
| `codeowners/errors` (Contents okuma; varsayılan dalın dosyası, `ref` ile başka), `rules/branches/{dal}` (Metadata okuma; etkin ruleset kuralları; klasik korumayı içerip içermediği yazmıyor), `branches/{dal}` (`protected`, `protection.required_status_checks`), `branches/{dal}/protection` (Administration okuma) | REST başvurusu | Gerçek bir organizasyona karşı çalıştırılmadı |
| A03:2025: "No single person should be able to write code and promote it all the way to production without oversight from another human being"; kod deposu (dal koruması), CI/CD (görev ayrılığı) | Top 10:2025 A03 | |
| CICD-SEC-1 tanımı ve dal koruması önerisi; lab projesi, v1.0 (Eylül/Ekim 2022) | OWASP Top 10 CI/CD Security Risks | CODEOWNERS'ı CICD-SEC-1'e atfetmedik (sayfada yok) |
| SSDF v1.1 PS.1.1 ve Örnek 4 (kod sahibinin başkalarının değişikliklerini incelemesi) | NIST SP 800-218 v1.1, s. 18–19 | |
| DORA: günde en az bir birleştirme, ≤3 etkin dal, dal birkaç saat, kod dondurma yok; 2016–2017 verisi | DORA "Trunk-based development" | Sayfada tarih yok; görüş/araştırma özeti diye anıldı |
| GitHub flow'un altı adımı | "GitHub flow" | |
| Driessen 2020 notu: dogma; sürekli teslimde GitHub flow gibi basit akış; açıkça sürümlenen ya da sahada çok sürümlü yazılımda git-flow hâlâ uygun olabilir | nvie.com | |

## 23. Yazı 10 — kanıt (Sürüm ve dağıtım)

| İddia | Kaynak ve bölüm | Not |
|---|---|---|
| Açıklamalı etiket nesnesi (tarih, etiketleyen, mesaj, isteğe bağlı imza); hafif etiket bir ad; açıklamalı sürüm için, hafif özel/geçici; `git describe` hafifi varsayılan olarak görmez | git-tag 2.55.0; git-describe 2.55.0 | İmza arka ucu `gpg.format` (OpenPGP varsayılan) |
| `^{}` özyinelemeli soyma | gitrevisions 2.56.0; git-show-ref | |
| `git push` etiketleri varsayılan olarak göndermez; `--follow-tags` ulaşılabilir ve uzakta olmayan açıklamalı etiketler | Pro Git 2.6; git-push 2.55.0 | "varsayılan olarak göndermez" açıkça yalnızca Pro Git'te; kılavuz refspec kurallarıyla ima eder |
| Push: `refs/tags/*` güncellemeleri reddedilir, `--force`/`+` aşar; silme ve oluşturma güncelleme sayılmaz | git-push PUSH RULES | |
| Fetch: Git 2.20'den beri var olan etiket `+`/`--force` olmadan güncellenmez; "tags are supposed to be unmoving anchoring points" | git-fetch 2.56.0; Git 2.20.0 sürüm notu (`RelNotes/2.20.0.adoc`) | "would clobber existing tag" ve "already exists" iletileri kılavuzda değil, kaynak kodunda (`builtin/fetch.c`, `transport.c`); yerel çıktıyla doğrulandı |
| Varsayılan getirme getirilen geçmişe işaret eden etiketleri de alır | git-fetch, TAGS | Yerelde aynı adlı etiketi sessizce güncellememesi deneyle görüldü, yazıda öyle işaretlendi |
| "On Re-tagging": Git etiketleri kullanıcının arkasından değiştirmez; akıllıca olan "X.1"; akılsızca olan `tag -f`; güvenlik meselesi; alıcı `git tag -d X` + `git fetch origin tag X` | git-tag 2.55.0 | |
| `versionsort.suffix`: aynı tabanlı farklı sonekler sözlük sırasıyla, ön sürüm ana sürümden sonra ("1.0-rc1" after "1.0") | git-config 2.56.0 | Teşhis yerelde `teshis10.sh` ile doğrulandı |
| `cherry-pick -x` satırı yalnızca çatışmasız alımlarda; özel daldan almada kullanma | git-cherry-pick 2.56.0 | |
| `git cherry`: `-` eşdeğeri üst dalda var, `+` yok; eşdeğerlik boşluk ve satır numarası atılmış farkla | git-cherry 2.0.5; git-patch-id 2.54.0 | |
| Release etikete dayanır, notlar ve ikili dosyalar; görmek okuma, yönetmek yazma | "About releases", "Managing releases in a repository" | |
| `gh release create`: etiket yoksa varsayılan dalın son hâlinden oluşturur; `--verify-tag` uzakta yoksa durdurur | GitHub CLI kılavuzu | |
| Değişmez sürüm: etiket kilitli, Release var oldukça taşınamaz/silinemez; dosya eklenemez/değiştirilemez/silinemez; silinse de ad yeniden kullanılamaz (depo yeniden açılsa bile); başlık/notlar/işaretler düzenlenebilir; tasdik (etiket, commit, dosyalar); yalnızca sonraki sürümler; taslak değişebilir, önce taslak önerisi | "Immutable releases", "Preventing changes to your releases", `gh release create` | Plan koşulu yok; GA 28 Ekim 2025 (changelog, yalnızca tarih); GHES 3.20+ tasdiksiz |
| `gh release verify` / `verify-asset`; kaynak arşivleri indirme anında üretildiği için denetlenemez | "Verifying the integrity of a release"; gh kılavuzu | "Etiketi taşımak değişmez olmayan Release'in kaynak arşivini de değiştirir" bizim çıkarımımız, yazıda öyle işaretlendi |
| Actions'ta taşınan ana sürüm etiketleri için Release oluşturmama önerisi | "Using immutable releases and tags to manage your action's releases" | |
| Depo ayarı uç noktası yönetici okuma; organizasyon politikası `admin:org` | REST repos / orgs | Gerçek bir organizasyona karşı çalıştırılmadı |
| SemVer 2.0.0 madde 1, 3, 6–8, 9, 11; SSS: "v1.2.3" anlamsal sürüm değil, etiket adı; CC BY 3.0 | semver.org | `rc.2 < rc.10` belirtimin 11.4.1 kuralından türetildi (örnek değil) |
| SSDF v1.1 PS.2.1, PS.3, PS.3.1 metni | NIST SP 800-218 v1.1, s. 18–19 | Tasdiki PS.2.1'in GitHub'daki bir biçimi saymak bizim eşlememiz |
| OCI: `digest` içerik tanımlayıcısıdır, içerikten hesaplanır | OCI image-spec v1.1.1 `descriptor.md` | |
| Driessen 2010: hotfix ilgili etiketten açılır, hem ana dala hem develop'a birleştirilir | nvie.com | |

## 24. Run 5 deneyleri (yazarın çalıştırması; kendi deneyimiz)

Ortam: Git **2.55.0.windows.5** (run 4'te 2.53), Git Bash (bash 5.3.15), Node.js **24.22.1**; global ve sistem Git ayarı devre
dışı. Betikler ve çıktılar `artifacts/guvenlik-run5/` altında (gitignore; yalnızca bu makinede).

| Deney | Sonuç | Dosya |
|---|---|---|
| Yayımlanmış 5–8'in bütün bash blokları Git 2.55 ile | 11/11, 10/10, 9/9, 11/11 çıktı metinle aynı (bakım kanıtı; kimlikler ve iletiler değişmedi) | `blok-dogrula.mjs`, `blok-cikti/` |
| 9: kısa taban | Tek commit `5313039`, ağacı `f59542e` = 8'in sonundaki `b921466`'nın ağacı | `deney9.sh`, `deney9-cikti.txt` |
| 9: iki PR, deneme birleştirmeleri | `d2b0938` = `fd3505d` + `f465c47`, `f7fd59b` = `fd3505d` + `45230c0`, ikisi de test 0 | aynı |
| 9: birleştirme | `merge-tree` 0; `6b97c42`, `e97fb2e`; `main`'de test 1, `SyntaxError: … does not provide an export named 'kdv'` | aynı |
| 9: birlikte sınamak | güncellenmiş #42 `b92009d` 1; kuyruk grubu 1 `0751329` 0, grup 2 `1e028ad` 1 | aynı |
| 9: düzeltme | deneme `ac3c2d6` 0; `312b004`; `main`'de test 0; ağaç eşitliği: #42'de `main` `baeb685`, sınanan `919ba76`; #43'te ikisi `fbeb0e5` | aynı |
| 9: iş akışına `push: main` | Akış commit'i `fd3505d` (önceki taslakta `ba4b8de`); bütün 9 kimlikleri bundan türedi | aynı |
| 10: taban ve etiket | `85a4e4e` (v1.3.0), `703b5a1` (hafif v1.4.0-rc.2, 21 Ekim), `5c44797`, `06994f8`, `b58fd17` + etiket nesnesi `4ba5541`; düz push etiketi göndermedi, `--follow-tags` gönderdi | `deney10.sh`, `deney10-cikti.txt` |
| 10: revert ≠ geri dönüş | `v1.3.0` ile fark 3 dosya (VERSION, `fatura/pdf.ts`, `import/xml.ts`) | aynı |
| 10: taşınan etiket | "already exists" (1), `--force` ile `4ba5541...c608efd`; b'de düz `fetch` sessiz (0), `--tags` "would clobber existing tag" (1); kirasız `--force-with-lease` "stale info", beklenen değerle (`refs/tags/v1.4.0:<c608efd…>`) geri koyma `c608efd...4ba5541`, a'da `tag -d` + `fetch origin tag` | aynı |
| 10: hotfix | `d4919e6` (cherry-pick -x `7d8f549`), `5064c40` (1.4.1); `git cherry` `-` / `+`; ata 0 | aynı |
| 10: Teşhis ("en son etiket") | varsayılan sıralama `v1.4.0-rc.2`; `versionsort.suffix=-rc` ile `v1.4.0`; `v1.5.0-rc.1` eklenince ikisi de aday | `teshis10.sh`, `teshis10.txt` |
| Node ile `.ts` testi | Node 24.22.1'de uyarısız; `grep -m1` ile boru erken kapanınca Node çıkışı 7 olabildi, `sed -n '/…/p'` ile kararlı 1 | oturum içi |
