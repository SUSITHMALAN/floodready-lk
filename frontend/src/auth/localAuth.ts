export type LocalUser = {
  id: string
  email: string
  created_at: string
}

export type LocalSession = {
  user: LocalUser
  access_token: string
}

const LOCAL_USERS_KEY = 'floodready_local_users'
const LOCAL_SESSION_KEY = 'floodready_local_session'

// Get stored users from localStorage
export function getLocalUsers(): Record<string, string> {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

// Store a new user
export function saveLocalUser(email: string, passwordHash: string) {
  const users = getLocalUsers()
  users[email.toLowerCase().trim()] = passwordHash
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users))
}

// Get active local session
export function getLocalSession(): LocalSession | null {
  try {
    const raw = localStorage.getItem(LOCAL_SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Save active session
export function setLocalSession(email: string): LocalSession {
  const session: LocalSession = {
    user: {
      id: 'local-' + Math.random().toString(36).substring(2, 9),
      email: email.toLowerCase().trim(),
      created_at: new Date().toISOString(),
    },
    access_token: 'local-token-' + Date.now(),
  }
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session))
  return session
}

// Clear session
export function clearLocalSession() {
  localStorage.removeItem(LOCAL_SESSION_KEY)
}
