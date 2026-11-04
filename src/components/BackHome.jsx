import { Link } from 'react-router'
import styles from './BackHome.module.css'

export default function BackHome({ className = '' }) {
  return (
    <Link to="/" className={`${styles.back} ${className}`} data-no-print>
      <span aria-hidden="true">←</span> René Chamorro
    </Link>
  )
}
