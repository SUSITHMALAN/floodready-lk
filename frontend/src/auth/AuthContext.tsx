/* oxlint-disable react/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase.ts'
import { getLocalSession, clearLocalSession, setLocalSession } from './localAuth.ts'

export type AuthUser = {
  id: string
  email: string
}

export type AuthSession = {
  user: AuthUser
  access_token?: string
}

type AuthContextValue = {
  session: AuthSession | null
  loading: boolean
  setSessionState: (session: AuthSession | null) => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [loading, setLoading] = useState(true)

  const setSessionState = (newSession: AuthSession | null) => {
    setSession(newSession)
  }

  const signOut = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut()
      } catch {
        // ignore
      }
    }
    clearLocalSession()
    setSession(null)
  }

  useEffect(() => {
    let isMounted = true

    async function initAuth() {
      // 1. Check local session first
      const local = getLocalSession()
      if (local && isMounted) {
        setSession({ user: { id: local.user.id, email: local.user.email }, access_token: local.access_token })
        setLoading(false)
        return
      }

      // 2. Check Supabase if configured
      if (isSupabaseConfigured) {
        try {
          const { data } = await supabase.auth.getSession()
          if (data?.session && isMounted) {
            setSession({
              user: { id: data.session.user.id, email: data.session.user.email || '' },
              access_token: data.session.access_token,
            })
          }
        } catch {
          // ignore
        }
      }

      if (isMounted) setLoading(false)
    }

    initAuth()

    if (isSupabaseConfigured) {
      const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
        if (nextSession && isMounted) {
          setSession({
            user: { id: nextSession.user.id, email: nextSession.user.email || '' },
            access_token: nextSession.access_token,
          })
          setLocalSession(nextSession.user.email || '')
        } else if (!nextSession && !getLocalSession() && isMounted) {
          setSession(null)
        }
        if (isMounted) setLoading(false)
      })
      return () => {
        isMounted = false
        listener.subscription.unsubscribe()
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ session, loading, setSessionState, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
