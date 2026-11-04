# Sección de skate: reels de Instagram, clips en loop autoalojados y galería estilo scrapbook/VHS de los 2000 (React + Vite, nov. 2026)

## 1. Estado actual (2025-2026) del embed de Instagram: blockquote + embed.js, oEmbed, tokens, límites, autoplay, tamaños y problemas conocidos

### Takeaway
El embed oficial sigue siendo `<blockquote class="instagram-media">` + `embed.js`, y en una SPA hay que llamar a `window.instgrm.Embeds.process()` después de montar el marcado. Novedad importante de 2026: desde el 15 de junio de 2026 Meta permite llamar al endpoint oEmbed de Instagram **sin access token ni App Review**, así que ya no hace falta una app de Meta para obtener el HTML del embed. Los reels se pueden embeber (URLs `/reel/{shortcode}/`), pero no se reproducen solos. Además, el script es pesado y pone cookies de seguimiento de Meta al cargar, así que lo razonable es una fachada "clic para cargar", que además sirve como gate de consentimiento en la UE.

### Cited Findings
**oEmbed: endpoint, token y versión**
- 15 de junio de 2026: Meta anuncia que los endpoints oEmbed (Threads, Instagram, Facebook Post y Facebook Video) se pueden llamar **sin access token** y que ya no hace falta App Review para embeber contenido público. Ejemplo: `GET https://graph.facebook.com/v25.0/instagram_oembed?url={content-url}` — [Meta for Developers blog, "Tokenless access to Meta oEmbed APIs" (15/06/2026)](https://developers.facebook.com/blog/post/2026/06/15/tokenless-access-to-meta-oembed-apis/)
- Según el mismo post, la vía con token (App Review "Meta oEmbed Read") sigue funcionando y "puede" tener límites de tasa más altos. Los límites sin token "pueden diferir", pero no se publican cifras. Meta avisa de que hoy los endpoints sin token devuelven los mismos datos que con token, y que eso podría cambiar — [Meta blog 2026](https://developers.facebook.com/blog/post/2026/06/15/tokenless-access-to-meta-oembed-apis/)
- Campos de respuesta actuales: `version` (siempre "1.0"), `provider_name`, `provider_url`, `html`, `width` y `type` ("rich" o "video") — [Meta blog 2026](https://developers.facebook.com/blog/post/2026/06/15/tokenless-access-to-meta-oembed-apis/); [Referencia instagram-oembed](https://developers.facebook.com/docs/graph-api/reference/instagram-oembed/)
- La guía oficial de oEmbed indica un límite de **1.000 peticiones por hora** y usa `v26.0` en sus ejemplos. Hay una discrepancia de versión con el post del blog (v25.0); cualquiera vigente de la Graph API debería funcionar — [Instagram Platform: oEmbed](https://developers.facebook.com/docs/instagram-platform/oembed)
- Tipos de URL soportados: posts y carruseles `https://www.instagram.com/p/{shortcode}/`, **vídeos y Reels `https://www.instagram.com/reel/{shortcode}/`** y perfiles `https://www.instagram.com/{username}` — [Instagram Platform: oEmbed](https://developers.facebook.com/docs/instagram-platform/oembed)
- No se admiten: cuentas privadas, inactivas o con restricción de edad, cuentas que desactivaron los embeds, Stories ni **Shadow DOM**. El uso es solo para mostrar en front-end; está prohibido usar los metadatos para otros fines, analítica incluida — [Instagram Platform: oEmbed](https://developers.facebook.com/docs/instagram-platform/oembed)

**Parámetros y tamaños**
- `maxwidth`: debe estar **entre 320 y 658 px**; `maxheight` no se admite. `hidecaption=true` oculta el texto del post y `omitscript=true` devuelve el HTML sin `<script>` — [Referencia instagram-oembed](https://developers.facebook.com/docs/graph-api/reference/instagram-oembed/)
- Un proveedor afirma que el embed nativo se muestra en formato cuadrado o 4:5, no vertical a sangre completa como en la app (fuente comercial, sin verificar) — [Whatmore blog, may. 2026](https://www.whatmore.ai/blog/how-to-embed-instagram-reels-shopify/)

**Campos eliminados (información desactualizada que conviene detectar)**
- Desde el **3 de noviembre de 2025**, `/instagram_oembed` ya no devuelve `thumbnail_url`, `thumbnail_width`, `thumbnail_height` ni `author_name`. La fecha original se aplazó en una actualización del 8 de octubre de 2025. Cualquier tutorial que use `thumbnail_url` para sacar la miniatura de un reel está obsoleto — [Meta blog "oEmbed updates" (08/04/2025)](https://developers.facebook.com/blog/post/2025/04/08/oembed-updates/); [Iframely: thumbnail deprecation](https://iframely.com/updates/193071-facebook-and-instagram-oembed-thumbnail-deprecation)
- Iframely añade que las miniaturas que se sacan de los metadatos HTML de Instagram llegan recortadas y con disponibilidad impredecible — [Iframely](https://iframely.com/updates/193071-facebook-and-instagram-oembed-thumbnail-deprecation)

**embed.js en SPAs / React**
- Doc oficial: con `omitscript=true` puedes cargar `embed.js` por tu cuenta y llamar a `instgrm.Embeds.process()` para inicializar el HTML del embed. Al cargarse, el script recorre la página y renderiza los posts — [Instagram Platform: oEmbed](https://developers.facebook.com/docs/instagram-platform/oembed)
- Problema típico en React: si el embed se inyecta con `innerHTML` o `dangerouslySetInnerHTML`, el `<script>` no se ejecuta. Hay que cargar el script una sola vez aparte y renderizar el marcado como JSX — [Iframely React docs](https://iframely.com/docs/react.md); [Prismic community](https://community.prismic.io/t/instagram-embed-not-showing-the-image/6538)
- Librerías como `react-ig-embed` llaman a `process()` solo si existe el global y con un pequeño retraso, porque React no se entera de que embed.js ha cambiado el DOM por fuera — [react-ig-embed (GitHub)](https://github.com/justinmahar/react-ig-embed)

**Autoplay, rendimiento y problemas**
- Varias fuentes de proveedores coinciden en que el embed nativo (un iframe) **no hace autoplay** e ignora el atributo `autoplay`. El usuario tiene que pulsar play (fuentes comerciales, no documentación de Meta) — [Smash Balloon](https://smashballoon.com/de/instagram-embed-video-autoplay/); [Whatmore](https://www.whatmore.ai/blog/how-to-embed-instagram-reels-shopify/)
- Según Chrome, si un iframe de terceros no tiene autoplay delegado (`allow="autoplay"`), el atributo `autoplay` se ignora y `play()` lanza `NotAllowedError` — [Chrome for Developers: Autoplay policy](https://developer.chrome.com/blog/autoplay)
- Se dice que el script de embed de Instagram bloquea el render y empeora el LCP en móviles lentos, y que varios reels juntos disparan el Total Blocking Time (fuente comercial, sin benchmarks) — [Whatmore](https://www.whatmore.ai/blog/how-to-embed-instagram-reels-shopify/)
- Hay informes de usuarios con reels embebidos que se quedan congelados en el primer fotograma — [WordPress support thread](https://wordpress.org/support/?p=18516976)
- Alternativa ligera que se recomienda a menudo: una imagen estática que enlaza al reel, sin cargar el embed — [Clipara guide](https://webflow.getclipara.com/guides/how-to-embed-a-instagram-reel-quick-quide)

**Cookies, consentimiento (UE) y bloqueadores**
- Según fuentes de terceros, `embed.js` pone cookies de Meta al renderizar la página, sin ninguna interacción: `_fbp` (90 días), `ig_did` y `datr` (2 años). Recomiendan un placeholder estático que solo cargue el embed tras el consentimiento de marketing. Las fuentes no coinciden del todo en la lista exacta de cookies — [Guía en Notion (law-innovation-tech)](https://law-innovation-tech.notion.site/Instagram-37ca5962dbd080dab231db4868241e7d); [ConsentStack: Instagram Feed](https://www.consentstack.io/vendors/instagram-feed)
- Patrón de producción: Lonely Planet condiciona la carga de `embed.js` a una categoría de consentimiento de OneTrust y nunca lo carga antes de resolver el consentimiento — [Lonely Planet dev docs](https://www.lonelyplanet.com/docs/development-patterns/onetrust-consent-cookies/)
- El patrón "two-click" (máscara de contenido, y el embed y sus cookies solo tras el clic) está muy extendido en la UE para embeds de YouTube y similares — [Plugin GDPR 2-Click (WordPress.org)](https://id.wordpress.org/plugins/gdpr-extensions-com-youtube-2clicksolution/); [Foro Obsidian](https://forum.obsidian.md/t/publish-embed-privacy-aka-two-click-eu-gdpr/92682/1)

### Inferences
- Para un CV estático en Vite, lo más simple y robusto hoy es **no usar oEmbed** (exige backend o build step) y escribir a mano el `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/XXXX/" data-instgrm-version="14">` en JSX. Después se carga `embed.js` una vez y en `useEffect` se llama a `window.instgrm?.Embeds.process()`. (El valor `data-instgrm-version="14"` es el que genera hoy el botón "Insertar" de Instagram según el uso común; no lo encontré en la documentación oficial, conviene copiarlo del código que da Instagram.)
- Si se quiere oEmbed (por ejemplo, para generar el HTML en build time con un script de Node), desde junio de 2026 ya no hace falta token. Con 1.000 peticiones por hora sobra para un portafolio, pero el resultado se debería cachear en build porque Meta avisa de que el formato puede cambiar.
- Patrón recomendado para la sección: **fachada clic-para-cargar**. Se muestra un póster o clip propio, y solo al hacer clic ("ver en Instagram / cargar reel") se inyectan el blockquote y `embed.js`. Así se evitan las cookies antes del consentimiento (UE), el coste de LCP/TBT, y que el bloque quede vacío si un bloqueador (uBlock, Brave) corta `instagram.com/embed.js`. En ese caso el fallback es un simple enlace al reel.
- Como `instgrm` no funciona dentro de Shadow DOM, no hay que meter el embed en web components con shadow root.
- El ancho del embed debe quedar entre 320 y 658 px. En una cuadrícula de scrapbook con tarjetas giradas, conviene que el embed real se abra en un modal o lightbox sin rotación y no dentro de la tarjeta inclinada.

### Gaps
- No encontré cifras oficiales de rate limit para la vía sin token. La de 1.000/h viene de la guía general, sin aclarar si aplica igual sin token.
- No encontré documentación oficial de Meta sobre `data-instgrm-version` ni sobre el comportamiento exacto de autoplay del iframe del reel. Las afirmaciones sobre autoplay vienen de proveedores.
- No encontré pruebas verificadas de qué listas de bloqueo (EasyList, uBlock Origin, Brave Shields) bloquean `embed.js` por defecto. Es una inferencia razonable, no un dato citado.
- No encontré una resolución de una autoridad de protección de datos que hable específicamente de los embeds de Instagram. La recomendación de consentimiento previo se basa en guías de terceros.

## 2. Buenas prácticas para clips de preview autoalojados en loop (codificación, tamaño, póster, autoplay, pausa fuera de pantalla, hosting)

### Takeaway
Los clips deberían ser `<video autoplay loop muted playsinline>` con WebM (VP9) primero y MP4 (H.264, yuv420p) después, codificados por CRF. Hay que comprobar siempre la promesa de `play()`, porque el autoplay silenciado se permite en general pero iOS en Modo de Bajo Consumo lo bloquea. Para unos pocos clips cortos basta con la carpeta `public/` de Vite. Si crecen, Mux (100.000 min de entrega gratis al mes) o Cloudinary (25 créditos al mes) son opciones gratuitas viables.

### Cited Findings
**Codificación**
- Comandos de web.dev para reemplazar GIFs: MP4 `ffmpeg -i in.gif -b:v 0 -crf 25 -f mp4 -vcodec libx264 -pix_fmt yuv420p out.mp4` y WebM `ffmpeg -i in.gif -c vp9 -b:v 0 -crf 41 out.webm`. libx264 necesita dimensiones pares; si no lo son, se añade `-vf "crop=trunc(iw/2)*2:trunc(ih/2)*2"` — [web.dev: Replace animated GIFs with video](https://web.dev/articles/replace-gifs-with-videos)
- Ejemplo de ahorro del mismo artículo: el GIF pesa 3,7 MB, el MP4 551 KB y el WebM 341 KB — [web.dev](https://web.dev/articles/replace-gifs-with-videos)
- Orden de `<source>`: primero WebM y después MP4, porque el navegador no especula y usa el primero que soporta — [web.dev](https://web.dev/articles/replace-gifs-with-videos)
- Marcado recomendado: `<video autoplay loop muted playsinline>` — [web.dev](https://web.dev/articles/replace-gifs-with-videos)

**Póster y LCP**
- web.dev no recomienda `poster` cuando el vídeo sustituye a un GIF. Además, un `<video>` sin póster no es candidato a LCP, lo que puede mejorar esa métrica — [web.dev](https://web.dev/articles/replace-gifs-with-videos)

**Políticas de autoplay**
- Chrome: "Muted autoplay is always allowed". El autoplay con sonido necesita interacción del usuario, un MEI alto (solo en escritorio) o un sitio instalado como PWA o añadido a la pantalla de inicio. Recomienda no asumir nunca que el vídeo se reproducirá y comprobar la promesa de `play()` — [Chrome for Developers: Autoplay policy](https://developer.chrome.com/blog/autoplay)
- En los iframes del mismo origen el autoplay está permitido por defecto; en los de terceros hay que delegarlo con `allow="autoplay"` — [Chrome for Developers](https://developer.chrome.com/blog/autoplay)
- iOS/macOS Safari en **Modo de Bajo Consumo** bloquea el autoplay incluso de vídeos silenciados con `playsinline`. `play()` se rechaza con `NotAllowedError` y aparece un botón de play nativo que no se puede ocultar de forma fiable. La reproducción iniciada por un toque del usuario sí funciona — [WebKit Bug 216887](https://bugs.webkit.org/show_bug.cgi?id=216887); [Veriff known issues](https://devdocs.veriff.com/docs/known-issues); [Webflow forum](https://discourse.webflow.com/t/autoplay-video-not-playing-on-low-power-mode/215057)

**Hosting**
- Cloudinary Free: sin tarjeta, 25 créditos al mes (transformaciones, almacenamiento y ancho de banda; ventana móvil de 30 días) y se puede usar en producción mientras no se supere ese límite. Agregadores de terceros equiparan 1 crédito a unas 1.000 transformaciones, 1 GB de almacenamiento o 1 GB de ancho de banda — [Cloudinary docs: Billing and plans](https://cloudinary.com/documentation/billing_and_plans); [Classmethod](https://dev.classmethod.jp/en/articles/cloudinary-pricing-and-usage-monitoring-guide)
- Mux: pago por uso, "No credit card to start", 100.000 minutos de entrega gratis al mes y codificación gratis en 1080p básico. El almacenamiento cuesta desde 0,003 USD por minuto al mes y la entrega 0,001 USD por minuto tras los gratuitos. El plan PAYG incluye 20 USD de crédito mensual — [Mux pricing](https://www.mux.com/pricing)

### Inferences
- **Ajustes recomendados para los loops de skate** (a partir de web.dev, adaptado a clips de 3 a 8 s sacados de un reel 9:16):
  - `ffmpeg -ss 00:00:02 -t 6 -i reel.mp4 -an -vf "scale=480:-2,fps=24" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart clip.mp4`
  - `ffmpeg -ss 00:00:02 -t 6 -i reel.mp4 -an -vf "scale=480:-2,fps=24" -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 clip.webm`
  - `-an` quita el audio (se reproduce en mute y pesa menos), `-movflags +faststart` permite empezar antes de terminar la descarga, y 480 px de ancho basta para tarjetas de unos 240-320 px CSS en pantallas 2x. El objetivo es menos de 500 KB-1 MB por clip.
- **Póster**: a diferencia del caso "reemplazar un GIF", aquí sí conviene poner `poster` (un JPG o WebP del primer fotograma, `ffmpeg -ss 0 -i clip.mp4 -frames:v 1 poster.webp`). Es lo que se ve si el autoplay falla (Bajo Consumo, ahorro de datos o `prefers-reduced-motion`) y además encaja como "polaroid".
- **Pausar fuera de pantalla** (patrón estándar, no lo verifiqué en una fuente concreta): un `IntersectionObserver` compartido con `threshold: 0.25` que llama a `video.play().catch(() => {})` al entrar en pantalla y a `video.pause()` al salir. Usar `preload="none"` o `"metadata"` y asignar `src` solo la primera vez que el clip se acerca al viewport (`rootMargin: '200px'`) para que la página no descargue todos los clips de golpe. En React, un hook `useInViewVideo(ref)` con limpieza en el `return` del `useEffect`.
- **Respetar `prefers-reduced-motion`**: si el usuario lo tiene activo, no hacer autoplay y mostrar solo el póster con un botón de play (ver la sección 3).
- **Hosting**: para menos de 20 clips de menos de 1 MB, la carpeta `public/clips/` de Vite servida desde Netlify, Vercel o GitHub Pages es lo más simple y sin dependencias. Las rutas en `public/` no pasan por el hash de Vite, así que conviene versionar el nombre del archivo (`kickflip-v2.mp4`) para evitar cachés viejas. Mux o Cloudinary solo compensan si se quiere HLS adaptativo, transformaciones al vuelo o muchos clips. Para loops de pocos segundos, un MP4 progresivo es suficiente.
- Cada tarjeta debería ser un `<a href="https://www.instagram.com/reel/…" target="_blank" rel="noopener">` que envuelve el `<video>`, con un `aria-label` descriptivo ("Ver reel: kickflip en el bowl de…"). El clip propio es la preview y el enlace lleva al reel. Esto cumple el plan final sin cargar código de Meta.

### Gaps
- Bunny Stream: no conseguí verificar los precios ni si tiene plan gratuito en 2026 (la búsqueda no devolvió fuentes).
- No encontré una fuente primaria (MDN o web.dev) consultada en esta sesión con el patrón concreto de IntersectionObserver para vídeo. El patrón es estándar pero queda como inferencia.
- No encontré datos actuales de soporte de AV1 en `<video>` para Safari que justifiquen añadir una tercera fuente AV1. Por ahora WebM VP9 + MP4 H.264 es la combinación segura.

## 3. Referencias visuales y técnicas CSS: scrapbook / zine / VHS de skate de principios de los 2000 (accesible y con buen rendimiento)

### Takeaway
No encontré webs actuales premiadas (Awwwards o Codrops) que reproduzcan de forma específica una galería de skate tipo scrapbook/VHS de los 2000. Las referencias más útiles son la estética de los zines de skate (collage denso, fotocopia), las marcas que usan el VHS como lenguaje y tutoriales CSS concretos de polaroids con cinta, washi tape, stickers y scanlines. La clave técnica es hacerlo con CSS barato (transforms, gradientes, pseudo-elementos) y desactivar el movimiento con `prefers-reduced-motion`.

### Cited Findings
**Referencias culturales y de marca**
- La estética zine del skate: Skate Fate (1981-1991) se considera el primer skate zine, y Thrasher empezó como zine de papel prensa animando a sus lectores a hacer el suyo. El look de collage mezcla fotos de skaters con conciertos y gente tocando la guitarra, "hombro con hombro" — [Jenkem: estudio académico sobre zines y skate (2024)](https://www.jenkemmag.com/home/2024/06/27/a-scholarly-look-at-zine-cultures-impact-on-skateboarding/); [Self Inflicted #4 (UT Austin, exposición)](https://socialjusticeutaustin.omeka.net/exhibits/show/pics--jokes-and-rock-roll--mus/self-inflicted--4)
- VHS como lenguaje de skate: 5BORONYC llevó a tablas el arte de las carátulas de cintas VHS, con degradados dorados, tipografía de época y formas abstractas de mediados de los 90 — [Trend Hunter: VHS-Inspired Skateboards](https://www.trendhunter.com/trends/vhs-skateboard)
- Bronze 56k (marca de skate de NY asociada a la estética lo-fi): su tienda actual usa navegación de texto en mayúsculas (SHOP, VIDEO, RADIO, ARCHIVE, INSTAGRAM…), **logo GIF animado**, una única cuadrícula larga de producto sin hero ni filtros y copy seco ("Your Sack is empty"). La descripción sale del texto de la página; no pude verificar el CSS ni el aspecto renderizado — [shop.bronze56k.com](http://shop.bronze56k.com/)
- Awwwards: lo más cercano son sitios con "collage" (p. ej. "Collage – hand-crafted objects", Site of the Day el 2/9/2019, 7,59/10), pero no son de skate ni de scrapbook — [Awwwards: Collage](https://www.awwwards.com/sites/collage-hand-crafted-objects); [Awwwards: Dams Are Dirty (collage scroll)](https://www.awwwards.com/inspiration/dams-are-dirty-collage-scroll)

**Técnicas CSS concretas (con valores)**
- Polaroid: `background:#fff; padding:12px 12px 34px; box-shadow:0 8px 20px rgba(0,0,0,.25); transform:rotate(-5deg)`, alternando -5deg y 3deg con `:nth-child` — [Retro Scrapbook (HTML-CSS Visual Playground)](https://drjulsgilliam.github.io/HTML-CSS-Visual-Playground/retro-scrapbook.html)
- Cinta adhesiva: `position:absolute; top:-12px; left:50%; transform:translateX(-50%) rotate(-3deg); width:80px; height:26px; background:rgba(224,164,88,.55)` (la translucidez sale del alfa). Washi tape: `repeating-linear-gradient(45deg,#e07a5f 0 14px,#f2cc8f 14px 28px)` — [Retro Scrapbook](https://drjulsgilliam.github.io/HTML-CSS-Visual-Playground/retro-scrapbook.html)
- Papel kraft: `background:#efe6d2` + `radial-gradient(rgba(150,120,70,.08) 1px, transparent 1px)` con `background-size:8px 8px`. Bordes de papel rasgado con `clip-path: polygon(0 4%, 6% 0, 18% 5%, 32% 1%, …)`. Sticker: círculo de 84 px con `border:4px solid #fff`, rotado -8deg. Fuentes: Caveat y Gochi Hand, con una tipografía legible para el texto largo — [Retro Scrapbook](https://drjulsgilliam.github.io/HTML-CSS-Visual-Playground/retro-scrapbook.html)
- Rayas y scanlines con `linear-gradient(to bottom, …)` de paradas duras — [VHS-in-CSS (AliAlmasi)](https://gh.r-mj.com/AliAlmasi/VHS-in-CSS). Glitch VHS solo con CSS (filtros y animaciones); su README avisa de que solo funciona bien en Chrome — [css-vhs-glitch (dulnan)](https://awesome.ecosyste.ms/projects/github.com%2Fdulnan%2Fcss-vhs-glitch)

**Accesibilidad**
- `prefers-reduced-motion: reduce` indica que el usuario pidió minimizar el movimiento no esencial. El escalado o desplazamiento de objetos grandes y el parallax pueden molestar a personas con trastornos vestibulares. Patrón recomendado: definir la animación por defecto y sobrescribirla dentro de `@media (prefers-reduced-motion: reduce)`. Es Baseline desde enero de 2020 — [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

### Inferences
- **Receta de la galería "cinta VHS + scrapbook"** (combinando las técnicas citadas; los valores concretos son orientativos):
  - Tarjeta: `<figure>` con `transform: rotate(var(--r))`, y `--r` en línea desde los datos (-4° a 4°, pseudoaleatorio pero fijo por ítem para que no cambie en cada render). En `:hover` o `:focus-visible` pasa a `rotate(0) scale(1.03)`, con `transition: transform .2s`.
  - Cinta: con `::before` (en lugar de un `<span>`) y `mix-blend-mode: multiply` para que parezca translúcida sobre la foto. Así no se ensucia el DOM y el lector de pantalla la ignora.
  - Overlay VHS sobre el `<video>`: un `::after` con `background: repeating-linear-gradient(to bottom, rgba(0,0,0,.18) 0 1px, transparent 1px 3px)` y `pointer-events:none` para las scanlines. Un "● REC" y un timecode tipo `PLAY ▶ 00:14 / NOV 03 2003` en tipografía monoespaciada (VT323 u OCR-A). Un leve `filter: saturate(1.2) contrast(1.1)` y una aberración cromática con `text-shadow: 1px 0 red, -1px 0 cyan` solo en los textos.
  - Grano: un SVG con `feTurbulence` como `background-image` estática (data URI) en un pseudo-elemento fijo de toda la página, con `opacity: .06-.1`. Si se anima, que sea a pocos fps con `steps()` y que se desactive con reduced-motion.
- **Rendimiento**: animar solo `transform` y `opacity`. Una sola capa de grano para toda la página en vez de una por tarjeta. Nada de `filter: blur` animado. Los overlays van sobre el `<video>`, no procesan el vídeo. `content-visibility: auto` en filas de galería fuera de pantalla. Imágenes de pegatinas y cinta en SVG o WebP pequeños.
- **Accesibilidad**:
  - Los textos decorativos (REC, timecode, stickers) con `aria-hidden="true"`. Cada clip con un `<figcaption>` real y legible (truco, spot y fecha) en una fuente legible, no en manuscrita.
  - Las rotaciones no deben superar unos 5° en el texto que hay que leer.
  - Foco visible sobre las tarjetas giradas, con un `outline` grueso y `outline-offset`.
  - Con `prefers-reduced-motion: reduce`: sin autoplay de clips, sin parpadeo de REC, sin glitch y sin grano animado.
  - Contraste AA en las etiquetas que van sobre papel kraft (#efe6d2 con texto oscuro).
  - Evitar flashes de más de 3 por segundo en los efectos glitch (criterio WCAG 2.3.1; no lo consulté en esta sesión).
- La disposición "desordenada" puede hacerse con CSS Grid normal y `rotate` + pequeños `translate` por ítem, para que el orden del DOM y del tabulado siga siendo lógico. No conviene usar posiciones absolutas aleatorias, que rompen el orden de lectura y el responsive.

### Gaps
- No encontré (en el presupuesto de búsquedas) webs actuales de marcas de skate con una galería scrapbook/VHS documentada ni artículos de Codrops que traten específicamente este estilo. Merecería una búsqueda manual en Codrops (efectos "VHS", "polaroid"), en CodePen ("vhs overlay", "taped polaroid") y en archivos de la Wayback Machine de sitios de skate de 2000-2005 (p. ej. vídeos de Transworld, 411VM, Alien Workshop).
- La descripción de Bronze 56k se basa en el texto de la página, no en una captura. No se pudo confirmar visualmente si tiene estilo VHS o web 1.0.
- No encontré mediciones del coste de rendimiento de los overlays de grano o scanlines sobre vídeo. Las recomendaciones de rendimiento son inferencias de buenas prácticas generales.
