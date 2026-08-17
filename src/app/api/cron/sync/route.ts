import { NextResponse } from "next/server"
import { syncProperties, syncReservations } from "@/lib/hospitable/sync"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  // Verify cron request (Vercel Cron sends x-vercel-cron header or Bearer token if CRON_SECRET is set)
  const authHeader = req.headers.get('authorization')
  const isVercelCron = req.headers.get('x-vercel-cron') === '1'
  
  if (process.env.CRON_SECRET && !isVercelCron && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let syncRun
  try {
    syncRun = await prisma.syncRun.create({
      data: { type: "DAILY", status: "PENDING" }
    })

    const propertyCount = await syncProperties()
    
    // Sync reservations for the last 1 year and future 1.5 years
    const dStart = new Date()
    dStart.setFullYear(dStart.getFullYear() - 1)
    
    const dEnd = new Date()
    dEnd.setMonth(dEnd.getMonth() + 18)

    // Hospitable API expects YYYY-MM-DD
    const formatDate = (date: Date) => date.toISOString().split('T')[0]

    const resCount = await syncReservations(formatDate(dStart), formatDate(dEnd))

    await prisma.syncRun.update({
      where: { id: syncRun.id },
      data: {
        status: "SUCCESS",
        completedAt: new Date(),
        propertiesCount: propertyCount,
        reservationsCount: resCount,
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      propertiesSynced: propertyCount,
      reservationsSynced: resCount,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error("Cron sync error:", error)
    if (syncRun?.id) {
      await prisma.syncRun.update({
        where: { id: syncRun.id },
        data: {
          status: "FAILED",
          completedAt: new Date(),
          errorMessage: error.message || String(error)
        }
      }).catch(() => {})
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
