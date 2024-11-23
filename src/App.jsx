import React, { lazy, Suspense } from 'react'
const Home = lazy(() => import('./Sections/Home'))
const AboutUs = lazy(() => import('./Sections/AboutUs'))
const Menu = lazy(() => import('./Sections/Menu'))
const Contact = lazy(() => import('./Sections/Contact'))
const Footer = lazy(() => import('./Components/Footer'))
const Map = lazy(() => import('./Sections/Map'))
import Loading from './Components/Loading'


const App = () => {
  return (
    <main className='w-[100vw] '>
      <Suspense fallback={<Loading />}>
        <Home />
        <AboutUs />
        <Menu />
        <Contact />
        <Map />
        <Footer />
      </Suspense>
    </main>
  )
}

export default App
