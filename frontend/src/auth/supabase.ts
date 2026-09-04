export interface UserSession {
  token: string
  email: string
}

export function getStoredSession(): UserSession | null {
  const token = localStorage.getItem('floodready_token')
  const email = localStorage.getItem('floodready_email')
  return token && email ? { token, email } : null
}

export function storeSession(token: string, email: string) {
  localStorage.setItem('floodready_token', token)
  localStorage.setItem('floodready_email', email)
}

export function clearSession() {
  localStorage.removeItem('floodready_token')
  localStorage.removeItem('floodready_email')
}
