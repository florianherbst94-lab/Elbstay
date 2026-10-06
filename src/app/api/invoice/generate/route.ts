import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateInvoicePdf, InvoiceData } from "@/lib/invoice/pdf-generator";
import { getNextInvoiceNumber } from "@/lib/invoice/sequence";
import { auth } from "@/auth";


export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { invoiceId, isDraft } = body;

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { items: true }
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const isFinalized = ["CREATED", "SENT", "CANCELLATION_INVOICE", "CANCELLED"].includes(invoice.status);
    
    // We only finalize if it's explicitly requested (isDraft=false) AND it's currently OPEN/DRAFT.
    const shouldFinalizeNow = !isDraft && (invoice.status === "OPEN" || invoice.status === "DRAFT");

    if (!isDraft && !shouldFinalizeNow && !isFinalized) {
      return NextResponse.json({ error: "Invalid state for invoice generation" }, { status: 400 });
    }

    const settings = await prisma.invoiceSetting.findFirst();
    if (!settings) {
      return NextResponse.json({ error: "Invoice settings not found. Please configure them first." }, { status: 400 });
    }

    // Determine invoice number
    let invoiceNumber = invoice.invoiceNumber;
    let invoiceDate = invoice.invoiceDate || new Date();

    if (shouldFinalizeNow) {
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
          adminUser: session.user.email || "Admin"
        }
      });
    }

    const isStorno = invoice.status === "CANCELLATION_INVOICE";
    const waterMarkDraft = isDraft && !isFinalized;

    // Build payload for PDF generator
    const pdfData: InvoiceData = {
      invoiceNumber: invoiceNumber || "ENTWURF",
      invoiceDate: invoiceDate,
      reservationCode: invoice.reservationCode,
      bookingPlatform: invoice.bookingPlatform,
      serviceStartDate: invoice.serviceStartDate,
      serviceEndDate: invoice.serviceEndDate,
      isDraft: waterMarkDraft,
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
    
    // In Next.js App Router (edge/Node environments), Node Buffers might not be directly acceptable as BodyInit in standard NextResponse. We convert it to a standard Response compatible format.
    return new NextResponse(pdfBuffer as any, {
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
