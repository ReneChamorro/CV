import { useLayoutEffect, useRef } from 'react'
import abcjs from 'abcjs'

const LAST_KEY = 'incipit-last'

// Elige un incipit al azar entre los transcritos, sin repetir el de la visita anterior.
export function pickIncipit(incipits) {
  const ready = incipits.filter((inc) => !inc.porTranscribir && inc.abc)
  let last = -1
  try {
    last = Number(sessionStorage.getItem(LAST_KEY) ?? -1)
  } catch {
    // Sin storage: puede repetirse, no pasa nada.
  }
  const options = ready.length > 1 ? ready.filter((inc) => incipits.indexOf(inc) !== last) : ready
  const choice = options[Math.floor(Math.random() * options.length)]
  try {
    sessionStorage.setItem(LAST_KEY, String(incipits.indexOf(choice)))
  } catch {
    // Igual que arriba.
  }
  return choice
}

// abcjs dibuja vigas, ligaduras, puntillos y silencios; add_classes permite animar cada parte.
export default function Score({ incipit, className }) {
  const box = useRef()

  useLayoutEffect(() => {
    abcjs.renderAbc(box.current, incipit.abc, {
      add_classes: true,
      responsive: 'resize',
      staffwidth: 620,
      scale: 1.4,
      paddingtop: 0,
      paddingbottom: 0,
      paddingleft: 0,
      paddingright: 0,
    })
  }, [incipit.abc])

  return (
    <div
      ref={box}
      className={className}
      role="img"
      aria-label={`Inicio de partitura para viola: ${incipit.compositor}, ${incipit.obra}`}
    />
  )
}
