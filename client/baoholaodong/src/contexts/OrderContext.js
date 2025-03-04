import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import * as signalR from "@microsoft/signalr";

const BASE_URL = process.env.REACT_APP_BASE_URL_API;
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [hubConnection, setHubConnection] = useState(null);

    /** Fetch order list with pagination */
    const fetchOrders = useCallback(async () => {
        console.log("Fetching orders..."); // Kiểm tra function có chạy
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/Order/getall-orders`, {
                params: { page, pageSize: size },
            });
            console.log("API Response:", response.data); // Kiểm tra phản hồi từ API
            setOrders(response.data || []);
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    }, [page, size]);
    

    /** Fetch order details by ID */
    const getOrderById = async (id) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/Order/get-order/${id}`);
            return data;
        } catch (error) {
            console.error("Error fetching order details:", error.response?.data || error.message);
            return null;
        }
    };

    /** Create a new order */
    const createOrder = async (order) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/Order/create-order`, order);
            return data;
        } catch (error) {
            console.error("Error creating order:", error.response?.data || error.message);
            throw error;
        }
    };

    /** Update an existing order */
    const updateOrder = async (order) => {
        try {
            const { data } = await axios.put(`${BASE_URL}/api/Order/update-order`, order);
            return data;
        } catch (error) {
            console.error("Error updating order:", error.response?.data || error.message);
            throw error;
        }
    };

    /** Delete an order by ID */
    const deleteOrder = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/Order/delete-order/${id}`);
            return true;
        } catch (error) {
            console.error("Error deleting order:", error.response?.data || error.message);
            return false;
        }
    };

    /** Establish SignalR connection */
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${BASE_URL}/orderHub`)
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => setHubConnection(connection))
            .catch(err => console.error("Error connecting to SignalR:", err));

        return () => {
            if (connection.state === signalR.HubConnectionState.Connected) {
                connection.stop();
            }
        };
    }, []);

    /** Handle real-time updates from SignalR */
    useEffect(() => {
        if (!hubConnection) return;

        const handleOrderUpdate = () => fetchOrders();

        hubConnection.on("OrderUpdated", handleOrderUpdate);
        hubConnection.on("OrderAdded", handleOrderUpdate);
        hubConnection.on("OrderDeleted", handleOrderUpdate);

        return () => {
            hubConnection.off("OrderUpdated", handleOrderUpdate);
            hubConnection.off("OrderAdded", handleOrderUpdate);
            hubConnection.off("OrderDeleted", handleOrderUpdate);
        };
    }, [hubConnection, fetchOrders]);

    useEffect(() => {
        setLoading(true);
        fetch("/api/Order/getall-orders") // Thay URL bằng API thực tế
          .then((response) => response.json())
          .then((data) => {
            console.log("Dữ liệu đơn hàng:", data); // Kiểm tra dữ liệu trong console
            setOrders(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Lỗi khi tải đơn hàng:", error);
            setLoading(false);
          });
      }, []);
      
      useEffect(() => {
        console.log("useEffect triggered...");
        fetchOrders();
    }, [page, size, fetchOrders]);
    
    useEffect(() => {
        console.log("Updated orders:", orders);
    }, [orders]);
    

    return (
        <OrderContext.Provider
            value={{
                orders,
                loading,
                page,
                setPage,
                size,
                setSize,
                createOrder,
                deleteOrder,
                getOrderById,
                updateOrder,
                fetchOrders,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};
