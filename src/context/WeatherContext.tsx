import {createContext, type ReactNode, useContext, useState} from 'react';
import type {Weather} from '@/types.ts';


interface WeatherContextType {
	weathers: Weather[];
	addToFav: (weather: Weather) => void;
	delete: (id: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
	const [weathers, setWeathers] = useState<Weather[]>([]);
	
	const addToFav = (weather: Weather) => {
		setWeathers(prev => [...prev, weather]);
	};
	
	const deleteWeather = (id: string) => {
		setWeathers(prev => prev.filter(w => w._id !== id));
	};
	
	return (
		<WeatherContext.Provider value={{ weathers, addToFav, delete: deleteWeather }}>
			{children}
		</WeatherContext.Provider>
	);
};

export const useWeather = () => {
	const context = useContext(WeatherContext);
	if (!context) throw new Error("useWeather must be used within WeatherProvider");
	return context
}

