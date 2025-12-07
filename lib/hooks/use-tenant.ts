'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { useTenantStore } from '@/lib/stores/tenant-store'
import { getDemoTenant, DEMO_SETTINGS, DEMO_TENANTS } from '@/lib/demo-data'
import type { Tenant, TenantSettings } from '@/types'

// Default demo tenant
const DEFAULT_DEMO_TENANT = DEMO_TENANTS['demo']

export function useTenant(slug?: string) {
  const supabase = createClient()
  const { tenant, settings, setTenant, setSettings, setLoading, setError } = useTenantStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['tenant', slug],
    queryFn: async () => {
      // Demo mode - load tenant from slug or use default
      if (!isSupabaseConfigured || !supabase) {
        const demoTenant = slug ? getDemoTenant(slug) : DEFAULT_DEMO_TENANT
        return { tenant: demoTenant || DEFAULT_DEMO_TENANT, settings: DEMO_SETTINGS }
      }

      if (!slug) return null

      const { data: tenantData, error: tenantError } = await supabase
        .from('tenants')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'ACTIVE')
        .single()

      if (tenantError) throw tenantError

      const { data: settingsData } = await supabase
        .from('tenant_settings')
        .select('*')
        .eq('tenant_id', tenantData.id)
        .single()

      return { tenant: tenantData as Tenant, settings: settingsData as TenantSettings }
    },
    enabled: !isSupabaseConfigured || !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  useEffect(() => {
    setLoading(isLoading)
    if (data) {
      setTenant(data.tenant)
      setSettings(data.settings)
    }
    if (error) {
      setError(error.message)
    }
  }, [data, isLoading, error, setTenant, setSettings, setLoading, setError])

  return {
    tenant: data?.tenant || tenant || DEFAULT_DEMO_TENANT,
    settings: data?.settings || settings || DEMO_SETTINGS,
    isLoading,
    error,
  }
}

export function useCurrentTenant() {
  const { tenant, settings, isLoading, error } = useTenantStore()

  // Return demo data if no tenant is set
  return {
    tenant: tenant || DEFAULT_DEMO_TENANT,
    settings: settings || DEMO_SETTINGS,
    isLoading,
    error
  }
}
