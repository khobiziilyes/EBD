import { firstGroup, firstGroupAll } from './Funcs';

export function getInformations(findAndSlice, type) {
	const _infos = findAndSlice('movie_img');

	const url = firstGroup(_infos, /href="(.+?)"/);
	const img = firstGroup(_infos, /src="(.+?)"/);
	const title = firstGroup(_infos, /alt="(.+?)"/);
	
	const _categories = findAndSlice('النوع');
	const categories = firstGroupAll(_categories, /">(.+?)<\/a/g);
	
	let duration, quality, trailer;

	if (type !== 'serie') {
		const _duration = findAndSlice('المدة');
		duration = firstGroup(_duration.substring(22), /(.+?)<\/td/);

		quality = firstGroup(_infos, /<span>(.+?)</);
	}

	if (type !== 'episode') {
		const _trailer = findAndSlice('yt_trailer');
		trailer = 'https://www.youtube.com/watch?v=' + firstGroup(_trailer, /embed\/(\w+)/);
	}

	return {
		url,
		img,
		title,
		categories,
		duration,
		quality,
		trailer
	}
}

export function searchIndex(data, query) {
	return data.findIndex(_ => _.includes(query));
}

export function generalFindAndSlice(data, query, keep = false) {
	const i = searchIndex(data, query);
	const item = data[i];

	data = data.slice(i + (keep ? 0 : 1));

	return { item, data };
}
