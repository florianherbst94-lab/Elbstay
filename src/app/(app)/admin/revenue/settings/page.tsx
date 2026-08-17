import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { syncProperties, syncReservations } from "@/lib/hospitable/sync"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/Button"
import { SyncButton } from "./sync-button"

export const metadata: Metadata = {
  title: "Settings | Revenue Dashboard",
}

export default async function SettingsPage() {
  const tokenSet = !!process.env.HOSPITABLE_API_TOKEN
  const propertiesCount = await prisma.property.count()
  const reservationsCount = await prisma.reservation.count()

  const lastSync = await prisma.syncRun.findFirst({
    orderBy: { startedAt: 'desc' }
  })

  async function handleSync() {
    "use server"
    try {
      const syncRun = await prisma.syncRun.create({
        data: { type: "MANUAL", status: "PENDING" }
      })
      
      const propsCount = await syncProperties()
      
      // Get reservations for the last 2 years and future 1.5 years
      const start = new Date()
      start.setFullYear(start.getFullYear() - 2)
      const end = new Date()
      end.setMonth(end.getMonth() + 18)
      
      const resCount = await syncReservations(
        start.toISOString().split('T')[0], 
        end.toISOString().split('T')[0]
      )

      await prisma.syncRun.update({
        where: { id: syncRun.id },
        data: {
          status: "SUCCESS",
          completedAt: new Date(),
          propertiesCount: propsCount,
          reservationsCount: resCount,
        }
      })
      revalidatePath('/admin/revenue/settings')
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-serif">Einstellungen</h1>
        <p className="text-muted-foreground mt-1">Hospitable Anbindung & Systemverwaltung</p>
      </div>

      <div className="bg-background border border-border p-6 rounded-2xl shadow-sm space-y-6">
        <h2 className="text-xl font-bold">Hospitable-Verbindung</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Verbindungsstatus</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className={`w-3 h-3 rounded-full ${tokenSet ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-medium">{tokenSet ? 'Token hinterlegt' : 'Kein Token gefunden'}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Der Token muss als Environment Variable <code className="bg-muted px-1 rounded">HOSPITABLE_API_TOKEN</code> auf dem Server gesetzt sein.</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Letzte Synchronisierung</h3>
            <p className="font-medium mt-2">
              {lastSync?.completedAt ? (
                <>
                  {lastSync.completedAt.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })} Uhr
                  <span className="text-xs text-muted-foreground ml-2">
                    ({lastSync.type === 'DAILY' || lastSync.type === 'PERIODIC' ? 'Automatisch' : 'Manuell'})
                  </span>
                </>
              ) : 'Nie'}
            </p>
            {lastSync?.status === "FAILED" && (
              <p className="text-xs text-red-500 mt-1">Fehler: {lastSync.errorMessage}</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Synchronisierte Wohnungen</h3>
            <p className="text-2xl font-bold mt-1">{propertiesCount}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Synchronisierte Buchungen</h3>
            <p className="text-2xl font-bold mt-1">{reservationsCount}</p>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <form action={handleSync}>
            <SyncButton disabled={!tokenSet} />
          </form>
          <p className="text-sm text-muted-foreground">
            Die automatische Synchronisation wird einmal täglich nachts ausgeführt.
          </p>
        </div>
      </div>
    </div>
  )
}
