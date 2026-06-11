"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Wifi, Key, Car, MapPin, CheckCircle2, Clock, 
  LogOut, ShieldCheck, HelpCircle, 
  Sparkles, Navigation, MessageCircle
} from "lucide-react";
import { penthouse1Data } from "@/lib/checkinData";
import { t, type Lang } from "@/lib/penthouse1Translations";
import { CheckInCarousel } from "@/components/checkin/CheckInCarousel";
import { InfoCard } from "@/components/checkin/InfoCard";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Penthouse1CheckIn() {
  const [lang, setLang] = useState<Lang>("de");
  const tx = t[lang];

  const instructionsRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Build translated steps for carousel
  const translatedSteps = penthouse1Data.steps.map((step, i) => ({
    ...step,
    title: tx.steps[i]?.title ?? step.title,
    description: tx.steps[i]?.description ?? step.description,
  }));

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

          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollTo(instructionsRef)}
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors hidden sm:block"
            >
              {tx.navCheckin}
            </button>
            <button 
              onClick={() => scrollTo(infoRef)}
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors hidden sm:block"
            >
              {tx.navInfo}
            </button>
            <button 
              onClick={() => scrollTo(contactRef)}
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors hidden sm:block"
            >
              {tx.navContact}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-muted/60 rounded-full p-1 border border-border/40">
              <button
                onClick={() => setLang("de")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  lang === "de"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Deutsch"
              >
                <span className="text-base leading-none">🇩🇪</span>
                <span className="hidden sm:inline">DE</span>
              </button>
              <button
                onClick={() => setLang("en")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  lang === "en"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="English"
              >
                <span className="text-base leading-none">🇬🇧</span>
                <span className="hidden sm:inline">EN</span>
              </button>
            </div>
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
              src="/images/checkin/penthouse-interior.jpg"
              alt="Penthouse 1 Innenansicht"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest mb-4 w-fit">
                <Sparkles className="h-3 w-3" />
                {tx.welcome}
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-[1.1]">
                {tx.heroTitle} <br />
                <span className="text-primary-foreground font-sans">{tx.heroSubtitle}</span>
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
              {tx.heroDesc}
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
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">{tx.address}</span>
                <span className="text-foreground font-semibold md:text-lg">{penthouse1Data.address}</span>
              </div>
            </div>
            <Link href={penthouse1Data.mapUrl} target="_blank">
              <Button className="rounded-full h-12 px-6 flex gap-2">
                <Navigation className="h-4 w-4" />
                {tx.openMaps}
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => scrollTo(instructionsRef)}
              className="group p-6 rounded-3xl bg-primary text-white text-left transition-transform active:scale-95"
            >
              <Key className="h-6 w-6 mb-4 opacity-80" />
              <span className="block font-bold mb-1">{tx.checkinLabel}</span>
              <span className="text-white/70 text-xs">{tx.checkinSub}</span>
            </button>
            <button 
              onClick={() => scrollTo(infoRef)}
              className="group p-6 rounded-3xl bg-background border border-border/60 text-left transition-transform active:scale-95"
            >
              <HelpCircle className="h-6 w-6 mb-4 text-primary opacity-80" />
              <span className="block font-bold mb-1">{tx.infoLabel}</span>
              <span className="text-muted-foreground text-xs">{tx.infoSub}</span>
            </button>
          </div>
        </section>

        {/* --- Check-in Instructions --- */}
        <section ref={instructionsRef} className="space-y-8 scroll-mt-24">
          <div className="flex items-end justify-between border-b border-border/40 pb-6">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">{tx.checkinTitle}</h2>
              <p className="text-muted-foreground text-sm">{tx.checkinDesc}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tight">
              {tx.arrivalFrom} {penthouse1Data.checkInTime}
            </div>
          </div>

          <CheckInCarousel steps={translatedSteps} />

          <div className="space-y-4">
            {translatedSteps.map((step, idx) => (
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
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">{tx.infoTitle}</h2>
            <p className="text-muted-foreground text-sm">{tx.infoDesc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard 
              title={tx.wifi} 
              icon={Wifi} 
              copyValue={penthouse1Data.wifi.password}
              copyLabel={tx.wifiCopy}
            >
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs uppercase font-bold text-muted-foreground">{tx.wifiNetwork}</span>
                  <span className="text-foreground font-semibold">{penthouse1Data.wifi.ssid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs uppercase font-bold text-muted-foreground">{tx.wifiPassword}</span>
                  <span className="text-foreground font-semibold">{penthouse1Data.wifi.password}</span>
                </div>
              </div>
            </InfoCard>

            <InfoCard title={tx.parking} icon={Car}>
              <p className="text-sm">{tx.parkingDesc}</p>
            </InfoCard>

            <InfoCard title={tx.houseRules} icon={ShieldCheck}>
              <ul className="space-y-2">
                {tx.houseRulesList.map((rule, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard title={tx.times} icon={Clock}>
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

        {/* --- Support / Host Section --- */}
        <section ref={contactRef} className="p-8 rounded-[2rem] bg-foreground text-background scroll-mt-24">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-3xl overflow-hidden shrink-0 shadow-lg border-2 border-white/10">
              <Image 
                src="/images/checkin/host-magdalena.jpg"
                alt={penthouse1Data.host.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-1">{penthouse1Data.host.name}</h2>
                <p className="text-white/60 font-medium">{tx.hostRole}</p>
              </div>
              <p className="text-white/80 text-sm leading-relaxed max-w-md">
                {tx.hostDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <Link href={`tel:${penthouse1Data.host.phone}`}>
              <Button className="w-full rounded-full h-14 bg-white text-foreground hover:bg-white/90 gap-2 font-bold transform active:scale-95 transition-all">
                <MessageCircle className="h-5 w-5" />
                {tx.callHost}
              </Button>
            </Link>
            <Link 
              href={`https://wa.me/${penthouse1Data.host.phone.replace(/\+/g, "")}?text=${encodeURIComponent(tx.whatsappMessage)}`}
              target="_blank"
            >
              <Button variant="outline" className="w-full rounded-full h-14 border-white/20 text-white hover:bg-white/10 gap-2 font-bold transform active:scale-95 transition-all">
                <MessageCircle className="h-5 w-5" />
                {tx.whatsapp}
              </Button>
            </Link>
          </div>
        </section>

        {/* --- Check-out Checklist --- */}
        <section className="p-8 rounded-[2rem] bg-background border border-border/40 text-foreground">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <LogOut className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold">{tx.checkoutTitle}</h2>
              <p className="text-muted-foreground text-sm">{tx.checkoutDesc}</p>
            </div>
          </div>

          <div className="space-y-4">
            {tx.checkoutList.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-foreground text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
