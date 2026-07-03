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

      // Only update if we actually have query params from a search
      if (!checkin && !checkout && !adults) return;

      let newSrc = iframe.src;
      newSrc += newSrc.includes("?") ? "&" : "?";
      
      const params = new URLSearchParams();
      if (checkin) params.append("checkin", checkin);
      if (checkout) params.append("checkout", checkout);
      if (adults) params.append("adults", adults);
      if (children) params.append("children", children);
      if (infants) params.append("infants", infants);
      if (pets) params.append("pets", pets);

      iframe.src = newSrc + params.toString();
    }

    // Try to update immediately, but also wait a bit in case the iframe takes a moment to render
    updateIframeSrc();
    setTimeout(updateIframeSrc, 500);
  }, []);

  return null;
}
