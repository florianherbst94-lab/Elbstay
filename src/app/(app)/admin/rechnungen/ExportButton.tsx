"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async () => {
    // Prompt the user for the month
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const month = prompt("Für welchen Monat sollen die Rechnungen exportiert werden? (Format: YYYY-MM)", currentMonth);
    
    if (!month) return;
    if (!/^\d{4}-\d{2}$/.test(month)) {
      alert("Bitte das korrekte Format verwenden: YYYY-MM (z.B. 2026-10)");
      return;
    }

    setIsExporting(true);
    try {
      const res = await fetch(`/api/invoice/export?month=${month}`);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Export fehlgeschlagen.");
      }
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Rechnungen_ElbStay_${month}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error(error);
      alert(`Fehler beim Export: ${error.message}`);
    }
    setIsExporting(false);
  }

  return (
    <Button variant="secondary" onClick={handleExport} disabled={isExporting} className="gap-2">
      <Download className="w-4 h-4" />
      {isExporting ? "Wird exportiert..." : "Steuerberater Export (ZIP)"}
    </Button>
  );
}
