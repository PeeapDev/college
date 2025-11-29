import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, allow all routes (demo mode)
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not configured - running in demo mode')
    const hostname = request.headers.get('host') || ''
    const subdomain = getSubdomain(hostname)
    if (subdomain) {
      supabaseResponse.headers.set('x-tenant-subdomain', subdomain)
    }
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get the hostname and extract subdomain
  const hostname = request.headers.get('host') || ''
  const subdomain = getSubdomain(hostname)

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/verify']
  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname === route ||
    request.nextUrl.pathname.startsWith('/verify/')
  )

  // If not authenticated and trying to access protected route
  if (!user && !isPublicRoute && !request.nextUrl.pathname.startsWith('/api/')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Add subdomain to headers for downstream use
  if (subdomain) {
    supabaseResponse.headers.set('x-tenant-subdomain', subdomain)
  }

  return supabaseResponse
}

function getSubdomain(hostname: string): string | null {
  // Remove port if present
  const host = hostname.split(':')[0]

  // Check if it's localhost or IP
  if (host === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    return null
  }

  // Split by dots
  const parts = host.split('.')

  // If we have at least 3 parts (subdomain.domain.tld)
  // or 2 parts for localhost subdomains (subdomain.localhost)
  if (parts.length >= 3) {
    return parts[0]
  }

  // Handle subdomain.localhost for local development
  if (parts.length === 2 && parts[1] === 'localhost') {
    return parts[0]
  }

  return null
}
