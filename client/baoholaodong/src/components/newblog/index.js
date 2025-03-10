import React, { useState } from 'react';
import './style.css';
import { FaArrowRight, FaArrowLeft, FaClock } from 'react-icons/fa';

const NewBlog = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const blogs = [
        {
            title: "Tầm quan trọng của đồ bảo hộ lao động",
            description: "Đồ bảo hộ lao động giúp người lao động tránh được nguy hiểm từ tai nạn lao động như chấn thương, bỏng, hay ngộ độc. Việc trang bị đầy đủ đồ bảo hộ như mũ, găng tay, áo chống cháy là điều bắt buộc.",
            image: "https://baoholaodonglasa.com/wp-content/uploads/2021/04/thiet-bi-bao-ho-lao-dong.webp",
            date: "06/09/2024"
        },
        {
            title: "Tầm quan trọng của đồ bảo hộ lao động",
            description: "Đồ bảo hộ lao động giúp người lao động tránh được nguy hiểm từ tai nạn lao động như chấn thương, bỏng, hay ngộ độc. Việc trang bị đầy đủ đồ bảo hộ như mũ, găng tay, áo chống cháy là điều bắt buộc.",
            image: "https://baoholaodonglasa.com/wp-content/uploads/2021/04/thiet-bi-bao-ho-lao-dong.webp",
            date: "06/09/2024"
        },
        {
            title: "Tầm quan trọng của đồ bảo hộ lao động",
            description: "Đồ bảo hộ lao động giúp người lao động tránh được nguy hiểm từ tai nạn lao động như chấn thương, bỏng, hay ngộ độc. Việc trang bị đầy đủ đồ bảo hộ như mũ, găng tay, áo chống cháy là điều bắt buộc.",
            image: "https://baoholaodonglasa.com/wp-content/uploads/2021/04/thiet-bi-bao-ho-lao-dong.webp",
            date: "06/09/2024"
        },
        {
            title: "Tầm quan trọng của đồ bảo hộ lao động",
            description: "Đồ bảo hộ lao động giúp người lao động tránh được nguy hiểm từ tai nạn lao động như chấn thương, bỏng, hay ngộ độc. Việc trang bị đầy đủ đồ bảo hộ như mũ, găng tay, áo chống cháy là điều bắt buộc.",
            image: "https://baoholaodonglasa.com/wp-content/uploads/2021/04/thiet-bi-bao-ho-lao-dong.webp",
            date: "06/09/2024"
        },
        {
            title: "Tầm quan trọng của đồ bảo hộ lao động",
            description: "Đồ bảo hộ lao động giúp người lao động tránh được nguy hiểm từ tai nạn lao động như chấn thương, bỏng, hay ngộ độc. Việc trang bị đầy đủ đồ bảo hộ như mũ, găng tay, áo chống cháy là điều bắt buộc.",
            image: "https://baoholaodonglasa.com/wp-content/uploads/2021/04/thiet-bi-bao-ho-lao-dong.webp",
            date: "06/09/2024"
        },
        {
            title: "Tầm quan trọng của đồ bảo hộ lao động",
            description: "Đồ bảo hộ lao động giúp người lao động tránh được nguy hiểm từ tai nạn lao động như chấn thương, bỏng, hay ngộ độc. Việc trang bị đầy đủ đồ bảo hộ như mũ, găng tay, áo chống cháy là điều bắt buộc.",
            image: "https://baoholaodonglasa.com/wp-content/uploads/2021/04/thiet-bi-bao-ho-lao-dong.webp",
            date: "06/09/2024"
        },
        {
            title: "Tầm quan trọng của đồ bảo hộ lao động",
            description: "Đồ bảo hộ lao động giúp người lao động tránh được nguy hiểm từ tai nạn lao động như chấn thương, bỏng, hay ngộ độc. Việc trang bị đầy đủ đồ bảo hộ như mũ, găng tay, áo chống cháy là điều bắt buộc.",
            image: "https://baoholaodonglasa.com/wp-content/uploads/2021/04/thiet-bi-bao-ho-lao-dong.webp",
            date: "06/09/2024"
        },
        // ... (other blog data)
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, blogs.length - 1));
    };

    return (
        <section className="new-blog-section">
            <div className="new-blog-title-container">
                <h2 className="new-blog-title">KIẾN THỨC AN TOÀN LAO ĐỘNG</h2>
                <div className="new-blog-navigation">
                    <button onClick={handlePrev} disabled={currentIndex === 0} className="new-blog-nav-button">
                        <FaArrowLeft />
                    </button>
                    <button onClick={handleNext} disabled={currentIndex >= blogs.length - 1} className="new-blog-nav-button">
                        <FaArrowRight />
                    </button>
                </div>
            </div>
            <div className="new-blog-list">
                {blogs.slice(currentIndex, currentIndex + 4).map((blog, index) => (
                    <div key={index} className="new-blog-item">
                        <div className="new-blog-image-container">
                            <img src={blog.image} alt={blog.title} className="new-blog-image" />
                            <div className="new-blog-date">
                                <FaClock className="new-blog-date-icon" />
                                <div className="new-blog-date-text">{blog.date}</div>
                            </div>
                        </div>
                        <div className="new-blog-content">
                            <h3 className="new-blog-item-title">{blog.title}</h3>
                            <p className="new-blog-description">{blog.description}</p>
                        </div>
                        <div className="new-blog-read-more">
                            <button className="new-blog-read-more-button">
                                <div className="new-blog-read-more-text">Xem chi tiết <FaArrowRight className="inline" /></div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewBlog;