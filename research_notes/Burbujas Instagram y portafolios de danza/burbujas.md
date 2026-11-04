# Transiciones de pantalla con burbujas ("bubble wipe" / "bubble burst") para SVG + GSAP

Nota de método (noviembre 2026): las páginas de tympanus.net (Codrops) devolvieron HTTP 403 a la descarga automática. Eso no significa que estén caídas: los resultados de búsqueda las indexan, pero no pude leer su contenido. Todo lo que digo de ellas sale de los fragmentos del buscador. Las páginas de W3C, web.dev, MDN, la documentación de GSAP y los foros de GSAP sí se leyeron completas.

## 1. ¿Qué sitios, demos de Codrops, CodePens o piezas de GSAP implementan transiciones con burbujas o grupos de círculos, y cómo funcionan?

### Takeaway
No encontré ningún demo publicado que se llame "bubble page transition" y haga exactamente lo pedido: un grupo de burbujas que sube, cubre la pantalla y luego revienta. Hay que combinar tres familias de técnicas que sí están documentadas: (a) overlays/máscaras SVG animados con GSAP para la página (Codrops), (b) el filtro "gooey" de SVG para fundir círculos en una masa líquida, y (c) burbujas que suben con timelines aleatorios en GSAP (CodePen).

### Cited Findings
- **Codrops "Creative Gooey Effects" (Lucas Bebber, 2015).** Aplica un filtro SVG a elementos HTML: primero `feGaussianBlur` desenfoca y luego `feColorMatrix` endurece los bordes, así que los círculos cercanos se fusionan como gotas. El artículo lo describe como experimental y solo para navegadores modernos. — [Codrops](https://tympanus.net/codrops/2015/03/10/creative-gooey-effects/) (403 a la descarga automática; contenido tomado del fragmento del buscador)
- Hay seguimientos de la misma técnica en Codrops: "Gooey Cursor Effect" (2023, filtros SVG más blend modes de CSS) y "Morphing Gooey Text Hover Effect" (2020). — [Gooey Cursor Effect](https://tympanus.net/codrops/2023/06/07/gooey-cursor-effect/); [Morphing Gooey Text Hover](https://tympanus.net/codrops/2020/04/28/morphing-gooey-text-hover-effect)
- Variante sin SVG: el efecto gooey también se logra con CSS `filter: blur(6px) contrast(20);` sobre el contenedor. — [DEV Community](https://dev.to/n3r4zzurr0/creating-gooey-tooltips-for-range-sliders-using-svg-filters-54a7)
- Nadieh Bremer (Visual Cinnamon) documenta el filtro gooey aplicado a círculos SVG en visualizaciones, con gists de código. — [Visual Cinnamon 2015](https://www.visualcinnamon.com/2015/05/gooey-effect/); [Visual Cinnamon 2016](https://www.visualcinnamon.com/2016/06/fun-data-visualizations-svg-gooey-effect/)
- **Codrops "SVG Mask Transitions on Scroll with GSAP and ScrollTrigger" (Hiroki Watanabe, 11 de marzo de 2026).** Muestra revelados con máscara SVG en cuadrícula y en persianas, con celdas escalonadas (stagger) y `viewBox="0 0 100 100"` para trabajar en coordenadas normalizadas. Se activa con el scroll, no al cambiar de ruta, pero la estructura de máscara sirve igual. — [Codrops](https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/) (403; resumen tomado del buscador y de [Abduzeedo](https://abduzeedo.com/svg-mask-transitions-scroll-four-stunning-patterns-gsap-and-scrolltrigger))
- **Codrops "Dynamic Shape Overlays with SVG" (Yoichi Kobayashi, 17 de octubre de 2017).** Overlays SVG a pantalla completa usados como transición o menú. Solo pude confirmar el título y la fecha. — [Codrops, página del autor](https://tympanus.net/codrops/hub/author/yoichi)
- Otros overlays de página en Codrops: "Morphing Page Transition" (2017; un path SVG se transforma en otro mientras la página sube), "Rotated Revealers" (2019) y los sketches 021 y 022 "SVG path page transition" (2022). — [GitHub MorphingPageTransition](https://github.com/thevruno/MorphingPageTransition); [Sketch 021](https://tympanus.net/codrops/sketches/sketch-021-svg-path-page-transition-vertical); [Sketch 022](https://tympanus.net/codrops/sketches/sketch-022-svg-path-page-transition-horizontal); [RotatedRevealers](https://awesome.ecosyste.ms/projects/github.com%2Fcodrops%2FRotatedRevealers)
- **CodePen de snorkltv (Carl Schooff, Creative Coding Club / SnorklTV).** Burbujas que suben con timelines aleatorios de GSAP. Es decorativo, no una transición. — [CodePen snorkltv/abddMGd](https://codepen.io/snorkltv/pen/abddMGd)
- **"Navigation Awesome" de Glenn Hefley.** Un timeline de GSAP (3.3.3) mueve una burbuja de fondo entre los ítems del menú. — [Gist](https://gist.github.com/glennhefley/2a89894c3d69f3ca0392ae43435e91ee)
- En el foro de GSAP, para círculos con `clip-path` se recomienda empezar desde la forma completa, por ejemplo `circle(0% at 50% 50%)` en vez de `circle(0%)`, para que GSAP pueda interpolar. — [GSAP forum 40594](https://gsap.com/community/forums/topic/40594-implement-morphsvg-to-section-reveal/)
- Patrón del staff de GSAP para escalonar círculos SVG: un timeline y un bucle sobre los círculos, usando el índice como desfase. — [GSAP forum 26056](https://greensock.com/forums/topic/26056-svg-stagger-animation/)
- En el foro de GSAP, la combinación habitual para transiciones entre páginas es Barba.js para el enrutado y GSAP/Flip para la animación. — [GSAP tag "transition"](https://gsap.com/community/tags/transition/)
- En motion design, el equivalente comercial es Sapphire **WipeBubble** para After Effects: una cortina entre dos clips con deformación de burbuja, controlada animando "Wipe Percent". — [Documentación Sapphire WipeBubble](https://blog.imagineersystems.com/documentation/sapphire/ae/wipebubble/)

### Inferences
- Arquitectura propuesta: un `<svg>` fijo a pantalla completa (`position: fixed; inset: 0; pointer-events: none`) con dos capas.
  1. **Capa de cobertura:** un `<mask>` o un `<g>` con filtro gooey que contiene unos 20 a 40 círculos grandes. Suben en diagonal (de abajo a la izquierda hacia arriba a la derecha) con `scale` de 0 a 1 más un desfase, y se funden en una masa sólida que tapa la página.
  2. **Capa decorativa:** otros 30 a 60 círculos pequeños, solo con trazo y brillo, que dan el aspecto de "burbuja".
  Con la pantalla cubierta se cambia el contenido; después cada burbuja revienta en orden inverso o aleatorio.
- La diagonal se consigue fácil con GSAP: `stagger: { each: 0.02, from: "end", grid: "auto" }`, o bien ordenando los círculos por `x + (H − y)` y usando ese orden como desfase.
- Lo de fundir los círculos con gooey es una inferencia mía: sin el filtro, cubrir el 100 % de la pantalla con círculos deja huecos salvo que se escalen mucho. Con el filtro, o con un rectángulo de respaldo que entra con opacidad al final, la cobertura queda garantizada.

### Gaps
- No encontré un demo concreto de "bubble wipe" para transición de página en Codrops, CodePen ni la vitrina de GSAP. Tampoco pude abrir CodePen.io directamente: solo apareció en los resultados del buscador.
- No pude leer el código de los artículos de Codrops por el 403. No tengo los valores exactos de `stdDeviation` ni de `feColorMatrix` de Bebber. El valor que suele circular (`stdDeviation="10"`, matriz `0 0 0 18 -7` en alfa) viene de mi memoria, no de una fuente leída. Hay que verificarlo.

## 2. ¿Cómo diseñan los animadores una transición de burbujas convincente?

### Takeaway
No encontré tutoriales de motion design con tiempos en ms o frames para una transición de burbujas. Lo que sí está documentado: en agua, las burbujas grandes suben más rápido que las pequeñas; un estallido real dura milisegundos; y en juegos se estiliza como "crece unos 4 frames y luego estalla en 1 frame mostrando solo fragmentos del borde".

### Cited Findings
- **Velocidad según tamaño:** a viscosidad fija, la velocidad de ascenso crece con el diámetro de la burbuja (mezclas de agua y UCON). — [arXiv 2007.08788](https://arxiv.org/pdf/2007.08788)
- En microburbujas en agua del grifo, la velocidad media de ascenso también crece con el diámetro. — [J-STAGE, Trans. JSME 79(800)](https://www.jstage.jst.go.jp/article/kikaib/79/800/79_701/_article)
- Con turbulencia (burbujas de 1 a 10 mm), las pequeñas suben mucho más lento y las grandes más rápido que en líquido quieto. — [APS DFD 2019](https://meetings-archive.aps.org/dfd/2019/a24/5)
- **Duración real del estallido:** en una grabación a 4.000 fps, el estallido solo duró 0,0025 s, y estallido más caída al suelo, 0,0225 s. — [FlowVis, Team Third Report](https://www.flowvis.org/wp-content/uploads/2019/12/Team_Third_Report.pdf)
- A 50.000 fps, el film de una burbuja grande al reventar parece una "tela" gelatinosa que se retrae. — [PetaPixel](https://petapixel.com/2022/03/15/slow-mo-of-a-bubble-being-popped-from-the-inside/); [DIYPhotography](https://www.diyphotography.net/giant-bubbles-popping-at-50000fps-looks-like-a-weird-gelatinous-transparent-fabric/)
- **Ciclo estilizado de un juego:** la burbuja crece ligeramente a ritmo constante durante 4 frames, y en el frame siguiente aparece mucho más grande y solo con fragmentos del borde. El autor descartó un ciclo realista de 6 frames por demasiado detallado para un efecto de menos de un segundo. — [Uppsala Speldesign, Bubble Popping Animation](https://babel.speldesign.uu.se/?p=827541)
- Hay un tutorial gratuito de líquido y burbujas en After Effects sin plugins (Noble Kreative). No lo pude verificar en detalle. — [Lester Banks](https://lesterbanks.com/2019/08/create-a-great-liquid-and-bubble-effect-in-ae/)

### Inferences
Valores propuestos para el diseño. Salen de los hallazgos anteriores más práctica común; no son datos de una fuente.
- **Distribución de tamaños:** sesgada hacia lo pequeño, por ejemplo `r = rMin + (rMax − rMin) * Math.random() ** 2.5`. Unas pocas burbujas grandes dominan la cobertura y muchas pequeñas dan textura.
- **Velocidad:** proporcional al radio, para que las grandes suban antes y más rápido, como en el agua. Por ejemplo `duration = base * (1.3 − r/rMax * 0.6)`.
- **Bamboleo (wobble):** un desplazamiento horizontal sinusoidal pequeño, de un 5 a 15 % del radio, más un `scaleX`/`scaleY` alterno de ±3 a 6 % con `yoyo: true, repeat: -1, ease: "sine.inOut"`. El periodo debe ser más corto en las burbujas pequeñas.
- **Brillo y borde (rim):** cada burbuja con un `<circle>` de relleno muy transparente o un `radialGradient` (centro transparente, borde más claro) y un trazo fino claro, más una elipse pequeña de highlight arriba a la izquierda. Basta con definir un único `<radialGradient>` en `<defs>` y reutilizarlo con `fill="url(#g)"`.
- **Estallido con overshoot:** `scale` de 1 a 1,15 en unos 80 a 120 ms (`ease: "back.out(3)"` o `"power2.out"`). Luego `scale` a 1,3 y `opacity` a 0 en 60 a 100 ms, opcionalmente con 4 a 6 gotitas (círculos de 1 a 2 px) que salen en radial. Se escalona en 300 a 600 ms en total con `stagger: { each: 0.015, from: "random" }`.
- **Duración total sugerida:** cobertura en 600 a 900 ms, unos 100 a 200 ms de pantalla cubierta para cambiar el contenido, y estallido en 400 a 700 ms. Es una inferencia a partir de la duración típica de transiciones de UI, sin fuente.

### Gaps
- No encontré ningún tutorial de School of Motion ni de YouTube con tiempos concretos para "bubble transition". Casi todos los resultados de "bubble after effects tutorial" eran páginas agregadoras o spam sin contenido verificable.
- No hay fuente sobre "rim lighting" de burbujas en motion design. La receta de gradiente radial es una inferencia.

## 3. Rendimiento en móvil: cuántos círculos SVG animados son seguros, SVG vs canvas vs CSS, transform/opacity, will-change, una máscara vs muchos elementos

### Takeaway
En SVG el coste crece con cada nodo animado. Con cientos de elementos animados aparecen tirones, sobre todo en móvil, y la recomendación del staff de GSAP en ese punto es canvas/WebGL (PixiJS). Para una transición de unos 50 a 100 círculos durante menos de 2 s, SVG es razonable si se anima solo transform/opacity, se limita el filtro (el gooey es caro) y no se abusa de `will-change`.

### Cited Findings
- **Foro GSAP (2017), unos 432 elementos SVG animados:** fluido en una GPU potente, con tirones en un equipo viejo. El diagnóstico fue el número de elementos. Un moderador dijo que SVG solo anima con transforms 2D de forma nativa y que cientos o miles de elementos animados piden Canvas o WebGL. OSUblake (staff de GSAP) propuso un sprite sheet en PixiJS ("un gráfico es mejor que 400+") capaz de mover 10.000 objetos. El hilo es anterior a GSAP 3. — [GSAP forum 17587](https://gsap.com/community/forums/topic/17587-over-400-svg-elements-performance/)
- **Benchmark de Boris Smus:** el rendimiento de SVG cae rápido al crecer el número de objetos, mientras que el de canvas se mantiene casi constante respecto a esa cifra pero empeora con el área de dibujo. Es un estudio antiguo. — [smus.com](https://smus.com/canvas-vs-svg-performance/)
- Un blog sin fuentes sitúa el punto de cambio en unos 200 a 500 elementos animados. Hay que tomarlo como estimación. — [jad-apps guide](https://jad-apps-site.pages.dev/svg-tools/guides/svg-vs-canvas-rendering-performance)
- En Treehouse, alguien reporta que más de 100 elementos animados exportados de Illustrator iban bien en portátil pero con lag en móvil. Es anecdótico. — [Treehouse](https://ads.teamtreehouse.com/community/svg-performance-on-mobile-devices)
- **MDN sobre `will-change`:** debe usarse "as a last resort" para problemas existentes, no para anticiparlos. Abusar de él "can cause the page to slow down" y provoca "excessive memory use". La buena práctica es activarlo y desactivarlo por script antes y después del cambio. — [MDN will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
- Los filtros gooey se basan en `feGaussianBlur` sobre el elemento. Codrops los presenta como experimentales. — [Codrops Creative Gooey Effects](https://tympanus.net/codrops/2015/03/10/creative-gooey-effects/)

### Inferences
- **Presupuesto propuesto para móvil:** de 40 a 80 círculos animados en total. Animar `transform` (x, y, scale) y `opacity` con GSAP, que en SVG escribe el atributo `transform`, y nunca `r`, `cx` ni `cy` por frame.
- **Filtro gooey:** aplicarlo a un solo `<g>` con pocos círculos grandes (de 15 a 25), no a toda la capa decorativa. En móvil, conviene reducir `stdDeviation` o desactivar el filtro con `gsap.matchMedia()` por ancho de pantalla.
- **Una máscara frente a muchos elementos:** si los círculos están dentro de un `<mask>` que recorta un único `<rect>` de color o la imagen de la nueva sección, el navegador compone una sola capa visible. Es más barato que dar a cada burbuja su propio gradiente y su sombra, aunque la máscara se recalcula en cada frame. Hay que medirlo en el Performance panel de Chrome con CPU 4x slowdown.
- **Plan B si en móvil va mal:** un `<canvas>` a pantalla completa que dibuja las burbujas con `arc()`, usando GSAP solo para interpolar un array de objetos (`gsap.to(bubbles, {...onUpdate: draw})`).
- Poner `will-change: transform` solo en el `<svg>` contenedor justo antes de la transición, y quitarlo con `onComplete`.

### Gaps
- No hay benchmarks recientes (2024–2026) y fiables de cuántos círculos SVG animados aguanta un móvil de gama media. Las cifras disponibles son antiguas o anecdóticas.
- No encontré datos medidos del coste de `<mask>` frente a `clip-path` frente a filtro gooey en móvil.

## 4. Accesibilidad: alternativa con prefers-reduced-motion para transiciones a pantalla completa y pautas de destellos/vestibulares (WCAG 2.3.x)

### Takeaway
La transición de burbujas es movimiento no esencial disparado por el usuario, así que le aplica WCAG 2.3.3 (nivel AAA). La técnica suficiente es respetar `prefers-reduced-motion`, que GSAP gestiona de forma nativa con `gsap.matchMedia()`. Además, no debe destellar más de 3 veces por segundo (2.3.1, nivel A). Con muchos estallidos simultáneos de alto contraste hay que cuidarlo.

### Cited Findings
- **WCAG 2.3.3 Animation from Interactions (AAA, desde WCAG 2.1).** Su objetivo es "allow users to prevent animation from being displayed on web pages". El movimiento no esencial puede provocar mareo, náusea y dolor de cabeza en personas con trastornos vestibulares. Uno de sus ejemplos es literalmente una transición de página ("page-flip") que respeta `prefers-reduced-motion` y se desactiva cuando el usuario lo pide. Técnicas suficientes: C39 (CSS `prefers-reduced-motion`), SCR40 (la misma consulta en JavaScript) y Gx (preferencia propia del sitio). Los cambios solo de color u opacidad que no alteran tamaño, posición o profundidad no cuentan como "motion animation". — [W3C Understanding 2.3.3](https://w3c.github.io/wcag/understanding/animation-from-interactions.html)
- **WCAG 2.3.1 Three Flashes or Below Threshold (nivel A).** Nada puede destellar más de 3 veces en un segundo, salvo que esté por debajo de los umbrales de destello general y rojo. Umbral de área: 25 % de un campo visual de 10° (0,006 sr), que equivale a un bloque de referencia de 341×256 px CSS (87.296 px²). Destello general: un par de cambios opuestos de luminancia relativa de 10 % o más, con la imagen más oscura por debajo de 0,80. — [W3C Understanding 2.3.1](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html)
- **web.dev:** con `reduce`, el usuario pide quitar, idealmente, todo movimiento no esencial. Patrón recomendado: tratar la animación como opt-in, aplicándola solo bajo `no-preference`. Se puede escuchar `matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', ...)` para cortar animaciones de JS en caliente. Soporte: Chrome 74, Edge 79, Firefox 63, Safari 10.1. — [web.dev prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion)
- **`gsap.matchMedia()`** acepta condiciones con nombre, por ejemplo `{ reduceMotion: "(prefers-reduced-motion: reduce)" }`. Las animaciones creadas dentro se revierten solas cuando la consulta deja de coincidir, y `gsap.matchMediaRefresh()` permite reaplicarlas si el sitio tiene su propio interruptor de movimiento. — [GSAP docs matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia())
- Las guías de terceros advierten contra una regla global `animation: none`, porque rompe animaciones funcionales como los spinners. Un test automático no puede juzgar si la versión reducida es adecuada; hace falta prueba manual activando "Reducir movimiento" en el sistema operativo. — [TestParty](https://testparty.ai/blog/wcag-2-3-3-animation-from-interactions-2025-guide); [wcag.dock.codes](https://wcag.dock.codes/documentation/wcag233)

### Inferences
- **Alternativa recomendada:** con `reduce`, sustituir las burbujas por un fundido cruzado de opacidad de unos 200 a 300 ms. Según la definición del W3C, los cambios solo de opacidad no son "motion animation". También se puede hacer el cambio instantáneo. Así se conserva la señal de "cambio de sección" sin movimiento.
- **Riesgo de destellos:** si muchas burbujas claras revientan a la vez sobre un fondo oscuro, más de 25 % de un área de 341×256 px podría alternar luminancia varias veces en un segundo. Para evitarlo, escalonar los estallidos al menos en 300 a 600 ms, evitar alternar claro/oscuro más de una vez y usar un contraste moderado (azules medios, no blanco sobre azul marino).
- Durante la transición conviene `pointer-events: none` en el overlay y mantener el foco o moverlo al encabezado de la nueva sección. Es buena práctica general, sin fuente leída en esta investigación.

### Gaps
- El documento de 2.3.3 no trata de forma específica las transiciones a pantalla completa. La aplicación a este caso es una inferencia, aunque su ejemplo de "page-flip" es muy cercano.
- No pude leer el documento Understanding de 2.3.2 (Three Flashes, AAA), que no tiene excepción por umbral.
