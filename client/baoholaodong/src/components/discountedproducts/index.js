import React, { useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import './style.css';

const index = [
    { id: 1, name: "Product 1", price: "100,000 VND", discountPrice: "80,000 VND", discountPercentage: " Giảm 20%", image: "path/to/image1.jpg" },
    { id: 2, name: "Product 2", price: "200,000 VND", discountPrice: "150,000 VND", discountPercentage: "Giảm 25%", image: "path/to/image2.jpg" },
    { id: 2, name: "Product 2", price: "200,000 VND", discountPrice: "150,000 VND", discountPercentage: "Giảm 25%", image: "path/to/image2.jpg" },
    { id: 2, name: "Product 2", price: "200,000 VND", discountPrice: "150,000 VND", discountPercentage: "Giảm 25%", image: "path/to/image2.jpg" },
    { id: 2, name: "Product 2", price: "200,000 VND", discountPrice: "150,000 VND", discountPercentage: "Giảm 25%", image: "path/to/image2.jpg" },
    { id: 2, name: "Product 2", price: "200,000 VND", discountPrice: "150,000 VND", discountPercentage: "Giảm 25%", image: "path/to/image2.jpg" },
    { id: 2, name: "Product 2", price: "200,000 VND", discountPrice: "150,000 VND", discountPercentage: "Giảm 25%", image: "path/to/image2.jpg" },
    { id: 2, name: "Product 2", price: "200,000 VND", discountPrice: "150,000 VND", discountPercentage: "Giảm 25%", image: "path/to/image2.jpg" },

];

export default function DiscountedProducts() {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    };

    return (
        <div className="deal">
            <div className="container flex">
                <div className="deal-info flex flex-col items-center">
                    <h2 className="deal-title-text"><span className="highlight">"BÃO</span> DEAL" GIẢM GIÁ</h2>
                    <div className="navigate-button-container">
                        <button onClick={scrollLeft} className="navigate-button">
                            <FaArrowLeft />
                        </button>
                        <button onClick={scrollRight} className="navigate-button">
                            <FaArrowRight />
                        </button>
                    </div>
                    <button className="view-all-button mt-4">Xem tất cả <FaArrowRight className="inline" /></button>
                </div>
                <div ref={scrollRef} className="flex overflow-x-auto space-x-4 product-container">
                    {index.map((product) => (
                        <div key={product.id} className="w-64 flex-shrink-0 bg-white shadow-lg rounded-lg p-4">
                            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
                            <div className="mt-4">
                                <h3 className="product-name">{product.name}</h3>
                                <div className="flex items-center">
                                    <p className="text-red-600 font-bold">{product.discountPrice}</p>
                                    <p className="text-gray-500 line-through text-sm ml-2">{product.price}</p>
                                </div>
                                <p className="text-gold font-bold">{product.discountPercentage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}