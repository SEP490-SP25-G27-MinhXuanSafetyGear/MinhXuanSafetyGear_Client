import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from "./pages/register";
import Signin from "./pages/signin";
import Dashboard from './pages/manager/Dashboard';
import About from './pages/About';
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/Logout";
import './App.css';
import AdminLayout from './layouts/AdminLayout';
import { Orders, Products, BlogPosts, Invoices, Notifications, Settings, Users, CreateProduct } from './pages/manager';
import UpdateProduct from './pages/manager/UpdateProduct';
import { ProductProvider } from './contexts/ProductContext';
import ProductCategories from "./pages/manager/ProductCategories"; // Import ProductProvider

function App() {
    
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path={"/signin"} element={<Signin />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/dashboard"
                    element={<PrivateRoute element={<Dashboard />} roleRequired={['Admin','Manager']} />}
                />
            </Routes>
            {/* Wrap your routes with ProductProvider */}
                <Routes>
                    <Route path="/manager" element={<AdminLayout />}>
                        <Route path="users" element={<Users />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="products" element={<Products />} />
                        <Route path="blog-posts" element={<BlogPosts />} />
                        <Route path="invoices" element={<Invoices />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="createproduct" element={<CreateProduct />} />
                        <Route path="updateproduct/:id" element={<UpdateProduct />} />
                        <Route path="product_categories" element={<ProductCategories />} />
                    </Route>
                </Routes>
        </Router>
    );
}

export default App;
