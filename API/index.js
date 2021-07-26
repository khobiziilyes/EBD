import Search from './Search';
import Group from './Group';
import Single from './Single';

const Serie = (...args) => Group('series', ...args);
const Season = (...args) => Group('season', ...args);

const Movie = (...args) => Single('movie', ...args);
const Episode = (...args) => Single('episode', ...args);

export {
	Search,
	Serie,
	Season,
	Movie,
	Episode
}