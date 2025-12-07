import {useState, useEffect} from 'react';
import axios from 'axios';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Autoplay} from 'swiper/modules';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/effect-coverflow';

export const Slider = () => {
	const [images, setImages] = useState([]);
	
	useEffect(() => {
		const load = async () => {
			try {
				const r = await axios.get('https://pixabay.com/api/', {
					params: {
						key: '53593726-163e71630bee945316ddbcc91',
						q: 'minimalist nature',
						image_type: 'photo',
						per_page: 50
					}
				});
				
				setImages(
					r.data.hits.map((img) => ({
						full: img.webformatURL,
						preview: img.previewURL
					}))
				);
			} catch (error) {
				console.error('Error loading images:', error);
			}
		};
		load();
	}, []);
	
	
	return (
		<section className="nature">
			<div className="container">
				<h2 className="nature__title">Beautiful nature</h2>
				<div className="nature__wrapper">
					<Swiper
						modules={[EffectCoverflow, Autoplay]}
						effect="coverflow"
						grabCursor={true}
						slidesPerView="auto"
						loop={true}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false
						}}
						coverflowEffect={{
							rotate: 0,
							stretch: 0,
							depth: 160,
							modifier: 2.5,
							slideShadows: false
						}}
						className="nature__swiper"
					>
						{images.map((src, i) => (
							<SwiperSlide
								key={i}
								className="nature__slide"
							>
								<img
									src={src.full}
									alt=""
									className="nature__img"
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};