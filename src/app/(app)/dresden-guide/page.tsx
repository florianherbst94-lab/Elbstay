import type { Metadata } from "next";
import { GuidePage } from "@/components/layout/GuidePage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Dresden Guide | Lokale Tipps von Gastgebern",
  description: "Entdecken Sie Dresden mit echten Insider-Tipps von Ihren ElbStay-Gastgebern. Stadtteile, Sehenswürdigkeiten und kulinarische Highlights.",
  alternates: {
    canonical: `${siteConfig.url}/dresden-guide`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    false ? true : "all".split(',').includes(a.id) || "all".split(',').includes(a.type.toLowerCase())
  );

  return (
    <GuidePage
      title="Dresden Local Guide"
      intro={<>
        <p>Willkommen in unserem persönlichen Dresden Guide! Als leidenschaftliche Gastgeber möchten wir unsere Begeisterung für diese vielfältige Stadt mit Ihnen teilen. Vergessen Sie standardisierte Touristenführer – hier finden Sie unsere ganz persönlichen Empfehlungen für Restaurants, Spaziergänge und Viertel, die Sie gesehen haben müssen.</p>
      </>}
      content={<>
        
      <h2>Die Stadtteile im Überblick</h2>
      <p>Dresden ist mehr als nur die historische Altstadt. Jedes Viertel hat seinen eigenen Charakter.</p>
      <ul>
        <li><a href="/dresden-guide/altstadt" className="text-primary">Die Altstadt:</a> Das historische Herz der Stadt mit Zwinger, Semperoper und Frauenkirche.</li>
        <li><a href="/dresden-guide/neustadt" className="text-primary">Die Äußere Neustadt:</a> Bunt, alternativ und lebendig. Hier tobt das Nachtleben.</li>
        <li><a href="/dresden-guide/pieschen" className="text-primary">Pieschen:</a> Ruhiges, aufstrebendes Elbviertel mit wunderschönen Altbauten und familiärer Atmosphäre.</li>
      </ul>
      <h2>Unsere Top 3 Aktivitäten abseits des Trubels</h2>
      <ol>
        <li><strong>Fahrradtour auf dem Elbradweg:</strong> Mieten Sie sich ein Fahrrad und radeln Sie bis nach Schloss Pillnitz. Die Elbwiesen bieten Natur pur direkt in der Stadt.</li>
        <li><strong>Standseilbahn Loschwitz:</strong> Ein fantastischer Blick über das Elbtal – besonders bei Sonnenuntergang zu empfehlen.</li>
        <li><strong>Brauhaus Watzke in Pieschen:</strong> Uriges Ambiente und frisch gebrautes Bier direkt am Fluss.</li>
      </ol>
    
      </>}
      breadcrumbs={[{"href":"/dresden-guide","label":"Guide"}]}
      apartments={filteredApartments}
    />
  );
}
