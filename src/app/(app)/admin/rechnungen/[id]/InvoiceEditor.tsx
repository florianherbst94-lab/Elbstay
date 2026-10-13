"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, FileText, Send, Eye, XCircle, Save, Plus, Trash2 } from "lucide-react";
import { saveInvoiceData } from "../actions";

export default function InvoiceEditor({ invoice }: { invoice: any }) {
  const isFinalized = invoice.status === "CREATED" || invoice.status === "SENT";
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Editable state
  const [invoiceNote, setInvoiceNote] = useState(invoice.invoiceNote || "");
  const [paymentNote, setPaymentNote] = useState(invoice.paymentNote ?? "Der Rechnungsbetrag wurde bereits im Rahmen Ihrer Buchung entrichtet. Diese Rechnung stellt keine erneute Zahlungsaufforderung dar.");
  const [companyName, setCompanyName] = useState(invoice.companyName || "");
  const [firstName, setFirstName] = useState(invoice.firstName || "");
  const [lastName, setLastName] = useState(invoice.lastName || "");
  const [invoiceEmail, setInvoiceEmail] = useState(invoice.invoiceEmail || "");

  const [items, setItems] = useState<any[]>(invoice.items || []);

  const handleAddItem = () => {
    setItems([...items, {
      id: "new_" + Math.random().toString(),
      description: "Neue Position",
      quantity: 1,
      unitPriceCent: 10000,
      taxRate: 19.0,
      totalGrossCent: 10000,
      totalNetCent: Math.round(10000 / 1.19),
      totalTaxCent: 10000 - Math.round(10000 / 1.19)
    }]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleItemChange = (id: string, field: string, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Recalculate totals
        if (field === 'quantity' || field === 'unitPriceCent' || field === 'taxRate') {
          updated.totalGrossCent = Math.round(updated.quantity * updated.unitPriceCent);
          updated.totalNetCent = Math.round(updated.totalGrossCent / (1 + (updated.taxRate / 100)));
          updated.totalTaxCent = updated.totalGrossCent - updated.totalNetCent;
        }
        return updated;
      }
      return item;
    }));
  };

  const getSaveData = () => ({
    invoiceNote,
    paymentNote,
    companyName,
    firstName,
    lastName,
    invoiceEmail
  });

  const handleSave = async () => {
    setIsGenerating(true);
    try {
      await saveInvoiceData(invoice.id, getSaveData(), items);
      alert("Erfolgreich gespeichert!");
      window.location.reload();
    } catch (err: any) {
      alert("Fehler beim Speichern: " + err.message);
    }
    setIsGenerating(false);
  }

  const handlePullFromHospitable = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/invoice/pull-hospitable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to pull data");
      
      window.location.reload();
    } catch (error: any) {
      console.error(error);
      alert("Fehler beim Abrufen der Buchungsdaten: " + error.message);
    }
    setIsGenerating(false);
  };

  const handlePreview = async () => {
    // Autosave first so the preview has the latest note
    await saveInvoiceData(invoice.id, getSaveData(), items);

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
      await saveInvoiceData(invoice.id, getSaveData(), items);

      const res = await fetch("/api/invoice/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id, isDraft: false })
      });
      
      if (!res.ok) throw new Error("Failed to generate PDF");
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      
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

  const handleSendEmail = async () => {
    if (!invoice.invoiceEmail) {
      alert("Es ist keine E-Mail-Adresse für diesen Gast hinterlegt.");
      return;
    }
    
    if (!confirm(`Möchtest du diese Rechnung wirklich an ${invoice.invoiceEmail} senden?`)) return;

    setIsGenerating(true);
    try {
      const res = await fetch("/api/invoice/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id, toEmail: invoice.invoiceEmail })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send email.");
      }
      
      alert("E-Mail wurde erfolgreich gesendet!");
      window.location.reload();
    } catch (error: any) {
      console.error(error);
      alert("Fehler beim Senden: " + error.message);
    }
    setIsGenerating(false);
  };

  const handleCancel = async () => {
    const isRejecting = !isFinalized;
    if (!confirm(isRejecting ? "Rechnungsanfrage wirklich abweisen?" : "Diese Rechnung wirklich stornieren? (Es wird eine Stornorechnung erzeugt)")) return;
    
    setIsGenerating(true);
    try {
      const res = await fetch("/api/invoice/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id })
      });
      
      if (!res.ok) throw new Error("Failed to cancel invoice");
      
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Fehler beim Stornieren.");
    }
    setIsGenerating(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Link href="/admin/rechnungen" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Übersicht
          </Link>
          {isFinalized && invoice.invoiceNumber && (
            <div className="text-xl font-mono font-bold">{invoice.invoiceNumber}</div>
          )}
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold font-serif mb-2">Rechnung bearbeiten</h1>
            <p className="text-muted-foreground">ID: <span className="font-mono">{invoice.id}</span></p>
          </div>
          <div className="flex flex-col items-end gap-2">
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
              Erstellt am {format(new Date(invoice.createdAt), 'dd.MM.yyyy HH:mm')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-background border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 font-serif">Rechnungsdetails</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Firma</label>
                <input 
                  type="text" 
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" 
                  value={companyName} 
                  onChange={e => setCompanyName(e.target.value)}
                  readOnly={isFinalized}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Vorname</label>
                  <input 
                    type="text" 
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" 
                    value={firstName} 
                    onChange={e => setFirstName(e.target.value)}
                    readOnly={isFinalized}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nachname</label>
                  <input 
                    type="text" 
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" 
                    value={lastName} 
                    onChange={e => setLastName(e.target.value)}
                    readOnly={isFinalized}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">E-Mail</label>
                <input 
                  type="text" 
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" 
                  value={invoiceEmail}
                  onChange={e => setInvoiceEmail(e.target.value)}
                  readOnly={isFinalized} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Buchungsplattform</label>
                <input type="text" className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-sm" value={invoice.bookingPlatform || ""} readOnly />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">Zusatzbemerkung (z.B. Projektnummer, Referenz)</label>
                <textarea 
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" 
                  value={invoiceNote}
                  onChange={(e) => setInvoiceNote(e.target.value)}
                  placeholder="z.B. Projekt ABC / Bitte überweisen Sie den offenen Betrag..."
                  rows={2}
                  readOnly={isFinalized}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">Zahlungshinweis (Standard: Bereits bezahlt)</label>
                <textarea 
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" 
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                  placeholder="Der Rechnungsbetrag wurde bereits im Rahmen Ihrer Buchung entrichtet..."
                  rows={2}
                  readOnly={isFinalized}
                />
                <p className="text-xs text-muted-foreground mt-1">Dieser Text erscheint unten auf der Rechnung (z.B. wenn jemand noch überweisen muss).</p>
              </div>
            </div>
            
            {!isFinalized && (
              <div className="mt-4 flex justify-end">
                <Button onClick={handleSave} disabled={isGenerating} size="sm" variant="secondary" className="gap-2">
                  <Save className="w-4 h-4" /> Speichern
                </Button>
              </div>
            )}
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold font-serif">Positionen</h2>
               {!isFinalized && invoice.reservationCode && (
                 <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePullFromHospitable}
                    disabled={isGenerating}
                  >
                    Aus Hospitable laden
                 </Button>
               )}
             </div>
             {items.length === 0 ? (
               <div className="text-center p-6 text-muted-foreground border border-dashed border-border rounded-lg">
                 Keine Positionen hinterlegt.
               </div>
             ) : (
               <div className="space-y-4">
                 {items.map((item: any) => (
                   <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg bg-muted/10 items-start">
                      <div className="flex-1 space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">Beschreibung</label>
                          <input 
                            type="text" 
                            className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" 
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                            readOnly={isFinalized}
                          />
                        </div>
                        <div className="flex gap-4">
                          <div className="w-20">
                            <label className="block text-xs font-medium text-muted-foreground mb-1">Anzahl</label>
                            <input 
                              type="number" 
                              className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" 
                              value={item.quantity}
                              onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                              readOnly={isFinalized}
                            />
                          </div>
                          <div className="w-32">
                            <label className="block text-xs font-medium text-muted-foreground mb-1">Einzelpr. (€)</label>
                            <input 
                              type="number" 
                              step="0.01"
                              className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" 
                              value={(item.unitPriceCent / 100).toFixed(2)}
                              onChange={(e) => handleItemChange(item.id, 'unitPriceCent', Math.round((parseFloat(e.target.value) || 0) * 100))}
                              readOnly={isFinalized}
                            />
                          </div>
                          <div className="w-24">
                            <label className="block text-xs font-medium text-muted-foreground mb-1">MwSt. (%)</label>
                            <input 
                              type="number" 
                              className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" 
                              value={item.taxRate}
                              onChange={(e) => handleItemChange(item.id, 'taxRate', parseFloat(e.target.value) || 0)}
                              readOnly={isFinalized}
                            />
                          </div>
                          <div className="w-24">
                            <label className="block text-xs font-medium text-muted-foreground mb-1">Gesamt (€)</label>
                            <div className="px-3 py-1.5 font-bold text-sm bg-muted rounded-md border border-transparent">
                              {(item.totalGrossCent / 100).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isFinalized && (
                        <button 
                          onClick={() => handleRemoveItem(item.id)} 
                          className="mt-6 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                   </div>
                 ))}
               </div>
             )}
             
             {!isFinalized && (
               <div className="mt-4">
                 <Button onClick={handleAddItem} size="sm" variant="outline" className="gap-2 w-full border-dashed">
                   <Plus className="w-4 h-4" /> Neue Position hinzufügen
                 </Button>
                 
                 <div className="mt-4 flex justify-end">
                   <Button onClick={handleSave} disabled={isGenerating} size="sm" variant="secondary" className="gap-2">
                     <Save className="w-4 h-4" /> Speichern
                   </Button>
                 </div>
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
                  <Button className="w-full justify-start gap-2" onClick={handleFinalize} disabled={isGenerating || items.length === 0 || invoice.status === 'CANCELLED'}>
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
                  <Button className="w-full justify-start gap-2" disabled={invoice.status === 'SENT' || isGenerating} onClick={handleSendEmail}>
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
