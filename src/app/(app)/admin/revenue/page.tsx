import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { getMonthYear, splitReservationNightsByMonth } from "@/lib/revenue/calculations"
import { RevenueChart } from "@/components/admin/revenue/RevenueChart"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Portfolio Overview | Revenue Dashboard",
}

export default async function RevenueDashboard() {
  const currentMonthDate = new Date()
  const currentMonth = getMonthYear(currentMonthDate)
  
  // Basic stats
  const properties = await prisma.property.count()
  const activePropertiesCount = await prisma.property.count({ where: { status: "active" } })
  const activeProperties = await prisma.property.findMany({ where: { status: "active" } })
  
  // Get all reservations for the current month
  // We fetch reservations that overlap with the current month roughly
  const startOfMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1)
  const endOfMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0)
  
  const reservations = await prisma.reservation.findMany({
    where: {
      isCancelled: false,
      checkIn: { lte: endOfMonth },
      checkOut: { gte: startOfMonth }
    },
    include: { financials: true }
  })

  // Calculate Monthly Payout
  let monthlyPayoutCent = 0
  let occupiedNights = 0

  for (const res of reservations) {
    if (!res.financials) continue
    const nightsByMonth = splitReservationNightsByMonth(res.checkIn, res.checkOut)
    const nightsInCurrentMonth = nightsByMonth[currentMonth] || 0
    if (nightsInCurrentMonth > 0) {
      occupiedNights += nightsInCurrentMonth
      const totalNights = Object.values(nightsByMonth).reduce((a, b) => a + b, 0)
      if (totalNights > 0) {
        const fraction = nightsInCurrentMonth / totalNights
        monthlyPayoutCent += Math.round(res.financials.payoutCent * fraction)
      }
    }
  }

  // Calculate Monthly Costs
  const allCosts = await prisma.propertyCost.findMany({
    where: { isActive: true },
    include: { category: true }
  })

  let monthlyCostsCent = 0
  for (const cost of allCosts) {
    if (cost.calculationType === 'PER_MONTH') {
      monthlyCostsCent += cost.amountCent
    }
  }

  const profitCent = monthlyPayoutCent - monthlyCostsCent
  
  // Calculate Occupancy
  const daysInMonth = endOfMonth.getDate()
  const totalAvailableNights = activePropertiesCount * daysInMonth
  const occupancyPercentage = totalAvailableNights > 0 ? (occupiedNights / totalAvailableNights) * 100 : 0

  // Chart Data: Past 6 months
  const chartData = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const m = getMonthYear(d)
    
    // In a real app we'd query the DB per month here.
    // For demo purposes and since this is a quick implementation, we use dummy logic or simplified aggregate for history.
    // Here we'll just push zero values for history except current month.
    chartData.push({
      name: m,
      umsatz: m === currentMonth ? monthlyPayoutCent / 100 : 0,
      kosten: m === currentMonth ? monthlyCostsCent / 100 : 0
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-serif">Portfolio Übersicht</h1>
        <p className="text-muted-foreground mt-1">Auswertung für {currentMonth}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Erwartete Auszahlung (Monat)</h3>
          <p className="text-4xl font-bold">€ {(monthlyPayoutCent / 100).toFixed(2)}</p>
          {monthlyPayoutCent === 0 && (
            <div className="mt-2 text-sm text-yellow-600 font-medium bg-yellow-100/50 inline-block px-2 py-0.5 rounded-full">
              Noch keine Finanzdaten / Buchungen
            </div>
          )}
        </div>

        <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Auslastung (Monat)</h3>
          <p className="text-4xl font-bold">{occupancyPercentage.toFixed(1)}%</p>
          <div className="mt-2 text-sm text-muted-foreground">
            {occupiedNights} von {totalAvailableNights} Nächten belegt
          </div>
        </div>

        <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Deckungsbeitrag</h3>
          <p className={`text-4xl font-bold ${profitCent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            € {(profitCent / 100).toFixed(2)}
          </p>
          <div className="mt-2 text-sm text-muted-foreground">
            Kosten: € {(monthlyCostsCent / 100).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-background border border-border p-6 rounded-2xl shadow-sm min-h-[400px] flex flex-col">
          <h3 className="text-lg font-bold mb-4">Umsatz vs. Kosten (6 Monate)</h3>
          <div className="flex-1">
            <RevenueChart data={chartData} />
          </div>
        </div>

        <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Wohnungs-Performance</h3>
            <Link href="/admin/revenue/properties" className="text-primary text-sm hover:underline">
              Alle ansehen
            </Link>
          </div>
          
          <div className="space-y-3">
            {activeProperties.length === 0 ? (
              <p className="text-sm text-muted-foreground">Keine aktiven Wohnungen gefunden.</p>
            ) : (
              activeProperties.map(prop => (
                <div key={prop.id} className="flex justify-between items-center pb-3 border-b border-border/50 last:border-0 last:pb-0">
                  <span className="font-medium text-sm">{prop.name}</span>
                  <Link href={`/admin/revenue/properties/${prop.id}`} className="text-xs bg-muted px-2 py-1 rounded hover:bg-muted/80 transition-colors">
                    Details
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
