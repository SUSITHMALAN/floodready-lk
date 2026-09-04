import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.tsx'
import { validateCredentials } from '../auth/validation.ts'
import type { AuthFieldErrors } from '../auth/validation.ts'
import { AuthLayout } from '../components/AuthLayout.tsx'
import { isSupabaseConfigured, supabase } from '../lib/supabase.ts'

export function LoginPage() {
  const navigate = useNavigate()
  const { session, loading: sessionLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<AuthFieldErrors>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!sessionLoading && session) return <Navigate to="/" replace />

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateCredentials(email, password)
    setErrors(nextErrors)
    setFormError('')
    if (Object.keys(nextErrors).length) return
    if (!isSupabaseConfigured) {
      setFormError('Authentication is not configured yet. Please add the Supabase environment variables.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    setLoading(false)
    if (error) {
      setFormError(error.message.toLowerCase().includes('invalid login')
        ? 'The email or password is incorrect. Please try again.' : error.message)
      return
    }
    navigate('/', { replace: true })
  }

  return <AuthLayout><div className="auth-card">
    <div className="auth-heading"><p className="eyebrow">Welcome back</p><h2>Log in to your account</h2><p>Continue to your FloodReady LK dashboard.</p></div>
    {formError && <div className="message error-message" role="alert">{formError}</div>}
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="login-email">Email address</label>
        <input id="login-email" type="email" autoComplete="email" value={email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'login-email-error' : undefined} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        {errors.email && <p className="field-error" id="login-email-error">{errors.email}</p>}
      </div>
      <div className="field">
        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" autoComplete="current-password" value={password} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'login-password-error' : undefined} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
        {errors.password && <p className="field-error" id="login-password-error">{errors.password}</p>}
      </div>
      <button className="submit-button" type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Log in'}</button>
    </form>
    <p className="auth-switch">New to FloodReady LK? <Link to="/signup">Create an account</Link></p>
  </div></AuthLayout>
}
