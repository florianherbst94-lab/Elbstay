"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/revenue"
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (res?.error) {
        setError("Ungültige Zugangsdaten")
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      setError("Ein Fehler ist aufgetreten")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasskeyLogin = async () => {
    setIsLoading(true)
    setError("")
    
    try {
      const res = await signIn("passkey", {
        redirect: false,
        action: "authenticate" // or "register" if registering
      })
      
      if (res?.error) {
        setError("Passkey-Anmeldung fehlgeschlagen")
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      setError("Ein Fehler ist aufgetreten")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">E-Mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2"
            placeholder="admin@elbstay.de"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Passwort</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground py-2 rounded-xl font-medium hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Bitte warten..." : "Anmelden"}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">oder</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePasskeyLogin}
        disabled={isLoading}
        className="w-full border border-border bg-muted/50 py-2 rounded-xl font-medium hover:bg-muted disabled:opacity-50"
      >
        Mit Apple Passkey anmelden
      </button>
    </div>
  )
}
