"use client"
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
      setLoading(false)
    }
    getProfile()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div style={{minHeight:'100vh', background:'#07111f', display:'flex', alignItems:'center', justifyContent:'center', color:'#00c9a7', fontFamily:'system-ui'}}>
      Cargando...
    </div>
  )

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #07111f; color: #f5f7fa; font-family: system-ui, sans-serif; }
        .dashboard { max-width: 1100px; margin: 0 auto; padding: 2rem; }
        nav { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 2rem; background: rgba(14,31,53,0.9); border-bottom: 1px solid rgba(255,255,255,0.08); position: fixed; top: 0; left: 0; right: 0; z-index: 100; backdrop-filter: blur(12px); }
        .nav-logo { font-size: 1.3rem; font-weight: 600; }
        .nav-logo span { color: #00c9a7; }
        .nav-right { display: flex; align-items: center; gap: 1rem; }
        .nav-user { font-size: 0.85rem; color: #8a9bb0; }
        .btn-logout { background: transparent; border: 1px solid rgba(255,255,255,0.08); color: #8a9bb0; padding: 0.4rem 1rem; border-radius: 100px; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; }
        .btn-logout:hover { border-color: rgba(255,80,80,0.4); color: #ff8080; }
        .main { padding-top: 6rem; }
        .welcome { margin-bottom: 2.5rem; }
        .welcome h1 { font-size: 1.8rem; font-weight: 600; margin-bottom: 0.4rem; }
        .welcome p { color: #8a9bb0; font-size: 0.95rem; }
        .section-title { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #00c9a7; margin-bottom: 1.25rem; }
        .cursos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-bottom: 3rem; }
        .curso-card { background: #0e1f35; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.75rem; transition: border-color 0.2s; }
        .curso-card:hover { border-color: rgba(0,201,167,0.3); }
        .curso-nivel { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #00c9a7; margin-bottom: 0.75rem; }
        .curso-titulo { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; }
        .curso-desc { font-size: 0.88rem; color: #8a9bb0; line-height: 1.6; margin-bottom: 1.25rem; }
        .curso-badge { display: inline-block; background: rgba(0,201,167,0.1); border: 1px solid rgba(0,201,167,0.2); color: #00c9a7; font-size: 0.75rem; padding: 0.25rem 0.75rem; border-radius: 100px; margin-bottom: 1.25rem; }
        .btn-curso { width: 100%; background: #00c9a7; color: #07111f; border: none; border-radius: 100px; padding: 0.75rem; font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: background 0.2s; }
        .btn-curso:hover { background: #009e84; }
        .btn-curso-outline { width: 100%; background: transparent; color: #f5f7fa; border: 1px solid rgba(255,255,255,0.08); border-radius: 100px; padding: 0.75rem; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
        .btn-curso-outline:hover { border-color: rgba(0,201,167,0.4); color: #00c9a7; }
        .servicios-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; }
        .servicio-card { background: #0e1f35; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.75rem; display: flex; flex-direction: column; gap: 1rem; }
        .servicio-icon { font-size: 1.75rem; }
        .servicio-titulo { font-size: 1rem; font-weight: 600; }
        .servicio-desc { font-size: 0.88rem; color: #8a9bb0; line-height: 1.6; flex: 1; }
        .btn-servicio { background: transparent; color: #00c9a7; border: 1px solid rgba(0,201,167,0.3); border-radius: 100px; padding: 0.7rem 1.25rem; font-size: 0.88rem; cursor: pointer; transition: all 0.2s; text-align: center; }
        .btn-servicio:hover { background: rgba(0,201,167,0.1); }
      `}</style>

      <nav>
        <div className="nav-logo">Lap<span>Skill</span></div>
        <div className="nav-right">
          <span className="nav-user">{profile?.nombre}</span>
          <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </nav>

      <div className="dashboard">
        <div className="main">
          <div className="welcome">
            <h1>Hola, {profile?.nombre} 👋</h1>
            <p>{profile?.especialidad} · {profile?.pais}</p>
          </div>

          <p className="section-title">Tus cursos</p>
          <div className="cursos-grid">
            <div className="curso-card">
              <p className="curso-nivel">Nivel 1</p>
              <h3 className="curso-titulo">Fundamentos</h3>
              <p className="curso-desc">Ergonomía, orientación espacial, coordinación ojo-mano e instrumentación básica.</p>
              <button className="btn-curso-outline">Próximamente</button>
            </div>
            <div className="curso-card">
              <p className="curso-nivel">Nivel 2</p>
              <h3 className="curso-titulo">Sutura Intracorpórea</h3>
              <p className="curso-desc">Técnica pura de sutura laparoscópica desde el posicionamiento de aguja hasta el nudo del cirujano.</p>
              <span className="curso-badge">⭐ Curso estrella</span>
              <button className="btn-curso">Acceder al curso</button>
            </div>
            <div className="curso-card">
              <p className="curso-nivel">Nivel 3</p>
              <h3 className="curso-titulo">Sutura en Bariátrica</h3>
              <p className="curso-desc">Sutura aplicada a los momentos críticos de la cirugía bariátrica.</p>
              <button className="btn-curso-outline">Próximamente</button>
            </div>
          </div>

          <p className="section-title">Servicios</p>
          <div className="servicios-grid">
            <div className="servicio-card">
              <div className="servicio-icon">🎥</div>
              <h3 className="servicio-titulo">Evaluación Asincrónica</h3>
              <p className="servicio-desc">Subí un video de hasta 3 minutos con tu pregunta y recibí feedback con anotaciones en 3-5 días hábiles.</p>
              <button className="btn-servicio">Solicitar evaluación</button>
            </div>
            <div className="servicio-card">
              <div className="servicio-icon">📡</div>
              <h3 className="servicio-titulo">Mentoría en Vivo 1 a 1</h3>
              <p className="servicio-desc">Sesión en tiempo real donde mostrás tu endotrainer y recibís corrección instantánea del instructor.</p>
              <button className="btn-servicio">Reservar sesión</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}