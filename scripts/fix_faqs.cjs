const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

const regex = /const FAQS = \[[\s\S]*?\];/;

const newFaqs = `const FAQS = [
  {
    q: "Wie funktioniert der Check-in?",
    a: "Unkompliziert: Sie erhalten vor Anreise einen digitalen Zugangscode per E-Mail. Damit checken Sie 24/7 eigenständig ein – kein Schlüssel, keine Wartezeit.",
  },
  {
    q: "Gibt es Parkmöglichkeiten?",
    a: "Die Parkmöglichkeiten variieren je nach Apartment. Während Sie bei den Apartments in Pieschen und Löbtau (Boutique & Urban) kostenfreie öffentliche Parkmöglichkeiten in den Nebenstraßen finden, stehen am Premium-Standort im Zentrum primär kostenpflichtige Parkhäuser zur Verfügung.",
  },
  {
    q: "Sind Haustiere erlaubt?",
    a: "Um unseren hohen Standard an Sauberkeit und Hygiene für alle Gäste zu gewährleisten, sind Haustiere in unseren Apartments leider nicht gestattet.",
  },
  {
    q: "Wie ist die Stornierungsregelung?",
    a: "Bei Direktbuchung über unsere Website gilt: Kostenlose Stornierung bis 7 Tage vor Anreise. Danach berechnen wir 80% des Gesamtpreises.",
  },
  {
    q: "Für wen sind die Apartments geeignet?",
    a: "Für Paare, Städtereisende, Business-Gäste und Familien oder kleinere Gruppen.",
  },
  {
    q: "Warum direkt buchen statt über Portale?",
    a: "Drei gute Gründe: Sie sparen die Plattform-Gebühren, erhalten flexiblere Stornierungsbedingungen und haben einen persönlichen Ansprechpartner – kein Bot, kein Callcenter.",
  }
];`;

content = content.replace(regex, newFaqs);
fs.writeFileSync(pagePath, content);
