import React, { useState } from 'react';
import {FaInfoCircle, FaStar} from "react-icons/fa";

const FormCreateProduct = () => {
	const [formData, setFormData] = useState({
		productName: '',
		category: '',
		description: '',
		material: '',
		origin: '',
		quantity: '',
		price: '',
		discount: '',
		status: '1',
		productImage: null,
	});
	const [imagePreview, setImagePreview] = useState(null); // Thêm trạng thái cho hình ảnh preview
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData({ ...formData, productImage: file });
		
		// Tạo URL cho hình ảnh và cập nhật preview
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result); // Lưu URL hình ảnh đã tải lên
			};
			reader.readAsDataURL(file);
		}
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form data submitted:', formData);
		// Xử lý gửi biểu mẫu tới API
	};
	
	return (
		<form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create New Product</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Product Name */}
				<div>
					<label className="block text-gray-700 font-medium">Product Name</label>
					<input
						name="productName"
						className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter product name"
						type="text"
						value={formData.productName}
						onChange={handleChange}
					/>
				</div>
				{/* Category */}
				<div>
					<label className="block text-gray-700 font-medium">Category</label>
					<select
						name="category"
						className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={formData.category}
						onChange={handleChange}
					>
						<option>Select category</option>
						<option>Category 1</option>
						<option>Category 2</option>
						<option>Category 3</option>
					</select>
				</div>
				{/* Description */}
				<div className="col-span-1 md:col-span-2">
					<label className="block text-gray-700 font-medium">Description</label>
					<textarea
						name="description"
						className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter product description"
						rows="4"
						value={formData.description}
						onChange={handleChange}
					/>
				</div>
				{/* Material */}
				<div>
					<label className="block text-gray-700 font-medium">Material</label>
					<input
						name="material"
						className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter material"
						type="text"
						value={formData.material}
						onChange={handleChange}
					/>
				</div>
				{/* Origin */}
				<div>
					<label className="block text-gray-700 font-medium">Origin</label>
					<input
						name="origin"
						className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter origin"
						type="text"
						value={formData.origin}
						onChange={handleChange}
					/>
				</div>
				{/* Quantity */}
				<div>
					<label className="block text-gray-700 font-medium">Quantity</label>
					<input
						name="quantity"
						className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter quantity"
						type="number"
						value={formData.quantity}
						onChange={handleChange}
					/>
				</div>
				{/* Price */}
				<div>
					<label className="block text-gray-700 font-medium">Price</label>
					<input
						name="price"
						className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter price"
						step="0.01"
						type="number"
						value={formData.price}
						onChange={handleChange}
					/>
				</div>
				{/* Discount */}
				<div>
					<label className="block text-gray-700 font-medium">Discount</label>
					<input
						name="discount"
						className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter discount"
						step="0.01"
						type="number"
						value={formData.discount}
						onChange={handleChange}
					/>
				</div>
				{/* Status */}
				<div>
					<label className="block text-gray-700 font-medium">Status</label>
					<select
						name="status"
						className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={formData.status}
						onChange={handleChange}
					>
						<option value="1">Active</option>
						<option value="0">Inactive</option>
					</select>
				</div>
				{/* Image Upload */}
				<div className="col-span-1 md:col-span-2">
					<label className="block text-gray-700 font-medium">Product Image</label>
					<input
						name="productImage"
						className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="file"
						onChange={handleFileChange}
					/>
					{/* Display image preview */}
					{imagePreview && (
						<div className="mt-4">
							<img
								src={imagePreview}
								alt="Product preview"
								className="w-full h-48 object-cover rounded-lg shadow-md"
							/>
						</div>
					)}
				</div>
			</div>
			<div className="mt-6 flex justify-center">
				<button
					className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
					type="submit"
				>
					Create Product
				</button>
			</div>
		</form>
	);
};

export default FormCreateProduct;
