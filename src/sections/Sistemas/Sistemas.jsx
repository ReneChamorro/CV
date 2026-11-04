import '@fontsource-variable/geist-mono'
import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useGSAP } from '../../lib/gsap'
import { getSection } from '../../sections'
import { paperTransition } from '../../transitions/paperTransition'
import cv from '../../content/sistemas'
import Page from '../../components/Page'
import IntroLine from '../../components/IntroLine'
import BackHome from '../../components/BackHome'
import styles from './Sistemas.module.css'

const section = getSection('sistemas')

// Rectángulo "a mano" del boceto, en porcentajes del tamaño de la hoja.
const SHEET =
  'M0.4,0.6 C30,0 70,0.9 99.6,0.3 C99.1,20 99.9,40 99.4,55 C98.9,72 100,88 99.7,99.6 C70,99.1 35,100 0.6,99.3 C0,80 1,62 0.3,45 C-0.2,28 0.9,14 0.4,0.6 Z'

// En píxeles reales (sin estirar el SVG) para que DrawSVG pueda medir el trazo.
const sheetPath = (w, h) =>
  SHEET.replace(/(-?[\d.]+),(-?[\d.]+)/g, (_, x, y) => `${((x * w) / 100).toFixed(1)},${((y * h) / 100).toFixed(1)}`)

function useSize(ref) {
  const [size, setSize] = useState(null)
  useLayoutEffect(() => {
    const measure = () => setSize({ w: ref.current.offsetWidth, h: ref.current.offsetHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return size
}

export default function Sistemas() {
  const scope = useRef()
  const sheet = useRef()
  const size = useSize(sheet)
  const ready = size !== null

  useGSAP(() => ready && paperTransition(scope.current), { scope, dependencies: [ready] })

  return (
    <Page title="Sistemas" className={styles.desk}>
      <div ref={scope}>
        <BackHome className={styles.back} />
        <IntroLine d={section.line} color={section.color} />

        <article className={styles.sheet} ref={sheet}>
          {size && (
            <svg className={styles.outline} viewBox={`0 0 ${size.w} ${size.h}`} aria-hidden="true">
              <path data-outline d={sheetPath(size.w, size.h)} />
            </svg>
          )}

          <div className={styles.content}>
            <header className={styles.header}>
              <p className={styles.eyebrow} data-reveal>
                // curriculum.vitae
              </p>
              <h1 className={styles.name}>
                <span data-typed>{cv.nombre}</span>
                <span className={styles.cursor} aria-hidden="true" />
              </h1>
              <p className={styles.role} data-reveal>
                {cv.rol}
              </p>
              <ul className={styles.contact} data-reveal>
                <li>{cv.ubicacion}</li>
                <li>
                  <a href={`mailto:${cv.email}`}>{cv.email}</a>
                </li>
                {cv.telefono && <li>{cv.telefono}</li>}
              </ul>
              <button type="button" className={styles.print} onClick={() => window.print()} data-reveal data-no-print>
                Descargar PDF
              </button>
            </header>

            <section className={styles.block} data-reveal>
              <h2 className={styles.heading}>// perfil</h2>
              <p className={styles.text}>{cv.perfil}</p>
            </section>

            <div className={styles.grid}>
              <div>
                <section className={styles.block} data-reveal>
                  <h2 className={styles.heading}>// habilidades técnicas</h2>
                  <dl className={styles.skills}>
                    {cv.tecnicas.map(({ grupo, items }) => (
                      <div key={grupo}>
                        <dt>{grupo}</dt>
                        <dd>
                          {items.map((item) => (
                            <span key={item} className={styles.tag}>
                              {item}
                            </span>
                          ))}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section className={styles.block} data-reveal>
                  <h2 className={styles.heading}>// habilidades blandas</h2>
                  <ul className={styles.list}>
                    {cv.blandas.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className={styles.block} data-reveal>
                  <h2 className={styles.heading}>// idiomas</h2>
                  <ul className={styles.list}>
                    {cv.idiomas.map(({ idioma, nivel }) => (
                      <li key={idioma}>
                        <strong>{idioma}</strong> · {nivel}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div>
                <section className={styles.block} data-reveal>
                  <h2 className={styles.heading}>// educación</h2>
                  <ol className={styles.timeline}>
                    {cv.educacion.map(({ institucion, periodo, titulo }) => (
                      <li key={institucion}>
                        <span className={styles.period}>{periodo}</span>
                        <strong>{institucion}</strong>
                        <span>{titulo}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                <section className={styles.block} data-reveal>
                  <h2 className={styles.heading}>// actividades complementarias</h2>
                  <ul className={styles.activities}>
                    {cv.actividades.map(({ titulo, texto, ruta }) => (
                      <li key={titulo}>
                        <Link to={ruta} className={styles.activityLink}>
                          {titulo} <span aria-hidden="true">→</span>
                        </Link>
                        <p className={styles.text}>{texto}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Page>
  )
}
