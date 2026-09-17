"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

interface HeaderGalleryProps {
  images: string[];
}

export function ApartmentHeaderGallery({ images }: HeaderGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const scrollToGallery = () => {
    document.getElementById('full-gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  const desktopImages = images.slice(0, 5);

  return (
    <section className="mb-8 lg:mb-12">
      {/* MOBILE SLIDESHOW */}
      <div className="md:hidden relative w-full h-[400px] rounded-2xl overflow-hidden group">
        <Image 
          src={images[currentIndex]} 
          alt={`Galerie Bild ${currentIndex + 1}`} 
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500" 
        />
        
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm z-10 flex items-center gap-1.5">
          <LayoutGrid className="w-4 h-4" />
          {currentIndex + 1} / {images.length}
        </div>
        
        <button 
          onClick={prevSlide} 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 text-black rounded-full backdrop-blur-sm opacity-100 transition shadow-lg z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 text-black rounded-full backdrop-blur-sm opacity-100 transition shadow-lg z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* DESKTOP 5-IMAGE GRID */}
      <div className="hidden md:grid grid-cols-2 gap-2 h-[450px] lg:h-[600px] rounded-3xl overflow-hidden group">
        <div className="relative overflow-hidden cursor-pointer h-full" onClick={scrollToGallery}>
          {desktopImages[0] && (
            <Image 
              src={desktopImages[0]} 
              alt="Hauptansicht der Ferienwohnung" 
              fill
              priority
              sizes="50vw"
              className="object-cover hover:scale-105 transition-transform duration-700 hover:brightness-110" 
            />
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 h-full relative">
          {desktopImages.slice(1, 5).map((img, idx) => (
            <div key={idx} className="relative overflow-hidden cursor-pointer h-full" onClick={scrollToGallery}>
              <Image 
                src={img} 
                alt={`Detailansicht ${idx + 2} der Unterkunft`} 
                fill
                sizes="25vw"
                className="object-cover hover:scale-105 transition-transform duration-700 hover:brightness-110" 
              />
            </div>
          ))}
          
          <button 
            onClick={scrollToGallery}
            className="absolute bottom-6 right-6 bg-background/95 backdrop-blur-md text-foreground px-5 py-2.5 rounded-lg font-semibold border-border border shadow-xl hover:bg-muted transition flex items-center gap-2 z-10 hover:scale-105 active:scale-95"
          >
            <LayoutGrid className="w-5 h-5" />
            Alle Fotos anzeigen
          </button>
        </div>
      </div>
    </section>
  );
}
