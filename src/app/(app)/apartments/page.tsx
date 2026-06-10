import { ApartmentCard } from "@/components/apartment/ApartmentCard";

const APARTMENTS = [
  {
    id: "urban-1",
    name: "ElbStay Urban",
    type: "Urban" as const,
    description: "Modernes Design-Apartment im Herzen von Dresden. Perfekt für Paare und Business-Reisende, die Wert auf Stil und Komfort legen.",
    guests: 4,
    beds: "1 Bett + 1 Schlafcouch",
    size: 55,
    imageUrl: "/images/urban/airbnb-flo-5.jpg",
    priceFrom: 120,
  },
  {
    id: "premium-1",
    name: "ElbStay Premium",
    type: "Premium" as const,
    description: "Exklusives Penthouse mit weitläufiger Dachterrasse und Panoramablick über Dresden. Luxus und Erlebnis für Familien und Gruppen.",
    guests: 6,
    beds: "2 Betten + 1 Schlafcouch",
    size: 120,
    imageUrl: "/images/premium/floairbnb_-77.jpg",
    priceFrom: 280,
  }
];

export default function ApartmentsPage() {
  return (
    <div className="flex-1 bg-background pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Unsere Apartments
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Entdecken Sie unsere sorgfältig kuratierten Unterkünfte in Dresden. Wählen Sie zwischen zentralem City-Lifestyle und exklusivem Premium-Komfort.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {APARTMENTS.map((apt) => (
            <ApartmentCard key={apt.id} {...apt} />
          ))}
        </div>
      </div>
    </div>
  );
}
