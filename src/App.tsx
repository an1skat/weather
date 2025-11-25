import "./scss/main.scss"
import Header from './sections/Header.tsx';
import Hero from './sections/Hero.tsx';
import Weather from './sections/Weather.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { useEffect } from "react";
import { setupInterceptors } from "./axiosInstance";

function AppContent() {
	const auth = useAuth();
	
	useEffect(() => {
		setupInterceptors(auth);
	}, [auth]);
	
	return (
		<>
			<Header />
			<Hero />
			<Weather />
		</>
	);
}

function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}

export default App;
