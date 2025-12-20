import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import axios from "axios";
import { v4 } from "uuid";

import WeatherCard from "@/components/WeatherCard";
import WeatherInfo from "./WeatherInfo";
import HourlyForecast from "./HourlyForecast";
import WeekForecast from "./WeekForecast";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

import { useWeather } from "@/context/WeatherContext";
import type { Weather } from "@/types";
import {Bounce, toast} from 'react-toastify';
import {useAuth} from '@/context/AuthContext.tsx';

export default function Weather() {
	const {
		allWeathers,
		loadDefaults,
		remove
	} = useWeather();
	
	const [activeId, setActiveId] = useState<string | null>(null);
	const [activeSection, setActiveSection] = useState<"info" | "hourly" | "weekly" | null>(null);
	const {isLogin} = useAuth();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setActiveSlideIndex] = useState(0);
	useEffect(() => {
		const cities = ["London", "Kyiv", "Paris"];
		
		async function fetchDefaults() {
			try {
				const responses = await Promise.all(
					cities.map(city =>
						axios.get(
							`https://api.weatherapi.com/v1/forecast.json?key=6479dbdc5b544a12b0c110749252211&q=${city}&days=7&aqi=no&alerts=no`
						)
					)
				);
				
				const weatherData: Weather[] = responses.map(res => {
					const data = res.data;
					const day = data.forecast.forecastday[0].day;
					
					return {
						_id: v4(),
						city: data.location.name,
						country: data.location.country,
						icon: day.condition.icon,
						temp: data.current.temp_c,
						feelslike: data.current.feelslike_c,
						maxtemp: day.maxtemp_c,
						mintemp: day.mintemp_c,
						humidity: data.current.humidity,
						pressure: data.current.pressure_mb,
						wind: data.current.wind_kph / 3.6,
						visibility: data.current.vis_km,
						hourlyData: data.forecast.forecastday[0].hour,
						weeklyData: data.forecast.forecastday
					};
				});
				
				loadDefaults(weatherData);
				if (weatherData.length > 0) setActiveId(weatherData[0]._id);
			} catch (err) {
				console.error(err);
			}
		}
		
		fetchDefaults();
	}, []);
	useEffect(() => {
		if (!isLogin) {
			setActiveSection(null);
			setActiveId(null);
		}
	}, [isLogin]);
	
	
	const openInfo = (id: string) => {
		setActiveId(id);
		setActiveSection("info");
	};
	
	const openHourly = (id: string) => {
		setActiveId(id);
		setActiveSection("hourly");
	};
	
	const openWeekly = (id: string) => {
		setActiveId(id);
		setActiveSection("weekly");
	};
	
	const showWarning = (e?: React.MouseEvent) => {
		e?.stopPropagation();
		toast.warn('Please log in, if you want to see more details!', {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "dark",
			transition: Bounce,
		});
	};
	const removeWeather = (id: string) => {
		remove(id);
		
		if (activeId === id) {
			setActiveId(null);
			setActiveSection(null);
		}
	};
	
	const activeWeather = allWeathers.find(w => w._id === activeId);
	
	return (
		<>
			<section className="weather">
				<div className="container">
					{allWeathers.length === 0 ? (
						<div className="weather-empty">
							<h2 className="nature__title">No weather cards</h2>
							<p>Add a city to see the forecast 🌤️</p>
						</div>
					) : (
						<Swiper
							spaceBetween={50}
							slidesPerView={1}
							modules={[Navigation]}
							navigation
							loop
							onSlideChange={(swiper) => {
								const index = swiper.realIndex;
								setActiveSlideIndex(index);
								
								const targetWeather = allWeathers[index];
								if (!targetWeather) return;
								
								if (activeSection) {
									setActiveId(targetWeather._id);
								}
							}}
							breakpoints={{
								768: { slidesPerView: 2 },
								1200: { slidesPerView: 3 }
							}}
						>
							{allWeathers.map(weather => (
								<SwiperSlide
									key={weather._id}
									className={weather._id === activeId ? "active-slide" : ""}
								>
									<WeatherCard
										_id={weather._id}
										city={weather.city}
										country={weather.country}
										icon={weather.icon}
										temp={weather.temp}
										onSeeMore={isLogin ? (e) => {
											e.stopPropagation();
											openInfo(weather._id);
										} : showWarning}
										onDelete={(id) => removeWeather(id)}
										onHourlyForecast={isLogin ? (e) => {
											e.stopPropagation();
											openHourly(weather._id);
										} : showWarning}
										onWeekForecast={isLogin ? (e) => {
											e.stopPropagation();
											openWeekly(weather._id);
										} : showWarning}
										onActivate={() => {
											setActiveId(weather._id);
											if (activeSection) {
												setActiveSection(activeSection);
											}
										}}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</div>
			</section>
			
			
			{activeWeather && activeSection === "info" && (
				<WeatherInfo
					temp={activeWeather.feelslike}
					mintemp={activeWeather.mintemp}
					maxtemp={activeWeather.maxtemp}
					humidity={activeWeather.humidity}
					pressure={activeWeather.pressure}
					wind={activeWeather.wind}
					visibility={activeWeather.visibility}
				/>
			)}
			
			{activeWeather && activeSection === "hourly" && (
				<HourlyForecast hours={activeWeather.hourlyData} />
			)}
			
			{activeWeather && activeSection === "weekly" && (
				<WeekForecast data={activeWeather.weeklyData} />
			)}
		</>
	);
}
