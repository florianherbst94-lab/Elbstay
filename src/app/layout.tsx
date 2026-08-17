import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DirectBookingBanner } from "@/components/layout/DirectBookingBanner";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elbstay.de"),
  title: {
    default: "ElbStay | Stilvoll wohnen in Dresden",
    template: "%s | ElbStay Dresden",
  },
  description: "Erleben Sie Boutique-Apartments in Dresden. Zentrumsnahe Ferienwohnungen an der Frauenkirche für Paare, Familien und Business-Gäste. Buchen Sie direkt für den besten Preis.",
  keywords: [
    "Ferienwohnung Dresden", 
    "Unterkunft Dresden", 
    "Boutique Apartment", 
    "ElbStay", 
    "Apartment an der Frauenkirche", 
    "Business Apartment Dresden",
    "Design Ferienwohnung",
    "Dresden Urlaub"
  ],
  authors: [{ name: "ElbStay" }],
  creator: "ElbStay",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://elbstay.de",
    title: "ElbStay | Stilvoll wohnen in Dresden",
    description: "Zentrumsnahe Boutique-Apartments in Dresden an der Elbe. Entdecken Sie ElbStay Urban, Premium und Boutique. Jetzt direkt buchen.",
    siteName: "ElbStay Boutique Apartments",
    images: [
      {
        url: "/images/dresden_hero_user_final.jpg", // We use the beautiful hero image as the fallback sharing image
        width: 1200,
        height: 630,
        alt: "Dresden Skyline bei Sonnenuntergang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ElbStay | Stilvoll wohnen in Dresden",
    description: "Zentrumsnahe Boutique-Apartments in Dresden an der Elbe. Entdecken Sie ElbStay Urban, Premium und Boutique. Jetzt direkt buchen.",
    images: ["/images/dresden_hero_user_final.jpg"],
  },
  alternates: {
    canonical: "https://elbstay.de",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${playfair.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background overflow-x-hidden">
        {children}
        <DirectBookingBanner />
        <Script 
          src="https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
