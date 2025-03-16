import React, { useContext, useEffect, useState } from 'react';
import {
    Star,
    StarHalf,
    ThumbsUp,
    MessageCircle,
    Share2,
    ShoppingCart,
    Truck,
    Package,
    Shield
} from 'lucide-react';
import { CustomerProductContext } from "../../contexts/CustomerProductContext";
import { useNavigate, useParams } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import { toSlug } from "../../utils/SlugUtils";
import { CartContext } from "../../contexts/CartContext";
import noImage from "../../images/no-image-product.jpg";
import './style.css';
const BASE_URL = process.env.REACT_APP_BASE_URL_API;

function ProductDetail() {
    const { slug, id } = useParams();
    const { addToCart } = useContext(CartContext);
    const { getProductById, fetchRelatedProducts, fetchReviewProduct } = useContext(CustomerProductContext);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [imageIndex, setImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hubConnection, setHubConnection] = useState(null);
    const navigate = useNavigate();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [review, setReview] = useState({
        totalStar: 0,
        star1: 0,
        star2: 0,
        star3: 0,
        star4: 0,
        star5: 0,
        productReviews: []
    });
    const [product, setProduct] = useState({
        id: parseInt(id),
        name: "",
        description: "",
        material: "",
        origin: "",
        categoryId: 1,
        categoryName: "",
        quantity: 0,
        price: 0,
        priceDiscount: 0,
        discount: 0,
        freeShip: false,
        guarantee: 0,
        status: true,
        averageRating: 0,
        qualityCertificate: "",
        productImages: [],
        productVariants: []
    });

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${BASE_URL}/productHub`)
            .withAutomaticReconnect()
            .build();
        connection.start()
            .then(() => {
                setHubConnection(connection);
            })
            .catch(err => console.error("Error connecting to SignalR:", err));
        return () => {
            if (connection.state === signalR.HubConnectionState.Connected) {
                connection.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (!hubConnection) return;
        const handleProductChange = (updatedProduct) => {
            if (updatedProduct.id === parseInt(id)) {
                setProduct(updatedProduct);
            }
        };
        hubConnection.on("ProductUpdated", handleProductChange);
        return () => {
            hubConnection.off("ProductUpdated", handleProductChange);
        };
    }, [hubConnection, id]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const productData = await getProductById(id);
                const relatedProductsData = await fetchRelatedProducts(parseInt(id), 10);
                const reviewData = await fetchReviewProduct(parseInt(id), 10);
                setProduct(productData);
                setRelatedProducts(relatedProductsData);
                setReview(reviewData);

                if (productData.productVariants.length > 0) {
                    setSelectedSize(productData.productVariants[0].size);
                    setSelectedColor(productData.productVariants[0].color);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, getProductById, fetchRelatedProducts, fetchReviewProduct]);

    useEffect(() => {
        if (!isLoading && product?.name) {
            const correctSlug = toSlug(product.name);
            if (slug !== correctSlug) {
                navigate(`/product/${id}/${correctSlug}`, { replace: true });
            }
            document.title = `${product.name} | Chi tiết sản phẩm`;
        }
        return () => {
            document.title = "BaoHoLaoDongMinhXuan";
        };
    }, [isLoading, product, slug, id, navigate]);

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }
        if (hasHalfStar) {
            stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }
        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }
        return stars;
    };

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert("Vui lòng chọn kích thước và màu sắc");
            return;
        }
        const selectedVariant = product.productVariants.find(
            variant => variant.size === selectedSize && variant.color === selectedColor
        );
        if (selectedVariant) {
            addToCart({
                ...product,
                selectedVariant,
                quantity
            });
        }
    };

    if (isLoading) {
        return <div className="pd-loading">Loading...</div>;
    }

    return (
        <div className="pd-container">
            {/* Thông tin sản phẩm và các chi tiết */}
            <div className="pd-card">
                <div className="pd-grid">
                    <div className="pd-images">
                        <div className="pd-main-image">
                            <img
                                src={product.productImages[imageIndex]?.image || noImage}
                                alt={product.name}
                                className="pd-main-img"
                            />
                        </div>
                        <div className="pd-thumbnails">
                            {product.productImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`pd-thumbnail ${imageIndex === idx ? 'active' : ''}`}
                                    onClick={() => setImageIndex(idx)}
                                >
                                    <img
                                        src={img.image || noImage}
                                        alt={`View ${idx + 1}`}
                                        className="pd-thumb-img"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pd-info">
                        <h1 className="pd-title">{product.name}</h1>
                        <div className="pd-rating">
                            {renderStars(product.averageRating)}
                            <span className="pd-review-count">({review.totalStar} đánh giá)</span>
                        </div>
                        <div className="pd-price-section">
                            <span className="pd-price">{product.priceDiscount.toLocaleString()}đ</span>
                            {product.discount > 0 && (
                                <>
                                    <span className="pd-original-price">{product.price.toLocaleString()}đ</span>
                                    <span className="pd-discount">-{product.discount}%</span>
                                </>
                            )}
                        </div>
                        {product.productVariants.length > 0 && (
                            <div className="pd-variants">
                                <div className="pd-variant-group">
                                    <label className="pd-variant-label">Kích thước</label>
                                    <div className="pd-variant-options">
                                        {[...new Set(product.productVariants.map(v => v.size))].map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`pd-variant-button square ${selectedSize === size ? 'selected' : ''}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="pd-variant-group">
                                    <label className="pd-variant-label">Màu sắc</label>
                                    <div className="pd-variant-options">
                                        {[...new Set(product.productVariants.map(v => v.color))].map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`pd-variant-button circle ${selectedColor === color ? 'selected' : ''}`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="pd-quantity-cart">
                            <div className="pd-quantity">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="pd-quantity-btn">-</button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="pd-quantity-input"
                                />
                                <button onClick={() => setQuantity(quantity + 1)} className="pd-quantity-btn">+</button>
                            </div>
                            <span className="pd-stock">Còn {product.quantity} sản phẩm</span>
                            <div className="pd-cart-buttons">
                                <button onClick={handleAddToCart} className="pd-cart-btn">
                                    <ShoppingCart className="pd-icon" /> Thêm vào giỏ
                                </button>
                                <button className="pd-buy-btn">
                                    <ShoppingCart className="pd-icon" /> Mua ngay
                                </button>
                            </div>
                        </div>
                        <div className="pd-addinfo">
                            {product.freeShip && (
                                <div className="pd-delivery">
                                    <Truck className="pd-icon-small" />
                                    <span>Miễn phí vận chuyển</span>
                                </div>
                            )}
                            <div className="pd-return">
                                <Package className="pd-icon-small" />
                                <span>Đổi trả trong 30 ngày</span>
                            </div>
                            {product.guarantee > 0 && (
                                <div className="pd-warranty">
                                    <Shield className="pd-icon-small" />
                                    <span>Bảo hành {product.guarantee} tháng</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pd-main-content">
                <div className="pd-left-column">
                    {/* Mô tả sản phẩm */}
                    <div className="pd-description-card">
                        <h2 className="pd-description-title">Thông tin sản phẩm</h2>
                        <div className="pd-description-content">
                            <div className="pd-description-column">
                                <h3 className="pd-subtitle">Mô tả sản phẩm</h3>
                                <div className="pd-text-content">
                                    {product.description.split("\n").map((line, idx) => (
                                        <p key={idx}>{line}</p>
                                    ))}
                                </div>
                                <h3 className="pd-subtitle">Chất liệu</h3>
                                <p>{product.material}</p>
                            </div>
                            <div className="pd-description-column">
                                <h3 className="pd-subtitle">Xuất xứ</h3>
                                <p>{product.origin}</p>
                                <h3 className="pd-subtitle">Chứng nhận chất lượng</h3>
                                <div>
                                    {product.qualityCertificate.split('\n').map((cert, idx) => (
                                        <p key={idx}>{cert}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Đánh giá khách hàng */}
                    <div className="pd-review-card">
                        <div className="pd-review-header">
                            <h2 className="pd-review-title">Đánh giá từ khách hàng</h2>
                            <button className="pd-review-write">Viết đánh giá</button>
                        </div>
                        <div className="pd-review-summary">
                            <div className="pd-review-average">
                                <div className="pd-review-number">{product.averageRating}</div>
                                <div className="pd-review-stars">{renderStars(product.averageRating)}</div>
                                <div className="pd-review-total">{review.totalStar} đánh giá</div>
                            </div>
                            <div className="pd-review-bars">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className="pd-review-bar">
                                        <span className="pd-review-bar-star">{star}★</span>
                                        <div className="pd-bar-bg">
                                            <div
                                                className="pd-bar-fill"
                                                style={{
                                                    width: `${(review[`star${star}`] / review.totalStar) * 100}%`
                                                }}
                                            />
                                        </div>
                                        <span className="pd-review-percent">
                      {((review[`star${star}`] / review.totalStar) * 100).toFixed(1)}%
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pd-review-list">
                            {review.productReviews.map((rev) => (
                                <div key={rev.reviewId} className="pd-review-item">
                                    <div className="pd-review-user">
                                        <img
                                            src={rev.customerImage || "https://via.placeholder.com/40"}
                                            alt={rev.customerName}
                                            className="pd-review-user-img"
                                        />
                                        <div className="pd-review-user-info">
                                            <h4 className="pd-user-name">{rev.customerName}</h4>
                                            <div className="pd-review-user-rating">
                                                {renderStars(rev.rating)}
                                                <span className="pd-review-date">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="pd-review-comment">{rev.comment}</p>
                                    <div className="pd-review-actions">
                                        <button className="pd-review-action-btn">
                                            <ThumbsUp className="pd-icon-small" /> Hữu ích
                                        </button>
                                        <button className="pd-review-action-btn">
                                            <MessageCircle className="pd-icon-small" /> Trả lời
                                        </button>
                                        <button className="pd-review-action-btn">
                                            <Share2 className="pd-icon-small" /> Chia sẻ
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Cột bên phải: Sản phẩm tương tự */}
                <div className="pd-right-column">
                    <div className="pd-related-products-card">
                        <h2 className="pd-related-products-title">Sản phẩm tương tự</h2>
                        <div className="pd-related-products-list">
                            {relatedProducts && relatedProducts.length > 0 ? (
                                relatedProducts.map((prod) => (
                                    <div
                                        key={prod.id}
                                        className="pd-related-product-item"
                                        onClick={() => navigate(`/product/${prod.id}/${toSlug(prod.name)}`)}
                                    >
                                        <div className="pd-related-product-image">
                                            <img src={prod.productImages[0]?.image || noImage} alt={prod.name} className="pd-related-product-img" />
                                        </div>
                                        <div className="pd-related-product-info">
                                            <h3 className="pd-related-product-name">{prod.name}</h3>
                                            <div className="pd-related-product-rating">
                                                {renderStars(prod.averageRating)}
                                            </div>
                                            <div className="pd-related-product-prices">
                                                <span className="pd-related-product-price">{prod.priceDiscount.toLocaleString()}đ</span>
                                                <span className="pd-related-product-original-price">{prod.price.toLocaleString()}đ</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Không có sản phẩm tương tự.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductDetail;