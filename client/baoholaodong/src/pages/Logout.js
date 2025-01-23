import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Logout = () => {
	const navigate = useNavigate();
	
	useEffect(() => {
		Cookies.remove('authToken');
		Cookies.remove('userRole');
		
		// Chuyển hướng về trang login sau khi logout
		navigate("/login");
	}, [navigate]);
	
	return (
		<div className="flex justify-center items-center h-screen">
			<h2 className="text-xl">Logging out...</h2>
		</div>
	);
};

export default Logout;
