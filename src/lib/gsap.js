import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(useGSAP, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, TextPlugin)
gsap.defaults({ ease: 'power3.out' })

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

const SEEN_KEY = 'intro-seen'
const SKIP_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart']

function seenBefore(id) {
  try {
    const seen = JSON.parse(sessionStorage.getItem(SEEN_KEY) || '[]')
    if (seen.includes(id)) return true
    sessionStorage.setItem(SEEN_KEY, JSON.stringify([...seen, id]))
  } catch {
    // Sin storage (modo privado): la intro se ve completa cada vez.
  }
  return false
}

// Reproduce la intro de una sección: completa la primera vez, más rápida al volver,
// acelerada si el usuario hace clic, tecla o scroll, e instantánea con movimiento reducido.
export function playIntro(tl, id) {
  if (prefersReducedMotion()) {
    tl.progress(1)
    return
  }
  if (seenBefore(id)) tl.timeScale(2)

  const fastForward = () => tl.timeScale(6)
  const stop = () => SKIP_EVENTS.forEach((e) => window.removeEventListener(e, fastForward))
  SKIP_EVENTS.forEach((e) => window.addEventListener(e, fastForward, { passive: true }))
  tl.eventCallback('onComplete', stop)
  return stop
}

export { gsap, useGSAP }
