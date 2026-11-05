import { useLayoutEffect, useRef } from 'react'
import abcjs from 'abcjs'

const LAST_KEY = 'incipit-last'

// Formato de lista { pos, dur } → ABC. pos: medios espacios desde la línea central (Do4);
// dur: w h q e s t x (con '.' para puntillo, p. ej. 'q.'); rest: true para silencio.
const LENGTH = { w: 16, h: 8, q: 4, e: 2, s: 1, t: 0.5, x: 0.25 }

function pitch(pos) {
  const octave = Math.floor(pos / 7)
  const letter = 'CDEFGAB'[((pos % 7) + 7) % 7]
  if (octave >= 1) return letter.toLowerCase() + "'".repeat(octave - 1)
  return letter + ','.repeat(-octave)
}

function length(units) {
  if (units === 1) return ''
  return units >= 1 ? String(units) : `/${1 / units}`
}

export function compasesToAbc({ compas = [4, 4], compases }) {
  const bars = compases.map((notes) => {
    let t = 0
    let prevLong = false
    return notes
      .map((note) => {
        const units = LENGTH[note.dur.replace('.', '')] * (note.dur.endsWith('.') ? 1.5 : 1)
        const long = units >= 4
        // Las vigas se cortan en cada pulso de negra y alrededor de figuras largas.
        const gap = t > 0 && (t % 4 === 0 || long || prevLong) ? ' ' : ''
        t += units
        prevLong = long
        return gap + (note.rest ? 'z' : pitch(note.pos)) + length(units)
      })
      .join('')
  })
  return `X:1\nM:${compas[0]}/${compas[1]}\nL:1/16\nK:C clef=alto\n${bars.join(' | ')} |]`
}

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
      aria-label={`Inicio de partitura para viola: ${[incipit.compositor, incipit.obra].filter(Boolean).join(', ')}`}
    />
  )
}
