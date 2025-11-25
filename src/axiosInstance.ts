import axios from "axios";
// @ts-ignore
import { useAuth } from "@/context/AuthContext";

// Создаём axios instance
const api = axios.create({
	baseURL: "http://localhost:8888",
	withCredentials: true, // обязательно для cookie
});

// Функция для установки интерсептора
export const setupInterceptors = (auth: ReturnType<typeof useAuth>) => {
	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;
			
			// Если 401 и ещё не пробовали рефреш
			if (error.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				
				try {
					const res = await api.post("/auth/refresh"); // refreshToken из cookie уйдёт автоматически
					const newAccessToken = res.data.accessToken;
					
					auth.login(auth.user!, newAccessToken); // обновляем context
					
					// подставляем новый токен и повторяем запрос
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
