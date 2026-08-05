import 'dotenv/config'
import prisma from './src/lib/prisma'
import { splitReservationNightsByMonth } from './src/lib/revenue/calculations'

async function check() {
  const res = await prisma.reservation.findFirst({
    where: { 
      isCancelled: false,
      checkIn: { lt: new Date('2024-08-01') },
      checkOut: { gt: new Date('2024-08-01') }
    },
    include: { financials: true }
  })
  
  if (res) {
    console.log("Check In:", res.checkIn)
    console.log("Check Out:", res.checkOut)
    console.log("Payout:", res.financials?.payoutCent)
    const split = splitReservationNightsByMonth(res.checkIn, res.checkOut)
    console.log("Split nights:", split)
  } else {
    console.log("No overlapping booking found.")
  }
}
check()
