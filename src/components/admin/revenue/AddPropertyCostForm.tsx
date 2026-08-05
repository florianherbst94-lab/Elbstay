"use client"

import { useState } from "react"
import { createCost } from "@/app/(app)/admin/revenue/costs/actions"
import { useFormStatus } from "react-dom"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {pending ? "Speichere..." : "Kosten speichern"}
    </button>
  )
}

export function AddPropertyCostForm({ 
  propertyId, 
  categories 
}: { 
  propertyId: string, 
  categories: { id: string, name: string, type: string }[] 
}) {
  const [isNewCategory, setIsNewCategory] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isExpanded) {
    return (
      <button 
        onClick={() => setIsExpanded(true)}
        className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:text-primary hover:border-primary transition-colors font-medium flex items-center justify-center gap-2"
      >
        <span>+</span> Neue Kosten erfassen
      </button>
    )
  }

  return (
    <div className="bg-muted/30 border border-border p-5 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold">Kosten hinzufügen</h4>
        <button 
          onClick={() => setIsExpanded(false)}
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Abbrechen
        </button>
      </div>

      <form action={createCost} className="space-y-4 text-sm">
        <input type="hidden" name="propertyId" value={propertyId} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="font-medium">Kategorie</label>
              <button 
                type="button"
                onClick={() => setIsNewCategory(!isNewCategory)}
                className="text-xs text-primary hover:underline"
              >
                {isNewCategory ? "Bestehende wählen" : "Neue Kategorie anlegen"}
              </button>
            </div>
            
            {isNewCategory ? (
              <div className="space-y-2">
                <input 
                  type="text" 
                  name="newCategoryName" 
                  placeholder="Name der Kategorie..." 
                  required 
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
                <select name="newCategoryType" required className="w-full rounded-lg border border-border bg-background px-3 py-2 text-muted-foreground">
                  <option value="FIXED_MONTHLY">Fixkosten pro Monat</option>
                  <option value="VARIABLE">Variabel</option>
                  <option value="ONETIME">Einmalig</option>
                </select>
                <input type="hidden" name="categoryId" value="NEW" />
              </div>
            ) : (
              <select name="categoryId" required className="w-full rounded-lg border border-border bg-background px-3 py-2">
                <option value="">Bitte wählen...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
          </div>
          
          <div>
            <label className="block font-medium mb-1">Beschreibung</label>
            <input 
              type="text" 
              name="description" 
              required 
              placeholder="z.B. Internet Tarif M" 
              className="w-full rounded-lg border border-border bg-background px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Betrag (€)</label>
            <input 
              type="number" 
              name="amount" 
              step="0.01" 
              min="0"
              required 
              placeholder="0.00" 
              className="w-full rounded-lg border border-border bg-background px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Abrechnungsintervall</label>
            <select name="calculationType" required className="w-full rounded-lg border border-border bg-background px-3 py-2">
              <option value="PER_MONTH">Pro Monat</option>
              <option value="PER_STAY">Pro Aufenthalt</option>
              <option value="PER_NIGHT">Pro Nacht</option>
              <option value="FLAT">Einmalig</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Gültig ab</label>
            <input 
              type="date" 
              name="validFrom" 
              required 
              className="w-full rounded-lg border border-border bg-background px-3 py-2"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}
