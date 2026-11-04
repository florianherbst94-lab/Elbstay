"use client";

import { useEffect, useRef } from "react";

interface HospitableWidgetProps {
  propertyId: string;
}

export function HospitableWidget({ propertyId }: HospitableWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget if any to prevent duplicates during HMR or fast refresh
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://cdn.hsptb.com/direct-booking-widget/widget-loader.prod.js";
    script.setAttribute("data-site-uuid", "a20a137a-0c7e-42ba-8aa6-9c47accca90f");
    script.setAttribute("data-property-id", propertyId);
    script.setAttribute("data-theme", "boutique");
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      // Cleanup widget on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [propertyId]);

  return <div id="hospitable-widget-container" ref={containerRef} className="hospitable-widget" />;
}
