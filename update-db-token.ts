import 'dotenv/config'
import pg from 'pg'

async function fix() {
  // Let's use Prisma to check if there are properties
  const { PrismaClient } = await import('./src/generated/prisma/client/index.js')
  const prisma = new PrismaClient()
  
  const count = await prisma.property.count()
  console.log("Properties in DB:", count)
  
  if (count === 0) {
    console.log("No properties found in DB yet.")
  }
}

fix()
