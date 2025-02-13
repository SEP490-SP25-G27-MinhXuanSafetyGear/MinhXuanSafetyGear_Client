import React, { useContext, useState } from "react";
import { ProductContext } from "../../../contexts/ProductContext";
import { Edit, Plus, Trash2 } from "lucide-react";
import { FaRegFrown } from "react-icons/fa";
import Modal from "../../../components/Modal/Modal";
import Loading from "../../../components/Loading/Loading";

const ProductCategories = () => {
    const { categories ,createCategory,updateCategory} = useContext(ProductContext);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [categorySelected, setCategorySelected] = useState(null);
    const handleEdit =(category)=>{
        setIsOpenEdit(true);
        setCategorySelected(category);
    }
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Danh mục sản phẩm</h3>
                    <button
                        onClick={() => setIsOpenCreate(true)}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        <Plus size={20} className="mr-2" />
                        Thêm danh mục
                    </button>
                </div>

                {/* Kiểm tra danh sách danh mục */}
                {categories.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-200 text-gray-700 text-left">
                                <th className="p-3 border">ID</th>
                                <th className="p-3 border">Tên danh mục</th>
                                <th className="p-3 border">Mô tả</th>
                                <th className="p-3 border text-center">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.map((category) => (
                                <tr key={category.categoryId} className="border-b">
                                    <td className="p-3 border">{category.categoryId}</td>
                                    <td className="p-3 border">{category.categoryName}</td>
                                    <td className="p-3 border">{category.description || "Không có mô tả"}</td>
                                    <td className="p-3 border text-center">
                                        <button onClick={() => handleEdit(category)} className="text-blue-500 hover:text-blue-700 mx-2">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        <FaRegFrown size={30} className="inline-block mb-2" />
                        <p>Không có danh mục nào.</p>
                    </div>
                )}
            </div>

            {/* Modal thêm danh mục */}
            <Modal isOpen={isOpenCreate} onClose={() => setIsOpenCreate(false)} title={"Thêm danh mục"}>
                <CreateCategoryForm  createCategory={createCategory} />
            </Modal>
            <Modal isOpen={isOpenEdit} onClose={() => setIsOpenEdit(false)} title={"Cập nhật danh mục"}>
                <EditCategoryForm category={categorySelected} updateCategory={updateCategory} />
            </Modal>
        </div>
    );
};

// Component Form để thêm danh mục
const CreateCategoryForm = ({createCategory}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [category, setCategory] = useState({
        categoryName: "",
        description: "",
    });

    // Hàm xử lý onChange chung
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateCategory = async () => {
        try{
            setIsLoading(true);
            const result = await createCategory(category);
            console.log(result);
        }catch(e){
            console.log(e);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">Tên danh mục</label>
                    <input
                        type="text"
                        name="categoryName"
                        value={category.categoryName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập tên danh mục..."
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Mô tả</label>
                    <textarea
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập mô tả danh mục..."
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleCreateCategory}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Thêm
                    </button>
                </div>
            </div>
            <Loading isLoading={isLoading} />
        </div>
    );
};

const EditCategoryForm = ({ category ,updateCategory }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [categoryUpdate, setCategory] = useState({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        description: category.description
    });

    // Hàm xử lý onChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prev) => ({ ...prev, [name]: value }));
    };

    // Hàm xử lý cập nhật danh mục
    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            var result = await updateCategory(categoryUpdate);
        } catch (error) {
            alert("Cập nhật thất bại!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">Tên danh mục</label>
                    <input
                        type="text"
                        name="categoryName"
                        value={categoryUpdate.categoryName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập tên danh mục..."
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Mô tả</label>
                    <textarea
                        name="description"
                        value={categoryUpdate.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập mô tả danh mục..."
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                        Hủy
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
            <Loading isLoading={isLoading} />
        </div>
    );
};


export default ProductCategories;
