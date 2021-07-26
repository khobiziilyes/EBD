import { firstGroup, apiCall } from './Helpers/Funcs';

export default async function parsedSearch(...args) {
	return (await search(...args)).map(parseItem);
}

export async function search(q, page = 1) {
	const params = {
		q,
		page,
		output_mode: 'movies_list'
	}

	const [, ...items] = await apiCall('/explore/', params);

	return items;
}

export function parseItem(item) {
	const easyFirstGroup = pattern => firstGroup(item, pattern);

	const href = easyFirstGroup(/href="(\/.+?)"/);
	const rating = easyFirstGroup(/<i>(.+?)</);
	const img = easyFirstGroup(/src="(.+?)"/);
	const title = easyFirstGroup(/title">(.+?)</);

	return { title, rating, href, img };
}