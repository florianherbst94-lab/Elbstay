"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { LogOut, Loader2 } from "lucide-react"

interface LogoutButtonProps {
  className?: string
  variant?: "sidebar" | "button" | "minimal"
}

export function LogoutButton({ className, variant = "sidebar" }: LogoutButtonProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut({ callbackUrl: "/admin/login" })
    } catch (e) {
      console.error("Logout error:", e)
      setIsLoggingOut(false)
    }
  }

  if (variant === "sidebar") {
    return (
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={
          className ||
          "w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 text-sm text-destructive font-medium transition-colors disabled:opacity-50 text-left"
        }
      >
        {isLoggingOut ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <LogOut className="w-5 h-5" />
        )}
        <span>{isLoggingOut ? "Wird abgemeldet..." : "Abmelden"}</span>
      </button>
    )
  }

  if (variant === "minimal") {
    return (
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={
          className ||
          "flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-destructive/10 hover:border-destructive/30 text-sm text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
        }
      >
        {isLoggingOut ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <LogOut className="w-4 h-4" />
        )}
        <span>{isLoggingOut ? "Abmelden..." : "Abmelden"}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={
        className ||
        "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm font-medium transition-colors disabled:opacity-50"
      }
    >
      {isLoggingOut ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      <span>{isLoggingOut ? "Wird abgemeldet..." : "Abmelden"}</span>
    </button>
  )
}
