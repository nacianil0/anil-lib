# Public lansman — kontrol dosyası

Başlangıç: 2026-11-03 13:15 (TST) · Bitiş: 2026-11-03 15:05 · Durum: **KOD TAMAM, CANLIYA ALINMADI** · Kapsam: kullanıcının "Anıl-Lib Public Lansman,
Ana Sayfa ve Güvenli Okuyucu Erişimi" promptu (bakım run 7'den ayrı iş).

Bu dosya, bağlam sıkıştırılırsa işin kaldığı yerden sürmesi için kalıcı kayıttır. Her iş paketinin
durumu, kararları ve kanıtları burada tutulur. Kapanışta portföy tanımı ve yayın durumu da buraya
yazılır.

## Sınırlar (prompttan)

- Run 7'nin commit edilmemiş değişikliklerine dokunulmaz: 13 makale, 3 SVG, `catalog.json`,
  `docs/seri/{HANDOFF,YOL-HARITASI,BAKIM-RUN7}.md`, `.wolf/*`. Bu işin dosyaları onlardan ayrıdır.
- Yeni makale yok; 118 yazının akademik içeriği değişmez.
- Paralel kimlik sistemi kurulmaz. Mevcut roller ve hesaplar yeniden sınıflandırılmaz.
- Ücretli servis ya da yeni dış servis eklenmez. Sahte başarı ve uydurma metrik yok.
- Eğitim içeriği özgün araştırma ya da hakemli yayın gibi sunulmaz.
- Anthropic'e özel reklam ya da kurumsal aidiyet dili kullanılmaz.
- Koruma atlatılmaz (Vercel SSO dahil). Hukuki uygunluk kesinleşmiş ilan edilmez.

## Başlangıç bulguları (2026-11-03, koddan ve canlı altyapıdan)

- **Uygulama:** Next 15 (App Router), React 19, Tailwind 3; Neon Postgres (HTTP sürücüsü); Drizzle şeması.
  Migration'ları `scripts/migrate.mjs` uygular; `vercel-build` bunu her deploy'da çalıştırır.
- **Kimlik:** kullanıcı adı ve parola. Oturum HMAC imzalı, HttpOnly `anil_lib_auth` çerezinde tutulur:
  `{uid, ws, exp}`, 7 gün. Rol çerezde değil, veritabanından okunur.
  - Roller: `owner` ve `user`. Hesapları yalnız owner `/yonetim`'den açar.
  - Kendi kendine kayıt yok; hesap kurtarma yok; giriş denemelerini sınırlama yok.
  - Owner'ın açtığı hesaplarda en kısa parola 4 karakter.
- **Erişim (bugün):**
  - Middleware `/login` dışındaki her şeyi oturuma bağlıyor.
  - `user` rolü `ai`, `boun` ve `guvenlik` serilerini okuyabiliyor.
  - `owner` bunlara ek olarak arşivi (`/read`) ve yönetimi (`/yonetim`) görüyor.
  - Güven Sınırı serisini anonime açan bir yayın kararı yok.
- **Okuyucu verisi:**
  - Hesap başına `localStorage` anahtarı: `anil-lib:reader-data:v2:<workspace>`.
  - `/api/reader-sync` ile sunucuya eşitleniyor. Kayıt, ilerleme, yer imi ve vurguyu kapsıyor.
- **Yayın akışı:** GitHub `nacianil0/anil-lib`, `main` dalına push, ardından Vercel otomatik production
  deploy (`vercel[bot]` kayıtları). Son deploy: `5d8d837`, 2026-11-02, success.
- **Canlı erişim:**
  - `anil-lib.vercel.app` → `DEPLOYMENT_NOT_FOUND`. GitHub'daki homepage alanı eskimiş.
  - Projenin Vercel alan adları (üretim takma adı, `main` dal adresi, deployment URL'si) Vercel SSO'ya
    302 yönlendiriyor; yani Vercel Deployment Protection açık.
  - Özel alan adı kaydı bulunamadı. Vercel CLI yok, `.vercel` bağlantısı yok.
- **Depo görünürlüğü:** GitHub deposu **public**. Uygulamanın kapalı tuttuğu her içerik (Boğaziçi serisi,
  arşiv, Güven Sınırı taslakları, `docs/`) GitHub'da okunabiliyor. Uygulama katmanındaki erişim politikası
  bu kaynağı korumaz; kararı kullanıcınındır.
- **Posta altyapısı yok:** bağımlılık yok, ortam değişkeni yok. E-posta doğrulama ve e-postayla kurtarma
  dış bağımlılık kararı gerektirir.

## Tasarım kararları

1. **Erişim politikası tek kaynakta** (`src/lib/auth/access.ts`):

   | Kim | `ai` | `guvenlik` | `boun` | arşiv | yönetim |
   | --- | --- | --- | --- | --- | --- |
   | anonim | ✓ | – | – | – | – |
   | `reader` (dış kayıt) | ✓ | ✓ | – | – | – |
   | `user` (mevcut) | ✓ | ✓ | ✓ | – | – |
   | `owner` | ✓ | ✓ | ✓ | ✓ | ✓ |

   - Middleware yalnız açık yolları (`/`, `/seri`, `/seri/*`, kayıt, giriş, kurtarma, gizlilik, `robots`,
     `sitemap`) anonime bırakır; geri kalan her şey oturum ister (varsayılan ret).
   - Sayfalar ve API rolü sunucuda yeniden denetler. Menü gizlemek tek başına yeterli sayılmaz.
2. **Dış okuyucular ayrı tabloda** (`reader_accounts`).
   - `users` tablosuna ve kısıtlarına dokunulmaz.
   - Geri dönüş güvenli: eski kod bu hesapları hiç tanımaz. Oturumları geçersiz kalır, eski kodda yetki
     kazanamazlar.
   - Workspace `r:<uuid>` biçimindedir. API kapsamı, imzalı çerezdeki workspace'ten veritabanına
     gitmeden çıkar.
   - Aynı giriş formu, çerez ve parola özeti (scrypt) kullanılır; ayrı bir kimlik sistemi kurulmaz.
3. **Kayıt e-postasız:** kullanıcı adı ve parola.
   - Yeni hesaplarda parola en az 15 karakter (OWASP Authentication CS: MFA yoksa <15 zayıf). Bileşim kuralı yok.
   - Bal küpü alanı, en kısa doldurma süresi ve IP başına sınır uygulanır.
   - Kullanıcı adının dolu olduğu kayıtta söylenmek zorunda; bu sayma riski hız sınırıyla azaltılır
     (OWASP: kaba kuvvet koruması sayımı ölçekte engeller).
4. **Kurtarma: çevrimdışı kurtarma kodu** (OWASP Forgot Password CS "Offline methods").
   - Kod 128 bit rastgeledir, bir kez gösterilir ve SHA-256 özeti saklanır. Tek kullanımlıktır.
   - Başarılı kurtarma bütün oturumları geçersiz kılar (`session_version`) ve otomatik giriş yapmaz.
5. **Hız sınırı:** Postgres'te sabit pencereli sayaç (`auth_rate_limits`). IP ham saklanmaz; HMAC özeti
   saklanır, kayıtlar 1 günde silinir.
   - Giriş: IP başına ve hesap başına başarısız deneme sınırı.
   - Kayıt: IP başına ve genel saatlik sınır.
   - Kurtarma: IP başına ve hesap başına sınır.
6. **"Beni hatırla":** KVKK Çerez Rehberi 5.2'ye göre tarayıcı oturumları arasında süren kimlik
   doğrulama çerezi Kriter B kapsamında değil.
   - Kutu varsayılan olarak boştur. Boşsa oturum çerezi kullanılır (sunucu tarafında 12 saat); işaretlenirse
     7 günlük kalıcı çerez.
   - Mevcut hesaplar da bu kutuyu görür; giriş yöntemi aynı kalır.
7. **Anonim yerel okuma:**
   - Workspace `local`, eşitleme kapalı, outbox tutulmaz. Hesap verisiyle karışmaz; giriş yapınca
     aktarılmaz.
   - Depolama kapalı ya da bozuksa okuma çalışmaya devam eder.
   - Seri başına ve tümden sıfırlama var. "Bu cihazda kaydetme" seçeneği de var.
8. **Çerez ve yerel depolama:** analitik, reklam ya da üçüncü taraf izleyici yok, bu yüzden rıza akışı
   kurulmaz. Banner da yok.
   - Bilgilendirme şu yüzeylerden yapılır: `/gizlilik` sayfası ve denetimleri, herkese açık sayfaların
     altbilgisindeki tek satırlık not, okuyucu araç çubuğundaki "yalnız bu tarayıcıda" simgesi (`/gizlilik`'e gider).
   - KVKK rehberi `localStorage`'ı kapsam dışı tutuyor (1.2).
9. **SEO:**
   - Yalnız public sayfalar indekslenir (`/`, `/seri`, 118 yazı, `/gizlilik`). Kök layout varsayılan
     olarak `noindex` kalır.
   - Sayfalarda canonical, OpenGraph ve JSON-LD (`Article`) var. `sitemap.xml` ve `robots.txt` üretilir.
   - Taban adres `SITE_URL` ortam değişkeninden gelir; yoksa Vercel'in production adresine düşülür.

## İş paketleri

| # | Paket | Durum |
| --- | --- | --- |
| L0 | Keşif: repo, auth, dağıtım, canlı durum, referanslar | tamam |
| L1 | Erişim politikası, middleware, sayfa ve API korumaları | tamam |
| L2 | Ana sayfa ve okuyucunun anonim modu | tamam |
| L3 | Yerel okuma takibi (devam et, sıfırla, depolama hatası) | tamam |
| L4 | Kayıt, giriş, hesap, kurtarma, hız sınırı, migration | tamam |
| L5 | Gizlilik ve çerez sayfası | tamam (hukuki gözden geçirme bekliyor) |
| L6 | SEO (metadata, sitemap, robots, JSON-LD, OG) | tamam |
| L7 | Testler, typecheck, lint, build | tamam |
| L8 | Tarayıcı, erişilebilirlik, SEO smoke (üretim modu) | tamam |
| L9 | Yayın kararı | **canlıya alınmadı**; dağıtıma hazır, engeller aşağıda |
| L10 | Kayıtlar (bu dosya, `.wolf`) ve portföy tanımı | tamam |

## Doğrulama kanıtı (son kod üzerinde, 2026-11-03)

| Kapı | Sonuç |
| --- | --- |
| `tsc --noEmit` | 0 hata |
| `vitest run` | 51 dosya, 943 test, hepsi geçti (önce 43 dosya / 841 test) |
| `eslint .` | önce 147 hata (hepsi eski, hiçbiri bu işin dosyalarında değil: 133 git dışı `artifacts/`, 11 `tools/series/*.cjs`, 3 `src/lib/content/schema.ts`); temizlik sonrası **0** (aşağıdaki kayıt). `pnpm check` uçtan uca yeşil. |
| `next build` | başarılı; hiçbir seri sayfası önceden render edilmedi (`prerender-manifest`: yalnız statik dosyalar, robots, sitemap, 404) |
| E2E, veritabanısız (repo config) | tam paket 90 test: 87 geçti, 1 atlandı (önceden de atlanıyordu), 2 başarısız. Başarısız ikisi `reader-data.spec.ts`'in eşitleme testleri; çalışan bir veritabanı istiyorlar. |
| E2E, aynı iki test + `reader-data.spec.ts`, PGlite veritabanıyla | 4/4 geçti. Yani başarısızlık ortamdan, regresyon değil. |
| E2E, yeni `public-access` + güncellenen `auth` | 35/35 geçti (son koşu) |
| E2E, veritabanlı erişim matrisi (scratchpad, 9 test) | 9/9 geçti. Kapsam: 4 rol × 10 yol; başlık sızıntısı; sync kapsamı (BOUN ve arşiv yazımı `unknown_article`); sıfırlama 403/200; kayıt retleri ve sınırı; giriş sınırı; kurtarma; oturum iptali (sayfa + API 401); iki okuyucu yalıtımı; parola değişimi; hesap silme; `users` tablosu hiç değişmedi |
| Migration | `scripts/migrate.mjs` değiştirilmeden PostgreSQL 17.5'e (PGlite) 0000–0006'yı uyguladı; ikinci koşu "bekleyen migration yok" |
| Üretim modu smoke (`next start`) | 5 güvenlik başlığı var. `Cache-Control: private, no-store`. Anonimde çerez 0. Herkese açık sayfalarda yalnız kendi kaynağından istek. Okuyucu çerezi HttpOnly + Secure + SameSite=Lax + oturumluk. Yazı sayfası ilk bayt 45–70 ms (yerel), 235 KB HTML. Tam metin + kaynakça + şekiller sunucu HTML'inde. |
| Erişilebilirlik (axe-core 4.10.2, WCAG 2.0/2.1/2.2 A+AA; klavye turu) | anonim 7 sayfa × 2 tema × 2 genişlik = 28 satır, okuyucu 3 sayfa × 4 = 12 satır: **0 ihlal**, her sayfada tek `h1`, 375 px'te taşma yok, her odak durağında görünür gösterge |
| Görsel kontrol | ana sayfa masaüstü/mobil/koyu, yazı masaüstü/mobil, gizlilik, kayıt, giriş ekran görüntüleriyle bakıldı |

Bu iş sırasında bulunup düzeltilen kusurlar:
- **Kurtarma kodu kayboluyordu.** Kayıt eylemi çerez kurunca Next sayfayı yeniden render ediyor, `/kayit` da "giriş yapmışsa yönlendir" kuralıyla kullanıcıyı panele atıyordu. Kod hiç görünmüyordu; veritabanlı e2e yakaladı.
- **Bloklu depolamada sayfa çöküyordu.** `readReaderData` bu durumda fırlatıyordu. Eski bir kusurdu.
- **Okuyucunun seri sıfırlaması 503 verecekti.** `reading_series_resets.reset_by` → `users` yabancı anahtarı okuyucu kimliğini reddediyor; okuyucuda NULL yazılıyor.
- **Yazı sayfalarında `og:image` yoktu.** Sayfa kendi `openGraph`'ını tanımlayınca Next kök görseli devralmıyor.
- **axe bulguları:** metin içi bağlantılar yalnız renkle ayrışıyordu (`link-in-text-block`); kaydırılan tablolara klavyeyle ulaşılamıyordu (`scrollable-region-focusable`).
- **`readPreferences` ilk okumada varsayılanları depoya yazıyordu.** Artık yalnız bir ayar değişince yazıyor (veri asgarisi).

## Yayın durumu: canlıya ALINMADI

Push yapılmadı, commit yapılmadı, deploy yapılmadı. Uygulama dağıtıma hazır. Güvenli yayını engelleyen somut nedenler:

1. **Production adresine anonim erişim Vercel'de kapalı.**
   - Projenin Vercel üretim takma adı, `main` dal adresi ve deployment URL'si Vercel SSO'ya 302 veriyor (Deployment Protection açık).
   - `anil-lib.vercel.app` → `DEPLOYMENT_NOT_FOUND`; GitHub'daki homepage alanı eski.
   - `main`'e push yeni kodu yayımlar ama site yine korumanın arkasında kalır. Yayımlanan gerçek URL'den anonim smoke test bu yüzden mümkün değil. Korumayı atlatmak kapsam dışı; ayarı değiştirmek kullanıcının kararı.
2. **Aydınlatma metninde veri sorumlusu yok.** `src/lib/site.ts` → `DATA_CONTROLLER = null`; `/gizlilik` bunu açıkça "henüz eklenmedi" diye gösteriyor. KVKK 2022/1358'de eksik aydınlatma metni yaptırım konusu oldu. Kişisel veri toplayan bir kaydı bu eksikle açmak yanlış olur.
3. **Run 7'nin commit edilmemiş içerik değişiklikleri aynı çalışma ağacında.** Yayına hangisinin gireceği kullanıcının kararı; bu iş onlara dokunmadı.
4. **GitHub deposu public.** Uygulamanın kapalı tuttuğu içerik (Boğaziçi serisi, arşiv, Güven Sınırı taslakları, `docs/`) GitHub'da okunabiliyor. Uygulamadaki erişim politikası bu kanalı kapatmaz. Görünürlüğü değiştirmek kullanıcının kararı.

## Canlıya geçiş için sırayla yapılacaklar (kullanıcı)

1. `src/lib/site.ts` → `DATA_CONTROLLER`'a ad ve iletişim yaz. `/gizlilik` metnini bir hukukçuya okut (aşağıdaki noktalar).
2. Run 7 değişikliklerini gözden geçir. Bu işin dosyalarını ayrı bir commit olarak al (liste aşağıda).
3. Vercel → Project → Settings:
   - Production alan adını seç (özel alan adı ya da sahip olunan bir `*.vercel.app`).
   - `SITE_URL`'i (ör. `https://alan.adi`) Production ortam değişkeni olarak ekle.
   - Deployment Protection'ı production alan adı herkese açık kalacak biçimde ayarla (ör. Standard Protection; Vercel panelinde doğrula).
   - Var olan `DATABASE_URL`, `SITE_PASSWORD_SHA256` ve `AUTH_COOKIE_SECRET` aynen kalır. Yeni gizli değer gerekmiyor.
4. `main`'e push. `vercel-build` önce `0006_reader_accounts.sql`'i uygular (yalnız iki yeni tablo), sonra derler.
5. Canlı smoke:
   - Anonim: `/`, `/seri`, bir yazı, `/robots.txt`, `/sitemap.xml` → 200. `/guvenlik`, `/boun`, `/read`, `/yonetim` → `/login`.
   - Bir dış hesap aç: kurtarma kodu görünmeli; `/guvenlik` 200, `/boun` 404.
   - Owner olarak `/yonetim` ve `/read` → 200.
6. İç hesapların (owner'ın açtıkları; en kısa parola 4) parolalarını güçlendir. `/login` artık herkese açık olacak. Hesap başına deneme sınırı (15 dakikada 10) var, ama zayıf parolanın yerini tutmaz.

## Hukuki gözden geçirme gerektiren noktalar (kesinleşmiş değil)

- Veri sorumlusu kimliği ve başvuru kanalı (KVKK m.10, m.11, m.13).
- Yurt dışına aktarım: Vercel barındırma ve Neon veritabanı, sunucular Türkiye dışında olabilir (KVKK m.9, 2024 değişikliği). Sözleşme ve bildirim yükümlülükleri bir hukukçunun işi.
- İşleme şartları: hesap ve eşitleme için sözleşmenin ifası (m.5/2-c), kötüye kullanım sayaçları için meşru menfaat (m.5/2-f). Sayfada amaç olarak yazılı, şart olarak teyit edilmedi.
- "Beni hatırla"sız oturum çerezi ve kalıcı çerezin açık talebe bağlanması KVKK Çerez Rehberi 5.2'ye göre kuruldu. `localStorage`'daki okuma ilerlemesi rehberin kapsamı dışında (1.2); cihazdan çıkmıyor ve kapatılabiliyor. Bunun "zorunlu" sayılıp sayılmayacağı hukuki değerlendirme ister.
- E-posta doğrulama ve e-postayla kurtarma yok, çünkü posta altyapısı yok. Eklemek bir sağlayıcı kararı (maliyet, yeni veri işleme).

## Geri dönüş

- Kod: Vercel'de önceki deployment'a dön ya da commit'i `git revert` et.
- Eski kod `reader_accounts`'u hiç okumaz. Okuyucu çerezleri orada hesaba çözülmez, kimse fazladan yetki kazanmaz.
- Şema: tablolar zararsızca kalabilir. Elle geri almak için `0006`'nın başındaki yorumda yazılı adımlar var.

## Portföy tanımı (kısa)

> **Anıl Lib**: yapay zekâyı temelden araştırma pratiğine 118 yazıda anlatan, Türkçe ve kaynakları
> gösterilmiş bir öğrenme platformu. Yazılar büyük dil modelleriyle, yazılı bir seri sözleşmesine
> göre üretildi ve bakım turlarında kaynaklarıyla yeniden denetlendi (1.508 kaynakça girdisi;
> anlamı değiştiren düzeltmeler tarihli notla işaretlenir). Özgün araştırma ya da hakemli yayın
> değil, eğitim amaçlı derleme. Teknik taraf:
> - Next.js 15 ve Postgres. Yapay zekâ serisi hesapsız okunur ve sunucuda render edilir.
> - Rol tabanlı erişim tek bir politika modülünden; middleware, sayfa, API ve sitemap aynı kuralı uygular.
> - E-postasız kayıt ve OWASP'a uygun çevrimdışı kurtarma kodu; Postgres'te HMAC'li deneme sınırı.
> - Hesapsız okurun ilerlemesi yalnız kendi tarayıcısında kalır.
> - Analitik ya da izleyici yok.
> - Doğrulama: 943 birim testi; tarayıcı testleri, gerçek Postgres motoruna karşı uçtan uca erişim matrisi ve axe ile WCAG AA denetimi.

## Bu işin dosyaları

- Yeni:
  - `drizzle/0006_reader_accounts.sql`
  - `src/lib/auth/{access,client-ip,form-token,password-policy,rate-limit,reader-accounts,recovery-code,session-cookie}.ts` (+ testleri)
  - `src/lib/site.ts`, `src/lib/content/series-stats.ts` (+ test), `src/lib/reader-data/local-tracking.ts`, `src/lib/reader-data/local-mode.test.tsx`
  - `src/app/{kayit,hesap,hesap-kurtar,gizlilik}/`, `src/app/{robots,sitemap}.ts`, `src/app/opengraph-image.{png,alt.txt}`
  - `src/components/{account,home,site}/`, `tests/e2e/public-access.spec.ts`, `docs/platform/LANSMAN.md`
- Değişen:
  - `next.config.mjs`, `src/middleware.ts`, `src/app/layout.tsx`, `src/app/page.tsx`
  - `src/app/{seri,guvenlik,boun}/**/page.tsx`, `src/app/read/[slug]/page.tsx`, `src/app/login/{page,actions}.ts(x)`
  - `src/app/api/reader-{sync,reset}/route.ts` (+ reset testi)
  - `src/lib/auth/{authenticate,password-gate,require-reader-session,session-user,user-schema,users}.ts` (+ testler)
  - `src/lib/db/schema.ts`, `src/lib/reader-data/{use-reader-data.tsx,storage.ts}`, `src/lib/reader-data/server/{sync,reset}-service.ts` (+ testler)
  - `src/lib/preferences/storage.ts`, `src/lib/progress/use-reader-progress.tsx`, `src/lib/content/labels.ts`
  - `src/components/reader/{lock-button,sync-status,reader-shell}.tsx`, `src/components/series/{series-landing,series-progress-reset}.tsx`, `src/components/dashboard/reader-dashboard.tsx`
  - `tests/e2e/auth.spec.ts`
- Run 7'nin dosyalarına (`content/series/**`, `docs/seri/**`) dokunulmadı. `.wolf/*` OpenWolf protokolü gereği güncellendi.

## Kayıt

- 13:15 Keşif tamamlandı; tasarım yukarıda.
- 14:07 L1–L5 kodlandı, birim testleri yeşil. Yan bulgular ve düzeltmeler:
  - Seri sıfırlamada `reset_by` → `users` FK'si: okuyucu kimliğiyle 503'e düşerdi; okuyucuda NULL.
  - `readReaderData` bloklu depolamada fırlatıyordu (sayfa çökerdi); boş veriye düşüyor.
  - `readPreferences` ilk okumada varsayılanları yazıyordu; artık yalnız ayar değişince yazıyor.
  - Kısıtlı koleksiyonlarda `generateMetadata` erişim denetimi eklendi (404 sayfasında başlık sızmasın).
- Bilinen eski sorun: `pnpm lint` HEAD'de de kırmızı (`src/lib/content/schema.ts` 3 kullanılmayan değişken); bu işin kapsamı dışında, raporlanacak.
- 14:12 E2E (dev sunucu, veritabanısız): `public-access.spec.ts` (yeni, 17 test) + güncellenen `auth.spec.ts` (18 test) → 35/35 geçti.
  - Kapsam: anonim erişim, yönlendirmeler, API retleri, sunucu HTML'inde tam metin/canonical/JSON-LD.
  - Kapsam: sitemap/robots, yeniden açılışta "kaldığın yer", bloklu depolama, yerel sıfırlama, 375 px taşma.
- 14:13 Migration: Neon HTTP protokolünü PGlite'a (gerçek Postgres 17, WASM) çeviren yerel taklit kuruldu (scratchpad).
  - Değiştirilmemiş `scripts/migrate.mjs` 0000–0006'yı temiz uyguladı; ikinci koşuda hepsi "atlandı" (idempotent).
- Doğrulama araçları (repo dışında, scratchpad): `neon-shim.mjs`, `neon-fetch-redirect.cjs`, `og-image.cjs`, `a11y-launch.mjs`; axe-core 4.10.2 ve PGlite 0.3.14 yalnız scratchpad'e kuruldu (proje bağımlılığı değil).

- 14:20 Tam e2e (veritabanısız): 87 geçti, 1 atlandı, 2 başarısız (eşitleme testleri). Aynı testler PGlite ile 4/4 geçti; ortam bağımlılığı.
- 14:25 Veritabanlı matris kayıt adımında kurtarma kodu kaybını yakaladı. Düzeltildi: `/kayit` artık yönlendirmiyor, form yerinde kalıyor.
- 14:30 Taklitte PGlite'ın tip-serializer'ı metin boolean'ı reddetti (Neon'da Postgres ayrıştırır). Taklit metin geçirecek şekilde düzeltildi; uygulama kusuru değil.
- 14:40 Üretim modu: başlıklar, çerez, dış istek, OG; axe 2 bulgu düzeltildi; 40 satırda 0 ihlal.
- 14:50 Son kapılar: tsc 0, vitest 943/943, build başarılı, e2e 35/35, veritabanlı 9/9 + 4/4.
  - E2E zamanlama yarışı: tekerlek olayı hidrasyondan önce gidiyordu. Teste "okuyucu hazır" beklemesi eklendi.
- 15:05 Sunucular ve taklit kapatıldı, `test-results/` silindi. Kayıtlar güncellendi. Canlıya alınmadı (yukarıdaki engeller).
- 15:25 Kullanıcının isteğiyle eski lint borcu kapatıldı. Çalışma davranışı değişmedi.
  - `eslint.config.mjs`: git dışı çıktı klasörleri (`artifacts/`, `dist/`, `build/`, `out/`, `.vercel/`, `.cache/`, `.pnpm-store/`) yok sayıldı; `**/*.cjs` için CommonJS ayarı eklendi (`require` serbest).
  - `src/lib/content/schema.ts`: yalnız tip için kurulan üç zod şeması kaldırıldı. Tipler fabrikalardan örnekleme ifadesiyle türetiliyor; eski ve yeni tiplerin birebir aynı olduğu geçici bir tip eşitliği denetimiyle kanıtlandı (yanlış eşleştirme hata verdi).
  - Sonuç: `eslint .` 147 → 0. `pnpm check` (tsc + lint + 943 test + build) çıkış 0. Commit yok.
- 15:58 (açık kaynak işi, `docs/platform/ACIK-KAYNAK.md`) Lansman artık koddan da kapalı: `PUBLIC_LAUNCH=1` verilmedikçe site eski özel kütüphane gibi davranır. Kodun `main`'e girmesi siteyi açmaz; açmak için ortam değişkeni ve yeniden deploy gerekir (yukarıdaki adımlara ek: Vercel Production'a `PUBLIC_LAUNCH=1`). Önizleme derlemeleri artık migration çalıştırmaz (`MIGRATE_ON_PREVIEW=1` hariç).

- 2026-11-04 Kullanıcı lansmanı başlattı: veri sorumlusu `Naci Anıl Akman` olarak eklendi (kullanıcının tercihiyle yalnız ad; iletişim kanalı yok, `DATA_CONTROLLER.contact` isteğe bağlı oldu). Production alan adı `anil-lib.vercel.app`. Vercel ayarlarını (alan adı, `SITE_URL`, `PUBLIC_LAUNCH=1` — `PUBLIC_` öneki nedeniyle Secret değil Config tipiyle —, Deployment Protection, redeploy) kullanıcı kendisi yapıyor.
- 2026-11-04 Kullanıcının isteğiyle KVKK başvuru kanalı eklendi: `nacianilakman@gmail.com` (`DATA_CONTROLLER.contact`).
