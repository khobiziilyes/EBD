import Search from './Search';
import Movie from './Movie';
import SerieOrSeason from './SerieOrSeason';

const Serie = async url => SerieOrSeason('/series/' + url);
const Season = async url => SerieOrSeason('/season/' + url);

export {
	Search,
	Movie,
	Serie,
	Season
}