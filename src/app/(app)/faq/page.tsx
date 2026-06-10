export default function FAQPage() {
  const faqs = [
    {
      q: "Wie funktioniert die Schlüsselübergabe?",
      a: "Wir nutzen ein smartes, kontaktloses Check-in System. Am Anreisetag erhalten Sie einen Pin-Code per E-Mail, mit dem Sie jederzeit nach 15:00 Uhr das Apartment betreten können."
    },
    {
      q: "Ist ein Parkplatz inbegriffen?",
      a: "Bei ElbStay Premium ist ein Tiefgaragenstellplatz inkludiert. Bei ElbStay Urban senden wir Ihnen mit der Buchungsbestätigung eine Übersicht der nahegelegenen Parkmöglichkeiten (teilweise kostenpflichtig)."
    },
    {
      q: "Sind Haustiere erlaubt?",
      a: "Um unseren hohen Standard an Sauberkeit und Hygiene für alle Gäste zu gewährleisten, sind Haustiere in unseren Apartments leider nicht gestattet."
    },
    {
      q: "Wie sind die Stornierungsbedingungen?",
      a: "Bei Direktbuchung über unsere Website können Sie bis 5 Tage vor Anreise kostenfrei stornieren. Danach berechnen wir 80% des Gesamtpreises."
    }
  ];

  return (
    <div className="bg-background pt-16 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Informationen</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Häufige Fragen
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Alles, was Sie für Ihren Aufenthalt bei ElbStay wissen müssen.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-muted rounded-xl border border-border/50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-foreground">
                <h2 className="text-lg">{faq.q}</h2>
                <span className="relative ml-4 h-5 w-5 shrink-0 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
