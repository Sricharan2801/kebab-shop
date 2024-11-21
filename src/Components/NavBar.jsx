import React, { useState } from 'react';
import Logo from '/brandLogo.jpeg';
import {navItems} from "../utils/index"
import { FaHamburger, FaTimes } from 'react-icons/fa';

const NavBar = () => {
    const [showNavItems, setShowNavItems] = useState(false);

    const handleNavItems = () => {
        setShowNavItems(prev => !prev);
    };

    const closeNavMenu = () => {
        setShowNavItems(false); // Close the menu when a nav item is clicked
    };

    return (
        <header className='w-[100vw] flex justify-between items-center absolute z-10 top-2'>
            <div className='w-[50%]'>
                <img src={Logo} alt="brandLogo" className='pl-10 w-[12rem] h-[6rem] cursor-pointer' />
            </div>

            {/* Desktop Navigation */}
            <nav className='w-[50%] hidden lg:flex justify-around font-semibold text-lg'>
                {navItems.map((item, index) => (
                    <a key={index} href={item.path} className='hover:font-bold'>
                        {item.name}
                    </a>
                ))}
            </nav>

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
                <div className='absolute top-24 right-0 w-[50%] bg-black bg-opacity-50'>
                    <nav className='flex flex-col items-center justify-center gap-8 pt-2 pb-2'>
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.path}
                                className='hover:font-bold text-white font-semibold text-lg'
                                onClick={closeNavMenu} // Close the menu on click
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default NavBar;
