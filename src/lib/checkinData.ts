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
      description: "Biegen Sie in die Einfahrt Berliner Straße ein. Sie erkennen diese am markanten Wandgemälde auf der linken Seite.",
      imageUrl: "/images/checkin/entrance-mural.png",
    },
    {
      title: "Parkplatz finden",
      description: "Parken Sie auf dem für Sie reservierten Stellplatz mit der Nummer WE10 im Innenhof.",
      imageUrl: "/images/checkin/courtyard.png",
    },
    {
      title: "Stellplatz-Schild",
      description: "Suchen Sie das Schild mit der Aufschrift 'P WE 10' an der Umzäunung.",
      imageUrl: "/images/checkin/parking-sign.png",
    },
    {
      title: "Briefkasten lokalisieren",
      description: "Gehen Sie zu den Briefkästen neben der gefliesten Eingangswand. Finden Sie den Kasten 'WE 10'.",
      imageUrl: "/images/checkin/mailboxes.png",
    },
    {
      title: "Schlüssel entnehmen",
      description: "Geben Sie den PIN 825 am Briefkasten ein, um den Schlüssel zu entnehmen. Die Wohnung finden Sie im 5. Stock.",
      imageUrl: "/images/checkin/spiral-stairs.png",
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
