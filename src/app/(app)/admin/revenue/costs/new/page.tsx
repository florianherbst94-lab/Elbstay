import { Metadata } from "next"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createCost } from "../actions"

export const metadata: Metadata = {
  title: "Neue Kosten | Revenue Dashboard",
}

async function ensureDefaultCategories() {
  const count = await prisma.costCategory.count()
  if (count === 0) {
    await prisma.costCategory.createMany({
      data: [
        { name: "Miete / Pacht", type: "FIXED_MONTHLY" },
        { name: "Strom", type: "FIXED_MONTHLY" },
        { name: "WLAN", type: "FIXED_MONTHLY" },
        { name: "Reinigung", type: "VARIABLE" },
        { name: "Wäsche", type: "VARIABLE" },
        { name: "Reparaturen", type: "ONETIME" },
      ]
    })
  }
}

export default async function NewCostPage() {
  await ensureDefaultCategories()
  
  const properties = await prisma.property.findMany({ orderBy: { name: 'asc' } })
  const categories = await prisma.costCategory.findMany({ orderBy: { name: 'asc' } })

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <Link href="/admin/revenue/costs" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Zurück
        </Link>
        <h1 className="text-3xl font-bold font-serif">Neue Kosten anlegen</h1>
      </div>

      <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
        <form action={createCost} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Wohnung</label>
              <select name="propertyId" required className="w-full rounded-xl border border-border bg-background px-4 py-2">
                <option value="">Bitte wählen...</option>
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Kategorie</label>
              <select name="categoryId" required className="w-full rounded-xl border border-border bg-background px-4 py-2">
                <option value="">Bitte wählen...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.type})</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Beschreibung</label>
            <input 
              type="text" 
              name="description" 
              required 
              placeholder="z.B. Monatliche Grundmiete" 
              className="w-full rounded-xl border border-border bg-background px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Betrag (€)</label>
              <input 
                type="number" 
                name="amount" 
                step="0.01" 
                min="0"
                required 
                placeholder="100.00" 
                className="w-full rounded-xl border border-border bg-background px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Berechnungsart</label>
              <select name="calculationType" required className="w-full rounded-xl border border-border bg-background px-4 py-2">
                <option value="PER_MONTH">Pro Monat</option>
                <option value="PER_NIGHT">Pro Nacht</option>
                <option value="PER_STAY">Pro Aufenthalt</option>
                <option value="FLAT">Einmalig</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gültig ab</label>
              <input 
                type="date" 
                name="validFrom" 
                required 
                className="w-full rounded-xl border border-border bg-background px-4 py-2"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity">
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
