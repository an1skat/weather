import axios from "axios";
// @ts-ignore
import { useAuth } from "@/context/AuthContext";

const api = axios.create({
	baseURL: "https://weather-back-dldv.onrender.com",
	withCredentials: true,
});

export const setupInterceptors = (auth: ReturnType<typeof useAuth>) => {
	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;
			
			if (error.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				
				try {
					const res = await api.post("/auth/refresh");
					const newAccessToken = res.data.accessToken;
					
					auth.login(auth.user!, newAccessToken);
					
					originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
					return api(originalRequest);
				} catch (refreshError) {
					console.error("Refresh token invalid", refreshError);
					auth.logout();
					return Promise.reject(refreshError);
				}
			}
			
			return Promise.reject(error);
		}
	);
};

export default api;
