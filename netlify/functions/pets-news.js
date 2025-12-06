// netlify/functions/pets-news.js

export const handler = async () => {
	const API_KEY = process.env.NEWS_API_KEY;
	const url = `https://newsapi.org/v2/top-headlines?q=pets&language=en&pageSize=30&apiKey=${API_KEY}`;
	
	try {
		const res = await fetch(url);
		const data = await res.json();
		
		return {
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Failed to fetch news' }),
		};
	}
};
