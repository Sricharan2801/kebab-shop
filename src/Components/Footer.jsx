import React from 'react'
import { navItems, footerItems } from "../utils/index"
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { Link, useLocation,useNavigate } from 'react-router-dom'
const Footer = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = () => {
        if (location.pathname === '/all-categories') {
            navigate('/')
            window.scrollTo(0, 0);
        }
    }

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
        <footer className='w-full h-[40vh] bg-black text-white lg:mt-0 mt-2 flex flex-col'>

            <div className='w-full h-[15%] flex items-center justify-center'>
                <h1 className='lg:text-xl md:text-xl sm:text-[0.75rem] font-semibold '> The Best Kebabs in Town, Freshly Grilled Just for You!</h1>
            </div>
            <hr />
            <div className='w-full lg:h-[85%] h-[70%] flex items-center justify-around '>
                <div className='lg:w-[30%] w-[80%] h-[95%] flex flex-col justify-around lg:pl-10 pl-5'>
                    {
                        footerItems.map(item => (
                            <div className='flex items-center gap-4' key={item.id}>
                                <item.icon className='text-2xl' />
                                <p>{item.value}</p>
                            </div>

                        ))
                    }
                </div>

                <div className='lg:w-[30%] w-[15%] h-[95%] flex flex-col justify-around lg:pl-10 pl-0'>
                    <FaFacebook className='footer-socialIcons' onClick={() => handleSocialMedia('facebook')} />
                    <FaInstagram className='footer-socialIcons' onClick={() => handleSocialMedia('instagram')} />
                    <FaYoutube className='footer-socialIcons' onClick={() => handleSocialMedia('youtube')} />
                </div>

                <div className='hidden w-[30%] h-[95%] lg:flex flex-col justify-around pl-10 font-semibold'>
                    {
                        navItems.map(item => (
                            <a key={item.id} href={item.path} onClick={handleClick}>{item.name}</a>
                        ))
                    }
                </div>
            </div>

            <div className='lg:hidden w-[90%] h-[10%] flex justify-around pl-10 font-semibold mt-4'>
                {
                    navItems.map(item => (
                        <a key={item.id} href={item.path} onClick={handleClick}>{item.name}</a>
                )
                )
                }
                
            </div>
        </footer>
    )
}

export default Footer
