import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/layout/SEOLandingPage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Familienfreundliche Ferienwohnung in Dresden | ElbStay",
  description: "Buchen Sie Ihre Ferienwohnung für den perfekten Familienurlaub in Dresden. Mehrere Schlafmöglichkeiten, Küche & Platz für die ganze Familie.",
  alternates: {
    canonical: `${siteConfig.url}/ferienwohnung-dresden-familie`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    false ? true : "premium-1,boutique,urban".split(',').includes(a.id) || "premium-1,boutique,urban".split(',').includes(a.type.toLowerCase())
  );

  return (
    <SEOLandingPage
      h1="Ferienwohnung für Familien in Dresden"
      intro={<>
        <p>Ein Städtetrip mit Kindern stellt besondere Anforderungen an eine Unterkunft. In unseren familienfreundlichen Ferienwohnungen in Dresden finden Sie den nötigen Platz und Komfort, damit sich Groß und Klein wohlfühlen. Statt sich auf enge Hotelzimmer aufzuteilen, genießen Sie hier gemeinsame Mahlzeiten am großen Esstisch und entspannte Abende im eigenen Wohnzimmer.</p>
      </>}
      targetAudienceText={<>
        <p>Besonders geeignet für <strong>Familien mit Kindern</strong> oder <strong>kleinere Reisegruppen</strong>. Die Aufteilung in Wohn- und separate Schlafbereiche ermöglicht es den Eltern, abends noch gemütlich zusammenzusitzen, während die Kinder bereits schlafen.</p>
      </>}
      features={["Ausziehbare Schlafcouch","Küche zur Selbstversorgung","Fernseher mit Streaming","Waschmaschine","Sichere, ruhige Umgebung"]}
      locationInfo={<><p>Unsere Apartments befinden sich in familienfreundlichen und gut angebundenen Vierteln. Kurze Wege zum nächsten Supermarkt oder Bäcker erleichtern die morgendliche Organisation. Auch Spielplätze und Parks sind in den Wohnvierteln gut erreichbar.</p></>}
      mobilityInfo={undefined}
      parkingInfo={undefined}
      sights={<><p>Dresden bietet fantastische Ausflugsziele für Familien: Besuchen Sie das Deutsche Hygiene-Museum (mit speziellem Kindermuseum), den Zoo Dresden oder machen Sie eine aufregende Fahrt mit der Schwebebahn in Loschwitz. Auch eine Fahrt mit einem historischen Raddampfer auf der Elbe ist ein Highlight für Kinder.</p></>}
      faqs={[{"q":"Ist ein Babybett vorhanden?","a":"Bitte kontaktieren Sie uns direkt nach der Buchung, um die Bereitstellung eines Babybettes (Hauck Reisebett) anzufragen."},{"q":"Gibt es Möglichkeiten Wäsche zu waschen?","a":"Die meisten unserer Apartments, wie z.B. das ElbStay Urban, verfügen über eine eigene Waschmaschine in der Wohnung."}]}
      relatedLinks={[{"href":"/ferienwohnung-dresden","label":"Ferienwohnung Dresden"},{"href":"/ferienwohnung-dresden-mit-parkplatz","label":"Apartments mit Parkplatz"}]}
      breadcrumbs={[{"href":"/ferienwohnung-dresden","label":"Dresden"},{"href":"/ferienwohnung-dresden-familie","label":"Familie"}]}
      apartments={filteredApartments}
    />
  );
}
