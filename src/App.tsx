import "./scss/main.scss"
import Header from './sections/Header.tsx';
import Hero from './sections/Hero.tsx';
import Weather from './sections/weather/Weather.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { useEffect } from "react";
import { setupInterceptors } from "./axiosInstance";
import {WeatherProvider} from '@/context/WeatherContext.tsx';
import Pets from '@/sections/Pets.tsx';
import {Slider} from '@/sections/Nature.tsx';
import {Footer} from '@/sections/Footer.tsx';
import {ToastContainer} from 'react-toastify';

function AppContent() {
	const auth = useAuth();
	
	useEffect(() => {
		setupInterceptors(auth);
	}, [auth]);
	
	return (
		<>
			<ToastContainer />
			<Header />
			<Hero />
			<Weather />
			<Pets />
			<Slider />
			<Footer />
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
