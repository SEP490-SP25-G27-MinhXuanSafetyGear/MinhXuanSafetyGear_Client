import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../pages/register";
import Signin from "../pages/signin";
import Home from "../pages/Home";
import About from "../pages/About";
import BlogList from "../pages/BlogList";
import PrivateRoute from "../components/PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import Users from "../pages/manager/Users/Users";
import { Orders } from "../pages/manager/OrderManager";
import { CreateProduct, Products, UpdateProduct } from "../pages/manager/ProductManager";
import { UpdateBlogs, CreateBlogs, BlogPosts } from "../pages/manager/BlogManager";
import Invoices from "../pages/manager/InvoiceManager/Invoices";
import { Notifications } from "../pages/manager/NotificationManager";
import Settings from "../pages/manager/Settings";
import ProductCategories from "../pages/manager/ProductCategoryManager/ProductCategories";
import CustomerLayout from "../layouts/CustomerLayout";
import Cart from "../pages/Cart";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetails";
import { CustomerProductProvider } from "../contexts/CustomerProductContext";
import { BlogPostProvider } from "../contexts/BlogPostContext";
import { AdminProductProvider } from "../contexts/AdminProductContext";
import Taxes from "../pages/manager/TaxManager";
import VerificationPage from "../pages/register/Verification";
import Logout from "../pages/Logout";
import { AdminUserContextProvider } from "../contexts/AdminUserContext";
import Dashboard from "../pages/manager/Dashboard";
import ScrollToTop from "../components/ScrollToTop";
import { Error403, Error404, Error503 } from "../pages/Errors";
import Contact from "../pages/Contact";
import CustomerInfo from "../pages/CustomerInfo";
import Checkout from "../pages/Checkout";
import ProductListByCategory from "../pages/ProductList/ProductListByCategory";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import Employees from "../pages/manager/EmployeeManager";
import CreateEmployee from "../pages/manager/EmployeeManager/CreateEmployee";
import UpdateEmployee from "../pages/manager/EmployeeManager/UpdateEmployee";
import CreateOrder from "../pages/manager/OrderManager/CreateOrder";
import OrderDetail from "../pages/manager/OrderManager/OrderDetail";
import { ConfirmOrder } from "../pages/ConfirmOrder";
import ProductVariantSelector from "../pages/ProductDetails/ProductVariantSelector";
import BlogDetail from "../pages/BlogDetail";
import getUserLanguage from "../utils/getUserLanguage";
import { translateText } from "../utils/translate";

const UserRouter = () => {
    const [translations, setTranslations] = useState({
        home: "Trang chủ",
        about: "Giới thiệu",
        register: "Đăng ký",
        login: "Đăng nhập",
        cart: "Giỏ hàng",
    });

    const [isTranslated, setIsTranslated] = useState(false);

    useEffect(() => {
        const fetchTranslations = async () => {
            const lang = await getUserLanguage();
            console.log("🌍 Ngôn ngữ phát hiện:", lang);

            // Nếu đã là tiếng Việt, không cần dịch
            if (lang === "vi") {
                console.log("✅ Ngôn ngữ đã là tiếng Việt, không cần dịch.");
                return;
            }

            console.log(`🔄 Dịch từ tiếng Việt sang ${lang}...`);

            // Dịch tất cả nội dung cùng lúc
            const [translatedHome, translatedAbout, translatedRegister, translatedLogin, translatedCart] =
                await Promise.all([
                    translateText("Trang chủ", lang),
                    translateText("Giới thiệu", lang),
                    translateText("Đăng ký", lang),
                    translateText("Đăng nhập", lang),
                    translateText("Giỏ hàng", lang),
                ]);

            setTranslations({
                home: translatedHome,
                about: translatedAbout,
                register: translatedRegister,
                login: translatedLogin,
                cart: translatedCart,
            });

            setIsTranslated(true);

            console.log("✅ Dịch hoàn tất:", {
                home: translatedHome,
                about: translatedAbout,
                register: translatedRegister,
                login: translatedLogin,
                cart: translatedCart,
            });
        };

        fetchTranslations();
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/403" element={<Error403 />} />
                <Route path="/503" element={<Error503 />} />
                <Route path="/404" element={<Error404 />} />
                <Route path="*" element={<Error404 />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                    path="/"
                    element={
                        <CustomerProductProvider>
                            <CustomerLayout translations={translations} isTranslated={isTranslated} />
                        </CustomerProductProvider>
                    }
                >
                    <Route index element={<Home translations={translations} />} />
                    <Route path="/register" element={<Register translations={translations} />} />
                    <Route path="/login" element={<Signin translations={translations} />} />
                    <Route path="/cart" element={<Cart translations={translations} />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/about" element={<About translations={translations} />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/verification" element={<VerificationPage />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/customerInfo" element={<CustomerInfo />} />
                    <Route path="/products/:group/:cate/:slug" element={<ProductListByCategory />} />
                    <Route path="/category/:categoryId" element={<ProductListByCategory />} />
                    <Route path="confirm-order" element={<ConfirmOrder />} />
                    <Route path="/blogdetails" element={<BlogDetail />} />
                </Route>
                <Route path="/demo" element={<ProductVariantSelector />} />
                {/* Admin Routes */}
                <Route
                    path="/manager"
                    element={
                        <AdminProductProvider>
                            <BlogPostProvider>
                                <AdminUserContextProvider>
                                    <PrivateRoute element={<AdminLayout />} roleRequired={['Admin', 'Manager']} />
                                </AdminUserContextProvider>
                            </BlogPostProvider>
                        </AdminProductProvider>
                    }
                >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="create-employee" element={<CreateEmployee />} />
                    <Route path="update-employee" element={<UpdateEmployee />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="create-order" element={<CreateOrder />} />
                    <Route path="order-detail/:id" element={<OrderDetail />} />
                    <Route path="products" element={<Products />} />
                    <Route path="blog-posts" element={<BlogPosts />} />
                    <Route path="create-blog" element={<CreateBlogs />} />
                    <Route path="update-blog/:id" element={<UpdateBlogs />} />
                    <Route path="invoices" element={<Invoices />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="createproduct" element={<CreateProduct />} />
                    <Route path="update-product/:id/:slug" element={<UpdateProduct />} />
                    <Route path="product_categories" element={<ProductCategories />} />
                    <Route path="taxes" element={<Taxes />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default UserRouter;
