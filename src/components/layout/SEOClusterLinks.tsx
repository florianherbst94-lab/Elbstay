import Link from "next/link";
import { ArrowRight, Building2, Briefcase, Users, Car, Map, Home } from "lucide-react";

export function SEOClusterLinks() {
  const links = [
    { href: "/ferienwohnung-dresden", label: "Ferienwohnung Dresden", icon: Home, desc: "Alle Apartments im Überblick" },
    { href: "/business-apartment-dresden", label: "Business Apartments", icon: Briefcase, desc: "Möbliertes Wohnen auf Zeit" },
    { href: "/ferienwohnung-dresden-familie", label: "Familienunterkunft", icon: Users, desc: "Viel Platz für Groß und Klein" },
    { href: "/monteurwohnung-dresden", label: "Firmenunterkünfte", icon: Building2, desc: "Für Handwerker & Projektteams" },
    { href: "/ferienwohnung-dresden-mit-parkplatz", label: "Wohnungen mit Parkplatz", icon: Car, desc: "Entspannte Anreise mit dem Pkw" },
    { href: "/dresden-guide", label: "Dresden Guide", icon: Map, desc: "Lokale Tipps & Empfehlungen" }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Die passende Unterkunft für Ihren Aufenthalt in Dresden
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ganz gleich, ob Sie für einen Kurztrip, mit der Familie oder geschäftlich anreisen – entdecken Sie unsere maßgeschneiderten Angebote.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <Link 
                key={i} 
                href={link.href}
                className="group flex flex-col p-8 rounded-2xl border border-border/50 bg-background hover:shadow-xl transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-foreground">{link.label}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{link.desc}</p>
                <div className="flex items-center text-primary font-medium text-sm">
                  Mehr erfahren
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
