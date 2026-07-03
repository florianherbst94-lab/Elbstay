export interface CheckInStep {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ApartmentData {
  id: string;
  name: string;
  address: string;
  mapUrl: string;
  wifi: {
    ssid: string;
    password: string;
  };
  parking: string;
  houseRules: string[];
  checkInTime: string;
  checkOutTime: string;
  steps: CheckInStep[];
  checkOutChecklist: string[];
  host: {
    name: string;
    role: string;
    imageUrl: string;
    phone: string;
    whatsappMessage: string;
    languages?: string[];
  };
}

export const penthouse1Data: ApartmentData = {
  id: "penthouse1",
  name: "ElbStay Penthouse 1",
  address: "Löbtauer Straße 2, 01067 Dresden",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=L%C3%B6btauer+Stra%C3%9Fe+2,+01067+Dresden",
  wifi: {
    ssid: "JINO Dresden",
    password: "Willkommen25!",
  },
  parking: "Reservierter Stellplatz WE10 im Innenhof. Einfahrt über die Berliner Straße (beim großen Wandgemälde).",
  houseRules: [
    "Ruhezeiten: 22:00 – 07:00 Uhr.",
    "Keine Parties erlaubt.",
    "Nichtraucher-Apartment.",
  ],
  checkInTime: "ab 15:00 Uhr",
  checkOutTime: "bis 10:00 Uhr",
  steps: [
    {
      title: "Anfahrt zum Innenhof",
      description: "Biegen Sie in die Einfahrt Berliner Straße ein. Diese erkennen Sie mit dem Wandgemälde auf der linken Seite.",
      imageUrl: "/images/checkin/step1.png",
    },
    {
      title: "Parkplatz finden",
      description: "Biegen Sie rechts ab und suchen Sie sich den Parkplatz mit der Stellnummer WE 10 im Innenhof.",
      imageUrl: "/images/checkin/step2.png",
    },
    {
      title: "Stellplatz Schild",
      description: "Suchen Sie das Schild mit der Aufschrift P WE 10 an der Umzäunung.",
      imageUrl: "/images/checkin/step3.png",
    },
    {
      title: "Eingang finden",
      description: "Auf der rechten Seite das große Objekt, dort finden Sie den Eingang mit den Briefkästen.",
      imageUrl: "/images/checkin/step4.png",
    },
    {
      title: "Briefkasten & Schlüsselkasten",
      description: "Öffnen Sie den Briefkasten 'WE 10' mit dem Code 825. Darin befindet sich ein Schlüsselkasten – diesen öffnen Sie mit dem Code 2412. Bitte danach alles wieder verschließen.",
      imageUrl: "/images/checkin/step5.png",
    },
    {
      title: "Fahrstuhl & Etage",
      description: "Fahren Sie mit dem Fahrstuhl in den fünften Stock. Gehen Sie aus der Tür raus, den Gang entlang rechts. Am Ende des Flurs befindet sich der Eingang zur Wohnung.",
      imageUrl: "/images/checkin/step6.png",
    },
    {
      title: "Aufgang zur Dachterrasse",
      description: "Nutzen Sie die Wendeltreppe, um zur Dachterrasse zu gelangen. Respektieren Sie bitte die Privatsphäre der Anwohner.",
      imageUrl: "/images/checkin/step7.png",
    },
  ],
  checkOutChecklist: [
    "Alle Fenster schließen.",
    "Heizung auf Stern (*) stellen.",
    "Müll in den Tonnen im Außenbereich entsorgen.",
    "Geschirrspüler starten (falls benutzt).",
    "Schlüssel an die Garderobe im Flur hängen. NICHT im Apartment einschließen oder in die Außenbox legen.",
  ],
  host: {
    name: "Magdalena",
    role: "Feel Good Manager & Gäste-Host",
    imageUrl: "/images/checkin/magdalena.jpg",
    phone: "+4915203350853",
    whatsappMessage: "Hallo Magdalena, ich bin gerade im Penthouse 1 angekommen und habe eine Frage:",
    languages: ["de", "en", "pl"],
  },
};

export const wbadd2703Data: ApartmentData = {
  id: "wbadd2703",
  name: "ElbStay Boutique-Apartment",
  address: "Leipziger Straße 138, 01127 Dresden",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Leipziger+Stra%C3%9Fe+138,+01127+Dresden",
  wifi: {
    ssid: "ElbStay",
    password: "Elbstay.de",
  },
  parking: "Es ist kein direkter Parkplatz für die Wohnung vorgesehen. Parkplätze sind in unmittelbarer Umgebung in den Nebenstraßen vorhanden.",
  houseRules: [
    "Ruhezeiten: 22:00 – 07:00 Uhr.",
    "Keine Parties erlaubt.",
    "Nichtraucher-Apartment.",
  ],
  checkInTime: "ab 15:00 Uhr",
  checkOutTime: "bis 10:00 Uhr",
  steps: [
    {
      title: "Hauseingang",
      description: "Suche den Hauseingang auf der Leipziger Straße 138.",
      imageUrl: "/images/checkin/wbadd2703-step1.jpg",
    },
    {
      title: "Briefkasten ElbStay",
      description: "Dort befindet sich der Briefkasten mit dem Namen ElbStay. Gebe in den Zahlencode dreimal die 0 ein (000).",
      imageUrl: "/images/checkin/wbadd2703-step2.jpg",
    },
    {
      title: "Schlüsselkasten",
      description: "In dem Briefkasten befindet sich ein Schlüsselkasten mit dem Zahlencode 3784. Dort erhältst du den Schlüssel und Zugang zur Wohnung.",
      imageUrl: "/images/checkin/wbadd2703-step3.jpg",
    },
    {
      title: "Treppenhaus",
      description: "Gehe die Treppe nach oben, die erste Tür links ist der Zugang zur Wohnung.",
      imageUrl: "/images/checkin/wbadd2703-step4.jpg",
    },
    {
      title: "Wohnungstür",
      description: "Der Zugang zur Wohnung. Wir wünschen dir einen wundervollen Aufenthalt.",
      imageUrl: "/images/checkin/wbadd2703-step5.jpg",
    }
  ],
  checkOutChecklist: [
    "Alle Fenster schließen.",
    "Heizung auf Stern (*) stellen.",
    "Müll entsorgen.",
    "Schlüssel am vorgesehenen Ort hinterlassen.",
  ],
  host: {
    name: "Magdalena",
    role: "Feel Good Manager & Gäste-Host",
    imageUrl: "/images/checkin/host-magdalena.jpg",
    phone: "+4915203350853",
    whatsappMessage: "Hallo Magdalena, ich bin gerade im Boutique-Apartment angekommen und habe eine Frage:",
    languages: ["de", "en", "pl"],
  },
};
