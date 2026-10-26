# "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi" — Yol Haritası

> Planın, yazı başına tasarım kaydının ve süreklilik defterlerinin sahibi bu dosyadır
> (`SOZLESME.md` §8). UI izdüşümü `content/series-guvenlik/roadmap.json`'dur; başlıklar ikisinde
> birebir aynı tutulur. **Planlanan** başlık taslaktır ve üretimden önce gerekçeyle değişebilir;
> **yayımlanmış** yazının kimliği, slug'ı, sırası ve başlığı değişmez. Kaynak kanıtı
> `ARASTIRMA.md`'de, güncel cursor `HANDOFF.md`'dedir.

Son güncelleme: 2026-10-26 (run 5: yazı 9–10 yayımlandı; "GitHub'da Ekip Akışı ve Teslim" fazı kapandı) · Plan:
**25 yazı, 10 faz** (tavan 25, karar #15) · Yayımlanan: 1–10 (ayrıntı `HANDOFF.md`)

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

- **Durum:** yayında (run 3, kohort 2) · slug `git-zihinsel-modeli-dal-bir-isaretcidir` · iki şekil
  (`dal-yalnizca-isaretci.svg`, `degisikligin-duraklari.svg`).
- **Yayımlanan biçim (run 3):** 4'ün XXE düzeltmesi (`noent` çıktı, `DOCTYPE` reddi) `main`'de; sürüm
  toplantısının üç cümlesi sınanır ("yama `main`'de" doğru; "aday `main`'den yapıldı, yamayı içerir"
  ve "dalım `main`'den açıldı, yama bende" yanlış). Deterministik deney deposu (karar #28): `825fed9`,
  `8a819d8`, `31ad836` (1.4.0 adayı), `f8db4cb` (`feature/fatura-pdf`), `85fdda1` (yama).
  `cat-file` + `hash-object` ile kimliğin içerik özeti olduğu; `.git/HEAD` ve 41 baytlık dal dosyası
  (`files` biçimi; Git 3.0'da `reftable`); `init.defaultBranch` ve GitHub varsayılan dalı ("Kendi
  organizasyonunda" kutusu: `gh repo list` salt okunur, yeniden adlandırmanın etkileri öneri);
  üç alan ve `git status --short`'un iki harfi; `--is-ancestor` 0/1/128, imajın
  `org.opencontainers.image.revision` kaydı (karar #30, #31), sürüm kapısı (1 "yama yok", 2 "karar
  alınamadı"), sığ klonda 128 ve yanlış 1 (actions/checkout v7 varsayılanı tek commit), kanıt
  merdiveni tablosu. İki "Teşhis et": revision alanında dal adı; kırılgan commit'in yokluğunu
  `!` ile soran denetim (sığ klonda fail-open, tam klonda yamalı yapıya da "kırılgan").
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

- **Durum:** yayında (run 3, kohort 2) · slug `uzak-depoyla-esitlenmek-fetch-pull-push` · iki şekil
  (`uc-an-uc-ref.svg`, `iraksama-iki-ret.svg`).
- **Yayımlanan biçim (run 3):** 5'in senaryosu iki klonla (`b` güvenlik, `a` fatura) ve yerel bare
  `origin.git` ile; aynı beş kimlik. Geliştirici toplantıdan sonra `git status`'un "up to date"
  cevabına güvenip adayı yerel `main`'den yapmayı düşünür. Üç `main` (yerel dal, uzak izleme dalı,
  uzak depodaki dal), `ls-remote`, refspec ve yukarı akış ayarı; `fetch` yalnızca `origin/main`'i
  taşır (`31ad836..85fdda1`), gelen değişikliği bütünleştirmeden okuma (`log main..origin/main`,
  `diff main...origin/main`), git-push SECURITY: dal bir okuma sınırı değildir; `pull` (`--ff-only`
  varsayılanı, kaynaklar arası fark yazıldı), ileri sarma; ıraksama (`eacea0f` yerel, `120d7b5`
  uzak), `push` "fetch first" ve `pull` 128 ile iki ret. İki "Teşhis et": `feature`'da "Already up to
  date"; `|| true` ile fetch'i yutan sürüm betiği (fail-open ve gönderilmemiş yerel commit) ve
  düzeltilmiş `aday_kimligi`. Kendi organizasyonunda kutusu yok (GitHub ayarı önerilmedi).
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

- **Durum:** yayında (run 4, kohort 3) · slug `ayrisan-gecmisi-birlestirmek-merge-rebase-squash` · iki şekil
  (`uc-son-tek-agac.svg`, `squash-sonrasi-taban.svg`).
- **Yayımlanan biçim (run 4):** 6'nın sonundan, 21 Ekim 10.30. Birleştirme tabanı `85fdda1`, üç yollu
  birleştirme; gönderilmemiş `eacea0f` rebase'le `66098e2` (tree, parent, committer değişti, patch-id aynı;
  5'in `hash-object` deneyi geri çağrıldı); `git pull --rebase`/`pull.rebase`. KDV commit'i `ad2634c`; GitHub'ın
  üç yöntemi üç deneme dalında (`08bfade`, `4f3df21`, `9f65d7a`+`b1ba17d`): üç ağaç `90c95de`, ata 0/1/1; PR
  ilk kez gloss'landı. Paylaşılmış dal "Update branch"/`gh pr update-branch` ile: rebase'li gönderim
  non-fast-forward, birleştirme commit'i `3bfd1a1`, `--is-ancestor 85fdda1` 0 (5–6'dan açık soru kapandı). Teşhis:
  "kendi tarafını seç" çatışma çözümü (`--is-ancestor` 0 ama `noent` geri geldi; `zdiff3` tabanı `31ad836`).
  Yönetici vakası (squash'tan sonra yaşayan dal): squash `ac8d84d`, devam `ec788df`, yöneticinin `y` klonunda
  `merge-tree` 1 (`add/add`), seçenekler, `rebase --onto` ile yeni dal `b2dff87`, otomatik silmenin sınırı;
  anlamsal çatışma kalan risk. "Kendi organizasyonunda" kutusu (birleştirme yöntemleri, otomatik dal silme).
- **Hedef:** Okur, ileri sarma ile birleştirme commit'i, rebase ile merge ve GitHub'daki üç PR
  birleştirme yönteminin (merge commit, squash, rebase) geçmişte ve commit kimliklerinde neyi
  değiştirdiğini grafikle açıklayıp ekip için bir güncelleme ve birleştirme politikası seçebilir;
  squash sonrası aynı dalda devam etmenin neden çatışma ürettiğini gösterebilir.
- **Önkoşul:** 6. **Kavramlar:** birleştirme tabanı (merge base) ve üç yollu birleştirme; rebase'in
  commit'leri yeniden yazması (yeni kimlik); squash'ın ata ilişkisi kurmaması.
- **Bağlayıcı köprü (run 3):** 6'nın "Sırada ne var" bölümü iki açık işi bu yazıya bıraktı: `a`
  klonunda ıraksamış `main` (`eacea0f` "belge: fatura notu" yerel, `120d7b5` "sürüm: 1.4.0 adayı 2"
  uzakta) ve yamayı (`85fdda1`) hâlâ almamış `feature/fatura-pdf` (`f8db4cb`). Deney deposu 6'nın son
  durumundan, aynı kimliklerle sürdürülebilir (karar #28). 5 de "geçmişi yeniden yazan işlemlerin neden
  yeni kimlik ürettiğini" bu yazıya bıraktı: rebase'te ebeveyn değişir, kimlik içerik özeti olduğu için
  değişir (5'in `hash-object` deneyi). 6 "anlamsal çatışma"yı kalan riskte gloss'suz andı; 7 onu kurar.
  "rebase" ve "squash" ilk kez burada Türkçe açıklanır; "birleştirme commit'i" 6'da gloss'suz geçti.
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

- **Durum:** yayında (run 4, kohort 3) · slug `kod-kaybetmeden-geri-almak` · bir şekil (`zorla-push-kira.svg`);
  komut × etki tablosu Markdown'da.
- **Yayımlanan biçim (run 4):** 22 Ekim sabahı, 7'nin son durumundan (kurulum 7'yi deneme dalları ve `y` klonu
  olmadan sıkıştırır). Üç fiil (git(1) "Reset, restore and revert"), on satırlık tablo, `--abort` ile 2'nin kısmi
  başarısızlık geri çağrısı; reset biçimleri ` M`/`MM`/` M`/temiz, `--hard` taslak satırı siler. Reflog:
  `8820cfa` günlükte, `eacea0f main@{4}`; ayrık HEAD'de XXE kanaryası `0594ea1` → `kanarya-testi`; süreler
  90/30 gün ve iki hafta. Yönetici vakası (silinen dal): `-d` squash yüzünden reddeder, `-D` kimliği bırakır,
  dalın günlüğü gider, HEAD günlüğü kalır; GitHub "Restore branch". Teşhis: `fetch && reset --hard origin/main`
  tarifi (hazırlıktaki içerik `fsck --lost-found` ile bulunur, yalnız çalışma ağacındaki bulunmaz; `--keep`).
  Zorla push: fetch first, stale info, arka plan `fetch`, remote ref updated since checkout, yalnız kirayla
  `a578de5` düştü; kurtarma `reflog show origin/...` + `cherry-pick` → `49e55e1`. Yönetici vakası (main'e
  yanlışlıkla birleştirme `4021fbd`): `--first-parent`, dolaylı birleştirme, `revert -m 1` → `a87a8cd`,
  yeniden birleştirme "Already up to date", "Reapply" `b921466`. Teşhis: geri döndürülen sızan anahtar.
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

- **Durum:** yayında (run 5, kohort 4) · slug `github-ekip-akisi-push-pr-merge-dagitim` · iki şekil
  (`iki-taraf-bes-karar.svg`, `yesil-kontrol-baska-birlesim.svg`).
- **Yayımlanan biçim (run 5):** 8'in kazalarından sonra 22 Ekim akşamı "main yalnız PR'la" kararı (4'ün "incelemesiz yol kayma
  doğurur" ilkesi geri çağrıldı); 23 Ekim'de iki PR (#41 `kdv` → `kdvGosterimi`, #42 e-arşiv satırı `kdv`'yi okuyor; #42'yi XXE
  yamasını yazan güvenlik geliştiricisi `gelistirici-b` açıyor) ayrı ayrı yeşil, birlikte `main` kırmızı. Kısa taban (karar #44):
  `5313039`, ağacı 8'in `b921466`'sının ağacı `f59542e`; akış commit'i `fd3505d` (iş akışı: `pull_request` + `merge_group` +
  `push: main`, `permissions: contents: read`, action'lar tam SHA'yla; CODEOWNERS; çalışan KDV testi). PR'ın GitHub nesnesi
  olduğu (2008 lansmanı, `git request-pull`), base/head, base ile birleştirme tabanının ayrımı, üç noktalı fark; deneme
  birleştirmesi (`refs/pull/N/merge`, `actions/checkout` varsayılanıyla; karar #45) `d2b0938`/`f7fd59b` test 0; `merge-tree` 0;
  `6b97c42`, `e97fb2e`, test 1 (`SyntaxError`). Gerekli kontrol sıkı/gevşek; birleşimi önceden sınamak: güncellenmiş #42
  `b92009d` 1, kuyruk grupları `0751329` 0 / `1e028ad` 1 (karar #46); düzeltme #43 `312b004`; doğrulanabilir özellik ağaç
  eşitliği: #42'de `baeb685` ≠ `919ba76`, #43'te `fbeb0e5` = `fbeb0e5` (karar #53). Zorunlu inceleme ayarları ve ödünleşimi, kod
  sahipliği; iki Teşhis: CODEOWNERS sırası ("ilk eşleşen kazanır" modeli), `if:` ile atlanan işin "Success" sayılması
  (`merge_group`'ta `head_ref` boş). Dal stratejisi (DORA, GitHub flow, Driessen 2020), dağıtım koruma kuralları (plan ve
  rol koşuluyla), kalan risk (dolaylı birleştirme geri çağrıldı, yönetici muafiyeti). "Kendi organizasyonunda" kutusu
  (karar #48).
- **Hedef:** Okur, Git ile GitHub'ın ayrımını (dağıtık sürüm kontrolü ↔ onun üzerinde işbirliği ve
  yönetişim platformu) ve push, PR, inceleme, birleştirme ve dağıtımın ayrı kararlar olduğunu
  açıklayabilir; PR tabanını, gerekli incelemeyi, CODEOWNERS'ı, gerekli durum kontrollerini ve
  birleştirme kuyruğunu bir değişiklik akışı olarak tasarlayıp ekip bağlamına göre dal stratejisi
  (trunk tabanlı geliştirme, GitHub flow, sürüm dalları) seçebilir.
- **Önkoşul:** 3 (inceleme bir güven sınırı kontrolüdür), 7, 8. **Kavramlar:** PR (head ve base);
  zorunlu inceleme ve kod sahipliği; gerekli kontrol ve birleştirme kuyruğu.
- **Bağlayıcı köprü (run 4):** 8'in "Sırada ne var" bölümü sordu: push, PR, inceleme, birleştirme ve dağıtım
  neden ayrı kararlardır; zorunlu inceleme, kod sahipliği, gerekli kontroller ve birleştirme kuyruğu bir
  değişikliği `main`'e hangi kanıtla taşır? 7 iki işi buraya bıraktı: PR'ın ayrıntısı ve anlamsal çatışmayı
  yakalayan, birleşmiş sonucu test eden kontrolün zorunlu kılınması. "PR (pull request)" 7'de gloss'landı; 9
  gloss'u tekrar etmez, head/base'i kurar. "Dolaylı birleştirme (indirect merge)" 8'de tanımlandı; 9 kalan
  riskte geri çağırır. 8'in iki kazası (incelenmemiş birleştirmenin `main`'e girmesi, paylaşılmış dalın zorla
  push'la yeniden yazılması) 9'un açılış motivasyonu olabilir; korunan dalın zorla push/silme engeli 12'nin
  işi (ileri işaret 8 → 12). Deney tabanı karar #42'de.
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

- **Durum:** yayında (run 5, kohort 4) · slug `surum-ve-dagitim-etiket-github-release` · iki şekil
  (`tasinan-etiket-iki-surum.svg`, `surum-dali-hotfix.svg`).
- **Yayımlanan biçim (run 5):** 23 Ekim Cuma sürüm günü ve 26 Ekim Pazartesi; "sürüm numarası / sürüm (release) / dağıtım
  (deploy)" ayrımı açıkça kuruldu. Kendi kısa tabanı (karar #44): `85a4e4e` (v1.3.0, açıklamalı), `703b5a1` (21 Ekim adayı,
  hafif v1.4.0-rc.2), `5c44797`, `06994f8`. Açıklamalı/hafif etiket, etiket nesnesi `4ba5541` → `b58fd17`, `^{}`, düz push'un
  etiketi göndermemesi ve `--follow-tags`. Yönetici vakası (başarısız dağıtım): geri dönüş = önceki yapı çıktısını özetiyle
  yeniden dağıtmak, ileri düzeltme; revert'in 1.3.0'a dönmediği (`diff --stat v1.3.0` 3 dosya); hedefe 5'in kapısı ("durdur:
  yama yok") ve davranış kanıtı (kanaryanın ikinci beklentisi; `DOCTYPE` reddi 1.3.0'da yok, bir savunma katmanı geri alınıyor);
  veri şeması ve yarım kalan dağıtım. Taşınan etiket: `tag -f` + `push --force` (`4ba5541...c608efd`), b'de düz `fetch` etiket
  hakkında sessiz, `--tags` "would clobber"; revision dağıtım kaydından tam kimlikle; "On Re-tagging"; Release artık tanık
  değil; geri koyma kirasız `--force-with-lease` "stale info", beklenen değerle kabul (8'in kuralı geri çağrıldı); a'da
  `tag -d` + `fetch origin tag`. GitHub Release, `gh release create` tuzağı ve `--verify-tag`, değişmez sürüm ve tasdik.
  SemVer bir söz; Teşhis: "en son etiket" seçen betik ve `versionsort.suffix`, düzeltmesi açıklamalı etiket denetimi. Yönetici
  vakası (acil hotfix): `release/1.4`, `cherry-pick -x` → `d4919e6`, `v1.4.1` `5064c40`, `git cherry` `-`/`+`; sürüm dalının
  da korunması (12'ye işaret). "Kendi organizasyonunda" kutusu (karar #48).
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
- **Bağlayıcı köprü (run 5):** 10'un "Sırada ne var" bölümü sordu: kim hangi depoyu neden görüp yazabiliyor, roller,
  takımlar ve temel yetki bu cevabı nasıl üretiyor, erişim en az yetkiye göre nasıl yeniden tasarlanır? 10'da etiketi
  taşıyan da geri koyan da yazma yetkisini kullandı; değişmez sürümü açmak depoda Admin ister (somut açılış malzemesi).
  9'da dal korumasını ve ruleset'i Admin'in yönettiği, kuyruğu Admin'in yapılandırıp yazma yetkisinin eklediği, onayların
  yalnızca yazma yetkisi olanlardan sayıldığı ve kod sahibinin yazma yetkisi taşıması gerektiği kuruldu; 11 rolleri bu
  kararlara bağlayabilir. "Dal koruması (branch protection)" 9'da gloss'landı, ruleset 9'da geçerken açıklandı; 11 ve 12
  gloss'u tekrar etmez. 9–10'un deney depoları kısa tabanlıydı (karar #44); 11 GitHub organizasyonu yazısı olduğu için
  yerel deney yerine kurgusal `ornek-sirket` ve salt okunur denetim ağırlıklı kurulabilir.
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
| dal | branch | 4 (geçerken), 5 (tanım) | 4'ün "Sırada ne var" bölümünde gloss'landı; 5 parantezsiz tanımladı (run 3) |
| yazılım tedarik zinciri hataları | Software Supply Chain Failures | 5 | A03:2025'in adı |
| köken bilgisi | provenance | 5 | yapı çıktısının kaynağına dair kayıt; tedarik zinciri yazısı (22) gloss'u tekrar etmez |
| commit | commit | 5 | İngilizce kalır; "anlık görüntü + ebeveyn + üst veri" diye açıklandı; fiil "commit etmek" |
| anlık görüntü / ebeveyn | snapshot / parent | 5 | |
| commit kimliği / içerik özeti | object id / hash | 5 | SHA-1 varsayılan, SHA-256 isteğe bağlı; Git 3.0'da yeni depolarda SHA-256 (tarihli) |
| ref | ref | 5 | İngilizce kalır; "ad → nesne kimliği ya da başka bir ref" diye açıklandı |
| HEAD | HEAD | 5 | İngilizce kalır; ayrık HEAD planlananlarda (8) |
| etiket | tag | 5 (geçerken), 10 (tanım) | Git etiketi; 10 gloss'u tekrar etmez. OCI annotation için "ek açıklama" (karar #30) |
| varsayılan dal | default branch | 5 | `main` ve `master` yalnızca ad; Git'te `init.defaultBranch`, GitHub'da depo ayarı |
| çalışma ağacı | working tree | 5 | |
| hazırlık alanı | staging area (index) | 5 | "index" Git'in teknik adı olarak bir kez anıldı |
| ulaşılabilirlik / ata | reachability / ancestor | 5 | `git merge-base --is-ancestor` |
| ek açıklama | annotation (OCI) | 5 | `org.opencontainers.image.revision`; "etiket" kullanılmaz |
| sığ klon | shallow clone | 5 | |
| birleştirme | merge | 5 (geçerken), 7 (tanım) | 5'te gloss'landı; 7 gloss'u tekrar etmez, birleştirme tabanını kurar |
| iş akışı | workflow (GitHub Actions) | 5 (geçerken) | "Kendi organizasyonunda" kutusunda; makine kimlikleri ve Actions yazısı (13) gloss'u tekrar etmez |
| uzak depo | remote | 5 (geçerken), 6 (tanım) | 5'in "Sırada ne var" bölümünde gloss'landı; `origin` adıyla |
| bare depo | bare repository | 6 | "bare" İngilizce kalır |
| uzak izleme dalı | remote-tracking branch | 6 | `origin/main`; şekillerde kesikli çerçeve |
| refspec | refspec | 6 | İngilizce kalır; "uzak ref ile yerel ref arasındaki eşleme kuralı" diye açıklandı |
| yukarı akış dalı | upstream branch | 6 | |
| ileri sarma | fast-forward | 6 | |
| ıraksama | divergence | 6 | ahead/behind İngilizce çıktı olarak gösterildi |
| rebase / squash | rebase / squash | 6 (geçerken), 7 (tanım) | İngilizce kalır; 6'nın "Sırada ne var" bölümünde birer cümleyle Türkçe açıklandı; 7 kılavuz tanımlarıyla kurdu (run 4) |
| birleştirme tabanı | merge base | 7 | `git merge-base`; iki ucun en iyi ortak atası |
| üç yollu birleştirme | three-way merge | 7 | iki uç + birleştirme tabanı |
| birleştirme commit'i | merge commit | 6 (geçerken), 7 (tanım) | 6 gloss'suz andı; 7 gloss'ladı |
| birleştirme çatışması | merge conflict | 7 | `add/add` ve içerik çatışması; `merge.conflictStyle=zdiff3` |
| anlamsal çatışma | semantic conflict | 6 (geçerken), 7 (tanım) | metinde çatışmadan birleşip birlikte yanlış davranan iki değişiklik; 9 gerekli kontrol ve birleştirme kuyruğuyla bağlar |
| PR | pull request | 7 (geçerken), 9 (tanım) | 7'de GitHub Docs tanımıyla gloss'landı; 9 gloss'u tekrar etmez, head/base'i kurar; "çekme isteği" kullanılmaz |
| zorla push | force push | 7 (geçerken), 8 (tanım) | 7'de gloss'landı; fiil "zorla push etmek"; "zorla göndermek" kullanılmaz (karar #37) |
| geri döndürme / geri sarma | revert / reset | 8 | git(1) "Reset, restore and revert" ayrımı; `restore` Türkçeleştirilmedi |
| ayrık HEAD | detached HEAD | 8 | `git switch --detach` |
| reflog / günlük | reflog (reference log) | 8 | İngilizce kalır; "ref günlüğü" diye açıklandı; "günlük" bu seride yalnız bu anlamda (karar #38) |
| kira / içerme | lease / includes | 8 | `--force-with-lease` / `--force-if-includes` |
| dolaylı birleştirme | indirect merge | 8 | GitHub Docs; 9 kalan riskte geri çağırır, gloss'u tekrar etmez |
| stash / cherry-pick | stash / cherry-pick | 8 | komut adları İngilizce; tabloda ve kurtarmada Türkçe açıklandı |
| sahipsiz nesne | dangling object | 8 | `git fsck --lost-found` (Teşhis) |
| base / head (PR'ın) | base / head (compare) branch | 9 | İngilizce kalır; GitHub sözlüğünün tanımıyla açıklandı; "compare" arayüzdeki ad |
| deneme birleştirmesi | test merge commit (`refs/pull/N/merge`) | 9 | `pull_request` kontrolünün sınadığı commit; yerel benzeri `ci` klonunda, kimlikleri GitHub'ınkiyle aynı değil |
| dal koruması | branch protection | 9 (geçerken), 12 (tanım) | 9'da gloss'landı; ruleset 9'da "adlandırılmış kural kümesi" diye geçerken açıklandı; 12 gloss'u tekrar etmez |
| gerekli kontrol | required status check | 9 | sıkı (güncel dal) / gevşek biçim; beklenen kaynak (GitHub App) |
| birleştirme kuyruğu | merge queue | 9 | `merge_group` olayı; `gh-readonly-queue/<base>` öneki |
| kod sahibi | code owner (CODEOWNERS) | 9 | dosya inceleme ister; onayı zorunlu kılan ayardır |
| trunk tabanlı geliştirme | trunk-based development | 9 | DORA özeti, görüş olarak |
| sürüm dalı | release branch | 9 (geçerken), 10 (kullanım) | hotfix akışı 10'da |
| ortam / dağıtım koruma kuralı | environment / deployment protection rule | 9 | GitHub Actions; plan koşulu yazıldı |
| hafif / açıklamalı etiket | lightweight / annotated tag | 10 | "etiket" 5'te gloss'landı; 10 türleri tanımladı |
| GitHub Release / değişmez sürüm | GitHub Release / immutable release | 10 | ürün nesnesi adıyla; "Release" İngilizce kalır |
| sürüm tasdiki | release attestation | 10 | değişmez sürümün ürettiği doğrulanabilir kayıt |
| geri dönüş | rollback | 10 | önceki yapı çıktısını yeniden dağıtmak; geri döndürme (revert) ve geri sarma (reset) ile karıştırılmaz |
| imaj özeti | image digest | 10 | OCI; imaj adı ("etiket" değil) yeniden atanabilir, özet içerikten hesaplanır (karar #30, #49) |
| sürüm numarası / sürüm / dağıtım | version / release / deploy | 1–4 (kullanım), 10 (ayrım) | yayımlanmış yazılarla aynı; "yayın" kullanılmaz (karar #21); 10 "sürüm numarası"nı ayrı adlandırdı |
| hotfix | hotfix | 10 | İngilizce kalır; "üretimdeki sürüm için acil düzeltme" diye açıklandı |
| ileri düzeltme | roll forward | 10 | geri dönüşün ve geri döndürmenin üçüncü seçeneği |
| anlamsal sürümleme | Semantic Versioning (SemVer) | 10 | belirtim adıyla; "sürüm numarası" ile birlikte |

### Planlanan terim kararları (Git/GitHub hattı)

Henüz yayımlanmadı; ilgili yazı yayımlandığında satır yukarıdaki deftere "kuran yazı" ile taşınır.
Yayımlanmış yazılarla tutarlılık: release için "sürüm" (sürüm adayı, sürüm notu, sürüm kapısı),
deploy için "dağıtım" (karar #21).

| Türkçe biçim | İngilizce | İlk kullanacak yazı | Not |
|---|---|---|---|
| temel yetki | base permission | 11 | |
| dış katkıcı | outside collaborator | 11 | |
| sahiplik sürekliliği | ownership continuity | 11 | |
| ruleset | ruleset | 9 (geçerken), 12 (tanım) | İngilizce kalır; 9'da "depoya ya da organizasyona yazılan adlandırılmış kural kümesi" diye geçti; dal koruması 9'da gloss'landı |
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
| Ata ilişkisi geçmişi kanıtlar, içeriği değil; çatışma çözümü birleşmiş sonuca karşı testle doğrulanır | 5, 7 | 9 (gerekli kontrol, birleştirme kuyruğu), 24 |
| Squash ve rebase'li birleştirmede dalın birleştiğini Git değil PR kaydı söyler | 7 | 9 (dolaylı birleştirme), 12 (doğrusal geçmiş) |
| Zorla push yalnızca kendi dalında, kira ve içermeyle; reflog yerel ve sürelidir | 8 | 12 (zorla push engeli, bypass), 23 (olay müdahalesinde kanıt) |
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
| 4 | "Sırada ne var": XXE düzeltmesinin yeri, üretime giden yapının onu içerip içermediği, ana daldan önceden açılmış dalın düzeltmeyi kendiliğinden alıp almadığı; dal bir işaretçidir | 5 | evet (run 3) |
| 5 | "geçmişi yeniden yazan işlemlerin neden yeni kimlikler ürettiği; ayrışan geçmişleri birleştirmeyi işlerken buna döneceğiz" | 7 | evet (run 4) |
| 5 | Dalı `main`'in yeni hâliyle bilerek bütünleştirmek: "ya bir birleştirme (merge) ya da geçmişi yeniden yazan bir alternatifi; yolları ve bedelleri, ayrışan geçmişleri birleştirme konusunun içeriği" | 7 | evet (run 4) |
| 5 | "imzayı zorunlu kılan kuralı, kuralların platforma yazılmasını işlerken göreceğiz" (yazar alanı kimlik kanıtı değildir) | 12 | hayır |
| 5 | Etiketler: "ayrıntısı sürüm ve dağıtım konusuna kalıyor" | 10 | evet (run 5) |
| 5 | "Yapıyı kimin, hangi makinede ürettiği ve bu kaydın neden kanıt sayılabileceği ise tedarik zinciri ve yapı bütünlüğü konusunun sorusu" | 22 | hayır |
| 5 | "Sırada ne var": paylaşılan uzak depo; `fetch`, `pull`, `push` hangi ref'i taşır, `origin/main` ne zaman değişir, "dalım güncel" ne zaman kanıttır | 6 | evet (run 3) |
| 6 | Iraksamanın çözümü: "iki geçmişin bir birleştirme commit'iyle mi yoksa yeniden yazılarak mı bir araya geleceği ayrı bir karardır ve birleştirme konusunun içeriğidir" | 7 | evet (run 4) |
| 6 | `--force` ile göndermek: "hangi koşulda ve nasıl güvenli yapıldığı ise kod kaybetmeden geri almayı işlerken ele alınacak" | 8 | evet (run 4) |
| 6 | "Sırada ne var": ıraksayan `main` (`eacea0f` / `120d7b5`) ve yamayı almamış fatura dalı; birleştirme commit'i, rebase, squash grafikte ve kimliklerde neyi değiştirir | 7 | evet (run 4) |
| 7 | `eacea0f`'e dönüş ve orada kalma süresi "kod kaybetmeden geri almayı işlerken ele alınacak"; zorla push'un hangi biçiminin başkasının işini ezmediği "geri alma konusunun içeriği" | 8 | evet (run 4) |
| 7 | PR: "Ayrıntısı ekip akışı konusunun içeriği" | 9 | evet (run 5) |
| 7 | Anlamsal çatışmayı yakalayan, birleşmiş sonucu test eden kontrolün "birleştirmeden önce zorunlu kılınması ekip akışı konusunun içeriği" | 9 | evet (run 5) |
| 7 | "Bir yöntemi belirli bir dal için bağlayıcı kılan kurallar da var ...; kuralların platforma yazılmasını işlerken buna döneceğiz" (Kendi organizasyonunda kutusu) | 12 | hayır |
| 7 | "Sırada ne var": `revert` ile `reset`, ulaşılamaz commit'in ömrü, zorla push'un biçimleri, silinen dal | 8 | evet (run 4) |
| 8 | Korunan dalda zorla push ve silme engeli: "Bu engellerin nasıl kurulduğuna kuralların platforma yazılmasını işlerken döneceğiz" | 12 | hayır |
| 8 | "Sızan bir sırrın yönetici vakası, makine kimliklerini ve iş akışı güvenliğini işlerken bütünüyle ele alınacak" (Teşhis) | 13 | hayır |
| 8 | "Sırada ne var": push, PR, inceleme, birleştirme ve dağıtım neden ayrı kararlar; zorunlu inceleme, kod sahipliği, gerekli kontroller ve birleştirme kuyruğu | 9 | evet (run 5) |
| 9 | `permissions` ve action'ları tam commit kimliğiyle sabitlemenin "ayrıntısı makine kimliklerini ve iş akışı güvenliğini işlerken gelecek" | 13 | hayır |
| 9 | Dal koruması kuralının "kurulması, katmanlanması ve kimin muaf tutulacağı kuralların platforma yazılmasını işlerken ele alınacak"; kutuda "Kuralı ruleset olarak yazmak, katmanlamak ve muafiyet listesini daraltmak" | 12 | hayır |
| 9 | "İş akışlarının güvenliği makine kimliklerini işlerken ayrıntılanacak" (beklenen kaynak, PR'ın iş akışını değiştirmesi) | 13 | hayır |
| 9 | Sürüm dalı: "ayrıntısı sürüm ve dağıtım konusunun içeriği" | 10 | evet (run 5) |
| 9 | "Sırada ne var": etiket bir commit'i nasıl adlandırır ve ne zaman değişebilir, GitHub Release ve değişmez sürüm, SemVer, geri dönüşün revert olmaması | 10 | evet (run 5) |
| 10 | "Etiketleri bir kuralla korumak, yani kimin etiket oluşturup silebileceğini sınırlamak, kuralların platforma yazılmasının konusu" | 12 | hayır |
| 10 | Sürüm dallarının da korunması: "aynı kural sürüm dallarına da uygulanmalı ve bunun bir örüntüyle nasıl yazıldığı kuralların platforma yazılmasının konusu" | 12 | hayır |
| 10 | "Sırada ne var": kim hangi depoyu neden görüp yazabiliyor; roller, takımlar, temel yetki, en az yetki | 11 | hayır (sıradaki run) |

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
| 5 | Kanarya testi ve `DOCTYPE` reddi (4) | Atalık geçmişi kanıtlar, davranışı kanarya testi; terfi edilecek imaja karşı |
| 5 | Kanıt kapsadığı kadar konuşur (1) | `--is-ancestor` geçmişi kanıtlar, yamanın etkisinin yerinde durduğunu değil |
| 5 | Ret ≠ karar alınamadı (2) | Sürüm kapısının 1 ("yama yok") ve 2 ("karar alınamadı") dönüşleri; sığ klon |
| 5 | Fail-open (2) | Kırılgan commit'in yokluğunu `!` ile soran denetim sığ klonda "temiz" der (Teşhis et) |
| 6 | Kanıt kapsadığı kadar konuşur (1) | `git status`'un "up to date" cevabı iki yerel kaydın eşitliğidir; uzak depo hakkında konuşmaz |
| 6 | Dal bir işaretçidir; değişikliğin yeri grafikle kanıtlanır (5) | `fetch` ve `pull` fatura dalına dokunmaz; `--is-ancestor origin/main feature/fatura-pdf` 1 |
| 6 | Fail-open / karar alınamadı (2) | `git fetch || true` ile yutulan getirme hatası (Teşhis et); düzeltilmiş `aday_kimligi` 2 döner |
| 6 | Yapı bir dal adından değil commit kimliğinden yapılır (5) | Aday `origin/main`'in çözümlenmiş tam kimliğinden; sürüm kapısı imajın kaydettiği commit'i sorgular |
| 7 | Commit kimliği içerik özetidir (5) | Rebase'te `eacea0f` → `66098e2`: tree, parent ve committer satırları değişti; `hash-object` deneyi anıldı; patch-id aynı |
| 7 | Dal bir işaretçidir (5) | Üç deneme dalı "kopya değil, üç yer imi" |
| 7 | Push yalnızca ileri sarar (6) | Rebase edilmiş dalın aynı ada gönderimi non-fast-forward ile reddedildi |
| 7 | Ata ilişkisi geçmişi kanıtlar, davranışı değil (1, 5) | Teşhis: kendi tarafını seçen çözümde `--is-ancestor` 0, `noent` geri geldi |
| 7 | Kanarya testi (4) | Çatışma çözümünün kanıtı birleşmiş sonuca karşı koşulan test |
| 7 | Ret ≠ karar alınamadı (2) | `merge-tree` çıkışı 0, 1 ve diğer; üçüncüsü "temiz" sayılmaz |
| 7 | Uzak izleme kaydı `fetch --prune`'a kadar kalır (6) | Otomatik dal silmenin sınırı |
| 8 | Kısmi başarısızlıkta işlemin tamamı geri alınır (2) | `--abort` satırı ve `merge --abort`'un sınırı |
| 8 | Üç alan ve `git status --short`'un iki harfi (5) | Reset biçimleri ` M` / `MM` / ` M` / temiz |
| 8 | Dal bir işaretçidir (5) | Ayrık HEAD'de kalan commit'e yeni bir işaretçi yazmak |
| 8 | Push yalnızca ileri sarar; uzak izleme dalı son iletişimin önbelleği (6) | "fetch first"; arka plandaki getirmeyle tazelenen kira |
| 8 | Squash ata ilişkisi kurmaz (7) | `branch -d` reddi; denetimin aradığı yazar ve zaman bilgisi |
| 8 | Paylaşılmış geçmiş yeniden yazılmaz (7) | `main`'deki yanlış birleştirme `revert -m 1` ile geri döndürüldü |
| 8 | Kanarya testi (4) | Ayrık HEAD'de eski adaya karşı XXE kanaryası |
| 9 | Kanıt kapsadığı kadar konuşur (1) | `f7fd59b`'un yeşili 10.05'teki `main` artı #42 hakkında; birleştirmeden sonraki `main` hakkında değil |
| 9 | Birleştirme tabanı (7) | PR'ın üç noktalı farkı inceleyicinin ekranını belirliyor; "Update branch" sıkı kontrolde |
| 9 | Anlamsal çatışma; temiz birleşme yakalamaz (6, 7) | `merge-tree` 0, birleşik `main` test 1 |
| 9 | Güven sınırının yeri: kökeni ve vardığı sürecin yetkisi (3) | İş akışı dosyasını PR yazarı seçer, birleştirme kararına varır; sınır `.github/` |
| 9 | Fail-open / fail-closed (2) | Koşulla atlanan iş "Success" (açık), filtreyle atlanan "Pending" (kapalı) |
| 9 | Dolaylı birleştirme (8) | Kalan risk: PR koruma geçmeden birleşmiş görünebilir |
| 9 | Değişiklik incelenen yoldan gelir; incelemesiz yol kayma doğurur (4) | Girişte konu adıyla: `main`'e doğrudan push kodun incelemesiz yolu; akış commit'i kural açılmadan önceki son doğrudan push |
| 10 | Bir adın içeriği söylediği varsayımı (5) | Etiket, sürüm numarası, imaj adı ↔ commit kimliği, imaj özeti |
| 10 | Etiket bir ref'tir, commit onu ilerletmez (5) | Açıklamalı/hafif etiketin tanımına giriş |
| 10 | Revision ek açıklaması ve sürüm kapısı (5) | Dağıtım kaydındaki `b58fd17`; geri dönüş hedefine yama ve açığı getiren commit soruları |
| 10 | Aynı çıktının terfisi (5, A03:2025) | Geri dönüş önceki çıktıyı özetiyle yeniden kullanır |
| 10 | Geri döndürme (8) | Revert'in 1.3.0'a dönmediği, sınanmamış üçüncü sürüm |
| 10 | Kısmi başarısızlık (2) | Yarım kalan dağıtım: filonun iki sürümde kalması |
| 10 | Base (9) | Hotfix PR'ının base'i `release/1.4` |
| 10 | Patch-id (7) | `git cherry`'nin eşdeğerlik ölçütü |
| 10 | Zorla push yalnızca kirayla; paylaşılmış ref'te yasak (8) | Taşıma kazası o yasağın çiğnenmesi; geri koyma beklenen değerli `--force-with-lease` ile |
| 10 | Kayma ve aynı yapı, iki ortam (4) | İkinci güven sınırı; geri dönüşte aynı çıktının yeniden kullanılması |
| 10 | Kanarya testi (4, 5) | Geri dönüş hedefinde davranış kanıtı; `DOCTYPE` reddinin 1.3.0'da olmadığı |

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
- **#28 (2026-10-21, run 3) Deterministik deney deposu:** Git hattının deneyleri yalıtılmış ayarla
  (`GIT_CONFIG_GLOBAL` boş dosya, `GIT_CONFIG_NOSYSTEM=1`), sabit yazar/e-posta/tarih (`kaydet`
  yardımcısı) ve `git init -b main --object-format=sha1` ile kurulur; kimlikler okurun makinesinde de
  aynı çıkar (iki ayrı kurulum aynı beş kimliği verdi). 5 ve 6 aynı beş commit'i paylaşır: `825fed9`,
  `8a819d8`, `31ad836` (1.4.0 adayı), `f8db4cb` (`feature/fatura-pdf`), `85fdda1` (XXE yaması); 6'nın
  sonu `eacea0f` (`a`'nın yerel `main`'i) ve `120d7b5` (uzak `main`). 7 ve 8 bu tabandan sürer;
  yazar adları ASCII (`gelistirici-a`, `gelistirici-b`), alan `example.test`.
- **#29 (2026-10-21, run 3) Komut bloğu biçimi:** `SOZLESME.md` §3'ün altı öğesi kod bloğunun başındaki
  yorum satırlarında durur (Nerede · Önkoşul · Değişen durum · Veri kaybı riski · Doğrulama); beklenen
  çıktı hemen ardından ayrı bir `text` bloğundadır. Her bash bloğu yayından önce
  `artifacts/guvenlik-run3/blok-dogrula.mjs` ile temiz bir geçici klasörde sırayla koşturulur ve çıktısı
  metindekiyle karşılaştırılır; geçici yol metinde "…" diye kısaltılır, sekme/boşluk farkı yok sayılır.
  Ardında `text` bloğu olmayan bash parçaları (Teşhis et soruları) koşturulmaz; iddiaları ayrı
  betiklerle kanıtlanır (`deney5-teshis2.txt`, `deney6-teshis2.txt`).
- **#30 (2026-10-21, run 3) "Ek açıklama" ve "etiket":** OCI imaj ek açıklaması (annotation) "ek
  açıklama", Git tag'i "etiket" diye yazılır; aynı Türkçe sözcük iki kavram taşımaz (#24'ün uzantısı).
- **#31 (2026-10-21, run 3) Sürüm kapısı köken bilgisine dayanır:** "Yapı yamayı içeriyor mu?" sorusu
  dal adıyla değil, imajın `org.opencontainers.image.revision` ek açıklamasındaki tam commit kimliği ve
  tam klonda `git merge-base --is-ancestor` ile cevaplanır; 1 "yama yok", 2 "karar alınamadı" (sığ klon,
  çözülemeyen kimlik) ayrı sayılır; davranış kanıtı kanarya testidir. 5'in doğrulanabilir özelliği SSDF
  v1.1 PS.3.2. 22 (tedarik zinciri) bu kaydın kimin elinde güvenilir olduğunu işler.
- **#32 (2026-10-21, run 3) GitHub "About branches" taşındı:** Sayfa "Branches" adıyla
  `docs.github.com/en/pull-requests/reference/branches` adresinde; eski adres yönleniyor. Künye yeni
  adresle verildi; 9 ve 12'de aynı sayfaya bu adresle gidilir.
- **#33 (2026-10-21, run 3) Zaman çizelgesi:** 5'in sürüm toplantısı 21 Ekim sabahı; yama 20 Ekim'de
  `main`'e girdi ve aday 19 Ekim'de `31ad836`'dan yapıldı. 6 aynı sabah toplantıdan hemen sonra açılır;
  `120d7b5` 09.15'te, `eacea0f` 10.05'te. 6'nın açılışı run içinde bu çizelgeye göre düzeltildi.
- **#34 (2026-10-21, run 3) "Kendi organizasyonunda" kutusu yalnız GitHub ayarı önerildiğinde:** 5'te
  varsayılan dal adı için kutu var (salt okunur `gh repo list`, ayar sayfası; öneri: yeni depolar için ad,
  yeniden adlandırmanın GitHub belgesindeki etkileri). 6'da GitHub ayarı önerilmediği için kutu yok.
- **#35 (2026-10-21, run 4) 7'nin anlatı sırası:** GitHub'ın üç birleştirme yöntemi, fatura dalı birleştirme
  commit'iyle güncellenmeden önce, `main`'in ucunda açılan üç deneme dalında gösterildi; böylece Şekil 1
  sade kaldı (dalın geçmişinde birleştirme commit'i yok). Dal `main`'in ucundan ayrıldığı için yerel rebase
  zaten yeniden yazdı; GitHub'ın "her zaman yeni SHA" davranışını taklit eden `--force-rebase` gereksizdi ve
  çıkarıldı (taslaktaki "canlandırıyor" cümlesi yanıltıcıydı).
- **#36 (2026-10-21, run 4) `olarak` yardımcısı:** Deney deposu `kaydet`'in yanına, herhangi bir Git komutunu
  sabit yazar ve commit'i yapanla koşturan `olarak <kişi> <tarih> <komut…>` yardımcısını aldı (merge, rebase,
  cherry-pick, revert, `--amend`). Deneyle doğrulandı: rebase ve `--amend` özgün yazarı korur, commit'i yapanı
  ortamdan alır; kimlik verilmezse Git makineye özgü bir kimlik yazar ve kimlikler okurda tutmaz. Bash'e özgü
  `${@:3}` yerine `shift 2` kullanıldı.
- **#37 (2026-10-21, run 4) "Zorla push":** Planlanan terim 7'de ilk geçişte gloss'landı; fiil "zorla push
  etmek". Taslakta beş yerde geçen "zorla göndermek/gönderim" biçimi terimle hizalandı.
- **#38 (2026-10-21, run 4) "Günlük" tek anlamlı:** Seride "günlük" yalnızca reflog (ref günlüğü) anlamında
  kullanılır; 7'deki sıfat "gündelik"e çevrildi. Uygulama ve güvenlik logları için "kayıt" (23 "güvenlik
  kaydı"), GitHub audit log için "denetim kaydı" (12) kullanılır (#24, #30'un uzantısı).
- **#39 (2026-10-21, run 4) Yönetici vakası biçimi:** `SOZLESME.md` §4'ün dört adımı, vakanın geçtiği
  bölümde italik başlıklarla (*Gözlem ve kanıt.*, *Seçenekler.*, *Güvenli karar.*, *Kalan risk.*) taşınır;
  ayrı bölüm açılmaz. 7'de bir vaka (çakışan uzun yaşayan dal: squash'tan sonra yaşayan dal), 8'de iki
  (silinen dal; `main`'e yanlışlıkla birleştirme).
- **#40 (2026-10-21, run 4) Teşhis kanıtı aynı dünyada:** 7'nin Teşhis'indeki çatışma bölümü ve çıktılar,
  yazının deney deposuyla aynı uzak depo durumunda (`c` klonu, `ac8d84d` sonrası) üretildi; 8'in Teşhis
  iddiaları (`--keep`, `fsck --lost-found`) ayrı betikle sınandı ve "hazırlıktaki içerik de kaybolur" taslak
  cümlesi deneyle düzeltildi.
- **#41 (2026-10-21, run 4) Dolaylı birleştirme 8'de:** `main`'e yanlışlıkla birleştirmenin gözleminde GitHub
  Docs tanımıyla kuruldu; 9 kalan riskte geri çağırır, gloss'u tekrar etmez.
- **#42 (2026-10-21, run 4) Deney deposu 9'a devrediliyor:** 8'in kurulumu 7'nin son durumunu deneme dalları
  ve `y` klonu olmadan aynı kimliklerle kurar. 8'in sonunda `main` `b921466` ("Reapply"), uzak
  `feature/fatura-kdv-oran` `49e55e1`, `feature/fatura-pdf` `ec788df` (geri yüklendi), yerelde
  `kanarya-testi` `0594ea1`. 9 GitHub'a özgü özellikleri (inceleme, CODEOWNERS, gerekli kontrol, birleştirme
  kuyruğu) yerel depoda gösteremez; yerelde kanıtlanabilen kısım (iki ayrı yeşil dalın birlikte kırılması,
  CODEOWNERS dosya biçimi, `merge_group` olayı) bu tabandan ya da küçük bir yan depoyla kurulur.
- **#43 (2026-10-21, run 4) "Kendi organizasyonunda" kutusu:** 7'de var (birleştirme yöntemleri ve otomatik dal
  silme; salt okunur `gh repo list --json …MergeAllowed,deleteBranchOnMerge`; rol: yöntemler Maintain/Admin,
  otomatik silme Admin; plan koşulu belgelerde yok). 8'de yok: ayar önerilmedi, korunan dal 12'ye işaret
  edildi (#34).
- **#44 (2026-10-26, run 5) Kısa deney tabanları:** 9 ve 10, 5–8'in zincirini (8'in kurulumu 33 satırdı, 9'unki ~50
  olacaktı) yeniden oynatmak yerine kendi kısa tabanlarıyla kuruldu. 9'un tabanı tek commit `5313039`; ağacı 8'in sonundaki
  `b921466`'nın ağacıyla aynı (`f59542e`), süreklilik ağaç kimliğiyle kanıtlanıyor. 10'un tabanı dört commit (`85a4e4e`
  v1.3.0; `703b5a1` 21 Ekim adayı rc.2, XXE yamasıyla, dünyanın `120d7b5`'iyle aynı anlam; `5c44797` fatura; `06994f8` e-arşiv) ve
  9'un sonundaki e-arşiv satırını taşıyor; 1.3.0'ın içeriği temsilî, PR birleştirmeleri doğrudan push'la canlandırılıyor. Kimlikler yeni ve her yazı kendi
  başına koşuyor; dünya (belge-servisi, kişiler, tarihler, XXE hikâyesi) sürüyor. 11'den sonrası için de yerel deney gerekirse
  kısa taban tercih edilir.
- **#45 (2026-10-26, run 5) "Deneme birleştirmesi":** GitHub'ın `refs/pull/N/merge`'ü (belgedeki adı test merge commit)
  Türkçede "deneme birleştirmesi" diye adlandırıldı. Yerelde `ci` klonu ve `platform` kimliği GitHub'ın işini canlandırır;
  yazı kimliklerin GitHub'ınkilerle aynı olmayacağını, sınanan anlık görüntünün içeriğinin aynı olduğunu söyler.
- **#46 (2026-10-26, run 5) Kuyruğun "testi geçen commit main'e girer" iddiası kurulmadı:** GitHub Docs geçici dalın hedef
  dala "birleştirileceğini" yazıyor; aynı kimlikle ileri sarıldığını yazmıyor (`ARASTIRMA.md` §21). Kuyruk grupları deneyde
  ayrı mesaj ve kimlikle (`0751329`, `1e028ad`) canlandırıldı.
- **#47 (2026-10-26, run 5) Gerekli kontrol gerçek bir test:** 9'un kontrolü `node --test fatura/*.test.ts`; Node.js'in
  tip ayıklaması (v22.18+/v23.6+ varsayılan, v24.3+ uyarısız) `.ts`'yi derlemesiz çalıştırıyor. Önkoşul "Node.js 22.18+
  ya da 24.3+". Çıktıda süre gibi değişken satırlar gösterilmez; yalnızca çıkış kodu ve `SyntaxError` satırı.
  `${PIPESTATUS[0]}` ile `grep -m1` kullanılmaz (Node erken kapanan boruda 7 dönebiliyor); `sed -n '/…/p'` kullanılır.
- **#48 (2026-10-26, run 5) "Kendi organizasyonunda" kutusu 9 ve 10'da var:** 9 dal koruması/kod sahibi/kuyruk ayarı, 10
  değişmez sürüm önerdi (#34). Salt okunur adımlar `gh api … GET` ve `gh release view/list/verify`; değiştiren adım ilk
  değil; rol (Admin), etkilenenler, duyuru ve geri dönüş yazıldı. Gerçek bir organizasyona karşı çalıştırılmadı.
- **#49 (2026-10-26, run 5) "Etiket" yalnızca Git tag'idir (#30'un uzantısı):** konteyner imajının adındaki sürüm "imaj
  adı", içerik kimliği "imaj özeti (image digest)" diye yazıldı; "imaj etiketi" kullanılmadı. Kayıt sunucusu (registry)
  adlandırılmadı; "kayıt" log anlamına ayrılmış durumda (#38).
- **#50 (2026-10-26, run 5) Zaman çizelgesi:** 1.3.0 9 Ekim; akış kararı 22 Ekim 16.00; iki PR 23 Ekim 09.30/10.00,
  birleştirmeler 11.00/11.30, düzeltme 12.20; 1.4.0 23 Ekim 14.00 (etiket 14.05), dağıtım 15.00, hata 15.20, geri dönüş 15.30,
  e-imza 16.00, düzeltme 16.30, etiket taşıma 17.00; 26 Ekim Pazartesi 09.00 iki 1.4.0, 09.30 geri koyma, 10.00 hotfix ve
  v1.4.1. 9 ve 10 aynı Cuma'yı farklı saatlerle anlatıyor: 9'un PR'ları öğlene kadar, 10'un sürümü öğleden sonra.
- **#51 (2026-10-26, run 5) Yalıtılmış kopya aynı sürücüde:** `SOZLESME.md` §7 "aynı sürücüdeki yalıtılmış kopya" der; run 4
  kopyayı D:'de kurmuştu. Run 5 `C:\dev\.anil-lib-iso-guvenlik-run5`'i kullandı; `node_modules` junction ile, silmeden önce
  junction ayrı sökülür.
- **#52 (2026-10-26, run 5) Yayımlanmış 5–8'in komut blokları Git 2.55 ile yeniden koşturuldu:** dört yazının 41 bloğunun
  hepsi aynı çıktıyı verdi; bakım kalemi gerekmedi. Doğrulayıcı stderr'i stdout'la aynı akışta toplar (okurun terminali
  gibi); run 4'ün betiği de böyle çalışıyordu.
- **#53 (2026-10-26, run 5) Beş mercekli inceleme ve doğrulanabilir özellik:** Yazılar yayından önce beş ayrı mercekle (kaynak,
  sözleşme, teknik ve şekil, pedagoji, süreklilik) incelendi; her merceğin bulguları ayrı bir şüpheci tarafından çürütülmeye
  çalışıldı, kalan bulgular uygulandı ve iki yazı ikinci kez denetlendi. Sonuçlar: 9'un iş akışına `push: main` eklendi (yoksa
  "birleştirmeden sonra `main` kırmızı" sinyali GitHub'da üretilmezdi); doğrulanabilir özellik ilk ebeveyn eşitliğinden ağaç
  eşitliğine çevrildi (kuyrukta grup 2'nin ilk ebeveyni grup 1'dir, ilk ebeveyn ölçütü yanlış alarm verirdi); 10'un tabanı
  dünyayla çelişmesin diye yeniden kuruldu (rc.2 21 Ekim'in adayı, 1.3.0'da `fatura/` yok); taşınan etiket kirayla geri kondu;
  geri dönüş hedefinin kapısı 5'in tek sorusuna ve davranış kanıtına bağlandı; `b`/`gelistirici-b` 6–7'deki gibi güvenlik
  geliştiricisi. Çürütülen bulgular (action SHA'larının kaynağı, CICD-SEC-1'in "hattın sonu" ifadesi) yerinde bırakıldı.
