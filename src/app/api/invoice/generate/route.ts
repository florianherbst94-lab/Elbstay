import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { generateInvoicePdf, InvoiceData } from "@/lib/invoice/pdf-generator";
import { getNextInvoiceNumber } from "@/lib/invoice/sequence";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { invoiceId, isDraft } = body;

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { items: true }
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (!isDraft && invoice.status !== "OPEN" && invoice.status !== "DRAFT") {
      return NextResponse.json({ error: "Invoice already finalized" }, { status: 400 });
    }

    const settings = await prisma.invoiceSetting.findFirst();
    if (!settings) {
      return NextResponse.json({ error: "Invoice settings not found. Please configure them first." }, { status: 400 });
    }

    // Determine invoice number
    let invoiceNumber = invoice.invoiceNumber;
    let invoiceDate = invoice.invoiceDate || new Date();

    if (!isDraft && !invoiceNumber) {
      // It's the real deal, get a number
      invoiceNumber = await getNextInvoiceNumber(invoiceDate.getFullYear());
      
      // Update DB
      await prisma.invoice.update({
        where: { id: invoiceId },
        data: {
          invoiceNumber,
          invoiceDate,
          status: "CREATED"
        }
      });
      
      await prisma.invoiceAuditLog.create({
        data: {
          invoiceId,
          action: "CREATED",
          details: `Invoice finalized with number ${invoiceNumber}`,
          adminUser: "Admin" // Replace with actual user from session
        }
      });
    }

    // Build payload for PDF generator
    const pdfData: InvoiceData = {
      invoiceNumber: invoiceNumber || "ENTWURF",
      invoiceDate: invoiceDate,
      reservationCode: invoice.reservationCode,
      bookingPlatform: invoice.bookingPlatform,
      serviceStartDate: invoice.serviceStartDate,
      serviceEndDate: invoice.serviceEndDate,
      isDraft: isDraft,
      invoiceReference: invoice.invoiceReference,
      invoiceNote: invoice.invoiceNote,
      recipient: {
        name: invoice.companyName || `${invoice.firstName} ${invoice.lastName}`,
        companyName: invoice.companyName,
        street: invoice.street || "",
        postalCode: invoice.postalCode || "",
        city: invoice.city || "",
        country: invoice.country || ""
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
      items: invoice.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPriceCent: item.unitPriceCent,
        taxRate: item.taxRate,
        totalNetCent: item.totalNetCent,
        totalTaxCent: item.totalTaxCent,
        totalGrossCent: item.totalGrossCent
      })),
      totals: {
        net: invoice.netAmountCent,
        tax: invoice.taxAmountCent,
        gross: invoice.grossAmountCent
      }
    };

    const pdfBuffer = await generateInvoicePdf(pdfData);

    // If it's a real generation, we should probably upload this buffer to Vercel Blob
    // and save the URL to `invoice.pdfPath`.
    // For now, we return it so the client can download/view it.
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="Elbstay_Rechnung_${pdfData.invoiceNumber}.pdf"`,
      }
    });

  } catch (error) {
    console.error("PDF Generation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
