import React, { useState } from "react";
import { FaArrowRight, FaCheck, FaShoppingCart, FaStar } from "react-icons/fa";
import './style.css';

const Content = () => {
	const [selectedFilter, setSelectedFilter] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 10;

	const products = [
		{ name: "Mũ bảo hộ", image: "https://placehold.co/150x150", price: "200,000 VND", rating: 4, stock: "Còn hàng" },
		{ name: "Găng tay chống cắt", image: "https://placehold.co/150x150", price: "150,000 VND", rating: 5, stock: "Còn hàng" },
		{ name: "Kính bảo hộ", image: "https://placehold.co/150x150", price: "100,000 VND", rating: 3, stock: "Hết hàng" },
		{ name: "Áo phản quang", image: "https://placehold.co/150x150", price: "300,000 VND", rating: 4, stock: "Còn hàng" },
		{ name: "Giày bảo hộ", image: "https://placehold.co/150x150", price: "500,000 VND", rating: 5, stock: "Còn hàng" },
		{ name: "Mặt nạ phòng độc", image: "https://placehold.co/150x150", price: "700,000 VND", rating: 4, stock: "Hết hàng" },
		{ name: "Mặt nạ phòng độc", image: "https://placehold.co/150x150", price: "700,000 VND", rating: 4, stock: "Hết hàng" },
		{ name: "Mặt nạ phòng độc", image: "https://placehold.co/150x150", price: "700,000 VND", rating: 4, stock: "Hết hàng" },
		{ name: "Mặt nạ phòng độc", image: "https://placehold.co/150x150", price: "700,000 VND", rating: 4, stock: "Hết hàng" },
		{ name: "Mặt nạ phòng độc", image: "https://placehold.co/150x150", price: "700,000 VND", rating: 4, stock: "Hết hàng" },
		{ name: "Mặt nạ phòng độc", image: "https://placehold.co/150x150", price: "700,000 VND", rating: 4, stock: "Hết hàng" },
	];

	const filters = ["Giá tăng dần", "Giá giảm dần", "Rating"];
	const totalPages = Math.ceil(products.length / productsPerPage);

	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const currentProducts = products.slice(
		(currentPage - 1) * productsPerPage,
		currentPage * productsPerPage
	);

	return (
		<main className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-4" style={{ marginTop: '30px' }}>
				<h2 className="best-products">TOP SẢN PHẨM BÁN CHẠY</h2>
				<div className="flex space-x-4">
					{filters.map((filter, index) => (
						<button
							key={index}
							onClick={() => setSelectedFilter(filter)}
							className={`filter-button ${selectedFilter === filter ? "selected" : ""}`}
						>
							{filter}
							{selectedFilter === filter && <FaCheck className="ml-2 inline" />}
						</button>
					))}
				</div>
			</div>
			<div className="product-container-best-products">
				{currentProducts.map((product, index) => (
					<div key={index} className="product-card">
						<img className="product-image" src={product.image} alt={product.name} />
						<div className="product-info">
							<div className="product-rating-price">
								<div className="product-rating">
									{Array.from({ length: product.rating }, (_, i) => (
										<FaStar key={i} />
									))}
								</div>
								<div className="product-price">{product.price}</div>
							</div>
							<div className="product-name">{product.name}</div>
							<div className="product-stock">{product.stock}</div>
							<div className="product-actions">
								<input type="number" className="quantity-input" min="1" defaultValue="1" />
								<button className="add-to-cart-button">
									<FaShoppingCart className="icon" /> Thêm vào giỏ
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="flex justify-center mt-4">
			<div className="new-blog-read-more">
				<button className="new-blog-read-more-button">
					<div className="new-blog-read-more-text">Xem tất cả <FaArrowRight className="inline" /></div>
				</button>
			</div>
			</div>






		</main>
	);
};

export default Content;