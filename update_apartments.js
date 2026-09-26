const fs = require('fs');

let content = fs.readFileSync('src/lib/data/apartments.ts', 'utf-8');

const importStatement = `import { boutique2Gallery } from "@/lib/boutique-2/images";\n`;
content = importStatement + content;

const newApt = `
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
`;

content = content.replace(/\];/, `,\n${newApt}\n];`);

fs.writeFileSync('src/lib/data/apartments.ts', content);
