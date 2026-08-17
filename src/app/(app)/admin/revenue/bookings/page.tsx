import { Metadata } from "next"
import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Buchungen | Revenue Dashboard",
}

export default async function BookingsPage(props: { searchParams?: Promise<{ property?: string, page?: string }> }) {
  const searchParams = await props.searchParams
  const propertyId = searchParams?.property
  const page = parseInt(searchParams?.page || "1")
  const limit = 50
  
  const where = propertyId ? { propertyId } : {}
  
  const [reservations, totalCount] = await Promise.all([
    prisma.reservation.findMany({
      where,
      orderBy: { checkIn: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        property: { select: { name: true } },
        financials: true
      }
    }),
    prisma.reservation.count({ where })
  ])
  
  const totalPages = Math.ceil(totalCount / limit)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-serif">Buchungen</h1>
          <p className="text-muted-foreground mt-1">Alle Reservierungen systemweit</p>
        </div>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-muted-foreground">
                <th className="p-4 font-medium">Zeitraum</th>
                <th className="p-4 font-medium">Wohnung</th>
                <th className="p-4 font-medium">Plattform</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Auszahlung</th>
                <th className="p-4 font-medium text-right">Übernachtung</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">Keine Buchungen gefunden.</td>
                </tr>
              ) : (
                reservations.map(res => (
                  <tr key={res.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="font-medium">
                        {res.checkIn.toLocaleDateString('de-DE')} – {res.checkOut.toLocaleDateString('de-DE')}
                      </div>
                      <div className="text-xs text-muted-foreground">{res.nights} Nächte, {res.totalGuests} Gäste</div>
                    </td>
                    <td className="p-4 font-medium">{res.property.name}</td>
                    <td className="p-4">{res.platform || '-'}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        res.isCancelled ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-medium">
                      {res.financials?.payoutCent 
                        ? `€ ${(res.financials.payoutCent / 100).toFixed(2)}` 
                        : <span className="text-yellow-600">-</span>}
                    </td>
                    <td className="p-4 text-right text-muted-foreground">
                      {res.financials?.accommodationCent 
                        ? `€ ${(res.financials.accommodationCent / 100).toFixed(2)}` 
                        : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="p-4 border-t border-border flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Seite {page} von {totalPages} (Gesamt: {totalCount})
            </span>
            <div className="flex gap-2">
              {page > 1 && (
                <a href={`?page=${page - 1}${propertyId ? `&property=${propertyId}` : ''}`} className="px-3 py-1 bg-muted rounded-md hover:bg-muted/80">
                  Zurück
                </a>
              )}
              {page < totalPages && (
                <a href={`?page=${page + 1}${propertyId ? `&property=${propertyId}` : ''}`} className="px-3 py-1 bg-muted rounded-md hover:bg-muted/80">
                  Weiter
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
