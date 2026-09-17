const fs = require('fs');
const path = require('path');

const pages = [
  {
    slug: 'ferienwohnung-dresden',
    title: 'Ferienwohnung Dresden mieten | ElbStay Apartments',
    desc: 'Hochwertige Ferienwohnungen & Apartments in Dresden direkt an der Elbe. Zentral, modern & mit voll ausgestatteter Küche. Direkt beim Gastgeber buchen!',
    h1: 'Ihre Ferienwohnung in Dresden',
    intro: '<p>Suchen Sie eine stilvolle und komfortable Unterkunft für Ihren Aufenthalt in der sächsischen Landeshauptstadt? Bei ElbStay bieten wir Ihnen sorgfältig eingerichtete Ferienwohnungen in erstklassigen Lagen. Genießen Sie die Privatsphäre eines eigenen Apartments, kombiniert mit dem Service und der Qualität, die Sie sich wünschen. Ob für einen Städtetrip, einen Familienurlaub oder als Ausgangspunkt zur Erkundung von Zwinger, Frauenkirche und Semperoper – bei uns finden Sie Ihr zweites Zuhause in Dresden.</p>',
    targetAudienceText: '<p>Unsere Ferienwohnungen eignen sich perfekt für <strong>Paare</strong>, die einen romantischen Kurzurlaub verbringen möchten, <strong>Familien</strong>, die Platz und Flexibilität benötigen, sowie <strong>Kulturinteressierte</strong>, die die Museen und Sehenswürdigkeiten Dresdens entdecken wollen. Dank der voll ausgestatteten Küchen können Sie sich ganz nach Ihren Wünschen selbst versorgen. Der komfortable Wohnbereich lädt nach einem ereignisreichen Tag in der Stadt zum Entspannen ein.</p>',
    features: ['Voll ausgestattete Küche', 'Highspeed WLAN', 'Smart-TV', 'Bequeme Boxspringbetten', 'Modernes Badezimmer'],
    locationInfo: '<p>Dresden bietet eine faszinierende Mischung aus Historie und moderner Urbanität. Unsere Unterkünfte befinden sich in strategisch günstigen Lagen wie dem aufstrebenden Pieschen, dem zentralen Löbtau oder direkt in der Mitte der Stadt. So erreichen Sie die historische Altstadt, das Szeneviertel Neustadt und die malerischen Elbwiesen in kürzester Zeit.</p>',
    mobilityInfo: '<p>Die Anbindung an den öffentlichen Nahverkehr (DVB) ist bei allen unseren Apartments hervorragend. Straßenbahn- und Bushaltestellen befinden sich meist nur wenige Gehminuten entfernt, sodass Sie das Auto getrost stehen lassen können. Auch der Hauptbahnhof und der Bahnhof Neustadt sind schnell und unkompliziert erreichbar.</p>',
    parkingInfo: '<p>Informationen zum Parken finden Sie spezifisch bei jeder Unterkunft. Während einige unserer Apartments über kostenfreie öffentliche Parkmöglichkeiten in den direkten Nebenstraßen verfügen, bieten andere Lagen kostenpflichtige Parkplätze direkt am Gebäude oder in umliegenden Parkhäusern.</p>',
    sights: '<p>Zu den Must-Sees gehören zweifellos die <strong>Frauenkirche</strong>, der <strong>Zwinger</strong>, das <strong>Residenzschloss</strong> und die <strong>Semperoper</strong>. Ein Spaziergang über die Brühlsche Terrasse oder durch die Kunsthofpassage in der Äußeren Neustadt runden das Erlebnis ab. Für Naturfreunde ist ein Ausflug in den Großen Garten oder entlang des Elbradwegs absolut empfehlenswert.</p>',
    faqs: [
      { q: 'Gibt es Mindestaufenthalte für die Ferienwohnungen?', a: 'Ja, je nach Saison und Wochentag kann es einen Mindestaufenthalt von 2 oder 3 Nächten geben. Die genauen Bedingungen sehen Sie direkt bei der Datumseingabe im Buchungskalender.' },
      { q: 'Sind Handtücher und Bettwäsche inklusive?', a: 'Selbstverständlich. Bei Ihrer Ankunft sind die Betten frisch bezogen und ausreichend Handtücher liegen für Sie bereit.' },
      { q: 'Wie funktioniert der Check-in?', a: 'Wir bieten einen bequemen, kontaktlosen Self Check-in an. Sie erhalten vor Ihrer Anreise einen individuellen Zugangscode oder Schlüsselkasten-Code, mit dem Sie jederzeit nach 15:00 Uhr flexibel anreisen können.' },
      { q: 'Warum sollte ich direkt über die Website buchen?', a: 'Bei einer Direktbuchung über unsere Website sparen Sie sich die Servicegebühren der großen Portale wie Airbnb oder Booking.com. Zudem profitieren Sie von unseren flexiblen Stornierungsbedingungen (kostenlos bis 7 Tage vor Anreise).' }
    ],
    relatedLinks: [
      { href: '/ferienwohnung-dresden-neustadt', label: 'Ferienwohnung nahe Neustadt' },
      { href: '/ferienwohnung-dresden-pieschen', label: 'Ferienwohnung Pieschen' },
      { href: '/business-apartment-dresden', label: 'Business Apartments' },
      { href: '/ferienwohnung-dresden-familie', label: 'Urlaub mit Familie' }
    ],
    breadcrumbs: [
      { href: '/ferienwohnung-dresden', label: 'Ferienwohnung Dresden' }
    ],
    apartmentFilter: 'all' // all
  },
  {
    slug: 'ferienwohnung-dresden-neustadt',
    title: 'Ferienwohnung Dresden Neustadt & Umgebung | ElbStay',
    desc: 'Übernachten Sie in direkter Nähe zur angesagten Dresdner Neustadt. Stilvolle Ferienwohnungen, voll ausgestattet. Direkt buchen & Bestpreis sichern!',
    h1: 'Ferienwohnung nahe der Dresdner Neustadt',
    intro: '<p>Die Äußere Neustadt ist Dresdens lebendigstes und buntestes Viertel – bekannt für seine alternative Szene, unzählige Cafés, Bars, Boutiquen und Streetart. Wenn Sie das pulsierende Leben suchen, aber dennoch nachts ruhig schlafen möchten, sind unsere Apartments in den angrenzenden Stadtteilen (wie dem stylischen Pieschen) die ideale Wahl. So sind Sie nur einen Katzensprung vom Geschehen entfernt, genießen aber den Rückzugsort einer erstklassig ausgestatteten Wohnung.</p>',
    targetAudienceText: '<p>Dieses Viertel und seine Umgebung ziehen vor allem <strong>junge Paare, Freunde und Kulturbegeisterte</strong> an. Wer abends gerne ausgeht, in individuellen Läden stöbert oder die internationale Gastronomie Dresdens erkunden möchte, ist hier genau richtig.</p>',
    features: ['Nähe zum Szeneviertel', 'Hervorragende ÖPNV-Anbindung', 'Highspeed WLAN', 'Flexible Anreise', 'Ruhige Schlafräume'],
    locationInfo: '<p>Die Neustadt liegt nördlich der Elbe. Mit der Straßenbahn erreichen Sie von unseren Unterkünften den Albertplatz – das Herz der Neustadt – in wenigen Minuten. Auch zu Fuß oder mit dem Leihfahrrad entlang des Elbradwegs ist der Weg in die Neustadt ein Erlebnis.</p>',
    sights: '<p>Entdecken Sie die berühmte <strong>Kunsthofpassage</strong> mit ihrer farbenfrohen Architektur, das Erich-Kästner-Museum oder spazieren Sie durch den Alaunpark. Abends lockt die Alaunstraße mit einem schier endlosen Angebot an kulinarischen Highlights und gemütlichen Kneipen.</p>',
    faqs: [
      { q: 'Ist es nachts laut, wenn man in der Nähe der Neustadt übernachtet?', a: 'Die Neustadt selbst kann am Wochenende sehr belebt sein. Da sich unsere Apartments in den direkt angrenzenden, ruhigeren Vierteln befinden, profitieren Sie von der Nähe zum Szeneviertel, können aber nachts absolut ruhig schlafen.' },
      { q: 'Wie komme ich von den Apartments in die historische Altstadt?', a: 'Dresden hat ein exzellentes Straßenbahnnetz. Sowohl von unseren Wohnungen als auch von der Neustadt aus bringt Sie die DVB in der Regel in unter 15 Minuten direkt zu Zwinger und Frauenkirche.' }
    ],
    relatedLinks: [
      { href: '/ferienwohnung-dresden', label: 'Ferienwohnung Dresden' },
      { href: '/ferienwohnung-dresden-pieschen', label: 'Apartments in Pieschen' },
      { href: '/dresden-guide/neustadt', label: 'Neustadt Guide' }
    ],
    breadcrumbs: [
      { href: '/ferienwohnung-dresden', label: 'Dresden' },
      { href: '/ferienwohnung-dresden-neustadt', label: 'Neustadt' }
    ],
    apartmentFilter: 'urban,boutique'
  },
  {
    slug: 'ferienwohnung-dresden-pieschen',
    title: 'Ferienwohnung Dresden Pieschen | ElbStay Boutique',
    desc: 'Ihr Boutique-Apartment in Dresden-Pieschen. Altbauflair, Boxspringbett, modern eingerichtet. Ideal für Paare & Städtetrips. Jetzt provisionsfrei buchen.',
    h1: 'Ferienwohnung in Dresden-Pieschen',
    intro: '<p>Willkommen in Dresden-Pieschen, einem der charmantesten und aufstrebendsten Viertel der Stadt. Pieschen liegt direkt an der Elbe und bezaubert mit seinen wunderschön sanierten Altbauten, gemütlichen Straßen und einer entspannten, familiären Atmosphäre. Unsere Ferienwohnungen hier, wie das ElbStay Boutique Apartment, bieten Ihnen den idealen Mix aus historischem Flair und modernstem Wohnkomfort.</p>',
    targetAudienceText: '<p>Pieschen ist ideal für Gäste, die dem Trubel der Innenstadt entfliehen, aber dennoch absolut zentral und verkehrsgünstig wohnen möchten. Es eignet sich für <strong>Paare</strong>, die das authentische Dresdner Leben schätzen, sowie für <strong>Business-Reisende</strong>, die eine ruhige Arbeitsumgebung suchen.</p>',
    features: ['Echter Altbaucharme', 'Ruhige Lage', 'Kostenfreies Parken im Viertel', 'Boxspringbett', 'Kaffeevollautomat'],
    locationInfo: '<p>Das Viertel liegt im Nordwesten der Stadt und grenzt direkt an den idyllischen Elbradweg. In der Umgebung finden Sie gemütliche Bäckereien, kleine Cafés und lokale Restaurants. Die Anbindung an die Autobahn A4 (Abfahrt Neustadt) ist exzellent, was die Anreise mit dem Auto besonders angenehm macht.</p>',
    mobilityInfo: '<p>Mit der Straßenbahnlinie 3 oder der S-Bahn (Bahnhof Pieschen) sind Sie in knapp 10-15 Minuten in der historischen Altstadt (Theaterplatz/Zwinger) oder in der Äußeren Neustadt.</p>',
    parkingInfo: '<p>Im Gegensatz zur dicht bebauten Altstadt oder Neustadt finden Sie in Pieschen meist problemlos kostenfreie, öffentliche Parkplätze in den direkt umliegenden Nebenstraßen.</p>',
    sights: '<p>Nutzen Sie die Nähe zur Elbe für einen Spaziergang zum Ballhaus Watzke (ein historisches Brauhaus mit Biergarten) oder radeln Sie entlang der Elbwiesen in Richtung Radebeul und zu den malerischen Elbschlössern.</p>',
    faqs: [
      { q: 'Gibt es Supermärkte in der Nähe?', a: 'Ja, Pieschen bietet eine hervorragende Infrastruktur. Supermärkte, Bäcker, Apotheken und Drogerien sind in wenigen Gehminuten erreichbar.' },
      { q: 'Ist das Viertel sicher?', a: 'Absolut. Pieschen ist ein beliebtes, ruhiges und sehr sicheres Wohnviertel, das bei Familien und jungen Paaren sehr geschätzt wird.' }
    ],
    relatedLinks: [
      { href: '/ferienwohnung-dresden', label: 'Alle Apartments' },
      { href: '/dresden-guide/pieschen', label: 'Pieschen Local Guide' }
    ],
    breadcrumbs: [
      { href: '/ferienwohnung-dresden', label: 'Dresden' },
      { href: '/ferienwohnung-dresden-pieschen', label: 'Pieschen' }
    ],
    apartmentFilter: 'boutique'
  },
  {
    slug: 'business-apartment-dresden',
    title: 'Business Apartment Dresden | Möbliertes Wohnen auf Zeit',
    desc: 'Premium Business Apartments in Dresden für Geschäftsreisen & Projektmitarbeiter. Schnelles WLAN, Schreibtisch, Küche & Rechnung mit MwSt. Hier buchen.',
    h1: 'Business Apartment Dresden: Ihr Zuhause auf Geschäftsreise',
    intro: '<p>Für längere Projekte, Schulungen oder Geschäftsreisen in Dresden reicht ein klassisches Hotelzimmer oft nicht aus. Unsere voll möblierten Business Apartments bieten Ihnen genau die Flexibilität, Privatsphäre und Ausstattung, die Sie für einen produktiven und entspannten Aufenthalt benötigen. Genießen Sie den Komfort einer eigenen Wohnung, schnelles Internet und unkomplizierte Abläufe – ideal für moderne Professionals, Expats und Pendler.</p>',
    targetAudienceText: '<p>Speziell zugeschnitten auf <strong>Geschäftsreisende, Berater, IT-Spezialisten und Projektteams</strong>. Auch für Unternehmen, die eine komfortable und repräsentative temporäre Unterkunft für ihre Mitarbeiter suchen, stellen unsere Apartments die perfekte Lösung dar.</p>',
    features: ['Highspeed-WLAN (100 Mbit/s+)', 'Arbeitsbereich / Tisch', 'Rechnung mit ausgewiesener MwSt.', 'Voll ausgestattete Küche', 'Waschmaschine (in den meisten Einheiten)'],
    locationInfo: '<p>Unsere Business-Standorte sind verkehrsgünstig gelegen. Ob mit dem Auto über die nahegelegene Autobahn oder mit dem ÖPNV zu wichtigen Geschäftszentren und zur Messe Dresden – Sie erreichen Ihre Termine pünktlich und stressfrei.</p>',
    sights: '<h3>Apartment vs. Hotel in Dresden?</h3><p>Während Hotels oft unpersönlich und teuer für längere Aufenthalte sind, bietet ein Business Apartment echte Wohnqualität. Sie können selbst kochen, Gäste empfangen oder nach Feierabend auf der Couch bei Netflix abschalten. Zudem ist der Quadratmeterpreis bei Aufenthalten ab wenigen Tagen meist deutlich attraktiver als im Hotel.</p>',
    faqs: [
      { q: 'Erhalte ich eine ordnungsgemäße Rechnung für mein Unternehmen?', a: 'Ja, selbstverständlich. Sie erhalten nach der Buchung eine Rechnung mit ausgewiesener Mehrwertsteuer, die Sie problemlos bei Ihrer Buchhaltung einreichen können.' },
      { q: 'Ist ein später Check-in nach Geschäftsterminen möglich?', a: 'Dank unseres schlüssellosen Smart-Lock-Systems (Self Check-in) können Sie jederzeit nach der offiziellen Check-in-Zeit anreisen – auch tief in der Nacht.' },
      { q: 'Bieten Sie spezielle Raten für Firmenkunden oder Langzeitaufenthalte?', a: 'Für Aufenthalte über mehrere Wochen oder wiederkehrende Buchungen durch Unternehmen kontaktieren Sie uns gerne direkt. Wir schnüren Ihnen ein individuelles Angebot.' }
    ],
    relatedLinks: [
      { href: '/monteurwohnung-dresden', label: 'Unterkunft für Mitarbeiter' },
      { href: '/langzeitaufenthalt-dresden', label: 'Wohnen auf Zeit' },
      { href: '/contact', label: 'Firmenanfrage stellen' }
    ],
    breadcrumbs: [
      { href: '/ferienwohnung-dresden', label: 'Dresden' },
      { href: '/business-apartment-dresden', label: 'Business Apartment' }
    ],
    apartmentFilter: 'urban,boutique,premium-1'
  },
  {
    slug: 'monteurwohnung-dresden',
    title: 'Monteurwohnung & Firmenunterkunft in Dresden mieten',
    desc: 'Komfortable Unterkünfte für Mitarbeiter, Handwerker und Monteure in Dresden. Getrennte Betten, Küche, Waschmaschine, verkehrsgünstig gelegen.',
    h1: 'Monteurwohnung & Firmenunterkunft Dresden',
    intro: '<p>Sie suchen eine verlässliche, saubere und komfortable Unterkunft für Ihre Mitarbeiter, Handwerker oder ein Projektteam in Dresden? Wir bei ElbStay bieten Unterkünfte, die exakt auf die Bedürfnisse von arbeitenden Gästen zugeschnitten sind. Verabschieden Sie sich von unpersönlichen und spärlich ausgestatteten Massenunterkünften: Bei uns übernachten Ihre Mitarbeiter in vollwertigen Apartments, die Erholung nach einem anstrengenden Arbeitstag garantieren.</p>',
    targetAudienceText: '<p>Unsere Wohnungen richten sich an <strong>Unternehmen, Handwerksbetriebe, Bauleiter und Projektteams</strong>. Wir verstehen, dass ein gutes Feierabendgefühl die Motivation und Produktivität Ihrer Mitarbeiter maßgeblich steigert.</p>',
    features: ['Eigene voll ausgestattete Küche', 'Flexible Check-in Zeiten', 'Waschmaschine', 'Gute Verkehrsanbindung (Auto/Transporter)', 'Rechnung für Unternehmen'],
    locationInfo: '<p>Dresden wächst und baut. Unsere Apartments sind dezentral in verkehrsgünstigen Lagen (wie Löbtau oder Pieschen) platziert. So vermeiden Sie den morgendlichen Stau der Innenstadt und sind schnell auf der Autobahn (A4/A17) oder an den wichtigen Industriestandorten im Norden und Westen der Stadt.</p>',
    sights: '<h3>Unterkunft für Mitarbeiter in Dresden anfragen</h3><p>Ihre Mitarbeiter bleiben länger als nur ein paar Tage? Sie benötigen regelmäßig Unterkünfte in Dresden? Nutzen Sie unsere Direktbuchung, um sofort Verfügbarkeiten zu prüfen, oder kontaktieren Sie uns per E-Mail für ein maßgeschneidertes, unverbindliches Firmen-Angebot bei längeren Aufenthalten.</p>',
    faqs: [
      { q: 'Gibt es getrennte Betten?', a: 'Je nach Apartment verfügen wir über Schlafsofas, Doppelbetten und teilweise getrennte Schlafräume. Prüfen Sie die spezifische Bettenaufteilung in den Apartment-Details, um sicherzustellen, dass sie für Ihr Team passt.' },
      { q: 'Wie erfolgt die Rechnungsstellung?', a: 'Die Rechnung wird digital auf den Namen Ihres Unternehmens ausgestellt, inklusive aller steuerlich relevanten Angaben.' },
      { q: 'Sind Parkplätze für Transporter vorhanden?', a: 'In den Gebieten wie Pieschen und Löbtau finden sich in der Regel öffentliche Parkplätze an der Straße, die auch für größere Fahrzeuge (Sprinter/Transporter) geeignet sind.' }
    ],
    relatedLinks: [
      { href: '/business-apartment-dresden', label: 'Business Apartments' },
      { href: '/langzeitaufenthalt-dresden', label: 'Langzeitmiete' },
      { href: '/ferienwohnung-dresden-mit-parkplatz', label: 'Wohnungen mit Parkplatz' }
    ],
    breadcrumbs: [
      { href: '/ferienwohnung-dresden', label: 'Dresden' },
      { href: '/monteurwohnung-dresden', label: 'Monteurwohnung' }
    ],
    apartmentFilter: 'urban,boutique'
  },
  {
    slug: 'ferienwohnung-dresden-familie',
    title: 'Familienfreundliche Ferienwohnung in Dresden | ElbStay',
    desc: 'Buchen Sie Ihre Ferienwohnung für den perfekten Familienurlaub in Dresden. Mehrere Schlafmöglichkeiten, Küche & Platz für die ganze Familie.',
    h1: 'Ferienwohnung für Familien in Dresden',
    intro: '<p>Ein Städtetrip mit Kindern stellt besondere Anforderungen an eine Unterkunft. In unseren familienfreundlichen Ferienwohnungen in Dresden finden Sie den nötigen Platz und Komfort, damit sich Groß und Klein wohlfühlen. Statt sich auf enge Hotelzimmer aufzuteilen, genießen Sie hier gemeinsame Mahlzeiten am großen Esstisch und entspannte Abende im eigenen Wohnzimmer.</p>',
    targetAudienceText: '<p>Besonders geeignet für <strong>Familien mit Kindern</strong> oder <strong>kleinere Reisegruppen</strong>. Die Aufteilung in Wohn- und separate Schlafbereiche ermöglicht es den Eltern, abends noch gemütlich zusammenzusitzen, während die Kinder bereits schlafen.</p>',
    features: ['Ausziehbare Schlafcouch', 'Küche zur Selbstversorgung', 'Fernseher mit Streaming', 'Waschmaschine', 'Sichere, ruhige Umgebung'],
    locationInfo: '<p>Unsere Apartments befinden sich in familienfreundlichen und gut angebundenen Vierteln. Kurze Wege zum nächsten Supermarkt oder Bäcker erleichtern die morgendliche Organisation. Auch Spielplätze und Parks sind in den Wohnvierteln gut erreichbar.</p>',
    sights: '<p>Dresden bietet fantastische Ausflugsziele für Familien: Besuchen Sie das Deutsche Hygiene-Museum (mit speziellem Kindermuseum), den Zoo Dresden oder machen Sie eine aufregende Fahrt mit der Schwebebahn in Loschwitz. Auch eine Fahrt mit einem historischen Raddampfer auf der Elbe ist ein Highlight für Kinder.</p>',
    faqs: [
      { q: 'Ist ein Babybett vorhanden?', a: 'Bitte kontaktieren Sie uns direkt nach der Buchung, um die Bereitstellung eines Babybettes (Hauck Reisebett) anzufragen.' },
      { q: 'Gibt es Möglichkeiten Wäsche zu waschen?', a: 'Die meisten unserer Apartments, wie z.B. das ElbStay Urban, verfügen über eine eigene Waschmaschine in der Wohnung.' }
    ],
    relatedLinks: [
      { href: '/ferienwohnung-dresden', label: 'Ferienwohnung Dresden' },
      { href: '/ferienwohnung-dresden-mit-parkplatz', label: 'Apartments mit Parkplatz' }
    ],
    breadcrumbs: [
      { href: '/ferienwohnung-dresden', label: 'Dresden' },
      { href: '/ferienwohnung-dresden-familie', label: 'Familie' }
    ],
    apartmentFilter: 'premium-1,boutique,urban'
  },
  {
    slug: 'langzeitaufenthalt-dresden',
    title: 'Langzeitaufenthalt & Wohnen auf Zeit in Dresden | ElbStay',
    desc: 'Suchen Sie eine Wohnung auf Zeit in Dresden? Entdecken Sie unsere voll möblierten Apartments für Langzeitmiete, Expats und Sabbaticals. Direkt anfragen.',
    h1: 'Langzeitaufenthalt in Dresden: Wohnen auf Zeit',
    intro: '<p>Egal ob Sie ein mehrmonatiges Projekt in Dresden begleiten, sich in einer beruflichen Übergangsphase befinden oder einen Neuanfang in der Stadt planen: Ein voll möbliertes Apartment bietet Ihnen den idealen Start. Das Konzept "Wohnen auf Zeit" erspart Ihnen teure Möbelanschaffungen und langfristige Mietverträge. Bei ElbStay ziehen Sie einfach mit Ihrem Koffer ein – um alles Weitere haben wir uns bereits gekümmert.</p>',
    targetAudienceText: '<p>Unsere Angebote richten sich an <strong>Expats, Berater, Gastprofessoren</strong> und Menschen, die ihr Eigenheim renovieren oder vorübergehend eine hochwertige Bleibe in Dresden benötigen.</p>',
    features: ['Vollständige Möblierung', 'Highspeed Internet inkludiert', 'Waschmaschine', 'Komplette Küchenausstattung', 'Nebenkosten inklusive'],
    faqs: [
      { q: 'Kann ich mich an der Adresse anmelden (Wohnungsgeberbestätigung)?', a: 'Bei Aufenthalten über mehrere Monate können wir Ihnen in Absprache eine Wohnungsgeberbestätigung zur behördlichen Anmeldung in Dresden ausstellen.' },
      { q: 'Gibt es Rabatte für monatliche Buchungen?', a: 'Ja. Für Aufenthalte ab 28 Nächten bieten wir auf Anfrage deutlich rabattierte Monatspreise an.' },
      { q: 'Sind Nebenkosten wie Strom und Internet im Preis enthalten?', a: 'Ja, bei ElbStay gibt es keine versteckten Kosten. Heizung, Wasser, Strom und Highspeed-Internet sind bei Langzeitbuchungen im Preis inkludiert.' }
    ],
    relatedLinks: [
      { href: '/business-apartment-dresden', label: 'Business Apartments' },
      { href: '/monteurwohnung-dresden', label: 'Firmenunterkünfte' },
      { href: '/contact', label: 'Anfrage stellen' }
    ],
    breadcrumbs: [
      { href: '/ferienwohnung-dresden', label: 'Dresden' },
      { href: '/langzeitaufenthalt-dresden', label: 'Wohnen auf Zeit' }
    ],
    apartmentFilter: 'urban,premium-1,boutique'
  },
  {
    slug: 'ferienwohnung-dresden-mit-parkplatz',
    title: 'Ferienwohnung in Dresden mit Parkplatz mieten | ElbStay',
    desc: 'Entspannte Anreise: Mieten Sie eine Ferienwohnung in Dresden mit Parkmöglichkeiten in direkter Nähe. Ideal für Auto-Reisende. Hier direkt buchen.',
    h1: 'Ferienwohnung in Dresden mit Parkplatz',
    intro: '<p>Die Anreise mit dem eigenen Auto ist für viele Dresden-Besucher die komfortabelste Wahl – doch die Parkplatzsuche in der Innenstadt kann schnell zur Geduldsprobe werden. Wer eine Ferienwohnung bei ElbStay mietet, profitiert von dezentralen, verkehrsgünstigen Lagen, in denen das Parken meist deutlich entspannter ist als direkt im historischen Altstadtkern.</p>',
    targetAudienceText: '<p>Ideal für <strong>Gäste mit dem eigenen Pkw, Motorradreisende oder Monteure mit Transportern</strong>, die eine sichere und unkomplizierte Möglichkeit suchen, ihr Fahrzeug abzustellen.</p>',
    features: ['Öffentliches, kostenfreies Parken im Viertel', 'Be- und Entladen am Haus möglich', 'Sehr gute Anbindung an die A4/A17', 'Schneller Transfer in die City per ÖPNV'],
    mobilityInfo: '<p>Das Parken in den Straßen rund um unsere Apartments in Pieschen und Löbtau (z.B. ElbStay Urban und Boutique) ist aktuell gebührenfrei (öffentlicher Straßenraum). Beachten Sie jedoch immer die Beschilderung vor Ort. Für unser Premium-Penthouse im Zentrum stehen kostenpflichtige Parkhäuser in direkter Umgebung zur Verfügung.</p>',
    faqs: [
      { q: 'Habe ich einen fest reservierten Parkplatz?', a: 'In der Regel nutzen Sie die kostenfreien, öffentlichen Stellplätze entlang der Straße. Es gibt keine fest reservierten Stellflächen, jedoch finden Gäste erfahrungsgemäß immer problemlos einen Platz in der unmittelbaren Nähe.' },
      { q: 'Ist das Auto dort sicher?', a: 'Dresdens Wohnviertel wie Pieschen oder Löbtau gelten als sicher. Parken Sie Ihr Fahrzeug wie gewohnt, lassen Sie keine Wertsachen sichtbar liegen, und Sie können Ihren Aufenthalt entspannt genießen.' }
    ],
    relatedLinks: [
      { href: '/ferienwohnung-dresden-pieschen', label: 'Apartments in Pieschen' },
      { href: '/business-apartment-dresden', label: 'Apartment für Geschäftsreise' }
    ],
    breadcrumbs: [
      { href: '/ferienwohnung-dresden', label: 'Dresden' },
      { href: '/ferienwohnung-dresden-mit-parkplatz', label: 'Mit Parkplatz' }
    ],
    apartmentFilter: 'all'
  },
  {
    slug: 'ferienwohnung-dresden-zentrum',
    title: 'Ferienwohnung Dresden Zentrum | ElbStay Premium',
    desc: 'Luxuriöses Penthouse im Herzen von Dresden. Große Dachterrasse, Altstadtnähe, exklusive Ausstattung. Ihre zentrale Ferienwohnung für besondere Momente.',
    h1: 'Ferienwohnung im Zentrum von Dresden',
    intro: '<p>Direkt am Puls der Stadt: Wer Dresden in all seiner Pracht erleben möchte, ist in einer Ferienwohnung im Zentrum am besten aufgehoben. Genießen Sie kurze Wege zu den bekanntesten Sehenswürdigkeiten, den Museen und den Elbterrassen. Unser Premium-Apartment, das exklusive Penthouse, bietet Ihnen genau diese zentrale Lage, gepaart mit absoluter Ruhe und Privatsphäre über den Dächern von Dresden.</p>',
    targetAudienceText: '<p>Perfekt für <strong>anspruchsvolle Städtereisende, Paare und kleine Gruppen</strong>, die bei Lage und Komfort keine Kompromisse eingehen möchten. Ein Highlight für besondere Anlässe, wie Jubiläen oder einen luxuriösen Wochenendtrip.</p>',
    features: ['Direkte Innenstadtlage', 'Weitläufige private Dachterrasse', 'Exklusive Designausstattung', 'Panoramablick über die Stadt', 'Zwei separate Schlafzimmer'],
    locationInfo: '<p>Das Apartment befindet sich in der Wilsdruffer Vorstadt, direkt angebunden an den historischen Kern. Sie wohnen mittendrin, ohne dem direkten touristischen Lärm der Fußgängerzonen ausgesetzt zu sein.</p>',
    sights: '<p>Ihre Sightseeing-Tour beginnt direkt an der Haustür. Zu Fuß erreichen Sie innerhalb von 10 bis 15 Minuten das Dresdner Schloss, den Zwinger, die Semperoper und das lebendige Schauspielhaus. Auch das Ostragehege und die Elbwiesen sind für einen morgendlichen Jogginglauf direkt erreichbar.</p>',
    faqs: [
      { q: 'Ist das Zentrum laut?', a: 'Dank der Lage als Penthouse im obersten Stockwerk genießen Sie absolute Ruhe über den Dächern der Stadt, auch wenn Sie sich mitten im Zentrum befinden.' },
      { q: 'Wo kann ich am Zentrum parken?', a: 'In der direkten Umgebung stehen kostenpflichtige Parkhäuser und bewirtschaftete Straßenparkplätze zur Verfügung.' }
    ],
    relatedLinks: [
      { href: '/ferienwohnung-dresden', label: 'Alle Apartments ansehen' },
      { href: '/business-apartment-dresden', label: 'Premium Business Wohnungen' }
    ],
    breadcrumbs: [
      { href: '/ferienwohnung-dresden', label: 'Dresden' },
      { href: '/ferienwohnung-dresden-zentrum', label: 'Zentrum' }
    ],
    apartmentFilter: 'premium-1'
  }
];

const template = `import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/layout/SEOLandingPage";
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
    <SEOLandingPage
      h1="{{H1}}"
      intro={<>
        {{INTRO}}
      </>}
      targetAudienceText={<>
        {{TARGET}}
      </>}
      features={{{FEATURES}}}
      locationInfo={{{LOCATION_PROP}}}
      mobilityInfo={{{MOBILITY_PROP}}}
      parkingInfo={{{PARKING_PROP}}}
      sights={{{SIGHTS_PROP}}}
      faqs={{{FAQS}}}
      relatedLinks={{{LINKS}}}
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
    .replace('{{TARGET}}', p.targetAudienceText || '')
    .replace('{{FEATURES}}', JSON.stringify(p.features || []))
    .replace('{{FAQS}}', JSON.stringify(p.faqs || []))
    .replace('{{LINKS}}', JSON.stringify(p.relatedLinks || []))
    .replace('{{BREADCRUMBS}}', JSON.stringify(p.breadcrumbs || []))
    .replace(/{{FILTER}}/g, p.apartmentFilter);
    
  if (p.locationInfo) {
    content = content.replace('{{LOCATION_PROP}}', `<>${p.locationInfo}</>`);
  } else {
    content = content.replace('{{LOCATION_PROP}}', `undefined`);
  }
  
  if (p.mobilityInfo) {
    content = content.replace('{{MOBILITY_PROP}}', `<>${p.mobilityInfo}</>`);
  } else {
    content = content.replace('{{MOBILITY_PROP}}', `undefined`);
  }
  
  if (p.parkingInfo) {
    content = content.replace('{{PARKING_PROP}}', `<>${p.parkingInfo}</>`);
  } else {
    content = content.replace('{{PARKING_PROP}}', `undefined`);
  }
  
  if (p.sights) {
    content = content.replace('{{SIGHTS_PROP}}', `<>${p.sights}</>`);
  } else {
    content = content.replace('{{SIGHTS_PROP}}', `undefined`);
  }
    
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

console.log('Pages generated!');
