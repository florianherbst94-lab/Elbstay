import { PrismaClient } from '../src/generated/prisma/client.js';
import { 
  checkExtrasAvailability, 
  lockExtra, 
  confirmExtra, 
  calculateCleaningWindow,
  ExtraType
} from '../src/lib/extras/extrasService.js'; // Using .js for ts-node / native node execution

const prisma = new PrismaClient();

async function run() {
  console.log('--- Setting up test data ---');
  // Clean up any previous test runs
  await prisma.property.deleteMany({ where: { hospitableId: 'TEST_PROP_123' } });

  const property = await prisma.property.create({
    data: {
      hospitableId: 'TEST_PROP_123',
      name: 'Test Property',
    }
  });

  const checkInDate1 = new Date('2026-11-01T00:00:00Z');
  const checkOutDate1 = new Date('2026-11-03T00:00:00Z');
  const checkOutDate2 = new Date('2026-11-05T00:00:00Z');
  const checkOutDate3 = new Date('2026-11-07T00:00:00Z');

  const resA = await prisma.reservation.create({
    data: {
      hospitableId: 'RES_A',
      propertyId: property.id,
      status: 'accepted',
      checkIn: checkInDate1,
      checkOut: checkOutDate1,
      nights: 2
    }
  });

  const resB = await prisma.reservation.create({
    data: {
      hospitableId: 'RES_B',
      propertyId: property.id,
      status: 'accepted',
      checkIn: checkOutDate1, // Back to back with ResA
      checkOut: checkOutDate2,
      nights: 2
    }
  });

  const resC = await prisma.reservation.create({
    data: {
      hospitableId: 'RES_C',
      propertyId: property.id,
      status: 'accepted',
      checkIn: checkOutDate2, // Back to back with ResB
      checkOut: checkOutDate3,
      nights: 2
    }
  });

  try {
    console.log('\n=== Testing Fall A: Gast A bucht Late Check-out, was den Early Check-in für Gast B blockiert ===');
    // Lock and confirm Late Check-out for ResA
    await lockExtra(resA.id, 'LATE_CHECKOUT');
    await confirmExtra(resA.id, 'LATE_CHECKOUT');

    const availB = await checkExtrasAvailability(resB.id);
    console.log('Availability for ResB after ResA booked Late Check-out:', availB);
    if (!availB.earlyCheckIn.available && availB.earlyCheckIn.status === 'UNAVAILABLE') {
      console.log('✅ Fall A passed: Early Check-in for ResB is unavailable.');
    } else {
      throw new Error('❌ Fall A failed!');
    }

    try {
      await lockExtra(resB.id, 'EARLY_CHECKIN');
      throw new Error('❌ Fall A failed: Should not be able to lock Early Check-in for ResB!');
    } catch (e: any) {
      console.log('✅ Fall A passed (Exception thrown):', e.message);
    }

    console.log('\n=== Testing Fall B: Gast B bucht Early Check-in, was den Late Check-out für Gast A blockieren würde ===');
    // Let's reset the extras for ResA
    await prisma.reservationExtra.deleteMany({ where: { reservationId: resA.id } });
    
    // Gast B buys Early Check-in
    await lockExtra(resB.id, 'EARLY_CHECKIN');
    await confirmExtra(resB.id, 'EARLY_CHECKIN');

    const availA = await checkExtrasAvailability(resA.id);
    console.log('Availability for ResA after ResB booked Early Check-in:', availA);
    if (!availA.lateCheckOut.available && availA.lateCheckOut.status === 'UNAVAILABLE') {
      console.log('✅ Fall B passed: Late Check-out for ResA is unavailable.');
    } else {
      throw new Error('❌ Fall B failed!');
    }


    console.log('\n=== Testing Fall C: Gast A bucht beide Extras ===');
    // Let's use ResC for this (which doesn't have next adjacent booked)
    // Res B checkOut = Res C checkIn. Let's make sure Res B has no late checkout.
    await prisma.reservationExtra.deleteMany({ where: { reservationId: resB.id } });
    
    // Gast C wants both.
    await lockExtra(resC.id, 'EARLY_CHECKIN');
    await lockExtra(resC.id, 'LATE_CHECKOUT');
    await confirmExtra(resC.id, 'EARLY_CHECKIN');
    await confirmExtra(resC.id, 'LATE_CHECKOUT');

    const availC = await checkExtrasAvailability(resC.id);
    console.log('Availability for ResC:', availC);
    if (availC.earlyCheckIn.status === 'CONFIRMED' && availC.lateCheckOut.status === 'CONFIRMED') {
      console.log('✅ Fall C passed: Both extras booked successfully.');
    } else {
      throw new Error('❌ Fall C failed!');
    }

    console.log('\n=== Testing Cleaning Window Calculation ===');
    // For ResA (no late checkout), next is ResB (has Early Check-in) -> should be 10:00 to 13:00
    // Wait, I deleted ResB early checkin in previous step. Let's add it back.
    await lockExtra(resB.id, 'EARLY_CHECKIN');
    await confirmExtra(resB.id, 'EARLY_CHECKIN');

    const cw1 = await calculateCleaningWindow(resA.id);
    console.log('Cleaning window after ResA (ResB has early checkin):', cw1);
    if (cw1.windowStart === '10:00' && cw1.windowEnd === '13:00' && cw1.durationHours === 3) {
      console.log('✅ Cleaning window correct (10:00 - 13:00).');
    } else {
      throw new Error('❌ Cleaning window incorrect!');
    }

    // Reset ResB, add Late Checkout to ResA, no Early Checkin for ResB
    await prisma.reservationExtra.deleteMany({ where: { reservationId: resB.id } });
    await lockExtra(resA.id, 'LATE_CHECKOUT');
    await confirmExtra(resA.id, 'LATE_CHECKOUT');

    const cw2 = await calculateCleaningWindow(resA.id);
    console.log('Cleaning window after ResA (ResA has late checkout):', cw2);
    if (cw2.windowStart === '12:00' && cw2.windowEnd === '15:00' && cw2.durationHours === 3) {
      console.log('✅ Cleaning window correct (12:00 - 15:00).');
    } else {
      throw new Error('❌ Cleaning window incorrect!');
    }

  } finally {
    console.log('\n--- Cleaning up test data ---');
    await prisma.property.delete({ where: { id: property.id } });
    await prisma.$disconnect();
  }
}

run().catch(console.error);
