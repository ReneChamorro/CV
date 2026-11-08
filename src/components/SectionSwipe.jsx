import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { SECTIONS } from '../sections'
import { markVisited } from '../lib/visited'
import styles from './SectionSwipe.module.css'

// Como en las librerías de pull-to-refresh: el dedo recorre ~2,5 veces lo que avanza el aviso.
const PULL = 60
const RESISTANCE = 2.5

// En el celular, como los reels: al final de un ámbito, seguir deslizando lleva al siguiente
// (en círculo) y arriba del todo, tirar hacia abajo, al anterior. El aviso de abajo también se puede tocar.
export default function SectionSwipe() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const index = SECTIONS.findIndex((s) => s.path === pathname)
  const [touch, setTouch] = useState(false)
  const [atEnd, setAtEnd] = useState(false)
  const sentinel = useRef()
  const nextBar = useRef()
  const prevChip = useRef()
  const prevBar = useRef()

  const next = index >= 0 ? SECTIONS[(index + 1) % SECTIONS.length] : null
  const prev = index >= 0 ? SECTIONS[(index - 1 + SECTIONS.length) % SECTIONS.length] : null

  useEffect(() => {
    setTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (index >= 0) markVisited(SECTIONS[index].id)
  }, [index])

  // El aviso aparece cuando se ve el final de la página.
  useEffect(() => {
    if (!touch || !next) return
    setAtEnd(false)
    const observer = new IntersectionObserver(([entry]) => setAtEnd(entry.isIntersecting))
    observer.observe(sentinel.current)
    return () => observer.disconnect()
  }, [touch, next, pathname])

  // Sin el "tirar para recargar" del navegador, que choca con tirar hacia el anterior.
  useEffect(() => {
    if (!touch || !next) return
    const root = document.documentElement
    root.style.overscrollBehaviorY = 'contain'
    return () => {
      root.style.overscrollBehaviorY = ''
    }
  }, [touch, next])

  useEffect(() => {
    if (!touch || !next) return
    let startX = 0
    let startY = 0
    let mode = null
    let progress = 0
    let leaving = false

    const paint = (value) => {
      progress = Math.min(value / RESISTANCE / PULL, 1)
      if (progress > 0.5) (mode === 'next' ? next : prev).load()
      if (mode === 'next') nextBar.current.style.transform = `scaleX(${progress})`
      if (mode === 'prev') {
        prevBar.current.style.transform = `scaleX(${progress})`
        prevChip.current.style.transform = `translate(-50%, ${progress * 72 - 56}px)`
      }
    }

    const onStart = (e) => {
      if (leaving) return
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      const root = document.documentElement
      const bottom = window.innerHeight + window.scrollY >= root.scrollHeight - 2
      mode = bottom ? 'next' : window.scrollY <= 0 ? 'prev' : null
    }

    const onMove = (e) => {
      if (!mode) return
      const dy = startY - e.touches[0].clientY
      // Si el gesto es más horizontal que vertical, no es un swipe entre ámbitos.
      if (Math.abs(e.touches[0].clientX - startX) > Math.abs(dy)) return paint(0)
      if (mode === 'next') paint(Math.max(dy, 0))
      else paint(Math.max(-dy, 0))
    }

    const onEnd = () => {
      if (mode && progress >= 1) {
        leaving = true
        navigate((mode === 'next' ? next : prev).path)
      }
      paint(0)
      mode = null
    }

    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    window.addEventListener('touchcancel', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
      window.removeEventListener('touchcancel', onEnd)
    }
  }, [touch, next, prev, navigate])

  if (!touch || !next) return null

  return (
    <>
      <div ref={sentinel} className={styles.sentinel} aria-hidden="true" />
      <div ref={prevChip} className={styles.prev} style={{ '--c': prev.color }} aria-hidden="true">
        Anterior: {prev.label}
        <span ref={prevBar} className={styles.bar} />
      </div>
      <Link
        to={next.path}
        className={styles.next}
        data-visible={atEnd || undefined}
        style={{ '--c': next.color }}
      >
        Sigue: {next.label}
        <span className={styles.arrow} aria-hidden="true">
          ↑
        </span>
        <span ref={nextBar} className={styles.bar} />
      </Link>
    </>
  )
}
