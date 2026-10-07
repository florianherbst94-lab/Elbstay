import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = req.nextUrl.pathname === '/admin/login'

  if (isOnAdminRoute) {
    if (isLoginPage) {
      if (isLoggedIn) {
        // Redirect to revenue dashboard if already logged in
        return Response.redirect(new URL('/admin/revenue', req.nextUrl))
      }
      return null // Let them see the login page
    }
    
    if (!isLoggedIn) {
      // Redirect unauthenticated users to login page
      const redirectUrl = new URL('/admin/login', req.nextUrl)
      // Save the original URL to return them after login
      redirectUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
      return Response.redirect(redirectUrl)
    }
  }

  return null
})

// Specify which routes this middleware should run on
export const config = {
  matcher: ['/admin/:path*'],
}
