import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaClock } from "react-icons/fa";
import { DisplayContent } from "../../components/TextEditor"; // Import DisplayContent
import "./style.css";

const BlogDetail = () => {
    const { slug } = useParams(); // Lấy slug từ URL (ví dụ: "dia-chi")
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Gọi API để lấy chi tiết bài viết
    useEffect(() => {
        const fetchBlogDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:5000/api/BlogPost/get-blog-by-slug/${slug}`);
                setBlog(response.data);
            } catch (err) {
                setError("Không tìm thấy bài viết hoặc lỗi server");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetail();
    }, [slug]);

    // Dữ liệu mẫu cho relatedPosts (giữ tĩnh vì API không cung cấp)
    const relatedPosts = [
        {
            title: "Lợi ích của An Sạch Khi Tập Gym Ở Hồ Tấp Hiệu Quá",
            image: "https://via.placeholder.com/300x200",
            date: "06/09/2024",
            link: "#",
            description: "Thức ăn nào phù hợp với bạn để có được vòng eo thon gọn..."
        },
        {
            title: "Phục Hồi Sau Chạy Bộ; Giãn Cơ Sau Khi Chạy Trail",
            image: "https://via.placeholder.com/300x200",
            date: "06/09/2024",
            link: "#",
            description: "Bạn với hoàn toàn chạy bộ trail đúng cách và có sức khỏe..."
        }
    ];

    if (loading) {
        return <div className="blog-detail-wrapper"><p>Đang tải dữ liệu...</p></div>;
    }

    if (error) {
        return <div className="blog-detail-wrapper"><p className="text-red-500">{error}</p></div>;
    }

    if (!blog) {
        return <div className="blog-detail-wrapper"><p>Không tìm thấy bài viết.</p></div>;
    }

    return (
        <div className="blog-detail-wrapper">
            <div className="blog-detail-container">
                {/* Header Section */}
                <div className="blog-detail-header">
                    {blog.imageUrl ? (
                        <img src={blog.imageUrl} alt={blog.title} className="blog-detail-image" />
                    ) : (
                        <img
                            src="https://via.placeholder.com/1200x400"
                            alt="Placeholder"
                            className="blog-detail-image"
                        />
                    )}
                    <div className="blog-detail-meta">
                        <FaClock className="blog-detail-date-icon" />
                        <span className="blog-detail-date-text">
                            {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="blog-detail-content">
                    <h1 className="blog-detail-title">{blog.title}</h1>
                    <div className="blog-detail-body">
                        <DisplayContent content={blog.content} /> {/* Hiển thị content từ API */}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default BlogDetail;