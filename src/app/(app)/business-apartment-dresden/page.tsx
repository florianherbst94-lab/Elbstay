import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/layout/SEOLandingPage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Business Apartment Dresden | Möbliertes Wohnen auf Zeit",
  description: "Premium Business Apartments in Dresden für Geschäftsreisen & Projektmitarbeiter. Schnelles WLAN, Schreibtisch, Küche & Rechnung mit MwSt. Hier buchen.",
  alternates: {
    canonical: `${siteConfig.url}/business-apartment-dresden`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    false ? true : "urban,boutique,premium-1".split(',').includes(a.id) || "urban,boutique,premium-1".split(',').includes(a.type.toLowerCase())
  );

  return (
    <SEOLandingPage
      h1="Business Apartment Dresden: Ihr Zuhause auf Geschäftsreise"
      intro={<>
        <p>Für längere Projekte, Schulungen oder Geschäftsreisen in Dresden reicht ein klassisches Hotelzimmer oft nicht aus. Unsere voll möblierten Business Apartments bieten Ihnen genau die Flexibilität, Privatsphäre und Ausstattung, die Sie für einen produktiven und entspannten Aufenthalt benötigen. Genießen Sie den Komfort einer eigenen Wohnung, schnelles Internet und unkomplizierte Abläufe – ideal für moderne Professionals, Expats und Pendler.</p>
      </>}
      targetAudienceText={<>
        <p>Speziell zugeschnitten auf <strong>Geschäftsreisende, Berater, IT-Spezialisten und Projektteams</strong>. Auch für Unternehmen, die eine komfortable und repräsentative temporäre Unterkunft für ihre Mitarbeiter suchen, stellen unsere Apartments die perfekte Lösung dar.</p>
      </>}
      features={["Highspeed-WLAN (100 Mbit/s+)","Arbeitsbereich / Tisch","Rechnung mit ausgewiesener MwSt.","Voll ausgestattete Küche","Waschmaschine (in den meisten Einheiten)"]}
      locationInfo={<><p>Unsere Business-Standorte sind verkehrsgünstig gelegen. Ob mit dem Auto über die nahegelegene Autobahn oder mit dem ÖPNV zu wichtigen Geschäftszentren und zur Messe Dresden – Sie erreichen Ihre Termine pünktlich und stressfrei.</p></>}
      mobilityInfo={undefined}
      parkingInfo={undefined}
      sights={<><h3>Apartment vs. Hotel in Dresden?</h3><p>Während Hotels oft unpersönlich und teuer für längere Aufenthalte sind, bietet ein Business Apartment echte Wohnqualität. Sie können selbst kochen, Gäste empfangen oder nach Feierabend auf der Couch bei Netflix abschalten. Zudem ist der Quadratmeterpreis bei Aufenthalten ab wenigen Tagen meist deutlich attraktiver als im Hotel.</p></>}
      faqs={[{"q":"Erhalte ich eine ordnungsgemäße Rechnung für mein Unternehmen?","a":"Ja, selbstverständlich. Sie erhalten nach der Buchung eine Rechnung mit ausgewiesener Mehrwertsteuer, die Sie problemlos bei Ihrer Buchhaltung einreichen können."},{"q":"Ist ein später Check-in nach Geschäftsterminen möglich?","a":"Dank unseres schlüssellosen Smart-Lock-Systems (Self Check-in) können Sie jederzeit nach der offiziellen Check-in-Zeit anreisen – auch tief in der Nacht."},{"q":"Bieten Sie spezielle Raten für Firmenkunden oder Langzeitaufenthalte?","a":"Für Aufenthalte über mehrere Wochen oder wiederkehrende Buchungen durch Unternehmen kontaktieren Sie uns gerne direkt. Wir schnüren Ihnen ein individuelles Angebot."}]}
      relatedLinks={[{"href":"/monteurwohnung-dresden","label":"Unterkunft für Mitarbeiter"},{"href":"/langzeitaufenthalt-dresden","label":"Wohnen auf Zeit"},{"href":"/contact","label":"Firmenanfrage stellen"}]}
      breadcrumbs={[{"href":"/ferienwohnung-dresden","label":"Dresden"},{"href":"/business-apartment-dresden","label":"Business Apartment"}]}
      apartments={filteredApartments}
    />
  );
}
