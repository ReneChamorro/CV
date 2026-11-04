import { gsap, playIntro } from '../lib/gsap'

// La línea se abre en las cinco del pentagrama, se dibuja la clave de Do y entran las notas.
export function staffTransition(root) {
  const q = gsap.utils.selector(root)
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

  tl.set(q('[data-music-reveal]'), { autoAlpha: 0, y: 16 })
    .set(q('[data-note]'), { autoAlpha: 0, y: -10 })
    .set(q('[data-timesig]'), { autoAlpha: 0, scale: 0.85, transformOrigin: '50% 50%' })
    .set(q('[data-clef]'), { fillOpacity: 0 })
    .set(q('[data-staff-line], [data-clef], [data-barline]'), { drawSVG: '0%' })
    .to(q('[data-staff-line]'), { drawSVG: '100%', duration: 0.9, stagger: { each: 0.15, from: 'center' } })
    .to(q('[data-intro-line]'), { autoAlpha: 0, duration: 0.4 }, 0.2)
    // La clave de Bravura es un relleno: primero se traza su contorno y luego se tiñe.
    .to(q('[data-clef]'), { drawSVG: '100%', duration: 0.9, ease: 'power1.inOut' })
    .to(q('[data-clef]'), { fillOpacity: 1, duration: 0.35, ease: 'power2.out' }, '-=0.15')
    .to(q('[data-timesig]'), { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(2)' })
    .to(q('[data-note]'), { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.2, ease: 'power2.out' })
    .to(q('[data-barline]'), { drawSVG: '100%', duration: 0.25, stagger: 0.1 }, '-=0.6')
    .to(q('[data-music-reveal]'), { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' })

  return playIntro(tl, 'musica')
}
