import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { getMonthYear, splitReservationNightsByMonth } from "@/lib/revenue/calculations"
import { RevenueChart } from "@/components/admin/revenue/RevenueChart"
import { MonthSelector } from "@/components/admin/revenue/MonthSelector"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Portfolio Overview | Revenue Dashboard",
}

export default async function RevenueDashboard(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const requestedMonth = typeof searchParams.month === 'string' ? searchParams.month : getMonthYear(new Date())
  const selectedDate = new Date(`${requestedMonth}-01T00:00:00`)
  
  const currentMonthDate = isNaN(selectedDate.getTime()) ? new Date() : selectedDate
  const currentMonth = getMonthYear(currentMonthDate)
  
  const availableMonths = []
  for (let i = -2; i < 12; i++) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    availableMonths.push({
      value: getMonthYear(d),
      label: d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
    })
  }
  
  // Basic stats
  const properties = await prisma.property.count()
  const activePropertiesCount = await prisma.property.count({ where: { status: "active" } })
  const activeProperties = await prisma.property.findMany({ where: { status: "active" } })
  
  // Get all reservations for the past 6 months
  const past6MonthsDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 5, 1)
  const startOfMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1)
  const endOfMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0)
  
  const reservations = await prisma.reservation.findMany({
    where: {
      isCancelled: false,
      checkIn: { lte: endOfMonth },
      checkOut: { gte: past6MonthsDate }
    },
    include: { financials: true }
  })

  // Initialize historical data
  const monthlyData: Record<string, { payoutCent: number, costsCent: number }> = {}
  const chartData = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - i, 1)
    const m = getMonthYear(d)
    monthlyData[m] = { payoutCent: 0, costsCent: 0 }
    chartData.push({ name: m, umsatz: 0, kosten: 0 })
  }

  // Per property stats tracking (current month)
  const propertyStats = activeProperties.map(p => ({ id: p.id, name: p.name, payoutCent: 0, costsCent: 0, fixedCostsCent: 0, variableCostsCent: 0, checkouts: 0 }))
  const propStatsMap = new Map(propertyStats.map(s => [s.id, s]))

  // Track checkouts per month per property for PER_STAY costs
  const checkoutsPerMonthProperty = new Map<string, Map<string, number>>()

  let occupiedNights = 0

  for (const res of reservations) {
    const checkOutMonth = getMonthYear(res.checkOut)
    
    // For property stats (current month)
    if (checkOutMonth === currentMonth) {
      const stats = propStatsMap.get(res.propertyId)
      if (stats) stats.checkouts++
    }
    
    // For historical charts (PER_STAY checkouts)
    if (monthlyData[checkOutMonth]) {
      if (!checkoutsPerMonthProperty.has(checkOutMonth)) checkoutsPerMonthProperty.set(checkOutMonth, new Map())
      const monthMap = checkoutsPerMonthProperty.get(checkOutMonth)!
      monthMap.set(res.propertyId, (monthMap.get(res.propertyId) || 0) + 1)
    }

    const nightsByMonth = splitReservationNightsByMonth(res.checkIn, res.checkOut)
    
    // Occupied nights in current month
    const nightsInCurrentMonth = nightsByMonth[currentMonth] || 0
    if (nightsInCurrentMonth > 0) {
      occupiedNights += nightsInCurrentMonth
    }

    if (!res.financials) continue
    
    const totalNights = Object.values(nightsByMonth).reduce((a, b) => a + b, 0)
    for (const [month, nights] of Object.entries(nightsByMonth)) {
      if (nights > 0 && totalNights > 0 && monthlyData[month]) {
        const fraction = nights / totalNights
        const amount = Math.round(res.financials.payoutCent * fraction)
        
        // Add to historical chart data
        monthlyData[month].payoutCent += amount
        
        // Add to current month property stats
        if (month === currentMonth) {
          const stats = propStatsMap.get(res.propertyId)
          if (stats) stats.payoutCent += amount
        }
      }
    }
  }

  // Calculate Monthly Costs
  const allCosts = await prisma.propertyCost.findMany({
    where: { isActive: true },
    include: { category: true }
  })

  for (const month of Object.keys(monthlyData)) {
    for (const cost of allCosts) {
      const costStartMonth = getMonthYear(cost.validFrom)
      const costEndMonth = cost.validTo ? getMonthYear(cost.validTo) : "9999-12"
      
      if (month >= costStartMonth && month <= costEndMonth) {
        if (cost.calculationType === 'PER_MONTH') {
          monthlyData[month].costsCent += cost.amountCent
          
          if (month === currentMonth) {
             const stats = propStatsMap.get(cost.propertyId)
             if (stats) {
               stats.costsCent += cost.amountCent
               stats.fixedCostsCent += cost.amountCent
             }
          }
        } else if (cost.calculationType === 'PER_STAY') {
          const checkoutsForProp = checkoutsPerMonthProperty.get(month)?.get(cost.propertyId) || 0
          const totalCost = cost.amountCent * checkoutsForProp
          monthlyData[month].costsCent += totalCost
          
          if (month === currentMonth) {
            const stats = propStatsMap.get(cost.propertyId)
            if (stats) {
              stats.costsCent += totalCost
              stats.variableCostsCent += totalCost
            }
          }
        }
      }
    }
  }

  // Map historical data back to chartData
  for (const item of chartData) {
    if (monthlyData[item.name]) {
      item.umsatz = monthlyData[item.name].payoutCent / 100
      item.kosten = monthlyData[item.name].costsCent / 100
    }
  }

  const monthlyPayoutCent = monthlyData[currentMonth]?.payoutCent || 0
  const monthlyCostsCent = monthlyData[currentMonth]?.costsCent || 0
  const profitCent = monthlyPayoutCent - monthlyCostsCent
  
  // Calculate Occupancy
  const daysInMonth = endOfMonth.getDate()
  const totalAvailableNights = activePropertiesCount * daysInMonth
  const occupancyPercentage = totalAvailableNights > 0 ? (occupiedNights / totalAvailableNights) * 100 : 0

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif">Portfolio Übersicht</h1>
          <p className="text-muted-foreground mt-1">Auswertung für {currentMonth}</p>
        </div>
        <div className="pt-2 md:pt-0">
          <MonthSelector currentMonth={currentMonth} availableMonths={availableMonths} />
        </div>
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

        <div className="bg-background border border-border p-6 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Wohnungs-Performance</h3>
            <Link href="/admin/revenue/properties" className="text-primary text-sm hover:underline">
              Alle ansehen
            </Link>
          </div>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-3 font-medium">Wohnung</th>
                  <th className="pb-3 font-medium text-center">Aufenthalte</th>
                  <th className="pb-3 font-medium text-right">Einnahmen</th>
                  <th className="pb-3 font-medium text-right">Kosten</th>
                  <th className="pb-3 font-medium text-right">Gewinn</th>
                </tr>
              </thead>
              <tbody>
                {propertyStats.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-muted-foreground">Keine aktiven Wohnungen gefunden.</td>
                  </tr>
                ) : (
                  propertyStats.map(stat => {
                    const profit = stat.payoutCent - stat.costsCent
                    return (
                      <tr key={stat.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-3">
                          <Link href={`/admin/revenue/properties/${stat.id}`} className="font-medium hover:text-primary transition-colors">
                            {stat.name}
                          </Link>
                        </td>
                        <td className="py-3 text-center">{stat.checkouts}</td>
                        <td className="py-3 text-right">€ {(stat.payoutCent / 100).toFixed(2)}</td>
                        <td className="py-3 text-right">
                          <div className="font-medium">€ {(stat.costsCent / 100).toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">
                            Fix: {(stat.fixedCostsCent / 100).toFixed(0)} | Var: {(stat.variableCostsCent / 100).toFixed(0)}
                          </div>
                        </td>
                        <td className={`py-3 text-right font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          € {(profit / 100).toFixed(2)}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
