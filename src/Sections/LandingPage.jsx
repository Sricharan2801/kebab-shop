import { useEffect } from 'react'
import LandingImage from "../assets/Images/LandingImage.webp"

const LandingPage = () => {
    useEffect(() => {
        const img = new Image();
        img.src = LandingImage;
    }, [])
    return (
        <section className='w-full h-[100vh]'>
            <div className='relative w-full  lg:h-[80%] h-[90%] lg:top-[20%] top-[10%] flex lg:flex-row flex-col'>
                <div className='lg:w-1/2 w-full h-full'>
                    <h1 className='lg:text-7xl text-6xl font-bold font-openSans text-orange-600 lg:pl-10 pl-7 pt-20 tracking-widest'>
                        Zesty Kebabs
                    </h1>

                    <h2 className='lg:text-3xl text-xl font-bold font-inter lg:pl-10 pl-7 pt-4'>
                        Delicious, Authentic, and Freshly Made Kebabs in Ballarat Central VIC
                    </h2>

                    <p className='lg:text-lg text-lg font-inter lg:pl-10 lg:pr-0 pl-7 pr-2 pt-4'>
                        Experience the best kebabs in Ballarat Central VIC , made daily with quality ingredients and bursting with flavor. Visit us at Zesty Kebabs for a satisfying meal!
                    </p>
                </div>

                <div className='lg:w-1/2  w-full h-full flex-row'>
                    <img src={LandingImage} alt="" className='lg:w-[80%] w-[95%]' />
                </div>
            </div>
        </section>
    )
}

export default LandingPage
