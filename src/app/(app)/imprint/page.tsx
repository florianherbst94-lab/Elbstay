export default function ImprintPage() {
  return (
    <div className="bg-background pt-16 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-6 prose prose-lg text-muted-foreground">
        <h1 className="font-serif text-4xl font-bold text-foreground pb-6 border-b border-border/50 mb-8">Impressum</h1>
        <p>Angaben gemäß § 5 DDG</p>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Anbieter</h2>
        <p>
          <strong className="text-foreground">ElbStay</strong><br />
          Inhaber: Florian Herbst<br />
          Leipziger Straße 138<br />
          01127 Dresden<br />
          Deutschland
        </p>
        <p>
          Telefon: +49 152 03350853<br />
          Website: <a href="https://elbstay.de" className="text-primary hover:underline">https://elbstay.de</a>
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Vertretungsberechtigte Person</h2>
        <p>
          Florian Herbst
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Umsatzsteuer</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
          68 387 205 144
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          Florian Herbst<br />
          Leipziger Straße 138<br />
          01127 Dresden<br />
          Deutschland
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Hinweis zur Direktbuchung</h2>
        <p>
          Über elbstay.de können Gäste direkt eine Unterkunft buchen. Die Buchungsabwicklung erfolgt über den externen Gästemanager Hospitable; Zahlungen können über den Zahlungsdienstleister Stripe abgewickelt werden. Maßgeblich sind die im jeweiligen Buchungsprozess angezeigten Buchungs-, Zahlungs- und Stornierungsbedingungen.
        </p>
        <p>
          Informationen zur Verarbeitung personenbezogener Daten im Zusammenhang mit Buchungen, Kontaktanfragen und Zahlungen finden Sie in der Datenschutzerklärung.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Haftung für Links</h2>
        <p>
          Unser Angebot kann Links zu externen Websites Dritter enthalten, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte übernehmen wir keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Urheberrecht</h2>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung oder sonstige Verwertung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers.
        </p>
      </div>
    </div>
  );
}
