// Videos de skate de la galería. Cada uno:
//   titulo, fecha: lo que se escribe a mano en la tarjeta
//   reel: URL del reel o post de Instagram (al hacer clic se abre ahí)
//   clip (modo final, opcional): fragmento propio en loop de 5 a 8 s, guardado en public/skate/
//     (p. ej. clip: '/skate/kickflip.mp4', poster: '/skate/kickflip.jpg'). Con clip ya no se usa el embed de Instagram.
//   sticker (opcional): palabra corta que se pega encima de la tarjeta
// Mientras reel esté vacío, la tarjeta muestra dónde pegar la URL.
export default [
  { titulo: 'Clip 1', fecha: '2026', reel: '', sticker: 'raw' },
  { titulo: 'Clip 2', fecha: '2026', reel: '' },
  { titulo: 'Clip 3', fecha: '2025', reel: '', sticker: 'loop' },
  { titulo: 'Clip 4', fecha: '2025', reel: '' },
]
