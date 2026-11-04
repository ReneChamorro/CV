import { gsap, playIntro } from '../lib/gsap'

// La línea se recoge hacia la esquina y "dibuja" el contorno irregular de la hoja.
export function paperTransition(root) {
  const q = gsap.utils.selector(root)
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

  tl.set(q('[data-reveal]'), { autoAlpha: 0, y: 14 })
    .set(q('[data-outline]'), { drawSVG: '0%', fillOpacity: 0 })
    .to(q('[data-intro-line]'), { scaleX: 0, autoAlpha: 0, transformOrigin: '0% 50%', duration: 0.7 })
    .to(q('[data-outline]'), { drawSVG: '100%', duration: 1.2 }, '<0.2')
    .to(q('[data-outline]'), { fillOpacity: 1, duration: 0.4 })
    .to(q('[data-reveal]'), { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' }, '<')
    .from(q('[data-typed]'), { text: '', duration: 0.9, ease: 'none' }, '<0.1')
    // Al terminar se quitan los estilos de DrawSVG para que el contorno siga completo si la hoja cambia de tamaño.
    .set(q('[data-outline]'), { clearProps: 'all' })

  return playIntro(tl, 'sistemas')
}
