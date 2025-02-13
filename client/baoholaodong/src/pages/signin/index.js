import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header";
import Footer from '../../components/footer';
import './style.css';
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../../components/Loading/Loading";

const Signin = () => {
    const [formSignin, setFormSignin] = useState({
        email: '',
        password: ''
    });
    const { user,login ,setUser} = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSignin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            var result = await login(formSignin.email, formSignin.password);
            setUser(result);
            if(result.role ==='Admin'){
                navigate('/manager');
            }else{
                navigate("/");
            }
        } catch (err) {
            setError('Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
            console.error(err);
        }finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        console.log('Google Sign-In clicked');
    };

    return (
        <>
            <Loading isLoading={loading} />
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
                    {error && <p className="error-text">{error}</p>}
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
                <button onClick={handleGoogleSignIn} className="google-signin-button">
                    Đăng nhập với Google
                </button>
            </div>
        </>
    );
};

export default Signin;
