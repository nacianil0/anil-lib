# Açık kaynak ve main entegrasyonu: kontrol dosyası

Başlangıç: 2026-11-03 15:30 (TST) · Bitiş: 16:35 · Durum: **MAIN'E ALINDI; lansman kapalı**. Kapsam: kullanıcının "Anıl-Lib'i fork edilebilir
açık kaynak projeye dönüştür ve güvenli main entegrasyonunu tamamla" promptu.

## Doğrulanan başlangıç durumu

- **Dallar:** `lansman/public-okuma` yerelde ve remote'ta `7a905f5`'te. `origin/main` `5d8d837`'de; dal ondan dört commit
  önde (`c70a1c1`, `800e148`, `adab9f2`, `7a905f5`). Main bu arada ilerlememiş.
- **GitHub:** CI yok (`.github` yoktu), dal koruması yok, ruleset yok, lisans yok, hiç PR açılmamış. Depo public.
  Private vulnerability reporting kapalı.
- **Vercel:** GitHub üzerinden otomatik deploy var. `main` → Production, diğer dallar → Preview (`7a905f5` için
  Preview deployment "success").
  - Proje ayarlarına erişim yok (CLI yok, belirteç yok). Bu yüzden Preview ve Production'ın aynı `DATABASE_URL`'i
    kullanıp kullanmadığı **doğrulanamadı**.
- **Bağımlılık lisansları:** MIT (36), Apache-2.0 (3), ISC (1). Yazı tipleri (Inter, Newsreader, JetBrains Mono) SIL OFL.
- **Projenin kendi lisansı:** belgelerde, commit'lerde ya da dosyalarda bir lisans kararı yok. Seçim yapılmadı;
  kullanıcı kararı.

## Gizli bilgi ve kişisel veri taraması (çalışma ağacı + bütün Git geçmişi)

- **Gizli değer:** yok.
  - `SITE_PASSWORD_SHA256` / `AUTH_COOKIE_SECRET` geçen yerlerin hepsi `playwright.config.ts`'teki herkese açık
    test değerleri ya da boş atama talimatı.
  - `drizzle.config.ts`'teki bağlantı dizesi `invalid:invalid@localhost` yer tutucusu.
- **Kişisel ya da iç veri (geçmişte zaten herkese açık):**
  - Commit yazar e-postası, 190 commit.
  - `C:\Users\anil.akman` yolları: `.wolf/`, `docs/seri/BAKIM-RUN6.md` ve `BAKIM-RUN7.md`, `prompts/03-…`.
  - `docs/superpowers/specs/2026-06-27-vercel-password-gate-design.md`, sahip parolasının başka bir sitedekiyle aynı
    olduğunu yazıyor. Özet ya da parola yok; yine de parola yeniden kullanımını açık ediyor.
- **Bu işin kendi sızıntısı:** `800e148`'deki `LANSMAN.md` Vercel takım alan adını içeriyordu. Belgeden çıkarıldı;
  remote dalın geçmişinde kalıyor. Force push yasak olduğu için geçmiş yeniden yazılmadı. Adres SSO arkasında.

## Yapılan değişiklikler

- **Lansman anahtarı (`PUBLIC_LAUNCH`):** varsayılan kapalı. Kapalıyken:
  - middleware yalnız `/login` ve `/robots.txt`'yi oturumsuz geçirir;
  - kayıt ve kurtarma eylemleri reddeder (her yoldan çağrılabildikleri için kendileri denetler);
  - `robots.txt` her şeyi yasaklar, sitemap boştur;
  - giriş sayfası kayıt bağlantılarını göstermez.
- **Önizleme migration koruması:** `scripts/migrate.mjs`, `VERCEL_ENV=preview` iken `MIGRATE_ON_PREVIEW=1` olmadıkça
  veritabanına bağlanmadan çıkar.
- **Açık kaynak belgeleri:**
  - `README.md`, `docs/FORKING.md`, `CONTRIBUTING.md`, `SECURITY.md`;
  - `.github/ISSUE_TEMPLATE/*`, `.github/PULL_REQUEST_TEMPLATE.md`;
  - `docs/templates/series/*` ve şablonların şemaya göre geçerliliğini sabitleyen test;
  - `.env.example` bütün ayarlarla güncellendi.
- **Temizlik:** kökte izlenen 7 boş, kazara oluşmuş dosya (`Karar`, `Yaşayan`, `her`, `ritmi`, `sinyal`,
  `yapılırsa`, `**Bu`) silindi.

## Kayıt

- 15:30 Başlangıç doğrulamaları ve tarama.
- 15:40 Lansman anahtarı, migration koruması ve belgeler yazıldı. tsc 0, vitest 948/948, eslint 0.
- 15:45 Temiz klon (`git clone --branch lansman/public-okuma`, ayrı klasör) kanıtı:
  - `pnpm install --frozen-lockfile` 17 sn. Kodda yazara özel servis, adres ya da anahtar yok (grep boş).
  - `pnpm check` çıkış 0 (948 test, derleme). İçerik araçları (`ai`, `guvenlik`, SVG, hash) "Sorun yok".
  - (a) Ortam değişkeni yokken `pnpm dev`: bütün yollar 200 (sahip olarak açık).
  - (b) Kapı açık, `PUBLIC_LAUNCH` yokken `next start`: `/`, `/seri`, yazı, `/kayit`, `/hesap-kurtar`, `/gizlilik`, `/sitemap.xml` → 307 `/login`. `robots.txt` `Disallow: /`. Girişte kayıt bağlantısı yok.
  - (c) `PUBLIC_LAUNCH=1`: `/`, `/seri`, yazı, `/gizlilik`, `/kayit` 200. `/guvenlik`, `/boun`, `/read`, `/yonetim` → 307 `/login`. Sitemap 121 adres.
- 15:55 Yeni seri `demo`, `docs/FORKING.md` §3 adım adım uygulandı (betik: scratchpad `oss/add_demo_series.py`). İlk denemede üç eksik çıktı; rehber ve şablonlar düzeltildi:
  - `entegre-batch` `roadmap.json`'ı satır satır düzenliyor; yeniden biçimlendirilmiş dosyada "kompakt satır bulunamadı" verip durdu. Rehbere "yazı başına tek satır" kuralı eklendi.
  - İçerik denetleyicisi her seride en az bir şekil (metinde "Şekil N" diye anılan), 1–3 "Kendini yokla" kutusu ve "Sırada ne var" bölümü istiyor. Şablon yazı buna göre yeniden yazıldı; `first-figure.svg` şablonu eklendi.
  - `series-reset.test.ts` seri listesini bilerek sabitliyor. Rehbere adım olarak eklendi.
- Düzeltmelerden sonra:
  - Araçlar: `entegre-batch --write` katalog ve yol haritasını yazdı; hash, içerik ve SVG denetimleri "Sorun yok".
  - `pnpm check` çıkış 0. Derlemede `/demo` ve `/demo/ilk-yazi` var.
  - Dev'de `/demo` ve `/demo/ilk-yazi` 200 (başlık, şekil, kaynakça). Panel seriyi listeliyor; mevcut seri sayfaları 200.
  - `git diff`: mevcut serilerin içeriği, katalogları ve belgeleri değişmedi.
  - `0007` migration'ı PostgreSQL 17.5'te (PGlite) uygulandı; kısıt `demo`'yu kabul etti, bilinmeyen seriyi reddetti (23514).
- 16:05 Kapılar (dal `bc9025f`): `pnpm check` çıkış 0 (948 test, derleme). E2E `public-access` + `auth` 35/35. Veritabanlı erişim matrisi 9/9. Dalın `main`'e göre farkında gizli bilgi taraması temiz.
- 16:06 Kullanıcının hızlandırma talimatı: bağımsız işler paralel yürüyor.
  - Ajan A: tam e2e paketi, ayrı klonda ve 3150 portunda.
  - Ajan B: belge iddialarını koda karşı salt okunur denetliyor.
  - Ana oturum: push, PR, Vercel ve birleştirme.
  - Birleştirme A ve B'nin sonucunu bekler.
- 16:12 PR açıldı: https://github.com/nacianil0/anil-lib/pull/1 (head `bc9025f`, base `main`). GitHub mergeable; dal koruması ya da zorunlu kontrol yok.
  - Vercel Preview deployment `7519508374` "success". Bu derleme `VERCEL_ENV=preview` olduğu için migration'ı atlamış olmalı; Vercel günlüğüne erişim yok, çıkarım koddan.
- 16:15 Lansman kapalıyken axe: `/login`, `/seri`, `/kayit` × açık/koyu × 1440/375 = 12 satır, 0 ihlal. Hepsi `/login`'e iniyor, kayıt bağlantısı yok, taşma yok.
- 16:30 Ajan A, tam e2e paketi (ayrı klon `bc9025f`, port 3150, veritabanısız): 90 test, 86 geçti, 3 başarısız, 1 atlandı (`reader.spec.ts:249`, fikstürde ikinci kohort yok).
  - Başarısızlardan ikisi `reader-data.spec.ts:97` ve `:117`. Veritabanı yok, `/api/reader-sync` 503 dönüyor; PGlite ile geçtikleri daha önce gösterildi.
  - Üçüncüsü `reader.spec.ts:520`, sayfa çevirme. Yük altında bir zamanlama yarışı; tek başına 5/5 geçti. Kök neden `use-reader-layout.ts`'te: `turnPage`'in 600 ms penceresi dolunca hesap kaydırmanın ara konumundan yapılıyor.
  - Bu kod ve test bu dalda değişmedi (en son 2026-09-06); kusur `main`'de de var. **Yeşil sayılmadı**; ayrı işe bırakıldı.
- 16:20 Ajan B (belge iddialarını koda karşı salt okunur denetledi): 20 yanlış ve eksik buldu. Hepsi `3b232ad`'de düzeltildi. Başlıcaları:
  - Seri profili `ai` bloğundan kopyalanmalı, `guvenlik`'ten değil.
  - Herkese açık seri için gereken adımlar eksikti.
  - Lisans uyarısı yoktu.
  - Ağ erişimi anlatılmamıştı (next/font, Next telemetrisi).
  - SECURITY'de oran sınırı ve roller yanlıştı.
  - Gerçek test kapsamı fazla gösterilmişti.
  - Katalog doğrulamasının ne zaman yapıldığı yanlıştı.
  - Çapalar bozuktu; lisans ayrıntıları eksikti.
- 16:28 PR #1 birleştirme commit'iyle alındı. Force push yok, koruma atlatılmadı.
  - `origin/main` = `3c08f64`.
  - Dal başı `268ad79`; Vercel önizlemesi başarılı.
- 16:29 Production deployment `7520026603` (`3c08f64`): "Deployment has completed".
  - `vercel-build` migration hatasında durduğu için migration adımı hatasız geçti.
  - `0006`'nın bu derlemede mi uygulandığı, yoksa daha önceki bir önizlemede mi uygulandığı Vercel günlüğü olmadan ayırt edilemez. İki durumda da sonuç aynı.
- 16:31 Production takma adları anonim isteğe Vercel SSO'ya 302 veriyor (`/`, `/seri`, `/kayit`, `/robots.txt`). Erişim platform düzeyinde kapalı.
  - Uygulama düzeyinde de kapalı: `PUBLIC_LAUNCH` Vercel'de tanımlı değil (değişken yeni).
  - Uygulama yanıtı SSO arkasında olduğundan dışarıdan ölçülemedi.
- Yerel `main` `3c08f64`'e ileri sarıldı. Test sunucuları kapalı.
- Bu son satırlar o an commit edilmedi: yalnız kayıt için `main`'e push yeni bir production deploy tetiklerdi. Aşağıdaki işle birlikte gönderildi.
- 16:33 Lisansı kullanıcı kendisi seçip `main`'e gönderdi: `cb0a771` "lisans: kod MIT, içerik CC BY 4.0". Bu çalışmada lisans seçilmedi; yukarıdaki "lisans yok" tespitleri o saate kadar geçerli.
- Sayfa çevirme yarışı (yukarıda yeşil sayılmayan `reader.spec.ts:520`, bug-1003) ayrı işte düzeltildi: `c7ba2d5`.
  - Komut edilen sayfa artık kaydırma hedef offset'e varana ya da çizilen kareler onu 200 ms yerinde gösterene dek geçerli (600 ms tolerans, 4 s tavan).
  - Yük altında (16 çekirdekte 15 meşgul iş parçacığı, CPU %95–100, `--repeat-each=10`) yarış testi önce 10'da 5 düştü; düzeltmeyle iki ayrı koşuda 10/10.
  - Beş sayfalama testi aynı yükte 50 koşunun 49'unu geçti. Tek hata makinenin 17:00–18:20 Modern Standby'ına denk geldi (bug-1008); o test temiz tekrarda 10/10.
  - `reader.spec.ts` tamamı yüksüz: 18 geçti, 1 atlandı (fikstürde ikinci kohort yok).
  - `pnpm check` gönderilen ağaçta (`c7ba2d5`, `cb0a771` üstüne) yeşil: typecheck, lint, 53 test dosyası, build (197 sayfa).
- Kullanıcının talimatıyla ("her şey tamamlandığında tüm çalışmayı main'e pushla") düzeltme ve bu kayıtlar `main`'e ileri sarmalı push edildi. PR açılmadı (`main` korumasız, ruleset ve CI yok); force push yok. Deploy sonucu oturum raporunda; buraya yazmak yeni bir deploy gerektirirdi.

