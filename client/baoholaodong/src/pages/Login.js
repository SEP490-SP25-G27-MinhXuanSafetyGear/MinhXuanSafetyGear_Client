import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Để điều hướng sau khi đăng nhập thành công
import axios from "axios";
import Cookies from 'js-cookie'; // Import thư viện js-cookie

const apiUrl = process.env.REACT_APP_BASE_URL_API;

const LoginEmployee = () => {
	const [error, setError] = useState(''); // Lưu thông báo lỗi
	const [formLogin, setFormLogin] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const handleLogin = async (e) => {
		e.preventDefault();
		const { email, password } = formLogin;
		
		if (!email || !password) {
			setError('Both email and password are required.');
			return;
		}
		try {
			// Gửi yêu cầu đăng nhập
			const response = await axios.post(`${apiUrl}/api/authentication/authenticate/loginby-email-password`, formLogin);
			const { token, role } = response.data;  // Giả sử backend trả về token và role
			// Lưu token và role vào cookies
			Cookies.set('authToken', token, { expires: 1 }); // Cookie authToken sẽ hết hạn sau 1 ngày
			Cookies.set('userRole', role, { expires: 1 }); // Lưu role vào cookie (cũng hết hạn sau 1 ngày)
			
			navigate('/dashboard');  // Điều hướng đến trang dashboard sau khi đăng nhập thành công
		} catch (err) {
			setError('Failed to login. Please check your credentials.');
			console.error(err);
		}
	};
	
	return (
		<div
			className="h-screen flex items-center justify-center bg-cover bg-center"
			style={{
				backgroundImage:
					"url('https://storage.googleapis.com/a1aa/image/bDiQFiGqhfWmdCogTYr0Qc46yxhkiuFonDc0ftZ1yJb72PHUA.jpg')",
			}}
		>
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				{error && <div className="text-red-500 text-center mb-4">{error}</div>}
				<form onSubmit={handleLogin}>
					<div className="mb-4">
						<label htmlFor="email" className="block text-gray-700 font-medium mb-2">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formLogin.email}
							onChange={(e) => setFormLogin({ ...formLogin, email: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your email"
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block text-gray-700 font-medium mb-2">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formLogin.password}
							onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your password"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginEmployee;
