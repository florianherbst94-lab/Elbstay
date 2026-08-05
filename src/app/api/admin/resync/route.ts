import { NextResponse } from "next/server"
import { syncReservations } from "@/lib/hospitable/sync"

export async function GET(req: Request) {
  try {
    const dStart = new Date()
    dStart.setMonth(dStart.getMonth() - 6) // past 6 months
    
    const count = await syncReservations(dStart.toISOString())
    
    return NextResponse.json({ 
      success: true, 
      synced: count,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
