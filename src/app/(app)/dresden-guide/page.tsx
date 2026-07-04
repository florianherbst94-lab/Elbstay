import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Coffee, Utensils, Music, Landmark, ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Dresden Guide | Insider-Tipps für Ihren Aufenthalt",
  description: "Entdecken Sie Dresden wie ein Local. Sehenswürdigkeiten, Geheimtipps, Restaurants und Cafés in Pieschen, Neustadt und der Altstadt.",
  keywords: ["Dresden Insider Tipps", "Sehenswürdigkeiten Dresden", "Restaurant Dresden Pieschen", "Dresden Guide", "Was tun in Dresden"],
};

export default function DresdenGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Dresden Insider Guide: Die besten Tipps für Ihren Städtetrip",
    image: "https://elbstay.de/images/dresden_hero_user_final.jpg",
    author: {
      "@type": "Organization",
      name: "ElbStay"
    },
    publisher: {
      "@type": "Organization",
      name: "ElbStay",
      logo: {
        "@type": "ImageObject",
        url: "https://elbstay.de/icon.png"
      }
    },
    description: "Entdecken Sie Dresden wie ein Local. Sehenswürdigkeiten, Geheimtipps, Restaurants und Cafés in Pieschen, Neustadt und der Altstadt."
  };

  return (
    <div className="bg-background pt-32 pb-24 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">ElbStay Entdecken</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Dresden Insider Guide
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Abseits der ausgetretenen Pfade: Unsere persönlichen Empfehlungen für einen unvergesslichen Aufenthalt in unserer schönen Heimatstadt.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-20">
          <Image
            src="/images/dresden_hero_user_final.jpg"
            alt="Dresden Skyline"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="space-y-20">
          
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Landmark className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold">Die Altstadt (Classic Dresden)</h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
              <p>
                Natürlich dürfen die Klassiker bei keinem Dresden-Besuch fehlen. Das Besondere: Von unseren ElbStay Apartments spazieren Sie einfach am herrlichen Elbradweg entlang bis direkt ins historische Zentrum.
              </p>
              <ul className="space-y-4 mt-6 list-none pl-0">
                <li className="flex gap-4 items-start">
                  <Camera className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Frauenkirche & Neumarkt</strong>
                    Besuchen Sie den Neumarkt am besten früh morgens oder in den Abendstunden, wenn die großen Touristenströme weg sind. Die Stimmung ist dann magisch.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Camera className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Zwinger & Semperoper</strong>
                    Ein Spaziergang durch den Innenhof des Zwingers ist kostenlos und gehört zum Pflichtprogramm. 
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Landmark className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Residenzschloss & Grünes Gewölbe</strong>
                    Das historische Schloss beherbergt eine der reichsten Schatzkammern Europas. Ein perfekter Tipp für Tage, an denen das Wetter mal nicht mitspielt.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Camera className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Brühlsche Terrasse</strong>
                    Bekannt als der "Balkon Europas". Schlendern Sie hier entlang und genießen Sie den herrlichen Blick über die Elbe.
                  </div>
                </li>
              </ul>
              
              <div className="bg-muted p-4 rounded-xl mt-6 border-l-4 border-primary">
                <strong>Insider-Tipp:</strong> Von unseren ElbStay Urban und Boutique Apartments (in Pieschen) fahren Sie am besten einfach mit der Straßenbahnlinie 4 oder 9 direkt und ohne Umsteigen in die Altstadt (Fahrtzeit ca. 12 Minuten). Alternativ bietet sich der wunderschöne Elbradweg an!
              </div>
            </div>
          </section>

          {/* Image Break 1 */}
          <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-lg my-12">
            <Image
              src="/images/skyline_sunset.png"
              alt="Dresden Skyline bei Sonnenuntergang"
              fill
              className="object-cover"
            />
          </div>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Music className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold">Äußere Neustadt (Das Szeneviertel)</h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
              <p>
                Wer das junge, kreative und lebendige Dresden sucht, muss in die Äußere Neustadt. Hier reihen sich individuelle Boutiquen, gemütliche Cafés und urige Bars aneinander.
              </p>
              <ul className="space-y-4 mt-6 list-none pl-0">
                <li className="flex gap-4 items-start">
                  <Coffee className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Kunsthofpassage</strong>
                    Ein faszinierendes Labyrinth aus bunt gestalteten Höfen. Perfekt für einen Nachmittags-Bummel durch kleine Boutiquen.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Utensils className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Essen & Trinken</strong>
                    Für ein besonderes Abendessen empfehlen wir das <strong>Raskolnikoff</strong> (uriges Ambiente und ein toller Innenhof) oder die <strong>Lila Soße</strong> (moderne deutsche Küche in Tapas-Form, direkt in der Kunsthofpassage).
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Music className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Abendgestaltung</strong>
                    Schlendern Sie über die Alaunstraße und Louisenstraße. Für einen entspannten Abend empfehlen wir einen Besuch im <strong>Thalia Kino</strong> – einem kleinen Programmkino mit angeschlossener, gemütlicher Bar.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Image Break 2 */}
          <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-lg my-12">
            <Image
              src="/images/dresden_premium_skyline.png"
              alt="Blick auf die Frauenkirche"
              fill
              className="object-cover"
            />
          </div>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Utensils className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold">Rund um Ihr Apartment (Pieschen)</h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
              <p>
                Dresden-Pieschen, die Heimat unserer ElbStay Boutique und Urban Apartments, entwickelt sich zunehmend zum Geheimtipp. Authentisch, entspannt und nah am Wasser.
              </p>
              <ul className="space-y-4 mt-6 list-none pl-0">
                <li className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Pieschener Hafen & Elbradweg</strong>
                    Holen Sie sich ein Eis oder einen Kaffee und setzen Sie sich ans Wasser. Der Elbradweg eignet sich zudem perfekt für eine entspannte Joggingrunde am Morgen.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Utensils className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Ballhaus Watzke</strong>
                    Ein traditionelles Brauhaus direkt an der Elbe mit grandiosem Blick auf die Altstadt-Silhouette (den berühmten "Canaletto-Blick"). Von den Apartments in Pieschen in ca. 15 Minuten bei einem wunderschönen Spaziergang am Wasser zu erreichen. Ein absolutes Muss!
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Utensils className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Restaurants um die Ecke</strong>
                    Wenn Sie abends nicht mehr weit laufen möchten, probieren Sie das <strong>Savoir Vivre</strong> oder die <strong>Pfalzstube</strong> – gemütliche Lokale mit hervorragendem Wein und Essen, direkt bei uns im Viertel.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold">Praktische Tipps für Dresden</h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
              <p>
                Damit Ihr Aufenthalt von der ersten Minute an reibungslos verläuft, hier noch ein paar praktische Hinweise für die Navigation durch unsere Stadt:
              </p>
              <ul className="space-y-4 mt-6 list-none pl-0">
                <li className="flex gap-4 items-start">
                  <Landmark className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Nahverkehr (DVB)</strong>
                    Dresden hat ein hervorragendes Straßenbahn-Netz. Ein eigenes Auto benötigen Sie im Zentrum absolut nicht. Nutzen Sie am besten die DVB-App für aktuelle Verbindungen. Die Haltestellen sind von all unseren Apartments in wenigen Minuten zu Fuß erreichbar.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Camera className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Beste Reisezeit</strong>
                    Während der Sommer ideal für laue Abende an der Elbe ist, hat Dresden auch im Winter einen ganz besonderen Zauber: Der Striezelmarkt ist einer der ältesten und schönsten Weihnachtsmärkte Deutschlands.
                  </div>
                </li>
              </ul>
            </div>
          </section>

        </div>

        {/* CTA - Direct Booking Appeal */}
        <div className="mt-24 bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Müde vom Sightseeing?
            </h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Erkunden Sie Dresden am Tag und entspannen Sie abends in Ihrem stilvollen ElbStay Apartment. 
              <br/><br/>
              <strong>Tipp: Buchen Sie direkt über unsere Website und sparen Sie 10% gegenüber Airbnb!</strong>
            </p>
            <div className="flex justify-center">
              <Link href="/search">
                <Button size="lg" className="rounded-full px-8 h-14 text-base shadow-xl">
                  Freie Apartments prüfen <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
