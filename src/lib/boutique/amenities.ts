import { AmenityCategory } from "@/lib/amenities";

export const boutiqueAmenities: AmenityCategory[] = [
  {
    category: "Wohnbereich & Unterhaltung",
    items: [
      { name: "WLAN", available: true, icon: "Wifi" },
      { name: "TV", available: true, icon: "Tv" },
      { name: "Arbeitsplatz", available: true, icon: "Laptop" }
    ]
  },
  {
    category: "Küche & Esszimmer",
    items: [
      { name: "Küche", available: true, icon: "ChefHat" },
      { name: "Kühlschrank", available: true, icon: "Refrigerator" },
      { name: "Mikrowelle", available: true, icon: "Microwave" },
      { name: "Kaffeemaschine", available: true, icon: "Coffee" }
    ]
  },
  {
    category: "Schlafzimmer & Bad",
    items: [
      { name: "Waschmaschine", available: true, icon: "WashingMachine" },
      { name: "Föhn", available: true, icon: "Wind" },
      { name: "Handtücher", available: true, icon: "Bath" },
      { name: "Bettwäsche", available: true, icon: "Bed" }
    ]
  },
  {
    category: "Parken & Sonstiges",
    items: [
      { name: "Parkplatz an der Straße", available: true, icon: "Car" },
      { name: "Eigenständiger Check-in", available: true, icon: "Key" },
      { name: "Langzeitaufenthalte", available: true, icon: "CalendarCheck" }
    ]
  }
];
