import 'dotenv/config'
import prisma from './src/lib/prisma'

async function check() {
  const token = process.env.HOSPITABLE_API_TOKEN
  console.log("Token configured:", token ? "Yes (length: " + token.length + ")" : "No")
  console.log("Token starts with:", token?.substring(0, 5))
  
  const res = await prisma.reservation.count()
  console.log("Reservations in DB:", res)
}

check()
