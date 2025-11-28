import WeatherInfoCard from '../../components/WeatherInfoCard.tsx';
import thermometerIcon from "../../assets/thermometer-hot.svg";
import humidityIcon from "../../assets/humidity.svg";
import pressureIcon from "../../assets/pressure.svg";
import windIcon from "../../assets/wind.svg";
import visibilityIcon from "../../assets/visibility.svg";

interface Props {
	temp: number,
	mintemp: number
	maxtemp: number,
	humidity: number,
	pressure: number,
	wind: number,
	visibility: number
}

export default function WeatherInfo({temp, mintemp, maxtemp, humidity, pressure, wind, visibility}: Props) {
	return (
		<section className="weather-info">
			<div className="container">
				<ul className="weather-info__list">
					<WeatherInfoCard texts={["Feels like"]} values={[`${temp} °C`]} notIcon={false} icon={thermometerIcon} />
					<WeatherInfoCard texts={["Min °C", "Max °C"]} values={[`${mintemp} °C`, `${maxtemp} °C`]} notIcon={true} icon={undefined} />
					<WeatherInfoCard texts={["Humidity"]} values={[`${humidity}%`]} notIcon={false} icon={humidityIcon} />
					<WeatherInfoCard texts={["Pressure"]} values={[`${BigInt(pressure)} Pa`]} notIcon={false} icon={pressureIcon} />
					<WeatherInfoCard texts={["Wind speed"]} values={[`${wind.toFixed(2)} m/s`]} notIcon={false} icon={windIcon} />
					<WeatherInfoCard texts={["Visibility"]} values={[`${visibility > 8 ? "Unlimited" : BigInt(visibility)}`]} notIcon={false} icon={visibilityIcon} />
				</ul>
			</div>
		</section>
	)
}