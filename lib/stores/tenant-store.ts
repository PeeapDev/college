import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Tenant, TenantSettings } from '@/types'

interface TenantState {
  tenant: Tenant | null
  settings: TenantSettings | null
  isLoading: boolean
  error: string | null
  setTenant: (tenant: Tenant | null) => void
  setSettings: (settings: TenantSettings | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      tenant: null,
      settings: null,
      isLoading: false,
      error: null,
      setTenant: (tenant) => set({ tenant }),
      setSettings: (settings) => set({ settings }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () => set({ tenant: null, settings: null, error: null }),
    }),
    {
      name: 'tenant-storage',
      partialize: (state) => ({ tenant: state.tenant }),
    }
  )
)
