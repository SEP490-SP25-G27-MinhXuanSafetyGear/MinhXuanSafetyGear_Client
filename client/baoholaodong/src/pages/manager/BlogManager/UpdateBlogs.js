import React, { useContext, useState, useEffect } from "react";
import { BlogPostContext } from "../../../contexts/BlogPostContext";

const Loading = ({ isLoading }) => {
	if (!isLoading) return null;
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
			<div className="p-6 bg-white rounded-lg shadow-lg flex items-center gap-3">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
				<span className="text-lg font-semibold">Saving post...</span>
			</div>
		</div>
	);
};

const UpdateBlogs = () => {
	const { createBlogPost, getCategories } = useContext(BlogPostContext); // Lấy danh mục từ context
	const [categories, setCategories] = useState([]); // State lưu danh sách categories

	const [post, setPost] = useState({
		title: "",
		content: "",
		status: "draft",
		imageUrl: "",
		categoryBlogId: "", // Thêm ID danh mục vào state
	});

	const [isLoading, setIsLoading] = useState(false);

	// Lấy danh sách categories khi component mount
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const data = await getCategories();
				setCategories(data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};
		fetchCategories();
	}, []);

	// Handle input changes
	const handleChange = (e) => {
		const { id, value } = e.target;
		setPost((prev) => ({ ...prev, [id]: value }));
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!post.title || !post.content || !post.imageUrl || !post.categoryBlogId) {
			alert("Please fill in all required fields!");
			return;
		}

		try {
			setIsLoading(true);
			await createBlogPost(post);
			setIsLoading(false);
			alert("Bài viết đã được tạo thành công!");
		} catch (err) {
			console.error("Error creating post", err.response?.data || err.message);
			setIsLoading(false);
			alert("Đã xảy ra lỗi, vui lòng thử lại!");
		}
	};

	return (
		<div className="w-full min-h-screen p-10 bg-gray-100 flex justify-center items-center">
			<Loading isLoading={isLoading} />
			<div className="w-full max-w-5xl bg-white p-10 rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold mb-6 text-center">Create Blog Post</h2>
				<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
					{/* Title */}
					<div className="col-span-2">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
							Title
						</label>
						<input
							className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
							id="title"
							type="text"
							value={post.title}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Content */}
					<div className="col-span-2">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="content">
							Content
						</label>
						<textarea
							className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
							id="content"
							rows="6"
							value={post.content}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Status */}
					<div className="col-span-2">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="status">
							Status
						</label>
						<select
							id="status"
							value={post.status}
							onChange={handleChange}
							className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
						>
							<option value="draft">Draft</option>
							<option value="published">Published</option>
						</select>
					</div>

					{/* Category Selection */}
					<div className="col-span-2">
						<label className="block text-gray-700 font-semibold mb-2" htmlFor="categoryBlogId">
							Category
						</label>
						<select
							id="categoryBlogId"
							value={post.categoryBlogId}
							onChange={handleChange}
							className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
							required
						>
							<option value="">-- Select a Category --</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					{/* Image URL Input */}
					<div className="col-span-2">
						<label className="block text-gray-700 font-semibold mb-2">Image URL</label>
						<input
							type="text"
							id="imageUrl"
							value={post.imageUrl}
							onChange={handleChange}
							placeholder="Nhập link ảnh"
							className="w-full p-3 border rounded-lg"
							required
						/>
						{post.imageUrl && (
							<div className="mt-3">
								<img src={post.imageUrl} alt="Image Preview" className="w-full h-32 object-cover rounded-lg" />
							</div>
						)}
					</div>

					{/* Submit Button */}
					<div className="col-span-2 text-center">
						<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateBlogs;
