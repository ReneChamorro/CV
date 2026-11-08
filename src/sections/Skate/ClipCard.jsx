import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/gsap'
import styles from './Skate.module.css'

const EMBED_SRC = 'https://www.instagram.com/embed.js'
let embedScript

// embed.js de Instagram se carga una sola vez; después solo se le pide que procese los blockquotes nuevos.
export function loadInstagram() {
  embedScript ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = EMBED_SRC
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
  return embedScript.then(() => window.instgrm?.Embeds.process())
}

// Modo final: clip propio en loop, mudo, que se pausa fuera de pantalla.
function Clip({ clip, poster, titulo }) {
  const video = useRef()

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = video.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {})
      else el.pause()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.vhs}>
      {/* El .webm (más liviano) va primero; si no existe, el navegador usa el .mp4 */}
      <video ref={video} poster={poster} muted loop playsInline preload="metadata" aria-label={titulo}>
        <source src={clip.replace(/\.mp4$/, '.webm')} type="video/webm" />
        <source src={clip} type="video/mp4" />
      </video>
      <span className={styles.osd}>PLAY ▶</span>
    </div>
  )
}

export default function ClipCard({ video, index }) {
  const { titulo, fecha, reel, clip, poster, sticker } = video
  const style = { '--i': index }

  const caption = (
    <p className={styles.caption}>
      {titulo}
      {fecha && <span className={styles.date}>{fecha}</span>}
    </p>
  )

  // Solo miniatura (sin clip): la imagen fija en el marco VHS, también abre el reel.
  if (clip || poster) {
    return (
      <a className={styles.card} style={style} href={reel || undefined} target="_blank" rel="noopener noreferrer">
        {sticker && <span className={styles.sticker}>{sticker}</span>}
        {clip ? (
          <Clip clip={clip} poster={poster} titulo={titulo} />
        ) : (
          <div className={styles.vhs}>
            <img src={poster} alt={titulo} loading="lazy" />
            <span className={styles.osd}>PLAY ▶</span>
          </div>
        )}
        {caption}
      </a>
    )
  }

  if (!reel) {
    return (
      <div className={`${styles.card} ${styles.empty}`} style={style}>
        {sticker && <span className={styles.sticker}>{sticker}</span>}
        <div className={styles.slot}>
          <p>Pega la URL del reel en</p>
          <code>src/content/skate.js</code>
        </div>
        {caption}
      </div>
    )
  }

  // Ahora: el reproductor oficial de Instagram dentro de la tarjeta.
  return (
    <div className={styles.card} style={style}>
      {sticker && <span className={styles.sticker}>{sticker}</span>}
      <blockquote className={`instagram-media ${styles.embed}`} data-instgrm-permalink={reel} data-instgrm-version="14">
        <a href={reel} target="_blank" rel="noopener noreferrer">
          Ver en Instagram
        </a>
      </blockquote>
      <a className={styles.caption} href={reel} target="_blank" rel="noopener noreferrer">
        {titulo}
        {fecha && <span className={styles.date}>{fecha}</span>}
      </a>
    </div>
  )
}
