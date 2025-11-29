import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// Configuration for protected routes and role-based access
const ROUTE_CONFIG = {
  // Super admin only routes
  superAdmin: ['/superadmin', '/tenants', '/subscriptions'],
  // Institution admin routes
  admin: ['/dashboard', '/settings', '/staff', '/reports'],
  // Academic staff routes
  academic: ['/academics', '/courses', '/examinations', '/results', '/timetable'],
  // Finance routes
  finance: ['/finance', '/payments', '/invoices'],
  // Student routes
  student: ['/my-courses', '/my-results', '/my-payments'],
  // Public routes (no auth required)
  public: ['/', '/login', '/register', '/forgot-password', '/verify', '/apply'],
}

export async function middleware(request: NextRequest) {
  // Get hostname for subdomain detection
  const hostname = request.headers.get('host') || ''
  const subdomain = getSubdomain(hostname)

  // Handle subdomain routing
  if (subdomain && subdomain !== 'www' && subdomain !== 'app') {
    // Rewrite to tenant-specific handling
    const url = request.nextUrl.clone()

    // Add tenant context to the request
    const response = await updateSession(request)
    response.headers.set('x-tenant-slug', subdomain)

    return response
  }

  // Handle main domain (marketing site or super admin)
  return await updateSession(request)
}

function getSubdomain(hostname: string): string | null {
  // Remove port if present
  const host = hostname.split(':')[0]

  // Local development handling
  if (host === 'localhost' || host === '127.0.0.1') {
    return null
  }

  // Check for subdomain in localhost (e.g., tenant.localhost:3000)
  if (host.endsWith('.localhost')) {
    return host.replace('.localhost', '')
  }

  // Production subdomain detection
  const parts = host.split('.')

  // Minimum: subdomain.domain.tld (3 parts)
  if (parts.length >= 3) {
    const subdomain = parts[0]
    // Skip common non-tenant subdomains
    if (['www', 'api', 'admin', 'app'].includes(subdomain)) {
      return null
    }
    return subdomain
  }

  return null
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
