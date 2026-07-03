import { AmenityCategory } from "@/types/apartment";

export const boutiqueAmenities: AmenityCategory[] = [
  {
    category: "Badezimmer",
    items: [
      { name: "Badewanne", available: true, icon: "Bath" },
      { name: "Warmwasser", available: true, icon: "Droplets" },
      { name: "Föhn", available: true, icon: "Wind" },
      { name: "Shampoo & Duschgel", available: true, icon: "Droplet" },
      { name: "Reinigungsprodukte", available: true, icon: "SprayCan" }
    ]
  },
  {
    category: "Schlafzimmer & Wäsche",
    items: [
      { name: "Waschmaschine", available: true, icon: "WashingMachine" },
      { name: "Trockner (kostenlos)", available: true, icon: "Shirt" },
      { name: "Bettwäsche (Baumwolle)", available: true, icon: "Bed" },
      { name: "Handtücher & Grundausstattung", available: true, icon: "Square" },
      { name: "Fensterverdunklung", available: true, icon: "Moon" },
      { name: "Kleiderschrank & Kommode", available: true, icon: "DoorOpen" },
      { name: "Bügeleisen", available: true, icon: "Iron" }
    ]
  },
  {
    category: "Unterhaltung",
    items: [
      { name: "Fernseher", available: true, icon: "Tv" },
      { name: "Bücher & Lesematerial", available: true, icon: "BookOpen" },
      { name: "Brettspiele", available: true, icon: "Gamepad2" }
    ]
  },
  {
    category: "Küche & Esszimmer",
    items: [
      { name: "Voll ausgestattete Küche", available: true, icon: "UtensilsCrossed" },
      { name: "Kühlschrank & Gefrierschrank", available: true, icon: "Refrigerator" },
      { name: "Geschirrspüler", available: true, icon: "Waves" },
      { name: "Herd & Edelstahl-Backofen", available: true, icon: "ChefHat" },
      { name: "Kaffeemaschine (French-Press)", available: true, icon: "Coffee" },
      { name: "Wasserkocher & Toaster", available: true, icon: "CupSoda" },
      { name: "Geschirr, Besteck & Weingläser", available: true, icon: "Wine" },
      { name: "Grundausstattung (Öl, Salz, etc.)", available: true, icon: "SaltPepper" },
      { name: "Esstisch", available: true, icon: "Table" }
    ]
  },
  {
    category: "Für Familien",
    items: [
      { name: "Babybett (auf Anfrage)", available: true, icon: "Baby" },
      { name: "Reisebett für Kinder", available: true, icon: "Bed" },
      { name: "Freistehender Hochstuhl", available: true, icon: "Armchair" },
      { name: "Kinderbücher & Spielzeug", available: true, icon: "Puzzle" }
    ]
  },
  {
    category: "Internet & Büro",
    items: [
      { name: "Highspeed-WLAN", available: true, icon: "Wifi" }
    ]
  },
  {
    category: "Heizung & Klima",
    items: [
      { name: "Zentralheizung", available: true, icon: "Thermometer" }
    ]
  },
  {
    category: "Sicherheit",
    items: [
      { name: "Rauchmelder", available: true, icon: "ShieldAlert" },
      { name: "Feuerlöscher", available: true, icon: "Flame" },
      { name: "Erste-Hilfe-Set", available: true, icon: "Cross" }
    ]
  },
  {
    category: "Services & Parken",
    items: [
      { name: "Eigenständiger Check-in (Schlüsselbox)", available: true, icon: "Key" },
      { name: "Privater Eingang", available: true, icon: "DoorOpen" },
      { name: "Kostenfreie Parkplätze auf der Straße", available: true, icon: "Car" },
      { name: "Haustiere & Assistenztiere erlaubt", available: true, icon: "Dog" },
      { name: "Haushaltshilfe (gegen Aufpreis)", available: true, icon: "UserCircle" }
    ]
  }
];
