import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        console.log(savedCartItems);
        setCartItems(savedCartItems);
        updateTotalPrice(savedCartItems);
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateTotalPrice(cartItems);
    }, [cartItems]);

    const updateTotalPrice = (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        showToast("Sản phẩm đã được thêm vào giỏ hàng");
    };

    const updateCartItemQuantity = (productId, quantity) => {
        setCartItems((prevItems) => {
            return prevItems.map(item =>
                item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
            );
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    };

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, totalPrice, addToCart, updateCartItemQuantity, removeFromCart, showToast, toast }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;