"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Percent } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DirectBookingBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only show the banner if we are NOT on the search/booking page
    // and wait a few seconds before showing it so it's not too aggressive
    if (pathname === "/search") {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      // Check if user previously closed the banner in this session
      const hasClosed = sessionStorage.getItem("directBookingBannerClosed");
      if (!hasClosed) {
        setIsVisible(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("directBookingBannerClosed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100%-3rem)]"
        >
          <div className="bg-foreground text-background rounded-2xl shadow-2xl p-5 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 text-background/50 hover:text-background transition-colors p-1"
              aria-label="Schließen"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4 items-start relative z-10">
              <div className="bg-primary/20 p-2.5 rounded-full shrink-0">
                <Percent className="w-5 h-5 text-primary" />
              </div>
              <div className="pr-4">
                <h4 className="font-semibold text-lg mb-1 leading-tight">Direkt buchen & sparen</h4>
                <p className="text-sm text-background/80 mb-4 leading-relaxed">
                  Sparen Sie die hohen Gebühren von Airbnb und Booking.com. Auf unserer Website buchen Sie garantiert zum besten Preis.
                </p>
                <Link 
                  href="/search"
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full"
                  onClick={() => setIsVisible(false)}
                >
                  Jetzt Verfügbarkeit prüfen
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
