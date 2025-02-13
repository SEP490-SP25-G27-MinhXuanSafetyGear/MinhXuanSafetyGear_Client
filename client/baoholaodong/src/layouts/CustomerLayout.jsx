import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header"
import Footer from "../components/footer";

const CustomerLayout = () => {
    return (
        <div>
            <Header />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default CustomerLayout;
