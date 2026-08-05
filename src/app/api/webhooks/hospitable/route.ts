import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const rawBody = await req.text()
    
    // Hash payload for idempotency
    const payloadHash = crypto.createHash("sha256").update(rawBody).digest("hex")
    
    // Quick check if we already processed this
    const existing = await prisma.webhookEvent.findFirst({
      where: { payloadHash, status: "PROCESSED" }
    })
    
    if (existing) {
      return NextResponse.json({ received: true, status: "already_processed" })
    }

    const payload = JSON.parse(rawBody)
    const action = payload.action
    const hospitableId = payload.data?.id || payload.property?.id || null

    // Record webhook event (pending)
    const event = await prisma.webhookEvent.create({
      data: {
        action: action || "unknown",
        hospitableId: hospitableId ? String(hospitableId) : null,
        payloadHash,
        status: "PENDING",
      }
    })

    // Background processing should technically be queued, but we can await it here if Vercel allows (or use edge functions/Next.js waitUntil)
    // For now we process synchronously. In a real app we'd use Next.js unstable_after or a message queue.
    try {
      if (action.startsWith('property.')) {
        // e.g. "property.created", "property.changed"
        // Simply trigger a property sync. Or parse payload directly.
        // Easiest is to parse payload directly.
        const prop = payload.data
        if (prop && prop.id) {
           await prisma.property.upsert({
            where: { hospitableId: prop.id },
            update: {
              name: prop.name,
              address: prop.address?.formatted_address || null,
              timezone: prop.timezone || "Europe/Berlin",
              status: prop.status === "active" ? "active" : "inactive",
            },
            create: {
              hospitableId: prop.id,
              name: prop.name,
              address: prop.address?.formatted_address || null,
              timezone: prop.timezone || "Europe/Berlin",
              status: prop.status === "active" ? "active" : "inactive",
            }
          })
        }
      } else if (action.startsWith('reservation.')) {
        const res = payload.data
        if (res && res.id && res.property_id) {
          const dbProperty = await prisma.property.findUnique({
            where: { hospitableId: res.property_id }
          })
          
          if (dbProperty) {
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
              },
              create: {
                hospitableId: res.id,
                propertyId: dbProperty.id,
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
              }
            })

            if (res.financials) {
              const fin = res.financials
              const toCents = (amount?: number) => amount ? Math.round(amount * 100) : 0
              const currency = fin.currency || "EUR"
              
              let payoutCent = toCents(fin.payout)
              let taxCent = toCents(fin.tax)
              
              const platformLower = res.platform?.toLowerCase() || ""
              if (platformLower === "booking" || platformLower === "booking.com") {
                const cityTax = Math.round(payoutCent * 0.06)
                payoutCent -= cityTax
                taxCent += cityTax
              }

              const isComplete = fin.payout !== null && fin.payout !== undefined

              await prisma.reservationFinancials.upsert({
                where: { reservationId: dbRes.id },
                update: {
                  accommodationCent: toCents(fin.accommodation),
                  cleaningFeeCent: toCents(fin.cleaning_fee),
                  otherGuestFeeCent: toCents(fin.other_guest_fee),
                  discountCent: toCents(fin.discount),
                  taxCent,
                  hostFeeCent: toCents(fin.host_fee),
                  payoutCent,
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
                  taxCent,
                  hostFeeCent: toCents(fin.host_fee),
                  payoutCent,
                  totalPaidByGuestCent: toCents(fin.total_paid_by_guest),
                  currency,
                  isComplete,
                }
              })
            }
          }
        }
      }

      await prisma.webhookEvent.update({
        where: { id: event.id },
        data: { status: "PROCESSED", processedAt: new Date() }
      })
    } catch (processError: any) {
      await prisma.webhookEvent.update({
        where: { id: event.id },
        data: { status: "FAILED", errorMessage: processError.message, attempts: 1 }
      })
      throw processError // Let the 500 happen so Hospitable retries if necessary
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
