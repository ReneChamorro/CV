// Pentagrama en unidades: líneas cada 12, línea superior en y=0, central (Do4 en clave de Do) en y=24.
const S = 12
const posY = (pos) => 2 * S - pos * (S / 2)
const WIDTH = { e: 30, q: 40, h: 60 }
const FIRST_NOTE_X = 84

// Clave de Do (SMuFL cClef, U+E05C) de la fuente Bravura de Steinberg, licencia SIL Open Font License 1.1.
// Contorno extraído a 1 em = 4 espacios (48 unidades), con el origen en la línea central.
const C_CLEF =
  'M15.04 0.86C15.04 0.19 14.70-0.14 14.03-0.14L13.98-0.14C13.31-0.14 12.98 0.19 12.98 0.86L12.98 47.14C12.98 47.81 13.31 48.14 13.98 48.14L14.03 48.14C14.70 48.14 15.04 47.81 15.04 47.14L15.04 26.11C15.04 25.73 15.28 25.78 15.47 25.82C16.72 26.16 18.74 27.41 19.74 32.83C19.89 33.60 20.18 34.03 20.66 34.03C21.18 34.03 21.42 33.55 21.66 32.74C22.29 30.62 23.39 28.27 26.80 28.27C29.92 28.27 30.78 31.34 30.78 37.63C30.78 43.92 29.68 46.75 25.70 46.75C25.02 46.75 21.62 46.46 21.62 45.46C21.62 45.22 22.38 44.93 22.91 44.74C23.87 44.40 24.83 43.44 24.83 41.62C24.83 39.50 23.44 38.30 21.57 38.30C19.50 38.30 17.87 39.70 17.87 42.24C17.87 45.26 20.51 48.29 26.22 48.29C34.10 48.29 37.55 42.77 37.55 37.78C37.55 31.15 33.90 26.54 27.52 26.54C26.13 26.54 25.22 26.78 24.59 26.98C24.11 27.12 23.63 27.22 23.20 26.93C22.53 26.50 21.47 24.96 21.47 24C21.47 23.04 22.53 21.50 23.20 21.07C23.63 20.78 24.11 20.88 24.59 21.02C25.22 21.22 26.13 21.46 27.52 21.46C33.90 21.46 37.55 16.85 37.55 10.22C37.55 5.23 34.10-0.29 26.22-0.29C20.51-0.29 17.87 2.74 17.87 5.76C17.87 8.30 19.50 9.70 21.57 9.70C23.44 9.70 24.83 8.50 24.83 6.38C24.83 4.56 23.87 3.60 22.91 3.26C22.38 3.07 21.62 2.78 21.62 2.54C21.62 1.54 25.02 1.25 25.70 1.25C29.68 1.25 30.78 4.08 30.78 10.37C30.78 16.66 29.92 19.73 26.80 19.73C23.39 19.73 22.29 17.38 21.66 15.26C21.42 14.45 21.18 13.97 20.66 13.97C20.18 13.97 19.89 14.40 19.74 15.17C18.74 20.59 16.72 21.84 15.47 22.18C15.28 22.22 15.04 22.27 15.04 21.89Z' +
  'M5.01-0.14C4.34-0.14 4 0.19 4 0.86L4 47.14C4 47.81 4.34 48.14 5.01 48.14L9.14 48.14C9.81 48.14 10.14 47.81 10.14 47.14L10.14 0.86C10.14 0.19 9.81-0.14 9.14-0.14Z'

function flag(x, y, dir) {
  return `M${x},${y} C${x + 1},${y + 7 * dir} ${x + 11},${y + 10 * dir} ${x + 8},${y + 22 * dir} C${x + 14},${y + 12 * dir} ${x + 8},${y + 6 * dir} ${x},${y + 5 * dir} Z`
}

function Note({ x, pos, dur }) {
  const y = posY(pos)
  const up = pos < 0
  const stemX = up ? x + 5.9 : x - 5.9
  const stemEnd = up ? y - 3.5 * S : y + 3.5 * S
  const hollow = dur === 'h'

  return (
    <g data-note>
      <ellipse
        cx={x}
        cy={y}
        rx="6.4"
        ry="4.4"
        transform={`rotate(-20 ${x} ${y})`}
        fill={hollow ? 'none' : 'currentColor'}
        stroke="currentColor"
        strokeWidth={hollow ? 1.8 : 0}
      />
      <line x1={stemX} y1={y} x2={stemX} y2={stemEnd} stroke="currentColor" strokeWidth="1.3" />
      {dur === 'e' && <path d={flag(stemX, stemEnd, up ? 1 : -1)} fill="currentColor" />}
    </g>
  )
}

function layout(compases) {
  const notes = []
  const bars = []
  let x = FIRST_NOTE_X
  compases.forEach((compas) => {
    compas.forEach((note) => {
      notes.push({ ...note, x })
      x += WIDTH[note.dur]
    })
    bars.push(x - 10)
    x += 16
  })
  return { notes, bars, width: bars.at(-1) + 6 }
}

export default function Staff({ incipit, className }) {
  const { notes, bars, width } = layout(incipit.compases)
  const [top, bottom] = incipit.compas
  const lastBar = bars.at(-1)

  return (
    <svg
      className={className}
      viewBox={`-4 -14 ${width + 8} 76`}
      role="img"
      aria-label={`Inicio de partitura para viola: ${incipit.obra}`}
    >
      <g stroke="currentColor" strokeWidth="0.9">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} data-staff-line x1="0" x2={width} y1={i * S} y2={i * S} />
        ))}
      </g>

      <path data-clef d={C_CLEF} fill="currentColor" stroke="currentColor" strokeWidth="0.6" strokeLinejoin="round" />

      <g className="timesig" fill="currentColor" textAnchor="middle" fontSize="27" fontWeight="700">
        <text data-timesig x="54" y="21">
          {top}
        </text>
        <text data-timesig x="54" y="45">
          {bottom}
        </text>
      </g>

      {notes.map((note, i) => (
        <Note key={i} {...note} />
      ))}

      <g stroke="currentColor">
        {bars.map((x) =>
          x === lastBar ? (
            <g key={x}>
              <line data-barline x1={x - 6} x2={x - 6} y1="0" y2="48" strokeWidth="1.1" />
              <line data-barline x1={x} x2={x} y1="0" y2="48" strokeWidth="4" />
            </g>
          ) : (
            <line key={x} data-barline x1={x} x2={x} y1="0" y2="48" strokeWidth="1.1" />
          ),
        )}
      </g>
    </svg>
  )
}

// Viñetas: las figuras dibujadas en el boceto.
export function NoteGlyph({ tipo, className }) {
  const flags = { negra: 0, corchea: 1, semicorchea: 2 }[tipo] ?? 0
  return (
    <svg className={className} viewBox="0 0 24 40" aria-hidden="true">
      <ellipse cx="8" cy="33" rx="6.4" ry="4.4" transform="rotate(-20 8 33)" fill="currentColor" />
      <line x1="13.9" y1="33" x2="13.9" y2="3" stroke="currentColor" strokeWidth="1.4" />
      {Array.from({ length: flags }, (_, i) => (
        <path key={i} d={flag(13.9, 3 + i * 7, 1)} fill="currentColor" />
      ))}
    </svg>
  )
}
