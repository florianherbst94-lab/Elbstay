import { getDynamicApartments } from "@/lib/galleryService";
import { HomeClient } from "./HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ElbStay | Exklusive Boutique Apartments & Ferienwohnungen Dresden",
  description: "Zentrumsnahe Boutique-Apartments & Ferienwohnungen in Dresden an der Elbe. Entdecken Sie ElbStay Urban, Premium Penthouse und Boutique. Jetzt direkt buchen und ca. 10% sparen.",
  keywords: ["Ferienwohnung Dresden", "Boutique Apartments Dresden", "Unterkunft Dresden", "Ferienwohnung Dresden Elbe"],
  alternates: {
    canonical: "https://elbstay.de",
  },
  openGraph: {
    title: "ElbStay | Exklusive Boutique Apartments & Ferienwohnungen Dresden",
    description: "Zentrumsnahe Boutique-Apartments & Ferienwohnungen in Dresden an der Elbe. Jetzt direkt buchen und ca. 10% sparen.",
    url: "https://elbstay.de",
    images: ["/images/dresden_hero_user_final.jpg"],
  },
};

export default async function HomePage() {
  const dynamicApartments = await getDynamicApartments();
  return <HomeClient apartments={dynamicApartments} />;
}
