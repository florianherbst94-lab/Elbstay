import { Suspense } from "react";
import type { Metadata } from "next";
import { RechnungForm } from "./RechnungForm";

export const metadata: Metadata = {
  title: "Rechnung anfordern | Elbstay",
  description: "Rechnungsdaten für Ihren Aufenthalt bei Elbstay sicher und einfach übermitteln.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function RechnungPage() {
  return (
    <div className="bg-background pt-16 pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Service</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Rechnung für Ihren Aufenthalt
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Benötigen Sie eine Rechnung für Ihren Aufenthalt bei Elbstay? Hinterlegen Sie hier Ihre Rechnungsdaten. Wir senden Ihnen die Rechnung nach Abschluss Ihres Aufenthalts automatisch per E-Mail zu.
          </p>
        </div>

        <Suspense fallback={
          <div className="bg-muted border border-border/50 rounded-2xl p-8 lg:p-12 min-h-[400px] flex items-center justify-center">
            <p className="text-muted-foreground">Formular wird geladen...</p>
          </div>
        }>
          <RechnungForm />
        </Suspense>
      </div>
    </div>
  );
}
