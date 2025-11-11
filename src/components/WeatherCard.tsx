import {getWeatherIcon} from '../getWeatherIcon.ts';
import { TbReload } from "react-icons/tb";
import { FiHeart } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
	city: string;
	country: string;
	weather: string;
	temp: number;
}

export default function WeatherCard({city, country, weather, temp}: Props) {
	const today = new Date();
	const icon = getWeatherIcon(weather);
	return (
		<li className="weather-card">
			<div className="weather-card__location">
				<p>{city}</p>
				<p>{country}</p>
			</div>
			<h3 className="weather-card__time">{today.getHours()}:{today.getMinutes()}</h3>
			<div className="weather-card__forecast">
				<button
					type="button"
					className="weather-card__forecast-btn"
				>Hourly forecast
				</button>
				<button
					type="button"
					className="weather-card__forecast-btn"
				>Weekly forecast
				</button>
			</div>
			<div className="weather-card__date">
				<p>{today.toLocaleDateString()}</p>
				<p>{today.toLocaleDateString('en-US', {weekday: 'long'})}</p>
			</div>
			<img
				className="weather-card__icon"
				src={icon}
				alt="Weather icon"
			/>
			<p className="weather-card__temp">{temp}°C</p>
			<ul className="weather-card__interact">
				<li className="weather-card__interact-item">
					<button
						type="button"
						className="weather-card__interact-reload"
					>
						<TbReload size={24} />
					</button>
				</li>
				<li className="weather-card__interact-item">
					<button
						type="button"
						className="weather-card__interact-like"
					>
						<FiHeart size={24} color="red" />
					</button>
				</li>
				<li className="weather-card__interact-item">
					<button
						type="button"
						className="weather-card__interact-see-more"
					>See more
					</button>
				</li>
				<li className="weather-card__interact-item">
					<button
						type="button"
						className="weather-card__interact-delete"
					>
						<RiDeleteBin6Line size={24} />
					</button>
				</li>
			</ul>
		</li>
	);
}