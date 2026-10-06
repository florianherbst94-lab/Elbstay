import Link from "next/link";
import { Settings, Image as ImageIcon } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default function AdminOverviewPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">ElbStay Admin</h1>
          <p className="text-muted-foreground">Admin-Dashboard zur Bearbeitung der Inhalte & Portfolio-Übersicht.</p>
        </div>
        <div>
          <LogoutButton variant="minimal" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/gallery" className="group rounded-2xl border border-border bg-background p-8 hover:border-primary hover:shadow-lg transition-all duration-300">
          <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ImageIcon className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Galerie-Editor</h2>
          <p className="text-muted-foreground">
            Bilder zwischen Kategorien verschieben, sortieren und neue hochladene Bilder strukturieren. (Drag & Drop)
          </p>
        </Link>
        
        <Link href="/admin/revenue" className="group rounded-2xl border border-border bg-background p-8 hover:border-primary hover:shadow-lg transition-all duration-300">
           <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Settings className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Revenue & Break-even</h2>
          <p className="text-muted-foreground">
            Wirtschaftliche Auswertung aller Ferienwohnungen.
          </p>
        </Link>
        
        <Link href="/admin/rechnungen" className="group rounded-2xl border border-border bg-background p-8 hover:border-primary hover:shadow-lg transition-all duration-300">
           <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Rechnungen</h2>
          <p className="text-muted-foreground">
            Rechnungsanfragen bearbeiten, Rechnungen erstellen (PDF), stornieren und verwalten.
          </p>
        </Link>
      </div>
    </div>
  );
}
