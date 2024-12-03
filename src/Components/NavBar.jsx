import React, { useState, useEffect } from 'react';
import Logo from '/logo.webp';
import { navItems } from "../utils/index"
import { FaHamburger, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../utils/CartContext';


const NavBar = () => {
    const [showNavItems, setShowNavItems] = useState(false);
    const navigate = useNavigate()
    const { cartItems } = useCart();

    const handleNavItems = () => {
        setShowNavItems(prev => !prev);
    };

    const closeNavMenu = () => {
        setShowNavItems(false); // Close the menu when a nav item is clicked
    };

    const handleCartNavigation = () => {
        navigate('/cart')
    }

    useEffect(() => {
        const img = new Image();
        img.src = Logo
    }, [])

    return (
        <header className='w-[100vw] flex justify-between items-center absolute z-10 top-0'>
            <div className='lg:w-[10%] w-[30%]'>
                <img src={Logo} alt="brandLogo" className='w-[80%] cursor-pointer' />
            </div>

            {/* Desktop Navigation */}
            <nav className='w-[60%] hidden lg:flex justify-around font-semibold text-lg'>
                {navItems.map((item, index) => (
                    <a key={index} href={item.path} className='hover:font-bold' >{item.name}</a>
                )
                )}
            </nav>

            <div className='lg:w-[20%] w-[60%] flex gap-2 lg:justify-center justify-end items-center'>
               
                <FaShoppingCart className="text-3xl text-orange-400 hover:text-orange-600 cursor-pointer"
                    onClick={handleCartNavigation} />
                <p className='text-sm font-semibold'>{cartItems.length}</p>
            </div>



            {/* Mobile Menu Toggle Button */}
            <div className='w-[40%] lg:hidden flex justify-end items-center'>
                {!showNavItems ? (
                    <FaHamburger
                        className='lg:hidden text-3xl w-[40%] z-10 cursor-pointer text-orange-600'
                        onClick={handleNavItems}
                    />
                ) : (
                    <FaTimes
                        className='lg:hidden text-3xl w-[40%] z-10 cursor-pointer text-orange-600'
                        onClick={handleNavItems}
                    />
                )}
            </div>

            {/* Mobile Navigation Menu */}
            {showNavItems && (
                <div className='absolute top-24 right-0 w-[100%] bg-black bg-opacity-50  '>
                    <nav className='flex flex-col items-center justify-center gap-8 pt-2 pb-2'>
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.path}
                                className='hover:font-bold text-white font-semibold text-lg'
                                onClick={closeNavMenu} // Close the menu on click
                            >
                                {item.name}
                            </a>)
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default NavBar;
