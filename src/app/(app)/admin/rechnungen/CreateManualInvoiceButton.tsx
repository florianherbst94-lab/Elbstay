"use client"

import { Button } from "@/components/ui/Button"
import { createManualInvoice } from "./actions"
import { useTransition } from "react"
import { Plus } from "lucide-react"

export function CreateManualInvoiceButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <Button 
      onClick={() => startTransition(() => createManualInvoice())}
      disabled={isPending}
    >
      {isPending ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin border-2 border-current border-t-transparent rounded-full w-4 h-4" />
          Erstelle...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Neue Rechnung (Manuell)
        </span>
      )}
    </Button>
  )
}
