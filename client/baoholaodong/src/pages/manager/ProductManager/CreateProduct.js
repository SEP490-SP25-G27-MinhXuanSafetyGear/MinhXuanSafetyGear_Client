﻿import React, { useContext, useState } from 'react';
import { ProductContext } from "../../../contexts/AdminProductContext";
import {useNavigate} from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import {isImageSizeValid,compressImageToTargetSize} from "../../../utils/imageUtils";
const MAX_IMAGE_SIZE_MB = 0.5; // 2MB
const TARGET_IMAGE_SIZE_KB = 300; // 300KB
const CreateProduct = () => {
	const navigate = useNavigate();
	const { categories, createProduct } = useContext(ProductContext);
	const [product, setProduct] = useState({
		name: "",
		category: "",
		description: "",
		material: "",
		origin: "",
		quantity: 1,
		price: 0.01,
		discount: 0,
		status: true,
		qualityCertificate:"",
		productVariants: [],
		files:[]
	});
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Xử lý khi nhập thông tin sản phẩm
	const handleChange = (e) => {
		const { id, value } = e.target;
		setProduct(prev => ({ ...prev, [id]: value }));
	};

	// Thêm biến thể sản phẩm
	const addVariant = () => {
		setProduct(prev => ({
			...prev,
			productVariants: [...prev.productVariants, {
				productId:0,
				size: "",
				color: "",
				quantity: 1,
				price: 0.01,
				discount: 0,
				status: true
			}]
		}));
	};

	// Xử lý thay đổi biến thể
	const handleVariantChange = (index, e) => {
		const { id, value } = e.target;
		setProduct(prev => {
			const updatedVariants = [...prev.productVariants];
			updatedVariants[index][id] = value;
			return { ...prev, productVariants: updatedVariants };
		});
	};

	// Xóa biến thể sản phẩm
	const removeVariant = (index) => {
		setProduct(prev => ({
			...prev,
			productVariants: prev.productVariants.filter((_, i) => i !== index)
		}));
	};

	// Xử lý chọn ảnh
	const handleImageChange = async (e) => {
		const selectedFiles = Array.from(e.target.files);
		const validImages = await Promise.all(
			selectedFiles.map(async (file) => {
				if (!isImageSizeValid(file, MAX_IMAGE_SIZE_MB)) { // Kiểm tra giới hạn 5MB
					alert("File quá lớn! Chỉ chấp nhận ảnh dưới 5MB.");
					return null;
				}
				return await compressImageToTargetSize(file, TARGET_IMAGE_SIZE_KB); // Nén ảnh nếu quá lớn
			})
		);

		setImages(prevImages => [...prevImages, ...validImages.filter(img => img !== null)]);
	};


	// Xóa ảnh đã chọn
	const removeImage = (index) => {
		setImages(prevImages => prevImages.filter((_, i) => i !== index));
	};

	// Gửi dữ liệu lên server
	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
			setIsLoading(true);
			// Chuẩn bị dữ liệu gửi đi
			const formData = new FormData();
			formData.append("name", product.name);
			formData.append("category", product.category);
			formData.append("description", product.description);
			formData.append("material", product.material);
			formData.append("origin", product.origin);
			formData.append("quantity", product.quantity);
			formData.append("price", product.price);
			formData.append("discount", product.discount);
			formData.append("status", product.status);
			formData.append("qualityCertificate", product.qualityCertificate);
			product.productVariants.forEach((variant, index) => {
				formData.append(`productVariants[${index}].size`, variant.size);
				formData.append(`productVariants[${index}].color`, variant.color);
				formData.append(`productVariants[${index}].quantity`, variant.quantity);
				formData.append(`productVariants[${index}].price`, variant.price);
				formData.append(`productVariants[${index}].discount`, variant.discount);
				formData.append(`productVariants[${index}].status`, variant.status);
			});
			// Thêm ảnh vào formData
			images.forEach((image) => {
				formData.append("files", image);
			});
			var result= await createProduct(formData);
			navigate("/manager/updateproduct/"+result.id);
			setIsLoading(false);
		}catch(err){
			console.log(err);
		}
		finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full min-h-screen p-10 bg-gray-100 flex justify-center items-center">
			<Loading isLoading={isLoading} />
			<div className="w-full max-w-5xl bg-white p-10 rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold mb-6 text-center">Create Product</h2>
				<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
					<div className="col-span-1">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
							Name
						</label>
						<input
							className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
							id="name"
							type="text"
							value={product.name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="col-span-1">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
							Description
						</label>
						<input
							className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
							id="description"
							type="text"
							value={product.description}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="col-span-1">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="material">
							Material
						</label>
						<input
							className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
							id="material"
							type="text"
							value={product.material}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="col-span-1">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="origin">
							Origin
						</label>
						<input
							className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
							id="origin"
							type="text"
							value={product.origin}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="col-span-1">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="quantity">
							Quantity
						</label>
						<input
							className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
							id="quantity"
							type="number"
							value={product.quantity}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="col-span-1">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
							Price
						</label>
						<input
							className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
							id="price"
							type="number"
							value={product.price}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="col-span-1">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="discount">
							Discount
						</label>
						<input
							className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
							id="discount"
							type="number"
							value={product.discount}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="col-span-1">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="qualityCertificate">
							Certificate
						</label>
						<input
							className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
							id="qualityCertificate"
							type="text"
							value={product.qualityCertificate}
							onChange={handleChange}
							required
						/>
					</div>
					{/* Chọn danh mục */}
					<div className="col-span-2">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="category">Category</label>
						<select id="category" value={product.category} onChange={handleChange}
								className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300">
							<option value="">Select a category</option>
							{categories.map(cat => (
								<option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
							))}
						</select>
					</div>

					{/* Upload ảnh */}
					<div className="col-span-2">
						<label className="block text-gray-700 font-semibold mb-2">Upload Images</label>
						<input type="file" multiple accept="image/*" onChange={handleImageChange}
							   className="w-full p-2 border rounded-lg"/>
						<div className="mt-3 grid grid-cols-4 gap-3">
							{images.map((image, index) => (
								<div key={index} className="relative">
									<img src={URL.createObjectURL(image)} alt="Preview"
										 className="w-full h-32 object-cover rounded-lg"/>
									<button type="button"
											className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
											onClick={() => removeImage(index)}>X
									</button>
								</div>
							))}
						</div>
					</div>

					{/* Variants */}
					<div className="col-span-2">
						<h3 className="text-xl font-bold mt-6 mb-4">Product Variants</h3>
						{product.productVariants.map((variant, index) => (
							<div key={index} className="p-4 border rounded-lg shadow bg-gray-50 mb-4">
								<div className="grid grid-cols-3 gap-4">
									{["size", "color", "quantity", "price", "discount"].map(field => (
										<div key={field}>
											<label className="block text-gray-700 font-semibold mb-1"
												   htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
											<input
												className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
												id={field}
												type={field === 'quantity' || field === 'price' || field === 'discount' ? 'number' : 'text'}
												value={variant[field]}
												onChange={(e) => handleVariantChange(index, e)}
											/>
										</div>
									))}
								</div>
								<button type="button" className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
										onClick={() => removeVariant(index)}>Remove
								</button>
							</div>
						))}
						<button type="button" className="bg-green-500 text-white px-4 py-2 rounded-lg"
								onClick={addVariant}>Add Variant
						</button>
					</div>

					<div className="col-span-2 text-center">
						<button type="submit"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateProduct;
