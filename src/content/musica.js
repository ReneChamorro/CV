export default {
  nombre: 'René Chamorro',
  instrumento: 'Viola',
  resumen:
    'Formación musical en viola en el Conservatorio del Colegio Emil Friedman. Integrante de diversas orquestas juveniles con roles de liderazgo.',
  // Una obra escrita como lista de notas (se convierte sola a partitura y entra al sorteo con las de "incipits").
  // pos: medios espacios desde la línea central (Do4 en clave de Do en 3ª línea); + sube, − baja.
  // dur: 'w' redonda, 'h' blanca, 'q' negra, 'e' corchea,
  // 's' semicorchea, 't' fusa, 'x' semifusa; agrega '.' para puntillo ('q.'). { rest: true, dur: 'q' } es un silencio.
  // Las corcheas y semicorcheas de un mismo pulso se unen con viga automáticamente.
  incipit: {
    obra: 'Obra por definir',
    compas: [4, 4],
    compases: [
      [
        { pos: -3, dur: 'e' },
        { pos: -1, dur: 'e' },
        { pos: 1, dur: 'e' },
        { pos: 4, dur: 'q' },
        { pos: 3, dur: 's' },
        { pos: 2, dur: 's' },
        { pos: 1, dur: 's' },
        { pos: 2, dur: 's' },
        { pos: 3, dur: 's' },
        { pos: 4, dur: 's' }
      ],
      [
        { pos: 5, dur: 's' },
        { pos: 4, dur: 's' },
        { pos: 3, dur: 's' },
        { pos: 2, dur: 's' },
        { pos: 1, dur: 'e' },
        { pos: 0, dur: 'q' },
        { pos: -1, dur: 's' },
        { pos: -2, dur: 's' },
        { pos: -1, dur: 'q' },
      ],
    ],
  },
  // Dos compases de distintas obras; en cada visita sale uno al azar (sin repetir el anterior).
  // Se escriben en notación ABC. Lo básico:
  //   L:1/16 fija la unidad (aquí, semicorchea): C = 1/16, C2 = corchea, C4 = negra, C8 = blanca, C16 = redonda, C3 = corchea con puntillo
  //   Alturas en clave de Do: C, D, E... = octava de la línea central hacia arriba; C, (con coma) baja una octava; c sube una
  //   Notas escritas juntas se unen con viga (CDEF); un espacio corta la viga (CD EF)
  //   - ligadura de prolongación (f2-f), ( ) ligadura de expresión ((cd)), z silencio, ^ sostenido, _ bemol, = becuadro
  //   | barra de compás, |] doble barra final. K: armadura (K:G = un sostenido) y clef=alto para la viola.
  // porTranscribir: true = todavía no sale en la página.
  incipits: [
    {
      compositor: 'G. P. Telemann',
      obra: 'Concierto para viola',
      porTranscribir: true,
      // Pendiente: René enviará la imagen completa (clave, armadura y compás) para transcribir los dos compases.
      abc: '',
    },
  ],
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
