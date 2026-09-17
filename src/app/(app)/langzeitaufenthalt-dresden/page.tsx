import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/layout/SEOLandingPage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Langzeitaufenthalt & Wohnen auf Zeit in Dresden | ElbStay",
  description: "Suchen Sie eine Wohnung auf Zeit in Dresden? Entdecken Sie unsere voll möblierten Apartments für Langzeitmiete, Expats und Sabbaticals. Direkt anfragen.",
  alternates: {
    canonical: `${siteConfig.url}/langzeitaufenthalt-dresden`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    false ? true : "urban,premium-1,boutique".split(',').includes(a.id) || "urban,premium-1,boutique".split(',').includes(a.type.toLowerCase())
  );

  return (
    <SEOLandingPage
      h1="Langzeitaufenthalt in Dresden: Wohnen auf Zeit"
      intro={<>
        <p>Egal ob Sie ein mehrmonatiges Projekt in Dresden begleiten, sich in einer beruflichen Übergangsphase befinden oder einen Neuanfang in der Stadt planen: Ein voll möbliertes Apartment bietet Ihnen den idealen Start. Das Konzept "Wohnen auf Zeit" erspart Ihnen teure Möbelanschaffungen und langfristige Mietverträge. Bei ElbStay ziehen Sie einfach mit Ihrem Koffer ein – um alles Weitere haben wir uns bereits gekümmert.</p>
      </>}
      targetAudienceText={<>
        <p>Unsere Angebote richten sich an <strong>Expats, Berater, Gastprofessoren</strong> und Menschen, die ihr Eigenheim renovieren oder vorübergehend eine hochwertige Bleibe in Dresden benötigen.</p>
      </>}
      features={["Vollständige Möblierung","Highspeed Internet inkludiert","Waschmaschine","Komplette Küchenausstattung","Nebenkosten inklusive"]}
      locationInfo={undefined}
      mobilityInfo={undefined}
      parkingInfo={undefined}
      sights={undefined}
      faqs={[{"q":"Kann ich mich an der Adresse anmelden (Wohnungsgeberbestätigung)?","a":"Bei Aufenthalten über mehrere Monate können wir Ihnen in Absprache eine Wohnungsgeberbestätigung zur behördlichen Anmeldung in Dresden ausstellen."},{"q":"Gibt es Rabatte für monatliche Buchungen?","a":"Ja. Für Aufenthalte ab 28 Nächten bieten wir auf Anfrage deutlich rabattierte Monatspreise an."},{"q":"Sind Nebenkosten wie Strom und Internet im Preis enthalten?","a":"Ja, bei ElbStay gibt es keine versteckten Kosten. Heizung, Wasser, Strom und Highspeed-Internet sind bei Langzeitbuchungen im Preis inkludiert."}]}
      relatedLinks={[{"href":"/business-apartment-dresden","label":"Business Apartments"},{"href":"/monteurwohnung-dresden","label":"Firmenunterkünfte"},{"href":"/contact","label":"Anfrage stellen"}]}
      breadcrumbs={[{"href":"/ferienwohnung-dresden","label":"Dresden"},{"href":"/langzeitaufenthalt-dresden","label":"Wohnen auf Zeit"}]}
      apartments={filteredApartments}
    />
  );
}
