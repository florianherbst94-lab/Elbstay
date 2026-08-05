import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AddPropertyCostForm } from "@/components/admin/revenue/AddPropertyCostForm"
import { getMonthYear, splitReservationNightsByMonth } from "@/lib/revenue/calculations"

export const metadata: Metadata = {
  title: "Wohnung Details | Revenue Dashboard",
}

export default async function PropertyDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      reservations: {
        orderBy: { checkIn: 'desc' },
        take: 5,
        include: {
          financials: true
        }
      },
      costs: {
        where: { isActive: true },
        include: { category: true }
      }
    }
  })

  if (!property) {
    notFound()
  }

  const currentMonthDate = new Date()
  const currentMonth = getMonthYear(currentMonthDate)
  
  const startOfMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1)
  const endOfMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0)
  
  // Calculate revenue for current month
  const activeReservations = await prisma.reservation.findMany({
    where: {
      propertyId: property.id,
      isCancelled: false,
      checkIn: { lte: endOfMonth },
      checkOut: { gte: startOfMonth }
    },
    include: { financials: true }
  })

  let monthlyPayoutCent = 0
  let checkoutsThisMonth = 0

  for (const res of activeReservations) {
    if (getMonthYear(res.checkOut) === currentMonth) {
      checkoutsThisMonth++
    }

    if (!res.financials) continue
    const nightsByMonth = splitReservationNightsByMonth(res.checkIn, res.checkOut)
    const nightsInCurrentMonth = nightsByMonth[currentMonth] || 0
    if (nightsInCurrentMonth > 0) {
      const totalNights = Object.values(nightsByMonth).reduce((a, b) => a + b, 0)
      if (totalNights > 0) {
        const fraction = nightsInCurrentMonth / totalNights
        monthlyPayoutCent += Math.round(res.financials.payoutCent * fraction)
      }
    }
  }

  // Calculate costs for current month
  let monthlyFixedCostsCent = 0
  let variableCostsCent = 0

  for (const cost of property.costs) {
    if (cost.calculationType === 'PER_MONTH') {
      monthlyFixedCostsCent += cost.amountCent
    } else if (cost.calculationType === 'PER_STAY') {
      variableCostsCent += cost.amountCent * checkoutsThisMonth
    }
  }

  const totalMonthlyCostsCent = monthlyFixedCostsCent + variableCostsCent
  const profitCent = monthlyPayoutCent - totalMonthlyCostsCent

  const categories = await prisma.costCategory.findMany({ orderBy: { name: 'asc' } })

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/revenue/properties" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Zurück zur Übersicht
        </Link>
        <h1 className="text-3xl font-bold font-serif">{property.name}</h1>
        <p className="text-muted-foreground mt-1">Details und Auswertungen</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Einnahmen ({currentMonth})</h3>
          <p className="text-3xl font-bold">€ {(monthlyPayoutCent / 100).toFixed(2)}</p>
        </div>
        <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Kosten ({currentMonth})</h3>
          <p className="text-3xl font-bold">€ {(totalMonthlyCostsCent / 100).toFixed(2)}</p>
          <div className="text-xs text-muted-foreground mt-1">
            Fix: € {(monthlyFixedCostsCent/100).toFixed(2)} | Variabel: € {(variableCostsCent/100).toFixed(2)}
          </div>
        </div>
        <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Gewinn ({currentMonth})</h3>
          <p className={`text-3xl font-bold ${profitCent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            € {(profitCent / 100).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold mb-4">Stammdaten</h3>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3">
              <span className="text-muted-foreground">Status</span>
              <span className="col-span-2 font-medium">{property.status === 'active' ? 'Aktiv' : 'Inaktiv'}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-muted-foreground">Hospitable ID</span>
              <span className="col-span-2 font-mono text-xs">{property.hospitableId}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-muted-foreground">Adresse</span>
              <span className="col-span-2">{property.address || '-'}</span>
            </div>
          </div>
        </div>

        <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Laufende Kosten</h3>
            <Link href={`/admin/revenue/costs?property=${property.id}`} className="text-primary text-sm hover:underline">
              Verwalten
            </Link>
          </div>
          {property.costs.length === 0 ? (
            <p className="text-sm text-muted-foreground mb-4">Keine aktiven Kosten hinterlegt.</p>
          ) : (
            <ul className="space-y-2 mb-6">
              {property.costs.map(cost => (
                <li key={cost.id} className="flex justify-between text-sm items-center border-b border-border/50 pb-2 last:border-0">
                  <span>{cost.description} <span className="text-xs text-muted-foreground">({cost.category.name})</span></span>
                  <span className="font-medium">
                    € {(cost.amountCent / 100).toFixed(2)}
                    {cost.calculationType === 'PER_STAY' ? ' / Aufenthalt' : cost.calculationType === 'PER_NIGHT' ? ' / Nacht' : ' / Monat'}
                  </span>
                </li>
              ))}
            </ul>
          )}
          
          <AddPropertyCostForm propertyId={property.id} categories={categories} />
        </div>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Letzte Buchungen</h3>
          <Link href={`/admin/revenue/bookings?property=${property.id}`} className="text-primary text-sm hover:underline">
            Alle ansehen
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-3 font-medium">Datum</th>
                <th className="pb-3 font-medium">Plattform</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Auszahlung</th>
              </tr>
            </thead>
            <tbody>
              {property.reservations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-muted-foreground">Keine Buchungen vorhanden.</td>
                </tr>
              ) : (
                property.reservations.map(res => (
                  <tr key={res.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3">
                      {res.checkIn.toLocaleDateString('de-DE')} - {res.checkOut.toLocaleDateString('de-DE')}
                      <div className="text-xs text-muted-foreground">{res.nights} Nächte</div>
                    </td>
                    <td className="py-3">{res.platform || '-'}</td>
                    <td className="py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs ${
                        res.isCancelled ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-medium">
                      {res.financials?.payoutCent 
                        ? `€ ${(res.financials.payoutCent / 100).toFixed(2)}` 
                        : '-'}
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
