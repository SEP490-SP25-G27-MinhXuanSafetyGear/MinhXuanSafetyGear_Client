import React, { useState, useEffect, useContext } from "react";
import { FaPhoneAlt, FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import CartDropdown from "../Cartdropdown/CartDropdown";
import "./style.css";
import { AuthContext } from "../../contexts/AuthContext";

function Header({ cartItems, removeFromCart, updateCartItemQuantity, showToast }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [search, setSearch] = useState("");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const dropdownTimeout = React.useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sidebarOpen) {
                setIsScrolled(window.scrollY > 50);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sidebarOpen]);

    useEffect(() => {
        if (cartItems) {
            setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
        }
    }, [cartItems]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search) navigate(`/products?search=${search}`);
    };

    const showDropdown = () => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setDropdownVisible(true);
    };

    const hideDropdown = () => {
        dropdownTimeout.current = setTimeout(() => {
            setDropdownVisible(false);
        }, 200);
    };

    const location = useLocation();
    const isCartPage = location.pathname === "/cart" || location.pathname === "/confirm-order";
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className={`header ${isScrolled ? "scrolled" : ""}`}>
            <div className="header-content">
                <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                    <span>Menu</span>
                </button>

                <a href="/" className="logo">
                    <img
                        src="http://baoholaodongminhxuan.com/images/common/logo1.gif"
                        alt="Company Logo"
                    />
                    <div className="company-info">
                        <h1>BẢO HỘ LAO ĐỘNG MINH XUÂN</h1>
                        <p>Luôn đem lại an toàn và hoàn hảo nhất cho bạn!</p>
                    </div>
                </a>

                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm sản phẩm..."
                    />
                </form>

                <div className="actions">
                    <div className="contact">
                        <FaPhoneAlt />
                        <span>0912.201.309</span>
                    </div>
                    <div className="user" onClick={() => !user && navigate("/login")}>
                        {user && user.imageUrl ? (
                            <img src={user.imageUrl} alt="User Avatar"  className="h-8 w-8 rounded-full object-cover" />
                        ) : (
                            <FaUser />
                        )}
                        <div className="user-text">
                            <span>Thông tin</span>
                            <span>Tài khoản</span>
                        </div>
                        <div className="user-dropdown">
                            {user ? (
                                <>
                                    <a href={`/order-history/${user.userId}`}>Đơn hàng</a>
                                    <a href="/logout">Đăng xuất</a>
                                </>
                            ) : (
                                <>
                                    <a href="/register">Đăng ký</a>
                                    <a href="/login">Đăng nhập</a>
                                </>
                            )}
                        </div>
                    </div>
                    <div
                        className="cart-wrapper"
                        onMouseEnter={isDesktop && !isCartPage ? showDropdown : undefined}
                        onMouseLeave={isDesktop && !isCartPage ? hideDropdown : undefined}
                    >
                        <div className="cart" onClick={() => navigate("/cart")}>
                            <FaShoppingCart />
                            <span className="cart-count">{cartCount}</span>
                        </div>

                        {isDesktop && !isCartPage && dropdownVisible && (
                            <CartDropdown
                                cartItems={cartItems}
                                removeFromCart={removeFromCart}
                                updateCartItemQuantity={updateCartItemQuantity}
                                showToast={showToast}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </header>
    );
}

export default Header;