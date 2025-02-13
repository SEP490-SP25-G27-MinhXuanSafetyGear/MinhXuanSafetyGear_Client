import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from "../../../contexts/ProductContext";
import { useParams } from "react-router-dom";
import { Edit, Plus } from "lucide-react";
import { FaRegFrown } from "react-icons/fa";
import Modal from "../../../components/Modal/Modal";
import Loading from "../../../components/Loading/Loading";
const UpdateProduct = () => {
	const {id} = useParams();
	const { getProductById, categories,updateProduct ,uploadImage,updateImage,deleteImage,updateVariant,createVariant } = useContext(ProductContext);
	const [product, setProduct] = useState(null);
	const [isOpenUpdateInformation, setIsOpenUpdateInformation] = useState(false);
	const [isOpenAddMoreImage, setIsOpenAddMoreImage] = useState(false);
	const [isOpenUpdateVariant, setIsOpenUpdateVariant] = useState(false);
	const [isOpenCreateVariant, setIsOpenCreateVariant] = useState(false);
	const [isOpenUpdateImage, setIsOpenUpdateImage] = useState(false);
	const [imageSelected, setImageSelected] = useState(null);
	const [variantSelected , setVariantSelected] = useState(null);
	const [isLoading, setLoading] = useState(false);
	useEffect(() => {
		fetchProduct();
	}, [id]);
	// click open form update image
	const handleClickUpdateImage = (image)=>{
		setImageSelected(image);
		setIsOpenUpdateImage(true);
	};
	//click open form update variant
	const handleClickUpdateVariant = (variant)=>{
		setVariantSelected(variant);
		setIsOpenUpdateVariant(true);
	}
	// get product by id
	const fetchProduct = async () => {
		try {
			const data = await getProductById(id);
			setProduct(data);
		} catch (error) {
			console.error("Error fetching product:", error);
		}
	};
	if (!product) return <div className="text-center mt-10">Loading...</div>;

	return (
		<div className="space-y-6">
			<Loading isLoading={isLoading} />
			<div className="bg-white rounded-lg shadow">
				<div className="p-6 border-b flex justify-between items-center">
					<h3 className="text-lg font-semibold text-gray-800">Cập nhật sản phẩm</h3>
					<div className="flex space-x-4">
						<button onClick={() => setIsOpenUpdateInformation(true)}
								className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
							<Edit size={20}/> Cập nhật thông tin
						</button>
						<button onClick={(e) => setIsOpenAddMoreImage(true)}
								className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
							<Edit size={20}/> Thêm ảnh
						</button>
						<button onClick={(e) => {
							setIsOpenCreateVariant(true)
						}} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
							<Edit size={20}/> Thêm biến thể
						</button>
					</div>
				</div>

				{/* Hiển thị thông tin sản phẩm */}
				<div className="p-6 grid grid-cols-2 gap-6">
					<div>
						<p className="text-gray-700 font-semibold">ID sản phẩm: {product.id}</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold">Tên sản phẩm: {product.name}</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold">Mô tả: {product.description}</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold">Chất liệu: {product.material}</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold">Xuất xứ: {product.origin}</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold">Số lượng: {product.quantity}</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold">Giá: ${product.price}</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold">Giảm giá: {product.discount}%</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold">Trạng thái: {product.status ? "ON" : "Off"}</p>
					</div>
					<div className="col-span-2">
						<p className="text-gray-700 font-semibold">Danh mục: {product.categoryName}</p>
					</div>
				</div>

				{/* Hiển thị ảnh sản phẩm */}
				<div className="p-6">
					<h3 className="text-xl font-bold">Hình ảnh sản phẩm</h3>
					{product.productImages?.length > 0 ? (
						<div className="grid grid-cols-3 gap-4 mt-4">
							{product.productImages.map((image, index) => (
								<div key={image.id} className="relative">
									<img
										src={image.image}
										alt={`Product ${index}`}
										className="w-full h-32 object-cover rounded-lg shadow cursor-pointer transition-transform transform hover:scale-105"
									/>
									{/* Hiển thị luôn nút Edit */}
									<button
										onClick={() => handleClickUpdateImage(image)}
										className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-lg"
									>
										<Edit size={20} className="text-gray-700"/>
									</button>
								</div>
							))}
						</div>
					) : (
						<p className="flex items-center text-gray-600">
							<FaRegFrown className="mr-2"/> Không có hình ảnh nào.
						</p>
					)}
				</div>

				{/* Hiển thị các biến thể sản phẩm */}
				<div className="p-6 space-y-4">
					<h3 className="text-xl font-bold">Biến thể sản phẩm</h3>
					{product.productVariants?.length > 0 ? (
						product.productVariants.map((variant, index) => (
							<div key={index} className="p-4 border rounded-lg shadow bg-gray-50" onClick={() => {
								handleClickUpdateVariant(variant)
							}}>
								<p><strong>Kích thước:</strong> {variant.size}</p>
								<p><strong>Màu sắc:</strong> {variant.color}</p>
								<p><strong>Số lượng:</strong> {variant.quantity}</p>
								<p><strong>Giá:</strong> ${variant.price}</p>
								<p><strong>Giảm giá:</strong> {variant.discount}%</p>
							</div>
						))
					) : (
						<p className="flex items-center text-gray-600">
							<FaRegFrown className="mr-2"/> Không có biến thể nào.
						</p>
					)}
				</div>
				{/* Modal cập nhật thông tin */}
				<Modal onClose={() => setIsOpenUpdateInformation(false)} isOpen={isOpenUpdateInformation}
					   title={"Cập nhật thông tin"}>
					<UpdateInformationProductForm product={product} categories={categories} onUpdate={updateProduct}
											setProduct={setProduct} setLoading={setLoading}/>
				</Modal>
				<Modal onClose={() => setIsOpenAddMoreImage(false)} isOpen={isOpenAddMoreImage} title={"Thêm ảnh mới"}>
					<AddMoreImageForm product={product} uploadImage={uploadImage} fetchProduct={fetchProduct}
									  setLoading={setLoading}/>
				</Modal>
				<Modal onClose={() => setIsOpenUpdateVariant(false)} isOpen={isOpenUpdateVariant}
					   title={"Cập nhât biến thể"}>
					<UpdateVariantForm variant={variantSelected} fetchProduct={fetchProduct} setLoading={setLoading}
									   onUpdateVariant={updateVariant}/>
				</Modal>
				<Modal onClose={() => setIsOpenCreateVariant(false)} isOpen={isOpenCreateVariant}
					   title={"Thêm biến thể"}>
					<CreateVariantForm setLoading={setLoading} product={product} fetchProduct={fetchProduct} onCreateVariant={createVariant}/>
				</Modal>
				<Modal onClose={() => setIsOpenUpdateImage(false)} isOpen={isOpenUpdateImage} title={"Cập nhật ảnh"}>
					<UpdateImageForm image={imageSelected} onUpdateImage={updateImage} fetchProduct={fetchProduct}
									 close={() => {
										 setIsOpenUpdateImage(false)
									 }} onDelete={deleteImage} setLoading={setLoading}/>
				</Modal>
			</div>
		</div>
	);
};
// update information product
const UpdateInformationProductForm = ({ product, categories, onUpdate, setProduct, setLoading }) => {
	const [productUpdate, setProductUpdate] = useState({
		id: product?.id || "",
		name: product?.name || "",
		description: product?.description || "",
		material: product?.material || "",
		origin: product?.origin || "",
		quantity: product?.quantity || 0,
		price: product?.price || 0,
		discount: product?.discount || 0,
		categoryId: product?.categoryId || "",
		status: product?.status || false,
	});

	const [productIsValid, setProductIsValid] = useState(true);

	const checkProduct = () => {
		if (!productUpdate.name.trim() || !productUpdate.description.trim()) {
			setProductIsValid(false);
			return false;
		}
		if (!productUpdate.categoryId) {
			setProductIsValid(false);
			return false;
		}
		if (productUpdate.quantity < 1 || productUpdate.price < 0.01 || productUpdate.discount < 0 || productUpdate.discount > 100) {
			setProductIsValid(false);
			return false;
		}
		setProductIsValid(true);
		return true;
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setProductUpdate((prev) => {
			const updatedProduct = {
				...prev,
				[name]: type === "checkbox" ? checked : value,
			};
			checkProduct(updatedProduct);
			return updatedProduct;
		});
	};

	useEffect(() => {
		checkProduct();
	}, [productUpdate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!productIsValid) return; // Không cho submit nếu dữ liệu không hợp lệ

		try {
			setLoading(true);
			const updatedProduct = await onUpdate(productUpdate);
			if (updatedProduct) {
				setProduct(updatedProduct);
			}
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6 overflow-y-auto">
			<form onSubmit={handleSubmit} className="space-y-4 ">
				<div>
					<label className="block font-medium">Tên sản phẩm:</label>
					<input type="text" name="name" value={productUpdate.name} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
				</div>

				<div>
					<label className="block font-medium">Mô tả:</label>
					<textarea rows={10} name="description" value={productUpdate.description} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block font-medium">Chất liệu:</label>
						<input type="text" name="material" value={productUpdate.material} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
					</div>
					<div>
						<label className="block font-medium">Xuất xứ:</label>
						<input type="text" name="origin" value={productUpdate.origin} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
					</div>
					<div>
						<label className="block font-medium">Trạng thái</label>
						<input type="checkbox" name="status" checked={Boolean(productUpdate.status)} onChange={handleChange} className="border rounded-lg px-3 py-2" />
					</div>
				</div>

				<div className="grid grid-cols-3 gap-4">
					<div>
						<label className="block font-medium">Số lượng:</label>
						<input type="number" name="quantity" value={productUpdate.quantity} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" min="1" required />
					</div>
					<div>
						<label className="block font-medium">Giá ($):</label>
						<input type="number" name="price" value={productUpdate.price} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" step="0.01" min="0.01" required />
					</div>
					<div>
						<label className="block font-medium">Giảm giá (%):</label>
						<input type="number" name="discount" value={productUpdate.discount} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" min="0" max="100" required />
					</div>
				</div>

				<div>
					<label className="block font-medium">Danh mục:</label>
					<select name="categoryId" value={productUpdate.categoryId} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required>
						<option value="">Chọn danh mục</option>
						{categories.map((cat) => (
							<option key={cat.categoryId} value={cat.categoryId}>
								{cat.categoryName}
							</option>
						))}
					</select>
				</div>
				<div className="text-right">
					<button
						disabled={!productIsValid}
						type="submit"
						className={`px-4 py-2 text-white rounded-lg ${
							productIsValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
						}`}
					>
						Cập nhật
					</button>
				</div>
			</form>
		</div>
	);
};


// add more image
const AddMoreImageForm = ({ product, uploadImage ,fetchProduct ,setLoading}) => {
	const [image, setImage] = useState({
		productId: product.id,
		description: "",
		isPrimary: false,
		file: null,
	});
	const [preview, setPreview] = useState(null);

	// Xử lý khi người dùng chọn ảnh
	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			setImage({ ...image, file: selectedFile });
			setPreview(URL.createObjectURL(selectedFile));
		}
	};
	const clearImage =() =>{
		setImage({
			productId: product.id,
			description: "",
			isPrimary: false,
			file: null,
		});
	}
	// Xử lý khi nhập mô tả ảnh
	const handleDescriptionChange = (event) => {
		setImage({ ...image, description: event.target.value });
	};

	// Xử lý khi chọn ảnh chính (Primary)
	const handlePrimaryChange = (event) => {
		setImage({ ...image, isPrimary: event.target.checked });
	};

	// Gửi ảnh lên server
	const handleSubmit = async () => {
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("productId", image.productId);
			formData.append("description", image.description);
			formData.append("isPrimary", image.isPrimary);
			formData.append("file", image.file); // Ảnh được gửi dưới dạng file
		    var result = await uploadImage(formData); // Gửi form-data lên server
			if(result){
				clearImage();
				await fetchProduct();
				return;
			}
			alert(result);
		} catch (error) {
			console.error("Lỗi khi tải ảnh lên:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6">
			{/* Nhập mô tả ảnh */}
			<div className="mb-4">
				<label className="block text-gray-700 font-semibold mb-2">Mô tả ảnh</label>
				<input
					type="text"
					value={image.description}
					onChange={handleDescriptionChange}
					className="border rounded-lg p-2 w-full"
				/>
			</div>

			{/* Checkbox chọn ảnh chính */}
			<div className="mb-4 flex items-center">
				<input
					type="checkbox"
					checked={image.isPrimary}
					onChange={handlePrimaryChange}
					className="mr-2"
				/>
				<label className="text-gray-700 font-semibold">Ảnh chính</label>
			</div>

			{/* Input chọn ảnh */}
			<div className="mb-4">
				<label className="block text-gray-700 font-semibold mb-2">Chọn ảnh</label>
				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="border rounded-lg p-2 w-full"
				/>
			</div>

			{/* Khung hiển thị ảnh */}
			<div className="mt-4 w-40 h-40 border-2 border-gray-300 flex items-center justify-center rounded-lg">
				{preview ? (
					<img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
				) : (
					<span className="text-gray-500">Image</span>
				)}
			</div>

			{/* Nút gửi ảnh */}
			<button
				onClick={handleSubmit}
				className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
			>
				Save
			</button>

		</div>
	);
};
// update variant
const UpdateVariantForm = ({ variant,onUpdateVariant,setLoading ,fetchProduct}) => {
	const [variantUpdate, setVariantUpdate] = useState(variant);

	const handleVariantChange = (field, value) => {
		setVariantUpdate(prev => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try{
			var result = await onUpdateVariant(variantUpdate);
			if(result){
			   await fetchProduct();
			}
		}catch (eror){

		}finally{
			setLoading(false);
		}
	};

	return (
		<div className="p-4 border rounded-lg shadow bg-gray-50 mb-4">
			<div className="grid grid-cols-2 gap-4">
				{/* Size */}
				<div>
					<label className="block text-gray-700 font-semibold mb-1" htmlFor="size">
						Size
					</label>
					<input
						className="w-full p-2 border rounded-lg"
						id="size"
						type="text"
						value={variantUpdate.size}
						onChange={(e) => handleVariantChange("size", e.target.value)}
					/>
				</div>

				{/* Color */}
				<div>
					<label className="block text-gray-700 font-semibold mb-1" htmlFor="color">
						Color
					</label>
					<input
						className="w-full p-2 border rounded-lg"
						id="color"
						type="text"
						value={variantUpdate.color}
						onChange={(e) => handleVariantChange("color", e.target.value)}
					/>
				</div>

				{/* Quantity */}
				<div>
					<label className="block text-gray-700 font-semibold mb-1" htmlFor="quantity">
						Quantity
					</label>
					<input
						className="w-full p-2 border rounded-lg"
						id="quantity"
						type="number"
						value={variantUpdate.quantity}
						onChange={(e) => handleVariantChange("quantity", Number(e.target.value))}
					/>
				</div>

				{/* Price */}
				<div>
					<label className="block text-gray-700 font-semibold mb-1" htmlFor="price">
						Price
					</label>
					<input
						className="w-full p-2 border rounded-lg"
						id="price"
						type="number"
						value={variantUpdate.price}
						onChange={(e) => handleVariantChange("price", Number(e.target.value))}
					/>
				</div>

				{/* Discount */}
				<div>
					<label className="block text-gray-700 font-semibold mb-1" htmlFor="discount">
						Discount
					</label>
					<input
						className="w-full p-2 border rounded-lg"
						id="discount"
						type="number"
						value={variantUpdate.discount}
						onChange={(e) => handleVariantChange("discount", Number(e.target.value))}
					/>
				</div>

				{/* Status */}
				<div className="flex items-center">
					<input
						className="mr-2"
						id="status"
						type="checkbox"
						checked={variantUpdate.status}
						onChange={(e) => handleVariantChange("status", e.target.checked)}
					/>
					<label className="text-gray-700 font-semibold" htmlFor="status">
						Status (Active)
					</label>
				</div>
			</div>

			<button
				onClick={handleSubmit}
				className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
			>
				Save
			</button>
		</div>
	);
};
// create new variant
const CreateVariantForm = ({ setLoading, fetchProduct, onCreateVariant, product }) => {
	const [newVariant, setNewVariant] = useState({
		productId: product.id,
		size: "",
		color: "",
		quantity: 0,
		price: 0.0,
		discount: 0,
		status: true,
	});

	const [isVariantValid, setIsVariantValid] = useState(false);

	// Kiểm tra tính hợp lệ của biến thể
	const checkVariant = () => {
		if (newVariant.quantity < 0 || newVariant.price < 0 || newVariant.discount < 0) return false;
		if (!newVariant.size.trim() || !newVariant.color.trim()) return false;
		if (newVariant.price === 0) return false;
		return true;
	};

	// Cập nhật dữ liệu khi nhập input
	const handleVariantChange = (field, value) => {
		setNewVariant(prev => ({
			...prev,
			[field]: field === "price" || field === "quantity" || field === "discount"
				? Math.max(0, Number(value)) // Chặn nhập số âm
				: value,
		}));
	};

	// Cập nhật trạng thái hợp lệ của variant
	useEffect(() => {
		setIsVariantValid(checkVariant());
	}, [newVariant]);

	// Xử lý submit
	const handleSubmit = async (e) => {
		e.preventDefault(); // Ngăn chặn load lại trang
		if (!isVariantValid) return;

		try {
			setLoading(true);
			const result = await onCreateVariant(newVariant);
			if (result) await fetchProduct();
		} catch (error) {
			console.error("Error creating variant:", error);
		} finally {
			setTimeout(() => setLoading(false), 1000);
		}
	};

	return (
		<div className="p-4 border rounded-lg shadow bg-gray-50 mb-4">
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-2 gap-4">
					{/* Size */}
					<div>
						<label className="block text-gray-700 font-semibold mb-1" htmlFor="size">
							Size
						</label>
						<input
							className="w-full p-2 border rounded-lg"
							id="size"
							type="text"
							value={newVariant.size}
							onChange={(e) => handleVariantChange("size", e.target.value)}
						/>
					</div>

					{/* Color */}
					<div>
						<label className="block text-gray-700 font-semibold mb-1" htmlFor="color">
							Color
						</label>
						<input
							className="w-full p-2 border rounded-lg"
							id="color"
							type="text"
							value={newVariant.color}
							onChange={(e) => handleVariantChange("color", e.target.value)}
						/>
					</div>

					{/* Quantity */}
					<div>
						<label className="block text-gray-700 font-semibold mb-1" htmlFor="quantity">
							Quantity
						</label>
						<input
							className="w-full p-2 border rounded-lg"
							id="quantity"
							type="number"
							min="0"
							value={newVariant.quantity}
							onChange={(e) => handleVariantChange("quantity", e.target.value)}
						/>
					</div>

					{/* Price */}
					<div>
						<label className="block text-gray-700 font-semibold mb-1" htmlFor="price">
							Price
						</label>
						<input
							className="w-full p-2 border rounded-lg"
							id="price"
							type="number"
							step="0.01"
							min="0"
							value={newVariant.price}
							onChange={(e) => handleVariantChange("price", e.target.value)}
						/>
					</div>

					{/* Discount */}
					<div>
						<label className="block text-gray-700 font-semibold mb-1" htmlFor="discount">
							Discount
						</label>
						<input
							className="w-full p-2 border rounded-lg"
							id="discount"
							type="number"
							min="0"
							value={newVariant.discount}
							onChange={(e) => handleVariantChange("discount", e.target.value)}
						/>
					</div>

					{/* Status */}
					<div className="flex items-center">
						<input
							className="mr-2"
							id="status"
							type="checkbox"
							checked={newVariant.status}
							onChange={(e) => handleVariantChange("status", e.target.checked)}
						/>
						<label className="text-gray-700 font-semibold" htmlFor="status">
							Status (Active)
						</label>
					</div>
				</div>

				{/* Submit button */}
				<button
					type="submit"
					disabled={!isVariantValid}
					className={`mt-4 px-4 py-2 rounded-lg ${
						isVariantValid ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-gray-700 cursor-not-allowed"
					}`}
				>
					Save
				</button>
			</form>
		</div>
	);
};
// update image
const UpdateImageForm = ({image, onUpdateImage, fetchProduct, close, onDelete ,setLoading}) => {
	const [preview, setPreview] = useState(image.image || null);
	const [newImage, setNewImage] = useState({
		productImageId: image.id,
		description: image.description,
		isPrimary: image.isPrimary,
		file: null,
	});

	// Khi người dùng chọn ảnh mới
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPreview(URL.createObjectURL(file)); // Hiển thị ảnh xem trước
			setNewImage((prev) => ({...prev, file})); // Cập nhật ảnh mới vào newImage
		}
	};

	// Khi người dùng chỉnh sửa mô tả
	const handleDescriptionChange = (e) => {
		setNewImage((prev) => ({...prev, description: e.target.value}));
	};

	// Khi chọn ảnh chính
	const handlePrimaryChange = () => {
		setNewImage((prev) => ({...prev, isPrimary: !prev.isPrimary }));
	};

	// Gửi ảnh lên server
	const handleSubmit = async () => {
		if (!newImage.file) {
			alert("Vui lòng chọn ảnh mới!");
			return;
		}

		setLoading(true);

		const formData = new FormData();
		formData.append("productImageId", newImage.productImageId);
		formData.append("description", newImage.description);
		formData.append("isPrimary", newImage.isPrimary);
		formData.append("file", newImage.file);

		try {
			var result = await onUpdateImage(formData);
			if (result) {
				await fetchProduct();
				close();
			} else {
				alert("Cập nhật thất bại!");
			}
		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	// Xóa ảnh
	const handleDelete = async () => {
		const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa ảnh này?");
		if (!confirmDelete) return;
		try {
			await onDelete(image.id);
			await fetchProduct();
			close();
		} catch (error) {
			console.error("Lỗi khi xóa ảnh:", error);
		}
	};

	return (
		<div className="p-6">
			{/* Nhập mô tả ảnh */}
			<div className="mb-4">
				<label className="block text-gray-700 font-semibold mb-2">Mô tả ảnh</label>
				<input
					type="text"
					value={newImage.description}
					onChange={handleDescriptionChange}
					className="border rounded-lg p-2 w-full"
				/>
			</div>

			{/* Checkbox chọn ảnh chính */}
			<div className="mb-4 flex items-center">
				<input
					type="checkbox"
					checked={newImage.isPrimary}
					onChange={handlePrimaryChange}
					className="mr-2"
				/>
				<label className="text-gray-700 font-semibold">Ảnh chính</label>
			</div>

			{/* Input chọn ảnh */}
			<div className="mb-4">
				<label className="block text-gray-700 font-semibold mb-2">Chọn ảnh</label>
				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="border rounded-lg p-2 w-full"
				/>
			</div>

			{/* Khung hiển thị ảnh */}
			<div className="mt-4 w-40 h-40 border-2 border-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
				{preview ? (
					<img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
				) : (
					<span className="text-gray-500">Chưa có ảnh</span>
				)}
			</div>

			{/* Nút cập nhật và xóa */}
			<div className="flex justify-between mt-4">
				<button
					onClick={handleSubmit}
					className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
				>
					Save
				</button>
				<button
					onClick={handleDelete}
					className="bg-red-500 text-white px-4 py-2 rounded-lg"
				>
					Xóa ảnh
				</button>
			</div>
		</div>
	);
};

export default UpdateProduct;


