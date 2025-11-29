'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { useTenantStore } from '@/lib/stores/tenant-store'
import type { Tenant, TenantSettings } from '@/types'

export function useTenant(slug?: string) {
  const supabase = createClient()
  const { tenant, settings, setTenant, setSettings, setLoading, setError } = useTenantStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['tenant', slug],
    queryFn: async () => {
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
    enabled: !!slug,
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
    tenant: data?.tenant || tenant,
    settings: data?.settings || settings,
    isLoading,
    error,
  }
}

export function useCurrentTenant() {
  const { tenant, settings, isLoading, error } = useTenantStore()
  return { tenant, settings, isLoading, error }
}
