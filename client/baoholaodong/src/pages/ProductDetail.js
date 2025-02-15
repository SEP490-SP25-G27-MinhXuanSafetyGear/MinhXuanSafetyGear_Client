import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Loading from "../components/Loading/Loading";
import * as signalR from "@microsoft/signalr";
import {CustomerProductContext} from "../contexts/CustomerProductContext";
const BASE_URL = process.env.REACT_APP_BASE_URL_API;
const ProductDetail = () => {
    const { id } = useParams();
    const { getProductById } = useContext(CustomerProductContext);
    const [product, setProduct] = useState({
        id: parseInt(id),
        name: "",
        description: "",
        material: "oke nha",
        origin: "han quoc",
        categoryId: 1,
        categoryName: "",
        quantity: 0,
        price: 0,
        priceDiscount: 0,
        discount: 0,
        createdAt: "2025-02-11T18:30:25.43",
        updatedAt: "2025-02-14T22:16:08.1",
        status: true,
        averageRating: 0,
        qualityCertificate:"",
        productImages: [
            {
                id: 0,
                fileName: "",
                image: "",
                description: null,
                isPrimary: true
            }
        ],
        productVariants: [
            {
                variantId: 0,
                productId: 0,
                size: "",
                color: "",
                quantity: 0,
                price: 0.01,
                discount: 0,
                status: true
            }
        ]
    });
    const [isLoading, setIsLoading] = useState(true);
    const [hubConnection, setHubConnection] = useState(null);
    // Fetch product data
    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const data = await getProductById(id);
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Kết nối SignalR
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${BASE_URL}/productHub`)
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => {
                console.log("Connected to SignalR");
                setHubConnection(connection);
            })
            .catch(err => console.error("Lỗi khi kết nối SignalR:", err));

        return () => {
            if (connection.state === signalR.HubConnectionState.Connected) {
                connection.stop();
            }
        };
    }, []);

    // Xử lý sự kiện khi sản phẩm được cập nhật
    useEffect(() => {
        if (!hubConnection || hubConnection.state !== signalR.HubConnectionState.Connected) return;

        const handleProductChange = (updatedProduct) => {
            console.log(`Received update for product ID: ${updatedProduct}`);
            if (updatedProduct.id.toString() === id) {
                console.log(`Product ${updatedProduct} matches current product. Fetching data...`);
                fetchProduct();
            }
        };

        hubConnection.on("ProductUpdated", handleProductChange);

        return () => {
            if (hubConnection.state === signalR.HubConnectionState.Connected) {
                hubConnection.off("ProductUpdated", handleProductChange);
            }
        };
    }, [hubConnection, id]);

    // Gọi API để lấy sản phẩm khi `id` thay đổi
    useEffect(() => {
        const fetchData = async () => {
            await fetchProduct();
        };
        fetchData();
    }, [id]);
    return (
        <div className="max-w-5xl mx-auto p-4">
            <Loading isLoading={isLoading} />
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img
                            key={product.productImages[0].image} // Thêm key để React nhận biết thay đổi
                            alt="Protective workwear displayed in an industrial setting"
                            className="rounded-lg"
                            height="500"
                            src={product.productImages[0].image}
                            width="500"
                        />

                    </div>
                    <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <div className="flex items-center mt-2">
                            <div className="text-yellow-500">
                                {[...Array(product.averageRating === 0 ? 5 : product.averageRating)].map((_, i) => (
                                    <i key={i} className="fas fa-star"></i>
                                ))}
                            </div>
                            <span className="ml-2 text-gray-600">(45 đánh giá)</span>
                        </div>
                        <div className="mt-4">
                            <span className="text-2xl font-bold text-red-500">
                                {product.priceDiscount.toLocaleString()}₫
                            </span>
                            <span className="text-gray-500 line-through ml-2">
                                {product.price.toLocaleString()}₫
                            </span>
                            <span className="bg-red-100 text-red-500 text-sm font-semibold ml-2 px-2 py-1 rounded">
                                Giảm {product.discount}%
                            </span>
                        </div>
                        <div className="flex items-center mt-4">
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l">-</button>
                            <input
                                className="w-12 text-center border-t border-b border-gray-200"
                                type="text"
                                value="1"
                            />
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r">+</button>
                            <button className="bg-blue-500 text-white px-6 py-2 rounded ml-4">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Đặc điểm nổi bật</h2>
                            <span className="text-gray-500 ml-2">
                                {product.description.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </span>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Chọn hình thức vận chuyển</h2>
                            <div className="flex items-center mt-2">
                                <input className="mr-2" id="standard" name="shipping" type="radio" />
                                <label className="text-gray-700" htmlFor="standard">
                                    Giao hàng tiêu chuẩn
                                </label>
                            </div>
                            <div className="flex items-center mt-2">
                                <input className="mr-2" id="express" name="shipping" type="radio" />
                                <label className="text-gray-700" htmlFor="express">
                                    Giao hàng nhanh
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                <h2 className="text-xl font-bold">Thông số kỹ thuật</h2>
                <div className="flex flex-col md:flex-row mt-4">
                    <div className="md:w-1/2">
                        <h3 className="text-lg font-semibold">Chi tiết sản phẩm</h3>
                        <ul className="list-disc list-inside mt-2 text-gray-700">
                            <li>Chất liệu: {product.material}</li>
                            <li>Màu sắc: {[...new Set(product.productVariants.map(v => v.color))].join(" - ")}</li>
                            <li>Kích thước: {[...new Set(product.productVariants.map(v => v.size))].join(" , ")}</li>
                            <li>Xuất xứ: {product.origin}</li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 mt-4 md:mt-0 md:pl-6">
                        <h3 className="text-lg font-semibold">Chứng nhận chất lượng</h3>
                        <span className="text-gray-500 ml-2">
                                {product.qualityCertificate.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br/>
                                    </React.Fragment>
                                ))}
                            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;