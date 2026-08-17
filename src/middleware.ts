import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const pathname = req.nextUrl.pathname

  const isLoginRoute = pathname === '/admin/login'
  const isAdminRoute = pathname.startsWith('/admin') && !isLoginRoute
  const isAdminApiRoute = pathname.startsWith('/api/admin')

  // Block any unauthorized access to /admin/* or /api/admin/*
  if ((isAdminRoute || isAdminApiRoute) && !isLoggedIn) {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(
      new URL('/admin/login?callbackUrl=' + encodeURIComponent(pathname), req.nextUrl)
    )
  }
  
  if (isLoginRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/revenue', req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
