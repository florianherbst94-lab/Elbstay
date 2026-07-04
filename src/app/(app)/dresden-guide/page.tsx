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
              </ul>
            </div>
          </section>

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
                    Ein faszinierendes Labyrinth aus bunt gestalteten Höfen. Perfekt für einen Nachmittags-Bummel.
                  </div>
                </li>
              </ul>
            </div>
          </section>

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
                  <Utensils className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground block mb-1">Pieschener Hafen</strong>
                    Holen Sie sich ein Eis oder einen Kaffee und setzen Sie sich ans Wasser. Ein wunderbarer Ort für den Sonnenuntergang.
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
