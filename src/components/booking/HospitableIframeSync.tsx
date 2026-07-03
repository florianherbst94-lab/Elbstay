"use client";

import { useEffect } from "react";

export function HospitableIframeSync() {
  useEffect(() => {
    function getQueryParams(param: string) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      return urlSearchParams.get(param);
    }

    function updateIframeSrc() {
      const iframe = document.getElementById("booking-iframe") as HTMLIFrameElement;
      if (!iframe) return;

      const checkin = getQueryParams("checkin");
      const checkout = getQueryParams("checkout");
      const adults = getQueryParams("adults");
      const children = getQueryParams("children");
      const infants = getQueryParams("infants");
      const pets = getQueryParams("pets");
      
      // If we don't have checkin/checkout dates, don't do anything to the iframe
      if (!checkin || !checkout) return;

      let newSrc = iframe.src;
      
      // Clean up existing query params if they exist to avoid duplicates
      if (newSrc.includes("?")) {
        newSrc = newSrc.split("?")[0];
      }
      
      newSrc += "?";
      
      // Only append parameters that have values
      const params = new URLSearchParams();
      if (checkin) params.append("checkin", checkin);
      if (checkout) params.append("checkout", checkout);
      if (adults) params.append("adults", adults);
      if (children) params.append("children", children);
      if (infants) params.append("infants", infants);
      if (pets) params.append("pets", pets);
      
      // Hospitable expects the widget language to be 'de' for german? Let's try adding it just in case it works for the booking widget iframe
      params.append("lang", "de");
      params.append("locale", "de");

      iframe.src = newSrc + params.toString();
    }

    // Delay slightly to ensure iframe is mounted
    const timer = setTimeout(updateIframeSrc, 100);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
