import prisma from "@/lib/prisma"
import { HospitableClient } from "./client"

const client = new HospitableClient()

export async function syncProperties() {
  const properties = await client.getProperties()
  let count = 0
  
  for (const prop of properties) {
    await prisma.property.upsert({
      where: { hospitableId: prop.id },
      update: {
        name: prop.name,
        address: prop.address?.formatted_address || null,
        timezone: prop.timezone || "Europe/Berlin",
        status: prop.status === "active" ? "active" : "inactive",
        hospitableUpdatedAt: prop.updated_at ? new Date(prop.updated_at) : null,
      },
      create: {
        hospitableId: prop.id,
        name: prop.name,
        address: prop.address?.formatted_address || null,
        timezone: prop.timezone || "Europe/Berlin",
        status: prop.status === "active" ? "active" : "inactive",
        hospitableCreatedAt: prop.created_at ? new Date(prop.created_at) : null,
        hospitableUpdatedAt: prop.updated_at ? new Date(prop.updated_at) : null,
      }
    })
    count++
  }
  return count
}

export async function syncReservations(startDate?: string, endDate?: string) {
  const properties = await prisma.property.findMany()
  const propIdMap = new Map(properties.map(p => [p.hospitableId, p.id]))
  const hospitablePropertyIds = Array.from(propIdMap.keys())

  if (hospitablePropertyIds.length === 0) return 0

  const reservations = await client.getReservations({ 
    start_date: startDate, 
    end_date: endDate,
    property_ids: hospitablePropertyIds as any
  })

  let count = 0
  for (const res of reservations) {
    const dbPropertyId = propIdMap.get(res.property_id)
    if (!dbPropertyId) {
      console.warn(`Property ${res.property_id} not found in DB. Skipping reservation ${res.id}`)
      continue
    }

    const checkIn = new Date(res.check_in)
    const checkOut = new Date(res.check_out)
    const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

    const dbRes = await prisma.reservation.upsert({
      where: { hospitableId: res.id },
      update: {
        code: res.code,
        platform: res.platform,
        status: res.status,
        checkIn,
        checkOut,
        nights,
        adults: res.guests?.adults || 0,
        children: res.guests?.children || 0,
        totalGuests: res.guests?.total || 0,
        isCancelled: res.status === "cancelled",
        hospitableUpdatedAt: res.updated_at ? new Date(res.updated_at) : null,
      },
      create: {
        hospitableId: res.id,
        propertyId: dbPropertyId,
        code: res.code,
        platform: res.platform,
        status: res.status,
        bookedAt: res.booked_at ? new Date(res.booked_at) : null,
        checkIn,
        checkOut,
        nights,
        adults: res.guests?.adults || 0,
        children: res.guests?.children || 0,
        totalGuests: res.guests?.total || 0,
        isCancelled: res.status === "cancelled",
        hospitableCreatedAt: res.created_at ? new Date(res.created_at) : null,
        hospitableUpdatedAt: res.updated_at ? new Date(res.updated_at) : null,
      }
    })

    if (res.financials) {
      const fin = res.financials
      // Convert to cents
      const toCents = (amount?: number) => amount ? Math.round(amount * 100) : 0
      
      const currency = fin.currency || "EUR"
      const isComplete = fin.payout !== null && fin.payout !== undefined

      await prisma.reservationFinancials.upsert({
        where: { reservationId: dbRes.id },
        update: {
          accommodationCent: toCents(fin.accommodation),
          cleaningFeeCent: toCents(fin.cleaning_fee),
          otherGuestFeeCent: toCents(fin.other_guest_fee),
          discountCent: toCents(fin.discount),
          taxCent: toCents(fin.tax),
          hostFeeCent: toCents(fin.host_fee),
          payoutCent: toCents(fin.payout),
          totalPaidByGuestCent: toCents(fin.total_paid_by_guest),
          currency,
          isComplete,
        },
        create: {
          reservationId: dbRes.id,
          accommodationCent: toCents(fin.accommodation),
          cleaningFeeCent: toCents(fin.cleaning_fee),
          otherGuestFeeCent: toCents(fin.other_guest_fee),
          discountCent: toCents(fin.discount),
          taxCent: toCents(fin.tax),
          hostFeeCent: toCents(fin.host_fee),
          payoutCent: toCents(fin.payout),
          totalPaidByGuestCent: toCents(fin.total_paid_by_guest),
          currency,
          isComplete,
        }
      })
    }
    
    count++
  }
  
  return count
}
