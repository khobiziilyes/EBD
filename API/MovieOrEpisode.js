const axios = require('axios');
import { firstGroup, firstGroupAll, splitArr } from './Funcs';
import { getInformations, searchIndex, generalFindAndSlice } from './Common';

export default async function parse(type, endPoint) {
	let data = (await axios(`/${type}/${endPoint}`, {
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

	const infos = getInformations(findAndSlice, type);

	const _embed = findAndSlice('iframe');
	const embed = firstGroup(_embed, /src="(.+?)"/);

	findAndSlice('<th>الحجم', true);
	
	const _downloads = splitArr(data.slice(0, searchIndex(data, '/tbody')), 3);
	const downloads = _downloads.map(parseDownload);

	return {
		...infos,
		embed,
		downloads
	}
}

function parseDownload(_download) {
	const [ Quality, Resolution, Size ] = firstGroupAll(_download[0], /<td>(.+?)</g);
	const url = firstGroup(_download[1], /(\/api.+?)"/);
	
	return {
		Resolution: Resolution.trim(),
		Quality,
		Size,
		url
	}
}