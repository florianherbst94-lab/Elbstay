import type { Metadata } from "next";
import { GuidePage } from "@/components/layout/GuidePage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Dresden Pieschen Guide | Ruhiges Elbviertel entdecken",
  description: "Pieschen: Das gemütliche und aufstrebende Viertel an der Elbe. Geheimtipps für Restaurants und Spaziergänge von ElbStay.",
  alternates: {
    canonical: `${siteConfig.url}/dresden-guide/pieschen`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    false ? true : "boutique,urban".split(',').includes(a.id) || "boutique,urban".split(',').includes(a.type.toLowerCase())
  );

  return (
    <GuidePage
      title="Guide: Dresden-Pieschen"
      intro={<>
        <p>Pieschen ist unser persönlicher Favorit für alle, die das authentische, entspannte Dresden erleben wollen. Direkt an der Elbe gelegen, besticht das Viertel durch liebevoll sanierte Altbauten, kleine Straßen und eine sehr hohe Lebensqualität.</p>
      </>}
      content={<>
        
      <h2>Der Charme von Pieschen</h2>
      <p>Anders als die touristische Altstadt oder die trubelige Neustadt ticken die Uhren in Pieschen etwas langsamer. Hier trifft man sich beim lokalen Bäcker oder an der Elbe. Die Verkehrsanbindung ist fantastisch, und Sie sind in wenigen Minuten im Zentrum.</p>
      
      <h2>Unsere lokalen Empfehlungen</h2>
      <ul>
        <li><strong>Ballhaus Watzke:</strong> Ein historisches Brauhaus direkt am Wasser. Das selbstgebraute Bier und der deftige Schweinebraten sind legendär. Im Sommer sitzt man herrlich im Biergarten.</li>
        <li><strong>Die Elbwiesen:</strong> Keine Empfehlung für ein Lokal, aber ein Muss: Holen Sie sich ein Getränk und setzen Sie sich abends einfach ans Ufer. Der Blick auf die Silhouette der Innenstadt in der Ferne ist unbezahlbar.</li>
        <li><strong>Bäckerei Wippler:</strong> Ein echtes Dresdner Traditionsunternehmen. Perfekt für frische Brötchen am Morgen für Ihr Apartment-Frühstück.</li>
      </ul>
      
      <h2>Ihre Unterkunft in Pieschen</h2>
      <p>Da wir Pieschen so lieben, befinden sich einige unserer schönsten Apartments genau hier. Kostenfreie Parkplätze sind im Gegensatz zum restlichen Dresden hier meist noch problemlos in den Nebenstraßen zu finden.</p>
    
      </>}
      breadcrumbs={[{"href":"/dresden-guide","label":"Guide"},{"href":"/dresden-guide/pieschen","label":"Pieschen"}]}
      apartments={filteredApartments}
    />
  );
}
