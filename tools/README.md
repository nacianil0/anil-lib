# tools

`anil-lib-reader` icin iki islemi tek adima indiren kucuk bir Windows arac
klasoru: **localde calistir** ve **publish al**.

Tum yollar `tools/` klasorunun konumundan cozulur; makineye ozel mutlak yol
yoktur, temiz bir clone sonrasi da calisir.

## Klasor yapisi

```
tools/
  dev/
    01-Dev-Baslat.cmd      -> local gelistirme sunucusu
    00-Dev-Durdur.cmd      -> dev portunda kalan node surecini durdurur
  publish/
    04-Publish-And-Zip.cmd -> production build + paket + zip
  lib/
    Common.psm1            -> ortak yardimcilar (kok cozumu, pnpm, port, guvenli silme)
    Start-Dev.ps1
    Stop-Dev.ps1
    Invoke-Publish.ps1
```

## Local calistirma

```
tools\dev\01-Dev-Baslat.cmd
```

Sirasiyla: Node >= 20 kontrolu -> `pnpm install --frozen-lockfile` (yalnizca
gerekiyorsa) -> local env dosyasi kontrolu -> port kontrolu -> `next dev`.
Sunucu hazir olunca tarayici acilir.

- Baska port: `tools\dev\01-Dev-Baslat.cmd -Port 3010`
- Tarayici acma: `tools\dev\01-Dev-Baslat.cmd -NoBrowser`
- Port mesgulse script baslamaz ve portu tutan sureci adiyla yazar.
  `tools\dev\00-Dev-Durdur.cmd` yalnizca o portu dinleyen `node` surecini
  durdurur; baska bir uygulama tutuyorsa dokunmaz ve hata verir.

`.env.local` yoksa uygulama yine acilir; sifre kapisi ve Neon senkronu devre
disi kalir ve script bunu uyari olarak bildirir. Gercek degerler icin
`.env.example` dosyasini `.env.local` olarak kopyalayin (bu dosya
`.gitignore` kapsamindadir).

## Publish alma

```
tools\publish\04-Publish-And-Zip.cmd
```

Akis:

1. `.next` ve onceki paket klasoru silinir (bayat cikti paketlenmesin diye).
2. `pnpm typecheck` (sert kapi) ve `pnpm lint` calisir.
3. `pnpm build` ile production build alinir; ciktinin bu calismada uretildigi
   `BUILD_ID` zaman damgasiyla dogrulanir.
4. Build ciktisi gercekten `next start` ile baslatilir; `GET /login` -> 200 ve
   sayfanin refere ettigi `/_next/static` varligi -> 200 beklenir.
5. Paket `artifacts\latest` altinda toplanir: `.next` (cache haric), `content/`,
   `package.json`, `pnpm-lock.yaml`, `next.config.mjs`, `.env.example`,
   `RELEASE.txt`.
6. Paket butunlugu dogrulanir: gerekli dosyalar var mi, `.next\static` bos mu,
   katalogdaki her icerik dosyasi pakete girmis mi.
7. `artifacts\anil-lib-reader-<surum>-<zaman>.zip` uretilir.

Herhangi bir adim basarisiz olursa script durur, `[HATA]` yazar, sifirdan
farkli exit code doner ve **zip uretilmez**.

`lint` varsayilan olarak publish'i durdurmaz: proje `next build` sirasinda
ESLint'i zaten devre disi birakiyor (`next.config.mjs` icinde
`eslint.ignoreDuringBuilds`), yani lint ayri bir kalite kapisi. Cikti yine tam
olarak gosterilir ve sonuc ozetinde uyari olarak tekrarlanir. Bloklamasini
istiyorsaniz `-StrictLint` kullanin. `typecheck` her zaman sert kapidir.

Secenekler:

- `-SkipChecks` : typecheck/lint atla
- `-StrictLint` : lint hatasi publish'i durdursun
- `-NoSmoke` : build ciktisini baslatip dogrulama adimini atla
- `-NoZip` : yalnizca `artifacts\latest` birak
- `-OutputRoot <yol>` : cikti klasorunu degistir

`artifacts/` klasoru `.gitignore` kapsamindadir; paket, zip ve smoke loglari
repoya girmez.

### Uretilen paketi calistirma

```
cd artifacts\latest
corepack pnpm install --prod --frozen-lockfile
set DATABASE_URL=...
set SITE_PASSWORD_SHA256=...
set AUTH_COOKIE_SECRET=...
corepack pnpm start
```

Ayrintilar paketin icindeki `RELEASE.txt` dosyasinda.

## Notlar

- Scriptler pnpm'i `corepack` uzerinden cagirir; boylece PATH'teki global pnpm
  surumunden bagimsiz olarak `package.json` icindeki `packageManager` surumu
  kullanilir. `corepack` yoksa PATH'teki pnpm'e duser ve uyari yazar.
- Paket kendi kendine yeten bir bundle degil; hedefte bir kez
  `pnpm install --prod` gerekir. Next'in `output: "standalone"` secenegi burada
  kullanilmadi: pnpm'in symlink tabanli `node_modules` duzeniyle birlikte
  Windows'ta Developer Mode kapaliyken `EPERM: symlink` hatasi veriyor. Bu
  yuzden proje yapilandirmasi degistirilmedi; normal `next build` ciktisi
  paketleniyor ve Vercel derlemesi aynen eskisi gibi calisiyor.
- Birim/e2e testler bu akisin disindadir; hepsini birlikte calistirmak icin
  `pnpm check` kullanin (`vitest` icin once `pnpm rebuild esbuild`,
  Playwright icin `pnpm exec playwright install chromium` gerekir).
