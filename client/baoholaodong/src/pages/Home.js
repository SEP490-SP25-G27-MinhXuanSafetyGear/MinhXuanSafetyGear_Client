﻿import React  from "react";
import Header from "../components/header";
import Banner from  "../components/Banner";
import Products from "../components/products";
import DiscountedProducts from "../components/discountedproducts";
import Feedbacks from "../components/feedbacks";
import NewBlog from "../components/newblog";
import Footer from "../components/footer";
function Home(){

	return (<div>
		<Banner/>
		<DiscountedProducts/>
		<Products/>
		<Feedbacks/>
		<NewBlog/>
	</div>)
}

export default Home;