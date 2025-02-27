import { useContext, useEffect, useState } from "react";
import { FaHardHat, FaBolt, FaTint, FaShieldAlt, FaBiohazard, FaFireExtinguisher, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CustomerProductContext } from "../../contexts/CustomerProductContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const [openIndex, setOpenIndex] = useState(null); // State to track which menu item is open
    const { groupCategories } = useContext(CustomerProductContext);
    const [menuItems, setMenuItems] = useState([]); // Initialize menuItems as an empty array
    const navigate = useNavigate(); // Initialize useNavigate

    const handleItemClick = (index, label, event) => {
        if (event.target.classList.contains('arrow-icon')) {
            setOpenIndex(openIndex === index ? null : index); // Toggle the dropdown list
        } else if (label === "Trang Thiết bị bảo hộ") {
            navigate("/products"); // Navigate to ProductList page
        }
    };

    useEffect(() => {
        if (groupCategories.length > 0) {
            const updatedMenuItems = groupCategories.map(group => {
                return {
                    icon: getIconForGroup(group.groupName), // Lấy icon theo nhóm
                    label: group.groupName,
                    subItems: group.categories.map(category => category.categoryName)
                };
            });
            setMenuItems(updatedMenuItems);
        }
    }, [groupCategories]);

    // Hàm trả về icon phù hợp với tên nhóm
    const getIconForGroup = (groupName) => {
        switch (groupName) {
            case "Trang Thiết bị bảo hộ":
                return <FaHardHat />;
            case "An toàn ngành điện":
                return <FaBolt />;
            case "An toàn ngành nước":
                return <FaTint />;
            case "Thiết bị chống ồn":
                return <FaShieldAlt />;
            case "Thiết bị phòng độc":
                return <FaBiohazard />;
            case "Phòng cháy chữa cháy":
                return <FaFireExtinguisher />;
            default:
                return null;
        }
    };

    return (
        <>
            {/* Overlay to darken the rest of the screen */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 sidebar-overlay transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={toggleSidebar}
            ></div>
            {/* Sidebar container */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg sidebar-container transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
                {/* Sidebar header */}
                <div className="siderbar-head text-yellow-500 p-4 flex justify-between items-center">
                    <h2 className="text-lg font-bold">DANH MỤC</h2>
                    <button onClick={toggleSidebar}>
                        <FaTimes size={20} />
                    </button>
                </div>
                {/* Menu items */}
                <ul className="p-4 text-red-700">
                    {menuItems.map((item, index) => (
                        <li key={index} className="flex flex-col">
                            <div className="flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-100" onClick={(event) => handleItemClick(index, item.label, event)}>
                                {item.icon} {item.label}
                                {openIndex === index ? <FaChevronUp className="arrow-icon" /> : <FaChevronDown className="arrow-icon" />}
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
                    <a href="/about" className="cursor-pointer hover:underline block mb-2">Về Bảo hộ lao động Minh Xuân</a>
                    <a href="/blog" className="cursor-pointer hover:underline block mb-2">Kiến thức an toàn lao động</a>
                    <a href="/contact" className="cursor-pointer hover:underline block">Liên hệ chúng tôi</a>
                </div>
                {/* Hotline section */}
                <div className="absolute bottom-0 w-full p-4 bg-gray-100 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-lg">Hotline: 0912.201.309</span>
                </div>
            </div>
        </>
    );
}