# "Güven Sınırı" — Kaynak ve Kanıt Defteri

> Serinin birincil kaynak kanıtı ve araştırma borcu buradadır (`SOZLESME.md` §5, §8). Bu dosya
> yayımlanacak bir yazı değildir; yazılardaki iddiaların hangi kaynağın hangi bölümüne, hangi
> sürümle dayandığını ve neyin henüz doğrulanmadığını kaydeder. Her üretim run'ı kullandığı
> kaynakları yeniden doğrular ve bu dosyayı günceller.

Son güncelleme: 2026-10-21 (kurulum + run 1 + müfredat revizyonu: Git/GitHub hattı, §7–§11 + run 2:
yazı 3–4, §12–§14)

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
  `GITHUB_TOKEN` varsayılan yetkileri (13), "Changing the default branch" (5), SAML SSO sayfası
  (yalnızca Enterprise Cloud belgesi; 11'de plan notu olarak).
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
