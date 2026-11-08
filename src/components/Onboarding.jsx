import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { SECTIONS } from '../sections'
import { PortalArt } from './Portal'
import styles from './Onboarding.module.css'

const SEEN_KEY = 'cv-tutorial-visto'
const VERSION = 'v1'

function firstVisit() {
  try {
    // Solo en la portada: quien llega por un enlace directo a un ámbito no ve el velo.
    return window.location.pathname === '/' && localStorage.getItem(SEEN_KEY) !== VERSION
  } catch {
    return false
  }
}

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, VERSION)
  } catch {
    // Sin storage: volverá a salir la próxima vez, no pasa nada.
  }
}

const isTouch = () => window.matchMedia('(pointer: coarse)').matches

const tips = (touch) => [
  touch
    ? 'Toca un ámbito para entrar.'
    : 'Cada columna es un ámbito: pasa el cursor para asomarte y haz clic para entrar.',
  touch
    ? 'Al final de cada ámbito, sigue deslizando hacia arriba para pasar al siguiente.'
    : 'Las intros se saltan con un clic o con el scroll.',
  'Más abajo en cada pantalla hay líneas de los otros ámbitos escondidas: tócalas para saltar ahí.',
  '"René Chamorro", arriba a la izquierda, te devuelve al inicio.',
]

// Tutorial de la primera visita: un velo liviano sobre la página real con tips cortos.
// Solo sale una vez; el botón "?" de la portada lo vuelve a abrir.
export default function Onboarding() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(firstVisit)
  const veil = useRef()
  const start = useRef()

  useEffect(() => {
    if (!open) return
    const focus = requestAnimationFrame(() => start.current?.focus())
    const reduce = prefersReducedMotion()
    const tl = gsap.timeline()
    // Solo opacidad (no visibility): así el botón puede recibir el foco desde el principio.
    tl.from(veil.current, { opacity: 0, duration: 0.3, ease: 'power2.out' }).from(
      veil.current.querySelectorAll('[data-tip]'),
      { opacity: 0, y: reduce ? 0 : 8, stagger: 0.12, duration: 0.4, ease: 'power2.out' },
      '-=0.1',
    )
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(focus)
      // revert y no kill: si React vuelve a montar, el velo no queda congelado en invisible.
      tl.revert()
    }
  }, [open])

  const close = () => {
    markSeen()
    gsap.to(veil.current, { autoAlpha: 0, duration: 0.2, ease: 'power2.in', onComplete: () => setOpen(false) })
  }

  if (!open) {
    if (pathname !== '/') return null
    return (
      <button type="button" className={styles.help} onClick={() => setOpen(true)} aria-label="Cómo recorrer este CV">
        ?
      </button>
    )
  }

  return (
    <div
      ref={veil}
      className={styles.veil}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className={styles.panel}>
        <h2 id="tutorial-title" className={styles.title} data-tip>
          Cómo recorrer este CV
        </h2>
        <ol className={styles.tips}>
          {tips(isTouch()).map((tip, i) => (
            <li key={i} data-tip>
              <span className={styles.num}>{i + 1}</span>
              <span>
                {tip}
                {i === 2 && (
                  <span className={styles.objects} aria-hidden="true">
                    {SECTIONS.map((s) => (
                      <span key={s.id} className={styles.object}>
                        <PortalArt variant={s.id} />
                      </span>
                    ))}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ol>
        <button ref={start} type="button" className={styles.start} onClick={close} data-tip>
          Empezar
        </button>
      </div>
    </div>
  )
}
