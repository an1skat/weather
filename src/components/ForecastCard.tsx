interface Props {
	date: string,
	icon: string,
	description: string,
	max: number,
	min: number,
}

export default function ForecastCard({date, icon, description, max, min}: Props) {
	return  (
		<li className="week-forecast__item">
			<p className="week-forecast__date">{date}</p>
			<div className="week-forecast__container">
				<img
					src={icon}
					alt={description}
					className="week-forecast__icon"
				/>
				<p className="week-forecast__temp">{max}/{min}℃</p>
			</div>
			<p className="week-forecast__description">{description}</p>
		</li>
	)
}