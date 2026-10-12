"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { randomBytes } from "crypto"

export async function addPrivateBooking(formData: FormData) {
  const propertyId = formData.get("propertyId") as string
  const guestName = formData.get("guestName") as string
  const checkInStr = formData.get("checkIn") as string
  const checkOutStr = formData.get("checkOut") as string
  const amountStr = (formData.get("amount") as string).replace(",", ".")
  const amountEuro = parseFloat(amountStr)

  if (!propertyId || !guestName || !checkInStr || !checkOutStr || isNaN(amountEuro)) {
    throw new Error("Bitte fülle alle erforderlichen Felder korrekt aus.")
  }

  const checkIn = new Date(checkInStr)
  const checkOut = new Date(checkOutStr)
  
  if (checkOut <= checkIn) {
    throw new Error("Das Check-out Datum muss nach dem Check-in Datum liegen.")
  }

  const amountCent = Math.round(amountEuro * 100)
  const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

  // Generate a unique ID for Hospitable ID mock
  const uniqueId = `manual_${randomBytes(8).toString("hex")}`

  await prisma.reservation.create({
    data: {
      hospitableId: uniqueId,
      code: `PRIVAT-${Math.floor(Math.random() * 10000)}`,
      propertyId,
      platform: "Privat",
      status: "accepted",
      bookedAt: new Date(),
      checkIn,
      checkOut,
      nights,
      guestName, // We added this to prisma
      adults: 1,
      totalGuests: 1,
      isCancelled: false,
      financials: {
        create: {
          accommodationCent: amountCent,
          payoutCent: amountCent,
          totalPaidByGuestCent: amountCent,
          currency: "EUR"
        }
      }
    }
  })

  revalidatePath("/admin/revenue")
  revalidatePath(`/admin/revenue/properties/${propertyId}`)
  revalidatePath("/admin/revenue/bookings")
}
