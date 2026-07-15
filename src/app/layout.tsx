import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { Header } from "@/components/chrome/Header";
import { StickyCallButton } from "@/components/chrome/StickyCallButton";
import { Footer } from "@/components/chrome/Footer";
import { SmoothScroll } from "@/lib/scroll";
import { site } from "@/lib/site-config";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — 24/7 Heating & Cooling in Fairview`,
    template: `%s — ${site.name}`,
  },
  description: `Heating, cooling and air quality for ${site.serviceArea}. 24/7 emergency service, licensed & insured, since ${site.since}. ${site.tagline}`,
};

export const viewport: Viewport = {
  themeColor: "#0a0c10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="type-plate fixed top-2 left-2 z-[60] -translate-y-16 rounded-md bg-mist px-4 py-2 text-night transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyCallButton />
      </body>
    </html>
  );
}
