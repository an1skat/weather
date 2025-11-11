import clear from "./assets/icons8-sun-100.svg";
import fewClouds from "./assets/icons8-partly-cloudy-day-100.svg";
import cloud from "./assets/icons8-cloud-100.svg";
import clouds from "./assets/icons8-clouds-100.svg";
import lightRain from "./assets/icons8-rain-cloud-100.svg";
import rain from "./assets/icons8-rain-100.svg";
import lightThunderstorm from "./assets/icons8-cloud-lightning-100.svg";
import thunderstorm from "./assets/icons8-storm-100.svg";
import snow from "./assets/icons8-snow-100.svg"
import sleet from "./assets/icons8-sleet-100.svg"
import fog from "./assets/icons8-fog-100.svg";
import tornado from "./assets/icons8-tornado-100.svg";

export type WeatherDescription = string;

const iconByDescription: Record<string, string> = {
	"clear sky": clear,
	
	"few clouds": fewClouds,
	"scattered clouds": clouds,
	"broken clouds": clouds,
	"overcast clouds": cloud,
	
	"light rain": lightRain,
	"moderate rain": lightRain,
	"heavy intensity rain": rain,
	"very heavy rain": rain,
	"extreme rain": rain,
	"freezing rain": rain,
	
	"light intensity drizzle": rain,
	"drizzle": rain,
	"heavy intensity drizzle": rain,
	"drizzle rain": rain,
	"heavy drizzle rain": rain,
	
	"thunderstorm": lightThunderstorm,
	"thunderstorm with light rain": thunderstorm,
	"thunderstorm with rain": thunderstorm,
	"thunderstorm with heavy rain": thunderstorm,
	"light thunderstorm": lightThunderstorm,
	"heavy thunderstorm": thunderstorm,
	
	"snow": snow,
	"light snow": snow,
	"heavy snow": snow,
	"sleet": sleet,
	"light shower sleet": sleet,
	"rain and snow": sleet,
	"light shower snow": sleet,
	"shower snow": sleet,
	"heavy shower snow": sleet,
	
	"mist": fog,
	"smoke": fog,
	"haze": fog,
	"fog": fog,
	
	"tornado": tornado,
};

export function getWeatherIcon(description: WeatherDescription): string {
	const key = description.toLowerCase().trim();
	return iconByDescription[key] ?? clear;
}
