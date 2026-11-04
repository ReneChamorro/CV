import '@fontsource-variable/geist-mono'
import '@fontsource/barlow/800.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/permanent-marker'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import { gsap, useGSAP, prefersReducedMotion, canHover } from '../../lib/gsap'
import { SECTIONS, LINE_FLAT, INK } from '../../sections'
import resumen from '../../content/resumen'
import IntroLine from '../../components/IntroLine'
import Page from '../../components/Page'
import styles from './Home.module.css'

// Líneas extra que convierten la línea en pentagrama al pasar por "Música".
const STAFF_Y = [70, 85, 115, 130]
const BASE = { bg: '#f2f1ed', ink: INK }
const columns = (active) => SECTIONS.map((s) => (s.id === active ? '2.2fr' : '1fr')).join(' ')

export default function Home() {
  const scope = useRef()
  const line = useRef()
  const navigate = useNavigate()

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline()
      tl.from(line.current, { scaleX: 0, transformOrigin: '50% 50%', duration: 1.1, ease: 'power3.inOut' })
        .from('[data-home-fade]', { autoAlpha: 0, y: 10, stagger: 0.05, duration: 0.5 }, '-=0.3')
      if (prefersReducedMotion()) tl.progress(1)
    },
    { scope },
  )

  // Al pasar por una columna, la portada entera toma la estética de ese ámbito.
  const preview = contextSafe((section) => {
    const id = section?.id
    const theme = section?.theme ?? BASE
    section?.load()
    gsap.to(line.current, {
      morphSVG: section ? section.line : LINE_FLAT,
      stroke: section ? section.color : INK,
      duration: 0.6,
      overwrite: 'auto',
    })
    gsap.to('[data-home-staff]', { autoAlpha: id === 'musica' ? 1 : 0, stagger: 0.04, duration: 0.3, overwrite: 'auto' })
    gsap.to('[data-home-bg]', {
      autoAlpha: (i, el) => (el.dataset.homeBg === id ? 1 : 0),
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    gsap.to(scope.current, { '--ink': theme.ink, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
    gsap.to('[data-strips]', { gridTemplateColumns: columns(id), duration: 0.6, overwrite: 'auto' })
    gsap.to('[data-strip-body]', {
      autoAlpha: (i, el) => (!id || el.dataset.stripBody === id ? 1 : 0.4),
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
      .to('[data-home-fade]', { autoAlpha: 0, y: -8, stagger: 0.02, duration: 0.3 }, '<')
  })

  return (
    <Page className={styles.home}>
      <div ref={scope} className={styles.scope}>
        {SECTIONS.map(({ id, theme }) => (
          <div
            key={id}
            className={styles.bg}
            data-home-bg={id}
            style={{ background: `${theme.pattern}, ${theme.bg}` }}
            aria-hidden="true"
          />
        ))}

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

        <nav className={styles.strips} data-strips aria-label="Ámbitos">
          {SECTIONS.map((section) => (
            <Link
              key={section.id}
              to={section.path}
              className={styles.strip}
              style={{
                '--c': section.color,
                '--font': section.theme.font,
                '--weight': section.theme.weight ?? 400,
                '--style': section.theme.italic ? 'italic' : 'normal',
                '--strip-bg': section.theme.bg,
                '--strip-ink': section.theme.ink,
              }}
              onPointerEnter={() => canHover() && preview(section)}
              onPointerLeave={() => canHover() && preview(null)}
              onFocus={() => preview(section)}
              onBlur={() => preview(null)}
              onClick={(e) => go(e, section)}
            >
              <div className={styles.stripBody} data-strip-body={section.id}>
                <span className={styles.label} data-home-fade>
                  {section.label}
                </span>
                <svg className={styles.miniLine} viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
                  <path d={section.line} vectorEffect="non-scaling-stroke" />
                </svg>
                <dl className={styles.stats} data-home-fade>
                  {resumen[section.id].map(({ valor, etiqueta }) => (
                    <div key={etiqueta}>
                      <dt>{etiqueta}</dt>
                      <dd>{valor}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </Page>
  )
}
