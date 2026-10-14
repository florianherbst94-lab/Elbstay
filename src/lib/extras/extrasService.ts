import prisma from '../prisma.js';

export type ExtraType = 'EARLY_CHECKIN' | 'LATE_CHECKOUT';

export async function checkExtrasAvailability(reservationId: string) {
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { extras: true },
  });

  if (!reservation) {
    throw new Error('Reservation not found');
  }

  // To handle slight time variations, we compare the start of the day
  // Since checkIn/checkOut are usually stored at midnight UTC, a direct comparison might work,
  // but let's be safe and check if the date parts match.
  // Using Prisma, finding the exact day in Postgres can be tricky, so let's get all 
  // overlapping or adjacent reservations for this property.
  const adjacentReservations = await prisma.reservation.findMany({
    where: {
      propertyId: reservation.propertyId,
      isCancelled: false,
      id: { not: reservation.id },
      OR: [
        { checkOut: reservation.checkIn },
        { checkIn: reservation.checkOut },
      ]
    },
    include: { extras: true },
  });

  const prevReservation = adjacentReservations.find(
    (r) => r.checkOut.getTime() === reservation.checkIn.getTime()
  );
  
  const nextReservation = adjacentReservations.find(
    (r) => r.checkIn.getTime() === reservation.checkOut.getTime()
  );

  const prevHasLateCheckout = prevReservation?.extras.some(
    (e) => e.extraType === 'LATE_CHECKOUT' && (e.status === 'CONFIRMED' || e.status === 'PENDING')
  );

  const nextHasEarlyCheckin = nextReservation?.extras.some(
    (e) => e.extraType === 'EARLY_CHECKIN' && (e.status === 'CONFIRMED' || e.status === 'PENDING')
  );

  const ourEarlyCheckin = reservation.extras.find(
    (e) => e.extraType === 'EARLY_CHECKIN' && (e.status === 'CONFIRMED' || e.status === 'PENDING')
  );
  
  const ourLateCheckout = reservation.extras.find(
    (e) => e.extraType === 'LATE_CHECKOUT' && (e.status === 'CONFIRMED' || e.status === 'PENDING')
  );

  return {
    earlyCheckIn: {
      available: !prevHasLateCheckout && !ourEarlyCheckin,
      status: ourEarlyCheckin ? ourEarlyCheckin.status : (prevHasLateCheckout ? 'UNAVAILABLE' : 'AVAILABLE'),
      priceCent: 5000,
    },
    lateCheckOut: {
      available: !nextHasEarlyCheckin && !ourLateCheckout,
      status: ourLateCheckout ? ourLateCheckout.status : (nextHasEarlyCheckin ? 'UNAVAILABLE' : 'AVAILABLE'),
      priceCent: 5000,
    },
  };
}

export async function lockExtra(reservationId: string, extraType: ExtraType) {
  // Using an interactive transaction to prevent race conditions
  return await prisma.$transaction(async (tx) => {
    // 1. Check availability
    const reservation = await tx.reservation.findUnique({
      where: { id: reservationId },
      include: { extras: true },
    });

    if (!reservation) throw new Error('Reservation not found');

    const adjacentReservations = await tx.reservation.findMany({
      where: {
        propertyId: reservation.propertyId,
        isCancelled: false,
        id: { not: reservation.id },
        OR: [
          { checkOut: reservation.checkIn },
          { checkIn: reservation.checkOut },
        ]
      },
      include: { extras: true },
    });

    if (extraType === 'EARLY_CHECKIN') {
      const prevRes = adjacentReservations.find(r => r.checkOut.getTime() === reservation.checkIn.getTime());
      const hasConflict = prevRes?.extras.some(e => e.extraType === 'LATE_CHECKOUT' && (e.status === 'CONFIRMED' || e.status === 'PENDING'));
      if (hasConflict) throw new Error('Early Check-in is no longer available due to a conflict with the previous reservation.');
    }

    if (extraType === 'LATE_CHECKOUT') {
      const nextRes = adjacentReservations.find(r => r.checkIn.getTime() === reservation.checkOut.getTime());
      const hasConflict = nextRes?.extras.some(e => e.extraType === 'EARLY_CHECKIN' && (e.status === 'CONFIRMED' || e.status === 'PENDING'));
      if (hasConflict) throw new Error('Late Check-out is no longer available due to a conflict with the next reservation.');
    }

    const existingExtra = reservation.extras.find(e => e.extraType === extraType);
    if (existingExtra && (existingExtra.status === 'CONFIRMED' || existingExtra.status === 'PENDING')) {
      throw new Error(`Extra ${extraType} is already booked or pending.`);
    }

    // Lock the extra
    const lockedExtra = await tx.reservationExtra.upsert({
      where: {
        reservationId_extraType: {
          reservationId,
          extraType,
        }
      },
      update: {
        status: 'PENDING',
        lockedAt: new Date(),
        priceCent: 5000,
      },
      create: {
        reservationId,
        extraType,
        status: 'PENDING',
        lockedAt: new Date(),
        priceCent: 5000,
      }
    });

    return lockedExtra;
  });
}

export async function confirmExtra(reservationId: string, extraType: ExtraType) {
  return await prisma.reservationExtra.update({
    where: {
      reservationId_extraType: { reservationId, extraType }
    },
    data: {
      status: 'CONFIRMED',
      lockedAt: null,
    }
  });
}

export async function calculateCleaningWindow(reservationId: string) {
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { extras: true }
  });

  if (!reservation) throw new Error('Reservation not found');

  const ourLateCheckout = reservation.extras.some(e => e.extraType === 'LATE_CHECKOUT' && e.status === 'CONFIRMED');

  const nextReservation = await prisma.reservation.findFirst({
    where: {
      propertyId: reservation.propertyId,
      checkIn: reservation.checkOut,
      isCancelled: false,
    },
    include: { extras: true }
  });

  const nextEarlyCheckin = nextReservation?.extras.some(e => e.extraType === 'EARLY_CHECKIN' && e.status === 'CONFIRMED');

  // Default window is 10:00 to 15:00
  let windowStartHour = 10;
  let windowEndHour = 15;

  if (ourLateCheckout) windowStartHour = 12;
  if (nextEarlyCheckin) windowEndHour = 13;

  return {
    date: reservation.checkOut,
    windowStart: `${windowStartHour}:00`,
    windowEnd: `${windowEndHour}:00`,
    durationHours: windowEndHour - windowStartHour
  };
}
