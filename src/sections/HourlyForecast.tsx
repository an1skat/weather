import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer
} from 'recharts';

interface Hour {
	time: string;
	temp_c: number;
}

interface Props {
	hours: Hour[];
}

function to12Hour(time: string) {
	const [h] = time.split(':').map(Number);
	const suffix = h >= 12 ? 'pm' : 'am';
	const hour = h % 12 || 12;
	return `${hour} ${suffix}`;
}

export default function HourlyForecast({ hours }: Props) {
	
	const chartWidth = hours.length * 63;
	
	const data = hours.map((hour) => ({
		time: to12Hour(hour.time.split(' ')[1]),
		temp: hour.temp_c
	}));
	
	return (
		<section className="hourly-forecast">
			<div className="container">
				<div style={{ overflowX: "auto", width: "100%", backgroundColor: '#E8E8E8', padding: "18px 25px", paddingLeft: 0, borderRadius: "15px" }}>
					<h2 className="hourly-forecast__title">Hourly Forecast</h2>
					<div style={{ width: chartWidth }}>
						<ResponsiveContainer width="100%" height={370}>
							<LineChart data={data}>
								<CartesianGrid stroke="#B5B5B5" />
								<XAxis
									axisLine={false}
									tickLine={false}
									stroke="#000"
									orientation="top"
									dataKey="time"
								/>
								<YAxis
									axisLine={false}
									tickLine={false}
									stroke="#000"
									unit="°C"
									padding={{ top: 20, bottom: 20 }}
								/>
								<Tooltip />
								<Line
									type="monotone"
									dataKey="temp"
									stroke="#FFB36C"
									strokeWidth={3}
									dot={false}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			
			</div>
		</section>
	);
}
