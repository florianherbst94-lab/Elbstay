"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"

export function FilterSelectors({ 
  currentYear, 
  currentPropertyId,
  properties 
}: { 
  currentYear: string, 
  currentPropertyId: string,
  properties: { id: string, name: string }[] 
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    params.set('year', newYear)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPropertyId = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    params.set('propertyId', newPropertyId)
    router.push(`${pathname}?${params.toString()}`)
  }

  // Generate an array of years, e.g., from 2024 to current year + 1
  const currentY = new Date().getFullYear()
  const years = []
  for (let i = 2024; i <= currentY + 1; i++) {
    years.push(i.toString())
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="year-select" className="text-sm font-medium text-muted-foreground whitespace-nowrap">Jahr:</label>
        <select 
          id="year-select"
          value={currentYear}
          onChange={handleYearChange}
          className="text-sm border border-border rounded-lg bg-background px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
        >
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="property-select" className="text-sm font-medium text-muted-foreground whitespace-nowrap">Wohnung:</label>
        <select 
          id="property-select"
          value={currentPropertyId}
          onChange={handlePropertyChange}
          className="text-sm border border-border rounded-lg bg-background px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer max-w-[200px] truncate"
        >
          <option value="all">Alle Wohnungen</option>
          {properties.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
