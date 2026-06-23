"use client"
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email o contraseña incorrectos')
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #07111f; color: #f5f7fa; font-family: system-ui, sans-serif; }
        .auth-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .auth-card { background: #0e1f35; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 2.5rem; width: 100%; max-width: 420px; }
        .auth-logo { font-size: 1.4rem; font-weight: 600; margin-bottom: 2rem; text-align: center; }
        .auth-logo span { color: #00c9a7; }
        .auth-title { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem; }
        .auth-sub { color: #8a9bb0; font-size: 0.9rem; margin-bottom: 2rem; }
        .form-group { margin-bottom: 1.25rem; }
        label { display: block; font-size: 0.85rem; color: #8a9bb0; margin-bottom: 0.5rem; }
        input { width: 100%; background: #07111f; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 0.75rem 1rem; color: #f5f7fa; font-size: 0.95rem; outline: none; transition: border-color 0.2s; }
        input:focus { border-color: #00c9a7; }
        .btn { width: 100%; background: #00c9a7; color: #07111f; border: none; border-radius: 100px; padding: 0.9rem; font-size: 0.95rem; font-weight: 500; cursor: pointer; margin-top: 0.5rem; transition: background 0.2s; }
        .btn:hover { background: #009e84; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .error { background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.3); color: #ff8080; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.88rem; margin-bottom: 1rem; }
        .auth-link { text-align: center; margin-top: 1.5rem; font-size: 0.88rem; color: #8a9bb0; }
        .auth-link a { color: #00c9a7; text-decoration: none; }
      `}</style>
      <div className="auth-container">
        <div className="auth-card">
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'4px',marginBottom:'2rem'}}>
  <svg width="28" height="36" viewBox="0 0 70 90" style={{flexShrink:0}}>
    <path d="M6 82 Q22 38 62 16" fill="none" stroke="#00c9a7" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="62" cy="16" r="5" fill="#00c9a7"/>
    <circle cx="6" cy="82" r="2.5" fill="#00c9a7" opacity="0.35"/>
  </svg>
  <div style={{position:'relative',lineHeight:'1'}}>
    <span style={{fontSize:'22px',fontWeight:200,color:'#f5f7fa',letterSpacing:'-1px'}}>Lap</span>
    <span style={{fontSize:'22px',fontWeight:700,color:'#00c9a7',letterSpacing:'-1px'}}>Skill</span>
    <div style={{height:'1px',background:'#00c9a7',opacity:0.6,marginTop:'2px',width:'calc(100% + 8px)'}}></div>
  </div>
</div>
          <h1 className="auth-title">Bienvenido de vuelta</h1>
          <p className="auth-sub">Ingresá con tu cuenta para continuar entrenando</p>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
          <div className="auth-link">
            ¿No tenés cuenta? <a href="/registro">Registrate gratis</Link>
          </div>
        </div>
      </div>
    </>
  )
}