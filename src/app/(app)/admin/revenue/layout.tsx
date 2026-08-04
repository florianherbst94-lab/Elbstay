import Link from "next/link"
import { BarChart, Home, FileText, Settings, User } from "lucide-react"

export default function RevenueLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold">Revenue</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Dashboard</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/admin/revenue" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">
            <BarChart className="w-5 h-5 text-primary" /> Portfolio
          </Link>
          <Link href="/admin/revenue/properties" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">
            <Home className="w-5 h-5 text-primary" /> Wohnungen
          </Link>
          <Link href="/admin/revenue/bookings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">
            <FileText className="w-5 h-5 text-primary" /> Buchungen
          </Link>
          <Link href="/admin/revenue/costs" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">
            <span className="w-5 h-5 flex items-center justify-center font-bold text-primary">€</span> Kosten
          </Link>
          <Link href="/admin/revenue/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">
            <Settings className="w-5 h-5 text-primary" /> Einstellungen
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm text-muted-foreground">
            <User className="w-5 h-5" /> Zurück zum Admin
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
