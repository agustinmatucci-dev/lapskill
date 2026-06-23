"use client"
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import Link from 'next/link'

const VIDEOS = [
  { id: 1, titulo: "Introducción a la sutura intracorpórea", duracion: "3:24" },
  { id: 2, titulo: "Posicionamiento de la aguja", duracion: "4:12" },
  { id: 3, titulo: "Pasaje de punto forehand", duracion: "5:45" },
  { id: 4, titulo: "Pasaje de punto backhand", duracion: "4:58" },
  { id: 5, titulo: "Nudo del cirujano bajo tensión", duracion: "6:30" },
  { id: 6, titulo: "Sutura continua", duracion: "7:15" },
]

export default function Curso() {
  const [videoActivo, setVideoActivo] = useState(VIDEOS[0])
  const [velocidad, setVelocidad] = useState(1)
  const [loopStart, setLoopStart] = useState(null)
  const [loopEnd, setLoopEnd] = useState(null)
  const [loopActivo, setLoopActivo] = useState(false)
  const [profile, setProfile] = useState(null)
  const videoRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
    }
    getProfile()
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = velocidad
    }
  }, [velocidad])

  useEffect(() => {
    if (!loopActivo || !videoRef.current) return
    const video = videoRef.current
    const checkLoop = () => {
      if (loopEnd && video.currentTime >= loopEnd) {
        video.currentTime = loopStart || 0
      }
    }
    video.addEventListener('timeupdate', checkLoop)
    return () => video.removeEventListener('timeupdate', checkLoop)
  }, [loopActivo, loopStart, loopEnd])

  const handleFrameBack = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 0.033)
    }
  }

  const handleFrameForward = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = videoRef.current.currentTime + 0.033
    }
  }

  const handleSetLoopStart = () => {
    if (videoRef.current) setLoopStart(videoRef.current.currentTime)
  }

  const handleSetLoopEnd = () => {
    if (videoRef.current) setLoopEnd(videoRef.current.currentTime)
  }

  const formatTime = (seconds) => {
    if (!seconds) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #07111f; color: #f5f7fa; font-family: system-ui, sans-serif; }
        nav { display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; background: rgba(14,31,53,0.9); border-bottom: 1px solid rgba(255,255,255,0.08); position: fixed; top: 0; left: 0; right: 0; z-index: 100; backdrop-filter: blur(12px); }
        .nav-logo { font-size: 1.2rem; font-weight: 600; text-decoration: none; color: #f5f7fa; }
        .nav-logo span { color: #00c9a7; }
        .nav-back { background: transparent; border: 1px solid rgba(255,255,255,0.08); color: #8a9bb0; padding: 0.4rem 1rem; border-radius: 100px; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; }
        .nav-back:hover { border-color: rgba(0,201,167,0.4); color: #00c9a7; }
        .layout { display: grid; grid-template-columns: 1fr 320px; gap: 0; min-height: 100vh; padding-top: 60px; }
        .player-section { padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.06); }
        .video-wrapper { background: #000; border-radius: 12px; overflow: hidden; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .video-placeholder { display: flex; flex-direction: column; align-items: center; gap: 1rem; color: #8a9bb0; }
        .video-placeholder .play-icon { width: 64px; height: 64px; background: rgba(0,201,167,0.15); border: 2px solid rgba(0,201,167,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .video-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 1.25rem; }
        .controls { background: #0e1f35; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; }
        .controls-row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .controls-label { font-size: 0.75rem; color: #8a9bb0; letter-spacing: 0.08em; text-transform: uppercase; min-width: 70px; }
        .speed-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: #f5f7fa; padding: 0.35rem 0.75rem; border-radius: 8px; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; }
        .speed-btn:hover, .speed-btn.active { background: rgba(0,201,167,0.15); border-color: rgba(0,201,167,0.4); color: #00c9a7; }
        .frame-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: #f5f7fa; padding: 0.35rem 0.9rem; border-radius: 8px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
        .frame-btn:hover { background: rgba(0,201,167,0.15); border-color: rgba(0,201,167,0.4); color: #00c9a7; }
        .loop-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: #f5f7fa; padding: 0.35rem 0.9rem; border-radius: 8px; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; }
        .loop-btn:hover { background: rgba(0,201,167,0.15); border-color: rgba(0,201,167,0.4); color: #00c9a7; }
        .loop-btn.active { background: rgba(0,201,167,0.2); border-color: #00c9a7; color: #00c9a7; }
        .sidebar { background: #09172a; overflow-y: auto; height: calc(100vh - 60px); position: sticky; top: 60px; }
        .sidebar-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .sidebar-title { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #00c9a7; }
        .sidebar-curso { font-size: 0.95rem; font-weight: 600; margin-top: 0.4rem; }
        .video-item { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 1.5rem; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
        .video-item:hover { background: rgba(255,255,255,0.04); }
        .video-item.active { background: rgba(0,201,167,0.08); border-left: 3px solid #00c9a7; }
        .video-num { font-size: 0.75rem; color: #8a9bb0; min-width: 20px; padding-top: 2px; }
        .video-item.active .video-num { color: #00c9a7; }
        .video-item-titulo { font-size: 0.88rem; line-height: 1.4; flex: 1; }
        .video-item.active .video-item-titulo { color: #00c9a7; }
        .video-duracion { font-size: 0.75rem; color: #8a9bb0; }
        @media (max-width: 768px) { .layout { grid-template-columns: 1fr; } .sidebar { height: auto; position: static; } }
      `}</style>

      <nav>
        <Link href="/" className="nav-logo" style={{textDecoration:"none"}}><svg width="185" height="48" viewBox="0 0 185 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 44 Q12 24 36 6" fill="none" stroke="#00c9a7" strokeWidth="2.5" strokeLinecap="round"/><circle cx="36" cy="6" r="4.5" fill="#00c9a7"/><circle cx="6" cy="44" r="2" fill="#00c9a7" opacity="0.35"/><text x="36" y="34" fontSize="22" fontWeight="200" fill="#f5f7fa" fontFamily="system-ui" letterSpacing="-1">Lap<tspan fontWeight="700" fill="#00c9a7">Skilled</tspan></text><line x1="36" y1="38" x2="181" y2="38" stroke="#00c9a7" strokeWidth="1" opacity="0.6"/></svg></Link>
        <button className="nav-back" onClick={() => router.push('/dashboard')}>← Volver al dashboard</button>
      </nav>

      <div className="layout">
        <div className="player-section">
          <div className="video-wrapper">
            <div className="video-placeholder">
              <div className="play-icon">▶</div>
              <p style={{fontSize:'0.9rem'}}>Acá va el video: <strong>{videoActivo.titulo}</strong></p>
              <p style={{fontSize:'0.8rem', color:'#4a6080'}}>Conectaremos Bunny.net en el siguiente paso</p>
            </div>
          </div>

          <p className="video-title">{videoActivo.titulo}</p>

          <div className="controls">
            <div className="controls-row">
              <span className="controls-label">Velocidad</span>
              {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map(v => (
                <button key={v} className={`speed-btn ${velocidad === v ? 'active' : ''}`} onClick={() => setVelocidad(v)}>
                  {v}x
                </button>
              ))}
            </div>

            <div className="controls-row">
              <span className="controls-label">Cuadro</span>
              <button className="frame-btn" onClick={handleFrameBack}>⟨ Anterior</button>
              <button className="frame-btn" onClick={handleFrameForward}>Siguiente ⟩</button>
            </div>

            <div className="controls-row">
              <span className="controls-label">Loop</span>
              <button className="loop-btn" onClick={handleSetLoopStart}>
                Inicio {loopStart !== null ? `(${formatTime(loopStart)})` : ''}
              </button>
              <button className="loop-btn" onClick={handleSetLoopEnd}>
                Fin {loopEnd !== null ? `(${formatTime(loopEnd)})` : ''}
              </button>
              <button
                className={`loop-btn ${loopActivo ? 'active' : ''}`}
                onClick={() => setLoopActivo(!loopActivo)}
                disabled={loopStart === null || loopEnd === null}
              >
                {loopActivo ? '⟳ ON' : '⟳ OFF'}
              </button>
              {(loopStart !== null || loopEnd !== null) && (
                <button className="loop-btn" onClick={() => { setLoopStart(null); setLoopEnd(null); setLoopActivo(false) }}>
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-header">
            <p className="sidebar-title">Nivel 2</p>
            <p className="sidebar-curso">Sutura Intracorpórea</p>
          </div>
          {VIDEOS.map((v, i) => (
            <div
              key={v.id}
              className={`video-item ${videoActivo.id === v.id ? 'active' : ''}`}
              onClick={() => setVideoActivo(v)}
            >
              <span className="video-num">{i + 1}</span>
              <span className="video-item-titulo">{v.titulo}</span>
              <span className="video-duracion">{v.duracion}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}