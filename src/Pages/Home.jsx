import React, { Suspense, lazy } from 'react'
import CheckPage from '../Sections/CheckPage';
import Loading from '../Components/Loading';

const NavBar = lazy(() => import('../Components/NavBar'))
const LandingPage = lazy(() => import('../Sections/LandingPage'))
const AboutUs = lazy(() => import('../Sections/AboutUs'))
const Menu = lazy(() => import('../Sections/Menu'))
const Contact = lazy(() => import('../Sections/Contact'))
const Map = lazy(() => import('../Sections/Map'))
const Footer = lazy(() => import('../Components/Footer'))

const NavBarWith404 = CheckPage(NavBar);
const LandingPageWith404 = CheckPage(LandingPage);
const AboutUsWith404 = CheckPage(AboutUs);
const MenuWith404 = CheckPage(Menu);
const ContactWith404 = CheckPage(Contact);
const MapWith404 = CheckPage(Map);
const FooterWith404 = CheckPage(Footer);

const Home = () => {

    return (
        <section id='home' className=' w-[100vw]  bg-[#FFFAFA] '>
            <Suspense fallback={<Loading />}>
                <NavBarWith404 />
                <LandingPageWith404 />
                <AboutUsWith404 />
                <MenuWith404 />
                <ContactWith404 />
                <MapWith404 />
                <FooterWith404 />
            </Suspense>
        </section>
    )
}

export default Home
