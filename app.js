const Dotenv = require('dotenv').config();
const IGDB = require('igdb-api-node').default;
const Keys = require('./keys.js');

const igdbClient = IGDB(Keys.igdb);

igdbClient.games({
    fields: '*',
    limit: 5
}).then(response => {
    console.log(response);
}).catch(error => {
    console.log(error);
});