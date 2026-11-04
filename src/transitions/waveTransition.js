import { gsap, playIntro } from '../lib/gsap'

// Borde de la ola (viewBox 0 0 80 1000): dos fases que se alternan mientras barre la pantalla.
export const CREST_A =
  'M0,0 H40 C75,60 75,65 40,125 S5,190 40,250 S75,315 40,375 S5,440 40,500 S75,565 40,625 S5,690 40,750 S75,815 40,875 S5,940 40,1000 H0 Z'
export const CREST_B =
  'M0,0 H40 C5,60 5,65 40,125 S75,190 40,250 S5,315 40,375 S75,440 40,500 S5,565 40,625 S75,690 40,750 S5,815 40,875 S75,940 40,1000 H0 Z'

// La ola cruza de izquierda a derecha y detrás quedan las carrileras, en escalera.
export function waveTransition(root) {
  const q = gsap.utils.selector(root)
  const year = { value: 2000 }
  const yearEl = q('[data-year]')[0]
  const tl = gsap.timeline()

  tl.set(q('[data-rope]'), { xPercent: -105 })
    .set(q('[data-lane]'), { autoAlpha: 0, x: -24 })
    .set(q('[data-board]'), { autoAlpha: 0, y: -16 })
    .set(q('[data-flood]'), { x: () => -(window.innerWidth + 120) })
    .to(q('[data-crest]'), { morphSVG: CREST_B, duration: 0.3, repeat: 5, yoyo: true, ease: 'sine.inOut' }, 0)
    .to(q('[data-flood]'), { x: 0, duration: 1.3, ease: 'power2.inOut' }, 0.15)
    .to(q('[data-intro-line]'), { autoAlpha: 0, duration: 0.25 }, 0.75)
    .to(q('[data-rope]'), { xPercent: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.25')
    .to(q('[data-board]'), { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '<')
    .to(q('[data-lane]'), { autoAlpha: 1, x: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, '<0.3')
    .to(
      year,
      {
        value: Number(yearEl.dataset.year),
        duration: 1,
        ease: 'power1.out',
        onUpdate: () => (yearEl.textContent = Math.round(year.value)),
      },
      '<',
    )

  return playIntro(tl, 'natacion')
}
