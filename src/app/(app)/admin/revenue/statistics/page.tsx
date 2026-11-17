import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { getMonthYear, splitReservationNightsByMonth } from "@/lib/revenue/calculations"
import { FilterSelectors } from "@/components/admin/revenue/FilterSelectors"
import Link from "next/link"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Statistiken (Jahresauswertung) | Revenue Dashboard",
}

export default async function StatisticsDashboard(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const currentYearStr = new Date().getFullYear().toString()
  const requestedYear = typeof searchParams.year === 'string' ? searchParams.year : currentYearStr
  const propertyFilter = typeof searchParams.propertyId === 'string' ? searchParams.propertyId : 'all'

  // Fetch properties for filter
  const allProperties = await prisma.property.findMany({ 
    where: { status: "active" },
    orderBy: { name: 'asc' }
  })
  
  const propertiesForDropdown = allProperties.map(p => ({ id: p.id, name: p.name }))

  // Date boundaries for the selected year
  const yearStart = new Date(`${requestedYear}-01-01T00:00:00`)
  const yearEnd = new Date(`${requestedYear}-12-31T23:59:59`)

  // Get all reservations that might overlap with this year
  const reservations = await prisma.reservation.findMany({
    where: {
      isCancelled: false,
      checkIn: { lte: yearEnd },
      checkOut: { gte: yearStart }
    },
    include: { financials: true }
  })

  // Per property stats tracking
  const propertyStats = allProperties.map(p => ({ 
    id: p.id, 
    name: p.name, 
    payoutCent: 0, 
    netPayoutCent: 0, 
    costsCent: 0, 
    netCostsCent: 0, 
    occupiedNights: 0,
    checkouts: 0
  }))
  const propStatsMap = new Map(propertyStats.map(s => [s.id, s]))

  // We need to track checkouts in the selected year to calculate PER_STAY costs
  const checkoutsPerProperty = new Map<string, number>()

  for (const res of reservations) {
    if (propertyFilter !== 'all' && res.propertyId !== propertyFilter) continue

    const checkOutYear = res.checkOut.getFullYear().toString()
    
    // Track checkouts for PER_STAY costs
    if (checkOutYear === requestedYear) {
      checkoutsPerProperty.set(res.propertyId, (checkoutsPerProperty.get(res.propertyId) || 0) + 1)
      const stats = propStatsMap.get(res.propertyId)
      if (stats) stats.checkouts++
    }

    const nightsByMonth = splitReservationNightsByMonth(res.checkIn, res.checkOut)
    
    // Count occupied nights in the selected year
    let nightsInYear = 0
    for (const [month, nights] of Object.entries(nightsByMonth)) {
      if (month.startsWith(requestedYear)) {
        nightsInYear += nights
      }
    }

    if (nightsInYear > 0) {
      const stats = propStatsMap.get(res.propertyId)
      if (stats) {
        stats.occupiedNights += nightsInYear
      }
    }

    if (!res.financials) continue
    
    const totalNights = Object.values(nightsByMonth).reduce((a, b) => a + b, 0)
    for (const [month, nights] of Object.entries(nightsByMonth)) {
      if (nights > 0 && totalNights > 0 && month.startsWith(requestedYear)) {
        const fraction = nights / totalNights
        const amount = Math.round(res.financials.payoutCent * fraction)
        const netAmount = Math.round(amount / 1.07) // Revenue has 7% VAT
        
        const stats = propStatsMap.get(res.propertyId)
        if (stats) {
          stats.payoutCent += amount
          stats.netPayoutCent += netAmount
        }
      }
    }
  }

  // Calculate Costs for the selected year
  const allCosts = await prisma.propertyCost.findMany({
    where: { isActive: true },
    include: { category: true }
  })

  const getNetCost = (cost: any, amountCent: number) => {
    if (!cost.isGross) return amountCent
    return Math.round(amountCent / (1 + (cost.taxRate || 0) / 100))
  }

  // For PER_MONTH costs, we need to add the cost for each month in the selected year where the cost is valid
  const monthsInYear = Array.from({ length: 12 }, (_, i) => `${requestedYear}-${String(i + 1).padStart(2, '0')}`)

  for (const cost of allCosts) {
    if (propertyFilter !== 'all' && cost.propertyId !== propertyFilter) continue

    const costStartMonth = getMonthYear(cost.validFrom)
    const costEndMonth = cost.validTo ? getMonthYear(cost.validTo) : "9999-12"
    const stats = propStatsMap.get(cost.propertyId)
    if (!stats) continue

    if (cost.calculationType === 'PER_MONTH') {
      for (const month of monthsInYear) {
        if (month >= costStartMonth && month <= costEndMonth) {
          const netCost = getNetCost(cost, cost.amountCent)
          stats.costsCent += cost.amountCent
          stats.netCostsCent += netCost
        }
      }
    } else if (cost.calculationType === 'PER_STAY') {
      // Calculate PER_STAY costs based on checkouts in the selected year
      // Since cost validity might change mid-year, a proper check would verify checkout date against cost valid dates.
      // For simplicity in yearly stats, we apply the cost if it's valid for at least some part of the year.
      const costStartYear = costStartMonth.substring(0, 4)
      const costEndYear = costEndMonth.substring(0, 4)
      
      if (requestedYear >= costStartYear && requestedYear <= costEndYear) {
        const checkoutsForProp = checkoutsPerProperty.get(cost.propertyId) || 0
        const totalCost = cost.amountCent * checkoutsForProp
        const netCost = getNetCost(cost, totalCost)
        stats.costsCent += totalCost
        stats.netCostsCent += netCost
      }
    }
  }

  // Aggregate totals
  let totalNetPayout = 0
  let totalNetCosts = 0
  let totalNights = 0

  for (const stats of propertyStats) {
    if (propertyFilter !== 'all' && stats.id !== propertyFilter) continue
    totalNetPayout += stats.netPayoutCent
    totalNetCosts += stats.netCostsCent
    totalNights += stats.occupiedNights
  }

  const totalProfit = totalNetPayout - totalNetCosts

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif">Statistiken & Jahresauswertung</h1>
          <p className="text-muted-foreground mt-1">Umsatz und Gewinn für {requestedYear}</p>
        </div>
        <div className="pt-2 md:pt-0">
          <FilterSelectors 
            currentYear={requestedYear} 
            currentPropertyId={propertyFilter} 
            properties={propertiesForDropdown} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-background border border-border p-4 md:p-6 rounded-2xl shadow-sm">
          <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1 md:mb-2">Jahresumsatz (Netto)</h3>
          <p className="text-2xl md:text-4xl font-bold">€ {(totalNetPayout / 100).toFixed(2)}</p>
          <div className="mt-1 md:mt-2 text-xs md:text-sm text-muted-foreground">
            Aus {totalNights} gebuchten Nächten
          </div>
        </div>

        <div className="bg-background border border-border p-4 md:p-6 rounded-2xl shadow-sm">
          <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1 md:mb-2">Jahreskosten (Netto)</h3>
          <p className="text-2xl md:text-4xl font-bold">€ {(totalNetCosts / 100).toFixed(2)}</p>
          <div className="mt-1 md:mt-2 text-xs md:text-sm text-muted-foreground">
            Fixkosten und Aufenthaltskosten
          </div>
        </div>

        <div className="bg-background border border-border p-4 md:p-6 rounded-2xl shadow-sm">
          <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1 md:mb-2">Jahresgewinn (Netto)</h3>
          <p className={`text-2xl md:text-4xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            € {(totalProfit / 100).toFixed(2)}
          </p>
          <div className="mt-1 md:mt-2 text-xs md:text-sm text-muted-foreground">
            Nach Abzug aller erfassten Kosten
          </div>
        </div>
      </div>

      {propertyFilter === 'all' && (
        <div className="bg-background border border-border p-6 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold mb-4">Aufschlüsselung nach Wohnungen</h3>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-3 font-medium">Wohnung</th>
                  <th className="pb-3 font-medium text-center">Nächte ({requestedYear})</th>
                  <th className="pb-3 font-medium text-right">Umsatz (Netto)</th>
                  <th className="pb-3 font-medium text-right">Kosten (Netto)</th>
                  <th className="pb-3 font-medium text-right">Gewinn (Netto)</th>
                </tr>
              </thead>
              <tbody>
                {propertyStats.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-muted-foreground">Keine aktiven Wohnungen gefunden.</td>
                  </tr>
                ) : (
                  propertyStats.map(stat => {
                    const profit = stat.netPayoutCent - stat.netCostsCent
                    
                    return (
                      <tr key={stat.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-3">
                          <Link href={`/admin/revenue/properties/${stat.id}`} className="font-medium hover:text-primary transition-colors">
                            {stat.name}
                          </Link>
                        </td>
                        <td className="py-3 text-center">
                          {stat.occupiedNights} Nächte
                        </td>
                        <td className="py-3 text-right">
                          € {(stat.netPayoutCent / 100).toFixed(2)}
                        </td>
                        <td className="py-3 text-right">
                          € {(stat.netCostsCent / 100).toFixed(2)}
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
      )}
    </div>
  )
}
