import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaHome, FaFilter, FaClock, FaArrowRight } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { translateText } from "../../utils/translate";
import getUserLanguage from "../../utils/getUserLanguage";
import "./style.css";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [translatedBlogs, setTranslatedBlogs] = useState([]);
    const [filters, setFilters] = useState([]); // Lưu danh mục blog từ API
    const [translatedFilters, setTranslatedFilters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryId, setCategoryId] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [language, setLanguage] = useState("vi");
    const pageSize = 10;

    // Lấy ngôn ngữ của người dùng từ IP
    useEffect(() => {
        const detectLanguage = async () => {
            const lang = await getUserLanguage();
            setLanguage(lang);
            console.log("🌍 Ngôn ngữ phát hiện:", lang);
        };
        detectLanguage();
    }, []);

    // Gọi API để lấy danh mục blog
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/BlogPost/get-blog-categories");
                const categories = [{ id: 0, name: "Tất cả" }, ...response.data];
                setFilters(categories);
            } catch (err) {
                console.error("Lỗi khi tải danh mục blog", err);
            }
        };
        fetchCategories();
    }, []);

    // Gọi API để lấy danh sách blog theo danh mục
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/BlogPost/get-blog-page?categoryId=${categoryId}&page=${page}&size=${pageSize}`
                );
                setBlogs(response.data.items);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError("Lỗi khi tải dữ liệu blog");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [categoryId, page]);

    // 📝 Dịch nội dung blog & danh mục blog
    const translateContent = async () => {
        if (language === "vi") {
            console.log("✅ Ngôn ngữ là tiếng Việt, không cần dịch.");
            return;
        }

        console.log(`🔄 Dịch nội dung từ tiếng Việt sang ${language}...`);

        if (blogs.length > 0) {
            const translatedBlogsData = await Promise.all(
                blogs.map(async (blog) => ({
                    ...blog,
                    title: await translateText(blog.title, language),
                    content: await translateText(blog.content, language),
                }))
            );
            setTranslatedBlogs(translatedBlogsData);
        }

        if (filters.length > 0) {
            const translatedFiltersData = await Promise.all(
                filters.map(async (filter) => ({
                    ...filter,
                    name: await translateText(filter.name, language),
                }))
            );
            setTranslatedFilters(translatedFiltersData);
        }
    };

    // Khi dữ liệu thay đổi, kiểm tra xem có cần dịch hay không
    useEffect(() => {
        if (blogs.length > 0 || filters.length > 0) {
            console.log("📢 Bắt đầu dịch nội dung blog...");
            translateContent();
        }
    }, [blogs, filters, language]);

    return (
        <div className="blog-container">
            <nav className="breadcrumb-blog-list">
                <a href="/" className="breadcrumb-item">
                    <FaHome className="breadcrumb-icon" />
                    Trang chủ
                </a>
                <ChevronRight className="breadcrumb-separator" />
                <span className="breadcrumb-item active">Danh sách bài viết</span>
            </nav>

            <div className="blog-list-container">
                {/* Bộ lọc danh mục - Dữ liệu từ API */}
                <div className="blog-filter">
                    <div className="filter-header">
                        <FaFilter className="filter-icon" />
                        <span className="filter-title">BỘ LỌC TIN TỨC</span>
                    </div>
                    <div className="filter-options">
                        {(translatedFilters.length > 0 ? translatedFilters : filters).map((filter) => (
                            <label key={filter.id} className="filter-label">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={categoryId === filter.id}
                                    onChange={() => setCategoryId(filter.id)}
                                    className="filter-radio"
                                />
                                <span>{filter.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="blog-list">
                    <h2 className="all-blog-title">Danh sách bài viết</h2>

                    {loading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : blogs.length > 0 ? (
                        <div className="all-blog-list">
                            {(translatedBlogs.length > 0 ? translatedBlogs : blogs).map((blog) => (
                                <div key={blog.postId} className="all-blog-item">
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
                                        <p className="new-blog-description">{blog.content}</p>
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
                        </div>
                    ) : (
                        <p>Không có bài viết nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogList;
