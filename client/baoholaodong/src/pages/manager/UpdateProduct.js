import {Notification} from "../../components/Notification";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;
const UpdateProduct =()=>{
	const { id } = useParams();
	const [productUpdate, setProductUpdate] = useState({
		productId: parseInt(id),
		productName: "string",
		categoryId: 1,
		description: "string",
		quantity: 0,
		price: 0,
		discount: 100,
		status : true
	});
	const [categories, setCategories] = useState([]);
	const handleSubmit =(e)=>{
		e.preventDefault();
		console.log(productUpdate);
	}
	const handleCancel =(e)=>{
	
	}
	const handleChange =(e)=>{
		const { name, value } = e.target;
		setProductUpdate({ ...productUpdate, [name]: value });
	}
	const fetchCategory = async () => {
		try {
			const response = await axios.get(BASE_URL_API + '/api/product/getall-category');
			setCategories(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchCategory();
	},[]);
	return (
		<div className="space-y-6">
			<div className="bg-white rounded-lg shadow">
				<div className="p-6 border-b flex justify-between items-center">
					<h3 className="text-lg font-semibold text-gray-800">Update sản phẩm</h3>
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
									value={productUpdate.productName}
									onChange={handleChange}
								/>
							</div>
							
							{/* Category */}
							<div>
								<label className="block text-gray-700 font-medium">Category</label>
								<select
									name="categoryId"
									className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={productUpdate.categoryId}
									onChange={handleChange}
								>
									<option value="0">Select category</option>
									{categories.map(category => (
										<option key={category.categoryId}
										        value={category.categoryId}>{category.categoryName}</option>
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
									value={productUpdate.description}
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
									value={productUpdate.material}
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
									value={productUpdate.origin}
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
									value={productUpdate.quantity}
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
									value={productUpdate.price}
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
									value={productUpdate.discount}
									onChange={handleChange}
								/>
							</div>
							
							{/* Status */}
							<div>
								<label className="block text-gray-700 font-medium">Status</label>
								<select
									name="status"
									className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={productUpdate.status}
									onChange={handleChange}
								>
									<option value="true">Active</option>
									<option value="false">Inactive</option>
								</select>
							</div>
						</div>
						
						{/* Submit Button */}
						<div className="flex justify-end mt-6">
							<button
								type="submit"
								className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
							>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
			
			{/* Notification
			<Notification message={message?.message} type={message?.type} duration={3000}/>*/}
		</div>
	);
}
export default UpdateProduct;