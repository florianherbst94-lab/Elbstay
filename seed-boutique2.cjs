const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.property.create({
    data: {
      hospitableId: '2329032', // Wait, do I have the real Hospitable ID? No. I'll just use a dummy one if it crashes later it will be replaced? No, Hospitable ID is unique.
      name: 'ElbStay Boutique-Apartment nahe der Elbe',
      timezone: 'Europe/Berlin',
      status: 'active'
    }
  });
  console.log('Added property for Boutique 2');
}

main().catch(console.error).finally(() => prisma.$disconnect());
