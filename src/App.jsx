import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { SECTIONS } from './sections'
import Home from './sections/Home/Home'
import Onboarding from './components/Onboarding'
import SectionSwipe from './components/SectionSwipe'

// Cada ámbito se carga aparte (con sus fuentes); la portada lo precarga al pasar el cursor.
const pages = SECTIONS.map((section) => ({ ...section, Component: lazy(section.load) }))

export default function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          {pages.map(({ id, path, Component }) => (
            <Route key={id} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <SectionSwipe />
      <Onboarding />
    </>
  )
}
