import ForecastCard from '../components/ForecastCard.tsx';

interface ForecastDay {
	date: string
	day: {
		maxtemp_c: number
		mintemp_c: number
		condition: {
			text: string
			icon: string
		}
	}
}

interface ForecastResponse {
	forecast: {
		forecastday: ForecastDay[]
	}
}

interface Props {
	data: ForecastResponse
}

export default function WeekForecast({data}: Props) {
	const days = data.forecast.forecastday
	
	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric"
		})
	}
	return (
		<section className="week-forecast">
			<div className="container">
				<div className="week-forecast__info-container">
					<h2 className="week-forecast__title">Weekly forecast</h2>
					<ul className="week-forecast__list">
						{days.slice(0, 7).map((d) => (
							<ForecastCard
								key={d.date}
								date={formatDate(d.date)}
								icon={`https:${d.day.condition.icon}`}
								description={d.day.condition.text}
								max={Math.round(d.day.maxtemp_c)}
								min={Math.round(d.day.mintemp_c)}
							/>
						))}
					
					</ul>
				</div>
			</div>
		</section>
	)
}