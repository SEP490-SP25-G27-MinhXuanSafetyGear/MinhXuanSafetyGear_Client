import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import Feedbacks from "../../components/feedbacks";
import NewBlog from "../../components/newblog";
import TopSaleProducts from "./TopSaleProducts";
import TopDealProducts from "./TopDealProducts";
import "./home.css";
import axios from "axios";
import { translateText } from "../../utils/translate";
import getUserLanguage from "../../utils/getUserLanguage"; // Import hàm lấy ngôn ngữ

const BASE_URL = process.env.REACT_APP_BASE_URL_API;

function Index() {
    const [showWelcome, setShowWelcome] = useState(false);
    const [topSaleProducts, setTopSaleProducts] = useState([]);
    const [translatedTopSaleProducts, setTranslatedTopSaleProducts] = useState([]);
    const [topDealProducts, setTopDealProducts] = useState([]);
    const [translatedTopDealProducts, setTranslatedTopDealProducts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [translatedBlogs, setTranslatedBlogs] = useState([]);
    const [language, setLanguage] = useState("vi");
    const [translatedTitle, setTranslatedTitle] = useState("TOP SẢN PHẨM BÁN CHẠY");

    useEffect(() => {
        if (localStorage.getItem("welcomeBack") === "true") {
            setShowWelcome(true);
            localStorage.removeItem("welcomeBack");
            setTimeout(() => setShowWelcome(false), 3000);
        }
    }, []);

    // Lấy ngôn ngữ của người dùng từ IP
    useEffect(() => {
        const detectLanguage = async () => {
            const lang = await getUserLanguage();
            setLanguage(lang);
            console.log("🌍 Ngôn ngữ phát hiện:", lang);
        };
        detectLanguage();
    }, []);

    const fetchTopSaleProducts = async (size) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Product/top-sale-product`, {
                params: { size: size }
            });
            setTopSaleProducts(response.data || []);
        } catch (error) {
            console.error("❌ Lỗi khi lấy sản phẩm bán chạy:", error);
        }
    };

    const fetchTopDealProducts = async (size, minDiscount) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Product/top-deal`, {
                params: { size: size, minDiscountPercent: minDiscount }
            });
            setTopDealProducts(response.data || []);
        } catch (error) {
            console.error("❌ Lỗi khi lấy sản phẩm khuyến mãi:", error);
        }
    };

    const fetchBlogs = async () => {
        try {
            const mockBlogs = [
                {
                    id: 1,
                    title: "Chính sách mua hàng đồ bảo hộ lao động",
                    image: "/thiet-bi-bao-ho-lao-dong.webp",
                    date: "March 18, 2025 - 8 min read",
                    preview: "Tìm hiểu chi tiết về chính sách mua hàng tại BaoHoLaoDongMinhXuan...",
                    link: "/policy/purchase-policy",
                    tags: ["Chínhsách", "Đồbảohộ", "Muahàng"],
                },
                {
                    id: 2,
                    title: "Hướng dẫn mua và sử dụng đồ bảo hộ lao động",
                    image: "/thiet-bi-bao-ho-lao-dong.webp",
                    date: "March 17, 2025 - 7 min read",
                    preview: "Hướng dẫn từng bước để bạn có thể mua sắm và sử dụng hiệu quả...",
                    link: "/guide/purchase-guide",
                    tags: ["Hướngdẫn", "Đồbảohộ", "Sửdụng"],
                },
            ];
            setBlogs(mockBlogs);
        } catch (error) {
            console.error("❌ Lỗi khi lấy blog:", error);
            setBlogs([]);
        }
    };

    // 📝 Dịch nội dung sản phẩm & blog sau khi lấy từ API
    const translateContent = async () => {
        if (language === "vi") {
            console.log("✅ Ngôn ngữ là tiếng Việt, không cần dịch.");
            return;
        }

        console.log(`🔄 Dịch nội dung từ tiếng Việt sang ${language}...`);

        if (topSaleProducts.length > 0) {
            const translatedSales = await Promise.all(
                topSaleProducts.map(async (product) => ({
                    ...product,
                    name: await translateText(product.name, language),
                    description: await translateText(product.description, language),
                }))
            );
            setTranslatedTopSaleProducts(translatedSales);
        }

        if (topDealProducts.length > 0) {
            const translatedDeals = await Promise.all(
                topDealProducts.map(async (product) => ({
                    ...product,
                    name: await translateText(product.name, language),
                    description: await translateText(product.description, language),
                }))
            );
            setTranslatedTopDealProducts(translatedDeals);
        }

        if (blogs.length > 0) {
            const translatedBlogsData = await Promise.all(
                blogs.map(async (blog) => ({
                    ...blog,
                    title: await translateText(blog.title, language),
                    preview: await translateText(blog.preview, language),
                }))
            );
            setTranslatedBlogs(translatedBlogsData);
        }
    };

    useEffect(() => {
        fetchTopDealProducts();
        fetchTopSaleProducts();
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (topSaleProducts.length > 0 || topDealProducts.length > 0 || blogs.length > 0) {
            console.log("📢 Bắt đầu dịch nội dung...");
            translateContent();
        }
    }, [topSaleProducts, topDealProducts, blogs, language]);

    // 📝 Dịch tiêu đề "TOP SẢN PHẨM BÁN CHẠY"
    useEffect(() => {
        const translateTitle = async () => {
            if (language !== "vi") {
                const translated = await translateText("TOP SẢN PHẨM BÁN CHẠY", language);
                setTranslatedTitle(translated);
            }
        };
        translateTitle();
    }, [language]);

    return (
        <div className="home-container">
            {showWelcome && <div className="welcome-message">🎉 Welcome back!</div>}
            <Banner />
            <TopDealProducts products={translatedTopDealProducts.length > 0 ? translatedTopDealProducts : topDealProducts} />
            <TopSaleProducts
                products={translatedTopSaleProducts.length > 0 ? translatedTopSaleProducts : topSaleProducts}
                title={translatedTitle}
            />
            <Feedbacks />
            <NewBlog blogs={translatedBlogs.length > 0 ? translatedBlogs : blogs} />
        </div>
    );
}

export default Index;
