# "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi" — Yol Haritası

> Planın, yazı başına tasarım kaydının ve süreklilik defterlerinin sahibi bu dosyadır
> (`SOZLESME.md` §8). UI izdüşümü `content/series-guvenlik/roadmap.json`'dur; başlıklar ikisinde
> birebir aynı tutulur. **Planlanan** başlık taslaktır ve üretimden önce gerekçeyle değişebilir;
> **yayımlanmış** yazının kimliği, slug'ı, sırası ve başlığı değişmez. Kaynak kanıtı
> `ARASTIRMA.md`'de, güncel cursor `HANDOFF.md`'dedir.

Son güncelleme: 2026-10-21 (run 2: yazı 3–4 yayımlandı) · Plan: **25 yazı, 10 faz**
(tavan 25, karar #15) · Yayımlanan: 1–4 (ayrıntı `HANDOFF.md`)

---

## Serinin tezi

OWASP Top 10 bir farkındalık listesidir; güvenlik ise bir sistemin belirli bir tehdit modeli
altında sahip olduğu özelliktir. Seri, listeyi doğru okumakla açılır ve sonra her riski aynı
mühendislik zincirine çevirir: **varsayım → güven sınırı → mimari karar → doğrulanabilir özellik →
negatif test → üretimdeki sinyal → kalan risk.**

Aynı mercek kodun kendisine de tutulur. Üretimdeki her kontrol, bir değişikliğin geliştiricinin
makinesinden depoya, depodan sürüme ve dağıtıma uzanan yolundan geçer. Top 10:2025 A03 bu yolu
(kod deposu, dal koruması, CI/CD, geliştirici iş istasyonu) tedarik zincirinin parçası sayar; OWASP
Top 10 CI/CD Security Risks aynı yüzeyi risk olarak adlandırır; SSDF v1.1 PS.1 kodun her biçiminin en
az yetkiyle saklanmasını ister. Bu yüzden serinin ikinci ekseni **kaynak kod yönetimidir**: Git'in bir
değişikliği nasıl temsil ettiği, ekipte nasıl birleşip sürüme dönüştüğü ve bir organizasyonda kimin,
neyin neyi değiştirebildiği. Bu eksende güven sınırı çoğu zaman bir durum sınırıdır: çalışma ağacı
ile depo, yerel klon ile paylaşılan uzak depo, korumasız ile korumalı dal, insan ile makine kimliği.

Okur seri bittiğinde bir özelliği tehdit modelinden üretime kadar, hangi kararın hangi katmana ait
olduğunu, hangi değişikliğin nerede durduğunu ve hangi kanıtın neyi kanıtlamadığını söyleyerek
taşıyabilmelidir.

Okur profili: senior ve üstü geliştirici, mimar, teknik lider; Git/GitHub hattında ayrıca bir GitHub
organizasyonunu yöneten kişi. Yazılım temelleri anlatılmaz; yeni güvenlik ya da Git kavramı
varsayımı ve sınırıyla kurulur (`SOZLESME.md` §1, §4). Git'i her gün kullanan okurun zihinsel
modelinde boşluk olabileceği varsayılır: bu hat komut ezberletmez, grafik ve karşıt örnekle model
kurar. Düzeltilecek merkez yanlış: "`main`'den açılan dal `main`'i izler, `main` ilerleyince dal da
değişiklikleri kendiliğinden alır."

## Kapsam kararları

**Neden 25 yazı (16 + 9):**

*Güvenlik ekseni (16 yazı, değişmedi):* OWASP Top 10:2025'in on kategorisi, API Security Top
10:2023'ün API'ye özgü riskleri (nesne/alan/işlev yetkisi, iş akışı, kaynak tüketimi) ve
doğrulama/işletim halkası (gereksinim, test, kayıt, sürüm kapısı) birbirine bağlı fazlara oturuyor.
Her kategoriye bir yazı vermek hem tekrar üretirdi (A01 ile API1/API5 aynı yetki sorusunun
parçaları; A03 ile A08 aynı bütünlük zincirinin iki ucu) hem de listede olmayan ama senior
mühendisin günlük kararı olan konuları (tehdit modelleme, iş mantığı ve eşzamanlılık, test kapıları)
dışarıda bırakırdı. On altıdan azı ya iki ayrı güven sınırını tek yazıya sıkıştırıyor (tarayıcı güven
modeli ile SSRF) ya da kimlik ile yetkiyi birleştirip ikisini de yüzeyselleştiriyordu.

*Git/GitHub ekseni (9 yazı, 2026-10-21):* Kullanıcının talebi sekiz öğrenme alanı tanımlıyor:
zihinsel model ve tarih; günlük akış ve uzak depolar; dal senaryoları; kod kaybetmeden kurtarma;
GitHub'da ekip akışı; sürüm ve güvenilir teslim; organizasyon yönetimi; gerçek yönetici kararları.
Dokuz yazıya şöyle oturuyor: Git çekirdeği dört yazı (model, uzak depo, birleştirme, geri alma), ekip
akışı ve teslim iki yazı, organizasyon yönetişimi üç yazı (insan erişimi, kural ve denetim, makine
kimlikleri ve Actions). Gerçek yönetici kararları ayrı bir yazı olmaz; vaka olarak öğrenildikleri
yazıya dağıtılır ve sentez yazısında birleşir (§Yönetici vakaları). Dokuzdan azı ya düzeltilecek
yanlış modeli (yerel dal ile uzak izleme dalının ayrımı) model yazısına sıkıştırıyor ya da okurun
kendi sorumluluğu olan organizasyon yönetişimini tek yazıya indiriyordu.

*20 içinde kalma denemesi (reddedildi):* 16 güvenlik yazısının yanına dört Git/GitHub yazısı
sığıyordu; her biri iki öğrenme alanı taşıyacaktı (model + uzak depo, birleştirme + kurtarma, ekip
akışı + sürüm, bütün yönetişim tek yazıda). Güvenlik yazılarını kırparak yer açmak ise 16'nın
yukarıdaki asgari gerekçesini bozuyordu. Kullanıcı Git/GitHub hattı için 20'yi aşmaya açık izin
verdi; istisna bu dokuz yazıyla sınırlı (karar #15).

**Reddedilen seçenekler:**
- *Her Top 10 maddesine bir yazı:* listeyi ezberletir, tekrar üretir (bkz. yukarı), tasarım ve
  doğrulama halkasını kaybeder.
- *20 yazıya tamamlamak (ilk plan):* ek dört yazı adayları (ayrı OAuth/OIDC, ayrı SAMM, ayrı dosya
  yükleme, ayrı veri koruma) ilgili yazıların içinde daha güçlü duruyor.
- *İkinci yazıyı A01 üzerine kurmak:* yetkilendirme yazısıyla örtüşürdü; A10:2025 hem 2025'in yeni
  kategorisi hem de fail-open/fail-closed kararını taşıdığı için seçildi (karar #9).
- *Git/GitHub'ı ayrı bir dördüncü seri yapmak:* kullanıcı bütünleşik bir hat istedi; A03:2025, CI/CD
  riskleri ve SSDF PS uygulamaları hattı güvenlik eksenine bağlıyor.
- *Git hattını serinin sonuna koymak:* hat güvenlik yazılarını önkoşul olarak istemiyor ve okurun
  bugünkü sorumluluğuyla doğrudan ilgili; sona koymak gerekçesiz gecikme olurdu.
- *Git hattını 3'e almak:* 2'nin "Sırada ne var" bölümü tehdit modellemeyi bağlayıcı biçimde
  tanıttı; 3–4 aynı fazda kalır ve 4'ün "yapılandırma da kod gibi değişir" sorusu Git hattını açar.
- *Her komuta bir yazı ya da Git iç yapısına (plumbing, packfile) bir yazı:* komut ansiklopedisi olur,
  karar öğretmez.
- *Yönetici vakalarına ayrı bir yazı:* vaka öğrenildiği yerde daha güçlü; sentez birleştirir.

**Kapsam dışı (gerekçeli):**
- *LLM ile bütünleşik uygulama güvenliği* (istem enjeksiyonu, ajan kum havuzu): ayrı bir OWASP
  projesi var ve ayrı bir tehdit modeli gerektiriyor; bu serinin web/API güven sınırı ekseninin
  dışında. Test ve sürüm kapısı yazısında yalnızca "yapay zekâ üretimi koda güven" riski
  (Top 10:2025 X03) yer alır.
- *Mobil (MASVS), masaüstü, gömülü:* ayrı doğrulama standartları; seri sunucu ve tarayıcı tarafında
  kalır.
- *Bulut altyapısı, Kubernetes, ağ güvenliği:* yalnızca uygulamanın yapılandırma kararına değdiği
  yerde (yapılandırma, SSRF, tedarik zinciri) girer.
- *Bellek güvenliği:* Top 10:2025'in "Next Steps" bölümündeki X02; seri bellek güvenli dillerde
  yazılan web/API sistemlerini hedefliyor.
- *Uyum (compliance) çerçeveleri ve hukuk:* kapsam dışı; yalnızca veri koruma kararının teknik
  tarafı işlenir.
- *Git iç yapısı ve düşük seviye komutlar* (plumbing, packfile, `filter-branch`): model yazısında
  yalnızca nesne ve ref düzeyinde girer.
- *Kurumsal kimlik altyapısı* (Enterprise Managed Users, SCIM, kimlik sağlayıcı kurulumu): yalnızca
  organizasyon erişimi yazısında plan koşullu bir sınır notu olarak.
- *GitHub dışı barındırma platformları* (GitLab, Bitbucket, Azure DevOps): kavramlar taşınır ama ürün
  davranışı yalnızca GitHub belgeleriyle doğrulanır; karşılaştırma yapılmaz.
- *Monorepo araçları, Git LFS, submodule:* gerekirse ilgili yazıda bir sınır cümlesi.

## Fazlar ve başlıklar

| # | Faz | Kategori | Yazılar |
|---|---|---|---|
| 1 | OWASP'ı Mühendislik Aracına Çevirmek | `owasp-and-verification` | 1–2 |
| 2 | Güven Sınırını Görmek | `design-and-configuration` | 3–4 |
| 3 | Değişikliğin Zihinsel Modeli: Git | `version-control` | 5–8 |
| 4 | GitHub'da Ekip Akışı ve Teslim | `collaboration-and-delivery` | 9–10 |
| 5 | Organizasyonu Yönetmek | `organization-governance` | 11–13 |
| 6 | Kimlik ve Erişim | `identity-and-access` | 14–17 |
| 7 | Veri Akışı ve Yorumlayıcılar | `data-flow-and-interpreters` | 18–20 |
| 8 | Sırlar ve Bütünlük | `secrets-and-integrity` | 21–22 |
| 9 | Kanıt ve İşletim | `operations-and-assurance` | 23–24 |
| 10 | Sentez | `integrated-case` | 25 |

Başlıklar:

1. OWASP Top 10:2025'i Okumak: Liste Neyi Ölçer, Neyi Ölçmez?
2. Hata Yolunda Güvenlik: A10:2025'ten Doğrulanabilir Gereksinime
3. Tehdit Modelleme: Güven Sınırını Çizmek, Varsayımı Yazmak
4. Güvenli Varsayılanlar: Yapılandırma Bir Güvenlik Kararıdır
5. Git'in Zihinsel Modeli: Dal Bir Kopya Değil, Bir İşaretçidir
6. Uzak Depoyla Eşitlenmek: fetch, pull, push ve origin/main Ne Zaman Değişir?
7. Ayrışan Geçmişi Birleştirmek: Merge, Rebase ve Squash Neyi Değiştirir?
8. Kod Kaybetmeden Geri Almak: Hangi Komut Neyi Değiştirir?
9. GitHub'da Ekip Akışı: Push, PR, Merge ve Dağıtım Ayrı Kararlardır
10. Sürüm ve Dağıtım: Etiket, GitHub Release ve Geri Dönüş Yolu
11. Organizasyonda Erişim: Roller, Takımlar ve En Az Yetki
12. Kuralı Platforma Yazmak: Ruleset, Dal Koruması ve Bypass
13. Makine Kimlikleri ve Actions: Token, GitHub App ve İş Akışı Güvenliği
14. Kimlik Doğrulama ve Oturum: Kimliğin Yaşam Döngüsü
15. Yetkilendirme: Nesne, Kiracı ve İşlev Düzeyinde Karar
16. API Yüzeyi: Alan Düzeyi Yetki, Hassas İş Akışları ve Kaynak Tüketimi
17. İş Mantığı ve Eşzamanlılık: Durum Makinesini Saldırgan Gözüyle Okumak
18. Enjeksiyon: Verinin Koda Dönüştüğü Sınır
19. Tarayıcının Güven Modeli: XSS, CSP, CSRF ve CORS
20. SSRF ve Çıkış Trafiği: Sunucu Adına Yapılan İstekler
21. Kriptografik Kararlar ve Anahtar Yaşam Döngüsü
22. Tedarik Zinciri ve Yapı Bütünlüğü: Bağımlılıktan Dağıtıma
23. Güvenlik Kaydı, Uyarı ve Olay Müdahalesi
24. Güvenlik Testi ve Sürüm Kapıları: Kanıt Üreten Bir Hat
25. Bütünleşik Vaka: Bir Özelliği Tehdit Modelinden Üretime Taşımak

### Eski ve yeni plan (revizyon 2026-10-21)

| Yeni sıra | Eski sıra | Değişiklik |
|---|---|---|
| 1–2 | 1–2 | Yayında; kimlik, slug, sıra, başlık, hash ve gövde değişmedi |
| 3–4 | 3–4 | Başlık ve kayıt aynı; 4'ün sonraki köprüsü artık Git hattına |
| 5–13 | — | Yeni: Git/GitHub hattı (dokuz yazı) |
| 14–17 | 5–8 | Başlıklar aynı; numara +9; organizasyon ve token yazılarından geri çağırma eklendi |
| 18–20 | 9–11 | Başlıklar aynı; numara +9 |
| 21–22 | 12–13 | Başlıklar aynı; 22, Actions ve CI kimliğini 13'e bıraktı, bağımlılık, köken ve imzaya odaklanır |
| 23–24 | 14–15 | Başlıklar aynı; denetim kaydı ve gerekli kontroller geri çağrılır |
| 25 | 16 | Başlık aynı; vaka değişikliğin depodan dağıtıma yolunu ve bir organizasyon olayını da kapsar |

## Önkoşul grafı (yazı düzeyi)

- 1 → 2 → 3 → 4 (OWASP okuma → hata yolu → güven sınırı → ortam varsayımları)
- 4 → 5 → 6 → 7 → 8 (yapılandırma da kod gibi değişir → Git modeli → uzak depo → birleştirme →
  geri alma)
- 3, 7, 8 → 9 → 10 (inceleme bir güven sınırı kontrolüdür → ekip akışı → sürüm ve dağıtım)
- 4, 9 → 11 → 12 → 13; 8, 10 → 12 (zorla push, etiket koruması); 2 → 13 (token doğrulamasında
  fail-closed)
- 2, 3, 4 → 14 → 15 → 16 → 17; 11, 13 → 14 (2FA zorunluluğu, token bir kimlik bilgisidir); 11 → 15
  (katmanlı rol modeli)
- 3 → 18 → 19; 14 → 19 (çerez ve oturum); 3, 15 → 20; 13 → 18 (iş akışında betik enjeksiyonu)
- 4, 14 → 21; 13 → 21 (token ömrü ve rotasyonu); 3, 10, 13, 15, 21 → 22
- 2, 15, 17 → 23; 12 → 23 (denetim kaydı); 1, 2, 15, 23 → 24; 9 → 24 (gerekli kontroller)
- hepsi → 25

## Yazı başına tasarım kaydı

Her kayıt: öğretim hedefi · önkoşul · çekirdek kavramlar (≤ 3) · senaryo · korunacak varlık ·
saldırgan yeteneği · güven sınırı · kırılan varsayım · karar · doğrulanacak özellik / negatif test ·
kalan risk ve ödünleşim · birincil kaynaklar · köprüler · planlı geri çağırma. Git/GitHub hattının
kayıtlarında ayrıca: deney deposu kurgusu, düzeltilecek yanlış model, şekil planı (önce/sonra), plan
koşulları ve yönetici vakası. Planlanan yazıların kaynak listesi bir başlangıç noktasıdır; sürüm ve
durum üretim run'ında yeniden doğrulanır (`ARASTIRMA.md` borçları).

### 1. OWASP Top 10:2025'i Okumak: Liste Neyi Ölçer, Neyi Ölçmez?

- **Durum:** yayında (run 1, kohort 0) · slug `owasp-top-10-2025-i-okumak` · iki şekil
  (`bir-siranin-girdileri.svg`, `sifir-bulgu-nereye-kadar.svg`).
- **Hedef:** Okur, Top 10:2025'in hangi veriden ve hangi yargıdan üretildiğini açıklayıp bir
  "Top 10 temiz" iddiasının neyi kanıtlayıp neyi kanıtlamadığını söyleyebilir ve listeyi gereksinim
  ya da test standardı yerine farkındalık ve önceliklendirme girdisi olarak kullanır.
- **Önkoşul:** yok (profesyonel web/API deneyimi).
- **Kavramlar:** yaygınlık oranı / test kapsamı / sıklık ayrımı; kategori = CWE kümesi (kök neden,
  belirti); belgelerin rolleri (farkındalık, gereksinim, uygulama, test, program).
- **Senaryo:** çok kiracılı B2B faturalama ürünü; sürüm kapısında güvenlik aracının "OWASP Top 10:
  0 bulgu" raporu ve "Top 10 uyumluyuz" iddiası.
- **Varlık / saldırgan / sınır:** kiracı verisi; kimliği doğrulanmış başka bir kiracının kullanıcısı;
  "aracın test ettiği küme" ile "ürünün yaptığı" arasındaki kanıt sınırı.
- **Kırılan varsayım:** "Tarama temizse Top 10 risklerine karşı korunuyoruz."
- **Karar:** sürüm iddiasını sürümlü ASVS gereksinimleri ve kanıtla ifade etmek; araç raporunu
  kapsamasıyla okumak; Top 10'u tehdit modelleme ve eğitim gündemi olarak kullanmak.
- **Özellik / negatif test:** her iddia edilen gereksinimin bir test kanıtı vardır; kanıtı olmayan
  gereksinim "doğrulandı" sayılmaz (kapı); iki hesaplı çapraz kiracı denemesi aracın göremediği
  sınıfa örnektir.
- **Kalan risk:** gereksinim listesi de tehdit modelinin dışında kalanı göremez.
- **Kaynaklar:** Top 10:2025 (Introduction, What are Application Security Risks, Establishing a
  Modern AppSec Program, A01, A03, A09, A10, Next Steps); Top 10:2021 "How to use the OWASP Top 10 as
  a standard"; Top 10 2025 veri çağrısı; ASVS 5.0.0 (What is the ASVS + resmî JSON); WSTG v4.2; API
  Security Top 10:2023; Proactive Controls 2024; SAMM v2; NIST SP 800-218 v1.1 ve Rev. 1 IPD.
- **Köprü:** → 2 (bir kategoriyi doğrulanabilir gereksinime çevirmek).

### 2. Hata Yolunda Güvenlik: A10:2025'ten Doğrulanabilir Gereksinime

- **Durum:** yayında (run 1, kohort 0) · slug `hata-yolunda-guvenlik-a10-2025` · iki şekil
  (`uc-cevap-iki-politika.svg`, `yarim-kalan-paylasim.svg`).
- **Hedef:** Okur, bir güvenlik kararının hata yollarını (bağımlılık hatası, bozuk ya da eksik yanıt,
  kısmi işlem) çıkarıp her biri için fail-closed davranışı sürümlü bir ASVS gereksinimine ve hata
  enjeksiyonlu bir negatif teste çevirebilir; fail-open'ın hangi koşulda bilinçli bir ürün kararı
  olabileceğini ve bedelini söyleyebilir.
- **Önkoşul:** 1.
- **Kavramlar:** fail-open / fail-closed; "ret" ile "karar alınamadı" ayrımı; kısmi başarısızlıkta
  atomiklik.
- **Senaryo:** belge paylaşım servisi; yetki kararı ayrı bir politika servisinden gelir; paylaşım
  bağlantısıyla birlikte denetim kaydı yazılır.
- **Varlık / saldırgan / sınır:** başkasının belgesinin gizliliği ve denetim izinin bütünlüğü;
  kimliği doğrulanmış, politika servisini yük altında bırakabilen ya da arıza anını kollayan
  kullanıcı; uygulama ↔ politika servisi ve uygulama ↔ istemci sınırları.
- **Kırılan varsayım:** "Bağımlılık hata verirse kullanıcıyı engellemeyelim"; negatif koşul
  (`denied` yoksa geç).
- **Karar:** yalnızca açık izin geçer; hata türü sınıflandırılır; ret (403) ile karar alınamadı
  (503) ayrılır; paylaşım ve denetim kaydı tek işlemde; istemciye ayrıntısız hata, kayda ayrıntı.
- **Özellik / negatif test:** bağımlılık hata matrisi (zaman aşımı, 5xx, bozuk gövde, eksik alan,
  yanlış tip, bağlantı reddi) → her satırda ret ve sıfır yan etki; denetim yazımı başarısızsa
  paylaşım yok; hata yanıtında iç ayrıntı yok.
- **Kalan risk:** fail-closed erişilebilirliği politika servisine bağlar; karar önbelleği iptal
  gecikmesi yaratır; son çare işleyici yanlış eşlenirse kendisi fail-open olur.
- **Kaynaklar:** A10:2025; ASVS v5.0.0-16.5.1–16.5.4, 16.3.4, 8.3.2; WSTG-ERRH-01 (v4.2); Error
  Handling Cheat Sheet; CWE-636, 209, 390, 396, 252; Envoy ext_authz `failure_mode_allow`
  (v1.40.0); Kubernetes admission webhook `failurePolicy`; RFC 9457.
- **Köprüler:** 1 ← (kategori = CWE kümesi, belge rolleri uygulanır); → 3 (hata yollarını
  sistematik bulmak: tehdit modeli).

### 3. Tehdit Modelleme: Güven Sınırını Çizmek, Varsayımı Yazmak

- **Durum:** yayında (run 2, kohort 1) · slug `tehdit-modelleme-guven-sinirini-cizmek` · iki şekil
  (`onizleme-veri-akisi.svg`, `once-sonra-isci-siniri.svg`).
- **Yayımlanan biçim (run 2):** senaryo 2'nin çok kiracılı belge ürününde önizleme hattı (imzalı
  yükleme adresi → nesne deposu → kuyruk → işçi → aynı süreçteki dönüştürücü); kırılan varsayım
  CWE-501 olarak mesajın alanlarının kökeni üzerinden kuruldu. Dört soru (Manifesto) yazının
  iskeleti; STRIDE sınır geçişlerine uygulandı; izlenebilirlik tablosu `v5.0.0-8.4.1`, `5.2.2`,
  `5.2.3`, `5.2.6`, `5.3.2`, `15.2.5`, `15.1.5`, `15.1.3`, `15.2.2`'ye bağlandı. Kendi hesabımız:
  60 MiB'lık sıfır dosyanın zip'i 61.287 bayt, 20.000 × 20.000 PNG 388.871 bayt (`ARASTIRMA.md`
  §14). Kiracılar arası negatif test, mesaj şemasının yalnızca belge kimliği taşıması ve anahtarın
  veritabanından türetilmesiyle kuruldu. "Model değişiklikle yaşar" bölümü kanıt dosyası kapısını
  (1) geri çağırdı.
- **Hedef:** Okur, bir özelliğin veri akış diyagramını çizip güven sınırlarını işaretleyebilir,
  her sınır geçişi için tehditleri ve doğrulanabilir gereksinimleri çıkarabilir ve modeli tasarım
  incelemesinde yaşayan bir belge olarak tutar.
- **Önkoşul:** 1, 2. **Kavramlar:** güven sınırı; veri akış diyagramı; tehdit → gereksinim izi.
- **Senaryo:** dosya yükleme + arka plan işleme hattı (API → nesne deposu → kuyruk → işçi →
  dönüştürücü kütüphane). **Kırılan varsayım:** "İşçi iç ağda, girdisi güvenilir" (CWE-501).
- **Karar / test:** sınırda doğrulama, yetki ve kaynak limiti; işçiyi en az yetkiyle yalıtmak;
  zararlı tür, boyut/sıkıştırma bombası, yol geçişi ve kiracılar arası erişim negatif testleri.
- **Kalan risk:** model yalnızca çizilen akışları kapsar; değişiklikle bayatlar.
- **Kaynaklar (üretimde doğrulanacak):** Threat Modeling Cheat Sheet; Threat Modeling Manifesto;
  A06:2025; ASVS 5.0.0 V15 (mimari belgeleme) ve V5 (dosya işleme).
- **Geri çağırma:** 2'nin hata yolları DFD'ye hata kenarı olarak eklenir; 1'in "güven sınırı"
  tanımı (yalnızca adı ve kanıt sınırı örneği kuruldu) burada biçimsel olarak kurulur.
- **Bağlayıcı köprü:** 2'nin "Sırada ne var" bölümü bu yazıyı "dosya yükleme hattının veri
  akışını çizip her sınır geçişini bir tehdide ve doğrulanabilir bir gereksinime bağlamak" diye
  tanıttı; senaryo bu sözü karşılamalı.
- **Kurulmuş terimler:** fail-open/fail-closed, karar alınamadı, kısmi başarısızlık, giden kutusu,
  eşgüçlü, hata enjeksiyonu, devre kesici 1–2'de kuruldu; yeniden gloss verilmez.
- **Köprü:** → 4 (sınırı çizdik; ortamın ve yapılandırmanın varsayımları).

### 4. Güvenli Varsayılanlar: Yapılandırma Bir Güvenlik Kararıdır

- **Durum:** yayında (run 2, kohort 1) · slug `guvenli-varsayilanlar-yapilandirma` · iki şekil
  (`etkin-degerin-katmanlari.svg`, `yapilandirmanin-iki-yolu.svg`).
- **Yayımlanan biçim (run 2):** aynı önizleme özelliğinin sürüm öncesi yapılandırma incelemesinde dört
  bulgu: `DEBUG_ROUTES` yokken açılan hata ayıklama uçları (CWE-489), bir müşteri dosyası için eklenen
  `noent: true` (CWE-611; libxml2 belgesi: adına rağmen dış varlık yüklemeyi açar), `NODE_ENV`'siz
  imajda yığın izi (finalhandler 2.1.1, kendi deneyimiz `ARASTIRMA.md` §14) ve konsoldan
  genişletilen depolama rolü (kayma). Kaynaklar: Proactive Controls 2024 C5, ASVS V13 kontrol hedefi,
  `v5.0.0-13.4.2`, `13.4.5`, `15.2.3`, `1.5.1`, SSDF PW.9.1–9.2, A02:2025, API8:2023,
  `WSTG-CONF-02`/`-05` (v4.2), CWE-1188. "Sırada ne var" Git hattını açtı (karar #25).
- **Hedef:** Okur, yapılandırmayı kodla aynı inceleme ve test disiplinine sokup ortamlar arası farkı,
  açık kalan hata ayıklama ve yönetim yüzeyini ve güvensiz ayrıştırıcı ayarlarını sürüm öncesi
  yakalayan bir kontrol kurabilir.
- **Önkoşul:** 2, 3. **Kavramlar:** güvenli varsayılan (secure by default); yapılandırma kayması
  (drift); saldırı yüzeyi envanteri.
- **Senaryo:** staging ile prod'un farkı: açık kalmış hata ayıklama uç noktası, XXE'ye açık XML
  ayrıştırıcı (CWE-611), ayrıntılı hata sayfası, geniş depolama izni.
- **Kaynaklar (üretimde):** A02:2025; ASVS 5.0.0 V13; Proactive Controls 2024 C5; WSTG v4.2
  yapılandırma testleri; API8:2023.
- **Geri çağırma:** 2'nin ayrıntısız hata yanıtı bir yapılandırma kararı olarak; 3'ün sınırı.
- **Bağlayıcı köprü (revizyon 2026-10-21):** Bu yazının "Sırada ne var" bölümü Git hattını açar:
  yapılandırma kod gibi bir depoda değişiyorsa, bir değişikliğin "nerede" olduğu nasıl bilinir?
  Sonraki yazının sorusu Git'in bir değişikliği nasıl temsil ettiğidir (5). Eski plandaki "kimlik
  doğrulama" köprüsü kullanılmaz.

### 5. Git'in Zihinsel Modeli: Dal Bir Kopya Değil, Bir İşaretçidir

- **Hedef:** Okur, bir deponun durumunu commit grafiği (anlık görüntüler ve ebeveyn bağları), ref'ler
  (dal, etiket, HEAD) ve üç alan (çalışma ağacı, hazırlık alanı, depo) üzerinden okuyup bir
  değişikliğin nerede olduğunu kanıtla söyleyebilir; bir dalın başka bir dalı izlemediğini, yalnızca
  üzerinde commit yapıldığında ya da birleştirildiğinde ilerlediğini gösterebilir.
- **Önkoşul:** 4 (yapılandırma da kod gibi sürümlenir). Git'i günlük kullanmış olmak yeter; iç yapı
  bilgisi beklenmez.
- **Bağlayıcı köprü (run 2):** 4'ün "Sırada ne var" bölümü şunu sordu: XXE düzeltmesi tam olarak
  nerede duruyor, üretime giden yapı onu içeriyor mu ve ana daldan önceden açılmış bir dal ana dala
  sonradan giren bu düzeltmeyi kendiliğinden alır mı? Senaryodaki güvenlik yaması bu düzeltme
  (içe aktarmada `DOCTYPE` reddi) olarak somutlanabilir (karar #25). "Dal (branch)" 4'te geçerken
  kuruldu: 5 kavramı tanımlar ama parantezli gloss'u tekrar etmez; "kod deposu (repository)" de 4'te
  kuruldu.
- **Kavramlar:** commit = anlık görüntü + ebeveyn + üst veri, kimliği içerik özetidir; dal ve HEAD
  birer işaretçidir; çalışma ağacı / hazırlık alanı / depo.
- **Senaryo:** kurgusal `ornek-sirket`'te bir servis deposu: geliştirici `main`'den
  `feature/fatura-pdf` açar, ertesi gün `main`'e bir güvenlik yaması girer; geliştirici yamanın
  kendi dalında olduğunu varsayar.
- **Deney deposu:** tek klon; `git init -b main`, üç commit; `.git/HEAD` ve `.git/refs/heads/*`
  içeriği (dal, 40 karakterlik kimlik içeren bir dosyadır); `git switch -c`; `main`'e commit;
  `git log --oneline --graph --all`; `git merge-base --is-ancestor`, `git branch --contains`.
- **Varlık / sınır:** koda giren değişiklik; "çalışma ağacında duran" ile "commit'e girmiş" ve
  "benim dalımda" ile "`main`'de" sınırları.
- **Düzeltilecek yanlış model:** "Dal, açıldığı dalın canlı bir kopyasıdır; `main` ilerlerse dal da
  onu alır." İkinci yanlış: "`main` ile `master` farklı roller."
- **Karar:** "Bu değişiklik dalımda mı?" sorusu grafikle cevaplanır, dal adıyla değil; dal açmak
  bir kopya değil bir işaretçi yazmaktır; varsayılan dal adı bir ayardır (Git'te `init.defaultBranch`,
  şimdilik `master`, Git 3.0'da `main`; GitHub'da yeni depoda `main` ve depo ayarı).
- **Özellik / negatif test:** `git merge-base --is-ancestor <yama> <dal>` yama dalda değilse 1 döner;
  önce/sonra grafiği.
- **Kalan risk:** commit kimliği içeriğin bütünlüğünü gösterir, yazarın kimliğini göstermez (yazar
  alanı serbestçe yazılır) → imzalı commit kuralı (12).
- **Şekil planı:** (1) üç commit, iki dal işaretçisi ve HEAD; `main`'e commit gelince yalnızca `main`
  işaretçisinin kaydığı önce/sonra paneli. (2) Üç alan ve komutların hangi alanı değiştirdiği.
- **Tarih:** yerel → merkezî (CVS, Subversion) → dağıtık sürüm kontrolü; 2002–2005 Linux/BitKeeper ve
  Git'in doğuşu. Yalnızca "neredeyse her işlem yereldir" ve "her klon tam geçmişi taşır" fikrini
  taşıdığı kadar.
- **Kaynaklar (üretimde doğrulanacak):** Pro Git 2. baskı 1.1–1.3, 3.1, 10.2–10.3; Git başvuru
  kılavuzu `git-init` (varsayılan dal adı), `gitglossary`, `git-merge-base`, BreakingChanges; GitHub
  Docs "About branches"; Top 10:2025 A03 (kod deposu tedarik zincirinin parçası).
- **Teşhis et (fikir):** iki dal grafiği verilir; "yama hangi dalda, hangisinde değil?"
- **Köprü:** → 6 (bu grafiğin uzak depoda da bir kopyası var: `origin/main`).

### 6. Uzak Depoyla Eşitlenmek: fetch, pull, push ve origin/main Ne Zaman Değişir?

- **Hedef:** Okur, yerel dal, uzak izleme dalı (`origin/main`) ve uzak depodaki dal arasındaki farkı;
  `fetch`, `pull` ve `push`'un her birinin hangi ref'i değiştirdiğini; ahead/behind/diverged durumunu
  ve "`main`'e giren kod neden feature dalımda yok" sorusunun cevabını komut ve grafikle gösterebilir.
- **Önkoşul:** 5. **Kavramlar:** uzak izleme dalı ve yukarı akış dalı (upstream); `fetch` ile `pull`
  (`fetch` + bütünleştirme) ayrımı; ileri sarma (fast-forward) ve ıraksama.
- **Senaryo:** iki geliştirici (iki klon) ve `origin` olarak yerel bir bare depo; biri `main`'e
  push eder, öteki `fetch` öncesi ve sonrası grafiğe bakar, `main`'de `pull` yapar ve `feature`'ın
  değişmediğini görür.
- **Deney deposu (yerelde doğrulandı, Git 2.53, `ARASTIRMA.md` §9):** `fetch` yalnızca `origin/main`'i
  taşır; `main...origin/main` 0/1 verir; yapılandırmasız `pull` ıraksama yokken ileri sarar,
  ıraksamada reddeder (çıkış 128); feature dalı her iki durumda da yerinde kalır.
- **Düzeltilecek yanlış model:** "`pull` her şeyi günceller"; "`origin/main` uzak depodaki `main`'in
  canlı görüntüsüdür"; "ahead/behind sayısı uzak depoya sorulur" (son iletişimin yerel önbelleğidir).
- **Karar:** feature'ı güncel tabana getirmek ayrı ve bilinçli bir bütünleştirmedir (7); `pull`
  davranışı (`pull.ff`, `pull.rebase`) ekipçe seçilir; reddedilen push bir güvenlik ağıdır.
- **Özellik / negatif test:** `git rev-list --left-right --count main...origin/main`;
  `git merge-base --is-ancestor origin/main feature`; ıraksamada yapılandırmasız `pull`'un reddi.
- **Kalan risk:** uzak izleme dalı son iletişim anının fotoğrafıdır; eski `origin/main`'e göre
  verilen karar yanlış olabilir.
- **Şekil planı:** iki makine paneli + uzak depo; `fetch` öncesi/sonrası; kayan ref vurgulu.
- **Kaynaklar:** Pro Git 2.5, 3.5; Git başvuru kılavuzu `git-fetch`, `git-pull` (güncel kılavuzda
  varsayılan `--ff-only`), `git-push`, `git-branch` (`-vv`), `git-status`, `gitglossary`.
- **Geri çağırma:** 1'in kanıt kapsamı: `fetch` yapılmamışsa "behind 0" bir "güncelim" kanıtı
  değildir.
- **Köprü:** → 7 (ıraksayan iki geçmişi birleştirmek).

### 7. Ayrışan Geçmişi Birleştirmek: Merge, Rebase ve Squash Neyi Değiştirir?

- **Hedef:** Okur, ileri sarma ile birleştirme commit'i, rebase ile merge ve GitHub'daki üç PR
  birleştirme yönteminin (merge commit, squash, rebase) geçmişte ve commit kimliklerinde neyi
  değiştirdiğini grafikle açıklayıp ekip için bir güncelleme ve birleştirme politikası seçebilir;
  squash sonrası aynı dalda devam etmenin neden çatışma ürettiğini gösterebilir.
- **Önkoşul:** 6. **Kavramlar:** birleştirme tabanı (merge base) ve üç yollu birleştirme; rebase'in
  commit'leri yeniden yazması (yeni kimlik); squash'ın ata ilişkisi kurmaması.
- **Senaryo:** iki haftalık bir feature dalı ve `main`'de aynı dosyaya dokunan bir yama; PR'ı tabanla
  güncellemek (GitHub "Update branch": merge ya da rebase; `gh pr update-branch [--rebase]`); squash
  ile birleştirilen dal üzerinde devam eden iş.
- **Deney deposu (yerelde doğrulandı):** squash sonrası `merge-base(feature, origin/main)` eski çatal
  noktasında kalır; aynı satıra dokunan devam commit'i `origin/main` ile birleşirken çatışır.
- **Düzeltilecek yanlış model:** "Rebase ile merge aynı sonucu verir, biri sadece daha temiz";
  "squash edilen dal birleşmiş sayılır, üzerinde devam edilebilir"; "yayımlanmış dalı rebase etmek
  yalnızca benim işim".
- **Karar:** kısa ömürlü dal ve ekip bağlamına göre squash ya da birleştirme commit'i; paylaşılmış
  dalda rebase yok; squash sonrası dal silinir, yeni iş yeni daldan; çatışma çözümü testle
  doğrulanır.
- **Özellik / negatif test:** birleştirme sonrası `git merge-base --is-ancestor`; rebase sonrası
  kimliklerin değiştiğinin gösterimi; çatışmalı birleştirmenin testsiz tamamlanamaması.
- **Kalan risk:** temiz birleşen kod anlamca çatışabilir (iki taraf ayrı ayrı doğru, birlikte yanlış)
  → gerekli kontroller ve birleştirme kuyruğu (9).
- **Yönetici vakası:** çakışan uzun yaşayan dal.
- **Şekil planı:** aynı başlangıç grafiğinin üç sonu (merge commit, rebase, squash) yan yana; squash
  sonrası devam dalının tabanı.
- **Kaynaklar:** Pro Git 3.2, 3.6 ("Perils of Rebasing"); Git başvuru kılavuzu `git-merge`
  (`--ff-only`, `ort`), `git-rebase`, `git-merge-base`; GitHub Docs "Pull request merges" (squash ile
  uzun yaşayan dal, dolaylı birleştirme), "Keeping your pull request in sync with the base branch";
  GitHub CLI `gh pr update-branch`.
- **Geri çağırma:** 5 (commit kimliği içerikten ve ebeveynden türer → rebase kimliği değiştirir).
- **Köprü:** → 8 (yanlış birleştirme ve yanlış push nasıl geri alınır).

### 8. Kod Kaybetmeden Geri Almak: Hangi Komut Neyi Değiştirir?

- **Hedef:** Okur, `restore`, `revert`, `reset` (`--soft`, `--mixed`, `--hard`), `stash`,
  `cherry-pick`, `reflog` ve zorla push biçimlerini hangi alanı ve hangi ref'i değiştirdiklerine göre
  sınıflandırıp paylaşılmış ve yerel geçmiş için güvenli geri alma yolunu seçebilir; hangi kaybın
  geri alınamaz olduğunu söyleyebilir.
- **Önkoşul:** 5, 6, 7. **Kavramlar:** geri döndürme (revert, yeni commit) ile geri sarma (reset, ref
  taşıma); `reflog` ve ulaşılamaz commit'in ömrü; `--force-with-lease` ve `--force-if-includes`.
- **Senaryo:** yanlışlıkla `main`'e doğrudan push edilmiş commit; silinmiş bir dal; yanlış
  birleştirme; ayrık HEAD'de yapılmış iş; başkasının commit'ini ezme riski taşıyan zorla push.
- **Deney deposu (yerelde doğrulandı):** uzak dal başkası tarafından ilerletilmişken
  `--force-with-lease` reddeder ("stale info"); araya bir `fetch` girince yalnız `--force-with-lease`
  başkasının commit'ini ezer, `--force-if-includes` ise reddeder; ezilen commit yerelde `reflog`'ta
  durur.
- **Düzeltilecek yanlış model:** "`reset --hard` her şeyi geri alır"; "`--force-with-lease` her zaman
  güvenlidir"; "silinen dal kaybolmuştur".
- **Karar:** paylaşılmış geçmişte `revert`; yerelde `reset` ancak kaydı görerek; zorla push yalnızca
  kendi dalında ve `--force-with-lease --force-if-includes` ile; kurtarmada önce `reflog`, GitHub'da
  kapalı PR'dan dal geri yükleme.
- **Özellik / negatif test:** deney deposunda her komut sonrası üç alanın ve ref'lerin durumu;
  birleştirme commit'inin `revert -m 1` ile geri alınması ve sonradan yeniden birleştirmenin etkisi
  (başvuru kılavuzundaki uyarı).
- **Kalan risk:** commit'lenmemiş değişiklik (`reset --hard`, `clean`) geri gelmez; `reflog` yerel ve
  sürelidir (varsayılan 90 gün; ulaşılamaz girdiler 30 gün); başkasının klonundaki kopya senin
  kontrolünde değildir.
- **Yönetici vakası:** yanlışlıkla `main`'e push (geri alma); silinen dal.
- **Şekil planı:** komut × alan matrisi Markdown tablosu olarak kalır; şekil: zorla push'un uzak dal
  işaretçisini nereye taşıdığı ve `reflog` izinin nerede kaldığı.
- **Kaynaklar:** Pro Git 7.7 (reset'in tek tehlikeli biçimi `--hard`), 10.7 (kurtarma); Git başvuru
  kılavuzu `git-reset`, `git-restore`, `git-revert` (`-m`, "revert-a-faulty-merge"), `git-reflog`,
  `git-gc` (`gc.reflogExpire`, `gc.reflogExpireUnreachable`, `gc.pruneExpire`), `git-stash`,
  `git-cherry-pick`, `git-push` (`--force-with-lease`, `--force-if-includes`); GitHub Docs "Deleting
  and restoring branches in a pull request".
- **Geri çağırma:** 2'nin kısmi başarısızlığı: yarıda kalan merge ya da rebase `--abort` ile bütünüyle
  geri alınır.
- **Köprü:** → 9 (bu kazaları önlemenin yeri platform: PR ve koruma).

### 9. GitHub'da Ekip Akışı: Push, PR, Merge ve Dağıtım Ayrı Kararlardır

- **Hedef:** Okur, Git ile GitHub'ın ayrımını (dağıtık sürüm kontrolü ↔ onun üzerinde işbirliği ve
  yönetişim platformu) ve push, PR, inceleme, birleştirme ve dağıtımın ayrı kararlar olduğunu
  açıklayabilir; PR tabanını, gerekli incelemeyi, CODEOWNERS'ı, gerekli durum kontrollerini ve
  birleştirme kuyruğunu bir değişiklik akışı olarak tasarlayıp ekip bağlamına göre dal stratejisi
  (trunk tabanlı geliştirme, GitHub flow, sürüm dalları) seçebilir.
- **Önkoşul:** 3 (inceleme bir güven sınırı kontrolüdür), 7, 8. **Kavramlar:** PR (head ve base);
  zorunlu inceleme ve kod sahipliği; gerekli kontrol ve birleştirme kuyruğu.
- **Senaryo:** `ornek-sirket`'te ödeme servisinin deposu; iki takım, haftada çok sayıda PR; "testler
  PR'da yeşildi ama `main` kırıldı"; CODEOWNERS dosyasının kendisinin değiştirilebilmesi.
- **Tarih:** GitHub'ın 10 Nisan 2008 lansmanı; PR'ın Git'in değil platformun kavramı olduğu.
  Yalnızca "PR bir Git komutu değildir" ayrımını taşıdığı kadar.
- **Düzeltilecek yanlış model:** "Push ettim, demek ki yayında"; "PR yeşil, birleşince `main` de yeşil
  olur"; "CODEOWNERS tek başına onay zorunluluğu getirir".
- **Karar:** gerekli inceleme ve kod sahibi onayı koruma kuralıyla zorunlu kılınır (CODEOWNERS
  yalnızca inceleme isteği açar); yoğun dalda birleştirme kuyruğu; strateji teslim biçimine göre
  seçilir (sürekli teslimde kısa ömürlü dal; sahada birden çok sürüm varsa sürüm dalları; GitFlow'un
  yazarının 2020 notu).
- **Özellik / negatif test:** koruma etkin bir test deposunda onaysız PR'ın birleşememesi;
  CODEOWNERS'ın kendi satırının korunması; birleştirme kuyruğu kullanılıyorsa iş akışının
  `merge_group` olayını dinlemesi.
- **Kalan risk:** dolaylı birleştirme (aynı commit'ler başka yoldan tabana ulaşırsa PR, koruma
  koşulları sağlanmamış olsa da birleşmiş görünür); inceleme kalitesi kural değil kültürdür.
- **Plan koşulları (Ekim 2026):** özel depoda korumalı dal ve kod sahipleri için GitHub Pro, Team ya
  da Enterprise; birleştirme kuyruğu organizasyona ait herkese açık depolarda ve Enterprise Cloud
  kullanan organizasyonların özel depolarında.
- **Şekil planı:** push → PR → kontroller ve inceleme → kuyruk → birleştirme → sürüm → dağıtım hattı;
  her geçişte kimin karar verdiği ve hangi kanıtın üretildiği.
- **Kaynaklar:** GitHub blog "We launched" (2008-04-10); GitHub Docs "GitHub flow", "About branches",
  "About code owners", "About protected branches", "Managing a merge queue", "Pull request merges";
  GitHub CLI `gh pr merge`; DORA "Trunk-based development"; Driessen, "A successful Git branching
  model" ve 2020 notu; OWASP Top 10 CI/CD Security Risks (CICD-SEC-1).
- **Geri çağırma:** 1'in kanıt kapsamı (yeşil PR kontrolü neyi kanıtlar); 3'ün güven sınırı.
- **Köprü:** → 10 (birleşen kod nasıl bir sürüme ve dağıtıma dönüşür).

### 10. Sürüm ve Dağıtım: Etiket, GitHub Release ve Geri Dönüş Yolu

- **Hedef:** Okur, dal stratejisini dağıtımdan ayırıp bir sürümü değişmeyen bir commit kimliğine ve
  etikete bağlayabilir; hafif ve açıklamalı etiket, GitHub Release ve değişmez sürüm (immutable
  release), SemVer'in sözleşme anlamı ve sınırı, sürüm dalı ve hotfix akışı, geri dönüşte yeniden
  dağıtım ile revert arasındaki farkı karar olarak verebilir.
- **Önkoşul:** 8, 9. **Kavramlar:** etiket ve GitHub Release; SemVer'in genel API sözleşmesi; geri
  dönüş (önceki yapı çıktısını yeniden dağıtmak) ile geri döndürme (revert) ayrımı.
- **Senaryo:** başarısız bir dağıtım ve aynı gün gereken acil hotfix; "üretimde hangi commit
  çalışıyor?" sorusuna cevap verilememesi; yayımlanmış bir etiketin taşınması.
- **Terim notu:** Türkçede "sürüm" hem numaralı hâli (version) hem kullanıma çıkarılmasını (release)
  anlatıyor; yazı sürüm numarasını (SemVer) ve GitHub Release nesnesini ayrı adlarla anar.
- **Düzeltilecek yanlış model:** "Etiket bir kez atıldı mı değişmez"; "SemVer uyumluluğu garanti
  eder"; "geri dönmek revert commit'i atmaktır".
- **Karar:** sürüm = etiket + yapı çıktısı + kayıtlı SHA; yayımlanmış etiket taşınmaz (`git-tag`, "On
  Re-tagging"; GitHub'da değişmez sürümle kilitlenebilir); acil durumda önce önceki yapı çıktısı
  yeniden dağıtılır, düzeltme normal akışla gelir; hotfix `main`'e geri birleştirilir.
- **Özellik / negatif test:** dağıtılmış sürümden SHA'ya ve PR'a izlenebilirlik; değişmez sürümde
  etiketin taşınamaması ve silinememesi (test deposunda).
- **Kalan risk:** veri şeması değişikliği kodla birlikte geri dönmez; SemVer bir sözdür, otomatik
  doğrulama değildir.
- **Yönetici vakası:** başarısız dağıtım; acil hotfix.
- **Şekil planı:** sürüm dalı + hotfix grafiği ve etiketlerin değişmeyen noktaları.
- **Kaynaklar:** Pro Git 2.6; Git başvuru kılavuzu `git-tag` ("On Re-tagging"); GitHub Docs "About
  releases", "Immutable releases"; SemVer 2.0.0; NIST SP 800-218 v1.1 PS.2, PS.3; Driessen 2020 notu
  (birden çok sürüm desteği).
- **Geri çağırma:** 8 (revert ve zorla push); 2 (kısmi başarısızlık: yarım kalan dağıtım).
- **Köprü:** → 11 (bu kararları kim verebilir: organizasyonda erişim).

### 11. Organizasyonda Erişim: Roller, Takımlar ve En Az Yetki

- **Hedef:** Okur, bir GitHub organizasyonunda kimin hangi depoyu neden görüp yazabildiğini;
  organizasyon rolleri, takımlar, depo rolleri (Read, Triage, Write, Maintain, Admin), temel yetki
  (base permission), dış katkıcılar ve görünürlük katmanlarından çıkarıp en az yetkiye göre yeniden
  tasarlayabilir; sahiplik sürekliliğini ve 2FA zorunluluğunun yan etkilerini değişiklikten önce
  söyleyebilir.
- **Önkoşul:** 4 (güvenli varsayılan), 9. **Kavramlar:** katmanlı rol modeli (organizasyon → takım
  → depo; daha yüksek erişim temel yetkiyi geçersiz kılar); dış katkıcı ve deploy anahtarı;
  sahiplik sürekliliği.
- **Senaryo:** kurgusal `ornek-sirket`: temel yetki herkese "Write", taşeron ekip dış katkıcı, tek
  owner; yeni ekip üyesi ve ayrılan taşeron.
- **Düzeltilecek yanlış model:** "Kullanıcıyı organizasyondan çıkarmak erişimi bitirir" (deploy
  anahtarı organizasyondan çıkarılan kişiye de erişim verir; token ve özel depo çatalları ayrıca
  incelenir); "2FA zorunluluğu bir onay kutusudur".
- **Karar:** temel yetki en düşük işlevsel düzeyde; erişim takım üzerinden; en az iki owner; 2FA
  zorunluluğundan önce uyumsuzların listesi ve duyuru. Ekim 2026 itibarıyla GitHub Docs'a göre
  zorunlulukta 2FA'sız üyeler ve fatura yöneticileri üyeliklerini korur ama kaynaklara erişemez; dış
  katkıcılar çıkarılır ve üç ay içinde 2FA açarlarsa geri alınabilir; dış katkıcı olan bot ve servis
  hesapları da çıkarılır.
- **Özellik / negatif test:** her depo için doğrudan, takım ve temel yetki kaynaklı erişimin listesi
  (salt okunur erişim incelemesi); test organizasyonunda temel yetki düşürülünce bir otomasyonun
  kırılıp kırılmadığı.
- **Kalan risk:** owner'lar her depoda yöneticidir; bir owner hesabının ele geçirilmesi bütün
  organizasyondur.
- **Yönetici vakası:** yeni ekip üyesi erişimi; taşeron offboarding (13 ile birlikte: token, deploy
  anahtarı); yanlış yetki.
- **Kendi organizasyonunda:** salt okunur denetim (People, Teams, temel yetki ayarı, dış katkıcı
  listesi, 2FA durumu) ve ayrı "öneri" adımları (`SOZLESME.md` §3).
- **Plan koşulları (Ekim 2026):** özel organizasyon ve özel depo rolleri yalnızca Enterprise Cloud;
  SAML SSO Enterprise; 2FA zorunluluğu Free, Team ve Enterprise'da (yönetilen kullanıcılı kurumsal
  hesapta yok).
- **Kaynaklar:** GitHub Docs "Roles in an organization", "Repository roles for an organization",
  "Setting base permissions for an organization", "Adding outside collaborators to repositories in
  your organization", "Maintaining ownership continuity for your organization", "Requiring
  two-factor authentication in your organization"; OWASP Top 10 CI/CD Security Risks (CICD-SEC-2);
  NIST SP 800-218 v1.1 PS.1.1; Top 10:2025 A01.
- **Geri çağırma:** 4 (güvenli varsayılan: temel yetki); 3 (organizasyon üyeliği ile depo erişimi ayrı
  sınırlardır).
- **Köprü:** → 12 (erişimi olan biri bile neyi yapamaz: kurallar).

### 12. Kuralı Platforma Yazmak: Ruleset, Dal Koruması ve Bypass

- **Hedef:** Okur, dal korumasını ve ruleset'leri (katmanlanma: aynı kuralın en kısıtlayıcı biçimi
  geçerli), gerekli PR/inceleme/kontrol, zorla push ve silme engeli, imzalı commit ve doğrusal
  geçmiş kurallarını bir politika olarak tasarlayıp bypass listesini en dar tutabilir; politika
  değişikliğinin otomasyon ve acil durum üzerindeki yan etkisini ve denetim kaydında nasıl
  izleneceğini söyleyebilir.
- **Önkoşul:** 8, 9, 11. **Kavramlar:** ruleset katmanlanması; bypass ve acil durum yolu; denetim
  kaydı (audit log).
- **Senaryo:** yöneticinin dal korumasından varsayılan olarak muaf olduğu bir depoda `main`'e doğrudan
  push; bir sürüm etiketinin taşınması; geniş bir bypass listesi; 180 günlük denetim kaydında bir
  olayın izini sürmek.
- **Düzeltilecek yanlış model:** "Admin olduğum için kurala gerek yok"; "dal koruması etiketleri de
  korur"; "bypass listesi kimseye zarar vermez".
- **Karar:** `main` ve sürüm etiketleri için ruleset; bypass yalnızca tanımlı bir acil durum rolüne ya
  da uygulamasına; değişiklik önce test deposunda, sonra kademeli; bypass ve kural değişikliği
  olaylarının denetim kaydında düzenli incelenmesi.
- **Özellik / negatif test:** test deposunda zorla push ve silmenin reddi; onaysız birleştirmenin
  reddi; bypass kullanımının denetim kaydında görünmesi.
- **Kalan risk:** kuralı değiştirebilen hesap kuralın kendisidir; denetim kaydı 180 günü kapsar ve
  yalnızca owner'lar görür; dolaylı birleştirme.
- **Yönetici vakası:** yanlış bypass; yanlışlıkla `main`'e push'un önlenmesi; acil hotfix'in bypass'sız
  yolu.
- **Kendi organizasyonunda:** salt okunur denetim (ruleset listesi okuma yetkisi olan herkese açık, dal
  koruma ayarları, denetim kaydı araması) ve ayrı "öneri" adımları.
- **Plan koşulları (Ekim 2026; kaynak içi tutarsızlık `ARASTIRMA.md` §10):** ruleset'ler herkese açık
  depolarda Free ile, özel depolarda Pro, Team ve Enterprise Cloud ile; organizasyon düzeyi ruleset
  bir sayfada "Team ya da Enterprise", ötekinde "Enterprise" diye geçiyor; push ruleset'leri Team'de
  özel ve iç depolarda; denetim kaydı API'si Enterprise Cloud'da.
- **Kaynaklar:** GitHub Docs "About rulesets", "Available rules for rulesets", "Creating rulesets for
  repositories in your organization", "About protected branches", "Reviewing the audit log for your
  organization", "Pull request merges" (dolaylı birleştirme); OWASP Top 10 CI/CD Security Risks
  (CICD-SEC-1, CICD-SEC-10); Top 10:2025 A03.
- **Geri çağırma:** 8 (zorla push ve kurtarma); 2 (kuralı uygulayan sistem hata verirse fail-closed
  mı?).
- **Köprü:** → 13 (insan olmayan kimlikler: token, uygulama, iş akışı).

### 13. Makine Kimlikleri ve Actions: Token, GitHub App ve İş Akışı Güvenliği

- **Hedef:** Okur, kişisel erişim token'larını (klasik ve ince taneli), GitHub App ve OAuth uygulaması
  erişimini, deploy anahtarlarını, depo/organizasyon/ortam sırlarını ve `GITHUB_TOKEN` yetkilerini
  bir makine kimliği envanteri olarak modelleyip en az yetki ve kısa ömre göre karar verebilir;
  üçüncü taraf action'ları tam commit SHA'sıyla sabitleyip ayrıcalıklı tetikleyici
  (`pull_request_target`, `workflow_run`) ve betik enjeksiyonu risklerini teşhis edebilir; sızan bir
  sırrın müdahale sırasını bilir (önce iptal ve rotasyon, sonra geçmiş).
- **Önkoşul:** 2, 11, 12. **Kavramlar:** makine kimliği ve token kapsamı/ömrü; ayrıcalıklı iş akışı
  tetikleyicisi; action sabitleme.
- **Senaryo:** bir action'ın etiketi başka bir commit'e taşınır; fork'tan gelen PR'ın başlığı bir
  kabuk adımında çalışır; bir PAT bir log'a sızar; ayrılan bir çalışanın deploy anahtarı hâlâ
  geçerlidir.
- **Düzeltilecek yanlış model:** "Action'ı `@v4` ile sabitledim"; "`GITHUB_TOKEN` zaten sınırlı";
  "sızan sırrı geçmişten silmek yeter".
- **Karar:** organizasyon token politikası (klasik token kısıtı, ince taneli token onayı ve azami
  ömür); mümkünse GitHub App; iş akışında varsayılan salt okuma `permissions`; buluta OIDC; action'lar
  tam SHA ile; ayrıcalıklı tetikleyicide güvenilmeyen kod check-out edilmez; sızıntıda önce iptal ve
  rotasyon.
- **Özellik / negatif test:** `permissions` bildirmeyen iş akışını yakalayan bir kontrol; SHA ile
  sabitlenmemiş `uses:` satırını arayan statik kontrol; test token'ıyla sızıntı tatbikatı.
- **Kalan risk:** depoya yazma erişimi olan herkes depoda tanımlı sırları okuyabilir (GitHub Docs);
  kendi barındırılan runner kalıcı olarak ele geçirilebilir; geçmiş yeniden yazılsa da klonlar ve
  çatallar kopyayı tutar.
- **Yönetici vakası:** sızdırılmış secret; kötü niyetli ya da bozuk action; taşeron offboarding'in
  token ve anahtar tarafı.
- **Plan koşulları (Ekim 2026):** depo/organizasyon düzeyi push protection GitHub Secret Protection
  gerektirir; kullanıcı düzeyindeki push protection herkese açık depolara push'ta varsayılan açık;
  ince taneli token onayı organizasyonda varsayılan olarak açık, klasik token'lar ancak kısıtlanırsa
  engellenir.
- **Kaynaklar:** GitHub Docs "Managing programmatic access to your organization", "Setting a personal
  access token policy for your organization", "About OAuth app access restrictions", Actions "Secure
  use reference", "About push protection", "Removing sensitive data from a repository", "Repository
  roles for an organization" (deploy anahtarı uyarısı); OWASP Top 10 CI/CD Security Risks
  (CICD-SEC-4, CICD-SEC-6, CICD-SEC-8); Top 10:2025 A03, A08.
- **Geri çağırma:** 2 (token doğrulaması yanıt vermezse fail-closed); 12 (kural ve bypass).
- **Köprü:** → 14 (kimliğin yaşam döngüsü, bu kez uygulamanın kendi kullanıcıları için).

### 14. Kimlik Doğrulama ve Oturum: Kimliğin Yaşam Döngüsü

- **Hedef:** Okur, kimliğin kayıt, doğrulama, oturum, yenileme, iptal ve kurtarma aşamalarındaki
  güven varsayımlarını sıralayıp her biri için doğrulanabilir özellik ve negatif test kurabilir.
- **Önkoşul:** 2, 3, 4; 11 ve 13 önerilir. **Kavramlar:** oturum yaşam döngüsü; kimlik bilgisi
  doldurma (credential stuffing); kendi içinde doğrulanan belirteç ile durumlu oturum ödünleşimi.
- **Senaryo:** parola + ikinci faktörlü web girişi, mobil istemci için JWT, parola kurtarma akışı,
  çıkış sonrası belirteç. **Kırılan varsayım:** "JWT imzalıysa yeter; çıkış istemcide silmektir."
- **Kaynaklar (üretimde):** A07:2025; API2:2023; ASVS 5.0.0 V6, V7, V9 (gerekirse V10); NIST SP
  800-63B'nin güncel sürümü; Authentication, Session Management, Password Storage Cheat Sheets;
  WSTG v4.2 ATHN/SESS.
- **Geri çağırma:** 2 (kimlik sağlayıcı hatasında fail-closed); 4 (çerez varsayılanları); 11 (2FA
  zorunluluğunun yan etkisi); 13 (token bir kimlik bilgisidir: kapsam, ömür, iptal).

### 15. Yetkilendirme: Nesne, Kiracı ve İşlev Düzeyinde Karar

- **Hedef:** Okur, yetki kararının nerede verileceğini ve uygulanacağını, nesne ve kiracı düzeyinde
  nasıl zorunlu kılınacağını ve iki kullanıcılı/iki kiracılı negatif testlerle nasıl
  kanıtlanacağını tasarlayabilir.
- **Önkoşul:** 1, 2, 3, 14. **Kavramlar:** IDOR/BOLA; kiracı izolasyonu; politika uygulama noktası
  ile karar noktası ve kimlik yayılımı.
- **Senaryo:** çok kiracılı fatura API'si, toplu dışa aktarma işi, yönetici uç noktası.
  **Kırılan varsayım:** "UUID tahmin edilemez, yetki kontrolüne gerek yok."
- **Kaynaklar (üretimde):** A01:2025; API1/API5:2023; ASVS v5.0.0-8.1.1, 8.2.1, 8.2.2, 8.3.1,
  8.3.3, 8.4.1; WSTG-ATHZ-01…04 (v4.2); Authorization ve IDOR Prevention Cheat Sheets.
- **Geri çağırma:** 1'in A01 örneği; 2'nin karar önbelleği ↔ anında iptal gerilimi (8.3.2); 11'in
  katmanlı rol modeli (organizasyon, takım, depo) uygulamanın kendi rol modeliyle karşılaştırılır.

### 16. API Yüzeyi: Alan Düzeyi Yetki, Hassas İş Akışları ve Kaynak Tüketimi

- **Hedef:** Okur, API'nin yetki sorusunu alan düzeyine, iş akışı düzeyine ve maliyet düzeyine
  genişletip her biri için sınır ve negatif test tanımlayabilir.
- **Önkoşul:** 15. **Kavramlar:** BOPLA (aşırı veri ifşası + toplu atama); hassas iş akışı; kaynak
  tüketimi sınırları.
- **Senaryo:** profil güncellemede `role` alanı, bilet rezervasyonunda otomasyon, ücretli SMS kodu,
  derin GraphQL sorgusu.
- **Kaynaklar (üretimde):** API3/API4/API6:2023; ASVS 5.0.0 8.1.2, 8.2.3, V2, V4; Mass Assignment
  ve Denial of Service Cheat Sheets; Top 10:2025 X01.
- **Geri çağırma:** 15'in nesne düzeyi; 2'deki "hiçbir şey sınırsız olmamalı" ilkesi.

### 17. İş Mantığı ve Eşzamanlılık: Durum Makinesini Saldırgan Gözüyle Okumak

- **Hedef:** Okur, bir iş akışını durum makinesi olarak yazıp yarış koşulu, adım atlama ve tekrar
  oynatma risklerini bulabilir; idempotency, koşullu güncelleme ve kilitlemeyle kapatıp eşzamanlı
  negatif testle doğrulayabilir.
- **Önkoşul:** 2, 15, 16. **Kavramlar:** kontrol zamanı/kullanım zamanı (TOCTOU); idempotency;
  durum makinesi değişmezi.
- **Senaryo:** kupon ve bakiye kullanımı; eşzamanlı istekle limit aşımı; ödeme adımını atlama.
- **Kaynaklar (üretimde):** ASVS 5.0.0 V2; WSTG v4.2 iş mantığı testleri; CWE-362, CWE-841;
  A06:2025; durum makinesi yarışlarına dair birincil araştırma (doğrulanacak).
- **Geri çağırma:** 2'nin atomikliği; 15'in nesne yetkisi.

### 18. Enjeksiyon: Verinin Koda Dönüştüğü Sınır

- **Hedef:** Okur, bir yorumlayıcıya giden her yolda veri ile komutun ayrılıp ayrılmadığını teşhis
  edip parametreleştirme, bağlama uygun kodlama ve allowlist kararını gerekçelendirir ve negatif
  test yazar.
- **Önkoşul:** 3. **Kavramlar:** yorumlayıcı sınırı; parametreleştirme ile kaçış ayrımı; bağlam.
- **Senaryo:** dinamik sıralama alanı (parametrelenemeyen kısım), dışa aktarma için kabuk komutu,
  e-posta şablonunda sunucu tarafı şablon enjeksiyonu.
- **Kaynaklar (üretimde):** A05:2025; ASVS 5.0.0 V1; Injection Prevention ve Query Parameterization
  Cheat Sheets; WSTG v4.2 INPV; CWE-89, 78, 1336.
- **Geri çağırma:** 2 (hata mesajının keşif değeri); 3 (sınır); 13 (iş akışında betik enjeksiyonu
  aynı sınırın CI'daki örneğidir).

### 19. Tarayıcının Güven Modeli: XSS, CSP, CSRF ve CORS

- **Hedef:** Okur, aynı köken politikası etrafında XSS, CSRF ve CORS'un hangi güven varsayımını
  kırdığını ayırt edip bağlama uygun kodlama, CSP, SameSite ve CORS kararlarını test edilebilir
  biçimde verebilir.
- **Önkoşul:** 14, 18. **Kavramlar:** aynı köken politikası; bağlama göre çıktı kodlama; kimlik
  bilgili çapraz köken istekleri.
- **Kaynaklar (üretimde):** A05:2025, A01:2025; ASVS 5.0.0 V3; XSS, CSRF ve Content Security
  Policy Cheat Sheets; W3C CSP ve Fetch belirtimleri; Proactive Controls 2024 C8.
- **Geri çağırma:** 14 (oturum çerezi); 18 (bağlam).

### 20. SSRF ve Çıkış Trafiği: Sunucu Adına Yapılan İstekler

- **Hedef:** Okur, sunucunun dışarı istek yaptığı her özelliği bir güven sınırı geçişi olarak
  modelleyip URL ayrıştırma, DNS ve yönlendirme tuzaklarına karşı allowlist ve ağ katmanı çıkış
  denetimiyle savunur ve test eder.
- **Önkoşul:** 3, 15. **Kavramlar:** SSRF; çıkış denetimi; karışık vekil (confused deputy).
- **Kaynaklar (üretimde):** A01:2025 (SSRF bu edisyonda A01'e katıldı); API7:2023; SSRF Prevention
  Cheat Sheet; Proactive Controls 2024 C10; WSTG v4.2 INPV-19; bulut üst veri servisi belgeleri.
- **Geri çağırma:** 2 (çözümleme hatasında fail-closed); 15 (kimlik yayılımı).

### 21. Kriptografik Kararlar ve Anahtar Yaşam Döngüsü

- **Hedef:** Okur, kriptografi kararını "neyi, neye karşı, hangi anahtarla" sorularıyla tehdit
  modeline bağlayıp algoritma seçimini kütüphaneye, anahtar yönetimini operasyona bağlayan
  doğrulanabilir gereksinimler yazabilir.
- **Önkoşul:** 4, 14. **Kavramlar:** kimlik doğrulamalı şifreleme; anahtar yaşam döngüsü; parola
  saklamada yavaş anahtar türetme.
- **Kaynaklar (üretimde):** A04:2025; ASVS 5.0.0 V11 + Ek C; NIST SP 800-57 Bölüm 1'in güncel
  sürümü; Cryptographic Storage, Password Storage, Key Management, Secrets Management Cheat Sheets.
- **Geri çağırma:** 4 (sır yapılandırması); 14 (parola saklama); 13 (token ömrü ve rotasyonu); 5
  (içerik özeti bütünlüğü gösterir, kimliği göstermez → imza).

### 22. Tedarik Zinciri ve Yapı Bütünlüğü: Bağımlılıktan Dağıtıma

- **Hedef:** Okur, bağımlılık, yapı ve dağıtım hattını bir güven sınırları dizisi olarak modelleyip
  sürüm sabitleme, bütünlük doğrulama, yapı kökeni ve imzayla A03/A08 risklerini azaltan kontrolleri
  ve kanıtlarını tanımlayabilir. CI kimliği ve Actions sertleştirmesi 13'te kuruldu; bu yazı
  bağımlılık, yapı kökeni ve imzaya odaklanır.
- **Önkoşul:** 3, 10, 13, 15, 21. **Kavramlar:** yapı kökeni (provenance); yazılım malzeme listesi
  (SBOM); imza ve doğrulama zinciri.
- **Kaynaklar (üretimde):** A03:2025, A08:2025; NIST SP 800-218 v1.1 (ve Rev. 1'in durumu); SLSA'nın
  güncel sürümü; CI/CD Security ve Deserialization Cheat Sheets; GitHub Docs "Immutable releases"
  (sürüm tasdiki).
- **Geri çağırma:** 3 (CI bir güven sınırıdır); 21 (imza anahtarı); 13 (action sabitleme); 10
  (değişmez sürüm ve SHA izlenebilirliği).

### 23. Güvenlik Kaydı, Uyarı ve Olay Müdahalesi

- **Hedef:** Okur, hangi güvenlik olayının nasıl kaydedileceğini, hangisinin uyarıya dönüşeceğini
  ve uyarının müdahale adımına nasıl bağlanacağını tasarlar; beklenen sinyalin yokluğunu da alarm
  sayar.
- **Önkoşul:** 2, 15, 17. **Kavramlar:** güvenlik olayı kaydı ile hata kaydı; uyarı tasarımı;
  kayıt enjeksiyonu ve kayıttaki hassas veri.
- **Kaynaklar (üretimde):** A09:2025; ASVS v5.0.0 V16.1–16.4; Logging ve Logging Vocabulary Cheat
  Sheets; NIST SP 800-61'in güncel sürümü.
- **Geri çağırma:** 2 ("karar alınamadı" sayacı); 15 (yetki reddi kaydı); 12 (platform denetim
  kaydının sınırı: 180 gün, yalnızca owner'lar); 13 (sızan sır müdahalesi).

### 24. Güvenlik Testi ve Sürüm Kapıları: Kanıt Üreten Bir Hat

- **Hedef:** Okur, ASVS seviyesine bağlı bir doğrulama planı kurup hangi gereksinimin hangi test
  türüyle kanıtlanacağını ve sürüm kapısının neyi durdurup neyi raporlayacağını belirler.
- **Önkoşul:** 1, 2, 15, 23. **Kavramlar:** gereksinim tabanlı test; engelleyici ve bilgilendirici
  kapı; kanıtın kapsamı.
- **Kaynaklar (üretimde):** WSTG v4.2; ASVS 5.0.0 (seviyeler, çatallama); NIST SP 800-218 v1.1
  PW.7, PW.8, RV.1; SAMM v2 Verification; Top 10:2025 X03; Secure Code Review Cheat Sheet.
- **Geri çağırma:** 1'in "Top 10 temiz" iddiası (kapanış); 2'nin hata matrisi; 15'in iki kullanıcılı
  testi; 9'un gerekli kontrolü ve birleştirme kuyruğu (kapının platformdaki yeri).

### 25. Bütünleşik Vaka: Bir Özelliği Tehdit Modelinden Üretime Taşımak

- **Hedef:** Okur, yeni bir özelliği (ör. dış ortaklara anahtarla veri dışa aktaran bir API) tehdit
  modeli, gereksinim seçimi, tasarım, kontroller, test planı, değişikliğin depodan dağıtıma yolu (PR,
  kural, sürüm), gözlem ve kalan riskin kabulüyle uçtan uca kurgular; yolda çıkan bir organizasyon
  olayına (ör. PR'a sızmış bir token ya da yanlış verilmiş bir bypass) kanıttan karara müdahale eder.
- **Önkoşul:** hepsi. **Kaynaklar (üretimde):** seri boyunca kullanılanlardan seçilmiş; SAMM v2;
  Top 10:2025 "Establishing a Modern Application Security Program".
- **Geri çağırma:** serinin bütün ilkeleri, iki eksen birlikte, yeni bağlamda.

## Yönetici vakaları (Git/GitHub hattı)

Kullanıcının saydığı gerçek yönetim kararları ayrı bir yazı yerine öğrenildikleri yazıda vaka olarak
işlenir (`SOZLESME.md` §4: gözlem ve kanıt → seçenekler → güvenli karar → kalan risk). Sentez (25)
birkaçını zaman baskısı altında birleştirir.

| Vaka | Yazı |
|---|---|
| Yeni ekip üyesine erişim | 11 |
| Taşeronun ayrılması (offboarding) | 11 (üyelik, dış katkıcı), 13 (token, deploy anahtarı) |
| Yanlışlıkla `main`'e push | 8 (geri alma), 12 (önleme) |
| Çakışan uzun yaşayan dal | 7 |
| Silinen dal | 8 |
| Sızdırılmış secret | 13 (+ 23 müdahale) |
| Kötü niyetli ya da bozuk action | 13 |
| Başarısız dağıtım | 10 |
| Acil hotfix | 10 (akış), 12 (bypass'sız yol) |
| Yanlış bypass | 12 |
| Yanlış yetki | 11 |

## Yayımlanmış sözlerin yeni plandaki karşılığı

- Yazı 1: "Bu seride her yazı bir güven sınırı arayacak." → Git/GitHub yazılarında da Karar kartının
  "Güven sınırı" maddesi zorunludur ve bir durum sınırı olarak yazılır (`SOZLESME.md` §1, §4).
- Yazı 1: belge rolleri tablosu "serinin her yazıda kullanacağı ayrım" → Git/GitHub yazılarında kaynak
  rolleri aynı mantıkla ayrılır: risk farkındalığı (A03:2025, OWASP CI/CD Top 10), program (SSDF
  PS), davranış (Git başvuru kılavuzu), açıklama (Pro Git), ürün ve plan (GitHub Docs).
- Yazı 1: "bir kategoriye hep edisyonuyla birlikte gönderme" → A03:2025 gibi yazılır.
- Yazı 2: "karar alınamadı" terimi korunur; 12 ve 13'te kuralın ya da token doğrulamasının hata
  yolunda yeniden kullanılır.

## Terim defteri

İlk geçişte Türkçe + İngilizce; sonra yalnızca Türkçe biçim. "İngilizce kalır" işaretli terimler
ilk geçişte Türkçe açıklanır, gloss verilmez.

| Türkçe biçim | İngilizce | Kuran yazı | Not |
|---|---|---|---|
| farkındalık belgesi | awareness document | 1 | OWASP'ın Top 10 için kendi tanımı |
| yaygınlık oranı | incidence rate | 1 | en az bir örneği bulunan uygulamaların, test edilenlere oranı |
| test kapsamı | (testing) coverage | 1 | bir CWE için test edilmiş uygulamaların oranı; "kapsama" yalnızca bu anlamda |
| sıklık | frequency | 1 | bir uygulamadaki örnek sayısı; Top 10 hesabına girmez |
| zayıflık | weakness (CWE) | 1 | |
| kök neden / belirti | root cause / symptom | 1 | |
| doğrulanabilir gereksinim | verifiable requirement | 1 | ASVS'nin geçti/kaldı kararı veren maddesi |
| doğrulama seviyesi | verification level (L1–L3) | 1 | |
| güven sınırı | trust boundary | 1 | serinin merkez terimi; 3'te biçimsel olarak kurulur |
| CWE / CVE / CVSS / NVD | Common Weakness Enumeration / Common Vulnerabilities and Exposures / Common Vulnerability Scoring System / National Vulnerability Database | 1 | kısaltmalar İngilizce kalır; 1'de açıldı |
| IDOR / BOLA | insecure direct object reference / broken object level authorization | 1 | İngilizce kalır; 1'de kısa açıklandı, yetkilendirme yazısında derinleşir |
| SSRF / CSRF | sunucu taraflı / siteler arası istek sahteciliği | 1 | İngilizce kısaltma + Türkçe ad; SSRF yazısında derinleşir |
| istisnai durumların yanlış ele alınması | Mishandling of Exceptional Conditions | 2 | A10:2025'in adı |
| güvenli başarısız olmamak | Not Failing Securely ('Failing Open'), CWE-636 | 2 | |
| fail-open / fail-closed | — | 1 (geçerken), 2 (tanım) | İngilizce kalır; "hata anında izin verici / kısıtlayıcı duruma düşme" |
| izin / ret / karar alınamadı | allow / deny / (indeterminate) | 2 | "karar alınamadı" ret değildir; 503 ve ayrı sayaç |
| son çare hata işleyicisi | last resort error handler | 2 | ASVS 16.5.4'ün terimi |
| kısmi başarısızlık | partial failure | 2 | |
| giden kutusu | outbox | 2 | işlemle birlikte yazılan olay tablosu |
| eşgüçlü | idempotent | 2 | iş mantığı yazısında yeniden glossla değil, derinleştirerek kullanılır |
| Problem Details | — | 2 | RFC 9457; İngilizce kalır |
| korelasyon kimliği | correlation id | 2 | |
| hata enjeksiyonu | fault injection | 2 | testte bağımlılığa bilerek hata verdirmek |
| devre kesici | circuit breaker | 2 | |
| kontrollü bozulma | graceful degradation | 2 | "zarif" kullanılmaz (kalıp listesindeki dramatik sıfatla karışır) |
| kabul denetimi kancası | admission webhook | 2 | Kubernetes bağlamı |
| tehdit modelleme | threat modeling | 3 | 1 ve 2'de geçerken anıldı, 3'te tanımlandı |
| güven sınırı ihlali | trust boundary violation (CWE-501) | 3 | güvenilen ve güvenilmeyen verinin aynı yapıda karışması |
| güvensiz tasarım | Insecure Design | 3 | A06:2025'in adı |
| veri akış diyagramı | data flow diagram, DFD | 3 | |
| dış varlık / süreç / veri deposu / veri akışı | external entity / process / data store / data flow | 3 | DFD öğeleri |
| kimlik sahteciliği / kurcalama / inkâr / bilgi ifşası / hizmet reddi / yetki yükseltme | spoofing / tampering / repudiation / information disclosure / denial of service / elevation of privilege | 3 | STRIDE İngilizce kalır; tablolarda İngilizce baş harfler (S, T, R, I, D, E) |
| imzalı yükleme adresi | presigned URL | 3 | |
| zehirli mesaj | poison message | 3 | |
| sihirli bayt | magic bytes | 3 | dosya biçimi imzası |
| sıkıştırma bombası | decompression bomb (CWE-409) | 3 | |
| piksel seli | pixel flood | 3 | |
| yol geçişi | path traversal (CWE-22) | 3 | |
| tehlikeli işlev | dangerous functionality | 3 | ASVS 5.0.0 V15'in terimi |
| yalıtılmış ortam | sandbox | 3 | "kum havuzu" kullanılmaz |
| en az yetki | least privilege | 3 | |
| ölü mektup kuyruğu | dead-letter queue | 3 | |
| nesne deposu / depolama | object storage | 3 | "depo" tek başına kod deposu demektir (karar #24) |
| güvenlik yapılandırma hatası | Security Misconfiguration | 4 | A02:2025'in adı |
| güvenli varsayılan | secure by default | 4 | |
| kod deposu | repository | 4 | Git hattında "depo" bu anlamda kullanılır |
| XXE | XML External Entity | 4 | İngilizce kısaltma kalır |
| yapılandırma kayması | configuration drift | 4 | |
| saldırı yüzeyi envanteri | attack surface inventory | 4 | |
| dal | branch | 4 (geçerken), 5 (tanım) | 4'ün "Sırada ne var" bölümünde gloss'landı; 5 parantezli gloss'u tekrar etmez |

### Planlanan terim kararları (Git/GitHub hattı)

Henüz yayımlanmadı; ilgili yazı yayımlandığında satır yukarıdaki deftere "kuran yazı" ile taşınır.
Yayımlanmış yazılarla tutarlılık: release için "sürüm" (sürüm adayı, sürüm notu, sürüm kapısı),
deploy için "dağıtım" (karar #21).

| Türkçe biçim | İngilizce | İlk kullanacak yazı | Not |
|---|---|---|---|
| commit | commit | 5 | İngilizce kalır; "anlık görüntü + ebeveyn + üst veri" diye açıklanır |
| commit kimliği / içerik özeti | object id / hash | 5 | SHA-1 (isteğe bağlı SHA-256) |
| HEAD / ayrık HEAD | HEAD / detached HEAD | 5 / 8 | HEAD İngilizce kalır |
| çalışma ağacı | working tree | 5 | |
| hazırlık alanı | staging area (index) | 5 | "index" Git'in teknik adı olarak bir kez anılır |
| varsayılan dal | default branch | 5 | `main` ve `master` yalnızca ad |
| uzak depo | remote | 6 | `origin` adıyla |
| uzak izleme dalı | remote-tracking branch | 6 | `origin/main` |
| yukarı akış dalı | upstream branch | 6 | |
| ileri sarma | fast-forward | 6 | |
| ıraksama | divergence | 6 | ahead/behind İngilizce çıktı olarak gösterilir |
| birleştirme / birleştirme tabanı | merge / merge base | 7 | komut adı `merge` |
| rebase / squash | rebase / squash | 7 | İngilizce kalır |
| geri döndürme / geri sarma | revert / reset | 8 | ikisi karıştırılmaz |
| zorla push | force push | 8 | |
| PR | pull request | 9 | İngilizce kısaltma; "çekme isteği" kullanılmaz |
| kod sahibi | code owner (CODEOWNERS) | 9 | |
| gerekli kontrol | required status check | 9 | |
| birleştirme kuyruğu | merge queue | 9 | |
| etiket | tag | 10 | |
| GitHub Release / değişmez sürüm | GitHub Release / immutable release | 10 | ürün nesnesi adıyla |
| sürüm / dağıtım | release / deploy | 10 | yayımlanmış yazılarla aynı; "yayın" kullanılmaz |
| temel yetki | base permission | 11 | |
| dış katkıcı | outside collaborator | 11 | |
| sahiplik sürekliliği | ownership continuity | 11 | |
| ruleset / dal koruması | ruleset / branch protection | 12 | ruleset İngilizce kalır |
| bypass | bypass | 12 | İngilizce kalır; "kural dışı geçiş izni" diye açıklanır |
| denetim kaydı | audit log | 12 | |
| kişisel erişim token'ı | personal access token (PAT) | 13 | |
| makine kimliği | machine identity | 13 | |
| sır | secret | 13 | "Sırlar ve Bütünlük" fazıyla aynı sözcük |

## Geri çağırma defteri (planlı)

| İlke | Kuran | Planlı geri çağırma |
|---|---|---|
| Liste ≠ gereksinim; belge rolleri | 1 | 2 (uygulanır), 9, 11 (kaynak rolleri), 24 (kapanış) |
| Kanıt kapsadığı kadar konuşur | 1 | 6 (`fetch`'siz "behind 0"), 9 (yeşil PR kontrolü), 24 |
| Kategori = CWE kümesi; bulgu CWE ve sürümlü ASVS kimliğiyle raporlanır | 1 | 15, 24 |
| Yalnızca açık izin geçer; hata yolunda fail-closed | 2 | 12, 13, 14, 15, 20, 23, 25 |
| Ret ≠ karar alınamadı (403/503, ayrı sinyal) | 2 | 15, 23 |
| Kısmi başarısızlıkta işlemin tamamı geri alınır | 2 | 8 (`--abort`), 10 (yarım dağıtım), 17 |
| Güven sınırında doğrula, yetkilendir, sınırla | 3 | 9, 15, 18, 20, 22, 25 |
| Güvenli varsayılan | 4 | 11 (temel yetki), 13 (`GITHUB_TOKEN`), 14, 21 |
| Sınırın yerini ağ değil, verinin kökeni ve vardığı sürecin yetkisi belirler | 3 | 9 (inceleme), 13 (iş akışında güvenilmeyen girdi), 18, 20, 25 |
| Eksik değer güvenli tarafa düşer; bilinmeyen değer süreci başlatmaz | 4 | 11 (temel yetki), 12 (kural tanımsızken), 13, 21 |
| Değişiklik incelenen yoldan gelir; incelemesiz yol kayma doğurur | 4 | 9 (PR ve koruma), 10 (aynı yapı, iki ortam), 12 (bypass), 22 |
| Dal bir işaretçidir; değişikliğin yeri grafikle kanıtlanır | 5 | 6, 7, 8, 10 |
| Paylaşılmış geçmiş yeniden yazılmaz; geri almak yeni commit'tir | 7, 8 | 10, 12, 13 |
| En az yetki ve sahiplik sürekliliği | 11 | 13, 15 |

## İleri işaret defteri

Yayımlanmış gövdelerde konu adıyla verilmiş ileri işaretler. Numaralı vaat verilmez
(`SOZLESME.md` §3). Bir işaret karşılandığında "karşılandı" sütunu doldurulur. Revizyon
2026-10-21: işaretler konu adıyla verildiği için yeniden numaralandırma gövdeleri etkilemedi;
yalnızca karşılayacak yazının numarası güncellendi.

| Veren yazı | İşaret (gövdedeki konu) | Karşılayacak yazı | Karşılandı |
|---|---|---|---|
| 1 | "sistemin bir hata anında izin verici duruma düşmesi (fail-open), sıradaki yazının konusu" | 2 | evet (run 1) |
| 1 | 403 mü 404 mü ve kiracı sınırının hangi katmanda zorunlu kılınacağı "yetkilendirme yazısının konusu" | 15 (eski 6) | hayır |
| 2 | "bir güvenlik olayının nasıl kaydedileceği ve hangisinin uyarıya dönüşeceği, kendi yazısını hak eden ayrı bir tasarım sorusu" | 23 (eski 14) | hayır |
| 2 | "Sırada ne var": dosya yükleme hattında veri akışı ve sınırlar, tehdit modelleme | 3 | evet (run 2) |
| 3 | "Sırada ne var": aynı kodun iki ortamda farklı davranması; güvenli varsayılanlar | 4 | evet (run 2) |
| 4 | "Sırada ne var": XXE düzeltmesinin yeri, üretime giden yapının onu içerip içermediği, ana daldan önceden açılmış dalın düzeltmeyi kendiliğinden alıp almadığı; dal bir işaretçidir | 5 | hayır (sıradaki run) |

## Gerçekleşen geri çağırmalar

| Yazı | Geri çağrılan ilke (kaynak yazı) | Nasıl |
|---|---|---|
| 2 | Kapsama ile yaygınlığın ayrı okunması (1) | A10:2025 tablosunun okunması |
| 2 | "Sıfır bulgu" kanıtın kapsadığı kadar konuşur (1) | Hata matrisinin kanıtlamadığı yol |
| 3 | Güven sınırı tanımı (1) | Adı konmuş sınır CWE-501 ile biçimselleştirildi |
| 3 | Hata yolları (2) | DFD'de hata kenarı: sınırsız yeniden teslim, ölü mektup kuyruğu |
| 3 | Kısmi başarısızlık (2) | Önizleme yazılıp durum güncellenmezse ne olur |
| 3 | Fail-open (2) | "Yalıtım yanıt vermezse işçide dönüştür" geri dönüşü (Teşhis et) |
| 3 | Kanıt kapsadığı kadar konuşur; kanıt dosyası kapısı (1) | Testlerin sınırı; tehdit kaydı bir kapının girdisi |
| 4 | Genel hata yanıtı ve son çare işleyici (2) | Kararın çerçeve varsayılanına bırakılmaması |
| 4 | Olumsuz koşul: yalnızca açık ret durdurur (2) | `DEBUG_ROUTES !== "false"` |
| 4 | Fail-closed ve bedeli (2) | Açılış denetimi dağıtımı durdurur |
| 4 | Hata enjeksiyonu ile dış test birbirinin yerine geçmez (2) | İçeriden envanter testi ile dışarıdan WSTG testi |
| 4 | En az yetkili depolama politikası ve dört cevap (3) | Kayma bulgusu; ortadan kaldırmak (DTD) |
| 4 | İç ağ bir güven derecesi değildir (3) | Hazırlık ortamı farkları (Teşhis et) |

## Karar kaydı

- **#1 (2026-10-21) Ad, rota, kimlik:** "Güven Sınırı: Güvenli Yazılım Mühendisliği", `/guvenlik`,
  okuma verisi kimliği `guvenlik`. "OWASP" adı rota ya da seri adı olmadı: seri OWASP'ın yayını
  değildir ve kapsamı OWASP listelerinin ötesine geçer. (Ad #17 ile değişti.)
- **#2 (2026-10-21) 16 yazı, 7 faz:** gerekçe ve reddedilenler yukarıda (§Kapsam kararları). (Plan #15
  ve #16 ile 25 yazı, 10 faz oldu.)
- **#3 (2026-10-21) Level:** bütün yazılar `advanced`; okur kitlesi profesyonel deneyim varsayar.
- **#4 (2026-10-21) Kategori sözlüğü fazlarla örtüşür** (7 anahtar; `SOZLESME.md` §2). (#18 ile 10.)
- **#5 (2026-10-21) Araçlar:** checkpoint kutusu "Teşhis et"; kapanış "## Karar kartı" (mekanik
  kapıda başlık varlığı ve sırası).
- **#6 (2026-10-21) Uzunluk:** 2.000–3.600 düzyazı kelimesi; kod blokları sayılmaz (araç profili).
- **#7 (2026-10-21) Gönderme:** konu adıyla; gövdede numara ve numaralı ileri vaat yok.
- **#8 (2026-10-21) Kod dili:** TypeScript, SQL, HTTP; çerçeveden bağımsız; testler
  `describe/it/expect` biçiminde.
- **#9 (2026-10-21) İkinci yazı A10:2025:** A01 yetkilendirme yazısıyla örtüşeceği için seçilmedi;
  A10 2025'in yeni kategorisi ve fail-open/fail-closed kararını taşıyor.
- **#10 (2026-10-21) Platform entegrasyonu:** okuma sıfırlama ve senkronda seri kimliği
  `SERIES_IDS` listesinden türetilir; seri → katalog eşlemesi derleme zamanında kapsamlı bir
  `Record<SeriesId, …>`'dir (üç seri için sessiz yanlış eşleme engellenir); veritabanı CHECK
  kısıtı için `drizzle/0005_guvenlik_series_reset.sql` hazırlandı, canlıya uygulanmadı.
- **#11 (2026-10-21) Bilinmeyen seri sıfırlaması:** yerel kayıt ve senkron yanıtı bilinmeyen
  seri kimliğini düşürür, bütün kaydı geçersiz saymaz (eski/yeni istemci uyumu).
- **#12 (2026-10-21) Ritim:** `BATCH=2+1` (`SOZLESME.md` §7).
- **#13 (2026-10-21, run 1 `+1`) Migration tek ifade, kayma bekçisi:** `0005` tek `ALTER TABLE`
  (DROP ile ADD birlikte işlenir; runner ifadeleri ayrı koşturduğu için iki ifadede arada kısıtsız
  kalma ihtimali vardı). `src/lib/db/series-check.test.ts`, Drizzle CHECK'inin ve kısıtı tanımlayan
  en yeni migration'ın `SERIES_IDS` ile aynı listeyi taşıdığını doğrular: yerelde veritabanı
  olmadığından eksik bir genişletme ancak canlıda, okur sıfırlama yaptığında görünürdü.
- **#14 (2026-10-21, müfredat revizyonu) Git/GitHub hattı ve tezin genişlemesi:** Kullanıcı seriyi
  yalnızca OWASP ya da güvenlik mühendisliği serisi olarak tutmamayı, Git ve GitHub'ı önemli ve kendi
  içinde tutarlı bir öğrenme hattı olarak eklemeyi istedi; Git/GitHub'da gerçek bir bilgi açığı ve
  bir GitHub organizasyonunun yönetim sorumluluğu bildirdi. Tez ikinci eksenle (kaynak kod yönetimi)
  genişledi; bağ birincil kaynaklarda: Top 10:2025 A03 (kod deposu, dal koruması, CI/CD), OWASP Top
  10 CI/CD Security Risks, SSDF v1.1 PS.1–PS.3. Ayrı seri seçeneği reddedildi.
- **#15 (2026-10-21) Sayı ve tavan:** 25 = 16 güvenlik + 9 Git/GitHub. 20 tavanının istisnası
  yalnızca bu hat için ve kullanıcının açık izniyle; yeni tavan 25; herhangi bir eksene yeni yazı
  kullanıcının yeni kararını ister. 20'ye sığdırma denemesi (dört Git/GitHub yazısı) reddedildi
  (§Kapsam kararları).
- **#16 (2026-10-21) Sıra:** 1–4 yerinde kalır (2'nin bağlayıcı köprüsü ve "Güven Sınırını Görmek"
  fazının bütünlüğü); Git hattı 5–13 kesintisiz: çekirdek 5–8, ekip akışı ve teslim 9–10, organizasyon
  yönetişimi 11–13. Eski 5–16 başlıkları değişmeden 14–25 oldu. Sonraki run yine 3–4'ü üretir; 4'ün
  "Sırada ne var" köprüsü Git'in zihinsel modeline döner.
- **#17 (2026-10-21) Ad:** "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi". "Güven Sınırı"
  korunur (Git/GitHub yazılarında da durum sınırı olarak işler); rota `/guvenlik` ve okuma verisi
  kimliği `guvenlik` değişmez: URL'ler, yer imleri, sıfırlama kayıtları ve veritabanı kısıtı bu
  kimliğe bağlı.
- **#18 (2026-10-21) Kategoriler:** `version-control`, `collaboration-and-delivery`,
  `organization-governance` eklendi; 10 faz ↔ 10 kategori. Ekleme geriye uyumlu (yalnızca enum ve
  etiket).
- **#19 (2026-10-21) Git/GitHub üretim kuralları:** yerel bare `origin` + çok klonlu deney deposu;
  yalıtılmış Git yapılandırması; gerçek çıktı ve Git sürümü; komut bloğunda nerede, önkoşul, çıktı,
  değişen durum, kayıp riski ve doğrulama; GitHub özelliği plan, görünürlük ve rol koşuluyla; gerçek
  organizasyon adı ve ayarı yok, kurgusal `ornek-sirket`; okurun kendi organizasyonu için salt okunur
  denetim ve ayrı öneri (`SOZLESME.md` §3–§6).
- **#20 (2026-10-21) Yönetici vakaları dağıtıldı:** eşleme tablosu yukarıda; sentez (25) birleştirir;
  ayrı vaka yazısı reddedildi.
- **#21 (2026-10-21) "Sürüm" ve "dağıtım":** yayımlanmış yazılar release için "sürüm", deploy için
  "dağıtım" kullandı; Git/GitHub hattı bunu korur. "Yayın" release karşılığı olarak kullanılmaz;
  GitHub'ın nesnesi "GitHub Release" adıyla anılır, sürüm numarası (SemVer) ayrıca adlandırılır.
- **#22 (2026-10-21) Roadmap bütünlük testi:** `src/lib/content/series-guvenlik-roadmap.test.ts`
  tavanı (25), başlık sabitlerinin roadmap'le eşliğini, yayımlanmış yazıların sıranın başında
  durduğunu, başlıkların benzersizliğini ve katalog ↔ roadmap başlık/slug eşliğini denetler.
- **#23 (2026-10-21, run 2) Ürün sürekliliği:** 2'nin çok kiracılı belge ürünü 3'te (önizleme hattı)
  ve 4'te (aynı özelliğin sürüm öncesi yapılandırma incelemesi) sürdürüldü. Senaryolar birbirine
  konu adıyla bağlanır; okur yeni bir ürün öğrenmek yerine aynı sistemin yeni bir sınırını görür.
- **#24 (2026-10-21, run 2) "Depo" tek anlamlıdır:** `SOZLESME.md` §3 "aynı Türkçe sözcük iki kavramı
  taşımaz" kuralı gereği "depo" yalnızca kod deposu (repository) anlamında kullanılır; Git hattındaki
  "uzak depo" ve "deney deposu" da bu anlamdadır. Nesne depolaması "nesne deposu", sıfat olarak
  "depolama" diye yazılır ("depolama rolü", "depolama kimlik bilgisi"). Yazı 3 yayımlanmadan önce
  bu kurala göre düzeltildi.
- **#25 (2026-10-21, run 2) 4 → 5 köprüsü:** 4'ün "Sırada ne var" bölümü Git hattını XXE
  düzeltmesinin "nerede" olduğu sorusuyla açtı ve "dal (branch)" terimini geçerken kurdu; 5'in
  senaryosundaki güvenlik yaması bu düzeltme olarak somutlanabilir.
- **#26 (2026-10-21, run 2) Sürüme bağlı ürün davranışı tarihlenir:** 4'teki iddialar sürümle
  yazıldı ve bakım kalemidir: finalhandler 2.1.1 (Express 5.3.0) `NODE_ENV` varsayılanı; libxml2
  belgesindeki `XML_PARSE_NOENT`, `XML_PARSE_NO_XXE` (2.13'ten beri) ve `XML_PARSE_NONET` (2.15'te
  yerleşik ağ istemcisi kaldırıldı) ifadeleri; libxmljs2 0.37.0 seçenek adları; Node.js 24.14 ile
  alınan çıktılar.
- **#27 (2026-10-21, run 2) Beş sütunlu izlenebilirlik tablosu:** 3'ün tehdit → karar → gereksinim
  → test tablosu beş sütunda bırakıldı (izlenebilirlik sırası öğretici). Telefonda kendi kabında yatay kaydırır
  (okuyucunun 5+ sütun için tasarladığı son çare); masaüstü akış, sayfalı sütunlar ve tablette taşma
  yok. E2E sığma kuralının dört durumu `artifacts/guvenlik-run2/render/paged.mjs` ile doğrulandı.
