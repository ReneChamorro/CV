export default {
  nombre: 'René Chamorro',
  instrumento: 'Viola',
  resumen:
    'Formación musical en viola en el Conservatorio del Colegio Emil Friedman. Integrante de diversas orquestas juveniles con roles de liderazgo.',
  // Inicio de la partitura que se dibuja en la transición. Cambia "obra" y "compases" cuando elijas la pieza.
  // pos: medios espacios desde la línea central (Do4 en clave de Do en 3ª línea); + sube, − baja.
  // dur: 'h' blanca, 'q' negra, 'e' corchea.
  incipit: {
    obra: 'Obra por definir',
    compas: [4, 4],
    compases: [
      [
        { pos: 0, dur: 'q' },
        { pos: 1, dur: 'e' },
        { pos: 2, dur: 'e' },
        { pos: 3, dur: 'q' },
        { pos: 4, dur: 'q' },
      ],
      [
        { pos: 3, dur: 'e' },
        { pos: 2, dur: 'e' },
        { pos: 1, dur: 'q' },
        { pos: -2, dur: 'h' },
      ],
    ],
  },
  // nota: figura que se usa como viñeta (los dibujos del boceto).
  movimientos: [
    {
      numero: 'I',
      tempo: 'Andante',
      titulo: 'Formación',
      nota: 'negra',
      texto: 'Viola en el Conservatorio del Colegio Emil Friedman.',
    },
    {
      numero: 'II',
      tempo: 'Allegro',
      titulo: 'Orquestas',
      nota: 'corchea',
      texto: 'Integrante de diversas orquestas juveniles, con roles de liderazgo. Detalle por agregar.',
    },
    {
      numero: 'III',
      tempo: 'Presto',
      titulo: 'Grabaciones',
      nota: 'semicorchea',
      texto: 'Videos por agregar.',
      // { titulo: '...', url: 'https://www.youtube.com/embed/ID' }
      videos: [],
    },
  ],
}
