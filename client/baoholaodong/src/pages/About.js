import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const About = () => {
	return (
		<div>
			<Header/>
			<Nav/>
			<div className="container mx-auto p-4">
				<h1 className="text-3xl font-bold text-center mb-6">Giới Thiệu Về Bảo Hộ Lao Động Minh Xuân</h1>
				<p className="text-lg mb-4">
					Bảo Hộ Lao Động Minh Xuân là công ty chuyên cung cấp các sản phẩm bảo hộ lao động chất lượng cao.
					Chúng tôi cam kết mang đến cho khách hàng các giải pháp bảo vệ an toàn tuyệt đối trong môi trường
					làm việc, giúp giảm thiểu rủi ro và bảo vệ sức khỏe của người lao động.
				</p>
				<h2 className="text-2xl font-semibold mb-4">Sứ Mệnh</h2>
				<p className="mb-4">
					Sứ mệnh của chúng tôi là cung cấp các sản phẩm bảo hộ lao động đạt chuẩn quốc tế, góp phần tạo nên
					môi trường làm việc an toàn, bảo vệ người lao động khỏi các mối nguy hiểm trong quá trình làm việc.
				</p>
				<h2 className="text-2xl font-semibold mb-4">Lịch Sử Hình Thành</h2>
				<p className="mb-4">
					Được thành lập từ năm 2000, Bảo Hộ Lao Động Minh Xuân đã không ngừng nỗ lực phát triển, cung cấp các
					sản phẩm bảo hộ chất lượng cao và trở thành một trong những công ty hàng đầu trong ngành bảo hộ lao
					động tại Việt Nam.
				</p>
				<h2 className="text-2xl font-semibold mb-4">Giá Trị Cốt Lõi</h2>
				<ul className="list-disc pl-6">
					<li><strong>An toàn:</strong> Chúng tôi luôn đặt sự an toàn của người lao động lên hàng đầu.</li>
					<li><strong>Chất lượng:</strong> Tất cả sản phẩm đều được kiểm tra và đảm bảo đạt tiêu chuẩn quốc
						tế.
					</li>
					<li><strong>Uy tín:</strong> Chúng tôi cam kết cung cấp sản phẩm và dịch vụ với chất lượng tốt nhất.
					</li>
				</ul>
			</div>
			<Footer/>
		</div>

	);
};

export default About;
