import {HiOutlineSearch} from 'react-icons/hi';
import heroMobile from "../assets/hero-mobile.jpg";

export default function Hero() {
	const today = new Date();
	const month = today.toLocaleDateString('en-US', {month: 'long'});
	const weekday = today.toLocaleDateString('en-US', {weekday: 'long'});
	const day = getOrdinal(today.getDate());
	
	function getOrdinal(n: number) {
		const s = ['th', 'st', 'nd', 'rd'];
		const v = n % 100;
		const suffix = s[(v - 20) % 10] || s[v] || s[0];
		return (
			<>
				{n}<sup>{suffix}</sup>
			</>
		);
	}
	
	return (
		<section className="hero" style={{backgroundImage: heroMobile}}>
			<div className="container">
				<h1 className="hero__title">Weather dashboard</h1>
				<div className="hero__container">
					<p className="hero__text">Create your personal list of favorite cities
						and always be aware of the weather.</p>
					<p className="date">
						{month} {today.getFullYear()} <br />
						{weekday}, {day}
					</p>
				</div>
				<form>
					<input
						type="text"
						placeholder="Search location..."
					/>
					<button type="submit"><HiOutlineSearch /></button>
				</form>
			</div>
		</section>
	);
}