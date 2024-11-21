import React from 'react'
import { navItems } from "../utils/index"
import { FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

const Footer = () => {
    const handleSocialMedia = (platform) => {
        if (platform === 'facebook') {
            window.open('https://www.facebook.com/people/Zestykebabs/61564518779884/', '_blank');
        } else if (platform === 'instagram') {
            window.open('https://www.instagram.com/zesty_kebabs_/', '_blank');
        } else if (platform === 'youtube') {
            window.open('', '_blank');
        }
    }
    return (
        <footer className='w-full h-[40vh] bg-black text-white lg:mt-0 mt-32 flex flex-col'>

            <div className='w-full h-[15%] flex items-center justify-center'>
                <h1 className='lg:text-xl md:text-xl sm:text-sm font-semibold '> The Best Kebabs in Town, Freshly Grilled Just for You!</h1>
            </div>
            <hr />
            <div className='w-full lg:h-[85%] h-[70%] flex items-center justify-around '>

                <div className='lg:w-[30%] w-[80%] h-[95%] flex flex-col justify-around lg:pl-10 pl-5'>
                    <div className='flex items-center gap-4'>
                        <FaEnvelope className='text-2xl' />
                        <p >zestykebabs@gmail.com</p>
                    </div>

                    <div className='flex items-center gap-4'>
                        <FaPhone className='text-2xl' />
                        <p>0466832714</p>
                    </div>

                    <div className='flex items-center gap-4'>
                        <FaLocationDot className='text-2xl' />
                        <p>Ballarat Central VIC, Australia</p>
                    </div>
                </div>

                <div className='lg:w-[30%] w-[15%] h-[95%] flex flex-col justify-around lg:pl-10 pl-0'>
                    <FaFacebook className='footer-socialIcons' onClick={()=>handleSocialMedia('facebook')}/>
                    <FaInstagram className='footer-socialIcons' onClick={()=>handleSocialMedia('instagram')}/>
                    <FaYoutube className='footer-socialIcons' onClick={()=>handleSocialMedia('youtube')}/>
                </div>

                <div className='hidden w-[30%] h-[95%] lg:flex flex-col justify-around pl-10 font-semibold'>
                    {
                        navItems.map(item => (
                            <a key={item.id} href={item.path}>{item.name}</a>
                        ))
                    }
                </div>


            </div>
            
            <div className='lg:hidden w-[90%] h-[10%] flex justify-around pl-10 font-semibold mt-4'>
                {
                    navItems.map(item => (
                        <a key={item.id} href={item.path}>{item.name}</a>

                    ))
                }
            </div>

        </footer>
    )
}

export default Footer