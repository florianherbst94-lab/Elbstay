import { AggregatedStats } from "@/lib/revenue/reporting"

interface PortfolioMonthly {
  month: string
  stats: AggregatedStats
}

export function PortfolioTable({ data, overall }: { data: PortfolioMonthly[], overall: AggregatedStats }) {
  
  const formatEuro = (cents: number) => `€ ${(cents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const formatPercent = (val: number) => `${val.toFixed(1)} %`

  const avgStats = {
    grossRevenueCent: overall.grossRevenueCent / data.length || 0,
    netRevenueCent: overall.netRevenueCent / data.length || 0,
    netFixedCostsCent: overall.netFixedCostsCent / data.length || 0,
    netVariableCostsCent: overall.netVariableCostsCent / data.length || 0,
    netTotalCostsCent: overall.netTotalCostsCent / data.length || 0,
    profitCent: overall.profitCent / data.length || 0,
    occupancy: overall.occupancy, // Avg is basically overall occupancy
    margin: overall.margin
  }

  return (
    <div className="bg-background border border-border rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col mb-8">
      <h3 className="text-lg font-bold mb-4">Monatliche Gesamtübersicht des Portfolios</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="pb-3 font-medium px-2">Monat</th>
              <th className="pb-3 font-medium text-right px-2">Einnahmen (Netto)</th>
              <th className="pb-3 font-medium text-right px-2">Fixkosten</th>
              <th className="pb-3 font-medium text-right px-2">Var. Kosten</th>
              <th className="pb-3 font-medium text-right px-2">Gesamtausgaben</th>
              <th className="pb-3 font-medium text-right px-2">Op. Gewinn</th>
              <th className="pb-3 font-medium text-right px-2">Marge</th>
              <th className="pb-3 font-medium text-right px-2">Auslastung</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.month} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-2 font-medium">{row.month}</td>
                <td className="py-3 px-2 text-right">{formatEuro(row.stats.netRevenueCent)}</td>
                <td className="py-3 px-2 text-right text-muted-foreground">{formatEuro(row.stats.netFixedCostsCent)}</td>
                <td className="py-3 px-2 text-right text-muted-foreground">{formatEuro(row.stats.netVariableCostsCent)}</td>
                <td className="py-3 px-2 text-right font-medium">{formatEuro(row.stats.netTotalCostsCent)}</td>
                <td className={`py-3 px-2 text-right font-bold ${row.stats.profitCent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatEuro(row.stats.profitCent)}
                </td>
                <td className="py-3 px-2 text-right">{formatPercent(row.stats.margin)}</td>
                <td className="py-3 px-2 text-right">{formatPercent(row.stats.occupancy)}</td>
              </tr>
            ))}
            
            {data.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-muted-foreground">Keine Daten im gewählten Zeitraum gefunden.</td>
              </tr>
            )}
          </tbody>
          {data.length > 0 && (
            <tfoot className="bg-muted/50 font-medium">
              <tr className="border-t-2 border-border">
                <td className="py-3 px-2">Summe</td>
                <td className="py-3 px-2 text-right">{formatEuro(overall.netRevenueCent)}</td>
                <td className="py-3 px-2 text-right">{formatEuro(overall.netFixedCostsCent)}</td>
                <td className="py-3 px-2 text-right">{formatEuro(overall.netVariableCostsCent)}</td>
                <td className="py-3 px-2 text-right">{formatEuro(overall.netTotalCostsCent)}</td>
                <td className={`py-3 px-2 text-right ${overall.profitCent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatEuro(overall.profitCent)}
                </td>
                <td className="py-3 px-2 text-right">-</td>
                <td className="py-3 px-2 text-right">-</td>
              </tr>
              <tr className="border-t border-border/50 text-muted-foreground">
                <td className="py-3 px-2">Ø pro Monat</td>
                <td className="py-3 px-2 text-right">{formatEuro(avgStats.netRevenueCent)}</td>
                <td className="py-3 px-2 text-right">{formatEuro(avgStats.netFixedCostsCent)}</td>
                <td className="py-3 px-2 text-right">{formatEuro(avgStats.netVariableCostsCent)}</td>
                <td className="py-3 px-2 text-right">{formatEuro(avgStats.netTotalCostsCent)}</td>
                <td className="py-3 px-2 text-right">
                  {formatEuro(avgStats.profitCent)}
                </td>
                <td className="py-3 px-2 text-right">{formatPercent(avgStats.margin)}</td>
                <td className="py-3 px-2 text-right">{formatPercent(avgStats.occupancy)}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}
