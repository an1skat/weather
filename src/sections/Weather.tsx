// Weather.tsx
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import WeatherCard from '../components/WeatherCard.tsx';
import WeatherInfo from './WeatherInfo.tsx';
import HourlyForecast from './HourlyForecast.tsx';
import WeekForecast from './WeekForecast.tsx';

import weather from "../weather.json";
import week from "../week.json";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

export default function Weather() {
	const hours = weather.forecast.forecastday[0].hour;
	
	const [openSections, setOpenSections] = useState({
		weatherInfo: false,
		hourlyForecast: false,
		weekForecast: false,
	});
	
	const toggleSection = (section: keyof typeof openSections) => {
		setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
	};
	
	return (
		<>
			<section className="weather">
				<Swiper
					spaceBetween={50}
					slidesPerView={1}
					modules={[Navigation]}
					navigation
					loop
				>
					<SwiperSlide>
						<WeatherCard
							city="Prague"
							country="Czech Republic"
							weather="clear sky"
							temp={22}
							onSeeMore={() => toggleSection('weatherInfo')}
							onHourlyForecast={() => toggleSection('hourlyForecast')}
							onWeekForecast={() => toggleSection('weekForecast')}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<WeatherCard
							city="Kyiv"
							country="Ukraine"
							weather="fog"
							temp={13}
							onSeeMore={() => toggleSection('weatherInfo')}
							onHourlyForecast={() => toggleSection('hourlyForecast')}
							onWeekForecast={() => toggleSection('weekForecast')}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<WeatherCard
							city="Chisinau"
							country="Moldova"
							weather="light rain"
							temp={5}
							onSeeMore={() => toggleSection('weatherInfo')}
							onHourlyForecast={() => toggleSection('hourlyForecast')}
							onWeekForecast={() => toggleSection('weekForecast')}
						/>
					</SwiperSlide>
				</Swiper>
			</section>
			
			{openSections.weatherInfo && <WeatherInfo />}
			{openSections.hourlyForecast && <HourlyForecast hours={hours} />}
			{openSections.weekForecast && <WeekForecast data={week} />}
		</>
	)
}
