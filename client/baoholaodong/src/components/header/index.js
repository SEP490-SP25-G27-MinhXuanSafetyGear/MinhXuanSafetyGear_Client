import React, { useState } from "react";
import { FaPhoneAlt, FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import "./style.css";

function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <header className="header-gradient shadow">
                <div className="container mx-auto flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <button onClick={toggleSidebar} className="text-white mr-4">
                            {sidebarOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                            <span className="ml-2">Menu</span>
                        </button>
                        <a href="/">
                            <img alt="Company Logo" className="h-16" src={"http://baoholaodongminhxuan.com/images/common/logo1.gif"} />
                        </a>
                        <div className="ml-4">
                            <h1 className="text-xl font-bold text-white">
                                BẢO HỘ LAO ĐỘNG MINH XUÂN
                            </h1>
                            <p className="text-sm text-white">
                                Luôn đem lại an toàn và hoàn hảo nhất cho bạn!
                            </p>
                        </div>
                    </div>
                    <div className="search-container mx-8 flex items-center mt-4">
                        <FaSearch className="text-white h-5 w-5 mr-2" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="relative group contact-info">
                            <div className="flex items-center cursor-pointer">
                                <FaPhoneAlt className="text-white h-6 w-6" />
                                <div className="ml-2">
                                    <p className="text-sm text-white">
                                        Liên hệ
                                    </p>
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold text-white">
                                            0123456789
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="flex items-center cursor-pointer">
                                <FaUser className="text-white h-6 w-6" />
                                <div className="ml-2">
                                    <p className="text-sm text-white">
                                        Thông tin
                                    </p>
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold text-white">
                                            Tài khoản
                                        </p>
                                        <span className="ml-1 text-white">&#9662;</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                <a href="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Đăng ký</a>
                                <a href="/signin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Đăng nhập</a>
                            </div>
                        </div>
                        <div className="relative flex items-center">
                            <div className="relative">
                                <FaShoppingCart className="text-white h-8 w-8 cursor-pointer" />
                                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-block w-4 h-4 bg-white text-red-600 text-xs font-bold rounded-full text-center">3</span>
                            </div>
                            <span className="ml-2 text-lg font-bold text-white">
                                Giỏ hàng
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </>
    );
}

export default Header;