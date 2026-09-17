import type { Metadata } from "next";
import { ApartmentCard } from "@/components/apartment/ApartmentCard";

export const metadata: Metadata = {
  title: "Unsere Apartments in Dresden | ElbStay Boutique, Penthouse & Urban",
  description: "Boutique-Apartments & Ferienwohnungen in Dresden direkt an der Elbe. Vergleichen Sie ElbStay Urban, Premium Penthouse und Boutique. Direkt buchen & Bestpreis sichern!",
  keywords: ["Ferienwohnung Dresden Übersicht", "Boutique Apartments Dresden", "Unterkunft Dresden mieten", "Ferienwohnung Dresden buchen"],
  alternates: {
    canonical: "https://elbstay.de/apartments",
  },
  openGraph: {
    title: "Unsere Apartments in Dresden | ElbStay Boutique, Penthouse & Urban",
    description: "Boutique-Apartments & Ferienwohnungen in Dresden an der Elbe. Jetzt direkt buchen.",
    url: "https://elbstay.de/apartments",
    images: ["/images/dresden_hero_user_final.jpg"],
  },
};

import { urbanGallery, premiumGallery } from "@/lib/images";
import { APARTMENTS } from "@/lib/data/apartments";
import { boutiqueGallery } from "@/lib/boutique/images";


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
