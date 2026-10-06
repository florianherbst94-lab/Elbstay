import prisma from "./src/lib/prisma";
import { getNextInvoiceNumber } from "./src/lib/invoice/sequence";

async function runTest() {
  console.log("Starting Invoice Flow Test...");
  
  // 1. Offene Rechnungsanfrage
  const request = await prisma.invoice.create({
    data: {
      status: "OPEN",
      reservationCode: "TEST-2026-X",
      bookingPlatform: "Direct",
      bookingGuestName: "John Doe",
      invoiceEmail: "test@example.com",
      invoiceType: "Privatperson",
      firstName: "John",
      lastName: "Doe",
      street: "Teststr. 1",
      postalCode: "12345",
      city: "Testcity",
      country: "Germany",
      netAmountCent: 10000,
      taxAmountCent: 700,
      grossAmountCent: 10700,
      taxRate: 7,
      items: {
        create: [
          {
            description: "Übernachtung",
            quantity: 1,
            unitPriceCent: 10000,
            taxRate: 7,
            totalNetCent: 10000,
            totalTaxCent: 700,
            totalGrossCent: 10700
          }
        ]
      }
    }
  });
  console.log("1. Offene Anfrage erstellt:", request.id);

  // 2. Setup Settings if missing
  let settings = await prisma.invoiceSetting.findFirst();
  if (!settings) {
    settings = await prisma.invoiceSetting.create({
      data: {
        companyName: "Test Company"
      }
    });
    console.log("Settings created");
  }

  // 3. Finale Rechnung (Simulating the API call logic)
  const invoiceDate = new Date();
  const invoiceNumber = await getNextInvoiceNumber(invoiceDate.getFullYear());
  
  const finalized = await prisma.invoice.update({
    where: { id: request.id },
    data: {
      status: "CREATED",
      invoiceNumber,
      invoiceDate
    }
  });
  console.log("3. Rechnung finalisiert:", finalized.invoiceNumber);

  // 4. Stornorechnung (Simulating cancel API)
  const stornoInvoiceDate = new Date();
  const stornoInvoiceNumber = await getNextInvoiceNumber(stornoInvoiceDate.getFullYear());

  const storno = await prisma.invoice.create({
    data: {
      status: "CANCELLATION_INVOICE",
      invoiceNumber: stornoInvoiceNumber,
      invoiceDate: stornoInvoiceDate,
      originalInvoiceId: finalized.id,
      invoiceNote: `Stornorechnung zu Rechnung ${finalized.invoiceNumber}. Grund: Test Storno`,
      
      invoiceEmail: finalized.invoiceEmail,
      invoiceType: finalized.invoiceType,
      firstName: finalized.firstName,
      lastName: finalized.lastName,
      street: finalized.street,
      postalCode: finalized.postalCode,
      city: finalized.city,
      country: finalized.country,
      
      grossAmountCent: -finalized.grossAmountCent,
      netAmountCent: -finalized.netAmountCent,
      taxAmountCent: -finalized.taxAmountCent,
      taxRate: finalized.taxRate,
    }
  });
  
  await prisma.invoice.update({
    where: { id: finalized.id },
    data: { status: "CANCELLED", cancelledAt: new Date(), cancelReason: "Test Storno" }
  });
  
  console.log("5. Stornorechnung erstellt:", storno.invoiceNumber);

  // 6. Neue Korrekturrechnung (Neuanlage nach Storno)
  const correction = await prisma.invoice.create({
    data: {
      status: "OPEN", // or direct to CREATED
      reservationCode: "TEST-2026-X",
      bookingPlatform: "Direct",
      bookingGuestName: "John Doe",
      invoiceEmail: "test@example.com",
      invoiceType: "Privatperson",
      firstName: "John",
      lastName: "Doe",
      street: "Teststr. 1",
      postalCode: "12345",
      city: "Testcity",
      country: "Germany",
      invoiceNote: `Korrekturrechnung zu ${finalized.invoiceNumber}`,
    }
  });
  console.log("6. Korrektur-Anfrage neu angelegt:", correction.id);
  
  console.log("Flow completed successfully!");
}

runTest().catch(console.error).finally(() => prisma.$disconnect());
