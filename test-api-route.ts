import 'dotenv/config'
import prisma from './src/lib/prisma'
import { syncProperties, syncReservations } from './src/lib/hospitable/sync'

async function check() {
    console.log("Checking DB Connection...")
    try {
      const propertiesCount = await prisma.property.count()
      console.log("Properties in DB:", propertiesCount)
      
      const propsCount = await syncProperties()
      console.log("Synced Properties:", propsCount)

      const start = new Date()
      start.setFullYear(start.getFullYear() - 2)
      const end = new Date()
      end.setMonth(end.getMonth() + 18)
      
      const resCount = await syncReservations(
        start.toISOString().split('T')[0], 
        end.toISOString().split('T')[0]
      )
      console.log("Synced Reservations:", resCount)
      
    } catch(e) {
      console.log("Error:", e.message)
    }
}
check()
