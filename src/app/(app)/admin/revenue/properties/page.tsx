import { Metadata } from "next"
import prisma from "@/lib/prisma"
import Link from "next/link"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Wohnungen | Revenue Dashboard",
}

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-serif">Wohnungen</h1>
        <p className="text-muted-foreground mt-1">Übersicht aller synchronisierten Ferienwohnungen</p>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="p-4 font-medium text-sm text-muted-foreground">Name</th>
                <th className="p-4 font-medium text-sm text-muted-foreground">Status</th>
                <th className="p-4 font-medium text-sm text-muted-foreground">Plattformen</th>
                <th className="p-4 font-medium text-sm text-muted-foreground">Letztes Update</th>
                <th className="p-4 font-medium text-sm text-muted-foreground text-right">Aktion</th>
              </tr>
            </thead>
            <tbody>
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    Keine Wohnungen gefunden. Bitte Synchronisation in den Einstellungen starten.
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr key={property.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{property.name}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{property.platforms || '-'}</td>
                    <td className="p-4 text-muted-foreground text-sm">
                      {property.hospitableUpdatedAt ? property.hospitableUpdatedAt.toLocaleDateString('de-DE') : '-'}
                    </td>
                    <td className="p-4 text-right">
                      <Link 
                        href={`/admin/revenue/properties/${property.id}`}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Details ansehen
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
