interface Props {
	texts: string[],
	values: string[],
	notIcon: boolean,
	icon: string | undefined;
}

export default function WeatherInfoCard({texts, values, icon, notIcon}: Props) {
	return (
		<li className="weather-info__item">
			{notIcon ? (
				texts.map((t, i) => (
					<div
						className="temp-container"
						key={i}
					>
						<p className="weather-info__text">{t}</p>
						<h3 className="weather-info__value">{values[i]}</h3>
					</div>
				))
			) : (
				<>
					<p className="weather-info__text">{texts[0]}</p>
					<h3 className="weather-info__value">{values[0]}</h3>
					{icon && <img
						src={icon}
						alt="Info icon"
						className="weather-info__icon"
					/>}
				</>
			)}
		</li>
	);
}
