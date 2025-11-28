import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

interface User {
	name: string;
	email: string;
	favs: string[];
}

interface AuthContextType {
	user: User | null;
	accessToken: string | null;
	isLogin: boolean;
	login: (userData: User, token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		const storedToken = localStorage.getItem("accessToken");
		if (storedUser && storedToken) {
			setUser(JSON.parse(storedUser));
			setAccessToken(storedToken);
		}
	}, []);
	
	const login = (userData: User, token: string) => {
		setUser(userData);
		setAccessToken(token);
		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("accessToken", token);
	};
	
	const logout = () => {
		setUser(null);
		setAccessToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("accessToken");
	};
	
	return (
		<AuthContext.Provider value={{ user, accessToken, isLogin: !!user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};
