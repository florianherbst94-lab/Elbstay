const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Remove REVIEWS array
content = content.replace(/const REVIEWS = \[[\s\S]*?\];\n/, '');

// 2. Fix FAQS array
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
content = content.replace(/const FAQS = \[[\s\S]*?\];/, newFaqs);

// 3. Remove review section
const reviewSectionRegex = /\{\/\* ═══════════════════════════════════════════\n          5\. BEWERTUNGEN – Premium Cards\n      ═══════════════════════════════════════════ \*\/\}[\s\S]*?(?=\{\/\* ═══════════════════════════════════════════\n          6\. FAQ)/;
content = content.replace(reviewSectionRegex, '');

// 4. Inject SEO links
if (!content.includes('SEOClusterLinks')) {
  content = content.replace(
    'import { motion, useScroll, useTransform } from "framer-motion";',
    'import { motion, useScroll, useTransform } from "framer-motion";\nimport { SEOClusterLinks } from "@/components/layout/SEOClusterLinks";'
  );
  content = content.replace(
    '{/* ═══════════════════════════════════════════\n          6. FAQ',
    '<SEOClusterLinks />\n\n      {/* ═══════════════════════════════════════════\n          6. FAQ'
  );
}

// 5. Fix fake distances
content = content.replace('10 Min. zur Frauenkirche', 'Verschiedene Lagen in Dresden');
content = content.replace('4.9 ★ von 50+ Gästen', 'Höchste Gästezufriedenheit');
content = content.replace('5 Min. zu Fuß zur Frauenkirche', 'Zentrale Lagen');
content = content.replace('10 Min. zum Zwinger & Semperoper', 'Direkte ÖPNV-Anbindung');
content = content.replace('Elbradweg direkt vor der Tür', 'Kurze Wege zur Natur');
content = content.replace('Straßenbahn-Haltestelle in 2 Min.', 'Einfache Anreise');
content = content.replace('detail: "750m"', 'detail: "Altstadt"');
content = content.replace('detail: "1.2km"', 'detail: "Mobil"');
content = content.replace('detail: "0m"', 'detail: "Grün"');
content = content.replace('detail: "150m"', 'detail: "Verkehr"');

// Fix DRESDEN_HIGHLIGHTS distances
content = content.replace('distance: "10 Min."', 'distance: "Top Lage"');
content = content.replace('distance: "1 Min."', 'distance: "Top Lage"');
content = content.replace('distance: "8 Min."', 'distance: "Top Lage"');

fs.writeFileSync(pagePath, content);
