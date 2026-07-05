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
      description: "Die Unterkunft befindet auf der Hermsdorfer Str. 11, 01159 Dresden. Gehe durch das Eingangstor – auf der linken Seite im Hof findest du die Eingangstür. Die Ferienwohnung liegt im Erdgeschoss in der Mitte.",
      imageUrl: "/images/checkin/urban/hauseingang.jpg",
    },
    {
      title: "Briefkasten & Schlüssel",
      description: "Dein Schlüssel ist in einer Box im Briefkasten von Herbst, unten rechts, aufbewahrt. Der Briefkasten ist mit einem dreistelligen Zahlenschloss gesichert. Der Code lautet: 0 2 9. Es befinden sich 2 Schlüssel darin.",
      imageUrl: "/images/checkin/urban/schluessel_briefkasten.jpg",
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
