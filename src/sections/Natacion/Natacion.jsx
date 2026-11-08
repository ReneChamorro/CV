import '@fontsource/barlow/600.css'
import '@fontsource/barlow/800.css'
import { useId, useRef } from 'react'
import { useGSAP } from '../../lib/gsap'
import { getSection } from '../../sections'
import { waveTransition } from '../../transitions/waveTransition'
import data from '../../content/natacion'
import Page from '../../components/Page'
import IntroLine from '../../components/IntroLine'
import BackHome from '../../components/BackHome'
import Portal from '../../components/Portal'
import styles from './Natacion.module.css'

const section = getSection('natacion')
const svgId = (id) => id.replace(/[^a-zA-Z0-9]/g, '')

// Carrilera roja y blanca por tramos, como las del club.
function Rope() {
  const id = `rope${svgId(useId())}`
  return (
    <svg className={styles.rope} data-rope aria-hidden="true">
      <defs>
        <pattern id={id} width="96" height="14" patternUnits="userSpaceOnUse">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <circle cx={8 + i * 16} cy="7" r="6.5" fill={i < 3 ? '#e2232a' : '#ffffff'} />
              <circle cx={6 + i * 16} cy="5" r="1.8" fill="#ffffff" opacity={i < 3 ? 0.45 : 0} />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="14" fill={`url(#${id})`} />
    </svg>
  )
}

// Taco de salida visto desde arriba, con el número del carril y las asas de espalda.
function StartBlock({ lane }) {
  return (
    <svg className={styles.block} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="6" y="8" width="44" height="48" rx="5" fill="#13245c" opacity="0.12" transform="translate(2 3)" />
      <rect x="6" y="8" width="44" height="48" rx="5" fill="#ffffff" stroke="#c7d1de" />
      <path d="M12 18 H44 M12 24 H44 M12 30 H44" stroke="#dde4ee" strokeWidth="2" />
      <rect x="50" y="14" width="8" height="5" rx="2.5" fill="#9aa8bb" />
      <rect x="50" y="45" width="8" height="5" rx="2.5" fill="#9aa8bb" />
      <text x="28" y="49" textAnchor="middle" fontSize="15" fontWeight="800" fill="#13245c">
        {lane}
      </text>
    </svg>
  )
}


export default function Natacion() {
  const scope = useRef()
  useGSAP(() => waveTransition(scope.current), { scope })

  return (
    <Page title="Natación" className={styles.page}>
      <div ref={scope}>
        <svg className={styles.split} data-split aria-hidden="true">
          {[...data.carriles, null].map((_, i) => (
            <line key={i} data-split-line x1="0" x2="0" y1="0" y2="0" />
          ))}
        </svg>
        <IntroLine d={section.line} color={section.color} />
        <BackHome className={styles.back} />

        <div className={styles.scene} data-pool-scene>
          <header className={styles.head}>
            <p className={styles.kicker}>{data.nombre}</p>
            <h1 className={styles.title}>{data.disciplina}</h1>
            <p className={styles.since}>Nadador federado desde {data.desde}</p>
            <svg className={styles.squiggle} viewBox="0 0 120 12" aria-hidden="true">
              <path d="M2 6 C12 0 22 0 32 6 S52 12 62 6 S82 0 92 6 S112 12 118 6" />
            </svg>
          </header>

          <div className={styles.poolDeck}>
            {/* Secretos: líneas de otros ámbitos escondidas entre los carriles */}
            <Portal to="musica" style={{ right: '20%', top: '46%' }} />
            <Portal to="baile" style={{ right: '8%', top: '74%' }} />
            <Portal to="skate" style={{ left: '30%', bottom: '2%' }} />
            <div className={styles.water} data-pool-water aria-hidden="true" />
            <Rope />
            {data.carriles.map((carril, i) => (
              <div key={carril.titulo} className={styles.laneRow}>
                <StartBlock lane={i + 1} />
                <div className={styles.lane}>
                  <div className={styles.swimmer} data-swimmer>
                    <div>
                      <h2 className={styles.laneTitle}>{carril.titulo}</h2>
                      <p className={styles.laneDetail}>{carril.detalle}</p>
                    </div>
                    {carril.marca && <span className={styles.time}>{carril.marca}</span>}
                  </div>
                </div>
                <Rope />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  )
}
