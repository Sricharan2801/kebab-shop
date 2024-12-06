import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './Firebase';

// Create the context
const CartContext = createContext();

// Context provider
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load from localStorage on initial render
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        return storedCartItems || [];
    });

    const [currentUser, setCurrentUser] = useState(null);
 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });
        return unsubscribe; // Cleanup the listener on unmount
    }, []);

    // Save to localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{
            cartItems, setCartItems, currentUser, setCurrentUser
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
