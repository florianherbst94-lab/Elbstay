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
        address: prop.address?.display || prop.address?.formatted_address || null,
        timezone: prop.timezone || "Europe/Berlin",
        status: prop.listed ? "active" : "inactive",
        hospitableUpdatedAt: new Date(),
      },
      create: {
        hospitableId: prop.id,
        name: prop.name,
        address: prop.address?.display || prop.address?.formatted_address || null,
        timezone: prop.timezone || "Europe/Berlin",
        status: prop.listed ? "active" : "inactive",
        hospitableCreatedAt: new Date(),
        hospitableUpdatedAt: new Date(),
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

  let count = 0

  for (const propertyId of hospitablePropertyIds) {
    const dbPropertyId = propIdMap.get(propertyId)
    if (!dbPropertyId) continue

    const reservations = await client.getReservations({ 
      start_date: startDate, 
      end_date: endDate,
      property_ids: [propertyId] as any
    })

    for (const res of reservations) {
      const checkIn = new Date(res.check_in)
      const checkOut = new Date(res.check_out)
      const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

      const dbRes = await prisma.reservation.upsert({
        where: { hospitableId: res.id },
        update: {
          code: res.code,
          platform: res.platform,
          status: res.reservation_status?.current?.category || res.status,
          checkIn,
          checkOut,
          nights,
          adults: res.guests?.adult_count || 0,
          children: (res.guests?.child_count || 0) + (res.guests?.infant_count || 0),
          totalGuests: res.guests?.total || 0,
          isCancelled: res.reservation_status?.current?.category === "cancelled" || res.status === "cancelled",
          hospitableUpdatedAt: res.updated_at ? new Date(res.updated_at) : null,
        },
        create: {
          hospitableId: res.id,
          propertyId: dbPropertyId,
          code: res.code,
          platform: res.platform,
          status: res.reservation_status?.current?.category || res.status,
          bookedAt: res.booking_date ? new Date(res.booking_date) : null,
          checkIn,
          checkOut,
          nights,
          adults: res.guests?.adult_count || 0,
          children: (res.guests?.child_count || 0) + (res.guests?.infant_count || 0),
          totalGuests: res.guests?.total || 0,
          isCancelled: res.reservation_status?.current?.category === "cancelled" || res.status === "cancelled",
          hospitableCreatedAt: res.created_at ? new Date(res.created_at) : null,
          hospitableUpdatedAt: res.updated_at ? new Date(res.updated_at) : null,
        }
      })

    if (res.financials) {
      const fin = res.financials
      // The API returns amounts in cents already!
      const getAmount = (obj: any) => obj?.amount || 0
      
      const currency = fin.currency || "EUR"
      // Guest totals
      const accommodation = getAmount(fin.guest?.accommodation)
      const cleaningFee = fin.guest?.fees?.find((f:any) => f.category === "Guest fees")?.amount || 0
      const tax = fin.guest?.taxes?.reduce((sum:number, t:any) => sum + (t.amount || 0), 0) || 0
      const totalPaidByGuest = getAmount(fin.guest?.total_price)
      
      const hostFee = fin.host?.host_fees?.reduce((sum:number, f:any) => sum + (f.amount || 0), 0) || 0
      let payout = getAmount(fin.host?.revenue)
      let calculatedTax = fin.guest?.taxes?.reduce((sum:number, t:any) => sum + (t.amount || 0), 0) || 0
      
      // Deduct 6% city tax for Booking.com (not automatically deducted by platform)
      const platformLower = res.platform?.toLowerCase() || ""
      if (platformLower === "booking" || platformLower === "booking.com") {
        const cityTax = Math.round(payout * 0.06)
        payout -= cityTax
        calculatedTax += cityTax
      }

      const isComplete = payout !== 0

      await prisma.reservationFinancials.upsert({
        where: { reservationId: dbRes.id },
        update: {
          accommodationCent: accommodation,
          cleaningFeeCent: cleaningFee,
          otherGuestFeeCent: 0,
          discountCent: 0,
          taxCent: calculatedTax,
          hostFeeCent: hostFee,
          payoutCent: payout,
          totalPaidByGuestCent: totalPaidByGuest,
          currency,
          isComplete,
        },
        create: {
          reservationId: dbRes.id,
          accommodationCent: accommodation,
          cleaningFeeCent: cleaningFee,
          otherGuestFeeCent: 0,
          discountCent: 0,
          taxCent: calculatedTax,
          hostFeeCent: hostFee,
          payoutCent: payout,
          totalPaidByGuestCent: totalPaidByGuest,
          currency,
          isComplete,
        }
      })
    }
    
    count++
    }
  }
  
  // Update platforms based on reservations
  for (const propertyId of hospitablePropertyIds) {
    const dbPropertyId = propIdMap.get(propertyId)
    if (!dbPropertyId) continue
    
    const distinctPlatforms = await prisma.reservation.findMany({
      where: { propertyId: dbPropertyId },
      select: { platform: true },
      distinct: ['platform']
    })
    
    const platforms = distinctPlatforms
      .map(p => p.platform)
      .filter(Boolean)
      .map(p => {
        const lower = p!.toLowerCase()
        if (lower === 'airbnb') return 'Airbnb'
        if (lower === 'booking' || lower === 'booking.com') return 'Booking.com'
        if (lower === 'direct') return 'Direct'
        if (lower === 'vrbo') return 'Vrbo'
        return p!.charAt(0).toUpperCase() + p!.slice(1)
      })
      .join(', ')
      
    if (platforms) {
      await prisma.property.update({
        where: { id: dbPropertyId },
        data: { platforms }
      })
    }
  }
  
  return count
}
