import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSessionUser } from "@/lib/auth/session-user";
import { DATA_CONTROLLER, PRIVACY_UPDATED_AT, SITE_NAME } from "@/lib/site";
import { PrivacyControls } from "./privacy-controls";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gizlilik ve çerezler",
  description: `${SITE_NAME}'in tarayıcında ve sunucuda neyi, neden ve ne kadar süre tuttuğu.`,
  alternates: { canonical: "/gizlilik" },
  robots: { index: true, follow: true },
};

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-6 font-serif text-2xl font-semibold leading-snug">
      {children}
    </h2>
  );
}

const cell = "border-t border-border px-3 py-2.5 align-top";
const head = "px-3 py-2 text-left font-mono text-2xs uppercase tracking-[0.12em] text-text-faint";

/**
 * Written from the code, not from a template: every cookie and storage key named here
 * is one the site actually sets (src/lib/auth/session-cookie.ts, src/lib/reader/version.ts,
 * src/lib/reader-data/local-tracking.ts), and nothing it does is left out. A change to
 * what the site stores must change this page in the same commit.
 */
export default async function PrivacyPage() {
  const signedIn = Boolean(await getSessionUser());
  const updated = new Intl.DateTimeFormat("tr-TR", { dateStyle: "long" }).format(
    new Date(`${PRIVACY_UPDATED_AT}T12:00:00Z`),
  );

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <SiteHeader signedIn={signedIn} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <article className="mx-auto max-w-3xl px-5 py-10 font-sans text-[0.95rem] leading-relaxed text-text-muted sm:px-8 sm:py-14">
          <p className="font-mono text-2xs uppercase tracking-[0.2em] text-accent">
            Son güncelleme: {updated}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-text">
            Gizlilik ve çerezler
          </h1>
          <p className="mt-4 text-text">
            Bu sayfa, {SITE_NAME}’in tarayıcında ve sunucuda neyi, neden ve ne kadar süre tuttuğunu
            anlatır. Aşağıdaki her çerez ve depolama anahtarı sitenin kodunda gerçekten
            kullanılanlardır; listede olmayan bir şey tutulmaz.
          </p>

          <H2 id="kisaca">Kısaca</H2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              Analitik, reklam ya da üçüncü taraf izleme çerezi yok. Sayfalar başka bir alan adından
              betik, yazı tipi ya da görsel yüklemez.
            </li>
            <li>
              Hesap açmadan okuyorsan hiçbir çerez yazılmaz. Kaldığın yer yalnızca bu tarayıcının
              yerel deposunda (<code className="font-mono text-sm">localStorage</code>) tutulur ve
              sunucuya gönderilmez.
            </li>
            <li>
              Hesapla okursan tek çerez oturum çerezidir. Okuma bilgilerin, cihazların arasında
              eşitlenebilmesi için sunucuda saklanır; hesabını istediğin an silebilirsin.
            </li>
          </ul>

          <H2 id="cerezler">Çerezler</H2>
          <div
            className="mt-4 overflow-x-auto rounded-md border border-border bg-surface"
            role="region"
            aria-label="Çerezler tablosu"
            // Scrolls sideways on a phone; focusable so the keyboard can scroll it too.
            tabIndex={0}
          >
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <caption className="sr-only">Sitenin yazdığı çerezler</caption>
              <thead>
                <tr>
                  <th scope="col" className={head}>
                    Ad
                  </th>
                  <th scope="col" className={head}>
                    Ne zaman
                  </th>
                  <th scope="col" className={head}>
                    Süre
                  </th>
                  <th scope="col" className={head}>
                    Amaç
                  </th>
                </tr>
              </thead>
              <tbody className="text-text">
                <tr>
                  <td className={`${cell} font-mono text-xs`}>anil_lib_auth</td>
                  <td className={cell}>Giriş yaptığında ya da hesap açtığında</td>
                  <td className={cell}>
                    “Beni hatırla” işaretli değilse tarayıcıyı kapatınca silinir (sunucu tarafında
                    en çok 12 saat geçerli). İşaretliyse 7 gün.
                  </td>
                  <td className={cell}>
                    Hesabınla açtığın oturumu tanımak. HttpOnly, Secure ve SameSite=Lax; sayfadaki
                    betikler okuyamaz, başka sitelere gönderilmez.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            Bu çerez, istediğin hizmeti, yani hesabınla okumayı sunmak için gereklidir ve başka bir
            amaçla kullanılmaz. Tarayıcıyı kapattıktan sonra da süren bir oturum yalnızca giriş
            ekranındaki “Beni hatırla” kutusunu kendin işaretlersen kurulur.
          </p>

          <H2 id="yerel-okuma">Tarayıcında saklananlar</H2>
          <p className="mt-4">
            Aşağıdakiler bu tarayıcının yerel deposunda durur. Hesapsız okurken hiçbiri sunucuya
            gönderilmez; tarayıcının site verilerini silerek ya da sayfanın sonundaki düğmelerle
            istediğin an kaldırabilirsin.
          </p>
          <div
            className="mt-4 overflow-x-auto rounded-md border border-border bg-surface"
            role="region"
            aria-label="Yerel depolama tablosu"
            tabIndex={0}
          >
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <caption className="sr-only">Yerel depoda tutulan anahtarlar</caption>
              <thead>
                <tr>
                  <th scope="col" className={head}>
                    Anahtar
                  </th>
                  <th scope="col" className={head}>
                    Ne tutar
                  </th>
                  <th scope="col" className={head}>
                    Ne zaman yazılır
                  </th>
                </tr>
              </thead>
              <tbody className="text-text">
                <tr>
                  <td className={`${cell} font-mono text-xs`}>anil-lib:reader-data:v2:local</td>
                  <td className={cell}>
                    Hesapsız okurken: son okuduğun yazı, yazılardaki konumun, bitirdiklerin, yer
                    imlerin ve vurguladığın metin parçaları. Ayrıca bu tarayıcıya özgü rastgele bir
                    cihaz numarası; hesapsız modda hiçbir yere gönderilmez.
                  </td>
                  <td className={cell}>Bir yazıyı okurken. Kaydetmeyi aşağıdan kapatabilirsin.</td>
                </tr>
                <tr>
                  <td className={`${cell} font-mono text-xs`}>
                    anil-lib:reader-data:v2:&lt;hesap&gt;
                  </td>
                  <td className={cell}>
                    Hesapla okurken aynı bilgilerin bu tarayıcıdaki kopyası ve henüz sunucuya
                    ulaşmamış değişiklikler. Her hesabın kendi anahtarı vardır; bir hesap ötekinin
                    ya da hesapsız okumanın verisini görmez. Oturumu kapatınca kopya tarayıcıda
                    kalır; ortak bir bilgisayardaysan aşağıdan silebilirsin.
                  </td>
                  <td className={cell}>Hesapla okurken.</td>
                </tr>
                <tr>
                  <td className={`${cell} font-mono text-xs`}>anil-lib:reader-preferences:v1</td>
                  <td className={cell}>Okuma ayarların: tema, yazı boyutu, satır aralığı gibi.</td>
                  <td className={cell}>Yalnızca bir ayarı değiştirdiğinde.</td>
                </tr>
                <tr>
                  <td className={`${cell} font-mono text-xs`}>anil-lib:local-reading:v1</td>
                  <td className={cell}>
                    Hesapsız okurken kaldığın yeri saklamayı kapattıysan bu tercihi.
                  </td>
                  <td className={cell}>Yalnızca kapattığında.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            Sitenin eski sürümlerinden kalmış olabilecek üç anahtar (
            <code className="font-mono text-xs">anil-lib:reader-progress:v1</code>,{" "}
            <code className="font-mono text-xs">anil-lib:reader-data:v2</code>,{" "}
            <code className="font-mono text-xs">anil-lib:theme</code>) yalnızca bir kez taşınmak
            için okunur ve sonra silinir. Çerez, oturum deposu (sessionStorage) ya da IndexedDB
            başka hiçbir amaçla kullanılmaz.
          </p>

          <H2 id="hesap">Hesap açarsan sunucuda saklananlar</H2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-text">Hesap bilgileri:</strong> kullanıcı adın;
              parolanın kendisi değil, scrypt ile üretilmiş özeti; kurtarma kodunun SHA-256 özeti;
              hesabın açılış, son giriş ve son parola değişikliği zamanları. E-posta adresi ya da
              başka bir kişisel bilgi istenmez.
            </li>
            <li>
              <strong className="font-semibold text-text">Okuma bilgileri:</strong> yazılardaki
              ilerlemen ve konumun, yer imlerin, vurguladığın metin parçaları ve bunların
              eşitlenmesi için gereken kayıtlar (işlem numarası, cihaz numarası, zaman).
            </li>
            <li>
              <strong className="font-semibold text-text">Kötüye kullanıma karşı sayaçlar:</strong>{" "}
              giriş, hesap açma ve kurtarma denemelerini sınırlamak için tutulur. IP adresi ve
              kullanıcı adı bu sayaçlarda düz metin olarak durmaz; yalnızca geri çevrilemeyen bir
              özetleri (HMAC) tutulur. Bir günden eski sayaçlar, yeni denemeler kaydedilirken
              silinir.
            </li>
          </ul>
          <p className="mt-4">
            <strong className="font-semibold text-text">Amaç:</strong> hesabını ve okuma
            bilgilerinin eşitlenmesini sağlamak, hesapları ve siteyi kötüye kullanıma karşı korumak.
            Bu bilgiler reklam ya da profil çıkarma için kullanılmaz, satılmaz, kimseyle
            paylaşılmaz.
          </p>
          <p className="mt-3">
            <strong className="font-semibold text-text">Süre:</strong> hesap bilgileri ve okuma
            bilgilerin hesabını silene kadar durur. “Hesabım” sayfasındaki silme işlemi hesabı ve
            ona bağlı bütün okuma bilgilerini tek seferde, kalıcı olarak siler.
          </p>
          <p className="mt-3">
            <strong className="font-semibold text-text">Altyapı:</strong> site Vercel’de
            barındırılır; hesap ve okuma bilgileri Neon’un PostgreSQL veritabanında tutulur. Bu
            hizmet sağlayıcıların sunucuları Türkiye dışında olabilir. Barındırma sağlayıcısı,
            siteyi sunabilmek için istek kayıtları (örneğin IP adresi, zaman, istenen adres)
            tutabilir; bu kayıtlar sağlayıcının kendi politikasına tabidir.
          </p>

          <H2 id="haklar">Hakların</H2>
          <p className="mt-4">
            6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 11. maddesi uyarınca kişisel
            verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi isteme, düzeltilmesini ya da
            silinmesini isteme ve itiraz etme hakların var. Hesabını ve okuma bilgilerini kendin
            silebilirsin; tarayıcındaki bilgiler zaten yalnızca senin elinde.
          </p>
          <p className="mt-3">
            <strong className="font-semibold text-text">Veri sorumlusu ve iletişim:</strong>{" "}
            {DATA_CONTROLLER ? (
              <>
                {DATA_CONTROLLER.name} · {DATA_CONTROLLER.contact}
              </>
            ) : (
              <span className="rounded bg-accent-soft px-1.5 py-0.5 text-accent">
                Henüz eklenmedi; site herkese açılmadan önce sahibi tarafından eklenecek.
              </span>
            )}
          </p>

          <H2 id="kontroller">Bu tarayıcıda senin denetimin</H2>
          <div className="mt-4 rounded-md border border-border bg-surface p-4 sm:p-5">
            <PrivacyControls />
          </div>
          <p className="mt-3 text-sm">
            Hesapla okuyorsan “bütün verimi sil” yalnızca bu tarayıcıdaki kopyayı siler; henüz
            eşitlenmemiş son değişiklikler dışında her şey sunucuda durur ve bir sonraki girişte
            geri gelir. Hesabın kendisi için{" "}
            <Link
              href="/hesap"
              className="text-accent underline underline-offset-4 hover:no-underline"
            >
              Hesabım
            </Link>{" "}
            sayfasına bak.
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
