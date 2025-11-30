import { createContext, useContext, useState, type ReactNode } from "react";
import type { Weather } from "@/types";

interface WeatherContextType {
	allWeathers: Weather[];             
	savedWeathers: Weather[];
	defaultWeathers: Weather[];
	isLoadedFromServer: boolean;
	
	loadDefaults: (list: Weather[]) => void;
	loadSavedFromServer: (list: Weather[]) => void;
	addTemporaryWeather: (weather: Weather) => void;
	toggleLike: (id: string) => void;
	remove: (id: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
	const [defaultWeathers, setDefaultWeathers] = useState<Weather[]>([]);
	const [savedWeathers, setSavedWeathers] = useState<Weather[]>([]);
	const [temporaryWeathers, setTemporaryWeathers] = useState<Weather[]>([]);
	const [isLoadedFromServer, setIsLoadedFromServer] = useState(false);
	
	const loadDefaults = (list: Weather[]) => {
		setDefaultWeathers(list);
	};
	
	const loadSavedFromServer = (list: Weather[]) => {
		setSavedWeathers(list);
		setIsLoadedFromServer(true);
	};
	
	const addTemporaryWeather = (weather: Weather) => {
		setTemporaryWeathers(prev => [...prev, weather]);
	};
	
	const toggleLike = (id: string) => {
		if (savedWeathers.some(w => w._id === id)) {
			setSavedWeathers(prev => prev.filter(w => w._id !== id));
			return;
		}
		
		const temp = temporaryWeathers.find(w => w._id === id);
		if (temp) {
			setSavedWeathers(prev => [...prev, temp]);
			return;
		}
	};
	
	const remove = (id: string) => {
		setTemporaryWeathers(prev => prev.filter(w => w._id !== id));
		setSavedWeathers(prev => prev.filter(w => w._id !== id));
		setDefaultWeathers(prev => prev.filter(w => w._id !== id));
	};
	
	let allWeathers: Weather[];
	
	if (isLoadedFromServer) {
		allWeathers = [...savedWeathers, ...temporaryWeathers];
	} else {
		allWeathers = [...defaultWeathers, ...temporaryWeathers];
	}
	
	return (
		<WeatherContext.Provider
			value={{
				allWeathers,
				savedWeathers,
				defaultWeathers,
				isLoadedFromServer,
				loadDefaults,
				loadSavedFromServer,
				addTemporaryWeather,
				toggleLike,
				remove
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWeather = () => {
	const ctx = useContext(WeatherContext);
	if (!ctx) throw new Error("useWeather must be used inside WeatherProvider");
	return ctx;
};
