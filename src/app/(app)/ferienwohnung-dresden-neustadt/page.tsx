import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/layout/SEOLandingPage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Ferienwohnung Dresden Neustadt & Umgebung | ElbStay",
  description: "Übernachten Sie in direkter Nähe zur angesagten Dresdner Neustadt. Stilvolle Ferienwohnungen, voll ausgestattet. Direkt buchen & Bestpreis sichern!",
  alternates: {
    canonical: `${siteConfig.url}/ferienwohnung-dresden-neustadt`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    false ? true : "urban,boutique".split(',').includes(a.id) || "urban,boutique".split(',').includes(a.type.toLowerCase())
  );

  return (
    <SEOLandingPage
      h1="Ferienwohnung nahe der Dresdner Neustadt"
      intro={<>
        <p>Die Äußere Neustadt ist Dresdens lebendigstes und buntestes Viertel – bekannt für seine alternative Szene, unzählige Cafés, Bars, Boutiquen und Streetart. Wenn Sie das pulsierende Leben suchen, aber dennoch nachts ruhig schlafen möchten, sind unsere Apartments in den angrenzenden Stadtteilen (wie dem stylischen Pieschen) die ideale Wahl. So sind Sie nur einen Katzensprung vom Geschehen entfernt, genießen aber den Rückzugsort einer erstklassig ausgestatteten Wohnung.</p>
      </>}
      targetAudienceText={<>
        <p>Dieses Viertel und seine Umgebung ziehen vor allem <strong>junge Paare, Freunde und Kulturbegeisterte</strong> an. Wer abends gerne ausgeht, in individuellen Läden stöbert oder die internationale Gastronomie Dresdens erkunden möchte, ist hier genau richtig.</p>
      </>}
      features={["Nähe zum Szeneviertel","Hervorragende ÖPNV-Anbindung","Highspeed WLAN","Flexible Anreise","Ruhige Schlafräume"]}
      locationInfo={<><p>Die Neustadt liegt nördlich der Elbe. Mit der Straßenbahn erreichen Sie von unseren Unterkünften den Albertplatz – das Herz der Neustadt – in wenigen Minuten. Auch zu Fuß oder mit dem Leihfahrrad entlang des Elbradwegs ist der Weg in die Neustadt ein Erlebnis.</p></>}
      mobilityInfo={undefined}
      parkingInfo={undefined}
      sights={<><p>Entdecken Sie die berühmte <strong>Kunsthofpassage</strong> mit ihrer farbenfrohen Architektur, das Erich-Kästner-Museum oder spazieren Sie durch den Alaunpark. Abends lockt die Alaunstraße mit einem schier endlosen Angebot an kulinarischen Highlights und gemütlichen Kneipen.</p></>}
      faqs={[{"q":"Ist es nachts laut, wenn man in der Nähe der Neustadt übernachtet?","a":"Die Neustadt selbst kann am Wochenende sehr belebt sein. Da sich unsere Apartments in den direkt angrenzenden, ruhigeren Vierteln befinden, profitieren Sie von der Nähe zum Szeneviertel, können aber nachts absolut ruhig schlafen."},{"q":"Wie komme ich von den Apartments in die historische Altstadt?","a":"Dresden hat ein exzellentes Straßenbahnnetz. Sowohl von unseren Wohnungen als auch von der Neustadt aus bringt Sie die DVB in der Regel in unter 15 Minuten direkt zu Zwinger und Frauenkirche."}]}
      relatedLinks={[{"href":"/ferienwohnung-dresden","label":"Ferienwohnung Dresden"},{"href":"/ferienwohnung-dresden-pieschen","label":"Apartments in Pieschen"},{"href":"/dresden-guide/neustadt","label":"Neustadt Guide"}]}
      breadcrumbs={[{"href":"/ferienwohnung-dresden","label":"Dresden"},{"href":"/ferienwohnung-dresden-neustadt","label":"Neustadt"}]}
      apartments={filteredApartments}
    />
  );
}
