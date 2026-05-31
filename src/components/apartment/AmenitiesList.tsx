"use client";
import React, { useState } from "react";
import { AmenityCategory } from "@/lib/amenities";
import { Button } from "@/components/ui/Button";
import * as LucideIcons from "lucide-react";

interface TopFeature {
  icon: string;
  text: string;
}

export function AmenitiesList({ 
  amenities, 
  topFeatures 
}: { 
  amenities: AmenityCategory[]; 
  topFeatures: TopFeature[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!amenities || amenities.length === 0) return null;

  const totalAmenitiesCount = amenities.reduce((acc, cat) => acc + cat.items.length, 0);

  const renderIcon = (iconName: string, size = 24) => {
    // @ts-expect-error dynamic lucide icons
    const IconComponent = LucideIcons[iconName];
    if (IconComponent) {
      return <IconComponent size={size} strokeWidth={1.5} className="text-foreground" />;
    }
    return null;
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-semibold text-foreground mb-8 font-serif">Das bietet dir diese Unterkunft</h2>
      
      {!isExpanded ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-7 gap-x-12 mb-10">
            {topFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-center text-foreground font-medium text-[16px]">
                <div className="w-10 flex justify-center mr-4">
                  {renderIcon(feature.icon, 28)}
                </div>
                {feature.text}
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto font-semibold border-border border-2 text-foreground font-sans px-8"
            onClick={() => setIsExpanded(true)}
          >
            Alle {totalAmenitiesCount} Ausstattungsmerkmale anzeigen
          </Button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
            {amenities.map((category, idx) => (
              category.items.length > 0 && (
                <div key={idx} className="flex flex-col">
                  <h3 className="text-xl font-medium flex items-center gap-3 mb-5 text-foreground border-b border-border/40 pb-3">
                    <div className="w-8 flex justify-center">
                      {renderIcon(category.icon, 22)}
                    </div>
                    {category.title}
                  </h3>
                  <ul className="space-y-3 text-muted-foreground text-[15px]">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-3 mt-2 block w-1.5 h-1.5 rounded-sm bg-border shrink-0"></span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
          <Button 
            variant="outline" 
            size="lg" 
            className="mt-12 w-full sm:w-auto font-semibold border-border border-2 text-foreground font-sans px-8"
            onClick={() => setIsExpanded(false)}
          >
            Weniger anzeigen
          </Button>
        </div>
      )}
    </section>
  );
}
