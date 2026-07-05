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

export const wbadd5902Data: ApartmentData = {
  id: "wbadd5902",
  name: "ElbStay Urban",
  address: "Hermsdorfer Str. 11, 01159 Dresden, Deutschland",
  mapUrl: "https://wbk.li/de/dresden-o93",
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
      description: "Suche den Hauseingang auf der Ostra-Allee 9.",
      imageUrl: "/images/urban/airbnb-flo-5.jpg", // Placeholder until images are provided
    },
    {
      title: "Schlüsselkasten",
      description: "Am Eingang befindet sich ein Schlüsselkasten. Dort erhältst du den Schlüssel und Zugang zur Wohnung.",
      imageUrl: "/images/urban/airbnb-flo-5.jpg",
    },
    {
      title: "Wohnungstür",
      description: "Der Zugang zur Wohnung. Wir wünschen dir einen wundervollen Aufenthalt.",
      imageUrl: "/images/urban/airbnb-flo-5.jpg",
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
    whatsappMessage: "Hallo Magdalena, ich bin gerade im ElbStay Urban angekommen und habe eine Frage:",
    languages: ["de", "en", "pl"],
  },
};
