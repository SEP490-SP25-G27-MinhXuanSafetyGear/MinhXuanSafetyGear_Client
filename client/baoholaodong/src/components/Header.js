import React from "react";
import logo from "../images/logo.gif";
import { FaPhoneAlt, FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";

function Header() {
	return (
		<header className="bg-white shadow">
			<div className="container mx-auto flex justify-between items-center py-4">
				<div className="flex items-center">
					<img alt="Company Logo" className="h-16" src={logo} />
					<div className="ml-4">
						<h1 className="text-xl font-bold text-red-600">
							BẢO HỘ LAO ĐỘNG MINH XUÂN
						</h1>
						<p className="text-sm">
							Luôn đem lại an toàn và hoàn hảo nhất cho bạn!
						</p>
					</div>
				</div>
				<div className="flex-grow mx-8 flex items-center ">
					<FaSearch className="text-red-600 h-5 w-5 mr-2" />
					<input
						type="text"
						placeholder="Tìm kiếm..."
						className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
					/>
				</div>
				<div className="flex items-center space-x-6">
					<div className="flex items-center">
						<FaPhoneAlt className="text-red-600 h-6 w-6" />
						<div className="ml-2">
							<p className="text-sm">Liên hệ ngay</p>
							<p className="text-lg font-bold">0912.423.062</p>
						</div>
					</div>
					<div className="relative group">
						<div className="flex items-center cursor-pointer">
							<FaUser className="text-red-600 h-6 w-6" />
							<div className="ml-2">
								<p className="text-sm">Thông tin</p>
								<div className="flex items-center">
									<p className="text-lg font-bold">Tài khoản</p>
									<span className="ml-1">&#9662;</span>
								</div>
							</div>
						</div>
						<div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
							<a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Đăng ký</a>
							<a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Đăng nhập</a>
						</div>
					</div>
					<div className="relative flex items-center">
						<div className="relative">
							<FaShoppingCart className="text-red-600 h-8 w-8 cursor-pointer" />
							<span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-block w-4 h-4 bg-red-600 text-white text-xs font-bold rounded-full text-center">3</span>
						</div>
						<span className="ml-2 text-lg font-bold">Giỏ hàng</span>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;