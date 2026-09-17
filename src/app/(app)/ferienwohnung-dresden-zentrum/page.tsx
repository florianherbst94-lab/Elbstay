import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/layout/SEOLandingPage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Ferienwohnung Dresden Zentrum | ElbStay Premium",
  description: "Luxuriöses Penthouse im Herzen von Dresden. Große Dachterrasse, Altstadtnähe, exklusive Ausstattung. Ihre zentrale Ferienwohnung für besondere Momente.",
  alternates: {
    canonical: `${siteConfig.url}/ferienwohnung-dresden-zentrum`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    false ? true : "premium-1".split(',').includes(a.id) || "premium-1".split(',').includes(a.type.toLowerCase())
  );

  return (
    <SEOLandingPage
      h1="Ferienwohnung im Zentrum von Dresden"
      intro={<>
        <p>Direkt am Puls der Stadt: Wer Dresden in all seiner Pracht erleben möchte, ist in einer Ferienwohnung im Zentrum am besten aufgehoben. Genießen Sie kurze Wege zu den bekanntesten Sehenswürdigkeiten, den Museen und den Elbterrassen. Unser Premium-Apartment, das exklusive Penthouse, bietet Ihnen genau diese zentrale Lage, gepaart mit absoluter Ruhe und Privatsphäre über den Dächern von Dresden.</p>
      </>}
      targetAudienceText={<>
        <p>Perfekt für <strong>anspruchsvolle Städtereisende, Paare und kleine Gruppen</strong>, die bei Lage und Komfort keine Kompromisse eingehen möchten. Ein Highlight für besondere Anlässe, wie Jubiläen oder einen luxuriösen Wochenendtrip.</p>
      </>}
      features={["Direkte Innenstadtlage","Weitläufige private Dachterrasse","Exklusive Designausstattung","Panoramablick über die Stadt","Zwei separate Schlafzimmer"]}
      locationInfo={<><p>Das Apartment befindet sich in der Wilsdruffer Vorstadt, direkt angebunden an den historischen Kern. Sie wohnen mittendrin, ohne dem direkten touristischen Lärm der Fußgängerzonen ausgesetzt zu sein.</p></>}
      mobilityInfo={undefined}
      parkingInfo={undefined}
      sights={<><p>Ihre Sightseeing-Tour beginnt direkt an der Haustür. Zu Fuß erreichen Sie innerhalb von 10 bis 15 Minuten das Dresdner Schloss, den Zwinger, die Semperoper und das lebendige Schauspielhaus. Auch das Ostragehege und die Elbwiesen sind für einen morgendlichen Jogginglauf direkt erreichbar.</p></>}
      faqs={[{"q":"Ist das Zentrum laut?","a":"Dank der Lage als Penthouse im obersten Stockwerk genießen Sie absolute Ruhe über den Dächern der Stadt, auch wenn Sie sich mitten im Zentrum befinden."},{"q":"Wo kann ich am Zentrum parken?","a":"In der direkten Umgebung stehen kostenpflichtige Parkhäuser und bewirtschaftete Straßenparkplätze zur Verfügung."}]}
      relatedLinks={[{"href":"/ferienwohnung-dresden","label":"Alle Apartments ansehen"},{"href":"/business-apartment-dresden","label":"Premium Business Wohnungen"}]}
      breadcrumbs={[{"href":"/ferienwohnung-dresden","label":"Dresden"},{"href":"/ferienwohnung-dresden-zentrum","label":"Zentrum"}]}
      apartments={filteredApartments}
    />
  );
}
