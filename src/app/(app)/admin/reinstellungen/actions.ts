"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function saveInvoiceSettings(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Settings
  const settingsData = {
    companyName: formData.get("companyName") as string,
    street: formData.get("street") as string,
    postalCode: formData.get("postalCode") as string,
    city: formData.get("city") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    website: formData.get("website") as string,
    owner: formData.get("owner") as string,
    taxNumber: formData.get("taxNumber") as string,
    vatId: formData.get("vatId") as string,
    bankName: formData.get("bankName") as string,
    iban: formData.get("iban") as string,
    defaultPaymentNote: formData.get("defaultPaymentNote") as string,
  };

  const settings = await prisma.invoiceSetting.findFirst();
  if (settings) {
    await prisma.invoiceSetting.update({
      where: { id: settings.id },
      data: settingsData
    });
  } else {
    await prisma.invoiceSetting.create({
      data: settingsData
    });
  }

  // Sequence
  const currentYear = new Date().getFullYear();
  const currentNumberStr = formData.get("currentNumber") as string;
  const currentNumber = parseInt(currentNumberStr, 10);
  const format = formData.get("format") as string;

  if (!isNaN(currentNumber) && format) {
    await prisma.invoiceSequence.upsert({
      where: { year: currentYear },
      update: {
        currentNumber,
        format
      },
      create: {
        year: currentYear,
        currentNumber,
        format
      }
    });
  }

  revalidatePath("/admin/reinstellungen");
}

