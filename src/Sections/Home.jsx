import React from 'react'
import NavBar from '../Components/NavBar'
import LandingImage from "../assets/landingImage.png"



const Home = () => {
    return (
        <section id='home' className='relative w-full h-[100vh] '>
            <NavBar />

            <div className='relative w-full lg:h-[80%] h-[90%] lg:top-[20%] top-[10%] flex lg:flex-row flex-col'>
                <div className='lg:w-1/2 w-full h-full'>
                    <h1 className='lg:text-7xl text-6xl font-bold font-mono text-yellow-600 pl-10 pt-20 tracking-widest'>
                        Zesty Kebabs
                    </h1>

                    <h2 className='text-3xl font-bold font-sans pl-10 pt-4'>
                        Delicious, Authentic, and Freshly Made Kebabs in Ballarat Central VIC 
                    </h2>

                    <p className='lg:text-xl text-sm font-normal pl-10 pt-4'>
                        Experience the best kebabs in Ballarat Central VIC , made daily with quality ingredients and bursting with flavor. Visit us at Zesty Kebabs for a satisfying meal!
                    </p>
                </div>

                <div className='lg:w-1/2 w-full  h-full flex items-center justify-center '>
                    <img src={LandingImage} alt="" className='lg:w-[80%] w-[95%] ' />
                </div>
            </div>

        </section>
    )
}

export default Home
