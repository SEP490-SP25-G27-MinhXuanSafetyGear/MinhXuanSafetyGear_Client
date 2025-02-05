import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminLayout from './layouts/AdminLayout';
import { Orders, Products, BlogPosts, Invoices, Notifications, Settings, Users, CreateProduct } from './pages/manager';
import UpdateProduct from './pages/manager/UpdateProduct';
import { ProductProvider } from './contexts/ProductContext'; // Import ProductProvider

function App() {
    return (
        <Router>
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
                    </Route>
                </Routes>
        </Router>
    );
}

export default App;
