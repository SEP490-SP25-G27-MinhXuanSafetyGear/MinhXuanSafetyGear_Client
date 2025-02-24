import React, { useState, useEffect } from 'react';
import './style.css';
import { FaFilter, FaCartPlus } from 'react-icons/fa';

const ProductList = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [products, setProducts] = useState([]);

    const priceFilters = [
        "Dưới 1 triệu",
        "1 triệu - 3 triệu",
        "3 triệu - 5 triệu",
        "Trên 5 triệu",
    ];

    const categoryFilters = [
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
        "Category 5",
    ];

    useEffect(() => {
        // Hardcoded example products
        const exampleProducts = [
            {
                id: 1,
                name: 'Mũ lính cứu hỏa',
                image: 'https://vadisafire.com/image/cache/catalog/vadisafire/Mu%20chua%20chay/mu-bao-ho-linh-cuu-hoa-650x650.jpg',
                price: 1000000,
            },
            {
                id: 2,
                name: 'Bộ quần áo',
                image: 'https://vadisafire.com/image/cache/catalog/vadisafire/Mu%20chua%20chay/mu-bao-ho-linh-cuu-hoa-650x650.jpg',
                price: 2000000,
            },
            {
                id: 3,
                name: 'Bộ quần áo',
                image: 'https://vadisafire.com/image/cache/catalog/vadisafire/Mu%20chua%20chay/mu-bao-ho-linh-cuu-hoa-650x650.jpg',
                price: 3000000,
            },
            {
                id: 3,
                name: 'Bộ quần áo',
                image: 'https://vadisafire.com/image/cache/catalog/vadisafire/Mu%20chua%20chay/mu-bao-ho-linh-cuu-hoa-650x650.jpg',
                price: 3000000,
            },
            {
                id: 3,
                name: 'Bộ quần áo',
                image: 'https://vadisafire.com/image/cache/catalog/vadisafire/Mu%20chua%20chay/mu-bao-ho-linh-cuu-hoa-650x650.jpg',
                price: 3000000,
            },
            {
                id: 3,
                name: 'Bộ quần áo',
                image: 'https://vadisafire.com/image/cache/catalog/vadisafire/Mu%20chua%20chay/mu-bao-ho-linh-cuu-hoa-650x650.jpg',
                price: 3000000,
            },
        ];
        setProducts(exampleProducts);
    }, []);

    const handleFilterChange = (filter) => {
        setSelectedFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((item) => item !== filter)
                : [...prev, filter]
        );
    };

    return (
        <div className="product-list-page">
            <h1 className="page-title">Trang Thiết Bị Bảo Hộ</h1>
            <div className="banner">
                <img src="https://bhld.net/wp-content/uploads/2015/01/banner-mu-bhld-1.jpg" alt="Banner" />
            </div>
            <div className="content">
                <div className="filter-section">
                    <div className="product-filter">
                        <div className="filter-header">
                            <FaFilter className="filter-icon" />
                            <span className="filter-title">BỘ LỌC SẢN PHẨM</span>
                        </div>
                        <div className="filter-options">
                            <h3 className="filter-subtitle">Chọn Mức Giá</h3>
                            {priceFilters.map((filter, index) => (
                                <label key={index} className="filter-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.includes(filter)}
                                        onChange={() => handleFilterChange(filter)}
                                        className="filter-checkbox"
                                    />
                                    <span>{filter}</span>
                                </label>
                            ))}
                        </div>
                        <hr className="filter-divider" />
                        <div className="filter-options">
                            <h3 className="filter-subtitle">Loại Sản Phẩm</h3>
                            {categoryFilters.map((filter, index) => (
                                <label key={index} className="filter-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.includes(filter)}
                                        onChange={() => handleFilterChange(filter)}
                                        className="filter-checkbox"
                                    />
                                    <span>{filter}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="product-section">
                    <div className="product-list">
                        {products.map((product) => (
                            <div key={product.id} className="product-list-item">
                                <img src={product.image} alt={product.name} className="product-image" />
                                <h3 className="product-list-name">{product.name}</h3>
                                <p className="product-list-price">{product.price.toLocaleString()} VND</p>
                                <button className="add-to-cart-button-product-list">
                                    <FaCartPlus className="add-to-cart-icon" />
                                    <span className="add-to-cart-text">Thêm vào giỏ</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;