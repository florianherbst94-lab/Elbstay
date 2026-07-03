"use client";
import React, { useState } from "react";
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

  // 1 main image + 4 small ones
  const desktopImages = images.slice(0, 5);

  return (
    <section className="mb-8 lg:mb-12">
      {/* GLOBAL SLIDESHOW (Mobile & Desktop) */}
      <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden group">
        <img 
          src={images[currentIndex]} 
          alt={`Gallery Image ${currentIndex + 1}`} 
          className="w-full h-full object-cover transition-transform duration-500" 
        />
        
        {/* Navigation Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm z-10 flex items-center gap-1.5 cursor-pointer hover:bg-black/80 transition-colors" onClick={scrollToGallery}>
          <LayoutGrid className="w-4 h-4" />
          {currentIndex + 1} / {images.length}
        </div>
        
        {/* Slide Controls */}
        <button 
          onClick={prevSlide} 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 text-black rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10 hover:bg-white hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 text-black rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10 hover:bg-white hover:scale-105"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
