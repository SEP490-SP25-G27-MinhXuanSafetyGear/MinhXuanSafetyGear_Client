import React, { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Toast from "../components/toast";
import { CartContext } from "../contexts/CartContext";

const CustomerLayout = () => {
    const { addToCart, cartItems, setCartItems, showToast, toast } = useContext(CartContext);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(savedCartItems);
        setCartCount(savedCartItems.length);
    }, [setCartItems]);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const handleToastClose = () => {
        showToast(null);
    };

    return (
        <div className="main-container">
            <Header cartCount={cartCount} cartItems={cartItems} showToast={showToast} />
            <main className="main-content">
                <Outlet context={{ addToCart }} />
            </main>
            <Footer />
            {toast && (
                <Toast message={toast} onClose={handleToastClose} />
            )}
        </div>
    );
};

export default CustomerLayout;