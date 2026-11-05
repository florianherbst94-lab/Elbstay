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

export async function duplicateInvoice(invoiceId: string) {
  // Fetch original invoice with items
  const original = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { items: true }
  });

  if (!original) {
    throw new Error("Invoice not found");
  }

  // Create new invoice with duplicated data
  const newInvoice = await prisma.invoice.create({
    data: {
      status: "OPEN",
      invoiceType: original.invoiceType,
      invoiceEmail: original.invoiceEmail,
      companyName: original.companyName,
      firstName: original.firstName,
      lastName: original.lastName,
      contactPerson: original.contactPerson,
      street: original.street,
      postalCode: original.postalCode,
      city: original.city,
      country: original.country,
      vatId: original.vatId,
      bookingPlatform: original.bookingPlatform,
      propertyName: original.propertyName,
      invoiceReference: original.invoiceReference,
      invoiceNote: original.invoiceNote,
      paymentNote: original.paymentNote,
      language: original.language,
      grossAmountCent: original.grossAmountCent,
      netAmountCent: original.netAmountCent,
      taxAmountCent: original.taxAmountCent,
      taxRate: original.taxRate,
      items: {
        create: original.items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unitPriceCent: item.unitPriceCent,
          taxRate: item.taxRate,
          totalNetCent: item.totalNetCent,
          totalTaxCent: item.totalTaxCent,
          totalGrossCent: item.totalGrossCent
        }))
      }
    }
  });

  redirect(`/admin/rechnungen/${newInvoice.id}`);
}
