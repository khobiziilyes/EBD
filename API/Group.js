import { firstGroup, commonJob } from './Helpers/Funcs';
import { searchIndex } from './Helpers/getInformations';

export default async function parse(type, endPoint) {
	const { getData, findAndSlice, infos } = await commonJob(type, endPoint);

	findAndSlice('movies_small');
	const data = getData();

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