'use client';

import { useState } from 'react';

type Availability = {
  earlyCheckIn: { available: boolean; status: string; priceCent: number };
  lateCheckOut: { available: boolean; status: string; priceCent: number };
};

export function ExtrasPortalClient({ 
  reservationId, 
  availability 
}: { 
  reservationId: string, 
  availability: Availability 
}) {
  const [loadingExtra, setLoadingExtra] = useState<string | null>(null);

  const handleCheckout = async (extraType: 'EARLY_CHECKIN' | 'LATE_CHECKOUT') => {
    try {
      setLoadingExtra(extraType);
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservationId,
          extraType,
          returnUrl: window.location.href, // User returns here after payment
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        alert('Ein Fehler ist aufgetreten: ' + (data.error || 'Unbekannter Fehler'));
        setLoadingExtra(null);
      }
    } catch (error) {
      console.error(error);
      alert('Ein Fehler ist aufgetreten.');
      setLoadingExtra(null);
    }
  };

  const renderExtraCard = (
    title: string, 
    description: string, 
    type: 'EARLY_CHECKIN' | 'LATE_CHECKOUT',
    availData: { available: boolean; status: string; priceCent: number }
  ) => {
    
    let badge = null;
    let button = null;

    if (availData.status === 'CONFIRMED') {
      badge = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Bereits gebucht</span>;
    } else if (availData.status === 'PENDING') {
      badge = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Zahlung ausstehend</span>;
    } else if (!availData.available) {
      badge = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Nicht mehr verfügbar</span>;
    }

    if (availData.available && availData.status !== 'CONFIRMED' && availData.status !== 'PENDING') {
      button = (
        <button
          onClick={() => handleCheckout(type)}
          disabled={loadingExtra !== null}
          className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50"
        >
          {loadingExtra === type ? 'Wird geladen...' : `Für ${availData.priceCent / 100} € dazubuchen`}
        </button>
      );
    }

    return (
      <div className="p-4 border rounded-xl bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {badge}
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
        {button}
      </div>
    );
  };

  return (
    <div className="px-6 py-8 bg-gray-50/50">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Zusatzleistungen</h2>
      
      <div className="space-y-4">
        {renderExtraCard(
          'Early Check-in',
          'Checke bereits ab 13:00 Uhr ein, statt erst um 15:00 Uhr. Lehn dich früher zurück!',
          'EARLY_CHECKIN',
          availability.earlyCheckIn
        )}

        {renderExtraCard(
          'Late Check-out',
          'Lass dir Zeit am Abreisetag. Behalte das Apartment bis 12:00 Uhr statt 10:00 Uhr.',
          'LATE_CHECKOUT',
          availability.lateCheckOut
        )}
      </div>

      <p className="mt-6 text-xs text-center text-gray-400">
        Die Bezahlung erfolgt sicher über Stripe. Alle gängigen Zahlungsmittel (Apple Pay, Kreditkarte) werden unterstützt.
      </p>
    </div>
  );
}
