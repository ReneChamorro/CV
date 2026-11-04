# Referencias para la sección "Natación" del CV web (ola + corcheras + marcador electrónico)

> Investigación de noviembre de 2026. Todas las afirmaciones llevan su fuente. Lo que no se pudo verificar en esta sesión está en "Gaps" o marcado como "(no verificado)". Varias páginas (Behance) devolvieron 403 al acceso automático, así que su contenido se conoce solo por el fragmento del buscador.

## 1. Webs premiadas y demos (Awwwards, FWA, Codrops) con transiciones líquidas, de ola o de agua

### Takeaway
Para una "ola que barre la pantalla" lo más directo es una transición con un path SVG que se transforma (morph), al estilo Codrops "Morphing Page Transition" / "Shape Overlays", animada con GSAP (MorphSVG ya es gratis). Para un acabado más "agua real" (refracción, ondas) la referencia es el tutorial de Codrops de distorsión tipo agua con three.js (canvas de ondas usado como textura en postprocesado), pero cuesta bastante más en móvil.

### Cited Findings
**Codrops (tympanus.net): demos y tutoriales**
- **Morphing Page Transition** (Codrops, repo `codrops/morphingpagetransition`): un path SVG se transforma en otro mientras la página actual sube. Es la base más cercana a una ola que tapa la pantalla y deja ver la sección siguiente. — [awesome.ecosyste.ms (ficha del repo)](https://awesome.ecosyste.ms/projects/github.com%2Fcodrops%2Fmorphingpagetransition); [Codrops Playground](https://tympanus.net/codrops/category/playground/page/10/)
- **Dynamic Shape Overlays with SVG**, de Yoichi Kobayashi (Codrops, 17-10-2017): capas de SVG superpuestas que se generan dinámicamente y cuyas propiedades se pueden ajustar. Según un port de Webflow, la "Demo 7" lo usa como transición de página. En septiembre de 2024 el hub de Codrops volvió a listar "SVG Shape Overlays" con autoría de GSAP. — [Codrops hub, tag overlay](https://tympanus.net/codrops/hub/tag/overlay); [Webflow Shape Overlays Menu](https://webflow.com/made-in-webflow/website/Shape-Overlays-Menu)
- **Theodore** (repo de Codrops): transición de página con un path SVG animado para un menú, con una animación de fondo en bucle infinito. — [github.com/codrops/Theodore](https://github.com/codrops/Theodore)
- **Creating a Water-like Distortion Effect with Three.js**, de Daniel Velásquez (Codrops, 08-10-2019): dibuja las ondas en un canvas y las usa como textura en un shader de postprocesado que desplaza la escena. Los canales R y G guardan el vector unitario de la onda y el B su intensidad. Evita la simulación de fluidos y GPGPU, así que es relativamente barato. — [Codrops](https://tympanus.net/codrops/2019/10/08/creating-a-water-like-distortion-effect-with-three-js/)
- **Creating a Fluid Distortion Animation with Three.js** (Codrops, abril de 2022): usa shaders y render targets para una distorsión fluida al estilo PixiJS. — [primarytech mirror / Codrops](https://primarytech.com/?p=6744)
- **WebGL Video Transitions with Curtains.js** (Codrops): transiciones experimentales entre vídeos con shaders. — [Codrops](https://tympanus.net/codrops/?p=51333)
- Codrops también tiene un slideshow con distorsión líquida en WebGL hecho con PixiJS y GSAP, aunque el buscador lo resumió sin URL exacta. — [resultado de búsqueda vía Codrops](https://tympanus.net/codrops/category/playground/page/10/)
- En el foro de GSAP se comenta que para este tipo de transiciones de forma "SVG casi siempre es el camino: responsive y más flexible que divs", y otro usuario cuenta que lo resolvió con WebGL. — [GSAP forum #24636](https://gsap.com/community/forums/topic/24636-canvas-page-transitions-and-hover)

**Liquid Swipe (Cuberto)**
- Cuberto creó el patrón "liquid swipe": la página siguiente entra con una máscara en forma de ola o gota que simula líquido al deslizar. Lo diseñaron en After Effects ajustando los parámetros de un muelle (spring). Hay librerías oficiales para iOS (MIT) y Android, y ports de la comunidad para Flutter (`liquid_swipe`), React (`react-liquidswipe`, con react-spring y use-gesture) y Unity. Según una ficha, el último push al repo de iOS fue en 2020. — [Cuberto blog (AE)](https://cuberto.com/blog/liquid-swipe-animation-in-after-effects/); [Ecosyste.ms Cuberto/liquid-swipe](https://awesome.ecosyste.ms/projects/github.com%2FCuberto%2Fliquid-swipe); [pub.dev liquid_swipe](https://pub.dev/packages/liquid_swipe); [Liquid Swipe en React (lexanth)](https://lexanth.github.io/blog/liquid-swipe); [Unity port](https://www.github.com/FaizanDurrani/LiquidSwipeUnity)

**Awwwards: webs con temática de agua** (ninguna de natación ni de piscina como Site of the Day)
- **The Sea We Breathe**: Site of the Day el 15-11-2021 (7,84). Ofrece tres recorridos submarinos inmersivos. — [Awwwards](https://www.awwwards.com/sites/the-sea-we-breathe)
- **Aquatilis Expedition** (SOTD 29-04-2014), **Hidden Dangers** (SOTD 09-04-2017, sobre un río contaminado), **Water by Falmec** (05-02-2023) y **Reunite the River** (Unit9, 2013). — [Aquatilis](https://www.awwwards.com/sites/aquatilis-expedition); [Hidden Dangers](https://www.awwwards.com/sites/hidden-dangers); [Water by Falmec](https://awwwards.com/sites/water-by-falmec); [Reunite the River](https://www.awwwards.com/sites/reunite-the-river)
- Otras fichas de Awwwards con agua: Convex Seascape Survey, The Ocean Agency, Divenamic, Veolia Water y "Swimming pool – Røroshotellene" (este último es un elemento de inspiración y no un premio confirmado). — [Convex Seascape Survey](https://www.awwwards.com/sites/convex-seascape-survey); [The Ocean Agency](https://www.awwwards.com/sites/the-ocean-agency); [Divenamic](https://www.awwwards.com/sites/divenamic); [Røroshotellene pool](https://www.awwwards.com/inspiration/swimming-pool-roroshotellene)

**Componentes listos**
- "Great UI Liquid Ripple Shader" (21st.dev, MIT, no es de Codrops): transición de página a pantalla completa en WebGL con una onda concéntrica que se expande desde el centro al cambiar de ruta. — [21st.dev](https://21st.dev/@greatui/components/great-ui-liquid-ripple-shader.md)

### Inferences
- La secuencia pedida (ola, luego corcheras) encaja con dos capas: (1) una o varias capas SVG tipo Shape Overlays o Morphing Page Transition, con el borde superior en forma de ola, que cruzan de izquierda a derecha, y (2) al terminar la ola, las corcheras entran escalonadas (stagger) desde el lateral. Para eso basta SVG + GSAP. WebGL solo hace falta si se quiere refracción real del contenido.
- Liquid Swipe es la mejor referencia para la curva de la ola (un "bulto" que avanza con física de muelle) si se quiere que la ola responda a un gesto de swipe en móvil.
- No existe un Site of the Day de Awwwards sobre natación de competición. Eso es una oportunidad de diferenciación, pero también significa que no hay un referente directo que copiar.

### Gaps
- No pude confirmar en FWA ninguna web concreta de agua o piscina (no buscado a fondo por límite de llamadas).
- No verifiqué qué demos concretas de Shape Overlays tienen forma de ola. Hay que abrir el artículo original de Codrops.
- No verifiqué si las demos de Codrops de 2017–2019 siguen funcionando en navegadores actuales (normalmente sí, porque están alojadas en tympanus.net/Development/...).

## 2. Webs deportivas, olímpicas y de natación, y grafismo de TV con calles, corcheras y marcadores

### Takeaway
El lenguaje visual que funciona en la natación televisada es muy sobrio: una fila por calle (número de calle, bandera o país, nombre, tiempo y puesto), cifras de tipo marcador LED de 7 segmentos, una "línea de récord" virtual que se mueve en rojo, y calles que se resaltan al terminar la carrera para mostrar el orden. Reproducir esos códigos (fila por calle + tiempo monoespaciado + puesto + línea de récord) es lo que hará que la sección "se lea" como natación.

### Cited Findings
- **Línea virtual de récord**: Swiss Timing (Omega) la introdujo en el Mundial FINA de Barcelona 2003. Superpone una línea roja en movimiento que marca el ritmo del récord del mundo. — [Swiss Timing TV Graphics](https://swtwebsite.static.swisstiming.com/Service/TvGraphics); [Swiss Timing broadcast](https://www-swt-com.web.swisstiming.com/services/broadcast-solutions/tv-graphics/)
- **Grafismo de calles**: al terminar la carrera se resaltan las calles con el nombre y el puesto de cada nadador. En Singapur 2025, antes de cada carrera, se identificaba a cada nadador por nombre, calle y nacionalidad. — fuentes agregadas en búsqueda: [Swiss Timing TV Graphics](https://swtwebsite.static.swisstiming.com/Service/TvGraphics); [NewscastStudio OBS Tokyo 2020](https://newscaststudio.com/2021/07/30/obs-graphics-tokyo-2020-olympics/2) (el resumen lo da el buscador, no lo verifiqué en la página)
- **Marcadores físicos**: la línea Swiss Timing/Omega incluye los marcadores LED Piccolo, Calypso y Video. Una ficha de distribuidor describe dígitos de 7 segmentos de 24 cm, visibles hasta 120 m. Stramatel PC16.8.8 es compatible con el protocolo UNT4 de Omega. — [AVK Group, OMEGA Piccolo](https://www.avkgroup.at/catalog/3402.921/); [Stramatel PC16.8.8 (PDF)](https://stramatel.com/wp-content/uploads/2018/10/PC16.8.8-GB_A.pdf) (fuentes de proveedor, no de Omega)
- **Contadores de largos**: en Río 2016 Omega instaló contadores digitales en el fondo de la piscina que indican cuántos largos faltan. — [PressReader / The Star, "Split second counts"](https://www.pressreader.com/malaysia/the-star-malaysia/20160805/282346859189286)
- **Historia del cronometraje**: las placas de contacto (touchpads) se introdujeron en el Mundial de 1967 y se usaron en México 1968. Desde Tokio 2020 hay sistemas de detección de movimiento y posicionamiento que muestran dónde gana o pierde tiempo cada nadador. En 2022, en el videomarcador sobre la piscina, "The OMEGA scoreboard read 1:50.34" (Milák). — [World Aquatics, "What it takes to be aquatics' ultimate timekeeper"](https://www.worldaquatics.com/news/2882338/what-it-takes-to-be-aquatics-ultimate-timekeeper)
- **Omega cronometra los eventos de World Aquatics desde 1973.** — [FHS Swiss](https://www.fhs.swiss/eng/2024_02_22_05_Omega.html); [Worldtempus, Doha 2024](https://en.worldtempus.com/article/events/omega-world-aquatics-championships-doha-2024-omega-77263.html)
- **OBS Tokio 2020**: el grafismo de inserción pasó a un estilo plano verde y blanco con tipografía Frutiger. — [NewscastStudio](https://newscaststudio.com/2021/07/30/obs-graphics-tokyo-2020-olympics/2)
- **NBC París 2024**: paleta de azules, verdes y violetas, con pictogramas y destellos dorados, pensada para convivir con los gráficos de OBS. — [NewscastStudio](https://www.newscaststudio.com/2024/08/12/nbc-olympics-2024-motion-graphics/?og=1)
- **BBC Londres 2012**: grafismo con Vizrt, incluido un medallero en 3D. — [NewscastStudio](https://www.newscaststudio.com/2012/07/19/bbc-turns-to-vizrt-for-olympic-graphics)
- **Behance, "Animated Sport Results II"**: visualizaciones animadas de natación (series, semifinal y final) inspiradas en "Replay: Ledecky 800m Freestyle" del New York Times. El acceso automático a la página dio 403. — [Behance](https://www.behance.net/gallery/190823027/Animated-Sport-Results-II)
- **Behance, "NCAA Olympic Graphics Package"** (ESPN, agencia Block & Tackle): paquete olímpico, sin elementos específicos de natación. — [Behance](https://behance.net/gallery/122717215/NCAA-Olympic-Rebrand)
- **Visualización de parciales (splits)**: SwimSwam tiene un artículo que visualiza los parciales de la final del 200 libre femenino. Es útil como referencia de cómo dibujar los parciales por calle. — [SwimSwam](https://swimswam.com/visualizing-the-splits-in-the-epic-womens-200-freestyle-final)
- **Gráficos de Ledecky**: Sports Illustrated publicó en 2024 un gráfico viral que pone en perspectiva su ventaja (ella llegando y el resto lejos). FiveThirtyEight también hizo uno, comentado por la Universidad de Georgia. — [SI](https://www.si.com/olympics/stunning-katie-ledecky-graphic--dominance); [UGA sobre el gráfico de FiveThirtyEight](https://ctlsites.uga.edu/sportsenterprise/fivethirtyeight-katie-ledecky-graphic/)

### Inferences
- **Patrón recomendado para cada carril del CV:** `[nº de calle grande] [icono o estilo] [logro: competición + prueba] [tiempo en dígitos de 7 segmentos o monoespaciados, p. ej. 00:58.42] [puesto o medalla]`. El tiempo puede "correr" como un cronómetro (de 00:00.00 al tiempo final) cuando entra la corchera.
- La **línea roja de récord** se puede reutilizar como metáfora: una línea que cruza las calles y marca la mejor marca personal (MMP), y cada carril indica si quedó por delante o por detrás.
- Para el texto conviene una paleta sobria (fondo azul profundo o negro con dígitos ámbar o blancos, estilo LED), y reservar el color para las corcheras (las de competición alternan rojo, azul, verde, amarillo y blanco según la normativa, pero esto no lo verifiqué aquí).
- Tipografías de referencia: Frutiger, que usó OBS. Para las cifras, una tipografía de 7 segmentos (p. ej. "DSEG", no verificado) o una monoespaciada con `font-variant-numeric: tabular-nums` para que los dígitos no bailen.

### Gaps
- No encontré un caso de estudio en Behance centrado específicamente en el grafismo de natación de Olympics/OBS, World Aquatics u Omega con imágenes accesibles (Behance bloquea el acceso automático).
- No localicé en vivo la pieza del NYT "Replay: Ledecky 800m Freestyle". Solo la conozco por la referencia de Behance.
- No investigué campañas de Speedo o Arena (no aparecieron en las búsquedas hechas).
- El color normativo de las corcheras (rojo en las calles exteriores, verde, azul y amarillo según el reglamento de World Aquatics) no está verificado con fuente en esta sesión.

## 3. Videojuegos con transiciones de agua o piscinas bien resueltas

### Takeaway
La referencia más fuerte de "piscina como estética" es **Pools** (Tensori, 2024): espacios de piscina liminales, azulejo, agua quieta y estética VHS. Para transiciones, el truco reutilizable más documentado es el de Splatoon: usar una salpicadura o mancha de tinta que cubre la pantalla para "esconder" el cambio de estado. Es el mismo principio que una ola que tapa la sección anterior y deja ver la siguiente.

### Cited Findings
- **Pools** (Tensori, Finlandia): walking simulator lanzado el 26-04-2024 para Windows y macOS, inspirado en el fenómeno "Poolrooms" de Jared Pike y en los espacios liminales. Seis capítulos de 10–30 min con presentación de vídeo encontrado en VHS. Un capítulo nuevo gratuito salió el 21-04-2025 y hay versión para PS5 (listada para noviembre de 2025). — [Wikipedia](https://en.wikipedia.org/wiki/Pools_(video_game)); [PC Gamer, entrevista](https://www.pcgamer.com/games/adventure/games-industry-should-be-less-cautious-says-maker-of-experimental-game-about-exploring-a-swimming-pool-dimension/); [PlayStation Store](https://www.playstation.com/en-sg/games/pools/)
- **Splatoon**: la transformación de Inkling a calamar es un "cambiazo" escondido tras salpicaduras de tinta. El aspecto de la tinta se ajustó en desarrollo para que "parezca más acuosa". — [Agora community (análisis en vídeo)](https://agora.community/content/how-do-inkling-transformations-work); [The Cutting Room Floor, prerelease](https://new.tcrf.net/Prerelease:Splatoon); [Inkipedia, Ink](https://splatoonwiki.org/wiki/Ink)

### Inferences
- **Movimientos reutilizables:**
  1. **Ocultar el cambio tras una salpicadura u ola** (Splatoon): la ola cubre por completo el viewport en el punto medio, y solo entonces se monta el DOM de las corcheras.
  2. **Estética de piscina liminal** (Pools): azulejo blanco y azul, cáusticas suaves en el fondo y luz plana. Se puede usar como fondo de la sección con un patrón de azulejo CSS y un filtro de cáusticas.
  3. **Juegos de natación olímpicos** (Mario & Sonic, el juego oficial de Tokyo 2020, la serie Wave Race): suelen mostrar una vista cenital de la piscina con calles y un HUD con tiempos por calle. No lo verifiqué con fuentes en esta sesión, así que es una sugerencia que hay que contrastar.

### Gaps
- No encontré artículos de diseño, wikis o GDC talks específicos sobre transiciones de pantalla tipo ola en juegos (Wave Race 64, Mario Sunshine, ABZÛ, Subnautica o Sonic no se investigaron por límite de llamadas).
- No verifiqué el HUD de natación de "Olympic Games Tokyo 2020 – The Official Video Game" ni el de Mario & Sonic.

## 4. Referencias técnicas: GSAP MorphSVG, librerías de ondas WebGL, three.js, curtains.js/OGL, cáusticas con feTurbulence y rendimiento en móvil

### Takeaway
Opción recomendada por coste/beneficio: **SVG + GSAP (MorphSVG, gratis desde la versión 3.13)** para la ola de transición, y opcionalmente un **fondo de cáusticas con `feTurbulence` + `feDisplacementMap`** muy contenido. Reservar **WebGL** (three.js, curtains.js o el tutorial de Codrops) para escritorio con fallback, porque los filtros SVG animados y la simulación de agua son caros en móvil.

### Cited Findings
**GSAP / MorphSVG**
- Con GSAP 3.13 toda la librería pasó a ser gratuita, también para uso comercial, incluidos los plugins "bonus" que antes eran de Club GSAP, como MorphSVG y SplitText. Se instalan desde el paquete npm público `gsap`, y el paquete `gsap-trial` está deprecado. — [GSAP blog 3.13](https://gsap.com/blog/3-13/); [npm gsap-trial](https://npmjs.com/package/gsap-trial)

**Ondas en WebGL**
- **jquery.ripples**: añade una capa de agua en WebGL a elementos HTML que ondula con el cursor. Requiere la extensión `OES_texture_float` y solo funciona con imágenes del mismo origen (o con CORS). Licencia MIT. Hay forks sin mantener. — [npm jquery.ripples](https://www.npmjs.org/package/jquery.ripples); [cdnjs](https://cdnjs.com/libraries/jquery.ripples); [fork HydraGene (sin mantener)](https://github.com/HydraGene/jquery.ripples)
- **ripple-effect.js**: alternativa en vanilla JS basada en three.js y GSAP, con opciones como intensity, strength, area, waveSpeed y hover. Última actualización en septiembre de 2021 (MIT). — [CSS Script](https://www.cssscript.com/realistic-water-ripple-effect/)
- **WebGL Water de Evan Wallace** (2011, sigue en línea): simulación de agua por heightfield, reflejos y refracciones con raytracing, oclusión ambiental, sombras suaves y cáusticas. Depende de `OES_texture_float` y `OES_standard_derivatives`, y pide "una tarjeta gráfica decente". Su artículo explica las cáusticas: aproxima el frente de onda de la luz con una malla, el brillo es proporcional a la relación entre el área original y la final, y el resultado se renderiza a una textura. — [madebyevan.com/webgl-water](https://madebyevan.com/webgl-water); [Medium, "Rendering Realtime Caustics in WebGL"](https://medium.com/@evanwallace/rendering-realtime-caustics-in-webgl-2a99a29a0b2c)
- **Codrops, distorsión tipo agua con three.js**: canvas 2D con ondas como textura y desplazamiento en postprocesado. Evita GPGPU y es más ligera que una simulación de fluido. — [Codrops](https://tympanus.net/codrops/2019/10/08/creating-a-water-like-distortion-effect-with-three-js/)
- **curtains.js** (Martin Laxenaire): librería WebGL en vanilla que convierte elementos HTML con imágenes o vídeos en planos texturizados animables con shaders. El repo no muestra aviso de archivado, tiene unos 318 commits y la última actualización listada es del 03-04-2025, lo que indica un mantenimiento lento. Tiene un paquete oficial para React (react-curtains). Un repo de ejemplos usa curtains.js v8 para un fondo que ondula con el ratón o el swipe: renderiza las ondas en un canvas oculto y las pasa como textura al shader. — [GitHub curtainsjs](https://github.com/martinlaxenaire/curtainsjs); [curtainsjs.com](https://www.curtainsjs.com/); [webgl-design (ejemplos)](https://github.com/torifo/webgl-design)

**SVG `feTurbulence` / cáusticas**
- Un gist de Codevember (CodeMyUI) anima un `feTurbulence` que alimenta un `feDisplacementMap` sobre un contenedor de agua, animado con GSAP (TimelineMax). Contiene una errata `xlmns`. — [gist CodeMyUI](https://gist.github.com/CodeMyUI/b0f07641818b9b08f711232785a5464a)
- Guía de técnica (documento de skill de terceros, fuente secundaria): para agua usar `type="turbulence"` (no `fractalNoise`). Una `baseFrequency` estirada en horizontal sugiere olas, y valores iguales en X/Y dan ondas circulares. Un `scale` de desplazamiento de 15–25 da una refracción estándar. Para cáusticas, desenfocar el ruido (stdDeviation de aproximadamente 1–5) y fundirlo en modo screen sobre una base azul. **Rendimiento:** animar atributos del filtro obliga a recalcularlo en cada frame, así que es mejor animar la capa de agua con transformaciones CSS. — [claudskills.com, web-wave-designer](https://claudskills.com/skills/web-wave-designer/SKILL.md); [skillselion](https://skillselion.com/skills/erichowens/some_claude_skills/web-wave-designer)

### Inferences
- **Arquitectura sugerida (barata en móvil):**
  1. Ola: un `<svg>` a pantalla completa con 2 o 3 paths de ola superpuestos (distintos tonos de azul, como las capas de Shape Overlays). Se trasladan con `transform` (GPU) y, opcionalmente, se usa MorphSVG para la cresta. Duración de 0,8–1,2 s con ease `power2.inOut`.
  2. Corcheras: elementos DOM con fondo `repeating-linear-gradient` (boyas alternas) que entran con `translateX` y un stagger de unos 0,08 s. Un ligero "rebote" (`back.out` o `elastic`) imita la tensión de la cuerda.
  3. Marcador: contador numérico animado con GSAP (`snap` a centésimas) y tipografía de 7 segmentos o `tabular-nums`.
  4. Agua de fondo: cáusticas con `feTurbulence` **estáticas** (sin animar el filtro), desplazando la capa con `transform`. O bien un vídeo o imagen de cáusticas en bucle comprimido, que suele ser más barato que el filtro animado.
  5. WebGL (ondas al pasar el ratón, refracción): solo en escritorio y detrás de `matchMedia('(pointer:fine)')` y la detección de WebGL. Respetar siempre `prefers-reduced-motion` sustituyendo la ola por un fundido.
- jquery.ripples arrastra jQuery y requiere extensiones de float textures. Para un proyecto Vite moderno (el del usuario) es preferible el enfoque de Codrops con three.js o un shader propio con OGL o curtains.js.

### Gaps
- No verifiqué el estado actual de **OGL** ni de **gpu-curtains** (el sucesor WebGPU de curtains.js, del mismo autor, no aparece en la página del repo que consulté).
- No encontré mediciones publicadas de FPS en móvil para `feTurbulence` frente a WebGL. La recomendación de rendimiento viene de una fuente secundaria más una inferencia.
- No verifiqué demos concretas de GSAP MorphSVG con olas en CodePen ni el showcase de GSAP (no los localicé con las búsquedas hechas).
- No verifiqué los ejemplos oficiales de agua de three.js (`webgl_shaders_ocean`, `webgl_gpgpu_water`, `Water`/`Water2` en addons) en esta sesión. Son conocidos, pero hay que confirmar sus URLs en threejs.org/examples.

## 5. Cómo presentan los resultados, las mejores marcas personales y la trayectoria las webs de deportistas

### Takeaway
Las plataformas de natación (Swimcloud, ScoreMeUp) estructuran el perfil del nadador así: **tabla de mejores marcas por prueba** (tiempo, fecha y competición) + **estándar o mínima siguiente a alcanzar** + **gráfico de progresión por prueba**. Para un CV artístico, cada corchera puede ser una fila de esa tabla y el gráfico de progresión puede ser una "línea de récord" o una cronología.

### Cited Findings
- **Swimcloud**: muestra un gráfico de progresión por prueba cuando hay al menos 4 tiempos en esa prueba. Los gráficos se actualizan solo al terminar la temporada, para que los tiempos lentos de principio de temporada no distorsionen la curva. Los resultados oficiales son registros permanentes que no se pueden borrar, y Swimcloud señala que tener tiempos antiguos demuestra la progresión. — [Swimcloud Help, gráfico de progreso](https://support.swimcloud.com/hc/en-us/articles/115007502687-Why-don-t-I-have-a-progress-graph-on-my-profile); [Swimcloud Help, tiempos](https://support.swimcloud.com/hc/en-us/articles/115007665388-How-can-I-remove-old-times-from-my-profile)
- **Swimcloud, perfil de reclutamiento**: tiene una guía para maximizar el perfil (orientado al reclutamiento universitario). — [Swimcloud Help](https://support.swimcloud.com/hc/en-us/articles/115007502567-How-to-Maximize-Your-Recruiting-Profile)
- **ScoreMeUp**: perfiles de nadador con historial de competiciones y mejores marcas, mínimas o estándares, rankings y vista de progreso. Cada prueba muestra el tiempo, la fecha y el siguiente estándar a alcanzar. — [scoremeup.com](https://scoremeup.com); [ejemplo de perfil](https://www.scoremeup.com/swimmers/owen-stirling)
- **Webflow "Made in Webflow", swimming**: galería de webs de natación hechas por la comunidad (sobre todo escuelas y clubes, no CVs de deportistas). — [Webflow](https://webflow.com/made-in-webflow/swimming)
- **Visualizaciones de prensa**: los gráficos de Ledecky (SI 2024, FiveThirtyEight) y las visualizaciones de parciales de SwimSwam muestran que el formato que más impacta es la **ventaja relativa**, es decir, la distancia frente a los rivales o frente al récord, más que el tiempo absoluto. — [SI](https://www.si.com/olympics/stunning-katie-ledecky-graphic--dominance); [SwimSwam](https://swimswam.com/visualizing-the-splits-in-the-epic-womens-200-freestyle-final)

### Inferences
- **Mapeo al diseño del CV:**
  - Carril 1..N = un logro por carril, ordenado por importancia (como el sembrado de calles, donde las centrales, 4 y 5, son para los mejores tiempos). El mejor logro iría en la calle 4.
  - Cada carril: prueba (p. ej. "100 m mariposa"), competición y año, tiempo en el marcador y puesto o medalla. Opcionalmente, la mínima superada (p. ej. "Mínima Campeonato de España").
  - Un pequeño sparkline de progresión por prueba (inspirado en Swimcloud) o una línea roja de MMP.
  - Accesibilidad: la información del marcador también tiene que estar como texto o tabla accesible (`<table>` o lista con `aria-label`), no solo como animación.

### Gaps
- No encontré webs personales concretas de nadadores de élite (p. ej. Léon Marchand, Katie Ledecky o nadadores españoles) que presenten resultados de forma destacable. No se verificó ninguna en esta sesión.
- No encontré el formato de perfil de deportista de World Aquatics ni el de la RFEN (Real Federación Española de Natación) para un nadador federado. Sería útil para usar la misma nomenclatura de pruebas y mínimas.
