import { Metadata } from "next"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Admin Login | ElbStay",
}

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-6 py-24 min-h-[70vh] flex flex-col justify-center">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Admin Login</h1>
        <p className="text-muted-foreground">Zugang zum geschützten Revenue Dashboard.</p>
      </div>
      <div className="bg-background border border-border rounded-2xl p-8 shadow-sm">
        <LoginForm />
      </div>
    </div>
  )
}
