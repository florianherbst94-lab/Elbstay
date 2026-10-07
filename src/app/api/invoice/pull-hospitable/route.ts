import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { invoiceId } = await req.json();
    if (!invoiceId) {
      return NextResponse.json({ error: "Missing invoiceId" }, { status: 400 });
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { items: true }
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    
    if (invoice.status !== "OPEN") {
       return NextResponse.json({ error: "Invoice is finalized and cannot be modified" }, { status: 400 });
    }

    const reservationCode = invoice.reservationCode;
    if (!reservationCode) {
      return NextResponse.json({ error: "No reservation code provided in invoice" }, { status: 400 });
    }

    // Try to find the reservation locally
    const reservation = await prisma.reservation.findFirst({
      where: { code: reservationCode },
      include: { financials: true, property: true }
    });

    if (!reservation || !reservation.financials) {
      return NextResponse.json({ error: "Reservation or financial data not found in local Hospitable sync" }, { status: 404 });
    }

    const fin = reservation.financials;
    const isBookingCom = reservation.platform?.toLowerCase().includes("booking");
    const isAirbnb = reservation.platform?.toLowerCase().includes("airbnb");

    // Clean up existing items to replace them
    await prisma.invoiceItem.deleteMany({
      where: { invoiceId }
    });

    const newItems = [];
    let netTotal = 0;
    let taxTotal = 0;
    let grossTotal = 0;

    // Accommodation (7% tax)
    // For Airbnb, hospitable's accommodationCent is what the HOST gets.
    // The guest actually pays the Total Paid by Guest, which includes the Airbnb Service Fee (typically 15-17%).
    // If the invoice is 1:1 what the guest paid, we need to calculate the missing gap and add it to the accommodation cost!
    
    // We do this by taking the totalPaidByGuest and subtracting cleaning fee, other fees, and taxes. The rest MUST be the accommodation + service fee total.
    let accommodationGross = fin.totalPaidByGuestCent - (fin.cleaningFeeCent + fin.otherGuestFeeCent + fin.taxCent);
    
    // Fallback just in case totalPaidByGuestCent is 0 or missing
    if (accommodationGross <= 0 && fin.accommodationCent > 0) {
        accommodationGross = fin.accommodationCent;
    }

    if (accommodationGross > 0) {
      // Calculate net from gross assuming 7% VAT (Gross = Net * 1.07 -> Net = Gross / 1.07)
      const net = Math.round(accommodationGross / 1.07);
      const tax = accommodationGross - net;

      const checkInFormat = new Date(reservation.checkIn).toLocaleDateString("de-DE");
      const checkOutFormat = new Date(reservation.checkOut).toLocaleDateString("de-DE");

      newItems.push({
        invoiceId,
        description: `Übernachtung (${checkInFormat} - ${checkOutFormat}, ${reservation.property?.name || 'Elbstay'})`,
        quantity: 1,
        unitPriceCent: net,
        taxRate: 7,
        totalNetCent: net,
        totalTaxCent: tax,
        totalGrossCent: accommodationGross
      });
      netTotal += net;
      taxTotal += tax;
      grossTotal += accommodationGross;
    }

    // Cleaning Fee (19% tax)
    if (fin.cleaningFeeCent > 0) {
      const gross = fin.cleaningFeeCent;
      const net = Math.round(gross / 1.19);
      const tax = gross - net;

      newItems.push({
        invoiceId,
        description: "Reinigungsgebühr",
        quantity: 1,
        unitPriceCent: net,
        taxRate: 19,
        totalNetCent: net,
        totalTaxCent: tax,
        totalGrossCent: gross
      });
      netTotal += net;
      taxTotal += tax;
      grossTotal += gross;
    }

    // Airbnb Service Fee (not subject to our tax usually, or 0% or handled differently depending on the region)
    // Often we don't bill the Airbnb Guest Service Fee because Airbnb bills that to the guest directly!
    // But for Booking.com, we collect everything. 
    // Let's use totalPaidByGuestCent to decide if we need to add other fees or if we just bill Accommodation + Cleaning.
    // For simplicity, we just insert the items into the DB.
    
    // In Germany, City Tax (Beherbergungssteuer) is often collected for Booking.com. 
    // It's 6% in Dresden. It was deducted in sync.ts. We could add it as a 0% tax item.
    if (fin.taxCent > 0) {
      const gross = fin.taxCent;
      newItems.push({
        invoiceId,
        description: "Beherbergungssteuer / Steuern der Buchungsplattform",
        quantity: 1,
        unitPriceCent: gross,
        taxRate: 0,
        totalNetCent: gross,
        totalTaxCent: 0,
        totalGrossCent: gross
      });
      netTotal += gross;
      grossTotal += gross;
    }

    if (fin.otherGuestFeeCent > 0) {
      const gross = fin.otherGuestFeeCent;
      newItems.push({
        invoiceId,
        description: "Servicegebühr für Gäste",
        quantity: 1,
        unitPriceCent: gross,
        taxRate: 0,
        totalNetCent: gross,
        totalTaxCent: 0,
        totalGrossCent: gross
      });
      netTotal += gross;
      grossTotal += gross;
    }

    await prisma.invoiceItem.createMany({
      data: newItems
    });

    // Update invoice totals
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        netAmountCent: netTotal,
        taxAmountCent: taxTotal,
        grossAmountCent: grossTotal,
        // Calculate blended tax rate (not strictly correct as a single field, but useful for DB)
        taxRate: 0 // We have mixed rates, so leave 0 or calculate average
      }
    });

    return NextResponse.json({ success: true, itemsAdded: newItems.length });
  } catch (error: any) {
    console.error("Pull hospitable error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
