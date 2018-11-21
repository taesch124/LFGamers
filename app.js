const igdb = require('./igdb.js');

let search = process.argv[2];

start();

async function start() {
    try {
        let games = await igdb.searchGame(search).catch('Error');
    } catch(err) {
        console.log(err);
    }
    
}



