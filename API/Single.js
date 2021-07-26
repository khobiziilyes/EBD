import { firstGroup, firstGroupAll, splitArr, commonJob } from './Helpers/Funcs';
import { searchIndex } from './Helpers/getInformations';

export default async function parse(type, endPoint) {
	const { getData, infos } = await commonJob(type, endPoint);
	
	const data = getData();
	
	const _downloads = splitArr(data.slice(0, searchIndex(data, '/tbody')), 3);
	const downloads = _downloads.map(parseDownload);

	return {
		...infos,
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