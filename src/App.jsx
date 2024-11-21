import React from 'react'
import Home from './Sections/Home'
import AboutUs from './Sections/AboutUs'
import Menu from './Sections/Menu'
import Contact from './Sections/Contact'
import Footer from './Components/Footer'


const App = () => {
  return (
    <main className='w-[100vw] '>
      <Home/>
      <AboutUs/>
      <Menu/>
      <Contact/>
      <Footer/>           
    </main>
  )
}

export default App
