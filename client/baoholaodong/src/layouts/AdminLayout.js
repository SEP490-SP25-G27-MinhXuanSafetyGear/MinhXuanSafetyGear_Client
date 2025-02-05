import React, {useState, useMemo, useContext} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    Users,
    ShoppingBag,
    Package,
    FileText,
    Bell,
    Settings,
    LayoutDashboard,
    Receipt,
    LogOut,
    Menu,
    ChevronLeft,
} from 'lucide-react';
import { ProductContext } from "../contexts/ProductContext";
const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navItems = useMemo(
        () => [
            { path: '/manager/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { path: '/manager/users', icon: Users, label: 'Users' },
            { path: '/manager/orders', icon: ShoppingBag, label: 'Orders' },
            { path: '/manager/products', icon: Package, label: 'Products' },
            { path: '/manager/blog-posts', icon: FileText, label: 'Blog Posts' },
            { path: '/manager/invoices', icon: Receipt, label: 'Invoices' },
            { path: '/manager/notifications', icon: Bell, label: 'Notifications' },
            { path: '/manager/settings', icon: Settings, label: 'Settings' },
        ],
        []
    );
    
    return (
        <div className="flex h-screen bg-gray-100">
            <div className={`${
                isCollapsed ? 'w-16' : 'w-64'
            } bg-white shadow-lg transition-all duration-300 z-20`}>
                <div className="p-4 border-b flex justify-between items-center">
                    {!isCollapsed && (
                        <h1 className="text-2xl font-bold text-gray-800">MinhXuan Admin</h1>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                    >
                        {isCollapsed ? <Menu className="w-5 h-5"/> : <ChevronLeft className="w-5 h-5"/>}
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <button
                                    onClick={() => navigate(item.path)}
                                    className={`flex items-center p-2 rounded-lg ${
                                        location.pathname === item.path
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5"/>
                                    {!isCollapsed && <span className="ml-3">{item.label}</span>}
                                </button>
                            </li>
                        ))}
                        <li className="mt-auto">
                            <button
                                onClick={() => navigate('/login')}
                                className="flex items-center p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                                <LogOut className="w-5 h-5"/>
                                {!isCollapsed && <span className="ml-3">Logout</span>}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
                    <div className="flex items-center justify-between px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {navItems.find((item) => location.pathname.includes(item.path))?.label}
                        </h2>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-500 hover:text-gray-700">
                                <Bell className="w-6 h-6"/>
                            </button>
                            <div className="flex items-center space-x-2">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="Admin"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="text-sm font-medium text-gray-700">Admin User</span>
                            </div>
                        </div>
                    </div>
                </header>
                
                <main className="pt-20 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
