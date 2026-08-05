import { NextResponse } from "next/server"
import { syncReservations } from "@/lib/hospitable/sync"

export async function GET(req: Request) {
  try {
    const dStart = new Date()
    dStart.setMonth(dStart.getMonth() - 6) // past 6 months
    const formatDate = (date: Date) => date.toISOString().split('T')[0]
    const count = await syncReservations(formatDate(dStart))
    
    return NextResponse.json({ 
      success: true, 
      synced: count,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
