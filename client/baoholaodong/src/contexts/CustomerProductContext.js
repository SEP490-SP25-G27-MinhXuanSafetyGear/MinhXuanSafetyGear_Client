import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import * as signalR from "@microsoft/signalr";

const BASE_URL = process.env.REACT_APP_BASE_URL_API;
export const CustomerProductContext = createContext();
export const CustomerProductProvider =({ children }) => {
    const [topSaleProducts,setTopSaleProducts] = useState([]);

    /** Lấy thông tin chi tiết sản phẩm */
    const getProductById = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Product/get-product-by-id/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin sản phẩm:", error.response?.data || error.message);
        }
    };
    /**  get top sale product */
    const fetchTopSaleProducts = async (size) => {
        try{
            const response = await axios.get(`${BASE_URL}/api/Product/top-sale-product`,{
                params: {
                    size: size
                }
            });
            setTopSaleProducts(response.data || []);
        }catch(error){
            throw error;
        }
    }

    useEffect(() => {
        fetchTopSaleProducts();
    },[])
    return (
        <CustomerProductContext.Provider
            value={{
                topSaleProducts,
                getProductById,
            }}
        >
            {children}
        </CustomerProductContext.Provider>
    )
}