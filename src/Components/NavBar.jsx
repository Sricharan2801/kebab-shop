import React, { useState, useEffect } from 'react';
import Logo from '/logo.webp';
import { navItems } from "../utils/index";
import { FaHamburger, FaTimes, FaShoppingCart, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../utils/CartContext';
import { signOut } from "firebase/auth";
import { auth } from '../utils/Firebase';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../utils/Firebase'; // assuming this is your Firebase Firestore instance
import toast from 'react-hot-toast';
import UpdatePassword from './UpdatePassword';

const NavBar = () => {
    const navigate = useNavigate();
    const { cartItems, currentUser } = useCart();
    const [userInitial, setUserInitial] = useState('');
    const [showNavItems, setShowNavItems] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const data = userDocSnap.data();
                    setUserData(data);

                    // Set initial from displayName or email
                    const userName = data.displayName || data.email;
                    setUserInitial(userName.charAt(0).toUpperCase());
                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchUserData();
    }, [currentUser]);

    const handleNavItemsToggle = () => {
        setShowNavItems(prev => !prev);
        setShowUserProfile(false);
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setShowUserProfile(false);
            navigate("/");
            toast.success("Sign-out successful!");
        } catch (error) {
            console.error("Error signing out:", error);
            toast.error("Sign-out failed. Please try again.");
        }
    };

    const handleUserProfileToggle = () => {
        setShowUserProfile(prev => !prev);
        setShowNavItems(false);
    };

    const closeNavMenu = () => setShowNavItems(false);

    const navigateToPage = (path) => navigate(path);

    const handleChangePassword = () => setShowChangePasswordModal(true);

    return (
        <header className='w-[100vw] flex justify-around items-center absolute z-10 top-0'>
            <div className='lg:w-[10%] w-[30%]'>
                <img src={Logo} alt="brandLogo" className='w-[80%] cursor-pointer' />
            </div>

            {/* Desktop Navigation */}
            <nav className='w-[50%] hidden lg:flex justify-around font-semibold text-lg'>
                {navItems.map((item, index) => (
                    <a key={index} href={item.path} className='hover:font-bold'>{item.name}</a>
                ))}
            </nav>

            <div className='lg:w-[10%] w-[20%] flex gap-2 justify-center items-center'>
                <FaShoppingCart 
                    className="text-3xl text-orange-400 hover:text-orange-600 cursor-pointer"
                    onClick={() => navigateToPage('/cart')} 
                />
                <p className='text-sm font-semibold'>{cartItems.length}</p>
            </div>

            {userInitial ? (
                <div className='lg:w-[20%] w-[30%] flex gap-2 lg:justify-center justify-end items-center cursor-pointer' onClick={handleUserProfileToggle}>
                    <button
                        className="cursor-pointer rounded-full bg-orange-600 text-white flex items-center justify-center w-10 h-10"
                        title="User Profile"
                    >
                        {userInitial}
                    </button>
                    <FaChevronDown />
                </div>
            ) : (
                <button
                    className='lg:w-[10%] w-[30%] font-semibold hover:font-bold hover:text-blue-600'
                    onClick={() => navigateToPage('/sign-in')}
                >
                    Sign in
                </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <div className='w-[30%] lg:hidden flex justify-end items-center'>
                {!showNavItems ? (
                    <FaHamburger
                        className='lg:hidden text-3xl w-[40%] z-10 cursor-pointer text-orange-600'
                        onClick={handleNavItemsToggle}
                    />
                ) : (
                    <FaTimes
                        className='lg:hidden text-3xl w-[40%] z-10 cursor-pointer text-orange-600'
                        onClick={handleNavItemsToggle}
                    />
                )}
            </div>

            {/* Mobile Navigation Menu */}
            {showNavItems && (
                <div className='absolute top-24 right-0 w-[100%] bg-orange-400 rounded-lg'>
                    <nav className='flex flex-col items-center justify-center gap-8 pt-2 pb-2'>
                        {navItems.map((item, index) => (
                            <a 
                                key={index} 
                                href={item.path} 
                                className='hover:font-bold text-white font-semibold text-lg' 
                                onClick={closeNavMenu}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>
            )}

            {/* User Profile Dropdown */}
            {showUserProfile && userData && (
                <div className='absolute top-24 right-0 lg:w-[30%] w-[100%] flex flex-col items-center justify-center gap-5 py-5 rounded-lg text-white bg-orange-400'>
                    <strong className='text-xl'>Hello, {userData.name || userData.email}</strong>
                    <p>{userData.phone}</p>
                    <p className='text-sm'>{userData.email}</p>

                    <button 
                        onClick={handleSignOut} 
                        className='w-[60%] text-black bg-white py-2 rounded-lg'
                    >
                        Sign out
                    </button>

                    <button
                        onClick={handleChangePassword}
                        className="w-[60%] text-black bg-white py-2 rounded-lg mt-2"
                    >
                        Change Password
                    </button>
                </div>
            )}

            {/* Change Password Modal */}
            {showChangePasswordModal && <UpdatePassword onClose={() => setShowChangePasswordModal(false)} />}
        </header>
    );
};

export default NavBar;
