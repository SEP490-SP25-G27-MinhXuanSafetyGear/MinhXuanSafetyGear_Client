import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "../pages/register";
import Signin from "../pages/signin";
import Home from "../pages/Home";
import About from "../pages/About";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../pages/manager/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import Users from "../pages/manager/Users";
import {Orders} from "../pages/manager/OrderManager";
import {CreateProduct, Products, UpdateProduct} from "../pages/manager/ProductManager";
import BlogPosts from "../pages/manager/BlogManager/BlogPosts";
import Invoices from "../pages/manager/InvoiceManager/Invoices";
import {Notifications} from "../pages/manager/NotificationManager";
import Settings from "../pages/manager/Settings";
import ProductCategories from "../pages/manager/ProductCategoryManager/ProductCategories";
import React from "react";
import CustomerLayout from "../layouts/CustomerLayout";

const UserRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CustomerLayout/>}>
                    <Route index element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path={"/login"} element={<Signin />} />
                    <Route path="/about" element={<About />} />
                </Route>

            </Routes>
            <Routes>
                <Route
                    path="/manager/*"
                    element={<PrivateRoute element={<AdminLayout />} roleRequired={['Admin', 'Manager']} />}
                >
                    <Route path="users" element={<Users />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="products" element={<Products />} />
                    <Route path="blog-posts" element={<BlogPosts/>} />
                    <Route path="invoices" element={<Invoices />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="createproduct" element={<CreateProduct />} />
                    <Route path="updateproduct/:id" element={<UpdateProduct />} />
                    <Route path="product_categories" element={<ProductCategories />} />
                </Route>
            </Routes>
        </Router>
    )
}
export default UserRouter;