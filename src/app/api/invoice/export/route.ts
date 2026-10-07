import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import * as archiverModule from "archiver";
// @ts-ignore
const archiver = archiverModule.default || archiverModule;
import { generateInvoicePdf, InvoiceData } from "@/lib/invoice/pdf-generator";
import { format } from "date-fns";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const monthStr = searchParams.get("month"); // Format: YYYY-MM
    
    if (!monthStr || !/^\d{4}-\d{2}$/.test(monthStr)) {
      return NextResponse.json({ error: "Invalid month format. Use YYYY-MM" }, { status: 400 });
    }

    const [year, month] = monthStr.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const invoices = await prisma.invoice.findMany({
      where: {
        status: { in: ["CREATED", "SENT"] },
        OR: [
          { invoiceDate: { gte: startDate, lte: endDate } },
          { createdAt: { gte: startDate, lte: endDate }, invoiceDate: null }
        ]
      },
      include: { items: true },
      orderBy: { invoiceNumber: 'asc' }
    });

    if (invoices.length === 0) {
      return NextResponse.json({ error: "Keine Rechnungen in diesem Zeitraum gefunden." }, { status: 404 });
    }

    const settings = await prisma.invoiceSetting.findFirst();
    if (!settings) {
      return NextResponse.json({ error: "Invoice settings not found." }, { status: 400 });
    }

    // Set up the ZIP stream response
    const headers = new Headers();
    headers.set('Content-Type', 'application/zip');
    headers.set('Content-Disposition', `attachment; filename=Rechnungen_${monthStr}.zip`);

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();

    const archive = archiver('zip', {
      zlib: { level: 5 }
    });

    archive.on('data', (chunk: any) => writer.write(chunk));
    archive.on('end', () => writer.close());
    archive.on('error', (err) => {
      console.error('Archiver error:', err);
      writer.abort(err);
    });

    // We process everything asynchronously, but respond with the stream immediately
    (async () => {
      try {
        // Create CSV
        let csvContent = "Rechnungsnummer;Datum;Empfaenger;Plattform;Netto (EUR);Steuer (EUR);Brutto (EUR)\n";
        
        for (const inv of invoices) {
          const date = inv.invoiceDate || inv.createdAt;
          const dateStr = format(date, 'dd.MM.yyyy');
          const name = (inv.companyName || `${inv.firstName} ${inv.lastName}`).replace(/;/g, ',');
          const platform = (inv.bookingPlatform || "").replace(/;/g, ',');
          const net = (inv.netAmountCent / 100).toFixed(2).replace('.', ',');
          const tax = (inv.taxAmountCent / 100).toFixed(2).replace('.', ',');
          const gross = (inv.grossAmountCent / 100).toFixed(2).replace('.', ',');
          
          csvContent += `${inv.invoiceNumber};${dateStr};${name};${platform};${net};${tax};${gross}\n`;
          
          // Generate PDF
          const pdfData: InvoiceData = {
            invoiceNumber: inv.invoiceNumber || "ENTWURF",
            invoiceDate: inv.invoiceDate || new Date(),
            reservationCode: inv.reservationCode,
            bookingPlatform: inv.bookingPlatform,
            serviceStartDate: inv.serviceStartDate,
            serviceEndDate: inv.serviceEndDate,
            isDraft: false,
            invoiceReference: inv.invoiceReference,
            invoiceNote: inv.invoiceNote,
            recipient: {
              name: inv.companyName || `${inv.firstName} ${inv.lastName}`,
              companyName: inv.companyName,
              street: inv.street || "",
              postalCode: inv.postalCode || "",
              city: inv.city || "",
              country: inv.country || ""
            },
            settings: {
              companyName: settings.companyName,
              street: settings.street || "",
              postalCode: settings.postalCode || "",
              city: settings.city || "",
              taxNumber: settings.taxNumber,
              vatId: settings.vatId || settings.vatId,
              iban: settings.iban,
              bankName: settings.bankName,
              email: settings.email,
              website: settings.website,
              defaultPaymentNote: settings.defaultPaymentNote
            },
            items: inv.items.map(item => ({
              description: item.description,
              quantity: item.quantity,
              unitPriceCent: item.unitPriceCent,
              taxRate: item.taxRate,
              totalNetCent: item.totalNetCent,
              totalTaxCent: item.totalTaxCent,
              totalGrossCent: item.totalGrossCent
            })),
            totals: {
              net: inv.netAmountCent,
              tax: inv.taxAmountCent,
              gross: inv.grossAmountCent
            }
          };

          const pdfBuffer = await generateInvoicePdf(pdfData);
          archive.append(pdfBuffer, { name: `Rechnungen/${inv.invoiceNumber}.pdf` });
        }
        
        archive.append(csvContent, { name: `Uebersicht_${monthStr}.csv` });
        
        archive.finalize();
      } catch (err) {
        console.error("Error generating export:", err);
        archive.abort();
      }
    })();

    return new NextResponse(readable, { headers });
  } catch (error: any) {
    console.error("Export error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate export" }, { status: 500 });
  }
}
