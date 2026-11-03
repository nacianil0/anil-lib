# Açık kaynak ve main entegrasyonu: kontrol dosyası

Başlangıç: 2026-11-03 15:30 (TST) · Durum: **SÜRÜYOR**. Kapsam: kullanıcının "Anıl-Lib'i fork edilebilir
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
