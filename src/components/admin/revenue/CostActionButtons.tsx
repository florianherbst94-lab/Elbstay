"use client"

import { useState, useTransition } from "react"
import { Trash2, Copy, Edit2 } from "lucide-react"
import { deleteCost, duplicateCost, updateCost } from "@/app/(app)/admin/revenue/costs/actions"

export function CostActionButtons({ cost }: { 
  cost: { 
    id: string, 
    propertyId: string, 
    description: string, 
    amountCent: number, 
    calculationType: string,
    isGross: boolean,
    taxRate: number
  } 
}) {
  const [isPending, startTransition] = useTransition()
  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = () => {
    if (confirm("Möchten Sie diese Kosten wirklich löschen?")) {
      startTransition(async () => {
        await deleteCost(cost.id, cost.propertyId)
      })
    }
  }

  const handleDuplicate = () => {
    if (confirm("Möchten Sie diese Kosten duplizieren?")) {
      startTransition(async () => {
        await duplicateCost(cost.id, cost.propertyId)
      })
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsEditing(true)}
          disabled={isPending}
          className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
          title="Bearbeiten"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={handleDuplicate}
          disabled={isPending}
          className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
          title="Duplizieren"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50"
          title="Löschen"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-background border border-border p-6 rounded-2xl shadow-lg w-full max-w-md m-4">
            <h3 className="text-lg font-bold mb-4">Kosten bearbeiten</h3>
            <form action={(formData) => {
              startTransition(async () => {
                await updateCost(cost.id, formData)
                setIsEditing(false)
              })
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Beschreibung</label>
                <input 
                  type="text" 
                  name="description" 
                  defaultValue={cost.description}
                  required 
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Betrag (€)</label>
                <input 
                  type="number" 
                  name="amount" 
                  defaultValue={(cost.amountCent / 100).toFixed(2)}
                  step="0.01" 
                  min="0"
                  required 
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Abrechnungsintervall</label>
                <select name="calculationType" defaultValue={cost.calculationType} required className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  <option value="PER_MONTH">Pro Monat</option>
                  <option value="PER_STAY">Pro Aufenthalt</option>
                  <option value="PER_NIGHT">Pro Nacht</option>
                  <option value="FLAT">Einmalig</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Steuersatz</label>
                  <select name="taxRate" defaultValue={cost.taxRate.toString()} required className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    <option value="19">19% Mehrwertsteuer</option>
                    <option value="7">7% Mehrwertsteuer</option>
                    <option value="0">0% (z.B. Kleinunternehmer)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Betragstyp</label>
                  <select name="isGross" defaultValue={cost.isGross.toString()} required className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    <option value="true">Brutto (inkl. MwSt)</option>
                    <option value="false">Netto (exkl. MwSt)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Abbrechen
                </button>
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50"
                >
                  Speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
