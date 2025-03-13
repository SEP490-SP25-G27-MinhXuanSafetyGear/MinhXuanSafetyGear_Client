import React, { useContext, useState } from "react";
import { FaRegFrown } from "react-icons/fa";
import { BlogPostContext } from "../../../contexts/BlogPostContext";
import { Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

const BlogPosts = () => {
  const navigate = useNavigate();
  const { blogPosts, loading, categories, search, setSearch } = useContext(BlogPostContext);

  const handleCreate = () => navigate("/manager/createblogs");
  const handleUpdate = (id) => navigate(`/manager/updateblog/${id}`);
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      console.log("Xóa bài viết có ID:", id);
    }
  };

  // Phân trang theo cách cũ của bạn
  const itemsPerPage = 5; // Số bài viết mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <Loading isLoading={loading} />

      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Danh sách bài viết</h3>
        <div className="flex space-x-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Tìm kiếm bài viết..."
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            onClick={handleCreate}
          >
            <Plus className="w-5 h-5 mr-2" />
            Thêm bài viết
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Tiêu đề</th>
              <th className="border px-4 py-2 text-left">Nội dung</th>
              <th className="border px-4 py-2 text-left">Ảnh</th>
              <th className="border px-4 py-2 text-left">Thể loại</th>
              <th className="border px-4 py-2 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">Đang tải...</td>
              </tr>
            ) : currentPosts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 flex items-center justify-center">
                  <FaRegFrown className="text-gray-500 w-6 h-6 mr-2" />
                  Không có bài viết nào
                </td>
              </tr>
            ) : (
              currentPosts.map(({ id, title, content, ImageURL, categoryBlogId }) => {
                const imageUrl = ImageURL || "https://via.placeholder.com/100";
                const categoryObj = categories.find(cat => cat.categoryBlogId === categoryBlogId);
                const categoryName = categoryObj ? categoryObj.categoryName : "Chưa có thể loại";

                return (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{title}</td>
                    <td className="border px-4 py-2">{content || "Không có nội dung"}</td>
                    <td className="border px-4 py-2">
                      <img src={imageUrl} alt={title} className="w-16 h-16 object-cover rounded-md" />
                    </td>
                    <td className="border px-4 py-2">{categoryName}</td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        onClick={() => handleUpdate(id)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        onClick={() => handleDelete(id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (cách cũ của bạn) */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-md mx-1 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            ← Trước
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 border rounded-md mx-1 ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-md mx-1 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            Tiếp →
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPosts;
