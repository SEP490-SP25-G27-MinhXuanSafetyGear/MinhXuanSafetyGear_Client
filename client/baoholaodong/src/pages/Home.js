import React  from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from  "../components/Banner";
import Products from "../components/products";
import DiscountedProducts from "../components/discountedproducts";
function Home(){
	return (<div>
		<Header />
		<Banner/>
		<DiscountedProducts/>
		<Products/>
		<Footer/>
	</div>)
}

export default Home;