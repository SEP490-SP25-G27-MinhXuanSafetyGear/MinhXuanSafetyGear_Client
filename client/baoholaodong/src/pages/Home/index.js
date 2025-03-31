import React, { useContext, useEffect, useState } from "react";
import { CustomerProductContext } from "../../contexts/CustomerProductContext";
import Banner from "../../components/banner/Banner";
import Feedbacks from "../../components/feedbacks";
import NewBlog from "../../components/newblog";
import TopSaleProducts from "./TopSaleProducts";
import TopDealProducts from "./TopDealProducts";
import PageWrapper from "../../components/pageWrapper/PageWrapper";
import "./home.css";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL_API;

function Index() {
    const [showWelcome, setShowWelcome] = useState(false);
    const [topSaleProducts, setTopSaleProducts] = useState([]);
    const [topDealProducts, setTopDealProducts] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("welcomeBack") === "true") {
            setShowWelcome(true);
            localStorage.removeItem("welcomeBack");
            setTimeout(() => setShowWelcome(false), 3000);
        }
    }, []);

    const fetchProductsByTopic = async (topic, page = 1, size = 20) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Product/get-products-by-topic`, {
                params: {
                    topic: topic,
                    page: page,
                    size: size,
                },
            });
            return response.data || [];
        } catch (error) {
            console.error(`Lỗi khi lấy dữ liệu ${topic}:`, error);
            return [];
        }
    };

    useEffect(() => {
        fetchProductsByTopic("top_sale").then((data) => setTopSaleProducts(data));
        fetchProductsByTopic("top_deal").then((data) => setTopDealProducts(data));
    }, []);

    return (
        <PageWrapper title="Bảo hộ lao động Minh Xuân">
            <div className="home-container">
                {showWelcome && <div className="welcome-message">🎉 Welcome back!</div>}
                <Banner />
                <TopDealProducts products={topDealProducts} />
                <TopSaleProducts products={topSaleProducts} title="TOP SẢN PHẨM BÁN CHẠY" />
                <Feedbacks />
                <NewBlog />
            </div>
        </PageWrapper>
    );
}

export default Index;