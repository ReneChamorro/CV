import { useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import { gsap, useGSAP, prefersReducedMotion, canHover } from '../../lib/gsap'
import { SECTIONS, LINE_FLAT, INK } from '../../sections'
import IntroLine from '../../components/IntroLine'
import Page from '../../components/Page'
import styles from './Home.module.css'

// Líneas extra que convierten la línea en pentagrama al pasar por "Música".
const STAFF_Y = [70, 85, 115, 130]

export default function Home() {
  const scope = useRef()
  const line = useRef()
  const navigate = useNavigate()

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline()
      tl.from(line.current, { scaleX: 0, transformOrigin: '50% 50%', duration: 1.1, ease: 'power3.inOut' })
        .from('[data-home-fade]', { autoAlpha: 0, y: 10, stagger: 0.08, duration: 0.5 }, '-=0.3')
      if (prefersReducedMotion()) tl.progress(1)
    },
    { scope },
  )

  const preview = contextSafe((section) => {
    section?.load()
    gsap.to(line.current, {
      morphSVG: section ? section.line : LINE_FLAT,
      stroke: section ? section.color : INK,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto',
    })
    gsap.to('[data-home-staff]', {
      autoAlpha: section?.id === 'musica' ? 1 : 0,
      stagger: 0.04,
      duration: 0.3,
      overwrite: 'auto',
    })
  })

  const go = contextSafe((event, section) => {
    event.preventDefault()
    section.load()
    if (prefersReducedMotion()) return navigate(section.path)
    gsap
      .timeline({ onComplete: () => navigate(section.path) })
      .to(line.current, { morphSVG: section.line, stroke: section.color, duration: 0.4, overwrite: 'auto' })
      .to('[data-home-staff]', { autoAlpha: 0, duration: 0.2 }, '<')
      .to('[data-home-fade]', { autoAlpha: 0, y: -8, stagger: 0.03, duration: 0.3 }, '<')
  })

  return (
    <Page className={styles.home}>
      <div ref={scope}>
        <header className={styles.header}>
          <h1 className={styles.name} data-home-fade>
            René Chamorro
          </h1>
          <p className={styles.tag} data-home-fade>
            Un currículum en cinco ámbitos
          </p>
        </header>

        <IntroLine ref={line} d={LINE_FLAT} color={INK}>
          {STAFF_Y.map((y) => (
            <line
              key={y}
              data-home-staff
              x1="0"
              x2="1000"
              y1={y}
              y2={y}
              stroke={INK}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              opacity="0"
              visibility="hidden"
            />
          ))}
        </IntroLine>

        <nav className={styles.nav} aria-label="Ámbitos">
          {SECTIONS.map((section) => (
            <Link
              key={section.id}
              to={section.path}
              className={styles.link}
              style={{ '--c': section.color }}
              data-home-fade
              onPointerEnter={() => canHover() && preview(section)}
              onPointerLeave={() => canHover() && preview(null)}
              onFocus={() => preview(section)}
              onBlur={() => preview(null)}
              onClick={(e) => go(e, section)}
            >
              {section.label}
            </Link>
          ))}
        </nav>
      </div>
    </Page>
  )
}
