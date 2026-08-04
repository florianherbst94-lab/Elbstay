import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isRevenueAdminRoute = req.nextUrl.pathname.startsWith('/admin/revenue')
  const isLoginRoute = req.nextUrl.pathname === '/admin/login'

  if (isRevenueAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login?callbackUrl=' + encodeURIComponent(req.nextUrl.pathname), req.nextUrl))
  }
  
  if (isLoginRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/revenue', req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
