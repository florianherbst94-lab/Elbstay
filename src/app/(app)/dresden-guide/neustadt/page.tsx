import type { Metadata } from "next";
import { GuidePage } from "@/components/layout/GuidePage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Dresden Neustadt Guide | Bars, Kunst & Streetart",
  description: "Erkunden Sie die Äußere Neustadt in Dresden. Die besten Cafés, Kunsthöfe und Tipps für das Szeneviertel.",
  alternates: {
    canonical: `${siteConfig.url}/dresden-guide/neustadt`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    false ? true : "urban,boutique".split(',').includes(a.id) || "urban,boutique".split(',').includes(a.type.toLowerCase())
  );

  return (
    <GuidePage
      title="Guide: Äußere Neustadt"
      intro={<>
        <p>Die Äußere Neustadt ist das kreative und pulsierende Zentrum Dresdens. Wer Streetart, alternative Cafés, kleine Boutiquen und ein lebendiges Nachtleben sucht, wird dieses Viertel lieben.</p>
      </>}
      content={<>
        
      <h2>Was Sie in der Neustadt sehen sollten</h2>
      <p>Beginnen Sie Ihren Spaziergang am Albertplatz und lassen Sie sich einfach durch die Alaunstraße und Louisenstraße treiben. Ein absolutes Muss ist die <strong>Kunsthofpassage</strong>. Diese miteinander verbundenen Innenhöfe wurden von Künstlern individuell gestaltet – am bekanntesten ist der "Hof der Elemente" mit seiner blauen Fassade und den Regenrinnen, die bei Regen Musik machen.</p>
      
      <h2>Essen & Trinken</h2>
      <ul>
        <li><strong>Katy's Garage:</strong> Eine Institution. Tagsüber gemütlicher Biergarten, abends Club.</li>
        <li><strong>Raskolnikoff:</strong> Urige Kneipe mit einem versteckten, wunderschönen Garten im Hinterhof. Hervorragende Pelmeni!</li>
        <li><strong>Café Eckstein:</strong> Perfekt für ein ausgedehntes Frühstück am Wochenende.</li>
      </ul>
      
      <h2>Anreise & Tipps</h2>
      <p>In der Neustadt sind Parkplätze absolute Mangelware. Kommen Sie am besten mit der Straßenbahn (Linien 3, 6, 7, 8 oder 11 bis Albertplatz). Wenn Sie es nachts ruhiger mögen, empfehlen wir Ihnen unsere <a href="/ferienwohnung-dresden-pieschen" className="text-primary">Apartments im direkt angrenzenden Pieschen</a>.</p>
    
      </>}
      breadcrumbs={[{"href":"/dresden-guide","label":"Guide"},{"href":"/dresden-guide/neustadt","label":"Neustadt"}]}
      apartments={filteredApartments}
    />
  );
}
