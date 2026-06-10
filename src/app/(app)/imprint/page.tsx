export default function ImprintPage() {
  return (
    <div className="bg-background pt-16 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-6 prose prose-lg text-muted-foreground">
        <h1 className="font-serif text-4xl font-bold text-foreground pb-6 border-b border-border/50 mb-8">Impressum</h1>
        <p>Angaben gemäß § 5 TMG</p>
        <p>
          <strong className="text-foreground">ElbStay GmbH</strong><br />
          Beispielstraße 42<br />
          01067 Dresden<br />
          Deutschland
        </p>
        <p>
          <strong className="text-foreground">Vertreten durch:</strong><br />
          Max Mustermann
        </p>
        <p>
          <strong className="text-foreground">Kontakt:</strong><br />
          Telefon: +49 (0) 123 456 789<br />
          E-Mail: hello@elbstay.com
        </p>
        <p>
          <strong className="text-foreground">Umsatzsteuer-ID:</strong><br />
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          DE 123456789
        </p>
      </div>
    </div>
  );
}
