"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Wifi, Key, Car, MapPin, CheckCircle2, Clock, 
  LogOut, ShieldCheck, HelpCircle, 
  Sparkles, Navigation, MessageCircle
} from "lucide-react";
import { penthouse1Data } from "@/lib/checkinData";
import { CheckInCarousel } from "@/components/checkin/CheckInCarousel";
import { InfoCard } from "@/components/checkin/InfoCard";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Penthouse1CheckIn() {
  const instructionsRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      {/* --- Sticky Header --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">E</span>
            </div>
            <span className="font-semibold text-foreground tracking-tight">ElbStay</span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => scrollTo(instructionsRef)}
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              Check-in
            </button>
            <button 
              onClick={() => scrollTo(infoRef)}
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              Info
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto space-y-16">
        
        {/* --- Hero Section --- */}
        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            className="relative h-[400px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <Image 
              src="/images/checkin/hero.png"
              alt="Penthouse 1 Innenansicht"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest mb-4 w-fit">
                <Sparkles className="h-3 w-3" />
                Willkommen in Dresden
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-[1.1]">
                Ihr Check-in zum <br />
                <span className="text-primary-foreground font-sans">Penthouse 1</span>
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              Hier finden Sie alle Informationen für einen unkomplizierten Check-in sowie wichtige Details zu Ihrem Aufenthalt.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="p-6 rounded-3xl bg-muted/40 border border-border/40 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">Adresse</span>
                <span className="text-foreground font-semibold md:text-lg">{penthouse1Data.address}</span>
              </div>
            </div>
            <Link href={penthouse1Data.mapUrl} target="_blank">
              <Button className="rounded-full h-12 px-6 flex gap-2">
                <Navigation className="h-4 w-4" />
                In Google Maps öffnen
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => scrollTo(instructionsRef)}
              className="group p-6 rounded-3xl bg-primary text-white text-left transition-transform active:scale-95"
            >
              <Key className="h-6 w-6 mb-4 opacity-80" />
              <span className="block font-bold mb-1">Check-in</span>
              <span className="text-white/70 text-xs">Anweisungen ansehen</span>
            </button>
            <button 
              onClick={() => scrollTo(infoRef)}
              className="group p-6 rounded-3xl bg-background border border-border/60 text-left transition-transform active:scale-95"
            >
              <HelpCircle className="h-6 w-6 mb-4 text-primary opacity-80" />
              <span className="block font-bold mb-1">Info</span>
              <span className="text-muted-foreground text-xs">WiFi, Parken &amp; mehr</span>
            </button>
          </div>
        </section>

        {/* --- Check-in Instructions --- */}
        <section ref={instructionsRef} className="space-y-8 scroll-mt-24">
          <div className="flex items-end justify-between border-b border-border/40 pb-6">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Check-in Anweisungen</h2>
              <p className="text-muted-foreground text-sm">Folgen Sie diesen Schritten, um Ihren Schlüssel zu erhalten.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tight">
              Anreise ab {penthouse1Data.checkInTime}
            </div>
          </div>

          <CheckInCarousel steps={penthouse1Data.steps} />

          <div className="space-y-4">
            {penthouse1Data.steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 p-4 rounded-2xl hover:bg-muted/30 transition-colors border border-transparent hover:border-border/40"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- General Information --- */}
        <section ref={infoRef} className="space-y-8 scroll-mt-24">
          <div className="border-b border-border/40 pb-6">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Wichtige Informationen</h2>
            <p className="text-muted-foreground text-sm">Alles Wissenswerte für Ihren Aufenthalt.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard 
              title="Highspeed WLAN" 
              icon={Wifi} 
              copyValue={penthouse1Data.wifi.password}
              copyLabel="Passwort kopieren"
            >
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs uppercase font-bold text-muted-foreground">Netzwerk</span>
                  <span className="text-foreground font-semibold">{penthouse1Data.wifi.ssid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs uppercase font-bold text-muted-foreground">Passwort</span>
                  <span className="text-foreground font-semibold">{penthouse1Data.wifi.password}</span>
                </div>
              </div>
            </InfoCard>

            <InfoCard title="Parkplatz" icon={Car}>
              <p className="text-sm">{penthouse1Data.parking}</p>
            </InfoCard>

            <InfoCard title="Hausregeln" icon={ShieldCheck}>
              <ul className="space-y-2">
                {penthouse1Data.houseRules.map((rule, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard title="Check-out & Zeiten" icon={Clock}>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-muted/30 p-2 rounded-lg">
                  <span className="text-xs font-bold uppercase text-muted-foreground">Check-in</span>
                  <span className="text-foreground font-bold">{penthouse1Data.checkInTime}</span>
                </div>
                <div className="flex justify-between items-center bg-muted/30 p-2 rounded-lg">
                  <span className="text-xs font-bold uppercase text-muted-foreground">Check-out</span>
                  <span className="text-foreground font-bold">{penthouse1Data.checkOutTime}</span>
                </div>
              </div>
            </InfoCard>
          </div>
        </section>

        {/* --- Check-out Checklist --- */}
        <section className="p-8 rounded-[2rem] bg-foreground text-background">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <LogOut className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold">Check-out Checkliste</h2>
              <p className="text-white/60 text-sm">Was vor der Abreise zu tun ist.</p>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            {penthouse1Data.checkOutChecklist.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-white/90 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-white/80 text-sm mb-4">
              Wir hoffen, Sie haben einen wundervollen Aufenthalt in Dresden!
            </p>
            <Link href="tel:+49123456789">
              <Button variant="outline" className="w-full rounded-full border-white/20 text-white hover:bg-white hover:text-foreground">
                <MessageCircle className="h-4 w-4 mr-2" />
                Support kontaktieren
              </Button>
            </Link>
          </div>
        </section>


      </main>
    </div>
  );
}
