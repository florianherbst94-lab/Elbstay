import { boutique2Gallery } from "@/lib/boutique-2/images";
import { urbanGallery, premiumGallery } from "@/lib/images";
import { boutiqueGallery } from "@/lib/boutique/images";

export type ApartmentType = "Boutique" | "Premium" | "Urban";

export interface ApartmentData {
  id: string;
  name: string;
  type: ApartmentType;
  shortDescription: string;
  longDescription: string;
  guests: number;
  beds: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  imageUrl: string;
  gallery: any[];
  priceFrom: number;
  address: {
    street: string;
    city: string;
    zip: string;
    region: string;
    country: string;
  };
  district: string;
  geo: {
    lat: number;
    lng: number;
  };
  slug: string;
  cancellationPolicy: string;
  parking: string;
  wifi: string;
  washingMachine: boolean;
  babyBed: boolean;
  checkIn: string;
  features: string[];
}

export const APARTMENTS: ApartmentData[] = [
  {
    id: "boutique",
    name: "ElbStay Boutique",
    type: "Boutique",
    shortDescription: "Stilvolles Boutique-Apartment in Dresden-Pieschen. Die hochwertig eingerichtete 2-Raum-Wohnung verbindet Altbaucharme, warmes Interior und modernen Komfort.",
    longDescription: "Erleben Sie Dresden in unserem liebevoll sanierten Boutique-Apartment im beliebten Stadtteil Pieschen. Die 48m² große 2-Raum-Wohnung bietet mit ihrem Mix aus Altbaucharme, freigelegter Ziegelwand und moderner Ausstattung den perfekten Rückzugsort. Genießen Sie den Komfort eines Premium-Boxspringbettes, einer voll ausgestatteten Küche mit Nespresso-Maschine und eines modernen Badezimmers mit bodengleicher Regendusche. Schnelles WLAN und ein Smart-TV runden das Angebot ab.",
    guests: 4,
    beds: "1 Bett + 1 Schlafcouch",
    bedrooms: 1,
    bathrooms: 1,
    size: 48,
    imageUrl: boutiqueGallery[0]?.images[0] || "/images/boutique/living-room-1.jpg",
    gallery: boutiqueGallery,
    priceFrom: 85,
    address: {
      street: "Leipziger Straße",
      city: "Dresden",
      zip: "01127",
      region: "Sachsen",
      country: "DE"
    },
    district: "Dresden-Pieschen",
    geo: {
      lat: 51.0772,
      lng: 13.7226
    },
    slug: "/apartments/boutique",
    cancellationPolicy: "Kostenlose Stornierung bis 7 Tage vor Anreise.",
    parking: "Kostenfreie öffentliche Parkmöglichkeiten befinden sich in umliegenden Straßen. Ein Stellplatz kann nicht garantiert werden.",
    wifi: "Highspeed WLAN",
    washingMachine: true,
    babyBed: true,
    checkIn: "Flexibler Self Check-in ab 15:00 Uhr",
    features: ["Voll ausgestattete Küche", "Nespresso-Maschine", "Boxspringbett", "Smart-TV", "Balkon"]
  },
  {
    id: "premium-1",
    name: "ElbStay Premium",
    type: "Premium",
    shortDescription: "Exklusives Penthouse mit weitläufiger Dachterrasse und Panoramablick über Dresden. Luxus und Erlebnis für Familien und Gruppen.",
    longDescription: "Residieren Sie über den Dächern von Dresden in unserem exklusiven 85m² Penthouse. Das absolute Highlight ist die großzügige Dachterrasse mit Loungemöbeln und atemberaubendem Blick auf die historische Altstadt. Die lichtdurchflutete Wohnung bietet Platz für bis zu 6 Personen in zwei separaten Schlafzimmern und dem großen Wohnbereich. Bodentiefe Fenster, eine voll ausgestattete Designerküche und ein luxuriöses Badezimmer garantieren einen unvergesslichen Aufenthalt im Zentrum der Stadt.",
    guests: 6,
    beds: "2 Betten + 1 Schlafcouch",
    bedrooms: 2,
    bathrooms: 1,
    size: 85,
    imageUrl: premiumGallery[0]?.images[0] || "/images/premium/floairbnb_-77.jpg",
    gallery: premiumGallery,
    priceFrom: 110,
    address: {
      street: "Jahnstraße / Könneritzstraße",
      city: "Dresden",
      zip: "01067",
      region: "Sachsen",
      country: "DE"
    },
    district: "Dresden-Zentrum / Wilsdruffer Vorstadt",
    geo: {
      lat: 51.0594,
      lng: 13.7225
    },
    slug: "/apartments/premium",
    cancellationPolicy: "Kostenlose Stornierung bis 7 Tage vor Anreise.",
    parking: "Öffentliche kostenpflichtige Parkplätze und Parkhäuser in der direkten Umgebung.",
    wifi: "Highspeed WLAN",
    washingMachine: true,
    babyBed: true,
    checkIn: "Flexibler Self Check-in ab 15:00 Uhr",
    features: ["Dachterrasse", "Panoramablick", "Designerküche", "2 Schlafzimmer", "Arbeitsplatz"]
  },
  {
    id: "urban-1",
    name: "ElbStay Urban",
    type: "Urban",
    shortDescription: "Modernes Design-Apartment im Herzen von Dresden. Perfekt für Paare und Business-Reisende, die Wert auf Stil und Komfort legen.",
    longDescription: "Urbanes Wohnen trifft auf höchsten Komfort in unserem 55m² Design-Apartment im aufstrebenden Stadtteil Löbtau. Klare Linien, warme Materialien und ein durchdachtes Raumkonzept schaffen eine Atmosphäre zum Wohlfühlen. Das Apartment verfügt über ein separates Schlafzimmer mit bequemen Boxspringbett, einen großzügigen Wohn- und Essbereich sowie einen sonnigen Balkon. Ideal für Geschäftsreisende und Paare, die Dresden von einer modernen Seite kennenlernen möchten.",
    guests: 4,
    beds: "1 Bett + 1 Schlafcouch",
    bedrooms: 1,
    bathrooms: 1,
    size: 55,
    imageUrl: urbanGallery[0]?.images[0] || "/images/urban/airbnb-flo-5.jpg",
    gallery: urbanGallery,
    priceFrom: 70,
    address: {
      street: "Clara-Zetkin-Straße",
      city: "Dresden",
      zip: "01159",
      region: "Sachsen",
      country: "DE"
    },
    district: "Dresden-Löbtau",
    geo: {
      lat: 51.0427,
      lng: 13.7029
    },
    slug: "/apartments/urban",
    cancellationPolicy: "Kostenlose Stornierung bis 7 Tage vor Anreise.",
    parking: "Kostenfreie öffentliche Parkmöglichkeiten befinden sich in umliegenden Straßen. Ein Stellplatz kann nicht garantiert werden.",
    wifi: "Highspeed WLAN",
    washingMachine: true,
    babyBed: true,
    checkIn: "Flexibler Self Check-in ab 15:00 Uhr",
    features: ["Balkon", "Arbeitsplatz", "Boxspringbett", "Smart-TV", "Voll ausgestattete Küche"]
  }
,

  {
    id: "boutique-2",
    name: "ElbStay Boutique-Apartment nahe der Elbe",
    type: "Boutique",
    shortDescription: "Großzügiges Boutique-Apartment in Dresden. Mit 2 Schlafzimmern, 2 Bädern und Platz für bis zu 8 Gäste.",
    longDescription: "Willkommen im ElbStay Boutique Apartment – stilvoll, großzügig und ideal für bis zu 8 Gäste. Dich erwarten 2 separate Schlafzimmer mit hochwertigen Betten und Smart-TV, 2 Badezimmer mit Badewanne und Dusche sowie weitere Schlafmöglichkeiten im Wohnbereich mit zusätzlichem TV. Dazu: voll ausgestattete Küche, schnelles WLAN und modernes Boutique-Design. Perfekt für Familien, Freunde und Geschäftsreisende.",
    guests: 8,
    beds: "4 Betten",
    bedrooms: 2,
    bathrooms: 2,
    size: 80,
    imageUrl: boutique2Gallery[0]?.images[0] || "https://a0.muscache.com/im/pictures/hosting/Hosting-1781405111319682049/original/b7bf01d9-dea2-4143-823a-21afccc10266.png",
    gallery: boutique2Gallery,
    priceFrom: 120,
    address: {
      street: "Dresden",
      city: "Dresden",
      zip: "01127",
      region: "Sachsen",
      country: "DE"
    },
    district: "Dresden",
    geo: {
      lat: 51.0772,
      lng: 13.7226
    },
    slug: "/apartments/boutique-2",
    cancellationPolicy: "Kostenlose Stornierung bis 7 Tage vor Anreise.",
    parking: "Kostenfreie öffentliche Parkmöglichkeiten befinden sich in umliegenden Straßen.",
    wifi: "Highspeed WLAN",
    washingMachine: true,
    babyBed: true,
    checkIn: "Flexibler Self Check-in ab 15:00 Uhr",
    features: ["2 Badezimmer", "2 Schlafzimmer", "Smart-TV", "Voll ausgestattete Küche"]
  }

];
