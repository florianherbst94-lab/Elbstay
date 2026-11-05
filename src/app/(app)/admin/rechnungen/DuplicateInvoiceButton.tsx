"use client"

import { Button } from "@/components/ui/Button"
import { duplicateInvoice } from "./actions"
import { useTransition } from "react"
import { Copy } from "lucide-react"

export function DuplicateInvoiceButton({ invoiceId }: { invoiceId: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button 
      size="sm"
      variant="outline"
      onClick={() => startTransition(() => duplicateInvoice(invoiceId))}
      disabled={isPending}
      title="Rechnung duplizieren"
    >
      {isPending ? (
        <span className="flex items-center">
          <span className="animate-spin border-2 border-current border-t-transparent rounded-full w-4 h-4" />
        </span>
      ) : (
        <span className="flex items-center">
          <Copy className="w-4 h-4" />
        </span>
      )}
    </Button>
  )
}
