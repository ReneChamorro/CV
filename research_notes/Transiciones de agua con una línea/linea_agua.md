# Transiciones de agua con una sola línea (SVG + GSAP/CSS) — referencia para "Natación"

Contexto: hoy la transición de Natación sube el agua con una superficie inclinada y unas 40 burbujas, y se siente recargada. La idea es algo más simple, una línea que se vuelve ola, se calma y se abre en corcheras, parecido a la transición de Música, donde una línea se abre en el pentagrama.

## 1. Ejemplos concretos (Codrops, CodePen, GSAP, Awwwards): línea → ola, llenado de agua, línea que se divide, oleaje amortiguado

### Takeaway
No apareció ningún ejemplo publicado que haga exactamente "línea → ola → corcheras". La referencia más cercana es el "Jump Loader" de Codrops: una línea que hace de superficie de líquido. Las demás piezas existen por separado: demos de ola sinusoidal, llenado con clip-path, transiciones de página con path SVG y el stagger de GSAP. Hay que combinarlas.

### Cited Findings
- **Codrops "Jump Loader" (2015):** un loader SVG con una línea que salta fuera de un líquido y se vuelve a zambullir. Usa DrawSVGPlugin de GSAP y clona la línea invertida para hacer un reflejo. Es lo más cercano a "una línea que es superficie de agua". Al intentar abrir el artículo, el sitio devolvió 403, así que los detalles salen solo del resumen del buscador. — [Codrops](https://tympanus.net/codrops/2015/03/25/jump-loader-animation-svg-gsap)
- **Codrops Sketch 021 / 022:** transiciones de página (vertical y horizontal) hechas con un path SVG animado, de Manoela Ilic. Sirven de base para "la superficie barre la pantalla". — [Codrops Sketch 021](https://tympanus.net/codrops/sketches/sketch-021-svg-path-page-transition-vertical)
- **Codrops "Morphing Page Transition" (2017):** un path SVG se transforma en otro mientras la página sube. El código está en GitHub (codrops/morphingpagetransition). — [Codrops](https://tympanus.net/codrops/2017/08); [repo](https://awesome.ecosyste.ms/projects/github.com%2Fcodrops%2Fmorphingpagetransition)
- **Codrops (mayo 2025), "From SplitText to MorphSVG: 5 Creative Demos Using Free GSAP Plugins":** demos de MorphSVG ahora que es gratuito. — [Codrops](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/)
- **Foro GSAP, "Best approach to animate a wavy line":** se proponen dos caminos. El primero es "crear dos formas y hacer morph entre ellas", que el moderador llama la solución más simple. El segundo es escribir el path a mano y actualizar puntos individuales por código, con más control pero más difícil. Remiten al tutorial de Chris Gannon (https://codepen.io/chrisgannon/pen/KKpzMJd), y el ejemplo funcional del usuario está en https://codepen.io/mrjonoces/pen/eYXQOBq. — [GSAP forum](https://gsap.com/community/forums/topic/39854-best-approach-to-animate-a-wavy-line/)
- **CodePen de Andria Dev, "How To Animate A Wave SVG":** la ola se arma con curvas Bézier cuadráticas y se desplaza en horizontal con un keyframe CSS (translate en x, infinito, lineal). — [CodePen](https://codepen.io/andria_dev/pen/xWoXNG)
- **Gist de CodeMyUI:** un `<path>` de ola dentro de un `<symbol>`, reutilizado en dos capas que se mueven a velocidades distintas. El path es cerrado: borde superior ondulado y relleno hacia abajo, es decir, "agua". — [Gist](https://gist.github.com/CodeMyUI/c59acee39a10300d5e09628d3914e2a8)
- **fill-water-animation (coiger):** llena un círculo de agua solo con CSS (background-position + clip-path) y usa duraciones en números primos para que las olas no vayan sincronizadas. — [GitHub](https://github.com/coiger/fill-water-animation)
- **"Chillwave" de Varun Vachhar:** genera por JS una ola tipo seno con una curva `c` y luego segmentos `s`, que reflejan el control anterior para mantener la pendiente continua. La constante m ≈ 0.5123 aproxima un seno con Bézier cúbicas. La ola se mueve con `translate3d` en CSS, el path es más largo que el canvas y el SVG lleva `overflow: hidden`. — [varun.ca](https://varun.ca/chillwave/)
- **SuperHi:** ola por JS con unos 500 puntos (uno por píxel), `y = sin(x/20)·100 + 200`, path `M`/`L` reescrito en cada `requestAnimationFrame` con un desfase T. El artículo no habla de rendimiento. — [SuperHi](https://library.superhi.com/posts/how-to-draw-and-animate-an-svg-wave-using-javascript)
- **"Elastic Line" de Daniel Petho (React/Framer Motion):** una línea SVG hecha con una curva cuadrática de 2+1 puntos. El cursor arrastra el punto de control y un spring lo devuelve al centro (stiffness 300, damping 30). Es exactamente la mecánica de "línea que se deforma y se calma". — [21st.dev](https://21st.dev/@danielpetho/components/elastic-line.md)
- **Línea que se divide en varias:** solo encontré un hilo del foro GSAP que pide lo mismo (texto que va por un path compartido y se separa en tres "carriles"), sin respuesta publicada. La documentación de DrawSVG recomienda paths de un solo segmento y muestra `stagger` para dibujar muchos trazos con un solo tween. — [GSAP forum](https://gsap.com/community/topic/19926-stagger-multiple-objects-same-class-at-once-and-not-one-by-one/?do=embed); [DrawSVGPlugin docs](https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/)

### Inferences
- Para "una línea que se divide en N corcheras" lo más simple es superponer N paths idénticos en la misma `y` y luego separarlos con `y` (transform) y `stagger: {from: 'center'}`. Así se reutiliza el mismo patrón del pentagrama de Música, que es justamente la coherencia que se busca.
- El "Elastic Line" (una cuadrática, un punto de control con spring) es probablemente el modelo mínimo más satisfactorio: una sola curva que se hunde, rebota y queda recta.

### Gaps
- No encontré sitios de Awwwards ni del showcase de GSAP con esta transición exacta (línea → agua → corcheras). Las búsquedas no devolvieron candidatos verificables.
- No pude leer el artículo completo del Jump Loader (403), así que no tengo sus duraciones ni sus eases.

## 2. Técnicas para una ola suave: seno con amplitud que decae, número de puntos, ticker vs. MorphSVG, eases elásticos, 60 fps en móvil

### Takeaway
Hay dos caminos válidos:
- **A) Path calculado en cada frame** (`gsap.ticker` o rAF) con `y = A·e^(−t/τ)·sin(kx − ωt)`, usando pocos puntos unidos con Bézier.
- **B) Un solo punto de control (o 2 o 3) animado con un ease elástico o CustomWiggle**, o un morph entre dos formas.

B es más simple y más barato. A da un oleaje más "físico". En los dos casos, el relleno del agua debería moverse con transform y no reescribiendo geometría.

### Cited Findings
- Morph entre dos formas = "la solución más simple". Actualizar puntos por código = máximo control. — [GSAP forum](https://gsap.com/community/forums/topic/39854-best-approach-to-animate-a-wavy-line/)
- Desde GSAP 3.13 todo GSAP es 100 % gratis, incluidos todos los plugins bonus (MorphSVG, SplitText, etc.), también para uso comercial, gracias a Webflow. Ahora vienen en el paquete npm principal. — [GSAP blog 3.13](https://gsap.com/blog/3-13/)
- **CustomWiggle** extiende CustomEase:
  - `wiggles` es el número de oscilaciones (por defecto 10).
  - `type` puede ser `easeOut` (por defecto), `easeInOut`, `anticipate`, `uniform` o `random`.
  - `amplitudeEase` controla cómo baja la amplitud de 1 a 0. `timingEase` controla cómo se reparten las ondas en el tiempo.
  - La fuerza la da el valor del tween (p. ej. `rotation: 30`).
  - Ejemplo: `CustomWiggle.create("myWiggle",{wiggles:6}); gsap.to(el,{duration:2, rotation:30, ease:"myWiggle"})`, o en string, `ease:"wiggle({type:anticipate, wiggles:8})"`.
  - Ojo: el wiggle oscila alrededor del valor de partida. Para que una línea se calme hay que animar el desplazamiento del punto de control con este ease. — [GSAP CustomWiggle docs](https://gsap.com/docs/v3/Eases/CustomWiggle)
- `elastic.out` de GSAP es un overshoot "springy" con parámetros de amplitud y período, p. ej. `"elastic.out(1, 0.3)"`. — [resumen de easing GSAP](https://skills.sh/microck/gsap-skills/gsap-easing)
- **Fórmula de spring subamortiguado** (estilo WebKit spring.js), para un ease JS propio:
  - frecuencia natural: `w0 = √(stiffness/mass)`
  - razón de amortiguamiento: `ζ = damping / (2·√(stiffness·mass))`
  - si ζ < 1, la salida es `1 − e^(−ζ·w0·t)·(…cos + …sin)`, con frecuencia amortiguada `wd = w0·√(1−ζ²)`
  - con ζ = 1 (amortiguamiento crítico) no hay rebote — [GitHub MysteryPancake easing4.js](https://github.com/MysteryPancake/After-Effects-Fun/blob/master/expressions/easing4.js)
- Para actualizar cuadro a cuadro conviene un integrador por pasos (razón de amortiguamiento + frecuencia) en vez de una forma cerrada. — [Gist Fraktality](https://gist.github.com/Fraktality/1033625223e13c01aa7144abe4aaf54d)
- **Springs en CSS:** se pueden aproximar con `linear()` (Chrome 113, Edge 113, Firefox 112). El generador de Jake Archibald y Adam Argyle convierte un ease JS/SVG (presets Spring, Bounce, Simple elastic) en `linear()`. — [Chrome for Developers](https://developer.chrome.com/docs/css-ui/css-linear-easing-function); [linear-easing-generator](https://github.com/jakearchibald/linear-easing-generator)
- Josh Comeau sobre springs:
  - Los parámetros son masa, tensión (stiffness) y fricción (damping). Con fricción 0 el resorte oscila para siempre; con fricción alta el movimiento es suave y sin rebote.
  - Su sandbox usa por defecto masa 1.75, tensión 200 y fricción 12.
  - Recomienda springs para movimiento, no para color u opacidad.
  - Los springs JS pueden trabarse si el hilo principal está ocupado. — [Josh Comeau](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)
- **Rendimiento:**
  - Animar `transform` y `opacity` evita layout y paint (solo composite). Objetivo: 60 fps.
  - Las animaciones CSS/WAAPI corren aceleradas por hardware aunque el hilo principal esté ocupado. Las basadas en rAF no. — [Emil Kowalski](https://emilkowal.ski/ui/great-animations)
- Con el método SuperHi (≈500 puntos, `d` reescrito en cada frame) el costo crece con el número de puntos. — [SuperHi](https://library.superhi.com/posts/how-to-draw-and-animate-an-svg-wave-using-javascript)
- Con el método Chillwave (path largo generado una vez y movido con `translate3d`) no se recalcula la geometría. — [varun.ca](https://varun.ca/chillwave/)
- Una curva de 2+1 puntos (cuadrática) alcanza para una línea elástica creíble. — [21st.dev Elastic Line](https://21st.dev/@danielpetho/components/elastic-line.md)

### Inferences
- **Receta mínima recomendada (inferencia, no hay fuente única):**
  1. Una sola línea `<path d="M0,y Q w/2,y w,y">`.
  2. Se anima solo la `y` del punto de control: baja unos 20–40 px y luego vuelve con `elastic.out(1, 0.35)` o con un CustomWiggle `easeOut` de 3–4 oscilaciones.
  3. Debajo, un `<rect>` de agua que sube con `scaleY` o `translateY` (transform) y se recorta con `clipPath` usando el mismo path, o simplemente queda debajo de la línea.
  4. Al terminar, la línea se clona en N corcheras.
- **Si se quiere una ola sinusoidal amortiguada de verdad:** calcular 8–16 puntos, no 500, y unirlos con Bézier tipo Catmull-Rom o los segmentos `s` de Chillwave. Aplicar `A(t) = A0·e^(−t/τ)` con τ ≈ 250–400 ms y cortar el ticker (`gsap.ticker.remove`) cuando A < 0.5 px, para no gastar CPU con la ola ya quieta. Escribir `d` una vez por frame en un solo path es barato en la práctica, pero no es una animación de composite.
- Las burbujas (40 elementos) y la superficie inclinada son probablemente lo que da sensación de "ocupado". Reducir a una sola línea y un solo relleno va en línea con la regla de Emil de animar solo lo que aporta información.

### Gaps
- No encontré mediciones publicadas de fps comparando "reescribir `d` por frame" frente a "MorphSVG" en móviles. Lo de arriba es razonamiento, no un benchmark.
- No encontré una fuente que recomiende un número exacto de puntos para una ola suave. Los ejemplos van de 2+1 puntos (cuadrática) a unos 500 (uno por píxel).

## 3. Cómo hacerla "satisfactoria": anticipación, overshoot y asentamiento, tiempos por fase, stagger desde el centro

### Takeaway
Los ingredientes con respaldo son:
- curvas `ease-out` para entradas;
- springs o elastic con amortiguamiento moderado para el asentamiento;
- `stagger: { from: 'center' }` en GSAP para abrir líneas paralelas desde el medio, como el pentagrama.

Las duraciones de UI recomendadas (<300 ms) son para interacciones frecuentes. Una transición de sección artística puede durar más, aunque no encontré una fuente primaria con números para ese caso.

### Cited Findings
- **Stagger de GSAP:**
  - `stagger: { each: 0.1 }` o `{ amount: 1 }` (no ambos);
  - `from: 'center' | 'edges' | 'start' | 'end' | 'random' | índice`;
  - `ease` reparte los tiempos de inicio (p. ej. `'power2.inOut'`).
  - Por defecto `from: 0`. — [GSAP Staggers](https://gsap.com/docs/v3/Staggers/)
- **Emil Kowalski:**
  - Las animaciones de UI suelen convenir por debajo de 300 ms; 500 ms ya es lento para acciones repetidas.
  - `ease-out` da respuesta "snappy"; `ease` da un movimiento más elegante y lento.
  - Hay que animar solo cuando aporta información y pensar en cuán seguido se ve la animación.
  - Las animaciones deben poder interrumpirse. — [emilkowal.ski](https://emilkowal.ski/ui/great-animations)
- **Fuentes secundarias sobre Emil** (no su texto original):
  - curva ease-out fuerte `cubic-bezier(0.23, 1, 0.32, 1)`;
  - nada de `ease-in` en entradas, porque retrasa el primer movimiento, que es justo el momento en que el usuario mira. — [instagit resumen](https://instagit.com/emilkowalski/skills/how-does-animation-duration-affect-perceived-speed.md)
- **Josh Comeau:** la mayoría de sus springs no rebotan; los usa para que el movimiento sea natural. Valores del sandbox: masa 1.75, tensión 200, fricción 12. — [Josh Comeau](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)
- **CustomWiggle `type: "anticipate"`** es un tipo de wiggle incorporado, es decir, una anticipación ya hecha. — [GSAP CustomWiggle](https://gsap.com/docs/v3/Eases/CustomWiggle)
- **Material 3:** las fuentes disponibles son implementaciones de terceros que se contradicen en curvas y valores. Una menciona el patrón "emphasized-decelerate a 400 ms para entrar, emphasized-accelerate a 200 ms para salir", y tiers largos de 550–1000 ms. No es confiable sin la spec oficial. — [pub.dev ExpressiveMotion](https://pub.dev/documentation/expressive_m3/0.2.0/expressive_m3/ExpressiveMotion-class.html); [docs.rs hydrolysis-m3](https://docs.rs/crate/hydrolysis-m3/latest/source/src/theme/motion/tokens.rs)

### Inferences
- **Coreografía propuesta** (los tiempos son una propuesta de diseño derivada de las fuentes de arriba, no números citados):
  1. **Anticipación**, unos 120–180 ms: el punto de control de la línea sube 6–10 px (un "inhalar") con `power1.out`.
  2. **Caída o "impacto"**, unos 200–250 ms: el punto baja 30–40 px con `power2.in` y el agua empieza a subir.
  3. **Asentamiento**, unos 600–900 ms: el punto vuelve a recto con `elastic.out(1, 0.35)` o con un spring de baja fricción (2–3 oscilaciones visibles). Mientras tanto el relleno sube con `power3.out` (sin rebote, para que no compita con la línea).
  4. **División en corcheras**, unos 400–500 ms: clones superpuestos que se separan en `y` con `stagger: { each: 0.04–0.06, from: 'center' }` y `ease: 'power3.out'`, igual que el pentagrama de Música para mantener la coherencia.
  - Total: unos 1.3–1.8 s. Es aceptable para una transición de sección que se ve pocas veces. Las interacciones repetidas deberían seguir por debajo de 300 ms (Emil).
- Una sola cosa debería rebotar a la vez (la línea). El relleno y las corcheras deberían usar ease-out sin overshoot, para que el ojo tenga un solo foco.

### Gaps
- No encontré fuentes primarias de motion design con milisegundos concretos para anticipación, overshoot y settle en transiciones de página o sección. Los tiempos de arriba son propuesta.
- No encontré la spec oficial de Material 3 Motion. Los tokens citados vienen de implementaciones de terceros y se contradicen.

## 4. Fallback para reduced motion

### Takeaway
Con `gsap.matchMedia()` y la condición `(prefers-reduced-motion: reduce)` se puede poner `duration: 0` o reemplazar la ola por un simple fundido. Emil recomienda cambiar el movimiento con rebote por un fade.

### Cited Findings
- **GSAP matchMedia con condiciones:**
  ```js
  mm.add({ reduceMotion: "(prefers-reduced-motion: reduce)" }, ctx => {
    const { reduceMotion } = ctx.conditions;
    // …
    gsap.to(el, { duration: reduceMotion ? 0 : 2 });
  });
  ```
  También se pueden registrar dos handlers separados: `"(prefers-reduced-motion: no-preference)"` para la animación completa y `"(prefers-reduced-motion: reduce)"` para una versión reducida. `mm.revert()` limpia todo. — [GSAP matchMedia docs](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)
- **Emil:** usar `@media (prefers-reduced-motion: reduce)` y reemplazar el movimiento con rebote por un fade. En Framer Motion, `useReducedMotion` deja solo la opacidad. — [emilkowal.ski](https://emilkowal.ski/ui/great-animations)

### Inferences
- **Fallback propuesto para Natación:** la línea aparece ya recta, el agua aparece con un fundido de opacidad de unos 200 ms y las corcheras aparecen en su lugar con un fundido, sin ola, sin wiggle y sin ticker. Si se usa un ticker para la ola, no se registra en modo reducido.

### Gaps
- No encontré guías que digan si un fundido corto cuenta como "movimiento" problemático. Se asume que la opacidad es segura, según Emil.
