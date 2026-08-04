"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createCost(formData: FormData) {
  const propertyId = formData.get("propertyId") as string
  const categoryId = formData.get("categoryId") as string
  const description = formData.get("description") as string
  const amountStr = formData.get("amount") as string
  const calculationType = formData.get("calculationType") as string
  const validFromStr = formData.get("validFrom") as string
  
  if (!propertyId || !categoryId || !description || !amountStr || !calculationType || !validFromStr) {
    throw new Error("Bitte füllen Sie alle Pflichtfelder aus.")
  }

  // Convert amount to cents
  const amountCent = Math.round(parseFloat(amountStr.replace(',', '.')) * 100)
  
  const validFrom = new Date(validFromStr)

  await prisma.propertyCost.create({
    data: {
      propertyId,
      categoryId,
      description,
      amountCent,
      calculationType,
      validFrom,
      isActive: true,
      isGross: true,
    }
  })

  revalidatePath("/admin/revenue/costs")
  redirect("/admin/revenue/costs")
}
