"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { signIn as passkeySignIn } from "next-auth/webauthn"
import { useRouter, useSearchParams } from "next/navigation"
import { KeyRound, Lock, Mail, Loader2, ShieldCheck } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/revenue"
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPasskeyLoading, setIsPasskeyLoading] = useState(false)

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
        setError("Ungültige Zugangsdaten (E-Mail oder Passwort falsch).")
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      setError("Ein unerwarteter Fehler ist aufgetreten.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasskeyLogin = async () => {
    setIsPasskeyLoading(true)
    setError("")
    
    try {
      // Use signIn from next-auth/webauthn which initializes @simplewebauthn/browser
      const res = await passkeySignIn("passkey", {
        redirect: false,
        callbackUrl,
      })
      
      if (res?.error) {
        if (res.error.includes("NotAllowedError") || res.error.includes("timed out") || res.error.includes("abort")) {
          setError("Passkey-Vorgang abgebrochen.")
        } else {
          setError("Passkey nicht erkannt. Bitte melde dich mit Passwort an und richte deinen Passkey in den Admin-Einstellungen ein.")
        }
      } else if (res?.ok || res?.url) {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err: any) {
      console.error("Passkey error:", err)
      const msg = err?.message || ""
      if (msg.includes("NotAllowedError") || msg.includes("cancel") || msg.includes("abort")) {
        setError("Passkey-Anmeldung abgebrochen.")
      } else {
        setError("Kein Passkey auf diesem Gerät gefunden. Bitte zuerst mit E-Mail & Passwort anmelden und Passkey in den Einstellungen hinterlegen.")
      }
    } finally {
      setIsPasskeyLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-foreground flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-muted-foreground" /> E-Mail
          </label>
          <input
            type="email"
            required
            autoComplete="username webauthn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            placeholder="admin@elbstay.de"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-foreground flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-muted-foreground" /> Passwort
          </label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || isPasskeyLoading}
          className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-medium hover:opacity-95 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          <span>{isLoading ? "Bitte warten..." : "Mit Passwort anmelden"}</span>
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">oder</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePasskeyLogin}
        disabled={isLoading || isPasskeyLoading}
        className="w-full border border-border bg-muted/40 hover:bg-muted/80 text-foreground py-2.5 rounded-xl font-medium transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs"
      >
        {isPasskeyLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        ) : (
          <KeyRound className="w-4 h-4 text-primary" />
        )}
        <span>{isPasskeyLoading ? "Touch ID / Face ID aktiv..." : "Mit Apple Passkey anmelden"}</span>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Geschützter ElbStay Administrationsbereich</span>
      </div>
    </div>
  )
}
