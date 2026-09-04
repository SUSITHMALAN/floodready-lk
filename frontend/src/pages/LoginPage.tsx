import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.tsx'
import { validateCredentials } from '../auth/validation.ts'
import type { AuthFieldErrors } from '../auth/validation.ts'
import { AuthLayout } from '../components/AuthLayout.tsx'
import { isSupabaseConfigured, supabase } from '../lib/supabase.ts'
import { getLocalUsers, setLocalSession } from '../auth/localAuth.ts'

export function LoginPage() {
  const navigate = useNavigate()
  const { session, sessionLoading, setSessionState } = useAuth() as any
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<AuthFieldErrors>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  if (sessionLoading) return null
  if (session) return <Navigate to="/" replace />

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateCredentials(email, password)
    setErrors(nextErrors)
    setFormError('')
    if (Object.keys(nextErrors).length) return

    setLoading(true)

    // Attempt Supabase if configured
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (!error && data.session) {
          setLoading(false)
          setSessionState({
            user: { id: data.session.user.id, email: data.session.user.email || email },
            access_token: data.session.access_token,
          })
          setLocalSession(email)
          navigate('/', { replace: true })
          return
        }
      } catch {
        // Fall back to local auth if Supabase call fails
      }
    }

    // Local authentication fallback
    const users = getLocalUsers()
    const cleanEmail = email.trim().toLowerCase()
    
    if (users[cleanEmail]) {
      if (users[cleanEmail] !== password) {
        setLoading(false)
        setFormError('The password you entered is incorrect. Please try again.')
        return
      }
    }

    // Login successful (or auto-register for local dev)
    const localSess = setLocalSession(cleanEmail)
    setSessionState({
      user: { id: localSess.user.id, email: localSess.user.email },
      access_token: localSess.access_token,
    })
    setLoading(false)
    navigate('/', { replace: true })
  }

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-heading">
          <p className="eyebrow">Welcome back</p>
          <h2>Log in to your account</h2>
          <p>Continue to your FloodReady LK dashboard.</p>
        </div>
        {formError && (
          <div className="message error-message text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-lg text-sm mb-4" role="alert">
            {formError}
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              aria-invalid={Boolean(errors.email)}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>
          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              aria-invalid={Boolean(errors.password)}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>
          <button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all mt-2" type="submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>
        <p className="auth-switch text-center text-sm text-slate-600 mt-6">
          New to FloodReady LK? <Link to="/signup" className="text-teal-700 font-semibold hover:underline">Create an account</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
