import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const CustomerInfo = () => {
    const [formData, setFormData] = useState({
        FullName: '',
        Gender: 1,
        DateOfBirth: '',
        Email: '',
        PhoneNumber: '',
        Address: '',
        ProfileImage: '',
    });


    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const API_BASE = process.env.REACT_APP_BASE_URL_API;


    useEffect(() => {
        fetchOrders();
    }, []);


    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE}/api/orders/get-customer-orders`);
            setOrders(response.data);
        } catch (err) {
            setError('Không thể tải danh sách đơn hàng');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'radio') {
            setFormData({
                ...formData,
                Gender: value === '1' ? 1 : 0,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);


        try {
            const response = await axios.post(`${API_BASE}/api/customer/save-info`, formData);
            console.log('Lưu thông tin khách hàng:', response.data);
            alert('Thông tin đã được lưu thành công!');
        } catch (err) {
            setError('Lỗi khi lưu thông tin khách hàng');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const userProfileImage = formData.ProfileImage || 'logo.gif';

    if (loading) {
        return (
            <div className="customer-info-page">
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="customer-info-page">
                <p className="error-message">{error}</p>
            </div>
        );
    }


    return (
        <div className="customer-info-page">
            <div className="customer-info">
                <div className="breadcrumb">
                    <a href="/">Trang chủ</a> > Thông Tin Khách Hàng
                </div>

                <h1>THÔNG TIN KHÁCH HÀNG</h1>
                <p className="subtitle">Vui lòng điền đầy đủ thông tin đặt hàng</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Họ và tên *</label>
                        <input
                            type="text"
                            name="FullName"
                            value={formData.FullName}
                            onChange={handleChange}
                            placeholder="Nguyen Van A"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Giới tính</label>
                        <div className="gender-options">
                            <label>
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="1"
                                    checked={formData.Gender === 1}
                                    onChange={handleChange}
                                /> Nam
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="0"
                                    checked={formData.Gender === 0}
                                    onChange={handleChange}
                                /> Nữ
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Ngày sinh</label>
                        <input
                            type="date"
                            name="DateOfBirth"
                            value={formData.DateOfBirth}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            type="tel"
                            name="PhoneNumber"
                            value={formData.PhoneNumber}
                            onChange={handleChange}
                            placeholder="0912345678"
                        />
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ *</label>
                        <input
                            type="text"
                            name="Address"
                            value={formData.Address}
                            onChange={handleChange}
                            placeholder="Số nhà, đường, phố..."
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Đang lưu...' : 'Xác nhận thông tin'}
                    </button>
                </form>


                {formData.FullName && (
                    <div className="customer-details">
                        <h2>Thông Tin Khách Hàng</h2>
                        <div className="profile-section">
                            <div className="profile-image">
                                <img
                                    src={userProfileImage}
                                    alt="Profile"
                                    className="profile-img"
                                />
                            </div>
                            <div className="profile-info">
                                <p><strong>Họ và tên:</strong> {formData.FullName}</p>
                                <p><strong>Giới tính:</strong> {formData.Gender === 0 ? 'Nữ' : 'Nam'}</p>
                                <p><strong>Ngày sinh:</strong> {formData.DateOfBirth || 'Chưa cung cấp'}</p>
                                <p><strong>Email:</strong> {formData.Email}</p>
                                <p><strong>Số điện thoại:</strong> {formData.PhoneNumber || 'Chưa cung cấp'}</p>
                                <p><strong>Địa chỉ:</strong> {formData.Address}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="order-list">
                    <h2>Lịch Sử Đặt Hàng</h2>
                    {orders.length === 0 ? (
                        <p>Chưa có đơn hàng nào.</p>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>Mã Đơn Hàng</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Số Lượng</th>
                                <th>Kích Thước</th>
                                <th>Màu Sắc</th>
                                <th>Giảm Giá (%)</th>
                                <th>Giá Sản Phẩm</th>
                                <th>Tổng Giá</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr key={order.OrderId}>
                                    <td>{order.OrderId}</td>
                                    <td>{order.ProductName}</td>
                                    <td>{order.Quantity}</td>
                                    <td>{order.Size || 'Không có'}</td>
                                    <td>{order.Color || 'Không có'}</td>
                                    <td>{order.ProductDiscount ? `${order.ProductDiscount.toFixed(2)}%` : 'Không có'}</td>
                                    <td>{order.ProductPrice.toFixed(2)} VND</td>
                                    <td>{order.TotalPrice.toFixed(2)} VND</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo;
