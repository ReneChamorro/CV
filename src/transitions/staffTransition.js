import { gsap, playIntro } from '../lib/gsap'

const leftX = (el) => el.getBBox().x

// La línea se abre en las cinco del pentagrama, se traza la clave de Do y las notas entran
// en el orden en que se leen; cada viga o ligadura se extiende desde su primera nota.
// Trabaja sobre el SVG de abcjs (add_classes: true).
export function staffTransition(root) {
  const q = gsap.utils.selector(root)
  const clef = q('.abcjs-clef path')
  const lines = q('.abcjs-staff path')
  const reading = [...q('.abcjs-note'), ...q('.abcjs-beam-elem, .abcjs-slur, .abcjs-tie')].sort(
    (a, b) => leftX(a) - leftX(b),
  )
  const isSpan = (el) => !el.classList.contains('abcjs-note')
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

  tl.set(q('[data-music-reveal]'), { autoAlpha: 0, y: 16 })
    .set(lines, { scaleX: 0, transformOrigin: '50% 50%' })
    .set(clef, { drawSVG: '0%', fillOpacity: 0, stroke: 'currentColor', strokeWidth: 0.6 })
    .set(q('.abcjs-time-signature, .abcjs-bar'), { autoAlpha: 0 })
    .set(reading.filter((el) => !isSpan(el)), { autoAlpha: 0, y: -6 })
    .set(reading.filter(isSpan), { scaleX: 0, transformOrigin: '0% 50%' })
    .to(lines, { scaleX: 1, duration: 0.9, stagger: { each: 0.15, from: 'center' } })
    .to(q('[data-intro-line]'), { autoAlpha: 0, duration: 0.4 }, 0.2)
    // La clave es un relleno: primero se traza su contorno y luego se tiñe.
    .to(clef, { drawSVG: '100%', duration: 0.9, ease: 'power1.inOut' })
    .to(clef, { fillOpacity: 1, strokeWidth: 0, duration: 0.35, ease: 'power2.out' }, '-=0.15')
    .to(q('.abcjs-time-signature'), { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })

  reading.forEach((el, i) => {
    const at = i === 0 ? '>' : '<0.11'
    if (isSpan(el)) tl.to(el, { scaleX: 1, duration: 0.3, ease: 'power2.out' }, at)
    else tl.to(el, { autoAlpha: 1, y: 0, duration: 0.22, ease: 'power2.out' }, at)
  })

  tl.to(q('.abcjs-bar'), { autoAlpha: 1, duration: 0.25, stagger: 0.1 }, '-=0.4').to(
    q('[data-music-reveal]'),
    { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' },
  )

  return playIntro(tl, 'musica')
}
