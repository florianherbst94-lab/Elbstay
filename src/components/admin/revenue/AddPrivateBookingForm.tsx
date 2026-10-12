"use client"

import { useState, useRef } from "react"
import { addPrivateBooking } from "@/app/(app)/admin/revenue/bookings/actions"
import { useFormStatus } from "react-dom"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {pending ? "Wird gespeichert..." : "Buchung speichern"}
    </button>
  )
}

export function AddPrivateBookingForm({ 
  propertyId 
}: { 
  propertyId: string 
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  if (!isExpanded) {
    return (
      <button 
        onClick={() => setIsExpanded(true)}
        className="w-full border-2 border-dashed border-border p-4 rounded-2xl text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-xl leading-none">+</span>
        <span className="font-medium">Private Buchung eintragen</span>
      </button>
    )
  }

  async function action(formData: FormData) {
    setError(null)
    try {
      await addPrivateBooking(formData)
      setIsExpanded(false)
      formRef.current?.reset()
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Neue Privatbuchung</h3>
        <button 
          onClick={() => setIsExpanded(false)}
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Abbrechen
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4">
          {error}
        </div>
      )}

      <form action={action} ref={formRef} className="space-y-4">
        <input type="hidden" name="propertyId" value={propertyId} />
        
        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Name des Gastes</label>
          <input 
            type="text" 
            name="guestName"
            required 
            placeholder="Max Mustermann"
            className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Check-in</label>
            <input 
              type="date" 
              name="checkIn"
              required 
              className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Check-out</label>
            <input 
              type="date" 
              name="checkOut"
              required 
              className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Betrag (€)</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-muted-foreground">€</span>
            <input 
              type="number" 
              step="0.01"
              name="amount"
              required 
              placeholder="0.00"
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}
