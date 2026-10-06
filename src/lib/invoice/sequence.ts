import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function getNextInvoiceNumber(year: number): Promise<string> {
  // Use a transaction to safely increment the sequence
  return await prisma.$transaction(async (tx) => {
    let sequence = await tx.invoiceSequence.findUnique({
      where: { year }
    });

    if (!sequence) {
      sequence = await tx.invoiceSequence.create({
        data: {
          year,
          currentNumber: 1, // Start with 1 if no starting number was set in settings
          format: "{YEAR}-{NUMBER:4}"
        }
      });
    } else {
      sequence = await tx.invoiceSequence.update({
        where: { year },
        data: { currentNumber: { increment: 1 } }
      });
    }

    // Format the number
    // E.g., "{YEAR}-{NUMBER:4}"
    let invoiceNumber = sequence.format;
    invoiceNumber = invoiceNumber.replace("{YEAR}", sequence.year.toString());
    
    // Replace {NUMBER:X} with zero-padded number
    const numberMatch = invoiceNumber.match(/{NUMBER:(\d+)}/);
    if (numberMatch) {
      const padding = parseInt(numberMatch[1], 10);
      const paddedNumber = sequence.currentNumber.toString().padStart(padding, '0');
      invoiceNumber = invoiceNumber.replace(numberMatch[0], paddedNumber);
    } else {
      // Fallback if format is just "{YEAR}-{NUMBER}" without padding
      invoiceNumber = invoiceNumber.replace("{NUMBER}", sequence.currentNumber.toString());
    }

    return invoiceNumber;
  });
}
