const axios = require('axios');

export async function search(q, page = 1) {
	const { data } = await axios('/explore/', {
		params: {
			q,
			page,
			output_format: 'json',
			output_mode: 'movies_list'
		},
		responseType: 'json'
	});

	const [ , ...items] = data.html.split('\n');

	return items;
}

export async function parsedSearch(...args) {
	return (await search(...args)).map(parseItem);
}

export function parseItem(item) {
	const href = item.match(/href="\/(.+?)"/)[1];

	return href;
}