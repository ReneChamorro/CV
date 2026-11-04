import { gsap, playIntro } from '../lib/gsap'

// Borde de la ola (viewBox 0 0 80 1000): dos fases que se alternan mientras cruza la pantalla.
export const CREST_A =
  'M0,0 H40 C75,60 75,65 40,125 S5,190 40,250 S75,315 40,375 S5,440 40,500 S75,565 40,625 S5,690 40,750 S75,815 40,875 S5,940 40,1000 H0 Z'
export const CREST_B =
  'M0,0 H40 C5,60 5,65 40,125 S75,190 40,250 S5,315 40,375 S75,440 40,500 S5,565 40,625 S75,690 40,750 S5,815 40,875 S75,940 40,1000 H0 Z'

const vmax = () => Math.max(window.innerWidth, window.innerHeight) / 100

// Una banda de agua cruza en diagonal y tapa el cambio; detrás queda la piscina.
// Luego, carril por carril: se tiende la carrilera y el texto "nada" desde el taco.
export function waveTransition(root) {
  const q = gsap.utils.selector(root)
  const ropes = q('[data-rope]')
  const swimmers = q('[data-swimmer]')
  const tl = gsap.timeline()

  tl.set(q('[data-pool-scene]'), { autoAlpha: 0 })
    .set(ropes, { clipPath: 'inset(0% 100% 0% 0%)' })
    .set(swimmers, { autoAlpha: 0, x: () => -0.3 * window.innerWidth })
    .set(q('[data-band]'), { x: () => -95 * vmax() - 100 })
    .to(q('[data-crest]'), { morphSVG: CREST_B, duration: 0.3, repeat: 5, yoyo: true, ease: 'sine.inOut' }, 0)
    .to(q('[data-band]'), { x: () => 230 * vmax() + 100, duration: 1.7, ease: 'power2.inOut' }, 0.1)
    .to(q('[data-intro-line]'), { autoAlpha: 0, duration: 0.2 }, 0.6)
    // A mitad de recorrido la banda cubre toda la pantalla: ahí aparece la piscina.
    .set(q('[data-pool-scene]'), { autoAlpha: 1 }, 0.95)

  ropes.forEach((rope, i) => {
    tl.to(rope, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.45, ease: 'power2.inOut' }, i === 0 ? 1.5 : '>-0.1')

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
