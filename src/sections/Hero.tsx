import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";
import type { Weather } from "@/types";
import { v4 } from "uuid";
import { useWeather } from "@/context/WeatherContext";

export default function Hero() {
	const today = new Date();
	const month = today.toLocaleDateString("en-US", { month: "long" });
	const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
	const day = getOrdinal(today.getDate());
	
	const { addTemporaryWeather } = useWeather();
	
	function getOrdinal(n: number) {
		const s = ["th", "st", "nd", "rd"];
		const v = n % 100;
		const suffix = s[(v - 20) % 10] || s[v] || s[0];
		return (
			<>
				{n}
				<sup>{suffix}</sup>
			</>
		);
	}
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const form = e.currentTarget;
		const formData = Object.fromEntries(new FormData(form));
		
		try {
			const res = await axios.get(
				`https://api.weatherapi.com/v1/forecast.json?key=6479dbdc5b544a12b0c110749252211&q=${formData.city}&days=7&aqi=no&alerts=no`
			);
			
			const data = res.data;
			const day = data.forecast.forecastday[0].day;
			
			const weatherData: Weather = {
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
				weeklyData: data.forecast.forecastday,
			};
			
			addTemporaryWeather(weatherData);
			
			form.reset();
			
			setTimeout(() => {
				// @ts-expect-error
				const swiper = document.querySelector(".swiper")?.swiper;
				if (swiper) swiper.slideTo(swiper.slides.length - 1);
			}, 50);
			
		} catch (error) {
			console.error(error);
		}
	};
	
	return (
		<section className="hero">
			<div className="container">
				<h1 className="hero__title">Weather dashboard</h1>
				
				<div className="hero__container">
					<p className="hero__text">
						Create your personal list of favorite cities
						and always be aware of the weather.
					</p>
					
					<p className="hero__date">
						{month} {today.getFullYear()} <br />
						{weekday}, {day}
					</p>
				</div>
				
				<form className="hero__form" onSubmit={handleSubmit}>
					<input
						name="city"
						className="hero__input"
						type="text"
						placeholder="Search location..."
						required
					/>
					<button className="hero__btn" type="submit">
						<HiOutlineSearch className="hero__icon" />
					</button>
				</form>
			</div>
		</section>
	);
}
