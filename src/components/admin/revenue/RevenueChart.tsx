"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

type ChartData = {
  name: string
  umsatz: number
  kosten: number
}

export function RevenueChart({ data }: { data: ChartData[] }) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Keine Daten für das Diagramm vorhanden.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="name" 
          tickLine={false}
          axisLine={false}
          fontSize={12}
          tickMargin={10}
        />
        <YAxis 
          tickFormatter={(value) => `€${value}`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
          tickMargin={10}
        />
        <Tooltip 
          cursor={{ fill: 'hsl(var(--muted))' }}
          contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
          formatter={(value: number) => [`€ ${value.toFixed(2)}`, '']}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Bar 
          name="Umsatz (Payout)"
          dataKey="umsatz" 
          fill="hsl(var(--primary))" 
          radius={[4, 4, 0, 0]} 
        />
        <Bar 
          name="Kosten"
          dataKey="kosten" 
          fill="#ef4444" 
          radius={[4, 4, 0, 0]} 
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
