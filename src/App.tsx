import "./scss/main.scss"
import Header from './sections/Header.tsx';
import Hero from './sections/Hero.tsx';
import WeatherCard from './components/WeatherCard.tsx';

function App() {
  return (
		<>
			<Header />
			<Hero />
			<WeatherCard city="" country="" weather="" temp={1} key="" />
		</>
  )
}

export default App
