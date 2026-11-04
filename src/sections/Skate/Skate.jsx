import '@fontsource/permanent-marker'
import '@fontsource-variable/geist-mono'
import { useEffect, useRef } from 'react'
import { gsap, useGSAP, playIntro, prefersReducedMotion } from '../../lib/gsap'
import { getSection } from '../../sections'
import videos from '../../content/skate'
import Page from '../../components/Page'
import IntroLine from '../../components/IntroLine'
import BackHome from '../../components/BackHome'
import ClipCard, { loadInstagram } from './ClipCard'
import styles from './Skate.module.css'

const section = getSection('skate')
const RAMP = 'M40,40 C40,220 140,280 280,280 L720,280 C860,280 960,220 960,40'

// La línea ondulada del boceto como perfil de rampa, una tabla que la recorre y debajo la galería de videos.
export default function Skate() {
  const scope = useRef()
  const gallery = useRef()

  // El embed de Instagram se carga solo cuando la galería se acerca a la pantalla.
  useEffect(() => {
    if (!videos.some((v) => v.reel && !v.clip)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        loadInstagram().catch(() => {})
      },
      { rootMargin: '300px' },
    )
    observer.observe(gallery.current)
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline()
      tl.from('[data-ramp]', { drawSVG: '50% 50%', duration: 1, ease: 'power2.inOut' })
        .to('[data-intro-line]', { autoAlpha: 0, duration: 0.4 }, '<0.2')
        .from('[data-skate-reveal]', { autoAlpha: 0, y: 20, rotation: -6, stagger: 0.12, duration: 0.5, ease: 'back.out(2)' })
      const ride = gsap.to('[data-board]', {
        motionPath: { path: '[data-ramp]', align: '[data-ramp]', alignOrigin: [0.5, 1], autoRotate: true },
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      if (prefersReducedMotion()) ride.pause(0.5)
      return playIntro(tl, 'skate')
    },
    { scope },
  )

  return (
    <Page title="Skate" className={styles.page}>
      <div ref={scope}>
        <IntroLine d={section.line} color={section.color} />
        <BackHome className={styles.back} />
        <section className={styles.hero}>
          <div className={styles.text}>
            <h1 className={styles.title} data-skate-reveal>
              Skate
            </h1>
            <p className={styles.soon} data-skate-reveal>
              Clips y videos que monté
            </p>
          </div>
          <svg className={styles.ramp} viewBox="0 0 1000 320" aria-hidden="true">
            <path data-ramp d={RAMP} />
            <g data-board>
              <rect x="-40" y="-14" width="80" height="7" rx="3.5" />
              <circle cx="-24" cy="-4" r="4.5" />
              <circle cx="24" cy="-4" r="4.5" />
            </g>
          </svg>
        </section>

        <section className={styles.gallery} ref={gallery} aria-label="Videos de skate">
          {videos.map((video, i) => (
            <ClipCard key={i} video={video} index={i} />
          ))}
        </section>
      </div>
    </Page>
  )
}
