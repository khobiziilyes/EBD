const axios = require('axios');
import getInformations, { generalFindAndSlice } from './getInformations';

export const firstGroup = (text, pattern) => text.match(pattern)[1];
export const firstGroupAll = (text, pattern) => [...text.matchAll(pattern)].map(_ => _[1]);

export function splitArr(arr, size) {
	let arrayOfArrays = [];
	
	for (let i = 0; i < arr.length; i += size) 
		arrayOfArrays.push(arr.slice(i, i + size));
	
	return arrayOfArrays;
}

export async function commonJob(type, endPoint) {
	let data = await apiCall(`/${type}/${endPoint}`);

	function findAndSlice(...args) {
		const temp = generalFindAndSlice(data, ...args);
		data = temp.data;

		return temp.item;
	}

	const getData = () => data;
	const infos = getInformations(findAndSlice, type);

	return { findAndSlice, infos, getData }
}

export async function apiCall(url, params = null) {
	params = params ||  {
		ref: 'search-p2'
	}

	return (await axios(url, {
		params: {
			output_format: 'json',
			...params
		}
	})).data.html.split('\n');
}