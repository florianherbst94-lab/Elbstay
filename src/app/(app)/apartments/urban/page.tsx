import Image from "next/image";
import { MapPin, Users, Home, Bed, Bath, Check, Wifi, Coffee, Tv } from "lucide-react";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { ApartmentGallery } from "@/components/apartment/ApartmentGallery";
import { MapWidget } from "@/components/apartment/MapWidget";
import { urbanGallery } from "@/lib/images";
import { AmenitiesList } from "@/components/apartment/AmenitiesList";
import { urbanAmenities } from "@/lib/amenities";
import { ReviewsList } from "@/components/apartment/ReviewsList";
import { AvailabilityCalendar } from "@/components/apartment/AvailabilityCalendar";
import { ApartmentDescription } from "@/components/apartment/ApartmentDescription";
import { ApartmentHeaderGallery } from "@/components/apartment/ApartmentHeaderGallery";
import { urbanReviews } from "@/lib/reviews";

export default function UrbanApartment() {
  const allImages = urbanGallery.flatMap(cat => cat.images).filter(Boolean);

  return (
    <div className="bg-background pb-24 pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Title & Stats (Above Gallery like Airbnb) */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">ElbStay Urban Apartment</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-medium text-sm md:text-base">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Dresden Löbtau</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 4 Gäste</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Home className="w-4 h-4" /> 55 m²</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:flex items-center gap-1.5"><Bed className="w-4 h-4" /> 1 Bett & 1 Schlafsofa</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:flex items-center gap-1.5"><Bath className="w-4 h-4" /> 1 Badezimmer</span>
          </div>
        </div>

        {/* Header Gallery */}
        <ApartmentHeaderGallery images={allImages.slice(0, 15)} />

        {/* Main Content Split */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mt-12 md:mt-16 relative">
          
          {/* Left Content Area (2/3 width) */}
          <div className="lg:w-2/3">
            <ApartmentDescription 
              title="Über diese Unterkunft"
              previewText={
                <p>
                  Willkommen bei ElbStay! Hier findest du unsere stilvoll eingerichtete Ferienwohnung in Dresden Löbtau. Mit Platz für bis zu 4 Personen ist sie ideal für Familien, Paare oder Geschäftsreisende, die nach einer komfortablen und gut gelegenen Unterkunft suchen.
                </p>
              }
              fullText={
                <>
                  <p>
                    Unsere Wohnung befindet sich im Erdgeschoss des Hauses und ist der perfekte Ausgangspunkt, um Dresden sowie die umliegende Region zu erkunden, sei es für einen Stadtbummel oder einen Ausflug in die Sächsische Schweiz.
                  </p>
                  <div className="bg-muted/30 p-6 rounded-xl border border-border/50 my-8">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-foreground font-medium list-none p-0 m-0">
                      <li>✔ 45-Zoll Smart-TV & schnelles WLAN</li>
                      <li>✔ Bequeme Betten</li>
                      <li>✔ Vollständig ausgestattete Küche</li>
                    </ul>
                  </div>
                  <p>
                    Die Ferienwohnung verfügt über ein geräumiges Schlafzimmer und ein gemütliches Wohnzimmer, in dem ein Smart-TV zur Verfügung steht. Mit deinem eigenen Account kannst du dich bei Netflix, Amazon Prime oder anderen Streaming-Diensten anmelden, um deine Lieblingssendungen und Filme zu genießen. Alternativ bieten wir eine Auswahl an Gesellschaftsspielen für die ganze Familie.
                  </p>
                  <p>
                    In der voll ausgestatteten Küche findest du alles, was du für die Zubereitung leckerer Mahlzeiten benötigst. Beginne deinen Tag mit einer Tasse Kaffee am großzügigen Esstisch, bevor du die Region erkundest – ob ein Ausflug in die Dresdner Altstadt oder in die malerische Sächsische Schweiz.
                  </p>
                  <p>
                    Das moderne Badezimmer ist mit einer Badewanne ausgestattet. Wir stellen dir frische Handtücher sowie Badezimmer-Essentials wie Pflegeprodukte, oder einen Fön zur Verfügung.
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

            <ReviewsList reviews={urbanReviews} totalCount={14} />

            <hr className="border-border/60 my-10" />

            <AmenitiesList 
              amenities={urbanAmenities} 
              topFeatures={[
                { icon: "Bath", text: "Badezimmer mit Badewanne" },
                { icon: "Wifi", text: "WLAN & Arbeitsplatz" },
                { icon: "Utensils", text: "Voll ausgestattete Küche" },
                { icon: "Tv", text: "Smart-TV mit Streaming" },
                { icon: "Car", text: "Kostenfreie Parkplätze auf der Straße" },
                { icon: "Baby", text: "Familienfreundlich (Babybett/Hochstuhl)" },
                { icon: "DoorOpen", text: "Privater Eingang" },
                { icon: "Key", text: "Eigenständiger Check-in" },
              ]}
            />

            <hr className="border-border/60 my-10" />

            <AvailabilityCalendar />

            <MapWidget 
              query="Hermsdorfer Str., Dresden, Germany"
              description="Das Urban Apartment befindet sich in Zentrumsnähe im Dresdner Westen. Supermärkte, Bars und die Anbindung an den ÖPNV sind in direkter Umgebung."
            />
          </div>

          {/* Right Sidebar - Sticky Booking Widget */}
          <div className="lg:w-1/3 relative">
            <div className="sticky top-32 z-20 h-fit">
              <BookingWidget propertyId="urban-01" defaultPrice={125} />
            </div>
          </div>
        </div>
      </div>

      {/* Full Photo Gallery Area */}
      <div id="full-gallery" className="max-w-7xl mx-auto px-4 md:px-6 scroll-mt-12">
        <hr className="border-border/60 my-16" />
        <ApartmentGallery categories={urbanGallery} />
      </div>
    </div>
  );
}
