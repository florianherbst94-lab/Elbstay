import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getNextInvoiceNumber } from "@/lib/invoice/sequence";
import { auth } from "@/auth";


export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { invoiceId, reason } = body;

    if (!reason) {
      return NextResponse.json({ error: "Cancel reason required" }, { status: 400 });
    }

    const originalInvoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { items: true }
    });

    if (!originalInvoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (originalInvoice.status === "CANCELLED" || originalInvoice.status === "CANCELLATION_INVOICE") {
      return NextResponse.json({ error: "Invoice cannot be cancelled" }, { status: 400 });
    }

    if (originalInvoice.status === "OPEN" || originalInvoice.status === "DRAFT") {
      // If it's not finalized, just cancel it without creating a storno
      await prisma.invoice.update({
        where: { id: invoiceId },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
          cancelReason: reason,
        }
      });
      return NextResponse.json({ success: true, isStorno: false });
    }

    // Create storno invoice
    const stornoInvoiceDate = new Date();
    const stornoInvoiceNumber = await getNextInvoiceNumber(stornoInvoiceDate.getFullYear());

    const stornoInvoice = await prisma.invoice.create({
      data: {
        status: "CANCELLATION_INVOICE",
        invoiceNumber: stornoInvoiceNumber,
        invoiceDate: stornoInvoiceDate,
        originalInvoiceId: originalInvoice.id,
        invoiceNote: `Stornorechnung zu Rechnung ${originalInvoice.invoiceNumber}. Grund: ${reason}`,
        
        // Copy recipient details
        invoiceEmail: originalInvoice.invoiceEmail,
        invoiceType: originalInvoice.invoiceType,
        companyName: originalInvoice.companyName,
        firstName: originalInvoice.firstName,
        lastName: originalInvoice.lastName,
        contactPerson: originalInvoice.contactPerson,
        street: originalInvoice.street,
        postalCode: originalInvoice.postalCode,
        city: originalInvoice.city,
        country: originalInvoice.country,
        vatId: originalInvoice.vatId,
        
        // Copy meta details
        reservationCode: originalInvoice.reservationCode,
        bookingPlatform: originalInvoice.bookingPlatform,
        bookingGuestName: originalInvoice.bookingGuestName,
        propertyName: originalInvoice.propertyName,
        serviceStartDate: originalInvoice.serviceStartDate,
        serviceEndDate: originalInvoice.serviceEndDate,
        
        // Inverse financials
        grossAmountCent: -originalInvoice.grossAmountCent,
        netAmountCent: -originalInvoice.netAmountCent,
        taxAmountCent: -originalInvoice.taxAmountCent,
        taxRate: originalInvoice.taxRate,
        
        items: {
          create: originalInvoice.items.map(item => ({
            description: item.description,
            quantity: item.quantity, // quantity stays positive, unit price becomes negative or vice versa. Let's make total negative
            unitPriceCent: -item.unitPriceCent,
            taxRate: item.taxRate,
            totalNetCent: -item.totalNetCent,
            totalTaxCent: -item.totalTaxCent,
            totalGrossCent: -item.totalGrossCent
          }))
        },
        auditLogs: {
          create: {
            action: "CREATED_CANCELLATION",
            details: `Stornorechnung erstellt zu ${originalInvoice.invoiceNumber}`,
            adminUser: session.user.email || "Admin"
          }
        }
      }
    });

    // Update original invoice
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: "CANCELLED",
        cancelledAt: new Date(),
        cancelReason: reason,
      }
    });

    await prisma.invoiceAuditLog.create({
      data: {
        invoiceId: originalInvoice.id,
        action: "CANCELLED",
        details: `Rechnung storniert. Stornorechnung Nr. ${stornoInvoiceNumber}`,
        adminUser: session.user.email || "Admin"
      }
    });

    return NextResponse.json({ success: true, isStorno: true, stornoInvoiceId: stornoInvoice.id });

  } catch (error) {
    console.error("Cancellation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
