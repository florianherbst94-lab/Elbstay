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
      </div>
    </div>
  );
}
