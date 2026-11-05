import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import piezas from '../../content/baile'
import styles from './Baile.module.css'

const FICHA = [
  ['anio', 'Año'],
  ['estilo', 'Estilo'],
  ['rol', 'Rol'],
  ['coreografia', 'Coreografía'],
  ['lugar', 'Lugar'],
  ['musica', 'Música'],
]

const isFile = (url) => /\.(mp4|webm|mov)$/i.test(url)

function Player({ pieza }) {
  if (!pieza.video) return <p className={styles.noVideo}>Video por agregar</p>
  if (isFile(pieza.video)) {
    return <video className={styles.player} src={pieza.video} poster={pieza.poster || undefined} controls autoPlay playsInline />
  }
  return (
    <iframe
      className={styles.player}
      src={pieza.video}
      title={pieza.titulo}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  )
}

function Ficha({ pieza }) {
  return (
    <>
      <dl className={styles.ficha}>
        {FICHA.map(([key, label]) => (
          <div key={key}>
            <dt>{label}</dt>
            <dd>{pieza[key]}</dd>
          </div>
        ))}
      </dl>
      {pieza.donde && <p className={styles.donde}>Dónde estoy: {pieza.donde}</p>}
    </>
  )
}

// El escenario: cada pieza en su círculo, el foco va a la que está en el centro de la pantalla
// y al abrir una, el círculo crece hasta ocupar toda la pantalla.
export default function Pieces() {
  const stage = useRef()
  const spot = useRef()
  const circles = useRef([])
  const dialog = useRef()
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(null)
  const origin = useRef(null)

  // La pieza activa es la que cruza la franja central de la ventana.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    circles.current.forEach((el) => el && observer.observe(el.closest('[data-index]')))
    return () => observer.disconnect()
  }, [])

  // El foco viaja al centro del círculo activo (posición relativa al escenario, no cambia con el scroll).
  useEffect(() => {
    const circle = circles.current[active]
    if (!circle) return
    const box = stage.current.getBoundingClientRect()
    const c = circle.getBoundingClientRect()
    gsap.to(spot.current, {
      x: c.left + c.width / 2 - box.left,
      y: c.top + c.height / 2 - box.top,
      duration: prefersReducedMotion() ? 0 : 0.9,
      ease: 'power3.inOut',
      overwrite: 'auto',
    })
  }, [active])

  const clipFrom = () => {
    const { x, y, r } = origin.current
    return `circle(${r}px at ${x}px ${y}px)`
  }

  const show = (index) => {
    const c = circles.current[index].getBoundingClientRect()
    origin.current = { x: c.left + c.width / 2, y: c.top + c.height / 2, r: c.width / 2 }
    setOpen(index)
  }

  useEffect(() => {
    if (open === null) return
    const el = dialog.current
    el.showModal()
    if (prefersReducedMotion()) {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 })
      return
    }
    const { x, y } = origin.current
    gsap.fromTo(
      el,
      { clipPath: clipFrom() },
      { clipPath: `circle(150vmax at ${x}px ${y}px)`, duration: 0.7, ease: 'power3.inOut' },
    )
  }, [open])

  const close = () => {
    const el = dialog.current
    const trigger = circles.current[open]
    const done = () => {
      el.close()
      setOpen(null)
      trigger?.focus({ preventScroll: true })
    }
    if (prefersReducedMotion()) return gsap.to(el, { opacity: 0, duration: 0.15, onComplete: done })
    gsap.to(el, { clipPath: clipFrom(), duration: 0.4, ease: 'power3.in', onComplete: done })
  }

  return (
    <section className={styles.pieces} ref={stage} aria-label="Piezas">
      <div className={styles.pieceSpot} ref={spot} aria-hidden="true" />
      {piezas.map((pieza, i) => (
        <article key={i} className={styles.piece} data-index={i} data-active={i === active || undefined}>
          <button
            ref={(el) => (circles.current[i] = el)}
            type="button"
            className={styles.circle}
            style={pieza.poster ? { backgroundImage: `url(${pieza.poster})` } : undefined}
            onClick={() => show(i)}
            onFocus={() => setActive(i)}
            aria-label={`Ver ${pieza.titulo}`}
          >
            <svg className={styles.circleRing} viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="97" />
            </svg>
            {!pieza.poster && <span className={styles.circleLabel}>Ver pieza</span>}
          </button>
          <div className={styles.pieceText}>
            <h2 className={styles.pieceTitle}>{pieza.titulo}</h2>
            <Ficha pieza={pieza} />
          </div>
        </article>
      ))}

      <dialog
        ref={dialog}
        className={styles.modal}
        aria-label={open === null ? undefined : piezas[open].titulo}
        onCancel={(e) => {
          e.preventDefault()
          close()
        }}
      >
        {open !== null && (
          <div className={styles.modalBody}>
            <button type="button" className={styles.close} onClick={close}>
              Cerrar
            </button>
            <Player pieza={piezas[open]} />
            <div className={styles.modalText}>
              <h2 className={styles.pieceTitle}>{piezas[open].titulo}</h2>
              <Ficha pieza={piezas[open]} />
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
