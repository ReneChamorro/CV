import '@fontsource/barlow-condensed/500.css'
import '@fontsource/barlow-condensed/700.css'
import '@fontsource/share-tech-mono'
import { useId, useRef } from 'react'
import { useGSAP } from '../../lib/gsap'
import { getSection } from '../../sections'
import { waveTransition, CREST_A } from '../../transitions/waveTransition'
import data from '../../content/natacion'
import Page from '../../components/Page'
import IntroLine from '../../components/IntroLine'
import BackHome from '../../components/BackHome'
import styles from './Natacion.module.css'

const section = getSection('natacion')

// Carrilera: boyas alternadas, como el trazo escalonado del boceto.
function Rope() {
  const id = `rope${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <svg className={styles.rope} data-rope aria-hidden="true">
      <defs>
        <pattern id={id} width="34" height="14" patternUnits="userSpaceOnUse">
          <circle cx="8.5" cy="7" r="6" fill="#f5fbff" />
          <circle cx="25.5" cy="7" r="6" fill="#0d3b82" />
        </pattern>
      </defs>
      <rect width="100%" height="14" fill={`url(#${id})`} />
    </svg>
  )
}

export default function Natacion() {
  const scope = useRef()
  useGSAP(() => waveTransition(scope.current), { scope })

  return (
    <Page title="Natación" className={styles.pool}>
      <div ref={scope}>
        <div className={styles.flood} data-flood aria-hidden="true">
          <svg className={styles.crest} viewBox="0 0 80 1000" preserveAspectRatio="none">
            <path data-crest d={CREST_A} />
          </svg>
        </div>
        <IntroLine d={section.line} color={section.color} />
        <BackHome className={styles.back} />

        <div className={styles.inner}>
          <header className={styles.board} data-board>
            <div>
              <p className={styles.boardLabel}>{data.disciplina} · federado</p>
              <h1 className={styles.boardName}>{data.nombre}</h1>
            </div>
            <p className={styles.boardYear}>
              <span className={styles.boardLabel}>desde</span>
              <span data-year={data.desde}>{data.desde}</span>
            </p>
          </header>

          <ol className={styles.lanes}>
            {data.carriles.map((carril, i) => (
              <li key={carril.titulo} className={styles.lane}>
                <Rope />
                <div className={styles.laneBody} data-lane>
                  <span className={styles.laneNum}>{i + 1}</span>
                  <div>
                    <h2 className={styles.laneTitle}>{carril.titulo}</h2>
                    <p className={styles.laneDetail}>{carril.detalle}</p>
                  </div>
                  <span className={styles.time}>{carril.marca}</span>
                </div>
              </li>
            ))}
          </ol>
          <Rope />
        </div>
      </div>
    </Page>
  )
}
