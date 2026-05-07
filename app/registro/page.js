"use client"
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Registro() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pais, setPais] = useState('')
  const [especialidad, setEspecialidad] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleRegistro = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        nombre,
        email,
        pais,
        especialidad,
        rol: 'alumno'
      })
    }
    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #07111f; color: #f5f7fa; font-family: system-ui, sans-serif; }
          .auth-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
          .auth-card { background: #0e1f35; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 2.5rem; width: 100%; max-width: 420px; text-align: center; }
          .success-icon { font-size: 3rem; margin-bottom: 1rem; }
          .auth-logo { font-size: 1.4rem; font-weight: 600; margin-bottom: 2rem; }
          .auth-logo span { color: #00c9a7; }
          h1 { font-size: 1.5rem; margin-bottom: 0.75rem; }
          p { color: #8a9bb0; line-height: 1.6; }
          .btn { display: block; width: 100%; background: #00c9a7; color: #07111f; border: none; border-radius: 100px; padding: 0.9rem; font-size: 0.95rem; font-weight: 500; cursor: pointer; margin-top: 2rem; text-decoration: none; text-align: center; }
        `}</style>
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-logo">Lap<span>Skill</span></div>
            <div className="success-icon">✅</div>
            <h1>¡Cuenta creada!</h1>
            <p>Te enviamos un email de confirmación. Revisá tu bandeja de entrada y confirmá tu cuenta para poder ingresar.</p>
            <a href="/login" className="btn">Ir al login</a>
          </div>
        </div>
      </>
    )
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
        input, select { width: 100%; background: #07111f; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 0.75rem 1rem; color: #f5f7fa; font-size: 0.95rem; outline: none; transition: border-color 0.2s; }
        input:focus, select:focus { border-color: #00c9a7; }
        select option { background: #07111f; }
        .btn { width: 100%; background: #00c9a7; color: #07111f; border: none; border-radius: 100px; padding: 0.9rem; font-size: 0.95rem; font-weight: 500; cursor: pointer; margin-top: 0.5rem; transition: background 0.2s; }
        .btn:hover { background: #009e84; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .error { background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.3); color: #ff8080; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.88rem; margin-bottom: 1rem; }
        .auth-link { text-align: center; margin-top: 1.5rem; font-size: 0.88rem; color: #8a9bb0; }
        .auth-link a { color: #00c9a7; text-decoration: none; }
      `}</style>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">Lap<span>Skill</span></div>
          <h1 className="auth-title">Crear cuenta</h1>
          <p className="auth-sub">Empezá a entrenar tu técnica laparoscópica hoy</p>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleRegistro}>
            <div className="form-group">
              <label>Nombre completo</label>
              <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Dr. Juan Pérez" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required />
            </div>
            <div className="form-group">
              <label>País</label>
              <select value={pais} onChange={e => setPais(e.target.value)} required>
                <option value="">Seleccioná tu país</option>
                <option value="Argentina">Argentina</option>
                <option value="México">México</option>
                <option value="Colombia">Colombia</option>
                <option value="Chile">Chile</option>
                <option value="Perú">Perú</option>
                <option value="Brasil">Brasil</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Ecuador">Ecuador</option>
                <option value="España">España</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Especialidad</label>
              <select value={especialidad} onChange={e => setEspecialidad(e.target.value)} required>
                <option value="">Seleccioná tu especialidad</option>
                <option value="Cirugía General">Cirugía General</option>
                <option value="Cirugía Bariátrica">Cirugía Bariátrica</option>
                <option value="Cirugía Colorrectal">Cirugía Colorrectal</option>
                <option value="Ginecología">Ginecología</option>
                <option value="Urología">Urología</option>
                <option value="Residente">Residente</option>
                <option value="Otra">Otra</option>
              </select>
            </div>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
          <div className="auth-link">
            ¿Ya tenés cuenta? <a href="/login">Ingresá acá</a>
          </div>
        </div>
      </div>
    </>
  )
}