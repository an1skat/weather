export interface Hour {
	time_epoch: number;
	time: string;
	temp_c: number;
	condition: { text: string; icon: string };
}

export interface ForecastDay {
	date: string;
	date_epoch: number;
	day: {
		maxtemp_c: number;
		mintemp_c: number;
		avgtemp_c: number;
		condition: { text: string; icon: string };
	};
	hour: Hour[];
}

export interface Weather {
	_id: string;
	city: string;
	country: string;
	icon: string;
	temp: number;
	feelslike: number;
	maxtemp: number;
	mintemp: number;
	humidity: number;
	pressure: number;
	wind: number;
	visibility: number;
	hourlyData?: Hour[];
	weeklyData?: ForecastDay[];
}
