import React, { useState, useEffect } from 'react';
import Logo from '/logo.webp';
import UpdatePassword from './UpdatePassword';
import NavItems from './NavItems';
import NavBtns from './Buttons/NavBtns';
import { FaHamburger, FaTimes, FaShoppingCart, FaChevronDown, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../utils/CartContext';
import { signOut } from "firebase/auth";
import { auth, db } from '../utils/Firebase';
import { doc, getDoc } from "firebase/firestore";
import toast from 'react-hot-toast';

const NavBar = () => {
    const navigate = useNavigate();
    const { cartItems, currentUser } = useCart();
    const [userInitial, setUserInitial] = useState('');
    const [showNavItems, setShowNavItems] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleNavItemsToggle = () => setShowNavItems(prev => !prev);
    const navigateToPage = (path) => navigate(path);
    const handleChangePassword = () => setShowChangePasswordModal(true);
    const handleUserProfileToggle = () => {
        setShowUserProfile(prev => !prev);
        setShowNavItems(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const data = userDocSnap.data();
                    setUserData(data);

                    const userName = data.displayName || data.email;
                    setUserInitial(userName.charAt(0).toUpperCase());
                } else {
                    console.log("No such document!");
                }
            }
        };
        fetchUserData();
    }, [currentUser]);

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

    return (
        <header className='w-[100vw] flex justify-around items-center absolute z-10 top-0'>
            <div className='lg:w-[10%] w-[30%]'>
                <img src={Logo} alt="brandLogo" className='w-[80%] cursor-pointer' />
            </div>

            {/* Desktop Navigation */}
            <nav className='w-[50%] hidden lg:flex justify-around '>
                <NavItems className={'hover:font-bold  font-lato text-lg'} />
            </nav>

            <div className='lg:w-[10%] w-[20%] flex gap-2 justify-center items-center'>
                <FaShoppingCart
                    className="text-3xl text-orange-400 hover:text-orange-600 cursor-pointer"
                    onClick={() => navigateToPage('/cart')}
                />
                <p className='text-sm font-semibold'>{cartItems.length}</p>
            </div>

            {/* Sign-In Button */}
            {!currentUser && (
                <NavBtns
                    className={'lg:w-[10%] w-[30%] font-semibold hover:font-bold hover:text-blue-600'}
                    onClick={() => navigateToPage('/sign-in')}
                >
                    <span>Sign In</span>
                </NavBtns>
            )}

            {/* User Profile or Hamburger */}
            {currentUser ? (
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
                <div className='w-[30%] lg:hidden flex justify-end items-center'>
                    {!showNavItems ? (
                        <FaHamburger
                            className='nav-icon'
                            onClick={handleNavItemsToggle}
                        />
                    ) : (
                        <FaTimes
                            className='nav-icon'
                            onClick={handleNavItemsToggle}
                        />
                    )}
                </div>
            )}

            {/* Mobile Navigation */}
            {showNavItems && (
                <div className='absolute top-0 right-0 w-[100%] h-[100vh] flex flex-col gap-8 bg-white slide-animation-right'>
                    <nav className='flex flex-col gap-8 px-8 mt-10'>
                        <NavItems setShowNavItems={setShowNavItems} className={'hover:font-bold  font-lato text-lg'} />
                    </nav>
                </div>
            )}

            {/* User Profile Dropdown */}
            {showUserProfile && userData && (
                <div className='absolute top-0 right-0 w-[100%] h-[100vh] flex flex-col gap-8 bg-white slide-animation-right'>
                    <div className='flex flex-col gap-2 bg-[#a20202] py-5  px-5 text-white'>
                        <FaArrowLeft className='text-xl cursor-pointer ' onClick={() => setShowUserProfile(false)} />
                        <strong className='text-2xl'>Hello, {userData.name || userData.email}</strong>
                        <p>{userData.phone}</p>
                        <p className='text-sm'>{userData.email}</p>
                    </div>

                    <nav className='lg:hidden flex flex-col gap-8 px-5'>
                        <NavItems setShowNavItems={setShowNavItems} className={'hover:font-bold  font-lato text-lg'} />
                    </nav>

                    <NavBtns className={'profile-btns'} onClick={handleSignOut}> <span>Sign Out</span> </NavBtns>
                    <NavBtns className={'profile-btns'} onClick={handleChangePassword}> <span>Change Password</span> </NavBtns>
                </div>
            )}
            {/* Change Password Modal */}
            {showChangePasswordModal && <UpdatePassword onClose={() => setShowChangePasswordModal(false)} />}
        </header>
    );
};

export default NavBar;
