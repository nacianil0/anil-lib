import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-newsreader",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "Yapay Zekâyı Okumak",
    template: "%s — Yapay Zekâyı Okumak",
  },
  description:
    "Yapay zekâ ve büyük dil modelleri üzerine, temellerden sınıra sıralı bir okuma rehberi.",
  robots: { index: false, follow: false },
};

// Apply the persisted (or system) theme before paint to avoid a flash.
const themeScript = `(()=>{try{var p=localStorage.getItem("anil-lib:reader-preferences:v1");var t="system";if(p){try{var o=JSON.parse(p);if(o&&o.theme)t=o.theme;}catch(e){}}else{var m=localStorage.getItem("anil-lib:theme");if(m==="dark"||m==="light")t=m;}var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg font-sans text-text antialiased">{children}</body>
    </html>
  );
}
