import Link from "next/link"
import { BarChart, Home, FileText, Settings, User } from "lucide-react"

import { LogoutButton } from "@/components/admin/LogoutButton"

export default function RevenueLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-muted/20">
      {/* Sidebar / Topnav on mobile */}
      <aside className="w-full md:w-64 bg-background border-b md:border-r md:border-b-0 border-border p-4 md:p-6 flex flex-col">
        <div className="mb-4 md:mb-8 flex justify-between items-center md:block">
          <div>
            <h2 className="text-xl font-serif font-bold">Revenue</h2>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Dashboard</p>
          </div>
          <div className="md:hidden">
            <Link href="/admin" className="text-xs text-primary underline">Zurück zum Admin</Link>
          </div>
        </div>
        
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 mb-4 md:mb-0 md:flex-1 md:space-y-2">
          <Link href="/admin/revenue" className="flex items-center gap-2 md:gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium whitespace-nowrap">
            <BarChart className="w-4 h-4 md:w-5 md:h-5 text-primary" /> Portfolio
          </Link>
          <Link href="/admin/revenue/properties" className="flex items-center gap-2 md:gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium whitespace-nowrap">
            <Home className="w-4 h-4 md:w-5 md:h-5 text-primary" /> Wohnungen
          </Link>
          <Link href="/admin/revenue/bookings" className="flex items-center gap-2 md:gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium whitespace-nowrap">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-primary" /> Buchungen
          </Link>
          <Link href="/admin/revenue/costs" className="flex items-center gap-2 md:gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium whitespace-nowrap">
            <span className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-bold text-primary">€</span> Kosten
          </Link>
          <Link href="/admin/revenue/settings" className="flex items-center gap-2 md:gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium whitespace-nowrap">
            <Settings className="w-4 h-4 md:w-5 md:h-5 text-primary" /> Einstellungen
          </Link>
        </nav>

        <div className="hidden md:block mt-auto pt-6 border-t border-border space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm text-muted-foreground transition-colors">
            <User className="w-5 h-5" /> Zurück zum Admin
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
