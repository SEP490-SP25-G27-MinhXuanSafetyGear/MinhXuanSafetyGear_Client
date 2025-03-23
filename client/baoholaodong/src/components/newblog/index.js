import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { FaArrowRight, FaArrowLeft, FaClock } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sliderRef = useRef(null);

    // 🔧 Hàm xử lý loại bỏ HTML và rút gọn nội dung
    const stripHtmlTags = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };

    const truncateText = (html, maxLength) => {
        const plainText = stripHtmlTags(html);
        if (plainText.length <= maxLength) {
            return plainText;
        }
        return plainText.substring(0, maxLength) + "...";
    };

    // 📦 Gọi API lấy danh sách bài blog
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/BlogPost/get-blog-page?categoryId=0&page=1&size=10"
                );
                setBlogs(response.data.items); // Lấy danh sách bài viết từ API
            } catch (err) {
                setError("Lỗi khi tải dữ liệu blog");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: (
            <button className="new-blog-nav-button">
                <FaArrowLeft />
            </button>
        ),
        nextArrow: (
            <button className="new-blog-nav-button">
                <FaArrowRight />
            </button>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
    };

    return (
        <section className="new-blog-section">
            <div className="new-blog-title-container">
                <h2 className="new-blog-title">KIẾN THỨC AN TOÀN LAO ĐỘNG</h2>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : blogs.length > 0 ? (
                <Slider {...settings} ref={sliderRef} className="blog-slider">
                    {blogs.map((blog) => (
                        <div key={blog.postId} className="new-blog-item">
                            <div className="new-blog-image-container">
                                <img
                                    src={blog.imageUrl || "https://via.placeholder.com/150"}
                                    alt={blog.title}
                                    className="new-blog-image"
                                />
                                <div className="new-blog-date">
                                    <FaClock className="new-blog-date-icon" />
                                    <div className="new-blog-date-text">
                                        {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                                    </div>
                                </div>
                            </div>
                            <div className="new-blog-content">
                                <h3 className="new-blog-item-title">{blog.title}</h3>
                                <p className="new-blog-description">
                                    {truncateText(blog.content, 100)}
                                </p>
                            </div>
                            <div className="new-blog-read-more">
                                <button className="new-blog-read-more-button">
                                    <div className="new-blog-read-more-text">
                                        Xem chi tiết <FaArrowRight className="inline" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p className="text-center text-gray-500">Không có bài viết nào.</p>
            )}
        </section>
    );
};

export default NewBlog;
