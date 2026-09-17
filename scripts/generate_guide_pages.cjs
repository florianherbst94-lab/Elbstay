const fs = require('fs');
const path = require('path');

const pages = [
  {
    slug: 'dresden-guide',
    title: 'Dresden Guide | Lokale Tipps von Gastgebern',
    desc: 'Entdecken Sie Dresden mit echten Insider-Tipps von Ihren ElbStay-Gastgebern. Stadtteile, Sehenswürdigkeiten und kulinarische Highlights.',
    h1: 'Dresden Local Guide',
    intro: '<p>Willkommen in unserem persönlichen Dresden Guide! Als leidenschaftliche Gastgeber möchten wir unsere Begeisterung für diese vielfältige Stadt mit Ihnen teilen. Vergessen Sie standardisierte Touristenführer – hier finden Sie unsere ganz persönlichen Empfehlungen für Restaurants, Spaziergänge und Viertel, die Sie gesehen haben müssen.</p>',
    content: `
      <h2>Die Stadtteile im Überblick</h2>
      <p>Dresden ist mehr als nur die historische Altstadt. Jedes Viertel hat seinen eigenen Charakter.</p>
      <ul>
        <li><a href="/dresden-guide/altstadt" style="color:hsl(var(--primary))">Die Altstadt:</a> Das historische Herz der Stadt mit Zwinger, Semperoper und Frauenkirche.</li>
        <li><a href="/dresden-guide/neustadt" style="color:hsl(var(--primary))">Die Äußere Neustadt:</a> Bunt, alternativ und lebendig. Hier tobt das Nachtleben.</li>
        <li><a href="/dresden-guide/pieschen" style="color:hsl(var(--primary))">Pieschen:</a> Ruhiges, aufstrebendes Elbviertel mit wunderschönen Altbauten und familiärer Atmosphäre.</li>
      </ul>
      <h2>Unsere Top 3 Aktivitäten abseits des Trubels</h2>
      <ol>
        <li><strong>Fahrradtour auf dem Elbradweg:</strong> Mieten Sie sich ein Fahrrad und radeln Sie bis nach Schloss Pillnitz. Die Elbwiesen bieten Natur pur direkt in der Stadt.</li>
        <li><strong>Standseilbahn Loschwitz:</strong> Ein fantastischer Blick über das Elbtal – besonders bei Sonnenuntergang zu empfehlen.</li>
        <li><strong>Brauhaus Watzke in Pieschen:</strong> Uriges Ambiente und frisch gebrautes Bier direkt am Fluss.</li>
      </ol>
    `,
    breadcrumbs: [
      { href: '/dresden-guide', label: 'Guide' }
    ],
    apartmentFilter: 'all'
  },
  {
    slug: 'dresden-guide/neustadt',
    title: 'Dresden Neustadt Guide | Bars, Kunst & Streetart',
    desc: 'Erkunden Sie die Äußere Neustadt in Dresden. Die besten Cafés, Kunsthöfe und Tipps für das Szeneviertel.',
    h1: 'Guide: Äußere Neustadt',
    intro: '<p>Die Äußere Neustadt ist das kreative und pulsierende Zentrum Dresdens. Wer Streetart, alternative Cafés, kleine Boutiquen und ein lebendiges Nachtleben sucht, wird dieses Viertel lieben.</p>',
    content: `
      <h2>Was Sie in der Neustadt sehen sollten</h2>
      <p>Beginnen Sie Ihren Spaziergang am Albertplatz und lassen Sie sich einfach durch die Alaunstraße und Louisenstraße treiben. Ein absolutes Muss ist die <strong>Kunsthofpassage</strong>. Diese miteinander verbundenen Innenhöfe wurden von Künstlern individuell gestaltet – am bekanntesten ist der "Hof der Elemente" mit seiner blauen Fassade und den Regenrinnen, die bei Regen Musik machen.</p>
      
      <h2>Essen & Trinken</h2>
      <ul>
        <li><strong>Katy's Garage:</strong> Eine Institution. Tagsüber gemütlicher Biergarten, abends Club.</li>
        <li><strong>Raskolnikoff:</strong> Urige Kneipe mit einem versteckten, wunderschönen Garten im Hinterhof. Hervorragende Pelmeni!</li>
        <li><strong>Café Eckstein:</strong> Perfekt für ein ausgedehntes Frühstück am Wochenende.</li>
      </ul>
      
      <h2>Anreise & Tipps</h2>
      <p>In der Neustadt sind Parkplätze absolute Mangelware. Kommen Sie am besten mit der Straßenbahn (Linien 3, 6, 7, 8 oder 11 bis Albertplatz). Wenn Sie es nachts ruhiger mögen, empfehlen wir Ihnen unsere <a href="/ferienwohnung-dresden-pieschen" style="color:hsl(var(--primary))">Apartments im direkt angrenzenden Pieschen</a>.</p>
    `,
    breadcrumbs: [
      { href: '/dresden-guide', label: 'Guide' },
      { href: '/dresden-guide/neustadt', label: 'Neustadt' }
    ],
    apartmentFilter: 'urban,boutique'
  },
  {
    slug: 'dresden-guide/pieschen',
    title: 'Dresden Pieschen Guide | Ruhiges Elbviertel entdecken',
    desc: 'Pieschen: Das gemütliche und aufstrebende Viertel an der Elbe. Geheimtipps für Restaurants und Spaziergänge von ElbStay.',
    h1: 'Guide: Dresden-Pieschen',
    intro: '<p>Pieschen ist unser persönlicher Favorit für alle, die das authentische, entspannte Dresden erleben wollen. Direkt an der Elbe gelegen, besticht das Viertel durch liebevoll sanierte Altbauten, kleine Straßen und eine sehr hohe Lebensqualität.</p>',
    content: `
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
    `,
    breadcrumbs: [
      { href: '/dresden-guide', label: 'Guide' },
      { href: '/dresden-guide/pieschen', label: 'Pieschen' }
    ],
    apartmentFilter: 'boutique,urban'
  },
  {
    slug: 'dresden-guide/altstadt',
    title: 'Dresden Altstadt Guide | Historisches Zentrum',
    desc: 'Der ElbStay Guide für die Dresdner Altstadt. Zwinger, Frauenkirche und Geheimtipps in Elbnähe.',
    h1: 'Guide: Die historische Altstadt',
    intro: '<p>Dresden wird oft als "Elbflorenz" bezeichnet – und wer einmal das Panorama der Altstadt vom nördlichen Elbufer (dem "Canaletto-Blick") gesehen hat, weiß auch warum. Die Altstadt ist das prachtvolle Zentrum der sächsischen Historie.</p>',
    content: `
      <h2>Die großen Klassiker</h2>
      <p>Man kann die Altstadt nicht besuchen, ohne die großen Wahrzeichen gesehen zu haben:</p>
      <ul>
        <li><strong>Die Frauenkirche:</strong> Nach der Zerstörung im Krieg eindrucksvoll wiederaufgebaut. Ein Aufstieg auf die Kuppel bietet einen grandiosen Rundumblick.</li>
        <li><strong>Der Zwinger:</strong> Ein barockes Gesamtkunstwerk. Besonders der Kronenwall und das Nymphenbad sind spektakuläre Fotomotive.</li>
        <li><strong>Semperoper & Residenzschloss:</strong> Das kulturelle Herz der Stadt. Wer Zeit hat, sollte unbedingt das "Historische Grüne Gewölbe" im Schloss besuchen – die königliche Schatzkammer ist atemberaubend.</li>
      </ul>
      
      <h2>Tipps abseits der großen Pfade</h2>
      <p>Verlassen Sie die breiten Plätze und spazieren Sie durch die kleinen Gassen rund um die Münzgasse. Dort finden sich exzellente Restaurants. Auch ein Spaziergang auf der Brühlschen Terrasse ("Der Balkon Europas") ist Pflichtprogramm. Wenn Sie es ruhiger mögen, empfehlen wir Ihnen unsere Unterkünfte etwas abseits des absoluten Touristenzentrums, die dennoch eine exzellente Anbindung an die Altstadt bieten.</p>
    `,
    breadcrumbs: [
      { href: '/dresden-guide', label: 'Guide' },
      { href: '/dresden-guide/altstadt', label: 'Altstadt' }
    ],
    apartmentFilter: 'premium-1'
  }
];

const template = `import type { Metadata } from "next";
import { GuidePage } from "@/components/layout/GuidePage";
import { APARTMENTS } from "@/lib/data/apartments";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "{{TITLE}}",
  description: "{{DESC}}",
  alternates: {
    canonical: \`\${siteConfig.url}/{{SLUG}}\`,
  },
};

export default function Page() {
  const filteredApartments = APARTMENTS.filter(a => 
    "{{FILTER}}" === "all" ? true : "{{FILTER}}".split(',').includes(a.id) || "{{FILTER}}".split(',').includes(a.type.toLowerCase())
  );

  return (
    <GuidePage
      title="{{H1}}"
      intro={<>
        {{INTRO}}
      </>}
      content={<>
        {{CONTENT}}
      </>}
      breadcrumbs={{{BREADCRUMBS}}}
      apartments={filteredApartments}
    />
  );
}
`;

pages.forEach(p => {
  const dir = path.join(__dirname, '..', 'src', 'app', '(app)', p.slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  let content = template
    .replace('{{TITLE}}', p.title)
    .replace('{{DESC}}', p.desc)
    .replace('{{SLUG}}', p.slug)
    .replace('{{H1}}', p.h1)
    .replace('{{INTRO}}', p.intro || '')
    .replace('{{CONTENT}}', p.content || '')
    .replace('{{BREADCRUMBS}}', JSON.stringify(p.breadcrumbs || []))
    .replace(/{{FILTER}}/g, p.apartmentFilter);
    
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

console.log('Guide Pages generated!');
