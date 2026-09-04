import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.tsx'
import { validateSignup } from '../auth/validation.ts'
import type { AuthFieldErrors } from '../auth/validation.ts'
import { AuthLayout } from '../components/AuthLayout.tsx'
import { isSupabaseConfigured, supabase } from '../lib/supabase.ts'
import { saveLocalUser, setLocalSession } from '../auth/localAuth.ts'

export function SignupPage() {
  const navigate = useNavigate()
  const { setSessionState } = useAuth() as any
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<AuthFieldErrors>({})
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateSignup(email, password, confirmPassword)
    setErrors(nextErrors)
    setFormError('')
    setSuccessMessage('')
    if (Object.keys(nextErrors).length) return

    setLoading(true)
    const cleanEmail = email.trim().toLowerCase()

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: { emailRedirectTo: `${window.location.origin}/login` },
        })
        if (!error) {
          setLoading(false)
          if (data.session) {
            setSessionState({
              user: { id: data.session.user.id, email: data.session.user.email || cleanEmail },
              access_token: data.session.access_token,
            })
            setLocalSession(cleanEmail)
            navigate('/', { replace: true })
            return
          }
          setSuccessMessage('Account created! Check your email and follow the confirmation link before logging in.')
          setPassword('')
          setConfirmPassword('')
          return
        }
      } catch {
        // Fall back to local registration
      }
    }

    // Local user registration fallback
    saveLocalUser(cleanEmail, password)
    const localSess = setLocalSession(cleanEmail)
    setSessionState({
      user: { id: localSess.user.id, email: localSess.user.email },
      access_token: localSess.access_token,
    })
    setLoading(false)
    setSuccessMessage('Your account is ready! Redirecting to home...')
    setTimeout(() => {
      navigate('/', { replace: true })
    }, 1200)
  }

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-heading">
          <p className="eyebrow">Get prepared</p>
          <h2>Create your account</h2>
          <p>Join FloodReady LK and prepare with confidence.</p>
        </div>
        {formError && (
          <div className="message error-message text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-lg text-sm mb-4" role="alert">
            {formError}
          </div>
        )}
        {successMessage && (
          <div className="message success-message text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-sm mb-4" role="status">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="signup-email">Email address</label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              value={password}
              aria-invalid={Boolean(errors.password)}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
            />
            {errors.password ? (
              <p className="field-error">{errors.password}</p>
            ) : (
              <p className="field-help text-xs text-slate-500 mt-1">Use 6 or more characters.</p>
            )}
          </div>
          <div className="field">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              aria-invalid={Boolean(errors.confirmPassword)}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Enter your password again"
            />
            {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
          </div>
          <button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all mt-2" type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className="auth-switch text-center text-sm text-slate-600 mt-6">
          Already have an account? <Link to="/login" className="text-teal-700 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
