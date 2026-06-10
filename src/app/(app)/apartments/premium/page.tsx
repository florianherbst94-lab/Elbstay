import Image from "next/image";
import { MapPin, Users, Home, Bed, Bath } from "lucide-react";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { ApartmentGallery } from "@/components/apartment/ApartmentGallery";
import { MapWidget } from "@/components/apartment/MapWidget";
import { premiumGallery } from "@/lib/images";
import { AmenitiesList } from "@/components/apartment/AmenitiesList";
import { premiumAmenities } from "@/lib/amenities";
import { ReviewsList } from "@/components/apartment/ReviewsList";
import { AvailabilityCalendar } from "@/components/apartment/AvailabilityCalendar";
import { ApartmentDescription } from "@/components/apartment/ApartmentDescription";
import { ApartmentHeaderGallery } from "@/components/apartment/ApartmentHeaderGallery";
import { premiumReviews } from "@/lib/reviews";

export default function PremiumApartment() {
  const allImages = premiumGallery.flatMap(cat => cat.images).filter(Boolean);

  return (
    <div className="bg-background pb-24 pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Title & Stats (Above Gallery like Airbnb) */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">ElbStay Premium Penthouse</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-medium text-sm md:text-base">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Dresden Zentrumsnähe</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 6 Gäste</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Home className="w-4 h-4" /> 120 m²</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:flex items-center gap-1.5"><Bed className="w-4 h-4" /> 3 Betten</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:flex items-center gap-1.5"><Bath className="w-4 h-4" /> 2 Badezimmer</span>
          </div>
        </div>

        {/* Header Gallery */}
        <ApartmentHeaderGallery images={allImages.slice(0, 15)} />

        {/* Main Content Split */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mt-12 md:mt-16 relative">
          
          {/* Left Content Area (2/3 width) */}
          <div className="lg:w-2/3">

          <ApartmentDescription 
            title="Purer Luxus über den Dächern"
            previewText={
              <p>
                Willkommen in unserer stilvoll eingerichteten Ferienwohnung im Herzen von Dresden. Mit Platz für bis zu 6 Personen ist sie ideal für Familien, Paare oder Geschäftsreisende, die nach einer komfortablen und gut gelegenen Unterkunft suchen.
              </p>
            }
            fullText={
              <>
                <p>
                  Unsere exklusive Penthouse-Maisonette-Wohnung befindet sich im obersten Stockwerk und bietet den idealen Ausgangspunkt, um Dresden und die wunderschöne Umgebung zu erkunden – sei es für einen gemütlichen Stadtbummel oder einen Ausflug in die Sächsische Schweiz.
                </p>
                <p>
                  Unser stilvolles Air BnB zeichnet sich durch ein modernes Raumkonzept aus. Mit einem Schlafzimmer auf der oberen Etage mit Blick über die Stadt was eine ganz besondere Wohnatmosphäre schafft – ideal für Designliebhaber und alle, die ein einzigartiges Wohngefühl genießen möchten!
                </p>
                <div className="bg-muted/30 p-6 rounded-xl border border-border/50 my-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-foreground font-medium list-none p-0 m-0">
                    <li>✔ gemeinschaftlich genutzte Dachterasse mit Blick auf die Skyline</li>
                    <li>✔ 55-Zoll Smart-TV & Highspeed-WLAN</li>
                    <li>✔ Spektakulärer Blick über die Dächer Dresdens</li>
                    <li>✔ Komfortable Betten für erholsamen Schlaf</li>
                    <li>✔ Voll ausgestattete Küche für deine Lieblingsgerichte</li>
                    <li>✔ Kostenfreier Parkplatz direkt am Haus</li>
                  </ul>
                </div>
                <p>
                  Im unteren Bereich erwartet dich ein einladendes Wohnzimmer mit Schlafsofa sowie ein Smart-TV. Mit deinem eigenen Account kannst du bequem auf Netflix, Amazon Prime & Co. zugreifen oder mit der ganzen Familie eine Runde Gesellschaftsspiele genießen.
                </p>
                <p>
                  Ein gemütliches Schlafzimmer mit komfortablem Bett befindet sich ebenfalls auf dieser Ebene. Zudem stehen dir ein modernes Badezimmer mit Toilette sowie ein zweites Bad mit Dusche zur Verfügung. Frische Handtücher, Pflegeprodukte und ein Föhn sind selbstverständlich inklusive.
                </p>
                <p>
                  Im oberen Bereich findest du den großzügigen Essbereich für bis zu 6 Personen, die voll ausgestattete Küche sowie ein angrenzendes Schlafzimmer mit traumhaftem Blick über Dresden. Hier kannst du deinen Tag mit einer heißen Tasse Kaffee starten, bevor du die Stadt oder die faszinierende Natur der Sächsischen Schweiz entdeckst.
                </p>
                <p>
                  Genieße entspannte Stunden auf unserer großzügigen Dachterrasse mit einem einzigartigen Blick über die Skyline von Dresden! Die Dachterasse kann von anderen Mietern dieses Hauses ebenfalls genutzt werden und befindet ist über einen Zugang außerhalb der Unterkunft begehbar. Besonders bei Sonnenuntergang entfaltet die Terrasse ihren ganz besonderen Charme. Der Zugang erfolgt bequem über die Wendeltreppe im Flur außerhalb der Wohnung.
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

          <ReviewsList reviews={premiumReviews} totalCount={18} />

          <hr className="border-border/60 my-10" />

          <AmenitiesList 
            amenities={premiumAmenities} 
            topFeatures={[
              { icon: "Sunrise", text: "Malerischer Ausblick auf die Skyline" },
              { icon: "GlassWater", text: "Dachterrasse & Weinkühlschrank" },
              { icon: "Wifi", text: "High-Speed WLAN" },
              { icon: "ChefHat", text: "Voll ausgestattete Luxus-Küche" },
              { icon: "Tv", text: "55-Zoll Smart-TV" },
              { icon: "Car", text: "Privater Parkplatz am Haus" },
              { icon: "Users", text: "3 Schlafzimmer / 6 Personen" },
              { icon: "Key", text: "Eigenständiger Check-in" },
            ]}
          />

          <hr className="border-border/60 my-10" />

          <AvailabilityCalendar />

          <MapWidget 
            query="51.0543, 13.7228+(Dresden Zentrumsnähe)"
            description="Das exklusive Premium Penthouse liegt extrem zentrumsnah am Rande der Dresdner Innenstadt (Bahnhof Mitte). Die historische Altstadt ist fußläufig erreichbar."
          />
        </div>

          {/* Right Sidebar - Sticky Booking Widget */}
          <div className="lg:w-1/3 relative">
            <div className="sticky top-32 z-20 h-fit">
              <BookingWidget propertyId="premium-01" defaultPrice={245} />
            </div>
          </div>
        </div>
      </div>

      {/* Full Photo Gallery Area */}
      <div id="full-gallery" className="max-w-7xl mx-auto px-4 md:px-6 scroll-mt-12">
        <hr className="border-border/60 my-16" />
        <ApartmentGallery categories={premiumGallery} />
      </div>
    </div>
  );
}
