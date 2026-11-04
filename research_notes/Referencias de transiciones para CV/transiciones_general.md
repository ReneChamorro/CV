# Transiciones de página/escena en portfolios creativos multi-sección y videojuegos (referencia para un CV web artístico de 5 mundos unidos por una línea horizontal)

> Notas de investigación (noviembre 2026). Cada afirmación lleva su fuente; lo no verificado está en "Inferencias" o "Huecos". Contexto del proyecto: React + Vite, 5 secciones (ingeniería de sistemas, natación, viola, danza, skate), una línea horizontal en la home que se transforma en el motivo de cada sección.

## 1. Portfolios/sitios premiados (Awwwards/FWA 2022-2026) que cambian de dirección de arte por sección y siguen siendo cohesivos

### Takeaway
No encontré, con fuentes verificables, un Site of the Day/Year 2022-2026 documentado explícitamente como "un mundo visual distinto por sección unido por un hilo". Los referentes más cercanos son sitios inmersivos donde un **sistema único** (un mundo 3D navegable, una tipografía cinética, un lenguaje técnico 3D→wireframe, o una pieza musical/narrativa) unifica estados visuales muy distintos.

### Cited Findings
- **Site of the Year 2025 de Awwwards**: sitio oficial de Lando Norris, hecho por OFF+BRAND. Usa tipografía verde lima, secuencias de scroll cinematográficas y un casco 3D que rota según la lectura. Unifica con un color y un objeto recurrentes, no con un cambio de mundo por sección — [Awwwards Annual Awards](https://www.awwwards.com/annual-awards/winners); [Metabole: Immersive Website Examples 2026](https://metabole.studio/en/blog/immersive-website-examples)
- **Messenger** ganó Developer Site of the Year 2025: un planeta WebGL que gira en tiempo real, con un personaje repartidor que recorre su geografía. El mundo-contenedor único es lo que da cohesión — [Metabole](https://metabole.studio/en/blog/immersive-website-examples)
- **Terminal Industries** fue Site of the Month en septiembre de 2025. Al hacer scroll, sus visuales 3D pasan a vistas wireframe: un mismo lenguaje técnico cambia de apariencia por sección. Es el ejemplo más cercano a "un mundo por capítulo" de la lista — [Metabole](https://metabole.studio/en/blog/immersive-website-examples)
- **Igloo.inc** tiene una navegación inmersiva guiada por scroll en la que cada interacción forma un viaje fluido; la navegación misma es la estructura que unifica — [Metabole](https://metabole.studio/en/blog/immersive-website-examples)
- **Portfolio de Active Theory**: las previews de proyecto se expanden a experiencias a pantalla completa con transiciones WebGL fluidas. Es un patrón de "elemento compartido" de miniatura a mundo — [Metabole](https://metabole.studio/en/blog/immersive-website-examples)
- **Portfolio de Bruno Simon** (2025): Site of the Month en enero de 2026. Es un mundo 3D conducible (Three.js + Cannon.js); el trabajo, las charlas y la docencia se recorren conduciendo — [Metabole](https://metabole.studio/en/blog/immersive-website-examples)
- **Obys Agency** usa tipografía cinética (letras que escalan, se parten y se transforman con el scroll) como sistema visual único — [Metabole](https://metabole.studio/en/blog/immersive-website-examples)
- **Immersive Garden** fue Agency of the Year 2025 en Awwwards (Cartier Watches & Wonders 2025) — [Metabole](https://metabole.studio/en/blog/immersive-website-examples)
- **Otros portfolios SOTD** encontrados, cuya variación por proyecto no está verificada:
  - Saint Louvent Creation, SOTD del 16/10/2022: portfolio de director de arte y fotógrafo — [Awwwards](https://www.awwwards.com/sites/saint-louvent-creation)
  - Fine Thought, SOTD del 20/07/2025: portfolio experimental con paleta de dos colores (restricción en vez de variación) — [Awwwards](https://www.awwwards.com/sites/fine-thought-site)
- **Referente fuera de la web, Sayonara Wild Hearts (Simogo)**: niveles muy distintos que se sienten como un mismo álbum.
  - La música "pintó" la paleta: tonos púrpura, rosa y azul.
  - La iconografía es común: personajes basados en los Arcanos Mayores del tarot.
  - Usa formas simples y colores distintivos por categoría (peligro, positivo, personajes, vehículos).
  
  Fuente: [Apple Developer – Behind the Design: Sayonara Wild Hearts](https://developer.apple.com/news/?id=33kvkagk)

### Inferencias
- Lo que unifica a los mejores ejemplos son **invariantes**: un objeto o hilo conductor (casco, planeta, coche), una gramática de movimiento (mismas curvas y duraciones), una tipografía o un sistema de color de acento. Para el CV, la **línea horizontal** cumple el papel del "objeto recurrente". Conviene fijar además 1-2 invariantes más: misma familia tipográfica para la UI de navegación, mismo easing y mismo grosor/color de línea en las transiciones. Así cada sección puede cambiar fondo, textura y paleta.
- El modelo Sayonara Wild Hearts ("álbum de canciones con capítulos") encaja muy bien con 5 secciones que son 5 "pistas". Cada una tiene su paleta, pero comparten iconografía y ritmo.

### Huecos
- Ninguna fuente verificó un SOTD con "dirección de arte radicalmente distinta por sección" más una URL viva. Las búsquedas en Awwwards devuelven fichas sin descripción del sistema visual. Recomiendo una revisión manual de las colecciones "Portfolio" de Awwwards y de FWA.
- Metabole no da las URLs de varios sitios (Messenger, Terminal Industries, Igloo.inc). Las URLs probables (p. ej. igloo.inc, landonorris.com, bruno-simon.com) no las comprobé en esta sesión.

## 2. Sitios y técnicas con una línea/path SVG continuo como recurso de navegación o transición (línea que se dibuja, se transforma o se convierte en objetos)

### Takeaway
Sobran técnicas y demos de calidad (Codrops, GSAP DrawSVG/MorphSVG, scroll-driven animations CSS), pero no encontré un sitio premiado verificado que use **una única línea** como navegación entre secciones. Esto es una oportunidad de diferenciación. Las piezas técnicas están maduras y GSAP es ahora 100 % gratuito, incluidos MorphSVG y DrawSVG.

### Cited Findings
- **Codrops "Morphing Page Transition" (2017)**: transforma un path SVG en otro mientras la página actual sube. Usa anime.js, no GSAP — [Codrops](https://tympanus.net/codrops/2017/08/08/morphing-page-transition)
- **Codrops Sketches 021 y 022 (abril 2022, Manoela Ilic)**: transición de página con un path SVG animado, en versión vertical y horizontal. La horizontal es muy pertinente para una línea horizontal — [Sketch 021](https://tympanus.net/codrops/sketches/sketch-021-svg-path-page-transition-vertical); [Sketch 022](https://tympanus.net/codrops/sketches/sketch-022-svg-path-page-transition-horizontal)
- **Codrops "Theodore"**: transición de página con un path SVG animado sobre un menú con fondo animado infinito — [GitHub codrops/Theodore](https://github.com/codrops/Theodore)
- **Codrops (mayo 2025)**: 5 demos con plugins GSAP gratuitos, de SplitText a MorphSVG, con un demo de DrawSVG — [Codrops](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/)
- **GSAP es "100 % FREE including ALL of the bonus plugins"** (SplitText, MorphSVG, etc.), también para uso comercial, gracias a Webflow — [README de GSAP 3.13 en unpkg](https://unpkg.com/gsap@3.13.0/README.md); [Foro Webflow](https://discourse.webflow.com/t/webflow-makes-gsap-100-free/319967)
- **Advertencia de licencia**: un usuario del foro señala que la licencia estándar de GSAP restringía el uso en herramientas no-code competidoras de Webflow. No afecta a un CV personal — [Foro Webflow](https://discourse.webflow.com/t/webflow-makes-gsap-100-free/319967)
- **Patrón "línea larga que se dibuja con el scroll"**: el progreso se limita (*clamped*) pero nunca bloquea (*gated*). Saltar al final dibuja la ruta entera y volver arriba la borra — [animation-handbook (GitHub)](https://github.com/matinmonshizadeh/animation-handbook/tree/main/animations/01-scroll-based/svg-line-draw)
- **Técnicas alternativas**:
  - Dibujo de línea con clip-path sobre un SVG — [Brad Woods digital garden](https://garden.bradwoods.io/notes/svg/scroll-driven-draw-animation)
  - Dibujo ligado al scroll solo con CSS (scroll-driven animations nativas) — [LogRocket](https://blog.logrocket.com/how-to-animate-svg-css-tutorial-examples/)

### Inferencias
- **Arquitectura sugerida para la línea**: un único `<svg>` persistente fuera del `<Outlet>` del router (en el layout raíz), para que no se desmonte al navegar. La transición tendría tres fases:
  1. *Anticipación*: la línea se tensa o se encoge.
  2. *Morph*: con MorphSVG, la línea pasa al motivo de la sección (onda de agua, cuerda de viola, trazo de danza, rampa/half-pipe de skate, traza de circuito/señal para ingeniería).
  3. *Revelado*: el motivo se expande como máscara o clip-path que descubre el nuevo mundo.
- MorphSVG interpola entre paths con distinto número de puntos. Aun así, los morphs más limpios salen de paths con dirección y punto inicial coherentes. Conviene diseñar los 5 motivos partiendo de la misma línea base en Figma/Illustrator.
- La alternativa View Transitions (shared element con `view-transition-name`) anima con snapshots raster (cross-fade y escala). **No hace morph real de geometría SVG**, así que para "la línea se convierte en el motivo" GSAP MorphSVG es la herramienta adecuada.

### Huecos
- No encontré ejemplos en vivo verificados (Awwwards/FWA) de "una línea continua como navegación". Haría falta una búsqueda manual en Awwwards con etiquetas como "line", "svg", "storytelling".
- No verifiqué qué librería usan los Sketches 021/022 de Codrops.

## 3. Transiciones de escena y de menú a nivel en videojuegos que se pueden trasladar a la web; qué las hace sentirse bien

### Takeaway
Las fuentes encontradas son sobre todo prácticas (tutoriales de iris wipe) y de diseño de UI (Persona 5, Sayonara Wild Hearts). No encontré charlas GDC ni postmortems verificados sobre la temporización de transiciones en Hades, Celeste, Gris, Tunic o Hi-Fi Rush. Los principios recurrentes son: transición corta y consistente, cierre centrado en un punto con significado, y el corte usado para ocultar la carga.

### Cited Findings
- **Iris wipe**: un círculo se cierra sobre la pantalla, se cambia la escena y se vuelve a abrir. Se implementa con un shader que compara la distancia de cada píxel a un centro con un radio. Se recomienda centrar el iris en el personaje o en una puerta para dar dramatismo — [Saltmire: 5 Godot 4 scene transitions](https://saltmire.github.io/godot-4-scene-transitions.html)
- **El iris como caso particular del luma wipe**: una máscara en escala de grises comparada con un valor de progreso. Esto permite cualquier forma de barrido (tinta, agua, trazo) con una sola técnica. Se propone una API asíncrona del tipo cerrar → cargar → abrir — [GitHub artificer-forge #18](https://github.com/alvarosabu/artificer-forge/issues/18)
- **El iris viene del montaje de cine** (iris out) y hoy es habitual en juegos — [TV Tropes: Iris Out](https://tvtropes.org/pmwiki/pmwiki.php/Main/IrisOut)
- **Kits de transición** para Godot que combinan barridos con screen shake y hit-stop, es decir, la transición como parte del *game feel* — [Saltmire Transitions (itch.io)](https://saltmire.itch.io/saltmire-transitions-scene-transition-kit-for-godot-4)
- **Persona 5**:
  - Las transiciones de menú son animaciones fluidas y estilizadas, tan exageradas como la historia — [WhatCulture](https://whatculture.com/amp/gaming/10-best-video-game-user-interfaces?page=8)
  - Atlus explicó su proceso en CEDEC+KYUSHU 2017: un modelo 3D que gira y acaba en una pose, construido con una herramienta especial — [Siliconera](https://www.siliconera.com/?p=668266)
  - El director Katsura Hashino dice que cada menú tiene su propio programa y diseño, lo que es "muy pesado" de producir — [PC Gamer](https://www.pcgamer.com/games/rpg/persona-series-director-says-atluss-flashy-menus-are-actually-really-annoying-to-design); [Kotaku](https://kotaku.com/-metaphor-refantazio-persona-5-menu-ui-hashino-1851667088)
  - Crítica: la UI estilizada a veces sacrifica legibilidad — [Inverse](https://inverse.com/gaming/persona-5-tactica-user-interface)
- **Sayonara Wild Hearts**:
  - Cada nivel es "una animación a lo largo de una superficie de carretera". Una animación maestra define eventos, cámara, cambios visuales y posiciones en el tiempo. Es una transición continua coreografiada, no un corte — [Simogo vía resultados de búsqueda](https://simogo.com/work/sayonara-wild-hearts/)
  - El objetivo era el espectáculo sin perder la sensación de control constante — [Apple Developer](https://developer.apple.com/news/?id=33kvkagk)
- **Game UI Database** tiene capturas de UI y menús de Sayonara Wild Hearts y de muchos otros juegos, útil como referencia visual frame a frame — [Game UI Database](https://www.gameuidatabase.com/gameData.php?id=1265)

### Inferencias
Estas son traducciones a la web basadas en conocimiento general, no verificadas con fuentes en esta sesión:
- **Iris o máscara centrada en el punto de clic**: el `clip-path: circle()` o una máscara SVG nace del punto donde el usuario pulsó la sección en la línea. Equivale al "centrar el iris en el personaje o la puerta".
- **Luma/ink wipe por sección**: una sola técnica de máscara con 5 texturas distintas: salpicadura de agua (natación), trazo de arco o mancha de colofonia (viola), gesto de pincel (danza), arañazo de lija o grip tape (skate), barrido de scanline o glitch (ingeniería). Así se mantiene la consistencia técnica con variedad visual.
- **Anticipación → acción → asentamiento**: un micro "squash" de la línea (≈100-150 ms) antes del morph da intención, al estilo de los menús de Persona.
- **Ocultar la carga**: hacer coincidir el pico de la transición (pantalla cubierta) con el `import()` dinámico (lazy route) y los assets de la sección. Si la carga tarda, se mantiene el estado cubierto con un loop sutil en lugar de bloquear la animación.
- **Menú → mundo (zoom)**: la línea de la home actúa como "mapa de mundos" (como un overworld). Entrar en una sección es hacer zoom en su tramo de la línea.

### Huecos
- No encontré fuentes primarias (GDC, postmortems) sobre transiciones en Celeste, Hades, Gris, Tunic ni Hi-Fi Rush. Las búsquedas devolvieron solo vídeos de pantalla de título o créditos. Faltan duraciones concretas en ms de transiciones de juegos.
- No accedí a la charla CEDEC 2017 de Atlus.

## 4. Estado de View Transitions API (2025-2026), integración con React/React Router frente a GSAP + Motion (AnimatePresence)

### Takeaway
A noviembre de 2026, las **View Transitions same-document** (SPA) funcionan en Chrome/Edge 111+, Safari 18+ y Firefox 144+. Las **cross-document** (MPA) siguen sin estar en Firefox. React 19.3 (9/9/2026) hizo estable `<ViewTransition>`, y React Router depreca su prop `viewTransition` en favor de ese componente. Para "una línea que se transforma en otra forma", GSAP sigue siendo la herramienta adecuada. View Transitions sirve para el cross-fade o el shared element del contenido.

### Cited Findings
- **Same-document**: Chrome/Edge 111, Safari 18, Firefox 144 (estable el 14/10/2025, lo que la hace Baseline "Newly available"). La primera versión de Firefox no incluía *view transition types* — [Chrome for Developers: What's new in view transitions (2025)](https://developer.chrome.com/blog/view-transitions-in-2025)
- **`view-transition-name: match-element`**: Chrome/Edge 137, Firefox 144, Safari 18.4. Solo funciona en same-document — [Chrome for Developers](https://developer.chrome.com/blog/view-transitions-in-2025)
- **Novedades de 2025 en Chrome**:
  - Nested view transition groups (Chrome 140; no en Firefox ni Safari), que preservan clipping y transformaciones 3D.
  - Scoped transitions con `element.startViewTransition()` (Chrome 147; antes, tras flag desde 140).
  - `document.activeViewTransition` (Chrome 142).
  - `ViewTransition.waitUntil`.
  - El callback de `finished` ya no espera un frame (Chrome 140), lo que evita parpadeo al final.
  
  Fuente: [Chrome for Developers](https://developer.chrome.com/blog/view-transitions-in-2025)
- **Interop 2025** incluyó same-document view transitions: `startViewTransition()`, `view-transition-class`, `match-element` y `:active-view-transition` — [Chrome for Developers](https://developer.chrome.com/blog/view-transitions-in-2025)
- **Cross-document (MPA, `@view-transition { navigation: auto }`)**:
  - Chrome/Edge 126+, Safari 18.2+; Firefox no lo soporta — [Chrome docs: cross-document](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
  - Baseline bloqueado por Firefox desde diciembre de 2024 (Bugzilla 1860854) — [web-features explorer](https://web-platform-dx.github.io/web-features-explorer/features/cross-document-view-transitions); [WordPress Trac #64471](https://core.trac.wordpress.org/ticket/64471)
  - La doc de Chrome muestra un marcador "Firefox 147" en la sección de eventos pageswap/pagereveal. No queda claro si se refiere a los eventos o a la at-rule, así que es un dato sin confirmar.
- **React 19.3 (9 septiembre 2026)**: `<ViewTransition>` y `addTransitionType` son estables (sin prefijo `unstable_`) — [react.dev blog React 19.3](https://react.dev/blog/2026/09/09/react-19-3); [@reactjs en X](https://x.com/reactjs/status/2097766969080680729)
  - Tipos de animación: `enter`, `exit`, `update` y `share` (un `<ViewTransition>` con nombre que se quita en un sitio y aparece en otro, es decir, shared element). Por defecto hace cross-fade, personalizable con clases CSS o con WAAPI vía `onEnter`/`onExit`/`onShare`/`onUpdate`.
  - Solo anima actualizaciones marcadas como Transition (`startTransition`, revelado de `Suspense`, `useDeferredValue`). Las actualizaciones urgentes no animan.
  - `addTransitionType('next')` permite animar distinto según la dirección. React añade los tipos como *view transition types* del navegador, usables en CSS con `:active-view-transition-type(...)`.
  - Patrón recomendado con Suspense: `<ViewTransition update="auto" default="none">`. El fallback aparece sin animación y el contenido entra con animación.
  - Solo funciona en el DOM; corrige crashes en Mobile Safari.
  
  Fuente: [react.dev](https://react.dev/blog/2026/09/09/react-19-3)
- **React Router**:
  - La prop `viewTransition` en `Link`/`NavLink`/`Form`, `useViewTransitionState` y `isTransitioning` están **deprecados** en favor del `<ViewTransition>` de React (requiere React 19.3+).
  - Para shared elements, cada lado se envuelve en `<ViewTransition name="...">` con el mismo nombre único.
  - Activar ambas implementaciones a la vez puede interrumpir animaciones.
  
  Fuente: [React Router – View Transitions](https://reactrouter.com/how-to/view-transitions)
- **Producción**: detectar soporte (`if (document.startViewTransition)`) y, si no lo hay, actualizar el DOM sin animación — [Chrome for Developers](https://developer.chrome.com/blog/shared-element-transitions-for-spas)
- **GSAP** es completamente gratuito (incluye MorphSVG, DrawSVG y SplitText) — [README GSAP](https://unpkg.com/gsap@3.13.0/README.md)
- Existe una comparativa "React ViewTransition vs. Motion", sin leer en detalle — [daily.dev](https://daily.dev/posts/8BOanXhVN)

### Inferencias
**Pros y contras de cada enfoque:**
- **View Transitions (React `<ViewTransition>`)**
  - Pros: nativo, sin JS de animación, gestiona solapes de DOM viejo y nuevo, buen rendimiento, integra Suspense y lazy routes.
  - Contras: trabaja sobre snapshots raster (sin morph de geometría), menos control de timeline o secuenciado, requiere React 19.3 y fallback en navegadores antiguos.
- **GSAP (+ `@gsap/react` `useGSAP`)**
  - Pros: control total de timelines, MorphSVG/DrawSVG para la línea, scrubbing, `gsap.matchMedia()` para reduced-motion, igual en todos los navegadores.
  - Contras: hay que orquestar a mano el montaje y desmontaje de rutas (mantener la ruta saliente hasta que acabe la animación).
- **Motion (`AnimatePresence` + `layoutId`)**
  - Pros: declarativo, `mode="wait"` para salida → entrada, `layoutId` para shared element.
  - Contras: menos potente para morph de paths complejos; mezclarlo con GSAP duplica peso y modelos mentales.

**Recomendación híbrida para este CV:**
- La línea persistente en el layout raíz se anima con GSAP (morph y máscara). La navegación se hace dentro de `startTransition`.
- `<ViewTransition>` queda para el cross-fade o el shared element del contenido (títulos, tarjetas).
- Se usa `addTransitionType('home→swim')` etc. para variar el CSS por sección.
- No conviene usar a la vez la prop `viewTransition` de React Router y el componente de React.

### Huecos
- No verifiqué en caniuse/MDN el estado exacto de Firefox para cross-document a noviembre de 2026. La última fuente (unas semanas atrás) dice que sigue sin soporte. Para una SPA con Vite esto es irrelevante, porque se usa same-document.
- No verifiqué si Safari o Firefox ya soportan nested groups o scoped transitions en 2026.

## 5. Guía UX: duración de la transición de entrada, permitir saltarla, mostrarla solo la primera visita, prefers-reduced-motion, enlaces profundos y SEO de SPA (prerender con Vite)

### Takeaway
Las transiciones de UI deben quedarse por debajo de ~500 ms, y el límite de flujo de pensamiento de NN/g es 1 s. Una intro artística puede durar más solo si es saltable y aparece una sola vez. Los enlaces profundos deben aterrizar directamente en la sección. En SEO, una SPA Vite pura es client-side rendering: conviene **prerenderizar en build** las 6 rutas.

### Cited Findings
- **Umbrales de NN/g** (citados de segunda mano): 100 ms se percibe como instantáneo y 1 s es el límite superior del flujo de pensamiento. El feedback simple ronda los 100 ms; un modal que entra, 200-300 ms — [Val Head: How fast should your UI animations be?](https://valhead.com/?p=2978); [W3C public-css-archive (Bramus, abr 2025)](https://lists.w3.org/Archives/Public/public-css-archive/2025Apr/0702.html)
- **Rango habitual de 100-500 ms**. Los movimientos que recorren mucha distancia o usan easing elástico van al extremo alto; las salidas pueden ser más cortas (Material Design) — [Uxcel: Duration](https://app.uxcel.com/courses/design-foundations/motion-995/duration-9224); [W3C archive](https://lists.w3.org/Archives/Public/public-css-archive/2025Apr/0702.html)
- **Juegos**: las transiciones deben ser rápidas y consistentes, porque las lentas o irregulares frustran más de lo que pulen (resumen del buscador; no pude leer el artículo completo, la URL devolvía un índice) — [Bugnet blog](https://bugnet.io/blog/how-to-implement-screen-transitions-that-feel-good)
- **SEO de SPA**:
  - Sin prerender ni SSR, una app Vite + React es CSR, con severidad "alta" para sitios de contenido — [ai-toolkit SEO reference](https://cdn.jsdelivr.net/npm/@softspark/ai-toolkit@4.20.0/app/skills/seo-validate/reference/spa-ssg-patterns.md)
  - El prerender en build sirve primero el HTML y después hidrata — [developer-seo-hub](https://developer-seo-hub.pages.dev/en/glossary/prerendering)
  - Opciones: vite-plugin-prerender, react-snap, vite-ssg — [skillsmp](https://skillsmp.com/creators/charanjit-singh/lovable-skills/skills-seo-ssr-and-prerendering)
  - vite-plugin-ssg-spa extrae las rutas de la config de React Router — [pkgstats](https://www.pkgstats.com/pkg:vite-plugin-ssg-spa)
  - En hosts estáticos, conviene evitar rewrites catch-all de SPA que pisen el `index.html` de cada ruta — [developer-seo-hub](https://developer-seo-hub.pages.dev/en/glossary/prerendering)
- **Ruta larga trazada con scroll**: el progreso nunca debe bloquear. Saltar al final muestra el estado completo, lo que es relevante para deep links — [animation-handbook](https://github.com/matinmonshizadeh/animation-handbook/tree/main/animations/01-scroll-based/svg-line-draw)

### Inferencias
Recomendaciones de buenas prácticas generales, sin fuente específica en esta sesión:
- **Presupuesto de tiempos**:
  - Home → sección: ~600-900 ms en total (anticipación ~120 ms, morph y máscara ~400-600 ms, revelado del contenido ~200 ms).
  - Sección → sección o vuelta a home: más corto (~400-500 ms).
  - Repeticiones dentro de la misma sesión: versión acortada.
  - Intro de primera visita: hasta 2-3 s como máximo, siempre saltable.
- **Saltar**: cualquier clic, tecla (Esc/Enter/Espacio) o scroll durante la animación debe hacer `timeline.progress(1)` (GSAP) o `transition.skipTransition()` (View Transitions). No conviene bloquear la entrada del usuario.
- **Solo la primera visita**: guardar un flag en `sessionStorage` o `localStorage`, siempre envuelto en try/catch. En visitas posteriores, la intro se reduce a un fade corto.
- **prefers-reduced-motion**:
  - Con `gsap.matchMedia()` y `(prefers-reduced-motion: reduce)`, sustituir el morph y la máscara por un cross-fade de ~150-200 ms. En CSS, `@media (prefers-reduced-motion: reduce) { ::view-transition-group(*) { animation: none } }`.
  - Motion ofrece `MotionConfig reducedMotion="user"`.
  - Evitar parallax y zooms grandes en ese modo.
- **Deep links**: `/natacion` cargado directamente debe renderizar el mundo final sin la animación desde la home. La línea aparece ya transformada en el motivo y la animación de "vuelta a home" sigue funcionando en sentido inverso.
- **Accesibilidad durante la transición**:
  - Mover el foco al `<h1>` de la nueva sección y anunciar el cambio de ruta (título del documento).
  - El SVG decorativo de la línea lleva `aria-hidden`; la navegación real son `<a href>` (también para el SEO y para abrir en pestaña nueva).
- **SEO**:
  - Prerenderizar las 6 rutas (home + 5) con títulos y meta propios.
  - Mantener los `<a href>` reales.
  - Cargar en lazy los assets pesados (WebGL, audio de viola) después del primer render.

### Huecos
- No accedí directamente al artículo de NN/g (nngroup.com/articles/animation-duration/); las cifras vienen de fuentes secundarias.
- No verifiqué el estado de 2026 de vite-react-ssg ni el modo prerender de React Router v7 (framework mode `prerender`). Conviene comprobarlo en su documentación oficial antes de elegir.
- No encontré estudios específicos sobre la duración tolerable de intros en portfolios creativos.
