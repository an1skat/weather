import { TbReload } from 'react-icons/tb';
import { FiHeart } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface Props {
	_id: string;
	city: string;
	country: string;
	icon: string;
	temp: number;
	onSeeMore: (e: React.MouseEvent) => void;
	onHourlyForecast: (e: React.MouseEvent) => void;
	onWeekForecast: (e: React.MouseEvent) => void;
	onDelete: (id: string) => void;
	onActivate: () => void;
}

export default function WeatherCard({
	                                    _id,
	                                    city,
	                                    country,
	                                    icon,
	                                    temp,
	                                    onSeeMore,
	                                    onHourlyForecast,
	                                    onWeekForecast,
	                                    onDelete,
	                                    onActivate
                                    }: Props) {
	
	const today = new Date();
	
	return (
		<li className="weather-card" onClick={onActivate}>
			<div className="weather-card__location">
				<p>{city}</p>
				<p>{country}</p>
			</div>
			
			<h3 className="weather-card__time">
				{today.getHours()}:{String(today.getMinutes()).padStart(2, '0')}
			</h3>
			
			<div className="weather-card__forecast">
				<button
					type="button"
					className="weather-card__forecast-btn"
					onClick={(e) => {
						e.stopPropagation();
						onHourlyForecast(e);
					}}
				>
					Hourly forecast
				</button>
				
				<button
					type="button"
					className="weather-card__forecast-btn"
					onClick={(e) => {
						e.stopPropagation();
						onWeekForecast(e);
					}}
				>
					Weekly forecast
				</button>
			</div>
			
			<div className="weather-card__date">
				<p>{today.toLocaleDateString()}</p>
				<p>{today.toLocaleDateString('en-US', { weekday: 'long' })}</p>
			</div>
			
			<img
				className="weather-card__icon"
				src={icon}
				alt="Weather icon"
				width={83}
				height={83}
			/>
			
			<p className="weather-card__temp">{temp}°C</p>
			
			<ul className="weather-card__interact">
				<li className="weather-card__interact-item">
					<button
						type="button"
						className="weather-card__interact-reload"
						onClick={(e) => e.stopPropagation()}
					>
						<TbReload size={24} />
					</button>
				</li>
				
				<li className="weather-card__interact-item">
					<button
						type="button"
						className="weather-card__interact-like"
						onClick={(e) => e.stopPropagation()}
					>
						<FiHeart size={24} color="red" />
					</button>
				</li>
				
				<li className="weather-card__interact-item">
					<button
						type="button"
						className="weather-card__interact-see-more"
						onClick={(e) => {
							e.stopPropagation();
							onSeeMore(e);
						}}
					>
						See more
					</button>
				</li>
				
				<li className="weather-card__interact-item">
					<button
						type="button"
						className="weather-card__interact-delete"
						onClick={(e) => {
							e.stopPropagation();
							onDelete(_id);
						}}
					>
						<RiDeleteBin6Line size={24} />
					</button>
				</li>
			</ul>
		</li>
	);
}
