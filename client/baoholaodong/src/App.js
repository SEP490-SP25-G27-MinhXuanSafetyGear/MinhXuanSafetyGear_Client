import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginEmployee from './pages/Login';
import Dashboard from './pages/manager/Dashboard';
import About from './pages/About';
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/Logout";

function App() {
    
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginEmployee />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/dashboard"
                    element={<PrivateRoute element={<Dashboard />} roleRequired={['Admin','Manager']} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
