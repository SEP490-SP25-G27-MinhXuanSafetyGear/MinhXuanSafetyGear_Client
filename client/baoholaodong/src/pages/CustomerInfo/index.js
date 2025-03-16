import React, { useState } from 'react';
import './style.css';

const CustomerInfo = () => {
    const [formData, setFormData] = useState({
        FullName: '',
        Email: '',
        PasswordHash: '',
        PhoneNumber: '',
        Address: '',
        DateOfBirth: '',
        Gender: null,
        ImageUrl: '',
    });

    const [orders, setOrders] = useState([
        { id: 1, product: 'Dụng cụ chữa cháy', quantity: 2, price: 200000 },
        { id: 2, product: 'Găng bảo hộ', quantity: 1, price: 500000 },
        { id: 3, product: 'Mũ bảo hộ', quantity: 3, price: 900000 },
    ]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Customer Info:', formData);
        // Here you could send the data to your backend to save in the database
    };

    return (
        <div className="customer-info-page">
            <div className="customer-info">
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
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            name="PasswordHash"
                            value={formData.PasswordHash}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
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
                        <label>Giới tính</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="0"
                                    checked={formData.Gender === 0}
                                    onChange={handleChange}
                                /> Nữ
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="1"
                                    checked={formData.Gender === 1}
                                    onChange={handleChange}
                                /> Nam
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>URL ảnh đại diện</label>
                        <input
                            type="text"
                            name="ImageUrl"
                            value={formData.ImageUrl}
                            onChange={handleChange}
                            placeholder="Nhập URL ảnh"
                        />
                    </div>
                    <button type="submit">Xác nhận thông tin</button>
                </form>

                {/* Display Customer Information */}
                {formData.FullName && (
                    <div className="customer-details">
                        <h2>Thông Tin Khách Hàng</h2>
                        <p><strong>Họ và tên:</strong> {formData.FullName}</p>
                        <p><strong>Email:</strong> {formData.Email}</p>
                        <p><strong>Số điện thoại:</strong> {formData.PhoneNumber || 'Chưa cung cấp'}</p>
                        <p><strong>Địa chỉ:</strong> {formData.Address || 'Chưa cung cấp'}</p>
                        <p><strong>Ngày sinh:</strong> {formData.DateOfBirth || 'Chưa cung cấp'}</p>
                        <p><strong>Giới tính:</strong> {formData.Gender === 0 ? 'Nữ' : formData.Gender === 1 ? 'Nam' : 'Chưa chọn'}</p>
                        <p><strong>URL ảnh đại diện:</strong> {formData.ImageUrl || 'Chưa cung cấp'}</p>
                    </div>
                )}

                {/* Display Order List */}
                <div className="order-list">
                    <h2>Danh Sách Đặt Hàng</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Mã Đơn</th>
                            <th>Sản Phẩm</th>
                            <th>Số Lượng</th>
                            <th>Giá</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.product}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price} VND</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo;