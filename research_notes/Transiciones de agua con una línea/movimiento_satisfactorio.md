# Movimiento "satisfactorio" y suave para una transición de agua mínima (1,5–2,5 s)

Contexto: transición de entrada de página para un CV artístico web en la que una línea horizontal ondula hasta convertirse en superficie de agua, el agua se llena o se asienta con calma y la línea se divide en corcheras (lane ropes). Objetivo: calma, suavidad y nada de ruido visual.

## 1. Principios de animación que hacen el movimiento satisfactorio, curvas de easing y duración de cada fase

### Takeaway
Los principios clásicos que más aportan aquí son *slow in / slow out*, *follow-through / overlapping action* (las partes no se detienen a la vez), los arcos y una anticipación muy sutil. La acción secundaria solo se usa si refuerza la principal. En easing, las fuentes coinciden en ease-out o desaceleración fuerte por defecto, con curvas personalizadas tipo Material "emphasized" `cubic-bezier(0.2, 0, 0, 1)` y muelles con amortiguación alta (poco o ningún rebote). Las guías de UI fijan 100–500 ms por animación, así que una transición de 1,5–2,5 s solo funciona como coreografía de varias fases cortas y solapadas, no como un único tween largo.

### Cited Findings
**Principios de Disney (Johnston & Thomas, *The Illusion of Life*, 1981):**
- Anticipación: un movimiento preparatorio que anuncia la acción y la hace más creíble (p. ej., flexionar las rodillas antes de saltar). — [Wikipedia: Twelve basic principles of animation](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
- Follow-through y overlapping action: las partes sueltas siguen moviéndose cuando el cuerpo se detiene y luego vuelven hacia el centro de masa; las distintas partes se mueven a ritmos distintos. — [Wikipedia](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
- Slow in / slow out: aceleración y desaceleración graduales, con más dibujos al inicio y al final de la acción y menos en el medio. — [Wikipedia](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
- Arcos: el movimiento natural sigue trayectorias curvas; el mecánico va en línea recta. — [Wikipedia](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
- Acción secundaria: debe enfatizar la acción principal y no "take attention away from the main action"; si distrae, mejor quitarla o colocarla al principio o al final del movimiento. — [Wikipedia](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
- Timing: el número de fotogramas fija la velocidad y transmite peso, ánimo y emoción. La exageración requiere contención para no abrumar al espectador. — [Wikipedia](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)

**Easing (valores concretos):**
- Tokens oficiales de Material 3 (material-web): `emphasized` = `cubic-bezier(0.2, 0, 0, 1)`; `emphasized-decelerate` = `cubic-bezier(0.05, 0.7, 0.1, 1)`; `emphasized-accelerate` = `cubic-bezier(0.3, 0, 0.8, 0.15)`; `standard` = `cubic-bezier(0.2, 0, 0, 1)`; `standard-decelerate` = `cubic-bezier(0, 0, 0, 1)`; `legacy` (el "standard" de Material 2) = `cubic-bezier(0.4, 0, 0.2, 1)`; `legacy-decelerate` = `cubic-bezier(0, 0, 0.2, 1)`. — [material-web, _md-sys-motion.scss](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss)
- Duraciones de Material 3: short 50–200 ms, medium 250–400 ms, long 450–600 ms, extra-long 700–1000 ms (en pasos de 50 o 100 ms). — [material-web tokens](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss)
- Emil Kowalski recomienda `ease-out` porque "starts fast and slows down at the end", lo que da sensación de respuesta. Para algo más "elegante", Sonner usa `ease`. Las animaciones de UI deberían ser "usually shorter than 300ms". También aconseja que las animaciones sean interrumpibles. — [Emil Kowalski, "Great animations"](https://emilkowal.ski/ui/great-animations)
- Resúmenes de terceros de las enseñanzas de Kowalski (fuente secundaria, sin verificar en el original) atribuyen `cubic-bezier(0.23, 1, 0.32, 1)` como ease-out fuerte y `cubic-bezier(0.77, 0, 0.175, 1)` como ease-in-out fuerte. También le atribuyen la regla de que nada anime desde `scale(0)`. — [SkillsCat (resumen comunitario)](https://skills.cat/skills/mrmps/smry/emilkowal-animations)
- GSAP: la ease por defecto es `power1.out`. power1 a power4 equivalen a quad, cubic, quart y quint, de menos a más intensos. `back` hace overshoot con un parámetro de fuerza (p. ej., 0,2–2); `elastic` oscila alrededor del final. "Simply changing the ease can adjust the entire feel and personality of your animation." — [GSAP Eases docs](https://gsap.com/docs/v3/Eases/)
- GSAP CustomWiggle genera oscilaciones con `wiggles` (por defecto 10) y `type` (`easeOut`, `easeInOut`, `anticipate`, `uniform`, `random`). `amplitudeEase` controla cómo decae la amplitud de 1 a 0 y `timingEase` el espaciado temporal de las ondas. La amplitud la fija el valor objetivo del tween. — [GSAP CustomWiggle](https://gsap.com/docs/v3/Eases/CustomWiggle)

**Muelles (springs):**
- Josh Comeau: la tensión (stiffness) alta da un movimiento "snappy, bouncy". La fricción (damping) amortigua, y sin ella el muelle "oscillate[s] forever". Con fricción alta se obtiene "buttery-smooth molasses motion that doesn't bounce around". La masa da inercia y lentitud. Comeau dice que la mayoría de sus animaciones con muelles no rebotan: los usa por su naturalidad. Los valores por defecto de su sandbox son mass 1.75, tension 200, friction 12. Desaconseja usar muelles para color u opacidad. — [Josh Comeau, "A Friendly Introduction to Spring Physics"](https://joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)
- Framer Motion usa por defecto stiffness 100, damping 10 y mass 1 (dato tomado de un fragmento de búsqueda, sin verificar en la página completa). — [Maxime Heckel, "The physics behind spring animations"](https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/)

**Duración (UI general):**
- NN/g: la mayoría de animaciones de UI deberían durar entre 100 y 500 ms; un cambio sustancial de pantalla, 200–300 ms. 400 ms es "a very slow animation, to be used only for big movements across large screens", y a 500 ms "start to feel like a real drag". Las entradas pueden durar un poco más que las salidas. Lo que se ve a menudo debe ser más corto y sutil. — [NN/g, "Executing UX Animations: Duration and Motion Characteristics"](https://www.nngroup.com/articles/animation-duration/)
- Kowalski: hay que tener en cuenta con qué frecuencia el usuario verá la animación. Raycast no tiene animaciones y aun así "feels right". — [Emil Kowalski](https://emilkowal.ski/ui/great-animations)

### Inferences
- **Choque de duración:** 1,5–2,5 s supera con creces las recomendaciones de UI (≤ 300–500 ms). Se justifica porque es una transición de entrada a una sección, vista pocas veces, en un contexto artístico. Aun así conviene: (a) que el contenido sea legible o clicable antes de que acabe el efecto, (b) que sea interrumpible o saltable (clic o scroll lo cierran) y (c) reducirla o acortarla en visitas repetidas, lo que encaja con el `visited.js` que ya existe en el proyecto.
- **Coreografía sugerida (inferencia a partir de los tokens y principios anteriores, no de una fuente única):**
  1. *Anticipación* (0–200 ms): la línea se tensa o baja 1–2 px y su grosor u opacidad sube ligeramente. Ease `standard-accelerate` `cubic-bezier(0.3, 0, 1, 1)`. Debe ser casi imperceptible.
  2. *Ondulación* (≈150–900 ms, solapado): la ondulación nace en un punto y se propaga (overlapping action). Amplitud máxima moderada, con decaimiento hacia los extremos. Ease `emphasized-decelerate` `cubic-bezier(0.05, 0.7, 0.1, 1)`.
  3. *Llenado o asentamiento* (≈600–1800 ms): el área de agua sube o se revela con un ease-out largo, p. ej. `cubic-bezier(0.2, 0, 0, 1)` o `power2.out`/`sine.out` en GSAP, a lo largo de 800–1200 ms. Al mismo tiempo la amplitud de la onda decae (follow-through) mediante un muelle con amortiguación alta o una oscilación de 2–3 ciclos visibles cuya amplitud decrece exponencialmente.
  4. *Corcheras* (≈1400–2300 ms): la línea se divide en N cuerdas con un stagger de 60–120 ms entre ellas (overlapping action). Cada una se asienta con un ease-out sin overshoot o con un overshoot mínimo (`back.out(0.6–1)`).
- **Overshoot y asentamiento:** para la calma conviene un amortiguamiento casi crítico (ratio ≈ 0,7–1,0) en lugar de muelles rebotones. La "chispa" la aporta un solo overshoot pequeño en el momento clave (p. ej., la superficie que sube 2–4 % por encima de su nivel final), no varios.
- **Evitar:** `elastic` y `bounce` de GSAP en el movimiento principal, porque son demasiado juguetones y "rígidos que rebotan", y CustomWiggle con muchos `wiggles` (el valor por defecto de 10 es excesivo; para agua calmada serían 2–3 con `type: "easeOut"`).
- **Arcos:** los puntos de la línea no deben moverse en vertical puro con el mismo timing. Una fase distinta por punto (onda viajera) produce la impresión de trayectoria curva.

### Gaps
- No pude leer directamente la página oficial m3.material.io de easing y duración (el contenido no cargó). Las cifras proceden del repositorio oficial material-web, que es fuente primaria de tokens, pero no del texto de uso. Tampoco cargó la página de Material 2 ("Speed") con duraciones por tamaño de área.
- No encontré parámetros documentados de `elastic.out(amplitude, period)` en la página de GSAP consultada.
- Las curvas concretas atribuidas a Emil Kowalski vienen de resúmenes de terceros; no las verifiqué en animations.dev.
- No hallé estudios empíricos sobre la duración ideal de transiciones "artísticas" largas (> 1 s); la recomendación anterior es inferencia.

## 2. Game feel y "juice": qué aplicar a una transición calmada y qué evitar

### Takeaway
El "juice" es retroalimentación deliberadamente excesiva respecto a la acción, y la evidencia citada indica que los niveles medios superan tanto a la ausencia de juice como a los niveles extremos. Para una transición calmada sirven las ideas de *acumulación de muchos detalles pequeños*, *tweening/easing* y *coherencia física* (polish = armonía entre animación y movimiento). Hay que evitar screenshake, partículas abundantes, flashes y muelles rebotones en objetos que deberían ser rígidos o tranquilos.

### Cited Findings
- "Juice It or Lose It" (Martin Jonasson y Petri Purho, GDC Europe 2012) muestra en directo cómo "subir a once" un juego aburrido con trucos que lo hacen más satisfactorio. — [GDC Vault](https://gdcvault.com/play/1016789/Juice-It-or-Lose)
- Un material docente basado en la charla agrupa sus técnicas en tweening (interpolar entre valores extremos), easing in/out, screenshake y rubberbanding (sin transcripción oficial verificada). — [Resultado de búsqueda: diapositivas en Google Docs](https://docs.google.com/presentation/d/1GPDIxsfZuHQmMG91Rngq0O2cU7u-LojX/htmlpresent)
- Jan Willem Nijman (Vlambeer), "The Art of Screenshake" (INDIGO/Control Conference, 2013): parte de un shooter aburrido y aplica unos 30 retoques menores, cada uno de los cuales mejora un poco la sensación (p. ej., un leve screenshake en sentido contrario al disparo). — [Game Developer](https://gamedeveloper.com/design/vlambeer-co-founder-shares-advice-on-building-better-action-games)
- Steve Swink (*Game Feel*, 2008) define el polish como "the interactive impression of physicality created by the harmony of animation, sounds, and effects with input-driven motion". — [Wikipedia: Game feel](https://en.wikipedia.org/wiki/Game_feel); reseña en [Liz England](https://lizengland.com/blog/review-game-feel-by-steve-swink/)
- Pichlmair y Johansen, "Designing Game Feel: A Survey" (2020): "Juice amplifies interactivity by providing excessive amounts of feedback in relation to user input". Mucho juice dificulta aprender qué tiene importancia mecánica, y debe aplicarse "adequately to the situation". Citando el estudio de Kao, los niveles medio y alto de juiciness "outperformed extreme levels and the absence of juiciness". — [arXiv 2011.09201](https://ar5iv.arxiv.org/html/2011.09201)
- Folmer Kelly, "Don't Juice It or Lose It" (GDC Europe 2014): el polish pensado para dar vida puede romper la inmersión. Pone como ejemplos los degradados en paletas restringidas, el polvo donde no debería haberlo y las animaciones elásticas en objetos rígidos; los desarrolladores dejan de preguntarse si cada efecto encaja en el contexto. — [GDC Vault](https://gdcvault.com/play/1020861/Don-t-Juice-It-or)

### Inferences
- **Aplicable:** (1) easing en todo, sin ningún movimiento lineal visible; (2) acumulación de microdetalles sutiles, como un leve cambio de grosor u opacidad de la línea, un brillo de reflejo que cruza una vez o un desfase entre corcheras; (3) un único "momento" de énfasis, por ejemplo el instante en que la línea se separa en corcheras, con un overshoot mínimo; (4) coherencia física: el agua se comporta como fluido (ondas que decaen) y las corcheras como cuerdas tensas (asentamiento sin rebote elástico).
- **Evitar (fuentes de "busyness"):** screenshake, flashes, partículas o burbujas abundantes, rebotes múltiples, elementos que se mueven sin relación causal con la línea y animaciones elásticas en las corcheras. Kelly lo llama "springy animations on rigid objects". El hallazgo de Kao sugiere apuntar a un nivel "medio": calma con detalle, no ausencia total de él.

### Gaps
- No encontré transcripción oficial ni lista completa de los ~20 retoques de "Juice It or Lose It" ni de los 30 de Nijman. Las listas detalladas proceden de webs de baja calidad, que no he usado.

## 3. Movimiento líquido: cómo se estiliza el agua y qué la hace legible con pocos elementos

### Takeaway
El agua estilizada se lee con pocos elementos si se combinan *contornos redondeados y continuos*, *ondas que viajan y se amortiguan* (wave principle / follow-through), una *disipación en elementos más pequeños hacia los bordes* y, opcionalmente, *transparencia y reflejo*. El "liquid swipe" de Cuberto se basa en deformar una curva suave según el gesto y soltarla con un muelle de tipo péndulo que oscila y se asienta.

### Cited Findings
- VFX Apprentice: en agua estilizada, "expect round edges only", sin aristas duras. Cuatro detalles señalan "líquido" en 2D: transparencia, reflejo, burbujas y ondulaciones (ripples). Ninguno destaca por sí solo, pero juntos lo comunican. Las ondulaciones indican la dirección del flujo, y lejos del centro el agua se rompe en burbujas cada vez más pequeñas. — [VFX Apprentice, "5 Pro Tips on Drawing Stylized Water and Liquid FX"](https://www.vfxapprentice.com/blog/how-to-draw-stylized-water)
- Wave principle (Esoteric Software, Spine): se aplica a colas, pelo, tela y banderas con follow-through. La idea central es que cada parte se retrasa respecto a la anterior. — [Spine blog, "Wave Principle"](https://eu.esotericsoftware.com/blog/Wave-Principle-Animating-with-Spine-4)
- RMCAD: el follow-through hace que la onda no se detenga bruscamente sino que "lingers in a natural arc"; un squash-and-stretch ligero imita la elasticidad del agua en los impactos; el agua estilizada debe encajar en el estilo del proyecto, no ser fotorrealista. — [RMCAD, "Animating Nature"](https://www.rmcad.edu/blog/animating-nature-techniques-for-realistic-and-stylized-natural-elements/)
- Cuberto Liquid Swipe: el contorno se diseñó en Figma y se exportó como SVG. El autor eligió qué proporciones de la forma controlan la deformación según la distancia del arrastre; al soltar, la forma oscila antes de asentarse siguiendo "the principle of a spring pendulum", con los parámetros del muelle ajustados en After Effects a ojo. No se publican valores numéricos. — [Cuberto blog](https://cuberto.com/blog/liquid-swipe-animation-in-after-effects/)
- Los ports de Liquid Swipe a React usan react-spring y react-use-gesture, es decir, animación basada en física. — [Resultado de búsqueda: lexanth, "Animation in React – LiquidSwipe"](https://lexanth.github.io/blog/liquid-swipe)

### Inferences
- **Mínimo legible como agua:** (1) una sola polilínea o path suave (curvas Bézier o una suma de 1–2 senoides) en lugar de una línea recta; (2) una onda que *viaja* (la fase cambia con el tiempo) en lugar de un "latido" vertical uniforme; (3) amplitud que decae con el tiempo y con la distancia al origen; (4) un relleno con algo de transparencia o un degradado vertical suave bajo la línea; (5) como mucho un reflejo o brillo que cruza la superficie una vez. Las burbujas son opcionales y, si se usan, pocas y pequeñas. Encaja con las burbujas que ya hay en la sección Natación, pero aquí hay que dosificarlas para no saturar.
- **Parámetros orientativos de la onda (inferencia, para afinar a ojo):** amplitud inicial ≈ 6–16 px (o 1–2 % del alto de viewport); longitud de onda ≈ 25–50 % del ancho (1–3 crestas visibles: más crestas se ven nerviosas); periodo ≈ 0,8–1,4 s por ciclo, porque las olas lentas transmiten calma; decaimiento exponencial de la amplitud hasta < 1 px en 1–1,5 s; dos senoides superpuestas de distinta longitud de onda y velocidad evitan la regularidad mecánica sin añadir ruido.
- **Sloshing / asentamiento:** el "llenado calmado" se lee mejor si la superficie llega con un leve overshoot (sube un poco por encima y vuelve), seguido de 1–2 oscilaciones de baja amplitud. Esto equivale a un muelle subamortiguado suave, cerca del sandbox de Comeau con fricción alta, o a CustomWiggle de 2–3 wiggles con `easeOut`.
- **Corcheras:** al separarse, cada cuerda debería heredar la ondulación residual con un retraso (wave principle) y quedarse quieta antes que el agua, porque son cuerdas tensas. Unos flotadores o cuentas punteadas con un leve desfase vertical bastarían para leerlas como corcheras sin más elementos.

### Gaps
- Cuberto no publica duraciones ni parámetros de muelle del Liquid Swipe. Habría que leer el código Swift (github.com/Cuberto/liquid-swipe) para obtener valores; no lo hice.
- No encontré una fuente de motion design con valores numéricos (amplitud, frecuencia) recomendados para ondas estilizadas; los rangos anteriores son inferencia.

## 4. Fluidez percibida en la web (60 fps, transform/opacity, número de elementos) y alternativas de movimiento reducido

### Takeaway
Para que se perciba fluidez, lo ideal es animar solo `transform` y `opacity` (pasan por el compositor y no provocan layout ni paint), usar `will-change` con moderación, evitar blur y sombras animadas, y preferir CSS o WAAPI, que siguen fluidas aunque el hilo principal esté ocupado. La deformación de un path SVG (`d`) o un canvas sí repinta, así que hay que limitar el número de puntos y elementos. Con `prefers-reduced-motion: reduce` se sustituye el movimiento espacial por un fundido u opacidad que conserve el significado.

### Cited Findings
- web.dev: "restrict animations to `opacity` and `transform`"; "Avoid any property that triggers layout or paint unless it's absolutely necessary". Algunos repintados cuestan más que otros, como el blur o las sombras. `will-change` "sparingly, and only if you encounter a performance issue", aplicado desde JS justo antes del cambio y retirado después. Para diagnosticar se usan el panel Performance, el paint flashing y el porcentaje de frames no perdidos (que debería rondar el 99 %). — [web.dev, "How to create high-performance CSS animations"](https://web.dev/articles/animations-guide)
- Kowalski: apuntar a 60 fps y animar `transform` y `opacity`, que se saltan layout y paint. Con el hilo principal ocupado, las animaciones aceleradas por hardware (CSS o WAAPI) "will remain smooth, no matter how busy the main thread is". — [Emil Kowalski](https://emilkowal.ski/ui/great-animations)
- MDN: `prefers-reduced-motion` (valores `no-preference` y `reduce`) es Baseline ampliamente disponible desde enero de 2020. Se corresponde con ajustes del sistema como "Animation Effects" en Windows 11, "Reduce motion" en macOS e iOS y "Remove animations" en Android. Escalar o desplazar (panning) objetos grandes puede desencadenar trastornos vestibulares. El ejemplo de MDN sustituye un escalado por un `dissolve` de opacidad dentro de `@media (prefers-reduced-motion: reduce)`. — [MDN, prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- Kowalski: respetar la preferencia porque "Animations can make people feel sick"; en Framer Motion existe el hook `useReducedMotion`. — [Emil Kowalski](https://emilkowal.ski/ui/great-animations)
- Comeau: los muelles requieren JavaScript (CSS no los ejecuta de forma nativa) y no conviene usarlos para color u opacidad. — [Josh Comeau](https://joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)

### Inferences
- **Implementación eficiente de la onda:** (a) si se usa un path SVG que se regenera cada frame con `requestAnimationFrame`, hay que limitar los puntos (≈ 20–60 muestras más una curva suavizada) y animar solo la línea; el relleno puede ser el mismo path cerrado. (b) Alternativa más barata: un path de onda fijo, más ancho que el viewport, que se *traslada* con `transform: translateX` (onda viajera por compositor) y cuya amplitud se reduce con `transform: scaleY`, quedando todo en el compositor. (c) El "llenado" puede hacerse con `transform: translateY` o `scaleY` de un rectángulo con `transform-origin: bottom`, en lugar de animar `height` o `clip-path`.
- **Número de elementos:** pocos, por calma visual y por rendimiento. Una línea, un relleno, N corcheras (p. ej., 3–6) y como mucho un reflejo. Hay que evitar `filter: blur()` animado y `box-shadow` animado (repintado caro según web.dev).
- **Movimiento reducido:** sustituir toda la secuencia por (1) la línea ya recta que hace un fundido a la composición final de agua más corcheras, o (2) un fundido cruzado de 200–300 ms sin ondulación ni desplazamiento. Se mantiene el significado ("entra agua y aparecen calles") sin movimiento espacial grande. No debe escalarse ni desplazarse el área de agua completa, que es un "objeto grande" según MDN.
- **Robustez:** la transición debe completarse aunque se interrumpa (al navegar fuera, cancelar el rAF y saltar al estado final), y el contenido no debe depender de que la animación acabe.

### Gaps
- La página de Apple HIG sobre movimiento no cargó en el fetch, así que no incluyo citas textuales de Apple.
- No encontré datos empíricos sobre cuántos elementos animados simultáneos empiezan a percibirse como "busy"; la recomendación es inferencia de diseño.
- No consulté material de Val Head (*Designing Interface Animation*); queda como fuente pendiente.
