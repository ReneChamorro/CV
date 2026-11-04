export default {
  nombre: 'René Chamorro',
  rol: 'Desarrollador Web Junior · Estudiante de Ingeniería en Sistemas',
  ubicacion: 'Caracas, Venezuela',
  email: 'renebehrens90@gmail.com',
  // El teléfono no se publica en la web; ponlo aquí (texto) si quieres mostrarlo.
  telefono: null,
  perfil:
    'Soy estudiante de Ingeniería en Sistemas con sólida formación en desarrollo web y programación (Python, Java, HTML, CSS, React, Firebase). Me apasiona resolver problemas complejos, trabajar en equipo y aprender nuevas tecnologías. He liderado proyectos académicos y personales enfocados en soluciones digitales. Complemento mi perfil técnico con habilidades adquiridas en actividades deportivas y musicales que fortalecen mi disciplina, liderazgo y compromiso.',
  tecnicas: [
    { grupo: 'Lenguajes', items: ['Python', 'Java', 'HTML', 'CSS', 'JavaScript'] },
    { grupo: 'Frameworks', items: ['React', 'TailwindCSS', 'Vite'] },
    { grupo: 'Bases de datos', items: ['Firebase', 'Supabase'] },
    { grupo: 'Herramientas', items: ['Git', 'Canva', 'AutoCAD', 'Excel'] },
  ],
  blandas: ['Resolución de problemas', 'Trabajo en equipo', 'Liderazgo', 'Comunicación efectiva'],
  educacion: [
    {
      institucion: 'Universidad Metropolitana',
      periodo: '2021 - actualidad',
      titulo: 'Estudiante de Ingeniería en Sistemas',
    },
    {
      institucion: 'U. E. Colegio Emil Friedman',
      periodo: '2007 - 2021',
      titulo: 'Bachiller en Ciencias',
    },
  ],
  idiomas: [
    { idioma: 'Español', nivel: 'Nativo' },
    { idioma: 'Inglés', nivel: 'Intermedio avanzado (B2)' },
  ],
  actividades: [
    {
      titulo: 'Natación',
      texto:
        'Nadador federado desde 2013. Participación en competencias nacionales. Desarrollé disciplina, constancia y trabajo en equipo.',
      ruta: '/natacion',
    },
    {
      titulo: 'Música · viola',
      texto:
        'Formación musical en viola en el Conservatorio del Colegio Emil Friedman. Integrante de diversas orquestas juveniles con roles de liderazgo.',
      ruta: '/musica',
    },
  ],
}
