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
      title: "Briefkasten lokalisieren",
      description: "Gehen Sie zu dem Briefkasten neben dem Eingang, finden Sie den Kasten mit dem Schild WE 10. Dafür nutzen Sie den Code 825.",
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
  },
};
