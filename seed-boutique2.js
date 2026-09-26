const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.property.create({
    data: {
      hospitableId: 'placeholder-boutique-2',
      name: 'ElbStay Boutique-Apartment nahe der Elbe',
      timezone: 'Europe/Berlin',
      status: 'active'
    }
  });
  console.log('Added property for Boutique 2');
}

main().catch(console.error).finally(() => prisma.$disconnect());
