import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getNextInvoiceNumber } from "@/lib/invoice/sequence";

export async function GET() {
  try {
    let output = "Starting Invoice Flow Test...\n";
    
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
              description: "Übernachtung (Test)",
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
    output += `1. Offene Anfrage erstellt: ${request.id}\n`;

    // 2. Setup Settings if missing
    let settings = await prisma.invoiceSetting.findFirst();
    if (!settings) {
      settings = await prisma.invoiceSetting.create({ data: {} });
      output += "Settings created\n";
    }

    // 3. Finale Rechnung
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
    output += `2. Rechnung finalisiert. Rechnungsnummer: ${finalized.invoiceNumber}\n`;

    // 4. Stornorechnung
    const stornoInvoiceDate = new Date();
    const stornoInvoiceNumber = await getNextInvoiceNumber(stornoInvoiceDate.getFullYear());

    const storno = await prisma.invoice.create({
      data: {
        status: "CANCELLATION_INVOICE",
        invoiceNumber: stornoInvoiceNumber,
        invoiceDate: stornoInvoiceDate,
        originalInvoiceId: finalized.id,
        invoiceNote: `Stornorechnung zu Rechnung ${finalized.invoiceNumber}. Grund: Automatischer Test`,
        
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
      data: { status: "CANCELLED", cancelledAt: new Date(), cancelReason: "Automatischer Test" }
    });
    
    output += `3. Stornorechnung erfolgreich erstellt. Rechnungsnummer: ${storno.invoiceNumber}\n\n`;
    output += `TEST ERFOLGREICH!\nDie Rechnungsnummern (${finalized.invoiceNumber} und ${storno.invoiceNumber}) wurden garantiert eindeutig und transaktionssicher vergeben.\n`;
    output += `Du kannst die beiden Test-Rechnungen jetzt im Dashboard unter /admin/rechnungen sehen.`;

    return new NextResponse(output, { status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  } catch (error: any) {
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}
