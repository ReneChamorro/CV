import { gsap, playIntro } from '../lib/gsap'

// La misma ola de la portada (viewBox 0 0 1000 200) con amplitud variable: así se calma de a poco.
const wave = (a) =>
  `M0,100 C83,${100 - a} 167,${100 - a} 250,100 C333,${100 + a} 417,${100 + a} 500,100 C583,${100 - a} 667,${100 - a} 750,100 C833,${100 + a} 917,${100 + a} 1000,100`

// Como en Música: la ola se aquieta, se abre en las carrileras y el agua se llena entre ellas.
// Luego el texto de cada carril entra nadando desde su taco.
export function waveTransition(root) {
  const q = gsap.utils.selector(root)
  const ropes = q('[data-rope]')
  const lines = q('[data-split-line]')
  const swimmers = q('[data-swimmer]')
  const line = q('[data-intro-line] path')
  const w = window.innerWidth
  const h = window.innerHeight
  // Las líneas parten de donde está la línea de la portada (10vw a 90vw, al centro).
  const from = { x1: w * 0.1, x2: w * 0.9, y1: h / 2, y2: h / 2 }
  const target = (i) => {
    const r = ropes[i].getBoundingClientRect()
    const y = r.top + r.height / 2
    return { x1: r.left, x2: r.right, y1: y, y2: y }
  }
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

  tl.set(q('[data-pool-scene]'), { autoAlpha: 0 })
    .set(ropes, { autoAlpha: 0 })
    .set(swimmers, { autoAlpha: 0, x: -0.25 * w })
    // El agua crece desde arriba con transform (más fluido que recortarla con clip-path).
    .set(q('[data-pool-water]'), { scaleY: 0, transformOrigin: '50% 0%' })
    .set(lines, { attr: from })
    // Anticipación: la línea baja un poco y la ola se va calmando hasta quedar recta.
    .to(line, { y: 6, duration: 0.2, ease: 'power1.out' }, 0)
    .to(line, { y: 0, duration: 0.5, ease: 'power2.out' }, 0.2)
    .to(
      line,
      {
        keyframes: [
          { morphSVG: wave(-16), duration: 0.35 },
          { morphSVG: wave(8), duration: 0.3 },
          { morphSVG: wave(0), duration: 0.3 },
        ],
        ease: 'sine.inOut',
      },
      0,
    )
    .to(q('[data-pool-scene]'), { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, 0.7)
    // Relevo: la línea recta se vuelve las carrileras, que se abren desde el centro.
    .set(q('[data-intro-line]'), { autoAlpha: 0 }, 1.05)
    .set(q('[data-split]'), { autoAlpha: 1 }, 1.05)
    .to(
      lines,
      {
        attr: {
          x1: (i) => target(i).x1,
          x2: (i) => target(i).x2,
          y1: (i) => target(i).y1,
          y2: (i) => target(i).y2,
        },
        duration: 0.8,
        ease: 'power3.out',
        stagger: { each: 0.05, from: 'center' },
      },
      1.05,
    )
    .to(q('[data-pool-water]'), { scaleY: 1, duration: 0.9, ease: 'power3.out' }, 1.15)
    .to(ropes, { autoAlpha: 1, duration: 0.3, stagger: { each: 0.04, from: 'center' } }, 1.85)
    .to(q('[data-split]'), { autoAlpha: 0, duration: 0.3 }, 1.95)
    .to(swimmers, { autoAlpha: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 }, 1.7)
    .to(swimmers, { keyframes: { y: [0, -4, 3, -2, 0] }, duration: 0.7, ease: 'none', stagger: 0.12 }, 1.7)

  return playIntro(tl, 'natacion')
}
