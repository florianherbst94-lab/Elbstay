"use client"

import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

export function SyncButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-medium hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center min-w-[200px]"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Synchronisiere...
        </>
      ) : (
        "Jetzt synchronisieren"
      )}
    </button>
  )
}
