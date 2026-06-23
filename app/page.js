export default function Home() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --navy: #07111f;
          --navy-mid: #0e1f35;
          --navy-light: #152840;
          --teal: #00c9a7;
          --teal-dim: #009e84;
          --white: #f5f7fa;
          --muted: #8a9bb0;
          --border: rgba(255,255,255,0.08);
          --font-display: 'Fraunces', Georgia, serif;
          --font-body: 'DM Sans', system-ui, sans-serif;
        }
        html { scroll-behavior: smooth; }
        body {
          background: var(--navy);
          color: var(--white);
          font-family: var(--font-body);
          font-weight: 300;
          line-height: 1.7;
          overflow-x: hidden;
        }
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 5%;
          background: rgba(7,17,31,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo { font-family: var(--font-display); font-weight: 600; font-size: 1.4rem; color: var(--white); text-decoration: none; letter-spacing: -0.02em; }
        .nav-logo span { color: var(--teal); }
        .nav-right { display: flex; align-items: center; gap: 1.5rem; }
        .lang-toggle { background: none; border: 1px solid var(--border); color: var(--muted); font-size: 0.8rem; padding: 0.35rem 0.9rem; border-radius: 100px; cursor: pointer; transition: all 0.2s; }
        .lang-toggle:hover { border-color: var(--teal); color: var(--teal); }
        .nav-cta { background: var(--teal); color: var(--navy); font-size: 0.85rem; font-weight: 500; padding: 0.5rem 1.25rem; border-radius: 100px; border: none; cursor: pointer; text-decoration: none; }
        .nav-cta:hover { background: var(--teal-dim); }
        .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 5% 5rem; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; top: -200px; left: 50%; transform: translateX(-50%); width: 700px; height: 700px; background: radial-gradient(circle, rgba(0,201,167,0.08) 0%, transparent 70%); pointer-events: none; }
        .hero-badge { display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(0,201,167,0.1); border: 1px solid rgba(0,201,167,0.25); color: var(--teal); font-size: 0.78rem; font-weight: 500; letter-spacing: 0.06em; padding: 0.35rem 1rem; border-radius: 100px; margin-bottom: 2rem; text-transform: uppercase; }
        .hero-badge::before { content: ''; width: 6px; height: 6px; background: var(--teal); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        h1 { font-family: var(--font-display); font-weight: 600; font-size: clamp(2.8rem, 6vw, 5rem); line-height: 1.1; letter-spacing: -0.03em; max-width: 820px; margin-bottom: 1.5rem; }
        h1 em { font-style: italic; font-weight: 300; color: var(--teal); }
        .hero-sub { font-size: clamp(1rem, 1.5vw, 1.15rem); color: var(--muted); max-width: 560px; margin-bottom: 2.5rem; line-height: 1.8; }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
        .btn-primary { background: var(--teal); color: var(--navy); font-size: 0.95rem; font-weight: 500; padding: 0.85rem 2rem; border-radius: 100px; border: none; cursor: pointer; text-decoration: none; transition: background 0.2s; }
        .btn-primary:hover { background: var(--teal-dim); }
        .btn-secondary { background: transparent; color: var(--white); font-size: 0.95rem; padding: 0.85rem 2rem; border-radius: 100px; border: 1px solid var(--border); cursor: pointer; text-decoration: none; }
        .hero-stats { display: flex; gap: 3rem; margin-top: 4rem; padding-top: 2.5rem; border-top: 1px solid var(--border); flex-wrap: wrap; justify-content: center; }
        .stat-num { font-family: var(--font-display); font-size: 2rem; font-weight: 600; color: var(--teal); line-height: 1; }
        .stat-label { font-size: 0.8rem; color: var(--muted); margin-top: 0.25rem; }
        section { padding: 6rem 5%; }
        .section-label { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--teal); margin-bottom: 1rem; }
        .section-title { font-family: var(--font-display); font-weight: 600; font-size: clamp(2rem, 3.5vw, 2.8rem); line-height: 1.15; letter-spacing: -0.02em; max-width: 600px; margin-bottom: 1.25rem; }
        .section-sub { color: var(--muted); font-size: 1.05rem; max-width: 540px; line-height: 1.8; }
        .problem { background: var(--navy-mid); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .problem-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .problem-list { list-style: none; display: flex; flex-direction: column; gap: 1.25rem; margin-top: 2rem; }
        .problem-list li { display: flex; gap: 1rem; align-items: flex-start; }
        .problem-icon { width: 32px; height: 32px; min-width: 32px; background: rgba(0,201,167,0.1); border: 1px solid rgba(0,201,167,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-top: 2px; }
        .problem-list li p { font-size: 0.95rem; color: var(--muted); line-height: 1.6; }
        .problem-list li strong { display: block; color: var(--white); font-weight: 500; margin-bottom: 0.2rem; }
        .how-inner { max-width: 1100px; margin: 0 auto; }
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5px; background: var(--border); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
        .step-card { background: var(--navy); padding: 2rem 1.75rem; }
        .step-num { font-family: var(--font-display); font-size: 3.5rem; font-weight: 600; color: rgba(0,201,167,0.12); line-height: 1; margin-bottom: 1rem; }
        .step-card h3 { font-family: var(--font-display); font-weight: 600; font-size: 1.15rem; margin-bottom: 0.6rem; }
        .step-card p { font-size: 0.9rem; color: var(--muted); line-height: 1.65; }
        .plans { background: var(--navy-mid); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .plans-inner { max-width: 1100px; margin: 0 auto; }
        .plans-header { text-align: center; margin-bottom: 3.5rem; }
        .plans-header .section-title, .plans-header .section-sub { margin-left: auto; margin-right: auto; }
        .plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .plan-card { background: var(--navy); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; transition: border-color 0.2s; position: relative; }
        .plan-card:hover { border-color: rgba(0,201,167,0.3); }
        .plan-card.featured { border-color: var(--teal); }
        .plan-featured-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--teal); color: var(--navy); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.25rem 1rem; border-radius: 100px; white-space: nowrap; }
        .plan-name { font-size: 0.8rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--teal); }
        .plan-price { font-family: var(--font-display); font-size: 2.5rem; font-weight: 600; line-height: 1; letter-spacing: -0.03em; margin-top: 0.5rem; }
        .plan-desc { font-size: 0.88rem; color: var(--muted); line-height: 1.65; }
        .plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; flex: 1; }
        .plan-features li { display: flex; gap: 0.75rem; align-items: flex-start; font-size: 0.88rem; color: var(--muted); }
        .plan-features li::before { content: ''; width: 16px; height: 16px; min-width: 16px; margin-top: 2px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M3 8l3.5 3.5L13 4' stroke='%2300c9a7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-size: contain; background-repeat: no-repeat; }
        .plan-btn { display: block; text-align: center; padding: 0.8rem; border-radius: 100px; font-size: 0.9rem; font-weight: 500; text-decoration: none; cursor: pointer; border: none; transition: all 0.2s; }
        .plan-btn-outline { background: transparent; color: var(--white); border: 1px solid var(--border); }
        .plan-btn-outline:hover { border-color: rgba(255,255,255,0.3); }
        .plan-btn-solid { background: var(--teal); color: var(--navy); }
        .plan-btn-solid:hover { background: var(--teal-dim); }
        .diff-inner { max-width: 1100px; margin: 0 auto; }
        .diff-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
        .diff-card { background: var(--navy-mid); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; }
        .diff-icon { width: 44px; height: 44px; background: rgba(0,201,167,0.1); border: 1px solid rgba(0,201,167,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem; }
        .diff-card h3 { font-family: var(--font-display); font-weight: 600; font-size: 1.15rem; margin-bottom: 0.6rem; }
        .diff-card p { font-size: 0.9rem; color: var(--muted); line-height: 1.7; }
        .cta-section { text-align: center; padding: 7rem 5%; }
        .cta-inner { max-width: 620px; margin: 0 auto; }
        footer { border-top: 1px solid var(--border); padding: 2rem 5%; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .footer-logo { font-family: var(--font-display); font-weight: 600; font-size: 1.1rem; color: var(--white); text-decoration: none; }
        .footer-logo span { color: var(--teal); }
        footer p { font-size: 0.8rem; color: var(--muted); }
        @media (max-width: 768px) { .problem-inner { grid-template-columns: 1fr; gap: 2.5rem; } .hero-stats { gap: 2rem; } .nav-cta { display: none; } }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      <nav>
        <Link href="/" className="nav-logo" style={{textDecoration:"none"}}><svg width="185" height="48" viewBox="0 0 185 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 44 Q12 24 36 6" fill="none" stroke="#00c9a7" strokeWidth="2.5" strokeLinecap="round"/><circle cx="36" cy="6" r="4.5" fill="#00c9a7"/><circle cx="6" cy="44" r="2" fill="#00c9a7" opacity="0.35"/><text x="36" y="34" fontSize="22" fontWeight="200" fill="#f5f7fa" fontFamily="system-ui" letterSpacing="-1">Lap<tspan fontWeight="700" fill="#00c9a7">Skilled</tspan></text><line x1="36" y1="38" x2="181" y2="38" stroke="#00c9a7" strokeWidth="1" opacity="0.6"/></svg></Link>
        <div className="nav-right">
          <a href="#cursos" className="nav-cta">Ver cursos</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">Entrenamiento laparoscópico estructurado</div>
        <h1>Dominá la cirugía laparoscópica <em>movimiento por movimiento</em></h1>
        <p className="hero-sub">Videos cortos de alta precisión, telementoría en vivo y evaluación personalizada. Todo lo que necesitás para construir memoria muscular real desde tu endotrainer.</p>
        <div className="hero-actions">
          <a href="#cursos" className="btn-primary">Ver cursos</a>
          <a href="#como-funciona" className="btn-secondary">Cómo funciona</a>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">100%</div>
            <div className="stat-label">En simulador, sin pacientes</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">Micro</div>
            <div className="stat-label">Videos segmentados por movimiento</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">1 a 1</div>
            <div className="stat-label">Mentoría personalizada en vivo</div>
          </div>
        </div>
      </section>

      <section className="problem">
        <div className="problem-inner">
          <div>
            <p className="section-label">El problema</p>
            <h2 className="section-title">La curva de aprendizaje en laparoscopia es brutal</h2>
            <p className="section-sub">Y la mayoría de los recursos disponibles no están diseñados para resolverla.</p>
          </div>
          <ul className="problem-list">
            <li>
              <div className="problem-icon">
                <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="#00c9a7" strokeWidth="2" strokeLinecap="round"><path d="M7 1v6M4 4l3-3 3 3M2 10h10M4 13h6"/></svg>
              </div>
              <div>
                <strong>Los videos de YouTube no tienen estructura pedagógica</strong>
                <p>Ver una cirugía completa no enseña el movimiento específico que necesitás corregir.</p>
              </div>
            </li>
            <li>
              <div className="problem-icon">
                <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="#00c9a7" strokeWidth="2" strokeLinecap="round"><circle cx="7" cy="7" r="6"/><path d="M7 4v3l2 2"/></svg>
              </div>
              <div>
                <strong>La práctica sin feedback no forma hábitos correctos</strong>
                <p>Sin corrección experta, un error técnico se consolida como parte de tu técnica.</p>
              </div>
            </li>
            <li>
              <div className="problem-icon">
                <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="#00c9a7" strokeWidth="2" strokeLinecap="round"><path d="M1 7h4m4 0h4M7 1v4m0 4v4"/></svg>
              </div>
              <div>
                <strong>Los simuladores caros son inaccesibles</strong>
                <p>LapSkill funciona con un endotrainer simple o incluso casero.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section id="como-funciona">
        <div className="how-inner">
          <p className="section-label">Cómo funciona</p>
          <h2 className="section-title">De observar a ejecutar, con precisión de experto</h2>
          <br/>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">01</div>
              <h3>Aprendé el movimiento</h3>
              <p>Videos ultra-cortos que descomponen cada gesto quirúrgico en sus partes más pequeñas. Con control de velocidad y loop de segmento.</p>
            </div>
            <div className="step-card">
              <div className="step-num">02</div>
              <h3>Practicá en tu endotrainer</h3>
              <p>Usá tu celular como cámara laparoscópica y una tablet al lado con el video de referencia. Como en el quirófano real.</p>
            </div>
            <div className="step-card">
              <div className="step-num">03</div>
              <h3>Subí tu video para evaluación</h3>
              <p>Grabá hasta 3 minutos de tu práctica, especificá tu duda, y recibí una devolución con anotaciones sobre tu video en 3-5 días.</p>
            </div>
            <div className="step-card">
              <div className="step-num">04</div>
              <h3>Tutoría en vivo 1 a 1</h3>
              <p>Sesiones en tiempo real donde podés mostrar tu endotrainer y recibir corrección instantánea del instructor.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="cursos" className="plans">
        <div className="plans-inner">
          <div className="plans-header">
            <p className="section-label">Cursos</p>
            <h2 className="section-title">Acceso de por vida. Pagás una vez, practicás siempre.</h2>
            <p className="section-sub">Cada curso incluye el reproductor de entrenamiento completo: velocidad variable, loop de segmento y avance cuadro por cuadro.</p>
          </div>
          <div className="plans-grid">
            <div className="plan-card">
              <div>
                <p className="plan-name">Nivel 1 — Fundamentos</p>
                <div className="plan-price">$19 <span style={{fontSize:'0.8rem', color:'var(--muted)', fontWeight:300}}>ARG · $39 mundo</span></div>
              </div>
              <p className="plan-desc">Ergonomía, orientación espacial, coordinación ojo-mano e instrumentación básica.</p>
              <ul className="plan-features">
                <li>Postura y ergonomía en quirófano</li>
                <li>Orientación espacial con la óptica</li>
                <li>Coordinación ojo-mano y triangulación</li>
                <li>Transferencia de objetos y navegación</li>
              </ul>
              <a href="#" className="plan-btn plan-btn-outline">Comprar curso</a>
            </div>

            <div className="plan-card featured">
              <div className="plan-featured-badge">⭐ Curso estrella</div>
              <div>
                <p className="plan-name">Nivel 2 — Sutura Intracorpórea</p>
                <div className="plan-price">$39 <span style={{fontSize:'0.8rem', color:'var(--muted)', fontWeight:300}}>ARG · $79 mundo</span></div>
              </div>
              <p className="plan-desc">La técnica pura de sutura laparoscópica. Desde el posicionamiento de la aguja hasta el nudo del cirujano bajo tensión.</p>
              <ul className="plan-features">
                <li>Posicionamiento de aguja</li>
                <li>Pasaje de punto forehand y backhand</li>
                <li>Nudo del cirujano bajo tensión</li>
                <li>Sutura continua</li>
              </ul>
              <a href="#" className="plan-btn plan-btn-solid">Comprar curso</a>
            </div>

            <div className="plan-card">
              <div>
                <p className="plan-name">Nivel 3 — Sutura en Bariátrica</p>
                <div className="plan-price">$49 <span style={{fontSize:'0.8rem', color:'var(--muted)', fontWeight:300}}>ARG · $99 mundo</span></div>
              </div>
              <p className="plan-desc">Sutura aplicada a los momentos críticos de la cirugía bariátrica.</p>
              <ul className="plan-features">
                <li>Anastomosis gastrojejunal</li>
                <li>Cierre de brechas mesentéricas</li>
                <li>Refuerzo de línea de corte</li>
                <li>Trabajo en tejido adiposo</li>
              </ul>
              <a href="#" className="plan-btn plan-btn-outline">Comprar curso</a>
            </div>
          </div>

          <div style={{background:'rgba(0,201,167,0.06)', border:'1px solid rgba(0,201,167,0.2)', borderRadius:'16px', padding:'2rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1.5rem', marginTop:'1.5rem', marginBottom:'3rem'}}>
            <div>
              <p className="plan-name">Pack Completo — Los 3 cursos</p>
              <div className="plan-price" style={{fontSize:'2rem'}}>$89 <span style={{fontSize:'0.85rem', color:'var(--muted)', fontWeight:300}}>ARG · $189 mundo · <s style={{opacity:0.5}}>$107/$217</s> valor individual</span></div>
            </div>
            <a href="#" className="plan-btn plan-btn-solid" style={{minWidth:'160px'}}>Comprar pack</a>
          </div>

          <div className="plans-header" style={{marginBottom:'2rem'}}>
            <p className="section-label">Servicios adicionales</p>
            <h2 className="section-title">Feedback personalizado del instructor</h2>
          </div>
          <div className="plans-grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))'}}>
            <div className="plan-card">
              <div>
                <p className="plan-name">Evaluación Asincrónica</p>
                <div className="plan-price">$29 <span style={{fontSize:'0.8rem', color:'var(--muted)', fontWeight:300}}>ARG · $59 mundo</span></div>
              </div>
              <p className="plan-desc">Subís un video de hasta 3 minutos con tu pregunta y recibís una devolución con anotaciones en 3-5 días hábiles.</p>
              <a href="#" className="plan-btn plan-btn-outline">Solicitar evaluación</a>
            </div>
            <div className="plan-card featured">
              <div>
                <p className="plan-name">Mentoría en Vivo 1 a 1</p>
                <div className="plan-price">$49 <span style={{fontSize:'0.8rem', color:'var(--muted)', fontWeight:300}}>ARG · $99 mundo</span></div>
              </div>
              <p className="plan-desc">Sesión en tiempo real donde mostrás tu endotrainer y recibís corrección instantánea del instructor.</p>
              <a href="#" className="plan-btn plan-btn-solid">Reservar sesión</a>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner">
          <p className="section-label">Empezá hoy</p>
          <h2 className="section-title" style={{maxWidth:'100%', marginLeft:'auto', marginRight:'auto'}}>Tu próxima cirugía empieza en el simulador</h2>
          <p className="section-sub" style={{maxWidth:'100%', margin:'0 auto 2.5rem'}}>Accedé a los cursos, practicá con tu endotrainer y recibí feedback de un experto sin importar dónde estés.</p>
          <div className="hero-actions" style={{justifyContent:'center'}}>
            <a href="#cursos" className="btn-primary">Ver cursos</a>
          </div>
        </div>
      </section>

      <footer>
        <a href="#" className="footer-logo">Lap<span>Skill</span></a>
        <p>© 2025 LapSkill. Entrenamiento laparoscópico de alto impacto.</p>
      </footer>
    </>
  );
}