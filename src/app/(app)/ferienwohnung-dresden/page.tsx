import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/layout/SEOLandingPage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Ferienwohnung Dresden mieten | ElbStay Apartments",
  description: "Hochwertige Ferienwohnungen & Apartments in Dresden direkt an der Elbe. Zentral, modern & mit voll ausgestatteter Küche. Direkt beim Gastgeber buchen!",
  alternates: {
    canonical: `${siteConfig.url}/ferienwohnung-dresden`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    false ? true : "all".split(',').includes(a.id) || "all".split(',').includes(a.type.toLowerCase())
  );

  return (
    <SEOLandingPage
      h1="Ihre Ferienwohnung in Dresden"
      intro={<>
        <p>Suchen Sie eine stilvolle und komfortable Unterkunft für Ihren Aufenthalt in der sächsischen Landeshauptstadt? Bei ElbStay bieten wir Ihnen sorgfältig eingerichtete Ferienwohnungen in erstklassigen Lagen. Genießen Sie die Privatsphäre eines eigenen Apartments, kombiniert mit dem Service und der Qualität, die Sie sich wünschen. Ob für einen Städtetrip, einen Familienurlaub oder als Ausgangspunkt zur Erkundung von Zwinger, Frauenkirche und Semperoper – bei uns finden Sie Ihr zweites Zuhause in Dresden.</p>
      </>}
      targetAudienceText={<>
        <p>Unsere Ferienwohnungen eignen sich perfekt für <strong>Paare</strong>, die einen romantischen Kurzurlaub verbringen möchten, <strong>Familien</strong>, die Platz und Flexibilität benötigen, sowie <strong>Kulturinteressierte</strong>, die die Museen und Sehenswürdigkeiten Dresdens entdecken wollen. Dank der voll ausgestatteten Küchen können Sie sich ganz nach Ihren Wünschen selbst versorgen. Der komfortable Wohnbereich lädt nach einem ereignisreichen Tag in der Stadt zum Entspannen ein.</p>
      </>}
      features={["Voll ausgestattete Küche","Highspeed WLAN","Smart-TV","Bequeme Boxspringbetten","Modernes Badezimmer"]}
      locationInfo={<><p>Dresden bietet eine faszinierende Mischung aus Historie und moderner Urbanität. Unsere Unterkünfte befinden sich in strategisch günstigen Lagen wie dem aufstrebenden Pieschen, dem zentralen Löbtau oder direkt in der Mitte der Stadt. So erreichen Sie die historische Altstadt, das Szeneviertel Neustadt und die malerischen Elbwiesen in kürzester Zeit.</p></>}
      mobilityInfo={<><p>Die Anbindung an den öffentlichen Nahverkehr (DVB) ist bei allen unseren Apartments hervorragend. Straßenbahn- und Bushaltestellen befinden sich meist nur wenige Gehminuten entfernt, sodass Sie das Auto getrost stehen lassen können. Auch der Hauptbahnhof und der Bahnhof Neustadt sind schnell und unkompliziert erreichbar.</p></>}
      parkingInfo={<><p>Informationen zum Parken finden Sie spezifisch bei jeder Unterkunft. Während einige unserer Apartments über kostenfreie öffentliche Parkmöglichkeiten in den direkten Nebenstraßen verfügen, bieten andere Lagen kostenpflichtige Parkplätze direkt am Gebäude oder in umliegenden Parkhäusern.</p></>}
      sights={<><p>Zu den Must-Sees gehören zweifellos die <strong>Frauenkirche</strong>, der <strong>Zwinger</strong>, das <strong>Residenzschloss</strong> und die <strong>Semperoper</strong>. Ein Spaziergang über die Brühlsche Terrasse oder durch die Kunsthofpassage in der Äußeren Neustadt runden das Erlebnis ab. Für Naturfreunde ist ein Ausflug in den Großen Garten oder entlang des Elbradwegs absolut empfehlenswert.</p></>}
      faqs={[{"q":"Gibt es Mindestaufenthalte für die Ferienwohnungen?","a":"Ja, je nach Saison und Wochentag kann es einen Mindestaufenthalt von 2 oder 3 Nächten geben. Die genauen Bedingungen sehen Sie direkt bei der Datumseingabe im Buchungskalender."},{"q":"Sind Handtücher und Bettwäsche inklusive?","a":"Selbstverständlich. Bei Ihrer Ankunft sind die Betten frisch bezogen und ausreichend Handtücher liegen für Sie bereit."},{"q":"Wie funktioniert der Check-in?","a":"Wir bieten einen bequemen, kontaktlosen Self Check-in an. Sie erhalten vor Ihrer Anreise einen individuellen Zugangscode oder Schlüsselkasten-Code, mit dem Sie jederzeit nach 15:00 Uhr flexibel anreisen können."},{"q":"Warum sollte ich direkt über die Website buchen?","a":"Bei einer Direktbuchung über unsere Website sparen Sie sich die Servicegebühren der großen Portale wie Airbnb oder Booking.com. Zudem profitieren Sie von unseren flexiblen Stornierungsbedingungen (kostenlos bis 7 Tage vor Anreise)."}]}
      relatedLinks={[{"href":"/ferienwohnung-dresden-neustadt","label":"Ferienwohnung nahe Neustadt"},{"href":"/ferienwohnung-dresden-pieschen","label":"Ferienwohnung Pieschen"},{"href":"/business-apartment-dresden","label":"Business Apartments"},{"href":"/ferienwohnung-dresden-familie","label":"Urlaub mit Familie"}]}
      breadcrumbs={[{"href":"/ferienwohnung-dresden","label":"Ferienwohnung Dresden"}]}
      apartments={filteredApartments}
    />
  );
}
