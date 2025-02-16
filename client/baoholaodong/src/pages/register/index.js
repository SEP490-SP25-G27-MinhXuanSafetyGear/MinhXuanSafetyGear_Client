import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header";
import Footer from '../../components/footer';
import axios from 'axios';
import './style.css';
import Loading from "../../components/Loading/Loading";
import RegisterByGoogle from "./RegisterByGoogle";
import {AuthContext} from "../../contexts/AuthContext";
const apiUrl = process.env.REACT_APP_BASE_URL_API;

const Register = () => {
    const [formRegister, setFormRegister] = useState({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        dateOfBirth: "2000-02-15",
        imageUrl: "",
        isEmailVerified: false,
        gender: true
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(AuthContext);
    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(""); // Reset lỗi trước khi gửi request

        try {
            var response = await axios.post(`${apiUrl}/api/user/register-customer`, formRegister);
            if (response.data !== null) {
                navigate(`/verification?email=${response.data.email}&&verifyCode`);
            }
        } catch (err) {
            if (err.response) {
                // Nếu API trả về lỗi có status code
                if (err.response.status === 400) {
                    setError(err.response.data || "Thông tin đăng ký không hợp lệ.");
                } else {
                    setError("Có lỗi xảy ra. Vui lòng thử lại.");
                }
            } else if (err.request) {
                // Nếu không có phản hồi từ server
                setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.");
            } else {
                // Các lỗi khác
                setError("Lỗi không xác định.");
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Loading isLoading={isLoading}/>
            <div className="form-container">
                <div className="form-header">
                    <h2>Đăng ký</h2>
                </div>
                <div className="login-link">
                    <p>Đã có tài khoản, đăng nhập <a href="/login">tại đây</a></p>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form className="form">
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
                            name="phoneNumber"
                            value={formRegister.phoneNumber}
                            onChange={(e) => setFormRegister({ ...formRegister, phoneNumber: e.target.value })}
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
                    <button type="button" onClick={(e)=>{handleRegister(e)}} className="submit-button">Đăng ký</button>
                </form>
                <div className="or-text">hoặc đăng nhập bằng</div>
                <RegisterByGoogle setUserData={setUser}/>
            </div>
        </>
    );
};

export default Register;