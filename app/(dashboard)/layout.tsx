'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { DASHBOARD_MENU } from '@/config/constants'

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In production, this would be determined by the user's role
  const navigation = DASHBOARD_MENU.admin

  return (
    <DashboardLayout navigation={navigation}>
      {children}
    </DashboardLayout>
  )
}
