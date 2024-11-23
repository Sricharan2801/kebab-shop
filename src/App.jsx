import React, { lazy, Suspense } from 'react'
const Home = lazy(() => import('./Sections/Home'))
const AboutUs = lazy(() => import('./Sections/AboutUs'))
const Menu = lazy(() => import('./Sections/Menu'))
const Contact = lazy(() => import('./Sections/Contact'))
const Footer = lazy(() => import('./Components/Footer'))
const Map = lazy(() => import('./Sections/Map'))
import Loading from './Components/Loading'
import CheckPage from "./Components/CheckPage"

const HomeWith404 = CheckPage(Home);
const AboutUsWith404 = CheckPage(AboutUs);
const MenuWith404 = CheckPage(Menu);
const ContactWith404 = CheckPage(Contact);
const MapWith404 = CheckPage(Map);
const FooterWith404 = CheckPage(Footer);

const App = () => {
  return (
    <main className='w-[100vw] '>
      <Suspense fallback={<Loading />}>
        <HomeWith404 />
        <AboutUsWith404 />
        <MenuWith404 />
        <ContactWith404 />
        <MapWith404 />
        <FooterWith404 />
      </Suspense>
    </main>
  )
}

export default App
