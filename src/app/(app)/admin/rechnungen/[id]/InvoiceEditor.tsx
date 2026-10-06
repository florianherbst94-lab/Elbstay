"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, FileText, Send, Eye, XCircle } from "lucide-react";

export default function InvoiceEditor({ invoice }: { invoice: any }) {
  const isFinalized = invoice.status === "CREATED" || invoice.status === "SENT";
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handlePreview = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/invoice/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id, isDraft: true })
      });
      
      if (!res.ok) throw new Error("Failed to generate PDF");
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error(error);
      alert("Fehler bei der Vorschau-Erstellung.");
    }
    setIsGenerating(false);
  };

  const handleFinalize = async () => {
    if (!confirm("Achtung: Dies erzeugt eine fortlaufende Rechnungsnummer. Diese Aktion ist final und kann nicht rückgängig gemacht werden. Fortfahren?")) return;
    
    setIsGenerating(true);
    try {
      const res = await fetch("/api/invoice/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id, isDraft: false })
      });
      
      if (!res.ok) throw new Error("Failed to generate PDF");
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      
      // Reload page to reflect new status
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Fehler bei der Rechnungs-Erstellung.");
    }
    setIsGenerating(false);
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/invoice/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id, isDraft: false })
      });
      
      if (!res.ok) throw new Error("Failed to download PDF");
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error(error);
      alert("Fehler beim Herunterladen der Rechnung.");
    }
    setIsGenerating(false);
  };

  const handleCancel = async () => {
    const reason = prompt("Bitte geben Sie einen Stornierungsgrund ein:");
    if (!reason || reason.trim() === "") {
      alert("Ein Stornierungsgrund ist zwingend erforderlich.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const res = await fetch("/api/invoice/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id, reason: reason.trim() })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Fehler beim Stornieren");
      }
      
      const data = await res.json();
      alert(data.isStorno ? "Stornorechnung wurde erfolgreich erstellt." : "Anfrage wurde storniert.");
      
      // Navigate to the list or reload
      window.location.href = "/admin/rechnungen";
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
    setIsGenerating(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/rechnungen" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold font-serif">
            {invoice.invoiceNumber ? `Rechnung ${invoice.invoiceNumber}` : "Rechnungsanfrage"}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`px-2 py-0.5 text-xs rounded-md ${
              invoice.status === 'OPEN' ? 'bg-blue-100 text-blue-800' :
              invoice.status === 'CREATED' ? 'bg-amber-100 text-amber-800' :
              invoice.status === 'SENT' ? 'bg-green-100 text-green-800' :
              invoice.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
              invoice.status === 'CANCELLATION_INVOICE' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {invoice.status}
            </span>
            <span className="text-sm text-muted-foreground">
              Eingegangen am {format(new Date(invoice.submittedAt), 'dd.MM.yyyy HH:mm')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-background border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 font-serif">Rechnungsdetails (Read-Only Demo)</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Empfänger (Firma/Name)</label>
                <input type="text" className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-sm" value={invoice.companyName || `${invoice.firstName || ''} ${invoice.lastName || ''}`.trim()} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">E-Mail</label>
                <input type="text" className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-sm" value={invoice.invoiceEmail} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Buchungsplattform</label>
                <input type="text" className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-sm" value={invoice.bookingPlatform || ""} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Referenz</label>
                <input type="text" className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-sm" value={invoice.reservationCode || ""} readOnly />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Hinweis: Die volle Editierbarkeit der Maske (Datum, Positionen, Beträge anpassen) ist in diesem Demostand ausgeblendet.</p>
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
             <h2 className="text-xl font-bold mb-4 font-serif">Positionen</h2>
             {invoice.items.length === 0 ? (
               <div className="text-center p-6 text-muted-foreground border border-dashed border-border rounded-lg">
                 Keine Positionen hinterlegt. Bitte füge eine Beherbergungsleistung hinzu.
                 <br/><br/>
                 <Button variant="outline" size="sm" disabled>Position hinzufügen</Button>
               </div>
             ) : (
               <div className="space-y-2">
                 {invoice.items.map((item: any) => (
                   <div key={item.id} className="flex justify-between items-center p-3 border border-border rounded-lg bg-muted/20">
                      <div>
                        <div className="font-medium text-sm">{item.description}</div>
                        <div className="text-xs text-muted-foreground">{item.quantity} x {(item.unitPriceCent/100).toFixed(2)} €</div>
                      </div>
                      <div className="font-bold">
                        {(item.totalGrossCent/100).toFixed(2)} €
                      </div>
                   </div>
                 ))}
               </div>
             )}
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-background border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 font-serif">Aktionen</h2>
            
            <div className="space-y-3">
              {!isFinalized ? (
                <>
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={handlePreview} disabled={isGenerating || invoice.status === 'CANCELLED'}>
                    <Eye className="w-4 h-4" /> Entwurf ansehen (PDF)
                  </Button>
                  <Button className="w-full justify-start gap-2" onClick={handleFinalize} disabled={isGenerating || invoice.items.length === 0 || invoice.status === 'CANCELLED'}>
                    <FileText className="w-4 h-4" /> Rechnung verbindlich erstellen
                  </Button>
                  
                  {invoice.status !== 'CANCELLED' && (
                    <div className="pt-4 border-t border-border/50">
                      <Button onClick={handleCancel} disabled={isGenerating} variant="destructive" className="w-full justify-start gap-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700">
                        <XCircle className="w-4 h-4" /> Anfrage abweisen
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={handleDownload} disabled={isGenerating}>
                    <FileText className="w-4 h-4" /> PDF herunterladen
                  </Button>
                  <Button className="w-full justify-start gap-2" disabled={invoice.status === 'SENT'}>
                    <Send className="w-4 h-4" /> Per E-Mail versenden
                  </Button>
                  <div className="pt-4 border-t border-border/50">
                    <Button onClick={handleCancel} disabled={isGenerating} variant="destructive" className="w-full justify-start gap-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700">
                      <XCircle className="w-4 h-4" /> Rechnung stornieren
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
             <h2 className="text-lg font-bold mb-4 font-serif">Audit Log</h2>
             <div className="space-y-4">
               {invoice.auditLogs.map((log: any) => (
                 <div key={log.id} className="text-sm">
                   <div className="flex justify-between text-xs text-muted-foreground mb-1">
                     <span>{format(new Date(log.timestamp), 'dd.MM.yyyy HH:mm')}</span>
                     <span>{log.adminUser}</span>
                   </div>
                   <div className="font-medium">{log.action}</div>
                   {log.details && <div className="text-muted-foreground text-xs mt-1">{log.details}</div>}
                 </div>
               ))}
               {invoice.auditLogs.length === 0 && (
                 <div className="text-sm text-muted-foreground">Keine Einträge.</div>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
