import { fullLog } from '../OBF/API/Funcs';
import { Search, Movie, Serie, Season, Episode } from './API/';

export default async function app() {
	const theSearch = await Search('fast ', 2);
	const theMovie = await Movie('wrath-of-man-2021');
	const theSerie = await Serie('lost-2004-2010')
	const theSeason = await Season('lost-season-6');
	const theEpisode = await Episode('lost-season-6-ep-17');

	fullLog({
		theSearch,
		theMovie,
		theSerie,
		theSeason,
		theEpisode
	});
}