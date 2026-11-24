import { AggregatedStats } from "@/lib/revenue/reporting"
import { TrendingUp, TrendingDown, DollarSign, Home, Percent, Calendar } from "lucide-react"

export function ManagementSummary({ stats, monthsCount }: { stats: AggregatedStats, monthsCount: number }) {
  
  const avgMonthlyProfit = monthsCount > 0 ? stats.profitCent / monthsCount : 0
  const avgMonthlyRev = monthsCount > 0 ? stats.netRevenueCent / monthsCount : 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
      {/* Revenue */}
      <div className="bg-background border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">Gesamtumsatz</h3>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
        </div>
        <p className="text-2xl font-bold">€ {(stats.netRevenueCent / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p className="text-xs text-muted-foreground mt-1">Netto im gewählten Zeitraum</p>
      </div>

      {/* Total Costs */}
      <div className="bg-background border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">Gesamtausgaben</h3>
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
             <TrendingDown className="w-4 h-4 text-red-600" />
          </div>
        </div>
        <p className="text-2xl font-bold">€ {(stats.netTotalCostsCent / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p className="text-xs text-muted-foreground mt-1">Fixe & Variable Kosten (Netto)</p>
      </div>

      {/* Operative Profit */}
      <div className="bg-background border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">Operativer Gewinn</h3>
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
        </div>
        <p className={`text-2xl font-bold ${stats.profitCent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          € {(stats.profitCent / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Vor Finanzierung & Steuern</p>
      </div>

      {/* Margin */}
      <div className="bg-background border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">Gewinnmarge</h3>
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Percent className="w-4 h-4 text-purple-600" />
          </div>
        </div>
        <p className="text-2xl font-bold">{stats.margin.toFixed(1)} %</p>
        <p className="text-xs text-muted-foreground mt-1">Umsatzrentabilität</p>
      </div>

      {/* Occupancy */}
      <div className="bg-background border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">Auslastung</h3>
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
            <Home className="w-4 h-4 text-orange-600" />
          </div>
        </div>
        <p className="text-2xl font-bold">{stats.occupancy.toFixed(1)} %</p>
        <p className="text-xs text-muted-foreground mt-1">{stats.occupiedNights} von {stats.availableNights} Nächten</p>
      </div>

      {/* RevPAR */}
      <div className="bg-background border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">RevPAR</h3>
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
            <span className="font-bold text-teal-600 text-xs">€</span>
          </div>
        </div>
        <p className="text-2xl font-bold">€ {(stats.revParCent / 100).toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-1">Umsatz pro verfügb. Nacht</p>
      </div>

      {/* ADR */}
      <div className="bg-background border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">ADR</h3>
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="font-bold text-indigo-600 text-xs">€/N</span>
          </div>
        </div>
        <p className="text-2xl font-bold">€ {(stats.adrCent / 100).toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-1">Durchschnittsrate</p>
      </div>

      {/* Average Monthly Profit */}
      <div className="bg-background border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">Ø Monatsgewinn</h3>
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
        <p className="text-2xl font-bold">€ {(avgMonthlyProfit / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p className="text-xs text-muted-foreground mt-1">Ø bei {monthsCount} Monaten</p>
      </div>
      
       {/* Average Monthly Rev */}
       <div className="bg-background border border-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">Ø Monatsumsatz</h3>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
        </div>
        <p className="text-2xl font-bold">€ {(avgMonthlyRev / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p className="text-xs text-muted-foreground mt-1">Ø bei {monthsCount} Monaten</p>
      </div>
    </div>
  )
}
