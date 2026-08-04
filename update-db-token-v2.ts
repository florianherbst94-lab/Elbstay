import 'dotenv/config'
import pg from 'pg'
import prisma from './src/lib/prisma'

async function fix() {
  const count = await prisma.property.count()
  console.log("Properties in DB:", count)
  
  if (count === 0) {
    console.log("No properties found in DB yet.")
  } else {
     const props = await prisma.property.findMany()
     console.log("Properties:", props.map(p => p.name))
  }
}

fix()
