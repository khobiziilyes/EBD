import util from 'util';
import { Search, Serie, Season, Movie, Episode } from './API/';

export default async function app() {
	const theSearch = await Search('fast ', 2);
	
	const theSerie = await Serie('lost-2004-2010')
	const theSeason = await Season('lost-season-6');

	const theMovie = await Movie('wrath-of-man-2021');
	const theEpisode = await Episode('lost-season-6-ep-17');

	prettyLog({
		theSearch,
		
		theSerie,
		theSeason,
		
		theMovie,
		theEpisode
	});
}

function prettyLog(_) {
	console.log(util.inspect(_, false, null, true) + "\r\n");
}
