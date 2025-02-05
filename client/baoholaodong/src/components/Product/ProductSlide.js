import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import CSS của Swiper
import "swiper/css/navigation"; // Import module navigation nếu cần
import "swiper/css/pagination"; // Import module pagination nếu cần
import { Navigation, Pagination } from "swiper/modules"; // Import các module Swiper

const ProductSlide = ({ products }) => {
	return (
		<div className="slide">
			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={10}
				slidesPerView={1} // Hiển thị 3 sản phẩm cùng lúc
				navigation
				pagination={{ clickable: true }}
				className="product-slider"
			>
				{products.map((product, index) => (
					<SwiperSlide key={index}>
						<div className="product-card">
							<img src={product.image} alt={product.name} className="product-image" />
							<h3 className="product-name">{product.name}</h3>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ProductSlide;
