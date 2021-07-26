import { firstGroup, firstGroupAll } from './Funcs';

export default function getInformations(findAndSlice, type) {
	const isSingle = ['episode', 'movie'].includes(type);

	const _infos = findAndSlice('movie_img');

	const url = firstGroup(_infos, /href="(.+?)"/);
	const img = firstGroup(_infos, /src="(.+?)"/);
	const title = firstGroup(_infos, /alt="(.+?)"/);
	
	const _categories = findAndSlice('النوع');
	const categories = firstGroupAll(_categories, /">(.+?)<\/a/g);
	
	let duration, quality, trailer, embed;
	
	if (isSingle) {
		const _duration = findAndSlice('المدة');
		duration = firstGroup(_duration.substring(22), /(.+?)<\/td/);

		quality = firstGroup(_infos, /<span>(.+?)</);
	}

	if (type !== 'episode') {
		const _trailer = findAndSlice('yt_trailer');
		trailer = 'https://www.youtube.com/watch?v=' + firstGroup(_trailer, /embed\/(\w+)/);
	}
	
	if (isSingle) {
		const _embed = findAndSlice('iframe');
		const embed = firstGroup(_embed, /src="(.+?)"/);

		findAndSlice('<th>الحجم', true);
	}
	
	return Object.fromEntries(Object.entries({
		url,
		img,
		title,
		categories,
		duration,
		quality,
		trailer,
		embed
	}).filter(([_, item]) => item));
}

export function generalFindAndSlice(data, query, keep = false) {
	const i = searchIndex(data, query);
	const item = data[i];

	data = data.slice(i + (keep ? 0 : 1));

	return { item, data };
}

export function searchIndex(data, query) {
	return data.findIndex(_ => _.includes(query));
}