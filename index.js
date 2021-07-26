require('dotenv').config();
require('draftlog').into(console);

const axios = require('axios');
const https = require('https');

const env = process.env;

const httpsAgent = new https.Agent({ keepAlive: true });

axios.defaults.baseURL = env.HOST;
axios.defaults.httpsAgent = httpsAgent;

const app = require('./app');

app(env);