import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import './style.css';

const Content = () => {
	const [selectedFilter, setSelectedFilter] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 5;

	const products = [
		{ name: "Mũ bảo hộ", image: "https://placehold.co/150x150", price: "200,000 VND" },
		{ name: "Găng tay chống cắt", image: "https://placehold.co/150x150", price: "150,000 VND" },
		{ name: "Kính bảo hộ", image: "https://placehold.co/150x150", price: "100,000 VND" },
		{ name: "Áo phản quang", image: "https://placehold.co/150x150", price: "300,000 VND" },
		{ name: "Giày bảo hộ", image: "https://placehold.co/150x150", price: "500,000 VND" },
		{ name: "Mặt nạ phòng độc", image: "https://placehold.co/150x150", price: "700,000 VND" },
	];

	const filters = ["Sản phẩm mới", "Giá tăng dần", "Giá giảm dần", "Rating"];
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
				<h2 className="text-red-600 text-2xl font-bold">Sản Phẩm Tiêu Biểu</h2>
				<div className="flex space-x-4">
					{filters.map((filter, index) => (
						<button
							key={index}
							onClick={() => setSelectedFilter(filter)}
							className={`px-4 py-2 rounded transition ${
								selectedFilter === filter ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							{filter}
							{selectedFilter === filter && <FaCheck className="ml-2 inline" />}
						</button>
					))}
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
				{currentProducts.map((product, index) => (
					<div key={index} className="product-card">
						<img className="product-image" src={product.image} alt={product.name} />
						<div className="product-info">
							<div className="product-name">{product.name}</div>
							<div className="product-price">{product.price}</div>
						</div>
					</div>
				))}
			</div>
			<div className="flex justify-center mt-4 space-x-2 text-sm">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					className="px-2 py-1 text-red-600"
					disabled={currentPage === 1}
				>
					Previous
				</button>
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index}
						onClick={() => handlePageChange(index + 1)}
						className={`px-2 py-1 rounded ${
							currentPage === index + 1 ? "bg-red-600 text-white" : "bg-gray-200 text-black"
						}`}
					>
						{index + 1}
					</button>
				))}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					className="px-2 py-1 text-red-600"
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</main>
	);
};

export default Content;