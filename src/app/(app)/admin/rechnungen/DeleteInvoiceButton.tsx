"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";

export function DeleteInvoiceButton({ invoiceId, invoiceNumber }: { invoiceId: string, invoiceNumber: string | null }) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    const isDraft = !invoiceNumber;
    
    const message = isDraft 
      ? "Möchtest du diese Rechnungsanfrage wirklich unwiderruflich löschen?"
      : `WARNUNG: Möchtest du die Rechnung ${invoiceNumber} wirklich löschen?\n\nAchtung: Die Rechnungsnummer wird dadurch wieder frei und kann für die nächste Rechnung neu vergeben werden! Nutze diese Funktion nur bei Fehlern. Normalerweise sollten Rechnungen nur storniert werden.`;
      
    if (!confirm(message)) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/invoice/${invoiceId}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Löschen fehlgeschlagen.");
      }
      
      window.location.reload();
    } catch (error: any) {
      console.error(error);
      alert(`Fehler beim Löschen: ${error.message}`);
      setIsDeleting(false);
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2" 
      onClick={handleDelete} 
      disabled={isDeleting}
      title="Rechnung komplett löschen"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
