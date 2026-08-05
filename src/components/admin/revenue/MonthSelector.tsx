"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"

export function MonthSelector({ currentMonth, availableMonths }: { currentMonth: string, availableMonths: { value: string, label: string }[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    params.set('month', newMonth)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="month-select" className="text-sm font-medium text-muted-foreground">Monat:</label>
      <select 
        id="month-select"
        value={currentMonth}
        onChange={handleMonthChange}
        className="text-sm border border-border rounded-lg bg-background px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
      >
        {availableMonths.map(m => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>
    </div>
  )
}
