import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header";
import Footer from '../../components/footer';
import axios from 'axios';
import './style.css';

const apiUrl = process.env.REACT_APP_BASE_URL_API;

const Signin = () => {
    const [formSignin, setFormSignin] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/api/authentication/login`, formSignin);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to signin. Please check your credentials.');
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
            <div className="signin-form-container">
                <div className="signin-form-header">
                    <h2>ĐĂNG NHẬP</h2>
                </div>
                <form onSubmit={handleSignin} className="signin-form">
                    <div className="signin-form-group">
                        <input
                            type="email"
                            name="email"
                            value={formSignin.email}
                            onChange={(e) => setFormSignin({ ...formSignin, email: e.target.value })}
                            placeholder="Email"
                        />
                    </div>
                    <div className="signin-form-group">
                        <input
                            type="password"
                            name="password"
                            value={formSignin.password}
                            onChange={(e) => setFormSignin({ ...formSignin, password: e.target.value })}
                            placeholder="Mật khẩu"
                        />
                    </div>
                    <button type="submit" className="signin-submit-button">Đăng nhập</button>
                </form>
                <div className="signin-links">
                    <div className="forgot-password-link">
                        <a href="/forgot-password">Quên mật khẩu?</a>
                    </div>
                    <div className="signin-link">
                        <a href="/register">Chưa có tài khoản?</a>
                    </div>
                </div>
                <div className="or-text">hoặc đăng nhập bằng</div>
                <button
                    onClick={handleGoogleSignIn} className="google-signin-button">
                </button>
            </div>
            <Footer />
        </>
    );
};

export default Signin;