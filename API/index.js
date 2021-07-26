import Search from './Search';
import MovieOrEpisode from './MovieOrEpisode';
import SerieOrSeason from './SerieOrSeason';

const Movie = async url => MovieOrEpisode('movie', url);
const Episode = async url => MovieOrEpisode('episode', url);

const Serie = async url => SerieOrSeason('/series/' + url);
const Season = async url => SerieOrSeason('/season/' + url);

export {
	Search,
	Movie,
	Serie,
	Season,
	Episode
}