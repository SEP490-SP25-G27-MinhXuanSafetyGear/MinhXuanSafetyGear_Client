import React, { useState, useContext, useEffect } from "react";
import { BlogPostContext } from "../../../contexts/BlogPostContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegFrown } from "react-icons/fa";
const BASE_URL = process.env.REACT_APP_BASE_URL_API;

const CreateBlogs = () => {
  const navigate = useNavigate();
  const { categories } = useContext(BlogPostContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Draft");
  const [category, setCategory] = useState(0);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    console.log("Categories:", categories);
  }, [categories]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title || !content || !category || !file) {
      setMessage({ type: "error", text: "Vui lòng nhập đầy đủ thông tin!" });
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("file", file);

    try {
      await axios.post(`${BASE_URL}/api/BlogPost/create-blog`, formData);
      alert("Bài viết đã được tạo thành công!");
      navigate("/manager/blog-posts");
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
      setMessage({ type: "error", text: "Không thể tạo bài viết!" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto p-8 border rounded-lg shadow-lg bg-white">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Tạo bài viết mới</h3>

        {message.text && (
          <div
            className={`p-4 rounded-lg mb-6 ${message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-6">
          <input type="text" placeholder="Tiêu đề" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
          <textarea placeholder="Nội dung" value={content} onChange={(e) => setContent(e.target.value)} rows={5} required className="w-full px-3 py-2 border rounded-md" />

          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border rounded-md">
            <option value="Draft">Bản nháp</option>
            <option value="Published">Công khai</option>
          </select>

          <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-3 py-2 border rounded-md">
            <option value={0}>Chọn danh mục</option>
            {categories.length > 0 ? (
              categories.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))
            ) : (
              <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <FaRegFrown className="mx-auto text-gray-400 text-2xl mb-2" />
                  <p className="text-gray-500">Không có danh mục nào.</p>
                </div>
              </div>
            )}
          </select>

          <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full px-3 py-2 border rounded-md" />

          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Ảnh xem trước:</p>
              <img src={previewUrl} alt="Preview" className="w-40 h-40 object-cover rounded-lg mt-2 shadow-md border-2 border-gray-300" />
            </div>
          )}

          <div className="flex justify-end space-x-6 mt-6">
            <button type="button" onClick={() => navigate("/manager/blog-posts")}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              Tạo bài viết
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogs;