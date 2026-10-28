import { useState } from 'react'

const WA = '56942923741'
const IG = 'https://instagram.com/web.ia_studio'
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

const Logo = () => (
  <a className="logo" href="#inicio" aria-label="web.ia studio, inicio">
    <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#2f7bff" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient></defs>
      <rect width="32" height="32" rx="9" fill="url(#g)" />
      <path d="M8 11l4 10 4-7 4 7 4-10" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span>web.ia <b>studio</b></span>
  </a>
)

const Icon = ({ d }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
)

const SERVICES = [
  ['Páginas para tu negocio', 'Una web clara con tus servicios, horarios, ubicación y botones de contacto directos.', 'M3 5h18v14H3zM3 9h18'],
  ['Diseño que se adapta', 'Se ve bien en celular, tablet y computador, porque ahí te buscan tus clientes.', 'M7 3h10v18H7zM11 18h2'],
  ['Tiendas y catálogos', 'Muestra tus productos o tu carta y facilita que te escriban para comprar o reservar.', 'M5 8h14l-1 12H6zM9 8a3 3 0 016 0'],
  ['Publicación y apoyo', 'Dejamos tu web publicada y funcionando, y te acompañamos con los cambios.', 'M12 3v12m0 0l-4-4m4 4l4-4M5 21h14'],
]

const TYPES = {
  Restaurante: { t: 'Carta y reservas', s: ['Nuestra carta', 'Ubicación', 'Reservar'], c: '#ff8a4c' },
  Barbería: { t: 'Reserva tu hora', s: ['Servicios', 'Equipo', 'Agendar'], c: '#2f7bff' },
  Veterinaria: { t: 'Cuidamos a tu mascota', s: ['Atención', 'Urgencias', 'Contacto'], c: '#22c9a0' },
  Tienda: { t: 'Nuestros productos', s: ['Catálogo', 'Envíos', 'Comprar'], c: '#8b5cf6' },
}

const STEPS = [
  ['Conversamos', 'Nos cuentas qué hace tu negocio y qué quieres lograr con tu web.'],
  ['Diseñamos', 'Armamos una propuesta visual con tus colores, fotos y textos.'],
  ['Ajustamos', 'Revisas el resultado y afinamos los detalles contigo.'],
  ['Publicamos', 'Tu web queda en línea, lista para compartir en Instagram y WhatsApp.'],
]

const FAQ = [
  ['¿Qué necesito para empezar?', 'Solo contarnos sobre tu negocio. Si tienes logo, fotos o colores, nos ayudan; si no, te orientamos.'],
  ['¿Cuánto cuesta?', 'Depende de lo que necesites. Escríbenos con tu idea y te respondemos con una propuesta a tu medida.'],
  ['¿Puedo pedir cambios después?', 'Sí. Conversamos qué ajustes necesitas y cómo hacerlos.'],
  ['¿Funciona bien en el celular?', 'Sí. Cada página se diseña pensando primero en pantallas pequeñas.'],
]

function Preview() {
  const [k, setK] = useState('Restaurante')
  const d = TYPES[k]
  return (
    <div className="demo" style={{ '--acc': d.c }}>
      <div className="chips" role="tablist" aria-label="Tipo de negocio">
        {Object.keys(TYPES).map((n) => (
          <button key={n} role="tab" aria-selected={n === k} className={n === k ? 'on' : ''} onClick={() => setK(n)}>{n}</button>
        ))}
      </div>
      <div className="browser" aria-live="polite">
        <div className="bar"><i /><i /><i /><span>tunegocio.cl</span></div>
        <div className="screen">
          <small>Vista conceptual</small>
          <h3>{d.t}</h3>
          <div className="blocks">{d.s.map((x) => <div key={x}>{x}</div>)}</div>
          <div className="fake-btn">{d.s[2]}</div>
        </div>
      </div>
      <p className="note">Demostración conceptual: así podría organizarse la web de un(a) {k.toLowerCase()}.</p>
    </div>
  )
}

function Contact() {
  const [st, setSt] = useState({ s: 'idle', m: '' })
  const [f, setF] = useState({ nombre: '', contacto: '', negocio: '', necesidad: '', mensaje: '' })
  const set = (e) => setF({ ...f, [e.target.name]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    const texto = `Hola, soy ${f.nombre}. Negocio: ${f.negocio}. Necesito: ${f.necesidad}. ${f.mensaje} Contacto: ${f.contacto}`
    if (!ENDPOINT) {
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener')
      setSt({ s: 'ok', m: 'Abrimos WhatsApp con tu mensaje listo. Solo falta que presiones enviar allá.' })
      return
    }
    setSt({ s: 'load', m: 'Enviando tu mensaje…' })
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(f) })
      if (!r.ok) throw new Error()
      setSt({ s: 'ok', m: '¡Mensaje enviado! Te responderemos pronto.' })
      setF({ nombre: '', contacto: '', negocio: '', necesidad: '', mensaje: '' })
    } catch {
      setSt({ s: 'err', m: 'No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.' })
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <label>Nombre<input name="nombre" value={f.nombre} onChange={set} required autoComplete="name" /></label>
      <label>Correo o teléfono<input name="contacto" value={f.contacto} onChange={set} required /></label>
      <label>Tu negocio<input name="negocio" value={f.negocio} onChange={set} required /></label>
      <label>Qué necesitas
        <select name="necesidad" value={f.necesidad} onChange={set} required>
          <option value="">Elige una opción</option>
          <option>Página nueva</option><option>Renovar mi página</option><option>Tienda o catálogo</option><option>Otra cosa</option>
        </select>
      </label>
      <label className="full">Mensaje<textarea name="mensaje" rows="4" value={f.mensaje} onChange={set} required /></label>
      <button className="btn" disabled={st.s === 'load'}>{st.s === 'load' ? 'Enviando…' : 'Enviar mensaje'}</button>
      <p className={`status ${st.s}`} role="status">{st.m}</p>
    </form>
  )
}

export default function App() {
  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState(0)
  const go = () => setMenu(false)
  return (
    <>
      <header className="head">
        <Logo />
        <button className="burger" aria-label="Abrir menú" aria-expanded={menu} onClick={() => setMenu(!menu)}>☰</button>
        <nav className={menu ? 'open' : ''}>
          {[['servicios', 'Servicios'], ['proceso', 'Proceso'], ['preguntas', 'Preguntas'], ['contacto', 'Contacto']].map(([id, t]) => (
            <a key={id} href={`#${id}`} onClick={go}>{t}</a>
          ))}
          <a className="btn sm" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-t">
            <h1>Hagamos realidad la página web de tu negocio</h1>
            <p>Cuéntanos sobre tu proyecto y encontremos una solución adaptada a tus necesidades</p>
            <div className="cta">
              <a className="btn" href="#contacto">Cuéntanos tu proyecto</a>
              <a className="btn ghost" href={IG} target="_blank" rel="noopener noreferrer">Ver Instagram</a>
            </div>
          </div>
          <Preview />
        </section>

        <section id="servicios" className="sec">
          <h2>Lo que hacemos por tu negocio</h2>
          <div className="grid">
            {SERVICES.map(([t, p, d]) => (
              <article key={t} className="card"><Icon d={d} /><h3>{t}</h3><p>{p}</p></article>
            ))}
          </div>
        </section>

        <section id="proceso" className="sec">
          <h2>Así trabajamos, paso a paso</h2>
          <ol className="steps">
            {STEPS.map(([t, p], i) => (
              <li key={t}><span>{i + 1}</span><div><h3>{t}</h3><p>{p}</p></div></li>
            ))}
          </ol>
        </section>

        <section id="preguntas" className="sec narrow">
          <h2>Preguntas frecuentes</h2>
          {FAQ.map(([q, a], i) => (
            <div key={q} className={`faq ${open === i ? 'on' : ''}`}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span>{open === i ? '−' : '+'}</span></button>
              {open === i && <p>{a}</p>}
            </div>
          ))}
        </section>

        <section id="contacto" className="sec contact">
          <div>
            <h2>Cuéntanos sobre tu proyecto</h2>
            <p>Escríbenos y te responderemos con ideas para tu negocio. También puedes hablarnos directo:</p>
            <p className="links">
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={IG} target="_blank" rel="noopener noreferrer">Instagram @web.ia_studio</a>
            </p>
          </div>
          <Contact />
        </section>
      </main>

      <footer className="foot"><Logo /><p>Diseño web para negocios en Chile</p><a href={IG} target="_blank" rel="noopener noreferrer">Instagram</a></footer>
    </>
  )
}
