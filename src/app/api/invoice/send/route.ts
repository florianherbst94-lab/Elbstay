import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateInvoicePdf, InvoiceData } from "@/lib/invoice/pdf-generator";
import { auth } from "@/auth";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { invoiceId, toEmail } = await req.json();
    if (!invoiceId || !toEmail) {
      return NextResponse.json({ error: "Missing invoiceId or email" }, { status: 400 });
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { items: true }
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (invoice.status === "OPEN" || invoice.status === "DRAFT") {
      return NextResponse.json({ error: "Rechnung muss zuerst finalisiert werden." }, { status: 400 });
    }

    const settings = await prisma.invoiceSetting.findFirst();
    if (!settings) {
      return NextResponse.json({ error: "Invoice settings not found." }, { status: 400 });
    }

    // Generate the PDF buffer for the attachment
    const pdfData: InvoiceData = {
      invoiceNumber: invoice.invoiceNumber || "ENTWURF",
      invoiceDate: invoice.invoiceDate || new Date(),
      reservationCode: invoice.reservationCode,
      bookingPlatform: invoice.bookingPlatform,
      serviceStartDate: invoice.serviceStartDate,
      serviceEndDate: invoice.serviceEndDate,
      isDraft: false,
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

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromAddress = "ElbStay <rechnung@elbstay.de>";
    const guestName = invoice.firstName ? `${invoice.firstName} ${invoice.lastName}` : invoice.companyName;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toEmail],
      subject: `Ihre Rechnung ${invoice.invoiceNumber} von ElbStay`,
      text: `Hallo ${guestName},\n\nvielen Dank für Ihren Aufenthalt bei ElbStay.\n\nAnbei erhalten Sie Ihre Rechnung (Nr. ${invoice.invoiceNumber}) im PDF-Format.\n\nBei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.\n\nViele Grüße\nIhr ElbStay Team\n${settings.website || 'www.elbstay.de'}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; line-height: 1.5;">
          <p>Hallo ${guestName},</p>
          <p>vielen Dank für Ihren Aufenthalt bei <strong>ElbStay</strong>.</p>
          <p>Anbei erhalten Sie Ihre Rechnung (Nr. <strong>${invoice.invoiceNumber}</strong>) als PDF-Dokument.</p>
          <p>Bei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.</p>
          <br/>
          <p>Viele Grüße<br/><strong>Ihr ElbStay Team</strong></p>
          <p style="font-size: 12px; color: #777;">
            ${settings.companyName}<br/>
            ${settings.street}, ${settings.postalCode} ${settings.city}<br/>
            <a href="https://${settings.website || 'www.elbstay.de'}" style="color: #526343;">${settings.website || 'www.elbstay.de'}</a>
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `Elbstay_Rechnung_${invoice.invoiceNumber}.pdf`,
          content: pdfBuffer,
        }
      ]
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Update status to SENT
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: "SENT" }
    });

    await prisma.invoiceAuditLog.create({
      data: {
        invoiceId,
        action: "SENT",
        details: `Rechnung wurde per E-Mail an ${toEmail} gesendet.`,
        adminUser: session.user.email || "Admin"
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email Sending error:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
