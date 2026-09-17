import prisma from "../src/lib/prisma";

async function main() {
  const properties = await prisma.property.findMany();
  console.log(properties);
}
main();
