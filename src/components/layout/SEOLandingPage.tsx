import { ApartmentData } from "@/lib/data/apartments";
import { ApartmentCard } from "@/components/apartment/ApartmentCard";
import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/data/config";

export interface SEOLandingPageProps {
  h1: string;
  intro: React.ReactNode;
  apartments: ApartmentData[];
  targetAudienceText: React.ReactNode;
  features: string[];
  locationInfo?: React.ReactNode;
  mobilityInfo?: React.ReactNode;
  parkingInfo?: React.ReactNode;
  sights?: React.ReactNode;
  faqs: { q: string; a: string }[];
  relatedLinks: { href: string; label: string }[];
  breadcrumbs: { href: string; label: string }[];
}

export function SEOLandingPage({
  h1,
  intro,
  apartments,
  targetAudienceText,
  features,
  locationInfo,
  mobilityInfo,
  parkingInfo,
  sights,
  faqs,
  relatedLinks,
  breadcrumbs
}: SEOLandingPageProps) {
  return (
    <div className="bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
            </li>
            {breadcrumbs.map((bc, idx) => (
              <li key={bc.href} className="inline-flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-foreground font-medium" aria-current="page">{bc.label}</span>
                ) : (
                  <Link href={bc.href} className="hover:text-primary transition-colors">{bc.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="max-w-3xl mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            {h1}
          </h1>
          <div className="text-lg text-muted-foreground leading-relaxed">
            {intro}
          </div>
        </div>

        {/* Suitable Apartments */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-serif mb-6">Unsere passenden Unterkünfte</h2>
          <div className="grid lg:grid-cols-2 gap-10">
            {apartments.map((apt) => (
              <ApartmentCard key={apt.id} {...apt} />
            ))}
          </div>
          {apartments.length === 0 && (
            <p className="text-muted-foreground">Aktuell keine spezifischen Apartments in dieser Kategorie gelistet.</p>
          )}
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2 space-y-12">
            
            <section>
              <h2 className="text-2xl font-bold font-serif mb-4">Für wen sind unsere Apartments ideal?</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                {targetAudienceText}
              </div>
            </section>

            {locationInfo && (
              <section>
                <h2 className="text-2xl font-bold font-serif mb-4">Lage & Umgebung</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {locationInfo}
                </div>
              </section>
            )}

            {(mobilityInfo || parkingInfo) && (
              <section>
                <h2 className="text-2xl font-bold font-serif mb-4">Anreise, Mobilität & Parken</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {mobilityInfo}
                  {parkingInfo}
                </div>
              </section>
            )}
            
            {sights && (
              <section>
                <h2 className="text-2xl font-bold font-serif mb-4">Sehenswürdigkeiten in der Nähe</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {sights}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold font-serif mb-4">Häufig gestellte Fragen (FAQ)</h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-muted/50 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Features Widget */}
              <div className="bg-muted border border-border/50 p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-4">Ausstattung & Service</h3>
                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-foreground">Self Check-in (flexibel anreisen)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-foreground">Kontaktloser Zugang</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-foreground">Direkt beim Gastgeber buchen</span>
                  </li>
                </ul>
              </div>

              {/* Related Links */}
              <div className="bg-background border border-border p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-4">Weitere Themen</h3>
                <ul className="space-y-2">
                  {relatedLinks.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/dresden-guide" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      Dresden Local Guide
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
