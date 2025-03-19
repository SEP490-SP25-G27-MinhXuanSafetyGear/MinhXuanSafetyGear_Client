"use client"

import { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import {
    FaFilter,
    FaCartPlus,
    FaRegFrown,
    FaCog,
    FaChevronRight,
    FaChevronLeft,
    FaAngleDown,
    FaSearch,
} from "react-icons/fa"
import { CustomerProductContext } from "../../contexts/CustomerProductContext"
import { CartContext } from "../../contexts/CartContext"
import { toSlug } from "../../utils/SlugUtils"
import ProductPopup from "../../components/productpopup"

const useQuery = () => new URLSearchParams(useLocation().search)

const ProductListCategory = () => {
    const { group, cate, slug } = useParams()
    const query = useQuery()
    const [selectedFilters, setSelectedFilters] = useState([])
    const [products, setProducts] = useState([])
    const { groupCategories, searchProduct, getProductPage } = useContext(CustomerProductContext)
    const { addToCart } = useContext(CartContext)
    const [currentPage, setCurrentPage] = useState(Number.parseInt(query.get("page")) || 1)
    const [totalPages, setTotalPages] = useState(0)
    const [pageSize] = useState(8) // Increased page size for better display
    const [categorySelected, setSelectedCategory] = useState(0)
    const navigate = useNavigate()
    const [hoveredGroup, setHoveredGroup] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [expandedGroups, setExpandedGroups] = useState({})

    const priceFilters = ["Dưới 1 triệu", "1 triệu - 3 triệu", "3 triệu - 5 triệu", "Trên 5 triệu"]

    const handleFilterChange = (filter) => {
        setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter]))
    }

    const handleOpenPopup = (product) => {
        setSelectedProduct(product)
    }

    const handleClosePopup = () => {
        setSelectedProduct(null)
    }

    const handleAddToCart = (product) => {
        addToCart(product)
        // Show toast notification
        const toast = document.createElement("div")
        toast.className = "toast-notification"
        toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-icon">✓</div>
        <div class="toast-message">Đã thêm ${product.name} vào giỏ hàng</div>
      </div>
    `
        document.body.appendChild(toast)
        setTimeout(() => {
            toast.classList.add("show")
            setTimeout(() => {
                toast.classList.remove("show")
                setTimeout(() => {
                    document.body.removeChild(toast)
                }, 300)
            }, 3000)
        }, 100)
    }

    const toggleGroupExpand = (groupId) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [groupId]: !prev[groupId],
        }))
    }

    useEffect(() => {
        let isMounted = true
        const fetchProducts = async () => {
            try {
                const result = await getProductPage(Number.parseInt(group), Number.parseInt(cate), currentPage, pageSize)
                if (isMounted) {
                    setProducts(result?.items || [])
                    setTotalPages(result?.totalPages || 0)
                }
            } catch (error) {
                console.error("Error fetching products:", error)
            } finally {
                if (groupCategories && groupCategories.length > 0) {
                    const groupExit = groupCategories.find((g) => g.groupId === Number.parseInt(group))

                    if (groupExit) {
                        const slugGroup = groupExit.groupName || ""
                        navigate(`/products/${group}/${cate}/${toSlug(slugGroup)}`, { replace: true })
                    } else {
                        console.warn("groupExit is undefined, check if groupId is valid:", group)
                    }
                } else {
                    console.warn("groupCategories is empty or undefined.")
                }
            }
        }

        fetchProducts()

        return () => {
            isMounted = false
        }
    }, [group, cate, slug, groupCategories, currentPage, pageSize])

    // Get current category name
    const getCurrentCategoryName = () => {
        if (!groupCategories || groupCategories.length === 0) return ""

        const currentGroup = groupCategories.find((g) => g.groupId === Number.parseInt(group))
        if (!currentGroup) return ""

        if (Number.parseInt(cate) === 0) return currentGroup.groupName

        const currentCategory = currentGroup.categories.find((c) => c.categoryId === Number.parseInt(cate))
        return currentCategory ? currentCategory.categoryName : currentGroup.groupName
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Banner */}
            <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden">
                <img
                    src="https://img.freepik.com/premium-photo/personal-protective-equipment-safety-banner-with-place-text_106035-3441.jpg"
                    alt="Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h1 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
                        {getCurrentCategoryName() || "Sản phẩm"}
                    </h1>
                </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden sticky top-0 z-10 bg-white shadow-md p-4">
                <button
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-lg"
                >
          <span className="flex items-center">
            <FaFilter className="mr-2" />
            Bộ lọc sản phẩm
          </span>
                    <FaAngleDown className={`transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`} />
                </button>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filter Section */}
                    <div className={`lg:w-1/4 ${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-20">
                            <div className="bg-gray-800 text-white p-4 flex items-center">
                                <FaFilter className="mr-2" />
                                <span className="font-semibold">BỘ LỌC SẢN PHẨM</span>
                            </div>

                            {/* Search */}
                            <div className="p-4 border-b">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm sản phẩm..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Price Filters */}
                            <div className="p-4 border-b">
                                <h3 className="font-semibold mb-3 text-gray-700">Chọn Mức Giá</h3>
                                <div className="space-y-2">
                                    {priceFilters.map((filter, index) => (
                                        <label key={index} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.includes(filter)}
                                                onChange={() => handleFilterChange(filter)}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-gray-700">{filter}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="p-4">
                                <h3 className="font-semibold mb-3 text-gray-700">Loại Sản Phẩm</h3>
                                <div className="space-y-2">
                                    {groupCategories.map((groupItem) => (
                                        <div key={groupItem.groupId} className="mb-2">
                                            <div
                                                className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                                                    Number.parseInt(group) === groupItem.groupId
                                                        ? "bg-blue-50 text-blue-600 font-medium"
                                                        : "hover:bg-gray-50"
                                                }`}
                                                onClick={() => toggleGroupExpand(groupItem.groupId)}
                                            >
                        <span
                            className="flex-1"
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/products/${groupItem.groupId}/0/${toSlug(groupItem.groupName)}`)
                            }}
                        >
                          {groupItem.groupName}
                        </span>
                                                <FaAngleDown
                                                    className={`transition-transform ${expandedGroups[groupItem.groupId] ? "rotate-180" : ""}`}
                                                />
                                            </div>

                                            {expandedGroups[groupItem.groupId] && (
                                                <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                                                    {groupItem.categories.map((category) => (
                                                        <div
                                                            key={category.categoryId}
                                                            className={`p-2 rounded cursor-pointer ${
                                                                Number.parseInt(group) === groupItem.groupId &&
                                                                Number.parseInt(cate) === category.categoryId
                                                                    ? "bg-blue-50 text-blue-600 font-medium"
                                                                    : "hover:bg-gray-50"
                                                            }`}
                                                            onClick={() =>
                                                                navigate(
                                                                    `/products/${groupItem.groupId}/${category.categoryId}/${toSlug(groupItem.groupName)}`,
                                                                )
                                                            }
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

                    {/* Product Section */}
                    <div className="lg:w-3/4">
                        {products.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-12 flex flex-col items-center justify-center">
                                <FaRegFrown className="text-gray-400 w-16 h-16 mb-4" />
                                <h3 className="text-xl font-medium text-gray-500 mb-2">Không tìm thấy sản phẩm</h3>
                                <p className="text-gray-400 text-center">
                                    Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn.
                                </p>
                            </div>
                        ) : (
                            <>
                                <motion.div
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                visible: { opacity: 1, y: 0 },
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="relative overflow-hidden group">
                                                <img
                                                    src={product.image || "/placeholder.svg"}
                                                    alt={product.name}
                                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <button
                                                        className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                                        onClick={() => handleOpenPopup(product)}
                                                    >
                                                        Xem chi tiết
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">{product.name}</h3>
                                                <p className="text-red-600 font-bold mb-3">{product.price.toLocaleString()} VND</p>
                                                {product.productVariants && product.productVariants.length > 0 ? (
                                                    <button
                                                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                                        onClick={() => handleOpenPopup(product)}
                                                    >
                                                        <FaCog className="mr-2" />
                                                        <span>Tùy chọn</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                                                        onClick={() => handleAddToCart(product)}
                                                    >
                                                        <FaCartPlus className="mr-2" />
                                                        <span>Thêm vào giỏ</span>
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Pagination */}
                                {totalPages > 0 && (
                                    <div className="mt-8 flex justify-center">
                                        <div className="flex items-center space-x-1">
                                            <button
                                                onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                                                disabled={currentPage === 1}
                                                className={`px-3 py-2 rounded-md ${
                                                    currentPage === 1
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                                } border`}
                                            >
                                                <FaChevronLeft className="w-4 h-4" />
                                            </button>

                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(Number(page))}
                                                    className={`px-4 py-2 rounded-md ${
                                                        currentPage === page ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                                                    } border`}
                                                >
                                                    {page}
                                                </button>
                                            ))}

                                            <button
                                                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className={`px-3 py-2 rounded-md ${
                                                    currentPage === totalPages
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                                } border`}
                                            >
                                                <FaChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Popup */}
            {selectedProduct && <ProductPopup product={selectedProduct} onClose={handleClosePopup} />}

            {/* Toast notification styles */}
            <style jsx>{`
        .toast-notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          transform: translateY(100px);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 9999;
        }
        
        .toast-notification.show {
          transform: translateY(0);
          opacity: 1;
        }
        
        .toast-content {
          display: flex;
          align-items: center;
          background-color: #4CAF50;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          max-width: 350px;
        }
        
        .toast-icon {
          background-color: white;
          color: #4CAF50;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-weight: bold;
        }
        
        .toast-message {
          font-size: 14px;
        }
      `}</style>
        </div>
    )
}

export default ProductListCategory

