import { Metadata } from "next"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { CostActionButtons } from "@/components/admin/revenue/CostActionButtons"

export const metadata: Metadata = {
  title: "Kostenverwaltung | Revenue Dashboard",
}

export default async function CostsPage(props: { searchParams?: Promise<{ property?: string }> }) {
  const searchParams = await props.searchParams
  const propertyId = searchParams?.property

  const where = propertyId ? { propertyId } : {}

  const costs = await prisma.propertyCost.findMany({
    where,
    include: {
      property: { select: { name: true } },
      category: true
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-serif">Kostenverwaltung</h1>
          <p className="text-muted-foreground mt-1">Laufende und einmalige Kosten</p>
        </div>
        <Link href="/admin/revenue/costs/new" className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
          + Neue Kosten
        </Link>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-muted-foreground">
                <th className="p-4 font-medium">Beschreibung</th>
                <th className="p-4 font-medium">Wohnung</th>
                <th className="p-4 font-medium">Kategorie</th>
                <th className="p-4 font-medium">Typ</th>
                <th className="p-4 font-medium">Betrag</th>
                <th className="p-4 font-medium text-right">Status</th>
                <th className="p-4 font-medium text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {costs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">Keine Kosten gefunden.</td>
                </tr>
              ) : (
                costs.map(cost => (
                  <tr key={cost.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{cost.description}</td>
                    <td className="p-4">{cost.property.name}</td>
                    <td className="p-4">
                      <span className="bg-muted px-2 py-1 rounded text-xs">
                        {cost.category.name}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{cost.calculationType}</td>
                    <td className="p-4 font-medium">€ {(cost.amountCent / 100).toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        cost.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {cost.isActive ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end">
                      <CostActionButtons cost={cost} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
