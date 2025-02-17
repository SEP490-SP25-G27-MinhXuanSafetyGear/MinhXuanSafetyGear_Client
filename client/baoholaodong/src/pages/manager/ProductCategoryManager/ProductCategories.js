import React, {useContext, useEffect, useState,useCallback} from "react";
import { ProductContext } from "../../../contexts/AdminProductContext";
import { Edit, Plus, Trash2 } from "lucide-react";
import { FaRegFrown } from "react-icons/fa";
import Modal from "../../../components/Modal/Modal";
import Loading from "../../../components/Loading/Loading";

const ProductCategories = () => {
    const { categories ,createCategory,updateCategory,groupCategories} = useContext(ProductContext);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenEditCategory, setIsOpenEditCategory] = useState(false);
    const [isOpenEditGroup, setIsOpenEditGroup] = useState(false);
    const [categorySelected, setCategorySelected] = useState(null);
    const [groupSelected, setGroupSelected] = useState(null);
    const handleEditGroup = useCallback((group) => {
        setGroupSelected(group);
        setIsOpenEditGroup(true);
    }, []);

    const handleEditCategory = useCallback((category) => {
        setCategorySelected(category);
        setIsOpenEditCategory(true);
    }, []);

    useEffect(() => {
        const selectedGroup = groupCategories.find(group => group.groupId === groupSelected?.groupId);
        setGroupSelected(selectedGroup || null);
    }, [groupCategories]);

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
                        <Plus size={20} className="mr-2"/>
                        Thêm danh mục
                    </button>
                </div>
                <div className="grid grid-cols-10 gap-8 p-6">
                    {/* Bảng nhóm danh mục chiếm 3/7 */}
                    <div className="col-span-3">
                        <TableByGroup groups={groupCategories ? groupCategories : []}
                                      setGroupSelected={setGroupSelected} onHandleEdit={handleEditGroup}/>
                    </div>
                    {/* Bảng danh mục chiếm 7/7 */}
                    <div className="col-span-7">
                        <TableBycategories categories={groupSelected ? groupSelected.categories : []}
                                           onHandleEdit={handleEditCategory}/>
                    </div>
                </div>
                {/* Modal thêm danh mục */}
                <Modal isOpen={isOpenCreate} onClose={() => setIsOpenCreate(false)} title={"Thêm danh mục"}>
                    <CreateCategoryForm onCreateCategory={createCategory} groupCategories={groupCategories}
                                        close={()=>setIsOpenCreate(false)} />
                </Modal>
                <Modal isOpen={isOpenEditCategory} onClose={() => setIsOpenEditCategory(false)} title={"Cập nhật danh mục"}>
                    <EditCategoryForm category={categorySelected} updateCategory={updateCategory}
                                      groupCategories={groupCategories} close={() => setIsOpenEditCategory(false)}/>
                </Modal>
                {/* Model updat group*/}
                <Modal isOpen={isOpenEditGroup} onClose={() => setIsOpenEditGroup(false)} title={"Cập nhật nhóm danh mục"}>

                </Modal>
            </div>
        </div>
    );

};

// Component Form để thêm danh mục
const CreateCategoryForm = ({onCreateCategory,groupCategories,close}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [newCategory, setNewCategory] = useState({
        categoryName: "",
        description: "",
        groupId: 0
    });

    // Hàm xử lý onChange chung
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewCategory((prev) => ({...prev, [name]: value}));
    };

    const handleCreateCategory = async () => {
        try {
            setIsLoading(true);
            const result = await onCreateCategory(newCategory);
            console.log(result);
        } catch (e) {
            console.log(e);
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
                        value={newCategory.categoryName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập tên danh mục..."
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Mô tả</label>
                    <textarea
                        name="description"
                        value={newCategory.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập mô tả danh mục..."
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="groupId">Group</label>
                    <select name="groupId" value={newCategory.groupId} onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300">
                        <option key={0} value={0}>Chọn nhóm sản phẩm</option>
                        {groupCategories.map(group => (
                            <option key={group.groupId} value={group.groupId}>{group.groupName}</option>
                        ))}
                    </select>
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
            <Loading isLoading={isLoading}/>
        </div>
    );
};

const EditCategoryForm = ({category, updateCategory, groupCategories, close}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [categoryUpdate, setCategory] = useState({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        description: category.description,
        groupId: category.groupId
    });
    // Hàm xử lý onChange
    const handleChange = (e) => {
        const {name, value} = e.target;
        setCategory((prev) => ({ ...prev, [name]: value }));
    };

    // Hàm xử lý cập nhật danh mục
    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            var result = await updateCategory(categoryUpdate);
            close();
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
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="groupId">Group</label>
                    <select  name="groupId" value={categoryUpdate.groupId} onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300">
                        {groupCategories.map(group => (
                            <option key={group.groupId} value={group.groupId}>{group.groupName}</option>
                        ))}
                    </select>
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
            <Loading isLoading={isLoading}/>
        </div>
    );
};

const TableByGroup = ({groups, setGroupSelected, onHandleEdit}) => {
    return (
        <div className="flex flex-wrap gap-8">
            <table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <thead>
                <tr className="bg-blue-500 text-white text-lg font-semibold">
                    <th className="p-4" colSpan="2">Mã danh mục</th>
                    <th className="p-4" colSpan="2">Nhóm danh mục</th>
                    <th className="p-4" colSpan="2">cập nhât</th>
                </tr>
                </thead>
                <tbody>
                {groups.map((group, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition" onClick={() => {
                        setGroupSelected(group)
                    }}>
                        <td className="p-4 font-medium text-gray-700" colSpan="2">
                            {group.groupId}
                        </td>
                        <td className="p-4 font-medium text-gray-700" colSpan="2">
                            {group.groupName}
                        </td>
                        <td className="p-4 font-medium text-gray-700" colSpan="2">
                            <button onClick={() => onHandleEdit(group)}
                                    className="text-blue-500 hover:text-blue-700 mx-2">
                                <Edit size={18}/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
const TableBycategories = ({categories, onHandleEdit}) => {
    return (
        <div className="flex flex-wrap gap-8">
            <table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <thead>
                <tr className="bg-blue-500 text-white text-lg font-semibold">
                    <th className="p-4" colSpan="2">Mã loại sản phẩm</th>
                    <th className="p-4" colSpan="2">Tên loại sản phẩm</th>
                    <th className="p-4" colSpan="2">Mô tả loại sản phẩm</th>
                    <th className="p-4" colSpan="2">cập nhât</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((cate, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition">
                        <td className="p-4 font-medium text-gray-700" colSpan="2">
                            {cate.categoryId}
                        </td>
                        <td className="p-4 font-medium text-gray-700" colSpan="2">
                            {cate.categoryName}
                        </td>
                        <td className="p-4 font-medium text-gray-700" colSpan="2">{cate.description || "Không có mô tả"}
                        </td>
                        <td className="p-4 font-medium text-gray-700" colSpan="2">
                            <button onClick={() => onHandleEdit(cate)}
                                    className="text-blue-500 hover:text-blue-700 mx-2">
                                <Edit size={18}/>
                            </button>
                            <button className="text-red-500 hover:text-red-700">
                                <Trash2 size={18}/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
};

export default ProductCategories;
