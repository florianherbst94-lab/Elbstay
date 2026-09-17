import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/layout/SEOLandingPage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Monteurwohnung & Firmenunterkunft in Dresden mieten",
  description: "Komfortable Unterkünfte für Mitarbeiter, Handwerker und Monteure in Dresden. Getrennte Betten, Küche, Waschmaschine, verkehrsgünstig gelegen.",
  alternates: {
    canonical: `${siteConfig.url}/monteurwohnung-dresden`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    false ? true : "urban,boutique".split(',').includes(a.id) || "urban,boutique".split(',').includes(a.type.toLowerCase())
  );

  return (
    <SEOLandingPage
      h1="Monteurwohnung & Firmenunterkunft Dresden"
      intro={<>
        <p>Sie suchen eine verlässliche, saubere und komfortable Unterkunft für Ihre Mitarbeiter, Handwerker oder ein Projektteam in Dresden? Wir bei ElbStay bieten Unterkünfte, die exakt auf die Bedürfnisse von arbeitenden Gästen zugeschnitten sind. Verabschieden Sie sich von unpersönlichen und spärlich ausgestatteten Massenunterkünften: Bei uns übernachten Ihre Mitarbeiter in vollwertigen Apartments, die Erholung nach einem anstrengenden Arbeitstag garantieren.</p>
      </>}
      targetAudienceText={<>
        <p>Unsere Wohnungen richten sich an <strong>Unternehmen, Handwerksbetriebe, Bauleiter und Projektteams</strong>. Wir verstehen, dass ein gutes Feierabendgefühl die Motivation und Produktivität Ihrer Mitarbeiter maßgeblich steigert.</p>
      </>}
      features={["Eigene voll ausgestattete Küche","Flexible Check-in Zeiten","Waschmaschine","Gute Verkehrsanbindung (Auto/Transporter)","Rechnung für Unternehmen"]}
      locationInfo={<><p>Dresden wächst und baut. Unsere Apartments sind dezentral in verkehrsgünstigen Lagen (wie Löbtau oder Pieschen) platziert. So vermeiden Sie den morgendlichen Stau der Innenstadt und sind schnell auf der Autobahn (A4/A17) oder an den wichtigen Industriestandorten im Norden und Westen der Stadt.</p></>}
      mobilityInfo={undefined}
      parkingInfo={undefined}
      sights={<><h3>Unterkunft für Mitarbeiter in Dresden anfragen</h3><p>Ihre Mitarbeiter bleiben länger als nur ein paar Tage? Sie benötigen regelmäßig Unterkünfte in Dresden? Nutzen Sie unsere Direktbuchung, um sofort Verfügbarkeiten zu prüfen, oder kontaktieren Sie uns per E-Mail für ein maßgeschneidertes, unverbindliches Firmen-Angebot bei längeren Aufenthalten.</p></>}
      faqs={[{"q":"Gibt es getrennte Betten?","a":"Je nach Apartment verfügen wir über Schlafsofas, Doppelbetten und teilweise getrennte Schlafräume. Prüfen Sie die spezifische Bettenaufteilung in den Apartment-Details, um sicherzustellen, dass sie für Ihr Team passt."},{"q":"Wie erfolgt die Rechnungsstellung?","a":"Die Rechnung wird digital auf den Namen Ihres Unternehmens ausgestellt, inklusive aller steuerlich relevanten Angaben."},{"q":"Sind Parkplätze für Transporter vorhanden?","a":"In den Gebieten wie Pieschen und Löbtau finden sich in der Regel öffentliche Parkplätze an der Straße, die auch für größere Fahrzeuge (Sprinter/Transporter) geeignet sind."}]}
      relatedLinks={[{"href":"/business-apartment-dresden","label":"Business Apartments"},{"href":"/langzeitaufenthalt-dresden","label":"Langzeitmiete"},{"href":"/ferienwohnung-dresden-mit-parkplatz","label":"Wohnungen mit Parkplatz"}]}
      breadcrumbs={[{"href":"/ferienwohnung-dresden","label":"Dresden"},{"href":"/monteurwohnung-dresden","label":"Monteurwohnung"}]}
      apartments={filteredApartments}
    />
  );
}
