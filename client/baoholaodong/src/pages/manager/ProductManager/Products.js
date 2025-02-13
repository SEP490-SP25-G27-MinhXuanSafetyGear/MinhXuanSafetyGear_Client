import React, {useContext, useEffect, useState} from "react";
import { Package, Edit, Trash2, Plus } from "lucide-react";
import { FaRegFrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../../contexts/ProductContext";
import Loading from "../../../components/Loading/Loading";

const Products = () => {
	const navigate = useNavigate();
	const { products, loading, selectedCategory, setSelectedCategory, page, setPage,categories,search,setSearch } =
		useContext(ProductContext);
	const handleCreate = () => navigate("/manager/createproduct");
	const handleUpdate = (product) => navigate(`/manager/updateproduct/${product.id}`);
	const handleDelete = (id) => {
		if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
			// Thêm logic xóa sản phẩm
			console.log("Xóa sản phẩm có ID:", id);
		}
	};

	return (
		<div className="space-y-6">
			<div className="bg-white rounded-lg shadow">
				<Loading isLoading={loading} />
				<div className="p-6 border-b flex justify-between items-center">
					<h3 className="text-lg font-semibold text-gray-800">Danh sách sản phẩm</h3>
					<div className="flex space-x-4">
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							type="text"
							placeholder="Tìm kiếm sản phẩm..."
							className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						/>
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						>
							<option value="0">All</option>
							{categories.map((category, index) => (
								<option key={index} value={category.categoryId}>
									{category.categoryName}
								</option>
							))}
						</select>
						<button
							className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
							onClick={handleCreate}
						>
							<Plus className="w-5 h-5 mr-2"/>
							Thêm sản phẩm
						</button>
					</div>
				</div>
				
				<div className="p-6">
					{loading ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{Array.from({length: 4}).map((_, index) => (
								<div key={index} className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
							))}
						</div>
					) : products.length === 0 ? (
						<div className="flex justify-center items-center">
							<FaRegFrown className="text-gray-500 w-12 h-12" />
							<span className="text-gray-500 ml-4">Không có sản phẩm nào</span>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{products.map(({ id, name, categoryName, price, productImages }) => {
								const image =
									Array.isArray(productImages) && productImages.length > 0
										? productImages[0].image
										: "https://via.placeholder.com/150";
								
								return (
									<div key={id} className="bg-white border rounded-lg overflow-hidden">
										<img src={image} alt={name} className="w-full h-48 object-cover" />
										<div className="p-4">
											<h4 className="text-lg font-semibold text-gray-800">{name}</h4>
											<p className="text-gray-600 text-sm mt-1">Danh mục: {categoryName}</p>
											<div className="flex justify-between items-center mt-4">
												<span className="text-lg font-bold text-gray-900">${price}</span>
												<div className="flex space-x-2">
													<button
														className="p-2 text-blue-600 hover:bg-blue-50 rounded"
														onClick={() => handleUpdate({ id })}
													>
														<Edit className="w-5 h-5" />
													</button>
													<button
														className="p-2 text-red-600 hover:bg-red-50 rounded"
														onClick={() => handleDelete(id)}
													>
														<Trash2 className="w-5 h-5" />
													</button>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
				
				<div className="p-6 flex justify-between items-center">
					<button
						className={`px-4 py-2 border rounded-lg ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
						onClick={() => setPage(page - 1)}
						disabled={page === 1}
					>
						Trang trước
					</button>
					<span>Trang {page}</span>
					<button className="px-4 py-2 border rounded-lg hover:bg-gray-100" onClick={() => setPage(page + 1)}>
						Trang sau
					</button>
				</div>
			</div>
		</div>
	);
};

export default Products;
