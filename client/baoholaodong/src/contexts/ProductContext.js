import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import * as signalR from "@microsoft/signalr";

const BASE_URL = process.env.REACT_APP_BASE_URL_API;
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [categories, setCategories] = useState([]);
	const [hubConnections, setHubConnections] = useState(null);
	const [search, setSearch] = useState("");
	
	useEffect(() => {
		if(search !== ""){
			fetchProducts();
		}
	}, [selectedCategory, page, size]);
	
	useEffect(() => {
		fetchCategories();
	}, []);
	
	useEffect(() => {
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`${BASE_URL}/productHub`)
			.withAutomaticReconnect()
			.build();
		
		connection.start()
			.then(() => setHubConnections(connection))
			.catch(err => console.error("Lỗi khi kết nối SignalR:", err));
		
		return () => {
			connection.stop();
		};
	}, []);
	
	useEffect(() => {
		if (!hubConnections) return;
		
		hubConnections.on("ProductUpdated", fetchProducts);
		hubConnections.on("ProductAdded", fetchProducts);
		hubConnections.on("ProductDeleted", fetchProducts);
		
		return () => {
			hubConnections.off("ProductUpdated");
			hubConnections.off("ProductAdded");
			hubConnections.off("ProductDeleted");
		};
	}, [hubConnections]);
	
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
	
	const fetchProducts = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${BASE_URL}/api/Product/get-product-page`, {
				params: { category: selectedCategory, page, pagesize: size },
			});
			setProducts(response.data.items || []);
		} catch (error) {
			console.error("Lỗi khi lấy sản phẩm:", error);
		} finally {
			setLoading(false);
		}
	};
	
	const fetchCategories = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/api/Product/getall-category`);
			setCategories(response.data || []);
		} catch (error) {
			console.error("Lỗi khi lấy danh mục sản phẩm:", error);
			setCategories([]);
		}
	};
	
	const createProduct = async (product) => {
		try {
			const response = await axios.post(`${BASE_URL}/api/product/create-product`, product);
			if (response.status >= 200 && response.status < 300) {
				fetchProducts();
				return true;
			}
		} catch (error) {
			console.error("Lỗi khi tạo sản phẩm:", error);
		}
		return false;
	};
	
	const deleteProduct = async (id) => {
		try {
			const response = await axios.delete(`${BASE_URL}/api/product/delete-product/${id}`);
			if (response.status >= 200 && response.status < 300) {
				fetchProducts();
			}
		} catch (error) {
			console.error("Lỗi khi xóa sản phẩm:", error);
		}
	};
	
	const searchProduct = async (value) => {
		if (!value || value.trim() === "") {
			fetchProducts();
			return;
		}
		try {
			const response = await axios.get(`${BASE_URL}/api/Product/search-product`, {
				params: { title: value },
			});
			setProducts(response.data || []);
		} catch (error) {
			console.error("Lỗi khi tìm kiếm sản phẩm:", error);
		}
	};
	
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
				categories,
				setCategories,
				createProduct,
				deleteProduct,
				search,
				setSearch,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};
