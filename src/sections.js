// La línea de la portada (viewBox 0 0 1000 200) se transforma en el motivo de cada ámbito.
export const LINE_FLAT = 'M0,100 C250,100 750,100 1000,100'
export const INK = '#1a1a1a'

export const SECTIONS = [
  {
    id: 'sistemas',
    label: 'Sistemas',
    path: '/sistemas',
    load: () => import('./sections/Sistemas/Sistemas'),
    color: '#55524d',
    line: 'M0,100 C200,96 400,104 600,98 C800,93 900,103 1000,100',
  },
  {
    id: 'natacion',
    label: 'Natación',
    path: '/natacion',
    load: () => import('./sections/Natacion/Natacion'),
    color: '#1f8fd6',
    line: 'M0,100 C83,70 167,70 250,100 C333,130 417,130 500,100 C583,70 667,70 750,100 C833,130 917,130 1000,100',
  },
  {
    id: 'musica',
    label: 'Música',
    path: '/musica',
    load: () => import('./sections/Musica/Musica'),
    color: '#161616',
    line: LINE_FLAT,
  },
  {
    id: 'baile',
    label: 'Baile',
    path: '/baile',
    load: () => import('./sections/Baile/Baile'),
    color: '#e98ab3',
    line: 'M0,140 C300,40 700,40 1000,140',
  },
  {
    id: 'skate',
    label: 'Skate',
    path: '/skate',
    load: () => import('./sections/Skate/Skate'),
    color: '#f07b1d',
    line: 'M0,30 C10,150 80,170 200,170 L800,170 C920,170 990,150 1000,30',
  },
]

export const getSection = (id) => SECTIONS.find((s) => s.id === id)
