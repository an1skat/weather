import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import WeatherCard from '../components/WeatherCard.tsx';

import "swiper/css";
import "swiper/css/navigation";

export default function Weather() {
	return (
        <section className="weather">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    modules={[Navigation]}
                    navigation
                    loop
                >
                    <SwiperSlide>
                        <WeatherCard city="Prague" country="Czech Republic" weather="clear sky" temp={22} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <WeatherCard city="Kiiv" country="Czech Republic" weather="fog" temp={13} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <WeatherCard city="Prague" country="Moldova" weather="light rain" temp={5} />
                    </SwiperSlide>
                </Swiper>
        </section>
	)
}