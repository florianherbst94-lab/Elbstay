'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value, ...rest }: { action: string, category: string, label: string, value?: number, [key: string]: any }) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest
    });
  }
};

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      const url = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
      pageview(url);
    }
  }, [pathname, searchParams]);

  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              linker: {
                domains: ['booking.hospitable.com']
              }
            });
          `,
        }}
      />
    </>
  );
}

export function ViewItemTracker({ item }: { item: any }) {
  useEffect(() => {
    event({
      action: "view_item",
      category: "ecommerce",
      label: item.name,
      value: item.priceFrom,
      items: [{
        item_id: item.id,
        item_name: item.name,
        price: item.priceFrom,
        item_category: "Apartment"
      }]
    });
  }, [item]);
  
  return null;
}
