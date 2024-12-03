import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const CartContext = createContext();

// Context provider
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load from localStorage on initial render
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        return storedCartItems || [];
    });

    // Save to localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
