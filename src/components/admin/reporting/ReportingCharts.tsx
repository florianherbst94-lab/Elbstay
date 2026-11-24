"use client"

import { AggregatedStats } from "@/lib/revenue/reporting"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, ComposedChart, Area
} from 'recharts'

interface PortfolioMonthly {
  month: string
  stats: AggregatedStats
}

export function ReportingCharts({ data }: { data: PortfolioMonthly[] }) {
  
  const chartData = data.map(d => ({
    name: d.month,
    Umsatz: d.stats.netRevenueCent / 100,
    Kosten: d.stats.netTotalCostsCent / 100,
    Gewinn: d.stats.profitCent / 100,
    Marge: d.stats.margin,
    Auslastung: d.stats.occupancy
  }))

  const formatEuro = (value: number) => `€ ${value.toLocaleString('de-DE')}`
  const formatPercent = (value: number) => `${value.toFixed(0)}%`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Umsatz & Kosten (Bar Chart) */}
      <div className="bg-background border border-border p-6 rounded-2xl shadow-sm h-[400px] flex flex-col">
        <h3 className="text-lg font-bold mb-6">Umsatz & Kosten (Netto)</h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={formatEuro} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip 
                formatter={(value: any) => [`€ ${Number(value).toLocaleString('de-DE', {minimumFractionDigits: 2})}`, undefined]}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="Umsatz" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="Kosten" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gewinn & Marge (Composed Chart) */}
      <div className="bg-background border border-border p-6 rounded-2xl shadow-sm h-[400px] flex flex-col">
        <h3 className="text-lg font-bold mb-6">Gewinn & Marge</h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tickFormatter={formatEuro} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tickFormatter={formatPercent} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip 
                formatter={(value: any, name: any) => {
                  const numVal = Number(value)
                  const strName = String(name)
                  if (strName === 'Marge' || strName === 'Auslastung') return [`${numVal.toFixed(1)}%`, strName]
                  return [`€ ${numVal.toLocaleString('de-DE', {minimumFractionDigits: 2})}`, strName]
                }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar yAxisId="left" dataKey="Gewinn" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Line yAxisId="right" type="monotone" dataKey="Marge" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      
       {/* Auslastung */}
       <div className="bg-background border border-border p-6 rounded-2xl shadow-sm h-[300px] flex flex-col lg:col-span-2">
        <h3 className="text-lg font-bold mb-6">Auslastung Entwicklung</h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={formatPercent} tick={{ fontSize: 12, fill: '#6b7280' }} domain={[0, 100]} />
              <Tooltip 
                formatter={(value: any) => [`${Number(value).toFixed(1)}%`, undefined]}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line type="monotone" dataKey="Auslastung" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
