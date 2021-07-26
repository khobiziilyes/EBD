const axios = require('axios');
import { firstGroup, firstGroupAll, splitArr } from './Funcs';
import { parseMovieSerie, searchIndex, generalFindAndSlice } from './Common';

export default async function parse(endPoint) {
	let data = (await axios(endPoint, {
		params: {
			output_format: 'json',
			ref: 'search-p2'
		}
	})).data.html.split('\n');

	function findAndSlice(...args) {
		const temp = generalFindAndSlice(data, ...args);
		data = temp.data;

		return temp.item;
	}

	const infos = parseMovieSerie(findAndSlice, false);

	findAndSlice('movies_small');

	const seasons = getSeasons(data);

	return {
		...infos,
		seasons
	}
}

function getSeasons(data) {
	const lastI = searchIndex(data, '</a></div>');
	const _seasons = data.slice(0, lastI + 1);

	const seasons = _seasons.map(parseSeason);

	return seasons;
}

function parseSeason(data) {
	const url = firstGroup(data, /href="(.+?)"/);
	const img = firstGroup(data, /src="(.+?)"/);
	const title = firstGroup(data, /title">(.+?)</);

	return { url, img, title }
}