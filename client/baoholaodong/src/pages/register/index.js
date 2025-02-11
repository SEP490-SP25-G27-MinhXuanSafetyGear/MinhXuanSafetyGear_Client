import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header";
import Footer from '../../components/footer';
import axios from 'axios';
import './style.css';
const apiUrl = process.env.REACT_APP_BASE_URL_API;

const Register = () => {
    const [formRegister, setFormRegister] = useState({
        fullName: '',
        address: '',
        email: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/api/authentication/register`, formRegister);
            navigate('/signin');
        } catch (err) {
            setError('Failed to register. Please check your details.');
            console.error(err);
        }
    };

    const handleGoogleSignIn = () => {
        // Implement Google Sign-In logic here
        console.log('Google Sign-In clicked');
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <div className="form-header">
                    <h2>Đăng ký</h2>
                </div>
                <div className="login-link">
                    <p>Đã có tài khoản, đăng nhập <a href="/signin">tại đây</a></p>
                </div>
                <form onSubmit={handleRegister} className="form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="fullName"
                            value={formRegister.fullName}
                            onChange={(e) => setFormRegister({ ...formRegister, fullName: e.target.value })}
                            placeholder="Họ và Tên"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="address"
                            value={formRegister.address}
                            onChange={(e) => setFormRegister({ ...formRegister, address: e.target.value })}
                            placeholder="Địa chỉ"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formRegister.email}
                            onChange={(e) => setFormRegister({ ...formRegister, email: e.target.value })}
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="phone"
                            value={formRegister.phone}
                            onChange={(e) => setFormRegister({ ...formRegister, phone: e.target.value })}
                            placeholder="Số điện thoại"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            value={formRegister.password}
                            onChange={(e) => setFormRegister({ ...formRegister, password: e.target.value })}
                            placeholder="Mật khẩu"
                        />
                    </div>
                    <button type="submit" className="submit-button">Đăng ký</button>
                </form>
                <div className="or-text">hoặc đăng nhập bằng</div>
                <button
                    onClick={handleGoogleSignIn} className="google-signin-button">
                </button>
            </div>
            <Footer />
        </>
    );
};

export default Register;