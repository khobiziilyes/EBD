require('dotenv').config();
require('draftlog').into(console);

const app = require('./app');

app(process.env);