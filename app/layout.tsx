import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { SITE, CITIES } from "@/lib/config";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const description =
  "DELISHAS — премиальная клубника в шоколаде ручной работы. Коробки, букеты, наборы-сердца и подарочные сеты. Доставка по Астане и Караганде. Заказ за 3 минуты через WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "DELISHAS — Клубника в шоколаде · Астана и Караганда",
    template: "%s · DELISHAS",
  },
  description,
  applicationName: SITE.name,
  keywords: [
    "клубника в шоколаде",
    "клубника в шоколаде Астана",
    "клубника в шоколаде Караганда",
    "шоколадтағы құлпынай",
    "букет из клубники",
    "подарочные наборы",
    "макарон",
    "DELISHAS",
    "delish.as",
    "премиум десерты",
    "доставка десертов Астана",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    url: SITE.url,
    siteName: SITE.name,
    title: "DELISHAS — Клубника в шоколаде · Астана и Караганда",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "DELISHAS — Клубника в шоколаде",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "food",
};

export const viewport: Viewport = {
  themeColor: "#f4ecdd",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: SITE.name,
    description,
    url: SITE.url,
    image: `${SITE.url}/opengraph-image.png`,
    priceRange: "₸₸",
    sameAs: [SITE.instagram],
    telephone: SITE.primaryPhoneDisplay,
    servesCuisine: "Desserts",
    address: CITIES.map((c) => ({
      "@type": "PostalAddress",
      addressLocality: c.name.ru,
      streetAddress: c.address.ru,
      addressCountry: "KZ",
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="kk"
      className={`${playfair.variable} ${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-sm focus:text-cream-50"
          >
            →
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <FloatingWhatsApp />
        </Providers>
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
