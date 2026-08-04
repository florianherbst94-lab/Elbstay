import 'dotenv/config'
import pg from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './src/generated/prisma/client.js'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function test() {
  const result = await prisma.$queryRawUnsafe('SELECT 1 as connected')
  console.log('Connected to Prisma Postgres:', result)

  await prisma.$disconnect()
  await pool.end()
}
test()
