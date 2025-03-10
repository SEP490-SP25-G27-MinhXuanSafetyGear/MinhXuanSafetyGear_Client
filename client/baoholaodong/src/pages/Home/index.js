import React, { useContext, useEffect, useState } from "react";
import {CustomerProductContext} from "../../contexts/CustomerProductContext";
import Banner from "../../components/banner/Banner";
import Feedbacks from "../../components/feedbacks";
import NewBlog from "../../components/newblog";
import TopSaleProducts from "./TopSaleProducts";
import TopDealProducts from "./TopDealProducts";

function Index() {
    const { topSaleProducts,topDealProducts} = useContext(CustomerProductContext);
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("welcomeBack") === "true") {
            setShowWelcome(true);
            localStorage.removeItem("welcomeBack"); // Xóa sau khi hiển thị 1 lần
            setTimeout(() => setShowWelcome(false), 3000); // Tự động ẩn sau 3s
        }
    }, []);

    return (
        <div>
            {showWelcome && <div className="welcome-message">🎉 Welcome back!</div>}
            <Banner />
            <TopDealProducts products={topDealProducts} />
            <TopSaleProducts products={topSaleProducts} title="TOP SẢN PHẨM BÁN CHẠY" />
            <Feedbacks />
            <NewBlog />
        </div>
    );
}

export default Index;
