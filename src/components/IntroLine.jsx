import styles from './IntroLine.module.css'

// Misma geometría en la portada y en cada sección: así la línea "continúa" al cambiar de ruta.
export default function IntroLine({ ref, d, color, children }) {
  return (
    <svg
      className={styles.line}
      data-intro-line
      viewBox="0 0 1000 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {children}
      <path
        ref={ref}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
