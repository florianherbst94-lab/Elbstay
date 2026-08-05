"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createCost(formData: FormData) {
  const propertyId = formData.get("propertyId") as string
  let categoryId = formData.get("categoryId") as string
  const description = formData.get("description") as string
  const amountStr = formData.get("amount") as string
  const calculationType = formData.get("calculationType") as string
  const validFromStr = formData.get("validFrom") as string
  
  if (!propertyId || !categoryId || !description || !amountStr || !calculationType || !validFromStr) {
    throw new Error("Bitte füllen Sie alle Pflichtfelder aus.")
  }

  if (categoryId === "NEW") {
    const newCategoryName = formData.get("newCategoryName") as string
    const newCategoryType = formData.get("newCategoryType") as string
    
    if (!newCategoryName || !newCategoryType) {
      throw new Error("Bitte geben Sie einen Namen für die neue Kategorie an.")
    }
    
    const newCategory = await prisma.costCategory.create({
      data: {
        name: newCategoryName,
        type: newCategoryType
      }
    })
    
    categoryId = newCategory.id
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

export async function deleteCost(costId: string, propertyId: string) {
  await prisma.propertyCost.delete({
    where: { id: costId }
  })
  
  revalidatePath("/admin/revenue/costs")
  revalidatePath(`/admin/revenue/properties/${propertyId}`)
}

export async function duplicateCost(costId: string, propertyId: string) {
  const existing = await prisma.propertyCost.findUnique({ where: { id: costId } })
  if (!existing) throw new Error("Cost not found")
  
  await prisma.propertyCost.create({
    data: {
      propertyId: existing.propertyId,
      categoryId: existing.categoryId,
      description: `${existing.description} (Kopie)`,
      amountCent: existing.amountCent,
      calculationType: existing.calculationType,
      validFrom: existing.validFrom,
      isActive: existing.isActive,
      isGross: existing.isGross
    }
  })
  
  revalidatePath("/admin/revenue/costs")
  revalidatePath(`/admin/revenue/properties/${propertyId}`)
}

export async function updateCost(costId: string, formData: FormData) {
  const description = formData.get("description") as string
  const amountStr = formData.get("amount") as string
  const calculationType = formData.get("calculationType") as string
  
  if (!description || !amountStr || !calculationType) {
    throw new Error("Bitte füllen Sie alle Pflichtfelder aus.")
  }

  const amountCent = Math.round(parseFloat(amountStr.replace(',', '.')) * 100)
  
  const existing = await prisma.propertyCost.findUnique({ where: { id: costId } })
  
  await prisma.propertyCost.update({
    where: { id: costId },
    data: {
      description,
      amountCent,
      calculationType,
    }
  })

  revalidatePath("/admin/revenue/costs")
  if (existing) {
    revalidatePath(`/admin/revenue/properties/${existing.propertyId}`)
  }
}
