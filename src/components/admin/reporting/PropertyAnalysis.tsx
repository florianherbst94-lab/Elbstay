import { MonthlyPropertyStats, AggregatedStats } from "@/lib/revenue/reporting"
import { Home, Percent, TrendingUp } from "lucide-react"

interface PropertyPerformance {
  propertyId: string
  propertyName: string
  stats: AggregatedStats
  monthlyDetails: MonthlyPropertyStats[]
}

export function PropertyAnalysis({ data, overall }: { data: PropertyPerformance[], overall: AggregatedStats }) {
  
  const formatEuro = (cents: number) => `€ ${(cents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const formatPercent = (val: number) => `${val.toFixed(1)} %`

  if (data.length === 0) return null

  // Sort by profit descending
  const sortedData = [...data].sort((a, b) => b.stats.profitCent - a.stats.profitCent)

  return (
    <div className="space-y-8 mb-8">
      {/* Property Comparison Table */}
      <div className="bg-background border border-border rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Home className="w-5 h-5 text-primary" /> Portfolio Vergleich
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-3 font-medium px-2">Ferienwohnung</th>
                <th className="pb-3 font-medium text-right px-2">Anteil</th>
                <th className="pb-3 font-medium text-right px-2">Einnahmen</th>
                <th className="pb-3 font-medium text-right px-2">Kosten</th>
                <th className="pb-3 font-medium text-right px-2">Gewinn</th>
                <th className="pb-3 font-medium text-right px-2">Marge</th>
                <th className="pb-3 font-medium text-right px-2">Auslastung</th>
                <th className="pb-3 font-medium text-right px-2">RevPAR</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((prop) => {
                const revenueShare = overall.netRevenueCent > 0 ? (prop.stats.netRevenueCent / overall.netRevenueCent) * 100 : 0
                return (
                  <tr key={prop.propertyId} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 font-medium">{prop.propertyName}</td>
                    <td className="py-3 px-2 text-right text-muted-foreground">{formatPercent(revenueShare)}</td>
                    <td className="py-3 px-2 text-right">{formatEuro(prop.stats.netRevenueCent)}</td>
                    <td className="py-3 px-2 text-right text-muted-foreground">{formatEuro(prop.stats.netTotalCostsCent)}</td>
                    <td className={`py-3 px-2 text-right font-bold ${prop.stats.profitCent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatEuro(prop.stats.profitCent)}
                    </td>
                    <td className="py-3 px-2 text-right">{formatPercent(prop.stats.margin)}</td>
                    <td className="py-3 px-2 text-right">{formatPercent(prop.stats.occupancy)}</td>
                    <td className="py-3 px-2 text-right text-muted-foreground">{formatEuro(prop.stats.revParCent)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Property Cards */}
      <h3 className="text-xl font-bold font-serif pt-4">Detaillierte Objektanalysen</h3>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {sortedData.map((prop) => (
          <div key={prop.propertyId} className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="bg-muted/30 p-5 border-b border-border">
              <h4 className="text-lg font-bold">{prop.propertyName}</h4>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" /> Gewinn: <strong className="text-foreground">{formatEuro(prop.stats.profitCent)}</strong>
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Percent className="w-4 h-4" /> Marge: <strong className="text-foreground">{formatPercent(prop.stats.margin)}</strong>
                </span>
              </div>
            </div>
            
            <div className="p-5 flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="pb-2 font-medium px-2">Monat</th>
                    <th className="pb-2 font-medium text-right px-2">Einnahmen</th>
                    <th className="pb-2 font-medium text-right px-2">Kosten</th>
                    <th className="pb-2 font-medium text-right px-2">Gewinn</th>
                    <th className="pb-2 font-medium text-right px-2">Auslastung</th>
                  </tr>
                </thead>
                <tbody>
                  {prop.monthlyDetails.map(month => (
                    <tr key={month.month} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="py-2 px-2">{month.month}</td>
                      <td className="py-2 px-2 text-right">{formatEuro(month.netRevenueCent)}</td>
                      <td className="py-2 px-2 text-right text-muted-foreground">{formatEuro(month.netFixedCostsCent + month.netVariableCostsCent)}</td>
                      <td className={`py-2 px-2 text-right font-medium ${month.netRevenueCent - (month.netFixedCostsCent + month.netVariableCostsCent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                         {formatEuro(month.netRevenueCent - (month.netFixedCostsCent + month.netVariableCostsCent))}
                      </td>
                      <td className="py-2 px-2 text-right">
                        {month.availableNights > 0 ? formatPercent((month.occupiedNights / month.availableNights) * 100) : '0%'}
                      </td>
                    </tr>
                  ))}
                  {prop.monthlyDetails.length === 0 && (
                     <tr>
                        <td colSpan={5} className="py-4 text-center text-muted-foreground">Keine Daten verfügbar</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
