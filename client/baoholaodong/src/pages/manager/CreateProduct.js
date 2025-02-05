import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../components/Notification";
import {ProductContext} from "../../contexts/ProductContext";

const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

const CreateProduct = () => {
	const [formData, setFormData] = useState({
		productName: '',
		categoryId: '',
		description: '',
		material: '',
		origin: '',
		quantity: '',
		price: '',
		discount: '0',
		status: true,
		file: null,
	});
	const [imagePreview, setImagePreview] = useState(null);
	const [isCreated, setIsCreated] = useState(false);
	const navigate = useNavigate();
	const [message, setMessage] = useState(null);
	const { categories ,createProduct } =
		useContext(ProductContext);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData({ ...formData, file: file });
		
		// Create a URL for the image and update preview
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result); // Store URL for the uploaded image
			};
			reader.readAsDataURL(file);
		}
	};
	
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formDataToSend = new FormData();
		formDataToSend.append('productName', formData.productName);
		formDataToSend.append('categoryId', formData.categoryId);
		formDataToSend.append('description', formData.description);
		formDataToSend.append('material', formData.material);
		formDataToSend.append('origin', formData.origin);
		formDataToSend.append('quantity', formData.quantity);
		formDataToSend.append('price', formData.price);
		formDataToSend.append('discount', formData.discount);
		formDataToSend.append('status', formData.status ? 'true' : 'false'); // Ensure correct type
		if (formData.file) {
			formDataToSend.append('file', formData.file);
		}
		
		console.log('Form data submitted:', formData);
		
		try {
			const result = await createProduct(formDataToSend);
			setIsCreated(true);
			handleSuccess();
		} catch (error) {
			handleError();
		}
	};
	
	
	const handleSuccess = () => {
		setMessage({ message: "Product created successfully!", type: "success" });
	};
	
	const handleError = () => {
		setMessage({ message: "Something went wrong. Please try again.", type: "error" });
	};
	
	return (
		<div className="space-y-6">
			<div className="bg-white rounded-lg shadow">
				<div className="p-6 border-b flex justify-between items-center">
					<h3 className="text-lg font-semibold text-gray-800">Tạo mới sản phẩm</h3>
				</div>
				<div className="p-6">
					<form onSubmit={handleSubmit} className="">
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
									name="categoryId"
									className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={formData.categoryId}
									onChange={handleChange}
								>
									<option value="0">Select category</option>
									{categories.map(category => (
										<option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
									))}
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
									<option value="true">Active</option>
									<option value="false">Inactive</option>
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
						
						{/* Submit Button */}
						<div className="flex justify-end mt-6">
							<button
								type="submit"
								className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
							>
								Create Product
							</button>
						</div>
					</form>
				</div>
			</div>
			
			{/* Notification */}
			<Notification message={message?.message} type={message?.type} duration={3000} />
		</div>
	);
};

export default CreateProduct;
