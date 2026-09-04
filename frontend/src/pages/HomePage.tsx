import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.tsx'

export function HomePage() {
  const { session, loading } = useAuth()

  return (
    <main className="home-page">
      <div className="home-content">
        <span className="brand-mark" aria-hidden="true">FR</span>
        <p className="eyebrow">FloodReady LK</p>
        <h1>Be ready before the water rises.</h1>
        <p className="home-copy">Reliable flood preparedness information for communities across Sri Lanka.</p>
        {!loading && !session && <Link className="primary-link" to="/login">Sign in to continue</Link>}
        {!loading && session && <p className="signed-in">Signed in as <strong>{session.user.email}</strong></p>}
      </div>
    </main>
  )
}
