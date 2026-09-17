import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/layout/SEOLandingPage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Ferienwohnung Dresden Pieschen | ElbStay Boutique",
  description: "Ihr Boutique-Apartment in Dresden-Pieschen. Altbauflair, Boxspringbett, modern eingerichtet. Ideal für Paare & Städtetrips. Jetzt provisionsfrei buchen.",
  alternates: {
    canonical: `${siteConfig.url}/ferienwohnung-dresden-pieschen`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    false ? true : "boutique".split(',').includes(a.id) || "boutique".split(',').includes(a.type.toLowerCase())
  );

  return (
    <SEOLandingPage
      h1="Ferienwohnung in Dresden-Pieschen"
      intro={<>
        <p>Willkommen in Dresden-Pieschen, einem der charmantesten und aufstrebendsten Viertel der Stadt. Pieschen liegt direkt an der Elbe und bezaubert mit seinen wunderschön sanierten Altbauten, gemütlichen Straßen und einer entspannten, familiären Atmosphäre. Unsere Ferienwohnungen hier, wie das ElbStay Boutique Apartment, bieten Ihnen den idealen Mix aus historischem Flair und modernstem Wohnkomfort.</p>
      </>}
      targetAudienceText={<>
        <p>Pieschen ist ideal für Gäste, die dem Trubel der Innenstadt entfliehen, aber dennoch absolut zentral und verkehrsgünstig wohnen möchten. Es eignet sich für <strong>Paare</strong>, die das authentische Dresdner Leben schätzen, sowie für <strong>Business-Reisende</strong>, die eine ruhige Arbeitsumgebung suchen.</p>
      </>}
      features={["Echter Altbaucharme","Ruhige Lage","Kostenfreies Parken im Viertel","Boxspringbett","Kaffeevollautomat"]}
      locationInfo={<><p>Das Viertel liegt im Nordwesten der Stadt und grenzt direkt an den idyllischen Elbradweg. In der Umgebung finden Sie gemütliche Bäckereien, kleine Cafés und lokale Restaurants. Die Anbindung an die Autobahn A4 (Abfahrt Neustadt) ist exzellent, was die Anreise mit dem Auto besonders angenehm macht.</p></>}
      mobilityInfo={<><p>Mit der Straßenbahnlinie 3 oder der S-Bahn (Bahnhof Pieschen) sind Sie in knapp 10-15 Minuten in der historischen Altstadt (Theaterplatz/Zwinger) oder in der Äußeren Neustadt.</p></>}
      parkingInfo={<><p>Im Gegensatz zur dicht bebauten Altstadt oder Neustadt finden Sie in Pieschen meist problemlos kostenfreie, öffentliche Parkplätze in den direkt umliegenden Nebenstraßen.</p></>}
      sights={<><p>Nutzen Sie die Nähe zur Elbe für einen Spaziergang zum Ballhaus Watzke (ein historisches Brauhaus mit Biergarten) oder radeln Sie entlang der Elbwiesen in Richtung Radebeul und zu den malerischen Elbschlössern.</p></>}
      faqs={[{"q":"Gibt es Supermärkte in der Nähe?","a":"Ja, Pieschen bietet eine hervorragende Infrastruktur. Supermärkte, Bäcker, Apotheken und Drogerien sind in wenigen Gehminuten erreichbar."},{"q":"Ist das Viertel sicher?","a":"Absolut. Pieschen ist ein beliebtes, ruhiges und sehr sicheres Wohnviertel, das bei Familien und jungen Paaren sehr geschätzt wird."}]}
      relatedLinks={[{"href":"/ferienwohnung-dresden","label":"Alle Apartments"},{"href":"/dresden-guide/pieschen","label":"Pieschen Local Guide"}]}
      breadcrumbs={[{"href":"/ferienwohnung-dresden","label":"Dresden"},{"href":"/ferienwohnung-dresden-pieschen","label":"Pieschen"}]}
      apartments={filteredApartments}
    />
  );
}
