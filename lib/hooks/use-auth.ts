'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/auth-store'
import type { User, UserRole } from '@/types'

// Demo user for when Supabase is not configured
const DEMO_USER: User = {
  id: 'demo-user-id',
  tenant_id: 'demo-tenant-id',
  email: 'admin@demo.edu',
  first_name: 'Demo',
  last_name: 'Admin',
  role: 'REGISTRAR',
  is_active: true,
  email_verified: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export function useAuth() {
  const supabase = createClient()
  const router = useRouter()
  const { user, profile, isAuthenticated, isLoading, setUser, setProfile, setLoading, logout: storeLogout } = useAuthStore()

  useEffect(() => {
    // If Supabase is not configured, use demo mode
    if (!isSupabaseConfigured || !supabase) {
      setUser(DEMO_USER)
      setLoading(false)
      return
    }

    const getUser = async () => {
      setLoading(true)
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser()

        if (authUser) {
          // Fetch user profile from our users table
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', authUser.id)
            .single()

          if (userData) {
            setUser(userData as User)

            // Fetch additional profile
            const { data: profileData } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('user_id', authUser.id)
              .single()

            if (profileData) {
              setProfile(profileData)
            }
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Auth error:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        storeLogout()
        router.push('/login')
      } else if (session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (userData) {
          setUser(userData as User)
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    // Demo mode
    if (!isSupabaseConfigured || !supabase) {
      setUser(DEMO_USER)
      return { user: DEMO_USER, error: null }
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, metadata: {
    first_name: string
    last_name: string
    role: UserRole
    tenant_id?: string
  }) => {
    // Demo mode
    if (!isSupabaseConfigured || !supabase) {
      return { user: null, error: new Error('Registration not available in demo mode') }
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })

      if (error) throw error

      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    // Demo mode
    if (!isSupabaseConfigured || !supabase) {
      storeLogout()
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      await supabase.auth.signOut()
      storeLogout()
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    // Demo mode
    if (!isSupabaseConfigured || !supabase) {
      return { error: new Error('Password reset not available in demo mode') }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  }

  return {
    user,
    profile,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    isDemoMode: !isSupabaseConfigured,
  }
}

export function useRequireAuth(allowedRoles?: UserRole[]) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Skip auth check in demo mode
    if (!isSupabaseConfigured) {
      return
    }

    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }

    if (!isLoading && isAuthenticated && allowedRoles && user) {
      if (!allowedRoles.includes(user.role)) {
        router.push('/unauthorized')
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router])

  return { user, isLoading }
}
