import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/600-italic.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/eb-garamond/400.css'
import '@fontsource/eb-garamond/400-italic.css'
import { useMemo, useRef } from 'react'
import { useGSAP } from '../../lib/gsap'
import { getSection } from '../../sections'
import { staffTransition } from '../../transitions/staffTransition'
import data from '../../content/musica'
import Page from '../../components/Page'
import IntroLine from '../../components/IntroLine'
import BackHome from '../../components/BackHome'
import Portal from '../../components/Portal'
import { NoteGlyph } from './Staff'
import Score, { pickIncipit, compasesToAbc } from './Score'
import styles from './Musica.module.css'

const section = getSection('musica')
// Secreto bajo el tempo de cada movimiento: la línea de otro ámbito que lleva a él.
const MOVEMENT_PORTALS = ['natacion', 'baile', 'skate']

function Video({ video }) {
  if (!video) return <div className={styles.videoEmpty}>Video por agregar</div>
  return (
    <figure className={styles.video}>
      <iframe src={video.url} title={video.titulo} loading="lazy" allowFullScreen />
      <figcaption>{video.titulo}</figcaption>
    </figure>
  )
}

export default function Musica() {
  const scope = useRef()
  // Se recalcula cuando cambia el archivo de contenido, así lo que edites se ve al guardar.
  const incipit = useMemo(
    () => pickIncipit([{ obra: data.incipit.obra, abc: compasesToAbc(data.incipit) }, ...data.incipits]),
    [data],
  )
  useGSAP(() => staffTransition(scope.current), { scope })

  return (
    <Page title="Música" className={styles.score}>
      <div ref={scope}>
        <IntroLine d={section.line} color={section.color} />
        <BackHome className={styles.back} />

        <section className={styles.hero}>
          <Score incipit={incipit} className={styles.staff} />
          <p className={styles.caption} data-music-reveal>
            Incipit · {[incipit.compositor, incipit.obra].filter(Boolean).join(', ')}
          </p>
          <h1 className={styles.name} data-music-reveal>
            {data.nombre}
          </h1>
          <p className={styles.instrument} data-music-reveal>
            {data.instrumento}
          </p>
          <p className={styles.summary} data-music-reveal>
            {data.resumen}
          </p>
        </section>

        <ol className={styles.movements}>
          {data.movimientos.map((mov, i) => (
            <li key={mov.numero} className={styles.movement}>
              <header className={styles.movHeader}>
                <NoteGlyph tipo={mov.nota} className={styles.glyph} />
                <h2 className={styles.movTitle}>
                  <span className={styles.numeral}>{mov.numero}.</span> {mov.titulo}
                </h2>
                <span className={styles.tempoCol}>
                  <span className={styles.tempo}>{mov.tempo}</span>
                  {MOVEMENT_PORTALS[i] && <Portal to={MOVEMENT_PORTALS[i]} style={{ top: '100%', right: '-14px' }} />}
                </span>
              </header>
              <p className={styles.movText}>{mov.texto}</p>
              {mov.videos && (
                <div className={styles.videos}>
                  {mov.videos.length ? mov.videos.map((v) => <Video key={v.url} video={v} />) : <Video />}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Page>
  )
}
