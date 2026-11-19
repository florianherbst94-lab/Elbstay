"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { togglePaymentStatus } from "./actions";
import { CheckCircle2, Circle } from "lucide-react";
import { useRouter } from "next/navigation";

export function PaymentStatusToggle({ invoiceId, currentStatus }: { invoiceId: string; currentStatus: string | null }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const isPaid = currentStatus === "PAID";

  const handleToggle = async () => {
    setIsPending(true);
    try {
      await togglePaymentStatus(invoiceId, currentStatus);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Fehler beim Ändern des Zahlungsstatus.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`px-2 py-1 h-auto flex items-center gap-1.5 ${isPaid ? 'text-green-600 hover:text-green-700 hover:bg-green-50' : 'text-muted-foreground hover:text-foreground'}`}
      onClick={handleToggle}
      disabled={isPending}
      title={isPaid ? "Auf unbezahlt setzen" : "Als bezahlt markieren"}
    >
      {isPaid ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
      <span className="text-xs font-medium">{isPaid ? "Bezahlt" : "Offen"}</span>
    </Button>
  );
}
