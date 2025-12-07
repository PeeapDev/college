'use client'

import { useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { DASHBOARD_MENU } from '@/config/constants'
import { useSubdomain } from '@/lib/hooks/use-subdomain'
import { useTenant } from '@/lib/hooks/use-tenant'
import { useTenantStore } from '@/lib/stores/tenant-store'

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const subdomain = useSubdomain()
  const { tenant } = useTenant(subdomain || undefined)
  const { setTenant } = useTenantStore()

  // Set tenant from subdomain on mount
  useEffect(() => {
    if (tenant) {
      setTenant(tenant)
    }
  }, [tenant, setTenant])

  // In production, this would be determined by the user's role
  const navigation = DASHBOARD_MENU.admin

  return (
    <DashboardLayout navigation={navigation}>
      {children}
    </DashboardLayout>
  )
}
