"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { format, subMonths, startOfYear, startOfMonth, endOfMonth, subYears } from "date-fns"
import { Calendar, Filter, X } from "lucide-react"

interface Property {
  id: string
  name: string
}

export function FilterBar({ properties }: { properties: Property[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [startDate, setStartDate] = useState(searchParams.get("start") || format(subMonths(new Date(), 11), "yyyy-MM-dd"))
  const [endDate, setEndDate] = useState(searchParams.get("end") || format(endOfMonth(new Date()), "yyyy-MM-dd"))
  
  // Use comma separated string for multiple properties in URL
  const propParam = searchParams.get("props")
  const [selectedProps, setSelectedProps] = useState<string[]>(propParam ? propParam.split(",") : [])

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const applyFilters = (start: string, end: string, props: string[]) => {
    const params = new URLSearchParams()
    params.set("start", start)
    params.set("end", end)
    if (props.length > 0) {
      params.set("props", props.join(","))
    }
    router.push(`/admin/revenue/reporting?${params.toString()}`)
  }

  const handleApply = () => {
    applyFilters(startDate, endDate, selectedProps)
    setIsFilterOpen(false)
  }

  const handlePreset = (type: string) => {
    const today = new Date()
    let start = startDate
    let end = endDate

    switch (type) {
      case "ytd":
        start = format(startOfYear(today), "yyyy-MM-dd")
        end = format(endOfMonth(today), "yyyy-MM-dd")
        break;
      case "12m":
        start = format(startOfMonth(subMonths(today, 11)), "yyyy-MM-dd")
        end = format(endOfMonth(today), "yyyy-MM-dd")
        break;
      case "lastYear":
        start = format(startOfYear(subYears(today, 1)), "yyyy-MM-dd")
        end = format(endOfMonth(subYears(today, 1)), "yyyy-MM-dd")
        break;
    }
    setStartDate(start)
    setEndDate(end)
    applyFilters(start, end, selectedProps)
    setIsFilterOpen(false)
  }

  const toggleProperty = (id: string) => {
    setSelectedProps(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="bg-background border border-border rounded-xl p-4 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2 flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Zeitraum:
          </span>
          <button onClick={() => handlePreset("ytd")} className="px-3 py-1.5 text-xs font-medium rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors">
            Year to Date
          </button>
          <button onClick={() => handlePreset("12m")} className="px-3 py-1.5 text-xs font-medium rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors">
            Letzte 12 Monate
          </button>
          <button onClick={() => handlePreset("lastYear")} className="px-3 py-1.5 text-xs font-medium rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors">
            Letztes Jahr
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
          >
            <Filter className="w-4 h-4" />
            {selectedProps.length > 0 ? `${selectedProps.length} Objekte gewählt` : 'Alle Objekte'}
          </button>
          
          <button 
             onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
             Benutzerdefiniert
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2 duration-200">
          <div>
            <h3 className="text-sm font-medium mb-3">Zeitraum anpassen</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Von</label>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Bis</label>
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Objekte filtern</h3>
              {selectedProps.length > 0 && (
                <button onClick={() => setSelectedProps([])} className="text-xs text-primary hover:underline">
                  Auswahl aufheben
                </button>
              )}
            </div>
            <div className="max-h-40 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2 p-1">
              {properties.map(prop => (
                <label key={prop.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1.5 rounded-md">
                  <input 
                    type="checkbox" 
                    checked={selectedProps.includes(prop.id)}
                    onChange={() => toggleProperty(prop.id)}
                    className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                  />
                  <span className="truncate">{prop.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-2">
            <button onClick={() => setIsFilterOpen(false)} className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted">
              Abbrechen
            </button>
            <button onClick={handleApply} className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              Filter anwenden
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
