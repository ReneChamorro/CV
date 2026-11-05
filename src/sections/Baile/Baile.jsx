import '@fontsource/cormorant-garamond/500-italic.css'
import { useRef } from 'react'
import { gsap, useGSAP, playIntro, prefersReducedMotion } from '../../lib/gsap'
import { getSection } from '../../sections'
import Page from '../../components/Page'
import IntroLine from '../../components/IntroLine'
import BackHome from '../../components/BackHome'
import Pieces from './Pieces'
import styles from './Baile.module.css'

const section = getSection('baile')

// Escenario a oscuras: el círculo punteado del boceto como marca en el piso y un foco que sigue el cursor.
// Debajo, las piezas: cada una en su círculo y el foco viajando a la que está en el centro.
export default function Baile() {
  const scope = useRef()
  const follow = useRef()

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline()
      tl.from('[data-stage]', { backgroundColor: '#f2f1ed', duration: 0.9, ease: 'power2.inOut' })
        .to('[data-intro-line]', { autoAlpha: 0, duration: 0.4 }, '<')
        .from('[data-ring]', { autoAlpha: 0, scale: 0.85, rotation: -120, transformOrigin: '50% 50%', duration: 1.2 }, '-=0.3')
        .from('[data-spot]', { autoAlpha: 0, duration: 0.8 }, '<')
        .from('[data-baile-reveal]', { autoAlpha: 0, y: 12, stagger: 0.12, duration: 0.5 }, '-=0.5')

      if (!prefersReducedMotion()) {
        gsap.to('[data-ring-spin]', { rotation: 360, transformOrigin: '50% 50%', duration: 40, repeat: -1, ease: 'none' })
        // El foco persigue al cursor con inercia, moviendo solo transform.
        const x = gsap.quickTo('[data-spot]', 'x', { duration: 0.8, ease: 'power3.out' })
        const y = gsap.quickTo('[data-spot]', 'y', { duration: 0.8, ease: 'power3.out' })
        follow.current = (e) => {
          x(e.clientX - window.innerWidth / 2)
          y(e.clientY - window.innerHeight / 2)
        }
      }
      return playIntro(tl, 'baile')
    },
    { scope },
  )

  const onPointerMove = contextSafe((e) => follow.current?.(e))

  return (
    <Page title="Baile" className={styles.page}>
      <div ref={scope}>
        <div className={styles.stage} data-stage onPointerMove={onPointerMove}>
          <div className={styles.spot} data-spot aria-hidden="true" />
          <IntroLine d={section.line} color={section.color} />
          <BackHome className={styles.back} />
          <svg className={styles.ring} viewBox="0 0 200 200" aria-hidden="true">
            <g data-ring-spin>
              <circle data-ring cx="100" cy="100" r="92" />
            </g>
          </svg>
          <div className={styles.text}>
            <h1 className={styles.title} data-baile-reveal>
              Baile
            </h1>
            <p className={styles.soon} data-baile-reveal>
              Piezas y coreografías
            </p>
          </div>
        </div>
        <Pieces />
      </div>
    </Page>
  )
}
