import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import axios from "axios";
import './style.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_BASE = process.env.REACT_APP_BASE_URL_API;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Bắt đầu gửi dữ liệu
        setError(null); // Xóa lỗi cũ
        setSubmissionStatus(null); // Xóa trạng thái cũ

        try {
            // Gửi dữ liệu form đến API
            const response = await axios.post(`${API_BASE}/api/contact/submit`, formData);
            setSubmissionStatus("Form submitted successfully!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (err) {
            setError("Có lỗi xảy ra khi gửi form. Vui lòng thử lại!");
            console.error(err);
        } finally {
            setLoading(false); // Kết thúc gửi dữ liệu
        }
    };

    if (loading) {
        return (
            <div className="blog-detail-wrapper">
                <p>Đang gửi dữ liệu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="blog-detail-wrapper">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="blog-detail-wrapper">
            <div className="blog-detail-container">
                <div className="blog-detail-header">
                    <img
                        src="https://via.placeholder.com/1200x400"
                        alt="Contact Header"
                        className="blog-detail-image"
                    />
                    <div className="blog-detail-meta">
                        <MapPin className="blog-detail-date-icon" size={20} />
                        <span className="blog-detail-date-text">
                            4A, Hai Bà Trưng, Hà Nội
                        </span>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="blog-detail-content">
                    <h1 className="blog-detail-title">
                        CỬA HÀNG BẢO HỘ MINH XUÂN
                    </h1>
                    <div className="blog-detail-body">
                        <p>
                            Hiện nay, Minh Xuân là một trong những Công ty lớn cung cấp và sản xuất tất cả các trang thiết bị bảo hộ, an toàn cho người lao động trên toàn quốc.
                        </p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <Phone className="contact-icon" size={20} />
                                <span>Hotline: 043.987.5343 - 0912.423.042 - 0912.201.309</span>
                            </div>
                            <div className="contact-item">
                                <Mail className="contact-icon" size={20} />
                                <span>Email: minhxuanbh365@gmail.com</span>
                            </div>
                        </div>

                        <div className="contact-form-container">
                            <h3>GỬI THẮC MẮC CHO CHÚNG TÔI</h3>
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Họ và tên"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Điện thoại"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                                <textarea
                                    name="message"
                                    placeholder="Nội dung"
                                    rows={4}
                                    className="form-textarea"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button type="submit" className="submit-button">
                                    Gửi tin nhắn
                                </button>
                            </form>
                            {submissionStatus && (
                                <p className="submission-status">{submissionStatus}</p>
                            )}
                        </div>

                        <div className="map-container">
                            <iframe
                                title="Minh Xuan Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6963477031385!2d105.84772731476292!3d21.023821393283267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a3f!2zNCBIYWkgQsOgIFRyxrBuZywgVHLhuqduIEjGsG5nIMSQ4bqhbywgSG_DoG4gS2nhur9tLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1645167116886!5m2!1svi!2s"
                                className="google-map"
                                referrerPolicy="no-referrer-when-downgrade"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
