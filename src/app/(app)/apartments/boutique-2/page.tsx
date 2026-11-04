
import type { Metadata } from "next";
import { getGalleries } from "@/lib/galleryService";
import { MapPin, Users, Home, Bed, Bath } from "lucide-react";

import { ApartmentGallery } from "@/components/apartment/ApartmentGallery";
import { MapWidget } from "@/components/apartment/MapWidget";
import { AmenitiesList } from "@/components/apartment/AmenitiesList";
import { boutiqueAmenities } from "@/lib/boutique/amenities";
import { ReviewsList } from "@/components/apartment/ReviewsList";

import { ApartmentDescription } from "@/components/apartment/ApartmentDescription";
import { ApartmentHeaderGallery } from "@/components/apartment/ApartmentHeaderGallery";
import { APARTMENTS } from "@/lib/data/apartments";
import { ViewItemTracker } from "@/components/layout/GoogleAnalytics";
import { event as gaEvent } from "@/components/layout/GoogleAnalytics";
import { boutiqueReviews } from "@/lib/boutique/reviews";
import { HospitableIframeSync } from "@/components/booking/HospitableIframeSync";
import { HospitableWidget } from "@/components/booking/HospitableWidget";

export const metadata: Metadata = {
  title: "ElbStay Boutique Apartment | Stilvoll wohnen in der Äußeren Neustadt",
  description: "Hochwertige 2-Raum-Ferienwohnung in der Äußeren Neustadt. Altbaucharme, Boxspringbett, Nespresso & Highspeed-WLAN. Jetzt direkt zum Bestpreis buchen!",
  keywords: [
    "Ferienwohnung Dresden Äußere Neustadt",
    "Boutique Apartment Dresden",
    "Unterkunft Marienallee Dresden",
    "Ferienwohnung Dresden direkt buchen"
  ],
  alternates: {
    canonical: "https://elbstay.de/apartments/boutique",
  },
  openGraph: {
    title: "ElbStay Boutique Apartment | Stilvoll wohnen in der Äußeren Neustadt",
    description: "Hochwertige 2-Raum-Ferienwohnung in Dresden. Direkt buchen & 10% sparen.",
    url: "https://elbstay.de/apartments/boutique",
    images: ["/images/boutique/living-room-1.jpg"],
  },
};

export default async function BoutiqueApartment() {
  const { urbanGallery, premiumGallery, boutiqueGallery, boutique2Gallery } = await getGalleries();
  const allImages = boutique2Gallery.flatMap(cat => cat.images).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": "https://elbstay.de/apartments/boutique/#rental",
    name: "ElbStay Boutique-Apartment nahe der Elbe Dresden",
    description: "Großzügiges Boutique-Apartment in Dresden. Mit 2 Schlafzimmern, 2 Bädern und Platz für bis zu 8 Gäste.",
    image: allImages.map(img => "https://elbstay.de" + img),
    url: "https://elbstay.de/apartments/boutique",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marienallee",
      addressLocality: "Dresden",
      addressRegion: "Sachsen",
      postalCode: "01099",
      addressCountry: "DE"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.0695,
      longitude: 13.7635
    },
    numberOfRooms: 2,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: 4
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: 48,
      unitCode: "MTK"
    },
    offers: {
      "@type": "Offer",
      name: "Direktbuchung Bestpreis",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "85",
        priceCurrency: "EUR",
        unitCode: "DAY"
      },
      url: "https://elbstay.de/apartments/boutique"
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Highspeed-WLAN", value: true },
      { "@type": "LocationFeatureSpecification", name: "Küche", value: true },
      { "@type": "LocationFeatureSpecification", name: "Nespresso Kaffeemaschine", value: true },
      { "@type": "LocationFeatureSpecification", name: "Smart TV", value: true },
      { "@type": "LocationFeatureSpecification", name: "Waschmaschine", value: true },
      { "@type": "LocationFeatureSpecification", name: "Self-Check-In 24/7", value: true }
    ]
  };

  return (
    <div className="bg-background pb-24 pt-24 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Title & Stats (Above Gallery like Airbnb) */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">ElbStay Boutique-Apartment nahe der Elbe</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-medium text-sm md:text-base">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Äußere Neustadt</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 8 Gäste</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Home className="w-4 h-4" /> 90 m²</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:flex items-center gap-1.5"><Bed className="w-4 h-4" /> 3 Betten + 1 Schlafcouch</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:flex items-center gap-1.5"><Bath className="w-4 h-4" /> 2 Badezimmer</span>
          </div>
        </div>

        {/* Header Gallery */}
        <ViewItemTracker item={APARTMENTS.find(a => a.id === 'boutique-2')!} />
      <ApartmentHeaderGallery images={allImages.slice(0, 15)} />

        {/* Main Content Split */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mt-12 md:mt-16 relative">
          
          {/* Left Content Area (2/3 width) */}
          <div className="lg:w-2/3">

          <ApartmentDescription 
            title="Stilvoll & Großzügig"
            previewText={
              <p>
                Willkommen im ElbStay Boutique Apartment – stilvoll, großzügig und ideal für bis zu 8 Gäste. Dich erwarten 2 separate Schlafzimmer mit hochwertigen Betten und Smart-TV, 2 Badezimmer mit Badewanne und Dusche sowie weitere Schlafmöglichkeiten im Wohnbereich mit zusätzlichem TV.
              </p>
            }
            fullText={
              <>
                <p>
                  Dazu: voll ausgestattete Küche, schnelles WLAN und modernes Boutique-Design. Perfekt für Familien, Freunde und Geschäftsreisende.
                </p>
                <p>
                  Willkommen im ElbStay Boutique Apartment – deinem stilvollen Zuhause auf Zeit in Dresden.
                  Freu dich auf ein großzügiges Boutique Apartment für bis zu 8 Personen mit modernem Interior, zwei separaten Schlafzimmern, zwei Badezimmern und viel Platz für gemeinsame Zeit und Privatsphäre.
                </p>
                <div className="bg-muted/30 p-6 rounded-xl border border-border/50 my-8">
                  <h4 className="font-bold text-foreground mb-4">✨ Deine Highlights:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-foreground font-medium list-none p-0 m-0">
                    <li>✔ Platz für bis zu 8 Gäste</li>
                    <li>✔ 2 separate Schlafzimmer mit hochwertigen Betten</li>
                    <li>✔ Smart-TV in jedem Schlafzimmer</li>
                    <li>✔ zusätzlicher Smart-TV im Wohnbereich</li>
                    <li>✔ 2 weitere komfortable Schlafmöglichkeiten im Wohnbereich</li>
                    <li>✔ 2 Badezimmer – eines mit Badewanne, eines mit Dusche</li>
                    <li>✔ voll ausgestattete Küche</li>
                    <li>✔ modernes Boutique-Design</li>
                    <li>✔ schnelles WLAN</li>
                    <li>✔ eigenständiger und unkomplizierter Check-in</li>
                    <li>✔ ideal für Familien, Freunde und Geschäftsreisende</li>
                    <li>✔ perfekt auch für längere Aufenthalte</li>
                  </ul>
                </div>
                <p>
                  Durch die Aufteilung auf zwei Schlafzimmer und zwei Badezimmer eignet sich das Apartment besonders gut für Familien und gemeinsam reisende Gruppen. Jeder findet seinen eigenen Rückzugsort, während der großzügige Wohnbereich genügend Platz für gemeinsame Abende bietet.
                </p>
                <p>
                  Ob Wochenendtrip, Familienurlaub, Geschäftsreise oder längerer Aufenthalt – im ElbStay Boutique Apartment verbindet sich der Komfort einer großzügigen Wohnung mit dem stilvollen Ambiente eines Boutique-Hotels.
                </p>
                <div className="mt-8 border-t border-border pt-8 space-y-4">
                  <h4 className="font-bold text-foreground">Zugang für Gäste</h4>
                  <p>Unseren Gästen steht die gesamte Wohnung zur Verfügung.</p>
                  <h4 className="font-bold text-foreground mt-6">Weitere wichtige Hinweise</h4>
                  <p className="font-semibold text-primary uppercase text-sm tracking-wider">Online Check-In vor Anreise:</p>
                  <p>Aus melderechtlichen Gründen benötigen wir von allen Personen VOR ANREISE das vollständig ausgefüllte Check-in-Formular, dass Sie 1-2 Tage nach Ihrer Buchung erhalten.</p>
                </div>
              </>
            }
          />

          <hr className="border-border/60 my-10" />

          <ReviewsList reviews={boutiqueReviews} totalCount={2} />

          <hr className="border-border/60 my-10" />

          <AmenitiesList 
            amenities={boutiqueAmenities} 
            topFeatures={[
              { icon: "TrainFront", text: "Perfekte ÖPNV-Anbindung" },
              { icon: "Wifi", text: "High-Speed WLAN" },
              { icon: "ChefHat", text: "Voll ausgestattete Küche" },
              { icon: "Tv", text: "Smart-TV" },
              { icon: "MapPin", text: "Zentrums- und Elbnah" },
              { icon: "Key", text: "Eigenständiger Check-in" },
            ]}
          />

          {/* Calendar replaced by Hospitable widget in sidebar */}

          <MapWidget 
            query="Marienallee, 01099 Dresden, Germany"
            description="Das Boutique-Apartment liegt im beliebten Viertel Äußere Neustadt auf dem unteren Ende der Marienallee. Die Elbe und das Stadtzentrum sind schnell erreichbar."
          />
        </div>

          {/* Right Sidebar - Hospitable Booking Widget */}
          <div className="lg:w-1/3 relative mt-8 lg:mt-0">
            <div className="sticky top-32 z-20 h-fit">
              <HospitableWidget propertyId="2504947" />
            </div>
          </div>
        </div>
      </div>

      {/* Full Photo Gallery Area */}
      <div id="full-gallery" className="max-w-7xl mx-auto px-4 md:px-6 scroll-mt-12">
        <hr className="border-border/60 my-16" />
        <ApartmentGallery categories={boutique2Gallery} />
      </div>
      
      {/* Script to sync search URL parameters to the iframe */}
      <HospitableIframeSync />
    </div>
  );
}
