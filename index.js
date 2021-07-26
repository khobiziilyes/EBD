require('dotenv').config();

/*
	- Promise catch
*/

import { parse } from 'tldts';
import axios from 'axios';
import https from 'https';

const env = process.env;
const { HOST } = env;
const { domain } = parse(HOST);

const httpsAgent = new https.Agent({ keepAlive: true });

axios.defaults.baseURL = HOST;
axios.defaults.httpsAgent = httpsAgent;
axios.defaults.responseType = 'json';

import app from './app';

app({ domain, ...env });