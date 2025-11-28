import "./scss/main.scss"
import Header from './sections/Header.tsx';
import Hero from './sections/Hero.tsx';
import Weather from './sections/weather/Weather.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { useEffect } from "react";
import { setupInterceptors } from "./axiosInstance";
import {WeatherProvider} from '@/context/WeatherContext.tsx';

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
			<WeatherProvider>
				<AppContent />
			</WeatherProvider>
		</AuthProvider>
	);
}

export default App;
