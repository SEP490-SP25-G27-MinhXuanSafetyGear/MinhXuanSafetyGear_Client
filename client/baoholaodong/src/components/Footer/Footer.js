import React from "react";

const Footer = () => {
	return (
		<footer className="bg-red-600 text-white py-4">
			<div className="container mx-auto text-center">
				<div className="mb-4">
					<h2 className="text-lg font-bold">Bảo Hộ Lao Động Minh Xuân</h2>
					<p>Luôn đem lại an toàn và hoàn hảo nhất cho bạn!</p>
				</div>
				<div className="mb-4">
					<p>
						<strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, Hà Nội, Việt Nam
					</p>
					<p>
						<strong>Điện thoại:</strong> 043.987.5343 - 0912.423.062 - 0912.201.309
					</p>
					<p>
						<strong>Email:</strong> minhxuanbhld@gmail.com
					</p>
				</div>
				<div className="flex justify-center space-x-4">
					<a href="#" className="hover:text-yellow-300">
						<i className="fab fa-facebook fa-lg"></i>
					</a>
					<a href="#" className="hover:text-yellow-300">
						<i className="fab fa-twitter fa-lg"></i>
					</a>
					<a href="#" className="hover:text-yellow-300">
						<i className="fab fa-instagram fa-lg"></i>
					</a>
					<a href="#" className="hover:text-yellow-300">
						<i className="fab fa-linkedin fa-lg"></i>
					</a>
				</div>
				<div className="mt-4">
					<p>&copy; 2025 Bảo Hộ Lao Động Minh Xuân. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
