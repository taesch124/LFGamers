const igdb = require('./igdb.js');

let search = process.argv.slice(2).join(' ');

start();

async function start() {
    igdb.searchGame(search);
}



