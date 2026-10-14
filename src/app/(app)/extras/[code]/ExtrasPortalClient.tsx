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
  const [loading, setLoading] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<('EARLY_CHECKIN' | 'LATE_CHECKOUT')[]>([]);

  const toggleExtra = (type: 'EARLY_CHECKIN' | 'LATE_CHECKOUT') => {
    setSelectedExtras(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleCheckout = async () => {
    if (selectedExtras.length === 0) return;
    
    try {
      setLoading(true);
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservationId,
          extraTypes: selectedExtras,
          returnUrl: window.location.href,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Ein Fehler ist aufgetreten: ' + (data.error || 'Unbekannter Fehler'));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('Ein Fehler ist aufgetreten.');
      setLoading(false);
    }
  };

  const renderExtraCard = (
    title: string, 
    description: string, 
    type: 'EARLY_CHECKIN' | 'LATE_CHECKOUT',
    availData: { available: boolean; status: string; priceCent: number }
  ) => {
    let badge = null;
    let isSelectable = false;

    if (availData.status === 'CONFIRMED') {
      badge = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Bereits gebucht</span>;
    } else if (availData.status === 'PENDING') {
      badge = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Zahlung ausstehend</span>;
    } else if (!availData.available) {
      badge = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Nicht mehr verfügbar</span>;
    } else {
      isSelectable = true;
    }

    const isSelected = selectedExtras.includes(type);

    return (
      <div 
        className={`p-4 border rounded-xl bg-white shadow-sm flex flex-col justify-between transition-colors ${isSelectable ? 'cursor-pointer hover:border-gray-400' : 'opacity-75'} ${isSelected ? 'border-gray-900 ring-1 ring-gray-900' : ''}`}
        onClick={() => isSelectable && toggleExtra(type)}
      >
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              {isSelectable && (
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-gray-900 border-gray-900' : 'border-gray-300'}`}>
                  {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
              )}
              <h3 className="font-semibold text-gray-900">{title}</h3>
            </div>
            {badge || <span className="font-medium">{availData.priceCent / 100} €</span>}
          </div>
          <p className={`text-sm text-gray-500 leading-relaxed ${isSelectable ? 'ml-8' : ''}`}>{description}</p>
        </div>
      </div>
    );
  };

  const totalPrice = selectedExtras.reduce((sum, type) => {
    if (type === 'EARLY_CHECKIN') return sum + availability.earlyCheckIn.priceCent;
    if (type === 'LATE_CHECKOUT') return sum + availability.lateCheckOut.priceCent;
    return sum;
  }, 0);

  return (
    <div className="px-6 py-8 bg-gray-50/50 flex flex-col h-full">
      <div>
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
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleCheckout}
          disabled={loading || selectedExtras.length === 0}
          className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Wird geladen...' : selectedExtras.length > 0 ? `Für ${totalPrice / 100} € zahlungspflichtig buchen` : 'Bitte etwas auswählen'}
        </button>
        <p className="mt-4 text-xs text-center text-gray-400">
          Die Bezahlung erfolgt sicher über Stripe. Alle gängigen Zahlungsmittel (Apple Pay, Kreditkarte) werden unterstützt.
        </p>
      </div>
    </div>
  );
}
