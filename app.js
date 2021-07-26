const { parse } = require('tldts');

const { fullLog } = require('../OBF/API/Funcs');
const { parsedSearch } = require('./API');

async function app({ HOST }) {
	const { domain } = parse(HOST);

	fullLog(await parsedSearch('fast '));
}

module.exports = app;