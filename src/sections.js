// La línea de la portada (viewBox 0 0 1000 200) se transforma en el motivo de cada ámbito.
export const LINE_FLAT = 'M0,100 C250,100 750,100 1000,100'
export const INK = '#1a1a1a'

export const SECTIONS = [
  {
    id: 'sistemas',
    label: 'Sistemas',
    path: '/sistemas',
    theme: { bg: '#e7e5e0', ink: '#23221f', font: "'Geist Mono Variable', ui-monospace, monospace", pattern: 'radial-gradient(#cbc7be 1px, transparent 1px) 0 0 / 22px 22px' },
    load: () => import('./sections/Sistemas/Sistemas'),
    color: '#55524d',
    // Monitor: la línea sube, dibuja la pantalla y su base, y la cruza como una fila de texto.
    line: 'M0,100 H400 V30 H600 V140 H515 L525,170 H475 L485,140 H400 V100 H1000',
  },
  {
    id: 'natacion',
    label: 'Natación',
    path: '/natacion',
    theme: { bg: '#e6f5fd', ink: '#13245c', font: "'Barlow', sans-serif", weight: 800, pattern: 'linear-gradient(180deg, #f4fbfe, #cdeefb)' },
    load: () => import('./sections/Natacion/Natacion'),
    color: '#1f8fd6',
    line: 'M0,100 C83,70 167,70 250,100 C333,130 417,130 500,100 C583,70 667,70 750,100 C833,130 917,130 1000,100',
  },
  {
    id: 'musica',
    label: 'Música',
    path: '/musica',
    theme: { bg: '#f5efe0', ink: '#1d1a16', font: "'Cormorant Garamond', Georgia, serif", weight: 600, pattern: 'repeating-linear-gradient(transparent 0 11px, rgba(29, 26, 22, 0.08) 11px 12px)' },
    load: () => import('./sections/Musica/Musica'),
    color: '#161616',
    line: LINE_FLAT,
  },
  {
    id: 'baile',
    label: 'Baile',
    path: '/baile',
    theme: { bg: '#120d12', ink: '#fbeef4', font: "'Cormorant Garamond', Georgia, serif", italic: true, pattern: 'radial-gradient(circle at 50% 40%, rgba(255, 214, 232, 0.14), transparent 55%)' },
    load: () => import('./sections/Baile/Baile'),
    color: '#e98ab3',
    line: 'M0,140 C300,40 700,40 1000,140',
  },
  {
    id: 'skate',
    label: 'Skate',
    path: '/skate',
    theme: { bg: '#f2f1ed', ink: '#1c1712', font: "'Permanent Marker', cursive", pattern: 'radial-gradient(rgba(240, 123, 29, 0.22) 1.2px, transparent 1.4px) 0 0 / 9px 9px' },
    load: () => import('./sections/Skate/Skate'),
    color: '#f07b1d',
    line: 'M0,30 C10,150 80,170 200,170 L800,170 C920,170 990,150 1000,30',
  },
]

export const getSection = (id) => SECTIONS.find((s) => s.id === id)
