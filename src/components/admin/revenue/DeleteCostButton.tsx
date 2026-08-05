"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { deleteCost } from "@/app/(app)/admin/revenue/costs/actions"

export function DeleteCostButton({ costId, propertyId }: { costId: string, propertyId: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() => {
        if (confirm("Möchten Sie diese Kosten wirklich löschen?")) {
          startTransition(async () => {
            await deleteCost(costId, propertyId)
          })
        }
      }}
      disabled={isPending}
      className="text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50"
      title="Kosten löschen"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
