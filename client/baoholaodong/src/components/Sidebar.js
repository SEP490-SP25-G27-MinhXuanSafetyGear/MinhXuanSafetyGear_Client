import { useState } from "react";
import { FaHardHat, FaBolt, FaTint, FaShieldAlt, FaBiohazard, FaFireExtinguisher, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

// Define menu items with sub-items
const menuItems = [
    { icon: <FaHardHat />, label: "Trang thiết bị bảo hộ", subItems: ["Mũ bảo hộ", "Găng tay bảo hộ", "Kính bảo hộ"] },
    { icon: <FaBolt />, label: "An toàn ngành điện", subItems: ["Găng tay cách điện", "Ủng cách điện"] },
    { icon: <FaTint />, label: "An toàn ngành nước", subItems: ["Áo phao", "Phao cứu sinh"] },
    { icon: <FaShieldAlt />, label: "Thiết bị chống ồn", subItems: ["Tai nghe chống ồn", "Nút tai chống ồn"] },
    { icon: <FaBiohazard />, label: "Thiết bị phòng độc", subItems: ["Mặt nạ phòng độc", "Bộ lọc khí độc"] },
    { icon: <FaFireExtinguisher />, label: "Phòng cháy chữa cháy", subItems: ["Bình chữa cháy", "Mặt nạ chống khói"] },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
    const [openIndex, setOpenIndex] = useState(null); // State to track which menu item is open

    const handleItemClick = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle the dropdown list
    };

    return (
        <>
            {/* Overlay to darken the rest of the screen */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={toggleSidebar}
            ></div>
            {/* Sidebar container */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
                {/* Sidebar header */}
                <div className="header-gradient text-yellow-500 p-4 flex justify-between items-center">
                    <h2 className="text-lg font-bold">DANH MỤC</h2>
                    <button onClick={toggleSidebar}>
                        <FaTimes size={20} />
                    </button>
                </div>
                {/* Menu items */}
                <ul className="p-4 text-red-700">
                    {menuItems.map((item, index) => (
                        <li key={index} className="flex flex-col">
                            <div className="flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-100" onClick={() => handleItemClick(index)}>
                                {item.icon} {item.label}
                                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {/* Dropdown list for sub-items */}
                            {openIndex === index && (
                                <ul className="pl-8">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex} className="p-2 hover:bg-gray-200">{subItem}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                {/* Additional links */}
                <div className="p-4 mt-4 border-t text-red-600">
                    <p className="cursor-pointer hover:underline">Về Bảo hộ lao động Minh Xuân</p>
                    <p className="cursor-pointer hover:underline mt-2">Các tin tức</p>
                    <p className="cursor-pointer hover:underline mt-2">Liên hệ chúng tôi</p>
                </div>
                {/* Hotline section */}
                <div className="absolute bottom-0 w-full p-4 bg-gray-100 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-lg">Hotline: 0912.201.309</span>
                </div>
            </div>
        </>
    );
}