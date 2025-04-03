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
    const [customerSayAboutUs ,setCustomerSayAboutUs] = useState([]);
    const [banners, setBanners] = useState([]);
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
    const fetchCustomerSayAboutUs = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/api/BlogPost/get-blog-by-category/khach-hang-noi-ve-chung-toi`)
            setCustomerSayAboutUs(response.data);
        }catch (e){

        }
    }
    const fetchBanners = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/api/BlogPost/get-blog-by-category/banner`)
            setBanners(response.data);
            console.log(response.data);
        }catch (e){
        }
    }
    useEffect(() => {
        fetchProductsByTopic("top_sale").then((data) => setTopSaleProducts(data));
        fetchProductsByTopic("top_deal").then((data) => setTopDealProducts(data));
    }, []);
    useEffect(()=>{
        if(customerSayAboutUs.length === 0){
            fetchCustomerSayAboutUs();
        }
    },[customerSayAboutUs])
    useEffect(()=>{
        if(banners.length === 0){
            fetchBanners();

        }
    },[banners]);
    return (
        <PageWrapper title="Bảo hộ lao động Minh Xuân">
            <div className="home-container">
                {showWelcome && <div className="welcome-message">🎉 Welcome back!</div>}
                <Banner banners={banners} />
                <TopDealProducts products={topDealProducts} />
                <TopSaleProducts products={topSaleProducts} title="TOP SẢN PHẨM BÁN CHẠY" />
                <Feedbacks blogpost={customerSayAboutUs} />
                <NewBlog />
            </div>
        </PageWrapper>
    );
}

export default Index;