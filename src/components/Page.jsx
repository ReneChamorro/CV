import { useEffect, useRef, ViewTransition } from 'react'

// El cambio de ruta lo anima el navegador (View Transitions); las intros de cada ámbito las hace GSAP.
export default function Page({ title, className, children }) {
  const main = useRef()

  useEffect(() => {
    document.title = title ? `${title} · René Chamorro` : 'René Chamorro'
    window.scrollTo(0, 0)
    // Al cambiar de ruta, el lector de pantalla empieza en el contenido nuevo (salvo que haya un diálogo abierto).
    if (!document.querySelector('[aria-modal="true"]')) main.current.focus({ preventScroll: true })
  }, [title])

  return (
    <ViewTransition enter="page-in" exit="page-out">
      <main ref={main} tabIndex={-1} className={className} style={{ outline: 'none' }}>
        {children}
      </main>
    </ViewTransition>
  )
}
