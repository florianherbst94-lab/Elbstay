import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/layout/SEOLandingPage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Ferienwohnung in Dresden mit Parkplatz mieten | ElbStay",
  description: "Entspannte Anreise: Mieten Sie eine Ferienwohnung in Dresden mit Parkmöglichkeiten in direkter Nähe. Ideal für Auto-Reisende. Hier direkt buchen.",
  alternates: {
    canonical: `${siteConfig.url}/ferienwohnung-dresden-mit-parkplatz`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    true ? true : "all".split(',').includes(a.id) || "all".split(',').includes(a.type.toLowerCase())
  );

  return (
    <SEOLandingPage
      h1="Ferienwohnung in Dresden mit Parkplatz"
      intro={<>
        <p>Die Anreise mit dem eigenen Auto ist für viele Dresden-Besucher die komfortabelste Wahl – doch die Parkplatzsuche in der Innenstadt kann schnell zur Geduldsprobe werden. Wer eine Ferienwohnung bei ElbStay mietet, profitiert von dezentralen, verkehrsgünstigen Lagen, in denen das Parken meist deutlich entspannter ist als direkt im historischen Altstadtkern.</p>
      </>}
      targetAudienceText={<>
        <p>Ideal für <strong>Gäste mit dem eigenen Pkw, Motorradreisende oder Monteure mit Transportern</strong>, die eine sichere und unkomplizierte Möglichkeit suchen, ihr Fahrzeug abzustellen.</p>
      </>}
      features={["Öffentliches, kostenfreies Parken im Viertel","Be- und Entladen am Haus möglich","Sehr gute Anbindung an die A4/A17","Schneller Transfer in die City per ÖPNV"]}
      locationInfo={undefined}
      mobilityInfo={<><p>Das Parken in den Straßen rund um unsere Apartments in Pieschen und Löbtau (z.B. ElbStay Urban und Boutique) ist aktuell gebührenfrei (öffentlicher Straßenraum). Beachten Sie jedoch immer die Beschilderung vor Ort. Für unser Premium-Penthouse im Zentrum stehen kostenpflichtige Parkhäuser in direkter Umgebung zur Verfügung.</p></>}
      parkingInfo={undefined}
      sights={undefined}
      faqs={[{"q":"Habe ich einen fest reservierten Parkplatz?","a":"In der Regel nutzen Sie die kostenfreien, öffentlichen Stellplätze entlang der Straße. Es gibt keine fest reservierten Stellflächen, jedoch finden Gäste erfahrungsgemäß immer problemlos einen Platz in der unmittelbaren Nähe."},{"q":"Ist das Auto dort sicher?","a":"Dresdens Wohnviertel wie Pieschen oder Löbtau gelten als sicher. Parken Sie Ihr Fahrzeug wie gewohnt, lassen Sie keine Wertsachen sichtbar liegen, und Sie können Ihren Aufenthalt entspannt genießen."}]}
      relatedLinks={[{"href":"/ferienwohnung-dresden-pieschen","label":"Apartments in Pieschen"},{"href":"/business-apartment-dresden","label":"Apartment für Geschäftsreise"}]}
      breadcrumbs={[{"href":"/ferienwohnung-dresden","label":"Dresden"},{"href":"/ferienwohnung-dresden-mit-parkplatz","label":"Mit Parkplatz"}]}
      apartments={filteredApartments}
    />
  );
}
