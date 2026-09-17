import type { Metadata } from "next";
import { GuidePage } from "@/components/layout/GuidePage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Dresden Altstadt Guide | Historisches Zentrum",
  description: "Der ElbStay Guide für die Dresdner Altstadt. Zwinger, Frauenkirche und Geheimtipps in Elbnähe.",
  alternates: {
    canonical: `${siteConfig.url}/dresden-guide/altstadt`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    false ? true : "premium-1".split(',').includes(a.id) || "premium-1".split(',').includes(a.type.toLowerCase())
  );

  return (
    <GuidePage
      title="Guide: Die historische Altstadt"
      intro={<>
        <p>Dresden wird oft als "Elbflorenz" bezeichnet – und wer einmal das Panorama der Altstadt vom nördlichen Elbufer (dem "Canaletto-Blick") gesehen hat, weiß auch warum. Die Altstadt ist das prachtvolle Zentrum der sächsischen Historie.</p>
      </>}
      content={<>
        
      <h2>Die großen Klassiker</h2>
      <p>Man kann die Altstadt nicht besuchen, ohne die großen Wahrzeichen gesehen zu haben:</p>
      <ul>
        <li><strong>Die Frauenkirche:</strong> Nach der Zerstörung im Krieg eindrucksvoll wiederaufgebaut. Ein Aufstieg auf die Kuppel bietet einen grandiosen Rundumblick.</li>
        <li><strong>Der Zwinger:</strong> Ein barockes Gesamtkunstwerk. Besonders der Kronenwall und das Nymphenbad sind spektakuläre Fotomotive.</li>
        <li><strong>Semperoper & Residenzschloss:</strong> Das kulturelle Herz der Stadt. Wer Zeit hat, sollte unbedingt das "Historische Grüne Gewölbe" im Schloss besuchen – die königliche Schatzkammer ist atemberaubend.</li>
      </ul>
      
      <h2>Tipps abseits der großen Pfade</h2>
      <p>Verlassen Sie die breiten Plätze und spazieren Sie durch die kleinen Gassen rund um die Münzgasse. Dort finden sich exzellente Restaurants. Auch ein Spaziergang auf der Brühlschen Terrasse ("Der Balkon Europas") ist Pflichtprogramm. Wenn Sie es ruhiger mögen, empfehlen wir Ihnen unsere Unterkünfte etwas abseits des absoluten Touristenzentrums, die dennoch eine exzellente Anbindung an die Altstadt bieten.</p>
    
      </>}
      breadcrumbs={[{"href":"/dresden-guide","label":"Guide"},{"href":"/dresden-guide/altstadt","label":"Altstadt"}]}
      apartments={filteredApartments}
    />
  );
}
