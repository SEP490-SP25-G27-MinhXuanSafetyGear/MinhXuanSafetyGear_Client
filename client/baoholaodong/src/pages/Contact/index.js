import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import './style.css';

const API_BASE = process.env.REACT_APP_BASE_URL_API;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });


    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState(null);


    const [contactDetails, setContactDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchContactDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_BASE}/api/contact-details`);
                setContactDetails(response.data);
            } catch (err) {
                setError("Không thể tải thông tin liên hệ, vui lòng thử lại sau!");
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchContactDetails();
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError(null);
        setSubmissionStatus(null);


        try {
            const response = await axios.post(`${API_BASE}/api/contact`, formData);
            console.log("API Response:", response.data);
            setSubmissionStatus("Gửi tin nhắn thành công!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: ""
            });
        } catch (err) {
            console.error("Error submitting form:", err);
            setFormError("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setFormLoading(false);
        }
    };


    if (loading) {
        return <div className="contact-wrapper"><p>Đang tải dữ liệu...</p></div>
    }

    if (error) {
        return <div className="contact-wrapper"><p className="text-red-500">{error}</p></div>;
    }

    if (!contactDetails) {
        return <div className="contact-wrapper"><p>Không tìm thấy thông tin liên hệ.</p></div>;
    }

    return (
        <div className="contact-page" id="yourElementId">
            <div className="contact-container">
                <div className="contact-grid">
                    <div className="contact-info">
                        <h2 className="company-title">CỬA HÀNG BẢO HỘ MINH XUÂN</h2>
                        <p className="company-description">
                            Hiện nay, Minh Xuân là một trong những Công ty lớn cung cấp và sản xuất tất cả các trang thiết bị bảo hộ, an toàn cho người lao động trên toàn quốc.
                        </p>


                        <div className="contact-details">
                            <div className="contact-item">
                                <MapPin className="contact-icon" size={20} />
                                <span>Địa chỉ: {contactDetails.address}</span>
                            </div>
                            <div className="contact-item">
                                <Phone className="contact-icon" size={20} />
                                <span>Hotline: {contactDetails.phone}</span>
                            </div>
                            <div className="contact-item">
                                <Mail className="contact-icon" size={20} />
                                <span>Email: {contactDetails.email}</span>
                            </div>
                        </div>


                        <div className="contact-form-container">
                            <h3 className="form-title">GỬI THẮC MẮC CHO CHÚNG TÔI</h3>
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Họ và tên"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    disabled={formLoading}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={formLoading}
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Điện thoại"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    disabled={formLoading}
                                />
                                <textarea
                                    name="message"
                                    placeholder="Nội dung"
                                    rows={6}
                                    className="form-textarea"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    disabled={formLoading}
                                />
                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={formLoading}
                                >
                                    {formLoading ? "Đang gửi..." : "Gửi tin nhắn"}
                                </button>
                            </form>
                            {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
                            {formError && <p className="error-message">{formError}</p>}
                        </div>
                    </div>


                    <div className="map-container">
                        <iframe
                            title="Minh Xuan Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6963477031385!2d105.84772731476292!3d21.023821393283267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a3f!2zNCBIYWkgQsOgIFRyxrBuZywgVHLhuqduIEjGsG5nIMSQ4bqhbywgSG_DoG4gS2nhur9tLCBIw6AgTuG7mWksIFZp4buHdC BOYW0!5e0!3m2!1svi!2s!4v1645167116886!5m2!1svi!2s"
                            className="google-map"
                            referrerPolicy="no-referrer-when-downgrade"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
