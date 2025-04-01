import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilter, FaCartPlus, FaRegFrown, FaCog, FaAngleDown, FaSearch, FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';
import { CustomerProductContext } from '../../contexts/CustomerProductContext';
import { CartContext } from '../../contexts/CartContext';
import { toSlug } from "../../utils/SlugUtils";
import ProductPopup from '../../components/productpopup';
import './ProductListCategory.css';
import PageWrapper from "../../components/pageWrapper/PageWrapper";

const useQuery = () => new URLSearchParams(useLocation().search);

const getMinVariant = (product) => {
    if (!product.productVariants || product.productVariants.length === 0) return null;
    return product.productVariants.reduce((min, variant) => {
        const discount = variant.discount || 0;
        const finalPrice = variant.price - (variant.price * discount / 100);
        const minPrice = min.price - (min.price * (min.discount || 0) / 100);
        return finalPrice < minPrice ? variant : min;
    });
};

const getMinVariantPrice = (product) => {
    const variant = getMinVariant(product);
    if (!variant) return product.priceAfterDiscount || product.price;
    const discount = variant.discount || 0;
    return variant.price - (variant.price * discount / 100);
};

const ProductList = () => {
    const { group, cate } = useParams();
    const query = useQuery();
    const search = query.get("search")?.trim() || "";
    const [selectedFilter, setSelectedFilter] = useState(null); // Thay selectedFilters bằng selectedFilter
    const [products, setProducts] = useState([]);
    const { groupCategories, searchProduct } = useContext(CustomerProductContext);
    const { addToCart } = useContext(CartContext);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedGroups, setExpandedGroups] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const productsPerPage = 20;
    const navigate = useNavigate();
    const filters = ["Giá tăng dần", "Giá giảm dần", "Rating"]; // Thêm filters mới

    const handleOpenPopup = (product) => {
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    const handleAddToCart = (product) => {
        const cartItem = {
            id: product.id,
            name: product.name,
            image: product.image || "/placeholder.svg",
            quantity: 1,
            selectedVariant: null,
            price: product.price,
            priceAfterDiscount: product.priceAfterDiscount || product.price,
            discount: product.discount || 0,
            quantityInStock: product.quantity,
        };
        addToCart(cartItem);
    };

    const handleNavigateToDetail = (product) => {
        navigate(`/products/${product.slug}`);
    };

    const toggleGroupExpand = (groupId) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [groupId]: !prev[groupId],
        }));
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await searchProduct(search);
                let sortedProducts = [...allProducts];
                if (selectedFilter === "Giá tăng dần") {
                    sortedProducts.sort((a, b) => getMinVariantPrice(a) - getMinVariantPrice(b));
                } else if (selectedFilter === "Giá giảm dần") {
                    sortedProducts.sort((a, b) => getMinVariantPrice(b) - getMinVariantPrice(a));
                } else if (selectedFilter === "Rating") {
                    sortedProducts.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
                }
                setTotalPages(Math.ceil(sortedProducts.length / productsPerPage));
                const startIndex = (currentPage - 1) * productsPerPage;
                const endIndex = startIndex + productsPerPage;
                setProducts(sortedProducts.slice(startIndex, endIndex));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [search, selectedFilter, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <PageWrapper title={search || "Tất cả sản phẩm"}>
            <div className="product-list-category-container">
                <div className="product-list-category-banner-container">
                    <img
                        src="https://img.freepik.com/premium-photo/personal-protective-equipment-safety-banner-with-place-text_106035-3441.jpg"
                        alt="Banner"
                        className="product-list-category-banner-image"
                    />
                    <div className="product-list-category-banner-overlay">
                        <h1 className="product-list-category-banner-title">{search || "Sản phẩm"}</h1>
                    </div>
                </div>

                <div className="product-list-category-mobile-filter-toggle">
                    <button
                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                        className="product-list-category-mobile-filter-button"
                    >
                        <span className="product-list-category-filter-button-text">
                            <FaFilter className="product-list-category-filter-icon" />
                            Bộ lọc sản phẩm
                        </span>
                        <FaAngleDown className={`product-list-category-filter-arrow ${mobileFiltersOpen ? "rotate-180" : ""}`} />
                    </button>
                </div>

                <div className="product-list-category-main-content">
                    <div className="product-list-category-content-wrapper">
                        <div className={`product-list-category-filter-section ${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
                            <div className="product-list-category-filter-container">
                                <div className="product-list-category-filter-header">
                                    <FaFilter className="product-list-category-filter-icon" />
                                    <span className="product-list-category-filter-title">BỘ LỌC SẢN PHẨM</span>
                                </div>

                                <div className="product-list-category-search-section">
                                    <div className="product-list-category-search-wrapper">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm sản phẩm..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="product-list-category-search-input"
                                        />
                                        <FaSearch className="product-list-category-search-icon" />
                                    </div>
                                </div>

                                {/* Thay checkbox bằng nút filter */}
                                <div className="product-list-category-price-filter-section">
                                    <h3 className="product-list-category-section-title">Sắp xếp theo</h3>
                                    <div className="flex flex-col gap-2">
                                        {filters.map((filter, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedFilter(filter)}
                                                className={`filter-button-new ${selectedFilter === filter ? "selected" : ""}`}
                                            >
                                                {filter}
                                                {selectedFilter === filter && <FaCheck className="ml-2 inline" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="product-list-category-category-section">
                                    <h3 className="product-list-category-section-title">Loại Sản Phẩm</h3>
                                    <div className="product-list-category-category-options">
                                        {groupCategories.map((groupItem) => (
                                            <div key={groupItem.groupId} className="product-list-category-category-group">
                                                <div
                                                    className={`product-list-category-category-group-header ${Number.parseInt(group) === groupItem.groupId ? "active" : ""}`}
                                                    onClick={() => toggleGroupExpand(groupItem.groupId)}
                                                >
                                                    <span
                                                        className="product-list-category-group-name"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/products/${groupItem.groupId}/0/${toSlug(groupItem.groupName)}`);
                                                        }}
                                                    >
                                                        {groupItem.groupName}
                                                    </span>
                                                    <FaAngleDown
                                                        className={`product-list-category-group-arrow ${expandedGroups[groupItem.groupId] ? "rotate-180" : ""}`}
                                                    />
                                                </div>
                                                {expandedGroups[groupItem.groupId] && (
                                                    <div className="product-list-category-subcategory-list">
                                                        {groupItem.categories.map((category) => (
                                                            <div
                                                                key={category.categoryId}
                                                                className={`product-list-category-subcategory-item ${Number.parseInt(group) === groupItem.groupId && Number.parseInt(cate) === category.categoryId ? "active" : ""}`}
                                                                onClick={() => navigate(`/products/${groupItem.groupId}/${category.categoryId}/${toSlug(groupItem.groupName)}`)}
                                                            >
                                                                {category.categoryName}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="product-list-category-product-section">
                            {products.length === 0 ? (
                                <div className="product-list-category-empty-product-container">
                                    <FaRegFrown className="product-list-category-empty-icon" />
                                    <h3 className="product-list-category-empty-title">Không tìm thấy sản phẩm</h3>
                                    <p className="product-list-category-empty-message">
                                        Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <motion.div
                                        className="product-list-category-product-grid"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                                            exit: { opacity: 0 },
                                        }}
                                    >
                                        {products.map((product) => (
                                            <motion.div
                                                key={product.id}
                                                className="product-list-category-product-card"
                                                variants={{
                                                    hidden: { opacity: 0, y: 20 },
                                                    visible: { opacity: 1, y: 0 },
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="product-list-category-product-image-container">
                                                    <img
                                                        src={product.image || "/placeholder.svg"}
                                                        alt={product.name}
                                                        className="product-list-category-product-image"
                                                    />
                                                    <div className="product-list-category-image-overlay">
                                                        <button
                                                            className="product-list-category-view-details-button"
                                                            onClick={() => handleNavigateToDetail(product)}
                                                        >
                                                            Xem chi tiết
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="product-list-category-product-info">
                                                    <h3 className="product-list-category-product-name">{product.name}</h3>
                                                    <div className="product-price">
                                                        {product.discount > 0 ? (
                                                            <>
                                                                <span className="text-red-500">{(product.priceAfterDiscount || (product.price - product.discount)).toLocaleString()}đ</span>
                                                                <span className="text-gray-400 line-through ml-2">{product.price.toLocaleString()}đ</span>
                                                                <p className="product-discount-percentage"> Giảm {product.discount} %</p>
                                                            </>
                                                        ) : (
                                                            <span>{product.price.toLocaleString()}đ</span>
                                                        )}
                                                    </div>
                                                    {product.productVariants && product.productVariants.length > 0 ? (
                                                        <button
                                                            className="product-list-category-options-button"
                                                            onClick={() => handleOpenPopup(product)}
                                                        >
                                                            <FaCog className="product-list-category-button-icon" />
                                                            <span>Tùy chọn</span>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="product-list-category-add-to-cart-button"
                                                            onClick={() => handleAddToCart(product)}
                                                        >
                                                            <FaCartPlus className="product-list-category-button-icon" />
                                                            <span>Thêm vào giỏ</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    {totalPages > 1 && (
                                        <div className="product-list-category-pagination-container">
                                            <div className="product-list-category-pagination-buttons">
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className={`product-list-category-pagination-button ${currentPage === 1 ? "disabled" : ""}`}
                                                >
                                                    <FaChevronLeft className="product-list-category-pagination-icon" />
                                                </button>
                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`product-list-category-pagination-button ${currentPage === page ? "active" : ""}`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className={`product-list-category-pagination-button ${currentPage === totalPages ? "disabled" : ""}`}
                                                >
                                                    <FaChevronRight className="product-list-category-pagination-icon" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {selectedProduct && <ProductPopup product={selectedProduct} onClose={handleClosePopup} />}
            </div>
        </PageWrapper>
    );
};

export default ProductList;