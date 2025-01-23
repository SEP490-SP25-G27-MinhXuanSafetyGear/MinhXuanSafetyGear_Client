import React  from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Banner from  "../components/Banner";
import Content from "../components/Content";
function Home(){
	return (<div>
		<Header />
		<Nav/>
		<Banner/>
		<Content/>
		<Footer/>
	</div>)
}

export default Home;