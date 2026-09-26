import dotenv from 'dotenv'
import fs from 'fs'
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' })
} else {
  dotenv.config({ path: '.env' })
}
import { syncProperties, syncReservations } from './src/lib/hospitable/sync'

async function run() {
  console.log("Syncing properties...")
  const props = await syncProperties()
  console.log(`Synced ${props} properties.`)
  
  const d = new Date()
  d.setMonth(d.getMonth() - 6)
  
  console.log("Resyncing reservations since", d.toISOString())
  const resCount = await syncReservations(d.toISOString())
  console.log(`Synced ${resCount} properties' reservations.`)
}
run()
