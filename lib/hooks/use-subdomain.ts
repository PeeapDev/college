'use client'

import { useMemo } from 'react'

export function useSubdomain(): string | null {
  return useMemo(() => {
    if (typeof window === 'undefined') return null
    
    const hostname = window.location.hostname
    const parts = hostname.split('.')
    
    // Handle subdomain.localhost (e.g., fbc.localhost)
    if (parts.length === 2 && parts[1] === 'localhost') {
      return parts[0]
    }
    
    // Handle subdomain.domain.tld (e.g., fbc.educloud.com)
    if (parts.length >= 3) {
      const subdomain = parts[0]
      // Skip common non-tenant subdomains
      if (['www', 'api', 'admin', 'app'].includes(subdomain)) {
        return null
      }
      return subdomain
    }
    
    return null
  }, [])
}

export function getSubdomainFromHost(hostname: string): string | null {
  const host = hostname.split(':')[0] // Remove port
  const parts = host.split('.')
  
  // Handle subdomain.localhost
  if (parts.length === 2 && parts[1] === 'localhost') {
    return parts[0]
  }
  
  // Handle subdomain.domain.tld
  if (parts.length >= 3) {
    const subdomain = parts[0]
    if (['www', 'api', 'admin', 'app'].includes(subdomain)) {
      return null
    }
    return subdomain
  }
  
  return null
}
