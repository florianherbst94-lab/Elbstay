import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ApartmentData } from "@/lib/data/apartments";
import { ApartmentCard } from "@/components/apartment/ApartmentCard";

export interface GuidePageProps {
  title: string;
  intro: React.ReactNode;
  content: React.ReactNode;
  apartments: ApartmentData[];
  breadcrumbs: { href: string; label: string }[];
}

export function GuidePage({ title, intro, content, apartments, breadcrumbs }: GuidePageProps) {
  return (
    <div className="bg-background pt-8 pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
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

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">{title}</h1>
        <div className="text-lg text-muted-foreground leading-relaxed mb-12">
          {intro}
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none mb-16 text-muted-foreground">
          {content}
        </article>

        {apartments.length > 0 && (
          <div className="mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-bold font-serif mb-8 text-foreground">Übernachten in Dresden</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {apartments.map(apt => (
                <ApartmentCard key={apt.id} {...apt} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
