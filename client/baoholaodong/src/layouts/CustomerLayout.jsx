import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const CustomerLayout = () => {
    return (
        <div className="h-screen w-full overflow-x-hidden flex flex-col">
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default CustomerLayout;
