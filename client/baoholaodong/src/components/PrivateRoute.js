import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';  // Import thư viện js-cookie

// Lấy thông tin vai trò người dùng từ cookie
const getUserRole = () => {
	return Cookies.get('userRole'); // 'guest', 'manager', 'admin'
};

// Kiểm tra người dùng có đăng nhập hay không bằng cách kiểm tra cookie authToken
const isAuthenticated = () => {
	return Cookies.get('authToken') !== undefined;  // Nếu authToken có trong cookie, người dùng đã đăng nhập
};

const PrivateRoute = ({ element, roleRequired }) => {
	const userRole = getUserRole();
	const userIsAuthenticated = isAuthenticated();
	const location = useLocation();  // Get current location for redirection
	
	// If the user is not authenticated and role is not 'guest', redirect to login
	if (!userIsAuthenticated && roleRequired !== 'guest') {
		return <Navigate to="/login" state={{ from: location }} />;
	}
	
	// If user role does not match required role, redirect to home page
	if (userRole && roleRequired && !roleRequired.includes(userRole)) {
		return <Navigate to="/home" />;
	}
	
	// Return the element if the user is authenticated and has the correct role
	return element;
};


export default PrivateRoute;
