import {useEffect, useState} from 'react';
import axios from 'axios';
import noImage from '@/assets/no-image.jpg';

const LIMIT = 4;

export default function Pets() {
	const [news, setNews] = useState([]);
	const [visible, setVisible] = useState(LIMIT);
	
	useEffect(() => {
		async function fetchPets() {
			try {
				const {data} = await axios.get('/.netlify/functions/pets-news');
				setNews(data.articles || []);
			} catch (err) {
				console.error(err);
			}
		}
		
		fetchPets();
	}, []);
	
	const loadMore = () => setVisible(v => v + LIMIT);
	
	return (
		<section className="pets">
			<div className="container">
				<h2 className="pets__title">Interacting with our pets</h2>
				
				<ul className="pets__list">
					{news.slice(0, visible).map(item => (
						<li
							className="pets__item"
							key={item.url}
						>
							<img
								className="pets__img"
								src={item.urlToImage || noImage}
								alt={item.title}
								loading="lazy"
								onError={(e) => {
									e.currentTarget.src = noImage;
								}}
							/>
							<h3 className="pets__description">
								{item.title}
							</h3>
						</li>
					))}
				</ul>
				
				{visible < news.length && (
					<button
						className="pets__btn"
						onClick={loadMore}
					>
						See more
					</button>
				)}
			</div>
		</section>
	);
}
