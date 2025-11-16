// Weather.tsx
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import WeatherCard from '../components/WeatherCard.tsx';
import WeatherInfo from './WeatherInfo.tsx';

import "swiper/css";
import "swiper/css/navigation";

export default function Weather() {
	const [showWeatherInfo, setShowWeatherInfo] = useState(false);
	
	const handleSeeMore = () => {
		setShowWeatherInfo(true);
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
							onSeeMore={handleSeeMore}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<WeatherCard
							city="Kiiv"
							country="Czech Republic"
							weather="fog"
							temp={13}
							onSeeMore={handleSeeMore}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<WeatherCard
							city="Prague"
							country="Moldova"
							weather="light rain"
							temp={5}
							onSeeMore={handleSeeMore}
						/>
					</SwiperSlide>
				</Swiper>
			
			</section>
			{showWeatherInfo && <WeatherInfo />}
		</>
	)
}
