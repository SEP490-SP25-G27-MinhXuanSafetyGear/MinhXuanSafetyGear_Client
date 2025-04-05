import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL_API;
const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api`
});
let token = null;
export const setAuthToken = (authToken) => {
    token = authToken;
};
axiosInstance.interceptors.request.use(
    config => {
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);
export default axiosInstance;
