import WeatherInfoCard from '../components/WeatherInfoCard.tsx';
import thermometer from "../assets/thermometer-hot.svg";
import humidity from "../assets/humidity.svg";
import pressure from "../assets/pressure.svg";
import wind from "../assets/wind.svg";
import visibility from "../assets/visibility.svg";

export default function WeatherInfo() {
	return (
		<section className="weather-info">
			<div className="container">
				<ul className="weather-info__list">
					<WeatherInfoCard texts={["Feels like"]} values={["29.2 °C"]} notIcon={false} icon={thermometer} />
					<WeatherInfoCard texts={["Min °C", "Max °C"]} values={["27.9 °C", "27.9 °C"]} notIcon={true} icon={undefined} />
					<WeatherInfoCard texts={["Humidity"]} values={["59%"]} notIcon={false} icon={humidity} />
					<WeatherInfoCard texts={["Pressure"]} values={["1007 Pa"]} notIcon={false} icon={pressure} />
					<WeatherInfoCard texts={["Wind speed"]} values={["3.17 m/s"]} notIcon={false} icon={wind} />
					<WeatherInfoCard texts={["Visibility"]} values={["Unlimited"]} notIcon={false} icon={visibility} />
				</ul>
			</div>
		</section>
	)
}