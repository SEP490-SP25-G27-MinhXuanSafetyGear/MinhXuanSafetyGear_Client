import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import * as signalR from "@microsoft/signalr";

const BASE_URL = process.env.REACT_APP_BASE_URL_API;
export const ProductContext = createContext();

export const AdminProductProvider = ({ children }) => {
	/**
	 * danh sach sản phẩm
	 * @return {products}
	 * */
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [groupCategories, setGroupCategories] = useState([]);
	const [hubConnection, setHubConnection] = useState(null);
	const [search, setSearch] = useState("");
	const [taxes, setTaxes] = useState([]);
	const [categories, setCategories] = useState([]);
	/** Lấy danh sách sản phẩm */
	const fetchProducts = async () => {
		//setLoading(true);
		try {
			const response = await axios.get(`${BASE_URL}/api/Product/get-product-page`, {
				params: { category: selectedCategory, page, pagesize: size },
			});
			setProducts(response.data.items || []);
		} catch (error) {
			console.error("Lỗi khi lấy sản phẩm:", error.response?.data || error.message);
		} finally {
			setTimeout(() => {
				//setLoading(false);
			}, 0); //
		}
	};

	/** Lấy thông tin chi tiết sản phẩm */
	const getProductById = async (id) => {
		try {
			const response = await axios.get(`${BASE_URL}/api/product/get-product-by-id/${id}`);
			return response.data;
		} catch (error) {
			console.error("Lỗi khi lấy thông tin sản phẩm:", error.response?.data || error.message);
		}
	};

	/** Lấy danh sách danh mục */
	const fetchGroupCategories = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/api/Product/getall-category`);
			setGroupCategories(response.data || []);
		} catch (error) {
			console.error("Lỗi khi lấy danh mục sản phẩm:", error.response?.data || error.message);
			setGroupCategories([]);
		}
	};
	/**
	 * lấy danh sách thuế
	 * */
	const fetchTaxes = async () => {
		try{
			const response = await axios.get(`${BASE_URL}/api/tax/getall`);
			setTaxes(response.data || []);
		}catch(error){

		}
	}

	/** Thêm danh mục sản phẩm */
	const createCategory = async (category) => {
		try{
			const response = await axios.post(`${BASE_URL}/api/Product/create-category`, category);
			return response.data;
		}catch (error){
			throw error;
		}
	};

	/** Thêm danh mục sản phẩm */
	const updateCategory = async (category) => {
		try{
			const response = await axios.put(`${BASE_URL}/api/Product/update-category`, category);
			return response.data;
		}catch (error){
			throw error;
		}
	};

	/** Tạo sản phẩm */
	const createProduct = async (product) => {
		try {
			const response = await axios.post(`${BASE_URL}/api/product/create-product`, product);
			return response.data;
		} catch (error) {
			console.error("Lỗi khi tạo sản phẩm:", error.response?.data || error.message);
			throw error;
		}
	};


	/** Xóa sản phẩm */
	const deleteProduct = async (id) => {
		try {
			const response = await axios.delete(`${BASE_URL}/api/product/delete-product/${id}`);
			if (response.status >= 200 && response.status < 300) {
				return true; // SignalR sẽ tự động cập nhật danh sách sản phẩm
			}
		} catch (error) {
			console.error("Lỗi khi xóa sản phẩm:", error.response?.data || error.message);
		}
	};

	/** cập nhật sản phẩm */
	const updateProduct = async (product) => {
		try{
			const response = await axios.put(`${BASE_URL}/api/product/update-product`, product);
			return response.data;
		}catch(error){
			throw error;
		}
	};

	/** Tìm kiếm sản phẩm */
	const searchProduct = async (value) => {
		if (!value.trim()) {
			fetchProducts();
			return;
		}
		try {
			const response = await axios.get(`${BASE_URL}/api/Product/search-product`, {
				params: { title: value },
			});
			setProducts(response.data || []);
		} catch (error) {
			console.error("Lỗi khi tìm kiếm sản phẩm:", error.response?.data || error.message);
		}
	};

	/** upload image */
	const uploadImage = async (image) => {
		try{
			const response = await axios.post(`${BASE_URL}/api/Product/create-image`, image);
			return response.data;
		}catch(error){
			throw error;
		}
	};

	/** upload image */
	const updateImage = async (image) => {
		try{
			const response = await axios.put(`${BASE_URL}/api/Product/update-image`, image);
			return response.data;
		}catch (error){
			throw error;
		}
	}

	/** delete image */
	const deleteImage = async (id) => {
		try{
			const response = await axios.delete(`${BASE_URL}/api/Product/delete-image/${id}`);
			return response.data;
		}catch(error){
			throw error;
		}
	}

	/** create variant */
	const createVariant= async (variant)=>{
		try{
			const response = await axios.post(`${BASE_URL}/api/Product/create-product-variant`, variant);
			return response.data;
		}catch(error){
			throw error;
		}
	}

	// update variant
	const updateVariant = async (variant) => {
		try{
			const response = await axios.put(`${BASE_URL}/api/Product/update-product-variant`, variant);
			return response.data;
		}catch(error){
			throw error;
		}
	}
	/**
	 * them thue cho san pham
	 * @param {number} productId
	 * @param {number} taxId
	 * @return {object} product
	 * */
	const addProductTax= async (productId,taxId) => {
		try{
			var productTax = {
				productId: productId,
				taxId: taxId
			}
			const response = await axios.post(`${BASE_URL}/api/product/add-tax`, productTax);
			return response.data;
		}catch(error){
			throw error;
		}
	}
	/**
	 * them thue cho san pham
	 * @param {number} id
	 * @return {object} product
	 * */
	const deleteProductTax= async (id) => {
		try{
			const response = await axios.delete(`${BASE_URL}/api/product/remove-tax/?productTaxid=${id}`);
			return response.data;
		}catch(error){
			throw error;
		}
	}
	/** Kết nối với SignalR */
	useEffect(() => {
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`${BASE_URL}/productHub`)
			.withAutomaticReconnect()
			.build();

		connection.start()
			.then(() => setHubConnection(connection))
			.catch(err => console.error("Lỗi khi kết nối SignalR:", err));

		return () => {
			if (connection.state === signalR.HubConnectionState.Connected) {
				connection.stop();
			}
		};
	}, []);

	/** Lắng nghe sự kiện từ SignalR */
	useEffect(() => {
		if (!hubConnection) return;

		const handleProductChange = (productUpdated) => {
			setProducts((prevProducts) =>
				prevProducts.map((product) =>
					product.id === productUpdated.id ? productUpdated : product
				)
			);

		};
		const handleCategoriesChange = (groups) => {
			setGroupCategories(groups);
		}
		hubConnection.on("ProductUpdated", handleProductChange);
		hubConnection.on("ProductAdded", handleProductChange);
		hubConnection.on("ProductDeleted", handleProductChange);
		hubConnection.on("ProductCategoryAdded",handleCategoriesChange);
		hubConnection.on("ProductCategoryUpdated",handleCategoriesChange);
		return () => {
			hubConnection.off("ProductUpdated", handleProductChange);
			hubConnection.off("ProductAdded", handleProductChange);
			hubConnection.off("ProductDeleted", handleProductChange);
			hubConnection.off("ProductCategoryAdded",handleCategoriesChange);
			hubConnection.off("ProductCategoryUpdated",handleCategoriesChange);
		};
	}, [hubConnection]);
	// lắng nghe sư kiện update của product


	/** Gọi API khi thay đổi danh mục, trang hoặc kích thước trang */
	useEffect(() => {
		if (search === "") {
			fetchProducts();
		}
	}, [selectedCategory, page, size]);

	/** Lấy danh mục và thuế ngay khi khởi động */
	useEffect(() => {
		if(taxes.length===0){
			fetchTaxes();
		}if(groupCategories.length ===0){
			fetchGroupCategories();
		}
	}, [taxes,groupCategories]);

	useEffect(()=>{
		setCategories(()=>{
			return groupCategories.flatMap(group => group.categories);
		});
	},[groupCategories])

	/** Delay tìm kiếm để tránh spam API */
	useEffect(() => {
		const delaySearch = setTimeout(() => {
			if (search.trim() !== "") {
				searchProduct(search);
			} else {
				fetchProducts();
			}
		}, 500);

		return () => clearTimeout(delaySearch);
	}, [search]);

	return (
		<ProductContext.Provider
			value={{
				products,
				setProducts,
				loading,
				selectedCategory,
				setSelectedCategory,
				page,
				setPage,
				size,
				setSize,
				groupCategories,
				setGroupCategories,
				createProduct,
				deleteProduct,
				search,
				setSearch,
				getProductById,
				updateProduct,
				uploadImage,
				updateImage,
				createVariant,
				updateVariant,
				deleteImage,
				createCategory,
				updateCategory,
				taxes,
				addProductTax,
				deleteProductTax,
				categories,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};
