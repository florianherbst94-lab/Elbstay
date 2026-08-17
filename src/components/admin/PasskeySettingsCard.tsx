"use client"

import { useState } from "react"
import { signIn as passkeySignIn } from "next-auth/webauthn"
import { KeyRound, ShieldCheck, Loader2, CheckCircle2, AlertCircle, Fingerprint } from "lucide-react"

export function PasskeySettingsCard() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message?: string }>({
    type: "idle",
  })

  const handleRegisterPasskey = async () => {
    setIsRegistering(true)
    setStatus({ type: "idle" })

    try {
      // In next-auth/webauthn, calling signIn with action: "register" triggers startRegistration()
      const res = await passkeySignIn("passkey", {
        action: "register",
        redirect: false,
      })

      if (res?.error) {
        if (res.error.includes("NotAllowedError") || res.error.includes("abort") || res.error.includes("cancel")) {
          setStatus({
            type: "error",
            message: "Registrierung wurde abgebrochen.",
          })
        } else {
          setStatus({
            type: "error",
            message: `Registrierung fehlgeschlagen: ${res.error}`,
          })
        }
      } else {
        setStatus({
          type: "success",
          message: "Passkey erfolgreich auf diesem Gerät / Apple-Konto eingerichtet! Du kannst dich ab sofort mit Face ID / Touch ID anmelden.",
        })
      }
    } catch (err: any) {
      console.error("Passkey registration error:", err)
      const msg = err?.message || ""
      if (msg.includes("NotAllowedError") || msg.includes("abort") || msg.includes("cancel")) {
        setStatus({
          type: "error",
          message: "Registrierung abgebrochen.",
        })
      } else {
        setStatus({
          type: "error",
          message: "Passkey konnte nicht registriert werden. Stelle sicher, dass Touch ID / Face ID aktiviert ist.",
        })
      }
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <div className="bg-background rounded-2xl border border-border p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Fingerprint className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Apple Passkey / Touch ID & Face ID</h3>
            <p className="text-sm text-muted-foreground">
              Melde dich ohne Passworteingabe sicher über biometrische Authentifizierung an.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRegisterPasskey}
          disabled={isRegistering}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition disabled:opacity-50 shrink-0 shadow-xs"
        >
          {isRegistering ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <KeyRound className="w-4 h-4" />
          )}
          <span>{isRegistering ? "Warte auf Bestätigung..." : "Passkey hinzufügen"}</span>
        </button>
      </div>

      {status.type === "success" && (
        <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm font-medium">{status.message}</p>
        </div>
      )}

      {status.type === "error" && (
        <div className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-destructive" />
          <p className="text-sm">{status.message}</p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span>Synchronisiert sicher über den Apple iCloud-Schlüsselbund</span>
        </div>
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-primary shrink-0" />
          <span>Funktioniert auf Mac (Touch ID), iPhone & iPad (Face ID)</span>
        </div>
      </div>
    </div>
  )
}
