import type { ReactNode } from 'react'

export function AuthLayout({ children }: { children: ReactNode }) {
  return <main className="auth-page">
    <section className="auth-intro" aria-label="FloodReady LK introduction">
      <a className="brand" href="/"><span className="brand-mark" aria-hidden="true">FR</span><span>FloodReady LK</span></a>
      <div className="auth-intro-copy">
        <p className="eyebrow">Prepared communities save lives</p>
        <h1>Stay informed.<br />Stay prepared.</h1>
        <p>Access trusted flood guidance and keep your household ready when it matters most.</p>
      </div>
      <p className="location-note">Built for communities across Sri Lanka</p>
    </section>
    <section className="auth-panel">{children}</section>
  </main>
}
