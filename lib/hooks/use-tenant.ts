'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { useTenantStore } from '@/lib/stores/tenant-store'
import type { Tenant, TenantSettings } from '@/types'

// Demo tenant for when Supabase is not configured
const DEMO_TENANT: Tenant = {
  id: 'demo-tenant-id',
  name: 'Demo University',
  slug: 'demo',
  type: 'UNIVERSITY',
  primary_color: '#1a56db',
  secondary_color: '#7c3aed',
  country: 'Sierra Leone',
  subscription_plan: 'PROFESSIONAL',
  subscription_status: 'ACTIVE',
  status: 'ACTIVE',
  max_students: 2000,
  max_staff: 200,
  storage_limit_gb: 50,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

const DEMO_SETTINGS: TenantSettings = {
  id: 'demo-settings-id',
  tenant_id: 'demo-tenant-id',
  academic_year_start_month: 9,
  grading_scale: {
    name: 'Standard GPA',
    grades: [
      { letter: 'A', min_score: 70, max_score: 100, grade_point: 4.0, description: 'Excellent' },
      { letter: 'B', min_score: 60, max_score: 69, grade_point: 3.0, description: 'Very Good' },
      { letter: 'C', min_score: 50, max_score: 59, grade_point: 2.0, description: 'Good' },
      { letter: 'D', min_score: 45, max_score: 49, grade_point: 1.0, description: 'Pass' },
      { letter: 'F', min_score: 0, max_score: 44, grade_point: 0.0, description: 'Fail' },
    ],
  },
  currency: 'USD',
  timezone: 'UTC',
  date_format: 'DD/MM/YYYY',
  semester_system: 'SEMESTER',
  allow_online_applications: true,
  allow_online_payments: true,
  require_admission_approval: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export function useTenant(slug?: string) {
  const supabase = createClient()
  const { tenant, settings, setTenant, setSettings, setLoading, setError } = useTenantStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['tenant', slug],
    queryFn: async () => {
      // Demo mode
      if (!isSupabaseConfigured || !supabase) {
        return { tenant: DEMO_TENANT, settings: DEMO_SETTINGS }
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
    tenant: data?.tenant || tenant || DEMO_TENANT,
    settings: data?.settings || settings || DEMO_SETTINGS,
    isLoading,
    error,
  }
}

export function useCurrentTenant() {
  const { tenant, settings, isLoading, error } = useTenantStore()

  // Return demo data if no tenant is set
  return {
    tenant: tenant || DEMO_TENANT,
    settings: settings || DEMO_SETTINGS,
    isLoading,
    error
  }
}
