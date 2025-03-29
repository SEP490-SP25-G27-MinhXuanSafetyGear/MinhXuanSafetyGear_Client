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
    const [showWelcome, setShowWelcome] = useState(false)
    const [topSaleProducts, setTopSaleProducts] = useState([])
    const [topDealProducts, setTopDealProducts] = useState([])
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("welcomeBack") === "true") {
            setShowWelcome(true);
            localStorage.removeItem("welcomeBack"); // Remove after showing once
            setTimeout(() => setShowWelcome(false), 3000); // Auto-hide after 3s
        }
    }, [])

    const fetchTopSaleProducts = async (size) => {
        try{
            const response = await axios.get(`${BASE_URL}/api/Product/top-sale-product`,{
                params: {
                    size: size
                }
            });
            console.log(response.data.length);
            setTopSaleProducts(response.data || []);
        }catch(error){
            return [];
        }
    }
    const fetchTopDealProducts = async (size,minDiscount) => {
        try{
            const response = await axios.get(`${BASE_URL}/api/Product/top-deal`,{
                params: {
                    size: size,
                    minDiscountPercent: minDiscount,
                }
            });
            setTopDealProducts(response.data || []);
        }catch(error){
            return [];
        }
    }


    useEffect(() => {
        fetchTopDealProducts()
        fetchTopSaleProducts()
    },[])

    return (
        <PageWrapper title="Bảo hộ lao động Minh Xuân">
        <div className="home-container">
            {showWelcome && <div className="welcome-message">🎉 Welcome back!</div>}
            <Banner />
            <TopDealProducts products={topDealProducts} />
            <TopSaleProducts products={topSaleProducts} title="TOP SẢN PHẨM BÁN CHẠY" />
            <Feedbacks />
            <NewBlog /></div>
        </PageWrapper>
    );
}

export default Index;