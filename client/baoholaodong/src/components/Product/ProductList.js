import React, { useEffect, useState } from "react";

const ProductCard = ({ product, handleAddToCart, handleDetail }) => {
	return (
		<div className="bg-white shadow-md rounded-lg overflow-hidden">
			<img
				alt={product.name}
				className="w-full h-48 object-cover"
				src={product.image}
				onClick={() => handleDetail(product)}
			/>
			<div className="p-4">
				<div className="flex items-center mb-2">
					{[...Array(5)].map((_, index) => (
						<span key={index} className="text-yellow-500">
              <i className="fas fa-star"></i>
            </span>
					))}
				</div>
				<h2 onClick={() => handleDetail(product)} className="text-lg font-semibold mb-2">
					{product.name}
				</h2>
				<p className="text-red-600 font-bold mb-2">{product.price}</p>
				<p className="text-gray-600 mb-4">{product.status}</p>
				<div className="flex items-center justify-between">
					<select className="border border-gray-300 rounded p-1">
						<option>1</option>
					</select>
					<button
						className="bg-red-600 text-white px-4 py-2 rounded flex items-center"
						onClick={() => handleAddToCart(product)}
					>
						<i className="fas fa-shopping-cart mr-2"></i>
						Thêm vào giỏ hàng
					</button>
				</div>
			</div>
		</div>
	);
};

const SortSelector = ({ handleSort, selectedSort, setSelectedSort }) => {
	const handleSortClick = (order) => {
		setSelectedSort(order); // Cập nhật trạng thái khi người dùng chọn
		handleSort(order); // Gọi hàm handleSort từ component cha
	};
	
	return (
		<div className="flex justify-end mb-4">
			<button
				onClick={() => handleSortClick('')}
				className={`px-4 py-2  mr-2 ${selectedSort === '' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
			>
				Mặc định
			</button>
			<button
				onClick={() => handleSortClick('asc')}
				className={`px-4 py-2  mr-2 ${selectedSort === 'asc' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
			>
				Giá tăng dần
			</button>
			<button
				onClick={() => handleSortClick('desc')}
				className={`px-4 py-2  mr-2 ${selectedSort === 'desc' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
			>
				Giá giảm dần
			</button>
		</div>
	);
};

// Component chính
const ProductList = ({ products, handleAddToCart, handleDetail }) => {
	const [sortedProducts, setSortedProducts] = useState(products);
	const [selectedSort, setSelectedSort] = useState("");
	
	const handleSort = (order) => {
		const sorted = [...products]; // sao chép mảng để không thay đổi mảng ban đầu
		const parsePrice = (price) => {
			return parseInt(price.replace(/\D/g, ""), 10); // loại bỏ VND và chuyển thành số
		};
		
		if (order === "asc") {
			// Sắp xếp theo giá tăng dần
			sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
		} else if (order === "desc") {
			// Sắp xếp theo giá giảm dần
			sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
		}
		setSortedProducts(sorted);
	};
	
	useEffect(() => {
		// Khi `products` thay đổi, cập nhật lại `sortedProducts`
		setSortedProducts(products);
	}, [products]);
	
	return (
		<div className="container mx-auto p-4">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-red-600 mb-4">TOP SẢN PHẨM BÁN CHẠY</h1>
				{/* Truyền selectedSort và setSelectedSort vào SortSelector */}
				<SortSelector handleSort={handleSort} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
			</div>
			
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{sortedProducts.map((product, index) => (
					<ProductCard
						key={index}
						product={product}
						handleDetail={handleDetail}
						handleAddToCart={handleAddToCart}
					/>
				))}
			</div>
			
			<div className="text-center mt-8">
				<button className="bg-red-600 text-white px-6 py-2 rounded">
					Xem tất cả
					<i className="fas fa-arrow-right"></i>
				</button>
			</div>
		</div>
	);
};

export default ProductList;
