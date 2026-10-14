import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { checkExtrasAvailability } from '@/lib/extras/extrasService';
import { ExtrasPortalClient } from './ExtrasPortalClient';

export default async function ExtrasPortalPage(
  props: { params: Promise<{ code: string }> }
) {
  const params = await props.params;
  const { code } = params;

  // Hospitable reservation codes often look like "HOSP-12345" or similar.
  // We search for it.
  const reservation = await prisma.reservation.findFirst({
    where: { 
      code: code,
      isCancelled: false
    },
    include: {
      property: true,
      extras: true
    }
  });

  if (!reservation) {
    notFound();
  }

  // Check current availability for this reservation
  const availability = await checkExtrasAvailability(reservation.id);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-900 px-6 py-8 text-white text-center">
          <h1 className="text-2xl font-bold tracking-tight">Dein Aufenthalt</h1>
          <p className="mt-2 text-gray-300">{reservation.property.name}</p>
        </div>

        {/* Stay Details */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <div>
              <p className="text-gray-500 font-medium uppercase tracking-wider">Check-in</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {reservation.checkIn.toLocaleDateString('de-DE')}
              </p>
              <p className="text-gray-600">ab 15:00 Uhr</p>
            </div>
            
            <div className="h-12 w-px bg-gray-200"></div>
            
            <div className="text-right">
              <p className="text-gray-500 font-medium uppercase tracking-wider">Check-out</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {reservation.checkOut.toLocaleDateString('de-DE')}
              </p>
              <p className="text-gray-600">bis 10:00 Uhr</p>
            </div>
          </div>
        </div>

        {/* Interactive Client Component */}
        <ExtrasPortalClient 
          reservationId={reservation.id}
          availability={availability}
        />
        
      </div>
    </div>
  );
}
