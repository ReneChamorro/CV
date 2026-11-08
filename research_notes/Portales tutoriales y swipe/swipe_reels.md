# Navegación vertical tipo reels/TikTok entre páginas en web móvil (React + React Router)

Objetivo: cómo hacer que, en móvil, al llegar al final de una página de sección y seguir deslizando hacia arriba se pase a la siguiente sección (orden circular), y al tirar hacia abajo estando arriba del todo se vuelva a la anterior, con un indicador ("Siguiente: Natación") que se llena mientras se tira.

## 1. Enfoques de implementación: scroll-snap vs. detección de "tirón extra" con touch events; overscroll-behavior, rebote iOS, glow Android, barra de direcciones, umbrales

### Takeaway
Para páginas de sección con contenido de altura variable, scroll-snap de página completa no sirve: `mandatory` hace inalcanzable el contenido más alto que la pantalla. Lo práctico es dejar el scroll nativo y detectar un "tirón extra" en los bordes con `touchstart`/`touchmove`/`touchend` pasivos, aplicando una curva de resistencia y un umbral de unos 60-100 px de recorrido amortiguado. Además hay que neutralizar el pull-to-refresh nativo con `overscroll-behavior-y`, sabiendo que en iOS Safari esto no lo desactiva de forma fiable.

### Cited Findings
**Scroll-snap de página completa**
- Con `scroll-snap-type: y mandatory`, si una sección es más alta que el viewport el lector puede no llegar al contenido que desborda. El borrador del CSSWG dice que el navegador *puede* dejar desplazarse libremente por la sección, pero no lo garantiza. La propuesta de cambio del W3C también advierte que el contenido entre hermanos con snap obligatorio puede volverse inaccesible si es más largo que la pantalla — [CSS Scroll Snap draft](https://drafts.csswg.org/css-scroll-snap/diff); [W3C Change Proposal](https://drafts.csswg.org/css-scroll-snap-1/Proposal)
- WebKit tiene bugs abiertos sobre esto: en un contenedor `mandatory` se pierde la inercia en secciones más altas que el viewport, y el scroll "salta demasiado" al hacer snap a una sección alta — [WebKit bug 253195](https://onbugs.webkit.org/show_bug.cgi?id=253195); [WebKit bug 253196](https://onbugs.webkit.org/show_bug.cgi?id=253196)
- Se recomienda `proximity` cuando la altura del contenido es impredecible, y reservar `mandatory` para hijos de altura controlada — [LogRocket: scroll snap](https://blog.logrocket.com/style-scroll-snap-points-css); [alvarotrigo: why not to use CSS scroll snap](https://alvarotrigo.com/blog/why-not-to-use-css-scroll-snap/)
- WebKit bug 240235 indica que, dentro de un contenedor con scroll-snap, `overscroll-behavior` no impide el overscroll de forma fiable — [WebKit bug 240235](https://bugs.webkit.org/show_bug.cgi?id=240235)

**overscroll-behavior (pull-to-refresh nativo, glow y rebote)**
- `overscroll-behavior` controla qué pasa al llegar al borde de un contenedor de scroll, incluida la página. `auto` permite encadenar el scroll a los ancestros. `contain` corta el encadenamiento pero mantiene los efectos locales (glow en Android, rubber-band en iOS); en `html` también impide la navegación por overscroll. `none` hace lo mismo que `contain` y además elimina los efectos locales — [Chrome for Developers: overscroll-behavior](https://developer.chrome.com/blog/overscroll-behavior)
- Para desactivar el pull-to-refresh nativo de Chrome basta `overscroll-behavior-y: contain` en `body`/`html`; `none` quita además el glow. El artículo implementa un pull-to-refresh propio con listeners `touchstart`/`touchmove` registrados con `{passive: true}` y explica que los hacks antiguos con listeners no pasivos bloqueaban el scroll y empeoraban el rendimiento — [Chrome for Developers: overscroll-behavior](https://developer.chrome.com/blog/overscroll-behavior)
- Soporte según caniuse: Safari iOS 16.0+ (desactivado por defecto en 14.5-15.8), Firefox 59+, Chrome Android actual — [caniuse: css-overscroll-behavior](https://caniuse.com/css-overscroll-behavior)
- **Pero en iOS Safari** `overscroll-behavior: none` o `contain` NO desactiva el pull-to-refresh nativo. El bug 275947 se abrió el 2024-06-27 (iOS 16) y un ingeniero de WebKit confirmó el mismo comportamiento en la beta de iOS 18: "I do not know if this is a bug or intentional behavior". Cuando se consultó, seguía en estado NEW, sin asignar — [WebKit bug 275947](https://bugs.webkit.org/show_bug.cgi?id=275947)
- Hay opiniones contradictorias: un foro de Ionic afirma que desde Safari 16 ya se puede suprimir el rebote con `overscroll-behavior` — [Ionic forum](https://forum.ionicframework.com/t/how-to-prevent-bounce-elastic-scroll-in-ios-prior-to-v16/235561). El bug de WebKit indica que no cubre el pull-to-refresh.

**Listeners táctiles pasivos y preventDefault**
- Desde Chrome 56, los listeners `touchstart`/`touchmove` en `window`, `document` o `body` se tratan como `passive: true` por defecto, y en ellos `preventDefault()` se ignora con un aviso en DevTools. Chrome recomienda no depender de `preventDefault()` en esos eventos; Mobile Safari sí lo sigue necesitando — [Chrome: scrolling intervention](https://developer.chrome.google.cn/blog/scrolling-intervention?hl=en)
- Firefox y Chrome difieren: en Firefox, cancelar el primer `touchmove` cancela todo el gesto, y en Chrome no — [Mozilla bug 1353496](https://bugzilla.mozilla.org/show_bug.cgi?id=1353496)
- Si hay que cancelar el gesto, se puede registrar el listener con `{ passive: false }` o poner `touch-action: none` en el elemento — [John Kavanagh: passive listeners](https://johnkavanagh.co.uk/articles/improving-scroll-performance-with-passive-event-listeners/); [Tencent Cloud](https://cloud.tencent.cn/developer/article/1671030)

**Umbrales y curvas de resistencia de librerías pull-to-refresh**
- pulltorefresh.js (BoxFactura): `distThreshold: 60` (distancia mínima para disparar), `distMax: 80` (máximo que se puede estirar), `distReload: 50` (altura que se queda tras soltar), `distIgnore: 0`, `refreshTimeout: 500` ms, `resistanceFunction: t => Math.min(1, t / 2.5)` y `shouldPullToRefresh: !window.scrollY`; para otro contenedor de scroll se sugiere `!this.mainElement.scrollTop`. Tiene `setPassiveMode(isPassive)` — [pulltorefresh.js README](https://github.com/BoxFactura/pulltorefresh.js)
- react-simple-pull-to-refresh: `pullDownThreshold: 67`, `maxPullDownDistance: 95`, `resistance: 1`, `fetchMoreThreshold: 100`, `isPullable: true` — [react-simple-pull-to-refresh](https://github.com/thmsgbrt/react-simple-pull-to-refresh)
- GSAP Observer unifica wheel/touch/pointer: acumula deltas en cada frame (rAF) y dispara `onUp`/`onDown`/`onDrag`. Opciones relevantes: `tolerance` (px mínimos antes de disparar callbacks), `dragMinimum`, `lockAxis`, `onStop` (0,25 s por defecto), `wheelSpeed`. Su demo de secciones a pantalla completa usa `tolerance: 10`, `preventDefault: true`, índice circular (wrap) y una bandera `animating` que bloquea transiciones mientras dura la actual. Esa demo NO usa scroll nativo — [GSAP Observer docs](https://gsap.com/docs/v3/Plugins/Observer/)

**Barra de direcciones / viewport**
- En móvil el área visible cambia cuando se muestran u ocultan las barras del navegador, y `100vh` puede quedar más alto que lo visible. `svh` corresponde a la barra expandida, `lvh` a la barra retraída y `dvh` se adapta entre ambos, aunque no se actualiza a 60 fps. Están soportadas en Chrome 108+, Safari y Firefox — [web.dev: viewport units](https://web.dev/blog/viewport-units)
- `scrollend` ya es Baseline: Chrome/Edge 114, Firefox 109 y Safari 26.2 (diciembre de 2025). En versiones antiguas se detecta con `'onscrollend' in window` y se recurre a un temporizador — [InfoQ: Safari scrollend](https://www.infoq.com/news/2026/04/safari-scrollend-support); [Chrome: scrollend](https://developer.chrome.com/blog/scrollend-a-new-javascript-event?hl=de)

### Inferences
- **Enfoque recomendado para este CV:** mantener el scroll nativo de cada página (las secciones tienen galerías y contenido largo) y añadir un hook `useEdgePull` con esta lógica:
  1. En `touchstart` (pasivo), anotar `startY` y si se está "en borde": arriba si `scrollY <= 0`; abajo si `scrollY + innerHeight >= scrollHeight - 2`. Usar un margen de 1-2 px por el redondeo subpíxel y por los cambios de altura de la barra de direcciones.
  2. En `touchmove` (pasivo), si se estaba en borde y el dedo sigue en la dirección del borde, calcular `raw = |dy|` y una distancia amortiguada con resistencia: `pull = raw / 2.5`, o una curva tipo `max * (1 - exp(-raw/k))`. Con eso, `progress = min(1, pull / threshold)`.
  3. En `touchend`, si `progress >= 1`, navegar; si no, animar el indicador de vuelta a 0.
  - Como valores de partida, tomando como referencia las librerías: umbral efectivo de 60-80 px *después* de la resistencia, lo que equivale a unos 150-200 px de dedo con `t/2.5`. Para cambiar de página conviene un umbral más alto que para un refresh (es más disruptivo). Ajustar en dispositivo real.
- **Exigir un gesto nuevo en el borde:** solo armar el tirón si al *empezar* el toque ya se estaba en el borde (o tras un breve `scrollend` en el borde). Así un fling con inercia que llega al final no dispara la navegación. Es la defensa principal contra activaciones accidentales.
- **CSS recomendado:** `html, body { overscroll-behavior-y: none; }` (o `contain` si se quiere conservar el glow). Evita que Chrome Android haga su pull-to-refresh al tirar hacia abajo arriba del todo, que chocaría con "ir a la anterior". En iOS Safari el pull-to-refresh nativo y el rebote pueden seguir apareciendo (bug 275947). Por eso conviene que en iOS el gesto hacia abajo tenga un umbral mayor o que el indicador del "anterior" se muestre de forma que conviva con el rebote.
- **Durante el rebote de iOS**, `scrollY` puede ser negativo arriba o superar el máximo abajo, y `touchmove` sigue llegando. Basta con usar el delta del dedo, no `scrollY`, para medir el tirón (inferencia razonada, sin verificar con una fuente).
- **No hace falta `preventDefault`:** con listeners pasivos y el scroll nativo intacto, el indicador es un overlay `position: fixed` que se actualiza en paralelo. Así se evitan las divergencias Chrome/Firefox/Safari en torno a `preventDefault`.
- Usar `100svh`/`100dvh` (no `100vh`) en cualquier contenedor de altura de pantalla del indicador o de la transición.
- GSAP Observer es una alternativa si se quisieran "slides" sin scroll nativo, pero ese modelo (con `preventDefault: true`) es justo el scrolljacking completo que se quiere evitar para páginas con contenido largo.

### Gaps
- No encontré documentación oficial de Apple/WebKit sobre si el pull-to-refresh de iOS Safari se puede desactivar desde CSS en iOS 26; el bug 275947 sigue sin resolver según la última consulta.
- No verifiqué con una fuente específica el comportamiento de `visualViewport` (eventos `resize`/`scroll` al ocultarse la barra) en este caso; solo está documentado el lado de las unidades `svh`/`dvh`/`lvh`.
- No encontré valores "estándar" de umbral para *cambiar de página* (frente a refrescar); los números que doy se extrapolan de librerías de pull-to-refresh.
- No encontré la distancia o resistencia exacta que usa el pull-to-refresh nativo de Chrome o Safari.

## 2. Ejemplos de webs/apps con "sigue haciendo scroll para ir al siguiente artículo/proyecto"

### Takeaway
El patrón existe en dos familias. Una es el "infinite next-article" de medios: el siguiente artículo se carga debajo y se actualiza la URL con `history.pushState`. La otra son los portfolios premiados en Awwwards con transiciones "next project" en el footer, normalmente hechas con GSAP + Barba.js. No encontré documentación técnica detallada de casos concretos; las fichas de Awwwards solo enseñan vídeo.

### Cited Findings
- **Infinite next-article (medios):** se carga el siguiente artículo al hacer scroll, se cambia la URL con `history.pushState` sin recargar y se registra una página vista. Google recomienda que cada artículo cargado tenga su propia URL rastreable — [Stickyeyes: infinite scroll y SEO](https://stickyeyes.com/2016/11/15/how-to-ensure-that-infinite-scroll-doesnt-cost-you-search-visibility/); [Google Search Central: infinite scroll search-friendly](https://developers.google.com/search/blog/2014/02/infinite-scroll-search-friendly?hl=ja)
- La librería Infinite Scroll tiene la opción `history: 'push'`, que usa `history.pushState()` para cambiar URL e historial — [Infinite Scroll (paulirish)](https://socket.dev/go/package/github.com/paulirish/infinite-scroll)
- Problemas señalados: el lector puede pasarse sin querer al siguiente artículo y copiar o compartir la URL equivocada, y Search Console ha marcado artículos apilados como "too long" — [Builtin: infinite scroll pros y contras](https://builtin.com/articles/infinite-scroll); [Moz Q&A](https://mozdev.nodebb.com/community/q/post/59735)
- **Awwwards "Next Project Transition" (Dave Holloway):** elemento hecho con GSAP; la ficha no detalla la mecánica — [Awwwards](https://www.awwwards.com/inspiration/next-project-transition-dave-holloway)
- **Tim Ogundipe, "Selected works -> project transition":** GSAP + Barba.js + Webflow, con interacción "next project" — [Awwwards](https://www.awwwards.com/inspiration/selected-works-project-transition-tim-ogundipe-25)
- **Julian Fella, portfolio:** transición de página con Barba.js + GSAP + SVG y un elemento "Footer Scroll" — [Awwwards](https://www.awwwards.com/inspiration/page-transition-julian-fella-portfolio)
- **Pacôme Pertant, "Footer Scroll Transition"** (crédito: Louis Bocquet): transición desde el footer — [Awwwards](https://www.awwwards.com/inspiration/footer-scroll-transition-pacome-pertant-portfolio)
- **Framer "Next Page on Scroll":** componente de pago que muestra la siguiente página con imagen de fondo, texto animado e *indicador de progreso*, y navega automáticamente — [Framer Marketplace](https://www.framer.com/marketplace/components/next-page-on-scroll/)
- **Codrops FullscreenScroll:** slideshow de pantalla completa basado en GSAP Observer (scroll bloqueado y avance por gesto) — [Codrops FullscreenScroll (mirror)](https://gitee.com/mirrors_codrops/FullscreenScroll)
- Un devlog de portfolio cuenta que los triggers del footer chocaban con un pin de GSAP ScrollTrigger (el pin añadía un 300 % de scroll y los triggers saltaban antes de tiempo). Se arregló ordenando los ScrollTriggers en orden de documento y llamando a `refresh` — [Stardance devlog](https://stardance.hackclub.com/projects/26680)
- Un hilo de CSS-Tricks pide cómo hacer una transición de "empuje" entre secciones como la de Booz Allen, no una animación de scroll normal — [CSS-Tricks](https://css-tricks.com/?p=239507)

### Inferences
- El "next project" de los portfolios Awwwards suele ser así: un bloque al final de la página con el título del siguiente proyecto y una barra o círculo que se llena con el scroll en escritorio (o con el tirón en móvil). Al completarse se lanza la transición (Barba/GSAP o, en React, View Transitions). Encaja con el diseño pedido: "Siguiente: Natación" + barra que se llena.
- Ese bloque final también sirve como **alternativa pulsable**: el título "Siguiente: Natación" debe ser un `<Link>` real.

### Gaps
- No pude ver el código ni el comportamiento exacto en móvil de los ejemplos de Awwwards; sus fichas solo tienen vídeo.
- No encontré casos documentados de medios concretos (NYT, Guardian, etc.) con su implementación actual de next-article en 2026.
- No encontré un tutorial de Codrops específico de "pull-to-advance" en el footer.

## 3. Accesibilidad y riesgos UX

### Takeaway
El gesto no debe ser la única vía. Hace falta un enlace o botón pulsable "Siguiente: X" / "Anterior: Y", usable con teclado y lector de pantalla (WCAG 2.5.1 y 2.5.7). También hay que evitar el scrolljacking completo: según NN/g desorienta y daña el control del usuario. La transición debe respetar `prefers-reduced-motion`, y conviene decidir a conciencia cómo queda el historial (push y no replace, para que "Atrás" funcione como se espera).

### Cited Findings
- En los tests de usabilidad de NN/g, los sitios con scrolljacking amenazan el control y la libertad del usuario, la descubribilidad, la atención, la eficiencia y el éxito en la tarea. En una página, *todos* los participantes se desorientaron; algunos creyeron que se les había roto la rueda del ratón y otros recargaron o abandonaron la página — [NN/g: Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- NN/g: se tolera mejor cuando sirve para revelar información de forma progresiva y cuando hacen falta pocas interacciones de scroll para ver un cambio. Los usuarios centrados en una tarea toleran menos que los que navegan por curiosidad — [NN/g: Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- El scrolljacking dificulta la navegación, sobre todo con tecnologías de apoyo — [Webflow accessibility checklist](https://webflow.com/accessibility/checklist/task/avoid-scrolljacking); [SitePoint: Scrolljacking and Accessibility](https://www.sitepoint.com/scrolljacking-accessibility/)
- WCAG 2.2, SC 2.5.7 (AA): lo que funciona arrastrando debe tener un modo con un solo puntero sin arrastre, salvo que el arrastre sea esencial. Los gestos que dependen de la trayectoria, como los swipes, caen en SC 2.5.1 (Pointer Gestures), y la alternativa no puede ser otro swipe o flick. Teclado y puntero único se evalúan por separado — [W3C Understanding 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements)
- React Router: `navigate(to, { replace: true })` "will remove the current entry in the History stack, replacing it with a new one". Sin `replace`, se añade una entrada nueva. `viewTransition` en `navigate` está **deprecado** en favor del componente `<ViewTransition>` de React — [React Router: useNavigate](https://reactrouter.com/api/hooks/useNavigate)
- La demo de GSAP Observer no gestiona el teclado y pone `user-select: none` en todo, así que bloquea la selección de texto — [GSAP Observer docs](https://gsap.com/docs/v3/Plugins/Observer/)

### Inferences
- **Alternativa explícita (obligatoria):** al final de cada página, un bloque `<nav aria-label="Secciones">` con `<Link to="/natacion">Siguiente: Natación</Link>` y, arriba, "Anterior: …". El indicador que se llena es solo decorativo (`aria-hidden="true"`) y el enlace lleva la semántica.
- **Lectores de pantalla:** VoiceOver/TalkBack usan gestos propios (deslizar con tres dedos para hacer scroll) y no generan el `touchmove` esperado. Por eso el gesto no les sirve y depende del enlace. No hay que bloquear el scroll nativo ni el foco.
- **Al navegar,** mover el foco al `<h1>` de la nueva página (o anunciarlo con una región `aria-live`) para que el lector de pantalla note el cambio de ruta. Es una práctica habitual en SPA; no la verifiqué en una fuente durante esta investigación.
- **Teclado:** no secuestrar `Space`/`PageDown` al final de la página; basta con que los enlaces sean tabulables. Si se añaden atajos, que sean opcionales.
- **Activaciones accidentales:** (a) exigir que el toque *empiece* en el borde; (b) umbral alto con resistencia; (c) cancelar si el gesto se invierte antes de soltar; (d) bloquear un nuevo disparo durante la transición (como la bandera `animating` de GSAP); (e) ignorar gestos con más de un dedo o con mucho desplazamiento horizontal (bloqueo de eje, como `lockAxis`).
- **Orden circular:** ir de la última a la primera puede desorientar. El texto "Siguiente: Natación" lo deja claro antes de soltar, así que conviene mostrar siempre el destino.
- **Historial:** usar `navigate(next)` (push) para que "Atrás" vuelva a la sección anterior visitada, como en cualquier enlace. Con `replace`, "Atrás" sacaría al usuario del sitio y rompería la expectativa. Gestionar la posición de scroll: al entrar por gesto "siguiente", empezar arriba; al entrar por gesto "anterior", quizá empezar abajo del todo (estilo reels). Al volver con "Atrás", restaurar la posición guardada (`<ScrollRestoration>` en modo Data/Framework).
- **`prefers-reduced-motion: reduce`:** sustituir el deslizamiento a pantalla completa por un fundido corto o por un cambio directo, y mantener el indicador de progreso, que es retroalimentación funcional y no decoración.

### Gaps
- No obtuve una fuente específica fetchada sobre `prefers-reduced-motion` (MDN) ni sobre WCAG 2.3.3 (Animation from Interactions); las recomendaciones se basan en conocimiento general.
- No encontré estudios de usabilidad específicos sobre "pull-to-next-page" en la web móvil, solo sobre scrolljacking en general (NN/g).

## 4. Rendimiento: handlers de touchmove y animación del indicador

### Takeaway
Hay que registrar los listeners táctiles como pasivos, no tocar el layout en `touchmove`, guardar solo el último delta y pintar una vez por frame con `requestAnimationFrame`. El indicador se anima solo con `transform` (por ejemplo `scaleX` en la barra) y `opacity`, y sin re-render de React por cada evento: se usan refs y se escribe directamente en `style`.

### Cited Findings
- Los listeners táctiles no pasivos bloquean el scroll y degradan el rendimiento; `overscroll-behavior` y los listeners `{passive: true}` evitan ese problema — [Chrome for Developers: overscroll-behavior](https://developer.chrome.com/blog/overscroll-behavior)
- Chrome trata como pasivos por defecto los listeners `touchstart`/`touchmove` en `window`/`document`/`body` para que el scroll táctil sea rápido — [Chrome: scrolling intervention](https://developer.chrome.google.cn/blog/scrolling-intervention?hl=en)
- `passive` solo debe usarse cuando el handler nunca llama a `preventDefault()` — [John Kavanagh: passive listeners](https://johnkavanagh.co.uk/articles/improving-scroll-performance-with-passive-event-listeners/)
- GSAP Observer acumula deltas durante cada tick de `requestAnimationFrame` y procesa el mayor, en vez de reaccionar a cada evento — [GSAP Observer docs](https://gsap.com/docs/v3/Plugins/Observer/)
- Las unidades `dvh` no se actualizan a 60 fps, así que no conviene depender de ellas para animaciones ligadas al gesto — [web.dev: viewport units](https://web.dev/blog/viewport-units)

### Inferences
- **Patrón:**
  ```js
  // en touchmove (passive): solo guardar dato
  latestDy = e.touches[0].clientY - startY;
  if (!rafId) rafId = requestAnimationFrame(paint);
  // paint(): calcular progress y escribir estilos sin React state
  barRef.current.style.transform = `scaleX(${progress})`;
  ```
  Usar `transform-origin: left` y `will-change: transform` solo mientras se arrastra. Solo se hace `setState` en `touchend` (navegar o volver) o al cruzar el umbral (cambiar el texto a "Suelta para ir a Natación").
- No leer `scrollHeight`/`getBoundingClientRect` en cada `touchmove`: leerlos en `touchstart` y cachearlos, para evitar layouts forzados.
- La transición entre rutas puede hacerse con la View Transitions API (vía `<ViewTransition>` de React, ya que la opción `viewTransition` de React Router está deprecada) o con una animación de `transform: translateY` sobre un overlay. En ambos casos, solo propiedades compuestas.
- Hacer `preload` o `import()` anticipado del chunk de la siguiente ruta cuando `progress > 0.5`, para que la navegación sea instantánea al soltar.
- Opcional: `navigator.vibrate(10)` al cruzar el umbral (solo Android; iOS Safari no lo soporta). No verificado en esta investigación.

### Gaps
- No obtuve mediciones concretas (ms por frame, INP) de handlers de `touchmove` en móviles de gama baja.
- No verifiqué con una fuente fetchada el soporte actual de `<ViewTransition>` de React ni de las View Transitions cross-document en iOS Safari a noviembre de 2026.
