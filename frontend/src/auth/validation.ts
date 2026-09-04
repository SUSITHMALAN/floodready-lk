export type AuthFieldErrors = { email?: string; password?: string; confirmPassword?: string }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateCredentials(email: string, password: string): AuthFieldErrors {
  const errors: AuthFieldErrors = {}
  if (!email.trim()) errors.email = 'Please enter your email address.'
  else if (!emailPattern.test(email.trim())) errors.email = 'Please enter a valid email address.'
  if (!password) errors.password = 'Please enter your password.'
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.'
  return errors
}

export function validateSignup(email: string, password: string, confirmPassword: string): AuthFieldErrors {
  const errors = validateCredentials(email, password)
  if (!confirmPassword) errors.confirmPassword = 'Please confirm your password.'
  else if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match.'
  return errors
}
