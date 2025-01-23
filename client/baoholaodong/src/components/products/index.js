import React from "react";

const Product = () => {
	const products = [
		{ name: "Mũ bảo hộ", image: "https://placehold.co/150x150", price: "200,000 VND" },
		{ name: "Găng tay chống cắt", image: "https://placehold.co/150x150", price: "150,000 VND" },
		{ name: "Kính bảo hộ", image: "https://placehold.co/150x150", price: "100,000 VND" },
		{ name: "Áo phản quang", image: "https://placehold.co/150x150", price: "300,000 VND" },
		{ name: "Giày bảo hộ", image: "https://placehold.co/150x150", price: "500,000 VND" },
		{ name: "Mặt nạ phòng độc", image: "https://placehold.co/150x150", price: "700,000 VND" },
	];
	
	return (
		<main className="container mx-auto p-4">
			<h2 className="text-2xl font-bold text-center mb-4">Sản Phẩm Tiêu Biểu</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{products.map((product, index) => (
					<div key={index} className="border p-4 text-center rounded-lg shadow-md">
						<img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
						<h3 className="text-lg font-bold mb-2">{product.name}</h3>
						<p className="text-red-600 font-semibold">{product.price}</p>
						<button className="bg-red-600 text-white px-4 py-2 mt-4 rounded hover:bg-red-700 transition">
							Xem chi tiết
						</button>
					</div>
				))}
			</div>
		</main>
	);
};

export default Product;
