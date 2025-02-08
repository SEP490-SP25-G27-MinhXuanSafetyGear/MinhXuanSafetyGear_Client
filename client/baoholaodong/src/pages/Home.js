import React  from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from  "../components/Banner";
import Content from "../components/Content";
import DiscountedProducts from "../components/discountedproducts";
function Home(){
	return (<div>
		<Header />
		<Banner/>
		<DiscountedProducts/>
		<Content/>
		<Footer/>
	</div>)
}

export default Home;