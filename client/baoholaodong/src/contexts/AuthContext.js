import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL_API;

// Tạo context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Lấy user từ cookies nếu có, nếu không thì null
    const [user, setUser] = useState(() => {
        const storedUser = Cookies.get("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Hàm login
    const login = async (email, password) => {
        try {
            const result = await axios.post(`${BASE_URL}/api/Authentication/authenticate/loginby-email-password`, {
                email,
                password,
            });
            setUser(result.data); // Cập nhật state
            return result.data; // Trả về user
        } catch (error) {
            throw error;
        }
    };

    // Hàm logout
    const logout = () => {
        setUser(null);
    };

    // Cập nhật cookies mỗi khi user thay đổi
    useEffect(() => {
        if (user) {
            Cookies.set("user", JSON.stringify(user), { expires: 1 });
        } else {
            Cookies.remove("user");
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout ,setUser}}>
            {children}
        </AuthContext.Provider>
    );
};
