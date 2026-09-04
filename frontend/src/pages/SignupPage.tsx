import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { validateSignup } from '../auth/validation.ts'
import type { AuthFieldErrors } from '../auth/validation.ts'
import { AuthLayout } from '../components/AuthLayout.tsx'
import { isSupabaseConfigured, supabase } from '../lib/supabase.ts'

export function SignupPage() {
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
    setErrors(nextErrors); setFormError(''); setSuccessMessage('')
    if (Object.keys(nextErrors).length) return
    if (!isSupabaseConfigured) {
      setFormError('Authentication is not configured yet. Please add the Supabase environment variables.')
      return
    }

    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(), password, options: { emailRedirectTo: `${window.location.origin}/login` },
    })
    setLoading(false)
    if (error) { setFormError(error.message); return }
    setSuccessMessage(data.session
      ? 'Your account is ready. You are now signed in.'
      : 'Account created! Check your email and follow the confirmation link before logging in.')
    setPassword(''); setConfirmPassword('')
  }

  return <AuthLayout><div className="auth-card">
    <div className="auth-heading"><p className="eyebrow">Get prepared</p><h2>Create your account</h2><p>Join FloodReady LK and prepare with confidence.</p></div>
    {formError && <div className="message error-message" role="alert">{formError}</div>}
    {successMessage && <div className="message success-message" role="status">{successMessage}</div>}
    <form onSubmit={handleSubmit} noValidate>
      <div className="field"><label htmlFor="signup-email">Email address</label><input id="signup-email" type="email" autoComplete="email" value={email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'signup-email-error' : undefined} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />{errors.email && <p className="field-error" id="signup-email-error">{errors.email}</p>}</div>
      <div className="field"><label htmlFor="signup-password">Password</label><input id="signup-password" type="password" autoComplete="new-password" value={password} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'signup-password-error' : 'password-help'} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" />{errors.password ? <p className="field-error" id="signup-password-error">{errors.password}</p> : <p className="field-help" id="password-help">Use 6 or more characters.</p>}</div>
      <div className="field"><label htmlFor="confirm-password">Confirm password</label><input id="confirm-password" type="password" autoComplete="new-password" value={confirmPassword} aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Enter your password again" />{errors.confirmPassword && <p className="field-error" id="confirm-password-error">{errors.confirmPassword}</p>}</div>
      <button className="submit-button" type="submit" disabled={loading}>{loading ? 'Creating account…' : 'Create account'}</button>
    </form>
    <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
  </div></AuthLayout>
}
