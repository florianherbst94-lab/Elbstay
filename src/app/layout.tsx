import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DirectBookingBanner } from "@/components/layout/DirectBookingBanner";
import { Suspense } from "react";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import Script from "next/script";
import { siteConfig } from "@/lib/data/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
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
  authors: [{ name: siteConfig.owner }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteConfig.url,
    title: "ElbStay | Stilvoll wohnen in Dresden",
    description: "Zentrumsnahe Boutique-Apartments in Dresden an der Elbe. Entdecken Sie ElbStay Urban, Premium und Boutique. Jetzt direkt buchen.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/dresden_hero_user_final.jpg",
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
    canonical: siteConfig.url,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteConfig.url}/#organization`,
                  "name": siteConfig.name,
                  "url": siteConfig.url,
                  "logo": `${siteConfig.url}/images/elbstay-logo-official.png`,
                  "description": siteConfig.description,
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": siteConfig.contact.phone,
                    "contactType": "customer service"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteConfig.url}/#website`,
                  "url": siteConfig.url,
                  "name": siteConfig.name
                },
                {
                  "@type": "LodgingBusiness",
                  "@id": `${siteConfig.url}/#lodging`,
                  "name": `${siteConfig.name} Dresden`,
                  "url": siteConfig.url,
                  "image": `${siteConfig.url}/images/dresden_hero_user_final.jpg`,
                  "priceRange": "€€",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": siteConfig.contact.address.street,
                    "addressLocality": siteConfig.contact.address.city,
                    "addressRegion": "Sachsen",
                    "postalCode": siteConfig.contact.address.zip,
                    "addressCountry": "DE"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 51.0504,
                    "longitude": 13.7373
                  },
                  "makesOffer": {
                    "@type": "Offer",
                    "name": "Direktbuchungs-Vorteil",
                    "description": "Direkt buchen und Plattform-Gebühren sparen.",
                    "priceCurrency": "EUR",
                    "url": `${siteConfig.url}/#apartments`
                  }
                }
              ]
            })
          }}
        />
        {children}
        <Suspense fallback={null}><GoogleAnalytics /></Suspense>
        <DirectBookingBanner />
        <Script 
          src="https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js"
        />
        <Script 
          strategy="lazyOnload"
          src="https://hospitable.b-cdn.net/direct-property-widget/hospitable-property-widget.prod.js"
        />
      </body>
    </html>
  );
}
