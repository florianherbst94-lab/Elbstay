import { NextResponse } from "next/server"
import { syncProperties, syncReservations } from "@/lib/hospitable/sync"

export async function GET(req: Request) {
  // Verify cron secret if provided by Vercel
  const authHeader = req.headers.get('authorization')
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const propertyCount = await syncProperties()
    
    // Sync reservations for the next 30 days and the past 7 days (to catch modifications/cancellations)
    const dStart = new Date()
    dStart.setDate(dStart.getDate() - 7)
    
    const dEnd = new Date()
    dEnd.setDate(dEnd.getDate() + 30)

    // Hospitable API expects YYYY-MM-DD
    const formatDate = (date: Date) => date.toISOString().split('T')[0]

    const resCount = await syncReservations(formatDate(dStart), formatDate(dEnd))
    
    return NextResponse.json({ 
      success: true, 
      propertiesSynced: propertyCount,
      reservationsSynced: resCount,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error("Cron sync error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
