import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import { syncReservations } from './src/lib/hospitable/sync'

async function run() {
  const d = new Date()
  d.setMonth(d.getMonth() - 6)
  
  console.log("Resyncing reservations since", d.toISOString())
  const count = await syncReservations(d.toISOString())
  console.log(`Synced ${count} properties.`)
}
run()
