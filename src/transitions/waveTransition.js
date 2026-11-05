import { gsap, playIntro } from '../lib/gsap'

// Superficie del agua (viewBox 0 0 1000 300, el agua queda debajo de la curva).
// Sube inclinada desde la izquierda, se aplana al cubrir y baja inclinada hacia el otro lado.
export const SURFACE_RISE =
  'M0,40 C150,30 250,60 400,90 C550,120 650,150 800,200 C880,225 950,250 1000,280 L1000,300 L0,300 Z'
const SURFACE_FULL =
  'M0,150 C150,110 250,110 400,150 C550,190 650,190 800,150 C880,130 950,125 1000,140 L1000,300 L0,300 Z'
const SURFACE_DRAIN =
  'M0,260 C150,250 250,220 400,200 C550,180 650,120 800,90 C880,75 950,60 1000,50 L1000,300 L0,300 Z'
// Solo la curva de arriba, para el borde blanco (el lado de abajo no lleva borde).
const rim = (surface) => surface.replace(' L1000,300 L0,300 Z', '')
export const RIM_RISE = rim(SURFACE_RISE)

// Burbujas con semilla fija: el mismo dibujo en cada visita (viewBox 0 0 1000 1000).
function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rand = seeded(2013)
export const BUBBLES = Array.from({ length: 38 }, () => ({
  cx: Math.round(rand() * 1000),
  cy: Math.round(300 + rand() * 680),
  r: Math.round(5 + rand() ** 2 * 26),
}))

// El agua sube y tapa el cambio; al bajar suelta burbujas que revientan y deja la piscina.
// Luego, carril por carril: se tiende la carrilera y el texto "nada" desde el taco.
export function waveTransition(root) {
  const q = gsap.utils.selector(root)
  const ropes = q('[data-rope]')
  const swimmers = q('[data-swimmer]')
  const tl = gsap.timeline()

  tl.set(q('[data-pool-scene]'), { autoAlpha: 0 })
    .set(ropes, { clipPath: 'inset(0% 100% 0% 0%)' })
    .set(swimmers, { autoAlpha: 0, x: () => -0.3 * window.innerWidth })
    .set(q('[data-water]'), { yPercent: 130 })
    .set(q('[data-flood-bubble]'), { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%' })
    .to(q('[data-water]'), { yPercent: 0, duration: 1.4, ease: 'power2.inOut' }, 0)
    .to(q('[data-surface]'), { morphSVG: SURFACE_FULL, duration: 1.4, ease: 'sine.inOut' }, 0)
    .to(q('[data-rim]'), { morphSVG: rim(SURFACE_FULL), duration: 1.4, ease: 'sine.inOut' }, 0)
    // La línea se esconde cuando el agua la alcanza, para no ver dos olas a la vez.
    .to(q('[data-intro-line]'), { autoAlpha: 0, duration: 0.25 }, 0.75)
    .to(q('[data-flood-bubble]'), { autoAlpha: 1, scale: 1, duration: 0.35, stagger: { each: 0.012, from: 'random' } }, 1.1)
    // Con la pantalla cubierta aparece la piscina debajo; el agua se queda un momento.
    .set(q('[data-pool-scene]'), { autoAlpha: 1 }, 1.5)
    .to(q('[data-water]'), { yPercent: 130, duration: 1.5, ease: 'power2.inOut' }, 1.8)
    .to(q('[data-surface]'), { morphSVG: SURFACE_DRAIN, duration: 1.5, ease: 'sine.inOut' }, 1.8)
    .to(q('[data-rim]'), { morphSVG: rim(SURFACE_DRAIN), duration: 1.5, ease: 'sine.inOut' }, 1.8)
    .to(q('[data-flood-bubble]'), { y: -120, duration: 1.8, ease: 'power1.out' }, 1.8)
    // Revientan hacia fuera, de arriba hacia abajo, a medida que la superficie baja y las alcanza.
    .to(
      q('[data-flood-bubble]'),
      {
        keyframes: [{ scale: 1.12, duration: 0.1 }, { scale: 1.35, autoAlpha: 0, duration: 0.16 }],
        delay: (i, el) => ((Number(el.dataset.cy) - 300) / 700) * 1.2,
      },
      1.95,
    )

  ropes.forEach((rope, i) => {
    tl.to(rope, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.45, ease: 'power2.inOut' }, i === 0 ? 2.9 : '>-0.1')

    const swimmer = swimmers[i]
    if (!swimmer) return
    tl.to(swimmer, { autoAlpha: 1, x: 0, duration: 0.75, ease: 'power3.out' }, '>-0.1')
      // Brazadas: un vaivén que se amortigua mientras el texto llega.
      .to(
        swimmer,
        { keyframes: { y: [0, -5, 4, -3, 1.5, 0], rotation: [0, -1.2, 1, -0.6, 0.3, 0] }, duration: 0.75, ease: 'none' },
        '<',
      )
      .to(
        q(`[data-bubble="${i}"]`),
        { keyframes: [{ autoAlpha: 0.9, y: -4, duration: 0.25 }, { autoAlpha: 0, y: -14, duration: 0.4 }], stagger: 0.06 },
        '<0.15',
      )
  })

  return playIntro(tl, 'natacion')
}
