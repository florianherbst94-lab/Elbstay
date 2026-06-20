"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CheckInStep } from "@/lib/checkinData";

interface CheckInCarouselProps {
  steps: CheckInStep[];
}

export function CheckInCarousel({ steps }: CheckInCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const nextIndex = currentIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < steps.length) {
      setDirection(newDirection);
      setCurrentIndex(nextIndex);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, steps.length]);

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden bg-muted flex flex-col group shadow-xl">
      {/* Slides */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
          >
            <Image
              src={steps[currentIndex].imageUrl}
              alt={steps[currentIndex].title}
              fill
              className={`object-cover ${currentIndex === 2 ? "object-top" : "object-center"}`}
              priority
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
              <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-wider mb-4">
                {currentIndex + 1} / {steps.length}
              </span>
              <h3 className="text-xl md:text-2xl font-bold mb-2">{steps[currentIndex].title}</h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-xl font-medium">
                {steps[currentIndex].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 z-20">
        <button
          onClick={() => paginate(-1)}
          disabled={currentIndex === 0}
          className={`h-12 w-12 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 transition-all shadow-lg active:scale-90 ${
            currentIndex === 0 ? "opacity-20 cursor-not-allowed" : "hover:bg-black/60 cursor-pointer"
          }`}
          aria-label="Previous step"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => paginate(1)}
          disabled={currentIndex === steps.length - 1}
          className={`h-12 w-12 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 transition-all shadow-lg active:scale-90 ${
            currentIndex === steps.length - 1 ? "opacity-20 cursor-not-allowed" : "hover:bg-black/60 cursor-pointer"
          }`}
          aria-label="Next step"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute top-6 right-6 flex gap-1.5 z-10">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex ? "w-8 bg-primary" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
