"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ApartmentCard } from "@/components/apartment/ApartmentCard";
import {
  Wifi, Tv, UtensilsCrossed, Coffee, WashingMachine, Key, BedDouble, Bath,
  MapPin, Star, Percent, HeartHandshake, PhoneCall, ChevronDown,
  Landmark, TreePine, Bike, Music,
  CalendarCheck, ArrowRight, Quote
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */

const APARTMENTS = [
  {
    id: "urban-1",
    name: "ElbStay Urban",
    type: "Urban" as const,
    description: "Klare Linien, warme Materialien und ein durchdachtes Raumgefühl – für alle, die Design und Ruhe lieben.",
    guests: 4,
    beds: "1 Bett + 1 Schlafcouch",
    size: 55,
    imageUrl: "/images/urban/airbnb-flo-5.jpg",
    priceFrom: 120,
  },
  {
    id: "premium-1",
    name: "ElbStay Premium",
    type: "Premium" as const,
    description: "Dachterrasse mit Elbblick, großzügige Räume und Premium-Ausstattung – Ihr privates Penthouse über Dresden.",
    guests: 6,
    beds: "2 Betten + 1 Schlafcouch",
    size: 120,
    imageUrl: "/images/premium/floairbnb_-77.jpg",
    priceFrom: 280,
  }
];

const AMENITIES = [
  { icon: Wifi, label: "Highspeed-WLAN", desc: "100 Mbit/s" },
  { icon: Tv, label: "55\" Smart-TV", desc: "Netflix & Co." },
  { icon: UtensilsCrossed, label: "Küche", desc: "Voll ausgestattet" },
  { icon: Coffee, label: "Kaffeemaschine", desc: "Nespresso" },
  { icon: WashingMachine, label: "Waschmaschine", desc: "Im Apartment" },
  { icon: Key, label: "Self-Check-in", desc: "24/7 Zugang" },
  { icon: BedDouble, label: "Premium-Betten", desc: "Boxspring" },
  { icon: Bath, label: "Pflegeprodukte", desc: "Handtücher inkl." },
];

const REVIEWS = [
  {
    name: "Sarah & Markus",
    date: "März 2026",
    stars: 5,
    text: "Morgens Kaffee mit Elbblick, abends zu Fuß in die Altstadt – so hatten wir uns Dresden vorgestellt. Die Wohnung ist geschmackvoll bis ins Detail.",
  },
  {
    name: "Dr. Thomas Richter",
    date: "Februar 2026",
    stars: 5,
    text: "Ruhig, zentral, schnelles WLAN – perfekt für meinen Business-Trip. Die Direktbuchung hat mir 15€ pro Nacht gespart. Komme definitiv wieder.",
  },
  {
    name: "Julia & Freundinnen",
    date: "Januar 2026",
    stars: 5,
    text: "Drei Tage Dresden mit den Mädels – und die Wohnung war das Highlight. Großzügig, stylish, und die Küche hat sogar einen Weinkühler!",
  },
];

const DRESDEN_HIGHLIGHTS = [
  {
    icon: Landmark,
    title: "Frauenkirche & Altstadt",
    text: "Durch kopfsteingepflasterte Gassen schlendern, die Semperoper bestaunen und danach ein Eis am Neumarkt.",
    distance: "10 Min.",
  },
  {
    icon: TreePine,
    title: "Elbwiesen & Natur",
    text: "Morgens joggen am Wasser, abends den Sonnenuntergang über der Skyline genießen – direkt vor der Tür.",
    distance: "1 Min.",
  },
  {
    icon: Bike,
    title: "Elbradweg",
    text: "Auf einem der schönsten Radwege Europas bis ins Elbsandsteingebirge – Start direkt am Apartment.",
    distance: "Vor der Tür",
  },
  {
    icon: Music,
    title: "Dresdner Neustadt",
    text: "Craft-Kaffee, Vintage-Läden und das beste Nachtleben der Stadt – alles fußläufig erreichbar.",
    distance: "8 Min.",
  },
];

const FAQS = [
  {
    q: "Wie funktioniert der Check-in?",
    a: "Unkompliziert: Sie erhalten vor Anreise einen digitalen Zugangscode per E-Mail. Damit checken Sie 24/7 eigenständig ein – kein Schlüssel, keine Wartezeit.",
  },
  {
    q: "Gibt es Parkmöglichkeiten?",
    a: "Ja. Mehrere Parkplätze und Parkhäuser befinden sich in direkter Nähe. Gerne reservieren wir auf Anfrage einen festen Stellplatz für Sie.",
  },
  {
    q: "Sind Haustiere erlaubt?",
    a: "Leider nein – um allen Gästen ein sauberes, allergenfreies Umfeld zu garantieren, nehmen wir keine Haustiere auf.",
  },
  {
    q: "Wie ist die Stornierungsregelung?",
    a: "Bei Direktbuchung: kostenlose Stornierung bis 7 Tage vor Anreise. Danach 50% des Gesamtpreises. Deutlich flexibler als Airbnb oder Booking.",
  },
  {
    q: "Wie komme ich am besten nach Dresden?",
    a: "Per Bahn: Hauptbahnhof in 15 Min. Per Auto: A4/A17 direkt nach Dresden. Per Flugzeug: Flughafen Dresden in 20 Min. Die Straßenbahn bringt Sie direkt zu uns.",
  },
  {
    q: "Wie weit ist es zur Dresdner Altstadt?",
    a: "Die Frauenkirche erreichen Sie in 10 Minuten zu Fuß, den Zwinger und die Semperoper in etwa 15 Minuten. Die Straßenbahn-Haltestelle ist 150m entfernt.",
  },
  {
    q: "Für wen sind die Apartments geeignet?",
    a: "Für alle, die Wert auf Stil und Ruhe legen: Paare, Städtereisende, Business-Gäste und kleine Familien. Das ElbStay Urban ist perfekt für 1–2 Personen, das Premium für bis zu 6 Gäste.",
  },
  {
    q: "Warum direkt buchen statt über Airbnb?",
    a: "Drei gute Gründe: Sie sparen die Plattform-Gebühren (ca. 10%), erhalten flexiblere Stornierungsbedingungen und haben einen persönlichen Ansprechpartner – kein Bot, kein Callcenter.",
  },
  {
    q: "Welche Sehenswürdigkeiten sind in der Nähe?",
    a: "Frauenkirche, Zwinger, Semperoper und Brühlsche Terrasse sind alle fußläufig erreichbar. Die Dresdner Neustadt mit ihren Cafés und Boutiquen ist nur 8 Minuten entfernt.",
  },
  {
    q: "Gibt es einen Mindestaufenthalt?",
    a: "Der Mindestaufenthalt beträgt 2 Nächte. Bei längeren Aufenthalten ab 7 Nächten gewähren wir zusätzliche Rabatte – sprechen Sie uns einfach an.",
  },
];

/* ═══════════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const fadeUpSlow = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const staggerSlow = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

/* ═══════════════════════════════════════════════
   DECORATIVE COMPONENTS
═══════════════════════════════════════════════ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="h-px w-8 bg-primary/40" />
      <span className="text-primary font-semibold tracking-[0.2em] uppercase text-xs">
        {children}
      </span>
      <div className="h-px w-8 bg-primary/40" />
    </div>
  );
}

function DresdenSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="none">
      <path d="M0,120 L0,100 L80,100 L80,90 L100,90 L100,75 L110,60 L115,45 L120,60 L130,75 L130,90 L160,90 L160,75 L170,60 L175,40 L178,25 L180,15 L182,25 L185,40 L190,60 L190,75 L200,90 L260,90 L260,80 L275,55 L285,30 L290,10 L295,30 L305,55 L310,80 L320,90 L380,90 L395,70 L400,55 L405,70 L410,90 L500,95 L560,80 L575,60 L580,50 L585,60 L600,80 L680,95 L710,85 L720,65 L730,85 L800,95 L920,90 L935,70 L950,90 L1060,85 L1080,60 L1090,40 L1100,60 L1120,85 L1240,90 L1250,80 L1260,90 L1380,100 L1440,100 L1440,120 Z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   FAQ ITEM
═══════════════════════════════════════════════ */

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className="border-b border-border/50"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-7 text-left group"
      >
        <span className="text-lg font-semibold text-foreground pr-8 group-hover:text-primary transition-colors duration-300">
          {q}
        </span>
        <div className={`h-8 w-8 rounded-full border border-border/60 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/5 ${open ? "bg-primary/10 border-primary/30" : ""}`}>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`}
          />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-7 text-muted-foreground leading-relaxed max-w-3xl text-[15px]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════ */

export default function Home() {
  // Parallax refs
  const heroRef = useRef(null);
  const locationImageRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  const { scrollYProgress: locProgress } = useScroll({
    target: locationImageRef,
    offset: ["start end", "end start"],
  });
  const locY = useTransform(locProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ═══════════════════════════════════════════
          1. HERO – Full-Viewport Parallax
      ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image
            src="/images/dresden_hero_user_final.jpg"
            alt="Dresden Skyline bei Sonnenuntergang"
            fill
            className="object-cover scale-110 animate-[kenburns_25s_ease-in-out_infinite_alternate]"
            priority
            quality={100}
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />
        </motion.div>

        {/* Dresden Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 z-[1] text-white/[0.04] pointer-events-none">
          <DresdenSilhouette className="w-full h-auto" />
        </div>

        {/* Content with parallax opacity */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center pt-28 pb-24"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerSlow}
          >
            {/* Social Proof Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 py-2.5 px-6 rounded-full glass text-white text-sm font-medium mb-10 shadow-lg"
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="tracking-wide">4.9 von 5 · Von Gästen empfohlen</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUpSlow}
              className="font-serif text-[2.75rem] md:text-7xl lg:text-[5.5rem] font-bold text-white mb-8 drop-shadow-lg leading-[1.06] tracking-tight text-balance"
            >
              Morgens Elbe. Abends Altstadt.<br className="hidden sm:block" />
              <span className="text-white/75">Dazwischen: Ihr Zuhause.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto text-balance"
            >
              Design-Apartments an der Elbe, wenige Schritte zur Frauenkirche.
              Für Paare und Entdecker, die mehr als ein Hotelzimmer suchen.
            </motion.p>

            {/* Trust Bullets */}
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12"
            >
              {[
                { icon: Star, text: "4.9 ★ von 50+ Gästen" },
                { icon: MapPin, text: "10 Min. zur Frauenkirche" },
                { icon: Percent, text: "ca. 10% günstiger als Airbnb" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-white/70 text-sm">
                  <item.icon className="h-4 w-4 text-white/50" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="#book" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-base h-16 px-12 rounded-full shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-semibold text-[15px]">
                  <CalendarCheck className="mr-2.5 h-5 w-5" />
                  Verfügbarkeit prüfen
                </Button>
              </Link>
              <Link href="#apartments" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full text-base h-16 px-10 rounded-full glass text-white border-white/20 hover:bg-white hover:text-foreground hover:border-white transition-all duration-400 shadow-xl font-semibold"
                >
                  Apartments ansehen
                  <ArrowRight className="ml-2.5 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Micro-Trust */}
            <motion.p variants={fadeIn} className="text-white/35 text-xs tracking-widest uppercase">
              Ab 120€ / Nacht · Kostenlose Stornierung · Sofortige Bestätigung
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2]" />
      </section>

      {/* ═══════════════════════════════════════════
          2. EMOTIONALER INTRO-TEXT
      ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-40 bg-background relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-3xl mx-auto px-6 md:px-8 text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Willkommen bei ElbStay</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUpSlow}
            className="font-serif text-3xl md:text-[3.25rem] font-bold text-foreground mb-10 leading-[1.15] text-balance"
          >
            Tür auf, Schuhe aus,
            Dresden gehört Ihnen.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg md:text-xl leading-[1.8] text-balance"
          >
            Keine Rezeption, kein Buffet-Gedränge – stattdessen Ihr eigener
            Rückzugsort mit Nespresso, Netflix und Elbblick. So beginnt
            ein guter Tag in Dresden.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          3. AUSSTATTUNG – Premium Icon Grid
      ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-40 bg-muted/50 relative overflow-hidden">
        {/* Subtle background silhouette */}
        <div className="absolute bottom-0 left-0 right-0 text-border/30 pointer-events-none">
          <DresdenSilhouette className="w-full h-auto" />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Ausstattung</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUpSlow}
              className="font-serif text-3xl md:text-[3.25rem] font-bold text-foreground mb-6 text-balance"
            >
              Einziehen und wohlfühlen.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Boxspring-Betten, Nespresso, Netflix – jedes Detail ist durchdacht.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6"
          >
            {AMENITIES.map((item, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className="premium-card flex flex-col items-center text-center p-7 md:p-8 rounded-2xl bg-background border border-border/40 group cursor-default"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/[0.07] flex items-center justify-center mb-5 group-hover:bg-primary/[0.12] group-hover:scale-110 transition-all duration-400">
                  <item.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-semibold text-foreground mb-1">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. LAGE – Parallax Image
      ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-14 lg:gap-24 items-center"
          >
            {/* Text */}
            <motion.div variants={fadeUp} className="order-2 md:order-1">
              <SectionLabel>Standort</SectionLabel>
              <h2 className="font-serif text-3xl md:text-[3.25rem] font-bold text-foreground mb-8 leading-[1.12] text-balance">
                Zentral an der Elbe.
                Alles fußläufig.
              </h2>
              <p className="text-muted-foreground text-lg leading-[1.8] mb-10">
                Die Frauenkirche zum Abendspaziergang, der Elbradweg für morgens,
                die Neustadt für abends – von uns aus erreichen Sie alles in Minuten.
              </p>
              <div className="space-y-5">
                {[
                  { text: "5 Min. zu Fuß zur Frauenkirche", detail: "750m" },
                  { text: "10 Min. zum Zwinger & Semperoper", detail: "1.2km" },
                  { text: "Elbradweg direkt vor der Tür", detail: "0m" },
                  { text: "Straßenbahn-Haltestelle in 2 Min.", detail: "150m" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1, ease }}
                    className="flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/[0.07] flex items-center justify-center shrink-0 group-hover:bg-primary/[0.12] transition-colors duration-300">
                        <MapPin className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      </div>
                      <span className="text-foreground font-medium">{item.text}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono tracking-wide">{item.detail}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Parallax Image */}
            <motion.div
              ref={locationImageRef}
              variants={scaleIn}
              className="relative h-[450px] md:h-[580px] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-2"
            >
              <motion.div className="absolute inset-0" style={{ y: locY }}>
                <Image
                  src="/images/dresden_hero_user_final.jpg"
                  alt="Dresden Lage – Blick auf Elbe und Altstadt"
                  fill
                  className="object-cover scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-2xl px-6 py-4 bg-white/80 backdrop-blur-xl border-white/40">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground text-sm block">Dresden · Löbtau</span>
                      <span className="text-xs text-muted-foreground">Direkt an der Elbe</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. DIREKTBUCHUNGS-VORTEILE + APARTMENTS
      ═══════════════════════════════════════════ */}
      <section id="apartments" className="py-28 md:py-40 bg-muted/40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
          {/* Direktbuchungs-Vorteile */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Direkt buchen & sparen</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUpSlow}
              className="font-serif text-3xl md:text-[3.25rem] font-bold text-foreground mb-6 text-balance"
            >
              Direkt buchen. Mehr sparen.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Sie finden uns auch auf Airbnb und Booking.com. Aber: Direkt bei uns sparen Sie
              die Plattform-Gebühren – und bekommen persönlichen Service dazu.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 md:gap-8 mb-28"
          >
            {[
              {
                icon: Percent,
                title: "Bestpreis-Garantie",
                text: "Keine Vermittlungsgebühr, kein Aufschlag. Bei uns sparen Sie ca. 10% gegenüber Airbnb und Booking.",
                highlight: "– 10%",
              },
              {
                icon: HeartHandshake,
                title: "Flexibel stornieren",
                text: "Kostenlos stornieren bis 7 Tage vor Anreise. Keine Anzahlung, kein Risiko.",
                highlight: "Gratis",
              },
              {
                icon: PhoneCall,
                title: "Echte Gastgeber",
                text: "Kein Bot, kein Callcenter. Wir sind vor Ort in Dresden und helfen Ihnen persönlich.",
                highlight: "Direkt",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className="premium-card bg-background rounded-3xl p-8 md:p-10 border border-border/40 group cursor-default relative overflow-hidden"
              >
                {/* Highlight badge */}
                <div className="absolute top-6 right-6 text-xs font-bold text-primary bg-primary/[0.08] px-3 py-1 rounded-full">{item.highlight}</div>

                <div className="h-14 w-14 rounded-2xl bg-primary/[0.07] flex items-center justify-center mb-8 group-hover:bg-primary/[0.12] group-hover:scale-110 transition-all duration-400">
                  <item.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Apartment-Karten */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <SectionLabel>Unsere Apartments</SectionLabel>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance">
                  Zwei Apartments. Ein Versprechen.
                </h2>
              </div>
              <p className="text-muted-foreground text-lg max-w-md leading-relaxed pb-1">
                Eingerichtet wie ein Zuhause. Ausgestattet wie ein Hotel.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid md:grid-cols-2 gap-8 lg:gap-12"
            >
              {APARTMENTS.map((apt) => (
                <motion.div key={apt.id} variants={scaleIn} className="h-full">
                  <ApartmentCard {...apt} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. BEWERTUNGEN – Premium Cards
      ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-40 bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Gästestimmen</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUpSlow}
              className="font-serif text-3xl md:text-[3.25rem] font-bold text-foreground mb-8 text-balance"
            >
              50+ Gäste. Alle begeistert.
            </motion.h2>
            <motion.div variants={fadeIn} className="flex items-center justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-primary fill-current" />
              ))}
              <span className="ml-3 text-foreground font-bold text-lg">5.0</span>
              <span className="text-muted-foreground text-sm ml-1">/ 5 Sterne</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className="premium-card bg-muted/50 rounded-3xl p-8 md:p-10 border border-border/30 relative group cursor-default"
              >
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/15 mb-6" strokeWidth={1} />

                <div className="flex items-center gap-1 mb-5">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-foreground leading-[1.8] mb-8 text-[15px]">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-border/30">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. DRESDEN-ERLEBNIS
      ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-40 bg-muted/40 relative overflow-hidden">
        {/* Background silhouette */}
        <div className="absolute top-0 left-0 right-0 text-border/20 pointer-events-none rotate-180">
          <DresdenSilhouette className="w-full h-auto" />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Entdecken</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUpSlow}
              className="font-serif text-3xl md:text-[3.25rem] font-bold text-foreground mb-6 text-balance"
            >
              Elbflorenz vor der Tür
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Die schönsten Orte Dresdens – alle in wenigen Minuten erreichbar.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {DRESDEN_HIGHLIGHTS.map((item, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className="premium-card bg-background rounded-3xl p-7 border border-border/40 group cursor-default relative"
              >
                {/* Distance badge */}
                <div className="absolute top-5 right-5 text-[10px] font-semibold text-primary bg-primary/[0.06] px-2.5 py-1 rounded-full tracking-wide uppercase">
                  {item.distance}
                </div>

                <div className="h-12 w-12 rounded-2xl bg-primary/[0.07] flex items-center justify-center mb-6 group-hover:bg-primary/[0.12] group-hover:scale-110 transition-all duration-400">
                  <item.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. FAQ
      ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-40 bg-background">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Häufige Fragen</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUpSlow}
              className="font-serif text-3xl md:text-[3.25rem] font-bold text-foreground text-balance"
            >
              Gut zu wissen
            </motion.h2>
          </motion.div>

          <div className="border-t border-border/50">
            {FAQS.map((faq, idx) => (
              <FaqItem key={idx} q={faq.q} a={faq.a} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. FINALER CTA – Dark + Premium
      ═══════════════════════════════════════════ */}
      <section id="book" className="py-28 md:py-40 bg-[#1e1e1e] text-white relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-[0.04]">
          <Image
            src="/images/dresden_hero_user_final.jpg"
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Dresden silhouette at top */}
        <div className="absolute top-0 left-0 right-0 text-white/[0.03] pointer-events-none rotate-180">
          <DresdenSilhouette className="w-full h-auto" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerSlow}
          className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 text-center"
        >
          <motion.div variants={fadeUp} className="mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-white/20" />
              <span className="text-white/50 font-semibold tracking-[0.2em] uppercase text-xs">Jetzt buchen</span>
              <div className="h-px w-8 bg-white/20" />
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUpSlow}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.08] text-balance"
          >
            Ihr Dresden wartet.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-white/60 text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto text-balance"
          >
            Sichern Sie sich Ihren Wunschtermin – direkt, ohne Umwege,
            zum garantiert besten Preis.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/apartments/urban#book" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-base h-16 px-12 rounded-full shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 bg-white text-[#1e1e1e] hover:bg-white/90 font-semibold">
                <CalendarCheck className="mr-2.5 h-5 w-5" />
                Verfügbarkeit prüfen
              </Button>
            </Link>
            <Link href="#apartments" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-base h-16 px-10 rounded-full bg-transparent text-white border-white/20 hover:bg-white/10 transition-all duration-300 font-semibold"
              >
                Apartments ansehen
                <ArrowRight className="ml-2.5 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.p variants={fadeIn} className="text-white/30 text-sm">
            Auch verfügbar auf{" "}
            <span className="text-white/50 font-medium">Airbnb</span> und{" "}
            <span className="text-white/50 font-medium">Booking.com</span>{" "}
            – aber direkt bei uns ca. 10% günstiger.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
