import Link from "next/link";
import { Settings, Image as ImageIcon } from "lucide-react";

export default function AdminOverviewPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-4">ElbStay Admin</h1>
        <p className="text-muted-foreground">Lokales Entwickler-Dashboard zur direkten Bearbeitung der Inhalte.</p>
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
        
        <div className="rounded-2xl border border-border bg-muted/30 p-8 opacity-70">
           <div className="bg-muted w-14 h-14 rounded-xl flex items-center justify-center mb-6">
            <Settings className="w-7 h-7 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Text-Editor (Geplant)</h2>
          <p className="text-muted-foreground">
            Feature für die Live-Bearbeitung von Website-Texten. Noch nicht aktiviert.
          </p>
        </div>
      </div>
    </div>
  );
}
