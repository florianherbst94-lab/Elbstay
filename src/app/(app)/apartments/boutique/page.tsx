
import { MapPin, Users, Home, Bed, Bath } from "lucide-react";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { ApartmentGallery } from "@/components/apartment/ApartmentGallery";
import { MapWidget } from "@/components/apartment/MapWidget";
import { boutiqueGallery } from "@/lib/boutique/images";
import { AmenitiesList } from "@/components/apartment/AmenitiesList";
import { boutiqueAmenities } from "@/lib/boutique/amenities";
import { ReviewsList } from "@/components/apartment/ReviewsList";
import { AvailabilityCalendar } from "@/components/apartment/AvailabilityCalendar";
import { ApartmentDescription } from "@/components/apartment/ApartmentDescription";
import { ApartmentHeaderGallery } from "@/components/apartment/ApartmentHeaderGallery";
import { boutiqueReviews } from "@/lib/boutique/reviews";

export default function BoutiqueApartment() {
  const allImages = boutiqueGallery.flatMap(cat => cat.images).filter(Boolean);

  return (
    <div className="bg-background pb-24 pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Title & Stats (Above Gallery like Airbnb) */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">ElbStay Boutique-Apartment</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-medium text-sm md:text-base">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Dresden-Pieschen</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 4 Gäste</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Home className="w-4 h-4" /> 48 m²</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:flex items-center gap-1.5"><Bed className="w-4 h-4" /> 1 Bett, 1 Couch</span>
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
            title="Stilvoll & Zentrumsah"
            previewText={
              <p>
                Willkommen in unserem frisch renovierten Boutique-Apartment in Dresden-Pieschen. Die hochwertig eingerichtete 2-Raum-Wohnung verbindet Altbaucharme mit warmem Interior und modernem Komfort.
              </p>
            }
            fullText={
              <>
                <p>
                  Das Apartment befindet sich auf der Leipziger Straße in exzellenter Lage, nur wenige Minuten vom Stadtzentrum und der Elbe entfernt. Die perfekte Ausgangsbasis für deinen Dresden-Trip.
                </p>
                <p>
                  Genieße den Komfort von schnellem WLAN, einer voll ausgestatteten Küche und liebevoll ausgewählten Designelementen. Egal, ob du geschäftlich oder privat reist, hier fühlst du dich sofort zu Hause.
                </p>
                <div className="bg-muted/30 p-6 rounded-xl border border-border/50 my-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-foreground font-medium list-none p-0 m-0">
                    <li>✔ Kostenloses Parken in den Seitenstraßen</li>
                    <li>✔ Smart-TV & Highspeed-WLAN</li>
                    <li>✔ Perfekte Anbindung an die Innenstadt</li>
                    <li>✔ Komfortables Boxspringbett</li>
                    <li>✔ Voll ausgestattete Küche</li>
                    <li>✔ Eigenständiger, flexibler Check-in</li>
                  </ul>
                </div>
                <p>
                  Im großzügigen Wohnbereich erwartet dich ein bequemes Schlafsofa sowie ein großer Smart-TV für entspannte Abende. Der Esstisch bietet ausreichend Platz für gemeinsame Mahlzeiten oder als Arbeitsplatz.
                </p>
                <p>
                  Das separate Schlafzimmer ist mit einem komfortablen Bett ausgestattet und sorgt für erholsamen Schlaf. Das helle Badezimmer verfügt über eine Dusche und alle wichtigen Pflegeprodukte.
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

          <hr className="border-border/60 my-10" />

          <AvailabilityCalendar />

          <MapWidget 
            query="51.0772, 13.7225+(Dresden Pieschen)"
            description="Das Boutique-Apartment liegt im beliebten Viertel Dresden-Pieschen auf der Leipziger Straße. Die Elbe und das Stadtzentrum sind schnell erreichbar."
          />
        </div>

          {/* Right Sidebar - Sticky Booking Widget */}
          <div className="lg:w-1/3 relative">
            <div className="sticky top-32 z-20 h-fit">
              <BookingWidget propertyId="wbadd2703" defaultPrice={140} />
            </div>
          </div>
        </div>
      </div>

      {/* Full Photo Gallery Area */}
      <div id="full-gallery" className="max-w-7xl mx-auto px-4 md:px-6 scroll-mt-12">
        <hr className="border-border/60 my-16" />
        <ApartmentGallery categories={boutiqueGallery} />
      </div>
    </div>
  );
}
