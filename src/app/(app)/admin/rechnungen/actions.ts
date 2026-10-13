"use server"

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createManualInvoice() {
  const invoice = await prisma.invoice.create({
    data: {
      status: "OPEN",
      invoiceEmail: "",
      invoiceType: "Privatperson",
      firstName: "Neuer",
      lastName: "Gast",
      bookingPlatform: "Manuell",
    }
  });
  
  redirect(`/admin/rechnungen/${invoice.id}`);
}

export async function saveInvoiceData(invoiceId: string, invoiceData: any, itemsData: any[]) {
  // Update invoice
  const updatedInvoice = await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      ...invoiceData
    }
  });

  // Delete existing items and recreate them
  await prisma.invoiceItem.deleteMany({
    where: { invoiceId: invoiceId }
  });

  if (itemsData && itemsData.length > 0) {
    await prisma.invoiceItem.createMany({
      data: itemsData.map((item: any) => ({
        invoiceId: invoiceId,
        description: item.description || "Position",
        quantity: item.quantity || 1,
        unitPriceCent: item.unitPriceCent || 0,
        taxRate: item.taxRate || 19.0,
        totalGrossCent: item.totalGrossCent || 0,
        totalNetCent: item.totalNetCent || 0,
        totalTaxCent: item.totalTaxCent || 0
      }))
    });
  }

  // Recalculate totals
  const items = await prisma.invoiceItem.findMany({ where: { invoiceId: invoiceId } });
  
  const netAmountCent = items.reduce((sum, item) => sum + item.totalNetCent, 0);
  const taxAmountCent = items.reduce((sum, item) => sum + item.totalTaxCent, 0);
  const grossAmountCent = items.reduce((sum, item) => sum + item.totalGrossCent, 0);

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      netAmountCent,
      taxAmountCent,
      grossAmountCent
    }
  });
}
