import { Link } from 'react-router'
import { SECTIONS, getSection } from '../sections'
import { readVisited } from '../lib/visited'
import styles from './Portal.module.css'

// Música es una línea recta: en miniatura se reconoce mejor como las cinco del pentagrama.
const STAFF_Y = [56, 78, 100, 122, 144]

// Cada portal es la línea de su ámbito en miniatura, la misma que se transforma en la portada.
export function PortalArt({ variant }) {
  const section = getSection(variant)
  // Las líneas oscuras (Música, Sistemas) se aclaran sobre fondos oscuros.
  const ink = ['musica', 'sistemas'].includes(variant) || undefined
  return (
    <svg viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
      {variant === 'musica' ? (
        STAFF_Y.map((y) => (
          <line key={y} data-ink={ink} x1="0" x2="1000" y1={y} y2={y} stroke={section.color} vectorEffect="non-scaling-stroke" />
        ))
      ) : (
        <path data-ink={ink} d={section.line} fill="none" stroke={section.color} vectorEffect="non-scaling-stroke" />
      )}
    </svg>
  )
}

// Acceso directo escondido: la línea de otro ámbito que lleva a él.
export default function Portal({ to, dark = false, className = '', style }) {
  const section = getSection(to)
  const isNew = !readVisited().includes(to)

  return (
    <Link
      to={section.path}
      className={`${styles.portal} ${dark ? styles.onDark : ''} ${className}`}
      // Cada destino destella a su ritmo para que no parpadeen todos a la vez.
      style={{ '--c': section.color, '--delay': `${1 + SECTIONS.indexOf(section) * 1.1}s`, ...style }}
      aria-label={`Ir a ${section.label}`}
      onPointerEnter={() => section.load()}
      onFocus={() => section.load()}
      data-portal
      data-new={isNew || undefined}
    >
      <span className={styles.art}>
        <PortalArt variant={to} />
      </span>
      <span className={styles.tip} aria-hidden="true">
        {section.label}
      </span>
    </Link>
  )
}
